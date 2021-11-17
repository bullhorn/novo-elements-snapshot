import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, MonthViewDay } from '../../../utils/calendar-utils/CalendarUtils';
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
}
