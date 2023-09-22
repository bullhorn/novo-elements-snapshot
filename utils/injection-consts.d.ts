import { InjectionToken, NgModuleRef, TemplateRef, Type } from '@angular/core';
export interface DynamicFormTemplateArgs {
    type: Type<TemplateHost>;
    ngModuleRef: NgModuleRef<unknown>;
}
export interface TemplateHost {
    template: INovoTemplate;
}
export interface INovoTemplate {
    type: string;
    name: string;
    template: TemplateRef<any>;
    getType(): string;
}
export declare const DYNAMIC_FORM_TEMPLATE: InjectionToken<DynamicFormTemplateArgs>;
