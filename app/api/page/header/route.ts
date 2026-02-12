import { NextRequest, NextResponse } from "next/server";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { prisma } from "../../../../prisma/prisma";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
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
