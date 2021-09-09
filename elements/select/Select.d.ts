import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
export declare class NovoSelectElement implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    element: ElementRef;
    labels: NovoLabelService;
    ref: ChangeDetectorRef;
    private focusMonitor;
    private ngZone;
    name: string;
    options: Array<any>;
    placeholder: string;
    readonly: boolean;
    headerConfig: any;
    onSelect: EventEmitter<any>;
    selectedIndex: number;
    empty: boolean;
    header: any;
    createdItem: any;
    selected: any;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    filterTerm: string;
    filterTermTimeout: any;
    filteredOptions: any;
    disabled: boolean;
    /** Element for the panel containing the autocomplete options. */
    overlay: NovoOverlayTemplateComponent;
    dropdown: ElementRef;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef, focusMonitor: FocusMonitor, ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    ngOnDestroy(): void;
    /** BEGIN: Convienient Panel Methods. */
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
    get panelOpen(): boolean;
    /** END: Convenient Panel Methods. */
    /**
     * If the item is not disabled, this method closes the panel, and if a value is specified,
     * also sets the associated control to that value. It will also mark the control as dirty
     * if this interaction stemmed from the user.
     */
    setValueAndClose(event: any | null): void;
    select(option: any, i: any, fireEvents?: boolean): void;
    clear(): void;
    onKeyDown(event: KeyboardEvent): void;
    scrollToSelected(): void;
    scrollToIndex(index: number): void;
    toggleHeader(event: any, forceValue?: boolean): void;
    highlight(match: any, query: any): any;
    escapeRegexp(queryToEscape: any): any;
    saveHeader(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
}
