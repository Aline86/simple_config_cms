"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { BlocObject } from "@/model/Bloc";

type CardDatas = {
  options?: EmblaOptionsType;
  slides: BlocObject;
};

const CarouselAutoView: React.FC<CardDatas> = ({
  slides,

  options,
}: CardDatas) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return slides !== undefined ? (
    <section className={"embla w-full flex flex-row justify-start p-1"}>
      <div className="embla__viewport w-full" ref={emblaRef}>
        <div className="embla__container w-full">
          {slides.image_medias.map((item, idx) => (
            <div className="embla__slide" key={String(idx)}>
              <div className="embla__slide__number">
                <div
                  key={String(idx)}
                  className="relative block m-1 w-full h-full "
                  style={{ height: slides.number_height + "px" }}
                >
                  {item.image_image_url !== null && (
                    <Image
                      className="rounded overflow-hidden object-cover"
                      src={item.image_image_url}
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
