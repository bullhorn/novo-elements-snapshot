import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NovoSwitchElement implements ControlValueAccessor {
    private ref;
    theme: string;
    onChange: EventEmitter<any>;
    _disabled: boolean;
    model: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(ref: ChangeDetectorRef);
    onKeydown(event: KeyboardEvent): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoSwitchElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoSwitchElement, "novo-switch", never, { "theme": "theme"; "disabled": "disabled"; }, { "onChange": "onChange"; }, never, ["*"]>;
}
