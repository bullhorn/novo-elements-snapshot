import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { NovoLabelService } from 'novo-elements/services';
import { DATE_FORMATS } from './base-format';
import * as i0 from "@angular/core";
export declare const DATERANGEFORMAT_VALUE_ACCESSOR: {
    provide: import("@angular/core").InjectionToken<readonly import("@angular/forms").ControlValueAccessor[]>;
    useExisting: import("@angular/core").Type<any>;
    multi: boolean;
};
type DateRange = {
    startDate: Date;
    endDate: Date;
};
export declare class NovoDateRangeFormatDirective extends IMaskDirective<any> {
    private _element;
    private labels;
    valueChange: EventEmitter<any>;
    dateRangeFormat: DATE_FORMATS;
    constructor(_element: ElementRef, _renderer: Renderer2, _factory: IMaskFactory, _compositionMode: boolean, labels: NovoLabelService);
    normalize(value: string | Date): string;
    formatAsIso(value: DateRange): string;
    formatValue(value: DateRange): string;
    formatDate(source: Date | string): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    extractDatesFromInput(value: any): {
        startDate: Date;
        endDate: Date;
    };
    validate(dateStr: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateRangeFormatDirective, [null, null, null, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateRangeFormatDirective, "input[dateRangeFormat]", never, { "dateRangeFormat": "dateRangeFormat"; }, {}, never, never, false, never>;
}
export {};
