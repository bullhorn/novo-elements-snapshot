import { AfterViewInit, ComponentRef, QueryList, ViewContainerRef } from '@angular/core';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoTemplateService } from 'novo-elements/services';
import { DynamicFormTemplateArgs, TemplateHost } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoControlTemplates implements AfterViewInit {
    private templates;
    private viewContainerRef;
    private dynamicTemplates;
    defaultTemplates: QueryList<NovoTemplate>;
    dynamicComponents: ComponentRef<TemplateHost>[];
    constructor(templates: NovoTemplateService, viewContainerRef: ViewContainerRef, dynamicTemplates: DynamicFormTemplateArgs[]);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlTemplates, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlTemplates, "novo-control-templates", never, {}, {}, never, never>;
}
