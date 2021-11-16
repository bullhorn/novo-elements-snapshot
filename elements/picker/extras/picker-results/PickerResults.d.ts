import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as ɵngcc0 from '@angular/core';
export declare class PickerResults extends BasePickerResults {
    labels: NovoLabelService;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getEmptyMessage(): any;
    shouldShowMessageForZeroLengthSearch(): any;
    getListElement(): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PickerResults, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PickerResults, "picker-results", never, {}, {}, never, never>;
}

//# sourceMappingURL=PickerResults.d.ts.map