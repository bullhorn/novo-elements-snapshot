import { CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Optional, Renderer2, TemplateRef, ViewChild, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { NovoLabelService } from '../../../services/novo-label-service';
import { Helpers } from '../../../utils/Helpers';
import { NovoDropdownElement } from '../../dropdown/Dropdown';
import { NovoDataTableFilterUtils } from '../services/data-table-filter-utils';
import { SortDirection } from '../sort-filter';
import { NovoDataTableSortFilter } from '../sort-filter/sort-filter.directive';
import { DataTableState } from '../state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "../state/data-table-state.service";
import * as i3 from "../sort-filter/sort-filter.directive";
import * as i4 from "@angular/cdk/table";
import * as i5 from "../sort-filter/sort-button.component";
import * as i6 from "../../dropdown/Dropdown";
import * as i7 from "../../icon/Icon";
import * as i8 from "./data-table-header-cell-filter-header.component";
import * as i9 from "../../common/option/optgroup.component";
import * as i10 from "../../common/option/option.component";
import * as i11 from "../../flex/Flex";
import * as i12 from "../../date-picker/DatePicker";
import * as i13 from "../../field/field";
import * as i14 from "../../field/error/error";
import * as i15 from "../../button/Button";
import * as i16 from "@angular/common";
import * as i17 from "../../tooltip/Tooltip.directive";
import * as i18 from "@angular/forms";
import * as i19 from "../../common/directives/flex.directive";
import * as i20 from "../../field/input";
import * as i21 from "../../common/directives/theme.directive";
export class NovoDataTableCellHeader {
    constructor(changeDetectorRef, labels, state, renderer, elementRef, _sort, _cdkColumnDef) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._sort = _sort;
        this._cdkColumnDef = _cdkColumnDef;
        this.allowMultipleFilters = false;
        this.icon = 'sortable';
        this.filterActive = false;
        this.sortActive = false;
        this.sortValue = SortDirection.NONE;
        this.showCustomRange = false;
        this.multiSelect = false;
        this.multiSelectedOptions = [];
        this.multiSelectedOptionIsHidden = [];
        this.optionFilter = '';
        this.error = false;
        this.subscriptions = [];
        this._rerenderSubscription = state.updates.subscribe((change) => this.checkSortFilterState(change));
    }
    set column(column) {
        this._column = column;
        this.label = column.type === 'action' ? '' : column.label;
        this.labelIcon = column.labelIcon;
        this.config = {
            sortable: !!column.sortable,
            filterable: !!column.filterable,
            resizable: !!column.resizable,
        };
        this.resizable = this.config.resizable;
        const transforms = {};
        if (column.filterable && Helpers.isObject(column.filterable)) {
            this.config.filterConfig = column.filterable;
            if (!this.config.filterConfig.type) {
                this.config.filterConfig = { type: 'text' };
            }
            if (column.filterable.transform) {
                transforms.filter = column.filterable.transform;
            }
        }
        else {
            this.config.filterConfig = { type: 'text' };
        }
        if (column.sortable && Helpers.isObject(column.sortable)) {
            if (column.sortable.transform) {
                transforms.sort = column.sortable.transform;
            }
        }
        if (this.config.filterConfig.type === 'date' && !this.config.filterConfig.options) {
            this.config.filterConfig.options = this.getDefaultDateFilterOptions();
        }
        this.config.transforms = transforms;
    }
    get column() {
        return this._column;
    }
    ngOnInit() {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        this.setupFilterOptions();
        this.changeDetectorRef.markForCheck();
    }
    setupFilterOptions() {
        this.checkSortFilterState({ filter: this.state.filter, sort: this.state.sort }, true);
        this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
        if (this.multiSelect) {
            this.multiSelectedOptions = this.filter ? [...this.filter] : [];
        }
    }
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    checkSortFilterState(sortFilterState, initialConfig = false) {
        if (sortFilterState.sort && sortFilterState.sort.id === this.id) {
            this.icon = `sort-${sortFilterState.sort.value}`;
            this.sortValue = sortFilterState.sort.value === 'asc' ? SortDirection.ASC : SortDirection.DESC;
            this.sortActive = true;
        }
        else {
            this.icon = 'sortable';
            this.sortValue = SortDirection.NONE;
            this.sortActive = false;
        }
        const tableFilter = Helpers.convertToArray(sortFilterState.filter);
        const thisFilter = tableFilter.find((filter) => filter && filter.id === this.id);
        if (thisFilter) {
            this.filterActive = true;
            if (initialConfig && thisFilter.type === 'date' && thisFilter.selectedOption) {
                this.activeDateFilter = thisFilter.selectedOption.label || this.labels.customDateRange;
            }
            this.filter = thisFilter.value;
        }
        else {
            this.filterActive = false;
            this.filter = undefined;
            this.activeDateFilter = undefined;
            this.multiSelectedOptions = [];
        }
        if (this.defaultSort && this.id === this.defaultSort.id) {
            this.icon = `sort-${this.defaultSort.value}`;
            this.sortActive = true;
        }
        this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
        if (this.multiSelect) {
            this.multiSelectedOptions = this.filter ? [...this.filter] : [];
            if (this.config.filterConfig.options) {
                if (typeof this.config.filterConfig.options[0] === 'string') {
                    this.multiSelectedOptionIsHidden = this.config.filterConfig.options.map((option) => ({ option, hidden: false }));
                }
                else {
                    this.multiSelectedOptionIsHidden = this.config.filterConfig.options.map((option) => ({
                        option,
                        hidden: false,
                    }));
                }
            }
        }
        this.changeDetectorRef.markForCheck();
    }
    isSelected(option, optionsList) {
        if (optionsList) {
            const optionValue = option.hasOwnProperty('value') ? option.value : option;
            const found = optionsList.find((item) => this.optionPresentCheck(item, optionValue));
            return found !== undefined;
        }
        return false;
    }
    toggleSelection(option) {
        const optionValue = option.hasOwnProperty('value') ? option.value : option;
        const optionIndex = this.multiSelectedOptions.findIndex((item) => this.optionPresentCheck(item, optionValue));
        this.error = false;
        if (optionIndex > -1) {
            this.multiSelectedOptions.splice(optionIndex, 1);
            if (this.optionFilter && !this.getOptionText(option).toLowerCase().startsWith(this.optionFilter.toLowerCase())) {
                this.multiSelectedOptionIsHidden[this.multiSelectedOptionIsHidden.findIndex((record) => record.option === option)].hidden = true;
            }
        }
        else {
            this.multiSelectedOptions.push(optionValue);
        }
    }
    optionPresentCheck(item, optionValue) {
        if (item.hasOwnProperty('value')) {
            return item.value === optionValue;
        }
        else {
            return item === optionValue;
        }
    }
    cancel() {
        this.multiSelectedOptions = this.filter ? [...this.filter] : [];
        this.dropdown.closePanel();
        this.clearOptionFilter();
    }
    filterMultiSelect() {
        if (this.multiSelectedOptions.length === 0 && !this.filter) {
            this.multiSelectHasVisibleOptions() && this.dropdown ? (this.error = true) : null;
        }
        else {
            this.clearOptionFilter();
            const actualFilter = this.multiSelectedOptions.length > 0 ? [...this.multiSelectedOptions] : undefined;
            this.filterData(actualFilter);
            this.dropdown.closePanel();
        }
    }
    multiSelectOptionFilter(optionFilter) {
        this.multiSelectedOptionIsHidden.forEach((record) => {
            if (record.option) {
                record.hidden = !(this.getOptionText(record.option).toLowerCase().startsWith(optionFilter.toLowerCase()) ||
                    this.isSelected(record.option, this.multiSelectedOptions));
            }
        });
    }
    multiSelectOptionIsHidden(option) {
        return this.multiSelectedOptionIsHidden.find((record) => record.option === option).hidden;
    }
    multiSelectHasVisibleOptions() {
        return this.multiSelectedOptionIsHidden.some((record) => !record.hidden);
    }
    getOptionText(option) {
        if (typeof option !== 'object') {
            return option.toString();
        }
        else {
            const opt = option;
            return (opt.label.length > 0 ? opt.label : opt.value).toString();
        }
    }
    multiSelectOptionFilterHandleKeydown(event) {
        if (this.multiSelect) {
            this.error = false;
            if (this.dropdown.panelOpen && event.key === "Escape" /* Escape */) {
                // escape = clear text box and close
                Helpers.swallowEvent(event);
                this.clearOptionFilter();
                this.dropdown.closePanel();
            }
            else if (event.key === "Enter" /* Enter */) {
                Helpers.swallowEvent(event);
                this.filterMultiSelect();
            }
            else if ((event.keyCode >= 65 && event.keyCode <= 90) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                (event.keyCode >= 48 && event.keyCode <= 57)) {
                this.optionFilterInput.nativeElement.focus();
            }
        }
    }
    handleEscapeKeydown(event) {
        if (!this.multiSelect) {
            this.error = false;
            this.dropdown.closePanel();
        }
    }
    clearOptionFilter() {
        this.error = false;
        if (this.optionFilter.length > 0) {
            this.optionFilter = '';
            this.multiSelectedOptionIsHidden.forEach((record) => {
                record.hidden = false;
            });
        }
    }
    startResize(mouseDownEvent) {
        mouseDownEvent.preventDefault();
        const minimumWidth = 60 + (this.config.filterable ? 30 : 0) + (this.config.sortable ? 30 : 0);
        const startingWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        const mouseMoveSubscription = fromEvent(window.document, 'mousemove').subscribe((middleMouseEvent) => {
            const differenceWidth = middleMouseEvent.clientX - mouseDownEvent.clientX;
            let width = startingWidth + differenceWidth;
            if (width < minimumWidth) {
                width = minimumWidth;
            }
            this.setWidth(width);
        });
        const mouseUpSubscription = fromEvent(window.document, 'mouseup').subscribe(() => {
            mouseUpSubscription.unsubscribe();
            mouseMoveSubscription.unsubscribe();
            this.changeDetectorRef.markForCheck();
        });
        this.subscriptions.push(mouseMoveSubscription);
        this.subscriptions.push(mouseUpSubscription);
    }
    setWidth(width) {
        this._column.width = width;
        this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${width}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${width}px`);
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${width}px`);
        this.changeDetectorRef.markForCheck();
        this.resized.next(this._column);
    }
    toggleCustomRange(event, value) {
        Helpers.swallowEvent(event);
        this.showCustomRange = value;
        this.changeDetectorRef.markForCheck();
        this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
    }
    focusInput() {
        if (this.filterInput && this.filterInput.nativeElement) {
            setTimeout(() => this.filterInput.nativeElement.focus(), 0);
        }
        if (this.multiSelect && this.dropdown) {
            this.dropdown._handleKeydown = (event) => {
                this.multiSelectOptionFilterHandleKeydown(event);
            };
            // setTimeout(() => this.optionFilterInput.nativeElement.focus(), 0);
            this.changeDetectorRef.markForCheck();
        }
    }
    sort() {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            this.direction = this.getNextSortDirection(this.direction);
            this._sort.sort(this.id, this.direction, this.config.transforms.sort);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    filterData(filter) {
        let actualFilter = NovoDataTableFilterUtils.constructFilter(filter, this.config.filterConfig.type, this.multiSelect);
        const selectedOption = this.config.filterConfig.type === 'date' && filter ? filter : undefined;
        this.activeDateFilter = selectedOption ? selectedOption.label : undefined;
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            if (actualFilter === '') {
                actualFilter = undefined;
            }
            this._sort.filter(this.id, this.config.filterConfig.type, actualFilter, this.config.transforms.filter, this.allowMultipleFilters, selectedOption);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    clearFilter() {
        this.filter = undefined;
        this.multiSelectedOptions = [];
        this.activeDateFilter = undefined;
        this.filterData(undefined);
        this.clearOptionFilter();
        this.dropdown.closePanel();
    }
    getNextSortDirection(direction) {
        if (!direction) {
            return 'asc';
        }
        if (direction === 'asc') {
            return 'desc';
        }
        return 'asc';
    }
    getDefaultDateFilterOptions() {
        const opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 },
        ];
        return opts;
    }
}
NovoDataTableCellHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableCellHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NovoLabelService }, { token: i2.DataTableState }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i3.NovoDataTableSortFilter, optional: true }, { token: i4.CdkColumnDef, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableCellHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableCellHeader, selector: "[novo-data-table-cell-config]", inputs: { defaultSort: "defaultSort", allowMultipleFilters: "allowMultipleFilters", resized: "resized", filterTemplate: "filterTemplate", column: ["novo-data-table-cell-config", "column"] }, host: { listeners: { "keydown": "multiSelectOptionFilterHandleKeydown($event)", "keydown.escape": "handleEscapeKeydown($event)" }, properties: { "class.resizable": "this.resizable" } }, viewQueries: [{ propertyName: "filterInput", first: true, predicate: ["filterInput"], descendants: true }, { propertyName: "dropdown", first: true, predicate: NovoDropdownElement, descendants: true }, { propertyName: "optionFilterInput", first: true, predicate: ["optionFilterInput"], descendants: true }], ngImport: i0, template: `
    <i class="bhi-{{ labelIcon }} label-icon" *ngIf="labelIcon" data-automation-id="novo-data-table-header-icon"></i>
    <label data-automation-id="novo-data-table-label">{{ label }}</label>
    <div>
      <novo-sort-button
        *ngIf="config.sortable"
        data-automation-id="novo-data-table-sort"
        tooltipPosition="left"
        [tooltip]="labels.sort"
        [attr.data-feature-id]="'novo-data-table-sort-' + this.id"
        (sortChange)="sort()"
        [value]="sortValue"></novo-sort-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-data-table-container"
        containerClass="data-table-dropdown"
        data-automation-id="novo-data-table-filter"
        [multiple]="multiSelect">
        <novo-icon
          dropdownTrigger
          class="filter-button"
          [class.filter-active]="filterActive"
          [tooltip]="labels.filters"
          tooltipPosition="right"
          [attr.data-feature-id]="'novo-data-table-filter-' + this.id"
          (click)="focusInput()">filter</novo-icon>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <ng-container *ngSwitchCase="'date'" (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <ng-container *ngIf="!showCustomRange">
                  <novo-option
                    [class.active]="activeDateFilter === option.label"
                    *ngFor="let option of config.filterConfig.options"
                    (click)="filterData(option)"
                    [attr.data-automation-id]="'novo-data-table-filter-' + option.label">
                    <span>{{ option.label }}</span>
                    <novo-icon novoSuffix color="positive" *ngIf="activeDateFilter === option.label">check</novo-icon>
                  </novo-option>
                </ng-container>
                <novo-option
                  [class.active]="labels.customDateRange === activeDateFilter"
                  (click)="toggleCustomRange($event, true)"
                  *ngIf="config.filterConfig.allowCustomRange && !showCustomRange">
                  <span>{{ labels.customDateRange }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="labels.customDateRange === activeDateFilter">check</novo-icon>
                </novo-option>
                <novo-option class="calendar-container" *ngIf="showCustomRange" keepOpen>
                  <novo-stack>
                    <div class="back-link" (click)="toggleCustomRange($event, false)">
                      <i class="bhi-previous"></i>
                      {{ labels.backToPresetFilters }}
                    </div>
                    <novo-date-picker
                      (onSelect)="filterData($event)"
                      [(ngModel)]="filter"
                      range="true"
                      (keydown.escape)="handleEscapeKeydown($event)"></novo-date-picker>
                  </novo-stack>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option
                  [class.active]="filter === option"
                  *ngFor="let option of config.filterConfig.options"
                  (click)="filterData(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option">
                    check</novo-icon>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'multi-select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup class="dropdown-list-filter" (keydown)="multiSelectOptionFilterHandleKeydown($event)">
                <novo-option class="filter-search" novoInert>
                  <novo-field flex>
                    <input
                      novoInput
                      [(ngModel)]="optionFilter"
                      (ngModelChange)="multiSelectOptionFilter($event)"
                      #optionFilterInput
                      data-automation-id="novo-data-table-multi-select-option-filter-input"
                      (keydown.enter)="multiSelectOptionFilterHandleKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                    <novo-error class="error-text" [hidden]="!error || !multiSelectHasVisibleOptions()">
                      {{ labels.selectFilterOptions }}
                    </novo-error>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
              <novo-optgroup class="dropdown-list-options" (keydown.escape)="handleEscapeKeydown($event)">
                <novo-option
                  *ngFor="let option of config.filterConfig.options"
                  [hidden]="multiSelectOptionIsHidden(option)"
                  (click)="toggleSelection(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive">
                    {{ isSelected(option, multiSelectedOptions) ? 'checkbox-filled' : 'checkbox-empty' }}
                  </novo-icon>
                </novo-option>
              </novo-optgroup>
              <novo-option class="filter-null-results" [hidden]="multiSelectHasVisibleOptions()">{{ labels.pickerEmpty }}</novo-option>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'custom'">
            <ng-container *ngIf="dropdown">
              <novo-data-table-cell-filter-header *ngIf="!config.filterConfig?.useCustomHeader" [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
              <div class="optgroup-container">
                <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: config, column, dropdown, filter }"></ng-container>
              </div>
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchDefault (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option class="filter-search" novoInert>
                  <novo-field flex fullWidth>
                    <input
                      novoInput
                      [type]="config.filterConfig.type"
                      [(ngModel)]="filter"
                      (ngModelChange)="filterData($event)"
                      #filterInput
                      data-automation-id="novo-data-table-filter-input"
                      (keydown.escape)="handleEscapeKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
        </ng-container>
        <div class="footer" *ngIf="multiSelect">
          <novo-button theme="dialogue" color="dark" (click)="cancel()" data-automation-id="novo-data-table-multi-select-cancel">
            {{ labels.cancel }}
          </novo-button>
          <novo-button
            theme="dialogue"
            color="positive"
            (click)="filterMultiSelect()"
            data-automation-id="novo-data-table-multi-select-filter">
            {{ labels.filters }}
          </novo-button>
        </div>
      </novo-dropdown>
    </div>
    <div class="spacer"></div>
    <div class="data-table-header-resizable" *ngIf="config.resizable"><span (mousedown)="startResize($event)">&nbsp;</span></div>
  `, isInline: true, components: [{ type: i5.NovoDataTableSortButton, selector: "novo-sort-button", inputs: ["value"], outputs: ["sortChange"] }, { type: i6.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i7.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i8.NovoDataTableCellFilterHeader, selector: "novo-data-table-cell-filter-header", inputs: ["label", "filter"], outputs: ["clearFilter"] }, { type: i9.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i10.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i11.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i12.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { type: i13.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i14.NovoErrorElement, selector: "novo-error" }, { type: i15.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i16.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i17.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i6.NovoDropDownTrigger, selector: "[dropdownTrigger]" }, { type: i16.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i16.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i16.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i13.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { type: i18.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i18.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i19.FlexDirective, selector: "[flex]", inputs: ["flex"] }, { type: i20.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i18.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i16.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i16.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i21.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableCellHeader, decorators: [{
            type: Component,
            args: [{
                    selector: '[novo-data-table-cell-config]',
                    template: `
    <i class="bhi-{{ labelIcon }} label-icon" *ngIf="labelIcon" data-automation-id="novo-data-table-header-icon"></i>
    <label data-automation-id="novo-data-table-label">{{ label }}</label>
    <div>
      <novo-sort-button
        *ngIf="config.sortable"
        data-automation-id="novo-data-table-sort"
        tooltipPosition="left"
        [tooltip]="labels.sort"
        [attr.data-feature-id]="'novo-data-table-sort-' + this.id"
        (sortChange)="sort()"
        [value]="sortValue"></novo-sort-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-data-table-container"
        containerClass="data-table-dropdown"
        data-automation-id="novo-data-table-filter"
        [multiple]="multiSelect">
        <novo-icon
          dropdownTrigger
          class="filter-button"
          [class.filter-active]="filterActive"
          [tooltip]="labels.filters"
          tooltipPosition="right"
          [attr.data-feature-id]="'novo-data-table-filter-' + this.id"
          (click)="focusInput()">filter</novo-icon>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <ng-container *ngSwitchCase="'date'" (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <ng-container *ngIf="!showCustomRange">
                  <novo-option
                    [class.active]="activeDateFilter === option.label"
                    *ngFor="let option of config.filterConfig.options"
                    (click)="filterData(option)"
                    [attr.data-automation-id]="'novo-data-table-filter-' + option.label">
                    <span>{{ option.label }}</span>
                    <novo-icon novoSuffix color="positive" *ngIf="activeDateFilter === option.label">check</novo-icon>
                  </novo-option>
                </ng-container>
                <novo-option
                  [class.active]="labels.customDateRange === activeDateFilter"
                  (click)="toggleCustomRange($event, true)"
                  *ngIf="config.filterConfig.allowCustomRange && !showCustomRange">
                  <span>{{ labels.customDateRange }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="labels.customDateRange === activeDateFilter">check</novo-icon>
                </novo-option>
                <novo-option class="calendar-container" *ngIf="showCustomRange" keepOpen>
                  <novo-stack>
                    <div class="back-link" (click)="toggleCustomRange($event, false)">
                      <i class="bhi-previous"></i>
                      {{ labels.backToPresetFilters }}
                    </div>
                    <novo-date-picker
                      (onSelect)="filterData($event)"
                      [(ngModel)]="filter"
                      range="true"
                      (keydown.escape)="handleEscapeKeydown($event)"></novo-date-picker>
                  </novo-stack>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option
                  [class.active]="filter === option"
                  *ngFor="let option of config.filterConfig.options"
                  (click)="filterData(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option">
                    check</novo-icon>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'multi-select'">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup class="dropdown-list-filter" (keydown)="multiSelectOptionFilterHandleKeydown($event)">
                <novo-option class="filter-search" novoInert>
                  <novo-field flex>
                    <input
                      novoInput
                      [(ngModel)]="optionFilter"
                      (ngModelChange)="multiSelectOptionFilter($event)"
                      #optionFilterInput
                      data-automation-id="novo-data-table-multi-select-option-filter-input"
                      (keydown.enter)="multiSelectOptionFilterHandleKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                    <novo-error class="error-text" [hidden]="!error || !multiSelectHasVisibleOptions()">
                      {{ labels.selectFilterOptions }}
                    </novo-error>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
              <novo-optgroup class="dropdown-list-options" (keydown.escape)="handleEscapeKeydown($event)">
                <novo-option
                  *ngFor="let option of config.filterConfig.options"
                  [hidden]="multiSelectOptionIsHidden(option)"
                  (click)="toggleSelection(option)"
                  [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)">
                  <span>{{ option?.label || option }}</span>
                  <novo-icon novoSuffix color="positive">
                    {{ isSelected(option, multiSelectedOptions) ? 'checkbox-filled' : 'checkbox-empty' }}
                  </novo-icon>
                </novo-option>
              </novo-optgroup>
              <novo-option class="filter-null-results" [hidden]="multiSelectHasVisibleOptions()">{{ labels.pickerEmpty }}</novo-option>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'custom'">
            <ng-container *ngIf="dropdown">
              <novo-data-table-cell-filter-header *ngIf="!config.filterConfig?.useCustomHeader" [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
              <div class="optgroup-container">
                <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: config, column, dropdown, filter }"></ng-container>
              </div>
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchDefault (keydown.escape)="handleEscapeKeydown($event)">
            <novo-data-table-cell-filter-header [filter]="filter" (clearFilter)="clearFilter()"></novo-data-table-cell-filter-header>
            <div class="optgroup-container">
              <novo-optgroup>
                <novo-option class="filter-search" novoInert>
                  <novo-field flex fullWidth>
                    <input
                      novoInput
                      [type]="config.filterConfig.type"
                      [(ngModel)]="filter"
                      (ngModelChange)="filterData($event)"
                      #filterInput
                      data-automation-id="novo-data-table-filter-input"
                      (keydown.escape)="handleEscapeKeydown($event)" />
                    <novo-icon novoSuffix>search</novo-icon>
                  </novo-field>
                </novo-option>
              </novo-optgroup>
            </div>
          </ng-container>
        </ng-container>
        <div class="footer" *ngIf="multiSelect">
          <novo-button theme="dialogue" color="dark" (click)="cancel()" data-automation-id="novo-data-table-multi-select-cancel">
            {{ labels.cancel }}
          </novo-button>
          <novo-button
            theme="dialogue"
            color="positive"
            (click)="filterMultiSelect()"
            data-automation-id="novo-data-table-multi-select-filter">
            {{ labels.filters }}
          </novo-button>
        </div>
      </novo-dropdown>
    </div>
    <div class="spacer"></div>
    <div class="data-table-header-resizable" *ngIf="config.resizable"><span (mousedown)="startResize($event)">&nbsp;</span></div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NovoLabelService }, { type: i2.DataTableState }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i3.NovoDataTableSortFilter, decorators: [{
                    type: Optional
                }] }, { type: i4.CdkColumnDef, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { filterInput: [{
                type: ViewChild,
                args: ['filterInput']
            }], dropdown: [{
                type: ViewChild,
                args: [NovoDropdownElement]
            }], optionFilterInput: [{
                type: ViewChild,
                args: ['optionFilterInput']
            }], defaultSort: [{
                type: Input
            }], allowMultipleFilters: [{
                type: Input
            }], resized: [{
                type: Input
            }], filterTemplate: [{
                type: Input
            }], resizable: [{
                type: HostBinding,
                args: ['class.resizable']
            }], column: [{
                type: Input,
                args: ['novo-data-table-cell-config']
            }], multiSelectOptionFilterHandleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], handleEscapeKeydown: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1oZWFkZXItY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9kYXRhLXRhYmxlL2NlbGwtaGVhZGVycy9kYXRhLXRhYmxlLWhlYWRlci1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBR0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdLbkUsTUFBTSxPQUFPLHVCQUF1QjtJQTZGbEMsWUFDUyxpQkFBb0MsRUFDcEMsTUFBd0IsRUFDdkIsS0FBd0IsRUFDeEIsUUFBbUIsRUFDbkIsVUFBc0IsRUFDWCxLQUFp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QURoQixTQUFTO3VCQUFDLG1CQUFtQjtnQkFJOUIsV0FBVztzQkFEVixLQUFLO2dCQUlOLG9CQUFvQjtzQkFEbkIsS0FBSztnQkFJTixPQUFPO3NCQUROLEtBQUs7Z0JBR04sY0FBYztzQkFEYixLQUFLO2dCQUdDLFNBQVM7c0JBRGYsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBSTFCLE1BQU07c0JBRFQsS0FBSzt1QkFBQyw2QkFBNkI7Z0JBb1A3QixvQ0FBb0M7c0JBRDFDLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXVCNUIsbUJBQW1CO3NCQUR6QixZQUFZO3VCQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi8uLi91dGlscyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25FbGVtZW50IH0gZnJvbSAnLi4vLi4vZHJvcGRvd24vRHJvcGRvd24nO1xuaW1wb3J0IHtcbiAgSURhdGFUYWJsZUNoYW5nZUV2ZW50LFxuICBJRGF0YVRhYmxlQ29sdW1uLFxuICBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyQ29uZmlnLFxuICBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uLFxuICBJRGF0YVRhYmxlQ29sdW1uU29ydENvbmZpZyxcbiAgSURhdGFUYWJsZVNvcnRGaWx0ZXIsXG59IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZUZpbHRlclV0aWxzIH0gZnJvbSAnLi4vc2VydmljZXMvZGF0YS10YWJsZS1maWx0ZXItdXRpbHMnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uL3NvcnQtZmlsdGVyJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVTb3J0RmlsdGVyIH0gZnJvbSAnLi4vc29ydC1maWx0ZXIvc29ydC1maWx0ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZGF0YS10YWJsZS1zdGF0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25vdm8tZGF0YS10YWJsZS1jZWxsLWNvbmZpZ10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIGNsYXNzPVwiYmhpLXt7IGxhYmVsSWNvbiB9fSBsYWJlbC1pY29uXCIgKm5nSWY9XCJsYWJlbEljb25cIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtaGVhZGVyLWljb25cIj48L2k+XG4gICAgPGxhYmVsIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1sYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cbiAgICA8ZGl2PlxuICAgICAgPG5vdm8tc29ydC1idXR0b25cbiAgICAgICAgKm5nSWY9XCJjb25maWcuc29ydGFibGVcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtc29ydFwiXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cImxlZnRcIlxuICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuc29ydFwiXG4gICAgICAgIFthdHRyLmRhdGEtZmVhdHVyZS1pZF09XCInbm92by1kYXRhLXRhYmxlLXNvcnQtJyArIHRoaXMuaWRcIlxuICAgICAgICAoc29ydENoYW5nZSk9XCJzb3J0KClcIlxuICAgICAgICBbdmFsdWVdPVwic29ydFZhbHVlXCI+PC9ub3ZvLXNvcnQtYnV0dG9uPlxuICAgICAgPG5vdm8tZHJvcGRvd25cbiAgICAgICAgKm5nSWY9XCJjb25maWcuZmlsdGVyYWJsZVwiXG4gICAgICAgIHNpZGU9XCJyaWdodFwiXG4gICAgICAgIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLm5vdm8tZGF0YS10YWJsZS1jb250YWluZXJcIlxuICAgICAgICBjb250YWluZXJDbGFzcz1cImRhdGEtdGFibGUtZHJvcGRvd25cIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtZmlsdGVyXCJcbiAgICAgICAgW211bHRpcGxlXT1cIm11bHRpU2VsZWN0XCI+XG4gICAgICAgIDxub3ZvLWljb25cbiAgICAgICAgICBkcm9wZG93blRyaWdnZXJcbiAgICAgICAgICBjbGFzcz1cImZpbHRlci1idXR0b25cIlxuICAgICAgICAgIFtjbGFzcy5maWx0ZXItYWN0aXZlXT1cImZpbHRlckFjdGl2ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwibGFiZWxzLmZpbHRlcnNcIlxuICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWZlYXR1cmUtaWRdPVwiJ25vdm8tZGF0YS10YWJsZS1maWx0ZXItJyArIHRoaXMuaWRcIlxuICAgICAgICAgIChjbGljayk9XCJmb2N1c0lucHV0KClcIj5maWx0ZXI8L25vdm8taWNvbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29uZmlnLmZpbHRlckNvbmZpZy50eXBlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgKGtleWRvd24uZXNjYXBlKT1cImhhbmRsZUVzY2FwZUtleWRvd24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1jZWxsLWZpbHRlci1oZWFkZXIgW2ZpbHRlcl09XCJmaWx0ZXJcIiAoY2xlYXJGaWx0ZXIpPVwiY2xlYXJGaWx0ZXIoKVwiPjwvbm92by1kYXRhLXRhYmxlLWNlbGwtZmlsdGVyLWhlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHRncm91cC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzaG93Q3VzdG9tUmFuZ2VcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZURhdGVGaWx0ZXIgPT09IG9wdGlvbi5sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckRhdGEob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1kYXRhLXRhYmxlLWZpbHRlci0nICsgb3B0aW9uLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IG9wdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvU3VmZml4IGNvbG9yPVwicG9zaXRpdmVcIiAqbmdJZj1cImFjdGl2ZURhdGVGaWx0ZXIgPT09IG9wdGlvbi5sYWJlbFwiPmNoZWNrPC9ub3ZvLWljb24+XG4gICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJsYWJlbHMuY3VzdG9tRGF0ZVJhbmdlID09PSBhY3RpdmVEYXRlRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVDdXN0b21SYW5nZSgkZXZlbnQsIHRydWUpXCJcbiAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlckNvbmZpZy5hbGxvd0N1c3RvbVJhbmdlICYmICFzaG93Q3VzdG9tUmFuZ2VcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5jdXN0b21EYXRlUmFuZ2UgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8bm92by1pY29uIG5vdm9TdWZmaXggY29sb3I9XCJwb3NpdGl2ZVwiICpuZ0lmPVwibGFiZWxzLmN1c3RvbURhdGVSYW5nZSA9PT0gYWN0aXZlRGF0ZUZpbHRlclwiPmNoZWNrPC9ub3ZvLWljb24+XG4gICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJjYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cInNob3dDdXN0b21SYW5nZVwiIGtlZXBPcGVuPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tc3RhY2s+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWxpbmtcIiAoY2xpY2spPVwidG9nZ2xlQ3VzdG9tUmFuZ2UoJGV2ZW50LCBmYWxzZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwiZmlsdGVyRGF0YSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgcmFuZ2U9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lc2NhcGUpPVwiaGFuZGxlRXNjYXBlS2V5ZG93bigkZXZlbnQpXCI+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgICAgICAgICAgPC9ub3ZvLXN0YWNrPlxuICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgICAgICA8bm92by1kYXRhLXRhYmxlLWNlbGwtZmlsdGVyLWhlYWRlciBbZmlsdGVyXT1cImZpbHRlclwiIChjbGVhckZpbHRlcik9XCJjbGVhckZpbHRlcigpXCI+PC9ub3ZvLWRhdGEtdGFibGUtY2VsbC1maWx0ZXItaGVhZGVyPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdGdyb3VwLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8bm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiZmlsdGVyID09PSBvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlckRhdGEob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tZGF0YS10YWJsZS1maWx0ZXItJyArIChvcHRpb24/LmxhYmVsIHx8IG9wdGlvbilcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvU3VmZml4IGNvbG9yPVwicG9zaXRpdmVcIiAqbmdJZj1cIm9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/IGZpbHRlciA9PT0gb3B0aW9uLnZhbHVlIDogZmlsdGVyID09PSBvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgY2hlY2s8L25vdm8taWNvbj5cbiAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInbXVsdGktc2VsZWN0J1wiPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1jZWxsLWZpbHRlci1oZWFkZXIgW2ZpbHRlcl09XCJmaWx0ZXJcIiAoY2xlYXJGaWx0ZXIpPVwiY2xlYXJGaWx0ZXIoKVwiPjwvbm92by1kYXRhLXRhYmxlLWNlbGwtZmlsdGVyLWhlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHRncm91cC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgY2xhc3M9XCJkcm9wZG93bi1saXN0LWZpbHRlclwiIChrZXlkb3duKT1cIm11bHRpU2VsZWN0T3B0aW9uRmlsdGVySGFuZGxlS2V5ZG93bigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWZpZWxkIGZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIG5vdm9JbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwib3B0aW9uRmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJtdWx0aVNlbGVjdE9wdGlvbkZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAjb3B0aW9uRmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRhdGEtdGFibGUtbXVsdGktc2VsZWN0LW9wdGlvbi1maWx0ZXItaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIm11bHRpU2VsZWN0T3B0aW9uRmlsdGVySGFuZGxlS2V5ZG93bigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvU3VmZml4PnNlYXJjaDwvbm92by1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1lcnJvciBjbGFzcz1cImVycm9yLXRleHRcIiBbaGlkZGVuXT1cIiFlcnJvciB8fCAhbXVsdGlTZWxlY3RIYXNWaXNpYmxlT3B0aW9ucygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnNlbGVjdEZpbHRlck9wdGlvbnMgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWVycm9yPlxuICAgICAgICAgICAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgY2xhc3M9XCJkcm9wZG93bi1saXN0LW9wdGlvbnNcIiAoa2V5ZG93bi5lc2NhcGUpPVwiaGFuZGxlRXNjYXBlS2V5ZG93bigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cIm11bHRpU2VsZWN0T3B0aW9uSXNIaWRkZW4ob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0aW9uKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWRhdGEtdGFibGUtZmlsdGVyLScgKyAob3B0aW9uPy5sYWJlbCB8fCBvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWljb24gbm92b1N1ZmZpeCBjb2xvcj1cInBvc2l0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGlzU2VsZWN0ZWQob3B0aW9uLCBtdWx0aVNlbGVjdGVkT3B0aW9ucykgPyAnY2hlY2tib3gtZmlsbGVkJyA6ICdjaGVja2JveC1lbXB0eScgfX1cbiAgICAgICAgICAgICAgICAgIDwvbm92by1pY29uPlxuICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLW51bGwtcmVzdWx0c1wiIFtoaWRkZW5dPVwibXVsdGlTZWxlY3RIYXNWaXNpYmxlT3B0aW9ucygpXCI+e3sgbGFiZWxzLnBpY2tlckVtcHR5IH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidjdXN0b20nXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1jZWxsLWZpbHRlci1oZWFkZXIgKm5nSWY9XCIhY29uZmlnLmZpbHRlckNvbmZpZz8udXNlQ3VzdG9tSGVhZGVyXCIgW2ZpbHRlcl09XCJmaWx0ZXJcIiAoY2xlYXJGaWx0ZXIpPVwiY2xlYXJGaWx0ZXIoKVwiPjwvbm92by1kYXRhLXRhYmxlLWNlbGwtZmlsdGVyLWhlYWRlcj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdGdyb3VwLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbmZpZywgY29sdW1uLCBkcm9wZG93biwgZmlsdGVyIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQgKGtleWRvd24uZXNjYXBlKT1cImhhbmRsZUVzY2FwZUtleWRvd24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0YS10YWJsZS1jZWxsLWZpbHRlci1oZWFkZXIgW2ZpbHRlcl09XCJmaWx0ZXJcIiAoY2xlYXJGaWx0ZXIpPVwiY2xlYXJGaWx0ZXIoKVwiPjwvbm92by1kYXRhLXRhYmxlLWNlbGwtZmlsdGVyLWhlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHRncm91cC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWZpZWxkIGZsZXggZnVsbFdpZHRoPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBub3ZvSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICBbdHlwZV09XCJjb25maWcuZmlsdGVyQ29uZmlnLnR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJmaWx0ZXJEYXRhKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1maWx0ZXItaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVzY2FwZSk9XCJoYW5kbGVFc2NhcGVLZXlkb3duKCRldmVudClcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1pY29uIG5vdm9TdWZmaXg+c2VhcmNoPC9ub3ZvLWljb24+XG4gICAgICAgICAgICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCIgKm5nSWY9XCJtdWx0aVNlbGVjdFwiPlxuICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJkYXJrXCIgKGNsaWNrKT1cImNhbmNlbCgpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kYXRhLXRhYmxlLW11bHRpLXNlbGVjdC1jYW5jZWxcIj5cbiAgICAgICAgICAgIHt7IGxhYmVscy5jYW5jZWwgfX1cbiAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgdGhlbWU9XCJkaWFsb2d1ZVwiXG4gICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJmaWx0ZXJNdWx0aVNlbGVjdCgpXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZGF0YS10YWJsZS1tdWx0aS1zZWxlY3QtZmlsdGVyXCI+XG4gICAgICAgICAgICB7eyBsYWJlbHMuZmlsdGVycyB9fVxuICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9ub3ZvLWRyb3Bkb3duPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0YS10YWJsZS1oZWFkZXItcmVzaXphYmxlXCIgKm5nSWY9XCJjb25maWcucmVzaXphYmxlXCI+PHNwYW4gKG1vdXNlZG93bik9XCJzdGFydFJlc2l6ZSgkZXZlbnQpXCI+Jm5ic3A7PC9zcGFuPjwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUNlbGxIZWFkZXI8VD4gaW1wbGVtZW50cyBJRGF0YVRhYmxlU29ydEZpbHRlciwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpXG4gIGZpbHRlcklucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKE5vdm9Ecm9wZG93bkVsZW1lbnQpXG4gIGRyb3Bkb3duOiBOb3ZvRHJvcGRvd25FbGVtZW50O1xuICBAVmlld0NoaWxkKCdvcHRpb25GaWx0ZXJJbnB1dCcpXG4gIG9wdGlvbkZpbHRlcklucHV0OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpXG4gIGRlZmF1bHRTb3J0OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfTtcblxuICBASW5wdXQoKVxuICBhbGxvd011bHRpcGxlRmlsdGVyczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHJlc2l6ZWQ6IEV2ZW50RW1pdHRlcjxJRGF0YVRhYmxlQ29sdW1uPFQ+PjtcbiAgQElucHV0KClcbiAgZmlsdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBIb3N0QmluZGluZygnY2xhc3MucmVzaXphYmxlJylcbiAgcHVibGljIHJlc2l6YWJsZTogYm9vbGVhbjtcblxuICBASW5wdXQoJ25vdm8tZGF0YS10YWJsZS1jZWxsLWNvbmZpZycpXG4gIHNldCBjb2x1bW4oY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSB7XG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMubGFiZWwgPSBjb2x1bW4udHlwZSA9PT0gJ2FjdGlvbicgPyAnJyA6IGNvbHVtbi5sYWJlbDtcbiAgICB0aGlzLmxhYmVsSWNvbiA9IGNvbHVtbi5sYWJlbEljb247XG5cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIHNvcnRhYmxlOiAhIWNvbHVtbi5zb3J0YWJsZSxcbiAgICAgIGZpbHRlcmFibGU6ICEhY29sdW1uLmZpbHRlcmFibGUsXG4gICAgICByZXNpemFibGU6ICEhY29sdW1uLnJlc2l6YWJsZSxcbiAgICB9O1xuICAgIHRoaXMucmVzaXphYmxlID0gdGhpcy5jb25maWcucmVzaXphYmxlO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtczogeyBmaWx0ZXI/OiBGdW5jdGlvbjsgc29ydD86IEZ1bmN0aW9uIH0gPSB7fTtcblxuICAgIGlmIChjb2x1bW4uZmlsdGVyYWJsZSAmJiBIZWxwZXJzLmlzT2JqZWN0KGNvbHVtbi5maWx0ZXJhYmxlKSkge1xuICAgICAgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnID0gY29sdW1uLmZpbHRlcmFibGUgYXMgSURhdGFUYWJsZUNvbHVtbkZpbHRlckNvbmZpZztcbiAgICAgIGlmICghdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnID0geyB0eXBlOiAndGV4dCcgfTtcbiAgICAgIH1cbiAgICAgIGlmICgoY29sdW1uLmZpbHRlcmFibGUgYXMgSURhdGFUYWJsZUNvbHVtbkZpbHRlckNvbmZpZykudHJhbnNmb3JtKSB7XG4gICAgICAgIHRyYW5zZm9ybXMuZmlsdGVyID0gKGNvbHVtbi5maWx0ZXJhYmxlIGFzIElEYXRhVGFibGVDb2x1bW5GaWx0ZXJDb25maWcpLnRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnID0geyB0eXBlOiAndGV4dCcgfTtcbiAgICB9XG5cbiAgICBpZiAoY29sdW1uLnNvcnRhYmxlICYmIEhlbHBlcnMuaXNPYmplY3QoY29sdW1uLnNvcnRhYmxlKSkge1xuICAgICAgaWYgKChjb2x1bW4uc29ydGFibGUgYXMgSURhdGFUYWJsZUNvbHVtblNvcnRDb25maWcpLnRyYW5zZm9ybSkge1xuICAgICAgICB0cmFuc2Zvcm1zLnNvcnQgPSAoY29sdW1uLnNvcnRhYmxlIGFzIElEYXRhVGFibGVDb2x1bW5Tb3J0Q29uZmlnKS50cmFuc2Zvcm07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlID09PSAnZGF0ZScgJiYgIXRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy5vcHRpb25zKSB7XG4gICAgICB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucyA9IHRoaXMuZ2V0RGVmYXVsdERhdGVGaWx0ZXJPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcudHJhbnNmb3JtcyA9IHRyYW5zZm9ybXM7XG4gIH1cbiAgZ2V0IGNvbHVtbigpOiBJRGF0YVRhYmxlQ29sdW1uPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uO1xuICB9XG4gIHByaXZhdGUgX2NvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPjtcblxuICBwcml2YXRlIF9yZXJlbmRlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGNoYW5nZVRpbWVvdXQ6IGFueTtcblxuICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgcHVibGljIGljb246IHN0cmluZyA9ICdzb3J0YWJsZSc7XG4gIHB1YmxpYyBsYWJlbEljb246IHN0cmluZztcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBmaWx0ZXI6IGFueTtcbiAgcHVibGljIGRpcmVjdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgZmlsdGVyQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzb3J0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBzb3J0VmFsdWU6IFNvcnREaXJlY3Rpb24gPSBTb3J0RGlyZWN0aW9uLk5PTkU7XG4gIHB1YmxpYyBzaG93Q3VzdG9tUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFjdGl2ZURhdGVGaWx0ZXI6IHN0cmluZztcbiAgcHVibGljIGNvbmZpZzoge1xuICAgIHNvcnRhYmxlOiBib29sZWFuO1xuICAgIGZpbHRlcmFibGU6IGJvb2xlYW47XG4gICAgcmVzaXphYmxlOiBib29sZWFuO1xuICAgIHRyYW5zZm9ybXM/OiB7IGZpbHRlcj86IEZ1bmN0aW9uOyBzb3J0PzogRnVuY3Rpb24gfTtcbiAgICBmaWx0ZXJDb25maWc/OiBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyQ29uZmlnO1xuICB9O1xuICBwdWJsaWMgbXVsdGlTZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIG11bHRpU2VsZWN0ZWRPcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gIHByaXZhdGUgbXVsdGlTZWxlY3RlZE9wdGlvbklzSGlkZGVuOiBBcnJheTx7IG9wdGlvbjogc3RyaW5nIHwgSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbjsgaGlkZGVuOiBib29sZWFuIH0+ID0gW107XG4gIHB1YmxpYyBvcHRpb25GaWx0ZXI6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgICBwcml2YXRlIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfc29ydDogTm92b0RhdGFUYWJsZVNvcnRGaWx0ZXI8VD4sXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9jZGtDb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgKSB7XG4gICAgdGhpcy5fcmVyZW5kZXJTdWJzY3JpcHRpb24gPSBzdGF0ZS51cGRhdGVzLnN1YnNjcmliZSgoY2hhbmdlOiBJRGF0YVRhYmxlQ2hhbmdlRXZlbnQpID0+IHRoaXMuY2hlY2tTb3J0RmlsdGVyU3RhdGUoY2hhbmdlKSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nka0NvbHVtbkRlZikge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuX2Nka0NvbHVtbkRlZi5uYW1lO1xuICAgIH1cbiAgICB0aGlzLnNldHVwRmlsdGVyT3B0aW9ucygpO1xuXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cEZpbHRlck9wdGlvbnMoKSB7XG4gICAgdGhpcy5jaGVja1NvcnRGaWx0ZXJTdGF0ZSh7IGZpbHRlcjogdGhpcy5zdGF0ZS5maWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9LCB0cnVlKTtcblxuICAgIHRoaXMubXVsdGlTZWxlY3QgPSB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcgJiYgdGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLnR5cGUgPyB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSA9PT0gJ211bHRpLXNlbGVjdCcgOiBmYWxzZTtcbiAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCkge1xuICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyID8gWy4uLnRoaXMuZmlsdGVyXSA6IFtdO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXJlbmRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tTb3J0RmlsdGVyU3RhdGUoc29ydEZpbHRlclN0YXRlOiBJRGF0YVRhYmxlQ2hhbmdlRXZlbnQsIGluaXRpYWxDb25maWc6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChzb3J0RmlsdGVyU3RhdGUuc29ydCAmJiBzb3J0RmlsdGVyU3RhdGUuc29ydC5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgdGhpcy5pY29uID0gYHNvcnQtJHtzb3J0RmlsdGVyU3RhdGUuc29ydC52YWx1ZX1gO1xuICAgICAgdGhpcy5zb3J0VmFsdWUgPSBzb3J0RmlsdGVyU3RhdGUuc29ydC52YWx1ZSA9PT0gJ2FzYycgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQztcbiAgICAgIHRoaXMuc29ydEFjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaWNvbiA9ICdzb3J0YWJsZSc7XG4gICAgICB0aGlzLnNvcnRWYWx1ZSA9IFNvcnREaXJlY3Rpb24uTk9ORTtcbiAgICAgIHRoaXMuc29ydEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlRmlsdGVyID0gSGVscGVycy5jb252ZXJ0VG9BcnJheShzb3J0RmlsdGVyU3RhdGUuZmlsdGVyKTtcbiAgICBjb25zdCB0aGlzRmlsdGVyID0gdGFibGVGaWx0ZXIuZmluZCgoZmlsdGVyKSA9PiBmaWx0ZXIgJiYgZmlsdGVyLmlkID09PSB0aGlzLmlkKTtcblxuICAgIGlmICh0aGlzRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlckFjdGl2ZSA9IHRydWU7XG4gICAgICBpZiAoaW5pdGlhbENvbmZpZyAmJiB0aGlzRmlsdGVyLnR5cGUgPT09ICdkYXRlJyAmJiB0aGlzRmlsdGVyLnNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZUZpbHRlciA9IHRoaXNGaWx0ZXIuc2VsZWN0ZWRPcHRpb24ubGFiZWwgfHwgdGhpcy5sYWJlbHMuY3VzdG9tRGF0ZVJhbmdlO1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzRmlsdGVyLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbHRlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5maWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmFjdGl2ZURhdGVGaWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgfVxuICAgIGlmICh0aGlzLmRlZmF1bHRTb3J0ICYmIHRoaXMuaWQgPT09IHRoaXMuZGVmYXVsdFNvcnQuaWQpIHtcbiAgICAgIHRoaXMuaWNvbiA9IGBzb3J0LSR7dGhpcy5kZWZhdWx0U29ydC52YWx1ZX1gO1xuICAgICAgdGhpcy5zb3J0QWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5tdWx0aVNlbGVjdCA9IHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZyAmJiB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSA/IHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlID09PSAnbXVsdGktc2VsZWN0JyA6IGZhbHNlO1xuICAgIGlmICh0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5maWx0ZXIgPyBbLi4udGhpcy5maWx0ZXJdIDogW107XG4gICAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9uc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25Jc0hpZGRlbiA9ICh0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcub3B0aW9ucyBhcyBzdHJpbmdbXSkubWFwKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBvcHRpb246IHN0cmluZyxcbiAgICAgICAgICAgICk6IHtcbiAgICAgICAgICAgICAgb3B0aW9uOiBzdHJpbmc7XG4gICAgICAgICAgICAgIGhpZGRlbjogYm9vbGVhbjtcbiAgICAgICAgICAgIH0gPT4gKHsgb3B0aW9uLCBoaWRkZW46IGZhbHNlIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uSXNIaWRkZW4gPSAodGhpcy5jb25maWcuZmlsdGVyQ29uZmlnLm9wdGlvbnMgYXMgSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbltdKS5tYXAoXG4gICAgICAgICAgICAob3B0aW9uOiBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uKTogeyBvcHRpb246IElEYXRhVGFibGVDb2x1bW5GaWx0ZXJPcHRpb247IGhpZGRlbjogYm9vbGVhbiB9ID0+ICh7XG4gICAgICAgICAgICAgIG9wdGlvbixcbiAgICAgICAgICAgICAgaGlkZGVuOiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKG9wdGlvbiwgb3B0aW9uc0xpc3QpIHtcbiAgICBpZiAob3B0aW9uc0xpc3QpIHtcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd2YWx1ZScpID8gb3B0aW9uLnZhbHVlIDogb3B0aW9uO1xuXG4gICAgICBjb25zdCBmb3VuZCA9IG9wdGlvbnNMaXN0LmZpbmQoKGl0ZW0pID0+IHRoaXMub3B0aW9uUHJlc2VudENoZWNrKGl0ZW0sIG9wdGlvblZhbHVlKSk7XG4gICAgICByZXR1cm4gZm91bmQgIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNlbGVjdGlvbihvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25WYWx1ZSA9IG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvbjtcblxuICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucy5maW5kSW5kZXgoKGl0ZW0pID0+IHRoaXMub3B0aW9uUHJlc2VudENoZWNrKGl0ZW0sIG9wdGlvblZhbHVlKSk7XG4gICAgdGhpcy5lcnJvciA9IGZhbHNlO1xuICAgIGlmIChvcHRpb25JbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zLnNwbGljZShvcHRpb25JbmRleCwgMSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25GaWx0ZXIgJiYgIXRoaXMuZ2V0T3B0aW9uVGV4dChvcHRpb24pLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0aGlzLm9wdGlvbkZpbHRlci50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25Jc0hpZGRlblt0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25Jc0hpZGRlbi5maW5kSW5kZXgoKHJlY29yZCkgPT4gcmVjb3JkLm9wdGlvbiA9PT0gb3B0aW9uKV0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvblZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3B0aW9uUHJlc2VudENoZWNrKGl0ZW0sIG9wdGlvblZhbHVlKTogYm9vbGVhbiB7XG4gICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgIHJldHVybiBpdGVtLnZhbHVlID09PSBvcHRpb25WYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGl0ZW0gPT09IG9wdGlvblZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyID8gWy4uLnRoaXMuZmlsdGVyXSA6IFtdO1xuICAgIHRoaXMuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICAgIHRoaXMuY2xlYXJPcHRpb25GaWx0ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWx0ZXJNdWx0aVNlbGVjdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgIXRoaXMuZmlsdGVyKSB7XG4gICAgICB0aGlzLm11bHRpU2VsZWN0SGFzVmlzaWJsZU9wdGlvbnMoKSAmJiB0aGlzLmRyb3Bkb3duID8gKHRoaXMuZXJyb3IgPSB0cnVlKSA6IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xlYXJPcHRpb25GaWx0ZXIoKTtcbiAgICAgIGNvbnN0IGFjdHVhbEZpbHRlciA9IHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCA/IFsuLi50aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zXSA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZmlsdGVyRGF0YShhY3R1YWxGaWx0ZXIpO1xuICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZVBhbmVsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG11bHRpU2VsZWN0T3B0aW9uRmlsdGVyKG9wdGlvbkZpbHRlcjogc3RyaW5nKSB7XG4gICAgdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uSXNIaWRkZW4uZm9yRWFjaCgocmVjb3JkKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLm9wdGlvbikge1xuICAgICAgICByZWNvcmQuaGlkZGVuID0gIShcbiAgICAgICAgICB0aGlzLmdldE9wdGlvblRleHQocmVjb3JkLm9wdGlvbikudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKG9wdGlvbkZpbHRlci50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZChyZWNvcmQub3B0aW9uLCB0aGlzLm11bHRpU2VsZWN0ZWRPcHRpb25zKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG11bHRpU2VsZWN0T3B0aW9uSXNIaWRkZW4ob3B0aW9uOiBzdHJpbmcgfCBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbklzSGlkZGVuLmZpbmQoKHJlY29yZCkgPT4gcmVjb3JkLm9wdGlvbiA9PT0gb3B0aW9uKS5oaWRkZW47XG4gIH1cblxuICBwdWJsaWMgbXVsdGlTZWxlY3RIYXNWaXNpYmxlT3B0aW9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aVNlbGVjdGVkT3B0aW9uSXNIaWRkZW4uc29tZSgocmVjb3JkKSA9PiAhcmVjb3JkLmhpZGRlbik7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvblRleHQob3B0aW9uOiBzdHJpbmcgfCBJRGF0YVRhYmxlQ29sdW1uRmlsdGVyT3B0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBvcHRpb24udG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb3B0ID0gb3B0aW9uIGFzIElEYXRhVGFibGVDb2x1bW5GaWx0ZXJPcHRpb247XG4gICAgICByZXR1cm4gKG9wdC5sYWJlbC5sZW5ndGggPiAwID8gb3B0LmxhYmVsIDogb3B0LnZhbHVlKS50b1N0cmluZygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBwdWJsaWMgbXVsdGlTZWxlY3RPcHRpb25GaWx0ZXJIYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMubXVsdGlTZWxlY3QpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmRyb3Bkb3duLnBhbmVsT3BlbiAmJiBldmVudC5rZXkgPT09IEtleS5Fc2NhcGUpIHtcbiAgICAgICAgLy8gZXNjYXBlID0gY2xlYXIgdGV4dCBib3ggYW5kIGNsb3NlXG4gICAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5jbGVhck9wdGlvbkZpbHRlcigpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlUGFuZWwoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSBLZXkuRW50ZXIpIHtcbiAgICAgICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmZpbHRlck11bHRpU2VsZWN0KCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoZXZlbnQua2V5Q29kZSA+PSA2NSAmJiBldmVudC5rZXlDb2RlIDw9IDkwKSB8fFxuICAgICAgICAoZXZlbnQua2V5Q29kZSA+PSA5NiAmJiBldmVudC5rZXlDb2RlIDw9IDEwNSkgfHxcbiAgICAgICAgKGV2ZW50LmtleUNvZGUgPj0gNDggJiYgZXZlbnQua2V5Q29kZSA8PSA1NylcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wdGlvbkZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVFc2NhcGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICB0aGlzLmVycm9yID0gZmFsc2U7XG4gICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyT3B0aW9uRmlsdGVyKCkge1xuICAgIHRoaXMuZXJyb3IgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5vcHRpb25GaWx0ZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5vcHRpb25GaWx0ZXIgPSAnJztcbiAgICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbklzSGlkZGVuLmZvckVhY2goKHJlY29yZCkgPT4ge1xuICAgICAgICByZWNvcmQuaGlkZGVuID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhcnRSZXNpemUobW91c2VEb3duRXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBtb3VzZURvd25FdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG1pbmltdW1XaWR0aCA9IDYwICsgKHRoaXMuY29uZmlnLmZpbHRlcmFibGUgPyAzMCA6IDApICsgKHRoaXMuY29uZmlnLnNvcnRhYmxlID8gMzAgOiAwKTtcbiAgICBjb25zdCBzdGFydGluZ1dpZHRoOiBudW1iZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBjb25zdCBtb3VzZU1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3cuZG9jdW1lbnQsICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKG1pZGRsZU1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2VXaWR0aDogbnVtYmVyID0gbWlkZGxlTW91c2VFdmVudC5jbGllbnRYIC0gbW91c2VEb3duRXZlbnQuY2xpZW50WDtcbiAgICAgIGxldCB3aWR0aDogbnVtYmVyID0gc3RhcnRpbmdXaWR0aCArIGRpZmZlcmVuY2VXaWR0aDtcbiAgICAgIGlmICh3aWR0aCA8IG1pbmltdW1XaWR0aCkge1xuICAgICAgICB3aWR0aCA9IG1pbmltdW1XaWR0aDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0V2lkdGgod2lkdGgpXG4gICAgfSk7XG5cbiAgICBjb25zdCBtb3VzZVVwU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LmRvY3VtZW50LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBtb3VzZVVwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICBtb3VzZU1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobW91c2VNb3ZlU3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtb3VzZVVwU3Vic2NyaXB0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRXaWR0aCh3aWR0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY29sdW1uLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIGAke3dpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIGAke3dpZHRofXB4YCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7d2lkdGh9cHhgKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMucmVzaXplZC5uZXh0KHRoaXMuX2NvbHVtbik7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ3VzdG9tUmFuZ2UoZXZlbnQ6IEV2ZW50LCB2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNob3dDdXN0b21SYW5nZSA9IHZhbHVlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5kcm9wZG93bi5vcGVuUGFuZWwoKTsgLy8gRW5zdXJlcyB0aGF0IHRoZSBwYW5lbCBjb3JyZWN0bHkgdXBkYXRlcyB0byB0aGUgZHluYW1pYyBzaXplIG9mIHRoZSBkcm9wZG93blxuICB9XG5cbiAgcHVibGljIGZvY3VzSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlsdGVySW5wdXQgJiYgdGhpcy5maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubXVsdGlTZWxlY3QgJiYgdGhpcy5kcm9wZG93bikge1xuICAgICAgdGhpcy5kcm9wZG93bi5faGFuZGxlS2V5ZG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpU2VsZWN0T3B0aW9uRmlsdGVySGFuZGxlS2V5ZG93bihldmVudCk7XG4gICAgICB9O1xuICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB0aGlzLm9wdGlvbkZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSwgMCk7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzb3J0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoYW5nZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNoYW5nZVRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLmNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nZXROZXh0U29ydERpcmVjdGlvbih0aGlzLmRpcmVjdGlvbik7XG4gICAgICB0aGlzLl9zb3J0LnNvcnQodGhpcy5pZCwgdGhpcy5kaXJlY3Rpb24sIHRoaXMuY29uZmlnLnRyYW5zZm9ybXMuc29ydCk7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICBwdWJsaWMgZmlsdGVyRGF0YShmaWx0ZXI/OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgYWN0dWFsRmlsdGVyID0gTm92b0RhdGFUYWJsZUZpbHRlclV0aWxzLmNvbnN0cnVjdEZpbHRlcihmaWx0ZXIsIHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlLCB0aGlzLm11bHRpU2VsZWN0KTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHRoaXMuY29uZmlnLmZpbHRlckNvbmZpZy50eXBlID09PSAnZGF0ZScgJiYgZmlsdGVyID8gZmlsdGVyIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuYWN0aXZlRGF0ZUZpbHRlciA9IHNlbGVjdGVkT3B0aW9uID8gc2VsZWN0ZWRPcHRpb24ubGFiZWwgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGhpcy5jaGFuZ2VUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jaGFuZ2VUaW1lb3V0KTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChhY3R1YWxGaWx0ZXIgPT09ICcnKSB7XG4gICAgICAgIGFjdHVhbEZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NvcnQuZmlsdGVyKFxuICAgICAgICB0aGlzLmlkLFxuICAgICAgICB0aGlzLmNvbmZpZy5maWx0ZXJDb25maWcudHlwZSxcbiAgICAgICAgYWN0dWFsRmlsdGVyLFxuICAgICAgICB0aGlzLmNvbmZpZy50cmFuc2Zvcm1zLmZpbHRlcixcbiAgICAgICAgdGhpcy5hbGxvd011bHRpcGxlRmlsdGVycyxcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24sXG4gICAgICApO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgcHVibGljIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubXVsdGlTZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZURhdGVGaWx0ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJEYXRhKHVuZGVmaW5lZCk7XG4gICAgdGhpcy5jbGVhck9wdGlvbkZpbHRlcigpO1xuICAgIHRoaXMuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXh0U29ydERpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiAnYXNjJztcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIHJldHVybiAnZGVzYyc7XG4gICAgfVxuICAgIHJldHVybiAnYXNjJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdERhdGVGaWx0ZXJPcHRpb25zKCk6IElEYXRhVGFibGVDb2x1bW5GaWx0ZXJPcHRpb25bXSB7XG4gICAgY29uc3Qgb3B0czogSURhdGFUYWJsZUNvbHVtbkZpbHRlck9wdGlvbltdID0gW1xuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFEYXksIG1pbjogLTEsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDdEYXlzLCBtaW46IC03LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QzMERheXMsIG1pbjogLTMwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q5MERheXMsIG1pbjogLTkwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QxWWVhciwgbWluOiAtMzY2LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxRGF5LCBtaW46IDAsIG1heDogMSB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDdEYXlzLCBtaW46IDAsIG1heDogNyB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDMwRGF5cywgbWluOiAwLCBtYXg6IDMwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0OTBEYXlzLCBtaW46IDAsIG1heDogOTAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxWWVhciwgbWluOiAwLCBtYXg6IDM2NiB9LFxuICAgIF07XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cbn1cbiJdfQ==