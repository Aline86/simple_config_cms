"use client";

import { Plus, Save } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Draggable from "../../../components/ui/Draggable";
import { reorderArray } from "../../../helpers/changeComponentPosition";
import { BlocObject } from "../../../model/Bloc";
import { PageObject } from "../../../model/Page";
import PageCrud from "./pageComponent";
import LogoutButton from "../../../components/ui/LogoutButton";
import NavBarEdition from "../../../components/ui/NavBarEdition";
import ErrorMessage from "../../../components/ui/ErrorMessage";

export default function PageClient({
  initialPages,
}: {
  initialPages: PageObject[];
}) {
  const [pages, setPages] = useState(initialPages);
  const [draggableEnabled, setDraggableEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [dragged, setDragged] = useState<PageObject | null>(null);

  const onDragStart = (page: PageObject) => {
    setDragged(page);
  };

  const onDrop = useCallback(
    (target: PageObject) => {
      setPages((prev) => {
        if (!dragged) return prev;

        const reordered = reorderArray(
          prev,
          dragged,
          target,
          "number_page_position",
        );

        if (!Array.isArray(reordered)) return prev;

        return reordered.map(
          (p, index) =>
            new PageObject(
              {
                id: p.number_id,
                parent_id: p.number_parent_id,
                published: p.checkbox_published,
                checkbox_home_page: p.checkbox_home_page,
                text_titre: p.text_titre ?? "",
                text_description: p.text_description ?? "",
                slug: p.text_slug ?? "",
                number_page_position: index + 1,
                langue: p.text_langue ?? "fr_FR",
                blocs: p.blocs ?? [],
                text_createdAt: p.text_createdAt ?? new Date(),
                text_updatedAt: p.text_updatedAt ?? new Date(),
              },
              "edition",
            ),
        );
      });

      setDragged(null);
    },
    [dragged],
  );

  const handleSavePages = async () => {
    try {
      const res = await fetch("/api/edition/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: pages,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'enregistrement");
      }

      const result = await res.json(); // Pages avec les ids de la BDD

      if (result !== undefined && result !== null) {
        const updatedPages = Object.entries(result.pages).map(
          ([, dbPage]: [string, PageObject]) => {
            // Parser les blocs si c'est une string
            const blocs =
              typeof dbPage.blocs === "string"
                ? JSON.parse(dbPage.blocs).map((b: any) => new BlocObject(b))
                : dbPage.blocs.map((b: any) => new BlocObject(b));

            return new PageObject({
              number_id: dbPage.number_id,
              number_parent_id: dbPage.number_parent_id,
              checkbox_published: dbPage.checkbox_published,
              checkbox_home_page: dbPage.checkbox_home_page,
              text_titre: dbPage.text_titre,
              text_description: dbPage.text_description,
              text_slug: dbPage.text_slug,
              number_page_position: dbPage.number_page_position,
              text_langue: dbPage.text_langue,
              text_createdAt: dbPage.text_createdAt,
              text_updatedAt: dbPage.text_updatedAt,
              blocs,
            });
          },
        );

        setPages(updatedPages);
      }
      setMessage("L'action a réussi !");
      setShowErrorMessage(!showErrorMessage);
      setHasSucceeded(true);
    } catch (error) {
      setMessage("L'action n'a pas réussi !" + error);
      setShowErrorMessage(!showErrorMessage);
      setHasSucceeded(false);
    }
  };

  const handleEdit = useCallback(
    (page: PageObject, fieldName: keyof PageObject, newValue: any) => {
      setPages((prev) =>
        prev.map((p) => {
          if (
            (p.text_slug === page.text_slug && page.text_slug !== "") ||
            p.number_page_position === page.number_page_position
          ) {
            p.setField(fieldName, newValue);
          }
          return p;
        }),
      );
    },
    [],
  );

  const handleDelete = useCallback(async (model: PageObject) => {
    if (!confirm(`Supprimer la page "${model.text_titre}" ?`)) return;
    if (model.number_id !== -1) {
      await fetch("/api/edition/page", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: model.number_id }),
      });
    }

    setPages((prev) => {
      const filtered = prev.filter(
        (p) => p.number_page_position !== model.number_page_position,
      );

      return filtered.map((p, index) => {
        p.number_page_position = index + 1;
        return p;
      });
    });
  }, []);

  // Ajouter une nouvelle page
  const handleAdd = () => {
    const newPage = new PageObject({
      number_id: null,
      number_parent_id: null,
      checkbox_published: false,
      checkbox_home_page: false,
      text_titre: "",
      text_description: "",
      text_slug: "",
      number_page_position: pages.length + 1,
      text_langue: "fr",
      text_createdAt: new Date(),
      text_updatedAt: new Date(),
      blocs: [],
    });

    setPages((prev) => [...prev, newPage]);
  };
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };
  useEffect(() => {
    const result = Object.entries(initialPages).map(
      ([, page]) => new PageObject(page),
    );
    setPages(result);
  }, [initialPages]);

  useEffect(() => {}, [showErrorMessage, message, hasSucceeded, pages]);
  return (
    <body className="p-24 space-y-6">
      <h2 className="text-2xl font-bold">Pages</h2>
      {showErrorMessage && (
        <ErrorMessage
          message={message}
          setShowErrorMessage={setShowErrorMessage}
          errorMessage={showErrorMessage}
          hasSucceeded={hasSucceeded}
        />
      )}
      <NavBarEdition
        labelAdd="Ajouter une page"
        logout={logout}
        handleAdd={handleAdd}
        setDraggableEnabled={setDraggableEnabled}
        handleSavePages={handleSavePages}
        draggableEnabled={draggableEnabled}
      />

      {/* Grille des pages */}
      <div className="grid grid-cols-1 gap-6">
        {pages !== undefined &&
          Array.isArray(pages) &&
          pages.map((_, index) => (
            <PageCrud
              key={index}
              page_data={pages[index]}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDrop={onDrop}
              onDragStart={onDragStart}
              draggableEnabled={draggableEnabled}
              pages={pages}
            />
          ))}
      </div>
    </body>
  );
}
