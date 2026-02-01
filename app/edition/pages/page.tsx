import getPages from "./callPages";
import PageClient from "./PageClient";

export default async function Page() {
  const pages = await getPages();
  if (pages !== undefined) {
    return <PageClient initialPages={pages} />;
  } else {
    return <div>Pages non trouvée</div>;
  }
}
