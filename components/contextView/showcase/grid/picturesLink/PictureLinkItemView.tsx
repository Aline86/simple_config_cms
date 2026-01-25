// PicturesLinkItemView.tsx
import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { MediaObject } from "@/model/bloc/MediaObject";
import Image from "next/image";
import FIELD_CONFIGS from "@/config/fieldConfig";
import CloudinaryValidator, {
  CloudinaryParameter,
} from "@/validators/MediaValidator";

export default function PicturesLinkItemView({
  mediaObject,
  isLink,
}: {
  mediaObject: MediaObject;
  isLink?: boolean;
}) {
  const isValid = new CloudinaryValidator(
    mediaObject.image_image_url,
    FIELD_CONFIGS["image_image_url"] instanceof CloudinaryParameter
      ? FIELD_CONFIGS["image_image_url"]
      : new CloudinaryParameter(),
  ).validate();

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 overflow-hidden group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
          {mediaObject?.image_image_url !== undefined &&
          mediaObject?.image_image_url !== null &&
          mediaObject.text_titre !== null /*&&
          isValid.valid*/ ? (
            <Image
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              src={mediaObject.image_image_url}
              fill
              alt={mediaObject.text_titre}
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
              alt="Item preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {isLink && (
            <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors">
              <Heart className="w-4 h-4 text-slate-700" />
            </button>
          )}
        </div>

        {/* Contenu */}
        {isLink && (
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4 flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {mediaObject.text_titre}
              </h3>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href={
                  mediaObject.text_image_lien !== undefined &&
                  mediaObject.text_image_lien !== null
                    ? mediaObject.text_image_lien
                    : "#"
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-md transition-colors duration-200 font-medium"
              >
                <span>Voir</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
