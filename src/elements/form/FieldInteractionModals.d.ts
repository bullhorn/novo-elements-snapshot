import { NovoLabelService } from '../../services/novo-label-service';
import { NovoModalParams, NovoModalRef } from '../modal/modal-ref';
export declare class ControlConfirmModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
}
export declare class ControlPromptModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
}
