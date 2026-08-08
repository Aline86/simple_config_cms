"use server";
export async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page?slug=${encodeURIComponent(slug)}`,
  );
  if (!res.ok) {
    return false;
  }
  const page = await res.json();

  return page ?? null;
}

export async function getPageHeader() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/page/header`);

  if (!res.ok) {
    throw new Error("Erreur chargement page");
  }

  const header = await res.json();

  return header;
}

export async function getPageFooter() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/page/footer`);

  if (!res.ok) {
    throw new Error("Erreur chargement footer");
  }

  const footer = await res.json();
  return footer;
}
export default async function getHomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page/homepage`,
  );
  if (!res.ok) {
    return false;
  }

  return res.json();
}
