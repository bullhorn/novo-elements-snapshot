import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
export declare class PickerResults extends BasePickerResults {
    labels: NovoLabelService;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getEmptyMessage(): any;
    shouldShowMessageForZeroLengthSearch(): any;
    getListElement(): any;
    static ɵfac: i0.ɵɵFactoryDef<PickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<PickerResults, "picker-results", never, {}, {}, never, never>;
}
