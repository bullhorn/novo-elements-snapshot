import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { RadioGroup } from './tokens';
import * as i0 from "@angular/core";
export declare class NovoRadioElement implements ControlValueAccessor, OnInit {
    radioGroup: RadioGroup;
    private ref;
    private _uniqueId;
    private _value;
    _checked: boolean;
    id: string;
    name: string;
    tabindex: number;
    vertical: boolean;
    label: string;
    button: boolean;
    theme: string;
    size: string;
    icon: string;
    color: string;
    disabled: boolean;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    get checked(): boolean;
    set checked(value: boolean);
    get value(): boolean;
    set value(value: boolean);
    constructor(radioGroup: RadioGroup, ref: ChangeDetectorRef);
    ngOnInit(): void;
    _onInputChange(event: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRadioElement, [{ optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRadioElement, "novo-radio", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "label": { "alias": "label"; "required": false; }; "button": { "alias": "button"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "size": { "alias": "size"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "color": { "alias": "color"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "change": "change"; "blur": "blur"; "focus": "focus"; }, never, ["*"], false, never>;
}
