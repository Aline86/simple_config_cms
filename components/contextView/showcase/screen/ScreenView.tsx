// PicturesLinkItemView.tsx

import Image from "next/image";
import FIELD_CONFIGS from "../../../../config/fieldConfig";
import { BlocObject } from "../../../../model/Bloc";
import CloudinaryValidator, {
  CloudinaryParameter,
} from "../../../../validators/MediaValidator";
import { useAppContext } from "../../../../app/context/DomDataProvider";
export default function ScreenView({ bloc }: { bloc: BlocObject }) {
  const picture = bloc.image_medias[0];
  const isValid = new CloudinaryValidator(
    bloc.image_medias[0].image_url,
    FIELD_CONFIGS["image_url"] instanceof CloudinaryParameter
      ? FIELD_CONFIGS["image_url"]
      : new CloudinaryParameter(),
  ).validate();
  const { hasH1InPage } = useAppContext();
  return bloc.bloc_position === 0 && bloc.mode === "edition" ? (
    <section className="mt-[-95px] relative w-screen h-screen ">
      <div className="relative w-screen h-screen  left-[10%] z-10 title text-white flex flex-col justify-end pb-24">
        {hasH1InPage ? (
          <h2 style={{ color: "white", fontSize: "65px" }}>
            {bloc.text_titre}
          </h2>
        ) : (
          <h1 style={{ color: "white", fontSize: "65px" }}>
            {bloc.text_titre}
          </h1>
        )}

        <h2 style={{ color: "white" }} className="text-white">
          {bloc.text_description}
        </h2>
      </div>

      <Image
        src={bloc.image_medias[0].image_url}
        alt={bloc.text_titre}
        fill
        className="absolute  w-[100vw] h-[100vh] inset-0 top-0 object-cover"
        priority
      />

      <span className="absolute inset-0 bg-black/20"></span>
    </section>
  ) : (
    <section className="mt-24 relative h-[300px] w-screen overflow-hidden">
      {/* Background parallaxe */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${bloc.image_medias[0].image_url})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Contenu texte */}
      <div className="relative z-10 h-full flex flex-col justify-end p-24 text-white">
        {hasH1InPage ? (
          <h2 style={{ color: "white", fontSize: "65px" }}>
            {bloc.text_titre}
          </h2>
        ) : (
          <h1 style={{ color: "white", fontSize: "65px" }}>
            {bloc.text_titre}
          </h1>
        )}
        <h2 style={{ color: "white" }} className="text-2xl mt-4">
          {bloc.text_description}
        </h2>
      </div>
    </section>
  );
}
