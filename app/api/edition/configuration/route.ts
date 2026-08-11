import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { requireAuth } from "../requireAuth";

import { ConfigurationObject } from "../../../../database/model/Configuration";
import { revalidateTag } from "next/cache";

const CONFIGURATION_ID = 1;

async function readPayload(request: NextRequest): Promise<unknown> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
  if (body === null || typeof body !== "object") {
    throw new Error("Payload must be an object");
  }
  const data = (body as { data?: unknown }).data;
  return data !== undefined ? data : body;
}

function toConfiguration(payload: unknown): ConfigurationObject {
  if (payload === null || typeof payload !== "object") {
    throw new Error("Payload must be an object");
  }
  const configuration =
    payload instanceof ConfigurationObject
      ? payload
      : new ConfigurationObject({ ...payload, number_id: CONFIGURATION_ID });

  if (!configuration.validateAll()) {
    throw new Error("Validation failed");
  }
  return configuration;
}

export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const dbConfiguration = await prisma.configuration.findUnique({
        where: { number_id: CONFIGURATION_ID },
      });

      if (!dbConfiguration) {
        return NextResponse.json(
          {
            error: "Configuration not found",
            configuration: dbConfiguration,
          },
          { status: 404 },
        );
      }

      return {
        message: "Configuration got",
        configuration: new ConfigurationObject(dbConfiguration),
      };
    },
    {
      errorHandler: (err) => {
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
}

async function upsertConfiguration(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      await requireAuth(request);

      const configuration = toConfiguration(await readPayload(request));

      const fields = {
        number_taille: configuration.number_taille ?? null,
        color_main_color: configuration.color_main_color,
        text_police: configuration.text_police,
      };

      const saved = await prisma.configuration.upsert({
        where: { number_id: CONFIGURATION_ID },
        create: { number_id: CONFIGURATION_ID, ...fields },
        update: fields,
      });

      revalidateTag("configuration", { expire: 0 });

      return {
        message: "Configuration saved",
        configuration: new ConfigurationObject(saved),
      };
    },
    {
      errorHandler: (err) => {
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
}

export async function POST(request: NextRequest) {
  return upsertConfiguration(request);
}

export async function PUT(request: NextRequest) {
  return upsertConfiguration(request);
}
