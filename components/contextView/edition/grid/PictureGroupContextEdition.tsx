import React from "react";
import { BlocObject } from "@/model/Bloc";
import { pictureGroupToRender } from "@/config/componentsView";

interface PictureGroupContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const PictureGroupContextEdition: React.FC<PictureGroupContextEditionProps> = ({
  bloc,
  onChange,
}) => {
  const Renderer = pictureGroupToRender[bloc.text_nom_bloc as string].backend;

  if (!Renderer) return null; // fallback si type inconnu
  return (
    <div className="flex flex-col ">
      <Renderer bloc={bloc} onChange={onChange} />
    </div>
  );
};

export default PictureGroupContextEdition;
