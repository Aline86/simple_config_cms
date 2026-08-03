"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPageBySlug } from "../../app/edition/page/[slug]/callPages";

export default function usePage() {
  const params = useParams<{ slug: string }>();
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    console.log("[usePage] params =", params);
    if (params !== undefined && params !== null) {
      const slug = params.slug;

      if (!slug) {
        console.log("[usePage] pas de slug, sortie");

        setParentId(null);
        return;
      }

      (async () => {
        try {
          const raw = await getPageBySlug(slug);

          if (raw !== null && raw !== undefined) {
            setParentId(
              raw.page.number_parent_id != null
                ? String(raw.page.number_parent_id)
                : raw.page.number_id,
            );
          }
        } catch (e) {
          console.error("[usePage] échec:", e);
        }
      })();
    }
  }, [params.slug]);

  return { parentId };
}
