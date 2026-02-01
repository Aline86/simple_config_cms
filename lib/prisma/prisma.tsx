// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Singleton pour éviter les multiples instances sur Next.js
export const prisma =
  global.prisma || new PrismaClient({ log: ["query", "error"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
