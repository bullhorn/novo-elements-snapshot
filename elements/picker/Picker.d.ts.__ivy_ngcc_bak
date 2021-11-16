import { ChangeDetectorRef, ComponentRef, ElementRef, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { NovoControlConfig } from '../form/FormControls';
/**
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
export declare class NovoPickerElement implements OnInit {
    element: ElementRef;
    private componentUtils;
    private ref;
    results: ViewContainerRef;
    config: NovoControlConfig['config'];
    placeholder: string;
    clearValueOnSelect: boolean;
    closeOnSelect: boolean;
    selected: Array<any>;
    appendToBody: boolean;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: string;
    autoSelectFirstOption: boolean;
    overrideElement: ElementRef;
    set disablePickerInput(v: boolean);
    get disablePickerInput(): boolean;
    private _disablePickerInput;
    changed: EventEmitter<any>;
    select: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    container: NovoOverlayTemplateComponent;
    private input;
    term: string;
    resultsComponent: any;
    popup: ComponentRef<any>;
    _value: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, componentUtils: ComponentUtils, ref: ChangeDetectorRef);
    ngOnInit(): void;
    private onDebouncedKeyup;
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    private show;
    onKeyDown(event: KeyboardEvent): void;
    clearValue(wipeTerm: any): void;
    /**
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event: any): void;
    showResults(term?: any): void;
    hideResults(err?: any): void;
    onOverlayClosed(): void;
    get value(): any;
    set value(selected: any);
    checkTerm(event: any): void;
    onTouched(event?: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
}
