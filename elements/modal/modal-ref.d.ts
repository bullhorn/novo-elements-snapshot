import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { NovoModalContainerComponent } from './modal-container.component';
/**
 * Params that can be passed to the Modal
 */
export interface ModalParams {
    [propName: string]: any;
}
export declare class NovoModalParams implements ModalParams {
}
export declare class NovoModalRef {
    component: any;
    params: any;
    private overlayRef;
    constructor(component: any, params: any, overlayRef: OverlayRef);
    private _beforeClose;
    private _afterClosed;
    componentInstance: NovoModalContainerComponent;
    isClosed: boolean;
    get onClosed(): Promise<any>;
    afterClosed(): Observable<any>;
    beforeClose(): Observable<any>;
    close(result?: any): void;
}
