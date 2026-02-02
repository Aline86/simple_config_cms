import getPages from "./callPages";
import PageClient from "./PageClient";

export default async function Page() {
  const pages = await getPages();
  if (pages !== undefined && Array.isArray(pages)) {
    return <PageClient initialPages={pages} />;
  } else {
    return <div>Pages non trouvée</div>;
  }
}
