import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class DistributionListPickerResults extends BasePickerResults {
    private sanitizer;
    labels: NovoLabelService;
    active: boolean;
    get isHidden(): boolean;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    sanitizeHTML(html: any): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DistributionListPickerResults, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DistributionListPickerResults, "distribution-list-picker-results", never, {}, {}, never, never>;
}

//# sourceMappingURL=DistributionListPickerResults.d.ts.map