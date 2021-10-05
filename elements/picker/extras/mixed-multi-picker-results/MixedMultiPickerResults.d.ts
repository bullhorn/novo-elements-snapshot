import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Subject } from 'rxjs';
export interface IMixedMultiPickerOption {
    value: string;
    label: string;
    secondaryOptions?: {
        value: string;
        label: string;
        filterValue?: any;
    }[];
    getSecondaryOptionsAsync?(): Promise<{
        value: string;
        label: string;
    }[]>;
    clearSecondaryOptions?: Subject<any>;
    showSearchOnSecondaryOptions?: boolean;
}
export declare class MixedMultiPickerResults extends BasePickerResults implements OnDestroy {
    private renderer;
    labels: NovoLabelService;
    private inputElement;
    private listElement;
    selectedPrimaryOption: IMixedMultiPickerOption;
    searchTerm: string;
    placeholder: string;
    emptyOptionsLabel: string;
    private keyboardSubscription;
    private internalMap;
    set term(value: any);
    get options(): any;
    constructor(element: ElementRef, renderer: Renderer2, labels: NovoLabelService, ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    selectPrimaryOption(primaryOption: IMixedMultiPickerOption, event?: MouseEvent): void;
    selectMatch(event?: MouseEvent): boolean;
    clearSearchTerm(event: MouseEvent): void;
    optionHasSecondaryOptions(primaryOption: IMixedMultiPickerOption): boolean;
    shouldShowSearchBox(primaryOption: IMixedMultiPickerOption): boolean;
    clearPrimaryOption(primaryOption: IMixedMultiPickerOption): void;
    filterData(): {
        value: string;
        label: string;
    }[];
    private filter;
    private getNewMatches;
}
