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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoTableElement, deps: [{ token: i1.NovoLabelService }, { token: i2.FormUtils }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoTableElement, selector: "novo-table", inputs: { config: "config", columns: "columns", theme: "theme", skipSortAndFilterClear: "skipSortAndFilterClear", mode: "mode", editable: "editable", rowIdentifier: "rowIdentifier", name: "name", rows: "rows", dataProvider: "dataProvider" }, outputs: { onRowClick: "onRowClick", onRowSelect: "onRowSelect", onTableChange: "onTableChange" }, host: { properties: { "attr.theme": "theme", "class.editing": "mode === NovoTableMode.EDIT", "class.novo-table-loading": "loading" }, classAttribute: "novo-table" }, viewQueries: [{ propertyName: "filterInputs", predicate: ["filterInput"], descendants: true, read: ElementRef }], ngImport: i0, template: `
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
  `, isInline: true, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background:#00000012;z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:#4a89dc33}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#fff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n+2),.table-striped.table-details>tbody tr:nth-of-type(4n+1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000;color:#fff}novo-table[theme=black]>header novo-pagination{background:#00000026}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#fff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:#00000026}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:#00000026}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:#00000026}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:#00000026}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:#00000026}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:#00000026}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:#00000026}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:#00000026}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:#00000026}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:#00000026}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:#00000026}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:#00000026}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:#00000026}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:#00000026}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:#00000026}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:#00000026}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:#00000026}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:#00000026}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:#00000026}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:#00000026}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:#00000026}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:#00000026}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:#00000026}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:#00000026}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:#00000026}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:#00000026}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:#00000026}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:#00000026}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:#00000026}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:#00000026}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:#00000026}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:#00000026}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:#00000026}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:#00000026}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:#00000026}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:#00000026}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:#00000026}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:#00000026}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:#00000026}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:#00000026}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:#00000026}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:#00000026}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:#00000026}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:#00000026}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:#00000026}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:#00000026}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:#00000026}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:#00000026}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#39d;color:#fff}novo-table[theme=company]>header novo-pagination{background:#00000026}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#4b7;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:#00000026}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#a69;color:#fff}novo-table[theme=lead]>header novo-pagination{background:#00000026}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#fa4;color:#fff}novo-table[theme=contact]>header novo-pagination{background:#00000026}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#fa4;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:#00000026}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#625;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:#00000026}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#b56;color:#fff}novo-table[theme=job]>header novo-pagination{background:#00000026}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#b56;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:#00000026}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:#00000026}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:#00000026}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:#00000026}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:#00000026}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:#00000026}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:#00000026}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:#00000026}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:#00000026}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:#00000026}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:#00000026}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:#00000026}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:#00000026}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:#00000026}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:#00000026}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:#00000026}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n+2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n+1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"], dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i2.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { kind: "component", type: i2.NovoFormElement, selector: "novo-form", inputs: ["form", "layout", "hideHeader"] }, { kind: "directive", type: i5.NovoTableKeepFilterFocus, selector: "[keepFilterFocused]" }, { kind: "component", type: i6.Pagination, selector: "novo-pagination", inputs: ["page", "totalItems", "itemsPerPage", "rowOptions", "label", "disablePageSelection"], outputs: ["pageChange", "itemsPerPageChange", "onPageChange"] }, { kind: "component", type: i7.RowDetails, selector: "novo-row-details", inputs: ["data", "renderer"] }, { kind: "component", type: i8.TableCell, selector: "novo-table-cell", inputs: ["column", "row", "form", "hasEditor"] }, { kind: "directive", type: i9.TableFilter, selector: "[novoTableFilter]", inputs: ["novoTableFilter"], outputs: ["onFilterChange"] }, { kind: "directive", type: i10.ThOrderable, selector: "[novoThOrderable]", inputs: ["novoThOrderable"], outputs: ["onOrderChange"] }, { kind: "directive", type: i11.ThSortable, selector: "[novoThSortable]", inputs: ["novoThSortable", "column"], outputs: ["onSortChange"] }, { kind: "component", type: i12.NovoToastElement, selector: "novo-toast", inputs: ["appearance", "theme", "icon", "title", "action", "hasDialogue", "link", "isCloseable", "message"], outputs: ["closed"] }, { kind: "component", type: i13.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "directive", type: i14.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { kind: "component", type: i15.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i16.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i17.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i18.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i19.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i19.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "directive", type: i19.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i20.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i21.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoTableElement, decorators: [{
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
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background:#00000012;z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:#4a89dc33}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#fff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n+2),.table-striped.table-details>tbody tr:nth-of-type(4n+1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000;color:#fff}novo-table[theme=black]>header novo-pagination{background:#00000026}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#fff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:#00000026}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:#00000026}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:#00000026}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:#00000026}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:#00000026}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:#00000026}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:#00000026}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:#00000026}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:#00000026}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:#00000026}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:#00000026}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:#00000026}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:#00000026}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:#00000026}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:#00000026}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:#00000026}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:#00000026}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:#00000026}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:#00000026}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:#00000026}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:#00000026}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:#00000026}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:#00000026}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:#00000026}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:#00000026}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:#00000026}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:#00000026}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:#00000026}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:#00000026}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:#00000026}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:#00000026}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:#00000026}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:#00000026}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:#00000026}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:#00000026}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:#00000026}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:#00000026}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:#00000026}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:#00000026}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:#00000026}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:#00000026}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:#00000026}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:#00000026}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:#00000026}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:#00000026}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:#00000026}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:#00000026}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:#00000026}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#39d;color:#fff}novo-table[theme=company]>header novo-pagination{background:#00000026}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#4b7;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:#00000026}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#a69;color:#fff}novo-table[theme=lead]>header novo-pagination{background:#00000026}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#fa4;color:#fff}novo-table[theme=contact]>header novo-pagination{background:#00000026}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#fa4;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:#00000026}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#625;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:#00000026}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#b56;color:#fff}novo-table[theme=job]>header novo-pagination{background:#00000026}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#b56;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:#00000026}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:#00000026}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:#00000026}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:#00000026}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:#00000026}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:#00000026}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:#00000026}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:#00000026}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:#00000026}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:#00000026}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:#00000026}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:#00000026}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:#00000026}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:#00000026}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:#00000026}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:#00000026}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n+2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n+1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i2.FormUtils }, { type: i3.FormBuilder }, { type: i0.ChangeDetectorRef }], propDecorators: { filterInputs: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzSixPQUFPLEVBQThCLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNGLFNBQVM7QUFDVCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQnpGLCtHQUErRztBQUMvRyxNQUFNLENBQU4sSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3ZCLGlEQUFRLENBQUE7SUFDUixpREFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUhXLGFBQWEsS0FBYixhQUFhLFFBR3hCO0FBcVZELE1BQU0sT0FBTyxnQkFBZ0I7SUFvRDNCLElBQ0ksSUFBSSxDQUFDLElBQWdCO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksSUFBSSxJQUFJ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LEVBQUUsVUFBVSxFQUFFO2dCQUlqRCxNQUFNO3NCQURMLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixzQkFBc0I7c0JBRHJCLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFHTixhQUFhO3NCQURaLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUlOLFVBQVU7c0JBRFQsTUFBTTtnQkFHUCxXQUFXO3NCQURWLE1BQU07Z0JBR1AsYUFBYTtzQkFEWixNQUFNO2dCQTRCSCxJQUFJO3NCQURQLEtBQUs7Z0JBaUJGLFlBQVk7c0JBRGYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgc3RhcnRPZlRvZGF5LCBzdGFydE9mVG9tb3Jyb3cgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBBUFBcbmltcG9ydCB7IENvbGxlY3Rpb25FdmVudCwgTm92b0xhYmVsU2VydmljZSwgUGFnZWRBcnJheUNvbGxlY3Rpb24gfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IERhdGVVdGlsLCBIZWxwZXJzLCBub3RpZnkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IENvbnRyb2xGYWN0b3J5LCBGb3JtVXRpbHMsIFJlYWRPbmx5Q29udHJvbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZm9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b1RhYmxlQ29uZmlnIHtcbiAgLy8gUGFnaW5nIGNvbmZpZ1xuICBwYWdpbmc/OiB7XG4gICAgY3VycmVudDogbnVtYmVyOyAvLyBjdXJyZW50IHBhZ2VcbiAgICBpdGVtc1BlclBhZ2U6IG51bWJlcjsgLy8gaXRlbXMgcGVyIHBhZ2VcbiAgICBvblBhZ2VDaGFuZ2U6IEZ1bmN0aW9uOyAvLyBmdW5jdGlvbiB0byBoYW5kbGUgcGFnZSBjaGFuZ2luZ1xuICAgIHJvd09wdGlvbnM/OiB7IHZhbHVlOiBudW1iZXI7IGxhYmVsOiBzdHJpbmcgfVtdOyAvLyBwYWdlIG9wdGlvbnNcbiAgICBkaXNhYmxlUGFnZVNlbGVjdGlvbj86IGJvb2xlYW47IC8vIGRpc2FibGVzIHRoZSBwYWdlcyBmcm9tIGJlaW5nIHNlbGVjdGVkXG4gIH07XG4gIC8vIEZvb3RlciBjb25maWcgKHRvdGFsIGZvb3RlcilcbiAgZm9vdGVycz86IEFycmF5PHtcbiAgICBjb2x1bW5zOiBBcnJheTxzdHJpbmc+OyAvLyBzdHJpbmcgYXJyYXkgb2YgY29sdW1ucyB0byB0b3RhbFxuICAgIG1ldGhvZDogc3RyaW5nOyAvLyBtZXRob2QgdG8gdXNlIGZvciB0aGUgZm9vdGVyLCBTVU0gfCBBVkcsIGRlZmF1bHRzIHRvIFNVTVxuICAgIGxhYmVsQ29sdW1uOiBzdHJpbmc7IC8vIGNvbHVtbiB0byB1c2UgYXMgdGhlIFwidG90YWxcIiBsYWJlbFxuICAgIGxhYmVsOiBzdHJpbmc7IC8vIGxhYmVsIHRvIHVzZSBpbiB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gIH0+O1xuICAvLyBUT0RPOiBXaGVuIHRoZXNlIHR5cGVzIGFyZSBlbmZvcmNlZCBhcyBgYm9vbGVhbiB8IEZ1bmN0aW9uYCwgdGhlcmUncyBhIGxpbnQgZXJyb3IuIFRoYXQncyBhIGJ1Zy5cbiAgZmlsdGVyaW5nPzogYm9vbGVhbiB8IGFueTsgLy8gVHVybiBvbiBmaWx0ZXJpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3IgZmlsdGVyaW5nIGNhbGxiYWNrXG4gIHNvcnRpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIHNvcnRpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3Igc29ydGluZyBjYWxsYmFja1xuICBvcmRlcmluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiBvcmRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBvcmRlcmluZyBjYWxsYmFja1xuICByZXNpemluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiByZXNpemluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciByZXNpemluZyBjYWxsYmFja1xuICByb3dTZWxlY3Rpb25TdHlsZT86IHN0cmluZzsgLy8gUm93IHNlbGVjdGlvbiBzdHlsZSwgY2hlY2tib3ggb3Igcm93XG4gIHJvd1NlbGVjdD86IGJvb2xlYW47IC8vIFR1cm4gb24gcm93IHNlbGVjdGlvblxuICBoYXNEZXRhaWxzPzogYm9vbGVhbjsgLy8gVHVybiBvbiBkZXRhaWxzIHJvdyBmb3IgdGhlIHRhYmxlXG4gIGRldGFpbHNSZW5kZXJlcj86IGFueTsgLy8gUmVuZGVyZXIvY29tcG9uZW50IGZvciB0aGUgZGV0YWlscyByb3dcbiAgZXhwYW5kQWxsPzogYm9vbGVhbjsgLy8gc2hvdWxkIEFsbCBSb3dzIGJlIGV4cGFuZGVkIGJ5IGRlZmF1bHRcbiAgc2VsZWN0QWxsRW5hYmxlZD86IGJvb2xlYW47IC8vIEFsbG93cyB0aGUgdGFibGUsIHdoaWxlIGluIHNlbGVjdGlvbiBtb2RlIHRvIGhhdmUgYSBzZWxlY3QgYWxsIGF0IHRoZSB0b3Bcbn1cblxuLy8gVE9ETyAtIHN1cHBvcnQgKDEpIGNsaWNraW5nIGNlbGwgdG8gZWRpdCwgKDIpIGNsaWNraW5nIHJvdyB0byBlZGl0LCAoMykgYnV0dG9uIHRvIHRyaWdnZXIgZnVsbCB0YWJsZSB0byBlZGl0XG5leHBvcnQgZW51bSBOb3ZvVGFibGVNb2RlIHtcbiAgVklFVyA9IDEsXG4gIEVESVQgPSAyLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYmxlJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by10YWJsZScsXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXG4gICAgJ1tjbGFzcy5lZGl0aW5nXSc6ICdtb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQnLFxuICAgICdbY2xhc3Mubm92by10YWJsZS1sb2FkaW5nXSc6ICdsb2FkaW5nJyxcbiAgfSxcbiAgLy8gZGlyZWN0aXZlczogW10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGhlYWRlciAqbmdJZj1cImNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRhYmxlLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxuICAgICAgICA8bm92by1wYWdpbmF0aW9uXG4gICAgICAgICAgKm5nSWY9XCJjb25maWcucGFnaW5nICYmICEoZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiAhZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSlcIlxuICAgICAgICAgIFtyb3dPcHRpb25zXT1cImNvbmZpZy5wYWdpbmcucm93T3B0aW9uc1wiXG4gICAgICAgICAgW2Rpc2FibGVQYWdlU2VsZWN0aW9uXT1cImNvbmZpZy5wYWdpbmcuZGlzYWJsZVBhZ2VTZWxlY3Rpb25cIlxuICAgICAgICAgIFsocGFnZSldPVwiZGF0YVByb3ZpZGVyLnBhZ2VcIlxuICAgICAgICAgIFsoaXRlbXNQZXJQYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVNpemVcIlxuICAgICAgICAgIFt0b3RhbEl0ZW1zXT1cImRhdGFQcm92aWRlci50b3RhbFwiXG4gICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgPC9ub3ZvLXBhZ2luYXRpb24+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtYWN0aW9uc1wiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXRhYmxlLWxvYWRpbmctb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyB8fCBkYXRhUHJvdmlkZXIuaXNMb2FkaW5nKClcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmc+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9kaXY+XG4gICAgPG5vdm8tdG9hc3QgKm5nSWY9XCJ0b2FzdFwiIFt0aGVtZV09XCJ0b2FzdD8udGhlbWVcIiBbaWNvbl09XCJ0b2FzdD8uaWNvblwiIFttZXNzYWdlXT1cInRvYXN0Py5tZXNzYWdlXCI+PC9ub3ZvLXRvYXN0PlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1jb250YWluZXJcIiAqbmdJZj1cIiFncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0XCI+XG4gICAgICA8bm92by1mb3JtIGhpZGVIZWFkZXI9XCJ0cnVlXCIgW2Zvcm1dPVwidGFibGVGb3JtXCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgZGF0YVRhYmxlXCIgW2NsYXNzLnRhYmxlLWRldGFpbHNdPVwiY29uZmlnLmhhc0RldGFpbHNcIiByb2xlPVwiZ3JpZFwiPlxuICAgICAgICAgIDwhLS0gc2tpcFNvcnRBbmRGaWx0ZXJDbGVhciBpcyBhIGhhY2sgcmlnaHQgbm93LCB3aWxsIGJlIHJlbW92ZWQgb25jZSBDYW52YXMgaXMgcmVmYWN0b3JlZCAtLT5cbiAgICAgICAgICA8dGhlYWQgKm5nSWY9XCJjb2x1bW5zLmxlbmd0aCAmJiAoIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSB8fCBza2lwU29ydEFuZEZpbHRlckNsZWFyIHx8IGVkaXRpbmcpXCI+XG4gICAgICAgICAgICA8dHIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8IS0tIERFVEFJTFMgLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zXCIgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJuZXh0XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhY29uZmlnLmV4cGFuZEFsbFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJleHBhbmQtYWxsXCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwic29ydC1kZXNjXCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIlxuICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImNvbGxhcHNlLWFsbFwiXG4gICAgICAgICAgICAgICAgPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDwhLS0gQ0hFQ0tCT1ggLS0+XG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zIGNoZWNrYm94IG1hc3MtYWN0aW9uXCIgKm5nSWY9XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCdcIj5cbiAgICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJtYXN0ZXJcIlxuICAgICAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwicGFnZVNlbGVjdGVkLmxlbmd0aCA+IDAgJiYgcGFnZVNlbGVjdGVkLmxlbmd0aCA8IHBhZ2VkRGF0YS5sZW5ndGhcIlxuICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwic2VsZWN0UGFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlbGVjdC1hbGwtY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBdPVwibWFzdGVyID8gbGFiZWxzLmRlc2VsZWN0QWxsIDogbGFiZWxzLnNlbGVjdEFsbE9uUGFnZVwiXG4gICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPCEtLSBUQUJMRSBIRUFERVJTIC0tPlxuICAgICAgICAgICAgICA8dGhcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICdtYXNzLWFjdGlvbic6IGNvbmZpZz8ucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICBhY3Rpb25zOiBjb2x1bW4/LmFjdGlvbnM/Lml0ZW1zPy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgICAgcHJldmlldzogY29sdW1uPy5uYW1lID09PSAncHJldmlldydcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICBbbm92b1RoT3JkZXJhYmxlXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgKG9uT3JkZXJDaGFuZ2UpPVwib25PcmRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImlzQ29sdW1uSGlkZGVuKGNvbHVtbilcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRoLWdyb3VwXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZVwiICpuZ0lmPVwiIWNvbHVtbi5oaWRlSGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICA8IS0tIExBQkVMICYgU09SVCBBUlJPV1MgLS0+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGgtdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJjb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgY29sdW1uLnNvcnRpbmcgIT09IGZhbHNlID8gJ3NvcnRhYmxlJyA6ICcnXCJcbiAgICAgICAgICAgICAgICAgICAgW25vdm9UaFNvcnRhYmxlXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU29ydENoYW5nZSk9XCJvblNvcnRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD57eyBjb2x1bW4udGl0bGUgfHwgY29sdW1uLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtc29ydC1pY29uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuc29ydFwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLnNvcnQgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLnNvcnRpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5zb3J0aW5nICE9PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy11cFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy1kb3duXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgRFJPUC1ET1dOIC0tPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tZHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgc2lkZT1cImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5maWx0ZXJpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5maWx0ZXJpbmcgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjb2x1bW4tZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICh0b2dnbGVkKT1cIm9uRHJvcGRvd25Ub2dnbGVkKCRldmVudCwgY29sdW1uLm5hbWUpXCJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIudGFibGUtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyQ2xhc3M9XCJ0YWJsZS1kcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbj1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJsYWJlbHMuZmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmZpbHRlcmVkXT1cImNvbHVtbi5maWx0ZXIgfHwgY29sdW1uLmZpbHRlciA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJmb2N1c0lucHV0KClcIlxuICAgICAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgT1BUSU9OUyBMSVNUIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cFxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY29sdW1uPy5vcHRpb25zPy5sZW5ndGggfHwgY29sdW1uPy5vcmlnaW5hbE9wdGlvbnM/Lmxlbmd0aCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbj8udHlwZSAhPT0gJ2RhdGUnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImZpbHRlci1zZWFyY2hcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT1cImRpYWxvZ3VlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPVwidGltZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhIWNvbHVtbi5hbGxvd0N1c3RvbVRleHRPcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJLZXl3b3JkcygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZnJlZXRleHRGaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZWVwRmlsdGVyRm9jdXNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbikgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj4gPGkgY2xhc3M9XCJiaGktY2hlY2tcIiAqbmdJZj1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIFNFQVJDSCBJTlBVVCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCIhKGNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoIHx8IGNvbHVtbj8ub3JpZ2luYWxPcHRpb25zPy5sZW5ndGgpICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIgbm92b0luZXJ0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cInRpbWVzXCIgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBGaWx0ZXJGb2N1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIERBVEUgT1BUSU9OUyAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCJjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCAmJiBjb2x1bW4/LnR5cGUgPT09ICdkYXRlJyAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiICpuZ0lmPVwiIWNvbHVtbi5jYWxlbmRlclNob3dcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwidGltZXNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2x1bW4ub3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25GaWx0ZXJDbGljayhjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2tlZXBPcGVuXT1cIm9wdGlvbi5yYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImNvbHVtbi5jYWxlbmRlclNob3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24/LmxhYmVsIHx8IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8taWNvbiBub3ZvU3VmZml4IGNvbG9yPVwicG9zaXRpdmVcIiAqbmdJZj1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiPmNoZWNrPC9ub3ZvLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJjYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cImNvbHVtbi5jYWxlbmRlclNob3dcIiBrZWVwT3BlbiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1zdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhY2stbGlua1wiIChjbGljayk9XCJjb2x1bW4uY2FsZW5kZXJTaG93ID0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT57eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tZGF0ZS1waWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3QpPVwib25DYWxlbmRlclNlbGVjdChjb2x1bW4sICRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvbm92by1kYXRlLXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1zdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICA8L25vdm8tZHJvcGRvd24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIC0tPlxuICAgICAgICAgIDx0Ym9keSAqbmdJZj1cIiFkYXRhUHJvdmlkZXIuaXNFbXB0eSgpIHx8IGVkaXRpbmdcIj5cbiAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyAmJiBzaG93U2VsZWN0QWxsTWVzc2FnZSAmJiBjb25maWcuc2VsZWN0QWxsRW5hYmxlZFwiXG4gICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICB7eyBsYWJlbHMuc2VsZWN0ZWRSZWNvcmRzKHNlbGVjdGVkLmxlbmd0aCkgfX1cbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwic2VsZWN0QWxsKHRydWUpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiYWxsLW1hdGNoaW5nLXJlY29yZHNcIj57eyBsYWJlbHMudG90YWxSZWNvcmRzKGRhdGFQcm92aWRlci50b3RhbCkgfX08L2E+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3c9XCIkaW1wbGljaXRcIiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwicm93c1wiPlxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRhYmxlLXJvd1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwicm93LmN1c3RvbUNsYXNzIHx8ICcnXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwibmFtZSArICctJyArIHJvd1tyb3dJZGVudGlmaWVyXVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInJvdy5pZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJvd0NsaWNrSGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInJvdy5pZCA9PT0gYWN0aXZlSWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cIm5leHRcIiAoY2xpY2spPVwicm93Ll9leHBhbmRlZCA9ICFyb3cuX2V4cGFuZGVkXCIgKm5nSWY9XCIhcm93Ll9leHBhbmRlZFwiPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInNvcnQtZGVzY1wiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkID0gIXJvdy5fZXhwYW5kZWRcIiAqbmdJZj1cInJvdy5fZXhwYW5kZWRcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3hcIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJyb3cuX3NlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwicm93U2VsZWN0SGFuZGxlcihyb3cpXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LXJvdy1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIlxuICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZVwiXG4gICAgICAgICAgICAgICAgICBbY2xhc3Mubm92by1mb3JtLXJvd109XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICBbaGlkZGVuXT1cImlzQ29sdW1uSGlkZGVuKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLXRhYmxlLWNlbGxcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgIXJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgICBbaGFzRWRpdG9yXT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tdGFibGUtY2VsbD5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbmRlbnNlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybV09XCJnZXRSb3dDb250cm9sRm9ybShpKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb250cm9sXT1cInJvdy5jb250cm9sc1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgPjwvbm92by1jb250cm9sPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZGV0YWlscy1yb3dcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmhhc0RldGFpbHNcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiIXJvdy5fZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZGV0YWlscy1yb3ctJyArIHJvdy5pZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyb3ctYWN0aW9uc1wiPjwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnID8gY29sdW1ucy5sZW5ndGggKyAxIDogY29sdW1ucy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLXJvdy1kZXRhaWxzIFtkYXRhXT1cInJvd1wiIFtyZW5kZXJlcl09XCJjb25maWcuZGV0YWlsc1JlbmRlcmVyXCI+PC9ub3ZvLXJvdy1kZXRhaWxzPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBOTyBUQUJMRSBEQVRBIFBMQUNFSE9MREVSIC0tPlxuICAgICAgICAgIDx0Ym9keVxuICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCJcbiAgICAgICAgICAgICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiAhZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKSAmJiAhZWRpdGluZ1wiXG4gICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS10YWJsZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNlbXB0eW1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLWVtcHR5LW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJlbXB0eW1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLmVtcHR5VGFibGVNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIE5PIE1BVENISU5HIFJFQ09SRFMgLS0+XG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwidGFibGUtbWVzc2FnZVwiICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSAmJiBkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktdGFibGVcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjbm9tYXRjaG1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLW5vLW1hdGNoaW5nLXJlY29yZHMtbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vLW1hdGNoaW5nLXJlY29yZHNcIiAqbmdJZj1cIm5vbWF0Y2htZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5ub01hdGNoaW5nUmVjb3Jkc01lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gVEFCTEUgREFUQSBFUlJPUiBQTEFDRUhPTERFUiAtLT5cbiAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCIgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaGFzRXJyb3JzKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJ0YWJsZS1lcnJvcnNcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjZXJyb3JtZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1lcnJvci1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiZXJyb3JtZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1jYXV0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZXJyb3JlZFRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPHRmb290ICpuZ0lmPVwiIWNvbmZpZy5mb290ZXJzXCIgW25nQ2xhc3NdPVwiZGF0YVByb3ZpZGVyLmxlbmd0aCAlIDIgPT0gMCA/ICdvZGQnIDogJ2V2ZW4nXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rmb290PlxuICAgICAgICAgIDx0Zm9vdCAqbmdGb3I9XCJsZXQgZm9vdGVyIG9mIGZvb3RlcnM7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cIm5vdm8tdGFibGUtdG90YWwtZm9vdGVyXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiKGNvbHVtbi5pZCB8fCBjb2x1bW4ubmFtZSkgKyAnLXRvdGFsLScgKyBpXCI+XG4gICAgICAgICAgICAgICAge3sgZm9vdGVyW2NvbHVtbi5uYW1lXSB9fVxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rmb290PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9ub3ZvLWZvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL1RhYmxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlRWxlbWVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBAVmlld0NoaWxkcmVuKCdmaWx0ZXJJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICBmaWx0ZXJJbnB1dHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBASW5wdXQoKVxuICBjb25maWc6IE5vdm9UYWJsZUNvbmZpZyA9IHt9O1xuICBASW5wdXQoKVxuICBjb2x1bW5zOiBBcnJheTxhbnk+ID0gW107XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNraXBTb3J0QW5kRmlsdGVyQ2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbW9kZTogTm92b1RhYmxlTW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcbiAgQElucHV0KClcbiAgZWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcm93SWRlbnRpZmllcjogc3RyaW5nID0gJ2lkJztcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gJ3RhYmxlJztcblxuICBAT3V0cHV0KClcbiAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblRhYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZGF0YVByb3ZpZGVyOiBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+O1xuICBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RlZDogQXJyYXk8YW55PiA9IFtdO1xuICBhY3RpdmVJZDogbnVtYmVyID0gMDtcbiAgbWFzdGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIGxhc3RQYWdlOiBudW1iZXIgPSAwO1xuICBzZWxlY3RlZFBhZ2VDb3VudDogbnVtYmVyID0gMDtcbiAgc2hvd1NlbGVjdEFsbE1lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY3VycmVudFNvcnRDb2x1bW46IGFueTtcbiAgcGFnZWREYXRhOiBBcnJheTxhbnk+ID0gW107XG4gIHBhZ2VTZWxlY3RlZDogYW55O1xuICAvLyBNYXAgdG8ga2VlcCB0cmFjayBvZiB3aGF0IGRyb3Bkb3ducyBhcmUgdG9nZ2xlZFxuICAvLyBVc2VkIHRvIHByb3Blcmx5ICpuZ0lmIHRoZSA8bm92by1vcHRncm91cD4gc28gdGhhdCB0aGUga2VlcEZpbHRlckZvY3VzZWQgRGlyZWN0aXZlXG4gIC8vIHdpbGwgcHJvcGVybHkgZmlyZSB0aGUgbmdBZnRlclZpZXdJbml0IGV2ZW50XG4gIHRvZ2dsZWREcm9wZG93bk1hcDogYW55ID0ge307XG4gIHB1YmxpYyBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZTtcbiAgcHVibGljIHRhYmxlRm9ybTogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgcHVibGljIHRvYXN0OiB7IHRoZW1lOiBzdHJpbmc7IGljb246IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH07XG4gIHB1YmxpYyBmb290ZXJzID0gW107XG4gIHB1YmxpYyBncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Mocm93czogQXJyYXk8YW55Pikge1xuICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gcm93cztcbiAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xuICAgIH1cbiAgICAvLyB0aGlzIGlzIGEgdGVtcG9yYXJ5L2hhY2t5IGZpeCB1bnRpbCBhc3luYyBkYXRhbG9hZGluZyBpcyBoYW5kbGVkIHdpdGhpbiB0aGUgdGFibGVcbiAgICBpZiAoIXRoaXMuc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcikge1xuICAgICAgdGhpcy5jbGVhckFsbFNvcnRBbmRGaWx0ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGF0YVByb3ZpZGVyKGRwOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIgPSBBcnJheS5pc0FycmF5KGRwKSA/IG5ldyBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+KGRwKSA6IGRwO1xuICAgIHRoaXMuX2RhdGFQcm92aWRlci5kYXRhQ2hhbmdlLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoZXZlbnQ6IENvbGxlY3Rpb25FdmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgQ29sbGVjdGlvbkV2ZW50LkNIQU5HRTpcbiAgICAgICAgICB0aGlzLl9yb3dzID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAvLyBTZXR1cCBmb3JtXG4gICAgICAgICAgdGhpcy50YWJsZUZvcm0gPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgcm93czogdGhpcy5idWlsZGVyLmFycmF5KFtdKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICAgICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZWREYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRmluZCB0aGF0IGNvbHVtbnMgd2UgbWlnaHQgbmVlZCB0byBzdW0gdXAgdmlhIHRoZSBmb290ZXJcbiAgICAgICAgICBsZXQgY29sdW1uc1RvU3VtID0gW107XG4gICAgICAgICAgY29uc3QgY29sdW1uU3VtcyA9IHt9O1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mb290ZXJzLmZvckVhY2goKGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgICBjb2x1bW5zVG9TdW0ucHVzaCguLi5jb25maWcuY29sdW1ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE9ubHkgaGF2ZSB1bmlxdWUgY29sdW1ucywgZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgICAgICBjb2x1bW5zVG9TdW0gPSBjb2x1bW5zVG9TdW0uZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2YoaXRlbSkgPT09IGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFrZSBhIGZvcm0gZm9yIGVhY2ggcm93XG4gICAgICAgICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgcm93Q29udHJvbHMgPSBbXTtcbiAgICAgICAgICAgIHJvdy5jb250cm9scyA9IHt9O1xuICAgICAgICAgICAgcm93Ll9lZGl0aW5nID0ge307XG4gICAgICAgICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xuICAgICAgICAgICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgIC8vIFVzZSB0aGUgY29udHJvbCBwYXNzZWQgb3IgdXNlIGEgUmVhZE9ubHlDb250cm9sIHNvIHRoYXQgdGhlIGZvcm0gaGFzIHRoZSB2YWx1ZXNcbiAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGNvbHVtbi5lZGl0b3JDb25maWdcbiAgICAgICAgICAgICAgICA/IENvbnRyb2xGYWN0b3J5LmNyZWF0ZShjb2x1bW4uZWRpdG9yVHlwZSwgY29sdW1uLmVkaXRvckNvbmZpZylcbiAgICAgICAgICAgICAgICA6IG5ldyBSZWFkT25seUNvbnRyb2woeyBrZXk6IGNvbHVtbi5uYW1lIH0pO1xuICAgICAgICAgICAgICByb3cuY29udHJvbHNbY29sdW1uLm5hbWVdID0gY29udHJvbDtcbiAgICAgICAgICAgICAgcm93Q29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgcm93LCBmYWxzZSk7XG4gICAgICAgICAgICB0YWJsZUZvcm1Sb3dzLnB1c2godGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAocm93Q29udHJvbHMpKTtcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSB0b3RhbCBmb290ZXIgaWYgY29uZmlndXJlZFxuICAgICAgICAgICAgLy8gQXJyYXkgb2Yga2V5cyB0byB0b3RhbFxuICAgICAgICAgICAgaWYgKGNvbHVtbnNUb1N1bS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgY29sdW1uc1RvU3VtLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoY29sdW1uU3Vtc1tjb2x1bW5dKSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dICs9IHJvd1tjb2x1bW5dO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGFibGVFZGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNldHVwIHRoZSBmb290ZXJzIChpZiBhbnkpXG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZvb3RlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb25maWcuZm9vdGVycy5mb3JFYWNoKChmb290ZXJDb25maWcsIGZvb3RlckNvbmZpZ0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvb3RlciA9IHt9O1xuICAgICAgICAgICAgICBmb290ZXJbZm9vdGVyQ29uZmlnLmxhYmVsQ29sdW1uXSA9IGZvb3RlckNvbmZpZy5sYWJlbDtcbiAgICAgICAgICAgICAgZm9vdGVyQ29uZmlnLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZvb3RlckNvbmZpZy5tZXRob2QgPT09ICdBVkcnICYmIHRoaXMuX3Jvd3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXSAvIHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmZvb3RlcnMucHVzaChmb290ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQ7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSB0aGlzLmNvbmZpZy5wYWdpbmcuaXRlbXNQZXJQYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQYWdpbmcgdHVybmVkIG9mZiwgcmV0dXJuIGJhc2ljYWxseSBhbGwgb2YgdGhlIGRhdGFcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gMTtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlU2l6ZSA9IDUwMDtcbiAgICB9XG4gICAgaWYgKGRwICYmIGRwLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIucmVmcmVzaCgpO1xuICB9XG4gIGdldCBkYXRhUHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFQcm92aWRlcjtcbiAgfVxuXG4gIGdldCBlZGl0aW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVDtcbiAgfVxuXG4gIGdldCBmb3JtVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVGb3JtLmdldFJhd1ZhbHVlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGZvcm1VdGlsczogRm9ybVV0aWxzLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBub3RpZnkoJ1tEZXByZWNhdGVkXTogVGhlIHRhYmxlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBtaWdyYXRlIHRvIG5vdm8tZGF0YS10YWJsZXMhJyk7XG4gIH1cblxuICBvbkRyb3Bkb3duVG9nZ2xlZChldmVudCwgY29sdW1uKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uXSA9IGV2ZW50O1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZm9jdXNJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5maWx0ZXJJbnB1dHMgJiYgdGhpcy5maWx0ZXJJbnB1dHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0cy5mb3JFYWNoKChmaWx0ZXJJbnB1dCkgPT4ge1xuICAgICAgICBpZiAoZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZSA9IGV2ZW50LnBhZ2U7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPSBldmVudC5pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbikge1xuICAgIGlmICghSGVscGVycy5pc0JsYW5rKG9wdGlvbi52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBzZXR1cENvbHVtbkRlZmF1bHRzKCkge1xuICAgIC8vIENoZWNrIGNvbHVtbnMgZm9yIGNlbGwgb3B0aW9uIHR5cGVzXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4udHlwZSkge1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAvLyBTZXQgb3B0aW9ucyBiYXNlZCBvbiBkYXRlcyBpZiB0aGVyZSBhcmUgbm9uZVxuICAgICAgICAgICAgY29sdW1uLm9wdGlvbnMgPSBjb2x1bW4ub3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRPcHRpb25zKGNvbHVtbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ICE9PSB0aGlzLmxhc3RQYWdlKSB7XG4gICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0UGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZyA/IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50IDogMTtcbiAgfVxuXG4gIGdldFBhZ2VTdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgPyAodGhpcy5kYXRhUHJvdmlkZXIucGFnZSAtIDEpICogdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiAwO1xuICB9XG5cbiAgZ2V0UGFnZUVuZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgJiYgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPiAtMSA/IHRoaXMuZ2V0UGFnZVN0YXJ0KCkgKyB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA6IHRoaXMucm93cy5sZW5ndGg7XG4gIH1cblxuICBnZXRSb3dDb250cm9sRm9ybShpKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgcmV0dXJuIHRhYmxlRm9ybVJvd3MuY29udHJvbHNbaV07XG4gIH1cblxuICBvbkZpbHRlckNsaWNrKGNvbHVtbiwgZmlsdGVyKSB7XG4gICAgaWYgKGZpbHRlci5yYW5nZSAmJiAhY29sdW1uLmNhbGVuZGFyU2hvdykge1xuICAgICAgY29sdW1uLmNhbGVuZGVyU2hvdyA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpICYmIGNvbHVtbi5tdWx0aXBsZSkge1xuICAgICAgaWYgKH5jb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSkge1xuICAgICAgICAvLyBSZW1vdmUgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIuc3BsaWNlKGNvbHVtbi5maWx0ZXIuaW5kZXhPZihmaWx0ZXIpLCAxKTtcbiAgICAgICAgaWYgKGZpbHRlci5yYW5nZSkge1xuICAgICAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uZmlsdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29sdW1uLm11bHRpcGxlKSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gbmV3IEFycmF5KCk7XG4gICAgICBjb2x1bW4uZmlsdGVyLnB1c2goSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWU7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2xlYXIoY29sdW1uOiBhbnkpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgY29sdW1uLmZyZWV0ZXh0RmlsdGVyID0gbnVsbDtcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIGlmIChjb2x1bW4ub3JpZ2luYWxPcHRpb25zKSB7XG4gICAgICAgIGNvbHVtbi5vcHRpb25zID0gY29sdW1uLm9yaWdpbmFsT3B0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsU29ydEFuZEZpbHRlcnMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgY29sdW1uLnNvcnQgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSByb3cgZGF0YSB0byByZWZsZWN0IHRoZSBhY3RpdmUgZmlsdGVycy5cbiAgICovXG4gIG9uRmlsdGVyQ2hhbmdlKGV2ZW50PzogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyaW5nKSB7XG4gICAgICAvLyBBcnJheSBvZiBmaWx0ZXJzXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5jb2x1bW5zLmZpbHRlcigoY29sKSA9PiAhSGVscGVycy5pc0VtcHR5KGNvbC5maWx0ZXIpKTtcbiAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICBsZXQgcXVlcnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgZmlsdGVycykge1xuICAgICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLm1hdGNoKSkge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gKHZhbHVlLCByZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5tYXRjaChyZWNvcmQsIGNvbHVtbi5maWx0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5wcmVGaWx0ZXIgJiYgSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5wcmVGaWx0ZXIpKSB7XG4gICAgICAgICAgICBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5LCBjb2x1bW4ucHJlRmlsdGVyKHRoaXMuZXNjYXBlQ2hhcmFjdGVycyhjb2x1bW4uZmlsdGVyKSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSkge1xuICAgICAgICAgICAgLy8gVGhlIGZpbHRlcnMgYXJlIGFuIGFycmF5IChtdWx0aS1zZWxlY3QpLCBjaGVjayB2YWx1ZVxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb2x1bW4uZmlsdGVyO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBhbiBhcnJheSBvZiB7dmFsdWU6ICcnLCBsYWJlbHM6ICcnfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbMF0udmFsdWUgfHwgb3B0aW9uc1swXS5sYWJlbCkge1xuICAgICAgICAgICAgICBvcHRpb25zID0gY29sdW1uLmZpbHRlci5tYXAoKG9wdCkgPT4gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHsgYW55OiBvcHRpb25zIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4udHlwZSAmJiBjb2x1bW4udHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlci5zdGFydERhdGUgJiYgY29sdW1uLmZpbHRlci5lbmREYXRlKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICBtaW46IERhdGVVdGlsLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5zdGFydERhdGUpLFxuICAgICAgICAgICAgICAgIG1heDogRGF0ZVV0aWwuc3RhcnRPZkRheShEYXRlVXRpbC5hZGREYXlzKERhdGVVdGlsLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5lbmREYXRlKSwgMSkpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIG1pbjogY29sdW1uLmZpbHRlci5taW4gPyBEYXRlVXRpbC5hZGREYXlzKHN0YXJ0T2ZUb2RheSgpLCBjb2x1bW4uZmlsdGVyLm1pbikgOiBzdGFydE9mVG9kYXkoKSxcbiAgICAgICAgICAgICAgICBtYXg6IGNvbHVtbi5maWx0ZXIubWF4ID8gRGF0ZVV0aWwuYWRkRGF5cyhzdGFydE9mVG9tb3Jyb3coKSwgY29sdW1uLmZpbHRlci5tYXgpIDogc3RhcnRPZlRvbW9ycm93KCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IGNvbHVtbi5maWx0ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZmlsdGVyaW5nKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmZpbHRlcmluZyhxdWVyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmZpbHRlciA9IHF1ZXJ5O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0ge307XG4gICAgICB9XG4gICAgICAvLyBUcmlja2xlIGRvd24gdG8ga2VlcCBzb3J0XG4gICAgICAvLyB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcbiAgICAgIHRoaXMuZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKTtcblxuICAgICAgLy8gSWYgcGFnaW5nLCByZXNldCBwYWdlXG4gICAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gMTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbGwgc2VsZWN0aW9uIG9uIHNvcnQgY2hhbmdlIGlmIHNlbGVjdGlvbiBpcyBvblxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlc2NhcGVDaGFyYWN0ZXJzKGZpbHRlcikge1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZpbHRlci5yZXBsYWNlKC8nL2csIFwiJydcIik7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgIC8vIFRPRE86IFRoaXMgbmVlZHMgdG8gYmUgcmVmYWN0b3JlZFxuICAgIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChjb2x1bW4gJiYgIUhlbHBlcnMuaXNCbGFuayhjb2x1bW4uZmlsdGVyKSAmJiAhSGVscGVycy5pc0JsYW5rKGZpbHRlcikpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlci5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5sYWJlbCA9PT0gZmlsdGVyLmxhYmVsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlci5pbmNsdWRlcyhmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGNvbHVtbi5maWx0ZXIgPT09IHR5cGVvZiBmaWx0ZXIpIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNBY3RpdmU7XG4gIH1cblxuICBvblNvcnRDaGFuZ2UoY29sdW1uKSB7XG4gICAgdGhpcy5jdXJyZW50U29ydENvbHVtbiA9IGNvbHVtbjtcbiAgICBjb25zdCBzb3J0ZWRDb2x1bW5zOiBhbnkgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKCh0aGlzQ29sdW1uKSA9PiB7XG4gICAgICByZXR1cm4gdGhpc0NvbHVtbi5zb3J0ICYmIHRoaXNDb2x1bW4gIT09IHRoaXMuY3VycmVudFNvcnRDb2x1bW47XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBzb3J0ZWRDb2x1bW4gb2Ygc29ydGVkQ29sdW1ucykge1xuICAgICAgc29ydGVkQ29sdW1uLnNvcnQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb2x1bW4pIHtcbiAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuc29ydGluZykpIHtcbiAgICAgICAgdGhpcy5jb25maWcuc29ydGluZygpO1xuICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLnByZVNvcnQpKSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5zb3J0ID0gW10uY29uY2F0KGNvbHVtbi5wcmVTb3J0KGNvbHVtbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbeyBmaWVsZDogY29sdW1uLmNvbXBhcmUgfHwgY29sdW1uLm5hbWUsIHJldmVyc2U6IGNvbHVtbi5zb3J0ID09PSAnZGVzYycgfV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlyZSB0YWJsZSBjaGFuZ2UgZXZlbnRcbiAgICAvLyB0aGlzLmZpcmVUYWJsZUNoYW5nZUV2ZW50KCk7XG5cbiAgICAvLyBJZiBwYWdpbmcsIHJlc2V0IHBhZ2VcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IDE7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKSB7XG4gICAgLy8gQ29uc3RydWN0IGEgdGFibGUgY2hhbmdlIG9iamVjdFxuICAgIGNvbnN0IG9uVGFibGVDaGFuZ2U6IGFueSA9IHt9O1xuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKChjb2wpID0+IGNvbC5maWx0ZXIgJiYgY29sLmZpbHRlci5sZW5ndGgpO1xuICAgIG9uVGFibGVDaGFuZ2UuZmlsdGVyID0gZmlsdGVycy5sZW5ndGggPyBmaWx0ZXJzIDogZmFsc2U7XG4gICAgb25UYWJsZUNoYW5nZS5zb3J0ID0gdGhpcy5jdXJyZW50U29ydENvbHVtbiA/IHRoaXMuY3VycmVudFNvcnRDb2x1bW4gOiBmYWxzZTtcbiAgICBvblRhYmxlQ2hhbmdlLnJvd3MgPSB0aGlzLnJvd3M7XG5cbiAgICAvLyBFbWl0IGV2ZW50XG4gICAgdGhpcy5vblRhYmxlQ2hhbmdlLmVtaXQob25UYWJsZUNoYW5nZSk7XG4gIH1cblxuICBmaW5kQ29sdW1uSW5kZXgodmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMuY29sdW1uc1tpXS5uYW1lID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbk9yZGVyQ2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3Qgb2xkSW5kZXggPSB0aGlzLmZpbmRDb2x1bW5JbmRleChldmVudC5maXJzdC5uYW1lKTtcbiAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LnNlY29uZC5uYW1lKTtcbiAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLmNvbHVtbnMuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgdGhpcy5vblNvcnRDaGFuZ2UodGhpcy5jdXJyZW50U29ydENvbHVtbik7XG4gIH1cblxuICBleHBhbmRBbGxPblBhZ2UoZXhwYW5kZWQpIHtcbiAgICB0aGlzLmNvbmZpZy5leHBhbmRBbGwgPSAhZXhwYW5kZWQ7XG4gICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5kYXRhUHJvdmlkZXIubGlzdCkge1xuICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RQYWdlKGRhdGE/OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMubWFzdGVyKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNlbGVjdCBhbGwgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIG5ldyBwYWdlIHNlbGVjdGVkIGF0IGEgdGltZVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRoaXMucGFnZWREYXRhID0gdGhpcy5yb3dzLnNsaWNlKHRoaXMuZ2V0UGFnZVN0YXJ0KCksIHRoaXMuZ2V0UGFnZUVuZCgpKTtcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMucGFnZWREYXRhKSB7XG4gICAgICAgIHJvdy5fc2VsZWN0ZWQgPSB0aGlzLm1hc3RlcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGFQcm92aWRlci5saXN0LmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgLy8gT25seSBzaG93IHRoZSBzZWxlY3QgYWxsIG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBuZXcgcGFnZSBzZWxlY3RlZCBhdCBhIHRpbWVcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQrKztcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID09PSAxICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoICE9PSB0aGlzLmRhdGFQcm92aWRlci50b3RhbDtcbiAgICB9XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2VsZWN0QWxsKHZhbHVlKSB7XG4gICAgdGhpcy5tYXN0ZXIgPSB2YWx1ZTtcbiAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XG4gICAgICByb3cuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZSA/IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QgOiBbXTtcbiAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgIHRoaXMucm93U2VsZWN0SGFuZGxlcigpO1xuICB9XG5cbiAgcm93U2VsZWN0SGFuZGxlcihkYXRhPzogYW55KSB7XG4gICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xuICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgaWYgKHRoaXMucGFnZVNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5tYXN0ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlU2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnBhZ2VkRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFzdGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hc3RlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gQnJlYWtpbmcgdGhlIHNlbGVjdGVkIHBhZ2UgY291bnRcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcbiAgICB9XG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XG4gIH1cblxuICBlbWl0U2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBsZW5ndGg6IHNlbGVjdGVkLmxlbmd0aCwgc2VsZWN0ZWQgfSk7XG4gIH1cblxuICByb3dDbGlja0hhbmRsZXIocm93KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdCkge1xuICAgICAgdGhpcy5hY3RpdmVJZCA9IHJvdy5pZCB8fCAwO1xuICAgICAgdGhpcy5vblJvd0NsaWNrLmVtaXQocm93KTtcbiAgICB9XG4gIH1cblxuICBnZXREZWZhdWx0T3B0aW9ucyhjb2x1bW4pIHtcbiAgICAvLyBUT0RPIC0gbmVlZHMgdG8gY29tZSBmcm9tIGxhYmVsIHNlcnZpY2UgLSBodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9lbGVtZW50cy9pc3N1ZXMvMTE2XG4gICAgY29uc3Qgb3B0czogYW55W10gPSBbXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MURheSwgbWluOiAtMSwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0N0RheXMsIG1pbjogLTcsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDMwRGF5cywgbWluOiAtMzAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDkwRGF5cywgbWluOiAtOTAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFZZWFyLCBtaW46IC0zNjYsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFEYXksIG1pbjogMCwgbWF4OiAxIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0N0RheXMsIG1pbjogMCwgbWF4OiA3IH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MzBEYXlzLCBtaW46IDAsIG1heDogMzAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ5MERheXMsIG1pbjogMCwgbWF4OiA5MCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFZZWFyLCBtaW46IDAsIG1heDogMzY2IH0sXG4gICAgXTtcblxuICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnJhbmdlKSB7XG4gICAgICBvcHRzLnB1c2goe1xuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbHMuY3VzdG9tRGF0ZVJhbmdlLFxuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbiAgfVxuXG4gIG9uQ2FsZW5kZXJTZWxlY3QoY29sdW1uLCBldmVudCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnN0YXJ0RGF0ZSAmJiBldmVudC5lbmREYXRlKSB7XG4gICAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICBvbkZpbHRlcktleXdvcmRzKGNvbmZpZykge1xuICAgIGlmIChjb25maWcgJiYgY29uZmlnLmZpbHRlcmluZyAmJiBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyKSB7XG4gICAgICBjb25zdCBmaWx0ZXJLZXl3b3JkcyA9IGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMpIHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnM7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gb3B0aW9uICYmIG9wdGlvbi5sYWJlbCA/IG9wdGlvbi5sYWJlbCA6IG9wdGlvbjtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IGZpbHRlcktleXdvcmRzKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAofnZhbHVlLmluZGV4T2YoZmlsdGVyS2V5d29yZHMpIHx8IH52YWx1ZS5pbmRleE9mKGZpbHRlcktleXdvcmRzKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5vcHRpb25zID0gbmV3T3B0aW9ucztcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcuZmlsdGVyID0gY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5vcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnM7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgVGFibGUgaW50byBFRElUIG1vZGUsIGJhc2VkIG9uIHRoZSByb3cvY29sdW1uIHBhc3NlZCB5b3UgY2FuIGVudGVyIGluIGEgZmV3IHN0YXRlc1xuICAgKiAoMSkgc2V0VGFibGVFZGl0KCkgLSBkb24ndCBwYXNzIGFueSB0byBwdXQgdGhlIEZVTEwgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogKDIpIHNldFRhYmxlRWRpdCgxKSAtIHBhc3Mgb25seSByb3cgdG8gcHV0IHRoYXQgRlVMTCByb3cgb2YgdGhlIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqICgzKSBzZXRUYWJsZUVkaXQoMSwgMSkgLSBwYXNzIHJvdyBhbmQgY29sdW1uIHRvIHB1dCB0aGF0IGNvbHVtbiBvZiB0aGUgcm93IG9mIHRoZSB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgc2V0VGFibGVFZGl0KHJvd051bWJlcj86IG51bWJlciwgY29sdW1uTnVtYmVyPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlID0gTm92b1RhYmxlTW9kZS5FRElUO1xuICAgIHRoaXMuX2RhdGFQcm92aWRlci5lZGl0KCk7XG4gICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICByb3cuX2VkaXRpbmcgPSByb3cuX2VkaXRpbmcgfHwge307XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uLnZpZXdPbmx5KSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIEhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIUhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJiBIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJlxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSAmJlxuICAgICAgICAgIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJlxuICAgICAgICAgIGNvbHVtbkluZGV4ID09PSBOdW1iZXIoY29sdW1uTnVtYmVyKVxuICAgICAgICApIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBMZWF2ZXMgZWRpdCBtb2RlIGZvciB0aGUgVGFibGUgYW5kIHB1dHMgZXZlcnl0aGluZyBiYWNrIHRvIFZJRVcgb25seVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKiBAcGFyYW0gY2FuY2VsIC0gd2hldGhlciBvciBub3QgdG8gc2F2ZSBkYXRhIG9yIHVuZG9cbiAgICovXG4gIHByaXZhdGUgbGVhdmVFZGl0TW9kZShjYW5jZWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm1vZGUgPSBOb3ZvVGFibGVNb2RlLlZJRVc7XG4gICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIHJvdy5fZWRpdGluZyA9IHJvdy5fZWRpdGluZyB8fCB7fTtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGNhbmNlbCkge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnVuZG8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmNvbW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLmhpZGVUb2FzdE1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIG5ldyByb3cgaW50byB0aGUgdGFibGUgdG8gYmUgZWRpdGVkLCBjYW4gYmUgY2FsbGVkIGZyb20gYSBsb2NhbCByZWZlcmVuY2Ugb2YgdGhlIHRhYmxlIGluIHlvdXIgdGVtcGxhdGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGFkZEVkaXRhYmxlUm93KGRlZmF1bHRWYWx1ZTogYW55ID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgY29uc3Qgcm93OiBhbnkgPSB7fTtcbiAgICBjb25zdCByb3dDb250cm9scyA9IFtdO1xuICAgIHJvdy5jb250cm9scyA9IHt9O1xuICAgIHJvdy5fZWRpdGluZyA9IHt9O1xuICAgIHJvdy5yb3dJZCA9IHRoaXMuX3Jvd3MubGVuZ3RoICsgMTtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXG4gICAgICBjb25zdCBjb250cm9sID0gY29sdW1uLmVkaXRvckNvbmZpZ1xuICAgICAgICA/IENvbnRyb2xGYWN0b3J5LmNyZWF0ZShjb2x1bW4uZWRpdG9yVHlwZSwgY29sdW1uLmVkaXRvckNvbmZpZylcbiAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcbiAgICAgIGNvbnRyb2wudmFsdWUgPSBudWxsOyAvLyByZW1vdmUgY29waWVkIGNvbHVtbiB2YWx1ZVxuICAgICAgcm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXSA9IGNvbnRyb2w7XG4gICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gIWNvbHVtbi52aWV3T25seTtcbiAgICAgIHJvd0NvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgfSk7XG4gICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgZGVmYXVsdFZhbHVlLCBmYWxzZSk7XG4gICAgdGFibGVGb3JtUm93cy5wdXNoKHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHJvd0NvbnRyb2xzKSk7XG4gICAgdGhpcy5fcm93cy5wdXNoKHJvdyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFZhbGlkYXRlcyB0aGUgRm9ybSBpbnNpZGUgb2YgdGhlIFRhYmxlLCBpZiB0aGVyZSBhcmUgZXJyb3JzIGl0IHdpbGwgZGlzcGxheS9yZXR1cm4gdGhlIGVycm9ycyBmb3IgZWFjaCByb3cuXG4gICAqIElmIHRoZXJlIGFyZSBubyBlcnJvcnMsIHRoZW4gaXQgd2lsbCByZXR1cm4gT05MWSB0aGUgY2hhbmdlZCBkYXRhIGZvciBlYWNoIHJvdywgdGhlIGRhdGEgcmV0dXJuZWQgd2lsbCBiZSBpbiB0aGUgZm9ybTpcbiAgICogeyBpZDogSURfT0ZfUkVDT1JELCBrZXk6IHZhbHVlIH0gLS0gZGF0YSB0aGF0IHdhcyB1cGRhdGVkXG4gICAqIHsgaWQ6IHVuZGVmaW5lZCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgYWRkZWRcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHZhbGlkYXRlQW5kR2V0VXBkYXRlZERhdGEoKTogeyBjaGFuZ2VkPzogYW55W107IGVycm9ycz86IHsgZXJyb3JzOiBhbnk7IHJvdzogYW55OyBpbmRleDogbnVtYmVyIH1bXSB9IHtcbiAgICBpZiAodGhpcy50YWJsZUZvcm0gJiYgdGhpcy50YWJsZUZvcm0uY29udHJvbHMgJiYgdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cykge1xuICAgICAgY29uc3QgY2hhbmdlZFJvd3MgPSBbXTtcbiAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgLy8gR28gb3ZlciB0aGUgRm9ybUFycmF5J3MgY29udHJvbHNcbiAgICAgICh0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheSkuY29udHJvbHMuZm9yRWFjaCgoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCBjaGFuZ2VkUm93ID0gbnVsbDtcbiAgICAgICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICAgICAgLy8gR28gb3ZlciB0aGUgZm9ybSBncm91cCBjb250cm9sc1xuICAgICAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IGZvcm1Hcm91cC5jb250cm9sc1trZXldO1xuICAgICAgICAgIC8vIEhhbmRsZSB2YWx1ZSBjaGFuZ2luZ1xuICAgICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuZGlydHkgJiYgIWNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZWRSb3cpIHtcbiAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBJRCwgc28gd2UgaGF2ZSBzb21lIGtleSB0byBzYXZlIGFnYWluc3RcbiAgICAgICAgICAgICAgY2hhbmdlZFJvdyA9IHt9O1xuICAgICAgICAgICAgICBpZiAodGhpcy5fcm93c1tpbmRleF0uaWQpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUm93LmlkID0gdGhpcy5fcm93c1tpbmRleF0uaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGRpcnR5LCBncmFiIHZhbHVlIG9mZiB0aGUgZm9ybVxuICAgICAgICAgICAgY2hhbmdlZFJvd1trZXldID0gdGhpcy50YWJsZUZvcm0uZ2V0UmF3VmFsdWUoKS5yb3dzW2luZGV4XVtrZXldO1xuICAgICAgICAgICAgLy8gU2V0IHZhbHVlIGJhY2sgdG8gcm93IChzaG91bGQgYmUgYWxyZWFkeSBkb25lIHZpYSB0aGUgc2VydmVyIGNhbGwsIGJ1dCBkbyBpdCBhbnl3YXkpXG4gICAgICAgICAgICB0aGlzLl9yb3dzW2luZGV4XVtrZXldID0gY2hhbmdlZFJvd1trZXldO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbCAmJiBjb250cm9sLmVycm9ycykge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yc1xuICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICBlcnJvciA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3Jba2V5XSA9IGNvbnRyb2wuZXJyb3JzO1xuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNoYW5nZWRSb3cpIHtcbiAgICAgICAgICBjaGFuZ2VkUm93cy5wdXNoKGNoYW5nZWRSb3cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHsgZXJyb3JzOiBlcnJvciwgcm93OiB0aGlzLl9yb3dzW2luZGV4XSwgaW5kZXggfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gUmV0dXJuIGVycm9ycyBpZiBhbnksIG90aGVyd2lzZSByZXR1cm4gdGhlIGNoYW5nZWQgcm93c1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHsgY2hhbmdlZDogY2hhbmdlZFJvd3MgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGVycm9ycyB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVmcmVzaCB0aGUgZGF0YSBwcm92aWRlciBhbmQgbGVhdmUgZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBjYW5jZWxFZGl0aW5nKCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmVFZGl0TW9kZSh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gUmVmcmVzaCB0aGUgZGF0YSBwcm92aWRlciBhbmQgbGVhdmUgZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBzYXZlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmxlYXZlRWRpdE1vZGUoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwbGF5cyBhIHRvYXN0IG1lc3NhZ2UgaW5zaWRlIG9mIHRoZSB0YWJsZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgZGlzcGxheVRvYXN0TWVzc2FnZSh0b2FzdDogeyBpY29uOiBzdHJpbmc7IHRoZW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9LCBoaWRlRGVsYXk/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRvYXN0ID0gdG9hc3Q7XG4gICAgaWYgKGhpZGVEZWxheSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGVUb2FzdE1lc3NhZ2UoKSwgaGlkZURlbGF5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIEZvcmNlIGhpZGUgdGhlIHRvYXN0IG1lc3NhZ2VcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGhpZGVUb2FzdE1lc3NhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdCA9IG51bGw7XG4gICAgLy8gSGFjayB0byBtYWtlIHRoZSB0YWJsZSBkaXNwbGF5IHByb3Blcmx5IGFmdGVyIGhpZGluZyB0aGUgdG9hc3RcbiAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5ncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0ID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGRpc3BsYXkgdGhlIGxvYWRpbmcgb3ZlcmxheSBvbiB0aGUgdGFibGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHRvZ2dsZUxvYWRpbmcoc2hvdzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IHNob3c7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIGhpZGUgYSBjb2x1bW4gaW4gZWRpdCBvciB2aWV3IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGlzQ29sdW1uSGlkZGVuKGNvbHVtbjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdGluZyA/ICEhY29sdW1uLmhpZGVDb2x1bW5PbkVkaXQgOiAhIWNvbHVtbi5oaWRlQ29sdW1uT25WaWV3O1xuICB9XG59XG4iXX0=