import getPages from "./callPages";
import PageClient from "./PageClient";
export const instant = false;

export default async function Page() {
  "use cache";

  const pages = await getPages();
  if (pages !== undefined) {
    return <PageClient initialPages={pages.pages} />;
  } else {
    return <div>Pages non trouvée</div>;
  }
}
