export async function return_data_url(url: string) {
  try {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      return false;
    }
    return await res.json();
  } catch (error) {
    console.warn(`[Build/Runtime Fetch] Impossible de joindre ${url}:`, error);
    return false;
  }
}
export default async function getPages(id?: null | string) {
  if (id !== null && id !== undefined) {
    return return_data_url(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages?parent_id=` + id,
    );
  } else {
    return return_data_url(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages`,
    );
  }
}
