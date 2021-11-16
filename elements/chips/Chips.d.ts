import { EventEmitter, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import * as ɵngcc0 from '@angular/core';
export declare class NovoChipElement {
    set type(type: string);
    disabled: boolean;
    select: EventEmitter<any>;
    remove: EventEmitter<any>;
    deselect: EventEmitter<any>;
    entity: string;
    _type: string;
    onRemove(e: any): boolean;
    onSelect(e: any): boolean;
    onDeselect(e: any): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoChipElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoChipElement, "chip,novo-chip", never, { "disabled": "disabled"; "type": "type"; }, { "select": "select"; "remove": "remove"; "deselect": "deselect"; }, never, ["*"]>;
}
export declare class NovoChipsElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    private componentUtils;
    labels: NovoLabelService;
    closeOnSelect: boolean;
    placeholder: string;
    source: any;
    maxlength: any;
    type: any;
    set disablePickerInput(v: boolean);
    get disablePickerInput(): boolean;
    private _disablePickerInput;
    changed: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    preview: ViewContainerRef;
    items: Array<any>;
    selected: any;
    config: any;
    model: any;
    itemToAdd: any;
    popup: any;
    _value: any;
    _items: ReplaySubject<unknown>;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, componentUtils: ComponentUtils, labels: NovoLabelService);
    ngOnInit(): void;
    get value(): any;
    set value(selected: any);
    clearValue(): void;
    setItems(): void;
    getLabelFromOptions(value: any): {
        value: any;
        label: any;
    };
    deselectAll(event?: any): void;
    select(event?: any, item?: any): void;
    deselect(event?: any, item?: any): void;
    onTyping(event?: any): void;
    onFocus(event?: any): void;
    add(event: any): void;
    remove(event: any, item: any): void;
    onKeyDown(event: any): void;
    onTouched(e: any): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    /**
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview(): void;
    /**
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoChipsElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoChipsElement, "chips,novo-chips", never, { "closeOnSelect": "closeOnSelect"; "placeholder": "placeholder"; "disablePickerInput": "disablePickerInput"; "value": "value"; "source": "source"; "maxlength": "maxlength"; "type": "type"; }, { "changed": "changed"; "focus": "focus"; "blur": "blur"; "typing": "typing"; }, never, never>;
}

//# sourceMappingURL=Chips.d.ts.map