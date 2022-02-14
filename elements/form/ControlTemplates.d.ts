import { AfterViewInit, QueryList } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import * as i0 from "@angular/core";
export declare class NovoControlTemplates implements AfterViewInit {
    private templates;
    defaultTemplates: QueryList<NovoTemplate>;
    constructor(templates: NovoTemplateService);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoControlTemplates, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoControlTemplates, "novo-control-templates", never, {}, {}, never, never>;
}
