import { useEffect } from "react";

export function useClickInside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handlerClickInside: (event: MouseEvent) => void
) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!ref.current) return;

      if (ref.current.contains(event.target as Node)) {
        handlerClickInside(event);
      }
    }

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handlerClickInside]);
}
