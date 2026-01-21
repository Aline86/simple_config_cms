"use client";

import * as React from "react";

import { Plus } from "lucide-react";

import { PageObject } from "@/model/Page";
import { useEffect, useState } from "react";
import PageCrud from "./pageComponent";
import {
  deleteItemAndReorder,
  reorderArray,
} from "@/helpers/changeComponentPosition";
export type PageWithTmp = PageObject & {
  _tmp: string;
};

export default function Page() {
  const [pages, setPages] = useState<PageObject[]>([]);
  // parent
  const [dragged, setDragged] = useState<PageObject | null>(null);

  const onDragStart = (page: PageObject) => {
    setDragged(page);
  };

  const onDrop = (target: PageObject) => {
    if (!dragged) return;

    setPages((prev) => reorderArray(prev, dragged, target));

    setDragged(null);
  };

  // Supprimer une page
  const handleDelete = (page: PageObject) => {
    if (confirm(`Supprimer la page "${page.text_titre}" ?`)) {
      setPages((prev) =>
        deleteItemAndReorder(prev, page, "number_page_position"),
      );
    }
  };

  // Editer une page
  const handleEdit = (
    page: PageObject,
    fieldName: keyof PageObject,
    newValue: any,
  ) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.number_page_position === page.number_page_position) {
          (p as any)[fieldName] = newValue; // mise à jour de l'instance existante
        }
        return p;
      }),
    );
  };

  // Ajouter une nouvelle page
  const handleAdd = () => {
    const newPage = new PageObject({
      id: null,
      parent_id: null,
      published: false,
      titre: "",
      page_position: pages.length + 1,
      langue: "fr",
      createdAt: new Date(),
      updatedAt: new Date(),
      blocs: [],
    });
    newPage._tmp = crypto.randomUUID();
    setPages((prev) => [...prev, newPage]);
  };

  useEffect(() => {
    console.log("pages", pages);
  }, [pages]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pages</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
        >
          <Plus size={16} /> Nouvelle Page
        </button>
      </div>

      {/* Grille des pages */}
      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
        {pages.map((page) => (
          <PageCrud
            key={page.number_page_position}
            page_data={page}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDrop={onDrop}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
