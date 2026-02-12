"use server";
import { headers } from "next/headers";
import { getBaseUrl } from "../../../lib/helpers/baseUrl";

export default async function getPages(with_homepage: string = "all_pages") {
  const cookie = (await headers()).get("cookie") ?? "";
  const base_url = await getBaseUrl();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages?with_homepage=` +
      String(with_homepage),
    {
      cache: "no-store", // important pour SSR dynamique
      headers: {
        Cookie: cookie,
      },
    },
  );
  if (!res.ok) {
    return false;
  }

  return res.json();
}
