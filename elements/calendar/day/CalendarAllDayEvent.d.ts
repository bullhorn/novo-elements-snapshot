import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoCalendarAllDayEventElement {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDef<NovoCalendarAllDayEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCalendarAllDayEventElement, "novo-calendar-all-day-event", never, { "event": "event"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; }, never, never>;
}
