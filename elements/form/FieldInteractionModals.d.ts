import { NovoModalRef, NovoModalParams } from '../modal/Modal';
import { NovoLabelService } from '../../services/novo-label-service';
import * as ɵngcc0 from '@angular/core';
export declare class ControlConfirmModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ControlConfirmModal, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ControlConfirmModal, "control-confirm-modal", never, {}, {}, never, never>;
}
export declare class ControlPromptModal {
    private modalRef;
    params: NovoModalParams;
    labels: NovoLabelService;
    constructor(modalRef: NovoModalRef, params: NovoModalParams, labels: NovoLabelService);
    close(result: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ControlPromptModal, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ControlPromptModal, "control-prompt-modal", never, {}, {}, never, never>;
}

//# sourceMappingURL=FieldInteractionModals.d.ts.map