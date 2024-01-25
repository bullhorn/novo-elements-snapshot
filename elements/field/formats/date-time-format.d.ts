import { ElementRef, EventEmitter, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { IMaskDirective, IMaskFactory } from 'angular-imask';
import { NovoLabelService } from 'novo-elements/services';
import { DATE_FORMATS, NovoInputFormat } from './base-format';
import * as i0 from "@angular/core";
export declare const DATETIMEFORMAT_VALUE_ACCESSOR: {
    provide: import("@angular/core").InjectionToken<readonly import("@angular/forms").ControlValueAccessor[]>;
    useExisting: import("@angular/core").Type<any>;
    multi: boolean;
};
export declare class NovoDateTimeFormatDirective extends IMaskDirective<any> implements NovoInputFormat, OnChanges {
    private _element;
    private labels;
    valueChange: EventEmitter<any>;
    military: boolean;
    dateTimeFormat: DATE_FORMATS;
    constructor(_element: ElementRef, _renderer: Renderer2, _factory: IMaskFactory, _compositionMode: boolean, labels: NovoLabelService);
    initFormatOptions(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _checkInput(event: InputEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    normalize(value: string): string;
    formatAsIso(date: Date): string;
    convertTime12to24(time12h: string): string;
    convertTime24to12(time24h: string): string;
    formatValue(value: any): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    hourOneFormatRequired(hourInput: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateTimeFormatDirective, [null, null, null, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateTimeFormatDirective, "input[dateTimeFormat]", never, { "military": "military"; "dateTimeFormat": "dateTimeFormat"; }, {}, never, never, false>;
}
