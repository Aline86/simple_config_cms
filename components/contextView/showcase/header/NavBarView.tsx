import Image from "next/image";

import { HeaderObject } from "../../../../database/model/bloc/Header";
import {
  isValidColor,
  type HeaderState,
} from "../../../../hooks/components/header/HeaderHook";

export default function NavBarView({
  bloc,
  header,
}: {
  bloc: Readonly<HeaderObject>;
  header: HeaderState;
}) {
  const {
    rowRef,
    ghostRef,
    navRef,
    logoRef,
    measured,
    isBurger,
    isOpen,
    setIsOpen,
    stateBG,
    pages,
  } = header;

  const isEdition =
    bloc.mode === "edition"
      ? ""
      : measured
        ? "shadow fixed top-0 left-0 right-0 z-20"
        : "hidden";
  const mode_nav =
    bloc.mode === "edition" ? "mx-auto px-4 w-[45vw] top-[40vh]" : "mx-auto ";

  const links = pages
    ? Object.entries(pages).map(([, page]) => (
        <a key={page.number_id} href={"/" + page.text_slug}>
          {page.text_titre}
        </a>
      ))
    : null;

  return (
    <>
      <header
        style={{
          backgroundColor:
            stateBG === "color" && isValidColor(bloc.text_background_url)
              ? `${bloc.text_background_url}40`
              : undefined,
          backgroundImage:
            stateBG === "image" && bloc.text_background_url
              ? `url(${bloc.text_background_url})`
              : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: stateBG === "image" || stateBG === "color" ? "white" : "black",
        }}
        className={isEdition}
      >
        <div ref={rowRef} className={mode_nav}>
          <div className="relative flex items-center justify-between">
            <a
              ref={logoRef}
              title="Retour à l'accueil"
              href="/"
              className={
                isBurger
                  ? "mr-4 logo text-xl font-bold text-indigo-600 relative flex-shrink-0 z-0 ml-4"
                  : "invisible pointer-events-none logo text-xl font-bold text-indigo-600 relative flex-shrink-0 z-0"
              }
            >
              {bloc.logo?.image_url ? (
                <Image
                  src={bloc.logo.image_url}
                  alt={bloc.text_nom_site || "Logo"}
                  height={100}
                  width={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1440px"
                />
              ) : (
                "Mon Site"
              )}
            </a>

            <h1 className=" hidden md:block flex-1 min-w-0 truncate text-center px-4">
              {bloc.text_nom_site}
            </h1>

            <nav
              ref={navRef}
              className={`open-nav cursor-pointer flex space-x-8 whitespace-nowrap ${
                isBurger && isOpen
                  ? "nav-dynamique nav-dynamique--open"
                  : isBurger
                    ? "absolute invisible"
                    : ""
              }`}
            >
              {links}
            </nav>

            {/* toujours rendu : largeur constante dans les deux états */}
            <button
              type="button"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              tabIndex={isBurger ? 0 : -1}
              onClick={() => setIsOpen(!isOpen)}
              className={`burger relative z-50 w-6 h-6 flex-shrink-0 cursor-pointer ${
                isBurger ? "mr-4" : "invisible pointer-events-none"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke={!isOpen ? "currentColor" : "black"}
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="invisible fixed left-0 top-0 invisible pointer-events-none flex space-x-8 whitespace-nowrap"
        >
          <a
            title="Retour à l'accueil"
            href="/"
            className="invisible logo text-xl font-bold text-indigo-600 relative flex-shrink-0 z-0"
          >
            {bloc.logo?.image_url ? (
              <Image
                src={bloc.logo.image_url}
                alt={bloc.text_nom_site || "Logo"}
                height={100}
                width={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1440px"
              />
            ) : (
              "Mon Site"
            )}
          </a>
          {links}
          <span className="invisible flex-shrink-0 whitespace-nowrap text-center px-4">
            {bloc.text_nom_site}
          </span>
        </div>
      </header>
    </>
  );
}
