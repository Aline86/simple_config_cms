"use server";
import { headers } from "next/headers";
import { getBaseUrl } from "../../../../lib/helpers/baseUrl";

export async function getPageBySlug(slug: string) {
  const cookie = (await headers()).get("cookie") ?? "";
  const base_url = await getBaseUrl();
  const res = await fetch(
    `${base_url}/api/edition/page?slug=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    },
  );
  if (!res.ok) {
    return false;
  }
  const page = await res.json();

  return page ?? null;
}
