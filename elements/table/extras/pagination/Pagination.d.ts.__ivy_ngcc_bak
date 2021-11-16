import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
interface Page {
    num: number;
    text: string;
    active: boolean;
}
export declare class Pagination implements OnInit, OnChanges {
    labels: NovoLabelService;
    page: number;
    totalItems: number;
    itemsPerPage: number;
    rowOptions: any;
    label: string;
    get disablePageSelection(): boolean;
    set disablePageSelection(val: boolean);
    pageChange: EventEmitter<any>;
    itemsPerPageChange: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    pageSelectDisabled: boolean;
    maxPagesDisplayed: number;
    totalPages: number;
    pages: Array<Page>;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    getDefaultRowOptions(): {
        value: number;
        label: string;
    }[];
    onPageSizeChanged(event: any): void;
    selectPage(page: number, event?: MouseEvent): void;
    noPrevious(): boolean;
    noNext(): boolean;
    makePage(num: number, text: string, isActive: boolean): Page;
    getPages(currentPage: number, totalPages: number): Page[];
    calculateTotalPages(): number;
}
export {};
