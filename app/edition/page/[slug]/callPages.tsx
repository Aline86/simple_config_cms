export async function getPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page?slug=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return false;
  }
  const page = await res.json();

  return page ?? null;
}

export async function getPageHeader() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page/header`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("Erreur chargement page");
  }
  const header = await res.json();

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
    reseaux: Array<{
      text_titre: "";
      image_url: "";
      color_couleur_bg: "";
      text_image_lien: "";
      number_position_image: number;
    }>,
  };
  return header ?? postPageHeader(headerData);
}
async function postPageHeader(headerData: { [key: string]: unknown }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page/header`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(headerData),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erreur création header");
  }

  const result = await res.json();
  return result;
}
export async function getPageFooter() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page/footer`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erreur chargement footer");
  }

  const footer = await res.json();

  const footerData = {
    color_background_color: "",
    text_nom_site_adresse: "",
    text_adresse_footer: "",
    text_code_postal: "",
    reseaux: Array<{
      text_titre: "";
      image_url: "";
      color_couleur_bg: "";
      text_image_lien: "";
      number_position_image: number;
    }>,
  };

  return footer ?? postPageFooter(footerData);
}
async function postPageFooter(footerData: { [key: string]: unknown }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/page/footer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(footerData),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erreur création footer");
  }

  const result = await res.json();
  return result;
}
