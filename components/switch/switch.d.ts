import { ChangeDetectorRef, EventEmitter, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NovoSwitchElement implements ControlValueAccessor {
    private ref;
    private ngZone;
    icons: [string, string];
    disabled: boolean;
    onChange: EventEmitter<any>;
    private _value;
    get value(): boolean;
    set value(value: boolean);
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef, ngZone: NgZone);
    onKeydown(event: KeyboardEvent): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSwitchElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSwitchElement, "novo-switch", never, { "icons": "icons"; "disabled": "disabled"; }, { "onChange": "onChange"; }, never, ["[novoPrefix]", "*"]>;
}
