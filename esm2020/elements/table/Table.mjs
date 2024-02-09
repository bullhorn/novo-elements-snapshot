// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// Vendor
import { startOfToday, startOfTomorrow } from 'date-fns';
import { debounceTime } from 'rxjs/operators';
// APP
import { CollectionEvent, NovoLabelService, PagedArrayCollection } from 'novo-elements/services';
import { DateUtil, Helpers, notify } from 'novo-elements/utils';
import { ControlFactory, FormUtils, ReadOnlyControl } from 'novo-elements/elements/form';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/form";
import * as i3 from "@angular/forms";
import * as i4 from "./extras/pagination/Pagination";
import * as i5 from "novo-elements/elements/loading";
import * as i6 from "novo-elements/elements/toast";
import * as i7 from "novo-elements/elements/button";
import * as i8 from "novo-elements/elements/checkbox";
import * as i9 from "novo-elements/elements/dropdown";
import * as i10 from "novo-elements/elements/common";
import * as i11 from "novo-elements/elements/icon";
import * as i12 from "novo-elements/elements/flex";
import * as i13 from "novo-elements/elements/date-picker";
import * as i14 from "./extras/table-cell/TableCell";
import * as i15 from "./extras/row-details/RowDetails";
import * as i16 from "@angular/common";
import * as i17 from "novo-elements/elements/tooltip";
import * as i18 from "./extras/th-orderable/ThOrderable";
import * as i19 from "./extras/th-sortable/ThSortable";
import * as i20 from "./extras/keep-filter-focus/KeepFilterFocus";
import * as i21 from "./extras/table-filter/TableFilter";
// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
export var NovoTableMode;
(function (NovoTableMode) {
    NovoTableMode[NovoTableMode["VIEW"] = 1] = "VIEW";
    NovoTableMode[NovoTableMode["EDIT"] = 2] = "EDIT";
})(NovoTableMode || (NovoTableMode = {}));
export class NovoTableElement {
    constructor(labels, formUtils, builder, cdr) {
        this.labels = labels;
        this.formUtils = formUtils;
        this.builder = builder;
        this.cdr = cdr;
        this.config = {};
        this.columns = [];
        this.skipSortAndFilterClear = false;
        this.mode = NovoTableMode.VIEW;
        this.editable = false;
        this.rowIdentifier = 'id';
        this.name = 'table';
        this.onRowClick = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onTableChange = new EventEmitter();
        this._rows = [];
        this.selected = [];
        this.activeId = 0;
        this.master = false;
        this.expandAll = false;
        this.indeterminate = false;
        this.lastPage = 0;
        this.selectedPageCount = 0;
        this.showSelectAllMessage = false;
        this.pagedData = [];
        // Map to keep track of what dropdowns are toggled
        // Used to properly *ngIf the <novo-optgroup> so that the keepFilterFocused Directive
        // will properly fire the ngAfterViewInit event
        this.toggledDropdownMap = {};
        this.NovoTableMode = NovoTableMode;
        this.tableForm = new FormGroup({});
        this.footers = [];
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        this.loading = false;
        notify('[Deprecated]: The table is deprecated. Please migrate to novo-data-tables!');
    }
    set rows(rows) {
        this.dataProvider = rows;
        if (rows && rows.length > 0) {
            this.setupColumnDefaults();
        }
        // this is a temporary/hacky fix until async dataloading is handled within the table
        if (!this.skipSortAndFilterClear) {
            this.clearAllSortAndFilters();
        }
    }
    get rows() {
        return this._rows;
    }
    set dataProvider(dp) {
        this._dataProvider = Array.isArray(dp) ? new PagedArrayCollection(dp) : dp;
        this._dataProvider.dataChange.pipe(debounceTime(100)).subscribe((event) => {
            switch (event.type) {
                case CollectionEvent.CHANGE:
                    this._rows = event.data;
                    // Setup form
                    this.tableForm = this.builder.group({
                        rows: this.builder.array([]),
                    });
                    // Remove all selection on sort change if selection is on
                    if (this.config.rowSelectionStyle === 'checkbox') {
                        this.pagedData = event.data;
                        this.pageSelected = this.pagedData.filter((r) => r._selected);
                        this.rowSelectHandler();
                    }
                    // Find that columns we might need to sum up via the footer
                    let columnsToSum = [];
                    const columnSums = {};
                    if (this.config.footers) {
                        this.config.footers.forEach((config) => {
                            columnsToSum.push(...config.columns);
                        });
                        // Only have unique columns, filter out duplicates
                        columnsToSum = columnsToSum.filter((item, index, array) => array.indexOf(item) === index);
                    }
                    // Make a form for each row
                    const tableFormRows = this.tableForm.controls.rows;
                    this._rows.forEach((row, index) => {
                        const rowControls = [];
                        row.controls = {};
                        row._editing = {};
                        row._expanded = this.config.expandAll;
                        row.rowId = this._rows.length;
                        this.columns.forEach((column) => {
                            // Use the control passed or use a ReadOnlyControl so that the form has the values
                            const control = column.editorConfig
                                ? ControlFactory.create(column.editorType, column.editorConfig)
                                : new ReadOnlyControl({ key: column.name });
                            row.controls[column.name] = control;
                            rowControls.push(control);
                        });
                        this.formUtils.setInitialValues(rowControls, row, false);
                        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
                        // Setup the total footer if configured
                        // Array of keys to total
                        if (columnsToSum.length !== 0) {
                            columnsToSum.forEach((column) => {
                                if (Helpers.isBlank(columnSums[column])) {
                                    columnSums[column] = 0;
                                }
                                columnSums[column] += row[column];
                            });
                        }
                    });
                    if (this.mode === NovoTableMode.EDIT) {
                        this.setTableEdit();
                    }
                    // Setup the footers (if any)
                    if (this.config.footers) {
                        this.footers = [];
                        this.config.footers.forEach((footerConfig, footerConfigIndex) => {
                            const footer = {};
                            footer[footerConfig.labelColumn] = footerConfig.label;
                            footerConfig.columns.forEach((column) => {
                                if (footerConfig.method === 'AVG' && this._rows.length !== 0) {
                                    footer[column] = columnSums[column] / this._rows.length;
                                }
                                else {
                                    footer[column] = columnSums[column];
                                }
                            });
                            this.footers.push(footer);
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        if (this.config.paging) {
            this._dataProvider.page = this.config.paging.current;
            this._dataProvider.pageSize = this.config.paging.itemsPerPage;
        }
        else {
            // Paging turned off, return basically all of the data
            this._dataProvider.page = 1;
            this._dataProvider.pageSize = 500;
        }
        if (dp && dp.length > 0) {
            this.setupColumnDefaults();
        }
        this._dataProvider.refresh();
    }
    get dataProvider() {
        return this._dataProvider;
    }
    get editing() {
        return this.mode === NovoTableMode.EDIT;
    }
    get formValue() {
        return this.tableForm.getRawValue();
    }
    onDropdownToggled(event, column) {
        this.toggledDropdownMap[column] = event;
        this.cdr.markForCheck();
    }
    focusInput() {
        if (this.filterInputs && this.filterInputs.length) {
            this.filterInputs.forEach((filterInput) => {
                if (filterInput.nativeElement) {
                    setTimeout(() => filterInput.nativeElement.focus(), 0);
                }
            });
        }
    }
    onPageChange(event) {
        // this.dataProvider.page = event.page;
        // this.dataProvider.pageSize = event.itemsPerPage;
    }
    getOptionDataAutomationId(option) {
        if (!Helpers.isBlank(option.value)) {
            return option.value;
        }
        return option;
    }
    setupColumnDefaults() {
        // Check columns for cell option types
        this.columns.forEach((column) => {
            if (column && column.type) {
                switch (column.type) {
                    case 'date':
                        // Set options based on dates if there are none
                        column.options = column.options || this.getDefaultOptions(column);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    ngDoCheck() {
        if (this.config.paging && this.config.paging.current !== this.lastPage) {
            this.rowSelectHandler();
            this.showSelectAllMessage = false;
        }
        this.lastPage = this.config.paging ? this.config.paging.current : 1;
    }
    getPageStart() {
        return this.config.paging ? (this.dataProvider.page - 1) * this.dataProvider.pageSize : 0;
    }
    getPageEnd() {
        return this.config.paging && this.dataProvider.pageSize > -1 ? this.getPageStart() + this.dataProvider.pageSize : this.rows.length;
    }
    getRowControlForm(i) {
        const tableFormRows = this.tableForm.controls.rows;
        return tableFormRows.controls[i];
    }
    onFilterClick(column, filter) {
        if (filter.range && !column.calendarShow) {
            column.calenderShow = true;
            return;
        }
        if (Array.isArray(column.filter) && column.multiple) {
            if (~column.filter.indexOf(filter)) {
                // Remove filter
                column.filter.splice(column.filter.indexOf(filter), 1);
                if (filter.range) {
                    column.calenderShow = false;
                }
                if (column.filter.length === 0) {
                    column.filter = null;
                }
            }
            else {
                // Add filter
                column.filter.push(filter);
            }
        }
        else if (column.multiple) {
            column.filter = new Array();
            column.filter.push(Helpers.isBlank(filter.value) ? filter : filter.value);
        }
        else {
            column.filter = Helpers.isBlank(filter.value) ? filter : filter.value;
        }
        this.onFilterChange();
    }
    onFilterClear(column) {
        setTimeout(() => {
            column.filter = null;
            column.freetextFilter = null;
            this.onFilterChange();
            if (column.originalOptions) {
                column.options = column.originalOptions;
            }
        });
    }
    clearAllSortAndFilters() {
        if (this.config.filtering) {
            this.columns.forEach((column) => {
                column.filter = null;
                column.sort = null;
            });
        }
    }
    /**
     * @description This method updates the row data to reflect the active filters.
     */
    onFilterChange(event) {
        if (this.config.filtering) {
            // Array of filters
            const filters = this.columns.filter((col) => !Helpers.isEmpty(col.filter));
            if (filters.length) {
                let query = {};
                for (const column of filters) {
                    if (Helpers.isFunction(column.match)) {
                        query[column.name] = (value, record) => {
                            return column.match(record, column.filter);
                        };
                    }
                    else if (column.preFilter && Helpers.isFunction(column.preFilter)) {
                        query = Object.assign({}, query, column.preFilter(this.escapeCharacters(column.filter)));
                    }
                    else if (Array.isArray(column.filter)) {
                        // The filters are an array (multi-select), check value
                        let options = column.filter;
                        // We have an array of {value: '', labels: ''}
                        if (options[0].value || options[0].label) {
                            options = column.filter.map((opt) => opt.value);
                        }
                        query[column.name] = { any: options };
                    }
                    else if (column.type && column.type === 'date') {
                        if (column.filter.startDate && column.filter.endDate) {
                            query[column.name] = {
                                min: DateUtil.startOfDay(column.filter.startDate),
                                max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(column.filter.endDate), 1)),
                            };
                        }
                        else {
                            query[column.name] = {
                                min: column.filter.min ? DateUtil.addDays(startOfToday(), column.filter.min) : startOfToday(),
                                max: column.filter.max ? DateUtil.addDays(startOfTomorrow(), column.filter.max) : startOfTomorrow(),
                            };
                        }
                    }
                    else {
                        query[column.name] = column.filter;
                    }
                }
                if (Helpers.isFunction(this.config.filtering)) {
                    this.config.filtering(query);
                }
                else {
                    this._dataProvider.filter = query;
                }
            }
            else {
                this._dataProvider.filter = {};
            }
            // Trickle down to keep sort
            // this.onSortChange(this.currentSortColumn);
            this.fireTableChangeEvent();
            // If paging, reset page
            if (this.config.paging) {
                this.config.paging.current = 1;
            }
            // Remove all selection on sort change if selection is on
            if (this.config.rowSelectionStyle === 'checkbox') {
                this.selectAll(false);
            }
        }
    }
    escapeCharacters(filter) {
        if (typeof filter === 'string') {
            return filter.replace(/'/g, "''");
        }
        return filter;
    }
    isFilterActive(column, filter) {
        // TODO: This needs to be refactored
        let isActive = false;
        if (column && !Helpers.isBlank(column.filter) && !Helpers.isBlank(filter)) {
            if (Array.isArray(column.filter)) {
                if (typeof filter !== 'string') {
                    isActive = column.filter.some((item) => {
                        return item.label === filter.label;
                    });
                }
                else {
                    isActive = column.filter.includes(filter);
                }
            }
            else {
                if (typeof column.filter === typeof filter) {
                    isActive = column.filter === filter;
                }
                else {
                    isActive = column.filter === filter.value;
                }
            }
        }
        return isActive;
    }
    onSortChange(column) {
        this.currentSortColumn = column;
        const sortedColumns = this.columns.filter((thisColumn) => {
            return thisColumn.sort && thisColumn !== this.currentSortColumn;
        });
        for (const sortedColumn of sortedColumns) {
            sortedColumn.sort = null;
        }
        if (column) {
            if (Helpers.isFunction(this.config.sorting)) {
                this.config.sorting();
            }
            else if (Helpers.isFunction(column.preSort)) {
                this._dataProvider.sort = [].concat(column.preSort(column));
            }
            else {
                this._dataProvider.sort = [{ field: column.compare || column.name, reverse: column.sort === 'desc' }];
            }
        }
        // Fire table change event
        // this.fireTableChangeEvent();
        // If paging, reset page
        if (this.config.paging) {
            this.config.paging.current = 1;
        }
        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.selectAll(false);
        }
    }
    fireTableChangeEvent() {
        // Construct a table change object
        const onTableChange = {};
        const filters = this.columns.filter((col) => col.filter && col.filter.length);
        onTableChange.filter = filters.length ? filters : false;
        onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
        onTableChange.rows = this.rows;
        // Emit event
        this.onTableChange.emit(onTableChange);
    }
    findColumnIndex(value) {
        for (let i = 0; i < this.columns.length; i += 1) {
            if (this.columns[i].name === value) {
                return i;
            }
        }
        return null;
    }
    onOrderChange(event) {
        const oldIndex = this.findColumnIndex(event.first.name);
        const newIndex = this.findColumnIndex(event.second.name);
        this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
        this.onSortChange(this.currentSortColumn);
    }
    expandAllOnPage(expanded) {
        this.config.expandAll = !expanded;
        for (const row of this.dataProvider.list) {
            row._expanded = this.config.expandAll;
        }
    }
    selectPage(data) {
        if (!this.master) {
            this.selectAll(false);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
            this.showSelectAllMessage = false;
        }
        else {
            this.indeterminate = false;
            // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            for (const row of this.pagedData) {
                row._selected = this.master;
            }
            this.selected = this.dataProvider.list.filter((r) => r._selected);
            this.pageSelected = this.pagedData.filter((r) => r._selected);
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.dataProvider.total;
        }
        this.cdr.detectChanges();
    }
    selectAll(value) {
        this.master = value;
        this.indeterminate = false;
        for (const row of this.dataProvider.list) {
            row._selected = value;
        }
        this.selected = value ? this.dataProvider.list : [];
        this.showSelectAllMessage = false;
        this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        this.rowSelectHandler();
    }
    rowSelectHandler(data) {
        // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter((r) => r._selected);
        this.selected = this.dataProvider.list.filter((r) => r._selected);
        if (this.pageSelected.length === 0) {
            this.master = false;
            this.indeterminate = false;
        }
        else if (this.pageSelected.length === this.pagedData.length) {
            this.master = true;
            this.indeterminate = false;
        }
        else {
            this.master = false;
            this.indeterminate = true;
            // Breaking the selected page count
            this.showSelectAllMessage = false;
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        }
        this.emitSelected(this.selected);
    }
    emitSelected(selected) {
        this.onRowSelect.emit({ length: selected.length, selected });
    }
    rowClickHandler(row) {
        if (this.config.rowSelect) {
            this.activeId = row.id || 0;
            this.onRowClick.emit(row);
        }
    }
    getDefaultOptions(column) {
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/elements/issues/116
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
        if (column && column.range) {
            opts.push({
                label: this.labels.customDateRange,
                range: true,
            });
        }
        return opts;
    }
    onCalenderSelect(column, event) {
        setTimeout(() => {
            if (event.startDate && event.endDate) {
                this.onFilterChange();
            }
        }, 10);
    }
    onFilterKeywords(config) {
        if (config && config.filtering && config.filtering.freetextFilter) {
            const filterKeywords = config.filtering.freetextFilter.toLowerCase();
            if (!config.filtering.originalOptions) {
                config.filtering.originalOptions = config.filtering.options;
            }
            const newOptions = config.filtering.originalOptions.filter((option) => {
                let value = option && option.label ? option.label : option;
                value = value.toLowerCase() ? value.toLowerCase() : value;
                if (value === filterKeywords) {
                    return true;
                }
                else if (~value.indexOf(filterKeywords) || ~value.indexOf(filterKeywords)) {
                    return true;
                }
                return false;
            });
            config.filtering.options = newOptions;
            config.filtering.filter = config.filtering.freetextFilter;
        }
        else {
            config.filtering.options = config.filtering.originalOptions;
        }
        this.onFilterChange();
    }
    /**
     * @description Sets the Table into EDIT mode, based on the row/column passed you can enter in a few states
     * (1) setTableEdit() - don't pass any to put the FULL table into edit mode
     * (2) setTableEdit(1) - pass only row to put that FULL row of the table into edit mode
     * (3) setTableEdit(1, 1) - pass row and column to put that column of the row of the table into edit mode
     * @memberOf NovoTableElement
     */
    setTableEdit(rowNumber, columnNumber) {
        this.mode = NovoTableMode.EDIT;
        this._dataProvider.edit();
        this._rows.forEach((row, rowIndex) => {
            row._editing = row._editing || {};
            this.columns.forEach((column, columnIndex) => {
                if (column.viewOnly) {
                    row._editing[column.name] = false;
                }
                else if (Helpers.isEmpty(rowNumber) && Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers.isEmpty(rowNumber) && rowIndex === Number(rowNumber) && Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers.isEmpty(rowNumber) &&
                    !Helpers.isEmpty(columnNumber) &&
                    rowIndex === Number(rowNumber) &&
                    columnIndex === Number(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else {
                    row._editing[column.name] = false;
                }
            });
        });
    }
    /**
     * @description Leaves edit mode for the Table and puts everything back to VIEW only
     * @memberOf NovoTableElement
     * @param cancel - whether or not to save data or undo
     */
    leaveEditMode(cancel) {
        this.mode = NovoTableMode.VIEW;
        this._rows.forEach((row) => {
            row._editing = row._editing || {};
            this.columns.forEach((column) => {
                row._editing[column.name] = false;
            });
        });
        if (cancel) {
            this._dataProvider.undo();
        }
        else {
            this._dataProvider.commit();
        }
        this.hideToastMessage();
    }
    /**
     * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
     * @memberOf NovoTableElement
     */
    addEditableRow(defaultValue = {}) {
        const tableFormRows = this.tableForm.controls.rows;
        const row = {};
        const rowControls = [];
        row.controls = {};
        row._editing = {};
        row.rowId = this._rows.length + 1;
        this.columns.forEach((column) => {
            // Use the control passed or use a ReadOnlyControl so that the form has the values
            const control = column.editorConfig
                ? ControlFactory.create(column.editorType, column.editorConfig)
                : new ReadOnlyControl({ key: column.name });
            control.value = null; // remove copied column value
            row.controls[column.name] = control;
            row._editing[column.name] = !column.viewOnly;
            rowControls.push(control);
        });
        this.formUtils.setInitialValues(rowControls, defaultValue, false);
        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
        this._rows.push(row);
    }
    /**
     * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
     * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
     * { id: ID_OF_RECORD, key: value } -- data that was updated
     * { id: undefined, key: value } -- data that was added
     * @memberOf NovoTableElement
     */
    validateAndGetUpdatedData() {
        if (this.tableForm && this.tableForm.controls && this.tableForm.controls.rows) {
            const changedRows = [];
            const errors = [];
            // Go over the FormArray's controls
            this.tableForm.controls.rows.controls.forEach((formGroup, index) => {
                let changedRow = null;
                let error = null;
                // Go over the form group controls
                Object.keys(formGroup.controls).forEach((key) => {
                    const control = formGroup.controls[key];
                    // Handle value changing
                    if (control && control.dirty && !control.errors) {
                        if (!changedRow) {
                            // Append the ID, so we have some key to save against
                            changedRow = {};
                            if (this._rows[index].id) {
                                changedRow.id = this._rows[index].id;
                            }
                        }
                        // If dirty, grab value off the form
                        changedRow[key] = this.tableForm.getRawValue().rows[index][key];
                        // Set value back to row (should be already done via the server call, but do it anyway)
                        this._rows[index][key] = changedRow[key];
                    }
                    else if (control && control.errors) {
                        // Handle errors
                        if (!error) {
                            error = {};
                        }
                        error[key] = control.errors;
                        control.markAsDirty();
                        control.markAsTouched();
                    }
                });
                if (changedRow) {
                    changedRows.push(changedRow);
                }
                if (error) {
                    errors.push({ errors: error, row: this._rows[index], index });
                }
            });
            // Return errors if any, otherwise return the changed rows
            if (errors.length === 0) {
                return { changed: changedRows };
            }
            return { errors };
        }
    }
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    cancelEditing() {
        this.leaveEditMode(true);
    }
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    saveChanges() {
        this.leaveEditMode(false);
    }
    /**
     * @description Displays a toast message inside of the table
     * @memberOf NovoTableElement
     */
    displayToastMessage(toast, hideDelay) {
        this.loading = false;
        this.toast = toast;
        if (hideDelay) {
            setTimeout(() => this.hideToastMessage(), hideDelay);
        }
    }
    /**
     * @description Force hide the toast message
     * @memberOf NovoTableElement
     */
    hideToastMessage() {
        this.toast = null;
        // Hack to make the table display properly after hiding the toast
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = true;
        setTimeout(() => {
            this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        });
    }
    /**
     * @description display the loading overlay on the table
     * @memberOf NovoTableElement
     */
    toggleLoading(show) {
        this.loading = show;
    }
    /**
     * @description hide a column in edit or view mode
     * @memberOf NovoTableElement
     */
    isColumnHidden(column) {
        return this.editing ? !!column.hideColumnOnEdit : !!column.hideColumnOnView;
    }
}
NovoTableElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableElement, deps: [{ token: i1.NovoLabelService }, { token: i2.FormUtils }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTableElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTableElement, selector: "novo-table", inputs: { config: "config", columns: "columns", theme: "theme", skipSortAndFilterClear: "skipSortAndFilterClear", mode: "mode", editable: "editable", rowIdentifier: "rowIdentifier", name: "name", rows: "rows", dataProvider: "dataProvider" }, outputs: { onRowClick: "onRowClick", onRowSelect: "onRowSelect", onTableChange: "onTableChange" }, host: { properties: { "attr.theme": "theme", "class.editing": "mode === NovoTableMode.EDIT", "class.novo-table-loading": "loading" }, classAttribute: "novo-table" }, viewQueries: [{ propertyName: "filterInputs", predicate: ["filterInput"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <header *ngIf="columns.length">
      <ng-content select="novo-table-header"></ng-content>
      <div class="header-actions">
        <novo-pagination
          *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
          [rowOptions]="config.paging.rowOptions"
          [disablePageSelection]="config.paging.disablePageSelection"
          [(page)]="dataProvider.page"
          [(itemsPerPage)]="dataProvider.pageSize"
          [totalItems]="dataProvider.total"
          (onPageChange)="onPageChange($event)"
        >
        </novo-pagination>
        <ng-content select="novo-table-actions"></ng-content>
      </div>
    </header>
    <div class="novo-table-loading-overlay" *ngIf="loading || dataProvider.isLoading()">
      <novo-loading></novo-loading>
    </div>
    <novo-toast *ngIf="toast" [theme]="toast?.theme" [icon]="toast?.icon" [message]="toast?.message"></novo-toast>
    <div class="table-container" *ngIf="!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast">
      <novo-form hideHeader="true" [form]="$any(tableForm)">
        <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
          <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
          <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)">
            <tr role="row">
              <!-- DETAILS -->
              <th class="row-actions" *ngIf="config.hasDetails">
                <novo-button
                  theme="icon"
                  icon="next"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="!config.expandAll"
                  data-automation-id="expand-all"
                ></novo-button>
                <novo-button
                  theme="icon"
                  icon="sort-desc"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="config.expandAll"
                  data-automation-id="collapse-all"
                ></novo-button>
              </th>
              <!-- CHECKBOX -->
              <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                <novo-checkbox
                  [(ngModel)]="master"
                  [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length"
                  (ngModelChange)="selectPage($event)"
                  data-automation-id="select-all-checkbox"
                  [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage"
                  tooltipPosition="right"
                ></novo-checkbox>
              </th>
              <!-- TABLE HEADERS -->
              <th
                *ngFor="let column of columns"
                [ngClass]="{
                  'mass-action': config?.rowSelectionStyle === 'checkbox',
                  actions: column?.actions?.items?.length > 0,
                  preview: column?.name === 'preview'
                }"
                [novoThOrderable]="column"
                (onOrderChange)="onOrderChange($event)"
                [hidden]="isColumnHidden(column)"
              >
                <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                  <!-- LABEL & SORT ARROWS -->
                  <div
                    class="th-title"
                    [ngClass]="config.sorting !== false && column.sorting !== false ? 'sortable' : ''"
                    [novoThSortable]="config"
                    [column]="column"
                    (onSortChange)="onSortChange($event)"
                  >
                    <label>{{ column.title || column.label }}</label>
                    <div
                      class="table-sort-icons"
                      tooltipPosition="bottom"
                      [tooltip]="labels.sort"
                      [ngClass]="column.sort || ''"
                      *ngIf="config.sorting !== false && column.sorting !== false"
                    >
                      <i class="bhi-arrow-up"></i>
                      <i class="bhi-arrow-down"></i>
                    </div>
                  </div>
                  <!-- FILTER DROP-DOWN -->
                  <novo-dropdown
                    side="default"
                    *ngIf="config.filtering !== false && column.filtering !== false"
                    class="column-filters"
                    (toggled)="onDropdownToggled($event, column.name)"
                    parentScrollSelector=".table-container"
                    containerClass="table-dropdown"
                  >
                    <novo-button
                      type="button"
                      theme="icon"
                      icon="filter"
                      tooltipPosition="bottom"
                      [tooltip]="labels.filters"
                      [class.filtered]="column.filter || column.filter === false"
                      (click)="focusInput()"
                    ></novo-button>
                    <!-- FILTER OPTIONS LIST -->
                    <novo-optgroup
                      *ngIf="
                        (column?.options?.length || column?.originalOptions?.length) &&
                        column?.type !== 'date' &&
                        toggledDropdownMap[column.name]
                      "
                    >
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button
                            theme="dialogue"
                            color="negative"
                            icon="times"
                            (click)="onFilterClear(column)"
                            *ngIf="column.filter || column.filter === false"
                          >
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          *ngIf="!!column.allowCustomTextOption"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterKeywords($event)"
                          [(ngModel)]="column.freetextFilter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                      <novo-option
                        [ngClass]="{ active: isFilterActive(column, option) }"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [attr.data-automation-id]="getOptionDataAutomationId(option)"
                      >
                        <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER SEARCH INPUT -->
                    <novo-optgroup *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterChange($event)"
                          [(ngModel)]="column.filter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER DATE OPTIONS -->
                    <novo-optgroup *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" *ngIf="!column.calenderShow" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                      </novo-option>
                      <novo-option
                        [class.active]="isFilterActive(column, option)"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [keepOpen]="option.range"
                        [hidden]="column.calenderShow"
                        [attr.data-automation-id]="option?.label || option"
                      >
                        {{ option?.label || option }}
                        <novo-icon novoSuffix color="positive" *ngIf="isFilterActive(column, option)">check</novo-icon>
                      </novo-option>
                      <novo-option class="calendar-container" *ngIf="column.calenderShow" keepOpen novoInert>
                        <novo-stack>
                          <div class="back-link" (click)="column.calenderShow = false">
                            <i class="bhi-previous"></i>{{ labels.backToPresetFilters }}
                          </div>
                          <novo-date-picker
                            (onSelect)="onCalenderSelect(column, $event)"
                            [(ngModel)]="column.filter"
                            mode="range"
                          ></novo-date-picker>
                        </novo-stack>
                      </novo-option>
                    </novo-optgroup>
                  </novo-dropdown>
                </div>
              </th>
            </tr>
          </thead>
          <!-- TABLE DATA -->
          <tbody *ngIf="!dataProvider.isEmpty() || editing">
            <tr
              class="table-selection-row"
              *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled"
              data-automation-id="table-selection-row"
            >
              <td colspan="100%">
                {{ labels.selectedRecords(selected.length) }}
                <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{ labels.totalRecords(dataProvider.total) }}</a>
              </td>
            </tr>
            <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
              <tr
                class="table-row"
                [ngClass]="row.customClass || ''"
                [id]="name + '-' + row[rowIdentifier]"
                [attr.data-automation-id]="row.id"
                (click)="rowClickHandler(row)"
                [class.active]="row.id === activeId"
              >
                <td class="row-actions" *ngIf="config.hasDetails">
                  <novo-button theme="icon" icon="next" (click)="row._expanded = !row._expanded" *ngIf="!row._expanded"></novo-button>
                  <novo-button theme="icon" icon="sort-desc" (click)="row._expanded = !row._expanded" *ngIf="row._expanded"></novo-button>
                </td>
                <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                  <novo-checkbox
                    [(ngModel)]="row._selected"
                    (ngModelChange)="rowSelectHandler(row)"
                    data-automation-id="select-row-checkbox"
                  ></novo-checkbox>
                </td>
                <td
                  *ngFor="let column of columns"
                  [attr.data-automation-id]="column.id || column.name"
                  [class.novo-form-row]="editable"
                  [hidden]="isColumnHidden(column)"
                >
                  <novo-table-cell
                    *ngIf="row._editing && !row._editing[column.name]"
                    [hasEditor]="editable"
                    [column]="column"
                    [row]="row"
                    [form]="$any(getRowControlForm(i))"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    [condensed]="true"
                    [form]="getRowControlForm(i)"
                    [control]="row.controls[column.name]"
                  ></novo-control>
                </td>
              </tr>
              <tr
                class="details-row"
                *ngIf="config.hasDetails"
                [hidden]="!row._expanded"
                [attr.data-automation-id]="'details-row-' + row.id"
              >
                <td class="row-actions"></td>
                <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? columns.length + 1 : columns.length">
                  <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                </td>
              </tr>
            </ng-template>
          </tbody>
          <!-- NO TABLE DATA PLACEHOLDER -->
          <tbody
            class="table-message"
            *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing"
            data-automation-id="empty-table"
          >
            <tr>
              <td colspan="100%">
                <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- NO MATCHING RECORDS -->
          <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
            <tr>
              <td colspan="100%">
                <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- TABLE DATA ERROR PLACEHOLDER -->
          <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
            <tr>
              <td colspan="100%">
                <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                  <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot *ngIf="!config.footers" [ngClass]="dataProvider.length % 2 == 0 ? 'odd' : 'even'">
            <tr>
              <td colspan="100%">
                <ng-content select="novo-table-footer"></ng-content>
              </td>
            </tr>
          </tfoot>
          <tfoot *ngFor="let footer of footers; let i = index" class="novo-table-total-footer">
            <tr>
              <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">
                {{ footer[column.name] }}
              </td>
            </tr>
          </tfoot>
        </table>
      </novo-form>
    </div>
  `, isInline: true, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.07);z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:rgba(74,137,220,.2)}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#ffffff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:auto;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n + 2),.table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000000;color:#fff}novo-table[theme=black]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#ffffff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#3399dd;color:#fff}novo-table[theme=company]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#44bb77;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#aa6699;color:#fff}novo-table[theme=lead]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#ffaa44;color:#fff}novo-table[theme=contact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#ffaa44;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#662255;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#bb5566;color:#fff}novo-table[theme=job]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#bb5566;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"], components: [{ type: i4.Pagination, selector: "novo-pagination", inputs: ["page", "totalItems", "itemsPerPage", "rowOptions", "label", "disablePageSelection"], outputs: ["pageChange", "itemsPerPageChange", "onPageChange"] }, { type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i6.NovoToastElement, selector: "novo-toast", inputs: ["appearance", "theme", "icon", "title", "action", "hasDialogue", "link", "isCloseable", "message"], outputs: ["closed"] }, { type: i2.NovoFormElement, selector: "novo-form", inputs: ["form", "layout", "hideHeader"] }, { type: i7.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i8.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i9.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { type: i10.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i10.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i11.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i12.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i13.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { type: i14.TableCell, selector: "novo-table-cell", inputs: ["column", "row", "form", "hasEditor"] }, { type: i2.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { type: i15.RowDetails, selector: "novo-row-details", inputs: ["data", "renderer"] }], directives: [{ type: i16.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i17.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i16.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i16.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i18.ThOrderable, selector: "[novoThOrderable]", inputs: ["novoThOrderable"], outputs: ["onOrderChange"] }, { type: i19.ThSortable, selector: "[novoThSortable]", inputs: ["novoThSortable", "column"], outputs: ["onSortChange"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i20.NovoTableKeepFilterFocus, selector: "[keepFilterFocused]" }, { type: i21.TableFilter, selector: "[novoTableFilter]", inputs: ["novoTableFilter"], outputs: ["onFilterChange"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTableElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-table', host: {
                        class: 'novo-table',
                        '[attr.theme]': 'theme',
                        '[class.editing]': 'mode === NovoTableMode.EDIT',
                        '[class.novo-table-loading]': 'loading',
                    }, template: `
    <header *ngIf="columns.length">
      <ng-content select="novo-table-header"></ng-content>
      <div class="header-actions">
        <novo-pagination
          *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
          [rowOptions]="config.paging.rowOptions"
          [disablePageSelection]="config.paging.disablePageSelection"
          [(page)]="dataProvider.page"
          [(itemsPerPage)]="dataProvider.pageSize"
          [totalItems]="dataProvider.total"
          (onPageChange)="onPageChange($event)"
        >
        </novo-pagination>
        <ng-content select="novo-table-actions"></ng-content>
      </div>
    </header>
    <div class="novo-table-loading-overlay" *ngIf="loading || dataProvider.isLoading()">
      <novo-loading></novo-loading>
    </div>
    <novo-toast *ngIf="toast" [theme]="toast?.theme" [icon]="toast?.icon" [message]="toast?.message"></novo-toast>
    <div class="table-container" *ngIf="!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast">
      <novo-form hideHeader="true" [form]="$any(tableForm)">
        <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
          <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
          <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)">
            <tr role="row">
              <!-- DETAILS -->
              <th class="row-actions" *ngIf="config.hasDetails">
                <novo-button
                  theme="icon"
                  icon="next"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="!config.expandAll"
                  data-automation-id="expand-all"
                ></novo-button>
                <novo-button
                  theme="icon"
                  icon="sort-desc"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="config.expandAll"
                  data-automation-id="collapse-all"
                ></novo-button>
              </th>
              <!-- CHECKBOX -->
              <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                <novo-checkbox
                  [(ngModel)]="master"
                  [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length"
                  (ngModelChange)="selectPage($event)"
                  data-automation-id="select-all-checkbox"
                  [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage"
                  tooltipPosition="right"
                ></novo-checkbox>
              </th>
              <!-- TABLE HEADERS -->
              <th
                *ngFor="let column of columns"
                [ngClass]="{
                  'mass-action': config?.rowSelectionStyle === 'checkbox',
                  actions: column?.actions?.items?.length > 0,
                  preview: column?.name === 'preview'
                }"
                [novoThOrderable]="column"
                (onOrderChange)="onOrderChange($event)"
                [hidden]="isColumnHidden(column)"
              >
                <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                  <!-- LABEL & SORT ARROWS -->
                  <div
                    class="th-title"
                    [ngClass]="config.sorting !== false && column.sorting !== false ? 'sortable' : ''"
                    [novoThSortable]="config"
                    [column]="column"
                    (onSortChange)="onSortChange($event)"
                  >
                    <label>{{ column.title || column.label }}</label>
                    <div
                      class="table-sort-icons"
                      tooltipPosition="bottom"
                      [tooltip]="labels.sort"
                      [ngClass]="column.sort || ''"
                      *ngIf="config.sorting !== false && column.sorting !== false"
                    >
                      <i class="bhi-arrow-up"></i>
                      <i class="bhi-arrow-down"></i>
                    </div>
                  </div>
                  <!-- FILTER DROP-DOWN -->
                  <novo-dropdown
                    side="default"
                    *ngIf="config.filtering !== false && column.filtering !== false"
                    class="column-filters"
                    (toggled)="onDropdownToggled($event, column.name)"
                    parentScrollSelector=".table-container"
                    containerClass="table-dropdown"
                  >
                    <novo-button
                      type="button"
                      theme="icon"
                      icon="filter"
                      tooltipPosition="bottom"
                      [tooltip]="labels.filters"
                      [class.filtered]="column.filter || column.filter === false"
                      (click)="focusInput()"
                    ></novo-button>
                    <!-- FILTER OPTIONS LIST -->
                    <novo-optgroup
                      *ngIf="
                        (column?.options?.length || column?.originalOptions?.length) &&
                        column?.type !== 'date' &&
                        toggledDropdownMap[column.name]
                      "
                    >
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button
                            theme="dialogue"
                            color="negative"
                            icon="times"
                            (click)="onFilterClear(column)"
                            *ngIf="column.filter || column.filter === false"
                          >
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          *ngIf="!!column.allowCustomTextOption"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterKeywords($event)"
                          [(ngModel)]="column.freetextFilter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                      <novo-option
                        [ngClass]="{ active: isFilterActive(column, option) }"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [attr.data-automation-id]="getOptionDataAutomationId(option)"
                      >
                        <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER SEARCH INPUT -->
                    <novo-optgroup *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterChange($event)"
                          [(ngModel)]="column.filter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER DATE OPTIONS -->
                    <novo-optgroup *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" *ngIf="!column.calenderShow" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                      </novo-option>
                      <novo-option
                        [class.active]="isFilterActive(column, option)"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [keepOpen]="option.range"
                        [hidden]="column.calenderShow"
                        [attr.data-automation-id]="option?.label || option"
                      >
                        {{ option?.label || option }}
                        <novo-icon novoSuffix color="positive" *ngIf="isFilterActive(column, option)">check</novo-icon>
                      </novo-option>
                      <novo-option class="calendar-container" *ngIf="column.calenderShow" keepOpen novoInert>
                        <novo-stack>
                          <div class="back-link" (click)="column.calenderShow = false">
                            <i class="bhi-previous"></i>{{ labels.backToPresetFilters }}
                          </div>
                          <novo-date-picker
                            (onSelect)="onCalenderSelect(column, $event)"
                            [(ngModel)]="column.filter"
                            mode="range"
                          ></novo-date-picker>
                        </novo-stack>
                      </novo-option>
                    </novo-optgroup>
                  </novo-dropdown>
                </div>
              </th>
            </tr>
          </thead>
          <!-- TABLE DATA -->
          <tbody *ngIf="!dataProvider.isEmpty() || editing">
            <tr
              class="table-selection-row"
              *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled"
              data-automation-id="table-selection-row"
            >
              <td colspan="100%">
                {{ labels.selectedRecords(selected.length) }}
                <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{ labels.totalRecords(dataProvider.total) }}</a>
              </td>
            </tr>
            <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
              <tr
                class="table-row"
                [ngClass]="row.customClass || ''"
                [id]="name + '-' + row[rowIdentifier]"
                [attr.data-automation-id]="row.id"
                (click)="rowClickHandler(row)"
                [class.active]="row.id === activeId"
              >
                <td class="row-actions" *ngIf="config.hasDetails">
                  <novo-button theme="icon" icon="next" (click)="row._expanded = !row._expanded" *ngIf="!row._expanded"></novo-button>
                  <novo-button theme="icon" icon="sort-desc" (click)="row._expanded = !row._expanded" *ngIf="row._expanded"></novo-button>
                </td>
                <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                  <novo-checkbox
                    [(ngModel)]="row._selected"
                    (ngModelChange)="rowSelectHandler(row)"
                    data-automation-id="select-row-checkbox"
                  ></novo-checkbox>
                </td>
                <td
                  *ngFor="let column of columns"
                  [attr.data-automation-id]="column.id || column.name"
                  [class.novo-form-row]="editable"
                  [hidden]="isColumnHidden(column)"
                >
                  <novo-table-cell
                    *ngIf="row._editing && !row._editing[column.name]"
                    [hasEditor]="editable"
                    [column]="column"
                    [row]="row"
                    [form]="$any(getRowControlForm(i))"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    [condensed]="true"
                    [form]="getRowControlForm(i)"
                    [control]="row.controls[column.name]"
                  ></novo-control>
                </td>
              </tr>
              <tr
                class="details-row"
                *ngIf="config.hasDetails"
                [hidden]="!row._expanded"
                [attr.data-automation-id]="'details-row-' + row.id"
              >
                <td class="row-actions"></td>
                <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? columns.length + 1 : columns.length">
                  <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                </td>
              </tr>
            </ng-template>
          </tbody>
          <!-- NO TABLE DATA PLACEHOLDER -->
          <tbody
            class="table-message"
            *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing"
            data-automation-id="empty-table"
          >
            <tr>
              <td colspan="100%">
                <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- NO MATCHING RECORDS -->
          <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
            <tr>
              <td colspan="100%">
                <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- TABLE DATA ERROR PLACEHOLDER -->
          <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
            <tr>
              <td colspan="100%">
                <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                  <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot *ngIf="!config.footers" [ngClass]="dataProvider.length % 2 == 0 ? 'odd' : 'even'">
            <tr>
              <td colspan="100%">
                <ng-content select="novo-table-footer"></ng-content>
              </td>
            </tr>
          </tfoot>
          <tfoot *ngFor="let footer of footers; let i = index" class="novo-table-total-footer">
            <tr>
              <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">
                {{ footer[column.name] }}
              </td>
            </tr>
          </tfoot>
        </table>
      </novo-form>
    </div>
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.07);z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:rgba(74,137,220,.2)}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#ffffff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:auto;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n + 2),.table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000000;color:#fff}novo-table[theme=black]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#ffffff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#3399dd;color:#fff}novo-table[theme=company]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#44bb77;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#aa6699;color:#fff}novo-table[theme=lead]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#ffaa44;color:#fff}novo-table[theme=contact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#ffaa44;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#662255;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#bb5566;color:#fff}novo-table[theme=job]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#bb5566;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i2.FormUtils }, { type: i3.FormBuilder }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { filterInputs: [{
                type: ViewChildren,
                args: ['filterInput', { read: ElementRef }]
            }], config: [{
                type: Input
            }], columns: [{
                type: Input
            }], theme: [{
                type: Input
            }], skipSortAndFilterClear: [{
                type: Input
            }], mode: [{
                type: Input
            }], editable: [{
                type: Input
            }], rowIdentifier: [{
                type: Input
            }], name: [{
                type: Input
            }], onRowClick: [{
                type: Output
            }], onRowSelect: [{
                type: Output
            }], onTableChange: [{
                type: Output
            }], rows: [{
                type: Input
            }], dataProvider: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSixPQUFPLEVBQThCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixTQUFTO0FBQ1QsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0J6RiwrR0FBK0c7QUFDL0csTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtBQUNWLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQXFWRCxNQUFNLE9BQU8sZ0JBQWdCO0lBNkszQixZQUFtQixNQUF3QixFQUFVLFNBQW9CLEVBQVUsT0FBb0IsRUFBVSxHQUFzQjtRQUFwSCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLGNB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TixLQUFLO3NCQURKLEtBQUs7Z0JBR04sc0JBQXNCO3NCQURyQixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sYUFBYTtzQkFEWixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFJTixVQUFVO3NCQURULE1BQU07Z0JBR1AsV0FBVztzQkFEVixNQUFNO2dCQUdQLGFBQWE7c0JBRFosTUFBTTtnQkE0QkgsSUFBSTtzQkFEUCxLQUFLO2dCQWlCRixZQUFZO3NCQURmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4sIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1BcnJheSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgc3RhcnRPZlRvZGF5LCBzdGFydE9mVG9tb3Jyb3cgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBBUFBcbmltcG9ydCB7IENvbGxlY3Rpb25FdmVudCwgTm92b0xhYmVsU2VydmljZSwgUGFnZWRBcnJheUNvbGxlY3Rpb24gfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVVdGlsLCBIZWxwZXJzLCBub3RpZnkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IENvbnRyb2xGYWN0b3J5LCBGb3JtVXRpbHMsIFJlYWRPbmx5Q29udHJvbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZm9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b1RhYmxlQ29uZmlnIHtcbiAgLy8gUGFnaW5nIGNvbmZpZ1xuICBwYWdpbmc/OiB7XG4gICAgY3VycmVudDogbnVtYmVyOyAvLyBjdXJyZW50IHBhZ2VcbiAgICBpdGVtc1BlclBhZ2U6IG51bWJlcjsgLy8gaXRlbXMgcGVyIHBhZ2VcbiAgICBvblBhZ2VDaGFuZ2U6IEZ1bmN0aW9uOyAvLyBmdW5jdGlvbiB0byBoYW5kbGUgcGFnZSBjaGFuZ2luZ1xuICAgIHJvd09wdGlvbnM/OiB7IHZhbHVlOiBudW1iZXI7IGxhYmVsOiBzdHJpbmcgfVtdOyAvLyBwYWdlIG9wdGlvbnNcbiAgICBkaXNhYmxlUGFnZVNlbGVjdGlvbj86IGJvb2xlYW47IC8vIGRpc2FibGVzIHRoZSBwYWdlcyBmcm9tIGJlaW5nIHNlbGVjdGVkXG4gIH07XG4gIC8vIEZvb3RlciBjb25maWcgKHRvdGFsIGZvb3RlcilcbiAgZm9vdGVycz86IEFycmF5PHtcbiAgICBjb2x1bW5zOiBBcnJheTxzdHJpbmc+OyAvLyBzdHJpbmcgYXJyYXkgb2YgY29sdW1ucyB0byB0b3RhbFxuICAgIG1ldGhvZDogc3RyaW5nOyAvLyBtZXRob2QgdG8gdXNlIGZvciB0aGUgZm9vdGVyLCBTVU0gfCBBVkcsIGRlZmF1bHRzIHRvIFNVTVxuICAgIGxhYmVsQ29sdW1uOiBzdHJpbmc7IC8vIGNvbHVtbiB0byB1c2UgYXMgdGhlIFwidG90YWxcIiBsYWJlbFxuICAgIGxhYmVsOiBzdHJpbmc7IC8vIGxhYmVsIHRvIHVzZSBpbiB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gIH0+O1xuICAvLyBUT0RPOiBXaGVuIHRoZXNlIHR5cGVzIGFyZSBlbmZvcmNlZCBhcyBgYm9vbGVhbiB8IEZ1bmN0aW9uYCwgdGhlcmUncyBhIGxpbnQgZXJyb3IuIFRoYXQncyBhIGJ1Zy5cbiAgZmlsdGVyaW5nPzogYm9vbGVhbiB8IGFueTsgLy8gVHVybiBvbiBmaWx0ZXJpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3IgZmlsdGVyaW5nIGNhbGxiYWNrXG4gIHNvcnRpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIHNvcnRpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3Igc29ydGluZyBjYWxsYmFja1xuICBvcmRlcmluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiBvcmRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBvcmRlcmluZyBjYWxsYmFja1xuICByZXNpemluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiByZXNpemluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciByZXNpemluZyBjYWxsYmFja1xuICByb3dTZWxlY3Rpb25TdHlsZT86IHN0cmluZzsgLy8gUm93IHNlbGVjdGlvbiBzdHlsZSwgY2hlY2tib3ggb3Igcm93XG4gIHJvd1NlbGVjdD86IGJvb2xlYW47IC8vIFR1cm4gb24gcm93IHNlbGVjdGlvblxuICBoYXNEZXRhaWxzPzogYm9vbGVhbjsgLy8gVHVybiBvbiBkZXRhaWxzIHJvdyBmb3IgdGhlIHRhYmxlXG4gIGRldGFpbHNSZW5kZXJlcj86IGFueTsgLy8gUmVuZGVyZXIvY29tcG9uZW50IGZvciB0aGUgZGV0YWlscyByb3dcbiAgZXhwYW5kQWxsPzogYm9vbGVhbjsgLy8gc2hvdWxkIEFsbCBSb3dzIGJlIGV4cGFuZGVkIGJ5IGRlZmF1bHRcbiAgc2VsZWN0QWxsRW5hYmxlZD86IGJvb2xlYW47IC8vIEFsbG93cyB0aGUgdGFibGUsIHdoaWxlIGluIHNlbGVjdGlvbiBtb2RlIHRvIGhhdmUgYSBzZWxlY3QgYWxsIGF0IHRoZSB0b3Bcbn1cblxuLy8gVE9ETyAtIHN1cHBvcnQgKDEpIGNsaWNraW5nIGNlbGwgdG8gZWRpdCwgKDIpIGNsaWNraW5nIHJvdyB0byBlZGl0LCAoMykgYnV0dG9uIHRvIHRyaWdnZXIgZnVsbCB0YWJsZSB0byBlZGl0XG5leHBvcnQgZW51bSBOb3ZvVGFibGVNb2RlIHtcbiAgVklFVyA9IDEsXG4gIEVESVQgPSAyLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYmxlJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by10YWJsZScsXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gICAgJ1tjbGFzcy5lZGl0aW5nXSc6ICdtb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQnLFxuICAgICdbY2xhc3Mubm92by10YWJsZS1sb2FkaW5nXSc6ICdsb2FkaW5nJyxcbiAgfSxcbiAgLy8gZGlyZWN0aXZlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGhlYWRlciAqbmdJZj1cImNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxuICAgICAgICA8bm92by1wYWdpbmF0aW9uXG4gICAgICAgICAgKm5nSWY9XCJjb25maWcucGFnaW5nICYmICEoZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiAhZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSlcIlxuICAgICAgICAgIFtyb3dPcHRpb25zXT1cImNvbmZpZy5wYWdpbmcucm93T3B0aW9uc1wiXG4gICAgICAgICAgW2Rpc2FibGVQYWdlU2VsZWN0aW9uXT1cImNvbmZpZy5wYWdpbmcuZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIlxuICAgICAgICAgIFsocGFnZSldPVwiZGF0YVByb3ZpZGVyLnBhZ2VcIlxuICAgICAgICAgIFsoaXRlbXNQZXJQYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVNpemVcIlxuICAgICAgICAgIFt0b3RhbEl0ZW1zXT1cImRhdGFQcm92aWRlci50b3RhbFwiXG4gICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgPC9ub3ZvLXBhZ2luYXRpb24+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXRhYmxlLWxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyB8fCBkYXRhUHJvdmlkZXIuaXNMb2FkaW5nKClcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmc+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tdG9hc3QgKm5nSWY9XCJ0b2FzdFwiIFt0aGVtZV09XCJ0b2FzdD8udGhlbWVcIiBbaWNvbl09XCJ0b2FzdD8uaWNvblwiIFttZXNzYWdlXT1cInRvYXN0Py5tZXNzYWdlXCI+PC9ub3ZvLXRvYXN0PlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1jb250YWluZXJcIiAqbmdJZj1cIiFncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0XCI+XG4gICAgICA8bm92by1mb3JtIGhpZGVIZWFkZXI9XCJ0cnVlXCIgW2Zvcm1dPVwiJGFueSh0YWJsZUZvcm0pXCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgZGF0YVRhYmxlXCIgW2NsYXNzLnRhYmxlLWRldGFpbHNdPVwiY29uZmlnLmhhc0RldGFpbHNcIiByb2xlPVwiZ3JpZFwiPlxuICAgICAgICAgIDwhLS0gc2tpcFNvcnRBbmRGaWx0ZXJDbGVhciBpcyBhIGhhY2sgcmlnaHQgbm93LCB3aWxsIGJlIHJlbW92ZWQgb25jZSBDYW52YXMgaXMgcmVmYWN0b3JlZCAtLT5cbiAgICAgICAgICA8dGhlYWQgKm5nSWY9XCJjb2x1bW5zLmxlbmd0aCAmJiAoIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSB8fCBza2lwU29ydEFuZEZpbHRlckNsZWFyIHx8IGVkaXRpbmcpXCI+XG4gICAgICAgICAgICA8dHIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8IS0tIERFVEFJTFMgLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zXCIgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJuZXh0XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhY29uZmlnLmV4cGFuZEFsbFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJleHBhbmQtYWxsXCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwic29ydC1kZXNjXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNvbGxhcHNlLWFsbFwiXG4gICAgICAgICAgICAgICAgPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDwhLS0gQ0hFQ0tCT1ggLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zIGNoZWNrYm94IG1hc3MtYWN0aW9uXCIgKm5nSWY9XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCdcIj5cbiAgICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXN0ZXJcIlxuICAgICAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwicGFnZVNlbGVjdGVkLmxlbmd0aCA+IDAgJiYgcGFnZVNlbGVjdGVkLmxlbmd0aCA8IHBhZ2VkRGF0YS5sZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2VsZWN0UGFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlbGVjdC1hbGwtY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBdPVwibWFzdGVyID8gbGFiZWxzLmRlc2VsZWN0QWxsIDogbGFiZWxzLnNlbGVjdEFsbE9uUGFnZVwiXG4gICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPCEtLSBUQUJMRSBIRUFERVJTIC0tPlxuICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICdtYXNzLWFjdGlvbic6IGNvbmZpZz8ucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICBhY3Rpb25zOiBjb2x1bW4/LmFjdGlvbnM/Lml0ZW1zPy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgICAgcHJldmlldzogY29sdW1uPy5uYW1lID09PSAncHJldmlldydcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICBbbm92b1RoT3JkZXJhYmxlXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgKG9uT3JkZXJDaGFuZ2UpPVwib25PcmRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImlzQ29sdW1uSGlkZGVuKGNvbHVtbilcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRoLWdyb3VwXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZVwiICpuZ0lmPVwiIWNvbHVtbi5oaWRlSGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICA8IS0tIExBQkVMICYgU09SVCBBUlJPV1MgLS0+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGgtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJjb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgY29sdW1uLnNvcnRpbmcgIT09IGZhbHNlID8gJ3NvcnRhYmxlJyA6ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgW25vdm9UaFNvcnRhYmxlXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU29ydENoYW5nZSk9XCJvblNvcnRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD57eyBjb2x1bW4udGl0bGUgfHwgY29sdW1uLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtc29ydC1pY29uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnNvcnQgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLnNvcnRpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5zb3J0aW5nICE9PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy11cFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy1kb3duXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgRFJPUC1ET1dOIC0tPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tZHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgc2lkZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5maWx0ZXJpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5maWx0ZXJpbmcgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjb2x1bW4tZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICh0b2dnbGVkKT1cIm9uRHJvcGRvd25Ub2dnbGVkKCRldmVudCwgY29sdW1uLm5hbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIudGFibGUtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xhc3M9XCJ0YWJsZS1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZpbHRlcmVkXT1cImNvbHVtbi5maWx0ZXIgfHwgY29sdW1uLmZpbHRlciA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJmb2N1c0lucHV0KClcIlxuICAgICAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgT1BUSU9OUyBMSVNUIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cFxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY29sdW1uPy5vcHRpb25zPy5sZW5ndGggfHwgY29sdW1uPy5vcmlnaW5hbE9wdGlvbnM/Lmxlbmd0aCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbj8udHlwZSAhPT0gJ2RhdGUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImZpbHRlci1zZWFyY2hcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT1cImRpYWxvZ3VlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPVwidGltZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhIWNvbHVtbi5hbGxvd0N1c3RvbVRleHRPcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJLZXl3b3JkcygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZnJlZXRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZWVwRmlsdGVyRm9jdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbikgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj4gPGkgY2xhc3M9XCJiaGktY2hlY2tcIiAqbmdJZj1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIFNFQVJDSCBJTlBVVCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCIhKGNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoIHx8IGNvbHVtbj8ub3JpZ2luYWxPcHRpb25zPy5sZW5ndGgpICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIgbm92b0luZXJ0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cInRpbWVzXCIgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBGaWx0ZXJGb2N1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIERBVEUgT1BUSU9OUyAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCJjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCAmJiBjb2x1bW4/LnR5cGUgPT09ICdkYXRlJyAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiICpuZ0lmPVwiIWNvbHVtbi5jYWxlbmRlclNob3dcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwidGltZXNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2x1bW4ub3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25GaWx0ZXJDbGljayhjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2tlZXBPcGVuXT1cIm9wdGlvbi5yYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImNvbHVtbi5jYWxlbmRlclNob3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvU3VmZml4IGNvbG9yPVwicG9zaXRpdmVcIiAqbmdJZj1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiPmNoZWNrPC9ub3ZvLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJjYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cImNvbHVtbi5jYWxlbmRlclNob3dcIiBrZWVwT3BlbiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1zdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2stbGlua1wiIChjbGljayk9XCJjb2x1bW4uY2FsZW5kZXJTaG93ID0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT57eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25DYWxlbmRlclNlbGVjdChjb2x1bW4sICRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1zdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICA8L25vdm8tZHJvcGRvd24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIC0tPlxuICAgICAgICAgIDx0Ym9keSAqbmdJZj1cIiFkYXRhUHJvdmlkZXIuaXNFbXB0eSgpIHx8IGVkaXRpbmdcIj5cbiAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyAmJiBzaG93U2VsZWN0QWxsTWVzc2FnZSAmJiBjb25maWcuc2VsZWN0QWxsRW5hYmxlZFwiXG4gICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICB7eyBsYWJlbHMuc2VsZWN0ZWRSZWNvcmRzKHNlbGVjdGVkLmxlbmd0aCkgfX1cbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwic2VsZWN0QWxsKHRydWUpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiYWxsLW1hdGNoaW5nLXJlY29yZHNcIj57eyBsYWJlbHMudG90YWxSZWNvcmRzKGRhdGFQcm92aWRlci50b3RhbCkgfX08L2E+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3c9XCIkaW1wbGljaXRcIiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwicm93c1wiPlxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXJvd1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwicm93LmN1c3RvbUNsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwibmFtZSArICctJyArIHJvd1tyb3dJZGVudGlmaWVyXVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInJvdy5pZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJvd0NsaWNrSGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInJvdy5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cIm5leHRcIiAoY2xpY2spPVwicm93Ll9leHBhbmRlZCA9ICFyb3cuX2V4cGFuZGVkXCIgKm5nSWY9XCIhcm93Ll9leHBhbmRlZFwiPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInNvcnQtZGVzY1wiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkID0gIXJvdy5fZXhwYW5kZWRcIiAqbmdJZj1cInJvdy5fZXhwYW5kZWRcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3hcIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJyb3cuX3NlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwicm93U2VsZWN0SGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LXJvdy1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3Mubm92by1mb3JtLXJvd109XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImlzQ29sdW1uSGlkZGVuKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLXRhYmxlLWNlbGxcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgIXJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgICBbaGFzRWRpdG9yXT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cIiRhbnkoZ2V0Um93Q29udHJvbEZvcm0oaSkpXCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tdGFibGUtY2VsbD5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb25kZW5zZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRyb2xdPVwicm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLWNvbnRyb2w+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkZXRhaWxzLXJvd1wiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiXG4gICAgICAgICAgICAgICAgW2hpZGRlbl09XCIhcm93Ll9leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidkZXRhaWxzLXJvdy0nICsgcm93LmlkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zXCI+PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcgPyBjb2x1bW5zLmxlbmd0aCArIDEgOiBjb2x1bW5zLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tcm93LWRldGFpbHMgW2RhdGFdPVwicm93XCIgW3JlbmRlcmVyXT1cImNvbmZpZy5kZXRhaWxzUmVuZGVyZXJcIj48L25vdm8tcm93LWRldGFpbHM+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIE5PIFRBQkxFIERBVEEgUExBQ0VIT0xERVIgLS0+XG4gICAgICAgICAgPHRib2R5XG4gICAgICAgICAgICBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIlxuICAgICAgICAgICAgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpICYmICFlZGl0aW5nXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LXRhYmxlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI2VtcHR5bWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtZW1wdHktbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cImVtcHR5bWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZW1wdHlUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gTk8gTUFUQ0hJTkcgUkVDT1JEUyAtLT5cbiAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCIgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmIGRhdGFQcm92aWRlci5pc0ZpbHRlcmVkKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS10YWJsZVwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNub21hdGNobWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtbm8tbWF0Y2hpbmctcmVjb3Jkcy1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8tbWF0Y2hpbmctcmVjb3Jkc1wiICpuZ0lmPVwibm9tYXRjaG1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLm5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIEVSUk9SIFBMQUNFSE9MREVSIC0tPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIiAqbmdJZj1cImRhdGFQcm92aWRlci5oYXNFcnJvcnMoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLWVycm9yc1wiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNlcnJvcm1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLWVycm9yLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJlcnJvcm1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLWNhdXRpb25cIj48L2k+IHt7IGxhYmVscy5lcnJvcmVkVGFibGVNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8dGZvb3QgKm5nSWY9XCIhY29uZmlnLmZvb3RlcnNcIiBbbmdDbGFzc109XCJkYXRhUHJvdmlkZXIubGVuZ3RoICUgMiA9PSAwID8gJ29kZCcgOiAnZXZlbidcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgPHRmb290ICpuZ0Zvcj1cImxldCBmb290ZXIgb2YgZm9vdGVyczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwibm92by10YWJsZS10b3RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCIoY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lKSArICctdG90YWwtJyArIGlcIj5cbiAgICAgICAgICAgICAgICB7eyBmb290ZXJbY29sdW1uLm5hbWVdIH19XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L25vdm8tZm9ybT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vVGFibGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFibGVFbGVtZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBWaWV3Q2hpbGRyZW4oJ2ZpbHRlcklucHV0JywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGZpbHRlcklucHV0czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogTm92b1RhYmxlQ29uZmlnID0ge307XG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBtb2RlOiBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZS5WSUVXO1xuICBASW5wdXQoKVxuICBlZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICByb3dJZGVudGlmaWVyOiBzdHJpbmcgPSAnaWQnO1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgPSAndGFibGUnO1xuXG4gIEBPdXRwdXQoKVxuICBvblJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uVGFibGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9kYXRhUHJvdmlkZXI6IFBhZ2VkQXJyYXlDb2xsZWN0aW9uPGFueT47XG4gIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdGVkOiBBcnJheTxhbnk+ID0gW107XG4gIGFjdGl2ZUlkOiBudW1iZXIgPSAwO1xuICBtYXN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXhwYW5kQWxsOiBib29sZWFuID0gZmFsc2U7XG4gIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGFzdFBhZ2U6IG51bWJlciA9IDA7XG4gIHNlbGVjdGVkUGFnZUNvdW50OiBudW1iZXIgPSAwO1xuICBzaG93U2VsZWN0QWxsTWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjdXJyZW50U29ydENvbHVtbjogYW55O1xuICBwYWdlZERhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgcGFnZVNlbGVjdGVkOiBhbnk7XG4gIC8vIE1hcCB0byBrZWVwIHRyYWNrIG9mIHdoYXQgZHJvcGRvd25zIGFyZSB0b2dnbGVkXG4gIC8vIFVzZWQgdG8gcHJvcGVybHkgKm5nSWYgdGhlIDxub3ZvLW9wdGdyb3VwPiBzbyB0aGF0IHRoZSBrZWVwRmlsdGVyRm9jdXNlZCBEaXJlY3RpdmVcbiAgLy8gd2lsbCBwcm9wZXJseSBmaXJlIHRoZSBuZ0FmdGVyVmlld0luaXQgZXZlbnRcbiAgdG9nZ2xlZERyb3Bkb3duTWFwOiBhbnkgPSB7fTtcbiAgcHVibGljIE5vdm9UYWJsZU1vZGUgPSBOb3ZvVGFibGVNb2RlO1xuICBwdWJsaWMgdGFibGVGb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgcHVibGljIHRvYXN0OiB7IHRoZW1lOiBzdHJpbmc7IGljb246IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH07XG4gIHB1YmxpYyBmb290ZXJzID0gW107XG4gIHB1YmxpYyBncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Mocm93czogQXJyYXk8YW55Pikge1xuICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gcm93cztcbiAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xuICAgIH1cbiAgICAvLyB0aGlzIGlzIGEgdGVtcG9yYXJ5L2hhY2t5IGZpeCB1bnRpbCBhc3luYyBkYXRhbG9hZGluZyBpcyBoYW5kbGVkIHdpdGhpbiB0aGUgdGFibGVcbiAgICBpZiAoIXRoaXMuc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcikge1xuICAgICAgdGhpcy5jbGVhckFsbFNvcnRBbmRGaWx0ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGF0YVByb3ZpZGVyKGRwOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIgPSBBcnJheS5pc0FycmF5KGRwKSA/IG5ldyBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+KGRwKSA6IGRwO1xuICAgIHRoaXMuX2RhdGFQcm92aWRlci5kYXRhQ2hhbmdlLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoZXZlbnQ6IENvbGxlY3Rpb25FdmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgQ29sbGVjdGlvbkV2ZW50LkNIQU5HRTpcbiAgICAgICAgICB0aGlzLl9yb3dzID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAvLyBTZXR1cCBmb3JtXG4gICAgICAgICAgdGhpcy50YWJsZUZvcm0gPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgcm93czogdGhpcy5idWlsZGVyLmFycmF5KFtdKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICAgICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZWREYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRmluZCB0aGF0IGNvbHVtbnMgd2UgbWlnaHQgbmVlZCB0byBzdW0gdXAgdmlhIHRoZSBmb290ZXJcbiAgICAgICAgICBsZXQgY29sdW1uc1RvU3VtID0gW107XG4gICAgICAgICAgY29uc3QgY29sdW1uU3VtcyA9IHt9O1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mb290ZXJzLmZvckVhY2goKGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgICBjb2x1bW5zVG9TdW0ucHVzaCguLi5jb25maWcuY29sdW1ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE9ubHkgaGF2ZSB1bmlxdWUgY29sdW1ucywgZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgICAgICBjb2x1bW5zVG9TdW0gPSBjb2x1bW5zVG9TdW0uZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2YoaXRlbSkgPT09IGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFrZSBhIGZvcm0gZm9yIGVhY2ggcm93XG4gICAgICAgICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgcm93Q29udHJvbHMgPSBbXTtcbiAgICAgICAgICAgIHJvdy5jb250cm9scyA9IHt9O1xuICAgICAgICAgICAgcm93Ll9lZGl0aW5nID0ge307XG4gICAgICAgICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xuICAgICAgICAgICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgIC8vIFVzZSB0aGUgY29udHJvbCBwYXNzZWQgb3IgdXNlIGEgUmVhZE9ubHlDb250cm9sIHNvIHRoYXQgdGhlIGZvcm0gaGFzIHRoZSB2YWx1ZXNcbiAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGNvbHVtbi5lZGl0b3JDb25maWdcbiAgICAgICAgICAgICAgICA/IENvbnRyb2xGYWN0b3J5LmNyZWF0ZShjb2x1bW4uZWRpdG9yVHlwZSwgY29sdW1uLmVkaXRvckNvbmZpZylcbiAgICAgICAgICAgICAgICA6IG5ldyBSZWFkT25seUNvbnRyb2woeyBrZXk6IGNvbHVtbi5uYW1lIH0pO1xuICAgICAgICAgICAgICByb3cuY29udHJvbHNbY29sdW1uLm5hbWVdID0gY29udHJvbDtcbiAgICAgICAgICAgICAgcm93Q29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgcm93LCBmYWxzZSk7XG4gICAgICAgICAgICB0YWJsZUZvcm1Sb3dzLnB1c2godGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAocm93Q29udHJvbHMpKTtcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSB0b3RhbCBmb290ZXIgaWYgY29uZmlndXJlZFxuICAgICAgICAgICAgLy8gQXJyYXkgb2Yga2V5cyB0byB0b3RhbFxuICAgICAgICAgICAgaWYgKGNvbHVtbnNUb1N1bS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgY29sdW1uc1RvU3VtLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoY29sdW1uU3Vtc1tjb2x1bW5dKSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dICs9IHJvd1tjb2x1bW5dO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGFibGVFZGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNldHVwIHRoZSBmb290ZXJzIChpZiBhbnkpXG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZvb3RlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb25maWcuZm9vdGVycy5mb3JFYWNoKChmb290ZXJDb25maWcsIGZvb3RlckNvbmZpZ0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvb3RlciA9IHt9O1xuICAgICAgICAgICAgICBmb290ZXJbZm9vdGVyQ29uZmlnLmxhYmVsQ29sdW1uXSA9IGZvb3RlckNvbmZpZy5sYWJlbDtcbiAgICAgICAgICAgICAgZm9vdGVyQ29uZmlnLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZvb3RlckNvbmZpZy5tZXRob2QgPT09ICdBVkcnICYmIHRoaXMuX3Jvd3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXSAvIHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmZvb3RlcnMucHVzaChmb290ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQ7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSB0aGlzLmNvbmZpZy5wYWdpbmcuaXRlbXNQZXJQYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQYWdpbmcgdHVybmVkIG9mZiwgcmV0dXJuIGJhc2ljYWxseSBhbGwgb2YgdGhlIGRhdGFcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gMTtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlU2l6ZSA9IDUwMDtcbiAgICB9XG4gICAgaWYgKGRwICYmIGRwLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIucmVmcmVzaCgpO1xuICB9XG4gIGdldCBkYXRhUHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFQcm92aWRlcjtcbiAgfVxuXG4gIGdldCBlZGl0aW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVDtcbiAgfVxuXG4gIGdldCBmb3JtVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVGb3JtLmdldFJhd1ZhbHVlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGZvcm1VdGlsczogRm9ybVV0aWxzLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBub3RpZnkoJ1tEZXByZWNhdGVkXTogVGhlIHRhYmxlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBtaWdyYXRlIHRvIG5vdm8tZGF0YS10YWJsZXMhJyk7XG4gIH1cblxuICBvbkRyb3Bkb3duVG9nZ2xlZChldmVudCwgY29sdW1uKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uXSA9IGV2ZW50O1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZm9jdXNJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5maWx0ZXJJbnB1dHMgJiYgdGhpcy5maWx0ZXJJbnB1dHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0cy5mb3JFYWNoKChmaWx0ZXJJbnB1dCkgPT4ge1xuICAgICAgICBpZiAoZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZSA9IGV2ZW50LnBhZ2U7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPSBldmVudC5pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbikge1xuICAgIGlmICghSGVscGVycy5pc0JsYW5rKG9wdGlvbi52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBzZXR1cENvbHVtbkRlZmF1bHRzKCkge1xuICAgIC8vIENoZWNrIGNvbHVtbnMgZm9yIGNlbGwgb3B0aW9uIHR5cGVzXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4udHlwZSkge1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAvLyBTZXQgb3B0aW9ucyBiYXNlZCBvbiBkYXRlcyBpZiB0aGVyZSBhcmUgbm9uZVxuICAgICAgICAgICAgY29sdW1uLm9wdGlvbnMgPSBjb2x1bW4ub3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRPcHRpb25zKGNvbHVtbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ICE9PSB0aGlzLmxhc3RQYWdlKSB7XG4gICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0UGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZyA/IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50IDogMTtcbiAgfVxuXG4gIGdldFBhZ2VTdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgPyAodGhpcy5kYXRhUHJvdmlkZXIucGFnZSAtIDEpICogdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiAwO1xuICB9XG5cbiAgZ2V0UGFnZUVuZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgJiYgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPiAtMSA/IHRoaXMuZ2V0UGFnZVN0YXJ0KCkgKyB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA6IHRoaXMucm93cy5sZW5ndGg7XG4gIH1cblxuICBnZXRSb3dDb250cm9sRm9ybShpKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgcmV0dXJuIHRhYmxlRm9ybVJvd3MuY29udHJvbHNbaV07XG4gIH1cblxuICBvbkZpbHRlckNsaWNrKGNvbHVtbiwgZmlsdGVyKSB7XG4gICAgaWYgKGZpbHRlci5yYW5nZSAmJiAhY29sdW1uLmNhbGVuZGFyU2hvdykge1xuICAgICAgY29sdW1uLmNhbGVuZGVyU2hvdyA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpICYmIGNvbHVtbi5tdWx0aXBsZSkge1xuICAgICAgaWYgKH5jb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSkge1xuICAgICAgICAvLyBSZW1vdmUgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIuc3BsaWNlKGNvbHVtbi5maWx0ZXIuaW5kZXhPZihmaWx0ZXIpLCAxKTtcbiAgICAgICAgaWYgKGZpbHRlci5yYW5nZSkge1xuICAgICAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uZmlsdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29sdW1uLm11bHRpcGxlKSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gbmV3IEFycmF5KCk7XG4gICAgICBjb2x1bW4uZmlsdGVyLnB1c2goSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWU7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2xlYXIoY29sdW1uOiBhbnkpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgY29sdW1uLmZyZWV0ZXh0RmlsdGVyID0gbnVsbDtcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIGlmIChjb2x1bW4ub3JpZ2luYWxPcHRpb25zKSB7XG4gICAgICAgIGNvbHVtbi5vcHRpb25zID0gY29sdW1uLm9yaWdpbmFsT3B0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsU29ydEFuZEZpbHRlcnMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgY29sdW1uLnNvcnQgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSByb3cgZGF0YSB0byByZWZsZWN0IHRoZSBhY3RpdmUgZmlsdGVycy5cbiAgICovXG4gIG9uRmlsdGVyQ2hhbmdlKGV2ZW50PzogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyaW5nKSB7XG4gICAgICAvLyBBcnJheSBvZiBmaWx0ZXJzXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5jb2x1bW5zLmZpbHRlcigoY29sKSA9PiAhSGVscGVycy5pc0VtcHR5KGNvbC5maWx0ZXIpKTtcbiAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICBsZXQgcXVlcnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgZmlsdGVycykge1xuICAgICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLm1hdGNoKSkge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gKHZhbHVlLCByZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5tYXRjaChyZWNvcmQsIGNvbHVtbi5maWx0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5wcmVGaWx0ZXIgJiYgSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5wcmVGaWx0ZXIpKSB7XG4gICAgICAgICAgICBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5LCBjb2x1bW4ucHJlRmlsdGVyKHRoaXMuZXNjYXBlQ2hhcmFjdGVycyhjb2x1bW4uZmlsdGVyKSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSkge1xuICAgICAgICAgICAgLy8gVGhlIGZpbHRlcnMgYXJlIGFuIGFycmF5IChtdWx0aS1zZWxlY3QpLCBjaGVjayB2YWx1ZVxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb2x1bW4uZmlsdGVyO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBhbiBhcnJheSBvZiB7dmFsdWU6ICcnLCBsYWJlbHM6ICcnfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbMF0udmFsdWUgfHwgb3B0aW9uc1swXS5sYWJlbCkge1xuICAgICAgICAgICAgICBvcHRpb25zID0gY29sdW1uLmZpbHRlci5tYXAoKG9wdCkgPT4gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHsgYW55OiBvcHRpb25zIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4udHlwZSAmJiBjb2x1bW4udHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlci5zdGFydERhdGUgJiYgY29sdW1uLmZpbHRlci5lbmREYXRlKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICBtaW46IERhdGVVdGlsLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5zdGFydERhdGUpLFxuICAgICAgICAgICAgICAgIG1heDogRGF0ZVV0aWwuc3RhcnRPZkRheShEYXRlVXRpbC5hZGREYXlzKERhdGVVdGlsLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5lbmREYXRlKSwgMSkpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIG1pbjogY29sdW1uLmZpbHRlci5taW4gPyBEYXRlVXRpbC5hZGREYXlzKHN0YXJ0T2ZUb2RheSgpLCBjb2x1bW4uZmlsdGVyLm1pbikgOiBzdGFydE9mVG9kYXkoKSxcbiAgICAgICAgICAgICAgICBtYXg6IGNvbHVtbi5maWx0ZXIubWF4ID8gRGF0ZVV0aWwuYWRkRGF5cyhzdGFydE9mVG9tb3Jyb3coKSwgY29sdW1uLmZpbHRlci5tYXgpIDogc3RhcnRPZlRvbW9ycm93KCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IGNvbHVtbi5maWx0ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZmlsdGVyaW5nKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmZpbHRlcmluZyhxdWVyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmZpbHRlciA9IHF1ZXJ5O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0ge307XG4gICAgICB9XG4gICAgICAvLyBUcmlja2xlIGRvd24gdG8ga2VlcCBzb3J0XG4gICAgICAvLyB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcbiAgICAgIHRoaXMuZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKTtcblxuICAgICAgLy8gSWYgcGFnaW5nLCByZXNldCBwYWdlXG4gICAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gMTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbGwgc2VsZWN0aW9uIG9uIHNvcnQgY2hhbmdlIGlmIHNlbGVjdGlvbiBpcyBvblxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlc2NhcGVDaGFyYWN0ZXJzKGZpbHRlcikge1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZpbHRlci5yZXBsYWNlKC8nL2csIFwiJydcIik7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgIC8vIFRPRE86IFRoaXMgbmVlZHMgdG8gYmUgcmVmYWN0b3JlZFxuICAgIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChjb2x1bW4gJiYgIUhlbHBlcnMuaXNCbGFuayhjb2x1bW4uZmlsdGVyKSAmJiAhSGVscGVycy5pc0JsYW5rKGZpbHRlcikpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlci5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5sYWJlbCA9PT0gZmlsdGVyLmxhYmVsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlci5pbmNsdWRlcyhmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGNvbHVtbi5maWx0ZXIgPT09IHR5cGVvZiBmaWx0ZXIpIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNBY3RpdmU7XG4gIH1cblxuICBvblNvcnRDaGFuZ2UoY29sdW1uKSB7XG4gICAgdGhpcy5jdXJyZW50U29ydENvbHVtbiA9IGNvbHVtbjtcbiAgICBjb25zdCBzb3J0ZWRDb2x1bW5zOiBhbnkgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKCh0aGlzQ29sdW1uKSA9PiB7XG4gICAgICByZXR1cm4gdGhpc0NvbHVtbi5zb3J0ICYmIHRoaXNDb2x1bW4gIT09IHRoaXMuY3VycmVudFNvcnRDb2x1bW47XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBzb3J0ZWRDb2x1bW4gb2Ygc29ydGVkQ29sdW1ucykge1xuICAgICAgc29ydGVkQ29sdW1uLnNvcnQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb2x1bW4pIHtcbiAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuc29ydGluZykpIHtcbiAgICAgICAgdGhpcy5jb25maWcuc29ydGluZygpO1xuICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLnByZVNvcnQpKSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5zb3J0ID0gW10uY29uY2F0KGNvbHVtbi5wcmVTb3J0KGNvbHVtbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbeyBmaWVsZDogY29sdW1uLmNvbXBhcmUgfHwgY29sdW1uLm5hbWUsIHJldmVyc2U6IGNvbHVtbi5zb3J0ID09PSAnZGVzYycgfV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlyZSB0YWJsZSBjaGFuZ2UgZXZlbnRcbiAgICAvLyB0aGlzLmZpcmVUYWJsZUNoYW5nZUV2ZW50KCk7XG5cbiAgICAvLyBJZiBwYWdpbmcsIHJlc2V0IHBhZ2VcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IDE7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKSB7XG4gICAgLy8gQ29uc3RydWN0IGEgdGFibGUgY2hhbmdlIG9iamVjdFxuICAgIGNvbnN0IG9uVGFibGVDaGFuZ2U6IGFueSA9IHt9O1xuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKChjb2wpID0+IGNvbC5maWx0ZXIgJiYgY29sLmZpbHRlci5sZW5ndGgpO1xuICAgIG9uVGFibGVDaGFuZ2UuZmlsdGVyID0gZmlsdGVycy5sZW5ndGggPyBmaWx0ZXJzIDogZmFsc2U7XG4gICAgb25UYWJsZUNoYW5nZS5zb3J0ID0gdGhpcy5jdXJyZW50U29ydENvbHVtbiA/IHRoaXMuY3VycmVudFNvcnRDb2x1bW4gOiBmYWxzZTtcbiAgICBvblRhYmxlQ2hhbmdlLnJvd3MgPSB0aGlzLnJvd3M7XG5cbiAgICAvLyBFbWl0IGV2ZW50XG4gICAgdGhpcy5vblRhYmxlQ2hhbmdlLmVtaXQob25UYWJsZUNoYW5nZSk7XG4gIH1cblxuICBmaW5kQ29sdW1uSW5kZXgodmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMuY29sdW1uc1tpXS5uYW1lID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbk9yZGVyQ2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3Qgb2xkSW5kZXggPSB0aGlzLmZpbmRDb2x1bW5JbmRleChldmVudC5maXJzdC5uYW1lKTtcbiAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LnNlY29uZC5uYW1lKTtcbiAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLmNvbHVtbnMuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgdGhpcy5vblNvcnRDaGFuZ2UodGhpcy5jdXJyZW50U29ydENvbHVtbik7XG4gIH1cblxuICBleHBhbmRBbGxPblBhZ2UoZXhwYW5kZWQpIHtcbiAgICB0aGlzLmNvbmZpZy5leHBhbmRBbGwgPSAhZXhwYW5kZWQ7XG4gICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5kYXRhUHJvdmlkZXIubGlzdCkge1xuICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RQYWdlKGRhdGE/OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMubWFzdGVyKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNlbGVjdCBhbGwgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIG5ldyBwYWdlIHNlbGVjdGVkIGF0IGEgdGltZVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRoaXMucGFnZWREYXRhID0gdGhpcy5yb3dzLnNsaWNlKHRoaXMuZ2V0UGFnZVN0YXJ0KCksIHRoaXMuZ2V0UGFnZUVuZCgpKTtcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMucGFnZWREYXRhKSB7XG4gICAgICAgIHJvdy5fc2VsZWN0ZWQgPSB0aGlzLm1hc3RlcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGFQcm92aWRlci5saXN0LmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgLy8gT25seSBzaG93IHRoZSBzZWxlY3QgYWxsIG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBuZXcgcGFnZSBzZWxlY3RlZCBhdCBhIHRpbWVcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQrKztcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID09PSAxICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoICE9PSB0aGlzLmRhdGFQcm92aWRlci50b3RhbDtcbiAgICB9XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2VsZWN0QWxsKHZhbHVlKSB7XG4gICAgdGhpcy5tYXN0ZXIgPSB2YWx1ZTtcbiAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XG4gICAgICByb3cuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZSA/IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QgOiBbXTtcbiAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgIHRoaXMucm93U2VsZWN0SGFuZGxlcigpO1xuICB9XG5cbiAgcm93U2VsZWN0SGFuZGxlcihkYXRhPzogYW55KSB7XG4gICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xuICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgaWYgKHRoaXMucGFnZVNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5tYXN0ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlU2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnBhZ2VkRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFzdGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hc3RlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gQnJlYWtpbmcgdGhlIHNlbGVjdGVkIHBhZ2UgY291bnRcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcbiAgICB9XG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XG4gIH1cblxuICBlbWl0U2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBsZW5ndGg6IHNlbGVjdGVkLmxlbmd0aCwgc2VsZWN0ZWQgfSk7XG4gIH1cblxuICByb3dDbGlja0hhbmRsZXIocm93KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdCkge1xuICAgICAgdGhpcy5hY3RpdmVJZCA9IHJvdy5pZCB8fCAwO1xuICAgICAgdGhpcy5vblJvd0NsaWNrLmVtaXQocm93KTtcbiAgICB9XG4gIH1cblxuICBnZXREZWZhdWx0T3B0aW9ucyhjb2x1bW4pIHtcbiAgICAvLyBUT0RPIC0gbmVlZHMgdG8gY29tZSBmcm9tIGxhYmVsIHNlcnZpY2UgLSBodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9lbGVtZW50cy9pc3N1ZXMvMTE2XG4gICAgY29uc3Qgb3B0czogYW55W10gPSBbXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MURheSwgbWluOiAtMSwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0N0RheXMsIG1pbjogLTcsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDMwRGF5cywgbWluOiAtMzAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDkwRGF5cywgbWluOiAtOTAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFZZWFyLCBtaW46IC0zNjYsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFEYXksIG1pbjogMCwgbWF4OiAxIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0N0RheXMsIG1pbjogMCwgbWF4OiA3IH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MzBEYXlzLCBtaW46IDAsIG1heDogMzAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ5MERheXMsIG1pbjogMCwgbWF4OiA5MCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFZZWFyLCBtaW46IDAsIG1heDogMzY2IH0sXG4gICAgXTtcblxuICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnJhbmdlKSB7XG4gICAgICBvcHRzLnB1c2goe1xuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbHMuY3VzdG9tRGF0ZVJhbmdlLFxuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbiAgfVxuXG4gIG9uQ2FsZW5kZXJTZWxlY3QoY29sdW1uLCBldmVudCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnN0YXJ0RGF0ZSAmJiBldmVudC5lbmREYXRlKSB7XG4gICAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICBvbkZpbHRlcktleXdvcmRzKGNvbmZpZykge1xuICAgIGlmIChjb25maWcgJiYgY29uZmlnLmZpbHRlcmluZyAmJiBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyKSB7XG4gICAgICBjb25zdCBmaWx0ZXJLZXl3b3JkcyA9IGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMpIHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnM7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gb3B0aW9uICYmIG9wdGlvbi5sYWJlbCA/IG9wdGlvbi5sYWJlbCA6IG9wdGlvbjtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IGZpbHRlcktleXdvcmRzKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAofnZhbHVlLmluZGV4T2YoZmlsdGVyS2V5d29yZHMpIHx8IH52YWx1ZS5pbmRleE9mKGZpbHRlcktleXdvcmRzKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5vcHRpb25zID0gbmV3T3B0aW9ucztcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcuZmlsdGVyID0gY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5vcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnM7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgVGFibGUgaW50byBFRElUIG1vZGUsIGJhc2VkIG9uIHRoZSByb3cvY29sdW1uIHBhc3NlZCB5b3UgY2FuIGVudGVyIGluIGEgZmV3IHN0YXRlc1xuICAgKiAoMSkgc2V0VGFibGVFZGl0KCkgLSBkb24ndCBwYXNzIGFueSB0byBwdXQgdGhlIEZVTEwgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogKDIpIHNldFRhYmxlRWRpdCgxKSAtIHBhc3Mgb25seSByb3cgdG8gcHV0IHRoYXQgRlVMTCByb3cgb2YgdGhlIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqICgzKSBzZXRUYWJsZUVkaXQoMSwgMSkgLSBwYXNzIHJvdyBhbmQgY29sdW1uIHRvIHB1dCB0aGF0IGNvbHVtbiBvZiB0aGUgcm93IG9mIHRoZSB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgc2V0VGFibGVFZGl0KHJvd051bWJlcj86IG51bWJlciwgY29sdW1uTnVtYmVyPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlID0gTm92b1RhYmxlTW9kZS5FRElUO1xuICAgIHRoaXMuX2RhdGFQcm92aWRlci5lZGl0KCk7XG4gICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICByb3cuX2VkaXRpbmcgPSByb3cuX2VkaXRpbmcgfHwge307XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uLnZpZXdPbmx5KSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIEhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIUhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJiBIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJlxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSAmJlxuICAgICAgICAgIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJlxuICAgICAgICAgIGNvbHVtbkluZGV4ID09PSBOdW1iZXIoY29sdW1uTnVtYmVyKVxuICAgICAgICApIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBMZWF2ZXMgZWRpdCBtb2RlIGZvciB0aGUgVGFibGUgYW5kIHB1dHMgZXZlcnl0aGluZyBiYWNrIHRvIFZJRVcgb25seVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKiBAcGFyYW0gY2FuY2VsIC0gd2hldGhlciBvciBub3QgdG8gc2F2ZSBkYXRhIG9yIHVuZG9cbiAgICovXG4gIHByaXZhdGUgbGVhdmVFZGl0TW9kZShjYW5jZWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm1vZGUgPSBOb3ZvVGFibGVNb2RlLlZJRVc7XG4gICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIHJvdy5fZWRpdGluZyA9IHJvdy5fZWRpdGluZyB8fCB7fTtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGNhbmNlbCkge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnVuZG8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmNvbW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLmhpZGVUb2FzdE1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIG5ldyByb3cgaW50byB0aGUgdGFibGUgdG8gYmUgZWRpdGVkLCBjYW4gYmUgY2FsbGVkIGZyb20gYSBsb2NhbCByZWZlcmVuY2Ugb2YgdGhlIHRhYmxlIGluIHlvdXIgdGVtcGxhdGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGFkZEVkaXRhYmxlUm93KGRlZmF1bHRWYWx1ZTogYW55ID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgY29uc3Qgcm93OiBhbnkgPSB7fTtcbiAgICBjb25zdCByb3dDb250cm9scyA9IFtdO1xuICAgIHJvdy5jb250cm9scyA9IHt9O1xuICAgIHJvdy5fZWRpdGluZyA9IHt9O1xuICAgIHJvdy5yb3dJZCA9IHRoaXMuX3Jvd3MubGVuZ3RoICsgMTtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXG4gICAgICBjb25zdCBjb250cm9sID0gY29sdW1uLmVkaXRvckNvbmZpZ1xuICAgICAgICA/IENvbnRyb2xGYWN0b3J5LmNyZWF0ZShjb2x1bW4uZWRpdG9yVHlwZSwgY29sdW1uLmVkaXRvckNvbmZpZylcbiAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcbiAgICAgIGNvbnRyb2wudmFsdWUgPSBudWxsOyAvLyByZW1vdmUgY29waWVkIGNvbHVtbiB2YWx1ZVxuICAgICAgcm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXSA9IGNvbnRyb2w7XG4gICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gIWNvbHVtbi52aWV3T25seTtcbiAgICAgIHJvd0NvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgfSk7XG4gICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgZGVmYXVsdFZhbHVlLCBmYWxzZSk7XG4gICAgdGFibGVGb3JtUm93cy5wdXNoKHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHJvd0NvbnRyb2xzKSk7XG4gICAgdGhpcy5fcm93cy5wdXNoKHJvdyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFZhbGlkYXRlcyB0aGUgRm9ybSBpbnNpZGUgb2YgdGhlIFRhYmxlLCBpZiB0aGVyZSBhcmUgZXJyb3JzIGl0IHdpbGwgZGlzcGxheS9yZXR1cm4gdGhlIGVycm9ycyBmb3IgZWFjaCByb3cuXG4gICAqIElmIHRoZXJlIGFyZSBubyBlcnJvcnMsIHRoZW4gaXQgd2lsbCByZXR1cm4gT05MWSB0aGUgY2hhbmdlZCBkYXRhIGZvciBlYWNoIHJvdywgdGhlIGRhdGEgcmV0dXJuZWQgd2lsbCBiZSBpbiB0aGUgZm9ybTpcbiAgICogeyBpZDogSURfT0ZfUkVDT1JELCBrZXk6IHZhbHVlIH0gLS0gZGF0YSB0aGF0IHdhcyB1cGRhdGVkXG4gICAqIHsgaWQ6IHVuZGVmaW5lZCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgYWRkZWRcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHZhbGlkYXRlQW5kR2V0VXBkYXRlZERhdGEoKTogeyBjaGFuZ2VkPzogYW55W107IGVycm9ycz86IHsgZXJyb3JzOiBhbnk7IHJvdzogYW55OyBpbmRleDogbnVtYmVyIH1bXSB9IHtcbiAgICBpZiAodGhpcy50YWJsZUZvcm0gJiYgdGhpcy50YWJsZUZvcm0uY29udHJvbHMgJiYgdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cykge1xuICAgICAgY29uc3QgY2hhbmdlZFJvd3MgPSBbXTtcbiAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgLy8gR28gb3ZlciB0aGUgRm9ybUFycmF5J3MgY29udHJvbHNcbiAgICAgICh0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheSkuY29udHJvbHMuZm9yRWFjaCgoZm9ybUdyb3VwOiBGb3JtR3JvdXAsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgbGV0IGNoYW5nZWRSb3cgPSBudWxsO1xuICAgICAgICBsZXQgZXJyb3IgPSBudWxsO1xuICAgICAgICAvLyBHbyBvdmVyIHRoZSBmb3JtIGdyb3VwIGNvbnRyb2xzXG4gICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW2tleV07XG4gICAgICAgICAgLy8gSGFuZGxlIHZhbHVlIGNoYW5naW5nXG4gICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5kaXJ0eSAmJiAhY29udHJvbC5lcnJvcnMpIHtcbiAgICAgICAgICAgIGlmICghY2hhbmdlZFJvdykge1xuICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIElELCBzbyB3ZSBoYXZlIHNvbWUga2V5IHRvIHNhdmUgYWdhaW5zdFxuICAgICAgICAgICAgICBjaGFuZ2VkUm93ID0ge307XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9yb3dzW2luZGV4XS5pZCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRSb3cuaWQgPSB0aGlzLl9yb3dzW2luZGV4XS5pZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgZGlydHksIGdyYWIgdmFsdWUgb2ZmIHRoZSBmb3JtXG4gICAgICAgICAgICBjaGFuZ2VkUm93W2tleV0gPSB0aGlzLnRhYmxlRm9ybS5nZXRSYXdWYWx1ZSgpLnJvd3NbaW5kZXhdW2tleV07XG4gICAgICAgICAgICAvLyBTZXQgdmFsdWUgYmFjayB0byByb3cgKHNob3VsZCBiZSBhbHJlYWR5IGRvbmUgdmlhIHRoZSBzZXJ2ZXIgY2FsbCwgYnV0IGRvIGl0IGFueXdheSlcbiAgICAgICAgICAgIHRoaXMuX3Jvd3NbaW5kZXhdW2tleV0gPSBjaGFuZ2VkUm93W2tleV07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb250cm9sICYmIGNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JzXG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIGVycm9yID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvcltrZXldID0gY29udHJvbC5lcnJvcnM7XG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hhbmdlZFJvdykge1xuICAgICAgICAgIGNoYW5nZWRSb3dzLnB1c2goY2hhbmdlZFJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goeyBlcnJvcnM6IGVycm9yLCByb3c6IHRoaXMuX3Jvd3NbaW5kZXhdLCBpbmRleCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBSZXR1cm4gZXJyb3JzIGlmIGFueSwgb3RoZXJ3aXNlIHJldHVybiB0aGUgY2hhbmdlZCByb3dzXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4geyBjaGFuZ2VkOiBjaGFuZ2VkUm93cyB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZXJyb3JzIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGNhbmNlbEVkaXRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZUVkaXRNb2RlKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHNhdmVDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmVFZGl0TW9kZShmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERpc3BsYXlzIGEgdG9hc3QgbWVzc2FnZSBpbnNpZGUgb2YgdGhlIHRhYmxlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBkaXNwbGF5VG9hc3RNZXNzYWdlKHRvYXN0OiB7IGljb246IHN0cmluZzsgdGhlbWU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH0sIGhpZGVEZWxheT86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMudG9hc3QgPSB0b2FzdDtcbiAgICBpZiAoaGlkZURlbGF5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpLCBoaWRlRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRm9yY2UgaGlkZSB0aGUgdG9hc3QgbWVzc2FnZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgaGlkZVRvYXN0TWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0ID0gbnVsbDtcbiAgICAvLyBIYWNrIHRvIG1ha2UgdGhlIHRhYmxlIGRpc3BsYXkgcHJvcGVybHkgYWZ0ZXIgaGlkaW5nIHRoZSB0b2FzdFxuICAgIHRoaXMuZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdCA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gZGlzcGxheSB0aGUgbG9hZGluZyBvdmVybGF5IG9uIHRoZSB0YWJsZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgdG9nZ2xlTG9hZGluZyhzaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gc2hvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gaGlkZSBhIGNvbHVtbiBpbiBlZGl0IG9yIHZpZXcgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgaXNDb2x1bW5IaWRkZW4oY29sdW1uOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0aW5nID8gISFjb2x1bW4uaGlkZUNvbHVtbk9uRWRpdCA6ICEhY29sdW1uLmhpZGVDb2x1bW5PblZpZXc7XG4gIH1cbn1cbiJdfQ==