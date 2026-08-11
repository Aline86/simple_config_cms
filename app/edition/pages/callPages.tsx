export async function return_data_url(url: string) {
  const res = await fetch(`${url}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return false;
  }

  return res.json();
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
