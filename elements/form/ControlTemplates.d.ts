import { AfterViewInit, QueryList } from '@angular/core';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoTemplate } from 'novo-elements/elements/common';
import * as i0 from "@angular/core";
export declare class NovoControlTemplates implements AfterViewInit {
    private templates;
    defaultTemplates: QueryList<NovoTemplate>;
    constructor(templates: NovoTemplateService);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlTemplates, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlTemplates, "novo-control-templates", never, {}, {}, never, never>;
}
