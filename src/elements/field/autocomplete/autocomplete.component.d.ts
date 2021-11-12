import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChanges } from '@angular/core';
import { CanDisable, CanDisableCtor, HasOverlayCtor, NovoOptgroup, NovoOption } from '../../common';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement } from '../field';
import { NovoFieldControl } from '../field-control';
/** Event object that is emitted when an autocomplete option is selected. */
export declare class NovoOptionSelectedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: NovoAutocompleteElement;
    /** Option that was selected. */
    option: NovoOption;
    constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    source: NovoAutocompleteElement, 
    /** Option that was selected. */
    option: NovoOption);
}
declare class NovoAutocompleteBase {
    constructor();
}
declare const NovoAutocompleteMixins: HasOverlayCtor & CanDisableCtor & typeof NovoAutocompleteBase;
export declare class NovoAutocompleteElement extends NovoAutocompleteMixins implements CanDisable, AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _elementRef;
    private cdr;
    private _formField;
    private _stateChanges;
    private _activeOptionChanges;
    private _selectedOptionChanges;
    private _keyDownChanges;
    /** Manages active item in option list based on key events. */
    private _keyManager;
    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private _previousValue;
    optionGroups: QueryList<NovoOptgroup>;
    options: QueryList<NovoOption>;
    /** Event that is emitted whenever an option from the list is selected. */
    readonly optionSelected: EventEmitter<NovoOptionSelectedEvent>;
    /** Emits whenever an option is activated using the keyboard. */
    readonly optionActivated: EventEmitter<NovoOptionSelectedEvent>;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Key to use to trigger autocomplete. used for textarea. */
    triggerOn: (control: NovoFieldControl<any>) => boolean;
    /** Function that maps an option's control value to its display value in the trigger. */
    displayWith: ((value: any) => string) | null;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Whether the user should be allowed to select multiple options. */
    get multiple(): boolean;
    set multiple(value: boolean);
    private _multiple;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    element: ElementRef;
    constructor(_elementRef: ElementRef, cdr: ChangeDetectorRef, defaultTabIndex: string, _formField: NovoFieldElement);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    checkPanel(): void;
    private _setTriggerValue;
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption;
    /** Emits the `select` event. */
    private _emitSelectEvent;
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private _setValueAndClose;
    private _watchSelectionEvents;
    private _watchStateChanges;
    /** The currently active option, coerced to MatOption type. */
    get activeOption(): NovoOption | null;
    _handleKeydown(event: KeyboardEvent): void;
    static ngAcceptInputType_disabled: BooleanInput;
}
export {};
