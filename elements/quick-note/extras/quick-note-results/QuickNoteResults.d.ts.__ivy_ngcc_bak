import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PickerResults } from '../../../picker/extras/picker-results/PickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export declare class QuickNoteResults extends PickerResults {
    labels: NovoLabelService;
    taggingMode: string;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get term(): any;
    set term(value: any);
    search(term: string, taggingMode: any): Observable<any>;
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection: Array<any>): {
        value: any;
        label: any;
    }[];
    /**
     * @name selectMatch
     * @param event
     *
     * @description
     */
    selectMatch(event: KeyboardEvent): boolean;
}
