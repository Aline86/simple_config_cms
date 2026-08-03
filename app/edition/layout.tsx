import { ReactNode } from "react";
import { DomDataProvider } from "../../context/DomDataProvider";

export default function EditionLayout({ children }: { children: ReactNode }) {
  return <DomDataProvider>{children}</DomDataProvider>;
}
