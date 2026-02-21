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
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">MonSite</span>
          <div className="w-6 h-6" />
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer
        className="p-8  border-gray-800"
        style={{ backgroundColor: bloc.color_background_color ?? "#fff" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-4 font-bold text-lg">
            {bloc.text_nom_site_adresse}
          </div>
          <div className="space-y-4">{bloc.text_adresse_footer}</div>
          <div className="space-y-4 mb-4">{bloc.text_code_postal}</div>
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
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
                        !isPdfUrl(social.image_url)
                          ? "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                          : "text-xl text-blue-500"
                      }
                    >
                      {!isPdfUrl(social.image_url) ? (
                        <Image
                          src={preview}
                          alt={social.text_titre ?? ""}
                          width="50"
                          height="50"
                          className="object-cover w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
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

              {/* Copyright */}
              <p className="text-sm">
                © {bloc.text_nom_site_adresse}. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
