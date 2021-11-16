import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare class NovoCheckListElement implements ControlValueAccessor, OnInit {
    name: string;
    options: Array<any>;
    disabled: boolean;
    onSelect: EventEmitter<any>;
    _options: Array<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    ngOnInit(): void;
    select(event: any, item: any): void;
    setupOptions(): void;
    setModel(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoCheckListElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoCheckListElement, "novo-check-list", never, { "options": "options"; "disabled": "disabled"; "name": "name"; }, { "onSelect": "onSelect"; }, never, never>;
}

//# sourceMappingURL=CheckList.d.ts.map