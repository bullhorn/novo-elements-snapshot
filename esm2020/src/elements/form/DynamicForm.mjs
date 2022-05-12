// NG
import { Component, ContentChildren, ElementRef, Input, QueryList, } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { Helpers } from './../../utils/Helpers';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
import * as i1 from "../common/typography/title/title.component";
import * as i2 from "../icon/Icon";
import * as i3 from "./Control";
import * as i4 from "@angular/common";
import * as i5 from "../../services/template/NovoTemplateService";
import * as i6 from "./ControlTemplates";
import * as i7 from "@angular/forms";
export class NovoFieldsetHeaderElement {
    constructor() {
        this.icon = 'section';
    }
}
NovoFieldsetHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFieldsetHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFieldsetHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoFieldsetHeaderElement, selector: "novo-fieldset-header", inputs: { title: "title", icon: "icon" }, host: { classAttribute: "novo-fieldset-header" }, ngImport: i0, template: `
    <novo-title smaller>
      <novo-icon>{{ icon?.replace('bhi-', '') }}</novo-icon
      >{{ title }}
    </novo-title>
  `, isInline: true, components: [{ type: i1.NovoTitle, selector: "novo-title,[novo-title]" }, { type: i2.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFieldsetHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-fieldset-header',
                    template: `
    <novo-title smaller>
      <novo-icon>{{ icon?.replace('bhi-', '') }}</novo-icon
      >{{ title }}
    </novo-title>
  `,
                    host: {
                        class: 'novo-fieldset-header',
                    },
                }]
        }], propDecorators: { title: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });
