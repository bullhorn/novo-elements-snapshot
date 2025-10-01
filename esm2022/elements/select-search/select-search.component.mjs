var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, ViewChild, } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BooleanInput, isAlphaNumeric } from 'novo-elements/utils';
import { NovoOption, _countGroupLabelsBeforeOption } from 'novo-elements/elements/common';
import { NovoFieldElement } from 'novo-elements/elements/field';
import { NovoSelectElement } from 'novo-elements/elements/select';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "novo-elements/elements/checkbox";
import * as i6 from "novo-elements/elements/button";
import * as i7 from "novo-elements/elements/common";
import * as i8 from "novo-elements/elements/icon";
import * as i9 from "novo-elements/elements/loading";
import * as i10 from "novo-elements/elements/tooltip";
import * as i11 from "novo-elements/elements/field";
import * as i12 from "novo-elements/elements/select";
/** The max height of the select's overlay panel. */
const SELECT_PANEL_MAX_HEIGHT = 256;
let autoIncrement = 1;
/* tslint:disable:member-ordering component-selector */
/**
 * Component providing an input field for searching NovoSelectElement options.
 *
 * Example usage:
 *
 * interface Bank {
 *  id: string;
 *  name: string;
 * }
 *
 * @Component({
 *   selector: 'my-app-data-selection',
 *   template: `
 *     <novo-form-field>
 *       <novo-select [formControl]="bankCtrl" placeholder="Bank">
 *         <novo-option>
 *           <ngx-novo-select-search [formControl]="bankFilterCtrl"></ngx-novo-select-search>
 *         </novo-option>
 *         <novo-option *ngFor="let bank of filteredBanks | async" [value]="bank.id">
 *           {{bank.name}}
 *         </novo-option>
 *       </novo-select>
 *     </novo-form-field>
 *   `
 * })
 * export class DataSelectionComponent implements OnInit, OnDestroy {
 *
 *   // control for the selected bank
 *   public bankCtrl: FormControl = new FormControl();
 *   // control for the NovoSelectElement filter keyword
 *   public bankFilterCtrl: FormControl = new FormControl();
 *
 *   // list of banks
 *   private banks: Bank[] = [{name: 'Bank A', id: 'A'}, {name: 'Bank B', id: 'B'}, {name: 'Bank C', id: 'C'}];
 *   // list of banks filtered by search keyword
 *   public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
 *
 *   // Subject that emits when the component has been destroyed.
 *   private _onDestroy = new Subject<void>();
 *
 *
 *   ngOnInit() {
 *     // load the initial bank list
 *     this.filteredBanks.next(this.banks.slice());
 *     // listen for search field value changes
 *     this.bankFilterCtrl.valueChanges
 *       .pipe(takeUntil(this._onDestroy))
 *       .subscribe(() => {
 *         this.filterBanks();
 *       });
 *   }
 *
 *   ngOnDestroy() {
 *     this._onDestroy.next();
 *     this._onDestroy.complete();
 *   }
 *
 *   private filterBanks() {
 *     if (!this.banks) {
 *       return;
 *     }
 *
 *     // get the search keyword
 *     let search = this.bankFilterCtrl.value;
 *     if (!search) {
 *       this.filteredBanks.next(this.banks.slice());
 *       return;
 *     } else {
 *       search = search.toLowerCase();
 *     }
 *
 *     // filter the banks
 *     this.filteredBanks.next(
 *       this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
 *     );
 *   }
 * }
 */
