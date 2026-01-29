import { MediaObject } from "@/model/bloc/MediaObject";
import Image from "next/image";
import React, { useState } from "react";

export default function SocialTab({ network }: { network: MediaObject }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative mb-2 flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative flex items-center transition-transform duration-700 ease-in-out ${
          isHovered ? "translate-x-0" : "translate-x-[150px]"
        }`}
      >
        <a
          href={
            network?.text_image_lien !== null ? network?.text_image_lien : "#"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white rounded-l-lg shadow-lg overflow-hidden h-16 w-[200px]"
        >
          <div className="items-center justify-center">
            {network?.image_url !== null &&
            network?.text_titre !== null &&
            !isHovered ? (
              <Image
                className={`inset-0 bg-cover ml-2 bg-center w-12 h-12 flex items-center justify-center fit-contain rounded`}
                src={network?.image_url}
                alt={network?.text_titre}
                width="45"
                height="45"
              />
            ) : (
              <></>
            )}
          </div>

          {/* Poignée avec icône */}
          <div className="w-16 h-16 flex items-center justify-center text-transparent text-2xl font-bold flex-shrink-0">
            {network?.text_titre !== null ? network?.text_titre : ""}
          </div>

          {/* Image au hover */}
          <div className="relative flex-1 h-full flex items-center justify-center px-4 overflow-hidden">
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                isHovered ? "opacity-30" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${network?.image_url !== null ? network?.image_url : ""})`,
              }}
            />
            <span className="relative z-10 font-semibold text-gray-800">
              {network?.text_titre !== null ? network?.text_titre : ""}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
