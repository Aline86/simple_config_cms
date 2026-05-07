import Image from "next/image";
import { useState } from "react";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { isPdfUrl, convertToFirstPage } from "../../../../lib/helpers/isPdf";

export default function SocialTab({ network }: { network: MediaObject }) {
  const [isHovered, setIsHovered] = useState(false);
  const preview = isPdfUrl(network.image_url)
    ? convertToFirstPage(network.image_url)
    : network.image_url;
  return (
    <div
      className="absolue mb-2 flex flex-col gap-2"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className={`relative  flex items-center transition-transform duration-700 ease-in-out ${
          isHovered ? "translate-x-[-100px]" : "translate-x-[15px]"
        }`}
      >
        <a
          title="Lien externe réseau social"
          href={network.text_image_lien !== "" ? network.text_image_lien : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white rounded-l-xl shadow-lg overflow-hidden h-8 w-[200px]"
        >
          <div className="items-center justify-center">
            {network.image_url !== null &&
            network.text_titre !== null &&
            !isHovered ? (
              <Image
                className={`inset-0 bg-cover ml-2 bg-center w-6 h-6 flex items-center justify-center object-cover rounded`}
                src={preview}
                alt={(network as MediaObject).text_titre}
                width="15"
                height="15"
                sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
              />
            ) : (
              <></>
            )}
          </div>

          {/* Image au hover */}
          <div className="relative flex-1 h-full flex items-center justify-start  px-4 overflow-hidden">
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                isHovered ? "opacity-30" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${network?.image_url !== null ? network.image_url : ""})`,
              }}
            />
            <span className="relative z-10 ml-4 font-semibold text-gray-800">
              {network.text_titre !== null ? network.text_titre : ""}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
