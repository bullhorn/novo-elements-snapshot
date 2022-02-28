import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { NovoButtonElement } from '../button';
import { CanDisableCtor, HasOverlayCtor, HasTabIndexCtor, NovoOptgroup, NovoOption } from '../common';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';
export declare class NovoDropDownTrigger {
    element: ElementRef;
    constructor(element: ElementRef);
}
declare class NovoDropdownBase {
    constructor();
}
declare const NovoDropdowMixins: HasOverlayCtor & CanDisableCtor & HasTabIndexCtor & typeof NovoDropdownBase;
export declare class NovoDropdownElement extends NovoDropdowMixins implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    element: ElementRef;
    private ref;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: 'default' | 'right' | 'above-below' | 'right-above-below' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    scrollStrategy: 'reposition' | 'block' | 'close';
    /**
     * Keep dropdown open after an item is selected
     */
    keepOpen: boolean;
    height: number;
    width: number;
    appendToBody: boolean;
    toggled: EventEmitter<boolean>;
    overlay: NovoOverlayTemplateComponent;
    _button: NovoButtonElement;
    _trigger: NovoDropDownTrigger;
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
    get button(): NovoButtonElement | NovoDropDownTrigger;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(options?: FocusOptions): void;
    set items(items: QueryList<NovoItemElement>);
    /** Handles all keydown events on the select. */
    _handleKeydown(event: KeyboardEvent): void;
    /** Handles keyboard events while the select is closed. */
    private _handleClosedKeydown;
    /** Handles keyboard events when the selected is open. */
    private _handleOpenKeydown;
    private _watchPanelEvents;
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
}
export declare class NovoDropdownListElement implements AfterContentInit {
    private dropdown;
    items: QueryList<NovoItemElement>;
    constructor(dropdown: NovoDropdownElement);
    ngAfterContentInit(): void;
}
export declare class NovoDropDownItemHeaderElement {
    constructor();
}
export {};
