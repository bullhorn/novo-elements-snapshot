import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, ViewChild, } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { delay, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { isAlphaNumeric } from 'novo-elements/utils';
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
        this._options$ = new BehaviorSubject(null);
        this.optionsList$ = this._options$.pipe(switchMap((_options) => _options
            ? _options.changes.pipe(map((options) => options.toArray()), startWith(_options.toArray()))
            : of(null)));
        this.optionsLength$ = this.optionsList$.pipe(map((options) => (options ? options.length : 0)));
        this._formControl = new FormControl('');
        /** whether to show the no entries found message */
        this._showNoEntriesFound$ = combineLatest([this._formControl.valueChanges, this.optionsLength$]).pipe(map(([value, optionsLength]) => this.noEntriesFoundLabel && value && optionsLength === this.getOptionsLengthOffset()));
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
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
        this.initMultipleHandling();
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
                    const optionValues = this.novoSelect.options.map((option) => option.value);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSelectSearchComponent, deps: [{ token: NovoSelectElement }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: NovoOption, optional: true }, { token: i2.LiveAnnouncer }, { token: NovoFieldElement, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoSelectSearchComponent, selector: "novo-select-search", inputs: { name: "name", placeholderLabel: "placeholderLabel", type: "type", noEntriesFoundLabel: "noEntriesFoundLabel", indexAndLengthScreenReaderText: "indexAndLengthScreenReaderText", clearSearchInput: "clearSearchInput", searching: "searching", disableInitialFocus: "disableInitialFocus", enableClearOnEscapePressed: "enableClearOnEscapePressed", preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation", disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged", ariaLabel: "ariaLabel", showToggleAllCheckbox: "showToggleAllCheckbox", toggleAllCheckboxChecked: "toggleAllCheckboxChecked", toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate", toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage", toogleAllCheckboxTooltipPosition: "toogleAllCheckboxTooltipPosition", hideClearSearchButton: "hideClearSearchButton", alwaysRestoreSelectedOptionsMulti: "alwaysRestoreSelectedOptionsMulti" }, outputs: { toggleAll: "toggleAll" }, host: { properties: { "class.novo-select-search-inside-novo-option": "this.isInsideNovoOption" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NovoSelectSearchComponent),
                multi: true,
            },
        ], queries: [{ propertyName: "clearIcon", first: true, predicate: NovoSelectSearchClearDirective, descendants: true }], viewQueries: [{ propertyName: "searchSelectInput", first: true, predicate: ["searchSelectInput"], descendants: true, read: ElementRef, static: true }, { propertyName: "innerSelectSearch", first: true, predicate: ["innerSelectSearch"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<novo-field\n  #innerSelectSearch\n  class=\"novo-select-search-inner\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    novoPrefix\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon\n    novoPrefix\n    class=\"novo-select-search-icon\">search</novo-icon>\n\n  <input class=\"novo-select-search-input\"\n    #searchSelectInput\n    novoInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n\n  <novo-spinner *ngIf=\"searching\"\n    novoSuffix\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    novoSuffix\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</novo-field>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [":host{display:block;width:100%}.novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{width:100%;background-color:var(--background-bright);-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-icon{padding:var(--spacing-md)}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-no-entries-found{padding:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3.6rem;line-height:3.6rem}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option.contains-novo-select-search{padding:0!important;border:none}::ng-deep .novo-option.contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option.contains-novo-select-search .novo-option-pseudo-checkbox{display:none}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i5.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "directive", type: i7.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i8.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i9.NovoSpinnerElement, selector: "novo-spinner", inputs: ["theme", "color", "size", "inverse"] }, { kind: "directive", type: i10.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { kind: "component", type: i11.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i11.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { kind: "directive", type: i11.NovoFieldPrefixDirective, selector: "[novoPrefix]" }, { kind: "directive", type: i11.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoSelectSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-select-search', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NovoSelectSearchComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<novo-field\n  #innerSelectSearch\n  class=\"novo-select-search-inner\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    novoPrefix\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon\n    novoPrefix\n    class=\"novo-select-search-icon\">search</novo-icon>\n\n  <input class=\"novo-select-search-input\"\n    #searchSelectInput\n    novoInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n\n  <novo-spinner *ngIf=\"searching\"\n    novoSuffix\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    novoSuffix\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</novo-field>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [":host{display:block;width:100%}.novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{width:100%;background-color:var(--background-bright);-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-icon{padding:var(--spacing-md)}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-no-entries-found{padding:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3.6rem;line-height:3.6rem}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option.contains-novo-select-search{padding:0!important;border:none}::ng-deep .novo-option.contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option.contains-novo-select-search .novo-option-pseudo-checkbox{display:none}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i12.NovoSelectElement, decorators: [{
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
                }] }]; }, propDecorators: { name: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoL3NlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0LXNlYXJjaC9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0UsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRyxPQUFPLEVBQUUsY0FBYyxFQUFPLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFGLE9BQU8sRUFBRSxnQkFB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LElBQUksRUFBRTtnQkFHRCxTQUFTO3NCQUF6RSxZQUFZO3VCQUFDLDhCQUE4QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFHM0Qsa0JBQWtCO3NCQURyQixXQUFXO3VCQUFDLDZDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNBbHBoYU51bWVyaWMsIEtleSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b09wdGlvbiwgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24gfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0RWxlbWVudCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcbmltcG9ydCB7IE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC1jbGVhci5kaXJlY3RpdmUnO1xuXG4vKiogVGhlIG1heCBoZWlnaHQgb2YgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwuICovXG5jb25zdCBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCA9IDI1NjtcbmxldCBhdXRvSW5jcmVtZW50ID0gMTtcbi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyBjb21wb25lbnQtc2VsZWN0b3IgKi9cbi8qKlxuICogQ29tcG9uZW50IHByb3ZpZGluZyBhbiBpbnB1dCBmaWVsZCBmb3Igc2VhcmNoaW5nIE5vdm9TZWxlY3RFbGVtZW50IG9wdGlvbnMuXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBpbnRlcmZhY2UgQmFuayB7XG4gKiAgaWQ6IHN0cmluZztcbiAqICBuYW1lOiBzdHJpbmc7XG4gKiB9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwLWRhdGEtc2VsZWN0aW9uJyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8bm92by1mb3JtLWZpZWxkPlxuICogICAgICAgPG5vdm8tc2VsZWN0IFtmb3JtQ29udHJvbF09XCJiYW5rQ3RybFwiIHBsYWNlaG9sZGVyPVwiQmFua1wiPlxuICogICAgICAgICA8bm92by1vcHRpb24+XG4gKiAgICAgICAgICAgPG5neC1ub3ZvLXNlbGVjdC1zZWFyY2ggW2Zvcm1Db250cm9sXT1cImJhbmtGaWx0ZXJDdHJsXCI+PC9uZ3gtbm92by1zZWxlY3Qtc2VhcmNoPlxuICogICAgICAgICA8L25vdm8tb3B0aW9uPlxuICogICAgICAgICA8bm92by1vcHRpb24gKm5nRm9yPVwibGV0IGJhbmsgb2YgZmlsdGVyZWRCYW5rcyB8IGFzeW5jXCIgW3ZhbHVlXT1cImJhbmsuaWRcIj5cbiAqICAgICAgICAgICB7e2JhbmsubmFtZX19XG4gKiAgICAgICAgIDwvbm92by1vcHRpb24+XG4gKiAgICAgICA8L25vdm8tc2VsZWN0PlxuICogICAgIDwvbm92by1mb3JtLWZpZWxkPlxuICogICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIERhdGFTZWxlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gKlxuICogICAvLyBjb250cm9sIGZvciB0aGUgc2VsZWN0ZWQgYmFua1xuICogICBwdWJsaWMgYmFua0N0cmw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gKiAgIC8vIGNvbnRyb2wgZm9yIHRoZSBOb3ZvU2VsZWN0RWxlbWVudCBmaWx0ZXIga2V5d29yZFxuICogICBwdWJsaWMgYmFua0ZpbHRlckN0cmw6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gKlxuICogICAvLyBsaXN0IG9mIGJhbmtzXG4gKiAgIHByaXZhdGUgYmFua3M6IEJhbmtbXSA9IFt7bmFtZTogJ0JhbmsgQScsIGlkOiAnQSd9LCB7bmFtZTogJ0JhbmsgQicsIGlkOiAnQid9LCB7bmFtZTogJ0JhbmsgQycsIGlkOiAnQyd9XTtcbiAqICAgLy8gbGlzdCBvZiBiYW5rcyBmaWx0ZXJlZCBieSBzZWFyY2gga2V5d29yZFxuICogICBwdWJsaWMgZmlsdGVyZWRCYW5rczogUmVwbGF5U3ViamVjdDxCYW5rW10+ID0gbmV3IFJlcGxheVN1YmplY3Q8QmFua1tdPigxKTtcbiAqXG4gKiAgIC8vIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLlxuICogICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICpcbiAqXG4gKiAgIG5nT25Jbml0KCkge1xuICogICAgIC8vIGxvYWQgdGhlIGluaXRpYWwgYmFuayBsaXN0XG4gKiAgICAgdGhpcy5maWx0ZXJlZEJhbmtzLm5leHQodGhpcy5iYW5rcy5zbGljZSgpKTtcbiAqICAgICAvLyBsaXN0ZW4gZm9yIHNlYXJjaCBmaWVsZCB2YWx1ZSBjaGFuZ2VzXG4gKiAgICAgdGhpcy5iYW5rRmlsdGVyQ3RybC52YWx1ZUNoYW5nZXNcbiAqICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICogICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gKiAgICAgICAgIHRoaXMuZmlsdGVyQmFua3MoKTtcbiAqICAgICAgIH0pO1xuICogICB9XG4gKlxuICogICBuZ09uRGVzdHJveSgpIHtcbiAqICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICogICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICogICB9XG4gKlxuICogICBwcml2YXRlIGZpbHRlckJhbmtzKCkge1xuICogICAgIGlmICghdGhpcy5iYW5rcykge1xuICogICAgICAgcmV0dXJuO1xuICogICAgIH1cbiAqXG4gKiAgICAgLy8gZ2V0IHRoZSBzZWFyY2gga2V5d29yZFxuICogICAgIGxldCBzZWFyY2ggPSB0aGlzLmJhbmtGaWx0ZXJDdHJsLnZhbHVlO1xuICogICAgIGlmICghc2VhcmNoKSB7XG4gKiAgICAgICB0aGlzLmZpbHRlcmVkQmFua3MubmV4dCh0aGlzLmJhbmtzLnNsaWNlKCkpO1xuICogICAgICAgcmV0dXJuO1xuICogICAgIH0gZWxzZSB7XG4gKiAgICAgICBzZWFyY2ggPSBzZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAqICAgICB9XG4gKlxuICogICAgIC8vIGZpbHRlciB0aGUgYmFua3NcbiAqICAgICB0aGlzLmZpbHRlcmVkQmFua3MubmV4dChcbiAqICAgICAgIHRoaXMuYmFua3MuZmlsdGVyKGJhbmsgPT4gYmFuay5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gpID4gLTEpXG4gKiAgICAgKTtcbiAqICAgfVxuICogfVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNlbGVjdC1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbGVjdC1zZWFyY2guY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KCkgbmFtZSA9ICdzZWxlY3Qtc2VhcmNoLScgKyBhdXRvSW5jcmVtZW50Kys7XG4gIC8qKiBMYWJlbCBvZiB0aGUgc2VhcmNoIHBsYWNlaG9sZGVyICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyTGFiZWwgPSAnU2VhcmNoJztcblxuICAvKiogVHlwZSBvZiB0aGUgc2VhcmNoIGlucHV0IGZpZWxkICovXG4gIEBJbnB1dCgpIHR5cGUgPSAndGV4dCc7XG5cbiAgLyoqIExhYmVsIHRvIGJlIHNob3duIHdoZW4gbm8gZW50cmllcyBhcmUgZm91bmQuIFNldCB0byBudWxsIGlmIG5vIG1lc3NhZ2Ugc2hvdWxkIGJlIHNob3duLiAqL1xuICBASW5wdXQoKSBub0VudHJpZXNGb3VuZExhYmVsID0gJ05vIFJlY29yZHMgRm91bmQnO1xuXG4gIC8qKlxuICAgKiAgVGV4dCB0aGF0IGlzIGFwcGVuZGVkIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIGl0ZW0gbGFiZWwgYW5ub3VuY2VkIGJ5IHNjcmVlbiByZWFkZXJzLFxuICAgKiAgaW5mb3JtaW5nIHRoZSB1c2VyIG9mIHRoZSBjdXJyZW50IGluZGV4LCB2YWx1ZSBhbmQgdG90YWwgb3B0aW9ucy5cbiAgICogIGVnOiBCYW5rIFIgKEdlcm1hbnkpIDEgb2YgNlxuICAgKi9cbiAgQElucHV0KCkgaW5kZXhBbmRMZW5ndGhTY3JlZW5SZWFkZXJUZXh0ID0gJyBvZiAnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VhcmNoIGZpZWxkIHNob3VsZCBiZSBjbGVhcmVkIGFmdGVyIHRoZSBkcm9wZG93biBtZW51IGlzIGNsb3NlZC5cbiAgICogVXNlZnVsIGZvciBzZXJ2ZXItc2lkZSBmaWx0ZXJpbmcuXG4gICAqL1xuICBASW5wdXQoKSBjbGVhclNlYXJjaElucHV0ID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0byBzaG93IHRoZSBzZWFyY2gtaW4tcHJvZ3Jlc3MgaW5kaWNhdG9yICovXG4gIEBJbnB1dCgpIHNlYXJjaGluZyA9IGZhbHNlO1xuXG4gIC8qKiBEaXNhYmxlcyBpbml0aWFsIGZvY3VzaW5nIG9mIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBASW5wdXQoKSBkaXNhYmxlSW5pdGlhbEZvY3VzID0gZmFsc2U7XG5cbiAgLyoqIEVuYWJsZSBjbGVhciBpbnB1dCBvbiBlc2NhcGUgcHJlc3NlZCAqL1xuICBASW5wdXQoKSBlbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBob21lIC8gZW5kIGtleSBiZWluZyBwcm9wYWdhdGVkIHRvIG5vdm8tc2VsZWN0LFxuICAgKiBhbGxvd2luZyB0byBtb3ZlIHRoZSBjdXJzb3Igd2l0aGluIHRoZSBzZWFyY2ggaW5wdXQgaW5zdGVhZCBvZiBuYXZpZ2F0aW5nIHRoZSBvcHRpb25zXG4gICAqL1xuICBASW5wdXQoKSBwcmV2ZW50SG9tZUVuZEtleVByb3BhZ2F0aW9uID0gZmFsc2U7XG5cbiAgLyoqIERpc2FibGVzIHNjcm9sbGluZyB0byBhY3RpdmUgb3B0aW9ucyB3aGVuIG9wdGlvbiBsaXN0IGNoYW5nZXMuIFVzZWZ1bCBmb3Igc2VydmVyLXNpZGUgc2VhcmNoICovXG4gIEBJbnB1dCgpIGRpc2FibGVTY3JvbGxUb0FjdGl2ZU9uT3B0aW9uc0NoYW5nZWQgPSBmYWxzZTtcblxuICAvKiogQWRkcyA1MDggc2NyZWVuIHJlYWRlciBzdXBwb3J0IGZvciBzZWFyY2ggYm94ICovXG4gIEBJbnB1dCgpIGFyaWFMYWJlbCA9ICdkcm9wZG93biBzZWFyY2gnO1xuXG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgU2VsZWN0IEFsbCBDaGVja2JveCAoZm9yIG5vdm8tc2VsZWN0W211bHRpPXRydWVdKSAqL1xuICBASW5wdXQoKSBzaG93VG9nZ2xlQWxsQ2hlY2tib3ggPSBmYWxzZTtcblxuICAvKiogc2VsZWN0IGFsbCBjaGVja2JveCBjaGVja2VkIHN0YXRlICovXG4gIEBJbnB1dCgpIHRvZ2dsZUFsbENoZWNrYm94Q2hlY2tlZCA9IGZhbHNlO1xuXG4gIC8qKiBzZWxlY3QgYWxsIGNoZWNrYm94IGluZGV0ZXJtaW5hdGUgc3RhdGUgKi9cbiAgQElucHV0KCkgdG9nZ2xlQWxsQ2hlY2tib3hJbmRldGVybWluYXRlID0gZmFsc2U7XG5cbiAgLyoqIERpc3BsYXkgYSBtZXNzYWdlIGluIGEgdG9vbHRpcCBvbiB0aGUgdG9nZ2xlLWFsbCBjaGVja2JveCAqL1xuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveFRvb2x0aXBNZXNzYWdlID0gJyc7XG5cbiAgLyoqIERlZmluZSB0aGUgcG9zaXRpb24gb2YgdGhlIHRvb2x0aXAgb24gdGhlIHRvZ2dsZS1hbGwgY2hlY2tib3guICovXG4gIEBJbnB1dCgpIHRvb2dsZUFsbENoZWNrYm94VG9vbHRpcFBvc2l0aW9uOiAnbGVmdCcgfCAncmlnaHQnIHwgJ2Fib3ZlJyB8ICdiZWxvdycgfCAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYmVsb3cnO1xuXG4gIC8qKiBTaG93L0hpZGUgdGhlIHNlYXJjaCBjbGVhciBidXR0b24gb2YgdGhlIHNlYXJjaCBpbnB1dCAqL1xuICBASW5wdXQoKSBoaWRlQ2xlYXJTZWFyY2hCdXR0b24gPSBmYWxzZTtcblxuICAvKipcbiAgICogQWx3YXlzIHJlc3RvcmUgc2VsZWN0ZWQgb3B0aW9ucyBvbiBzZWxlY3Rpb25DaGFuZ2UgZm9yIG1vZGUgbXVsdGkgKGUuZy4gZm9yIGxhenkgbG9hZGluZy9pbmZpbml0eSBzY3JvbGxpbmcpLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZSwgc28gc2VsZWN0ZWQgb3B0aW9ucyBhcmUgb25seSByZXN0b3JlZCB3aGlsZSBmaWx0ZXJpbmcgaXMgYWN0aXZlLlxuICAgKi9cbiAgQElucHV0KCkgYWx3YXlzUmVzdG9yZVNlbGVjdGVkT3B0aW9uc011bHRpID0gZmFsc2U7XG5cbiAgLyoqIE91dHB1dCBlbWl0dGVyIHRvIHNlbmQgdG8gcGFyZW50IGNvbXBvbmVudCB3aXRoIHRoZSB0b2dnbGUgYWxsIGJvb2xlYW4gKi9cbiAgQE91dHB1dCgpIHRvZ2dsZUFsbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWFyY2ggaW5wdXQgZmllbGQgKi9cbiAgQFZpZXdDaGlsZCgnc2VhcmNoU2VsZWN0SW5wdXQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBzZWFyY2hTZWxlY3RJbnB1dDogRWxlbWVudFJlZjtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBzZWFyY2ggaW5wdXQgZmllbGQgKi9cbiAgQFZpZXdDaGlsZCgnaW5uZXJTZWxlY3RTZWFyY2gnLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZSB9KSBpbm5lclNlbGVjdFNlYXJjaDogRWxlbWVudFJlZjtcblxuICAvKiogUmVmZXJlbmNlIHRvIGN1c3RvbSBzZWFyY2ggaW5wdXQgY2xlYXIgaWNvbiAqL1xuICBAQ29udGVudENoaWxkKE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pIGNsZWFySWNvbjogTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubm92by1zZWxlY3Qtc2VhcmNoLWluc2lkZS1ub3ZvLW9wdGlvbicpXG4gIGdldCBpc0luc2lkZU5vdm9PcHRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5ub3ZvT3B0aW9uO1xuICB9XG5cbiAgLyoqIEN1cnJlbnQgc2VhcmNoIHZhbHVlICovXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9mb3JtQ29udHJvbC52YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9sYXN0RXh0ZXJuYWxJbnB1dFZhbHVlOiBzdHJpbmc7XG5cbiAgb25Ub3VjaGVkOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHt9O1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE5vdm9TZWxlY3RFbGVtZW50IG9wdGlvbnMgKi9cbiAgcHVibGljIHNldCBfb3B0aW9ucyhfb3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+KSB7XG4gICAgdGhpcy5fb3B0aW9ucyQubmV4dChfb3B0aW9ucyk7XG4gIH1cbiAgcHVibGljIGdldCBfb3B0aW9ucygpOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zJC5nZXRWYWx1ZSgpO1xuICB9XG4gIHB1YmxpYyBfb3B0aW9ucyQ6IEJlaGF2aW9yU3ViamVjdDxRdWVyeUxpc3Q8Tm92b09wdGlvbj4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxRdWVyeUxpc3Q8Tm92b09wdGlvbj4+KG51bGwpO1xuXG4gIHByaXZhdGUgb3B0aW9uc0xpc3QkOiBPYnNlcnZhYmxlPE5vdm9PcHRpb25bXT4gPSB0aGlzLl9vcHRpb25zJC5waXBlKFxuICAgIHN3aXRjaE1hcCgoX29wdGlvbnMpID0+XG4gICAgICBfb3B0aW9uc1xuICAgICAgICA/IF9vcHRpb25zLmNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIG1hcCgob3B0aW9ucykgPT4gb3B0aW9ucy50b0FycmF5KCkpLFxuICAgICAgICAgICAgc3RhcnRXaXRoPE5vdm9PcHRpb25bXT4oX29wdGlvbnMudG9BcnJheSgpKSxcbiAgICAgICAgICApXG4gICAgICAgIDogb2YobnVsbCksXG4gICAgKSxcbiAgKTtcblxuICBwcml2YXRlIG9wdGlvbnNMZW5ndGgkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLm9wdGlvbnNMaXN0JC5waXBlKG1hcCgob3B0aW9ucykgPT4gKG9wdGlvbnMgPyBvcHRpb25zLmxlbmd0aCA6IDApKSk7XG5cbiAgLyoqIFByZXZpb3VzbHkgc2VsZWN0ZWQgdmFsdWVzIHdoZW4gdXNpbmcgPG5vdm8tc2VsZWN0IFttdWx0aXBsZV09XCJ0cnVlXCI+Ki9cbiAgcHJpdmF0ZSBwcmV2aW91c1NlbGVjdGVkVmFsdWVzOiBhbnlbXTtcblxuICBwdWJsaWMgX2Zvcm1Db250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG5cbiAgLyoqIHdoZXRoZXIgdG8gc2hvdyB0aGUgbm8gZW50cmllcyBmb3VuZCBtZXNzYWdlICovXG4gIHB1YmxpYyBfc2hvd05vRW50cmllc0ZvdW5kJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IGNvbWJpbmVMYXRlc3QoW3RoaXMuX2Zvcm1Db250cm9sLnZhbHVlQ2hhbmdlcywgdGhpcy5vcHRpb25zTGVuZ3RoJF0pLnBpcGUoXG4gICAgbWFwKChbdmFsdWUsIG9wdGlvbnNMZW5ndGhdKSA9PiB0aGlzLm5vRW50cmllc0ZvdW5kTGFiZWwgJiYgdmFsdWUgJiYgb3B0aW9uc0xlbmd0aCA9PT0gdGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCkpLFxuICApO1xuXG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE5vdm9TZWxlY3RFbGVtZW50KSBwdWJsaWMgbm92b1NlbGVjdDogTm92b1NlbGVjdEVsZW1lbnQsXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTm92b09wdGlvbikgcHVibGljIG5vdm9PcHRpb246IE5vdm9PcHRpb24gPSBudWxsLFxuICAgIHByaXZhdGUgbGl2ZUFubm91bmNlcjogTGl2ZUFubm91bmNlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5vdm9GaWVsZEVsZW1lbnQpIHB1YmxpYyBtYXRGb3JtRmllbGQ6IE5vdm9GaWVsZEVsZW1lbnQgPSBudWxsLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gc2V0IGN1c3RvbSBwYW5lbCBjbGFzc1xuICAgIC8vIGNvbnN0IHBhbmVsQ2xhc3MgPSAnbm92by1zZWxlY3Qtc2VhcmNoLXBhbmVsJztcbiAgICAvLyBpZiAodGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MpIHtcbiAgICAvLyAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzKSkge1xuICAgIC8vICAgICAoPHN0cmluZ1tdPnRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzKS5wdXNoKHBhbmVsQ2xhc3MpO1xuICAgIC8vICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gICAgIHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzID0gW3RoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzLCBwYW5lbENsYXNzXTtcbiAgICAvLyAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzID09PSAnb2JqZWN0Jykge1xuICAgIC8vICAgICB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzc1twYW5lbENsYXNzXSA9IHRydWU7XG4gICAgLy8gICB9XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzID0gcGFuZWxDbGFzcztcbiAgICAvLyB9XG5cbiAgICAvLyBzZXQgY3VzdG9tIG5vdm8tb3B0aW9uIGNsYXNzIGlmIHRoZSBjb21wb25lbnQgd2FzIHBsYWNlZCBpbnNpZGUgYSBub3ZvLW9wdGlvblxuICAgIGlmICh0aGlzLm5vdm9PcHRpb24pIHtcbiAgICAgIHRoaXMubm92b09wdGlvbi5ub3ZvSW5lcnQgPSB0cnVlO1xuICAgICAgdGhpcy5ub3ZvT3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5zLW5vdm8tc2VsZWN0LXNlYXJjaCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCc8bm92by1zZWxlY3Qtc2VhcmNoPiBtdXN0IGJlIHBsYWNlZCBpbnNpZGUgYSA8bm92by1vcHRpb24+IGVsZW1lbnQnKTtcbiAgICB9XG5cbiAgICAvLyB3aGVuIHRoZSBzZWxlY3QgZHJvcGRvd24gcGFuZWwgaXMgb3BlbmVkIG9yIGNsb3NlZFxuICAgIHRoaXMubm92b1NlbGVjdC5vcGVuZWRDaGFuZ2UucGlwZShkZWxheSgxKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgob3BlbmVkKSA9PiB7XG4gICAgICBpZiAob3BlbmVkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAvLyBmb2N1cyB0aGUgc2VhcmNoIGZpZWxkIHdoZW4gb3BlbmluZ1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUluaXRpYWxGb2N1cykge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNsZWFyIGl0IHdoZW4gY2xvc2luZ1xuICAgICAgICBpZiAodGhpcy5jbGVhclNlYXJjaElucHV0KSB7XG4gICAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRoZSBmaXJzdCBpdGVtIGFjdGl2ZSBhZnRlciB0aGUgb3B0aW9ucyBjaGFuZ2VkXG4gICAgdGhpcy5ub3ZvU2VsZWN0Lm9wZW5lZENoYW5nZVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm5vdm9TZWxlY3QuX2tleU1hbmFnZXIpIHtcbiAgICAgICAgICB0aGlzLm5vdm9TZWxlY3QuX2tleU1hbmFnZXIuY2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hZGp1c3RTY3JvbGxUb3BUb0ZpdEFjdGl2ZU9wdGlvbkludG9WaWV3KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdfa2V5TWFuYWdlciB3YXMgbm90IGluaXRpYWxpemVkLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucztcblxuICAgICAgICAvLyBDbG9zdXJlIHZhcmlhYmxlIGZvciB0cmFja2luZyB0aGUgbW9zdCByZWNlbnQgZmlyc3Qgb3B0aW9uLlxuICAgICAgICAvLyBJbiBvcmRlciB0byBhdm9pZCBhdm9pZCBjYXVzaW5nIHRoZSBsaXN0IHRvXG4gICAgICAgIC8vIHNjcm9sbCB0byB0aGUgdG9wIHdoZW4gb3B0aW9ucyBhcmUgYWRkZWQgdG8gdGhlIGJvdHRvbSBvZlxuICAgICAgICAvLyB0aGUgbGlzdCAoZWc6IGluZmluaXRlIHNjcm9sbCksIHdlIGNvbXBhcmUgb25seVxuICAgICAgICAvLyB0aGUgY2hhbmdlcyB0byB0aGUgZmlyc3Qgb3B0aW9ucyB0byBkZXRlcm1pbmUgaWYgd2VcbiAgICAgICAgLy8gc2hvdWxkIHNldCB0aGUgZmlyc3QgaXRlbSBhcyBhY3RpdmUuXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgdW5uZWNlc3Nhcnkgc2Nyb2xsaW5nIHRvIHRoZSB0b3Agb2YgdGhlIGxpc3RcbiAgICAgICAgLy8gd2hlbiBvcHRpb25zIGFyZSBhcHBlbmRlZCwgYnV0IGFsbG93cyB0aGUgZmlyc3QgaXRlbVxuICAgICAgICAvLyBpbiB0aGUgbGlzdCB0byBiZSBzZXQgYXMgYWN0aXZlIGJ5IGRlZmF1bHQgd2hlbiB0aGVyZVxuICAgICAgICAvLyBpcyBubyBhY3RpdmUgc2VsZWN0aW9uXG4gICAgICAgIGxldCBwcmV2aW91c0ZpcnN0T3B0aW9uID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KClbdGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCldO1xuXG4gICAgICAgIHRoaXMuX29wdGlvbnMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIC8vIGF2b2lkIFwiZXhwcmVzc2lvbiBoYXMgYmVlbiBjaGFuZ2VkXCIgZXJyb3JcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIFF1ZXJ5TGlzdCB0byBhbiBhcnJheVxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpO1xuXG4gICAgICAgICAgICAvLyBUaGUgdHJ1ZSBmaXJzdCBpdGVtIGlzIG9mZnNldCBieSAxXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Rmlyc3RPcHRpb24gPSBvcHRpb25zW3RoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpXTtcblxuICAgICAgICAgICAgY29uc3Qga2V5TWFuYWdlciA9IHRoaXMubm92b1NlbGVjdC5fa2V5TWFuYWdlcjtcbiAgICAgICAgICAgIGlmIChrZXlNYW5hZ2VyICYmIHRoaXMubm92b1NlbGVjdC5wYW5lbE9wZW4pIHtcbiAgICAgICAgICAgICAgLy8gc2V0IGZpcnN0IGl0ZW0gYWN0aXZlIGFuZCBpbnB1dCB3aWR0aFxuXG4gICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZmlyc3Qgb3B0aW9uIGluIHRoZXNlIGNoYW5nZXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIHByZXZpb3VzLlxuICAgICAgICAgICAgICBjb25zdCBmaXJzdE9wdGlvbklzQ2hhbmdlZCA9ICF0aGlzLm5vdm9TZWxlY3QuY29tcGFyZVdpdGgocHJldmlvdXNGaXJzdE9wdGlvbiwgY3VycmVudEZpcnN0T3B0aW9uKTtcblxuICAgICAgICAgICAgICAvLyBDQVNFOiBUaGUgZmlyc3Qgb3B0aW9uIGlzIGRpZmZlcmVudCBub3cuXG4gICAgICAgICAgICAgIC8vIEluZGljaWF0ZXMgd2Ugc2hvdWxkIHNldCBpdCBhcyBhY3RpdmUgYW5kIHNjcm9sbCB0byB0aGUgdG9wLlxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZmlyc3RPcHRpb25Jc0NoYW5nZWQgfHxcbiAgICAgICAgICAgICAgICAha2V5TWFuYWdlci5hY3RpdmVJdGVtIHx8XG4gICAgICAgICAgICAgICAgIW9wdGlvbnMuZmluZCgob3B0aW9uKSA9PiB0aGlzLm5vdm9TZWxlY3QuY29tcGFyZVdpdGgob3B0aW9uLCBrZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBrZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gd2FpdCBmb3IgcGFuZWwgd2lkdGggY2hhbmdlc1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVTY3JvbGxUb0FjdGl2ZU9uT3B0aW9uc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFNjcm9sbFRvcFRvRml0QWN0aXZlT3B0aW9uSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgb3VyIHJlZmVyZW5jZVxuICAgICAgICAgICAgcHJldmlvdXNGaXJzdE9wdGlvbiA9IGN1cnJlbnRGaXJzdE9wdGlvbjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIGFkZCBvciByZW1vdmUgY3NzIGNsYXNzIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRvIHNob3cgdGhlIG5vIGVudHJpZXMgZm91bmQgbWVzc2FnZVxuICAgIC8vIG5vdGU6IHRoaXMgaXMgaGFja3lcbiAgICB0aGlzLl9zaG93Tm9FbnRyaWVzRm91bmQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoc2hvd05vRW50cmllc0ZvdW5kKSA9PiB7XG4gICAgICAvLyBzZXQgbm8gZW50cmllcyBmb3VuZCBjbGFzcyBvbiBtYXQgb3B0aW9uXG4gICAgICBpZiAodGhpcy5ub3ZvT3B0aW9uKSB7XG4gICAgICAgIGlmIChzaG93Tm9FbnRyaWVzRm91bmQpIHtcbiAgICAgICAgICB0aGlzLm5vdm9PcHRpb24uX2dldEhvc3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCgnbm92by1zZWxlY3Qtc2VhcmNoLW5vLWVudHJpZXMtZm91bmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5vdm9PcHRpb24uX2dldEhvc3RFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSgnbm92by1zZWxlY3Qtc2VhcmNoLW5vLWVudHJpZXMtZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcmVzaXplIHRoZSBpbnB1dCB3aWR0aCB3aGVuIHRoZSB2aWV3cG9ydCBpcyByZXNpemVkLCBpLmUuIHRoZSB0cmlnZ2VyIHdpZHRoIGNvdWxkIHBvdGVudGlhbGx5IGJlIHJlc2l6ZWRcbiAgICB0aGlzLl92aWV3cG9ydFJ1bGVyXG4gICAgICAuY2hhbmdlKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm5vdm9TZWxlY3QucGFuZWxPcGVuKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5pbml0TXVsdGlwbGVIYW5kbGluZygpO1xuXG4gICAgdGhpcy5vcHRpb25zTGlzdCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIHVwZGF0ZSB2aWV3IHdoZW4gYXZhaWxhYmxlIG9wdGlvbnMgY2hhbmdlXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgX2VtaXRTZWxlY3RBbGxCb29sZWFuVG9QYXJlbnQoc3RhdGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnRvZ2dsZUFsbC5lbWl0KHN0YXRlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICBfaXNUb2dnbGVBbGxDaGVja2JveFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm92b1NlbGVjdC5tdWx0aXBsZSAmJiB0aGlzLnNob3dUb2dnbGVBbGxDaGVja2JveDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBrZXkgZG93biBldmVudCB3aXRoIE5vdm9TZWxlY3RFbGVtZW50LlxuICAgKiBBbGxvd3MgZS5nLiBzZWxlY3Rpbmcgd2l0aCBlbnRlciBrZXksIG5hdmlnYXRpb24gd2l0aCBhcnJvdyBrZXlzLCBldGMuXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBQcmV2ZW50IHByb3BhZ2F0aW9uIGZvciBhbGwgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgaW4gb3JkZXIgdG8gYXZvaWQgc2VsZWN0aW9uIGlzc3Vlc1xuICAgIGlmIChcbiAgICAgIChldmVudC5rZXkgJiYgZXZlbnQua2V5Lmxlbmd0aCA9PT0gMSkgfHxcbiAgICAgIGlzQWxwaGFOdW1lcmljKGV2ZW50LmtleSkgfHxcbiAgICAgIGV2ZW50LmtleSA9PT0gS2V5LlNwYWNlIHx8XG4gICAgICAodGhpcy5wcmV2ZW50SG9tZUVuZEtleVByb3BhZ2F0aW9uICYmIChldmVudC5rZXkgPT09IEtleS5Ib21lIHx8IGV2ZW50LmtleSA9PT0gS2V5LkVuZCkpXG4gICAgKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlICYmIGV2ZW50LmtleSAmJiBldmVudC5rZXkgPT09IEtleS5FbnRlcikge1xuICAgICAgLy8gUmVnYWluIGZvY3VzIGFmdGVyIG11bHRpc2VsZWN0LCBzbyB3ZSBjYW4gZnVydGhlciB0eXBlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2ZvY3VzKCkpO1xuICAgIH1cblxuICAgIC8vIFNwZWNpYWwgY2FzZSBpZiBjbGljayBFc2NhcGUsIGlmIGlucHV0IGlzIGVtcHR5LCBjbG9zZSB0aGUgZHJvcGRvd24sIGlmIG5vdCwgZW1wdHkgb3V0IHRoZSBzZWFyY2ggZmllbGRcbiAgICBpZiAodGhpcy5lbmFibGVDbGVhck9uRXNjYXBlUHJlc3NlZCA9PT0gdHJ1ZSAmJiBldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgJiYgdGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5fcmVzZXQodHJ1ZSk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUga2V5IHVwIGV2ZW50IHdpdGggTm92b1NlbGVjdEVsZW1lbnQuXG4gICAqIEFsbG93cyBlLmcuIHRoZSBhbm5vdW5jaW5nIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlRGVzY2VuZGFudCBieSBzY3JlZW4gcmVhZGVycy5cbiAgICovXG4gIF9oYW5kbGVLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd1VwIHx8IGV2ZW50LmtleSA9PT0gS2V5LkFycm93RG93bikge1xuICAgICAgY29uc3QgYXJpYUFjdGl2ZURlc2NlbmRhbnRJZCA9IHRoaXMubm92b1NlbGVjdC5fZ2V0QXJpYUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBhcmlhQWN0aXZlRGVzY2VuZGFudElkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlRGVzY2VuZGFudCA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpW2luZGV4XTtcbiAgICAgICAgdGhpcy5saXZlQW5ub3VuY2VyLmFubm91bmNlKFxuICAgICAgICAgIGFjdGl2ZURlc2NlbmRhbnQudmlld1ZhbHVlICsgJyAnICsgdGhpcy5nZXRBcmlhSW5kZXgoaW5kZXgpICsgdGhpcy5pbmRleEFuZExlbmd0aFNjcmVlblJlYWRlclRleHQgKyB0aGlzLmdldEFyaWFMZW5ndGgoKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBvcHRpb24sIHRha2luZyB0aGUgb2Zmc2V0IHRvIGxlbmd0aCBpbnRvIGFjY291bnQuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgICBDYXNlIDEgW1NlYXJjaCwgMSwgMiwgM10gd2lsbCBoYXZlIG9mZnNldCBvZiAxLCBkdWUgdG8gc2VhcmNoIGFuZCB3aWxsIHJlYWQgaW5kZXggb2YgdG90YWwuXG4gICAqICAgIENhc2UgMiBbMSwgMiwgM10gd2lsbCBoYXZlIG9mZnNldCBvZiAwIGFuZCB3aWxsIHJlYWQgaW5kZXggKzEgb2YgdG90YWwuXG4gICAqL1xuICBnZXRBcmlhSW5kZXgob3B0aW9uSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpID09PSAwKSB7XG4gICAgICByZXR1cm4gb3B0aW9uSW5kZXggKyAxO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uSW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIG9wdGlvbnMsIHRha2luZyB0aGUgb2Zmc2V0IHRvIGxlbmd0aCBpbnRvIGFjY291bnQuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgICBDYXNlIDEgW1NlYXJjaCwgMSwgMiwgM10gd2lsbCBoYXZlIGxlbmd0aCBvZiBvcHRpb25zLmxlbmd0aCAtMSwgZHVlIHRvIHNlYXJjaC5cbiAgICogICAgQ2FzZSAyIFsxLCAyLCAzXSB3aWxsIGhhdmUgbGVuZ3RoIG9mIG9wdGlvbnMubGVuZ3RoLlxuICAgKi9cbiAgZ2V0QXJpYUxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKS5sZW5ndGggLSB0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2xhc3RFeHRlcm5hbElucHV0VmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gdGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSksXG4gICAgICAgIHRhcCgoKSA9PiAodGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSA9IHVuZGVmaW5lZCkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZm4pO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBzZWFyY2ggaW5wdXQgZmllbGRcbiAgICovXG4gIHB1YmxpYyBfZm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLnNlYXJjaFNlbGVjdElucHV0IHx8ICF0aGlzLm5vdm9TZWxlY3QucGFuZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc2F2ZSBhbmQgcmVzdG9yZSBzY3JvbGxUb3Agb2YgcGFuZWwsIHNpbmNlIGl0IHdpbGwgYmUgcmVzZXQgYnkgZm9jdXMoKVxuICAgIC8vIG5vdGU6IHRoaXMgaXMgaGFja3lcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHBhbmVsLnNjcm9sbFRvcDtcblxuICAgIC8vIGZvY3VzXG4gICAgdGhpcy5zZWFyY2hTZWxlY3RJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICBwYW5lbC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjdXJyZW50IHNlYXJjaCB2YWx1ZVxuICAgKiBAcGFyYW0gZm9jdXMgd2hldGhlciB0byBmb2N1cyBhZnRlciByZXNldHRpbmdcbiAgICovXG4gIHB1YmxpYyBfcmVzZXQoZm9jdXM/OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9ybUNvbnRyb2wuc2V0VmFsdWUoJycpO1xuICAgIGlmIChmb2N1cykge1xuICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgaGFuZGxpbmcgPG5vdm8tc2VsZWN0IFttdWx0aXBsZV09XCJ0cnVlXCI+XG4gICAqIE5vdGU6IHRvIGltcHJvdmUgdGhpcyBjb2RlLCBub3ZvLXNlbGVjdCBzaG91bGQgYmUgZXh0ZW5kZWQgdG8gYWxsb3cgZGlzYWJsaW5nIHJlc2V0dGluZyB0aGUgc2VsZWN0aW9uIHdoaWxlIGZpbHRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgaW5pdE11bHRpcGxlSGFuZGxpbmcoKSB7XG4gICAgaWYgKCF0aGlzLm5vdm9TZWxlY3QubmdDb250cm9sKSB7XG4gICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIC8vIG5vdGU6IHRoZSBhY2Nlc3MgdG8gbm92b1NlbGVjdC5uZ0NvbnRyb2wgKGluc3RlYWQgb2Ygbm92b1NlbGVjdC52YWx1ZSAvIG5vdm9TZWxlY3QudmFsdWVDaGFuZ2VzKVxuICAgICAgICAvLyBpcyBuZWNlc3NhcnkgdG8gcHJvcGVybHkgd29yayBpbiBtdWx0aS1zZWxlY3Rpb24gbW9kZS5cbiAgICAgICAgY29uc29sZS5lcnJvcigndGhlIG5vdm8tc2VsZWN0IGNvbnRhaW5pbmcgbm92by1zZWxlY3Qtc2VhcmNoIG11c3QgaGF2ZSBhIG5nTW9kZWwgb3IgZm9ybUNvbnRyb2wgZGlyZWN0aXZlIHdoZW4gbXVsdGlwbGU9dHJ1ZScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBpZiA8bm92by1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAvLyBzdG9yZSBwcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyBhbmQgcmVzdG9yZSB0aGVtIHdoZW4gdGhleSBhcmUgZGVzZWxlY3RlZFxuICAgIC8vIGJlY2F1c2UgdGhlIG9wdGlvbiBpcyBub3QgYXZhaWxhYmxlIHdoaWxlIHdlIGFyZSBjdXJyZW50bHkgZmlsdGVyaW5nXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzID0gdGhpcy5ub3ZvU2VsZWN0Lm5nQ29udHJvbC52YWx1ZTtcblxuICAgIHRoaXMubm92b1NlbGVjdC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgodmFsdWVzKSA9PiB7XG4gICAgICBsZXQgcmVzdG9yZVNlbGVjdGVkVmFsdWVzID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAodGhpcy5hbHdheXNSZXN0b3JlU2VsZWN0ZWRPcHRpb25zTXVsdGkgfHwgKHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlICYmIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlLmxlbmd0aCkpICYmXG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzICYmXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICghdmFsdWVzIHx8ICFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLm5vdm9TZWxlY3Qub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMuZm9yRWFjaCgocHJldmlvdXNWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhdmFsdWVzLnNvbWUoKHYpID0+IHRoaXMubm92b1NlbGVjdC5jb21wYXJlV2l0aCh2LCBwcmV2aW91c1ZhbHVlKSkgJiZcbiAgICAgICAgICAgICAgIW9wdGlvblZhbHVlcy5zb21lKCh2KSA9PiB0aGlzLm5vdm9TZWxlY3QuY29tcGFyZVdpdGgodiwgcHJldmlvdXNWYWx1ZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgLy8gaWYgYSB2YWx1ZSB0aGF0IHdhcyBzZWxlY3RlZCBiZWZvcmUgaXMgZGVzZWxlY3RlZCBhbmQgbm90IGZvdW5kIGluIHRoZSBvcHRpb25zLCBpdCB3YXMgZGVzZWxlY3RlZFxuICAgICAgICAgICAgICAvLyBkdWUgdG8gdGhlIGZpbHRlcmluZywgc28gd2UgcmVzdG9yZSBpdC5cbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocHJldmlvdXNWYWx1ZSk7XG4gICAgICAgICAgICAgIHJlc3RvcmVTZWxlY3RlZFZhbHVlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcyA9IHZhbHVlcztcblxuICAgICAgaWYgKHJlc3RvcmVTZWxlY3RlZFZhbHVlcykge1xuICAgICAgICAvLyBUT0RPOiBGaXggdGhpc1xuICAgICAgICAvLyB0aGlzLm5vdm9TZWxlY3QuX29uQ2hhbmdlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xscyB0aGUgY3VycmVudGx5IGFjdGl2ZSBvcHRpb24gaW50byB0aGUgdmlldyBpZiBpdCBpcyBub3QgeWV0IHZpc2libGUuXG4gICAqL1xuICBwcml2YXRlIGFkanVzdFNjcm9sbFRvcFRvRml0QWN0aXZlT3B0aW9uSW50b1ZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm92b1NlbGVjdC5wYW5lbCAmJiB0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgbm92b09wdGlvbkhlaWdodCA9IHRoaXMuZ2V0Tm92b09wdGlvbkhlaWdodCgpO1xuICAgICAgY29uc3QgYWN0aXZlT3B0aW9uSW5kZXggPSB0aGlzLm5vdm9TZWxlY3QuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDA7XG4gICAgICBjb25zdCBsYWJlbENvdW50ID0gX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oYWN0aXZlT3B0aW9uSW5kZXgsIHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucywgdGhpcy5ub3ZvU2VsZWN0Lm9wdGlvbkdyb3Vwcyk7XG4gICAgICAvLyBJZiB0aGUgY29tcG9uZW50IGlzIGluIGEgTm92b09wdGlvbiwgdGhlIGFjdGl2ZUl0ZW1JbmRleCB3aWxsIGJlIG9mZnNldCBieSBvbmUuXG4gICAgICBjb25zdCBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldyA9ICh0aGlzLm5vdm9PcHRpb24gPyAtMSA6IDApICsgbGFiZWxDb3VudCArIGFjdGl2ZU9wdGlvbkluZGV4O1xuICAgICAgY29uc3QgY3VycmVudFNjcm9sbFRvcCA9IHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgICAgY29uc3Qgc2VhcmNoSW5wdXRIZWlnaHQgPSB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgYW1vdW50T2ZWaXNpYmxlT3B0aW9ucyA9IE1hdGguZmxvb3IoKFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUIC0gc2VhcmNoSW5wdXRIZWlnaHQpIC8gbm92b09wdGlvbkhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGluZGV4T2ZGaXJzdFZpc2libGVPcHRpb24gPSBNYXRoLnJvdW5kKChjdXJyZW50U2Nyb2xsVG9wICsgc2VhcmNoSW5wdXRIZWlnaHQpIC8gbm92b09wdGlvbkhlaWdodCkgLSAxO1xuXG4gICAgICBpZiAoaW5kZXhPZkZpcnN0VmlzaWJsZU9wdGlvbiA+PSBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldykge1xuICAgICAgICB0aGlzLm5vdm9TZWxlY3QucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldyAqIG5vdm9PcHRpb25IZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4T2ZGaXJzdFZpc2libGVPcHRpb24gKyBhbW91bnRPZlZpc2libGVPcHRpb25zIDw9IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3KSB7XG4gICAgICAgIHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9XG4gICAgICAgICAgKGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ICsgMSkgKiBub3ZvT3B0aW9uSGVpZ2h0IC0gKFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUIC0gc2VhcmNoSW5wdXRIZWlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgU2V0IHRoZSB3aWR0aCBvZiB0aGUgaW5uZXJTZWxlY3RTZWFyY2ggdG8gZml0IGV2ZW4gY3VzdG9tIHNjcm9sbGJhcnNcbiAgICogIEFuZCBzdXBwb3J0IGFsbCBPcGVyYXRpb24gU3lzdGVtc1xuICAgKi9cbiAgcHVibGljIHVwZGF0ZUlucHV0V2lkdGgoKSB7XG4gICAgaWYgKCF0aGlzLmlubmVyU2VsZWN0U2VhcmNoIHx8ICF0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBwYW5lbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudCkpIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbm92by1zZWxlY3QtcGFuZWwnKSkge1xuICAgICAgICBwYW5lbEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhbmVsRWxlbWVudCkge1xuICAgICAgdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gcGFuZWxFbGVtZW50LmNsaWVudFdpZHRoICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE5vdm9PcHRpb25IZWlnaHQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5ub3ZvU2VsZWN0LmNvbnRlbnRPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnMuZmlyc3QuX2dldEhvc3RFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgb2Zmc2V0IHRvIGxlbmd0aCB0aGF0IGNhbiBiZSBjYXVzZWQgYnkgdGhlIG9wdGlvbmFsIG5vdm9PcHRpb24gdXNlZCBhcyBhIHNlYXJjaCBpbnB1dC5cbiAgICovXG4gIHByaXZhdGUgZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm5vdm9PcHRpb24pIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbn1cbiIsIjxub3ZvLWZpZWxkXG4gICNpbm5lclNlbGVjdFNlYXJjaFxuICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1pbm5lclwiXG4gIFtuZ0NsYXNzXT1cInsnbm92by1zZWxlY3Qtc2VhcmNoLWlubmVyLW11bHRpcGxlJzogbm92b1NlbGVjdC5tdWx0aXBsZSwgJ25vdm8tc2VsZWN0LXNlYXJjaC1pbm5lci10b2dnbGUtYWxsJzogX2lzVG9nZ2xlQWxsQ2hlY2tib3hWaXNpYmxlKCkgfVwiPlxuXG4gIDxub3ZvLWNoZWNrYm94ICpuZ0lmPVwiX2lzVG9nZ2xlQWxsQ2hlY2tib3hWaXNpYmxlKClcIlxuICAgIG5vdm9QcmVmaXhcbiAgICBbY29sb3JdPVwiJ3ByaW1hcnknXCJcbiAgICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC10b2dnbGUtYWxsLWNoZWNrYm94XCJcbiAgICBbY2hlY2tlZF09XCJ0b2dnbGVBbGxDaGVja2JveENoZWNrZWRcIlxuICAgIFtpbmRldGVybWluYXRlXT1cInRvZ2dsZUFsbENoZWNrYm94SW5kZXRlcm1pbmF0ZVwiXG4gICAgW3Rvb2x0aXBdPVwidG9nZ2xlQWxsQ2hlY2tib3hUb29sdGlwTWVzc2FnZVwiXG4gICAgdG9vbHRpcENsYXNzPVwibmd4LW5vdm8tc2VsZWN0LXNlYXJjaC10b2dnbGUtYWxsLXRvb2x0aXBcIlxuICAgIFt0b29sdGlwUG9zaXRpb25dPVwidG9vZ2xlQWxsQ2hlY2tib3hUb29sdGlwUG9zaXRpb25cIlxuICAgIChjaGFuZ2UpPVwiX2VtaXRTZWxlY3RBbGxCb29sZWFuVG9QYXJlbnQoJGV2ZW50LmNoZWNrZWQpXCI+PC9ub3ZvLWNoZWNrYm94PlxuXG4gIDxub3ZvLWljb25cbiAgICBub3ZvUHJlZml4XG4gICAgY2xhc3M9XCJub3ZvLXNlbGVjdC1zZWFyY2gtaWNvblwiPnNlYXJjaDwvbm92by1pY29uPlxuXG4gIDxpbnB1dCBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1pbnB1dFwiXG4gICAgI3NlYXJjaFNlbGVjdElucHV0XG4gICAgbm92b0lucHV0XG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICBbdHlwZV09XCJ0eXBlXCJcbiAgICBbZm9ybUNvbnRyb2xdPVwiX2Zvcm1Db250cm9sXCJcbiAgICAoa2V5ZG93bik9XCJfaGFuZGxlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAoa2V5dXApPVwiX2hhbmRsZUtleXVwKCRldmVudClcIlxuICAgIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJMYWJlbFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiAvPlxuXG4gIDxub3ZvLXNwaW5uZXIgKm5nSWY9XCJzZWFyY2hpbmdcIlxuICAgIG5vdm9TdWZmaXhcbiAgICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1zcGlubmVyXCJcbiAgICBkaWFtZXRlcj1cIjE2XCI+PC9ub3ZvLXNwaW5uZXI+XG5cbiAgPG5vdm8tYnV0dG9uXG4gICAgbm92b1N1ZmZpeFxuICAgICpuZ0lmPVwiIWhpZGVDbGVhclNlYXJjaEJ1dHRvbiAmJiB2YWx1ZSAmJiAhc2VhcmNoaW5nXCJcbiAgICBhcmlhLWxhYmVsPVwiQ2xlYXJcIlxuICAgIChjbGljayk9XCJfcmVzZXQodHJ1ZSlcIlxuICAgIHRoZW1lPVwiaWNvblwiXG4gICAgc2l6ZT1cInNtYWxsXCJcbiAgICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1jbGVhclwiPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiY2xlYXJJY29uOyBlbHNlIGRlZmF1bHRJY29uXCIgc2VsZWN0PVwiW25vdm9TZWxlY3RTZWFyY2hDbGVhcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0SWNvbj5cbiAgICAgIDxub3ZvLWljb24+Y2xvc2U8L25vdm8taWNvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICA8L25vdm8tYnV0dG9uPlxuXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIi5ub3ZvLXNlbGVjdC1zZWFyY2gtY3VzdG9tLWhlYWRlci1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuXG48L25vdm8tZmllbGQ+XG5cbjxkaXYgKm5nSWY9XCJfc2hvd05vRW50cmllc0ZvdW5kJCB8IGFzeW5jXCJcbiAgY2xhc3M9XCJub3ZvLXNlbGVjdC1zZWFyY2gtbm8tZW50cmllcy1mb3VuZFwiPlxuICB7e25vRW50cmllc0ZvdW5kTGFiZWx9fVxuPC9kaXY+Il19