// lib/factories/page.factory.ts

import { PageObject } from "../../model/Page";

export function createNewPage(
  number_page_position: number,
  langue: string,
): PageObject {
  return new PageObject(
    {
      parent_id: null, // toujours null à la création
      published: false, // page non publiée par défaut
      text_titre: "", // text_titre vide
      text_description: "", // text_titre vide
      checkbox_home_page: false,
      checkbox_published: false,
      text_slug: "", // text_titre vide
      number_page_position: number_page_position,
      langue: langue ?? "fr_FR", // langue par défaut "fr"
      blocs: [], // aucun bloc par défaut
      text_createdAt: new Date(),
      text_updatedAt: new Date(),
    },
    "edition", // mode fixe
  );
}
