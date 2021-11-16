import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Observable } from 'rxjs';
/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ChecklistPickerResults, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ChecklistPickerResults, "checklist-picker-results", never, {}, {}, never, never>;
}

//# sourceMappingURL=ChecklistPickerResults.d.ts.map