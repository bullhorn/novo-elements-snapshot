import { EventEmitter, TemplateRef } from '@angular/core';
import { DayViewEvent } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoCalendarDayEventElement {
    dayEvent: DayViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDef<NovoCalendarDayEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCalendarDayEventElement, "novo-calendar-day-event", never, { "dayEvent": "dayEvent"; "tooltipPosition": "tooltipPosition"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; }, never, never>;
}
