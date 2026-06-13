"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import { EditorProps } from "../../../../lib/helpers/globabProps";
import { useCalendarEditor } from "../../../../hooks/components/calendar/editor/CalendarEditorHook";

export type CalendarEvent = EventInput & { id: string };

export default function CalendarEdit({ bloc, onChange }: EditorProps) {
  const {
    calendarRef,
    events,
    modal,
    setModal,
    handleSelect,
    handleEventClick,
    handleSave,
    handleDelete,
    saveEvents,
  } = useCalendarEditor({ bloc, onChange });

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-12">
      <div className="space-y-2 mb-8 mt-2">
        <FieldRenderer
          label="Titre du bloc d'images avec lien de redirection"
          fieldName={`blocs.` + bloc.bloc_position + ".text_titre"}
          model={bloc as BlocObject}
          setField={onChange}
        />
      </div>

      <FullCalendar
        locale={frLocale}
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        editable
        selectable
        selectMirror
        events={events}
        select={handleSelect}
        eventClick={handleEventClick}
        eventDrop={(info) => {
          saveEvents(
            events.map((ev) =>
              ev.id === info.event.id
                ? { ...ev, start: info.event.startStr, end: info.event.endStr }
                : ev,
            ),
          );
        }}
        eventResize={(info) => {
          saveEvents(
            events.map((ev) =>
              ev.id === info.event.id ? { ...ev, end: info.event.endStr } : ev,
            ),
          );
        }}
      />

      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setModal((m) => ({ ...m, open: false }));
          }}
        >
          <div className="w-80 rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              {modal.isNew ? "Nouvel événement" : "Modifier l'événement"}
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Titre
              </label>
              <input
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                value={modal.title}
                placeholder="Nom de l'événement"
                onChange={(e) => {
                  setModal((m) => ({ ...m, title: e.target.value }));
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Début
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                value={modal.start}
                onChange={(e) => {
                  setModal((m) => ({ ...m, start: e.target.value }));
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Fin
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                value={modal.end}
                onChange={(e) => {
                  setModal((m) => ({ ...m, end: e.target.value }));
                }}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              {!modal.isNew && (
                <button
                  onClick={handleDelete}
                  className="mr-auto text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                >
                  Supprimer
                </button>
              )}
              <button
                onClick={() => {
                  setModal((m) => ({ ...m, open: false }));
                }}
                className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {modal.isNew ? "Créer" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
