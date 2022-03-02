import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
export declare class DistributionListPickerResults extends BasePickerResults {
    private sanitizer;
    labels: NovoLabelService;
    active: boolean;
    get isHidden(): boolean;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    sanitizeHTML(html: any): any;
}
