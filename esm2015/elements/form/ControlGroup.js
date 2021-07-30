// NG
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
// App
import { NovoFormGroup } from './NovoFormGroup';
import { BaseControl } from './controls/BaseControl';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';
export class NovoControlGroup {
    constructor(formUtils, fb, ref) {
        this.formUtils = formUtils;
        this.fb = fb;
        this.ref = ref;
        this._vertical = false;
        this._remove = false;
        this._edit = false;
        this._collapsible = false;
        this.onRemove = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.onAdd = new EventEmitter();
        this.change = new EventEmitter();
        this.controlLabels = [];
        this.toggled = false;
        this.disabledArray = [];
        this.currentIndex = 0;
    }
    // Sets the display of the group to either be row (default) or vertical via flex-box
    set vertical(v) {
        this._vertical = coerceBooleanProperty(v);
    }
    get vertical() {
        return this._vertical;
    }
    // Hide/shows the remove button for removing a control
    set remove(v) {
        this._remove = coerceBooleanProperty(v);
    }
    get remove() {
        return this._remove;
    }
    // Hide/shows the edit button for editing a control
    set edit(v) {
        this._edit = coerceBooleanProperty(v);
    }
    get edit() {
        return this._edit;
    }
    // Allows the control to collapse or not
    set collapsible(v) {
        this._collapsible = coerceBooleanProperty(v);
    }
    get collapsible() {
        return this._collapsible;
    }
    // Icon of the control group (can have bhi prefix or not)
    set icon(v) {
        this._icon = v && v.indexOf('bhi') !== -1 ? v : `bhi-${v}`;
    }
    get icon() {
        return this._icon;
    }
    ngAfterContentInit() {
        if (!this.key) {
            throw new Error('novo-control-group must have the [key] attribute provided!');
        }
    }
    ngOnChanges(changes) {
        const initialValueChange = changes['initialValue'];
        // If initial value changes, clear the controls
        if (initialValueChange && initialValueChange.currentValue !== initialValueChange.previousValue && !initialValueChange.firstChange) {
            this.clearControls();
        }
        // Check for array, add a control for each value
        if (this.initialValue && Array.isArray(this.initialValue)) {
            if (this.initialValue.length !== 0) {
                this.currentIndex = 0;
                this.initialValue.forEach((value) => this.addNewControl(value));
            }
        }
        else if (this.initialValue) {
            // If value is an object, just add one control
            this.addNewControl(this.initialValue);
        }
        // If we are horizontal, grab the labels to help with layout
        if (!this.vertical) {
            this.controlLabels = (this.controls || []).map((control) => {
                return {
                    value: control.label,
                    width: control.width,
                    required: control.required,
                    key: control.key,
                };
            });
            this.ref.markForCheck();
        }
    }
    ngOnDestroy() {
        this.clearControls();
    }
    onChange() {
        this.change.emit(this);
    }
    resetAddRemove() {
        this.disabledArray.forEach((item, idx) => {
            item.edit = this.checkCanEdit(idx);
            item.remove = this.checkCanRemove(idx);
        });
        this.ref.markForCheck();
    }
    addNewControl(value) {
        const controlsArray = this.form.controls[this.key];
        const nestedFormGroup = this.buildNestedFormGroup(value);
        if (controlsArray) {
            controlsArray.push(nestedFormGroup);
        }
        else {
            this.form.addControl(this.key, this.fb.array([nestedFormGroup]));
            // Ensure that field interaction changes for nested forms originating from outside the form will be reflected in the nested elements
            nestedFormGroup.fieldInteractionEvents.subscribe(this.onFieldInteractionEvent.bind(this));
        }
        this.disabledArray.push({
            edit: true,
            remove: true,
        });
        this.resetAddRemove();
        if (!value) {
            this.onAdd.emit();
        }
        this.currentIndex++;
        this.assignIndexes();
        this.ref.markForCheck();
    }
    removeControl(index, emitEvent = true) {
        const controlsArray = this.form.controls[this.key];
        const nestedFormGroup = controlsArray.at(index);
        nestedFormGroup.fieldInteractionEvents.unsubscribe();
        if (emitEvent) {
            this.onRemove.emit({ value: nestedFormGroup.value, index });
        }
        controlsArray.removeAt(index);
        this.disabledArray = this.disabledArray.filter((value, idx) => idx !== index);
        this.resetAddRemove();
        this.currentIndex--;
        this.assignIndexes();
        this.ref.markForCheck();
    }
    editControl(index) {
        const controlsArray = this.form.controls[this.key];
        this.onEdit.emit({ value: controlsArray.at(index).value, index });
    }
    toggle(event) {
        Helpers.swallowEvent(event);
        if (this.collapsible) {
            this.toggled = !this.toggled;
            this.ref.markForCheck();
        }
    }
    buildNestedFormGroup(value) {
        const newControls = this.getNewControls();
        if (value) {
            this.formUtils.setInitialValues(newControls, value);
        }
        return this.formUtils.toFormGroup(newControls);
    }
    clearControls() {
        const controlsArray = this.form.controls[this.key];
        if (controlsArray) {
            for (let i = controlsArray.length - 1; i >= 0; i--) {
                this.removeControl(i, false);
            }
            this.currentIndex = 0;
        }
    }
    checkCanEdit(index) {
        if (this.canEdit) {
            const controlsArray = this.form.controls[this.key];
            return this.canEdit(controlsArray.at(index).value, index);
        }
        return true;
    }
    checkCanRemove(index) {
        if (this.canRemove) {
            const controlsArray = this.form.controls[this.key];
            if (controlsArray.at(index)) {
                return this.canRemove(controlsArray.at(index).value, index);
            }
            return true;
        }
        return true;
    }
    getNewControls() {
        const ret = [];
        (this.controls || []).forEach((control) => {
            ret.push(new BaseControl(control.__type, control));
        });
        return ret;
    }
    assignIndexes() {
        const controlsArray = this.form.controls[this.key];
        if (controlsArray) {
            for (let i = 0; i < controlsArray.length; i++) {
                const form = controlsArray.at(i);
                form.associations = Object.assign(Object.assign({}, form.associations), { index: i });
            }
        }
    }
    onFieldInteractionEvent() {
        this.ref.markForCheck();
    }
}
NovoControlGroup.decorators = [
    { type: Component, args: [{
                selector: 'novo-control-group',
                template: "<h6 class=\"novo-section-header\" *ngIf=\"label\">\r\n  <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\r\n    <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\r\n    <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\" [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\r\n    <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\r\n  </span>\r\n  <label class=\"novo-control-group-description\" *ngIf=\"description\" [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\r\n</h6>\r\n<div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\" [class.hidden]=\"collapsible && !toggled\">\r\n  <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\r\n    <div class=\"novo-control-group-control\">\r\n      <div *ngFor=\"let c of controls\" class=\"novo-control-container {{c.key}}\" [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\r\n        <novo-control (change)=\"onChange()\" [form]=\"(form?.controls)[key]['controls'][index]\" [control]=\"c\" [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\r\n      </div>\r\n      <div class=\"novo-control-container last\" *ngIf=\"edit && !vertical\">\r\n        <button [disabled]=\"!disabledArray[index].edit\" type=\"button\" *ngIf=\"edit && !vertical\" theme=\"icon\" icon=\"edit\" (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\"></button>\r\n      </div>\r\n      <div class=\"novo-control-container last\" *ngIf=\"remove && !vertical\">\r\n        <button [disabled]=\"!disabledArray[index].remove\" type=\"button\" *ngIf=\"remove && !vertical\" theme=\"icon\" icon=\"delete-o\" (click)=\"removeControl(index)\" [attr.data-automation-id]=\"'novo-control-group-delete-' + key\" index=\"-1\"></button>\r\n      </div>\r\n    </div>\r\n    <button [disabled]=\"!disabledArray[index].edit\" type=\"button\" *ngIf=\"edit && vertical\" theme=\"icon\" icon=\"edit\" (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\"></button>\r\n    <button [disabled]=\"!disabledArray[index].remove\" type=\"button\" *ngIf=\"remove && vertical\" theme=\"icon\" icon=\"delete-o\" (click)=\"removeControl(index)\" [attr.data-automation-id]=\"'novo-control-group-delete-' + key\" index=\"-1\"></button>\r\n  </ng-template>\r\n  <ng-template #defaultColumnLabelTemplate let-form=\"form\" let-key=\"key\">\r\n      <div class=\"novo-control-group-control-label {{ label.key }}\" *ngFor=\"let label of controlLabels\" [style.max-width.px]=\"label.width\" [class.column-required]=\"label.required\">\r\n        <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\r\n      </div>\r\n      <div class=\"novo-control-group-control-label last\" *ngIf=\"edit\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\r\n      <div class=\"novo-control-group-control-label last\" *ngIf=\"remove\" [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\r\n  </ng-template>\r\n  <ng-container *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\r\n    <div class=\"novo-control-group-labels\" *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\r\n      <ng-template [ngTemplateOutlet]=\"columnLabelTemplate || defaultColumnLabelTemplate\" [ngTemplateOutletContext]=\"{ form: form, key: key, controlLabels: controlLabels }\">\r\n      </ng-template>\r\n    </div>\r\n  </ng-container>\r\n  <ng-container *ngIf=\"(form?.controls)[key]\">\r\n    <div class=\"novo-control-group-row\" *ngFor=\"let control of (form?.controls)[key]['controls']; let index = index\">\r\n      <ng-template [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\" [ngTemplateOutletContext]=\"{ form: form, index: index, key: key, controls: controls }\">\r\n      </ng-template>\r\n    </div>\r\n  </ng-container>\r\n  <div class=\"novo-control-group-empty\" *ngIf=\"(form?.controls)[key] && (form?.controls)[key]['controls'].length === 0\" [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\r\n    {{ emptyMessage }}\r\n  </div>\r\n  <p *ngIf=\"add\">\r\n    <button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" (click)=\"addNewControl()\" [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">\r\n      {{ add?.label }}\r\n    </button>\r\n  </p>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoControlGroup.ctorParameters = () => [
    { type: FormUtils },
    { type: FormBuilder },
    { type: ChangeDetectorRef }
];
NovoControlGroup.propDecorators = {
    vertical: [{ type: Input }],
    add: [{ type: Input }],
    remove: [{ type: Input }],
    edit: [{ type: Input }],
    collapsible: [{ type: Input }],
    form: [{ type: Input }],
    controls: [{ type: Input }],
    key: [{ type: Input }],
    label: [{ type: Input }],
    description: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    icon: [{ type: Input }],
    initialValue: [{ type: Input }],
    canEdit: [{ type: Input }],
    canRemove: [{ type: Input }],
    rowTemplate: [{ type: Input }],
    columnLabelTemplate: [{ type: Input }],
    onRemove: [{ type: Output }],
    onEdit: [{ type: Output }],
    onAdd: [{ type: Output }],
    change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEdyb3VwLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9mb3JtL0NvbnRyb2xHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUNhLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF3QixNQUFNLEVBQzNHLFdBQVcsR0FDM0IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE1BQU07QUFDTixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFnQjlDLE1BQU0sT0FBTyxnQkFBZ0I7SUFrRjNCLFlBQW9CLFNBQW9CLEVBQVUsRUFBZSxFQUFVLEdBQXNCO1FBQTdFLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF6RXpGLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFXbEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQVNoQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBU2QsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFpQ25CLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDOUMsVUFBSyxH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U0wsS0FBSzttQkFTTCxLQUFLO3VCQUVMLEtBQUs7a0JBRUwsS0FBSztvQkFFTCxLQUFLOzBCQUVMLEtBQUs7MkJBRUwsS0FBSzttQkFFTCxLQUFLOzJCQVNMLEtBQUs7c0JBRUwsS0FBSzt3QkFFTCxLQUFLOzBCQUVMLEtBQUs7a0NBRUwsS0FBSzt1QkFFTCxNQUFNO3FCQUNOLE1BQU07b0JBQ04sTUFBTTtxQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkdcclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlLFxyXG4gIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG4vLyBBcHBcclxuaW1wb3J0IHsgTm92b0Zvcm1Hcm91cCB9IGZyb20gJy4vTm92b0Zvcm1Hcm91cCc7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sIH0gZnJvbSAnLi9jb250cm9scy9CYXNlQ29udHJvbCc7XHJcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm0tdXRpbHMvRm9ybVV0aWxzJztcclxuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9Db250cm9sR3JvdXBSb3dDb25maWcge1xyXG4gIGVkaXQ6IGJvb2xlYW47XHJcbiAgcmVtb3ZlOiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tY29udHJvbC1ncm91cCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL0NvbnRyb2xHcm91cC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Db250cm9sR3JvdXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgLy8gU2V0cyB0aGUgZGlzcGxheSBvZiB0aGUgZ3JvdXAgdG8gZWl0aGVyIGJlIHJvdyAoZGVmYXVsdCkgb3IgdmVydGljYWwgdmlhIGZsZXgtYm94XHJcbiAgQElucHV0KClcclxuICBzZXQgdmVydGljYWwodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XHJcbiAgfVxyXG4gIGdldCB2ZXJ0aWNhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfdmVydGljYWwgPSBmYWxzZTtcclxuICAvLyBIaWRlcy9zaG93cyB0aGUgYWRkIGJ1dHRvbiBmb3IgYWRkaW5nIGEgbmV3IGNvbnRyb2xcclxuICBASW5wdXQoKSBhZGQ6IE5vdm9Db250cm9sR3JvdXBBZGRDb25maWc7XHJcbiAgLy8gSGlkZS9zaG93cyB0aGUgcmVtb3ZlIGJ1dHRvbiBmb3IgcmVtb3ZpbmcgYSBjb250cm9sXHJcbiAgQElucHV0KClcclxuICBzZXQgcmVtb3ZlKHY6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3JlbW92ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcclxuICB9XHJcbiAgZ2V0IHJlbW92ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9yZW1vdmU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3JlbW92ZSA9IGZhbHNlO1xyXG4gIC8vIEhpZGUvc2hvd3MgdGhlIGVkaXQgYnV0dG9uIGZvciBlZGl0aW5nIGEgY29udHJvbFxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGVkaXQodjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZWRpdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcclxuICB9XHJcbiAgZ2V0IGVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWRpdDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZWRpdCA9IGZhbHNlO1xyXG4gIC8vIEFsbG93cyB0aGUgY29udHJvbCB0byBjb2xsYXBzZSBvciBub3RcclxuICBASW5wdXQoKVxyXG4gIHNldCBjb2xsYXBzaWJsZSh2OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9jb2xsYXBzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcclxuICB9XHJcbiAgZ2V0IGNvbGxhcHNpYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNpYmxlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzaWJsZSA9IGZhbHNlO1xyXG4gIC8vIE1haW4gZm9ybSBncm91cFxyXG4gIEBJbnB1dCgpIGZvcm06IE5vdm9Gb3JtR3JvdXA7XHJcbiAgLy8gQ29udHJvbHMgZm9yIGVhY2ggaXRlbSBpbiB0aGUgY29udHJvbCBncm91cFxyXG4gIEBJbnB1dCgpIGNvbnRyb2xzOiBCYXNlQ29udHJvbFtdO1xyXG4gIC8vIEtleSBvZiB0aGUgY29udHJvbCBncm91cCAob24gdGhlIG1haW4gZm9ybSlcclxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcclxuICAvLyBMYWJlbCBvZiB0aGUgY29udHJvbCBncm91cFxyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcbiAgLy8gRGVzY3JpcHRpb24gb2YgdGhlIGNvbnRyb2wgZ3JvdXAgKG9ubHkgdXNlIHdpdGggcG9zaXRpb246Ym90dG9tIEFkZCBidXR0b24hKVxyXG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgLy8gTWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZXJlIGFyZSBubyBjb250cm9sc1xyXG4gIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nO1xyXG4gIC8vIEljb24gb2YgdGhlIGNvbnRyb2wgZ3JvdXAgKGNhbiBoYXZlIGJoaSBwcmVmaXggb3Igbm90KVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGljb24odjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9pY29uID0gdiAmJiB2LmluZGV4T2YoJ2JoaScpICE9PSAtMSA/IHYgOiBgYmhpLSR7dn1gO1xyXG4gIH1cclxuICBnZXQgaWNvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9pY29uO1xyXG4gIH1cclxuICBwcml2YXRlIF9pY29uOiBzdHJpbmc7XHJcbiAgLy8gVGhlIGluaXRpYWwgdmFsdWUgb2JqZWN0LCB3aWxsIGNyZWF0ZSB0aGUgZm9ybSByb3dzIG9mZiBvZlxyXG4gIEBJbnB1dCgpIGluaXRpYWxWYWx1ZToge31bXTtcclxuICAvLyBDYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGVkaXRcclxuICBASW5wdXQoKSBjYW5FZGl0OiBGdW5jdGlvbjtcclxuICAvLyBDYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGRlbGV0ZVxyXG4gIEBJbnB1dCgpIGNhblJlbW92ZTogRnVuY3Rpb247XHJcbiAgLy8gVGVtcGxhdGUgZm9yIGN1c3RvbSByb3cgcmVuZGVyaW5nXHJcbiAgQElucHV0KCkgcm93VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgLy8gVGVtcGxhdGUgZm9yIGN1c3RvbSBjb2x1bW4gbGFiZWwgcmVuZGVyaW5nXHJcbiAgQElucHV0KCkgY29sdW1uTGFiZWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQE91dHB1dCgpIG9uUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOyBpbmRleCB9PigpO1xyXG4gIEBPdXRwdXQoKSBvbkVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgdmFsdWU7IGluZGV4IH0+KCk7XHJcbiAgQE91dHB1dCgpIG9uQWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb250cm9sTGFiZWxzOiB7IHZhbHVlOiBzdHJpbmc7IHdpZHRoOiBudW1iZXI7IHJlcXVpcmVkOiBib29sZWFuOyBrZXk6IHN0cmluZyB9W10gPSBbXTtcclxuICB0b2dnbGVkID0gZmFsc2U7XHJcbiAgZGlzYWJsZWRBcnJheTogeyBlZGl0OiBib29sZWFuOyByZW1vdmU6IGJvb2xlYW4gfVtdID0gW107XHJcblxyXG4gIGN1cnJlbnRJbmRleCA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybVV0aWxzOiBGb3JtVXRpbHMsIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5rZXkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3ZvLWNvbnRyb2wtZ3JvdXAgbXVzdCBoYXZlIHRoZSBba2V5XSBhdHRyaWJ1dGUgcHJvdmlkZWQhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBjb25zdCBpbml0aWFsVmFsdWVDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbJ2luaXRpYWxWYWx1ZSddO1xyXG5cclxuICAgIC8vIElmIGluaXRpYWwgdmFsdWUgY2hhbmdlcywgY2xlYXIgdGhlIGNvbnRyb2xzXHJcbiAgICBpZiAoaW5pdGlhbFZhbHVlQ2hhbmdlICYmIGluaXRpYWxWYWx1ZUNoYW5nZS5jdXJyZW50VmFsdWUgIT09IGluaXRpYWxWYWx1ZUNoYW5nZS5wcmV2aW91c1ZhbHVlICYmICFpbml0aWFsVmFsdWVDaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5jbGVhckNvbnRyb2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIGFycmF5LCBhZGQgYSBjb250cm9sIGZvciBlYWNoIHZhbHVlXHJcbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmluaXRpYWxWYWx1ZSkpIHtcclxuICAgICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmluaXRpYWxWYWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4gdGhpcy5hZGROZXdDb250cm9sKHZhbHVlKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5pbml0aWFsVmFsdWUpIHtcclxuICAgICAgLy8gSWYgdmFsdWUgaXMgYW4gb2JqZWN0LCBqdXN0IGFkZCBvbmUgY29udHJvbFxyXG4gICAgICB0aGlzLmFkZE5ld0NvbnRyb2wodGhpcy5pbml0aWFsVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgd2UgYXJlIGhvcml6b250YWwsIGdyYWIgdGhlIGxhYmVscyB0byBoZWxwIHdpdGggbGF5b3V0XHJcbiAgICBpZiAoIXRoaXMudmVydGljYWwpIHtcclxuICAgICAgdGhpcy5jb250cm9sTGFiZWxzID0gKHRoaXMuY29udHJvbHMgfHwgW10pLm1hcCgoY29udHJvbDogQmFzZUNvbnRyb2wpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdmFsdWU6IGNvbnRyb2wubGFiZWwsXHJcbiAgICAgICAgICB3aWR0aDogY29udHJvbC53aWR0aCxcclxuICAgICAgICAgIHJlcXVpcmVkOiBjb250cm9sLnJlcXVpcmVkLFxyXG4gICAgICAgICAga2V5OiBjb250cm9sLmtleSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2xlYXJDb250cm9scygpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRBZGRSZW1vdmUoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkQXJyYXkuZm9yRWFjaCgoaXRlbTogTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZywgaWR4OiBudW1iZXIpID0+IHtcclxuICAgICAgaXRlbS5lZGl0ID0gdGhpcy5jaGVja0NhbkVkaXQoaWR4KTtcclxuICAgICAgaXRlbS5yZW1vdmUgPSB0aGlzLmNoZWNrQ2FuUmVtb3ZlKGlkeCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgYWRkTmV3Q29udHJvbCh2YWx1ZT86IHt9KSB7XHJcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSA8Rm9ybUFycmF5PnRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV07XHJcbiAgICBjb25zdCBuZXN0ZWRGb3JtR3JvdXA6IE5vdm9Gb3JtR3JvdXAgPSB0aGlzLmJ1aWxkTmVzdGVkRm9ybUdyb3VwKHZhbHVlKTtcclxuICAgIGlmIChjb250cm9sc0FycmF5KSB7XHJcbiAgICAgIGNvbnRyb2xzQXJyYXkucHVzaChuZXN0ZWRGb3JtR3JvdXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wodGhpcy5rZXksIHRoaXMuZmIuYXJyYXkoW25lc3RlZEZvcm1Hcm91cF0pKTtcclxuICAgICAgLy8gRW5zdXJlIHRoYXQgZmllbGQgaW50ZXJhY3Rpb24gY2hhbmdlcyBmb3IgbmVzdGVkIGZvcm1zIG9yaWdpbmF0aW5nIGZyb20gb3V0c2lkZSB0aGUgZm9ybSB3aWxsIGJlIHJlZmxlY3RlZCBpbiB0aGUgbmVzdGVkIGVsZW1lbnRzXHJcbiAgICAgIG5lc3RlZEZvcm1Hcm91cC5maWVsZEludGVyYWN0aW9uRXZlbnRzLnN1YnNjcmliZSh0aGlzLm9uRmllbGRJbnRlcmFjdGlvbkV2ZW50LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kaXNhYmxlZEFycmF5LnB1c2goe1xyXG4gICAgICBlZGl0OiB0cnVlLFxyXG4gICAgICByZW1vdmU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVzZXRBZGRSZW1vdmUoKTtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgdGhpcy5vbkFkZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgdGhpcy5hc3NpZ25JbmRleGVzKCk7XHJcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvbnRyb2woaW5kZXg6IG51bWJlciwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgY29udHJvbHNBcnJheTogRm9ybUFycmF5ID0gPEZvcm1BcnJheT50aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldO1xyXG4gICAgY29uc3QgbmVzdGVkRm9ybUdyb3VwID0gY29udHJvbHNBcnJheS5hdChpbmRleCkgYXMgTm92b0Zvcm1Hcm91cDtcclxuICAgIG5lc3RlZEZvcm1Hcm91cC5maWVsZEludGVyYWN0aW9uRXZlbnRzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZiAoZW1pdEV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25SZW1vdmUuZW1pdCh7IHZhbHVlOiBuZXN0ZWRGb3JtR3JvdXAudmFsdWUsIGluZGV4IH0pO1xyXG4gICAgfVxyXG4gICAgY29udHJvbHNBcnJheS5yZW1vdmVBdChpbmRleCk7XHJcbiAgICB0aGlzLmRpc2FibGVkQXJyYXkgPSB0aGlzLmRpc2FibGVkQXJyYXkuZmlsdGVyKCh2YWx1ZTogTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZywgaWR4OiBudW1iZXIpID0+IGlkeCAhPT0gaW5kZXgpO1xyXG4gICAgdGhpcy5yZXNldEFkZFJlbW92ZSgpO1xyXG4gICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcclxuICAgIHRoaXMuYXNzaWduSW5kZXhlcygpO1xyXG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBlZGl0Q29udHJvbChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSA8Rm9ybUFycmF5PnRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV07XHJcbiAgICB0aGlzLm9uRWRpdC5lbWl0KHsgdmFsdWU6IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpLnZhbHVlLCBpbmRleCB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUpIHtcclxuICAgICAgdGhpcy50b2dnbGVkID0gIXRoaXMudG9nZ2xlZDtcclxuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkTmVzdGVkRm9ybUdyb3VwKHZhbHVlPzoge30pOiBOb3ZvRm9ybUdyb3VwIHtcclxuICAgIGNvbnN0IG5ld0NvbnRyb2xzID0gdGhpcy5nZXROZXdDb250cm9scygpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMobmV3Q29udHJvbHMsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChuZXdDb250cm9scyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFyQ29udHJvbHMoKSB7XHJcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSA8Rm9ybUFycmF5PnRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV07XHJcbiAgICBpZiAoY29udHJvbHNBcnJheSkge1xyXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBjb250cm9sc0FycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDb250cm9sKGksIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrQ2FuRWRpdChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5jYW5FZGl0KSB7XHJcbiAgICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IDxGb3JtQXJyYXk+dGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XTtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FuRWRpdChjb250cm9sc0FycmF5LmF0KGluZGV4KS52YWx1ZSwgaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoZWNrQ2FuUmVtb3ZlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmNhblJlbW92ZSkge1xyXG4gICAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSA8Rm9ybUFycmF5PnRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV07XHJcbiAgICAgIGlmIChjb250cm9sc0FycmF5LmF0KGluZGV4KSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhblJlbW92ZShjb250cm9sc0FycmF5LmF0KGluZGV4KS52YWx1ZSwgaW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE5ld0NvbnRyb2xzKCkge1xyXG4gICAgY29uc3QgcmV0OiBCYXNlQ29udHJvbFtdID0gW107XHJcbiAgICAodGhpcy5jb250cm9scyB8fCBbXSkuZm9yRWFjaCgoY29udHJvbDogQmFzZUNvbnRyb2wpID0+IHtcclxuICAgICAgcmV0LnB1c2gobmV3IEJhc2VDb250cm9sKGNvbnRyb2wuX190eXBlLCBjb250cm9sKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzc2lnbkluZGV4ZXMoKSB7XHJcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSA8Rm9ybUFycmF5PnRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV07XHJcbiAgICBpZiAoY29udHJvbHNBcnJheSkge1xyXG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgY29udHJvbHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBjb250cm9sc0FycmF5LmF0KGkpIGFzIE5vdm9Gb3JtR3JvdXA7XHJcbiAgICAgICAgZm9ybS5hc3NvY2lhdGlvbnMgPSB7IC4uLmZvcm0uYXNzb2NpYXRpb25zLCBpbmRleDogaSB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmllbGRJbnRlcmFjdGlvbkV2ZW50KCkge1xyXG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==