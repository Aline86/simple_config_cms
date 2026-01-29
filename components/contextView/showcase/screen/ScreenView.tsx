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
    bloc.image_medias[0].image_url,
    FIELD_CONFIGS["image_url"] instanceof CloudinaryParameter
      ? FIELD_CONFIGS["image_url"]
      : new CloudinaryParameter(),
  ).validate();

  return bloc.mode !== "edition" && bloc.bloc_position === 0 ? (
    <div className={"absolute inset-0 "}>
      <div className="absolute bottom-[100px] left-[10%] z-10 title text-white ">
        <h1 className="relative">{bloc.text_titre}</h1>
        <h2 className="relative">{bloc.text_description}</h2>
      </div>

      <Image
        className={"absolute inset-0 z-0 object-cover"}
        src={bloc.image_medias[0].image_url}
        fill
        alt={bloc.text_titre}
      />
      <span className="absolute bg-black/20 inset-0"></span>
    </div>
  ) : (
    <div className={"relative h-[100vh] bottom-[5px]"}>
      <Image
        className={"absolute h-full z-0 object-cover "}
        src={bloc.image_medias[0].image_url}
        fill
        alt={bloc.text_titre}
      />
      <div className="h-full  left-[10%] z-10 title text-white flex flex-col justify-end p-24">
        <h1 className="relative z-10">{bloc.text_titre}</h1>
        <h2 className="relative z-10 ">{bloc.text_description}</h2>
      </div>

      <span className="absolute bg-black/20 inset-0"></span>
    </div>
  );
}