export class NovoFieldsetElement {
    constructor() {
        this.controls = [];
        this.isEmbedded = false;
        this.isInlineEmbedded = false;
        this.hidden = false;
    }
}
NovoFieldsetElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFieldsetElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoFieldsetElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoFieldsetElement, selector: "novo-fieldset", inputs: { controls: "controls", form: "form", title: "title", icon: "icon", index: "index", autoFocus: "autoFocus", isEmbedded: "isEmbedded", isInlineEmbedded: "isInlineEmbedded", hidden: "hidden" }, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: NovoFieldsetHeaderElement, selector: "novo-fieldset-header", inputs: ["title", "icon"] }, { type: i3.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoFieldsetElement, decorators: [{
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
        }], propDecorators: { controls: [{
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
            }] } });
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
                    !Helpers.isBlank(this.form.getRawValue()[control.key]) &&
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
        return this.form ? this.form.getRawValue() : null;
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
                    ret[control.key] = this.form.getRawValue()[control.key];
                }
            });
        });
        return ret;
    }
    forceValidation() {
        Object.keys(this.form.controls).forEach((key) => {
            const control = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.getRawValue()[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
NovoDynamicFormElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDynamicFormElement, deps: [{ token: i0.ElementRef }, { token: i5.NovoTemplateService }], target: i0.ɵɵFactoryTarget.Component });
NovoDynamicFormElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoDynamicFormElement, selector: "novo-dynamic-form", inputs: { controls: "controls", fieldsets: "fieldsets", form: "form", layout: "layout", hideNonRequiredFields: "hideNonRequiredFields", autoFocusFirstField: "autoFocusFirstField" }, providers: [NovoTemplateService], queries: [{ propertyName: "customTemplates", predicate: NovoTemplate }], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i6.NovoControlTemplates, selector: "novo-control-templates" }, { type: NovoFieldsetElement, selector: "novo-fieldset", inputs: ["controls", "form", "title", "icon", "index", "autoFocus", "isEmbedded", "isInlineEmbedded", "hidden"] }], directives: [{ type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoDynamicFormElement, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i5.NovoTemplateService }]; }, propDecorators: { controls: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1pY0Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL0R5bmFtaWNGb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDL0UsTUFBTTtBQUNOLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7OztBQWNoRCxNQUFNLE9BQU8seUJBQXlCO0lBWnRDO1FBZ0JFLFNBQUksR0FBVyxTQUFTLENBQUM7S0FDMUI7O3NIQUxZLHlCQUF5QjswR0FBekIseUJBQXlCLHdKQVYxQjs7Ozs7R0FLVDsyRkFLVSx5QkFBeUI7a0JBWnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOzs7OztHQUtUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsc0JBQXNCO3FCQUM5QjtpQkFDRjs4QkFHQyxLQUFLO3NCQURKLEtBQUs7Z0JBR04sSUFBSTtzQkFESCxLQUFLOztBQXlCUixNQUFNLE9BQU8sbUJBQW1CO0lBckJoQztRQXVCRSxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBWTFCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbkIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBRyxLQUFLLENBQUM7S0FDaEI7O2dIQW5CWSxtQkFBbUI7b0dBQW5CLG1CQUFtQiw2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OlsiLy8gTkdcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGVtcGxhdGUvTm92b1RlbXBsYXRlU2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGUgfSBmcm9tICcuLi9jb21tb24vbm92by10ZW1wbGF0ZS9ub3ZvLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG4vLyBBcHBcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgTm92b0ZpZWxkc2V0IH0gZnJvbSAnLi9Gb3JtSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOb3ZvRm9ybUdyb3VwIH0gZnJvbSAnLi9Ob3ZvRm9ybUdyb3VwJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1maWVsZHNldC1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLXRpdGxlIHNtYWxsZXI+XG4gICAgICA8bm92by1pY29uPnt7IGljb24/LnJlcGxhY2UoJ2JoaS0nLCAnJykgfX08L25vdm8taWNvblxuICAgICAgPnt7IHRpdGxlIH19XG4gICAgPC9ub3ZvLXRpdGxlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWZpZWxkc2V0LWhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNldEhlYWRlckVsZW1lbnQge1xuICBASW5wdXQoKVxuICB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmcgPSAnc2VjdGlvbic7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZmllbGRzZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWZpZWxkc2V0LWNvbnRhaW5lclwiPlxuICAgICAgPG5vdm8tZmllbGRzZXQtaGVhZGVyXG4gICAgICAgIFtpY29uXT1cImljb25cIlxuICAgICAgICBbdGl0bGVdPVwidGl0bGVcIlxuICAgICAgICAqbmdJZj1cInRpdGxlXCJcbiAgICAgICAgW2NsYXNzLmVtYmVkZGVkXT1cImlzRW1iZWRkZWRcIlxuICAgICAgICBbY2xhc3MuaW5saW5lLWVtYmVkZGVkXT1cImlzSW5saW5lRW1iZWRkZWRcIlxuICAgICAgICBbY2xhc3MuaGlkZGVuXT1cImhpZGRlblwiXG4gICAgICA+PC9ub3ZvLWZpZWxkc2V0LWhlYWRlcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgY29udHJvbHM7IGxldCBjb250cm9sSW5kZXggPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1mb3JtLXJvd1wiIFtjbGFzcy5kaXNhYmxlZF09XCJjb250cm9sLmRpc2FibGVkXCIgKm5nSWY9XCJjb250cm9sLl9fdHlwZSAhPT0gJ0dyb3VwZWRDb250cm9sJ1wiPlxuICAgICAgICAgIDxub3ZvLWNvbnRyb2wgW2F1dG9Gb2N1c109XCJhdXRvRm9jdXMgJiYgaW5kZXggPT09IDAgJiYgY29udHJvbEluZGV4ID09PSAwXCIgW2NvbnRyb2xdPVwiY29udHJvbFwiIFtmb3JtXT1cImZvcm1cIj48L25vdm8tY29udHJvbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJjb250cm9sLl9fdHlwZSA9PT0gJ0dyb3VwZWRDb250cm9sJ1wiPlRPRE8gLSBHcm91cGVkQ29udHJvbDwvZGl2PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNldEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBjb250cm9sczogQXJyYXk8YW55PiA9IFtdO1xuICBASW5wdXQoKVxuICBmb3JtOiBhbnk7XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgaW5kZXg6IG51bWJlcjtcbiAgQElucHV0KClcbiAgYXV0b0ZvY3VzOiBib29sZWFuO1xuICBASW5wdXQoKVxuICBpc0VtYmVkZGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGlzSW5saW5lRW1iZWRkZWQgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgaGlkZGVuID0gZmFsc2U7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZHluYW1pYy1mb3JtJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1jb250cm9sLXRlbXBsYXRlcz48L25vdm8tY29udHJvbC10ZW1wbGF0ZXM+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tZm9ybS1jb250YWluZXJcIj5cbiAgICAgIDxoZWFkZXI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImZvcm0tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImZvcm0tc3VidGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxmb3JtIGNsYXNzPVwibm92by1mb3JtXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkc2V0IG9mIGZvcm0uZmllbGRzZXRzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPG5vdm8tZmllbGRzZXRcbiAgICAgICAgICAgICpuZ0lmPVwiZmllbGRzZXQuY29udHJvbHMubGVuZ3RoXCJcbiAgICAgICAgICAgIFtpbmRleF09XCJpXCJcbiAgICAgICAgICAgIFthdXRvRm9jdXNdPVwiYXV0b0ZvY3VzRmlyc3RGaWVsZFwiXG4gICAgICAgICAgICBbaWNvbl09XCJmaWVsZHNldC5pY29uXCJcbiAgICAgICAgICAgIFtjb250cm9sc109XCJmaWVsZHNldC5jb250cm9sc1wiXG4gICAgICAgICAgICBbdGl0bGVdPVwiZmllbGRzZXQudGl0bGVcIlxuICAgICAgICAgICAgW2Zvcm1dPVwiZm9ybVwiXG4gICAgICAgICAgICBbaXNFbWJlZGRlZF09XCJmaWVsZHNldC5pc0VtYmVkZGVkXCJcbiAgICAgICAgICAgIFtpc0lubGluZUVtYmVkZGVkXT1cImZpZWxkc2V0LmlzSW5saW5lRW1iZWRkZWRcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCJmaWVsZHNldC5oaWRkZW5cIlxuICAgICAgICAgID48L25vdm8tZmllbGRzZXQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxuICBwcm92aWRlcnM6IFtOb3ZvVGVtcGxhdGVTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0R5bmFtaWNGb3JtRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgQElucHV0KClcbiAgY29udHJvbHM6IEFycmF5PGFueT4gPSBbXTtcbiAgQElucHV0KClcbiAgZmllbGRzZXRzOiBBcnJheTxOb3ZvRmllbGRzZXQ+ID0gW107XG4gIEBJbnB1dCgpXG4gIGZvcm06IE5vdm9Gb3JtR3JvdXA7XG4gIEBJbnB1dCgpXG4gIGxheW91dDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBoaWRlTm9uUmVxdWlyZWRGaWVsZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBhdXRvRm9jdXNGaXJzdEZpZWxkOiBib29sZWFuID0gZmFsc2U7XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b1RlbXBsYXRlKVxuICBjdXN0b21UZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxOb3ZvVGVtcGxhdGU+O1xuICBwcml2YXRlIGZpZWxkc0FscmVhZHlIaWRkZW46IHN0cmluZ1tdO1xuXG4gIGFsbEZpZWxkc1JlcXVpcmVkID0gZmFsc2U7XG4gIGFsbEZpZWxkc05vdFJlcXVpcmVkID0gZmFsc2U7XG4gIHNob3dpbmdBbGxGaWVsZHMgPSBmYWxzZTtcbiAgc2hvd2luZ1JlcXVpcmVkRmllbGRzID0gdHJ1ZTtcbiAgbnVtQ29udHJvbHMgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSB0ZW1wbGF0ZXM6IE5vdm9UZW1wbGF0ZVNlcnZpY2UpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubmdPbkNoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzPzogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuZm9ybS5sYXlvdXQgPSB0aGlzLmxheW91dDtcblxuICAgIGlmICghKHRoaXMuZmllbGRzZXRzICYmIHRoaXMuZmllbGRzZXRzLmxlbmd0aCkgJiYgdGhpcy5jb250cm9scyAmJiB0aGlzLmNvbnRyb2xzLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWVsZHNldHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBjb250cm9sczogdGhpcy5jb250cm9scyxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICB0aGlzLm51bUNvbnRyb2xzID0gdGhpcy5jb250cm9scy5sZW5ndGg7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZpZWxkc2V0cykge1xuICAgICAgdGhpcy5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgICAgdGhpcy5udW1Db250cm9scyA9IHRoaXMubnVtQ29udHJvbHMgKyBmaWVsZHNldC5jb250cm9scy5sZW5ndGg7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1aXJlZEZpZWxkczogQXJyYXk8YW55PiA9IFtdO1xuICAgIGNvbnN0IG5vblJlcXVpcmVkRmllbGRzOiBBcnJheTxhbnk+ID0gW107XG4gICAgdGhpcy5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIGZpZWxkc2V0LmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgaWYgKGNvbnRyb2wucmVxdWlyZWQpIHtcbiAgICAgICAgICByZXF1aXJlZEZpZWxkcy5wdXNoKGNvbnRyb2wpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vblJlcXVpcmVkRmllbGRzLnB1c2goY29udHJvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuYWxsRmllbGRzUmVxdWlyZWQgPSByZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IHRoaXMubnVtQ29udHJvbHM7XG4gICAgdGhpcy5hbGxGaWVsZHNOb3RSZXF1aXJlZCA9IG5vblJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gdGhpcy5udW1Db250cm9scztcbiAgICBpZiAodGhpcy5hbGxGaWVsZHNOb3RSZXF1aXJlZCAmJiB0aGlzLmhpZGVOb25SZXF1aXJlZEZpZWxkcykge1xuICAgICAgdGhpcy5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZm9ybS5maWVsZHNldHMgPSBbLi4udGhpcy5maWVsZHNldHNdO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmN1c3RvbVRlbXBsYXRlcyAmJiB0aGlzLmN1c3RvbVRlbXBsYXRlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VzdG9tVGVtcGxhdGVzLmZvckVhY2goKHRlbXBsYXRlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuYWRkQ3VzdG9tKHRlbXBsYXRlLm5hbWUsIHRlbXBsYXRlLnRlbXBsYXRlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG93QWxsRmllbGRzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybS5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcbiAgICAgIGZpZWxkc2V0LmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcbiAgICAgICAgY29uc3QgY3RsID0gdGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XTtcbiAgICAgICAgaWYgKCF0aGlzLmZpZWxkc0FscmVhZHlIaWRkZW4uaW5jbHVkZXMoY29udHJvbC5rZXkpKSB7XG4gICAgICAgICAgY3RsLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnNob3dpbmdBbGxGaWVsZHMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd2luZ1JlcXVpcmVkRmllbGRzID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2hvd09ubHlSZXF1aXJlZChoaWRlUmVxdWlyZWRXaXRoVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLmZpZWxkc0FscmVhZHlIaWRkZW4gPSBbXTtcbiAgICB0aGlzLmZvcm0uZmllbGRzZXRzLmZvckVhY2goKGZpZWxkc2V0KSA9PiB7XG4gICAgICBmaWVsZHNldC5jb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7XG4gICAgICAgIGNvbnN0IGN0bCA9IHRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sLmtleV07XG5cbiAgICAgICAgaWYgKGN0bC5oaWRkZW4pIHtcbiAgICAgICAgICB0aGlzLmZpZWxkc0FscmVhZHlIaWRkZW4ucHVzaChjb250cm9sLmtleSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIaWRlIGFueSBub24tcmVxdWlyZWQgZmllbGRzXG4gICAgICAgIGlmICghY29udHJvbC5yZXF1aXJlZCkge1xuICAgICAgICAgIGN0bC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGlkZSByZXF1aXJlZCBmaWVsZHMgdGhhdCBoYXZlIGJlZW4gc3VjY2Vzc2Z1bGx5IGZpbGxlZCBvdXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGhpZGVSZXF1aXJlZFdpdGhWYWx1ZSAmJlxuICAgICAgICAgICFIZWxwZXJzLmlzQmxhbmsodGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbY29udHJvbC5rZXldKSAmJlxuICAgICAgICAgICghY29udHJvbC5pc0VtcHR5IHx8IChjb250cm9sLmlzRW1wdHkgJiYgY29udHJvbC5pc0VtcHR5KGN0bCkpKVxuICAgICAgICApIHtcbiAgICAgICAgICBjdGwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvbid0IGhpZGUgZmllbGRzIHdpdGggZXJyb3JzXG4gICAgICAgIGlmIChjdGwuZXJyb3JzKSB7XG4gICAgICAgICAgY3RsLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLnNob3dpbmdBbGxGaWVsZHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dpbmdSZXF1aXJlZEZpZWxkcyA9IHRydWU7XG4gICAgdGhpcy5mb3JjZVZhbGlkYXRpb24oKTtcbiAgfVxuXG4gIGdldCB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybSA/IHRoaXMuZm9ybS5nZXRSYXdWYWx1ZSgpIDogbnVsbDtcbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0gPyB0aGlzLmZvcm0udmFsaWQgOiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVkVmFsdWVzKCk6IGFueSB7XG4gICAgbGV0IHJldCA9IG51bGw7XG4gICAgdGhpcy5mb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xuICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XS5kaXJ0eSB8fCBjb250cm9sLmRpcnR5KSB7XG4gICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXRbY29udHJvbC5rZXldID0gdGhpcy5mb3JtLmdldFJhd1ZhbHVlKClbY29udHJvbC5rZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHVibGljIGZvcmNlVmFsaWRhdGlvbigpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0uY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBjb250cm9sOiBhbnkgPSB0aGlzLmZvcm0uY29udHJvbHNba2V5XTtcbiAgICAgIGlmIChjb250cm9sLnJlcXVpcmVkICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLmZvcm0uZ2V0UmF3VmFsdWUoKVtjb250cm9sLmtleV0pKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==