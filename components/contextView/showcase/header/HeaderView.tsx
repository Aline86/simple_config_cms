"use client";

import SocialTab from "./SocialTab";
import { HeaderObject } from "../../../../database/model/bloc/Header";

import { useHeader } from "../../../../hooks/components/header/HeaderHook";
import NavBarView from "./NavBarView";

interface ViewProps {
  bloc: HeaderObject;
}

export default function HeaderView({ bloc }: ViewProps) {
  const { isSticky, pages } = useHeader(bloc);

  return (
    pages !== undefined && (
      <>
        <div
          className={
            bloc.mode === "edition"
              ? ` ${isSticky ? "fixed w-fit h-fit mt-5 right-[30px] z-0" : "absolute w-fit h-fit mt-20 right-[30px] z-0"}`
              : "fixed w-fit h-fit mt-5 right-[15px] z-15 top-24"
          }
        >
          <NavBarView bloc={bloc} />
          <div className="social-media absolute mb-2   right-[-160px] ">
            {bloc.reseaux.map((network, index) => {
              return <SocialTab key={index} network={network} />;
            })}
          </div>
        </div>
      </>
    )
  );
}
