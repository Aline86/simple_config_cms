import { NextRequest } from "next/server";
import { PageObject } from "../../../../database/model/Page";
export const runtime = "nodejs";
import { prisma } from "../../../../prisma/prisma";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { requireAuth } from "../requireAuth";
import { RequestHelper } from "../../../../lib/helpers/RequestHelper";

// ========== GET PAGE BY SLUG ==========
export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const user = await requireAuth(request);
      const slug = RequestHelper.getRequiredSearchParam(request, "slug");

      const dbPage = await prisma.page.findFirst({
        where: { text_slug: slug },
      });

      if (!dbPage) {
        throw new Error("Page not found");
      }

      return {
        message: "Page got",
        page: {
          ...dbPage,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "slug missing") {
          return ApiResponse.missingParameter("Slug");
        }
        if (err.message === "Page not found") {
          return ApiResponse.notFound("Page not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}

// ========== DELETE PAGE ==========
export async function DELETE(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const user = await requireAuth(request);
      const id = await RequestHelper.getBodyProperty<number>(
        request,
        "id",
        true,
      );

      const deletedPage = await prisma.page.delete({
        where: { number_id: Number(id) },
      });

      return deletedPage;
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "id missing") {
          return ApiResponse.missingParameter("id");
        }
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
}

// ========== UPDATE PAGE ==========
export async function PUT(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const user = await requireAuth(request);
      const body = await RequestHelper.getBody(request);
      const rawPage = body.data;

      // Sérialisation des blocs
      rawPage.blocs = JSON.stringify(rawPage.blocs);

      // Validation
      const page = new PageObject(rawPage);
      if (!page.validateAll()) {
        throw new Error("Validation failed");
      }

      // Mise à jour
      await prisma.page.update({
        where: { number_id: Number(rawPage.number_id) },
        data: rawPage,
      });

      return {
        message: "Page got",
        page: {
          ...rawPage,
        },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "Validation failed") {
          return ApiResponse.validationError("Validation failed");
        }
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
}
