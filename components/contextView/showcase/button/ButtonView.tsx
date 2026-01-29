// PicturesLinkItemView.tsx
import React from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { MediaObject } from "@/model/bloc/MediaObject";
import Image from "next/image";
import FIELD_CONFIGS from "@/config/fieldConfig";
import CloudinaryValidator, {
  CloudinaryParameter,
} from "@/validators/MediaValidator";
import { BlocObject } from "@/model/Bloc";

export default function ButtonView({ bloc }: { bloc: BlocObject }) {
  const picture = bloc.image_medias[0];
  const isValid = new CloudinaryValidator(
    bloc.image_medias[0].image_url,
    FIELD_CONFIGS["image_url"] instanceof CloudinaryParameter
      ? FIELD_CONFIGS["image_url"]
      : new CloudinaryParameter(),
  ).validate();

  return (
    <div className="w-full group perspective">
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl overflow-hidden border border-slate-200/50 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-500/20 h-full flex flex-col">
        {/* Badge décoratif */}

        {/* text_titre avec effet de dégradé */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent"></div>
          <h2 className="relative text-center text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
            {bloc.text_titre}
          </h2>
        </div>

        {/* Image avec overlay créatif */}
        <div className="relative h-56 mx-6 mb-4 rounded-xl overflow-hidden">
          {/* Effet de lueur */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Bordure animée */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-slate-400/50 transition-all duration-500 z-20"></div>

          {picture?.image_url !== undefined &&
          picture?.image_url !== null &&
          picture.text_titre !== null ? (
            <img
              className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              src={picture.image_url}
              alt={picture.text_titre}
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
              alt="Item preview"
              className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            />
          )}

          {/* Effet de reflet */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        </div>

        {/* Contenu */}
        <div className="px-6 pb-6 flex-1 flex flex-col">
          <div className="mb-6 flex-1">
            <h3 className="text-lg font-semibold text-slate-700 leading-snug">
              {bloc.text_description}
            </h3>
            {/* Barre de progression décorative */}
            <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-slate-600 to-slate-400 rounded-full group-hover:w-full transition-all duration-1000 ease-out"></div>
            </div>
          </div>

          {/* Bouton avec effet magnétique */}
          <a
            style={{
              backgroundColor:
                bloc.color_background_color === "#ffffff"
                  ? "#535c78"
                  : bloc.color_background_color !== null
                    ? bloc.color_background_color
                    : "#535c78",
            }}
            href={
              picture.text_image_lien !== undefined &&
              picture.text_image_lien !== null
                ? picture.text_image_lien
                : "#"
            }
            className="relative flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl overflow-hidden group/btn transition-all duration-300 hover:shadow-lg hover:shadow-slate-800/50"
          >
            {/* Effet de shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>

            <span className="relative font-semibold">{picture.text_titre}</span>
            <ArrowRight className="relative w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Effet de bordure lumineuse au hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-300/50 transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}
