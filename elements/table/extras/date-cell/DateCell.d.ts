import { NovoLabelService } from '../../../../services/novo-label-service';
import { BaseRenderer } from '../base-renderer/BaseRenderer';
import * as i0 from "@angular/core";
export declare class DateCell extends BaseRenderer {
    labels: NovoLabelService;
    value: any;
    constructor(labels: NovoLabelService);
    getFormattedDate(): string;
    static ɵfac: i0.ɵɵFactoryDef<DateCell, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<DateCell, "date-cell", never, { "value": "value"; }, {}, never, never>;
}
