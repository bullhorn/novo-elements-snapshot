import { ElementRef, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ComponentUtils, NovoLabelService } from 'novo-elements/services';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NovoChipsElement implements OnInit, ControlValueAccessor {
    element: ElementRef;
    private componentUtils;
    labels: NovoLabelService;
    closeOnSelect: boolean;
    placeholder: string;
    source: any;
    maxlength: any;
    type: any;
    allowCustomValues: boolean;
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
    _items: ReplaySubject<any>;
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
    getAvatarType(item: any): any;
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
    private _finalizeItemValue;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    /**
     * @name showPreview
     *
     * @description This method creates an instance of the preview (called popup) and adds all the bindings to that
     * instance. Will reuse the popup or create a new one if it does not already exist. Will only work if there is
     * a previewTemplate given in the config.
     */
    showPreview(): void;
    /**
     * @name hidePreview
     *
     * @description - This method deletes the preview popup from the DOM.
     */
    hidePreview(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoChipsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoChipsElement, "chips,novo-chips", never, { "closeOnSelect": "closeOnSelect"; "placeholder": "placeholder"; "source": "source"; "maxlength": "maxlength"; "type": "type"; "allowCustomValues": "allowCustomValues"; "disablePickerInput": "disablePickerInput"; "value": "value"; }, { "changed": "changed"; "focus": "focus"; "blur": "blur"; "typing": "typing"; }, never, never>;
}
