// PicturesLinkItemView.tsx

import Image from "next/image";
import { BlocObject } from "../../../../database/model/Bloc";

import { useAppContext } from "../../../../context/DomDataProvider";
export default function ScreenView({ bloc }: { bloc: BlocObject }) {
  const { hasH1InPage } = useAppContext();
  return bloc.bloc_position === 0 && bloc.mode === "edition" ? (
    <section className="z-0 mt-[-95px]  w-screen h-screen mb-8">
      <div className="relative z-10 w-[75%] h-screen title text-white flex flex-col justify-end pb-24">
        {hasH1InPage ? (
          <h2
            style={{
              fontSize: "65px",
              textTransform: "uppercase",
              opacity: 1,
            }}
          >
            {bloc.text_titre}
          </h2>
        ) : (
          <h1
            style={{
              fontSize: "65px",
              textTransform: "uppercase",
              color: "white",
              opacity: 1,
            }}
          >
            {bloc.text_titre}
          </h1>
        )}

        <h2 style={{ color: "white" }}>{bloc.text_description}</h2>
      </div>

      <Image
        src={bloc.image_medias[0].image_url}
        alt={bloc.text_titre}
        fill
        className="absolute z-0 inset-0 top-0 object-cover"
        priority
      />

      <span className="absolute inset-0 bg-black/20"></span>
    </section>
  ) : (
    <section className="w-screen z-0 h-[300px] z-0  mt-6">
      <div className="absolute z-10  h-[300px] w-full left-0 flex-col justify-end title text-white flex">
        {/* Background parallaxe */}
        {bloc.image_medias[0].image_url !== "" && (
          <Image
            src={bloc.image_medias[0].image_url}
            alt=""
            fill
            className="object-cover "
            priority
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Contenu texte */}
        <div className=" z-10 relative flex  p-24 text-white">
          <h2
            style={{
              fontSize: "65px",
              opacity: 1,
              textTransform: "uppercase",
              color: "white",
            }}
            className="text-transform-uppercase relative"
          >
            {bloc.text_titre}
          </h2>

          <h2
            style={{ color: "white" }}
            className="text-2xl mt-4 text-white relative"
          >
            {bloc.text_description}
          </h2>
        </div>
      </div>
    </section>
  );
}
