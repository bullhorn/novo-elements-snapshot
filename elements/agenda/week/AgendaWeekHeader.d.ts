import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoAgendaWeekHeaderElement {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoAgendaWeekHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoAgendaWeekHeaderElement, "novo-agenda-week-header", never, { "days": "days"; "locale": "locale"; "customTemplate": "customTemplate"; }, { "dayClicked": "dayClicked"; "eventDropped": "eventDropped"; }, never, never>;
}