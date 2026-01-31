// PAS de "use client"

export default async function getHomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page/homepage`,
    {
      cache: "no-store", // important pour SSR dynamique
    },
  );
  if (!res.ok) {
    throw new Error("Erreur chargement pages");
  }

  return res.json();
}
