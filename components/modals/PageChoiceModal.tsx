"use client";

import { useState } from "react";
import { CreateBlocOptions } from "../../lib/factories/Bloc.factory";
import { PageObject, TypeBloc } from "../../model/Page";
import { Modal } from "./Modal";

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
    bloc_position: page.blocs?.length ?? 0,
  };

  const options_carousel_miniature: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "miniatures",
    type: TypeBloc.CAROUSEL,
    mediaCount: 5,
  };
  const options_carousel_classique: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "classique",
    type: TypeBloc.CAROUSEL,
    mediaCount: 5,
  };
  const options_carousel_automatique: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "automatique",
    type: TypeBloc.CAROUSEL,
    mediaCount: 2,
  };
  const options_image_grid: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "grid",
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: 4,
  };
  const options_image_group: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "image_group",
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: 4,
  };
  const options_screen: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "screen",
    type: TypeBloc.SCREEN,
    mediaCount: 1,
  };
  const options_video: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "video",
    type: TypeBloc.VIDEO,
    mediaCount: 1,
  };
  const options_button: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "bouton",
    type: TypeBloc.BUTTON,
    mediaCount: 1,
  };
  const options_texte: CreateBlocOptions = {
    ...baseOptions,
    text_nom_bloc: "texte",
    type: TypeBloc.TEXTE,
    articleCount: 1,
    mediaPerArticle: 4,
  };

  return (
    <div className="space-y-6">
      <div className="">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-slate-600 px-2 py-2 text-white text-lg hover:bg-slate-700 transition"
        >
          Créer un bloc
        </button>

        <Modal
          title="Créer un block"
          open={open}
          onOpenChange={setOpen}
          primaryAction={{
            label: "Confirmer",
            onClick: () => setOpen(false),
          }}
          secondaryAction={{
            label: "Annuler",
            onClick: () => setOpen(false),
          }}
        >
          <div className="flex flex-col space-y-2 w-115">
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_carousel_miniature)}
            >
              Carousel d'images avec miniatures
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_carousel_classique)}
            >
              Carousel d'images classique
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_carousel_automatique)}
            >
              Carousel d'images automatique
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_image_group)}
            >
              Groupe d'images avec redirections
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_image_grid)}
            >
              Groupe d'images à afficher (photographie)
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_screen)}
            >
              Ecran (image pleine page)
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_video)}
            >
              Vidéo
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_button)}
            >
              Bouton
            </button>
            <button
              className="px-4 py-4 rounded bg-slate-600 text-white text-lg hover:bg-slate-700 transition"
              onClick={() => addBlocToPage(options_texte)}
            >
              Texte
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
