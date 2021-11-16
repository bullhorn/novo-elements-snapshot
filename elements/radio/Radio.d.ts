import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare class NovoRadioGroup {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoRadioGroup, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoRadioGroup, "novo-radio-group", never, {}, {}, never, ["*"]>;
}
export declare class NovoRadioElement implements ControlValueAccessor {
    private ref;
    name: string;
    value: any;
    checked: boolean;
    vertical: boolean;
    label: string;
    button: boolean;
    theme: string;
    icon: string;
    disabled: boolean;
    change: EventEmitter<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    select(event: MouseEvent): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoRadioElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoRadioElement, "novo-radio", never, { "button": "button"; "theme": "theme"; "disabled": "disabled"; "checked": "checked"; "name": "name"; "value": "value"; "vertical": "vertical"; "label": "label"; "icon": "icon"; }, { "change": "change"; }, never, ["*"]>;
}

//# sourceMappingURL=Radio.d.ts.map