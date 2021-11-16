import { AfterViewInit, QueryList } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import * as ɵngcc0 from '@angular/core';
export declare class NovoControlTemplates implements AfterViewInit {
    private templates;
    defaultTemplates: QueryList<NovoTemplate>;
    constructor(templates: NovoTemplateService);
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoControlTemplates, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoControlTemplates, "novo-control-templates", never, {}, {}, never, never>;
}

//# sourceMappingURL=ControlTemplates.d.ts.map