"use client";

import { Plus, Save } from "lucide-react";

import { useEffect, useState } from "react";
import PageBlocs from "./pageComponent";
import { PageObject } from "../../../../model/Page";
import { HeaderObject } from "../../../../model/bloc/Header";
import { FooterObject } from "../../../../model/bloc/Footer";
import {
  CreateBlocOptions,
  createNewBloc,
} from "../../../../lib/factories/Bloc.factory";
import { BlocObject } from "../../../../model/Bloc";
import { clonePageWithBlocs } from "../../../../helpers/page.helper";
import HeaderContextEdition from "../../../../components/contextView/edition/header/HeaderContextEdition";
import BlocChoiceModal from "../../../../components/modals/PageChoiceModal";
import FooterContextEdition from "../../../../components/contextView/edition/footer/FooterContextEdition";
import { reorderArray } from "../../../../helpers/changeComponentPosition";

export default function PageClient({
  initialpage,
  header,
  footer,
}: {
  initialpage: PageObject;
  header: HeaderObject;
  footer: FooterObject;
}) {
  const [page, setPage] = useState(new PageObject(initialpage));
  const [headerData, setHeader] = useState(new HeaderObject(header, "edition"));
  const [footerData, setFooter] = useState(new FooterObject(footer, "edition"));
  const [dragged, setDragged] = useState<BlocObject | null>(null);
  const [draggableEnabled, setDraggableEnabled] = useState(false);

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
      // Exécuter les 2 requêtes en parallèle
      const [pageRes, headerRes, footerRes] = await Promise.all([
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
        // Promise 3 : Sauvegarder le footer
        fetch("/api/edition/page/footer", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: footerData,
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
      const [pageResult, headerResult, footerResult] = await Promise.all([
        pageRes.json(),
        headerRes.json(),
        footerRes.json(),
      ]);

      // Mettre à jour les states
      if (pageResult !== undefined) {
        setPage(new PageObject(pageResult.blocs));
      }
      if (headerResult !== undefined) {
        setHeader(new HeaderObject(headerResult, "edition")); // Assurez-vous d'avoir un setHeader
      }
      if (footerResult !== undefined) {
        setFooter(new FooterObject(footerResult, "edition")); // Assurez-vous d'avoir un setHeader
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
  const updateFooter = (updatedBloc: FooterObject) => {
    setFooter(updatedBloc);
  };
  useEffect(() => {}, [headerData, footerData]);
  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => handleSavePage()}
        className="cursor-pointer shadow-lg fixed top-[50px]   z-100 flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-600 transition "
      >
        <Save size={14} /> Enregistrer la page
      </button>
      <HeaderContextEdition bloc={headerData} onChange={updateHeader} />
      {page !== undefined && (
        <div className="">
          <BlocChoiceModal page={page} addBlocToPage={addBlocToPage} />
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
      <FooterContextEdition bloc={footerData} onChange={updateFooter} />
    </div>
  );
}
