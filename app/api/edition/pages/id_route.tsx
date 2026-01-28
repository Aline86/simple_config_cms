// pages/api/pages/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { BlocObject } from "@/model/Bloc";
import { PageObject } from "@/model/Page";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  if (Array.isArray(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    // ==================== DELETE ====================
    if (req.method === "DELETE") {
      const deletedPage = await prisma.page.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json(deletedPage);
    }

    // Méthode non autorisée
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
