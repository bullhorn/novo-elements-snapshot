import { ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class EntityPickerResult {
    labels: NovoLabelService;
    match: any;
    term: any;
    constructor(labels: NovoLabelService);
    /**
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape: any): any;
    /**
     * @description This function should return a <strong>-tag wrapped HTML string.
     */
    highlight(match: any, query: any): any;
    getIconForResult(result?: any): string;
    renderTimestamp(date?: any): string;
    renderTimeNoOffset(dateStr?: string): string;
    getNameForResult(result?: any): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<EntityPickerResult, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<EntityPickerResult, "entity-picker-result", never, { "match": "match"; "term": "term"; }, {}, never, never>;
}
export declare class EntityPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    select: EventEmitter<any>;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getListElement(): any;
    selectMatch(event?: any, item?: any): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<EntityPickerResults, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<EntityPickerResults, "entity-picker-results", never, {}, { "select": "select"; }, never, never>;
}

//# sourceMappingURL=EntityPickerResults.d.ts.map