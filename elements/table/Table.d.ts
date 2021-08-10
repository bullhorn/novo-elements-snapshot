import { DoCheck, ElementRef, EventEmitter, QueryList } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { PagedArrayCollection } from '../../services/data-provider/PagedArrayCollection';
import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils/FormUtils';
export interface NovoTableConfig {
    paging?: {
        current: number;
        itemsPerPage: number;
        onPageChange: Function;
        rowOptions?: {
            value: number;
            label: string;
        }[];
        disablePageSelection?: boolean;
    };
    footers?: Array<{
        columns: Array<string>;
        method: string;
        labelColumn: string;
        label: string;
    }>;
    filtering?: boolean | any;
    sorting?: boolean | any;
    ordering?: boolean | Function;
    resizing?: boolean | Function;
    rowSelectionStyle?: string;
    rowSelect?: boolean;
    hasDetails?: boolean;
    detailsRenderer?: any;
    expandAll?: boolean;
    selectAllEnabled?: boolean;
}
export declare enum NovoTableMode {
    VIEW = 1,
    EDIT = 2
}
export declare class NovoTableElement implements DoCheck {
    labels: NovoLabelService;
    private formUtils;
    private builder;
    filterInputs: QueryList<ElementRef>;
    config: NovoTableConfig;
    columns: Array<any>;
    theme: string;
    skipSortAndFilterClear: boolean;
    mode: NovoTableMode;
    editable: boolean;
    rowIdentifier: string;
    name: string;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    onTableChange: EventEmitter<any>;
    _dataProvider: PagedArrayCollection<any>;
    _rows: Array<any>;
    selected: Array<any>;
    activeId: number;
    master: boolean;
    expandAll: boolean;
    indeterminate: boolean;
    lastPage: number;
    selectedPageCount: number;
    showSelectAllMessage: boolean;
    currentSortColumn: any;
    pagedData: Array<any>;
    pageSelected: any;
    toggledDropdownMap: any;
    NovoTableMode: typeof NovoTableMode;
    tableForm: FormGroup;
    toast: {
        theme: string;
        icon: string;
        message: string;
    };
    footers: any[];
    grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast: boolean;
    loading: boolean;
    set rows(rows: Array<any>);
    get rows(): Array<any>;
    set dataProvider(dp: any);
    get dataProvider(): any;
    get editing(): boolean;
    get formValue(): any;
    constructor(labels: NovoLabelService, formUtils: FormUtils, builder: FormBuilder);
    onDropdownToggled(event: any, column: any): void;
    focusInput(): void;
    onPageChange(event: any): void;
    getOptionDataAutomationId(option: any): any;
    setupColumnDefaults(): void;
    ngDoCheck(): void;
    getPageStart(): number;
    getPageEnd(): number;
    getRowControlForm(i: any): AbstractControl;
    onFilterClick(column: any, filter: any): void;
    onFilterClear(column: any): void;
    clearAllSortAndFilters(): void;
    /**
     * @description This method updates the row data to reflect the active filters.
     */
    onFilterChange(event?: Event): void;
    escapeCharacters(filter: any): any;
    isFilterActive(column: any, filter: any): boolean;
    onSortChange(column: any): void;
    fireTableChangeEvent(): void;
    findColumnIndex(value: any): number;
    onOrderChange(event: any): void;
    expandAllOnPage(expanded: any): void;
    selectPage(data?: any): void;
    selectAll(value: any): void;
    rowSelectHandler(data?: any): void;
    emitSelected(selected: any): void;
    rowClickHandler(row: any): void;
    getDefaultOptions(column: any): any[];
    onCalenderSelect(column: any, event: any): void;
    onFilterKeywords(config: any): void;
    /**
     * @description Sets the Table into EDIT mode, based on the row/column passed you can enter in a few states
     * (1) setTableEdit() - don't pass any to put the FULL table into edit mode
     * (2) setTableEdit(1) - pass only row to put that FULL row of the table into edit mode
     * (3) setTableEdit(1, 1) - pass row and column to put that column of the row of the table into edit mode
     * @memberOf NovoTableElement
     */
    setTableEdit(rowNumber?: number, columnNumber?: number): void;
    /**
     * @description Leaves edit mode for the Table and puts everything back to VIEW only
     * @memberOf NovoTableElement
     * @param cancel - whether or not to save data or undo
     */
    private leaveEditMode;
    /**
     * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
     * @memberOf NovoTableElement
     */
    addEditableRow(defaultValue?: any): void;
    /**
     * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
     * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
     * { id: ID_OF_RECORD, key: value } -- data that was updated
     * { id: undefined, key: value } -- data that was added
     * @memberOf NovoTableElement
     */
    validateAndGetUpdatedData(): {
        changed?: any[];
        errors?: {
            errors: any;
            row: any;
            index: number;
        }[];
    };
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    cancelEditing(): void;
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    saveChanges(): void;
    /**
     * @description Displays a toast message inside of the table
     * @memberOf NovoTableElement
     */
    displayToastMessage(toast: {
        icon: string;
        theme: string;
        message: string;
    }, hideDelay?: number): void;
    /**
     * @description Force hide the toast message
     * @memberOf NovoTableElement
     */
    hideToastMessage(): void;
    /**
     * @description display the loading overlay on the table
     * @memberOf NovoTableElement
     */
    toggleLoading(show: boolean): void;
    /**
     * @description hide a column in edit or view mode
     * @memberOf NovoTableElement
     */
    isColumnHidden(column: any): boolean;
}
