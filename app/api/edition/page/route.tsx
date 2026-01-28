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
    // ==================== GET ====================
    if (req.method === "GET") {
      const dbPage = await prisma.page.findUnique({
        where: { id: Number(id) },
      });

      if (!dbPage) return res.status(404).json({ error: "Page not found" });

      const blocs: BlocObject[] =
        typeof dbPage.blocs === "string"
          ? JSON.parse(dbPage.blocs).map((b: any) => new BlocObject(b))
          : [];

      const page = new PageObject({
        id: String(dbPage.id),
        parent_id: dbPage.parent_id,
        published: dbPage.published,
        titre: dbPage.titre,
        slug: dbPage.slug,
        page_position: dbPage.page_position,
        langue: dbPage.langue,
        createdAt: dbPage.createdAt,
        updatedAt: dbPage.updatedAt,
        blocs,
      });

      return res.status(200).json(page);
    }

    // ==================== PUT ====================
    if (req.method === "PUT") {
      const page = new PageObject(req.body);

      if (!page.validateAll()) {
        return res.status(400).json({ error: "Validation failed" });
      }

      const updatedPage = await prisma.page.update({
        where: { id: Number(id) },
        data: {
          parent_id: page.number_parent_id,
          published: page.checkbox_published,
          titre: page.text_titre ?? "",
          slug: page.text_slug ?? "",
          page_position: page.number_page_position ?? 0,
          langue: page.text_langue ?? "fr_FR",
          blocs: JSON.stringify(page.blocs),
          updatedAt: new Date(),
        },
      });

      return res.status(200).json(updatedPage);
    }

    // ==================== DELETE ====================
    if (req.method === "DELETE") {
      const deletedPage = await prisma.page.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json(deletedPage);
    }

    // Méthode non autorisée
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
