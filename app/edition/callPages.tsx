export async function getPageBySlug(slug: string) {
  const res = await fetch(`/api/pages?slug=${encodeURIComponent(slug)}`);
  console.log("res", res);
  if (!res.ok) {
    return false;
  }
  const page = await res.json();

  return page ?? null;
}
