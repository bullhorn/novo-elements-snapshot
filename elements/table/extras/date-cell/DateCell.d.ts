import { BaseRenderer } from '../base-renderer/BaseRenderer';
import { NovoLabelService } from '../../../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class DateCell extends BaseRenderer {
    labels: NovoLabelService;
    value: any;
    constructor(labels: NovoLabelService);
    getFormattedDate(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DateCell, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DateCell, "date-cell", never, { "value": "value"; }, {}, never, never>;
}

//# sourceMappingURL=DateCell.d.ts.map