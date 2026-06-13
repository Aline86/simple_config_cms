import { EditorProps } from "../../../../lib/helpers/globabProps";
import { useState, useRef } from "react";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";

export type CalendarEvent = EventInput & { id: string };
export type CalendarEditorProps = Pick<EditorProps, "bloc" | "onChange">;

export function useCalendarEditor({ bloc, onChange }: CalendarEditorProps) {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState<CalendarEvent[]>(
    bloc.calendar.events ?? [],
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

    setModal({ open: true, isNew: true, title: "", start, end });
  }

  function saveEvents(next: CalendarEvent[]) {
    setEvents(next);
    onChange(`blocs.${bloc.bloc_position}.calendar.events`, next);
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
      saveEvents([...events, ev]);
    } else {
      const next = events.map((ev) =>
        ev.id === modal.id
          ? { ...ev, title: modal.title, start: modal.start, end: modal.end }
          : ev,
      );
      saveEvents(next);
    }
    setModal((m) => ({ ...m, open: false }));
  }

  function handleDelete() {
    saveEvents(events.filter((ev) => ev.id !== modal.id));
    setModal((m) => ({ ...m, open: false }));
  }

  return {
    calendarRef,
    events,
    modal,
    setModal,
    handleSelect,
    handleEventClick,
    handleSave,
    handleDelete,
    saveEvents,
  };
}
