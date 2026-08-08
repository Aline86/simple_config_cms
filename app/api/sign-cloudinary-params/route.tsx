// app/api/signature/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { ApiResponse } from "../../../lib/helpers/ApiResponse";
import { requireAuth } from "../edition/requireAuth";

// ========== CONFIGURATION ==========
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_FOLDER =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER;

// Vérification au chargement
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

// ========== CONSTANTES ==========
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

// ========== TYPES ==========
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

// ========== CUSTOM ERRORS ==========
class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileValidationError";
  }
}

class CloudinaryUploadError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "CloudinaryUploadError";
  }
}

// ========== HELPERS ==========
async function validateFile(file: File): Promise<void> {
  if (!(file instanceof File)) {
    throw new FileValidationError("Invalid file format");
  }

  if (file.size === 0) {
    throw new FileValidationError("File is empty");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new FileValidationError(
      `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new FileValidationError(
      `File type ${file.type} is not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
    );
  }
}

async function uploadToCloudinary(
  buffer: Buffer,
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new CloudinaryUploadError("Upload timeout after 30 seconds", 408));
    }, 30000);

    cloudinary.uploader
      .upload_stream(
        {
          folder: CLOUDINARY_UPLOAD_FOLDER,
          resource_type: "auto",
          overwrite: false,
          invalidate: true,
        },
        (err, result) => {
          clearTimeout(timeout);

          if (err) {
            reject(new CloudinaryUploadError(err.message));
          } else if (!result) {
            reject(
              new CloudinaryUploadError("Upload failed: no result returned"),
            );
          } else if (!result.secure_url || !result.public_id) {
            reject(
              new CloudinaryUploadError(
                "Upload succeeded but response is invalid",
              ),
            );
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        },
      )
      .end(buffer);
  });
}

// ========== ROUTE HANDLER ==========
export async function POST(request: NextRequest) {
  await requireAuth(request);
  return ApiResponse.handle(
    async () => {
      // Validation Content-Type
      const contentType = request.headers.get("content-type");
      if (!contentType?.includes("multipart/form-data")) {
        throw new FileValidationError(
          "Content-Type must be multipart/form-data",
        );
      }

      // Récupération du fichier
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file) {
        throw new FileValidationError("No file uploaded");
      }

      // Validation du fichier
      await validateFile(file as File);

      // Conversion en buffer
      const bytes = await (file as File).arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload vers Cloudinary
      const uploadResult = await uploadToCloudinary(buffer);

      return {
        message: "File uploaded successfully",
        data: {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        },
      };
    },
    {
      errorHandler: (err: unknown) => {
        // Erreurs de validation de fichier
        if (err instanceof FileValidationError) {
          return ApiResponse.validationError(err.message);
        }

        // Erreurs Cloudinary
        if (err instanceof CloudinaryUploadError) {
          return ApiResponse.error(err.message, err.statusCode);
        }

        // Erreurs Cloudinary (fallback)
        if (err instanceof Error) {
          if (err.message.includes("Invalid image file")) {
            return ApiResponse.validationError("Invalid image file");
          }

          if (err.message.includes("File size too large")) {
            return ApiResponse.validationError(
              "File size exceeds Cloudinary limit",
            );
          }

          if (err.message.includes("quota") || err.message.includes("limit")) {
            return ApiResponse.error(
              "Upload quota exceeded. Please try again later.",
              503,
            );
          }

          if (
            err.message.includes("unauthorized") ||
            err.message.includes("authentication")
          ) {
            console.error("CRITICAL: Cloudinary authentication failed");
            return ApiResponse.serverError(
              new Error("Server configuration error"),
            );
          }
        }

        // Erreur générique
        return ApiResponse.serverError(err);
      },
    },
  );
}
