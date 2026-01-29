"use client";

import { Plus, Save } from "lucide-react";

import { PageObject } from "@/model/Page";
import { useEffect, useState } from "react";
import PageCrud from "./pageComponent";

import { reorderArray } from "@/helpers/changeComponentPosition";

import Draggable from "@/components/ui/Draggable";
import { clonePageWithBlocs } from "@/helpers/page.helper";
import { BlocObject } from "@/model/Bloc";

export default function PageClient({
  initialPages,
}: {
  initialPages: PageObject[];
}) {
  const [pages, setPages] = useState(initialPages);
  const [draggableEnabled, setDraggableEnabled] = useState(false);

  // parent
  const [dragged, setDragged] = useState<PageObject | null>(null);

  const onDragStart = (page: PageObject) => {
    setDragged(page);
  };

  const onDrop = (target: PageObject) => {
    if (!dragged) return;
    const pages_result = reorderArray(
      pages,
      dragged,
      target,
      "number_page_position",
    );
    console.log("pages_result", pages_result);
    setPages(
      pages_result.map((p: PageObject, index: number) => {
        return new PageObject(
          {
            id: p.number_id,
            parent_id: p.number_parent_id, // toujours null à la création
            published: p.checkbox_published, // page non publiée par défaut
            text_titre: p.text_titre ?? "", // text_titre vide
            slug: p.text_slug ?? "", // text_titre vide
            number_page_position: index + 1,
            langue: p.text_langue ?? "fr_FR", // langue par défaut "fr"
            blocs: p.blocs ?? [], // aucun bloc par défaut
            text_createdAt: p.text_createdAt ?? new Date(),
            text_updatedAt: p.text_updatedAt ?? new Date(),
          },
          "edition", // mode fixe
        );
      }),
    );
    setDragged(null);
  };

  // Supprimer une page
  const handleDelete = async (page: PageObject) => {
    if (!confirm(`Supprimer la page "${page.text_titre}" ?`)) return;

    try {
      const res = await fetch("/api/edition/page", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: page.number_id }),
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      const result = await res.json(); // le page supprimée ou info renvoyée

      // Supprime la page du state
      setPages((prev) => prev.filter((p) => p.number_id !== page.number_id));

      console.log("Page supprimée :", result);
    } catch (error) {
      console.error(error);
    }
  };

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

      if (result !== undefined && Array.isArray(result)) {
        const updatedPages = result.map((dbPage: any) => {
          // Parser les blocs si c'est une string
          const blocs =
            typeof dbPage.blocs === "string"
              ? JSON.parse(dbPage.blocs).map((b: any) => new BlocObject(b))
              : dbPage.blocs.map((b: any) => new BlocObject(b));

          return new PageObject({
            number_id: dbPage.number_id,
            number_parent_id: dbPage.number_parent_id,
            checkbox_published: dbPage.checkbox_published,
            text_titre: dbPage.text_titre,
            text_slug: dbPage.text_slug,
            number_page_position: dbPage.number_page_position,
            text_langue: dbPage.text_langue,
            text_createdAt: dbPage.text_createdAt,
            text_updatedAt: dbPage.text_updatedAt,
            blocs,
          });
        });

        setPages(updatedPages); // ✅ Remplacer tout l'état
      }

      console.log("✅ Pages enregistrées avec succès");
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde:", error);
    }
  };

  // Editer une page
  // Editer une page
  const handleEdit = (
    page: PageObject,
    fieldName: keyof PageObject,
    newValue: any,
  ) => {
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
  };
  // Ajouter une nouvelle page
  const handleAdd = () => {
    const newPage = new PageObject({
      number_id: null,
      number_parent_id: null,
      checkbox_published: false,
      text_titre: "",
      text_slug: "",
      number_page_position: pages.length + 1,
      text_langue: "fr",
      text_createdAt: new Date(),
      text_updatedAt: new Date(),
      blocs: [],
    });

    setPages((prev) => [...prev, newPage]);
  };

  useEffect(() => {
    const result = initialPages.map((page) => new PageObject(page));
    setPages(result);
  }, [initialPages]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Pages</h2>
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
        >
          <Plus size={16} /> Nouvelle Page
        </button>{" "}
        <Draggable
          draggableEnabled={draggableEnabled}
          setDraggableEnabled={setDraggableEnabled}
        />
        <button
          onClick={() => handleSavePages()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-600 transition"
        >
          <Save size={14} /> Enregistrer les pages
        </button>
      </div>

      {/* Grille des pages */}
      <div className="grid grid-cols-1 gap-6">
        {pages !== undefined &&
          pages.map(
            (page, index) =>
              page !== undefined && (
                <PageCrud
                  key={index}
                  page_data={page}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onDrop={onDrop}
                  onDragStart={onDragStart}
                  draggableEnabled={draggableEnabled}
                />
              ),
          )}
      </div>
    </div>
  );
}
