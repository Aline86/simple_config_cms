// PicturesLinkItemView.tsx

import Image from "next/image";
import { BlocObject } from "../../../../database/model/Bloc";

import { useAppContext } from "../../../../context/DomDataProvider";
export default function ScreenView({ bloc }: { bloc: BlocObject }) {
  const { hasH1InPage } = useAppContext();
  return bloc.bloc_position === 0 && bloc.mode === "edition" ? (
    <section className="z-0 mt-[-95px] relative w-full h-screen ">
      <div className="relative z-10 w-screen h-screen  p-24  title text-white flex flex-col justify-end pb-24">
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
        className="absolute z-0 w-[100vw] h-[100vh] inset-0 top-0 object-cover"
        sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
        priority
      />

      <span className="absolute inset-0 bg-black/20"></span>
    </section>
  ) : (
    <section className="screen z-0 relative h-[400px] w-screen overflow-hidden mt-6">
      {/* Background parallaxe */}
      {bloc.image_medias[0].image_url !== "" && (
        <Image
          src={bloc.image_medias[0].image_url}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}

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
