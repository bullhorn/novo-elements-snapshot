import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
export declare class WorkersCompCodesPickerResults extends BasePickerResults {
    private sanitizer;
    labels: NovoLabelService;
    active: boolean;
    get isHidden(): boolean;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    sanitizeHTML(compCode: string, name: string): import("@angular/platform-browser").SafeHtml;
    static ɵfac: i0.ɵɵFactoryDef<WorkersCompCodesPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<WorkersCompCodesPickerResults, "workers-comp-codes-picker-results", never, {}, {}, never, never>;
}
