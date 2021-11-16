import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
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
    onKeydown(event: any): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoSwitchElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoSwitchElement, "novo-switch", never, { "disabled": "disabled"; "theme": "theme"; }, { "onChange": "onChange"; }, never, ["*"]>;
}

//# sourceMappingURL=Switch.d.ts.map