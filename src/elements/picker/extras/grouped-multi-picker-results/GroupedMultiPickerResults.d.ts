import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
export declare class GroupedMultiPickerResults extends BasePickerResults implements OnInit, OnDestroy {
    private renderer;
    labels: NovoLabelService;
    private inputElement;
    private listElement;
    selectedCategory: {
        value: string;
        label: string;
    };
    searchTerm: string;
    customFilterEnabled: boolean;
    customFilterLabel: string;
    placeholder: string;
    private keyboardSubscription;
    private internalMap;
    customFilterValue: any;
    set term(value: any);
    get categories(): any;
    constructor(element: ElementRef, renderer: Renderer2, labels: NovoLabelService, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setAllCategory(): void;
    selectCategory(category: {
        value: string;
        label: string;
    }): void;
    clearSearchTerm(event: MouseEvent): void;
    selectMatch(event?: MouseEvent, item?: {
        value: string;
        label: string;
    }): boolean;
    fireCustomFilter(value: boolean): void;
    filterData(): {
        value: string;
        label: string;
    }[];
    private getNewMatches;
    private filter;
}
