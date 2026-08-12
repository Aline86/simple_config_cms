import { ArrowRight, Heart } from "lucide-react";
import { MediaObject } from "../../../../../database/model/bloc/MediaObject";

import Image from "next/image";

export default function PicturesLinkItemView({
  mediaObject,
  isLink,
  editing = false,
  cardNumber,
}: {
  mediaObject: MediaObject;
  isLink?: boolean;
  editing: boolean;
  cardNumber: number;
}) {
  return (
    <div className="w-full">
      <a
        href={mediaObject.text_image_lien ? mediaObject.text_image_lien : "#"}
        className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 overflow-hidden group h-full flex flex-col"
      >
        <div className="relative h-48 bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
          {mediaObject.image_url !== undefined &&
          mediaObject.image_url !== null &&
          mediaObject.text_titre !== null ? (
            <Image
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              src={mediaObject.image_url}
              fill
              alt={mediaObject.text_titre}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              <div className="relative z-10 p-6 flex h-full flex-col items-center justify-end gap-[30px] duration-300">
                {editing ? (
                  <div className="absolute top-2 right-5 text-white text-2xl border border-gray-300 rounded-full w-9 h-9">
                    {cardNumber + 1}
                  </div>
                ) : (
                  <></>
                )}
                <div className="card-bg">
                  <h3 className="text-lg font-semibold text-slate-100 text-center">
                    {mediaObject.text_titre}
                  </h3>
                </div>

                <span className="inline text-white">
                  Voir
                  <ArrowRight className="ml-2 w-4 h-4 inline " />
                </span>
              </div>
              <span className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />{" "}
            </>
          )}
        </div>
      </a>
    </div>
  );
}
