"use client";

import { useEffect, useRef, useState } from "react";
import { FooterObject } from "@/model/bloc/Footer";
import Image from "next/image";
interface MediaViewProps {
  footer: FooterObject;
}

export default function FooterView({ footer }: MediaViewProps) {
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
        style={{ backgroundColor: footer.color_background_color ?? "#fff" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-4 font-bold text-lg">
            {footer.text_nom_site_adresse}
          </div>
          <div className="space-y-4">{footer.text_adresse_footer}</div>
          <div className="space-y-4 mb-4">{footer.text_code_postal}</div>
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                {footer.reseaux.map((social) => {
                  return (
                    <a
                      key={social.id}
                      href={social.text_image_lien ?? "#"}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                      {social.image_url !== undefined &&
                        social.image_url !== null && (
                          <Image
                            src={social.image_url}
                            alt={social.text_titre ?? ""}
                            width="50"
                            height="50"
                            className="object-cover w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                          />
                        )}
                    </a>
                  );
                })}
              </div>

              {/* Copyright */}
              <p className="text-sm">
                © {footer.text_nom_site_adresse}. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