export class NovoSelectSearchComponent {
    get isInsideNovoOption() {
        return !!this.novoOption;
    }
    /** Current search value */
    get value() {
        return this._formControl.value;
    }
    /** Reference to the NovoSelectElement options */
    set _options(_options) {
        this._options$.next(_options);
    }
    get _options() {
        return this._options$.getValue();
    }
    constructor(novoSelect, changeDetectorRef, _viewportRuler, novoOption = null, liveAnnouncer, matFormField = null) {
        this.novoSelect = novoSelect;
        this.changeDetectorRef = changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this.novoOption = novoOption;
        this.liveAnnouncer = liveAnnouncer;
        this.matFormField = matFormField;
        this.name = 'select-search-' + autoIncrement++;
        /** Label of the search placeholder */
        this.placeholderLabel = 'Search';
        /** Type of the search input field */
        this.type = 'text';
        /** Label to be shown when no entries are found. Set to null if no message should be shown. */
        this.noEntriesFoundLabel = 'No Records Found';
        /**
         *  Text that is appended to the currently active item label announced by screen readers,
         *  informing the user of the current index, value and total options.
         *  eg: Bank R (Germany) 1 of 6
         */
        this.indexAndLengthScreenReaderText = ' of ';
        /**
         * Whether or not the search field should be cleared after the dropdown menu is closed.
         * Useful for server-side filtering.
         */
        this.clearSearchInput = true;
        /** Whether to show the search-in-progress indicator */
        this.searching = false;
        /** Disables initial focusing of the input field */
        this.disableInitialFocus = false;
        /** Enable clear input on escape pressed */
        this.enableClearOnEscapePressed = false;
        /** Allow user to uncheck a value while filtering. */
        this.allowDeselectDuringFilter = false;
        /**
         * Prevents home / end key being propagated to novo-select,
         * allowing to move the cursor within the search input instead of navigating the options
         */
        this.preventHomeEndKeyPropagation = false;
        /** Disables scrolling to active options when option list changes. Useful for server-side search */
        this.disableScrollToActiveOnOptionsChanged = false;
        /** Adds 508 screen reader support for search box */
        this.ariaLabel = 'dropdown search';
        /** Whether to show Select All Checkbox (for novo-select[multi=true]) */
        this.showToggleAllCheckbox = false;
        /** select all checkbox checked state */
        this.toggleAllCheckboxChecked = false;
        /** select all checkbox indeterminate state */
        this.toggleAllCheckboxIndeterminate = false;
        /** Display a message in a tooltip on the toggle-all checkbox */
        this.toggleAllCheckboxTooltipMessage = '';
        /** Define the position of the tooltip on the toggle-all checkbox. */
        this.toogleAllCheckboxTooltipPosition = 'below';
        /** Show/Hide the search clear button of the search input */
        this.hideClearSearchButton = false;
        /**
         * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
         * Defaults to false, so selected options are only restored while filtering is active.
         */
        this.alwaysRestoreSelectedOptionsMulti = false;
        /** Output emitter to send to parent component with the toggle all boolean */
        this.toggleAll = new EventEmitter();
        this.onTouched = (_) => { };
        this._formControl = new FormControl('');
        this._options$ = new BehaviorSubject(null);
        this._filterFinishedRerender = this._formControl.valueChanges.pipe(debounceTime(1));
        this.optionsList$ = this._options$.pipe(switchMap((_options) => _options
            ? combineLatest([_options.changes, this._filterFinishedRerender]).pipe(map(([options,]) => options.toArray().filter(option => !(option._getHostElement()?.classList.contains('add-option') || option._getHostElement().hidden))), startWith(_options.toArray()), distinctUntilChanged((optsA, optsB) => optsA.map(opt => opt.value).join(',') === optsB.map(opt => opt.value).join(',')))
            : of(null)));
        this.optionsLength$ = this.optionsList$.pipe(map((options) => (options ? options.length : 0)));
        /** whether to show the no entries found message */
        this._showNoEntriesFound$ = combineLatest([this._formControl.valueChanges, this.optionsLength$]).pipe(map(([value, optionsLength]) => this.noEntriesFoundLabel && value && optionsLength === this.getOptionsLengthOffset()));
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
        this.novoSelect.hideLegacyOptionsForSearch.set(true);
    }
    ngOnInit() {
        // set custom panel class
        // const panelClass = 'novo-select-search-panel';
        // if (this.novoSelect.panelClass) {
        //   if (Array.isArray(this.novoSelect.panelClass)) {
        //     (<string[]>this.novoSelect.panelClass).push(panelClass);
        //   } else if (typeof this.novoSelect.panelClass === 'string') {
        //     this.novoSelect.panelClass = [this.novoSelect.panelClass, panelClass];
        //   } else if (typeof this.novoSelect.panelClass === 'object') {
        //     this.novoSelect.panelClass[panelClass] = true;
        //   }
        // } else {
        //   this.novoSelect.panelClass = panelClass;
        // }
        // set custom novo-option class if the component was placed inside a novo-option
        if (this.novoOption) {
            this.novoOption.novoInert = true;
            this.novoOption._getHostElement().classList.add('contains-novo-select-search');
        }
        else {
            console.error('<novo-select-search> must be placed inside a <novo-option> element');
        }
        // when the select dropdown panel is opened or closed
        this.novoSelect.openedChange.pipe(delay(1), takeUntil(this._onDestroy)).subscribe((opened) => {
            if (opened) {
                this.updateInputWidth();
                // focus the search field when opening
                if (!this.disableInitialFocus) {
                    this._focus();
                }
            }
            else {
                // clear it when closing
                if (this.clearSearchInput) {
                    this._reset();
                }
            }
        });
        // set the first item active after the options changed
        this.novoSelect.openedChange
            .pipe(take(1))
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
            if (this.novoSelect._keyManager) {
                this.novoSelect._keyManager.change
                    .pipe(takeUntil(this._onDestroy))
                    .subscribe(() => this.adjustScrollTopToFitActiveOptionIntoView());
            }
            else {
                console.log('_keyManager was not initialized.');
            }
            this._options = this.novoSelect.contentOptions;
            // Closure variable for tracking the most recent first option.
            // In order to avoid avoid causing the list to
            // scroll to the top when options are added to the bottom of
            // the list (eg: infinite scroll), we compare only
            // the changes to the first options to determine if we
            // should set the first item as active.
            // This prevents unnecessary scrolling to the top of the list
            // when options are appended, but allows the first item
            // in the list to be set as active by default when there
            // is no active selection
            let previousFirstOption = this._options.toArray()[this.getOptionsLengthOffset()];
            this._options.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                // avoid "expression has been changed" error
                setTimeout(() => {
                    // Convert the QueryList to an array
                    const options = this._options.toArray();
                    // The true first item is offset by 1
                    const currentFirstOption = options[this.getOptionsLengthOffset()];
                    const keyManager = this.novoSelect._keyManager;
                    if (keyManager && this.novoSelect.panelOpen) {
                        // set first item active and input width
                        // Check to see if the first option in these changes is different from the previous.
                        const firstOptionIsChanged = !this.novoSelect.compareWith(previousFirstOption, currentFirstOption);
                        // CASE: The first option is different now.
                        // Indiciates we should set it as active and scroll to the top.
                        if (firstOptionIsChanged ||
                            !keyManager.activeItem ||
                            !options.find((option) => this.novoSelect.compareWith(option, keyManager.activeItem))) {
                            keyManager.setFirstItemActive();
                        }
                        // wait for panel width changes
                        setTimeout(() => {
                            this.updateInputWidth();
                        });
                        if (!this.disableScrollToActiveOnOptionsChanged) {
                            this.adjustScrollTopToFitActiveOptionIntoView();
                        }
                    }
                    // Update our reference
                    previousFirstOption = currentFirstOption;
                });
            });
        });
        // add or remove css class depending on whether to show the no entries found message
        // note: this is hacky
        this._showNoEntriesFound$.pipe(takeUntil(this._onDestroy)).subscribe((showNoEntriesFound) => {
            // set no entries found class on mat option
            if (this.novoOption) {
                if (showNoEntriesFound) {
                    this.novoOption._getHostElement().classList.add('novo-select-search-no-entries-found');
                }
                else {
                    this.novoOption._getHostElement().classList.remove('novo-select-search-no-entries-found');
                }
            }
        });
        // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
        this._viewportRuler
            .change()
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
            if (this.novoSelect.panelOpen) {
                this.updateInputWidth();
            }
        });
        if (!this.allowDeselectDuringFilter) {
            this.initMultipleHandling();
        }
        this.optionsList$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            // update view when available options change
            this.changeDetectorRef.markForCheck();
        });
    }
    _emitSelectAllBooleanToParent(state) {
        this.toggleAll.emit(state);
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    _isToggleAllCheckboxVisible() {
        return this.novoSelect.multiple && this.showToggleAllCheckbox;
    }
    /**
     * Handles the key down event with NovoSelectElement.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    _handleKeydown(event) {
        // Prevent propagation for all alphanumeric characters in order to avoid selection issues
        if ((event.key && event.key.length === 1) ||
            isAlphaNumeric(event.key) ||
            event.key === " " /* Key.Space */ ||
            (this.preventHomeEndKeyPropagation && (event.key === "Home" /* Key.Home */ || event.key === "End" /* Key.End */))) {
            event.stopPropagation();
        }
        if (this.novoSelect.multiple && event.key && event.key === "Enter" /* Key.Enter */) {
            // Regain focus after multiselect, so we can further type
            setTimeout(() => this._focus());
        }
        // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
        if (this.enableClearOnEscapePressed === true && event.key === "Escape" /* Key.Escape */ && this.value) {
            this._reset(true);
            event.stopPropagation();
        }
    }
    /**
     * Handles the key up event with NovoSelectElement.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event) {
        if (event.key === "ArrowUp" /* Key.ArrowUp */ || event.key === "ArrowDown" /* Key.ArrowDown */) {
            const ariaActiveDescendantId = this.novoSelect._getAriaActiveDescendant();
            const index = this._options.toArray().findIndex((item) => item.id === ariaActiveDescendantId);
            if (index !== -1) {
                const activeDescendant = this._options.toArray()[index];
                this.liveAnnouncer.announce(activeDescendant.viewValue + ' ' + this.getAriaIndex(index) + this.indexAndLengthScreenReaderText + this.getAriaLength());
            }
        }
    }
    /**
     * Calculate the index of the current option, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
     *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
     */
    getAriaIndex(optionIndex) {
        if (this.getOptionsLengthOffset() === 0) {
            return optionIndex + 1;
        }
        return optionIndex;
    }
    /**
     * Calculate the length of the options, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have length of options.length -1, due to search.
     *    Case 2 [1, 2, 3] will have length of options.length.
     */
    getAriaLength() {
        return this._options.toArray().length - this.getOptionsLengthOffset();
    }
    writeValue(value) {
        this._lastExternalInputValue = value;
        this._formControl.setValue(value);
        this.changeDetectorRef.markForCheck();
    }
    onBlur() {
        this.onTouched();
    }
    registerOnChange(fn) {
        this._formControl.valueChanges
            .pipe(filter((value) => value !== this._lastExternalInputValue), tap(() => (this._lastExternalInputValue = undefined)), takeUntil(this._onDestroy))
            .subscribe(fn);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Focuses the search input field
     */
    _focus() {
        if (!this.searchSelectInput || !this.novoSelect.panel) {
            return;
        }
        // save and restore scrollTop of panel, since it will be reset by focus()
        // note: this is hacky
        const panel = this.novoSelect.panel.nativeElement;
        const scrollTop = panel.scrollTop;
        // focus
        this.searchSelectInput.nativeElement.focus();
        panel.scrollTop = scrollTop;
    }
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    _reset(focus) {
        this._formControl.setValue('');
        if (focus) {
            this._focus();
        }
    }
    /**
     * Initializes handling <novo-select [multiple]="true">
     * Note: to improve this code, novo-select should be extended to allow disabling resetting the selection while filtering.
     */
    initMultipleHandling() {
        if (!this.novoSelect.ngControl) {
            if (this.novoSelect.multiple) {
                // note: the access to novoSelect.ngControl (instead of novoSelect.value / novoSelect.valueChanges)
                // is necessary to properly work in multi-selection mode.
                console.error('the novo-select containing novo-select-search must have a ngModel or formControl directive when multiple=true');
            }
            return;
        }
        // if <novo-select [multiple]="true">
        // store previously selected values and restore them when they are deselected
        // because the option is not available while we are currently filtering
        this.previousSelectedValues = this.novoSelect.ngControl.value;
        this.novoSelect.ngControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((values) => {
            let restoreSelectedValues = false;
            if (this.novoSelect.multiple) {
                if ((this.alwaysRestoreSelectedOptionsMulti || (this._formControl.value && this._formControl.value.length)) &&
                    this.previousSelectedValues &&
                    Array.isArray(this.previousSelectedValues)) {
                    if (!values || !Array.isArray(values)) {
                        values = [];
                    }
                    const optionValues = (this.novoSelect.options || []).map((option) => option.value);
                    this.previousSelectedValues.forEach((previousValue) => {
                        if (!values.some((v) => this.novoSelect.compareWith(v, previousValue)) &&
                            !optionValues.some((v) => this.novoSelect.compareWith(v, previousValue))) {
                            // if a value that was selected before is deselected and not found in the options, it was deselected
                            // due to the filtering, so we restore it.
                            values.push(previousValue);
                            restoreSelectedValues = true;
                        }
                    });
                }
            }
            this.previousSelectedValues = values;
            if (restoreSelectedValues) {
                // TODO: Fix this
                // this.novoSelect._onChange(values);
            }
        });
    }
    /**
     * Scrolls the currently active option into the view if it is not yet visible.
     */
    adjustScrollTopToFitActiveOptionIntoView() {
        if (this.novoSelect.panel && this.novoSelect.contentOptions.length > 0) {
            const novoOptionHeight = this.getNovoOptionHeight();
            const activeOptionIndex = this.novoSelect._keyManager.activeItemIndex || 0;
            const labelCount = _countGroupLabelsBeforeOption(activeOptionIndex, this.novoSelect.contentOptions, this.novoSelect.optionGroups);
            // If the component is in a NovoOption, the activeItemIndex will be offset by one.
            const indexOfOptionToFitIntoView = (this.novoOption ? -1 : 0) + labelCount + activeOptionIndex;
            const currentScrollTop = this.novoSelect.panel.nativeElement.scrollTop;
            const searchInputHeight = this.innerSelectSearch.nativeElement.offsetHeight;
            const amountOfVisibleOptions = Math.floor((SELECT_PANEL_MAX_HEIGHT - searchInputHeight) / novoOptionHeight);
            const indexOfFirstVisibleOption = Math.round((currentScrollTop + searchInputHeight) / novoOptionHeight) - 1;
            if (indexOfFirstVisibleOption >= indexOfOptionToFitIntoView) {
                this.novoSelect.panel.nativeElement.scrollTop = indexOfOptionToFitIntoView * novoOptionHeight;
            }
            else if (indexOfFirstVisibleOption + amountOfVisibleOptions <= indexOfOptionToFitIntoView) {
                this.novoSelect.panel.nativeElement.scrollTop =
                    (indexOfOptionToFitIntoView + 1) * novoOptionHeight - (SELECT_PANEL_MAX_HEIGHT - searchInputHeight);
            }
        }
    }
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    updateInputWidth() {
        if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
            return;
        }
        let element = this.innerSelectSearch.nativeElement;
        let panelElement;
        while ((element = element.parentElement)) {
            if (element.classList.contains('novo-select-panel')) {
                panelElement = element;
                break;
            }
        }
        if (panelElement) {
            this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
        }
    }
    getNovoOptionHeight() {
        if (this.novoSelect.contentOptions.length > 0) {
            return this.novoSelect.contentOptions.first._getHostElement().getBoundingClientRect().height;
        }
        return 0;
    }
    /**
     * Determine the offset to length that can be caused by the optional novoOption used as a search input.
     */
    getOptionsLengthOffset() {
        if (this.novoOption) {
            return 1;
        }
        else {
            return 0;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoSelectSearchComponent, deps: [{ token: NovoSelectElement }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: NovoOption, optional: true }, { token: i2.LiveAnnouncer }, { token: NovoFieldElement, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: NovoSelectSearchComponent, selector: "novo-select-search", inputs: { name: "name", placeholderLabel: "placeholderLabel", type: "type", noEntriesFoundLabel: "noEntriesFoundLabel", indexAndLengthScreenReaderText: "indexAndLengthScreenReaderText", clearSearchInput: "clearSearchInput", searching: "searching", disableInitialFocus: "disableInitialFocus", enableClearOnEscapePressed: "enableClearOnEscapePressed", allowDeselectDuringFilter: "allowDeselectDuringFilter", preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation", disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged", ariaLabel: "ariaLabel", showToggleAllCheckbox: "showToggleAllCheckbox", toggleAllCheckboxChecked: "toggleAllCheckboxChecked", toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate", toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage", toogleAllCheckboxTooltipPosition: "toogleAllCheckboxTooltipPosition", hideClearSearchButton: "hideClearSearchButton", alwaysRestoreSelectedOptionsMulti: "alwaysRestoreSelectedOptionsMulti" }, outputs: { toggleAll: "toggleAll" }, host: { properties: { "class.novo-select-search-inside-novo-option": "this.isInsideNovoOption" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NovoSelectSearchComponent),
                multi: true,
            },
        ], queries: [{ propertyName: "clearIcon", first: true, predicate: NovoSelectSearchClearDirective, descendants: true }], viewQueries: [{ propertyName: "searchSelectInput", first: true, predicate: ["searchSelectInput"], descendants: true, read: ElementRef, static: true }, { propertyName: "innerSelectSearch", first: true, predicate: ["innerSelectSearch"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<novo-field\n  #innerSelectSearch\n  class=\"novo-select-search-inner\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    novoPrefix\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon\n    novoPrefix\n    class=\"novo-select-search-icon\">search</novo-icon>\n\n  <input class=\"novo-select-search-input\"\n    #searchSelectInput\n    novoInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n\n  <novo-spinner *ngIf=\"searching\"\n    novoSuffix\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    novoSuffix\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</novo-field>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [":host{display:block;width:100%}.novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{width:100%;background-color:var(--background-bright);-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-icon{padding:var(--spacing-md)}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-no-entries-found{padding:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3.6rem;line-height:3.6rem}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option.contains-novo-select-search{padding:0!important;border:none}::ng-deep .novo-option.contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option.contains-novo-select-search .novo-option-pseudo-checkbox{display:none}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i5.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "directive", type: i7.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i8.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9.NovoSpinnerElement, selector: "novo-spinner", inputs: ["theme", "color", "size", "inverse"] }, { kind: "directive", type: i10.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML", "tooltipCloseOnClick", "tooltipOnOverflow", "tooltipActive"] }, { kind: "component", type: i11.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i11.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"], outputs: ["onSelect"] }, { kind: "directive", type: i11.NovoFieldPrefixDirective, selector: "[novoPrefix]" }, { kind: "directive", type: i11.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Object)
], NovoSelectSearchComponent.prototype, "allowDeselectDuringFilter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: NovoSelectSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-select-search', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NovoSelectSearchComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-field\n  #innerSelectSearch\n  class=\"novo-select-search-inner\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    novoPrefix\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon\n    novoPrefix\n    class=\"novo-select-search-icon\">search</novo-icon>\n\n  <input class=\"novo-select-search-input\"\n    #searchSelectInput\n    novoInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n\n  <novo-spinner *ngIf=\"searching\"\n    novoSuffix\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    novoSuffix\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</novo-field>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [":host{display:block;width:100%}.novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{width:100%;background-color:var(--background-bright);-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-icon{padding:var(--spacing-md)}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-no-entries-found{padding:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3.6rem;line-height:3.6rem}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option.contains-novo-select-search{padding:0!important;border:none}::ng-deep .novo-option.contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option.contains-novo-select-search .novo-option-pseudo-checkbox{display:none}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"] }]
        }], ctorParameters: () => [{ type: i12.NovoSelectElement, decorators: [{
                    type: Inject,
                    args: [NovoSelectElement]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i7.NovoOption, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NovoOption]
                }] }, { type: i2.LiveAnnouncer }, { type: i11.NovoFieldElement, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NovoFieldElement]
                }] }], propDecorators: { name: [{
                type: Input
            }], placeholderLabel: [{
                type: Input
            }], type: [{
                type: Input
            }], noEntriesFoundLabel: [{
                type: Input
            }], indexAndLengthScreenReaderText: [{
                type: Input
            }], clearSearchInput: [{
                type: Input
            }], searching: [{
                type: Input
            }], disableInitialFocus: [{
                type: Input
            }], enableClearOnEscapePressed: [{
                type: Input
            }], allowDeselectDuringFilter: [{
                type: Input
            }], preventHomeEndKeyPropagation: [{
                type: Input
            }], disableScrollToActiveOnOptionsChanged: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], showToggleAllCheckbox: [{
                type: Input
            }], toggleAllCheckboxChecked: [{
                type: Input
            }], toggleAllCheckboxIndeterminate: [{
                type: Input
            }], toggleAllCheckboxTooltipMessage: [{
                type: Input
            }], toogleAllCheckboxTooltipPosition: [{
                type: Input
            }], hideClearSearchButton: [{
                type: Input
            }], alwaysRestoreSelectedOptionsMulti: [{
                type: Input
            }], toggleAll: [{
                type: Output
            }], searchSelectInput: [{
                type: ViewChild,
                args: ['searchSelectInput', { read: ElementRef, static: true }]
            }], innerSelectSearch: [{
                type: ViewChild,
                args: ['innerSelectSearch', { read: ElementRef, static: true }]
            }], clearIcon: [{
                type: ContentChild,
                args: [NovoSelectSearchClearDirective, { static: false }]
            }], isInsideNovoOption: [{
                type: HostBinding,
                args: ['class.novo-select-search-inside-novo-option']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoL3NlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0LXNlYXJjaC9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEksT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQU8sTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBRWpGLG9EQUFvRDtBQUNwRCxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUNwQyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDdEIsdURBQXVEO0FBQ3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZFRztBQWNILE1BQU0sT0FBTyx5QkFBeUI7SUFvRnBDLElBQ0ksa0JBQWtCO1FBQ3BCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFPRCxpREFBaUQ7SUFDakQsSUFBVyxRQUFRLENBQUMsUUFBK0I7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQVcsUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQThCRCxZQUNvQyxVQUE2QixFQUN4RCxpQkFBb0MsRUFDbkMsY0FBNkIsRUFDRSxhQUF5QixJQUFJLEVBQzVELGFBQTRCLEVBQ1MsZUFBaUMsSUFBSTtRQUxoRCxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUN4RCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ25DLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDNUQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDUyxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUE1STNFLFNBQUksR0FBRyxnQkFBZ0IsR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUNuRCxzQ0FBc0M7UUFDN0IscUJBQWdCLEdBQUcsUUFBUSxDQUFDO1FBRXJDLHFDQUFxQztRQUM1QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBRXZCLDhGQUE4RjtRQUNyRix3QkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztRQUVsRDs7OztXQUlHO1FBQ00sbUNBQThCLEdBQUcsTUFBTSxDQUFDO1FBRWpEOzs7V0FHRztRQUNNLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUVqQyx1REFBdUQ7UUFDOUMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUzQixtREFBbUQ7UUFDMUMsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBRXJDLDJDQUEyQztRQUNsQywrQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFFNUMscURBQXFEO1FBQzVCLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUUzRDs7O1dBR0c7UUFDTSxpQ0FBNEIsR0FBRyxLQUFLLENBQUM7UUFFOUMsbUdBQW1HO1FBQzFGLDBDQUFxQyxHQUFHLEtBQUssQ0FBQztRQUV2RCxvREFBb0Q7UUFDM0MsY0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBRXZDLHdFQUF3RTtRQUMvRCwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFFdkMsd0NBQXdDO1FBQy9CLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUUxQyw4Q0FBOEM7UUFDckMsbUNBQThCLEdBQUcsS0FBSyxDQUFDO1FBRWhELGdFQUFnRTtRQUN2RCxvQ0FBK0IsR0FBRyxFQUFFLENBQUM7UUFFOUMscUVBQXFFO1FBQzVELHFDQUFnQyxHQUE4RCxPQUFPLENBQUM7UUFFL0csNERBQTREO1FBQ25ELDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUV2Qzs7O1dBR0c7UUFDTSxzQ0FBaUMsR0FBRyxLQUFLLENBQUM7UUFFbkQsNkVBQTZFO1FBQ25FLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBc0JsRCxjQUFTLEdBQWEsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUU5QixpQkFBWSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQVNoRCxjQUFTLEdBQTJDLElBQUksZUFBZSxDQUF3QixJQUFJLENBQUMsQ0FBQztRQUVwRyw0QkFBdUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0UsaUJBQVksR0FBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2xFLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQ3JCLFFBQVE7WUFDTixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbEUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN6SixTQUFTLENBQWUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQzNDLG9CQUFvQixDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDeEg7WUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQ0YsQ0FBQztRQUVNLG1CQUFjLEdBQXVCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUt0SCxtREFBbUQ7UUFDNUMseUJBQW9CLEdBQXdCLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUgsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxLQUFLLElBQUksYUFBYSxLQUFLLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQ3RILENBQUM7UUFFRixnRUFBZ0U7UUFDeEQsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFVdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDTix5QkFBeUI7UUFDekIsaURBQWlEO1FBQ2pELG9DQUFvQztRQUNwQyxxREFBcUQ7UUFDckQsK0RBQStEO1FBQy9ELGlFQUFpRTtRQUNqRSw2RUFBNkU7UUFDN0UsaUVBQWlFO1FBQ2pFLHFEQUFxRDtRQUNyRCxNQUFNO1FBQ04sV0FBVztRQUNYLDZDQUE2QztRQUM3QyxJQUFJO1FBRUosZ0ZBQWdGO1FBQ2hGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNqRixDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRUQscURBQXFEO1FBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzNGLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLHNDQUFzQztnQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sd0JBQXdCO2dCQUN4QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNO3FCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDaEMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDLENBQUM7WUFDdEUsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztZQUUvQyw4REFBOEQ7WUFDOUQsOENBQThDO1lBQzlDLDREQUE0RDtZQUM1RCxrREFBa0Q7WUFDbEQsc0RBQXNEO1lBQ3RELHVDQUF1QztZQUN2Qyw2REFBNkQ7WUFDN0QsdURBQXVEO1lBQ3ZELHdEQUF3RDtZQUN4RCx5QkFBeUI7WUFDekIsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7WUFFakYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNwRSw0Q0FBNEM7Z0JBQzVDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2Qsb0NBQW9DO29CQUNwQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUV4QyxxQ0FBcUM7b0JBQ3JDLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7b0JBRWxFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO29CQUMvQyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUM1Qyx3Q0FBd0M7d0JBRXhDLG9GQUFvRjt3QkFDcEYsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLENBQUM7d0JBRW5HLDJDQUEyQzt3QkFDM0MsK0RBQStEO3dCQUMvRCxJQUNFLG9CQUFvQjs0QkFDcEIsQ0FBQyxVQUFVLENBQUMsVUFBVTs0QkFDdEIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQ3JGLENBQUM7NEJBQ0QsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7d0JBQ2xDLENBQUM7d0JBRUQsK0JBQStCO3dCQUMvQixVQUFVLENBQUMsR0FBRyxFQUFFOzRCQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUMxQixDQUFDLENBQUMsQ0FBQzt3QkFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7NEJBQ2hELElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDO3dCQUNsRCxDQUFDO29CQUNILENBQUM7b0JBRUQsdUJBQXVCO29CQUN2QixtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUwsb0ZBQW9GO1FBQ3BGLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQzFGLDJDQUEyQztZQUMzQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQkFDekYsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2dCQUM1RixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsMkdBQTJHO1FBQzNHLElBQUksQ0FBQyxjQUFjO2FBQ2hCLE1BQU0sRUFBRTthQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDaEUsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2QkFBNkIsQ0FBQyxLQUFjO1FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwyQkFBMkI7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsS0FBb0I7UUFDakMseUZBQXlGO1FBQ3pGLElBQ0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUNyQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN6QixLQUFLLENBQUMsR0FBRyx3QkFBYztZQUN2QixDQUFDLElBQUksQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLDBCQUFhLElBQUksS0FBSyxDQUFDLEdBQUcsd0JBQVksQ0FBQyxDQUFDLEVBQ3hGLENBQUM7WUFDRCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyw0QkFBYyxFQUFFLENBQUM7WUFDckUseURBQXlEO1lBQ3pELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsMEdBQTBHO1FBQzFHLElBQUksSUFBSSxDQUFDLDBCQUEwQixLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyw4QkFBZSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxLQUFvQjtRQUMvQixJQUFJLEtBQUssQ0FBQyxHQUFHLGdDQUFnQixJQUFJLEtBQUssQ0FBQyxHQUFHLG9DQUFrQixFQUFFLENBQUM7WUFDN0QsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDMUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssc0JBQXNCLENBQUMsQ0FBQztZQUM5RixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNqQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUN6QixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FDekgsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFDLFdBQW1CO1FBQzlCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDeEMsT0FBTyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQTJCO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTthQUMzQixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQ3pELEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUNyRCxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUMzQjthQUNBLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBWTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEQsT0FBTztRQUNULENBQUM7UUFDRCx5RUFBeUU7UUFDekUsc0JBQXNCO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNsRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBRWxDLFFBQVE7UUFDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBZTtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDN0IsbUdBQW1HO2dCQUNuRyx5REFBeUQ7Z0JBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsK0dBQStHLENBQUMsQ0FBQztZQUNqSSxDQUFDO1lBQ0QsT0FBTztRQUNULENBQUM7UUFDRCxxQ0FBcUM7UUFDckMsNkVBQTZFO1FBQzdFLHVFQUF1RTtRQUN2RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBRTlELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzNGLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDN0IsSUFDRSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2RyxJQUFJLENBQUMsc0JBQXNCO29CQUMzQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUMxQyxDQUFDO29CQUNELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7d0JBQ3RDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2QsQ0FBQztvQkFDRCxNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuRixJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7d0JBQ3BELElBQ0UsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7NEJBQ2xFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLEVBQ3hFLENBQUM7NEJBQ0Qsb0dBQW9HOzRCQUNwRywwQ0FBMEM7NEJBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQzNCLHFCQUFxQixHQUFHLElBQUksQ0FBQzt3QkFDL0IsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUM7WUFFckMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO2dCQUMxQixpQkFBaUI7Z0JBQ2pCLHFDQUFxQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyx3Q0FBd0M7UUFDOUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDdkUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUNwRCxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUM7WUFDM0UsTUFBTSxVQUFVLEdBQUcsNkJBQTZCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsSSxrRkFBa0Y7WUFDbEYsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7WUFDL0YsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBRXZFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDNUUsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTVHLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFNUcsSUFBSSx5QkFBeUIsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO2dCQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLDBCQUEwQixHQUFHLGdCQUFnQixDQUFDO1lBQ2hHLENBQUM7aUJBQU0sSUFBSSx5QkFBeUIsR0FBRyxzQkFBc0IsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO2dCQUM1RixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUztvQkFDM0MsQ0FBQywwQkFBMEIsR0FBRyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLHVCQUF1QixHQUFHLGlCQUFpQixDQUFDLENBQUM7WUFDeEcsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0JBQWdCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckUsT0FBTztRQUNULENBQUM7UUFDRCxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztRQUNoRSxJQUFJLFlBQXlCLENBQUM7UUFDOUIsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztnQkFDcEQsWUFBWSxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsTUFBTTtZQUNSLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDckYsQ0FBQztJQUNILENBQUM7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDOUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDL0YsQ0FBQztRQUVELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0ssc0JBQXNCO1FBQzVCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDOytHQXpoQlUseUJBQXlCLGtCQXdJMUIsaUJBQWlCLDJFQUdMLFVBQVUsMERBRVYsZ0JBQWdCO21HQTdJM0IseUJBQXlCLDhwQ0FUekI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2dCQUN4RCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsaUVBcUZhLDhCQUE4QixtSkFOSixVQUFVLCtIQUdWLFVBQVUsMkNDM01wRCx3OURBMkRNOztBRG1HcUI7SUFBZixZQUFZLEVBQUU7OzRFQUFtQzs0RkFsQ2hELHlCQUF5QjtrQkFickMsU0FBUzsrQkFDRSxvQkFBb0IsYUFHbkI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsMEJBQTBCLENBQUM7NEJBQ3hELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNOzswQkEwSTVDLE1BQU07MkJBQUMsaUJBQWlCOzswQkFHeEIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxVQUFVOzswQkFFN0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxnQkFBZ0I7eUNBNUk3QixJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFHRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBT0csOEJBQThCO3NCQUF0QyxLQUFLO2dCQU1HLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFHRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBR21CLHlCQUF5QjtzQkFBakQsS0FBSztnQkFNRyw0QkFBNEI7c0JBQXBDLEtBQUs7Z0JBR0cscUNBQXFDO3NCQUE3QyxLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUdHLHdCQUF3QjtzQkFBaEMsS0FBSztnQkFHRyw4QkFBOEI7c0JBQXRDLEtBQUs7Z0JBR0csK0JBQStCO3NCQUF2QyxLQUFLO2dCQUdHLGdDQUFnQztzQkFBeEMsS0FBSztnQkFHRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBTUcsaUNBQWlDO3NCQUF6QyxLQUFLO2dCQUdJLFNBQVM7c0JBQWxCLE1BQU07Z0JBRzZELGlCQUFpQjtzQkFBcEYsU0FBUzt1QkFBQyxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHRSxpQkFBaUI7c0JBQXBGLFNBQVM7dUJBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBR0QsU0FBUztzQkFBekUsWUFBWTt1QkFBQyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRzNELGtCQUFrQjtzQkFEckIsV0FBVzt1QkFBQyw2Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRlbGF5LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgaXNBbHBoYU51bWVyaWMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b09wdGlvbiwgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24gfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0RWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcbmltcG9ydCB7IE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC1jbGVhci5kaXJlY3RpdmUnO1xuXG4vKiogVGhlIG1heCBoZWlnaHQgb2YgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwuICovXG5jb25zdCBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCA9IDI1NjtcbmxldCBhdXRvSW5jcmVtZW50ID0gMTtcbi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyBjb21wb25lbnQtc2VsZWN0b3IgKi9cbi8qKlxuICogQ29tcG9uZW50IHByb3ZpZGluZyBhbiBpbnB1dCBmaWVsZCBmb3Igc2VhcmNoaW5nIE5vdm9TZWxlY3RFbGVtZW50IG9wdGlvbnMuXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBpbnRlcmZhY2UgQmFuayB7XG4gKiAgaWQ6IHN0cmluZztcbiAqICBuYW1lOiBzdHJpbmc7XG4gKiB9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwLWRhdGEtc2VsZWN0aW9uJyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8bm92by1mb3JtLWZpZWxkPlxuICogICAgICAgPG5vdm8tc2VsZWN0IFtmb3JtQ29udHJvbF09XCJiYW5rQ3RybFwiIHBsYWNlaG9sZGVyPVwiQmFua1wiPlxuICogICAgICAgICA8bm92by1vcHRpb24+XG4gKiAgICAgICAgICAgPG5neC1ub3ZvLXNlbGVjdC1zZWFyY2ggW2Zvcm1Db250cm9sXT1cImJhbmtGaWx0ZXJDdHJsXCI+PC9uZ3gtbm92by1zZWxlY3Qtc2VhcmNoPlxuICogICAgICAgICA8L25vdm8tb3B0aW9uPlxuICogICAgICAgICA8bm92by1vcHRpb24gKm5nRm9yPVwibGV0IGJhbmsgb2YgZmlsdGVyZWRCYW5rcyB8IGFzeW5jXCIgW3ZhbHVlXT1cImJhbmsuaWRcIj5cbiAqICAgICAgICAgICB7e2JhbmsubmFtZX19XG4gKiAgICAgICAgIDwvbm92by1vcHRpb24+XG4gKiAgICAgICA8L25vdm8tc2VsZWN0PlxuICogICAgIDwvbm92by1mb3JtLWZpZWxkPlxuICogICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIERhdGFTZWxlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAvLyBjb250cm9sIGZvciB0aGUgc2VsZWN0ZWQgYmFua1xuICogICBwdWJsaWMgYmFua0N0cmw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gKiAgIC8vIGNvbnRyb2wgZm9yIHRoZSBOb3ZvU2VsZWN0RWxlbWVudCBmaWx0ZXIga2V5d29yZFxuICogICBwdWJsaWMgYmFua0ZpbHRlckN0cmw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gKlxuICogICAvLyBsaXN0IG9mIGJhbmtzXG4gKiAgIHByaXZhdGUgYmFua3M6IEJhbmtbXSA9IFt7bmFtZTogJ0JhbmsgQScsIGlkOiAnQSd9LCB7bmFtZTogJ0JhbmsgQicsIGlkOiAnQid9LCB7bmFtZTogJ0JhbmsgQycsIGlkOiAnQyd9XTtcbiAqICAgLy8gbGlzdCBvZiBiYW5rcyBmaWx0ZXJlZCBieSBzZWFyY2gga2V5d29yZFxuICogICBwdWJsaWMgZmlsdGVyZWRCYW5rczogUmVwbGF5U3ViamVjdDxCYW5rW10+ID0gbmV3IFJlcGxheVN1YmplY3Q8QmFua1tdPigxKTtcbiAqXG4gKiAgIC8vIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLlxuICogICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICpcbiAqXG4gKiAgIG5nT25Jbml0KCkge1xuICogICAgIC8vIGxvYWQgdGhlIGluaXRpYWwgYmFuayBsaXN0XG4gKiAgICAgdGhpcy5maWx0ZXJlZEJhbmtzLm5leHQodGhpcy5iYW5rcy5zbGljZSgpKTtcbiAqICAgICAvLyBsaXN0ZW4gZm9yIHNlYXJjaCBmaWVsZCB2YWx1ZSBjaGFuZ2VzXG4gKiAgICAgdGhpcy5iYW5rRmlsdGVyQ3RybC52YWx1ZUNoYW5nZXNcbiAqICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICogICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gKiAgICAgICAgIHRoaXMuZmlsdGVyQmFua3MoKTtcbiAqICAgICAgIH0pO1xuICogICB9XG4gKlxuICogICBuZ09uRGVzdHJveSgpIHtcbiAqICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICogICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICogICB9XG4gKlxuICogICBwcml2YXRlIGZpbHRlckJhbmtzKCkge1xuICogICAgIGlmICghdGhpcy5iYW5rcykge1xuICogICAgICAgcmV0dXJuO1xuICogICAgIH1cbiAqXG4gKiAgICAgLy8gZ2V0IHRoZSBzZWFyY2gga2V5d29yZFxuICogICAgIGxldCBzZWFyY2ggPSB0aGlzLmJhbmtGaWx0ZXJDdHJsLnZhbHVlO1xuICogICAgIGlmICghc2VhcmNoKSB7XG4gKiAgICAgICB0aGlzLmZpbHRlcmVkQmFua3MubmV4dCh0aGlzLmJhbmtzLnNsaWNlKCkpO1xuICogICAgICAgcmV0dXJuO1xuICogICAgIH0gZWxzZSB7XG4gKiAgICAgICBzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAqICAgICB9XG4gKlxuICogICAgIC8vIGZpbHRlciB0aGUgYmFua3NcbiAqICAgICB0aGlzLmZpbHRlcmVkQmFua3MubmV4dChcbiAqICAgICAgIHRoaXMuYmFua3MuZmlsdGVyKGJhbmsgPT4gYmFuay5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gpID4gLTEpXG4gKiAgICAgKTtcbiAqICAgfVxuICogfVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNlbGVjdC1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC1zZWFyY2guY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgbmFtZSA9ICdzZWxlY3Qtc2VhcmNoLScgKyBhdXRvSW5jcmVtZW50Kys7XG4gIC8qKiBMYWJlbCBvZiB0aGUgc2VhcmNoIHBsYWNlaG9sZGVyICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyTGFiZWwgPSAnU2VhcmNoJztcblxuICAvKiogVHlwZSBvZiB0aGUgc2VhcmNoIGlucHV0IGZpZWxkICovXG4gIEBJbnB1dCgpIHR5cGUgPSAndGV4dCc7XG5cbiAgLyoqIExhYmVsIHRvIGJlIHNob3duIHdoZW4gbm8gZW50cmllcyBhcmUgZm91bmQuIFNldCB0byBudWxsIGlmIG5vIG1lc3NhZ2Ugc2hvdWxkIGJlIHNob3duLiAqL1xuICBASW5wdXQoKSBub0VudHJpZXNGb3VuZExhYmVsID0gJ05vIFJlY29yZHMgRm91bmQnO1xuXG4gIC8qKlxuICAgKiAgVGV4dCB0aGF0IGlzIGFwcGVuZGVkIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gbGFiZWwgYW5ub3VuY2VkIGJ5IHNjcmVlbiByZWFkZXJzLFxuICAgKiAgaW5mb3JtaW5nIHRoZSB1c2VyIG9mIHRoZSBjdXJyZW50IGluZGV4LCB2YWx1ZSBhbmQgdG90YWwgb3B0aW9ucy5cbiAgICogIGVnOiBCYW5rIFIgKEdlcm1hbnkpIDEgb2YgNlxuICAgKi9cbiAgQElucHV0KCkgaW5kZXhBbmRMZW5ndGhTY3JlZW5SZWFkZXJUZXh0ID0gJyBvZiAnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VhcmNoIGZpZWxkIHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIHRoZSBkcm9wZG93biBtZW51IGlzIGNsb3NlZC5cbiAgICogVXNlZnVsIGZvciBzZXJ2ZXItc2lkZSBmaWx0ZXJpbmcuXG4gICAqL1xuICBASW5wdXQoKSBjbGVhclNlYXJjaElucHV0ID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0byBzaG93IHRoZSBzZWFyY2gtaW4tcHJvZ3Jlc3MgaW5kaWNhdG9yICovXG4gIEBJbnB1dCgpIHNlYXJjaGluZyA9IGZhbHNlO1xuXG4gIC8qKiBEaXNhYmxlcyBpbml0aWFsIGZvY3VzaW5nIG9mIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBASW5wdXQoKSBkaXNhYmxlSW5pdGlhbEZvY3VzID0gZmFsc2U7XG5cbiAgLyoqIEVuYWJsZSBjbGVhciBpbnB1dCBvbiBlc2NhcGUgcHJlc3NlZCAqL1xuICBASW5wdXQoKSBlbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZCA9IGZhbHNlO1xuXG4gIC8qKiBBbGxvdyB1c2VyIHRvIHVuY2hlY2sgYSB2YWx1ZSB3aGlsZSBmaWx0ZXJpbmcuICovXG4gIEBJbnB1dCgpIEBCb29sZWFuSW5wdXQoKSBhbGxvd0Rlc2VsZWN0RHVyaW5nRmlsdGVyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIGhvbWUgLyBlbmQga2V5IGJlaW5nIHByb3BhZ2F0ZWQgdG8gbm92by1zZWxlY3QsXG4gICAqIGFsbG93aW5nIHRvIG1vdmUgdGhlIGN1cnNvciB3aXRoaW4gdGhlIHNlYXJjaCBpbnB1dCBpbnN0ZWFkIG9mIG5hdmlnYXRpbmcgdGhlIG9wdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIHByZXZlbnRIb21lRW5kS2V5UHJvcGFnYXRpb24gPSBmYWxzZTtcblxuICAvKiogRGlzYWJsZXMgc2Nyb2xsaW5nIHRvIGFjdGl2ZSBvcHRpb25zIHdoZW4gb3B0aW9uIGxpc3QgY2hhbmdlcy4gVXNlZnVsIGZvciBzZXJ2ZXItc2lkZSBzZWFyY2ggKi9cbiAgQElucHV0KCkgZGlzYWJsZVNjcm9sbFRvQWN0aXZlT25PcHRpb25zQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIC8qKiBBZGRzIDUwOCBzY3JlZW4gcmVhZGVyIHN1cHBvcnQgZm9yIHNlYXJjaCBib3ggKi9cbiAgQElucHV0KCkgYXJpYUxhYmVsID0gJ2Ryb3Bkb3duIHNlYXJjaCc7XG5cbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBTZWxlY3QgQWxsIENoZWNrYm94IChmb3Igbm92by1zZWxlY3RbbXVsdGk9dHJ1ZV0pICovXG4gIEBJbnB1dCgpIHNob3dUb2dnbGVBbGxDaGVja2JveCA9IGZhbHNlO1xuXG4gIC8qKiBzZWxlY3QgYWxsIGNoZWNrYm94IGNoZWNrZWQgc3RhdGUgKi9cbiAgQElucHV0KCkgdG9nZ2xlQWxsQ2hlY2tib3hDaGVja2VkID0gZmFsc2U7XG5cbiAgLyoqIHNlbGVjdCBhbGwgY2hlY2tib3ggaW5kZXRlcm1pbmF0ZSBzdGF0ZSAqL1xuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveEluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAvKiogRGlzcGxheSBhIG1lc3NhZ2UgaW4gYSB0b29sdGlwIG9uIHRoZSB0b2dnbGUtYWxsIGNoZWNrYm94ICovXG4gIEBJbnB1dCgpIHRvZ2dsZUFsbENoZWNrYm94VG9vbHRpcE1lc3NhZ2UgPSAnJztcblxuICAvKiogRGVmaW5lIHRoZSBwb3NpdGlvbiBvZiB0aGUgdG9vbHRpcCBvbiB0aGUgdG9nZ2xlLWFsbCBjaGVja2JveC4gKi9cbiAgQElucHV0KCkgdG9vZ2xlQWxsQ2hlY2tib3hUb29sdGlwUG9zaXRpb246ICdsZWZ0JyB8ICdyaWdodCcgfCAnYWJvdmUnIHwgJ2JlbG93JyB8ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdiZWxvdyc7XG5cbiAgLyoqIFNob3cvSGlkZSB0aGUgc2VhcmNoIGNsZWFyIGJ1dHRvbiBvZiB0aGUgc2VhcmNoIGlucHV0ICovXG4gIEBJbnB1dCgpIGhpZGVDbGVhclNlYXJjaEJ1dHRvbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBbHdheXMgcmVzdG9yZSBzZWxlY3RlZCBvcHRpb25zIG9uIHNlbGVjdGlvbkNoYW5nZSBmb3IgbW9kZSBtdWx0aSAoZS5nLiBmb3IgbGF6eSBsb2FkaW5nL2luZmluaXR5IHNjcm9sbGluZykuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCBzbyBzZWxlY3RlZCBvcHRpb25zIGFyZSBvbmx5IHJlc3RvcmVkIHdoaWxlIGZpbHRlcmluZyBpcyBhY3RpdmUuXG4gICAqL1xuICBASW5wdXQoKSBhbHdheXNSZXN0b3JlU2VsZWN0ZWRPcHRpb25zTXVsdGkgPSBmYWxzZTtcblxuICAvKiogT3V0cHV0IGVtaXR0ZXIgdG8gc2VuZCB0byBwYXJlbnQgY29tcG9uZW50IHdpdGggdGhlIHRvZ2dsZSBhbGwgYm9vbGVhbiAqL1xuICBAT3V0cHV0KCkgdG9nZ2xlQWxsID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBAVmlld0NoaWxkKCdzZWFyY2hTZWxlY3RJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIHNlYXJjaFNlbGVjdElucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBAVmlld0NoaWxkKCdpbm5lclNlbGVjdFNlYXJjaCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGlubmVyU2VsZWN0U2VhcmNoOiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gY3VzdG9tIHNlYXJjaCBpbnB1dCBjbGVhciBpY29uICovXG4gIEBDb250ZW50Q2hpbGQoTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xlYXJJY29uOiBOb3ZvU2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLXNlbGVjdC1zZWFyY2gtaW5zaWRlLW5vdm8tb3B0aW9uJylcbiAgZ2V0IGlzSW5zaWRlTm92b09wdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLm5vdm9PcHRpb247XG4gIH1cblxuICAvKiogQ3VycmVudCBzZWFyY2ggdmFsdWUgKi9cbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2xhc3RFeHRlcm5hbElucHV0VmFsdWU6IHN0cmluZztcblxuICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKF86IGFueSkgPT4ge307XG5cbiAgcHVibGljIF9mb3JtQ29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE5vdm9TZWxlY3RFbGVtZW50IG9wdGlvbnMgKi9cbiAgcHVibGljIHNldCBfb3B0aW9ucyhfb3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+KSB7XG4gICAgdGhpcy5fb3B0aW9ucyQubmV4dChfb3B0aW9ucyk7XG4gIH1cbiAgcHVibGljIGdldCBfb3B0aW9ucygpOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zJC5nZXRWYWx1ZSgpO1xuICB9XG4gIHB1YmxpYyBfb3B0aW9ucyQ6IEJlaGF2aW9yU3ViamVjdDxRdWVyeUxpc3Q8Tm92b09wdGlvbj4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxRdWVyeUxpc3Q8Tm92b09wdGlvbj4+KG51bGwpO1xuXG4gIHByaXZhdGUgX2ZpbHRlckZpbmlzaGVkUmVyZW5kZXIgPSB0aGlzLl9mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoMSkpO1xuXG4gIHByaXZhdGUgb3B0aW9uc0xpc3QkOiBPYnNlcnZhYmxlPE5vdm9PcHRpb25bXT4gPSB0aGlzLl9vcHRpb25zJC5waXBlKFxuICAgIHN3aXRjaE1hcCgoX29wdGlvbnMpID0+IFxuICAgICAgX29wdGlvbnNcbiAgICAgICAgPyBjb21iaW5lTGF0ZXN0KFtfb3B0aW9ucy5jaGFuZ2VzLCB0aGlzLl9maWx0ZXJGaW5pc2hlZFJlcmVuZGVyXSkucGlwZShcbiAgICAgICAgICAgIG1hcCgoW29wdGlvbnMsXSkgPT4gb3B0aW9ucy50b0FycmF5KCkuZmlsdGVyKG9wdGlvbiA9PiAhKG9wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKT8uY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtb3B0aW9uJykgfHwgb3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmhpZGRlbikpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aDxOb3ZvT3B0aW9uW10+KF9vcHRpb25zLnRvQXJyYXkoKSksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgob3B0c0EsIG9wdHNCKSA9PiBvcHRzQS5tYXAob3B0ID0+IG9wdC52YWx1ZSkuam9pbignLCcpID09PSBvcHRzQi5tYXAob3B0ID0+IG9wdC52YWx1ZSkuam9pbignLCcpKVxuICAgICAgICAgIClcbiAgICAgICAgOiBvZihudWxsKSxcbiAgICApLFxuICApO1xuXG4gIHByaXZhdGUgb3B0aW9uc0xlbmd0aCQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMub3B0aW9uc0xpc3QkLnBpcGUobWFwKChvcHRpb25zKSA9PiAob3B0aW9ucyA/IG9wdGlvbnMubGVuZ3RoIDogMCkpKTtcblxuICAvKiogUHJldmlvdXNseSBzZWxlY3RlZCB2YWx1ZXMgd2hlbiB1c2luZyA8bm92by1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj4qL1xuICBwcml2YXRlIHByZXZpb3VzU2VsZWN0ZWRWYWx1ZXM6IGFueVtdO1xuXG4gIC8qKiB3aGV0aGVyIHRvIHNob3cgdGhlIG5vIGVudHJpZXMgZm91bmQgbWVzc2FnZSAqL1xuICBwdWJsaWMgX3Nob3dOb0VudHJpZXNGb3VuZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBjb21iaW5lTGF0ZXN0KFt0aGlzLl9mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMsIHRoaXMub3B0aW9uc0xlbmd0aCRdKS5waXBlKFxuICAgIG1hcCgoW3ZhbHVlLCBvcHRpb25zTGVuZ3RoXSkgPT4gdGhpcy5ub0VudHJpZXNGb3VuZExhYmVsICYmIHZhbHVlICYmIG9wdGlvbnNMZW5ndGggPT09IHRoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpKSxcbiAgKTtcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOb3ZvU2VsZWN0RWxlbWVudCkgcHVibGljIG5vdm9TZWxlY3Q6IE5vdm9TZWxlY3RFbGVtZW50LFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5vdm9PcHRpb24pIHB1YmxpYyBub3ZvT3B0aW9uOiBOb3ZvT3B0aW9uID0gbnVsbCxcbiAgICBwcml2YXRlIGxpdmVBbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOb3ZvRmllbGRFbGVtZW50KSBwdWJsaWMgbWF0Rm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50ID0gbnVsbCxcbiAgKSB7XG4gICAgdGhpcy5ub3ZvU2VsZWN0LmhpZGVMZWdhY3lPcHRpb25zRm9yU2VhcmNoLnNldCh0cnVlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHNldCBjdXN0b20gcGFuZWwgY2xhc3NcbiAgICAvLyBjb25zdCBwYW5lbENsYXNzID0gJ25vdm8tc2VsZWN0LXNlYXJjaC1wYW5lbCc7XG4gICAgLy8gaWYgKHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzKSB7XG4gICAgLy8gICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcykpIHtcbiAgICAvLyAgICAgKDxzdHJpbmdbXT50aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcykucHVzaChwYW5lbENsYXNzKTtcbiAgICAvLyAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9IFt0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcywgcGFuZWxDbGFzc107XG4gICAgLy8gICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyAgICAgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3NbcGFuZWxDbGFzc10gPSB0cnVlO1xuICAgIC8vICAgfVxuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9IHBhbmVsQ2xhc3M7XG4gICAgLy8gfVxuXG4gICAgLy8gc2V0IGN1c3RvbSBub3ZvLW9wdGlvbiBjbGFzcyBpZiB0aGUgY29tcG9uZW50IHdhcyBwbGFjZWQgaW5zaWRlIGEgbm92by1vcHRpb25cbiAgICBpZiAodGhpcy5ub3ZvT3B0aW9uKSB7XG4gICAgICB0aGlzLm5vdm9PcHRpb24ubm92b0luZXJ0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubm92b09wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdjb250YWlucy1ub3ZvLXNlbGVjdC1zZWFyY2gnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignPG5vdm8tc2VsZWN0LXNlYXJjaD4gbXVzdCBiZSBwbGFjZWQgaW5zaWRlIGEgPG5vdm8tb3B0aW9uPiBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gd2hlbiB0aGUgc2VsZWN0IGRyb3Bkb3duIHBhbmVsIGlzIG9wZW5lZCBvciBjbG9zZWRcbiAgICB0aGlzLm5vdm9TZWxlY3Qub3BlbmVkQ2hhbmdlLnBpcGUoZGVsYXkoMSksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKG9wZW5lZCkgPT4ge1xuICAgICAgaWYgKG9wZW5lZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgLy8gZm9jdXMgdGhlIHNlYXJjaCBmaWVsZCB3aGVuIG9wZW5pbmdcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVJbml0aWFsRm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjbGVhciBpdCB3aGVuIGNsb3NpbmdcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJTZWFyY2hJbnB1dCkge1xuICAgICAgICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHNldCB0aGUgZmlyc3QgaXRlbSBhY3RpdmUgYWZ0ZXIgdGhlIG9wdGlvbnMgY2hhbmdlZFxuICAgIHRoaXMubm92b1NlbGVjdC5vcGVuZWRDaGFuZ2VcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Ll9rZXlNYW5hZ2VyKSB7XG4gICAgICAgICAgdGhpcy5ub3ZvU2VsZWN0Ll9rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWRqdXN0U2Nyb2xsVG9wVG9GaXRBY3RpdmVPcHRpb25JbnRvVmlldygpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnX2tleU1hbmFnZXIgd2FzIG5vdCBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnM7XG5cbiAgICAgICAgLy8gQ2xvc3VyZSB2YXJpYWJsZSBmb3IgdHJhY2tpbmcgdGhlIG1vc3QgcmVjZW50IGZpcnN0IG9wdGlvbi5cbiAgICAgICAgLy8gSW4gb3JkZXIgdG8gYXZvaWQgYXZvaWQgY2F1c2luZyB0aGUgbGlzdCB0b1xuICAgICAgICAvLyBzY3JvbGwgdG8gdGhlIHRvcCB3aGVuIG9wdGlvbnMgYXJlIGFkZGVkIHRvIHRoZSBib3R0b20gb2ZcbiAgICAgICAgLy8gdGhlIGxpc3QgKGVnOiBpbmZpbml0ZSBzY3JvbGwpLCB3ZSBjb21wYXJlIG9ubHlcbiAgICAgICAgLy8gdGhlIGNoYW5nZXMgdG8gdGhlIGZpcnN0IG9wdGlvbnMgdG8gZGV0ZXJtaW5lIGlmIHdlXG4gICAgICAgIC8vIHNob3VsZCBzZXQgdGhlIGZpcnN0IGl0ZW0gYXMgYWN0aXZlLlxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIHVubmVjZXNzYXJ5IHNjcm9sbGluZyB0byB0aGUgdG9wIG9mIHRoZSBsaXN0XG4gICAgICAgIC8vIHdoZW4gb3B0aW9ucyBhcmUgYXBwZW5kZWQsIGJ1dCBhbGxvd3MgdGhlIGZpcnN0IGl0ZW1cbiAgICAgICAgLy8gaW4gdGhlIGxpc3QgdG8gYmUgc2V0IGFzIGFjdGl2ZSBieSBkZWZhdWx0IHdoZW4gdGhlcmVcbiAgICAgICAgLy8gaXMgbm8gYWN0aXZlIHNlbGVjdGlvblxuICAgICAgICBsZXQgcHJldmlvdXNGaXJzdE9wdGlvbiA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpW3RoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpXTtcblxuICAgICAgICB0aGlzLl9vcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAvLyBhdm9pZCBcImV4cHJlc3Npb24gaGFzIGJlZW4gY2hhbmdlZFwiIGVycm9yXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBRdWVyeUxpc3QgdG8gYW4gYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgLy8gVGhlIHRydWUgZmlyc3QgaXRlbSBpcyBvZmZzZXQgYnkgMVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEZpcnN0T3B0aW9uID0gb3B0aW9uc1t0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKV07XG5cbiAgICAgICAgICAgIGNvbnN0IGtleU1hbmFnZXIgPSB0aGlzLm5vdm9TZWxlY3QuX2tleU1hbmFnZXI7XG4gICAgICAgICAgICBpZiAoa2V5TWFuYWdlciAmJiB0aGlzLm5vdm9TZWxlY3QucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgIC8vIHNldCBmaXJzdCBpdGVtIGFjdGl2ZSBhbmQgaW5wdXQgd2lkdGhcblxuICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGZpcnN0IG9wdGlvbiBpbiB0aGVzZSBjaGFuZ2VzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cy5cbiAgICAgICAgICAgICAgY29uc3QgZmlyc3RPcHRpb25Jc0NoYW5nZWQgPSAhdGhpcy5ub3ZvU2VsZWN0LmNvbXBhcmVXaXRoKHByZXZpb3VzRmlyc3RPcHRpb24sIGN1cnJlbnRGaXJzdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgLy8gQ0FTRTogVGhlIGZpcnN0IG9wdGlvbiBpcyBkaWZmZXJlbnQgbm93LlxuICAgICAgICAgICAgICAvLyBJbmRpY2lhdGVzIHdlIHNob3VsZCBzZXQgaXQgYXMgYWN0aXZlIGFuZCBzY3JvbGwgdG8gdGhlIHRvcC5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGZpcnN0T3B0aW9uSXNDaGFuZ2VkIHx8XG4gICAgICAgICAgICAgICAgIWtleU1hbmFnZXIuYWN0aXZlSXRlbSB8fFxuICAgICAgICAgICAgICAgICFvcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gdGhpcy5ub3ZvU2VsZWN0LmNvbXBhcmVXaXRoKG9wdGlvbiwga2V5TWFuYWdlci5hY3RpdmVJdGVtKSlcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAga2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIHdhaXQgZm9yIHBhbmVsIHdpZHRoIGNoYW5nZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlU2Nyb2xsVG9BY3RpdmVPbk9wdGlvbnNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RTY3JvbGxUb3BUb0ZpdEFjdGl2ZU9wdGlvbkludG9WaWV3KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIG91ciByZWZlcmVuY2VcbiAgICAgICAgICAgIHByZXZpb3VzRmlyc3RPcHRpb24gPSBjdXJyZW50Rmlyc3RPcHRpb247XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBhZGQgb3IgcmVtb3ZlIGNzcyBjbGFzcyBkZXBlbmRpbmcgb24gd2hldGhlciB0byBzaG93IHRoZSBubyBlbnRyaWVzIGZvdW5kIG1lc3NhZ2VcbiAgICAvLyBub3RlOiB0aGlzIGlzIGhhY2t5XG4gICAgdGhpcy5fc2hvd05vRW50cmllc0ZvdW5kJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKHNob3dOb0VudHJpZXNGb3VuZCkgPT4ge1xuICAgICAgLy8gc2V0IG5vIGVudHJpZXMgZm91bmQgY2xhc3Mgb24gbWF0IG9wdGlvblxuICAgICAgaWYgKHRoaXMubm92b09wdGlvbikge1xuICAgICAgICBpZiAoc2hvd05vRW50cmllc0ZvdW5kKSB7XG4gICAgICAgICAgdGhpcy5ub3ZvT3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ25vdm8tc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ub3ZvT3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoJ25vdm8tc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHJlc2l6ZSB0aGUgaW5wdXQgd2lkdGggd2hlbiB0aGUgdmlld3BvcnQgaXMgcmVzaXplZCwgaS5lLiB0aGUgdHJpZ2dlciB3aWR0aCBjb3VsZCBwb3RlbnRpYWxseSBiZSByZXNpemVkXG4gICAgdGhpcy5fdmlld3BvcnRSdWxlclxuICAgICAgLmNoYW5nZSgpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0LnBhbmVsT3Blbikge1xuICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGlmICghdGhpcy5hbGxvd0Rlc2VsZWN0RHVyaW5nRmlsdGVyKSB7XG4gICAgICB0aGlzLmluaXRNdWx0aXBsZUhhbmRsaW5nKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zTGlzdCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIHVwZGF0ZSB2aWV3IHdoZW4gYXZhaWxhYmxlIG9wdGlvbnMgY2hhbmdlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgX2VtaXRTZWxlY3RBbGxCb29sZWFuVG9QYXJlbnQoc3RhdGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnRvZ2dsZUFsbC5lbWl0KHN0YXRlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICBfaXNUb2dnbGVBbGxDaGVja2JveFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm92b1NlbGVjdC5tdWx0aXBsZSAmJiB0aGlzLnNob3dUb2dnbGVBbGxDaGVja2JveDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBrZXkgZG93biBldmVudCB3aXRoIE5vdm9TZWxlY3RFbGVtZW50LlxuICAgKiBBbGxvd3MgZS5nLiBzZWxlY3Rpbmcgd2l0aCBlbnRlciBrZXksIG5hdmlnYXRpb24gd2l0aCBhcnJvdyBrZXlzLCBldGMuXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBQcmV2ZW50IHByb3BhZ2F0aW9uIGZvciBhbGwgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgaW4gb3JkZXIgdG8gYXZvaWQgc2VsZWN0aW9uIGlzc3Vlc1xuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgJiYgZXZlbnQua2V5Lmxlbmd0aCA9PT0gMSkgfHxcbiAgICAgIGlzQWxwaGFOdW1lcmljKGV2ZW50LmtleSkgfHxcbiAgICAgIGV2ZW50LmtleSA9PT0gS2V5LlNwYWNlIHx8XG4gICAgICAodGhpcy5wcmV2ZW50SG9tZUVuZEtleVByb3BhZ2F0aW9uICYmIChldmVudC5rZXkgPT09IEtleS5Ib21lIHx8IGV2ZW50LmtleSA9PT0gS2V5LkVuZCkpXG4gICAgKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlICYmIGV2ZW50LmtleSAmJiBldmVudC5rZXkgPT09IEtleS5FbnRlcikge1xuICAgICAgLy8gUmVnYWluIGZvY3VzIGFmdGVyIG11bHRpc2VsZWN0LCBzbyB3ZSBjYW4gZnVydGhlciB0eXBlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvY3VzKCkpO1xuICAgIH1cblxuICAgIC8vIFNwZWNpYWwgY2FzZSBpZiBjbGljayBFc2NhcGUsIGlmIGlucHV0IGlzIGVtcHR5LCBjbG9zZSB0aGUgZHJvcGRvd24sIGlmIG5vdCwgZW1wdHkgb3V0IHRoZSBzZWFyY2ggZmllbGRcbiAgICBpZiAodGhpcy5lbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZCA9PT0gdHJ1ZSAmJiBldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgJiYgdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5fcmVzZXQodHJ1ZSk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUga2V5IHVwIGV2ZW50IHdpdGggTm92b1NlbGVjdEVsZW1lbnQuXG4gICAqIEFsbG93cyBlLmcuIHRoZSBhbm5vdW5jaW5nIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlRGVzY2VuZGFudCBieSBzY3JlZW4gcmVhZGVycy5cbiAgICovXG4gIF9oYW5kbGVLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd1VwIHx8IGV2ZW50LmtleSA9PT0gS2V5LkFycm93RG93bikge1xuICAgICAgY29uc3QgYXJpYUFjdGl2ZURlc2NlbmRhbnRJZCA9IHRoaXMubm92b1NlbGVjdC5fZ2V0QXJpYUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBhcmlhQWN0aXZlRGVzY2VuZGFudElkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlRGVzY2VuZGFudCA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpW2luZGV4XTtcbiAgICAgICAgdGhpcy5saXZlQW5ub3VuY2VyLmFubm91bmNlKFxuICAgICAgICAgIGFjdGl2ZURlc2NlbmRhbnQudmlld1ZhbHVlICsgJyAnICsgdGhpcy5nZXRBcmlhSW5kZXgoaW5kZXgpICsgdGhpcy5pbmRleEFuZExlbmd0aFNjcmVlblJlYWRlclRleHQgKyB0aGlzLmdldEFyaWFMZW5ndGgoKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBvcHRpb24sIHRha2luZyB0aGUgb2Zmc2V0IHRvIGxlbmd0aCBpbnRvIGFjY291bnQuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgICBDYXNlIDEgW1NlYXJjaCwgMSwgMiwgM10gd2lsbCBoYXZlIG9mZnNldCBvZiAxLCBkdWUgdG8gc2VhcmNoIGFuZCB3aWxsIHJlYWQgaW5kZXggb2YgdG90YWwuXG4gICAqICAgIENhc2UgMiBbMSwgMiwgM10gd2lsbCBoYXZlIG9mZnNldCBvZiAwIGFuZCB3aWxsIHJlYWQgaW5kZXggKzEgb2YgdG90YWwuXG4gICAqL1xuICBnZXRBcmlhSW5kZXgob3B0aW9uSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpID09PSAwKSB7XG4gICAgICByZXR1cm4gb3B0aW9uSW5kZXggKyAxO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uSW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIG9wdGlvbnMsIHRha2luZyB0aGUgb2Zmc2V0IHRvIGxlbmd0aCBpbnRvIGFjY291bnQuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgICBDYXNlIDEgW1NlYXJjaCwgMSwgMiwgM10gd2lsbCBoYXZlIGxlbmd0aCBvZiBvcHRpb25zLmxlbmd0aCAtMSwgZHVlIHRvIHNlYXJjaC5cbiAgICogICAgQ2FzZSAyIFsxLCAyLCAzXSB3aWxsIGhhdmUgbGVuZ3RoIG9mIG9wdGlvbnMubGVuZ3RoLlxuICAgKi9cbiAgZ2V0QXJpYUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKS5sZW5ndGggLSB0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2xhc3RFeHRlcm5hbElucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gdGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSksXG4gICAgICAgIHRhcCgoKSA9PiAodGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSA9IHVuZGVmaW5lZCkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZm4pO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBzZWFyY2ggaW5wdXQgZmllbGRcbiAgICovXG4gIHB1YmxpYyBfZm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFNlbGVjdElucHV0IHx8ICF0aGlzLm5vdm9TZWxlY3QucGFuZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2F2ZSBhbmQgcmVzdG9yZSBzY3JvbGxUb3Agb2YgcGFuZWwsIHNpbmNlIGl0IHdpbGwgYmUgcmVzZXQgYnkgZm9jdXMoKVxuICAgIC8vIG5vdGU6IHRoaXMgaXMgaGFja3lcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHBhbmVsLnNjcm9sbFRvcDtcblxuICAgIC8vIGZvY3VzXG4gICAgdGhpcy5zZWFyY2hTZWxlY3RJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICBwYW5lbC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjdXJyZW50IHNlYXJjaCB2YWx1ZVxuICAgKiBAcGFyYW0gZm9jdXMgd2hldGhlciB0byBmb2N1cyBhZnRlciByZXNldHRpbmdcbiAgICovXG4gIHB1YmxpYyBfcmVzZXQoZm9jdXM/OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9ybUNvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIGlmIChmb2N1cykge1xuICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgaGFuZGxpbmcgPG5vdm8tc2VsZWN0IFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAqIE5vdGU6IHRvIGltcHJvdmUgdGhpcyBjb2RlLCBub3ZvLXNlbGVjdCBzaG91bGQgYmUgZXh0ZW5kZWQgdG8gYWxsb3cgZGlzYWJsaW5nIHJlc2V0dGluZyB0aGUgc2VsZWN0aW9uIHdoaWxlIGZpbHRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgaW5pdE11bHRpcGxlSGFuZGxpbmcoKSB7XG4gICAgaWYgKCF0aGlzLm5vdm9TZWxlY3QubmdDb250cm9sKSB7XG4gICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIC8vIG5vdGU6IHRoZSBhY2Nlc3MgdG8gbm92b1NlbGVjdC5uZ0NvbnRyb2wgKGluc3RlYWQgb2Ygbm92b1NlbGVjdC52YWx1ZSAvIG5vdm9TZWxlY3QudmFsdWVDaGFuZ2VzKVxuICAgICAgICAvLyBpcyBuZWNlc3NhcnkgdG8gcHJvcGVybHkgd29yayBpbiBtdWx0aS1zZWxlY3Rpb24gbW9kZS5cbiAgICAgICAgY29uc29sZS5lcnJvcigndGhlIG5vdm8tc2VsZWN0IGNvbnRhaW5pbmcgbm92by1zZWxlY3Qtc2VhcmNoIG11c3QgaGF2ZSBhIG5nTW9kZWwgb3IgZm9ybUNvbnRyb2wgZGlyZWN0aXZlIHdoZW4gbXVsdGlwbGU9dHJ1ZScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBpZiA8bm92by1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAvLyBzdG9yZSBwcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyBhbmQgcmVzdG9yZSB0aGVtIHdoZW4gdGhleSBhcmUgZGVzZWxlY3RlZFxuICAgIC8vIGJlY2F1c2UgdGhlIG9wdGlvbiBpcyBub3QgYXZhaWxhYmxlIHdoaWxlIHdlIGFyZSBjdXJyZW50bHkgZmlsdGVyaW5nXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzID0gdGhpcy5ub3ZvU2VsZWN0Lm5nQ29udHJvbC52YWx1ZTtcblxuICAgIHRoaXMubm92b1NlbGVjdC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgodmFsdWVzKSA9PiB7XG4gICAgICBsZXQgcmVzdG9yZVNlbGVjdGVkVmFsdWVzID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAodGhpcy5hbHdheXNSZXN0b3JlU2VsZWN0ZWRPcHRpb25zTXVsdGkgfHwgKHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlICYmIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlLmxlbmd0aCkpICYmXG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzICYmXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICghdmFsdWVzIHx8ICFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSAodGhpcy5ub3ZvU2VsZWN0Lm9wdGlvbnMgfHwgW10pLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcy5mb3JFYWNoKChwcmV2aW91c1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICF2YWx1ZXMuc29tZSgodikgPT4gdGhpcy5ub3ZvU2VsZWN0LmNvbXBhcmVXaXRoKHYsIHByZXZpb3VzVmFsdWUpKSAmJlxuICAgICAgICAgICAgICAhb3B0aW9uVmFsdWVzLnNvbWUoKHYpID0+IHRoaXMubm92b1NlbGVjdC5jb21wYXJlV2l0aCh2LCBwcmV2aW91c1ZhbHVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvLyBpZiBhIHZhbHVlIHRoYXQgd2FzIHNlbGVjdGVkIGJlZm9yZSBpcyBkZXNlbGVjdGVkIGFuZCBub3QgZm91bmQgaW4gdGhlIG9wdGlvbnMsIGl0IHdhcyBkZXNlbGVjdGVkXG4gICAgICAgICAgICAgIC8vIGR1ZSB0byB0aGUgZmlsdGVyaW5nLCBzbyB3ZSByZXN0b3JlIGl0LlxuICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgICAgICAgcmVzdG9yZVNlbGVjdGVkVmFsdWVzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzID0gdmFsdWVzO1xuXG4gICAgICBpZiAocmVzdG9yZVNlbGVjdGVkVmFsdWVzKSB7XG4gICAgICAgIC8vIFRPRE86IEZpeCB0aGlzXG4gICAgICAgIC8vIHRoaXMubm92b1NlbGVjdC5fb25DaGFuZ2UodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbiBpbnRvIHRoZSB2aWV3IGlmIGl0IGlzIG5vdCB5ZXQgdmlzaWJsZS5cbiAgICovXG4gIHByaXZhdGUgYWRqdXN0U2Nyb2xsVG9wVG9GaXRBY3RpdmVPcHRpb25JbnRvVmlldygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub3ZvU2VsZWN0LnBhbmVsICYmIHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBub3ZvT3B0aW9uSGVpZ2h0ID0gdGhpcy5nZXROb3ZvT3B0aW9uSGVpZ2h0KCk7XG4gICAgICBjb25zdCBhY3RpdmVPcHRpb25JbmRleCA9IHRoaXMubm92b1NlbGVjdC5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcbiAgICAgIGNvbnN0IGxhYmVsQ291bnQgPSBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihhY3RpdmVPcHRpb25JbmRleCwgdGhpcy5ub3ZvU2VsZWN0LmNvbnRlbnRPcHRpb25zLCB0aGlzLm5vdm9TZWxlY3Qub3B0aW9uR3JvdXBzKTtcbiAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgaXMgaW4gYSBOb3ZvT3B0aW9uLCB0aGUgYWN0aXZlSXRlbUluZGV4IHdpbGwgYmUgb2Zmc2V0IGJ5IG9uZS5cbiAgICAgIGNvbnN0IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ID0gKHRoaXMubm92b09wdGlvbiA/IC0xIDogMCkgKyBsYWJlbENvdW50ICsgYWN0aXZlT3B0aW9uSW5kZXg7XG4gICAgICBjb25zdCBjdXJyZW50U2Nyb2xsVG9wID0gdGhpcy5ub3ZvU2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICBjb25zdCBzZWFyY2hJbnB1dEhlaWdodCA9IHRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICBjb25zdCBhbW91bnRPZlZpc2libGVPcHRpb25zID0gTWF0aC5mbG9vcigoU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgLSBzZWFyY2hJbnB1dEhlaWdodCkgLyBub3ZvT3B0aW9uSGVpZ2h0KTtcblxuICAgICAgY29uc3QgaW5kZXhPZkZpcnN0VmlzaWJsZU9wdGlvbiA9IE1hdGgucm91bmQoKGN1cnJlbnRTY3JvbGxUb3AgKyBzZWFyY2hJbnB1dEhlaWdodCkgLyBub3ZvT3B0aW9uSGVpZ2h0KSAtIDE7XG5cbiAgICAgIGlmIChpbmRleE9mRmlyc3RWaXNpYmxlT3B0aW9uID49IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3KSB7XG4gICAgICAgIHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ICogbm92b09wdGlvbkhlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXhPZkZpcnN0VmlzaWJsZU9wdGlvbiArIGFtb3VudE9mVmlzaWJsZU9wdGlvbnMgPD0gaW5kZXhPZk9wdGlvblRvRml0SW50b1ZpZXcpIHtcbiAgICAgICAgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID1cbiAgICAgICAgICAoaW5kZXhPZk9wdGlvblRvRml0SW50b1ZpZXcgKyAxKSAqIG5vdm9PcHRpb25IZWlnaHQgLSAoU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgLSBzZWFyY2hJbnB1dEhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBTZXQgdGhlIHdpZHRoIG9mIHRoZSBpbm5lclNlbGVjdFNlYXJjaCB0byBmaXQgZXZlbiBjdXN0b20gc2Nyb2xsYmFyc1xuICAgKiAgQW5kIHN1cHBvcnQgYWxsIE9wZXJhdGlvbiBTeXN0ZW1zXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlSW5wdXRXaWR0aCgpIHtcbiAgICBpZiAoIXRoaXMuaW5uZXJTZWxlY3RTZWFyY2ggfHwgIXRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHBhbmVsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50KSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3ZvLXNlbGVjdC1wYW5lbCcpKSB7XG4gICAgICAgIHBhbmVsRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFuZWxFbGVtZW50KSB7XG4gICAgICB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBwYW5lbEVsZW1lbnQuY2xpZW50V2lkdGggKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Tm92b09wdGlvbkhlaWdodCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucy5maXJzdC5fZ2V0SG9zdEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBvZmZzZXQgdG8gbGVuZ3RoIHRoYXQgY2FuIGJlIGNhdXNlZCBieSB0aGUgb3B0aW9uYWwgbm92b09wdGlvbiB1c2VkIGFzIGEgc2VhcmNoIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMubm92b09wdGlvbikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxufVxuIiwiPG5vdm8tZmllbGRcbiAgI2lubmVyU2VsZWN0U2VhcmNoXG4gIGNsYXNzPVwibm92by1zZWxlY3Qtc2VhcmNoLWlubmVyXCJcbiAgW25nQ2xhc3NdPVwieydub3ZvLXNlbGVjdC1zZWFyY2gtaW5uZXItbXVsdGlwbGUnOiBub3ZvU2VsZWN0Lm11bHRpcGxlLCAnbm92by1zZWxlY3Qtc2VhcmNoLWlubmVyLXRvZ2dsZS1hbGwnOiBfaXNUb2dnbGVBbGxDaGVja2JveFZpc2libGUoKSB9XCI+XG5cbiAgPG5vdm8tY2hlY2tib3ggKm5nSWY9XCJfaXNUb2dnbGVBbGxDaGVja2JveFZpc2libGUoKVwiXG4gICAgbm92b1ByZWZpeFxuICAgIFtjb2xvcl09XCIncHJpbWFyeSdcIlxuICAgIGNsYXNzPVwibm92by1zZWxlY3Qtc2VhcmNoLXRvZ2dsZS1hbGwtY2hlY2tib3hcIlxuICAgIFtjaGVja2VkXT1cInRvZ2dsZUFsbENoZWNrYm94Q2hlY2tlZFwiXG4gICAgW2luZGV0ZXJtaW5hdGVdPVwidG9nZ2xlQWxsQ2hlY2tib3hJbmRldGVybWluYXRlXCJcbiAgICBbdG9vbHRpcF09XCJ0b2dnbGVBbGxDaGVja2JveFRvb2x0aXBNZXNzYWdlXCJcbiAgICB0b29sdGlwQ2xhc3M9XCJuZ3gtbm92by1zZWxlY3Qtc2VhcmNoLXRvZ2dsZS1hbGwtdG9vbHRpcFwiXG4gICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29nbGVBbGxDaGVja2JveFRvb2x0aXBQb3NpdGlvblwiXG4gICAgKGNoYW5nZSk9XCJfZW1pdFNlbGVjdEFsbEJvb2xlYW5Ub1BhcmVudCgkZXZlbnQuY2hlY2tlZClcIj48L25vdm8tY2hlY2tib3g+XG5cbiAgPG5vdm8taWNvblxuICAgIG5vdm9QcmVmaXhcbiAgICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1pY29uXCI+c2VhcmNoPC9ub3ZvLWljb24+XG5cbiAgPGlucHV0IGNsYXNzPVwibm92by1zZWxlY3Qtc2VhcmNoLWlucHV0XCJcbiAgICAjc2VhcmNoU2VsZWN0SW5wdXRcbiAgICBub3ZvSW5wdXRcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgIFt0eXBlXT1cInR5cGVcIlxuICAgIFtmb3JtQ29udHJvbF09XCJfZm9ybUNvbnRyb2xcIlxuICAgIChrZXlkb3duKT1cIl9oYW5kbGVLZXlkb3duKCRldmVudClcIlxuICAgIChrZXl1cCk9XCJfaGFuZGxlS2V5dXAoJGV2ZW50KVwiXG4gICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlckxhYmVsXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIC8+XG5cbiAgPG5vdm8tc3Bpbm5lciAqbmdJZj1cInNlYXJjaGluZ1wiXG4gICAgbm92b1N1ZmZpeFxuICAgIGNsYXNzPVwibm92by1zZWxlY3Qtc2VhcmNoLXNwaW5uZXJcIlxuICAgIGRpYW1ldGVyPVwiMTZcIj48L25vdm8tc3Bpbm5lcj5cblxuICA8bm92by1idXR0b25cbiAgICBub3ZvU3VmZml4XG4gICAgKm5nSWY9XCIhaGlkZUNsZWFyU2VhcmNoQnV0dG9uICYmIHZhbHVlICYmICFzZWFyY2hpbmdcIlxuICAgIGFyaWEtbGFiZWw9XCJDbGVhclwiXG4gICAgKGNsaWNrKT1cIl9yZXNldCh0cnVlKVwiXG4gICAgdGhlbWU9XCJpY29uXCJcbiAgICBzaXplPVwic21hbGxcIlxuICAgIGNsYXNzPVwibm92by1zZWxlY3Qtc2VhcmNoLWNsZWFyXCI+XG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCJjbGVhckljb247IGVsc2UgZGVmYXVsdEljb25cIiBzZWxlY3Q9XCJbbm92b1NlbGVjdFNlYXJjaENsZWFyXVwiPjwvbmctY29udGVudD5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRJY29uPlxuICAgICAgPG5vdm8taWNvbj5jbG9zZTwvbm92by1pY29uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbm92by1idXR0b24+XG5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm5vdm8tc2VsZWN0LXNlYXJjaC1jdXN0b20taGVhZGVyLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG5cbjwvbm92by1maWVsZD5cblxuPGRpdiAqbmdJZj1cIl9zaG93Tm9FbnRyaWVzRm91bmQkIHwgYXN5bmNcIlxuICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kXCI+XG4gIHt7bm9FbnRyaWVzRm91bmRMYWJlbH19XG48L2Rpdj4iXX0=