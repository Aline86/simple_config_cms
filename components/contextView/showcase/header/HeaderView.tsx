"use client";

import FIELD_CONFIGS from "@/config/fieldConfig";
import { HeaderObject } from "@/model/bloc/Header";
import { TextValidator } from "@/validators/TextValidator";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import SocialTab from "./SocialTab";

interface MediaViewProps {
  header: HeaderObject;
}

// Validators
const isValidColor = (value?: string): boolean => {
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

export default function HeaderView({ header }: MediaViewProps) {
  const navRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  const [isSticky, setIsSticky] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isBurger, setIsBurger] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [stateBG, setStateBG] = useState<"color" | "image" | "empty">("empty");

  const checkOverflow = () => {
    if (!scrollRef.current || !navRef.current) return;

    const containerWidth = scrollRef.current.offsetWidth;
    const navWidth = navRef.current.scrollWidth;

    setIsBurger(navWidth > containerWidth - 50);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollY = window.scrollY;
    setIsSticky(scrollY < window.innerHeight * 2);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    if (scrollRef.current) observer.observe(scrollRef.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkOverflow);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkOverflow);
      observer.disconnect();
    };
  }, [isMounted]);

  useEffect(() => {
    setStateBG(getBackgroundType(header?.text_background_url as string));
  }, [header?.text_background_url]);

  if (!isMounted) {
    return (
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">MonSite</span>
          <div className="w-6 h-6" />
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        ref={scrollRef}
        style={{
          backgroundColor:
            stateBG !== "image"
              ? (header?.text_background_url as string)
              : undefined,
          backgroundImage:
            stateBG === "image" && header?.text_background_url
              ? `url(${header.text_background_url})`
              : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`shadow ${isSticky ? "sticky" : "relative"} top-0 left-0 right-0 z-20`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 ">
            <span className="text-xl font-bold text-indigo-600 relative  flex-shrink-0 z-0">
              {header?.image_logo?.image_url ? (
                <img
                  src={header.image_logo.image_url}
                  className="logo-site"
                  alt={header.text_nom_site || "Logo"}
                />
              ) : (
                "Mon Site"
              )}
            </span>

            <h1 className="flex-shrink-0 mx-4 ">{header?.text_nom_site}</h1>

            <nav
              ref={navRef}
              className={`cursor-pointer flex flex-shrink space-x-8 whitespace-nowrap ${
                isBurger && isOpen
                  ? "nav-dynamique nav-dynamique--open"
                  : isBurger
                    ? "absolute invisible"
                    : ""
              }`}
            >
              <a href="#">Accueil</a>
              <a href="#">Services</a>
              <a href="#">À propos</a>
              <a href="#">Contact</a>
              <a href="#">Accueil</a>
              <a href="#">Services</a>
              <a href="#">À propos</a>
              <a href="#">Contact</a>
            </nav>

            {isBurger && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50  cursor-pointer"
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
      {header?.image_reseaux !== null ? (
        <div
          className={` ${isSticky ? "fixed w-fit h-fit mt-5 right-[30px] z-0" : "absolute w-fit h-fit mt-20 right-[30px] z-0"}`}
        >
          <div className="social-media absolute mb-2 right-[0px]">
            {header.image_reseaux.map((network, index) => {
              return <SocialTab key={index} network={network} />;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
