import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekDay } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoCalendarMonthHeaderElement {
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
    static ɵfac: i0.ɵɵFactoryDef<NovoCalendarMonthHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCalendarMonthHeaderElement, "novo-calendar-month-header", never, { "viewDate": "viewDate"; "days": "days"; "locale": "locale"; "customTemplate": "customTemplate"; }, { "viewDateChange": "viewDateChange"; }, never, never>;
}
