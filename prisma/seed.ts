import { PrismaClient } from "../prisma/generated/client"; // ✅ Votre custom output
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("test1234", 10);

  const user = await prisma.user.upsert({
    where: { text_email: "test@test.com" },
    update: {},
    create: {
      text_name: "test1234",
      text_email: "test@test.com",
      text_password: hashedPassword,
      text_createdAt: new Date(),
      text_updatedAt: new Date(),
    },
  });

  console.log("User created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
