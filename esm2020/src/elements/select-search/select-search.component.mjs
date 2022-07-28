import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Optional, Output, ViewChild, } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { delay, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { isAlphaNumeric } from '../../utils';
import { NovoOption, _countGroupLabelsBeforeOption } from '../common';
import { NovoFieldElement } from '../field';
import { NovoSelectElement } from '../select';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "../checkbox/Checkbox";
import * as i4 from "../icon/Icon";
import * as i5 from "../loading/Loading";
import * as i6 from "../button/Button";
import * as i7 from "@angular/common";
import * as i8 from "../tooltip/Tooltip.directive";
import * as i9 from "@angular/forms";
import * as i10 from "../common/directives/theme.directive";
import * as i11 from "../select";
import * as i12 from "../common";
import * as i13 from "../field";
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
            this.novoOption.disabled = true;
            this.novoOption._getHostElement().classList.add('contains-novo-select-search');
        }
        else {
            console.error('<ngx-novo-select-search> must be placed inside a <novo-option> element');
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
            event.key === " " /* Space */ ||
            (this.preventHomeEndKeyPropagation && (event.key === "Home" /* Home */ || event.key === "End" /* End */))) {
            event.stopPropagation();
        }
        if (this.novoSelect.multiple && event.key && event.key === "Enter" /* Enter */) {
            // Regain focus after multiselect, so we can further type
            setTimeout(() => this._focus());
        }
        // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
        if (this.enableClearOnEscapePressed === true && event.key === "Escape" /* Escape */ && this.value) {
            this._reset(true);
            event.stopPropagation();
        }
    }
    /**
     * Handles the key up event with NovoSelectElement.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event) {
        if (event.key === "ArrowUp" /* ArrowUp */ || event.key === "ArrowDown" /* ArrowDown */) {
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
                console.error('the novo-select containing ngx-novo-select-search must have a ngModel or formControl directive when multiple=true');
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
}
NovoSelectSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectSearchComponent, deps: [{ token: NovoSelectElement }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: NovoOption, optional: true }, { token: i2.LiveAnnouncer }, { token: NovoFieldElement, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSelectSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSelectSearchComponent, selector: "novo-select-search", inputs: { name: "name", placeholderLabel: "placeholderLabel", type: "type", noEntriesFoundLabel: "noEntriesFoundLabel", indexAndLengthScreenReaderText: "indexAndLengthScreenReaderText", clearSearchInput: "clearSearchInput", searching: "searching", disableInitialFocus: "disableInitialFocus", enableClearOnEscapePressed: "enableClearOnEscapePressed", preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation", disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged", ariaLabel: "ariaLabel", showToggleAllCheckbox: "showToggleAllCheckbox", toggleAllCheckboxChecked: "toggleAllCheckboxChecked", toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate", toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage", toogleAllCheckboxTooltipPosition: "toogleAllCheckboxTooltipPosition", hideClearSearchButton: "hideClearSearchButton", alwaysRestoreSelectedOptionsMulti: "alwaysRestoreSelectedOptionsMulti" }, outputs: { toggleAll: "toggleAll" }, host: { properties: { "class.novo-select-search-inside-novo-option": "this.isInsideNovoOption" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NovoSelectSearchComponent),
            multi: true,
        },
    ], queries: [{ propertyName: "clearIcon", first: true, predicate: NovoSelectSearchClearDirective, descendants: true }], viewQueries: [{ propertyName: "searchSelectInput", first: true, predicate: ["searchSelectInput"], descendants: true, read: ElementRef, static: true }, { propertyName: "innerSelectSearch", first: true, predicate: ["innerSelectSearch"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<!-- Placeholder to adjust vertical offset of the novo-option elements -->\n<input novoInput class=\"novo-select-search-input novo-select-search-hidden\" />\n\n<!-- Note: the  novo-datepicker-content novo-tab-header are needed to inherit the novoerial theme colors, see PR #22 -->\n<div\n  #innerSelectSearch\n  class=\"novo-select-search-inner novo-typography novo-datepicker-content novo-tab-header\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon class=\"novo-select-search-icon-prefix\">search</novo-icon>\n\n  <input class=\"novo-select-search-input novo-input-element\"\n    #searchSelectInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n  <novo-spinner *ngIf=\"searching\"\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</div>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [".novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{position:absolute;top:0;width:100%;min-width:190px;border-bottom-width:1px;border-bottom-style:solid;z-index:100;font-size:inherit;box-shadow:none;border-radius:0;-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-inner .novo-input-element{flex-basis:auto;border:none}.novo-select-search-inner .novo-input-element:focus{outline:none;border-radius:0!important}.novo-select-search-inner .novo-input-element:-ms-input-placeholder{-ms-user-select:text}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-input{padding:1rem;padding-left:40px;padding-right:24px;box-sizing:border-box;width:100%}:host-context([dir=rtl]) .novo-select-search-input{padding-right:16px;padding-left:24px}.novo-select-search-no-entries-found{padding:16px}.novo-select-search-icon-prefix{position:absolute;left:16px;top:7px}.novo-select-search-clear{position:absolute;right:4px;top:5px}:host-context([dir=rtl]) .novo-select-search-clear{right:auto;left:4px}.novo-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .novo-select-search-spinner{right:auto;left:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3em;line-height:3em}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search{position:static;padding:0}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search .novo-option-pseudo-checkbox{display:none}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search.novo-select-search-no-entries-found{height:6em}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"], components: [{ type: i3.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i4.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i5.NovoSpinnerElement, selector: "novo-spinner", inputs: ["theme", "color", "size", "inverse"] }, { type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i9.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i9.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i9.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i10.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], pipes: { "async": i7.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-select-search', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NovoSelectSearchComponent),
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- Placeholder to adjust vertical offset of the novo-option elements -->\n<input novoInput class=\"novo-select-search-input novo-select-search-hidden\" />\n\n<!-- Note: the  novo-datepicker-content novo-tab-header are needed to inherit the novoerial theme colors, see PR #22 -->\n<div\n  #innerSelectSearch\n  class=\"novo-select-search-inner novo-typography novo-datepicker-content novo-tab-header\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon class=\"novo-select-search-icon-prefix\">search</novo-icon>\n\n  <input class=\"novo-select-search-input novo-input-element\"\n    #searchSelectInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n  <novo-spinner *ngIf=\"searching\"\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</div>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>", styles: [".novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{position:absolute;top:0;width:100%;min-width:190px;border-bottom-width:1px;border-bottom-style:solid;z-index:100;font-size:inherit;box-shadow:none;border-radius:0;-webkit-transform:translate3d(0,0,0)}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{display:flex;align-items:center}.novo-select-search-inner .novo-input-element{flex-basis:auto;border:none}.novo-select-search-inner .novo-input-element:focus{outline:none;border-radius:0!important}.novo-select-search-inner .novo-input-element:-ms-input-placeholder{-ms-user-select:text}::ng-deep .novo-select-search-panel{transform:none!important;overflow-x:hidden}.novo-select-search-input{padding:1rem;padding-left:40px;padding-right:24px;box-sizing:border-box;width:100%}:host-context([dir=rtl]) .novo-select-search-input{padding-right:16px;padding-left:24px}.novo-select-search-no-entries-found{padding:16px}.novo-select-search-icon-prefix{position:absolute;left:16px;top:7px}.novo-select-search-clear{position:absolute;right:4px;top:5px}:host-context([dir=rtl]) .novo-select-search-clear{right:auto;left:4px}.novo-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .novo-select-search-spinner{right:auto;left:16px}:host.novo-select-search-inside-novo-option .novo-select-search-input{padding-top:0;padding-bottom:0;height:3em;line-height:3em}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search{position:static;padding:0}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search .novo-icon{margin-right:0;margin-left:0}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search .novo-option-pseudo-checkbox{display:none}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search.novo-select-search-no-entries-found{height:6em}.novo-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i11.NovoSelectElement, decorators: [{
                    type: Inject,
                    args: [NovoSelectElement]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: i12.NovoOption, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NovoOption]
                }] }, { type: i2.LiveAnnouncer }, { type: i13.NovoFieldElement, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoL3NlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvc2VsZWN0LXNlYXJjaC9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0UsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRyxPQUFPLEVBQUUsY0FBYyxFQUFPLE1BQU0sYUFBYSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdC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QUksRUFBRTtnQkFHRCxTQUFTO3NCQUF6RSxZQUFZO3VCQUFDLDhCQUE4QixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFHM0Qsa0JBQWtCO3NCQURyQixXQUFXO3VCQUFDLDZDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpdmVBbm5vdW5jZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNBbHBoYU51bWVyaWMsIEtleSB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE5vdm9PcHRpb24sIF9jb3VudEdyb3VwTGFiZWxzQmVmb3JlT3B0aW9uIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9GaWVsZEVsZW1lbnQgfSBmcm9tICcuLi9maWVsZCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0RWxlbWVudCB9IGZyb20gJy4uL3NlbGVjdCc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmUgfSBmcm9tICcuL3NlbGVjdC1zZWFyY2gtY2xlYXIuZGlyZWN0aXZlJztcblxuLyoqIFRoZSBtYXggaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsLiAqL1xuY29uc3QgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgPSAyNTY7XG5sZXQgYXV0b0luY3JlbWVudCA9IDE7XG4vKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgY29tcG9uZW50LXNlbGVjdG9yICovXG4vKipcbiAqIENvbXBvbmVudCBwcm92aWRpbmcgYW4gaW5wdXQgZmllbGQgZm9yIHNlYXJjaGluZyBOb3ZvU2VsZWN0RWxlbWVudCBvcHRpb25zLlxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogaW50ZXJmYWNlIEJhbmsge1xuICogIGlkOiBzdHJpbmc7XG4gKiAgbmFtZTogc3RyaW5nO1xuICogfVxuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWFwcC1kYXRhLXNlbGVjdGlvbicsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPG5vdm8tZm9ybS1maWVsZD5cbiAqICAgICAgIDxub3ZvLXNlbGVjdCBbZm9ybUNvbnRyb2xdPVwiYmFua0N0cmxcIiBwbGFjZWhvbGRlcj1cIkJhbmtcIj5cbiAqICAgICAgICAgPG5vdm8tb3B0aW9uPlxuICogICAgICAgICAgIDxuZ3gtbm92by1zZWxlY3Qtc2VhcmNoIFtmb3JtQ29udHJvbF09XCJiYW5rRmlsdGVyQ3RybFwiPjwvbmd4LW5vdm8tc2VsZWN0LXNlYXJjaD5cbiAqICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAqICAgICAgICAgPG5vdm8tb3B0aW9uICpuZ0Zvcj1cImxldCBiYW5rIG9mIGZpbHRlcmVkQmFua3MgfCBhc3luY1wiIFt2YWx1ZV09XCJiYW5rLmlkXCI+XG4gKiAgICAgICAgICAge3tiYW5rLm5hbWV9fVxuICogICAgICAgICA8L25vdm8tb3B0aW9uPlxuICogICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAqICAgICA8L25vdm8tZm9ybS1maWVsZD5cbiAqICAgYFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBEYXRhU2VsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICpcbiAqICAgLy8gY29udHJvbCBmb3IgdGhlIHNlbGVjdGVkIGJhbmtcbiAqICAgcHVibGljIGJhbmtDdHJsOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICogICAvLyBjb250cm9sIGZvciB0aGUgTm92b1NlbGVjdEVsZW1lbnQgZmlsdGVyIGtleXdvcmRcbiAqICAgcHVibGljIGJhbmtGaWx0ZXJDdHJsOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICpcbiAqICAgLy8gbGlzdCBvZiBiYW5rc1xuICogICBwcml2YXRlIGJhbmtzOiBCYW5rW10gPSBbe25hbWU6ICdCYW5rIEEnLCBpZDogJ0EnfSwge25hbWU6ICdCYW5rIEInLCBpZDogJ0InfSwge25hbWU6ICdCYW5rIEMnLCBpZDogJ0MnfV07XG4gKiAgIC8vIGxpc3Qgb2YgYmFua3MgZmlsdGVyZWQgYnkgc2VhcmNoIGtleXdvcmRcbiAqICAgcHVibGljIGZpbHRlcmVkQmFua3M6IFJlcGxheVN1YmplY3Q8QmFua1tdPiA9IG5ldyBSZXBsYXlTdWJqZWN0PEJhbmtbXT4oMSk7XG4gKlxuICogICAvLyBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAqICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAqXG4gKlxuICogICBuZ09uSW5pdCgpIHtcbiAqICAgICAvLyBsb2FkIHRoZSBpbml0aWFsIGJhbmsgbGlzdFxuICogICAgIHRoaXMuZmlsdGVyZWRCYW5rcy5uZXh0KHRoaXMuYmFua3Muc2xpY2UoKSk7XG4gKiAgICAgLy8gbGlzdGVuIGZvciBzZWFyY2ggZmllbGQgdmFsdWUgY2hhbmdlc1xuICogICAgIHRoaXMuYmFua0ZpbHRlckN0cmwudmFsdWVDaGFuZ2VzXG4gKiAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAqICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICogICAgICAgICB0aGlzLmZpbHRlckJhbmtzKCk7XG4gKiAgICAgICB9KTtcbiAqICAgfVxuICpcbiAqICAgbmdPbkRlc3Ryb3koKSB7XG4gKiAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAqICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAqICAgfVxuICpcbiAqICAgcHJpdmF0ZSBmaWx0ZXJCYW5rcygpIHtcbiAqICAgICBpZiAoIXRoaXMuYmFua3MpIHtcbiAqICAgICAgIHJldHVybjtcbiAqICAgICB9XG4gKlxuICogICAgIC8vIGdldCB0aGUgc2VhcmNoIGtleXdvcmRcbiAqICAgICBsZXQgc2VhcmNoID0gdGhpcy5iYW5rRmlsdGVyQ3RybC52YWx1ZTtcbiAqICAgICBpZiAoIXNlYXJjaCkge1xuICogICAgICAgdGhpcy5maWx0ZXJlZEJhbmtzLm5leHQodGhpcy5iYW5rcy5zbGljZSgpKTtcbiAqICAgICAgIHJldHVybjtcbiAqICAgICB9IGVsc2Uge1xuICogICAgICAgc2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gKiAgICAgfVxuICpcbiAqICAgICAvLyBmaWx0ZXIgdGhlIGJhbmtzXG4gKiAgICAgdGhpcy5maWx0ZXJlZEJhbmtzLm5leHQoXG4gKiAgICAgICB0aGlzLmJhbmtzLmZpbHRlcihiYW5rID0+IGJhbmsubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSA+IC0xKVxuICogICAgICk7XG4gKiAgIH1cbiAqIH1cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zZWxlY3Qtc2VhcmNoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIG5hbWUgPSAnc2VsZWN0LXNlYXJjaC0nICsgYXV0b0luY3JlbWVudCsrO1xuICAvKiogTGFiZWwgb2YgdGhlIHNlYXJjaCBwbGFjZWhvbGRlciAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlckxhYmVsID0gJ1NlYXJjaCc7XG5cbiAgLyoqIFR5cGUgb2YgdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBASW5wdXQoKSB0eXBlID0gJ3RleHQnO1xuXG4gIC8qKiBMYWJlbCB0byBiZSBzaG93biB3aGVuIG5vIGVudHJpZXMgYXJlIGZvdW5kLiBTZXQgdG8gbnVsbCBpZiBubyBtZXNzYWdlIHNob3VsZCBiZSBzaG93bi4gKi9cbiAgQElucHV0KCkgbm9FbnRyaWVzRm91bmRMYWJlbCA9ICdObyBSZWNvcmRzIEZvdW5kJztcblxuICAvKipcbiAgICogIFRleHQgdGhhdCBpcyBhcHBlbmRlZCB0byB0aGUgY3VycmVudGx5IGFjdGl2ZSBpdGVtIGxhYmVsIGFubm91bmNlZCBieSBzY3JlZW4gcmVhZGVycyxcbiAgICogIGluZm9ybWluZyB0aGUgdXNlciBvZiB0aGUgY3VycmVudCBpbmRleCwgdmFsdWUgYW5kIHRvdGFsIG9wdGlvbnMuXG4gICAqICBlZzogQmFuayBSIChHZXJtYW55KSAxIG9mIDZcbiAgICovXG4gIEBJbnB1dCgpIGluZGV4QW5kTGVuZ3RoU2NyZWVuUmVhZGVyVGV4dCA9ICcgb2YgJztcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHNlYXJjaCBmaWVsZCBzaG91bGQgYmUgY2xlYXJlZCBhZnRlciB0aGUgZHJvcGRvd24gbWVudSBpcyBjbG9zZWQuXG4gICAqIFVzZWZ1bCBmb3Igc2VydmVyLXNpZGUgZmlsdGVyaW5nLlxuICAgKi9cbiAgQElucHV0KCkgY2xlYXJTZWFyY2hJbnB1dCA9IHRydWU7XG5cbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2VhcmNoLWluLXByb2dyZXNzIGluZGljYXRvciAqL1xuICBASW5wdXQoKSBzZWFyY2hpbmcgPSBmYWxzZTtcblxuICAvKiogRGlzYWJsZXMgaW5pdGlhbCBmb2N1c2luZyBvZiB0aGUgaW5wdXQgZmllbGQgKi9cbiAgQElucHV0KCkgZGlzYWJsZUluaXRpYWxGb2N1cyA9IGZhbHNlO1xuXG4gIC8qKiBFbmFibGUgY2xlYXIgaW5wdXQgb24gZXNjYXBlIHByZXNzZWQgKi9cbiAgQElucHV0KCkgZW5hYmxlQ2xlYXJPbkVzY2FwZVByZXNzZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogUHJldmVudHMgaG9tZSAvIGVuZCBrZXkgYmVpbmcgcHJvcGFnYXRlZCB0byBub3ZvLXNlbGVjdCxcbiAgICogYWxsb3dpbmcgdG8gbW92ZSB0aGUgY3Vyc29yIHdpdGhpbiB0aGUgc2VhcmNoIGlucHV0IGluc3RlYWQgb2YgbmF2aWdhdGluZyB0aGUgb3B0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgcHJldmVudEhvbWVFbmRLZXlQcm9wYWdhdGlvbiA9IGZhbHNlO1xuXG4gIC8qKiBEaXNhYmxlcyBzY3JvbGxpbmcgdG8gYWN0aXZlIG9wdGlvbnMgd2hlbiBvcHRpb24gbGlzdCBjaGFuZ2VzLiBVc2VmdWwgZm9yIHNlcnZlci1zaWRlIHNlYXJjaCAqL1xuICBASW5wdXQoKSBkaXNhYmxlU2Nyb2xsVG9BY3RpdmVPbk9wdGlvbnNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgLyoqIEFkZHMgNTA4IHNjcmVlbiByZWFkZXIgc3VwcG9ydCBmb3Igc2VhcmNoIGJveCAqL1xuICBASW5wdXQoKSBhcmlhTGFiZWwgPSAnZHJvcGRvd24gc2VhcmNoJztcblxuICAvKiogV2hldGhlciB0byBzaG93IFNlbGVjdCBBbGwgQ2hlY2tib3ggKGZvciBub3ZvLXNlbGVjdFttdWx0aT10cnVlXSkgKi9cbiAgQElucHV0KCkgc2hvd1RvZ2dsZUFsbENoZWNrYm94ID0gZmFsc2U7XG5cbiAgLyoqIHNlbGVjdCBhbGwgY2hlY2tib3ggY2hlY2tlZCBzdGF0ZSAqL1xuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveENoZWNrZWQgPSBmYWxzZTtcblxuICAvKiogc2VsZWN0IGFsbCBjaGVja2JveCBpbmRldGVybWluYXRlIHN0YXRlICovXG4gIEBJbnB1dCgpIHRvZ2dsZUFsbENoZWNrYm94SW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gIC8qKiBEaXNwbGF5IGEgbWVzc2FnZSBpbiBhIHRvb2x0aXAgb24gdGhlIHRvZ2dsZS1hbGwgY2hlY2tib3ggKi9cbiAgQElucHV0KCkgdG9nZ2xlQWxsQ2hlY2tib3hUb29sdGlwTWVzc2FnZSA9ICcnO1xuXG4gIC8qKiBEZWZpbmUgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIG9uIHRoZSB0b2dnbGUtYWxsIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKSB0b29nbGVBbGxDaGVja2JveFRvb2x0aXBQb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdhYm92ZScgfCAnYmVsb3cnIHwgJ2JlZm9yZScgfCAnYWZ0ZXInID0gJ2JlbG93JztcblxuICAvKiogU2hvdy9IaWRlIHRoZSBzZWFyY2ggY2xlYXIgYnV0dG9uIG9mIHRoZSBzZWFyY2ggaW5wdXQgKi9cbiAgQElucHV0KCkgaGlkZUNsZWFyU2VhcmNoQnV0dG9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEFsd2F5cyByZXN0b3JlIHNlbGVjdGVkIG9wdGlvbnMgb24gc2VsZWN0aW9uQ2hhbmdlIGZvciBtb2RlIG11bHRpIChlLmcuIGZvciBsYXp5IGxvYWRpbmcvaW5maW5pdHkgc2Nyb2xsaW5nKS5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UsIHNvIHNlbGVjdGVkIG9wdGlvbnMgYXJlIG9ubHkgcmVzdG9yZWQgd2hpbGUgZmlsdGVyaW5nIGlzIGFjdGl2ZS5cbiAgICovXG4gIEBJbnB1dCgpIGFsd2F5c1Jlc3RvcmVTZWxlY3RlZE9wdGlvbnNNdWx0aSA9IGZhbHNlO1xuXG4gIC8qKiBPdXRwdXQgZW1pdHRlciB0byBzZW5kIHRvIHBhcmVudCBjb21wb25lbnQgd2l0aCB0aGUgdG9nZ2xlIGFsbCBib29sZWFuICovXG4gIEBPdXRwdXQoKSB0b2dnbGVBbGwgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgc2VhcmNoIGlucHV0IGZpZWxkICovXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaFNlbGVjdElucHV0JywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgc2VhcmNoU2VsZWN0SW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgc2VhcmNoIGlucHV0IGZpZWxkICovXG4gIEBWaWV3Q2hpbGQoJ2lubmVyU2VsZWN0U2VhcmNoJywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgaW5uZXJTZWxlY3RTZWFyY2g6IEVsZW1lbnRSZWY7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byBjdXN0b20gc2VhcmNoIGlucHV0IGNsZWFyIGljb24gKi9cbiAgQENvbnRlbnRDaGlsZChOb3ZvU2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KSBjbGVhckljb246IE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vdm8tc2VsZWN0LXNlYXJjaC1pbnNpZGUtbm92by1vcHRpb24nKVxuICBnZXQgaXNJbnNpZGVOb3ZvT3B0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMubm92b09wdGlvbjtcbiAgfVxuXG4gIC8qKiBDdXJyZW50IHNlYXJjaCB2YWx1ZSAqL1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybUNvbnRyb2wudmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfbGFzdEV4dGVybmFsSW5wdXRWYWx1ZTogc3RyaW5nO1xuXG4gIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoXzogYW55KSA9PiB7fTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBOb3ZvU2VsZWN0RWxlbWVudCBvcHRpb25zICovXG4gIHB1YmxpYyBzZXQgX29wdGlvbnMoX29wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPikge1xuICAgIHRoaXMuX29wdGlvbnMkLm5leHQoX29wdGlvbnMpO1xuICB9XG4gIHB1YmxpYyBnZXQgX29wdGlvbnMoKTogUXVlcnlMaXN0PE5vdm9PcHRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucyQuZ2V0VmFsdWUoKTtcbiAgfVxuICBwdWJsaWMgX29wdGlvbnMkOiBCZWhhdmlvclN1YmplY3Q8UXVlcnlMaXN0PE5vdm9PcHRpb24+PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UXVlcnlMaXN0PE5vdm9PcHRpb24+PihudWxsKTtcblxuICBwcml2YXRlIG9wdGlvbnNMaXN0JDogT2JzZXJ2YWJsZTxOb3ZvT3B0aW9uW10+ID0gdGhpcy5fb3B0aW9ucyQucGlwZShcbiAgICBzd2l0Y2hNYXAoKF9vcHRpb25zKSA9PlxuICAgICAgX29wdGlvbnNcbiAgICAgICAgPyBfb3B0aW9ucy5jaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBtYXAoKG9wdGlvbnMpID0+IG9wdGlvbnMudG9BcnJheSgpKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aDxOb3ZvT3B0aW9uW10+KF9vcHRpb25zLnRvQXJyYXkoKSksXG4gICAgICAgICAgKVxuICAgICAgICA6IG9mKG51bGwpLFxuICAgICksXG4gICk7XG5cbiAgcHJpdmF0ZSBvcHRpb25zTGVuZ3RoJDogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5vcHRpb25zTGlzdCQucGlwZShtYXAoKG9wdGlvbnMpID0+IChvcHRpb25zID8gb3B0aW9ucy5sZW5ndGggOiAwKSkpO1xuXG4gIC8qKiBQcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyB3aGVuIHVzaW5nIDxub3ZvLXNlbGVjdCBbbXVsdGlwbGVdPVwidHJ1ZVwiPiovXG4gIHByaXZhdGUgcHJldmlvdXNTZWxlY3RlZFZhbHVlczogYW55W107XG5cbiAgcHVibGljIF9mb3JtQ29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuXG4gIC8qKiB3aGV0aGVyIHRvIHNob3cgdGhlIG5vIGVudHJpZXMgZm91bmQgbWVzc2FnZSAqL1xuICBwdWJsaWMgX3Nob3dOb0VudHJpZXNGb3VuZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBjb21iaW5lTGF0ZXN0KFt0aGlzLl9mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMsIHRoaXMub3B0aW9uc0xlbmd0aCRdKS5waXBlKFxuICAgIG1hcCgoW3ZhbHVlLCBvcHRpb25zTGVuZ3RoXSkgPT4gdGhpcy5ub0VudHJpZXNGb3VuZExhYmVsICYmIHZhbHVlICYmIG9wdGlvbnNMZW5ndGggPT09IHRoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpKSxcbiAgKTtcblxuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOb3ZvU2VsZWN0RWxlbWVudCkgcHVibGljIG5vdm9TZWxlY3Q6IE5vdm9TZWxlY3RFbGVtZW50LFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5vdm9PcHRpb24pIHB1YmxpYyBub3ZvT3B0aW9uOiBOb3ZvT3B0aW9uID0gbnVsbCxcbiAgICBwcml2YXRlIGxpdmVBbm5vdW5jZXI6IExpdmVBbm5vdW5jZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOb3ZvRmllbGRFbGVtZW50KSBwdWJsaWMgbWF0Rm9ybUZpZWxkOiBOb3ZvRmllbGRFbGVtZW50ID0gbnVsbCxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHNldCBjdXN0b20gcGFuZWwgY2xhc3NcbiAgICAvLyBjb25zdCBwYW5lbENsYXNzID0gJ25vdm8tc2VsZWN0LXNlYXJjaC1wYW5lbCc7XG4gICAgLy8gaWYgKHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzKSB7XG4gICAgLy8gICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcykpIHtcbiAgICAvLyAgICAgKDxzdHJpbmdbXT50aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcykucHVzaChwYW5lbENsYXNzKTtcbiAgICAvLyAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9IFt0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcywgcGFuZWxDbGFzc107XG4gICAgLy8gICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyAgICAgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3NbcGFuZWxDbGFzc10gPSB0cnVlO1xuICAgIC8vICAgfVxuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9IHBhbmVsQ2xhc3M7XG4gICAgLy8gfVxuXG4gICAgLy8gc2V0IGN1c3RvbSBub3ZvLW9wdGlvbiBjbGFzcyBpZiB0aGUgY29tcG9uZW50IHdhcyBwbGFjZWQgaW5zaWRlIGEgbm92by1vcHRpb25cbiAgICBpZiAodGhpcy5ub3ZvT3B0aW9uKSB7XG4gICAgICB0aGlzLm5vdm9PcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5ub3ZvT3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5zLW5vdm8tc2VsZWN0LXNlYXJjaCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCc8bmd4LW5vdm8tc2VsZWN0LXNlYXJjaD4gbXVzdCBiZSBwbGFjZWQgaW5zaWRlIGEgPG5vdm8tb3B0aW9uPiBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gd2hlbiB0aGUgc2VsZWN0IGRyb3Bkb3duIHBhbmVsIGlzIG9wZW5lZCBvciBjbG9zZWRcbiAgICB0aGlzLm5vdm9TZWxlY3Qub3BlbmVkQ2hhbmdlLnBpcGUoZGVsYXkoMSksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKG9wZW5lZCkgPT4ge1xuICAgICAgaWYgKG9wZW5lZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgLy8gZm9jdXMgdGhlIHNlYXJjaCBmaWVsZCB3aGVuIG9wZW5pbmdcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVJbml0aWFsRm9jdXMpIHtcbiAgICAgICAgICB0aGlzLl9mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjbGVhciBpdCB3aGVuIGNsb3NpbmdcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJTZWFyY2hJbnB1dCkge1xuICAgICAgICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHNldCB0aGUgZmlyc3QgaXRlbSBhY3RpdmUgYWZ0ZXIgdGhlIG9wdGlvbnMgY2hhbmdlZFxuICAgIHRoaXMubm92b1NlbGVjdC5vcGVuZWRDaGFuZ2VcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Ll9rZXlNYW5hZ2VyKSB7XG4gICAgICAgICAgdGhpcy5ub3ZvU2VsZWN0Ll9rZXlNYW5hZ2VyLmNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWRqdXN0U2Nyb2xsVG9wVG9GaXRBY3RpdmVPcHRpb25JbnRvVmlldygpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnX2tleU1hbmFnZXIgd2FzIG5vdCBpbml0aWFsaXplZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnM7XG5cbiAgICAgICAgLy8gQ2xvc3VyZSB2YXJpYWJsZSBmb3IgdHJhY2tpbmcgdGhlIG1vc3QgcmVjZW50IGZpcnN0IG9wdGlvbi5cbiAgICAgICAgLy8gSW4gb3JkZXIgdG8gYXZvaWQgYXZvaWQgY2F1c2luZyB0aGUgbGlzdCB0b1xuICAgICAgICAvLyBzY3JvbGwgdG8gdGhlIHRvcCB3aGVuIG9wdGlvbnMgYXJlIGFkZGVkIHRvIHRoZSBib3R0b20gb2ZcbiAgICAgICAgLy8gdGhlIGxpc3QgKGVnOiBpbmZpbml0ZSBzY3JvbGwpLCB3ZSBjb21wYXJlIG9ubHlcbiAgICAgICAgLy8gdGhlIGNoYW5nZXMgdG8gdGhlIGZpcnN0IG9wdGlvbnMgdG8gZGV0ZXJtaW5lIGlmIHdlXG4gICAgICAgIC8vIHNob3VsZCBzZXQgdGhlIGZpcnN0IGl0ZW0gYXMgYWN0aXZlLlxuICAgICAgICAvLyBUaGlzIHByZXZlbnRzIHVubmVjZXNzYXJ5IHNjcm9sbGluZyB0byB0aGUgdG9wIG9mIHRoZSBsaXN0XG4gICAgICAgIC8vIHdoZW4gb3B0aW9ucyBhcmUgYXBwZW5kZWQsIGJ1dCBhbGxvd3MgdGhlIGZpcnN0IGl0ZW1cbiAgICAgICAgLy8gaW4gdGhlIGxpc3QgdG8gYmUgc2V0IGFzIGFjdGl2ZSBieSBkZWZhdWx0IHdoZW4gdGhlcmVcbiAgICAgICAgLy8gaXMgbm8gYWN0aXZlIHNlbGVjdGlvblxuICAgICAgICBsZXQgcHJldmlvdXNGaXJzdE9wdGlvbiA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpW3RoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpXTtcblxuICAgICAgICB0aGlzLl9vcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAvLyBhdm9pZCBcImV4cHJlc3Npb24gaGFzIGJlZW4gY2hhbmdlZFwiIGVycm9yXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBRdWVyeUxpc3QgdG8gYW4gYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgICAgICAgLy8gVGhlIHRydWUgZmlyc3QgaXRlbSBpcyBvZmZzZXQgYnkgMVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEZpcnN0T3B0aW9uID0gb3B0aW9uc1t0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKV07XG5cbiAgICAgICAgICAgIGNvbnN0IGtleU1hbmFnZXIgPSB0aGlzLm5vdm9TZWxlY3QuX2tleU1hbmFnZXI7XG4gICAgICAgICAgICBpZiAoa2V5TWFuYWdlciAmJiB0aGlzLm5vdm9TZWxlY3QucGFuZWxPcGVuKSB7XG4gICAgICAgICAgICAgIC8vIHNldCBmaXJzdCBpdGVtIGFjdGl2ZSBhbmQgaW5wdXQgd2lkdGhcblxuICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGZpcnN0IG9wdGlvbiBpbiB0aGVzZSBjaGFuZ2VzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cy5cbiAgICAgICAgICAgICAgY29uc3QgZmlyc3RPcHRpb25Jc0NoYW5nZWQgPSAhdGhpcy5ub3ZvU2VsZWN0LmNvbXBhcmVXaXRoKHByZXZpb3VzRmlyc3RPcHRpb24sIGN1cnJlbnRGaXJzdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgLy8gQ0FTRTogVGhlIGZpcnN0IG9wdGlvbiBpcyBkaWZmZXJlbnQgbm93LlxuICAgICAgICAgICAgICAvLyBJbmRpY2lhdGVzIHdlIHNob3VsZCBzZXQgaXQgYXMgYWN0aXZlIGFuZCBzY3JvbGwgdG8gdGhlIHRvcC5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGZpcnN0T3B0aW9uSXNDaGFuZ2VkIHx8XG4gICAgICAgICAgICAgICAgIWtleU1hbmFnZXIuYWN0aXZlSXRlbSB8fFxuICAgICAgICAgICAgICAgICFvcHRpb25zLmZpbmQoKG9wdGlvbikgPT4gdGhpcy5ub3ZvU2VsZWN0LmNvbXBhcmVXaXRoKG9wdGlvbiwga2V5TWFuYWdlci5hY3RpdmVJdGVtKSlcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAga2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIHdhaXQgZm9yIHBhbmVsIHdpZHRoIGNoYW5nZXNcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlU2Nyb2xsVG9BY3RpdmVPbk9wdGlvbnNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RTY3JvbGxUb3BUb0ZpdEFjdGl2ZU9wdGlvbkludG9WaWV3KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIG91ciByZWZlcmVuY2VcbiAgICAgICAgICAgIHByZXZpb3VzRmlyc3RPcHRpb24gPSBjdXJyZW50Rmlyc3RPcHRpb247XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBhZGQgb3IgcmVtb3ZlIGNzcyBjbGFzcyBkZXBlbmRpbmcgb24gd2hldGhlciB0byBzaG93IHRoZSBubyBlbnRyaWVzIGZvdW5kIG1lc3NhZ2VcbiAgICAvLyBub3RlOiB0aGlzIGlzIGhhY2t5XG4gICAgdGhpcy5fc2hvd05vRW50cmllc0ZvdW5kJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKHNob3dOb0VudHJpZXNGb3VuZCkgPT4ge1xuICAgICAgLy8gc2V0IG5vIGVudHJpZXMgZm91bmQgY2xhc3Mgb24gbWF0IG9wdGlvblxuICAgICAgaWYgKHRoaXMubm92b09wdGlvbikge1xuICAgICAgICBpZiAoc2hvd05vRW50cmllc0ZvdW5kKSB7XG4gICAgICAgICAgdGhpcy5ub3ZvT3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ25vdm8tc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5ub3ZvT3B0aW9uLl9nZXRIb3N0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoJ25vdm8tc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHJlc2l6ZSB0aGUgaW5wdXQgd2lkdGggd2hlbiB0aGUgdmlld3BvcnQgaXMgcmVzaXplZCwgaS5lLiB0aGUgdHJpZ2dlciB3aWR0aCBjb3VsZCBwb3RlbnRpYWxseSBiZSByZXNpemVkXG4gICAgdGhpcy5fdmlld3BvcnRSdWxlclxuICAgICAgLmNoYW5nZSgpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0LnBhbmVsT3Blbikge1xuICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuaW5pdE11bHRpcGxlSGFuZGxpbmcoKTtcblxuICAgIHRoaXMub3B0aW9uc0xpc3QkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyB1cGRhdGUgdmlldyB3aGVuIGF2YWlsYWJsZSBvcHRpb25zIGNoYW5nZVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9lbWl0U2VsZWN0QWxsQm9vbGVhblRvUGFyZW50KHN0YXRlOiBib29sZWFuKSB7XG4gICAgdGhpcy50b2dnbGVBbGwuZW1pdChzdGF0ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgX2lzVG9nZ2xlQWxsQ2hlY2tib3hWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vdm9TZWxlY3QubXVsdGlwbGUgJiYgdGhpcy5zaG93VG9nZ2xlQWxsQ2hlY2tib3g7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUga2V5IGRvd24gZXZlbnQgd2l0aCBOb3ZvU2VsZWN0RWxlbWVudC5cbiAgICogQWxsb3dzIGUuZy4gc2VsZWN0aW5nIHdpdGggZW50ZXIga2V5LCBuYXZpZ2F0aW9uIHdpdGggYXJyb3cga2V5cywgZXRjLlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gUHJldmVudCBwcm9wYWdhdGlvbiBmb3IgYWxsIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIGluIG9yZGVyIHRvIGF2b2lkIHNlbGVjdGlvbiBpc3N1ZXNcbiAgICBpZiAoXG4gICAgICAoZXZlbnQua2V5ICYmIGV2ZW50LmtleS5sZW5ndGggPT09IDEpIHx8XG4gICAgICBpc0FscGhhTnVtZXJpYyhldmVudC5rZXkpIHx8XG4gICAgICBldmVudC5rZXkgPT09IEtleS5TcGFjZSB8fFxuICAgICAgKHRoaXMucHJldmVudEhvbWVFbmRLZXlQcm9wYWdhdGlvbiAmJiAoZXZlbnQua2V5ID09PSBLZXkuSG9tZSB8fCBldmVudC5rZXkgPT09IEtleS5FbmQpKVxuICAgICkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubm92b1NlbGVjdC5tdWx0aXBsZSAmJiBldmVudC5rZXkgJiYgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIpIHtcbiAgICAgIC8vIFJlZ2FpbiBmb2N1cyBhZnRlciBtdWx0aXNlbGVjdCwgc28gd2UgY2FuIGZ1cnRoZXIgdHlwZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb2N1cygpKTtcbiAgICB9XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgaWYgY2xpY2sgRXNjYXBlLCBpZiBpbnB1dCBpcyBlbXB0eSwgY2xvc2UgdGhlIGRyb3Bkb3duLCBpZiBub3QsIGVtcHR5IG91dCB0aGUgc2VhcmNoIGZpZWxkXG4gICAgaWYgKHRoaXMuZW5hYmxlQ2xlYXJPbkVzY2FwZVByZXNzZWQgPT09IHRydWUgJiYgZXZlbnQua2V5ID09PSBLZXkuRXNjYXBlICYmIHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX3Jlc2V0KHRydWUpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGtleSB1cCBldmVudCB3aXRoIE5vdm9TZWxlY3RFbGVtZW50LlxuICAgKiBBbGxvd3MgZS5nLiB0aGUgYW5ub3VuY2luZyBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZURlc2NlbmRhbnQgYnkgc2NyZWVuIHJlYWRlcnMuXG4gICAqL1xuICBfaGFuZGxlS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQXJyb3dVcCB8fCBldmVudC5rZXkgPT09IEtleS5BcnJvd0Rvd24pIHtcbiAgICAgIGNvbnN0IGFyaWFBY3RpdmVEZXNjZW5kYW50SWQgPSB0aGlzLm5vdm9TZWxlY3QuX2dldEFyaWFBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX29wdGlvbnMudG9BcnJheSgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gYXJpYUFjdGl2ZURlc2NlbmRhbnRJZCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZURlc2NlbmRhbnQgPSB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKVtpbmRleF07XG4gICAgICAgIHRoaXMubGl2ZUFubm91bmNlci5hbm5vdW5jZShcbiAgICAgICAgICBhY3RpdmVEZXNjZW5kYW50LnZpZXdWYWx1ZSArICcgJyArIHRoaXMuZ2V0QXJpYUluZGV4KGluZGV4KSArIHRoaXMuaW5kZXhBbmRMZW5ndGhTY3JlZW5SZWFkZXJUZXh0ICsgdGhpcy5nZXRBcmlhTGVuZ3RoKCksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgb3B0aW9uLCB0YWtpbmcgdGhlIG9mZnNldCB0byBsZW5ndGggaW50byBhY2NvdW50LlxuICAgKiBleGFtcGxlczpcbiAgICogICAgQ2FzZSAxIFtTZWFyY2gsIDEsIDIsIDNdIHdpbGwgaGF2ZSBvZmZzZXQgb2YgMSwgZHVlIHRvIHNlYXJjaCBhbmQgd2lsbCByZWFkIGluZGV4IG9mIHRvdGFsLlxuICAgKiAgICBDYXNlIDIgWzEsIDIsIDNdIHdpbGwgaGF2ZSBvZmZzZXQgb2YgMCBhbmQgd2lsbCByZWFkIGluZGV4ICsxIG9mIHRvdGFsLlxuICAgKi9cbiAgZ2V0QXJpYUluZGV4KG9wdGlvbkluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG9wdGlvbkluZGV4ICsgMTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbkluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBvcHRpb25zLCB0YWtpbmcgdGhlIG9mZnNldCB0byBsZW5ndGggaW50byBhY2NvdW50LlxuICAgKiBleGFtcGxlczpcbiAgICogICAgQ2FzZSAxIFtTZWFyY2gsIDEsIDIsIDNdIHdpbGwgaGF2ZSBsZW5ndGggb2Ygb3B0aW9ucy5sZW5ndGggLTEsIGR1ZSB0byBzZWFyY2guXG4gICAqICAgIENhc2UgMiBbMSwgMiwgM10gd2lsbCBoYXZlIGxlbmd0aCBvZiBvcHRpb25zLmxlbmd0aC5cbiAgICovXG4gIGdldEFyaWFMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucy50b0FycmF5KCkubGVuZ3RoIC0gdGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9sYXN0RXh0ZXJuYWxJbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgIT09IHRoaXMuX2xhc3RFeHRlcm5hbElucHV0VmFsdWUpLFxuICAgICAgICB0YXAoKCkgPT4gKHRoaXMuX2xhc3RFeHRlcm5hbElucHV0VmFsdWUgPSB1bmRlZmluZWQpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGZuKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbikge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgc2VhcmNoIGlucHV0IGZpZWxkXG4gICAqL1xuICBwdWJsaWMgX2ZvY3VzKCkge1xuICAgIGlmICghdGhpcy5zZWFyY2hTZWxlY3RJbnB1dCB8fCAhdGhpcy5ub3ZvU2VsZWN0LnBhbmVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHNhdmUgYW5kIHJlc3RvcmUgc2Nyb2xsVG9wIG9mIHBhbmVsLCBzaW5jZSBpdCB3aWxsIGJlIHJlc2V0IGJ5IGZvY3VzKClcbiAgICAvLyBub3RlOiB0aGlzIGlzIGhhY2t5XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLm5vdm9TZWxlY3QucGFuZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSBwYW5lbC5zY3JvbGxUb3A7XG5cbiAgICAvLyBmb2N1c1xuICAgIHRoaXMuc2VhcmNoU2VsZWN0SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgcGFuZWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY3VycmVudCBzZWFyY2ggdmFsdWVcbiAgICogQHBhcmFtIGZvY3VzIHdoZXRoZXIgdG8gZm9jdXMgYWZ0ZXIgcmVzZXR0aW5nXG4gICAqL1xuICBwdWJsaWMgX3Jlc2V0KGZvY3VzPzogYm9vbGVhbikge1xuICAgIHRoaXMuX2Zvcm1Db250cm9sLnNldFZhbHVlKCcnKTtcbiAgICBpZiAoZm9jdXMpIHtcbiAgICAgIHRoaXMuX2ZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGhhbmRsaW5nIDxub3ZvLXNlbGVjdCBbbXVsdGlwbGVdPVwidHJ1ZVwiPlxuICAgKiBOb3RlOiB0byBpbXByb3ZlIHRoaXMgY29kZSwgbm92by1zZWxlY3Qgc2hvdWxkIGJlIGV4dGVuZGVkIHRvIGFsbG93IGRpc2FibGluZyByZXNldHRpbmcgdGhlIHNlbGVjdGlvbiB3aGlsZSBmaWx0ZXJpbmcuXG4gICAqL1xuICBwcml2YXRlIGluaXRNdWx0aXBsZUhhbmRsaW5nKCkge1xuICAgIGlmICghdGhpcy5ub3ZvU2VsZWN0Lm5nQ29udHJvbCkge1xuICAgICAgaWYgKHRoaXMubm92b1NlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICAvLyBub3RlOiB0aGUgYWNjZXNzIHRvIG5vdm9TZWxlY3QubmdDb250cm9sIChpbnN0ZWFkIG9mIG5vdm9TZWxlY3QudmFsdWUgLyBub3ZvU2VsZWN0LnZhbHVlQ2hhbmdlcylcbiAgICAgICAgLy8gaXMgbmVjZXNzYXJ5IHRvIHByb3Blcmx5IHdvcmsgaW4gbXVsdGktc2VsZWN0aW9uIG1vZGUuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3RoZSBub3ZvLXNlbGVjdCBjb250YWluaW5nIG5neC1ub3ZvLXNlbGVjdC1zZWFyY2ggbXVzdCBoYXZlIGEgbmdNb2RlbCBvciBmb3JtQ29udHJvbCBkaXJlY3RpdmUgd2hlbiBtdWx0aXBsZT10cnVlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGlmIDxub3ZvLXNlbGVjdCBbbXVsdGlwbGVdPVwidHJ1ZVwiPlxuICAgIC8vIHN0b3JlIHByZXZpb3VzbHkgc2VsZWN0ZWQgdmFsdWVzIGFuZCByZXN0b3JlIHRoZW0gd2hlbiB0aGV5IGFyZSBkZXNlbGVjdGVkXG4gICAgLy8gYmVjYXVzZSB0aGUgb3B0aW9uIGlzIG5vdCBhdmFpbGFibGUgd2hpbGUgd2UgYXJlIGN1cnJlbnRseSBmaWx0ZXJpbmdcbiAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgPSB0aGlzLm5vdm9TZWxlY3QubmdDb250cm9sLnZhbHVlO1xuXG4gICAgdGhpcy5ub3ZvU2VsZWN0Lm5nQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCh2YWx1ZXMpID0+IHtcbiAgICAgIGxldCByZXN0b3JlU2VsZWN0ZWRWYWx1ZXMgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLm5vdm9TZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICh0aGlzLmFsd2F5c1Jlc3RvcmVTZWxlY3RlZE9wdGlvbnNNdWx0aSB8fCAodGhpcy5fZm9ybUNvbnRyb2wudmFsdWUgJiYgdGhpcy5fZm9ybUNvbnRyb2wudmFsdWUubGVuZ3RoKSkgJiZcbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMgJiZcbiAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCF2YWx1ZXMgfHwgIUFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IHRoaXMubm92b1NlbGVjdC5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiBvcHRpb24udmFsdWUpO1xuICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcy5mb3JFYWNoKChwcmV2aW91c1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICF2YWx1ZXMuc29tZSgodikgPT4gdGhpcy5ub3ZvU2VsZWN0LmNvbXBhcmVXaXRoKHYsIHByZXZpb3VzVmFsdWUpKSAmJlxuICAgICAgICAgICAgICAhb3B0aW9uVmFsdWVzLnNvbWUoKHYpID0+IHRoaXMubm92b1NlbGVjdC5jb21wYXJlV2l0aCh2LCBwcmV2aW91c1ZhbHVlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvLyBpZiBhIHZhbHVlIHRoYXQgd2FzIHNlbGVjdGVkIGJlZm9yZSBpcyBkZXNlbGVjdGVkIGFuZCBub3QgZm91bmQgaW4gdGhlIG9wdGlvbnMsIGl0IHdhcyBkZXNlbGVjdGVkXG4gICAgICAgICAgICAgIC8vIGR1ZSB0byB0aGUgZmlsdGVyaW5nLCBzbyB3ZSByZXN0b3JlIGl0LlxuICAgICAgICAgICAgICB2YWx1ZXMucHVzaChwcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgICAgICAgcmVzdG9yZVNlbGVjdGVkVmFsdWVzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzID0gdmFsdWVzO1xuXG4gICAgICBpZiAocmVzdG9yZVNlbGVjdGVkVmFsdWVzKSB7XG4gICAgICAgIC8vIFRPRE86IEZpeCB0aGlzXG4gICAgICAgIC8vIHRoaXMubm92b1NlbGVjdC5fb25DaGFuZ2UodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbiBpbnRvIHRoZSB2aWV3IGlmIGl0IGlzIG5vdCB5ZXQgdmlzaWJsZS5cbiAgICovXG4gIHByaXZhdGUgYWRqdXN0U2Nyb2xsVG9wVG9GaXRBY3RpdmVPcHRpb25JbnRvVmlldygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub3ZvU2VsZWN0LnBhbmVsICYmIHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBub3ZvT3B0aW9uSGVpZ2h0ID0gdGhpcy5nZXROb3ZvT3B0aW9uSGVpZ2h0KCk7XG4gICAgICBjb25zdCBhY3RpdmVPcHRpb25JbmRleCA9IHRoaXMubm92b1NlbGVjdC5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggfHwgMDtcbiAgICAgIGNvbnN0IGxhYmVsQ291bnQgPSBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbihhY3RpdmVPcHRpb25JbmRleCwgdGhpcy5ub3ZvU2VsZWN0LmNvbnRlbnRPcHRpb25zLCB0aGlzLm5vdm9TZWxlY3Qub3B0aW9uR3JvdXBzKTtcbiAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgaXMgaW4gYSBOb3ZvT3B0aW9uLCB0aGUgYWN0aXZlSXRlbUluZGV4IHdpbGwgYmUgb2Zmc2V0IGJ5IG9uZS5cbiAgICAgIGNvbnN0IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ID0gKHRoaXMubm92b09wdGlvbiA/IC0xIDogMCkgKyBsYWJlbENvdW50ICsgYWN0aXZlT3B0aW9uSW5kZXg7XG4gICAgICBjb25zdCBjdXJyZW50U2Nyb2xsVG9wID0gdGhpcy5ub3ZvU2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICBjb25zdCBzZWFyY2hJbnB1dEhlaWdodCA9IHRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICBjb25zdCBhbW91bnRPZlZpc2libGVPcHRpb25zID0gTWF0aC5mbG9vcigoU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgLSBzZWFyY2hJbnB1dEhlaWdodCkgLyBub3ZvT3B0aW9uSGVpZ2h0KTtcblxuICAgICAgY29uc3QgaW5kZXhPZkZpcnN0VmlzaWJsZU9wdGlvbiA9IE1hdGgucm91bmQoKGN1cnJlbnRTY3JvbGxUb3AgKyBzZWFyY2hJbnB1dEhlaWdodCkgLyBub3ZvT3B0aW9uSGVpZ2h0KSAtIDE7XG5cbiAgICAgIGlmIChpbmRleE9mRmlyc3RWaXNpYmxlT3B0aW9uID49IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3KSB7XG4gICAgICAgIHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ICogbm92b09wdGlvbkhlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXhPZkZpcnN0VmlzaWJsZU9wdGlvbiArIGFtb3VudE9mVmlzaWJsZU9wdGlvbnMgPD0gaW5kZXhPZk9wdGlvblRvRml0SW50b1ZpZXcpIHtcbiAgICAgICAgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID1cbiAgICAgICAgICAoaW5kZXhPZk9wdGlvblRvRml0SW50b1ZpZXcgKyAxKSAqIG5vdm9PcHRpb25IZWlnaHQgLSAoU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgLSBzZWFyY2hJbnB1dEhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBTZXQgdGhlIHdpZHRoIG9mIHRoZSBpbm5lclNlbGVjdFNlYXJjaCB0byBmaXQgZXZlbiBjdXN0b20gc2Nyb2xsYmFyc1xuICAgKiAgQW5kIHN1cHBvcnQgYWxsIE9wZXJhdGlvbiBTeXN0ZW1zXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlSW5wdXRXaWR0aCgpIHtcbiAgICBpZiAoIXRoaXMuaW5uZXJTZWxlY3RTZWFyY2ggfHwgIXRoaXMuaW5uZXJTZWxlY3RTZWFyY2gubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHBhbmVsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50KSkge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3ZvLXNlbGVjdC1wYW5lbCcpKSB7XG4gICAgICAgIHBhbmVsRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFuZWxFbGVtZW50KSB7XG4gICAgICB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBwYW5lbEVsZW1lbnQuY2xpZW50V2lkdGggKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Tm92b09wdGlvbkhlaWdodCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucy5maXJzdC5fZ2V0SG9zdEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBvZmZzZXQgdG8gbGVuZ3RoIHRoYXQgY2FuIGJlIGNhdXNlZCBieSB0aGUgb3B0aW9uYWwgbm92b09wdGlvbiB1c2VkIGFzIGEgc2VhcmNoIGlucHV0LlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMubm92b09wdGlvbikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxufVxuIiwiPCEtLSBQbGFjZWhvbGRlciB0byBhZGp1c3QgdmVydGljYWwgb2Zmc2V0IG9mIHRoZSBub3ZvLW9wdGlvbiBlbGVtZW50cyAtLT5cbjxpbnB1dCBub3ZvSW5wdXQgY2xhc3M9XCJub3ZvLXNlbGVjdC1zZWFyY2gtaW5wdXQgbm92by1zZWxlY3Qtc2VhcmNoLWhpZGRlblwiIC8+XG5cbjwhLS0gTm90ZTogdGhlICBub3ZvLWRhdGVwaWNrZXItY29udGVudCBub3ZvLXRhYi1oZWFkZXIgYXJlIG5lZWRlZCB0byBpbmhlcml0IHRoZSBub3ZvZXJpYWwgdGhlbWUgY29sb3JzLCBzZWUgUFIgIzIyIC0tPlxuPGRpdlxuICAjaW5uZXJTZWxlY3RTZWFyY2hcbiAgY2xhc3M9XCJub3ZvLXNlbGVjdC1zZWFyY2gtaW5uZXIgbm92by10eXBvZ3JhcGh5IG5vdm8tZGF0ZXBpY2tlci1jb250ZW50IG5vdm8tdGFiLWhlYWRlclwiXG4gIFtuZ0NsYXNzXT1cInsnbm92by1zZWxlY3Qtc2VhcmNoLWlubmVyLW11bHRpcGxlJzogbm92b1NlbGVjdC5tdWx0aXBsZSwgJ25vdm8tc2VsZWN0LXNlYXJjaC1pbm5lci10b2dnbGUtYWxsJzogX2lzVG9nZ2xlQWxsQ2hlY2tib3hWaXNpYmxlKCkgfVwiPlxuXG4gIDxub3ZvLWNoZWNrYm94ICpuZ0lmPVwiX2lzVG9nZ2xlQWxsQ2hlY2tib3hWaXNpYmxlKClcIlxuICAgIFtjb2xvcl09XCIncHJpbWFyeSdcIlxuICAgIGNsYXNzPVwibm92by1zZWxlY3Qtc2VhcmNoLXRvZ2dsZS1hbGwtY2hlY2tib3hcIlxuICAgIFtjaGVja2VkXT1cInRvZ2dsZUFsbENoZWNrYm94Q2hlY2tlZFwiXG4gICAgW2luZGV0ZXJtaW5hdGVdPVwidG9nZ2xlQWxsQ2hlY2tib3hJbmRldGVybWluYXRlXCJcbiAgICBbdG9vbHRpcF09XCJ0b2dnbGVBbGxDaGVja2JveFRvb2x0aXBNZXNzYWdlXCJcbiAgICB0b29sdGlwQ2xhc3M9XCJuZ3gtbm92by1zZWxlY3Qtc2VhcmNoLXRvZ2dsZS1hbGwtdG9vbHRpcFwiXG4gICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29nbGVBbGxDaGVja2JveFRvb2x0aXBQb3NpdGlvblwiXG4gICAgKGNoYW5nZSk9XCJfZW1pdFNlbGVjdEFsbEJvb2xlYW5Ub1BhcmVudCgkZXZlbnQuY2hlY2tlZClcIj48L25vdm8tY2hlY2tib3g+XG5cbiAgPG5vdm8taWNvbiBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1pY29uLXByZWZpeFwiPnNlYXJjaDwvbm92by1pY29uPlxuXG4gIDxpbnB1dCBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1pbnB1dCBub3ZvLWlucHV0LWVsZW1lbnRcIlxuICAgICNzZWFyY2hTZWxlY3RJbnB1dFxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgW3R5cGVdPVwidHlwZVwiXG4gICAgW2Zvcm1Db250cm9sXT1cIl9mb3JtQ29udHJvbFwiXG4gICAgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgKGtleXVwKT1cIl9oYW5kbGVLZXl1cCgkZXZlbnQpXCJcbiAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyTGFiZWxcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCIgLz5cbiAgPG5vdm8tc3Bpbm5lciAqbmdJZj1cInNlYXJjaGluZ1wiXG4gICAgY2xhc3M9XCJub3ZvLXNlbGVjdC1zZWFyY2gtc3Bpbm5lclwiXG4gICAgZGlhbWV0ZXI9XCIxNlwiPjwvbm92by1zcGlubmVyPlxuXG4gIDxub3ZvLWJ1dHRvblxuICAgICpuZ0lmPVwiIWhpZGVDbGVhclNlYXJjaEJ1dHRvbiAmJiB2YWx1ZSAmJiAhc2VhcmNoaW5nXCJcbiAgICBhcmlhLWxhYmVsPVwiQ2xlYXJcIlxuICAgIChjbGljayk9XCJfcmVzZXQodHJ1ZSlcIlxuICAgIHRoZW1lPVwiaWNvblwiXG4gICAgc2l6ZT1cInNtYWxsXCJcbiAgICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1jbGVhclwiPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiY2xlYXJJY29uOyBlbHNlIGRlZmF1bHRJY29uXCIgc2VsZWN0PVwiW25vdm9TZWxlY3RTZWFyY2hDbGVhcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0SWNvbj5cbiAgICAgIDxub3ZvLWljb24+Y2xvc2U8L25vdm8taWNvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICA8L25vdm8tYnV0dG9uPlxuXG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIi5ub3ZvLXNlbGVjdC1zZWFyY2gtY3VzdG9tLWhlYWRlci1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuXG48L2Rpdj5cblxuPGRpdiAqbmdJZj1cIl9zaG93Tm9FbnRyaWVzRm91bmQkIHwgYXN5bmNcIlxuICBjbGFzcz1cIm5vdm8tc2VsZWN0LXNlYXJjaC1uby1lbnRyaWVzLWZvdW5kXCI+XG4gIHt7bm9FbnRyaWVzRm91bmRMYWJlbH19XG48L2Rpdj4iXX0=