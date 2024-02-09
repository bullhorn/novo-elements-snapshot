import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { OutsideClick } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export interface NovoDropdownSearchConfig {
    placeholder: string;
    emptyMessage: string;
    debounce: number;
    compare: (query: string, item: any) => boolean;
}
export interface NovoDropdownFooterConfig {
    align?: 'left' | 'right';
    links?: NovoDropdownFooterLink[];
}
export interface NovoDropdownFooterLink {
    label: string;
    callback: (event: MouseEvent) => void;
}
export declare class NovoCategoryDropdownElement extends OutsideClick implements OnInit, OnDestroy {
    labels: NovoLabelService;
    _query: string;
    _categoryMap: any;
    _categories: string[];
    clickHandler: Function;
    _masterCategoryMap: any;
    _queryTimeout: ReturnType<typeof setTimeout>;
    persistSelection: boolean;
    closeOnSelect: boolean;
    search: any;
    footer: any;
    _select: EventEmitter<any>;
    categorySelected: EventEmitter<any>;
    set categories(categories: any);
    constructor(element: ElementRef, labels: NovoLabelService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onKeyDown(event: KeyboardEvent): void;
    clearSelection(): void;
    select(event: MouseEvent, item: any): void;
    onCategorySelected(category: string): void;
    clearQuery(event: Event): void;
    queryCategories(query: string): void;
    executeClickCallback(event: MouseEvent, link: NovoDropdownFooterLink): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCategoryDropdownElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCategoryDropdownElement, "novo-category-dropdown", never, { "persistSelection": "persistSelection"; "closeOnSelect": "closeOnSelect"; "search": "search"; "footer": "footer"; "categories": "categories"; }, { "_select": "itemSelected"; "categorySelected": "categorySelected"; }, never, ["button"]>;
}
