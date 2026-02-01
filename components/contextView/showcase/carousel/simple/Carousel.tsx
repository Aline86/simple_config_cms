"use client";

import Image from "next/image";
import { BlocObject } from "../../../../../model/Bloc";
import { MediaObject } from "../../../../../model/bloc/MediaObject";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../../../ui/carousel";

interface CustomCarouselInfo {
  bloc: BlocObject;
}

export default function CarouselSimple({ bloc }: CustomCarouselInfo) {
  if (!bloc?.image_medias?.length) return null;
  return (
    <div className="p-8 relative max-w-[1650px] w-full mx-auto flex-col justify-center align-center m-auto overflow-hidden">
      <h2 className="text-2xl text-center font-bold text-slate-800 mb-6">
        {bloc.text_titre}
      </h2>
      <Carousel opts={{ align: "start" }} className="w-full ">
        <CarouselContent>
          {bloc.image_medias.map((media: MediaObject, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/1 md:basis-1/3 lg:basis-1/4  "
            >
              <div
                className="relative rounded w-full"
                style={{
                  height: `${bloc.number_height ?? 150}px`,
                }}
              >
                {media.image_url && (
                  <Image
                    src={media.image_url}
                    alt={media.text_titre || "Image"}
                    fill
                    className="object-cover rounded "
                  />
                )}

                {media.text_titre && (
                  <div className="absolute bottom-0 w-full bg-black/50 text-gray-200 text-sm p-2">
                    {media.text_titre}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 cursor-pointer" />
        <CarouselNext className="right-2 cursor-pointer" />
      </Carousel>
    </div>
  );
}
