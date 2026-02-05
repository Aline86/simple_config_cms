import getPages from "./callPages";
import PageClient from "./PageClient";

export default async function Page() {
  const pages = await getPages();
  if (pages !== undefined) {
    return <PageClient initialPages={pages.pages} />;
  } else {
    return <body>Pages non trouvée</body>;
  }
}
