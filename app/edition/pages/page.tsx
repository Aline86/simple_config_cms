import getPages from "./callPages";
import PageClient from "./PageClient";
export const instant = false;

export default async function Page() {
  "use cache";

  const pages = await getPages();
  if (pages !== undefined) {
    return <PageClient initialPages={pages.pages} />;
  } else {
    return <body>Pages non trouvée</body>;
  }
}
