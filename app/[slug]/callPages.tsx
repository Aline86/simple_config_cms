// PAS de "use client"

export default async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page?slug=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Erreur chargement page");
  }
  const page = await res.json();

  return page ?? null;
}
