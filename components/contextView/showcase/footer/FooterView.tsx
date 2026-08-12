"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { FooterObject } from "../../../../database/model/bloc/Footer";
import {
  convertToFirstPage,
  extractPublicId,
  getOriginalPdfUrl,
  isPdfUrl,
} from "../../../../lib/helpers/isPdf";
import AnimatedTitle from "../../../ui/animations/AnimatedTitle";
interface ViewProps {
  bloc: FooterObject;
}

export default function FooterView({ bloc }: ViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <span className="text-xl font-bold">
            {bloc?.text_nom_site_adresse}
          </span>
          <div className="w-6 h-6" />
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer
        className={
          bloc.mode === "edition"
            ? "relative left-0 p-8 w-full border-gray-800 overflow-hidden"
            : "mt-24 absolute left-0 p-8 w-screen border-gray-800 "
        }
        style={{ backgroundColor: bloc.color_background_color ?? "#fff" }}
      >
        <div
          className="rotate_footer_first overflow-hidden"
          style={{ backgroundColor: bloc.color_background_color ?? "#fff" }}
        ></div>
        <div className="max-w-7xl mx-auto  ">
          <AnimatedTitle>
            <h2 className="space-y-4 font-bold text-2xl mb-4">
              {bloc.text_nom_site_adresse}
            </h2>
          </AnimatedTitle>

          <div className="space-y-4">{bloc.text_adresse_footer}</div>
          <div className="space-y-4 mb-4">{bloc.text_code_postal}</div>
          <div className="pt-8 ">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-row justify-center md:justify-start space-x-4">
                {bloc.reseaux.map((social) => {
                  const preview = isPdfUrl(social.image_url)
                    ? convertToFirstPage(social.image_url)
                    : social.image_url;

                  let publicId;
                  if (isPdfUrl(social.image_url)) {
                    publicId = extractPublicId(social.image_url);
                  }

                  return (
                    <a
                      key={social.id}
                      href={
                        isPdfUrl(social.image_url)
                          ? getOriginalPdfUrl(publicId)
                          : (social.text_image_lien ?? "#")
                      }
                      className={
                        bloc.mode === "edition"
                          ? "sm:scale-100 text-xl text-blue-500"
                          : !isPdfUrl(social.image_url)
                            ? "scale-[0.6] sm:scale-100 w-30 h-30 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            : "scale-[0.6] sm:scale-100 text-xl text-blue-500"
                      }
                      target="_blank"
                    >
                      {!isPdfUrl(social.image_url) ? (
                        <Image
                          src={preview}
                          alt={social.text_titre ?? ""}
                          width="20"
                          height="20"
                          className="object-cover w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                          sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 80vw,
                1440px
              "
                        />
                      ) : (
                        social.text_titre
                      )}
                    </a>
                  );
                })}
              </div>

              <p className="text-2xl text-center md:text-right">
                © {bloc.text_nom_site_adresse}. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
