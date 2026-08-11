import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../prisma/prisma";
import { ApiResponse } from "../../../../../lib/helpers/ApiResponse";
import { MediaObject } from "../../../../../database/model/bloc/MediaObject";
import { requireAuth } from "../../requireAuth";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const user = await requireAuth(request);

      const header = await prisma.header.findFirst({
        orderBy: {
          number_id: "asc",
        },
        include: {
          favicon: true,
          logo: true,
          reseaux: true,
        },
      });
      if (!header) {
        throw new Error("header not found");
      }
      return {
        message: "header got",
        header: {
          ...header,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "header not found") {
          return ApiResponse.notFound("header not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}

export async function POST(request: NextRequest) {
  await requireAuth(request);
  return ApiResponse.handle(
    async () => {
      const body = await request.json();
      const { text_nom_site, text_background_url, favicon, logo, reseaux } =
        body;

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
          favicon: true,
          logo: true,
          reseaux: true,
        },
      });

      revalidateTag("header", { expire: 0 });

      return {
        message: "header got",
        header: {
          ...newHeader,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "header not found") {
          return ApiResponse.notFound("header not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}

export async function PUT(request: NextRequest) {
  await requireAuth(request);
  return ApiResponse.handle(
    async () => {
      const body = await request.json();
      const { id, nom_site, background_url, favicon, logo, reseaux } =
        body.data;

      if (!id) {
        return NextResponse.json(
          { error: "Header ID missing" },
          { status: 400 },
        );
      }
      const existingHeader = await prisma.header.findFirst({
        where: { number_id: Number(id) },
        include: {
          favicon: true,
          logo: true,
          reseaux: true,
        },
      });

      if (!existingHeader) {
        return NextResponse.json(
          { error: "Header not found" },
          { status: 404 },
        );
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
              deleteMany: {}, // supprime tous les réseaux liés au header
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
          favicon: true,
          logo: true,
          reseaux: true,
        },
      });

     revalidateTag("header", { expire: 0 });


      return {
        message: "header got",
        header: {
          ...updatedHeader,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "header not found") {
          return ApiResponse.notFound("header not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}
