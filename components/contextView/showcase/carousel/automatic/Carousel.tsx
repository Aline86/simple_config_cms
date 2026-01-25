"use client";
import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import CarouselModel from "./../../../../../../models/Carousel";
import InsideCardDataShow from "./InsideCardDataShow";

type CardDatas = {
  options?: EmblaOptionsType;
  slides: CarouselModel | Record<string, unknown>;
  full: boolean;
  toggle: boolean;
};

const CarouselAutoVisualization: React.FC<CardDatas> = ({
  slides,
  full,
  options,
  toggle,
}: CardDatas) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);
  useEffect(() => {}, [toggle]);
  return slides !== undefined ? (
    <section
      className={
        full
          ? "embla w-full flex flex-row justify-start p-1"
          : "embla w-[43vw] flex flex-row justify-start p-1 "
      }
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {(slides as CarouselModel).carousel_data.map((item, idx) => (
            <div className="embla__slide" key={String(idx)}>
              <div className="embla__slide__number">
                {" "}
                <InsideCardDataShow value={item} full={full} />
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

export default CarouselAutoVisualization;
