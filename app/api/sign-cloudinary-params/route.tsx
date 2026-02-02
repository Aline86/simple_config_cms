// app/api/signature/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

//  AJOUT : Vérification des variables d'environnement au chargement
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_FOLDER =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER || "uploads";

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error(
    "FATAL: Cloudinary environment variables are not properly configured",
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//  AJOUT : Constantes de validation
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export async function POST(req: Request) {
  try {
    //  AJOUT : Vérifier le Content-Type
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    //  AJOUT : Vérifier que c'est bien un File
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 },
      );
    }

    //  AJOUT : Vérifier la taille du fichier
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 },
      );
    }

    //  AJOUT : Vérifier le type MIME
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `File type ${file.type} is not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
        },
        { status: 400 },
      );
    }

    //  AJOUT : Vérifier que le fichier n'est pas vide
    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //  AMÉLIORATION : Typage plus strict et timeout
    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
      [key: string]: any;
    }>((resolve, reject) => {
      //  AJOUT : Timeout de 30 secondes
      const timeout = setTimeout(() => {
        reject(new Error("Upload timeout after 30 seconds"));
      }, 30000);

      cloudinary.uploader
        .upload_stream(
          {
            folder: CLOUDINARY_UPLOAD_FOLDER,
            resource_type: "auto", //  Détection automatique du type
            //  AJOUT : Options de sécurité
            overwrite: false,
            invalidate: true,
          },
          (err, result) => {
            clearTimeout(timeout);
            if (err) {
              reject(err);
            } else if (!result) {
              reject(new Error("Upload failed: no result returned"));
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    });

    //  AJOUT : Vérifier que les propriétés existent
    if (!uploadResult.secure_url || !uploadResult.public_id) {
      console.error("Invalid upload result:", uploadResult);
      return NextResponse.json(
        { error: "Upload succeeded but response is invalid" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (err) {
    console.error("POST /api/signature error:", err);

    //  AJOUT : Gestion d'erreur spécifique pour Cloudinary
    if (err instanceof Error) {
      // Erreurs Cloudinary courantes
      if (err.message.includes("Invalid image file")) {
        return NextResponse.json(
          { error: "Invalid image file" },
          { status: 400 },
        );
      }

      if (err.message.includes("File size too large")) {
        return NextResponse.json(
          { error: "File size exceeds Cloudinary limit" },
          { status: 400 },
        );
      }

      if (err.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Upload timeout. Please try again." },
          { status: 408 }, // Request Timeout
        );
      }

      if (err.message.includes("quota") || err.message.includes("limit")) {
        return NextResponse.json(
          { error: "Upload quota exceeded. Please try again later." },
          { status: 503 }, // Service Unavailable
        );
      }

      if (
        err.message.includes("unauthorized") ||
        err.message.includes("authentication")
      ) {
        console.error("CRITICAL: Cloudinary authentication failed");
        return NextResponse.json(
          { error: "Server configuration error" },
          { status: 500 },
        );
      }
    }

    // Erreur générique
    return NextResponse.json(
      {
        error: "Server error during upload",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
