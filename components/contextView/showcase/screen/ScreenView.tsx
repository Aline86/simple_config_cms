// PicturesLinkItemView.tsx

import Image from "next/image";
import { BlocObject } from "../../../../database/model/Bloc";

import { useAppContext } from "../../../../context/DomDataProvider";
import AnimatedTitle from "../../../ui/animations/AnimatedTitle";
export default function ScreenView({ bloc }: { bloc: BlocObject }) {
  const { hasH1InPage } = useAppContext();

  return bloc.bloc_position === 0 ? (
    <section
      className={
        bloc.mode === "edition"
          ? "relative z-0 mt-[-95px] h-screen mb-8"
          : "w-screen mt-[-95px] h-screen mb-8"
      }
    >
      <div
        className={
          bloc.mode === "edition"
            ? "absolute z-10 h-screen w-[90%] bottom-0 title text-white flex flex-col justify-end pb-24"
            : "relative screen-full z-10 h-screen w-[70%] title text-white flex flex-col justify-end pb-24 ml-4"
        }
      >
        {hasH1InPage ? (
          <AnimatedTitle
            children={
              <h2
                style={{
                  fontSize: "65px",
                  textTransform: "uppercase",
                  opacity: 1,
                }}
              >
                {bloc.text_titre}
              </h2>
            }
          ></AnimatedTitle>
        ) : (
          <AnimatedTitle
            children={
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
            }
          ></AnimatedTitle>
        )}
        <AnimatedTitle
          children={<h2 style={{ color: "white" }}>{bloc.text_description}</h2>}
        ></AnimatedTitle>
      </div>

      <Image
        src={bloc.image_medias[0].image_url}
        alt={bloc.text_titre}
        fill
        className="object-cover"
        priority
      />

      <span className="absolute inset-0 bg-black/20"></span>
    </section>
  ) : (
    <section className="w-screen z-0 h-[300px] z-0  mt-6">
      <div
        className={
          bloc.mode === "edition"
            ? "relative z-10  h-[300px]  left-0 flex-col justify-end title text-white flex "
            : "absolute z-10  h-[300px] w-screen left-0 flex-col justify-end title text-white flex"
        }
      >
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
        <div className=" z-10 relative bottom-0 flex  p-24 text-white">
          <AnimatedTitle
            children={
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
            }
          ></AnimatedTitle>
          <AnimatedTitle
            children={
              <h2
                style={{ color: "white", display: "block" }}
                className="text-2xl mt-4 text-white relative"
              >
                {bloc.text_description}
              </h2>
            }
          ></AnimatedTitle>
        </div>
      </div>
    </section>
  );
}
