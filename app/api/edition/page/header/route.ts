import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

export async function GET() {
  try {
    // Récupérer LE header (unique pour tout le site)
    const header = await prisma.header.findFirst({
      include: {
        favicon: true,
        logo: true,
        reseaux: true,
      },
    });

    // Retourner null si aucun header n'existe
    return NextResponse.json(header, { status: 200 });
  } catch (err) {
    console.error("GET /api/header error:", err);
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

    // Plus besoin de vérifier pageId
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

    return NextResponse.json({ message: "Header créé", data: newHeader });
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
    const { id, nom_site, background_url, favicon, logo, reseaux } = body.data;

    if (!id) {
      return NextResponse.json({ error: "Header ID missing" }, { status: 400 });
    }
    console.log("text_nom_site", body);
    // Récupérer le header existant
    const existingHeader = await prisma.header.findFirst({
      where: { number_id: Number(id) },
      include: {
        favicon: true,
        logo: true,
        reseaux: true,
      },
    });

    if (!existingHeader) {
      return NextResponse.json({ error: "Header not found" }, { status: 404 });
    }

    // Mise à jour du header
    const updatedHeader = await prisma.header.update({
      where: {
        number_id: Number(id),
      },
      data: {
        text_nom_site: nom_site,
        text_background_url: background_url,

        // ===== FAVICON (1–1) =====
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

        // ===== LOGO (1–1) =====
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

        // ===== RÉSEAUX (1–N) =====
        ...(reseaux && {
          reseaux: {
            deleteMany: {}, // supprime tous les réseaux liés au header
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
