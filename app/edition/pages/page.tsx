"use client";

import usePages from "../../../hooks/dropdown/usePages";
import PageClient from "./PageClient";

export default function Page() {
  const pages = usePages();
  if (pages !== undefined) {
    return <PageClient initialPages={pages.pages} />;
  } else {
    return <div>Pages non trouvée</div>;
  }
}
