import { AfterContentInit, OnInit, QueryList } from '@angular/core';
import { NovoTemplate } from 'novo-elements/common';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoFormGroup } from './novo-form-group';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoFormElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoFormElement, "novo-form", never, { "form": "form"; "layout": "layout"; "hideHeader": "hideHeader"; }, {}, ["customTemplates"], ["form-title", "form-subtitle", "*"]>;
}
