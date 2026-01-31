import bcrypt from "bcrypt";
async function createUser(email: string, plainPassword: string, name?: string) {
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 salt rounds

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return user;
}
