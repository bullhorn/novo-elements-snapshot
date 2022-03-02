import { NovoLabelService } from '../../../../services/novo-label-service';
import { BaseRenderer } from '../base-renderer/BaseRenderer';
export declare class DateCell extends BaseRenderer {
    labels: NovoLabelService;
    value: any;
    constructor(labels: NovoLabelService);
    getFormattedDate(): string;
}
