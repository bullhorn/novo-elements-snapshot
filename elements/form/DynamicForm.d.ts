import { AfterContentInit, ElementRef, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoFieldset } from './FormInterfaces';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
export declare class NovoFieldsetHeaderElement {
    title: string;
    icon: string;
    static ɵfac: i0.ɵɵFactoryDef<NovoFieldsetHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoFieldsetHeaderElement, "novo-fieldset-header", never, { "title": "title"; "icon": "icon"; }, {}, never, never>;
}
export declare class NovoFieldsetElement {
    controls: Array<any>;
    form: any;
    title: string;
    icon: string;
    index: number;
    autoFocus: boolean;
    isEmbedded: boolean;
    isInlineEmbedded: boolean;
    hidden: boolean;
    static ɵfac: i0.ɵɵFactoryDef<NovoFieldsetElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoFieldsetElement, "novo-fieldset", never, { "controls": "controls"; "form": "form"; "title": "title"; "icon": "icon"; "index": "index"; "autoFocus": "autoFocus"; "isEmbedded": "isEmbedded"; "isInlineEmbedded": "isInlineEmbedded"; "hidden": "hidden"; }, {}, never, never>;
}
export declare class NovoDynamicFormElement implements OnChanges, OnInit, AfterContentInit {
    private element;
    private templates;
    controls: Array<any>;
    fieldsets: Array<NovoFieldset>;
    form: NovoFormGroup;
    layout: string;
    hideNonRequiredFields: boolean;
    autoFocusFirstField: boolean;
    customTemplates: QueryList<NovoTemplate>;
    private fieldsAlreadyHidden;
    allFieldsRequired: boolean;
    allFieldsNotRequired: boolean;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    numControls: number;
    constructor(element: ElementRef, templates: NovoTemplateService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    ngAfterContentInit(): void;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    get values(): any;
    get isValid(): boolean;
    updatedValues(): any;
    forceValidation(): void;
    static ɵfac: i0.ɵɵFactoryDef<NovoDynamicFormElement, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoDynamicFormElement, "novo-dynamic-form", never, { "controls": "controls"; "fieldsets": "fieldsets"; "form": "form"; "layout": "layout"; "hideNonRequiredFields": "hideNonRequiredFields"; "autoFocusFirstField": "autoFocusFirstField"; }, {}, ["customTemplates"], ["form-title", "form-subtitle"]>;
}
