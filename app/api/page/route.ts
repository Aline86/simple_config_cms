import { NextRequest } from "next/server";
import { getPageBySlug } from "../../../lib/cache/page.slug";
import { ApiResponse } from "../../../lib/helpers/ApiResponse";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return ApiResponse.missingParameter("slug");
  }

  return ApiResponse.handle(
    async () => {
      const dbPage = await getPageBySlug(slug);

      if (!dbPage) {
        throw new Error("Page not found");
      }

      return { message: "Page got", page: dbPage };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
        if (err.message === "Page not found") {
          return ApiResponse.notFound("Page not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}
