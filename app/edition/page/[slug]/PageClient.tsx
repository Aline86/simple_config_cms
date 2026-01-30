"use client";

import { Plus, Save } from "lucide-react";

import { PageObject } from "@/model/Page";
import { useEffect, useState } from "react";
import PageBlocs from "./pageComponent";
import { reorderArray } from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";
import { cloneBlocWithMedias } from "@/helpers/bloc.helper";
import { clonePageWithBlocs } from "@/helpers/page.helper";
import BlocChoiceModal from "@/components/modals/PageChoiceModal";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import { HeaderObject } from "@/model/bloc/Header";
import HeaderView from "@/components/contextView/showcase/header/HeaderView";
import HeaderContextEdition from "@/components/contextView/edition/header/HeaderContextEdition";

export default function PageClient({
  initialpage,
  header,
}: {
  initialpage: PageObject;
  header: HeaderObject;
}) {
  const [page, setPage] = useState(new PageObject(initialpage));
  const [headerData, setHeader] = useState(new HeaderObject(header));
  const [dragged, setDragged] = useState<BlocObject | null>(null);
  const [draggableEnabled, setDraggableEnabled] = useState(false);
  console.log("header", headerData);
  const onDragStart = (bloc: BlocObject) => {
    if (bloc !== null) {
      setDragged(bloc);
    }
  };

  const onDrop = (target: BlocObject) => {
    if (!dragged) return;

    setPage((prev) => {
      if (!prev) return prev;

      // Recréer des MediaObject propres avec les bonnes positions
      const reordered = reorderArray(
        prev.blocs,
        dragged,
        target,
        "bloc_position",
      );

      return clonePageWithBlocs(prev, reordered);
    });

    setDragged(null);
  };
  const addBlocToPage = (options: CreateBlocOptions) => {
    const bloc = createNewBloc(options);

    setPage((prevPage) =>
      clonePageWithBlocs(prevPage, [...prevPage.blocs, bloc]),
    );
  };

  const updateBloc = (updatedBloc: BlocObject) => {
    setPage((prevPage) => {
      const newBlocs = prevPage.blocs.map((bloc) =>
        bloc.id === updatedBloc.id ? updatedBloc : bloc,
      );
      const up = clonePageWithBlocs(prevPage, newBlocs);

      return up;
    });
  };
  const handleSavePage = async () => {
    try {
      console.log(headerData);
      // Exécuter les 2 requêtes en parallèle
      const [pageRes, headerRes] = await Promise.all([
        // Promise 1 : Sauvegarder la page
        fetch("/api/edition/page", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: page,
          }),
        }),

        // Promise 2 : Sauvegarder le header
        fetch("/api/edition/page/header", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: headerData,
          }), // Assurez-vous d'avoir un state 'header'
        }),
      ]);

      // Vérifier les deux réponses
      if (!pageRes.ok) {
        throw new Error("Erreur lors de l'enregistrement de la page");
      }
      if (!headerRes.ok) {
        throw new Error("Erreur lors de l'enregistrement du header");
      }

      // Parser les résultats
      const [pageResult, headerResult] = await Promise.all([
        pageRes.json(),
        headerRes.json(),
      ]);

      console.log("Page enregistrée :", pageResult);
      console.log("Header enregistré :", headerResult);

      // Mettre à jour les states
      if (pageResult !== undefined) {
        setPage(new PageObject(pageResult.blocs));
      }
      if (headerResult !== undefined) {
        console.log("header.data", headerResult);
        setHeader(new HeaderObject(headerResult)); // Assurez-vous d'avoir un setHeader
      }
    } catch (error) {
      console.error("Erreur sauvegarde :", error);
    }
  };
  const handleRemove = (model: BlocObject) => {
    setPage((prev) => {
      if (!prev || !prev.blocs?.length) return prev;
      const filteredImages = prev.blocs.filter((img) => img.id !== model.id);

      return clonePageWithBlocs(prev, filteredImages);
    });
  };
  const updateHeader = (updatedBloc: HeaderObject) => {
    setHeader(updatedBloc);
  };
  useEffect(() => {}, [headerData]);
  return (
    <div className="p-6 space-y-6">
      <HeaderContextEdition bloc={headerData} onChange={updateHeader} />
      {page !== undefined && (
        <div>
          <BlocChoiceModal page={page} addBlocToPage={addBlocToPage} />
          <button
            onClick={() => handleSavePage()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-600 transition"
          >
            <Save size={14} /> Enregistrer les pages
          </button>
        </div>
      )}

      <PageBlocs
        page_data={page}
        updateBloc={updateBloc}
        onDelete={handleRemove}
        onDragStart={onDragStart}
        onDrop={onDrop}
        draggableEnabled={draggableEnabled}
      />
    </div>
  );
}
