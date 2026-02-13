import bcrypt from "bcryptjs";

import { prisma } from "./../../prisma/prisma";
export type CreateUserInput = {
  text_email: string;
  text_password: string;
  text_name?: string;
};

// CREATE (signup)
export async function createUser(data: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(data.text_password, 10);

  const user = await prisma.user.create({
    data: {
      text_email: data.text_email,
      text_password: hashedPassword,
      text_name: data.text_name,
    },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { text_email: email },
  });
}

export async function verifyUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.text_password);
  if (!isValid) return null;

  return user;
}
