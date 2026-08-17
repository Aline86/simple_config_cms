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
          ? "relative z-0 mt-[-95px] h-screen mb-8  "
          : "w-screen  mt-[-95px] h-screen mb-8 "
      }
    >
      <div
        className={
          bloc.mode === "edition"
            ? "absolute z-10 h-screen w-[90%] bottom-0 title text-white flex flex-col justify-end pb-24 "
            : "relative screen-full-section z-10 h-screen w-[70%] title text-white flex flex-col justify-end pb-24 ml-4 "
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
                className="text-white! opacity: 600!"
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
                }}
              >
                {bloc.text_titre}
              </h1>
            }
          ></AnimatedTitle>
        )}
        <AnimatedTitle
          children={<h2>{bloc.text_description}</h2>}
          className="text-white! "
        ></AnimatedTitle>
      </div>

      <Image
        src={bloc.image_medias[0].image_url ?? ""}
        alt={bloc.text_titre ?? ""}
        fill
        className="object-cover 110vw big"
        priority
      />

      <span className="absolute inset-0 bg-black/20"></span>
    </section>
  ) : (
    <section className="parallaxe relative z-0 w-full h-[400px] mt-20 mb-24 overflow-clip rounded">
      {bloc.image_medias[0].image_url && (
        <Image
          src={bloc.image_medias[0].image_url}
          alt=""
          fill
          className="parallaxe-img object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 text-white">
        <AnimatedTitle>
          <h2 className="text-5xl uppercase">{bloc.text_titre}</h2>
        </AnimatedTitle>
        <AnimatedTitle>
          <h2 className="text-2xl mt-4">{bloc.text_description}</h2>
        </AnimatedTitle>
      </div>
    </section>
  );
}
