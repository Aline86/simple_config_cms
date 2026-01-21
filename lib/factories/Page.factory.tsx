// lib/factories/page.factory.ts
import { PageObject } from "@/model/Page";

export function createNewPage(
  page_position: number,
  langue: string,
): PageObject {
  return new PageObject(
    {
      parent_id: null, // toujours null à la création
      published: false, // page non publiée par défaut
      titre: "", // titre vide
      page_position: page_position,
      langue: langue ?? "fr", // langue par défaut "fr"
      blocs: [], // aucun bloc par défaut
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    "edition", // mode fixe
  );
}
