// NG2
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
import { debounceTime } from 'rxjs/operators';
// APP
import { CollectionEvent } from '../../services/data-provider/CollectionEvent';
import { PagedArrayCollection } from '../../services/data-provider/PagedArrayCollection';
import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';
import { notify } from '../../utils/notifier/notifier.util';
import { ControlFactory, ReadOnlyControl } from './../form/FormControls';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../../utils/form-utils/FormUtils";
import * as i3 from "@angular/forms";
import * as i4 from "./extras/pagination/Pagination";
import * as i5 from "../loading/Loading";
import * as i6 from "../toast/Toast";
import * as i7 from "../form/Form";
import * as i8 from "../button/Button";
import * as i9 from "../checkbox/Checkbox";
import * as i10 from "../dropdown/Dropdown";
import * as i11 from "../common/option/optgroup.component";
import * as i12 from "../common/option/option.component";
import * as i13 from "../icon/Icon";
import * as i14 from "../flex/Flex";
import * as i15 from "../date-picker/DatePicker";
import * as i16 from "./extras/table-cell/TableCell";
import * as i17 from "../form/Control";
import * as i18 from "./extras/row-details/RowDetails";
import * as i19 from "@angular/common";
import * as i20 from "../common/directives/theme.directive";
import * as i21 from "../tooltip/Tooltip.directive";
import * as i22 from "./extras/th-orderable/ThOrderable";
import * as i23 from "./extras/th-sortable/ThSortable";
import * as i24 from "./extras/keep-filter-focus/KeepFilterFocus";
import * as i25 from "./extras/table-filter/TableFilter";
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
                                min: dateFns.startOfDay(column.filter.startDate),
                                max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(column.filter.endDate), 1)),
                            };
                        }
                        else {
                            query[column.name] = {
                                min: column.filter.min ? dateFns.addDays(dateFns.startOfToday(), column.filter.min) : dateFns.startOfToday(),
                                max: column.filter.max ? dateFns.addDays(dateFns.startOfTomorrow(), column.filter.max) : dateFns.startOfTomorrow(),
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
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/issues/116
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
NovoTableElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoTableElement, deps: [{ token: i1.NovoLabelService }, { token: i2.FormUtils }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTableElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoTableElement, selector: "novo-table", inputs: { config: "config", columns: "columns", theme: "theme", skipSortAndFilterClear: "skipSortAndFilterClear", mode: "mode", editable: "editable", rowIdentifier: "rowIdentifier", name: "name", rows: "rows", dataProvider: "dataProvider" }, outputs: { onRowClick: "onRowClick", onRowSelect: "onRowSelect", onTableChange: "onTableChange" }, host: { properties: { "attr.theme": "theme", "class.editing": "mode === NovoTableMode.EDIT", "class.novo-table-loading": "loading" }, classAttribute: "novo-table" }, viewQueries: [{ propertyName: "filterInputs", predicate: ["filterInput"], descendants: true, read: ElementRef }], ngImport: i0, template: `
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
                      <novo-option class="filter-search" inert>
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
                      <novo-option class="filter-search" inert>
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
                      <novo-option class="filter-search" *ngIf="!column.calenderShow" inert>
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
                      <novo-option class="calendar-container" *ngIf="column.calenderShow" keepOpen inert>
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
  `, isInline: true, components: [{ type: i4.Pagination, selector: "novo-pagination", inputs: ["page", "totalItems", "itemsPerPage", "rowOptions", "label", "disablePageSelection"], outputs: ["pageChange", "itemsPerPageChange", "onPageChange"] }, { type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i6.NovoToastElement, selector: "novo-toast", inputs: ["appearance", "theme", "icon", "title", "action", "hasDialogue", "link", "isCloseable", "message"], outputs: ["closed"] }, { type: i7.NovoFormElement, selector: "novo-form", inputs: ["form", "layout", "hideHeader"] }, { type: i8.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i9.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i10.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i11.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i12.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "inert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i13.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i14.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i15.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { type: i16.TableCell, selector: "novo-table-cell", inputs: ["column", "row", "form", "hasEditor"] }, { type: i17.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { type: i18.RowDetails, selector: "novo-row-details", inputs: ["data", "renderer"] }], directives: [{ type: i19.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i20.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i21.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i19.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i19.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i22.ThOrderable, selector: "[novoThOrderable]", inputs: ["novoThOrderable"], outputs: ["onOrderChange"] }, { type: i23.ThSortable, selector: "[novoThSortable]", inputs: ["novoThSortable", "column"], outputs: ["onSortChange"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i24.NovoTableKeepFilterFocus, selector: "[keepFilterFocused]" }, { type: i25.TableFilter, selector: "[novoTableFilter]", inputs: ["novoTableFilter"], outputs: ["onFilterChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoTableElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-table',
                    host: {
                        class: 'novo-table',
                        '[attr.theme]': 'theme',
                        '[class.editing]': 'mode === NovoTableMode.EDIT',
                        '[class.novo-table-loading]': 'loading',
                    },
                    // directives: [],
                    template: `
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
                      <novo-option class="filter-search" inert>
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
                      <novo-option class="filter-search" inert>
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
                      <novo-option class="filter-search" *ngIf="!column.calenderShow" inert>
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
                      <novo-option class="calendar-container" *ngIf="column.calenderShow" keepOpen inert>
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
  `,
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SSxPQUFPLEVBQThCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixTQUFTO0FBQ1QsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0J6RSwrR0FBK0c7QUFDL0csTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtBQUNWLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQW1WRCxN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LEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQy9DLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtZQUNoRCxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtTQUNuRCxDQUFDO1FBRUYsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7Z0JBQ2xDLEtBQUssRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc1VUO2lCQUNGO3lMQUdDLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUlqRCxNQUFNO3NCQURMLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixzQkFBc0I7c0JBRHJCLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFHTixhQUFhO3NCQURaLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUlOLFVBQVU7c0JBRFQsTUFBTTtnQkFHUCxXQUFXO3NCQURWLE1BQU07Z0JBR1AsYUFBYTtzQkFEWixNQUFNO2dCQTRCSCxJQUFJO3NCQURQLEtBQUs7Z0JBaUJGLFlBQVk7c0JBRGYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBDb2xsZWN0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXByb3ZpZGVyL0NvbGxlY3Rpb25FdmVudCc7XG5pbXBvcnQgeyBQYWdlZEFycmF5Q29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtcHJvdmlkZXIvUGFnZWRBcnJheUNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtLXV0aWxzL0Zvcm1VdGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcbmltcG9ydCB7IENvbnRyb2xGYWN0b3J5LCBSZWFkT25seUNvbnRyb2wgfSBmcm9tICcuLy4uL2Zvcm0vRm9ybUNvbnRyb2xzJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvVGFibGVDb25maWcge1xuICAvLyBQYWdpbmcgY29uZmlnXG4gIHBhZ2luZz86IHtcbiAgICBjdXJyZW50OiBudW1iZXI7IC8vIGN1cnJlbnQgcGFnZVxuICAgIGl0ZW1zUGVyUGFnZTogbnVtYmVyOyAvLyBpdGVtcyBwZXIgcGFnZVxuICAgIG9uUGFnZUNoYW5nZTogRnVuY3Rpb247IC8vIGZ1bmN0aW9uIHRvIGhhbmRsZSBwYWdlIGNoYW5naW5nXG4gICAgcm93T3B0aW9ucz86IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9W107IC8vIHBhZ2Ugb3B0aW9uc1xuICAgIGRpc2FibGVQYWdlU2VsZWN0aW9uPzogYm9vbGVhbjsgLy8gZGlzYWJsZXMgdGhlIHBhZ2VzIGZyb20gYmVpbmcgc2VsZWN0ZWRcbiAgfTtcbiAgLy8gRm9vdGVyIGNvbmZpZyAodG90YWwgZm9vdGVyKVxuICBmb290ZXJzPzogQXJyYXk8e1xuICAgIGNvbHVtbnM6IEFycmF5PHN0cmluZz47IC8vIHN0cmluZyBhcnJheSBvZiBjb2x1bW5zIHRvIHRvdGFsXG4gICAgbWV0aG9kOiBzdHJpbmc7IC8vIG1ldGhvZCB0byB1c2UgZm9yIHRoZSBmb290ZXIsIFNVTSB8IEFWRywgZGVmYXVsdHMgdG8gU1VNXG4gICAgbGFiZWxDb2x1bW46IHN0cmluZzsgLy8gY29sdW1uIHRvIHVzZSBhcyB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gICAgbGFiZWw6IHN0cmluZzsgLy8gbGFiZWwgdG8gdXNlIGluIHRoZSBcInRvdGFsXCIgbGFiZWxcbiAgfT47XG4gIC8vIFRPRE86IFdoZW4gdGhlc2UgdHlwZXMgYXJlIGVuZm9yY2VkIGFzIGBib29sZWFuIHwgRnVuY3Rpb25gLCB0aGVyZSdzIGEgbGludCBlcnJvci4gVGhhdCdzIGEgYnVnLlxuICBmaWx0ZXJpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIGZpbHRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBmaWx0ZXJpbmcgY2FsbGJhY2tcbiAgc29ydGluZz86IGJvb2xlYW4gfCBhbnk7IC8vIFR1cm4gb24gc29ydGluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBzb3J0aW5nIGNhbGxiYWNrXG4gIG9yZGVyaW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIG9yZGVyaW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIG9yZGVyaW5nIGNhbGxiYWNrXG4gIHJlc2l6aW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIHJlc2l6aW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIHJlc2l6aW5nIGNhbGxiYWNrXG4gIHJvd1NlbGVjdGlvblN0eWxlPzogc3RyaW5nOyAvLyBSb3cgc2VsZWN0aW9uIHN0eWxlLCBjaGVja2JveCBvciByb3dcbiAgcm93U2VsZWN0PzogYm9vbGVhbjsgLy8gVHVybiBvbiByb3cgc2VsZWN0aW9uXG4gIGhhc0RldGFpbHM/OiBib29sZWFuOyAvLyBUdXJuIG9uIGRldGFpbHMgcm93IGZvciB0aGUgdGFibGVcbiAgZGV0YWlsc1JlbmRlcmVyPzogYW55OyAvLyBSZW5kZXJlci9jb21wb25lbnQgZm9yIHRoZSBkZXRhaWxzIHJvd1xuICBleHBhbmRBbGw/OiBib29sZWFuOyAvLyBzaG91bGQgQWxsIFJvd3MgYmUgZXhwYW5kZWQgYnkgZGVmYXVsdFxuICBzZWxlY3RBbGxFbmFibGVkPzogYm9vbGVhbjsgLy8gQWxsb3dzIHRoZSB0YWJsZSwgd2hpbGUgaW4gc2VsZWN0aW9uIG1vZGUgdG8gaGF2ZSBhIHNlbGVjdCBhbGwgYXQgdGhlIHRvcFxufVxuXG4vLyBUT0RPIC0gc3VwcG9ydCAoMSkgY2xpY2tpbmcgY2VsbCB0byBlZGl0LCAoMikgY2xpY2tpbmcgcm93IHRvIGVkaXQsICgzKSBidXR0b24gdG8gdHJpZ2dlciBmdWxsIHRhYmxlIHRvIGVkaXRcbmV4cG9ydCBlbnVtIE5vdm9UYWJsZU1vZGUge1xuICBWSUVXID0gMSxcbiAgRURJVCA9IDIsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFibGUnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRhYmxlJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgICAnW2NsYXNzLmVkaXRpbmddJzogJ21vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXRhYmxlLWxvYWRpbmddJzogJ2xvYWRpbmcnLFxuICB9LFxuICAvLyBkaXJlY3RpdmVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aGVhZGVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGhcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgIDxub3ZvLXBhZ2luYXRpb25cbiAgICAgICAgICAqbmdJZj1cImNvbmZpZy5wYWdpbmcgJiYgIShkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpKVwiXG4gICAgICAgICAgW3Jvd09wdGlvbnNdPVwiY29uZmlnLnBhZ2luZy5yb3dPcHRpb25zXCJcbiAgICAgICAgICBbZGlzYWJsZVBhZ2VTZWxlY3Rpb25dPVwiY29uZmlnLnBhZ2luZy5kaXNhYmxlUGFnZVNlbGVjdGlvblwiXG4gICAgICAgICAgWyhwYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVwiXG4gICAgICAgICAgWyhpdGVtc1BlclBhZ2UpXT1cImRhdGFQcm92aWRlci5wYWdlU2l6ZVwiXG4gICAgICAgICAgW3RvdGFsSXRlbXNdPVwiZGF0YVByb3ZpZGVyLnRvdGFsXCJcbiAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L25vdm8tcGFnaW5hdGlvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1hY3Rpb25zXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFibGUtbG9hZGluZy1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nIHx8IGRhdGFQcm92aWRlci5pc0xvYWRpbmcoKVwiPlxuICAgICAgPG5vdm8tbG9hZGluZz48L25vdm8tbG9hZGluZz5cbiAgICA8L2Rpdj5cbiAgICA8bm92by10b2FzdCAqbmdJZj1cInRvYXN0XCIgW3RoZW1lXT1cInRvYXN0Py50aGVtZVwiIFtpY29uXT1cInRvYXN0Py5pY29uXCIgW21lc3NhZ2VdPVwidG9hc3Q/Lm1lc3NhZ2VcIj48L25vdm8tdG9hc3Q+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiICpuZ0lmPVwiIWdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3RcIj5cbiAgICAgIDxub3ZvLWZvcm0gaGlkZUhlYWRlcj1cInRydWVcIiBbZm9ybV09XCJ0YWJsZUZvcm1cIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCBkYXRhVGFibGVcIiBbY2xhc3MudGFibGUtZGV0YWlsc109XCJjb25maWcuaGFzRGV0YWlsc1wiIHJvbGU9XCJncmlkXCI+XG4gICAgICAgICAgPCEtLSBza2lwU29ydEFuZEZpbHRlckNsZWFyIGlzIGEgaGFjayByaWdodCBub3csIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIENhbnZhcyBpcyByZWZhY3RvcmVkIC0tPlxuICAgICAgICAgIDx0aGVhZCAqbmdJZj1cImNvbHVtbnMubGVuZ3RoICYmICghZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSB8fCBkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpIHx8IHNraXBTb3J0QW5kRmlsdGVyQ2xlYXIgfHwgZWRpdGluZylcIj5cbiAgICAgICAgICAgIDx0ciByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgIDwhLS0gREVUQUlMUyAtLT5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cIm5leHRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIiFjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImV4cGFuZC1hbGxcIlxuICAgICAgICAgICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJzb3J0LWRlc2NcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5leHBhbmRBbGxcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY29sbGFwc2UtYWxsXCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPCEtLSBDSEVDS0JPWCAtLT5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3ggbWFzcy1hY3Rpb25cIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hc3RlclwiXG4gICAgICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJwYWdlU2VsZWN0ZWQubGVuZ3RoID4gMCAmJiBwYWdlU2VsZWN0ZWQubGVuZ3RoIDwgcGFnZWREYXRhLmxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZWxlY3RQYWdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LWFsbC1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJtYXN0ZXIgPyBsYWJlbHMuZGVzZWxlY3RBbGwgOiBsYWJlbHMuc2VsZWN0QWxsT25QYWdlXCJcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8IS0tIFRBQkxFIEhFQURFUlMgLS0+XG4gICAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgJ21hc3MtYWN0aW9uJzogY29uZmlnPy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IGNvbHVtbj8uYWN0aW9ucz8uaXRlbXM/Lmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgICBwcmV2aWV3OiBjb2x1bW4/Lm5hbWUgPT09ICdwcmV2aWV3J1xuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIFtub3ZvVGhPcmRlcmFibGVdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAob25PcmRlckNoYW5nZSk9XCJvbk9yZGVyQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiaXNDb2x1bW5IaWRkZW4oY29sdW1uKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGgtZ3JvdXBcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgIDwhLS0gTEFCRUwgJiBTT1JUIEFSUk9XUyAtLT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0aC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbmZpZy5zb3J0aW5nICE9PSBmYWxzZSAmJiBjb2x1bW4uc29ydGluZyAhPT0gZmFsc2UgPyAnc29ydGFibGUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICBbbm92b1RoU29ydGFibGVdPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAob25Tb3J0Q2hhbmdlKT1cIm9uU29ydENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7IGNvbHVtbi50aXRsZSB8fCBjb2x1bW4ubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1zb3J0LWljb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cImxhYmVscy5zb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uc29ydCB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgY29sdW1uLnNvcnRpbmcgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LXVwXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LWRvd25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBEUk9QLURPV04gLS0+XG4gICAgICAgICAgICAgICAgICA8bm92by1kcm9wZG93blxuICAgICAgICAgICAgICAgICAgICBzaWRlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlcmluZyAhPT0gZmFsc2UgJiYgY29sdW1uLmZpbHRlcmluZyAhPT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbi1maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvZ2dsZWQpPVwib25Ecm9wZG93blRvZ2dsZWQoJGV2ZW50LCBjb2x1bW4ubmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi50YWJsZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbGFzcz1cInRhYmxlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uPVwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cImxhYmVscy5maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZmlsdGVyZWRdPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImZvY3VzSW5wdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBPUFRJT05TIExJU1QgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCB8fCBjb2x1bW4/Lm9yaWdpbmFsT3B0aW9ucz8ubGVuZ3RoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uPy50eXBlICE9PSAnZGF0ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIGluZXJ0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU9XCJkaWFsb2d1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj1cInRpbWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbHVtbi5maWx0ZXIgfHwgY29sdW1uLmZpbHRlciA9PT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiISFjb2x1bW4uYWxsb3dDdXN0b21UZXh0T3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiY29sdW1uLm5hbWUgKyAnLWlucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtub3ZvVGFibGVGaWx0ZXJdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uRmlsdGVyQ2hhbmdlKT1cIm9uRmlsdGVyS2V5d29yZHMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZyZWV0ZXh0RmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2VlcEZpbHRlckZvY3VzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgI2ZpbHRlcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2x1bW4ub3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25GaWx0ZXJDbGljayhjb2x1bW4sIG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImdldE9wdGlvbkRhdGFBdXRvbWF0aW9uSWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgb3B0aW9uPy5sYWJlbCB8fCBvcHRpb24gfX08L3NwYW4+IDxpIGNsYXNzPVwiYmhpLWNoZWNrXCIgKm5nSWY9XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBTRUFSQ0ggSU5QVVQgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGdyb3VwICpuZ0lmPVwiIShjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCB8fCBjb2x1bW4/Lm9yaWdpbmFsT3B0aW9ucz8ubGVuZ3RoKSAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIGluZXJ0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cInRpbWVzXCIgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBGaWx0ZXJGb2N1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gRklMVEVSIERBVEUgT1BUSU9OUyAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0Z3JvdXAgKm5nSWY9XCJjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCAmJiBjb2x1bW4/LnR5cGUgPT09ICdkYXRlJyAmJiB0b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uLm5hbWVdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiICpuZ0lmPVwiIWNvbHVtbi5jYWxlbmRlclNob3dcIiBpbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJuZWdhdGl2ZVwiIGljb249XCJ0aW1lc1wiIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIiAqbmdJZj1cImNvbHVtbi5maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBba2VlcE9wZW5dPVwib3B0aW9uLnJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uPy5sYWJlbCB8fCBvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1pY29uIG5vdm9TdWZmaXggY29sb3I9XCJwb3NpdGl2ZVwiICpuZ0lmPVwiaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pXCI+Y2hlY2s8L25vdm8taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImNhbGVuZGFyLWNvbnRhaW5lclwiICpuZ0lmPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiIGtlZXBPcGVuIGluZXJ0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tc3RhY2s+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWxpbmtcIiAoY2xpY2spPVwiY29sdW1uLmNhbGVuZGVyU2hvdyA9IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktcHJldmlvdXNcIj48L2k+e3sgbGFiZWxzLmJhY2tUb1ByZXNldEZpbHRlcnMgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uU2VsZWN0KT1cIm9uQ2FsZW5kZXJTZWxlY3QoY29sdW1uLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNvbHVtbi5maWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID48L25vdm8tZGF0ZS1waWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tc3RhY2s+XG4gICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLW9wdGdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9ub3ZvLWRyb3Bkb3duPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDwhLS0gVEFCTEUgREFUQSAtLT5cbiAgICAgICAgICA8dGJvZHkgKm5nSWY9XCIhZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSB8fCBlZGl0aW5nXCI+XG4gICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1zZWxlY3Rpb24tcm93XCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcgJiYgc2hvd1NlbGVjdEFsbE1lc3NhZ2UgJiYgY29uZmlnLnNlbGVjdEFsbEVuYWJsZWRcIlxuICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJ0YWJsZS1zZWxlY3Rpb24tcm93XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAge3sgbGFiZWxzLnNlbGVjdGVkUmVjb3JkcyhzZWxlY3RlZC5sZW5ndGgpIH19XG4gICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cInNlbGVjdEFsbCh0cnVlKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImFsbC1tYXRjaGluZy1yZWNvcmRzXCI+e3sgbGFiZWxzLnRvdGFsUmVjb3JkcyhkYXRhUHJvdmlkZXIudG90YWwpIH19PC9hPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93PVwiJGltcGxpY2l0XCIgbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInJvd3NcIj5cbiAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1yb3dcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInJvdy5jdXN0b21DbGFzcyB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgW2lkXT1cIm5hbWUgKyAnLScgKyByb3dbcm93SWRlbnRpZmllcl1cIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJyb3cuaWRcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJyb3dDbGlja0hhbmRsZXIocm93KVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJyb3cuaWQgPT09IGFjdGl2ZUlkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zXCIgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJuZXh0XCIgKGNsaWNrKT1cInJvdy5fZXhwYW5kZWQgPSAhcm93Ll9leHBhbmRlZFwiICpuZ0lmPVwiIXJvdy5fZXhwYW5kZWRcIj48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uIHRoZW1lPVwiaWNvblwiIGljb249XCJzb3J0LWRlc2NcIiAoY2xpY2spPVwicm93Ll9leHBhbmRlZCA9ICFyb3cuX2V4cGFuZGVkXCIgKm5nSWY9XCJyb3cuX2V4cGFuZGVkXCI+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zIGNoZWNrYm94XCIgKm5nSWY9XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCdcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwicm93Ll9zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInJvd1NlbGVjdEhhbmRsZXIocm93KVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlbGVjdC1yb3ctY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgPjwvbm92by1jaGVja2JveD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjb2x1bW4uaWQgfHwgY29sdW1uLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgW2NsYXNzLm5vdm8tZm9ybS1yb3ddPVwiZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgW2hpZGRlbl09XCJpc0NvbHVtbkhpZGRlbihjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8bm92by10YWJsZS1jZWxsXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwicm93Ll9lZGl0aW5nICYmICFyb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgICAgW2hhc0VkaXRvcl09XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybV09XCJnZXRSb3dDb250cm9sRm9ybShpKVwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLXRhYmxlLWNlbGw+XG4gICAgICAgICAgICAgICAgICA8bm92by1jb250cm9sXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwicm93Ll9lZGl0aW5nICYmIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV1cIlxuICAgICAgICAgICAgICAgICAgICBjb25kZW5zZWQ9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1dPVwiZ2V0Um93Q29udHJvbEZvcm0oaSlcIlxuICAgICAgICAgICAgICAgICAgICBbY29udHJvbF09XCJyb3cuY29udHJvbHNbY29sdW1uLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tY29udHJvbD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImRldGFpbHMtcm93XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCJcbiAgICAgICAgICAgICAgICBbaGlkZGVuXT1cIiFyb3cuX2V4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ2RldGFpbHMtcm93LScgKyByb3cuaWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIj48L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyA/IGNvbHVtbnMubGVuZ3RoICsgMSA6IGNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1yb3ctZGV0YWlscyBbZGF0YV09XCJyb3dcIiBbcmVuZGVyZXJdPVwiY29uZmlnLmRldGFpbHNSZW5kZXJlclwiPjwvbm92by1yb3ctZGV0YWlscz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gTk8gVEFCTEUgREFUQSBQTEFDRUhPTERFUiAtLT5cbiAgICAgICAgICA8dGJvZHlcbiAgICAgICAgICAgIGNsYXNzPVwidGFibGUtbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cImRhdGFQcm92aWRlci5pc0VtcHR5KCkgJiYgIWRhdGFQcm92aWRlci5pc0ZpbHRlcmVkKCkgJiYgIWVkaXRpbmdcIlxuICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktdGFibGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjZW1wdHltZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1lbXB0eS1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZW1wdHltZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5lbXB0eVRhYmxlTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBOTyBNQVRDSElORyBSRUNPUkRTIC0tPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIiAqbmdJZj1cImRhdGFQcm92aWRlci5pc0VtcHR5KCkgJiYgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LXRhYmxlXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI25vbWF0Y2htZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1uby1tYXRjaGluZy1yZWNvcmRzLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuby1tYXRjaGluZy1yZWNvcmRzXCIgKm5nSWY9XCJub21hdGNobWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMubm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIFRBQkxFIERBVEEgRVJST1IgUExBQ0VIT0xERVIgLS0+XG4gICAgICAgICAgPHRib2R5IGNsYXNzPVwidGFibGUtbWVzc2FnZVwiICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmhhc0Vycm9ycygpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwidGFibGUtZXJyb3JzXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI2Vycm9ybWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtZXJyb3ItbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cImVycm9ybWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktY2F1dGlvblwiPjwvaT4ge3sgbGFiZWxzLmVycm9yZWRUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDx0Zm9vdCAqbmdJZj1cIiFjb25maWcuZm9vdGVyc1wiIFtuZ0NsYXNzXT1cImRhdGFQcm92aWRlci5sZW5ndGggJSAyID09IDAgPyAnb2RkJyA6ICdldmVuJ1wiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJub3ZvLXRhYmxlLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgICA8dGZvb3QgKm5nRm9yPVwibGV0IGZvb3RlciBvZiBmb290ZXJzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJub3ZvLXRhYmxlLXRvdGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIihjb2x1bW4uaWQgfHwgY29sdW1uLm5hbWUpICsgJy10b3RhbC0nICsgaVwiPlxuICAgICAgICAgICAgICAgIHt7IGZvb3Rlcltjb2x1bW4ubmFtZV0gfX1cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvbm92by1mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFibGVFbGVtZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBWaWV3Q2hpbGRyZW4oJ2ZpbHRlcklucHV0JywgeyByZWFkOiBFbGVtZW50UmVmIH0pXG4gIGZpbHRlcklucHV0czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogTm92b1RhYmxlQ29uZmlnID0ge307XG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBtb2RlOiBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZS5WSUVXO1xuICBASW5wdXQoKVxuICBlZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICByb3dJZGVudGlmaWVyOiBzdHJpbmcgPSAnaWQnO1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgPSAndGFibGUnO1xuXG4gIEBPdXRwdXQoKVxuICBvblJvd0NsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uUm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIG9uVGFibGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9kYXRhUHJvdmlkZXI6IFBhZ2VkQXJyYXlDb2xsZWN0aW9uPGFueT47XG4gIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XG4gIHNlbGVjdGVkOiBBcnJheTxhbnk+ID0gW107XG4gIGFjdGl2ZUlkOiBudW1iZXIgPSAwO1xuICBtYXN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZXhwYW5kQWxsOiBib29sZWFuID0gZmFsc2U7XG4gIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGFzdFBhZ2U6IG51bWJlciA9IDA7XG4gIHNlbGVjdGVkUGFnZUNvdW50OiBudW1iZXIgPSAwO1xuICBzaG93U2VsZWN0QWxsTWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlO1xuICBjdXJyZW50U29ydENvbHVtbjogYW55O1xuICBwYWdlZERhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgcGFnZVNlbGVjdGVkOiBhbnk7XG4gIC8vIE1hcCB0byBrZWVwIHRyYWNrIG9mIHdoYXQgZHJvcGRvd25zIGFyZSB0b2dnbGVkXG4gIC8vIFVzZWQgdG8gcHJvcGVybHkgKm5nSWYgdGhlIDxub3ZvLW9wdGdyb3VwPiBzbyB0aGF0IHRoZSBrZWVwRmlsdGVyRm9jdXNlZCBEaXJlY3RpdmVcbiAgLy8gd2lsbCBwcm9wZXJseSBmaXJlIHRoZSBuZ0FmdGVyVmlld0luaXQgZXZlbnRcbiAgdG9nZ2xlZERyb3Bkb3duTWFwOiBhbnkgPSB7fTtcbiAgcHVibGljIE5vdm9UYWJsZU1vZGUgPSBOb3ZvVGFibGVNb2RlO1xuICBwdWJsaWMgdGFibGVGb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgcHVibGljIHRvYXN0OiB7IHRoZW1lOiBzdHJpbmc7IGljb246IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH07XG4gIHB1YmxpYyBmb290ZXJzID0gW107XG4gIHB1YmxpYyBncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IHJvd3Mocm93czogQXJyYXk8YW55Pikge1xuICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gcm93cztcbiAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xuICAgIH1cbiAgICAvLyB0aGlzIGlzIGEgdGVtcG9yYXJ5L2hhY2t5IGZpeCB1bnRpbCBhc3luYyBkYXRhbG9hZGluZyBpcyBoYW5kbGVkIHdpdGhpbiB0aGUgdGFibGVcbiAgICBpZiAoIXRoaXMuc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcikge1xuICAgICAgdGhpcy5jbGVhckFsbFNvcnRBbmRGaWx0ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGF0YVByb3ZpZGVyKGRwOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIgPSBBcnJheS5pc0FycmF5KGRwKSA/IG5ldyBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+KGRwKSA6IGRwO1xuICAgIHRoaXMuX2RhdGFQcm92aWRlci5kYXRhQ2hhbmdlLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoZXZlbnQ6IENvbGxlY3Rpb25FdmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgQ29sbGVjdGlvbkV2ZW50LkNIQU5HRTpcbiAgICAgICAgICB0aGlzLl9yb3dzID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAvLyBTZXR1cCBmb3JtXG4gICAgICAgICAgdGhpcy50YWJsZUZvcm0gPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgcm93czogdGhpcy5idWlsZGVyLmFycmF5KFtdKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICAgICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZWREYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRmluZCB0aGF0IGNvbHVtbnMgd2UgbWlnaHQgbmVlZCB0byBzdW0gdXAgdmlhIHRoZSBmb290ZXJcbiAgICAgICAgICBsZXQgY29sdW1uc1RvU3VtID0gW107XG4gICAgICAgICAgY29uc3QgY29sdW1uU3VtcyA9IHt9O1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mb290ZXJzLmZvckVhY2goKGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgICBjb2x1bW5zVG9TdW0ucHVzaCguLi5jb25maWcuY29sdW1ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE9ubHkgaGF2ZSB1bmlxdWUgY29sdW1ucywgZmlsdGVyIG91dCBkdXBsaWNhdGVzXG4gICAgICAgICAgICBjb2x1bW5zVG9TdW0gPSBjb2x1bW5zVG9TdW0uZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2YoaXRlbSkgPT09IGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFrZSBhIGZvcm0gZm9yIGVhY2ggcm93XG4gICAgICAgICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgICAgICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgcm93Q29udHJvbHMgPSBbXTtcbiAgICAgICAgICAgIHJvdy5jb250cm9scyA9IHt9O1xuICAgICAgICAgICAgcm93Ll9lZGl0aW5nID0ge307XG4gICAgICAgICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xuICAgICAgICAgICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgIC8vIFVzZSB0aGUgY29udHJvbCBwYXNzZWQgb3IgdXNlIGEgUmVhZE9ubHlDb250cm9sIHNvIHRoYXQgdGhlIGZvcm0gaGFzIHRoZSB2YWx1ZXNcbiAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGNvbHVtbi5lZGl0b3JDb25maWdcbiAgICAgICAgICAgICAgICA/IENvbnRyb2xGYWN0b3J5LmNyZWF0ZShjb2x1bW4uZWRpdG9yVHlwZSwgY29sdW1uLmVkaXRvckNvbmZpZylcbiAgICAgICAgICAgICAgICA6IG5ldyBSZWFkT25seUNvbnRyb2woeyBrZXk6IGNvbHVtbi5uYW1lIH0pO1xuICAgICAgICAgICAgICByb3cuY29udHJvbHNbY29sdW1uLm5hbWVdID0gY29udHJvbDtcbiAgICAgICAgICAgICAgcm93Q29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgcm93LCBmYWxzZSk7XG4gICAgICAgICAgICB0YWJsZUZvcm1Sb3dzLnB1c2godGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAocm93Q29udHJvbHMpKTtcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSB0b3RhbCBmb290ZXIgaWYgY29uZmlndXJlZFxuICAgICAgICAgICAgLy8gQXJyYXkgb2Yga2V5cyB0byB0b3RhbFxuICAgICAgICAgICAgaWYgKGNvbHVtbnNUb1N1bS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgY29sdW1uc1RvU3VtLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoY29sdW1uU3Vtc1tjb2x1bW5dKSkge1xuICAgICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dICs9IHJvd1tjb2x1bW5dO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGFibGVFZGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFNldHVwIHRoZSBmb290ZXJzIChpZiBhbnkpXG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZvb3RlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb25maWcuZm9vdGVycy5mb3JFYWNoKChmb290ZXJDb25maWcsIGZvb3RlckNvbmZpZ0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvb3RlciA9IHt9O1xuICAgICAgICAgICAgICBmb290ZXJbZm9vdGVyQ29uZmlnLmxhYmVsQ29sdW1uXSA9IGZvb3RlckNvbmZpZy5sYWJlbDtcbiAgICAgICAgICAgICAgZm9vdGVyQ29uZmlnLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZvb3RlckNvbmZpZy5tZXRob2QgPT09ICdBVkcnICYmIHRoaXMuX3Jvd3MubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXSAvIHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmZvb3RlcnMucHVzaChmb290ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQ7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSB0aGlzLmNvbmZpZy5wYWdpbmcuaXRlbXNQZXJQYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQYWdpbmcgdHVybmVkIG9mZiwgcmV0dXJuIGJhc2ljYWxseSBhbGwgb2YgdGhlIGRhdGFcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gMTtcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlU2l6ZSA9IDUwMDtcbiAgICB9XG4gICAgaWYgKGRwICYmIGRwLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIucmVmcmVzaCgpO1xuICB9XG4gIGdldCBkYXRhUHJvdmlkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFQcm92aWRlcjtcbiAgfVxuXG4gIGdldCBlZGl0aW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVDtcbiAgfVxuXG4gIGdldCBmb3JtVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVGb3JtLmdldFJhd1ZhbHVlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIGZvcm1VdGlsczogRm9ybVV0aWxzLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBub3RpZnkoJ1tEZXByZWNhdGVkXTogVGhlIHRhYmxlIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBtaWdyYXRlIHRvIG5vdm8tZGF0YS10YWJsZXMhJyk7XG4gIH1cblxuICBvbkRyb3Bkb3duVG9nZ2xlZChldmVudCwgY29sdW1uKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVkRHJvcGRvd25NYXBbY29sdW1uXSA9IGV2ZW50O1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZm9jdXNJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5maWx0ZXJJbnB1dHMgJiYgdGhpcy5maWx0ZXJJbnB1dHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0cy5mb3JFYWNoKChmaWx0ZXJJbnB1dCkgPT4ge1xuICAgICAgICBpZiAoZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZSA9IGV2ZW50LnBhZ2U7XG4gICAgLy8gdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPSBldmVudC5pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbikge1xuICAgIGlmICghSGVscGVycy5pc0JsYW5rKG9wdGlvbi52YWx1ZSkpIHtcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb247XG4gIH1cblxuICBzZXR1cENvbHVtbkRlZmF1bHRzKCkge1xuICAgIC8vIENoZWNrIGNvbHVtbnMgZm9yIGNlbGwgb3B0aW9uIHR5cGVzXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4udHlwZSkge1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAvLyBTZXQgb3B0aW9ucyBiYXNlZCBvbiBkYXRlcyBpZiB0aGVyZSBhcmUgbm9uZVxuICAgICAgICAgICAgY29sdW1uLm9wdGlvbnMgPSBjb2x1bW4ub3B0aW9ucyB8fCB0aGlzLmdldERlZmF1bHRPcHRpb25zKGNvbHVtbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ICE9PSB0aGlzLmxhc3RQYWdlKSB7XG4gICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0UGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZyA/IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50IDogMTtcbiAgfVxuXG4gIGdldFBhZ2VTdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgPyAodGhpcy5kYXRhUHJvdmlkZXIucGFnZSAtIDEpICogdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiAwO1xuICB9XG5cbiAgZ2V0UGFnZUVuZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYWdpbmcgJiYgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgPiAtMSA/IHRoaXMuZ2V0UGFnZVN0YXJ0KCkgKyB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA6IHRoaXMucm93cy5sZW5ndGg7XG4gIH1cblxuICBnZXRSb3dDb250cm9sRm9ybShpKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgcmV0dXJuIHRhYmxlRm9ybVJvd3MuY29udHJvbHNbaV07XG4gIH1cblxuICBvbkZpbHRlckNsaWNrKGNvbHVtbiwgZmlsdGVyKSB7XG4gICAgaWYgKGZpbHRlci5yYW5nZSAmJiAhY29sdW1uLmNhbGVuZGFyU2hvdykge1xuICAgICAgY29sdW1uLmNhbGVuZGVyU2hvdyA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpICYmIGNvbHVtbi5tdWx0aXBsZSkge1xuICAgICAgaWYgKH5jb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSkge1xuICAgICAgICAvLyBSZW1vdmUgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIuc3BsaWNlKGNvbHVtbi5maWx0ZXIuaW5kZXhPZihmaWx0ZXIpLCAxKTtcbiAgICAgICAgaWYgKGZpbHRlci5yYW5nZSkge1xuICAgICAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uZmlsdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgZmlsdGVyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29sdW1uLm11bHRpcGxlKSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gbmV3IEFycmF5KCk7XG4gICAgICBjb2x1bW4uZmlsdGVyLnB1c2goSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWU7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2xlYXIoY29sdW1uOiBhbnkpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xuICAgICAgY29sdW1uLmZyZWV0ZXh0RmlsdGVyID0gbnVsbDtcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIGlmIChjb2x1bW4ub3JpZ2luYWxPcHRpb25zKSB7XG4gICAgICAgIGNvbHVtbi5vcHRpb25zID0gY29sdW1uLm9yaWdpbmFsT3B0aW9ucztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsU29ydEFuZEZpbHRlcnMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgY29sdW1uLnNvcnQgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSByb3cgZGF0YSB0byByZWZsZWN0IHRoZSBhY3RpdmUgZmlsdGVycy5cbiAgICovXG4gIG9uRmlsdGVyQ2hhbmdlKGV2ZW50PzogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlsdGVyaW5nKSB7XG4gICAgICAvLyBBcnJheSBvZiBmaWx0ZXJzXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5jb2x1bW5zLmZpbHRlcigoY29sKSA9PiAhSGVscGVycy5pc0VtcHR5KGNvbC5maWx0ZXIpKTtcbiAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICBsZXQgcXVlcnkgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgZmlsdGVycykge1xuICAgICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLm1hdGNoKSkge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gKHZhbHVlLCByZWNvcmQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5tYXRjaChyZWNvcmQsIGNvbHVtbi5maWx0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5wcmVGaWx0ZXIgJiYgSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5wcmVGaWx0ZXIpKSB7XG4gICAgICAgICAgICBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5LCBjb2x1bW4ucHJlRmlsdGVyKHRoaXMuZXNjYXBlQ2hhcmFjdGVycyhjb2x1bW4uZmlsdGVyKSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSkge1xuICAgICAgICAgICAgLy8gVGhlIGZpbHRlcnMgYXJlIGFuIGFycmF5IChtdWx0aS1zZWxlY3QpLCBjaGVjayB2YWx1ZVxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSBjb2x1bW4uZmlsdGVyO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBhbiBhcnJheSBvZiB7dmFsdWU6ICcnLCBsYWJlbHM6ICcnfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbMF0udmFsdWUgfHwgb3B0aW9uc1swXS5sYWJlbCkge1xuICAgICAgICAgICAgICBvcHRpb25zID0gY29sdW1uLmZpbHRlci5tYXAoKG9wdCkgPT4gb3B0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHsgYW55OiBvcHRpb25zIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4udHlwZSAmJiBjb2x1bW4udHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlci5zdGFydERhdGUgJiYgY29sdW1uLmZpbHRlci5lbmREYXRlKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICBtaW46IGRhdGVGbnMuc3RhcnRPZkRheShjb2x1bW4uZmlsdGVyLnN0YXJ0RGF0ZSksXG4gICAgICAgICAgICAgICAgbWF4OiBkYXRlRm5zLnN0YXJ0T2ZEYXkoZGF0ZUZucy5hZGREYXlzKGRhdGVGbnMuc3RhcnRPZkRheShjb2x1bW4uZmlsdGVyLmVuZERhdGUpLCAxKSksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgbWluOiBjb2x1bW4uZmlsdGVyLm1pbiA/IGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLCBjb2x1bW4uZmlsdGVyLm1pbikgOiBkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLFxuICAgICAgICAgICAgICAgIG1heDogY29sdW1uLmZpbHRlci5tYXggPyBkYXRlRm5zLmFkZERheXMoZGF0ZUZucy5zdGFydE9mVG9tb3Jyb3coKSwgY29sdW1uLmZpbHRlci5tYXgpIDogZGF0ZUZucy5zdGFydE9mVG9tb3Jyb3coKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gY29sdW1uLmZpbHRlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5maWx0ZXJpbmcpKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyaW5nKHF1ZXJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0gcXVlcnk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5maWx0ZXIgPSB7fTtcbiAgICAgIH1cbiAgICAgIC8vIFRyaWNrbGUgZG93biB0byBrZWVwIHNvcnRcbiAgICAgIC8vIHRoaXMub25Tb3J0Q2hhbmdlKHRoaXMuY3VycmVudFNvcnRDb2x1bW4pO1xuICAgICAgdGhpcy5maXJlVGFibGVDaGFuZ2VFdmVudCgpO1xuXG4gICAgICAvLyBJZiBwYWdpbmcsIHJlc2V0IHBhZ2VcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgICAgdGhpcy5jb25maWcucGFnaW5nLmN1cnJlbnQgPSAxO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbGwoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVzY2FwZUNoYXJhY3RlcnMoZmlsdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZmlsdGVyLnJlcGxhY2UoLycvZywgXCInJ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfVxuXG4gIGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgZmlsdGVyKTogYm9vbGVhbiB7XG4gICAgLy8gVE9ETzogVGhpcyBuZWVkcyB0byBiZSByZWZhY3RvcmVkXG4gICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKGNvbHVtbiAmJiAhSGVscGVycy5pc0JsYW5rKGNvbHVtbi5maWx0ZXIpICYmICFIZWxwZXJzLmlzQmxhbmsoZmlsdGVyKSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmxhYmVsID09PSBmaWx0ZXIubGFiZWw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLmluY2x1ZGVzKGZpbHRlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uLmZpbHRlciA9PT0gdHlwZW9mIGZpbHRlcikge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlciA9PT0gZmlsdGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlciA9PT0gZmlsdGVyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0FjdGl2ZTtcbiAgfVxuXG4gIG9uU29ydENoYW5nZShjb2x1bW4pIHtcbiAgICB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID0gY29sdW1uO1xuICAgIGNvbnN0IHNvcnRlZENvbHVtbnM6IGFueSA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKHRoaXNDb2x1bW4pID0+IHtcbiAgICAgIHJldHVybiB0aGlzQ29sdW1uLnNvcnQgJiYgdGhpc0NvbHVtbiAhPT0gdGhpcy5jdXJyZW50U29ydENvbHVtbjtcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IHNvcnRlZENvbHVtbiBvZiBzb3J0ZWRDb2x1bW5zKSB7XG4gICAgICBzb3J0ZWRDb2x1bW4uc29ydCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5zb3J0aW5nKSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5zb3J0aW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbihjb2x1bW4ucHJlU29ydCkpIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbXS5jb25jYXQoY29sdW1uLnByZVNvcnQoY29sdW1uKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuc29ydCA9IFt7IGZpZWxkOiBjb2x1bW4uY29tcGFyZSB8fCBjb2x1bW4ubmFtZSwgcmV2ZXJzZTogY29sdW1uLnNvcnQgPT09ICdkZXNjJyB9XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXJlIHRhYmxlIGNoYW5nZSBldmVudFxuICAgIC8vIHRoaXMuZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKTtcblxuICAgIC8vIElmIHBhZ2luZywgcmVzZXQgcGFnZVxuICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcbiAgICAgIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gMTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYWxsIHNlbGVjdGlvbiBvbiBzb3J0IGNoYW5nZSBpZiBzZWxlY3Rpb24gaXMgb25cbiAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmaXJlVGFibGVDaGFuZ2VFdmVudCgpIHtcbiAgICAvLyBDb25zdHJ1Y3QgYSB0YWJsZSBjaGFuZ2Ugb2JqZWN0XG4gICAgY29uc3Qgb25UYWJsZUNoYW5nZTogYW55ID0ge307XG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKGNvbCkgPT4gY29sLmZpbHRlciAmJiBjb2wuZmlsdGVyLmxlbmd0aCk7XG4gICAgb25UYWJsZUNoYW5nZS5maWx0ZXIgPSBmaWx0ZXJzLmxlbmd0aCA/IGZpbHRlcnMgOiBmYWxzZTtcbiAgICBvblRhYmxlQ2hhbmdlLnNvcnQgPSB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID8gdGhpcy5jdXJyZW50U29ydENvbHVtbiA6IGZhbHNlO1xuICAgIG9uVGFibGVDaGFuZ2Uucm93cyA9IHRoaXMucm93cztcblxuICAgIC8vIEVtaXQgZXZlbnRcbiAgICB0aGlzLm9uVGFibGVDaGFuZ2UuZW1pdChvblRhYmxlQ2hhbmdlKTtcbiAgfVxuXG4gIGZpbmRDb2x1bW5JbmRleCh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5zW2ldLm5hbWUgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uT3JkZXJDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LmZpcnN0Lm5hbWUpO1xuICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5maW5kQ29sdW1uSW5kZXgoZXZlbnQuc2Vjb25kLm5hbWUpO1xuICAgIHRoaXMuY29sdW1ucy5zcGxpY2UobmV3SW5kZXgsIDAsIHRoaXMuY29sdW1ucy5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcbiAgfVxuXG4gIGV4cGFuZEFsbE9uUGFnZShleHBhbmRlZCkge1xuICAgIHRoaXMuY29uZmlnLmV4cGFuZEFsbCA9ICFleHBhbmRlZDtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XG4gICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFBhZ2UoZGF0YT86IGFueSkge1xuICAgIGlmICghdGhpcy5tYXN0ZXIpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgIC8vIE9ubHkgc2hvdyB0aGUgc2VsZWN0IGFsbCBtZXNzYWdlIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgbmV3IHBhZ2Ugc2VsZWN0ZWQgYXQgYSB0aW1lXG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xuICAgICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5wYWdlZERhdGEpIHtcbiAgICAgICAgcm93Ll9zZWxlY3RlZCA9IHRoaXMubWFzdGVyO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNlbGVjdCBhbGwgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIG5ldyBwYWdlIHNlbGVjdGVkIGF0IGEgdGltZVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCsrO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPT09IDEgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggIT09IHRoaXMuZGF0YVByb3ZpZGVyLnRvdGFsO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZWxlY3RBbGwodmFsdWUpIHtcbiAgICB0aGlzLm1hc3RlciA9IHZhbHVlO1xuICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QpIHtcbiAgICAgIHJvdy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlID8gdGhpcy5kYXRhUHJvdmlkZXIubGlzdCA6IFtdO1xuICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID0gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA+IDAgPyB0aGlzLnNlbGVjdGVkUGFnZUNvdW50IC0gMSA6IDA7XG4gICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gIH1cblxuICByb3dTZWxlY3RIYW5kbGVyKGRhdGE/OiBhbnkpIHtcbiAgICAvLyB0aGlzLnBhZ2VkRGF0YSA9IHRoaXMucm93cy5zbGljZSh0aGlzLmdldFBhZ2VTdGFydCgpLCB0aGlzLmdldFBhZ2VFbmQoKSk7XG4gICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kYXRhUHJvdmlkZXIubGlzdC5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICBpZiAodGhpcy5wYWdlU2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm1hc3RlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VTZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucGFnZWREYXRhLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXN0ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFzdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSB0cnVlO1xuXG4gICAgICAvLyBCcmVha2luZyB0aGUgc2VsZWN0ZWQgcGFnZSBjb3VudFxuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgIH1cbiAgICB0aGlzLmVtaXRTZWxlY3RlZCh0aGlzLnNlbGVjdGVkKTtcbiAgfVxuXG4gIGVtaXRTZWxlY3RlZChzZWxlY3RlZCkge1xuICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IGxlbmd0aDogc2VsZWN0ZWQubGVuZ3RoLCBzZWxlY3RlZCB9KTtcbiAgfVxuXG4gIHJvd0NsaWNrSGFuZGxlcihyb3cpIHtcbiAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0KSB7XG4gICAgICB0aGlzLmFjdGl2ZUlkID0gcm93LmlkIHx8IDA7XG4gICAgICB0aGlzLm9uUm93Q2xpY2suZW1pdChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGdldERlZmF1bHRPcHRpb25zKGNvbHVtbikge1xuICAgIC8vIFRPRE8gLSBuZWVkcyB0byBjb21lIGZyb20gbGFiZWwgc2VydmljZSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9idWxsaG9ybi9ub3ZvLWVsZW1lbnRzL2lzc3Vlcy8xMTZcbiAgICBjb25zdCBvcHRzOiBhbnlbXSA9IFtcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3QxRGF5LCBtaW46IC0xLCBtYXg6IDAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q3RGF5cywgbWluOiAtNywgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MzBEYXlzLCBtaW46IC0zMCwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0OTBEYXlzLCBtaW46IC05MCwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MVllYXIsIG1pbjogLTM2NiwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MURheSwgbWluOiAwLCBtYXg6IDEgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ3RGF5cywgbWluOiAwLCBtYXg6IDcgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQzMERheXMsIG1pbjogMCwgbWF4OiAzMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDkwRGF5cywgbWluOiAwLCBtYXg6IDkwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MVllYXIsIG1pbjogMCwgbWF4OiAzNjYgfSxcbiAgICBdO1xuXG4gICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4ucmFuZ2UpIHtcbiAgICAgIG9wdHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiB0aGlzLmxhYmVscy5jdXN0b21EYXRlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRzO1xuICB9XG5cbiAgb25DYWxlbmRlclNlbGVjdChjb2x1bW4sIGV2ZW50KTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoZXZlbnQuc3RhcnREYXRlICYmIGV2ZW50LmVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xuICAgICAgfVxuICAgIH0sIDEwKTtcbiAgfVxuXG4gIG9uRmlsdGVyS2V5d29yZHMoY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAmJiBjb25maWcuZmlsdGVyaW5nICYmIGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXIpIHtcbiAgICAgIGNvbnN0IGZpbHRlcktleXdvcmRzID0gY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucykge1xuICAgICAgICBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb24gJiYgb3B0aW9uLmxhYmVsID8gb3B0aW9uLmxhYmVsIDogb3B0aW9uO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZmlsdGVyS2V5d29yZHMpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh+dmFsdWUuaW5kZXhPZihmaWx0ZXJLZXl3b3JkcykgfHwgfnZhbHVlLmluZGV4T2YoZmlsdGVyS2V5d29yZHMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnMgPSBuZXdPcHRpb25zO1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5maWx0ZXIgPSBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucztcbiAgICB9XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBUYWJsZSBpbnRvIEVESVQgbW9kZSwgYmFzZWQgb24gdGhlIHJvdy9jb2x1bW4gcGFzc2VkIHlvdSBjYW4gZW50ZXIgaW4gYSBmZXcgc3RhdGVzXG4gICAqICgxKSBzZXRUYWJsZUVkaXQoKSAtIGRvbid0IHBhc3MgYW55IHRvIHB1dCB0aGUgRlVMTCB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiAoMikgc2V0VGFibGVFZGl0KDEpIC0gcGFzcyBvbmx5IHJvdyB0byBwdXQgdGhhdCBGVUxMIHJvdyBvZiB0aGUgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogKDMpIHNldFRhYmxlRWRpdCgxLCAxKSAtIHBhc3Mgcm93IGFuZCBjb2x1bW4gdG8gcHV0IHRoYXQgY29sdW1uIG9mIHRoZSByb3cgb2YgdGhlIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBzZXRUYWJsZUVkaXQocm93TnVtYmVyPzogbnVtYmVyLCBjb2x1bW5OdW1iZXI/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGUgPSBOb3ZvVGFibGVNb2RlLkVESVQ7XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLmVkaXQoKTtcbiAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIHJvdy5fZWRpdGluZyA9IHJvdy5fZWRpdGluZyB8fCB7fTtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4udmlld09ubHkpIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiYgSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikpIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiYgcm93SW5kZXggPT09IE51bWJlcihyb3dOdW1iZXIpICYmIEhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmXG4gICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpICYmXG4gICAgICAgICAgcm93SW5kZXggPT09IE51bWJlcihyb3dOdW1iZXIpICYmXG4gICAgICAgICAgY29sdW1uSW5kZXggPT09IE51bWJlcihjb2x1bW5OdW1iZXIpXG4gICAgICAgICkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIExlYXZlcyBlZGl0IG1vZGUgZm9yIHRoZSBUYWJsZSBhbmQgcHV0cyBldmVyeXRoaW5nIGJhY2sgdG8gVklFVyBvbmx5XG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqIEBwYXJhbSBjYW5jZWwgLSB3aGV0aGVyIG9yIG5vdCB0byBzYXZlIGRhdGEgb3IgdW5kb1xuICAgKi9cbiAgcHJpdmF0ZSBsZWF2ZUVkaXRNb2RlKGNhbmNlbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcbiAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93Ll9lZGl0aW5nID0gcm93Ll9lZGl0aW5nIHx8IHt9O1xuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoY2FuY2VsKSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIudW5kbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuY29tbWl0KCk7XG4gICAgfVxuICAgIHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgbmV3IHJvdyBpbnRvIHRoZSB0YWJsZSB0byBiZSBlZGl0ZWQsIGNhbiBiZSBjYWxsZWQgZnJvbSBhIGxvY2FsIHJlZmVyZW5jZSBvZiB0aGUgdGFibGUgaW4geW91ciB0ZW1wbGF0ZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgYWRkRWRpdGFibGVSb3coZGVmYXVsdFZhbHVlOiBhbnkgPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlRm9ybVJvd3MgPSB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCByb3c6IGFueSA9IHt9O1xuICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XG4gICAgcm93LmNvbnRyb2xzID0ge307XG4gICAgcm93Ll9lZGl0aW5nID0ge307XG4gICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGggKyAxO1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgIC8vIFVzZSB0aGUgY29udHJvbCBwYXNzZWQgb3IgdXNlIGEgUmVhZE9ubHlDb250cm9sIHNvIHRoYXQgdGhlIGZvcm0gaGFzIHRoZSB2YWx1ZXNcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb2x1bW4uZWRpdG9yQ29uZmlnXG4gICAgICAgID8gQ29udHJvbEZhY3RvcnkuY3JlYXRlKGNvbHVtbi5lZGl0b3JUeXBlLCBjb2x1bW4uZWRpdG9yQ29uZmlnKVxuICAgICAgICA6IG5ldyBSZWFkT25seUNvbnRyb2woeyBrZXk6IGNvbHVtbi5uYW1lIH0pO1xuICAgICAgY29udHJvbC52YWx1ZSA9IG51bGw7IC8vIHJlbW92ZSBjb3BpZWQgY29sdW1uIHZhbHVlXG4gICAgICByb3cuY29udHJvbHNbY29sdW1uLm5hbWVdID0gY29udHJvbDtcbiAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSAhY29sdW1uLnZpZXdPbmx5O1xuICAgICAgcm93Q29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICB9KTtcbiAgICB0aGlzLmZvcm1VdGlscy5zZXRJbml0aWFsVmFsdWVzKHJvd0NvbnRyb2xzLCBkZWZhdWx0VmFsdWUsIGZhbHNlKTtcbiAgICB0YWJsZUZvcm1Sb3dzLnB1c2godGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAocm93Q29udHJvbHMpKTtcbiAgICB0aGlzLl9yb3dzLnB1c2gocm93KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVmFsaWRhdGVzIHRoZSBGb3JtIGluc2lkZSBvZiB0aGUgVGFibGUsIGlmIHRoZXJlIGFyZSBlcnJvcnMgaXQgd2lsbCBkaXNwbGF5L3JldHVybiB0aGUgZXJyb3JzIGZvciBlYWNoIHJvdy5cbiAgICogSWYgdGhlcmUgYXJlIG5vIGVycm9ycywgdGhlbiBpdCB3aWxsIHJldHVybiBPTkxZIHRoZSBjaGFuZ2VkIGRhdGEgZm9yIGVhY2ggcm93LCB0aGUgZGF0YSByZXR1cm5lZCB3aWxsIGJlIGluIHRoZSBmb3JtOlxuICAgKiB7IGlkOiBJRF9PRl9SRUNPUkQsIGtleTogdmFsdWUgfSAtLSBkYXRhIHRoYXQgd2FzIHVwZGF0ZWRcbiAgICogeyBpZDogdW5kZWZpbmVkLCBrZXk6IHZhbHVlIH0gLS0gZGF0YSB0aGF0IHdhcyBhZGRlZFxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgdmFsaWRhdGVBbmRHZXRVcGRhdGVkRGF0YSgpOiB7IGNoYW5nZWQ/OiBhbnlbXTsgZXJyb3JzPzogeyBlcnJvcnM6IGFueTsgcm93OiBhbnk7IGluZGV4OiBudW1iZXIgfVtdIH0ge1xuICAgIGlmICh0aGlzLnRhYmxlRm9ybSAmJiB0aGlzLnRhYmxlRm9ybS5jb250cm9scyAmJiB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzKSB7XG4gICAgICBjb25zdCBjaGFuZ2VkUm93cyA9IFtdO1xuICAgICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgICAvLyBHbyBvdmVyIHRoZSBGb3JtQXJyYXkncyBjb250cm9sc1xuICAgICAgKHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5KS5jb250cm9scy5mb3JFYWNoKChmb3JtR3JvdXA6IEZvcm1Hcm91cCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgY2hhbmdlZFJvdyA9IG51bGw7XG4gICAgICAgIGxldCBlcnJvciA9IG51bGw7XG4gICAgICAgIC8vIEdvIG92ZXIgdGhlIGZvcm0gZ3JvdXAgY29udHJvbHNcbiAgICAgICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNba2V5XTtcbiAgICAgICAgICAvLyBIYW5kbGUgdmFsdWUgY2hhbmdpbmdcbiAgICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmRpcnR5ICYmICFjb250cm9sLmVycm9ycykge1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2VkUm93KSB7XG4gICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgSUQsIHNvIHdlIGhhdmUgc29tZSBrZXkgdG8gc2F2ZSBhZ2FpbnN0XG4gICAgICAgICAgICAgIGNoYW5nZWRSb3cgPSB7fTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd3NbaW5kZXhdLmlkKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZFJvdy5pZCA9IHRoaXMuX3Jvd3NbaW5kZXhdLmlkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBkaXJ0eSwgZ3JhYiB2YWx1ZSBvZmYgdGhlIGZvcm1cbiAgICAgICAgICAgIGNoYW5nZWRSb3dba2V5XSA9IHRoaXMudGFibGVGb3JtLmdldFJhd1ZhbHVlKCkucm93c1tpbmRleF1ba2V5XTtcbiAgICAgICAgICAgIC8vIFNldCB2YWx1ZSBiYWNrIHRvIHJvdyAoc2hvdWxkIGJlIGFscmVhZHkgZG9uZSB2aWEgdGhlIHNlcnZlciBjYWxsLCBidXQgZG8gaXQgYW55d2F5KVxuICAgICAgICAgICAgdGhpcy5fcm93c1tpbmRleF1ba2V5XSA9IGNoYW5nZWRSb3dba2V5XTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5lcnJvcnMpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvcnNcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yW2tleV0gPSBjb250cm9sLmVycm9ycztcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjaGFuZ2VkUm93KSB7XG4gICAgICAgICAgY2hhbmdlZFJvd3MucHVzaChjaGFuZ2VkUm93KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7IGVycm9yczogZXJyb3IsIHJvdzogdGhpcy5fcm93c1tpbmRleF0sIGluZGV4IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFJldHVybiBlcnJvcnMgaWYgYW55LCBvdGhlcndpc2UgcmV0dXJuIHRoZSBjaGFuZ2VkIHJvd3NcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7IGNoYW5nZWQ6IGNoYW5nZWRSb3dzIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBlcnJvcnMgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFJlZnJlc2ggdGhlIGRhdGEgcHJvdmlkZXIgYW5kIGxlYXZlIGVkaXQgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgY2FuY2VsRWRpdGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmxlYXZlRWRpdE1vZGUodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFJlZnJlc2ggdGhlIGRhdGEgcHJvdmlkZXIgYW5kIGxlYXZlIGVkaXQgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgc2F2ZUNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZUVkaXRNb2RlKGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRGlzcGxheXMgYSB0b2FzdCBtZXNzYWdlIGluc2lkZSBvZiB0aGUgdGFibGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGRpc3BsYXlUb2FzdE1lc3NhZ2UodG9hc3Q6IHsgaWNvbjogc3RyaW5nOyB0aGVtZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmcgfSwgaGlkZURlbGF5PzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy50b2FzdCA9IHRvYXN0O1xuICAgIGlmIChoaWRlRGVsYXkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlVG9hc3RNZXNzYWdlKCksIGhpZGVEZWxheSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBGb3JjZSBoaWRlIHRoZSB0b2FzdCBtZXNzYWdlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBoaWRlVG9hc3RNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMudG9hc3QgPSBudWxsO1xuICAgIC8vIEhhY2sgdG8gbWFrZSB0aGUgdGFibGUgZGlzcGxheSBwcm9wZXJseSBhZnRlciBoaWRpbmcgdGhlIHRvYXN0XG4gICAgdGhpcy5ncm9zc0ZsYWdUb0F2b2lkVGhlVGFibGVGcm9tQmVpbmdVZ2x5V2hlbkhpZGluZ1RoZVRvYXN0ID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBkaXNwbGF5IHRoZSBsb2FkaW5nIG92ZXJsYXkgb24gdGhlIHRhYmxlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICB0b2dnbGVMb2FkaW5nKHNob3c6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBzaG93O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBoaWRlIGEgY29sdW1uIGluIGVkaXQgb3IgdmlldyBtb2RlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBpc0NvbHVtbkhpZGRlbihjb2x1bW46IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVkaXRpbmcgPyAhIWNvbHVtbi5oaWRlQ29sdW1uT25FZGl0IDogISFjb2x1bW4uaGlkZUNvbHVtbk9uVmlldztcbiAgfVxufVxuIl19