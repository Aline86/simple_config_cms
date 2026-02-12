import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { prisma } from "../../../../prisma/prisma";
export const runtime = "nodejs";

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
