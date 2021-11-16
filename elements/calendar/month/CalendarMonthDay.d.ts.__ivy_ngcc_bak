import { EventEmitter, TemplateRef } from '@angular/core';
import { MonthViewDay, CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoCalendarMonthDayElement {
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
