import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Security } from './../../services/security/Security';
import * as ɵngcc0 from '@angular/core';
export declare class Unless {
    templateRef: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    security: Security;
    permissions: string;
    isDisplayed: boolean;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, security: Security);
    set bhUnless(value: string);
    check(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Unless, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<Unless, "[bhUnless]", never, { "bhUnless": "bhUnless"; }, {}, never>;
}

//# sourceMappingURL=Unless.d.ts.map