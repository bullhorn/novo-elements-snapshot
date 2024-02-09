import { InjectionToken, TemplateRef } from '@angular/core';
/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface NovoBreadcrumbRef {
    separatorIcon: TemplateRef<any>;
}
/**
 * Injection token used to provide the parent component to options.
 */
export declare const NOVO_BREADCRUMB_REF: InjectionToken<NovoBreadcrumbRef>;
