// NG
import { Component, ContentChildren, ElementRef, Input, QueryList, } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { Helpers } from './../../utils/Helpers';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./Control";
import * as i3 from "../../services/template/NovoTemplateService";
import * as i4 from "./ControlTemplates";
import * as i5 from "@angular/forms";
function NovoFieldsetElement_novo_fieldset_header_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-fieldset-header", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("embedded", ctx_r0.isEmbedded)("inline-embedded", ctx_r0.isInlineEmbedded)("hidden", ctx_r0.hidden);
    i0.ɵɵproperty("icon", ctx_r0.icon)("title", ctx_r0.title);
} }
function NovoFieldsetElement_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelement(1, "novo-control", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    const control_r2 = ctx_r6.$implicit;
    const controlIndex_r3 = ctx_r6.index;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", control_r2.disabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("autoFocus", ctx_r4.autoFocus && ctx_r4.index === 0 && controlIndex_r3 === 0)("control", control_r2)("form", ctx_r4.form);
} }
function NovoFieldsetElement_ng_container_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1, "TODO - GroupedControl");
    i0.ɵɵelementEnd();
} }
function NovoFieldsetElement_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoFieldsetElement_ng_container_2_div_1_Template, 2, 5, "div", 4);
    i0.ɵɵtemplate(2, NovoFieldsetElement_ng_container_2_div_2_Template, 2, 0, "div", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const control_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", control_r2.__type !== "GroupedControl");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", control_r2.__type === "GroupedControl");
} }
function NovoDynamicFormElement_ng_container_6_novo_fieldset_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-fieldset", 4);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    const i_r2 = ctx_r4.index;
    const fieldset_r1 = ctx_r4.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("index", i_r2)("autoFocus", ctx_r3.autoFocusFirstField)("icon", fieldset_r1.icon)("controls", fieldset_r1.controls)("title", fieldset_r1.title)("form", ctx_r3.form)("isEmbedded", fieldset_r1.isEmbedded)("isInlineEmbedded", fieldset_r1.isInlineEmbedded)("hidden", fieldset_r1.hidden);
} }
function NovoDynamicFormElement_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoDynamicFormElement_ng_container_6_novo_fieldset_1_Template, 1, 9, "novo-fieldset", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const fieldset_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", fieldset_r1.controls.length);
} }
const _c0 = [[["form-title"]], [["form-subtitle"]]];
const _c1 = ["form-title", "form-subtitle"];
export class NovoFieldsetHeaderElement {
}
NovoFieldsetHeaderElement.ɵfac = function NovoFieldsetHeaderElement_Factory(t) { return new (t || NovoFieldsetHeaderElement)(); };
NovoFieldsetHeaderElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoFieldsetHeaderElement, selectors: [["novo-fieldset-header"]], inputs: { title: "title", icon: "icon" }, decls: 3, vars: 3, template: function NovoFieldsetHeaderElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "h6");
        i0.ɵɵelement(1, "i");
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵclassMap(ctx.icon || "bhi-section");
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.title);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFieldsetHeaderElement, [{
        type: Component,
        args: [{
                selector: 'novo-fieldset-header',
                template: ` <h6><i [class]="icon || 'bhi-section'"></i>{{ title }}</h6> `,
            }]
    }], null, { title: [{
            type: Input
        }], icon: [{
            type: Input
        }] }); })();
