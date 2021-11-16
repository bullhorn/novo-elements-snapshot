import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import * as ɵngcc0 from '@angular/core';
export declare type ToastThemes = 'default' | 'success' | 'info' | 'warning' | 'danger' | 'positive' | string;
export declare type ToastIcons = 'bell' | 'check' | 'info' | 'warning' | 'remove' | 'caution' | 'times' | 'coffee' | 'danger' | string;
export declare type ToastPositions = 'fixedTop' | 'fixedBottom' | 'growlTopRight' | 'growlTopLeft' | 'growlBottomRight' | 'growlBottomLeft';
export interface ToastOptions {
    title?: string;
    message?: string;
    icon?: ToastIcons;
    theme?: ToastThemes;
    hideDelay?: number;
    position?: ToastPositions;
    isCloseable?: boolean;
    customClass?: string;
}
export declare class NovoToastService {
    private componentUtils;
    _parentViewContainer: any;
    references: Array<any>;
    icons: {
        default: string;
        success: string;
        info: string;
        warning: string;
        danger: string;
    };
    defaults: {
        hideDelay: number;
        position: string;
        theme: string;
    };
    constructor(componentUtils: ComponentUtils);
    set parentViewContainer(view: any);
    alert(options: ToastOptions, toastElement?: any): Promise<any>;
    isVisible(toast: any): any;
    hide(toast: any): void;
    handleAlert(toast: any, options: any): void;
    setToastOnSession(toast: any, opts: any): void;
    show(toast: any): void;
    toastTimer(toast: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoToastService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NovoToastService>;
}

//# sourceMappingURL=ToastService.d.ts.map