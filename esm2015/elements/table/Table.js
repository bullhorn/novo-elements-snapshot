// NG2
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
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
// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
export var NovoTableMode;
(function (NovoTableMode) {
    NovoTableMode[NovoTableMode["VIEW"] = 1] = "VIEW";
    NovoTableMode[NovoTableMode["EDIT"] = 2] = "EDIT";
})(NovoTableMode || (NovoTableMode = {}));
export class NovoTableElement {
    constructor(labels, formUtils, builder) {
        this.labels = labels;
        this.formUtils = formUtils;
        this.builder = builder;
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
        // Used to properly *ngIf the <list> so that the keepFilterFocused Directive
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
                    const tableFormRows = this.tableForm.controls['rows'];
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
        return this.tableForm.value;
    }
    onDropdownToggled(event, column) {
        this.toggledDropdownMap[column] = event;
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
        const tableFormRows = this.tableForm.controls['rows'];
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
            return filter.replace(/'/g, '\'\'');
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
        const tableFormRows = this.tableForm.controls['rows'];
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
        if (this.tableForm && this.tableForm.controls && this.tableForm.controls['rows']) {
            const changedRows = [];
            const errors = [];
            // Go over the FormArray's controls
            this.tableForm.controls['rows'].controls.forEach((formGroup, index) => {
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
                        changedRow[key] = this.tableForm.value['rows'][index][key];
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
NovoTableElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-table',
                host: {
                    '[attr.theme]': 'theme',
                    '[class.editing]': 'mode === NovoTableMode.EDIT',
                    '[class.novo-table-loading]': 'loading',
                },
                // directives: [],
                template: `
        <header *ngIf="columns.length">
            <ng-content select="novo-table-header"></ng-content>
            <div class="header-actions">
                <novo-pagination *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
                                 [rowOptions]="config.paging.rowOptions"
                                 [disablePageSelection]="config.paging.disablePageSelection"
                                 [(page)]="dataProvider.page"
                                 [(itemsPerPage)]="dataProvider.pageSize"
                                 [totalItems]="dataProvider.total"
                                 (onPageChange)="onPageChange($event)">
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
                            <button theme="icon" icon="next" (click)="expandAllOnPage(config.expandAll)" *ngIf="!config.expandAll" data-automation-id="expand-all"></button>
                            <button theme="icon" icon="sort-desc" (click)="expandAllOnPage(config.expandAll)" *ngIf="config.expandAll" data-automation-id="collapse-all"></button>
                        </th>
                        <!-- CHECKBOX -->
                        <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                            <novo-checkbox [(ngModel)]="master" [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length" (ngModelChange)="selectPage($event)" data-automation-id="select-all-checkbox" [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage" tooltipPosition="right"></novo-checkbox>
                        </th>
                        <!-- TABLE HEADERS -->
                        <th *ngFor="let column of columns" [ngClass]="{ 'mass-action': config?.rowSelectionStyle === 'checkbox', 'actions': column?.actions?.items?.length > 0, 'preview': column?.name === 'preview' }" [novoThOrderable]="column" (onOrderChange)="onOrderChange($event)" [hidden]="isColumnHidden(column)">
                            <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                                <!-- LABEL & SORT ARROWS -->
                                <div class="th-title" [ngClass]="(config.sorting !== false && column.sorting !== false) ? 'sortable' : ''" [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)">
                                    <label>{{ column.title || column.label }}</label>
                                    <div class="table-sort-icons" tooltipPosition="bottom" [tooltip]="labels.sort" [ngClass]="column.sort || ''" *ngIf="config.sorting !== false && column.sorting !== false">
                                        <i class="bhi-arrow-up"></i>
                                        <i class="bhi-arrow-down"></i>
                                    </div>
                                </div>
                                <!-- FILTER DROP-DOWN -->
                                <novo-dropdown side="right" *ngIf="config.filtering !== false && column.filtering !== false" class="column-filters" (toggled)="onDropdownToggled($event, column.name)" parentScrollSelector=".table-container" containerClass="table-dropdown">
                                    <button type="button" theme="icon" icon="filter" tooltipPosition="bottom" [tooltip]="labels.filters" [class.filtered]="column.filter || column.filter===false" (click)="focusInput()"></button>
                                    <!-- FILTER OPTIONS LIST -->
                                    <list *ngIf="(column?.options?.length || column?.originalOptions?.length) && column?.type !== 'date' && toggledDropdownMap[column.name]">
                                        <item class="filter-search">
                                            <div class="header">
                                                <span>{{ labels.filters }}</span>
                                                <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter || column.filter===false">{{ labels.clear }}</button>
                                            </div>
                                            <input type="text" *ngIf="!!column.allowCustomTextOption" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterKeywords($event)" [(ngModel)]="column.freetextFilter" keepFilterFocused #filterInput/>
                                        </item>
                                        <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [attr.data-automation-id]="getOptionDataAutomationId(option)">
                                            <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                        </item>
                                    </list>
                                    <!-- FILTER SEARCH INPUT -->
                                    <list *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                                        <item class="filter-search">
                                            <div class="header">
                                                <span>{{ labels.filters }}</span>
                                                <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                            </div>
                                            <input type="text" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterChange($event)" [(ngModel)]="column.filter" keepFilterFocused #filterInput/>
                                        </item>
                                    </list>
                                    <!-- FILTER DATE OPTIONS -->
                                    <list *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                                        <item class="filter-search" *ngIf="!column.calenderShow">
                                            <div class="header">
                                                <span>{{ labels.filters }}</span>
                                                <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                            </div>
                                        </item>
                                        <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [keepOpen]="option.range" [hidden]="column.calenderShow" [attr.data-automation-id]="(option?.label || option)">
                                            {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                        </item>
                                        <div class="calendar-container" [hidden]="!column.calenderShow">
                                            <div (click)="column.calenderShow=false"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
                                            <novo-date-picker #rangePicker (onSelect)="onCalenderSelect(column, $event)" [(ngModel)]="column.filter" range="true"></novo-date-picker>
                                        </div>
                                    </list>
                                </novo-dropdown>
                            </div>
                        </th>
                    </tr>
                </thead>
                <!-- TABLE DATA -->
                <tbody *ngIf="!dataProvider.isEmpty() || editing">
                    <tr class="table-selection-row" *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled" data-automation-id="table-selection-row">
                        <td colspan="100%">
                            {{labels.selectedRecords(selected.length)}} <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{labels.totalRecords(dataProvider.total)}}</a>
                        </td>
                    </tr>
                    <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
                        <tr class="table-row" [ngClass]="row.customClass || ''" [id]="name + '-' + row[rowIdentifier]" [attr.data-automation-id]="row.id" (click)="rowClickHandler(row)" [class.active]="row.id === activeId">
                            <td class="row-actions" *ngIf="config.hasDetails">
                                <button theme="icon" icon="next" (click)="row._expanded=!row._expanded" *ngIf="!row._expanded"></button>
                                <button theme="icon" icon="sort-desc" (click)="row._expanded=!row._expanded" *ngIf="row._expanded"></button>
                            </td>
                            <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                                <novo-checkbox [(ngModel)]="row._selected" (ngModelChange)="rowSelectHandler(row)" data-automation-id="select-row-checkbox"></novo-checkbox>
                            </td>
                            <td *ngFor="let column of columns" [attr.data-automation-id]="column.id || column.name" [class.novo-form-row]="editable" [hidden]="isColumnHidden(column)">
                                <novo-table-cell *ngIf="row._editing && !row._editing[column.name]" [hasEditor]="editable" [column]="column" [row]="row" [form]="getRowControlForm(i)"></novo-table-cell>
                                <novo-control *ngIf="row._editing && row._editing[column.name]" condensed="true" [form]="getRowControlForm(i)" [control]="row.controls[column.name]"></novo-control>
                            </td>
                        </tr>
                        <tr class="details-row" *ngIf="config.hasDetails" [hidden]="!row._expanded" [attr.data-automation-id]="'details-row-'+row.id">
                            <td class="row-actions"></td>
                            <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? (columns.length + 1) : columns.length">
                                <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                            </td>
                        </tr>
                    </ng-template>
                </tbody>
                <!-- NO TABLE DATA PLACEHOLDER -->
                <tbody class="table-message" *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing" data-automation-id="empty-table">
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
                <tfoot *ngFor="let footer of footers;let i = index;" class="novo-table-total-footer">
                    <tr>
                        <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">{{ footer[column.name] }}</td>
                    </tr>
                </tfoot>
            </table>
        </novo-form>
    </div>
    `
            },] }
];
NovoTableElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: FormUtils },
    { type: FormBuilder }
];
NovoTableElement.propDecorators = {
    filterInputs: [{ type: ViewChildren, args: ['filterInput', { read: ElementRef },] }],
    config: [{ type: Input }],
    columns: [{ type: Input }],
    theme: [{ type: Input }],
    skipSortAndFilterClear: [{ type: Input }],
    mode: [{ type: Input }],
    editable: [{ type: Input }],
    rowIdentifier: [{ type: Input }],
    name: [{ type: Input }],
    onRowClick: [{ type: Output }],
    onRowSelect: [{ type: Output }],
    onTableChange: [{ type: Output }],
    rows: [{ type: Input }],
    dataProvider: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmxlL1RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFXLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBOEIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BGLFNBQVM7QUFDVCxPQUFPLEtBQUssT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUN6RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBK0J6RSwrR0FBK0c7QUFDL0csTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtBQUNWLENBQUMsRUFIVyxhQUFhLEtBQWIsYUFBYSxRQUd4QjtBQXFMRCxNQUFNLE9BQU8sZ0JBQWdCO0lBNkszQixZ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Q3ZCLGlCQUFpQixFQUFFLDZCQUE2QjtvQkFDaEQsNEJBQTRCLEVBQUUsU0FBUztpQkFDeEM7Z0JBQ0Qsa0JBQWtCO2dCQUNsQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5S1A7YUFDSjs7O1lBM05RLGdCQUFnQjtZQUNoQixTQUFTO1lBUm1CLFdBQVc7OzsyQkFvTzdDLFlBQVksU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3FCQUdoRCxLQUFLO3NCQUVMLEtBQUs7b0JBRUwsS0FBSztxQ0FFTCxLQUFLO21CQUVMLEtBQUs7dUJBRUwsS0FBSzs0QkFFTCxLQUFLO21CQUVMLEtBQUs7eUJBR0wsTUFBTTswQkFFTixNQUFNOzRCQUVOLE1BQU07bUJBMkJOLEtBQUs7MkJBZ0JMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBEb0NoZWNrLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBWZW5kb3JcclxuaW1wb3J0ICogYXMgZGF0ZUZucyBmcm9tICdkYXRlLWZucyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IENvbGxlY3Rpb25FdmVudCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGEtcHJvdmlkZXIvQ29sbGVjdGlvbkV2ZW50JztcclxuaW1wb3J0IHsgUGFnZWRBcnJheUNvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRhLXByb3ZpZGVyL1BhZ2VkQXJyYXlDb2xsZWN0aW9uJztcclxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm0tdXRpbHMvRm9ybVV0aWxzJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xyXG5pbXBvcnQgeyBub3RpZnkgfSBmcm9tICcuLi8uLi91dGlscy9ub3RpZmllci9ub3RpZmllci51dGlsJztcclxuaW1wb3J0IHsgQ29udHJvbEZhY3RvcnksIFJlYWRPbmx5Q29udHJvbCB9IGZyb20gJy4vLi4vZm9ybS9Gb3JtQ29udHJvbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3ZvVGFibGVDb25maWcge1xyXG4gIC8vIFBhZ2luZyBjb25maWdcclxuICBwYWdpbmc/OiB7XHJcbiAgICBjdXJyZW50OiBudW1iZXI7IC8vIGN1cnJlbnQgcGFnZVxyXG4gICAgaXRlbXNQZXJQYWdlOiBudW1iZXI7IC8vIGl0ZW1zIHBlciBwYWdlXHJcbiAgICBvblBhZ2VDaGFuZ2U6IEZ1bmN0aW9uOyAvLyBmdW5jdGlvbiB0byBoYW5kbGUgcGFnZSBjaGFuZ2luZ1xyXG4gICAgcm93T3B0aW9ucz86IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9W107IC8vIHBhZ2Ugb3B0aW9uc1xyXG4gICAgZGlzYWJsZVBhZ2VTZWxlY3Rpb24/OiBib29sZWFuOyAvLyBkaXNhYmxlcyB0aGUgcGFnZXMgZnJvbSBiZWluZyBzZWxlY3RlZFxyXG4gIH07XHJcbiAgLy8gRm9vdGVyIGNvbmZpZyAodG90YWwgZm9vdGVyKVxyXG4gIGZvb3RlcnM/OiBBcnJheTx7XHJcbiAgICBjb2x1bW5zOiBBcnJheTxzdHJpbmc+OyAvLyBzdHJpbmcgYXJyYXkgb2YgY29sdW1ucyB0byB0b3RhbFxyXG4gICAgbWV0aG9kOiBzdHJpbmc7IC8vIG1ldGhvZCB0byB1c2UgZm9yIHRoZSBmb290ZXIsIFNVTSB8IEFWRywgZGVmYXVsdHMgdG8gU1VNXHJcbiAgICBsYWJlbENvbHVtbjogc3RyaW5nOyAvLyBjb2x1bW4gdG8gdXNlIGFzIHRoZSBcInRvdGFsXCIgbGFiZWxcclxuICAgIGxhYmVsOiBzdHJpbmc7IC8vIGxhYmVsIHRvIHVzZSBpbiB0aGUgXCJ0b3RhbFwiIGxhYmVsXHJcbiAgfT47XHJcbiAgLy8gVE9ETzogV2hlbiB0aGVzZSB0eXBlcyBhcmUgZW5mb3JjZWQgYXMgYGJvb2xlYW4gfCBGdW5jdGlvbmAsIHRoZXJlJ3MgYSBsaW50IGVycm9yLiBUaGF0J3MgYSBidWcuXHJcbiAgZmlsdGVyaW5nPzogYm9vbGVhbiB8IGFueTsgLy8gVHVybiBvbiBmaWx0ZXJpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3IgZmlsdGVyaW5nIGNhbGxiYWNrXHJcbiAgc29ydGluZz86IGJvb2xlYW4gfCBhbnk7IC8vIFR1cm4gb24gc29ydGluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciBzb3J0aW5nIGNhbGxiYWNrXHJcbiAgb3JkZXJpbmc/OiBib29sZWFuIHwgRnVuY3Rpb247IC8vIFR1cm4gb24gb3JkZXJpbmcgZm9yIHRoZSB0YWJsZSwgYm9vbGVhbiBvciBmdW5jdGlvbiBmb3Igb3JkZXJpbmcgY2FsbGJhY2tcclxuICByZXNpemluZz86IGJvb2xlYW4gfCBGdW5jdGlvbjsgLy8gVHVybiBvbiByZXNpemluZyBmb3IgdGhlIHRhYmxlLCBib29sZWFuIG9yIGZ1bmN0aW9uIGZvciByZXNpemluZyBjYWxsYmFja1xyXG4gIHJvd1NlbGVjdGlvblN0eWxlPzogc3RyaW5nOyAvLyBSb3cgc2VsZWN0aW9uIHN0eWxlLCBjaGVja2JveCBvciByb3dcclxuICByb3dTZWxlY3Q/OiBib29sZWFuOyAvLyBUdXJuIG9uIHJvdyBzZWxlY3Rpb25cclxuICBoYXNEZXRhaWxzPzogYm9vbGVhbjsgLy8gVHVybiBvbiBkZXRhaWxzIHJvdyBmb3IgdGhlIHRhYmxlXHJcbiAgZGV0YWlsc1JlbmRlcmVyPzogYW55OyAvLyBSZW5kZXJlci9jb21wb25lbnQgZm9yIHRoZSBkZXRhaWxzIHJvd1xyXG4gIGV4cGFuZEFsbD86IGJvb2xlYW47IC8vIHNob3VsZCBBbGwgUm93cyBiZSBleHBhbmRlZCBieSBkZWZhdWx0XHJcbiAgc2VsZWN0QWxsRW5hYmxlZD86IGJvb2xlYW47IC8vIEFsbG93cyB0aGUgdGFibGUsIHdoaWxlIGluIHNlbGVjdGlvbiBtb2RlIHRvIGhhdmUgYSBzZWxlY3QgYWxsIGF0IHRoZSB0b3BcclxufVxyXG5cclxuLy8gVE9ETyAtIHN1cHBvcnQgKDEpIGNsaWNraW5nIGNlbGwgdG8gZWRpdCwgKDIpIGNsaWNraW5nIHJvdyB0byBlZGl0LCAoMykgYnV0dG9uIHRvIHRyaWdnZXIgZnVsbCB0YWJsZSB0byBlZGl0XHJcbmV4cG9ydCBlbnVtIE5vdm9UYWJsZU1vZGUge1xyXG4gIFZJRVcgPSAxLFxyXG4gIEVESVQgPSAyLFxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tdGFibGUnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbYXR0ci50aGVtZV0nOiAndGhlbWUnLFxyXG4gICAgJ1tjbGFzcy5lZGl0aW5nXSc6ICdtb2RlID09PSBOb3ZvVGFibGVNb2RlLkVESVQnLFxyXG4gICAgJ1tjbGFzcy5ub3ZvLXRhYmxlLWxvYWRpbmddJzogJ2xvYWRpbmcnLFxyXG4gIH0sXHJcbiAgLy8gZGlyZWN0aXZlczogW10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8aGVhZGVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPG5vdm8tcGFnaW5hdGlvbiAqbmdJZj1cImNvbmZpZy5wYWdpbmcgJiYgIShkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3dPcHRpb25zXT1cImNvbmZpZy5wYWdpbmcucm93T3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlUGFnZVNlbGVjdGlvbl09XCJjb25maWcucGFnaW5nLmRpc2FibGVQYWdlU2VsZWN0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyhwYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsoaXRlbXNQZXJQYWdlKV09XCJkYXRhUHJvdmlkZXIucGFnZVNpemVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdG90YWxJdGVtc109XCJkYXRhUHJvdmlkZXIudG90YWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8L25vdm8tcGFnaW5hdGlvbj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8tdGFibGUtYWN0aW9uc1wiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFibGUtbG9hZGluZy1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nIHx8IGRhdGFQcm92aWRlci5pc0xvYWRpbmcoKVwiPlxyXG4gICAgICAgICAgICA8bm92by1sb2FkaW5nPjwvbm92by1sb2FkaW5nPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxub3ZvLXRvYXN0ICpuZ0lmPVwidG9hc3RcIiBbdGhlbWVdPVwidG9hc3Q/LnRoZW1lXCIgW2ljb25dPVwidG9hc3Q/Lmljb25cIiBbbWVzc2FnZV09XCJ0b2FzdD8ubWVzc2FnZVwiPjwvbm92by10b2FzdD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtY29udGFpbmVyXCIgKm5nSWY9XCIhZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdFwiPlxyXG4gICAgICAgICAgICA8bm92by1mb3JtIGhpZGVIZWFkZXI9XCJ0cnVlXCIgW2Zvcm1dPVwidGFibGVGb3JtXCI+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIGRhdGFUYWJsZVwiIFtjbGFzcy50YWJsZS1kZXRhaWxzXT1cImNvbmZpZy5oYXNEZXRhaWxzXCIgcm9sZT1cImdyaWRcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gc2tpcFNvcnRBbmRGaWx0ZXJDbGVhciBpcyBhIGhhY2sgcmlnaHQgbm93LCB3aWxsIGJlIHJlbW92ZWQgb25jZSBDYW52YXMgaXMgcmVmYWN0b3JlZCAtLT5cclxuICAgICAgICAgICAgICAgIDx0aGVhZCAqbmdJZj1cImNvbHVtbnMubGVuZ3RoICYmICghZGF0YVByb3ZpZGVyLmlzRW1wdHkoKSB8fCBkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpIHx8IHNraXBTb3J0QW5kRmlsdGVyQ2xlYXIgfHwgZWRpdGluZylcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dHIgcm9sZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIERFVEFJTFMgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1hY3Rpb25zXCIgKm5nSWY9XCJjb25maWcuaGFzRGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJleHBhbmRBbGxPblBhZ2UoY29uZmlnLmV4cGFuZEFsbClcIiAqbmdJZj1cIiFjb25maWcuZXhwYW5kQWxsXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZXhwYW5kLWFsbFwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwic29ydC1kZXNjXCIgKGNsaWNrKT1cImV4cGFuZEFsbE9uUGFnZShjb25maWcuZXhwYW5kQWxsKVwiICpuZ0lmPVwiY29uZmlnLmV4cGFuZEFsbFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImNvbGxhcHNlLWFsbFwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIENIRUNLQk9YIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJyb3ctYWN0aW9ucyBjaGVja2JveCBtYXNzLWFjdGlvblwiICpuZ0lmPVwiY29uZmlnLnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1jaGVja2JveCBbKG5nTW9kZWwpXT1cIm1hc3RlclwiIFtpbmRldGVybWluYXRlXT1cInBhZ2VTZWxlY3RlZC5sZW5ndGggPiAwICYmIHBhZ2VTZWxlY3RlZC5sZW5ndGggPCBwYWdlZERhdGEubGVuZ3RoXCIgKG5nTW9kZWxDaGFuZ2UpPVwic2VsZWN0UGFnZSgkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LWFsbC1jaGVja2JveFwiIFt0b29sdGlwXT1cIm1hc3RlciA/IGxhYmVscy5kZXNlbGVjdEFsbCA6IGxhYmVscy5zZWxlY3RBbGxPblBhZ2VcIiB0b29sdGlwUG9zaXRpb249XCJyaWdodFwiPjwvbm92by1jaGVja2JveD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBUQUJMRSBIRUFERVJTIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCIgW25nQ2xhc3NdPVwieyAnbWFzcy1hY3Rpb24nOiBjb25maWc/LnJvd1NlbGVjdGlvblN0eWxlID09PSAnY2hlY2tib3gnLCAnYWN0aW9ucyc6IGNvbHVtbj8uYWN0aW9ucz8uaXRlbXM/Lmxlbmd0aCA+IDAsICdwcmV2aWV3JzogY29sdW1uPy5uYW1lID09PSAncHJldmlldycgfVwiIFtub3ZvVGhPcmRlcmFibGVdPVwiY29sdW1uXCIgKG9uT3JkZXJDaGFuZ2UpPVwib25PcmRlckNoYW5nZSgkZXZlbnQpXCIgW2hpZGRlbl09XCJpc0NvbHVtbkhpZGRlbihjb2x1bW4pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGgtZ3JvdXBcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lXCIgKm5nSWY9XCIhY29sdW1uLmhpZGVIZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIExBQkVMICYgU09SVCBBUlJPV1MgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRoLXRpdGxlXCIgW25nQ2xhc3NdPVwiKGNvbmZpZy5zb3J0aW5nICE9PSBmYWxzZSAmJiBjb2x1bW4uc29ydGluZyAhPT0gZmFsc2UpID8gJ3NvcnRhYmxlJyA6ICcnXCIgW25vdm9UaFNvcnRhYmxlXT1cImNvbmZpZ1wiIFtjb2x1bW5dPVwiY29sdW1uXCIgKG9uU29ydENoYW5nZSk9XCJvblNvcnRDaGFuZ2UoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3sgY29sdW1uLnRpdGxlIHx8IGNvbHVtbi5sYWJlbCB9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1zb3J0LWljb25zXCIgdG9vbHRpcFBvc2l0aW9uPVwiYm90dG9tXCIgW3Rvb2x0aXBdPVwibGFiZWxzLnNvcnRcIiBbbmdDbGFzc109XCJjb2x1bW4uc29ydCB8fCAnJ1wiICpuZ0lmPVwiY29uZmlnLnNvcnRpbmcgIT09IGZhbHNlICYmIGNvbHVtbi5zb3J0aW5nICE9PSBmYWxzZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktYXJyb3ctdXBcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1hcnJvdy1kb3duXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBEUk9QLURPV04gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tZHJvcGRvd24gc2lkZT1cInJpZ2h0XCIgKm5nSWY9XCJjb25maWcuZmlsdGVyaW5nICE9PSBmYWxzZSAmJiBjb2x1bW4uZmlsdGVyaW5nICE9PSBmYWxzZVwiIGNsYXNzPVwiY29sdW1uLWZpbHRlcnNcIiAodG9nZ2xlZCk9XCJvbkRyb3Bkb3duVG9nZ2xlZCgkZXZlbnQsIGNvbHVtbi5uYW1lKVwiIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLnRhYmxlLWNvbnRhaW5lclwiIGNvbnRhaW5lckNsYXNzPVwidGFibGUtZHJvcGRvd25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJpY29uXCIgaWNvbj1cImZpbHRlclwiIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbVwiIFt0b29sdGlwXT1cImxhYmVscy5maWx0ZXJzXCIgW2NsYXNzLmZpbHRlcmVkXT1cImNvbHVtbi5maWx0ZXIgfHwgY29sdW1uLmZpbHRlcj09PWZhbHNlXCIgKGNsaWNrKT1cImZvY3VzSW5wdXQoKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEZJTFRFUiBPUFRJT05TIExJU1QgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaXN0ICpuZ0lmPVwiKGNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoIHx8IGNvbHVtbj8ub3JpZ2luYWxPcHRpb25zPy5sZW5ndGgpICYmIGNvbHVtbj8udHlwZSAhPT0gJ2RhdGUnICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbGFiZWxzLmZpbHRlcnMgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIGNvbG9yPVwibmVnYXRpdmVcIiBpY29uPVwidGltZXNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGVhcihjb2x1bW4pXCIgKm5nSWY9XCJjb2x1bW4uZmlsdGVyIHx8IGNvbHVtbi5maWx0ZXI9PT1mYWxzZVwiPnt7IGxhYmVscy5jbGVhciB9fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICpuZ0lmPVwiISFjb2x1bW4uYWxsb3dDdXN0b21UZXh0T3B0aW9uXCIgW2F0dHIuaWRdPVwiY29sdW1uLm5hbWUgKyAnLWlucHV0J1wiIFtub3ZvVGFibGVGaWx0ZXJdPVwiY29sdW1uXCIgKG9uRmlsdGVyQ2hhbmdlKT1cIm9uRmlsdGVyS2V5d29yZHMoJGV2ZW50KVwiIFsobmdNb2RlbCldPVwiY29sdW1uLmZyZWV0ZXh0RmlsdGVyXCIga2VlcEZpbHRlckZvY3VzZWQgI2ZpbHRlcklucHV0Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbikgfVwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29sdW1uLm9wdGlvbnNcIiAoY2xpY2spPVwib25GaWx0ZXJDbGljayhjb2x1bW4sIG9wdGlvbilcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgb3B0aW9uPy5sYWJlbCB8fCBvcHRpb24gfX08L3NwYW4+IDxpIGNsYXNzPVwiYmhpLWNoZWNrXCIgKm5nSWY9XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2l0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGlzdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgU0VBUkNIIElOUFVUIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGlzdCAqbmdJZj1cIiEoY29sdW1uPy5vcHRpb25zPy5sZW5ndGggfHwgY29sdW1uPy5vcmlnaW5hbE9wdGlvbnM/Lmxlbmd0aCkgJiYgdG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbi5uYW1lXVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGl0ZW0gY2xhc3M9XCJmaWx0ZXItc2VhcmNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBsYWJlbHMuZmlsdGVycyB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImRpYWxvZ3VlXCIgY29sb3I9XCJuZWdhdGl2ZVwiIGljb249XCJ0aW1lc1wiIChjbGljayk9XCJvbkZpbHRlckNsZWFyKGNvbHVtbilcIiAqbmdJZj1cImNvbHVtbi5maWx0ZXJcIj57eyBsYWJlbHMuY2xlYXIgfX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbYXR0ci5pZF09XCJjb2x1bW4ubmFtZSArICctaW5wdXQnXCIgW25vdm9UYWJsZUZpbHRlcl09XCJjb2x1bW5cIiAob25GaWx0ZXJDaGFuZ2UpPVwib25GaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiIFsobmdNb2RlbCldPVwiY29sdW1uLmZpbHRlclwiIGtlZXBGaWx0ZXJGb2N1c2VkICNmaWx0ZXJJbnB1dC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2l0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGlzdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBGSUxURVIgREFURSBPUFRJT05TIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGlzdCAqbmdJZj1cImNvbHVtbj8ub3B0aW9ucz8ubGVuZ3RoICYmIGNvbHVtbj8udHlwZSA9PT0gJ2RhdGUnICYmIHRvZ2dsZWREcm9wZG93bk1hcFtjb2x1bW4ubmFtZV1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtIGNsYXNzPVwiZmlsdGVyLXNlYXJjaFwiICpuZ0lmPVwiIWNvbHVtbi5jYWxlbmRlclNob3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGxhYmVscy5maWx0ZXJzIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgaWNvbj1cInRpbWVzXCIgKGNsaWNrKT1cIm9uRmlsdGVyQ2xlYXIoY29sdW1uKVwiICpuZ0lmPVwiY29sdW1uLmZpbHRlclwiPnt7IGxhYmVscy5jbGVhciB9fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGl0ZW0gW25nQ2xhc3NdPVwieyBhY3RpdmU6IGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgb3B0aW9uKSB9XCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2x1bW4ub3B0aW9uc1wiIChjbGljayk9XCJvbkZpbHRlckNsaWNrKGNvbHVtbiwgb3B0aW9uKVwiIFtrZWVwT3Blbl09XCJvcHRpb24ucmFuZ2VcIiBbaGlkZGVuXT1cImNvbHVtbi5jYWxlbmRlclNob3dcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiKG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbj8ubGFiZWwgfHwgb3B0aW9uIH19IDxpIGNsYXNzPVwiYmhpLWNoZWNrXCIgKm5nSWY9XCJpc0ZpbHRlckFjdGl2ZShjb2x1bW4sIG9wdGlvbilcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2l0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY29udGFpbmVyXCIgW2hpZGRlbl09XCIhY29sdW1uLmNhbGVuZGVyU2hvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cImNvbHVtbi5jYWxlbmRlclNob3c9ZmFsc2VcIj48aSBjbGFzcz1cImJoaS1wcmV2aW91c1wiPjwvaT57eyBsYWJlbHMuYmFja1RvUHJlc2V0RmlsdGVycyB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWRhdGUtcGlja2VyICNyYW5nZVBpY2tlciAob25TZWxlY3QpPVwib25DYWxlbmRlclNlbGVjdChjb2x1bW4sICRldmVudClcIiBbKG5nTW9kZWwpXT1cImNvbHVtbi5maWx0ZXJcIiByYW5nZT1cInRydWVcIj48L25vdm8tZGF0ZS1waWNrZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saXN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1kcm9wZG93bj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIC0tPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5ICpuZ0lmPVwiIWRhdGFQcm92aWRlci5pc0VtcHR5KCkgfHwgZWRpdGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyAmJiBzaG93U2VsZWN0QWxsTWVzc2FnZSAmJiBjb25maWcuc2VsZWN0QWxsRW5hYmxlZFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInRhYmxlLXNlbGVjdGlvbi1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2xhYmVscy5zZWxlY3RlZFJlY29yZHMoc2VsZWN0ZWQubGVuZ3RoKX19IDxhIChjbGljayk9XCJzZWxlY3RBbGwodHJ1ZSlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJhbGwtbWF0Y2hpbmctcmVjb3Jkc1wiPnt7bGFiZWxzLnRvdGFsUmVjb3JkcyhkYXRhUHJvdmlkZXIudG90YWwpfX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvdz1cIiRpbXBsaWNpdFwiIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJyb3dzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cInRhYmxlLXJvd1wiIFtuZ0NsYXNzXT1cInJvdy5jdXN0b21DbGFzcyB8fCAnJ1wiIFtpZF09XCJuYW1lICsgJy0nICsgcm93W3Jvd0lkZW50aWZpZXJdXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInJvdy5pZFwiIChjbGljayk9XCJyb3dDbGlja0hhbmRsZXIocm93KVwiIFtjbGFzcy5hY3RpdmVdPVwicm93LmlkID09PSBhY3RpdmVJZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnNcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBpY29uPVwibmV4dFwiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkPSFyb3cuX2V4cGFuZGVkXCIgKm5nSWY9XCIhcm93Ll9leHBhbmRlZFwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdGhlbWU9XCJpY29uXCIgaWNvbj1cInNvcnQtZGVzY1wiIChjbGljayk9XCJyb3cuX2V4cGFuZGVkPSFyb3cuX2V4cGFuZGVkXCIgKm5nSWY9XCJyb3cuX2V4cGFuZGVkXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicm93LWFjdGlvbnMgY2hlY2tib3hcIiAqbmdJZj1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94J1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWNoZWNrYm94IFsobmdNb2RlbCldPVwicm93Ll9zZWxlY3RlZFwiIChuZ01vZGVsQ2hhbmdlKT1cInJvd1NlbGVjdEhhbmRsZXIocm93KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlbGVjdC1yb3ctY2hlY2tib3hcIj48L25vdm8tY2hlY2tib3g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjb2x1bW4uaWQgfHwgY29sdW1uLm5hbWVcIiBbY2xhc3Mubm92by1mb3JtLXJvd109XCJlZGl0YWJsZVwiIFtoaWRkZW5dPVwiaXNDb2x1bW5IaWRkZW4oY29sdW1uKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLXRhYmxlLWNlbGwgKm5nSWY9XCJyb3cuX2VkaXRpbmcgJiYgIXJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV1cIiBbaGFzRWRpdG9yXT1cImVkaXRhYmxlXCIgW2NvbHVtbl09XCJjb2x1bW5cIiBbcm93XT1cInJvd1wiIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCI+PC9ub3ZvLXRhYmxlLWNlbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5vdm8tY29udHJvbCAqbmdJZj1cInJvdy5fZWRpdGluZyAmJiByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdXCIgY29uZGVuc2VkPVwidHJ1ZVwiIFtmb3JtXT1cImdldFJvd0NvbnRyb2xGb3JtKGkpXCIgW2NvbnRyb2xdPVwicm93LmNvbnRyb2xzW2NvbHVtbi5uYW1lXVwiPjwvbm92by1jb250cm9sPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiZGV0YWlscy1yb3dcIiAqbmdJZj1cImNvbmZpZy5oYXNEZXRhaWxzXCIgW2hpZGRlbl09XCIhcm93Ll9leHBhbmRlZFwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInZGV0YWlscy1yb3ctJytyb3cuaWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvdy1hY3Rpb25zXCI+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94JyA/IChjb2x1bW5zLmxlbmd0aCArIDEpIDogY29sdW1ucy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bm92by1yb3ctZGV0YWlscyBbZGF0YV09XCJyb3dcIiBbcmVuZGVyZXJdPVwiY29uZmlnLmRldGFpbHNSZW5kZXJlclwiPjwvbm92by1yb3ctZGV0YWlscz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8IS0tIE5PIFRBQkxFIERBVEEgUExBQ0VIT0xERVIgLS0+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ0YWJsZS1tZXNzYWdlXCIgKm5nSWY9XCJkYXRhUHJvdmlkZXIuaXNFbXB0eSgpICYmICFkYXRhUHJvdmlkZXIuaXNGaWx0ZXJlZCgpICYmICFlZGl0aW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktdGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAjZW1wdHltZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1lbXB0eS1tZXNzYWdlXVwiPjwvbmctY29udGVudD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJlbXB0eW1lc3NhZ2UuY2hpbGROb2Rlcy5sZW5ndGggPT0gMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND48aSBjbGFzcz1cImJoaS1zZWFyY2gtcXVlc3Rpb25cIj48L2k+IHt7IGxhYmVscy5lbXB0eVRhYmxlTWVzc2FnZSB9fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk8gTUFUQ0hJTkcgUkVDT1JEUyAtLT5cclxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInRhYmxlLW1lc3NhZ2VcIiAqbmdJZj1cImRhdGFQcm92aWRlci5pc0VtcHR5KCkgJiYgZGF0YVByb3ZpZGVyLmlzRmlsdGVyZWQoKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI25vbWF0Y2htZXNzYWdlPjxuZy1jb250ZW50IHNlbGVjdD1cIlt0YWJsZS1uby1tYXRjaGluZy1yZWNvcmRzLW1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vLW1hdGNoaW5nLXJlY29yZHNcIiAqbmdJZj1cIm5vbWF0Y2htZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktc2VhcmNoLXF1ZXN0aW9uXCI+PC9pPiB7eyBsYWJlbHMubm9NYXRjaGluZ1JlY29yZHNNZXNzYWdlIH19PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPCEtLSBUQUJMRSBEQVRBIEVSUk9SIFBMQUNFSE9MREVSIC0tPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwidGFibGUtbWVzc2FnZVwiICpuZ0lmPVwiZGF0YVByb3ZpZGVyLmhhc0Vycm9ycygpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwidGFibGUtZXJyb3JzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI2Vycm9ybWVzc2FnZT48bmctY29udGVudCBzZWxlY3Q9XCJbdGFibGUtZXJyb3ItbWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwiZXJyb3JtZXNzYWdlLmNoaWxkTm9kZXMubGVuZ3RoID09IDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+PGkgY2xhc3M9XCJiaGktY2F1dGlvblwiPjwvaT4ge3sgbGFiZWxzLmVycm9yZWRUYWJsZU1lc3NhZ2UgfX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8dGZvb3QgKm5nSWY9XCIhY29uZmlnLmZvb3RlcnNcIiBbbmdDbGFzc109XCJkYXRhUHJvdmlkZXIubGVuZ3RoICUgMiA9PSAwID8gJ29kZCcgOiAnZXZlbidcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by10YWJsZS1mb290ZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGZvb3Q+XHJcbiAgICAgICAgICAgICAgICA8dGZvb3QgKm5nRm9yPVwibGV0IGZvb3RlciBvZiBmb290ZXJzO2xldCBpID0gaW5kZXg7XCIgY2xhc3M9XCJub3ZvLXRhYmxlLXRvdGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCIoY29sdW1uLmlkIHx8IGNvbHVtbi5uYW1lKSArICctdG90YWwtJyArIGlcIj57eyBmb290ZXJbY29sdW1uLm5hbWVdIH19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Zm9vdD5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L25vdm8tZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UYWJsZUVsZW1lbnQgaW1wbGVtZW50cyBEb0NoZWNrIHtcclxuICBAVmlld0NoaWxkcmVuKCdmaWx0ZXJJbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxyXG4gIGZpbHRlcklucHV0czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvbmZpZzogTm92b1RhYmxlQ29uZmlnID0ge307XHJcbiAgQElucHV0KClcclxuICBjb2x1bW5zOiBBcnJheTxhbnk+ID0gW107XHJcbiAgQElucHV0KClcclxuICB0aGVtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgbW9kZTogTm92b1RhYmxlTW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcclxuICBASW5wdXQoKVxyXG4gIGVkaXRhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KClcclxuICByb3dJZGVudGlmaWVyOiBzdHJpbmcgPSAnaWQnO1xyXG4gIEBJbnB1dCgpXHJcbiAgbmFtZTogc3RyaW5nID0gJ3RhYmxlJztcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25Sb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgb25Sb3dTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uVGFibGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfZGF0YVByb3ZpZGVyOiBQYWdlZEFycmF5Q29sbGVjdGlvbjxhbnk+O1xyXG4gIF9yb3dzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgc2VsZWN0ZWQ6IEFycmF5PGFueT4gPSBbXTtcclxuICBhY3RpdmVJZDogbnVtYmVyID0gMDtcclxuICBtYXN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBleHBhbmRBbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbGFzdFBhZ2U6IG51bWJlciA9IDA7XHJcbiAgc2VsZWN0ZWRQYWdlQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgc2hvd1NlbGVjdEFsbE1lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjdXJyZW50U29ydENvbHVtbjogYW55O1xyXG4gIHBhZ2VkRGF0YTogQXJyYXk8YW55PiA9IFtdO1xyXG4gIHBhZ2VTZWxlY3RlZDogYW55O1xyXG4gIC8vIE1hcCB0byBrZWVwIHRyYWNrIG9mIHdoYXQgZHJvcGRvd25zIGFyZSB0b2dnbGVkXHJcbiAgLy8gVXNlZCB0byBwcm9wZXJseSAqbmdJZiB0aGUgPGxpc3Q+IHNvIHRoYXQgdGhlIGtlZXBGaWx0ZXJGb2N1c2VkIERpcmVjdGl2ZVxyXG4gIC8vIHdpbGwgcHJvcGVybHkgZmlyZSB0aGUgbmdBZnRlclZpZXdJbml0IGV2ZW50XHJcbiAgdG9nZ2xlZERyb3Bkb3duTWFwOiBhbnkgPSB7fTtcclxuICBwdWJsaWMgTm92b1RhYmxlTW9kZSA9IE5vdm9UYWJsZU1vZGU7XHJcbiAgcHVibGljIHRhYmxlRm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XHJcbiAgcHVibGljIHRvYXN0OiB7IHRoZW1lOiBzdHJpbmc7IGljb246IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH07XHJcbiAgcHVibGljIGZvb3RlcnMgPSBbXTtcclxuICBwdWJsaWMgZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJvd3Mocm93czogQXJyYXk8YW55Pikge1xyXG4gICAgdGhpcy5kYXRhUHJvdmlkZXIgPSByb3dzO1xyXG4gICAgaWYgKHJvd3MgJiYgcm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc2V0dXBDb2x1bW5EZWZhdWx0cygpO1xyXG4gICAgfVxyXG4gICAgLy8gdGhpcyBpcyBhIHRlbXBvcmFyeS9oYWNreSBmaXggdW50aWwgYXN5bmMgZGF0YWxvYWRpbmcgaXMgaGFuZGxlZCB3aXRoaW4gdGhlIHRhYmxlXHJcbiAgICBpZiAoIXRoaXMuc2tpcFNvcnRBbmRGaWx0ZXJDbGVhcikge1xyXG4gICAgICB0aGlzLmNsZWFyQWxsU29ydEFuZEZpbHRlcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCByb3dzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhUHJvdmlkZXIoZHA6IGFueSkge1xyXG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyID0gQXJyYXkuaXNBcnJheShkcCkgPyBuZXcgUGFnZWRBcnJheUNvbGxlY3Rpb248YW55PihkcCkgOiBkcDtcclxuICAgIHRoaXMuX2RhdGFQcm92aWRlci5kYXRhQ2hhbmdlLnBpcGUoZGVib3VuY2VUaW1lKDEwMCkpLnN1YnNjcmliZSgoZXZlbnQ6IENvbGxlY3Rpb25FdmVudCkgPT4ge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgICBjYXNlIENvbGxlY3Rpb25FdmVudC5DSEFOR0U6XHJcbiAgICAgICAgICB0aGlzLl9yb3dzID0gZXZlbnQuZGF0YTtcclxuICAgICAgICAgIC8vIFNldHVwIGZvcm1cclxuICAgICAgICAgIHRoaXMudGFibGVGb3JtID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgICAgICAgcm93czogdGhpcy5idWlsZGVyLmFycmF5KFtdKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXHJcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlZERhdGEgPSBldmVudC5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIEZpbmQgdGhhdCBjb2x1bW5zIHdlIG1pZ2h0IG5lZWQgdG8gc3VtIHVwIHZpYSB0aGUgZm9vdGVyXHJcbiAgICAgICAgICBsZXQgY29sdW1uc1RvU3VtID0gW107XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5TdW1zID0ge307XHJcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuZm9vdGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mb290ZXJzLmZvckVhY2goKGNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbHVtbnNUb1N1bS5wdXNoKC4uLmNvbmZpZy5jb2x1bW5zKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgaGF2ZSB1bmlxdWUgY29sdW1ucywgZmlsdGVyIG91dCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgIGNvbHVtbnNUb1N1bSA9IGNvbHVtbnNUb1N1bS5maWx0ZXIoKGl0ZW0sIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gTWFrZSBhIGZvcm0gZm9yIGVhY2ggcm93XHJcbiAgICAgICAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gPEZvcm1BcnJheT50aGlzLnRhYmxlRm9ybS5jb250cm9sc1sncm93cyddO1xyXG4gICAgICAgICAgdGhpcy5fcm93cy5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XHJcbiAgICAgICAgICAgIHJvdy5jb250cm9scyA9IHt9O1xyXG4gICAgICAgICAgICByb3cuX2VkaXRpbmcgPSB7fTtcclxuICAgICAgICAgICAgcm93Ll9leHBhbmRlZCA9IHRoaXMuY29uZmlnLmV4cGFuZEFsbDtcclxuICAgICAgICAgICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGNvbHVtbi5lZGl0b3JDb25maWdcclxuICAgICAgICAgICAgICAgID8gQ29udHJvbEZhY3RvcnkuY3JlYXRlKGNvbHVtbi5lZGl0b3JUeXBlLCBjb2x1bW4uZWRpdG9yQ29uZmlnKVxyXG4gICAgICAgICAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcclxuICAgICAgICAgICAgICByb3cuY29udHJvbHNbY29sdW1uLm5hbWVdID0gY29udHJvbDtcclxuICAgICAgICAgICAgICByb3dDb250cm9scy5wdXNoKGNvbnRyb2wpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgcm93LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRhYmxlRm9ybVJvd3MucHVzaCh0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChyb3dDb250cm9scykpO1xyXG4gICAgICAgICAgICAvLyBTZXR1cCB0aGUgdG90YWwgZm9vdGVyIGlmIGNvbmZpZ3VyZWRcclxuICAgICAgICAgICAgLy8gQXJyYXkgb2Yga2V5cyB0byB0b3RhbFxyXG4gICAgICAgICAgICBpZiAoY29sdW1uc1RvU3VtLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbHVtbnNUb1N1bS5mb3JFYWNoKChjb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChIZWxwZXJzLmlzQmxhbmsoY29sdW1uU3Vtc1tjb2x1bW5dKSkge1xyXG4gICAgICAgICAgICAgICAgICBjb2x1bW5TdW1zW2NvbHVtbl0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29sdW1uU3Vtc1tjb2x1bW5dICs9IHJvd1tjb2x1bW5dO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IE5vdm9UYWJsZU1vZGUuRURJVCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhYmxlRWRpdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gU2V0dXAgdGhlIGZvb3RlcnMgKGlmIGFueSlcclxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mb290ZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9vdGVycyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mb290ZXJzLmZvckVhY2goKGZvb3RlckNvbmZpZywgZm9vdGVyQ29uZmlnSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBmb290ZXIgPSB7fTtcclxuICAgICAgICAgICAgICBmb290ZXJbZm9vdGVyQ29uZmlnLmxhYmVsQ29sdW1uXSA9IGZvb3RlckNvbmZpZy5sYWJlbDtcclxuICAgICAgICAgICAgICBmb290ZXJDb25maWcuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChmb290ZXJDb25maWcubWV0aG9kID09PSAnQVZHJyAmJiB0aGlzLl9yb3dzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBmb290ZXJbY29sdW1uXSA9IGNvbHVtblN1bXNbY29sdW1uXSAvIHRoaXMuX3Jvd3MubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZm9vdGVyW2NvbHVtbl0gPSBjb2x1bW5TdW1zW2NvbHVtbl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5mb290ZXJzLnB1c2goZm9vdGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZykge1xyXG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50O1xyXG4gICAgICB0aGlzLl9kYXRhUHJvdmlkZXIucGFnZVNpemUgPSB0aGlzLmNvbmZpZy5wYWdpbmcuaXRlbXNQZXJQYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gUGFnaW5nIHR1cm5lZCBvZmYsIHJldHVybiBiYXNpY2FsbHkgYWxsIG9mIHRoZSBkYXRhXHJcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5wYWdlID0gMTtcclxuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gNTAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGRwICYmIGRwLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZXR1cENvbHVtbkRlZmF1bHRzKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kYXRhUHJvdmlkZXIucmVmcmVzaCgpO1xyXG4gIH1cclxuICBnZXQgZGF0YVByb3ZpZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFQcm92aWRlcjtcclxuICB9XHJcblxyXG4gIGdldCBlZGl0aW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gTm92b1RhYmxlTW9kZS5FRElUO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGZvcm1WYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhYmxlRm9ybS52YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgZm9ybVV0aWxzOiBGb3JtVXRpbHMsIHByaXZhdGUgYnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcclxuICAgIG5vdGlmeSgnW0RlcHJlY2F0ZWRdOiBUaGUgdGFibGUgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIG1pZ3JhdGUgdG8gbm92by1kYXRhLXRhYmxlcyEnKTtcclxuICB9XHJcblxyXG4gIG9uRHJvcGRvd25Ub2dnbGVkKGV2ZW50LCBjb2x1bW4pOiB2b2lkIHtcclxuICAgIHRoaXMudG9nZ2xlZERyb3Bkb3duTWFwW2NvbHVtbl0gPSBldmVudDtcclxuICB9XHJcblxyXG4gIGZvY3VzSW5wdXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJJbnB1dHMgJiYgdGhpcy5maWx0ZXJJbnB1dHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVySW5wdXRzLmZvckVhY2goKGZpbHRlcklucHV0KSA9PiB7XHJcbiAgICAgICAgaWYgKGZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmlsdGVySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25QYWdlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAvLyB0aGlzLmRhdGFQcm92aWRlci5wYWdlID0gZXZlbnQucGFnZTtcclxuICAgIC8vIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplID0gZXZlbnQuaXRlbXNQZXJQYWdlO1xyXG4gIH1cclxuXHJcbiAgZ2V0T3B0aW9uRGF0YUF1dG9tYXRpb25JZChvcHRpb24pIHtcclxuICAgIGlmICghSGVscGVycy5pc0JsYW5rKG9wdGlvbi52YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb247XHJcbiAgfVxyXG5cclxuICBzZXR1cENvbHVtbkRlZmF1bHRzKCkge1xyXG4gICAgLy8gQ2hlY2sgY29sdW1ucyBmb3IgY2VsbCBvcHRpb24gdHlwZXNcclxuICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcclxuICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4udHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoY29sdW1uLnR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAvLyBTZXQgb3B0aW9ucyBiYXNlZCBvbiBkYXRlcyBpZiB0aGVyZSBhcmUgbm9uZVxyXG4gICAgICAgICAgICBjb2x1bW4ub3B0aW9ucyA9IGNvbHVtbi5vcHRpb25zIHx8IHRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoY29sdW1uKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZyAmJiB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCAhPT0gdGhpcy5sYXN0UGFnZSkge1xyXG4gICAgICB0aGlzLnJvd1NlbGVjdEhhbmRsZXIoKTtcclxuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYXN0UGFnZSA9IHRoaXMuY29uZmlnLnBhZ2luZyA/IHRoaXMuY29uZmlnLnBhZ2luZy5jdXJyZW50IDogMTtcclxuICB9XHJcblxyXG4gIGdldFBhZ2VTdGFydCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhZ2luZyA/ICh0aGlzLmRhdGFQcm92aWRlci5wYWdlIC0gMSkgKiB0aGlzLmRhdGFQcm92aWRlci5wYWdlU2l6ZSA6IDA7XHJcbiAgfVxyXG5cclxuICBnZXRQYWdlRW5kKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGFnaW5nICYmIHRoaXMuZGF0YVByb3ZpZGVyLnBhZ2VTaXplID4gLTEgPyB0aGlzLmdldFBhZ2VTdGFydCgpICsgdGhpcy5kYXRhUHJvdmlkZXIucGFnZVNpemUgOiB0aGlzLnJvd3MubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgZ2V0Um93Q29udHJvbEZvcm0oaSk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gPEZvcm1BcnJheT50aGlzLnRhYmxlRm9ybS5jb250cm9sc1sncm93cyddO1xyXG4gICAgcmV0dXJuIHRhYmxlRm9ybVJvd3MuY29udHJvbHNbaV07XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlckNsaWNrKGNvbHVtbiwgZmlsdGVyKSB7XHJcbiAgICBpZiAoZmlsdGVyLnJhbmdlICYmICFjb2x1bW4uY2FsZW5kYXJTaG93KSB7XHJcbiAgICAgIGNvbHVtbi5jYWxlbmRlclNob3cgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSAmJiBjb2x1bW4ubXVsdGlwbGUpIHtcclxuICAgICAgaWYgKH5jb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBmaWx0ZXJcclxuICAgICAgICBjb2x1bW4uZmlsdGVyLnNwbGljZShjb2x1bW4uZmlsdGVyLmluZGV4T2YoZmlsdGVyKSwgMSk7XHJcbiAgICAgICAgaWYgKGZpbHRlci5yYW5nZSkge1xyXG4gICAgICAgICAgY29sdW1uLmNhbGVuZGVyU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBjb2x1bW4uZmlsdGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQWRkIGZpbHRlclxyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChmaWx0ZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGNvbHVtbi5tdWx0aXBsZSkge1xyXG4gICAgICBjb2x1bW4uZmlsdGVyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIGNvbHVtbi5maWx0ZXIucHVzaChIZWxwZXJzLmlzQmxhbmsoZmlsdGVyLnZhbHVlKSA/IGZpbHRlciA6IGZpbHRlci52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2x1bW4uZmlsdGVyID0gSGVscGVycy5pc0JsYW5rKGZpbHRlci52YWx1ZSkgPyBmaWx0ZXIgOiBmaWx0ZXIudmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBvbkZpbHRlckNsZWFyKGNvbHVtbjogYW55KTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29sdW1uLmZpbHRlciA9IG51bGw7XHJcbiAgICAgIGNvbHVtbi5mcmVldGV4dEZpbHRlciA9IG51bGw7XHJcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2UoKTtcclxuICAgICAgaWYgKGNvbHVtbi5vcmlnaW5hbE9wdGlvbnMpIHtcclxuICAgICAgICBjb2x1bW4ub3B0aW9ucyA9IGNvbHVtbi5vcmlnaW5hbE9wdGlvbnM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJBbGxTb3J0QW5kRmlsdGVycygpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5maWx0ZXJpbmcpIHtcclxuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xyXG4gICAgICAgIGNvbHVtbi5maWx0ZXIgPSBudWxsO1xyXG4gICAgICAgIGNvbHVtbi5zb3J0ID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgdXBkYXRlcyB0aGUgcm93IGRhdGEgdG8gcmVmbGVjdCB0aGUgYWN0aXZlIGZpbHRlcnMuXHJcbiAgICovXHJcbiAgb25GaWx0ZXJDaGFuZ2UoZXZlbnQ/OiBFdmVudCkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmZpbHRlcmluZykge1xyXG4gICAgICAvLyBBcnJheSBvZiBmaWx0ZXJzXHJcbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKChjb2wpID0+ICFIZWxwZXJzLmlzRW1wdHkoY29sLmZpbHRlcikpO1xyXG4gICAgICBpZiAoZmlsdGVycy5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgcXVlcnkgPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBmaWx0ZXJzKSB7XHJcbiAgICAgICAgICBpZiAoSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5tYXRjaCkpIHtcclxuICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0gKHZhbHVlLCByZWNvcmQpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gY29sdW1uLm1hdGNoKHJlY29yZCwgY29sdW1uLmZpbHRlcik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5wcmVGaWx0ZXIgJiYgSGVscGVycy5pc0Z1bmN0aW9uKGNvbHVtbi5wcmVGaWx0ZXIpKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgcXVlcnksIGNvbHVtbi5wcmVGaWx0ZXIodGhpcy5lc2NhcGVDaGFyYWN0ZXJzKGNvbHVtbi5maWx0ZXIpKSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uLmZpbHRlcikpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGZpbHRlcnMgYXJlIGFuIGFycmF5IChtdWx0aS1zZWxlY3QpLCBjaGVjayB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGNvbHVtbi5maWx0ZXI7XHJcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYW4gYXJyYXkgb2Yge3ZhbHVlOiAnJywgbGFiZWxzOiAnJ31cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnNbMF0udmFsdWUgfHwgb3B0aW9uc1swXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgIG9wdGlvbnMgPSBjb2x1bW4uZmlsdGVyLm1hcCgob3B0KSA9PiBvcHQudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHsgYW55OiBvcHRpb25zIH07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi50eXBlICYmIGNvbHVtbi50eXBlID09PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXIuc3RhcnREYXRlICYmIGNvbHVtbi5maWx0ZXIuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIG1pbjogZGF0ZUZucy5zdGFydE9mRGF5KGNvbHVtbi5maWx0ZXIuc3RhcnREYXRlKSxcclxuICAgICAgICAgICAgICAgIG1heDogZGF0ZUZucy5zdGFydE9mRGF5KGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZEYXkoY29sdW1uLmZpbHRlci5lbmREYXRlKSwgMSkpLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcXVlcnlbY29sdW1uLm5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgbWluOiBjb2x1bW4uZmlsdGVyLm1pbiA/IGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLCBjb2x1bW4uZmlsdGVyLm1pbikgOiBkYXRlRm5zLnN0YXJ0T2ZUb2RheSgpLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBjb2x1bW4uZmlsdGVyLm1heCA/IGRhdGVGbnMuYWRkRGF5cyhkYXRlRm5zLnN0YXJ0T2ZUb21vcnJvdygpLCBjb2x1bW4uZmlsdGVyLm1heCkgOiBkYXRlRm5zLnN0YXJ0T2ZUb21vcnJvdygpLFxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5W2NvbHVtbi5uYW1lXSA9IGNvbHVtbi5maWx0ZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZmlsdGVyaW5nKSkge1xyXG4gICAgICAgICAgdGhpcy5jb25maWcuZmlsdGVyaW5nKHF1ZXJ5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLmZpbHRlciA9IHF1ZXJ5O1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9kYXRhUHJvdmlkZXIuZmlsdGVyID0ge307XHJcbiAgICAgIH1cclxuICAgICAgLy8gVHJpY2tsZSBkb3duIHRvIGtlZXAgc29ydFxyXG4gICAgICAvLyB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcclxuICAgICAgdGhpcy5maXJlVGFibGVDaGFuZ2VFdmVudCgpO1xyXG5cclxuICAgICAgLy8gSWYgcGFnaW5nLCByZXNldCBwYWdlXHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wYWdpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3Rpb25TdHlsZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXNjYXBlQ2hhcmFjdGVycyhmaWx0ZXIpIHtcclxuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZmlsdGVyLnJlcGxhY2UoLycvZywgJ1xcJ1xcJycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbHRlcjtcclxuICB9XHJcblxyXG4gIGlzRmlsdGVyQWN0aXZlKGNvbHVtbiwgZmlsdGVyKTogYm9vbGVhbiB7XHJcbiAgICAvLyBUT0RPOiBUaGlzIG5lZWRzIHRvIGJlIHJlZmFjdG9yZWRcclxuICAgIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgaWYgKGNvbHVtbiAmJiAhSGVscGVycy5pc0JsYW5rKGNvbHVtbi5maWx0ZXIpICYmICFIZWxwZXJzLmlzQmxhbmsoZmlsdGVyKSkge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW4uZmlsdGVyKSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyLnNvbWUoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubGFiZWwgPT09IGZpbHRlci5sYWJlbDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIuaW5jbHVkZXMoZmlsdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4uZmlsdGVyID09PSB0eXBlb2YgZmlsdGVyKSB7XHJcbiAgICAgICAgICBpc0FjdGl2ZSA9IGNvbHVtbi5maWx0ZXIgPT09IGZpbHRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXNBY3RpdmUgPSBjb2x1bW4uZmlsdGVyID09PSBmaWx0ZXIudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNBY3RpdmU7XHJcbiAgfVxyXG5cclxuICBvblNvcnRDaGFuZ2UoY29sdW1uKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uID0gY29sdW1uO1xyXG4gICAgY29uc3Qgc29ydGVkQ29sdW1uczogYW55ID0gdGhpcy5jb2x1bW5zLmZpbHRlcigodGhpc0NvbHVtbikgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpc0NvbHVtbi5zb3J0ICYmIHRoaXNDb2x1bW4gIT09IHRoaXMuY3VycmVudFNvcnRDb2x1bW47XHJcbiAgICB9KTtcclxuICAgIGZvciAoY29uc3Qgc29ydGVkQ29sdW1uIG9mIHNvcnRlZENvbHVtbnMpIHtcclxuICAgICAgc29ydGVkQ29sdW1uLnNvcnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb2x1bW4pIHtcclxuICAgICAgaWYgKEhlbHBlcnMuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5zb3J0aW5nKSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNvcnRpbmcoKTtcclxuICAgICAgfSBlbHNlIGlmIChIZWxwZXJzLmlzRnVuY3Rpb24oY29sdW1uLnByZVNvcnQpKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbXS5jb25jYXQoY29sdW1uLnByZVNvcnQoY29sdW1uKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnNvcnQgPSBbeyBmaWVsZDogY29sdW1uLmNvbXBhcmUgfHwgY29sdW1uLm5hbWUsIHJldmVyc2U6IGNvbHVtbi5zb3J0ID09PSAnZGVzYycgfV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBGaXJlIHRhYmxlIGNoYW5nZSBldmVudFxyXG4gICAgLy8gdGhpcy5maXJlVGFibGVDaGFuZ2VFdmVudCgpO1xyXG5cclxuICAgIC8vIElmIHBhZ2luZywgcmVzZXQgcGFnZVxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnBhZ2luZykge1xyXG4gICAgICB0aGlzLmNvbmZpZy5wYWdpbmcuY3VycmVudCA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBzZWxlY3Rpb24gb24gc29ydCBjaGFuZ2UgaWYgc2VsZWN0aW9uIGlzIG9uXHJcbiAgICBpZiAodGhpcy5jb25maWcucm93U2VsZWN0aW9uU3R5bGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgdGhpcy5zZWxlY3RBbGwoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlyZVRhYmxlQ2hhbmdlRXZlbnQoKSB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgYSB0YWJsZSBjaGFuZ2Ugb2JqZWN0XHJcbiAgICBjb25zdCBvblRhYmxlQ2hhbmdlOiBhbnkgPSB7fTtcclxuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmNvbHVtbnMuZmlsdGVyKChjb2wpID0+IGNvbC5maWx0ZXIgJiYgY29sLmZpbHRlci5sZW5ndGgpO1xyXG4gICAgb25UYWJsZUNoYW5nZS5maWx0ZXIgPSBmaWx0ZXJzLmxlbmd0aCA/IGZpbHRlcnMgOiBmYWxzZTtcclxuICAgIG9uVGFibGVDaGFuZ2Uuc29ydCA9IHRoaXMuY3VycmVudFNvcnRDb2x1bW4gPyB0aGlzLmN1cnJlbnRTb3J0Q29sdW1uIDogZmFsc2U7XHJcbiAgICBvblRhYmxlQ2hhbmdlLnJvd3MgPSB0aGlzLnJvd3M7XHJcblxyXG4gICAgLy8gRW1pdCBldmVudFxyXG4gICAgdGhpcy5vblRhYmxlQ2hhbmdlLmVtaXQob25UYWJsZUNoYW5nZSk7XHJcbiAgfVxyXG5cclxuICBmaW5kQ29sdW1uSW5kZXgodmFsdWUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbHVtbnNbaV0ubmFtZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBvbk9yZGVyQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICBjb25zdCBvbGRJbmRleCA9IHRoaXMuZmluZENvbHVtbkluZGV4KGV2ZW50LmZpcnN0Lm5hbWUpO1xyXG4gICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLmZpbmRDb2x1bW5JbmRleChldmVudC5zZWNvbmQubmFtZSk7XHJcbiAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLmNvbHVtbnMuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XHJcbiAgICB0aGlzLm9uU29ydENoYW5nZSh0aGlzLmN1cnJlbnRTb3J0Q29sdW1uKTtcclxuICB9XHJcblxyXG4gIGV4cGFuZEFsbE9uUGFnZShleHBhbmRlZCkge1xyXG4gICAgdGhpcy5jb25maWcuZXhwYW5kQWxsID0gIWV4cGFuZGVkO1xyXG4gICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5kYXRhUHJvdmlkZXIubGlzdCkge1xyXG4gICAgICByb3cuX2V4cGFuZGVkID0gdGhpcy5jb25maWcuZXhwYW5kQWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGFnZShkYXRhPzogYW55KSB7XHJcbiAgICBpZiAoIXRoaXMubWFzdGVyKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0QWxsKGZhbHNlKTtcclxuICAgICAgLy8gT25seSBzaG93IHRoZSBzZWxlY3QgYWxsIG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBuZXcgcGFnZSBzZWxlY3RlZCBhdCBhIHRpbWVcclxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xyXG4gICAgICB0aGlzLnNob3dTZWxlY3RBbGxNZXNzYWdlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgICAgLy8gdGhpcy5wYWdlZERhdGEgPSB0aGlzLnJvd3Muc2xpY2UodGhpcy5nZXRQYWdlU3RhcnQoKSwgdGhpcy5nZXRQYWdlRW5kKCkpO1xyXG4gICAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLnBhZ2VkRGF0YSkge1xyXG4gICAgICAgIHJvdy5fc2VsZWN0ZWQgPSB0aGlzLm1hc3RlcjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kYXRhUHJvdmlkZXIubGlzdC5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcclxuICAgICAgdGhpcy5wYWdlU2VsZWN0ZWQgPSB0aGlzLnBhZ2VkRGF0YS5maWx0ZXIoKHIpID0+IHIuX3NlbGVjdGVkKTtcclxuICAgICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XHJcbiAgICAgIC8vIE9ubHkgc2hvdyB0aGUgc2VsZWN0IGFsbCBtZXNzYWdlIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgbmV3IHBhZ2Ugc2VsZWN0ZWQgYXQgYSB0aW1lXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQrKztcclxuICAgICAgdGhpcy5zaG93U2VsZWN0QWxsTWVzc2FnZSA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPT09IDEgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggIT09IHRoaXMuZGF0YVByb3ZpZGVyLnRvdGFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0QWxsKHZhbHVlKSB7XHJcbiAgICB0aGlzLm1hc3RlciA9IHZhbHVlO1xyXG4gICAgdGhpcy5pbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLmRhdGFQcm92aWRlci5saXN0KSB7XHJcbiAgICAgIHJvdy5fc2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZSA/IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QgOiBbXTtcclxuICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPSB0aGlzLnNlbGVjdGVkUGFnZUNvdW50ID4gMCA/IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgLSAxIDogMDtcclxuICAgIHRoaXMucm93U2VsZWN0SGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgcm93U2VsZWN0SGFuZGxlcihkYXRhPzogYW55KSB7XHJcbiAgICAvLyB0aGlzLnBhZ2VkRGF0YSA9IHRoaXMucm93cy5zbGljZSh0aGlzLmdldFBhZ2VTdGFydCgpLCB0aGlzLmdldFBhZ2VFbmQoKSk7XHJcbiAgICB0aGlzLnBhZ2VTZWxlY3RlZCA9IHRoaXMucGFnZWREYXRhLmZpbHRlcigocikgPT4gci5fc2VsZWN0ZWQpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0YVByb3ZpZGVyLmxpc3QuZmlsdGVyKChyKSA9PiByLl9zZWxlY3RlZCk7XHJcbiAgICBpZiAodGhpcy5wYWdlU2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMubWFzdGVyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VTZWxlY3RlZC5sZW5ndGggPT09IHRoaXMucGFnZWREYXRhLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLm1hc3RlciA9IHRydWU7XHJcbiAgICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tYXN0ZXIgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIEJyZWFraW5nIHRoZSBzZWxlY3RlZCBwYWdlIGNvdW50XHJcbiAgICAgIHRoaXMuc2hvd1NlbGVjdEFsbE1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCA9IHRoaXMuc2VsZWN0ZWRQYWdlQ291bnQgPiAwID8gdGhpcy5zZWxlY3RlZFBhZ2VDb3VudCAtIDEgOiAwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0U2VsZWN0ZWQodGhpcy5zZWxlY3RlZCk7XHJcbiAgfVxyXG5cclxuICBlbWl0U2VsZWN0ZWQoc2VsZWN0ZWQpIHtcclxuICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IGxlbmd0aDogc2VsZWN0ZWQubGVuZ3RoLCBzZWxlY3RlZCB9KTtcclxuICB9XHJcblxyXG4gIHJvd0NsaWNrSGFuZGxlcihyb3cpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5yb3dTZWxlY3QpIHtcclxuICAgICAgdGhpcy5hY3RpdmVJZCA9IHJvdy5pZCB8fCAwO1xyXG4gICAgICB0aGlzLm9uUm93Q2xpY2suZW1pdChyb3cpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdE9wdGlvbnMoY29sdW1uKSB7XHJcbiAgICAvLyBUT0RPIC0gbmVlZHMgdG8gY29tZSBmcm9tIGxhYmVsIHNlcnZpY2UgLSBodHRwczovL2dpdGh1Yi5jb20vYnVsbGhvcm4vbm92by1lbGVtZW50cy9pc3N1ZXMvMTE2XHJcbiAgICBjb25zdCBvcHRzOiBhbnlbXSA9IFtcclxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFEYXksIG1pbjogLTEsIG1heDogMCB9LFxyXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0N0RheXMsIG1pbjogLTcsIG1heDogMCB9LFxyXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5wYXN0MzBEYXlzLCBtaW46IC0zMCwgbWF4OiAwIH0sXHJcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLnBhc3Q5MERheXMsIG1pbjogLTkwLCBtYXg6IDAgfSxcclxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMucGFzdDFZZWFyLCBtaW46IC0zNjYsIG1heDogMCB9LFxyXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MURheSwgbWluOiAwLCBtYXg6IDEgfSxcclxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDdEYXlzLCBtaW46IDAsIG1heDogNyB9LFxyXG4gICAgICB7IGxhYmVsOiB0aGlzLmxhYmVscy5uZXh0MzBEYXlzLCBtaW46IDAsIG1heDogMzAgfSxcclxuICAgICAgeyBsYWJlbDogdGhpcy5sYWJlbHMubmV4dDkwRGF5cywgbWluOiAwLCBtYXg6IDkwIH0sXHJcbiAgICAgIHsgbGFiZWw6IHRoaXMubGFiZWxzLm5leHQxWWVhciwgbWluOiAwLCBtYXg6IDM2NiB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5yYW5nZSkge1xyXG4gICAgICBvcHRzLnB1c2goe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxhYmVscy5jdXN0b21EYXRlUmFuZ2UsXHJcbiAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdHM7XHJcbiAgfVxyXG5cclxuICBvbkNhbGVuZGVyU2VsZWN0KGNvbHVtbiwgZXZlbnQpOiB2b2lkIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQuc3RhcnREYXRlICYmIGV2ZW50LmVuZERhdGUpIHtcclxuICAgICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9XHJcblxyXG4gIG9uRmlsdGVyS2V5d29yZHMoY29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5maWx0ZXJpbmcgJiYgY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJLZXl3b3JkcyA9IGNvbmZpZy5maWx0ZXJpbmcuZnJlZXRleHRGaWx0ZXIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKCFjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucykge1xyXG4gICAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zID0gY29uZmlnLmZpbHRlcmluZy5vcHRpb25zO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBjb25maWcuZmlsdGVyaW5nLm9yaWdpbmFsT3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbiAmJiBvcHRpb24ubGFiZWwgPyBvcHRpb24ubGFiZWwgOiBvcHRpb247XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IHZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZmlsdGVyS2V5d29yZHMpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAofnZhbHVlLmluZGV4T2YoZmlsdGVyS2V5d29yZHMpIHx8IH52YWx1ZS5pbmRleE9mKGZpbHRlcktleXdvcmRzKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucyA9IG5ld09wdGlvbnM7XHJcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcuZmlsdGVyID0gY29uZmlnLmZpbHRlcmluZy5mcmVldGV4dEZpbHRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbmZpZy5maWx0ZXJpbmcub3B0aW9ucyA9IGNvbmZpZy5maWx0ZXJpbmcub3JpZ2luYWxPcHRpb25zO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFNldHMgdGhlIFRhYmxlIGludG8gRURJVCBtb2RlLCBiYXNlZCBvbiB0aGUgcm93L2NvbHVtbiBwYXNzZWQgeW91IGNhbiBlbnRlciBpbiBhIGZldyBzdGF0ZXNcclxuICAgKiAoMSkgc2V0VGFibGVFZGl0KCkgLSBkb24ndCBwYXNzIGFueSB0byBwdXQgdGhlIEZVTEwgdGFibGUgaW50byBlZGl0IG1vZGVcclxuICAgKiAoMikgc2V0VGFibGVFZGl0KDEpIC0gcGFzcyBvbmx5IHJvdyB0byBwdXQgdGhhdCBGVUxMIHJvdyBvZiB0aGUgdGFibGUgaW50byBlZGl0IG1vZGVcclxuICAgKiAoMykgc2V0VGFibGVFZGl0KDEsIDEpIC0gcGFzcyByb3cgYW5kIGNvbHVtbiB0byBwdXQgdGhhdCBjb2x1bW4gb2YgdGhlIHJvdyBvZiB0aGUgdGFibGUgaW50byBlZGl0IG1vZGVcclxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFRhYmxlRWRpdChyb3dOdW1iZXI/OiBudW1iZXIsIGNvbHVtbk51bWJlcj86IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RlID0gTm92b1RhYmxlTW9kZS5FRElUO1xyXG4gICAgdGhpcy5fZGF0YVByb3ZpZGVyLmVkaXQoKTtcclxuICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93LCByb3dJbmRleCkgPT4ge1xyXG4gICAgICByb3cuX2VkaXRpbmcgPSByb3cuX2VkaXRpbmcgfHwge307XHJcbiAgICAgIHRoaXMuY29sdW1ucy5mb3JFYWNoKChjb2x1bW4sIGNvbHVtbkluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbi52aWV3T25seSkge1xyXG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoSGVscGVycy5pc0VtcHR5KHJvd051bWJlcikgJiYgSGVscGVycy5pc0VtcHR5KGNvbHVtbk51bWJlcikpIHtcclxuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIUhlbHBlcnMuaXNFbXB0eShyb3dOdW1iZXIpICYmIHJvd0luZGV4ID09PSBOdW1iZXIocm93TnVtYmVyKSAmJiBIZWxwZXJzLmlzRW1wdHkoY29sdW1uTnVtYmVyKSkge1xyXG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICFIZWxwZXJzLmlzRW1wdHkocm93TnVtYmVyKSAmJlxyXG4gICAgICAgICAgIUhlbHBlcnMuaXNFbXB0eShjb2x1bW5OdW1iZXIpICYmXHJcbiAgICAgICAgICByb3dJbmRleCA9PT0gTnVtYmVyKHJvd051bWJlcikgJiZcclxuICAgICAgICAgIGNvbHVtbkluZGV4ID09PSBOdW1iZXIoY29sdW1uTnVtYmVyKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcm93Ll9lZGl0aW5nW2NvbHVtbi5uYW1lXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gTGVhdmVzIGVkaXQgbW9kZSBmb3IgdGhlIFRhYmxlIGFuZCBwdXRzIGV2ZXJ5dGhpbmcgYmFjayB0byBWSUVXIG9ubHlcclxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxyXG4gICAqIEBwYXJhbSBjYW5jZWwgLSB3aGV0aGVyIG9yIG5vdCB0byBzYXZlIGRhdGEgb3IgdW5kb1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbGVhdmVFZGl0TW9kZShjYW5jZWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMubW9kZSA9IE5vdm9UYWJsZU1vZGUuVklFVztcclxuICAgIHRoaXMuX3Jvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgIHJvdy5fZWRpdGluZyA9IHJvdy5fZWRpdGluZyB8fCB7fTtcclxuICAgICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xyXG4gICAgICAgIHJvdy5fZWRpdGluZ1tjb2x1bW4ubmFtZV0gPSBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmIChjYW5jZWwpIHtcclxuICAgICAgdGhpcy5fZGF0YVByb3ZpZGVyLnVuZG8oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2RhdGFQcm92aWRlci5jb21taXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBuZXcgcm93IGludG8gdGhlIHRhYmxlIHRvIGJlIGVkaXRlZCwgY2FuIGJlIGNhbGxlZCBmcm9tIGEgbG9jYWwgcmVmZXJlbmNlIG9mIHRoZSB0YWJsZSBpbiB5b3VyIHRlbXBsYXRlXHJcbiAgICogQG1lbWJlck9mIE5vdm9UYWJsZUVsZW1lbnRcclxuICAgKi9cclxuICBhZGRFZGl0YWJsZVJvdyhkZWZhdWx0VmFsdWU6IGFueSA9IHt9KTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWJsZUZvcm1Sb3dzID0gPEZvcm1BcnJheT50aGlzLnRhYmxlRm9ybS5jb250cm9sc1sncm93cyddO1xyXG4gICAgY29uc3Qgcm93OiBhbnkgPSB7fTtcclxuICAgIGNvbnN0IHJvd0NvbnRyb2xzID0gW107XHJcbiAgICByb3cuY29udHJvbHMgPSB7fTtcclxuICAgIHJvdy5fZWRpdGluZyA9IHt9O1xyXG4gICAgcm93LnJvd0lkID0gdGhpcy5fcm93cy5sZW5ndGggKyAxO1xyXG4gICAgdGhpcy5jb2x1bW5zLmZvckVhY2goKGNvbHVtbikgPT4ge1xyXG4gICAgICAvLyBVc2UgdGhlIGNvbnRyb2wgcGFzc2VkIG9yIHVzZSBhIFJlYWRPbmx5Q29udHJvbCBzbyB0aGF0IHRoZSBmb3JtIGhhcyB0aGUgdmFsdWVzXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb2x1bW4uZWRpdG9yQ29uZmlnXHJcbiAgICAgICAgPyBDb250cm9sRmFjdG9yeS5jcmVhdGUoY29sdW1uLmVkaXRvclR5cGUsIGNvbHVtbi5lZGl0b3JDb25maWcpXHJcbiAgICAgICAgOiBuZXcgUmVhZE9ubHlDb250cm9sKHsga2V5OiBjb2x1bW4ubmFtZSB9KTtcclxuICAgICAgY29udHJvbC52YWx1ZSA9IG51bGw7IC8vIHJlbW92ZSBjb3BpZWQgY29sdW1uIHZhbHVlXHJcbiAgICAgIHJvdy5jb250cm9sc1tjb2x1bW4ubmFtZV0gPSBjb250cm9sO1xyXG4gICAgICByb3cuX2VkaXRpbmdbY29sdW1uLm5hbWVdID0gIWNvbHVtbi52aWV3T25seTtcclxuICAgICAgcm93Q29udHJvbHMucHVzaChjb250cm9sKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhyb3dDb250cm9scywgZGVmYXVsdFZhbHVlLCBmYWxzZSk7XHJcbiAgICB0YWJsZUZvcm1Sb3dzLnB1c2godGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAocm93Q29udHJvbHMpKTtcclxuICAgIHRoaXMuX3Jvd3MucHVzaChyb3cpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFZhbGlkYXRlcyB0aGUgRm9ybSBpbnNpZGUgb2YgdGhlIFRhYmxlLCBpZiB0aGVyZSBhcmUgZXJyb3JzIGl0IHdpbGwgZGlzcGxheS9yZXR1cm4gdGhlIGVycm9ycyBmb3IgZWFjaCByb3cuXHJcbiAgICogSWYgdGhlcmUgYXJlIG5vIGVycm9ycywgdGhlbiBpdCB3aWxsIHJldHVybiBPTkxZIHRoZSBjaGFuZ2VkIGRhdGEgZm9yIGVhY2ggcm93LCB0aGUgZGF0YSByZXR1cm5lZCB3aWxsIGJlIGluIHRoZSBmb3JtOlxyXG4gICAqIHsgaWQ6IElEX09GX1JFQ09SRCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgdXBkYXRlZFxyXG4gICAqIHsgaWQ6IHVuZGVmaW5lZCwga2V5OiB2YWx1ZSB9IC0tIGRhdGEgdGhhdCB3YXMgYWRkZWRcclxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxyXG4gICAqL1xyXG4gIHZhbGlkYXRlQW5kR2V0VXBkYXRlZERhdGEoKTogeyBjaGFuZ2VkPzogYW55W107IGVycm9ycz86IHsgZXJyb3JzOiBhbnk7IHJvdzogYW55OyBpbmRleDogbnVtYmVyIH1bXSB9IHtcclxuICAgIGlmICh0aGlzLnRhYmxlRm9ybSAmJiB0aGlzLnRhYmxlRm9ybS5jb250cm9scyAmJiB0aGlzLnRhYmxlRm9ybS5jb250cm9sc1sncm93cyddKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZWRSb3dzID0gW107XHJcbiAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xyXG4gICAgICAvLyBHbyBvdmVyIHRoZSBGb3JtQXJyYXkncyBjb250cm9sc1xyXG4gICAgICAodGhpcy50YWJsZUZvcm0uY29udHJvbHNbJ3Jvd3MnXSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmZvckVhY2goKGZvcm1Hcm91cDogRm9ybUdyb3VwLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IGNoYW5nZWRSb3cgPSBudWxsO1xyXG4gICAgICAgIGxldCBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgLy8gR28gb3ZlciB0aGUgZm9ybSBncm91cCBjb250cm9sc1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNba2V5XTtcclxuICAgICAgICAgIC8vIEhhbmRsZSB2YWx1ZSBjaGFuZ2luZ1xyXG4gICAgICAgICAgaWYgKGNvbnRyb2wgJiYgY29udHJvbC5kaXJ0eSAmJiAhY29udHJvbC5lcnJvcnMpIHtcclxuICAgICAgICAgICAgaWYgKCFjaGFuZ2VkUm93KSB7XHJcbiAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBJRCwgc28gd2UgaGF2ZSBzb21lIGtleSB0byBzYXZlIGFnYWluc3RcclxuICAgICAgICAgICAgICBjaGFuZ2VkUm93ID0ge307XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jvd3NbaW5kZXhdLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VkUm93LmlkID0gdGhpcy5fcm93c1tpbmRleF0uaWQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElmIGRpcnR5LCBncmFiIHZhbHVlIG9mZiB0aGUgZm9ybVxyXG4gICAgICAgICAgICBjaGFuZ2VkUm93W2tleV0gPSB0aGlzLnRhYmxlRm9ybS52YWx1ZVsncm93cyddW2luZGV4XVtrZXldO1xyXG4gICAgICAgICAgICAvLyBTZXQgdmFsdWUgYmFjayB0byByb3cgKHNob3VsZCBiZSBhbHJlYWR5IGRvbmUgdmlhIHRoZSBzZXJ2ZXIgY2FsbCwgYnV0IGRvIGl0IGFueXdheSlcclxuICAgICAgICAgICAgdGhpcy5fcm93c1tpbmRleF1ba2V5XSA9IGNoYW5nZWRSb3dba2V5XTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbCAmJiBjb250cm9sLmVycm9ycykge1xyXG4gICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgICBlcnJvciA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yW2tleV0gPSBjb250cm9sLmVycm9ycztcclxuICAgICAgICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xyXG4gICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY2hhbmdlZFJvdykge1xyXG4gICAgICAgICAgY2hhbmdlZFJvd3MucHVzaChjaGFuZ2VkUm93KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICBlcnJvcnMucHVzaCh7IGVycm9yczogZXJyb3IsIHJvdzogdGhpcy5fcm93c1tpbmRleF0sIGluZGV4IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFJldHVybiBlcnJvcnMgaWYgYW55LCBvdGhlcndpc2UgcmV0dXJuIHRoZSBjaGFuZ2VkIHJvd3NcclxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4geyBjaGFuZ2VkOiBjaGFuZ2VkUm93cyB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IGVycm9ycyB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIFJlZnJlc2ggdGhlIGRhdGEgcHJvdmlkZXIgYW5kIGxlYXZlIGVkaXQgbW9kZVxyXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XHJcbiAgICovXHJcbiAgY2FuY2VsRWRpdGluZygpOiB2b2lkIHtcclxuICAgIHRoaXMubGVhdmVFZGl0TW9kZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoIHRoZSBkYXRhIHByb3ZpZGVyIGFuZCBsZWF2ZSBlZGl0IG1vZGVcclxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxyXG4gICAqL1xyXG4gIHNhdmVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5sZWF2ZUVkaXRNb2RlKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwbGF5cyBhIHRvYXN0IG1lc3NhZ2UgaW5zaWRlIG9mIHRoZSB0YWJsZVxyXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XHJcbiAgICovXHJcbiAgZGlzcGxheVRvYXN0TWVzc2FnZSh0b2FzdDogeyBpY29uOiBzdHJpbmc7IHRoZW1lOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZyB9LCBoaWRlRGVsYXk/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy50b2FzdCA9IHRvYXN0O1xyXG4gICAgaWYgKGhpZGVEZWxheSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZVRvYXN0TWVzc2FnZSgpLCBoaWRlRGVsYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIEZvcmNlIGhpZGUgdGhlIHRvYXN0IG1lc3NhZ2VcclxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxyXG4gICAqL1xyXG4gIGhpZGVUb2FzdE1lc3NhZ2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvYXN0ID0gbnVsbDtcclxuICAgIC8vIEhhY2sgdG8gbWFrZSB0aGUgdGFibGUgZGlzcGxheSBwcm9wZXJseSBhZnRlciBoaWRpbmcgdGhlIHRvYXN0XHJcbiAgICB0aGlzLmdyb3NzRmxhZ1RvQXZvaWRUaGVUYWJsZUZyb21CZWluZ1VnbHlXaGVuSGlkaW5nVGhlVG9hc3QgPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ3Jvc3NGbGFnVG9Bdm9pZFRoZVRhYmxlRnJvbUJlaW5nVWdseVdoZW5IaWRpbmdUaGVUb2FzdCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gZGlzcGxheSB0aGUgbG9hZGluZyBvdmVybGF5IG9uIHRoZSB0YWJsZVxyXG4gICAqIEBtZW1iZXJPZiBOb3ZvVGFibGVFbGVtZW50XHJcbiAgICovXHJcbiAgdG9nZ2xlTG9hZGluZyhzaG93OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSBzaG93O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIGhpZGUgYSBjb2x1bW4gaW4gZWRpdCBvciB2aWV3IG1vZGVcclxuICAgKiBAbWVtYmVyT2YgTm92b1RhYmxlRWxlbWVudFxyXG4gICAqL1xyXG4gIGlzQ29sdW1uSGlkZGVuKGNvbHVtbjogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5lZGl0aW5nID8gISFjb2x1bW4uaGlkZUNvbHVtbk9uRWRpdCA6ICEhY29sdW1uLmhpZGVDb2x1bW5PblZpZXc7XHJcbiAgfVxyXG59XHJcbiJdfQ==