import { SimpleChanges, EventEmitter, ElementRef, AfterContentInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare class NovoTilesElement implements ControlValueAccessor, AfterContentInit, OnChanges {
    private element;
    private ref;
    name: string;
    options: any;
    required: boolean;
    disabled: boolean;
    onChange: EventEmitter<any>;
    onSelectedOptionClick: EventEmitter<any>;
    onDisabledOptionClick: EventEmitter<any>;
    _options: Array<any>;
    activeTile: any;
    focused: boolean;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    setFocus(focus: boolean): void;
    ngAfterContentInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    setupOptions(): void;
    select(event: any, item: any): void;
    setTile(item: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoTilesElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoTilesElement, "novo-tiles", never, { "name": "name"; "disabled": "controlDisabled"; "options": "options"; "required": "required"; }, { "onChange": "onChange"; "onSelectedOptionClick": "onSelectedOptionClick"; "onDisabledOptionClick": "onDisabledOptionClick"; }, never, never>;
}

//# sourceMappingURL=Tiles.d.ts.map