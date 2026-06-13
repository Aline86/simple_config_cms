import { useEffect, useRef, useState } from "react";
import getPages from "../../../app/edition/pages/callPages";
import { useAppContext } from "../../../context/DomDataProvider";
import { PageObject } from "../../../database/model/Page";
import { HeaderObject } from "../../../database/model/bloc/Header";

export const isValidColor = (value?: string): boolean => {
  if (!value) return false;
  const isHex =
    /^#[0-9A-Fa-f]{3}$/.test(value) || /^#[0-9A-Fa-f]{6}$/.test(value);
  return isHex || value.startsWith("rgb(") || value.startsWith("rgba(");
};

const isValidImageUrl = (value?: string): boolean => {
  if (!value) return false;
  return (
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value) ||
    value.startsWith("http") ||
    value.startsWith("/")
  );
};

const getBackgroundType = (url?: string): "color" | "image" | "empty" => {
  if (isValidColor(url)) return "color";
  if (isValidImageUrl(url)) return "image";
  return "empty";
};

export function useHeader(bloc: HeaderObject) {
  const navRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  const [isSticky, setIsSticky] = useState(true);
  const [isBurger, setIsBurger] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [stateBG, setStateBG] = useState<"color" | "image" | "empty">("empty");
  const [pages, setPages] = useState<PageObject[]>();
  const { setHasH1InPage } = useAppContext();
  const fetchPages = async () => {
    const result = await getPages();
    setPages(result.pages ?? []);
  };

  const checkOverflow = () => {
    if (!scrollRef.current || !navRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    const navWidth = navRef.current.scrollWidth;
    setIsBurger(navWidth > containerWidth - containerWidth * 0.7);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollY = window.scrollY;
    setIsSticky(scrollY < window.innerHeight * 2);
  };

  useEffect(() => {
    void fetchPages();
  }, []);

  useEffect(() => {
    setHasH1InPage(bloc.text_nom_site.trim().length > 0);
  }, [bloc]);

  useEffect(() => {
    if (!pages) return;

    const observer = new ResizeObserver(checkOverflow);
    if (scrollRef.current) observer.observe(scrollRef.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkOverflow);

    handleScroll();
    checkOverflow();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkOverflow);
      observer.disconnect();
    };
  }, [pages]);

  useEffect(() => {
    setStateBG(getBackgroundType(bloc.text_background_url));
  }, [bloc.text_background_url]);

  return {
    navRef,
    scrollRef,
    isSticky,
    isBurger,
    isOpen,
    setIsOpen,
    stateBG,
    pages,
  };
}
