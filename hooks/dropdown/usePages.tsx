import { useEffect, useState } from "react";

export default function usePages() {
  const [pages, setPages] = useState<{ slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const getPages = async () => {
    await fetch("/api/edition/pages")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setPages(data.pages);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    void getPages();
  }, []);

  if (pages !== undefined) {
    return { pages, loading };
  }
}
