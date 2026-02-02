import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { BlocObject } from "../../../../../model/Bloc";
import { PageObject } from "../../../../../model/Page";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const with_homepage = searchParams.get("with_homepage");
    const slug = searchParams.get("slug"); // ✅ AJOUT

    // ✅ AJOUT : Si slug est fourni, récupérer une seule page
    if (slug) {
      const dbPage = await prisma.page.findFirst({
        where: { text_slug: slug },
      });

      if (!dbPage) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }

      // Parser les blocs
      let blocs = [];
      try {
        if (typeof dbPage.blocs === "string") {
          const parsed = JSON.parse(dbPage.blocs);
          if (Array.isArray(parsed)) {
            blocs = parsed.map((b: any) => new BlocObject(b));
          }
        }
      } catch (parseErr) {
        console.error(
          `Failed to parse blocs for page ${dbPage.number_id}:`,
          parseErr,
        );
      }

      const page = new PageObject({
        id: dbPage.number_id,
        parent_id: dbPage.number_parent_id,
        published: dbPage.checkbox_published,
        checkbox_home_page: dbPage.checkbox_home_page,
        text_titre: dbPage.text_titre,
        text_description: dbPage.text_description ?? "",
        slug: dbPage.text_slug,
        number_page_position: dbPage.number_page_position,
        langue: dbPage.text_langue,
        text_createdAt: dbPage.text_createdAt,
        text_updatedAt: dbPage.text_updatedAt,
        blocs,
      });

      return NextResponse.json(page);
    }

    // Code existant pour récupérer toutes les pages
    let dbPages = [];
    if (with_homepage === "without_homepage") {
      dbPages = await prisma.page.findMany({
        where: {
          checkbox_home_page: false,
        },
        orderBy: {
          number_page_position: "asc",
        },
      });
    } else {
      dbPages = await prisma.page.findMany({
        orderBy: {
          number_page_position: "asc",
        },
      });
    }

    const pages = dbPages.map((dbPage) => {
      let blocs = [];
      try {
        if (typeof dbPage.blocs === "string") {
          const parsed = JSON.parse(dbPage.blocs);
          if (Array.isArray(parsed)) {
            blocs = parsed.map((b: any) => new BlocObject(b));
          }
        }
      } catch (parseErr) {
        console.error(
          `Failed to parse blocs for page ${dbPage.number_id}:`,
          parseErr,
        );
      }

      return new PageObject({
        id: dbPage.number_id,
        parent_id: dbPage.number_parent_id,
        published: dbPage.checkbox_published,
        checkbox_home_page: dbPage.checkbox_home_page,
        text_titre: dbPage.text_titre,
        text_description: dbPage.text_description ?? "",
        slug: dbPage.text_slug,
        number_page_position: dbPage.number_page_position,
        langue: dbPage.text_langue,
        text_createdAt: dbPage.text_createdAt,
        text_updatedAt: dbPage.text_updatedAt,
        blocs,
      });
    });

    return NextResponse.json(pages);
  } catch (err) {
    console.error("GET /api/edition/page error:", err);
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

    //  AJOUT : Vérifier que body existe
    if (!body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 },
      );
    }

    const pagesPayload = Array.isArray(body) ? body : body.data;

    if (!Array.isArray(pagesPayload)) {
      return NextResponse.json(
        { error: "Payload must be an array of pages" },
        { status: 400 },
      );
    }

    //  AJOUT : Vérifier que le tableau n'est pas vide
    if (pagesPayload.length === 0) {
      return NextResponse.json(
        { error: "Pages array cannot be empty" },
        { status: 400 },
      );
    }

    //  AMÉLIORATION : Validation unique (pas en double)
    const validatedPages: PageObject[] = [];

    for (let i = 0; i < pagesPayload.length; i++) {
      const p = pagesPayload[i];

      try {
        const page = p instanceof PageObject ? p : new PageObject(p);

        if (!page.validateAll()) {
          console.error(`Validation failed for page at index ${i}:`, page);
          return NextResponse.json(
            {
              error: "Validation failed",
              pageIndex: i,
              page: p,
            },
            { status: 400 },
          );
        }

        //  AJOUT : Vérifier que blocs est bien un tableau
        if (!Array.isArray(page.blocs)) {
          return NextResponse.json(
            {
              error: "blocs must be an array",
              pageIndex: i,
            },
            { status: 400 },
          );
        }

        //  AJOUT : Vérifier que chaque bloc a toJSON()
        for (const bloc of page.blocs) {
          if (typeof bloc.toJSON !== "function") {
            return NextResponse.json(
              {
                error: "Invalid bloc object (missing toJSON method)",
                pageIndex: i,
              },
              { status: 400 },
            );
          }
        }

        validatedPages.push(page);
      } catch (validationErr) {
        console.error(`Error validating page at index ${i}:`, validationErr);
        return NextResponse.json(
          {
            error: "Validation error",
            pageIndex: i,
            details:
              validationErr instanceof Error
                ? validationErr.message
                : "Unknown error",
          },
          { status: 400 },
        );
      }
    }

    //  AMÉLIORATION : Vérifier l'existence des pages à mettre à jour
    const pagesToUpdate = validatedPages.filter(
      (page) =>
        page.number_id !== null &&
        page.number_id !== undefined &&
        page.number_id > 0,
    );

    if (pagesToUpdate.length > 0) {
      const existingIds = await prisma.page.findMany({
        where: {
          number_id: {
            in: pagesToUpdate.map((p) => Number(p.number_id)),
          },
        },
        select: { number_id: true },
      });

      const existingIdSet = new Set(existingIds.map((p) => p.number_id));
      const missingIds = pagesToUpdate
        .map((p) => p.number_id)
        .filter((id) => !existingIdSet.has(Number(id)));

      if (missingIds.length > 0) {
        return NextResponse.json(
          {
            error: "Some pages to update do not exist",
            missingIds,
          },
          { status: 404 },
        );
      }
    }

    //  AMÉLIORATION : Utiliser une transaction pour tout-ou-rien
    const allPages = await prisma.$transaction(
      validatedPages.map((page) => {
        const isUpdate =
          page.number_id !== null &&
          page.number_id !== undefined &&
          page.number_id > 0;

        //  AJOUT : Gestion d'erreur pour JSON.stringify
        let blocsJson: string;
        try {
          blocsJson = JSON.stringify(page.blocs.map((b) => b.toJSON()));
        } catch (stringifyErr) {
          throw new Error(
            `Failed to serialize blocs for page "${page.text_titre}": ${
              stringifyErr instanceof Error
                ? stringifyErr.message
                : "Unknown error"
            }`,
          );
        }

        const pageData = {
          number_parent_id:
            page.number_parent_id === -1 ? null : page.number_parent_id,
          checkbox_published: page.checkbox_published,
          checkbox_home_page: page.checkbox_home_page,
          text_titre: page.text_titre ?? "",
          text_description: page.text_description ?? "",
          text_slug: page.text_slug ?? "",
          number_page_position: page.number_page_position ?? 0,
          text_langue: page.text_langue ?? "fr_FR",
          blocs: blocsJson,
          text_updatedAt: new Date(),
        };

        if (isUpdate) {
          return prisma.page.update({
            where: { number_id: Number(page.number_id) },
            data: pageData,
          });
        } else {
          return prisma.page.create({
            data: {
              ...pageData,
              text_createdAt: new Date(),
            },
          });
        }
      }),
    );

    return NextResponse.json(allPages, {
      status: 201,
    });
  } catch (err) {
    console.error("POST /api/pages error:", err);

    //  AMÉLIORATION : Gestion d'erreur Prisma typée
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Un slug en doublon a été détecté" },
          { status: 409 }, // Conflict
        );
      }

      if (err.code === "P2025") {
        return NextResponse.json(
          { error: "Une ou plusieurs pages à mettre à jour n'existent pas" },
          { status: 404 },
        );
      }

      if (err.code === "P2003") {
        return NextResponse.json(
          { error: "Contrainte de clé étrangère violée (parent_id invalide)" },
          { status: 400 },
        );
      }
    }

    //  CORRECTION CRITIQUE : Retourner 500 pour les vraies erreurs
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
