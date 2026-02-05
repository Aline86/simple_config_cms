// PicturesLinkItemView.tsx
import Image from "next/image";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import FIELD_CONFIGS from "../../../../lib/config/fieldConfig";
import { BlocObject } from "../../../../database/model/Bloc";
import CloudinaryValidator, {
  CloudinaryParameter,
} from "../../../../lib/validators/MediaValidator";

export default function ButtonView({ bloc }: { bloc: BlocObject }) {
  const picture = bloc.image_medias[0];
  const isValid = new CloudinaryValidator(
    bloc.image_medias[0].image_url,
    FIELD_CONFIGS["image_url"] instanceof CloudinaryParameter
      ? FIELD_CONFIGS["image_url"]
      : new CloudinaryParameter(),
  ).validate();

  return (
    <section className="button m-auto max-w-[1600px] group perspective w-full p-8">
      <div className="pt-6 relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl overflow-hidden border border-slate-200/50 backdrop-blur-sm transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col">
        <h2 className="text-2xl text-center font-bold mb-4">
          {bloc.text_titre}
        </h2>
        <p className="p-4 mb-8">{bloc.text_description}</p>
        <div className="relative h-56 mx-6 mb-4 rounded-xl overflow-hidden will-change-transform flex-shrink-0">
          <Image
            fill
            sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
            className="object-cover transform "
            src={
              picture.image_url ??
              "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80"
            }
            alt={picture.text_titre ?? "Preview"}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Contenu */}
        <div className="px-6 pb-6 flex-1 flex flex-col justify-end">
          {/* Bouton avec effet shine */}
          <a
            title={
              picture.text_titre !== ""
                ? picture.text_titre
                : "Image sans titre"
            }
            style={{
              backgroundColor:
                bloc.color_background_color === "#ffffff"
                  ? "#535c78"
                  : (bloc.color_background_color ?? "#535c78"),
            }}
            href={picture.text_image_lien ?? "#"}
            className="relative flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl overflow-hidden group/btn transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-800/50"
          >
            {/* Shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
            <span className="relative font-semibold">
              {picture?.text_titre}
            </span>
            <ArrowRight className="relative w-4 h-4 transform " />
          </a>
        </div>

        {/* Bordure lumineuse au hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-300/50 pointer-events-none transition-opacity duration-500"></div>
      </div>
    </section>
  );
}
