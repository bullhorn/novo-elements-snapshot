import { AfterContentInit, ElementRef, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoFieldset, NovoFormGroup } from './FormInterfaces';
export declare class NovoFieldsetHeaderElement {
    title: string;
    icon: string;
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
}
