"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import frLocale from "@fullcalendar/core/locales/fr";
import { useState, useRef } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
export type CalendarEvent = EventInput & { id: string };

interface CalendarEditorProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (button: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink: boolean;
  show_debug?: boolean;
}
export default function CalendarEdit({ bloc, onChange }: CalendarEditorProps) {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState<CalendarEvent[]>(
    bloc.calendar?.events ?? [],
  );
  const [modal, setModal] = useState<{
    open: boolean;
    isNew: boolean;
    id?: string;
    title: string;
    start: string;
    end: string;
  }>({ open: false, isNew: true, title: "", start: "", end: "" });

  function toLocalInput(d: Date | null | undefined) {
    if (!d) return "";
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  function handleSelect(info: DateSelectArg) {
    const start =
      info.startStr.length === 10
        ? `${info.startStr}T09:00`
        : info.startStr.slice(0, 16);

    const end =
      info.startStr.length === 10
        ? `${info.startStr}T10:00`
        : info.endStr.slice(0, 16);

    setModal({
      open: true,
      isNew: true,
      title: "",
      start,
      end,
    });
  }

  function handleEventClick(info: EventClickArg) {
    setModal({
      open: true,
      isNew: false,
      id: info.event.id,
      title: info.event.title,
      start: toLocalInput(info.event.start),
      end: toLocalInput(info.event.end ?? info.event.start),
    });
  }

  function handleSave() {
    if (!modal.title.trim()) return;
    if (modal.isNew) {
      const ev: CalendarEvent = {
        id: String(Date.now()),
        title: modal.title,
        start: modal.start,
        end: modal.end,
      };
      const next = [...events, ev];
      setEvents(next);
      onChange?.(`blocs.${bloc.bloc_position}.calendar.events`, next);
    } else {
      const next = events.map((ev) =>
        ev.id === modal.id
          ? { ...ev, title: modal.title, start: modal.start, end: modal.end }
          : ev,
      );
      setEvents(next);
      onChange?.(`blocs.${bloc.bloc_position}.calendar.events`, next);
    }
    setModal((m) => ({ ...m, open: false }));
  }

  function handleDelete() {
    const next = events.filter((ev) => ev.id !== modal.id);
    setEvents(next);
    onChange?.(`blocs.${bloc.bloc_position}.calendar.events`, next);
    setModal((m) => ({ ...m, open: false }));
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Calendrier"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez le contenu de votre composant
        </p>
      </div>
      <FieldRenderer
        label="Titre du bloc d'images avec lien de redirection"
        fieldName={`blocs.` + bloc.bloc_position + ".text_titre"}
        model={bloc as BlocObject}
        setField={onChange}
      />
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
          const next = events.map((ev) =>
            ev.id === info.event.id
              ? { ...ev, start: info.event.startStr, end: info.event.endStr }
              : ev,
          );
          setEvents(next);
          onChange?.(`blocs.${bloc.bloc_position}.calendar.events`, next);
        }}
        eventResize={(info) => {
          const next = events.map((ev) =>
            ev.id === info.event.id ? { ...ev, end: info.event.endStr } : ev,
          );
          setEvents(next);
          onChange?.(`blocs.${bloc.bloc_position}.calendar.events`, next);
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
                onChange={(e) =>
                  setModal((m) => ({ ...m, title: e.target.value }))
                }
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
                onChange={(e) =>
                  setModal((m) => ({ ...m, start: e.target.value }))
                }
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
                onChange={(e) =>
                  setModal((m) => ({ ...m, end: e.target.value }))
                }
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
                onClick={() => setModal((m) => ({ ...m, open: false }))}
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
