import { getPages } from "../../../../lib/cache/pages";
import PageClient from "../PageClient";
export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ parent_id: string }>;
}) {
  const { parent_id } = await params;

  let pages;
  if (parent_id !== null) {
    pages = await getPages(parent_id);

    return <PageClient initialPages={pages} parent_id={Number(parent_id)} />;
  } else {
    pages = await getPages();
    return <PageClient initialPages={[]} />;
  }
}
