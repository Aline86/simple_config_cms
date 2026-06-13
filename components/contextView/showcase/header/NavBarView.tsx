import { HeaderObject } from "../../../../database/model/bloc/Header";
import {
  isValidColor,
  useHeader,
} from "../../../../hooks/components/header/HeaderHook";
import Image from "next/image";

export default function NavBarView(bloc: HeaderObject) {
  const {
    navRef,
    scrollRef,
    isSticky,
    isBurger,
    isOpen,
    setIsOpen,
    stateBG,
    pages,
  } = useHeader(bloc);
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
      color: stateBG === "image" || stateBG === "color" ? "white" : "black",
    }}
    className={
      bloc.mode === "edition"
        ? `shadow ${isSticky ? "sticky" : "relative"} top-24 left-0 right-0 z-20`
        : " shadow fixed  top-0  left-0 right-0 z-20"
    }
  >
    <div className="mx-auto px-4">
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
  </header>;
}
