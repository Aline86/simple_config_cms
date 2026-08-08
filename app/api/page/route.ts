import { NextRequest } from "next/server";
import { getPageBySlug } from "../../../lib/cache/page.slug";
import { ApiResponse } from "../../../lib/helpers/ApiResponse";
import { RequestHelper } from "../../../lib/helpers/RequestHelper";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const slug = RequestHelper.getRequiredSearchParam(request, "slug");
      const dbPage = await getPageBySlug(slug);

      if (!dbPage) {
        throw new Error("Page not found");
      }

      return { message: "Page got", page: dbPage };
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
