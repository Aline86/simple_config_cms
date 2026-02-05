"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { BlocObject } from "../../../../../database/model/Bloc";

type CardDatas = {
  options?: EmblaOptionsType;
  bloc: BlocObject;
};

const CarouselAutoView: React.FC<CardDatas> = ({
  bloc,

  options,
}: CardDatas) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);
  return bloc !== undefined ? (
    <section className="embla max-w-[1650px] p-4 w-full mx-auto">
      <h2 className="text-2xl text-center font-bold text-slate-800">
        {bloc.text_titre}
      </h2>
      <div className="embla__viewport w-full" ref={emblaRef}>
        <div className="embla__container w-full">
          {bloc.image_medias.map((item, idx) => (
            <div className="embla__slide" key={String(idx)}>
              <div className="embla__slide__number">
                <div
                  key={String(idx)}
                  className="relative block m-1 w-full h-full "
                  style={{ height: bloc.number_height + "px" }}
                >
                  {item.image_url !== null && (
                    <Image
                      className="rounded overflow-hidden object-cover"
                      src={item.image_url}
                      fill={true}
                      alt="Image"
                    />
                  )}
                  {item.text_titre !== undefined && (
                    <div className="absolute w-full h-full">
                      <div className="relative z-10 flex flex-col align-center justify-center text-center h-full w-full text-gray-200 break-words text-[4vh] p-4">
                        {String(item.text_titre)}
                      </div>
                      <div className="absolute inset-0 bg-black/30 z-0"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default CarouselAutoView;
