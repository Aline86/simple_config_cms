import { ArrowRight, Heart } from "lucide-react";
import { MediaObject } from "../../../../../database/model/bloc/MediaObject";

import Image from "next/image";

export default function PicturesLinkItemView({
  mediaObject,
  isLink,
  editing,
  cardNumber,
}: {
  mediaObject: MediaObject;
  isLink?: boolean;
  editing: boolean;
  cardNumber: number;
}) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 overflow-hidden group h-full flex flex-col">
        <div className="relative h-48 bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
          {mediaObject.image_url !== undefined &&
          mediaObject.image_url !== null &&
          mediaObject.text_titre !== null ? (
            <Image
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              src={mediaObject.image_url}
              fill
              alt={mediaObject.text_titre}
              sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
              alt="Item preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {isLink && (
            <>
              <div className="relative z-10 p-6 flex h-full flex-col items-center justify-end gap-[30px]">
                {editing ? (
                  <div className="absolute top-2 right-5 text-white text-2xl border border-gray-300 rounded-full w-9 h-9">
                    cardNumber + 1
                  </div>
                ) : (
                  <></>
                )}
                <div className="card-bg">
                  <h3 className="text-lg font-semibold text-slate-100 text-center">
                    {mediaObject.text_titre}
                  </h3>
                </div>

                <a
                  href={
                    mediaObject.text_image_lien
                      ? mediaObject.text_image_lien
                      : "#"
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 hover:border border-white-100 text-white rounded-md transition-colors duration-200 font-medium"
                >
                  <span>Voir</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <span className="absolute inset-0 bg-black/30 z-0 flex justify align-items"></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
