import { useCallback, useEffect, useRef, useState } from "react";

import { useAppContext } from "../../../context/DomDataProvider";
import { HeaderObject } from "../../../database/model/bloc/Header";
import usePages from "../../dropdown/usePages";

const RESERVE = 380;

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const ghostRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const titleGhostRef = useRef<HTMLElement>(null);
  const [measured, setIsMeasured] = useState(false);

  const [isBurger, setIsBurger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { pages } = usePages();
  const { setHasH1InPage } = useAppContext();

  const stateBG = getBackgroundType(bloc.text_background_url);

  const checkOverflow = useCallback(() => {
    const row = rowRef.current;
    const ghost = ghostRef.current;

    if (!row || !ghost) return;

    const available = row.offsetWidth - (logoRef.current?.offsetWidth ?? 0);
    const needed = ghost.offsetWidth;
    console.log("needed", needed, "available", available, available - needed);
    setIsBurger(available - needed - RESERVE < 0 ? true : false);
    setIsMeasured(true);
  }, []);

  useEffect(() => {
    setHasH1InPage(bloc.text_nom_site.trim().length > 0);
  }, [bloc.text_nom_site, setHasH1InPage]);

  useEffect(() => {
    if (!pages) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(checkOverflow);
    };

    const observer = new ResizeObserver(schedule);
    if (rowRef.current) observer.observe(rowRef.current);

    schedule();
    document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pages, checkOverflow]);

  useEffect(() => {
    if (!isBurger && isOpen) setIsOpen(false);
  }, [isBurger, isOpen]);

  return {
    scrollRef,
    rowRef,
    ghostRef,
    navRef,
    logoRef,

    isBurger,
    isOpen,
    setIsOpen,
    stateBG,
    pages,
    measured,
    titleGhostRef,
  };
}

export type HeaderState = ReturnType<typeof useHeader>;
