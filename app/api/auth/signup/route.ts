import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text_email, text_password, text_name } = body;

    if (!text_email || !text_password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { text_email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(text_password, 10);

    const user = await prisma.user.create({
      data: {
        text_email,
        text_password: hashedPassword,
        text_name: text_name ?? "test",
      },
      select: {
        number_id: true,
        text_email: true,
        text_name: true,
        text_createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
