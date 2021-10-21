import { EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../utils/calendar-utils/CalendarUtils';
import * as i0 from "@angular/core";
export declare class NovoEventTypeLegendElement {
    events: CalendarEvent[];
    customTemplate: TemplateRef<any>;
    eventTypeClicked: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDef<NovoEventTypeLegendElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoEventTypeLegendElement, "novo-event-type-legend", never, { "events": "events"; "customTemplate": "customTemplate"; }, { "eventTypeClicked": "eventTypeClicked"; }, never, never>;
}
