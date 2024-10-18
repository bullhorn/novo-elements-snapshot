import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ProgressAppearance } from './ProgressConstants';
import * as i0 from "@angular/core";
export declare class NovoProgressBarElement implements ControlValueAccessor, OnInit {
    private ref;
    progress: any;
    private _uniqueId;
    appearance: ProgressAppearance;
    id: string;
    name: string;
    tabindex: number;
    label: string;
    theme: string;
    color: string;
    indeterminate: boolean;
    radius: number;
    circumference: number;
    dashoffset: number;
    progressAppearance: typeof ProgressAppearance;
    striped: boolean;
    animated: boolean;
    flash: boolean;
    get width(): string;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _percent;
    private _value;
    private _disabled;
    get value(): number;
    set value(value: number);
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(ref: ChangeDetectorRef, progress: any);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoProgressBarElement, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoProgressBarElement, "novo-progress-bar", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "label": { "alias": "label"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "striped": { "alias": "striped"; "required": false; }; "animated": { "alias": "animated"; "required": false; }; "flash": { "alias": "flash"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "change": "change"; "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}
