"use server";
export default async function getHomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page/homepage`,
    {
      cache: "no-store", // important pour SSR dynamique
    },
  );
  if (!res.ok) {
    return false;
  }

  return res.json();
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
