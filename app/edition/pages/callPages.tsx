// PAS de "use client"

export default async function getPages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages`,
    {
      cache: "no-store", // important pour SSR dynamique
    },
  );
  console.log("res", res);
  if (!res.ok) {
    throw new Error("Erreur chargement pages");
  }

  return res.json();
}
