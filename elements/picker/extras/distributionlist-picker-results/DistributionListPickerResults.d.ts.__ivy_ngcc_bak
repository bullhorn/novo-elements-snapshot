import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export declare class DistributionListPickerResults extends BasePickerResults {
    private sanitizer;
    labels: NovoLabelService;
    active: boolean;
    get isHidden(): boolean;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    sanitizeHTML(html: any): any;
}
