import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoCalendarWeekHeaderElement {
    days: WeekDay[];
    locale: string;
    customTemplate: TemplateRef<any>;
    dayClicked: EventEmitter<{
        date: Date;
    }>;
    eventDropped: EventEmitter<{
        event: CalendarEvent;
        newStart: Date;
    }>;
    static ɵfac: i0.ɵɵFactoryDef<NovoCalendarWeekHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCalendarWeekHeaderElement, "novo-calendar-week-header", never, { "days": "days"; "locale": "locale"; "customTemplate": "customTemplate"; }, { "dayClicked": "dayClicked"; "eventDropped": "eventDropped"; }, never, never>;
}
