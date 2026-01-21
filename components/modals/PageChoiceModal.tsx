import PageCrud from "@/app/pageComponent";
import { Modal } from "./Modal";
import { PageObject, TypeBloc } from "@/model/Page";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import { useEffect, useState } from "react";

export default function BlocChoiceModal(page: PageObject) {
  const [open, setOpen] = useState(false);

  const [page_data, setPage] = useState(page);
  const addBlocToPage = (options: CreateBlocOptions) => {
    const bloc = createNewBloc(options);

    // Créer une NOUVELLE page avec le bloc ajouté
    setPage((prevPage) => {
      const newPage = new PageObject({
        ...prevPage,
        blocs: [...prevPage.blocs, bloc], // ← Nouveau array
      });
      return newPage;
    });

    setOpen(false);
  };

  const options_carousel_miniature: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "miniatures",
    type: TypeBloc.CAROUSEL,
    mediaCount: 4,
  };
  const options_carousel_classique: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "classique",
    type: TypeBloc.CAROUSEL,
    mediaCount: 5,
  };
  const options_carousel_automatique: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "automatique",
    type: TypeBloc.CAROUSEL,
    mediaCount: 2,
  };
  const options_image_grid: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "grid",
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: 2,
  };
  const options_image_group: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "image_group",
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: 2,
  };
  const options_screen: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "screen",
    type: TypeBloc.SCREEN,
    mediaCount: 1,
  };
  const options_video: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "video",
    type: TypeBloc.VIDEO,
  };
  const options_texte: CreateBlocOptions = {
    page_id: page.number_id !== null ? page.number_id : -1,
    bloc_position: page.blocs.length,
    nom_bloc: "texte",
    type: TypeBloc.TEXTE,
    articleCount: 1,
    mediaPerArticle: 4,
  };

  useEffect(() => {}, [page_data]);
  return (
    <div className="p-6 space-y-6">
      <div className="p-10">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-slate-600 px-4 py-4 text-white text-lg hover:bg-slate-700 transition"
        >
          Créer un bloc
        </button>

        <Modal
          title="Créer un block"
          open={open}
          onOpenChange={setOpen}
          primaryAction={{
            label: "Confirmer",
            onClick: () => alert("Action principale !"),
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
              onClick={() => addBlocToPage(options_texte)}
            >
              Texte
            </button>
          </div>
        </Modal>
      </div>
      <PageCrud
        page_data={page_data}
        onDelete={function (page: PageObject): void {
          throw new Error("Function not implemented.");
        }}
        onEdit={function (
          page: PageObject,
          fieldName: keyof PageObject,
          newValue: any,
        ): void {
          throw new Error("Function not implemented.");
        }}
        onDragStart={function (page: PageObject): void {
          throw new Error("Function not implemented.");
        }}
        onDrop={function (page: PageObject): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
