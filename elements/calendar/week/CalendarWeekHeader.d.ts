import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from '../../../utils/calendar-utils/CalendarUtils';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoCalendarWeekHeaderElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoCalendarWeekHeaderElement, "novo-calendar-week-header", never, { "days": "days"; "locale": "locale"; "customTemplate": "customTemplate"; }, { "dayClicked": "dayClicked"; "eventDropped": "eventDropped"; }, never, never>;
}

//# sourceMappingURL=CalendarWeekHeader.d.ts.map