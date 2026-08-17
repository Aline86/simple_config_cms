import Image from "next/image";
import { BlocObject } from "../../../../database/model/Bloc";

import { useAppContext } from "../../../../context/DomDataProvider";
import AnimatedTitle from "../../../ui/animations/AnimatedTitle";

export default function ScreenView({ bloc }: { bloc: BlocObject }) {
  const { hasH1InPage } = useAppContext();
  const isEdition = bloc.mode === "edition";

  const titleStyle = {
    fontSize: "65px",
    textTransform: "uppercase" as const,
  };

  return bloc.bloc_position === 0 ? (
    <section
      className={
        isEdition
          ? "relative z-0 h-screen mb-8 overflow-hidden"
          : "relative z-0 w-dvw ml-[calc(50%-50dvw)]  h-dvh overflow-hidden mb-35!"
      }
    >
      <Image
        src={bloc.image_medias[0].image_url ?? ""}
        alt={bloc.text_titre ?? ""}
        fill
        sizes="100vw"
        className="object-cover big "
        priority
      />

      <span className="back-drop absolute inset-0 z-10 bg-black/40 big" />

      <div className="relative z-20 h-full title text-white flex flex-col justify-end px-4 md:px-16 ">
        {hasH1InPage ? (
          <AnimatedTitle>
            <h2 style={{ ...titleStyle, opacity: 1 }} className="text-white!">
              {bloc.text_titre}
            </h2>
          </AnimatedTitle>
        ) : (
          <AnimatedTitle>
            <h1 style={titleStyle} className="text-white!">
              {bloc.text_titre}
            </h1>
          </AnimatedTitle>
        )}
        <AnimatedTitle>
          <h2 className="text-white!">{bloc.text_description}</h2>
        </AnimatedTitle>
      </div>
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
