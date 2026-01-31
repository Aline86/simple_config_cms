import PageClient from "./[slug]/PageClient";
import getHomePage from "./callPages";
import { getPageFooter, getPageHeader } from "./edition/page/[slug]/callPages";

export default async function Page() {
  const page = await getHomePage();

  if (!page) {
    return <div>Page non trouvée</div>;
  }
  const header = await getPageHeader();

  if (!header) {
    return <div>PB lors du chargement du header</div>;
  }
  const footer = await getPageFooter();

  if (!footer) {
    return <div>PB lors du chargement du header</div>;
  }
  return <PageClient initialpage={page} header={header} footer={footer} />;
}
