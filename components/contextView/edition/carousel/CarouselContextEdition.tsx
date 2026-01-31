import React from "react";
import { BlocObject } from "../../../../model/Bloc";
import { carouselToRender } from "../../../../config/componentsView";

interface CarouselContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const CarouselContextEdition: React.FC<CarouselContextEditionProps> = ({
  bloc,
  onChange,
}) => {
  const Renderer = carouselToRender[bloc.text_nom_bloc].backend;

  if (!Renderer) return null; // fallback si type inconnu
  return (
    <div className="flex flex-col ">
      <Renderer bloc={bloc} onChange={onChange} />
    </div>
  );
};

export default CarouselContextEdition;