export class NovoFieldsetElement {
    constructor() {
        this.controls = [];
        this.isEmbedded = false;
        this.isInlineEmbedded = false;
        this.hidden = false;
    }
}
NovoFieldsetElement.ɵfac = function NovoFieldsetElement_Factory(t) { return new (t || NovoFieldsetElement)(); };
NovoFieldsetElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoFieldsetElement, selectors: [["novo-fieldset"]], inputs: { controls: "controls", form: "form", title: "title", icon: "icon", index: "index", autoFocus: "autoFocus", isEmbedded: "isEmbedded", isInlineEmbedded: "isInlineEmbedded", hidden: "hidden" }, decls: 3, vars: 2, consts: [[1, "novo-fieldset-container"], [3, "icon", "title", "embedded", "inline-embedded", "hidden", 4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "icon", "title"], ["class", "novo-form-row", 3, "disabled", 4, "ngIf"], [4, "ngIf"], [1, "novo-form-row"], [3, "autoFocus", "control", "form"]], template: function NovoFieldsetElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, NovoFieldsetElement_novo_fieldset_header_1_Template, 1, 8, "novo-fieldset-header", 1);
        i0.ɵɵtemplate(2, NovoFieldsetElement_ng_container_2_Template, 3, 2, "ng-container", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.controls);
    } }, directives: [i1.NgIf, i1.NgForOf, NovoFieldsetHeaderElement, i2.NovoControlElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoFieldsetElement, [{
        type: Component,
        args: [{
                selector: 'novo-fieldset',
                template: `
    <div class="novo-fieldset-container">
      <novo-fieldset-header
        [icon]="icon"
        [title]="title"
        *ngIf="title"
        [class.embedded]="isEmbedded"
        [class.inline-embedded]="isInlineEmbedded"
        [class.hidden]="hidden"
      ></novo-fieldset-header>
      <ng-container *ngFor="let control of controls; let controlIndex = index">
        <div class="novo-form-row" [class.disabled]="control.disabled" *ngIf="control.__type !== 'GroupedControl'">
          <novo-control [autoFocus]="autoFocus && index === 0 && controlIndex === 0" [control]="control" [form]="form"></novo-control>
        </div>
        <div *ngIf="control.__type === 'GroupedControl'">TODO - GroupedControl</div>
      </ng-container>
    </div>
  `,
            }]
    }], null, { controls: [{
            type: Input
        }], form: [{
            type: Input
        }], title: [{
            type: Input
        }], icon: [{
            type: Input
        }], index: [{
            type: Input
        }], autoFocus: [{
            type: Input
        }], isEmbedded: [{
            type: Input
        }], isInlineEmbedded: [{
            type: Input
        }], hidden: [{
            type: Input
        }] }); })();
