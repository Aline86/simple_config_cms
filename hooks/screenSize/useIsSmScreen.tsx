import { useEffect, useState } from "react";

export function useIsSmScreen() {
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    function checkSize() {
      setIsSm(window.innerWidth <= 640);
    }

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isSm;
}
