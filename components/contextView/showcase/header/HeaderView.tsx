"use client";

import { useEffect, useRef, useState } from "react";
import SocialTab from "./SocialTab";
import { HeaderObject } from "../../../../database/model/bloc/Header";
import getPages from "../../../../app/edition/pages/callPages";
import { PageObject } from "../../../../database/model/Page";
import { useAppContext } from "../../../../context/DomDataProvider";
import Image from "next/image";

interface ViewProps {
  bloc: HeaderObject;
}

// Validators
export const isValidColor = (value?: string): boolean => {
  if (!value) return false;
  return (
    /^#([0-9A-F]{3}){1,2}$/i.test(value) ||
    /^rgb\(/.test(value) ||
    /^rgba\(/.test(value)
  );
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

export default function HeaderView({ bloc }: ViewProps) {
  const navRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(true);
  const [isBurger, setIsBurger] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [stateBG, setStateBG] = useState<"color" | "image" | "empty">("empty");
  const [pages, setPages] = useState<PageObject[]>();
  const { setHasH1InPage } = useAppContext();

  const checkOverflow = () => {
    if (!scrollRef.current || !navRef.current) return;

    const containerWidth = scrollRef.current.offsetWidth;
    const navWidth = navRef.current.scrollWidth;

    setIsBurger(navWidth > containerWidth - containerWidth * 0.7);
  };
  const showPages = async () => {
    const pages = await getPages();

    setPages(pages.pages ?? []);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollY = window.scrollY;
    setIsSticky(scrollY < window.innerHeight * 2);
  };

  useEffect(() => {
    showPages();
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
    setStateBG(getBackgroundType(bloc.text_background_url as string));
  }, [bloc.text_background_url]);

  return (
    pages !== undefined && (
      <>
        <header
          ref={scrollRef}
          style={{
            backgroundColor:
              stateBG !== "image"
                ? isValidColor(bloc.text_background_url) &&
                  ((bloc.text_background_url + "40") as string)
                : undefined,

            backgroundImage:
              stateBG === "image" && bloc.text_background_url
                ? `url(${bloc.text_background_url})`
                : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color:
              stateBG === "image" || stateBG === "color" ? "white" : "black",
          }}
          className={
            bloc.mode === "edition"
              ? `shadow ${isSticky ? "sticky" : "relative"} top-24 left-0 right-0 z-20`
              : " shadow fixed   left-0 right-0 z-20"
          }
        >
          <div className="mx-auto top-[-2px] px-4">
            <div className="flex items-center justify-between">
              <a
                title="Retour à l'accueil"
                href="/"
                className="logo text-xl font-bold text-indigo-600 relative flex-shrink-0 z-0"
              >
                {bloc.logo?.image_url ? (
                  <Image
                    src={bloc.logo.image_url}
                    alt={bloc.text_nom_site || "Logo"}
                    height="100"
                    width="100"
                    sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
                  />
                ) : (
                  "Mon Site"
                )}
              </a>

              <h1 className="flex-shrink-0  min-w-0 hidden sm:block truncate">
                {bloc.text_nom_site}
              </h1>

              <nav
                ref={navRef}
                className={`open-nav cursor-pointer flex flex-shrink space-x-8 whitespace-nowrap ${
                  isBurger && isOpen
                    ? "nav-dynamique nav-dynamique--open"
                    : isBurger
                      ? "absolute invisible"
                      : ""
                }`}
              >
                {Object.entries(pages).map(([, page]) => {
                  return (
                    <a key={page.number_id} href={"/" + page.text_slug}>
                      {page.text_titre}
                    </a>
                  );
                })}
              </nav>

              {isBurger && (
                <button
                  aria-label="Ouvrir le menu burger"
                  onClick={() => setIsOpen(!isOpen)}
                  className={
                    isOpen
                      ? "burger open-nav sticky z-50  cursor-pointer right-5 "
                      : "burger  relative z-50  cursor-pointer"
                  }
                >
                  {!isOpen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </header>

        <div
          className={
            bloc.mode === "edition"
              ? ` ${isSticky ? "fixed w-fit h-fit mt-5 right-[30px] z-0" : "absolute w-fit h-fit mt-20 right-[30px] z-0"}`
              : "fixed w-fit h-fit mt-5 right-[15px] z-15 "
          }
        >
          <div className="social-media absolute mb-2  mt-24 right-[-160px] ">
            {bloc.reseaux.map((network, index) => {
              return <SocialTab key={index} network={network} />;
            })}
          </div>
        </div>
      </>
    )
  );
}
