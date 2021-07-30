// NG
import { Component, ContentChildren, ElementRef, Input, QueryList } from '@angular/core';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { Helpers } from './../../utils/Helpers';
export class NovoFieldsetHeaderElement {
}
NovoFieldsetHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-fieldset-header',
                template: `
        <h6><i [class]="icon || 'bhi-section'"></i>{{title}}</h6>
    `
            },] }
];
NovoFieldsetHeaderElement.propDecorators = {
    title: [{ type: Input }],
    icon: [{ type: Input }]
};
export class NovoFieldsetElement {
    constructor() {
        this.controls = [];
        this.isEmbedded = false;
        this.isInlineEmbedded = false;
        this.hidden = false;
    }
}
NovoFieldsetElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-fieldset',
                template: `
        <div class="novo-fieldset-container">
            <novo-fieldset-header [icon]="icon" [title]="title" *ngIf="title" [class.embedded]="isEmbedded" [class.inline-embedded]="isInlineEmbedded" [class.hidden]="hidden"></novo-fieldset-header>
            <ng-container *ngFor="let control of controls;let controlIndex = index;">
                <div class="novo-form-row" [class.disabled]="control.disabled" *ngIf="control.__type !== 'GroupedControl'">
                    <novo-control [autoFocus]="autoFocus && index === 0 && controlIndex === 0" [control]="control" [form]="form"></novo-control>
                </div>
                <div *ngIf="control.__type === 'GroupedControl'">TODO - GroupedControl</div>
            </ng-container>
        </div>
    `
            },] }
];
NovoFieldsetElement.propDecorators = {
    controls: [{ type: Input }],
    form: [{ type: Input }],
    title: [{ type: Input }],
    icon: [{ type: Input }],
    index: [{ type: Input }],
    autoFocus: [{ type: Input }],
    isEmbedded: [{ type: Input }],
    isInlineEmbedded: [{ type: Input }],
    hidden: [{ type: Input }]
};
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
NovoDynamicFormElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-dynamic-form',
                template: `
        <novo-control-templates></novo-control-templates>
        <div class="novo-form-container">
            <header>
                <ng-content select="form-title"></ng-content>
                <ng-content select="form-subtitle"></ng-content>
            </header>
            <form class="novo-form" [formGroup]="form">
                <ng-container *ngFor="let fieldset of form.fieldsets;let i = index">
                    <novo-fieldset *ngIf="fieldset.controls.length" [index]="i" [autoFocus]="autoFocusFirstField" [icon]="fieldset.icon" [controls]="fieldset.controls" [title]="fieldset.title" [form]="form" [isEmbedded]="fieldset.isEmbedded" [isInlineEmbedded]="fieldset.isInlineEmbedded" [hidden]="fieldset.hidden"></novo-fieldset>
                </ng-container>
            </form>
        </div>
    `,
                providers: [NovoTemplateService]
            },] }
];
NovoDynamicFormElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoTemplateService }
];
NovoDynamicFormElement.propDecorators = {
    controls: [{ type: Input }],
    fieldsets: [{ type: Input }],
    form: [{ type: Input }],
    layout: [{ type: Input }],
    hideNonRequiredFields: [{ type: Input }],
    autoFocusFirstField: [{ type: Input }],
    customTemplates: [{ type: ContentChildren, args: [NovoTemplate,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHluYW1pY0Zvcm0uanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vRHluYW1pY0Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSztBQUNMLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzdJLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBU2hELE1BQU0sT0FBTyx5QkFBeUI7OztZQU5yQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOztLQUVQO2FBQ0o7OztvQkFFRSxLQUFLO21CQUVMLEtBQUs7O0FBa0JSLE1BQU0sT0FBTyxtQkFBbUI7SUFkaEM7UUFnQkUsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQVkxQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW5CLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLENBQUM7OztZQWpDQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVQO2FBQ0o7Ozt1QkFFRSxLQUFLO21CQUVMLEtBQUs7b0JBRUwsS0FBSzttQkFFTCxLQUFLO29CQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLOytCQUVMLEtBQUs7cUJBRUwsS0FBSzs7QUFzQlIsTUFBTSxPQUFPLHNCQUFzQjtJQXVCakMsWUFBb0IsT0FBbUIsRUFBVSxT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LENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQTdLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0tBYVA7Z0JBQ0gsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDakM7OztZQXhFc0QsVUFBVTtZQUN4RCxtQkFBbUI7Ozt1QkF5RXpCLEtBQUs7d0JBRUwsS0FBSzttQkFFTCxLQUFLO3FCQUVMLEtBQUs7b0NBRUwsS0FBSztrQ0FFTCxLQUFLOzhCQUVMLGVBQWUsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcclxuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90ZW1wbGF0ZS9Ob3ZvVGVtcGxhdGVTZXJ2aWNlJztcclxuaW1wb3J0IHsgTm92b1RlbXBsYXRlIH0gZnJvbSAnLi4vY29tbW9uL25vdm8tdGVtcGxhdGUvbm92by10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xyXG4vLyBBcHBcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IE5vdm9GaWVsZHNldCwgTm92b0Zvcm1Hcm91cCB9IGZyb20gJy4vRm9ybUludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWZpZWxkc2V0LWhlYWRlcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8aDY+PGkgW2NsYXNzXT1cImljb24gfHwgJ2JoaS1zZWN0aW9uJ1wiPjwvaT57e3RpdGxlfX08L2g2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNldEhlYWRlckVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGljb246IHN0cmluZztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWZpZWxkc2V0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWZpZWxkc2V0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8bm92by1maWVsZHNldC1oZWFkZXIgW2ljb25dPVwiaWNvblwiIFt0aXRsZV09XCJ0aXRsZVwiICpuZ0lmPVwidGl0bGVcIiBbY2xhc3MuZW1iZWRkZWRdPVwiaXNFbWJlZGRlZFwiIFtjbGFzcy5pbmxpbmUtZW1iZWRkZWRdPVwiaXNJbmxpbmVFbWJlZGRlZFwiIFtjbGFzcy5oaWRkZW5dPVwiaGlkZGVuXCI+PC9ub3ZvLWZpZWxkc2V0LWhlYWRlcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBjb250cm9scztsZXQgY29udHJvbEluZGV4ID0gaW5kZXg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm92by1mb3JtLXJvd1wiIFtjbGFzcy5kaXNhYmxlZF09XCJjb250cm9sLmRpc2FibGVkXCIgKm5nSWY9XCJjb250cm9sLl9fdHlwZSAhPT0gJ0dyb3VwZWRDb250cm9sJ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLWNvbnRyb2wgW2F1dG9Gb2N1c109XCJhdXRvRm9jdXMgJiYgaW5kZXggPT09IDAgJiYgY29udHJvbEluZGV4ID09PSAwXCIgW2NvbnRyb2xdPVwiY29udHJvbFwiIFtmb3JtXT1cImZvcm1cIj48L25vdm8tY29udHJvbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImNvbnRyb2wuX190eXBlID09PSAnR3JvdXBlZENvbnRyb2wnXCI+VE9ETyAtIEdyb3VwZWRDb250cm9sPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9GaWVsZHNldEVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgY29udHJvbHM6IEFycmF5PGFueT4gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGZvcm06IGFueTtcclxuICBASW5wdXQoKVxyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBpY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBpbmRleDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpXHJcbiAgYXV0b0ZvY3VzOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpXHJcbiAgaXNFbWJlZGRlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgaXNJbmxpbmVFbWJlZGRlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgaGlkZGVuID0gZmFsc2U7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1keW5hbWljLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5vdm8tY29udHJvbC10ZW1wbGF0ZXM+PC9ub3ZvLWNvbnRyb2wtdGVtcGxhdGVzPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWZvcm0tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxoZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJmb3JtLXRpdGxlXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZm9ybS1zdWJ0aXRsZVwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwibm92by1mb3JtXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWVsZHNldCBvZiBmb3JtLmZpZWxkc2V0cztsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tZmllbGRzZXQgKm5nSWY9XCJmaWVsZHNldC5jb250cm9scy5sZW5ndGhcIiBbaW5kZXhdPVwiaVwiIFthdXRvRm9jdXNdPVwiYXV0b0ZvY3VzRmlyc3RGaWVsZFwiIFtpY29uXT1cImZpZWxkc2V0Lmljb25cIiBbY29udHJvbHNdPVwiZmllbGRzZXQuY29udHJvbHNcIiBbdGl0bGVdPVwiZmllbGRzZXQudGl0bGVcIiBbZm9ybV09XCJmb3JtXCIgW2lzRW1iZWRkZWRdPVwiZmllbGRzZXQuaXNFbWJlZGRlZFwiIFtpc0lubGluZUVtYmVkZGVkXT1cImZpZWxkc2V0LmlzSW5saW5lRW1iZWRkZWRcIiBbaGlkZGVuXT1cImZpZWxkc2V0LmhpZGRlblwiPjwvbm92by1maWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0R5bmFtaWNGb3JtRWxlbWVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcclxuICBASW5wdXQoKVxyXG4gIGNvbnRyb2xzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgQElucHV0KClcclxuICBmaWVsZHNldHM6IEFycmF5PE5vdm9GaWVsZHNldD4gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGZvcm06IE5vdm9Gb3JtR3JvdXA7XHJcbiAgQElucHV0KClcclxuICBsYXlvdXQ6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGhpZGVOb25SZXF1aXJlZEZpZWxkczogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KClcclxuICBhdXRvRm9jdXNGaXJzdEZpZWxkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvVGVtcGxhdGUpXHJcbiAgY3VzdG9tVGVtcGxhdGVzOiBRdWVyeUxpc3Q8Tm92b1RlbXBsYXRlPjtcclxuICBwcml2YXRlIGZpZWxkc0FscmVhZHlIaWRkZW46IHN0cmluZ1tdO1xyXG5cclxuICBhbGxGaWVsZHNSZXF1aXJlZCA9IGZhbHNlO1xyXG4gIGFsbEZpZWxkc05vdFJlcXVpcmVkID0gZmFsc2U7XHJcbiAgc2hvd2luZ0FsbEZpZWxkcyA9IGZhbHNlO1xyXG4gIHNob3dpbmdSZXF1aXJlZEZpZWxkcyA9IHRydWU7XHJcbiAgbnVtQ29udHJvbHMgPSAwO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgdGVtcGxhdGVzOiBOb3ZvVGVtcGxhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLmZvcm0ubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XHJcblxyXG4gICAgaWYgKCEodGhpcy5maWVsZHNldHMgJiYgdGhpcy5maWVsZHNldHMubGVuZ3RoKSAmJiB0aGlzLmNvbnRyb2xzICYmIHRoaXMuY29udHJvbHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzZXRzID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNvbnRyb2xzOiB0aGlzLmNvbnRyb2xzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICAgIHRoaXMubnVtQ29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLmxlbmd0aDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZHNldHMpIHtcclxuICAgICAgdGhpcy5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcclxuICAgICAgICB0aGlzLm51bUNvbnRyb2xzID0gdGhpcy5udW1Db250cm9scyArIGZpZWxkc2V0LmNvbnRyb2xzLmxlbmd0aDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWlyZWRGaWVsZHM6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIGNvbnN0IG5vblJlcXVpcmVkRmllbGRzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICB0aGlzLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xyXG4gICAgICBmaWVsZHNldC5jb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbnRyb2wucmVxdWlyZWQpIHtcclxuICAgICAgICAgIHJlcXVpcmVkRmllbGRzLnB1c2goY29udHJvbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vblJlcXVpcmVkRmllbGRzLnB1c2goY29udHJvbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hbGxGaWVsZHNSZXF1aXJlZCA9IHJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gdGhpcy5udW1Db250cm9scztcclxuICAgIHRoaXMuYWxsRmllbGRzTm90UmVxdWlyZWQgPSBub25SZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IHRoaXMubnVtQ29udHJvbHM7XHJcbiAgICBpZiAodGhpcy5hbGxGaWVsZHNOb3RSZXF1aXJlZCAmJiB0aGlzLmhpZGVOb25SZXF1aXJlZEZpZWxkcykge1xyXG4gICAgICB0aGlzLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xyXG4gICAgICAgIGZpZWxkc2V0LmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sLmtleV0uaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtLmZpZWxkc2V0cyA9IFsuLi50aGlzLmZpZWxkc2V0c107XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXN0b21UZW1wbGF0ZXMgJiYgdGhpcy5jdXN0b21UZW1wbGF0ZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuY3VzdG9tVGVtcGxhdGVzLmZvckVhY2goKHRlbXBsYXRlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5hZGRDdXN0b20odGVtcGxhdGUubmFtZSwgdGVtcGxhdGUudGVtcGxhdGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93QWxsRmllbGRzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtLmZpZWxkc2V0cy5mb3JFYWNoKChmaWVsZHNldCkgPT4ge1xyXG4gICAgICBmaWVsZHNldC5jb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3RsID0gdGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2wua2V5XTtcclxuICAgICAgICBpZiAoIXRoaXMuZmllbGRzQWxyZWFkeUhpZGRlbi5pbmNsdWRlcyhjb250cm9sLmtleSkpIHtcclxuICAgICAgICAgIGN0bC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNob3dpbmdBbGxGaWVsZHMgPSB0cnVlO1xyXG4gICAgdGhpcy5zaG93aW5nUmVxdWlyZWRGaWVsZHMgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93T25seVJlcXVpcmVkKGhpZGVSZXF1aXJlZFdpdGhWYWx1ZSk6IHZvaWQge1xyXG4gICAgdGhpcy5maWVsZHNBbHJlYWR5SGlkZGVuID0gW107XHJcbiAgICB0aGlzLmZvcm0uZmllbGRzZXRzLmZvckVhY2goKGZpZWxkc2V0KSA9PiB7XHJcbiAgICAgIGZpZWxkc2V0LmNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcclxuICAgICAgICBjb25zdCBjdGwgPSB0aGlzLmZvcm0uY29udHJvbHNbY29udHJvbC5rZXldO1xyXG5cclxuICAgICAgICBpZiAoY3RsLmhpZGRlbikge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHNBbHJlYWR5SGlkZGVuLnB1c2goY29udHJvbC5rZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGlkZSBhbnkgbm9uLXJlcXVpcmVkIGZpZWxkc1xyXG4gICAgICAgIGlmICghY29udHJvbC5yZXF1aXJlZCkge1xyXG4gICAgICAgICAgY3RsLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIaWRlIHJlcXVpcmVkIGZpZWxkcyB0aGF0IGhhdmUgYmVlbiBzdWNjZXNzZnVsbHkgZmlsbGVkIG91dFxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGhpZGVSZXF1aXJlZFdpdGhWYWx1ZSAmJlxyXG4gICAgICAgICAgIUhlbHBlcnMuaXNCbGFuayh0aGlzLmZvcm0udmFsdWVbY29udHJvbC5rZXldKSAmJlxyXG4gICAgICAgICAgKCFjb250cm9sLmlzRW1wdHkgfHwgKGNvbnRyb2wuaXNFbXB0eSAmJiBjb250cm9sLmlzRW1wdHkoY3RsKSkpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjdGwuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvbid0IGhpZGUgZmllbGRzIHdpdGggZXJyb3JzXHJcbiAgICAgICAgaWYgKGN0bC5lcnJvcnMpIHtcclxuICAgICAgICAgIGN0bC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNob3dpbmdBbGxGaWVsZHMgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd2luZ1JlcXVpcmVkRmllbGRzID0gdHJ1ZTtcclxuICAgIHRoaXMuZm9yY2VWYWxpZGF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgdmFsdWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybSA/IHRoaXMuZm9ybS52YWx1ZSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNWYWxpZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm0gPyB0aGlzLmZvcm0udmFsaWQgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVkVmFsdWVzKCk6IGFueSB7XHJcbiAgICBsZXQgcmV0ID0gbnVsbDtcclxuICAgIHRoaXMuZm9ybS5maWVsZHNldHMuZm9yRWFjaCgoZmllbGRzZXQpID0+IHtcclxuICAgICAgZmllbGRzZXQuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHNbY29udHJvbC5rZXldLmRpcnR5IHx8IGNvbnRyb2wuZGlydHkpIHtcclxuICAgICAgICAgIGlmICghcmV0KSB7XHJcbiAgICAgICAgICAgIHJldCA9IHt9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0W2NvbnRyb2wua2V5XSA9IHRoaXMuZm9ybS52YWx1ZVtjb250cm9sLmtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmb3JjZVZhbGlkYXRpb24oKTogdm9pZCB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm0uY29udHJvbHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRyb2w6IGFueSA9IHRoaXMuZm9ybS5jb250cm9sc1trZXldO1xyXG4gICAgICBpZiAoY29udHJvbC5yZXF1aXJlZCAmJiBIZWxwZXJzLmlzQmxhbmsodGhpcy5mb3JtLnZhbHVlW2NvbnRyb2wua2V5XSkpIHtcclxuICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XHJcbiAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=