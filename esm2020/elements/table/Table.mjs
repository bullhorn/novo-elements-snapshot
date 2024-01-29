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
      <novo-form hideHeader="true" [form]="tableForm">
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
                    [form]="getRowControlForm(i)"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    condensed="true"
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
      <novo-form hideHeader="true" [form]="tableForm">
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
                    [form]="getRowControlForm(i)"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    condensed="true"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSixPQUFPLEVBQThCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixTQUFTO0FBQ1QsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0J6RiwrR0FBK0c7QUFDL0csTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtBQUNWLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQXFWRCxNQUFNLE9BQU8sZ0JBQWdCO0lBNkszQixZQUFtQixNQUF3QixFQUFVLFNBQW9CLEVBQVUsT0FBb0IsRUFBVSxHQUFzQjtRQUFwSCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFVLGNB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TixLQUFLO3NCQURKLEtBQUs7Z0JBR04sc0JBQXNCO3NCQURyQixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sYUFBYTtzQkFEWixLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFJTixVQUFVO3NCQURULE1BQU07Z0JBR1AsV0FBVztzQkFEVixNQUFNO2dCQUdQLGFBQWE7c0JBRFosTUFBTTtnQkE0QkgsSUFBSTtzQkFEUCxLQUFLO2dCQWlCRixZQUFZO3NCQURmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4sIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1BcnJheSwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgc3RhcnRPZlRvZGF5LCBzdGFydE9mVG9tb3Jyb3cgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBBUFBcbmltcG9ydCB7IENvbGxlY3Rpb25FdmVudCwgTm92b0xhYmVsU2VydmljZSwgUGFnZWRBcnJheUNvbGxlY3Rpb24gfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVVdGlsLCBIZWxwZXJzLCBub3RpZnkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IENvbnRyb2xGYWN0b3J5LCBGb3JtVXRpbHMsIFJlYWRPbmx5Q29udHJvbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZm9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b1RhYmxlQ29uZmlnIHtcbiAgLy8gUGFnaW5nIGNvbmZpZ1xuICBwYWdpbmc/OiB7XG4gICAgY3VycmVudDogbnVtYmVyOyAvLyBjdXJyZW50IHBhZ2VcbiAgICBpdGVtc1BlclBhZ2U6IG51bWJlcjsgLy8gaXRlbXMgcGVyIHBhZ2VcbiAgICBvblBhZ2VDaGFuZ2U6IEZ1bmN0aW9uOyAvLyBmdW5jdGlvbiB0byBoYW5kbGUgcGFnZSBjaGFuZ2luZ1xuICAgIHJvd09wdGlvbnM/OiB7IHZhbHVlOiBudW1iZXI7IGxhYmVsOiBzdHJpbmcgfVtdOyAvLyBwYWdlIG9wdGlvbnNcbiAgICBkaXNhYmxlUGFnZVNlbGVjdGlvbj86IGJvb2xlYW47IC8vIGRpc2FibGVzIHRoZSBwYWdlcyBmcm9tIGJlaW5nIHNlbGVjdGVkXG4gIH07XG4gIC8vIEZvb3RlciBjb25maWcgKHRvdGFsIGZvb3RlcilcbiAgZm9vdGVycz86IEFycmF5PHtcbiAgICBjb2x1bW5zOiBBcnJheTxzdHJpbmc+OyAvLyBzdHJpbmcgYXJyYXkgb2YgY29sdW1ucyB0byB0b3RhbFxuICAgIG1ldGhvZDogc3RyaW5nOyAvLyBtZXRob2QgdG8gdXNlIGZvciB0aGUgZm9vdGVyLCBTVU0gfCBBVkcsIGRlZmF1bHRzIHRvIFNVTVxuICAgIGxhYmVsQ29sdW1uOiBzdHJpbmc7IC8vIGNvbHVtbiB0byB1c2UgYXMgdGhlIFwidG90YWxcIiBsYWJlbFxuICAgIGxhYmVsOiBzdHJpbmc7IC8vIGxhYmVsIHRvIHVzZSBpbiB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gIH0+O1xuICAvLyBUT0RPOiBXaGVuIHRoZXNlIHR5cGVzIGFyZSBlbmZvcmNlZCBhcyBgYm9vbGVhbiB8IEZ1bmN0aW9uYCwgdGhlcmUncyBhIGxpbnQgZXJyb3IuIFRoYXQncyBhIGJ1Zy5cbiAgZmlsdGVyaW5nPzogYm9vbGVhbiB8IGFueTsgLy8gVHVybiBvbiBmaWx0ZXJpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3IgZmlsdGVyaW5nIGNhbGxiYWNrXG4gIHNvcnRpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIHNvcnRpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3Igc29ydGluZyBjYWxsYmFja1xuICBvcmRlcmluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiBvcmRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBvcmRlcmluZyBjYWxsYmFja1xuICByZXNpemluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiByZXNpemluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciByZXNpemluZyBjYWxsYmFja1xuICByb3dTZWxlY3Rpb25TdHlsZT86IHN0cmluZzsgLy8gUm93IHNlbGVjdGlvbiBzdHlsZSwgY2hlY2tib3ggb3Igcm93XG4gIHJvd1NlbGVjdD86IGJvb2xlYW47IC8vIFR1cm4gb24gcm93IHNlbGVjdGlvblxuICBoYXNEZXRhaWxzPzogYm9vbGVhbjsgLy8gVHVybiBvbiBkZXRhaWxzIHJvdyBmb3IgdGhlIHRhYmxlXG4gIGRldGFpbHNSZW5kZXJlcj86IGFueTsgLy8gUmVuZGVyZXIvY29tcG9uZW50IGZvciB0aGUgZGV0YWlscyByb3dcbiAgZXhwYW5kQWxsPzogYm9vbGVhbjsgLy8gc2hvdWxkIEFsbCBSb3dzIGJlIGV4cGFuZGVkIGJ5IGRlZmF1bHRcbiAgc2VsZWN0QWxsRW5hYmxlZD86IGJvb2xlYW47IC8vIEFsbG93cyB0aGUgdGFibGUsIHdoaWxlIGluIHNlbGVjdGlvbiBtb2RlIHRvIGhhdmUgYSBzZWxlY3QgYWxsIGF0IHRoZSB0b3Bcbn1cblxuLy8gVE9ETyAtIHN1cHBvcnQgKDEpIGNsaWNraW5nIGNlbGwgdG8gZWRpdCwgKDIpIGNsaWNraW5nIHJvdyB0byBlZGl0LCAoMykgYnV0dG9uIHRvIHRyaWdnZXIgZnVsbCB0YWJsZSB0byBlZGl0XG5leHBvcnQgZW51bSBOb3ZvVGFibGVNb2RlIHtcbiAgVklFVyA9IDEsXG4gIEVESVQgPSAyLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYmxlJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by10YWJsZScsXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gICAgJ1tjbGFzcy5lZGl0aW5nXSc6ICdtb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQnLFxuICAgICdbY2xhc3Mubm92by10YWJsZS1sb2FkaW5nXSc6ICdsb2FkaW5nJyxcbiAgfSxcbiAgLy8gZGlyZWN0aXZlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGhlYWRlciAqbmdJZj1cImNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxuICAgICAgICA8bm92by1wYWdpbmF0aW9uXG4gICAgICAgICAgKm5nSWY9XCJjb25maWcucGFnaW5nICYmICEoZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiAhZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSlcIlxuICAgICAgICAgIFtyb3dPcHRpb25zXT1cImNvbmZpZy5wYWdpbmcucm93T3B0aW9uc1wiXG4gICAgICAgICAgW2Rpc2FibGVQYWdlU2VsZWN0aW9uXT1cImNvbmZpZy5wYWdpbmcuZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIlxuICAgICAgICAgIFsocGFnZSldPVwiZGF0YVByb3ZpZGVyLnBhZ2VcIlxuICAgICAgICAgIFsoaXRlbXNQZXJQYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVNpemVcIlxuICAgICAgICAgIFt0b3RhbEl0ZW1zXT1cImRhdGFQcm92aWRlci50b3RhbFwiXG4gICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgPC9ub3ZvLXBhZ2luYXRpb24+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXRhYmxlLWxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyB8fCBkYXRhUHJvdmlkZXIuaXNMb2FkaW5nKClcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmc+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tdG9hc3QgKm5nSWY9XCJ0b2FzdFwiIFt0aGVtZV09XCJ0b2FzdD8udGhlbWVcIiBbaWNvbl09XCJ0b2FzdD8uaWNvblwiIFttZXNzYWdlXT1cInRvYXN0Py5tZXNzYWdlXCI+PC9ub3ZvLXRvYXN0PlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1jb250YWluZXJcIiAqbmdJZj1cIiFncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0XCI+XG4gICAgICA8bm92by1mb3JtIGhpZGVIZWFkZXI9XCJ0cnVlXCIgW2Zvcm1dPVwidGFibGVGb3JtXCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgZGF0YVRhYmxlXCIgW2NsYXNzLnRhYmxlLWRldGFpbHNdPVwiY29uZmlnLmhhc0RldGFpbHNcIiByb2xlPVwiZ3JpZFwiPlxuICAgICAgICAgIDwhLS0gc2tpcFNvcnRBbmRGaWx0ZXJDbGVhciBpcyBhIGhhY2sgcmlnaHQgbm93LCB3aWxsIGJlIHJlbW92ZWQgb25jZSBDYW52YXMgaXMgcmVmYWN0b3JlZCAtLT5cbiAgICAgICAgICA8dGhlYWQgKm5nSWY9XCJjb2x1bW5zLmxlbmd0aCAmJiAoIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSB8fCBza2lwU29ydEFuZEZpbHRlckNsZWFyIHx8IGVkaXRpbmcpXCI+XG4gICAgICAgICAgICA8dHIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8IS0tIERFVEFJTFMgLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zXCIgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJuZXh0XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhY29uZmlnLmV4cGFuZEFsbFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJleHBhbmQtYWxsXCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwic29ydC1kZXNjXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNvbGxhcHNlLWFsbFwiXG4gICAgICAgICAgICAgICAgPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDwhLS0gQ0hFQ0tCT1ggLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zIGNoZWNrYm94IG1hc3MtYWN0aW9uXCIgKm5nSWY9XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCdcIj5cbiAgICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXN0ZXJcIlxuICAgICAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwicGFnZVNlbGVjdGVkLmxlbmd0aCA+IDAgJiYgcGFnZVNlbGVjdGVkLmxlbmd0aCA8IHBhZ2VkRGF0YS5sZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2VsZWN0UGFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlbGVjdC1hbGwtY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBdPVwibWFzdGVyID8gbGFiZWxzLmRlc2VsZWN0QWxsIDogbGFiZWxzLnNlbGVjdEFsbE9uUGFnZVwiXG4gICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPCEtLSBUQUJMRSBIRUFERVJTIC0tPlxuICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICdtYXNzLWFjdGlvbic6IGNvbmZpZz8ucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICBhY3Rpb25zOiBjb2x1bW4/LmFjdGlvbnM/Lml0ZW1zPy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgICAgcHJldmlldzogY29sdW1uPy5uYW1lID09PSAncHJldmlldydcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICBbbm92b1RoT3JkZXJhYmxlXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgKG9uT3JkZXJDaGFuZ2UpPVwib25PcmRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImlzQ29sdW1uSGlkZGVuKGNvbHVtbilcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRoLWdyb3VwXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZVwiICpuZ0lmPVwiIWNvbHVtbi5oaWRlSGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICA8IS0tIExBQkVMICYgU09SVCBBUlJPV1MgLS0+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGgtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJjb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgY29sdW1uLnNvcnRpbmcgIT09IGZhbHNlID8gJ3NvcnRhYmxlJyA6ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgW25vdm9UaFNvcnRhYmxlXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU29ydENoYW5nZSk9XCJvblNvcnRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD57eyBjb2x1bW4udGl0bGUgfHwgY29sdW1uLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtc29ydC1pY29uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnNvcnQgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLnNvcnRpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5zb3J0aW5nICE9PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy11cFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy1kb3duXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgRFJPUC1ET1dOIC0tPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tZHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgc2lkZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5maWx0ZXJpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5maWx0ZXJpbmcgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjb2x1bW4tZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICh0b2dnbGVkKT1cIm9uRHJvcGRvd25Ub2dnbGVkKCRldmVudCwgY29sdW1uLm5hbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIudGFibGUtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xhc3M9XCJ0YWJsZS1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZpbHRlcmVkXT1cImNvbHVtbi5maWx0ZXIgfHwgY29sdW1uLmZpbHRlciA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJmb2N1c0lucHV0KClcIlxuICAgICAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgT1BUSU9OUyBMSVNUIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cFxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY29sdW1uPy5vcHRpb25zPy5sZW5ndGggfHwgY29sdW1uPy5vcmlnaW5hbE9wdGlvbnM/Lmxlbmd0aCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbj8udHlwZSAhPT0gJ2RhdGUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImZpbHRlci1zZWFyY2hcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT1cImRpYWxvZ3VlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPVwidGltZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhIWNvbHVtbi5hbGxvd0N1c3RvbVRleHRPcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJLZXl3b3JkcygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZnJlZXRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZWVwRmlsdGVyRm9jdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbikgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj4gPGkgY2xhc3M9XCJiaGktY2hlY2tcIiAqbmdJZj1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIFNFQVJDSCBJTlBVVCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCIhKGNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoIHx8IGNvbHVtbj8ub3JpZ2luYWxPcHRpb25zPy5sZW5ndGgpICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIgbm92b0luZXJ0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cInRpbWVzXCIgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBGaWx0ZXJGb2N1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIERBVEUgT1BUSU9OUyAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCJjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCAmJiBjb2x1bW4/LnR5cGUgPT09ICdkYXRlJyAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiICpuZ0lmPVwiIWNvbHVtbi5jYWxlbmRlclNob3dcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwidGltZXNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2x1bW4ub3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25GaWx0ZXJDbGljayhjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2tlZXBPcGVuXT1cIm9wdGlvbi5yYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImNvbHVtbi5jYWxlbmRlclNob3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvU3VmZml4IGNvbG9yPVwicG9zaXRpdmVcIiAqbmdJZj1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiPmNoZWNrPC9ub3ZvLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJjYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cImNvbHVtbi5jYWxlbmRlclNob3dcIiBrZWVwT3BlbiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1zdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2stbGlua1wiIChjbGljayk9XCJjb2x1bW4uY2FsZW5kZXJTaG93ID0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT57eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25DYWxlbmRlclNlbGVjdChjb2x1bW4sICRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1zdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICA8L25vdm8tZHJvcGRvd24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIC0tPlxuICAgICAgICAgIDx0Ym9keSAqbmdJZj1cIiFkYXRhUHJvdmlkZXIuaXNFbXB0eSgpIHx8IGVkaXRpbmdcIj5cbiAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyAmJiBzaG93U2VsZWN0QWxsTWVzc2FnZSAmJiBjb25maWcuc2VsZWN0QWxsRW5hYmxlZFwiXG4gICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICB7eyBsYWJlbHMuc2VsZWN0ZWRSZWNvcmRzKHNlbGVjdGVkLmxlbmd0aCkgfX1cbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwic2VsZWN0QWxsKHRydWUpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiYWxsLW1hdGNoaW5nLXJlY29yZHNcIj57eyBsYWJlbHMudG90YWxSZWNvcmRzKGRhdGFQcm92aWRlci50b3RhbCkgfX08L2E+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3c9XCIkaW1wbGljaXRcIiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwicm93c1wiPlxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXJvd1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwicm93LmN1c3RvbUNsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwibmFtZSArICctJyArIHJvd1tyb3dJZGVudGlmaWVyXVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInJvdy5pZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJvd0NsaWNrSGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInJvdy5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cIm5leHRcIiAoY2xpY2spPVwicm93Ll9leHBhbmRlZCA9ICFyb3cuX2V4cGFuZGVkXCIgKm5nSWY9XCIhcm93Ll9leHBhbmRlZFwiPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInNvcnQtZGVzY1wiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkID0gIXJvdy5fZXhwYW5kZWRcIiAqbmdJZj1cInJvdy5fZXhwYW5kZWRcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3hcIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJyb3cuX3NlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwicm93U2VsZWN0SGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LXJvdy1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3Mubm92by1mb3JtLXJvd109XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImlzQ29sdW1uSGlkZGVuKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLXRhYmxlLWNlbGxcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgIXJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgICBbaGFzRWRpdG9yXT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tdGFibGUtY2VsbD5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbmRlbnNlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybV09XCJnZXRSb3dDb250cm9sRm9ybShpKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb250cm9sXT1cInJvdy5jb250cm9sc1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgPjwvbm92by1jb250cm9sPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZGV0YWlscy1yb3dcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmhhc0RldGFpbHNcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiIXJvdy5fZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZGV0YWlscy1yb3ctJyArIHJvdy5pZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyb3ctYWN0aW9uc1wiPjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnID8gY29sdW1ucy5sZW5ndGggKyAxIDogY29sdW1ucy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLXJvdy1kZXRhaWxzIFtkYXRhXT1cInJvd1wiIFtyZW5kZXJlcl09XCJjb25maWcuZGV0YWlsc1JlbmRlcmVyXCI+PC9ub3ZvLXJvdy1kZXRhaWxzPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBOTyBUQUJMRSBEQVRBIFBMQUNFSE9MREVSIC0tPlxuICAgICAgICAgIDx0Ym9keVxuICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCJcbiAgICAgICAgICAgICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiAhZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSAmJiAhZWRpdGluZ1wiXG4gICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS10YWJsZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNlbXB0eW1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLWVtcHR5LW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJlbXB0eW1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLmVtcHR5VGFibGVNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIE5PIE1BVENISU5HIFJFQ09SRFMgLS0+XG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwidGFibGUtbWVzc2FnZVwiICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiBkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktdGFibGVcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjbm9tYXRjaG1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLW5vLW1hdGNoaW5nLXJlY29yZHMtbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vLW1hdGNoaW5nLXJlY29yZHNcIiAqbmdJZj1cIm5vbWF0Y2htZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5ub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gVEFCTEUgREFUQSBFUlJPUiBQTEFDRUhPTERFUiAtLT5cbiAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCIgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaGFzRXJyb3JzKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJ0YWJsZS1lcnJvcnNcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjZXJyb3JtZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1lcnJvci1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiZXJyb3JtZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1jYXV0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZXJyb3JlZFRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPHRmb290ICpuZ0lmPVwiIWNvbmZpZy5mb290ZXJzXCIgW25nQ2xhc3NdPVwiZGF0YVByb3ZpZGVyLmxlbmd0aCAlIDIgPT0gMCA/ICdvZGQnIDogJ2V2ZW4nXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rmb290PlxuICAgICAgICAgIDx0Zm9vdCAqbmdGb3I9XCJsZXQgZm9vdGVyIG9mIGZvb3RlcnM7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cIm5vdm8tdGFibGUtdG90YWwtZm9vdGVyXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiKGNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZSkgKyAnLXRvdGFsLScgKyBpXCI+XG4gICAgICAgICAgICAgICAge3sgZm9vdGVyW2NvbHVtbi5uYW1lXSB9fVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rmb290PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9ub3ZvLWZvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL1RhYmxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlRWxlbWVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBAVmlld0NoaWxkcmVuKCdmaWx0ZXJJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICBmaWx0ZXJJbnB1dHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBASW5wdXQoKVxuICBjb25maWc6IE5vdm9UYWJsZUNvbmZpZyA9IHt9O1xuICBASW5wdXQoKVxuICBjb2x1bW5zOiBBcnJheTxhbnk+ID0gW107XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNraXBTb3J0QW5kRmlsdGVyQ2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbW9kZTogTm92b1RhYmxlTW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcbiAgQElucHV0KClcbiAgZWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcm93SWRlbnRpZmllcjogc3RyaW5nID0gJ2lkJztcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gJ3RhYmxlJztcblxuICBAT3V0cHV0KClcbiAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblRhYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZGF0YVByb3ZpZGVyOiBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+O1xuICBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RlZDogQXJyYXk8YW55PiA9IFtdO1xuICBhY3RpdmVJZDogbnVtYmVyID0gMDtcbiAgbWFzdGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIGxhc3RQYWdlOiBudW1iZXIgPSAwO1xuICBzZWxlY3RlZFBhZ2VDb3VudDogbnVtYmVyID0gMDtcbiAgc2hvd1NlbGVjdEFsbE1lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY3VycmVudFNvcnRDb2x1bW46IGFueTtcbiAgcGFnZWREYXRhOiBBcnJheTxhbnk+ID0gW107XG4gIHBhZ2VTZWxlY3RlZDogYW55O1xuICAvLyBNYXAgdG8ga2VlcCB0cmFjayBvZiB3aGF0IGRyb3Bkb3ducyBhcmUgdG9nZ2xlZFxuICAvLyBVc2VkIHRvIHByb3Blcmx5ICpuZ0lmIHRoZSA8bm92by1vcHRncm91cD4gc28gdGhhdCB0aGUga2VlcEZpbHRlckZvY3VzZWQgRGlyZWN0aXZlXG4gIC8vIHdpbGwgcHJvcGVybHkgZmlyZSB0aGUgbmdBZnRlclZpZXdJbml0IGV2ZW50XG4gIHRvZ2dsZWREcm9wZG93bk1hcDogYW55ID0ge307XG4gIHB1YmxpYyBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZTtcbiAgcHVibGljIHRhYmxlRm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gIHB1YmxpYyB0b2FzdDogeyB0aGVtZTogc3RyaW5nOyBpY29uOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9O1xuICBwdWJsaWMgZm9vdGVycyA9IFtdO1xuICBwdWJsaWMgZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHJvd3M6IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLmRhdGFQcm92aWRlciA9IHJvd3M7XG4gICAgaWYgKHJvd3MgJiYgcm93cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldHVwQ29sdW1uRGVmYXVsdHMoKTtcbiAgICB9XG4gICAgLy8gdGhpcyBpcyBhIHRlbXBvcmFyeS9oYWNreSBmaXggdW50aWwgYXN5bmMgZGF0YWxvYWRpbmcgaXMgaGFuZGxlZCB3aXRoaW4gdGhlIHRhYmxlXG4gICAgaWYgKCF0aGlzLnNraXBTb3J0QW5kRmlsdGVyQ2xlYXIpIHtcbiAgICAgIHRoaXMuY2xlYXJBbGxTb3J0QW5kRmlsdGVycygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGFQcm92aWRlcihkcDogYW55KSB7XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyID0gQXJyYXkuaXNBcnJheShkcCkgPyBuZXcgUGFnZWRBcnJheUNvbGxlY3Rpb248YW55PihkcCkgOiBkcDtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZS5waXBlKGRlYm91bmNlVGltZSgxMDApKS5zdWJzY3JpYmUoKGV2ZW50OiBDb2xsZWN0aW9uRXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICBjYXNlIENvbGxlY3Rpb25FdmVudC5DSEFOR0U6XG4gICAgICAgICAgdGhpcy5fcm93cyA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgLy8gU2V0dXAgZm9ybVxuICAgICAgICAgIHRoaXMudGFibGVGb3JtID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHJvd3M6IHRoaXMuYnVpbGRlci5hcnJheShbXSksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VkRGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEZpbmQgdGhhdCBjb2x1bW5zIHdlIG1pZ2h0IG5lZWQgdG8gc3VtIHVwIHZpYSB0aGUgZm9vdGVyXG4gICAgICAgICAgbGV0IGNvbHVtbnNUb1N1bSA9IFtdO1xuICAgICAgICAgIGNvbnN0IGNvbHVtblN1bXMgPSB7fTtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuZm9vdGVycykge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuZm9vdGVycy5mb3JFYWNoKChjb25maWcpID0+IHtcbiAgICAgICAgICAgICAgY29sdW1uc1RvU3VtLnB1c2goLi4uY29uZmlnLmNvbHVtbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBPbmx5IGhhdmUgdW5pcXVlIGNvbHVtbnMsIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICAgICAgY29sdW1uc1RvU3VtID0gY29sdW1uc1RvU3VtLmZpbHRlcigoaXRlbSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKGl0ZW0pID09PSBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1ha2UgYSBmb3JtIGZvciBlYWNoIHJvd1xuICAgICAgICAgIGNvbnN0IHRhYmxlRm9ybVJvd3MgPSB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheTtcbiAgICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XG4gICAgICAgICAgICByb3cuY29udHJvbHMgPSB7fTtcbiAgICAgICAgICAgIHJvdy5fZWRpdGluZyA9IHt9O1xuICAgICAgICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcbiAgICAgICAgICAgIHJvdy5yb3dJZCA9IHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb2x1bW4uZWRpdG9yQ29uZmlnXG4gICAgICAgICAgICAgICAgPyBDb250cm9sRmFjdG9yeS5jcmVhdGUoY29sdW1uLmVkaXRvclR5cGUsIGNvbHVtbi5lZGl0b3JDb25maWcpXG4gICAgICAgICAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcbiAgICAgICAgICAgICAgcm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXSA9IGNvbnRyb2w7XG4gICAgICAgICAgICAgIHJvd0NvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMocm93Q29udHJvbHMsIHJvdywgZmFsc2UpO1xuICAgICAgICAgICAgdGFibGVGb3JtUm93cy5wdXNoKHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHJvd0NvbnRyb2xzKSk7XG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgdG90YWwgZm9vdGVyIGlmIGNvbmZpZ3VyZWRcbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGtleXMgdG8gdG90YWxcbiAgICAgICAgICAgIGlmIChjb2x1bW5zVG9TdW0ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIGNvbHVtbnNUb1N1bS5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbHVtblN1bXNbY29sdW1uXSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtblN1bXNbY29sdW1uXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtblN1bXNbY29sdW1uXSArPSByb3dbY29sdW1uXTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTm92b1RhYmxlTW9kZS5FRElUKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRhYmxlRWRpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTZXR1cCB0aGUgZm9vdGVycyAoaWYgYW55KVxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmZvb3RlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmZvb3RlcnMuZm9yRWFjaCgoZm9vdGVyQ29uZmlnLCBmb290ZXJDb25maWdJbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb290ZXIgPSB7fTtcbiAgICAgICAgICAgICAgZm9vdGVyW2Zvb3RlckNvbmZpZy5sYWJlbENvbHVtbl0gPSBmb290ZXJDb25maWcubGFiZWw7XG4gICAgICAgICAgICAgIGZvb3RlckNvbmZpZy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmb290ZXJDb25maWcubWV0aG9kID09PSAnQVZHJyAmJiB0aGlzLl9yb3dzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl0gLyB0aGlzLl9yb3dzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5mb290ZXJzLnB1c2goZm9vdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50O1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gdGhpcy5jb25maWcucGFnaW5nLml0ZW1zUGVyUGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFnaW5nIHR1cm5lZCBvZmYsIHJldHVybiBiYXNpY2FsbHkgYWxsIG9mIHRoZSBkYXRhXG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IDE7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSA1MDA7XG4gICAgfVxuICAgIGlmIChkcCAmJiBkcC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldHVwQ29sdW1uRGVmYXVsdHMoKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLnJlZnJlc2goKTtcbiAgfVxuICBnZXQgZGF0YVByb3ZpZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhUHJvdmlkZXI7XG4gIH1cblxuICBnZXQgZWRpdGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQ7XG4gIH1cblxuICBnZXQgZm9ybVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnRhYmxlRm9ybS5nZXRSYXdWYWx1ZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBmb3JtVXRpbHM6IEZvcm1VdGlscywgcHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgbm90aWZ5KCdbRGVwcmVjYXRlZF06IFRoZSB0YWJsZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgbWlncmF0ZSB0byBub3ZvLWRhdGEtdGFibGVzIScpO1xuICB9XG5cbiAgb25Ecm9wZG93blRvZ2dsZWQoZXZlbnQsIGNvbHVtbik6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbl0gPSBldmVudDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGZvY3VzSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlsdGVySW5wdXRzICYmIHRoaXMuZmlsdGVySW5wdXRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dHMuZm9yRWFjaCgoZmlsdGVySW5wdXQpID0+IHtcbiAgICAgICAgaWYgKGZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFnZUNoYW5nZShldmVudCkge1xuICAgIC8vIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2UgPSBldmVudC5wYWdlO1xuICAgIC8vIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gZXZlbnQuaXRlbXNQZXJQYWdlO1xuICB9XG5cbiAgZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhvcHRpb24udmFsdWUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9uLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgc2V0dXBDb2x1bW5EZWZhdWx0cygpIHtcbiAgICAvLyBDaGVjayBjb2x1bW5zIGZvciBjZWxsIG9wdGlvbiB0eXBlc1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnR5cGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgLy8gU2V0IG9wdGlvbnMgYmFzZWQgb24gZGF0ZXMgaWYgdGhlcmUgYXJlIG5vbmVcbiAgICAgICAgICAgIGNvbHVtbi5vcHRpb25zID0gY29sdW1uLm9wdGlvbnMgfHwgdGhpcy5nZXREZWZhdWx0T3B0aW9ucyhjb2x1bW4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZyAmJiB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCAhPT0gdGhpcy5sYXN0UGFnZSkge1xuICAgICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMubGFzdFBhZ2UgPSB0aGlzLmNvbmZpZy5wYWdpbmcgPyB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA6IDE7XG4gIH1cblxuICBnZXRQYWdlU3RhcnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnaW5nID8gKHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2UgLSAxKSAqIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplIDogMDtcbiAgfVxuXG4gIGdldFBhZ2VFbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplID4gLTEgPyB0aGlzLmdldFBhZ2VTdGFydCgpICsgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiB0aGlzLnJvd3MubGVuZ3RoO1xuICB9XG5cbiAgZ2V0Um93Q29udHJvbEZvcm0oaSk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgIHJldHVybiB0YWJsZUZvcm1Sb3dzLmNvbnRyb2xzW2ldO1xuICB9XG5cbiAgb25GaWx0ZXJDbGljayhjb2x1bW4sIGZpbHRlcikge1xuICAgIGlmIChmaWx0ZXIucmFuZ2UgJiYgIWNvbHVtbi5jYWxlbmRhclNob3cpIHtcbiAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSAmJiBjb2x1bW4ubXVsdGlwbGUpIHtcbiAgICAgIGlmICh+Y29sdW1uLmZpbHRlci5pbmRleE9mKGZpbHRlcikpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGZpbHRlclxuICAgICAgICBjb2x1bW4uZmlsdGVyLnNwbGljZShjb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSwgMSk7XG4gICAgICAgIGlmIChmaWx0ZXIucmFuZ2UpIHtcbiAgICAgICAgICBjb2x1bW4uY2FsZW5kZXJTaG93ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sdW1uLmZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWRkIGZpbHRlclxuICAgICAgICBjb2x1bW4uZmlsdGVyLnB1c2goZmlsdGVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbHVtbi5tdWx0aXBsZSkge1xuICAgICAgY29sdW1uLmZpbHRlciA9IG5ldyBBcnJheSgpO1xuICAgICAgY29sdW1uLmZpbHRlci5wdXNoKEhlbHBlcnMuaXNCbGFuayhmaWx0ZXIudmFsdWUpID8gZmlsdGVyIDogZmlsdGVyLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uLmZpbHRlciA9IEhlbHBlcnMuaXNCbGFuayhmaWx0ZXIudmFsdWUpID8gZmlsdGVyIDogZmlsdGVyLnZhbHVlO1xuICAgIH1cbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICBvbkZpbHRlckNsZWFyKGNvbHVtbjogYW55KTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgIGNvbHVtbi5mcmVldGV4dEZpbHRlciA9IG51bGw7XG4gICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gICAgICBpZiAoY29sdW1uLm9yaWdpbmFsT3B0aW9ucykge1xuICAgICAgICBjb2x1bW4ub3B0aW9ucyA9IGNvbHVtbi5vcmlnaW5hbE9wdGlvbnM7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjbGVhckFsbFNvcnRBbmRGaWx0ZXJzKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5maWx0ZXJpbmcpIHtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgY29sdW1uLmZpbHRlciA9IG51bGw7XG4gICAgICAgIGNvbHVtbi5zb3J0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgdXBkYXRlcyB0aGUgcm93IGRhdGEgdG8gcmVmbGVjdCB0aGUgYWN0aXZlIGZpbHRlcnMuXG4gICAqL1xuICBvbkZpbHRlckNoYW5nZShldmVudD86IEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xuICAgICAgLy8gQXJyYXkgb2YgZmlsdGVyc1xuICAgICAgY29uc3QgZmlsdGVycyA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKGNvbCkgPT4gIUhlbHBlcnMuaXNFbXB0eShjb2wuZmlsdGVyKSk7XG4gICAgICBpZiAoZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGZpbHRlcnMpIHtcbiAgICAgICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5tYXRjaCkpIHtcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9ICh2YWx1ZSwgcmVjb3JkKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2x1bW4ubWF0Y2gocmVjb3JkLCBjb2x1bW4uZmlsdGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4ucHJlRmlsdGVyICYmIEhlbHBlcnMuaXNGdW5jdGlvbihjb2x1bW4ucHJlRmlsdGVyKSkge1xuICAgICAgICAgICAgcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwgY29sdW1uLnByZUZpbHRlcih0aGlzLmVzY2FwZUNoYXJhY3RlcnMoY29sdW1uLmZpbHRlcikpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikpIHtcbiAgICAgICAgICAgIC8vIFRoZSBmaWx0ZXJzIGFyZSBhbiBhcnJheSAobXVsdGktc2VsZWN0KSwgY2hlY2sgdmFsdWVcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gY29sdW1uLmZpbHRlcjtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYW4gYXJyYXkgb2Yge3ZhbHVlOiAnJywgbGFiZWxzOiAnJ31cbiAgICAgICAgICAgIGlmIChvcHRpb25zWzBdLnZhbHVlIHx8IG9wdGlvbnNbMF0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgb3B0aW9ucyA9IGNvbHVtbi5maWx0ZXIubWFwKChvcHQpID0+IG9wdC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7IGFueTogb3B0aW9ucyB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLnR5cGUgJiYgY29sdW1uLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXIuc3RhcnREYXRlICYmIGNvbHVtbi5maWx0ZXIuZW5kRGF0ZSkge1xuICAgICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgbWluOiBEYXRlVXRpbC5zdGFydE9mRGF5KGNvbHVtbi5maWx0ZXIuc3RhcnREYXRlKSxcbiAgICAgICAgICAgICAgICBtYXg6IERhdGVVdGlsLnN0YXJ0T2ZEYXkoRGF0ZVV0aWwuYWRkRGF5cyhEYXRlVXRpbC5zdGFydE9mRGF5KGNvbHVtbi5maWx0ZXIuZW5kRGF0ZSksIDEpKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICBtaW46IGNvbHVtbi5maWx0ZXIubWluID8gRGF0ZVV0aWwuYWRkRGF5cyhzdGFydE9mVG9kYXkoKSwgY29sdW1uLmZpbHRlci5taW4pIDogc3RhcnRPZlRvZGF5KCksXG4gICAgICAgICAgICAgICAgbWF4OiBjb2x1bW4uZmlsdGVyLm1heCA/IERhdGVVdGlsLmFkZERheXMoc3RhcnRPZlRvbW9ycm93KCksIGNvbHVtbi5maWx0ZXIubWF4KSA6IHN0YXJ0T2ZUb21vcnJvdygpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSBjb2x1bW4uZmlsdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLmZpbHRlcmluZykpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5maWx0ZXJpbmcocXVlcnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5maWx0ZXIgPSBxdWVyeTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmZpbHRlciA9IHt9O1xuICAgICAgfVxuICAgICAgLy8gVHJpY2tsZSBkb3duIHRvIGtlZXAgc29ydFxuICAgICAgLy8gdGhpcy5vblNvcnRDaGFuZ2UodGhpcy5jdXJyZW50U29ydENvbHVtbik7XG4gICAgICB0aGlzLmZpcmVUYWJsZUNoYW5nZUV2ZW50KCk7XG5cbiAgICAgIC8vIElmIHBhZ2luZywgcmVzZXQgcGFnZVxuICAgICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZykge1xuICAgICAgICB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IDE7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlQ2hhcmFjdGVycyhmaWx0ZXIpIHtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmaWx0ZXIucmVwbGFjZSgvJy9nLCBcIicnXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG5cbiAgaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAvLyBUT0RPOiBUaGlzIG5lZWRzIHRvIGJlIHJlZmFjdG9yZWRcbiAgICBsZXQgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICBpZiAoY29sdW1uICYmICFIZWxwZXJzLmlzQmxhbmsoY29sdW1uLmZpbHRlcikgJiYgIUhlbHBlcnMuaXNCbGFuayhmaWx0ZXIpKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSkge1xuICAgICAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubGFiZWwgPT09IGZpbHRlci5sYWJlbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIuaW5jbHVkZXMoZmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4uZmlsdGVyID09PSB0eXBlb2YgZmlsdGVyKSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyID09PSBmaWx0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyID09PSBmaWx0ZXIudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzQWN0aXZlO1xuICB9XG5cbiAgb25Tb3J0Q2hhbmdlKGNvbHVtbikge1xuICAgIHRoaXMuY3VycmVudFNvcnRDb2x1bW4gPSBjb2x1bW47XG4gICAgY29uc3Qgc29ydGVkQ29sdW1uczogYW55ID0gdGhpcy5jb2x1bW5zLmZpbHRlcigodGhpc0NvbHVtbikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXNDb2x1bW4uc29ydCAmJiB0aGlzQ29sdW1uICE9PSB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uO1xuICAgIH0pO1xuICAgIGZvciAoY29uc3Qgc29ydGVkQ29sdW1uIG9mIHNvcnRlZENvbHVtbnMpIHtcbiAgICAgIHNvcnRlZENvbHVtbi5zb3J0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY29sdW1uKSB7XG4gICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLnNvcnRpbmcpKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnNvcnRpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5wcmVTb3J0KSkge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuc29ydCA9IFtdLmNvbmNhdChjb2x1bW4ucHJlU29ydChjb2x1bW4pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5zb3J0ID0gW3sgZmllbGQ6IGNvbHVtbi5jb21wYXJlIHx8IGNvbHVtbi5uYW1lLCByZXZlcnNlOiBjb2x1bW4uc29ydCA9PT0gJ2Rlc2MnIH1dO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpcmUgdGFibGUgY2hhbmdlIGV2ZW50XG4gICAgLy8gdGhpcy5maXJlVGFibGVDaGFuZ2VFdmVudCgpO1xuXG4gICAgLy8gSWYgcGFnaW5nLCByZXNldCBwYWdlXG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZykge1xuICAgICAgdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQgPSAxO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbGwgc2VsZWN0aW9uIG9uIHNvcnQgY2hhbmdlIGlmIHNlbGVjdGlvbiBpcyBvblxuICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgdGhpcy5zZWxlY3RBbGwoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGZpcmVUYWJsZUNoYW5nZUV2ZW50KCkge1xuICAgIC8vIENvbnN0cnVjdCBhIHRhYmxlIGNoYW5nZSBvYmplY3RcbiAgICBjb25zdCBvblRhYmxlQ2hhbmdlOiBhbnkgPSB7fTtcbiAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5jb2x1bW5zLmZpbHRlcigoY29sKSA9PiBjb2wuZmlsdGVyICYmIGNvbC5maWx0ZXIubGVuZ3RoKTtcbiAgICBvblRhYmxlQ2hhbmdlLmZpbHRlciA9IGZpbHRlcnMubGVuZ3RoID8gZmlsdGVycyA6IGZhbHNlO1xuICAgIG9uVGFibGVDaGFuZ2Uuc29ydCA9IHRoaXMuY3VycmVudFNvcnRDb2x1bW4gPyB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uIDogZmFsc2U7XG4gICAgb25UYWJsZUNoYW5nZS5yb3dzID0gdGhpcy5yb3dzO1xuXG4gICAgLy8gRW1pdCBldmVudFxuICAgIHRoaXMub25UYWJsZUNoYW5nZS5lbWl0KG9uVGFibGVDaGFuZ2UpO1xuICB9XG5cbiAgZmluZENvbHVtbkluZGV4KHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzLmNvbHVtbnNbaV0ubmFtZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgb25PcmRlckNoYW5nZShldmVudCkge1xuICAgIGNvbnN0IG9sZEluZGV4ID0gdGhpcy5maW5kQ29sdW1uSW5kZXgoZXZlbnQuZmlyc3QubmFtZSk7XG4gICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLmZpbmRDb2x1bW5JbmRleChldmVudC5zZWNvbmQubmFtZSk7XG4gICAgdGhpcy5jb2x1bW5zLnNwbGljZShuZXdJbmRleCwgMCwgdGhpcy5jb2x1bW5zLnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgIHRoaXMub25Tb3J0Q2hhbmdlKHRoaXMuY3VycmVudFNvcnRDb2x1bW4pO1xuICB9XG5cbiAgZXhwYW5kQWxsT25QYWdlKGV4cGFuZGVkKSB7XG4gICAgdGhpcy5jb25maWcuZXhwYW5kQWxsID0gIWV4cGFuZGVkO1xuICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QpIHtcbiAgICAgIHJvdy5fZXhwYW5kZWQgPSB0aGlzLmNvbmZpZy5leHBhbmRBbGw7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0UGFnZShkYXRhPzogYW55KSB7XG4gICAgaWYgKCF0aGlzLm1hc3Rlcikge1xuICAgICAgdGhpcy5zZWxlY3RBbGwoZmFsc2UpO1xuICAgICAgLy8gT25seSBzaG93IHRoZSBzZWxlY3QgYWxsIG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBuZXcgcGFnZSBzZWxlY3RlZCBhdCBhIHRpbWVcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAvLyB0aGlzLnBhZ2VkRGF0YSA9IHRoaXMucm93cy5zbGljZSh0aGlzLmdldFBhZ2VTdGFydCgpLCB0aGlzLmdldFBhZ2VFbmQoKSk7XG4gICAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLnBhZ2VkRGF0YSkge1xuICAgICAgICByb3cuX3NlbGVjdGVkID0gdGhpcy5tYXN0ZXI7XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kYXRhUHJvdmlkZXIubGlzdC5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICB0aGlzLmVtaXRTZWxlY3RlZCh0aGlzLnNlbGVjdGVkKTtcbiAgICAgIC8vIE9ubHkgc2hvdyB0aGUgc2VsZWN0IGFsbCBtZXNzYWdlIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgbmV3IHBhZ2Ugc2VsZWN0ZWQgYXQgYSB0aW1lXG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50Kys7XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9PT0gMSAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCAhPT0gdGhpcy5kYXRhUHJvdmlkZXIudG90YWw7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHNlbGVjdEFsbCh2YWx1ZSkge1xuICAgIHRoaXMubWFzdGVyID0gdmFsdWU7XG4gICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5kYXRhUHJvdmlkZXIubGlzdCkge1xuICAgICAgcm93Ll9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWUgPyB0aGlzLmRhdGFQcm92aWRlci5saXN0IDogW107XG4gICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcbiAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgfVxuXG4gIHJvd1NlbGVjdEhhbmRsZXIoZGF0YT86IGFueSkge1xuICAgIC8vIHRoaXMucGFnZWREYXRhID0gdGhpcy5yb3dzLnNsaWNlKHRoaXMuZ2V0UGFnZVN0YXJ0KCksIHRoaXMuZ2V0UGFnZUVuZCgpKTtcbiAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGFQcm92aWRlci5saXN0LmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgIGlmICh0aGlzLnBhZ2VTZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubWFzdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZVNlbGVjdGVkLmxlbmd0aCA9PT0gdGhpcy5wYWdlZERhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hc3RlciA9IHRydWU7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXN0ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG5cbiAgICAgIC8vIEJyZWFraW5nIHRoZSBzZWxlY3RlZCBwYWdlIGNvdW50XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgfVxuICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMuc2VsZWN0ZWQpO1xuICB9XG5cbiAgZW1pdFNlbGVjdGVkKHNlbGVjdGVkKSB7XG4gICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgbGVuZ3RoOiBzZWxlY3RlZC5sZW5ndGgsIHNlbGVjdGVkIH0pO1xuICB9XG5cbiAgcm93Q2xpY2tIYW5kbGVyKHJvdykge1xuICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3QpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSByb3cuaWQgfHwgMDtcbiAgICAgIHRoaXMub25Sb3dDbGljay5lbWl0KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoY29sdW1uKSB7XG4gICAgLy8gVE9ETyAtIG5lZWRzIHRvIGNvbWUgZnJvbSBsYWJlbCBzZXJ2aWNlIC0gaHR0cHM6Ly9naXRodWIuY29tL2J1bGxob3JuL25vdm8tZWxlbWVudHMvZWxlbWVudHMvaXNzdWVzLzExNlxuICAgIGNvbnN0IG9wdHM6IGFueVtdID0gW1xuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFEYXksIG1pbjogLTEsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDdEYXlzLCBtaW46IC03LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QzMERheXMsIG1pbjogLTMwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q5MERheXMsIG1pbjogLTkwLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QxWWVhciwgbWluOiAtMzY2LCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxRGF5LCBtaW46IDAsIG1heDogMSB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDdEYXlzLCBtaW46IDAsIG1heDogNyB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDMwRGF5cywgbWluOiAwLCBtYXg6IDMwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0OTBEYXlzLCBtaW46IDAsIG1heDogOTAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxWWVhciwgbWluOiAwLCBtYXg6IDM2NiB9LFxuICAgIF07XG5cbiAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5yYW5nZSkge1xuICAgICAgb3B0cy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxzLmN1c3RvbURhdGVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICBvbkNhbGVuZGVyU2VsZWN0KGNvbHVtbiwgZXZlbnQpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChldmVudC5zdGFydERhdGUgJiYgZXZlbnQuZW5kRGF0ZSkge1xuICAgICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfSwgMTApO1xuICB9XG5cbiAgb25GaWx0ZXJLZXl3b3Jkcyhjb25maWcpIHtcbiAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5maWx0ZXJpbmcgJiYgY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcikge1xuICAgICAgY29uc3QgZmlsdGVyS2V5d29yZHMgPSBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIWNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zKSB7XG4gICAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcHRpb25zO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbiAmJiBvcHRpb24ubGFiZWwgPyBvcHRpb24ubGFiZWwgOiBvcHRpb247XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBmaWx0ZXJLZXl3b3Jkcykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKH52YWx1ZS5pbmRleE9mKGZpbHRlcktleXdvcmRzKSB8fCB+dmFsdWUuaW5kZXhPZihmaWx0ZXJLZXl3b3JkcykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucyA9IG5ld09wdGlvbnM7XG4gICAgICBjb25maWcuZmlsdGVyaW5nLmZpbHRlciA9IGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zO1xuICAgIH1cbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgdGhlIFRhYmxlIGludG8gRURJVCBtb2RlLCBiYXNlZCBvbiB0aGUgcm93L2NvbHVtbiBwYXNzZWQgeW91IGNhbiBlbnRlciBpbiBhIGZldyBzdGF0ZXNcbiAgICogKDEpIHNldFRhYmxlRWRpdCgpIC0gZG9uJ3QgcGFzcyBhbnkgdG8gcHV0IHRoZSBGVUxMIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqICgyKSBzZXRUYWJsZUVkaXQoMSkgLSBwYXNzIG9ubHkgcm93IHRvIHB1dCB0aGF0IEZVTEwgcm93IG9mIHRoZSB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiAoMykgc2V0VGFibGVFZGl0KDEsIDEpIC0gcGFzcyByb3cgYW5kIGNvbHVtbiB0byBwdXQgdGhhdCBjb2x1bW4gb2YgdGhlIHJvdyBvZiB0aGUgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHNldFRhYmxlRWRpdChyb3dOdW1iZXI/OiBudW1iZXIsIGNvbHVtbk51bWJlcj86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubW9kZSA9IE5vdm9UYWJsZU1vZGUuRURJVDtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZWRpdCgpO1xuICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xuICAgICAgcm93Ll9lZGl0aW5nID0gcm93Ll9lZGl0aW5nIHx8IHt9O1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi52aWV3T25seSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJiBIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJiByb3dJbmRleCA9PT0gTnVtYmVyKHJvd051bWJlcikgJiYgSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikpIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAhSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiZcbiAgICAgICAgICAhSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikgJiZcbiAgICAgICAgICByb3dJbmRleCA9PT0gTnVtYmVyKHJvd051bWJlcikgJiZcbiAgICAgICAgICBjb2x1bW5JbmRleCA9PT0gTnVtYmVyKGNvbHVtbk51bWJlcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gTGVhdmVzIGVkaXQgbW9kZSBmb3IgdGhlIFRhYmxlIGFuZCBwdXRzIGV2ZXJ5dGhpbmcgYmFjayB0byBWSUVXIG9ubHlcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICogQHBhcmFtIGNhbmNlbCAtIHdoZXRoZXIgb3Igbm90IHRvIHNhdmUgZGF0YSBvciB1bmRvXG4gICAqL1xuICBwcml2YXRlIGxlYXZlRWRpdE1vZGUoY2FuY2VsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlID0gTm92b1RhYmxlTW9kZS5WSUVXO1xuICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICByb3cuX2VkaXRpbmcgPSByb3cuX2VkaXRpbmcgfHwge307XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChjYW5jZWwpIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci51bmRvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5jb21taXQoKTtcbiAgICB9XG4gICAgdGhpcy5oaWRlVG9hc3RNZXNzYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBuZXcgcm93IGludG8gdGhlIHRhYmxlIHRvIGJlIGVkaXRlZCwgY2FuIGJlIGNhbGxlZCBmcm9tIGEgbG9jYWwgcmVmZXJlbmNlIG9mIHRoZSB0YWJsZSBpbiB5b3VyIHRlbXBsYXRlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBhZGRFZGl0YWJsZVJvdyhkZWZhdWx0VmFsdWU6IGFueSA9IHt9KTogdm9pZCB7XG4gICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgIGNvbnN0IHJvdzogYW55ID0ge307XG4gICAgY29uc3Qgcm93Q29udHJvbHMgPSBbXTtcbiAgICByb3cuY29udHJvbHMgPSB7fTtcbiAgICByb3cuX2VkaXRpbmcgPSB7fTtcbiAgICByb3cucm93SWQgPSB0aGlzLl9yb3dzLmxlbmd0aCArIDE7XG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgLy8gVXNlIHRoZSBjb250cm9sIHBhc3NlZCBvciB1c2UgYSBSZWFkT25seUNvbnRyb2wgc28gdGhhdCB0aGUgZm9ybSBoYXMgdGhlIHZhbHVlc1xuICAgICAgY29uc3QgY29udHJvbCA9IGNvbHVtbi5lZGl0b3JDb25maWdcbiAgICAgICAgPyBDb250cm9sRmFjdG9yeS5jcmVhdGUoY29sdW1uLmVkaXRvclR5cGUsIGNvbHVtbi5lZGl0b3JDb25maWcpXG4gICAgICAgIDogbmV3IFJlYWRPbmx5Q29udHJvbCh7IGtleTogY29sdW1uLm5hbWUgfSk7XG4gICAgICBjb250cm9sLnZhbHVlID0gbnVsbDsgLy8gcmVtb3ZlIGNvcGllZCBjb2x1bW4gdmFsdWVcbiAgICAgIHJvdy5jb250cm9sc1tjb2x1bW4ubmFtZV0gPSBjb250cm9sO1xuICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9ICFjb2x1bW4udmlld09ubHk7XG4gICAgICByb3dDb250cm9scy5wdXNoKGNvbnRyb2wpO1xuICAgIH0pO1xuICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMocm93Q29udHJvbHMsIGRlZmF1bHRWYWx1ZSwgZmFsc2UpO1xuICAgIHRhYmxlRm9ybVJvd3MucHVzaCh0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChyb3dDb250cm9scykpO1xuICAgIHRoaXMuX3Jvd3MucHVzaChyb3cpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBWYWxpZGF0ZXMgdGhlIEZvcm0gaW5zaWRlIG9mIHRoZSBUYWJsZSwgaWYgdGhlcmUgYXJlIGVycm9ycyBpdCB3aWxsIGRpc3BsYXkvcmV0dXJuIHRoZSBlcnJvcnMgZm9yIGVhY2ggcm93LlxuICAgKiBJZiB0aGVyZSBhcmUgbm8gZXJyb3JzLCB0aGVuIGl0IHdpbGwgcmV0dXJuIE9OTFkgdGhlIGNoYW5nZWQgZGF0YSBmb3IgZWFjaCByb3csIHRoZSBkYXRhIHJldHVybmVkIHdpbGwgYmUgaW4gdGhlIGZvcm06XG4gICAqIHsgaWQ6IElEX09GX1JFQ09SRCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgdXBkYXRlZFxuICAgKiB7IGlkOiB1bmRlZmluZWQsIGtleTogdmFsdWUgfSAtLSBkYXRhIHRoYXQgd2FzIGFkZGVkXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICB2YWxpZGF0ZUFuZEdldFVwZGF0ZWREYXRhKCk6IHsgY2hhbmdlZD86IGFueVtdOyBlcnJvcnM/OiB7IGVycm9yczogYW55OyByb3c6IGFueTsgaW5kZXg6IG51bWJlciB9W10gfSB7XG4gICAgaWYgKHRoaXMudGFibGVGb3JtICYmIHRoaXMudGFibGVGb3JtLmNvbnRyb2xzICYmIHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MpIHtcbiAgICAgIGNvbnN0IGNoYW5nZWRSb3dzID0gW107XG4gICAgICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgICAgIC8vIEdvIG92ZXIgdGhlIEZvcm1BcnJheSdzIGNvbnRyb2xzXG4gICAgICAodGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmZvckVhY2goKGZvcm1Hcm91cDogRm9ybUdyb3VwLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBjaGFuZ2VkUm93ID0gbnVsbDtcbiAgICAgICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICAgICAgLy8gR28gb3ZlciB0aGUgZm9ybSBncm91cCBjb250cm9sc1xuICAgICAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5jb250cm9sc1trZXldO1xuICAgICAgICAgIC8vIEhhbmRsZSB2YWx1ZSBjaGFuZ2luZ1xuICAgICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuZGlydHkgJiYgIWNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZWRSb3cpIHtcbiAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBJRCwgc28gd2UgaGF2ZSBzb21lIGtleSB0byBzYXZlIGFnYWluc3RcbiAgICAgICAgICAgICAgY2hhbmdlZFJvdyA9IHt9O1xuICAgICAgICAgICAgICBpZiAodGhpcy5fcm93c1tpbmRleF0uaWQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUm93LmlkID0gdGhpcy5fcm93c1tpbmRleF0uaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGRpcnR5LCBncmFiIHZhbHVlIG9mZiB0aGUgZm9ybVxuICAgICAgICAgICAgY2hhbmdlZFJvd1trZXldID0gdGhpcy50YWJsZUZvcm0uZ2V0UmF3VmFsdWUoKS5yb3dzW2luZGV4XVtrZXldO1xuICAgICAgICAgICAgLy8gU2V0IHZhbHVlIGJhY2sgdG8gcm93IChzaG91bGQgYmUgYWxyZWFkeSBkb25lIHZpYSB0aGUgc2VydmVyIGNhbGwsIGJ1dCBkbyBpdCBhbnl3YXkpXG4gICAgICAgICAgICB0aGlzLl9yb3dzW2luZGV4XVtrZXldID0gY2hhbmdlZFJvd1trZXldO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbCAmJiBjb250cm9sLmVycm9ycykge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yc1xuICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICBlcnJvciA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3Jba2V5XSA9IGNvbnRyb2wuZXJyb3JzO1xuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNoYW5nZWRSb3cpIHtcbiAgICAgICAgICBjaGFuZ2VkUm93cy5wdXNoKGNoYW5nZWRSb3cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHsgZXJyb3JzOiBlcnJvciwgcm93OiB0aGlzLl9yb3dzW2luZGV4XSwgaW5kZXggfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gUmV0dXJuIGVycm9ycyBpZiBhbnksIG90aGVyd2lzZSByZXR1cm4gdGhlIGNoYW5nZWQgcm93c1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHsgY2hhbmdlZDogY2hhbmdlZFJvd3MgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGVycm9ycyB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVmcmVzaCB0aGUgZGF0YSBwcm92aWRlciBhbmQgbGVhdmUgZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBjYW5jZWxFZGl0aW5nKCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmVFZGl0TW9kZSh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVmcmVzaCB0aGUgZGF0YSBwcm92aWRlciBhbmQgbGVhdmUgZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBzYXZlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmxlYXZlRWRpdE1vZGUoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwbGF5cyBhIHRvYXN0IG1lc3NhZ2UgaW5zaWRlIG9mIHRoZSB0YWJsZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgZGlzcGxheVRvYXN0TWVzc2FnZSh0b2FzdDogeyBpY29uOiBzdHJpbmc7IHRoZW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9LCBoaWRlRGVsYXk/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRvYXN0ID0gdG9hc3Q7XG4gICAgaWYgKGhpZGVEZWxheSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVUb2FzdE1lc3NhZ2UoKSwgaGlkZURlbGF5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEZvcmNlIGhpZGUgdGhlIHRvYXN0IG1lc3NhZ2VcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGhpZGVUb2FzdE1lc3NhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdCA9IG51bGw7XG4gICAgLy8gSGFjayB0byBtYWtlIHRoZSB0YWJsZSBkaXNwbGF5IHByb3Blcmx5IGFmdGVyIGhpZGluZyB0aGUgdG9hc3RcbiAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0ID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGRpc3BsYXkgdGhlIGxvYWRpbmcgb3ZlcmxheSBvbiB0aGUgdGFibGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHRvZ2dsZUxvYWRpbmcoc2hvdzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IHNob3c7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGhpZGUgYSBjb2x1bW4gaW4gZWRpdCBvciB2aWV3IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGlzQ29sdW1uSGlkZGVuKGNvbHVtbjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdGluZyA/ICEhY29sdW1uLmhpZGVDb2x1bW5PbkVkaXQgOiAhIWNvbHVtbi5oaWRlQ29sdW1uT25WaWV3O1xuICB9XG59XG4iXX0=