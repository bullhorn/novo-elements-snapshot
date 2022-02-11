import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Security } from './../../services/security/Security';
export declare class Unless {
    templateRef: TemplateRef<any>;
    viewContainer: ViewContainerRef;
    security: Security;
    permissions: string;
    isDisplayed: boolean;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, security: Security);
    set bhUnless(value: string);
    check(): void;
}
