import { useEffect, useState } from "react";

export default function usePages() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(undefined);

  useEffect(() => {
    const getPages = async () => {
      try {
        const res = await fetch("/api/edition/pages");
        const data = await res.json();
        setPages(data.pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPages();
  }, []);

  return { pages, loading };
}
