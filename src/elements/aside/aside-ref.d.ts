import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { AsideComponent } from './aside.component';
export declare class NovoAsideRef<T = any> {
    component: any;
    params: T;
    private overlayRef;
    constructor(component: any, params: T, overlayRef: OverlayRef);
    private _beforeClose;
    private _afterClosed;
    componentInstance: AsideComponent;
    afterClosed(): Observable<void>;
    beforeClose(): Observable<void>;
    close(): void;
}
