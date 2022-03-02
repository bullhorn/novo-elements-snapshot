import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { NovoLabelService } from '../../../services/novo-label-service';
export declare const DATEFORMAT_VALUE_ACCESSOR: {
    provide: import("@angular/core").InjectionToken<import("@angular/forms").ControlValueAccessor>;
    useExisting: import("@angular/core").Type<any>;
    multi: boolean;
};
export declare enum DATE_FORMATS {
    DATE = "date",
    ISO8601 = "iso8601",
    STRING = "string"
}
export declare class NovoDateFormatDirective extends IMaskDirective<any> {
    private _element;
    private labels;
    valueChange: EventEmitter<any>;
    dateFormat: DATE_FORMATS;
    constructor(_element: ElementRef, _renderer: Renderer2, _factory: IMaskFactory, _compositionMode: boolean, labels: NovoLabelService);
    normalize(value: string): string;
    formatAsIso(date: Date): string;
    formatValue(value: any): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
}
