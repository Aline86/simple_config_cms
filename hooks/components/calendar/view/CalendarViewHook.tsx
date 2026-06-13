import { EventClickArg } from "@fullcalendar/core";
import { useState } from "react";

export function useCalendarModal() {
  const [modal, setModal] = useState<{
    open: boolean;
    title: string;
    start: string;
    end: string;
  }>({ open: false, title: "", start: "", end: "" });

  function toLocalInput(d: Date | null | undefined) {
    if (!d) return "";
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  function formatDate(s: string) {
    if (!s) return "—";
    return new Date(s).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleEventClick(info: EventClickArg) {
    setModal({
      open: true,
      title: info.event.title,
      start: toLocalInput(info.event.start),
      end: toLocalInput(info.event.end ?? info.event.start),
    });
  }

  return { modal, setModal, formatDate, handleEventClick };
}