export class NovoDynamicFormElement {
    constructor(element, templates) {
        this.element = element;
        this.templates = templates;
        this.controls = [];
        this.fieldsets = [];
        this.hideNonRequiredFields = true;
        this.autoFocusFirstField = false;
        this.allFieldsRequired = false;
        this.allFieldsNotRequired = false;
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.numControls = 0;
    }
    ngOnInit() {
        this.ngOnChanges();
    }
    ngOnChanges(changes) {
        this.form.layout = this.layout;
        if (!(this.fieldsets && this.fieldsets.length) && this.controls && this.controls.length) {
            this.fieldsets = [
                {
                    controls: this.controls,
                },
            ];
            this.numControls = this.controls.length;
        }
        else if (this.fieldsets) {
            this.fieldsets.forEach((fieldset) => {
                this.numControls = this.numControls + fieldset.controls.length;
            });
        }
        const requiredFields = [];
        const nonRequiredFields = [];
        this.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                if (control.required) {
                    requiredFields.push(control);
                }
                else {
                    nonRequiredFields.push(control);
                }
            });
        });
        this.allFieldsRequired = requiredFields.length === this.numControls;
        this.allFieldsNotRequired = nonRequiredFields.length === this.numControls;
        if (this.allFieldsNotRequired && this.hideNonRequiredFields) {
            this.fieldsets.forEach((fieldset) => {
                fieldset.controls.forEach((control) => {
                    this.form.controls[control.key].hidden = false;
                });
            });
        }
        this.form.fieldsets = [...this.fieldsets];
    }
    ngAfterContentInit() {
        if (this.customTemplates && this.customTemplates.length) {
            this.customTemplates.forEach((template) => {
                this.templates.addCustom(template.name, template.template);
            });
        }
    }
    showAllFields() {
        this.form.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                const ctl = this.form.controls[control.key];
                if (!this.fieldsAlreadyHidden.includes(control.key)) {
                    ctl.hidden = false;
                }
            });
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }
    showOnlyRequired(hideRequiredWithValue) {
        this.fieldsAlreadyHidden = [];
        this.form.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                const ctl = this.form.controls[control.key];
                if (ctl.hidden) {
                    this.fieldsAlreadyHidden.push(control.key);
                }
                // Hide any non-required fields
                if (!control.required) {
                    ctl.hidden = true;
                }
                // Hide required fields that have been successfully filled out
                if (hideRequiredWithValue &&
                    !Helpers.isBlank(this.form.value[control.key]) &&
                    (!control.isEmpty || (control.isEmpty && control.isEmpty(ctl)))) {
                    ctl.hidden = true;
                }
                // Don't hide fields with errors
                if (ctl.errors) {
                    ctl.hidden = false;
                }
            });
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    }
    get values() {
        return this.form ? this.form.value : null;
    }
    get isValid() {
        return this.form ? this.form.valid : false;
    }
    updatedValues() {
        let ret = null;
        this.form.fieldsets.forEach((fieldset) => {
            fieldset.controls.forEach((control) => {
                if (this.form.controls[control.key].dirty || control.dirty) {
                    if (!ret) {
                        ret = {};
                    }
                    ret[control.key] = this.form.value[control.key];
                }
            });
        });
        return ret;
    }
    forceValidation() {
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
NovoDynamicFormElement.ɵfac = function NovoDynamicFormElement_Factory(t) { return new (t || NovoDynamicFormElement)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i3.NovoTemplateService)); };
NovoDynamicFormElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDynamicFormElement, selectors: [["novo-dynamic-form"]], contentQueries: function NovoDynamicFormElement_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoTemplate, false);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.customTemplates = _t);
    } }, inputs: { controls: "controls", fieldsets: "fieldsets", form: "form", layout: "layout", hideNonRequiredFields: "hideNonRequiredFields", autoFocusFirstField: "autoFocusFirstField" }, features: [i0.ɵɵProvidersFeature([NovoTemplateService]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 7, vars: 2, consts: [[1, "novo-form-container"], [1, "novo-form", 3, "formGroup"], [4, "ngFor", "ngForOf"], [3, "index", "autoFocus", "icon", "controls", "title", "form", "isEmbedded", "isInlineEmbedded", "hidden", 4, "ngIf"], [3, "index", "autoFocus", "icon", "controls", "title", "form", "isEmbedded", "isInlineEmbedded", "hidden"]], template: function NovoDynamicFormElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelement(0, "novo-control-templates");
        i0.ɵɵelementStart(1, "div", 0);
        i0.ɵɵelementStart(2, "header");
        i0.ɵɵprojection(3);
        i0.ɵɵprojection(4, 1);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "form", 1);
        i0.ɵɵtemplate(6, NovoDynamicFormElement_ng_container_6_Template, 2, 1, "ng-container", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.form.fieldsets);
    } }, directives: [i4.NovoControlTemplates, i5.ɵangular_packages_forms_forms_y, i5.NgControlStatusGroup, i5.FormGroupDirective, i1.NgForOf, i1.NgIf, NovoFieldsetElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDynamicFormElement, [{
        type: Component,
        args: [{
                selector: 'novo-dynamic-form',
                template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header>
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-container *ngFor="let fieldset of form.fieldsets; let i = index">
          <novo-fieldset
            *ngIf="fieldset.controls.length"
            [index]="i"
            [autoFocus]="autoFocusFirstField"
            [icon]="fieldset.icon"
            [controls]="fieldset.controls"
            [title]="fieldset.title"
            [form]="form"
            [isEmbedded]="fieldset.isEmbedded"
            [isInlineEmbedded]="fieldset.isInlineEmbedded"
            [hidden]="fieldset.hidden"
          ></novo-fieldset>
        </ng-container>
      </form>
    </div>
  `,
                providers: [NovoTemplateService],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i3.NovoTemplateService }]; }, { controls: [{
            type: Input
        }], fieldsets: [{
            type: Input
        }], form: [{
            type: Input
        }], layout: [{
            type: Input
        }], hideNonRequiredFields: [{
            type: Input
        }], autoFocusFirstField: [{
            type: Input
        }], customTemplates: [{
            type: ContentChildren,
            args: [NovoTemplate]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1pY0Zvcm0uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZm9ybS9EeW5hbWljRm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLEtBQUssRUFHTCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE1BQU07QUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7OztJQWlCMUMsMENBT3dCOzs7SUFIdEIsNkNBQTZCLDRDQUFBLHlCQUFBO0lBSDdCLGtDQUFhLHVCQUFBOzs7SUFRYiw4QkFDRTtJQUFBLGtDQUE0SDtJQUM5SCxpQkFBTTs7Ozs7O0lBRnFCLCtDQUFtQztJQUM5QyxlQUE0RDtJQUE1RCwyRkFBNEQsdUJBQUEscUJBQUE7OztJQUU1RSwyQkFBaUQ7SUFBQSxxQ0FBcUI7SUFBQSxpQkFBTTs7O0lBSjlFLDZCQUNFO0lBQUEsbUZBQ0U7SUFFRixtRkFBaUQ7SUFDbkQsMEJBQWU7OztJQUprRCxlQUEyQztJQUEzQyw2REFBMkM7SUFHckcsZUFBMkM7SUFBM0MsNkRBQTJDOzs7SUFxQzlDLG1DQVdpQjs7Ozs7O0lBVGYsNEJBQVcseUNBQUEsMEJBQUEsa0NBQUEsNEJBQUEscUJBQUEsc0NBQUEsa0RBQUEsOEJBQUE7OztJQUhmLDZCQUNFO0lBQUEsMEdBV0M7SUFDSCwwQkFBZTs7O0lBWFgsZUFBZ0M7SUFBaEMsa0RB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QzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NEZBM0pVLHNCQUFzQjsyREFBdEIsc0JBQXNCO29DQWFoQixZQUFZOzs7O2dPQWZsQixDQUFDLG1CQUFtQixDQUFDOztRQXhCOUIseUNBQWlEO1FBQ2pELDhCQUNFO1FBQUEsOEJBQ0U7UUFBQSxrQkFBZ0M7UUFDaEMscUJBQW1DO1FBQ3JDLGlCQUFTO1FBQ1QsK0JBQ0U7UUFBQSx5RkFDRTtRQWFKLGlCQUFPO1FBQ1QsaUJBQU07O1FBaEJvQixlQUFrQjtRQUFsQixvQ0FBa0I7UUFDMUIsZUFBc0Q7UUFBdEQsNENBQXNEO3dKQS9CL0QsbUJBQW1CO2tEQWtEbkIsc0JBQXNCO2NBN0JsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3QlQ7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDakM7K0ZBR0MsUUFBUTtrQkFEUCxLQUFLO1lBR04sU0FBUztrQkFEUixLQUFLO1lBR04sSUFBSTtrQkFESCxLQUFLO1lBR04sTUFBTTtrQkFETCxLQUFLO1lBR04scUJBQXFCO2tCQURwQixLQUFLO1lBR04sbUJBQW1CO2tCQURsQixLQUFLO1lBR04sZUFBZTtrQkFEZCxlQUFlO21CQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90ZW1wbGF0ZS9Ob3ZvVGVtcGxhdGVTZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZSB9IGZyb20gJy4uL2NvbW1vbi9ub3ZvLXRlbXBsYXRlL25vdm8tdGVtcGxhdGUuZGlyZWN0aXZlJztcbi8vIEFwcFxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvRmllbGRzZXQgfSBmcm9tICcuL0Zvcm1JbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9Gb3JtR3JvdXAgfSBmcm9tICcuL05vdm9Gb3JtR3JvdXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZpZWxkc2V0LWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgIDxoNj48aSBbY2xhc3NdPVwiaWNvbiB8fCAnYmhpLXNlY3Rpb24nXCI+PC9pPnt7IHRpdGxlIH19PC9oNj4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1maWVsZHNldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tZmllbGRzZXQtY29udGFpbmVyXCI+XG4gICAgICA8bm92by1maWVsZHNldC1oZWFkZXJcbiAgICAgICAgW2ljb25dPVwiaWNvblwiXG4gICAgICAgIFt0aXRsZV09XCJ0aXRsZVwiXG4gICAgICAgICpuZ0lmPVwidGl0bGVcIlxuICAgICAgICBbY2xhc3MuZW1iZWRkZWRdPVwiaXNFbWJlZGRlZFwiXG4gICAgICAgIFtjbGFzcy5pbmxpbmUtZW1iZWRkZWRdPVwiaXNJbmxpbmVFbWJlZGRlZFwiXG4gICAgICAgIFtjbGFzcy5oaWRkZW5dPVwiaGlkZGVuXCJcbiAgICAgID48L25vdm8tZmllbGRzZXQtaGVhZGVyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBjb250cm9sczsgbGV0IGNvbnRyb2xJbmRleCA9IGluZGV4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWZvcm0tcm93XCIgW2NsYXNzLmRpc2FibGVkXT1cImNvbnRyb2wuZGlzYWJsZWRcIiAqbmdJZj1cImNvbnRyb2wuX190eXBlICE9PSAnR3JvdXBlZENvbnRyb2wnXCI+XG4gICAgICAgICAgPG5vdm8tY29udHJvbCBbYXV0b0ZvY3VzXT1cImF1dG9Gb2N1cyAmJiBpbmRleCA9PT0gMCAmJiBjb250cm9sSW5kZXggPT09IDBcIiBbY29udHJvbF09XCJjb250cm9sXCIgW2Zvcm1dPVwiZm9ybVwiPjwvbm92by1jb250cm9sPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImNvbnRyb2wuX190eXBlID09PSAnR3JvdXBlZENvbnRyb2wnXCI+VE9ETyAtIEdyb3VwZWRDb250cm9sPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0ZpZWxkc2V0RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGNvbnRyb2xzOiBBcnJheTxhbnk+ID0gW107XG4gIEBJbnB1dCgpXG4gIGZvcm06IGFueTtcbiAgQElucHV0KClcbiAgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpbmRleDogbnVtYmVyO1xuICBASW5wdXQoKVxuICBhdXRvRm9jdXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGlzRW1iZWRkZWQgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgaXNJbmxpbmVFbWJlZGRlZCA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBoaWRkZW4gPSBmYWxzZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1keW5hbWljLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWNvbnRyb2wtdGVtcGxhdGVzPjwvbm92by1jb250cm9sLXRlbXBsYXRlcz5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1mb3JtLWNvbnRhaW5lclwiPlxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZm9ybS10aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZm9ybS1zdWJ0aXRsZVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPGZvcm0gY2xhc3M9XCJub3ZvLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGRzZXQgb2YgZm9ybS5maWVsZHNldHM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICA8bm92by1maWVsZHNldFxuICAgICAgICAgICAgKm5nSWY9XCJmaWVsZHNldC5jb250cm9scy5sZW5ndGhcIlxuICAgICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgICAgW2F1dG9Gb2N1c109XCJhdXRvRm9jdXNGaXJzdEZpZWxkXCJcbiAgICAgICAgICAgIFtpY29uXT1cImZpZWxkc2V0Lmljb25cIlxuICAgICAgICAgICAgW2NvbnRyb2xzXT1cImZpZWxkc2V0LmNvbnRyb2xzXCJcbiAgICAgICAgICAgIFt0aXRsZV09XCJmaWVsZHNldC50aXRsZVwiXG4gICAgICAgICAgICBbZm9ybV09XCJmb3JtXCJcbiAgICAgICAgICAgIFtpc0VtYmVkZGVkXT1cImZpZWxkc2V0LmlzRW1iZWRkZWRcIlxuICAgICAgICAgICAgW2lzSW5saW5lRW1iZWRkZWRdPVwiZmllbGRzZXQuaXNJbmxpbmVFbWJlZGRlZFwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cImZpZWxkc2V0LmhpZGRlblwiXG4gICAgICAgICAgPjwvbm92by1maWVsZHNldD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHluYW1pY0Zvcm1FbGVtZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuICBASW5wdXQoKVxuICBjb250cm9sczogQXJyYXk8YW55PiA9IFtdO1xuICBASW5wdXQoKVxuICBmaWVsZHNldHM6IEFycmF5PE5vdm9GaWVsZHNldD4gPSBbXTtcbiAgQElucHV0KClcbiAgZm9ybTogTm92b0Zvcm1Hcm91cDtcbiAgQElucHV0KClcbiAgbGF5b3V0OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGhpZGVOb25SZXF1aXJlZEZpZWxkczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGF1dG9Gb2N1c0ZpcnN0RmllbGQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvVGVtcGxhdGUpXG4gIGN1c3RvbVRlbXBsYXRlczogUXVlcnlMaXN0PE5vdm9UZW1wbGF0ZT47XG4gIHByaXZhdGUgZmllbGRzQWxyZWFkeUhpZGRlbjogc3RyaW5nW107XG5cbiAgYWxsRmllbGRzUmVxdWlyZWQgPSBmYWxzZTtcbiAgYWxsRmllbGRzTm90UmVxdWlyZWQgPSBmYWxzZTtcbiAgc2hvd2luZ0FsbEZpZWxkcyA9IGZhbHNlO1xuICBzaG93aW5nUmVxdWlyZWRGaWVsZHMgPSB0cnVlO1xuICBudW1Db250cm9scyA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHRlbXBsYXRlczogTm92b1RlbXBsYXRlU2VydmljZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtLmxheW91dCA9IHRoaXMubGF5b3V0O1xuXG4gICAgaWYgKCEodGhpcy5maWVsZHNldHMgJiYgdGhpcy5maWVsZHNldHMubGVuZ3RoKSAmJiB0aGlzLmNvbnRyb2xzICYmIHRoaXMuY29udHJvbHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZpZWxkc2V0cyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGNvbnRyb2xzOiB0aGlzLmNvbnRyb2xzLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIHRoaXMubnVtQ29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmllbGRzZXRzKSB7XG4gICAgICB0aGlzLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgICB0aGlzLm51bUNvbnRyb2xzID0gdGhpcy5udW1Db250cm9scyArIGZpZWxkc2V0LmNvbnRyb2xzLmxlbmd0aDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVpcmVkRmllbGRzOiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3Qgbm9uUmVxdWlyZWRGaWVsZHM6IEFycmF5PGFueT4gPSBbXTtcbiAgICB0aGlzLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICBpZiAoY29udHJvbC5yZXF1aXJlZCkge1xuICAgICAgICAgIHJlcXVpcmVkRmllbGRzLnB1c2goY29udHJvbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9uUmVxdWlyZWRGaWVsZHMucHVzaChjb250cm9sKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5hbGxGaWVsZHNSZXF1aXJlZCA9IHJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gdGhpcy5udW1Db250cm9scztcbiAgICB0aGlzLmFsbEZpZWxkc05vdFJlcXVpcmVkID0gbm9uUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSB0aGlzLm51bUNvbnRyb2xzO1xuICAgIGlmICh0aGlzLmFsbEZpZWxkc05vdFJlcXVpcmVkICYmIHRoaXMuaGlkZU5vblJlcXVpcmVkRmllbGRzKSB7XG4gICAgICB0aGlzLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgICBmaWVsZHNldC5jb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5mb3JtLmZpZWxkc2V0cyA9IFsuLi50aGlzLmZpZWxkc2V0c107XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY3VzdG9tVGVtcGxhdGVzICYmIHRoaXMuY3VzdG9tVGVtcGxhdGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXN0b21UZW1wbGF0ZXMuZm9yRWFjaCgodGVtcGxhdGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5hZGRDdXN0b20odGVtcGxhdGUubmFtZSwgdGVtcGxhdGUudGVtcGxhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3dBbGxGaWVsZHMoKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICBjb25zdCBjdGwgPSB0aGlzLmZvcm0uY29udHJvbHNbY29udHJvbC5rZXldO1xuICAgICAgICBpZiAoIXRoaXMuZmllbGRzQWxyZWFkeUhpZGRlbi5pbmNsdWRlcyhjb250cm9sLmtleSkpIHtcbiAgICAgICAgICBjdGwuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuc2hvd2luZ0FsbEZpZWxkcyA9IHRydWU7XG4gICAgdGhpcy5zaG93aW5nUmVxdWlyZWRGaWVsZHMgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93T25seVJlcXVpcmVkKGhpZGVSZXF1aXJlZFdpdGhWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMuZmllbGRzQWxyZWFkeUhpZGRlbiA9IFtdO1xuICAgIHRoaXMuZm9ybS5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIGZpZWxkc2V0LmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgY29uc3QgY3RsID0gdGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XTtcblxuICAgICAgICBpZiAoY3RsLmhpZGRlbikge1xuICAgICAgICAgIHRoaXMuZmllbGRzQWxyZWFkeUhpZGRlbi5wdXNoKGNvbnRyb2wua2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpZGUgYW55IG5vbi1yZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgaWYgKCFjb250cm9sLnJlcXVpcmVkKSB7XG4gICAgICAgICAgY3RsLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWRlIHJlcXVpcmVkIGZpZWxkcyB0aGF0IGhhdmUgYmVlbiBzdWNjZXNzZnVsbHkgZmlsbGVkIG91dFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaGlkZVJlcXVpcmVkV2l0aFZhbHVlICYmXG4gICAgICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLmZvcm0udmFsdWVbY29udHJvbC5rZXldKSAmJlxuICAgICAgICAgICghY29udHJvbC5pc0VtcHR5IHx8IChjb250cm9sLmlzRW1wdHkgJiYgY29udHJvbC5pc0VtcHR5KGN0bCkpKVxuICAgICAgICApIHtcbiAgICAgICAgICBjdGwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvbid0IGhpZGUgZmllbGRzIHdpdGggZXJyb3JzXG4gICAgICAgIGlmIChjdGwuZXJyb3JzKSB7XG4gICAgICAgICAgY3RsLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnNob3dpbmdBbGxGaWVsZHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dpbmdSZXF1aXJlZEZpZWxkcyA9IHRydWU7XG4gICAgdGhpcy5mb3JjZVZhbGlkYXRpb24oKTtcbiAgfVxuXG4gIGdldCB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybSA/IHRoaXMuZm9ybS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBnZXQgaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtID8gdGhpcy5mb3JtLnZhbGlkIDogZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlZFZhbHVlcygpOiBhbnkge1xuICAgIGxldCByZXQgPSBudWxsO1xuICAgIHRoaXMuZm9ybS5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIGZpZWxkc2V0LmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uZGlydHkgfHwgY29udHJvbC5kaXJ0eSkge1xuICAgICAgICAgIGlmICghcmV0KSB7XG4gICAgICAgICAgICByZXQgPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0W2NvbnRyb2wua2V5XSA9IHRoaXMuZm9ybS52YWx1ZVtjb250cm9sLmtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwdWJsaWMgZm9yY2VWYWxpZGF0aW9uKCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2w6IGFueSA9IHRoaXMuZm9ybS5jb250cm9sc1trZXldO1xuICAgICAgaWYgKGNvbnRyb2wucmVxdWlyZWQgJiYgSGVscGVycy5pc0JsYW5rKHRoaXMuZm9ybS52YWx1ZVtjb250cm9sLmtleV0pKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==