import { BlocObject } from "@/model/Bloc";
import { PageObject } from "@/model/Page";

export function clonePageWithBlocs(
  page: PageObject,
  updatedBlocs: BlocObject[],
) {
  return new PageObject({
    id: page.number_id,
    parent_id: page.number_parent_id, // toujours null à la création
    published: page.checkbox_published, // page non publiée par défaut
    text_titre: page.text_titre ?? "", // text_titre vide
    text_description: page.text_description ?? "", // text_titre vide
    slug: page.text_slug ?? "", // text_titre vide
    number_page_position: page.number_page_position ?? 0,
    langue: page.text_langue ?? "fr_FR", // langue par défaut "fr"
    blocs: updatedBlocs, // aucun bloc par défaut
    text_createdAt: page.text_createdAt ?? new Date(),
    text_updatedAt: page.text_updatedAt ?? new Date(),
  });
}
