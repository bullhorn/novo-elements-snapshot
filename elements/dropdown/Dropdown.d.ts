import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { NovoButtonElement } from '../button';
import { CanDisableCtor, HasOverlayCtor, HasTabIndexCtor, NovoOptgroup, NovoOption } from '../common';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
import * as i0 from "@angular/core";
declare class NovoDropdownBase {
    constructor();
}
declare const NovoDropdowMixins: HasOverlayCtor & CanDisableCtor & HasTabIndexCtor & typeof NovoDropdownBase;
export declare class NovoDropdownElement extends NovoDropdowMixins implements OnInit, AfterContentInit, OnDestroy {
    element: ElementRef;
    private ref;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: 'default' | 'right' | 'above-below' | 'right-above-below' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    scrollStrategy: 'reposition' | 'block' | 'close';
    height: number;
    width: number;
    appendToBody: boolean;
    toggled: EventEmitter<boolean>;
    overlay: NovoOverlayTemplateComponent;
    button: NovoButtonElement;
    optionGroups: QueryList<NovoOptgroup>;
    options: QueryList<NovoOption>;
    panel: ElementRef;
    private clickHandler;
    private closeHandler;
    private _selectedOptionChanges;
    /** The Subject to complete all subscriptions when destroyed. */
    private _onDestroy;
    /** The FocusKeyManager which handles focus. */
    private _keyManager;
    /** Whether the user should be allowed to select multiple options. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focus(options?: FocusOptions): void;
    set items(items: QueryList<NovoItemElement>);
    /** Handles all keydown events on the select. */
    _handleKeydown(event: KeyboardEvent): void;
    /** Handles keyboard events while the select is closed. */
    private _handleClosedKeydown;
    /** Handles keyboard events when the selected is open. */
    private _handleOpenKeydown;
    private _watchSelectionEvents;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption;
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager;
    /** Scrolls the active option into view. */
    protected _scrollOptionIntoView(index: number): void;
    /** Calculates the height of the select's options. */
    private _getItemHeight;
    static ɵfac: i0.ɵɵFactoryDef<NovoDropdownElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoDropdownElement, "novo-dropdown", never, { "parentScrollSelector": "parentScrollSelector"; "parentScrollAction": "parentScrollAction"; "containerClass": "containerClass"; "side": "side"; "scrollStrategy": "scrollStrategy"; "height": "height"; "width": "width"; "appendToBody": "appendToBody"; "multiple": "multiple"; }, { "toggled": "toggled"; }, ["button", "optionGroups", "options"], ["button,novo-button", "*"]>;
}
export declare class NovoItemElement {
    private dropdown;
    element: ElementRef;
    disabled: boolean;
    keepOpen: boolean;
    action: EventEmitter<any>;
    active: boolean;
    constructor(dropdown: NovoDropdownElement, element: ElementRef);
    onClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoItemElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoItemElement, "item", never, { "disabled": "disabled"; "keepOpen": "keepOpen"; }, { "action": "action"; }, never, ["*"]>;
}
export declare class NovoDropdownListElement implements AfterContentInit {
    private dropdown;
    items: QueryList<NovoItemElement>;
    constructor(dropdown: NovoDropdownElement);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoDropdownListElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoDropdownListElement, "list", never, {}, {}, ["items"], ["*"]>;
}
export declare class NovoDropDownItemHeaderElement {
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<NovoDropDownItemHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoDropDownItemHeaderElement, "dropdown-item-header", never, {}, {}, never, ["*"]>;
}
export {};
