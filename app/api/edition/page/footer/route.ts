import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./../../../../../lib/prisma/prisma";
import { ApiResponse } from "../../../../../helpers/ApiResponse";
import { MediaObject } from "../../../../../model/bloc/MediaObject";
export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const footer = await prisma.footer.findFirst({
        orderBy: {
          number_id: "asc",
        },
        include: {
          reseaux: true,
        },
      });
      if (!footer) {
        throw new Error("footer not found");
      }

      return {
        message: "footer got",
        footer: {
          ...footer,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "footer not found") {
          return ApiResponse.notFound("footer not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}
/* =====================================================
   POST – créer le footer
===================================================== */
export async function POST(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const body = await request.json();
      const {
        color_background_color,
        text_nom_site_adresse,
        text_adresse_footer,
        text_code_postal,
        reseaux,
      } = body;

      const newFooter = await prisma.footer.create({
        data: {
          color_background_color,
          text_nom_site_adresse,
          text_adresse_footer,
          text_code_postal,

          ...(reseaux &&
            reseaux.length > 0 && {
              reseaux: {
                create: reseaux.map((reseau: MediaObject) => ({
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
          reseaux: true,
        },
      });

      return {
        message: "footer created",
        footer: {
          ...newFooter,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message !== "") {
          return ApiResponse.serverError(err.message);
        }
      },
    },
  );
}

/* =====================================================
   PUT – mettre à jour le footer
===================================================== */
export async function PUT(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const body = await request.json();
      const {
        id,
        color_background_color,
        text_nom_site_adresse,
        text_adresse_footer,
        text_code_postal,
        reseaux,
      } = body.data ?? body;

      const footerId = Number(id);

      if (Number.isNaN(footerId)) {
        return NextResponse.json(
          { error: "Footer ID missing or invalid" },
          { status: 400 },
        );
      }

      const existingFooter = await prisma.footer.findFirst({
        where: { number_id: footerId },
        include: { reseaux: true },
      });

      if (!existingFooter) {
        return NextResponse.json(
          { error: "Footer not found" },
          { status: 404 },
        );
      }

      const updatedFooter = await prisma.footer.update({
        where: {
          number_id: footerId,
        },
        data: {
          color_background_color,
          text_nom_site_adresse,
          text_adresse_footer,
          text_code_postal,

          // ===== RÉSEAUX (1–N) =====
          ...(reseaux && {
            reseaux: {
              deleteMany: {}, // supprime tous les réseaux existants
              create: reseaux.map((reseau: MediaObject) => ({
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
          reseaux: true,
        },
      });
      return {
        message: "footer upadated",
        footer: {
          ...updatedFooter,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message !== "") {
          return ApiResponse.handlePrismaError(err.message);
        }
      },
    },
  );
}
