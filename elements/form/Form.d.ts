import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoFormGroup } from './FormInterfaces';
import * as ɵngcc0 from '@angular/core';
export declare class NovoFormElement implements AfterContentInit, OnInit {
    private templates;
    form: NovoFormGroup;
    layout: string;
    hideHeader: boolean;
    customTemplates: QueryList<NovoTemplate>;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    constructor(templates: NovoTemplateService);
    get value(): any;
    get isValid(): boolean;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    forceValidation(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoFormElement, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoFormElement, "novo-form", never, { "hideHeader": "hideHeader"; "form": "form"; "layout": "layout"; }, {}, ["customTemplates"], ["form-title", "form-subtitle", "*"]>;
}

//# sourceMappingURL=Form.d.ts.map