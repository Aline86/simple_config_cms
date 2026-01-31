import { useEffect, useState } from "react";

export default function usePages() {
  const [pages, setPages] = useState<{ slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/edition/pages")
      .then((res) => res.json())
      .then((data) => setPages(data))
      .finally(() => setLoading(false));
  }, []);

  return { pages, loading };
}
