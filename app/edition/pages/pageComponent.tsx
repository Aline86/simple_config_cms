"use client";

import { Save, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  Cardtext_description,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { RedirectButton } from "../../../components/ui/RedirectButton";
import { PageObject } from "../../../database/model/Page";
import { FieldRenderer } from "../../../lib/validators/renderer/TextRenderer";
import { Accordion } from "../../../components/ui/Accordeon";
import { useEffect } from "react";
import { convertToFrenchDate } from "../../../lib/helpers/dateConverter.utils";

interface PageCrudProps {
  page_data: PageObject;
  onDelete: (page: PageObject) => void;
  onEdit: (
    page: PageObject,
    fieldName: keyof PageObject,
    newValue: unknown,
  ) => void;
  onDragStart: (page: PageObject) => void;
  onDrop: (page: PageObject) => void;
  draggableEnabled: boolean;
  pages: PageObject[];
  show_debug?: boolean;
  handleSavePages: () => void;
  parent_id?: number;
}

export default function PageCrud({
  page_data,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
  draggableEnabled,
  pages,
  show_debug = false,
  handleSavePages,
  parent_id,
}: PageCrudProps) {
  if (parent_id !== undefined) {
    page_data.number_parent_id = parent_id;
  }

  const handleEdit = (fieldName: string, newValue: unknown) => {
    onEdit(page_data, fieldName as keyof PageObject, newValue);
  };
  const num = Number(page_data.number_page_position);
  useEffect(() => {}, [pages]);
  return (
    <div className=" ">
      <div
        className="cursor-grab active:cursor-grabbing grid  gap-6 "
        draggable={draggableEnabled}
        onDragStart={() => {
          onDragStart(page_data);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={() => {
          onDrop(page_data);
        }}
      >
        <Accordion
          children={
            <Card>
              <CardHeader>
                <CardTitle>{page_data.text_titre}</CardTitle>
                <Cardtext_description>
                  Créé le {convertToFrenchDate(page_data.text_createdAt)}
                </Cardtext_description>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <FieldRenderer
                    fieldName={"text_titre"}
                    model={page_data}
                    setField={handleEdit}
                    label={"Titre de la page"}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <FieldRenderer
                    fieldName={"text_description"}
                    model={page_data}
                    setField={handleEdit}
                    label={
                      "Description de la page - mots-clés pour l'indexation dans les moteurs de recherche - SEO"
                    }
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <FieldRenderer
                    fieldName={"checkbox_home_page"}
                    model={page_data}
                    setField={handleEdit}
                    label={"Page d'accueil"}
                    pages={pages}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end items-center">
                <div className="flex gap-2 mr-2">
                  {" "}
                  <button
                    aria-label="Enregistrer"
                    onClick={() => {
                      handleSavePages();
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    <Save size={14} /> Enregistrer la page
                  </button>
                </div>

                <div className="flex gap-2   z-100">
                  <button
                    aria-label="Supprimer"
                    onClick={() => onDelete(page_data)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    <Trash size={14} /> Supprimer
                  </button>
                </div>
                {parent_id === undefined && (
                  <>
                    <RedirectButton
                      slug={"../pages/" + page_data.number_id}
                      label={"Pages associées"}
                    />
                  </>
                )}
                {page_data.number_id !== null && (
                  <>
                    <div className="flex gap-2">
                      <RedirectButton slug={page_data.text_slug ?? ""} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      id: {page_data.number_id}
                    </span>
                  </>
                )}
              </CardFooter>
            </Card>
          }
          header={" Page n° : " + num + " " + page_data.text_titre}
        />
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
