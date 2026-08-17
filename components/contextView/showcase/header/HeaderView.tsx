"use client";

import { HeaderObject } from "../../../../database/model/bloc/Header";
import { useHeader } from "../../../../hooks/components/header/HeaderHook";
import NavBarView from "./NavBarView";
import SocialTab from "./SocialTab";

interface ViewProps {
  bloc: HeaderObject;
}

export default function HeaderView({ bloc }: ViewProps) {
  const header = useHeader(bloc);
  const { pages } = header;

  if (pages === undefined) return null;

  return (
    <div
      className={
        bloc.mode === "edition"
          ? "absolute w-fit h-fit mt-20 right-[30px] z-0"
          : "fixed w-fit h-fit mt-5 right-[25px] z-[15] top-24"
      }
    >
      <NavBarView bloc={bloc} header={header} />
      <div className="social-media absolute mb-2 right-[-160px]">
        {bloc.reseaux.map((network, index) => (
          <SocialTab key={index} network={network} />
        ))}
      </div>
    </div>
  );
}
