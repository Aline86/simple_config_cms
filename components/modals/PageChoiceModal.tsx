"use client";

import { useState } from "react";
import { CreateBlocOptions } from "../../lib/factories/Bloc.factory";
import { PageObject, TypeBloc } from "../../database/model/Page";
import { Modal } from "./Modal";

type BlocChoice = {
  label: string;
  options: CreateBlocOptions;
};

function getBlocChoices(
  baseOptions: Omit<CreateBlocOptions, "text_nom_bloc" | "type">,
): BlocChoice[] {
  return [
    {
      label: "Carousel d'images avec miniatures",
      options: {
        ...baseOptions,
        text_nom_bloc: "miniatures",
        type: TypeBloc.CAROUSEL,
        mediaCount: 5,
      },
    },
    {
      label: "Carousel d'images classique",
      options: {
        ...baseOptions,
        text_nom_bloc: "classique",
        type: TypeBloc.CAROUSEL,
        mediaCount: 5,
      },
    },
    {
      label: "Carousel d'images automatique",
      options: {
        ...baseOptions,
        text_nom_bloc: "automatique",
        type: TypeBloc.CAROUSEL,
        mediaCount: 2,
      },
    },
    {
      label: "Groupe d'images avec redirections",
      options: {
        ...baseOptions,
        text_nom_bloc: "image_group",
        type: TypeBloc.IMAGE_GROUPE,
        mediaCount: 4,
      },
    },
    {
      label: "Groupe d'images à afficher (photographie)",
      options: {
        ...baseOptions,
        text_nom_bloc: "grid",
        type: TypeBloc.IMAGE_GROUPE,
        mediaCount: 4,
      },
    },
    {
      label: "Ecran (image pleine page)",
      options: {
        ...baseOptions,
        text_nom_bloc: "screen",
        type: TypeBloc.SCREEN,
        mediaCount: 1,
      },
    },
    {
      label: "Vidéo",
      options: {
        ...baseOptions,
        text_nom_bloc: "video",
        type: TypeBloc.VIDEO,
        mediaCount: 1,
      },
    },
    {
      label: "Bouton",
      options: {
        ...baseOptions,
        text_nom_bloc: "bouton",
        type: TypeBloc.BUTTON,
        mediaCount: 1,
      },
    },
    {
      label: "Texte",
      options: {
        ...baseOptions,
        text_nom_bloc: "texte",
        type: TypeBloc.TEXTE,
        articleCount: 1,
        mediaPerArticle: 4,
      },
    },
    {
      label: "Calendrier",
      options: {
        ...baseOptions,
        text_nom_bloc: "calendar",
        type: TypeBloc.CALENDAR,
        calendar: true,
      },
    },
  ];
}

export default function BlocChoiceModal({
  page,
  addBlocToPage,
}: {
  page: PageObject;
  addBlocToPage(options: CreateBlocOptions): void;
}) {
  const [open, setOpen] = useState(false);

  const baseOptions = {
    number_page_id: page.number_id ?? -1,
    bloc_position: page.blocs.length ?? 0,
  };

  const blocChoices = getBlocChoices(baseOptions);

  return (
    <div className="space-y-6">
      <button
        aria-label="Créer un bloc"
        onClick={() => setOpen(true)}
        className="rounded bg-slate-600 px-2 py-2 text-white text-lg hover:bg-slate-700 transition"
      >
        Créer un bloc
      </button>

      <Modal
        title="Créer un bloc"
        open={open}
        onOpenChange={setOpen}
        primaryAction={{ label: "Confirmer", onClick: () => setOpen(false) }}
        secondaryAction={{ label: "Annuler", onClick: () => setOpen(false) }}
      >
        <div className="flex flex-col space-y-2 w-115">
          {blocChoices.map(({ label, options }) => (
            <button
              key={options.text_nom_bloc}
              aria-label={`Créer un bloc ${label}`}
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => {
                addBlocToPage(options);
                setOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
