"use server";
export async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page?slug=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return false;
  }
  const page = await res.json();

  return page ?? null;
}

export async function getPageHeader() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page/header`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erreur chargement page");
  }

  const header = await res.json();

  return header;
}

export async function getPageFooter() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page/footer`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erreur chargement footer");
  }

  const footer = await res.json();
  return footer;
}
