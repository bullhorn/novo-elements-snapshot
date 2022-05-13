import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, MonthViewDay } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoAgendaMonthDayElement {
    day: MonthViewDay;
    locale: string;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<{
        event: CalendarEvent;
    }>;
    get accepted(): Array<CalendarEvent>;
    get rejected(): Array<CalendarEvent>;
    get maybes(): Array<CalendarEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaMonthDayElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaMonthDayElement, "novo-agenda-month-day", never, { "day": "day"; "locale": "locale"; "tooltipPosition": "tooltipPosition"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; }, never, never>;
}
