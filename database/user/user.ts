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

// READ (by id)
export async function getUserById(number_id: number) {
  return prisma.user.findUnique({
    where: { number_id },
  });
}

// READ (by email)
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { text_email: email },
  });
}

// UPDATE (partial)
export async function updateUser(
  number_id: number,
  data: { text_name?: string; text_password?: string },
) {
  const updateData: unknown = {};
  if (data.text_name) updateData.text_name = data.text_name;
  if (data.text_password)
    updateData.text_password = await bcrypt.hash(data.text_password, 10);

  return prisma.user.update({
    where: { number_id },
    data: updateData,
  });
}

// DELETE
export async function deleteUser(number_id: number) {
  return prisma.user.delete({
    where: { number_id },
  });
}

// Auth: verify password
export async function verifyUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.text_password);
  if (!isValid) return null;

  return user;
}
