import { Observable } from 'rxjs';
export interface IDataTablePreferences {
    name: string;
    sort?: IDataTableSort;
    filter?: IDataTableFilter | IDataTableFilter[];
    where?: DataTableWhere;
    globalSearch?: any;
    pageSize?: number;
    displayedColumns?: string[];
    columnWidths?: {
        id: string;
        width: number;
    }[];
    savedSearchId?: number;
    savedSearchName?: string;
    savedSearchOwner?: DataTableSavedSearchOwner;
    appliedSearchType?: AppliedSearchType;
    hasUnsavedChanges?: boolean;
    unsavedChanges?: any;
}
export interface DataTableWhere {
    query: string;
    criteria?: AdaptiveCriteria;
    keywords?: string[];
    form: any;
}
export interface DataTableSavedSearchOwner {
    id: number;
    firstName: string;
    lastName: string;
}
export declare enum AppliedSearchType {
    Saved = "saved",
    Recent = "recent",
    None = "none"
}
export interface IDataTableColumn<T> {
    id: string;
    label?: string;
    labelIcon?: string;
    enabled?: boolean;
    type: 'text' | 'link' | 'link:tel' | 'link:mailto' | 'date' | 'datetime' | 'time' | 'currency' | 'bigdecimal' | 'number' | 'percent' | 'action' | 'expand';
    template?: string;
    format?: string | string[];
    disabled?: boolean;
    cellClass?: (row: T) => string;
    disabledFunc?: (row: T) => boolean;
    handlers?: {
        click?(event?: any): any;
    };
    width?: number;
    sortable?: boolean | IDataTableColumnSortConfig;
    filterable?: boolean | IDataTableColumnFilterConfig;
    resizable?: boolean;
    action?: {
        icon?: string;
        tooltip?: string;
        options?: {
            label: string;
            handlers: {
                click?(event?: any): any;
            };
            disabled?: boolean;
            disabledFunc?: (row: T) => boolean;
        }[];
    };
    attributes?: {
        [key: string]: any;
    };
    initialResizable?: {
        resizable: boolean;
        width: number;
    };
    rightAlignCellContent?: boolean;
    configuration?: any;
}
export interface IDataTablePaginationOptions {
    theme: 'basic' | 'standard' | 'basic-wide';
    page?: number;
    pageSize: number;
    pageSizeOptions: number[] | {
        value: string;
        label: string;
    }[];
    loading?: boolean;
    errorLoading?: boolean;
    onFooter?: boolean;
}
export interface IDataTableColumnSortConfig {
    transform?: Function;
}
export interface IDataTableColumnFilterConfig {
    type: 'text' | 'number' | 'date' | 'select' | 'multi-select' | 'custom';
    customTemplate?: string;
    useCustomHeader?: boolean;
    options?: string[] | IDataTableColumnFilterOption[];
    allowCustomRange?: boolean;
    transform?: Function;
}
export interface IDataTableColumnFilterOption {
    label: string;
    value?: any;
    min?: number;
    max?: number;
}
export interface IDataTableSearchOptions {
    placeholder?: string;
    tooltip?: string;
}
export interface IDataTableSortFilter {
    id: string;
    direction?: string;
    active?: boolean;
    filter?: string | boolean;
}
export interface IDataTableChangeEvent {
    sort?: IDataTableSort;
    filter?: IDataTableFilter | IDataTableFilter[];
    page?: number;
    pageSize?: number;
    globalSearch?: string;
    outsideFilter?: IDataTableFilter | IDataTableFilter[];
    where?: {
        query: string;
        form: any;
    };
    savedSearchName?: string;
    displayedColumns?: string[];
    appliedSearchType?: AppliedSearchType;
}
export interface IDataTableSelectionChangeEvent {
    selected: any[];
}
export interface IDataTableSelectionOption {
    label: 'none' | 'page' | 'pageSize' | 'sort' | 'filter' | 'globalSearch';
}
export interface IDataTablePaginationEvent {
    page: number;
    pageSize: number;
    length: number;
}
export interface IDataTableSort {
    id: string;
    value: string;
    transform?: Function;
}
export interface IDataTableFilter {
    id: string;
    value: string | string[];
    transform?: Function;
    type?: string;
    selectedOption?: Object;
}
export interface IDataTableService<T> {
    getTableResults(sort: IDataTableSort, filter: {
        id: string;
        value: string;
        transform?: Function;
    } | IDataTableFilter | IDataTableFilter[], page: number, pageSize: number, globalSearch?: string, outsideFilter?: any, where?: {
        query: string;
        form: any;
    }): Observable<{
        results: T[];
        total: number;
    }>;
}
export interface IDataTableCell<T> {
}
/**
 * Adaptive criteria syntax is a json representation of a search or query string that supports all current and future search formats.
 */
export interface AdaptiveQuery {
    criteria: AdaptiveCriteria;
    fields?: string;
    orderBy?: string | string[];
    pagination?: PaginationObject;
}
export interface PaginationObject {
    page: number;
    pageSize: number;
}
export type AdaptiveCriteria = AdaptiveCondition | AdaptiveConjunction;
/**
 * Only a single field is valid.
 * Combine multiple fields with conjunctions, not sibling properties.
 * If multiple sibling properties are used in a condition, errors may occur in translation.
 */
export interface AdaptiveCondition {
    [fieldName: string]: AdaptiveConditionOperatorObject;
}
/**
 * Only a single operator for a condition is valid.
 * Combine multiple operators with conjunctions, not sibling properties.
 * If multiple sibling operators are used in a condition, only the first will be used.
 */
export type AdaptiveConditionOperatorObject = {
    [K in AdaptiveOperator as `${K}`]?: AdaptiveValue;
};
export type AdaptiveValue = string | string[] | boolean | boolean[] | number | number[];
export type AdaptiveConjunction = AdaptiveAnd | AdaptiveOr | AdaptiveNot;
export interface AdaptiveAnd {
    and: Array<AdaptiveCriteria>;
}
export interface AdaptiveOr {
    or: Array<AdaptiveCriteria>;
}
export interface AdaptiveNot {
    not: AdaptiveCriteria;
}
export declare enum AdaptiveConjunctionNames {
    AND = "and",
    OR = "or",
    NOT = "not"
}
export declare enum AdaptiveOperator {
    EqualTo = "equalTo",
    In = "in",
    IncludeAny = "includeAny",
    IncludeAll = "includeAll",
    Is = "is",
    LessThan = "lt",
    LessThanEquals = "lte",
    GreaterThan = "gt",
    GreaterThanEquals = "gte",
    Like = "like",
    StartsWith = "startsWith",
    EndsWith = "endsWith",
    Radius = "radius"
}
