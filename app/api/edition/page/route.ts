import { NextRequest } from "next/server";
import { PageObject } from "../../../../database/model/Page";
export const runtime = "nodejs";
import { prisma } from "../../../../prisma/prisma";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { requireAuth } from "../requireAuth";
import { RequestHelper } from "../../../../lib/helpers/RequestHelper";
import { toPageData } from "../../../../lib/helpers/api/page.data";

// ========== GET PAGE BY SLUG ==========
export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      await requireAuth(request);
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
      await requireAuth(request);
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
      await requireAuth(request);
      const body = await RequestHelper.getBody(request);

      const page = new PageObject(body.data);

      if (!page.number_id || page.number_id <= 0) {
        throw new Error("id missing");
      }

      if (!page.validateAll()) {
        throw new Error("Validation failed");
      }

      const updated = await prisma.page.update({
        where: { number_id: page.number_id },
        data: toPageData(page),
      });

      return {
        message: "Page updated",
        page: { ...updated, blocs: page.blocs.map((b) => b.toJSON()) },
      };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "id missing") {
          return ApiResponse.missingParameter("id");
        }
        if (err.message === "Validation failed") {
          return ApiResponse.validationError("Validation failed");
        }
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
}