import { BlocObject } from "../../../database/model/Bloc";
import { PageObject } from "../../../database/model/Page";
import { getPages } from "../../cache/pages";
import { ApiResponse } from "../ApiResponse";
import { NextRequest } from "next/server";

export const getPagesData = (request: NextRequest) => {
  return ApiResponse.handle(
    async () => {
      const { searchParams } = new URL(request.url);
      const parent_id = searchParams.get("parent_id");
      const dbPages = await getPages(parent_id);

      const pages = dbPages.map((dbPage) => {
        const blocs =
          typeof dbPage.blocs === "string"
            ? JSON.parse(dbPage.blocs).map((b: BlocObject) => new BlocObject(b))
            : [];

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

      return {
        message: "Pages got",
        pages: {
          ...pages,
        },
      };
    },
    {
      errorHandler: (err) => {
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
};

