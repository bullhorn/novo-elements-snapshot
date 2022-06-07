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
  `, isInline: true, components: [{ type: i4.Pagination, selector: "novo-pagination", inputs: ["page", "totalItems", "itemsPerPage", "rowOptions", "label", "disablePageSelection"], outputs: ["pageChange", "itemsPerPageChange", "onPageChange"] }, { type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i6.NovoToastElement, selector: "novo-toast", inputs: ["appearance", "theme", "icon", "title", "action", "hasDialogue", "link", "isCloseable", "message"], outputs: ["closed"] }, { type: i7.NovoFormElement, selector: "novo-form", inputs: ["form", "layout", "hideHeader"] }, { type: i8.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i9.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { type: i10.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i11.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i12.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i13.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i14.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i15.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { type: i16.TableCell, selector: "novo-table-cell", inputs: ["column", "row", "form", "hasEditor"] }, { type: i17.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { type: i18.RowDetails, selector: "novo-row-details", inputs: ["data", "renderer"] }], directives: [{ type: i19.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i20.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i21.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { type: i19.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i19.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i22.ThOrderable, selector: "[novoThOrderable]", inputs: ["novoThOrderable"], outputs: ["onOrderChange"] }, { type: i23.ThSortable, selector: "[novoThSortable]", inputs: ["novoThSortable", "column"], outputs: ["onSortChange"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i24.NovoTableKeepFilterFocus, selector: "[keepFilterFocused]" }, { type: i25.TableFilter, selector: "[novoTableFilter]", inputs: ["novoTableFilter"], outputs: ["onFilterChange"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy90YWJsZS9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBVyxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SSxPQUFPLEVBQThCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixTQUFTO0FBQ1QsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0J6RSwrR0FBK0c7QUFDL0csTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtBQUNWLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQW1WRCxN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LEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDbkQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQy9DLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtZQUNoRCxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7WUFDbEQsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1lBQ2xELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtTQUNuRCxDQUFDO1FBRUYsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7Z0JBQ2xDLEtBQUssRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc1VUO2lCQUNGO3lMQUdDLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUlqRCxNQUFNO3NCQURMLEtBQUs7Z0JBR04sT0FBTztzQkFETixLQUFLO2dCQUdOLEtBQUs7c0JBREosS0FBSztnQkFHTixzQkFBc0I7c0JBRHJCLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFHTixhQUFhO3NCQURaLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLO2dCQUlOLFVBQVU7c0JBRFQsTUFBTTtnQkFHUCxXQUFXO3NCQURWLE1BQU07Z0JBR1AsYUFBYTtzQkFEWixNQUFNO2dCQTRCSCxJQUFJO3NCQURQLEtBQUs7Z0JBaUJGLFlBQVk7c0JBRGYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBWZW5kb3JcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBDb2xsZWN0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXByb3ZpZGVyL0NvbGxlY3Rpb25FdmVudCc7XG5pbXBvcnQgeyBQYWdlZEFycmF5Q29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtcHJvdmlkZXIvUGFnZWRBcnJheUNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtLXV0aWxzL0Zvcm1VdGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcbmltcG9ydCB7IENvbnRyb2xGYWN0b3J5LCBSZWFkT25seUNvbnRyb2wgfSBmcm9tICcuLy4uL2Zvcm0vRm9ybUNvbnRyb2xzJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvVGFibGVDb25maWcge1xuICAvLyBQYWdpbmcgY29uZmlnXG4gIHBhZ2luZz86IHtcbiAgICBjdXJyZW50OiBudW1iZXI7IC8vIGN1cnJlbnQgcGFnZVxuICAgIGl0ZW1zUGVyUGFnZTogbnVtYmVyOyAvLyBpdGVtcyBwZXIgcGFnZVxuICAgIG9uUGFnZUNoYW5nZTogRnVuY3Rpb247IC8vIGZ1bmN0aW9uIHRvIGhhbmRsZSBwYWdlIGNoYW5naW5nXG4gICAgcm93T3B0aW9ucz86IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9W107IC8vIHBhZ2Ugb3B0aW9uc1xuICAgIGRpc2FibGVQYWdlU2VsZWN0aW9uPzogYm9vbGVhbjsgLy8gZGlzYWJsZXMgdGhlIHBhZ2VzIGZyb20gYmVpbmcgc2VsZWN0ZWRcbiAgfTtcbiAgLy8gRm9vdGVyIGNvbmZpZyAodG90YWwgZm9vdGVyKVxuICBmb290ZXJzPzogQXJyYXk8e1xuICAgIGNvbHVtbnM6IEFycmF5PHN0cmluZz47IC8vIHN0cmluZyBhcnJheSBvZiBjb2x1bW5zIHRvIHRvdGFsXG4gICAgbWV0aG9kOiBzdHJpbmc7IC8vIG1ldGhvZCB0byB1c2UgZm9yIHRoZSBmb290ZXIsIFNVTSB8IEFWRywgZGVmYXVsdHMgdG8gU1VNXG4gICAgbGFiZWxDb2x1bW46IHN0cmluZzsgLy8gY29sdW1uIHRvIHVzZSBhcyB0aGUgXCJ0b3RhbFwiIGxhYmVsXG4gICAgbGFiZWw6IHN0cmluZzsgLy8gbGFiZWwgdG8gdXNlIGluIHRoZSBcInRvdGFsXCIgbGFiZWxcbiAgfT47XG4gIC8vIFRPRE86IFdoZW4gdGhlc2UgdHlwZXMgYXJlIGVuZm9yY2VkIGFzIGBib29sZWFuIHwgRnVuY3Rpb25gLCB0aGVyZSdzIGEgbGludCBlcnJvci4gVGhhdCdzIGEgYnVnLlxuICBmaWx0ZXJpbmc/OiBib29sZWFuIHwgYW55OyAvLyBUdXJuIG9uIGZpbHRlcmluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBmaWx0ZXJpbmcgY2FsbGJhY2tcbiAgc29ydGluZz86IGJvb2xlYW4gfCBhbnk7IC8vIFR1cm4gb24gc29ydGluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBzb3J0aW5nIGNhbGxiYWNrXG4gIG9yZGVyaW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIG9yZGVyaW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIG9yZGVyaW5nIGNhbGxiYWNrXG4gIHJlc2l6aW5nPzogYm9vbGVhbiB8IEZ1bmN0aW9uOyAvLyBUdXJuIG9uIHJlc2l6aW5nIGZvciB0aGUgdGFibGUsIGJvb2xlYW4gb3IgZnVuY3Rpb24gZm9yIHJlc2l6aW5nIGNhbGxiYWNrXG4gIHJvd1NlbGVjdGlvblN0eWxlPzogc3RyaW5nOyAvLyBSb3cgc2VsZWN0aW9uIHN0eWxlLCBjaGVja2JveCBvciByb3dcbiAgcm93U2VsZWN0PzogYm9vbGVhbjsgLy8gVHVybiBvbiByb3cgc2VsZWN0aW9uXG4gIGhhc0RldGFpbHM/OiBib29sZWFuOyAvLyBUdXJuIG9uIGRldGFpbHMgcm93IGZvciB0aGUgdGFibGVcbiAgZGV0YWlsc1JlbmRlcmVyPzogYW55OyAvLyBSZW5kZXJlci9jb21wb25lbnQgZm9yIHRoZSBkZXRhaWxzIHJvd1xuICBleHBhbmRBbGw/OiBib29sZWFuOyAvLyBzaG91bGQgQWxsIFJvd3MgYmUgZXhwYW5kZWQgYnkgZGVmYXVsdFxuICBzZWxlY3RBbGxFbmFibGVkPzogYm9vbGVhbjsgLy8gQWxsb3dzIHRoZSB0YWJsZSwgd2hpbGUgaW4gc2VsZWN0aW9uIG1vZGUgdG8gaGF2ZSBhIHNlbGVjdCBhbGwgYXQgdGhlIHRvcFxufVxuXG4vLyBUT0RPIC0gc3VwcG9ydCAoMSkgY2xpY2tpbmcgY2VsbCB0byBlZGl0LCAoMikgY2xpY2tpbmcgcm93IHRvIGVkaXQsICgzKSBidXR0b24gdG8gdHJpZ2dlciBmdWxsIHRhYmxlIHRvIGVkaXRcbmV4cG9ydCBlbnVtIE5vdm9UYWJsZU1vZGUge1xuICBWSUVXID0gMSxcbiAgRURJVCA9IDIsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFibGUnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRhYmxlJyxcbiAgICAnW2F0dHIudGhlbWVdJzogJ3RoZW1lJyxcbiAgICAnW2NsYXNzLmVkaXRpbmddJzogJ21vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVCcsXG4gICAgJ1tjbGFzcy5ub3ZvLXRhYmxlLWxvYWRpbmddJzogJ2xvYWRpbmcnLFxuICB9LFxuICAvLyBkaXJlY3RpdmVzOiBbXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aGVhZGVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGhcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgIDxub3ZvLXBhZ2luYXRpb25cbiAgICAgICAgICAqbmdJZj1cImNvbmZpZy5wYWdpbmcgJiYgIShkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpKVwiXG4gICAgICAgICAgW3Jvd09wdGlvbnNdPVwiY29uZmlnLnBhZ2luZy5yb3dPcHRpb25zXCJcbiAgICAgICAgICBbZGlzYWJsZVBhZ2VTZWxlY3Rpb25dPVwiY29uZmlnLnBhZ2luZy5kaXNhYmxlUGFnZVNlbGVjdGlvblwiXG4gICAgICAgICAgWyhwYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVwiXG4gICAgICAgICAgWyhpdGVtc1BlclBhZ2UpXT1cImRhdGFQcm92aWRlci5wYWdlU2l6ZVwiXG4gICAgICAgICAgW3RvdGFsSXRlbXNdPVwiZGF0YVByb3ZpZGVyLnRvdGFsXCJcbiAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICA8L25vdm8tcGFnaW5hdGlvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1hY3Rpb25zXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFibGUtbG9hZGluZy1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nIHx8IGRhdGFQcm92aWRlci5pc0xvYWRpbmcoKVwiPlxuICAgICAgPG5vdm8tbG9hZGluZz48L25vdm8tbG9hZGluZz5cbiAgICA8L2Rpdj5cbiAgICA8bm92by10b2FzdCAqbmdJZj1cInRvYXN0XCIgW3RoZW1lXT1cInRvYXN0Py50aGVtZVwiIFtpY29uXT1cInRvYXN0Py5pY29uXCIgW21lc3NhZ2VdPVwidG9hc3Q/Lm1lc3NhZ2VcIj48L25vdm8tdG9hc3Q+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiICpuZ0lmPVwiIWdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3RcIj5cbiAgICAgIDxub3ZvLWZvcm0gaGlkZUhlYWRlcj1cInRydWVcIiBbZm9ybV09XCJ0YWJsZUZvcm1cIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCBkYXRhVGFibGVcIiBbY2xhc3MudGFibGUtZGV0YWlsc109XCJjb25maWcuaGFzRGV0YWlsc1wiIHJvbGU9XCJncmlkXCI+XG4gICAgICAgICAgPCEtLSBza2lwU29ydEFuZEZpbHRlckNsZWFyIGlzIGEgaGFjayByaWdodCBub3csIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIENhbnZhcyBpcyByZWZhY3RvcmVkIC0tPlxuICAgICAgICAgIDx0aGVhZCAqbmdJZj1cImNvbHVtbnMubGVuZ3RoICYmICghZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSB8fCBkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpIHx8IHNraXBTb3J0QW5kRmlsdGVyQ2xlYXIgfHwgZWRpdGluZylcIj5cbiAgICAgICAgICAgIDx0ciByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgIDwhLS0gREVUQUlMUyAtLT5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICB0aGVtZT1cImljb25cIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cIm5leHRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIiFjb25maWcuZXhwYW5kQWxsXCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImV4cGFuZC1hbGxcIlxuICAgICAgICAgICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJzb3J0LWRlc2NcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbmZpZy5leHBhbmRBbGxcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiY29sbGFwc2UtYWxsXCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPCEtLSBDSEVDS0JPWCAtLT5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3ggbWFzcy1hY3Rpb25cIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1hc3RlclwiXG4gICAgICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJwYWdlU2VsZWN0ZWQubGVuZ3RoID4gMCAmJiBwYWdlU2VsZWN0ZWQubGVuZ3RoIDwgcGFnZWREYXRhLmxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzZWxlY3RQYWdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LWFsbC1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBbdG9vbHRpcF09XCJtYXN0ZXIgPyBsYWJlbHMuZGVzZWxlY3RBbGwgOiBsYWJlbHMuc2VsZWN0QWxsT25QYWdlXCJcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBQb3NpdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgICA+PC9ub3ZvLWNoZWNrYm94PlxuICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8IS0tIFRBQkxFIEhFQURFUlMgLS0+XG4gICAgICAgICAgICAgIDx0aFxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICAgJ21hc3MtYWN0aW9uJzogY29uZmlnPy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IGNvbHVtbj8uYWN0aW9ucz8uaXRlbXM/Lmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgICBwcmV2aWV3OiBjb2x1bW4/Lm5hbWUgPT09ICdwcmV2aWV3J1xuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIFtub3ZvVGhPcmRlcmFibGVdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAob25PcmRlckNoYW5nZSk9XCJvbk9yZGVyQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiaXNDb2x1bW5IaWRkZW4oY29sdW1uKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGgtZ3JvdXBcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgIDwhLS0gTEFCRUwgJiBTT1JUIEFSUk9XUyAtLT5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0aC10aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImNvbmZpZy5zb3J0aW5nICE9PSBmYWxzZSAmJiBjb2x1bW4uc29ydGluZyAhPT0gZmFsc2UgPyAnc29ydGFibGUnIDogJydcIlxuICAgICAgICAgICAgICAgICAgICBbbm92b1RoU29ydGFibGVdPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAob25Tb3J0Q2hhbmdlKT1cIm9uU29ydENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnt7IGNvbHVtbi50aXRsZSB8fCBjb2x1bW4ubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0YWJsZS1zb3J0LWljb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cImxhYmVscy5zb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJjb2x1bW4uc29ydCB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuc29ydGluZyAhPT0gZmFsc2UgJiYgY29sdW1uLnNvcnRpbmcgIT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LXVwXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWFycm93LWRvd25cIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBEUk9QLURPV04gLS0+XG4gICAgICAgICAgICAgICAgICA8bm92by1kcm9wZG93blxuICAgICAgICAgICAgICAgICAgICBzaWRlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmZpbHRlcmluZyAhPT0gZmFsc2UgJiYgY29sdW1uLmZpbHRlcmluZyAhPT0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNvbHVtbi1maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKHRvZ2dsZWQpPVwib25Ecm9wZG93blRvZ2dsZWQoJGV2ZW50LCBjb2x1bW4ubmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi50YWJsZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbGFzcz1cInRhYmxlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uPVwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwXT1cImxhYmVscy5maWx0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZmlsdGVyZWRdPVwiY29sdW1uLmZpbHRlciB8fCBjb2x1bW4uZmlsdGVyID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImZvY3VzSW5wdXQoKVwiXG4gICAgICAgICAgICAgICAgICAgID48L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBPUFRJT05TIExJU1QgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb2x1bW4/Lm9wdGlvbnM/Lmxlbmd0aCB8fCBjb2x1bW4/Lm9yaWdpbmFsT3B0aW9ucz8ubGVuZ3RoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uPy50eXBlICE9PSAnZGF0ZScgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPVwiZGlhbG9ndWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJ0aW1lc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjb2x1bW4uZmlsdGVyIHx8IGNvbHVtbi5maWx0ZXIgPT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5jbGVhciB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiEhY29sdW1uLmFsbG93Q3VzdG9tVGV4dE9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImNvbHVtbi5uYW1lICsgJy1pbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbm92b1RhYmxlRmlsdGVyXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChvbkZpbHRlckNoYW5nZSk9XCJvbkZpbHRlcktleXdvcmRzKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImNvbHVtbi5mcmVldGV4dEZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBGaWx0ZXJGb2N1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29sdW1uLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRmlsdGVyQ2xpY2soY29sdW1uLCBvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJnZXRPcHRpb25EYXRhQXV0b21hdGlvbklkKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPiA8aSBjbGFzcz1cImJoaS1jaGVja1wiICpuZ0lmPVwiaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgU0VBUkNIIElOUFVUIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cCAqbmdJZj1cIiEoY29sdW1uPy5vcHRpb25zPy5sZW5ndGggfHwgY29sdW1uPy5vcmlnaW5hbE9wdGlvbnM/Lmxlbmd0aCkgJiYgdG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbi5uYW1lXVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImZpbHRlci1zZWFyY2hcIiBub3ZvSW5lcnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1idXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwidGltZXNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmNsZWFyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImNvbHVtbi5uYW1lICsgJy1pbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbm92b1RhYmxlRmlsdGVyXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChvbkZpbHRlckNoYW5nZSk9XCJvbkZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2VlcEZpbHRlckZvY3VzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgI2ZpbHRlcklucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgREFURSBPUFRJT05TIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRncm91cCAqbmdJZj1cImNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoICYmIGNvbHVtbj8udHlwZSA9PT0gJ2RhdGUnICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bm92by1vcHRpb24gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCIgKm5nSWY9XCIhY29sdW1uLmNhbGVuZGVyU2hvd1wiIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJuZWdhdGl2ZVwiIGljb249XCJ0aW1lc1wiIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIiAqbmdJZj1cImNvbHVtbi5maWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuY2xlYXIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG5vdm8tb3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBba2VlcE9wZW5dPVwib3B0aW9uLnJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uPy5sYWJlbCB8fCBvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1pY29uIG5vdm9TdWZmaXggY29sb3I9XCJwb3NpdGl2ZVwiICpuZ0lmPVwiaXNGaWx0ZXJBY3RpdmUoY29sdW1uLCBvcHRpb24pXCI+Y2hlY2s8L25vdm8taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L25vdm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLW9wdGlvbiBjbGFzcz1cImNhbGVuZGFyLWNvbnRhaW5lclwiICpuZ0lmPVwiY29sdW1uLmNhbGVuZGVyU2hvd1wiIGtlZXBPcGVuIG5vdm9JbmVydD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFjay1saW5rXCIgKGNsaWNrKT1cImNvbHVtbi5jYWxlbmRlclNob3cgPSBmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLXByZXZpb3VzXCI+PC9pPnt7IGxhYmVscy5iYWNrVG9QcmVzZXRGaWx0ZXJzIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1kYXRlLXBpY2tlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJvbkNhbGVuZGVyU2VsZWN0KGNvbHVtbiwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjb2x1bW4uZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9ub3ZvLWRhdGUtcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLXN0YWNrPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICAgICAgICAgICAgICAgIDwvbm92by1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8IS0tIFRBQkxFIERBVEEgLS0+XG4gICAgICAgICAgPHRib2R5ICpuZ0lmPVwiIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZWRpdGluZ1wiPlxuICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtc2VsZWN0aW9uLXJvd1wiXG4gICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnICYmIHNob3dTZWxlY3RBbGxNZXNzYWdlICYmIGNvbmZpZy5zZWxlY3RBbGxFbmFibGVkXCJcbiAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwidGFibGUtc2VsZWN0aW9uLXJvd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIHt7IGxhYmVscy5zZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQubGVuZ3RoKSB9fVxuICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJzZWxlY3RBbGwodHJ1ZSlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJhbGwtbWF0Y2hpbmctcmVjb3Jkc1wiPnt7IGxhYmVscy50b3RhbFJlY29yZHMoZGF0YVByb3ZpZGVyLnRvdGFsKSB9fTwvYT5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvdz1cIiRpbXBsaWNpdFwiIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJyb3dzXCI+XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIGNsYXNzPVwidGFibGUtcm93XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJyb3cuY3VzdG9tQ2xhc3MgfHwgJydcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJuYW1lICsgJy0nICsgcm93W3Jvd0lkZW50aWZpZXJdXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwicm93LmlkXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwicm93Q2xpY2tIYW5kbGVyKHJvdylcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwicm93LmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyb3ctYWN0aW9uc1wiICpuZ0lmPVwiY29uZmlnLmhhc0RldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkID0gIXJvdy5fZXhwYW5kZWRcIiAqbmdJZj1cIiFyb3cuX2V4cGFuZGVkXCI+PC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwic29ydC1kZXNjXCIgKGNsaWNrKT1cInJvdy5fZXhwYW5kZWQgPSAhcm93Ll9leHBhbmRlZFwiICpuZ0lmPVwicm93Ll9leHBhbmRlZFwiPjwvbm92by1idXR0b24+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJyb3ctYWN0aW9ucyBjaGVja2JveFwiICpuZ0lmPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnXCI+XG4gICAgICAgICAgICAgICAgICA8bm92by1jaGVja2JveFxuICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInJvdy5fc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJyb3dTZWxlY3RIYW5kbGVyKHJvdylcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWxlY3Qtcm93LWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgID48L25vdm8tY2hlY2tib3g+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgIFtjbGFzcy5ub3ZvLWZvcm0tcm93XT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwiaXNDb2x1bW5IaWRkZW4oY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tdGFibGUtY2VsbFxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInJvdy5fZWRpdGluZyAmJiAhcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICAgIFtoYXNFZGl0b3JdPVwiZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1dPVwiZ2V0Um93Q29udHJvbEZvcm0oaSlcIlxuICAgICAgICAgICAgICAgICAgPjwvbm92by10YWJsZS1jZWxsPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tY29udHJvbFxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInJvdy5fZWRpdGluZyAmJiByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdXCJcbiAgICAgICAgICAgICAgICAgICAgY29uZGVuc2VkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbnRyb2xdPVwicm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXVwiXG4gICAgICAgICAgICAgICAgICA+PC9ub3ZvLWNvbnRyb2w+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkZXRhaWxzLXJvd1wiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiXG4gICAgICAgICAgICAgICAgW2hpZGRlbl09XCIhcm93Ll9leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidkZXRhaWxzLXJvdy0nICsgcm93LmlkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zXCI+PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJjb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcgPyBjb2x1bW5zLmxlbmd0aCArIDEgOiBjb2x1bW5zLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tcm93LWRldGFpbHMgW2RhdGFdPVwicm93XCIgW3JlbmRlcmVyXT1cImNvbmZpZy5kZXRhaWxzUmVuZGVyZXJcIj48L25vdm8tcm93LWRldGFpbHM+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8IS0tIE5PIFRBQkxFIERBVEEgUExBQ0VIT0xERVIgLS0+XG4gICAgICAgICAgPHRib2R5XG4gICAgICAgICAgICBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIlxuICAgICAgICAgICAgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpICYmICFlZGl0aW5nXCJcbiAgICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LXRhYmxlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgI2VtcHR5bWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtZW1wdHktbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cImVtcHR5bWVzc2FnZS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMuZW1wdHlUYWJsZU1lc3NhZ2UgfX08L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwhLS0gTk8gTUFUQ0hJTkcgUkVDT1JEUyAtLT5cbiAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCIgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmIGRhdGFQcm92aWRlci5pc0ZpbHRlcmVkKClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS10YWJsZVwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNub21hdGNobWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtbm8tbWF0Y2hpbmctcmVjb3Jkcy1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm8tbWF0Y2hpbmctcmVjb3Jkc1wiICpuZ0lmPVwibm9tYXRjaG1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLXNlYXJjaC1xdWVzdGlvblwiPjwvaT4ge3sgbGFiZWxzLm5vTWF0Y2hpbmdSZWNvcmRzTWVzc2FnZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIEVSUk9SIFBMQUNFSE9MREVSIC0tPlxuICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIiAqbmdJZj1cImRhdGFQcm92aWRlci5oYXNFcnJvcnMoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLWVycm9yc1wiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNlcnJvcm1lc3NhZ2U+PG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RhYmxlLWVycm9yLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1lcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJlcnJvcm1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0PjxpIGNsYXNzPVwiYmhpLWNhdXRpb25cIj48L2k+IHt7IGxhYmVscy5lcnJvcmVkVGFibGVNZXNzYWdlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8dGZvb3QgKm5nSWY9XCIhY29uZmlnLmZvb3RlcnNcIiBbbmdDbGFzc109XCJkYXRhUHJvdmlkZXIubGVuZ3RoICUgMiA9PSAwID8gJ29kZCcgOiAnZXZlbidcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgPHRmb290ICpuZ0Zvcj1cImxldCBmb290ZXIgb2YgZm9vdGVyczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwibm92by10YWJsZS10b3RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCIoY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lKSArICctdG90YWwtJyArIGlcIj5cbiAgICAgICAgICAgICAgICB7eyBmb290ZXJbY29sdW1uLm5hbWVdIH19XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L25vdm8tZm9ybT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlRWxlbWVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBAVmlld0NoaWxkcmVuKCdmaWx0ZXJJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICBmaWx0ZXJJbnB1dHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBASW5wdXQoKVxuICBjb25maWc6IE5vdm9UYWJsZUNvbmZpZyA9IHt9O1xuICBASW5wdXQoKVxuICBjb2x1bW5zOiBBcnJheTxhbnk+ID0gW107XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNraXBTb3J0QW5kRmlsdGVyQ2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgbW9kZTogTm92b1RhYmxlTW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcbiAgQElucHV0KClcbiAgZWRpdGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgcm93SWRlbnRpZmllcjogc3RyaW5nID0gJ2lkJztcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nID0gJ3RhYmxlJztcblxuICBAT3V0cHV0KClcbiAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBvblRhYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZGF0YVByb3ZpZGVyOiBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+O1xuICBfcm93czogQXJyYXk8YW55PiA9IFtdO1xuICBzZWxlY3RlZDogQXJyYXk8YW55PiA9IFtdO1xuICBhY3RpdmVJZDogbnVtYmVyID0gMDtcbiAgbWFzdGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGV4cGFuZEFsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIGxhc3RQYWdlOiBudW1iZXIgPSAwO1xuICBzZWxlY3RlZFBhZ2VDb3VudDogbnVtYmVyID0gMDtcbiAgc2hvd1NlbGVjdEFsbE1lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY3VycmVudFNvcnRDb2x1bW46IGFueTtcbiAgcGFnZWREYXRhOiBBcnJheTxhbnk+ID0gW107XG4gIHBhZ2VTZWxlY3RlZDogYW55O1xuICAvLyBNYXAgdG8ga2VlcCB0cmFjayBvZiB3aGF0IGRyb3Bkb3ducyBhcmUgdG9nZ2xlZFxuICAvLyBVc2VkIHRvIHByb3Blcmx5ICpuZ0lmIHRoZSA8bm92by1vcHRncm91cD4gc28gdGhhdCB0aGUga2VlcEZpbHRlckZvY3VzZWQgRGlyZWN0aXZlXG4gIC8vIHdpbGwgcHJvcGVybHkgZmlyZSB0aGUgbmdBZnRlclZpZXdJbml0IGV2ZW50XG4gIHRvZ2dsZWREcm9wZG93bk1hcDogYW55ID0ge307XG4gIHB1YmxpYyBOb3ZvVGFibGVNb2RlID0gTm92b1RhYmxlTW9kZTtcbiAgcHVibGljIHRhYmxlRm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gIHB1YmxpYyB0b2FzdDogeyB0aGVtZTogc3RyaW5nOyBpY29uOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9O1xuICBwdWJsaWMgZm9vdGVycyA9IFtdO1xuICBwdWJsaWMgZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCByb3dzKHJvd3M6IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLmRhdGFQcm92aWRlciA9IHJvd3M7XG4gICAgaWYgKHJvd3MgJiYgcm93cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldHVwQ29sdW1uRGVmYXVsdHMoKTtcbiAgICB9XG4gICAgLy8gdGhpcyBpcyBhIHRlbXBvcmFyeS9oYWNreSBmaXggdW50aWwgYXN5bmMgZGF0YWxvYWRpbmcgaXMgaGFuZGxlZCB3aXRoaW4gdGhlIHRhYmxlXG4gICAgaWYgKCF0aGlzLnNraXBTb3J0QW5kRmlsdGVyQ2xlYXIpIHtcbiAgICAgIHRoaXMuY2xlYXJBbGxTb3J0QW5kRmlsdGVycygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRhdGFQcm92aWRlcihkcDogYW55KSB7XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyID0gQXJyYXkuaXNBcnJheShkcCkgPyBuZXcgUGFnZWRBcnJheUNvbGxlY3Rpb248YW55PihkcCkgOiBkcDtcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZGF0YUNoYW5nZS5waXBlKGRlYm91bmNlVGltZSgxMDApKS5zdWJzY3JpYmUoKGV2ZW50OiBDb2xsZWN0aW9uRXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICBjYXNlIENvbGxlY3Rpb25FdmVudC5DSEFOR0U6XG4gICAgICAgICAgdGhpcy5fcm93cyA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgLy8gU2V0dXAgZm9ybVxuICAgICAgICAgIHRoaXMudGFibGVGb3JtID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIHJvd3M6IHRoaXMuYnVpbGRlci5hcnJheShbXSksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VkRGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEZpbmQgdGhhdCBjb2x1bW5zIHdlIG1pZ2h0IG5lZWQgdG8gc3VtIHVwIHZpYSB0aGUgZm9vdGVyXG4gICAgICAgICAgbGV0IGNvbHVtbnNUb1N1bSA9IFtdO1xuICAgICAgICAgIGNvbnN0IGNvbHVtblN1bXMgPSB7fTtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuZm9vdGVycykge1xuICAgICAgICAgICAgdGhpcy5jb25maWcuZm9vdGVycy5mb3JFYWNoKChjb25maWcpID0+IHtcbiAgICAgICAgICAgICAgY29sdW1uc1RvU3VtLnB1c2goLi4uY29uZmlnLmNvbHVtbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBPbmx5IGhhdmUgdW5pcXVlIGNvbHVtbnMsIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICAgICAgY29sdW1uc1RvU3VtID0gY29sdW1uc1RvU3VtLmZpbHRlcigoaXRlbSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKGl0ZW0pID09PSBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1ha2UgYSBmb3JtIGZvciBlYWNoIHJvd1xuICAgICAgICAgIGNvbnN0IHRhYmxlRm9ybVJvd3MgPSB0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheTtcbiAgICAgICAgICB0aGlzLl9yb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XG4gICAgICAgICAgICByb3cuY29udHJvbHMgPSB7fTtcbiAgICAgICAgICAgIHJvdy5fZWRpdGluZyA9IHt9O1xuICAgICAgICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcbiAgICAgICAgICAgIHJvdy5yb3dJZCA9IHRoaXMuX3Jvd3MubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb2x1bW4uZWRpdG9yQ29uZmlnXG4gICAgICAgICAgICAgICAgPyBDb250cm9sRmFjdG9yeS5jcmVhdGUoY29sdW1uLmVkaXRvclR5cGUsIGNvbHVtbi5lZGl0b3JDb25maWcpXG4gICAgICAgICAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcbiAgICAgICAgICAgICAgcm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXSA9IGNvbnRyb2w7XG4gICAgICAgICAgICAgIHJvd0NvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMocm93Q29udHJvbHMsIHJvdywgZmFsc2UpO1xuICAgICAgICAgICAgdGFibGVGb3JtUm93cy5wdXNoKHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHJvd0NvbnRyb2xzKSk7XG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgdG90YWwgZm9vdGVyIGlmIGNvbmZpZ3VyZWRcbiAgICAgICAgICAgIC8vIEFycmF5IG9mIGtleXMgdG8gdG90YWxcbiAgICAgICAgICAgIGlmIChjb2x1bW5zVG9TdW0ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIGNvbHVtbnNUb1N1bS5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoSGVscGVycy5pc0JsYW5rKGNvbHVtblN1bXNbY29sdW1uXSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbHVtblN1bXNbY29sdW1uXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtblN1bXNbY29sdW1uXSArPSByb3dbY29sdW1uXTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTm92b1RhYmxlTW9kZS5FRElUKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRhYmxlRWRpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTZXR1cCB0aGUgZm9vdGVycyAoaWYgYW55KVxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmZvb3RlcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmZvb3RlcnMuZm9yRWFjaCgoZm9vdGVyQ29uZmlnLCBmb290ZXJDb25maWdJbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBmb290ZXIgPSB7fTtcbiAgICAgICAgICAgICAgZm9vdGVyW2Zvb3RlckNvbmZpZy5sYWJlbENvbHVtbl0gPSBmb290ZXJDb25maWcubGFiZWw7XG4gICAgICAgICAgICAgIGZvb3RlckNvbmZpZy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmb290ZXJDb25maWcubWV0aG9kID09PSAnQVZHJyAmJiB0aGlzLl9yb3dzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl0gLyB0aGlzLl9yb3dzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5mb290ZXJzLnB1c2goZm9vdGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50O1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gdGhpcy5jb25maWcucGFnaW5nLml0ZW1zUGVyUGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUGFnaW5nIHR1cm5lZCBvZmYsIHJldHVybiBiYXNpY2FsbHkgYWxsIG9mIHRoZSBkYXRhXG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IDE7XG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSA1MDA7XG4gICAgfVxuICAgIGlmIChkcCAmJiBkcC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNldHVwQ29sdW1uRGVmYXVsdHMoKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLnJlZnJlc2goKTtcbiAgfVxuICBnZXQgZGF0YVByb3ZpZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhUHJvdmlkZXI7XG4gIH1cblxuICBnZXQgZWRpdGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQ7XG4gIH1cblxuICBnZXQgZm9ybVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnRhYmxlRm9ybS5nZXRSYXdWYWx1ZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBmb3JtVXRpbHM6IEZvcm1VdGlscywgcHJpdmF0ZSBidWlsZGVyOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgbm90aWZ5KCdbRGVwcmVjYXRlZF06IFRoZSB0YWJsZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgbWlncmF0ZSB0byBub3ZvLWRhdGEtdGFibGVzIScpO1xuICB9XG5cbiAgb25Ecm9wZG93blRvZ2dsZWQoZXZlbnQsIGNvbHVtbik6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbl0gPSBldmVudDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGZvY3VzSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmlsdGVySW5wdXRzICYmIHRoaXMuZmlsdGVySW5wdXRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWx0ZXJJbnB1dHMuZm9yRWFjaCgoZmlsdGVySW5wdXQpID0+IHtcbiAgICAgICAgaWYgKGZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFnZUNoYW5nZShldmVudCkge1xuICAgIC8vIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2UgPSBldmVudC5wYWdlO1xuICAgIC8vIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gZXZlbnQuaXRlbXNQZXJQYWdlO1xuICB9XG5cbiAgZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNCbGFuayhvcHRpb24udmFsdWUpKSB7XG4gICAgICByZXR1cm4gb3B0aW9uLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgc2V0dXBDb2x1bW5EZWZhdWx0cygpIHtcbiAgICAvLyBDaGVjayBjb2x1bW5zIGZvciBjZWxsIG9wdGlvbiB0eXBlc1xuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnR5cGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgLy8gU2V0IG9wdGlvbnMgYmFzZWQgb24gZGF0ZXMgaWYgdGhlcmUgYXJlIG5vbmVcbiAgICAgICAgICAgIGNvbHVtbi5vcHRpb25zID0gY29sdW1uLm9wdGlvbnMgfHwgdGhpcy5nZXREZWZhdWx0T3B0aW9ucyhjb2x1bW4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZyAmJiB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCAhPT0gdGhpcy5sYXN0UGFnZSkge1xuICAgICAgdGhpcy5yb3dTZWxlY3RIYW5kbGVyKCk7XG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMubGFzdFBhZ2UgPSB0aGlzLmNvbmZpZy5wYWdpbmcgPyB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA6IDE7XG4gIH1cblxuICBnZXRQYWdlU3RhcnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnaW5nID8gKHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2UgLSAxKSAqIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplIDogMDtcbiAgfVxuXG4gIGdldFBhZ2VFbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplID4gLTEgPyB0aGlzLmdldFBhZ2VTdGFydCgpICsgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiB0aGlzLnJvd3MubGVuZ3RoO1xuICB9XG5cbiAgZ2V0Um93Q29udHJvbEZvcm0oaSk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgY29uc3QgdGFibGVGb3JtUm93cyA9IHRoaXMudGFibGVGb3JtLmNvbnRyb2xzLnJvd3MgYXMgRm9ybUFycmF5O1xuICAgIHJldHVybiB0YWJsZUZvcm1Sb3dzLmNvbnRyb2xzW2ldO1xuICB9XG5cbiAgb25GaWx0ZXJDbGljayhjb2x1bW4sIGZpbHRlcikge1xuICAgIGlmIChmaWx0ZXIucmFuZ2UgJiYgIWNvbHVtbi5jYWxlbmRhclNob3cpIHtcbiAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSAmJiBjb2x1bW4ubXVsdGlwbGUpIHtcbiAgICAgIGlmICh+Y29sdW1uLmZpbHRlci5pbmRleE9mKGZpbHRlcikpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGZpbHRlclxuICAgICAgICBjb2x1bW4uZmlsdGVyLnNwbGljZShjb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSwgMSk7XG4gICAgICAgIGlmIChmaWx0ZXIucmFuZ2UpIHtcbiAgICAgICAgICBjb2x1bW4uY2FsZW5kZXJTaG93ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sdW1uLmZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWRkIGZpbHRlclxuICAgICAgICBjb2x1bW4uZmlsdGVyLnB1c2goZmlsdGVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbHVtbi5tdWx0aXBsZSkge1xuICAgICAgY29sdW1uLmZpbHRlciA9IG5ldyBBcnJheSgpO1xuICAgICAgY29sdW1uLmZpbHRlci5wdXNoKEhlbHBlcnMuaXNCbGFuayhmaWx0ZXIudmFsdWUpID8gZmlsdGVyIDogZmlsdGVyLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uLmZpbHRlciA9IEhlbHBlcnMuaXNCbGFuayhmaWx0ZXIudmFsdWUpID8gZmlsdGVyIDogZmlsdGVyLnZhbHVlO1xuICAgIH1cbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gIH1cblxuICBvbkZpbHRlckNsZWFyKGNvbHVtbjogYW55KTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcbiAgICAgIGNvbHVtbi5mcmVldGV4dEZpbHRlciA9IG51bGw7XG4gICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XG4gICAgICBpZiAoY29sdW1uLm9yaWdpbmFsT3B0aW9ucykge1xuICAgICAgICBjb2x1bW4ub3B0aW9ucyA9IGNvbHVtbi5vcmlnaW5hbE9wdGlvbnM7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjbGVhckFsbFNvcnRBbmRGaWx0ZXJzKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5maWx0ZXJpbmcpIHtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgY29sdW1uLmZpbHRlciA9IG51bGw7XG4gICAgICAgIGNvbHVtbi5zb3J0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgdXBkYXRlcyB0aGUgcm93IGRhdGEgdG8gcmVmbGVjdCB0aGUgYWN0aXZlIGZpbHRlcnMuXG4gICAqL1xuICBvbkZpbHRlckNoYW5nZShldmVudD86IEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xuICAgICAgLy8gQXJyYXkgb2YgZmlsdGVyc1xuICAgICAgY29uc3QgZmlsdGVycyA9IHRoaXMuY29sdW1ucy5maWx0ZXIoKGNvbCkgPT4gIUhlbHBlcnMuaXNFbXB0eShjb2wuZmlsdGVyKSk7XG4gICAgICBpZiAoZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGZpbHRlcnMpIHtcbiAgICAgICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5tYXRjaCkpIHtcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9ICh2YWx1ZSwgcmVjb3JkKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2x1bW4ubWF0Y2gocmVjb3JkLCBjb2x1bW4uZmlsdGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4ucHJlRmlsdGVyICYmIEhlbHBlcnMuaXNGdW5jdGlvbihjb2x1bW4ucHJlRmlsdGVyKSkge1xuICAgICAgICAgICAgcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwgY29sdW1uLnByZUZpbHRlcih0aGlzLmVzY2FwZUNoYXJhY3RlcnMoY29sdW1uLmZpbHRlcikpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikpIHtcbiAgICAgICAgICAgIC8vIFRoZSBmaWx0ZXJzIGFyZSBhbiBhcnJheSAobXVsdGktc2VsZWN0KSwgY2hlY2sgdmFsdWVcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0gY29sdW1uLmZpbHRlcjtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYW4gYXJyYXkgb2Yge3ZhbHVlOiAnJywgbGFiZWxzOiAnJ31cbiAgICAgICAgICAgIGlmIChvcHRpb25zWzBdLnZhbHVlIHx8IG9wdGlvbnNbMF0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgb3B0aW9ucyA9IGNvbHVtbi5maWx0ZXIubWFwKChvcHQpID0+IG9wdC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7IGFueTogb3B0aW9ucyB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLnR5cGUgJiYgY29sdW1uLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXIuc3RhcnREYXRlICYmIGNvbHVtbi5maWx0ZXIuZW5kRGF0ZSkge1xuICAgICAgICAgICAgICBxdWVyeVtjb2x1bW4ubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgbWluOiBkYXRlRm5zLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5zdGFydERhdGUpLFxuICAgICAgICAgICAgICAgIG1heDogZGF0ZUZucy5zdGFydE9mRGF5KGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5lbmREYXRlKSwgMSkpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIG1pbjogY29sdW1uLmZpbHRlci5taW4gPyBkYXRlRm5zLmFkZERheXMoZGF0ZUZucy5zdGFydE9mVG9kYXkoKSwgY29sdW1uLmZpbHRlci5taW4pIDogZGF0ZUZucy5zdGFydE9mVG9kYXkoKSxcbiAgICAgICAgICAgICAgICBtYXg6IGNvbHVtbi5maWx0ZXIubWF4ID8gZGF0ZUZucy5hZGREYXlzKGRhdGVGbnMuc3RhcnRPZlRvbW9ycm93KCksIGNvbHVtbi5maWx0ZXIubWF4KSA6IGRhdGVGbnMuc3RhcnRPZlRvbW9ycm93KCksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IGNvbHVtbi5maWx0ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZmlsdGVyaW5nKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmZpbHRlcmluZyhxdWVyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmZpbHRlciA9IHF1ZXJ5O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0ge307XG4gICAgICB9XG4gICAgICAvLyBUcmlja2xlIGRvd24gdG8ga2VlcCBzb3J0XG4gICAgICAvLyB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcbiAgICAgIHRoaXMuZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKTtcblxuICAgICAgLy8gSWYgcGFnaW5nLCByZXNldCBwYWdlXG4gICAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50ID0gMTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBhbGwgc2VsZWN0aW9uIG9uIHNvcnQgY2hhbmdlIGlmIHNlbGVjdGlvbiBpcyBvblxuICAgICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlc2NhcGVDaGFyYWN0ZXJzKGZpbHRlcikge1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZpbHRlci5yZXBsYWNlKC8nL2csIFwiJydcIik7XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgIC8vIFRPRE86IFRoaXMgbmVlZHMgdG8gYmUgcmVmYWN0b3JlZFxuICAgIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChjb2x1bW4gJiYgIUhlbHBlcnMuaXNCbGFuayhjb2x1bW4uZmlsdGVyKSAmJiAhSGVscGVycy5pc0JsYW5rKGZpbHRlcikpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbi5maWx0ZXIpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlci5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5sYWJlbCA9PT0gZmlsdGVyLmxhYmVsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzQWN0aXZlID0gY29sdW1uLmZpbHRlci5pbmNsdWRlcyhmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGNvbHVtbi5maWx0ZXIgPT09IHR5cGVvZiBmaWx0ZXIpIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNBY3RpdmU7XG4gIH1cblxuICBvblNvcnRDaGFuZ2UoY29sdW1uKSB7XG4gICAgdGhpcy5jdXJyZW50U29ydENvbHVtbiA9IGNvbHVtbjtcbiAgICBjb25zdCBzb3J0ZWRDb2x1bW5zOiBhbnkgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKCh0aGlzQ29sdW1uKSA9PiB7XG4gICAgICByZXR1cm4gdGhpc0NvbHVtbi5zb3J0ICYmIHRoaXNDb2x1bW4gIT09IHRoaXMuY3VycmVudFNvcnRDb2x1bW47XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBzb3J0ZWRDb2x1bW4gb2Ygc29ydGVkQ29sdW1ucykge1xuICAgICAgc29ydGVkQ29sdW1uLnNvcnQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb2x1bW4pIHtcbiAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuc29ydGluZykpIHtcbiAgICAgICAgdGhpcy5jb25maWcuc29ydGluZygpO1xuICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLnByZVNvcnQpKSB7XG4gICAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5zb3J0ID0gW10uY29uY2F0KGNvbHVtbi5wcmVTb3J0KGNvbHVtbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbeyBmaWVsZDogY29sdW1uLmNvbXBhcmUgfHwgY29sdW1uLm5hbWUsIHJldmVyc2U6IGNvbHVtbi5zb3J0ID09PSAnZGVzYycgfV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlyZSB0YWJsZSBjaGFuZ2UgZXZlbnRcbiAgICAvLyB0aGlzLmZpcmVUYWJsZUNoYW5nZUV2ZW50KCk7XG5cbiAgICAvLyBJZiBwYWdpbmcsIHJlc2V0IHBhZ2VcbiAgICBpZiAodGhpcy5jb25maWcucGFnaW5nKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IDE7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXG4gICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKSB7XG4gICAgLy8gQ29uc3RydWN0IGEgdGFibGUgY2hhbmdlIG9iamVjdFxuICAgIGNvbnN0IG9uVGFibGVDaGFuZ2U6IGFueSA9IHt9O1xuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKChjb2wpID0+IGNvbC5maWx0ZXIgJiYgY29sLmZpbHRlci5sZW5ndGgpO1xuICAgIG9uVGFibGVDaGFuZ2UuZmlsdGVyID0gZmlsdGVycy5sZW5ndGggPyBmaWx0ZXJzIDogZmFsc2U7XG4gICAgb25UYWJsZUNoYW5nZS5zb3J0ID0gdGhpcy5jdXJyZW50U29ydENvbHVtbiA/IHRoaXMuY3VycmVudFNvcnRDb2x1bW4gOiBmYWxzZTtcbiAgICBvblRhYmxlQ2hhbmdlLnJvd3MgPSB0aGlzLnJvd3M7XG5cbiAgICAvLyBFbWl0IGV2ZW50XG4gICAgdGhpcy5vblRhYmxlQ2hhbmdlLmVtaXQob25UYWJsZUNoYW5nZSk7XG4gIH1cblxuICBmaW5kQ29sdW1uSW5kZXgodmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMuY29sdW1uc1tpXS5uYW1lID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBvbk9yZGVyQ2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3Qgb2xkSW5kZXggPSB0aGlzLmZpbmRDb2x1bW5JbmRleChldmVudC5maXJzdC5uYW1lKTtcbiAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LnNlY29uZC5uYW1lKTtcbiAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLmNvbHVtbnMuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgdGhpcy5vblNvcnRDaGFuZ2UodGhpcy5jdXJyZW50U29ydENvbHVtbik7XG4gIH1cblxuICBleHBhbmRBbGxPblBhZ2UoZXhwYW5kZWQpIHtcbiAgICB0aGlzLmNvbmZpZy5leHBhbmRBbGwgPSAhZXhwYW5kZWQ7XG4gICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5kYXRhUHJvdmlkZXIubGlzdCkge1xuICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RQYWdlKGRhdGE/OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMubWFzdGVyKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbChmYWxzZSk7XG4gICAgICAvLyBPbmx5IHNob3cgdGhlIHNlbGVjdCBhbGwgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIG5ldyBwYWdlIHNlbGVjdGVkIGF0IGEgdGltZVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIC8vIHRoaXMucGFnZWREYXRhID0gdGhpcy5yb3dzLnNsaWNlKHRoaXMuZ2V0UGFnZVN0YXJ0KCksIHRoaXMuZ2V0UGFnZUVuZCgpKTtcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMucGFnZWREYXRhKSB7XG4gICAgICAgIHJvdy5fc2VsZWN0ZWQgPSB0aGlzLm1hc3RlcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGFQcm92aWRlci5saXN0LmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcbiAgICAgIHRoaXMuZW1pdFNlbGVjdGVkKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgLy8gT25seSBzaG93IHRoZSBzZWxlY3QgYWxsIG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBuZXcgcGFnZSBzZWxlY3RlZCBhdCBhIHRpbWVcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQrKztcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID09PSAxICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoICE9PSB0aGlzLmRhdGFQcm92aWRlci50b3RhbDtcbiAgICB9XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2VsZWN0QWxsKHZhbHVlKSB7XG4gICAgdGhpcy5tYXN0ZXIgPSB2YWx1ZTtcbiAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XG4gICAgICByb3cuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZSA/IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QgOiBbXTtcbiAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xuICAgIHRoaXMucm93U2VsZWN0SGFuZGxlcigpO1xuICB9XG5cbiAgcm93U2VsZWN0SGFuZGxlcihkYXRhPzogYW55KSB7XG4gICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xuICAgIHRoaXMucGFnZVNlbGVjdGVkID0gdGhpcy5wYWdlZERhdGEuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XG4gICAgaWYgKHRoaXMucGFnZVNlbGVjdGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5tYXN0ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlU2VsZWN0ZWQubGVuZ3RoID09PSB0aGlzLnBhZ2VkRGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFzdGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hc3RlciA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gQnJlYWtpbmcgdGhlIHNlbGVjdGVkIHBhZ2UgY291bnRcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcbiAgICB9XG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XG4gIH1cblxuICBlbWl0U2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBsZW5ndGg6IHNlbGVjdGVkLmxlbmd0aCwgc2VsZWN0ZWQgfSk7XG4gIH1cblxuICByb3dDbGlja0hhbmRsZXIocm93KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnJvd1NlbGVjdCkge1xuICAgICAgdGhpcy5hY3RpdmVJZCA9IHJvdy5pZCB8fCAwO1xuICAgICAgdGhpcy5vblJvd0NsaWNrLmVtaXQocm93KTtcbiAgICB9XG4gIH1cblxuICBnZXREZWZhdWx0T3B0aW9ucyhjb2x1bW4pIHtcbiAgICAvLyBUT0RPIC0gbmVlZHMgdG8gY29tZSBmcm9tIGxhYmVsIHNlcnZpY2UgLSBodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9pc3N1ZXMvMTE2XG4gICAgY29uc3Qgb3B0czogYW55W10gPSBbXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MURheSwgbWluOiAtMSwgbWF4OiAwIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0N0RheXMsIG1pbjogLTcsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDMwRGF5cywgbWluOiAtMzAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDkwRGF5cywgbWluOiAtOTAsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFZZWFyLCBtaW46IC0zNjYsIG1heDogMCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFEYXksIG1pbjogMCwgbWF4OiAxIH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0N0RheXMsIG1pbjogMCwgbWF4OiA3IH0sXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MzBEYXlzLCBtaW46IDAsIG1heDogMzAgfSxcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQ5MERheXMsIG1pbjogMCwgbWF4OiA5MCB9LFxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDFZZWFyLCBtaW46IDAsIG1heDogMzY2IH0sXG4gICAgXTtcblxuICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnJhbmdlKSB7XG4gICAgICBvcHRzLnB1c2goe1xuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbHMuY3VzdG9tRGF0ZVJhbmdlLFxuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbiAgfVxuXG4gIG9uQ2FsZW5kZXJTZWxlY3QoY29sdW1uLCBldmVudCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnN0YXJ0RGF0ZSAmJiBldmVudC5lbmREYXRlKSB7XG4gICAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9LCAxMCk7XG4gIH1cblxuICBvbkZpbHRlcktleXdvcmRzKGNvbmZpZykge1xuICAgIGlmIChjb25maWcgJiYgY29uZmlnLmZpbHRlcmluZyAmJiBjb25maWcuZmlsdGVyaW5nLmZyZWV0ZXh0RmlsdGVyKSB7XG4gICAgICBjb25zdCBmaWx0ZXJLZXl3b3JkcyA9IGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMpIHtcbiAgICAgICAgY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9wdGlvbnM7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gb3B0aW9uICYmIG9wdGlvbi5sYWJlbCA/IG9wdGlvbi5sYWJlbCA6IG9wdGlvbjtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IGZpbHRlcktleXdvcmRzKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAofnZhbHVlLmluZGV4T2YoZmlsdGVyS2V5d29yZHMpIHx8IH52YWx1ZS5pbmRleE9mKGZpbHRlcktleXdvcmRzKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5vcHRpb25zID0gbmV3T3B0aW9ucztcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcuZmlsdGVyID0gY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmZpbHRlcmluZy5vcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcmlnaW5hbE9wdGlvbnM7XG4gICAgfVxuICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgVGFibGUgaW50byBFRElUIG1vZGUsIGJhc2VkIG9uIHRoZSByb3cvY29sdW1uIHBhc3NlZCB5b3UgY2FuIGVudGVyIGluIGEgZmV3IHN0YXRlc1xuICAgKiAoMSkgc2V0VGFibGVFZGl0KCkgLSBkb24ndCBwYXNzIGFueSB0byBwdXQgdGhlIEZVTEwgdGFibGUgaW50byBlZGl0IG1vZGVcbiAgICogKDIpIHNldFRhYmxlRWRpdCgxKSAtIHBhc3Mgb25seSByb3cgdG8gcHV0IHRoYXQgRlVMTCByb3cgb2YgdGhlIHRhYmxlIGludG8gZWRpdCBtb2RlXG4gICAqICgzKSBzZXRUYWJsZUVkaXQoMSwgMSkgLSBwYXNzIHJvdyBhbmQgY29sdW1uIHRvIHB1dCB0aGF0IGNvbHVtbiBvZiB0aGUgcm93IG9mIHRoZSB0YWJsZSBpbnRvIGVkaXQgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgc2V0VGFibGVFZGl0KHJvd051bWJlcj86IG51bWJlciwgY29sdW1uTnVtYmVyPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlID0gTm92b1RhYmxlTW9kZS5FRElUO1xuICAgIHRoaXMuX2RhdGFQcm92aWRlci5lZGl0KCk7XG4gICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XG4gICAgICByb3cuX2VkaXRpbmcgPSByb3cuX2VkaXRpbmcgfHwge307XG4gICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICBpZiAoY29sdW1uLnZpZXdPbmx5KSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKEhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIEhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpKSB7XG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoIUhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJiBIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSkge1xuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJlxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSAmJlxuICAgICAgICAgIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJlxuICAgICAgICAgIGNvbHVtbkluZGV4ID09PSBOdW1iZXIoY29sdW1uTnVtYmVyKVxuICAgICAgICApIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBMZWF2ZXMgZWRpdCBtb2RlIGZvciB0aGUgVGFibGUgYW5kIHB1dHMgZXZlcnl0aGluZyBiYWNrIHRvIFZJRVcgb25seVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKiBAcGFyYW0gY2FuY2VsIC0gd2hldGhlciBvciBub3QgdG8gc2F2ZSBkYXRhIG9yIHVuZG9cbiAgICovXG4gIHByaXZhdGUgbGVhdmVFZGl0TW9kZShjYW5jZWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm1vZGUgPSBOb3ZvVGFibGVNb2RlLlZJRVc7XG4gICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIHJvdy5fZWRpdGluZyA9IHJvdy5fZWRpdGluZyB8fCB7fTtcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKGNhbmNlbCkge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnVuZG8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmNvbW1pdCgpO1xuICAgIH1cbiAgICB0aGlzLmhpZGVUb2FzdE1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIG5ldyByb3cgaW50byB0aGUgdGFibGUgdG8gYmUgZWRpdGVkLCBjYW4gYmUgY2FsbGVkIGZyb20gYSBsb2NhbCByZWZlcmVuY2Ugb2YgdGhlIHRhYmxlIGluIHlvdXIgdGVtcGxhdGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGFkZEVkaXRhYmxlUm93KGRlZmF1bHRWYWx1ZTogYW55ID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cyBhcyBGb3JtQXJyYXk7XG4gICAgY29uc3Qgcm93OiBhbnkgPSB7fTtcbiAgICBjb25zdCByb3dDb250cm9scyA9IFtdO1xuICAgIHJvdy5jb250cm9scyA9IHt9O1xuICAgIHJvdy5fZWRpdGluZyA9IHt9O1xuICAgIHJvdy5yb3dJZCA9IHRoaXMuX3Jvd3MubGVuZ3RoICsgMTtcbiAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXG4gICAgICBjb25zdCBjb250cm9sID0gY29sdW1uLmVkaXRvckNvbmZpZ1xuICAgICAgICA/IENvbnRyb2xGYWN0b3J5LmNyZWF0ZShjb2x1bW4uZWRpdG9yVHlwZSwgY29sdW1uLmVkaXRvckNvbmZpZylcbiAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcbiAgICAgIGNvbnRyb2wudmFsdWUgPSBudWxsOyAvLyByZW1vdmUgY29waWVkIGNvbHVtbiB2YWx1ZVxuICAgICAgcm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXSA9IGNvbnRyb2w7XG4gICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gIWNvbHVtbi52aWV3T25seTtcbiAgICAgIHJvd0NvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gICAgfSk7XG4gICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgZGVmYXVsdFZhbHVlLCBmYWxzZSk7XG4gICAgdGFibGVGb3JtUm93cy5wdXNoKHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKHJvd0NvbnRyb2xzKSk7XG4gICAgdGhpcy5fcm93cy5wdXNoKHJvdyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIFZhbGlkYXRlcyB0aGUgRm9ybSBpbnNpZGUgb2YgdGhlIFRhYmxlLCBpZiB0aGVyZSBhcmUgZXJyb3JzIGl0IHdpbGwgZGlzcGxheS9yZXR1cm4gdGhlIGVycm9ycyBmb3IgZWFjaCByb3cuXG4gICAqIElmIHRoZXJlIGFyZSBubyBlcnJvcnMsIHRoZW4gaXQgd2lsbCByZXR1cm4gT05MWSB0aGUgY2hhbmdlZCBkYXRhIGZvciBlYWNoIHJvdywgdGhlIGRhdGEgcmV0dXJuZWQgd2lsbCBiZSBpbiB0aGUgZm9ybTpcbiAgICogeyBpZDogSURfT0ZfUkVDT1JELCBrZXk6IHZhbHVlIH0gLS0gZGF0YSB0aGF0IHdhcyB1cGRhdGVkXG4gICAqIHsgaWQ6IHVuZGVmaW5lZCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgYWRkZWRcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHZhbGlkYXRlQW5kR2V0VXBkYXRlZERhdGEoKTogeyBjaGFuZ2VkPzogYW55W107IGVycm9ycz86IHsgZXJyb3JzOiBhbnk7IHJvdzogYW55OyBpbmRleDogbnVtYmVyIH1bXSB9IHtcbiAgICBpZiAodGhpcy50YWJsZUZvcm0gJiYgdGhpcy50YWJsZUZvcm0uY29udHJvbHMgJiYgdGhpcy50YWJsZUZvcm0uY29udHJvbHMucm93cykge1xuICAgICAgY29uc3QgY2hhbmdlZFJvd3MgPSBbXTtcbiAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgLy8gR28gb3ZlciB0aGUgRm9ybUFycmF5J3MgY29udHJvbHNcbiAgICAgICh0aGlzLnRhYmxlRm9ybS5jb250cm9scy5yb3dzIGFzIEZvcm1BcnJheSkuY29udHJvbHMuZm9yRWFjaCgoZm9ybUdyb3VwOiBGb3JtR3JvdXAsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgbGV0IGNoYW5nZWRSb3cgPSBudWxsO1xuICAgICAgICBsZXQgZXJyb3IgPSBudWxsO1xuICAgICAgICAvLyBHbyBvdmVyIHRoZSBmb3JtIGdyb3VwIGNvbnRyb2xzXG4gICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwLmNvbnRyb2xzW2tleV07XG4gICAgICAgICAgLy8gSGFuZGxlIHZhbHVlIGNoYW5naW5nXG4gICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5kaXJ0eSAmJiAhY29udHJvbC5lcnJvcnMpIHtcbiAgICAgICAgICAgIGlmICghY2hhbmdlZFJvdykge1xuICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIElELCBzbyB3ZSBoYXZlIHNvbWUga2V5IHRvIHNhdmUgYWdhaW5zdFxuICAgICAgICAgICAgICBjaGFuZ2VkUm93ID0ge307XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9yb3dzW2luZGV4XS5pZCkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRSb3cuaWQgPSB0aGlzLl9yb3dzW2luZGV4XS5pZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgZGlydHksIGdyYWIgdmFsdWUgb2ZmIHRoZSBmb3JtXG4gICAgICAgICAgICBjaGFuZ2VkUm93W2tleV0gPSB0aGlzLnRhYmxlRm9ybS5nZXRSYXdWYWx1ZSgpLnJvd3NbaW5kZXhdW2tleV07XG4gICAgICAgICAgICAvLyBTZXQgdmFsdWUgYmFjayB0byByb3cgKHNob3VsZCBiZSBhbHJlYWR5IGRvbmUgdmlhIHRoZSBzZXJ2ZXIgY2FsbCwgYnV0IGRvIGl0IGFueXdheSlcbiAgICAgICAgICAgIHRoaXMuX3Jvd3NbaW5kZXhdW2tleV0gPSBjaGFuZ2VkUm93W2tleV07XG4gICAgICAgICAgfSBlbHNlIGlmIChjb250cm9sICYmIGNvbnRyb2wuZXJyb3JzKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JzXG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIGVycm9yID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvcltrZXldID0gY29udHJvbC5lcnJvcnM7XG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hhbmdlZFJvdykge1xuICAgICAgICAgIGNoYW5nZWRSb3dzLnB1c2goY2hhbmdlZFJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goeyBlcnJvcnM6IGVycm9yLCByb3c6IHRoaXMuX3Jvd3NbaW5kZXhdLCBpbmRleCB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBSZXR1cm4gZXJyb3JzIGlmIGFueSwgb3RoZXJ3aXNlIHJldHVybiB0aGUgY2hhbmdlZCByb3dzXG4gICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4geyBjaGFuZ2VkOiBjaGFuZ2VkUm93cyB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZXJyb3JzIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIGNhbmNlbEVkaXRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZUVkaXRNb2RlKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcbiAgICovXG4gIHNhdmVDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmVFZGl0TW9kZShmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIERpc3BsYXlzIGEgdG9hc3QgbWVzc2FnZSBpbnNpZGUgb2YgdGhlIHRhYmxlXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XG4gICAqL1xuICBkaXNwbGF5VG9hc3RNZXNzYWdlKHRvYXN0OiB7IGljb246IHN0cmluZzsgdGhlbWU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH0sIGhpZGVEZWxheT86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMudG9hc3QgPSB0b2FzdDtcbiAgICBpZiAoaGlkZURlbGF5KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpLCBoaWRlRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gRm9yY2UgaGlkZSB0aGUgdG9hc3QgbWVzc2FnZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgaGlkZVRvYXN0TWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0ID0gbnVsbDtcbiAgICAvLyBIYWNrIHRvIG1ha2UgdGhlIHRhYmxlIGRpc3BsYXkgcHJvcGVybHkgYWZ0ZXIgaGlkaW5nIHRoZSB0b2FzdFxuICAgIHRoaXMuZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdCA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gZGlzcGxheSB0aGUgbG9hZGluZyBvdmVybGF5IG9uIHRoZSB0YWJsZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgdG9nZ2xlTG9hZGluZyhzaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nID0gc2hvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gaGlkZSBhIGNvbHVtbiBpbiBlZGl0IG9yIHZpZXcgbW9kZVxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxuICAgKi9cbiAgaXNDb2x1bW5IaWRkZW4oY29sdW1uOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0aW5nID8gISFjb2x1bW4uaGlkZUNvbHVtbk9uRWRpdCA6ICEhY29sdW1uLmhpZGVDb2x1bW5PblZpZXc7XG4gIH1cbn1cbiJdfQ==