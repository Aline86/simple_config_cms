// PicturesLinkItemView.tsx
import { ArrowRight } from "lucide-react";
import FIELD_CONFIGS from "@/config/fieldConfig";
import CloudinaryValidator, {
  CloudinaryParameter,
} from "@/validators/MediaValidator";
import { BlocObject } from "@/model/Bloc";
import Image from "next/image";
export default function ScreenView({ bloc }: { bloc: BlocObject }) {
  const picture = bloc.image_medias[0];
  const isValid = new CloudinaryValidator(
    bloc.image_medias[0].image_image_url,
    FIELD_CONFIGS["image_image_url"] instanceof CloudinaryParameter
      ? FIELD_CONFIGS["image_image_url"]
      : new CloudinaryParameter(),
  ).validate();

  return (
    <div
      className={
        bloc.mode !== "edition"
          ? "absolute inset-0 "
          : "relative h-full bottom-[5px]"
      }
    >
      <div className="absolute bottom-[100px] left-[10%] z-10 title text-white ">
        <h1 className="relative">{bloc.text_titre}</h1>
        <h2 className="relative">{bloc.text_description}</h2>
      </div>

      <Image
        className={
          bloc.mode !== "edition"
            ? "absolute inset-0 z-0 object-cover"
            : "relative z-0 object-cover "
        }
        src={bloc.image_medias[0].image_image_url}
        fill
        alt={bloc.text_titre}
      />
      <span className="absolute bg-black/20 inset-0"></span>
    </div>
  );
}
