import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class WorkersCompCodesPickerResults extends BasePickerResults {
    private sanitizer;
    labels: NovoLabelService;
    active: boolean;
    get isHidden(): boolean;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    sanitizeHTML(compCode: string, name: string): import("@angular/platform-browser").SafeHtml;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<WorkersCompCodesPickerResults, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<WorkersCompCodesPickerResults, "workers-comp-codes-picker-results", never, {}, {}, never, never>;
}

//# sourceMappingURL=WorkersCompCodesPickerResults.d.ts.map