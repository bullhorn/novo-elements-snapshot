import { EventEmitter, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
import * as ɵngcc0 from '@angular/core';
export declare class NovoCKEditorElement implements OnDestroy, AfterViewInit, ControlValueAccessor {
    private zone;
    config: any;
    debounce: any;
    name: any;
    minimal: any;
    startupFocus: boolean;
    fileBrowserImageUploadUrl: string;
    disabled: boolean;
    change: EventEmitter<any>;
    ready: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    paste: EventEmitter<any>;
    loaded: EventEmitter<any>;
    host: any;
    _value: string;
    instance: any;
    debounceTimeout: any;
    constructor(zone: NgZone);
    get value(): string;
    set value(v: string);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    updateValue(value: any): void;
    private ckeditorInit;
    getBaseConfig(): {
        [key: string]: any;
    };
    writeValue(value: any): void;
    onChange(value?: any): void;
    onTouched(event?: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(disabled: boolean): void;
    insertText(text: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoCKEditorElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoCKEditorElement, "novo-editor", never, { "startupFocus": "startupFocus"; "fileBrowserImageUploadUrl": "fileBrowserImageUploadUrl"; "disabled": "disabled"; "value": "value"; "config": "config"; "debounce": "debounce"; "name": "name"; "minimal": "minimal"; }, { "change": "change"; "ready": "ready"; "blur": "blur"; "focus": "focus"; "paste": "paste"; "loaded": "loaded"; }, never, never>;
}

//# sourceMappingURL=CKEditor.d.ts.map