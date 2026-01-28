import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

async function main() {
  console.log(
    "DATABASE_URL from env:",
    process.env.DATABASE_URL?.substring(0, 50),
  );
  console.log("Testing connection...");
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log("Success!", result);
}

main()
  .catch((e) => console.error("Error:", e))
  .finally(() => prisma.$disconnect());
