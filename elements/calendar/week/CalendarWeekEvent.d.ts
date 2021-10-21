import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewEvent } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoCalendarWeekEventElement {
    weekEvent: WeekViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDef<NovoCalendarWeekEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCalendarWeekEventElement, "novo-calendar-week-event", never, { "weekEvent": "weekEvent"; "tooltipPosition": "tooltipPosition"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; }, never, never>;
}
