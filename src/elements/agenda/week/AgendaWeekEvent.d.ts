import { EventEmitter, TemplateRef } from '@angular/core';
import { WeekViewEvent } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoAgendaWeekEventElement {
    weekEvent: WeekViewEvent;
    tooltipPosition: string;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaWeekEventElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaWeekEventElement, "novo-agenda-week-event", never, { "weekEvent": "weekEvent"; "tooltipPosition": "tooltipPosition"; "customTemplate": "customTemplate"; }, { "eventClicked": "eventClicked"; }, never, never>;
}
