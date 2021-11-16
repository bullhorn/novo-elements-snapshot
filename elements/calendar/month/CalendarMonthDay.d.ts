import { EventEmitter, TemplateRef } from '@angular/core';
import { MonthViewDay, CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoCalendarMonthDayElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoCalendarMonthDayElement, "novo-calendar-month-day", never, { "day": "day"; "locale": "locale"; "tooltipPosition": "tooltipPosition"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; }, never, never>;
}

//# sourceMappingURL=CalendarMonthDay.d.ts.map