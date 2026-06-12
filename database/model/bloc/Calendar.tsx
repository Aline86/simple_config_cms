import { immerable } from "immer";
import { BaseValidatable } from "../BaseValidator";
import { CalendarEvent } from "../../../components/contextView/edition/calendar/CalendarEdit";

export class CalendarObject extends BaseValidatable {
  [immerable] = true;

  // Structure des articles (stockés en JSON dans les blocs)
  public id: string | null;
  public text_bloc_id: string | null;
  public events: CalendarEvent[] | null;

  constructor(
    data: {
      id?: string | null;
      text_bloc_id?: string | null;
      events?: CalendarEvent[] | null;
    } = {},
  ) {
    super();

    this.id = data.id ?? null;
    this.events = data.events ?? null;
    this.text_bloc_id = data.text_bloc_id ?? null;
  }

  addEvent(ev: CalendarEvent): void {
    this.events.push(ev);
  }

  removeEvent(index: number): void {
    this.events.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.id,
      text_bloc_id: this.text_bloc_id,
      events: this.events,
    };
  }
}
