// NG
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
// App
import { NovoTemplateService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./ControlTemplates";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
export class NovoFormElement {
    constructor(templates) {
        this.templates = templates;
        this.hideHeader = false;
        this.showingAllFields = false;
        this.showingRequiredFields = true;
    }
    get value() {
        return this.form.getRawValue();
    }
    get isValid() {
        return this.form.valid;
    }
    ngOnInit() {
        this.form.layout = this.layout;
    }
    ngAfterContentInit() {
        if (this.customTemplates && this.customTemplates.length) {
            this.customTemplates.forEach((template) => {
                this.templates.addCustom(template.name, template.template);
            });
        }
    }
    showAllFields() {
        Object.keys(this.form.controls).forEach((key) => {
            this.form.controls[key].hidden = false;
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }
    showOnlyRequired(hideRequiredWithValue) {
        Object.keys(this.form.controls).forEach((key) => {
            // Hide any non-required fields
            if (!this.form.controls[key].required) {
                this.form.controls[key].hidden = true;
            }
            // Hide required fields that have been successfully filled out
            if (hideRequiredWithValue && !Helpers.isBlank(this.form.getRawValue()[key])) {
                this.form.controls[key].hidden = true;
            }
            // Don't hide fields with errors
            if (this.form.controls[key].errors) {
                this.form.controls[key].hidden = false;
            }
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
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
NovoFormElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormElement, deps: [{ token: i1.NovoTemplateService }], target: i0.ɵɵFactoryTarget.Component });
NovoFormElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoFormElement, selector: "novo-form", inputs: { form: "form", layout: "layout", hideHeader: "hideHeader" }, providers: [NovoTemplateService], queries: [{ propertyName: "customTemplates", predicate: NovoTemplate }], ngImport: i0, template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header *ngIf="!hideHeader">
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-content></ng-content>
      </form>
    </div>
  `, isInline: true, components: [{ type: i2.NovoControlTemplates, selector: "novo-control-templates" }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-form',
                    template: `
    <novo-control-templates></novo-control-templates>
    <div class="novo-form-container">
      <header *ngIf="!hideHeader">
        <ng-content select="form-title"></ng-content>
        <ng-content select="form-subtitle"></ng-content>
      </header>
      <form class="novo-form" [formGroup]="form">
        <ng-content></ng-content>
      </form>
    </div>
  `,
                    providers: [NovoTemplateService],
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoTemplateService }]; }, propDecorators: { form: [{
                type: Input
            }], layout: [{
                type: Input
            }], hideHeader: [{
                type: Input
            }], customTemplates: [{
                type: ContentChildren,
                args: [NovoTemplate]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2Zvcm0vRm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkcsTUFBTTtBQUNOLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7QUFrQmhELE1BQU0sT0FBTyxlQUFlO0lBYzFCLFlBQW9CLFNBQThCO1FBQTlCLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBUmxELGVBQVUsR0FBWSxLQUFLLENBQUM7UUFLckIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLDBCQUFxQixHQUFZLElBQUksQ0FBQztJQUVRLENBQUM7SUFFdEQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLGFBQWE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLHFCQUFxQjtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDdEQsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdkM7WUFFRCw4REFBOEQ7WUFDOUQsSUFBSSxxQkFBcUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3ZDO1lBRUQsZ0NBQWdDO1lBQ2hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxlQUFlO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUN0RCxNQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM3RSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NkdBMUVVLGVBQWU7aUdBQWYsZUFBZSwwR0FGZixDQUFDLG1CQUFtQixDQUFDLDBEQVVmLFlBQVksNkJBdEJuQjs7Ozs7Ozs7Ozs7R0FXVDs0RkFHVSxlQUFlO2tCQWhCM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO29CQUNELFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNqQzswR0FHQyxJQUFJO3NCQURILEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLFVBQVU7c0JBRFQsS0FBSztnQkFJTixlQUFlO3NCQURkLGVBQWU7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIE9uSW5pdCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBcHBcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9Gb3JtR3JvdXAgfSBmcm9tICcuL05vdm9Gb3JtR3JvdXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZvcm0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWNvbnRyb2wtdGVtcGxhdGVzPjwvbm92by1jb250cm9sLXRlbXBsYXRlcz5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1mb3JtLWNvbnRhaW5lclwiPlxuICAgICAgPGhlYWRlciAqbmdJZj1cIiFoaWRlSGVhZGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImZvcm0tdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImZvcm0tc3VidGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxmb3JtIGNsYXNzPVwibm92by1mb3JtXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTm92b1RlbXBsYXRlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Gb3JtRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGZvcm06IE5vdm9Gb3JtR3JvdXA7XG4gIEBJbnB1dCgpXG4gIGxheW91dDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBoaWRlSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvVGVtcGxhdGUpXG4gIGN1c3RvbVRlbXBsYXRlczogUXVlcnlMaXN0PE5vdm9UZW1wbGF0ZT47XG5cbiAgcHVibGljIHNob3dpbmdBbGxGaWVsZHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNob3dpbmdSZXF1aXJlZEZpZWxkczogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0ZW1wbGF0ZXM6IE5vdm9UZW1wbGF0ZVNlcnZpY2UpIHt9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0UmF3VmFsdWUoKTtcbiAgfVxuXG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm0udmFsaWQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm0ubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY3VzdG9tVGVtcGxhdGVzICYmIHRoaXMuY3VzdG9tVGVtcGxhdGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXN0b21UZW1wbGF0ZXMuZm9yRWFjaCgodGVtcGxhdGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5hZGRDdXN0b20odGVtcGxhdGUubmFtZSwgdGVtcGxhdGUudGVtcGxhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3dBbGxGaWVsZHMoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2tleV0uaGlkZGVuID0gZmFsc2U7XG4gICAgfSk7XG4gICAgdGhpcy5zaG93aW5nQWxsRmllbGRzID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dpbmdSZXF1aXJlZEZpZWxkcyA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNob3dPbmx5UmVxdWlyZWQoaGlkZVJlcXVpcmVkV2l0aFZhbHVlKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgLy8gSGlkZSBhbnkgbm9uLXJlcXVpcmVkIGZpZWxkc1xuICAgICAgaWYgKCF0aGlzLmZvcm0uY29udHJvbHNba2V5XS5yZXF1aXJlZCkge1xuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNba2V5XS5oaWRkZW4gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBIaWRlIHJlcXVpcmVkIGZpZWxkcyB0aGF0IGhhdmUgYmVlbiBzdWNjZXNzZnVsbHkgZmlsbGVkIG91dFxuICAgICAgaWYgKGhpZGVSZXF1aXJlZFdpdGhWYWx1ZSAmJiAhSGVscGVycy5pc0JsYW5rKHRoaXMuZm9ybS5nZXRSYXdWYWx1ZSgpW2tleV0pKSB7XG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1trZXldLmhpZGRlbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIERvbid0IGhpZGUgZmllbGRzIHdpdGggZXJyb3JzXG4gICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW2tleV0uZXJyb3JzKSB7XG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1trZXldLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2hvd2luZ0FsbEZpZWxkcyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd2luZ1JlcXVpcmVkRmllbGRzID0gdHJ1ZTtcbiAgICB0aGlzLmZvcmNlVmFsaWRhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGZvcmNlVmFsaWRhdGlvbigpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0uY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBjb250cm9sOiBhbnkgPSB0aGlzLmZvcm0uY29udHJvbHNba2V5XTtcbiAgICAgIGlmIChjb250cm9sLnJlcXVpcmVkICYmIEhlbHBlcnMuaXNCbGFuayh0aGlzLmZvcm0uZ2V0UmF3VmFsdWUoKVtjb250cm9sLmtleV0pKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==