import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
export declare class NovoAgendaAllDayEventElement {
    event: CalendarEvent;
    customTemplate: TemplateRef<any>;
    eventClicked: EventEmitter<any>;
}
