import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // on prend bcryptjs pour être sûr que ça matche partout

const prisma = new PrismaClient();

async function main() {
  const email = "test@test.com";
  const passwordPlain = "test1234";

  // Supprime l'utilisateur existant pour être sûr
  await prisma.user.deleteMany({
    where: { text_email: email },
  });

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(passwordPlain, 10);

  // Création de l'utilisateur
  const user = await prisma.user.create({
    data: {
      text_name: "Test User",
      text_email: email,
      text_password: hashedPassword,
      text_createdAt: new Date(),
      text_updatedAt: new Date(),
    },
  });

  console.log("Utilisateur seedé !");
  console.log("Email:", user.text_email);
  console.log("Password (pour dev):", passwordPlain);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
