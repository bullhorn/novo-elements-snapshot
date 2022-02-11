import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class NovoSwitchElement implements ControlValueAccessor {
    private ref;
    theme: string;
    icons: [string, string];
    disabled: boolean;
    onChange: EventEmitter<any>;
    model: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    onKeydown(event: KeyboardEvent): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
}
