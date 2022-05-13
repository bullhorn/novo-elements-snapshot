import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NovoButtonElement } from '../../button';
import { NovoOverlayTemplateComponent } from '../../common/overlay';
import { NovoFieldElement } from '../field';
import * as i0 from "@angular/core";
export declare class NovoPickerToggleElement<T = any> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
    private _elementRef;
    private cdr;
    private _formField;
    private _stateChanges;
    /** Datepicker instance that the button will toggle. */
    picker: T;
    icon: string;
    /** Tabindex for the toggle. */
    tabIndex: number | null;
    /** Screenreader label for the button. */
    ariaLabel: string;
    /** Whether the toggle button is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    /** Underlying button element. */
    _button: NovoButtonElement;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    element: ElementRef;
    constructor(_elementRef: ElementRef, cdr: ChangeDetectorRef, defaultTabIndex: string, _formField: NovoFieldElement);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    togglePanel(event?: Event): void;
    /** BEGIN: Convenient Panel Methods. */
    openPanel(event?: Event): void;
    closePanel(event?: Event): void;
    get panelOpen(): boolean;
    private _watchStateChanges;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerToggleElement<any>, [null, null, { attribute: "tabindex"; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPickerToggleElement<any>, "novo-picker-toggle", ["novoPickerToggle"], { "picker": "for"; "icon": "icon"; "tabIndex": "tabIndex"; "ariaLabel": "aria-label"; "disabled": "disabled"; }, {}, never, ["*"]>;
}
