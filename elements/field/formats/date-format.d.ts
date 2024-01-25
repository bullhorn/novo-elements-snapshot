import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { NovoLabelService } from 'novo-elements/services';
import { DATE_FORMATS } from './base-format';
import * as i0 from "@angular/core";
export declare const DATEFORMAT_VALUE_ACCESSOR: {
    provide: import("@angular/core").InjectionToken<readonly import("@angular/forms").ControlValueAccessor[]>;
    useExisting: import("@angular/core").Type<any>;
    multi: boolean;
};
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateFormatDirective, [null, null, null, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateFormatDirective, "input[dateFormat]", never, { "dateFormat": "dateFormat"; }, {}, never, never, false>;
}
