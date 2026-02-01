// PAS de "use client"

export default async function getPages(with_homepage: string = "all_pages") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages?with_homepage=` +
      String(with_homepage),
    {
      cache: "no-store", // important pour SSR dynamique
    },
  );
  if (!res.ok) {
    return false;
  }

  return res.json();
}
