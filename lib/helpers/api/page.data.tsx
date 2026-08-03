import { PageObject } from "../../../database/model/Page";


export function toPageData(page: PageObject) {
  return {
    number_parent_id:
      page.number_parent_id === -1 ? null : page.number_parent_id,
    checkbox_published: page.checkbox_published,
    checkbox_home_page: page.checkbox_home_page,
    text_titre: page.text_titre ?? "",
    text_description: page.text_description ?? "",
    text_slug: page.text_slug ?? "",
    number_page_position: page.number_page_position ?? 0,
    text_langue: page.text_langue ?? "fr_FR",
    blocs: JSON.stringify(page.blocs.map((b) => b.toJSON())),
    text_updatedAt: new Date(),
  };
}
