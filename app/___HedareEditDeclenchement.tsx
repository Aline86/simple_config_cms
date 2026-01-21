"use client";

import * as React from "react";
import { PageObject, TypeBloc } from "@/model/Page";
import { Modal } from "@/components/modals/Modal";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import PageComponent from "./pageComponent";
import { useEffect, useState } from "react";
import PageCrud from "./pageComponent";
import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import HeaderEdit from "@/components/contextView/edition/header/HeaderEdit";
import { updateObjectBySetter } from "@/lib/utils/functions";

export default function Page() {
  const header = new HeaderObject({
    id: 1,
    bloc_id: 1,
    nom_site: "test nom site",
    favicon: new MediaObject({
      id: 1,
      bloc_id: 1,
      titre: "biche",
      image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
    }),
    logo: new MediaObject({
      id: 1,
      bloc_id: 1,
      titre: "biche",
      image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
    }),

    description: "",
    reseaux: [
      new MediaObject({
        id: 1,
        bloc_id: 1,
        titre: "biche",
        image_lien: "#",
        position_image: 0,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
      new MediaObject({
        id: 1,
        bloc_id: 1,
        titre: "biche",
        image_lien: "#",
        position_image: 1,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
    ],
  });
  const [headerData, setHeader] = useState(header);
  // Editer une page
  const updateMediaObject = (fieldName: string, newValue: any) => {
    const newObj = updateObjectBySetter(headerData, fieldName, newValue);
    setHeader(newObj.data);
  };
  useEffect(() => {}, [headerData]);
  return <HeaderEdit header={headerData} onChange={updateMediaObject} />;
}
