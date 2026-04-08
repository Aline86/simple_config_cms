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

export async function getPageHeader() {
  const cookie = (await headers()).get("cookie") ?? "";
  const base_url = await getBaseUrl();
  const res = await fetch(base_url + `/api/edition/page/header`, {
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  if (res.status === 404) {
    const headerData = {
      text_nom_site: "",
      text_background_url: "",
      favicon: {
        text_titre: "",
        image_url: "",
        color_couleur_bg: "",
        text_image_lien: "",
        number_position_image: 0,
      },
      logo: {
        text_titre: "",
        image_url: "",
        color_couleur_bg: "",
        text_image_lien: "",
        number_position_image: 0,
      },
      reseaux: [],
    };
    const result = await postPageHeader(headerData);

    return result;
  }

  if (!res.ok) {
    throw new Error("Erreur chargement page");
  }

  const header = await res.json();
  return header;
}
async function postPageHeader(headerData: { [key: string]: unknown }) {
  const cookie = (await headers()).get("cookie") ?? "";
  const base_url = await getBaseUrl();
  const res = await fetch(base_url + `/api/edition/page/header`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(headerData),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.error || "Erreur création header");
  }

  const result = await res.json();

  return result;
}
export async function getPageFooter() {
  const cookie = (await headers()).get("cookie") ?? "";
  const base_url = await getBaseUrl();
  const res = await fetch(base_url + `/api/edition/page/footer`, {
    cache: "no-store",
    headers: {
      Cookie: cookie,
    },
  });

  if (res.status === 404) {
    const footerData = {
      color_background_color: "",
      text_nom_site_adresse: "",
      text_adresse_footer: "",
      text_code_postal: "",
      reseaux: [],
    };
    return postPageFooter(footerData);
  }

  if (!res.ok) {
    throw new Error("Erreur chargement footer");
  }

  const footer = await res.json();
  return footer;
}
async function postPageFooter(footerData: { [key: string]: unknown }) {
  const cookie = (await headers()).get("cookie") ?? "";
  const base_url = await getBaseUrl();
  const res = await fetch(base_url + `/api/edition/page/footer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(footerData),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erreur création footer");
  }

  const result = await res.json();
  return result;
}
