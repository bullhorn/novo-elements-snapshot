import { Observable } from 'rxjs';
export interface IDataTablePreferences {
    name: string;
    sort?: IDataTableSort;
    filter?: IDataTableFilter | IDataTableFilter[];
    globalSearch?: any;
    pageSize?: number;
    displayedColumns?: string[];
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
        click?({ originalEvent: MouseEvent, row: T }: {
            originalEvent: any;
            row: any;
        }): void;
        auxClick?({ originalEvent: MouseEvent, row: T }: {
            originalEvent: any;
            row: any;
        }): void;
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
                click({ originalEvent: MouseEvent, row: T }: {
                    originalEvent: any;
                    row: any;
                }): void;
                auxClick?({ originalEvent: MouseEvent, row: T }: {
                    originalEvent: any;
                    row: any;
                }): void;
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
    configuration?: object;
    target?: string;
    href?: string;
}
export interface IDataTablePaginationOptions {
    theme: 'basic' | 'standard' | 'basic-wide';
    page?: number;
    pageSize: number;
    pageSizeOptions: number[] | {
        value: string;
        label: string;
    }[];
}
export interface IDataTableColumnSortConfig {
    transform?: Function;
}
export interface IDataTableColumnFilterConfig {
    type: 'text' | 'number' | 'date' | 'select' | 'multi-select' | 'custom';
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
}
export interface IDataTableSelectionChangeEvent {
    selected: any[];
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
    } | IDataTableFilter | IDataTableFilter[], page: number, pageSize: number, globalSearch?: string, outsideFilter?: any): Observable<{
        results: T[];
        total: number;
    }>;
}
export interface IDataTableCell<T> {
}
