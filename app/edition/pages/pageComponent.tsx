"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  Cardtext_description,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Save, Trash } from "lucide-react";
import { FieldRenderer } from "@/validators/renderer/ValidatorRenderer";
import { Move, Lock, Unlock } from "lucide-react";
import { PageObject } from "@/model/Page";
import { useEffect, useState } from "react";
import Draggable from "@/components/ui/Draggable";
import { RedirectButton } from "@/components/ui/RedirectButton";

interface PageCrudProps {
  page_data: PageObject;
  onDelete: (page: PageObject) => void;
  onEdit: (
    page: PageObject,
    fieldName: keyof PageObject,
    newValue: any,
  ) => void;
  onAdd?: () => void; // optionnel, si tu veux un bouton "Ajouter une page"
  onDragStart: (page: PageObject) => void;
  onDrop: (page: PageObject) => void;
  draggableEnabled: boolean;
}

export default function PageCrud({
  page_data,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
  draggableEnabled,
}: PageCrudProps) {
  const show_debug = true;
  const handleEdit = (fieldName: string, newValue: any) => {
    onEdit(page_data, fieldName as keyof PageObject, newValue);
  };

  return (
    <div className="p-6 space-y-6 ">
      <div className="grid  lg:grid-cols-1 gap-6 ">
        <Card
          draggable={draggableEnabled}
          onDragStart={() => onDragStart(page_data)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(page_data)}
          className="cursor-grab active:cursor-grabbing"
        >
          <CardHeader>
            <CardTitle>{page_data.text_titre}</CardTitle>
            <Cardtext_description>
              Créé le{" "}
              {page_data !== null && page_data !== undefined
                ? page_data.text_createdAt?.toString()
                : ""}
            </Cardtext_description>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <FieldRenderer
                selectedValidatorKey={"text_titre"}
                fieldName={"text_titre"}
                model={page_data}
                setField={handleEdit}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-center">
            <div className="flex gap-2">
              {/* Bouton Delete */}
              <button
                onClick={() => onDelete(page_data)}
                className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                <Trash size={14} /> Supprimer
              </button>
            </div>
            <div className="flex gap-2">
              <RedirectButton slug={page_data.text_slug ?? ""} />
            </div>
            <span className="text-xs text-muted-foreground">
              id: {page_data.number_id}
            </span>
          </CardFooter>
        </Card>
      </div>
      {show_debug ? (
        <div className="mx-auto max-w-2xl mt-6 p-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-2 text-slate-900">
              État global (Home component)
            </h3>
            <pre className="text-xs overflow-auto bg-slate-50 p-3 rounded">
              {JSON.stringify(page_data, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
