"use client";

import { useEffect, useState } from "react";
import PageBlocs from "./pageComponent";
import { PageObject } from "../../../../database/model/Page";
import { HeaderObject } from "../../../../database/model/bloc/Header";
import { FooterObject } from "../../../../database/model/bloc/Footer";
import {
  CreateBlocOptions,
  createNewBloc,
} from "../../../../lib/factories/Bloc.factory";
import { BlocObject } from "../../../../database/model/Bloc";
import { clonePageWithBlocs } from "../../../../lib/helpers/page.helper";

import { reorderArray } from "../../../../lib/helpers/changeComponentPosition";
import NavBarEdition from "../../../../components/ui/NavBarEdition";
import ErrorMessage from "../../../../components/ui/ErrorMessage";
import { Accordion } from "../../../../components/ui/Accordeon";
import ThemeToggle from "../../../../components/ui/ThemeToggle";
import { updateObjectByPath } from "../../../../lib/helpers/updateByPath";
import ComponentBloc from "../../../../components/contextView/ComponentBloc";

export default function PageClient({
  initialPage,
  header,
  footer,
  cssVars,
}: {
  initialPage: PageObject;
  header: HeaderObject;
  footer: FooterObject;
  cssVars: string;
}) {
  const [page, setPage] = useState(new PageObject(initialPage));
  const [headerData, setHeader] = useState(new HeaderObject(header, "edition"));
  const [footerData, setFooter] = useState(new FooterObject(footer, "edition"));
  const [dragged, setDragged] = useState<BlocObject | null>(null);
  const [draggableEnabled, setDraggableEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);

  const onDragStart = (bloc: BlocObject) => {
    if (bloc !== null) {
      setDragged(bloc);
    }
  };

  const onDrop = (target: BlocObject) => {
    if (!dragged) return;

    setPage((prev) => {
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
    setMessage("L'action a réussi !");
    setShowErrorMessage(!showErrorMessage);
    setHasSucceeded(true);
  };

  const updateBloc = (fieldName: string, value: unknown) => {
    setPage((prevPage) => {
      return updateObjectByPath(prevPage, fieldName, value).data;
    });
  };
  const handleSavePage = async () => {
    try {
      const [pageRes, headerRes, footerRes] = await Promise.all([
        fetch("/api/edition/page", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: page,
          }),
        }),

        fetch("/api/edition/page/header", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: headerData,
          }),
        }),
        fetch("/api/edition/page/footer", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            data: footerData,
          }),
        }),
      ]);

      if (!pageRes.ok) {
        throw new Error("Erreur lors de l'enregistrement de la page");
      }
      if (!headerRes.ok) {
        throw new Error("Erreur lors de l'enregistrement du header");
      }

      const [pageResult, headerResult, footerResult] = await Promise.all([
        pageRes.json(),
        headerRes.json(),
        footerRes.json(),
      ]);

      if (pageResult !== undefined) {
        setPage(new PageObject(pageResult.page));
      }
      if (headerResult !== undefined) {
        setHeader(new HeaderObject(headerResult.header, "edition"));
      }
      if (footerResult !== undefined) {
        setFooter(new FooterObject(footerResult.footer, "edition"));
      }
      setMessage("L'action a réussi !");
      setShowErrorMessage(!showErrorMessage);
      setHasSucceeded(true);
    } catch (error) {
      setMessage(
        "L'action n'a pas réussi, veuillez recommencer, si le problème persiste, veuillez contacter l'administrateur !",
      );
      setShowErrorMessage(!showErrorMessage);
      setHasSucceeded(false);
    }
  };
  const handleRemove = (model: BlocObject) => {
    setPage((prev) => {
      const remainingBlocs = prev.blocs
        .filter((bloc) => bloc.id !== model.id)

        .map((bloc, index) => {
          const updated = new BlocObject(bloc);
          updated.bloc_position = index;
          return updated;
        });

      return clonePageWithBlocs(prev, remainingBlocs);
    });

    setMessage(
      "Action réussie mais veuillez enregistrer tout le contenu pour sauvegarder la suppression",
    );
    setShowErrorMessage(true);
    setHasSucceeded(true);
  };

  const updateHeader = (fieldName: string, value: unknown) => {
    setHeader((prev) => {
      return updateObjectByPath(prev, fieldName, value).data;
    });
  };
  const updateFooter = (fieldName: string, value: unknown) => {
    setFooter((prev) => {
      return updateObjectByPath(prev, fieldName, value).data;
    });
  };
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };

  return (
    <body className="space-y-6 ">
      <style
        href="dom-data-config-vars"
        precedence="default"
        dangerouslySetInnerHTML={{ __html: cssVars }}
      />
      <NavBarEdition
        labelAdd="Ajouter un bloc"
        handleAdd={addBlocToPage}
        logout={logout}
        setDraggableEnabled={setDraggableEnabled}
        handleSavePages={handleSavePage}
        draggableEnabled={draggableEnabled}
        model={page}
      />
      {showErrorMessage && (
        <ErrorMessage
          message={message}
          setShowErrorMessage={setShowErrorMessage}
          errorMessage={showErrorMessage}
          hasSucceeded={hasSucceeded}
        />
      )}
      <ThemeToggle />
      <h1 className="text-3xl font-bold mt-24 text-center">
        {page.text_titre}
      </h1>
      <div className="">
        <Accordion
          children={<ComponentBloc bloc={headerData} onChange={updateHeader} />}
          header={"En-tête"}
        />
      </div>

      <PageBlocs
        page_data={page}
        updateBloc={updateBloc}
        onDelete={handleRemove}
        onDragStart={onDragStart}
        onDrop={onDrop}
        draggableEnabled={draggableEnabled}
      />
      <Accordion
        children={<ComponentBloc bloc={footerData} onChange={updateFooter} />}
        header={"Pied de page"}
      />
    </body>
  );
}
