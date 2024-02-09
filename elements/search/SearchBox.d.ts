import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInputAccept } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoSearchBoxElement implements ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    private _changeDetectorRef;
    private _zone;
    name: string;
    icon: string;
    position: NovoOverlayTemplateComponent['position'];
    placeholder: string;
    alwaysOpen: boolean;
    static readonly ngAcceptInputType_alwaysOpen: BooleanInputAccept;
    theme: string;
    color: string;
    closeOnSelect: boolean;
    static readonly ngAcceptInputType_closeOnSelect: BooleanInputAccept;
    displayField: string;
    displayValue: string;
    hint: string;
    keepOpen: boolean;
    static readonly ngAcceptInputType_keepOpen: BooleanInputAccept;
    hasBackdrop: boolean;
    static readonly ngAcceptInputType_hasBackdrop: BooleanInputAccept;
    allowPropagation: boolean;
    static readonly ngAcceptInputType_allowPropagation: BooleanInputAccept;
    searchChanged: EventEmitter<string>;
    applySearch: EventEmitter<KeyboardEvent>;
    focused: boolean;
    static readonly ngAcceptInputType_focused: BooleanInputAccept;
    value: any;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when autocomplete has been touched */
    _onTouched: () => void;
    /** Element for the panel containing the autocomplete options. */
    overlay: any;
    input: any;
    private debounceSearchChange;
    constructor(element: ElementRef, labels: NovoLabelService, _changeDetectorRef: ChangeDetectorRef, _zone: NgZone);
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event?: any, forceClose?: boolean): void;
    onFocus(): void;
    onBlur(): void;
    onSelect(): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    get active(): boolean;
    /** END: Convenient Panel Methods. */
    _handleKeydown(event: KeyboardEvent): void;
    _handleInput(event: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private _setValue;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    setValueAndClose(event: any | null): void;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue(skip: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSearchBoxElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSearchBoxElement, "novo-search", never, { "name": "name"; "icon": "icon"; "position": "position"; "placeholder": "placeholder"; "alwaysOpen": "alwaysOpen"; "theme": "theme"; "color": "color"; "closeOnSelect": "closeOnSelect"; "displayField": "displayField"; "displayValue": "displayValue"; "hint": "hint"; "keepOpen": "keepOpen"; "hasBackdrop": "hasBackdrop"; "allowPropagation": "allowPropagation"; }, { "searchChanged": "searchChanged"; "applySearch": "applySearch"; }, never, ["*"]>;
}
