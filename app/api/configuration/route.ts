import { NextRequest } from "next/server";
import { getPageBySlug } from "../../../lib/cache/page.slug";
import { ApiResponse } from "../../../lib/helpers/ApiResponse";
import { RequestHelper } from "../../../lib/helpers/RequestHelper";
import { prisma } from "../../../prisma/prisma";
import getConfiguration from "../../edition/configuration/callConfiguration";



export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
    
     const dbConfiguration = await getConfiguration()

      if (!dbConfiguration) {
        throw new Error("Configuration not found");
      }

      return { message: "Configuration got", page: dbConfiguration };
    },
    {
      errorHandler: (err: Record<string, unknown>) => {
       
        if (err.message === "Configuration not found") {
          return ApiResponse.notFound("Configuration not found");
        }
        return ApiResponse.serverError(err);
      },
    },
  );
}
