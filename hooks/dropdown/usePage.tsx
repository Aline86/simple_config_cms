"use client";

import { useEffect, useState } from "react";
import { getPageBySlug } from "../../app/edition/page/[slug]/callPages";

export default function usePage(slug?: string) {
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setParentId(null);
      return;
    }

    (async () => {
      try {
        const raw = await getPageBySlug(slug);

        if (
          raw !== null &&
          raw !== undefined &&
          raw.page !== null &&
          raw.page !== undefined
        ) {
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
  }, []);

  return { parentId };
}
