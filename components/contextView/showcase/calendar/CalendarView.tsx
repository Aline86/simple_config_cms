import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { BlocObject } from "../../../../database/model/Bloc";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import frLocale from "@fullcalendar/core/locales/fr";
import { useCalendarModal } from "../../../../hooks/components/calendar/view/CalendarViewHook";

interface BlocParams {
  bloc: BlocObject;
  editing?: boolean;
}

export default function Calendar({ bloc }: Readonly<BlocParams>) {
  const { handleEventClick, modal, setModal, formatDate } = useCalendarModal();
  return (
    <section className="mx-auto max-w-4xl space-y-6 p-6 mb-8">
      <h2 className="mt-8 text-2xl font-bold text-slate-800 mb-6 text-center">
        {bloc.text_titre}
      </h2>
      <FullCalendar
        locale={frLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={bloc.calendar.events ?? []}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        eventClick={handleEventClick}
        selectable
        selectMirror
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
              {modal.title}
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xs font-medium text-slate-400 w-12 pt-0.5">
                  Début
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {formatDate(modal.start)}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-medium text-slate-400 w-12 pt-0.5">
                  Fin
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {formatDate(modal.end)}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  setModal((m) => ({ ...m, open: false }));
                }}
                className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
