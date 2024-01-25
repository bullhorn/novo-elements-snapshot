// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
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
import * as i4 from "@angular/common";
import * as i5 from "./extras/keep-filter-focus/KeepFilterFocus";
import * as i6 from "./extras/pagination/Pagination";
import * as i7 from "./extras/row-details/RowDetails";
import * as i8 from "./extras/table-cell/TableCell";
import * as i9 from "./extras/table-filter/TableFilter";
import * as i10 from "./extras/th-orderable/ThOrderable";
import * as i11 from "./extras/th-sortable/ThSortable";
import * as i12 from "novo-elements/elements/toast";
import * as i13 from "novo-elements/elements/button";
import * as i14 from "novo-elements/elements/tooltip";
import * as i15 from "novo-elements/elements/dropdown";
import * as i16 from "novo-elements/elements/loading";
import * as i17 from "novo-elements/elements/date-picker";
import * as i18 from "novo-elements/elements/checkbox";
import * as i19 from "novo-elements/elements/common";
import * as i20 from "novo-elements/elements/flex";
import * as i21 from "novo-elements/elements/icon";
// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
export var NovoTableMode;
(function (NovoTableMode) {
    NovoTableMode[NovoTableMode["VIEW"] = 1] = "VIEW";
    NovoTableMode[NovoTableMode["EDIT"] = 2] = "EDIT";
})(NovoTableMode || (NovoTableMode = {}));
export class NovoTableElement {
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
        this.tableForm = new UntypedFormGroup({});
        this.footers = [];
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        this.loading = false;
        notify('[Deprecated]: The table is deprecated. Please migrate to novo-data-tables!');
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
NovoTableElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoTableElement, deps: [{ token: i1.NovoLabelService }, { token: i2.FormUtils }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTableElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoTableElement, selector: "novo-table", inputs: { config: "config", columns: "columns", theme: "theme", skipSortAndFilterClear: "skipSortAndFilterClear", mode: "mode", editable: "editable", rowIdentifier: "rowIdentifier", name: "name", rows: "rows", dataProvider: "dataProvider" }, outputs: { onRowClick: "onRowClick", onRowSelect: "onRowSelect", onTableChange: "onTableChange" }, host: { properties: { "attr.theme": "theme", "class.editing": "mode === NovoTableMode.EDIT", "class.novo-table-loading": "loading" }, classAttribute: "novo-table" }, viewQueries: [{ propertyName: "filterInputs", predicate: ["filterInput"], descendants: true, read: ElementRef }], ngImport: i0, template: `
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
  `, isInline: true, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background:rgba(0,0,0,.07);z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:rgba(74,137,220,.2)}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#ffffff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n + 2),.table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000000;color:#fff}novo-table[theme=black]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#ffffff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#3399dd;color:#fff}novo-table[theme=company]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#44bb77;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#aa6699;color:#fff}novo-table[theme=lead]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#ffaa44;color:#fff}novo-table[theme=contact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#ffaa44;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#662255;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#bb5566;color:#fff}novo-table[theme=job]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#bb5566;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"], dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i2.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { kind: "component", type: i2.NovoFormElement, selector: "novo-form", inputs: ["form", "layout", "hideHeader"] }, { kind: "directive", type: i5.NovoTableKeepFilterFocus, selector: "[keepFilterFocused]" }, { kind: "component", type: i6.Pagination, selector: "novo-pagination", inputs: ["page", "totalItems", "itemsPerPage", "rowOptions", "label", "disablePageSelection"], outputs: ["pageChange", "itemsPerPageChange", "onPageChange"] }, { kind: "component", type: i7.RowDetails, selector: "novo-row-details", inputs: ["data", "renderer"] }, { kind: "component", type: i8.TableCell, selector: "novo-table-cell", inputs: ["column", "row", "form", "hasEditor"] }, { kind: "directive", type: i9.TableFilter, selector: "[novoTableFilter]", inputs: ["novoTableFilter"], outputs: ["onFilterChange"] }, { kind: "directive", type: i10.ThOrderable, selector: "[novoThOrderable]", inputs: ["novoThOrderable"], outputs: ["onOrderChange"] }, { kind: "directive", type: i11.ThSortable, selector: "[novoThSortable]", inputs: ["novoThSortable", "column"], outputs: ["onSortChange"] }, { kind: "component", type: i12.NovoToastElement, selector: "novo-toast", inputs: ["appearance", "theme", "icon", "title", "action", "hasDialogue", "link", "isCloseable", "message"], outputs: ["closed"] }, { kind: "component", type: i13.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "directive", type: i14.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { kind: "component", type: i15.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i16.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i17.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i18.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i19.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i19.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "directive", type: i19.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i20.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i21.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoTableElement, decorators: [{
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
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background:rgba(0,0,0,.07);z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:rgba(74,137,220,.2)}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#ffffff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n + 2),.table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000000;color:#fff}novo-table[theme=black]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#ffffff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#3399dd;color:#fff}novo-table[theme=company]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#44bb77;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#aa6699;color:#fff}novo-table[theme=lead]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#ffaa44;color:#fff}novo-table[theme=contact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#ffaa44;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#662255;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#bb5566;color:#fff}novo-table[theme=job]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#bb5566;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSixPQUFPLEVBQThCLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNGLFNBQVM7QUFDVCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQnpGLCtHQUErRztBQUMvRyxNQUFNLENBQU4sSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3ZCLGlEQUFRLENBQUE7SUFDUixpREFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUhXLGFBQWEsS0FBYixhQUFhLFFBR3hCO0FBcVZELE1BQU0sT0FBTyxnQkFBZ0I7SUFvRDNCLElBQ0ksSUFBSSxDQUFDLElBQWdCO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksSUFBSSxJQUFJ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Z0JBR04sS0FBSztzQkFESixLQUFLO2dCQUdOLHNCQUFzQjtzQkFEckIsS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO2dCQUdOLGFBQWE7c0JBRFosS0FBSztnQkFHTixJQUFJO3NCQURILEtBQUs7Z0JBSU4sVUFBVTtzQkFEVCxNQUFNO2dCQUdQLFdBQVc7c0JBRFYsTUFBTTtnQkFHUCxhQUFhO3NCQURaLE1BQU07Z0JBNEJILElBQUk7c0JBRFAsS0FBSztnQkFpQkYsWUFBWTtzQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBEb0NoZWNrLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBzdGFydE9mVG9kYXksIHN0YXJ0T2ZUb21vcnJvdyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIEFQUFxuaW1wb3J0IHsgQ29sbGVjdGlvbkV2ZW50LCBOb3ZvTGFiZWxTZXJ2aWNlLCBQYWdlZEFycmF5Q29sbGVjdGlvbiB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZVV0aWwsIEhlbHBlcnMsIG5vdGlmeSB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgQ29udHJvbEZhY3RvcnksIEZvcm1VdGlscywgUmVhZE9ubHlDb250cm9sIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9mb3JtJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvVGFibGVDb25maWcge1xuICAvLyBQYWdpbmcgY29uZmlnXG4gIHBhZ2luZz86IHtcbiAgICBjdXJyZW50OiBudW1iZXI7IC8vIGN1cnJlbnQgcGFnZVxuICAgIGl0ZW1zUGVyUGFnZTogbnVtYmVyOyAvLyBpdGVtcyBwZXIgcGFnZVxuICAgIG9uUGFnZUNoYW5nZTogRnVuY3Rpb247IC8vIGZ1bmN0aW9uIHRvIGhhbmRsZSBwYWdlIGNoYW5naW5nXG4gICAgcm93T3B0aW9ucz86IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9W107IC8vIHBhZ2Ugb3B0aW9uc1xuICAgIGRpc2FibGVQYWdlU2VsZWN0aW9uPzogYm9vbGVhbjsgLy8gZGlzYWJsZXMgdGhlIHBhZ2VzIGZyb20gYmVpbmcgc2VsZWN0ZWRcbiAgfTtcbiAgLy8gRm9vdGVyIGNvbmZpZyAodG90YWwgZm9vdGVyKVxuICBmb290ZXJzPzogQXJyYXk8e1xuICAgIGNvbHVtbnM6IEFycmF5PHN0cmluZz47IC8vIHN0cmluZyBhcnJheSBvZiBjb2x1bW5zIHRvIHRvdGFsXG4gICAgbWV0aG9kOiBzdHJpbmc7IC8vIG1ldGhvZCB0byB1c2UgZm9yIHRoZSBmb290ZXIsIFNVTSB8IEFWRywgZGVmYXVsdHMgdG8gU1VNXG4gICAgbGFiZWxDb2x1bW46IHN0cmluZzsgLy8gY29sdW1uIHRvIHVzZSBhcyB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gICAgbGFiZWw6IHN0cmluZzsgLy8gbGFiZWwgdG8gdXNlIGluIHRoZSBcInRvdGFsXCIgbGFiZWxcbiAgfT47XG4gIC8vIFRPRE86IFdoZW4gdGhlc2UgdHlwZXMgYXJlIGVuZm9yY2VkIGFzIGBib29sZWFuIHwgRnVuY3Rpb25gLCB0aGVyZSdzIGEgbGludCBlcnJvci4gVGhhdCdzIGEgYnVnLlxuICBmaWx0ZXJpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIGZpbHRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBmaWx0ZXJpbmcgY2FsbGJhY2tcbiAgc29ydGluZz86IGJvb2xlYW4gfCBhbnk7IC8vIFR1cm4gb24gc29ydGluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBzb3J0aW5nIGNhbGxiYWNrXG4gIG9yZGVyaW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIG9yZGVyaW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIG9yZGVyaW5nIGNhbGxiYWNrXG4gIHJlc2l6aW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIHJlc2l6aW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIHJlc2l6aW5nIGNhbGxiYWNrXG4gIHJvd1NlbGVjdGlvblN0eWxlPzogc3RyaW5nOyAvLyBSb3cgc2VsZWN0aW9uIHN0eWxlLCBjaGVja2JveCBvciByb3dcbiAgcm93U2VsZWN0PzogYm9vbGVhbjsgLy8gVHVybiBvbiByb3cgc2VsZWN0aW9uXG4gIGhhc0RldGFpbHM/OiBib29sZWFuOyAvLyBUdXJuIG9uIGRldGFpbHMgcm93IGZvciB0aGUgdGFibGVcbiAgZGV0YWlsc1JlbmRlcmVyPzogYW55OyAvLyBSZW5kZXJlci9jb21wb25lbnQgZm9yIHRoZSBkZXRhaWxzIHJvd1xuICBleHBhbmRBbGw/OiBib29sZWFuOyAvLyBzaG91bGQgQWxsIFJvd3MgYmUgZXhwYW5kZWQgYnkgZGVmYXVsdFxuICBzZWxlY3RBbGxFbmFibGVkPzogYm9vbGVhbjsgLy8gQWxsb3dzIHRoZSB0YWJsZSwgd2hpbGUgaW4gc2VsZWN0aW9uIG1vZGUgdG8gaGF2ZSBhIHNlbGVjdCBhbGwgYXQgdGhlIHRvcFxufVxuXG4vLyBUT0RPIC0gc3VwcG9ydCAoMSkgY2xpY2tpbmcgY2VsbCB0byBlZGl0LCAoMikgY2xpY2tpbmcgcm93IHRvIGVkaXQsICgzKSBidXR0b24gdG8gdHJpZ2dlciBmdWxsIHRhYmxlIHRvIGVkaXRcbmV4cG9ydCBlbnVtIE5vdm9UYWJsZU1vZGUge1xuICBWSUVXID0gMSxcbiAgRURJVCA9IDIsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFibGUnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRhYmxlJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgICAnW2NsYXNzLmVkaXRpbmddJzogJ21vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXRhYmxlLWxvYWRpbmddJzogJ2xvYWRpbmcnLFxuICB9LFxuICAvLyBkaXJlY3RpdmVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aGVhZGVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGhcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgIDxub3ZvLXBhZ2luYXRpb25cbiAgICAgICAgICAqbmdJZj1cImNvbmZpZy5wYWdpbmcgJiYgIShkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpKVwiXG4gICAgICAgICAgW3Jvd09wdGlvbnNdPVwiY29uZmlnLnBhZ2luZy5yb3dPcHRpb25zXCJcbiAgICAgICAgICBbZGlzYWJsZVBhZ2VTZWxlY3Rpb25dPVwiY29uZmlnLnBhZ2luZy5kaXNhYmxlUGFnZVNlbGVjdGlvblwiXG4gICAgICAgICAgWyhwYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVwiXG4gICAgICAgICAgWyhpdGVtc1BlclBhZ2UpXT1cImRhdGFQcm92aWRlci5wYWdlU2l6ZVwiXG4gICAgICAgICAgW3RvdGFsSXRlbXNdPVwiZGF0YVByb3ZpZGVyLnRvdGFsXCJcbiAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L25vdm8tcGFnaW5hdGlvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1hY3Rpb25zXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFibGUtbG9hZGluZy1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nIHx8IGRhdGFQcm92aWRlci5pc0xvYWRpbmcoKVwiPlxuICAgICAgPG5vdm8tbG9hZGluZz48L25vdm8tbG9hZGluZz5cbiAgICA8L2Rpdj5cbiAgICA8bm92by10b2FzdCAqbmdJZj1cInRvYXN0XCIgW3RoZW1lXT1cInRvYXN0Py50aGVtZVwiIFtpY29uXT1cInRvYXN0Py5pY29uXCIgW21lc3NhZ2VdPVwidG9hc3Q/Lm1lc3NhZ2VcIj48L25vdm8tdG9hc3Q+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiICpuZ0lmPVwiIWdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3RcIj5cbiAgICAgIDxub3ZvLWZvcm0gaGlkZUhlYWRlcj1cInRydWVcIiBbZm9ybV09XCJ0YWJsZUZvcm1cIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCBkYXRhVGFibGVcIiBbY2xhc3MudGFibGUtZGV0YWlsc109XCJjb25maWcuaGFzRGV0YWlsc1wiIHJvbGU9XCJncmlkXCI+XG4gICAgICAgICAgPCEtLSBza2lwU29ydEFuZEZpbHRlckNsZWFyIGlzIGEgaGFjayByaWdodCBub3csIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIENhbnZhcyBpcyByZWZhY3RvcmVkIC0tPlxuICAgICAgICAgIDx0aGVhZCAqbmdJZj1cImNvbHVtbnMubGVuZ3RoICYmICghZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSB8fCBkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpIHx8IHNraXBTb3J0QW5kRmlsdGVyQ2xlYXIgfHwgZWRpdGluZylcIj5cbiAgICAgICAgICAgIDx0ciByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgIDwhLS0gREVUQUlMUyAtLT5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cIm5leHRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIiFjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImV4cGFuZC1hbGxcIlxuICAgICAgICAgICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJzb3J0LWRlc2NcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5leHBhbmRBbGxcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY29sbGFwc2UtYWxsXCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPCEtLSBDSEVDS0JPWCAtLT5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3ggbWFzcy1hY3Rpb25cIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hc3RlclwiXG4gICAgICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJwYWdlU2VsZWN0ZWQubGVuZ3RoID4gMCAmJiBwYWdlU2VsZWN0ZWQubGVuZ3RoIDwgcGFnZWREYXRhLmxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZWxlY3RQYWdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LWFsbC1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJtYXN0ZXIgPyBsYWJlbHMuZGVzZWxlY3RBbGwgOiBsYWJlbHMuc2VsZWN0QWxsT25QYWdlXCJcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8IS0tIFRBQkxFIEhFQURFUlMgLS0+XG4gICAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgJ21hc3MtYWN0aW9uJzogY29uZmlnPy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IGNvbHVtbj8uYWN0aW9ucz8uaXRlbXM/Lmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgICBwcmV2aWV3OiBjb2x1bW4/Lm5hbWUgPT09ICdwcmV2aWV3J1xuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIFtub3ZvVGhPcmRlcmFibGVdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAob25PcmRlckNoYW5nZSk9XCJvbk9yZGVyQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiaXNDb2x1bW5IaWRkZW4oY29sdW1uKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGgtZ3JvdXBcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgIDwhLS0gTEFCRUwgJiBTT1JUIEFSUk9XUyAtLT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0aC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbmZpZy5zb3J0aW5nICE9PSBmYWxzZSAmJiBjb2x1bW4uc29ydGluZyAhPT0gZmFsc2UgPyAnc29ydGFibGUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICBbbm92b1RoU29ydGFibGVdPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAob25Tb3J0Q2hhbmdlKT1cIm9uU29ydENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7IGNvbHVtbi50aXRsZSB8fCBjb2x1bW4ubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1zb3J0LWljb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cImxhYmVscy5zb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uc29ydCB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgY29sdW1uLnNvcnRpbmcgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LXVwXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LWRvd25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBEUk9QLURPV04gLS0+XG4gICAgICAgICAgICAgICAgICA8bm92by1kcm9wZG93blxuICAgICAgICAgICAgICAgICAgICBzaWRlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlcmluZyAhPT0gZmFsc2UgJiYgY29sdW1uLmZpbHRlcmluZyAhPT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbi1maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvZ2dsZWQpPVwib25Ecm9wZG93blRvZ2dsZWQoJGV2ZW50LCBjb2x1bW4ubmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi50YWJsZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbGFzcz1cInRhYmxlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uPVwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cImxhYmVscy5maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZmlsdGVyZWRdPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImZvY3VzSW5wdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBPUFRJT05TIExJU1QgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCB8fCBjb2x1bW4/Lm9yaWdpbmFsT3B0aW9ucz8ubGVuZ3RoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uPy50eXBlICE9PSAnZGF0ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJ0aW1lc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb2x1bW4uZmlsdGVyIHx8IGNvbHVtbi5maWx0ZXIgPT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiEhY29sdW1uLmFsbG93Q3VzdG9tVGV4dE9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImNvbHVtbi5uYW1lICsgJy1pbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbm92b1RhYmxlRmlsdGVyXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChvbkZpbHRlckNoYW5nZSk9XCJvbkZpbHRlcktleXdvcmRzKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNvbHVtbi5mcmVldGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBGaWx0ZXJGb2N1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29sdW1uLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRmlsdGVyQ2xpY2soY29sdW1uLCBvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPiA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwiaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgU0VBUkNIIElOUFVUIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cCAqbmdJZj1cIiEoY29sdW1uPy5vcHRpb25zPy5sZW5ndGggfHwgY29sdW1uPy5vcmlnaW5hbE9wdGlvbnM/Lmxlbmd0aCkgJiYgdG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbi5uYW1lXVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImZpbHRlci1zZWFyY2hcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwidGltZXNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImNvbHVtbi5uYW1lICsgJy1pbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbm92b1RhYmxlRmlsdGVyXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChvbkZpbHRlckNoYW5nZSk9XCJvbkZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2VlcEZpbHRlckZvY3VzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgI2ZpbHRlcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgREFURSBPUFRJT05TIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cCAqbmdJZj1cImNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoICYmIGNvbHVtbj8udHlwZSA9PT0gJ2RhdGUnICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIgKm5nSWY9XCIhY29sdW1uLmNhbGVuZGVyU2hvd1wiIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJuZWdhdGl2ZVwiIGljb249XCJ0aW1lc1wiIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIiAqbmdJZj1cImNvbHVtbi5maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBba2VlcE9wZW5dPVwib3B0aW9uLnJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uPy5sYWJlbCB8fCBvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1pY29uIG5vdm9TdWZmaXggY29sb3I9XCJwb3NpdGl2ZVwiICpuZ0lmPVwiaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pXCI+Y2hlY2s8L25vdm8taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImNhbGVuZGFyLWNvbnRhaW5lclwiICpuZ0lmPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiIGtlZXBPcGVuIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFjay1saW5rXCIgKGNsaWNrKT1cImNvbHVtbi5jYWxlbmRlclNob3cgPSBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXByZXZpb3VzXCI+PC9pPnt7IGxhYmVscy5iYWNrVG9QcmVzZXRGaWx0ZXJzIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkNhbGVuZGVyU2VsZWN0KGNvbHVtbiwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLXN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICAgIDwvbm92by1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8IS0tIFRBQkxFIERBVEEgLS0+XG4gICAgICAgICAgPHRib2R5ICpuZ0lmPVwiIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZWRpdGluZ1wiPlxuICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtc2VsZWN0aW9uLXJvd1wiXG4gICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnICYmIHNob3dTZWxlY3RBbGxNZXNzYWdlICYmIGNvbmZpZy5zZWxlY3RBbGxFbmFibGVkXCJcbiAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwidGFibGUtc2VsZWN0aW9uLXJvd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIHt7IGxhYmVscy5zZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQubGVuZ3RoKSB9fVxuICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJzZWxlY3RBbGwodHJ1ZSlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJhbGwtbWF0Y2hpbmctcmVjb3Jkc1wiPnt7IGxhYmVscy50b3RhbFJlY29yZHMoZGF0YVByb3ZpZGVyLnRvdGFsKSB9fTwvYT5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvdz1cIiRpbXBsaWNpdFwiIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJyb3dzXCI+XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtcm93XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJyb3cuY3VzdG9tQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJuYW1lICsgJy0nICsgcm93W3Jvd0lkZW50aWZpZXJdXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicm93LmlkXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwicm93Q2xpY2tIYW5kbGVyKHJvdylcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwicm93LmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyb3ctYWN0aW9uc1wiICpuZ0lmPVwiY29uZmlnLmhhc0RldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkID0gIXJvdy5fZXhwYW5kZWRcIiAqbmdJZj1cIiFyb3cuX2V4cGFuZGVkXCI+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwic29ydC1kZXNjXCIgKGNsaWNrKT1cInJvdy5fZXhwYW5kZWQgPSAhcm93Ll9leHBhbmRlZFwiICpuZ0lmPVwicm93Ll9leHBhbmRlZFwiPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyb3ctYWN0aW9ucyBjaGVja2JveFwiICpuZ0lmPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInJvdy5fc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJyb3dTZWxlY3RIYW5kbGVyKHJvdylcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWxlY3Qtcm93LWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tY2hlY2tib3g+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzcy5ub3ZvLWZvcm0tcm93XT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiaXNDb2x1bW5IaWRkZW4oY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tdGFibGUtY2VsbFxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInJvdy5fZWRpdGluZyAmJiAhcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICAgIFtoYXNFZGl0b3JdPVwiZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1dPVwiZ2V0Um93Q29udHJvbEZvcm0oaSlcIlxuICAgICAgICAgICAgICAgICAgPjwvbm92by10YWJsZS1jZWxsPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tY29udHJvbFxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInJvdy5fZWRpdGluZyAmJiByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgICAgY29uZGVuc2VkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRyb2xdPVwicm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLWNvbnRyb2w+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkZXRhaWxzLXJvd1wiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiXG4gICAgICAgICAgICAgICAgW2hpZGRlbl09XCIhcm93Ll9leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidkZXRhaWxzLXJvdy0nICsgcm93LmlkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zXCI+PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcgPyBjb2x1bW5zLmxlbmd0aCArIDEgOiBjb2x1bW5zLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tcm93LWRldGFpbHMgW2RhdGFdPVwicm93XCIgW3JlbmRlcmVyXT1cImNvbmZpZy5kZXRhaWxzUmVuZGVyZXJcIj48L25vdm8tcm93LWRldGFpbHM+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIE5PIFRBQkxFIERBVEEgUExBQ0VIT0xERVIgLS0+XG4gICAgICAgICAgPHRib2R5XG4gICAgICAgICAgICBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIlxuICAgICAgICAgICAgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpICYmICFlZGl0aW5nXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LXRhYmxlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI2VtcHR5bWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtZW1wdHktbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cImVtcHR5bWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZW1wdHlUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gTk8gTUFUQ0hJTkcgUkVDT1JEUyAtLT5cbiAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCIgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmIGRhdGFQcm92aWRlci5pc0ZpbHRlcmVkKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS10YWJsZVwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNub21hdGNobWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtbm8tbWF0Y2hpbmctcmVjb3Jkcy1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8tbWF0Y2hpbmctcmVjb3Jkc1wiICpuZ0lmPVwibm9tYXRjaG1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLm5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIEVSUk9SIFBMQUNFSE9MREVSIC0tPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIiAqbmdJZj1cImRhdGFQcm92aWRlci5oYXNFcnJvcnMoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLWVycm9yc1wiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNlcnJvcm1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLWVycm9yLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJlcnJvcm1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLWNhdXRpb25cIj48L2k+IHt7IGxhYmVscy5lcnJvcmVkVGFibGVNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8dGZvb3QgKm5nSWY9XCIhY29uZmlnLmZvb3RlcnNcIiBbbmdDbGFzc109XCJkYXRhUHJvdmlkZXIubGVuZ3RoICUgMiA9PSAwID8gJ29kZCcgOiAnZXZlbidcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgPHRmb290ICpuZ0Zvcj1cImxldCBmb290ZXIgb2YgZm9vdGVyczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwibm92by10YWJsZS10b3RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCIoY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lKSArICctdG90YWwtJyArIGlcIj5cbiAgICAgICAgICAgICAgICB7eyBmb290ZXJbY29sdW1uLm5hbWVdIH19XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L25vdm8tZm9ybT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vVGFibGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFibGVFbGVtZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBWaWV3Q2hpbGRyZW4oJ2ZpbHRlcklucHV0JywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGZpbHRlcklucHV0czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogTm92b1RhYmxlQ29uZmlnID0ge307XG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBtb2RlOiBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZS5WSUVXO1xuICBASW5wdXQoKVxuICBlZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICByb3dJZGVudGlmaWVyOiBzdHJpbmcgPSAnaWQnO1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgPSAndGFibGUnO1xuXG4gIEBPdXRwdXQoKVxuICBvblJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uVGFibGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9kYXRhUHJvdmlkZXI6IFBhZ2VkQXJyYXlDb2xsZWN0aW9uPGFueT47XG4gIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdGVkOiBBcnJheTxhbnk+ID0gW107XG4gIGFjdGl2ZUlkOiBudW1iZXIgPSAwO1xuICBtYXN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXhwYW5kQWxsOiBib29sZWFuID0gZmFsc2U7XG4gIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGFzdFBhZ2U6IG51bWJlciA9IDA7XG4gIHNlbGVjdGVkUGFnZUNvdW50OiBudW1iZXIgPSAwO1xuICBzaG93U2VsZWN0QWxsTWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjdXJyZW50U29ydENvbHVtbjogYW55O1xuICBwYWdlZERhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgcGFnZVNlbGVjdGVkOiBhbnk7XG4gIC8vIE1hcCB0byBrZWVwIHRyYWNrIG9mIHdoYXQgZHJvcGRvd25zIGFyZSB0b2dnbGVkXG4gIC8vIFVzZWQgdG8gcHJvcGVybHkgKm5nSWYgdGhlIDxub3ZvLW9wdGdyb3VwPiBzbyB0aGF0IHRoZSBrZWVwRmlsdGVyRm9jdXNlZCBEaXJlY3RpdmVcbiAgLy8gd2lsbCBwcm9wZXJseSBmaXJlIHRoZSBuZ0FmdGVyVmlld0luaXQgZXZlbnRcbiAgdG9nZ2xlZERyb3Bkb3duTWFwOiBhbnkgPSB7fTtcbiAgcHVibGljIE5vdm9UYWJsZU1vZGUgPSBOb3ZvVGFibGVNb2RlO1xuICBwdWJsaWMgdGFibGVGb3JtOiBVbnR5cGVkRm9ybUdyb3VwID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICBwdWJsaWMgdG9hc3Q6IHsgdGhlbWU6IHN0cmluZzsgaWNvbjogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmcgfTtcbiAgcHVibGljIGZvb3RlcnMgPSBbXTtcbiAgcHVibGljIGdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgcm93cyhyb3dzOiBBcnJheTxhbnk+KSB7XG4gICAgdGhpcy5kYXRhUHJvdmlkZXIgPSByb3dzO1xuICAgIGlmIChyb3dzICYmIHJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXR1cENvbHVtbkRlZmF1bHRzKCk7XG4gICAgfVxuICAgIC8vIHRoaXMgaXMgYSB0ZW1wb3JhcnkvaGFja3kgZml4IHVudGlsIGFzeW5jIGRhdGFsb2FkaW5nIGlzIGhhbmRsZWQgd2l0aGluIHRoZSB0YWJsZVxuICAgIGlmICghdGhpcy5za2lwU29ydEFuZEZpbHRlckNsZWFyKSB7XG4gICAgICB0aGlzLmNsZWFyQWxsU29ydEFuZEZpbHRlcnMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBkYXRhUHJvdmlkZXIoZHA6IGFueSkge1xuICAgIHRoaXMuX2RhdGFQcm92aWRlciA9IEFycmF5LmlzQXJyYXkoZHApID8gbmV3IFBhZ2VkQXJyYXlDb2xsZWN0aW9uPGFueT4oZHApIDogZHA7XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2UucGlwZShkZWJvdW5jZVRpbWUoMTAwKSkuc3Vic2NyaWJlKChldmVudDogQ29sbGVjdGlvbkV2ZW50KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgY2FzZSBDb2xsZWN0aW9uRXZlbnQuQ0hBTkdFOlxuICAgICAgICAgIHRoaXMuX3Jvd3MgPSBldmVudC5kYXRhO1xuICAgICAgICAgIC8vIFNldHVwIGZvcm1cbiAgICAgICAgICB0aGlzLnRhYmxlRm9ybSA9IHRoaXMuYnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICByb3dzOiB0aGlzLmJ1aWxkZXIuYXJyYXkoW10pLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIFJlbW92ZSBhbGwgc2VsZWN0aW9uIG9uIHNvcnQgY2hhbmdlIGlmIHNlbGVjdGlvbiBpcyBvblxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgdGhpcy5wYWdlZERhdGEgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMucm93U2VsZWN0SGFuZGxlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBGaW5kIHRoYXQgY29sdW1ucyB3ZSBtaWdodCBuZWVkIHRvIHN1bSB1cCB2aWEgdGhlIGZvb3RlclxuICAgICAgICAgIGxldCBjb2x1bW5zVG9TdW0gPSBbXTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5TdW1zID0ge307XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZvb3RlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmZvb3RlcnMuZm9yRWFjaCgoY29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgIGNvbHVtbnNUb1N1bS5wdXNoKC4uLmNvbmZpZy5jb2x1bW5zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gT25seSBoYXZlIHVuaXF1ZSBjb2x1bW5zLCBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgICAgIGNvbHVtbnNUb1N1bSA9IGNvbHVtbnNUb1N1bS5maWx0ZXIoKGl0ZW0sIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYWtlIGEgZm9ybSBmb3IgZWFjaCByb3dcbiAgICAgICAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3dDb250cm9scyA9IFtdO1xuICAgICAgICAgICAgcm93LmNvbnRyb2xzID0ge307XG4gICAgICAgICAgICByb3cuX2VkaXRpbmcgPSB7fTtcbiAgICAgICAgICAgIHJvdy5fZXhwYW5kZWQgPSB0aGlzLmNvbmZpZy5leHBhbmRBbGw7XG4gICAgICAgICAgICByb3cucm93SWQgPSB0aGlzLl9yb3dzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgLy8gVXNlIHRoZSBjb250cm9sIHBhc3NlZCBvciB1c2UgYSBSZWFkT25seUNvbnRyb2wgc28gdGhhdCB0aGUgZm9ybSBoYXMgdGhlIHZhbHVlc1xuICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gY29sdW1uLmVkaXRvckNvbmZpZ1xuICAgICAgICAgICAgICAgID8gQ29udHJvbEZhY3RvcnkuY3JlYXRlKGNvbHVtbi5lZGl0b3JUeXBlLCBjb2x1bW4uZWRpdG9yQ29uZmlnKVxuICAgICAgICAgICAgICAgIDogbmV3IFJlYWRPbmx5Q29udHJvbCh7IGtleTogY29sdW1uLm5hbWUgfSk7XG4gICAgICAgICAgICAgIHJvdy5jb250cm9sc1tjb2x1bW4ubmFtZV0gPSBjb250cm9sO1xuICAgICAgICAgICAgICByb3dDb250cm9scy5wdXNoKGNvbnRyb2wpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmZvcm1VdGlscy5zZXRJbml0aWFsVmFsdWVzKHJvd0NvbnRyb2xzLCByb3csIGZhbHNlKTtcbiAgICAgICAgICAgIHRhYmxlRm9ybVJvd3MucHVzaCh0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChyb3dDb250cm9scykpO1xuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIHRvdGFsIGZvb3RlciBpZiBjb25maWd1cmVkXG4gICAgICAgICAgICAvLyBBcnJheSBvZiBrZXlzIHRvIHRvdGFsXG4gICAgICAgICAgICBpZiAoY29sdW1uc1RvU3VtLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBjb2x1bW5zVG9TdW0uZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEhlbHBlcnMuaXNCbGFuayhjb2x1bW5TdW1zW2NvbHVtbl0pKSB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5TdW1zW2NvbHVtbl0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW5TdW1zW2NvbHVtbl0gKz0gcm93W2NvbHVtbl07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVCkge1xuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZUVkaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gU2V0dXAgdGhlIGZvb3RlcnMgKGlmIGFueSlcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuZm9vdGVycykge1xuICAgICAgICAgICAgdGhpcy5mb290ZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mb290ZXJzLmZvckVhY2goKGZvb3RlckNvbmZpZywgZm9vdGVyQ29uZmlnSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZm9vdGVyID0ge307XG4gICAgICAgICAgICAgIGZvb3Rlcltmb290ZXJDb25maWcubGFiZWxDb2x1bW5dID0gZm9vdGVyQ29uZmlnLmxhYmVsO1xuICAgICAgICAgICAgICBmb290ZXJDb25maWcuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZm9vdGVyQ29uZmlnLm1ldGhvZCA9PT0gJ0FWRycgJiYgdGhpcy5fcm93cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgIGZvb3Rlcltjb2x1bW5dID0gY29sdW1uU3Vtc1tjb2x1bW5dIC8gdGhpcy5fcm93cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZvb3Rlcltjb2x1bW5dID0gY29sdW1uU3Vtc1tjb2x1bW5dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuZm9vdGVycy5wdXNoKGZvb3Rlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZykge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2UgPSB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudDtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlU2l6ZSA9IHRoaXMuY29uZmlnLnBhZ2luZy5pdGVtc1BlclBhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFBhZ2luZyB0dXJuZWQgb2ZmLCByZXR1cm4gYmFzaWNhbGx5IGFsbCBvZiB0aGUgZGF0YVxuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2UgPSAxO1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gNTAwO1xuICAgIH1cbiAgICBpZiAoZHAgJiYgZHAubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXR1cENvbHVtbkRlZmF1bHRzKCk7XG4gICAgfVxuICAgIHRoaXMuX2RhdGFQcm92aWRlci5yZWZyZXNoKCk7XG4gIH1cbiAgZ2V0IGRhdGFQcm92aWRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVByb3ZpZGVyO1xuICB9XG5cbiAgZ2V0IGVkaXRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gTm92b1RhYmxlTW9kZS5FRElUO1xuICB9XG5cbiAgZ2V0IGZvcm1WYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YWJsZUZvcm0uZ2V0UmF3VmFsdWUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgZm9ybVV0aWxzOiBGb3JtVXRpbHMsIHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIG5vdGlmeSgnW0RlcHJlY2F0ZWRdOiBUaGUgdGFibGUgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIG1pZ3JhdGUgdG8gbm92by1kYXRhLXRhYmxlcyEnKTtcbiAgfVxuXG4gIG9uRHJvcGRvd25Ub2dnbGVkKGV2ZW50LCBjb2x1bW4pOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW5dID0gZXZlbnQ7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBmb2N1c0lucHV0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZpbHRlcklucHV0cyAmJiB0aGlzLmZpbHRlcklucHV0cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmlsdGVySW5wdXRzLmZvckVhY2goKGZpbHRlcklucHV0KSA9PiB7XG4gICAgICAgIGlmIChmaWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBmaWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCksIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvblBhZ2VDaGFuZ2UoZXZlbnQpIHtcbiAgICAvLyB0aGlzLmRhdGFQcm92aWRlci5wYWdlID0gZXZlbnQucGFnZTtcbiAgICAvLyB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA9IGV2ZW50Lml0ZW1zUGVyUGFnZTtcbiAgfVxuXG4gIGdldE9wdGlvbkRhdGFBdXRvbWF0aW9uSWQob3B0aW9uKSB7XG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsob3B0aW9uLnZhbHVlKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIHNldHVwQ29sdW1uRGVmYXVsdHMoKSB7XG4gICAgLy8gQ2hlY2sgY29sdW1ucyBmb3IgY2VsbCBvcHRpb24gdHlwZXNcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi50eXBlKSB7XG4gICAgICAgIHN3aXRjaCAoY29sdW1uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIC8vIFNldCBvcHRpb25zIGJhc2VkIG9uIGRhdGVzIGlmIHRoZXJlIGFyZSBub25lXG4gICAgICAgICAgICBjb2x1bW4ub3B0aW9ucyA9IGNvbHVtbi5vcHRpb25zIHx8IHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoY29sdW1uKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcgJiYgdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQgIT09IHRoaXMubGFzdFBhZ2UpIHtcbiAgICAgIHRoaXMucm93U2VsZWN0SGFuZGxlcigpO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmxhc3RQYWdlID0gdGhpcy5jb25maWcucGFnaW5nID8gdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQgOiAxO1xuICB9XG5cbiAgZ2V0UGFnZVN0YXJ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhZ2luZyA/ICh0aGlzLmRhdGFQcm92aWRlci5wYWdlIC0gMSkgKiB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA6IDA7XG4gIH1cblxuICBnZXRQYWdlRW5kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhZ2luZyAmJiB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA+IC0xID8gdGhpcy5nZXRQYWdlU3RhcnQoKSArIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplIDogdGhpcy5yb3dzLmxlbmd0aDtcbiAgfVxuXG4gIGdldFJvd0NvbnRyb2xGb3JtKGkpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGNvbnN0IHRhYmxlRm9ybVJvd3MgPSB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheTtcbiAgICByZXR1cm4gdGFibGVGb3JtUm93cy5jb250cm9sc1tpXTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2xpY2soY29sdW1uLCBmaWx0ZXIpIHtcbiAgICBpZiAoZmlsdGVyLnJhbmdlICYmICFjb2x1bW4uY2FsZW5kYXJTaG93KSB7XG4gICAgICBjb2x1bW4uY2FsZW5kZXJTaG93ID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikgJiYgY29sdW1uLm11bHRpcGxlKSB7XG4gICAgICBpZiAofmNvbHVtbi5maWx0ZXIuaW5kZXhPZihmaWx0ZXIpKSB7XG4gICAgICAgIC8vIFJlbW92ZSBmaWx0ZXJcbiAgICAgICAgY29sdW1uLmZpbHRlci5zcGxpY2UoY29sdW1uLmZpbHRlci5pbmRleE9mKGZpbHRlciksIDEpO1xuICAgICAgICBpZiAoZmlsdGVyLnJhbmdlKSB7XG4gICAgICAgICAgY29sdW1uLmNhbGVuZGVyU2hvdyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY29sdW1uLmZpbHRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFkZCBmaWx0ZXJcbiAgICAgICAgY29sdW1uLmZpbHRlci5wdXNoKGZpbHRlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2x1bW4ubXVsdGlwbGUpIHtcbiAgICAgIGNvbHVtbi5maWx0ZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChIZWxwZXJzLmlzQmxhbmsoZmlsdGVyLnZhbHVlKSA/IGZpbHRlciA6IGZpbHRlci52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbi5maWx0ZXIgPSBIZWxwZXJzLmlzQmxhbmsoZmlsdGVyLnZhbHVlKSA/IGZpbHRlciA6IGZpbHRlci52YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xuICB9XG5cbiAgb25GaWx0ZXJDbGVhcihjb2x1bW46IGFueSk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29sdW1uLmZpbHRlciA9IG51bGw7XG4gICAgICBjb2x1bW4uZnJlZXRleHRGaWx0ZXIgPSBudWxsO1xuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xuICAgICAgaWYgKGNvbHVtbi5vcmlnaW5hbE9wdGlvbnMpIHtcbiAgICAgICAgY29sdW1uLm9wdGlvbnMgPSBjb2x1bW4ub3JpZ2luYWxPcHRpb25zO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJBbGxTb3J0QW5kRmlsdGVycygpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyaW5nKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgICBjb2x1bW4uc29ydCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIHVwZGF0ZXMgdGhlIHJvdyBkYXRhIHRvIHJlZmxlY3QgdGhlIGFjdGl2ZSBmaWx0ZXJzLlxuICAgKi9cbiAgb25GaWx0ZXJDaGFuZ2UoZXZlbnQ/OiBFdmVudCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5maWx0ZXJpbmcpIHtcbiAgICAgIC8vIEFycmF5IG9mIGZpbHRlcnNcbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKChjb2wpID0+ICFIZWxwZXJzLmlzRW1wdHkoY29sLmZpbHRlcikpO1xuICAgICAgaWYgKGZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBmaWx0ZXJzKSB7XG4gICAgICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbihjb2x1bW4ubWF0Y2gpKSB7XG4gICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSAodmFsdWUsIHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY29sdW1uLm1hdGNoKHJlY29yZCwgY29sdW1uLmZpbHRlcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLnByZUZpbHRlciAmJiBIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLnByZUZpbHRlcikpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnksIGNvbHVtbi5wcmVGaWx0ZXIodGhpcy5lc2NhcGVDaGFyYWN0ZXJzKGNvbHVtbi5maWx0ZXIpKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpKSB7XG4gICAgICAgICAgICAvLyBUaGUgZmlsdGVycyBhcmUgYW4gYXJyYXkgKG11bHRpLXNlbGVjdCksIGNoZWNrIHZhbHVlXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGNvbHVtbi5maWx0ZXI7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIGFuIGFycmF5IG9mIHt2YWx1ZTogJycsIGxhYmVsczogJyd9XG4gICAgICAgICAgICBpZiAob3B0aW9uc1swXS52YWx1ZSB8fCBvcHRpb25zWzBdLmxhYmVsKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnMgPSBjb2x1bW4uZmlsdGVyLm1hcCgob3B0KSA9PiBvcHQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0geyBhbnk6IG9wdGlvbnMgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi50eXBlICYmIGNvbHVtbi50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4uZmlsdGVyLnN0YXJ0RGF0ZSAmJiBjb2x1bW4uZmlsdGVyLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIG1pbjogRGF0ZVV0aWwuc3RhcnRPZkRheShjb2x1bW4uZmlsdGVyLnN0YXJ0RGF0ZSksXG4gICAgICAgICAgICAgICAgbWF4OiBEYXRlVXRpbC5zdGFydE9mRGF5KERhdGVVdGlsLmFkZERheXMoRGF0ZVV0aWwuc3RhcnRPZkRheShjb2x1bW4uZmlsdGVyLmVuZERhdGUpLCAxKSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgbWluOiBjb2x1bW4uZmlsdGVyLm1pbiA/IERhdGVVdGlsLmFkZERheXMoc3RhcnRPZlRvZGF5KCksIGNvbHVtbi5maWx0ZXIubWluKSA6IHN0YXJ0T2ZUb2RheSgpLFxuICAgICAgICAgICAgICAgIG1heDogY29sdW1uLmZpbHRlci5tYXggPyBEYXRlVXRpbC5hZGREYXlzKHN0YXJ0T2ZUb21vcnJvdygpLCBjb2x1bW4uZmlsdGVyLm1heCkgOiBzdGFydE9mVG9tb3Jyb3coKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gY29sdW1uLmZpbHRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5maWx0ZXJpbmcpKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyaW5nKHF1ZXJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0gcXVlcnk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5maWx0ZXIgPSB7fTtcbiAgICAgIH1cbiAgICAgIC8vIFRyaWNrbGUgZG93biB0byBrZWVwIHNvcnRcbiAgICAgIC8vIHRoaXMub25Tb3J0Q2hhbmdlKHRoaXMuY3VycmVudFNvcnRDb2x1bW4pO1xuICAgICAgdGhpcy5maXJlVGFibGVDaGFuZ2VFdmVudCgpO1xuXG4gICAgICAvLyBJZiBwYWdpbmcsIHJlc2V0IHBhZ2VcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgICAgdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQgPSAxO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGwoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVzY2FwZUNoYXJhY3RlcnMoZmlsdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZmlsdGVyLnJlcGxhY2UoLycvZywgXCInJ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgZmlsdGVyKTogYm9vbGVhbiB7XG4gICAgLy8gVE9ETzogVGhpcyBuZWVkcyB0byBiZSByZWZhY3RvcmVkXG4gICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGNvbHVtbiAmJiAhSGVscGVycy5pc0JsYW5rKGNvbHVtbi5maWx0ZXIpICYmICFIZWxwZXJzLmlzQmxhbmsoZmlsdGVyKSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmxhYmVsID09PSBmaWx0ZXIubGFiZWw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLmluY2x1ZGVzKGZpbHRlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uLmZpbHRlciA9PT0gdHlwZW9mIGZpbHRlcikge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlciA9PT0gZmlsdGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlciA9PT0gZmlsdGVyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0FjdGl2ZTtcbiAgfVxuXG4gIG9uU29ydENoYW5nZShjb2x1bW4pIHtcbiAgICB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID0gY29sdW1uO1xuICAgIGNvbnN0IHNvcnRlZENvbHVtbnM6IGFueSA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKHRoaXNDb2x1bW4pID0+IHtcbiAgICAgIHJldHVybiB0aGlzQ29sdW1uLnNvcnQgJiYgdGhpc0NvbHVtbiAhPT0gdGhpcy5jdXJyZW50U29ydENvbHVtbjtcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IHNvcnRlZENvbHVtbiBvZiBzb3J0ZWRDb2x1bW5zKSB7XG4gICAgICBzb3J0ZWRDb2x1bW4uc29ydCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5zb3J0aW5nKSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5zb3J0aW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbihjb2x1bW4ucHJlU29ydCkpIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbXS5jb25jYXQoY29sdW1uLnByZVNvcnQoY29sdW1uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuc29ydCA9IFt7IGZpZWxkOiBjb2x1bW4uY29tcGFyZSB8fCBjb2x1bW4ubmFtZSwgcmV2ZXJzZTogY29sdW1uLnNvcnQgPT09ICdkZXNjJyB9XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXJlIHRhYmxlIGNoYW5nZSBldmVudFxuICAgIC8vIHRoaXMuZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKTtcblxuICAgIC8vIElmIHBhZ2luZywgcmVzZXQgcGFnZVxuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gMTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmaXJlVGFibGVDaGFuZ2VFdmVudCgpIHtcbiAgICAvLyBDb25zdHJ1Y3QgYSB0YWJsZSBjaGFuZ2Ugb2JqZWN0XG4gICAgY29uc3Qgb25UYWJsZUNoYW5nZTogYW55ID0ge307XG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKGNvbCkgPT4gY29sLmZpbHRlciAmJiBjb2wuZmlsdGVyLmxlbmd0aCk7XG4gICAgb25UYWJsZUNoYW5nZS5maWx0ZXIgPSBmaWx0ZXJzLmxlbmd0aCA/IGZpbHRlcnMgOiBmYWxzZTtcbiAgICBvblRhYmxlQ2hhbmdlLnNvcnQgPSB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID8gdGhpcy5jdXJyZW50U29ydENvbHVtbiA6IGZhbHNlO1xuICAgIG9uVGFibGVDaGFuZ2Uucm93cyA9IHRoaXMucm93cztcblxuICAgIC8vIEVtaXQgZXZlbnRcbiAgICB0aGlzLm9uVGFibGVDaGFuZ2UuZW1pdChvblRhYmxlQ2hhbmdlKTtcbiAgfVxuXG4gIGZpbmRDb2x1bW5JbmRleCh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5zW2ldLm5hbWUgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uT3JkZXJDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LmZpcnN0Lm5hbWUpO1xuICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5maW5kQ29sdW1uSW5kZXgoZXZlbnQuc2Vjb25kLm5hbWUpO1xuICAgIHRoaXMuY29sdW1ucy5zcGxpY2UobmV3SW5kZXgsIDAsIHRoaXMuY29sdW1ucy5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcbiAgfVxuXG4gIGV4cGFuZEFsbE9uUGFnZShleHBhbmRlZCkge1xuICAgIHRoaXMuY29uZmlnLmV4cGFuZEFsbCA9ICFleHBhbmRlZDtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XG4gICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFBhZ2UoZGF0YT86IGFueSkge1xuICAgIGlmICghdGhpcy5tYXN0ZXIpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgIC8vIE9ubHkgc2hvdyB0aGUgc2VsZWN0IGFsbCBtZXNzYWdlIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgbmV3IHBhZ2Ugc2VsZWN0ZWQgYXQgYSB0aW1lXG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xuICAgICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5wYWdlZERhdGEpIHtcbiAgICAgICAgcm93Ll9zZWxlY3RlZCA9IHRoaXMubWFzdGVyO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNlbGVjdCBhbGwgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIG5ldyBwYWdlIHNlbGVjdGVkIGF0IGEgdGltZVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCsrO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPT09IDEgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggIT09IHRoaXMuZGF0YVByb3ZpZGVyLnRvdGFsO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZWxlY3RBbGwodmFsdWUpIHtcbiAgICB0aGlzLm1hc3RlciA9IHZhbHVlO1xuICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QpIHtcbiAgICAgIHJvdy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlID8gdGhpcy5kYXRhUHJvdmlkZXIubGlzdCA6IFtdO1xuICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gIH1cblxuICByb3dTZWxlY3RIYW5kbGVyKGRhdGE/OiBhbnkpIHtcbiAgICAvLyB0aGlzLnBhZ2VkRGF0YSA9IHRoaXMucm93cy5zbGljZSh0aGlzLmdldFBhZ2VTdGFydCgpLCB0aGlzLmdldFBhZ2VFbmQoKSk7XG4gICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kYXRhUHJvdmlkZXIubGlzdC5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICBpZiAodGhpcy5wYWdlU2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm1hc3RlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VTZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucGFnZWREYXRhLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXN0ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFzdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSB0cnVlO1xuXG4gICAgICAvLyBCcmVha2luZyB0aGUgc2VsZWN0ZWQgcGFnZSBjb3VudFxuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgIH1cbiAgICB0aGlzLmVtaXRTZWxlY3RlZCh0aGlzLnNlbGVjdGVkKTtcbiAgfVxuXG4gIGVtaXRTZWxlY3RlZChzZWxlY3RlZCkge1xuICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IGxlbmd0aDogc2VsZWN0ZWQubGVuZ3RoLCBzZWxlY3RlZCB9KTtcbiAgfVxuXG4gIHJvd0NsaWNrSGFuZGxlcihyb3cpIHtcbiAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0KSB7XG4gICAgICB0aGlzLmFjdGl2ZUlkID0gcm93LmlkIHx8IDA7XG4gICAgICB0aGlzLm9uUm93Q2xpY2suZW1pdChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRPcHRpb25zKGNvbHVtbikge1xuICAgIC8vIFRPRE8gLSBuZWVkcyB0byBjb21lIGZyb20gbGFiZWwgc2VydmljZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2lzc3Vlcy8xMTZcbiAgICBjb25zdCBvcHRzOiBhbnlbXSA9IFtcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QxRGF5LCBtaW46IC0xLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q3RGF5cywgbWluOiAtNywgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MzBEYXlzLCBtaW46IC0zMCwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0OTBEYXlzLCBtaW46IC05MCwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MVllYXIsIG1pbjogLTM2NiwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MURheSwgbWluOiAwLCBtYXg6IDEgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ3RGF5cywgbWluOiAwLCBtYXg6IDcgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQzMERheXMsIG1pbjogMCwgbWF4OiAzMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDkwRGF5cywgbWluOiAwLCBtYXg6IDkwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MVllYXIsIG1pbjogMCwgbWF4OiAzNjYgfSxcbiAgICBdO1xuXG4gICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4ucmFuZ2UpIHtcbiAgICAgIG9wdHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiB0aGlzLmxhYmVscy5jdXN0b21EYXRlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRzO1xuICB9XG5cbiAgb25DYWxlbmRlclNlbGVjdChjb2x1bW4sIGV2ZW50KTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoZXZlbnQuc3RhcnREYXRlICYmIGV2ZW50LmVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgfVxuXG4gIG9uRmlsdGVyS2V5d29yZHMoY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAmJiBjb25maWcuZmlsdGVyaW5nICYmIGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXIpIHtcbiAgICAgIGNvbnN0IGZpbHRlcktleXdvcmRzID0gY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucykge1xuICAgICAgICBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb24gJiYgb3B0aW9uLmxhYmVsID8gb3B0aW9uLmxhYmVsIDogb3B0aW9uO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZmlsdGVyS2V5d29yZHMpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh+dmFsdWUuaW5kZXhPZihmaWx0ZXJLZXl3b3JkcykgfHwgfnZhbHVlLmluZGV4T2YoZmlsdGVyS2V5d29yZHMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnMgPSBuZXdPcHRpb25zO1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5maWx0ZXIgPSBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucztcbiAgICB9XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBUYWJsZSBpbnRvIEVESVQgbW9kZSwgYmFzZWQgb24gdGhlIHJvdy9jb2x1bW4gcGFzc2VkIHlvdSBjYW4gZW50ZXIgaW4gYSBmZXcgc3RhdGVzXG4gICAqICgxKSBzZXRUYWJsZUVkaXQoKSAtIGRvbid0IHBhc3MgYW55IHRvIHB1dCB0aGUgRlVMTCB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiAoMikgc2V0VGFibGVFZGl0KDEpIC0gcGFzcyBvbmx5IHJvdyB0byBwdXQgdGhhdCBGVUxMIHJvdyBvZiB0aGUgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogKDMpIHNldFRhYmxlRWRpdCgxLCAxKSAtIHBhc3Mgcm93IGFuZCBjb2x1bW4gdG8gcHV0IHRoYXQgY29sdW1uIG9mIHRoZSByb3cgb2YgdGhlIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBzZXRUYWJsZUVkaXQocm93TnVtYmVyPzogbnVtYmVyLCBjb2x1bW5OdW1iZXI/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGUgPSBOb3ZvVGFibGVNb2RlLkVESVQ7XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLmVkaXQoKTtcbiAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIHJvdy5fZWRpdGluZyA9IHJvdy5fZWRpdGluZyB8fCB7fTtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4udmlld09ubHkpIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiYgSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikpIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiYgcm93SW5kZXggPT09IE51bWJlcihyb3dOdW1iZXIpICYmIEhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmXG4gICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpICYmXG4gICAgICAgICAgcm93SW5kZXggPT09IE51bWJlcihyb3dOdW1iZXIpICYmXG4gICAgICAgICAgY29sdW1uSW5kZXggPT09IE51bWJlcihjb2x1bW5OdW1iZXIpXG4gICAgICAgICkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIExlYXZlcyBlZGl0IG1vZGUgZm9yIHRoZSBUYWJsZSBhbmQgcHV0cyBldmVyeXRoaW5nIGJhY2sgdG8gVklFVyBvbmx5XG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqIEBwYXJhbSBjYW5jZWwgLSB3aGV0aGVyIG9yIG5vdCB0byBzYXZlIGRhdGEgb3IgdW5kb1xuICAgKi9cbiAgcHJpdmF0ZSBsZWF2ZUVkaXRNb2RlKGNhbmNlbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcbiAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93Ll9lZGl0aW5nID0gcm93Ll9lZGl0aW5nIHx8IHt9O1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoY2FuY2VsKSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIudW5kbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuY29tbWl0KCk7XG4gICAgfVxuICAgIHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgbmV3IHJvdyBpbnRvIHRoZSB0YWJsZSB0byBiZSBlZGl0ZWQsIGNhbiBiZSBjYWxsZWQgZnJvbSBhIGxvY2FsIHJlZmVyZW5jZSBvZiB0aGUgdGFibGUgaW4geW91ciB0ZW1wbGF0ZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgYWRkRWRpdGFibGVSb3coZGVmYXVsdFZhbHVlOiBhbnkgPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlRm9ybVJvd3MgPSB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCByb3c6IGFueSA9IHt9O1xuICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XG4gICAgcm93LmNvbnRyb2xzID0ge307XG4gICAgcm93Ll9lZGl0aW5nID0ge307XG4gICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGggKyAxO1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgIC8vIFVzZSB0aGUgY29udHJvbCBwYXNzZWQgb3IgdXNlIGEgUmVhZE9ubHlDb250cm9sIHNvIHRoYXQgdGhlIGZvcm0gaGFzIHRoZSB2YWx1ZXNcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb2x1bW4uZWRpdG9yQ29uZmlnXG4gICAgICAgID8gQ29udHJvbEZhY3RvcnkuY3JlYXRlKGNvbHVtbi5lZGl0b3JUeXBlLCBjb2x1bW4uZWRpdG9yQ29uZmlnKVxuICAgICAgICA6IG5ldyBSZWFkT25seUNvbnRyb2woeyBrZXk6IGNvbHVtbi5uYW1lIH0pO1xuICAgICAgY29udHJvbC52YWx1ZSA9IG51bGw7IC8vIHJlbW92ZSBjb3BpZWQgY29sdW1uIHZhbHVlXG4gICAgICByb3cuY29udHJvbHNbY29sdW1uLm5hbWVdID0gY29udHJvbDtcbiAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSAhY29sdW1uLnZpZXdPbmx5O1xuICAgICAgcm93Q29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICB9KTtcbiAgICB0aGlzLmZvcm1VdGlscy5zZXRJbml0aWFsVmFsdWVzKHJvd0NvbnRyb2xzLCBkZWZhdWx0VmFsdWUsIGZhbHNlKTtcbiAgICB0YWJsZUZvcm1Sb3dzLnB1c2godGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAocm93Q29udHJvbHMpKTtcbiAgICB0aGlzLl9yb3dzLnB1c2gocm93KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVmFsaWRhdGVzIHRoZSBGb3JtIGluc2lkZSBvZiB0aGUgVGFibGUsIGlmIHRoZXJlIGFyZSBlcnJvcnMgaXQgd2lsbCBkaXNwbGF5L3JldHVybiB0aGUgZXJyb3JzIGZvciBlYWNoIHJvdy5cbiAgICogSWYgdGhlcmUgYXJlIG5vIGVycm9ycywgdGhlbiBpdCB3aWxsIHJldHVybiBPTkxZIHRoZSBjaGFuZ2VkIGRhdGEgZm9yIGVhY2ggcm93LCB0aGUgZGF0YSByZXR1cm5lZCB3aWxsIGJlIGluIHRoZSBmb3JtOlxuICAgKiB7IGlkOiBJRF9PRl9SRUNPUkQsIGtleTogdmFsdWUgfSAtLSBkYXRhIHRoYXQgd2FzIHVwZGF0ZWRcbiAgICogeyBpZDogdW5kZWZpbmVkLCBrZXk6IHZhbHVlIH0gLS0gZGF0YSB0aGF0IHdhcyBhZGRlZFxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgdmFsaWRhdGVBbmRHZXRVcGRhdGVkRGF0YSgpOiB7IGNoYW5nZWQ/OiBhbnlbXTsgZXJyb3JzPzogeyBlcnJvcnM6IGFueTsgcm93OiBhbnk7IGluZGV4OiBudW1iZXIgfVtdIH0ge1xuICAgIGlmICh0aGlzLnRhYmxlRm9ybSAmJiB0aGlzLnRhYmxlRm9ybS5jb250cm9scyAmJiB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzKSB7XG4gICAgICBjb25zdCBjaGFuZ2VkUm93cyA9IFtdO1xuICAgICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgICAvLyBHbyBvdmVyIHRoZSBGb3JtQXJyYXkncyBjb250cm9sc1xuICAgICAgKHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5KS5jb250cm9scy5mb3JFYWNoKChmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXAsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgbGV0IGNoYW5nZWRSb3cgPSBudWxsO1xuICAgICAgICBsZXQgZXJyb3IgPSBudWxsO1xuICAgICAgICAvLyBHbyBvdmVyIHRoZSBmb3JtIGdyb3VwIGNvbnRyb2xzXG4gICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW2tleV07XG4gICAgICAgICAgLy8gSGFuZGxlIHZhbHVlIGNoYW5naW5nXG4gICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5kaXJ0eSAmJiAhY29udHJvbC5lcnJvcnMpIHtcbiAgICAgICAgICAgIGlmICghY2hhbmdlZFJvdykge1xuICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIElELCBzbyB3ZSBoYXZlIHNvbWUga2V5IHRvIHNhdmUgYWdhaW5zdFxuICAgICAgICAgICAgICBjaGFuZ2VkUm93ID0ge307XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9yb3dzW2luZGV4XS5pZCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRSb3cuaWQgPSB0aGlzLl9yb3dzW2luZGV4XS5pZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgZGlydHksIGdyYWIgdmFsdWUgb2ZmIHRoZSBmb3JtXG4gICAgICAgICAgICBjaGFuZ2VkUm93W2tleV0gPSB0aGlzLnRhYmxlRm9ybS5nZXRSYXdWYWx1ZSgpLnJvd3NbaW5kZXhdW2tleV07XG4gICAgICAgICAgICAvLyBTZXQgdmFsdWUgYmFjayB0byByb3cgKHNob3VsZCBiZSBhbHJlYWR5IGRvbmUgdmlhIHRoZSBzZXJ2ZXIgY2FsbCwgYnV0IGRvIGl0IGFueXdheSlcbiAgICAgICAgICAgIHRoaXMuX3Jvd3NbaW5kZXhdW2tleV0gPSBjaGFuZ2VkUm93W2tleV07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb250cm9sICYmIGNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JzXG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIGVycm9yID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvcltrZXldID0gY29udHJvbC5lcnJvcnM7XG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hhbmdlZFJvdykge1xuICAgICAgICAgIGNoYW5nZWRSb3dzLnB1c2goY2hhbmdlZFJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goeyBlcnJvcnM6IGVycm9yLCByb3c6IHRoaXMuX3Jvd3NbaW5kZXhdLCBpbmRleCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBSZXR1cm4gZXJyb3JzIGlmIGFueSwgb3RoZXJ3aXNlIHJldHVybiB0aGUgY2hhbmdlZCByb3dzXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4geyBjaGFuZ2VkOiBjaGFuZ2VkUm93cyB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZXJyb3JzIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGNhbmNlbEVkaXRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZUVkaXRNb2RlKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHNhdmVDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmVFZGl0TW9kZShmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERpc3BsYXlzIGEgdG9hc3QgbWVzc2FnZSBpbnNpZGUgb2YgdGhlIHRhYmxlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBkaXNwbGF5VG9hc3RNZXNzYWdlKHRvYXN0OiB7IGljb246IHN0cmluZzsgdGhlbWU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH0sIGhpZGVEZWxheT86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMudG9hc3QgPSB0b2FzdDtcbiAgICBpZiAoaGlkZURlbGF5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpLCBoaWRlRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRm9yY2UgaGlkZSB0aGUgdG9hc3QgbWVzc2FnZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgaGlkZVRvYXN0TWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0ID0gbnVsbDtcbiAgICAvLyBIYWNrIHRvIG1ha2UgdGhlIHRhYmxlIGRpc3BsYXkgcHJvcGVybHkgYWZ0ZXIgaGlkaW5nIHRoZSB0b2FzdFxuICAgIHRoaXMuZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdCA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gZGlzcGxheSB0aGUgbG9hZGluZyBvdmVybGF5IG9uIHRoZSB0YWJsZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgdG9nZ2xlTG9hZGluZyhzaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gc2hvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gaGlkZSBhIGNvbHVtbiBpbiBlZGl0IG9yIHZpZXcgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgaXNDb2x1bW5IaWRkZW4oY29sdW1uOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0aW5nID8gISFjb2x1bW4uaGlkZUNvbHVtbk9uRWRpdCA6ICEhY29sdW1uLmhpZGVDb2x1bW5PblZpZXc7XG4gIH1cbn1cbiJdfQ==