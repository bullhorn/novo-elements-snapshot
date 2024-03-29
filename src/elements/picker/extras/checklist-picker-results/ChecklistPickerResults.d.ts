import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
export declare class ChecklistPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    filteredMatches: any;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    search(): Observable<any>;
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches: any): any;
    selectMatch(event: any, item: any): boolean;
}
