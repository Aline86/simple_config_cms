import { getConfiguration } from "../../../lib/cache/configuration";
import { ApiResponse } from "../../../lib/helpers/ApiResponse";

export async function GET() {
  return ApiResponse.handle(
    async () => {
      const dbConfiguration = await getConfiguration();

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
