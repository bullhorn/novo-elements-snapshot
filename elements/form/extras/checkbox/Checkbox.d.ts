import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NovoCheckboxElement implements ControlValueAccessor, OnInit {
    private ref;
    name: string;
    label: string;
    indeterminate: boolean;
    disabled: boolean;
    layoutOptions: {
        iconStyle?: string;
    };
    onSelect: EventEmitter<any>;
    boxIcon: boolean;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    ngOnInit(): void;
    select(event: Event): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoCheckboxElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoCheckboxElement, "novo-checkbox", never, { "name": "name"; "label": "label"; "indeterminate": "indeterminate"; "disabled": "disabled"; "layoutOptions": "layoutOptions"; }, { "onSelect": "onSelect"; }, never, ["*"]>;
}
