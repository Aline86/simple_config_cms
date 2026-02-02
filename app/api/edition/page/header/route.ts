import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./../../../../../lib/prisma/prisma";

export async function GET() {
  try {
    const header = await prisma.header.findFirst({
      include: {
        favicon: true,
        logo: true,
        reseaux: true,
      },
    });

    // Retourner null si aucun header (c'est OK, pas une erreur)
    return NextResponse.json(header, { status: 200 });
  } catch (err) {
    console.error("GET /api/header error:", err);
    // ⚠️ CORRECTION : Retourner 500 pour les vraies erreurs serveur
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text_nom_site, text_background_url, favicon, logo, reseaux } = body;

    // ✅ AJOUT : Validation des champs requis
    if (!text_nom_site) {
      return NextResponse.json(
        { error: "text_nom_site is required" },
        { status: 400 },
      );
    }

    // ✅ AJOUT : Vérifier qu'un header n'existe pas déjà (si unicité requise)
    const existingHeader = await prisma.header.findFirst();
    if (existingHeader) {
      return NextResponse.json(
        { error: "A header already exists. Use PUT to update." },
        { status: 409 }, // Conflict
      );
    }

    // ✅ AJOUT : Validation basique des données imbriquées
    if (favicon && !favicon.text_titre) {
      return NextResponse.json(
        { error: "favicon.text_titre is required" },
        { status: 400 },
      );
    }

    if (logo && !logo.text_titre) {
      return NextResponse.json(
        { error: "logo.text_titre is required" },
        { status: 400 },
      );
    }

    if (reseaux && !Array.isArray(reseaux)) {
      return NextResponse.json(
        { error: "reseaux must be an array" },
        { status: 400 },
      );
    }

    const newHeader = await prisma.header.create({
      data: {
        text_nom_site,
        text_background_url,
        ...(favicon && {
          favicon: {
            create: {
              text_titre: favicon.text_titre,
              image_url: favicon.image_url,
              color_couleur_bg: favicon.color_couleur_bg,
              text_image_lien: favicon.text_image_lien,
              number_position_image: favicon.number_position_image,
            },
          },
        }),
        ...(logo && {
          logo: {
            create: {
              text_titre: logo.text_titre,
              image_url: logo.image_url,
              color_couleur_bg: logo.color_couleur_bg,
              text_image_lien: logo.text_image_lien,
              number_position_image: logo.number_position_image,
            },
          },
        }),
        ...(reseaux &&
          reseaux.length > 0 && {
            reseaux: {
              create: reseaux.map((reseau: any) => ({
                text_titre: reseau.text_titre,
                image_url: reseau.image_url,
                color_couleur_bg: reseau.color_couleur_bg,
                text_image_lien: reseau.text_image_lien,
                number_position_image: reseau.number_position_image,
              })),
            },
          }),
      },
      include: {
        favicon: true,
        logo: true,
        reseaux: true,
      },
    });

    return NextResponse.json(
      { message: "Header créé", data: newHeader },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/header error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ AJOUT : Vérifier que body.data existe
    if (!body.data) {
      return NextResponse.json(
        { error: "data field is required" },
        { status: 400 },
      );
    }

    const { id, nom_site, background_url, favicon, logo, reseaux } = body.data;

    if (!id) {
      return NextResponse.json({ error: "Header ID missing" }, { status: 400 });
    }

    // ✅ AJOUT : Vérifier que l'ID est un nombre valide
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const existingHeader = await prisma.header.findFirst({
      where: { number_id: numericId },
      include: {
        favicon: true,
        logo: true,
        reseaux: true,
      },
    });

    if (!existingHeader) {
      return NextResponse.json({ error: "Header not found" }, { status: 404 });
    }

    // ✅ AJOUT : Validation des données imbriquées
    if (favicon && !favicon.text_titre) {
      return NextResponse.json(
        { error: "favicon.text_titre is required" },
        { status: 400 },
      );
    }

    if (logo && !logo.text_titre) {
      return NextResponse.json(
        { error: "logo.text_titre is required" },
        { status: 400 },
      );
    }

    if (reseaux && !Array.isArray(reseaux)) {
      return NextResponse.json(
        { error: "reseaux must be an array" },
        { status: 400 },
      );
    }

    const updatedHeader = await prisma.header.update({
      where: {
        number_id: numericId,
      },
      data: {
        text_nom_site: nom_site,
        text_background_url: background_url,

        ...(favicon && {
          favicon: {
            upsert: {
              create: {
                text_titre: favicon.text_titre,
                image_url: favicon.image_url,
                color_couleur_bg: favicon.color_couleur_bg,
                text_image_lien: favicon.text_image_lien,
                number_position_image: favicon.number_position_image,
              },
              update: {
                text_titre: favicon.text_titre,
                image_url: favicon.image_url,
                color_couleur_bg: favicon.color_couleur_bg,
                text_image_lien: favicon.text_image_lien,
                number_position_image: favicon.number_position_image,
              },
            },
          },
        }),

        ...(logo && {
          logo: {
            upsert: {
              create: {
                text_titre: logo.text_titre,
                image_url: logo.image_url,
                color_couleur_bg: logo.color_couleur_bg,
                text_image_lien: logo.text_image_lien,
                number_position_image: logo.number_position_image,
              },
              update: {
                text_titre: logo.text_titre,
                image_url: logo.image_url,
                color_couleur_bg: logo.color_couleur_bg,
                text_image_lien: logo.text_image_lien,
                number_position_image: logo.number_position_image,
              },
            },
          },
        }),

        ...(reseaux && {
          reseaux: {
            deleteMany: {},
            create: reseaux.map((reseau: any) => ({
              text_titre: reseau.text_titre,
              image_url: reseau.image_url,
              color_couleur_bg: reseau.color_couleur_bg,
              text_image_lien: reseau.text_image_lien,
              number_position_image: reseau.number_position_image,
            })),
          },
        }),
      },

      include: {
        favicon: true,
        logo: true,
        reseaux: true,
      },
    });

    return NextResponse.json(updatedHeader, { status: 200 });
  } catch (err) {
    console.error("PUT /api/header error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
