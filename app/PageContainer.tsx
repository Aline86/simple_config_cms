import { PageObject } from "../database/model/Page";
import getHomePage, {
  getPageBySlug,
  getPageFooter,
  getPageHeader,
} from "./[slug]/callPages";
import PageClient from "./[slug]/PageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let page;

  if (slug !== undefined) {
    page = await getPageBySlug(slug);
    page = page.page;
  } else {
    page = await getHomePage();
  }
  const [header, footer] = await Promise.all([
    getPageHeader(),
    getPageFooter(),
  ]);

  if (!header || !footer || !page) {
    return (
      <body>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-blue-500 p-6 text-white">
            <h1 className="text-2xl text-center">
              Veuillez créer une page. N'oubliez pas de sélectionner une page
              d'accueil.
            </h1>
          </div>
        </div>
      </body>
    );
  }

  return (
    <PageClient
      initialpage={page}
      header={header.header}
      footer={footer.footer}
    />
  );
}
