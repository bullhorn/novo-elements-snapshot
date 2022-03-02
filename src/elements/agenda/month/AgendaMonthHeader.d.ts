import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekDay } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoAgendaMonthHeaderElement {
    viewDate: Date;
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    /**
     * Called when the view date is changed
     */
    viewDateChange: EventEmitter<Date>;
    prevMonth(event: Event): void;
    nextMonth(event: Event): void;
}
