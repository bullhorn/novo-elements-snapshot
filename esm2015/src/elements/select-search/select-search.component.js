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
NovoSelectSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'novo-select-search',
                template: "<!-- Placeholder to adjust vertical offset of the novo-option elements -->\n<input novoInput class=\"novo-select-search-input novo-select-search-hidden\" />\n\n<!-- Note: the  novo-datepicker-content novo-tab-header are needed to inherit the novoerial theme colors, see PR #22 -->\n<div\n  #innerSelectSearch\n  class=\"novo-select-search-inner novo-typography novo-datepicker-content novo-tab-header\"\n  [ngClass]=\"{'novo-select-search-inner-multiple': novoSelect.multiple, 'novo-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\n\n  <novo-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\n    [color]=\"'primary'\"\n    class=\"novo-select-search-toggle-all-checkbox\"\n    [checked]=\"toggleAllCheckboxChecked\"\n    [indeterminate]=\"toggleAllCheckboxIndeterminate\"\n    [tooltip]=\"toggleAllCheckboxTooltipMessage\"\n    tooltipClass=\"ngx-novo-select-search-toggle-all-tooltip\"\n    [tooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\n    (change)=\"_emitSelectAllBooleanToParent($event.checked)\"></novo-checkbox>\n\n  <novo-icon class=\"novo-select-search-icon-prefix\">search</novo-icon>\n\n  <input class=\"novo-select-search-input novo-input-element\"\n    #searchSelectInput\n    [name]=\"name\"\n    autocomplete=\"off\"\n    [type]=\"type\"\n    [formControl]=\"_formControl\"\n    (keydown)=\"_handleKeydown($event)\"\n    (keyup)=\"_handleKeyup($event)\"\n    (blur)=\"onBlur()\"\n    [placeholder]=\"placeholderLabel\"\n    [attr.aria-label]=\"ariaLabel\" />\n  <novo-spinner *ngIf=\"searching\"\n    class=\"novo-select-search-spinner\"\n    diameter=\"16\"></novo-spinner>\n\n  <novo-button\n    *ngIf=\"!hideClearSearchButton && value && !searching\"\n    aria-label=\"Clear\"\n    (click)=\"_reset(true)\"\n    theme=\"icon\"\n    size=\"small\"\n    class=\"novo-select-search-clear\">\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[novoSelectSearchClear]\"></ng-content>\n    <ng-template #defaultIcon>\n      <novo-icon>close</novo-icon>\n    </ng-template>\n  </novo-button>\n\n  <ng-content select=\".novo-select-search-custom-header-content\"></ng-content>\n\n</div>\n\n<div *ngIf=\"_showNoEntriesFound$ | async\"\n  class=\"novo-select-search-no-entries-found\">\n  {{noEntriesFoundLabel}}\n</div>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NovoSelectSearchComponent),
                        multi: true,
                    },
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".novo-select-search-hidden{visibility:hidden}.novo-select-search-inner{-webkit-transform:translateZ(0);border-bottom-style:solid;border-bottom-width:1px;border-radius:0;box-shadow:none;font-size:inherit;min-width:190px;position:absolute;top:0;width:100%;z-index:100}.novo-select-search-inner.novo-select-search-inner-multiple{width:100%}.novo-select-search-inner.novo-select-search-inner-multiple.novo-select-search-inner-toggle-all{align-items:center;display:flex}.novo-select-search-inner .novo-input-element{border:none;flex-basis:auto}.novo-select-search-inner .novo-input-element:focus{border-radius:0!important;outline:none}.novo-select-search-inner .novo-input-element:-ms-input-placeholder{-ms-user-select:text}::ng-deep .novo-select-search-panel{overflow-x:hidden;transform:none!important}.novo-select-search-input{box-sizing:border-box;padding:1rem 24px 1rem 40px;width:100%}:host-context([dir=rtl]) .novo-select-search-input{padding-left:24px;padding-right:16px}.novo-select-search-no-entries-found{padding:16px}.novo-select-search-icon-prefix{left:16px;position:absolute;top:7px}.novo-select-search-clear{position:absolute;right:4px;top:5px}:host-context([dir=rtl]) .novo-select-search-clear{left:4px;right:auto}.novo-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .novo-select-search-spinner{left:16px;right:auto}:host.novo-select-search-inside-novo-option .novo-select-search-input{height:3em;line-height:3em;padding-bottom:0;padding-top:0}:host.novo-select-search-inside-novo-option .novo-select-search-clear{top:6px}:host.novo-select-search-inside-novo-option .novo-select-search-icon-prefix{left:16px;top:7px}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search{padding:0;position:static}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search .novo-icon{margin-left:0;margin-right:0}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search .novo-option-pseudo-checkbox{display:none}::ng-deep .novo-option[aria-disabled=true].contains-novo-select-search.novo-select-search-no-entries-found{height:6em}.novo-select-search-toggle-all-checkbox{padding-bottom:2px;padding-left:16px}:host-context([dir=rtl]) .novo-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}"]
            },] }
];
NovoSelectSearchComponent.ctorParameters = () => [
    { type: NovoSelectElement, decorators: [{ type: Inject, args: [NovoSelectElement,] }] },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: NovoOption, decorators: [{ type: Optional }, { type: Inject, args: [NovoOption,] }] },
    { type: LiveAnnouncer },
    { type: NovoFieldElement, decorators: [{ type: Optional }, { type: Inject, args: [NovoFieldElement,] }] }
];
NovoSelectSearchComponent.propDecorators = {
    name: [{ type: Input }],
    placeholderLabel: [{ type: Input }],
    type: [{ type: Input }],
    noEntriesFoundLabel: [{ type: Input }],
    indexAndLengthScreenReaderText: [{ type: Input }],
    clearSearchInput: [{ type: Input }],
    searching: [{ type: Input }],
    disableInitialFocus: [{ type: Input }],
    enableClearOnEscapePressed: [{ type: Input }],
    preventHomeEndKeyPropagation: [{ type: Input }],
    disableScrollToActiveOnOptionsChanged: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    showToggleAllCheckbox: [{ type: Input }],
    toggleAllCheckboxChecked: [{ type: Input }],
    toggleAllCheckboxIndeterminate: [{ type: Input }],
    toggleAllCheckboxTooltipMessage: [{ type: Input }],
    toogleAllCheckboxTooltipPosition: [{ type: Input }],
    hideClearSearchButton: [{ type: Input }],
    alwaysRestoreSelectedOptionsMulti: [{ type: Input }],
    toggleAll: [{ type: Output }],
    searchSelectInput: [{ type: ViewChild, args: ['searchSelectInput', { read: ElementRef, static: true },] }],
    innerSelectSearch: [{ type: ViewChild, args: ['innerSelectSearch', { read: ElementRef, static: true },] }],
    clearIcon: [{ type: ContentChild, args: [NovoSelectSearchClearDirective, { static: false },] }],
    isInsideNovoOption: [{ type: HostBinding, args: ['class.novo-select-search-inside-novo-option',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc2VsZWN0LXNlYXJjaC9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGNBQWMsRUFBTyxNQUFNLGFBQWEsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLDZCQUE2QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFD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T3BCLFFBQVEsWUFBSSxNQUFNLFNBQUMsZ0JBQWdCOzs7bUJBdElyQyxLQUFLOytCQUVMLEtBQUs7bUJBR0wsS0FBSztrQ0FHTCxLQUFLOzZDQU9MLEtBQUs7K0JBTUwsS0FBSzt3QkFHTCxLQUFLO2tDQUdMLEtBQUs7eUNBR0wsS0FBSzsyQ0FNTCxLQUFLO29EQUdMLEtBQUs7d0JBR0wsS0FBSztvQ0FHTCxLQUFLO3VDQUdMLEtBQUs7NkNBR0wsS0FBSzs4Q0FHTCxLQUFLOytDQUdMLEtBQUs7b0NBR0wsS0FBSztnREFNTCxLQUFLO3dCQUdMLE1BQU07Z0NBR04sU0FBUyxTQUFDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dDQUdqRSxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7d0JBR2pFLFlBQVksU0FBQyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7aUNBRTlELFdBQVcsU0FBQyw2Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXZlQW5ub3VuY2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzQWxwaGFOdW1lcmljLCBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uLCBfY291bnRHcm91cExhYmVsc0JlZm9yZU9wdGlvbiB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRFbGVtZW50IH0gZnJvbSAnLi4vZmllbGQnO1xuaW1wb3J0IHsgTm92b1NlbGVjdEVsZW1lbnQgfSBmcm9tICcuLi9zZWxlY3QnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLWNsZWFyLmRpcmVjdGl2ZSc7XG5cbi8qKiBUaGUgbWF4IGhlaWdodCBvZiB0aGUgc2VsZWN0J3Mgb3ZlcmxheSBwYW5lbC4gKi9cbmNvbnN0IFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUID0gMjU2O1xubGV0IGF1dG9JbmNyZW1lbnQgPSAxO1xuLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nIGNvbXBvbmVudC1zZWxlY3RvciAqL1xuLyoqXG4gKiBDb21wb25lbnQgcHJvdmlkaW5nIGFuIGlucHV0IGZpZWxkIGZvciBzZWFyY2hpbmcgTm92b1NlbGVjdEVsZW1lbnQgb3B0aW9ucy5cbiAqXG4gKiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGludGVyZmFjZSBCYW5rIHtcbiAqICBpZDogc3RyaW5nO1xuICogIG5hbWU6IHN0cmluZztcbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAtZGF0YS1zZWxlY3Rpb24nLFxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxub3ZvLWZvcm0tZmllbGQ+XG4gKiAgICAgICA8bm92by1zZWxlY3QgW2Zvcm1Db250cm9sXT1cImJhbmtDdHJsXCIgcGxhY2Vob2xkZXI9XCJCYW5rXCI+XG4gKiAgICAgICAgIDxub3ZvLW9wdGlvbj5cbiAqICAgICAgICAgICA8bmd4LW5vdm8tc2VsZWN0LXNlYXJjaCBbZm9ybUNvbnRyb2xdPVwiYmFua0ZpbHRlckN0cmxcIj48L25neC1ub3ZvLXNlbGVjdC1zZWFyY2g+XG4gKiAgICAgICAgIDwvbm92by1vcHRpb24+XG4gKiAgICAgICAgIDxub3ZvLW9wdGlvbiAqbmdGb3I9XCJsZXQgYmFuayBvZiBmaWx0ZXJlZEJhbmtzIHwgYXN5bmNcIiBbdmFsdWVdPVwiYmFuay5pZFwiPlxuICogICAgICAgICAgIHt7YmFuay5uYW1lfX1cbiAqICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAqICAgICAgIDwvbm92by1zZWxlY3Q+XG4gKiAgICAgPC9ub3ZvLWZvcm0tZmllbGQ+XG4gKiAgIGBcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgRGF0YVNlbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAqXG4gKiAgIC8vIGNvbnRyb2wgZm9yIHRoZSBzZWxlY3RlZCBiYW5rXG4gKiAgIHB1YmxpYyBiYW5rQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAqICAgLy8gY29udHJvbCBmb3IgdGhlIE5vdm9TZWxlY3RFbGVtZW50IGZpbHRlciBrZXl3b3JkXG4gKiAgIHB1YmxpYyBiYW5rRmlsdGVyQ3RybDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAqXG4gKiAgIC8vIGxpc3Qgb2YgYmFua3NcbiAqICAgcHJpdmF0ZSBiYW5rczogQmFua1tdID0gW3tuYW1lOiAnQmFuayBBJywgaWQ6ICdBJ30sIHtuYW1lOiAnQmFuayBCJywgaWQ6ICdCJ30sIHtuYW1lOiAnQmFuayBDJywgaWQ6ICdDJ31dO1xuICogICAvLyBsaXN0IG9mIGJhbmtzIGZpbHRlcmVkIGJ5IHNlYXJjaCBrZXl3b3JkXG4gKiAgIHB1YmxpYyBmaWx0ZXJlZEJhbmtzOiBSZXBsYXlTdWJqZWN0PEJhbmtbXT4gPSBuZXcgUmVwbGF5U3ViamVjdDxCYW5rW10+KDEpO1xuICpcbiAqICAgLy8gU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gKiAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gKlxuICpcbiAqICAgbmdPbkluaXQoKSB7XG4gKiAgICAgLy8gbG9hZCB0aGUgaW5pdGlhbCBiYW5rIGxpc3RcbiAqICAgICB0aGlzLmZpbHRlcmVkQmFua3MubmV4dCh0aGlzLmJhbmtzLnNsaWNlKCkpO1xuICogICAgIC8vIGxpc3RlbiBmb3Igc2VhcmNoIGZpZWxkIHZhbHVlIGNoYW5nZXNcbiAqICAgICB0aGlzLmJhbmtGaWx0ZXJDdHJsLnZhbHVlQ2hhbmdlc1xuICogICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gKiAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAqICAgICAgICAgdGhpcy5maWx0ZXJCYW5rcygpO1xuICogICAgICAgfSk7XG4gKiAgIH1cbiAqXG4gKiAgIG5nT25EZXN0cm95KCkge1xuICogICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gKiAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gKiAgIH1cbiAqXG4gKiAgIHByaXZhdGUgZmlsdGVyQmFua3MoKSB7XG4gKiAgICAgaWYgKCF0aGlzLmJhbmtzKSB7XG4gKiAgICAgICByZXR1cm47XG4gKiAgICAgfVxuICpcbiAqICAgICAvLyBnZXQgdGhlIHNlYXJjaCBrZXl3b3JkXG4gKiAgICAgbGV0IHNlYXJjaCA9IHRoaXMuYmFua0ZpbHRlckN0cmwudmFsdWU7XG4gKiAgICAgaWYgKCFzZWFyY2gpIHtcbiAqICAgICAgIHRoaXMuZmlsdGVyZWRCYW5rcy5uZXh0KHRoaXMuYmFua3Muc2xpY2UoKSk7XG4gKiAgICAgICByZXR1cm47XG4gKiAgICAgfSBlbHNlIHtcbiAqICAgICAgIHNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICogICAgIH1cbiAqXG4gKiAgICAgLy8gZmlsdGVyIHRoZSBiYW5rc1xuICogICAgIHRoaXMuZmlsdGVyZWRCYW5rcy5uZXh0KFxuICogICAgICAgdGhpcy5iYW5rcy5maWx0ZXIoYmFuayA9PiBiYW5rLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgPiAtMSlcbiAqICAgICApO1xuICogICB9XG4gKiB9XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc2VsZWN0LXNlYXJjaCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5vdm9TZWxlY3RTZWFyY2hDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBuYW1lID0gJ3NlbGVjdC1zZWFyY2gtJyArIGF1dG9JbmNyZW1lbnQrKztcbiAgLyoqIExhYmVsIG9mIHRoZSBzZWFyY2ggcGxhY2Vob2xkZXIgKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXJMYWJlbCA9ICdTZWFyY2gnO1xuXG4gIC8qKiBUeXBlIG9mIHRoZSBzZWFyY2ggaW5wdXQgZmllbGQgKi9cbiAgQElucHV0KCkgdHlwZSA9ICd0ZXh0JztcblxuICAvKiogTGFiZWwgdG8gYmUgc2hvd24gd2hlbiBubyBlbnRyaWVzIGFyZSBmb3VuZC4gU2V0IHRvIG51bGwgaWYgbm8gbWVzc2FnZSBzaG91bGQgYmUgc2hvd24uICovXG4gIEBJbnB1dCgpIG5vRW50cmllc0ZvdW5kTGFiZWwgPSAnTm8gUmVjb3JkcyBGb3VuZCc7XG5cbiAgLyoqXG4gICAqICBUZXh0IHRoYXQgaXMgYXBwZW5kZWQgdG8gdGhlIGN1cnJlbnRseSBhY3RpdmUgaXRlbSBsYWJlbCBhbm5vdW5jZWQgYnkgc2NyZWVuIHJlYWRlcnMsXG4gICAqICBpbmZvcm1pbmcgdGhlIHVzZXIgb2YgdGhlIGN1cnJlbnQgaW5kZXgsIHZhbHVlIGFuZCB0b3RhbCBvcHRpb25zLlxuICAgKiAgZWc6IEJhbmsgUiAoR2VybWFueSkgMSBvZiA2XG4gICAqL1xuICBASW5wdXQoKSBpbmRleEFuZExlbmd0aFNjcmVlblJlYWRlclRleHQgPSAnIG9mICc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBzZWFyY2ggZmllbGQgc2hvdWxkIGJlIGNsZWFyZWQgYWZ0ZXIgdGhlIGRyb3Bkb3duIG1lbnUgaXMgY2xvc2VkLlxuICAgKiBVc2VmdWwgZm9yIHNlcnZlci1zaWRlIGZpbHRlcmluZy5cbiAgICovXG4gIEBJbnB1dCgpIGNsZWFyU2VhcmNoSW5wdXQgPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgdGhlIHNlYXJjaC1pbi1wcm9ncmVzcyBpbmRpY2F0b3IgKi9cbiAgQElucHV0KCkgc2VhcmNoaW5nID0gZmFsc2U7XG5cbiAgLyoqIERpc2FibGVzIGluaXRpYWwgZm9jdXNpbmcgb2YgdGhlIGlucHV0IGZpZWxkICovXG4gIEBJbnB1dCgpIGRpc2FibGVJbml0aWFsRm9jdXMgPSBmYWxzZTtcblxuICAvKiogRW5hYmxlIGNsZWFyIGlucHV0IG9uIGVzY2FwZSBwcmVzc2VkICovXG4gIEBJbnB1dCgpIGVuYWJsZUNsZWFyT25Fc2NhcGVQcmVzc2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFByZXZlbnRzIGhvbWUgLyBlbmQga2V5IGJlaW5nIHByb3BhZ2F0ZWQgdG8gbm92by1zZWxlY3QsXG4gICAqIGFsbG93aW5nIHRvIG1vdmUgdGhlIGN1cnNvciB3aXRoaW4gdGhlIHNlYXJjaCBpbnB1dCBpbnN0ZWFkIG9mIG5hdmlnYXRpbmcgdGhlIG9wdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIHByZXZlbnRIb21lRW5kS2V5UHJvcGFnYXRpb24gPSBmYWxzZTtcblxuICAvKiogRGlzYWJsZXMgc2Nyb2xsaW5nIHRvIGFjdGl2ZSBvcHRpb25zIHdoZW4gb3B0aW9uIGxpc3QgY2hhbmdlcy4gVXNlZnVsIGZvciBzZXJ2ZXItc2lkZSBzZWFyY2ggKi9cbiAgQElucHV0KCkgZGlzYWJsZVNjcm9sbFRvQWN0aXZlT25PcHRpb25zQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIC8qKiBBZGRzIDUwOCBzY3JlZW4gcmVhZGVyIHN1cHBvcnQgZm9yIHNlYXJjaCBib3ggKi9cbiAgQElucHV0KCkgYXJpYUxhYmVsID0gJ2Ryb3Bkb3duIHNlYXJjaCc7XG5cbiAgLyoqIFdoZXRoZXIgdG8gc2hvdyBTZWxlY3QgQWxsIENoZWNrYm94IChmb3Igbm92by1zZWxlY3RbbXVsdGk9dHJ1ZV0pICovXG4gIEBJbnB1dCgpIHNob3dUb2dnbGVBbGxDaGVja2JveCA9IGZhbHNlO1xuXG4gIC8qKiBzZWxlY3QgYWxsIGNoZWNrYm94IGNoZWNrZWQgc3RhdGUgKi9cbiAgQElucHV0KCkgdG9nZ2xlQWxsQ2hlY2tib3hDaGVja2VkID0gZmFsc2U7XG5cbiAgLyoqIHNlbGVjdCBhbGwgY2hlY2tib3ggaW5kZXRlcm1pbmF0ZSBzdGF0ZSAqL1xuICBASW5wdXQoKSB0b2dnbGVBbGxDaGVja2JveEluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAvKiogRGlzcGxheSBhIG1lc3NhZ2UgaW4gYSB0b29sdGlwIG9uIHRoZSB0b2dnbGUtYWxsIGNoZWNrYm94ICovXG4gIEBJbnB1dCgpIHRvZ2dsZUFsbENoZWNrYm94VG9vbHRpcE1lc3NhZ2UgPSAnJztcblxuICAvKiogRGVmaW5lIHRoZSBwb3NpdGlvbiBvZiB0aGUgdG9vbHRpcCBvbiB0aGUgdG9nZ2xlLWFsbCBjaGVja2JveC4gKi9cbiAgQElucHV0KCkgdG9vZ2xlQWxsQ2hlY2tib3hUb29sdGlwUG9zaXRpb246ICdsZWZ0JyB8ICdyaWdodCcgfCAnYWJvdmUnIHwgJ2JlbG93JyB8ICdiZWZvcmUnIHwgJ2FmdGVyJyA9ICdiZWxvdyc7XG5cbiAgLyoqIFNob3cvSGlkZSB0aGUgc2VhcmNoIGNsZWFyIGJ1dHRvbiBvZiB0aGUgc2VhcmNoIGlucHV0ICovXG4gIEBJbnB1dCgpIGhpZGVDbGVhclNlYXJjaEJ1dHRvbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBbHdheXMgcmVzdG9yZSBzZWxlY3RlZCBvcHRpb25zIG9uIHNlbGVjdGlvbkNoYW5nZSBmb3IgbW9kZSBtdWx0aSAoZS5nLiBmb3IgbGF6eSBsb2FkaW5nL2luZmluaXR5IHNjcm9sbGluZykuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCBzbyBzZWxlY3RlZCBvcHRpb25zIGFyZSBvbmx5IHJlc3RvcmVkIHdoaWxlIGZpbHRlcmluZyBpcyBhY3RpdmUuXG4gICAqL1xuICBASW5wdXQoKSBhbHdheXNSZXN0b3JlU2VsZWN0ZWRPcHRpb25zTXVsdGkgPSBmYWxzZTtcblxuICAvKiogT3V0cHV0IGVtaXR0ZXIgdG8gc2VuZCB0byBwYXJlbnQgY29tcG9uZW50IHdpdGggdGhlIHRvZ2dsZSBhbGwgYm9vbGVhbiAqL1xuICBAT3V0cHV0KCkgdG9nZ2xlQWxsID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBAVmlld0NoaWxkKCdzZWFyY2hTZWxlY3RJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIHNlYXJjaFNlbGVjdElucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIHNlYXJjaCBpbnB1dCBmaWVsZCAqL1xuICBAVmlld0NoaWxkKCdpbm5lclNlbGVjdFNlYXJjaCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGlubmVyU2VsZWN0U2VhcmNoOiBFbGVtZW50UmVmO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gY3VzdG9tIHNlYXJjaCBpbnB1dCBjbGVhciBpY29uICovXG4gIEBDb250ZW50Q2hpbGQoTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgY2xlYXJJY29uOiBOb3ZvU2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5ub3ZvLXNlbGVjdC1zZWFyY2gtaW5zaWRlLW5vdm8tb3B0aW9uJylcbiAgZ2V0IGlzSW5zaWRlTm92b09wdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLm5vdm9PcHRpb247XG4gIH1cblxuICAvKiogQ3VycmVudCBzZWFyY2ggdmFsdWUgKi9cbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2xhc3RFeHRlcm5hbElucHV0VmFsdWU6IHN0cmluZztcblxuICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKF86IGFueSkgPT4ge307XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTm92b1NlbGVjdEVsZW1lbnQgb3B0aW9ucyAqL1xuICBwdWJsaWMgc2V0IF9vcHRpb25zKF9vcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj4pIHtcbiAgICB0aGlzLl9vcHRpb25zJC5uZXh0KF9vcHRpb25zKTtcbiAgfVxuICBwdWJsaWMgZ2V0IF9vcHRpb25zKCk6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMkLmdldFZhbHVlKCk7XG4gIH1cbiAgcHVibGljIF9vcHRpb25zJDogQmVoYXZpb3JTdWJqZWN0PFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPj4obnVsbCk7XG5cbiAgcHJpdmF0ZSBvcHRpb25zTGlzdCQ6IE9ic2VydmFibGU8Tm92b09wdGlvbltdPiA9IHRoaXMuX29wdGlvbnMkLnBpcGUoXG4gICAgc3dpdGNoTWFwKChfb3B0aW9ucykgPT5cbiAgICAgIF9vcHRpb25zXG4gICAgICAgID8gX29wdGlvbnMuY2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgbWFwKChvcHRpb25zKSA9PiBvcHRpb25zLnRvQXJyYXkoKSksXG4gICAgICAgICAgICBzdGFydFdpdGg8Tm92b09wdGlvbltdPihfb3B0aW9ucy50b0FycmF5KCkpLFxuICAgICAgICAgIClcbiAgICAgICAgOiBvZihudWxsKSxcbiAgICApLFxuICApO1xuXG4gIHByaXZhdGUgb3B0aW9uc0xlbmd0aCQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMub3B0aW9uc0xpc3QkLnBpcGUobWFwKChvcHRpb25zKSA9PiAob3B0aW9ucyA/IG9wdGlvbnMubGVuZ3RoIDogMCkpKTtcblxuICAvKiogUHJldmlvdXNseSBzZWxlY3RlZCB2YWx1ZXMgd2hlbiB1c2luZyA8bm92by1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj4qL1xuICBwcml2YXRlIHByZXZpb3VzU2VsZWN0ZWRWYWx1ZXM6IGFueVtdO1xuXG4gIHB1YmxpYyBfZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICAvKiogd2hldGhlciB0byBzaG93IHRoZSBubyBlbnRyaWVzIGZvdW5kIG1lc3NhZ2UgKi9cbiAgcHVibGljIF9zaG93Tm9FbnRyaWVzRm91bmQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gY29tYmluZUxhdGVzdChbdGhpcy5fZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLCB0aGlzLm9wdGlvbnNMZW5ndGgkXSkucGlwZShcbiAgICBtYXAoKFt2YWx1ZSwgb3B0aW9uc0xlbmd0aF0pID0+IHRoaXMubm9FbnRyaWVzRm91bmRMYWJlbCAmJiB2YWx1ZSAmJiBvcHRpb25zTGVuZ3RoID09PSB0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKSksXG4gICk7XG5cbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTm92b1NlbGVjdEVsZW1lbnQpIHB1YmxpYyBub3ZvU2VsZWN0OiBOb3ZvU2VsZWN0RWxlbWVudCxcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOb3ZvT3B0aW9uKSBwdWJsaWMgbm92b09wdGlvbjogTm92b09wdGlvbiA9IG51bGwsXG4gICAgcHJpdmF0ZSBsaXZlQW5ub3VuY2VyOiBMaXZlQW5ub3VuY2VyLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTm92b0ZpZWxkRWxlbWVudCkgcHVibGljIG1hdEZvcm1GaWVsZDogTm92b0ZpZWxkRWxlbWVudCA9IG51bGwsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBzZXQgY3VzdG9tIHBhbmVsIGNsYXNzXG4gICAgLy8gY29uc3QgcGFuZWxDbGFzcyA9ICdub3ZvLXNlbGVjdC1zZWFyY2gtcGFuZWwnO1xuICAgIC8vIGlmICh0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcykge1xuICAgIC8vICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MpKSB7XG4gICAgLy8gICAgICg8c3RyaW5nW10+dGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MpLnB1c2gocGFuZWxDbGFzcyk7XG4gICAgLy8gICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm5vdm9TZWxlY3QucGFuZWxDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyAgICAgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MgPSBbdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MsIHBhbmVsQ2xhc3NdO1xuICAgIC8vICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gICAgIHRoaXMubm92b1NlbGVjdC5wYW5lbENsYXNzW3BhbmVsQ2xhc3NdID0gdHJ1ZTtcbiAgICAvLyAgIH1cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsQ2xhc3MgPSBwYW5lbENsYXNzO1xuICAgIC8vIH1cblxuICAgIC8vIHNldCBjdXN0b20gbm92by1vcHRpb24gY2xhc3MgaWYgdGhlIGNvbXBvbmVudCB3YXMgcGxhY2VkIGluc2lkZSBhIG5vdm8tb3B0aW9uXG4gICAgaWYgKHRoaXMubm92b09wdGlvbikge1xuICAgICAgdGhpcy5ub3ZvT3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubm92b09wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdjb250YWlucy1ub3ZvLXNlbGVjdC1zZWFyY2gnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignPG5neC1ub3ZvLXNlbGVjdC1zZWFyY2g+IG11c3QgYmUgcGxhY2VkIGluc2lkZSBhIDxub3ZvLW9wdGlvbj4gZWxlbWVudCcpO1xuICAgIH1cblxuICAgIC8vIHdoZW4gdGhlIHNlbGVjdCBkcm9wZG93biBwYW5lbCBpcyBvcGVuZWQgb3IgY2xvc2VkXG4gICAgdGhpcy5ub3ZvU2VsZWN0Lm9wZW5lZENoYW5nZS5waXBlKGRlbGF5KDEpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChvcGVuZWQpID0+IHtcbiAgICAgIGlmIChvcGVuZWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgIC8vIGZvY3VzIHRoZSBzZWFyY2ggZmllbGQgd2hlbiBvcGVuaW5nXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlSW5pdGlhbEZvY3VzKSB7XG4gICAgICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2xlYXIgaXQgd2hlbiBjbG9zaW5nXG4gICAgICAgIGlmICh0aGlzLmNsZWFyU2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlIGZpcnN0IGl0ZW0gYWN0aXZlIGFmdGVyIHRoZSBvcHRpb25zIGNoYW5nZWRcbiAgICB0aGlzLm5vdm9TZWxlY3Qub3BlbmVkQ2hhbmdlXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubm92b1NlbGVjdC5fa2V5TWFuYWdlcikge1xuICAgICAgICAgIHRoaXMubm92b1NlbGVjdC5fa2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFkanVzdFNjcm9sbFRvcFRvRml0QWN0aXZlT3B0aW9uSW50b1ZpZXcoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ19rZXlNYW5hZ2VyIHdhcyBub3QgaW5pdGlhbGl6ZWQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5ub3ZvU2VsZWN0LmNvbnRlbnRPcHRpb25zO1xuXG4gICAgICAgIC8vIENsb3N1cmUgdmFyaWFibGUgZm9yIHRyYWNraW5nIHRoZSBtb3N0IHJlY2VudCBmaXJzdCBvcHRpb24uXG4gICAgICAgIC8vIEluIG9yZGVyIHRvIGF2b2lkIGF2b2lkIGNhdXNpbmcgdGhlIGxpc3QgdG9cbiAgICAgICAgLy8gc2Nyb2xsIHRvIHRoZSB0b3Agd2hlbiBvcHRpb25zIGFyZSBhZGRlZCB0byB0aGUgYm90dG9tIG9mXG4gICAgICAgIC8vIHRoZSBsaXN0IChlZzogaW5maW5pdGUgc2Nyb2xsKSwgd2UgY29tcGFyZSBvbmx5XG4gICAgICAgIC8vIHRoZSBjaGFuZ2VzIHRvIHRoZSBmaXJzdCBvcHRpb25zIHRvIGRldGVybWluZSBpZiB3ZVxuICAgICAgICAvLyBzaG91bGQgc2V0IHRoZSBmaXJzdCBpdGVtIGFzIGFjdGl2ZS5cbiAgICAgICAgLy8gVGhpcyBwcmV2ZW50cyB1bm5lY2Vzc2FyeSBzY3JvbGxpbmcgdG8gdGhlIHRvcCBvZiB0aGUgbGlzdFxuICAgICAgICAvLyB3aGVuIG9wdGlvbnMgYXJlIGFwcGVuZGVkLCBidXQgYWxsb3dzIHRoZSBmaXJzdCBpdGVtXG4gICAgICAgIC8vIGluIHRoZSBsaXN0IHRvIGJlIHNldCBhcyBhY3RpdmUgYnkgZGVmYXVsdCB3aGVuIHRoZXJlXG4gICAgICAgIC8vIGlzIG5vIGFjdGl2ZSBzZWxlY3Rpb25cbiAgICAgICAgbGV0IHByZXZpb3VzRmlyc3RPcHRpb24gPSB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKVt0aGlzLmdldE9wdGlvbnNMZW5ndGhPZmZzZXQoKV07XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgLy8gYXZvaWQgXCJleHByZXNzaW9uIGhhcyBiZWVuIGNoYW5nZWRcIiBlcnJvclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgUXVlcnlMaXN0IHRvIGFuIGFycmF5XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KCk7XG5cbiAgICAgICAgICAgIC8vIFRoZSB0cnVlIGZpcnN0IGl0ZW0gaXMgb2Zmc2V0IGJ5IDFcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGaXJzdE9wdGlvbiA9IG9wdGlvbnNbdGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCldO1xuXG4gICAgICAgICAgICBjb25zdCBrZXlNYW5hZ2VyID0gdGhpcy5ub3ZvU2VsZWN0Ll9rZXlNYW5hZ2VyO1xuICAgICAgICAgICAgaWYgKGtleU1hbmFnZXIgJiYgdGhpcy5ub3ZvU2VsZWN0LnBhbmVsT3Blbikge1xuICAgICAgICAgICAgICAvLyBzZXQgZmlyc3QgaXRlbSBhY3RpdmUgYW5kIGlucHV0IHdpZHRoXG5cbiAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBmaXJzdCBvcHRpb24gaW4gdGhlc2UgY2hhbmdlcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgcHJldmlvdXMuXG4gICAgICAgICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uSXNDaGFuZ2VkID0gIXRoaXMubm92b1NlbGVjdC5jb21wYXJlV2l0aChwcmV2aW91c0ZpcnN0T3B0aW9uLCBjdXJyZW50Rmlyc3RPcHRpb24pO1xuXG4gICAgICAgICAgICAgIC8vIENBU0U6IFRoZSBmaXJzdCBvcHRpb24gaXMgZGlmZmVyZW50IG5vdy5cbiAgICAgICAgICAgICAgLy8gSW5kaWNpYXRlcyB3ZSBzaG91bGQgc2V0IGl0IGFzIGFjdGl2ZSBhbmQgc2Nyb2xsIHRvIHRoZSB0b3AuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBmaXJzdE9wdGlvbklzQ2hhbmdlZCB8fFxuICAgICAgICAgICAgICAgICFrZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gfHxcbiAgICAgICAgICAgICAgICAhb3B0aW9ucy5maW5kKChvcHRpb24pID0+IHRoaXMubm92b1NlbGVjdC5jb21wYXJlV2l0aChvcHRpb24sIGtleU1hbmFnZXIuYWN0aXZlSXRlbSkpXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyB3YWl0IGZvciBwYW5lbCB3aWR0aCBjaGFuZ2VzXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZVNjcm9sbFRvQWN0aXZlT25PcHRpb25zQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0U2Nyb2xsVG9wVG9GaXRBY3RpdmVPcHRpb25JbnRvVmlldygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBvdXIgcmVmZXJlbmNlXG4gICAgICAgICAgICBwcmV2aW91c0ZpcnN0T3B0aW9uID0gY3VycmVudEZpcnN0T3B0aW9uO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gYWRkIG9yIHJlbW92ZSBjc3MgY2xhc3MgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdG8gc2hvdyB0aGUgbm8gZW50cmllcyBmb3VuZCBtZXNzYWdlXG4gICAgLy8gbm90ZTogdGhpcyBpcyBoYWNreVxuICAgIHRoaXMuX3Nob3dOb0VudHJpZXNGb3VuZCQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChzaG93Tm9FbnRyaWVzRm91bmQpID0+IHtcbiAgICAgIC8vIHNldCBubyBlbnRyaWVzIGZvdW5kIGNsYXNzIG9uIG1hdCBvcHRpb25cbiAgICAgIGlmICh0aGlzLm5vdm9PcHRpb24pIHtcbiAgICAgICAgaWYgKHNob3dOb0VudHJpZXNGb3VuZCkge1xuICAgICAgICAgIHRoaXMubm92b09wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdub3ZvLXNlbGVjdC1zZWFyY2gtbm8tZW50cmllcy1mb3VuZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubm92b09wdGlvbi5fZ2V0SG9zdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKCdub3ZvLXNlbGVjdC1zZWFyY2gtbm8tZW50cmllcy1mb3VuZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyByZXNpemUgdGhlIGlucHV0IHdpZHRoIHdoZW4gdGhlIHZpZXdwb3J0IGlzIHJlc2l6ZWQsIGkuZS4gdGhlIHRyaWdnZXIgd2lkdGggY291bGQgcG90ZW50aWFsbHkgYmUgcmVzaXplZFxuICAgIHRoaXMuX3ZpZXdwb3J0UnVsZXJcbiAgICAgIC5jaGFuZ2UoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubm92b1NlbGVjdC5wYW5lbE9wZW4pIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLmluaXRNdWx0aXBsZUhhbmRsaW5nKCk7XG5cbiAgICB0aGlzLm9wdGlvbnNMaXN0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gdXBkYXRlIHZpZXcgd2hlbiBhdmFpbGFibGUgb3B0aW9ucyBjaGFuZ2VcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBfZW1pdFNlbGVjdEFsbEJvb2xlYW5Ub1BhcmVudChzdGF0ZTogYm9vbGVhbikge1xuICAgIHRoaXMudG9nZ2xlQWxsLmVtaXQoc3RhdGUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIF9pc1RvZ2dsZUFsbENoZWNrYm94VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlICYmIHRoaXMuc2hvd1RvZ2dsZUFsbENoZWNrYm94O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGtleSBkb3duIGV2ZW50IHdpdGggTm92b1NlbGVjdEVsZW1lbnQuXG4gICAqIEFsbG93cyBlLmcuIHNlbGVjdGluZyB3aXRoIGVudGVyIGtleSwgbmF2aWdhdGlvbiB3aXRoIGFycm93IGtleXMsIGV0Yy5cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIFByZXZlbnQgcHJvcGFnYXRpb24gZm9yIGFsbCBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyBpbiBvcmRlciB0byBhdm9pZCBzZWxlY3Rpb24gaXNzdWVzXG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleSAmJiBldmVudC5rZXkubGVuZ3RoID09PSAxKSB8fFxuICAgICAgaXNBbHBoYU51bWVyaWMoZXZlbnQua2V5KSB8fFxuICAgICAgZXZlbnQua2V5ID09PSBLZXkuU3BhY2UgfHxcbiAgICAgICh0aGlzLnByZXZlbnRIb21lRW5kS2V5UHJvcGFnYXRpb24gJiYgKGV2ZW50LmtleSA9PT0gS2V5LkhvbWUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW5kKSlcbiAgICApIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5vdm9TZWxlY3QubXVsdGlwbGUgJiYgZXZlbnQua2V5ICYmIGV2ZW50LmtleSA9PT0gS2V5LkVudGVyKSB7XG4gICAgICAvLyBSZWdhaW4gZm9jdXMgYWZ0ZXIgbXVsdGlzZWxlY3QsIHNvIHdlIGNhbiBmdXJ0aGVyIHR5cGVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fZm9jdXMoKSk7XG4gICAgfVxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGlmIGNsaWNrIEVzY2FwZSwgaWYgaW5wdXQgaXMgZW1wdHksIGNsb3NlIHRoZSBkcm9wZG93biwgaWYgbm90LCBlbXB0eSBvdXQgdGhlIHNlYXJjaCBmaWVsZFxuICAgIGlmICh0aGlzLmVuYWJsZUNsZWFyT25Fc2NhcGVQcmVzc2VkID09PSB0cnVlICYmIGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLl9yZXNldCh0cnVlKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBrZXkgdXAgZXZlbnQgd2l0aCBOb3ZvU2VsZWN0RWxlbWVudC5cbiAgICogQWxsb3dzIGUuZy4gdGhlIGFubm91bmNpbmcgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmVEZXNjZW5kYW50IGJ5IHNjcmVlbiByZWFkZXJzLlxuICAgKi9cbiAgX2hhbmRsZUtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkFycm93VXAgfHwgZXZlbnQua2V5ID09PSBLZXkuQXJyb3dEb3duKSB7XG4gICAgICBjb25zdCBhcmlhQWN0aXZlRGVzY2VuZGFudElkID0gdGhpcy5ub3ZvU2VsZWN0Ll9nZXRBcmlhQWN0aXZlRGVzY2VuZGFudCgpO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9vcHRpb25zLnRvQXJyYXkoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGFyaWFBY3RpdmVEZXNjZW5kYW50SWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBhY3RpdmVEZXNjZW5kYW50ID0gdGhpcy5fb3B0aW9ucy50b0FycmF5KClbaW5kZXhdO1xuICAgICAgICB0aGlzLmxpdmVBbm5vdW5jZXIuYW5ub3VuY2UoXG4gICAgICAgICAgYWN0aXZlRGVzY2VuZGFudC52aWV3VmFsdWUgKyAnICcgKyB0aGlzLmdldEFyaWFJbmRleChpbmRleCkgKyB0aGlzLmluZGV4QW5kTGVuZ3RoU2NyZWVuUmVhZGVyVGV4dCArIHRoaXMuZ2V0QXJpYUxlbmd0aCgpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGluZGV4IG9mIHRoZSBjdXJyZW50IG9wdGlvbiwgdGFraW5nIHRoZSBvZmZzZXQgdG8gbGVuZ3RoIGludG8gYWNjb3VudC5cbiAgICogZXhhbXBsZXM6XG4gICAqICAgIENhc2UgMSBbU2VhcmNoLCAxLCAyLCAzXSB3aWxsIGhhdmUgb2Zmc2V0IG9mIDEsIGR1ZSB0byBzZWFyY2ggYW5kIHdpbGwgcmVhZCBpbmRleCBvZiB0b3RhbC5cbiAgICogICAgQ2FzZSAyIFsxLCAyLCAzXSB3aWxsIGhhdmUgb2Zmc2V0IG9mIDAgYW5kIHdpbGwgcmVhZCBpbmRleCArMSBvZiB0b3RhbC5cbiAgICovXG4gIGdldEFyaWFJbmRleChvcHRpb25JbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5nZXRPcHRpb25zTGVuZ3RoT2Zmc2V0KCkgPT09IDApIHtcbiAgICAgIHJldHVybiBvcHRpb25JbmRleCArIDE7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25JbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgb3B0aW9ucywgdGFraW5nIHRoZSBvZmZzZXQgdG8gbGVuZ3RoIGludG8gYWNjb3VudC5cbiAgICogZXhhbXBsZXM6XG4gICAqICAgIENhc2UgMSBbU2VhcmNoLCAxLCAyLCAzXSB3aWxsIGhhdmUgbGVuZ3RoIG9mIG9wdGlvbnMubGVuZ3RoIC0xLCBkdWUgdG8gc2VhcmNoLlxuICAgKiAgICBDYXNlIDIgWzEsIDIsIDNdIHdpbGwgaGF2ZSBsZW5ndGggb2Ygb3B0aW9ucy5sZW5ndGguXG4gICAqL1xuICBnZXRBcmlhTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMudG9BcnJheSgpLmxlbmd0aCAtIHRoaXMuZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbGFzdEV4dGVybmFsSW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2Zvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCkge1xuICAgIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigodmFsdWUpID0+IHZhbHVlICE9PSB0aGlzLl9sYXN0RXh0ZXJuYWxJbnB1dFZhbHVlKSxcbiAgICAgICAgdGFwKCgpID0+ICh0aGlzLl9sYXN0RXh0ZXJuYWxJbnB1dFZhbHVlID0gdW5kZWZpbmVkKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShmbik7XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIHNlYXJjaCBpbnB1dCBmaWVsZFxuICAgKi9cbiAgcHVibGljIF9mb2N1cygpIHtcbiAgICBpZiAoIXRoaXMuc2VhcmNoU2VsZWN0SW5wdXQgfHwgIXRoaXMubm92b1NlbGVjdC5wYW5lbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzYXZlIGFuZCByZXN0b3JlIHNjcm9sbFRvcCBvZiBwYW5lbCwgc2luY2UgaXQgd2lsbCBiZSByZXNldCBieSBmb2N1cygpXG4gICAgLy8gbm90ZTogdGhpcyBpcyBoYWNreVxuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5ub3ZvU2VsZWN0LnBhbmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gcGFuZWwuc2Nyb2xsVG9wO1xuXG4gICAgLy8gZm9jdXNcbiAgICB0aGlzLnNlYXJjaFNlbGVjdElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgIHBhbmVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGN1cnJlbnQgc2VhcmNoIHZhbHVlXG4gICAqIEBwYXJhbSBmb2N1cyB3aGV0aGVyIHRvIGZvY3VzIGFmdGVyIHJlc2V0dGluZ1xuICAgKi9cbiAgcHVibGljIF9yZXNldChmb2N1cz86IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mb3JtQ29udHJvbC5zZXRWYWx1ZSgnJyk7XG4gICAgaWYgKGZvY3VzKSB7XG4gICAgICB0aGlzLl9mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBoYW5kbGluZyA8bm92by1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICogTm90ZTogdG8gaW1wcm92ZSB0aGlzIGNvZGUsIG5vdm8tc2VsZWN0IHNob3VsZCBiZSBleHRlbmRlZCB0byBhbGxvdyBkaXNhYmxpbmcgcmVzZXR0aW5nIHRoZSBzZWxlY3Rpb24gd2hpbGUgZmlsdGVyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0TXVsdGlwbGVIYW5kbGluZygpIHtcbiAgICBpZiAoIXRoaXMubm92b1NlbGVjdC5uZ0NvbnRyb2wpIHtcbiAgICAgIGlmICh0aGlzLm5vdm9TZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgLy8gbm90ZTogdGhlIGFjY2VzcyB0byBub3ZvU2VsZWN0Lm5nQ29udHJvbCAoaW5zdGVhZCBvZiBub3ZvU2VsZWN0LnZhbHVlIC8gbm92b1NlbGVjdC52YWx1ZUNoYW5nZXMpXG4gICAgICAgIC8vIGlzIG5lY2Vzc2FyeSB0byBwcm9wZXJseSB3b3JrIGluIG11bHRpLXNlbGVjdGlvbiBtb2RlLlxuICAgICAgICBjb25zb2xlLmVycm9yKCd0aGUgbm92by1zZWxlY3QgY29udGFpbmluZyBuZ3gtbm92by1zZWxlY3Qtc2VhcmNoIG11c3QgaGF2ZSBhIG5nTW9kZWwgb3IgZm9ybUNvbnRyb2wgZGlyZWN0aXZlIHdoZW4gbXVsdGlwbGU9dHJ1ZScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBpZiA8bm92by1zZWxlY3QgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAvLyBzdG9yZSBwcmV2aW91c2x5IHNlbGVjdGVkIHZhbHVlcyBhbmQgcmVzdG9yZSB0aGVtIHdoZW4gdGhleSBhcmUgZGVzZWxlY3RlZFxuICAgIC8vIGJlY2F1c2UgdGhlIG9wdGlvbiBpcyBub3QgYXZhaWxhYmxlIHdoaWxlIHdlIGFyZSBjdXJyZW50bHkgZmlsdGVyaW5nXG4gICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzID0gdGhpcy5ub3ZvU2VsZWN0Lm5nQ29udHJvbC52YWx1ZTtcblxuICAgIHRoaXMubm92b1NlbGVjdC5uZ0NvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgodmFsdWVzKSA9PiB7XG4gICAgICBsZXQgcmVzdG9yZVNlbGVjdGVkVmFsdWVzID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ub3ZvU2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAodGhpcy5hbHdheXNSZXN0b3JlU2VsZWN0ZWRPcHRpb25zTXVsdGkgfHwgKHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlICYmIHRoaXMuX2Zvcm1Db250cm9sLnZhbHVlLmxlbmd0aCkpICYmXG4gICAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzICYmXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICghdmFsdWVzIHx8ICFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLm5vdm9TZWxlY3Qub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMuZm9yRWFjaCgocHJldmlvdXNWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhdmFsdWVzLnNvbWUoKHYpID0+IHRoaXMubm92b1NlbGVjdC5jb21wYXJlV2l0aCh2LCBwcmV2aW91c1ZhbHVlKSkgJiZcbiAgICAgICAgICAgICAgIW9wdGlvblZhbHVlcy5zb21lKCh2KSA9PiB0aGlzLm5vdm9TZWxlY3QuY29tcGFyZVdpdGgodiwgcHJldmlvdXNWYWx1ZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgLy8gaWYgYSB2YWx1ZSB0aGF0IHdhcyBzZWxlY3RlZCBiZWZvcmUgaXMgZGVzZWxlY3RlZCBhbmQgbm90IGZvdW5kIGluIHRoZSBvcHRpb25zLCBpdCB3YXMgZGVzZWxlY3RlZFxuICAgICAgICAgICAgICAvLyBkdWUgdG8gdGhlIGZpbHRlcmluZywgc28gd2UgcmVzdG9yZSBpdC5cbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2gocHJldmlvdXNWYWx1ZSk7XG4gICAgICAgICAgICAgIHJlc3RvcmVTZWxlY3RlZFZhbHVlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcyA9IHZhbHVlcztcblxuICAgICAgaWYgKHJlc3RvcmVTZWxlY3RlZFZhbHVlcykge1xuICAgICAgICAvLyBUT0RPOiBGaXggdGhpc1xuICAgICAgICAvLyB0aGlzLm5vdm9TZWxlY3QuX29uQ2hhbmdlKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xscyB0aGUgY3VycmVudGx5IGFjdGl2ZSBvcHRpb24gaW50byB0aGUgdmlldyBpZiBpdCBpcyBub3QgeWV0IHZpc2libGUuXG4gICAqL1xuICBwcml2YXRlIGFkanVzdFNjcm9sbFRvcFRvRml0QWN0aXZlT3B0aW9uSW50b1ZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm92b1NlbGVjdC5wYW5lbCAmJiB0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgbm92b09wdGlvbkhlaWdodCA9IHRoaXMuZ2V0Tm92b09wdGlvbkhlaWdodCgpO1xuICAgICAgY29uc3QgYWN0aXZlT3B0aW9uSW5kZXggPSB0aGlzLm5vdm9TZWxlY3QuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4IHx8IDA7XG4gICAgICBjb25zdCBsYWJlbENvdW50ID0gX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24oYWN0aXZlT3B0aW9uSW5kZXgsIHRoaXMubm92b1NlbGVjdC5jb250ZW50T3B0aW9ucywgdGhpcy5ub3ZvU2VsZWN0Lm9wdGlvbkdyb3Vwcyk7XG4gICAgICAvLyBJZiB0aGUgY29tcG9uZW50IGlzIGluIGEgTm92b09wdGlvbiwgdGhlIGFjdGl2ZUl0ZW1JbmRleCB3aWxsIGJlIG9mZnNldCBieSBvbmUuXG4gICAgICBjb25zdCBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldyA9ICh0aGlzLm5vdm9PcHRpb24gPyAtMSA6IDApICsgbGFiZWxDb3VudCArIGFjdGl2ZU9wdGlvbkluZGV4O1xuICAgICAgY29uc3QgY3VycmVudFNjcm9sbFRvcCA9IHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgICAgY29uc3Qgc2VhcmNoSW5wdXRIZWlnaHQgPSB0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgYW1vdW50T2ZWaXNpYmxlT3B0aW9ucyA9IE1hdGguZmxvb3IoKFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUIC0gc2VhcmNoSW5wdXRIZWlnaHQpIC8gbm92b09wdGlvbkhlaWdodCk7XG5cbiAgICAgIGNvbnN0IGluZGV4T2ZGaXJzdFZpc2libGVPcHRpb24gPSBNYXRoLnJvdW5kKChjdXJyZW50U2Nyb2xsVG9wICsgc2VhcmNoSW5wdXRIZWlnaHQpIC8gbm92b09wdGlvbkhlaWdodCkgLSAxO1xuXG4gICAgICBpZiAoaW5kZXhPZkZpcnN0VmlzaWJsZU9wdGlvbiA+PSBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldykge1xuICAgICAgICB0aGlzLm5vdm9TZWxlY3QucGFuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBpbmRleE9mT3B0aW9uVG9GaXRJbnRvVmlldyAqIG5vdm9PcHRpb25IZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4T2ZGaXJzdFZpc2libGVPcHRpb24gKyBhbW91bnRPZlZpc2libGVPcHRpb25zIDw9IGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3KSB7XG4gICAgICAgIHRoaXMubm92b1NlbGVjdC5wYW5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9XG4gICAgICAgICAgKGluZGV4T2ZPcHRpb25Ub0ZpdEludG9WaWV3ICsgMSkgKiBub3ZvT3B0aW9uSGVpZ2h0IC0gKFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUIC0gc2VhcmNoSW5wdXRIZWlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgU2V0IHRoZSB3aWR0aCBvZiB0aGUgaW5uZXJTZWxlY3RTZWFyY2ggdG8gZml0IGV2ZW4gY3VzdG9tIHNjcm9sbGJhcnNcbiAgICogIEFuZCBzdXBwb3J0IGFsbCBPcGVyYXRpb24gU3lzdGVtc1xuICAgKi9cbiAgcHVibGljIHVwZGF0ZUlucHV0V2lkdGgoKSB7XG4gICAgaWYgKCF0aGlzLmlubmVyU2VsZWN0U2VhcmNoIHx8ICF0aGlzLmlubmVyU2VsZWN0U2VhcmNoLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBwYW5lbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudCkpIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbm92by1zZWxlY3QtcGFuZWwnKSkge1xuICAgICAgICBwYW5lbEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhbmVsRWxlbWVudCkge1xuICAgICAgdGhpcy5pbm5lclNlbGVjdFNlYXJjaC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gcGFuZWxFbGVtZW50LmNsaWVudFdpZHRoICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE5vdm9PcHRpb25IZWlnaHQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5ub3ZvU2VsZWN0LmNvbnRlbnRPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdm9TZWxlY3QuY29udGVudE9wdGlvbnMuZmlyc3QuX2dldEhvc3RFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgb2Zmc2V0IHRvIGxlbmd0aCB0aGF0IGNhbiBiZSBjYXVzZWQgYnkgdGhlIG9wdGlvbmFsIG5vdm9PcHRpb24gdXNlZCBhcyBhIHNlYXJjaCBpbnB1dC5cbiAgICovXG4gIHByaXZhdGUgZ2V0T3B0aW9uc0xlbmd0aE9mZnNldCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm5vdm9PcHRpb24pIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==