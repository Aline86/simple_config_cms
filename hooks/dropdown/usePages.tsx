"use client";

import { useEffect, useState } from "react";
import { PageObject } from "../../database/model/Page";

export default function usePages(id?: string | null | undefined) {
  const [pages, setPages] = useState<PageObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const url =
      id != null && id !== undefined
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages?parent_id=` +
          encodeURIComponent(String(id))
        : `${process.env.NEXT_PUBLIC_APP_URL}/api/edition/pages`;

    (async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data.pages)
          ? data.pages
          : data.pages && typeof data.pages === "object"
            ? Object.values(data.pages)
            : [];
        setPages(list as PageObject[]);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error(err);
        setPages([]);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  return { pages, loading };
}
