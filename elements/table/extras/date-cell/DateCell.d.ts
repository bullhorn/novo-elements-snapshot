import { NovoLabelService } from 'novo-elements/services';
import { BaseRenderer } from '../base-renderer';
import * as i0 from "@angular/core";
export declare class DateCell extends BaseRenderer {
    labels: NovoLabelService;
    set value(v: any);
    get value(): any;
    constructor(labels: NovoLabelService);
    getFormattedDate(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateCell, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateCell, "date-cell", never, { "value": { "alias": "value"; "required": false; }; }, {}, never, never, false, never>;
}
