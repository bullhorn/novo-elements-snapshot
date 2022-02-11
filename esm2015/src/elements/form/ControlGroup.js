// NG
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Helpers } from '../../utils/Helpers';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { BaseControl } from './controls/BaseControl';
import { NovoFormGroup } from './NovoFormGroup';
export var EditState;
(function (EditState) {
    EditState["EDITING"] = "editing";
    EditState["NOT_EDITING"] = "notediting";
})(EditState || (EditState = {}));
export class NovoControlGroup {
    constructor(formUtils, fb, ref) {
        this.formUtils = formUtils;
        this.fb = fb;
        this.ref = ref;
        this._appearance = 'none';
        this._vertical = false;
        this._stacked = false;
        this._remove = false;
        this._edit = false;
        this._collapsible = false;
        // Edit icon at the end of each row (no bhi- prefix)
        this.editIcon = 'edit';
        // Remove icon at the end of each row (no bhi- prefix)
        this.removeIcon = 'delete-o';
        this.onRemove = new EventEmitter();
        this.onEdit = new EventEmitter();
        this.onAdd = new EventEmitter();
        this.change = new EventEmitter();
        this.controlLabels = [];
        this.toggled = false;
        this.disabledArray = [];
        this.editState = EditState.NOT_EDITING;
        this.currentIndex = 0;
    }
    set appearance(value) {
        this._appearance = value;
    }
    get appearance() {
        return this._appearance;
    }
    // Sets the display of the group to either be row (default) or vertical via flex-box
    set vertical(v) {
        this._vertical = coerceBooleanProperty(v);
    }
    get vertical() {
        return this._vertical;
    }
    set stacked(v) {
        this._stacked = coerceBooleanProperty(v);
    }
    get stacked() {
        return this._stacked;
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
        const initialValueChange = changes.initialValue;
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
                    hidden: control.hidden,
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
    onClickAdd() {
        this.addNewControl();
        // this.editState = EditState.EDITING;
    }
    onClickCancel() {
        this.editState = EditState.NOT_EDITING;
    }
    onClickSave() {
        this.disabledArray[this.currentIndex - 1].state = EditState.NOT_EDITING;
        this.editState = EditState.NOT_EDITING;
        const control = this.form.controls[this.key];
        if (control) {
            const fg = control.at(this.currentIndex - 1);
            fg.disableAllControls();
        }
    }
    resetAddRemove() {
        this.disabledArray.forEach((item, idx) => {
            item.edit = this.checkCanEdit(idx);
            item.remove = this.checkCanRemove(idx);
            if (!item.edit) {
                item.state = EditState.NOT_EDITING;
            }
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
        }
        this.disabledArray.push({
            state: EditState.EDITING,
            edit: true,
            remove: true,
        });
        this.resetAddRemove();
        if (!value) {
            this.onAdd.emit(nestedFormGroup);
        }
        this.currentIndex++;
        this.assignIndexes();
        // Ensure that field interaction changes for nested forms originating from outside the form will be reflected in the nested elements
        nestedFormGroup.fieldInteractionEvents.subscribe(this.onFieldInteractionEvent.bind(this));
        this.ref.markForCheck();
    }
    /**
     * Will remove the control, and optionally, if the event is to be publicized (emitEvent = true) and there is a
     * shouldRemove callback, then call the shouldRemove() callback to determine if the doRemoveControl should be called.
     */
    removeControl(index, emitEvent = true) {
        if (emitEvent && Helpers.isFunction(this.shouldRemove)) {
            this.shouldRemove(index).then((shouldRemove) => {
                if (shouldRemove) {
                    this.doRemoveControl(index, emitEvent);
                }
            });
        }
        else {
            this.doRemoveControl(index, emitEvent);
        }
    }
    doRemoveControl(index, emitEvent) {
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
        const fg = controlsArray.at(index);
        fg.enableAllControls();
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
                template: "<h6 class=\"novo-section-header\" *ngIf=\"label\">\n  <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\n    <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\n    <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\"\n      [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\n    <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\n  </span>\n  <label class=\"novo-control-group-description\" *ngIf=\"description\"\n    [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\n</h6>\n<div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\"\n  [class.hidden]=\"collapsible && !toggled\">\n\n  <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\n    <div class=\"novo-control-group-control\">\n      <div *ngFor=\"let c of controls\" class=\"novo-control-container {{c.key}}\"\n        [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\n        <novo-control (change)=\"onChange()\" [form]=\"(form?.controls)[key]['controls'][index]\" [control]=\"c\"\n          [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\n      </div>\n      <div class=\"novo-control-container edit last\" *ngIf=\"edit && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n          *ngIf=\"edit && !vertical\" theme=\"icon\" icon=\"editIcon\"\n          (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n        </novo-button>\n      </div>\n      <div class=\"novo-control-container remove last\" *ngIf=\"remove && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n          *ngIf=\"remove && !vertical\" theme=\"icon\"\n          icon=\"removeIcon\" (click)=\"removeControl(index)\"\n          [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n          index=\"-1\">\n        </novo-button>\n      </div>\n    </div>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n      *ngIf=\"edit && vertical\"\n      theme=\"icon\" icon=\"editIcon\"\n      (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n    </novo-button>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n      *ngIf=\"remove && vertical\" theme=\"icon\"\n      icon=\"removeIcon\" (click)=\"removeControl(index)\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n      index=\"-1\">\n    </novo-button>\n  </ng-template>\n\n  <ng-template #defaultColumnLabelTemplate let-form=\"form\" let-key=\"key\">\n    <div *ngFor=\"let label of controlLabels\"\n      class=\"novo-control-group-control-label {{ label.key }}\"\n      [class.novo-control-group-control-hidden]=\"label.hidden\"\n      [style.max-width.px]=\"label.width\" [class.column-required]=\"label.required\">\n      <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\n    </div>\n    <div class=\"novo-control-group-control-label edit last\" *ngIf=\"edit\"\n      [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\n    <div class=\"novo-control-group-control-label remove last\" *ngIf=\"remove\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\n  </ng-template>\n\n  <ng-container *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n    <div class=\"novo-control-group-labels\"\n      *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n      <ng-template [ngTemplateOutlet]=\"columnLabelTemplate || defaultColumnLabelTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, key: key, controlLabels: controlLabels }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"(form?.controls)[key]\">\n    <div class=\"novo-control-group-row\"\n      *ngFor=\"let control of (form?.controls)[key]['controls']; let index = index\">\n      <ng-template [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, formGroup: control, index: index, key: key, controls: controls }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <div class=\"novo-control-group-empty\"\n    *ngIf=\"(form?.controls)[key] && (form?.controls)[key]['controls'].length === 0\"\n    [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\n    {{ emptyMessage }}\n  </div>\n\n  <div *ngIf=\"add\" class=\"novo-control-group-footer\">\n    <novo-button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" side=\"left\" (click)=\"onClickAdd()\"\n      [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">\n      {{ add?.label }}\n    </novo-button>\n    <!-- <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"close\" side=\"left\"\n                  (click)=\"onClickCancel()\" [attr.data-automation-id]=\"'novo-control-group-bottom-cancel-' + key\"\n                  index=\"-1\">\n                {{ 'cancel' }}\n                </novo-button>\n                  <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"check\" side=\"left\"\n                  (click)=\"onClickSave()\" [attr.data-automation-id]=\"'novo-control-group-bottom-save-' + key\"\n                  index=\"-1\">\n                {{ add?.label }}\n                </novo-button> -->\n  </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.novo-control-group-appearance-card]': "appearance=='card'",
                    '[class.novo-control-group-appearance-none]': "appearance=='none'",
                }
            },] }
];
NovoControlGroup.ctorParameters = () => [
    { type: FormUtils },
    { type: FormBuilder },
    { type: ChangeDetectorRef }
];
NovoControlGroup.propDecorators = {
    appearance: [{ type: Input }],
    vertical: [{ type: Input }],
    stacked: [{ type: Input }],
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
    editIcon: [{ type: Input }],
    removeIcon: [{ type: Input }],
    initialValue: [{ type: Input }],
    canEdit: [{ type: Input }],
    canRemove: [{ type: Input }],
    shouldRemove: [{ type: Input }],
    rowTemplate: [{ type: Input }],
    columnLabelTemplate: [{ type: Input }],
    onRemove: [{ type: Output }],
    onEdit: [{ type: Output }],
    onAdd: [{ type: Output }],
    change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEdyb3VwLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2Zvcm0vQ29udHJvbEdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUdOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBTWhELE1BQU0sQ0FBTixJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDbkIsZ0NBQW1CLENBQUE7SUFDbkIsdUNBQTBCLENBQUE7QUFDNUIsQ0FBQyxFQUhXLFNBQVMsS0FBVCxTQUFTLFFBR3BCO0FBaUJELE1BQU0sT0FBTyxnQkFBZ0I7SUEwRzNCLFlBQW9CLFNBQW9CLEVBQVUsRUFBZSxFQUFVLEdBQXNCO1FBQTdFLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFsR3pGLGdCQUFXLEdBQW9CLE1BQU0sQ0FBQztRQVV0QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBUWxCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFZakIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQVNoQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBU2QsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFzQjdCLG9EQUFvRDtRQUMzQyxhQUFRLEdBQUcsTUFBTSxDQUFDO1FBQzNCLHNEQUFzRDtRQUM3QyxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBY3ZCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNoRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUFDOUMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0Msa0JBQWEsR0FBeUYsRUFBRSxDQUFDO1FBQ3pHLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBZ0MsRUFBRSxDQUFDO1FBQ2hELGNBQVMsR0FBYyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQzdDLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRW1GLENBQUM7SUF6R3JHLElBQ0ksVUFBVSxDQUFDLEtBQXNCO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUdELG9GQUFvRjtJQUNwRixJQUNJLFFBQVEsQ0FBQyxDQUFVO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFDSSxPQUFPLENBQUMsQ0FBVTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUtELHNEQUFzRDtJQUN0RCxJQUNJLE1BQU0sQ0FBQyxDQUFVO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsbURBQW1EO0lBQ25ELElBQ0ksSUFBSSxDQUFDLENBQVU7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsSUFDSSxXQUFXLENBQUMsQ0FBVTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQWNELHlEQUF5RDtJQUN6RCxJQUNJLElBQUksQ0FBQyxDQUFTO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFnQ0Qsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1NBQy9FO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLGtCQUFrQixHQUFpQixPQUFPLENBQUMsWUFBWSxDQUFDO1FBRTlELCtDQUErQztRQUMvQyxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFlBQVksS0FBSyxrQkFBa0IsQ0FBQyxhQUFhLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDakksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBRUQsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakU7U0FDRjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM1Qiw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdkM7UUFDRCw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBb0IsRUFBRSxFQUFFO2dCQUN0RSxPQUFPO29CQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDcEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO29CQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQzFCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDaEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2lCQUN2QixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixzQ0FBc0M7SUFDeEMsQ0FBQztJQUNELGFBQWE7UUFDWCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE1BQU0sT0FBTyxHQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sRUFBRTtZQUNYLE1BQU0sRUFBRSxHQUFrQixPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFrQixDQUFDO1lBQzdFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQStCLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFVO1FBQ3RCLE1BQU0sYUFBYSxHQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWMsQ0FBQztRQUMzRSxNQUFNLGVBQWUsR0FBa0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLElBQUksYUFBYSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN0QixLQUFLLEVBQUUsU0FBUyxDQUFDLE9BQU87WUFDeEIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLG9JQUFvSTtRQUNwSSxlQUFlLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxhQUFhLENBQUMsS0FBYSxFQUFFLFNBQVMsR0FBRyxJQUFJO1FBQzNDLElBQUksU0FBUyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBcUIsRUFBRSxFQUFFO2dCQUN0RCxJQUFJLFlBQVksRUFBRTtvQkFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQWEsRUFBRSxTQUFrQjtRQUN2RCxNQUFNLGFBQWEsR0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFjLENBQUM7UUFDM0UsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQWtCLENBQUM7UUFDakUsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBZ0MsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUN2QixNQUFNLGFBQWEsR0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFjLENBQUM7UUFDM0UsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQWtCLENBQUM7UUFDcEQsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWlCO1FBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU8sb0JBQW9CLENBQUMsS0FBVTtRQUNyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLGFBQWE7UUFDbkIsTUFBTSxhQUFhLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxDQUFDO1FBQzNFLElBQUksYUFBYSxFQUFFO1lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQVcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFTyxZQUFZLENBQUMsS0FBYTtRQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsTUFBTSxhQUFhLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxDQUFDO1lBQzNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLGNBQWMsQ0FBQyxLQUFhO1FBQ2xDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFNLGFBQWEsR0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFjLENBQUM7WUFDM0UsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDN0Q7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sY0FBYztRQUNwQixNQUFNLEdBQUcsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFvQixFQUFFLEVBQUU7WUFDckQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTyxhQUFhO1FBQ25CLE1BQU0sYUFBYSxHQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWMsQ0FBQztRQUMzRSxJQUFJLGFBQWEsRUFBRTtZQUNqQixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckQsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQWtCLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxZQUFZLG1DQUFRLElBQUksQ0FBQyxZQUFZLEtBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxDQUFDO2FBQ3hEO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBL1RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qix1eUxBQWtDO2dCQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNKLDRDQUE0QyxFQUFFLG9CQUFvQjtvQkFDbEUsNENBQTRDLEVBQUUsb0JBQW9CO2lCQUNuRTthQUNGOzs7WUEzQlEsU0FBUztZQUZFLFdBQVc7WUFYN0IsaUJBQWlCOzs7eUJBMENoQixLQUFLO3VCQVVMLEtBQUs7c0JBUUwsS0FBSztrQkFVTCxLQUFLO3FCQUVMLEtBQUs7bUJBU0wsS0FBSzswQkFTTCxLQUFLO21CQVNMLEtBQUs7dUJBRUwsS0FBSztrQkFFTCxLQUFLO29CQUVMLEtBQUs7MEJBRUwsS0FBSzsyQkFFTCxLQUFLO21CQUVMLEtBQUs7dUJBU0wsS0FBSzt5QkFFTCxLQUFLOzJCQUVMLEtBQUs7c0JBRUwsS0FBSzt3QkFFTCxLQUFLOzJCQUVMLEtBQUs7MEJBRUwsS0FBSztrQ0FFTCxLQUFLO3VCQUVMLE1BQU07cUJBQ04sTUFBTTtvQkFDTixNQUFNO3FCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvZm9ybS11dGlscy9Gb3JtVXRpbHMnO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICcuL2NvbnRyb2xzL0Jhc2VDb250cm9sJztcbmltcG9ydCB7IE5vdm9Gb3JtR3JvdXAgfSBmcm9tICcuL05vdm9Gb3JtR3JvdXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9Db250cm9sR3JvdXBBZGRDb25maWcge1xuICBsYWJlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBFZGl0U3RhdGUge1xuICBFRElUSU5HID0gJ2VkaXRpbmcnLFxuICBOT1RfRURJVElORyA9ICdub3RlZGl0aW5nJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQ29udHJvbEdyb3VwUm93Q29uZmlnIHtcbiAgZWRpdDogYm9vbGVhbjtcbiAgcmVtb3ZlOiBib29sZWFuO1xuICBzdGF0ZTogRWRpdFN0YXRlO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbnRyb2wtZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vQ29udHJvbEdyb3VwLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mubm92by1jb250cm9sLWdyb3VwLWFwcGVhcmFuY2UtY2FyZF0nOiBcImFwcGVhcmFuY2U9PSdjYXJkJ1wiLFxuICAgICdbY2xhc3Mubm92by1jb250cm9sLWdyb3VwLWFwcGVhcmFuY2Utbm9uZV0nOiBcImFwcGVhcmFuY2U9PSdub25lJ1wiLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29udHJvbEdyb3VwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZTogJ25vbmUnIHwgJ2NhcmQnKSB7XG4gICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlO1xuICB9XG4gIGdldCBhcHBlYXJhbmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBlYXJhbmNlO1xuICB9XG4gIHByaXZhdGUgX2FwcGVhcmFuY2U6ICdub25lJyB8ICdjYXJkJyA9ICdub25lJztcblxuICAvLyBTZXRzIHRoZSBkaXNwbGF5IG9mIHRoZSBncm91cCB0byBlaXRoZXIgYmUgcm93IChkZWZhdWx0KSBvciB2ZXJ0aWNhbCB2aWEgZmxleC1ib3hcbiAgQElucHV0KClcbiAgc2V0IHZlcnRpY2FsKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgdmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xuICB9XG4gIHByaXZhdGUgX3ZlcnRpY2FsID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBzdGFja2VkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdGFja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBzdGFja2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja2VkO1xuICB9XG4gIHByaXZhdGUgX3N0YWNrZWQgPSBmYWxzZTtcblxuICAvLyBIaWRlcy9zaG93cyB0aGUgYWRkIGJ1dHRvbiBmb3IgYWRkaW5nIGEgbmV3IGNvbnRyb2xcbiAgQElucHV0KCkgYWRkOiBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnO1xuICAvLyBIaWRlL3Nob3dzIHRoZSByZW1vdmUgYnV0dG9uIGZvciByZW1vdmluZyBhIGNvbnRyb2xcbiAgQElucHV0KClcbiAgc2V0IHJlbW92ZSh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCByZW1vdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmUgPSBmYWxzZTtcbiAgLy8gSGlkZS9zaG93cyB0aGUgZWRpdCBidXR0b24gZm9yIGVkaXRpbmcgYSBjb250cm9sXG4gIEBJbnB1dCgpXG4gIHNldCBlZGl0KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lZGl0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBlZGl0KCkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0O1xuICB9XG4gIHByaXZhdGUgX2VkaXQgPSBmYWxzZTtcbiAgLy8gQWxsb3dzIHRoZSBjb250cm9sIHRvIGNvbGxhcHNlIG9yIG5vdFxuICBASW5wdXQoKVxuICBzZXQgY29sbGFwc2libGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbGxhcHNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBjb2xsYXBzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cbiAgcHJpdmF0ZSBfY29sbGFwc2libGUgPSBmYWxzZTtcbiAgLy8gTWFpbiBmb3JtIGdyb3VwXG4gIEBJbnB1dCgpIGZvcm06IE5vdm9Gb3JtR3JvdXA7XG4gIC8vIENvbnRyb2xzIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGNvbnRyb2wgZ3JvdXBcbiAgQElucHV0KCkgY29udHJvbHM6IEJhc2VDb250cm9sW107XG4gIC8vIEtleSBvZiB0aGUgY29udHJvbCBncm91cCAob24gdGhlIG1haW4gZm9ybSlcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIC8vIExhYmVsIG9mIHRoZSBjb250cm9sIGdyb3VwXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIC8vIERlc2NyaXB0aW9uIG9mIHRoZSBjb250cm9sIGdyb3VwIChvbmx5IHVzZSB3aXRoIHBvc2l0aW9uOmJvdHRvbSBBZGQgYnV0dG9uISlcbiAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZztcbiAgLy8gTWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZXJlIGFyZSBubyBjb250cm9sc1xuICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZztcbiAgLy8gSWNvbiBvZiB0aGUgY29udHJvbCBncm91cCAoY2FuIGhhdmUgYmhpIHByZWZpeCBvciBub3QpXG4gIEBJbnB1dCgpXG4gIHNldCBpY29uKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2ljb24gPSB2ICYmIHYuaW5kZXhPZignYmhpJykgIT09IC0xID8gdiA6IGBiaGktJHt2fWA7XG4gIH1cbiAgZ2V0IGljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICAvLyBFZGl0IGljb24gYXQgdGhlIGVuZCBvZiBlYWNoIHJvdyAobm8gYmhpLSBwcmVmaXgpXG4gIEBJbnB1dCgpIGVkaXRJY29uID0gJ2VkaXQnO1xuICAvLyBSZW1vdmUgaWNvbiBhdCB0aGUgZW5kIG9mIGVhY2ggcm93IChubyBiaGktIHByZWZpeClcbiAgQElucHV0KCkgcmVtb3ZlSWNvbiA9ICdkZWxldGUtbyc7XG4gIC8vIFRoZSBpbml0aWFsIHZhbHVlIG9iamVjdCwgd2lsbCBjcmVhdGUgdGhlIGZvcm0gcm93cyBvZmYgb2ZcbiAgQElucHV0KCkgaW5pdGlhbFZhbHVlOiB7fVtdO1xuICAvLyBDYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGVkaXRcbiAgQElucHV0KCkgY2FuRWRpdDogRnVuY3Rpb247XG4gIC8vIENhbGxiYWNrIHRvIGRldGVybWluZSBpZiB0aGUgdXNlciBjYW4gZGVsZXRlXG4gIEBJbnB1dCgpIGNhblJlbW92ZTogRnVuY3Rpb247XG4gIC8vIE9wdGlvbmFsIGNhbGxiYWNrIGZvciB3aGV0aGVyIG9yIG5vdCB0byByZW1vdmUgdGhlIGdpdmVuIHJvd1xuICBASW5wdXQoKSBzaG91bGRSZW1vdmU6IChudW1iZXIpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIC8vIFRlbXBsYXRlIGZvciBjdXN0b20gcm93IHJlbmRlcmluZ1xuICBASW5wdXQoKSByb3dUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgLy8gVGVtcGxhdGUgZm9yIGN1c3RvbSBjb2x1bW4gbGFiZWwgcmVuZGVyaW5nXG4gIEBJbnB1dCgpIGNvbHVtbkxhYmVsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIG9uUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOyBpbmRleCB9PigpO1xuICBAT3V0cHV0KCkgb25FZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOyBpbmRleCB9PigpO1xuICBAT3V0cHV0KCkgb25BZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnRyb2xMYWJlbHM6IHsgdmFsdWU6IHN0cmluZzsgd2lkdGg6IG51bWJlcjsgcmVxdWlyZWQ6IGJvb2xlYW47IGhpZGRlbj86IGJvb2xlYW47IGtleTogc3RyaW5nIH1bXSA9IFtdO1xuICB0b2dnbGVkID0gZmFsc2U7XG4gIGRpc2FibGVkQXJyYXk6IE5vdm9Db250cm9sR3JvdXBSb3dDb25maWdbXSA9IFtdO1xuICBlZGl0U3RhdGU6IEVkaXRTdGF0ZSA9IEVkaXRTdGF0ZS5OT1RfRURJVElORztcbiAgY3VycmVudEluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1VdGlsczogRm9ybVV0aWxzLCBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdm8tY29udHJvbC1ncm91cCBtdXN0IGhhdmUgdGhlIFtrZXldIGF0dHJpYnV0ZSBwcm92aWRlZCEnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmluaXRpYWxWYWx1ZTtcblxuICAgIC8vIElmIGluaXRpYWwgdmFsdWUgY2hhbmdlcywgY2xlYXIgdGhlIGNvbnRyb2xzXG4gICAgaWYgKGluaXRpYWxWYWx1ZUNoYW5nZSAmJiBpbml0aWFsVmFsdWVDaGFuZ2UuY3VycmVudFZhbHVlICE9PSBpbml0aWFsVmFsdWVDaGFuZ2UucHJldmlvdXNWYWx1ZSAmJiAhaW5pdGlhbFZhbHVlQ2hhbmdlLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmNsZWFyQ29udHJvbHMoKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgYXJyYXksIGFkZCBhIGNvbnRyb2wgZm9yIGVhY2ggdmFsdWVcbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB0aGlzLmluaXRpYWxWYWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4gdGhpcy5hZGROZXdDb250cm9sKHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgLy8gSWYgdmFsdWUgaXMgYW4gb2JqZWN0LCBqdXN0IGFkZCBvbmUgY29udHJvbFxuICAgICAgdGhpcy5hZGROZXdDb250cm9sKHRoaXMuaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgLy8gSWYgd2UgYXJlIGhvcml6b250YWwsIGdyYWIgdGhlIGxhYmVscyB0byBoZWxwIHdpdGggbGF5b3V0XG4gICAgaWYgKCF0aGlzLnZlcnRpY2FsKSB7XG4gICAgICB0aGlzLmNvbnRyb2xMYWJlbHMgPSAodGhpcy5jb250cm9scyB8fCBbXSkubWFwKChjb250cm9sOiBCYXNlQ29udHJvbCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiBjb250cm9sLmxhYmVsLFxuICAgICAgICAgIHdpZHRoOiBjb250cm9sLndpZHRoLFxuICAgICAgICAgIHJlcXVpcmVkOiBjb250cm9sLnJlcXVpcmVkLFxuICAgICAgICAgIGtleTogY29udHJvbC5rZXksXG4gICAgICAgICAgaGlkZGVuOiBjb250cm9sLmhpZGRlbixcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhckNvbnRyb2xzKCk7XG4gIH1cblxuICBvbkNoYW5nZSgpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMpO1xuICB9XG5cbiAgb25DbGlja0FkZCgpIHtcbiAgICB0aGlzLmFkZE5ld0NvbnRyb2woKTtcbiAgICAvLyB0aGlzLmVkaXRTdGF0ZSA9IEVkaXRTdGF0ZS5FRElUSU5HO1xuICB9XG4gIG9uQ2xpY2tDYW5jZWwoKSB7XG4gICAgdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gIH1cbiAgb25DbGlja1NhdmUoKSB7XG4gICAgdGhpcy5kaXNhYmxlZEFycmF5W3RoaXMuY3VycmVudEluZGV4IC0gMV0uc3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgY29uc3QgY29udHJvbDogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGZnOiBOb3ZvRm9ybUdyb3VwID0gY29udHJvbC5hdCh0aGlzLmN1cnJlbnRJbmRleCAtIDEpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgICBmZy5kaXNhYmxlQWxsQ29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICByZXNldEFkZFJlbW92ZSgpIHtcbiAgICB0aGlzLmRpc2FibGVkQXJyYXkuZm9yRWFjaCgoaXRlbTogTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZywgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgIGl0ZW0uZWRpdCA9IHRoaXMuY2hlY2tDYW5FZGl0KGlkeCk7XG4gICAgICBpdGVtLnJlbW92ZSA9IHRoaXMuY2hlY2tDYW5SZW1vdmUoaWR4KTtcbiAgICAgIGlmICghaXRlbS5lZGl0KSB7XG4gICAgICAgIGl0ZW0uc3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhZGROZXdDb250cm9sKHZhbHVlPzoge30pIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCBuZXN0ZWRGb3JtR3JvdXA6IE5vdm9Gb3JtR3JvdXAgPSB0aGlzLmJ1aWxkTmVzdGVkRm9ybUdyb3VwKHZhbHVlKTtcbiAgICBpZiAoY29udHJvbHNBcnJheSkge1xuICAgICAgY29udHJvbHNBcnJheS5wdXNoKG5lc3RlZEZvcm1Hcm91cCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMua2V5LCB0aGlzLmZiLmFycmF5KFtuZXN0ZWRGb3JtR3JvdXBdKSk7XG4gICAgfVxuICAgIHRoaXMuZGlzYWJsZWRBcnJheS5wdXNoKHtcbiAgICAgIHN0YXRlOiBFZGl0U3RhdGUuRURJVElORyxcbiAgICAgIGVkaXQ6IHRydWUsXG4gICAgICByZW1vdmU6IHRydWUsXG4gICAgfSk7XG4gICAgdGhpcy5yZXNldEFkZFJlbW92ZSgpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMub25BZGQuZW1pdChuZXN0ZWRGb3JtR3JvdXApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuICAgIHRoaXMuYXNzaWduSW5kZXhlcygpO1xuICAgIC8vIEVuc3VyZSB0aGF0IGZpZWxkIGludGVyYWN0aW9uIGNoYW5nZXMgZm9yIG5lc3RlZCBmb3JtcyBvcmlnaW5hdGluZyBmcm9tIG91dHNpZGUgdGhlIGZvcm0gd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlIG5lc3RlZCBlbGVtZW50c1xuICAgIG5lc3RlZEZvcm1Hcm91cC5maWVsZEludGVyYWN0aW9uRXZlbnRzLnN1YnNjcmliZSh0aGlzLm9uRmllbGRJbnRlcmFjdGlvbkV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgcmVtb3ZlIHRoZSBjb250cm9sLCBhbmQgb3B0aW9uYWxseSwgaWYgdGhlIGV2ZW50IGlzIHRvIGJlIHB1YmxpY2l6ZWQgKGVtaXRFdmVudCA9IHRydWUpIGFuZCB0aGVyZSBpcyBhXG4gICAqIHNob3VsZFJlbW92ZSBjYWxsYmFjaywgdGhlbiBjYWxsIHRoZSBzaG91bGRSZW1vdmUoKSBjYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIGRvUmVtb3ZlQ29udHJvbCBzaG91bGQgYmUgY2FsbGVkLlxuICAgKi9cbiAgcmVtb3ZlQ29udHJvbChpbmRleDogbnVtYmVyLCBlbWl0RXZlbnQgPSB0cnVlKSB7XG4gICAgaWYgKGVtaXRFdmVudCAmJiBIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5zaG91bGRSZW1vdmUpKSB7XG4gICAgICB0aGlzLnNob3VsZFJlbW92ZShpbmRleCkudGhlbigoc2hvdWxkUmVtb3ZlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgICAgICB0aGlzLmRvUmVtb3ZlQ29udHJvbChpbmRleCwgZW1pdEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9SZW1vdmVDb250cm9sKGluZGV4LCBlbWl0RXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZG9SZW1vdmVDb250cm9sKGluZGV4OiBudW1iZXIsIGVtaXRFdmVudDogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGNvbnN0IG5lc3RlZEZvcm1Hcm91cCA9IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgbmVzdGVkRm9ybUdyb3VwLmZpZWxkSW50ZXJhY3Rpb25FdmVudHMudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoeyB2YWx1ZTogbmVzdGVkRm9ybUdyb3VwLnZhbHVlLCBpbmRleCB9KTtcbiAgICB9XG4gICAgY29udHJvbHNBcnJheS5yZW1vdmVBdChpbmRleCk7XG4gICAgdGhpcy5kaXNhYmxlZEFycmF5ID0gdGhpcy5kaXNhYmxlZEFycmF5LmZpbHRlcigodmFsdWU6IE5vdm9Db250cm9sR3JvdXBSb3dDb25maWcsIGlkeDogbnVtYmVyKSA9PiBpZHggIT09IGluZGV4KTtcbiAgICB0aGlzLnJlc2V0QWRkUmVtb3ZlKCk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcbiAgICB0aGlzLmFzc2lnbkluZGV4ZXMoKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGVkaXRDb250cm9sKGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCBmZyA9IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgZmcuZW5hYmxlQWxsQ29udHJvbHMoKTtcbiAgICB0aGlzLm9uRWRpdC5lbWl0KHsgdmFsdWU6IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpLnZhbHVlLCBpbmRleCB9KTtcbiAgfVxuXG4gIHRvZ2dsZShldmVudDogTW91c2VFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBpZiAodGhpcy5jb2xsYXBzaWJsZSkge1xuICAgICAgdGhpcy50b2dnbGVkID0gIXRoaXMudG9nZ2xlZDtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYnVpbGROZXN0ZWRGb3JtR3JvdXAodmFsdWU/OiB7fSk6IE5vdm9Gb3JtR3JvdXAge1xuICAgIGNvbnN0IG5ld0NvbnRyb2xzID0gdGhpcy5nZXROZXdDb250cm9scygpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhuZXdDb250cm9scywgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAobmV3Q29udHJvbHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmIChjb250cm9sc0FycmF5KSB7XG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBjb250cm9sc0FycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChpLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0NhbkVkaXQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhbkVkaXQpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgICAgcmV0dXJuIHRoaXMuY2FuRWRpdChjb250cm9sc0FycmF5LmF0KGluZGV4KS52YWx1ZSwgaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tDYW5SZW1vdmUoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhblJlbW92ZSkge1xuICAgICAgY29uc3QgY29udHJvbHNBcnJheTogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgICBpZiAoY29udHJvbHNBcnJheS5hdChpbmRleCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuUmVtb3ZlKGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpLnZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGdldE5ld0NvbnRyb2xzKCkge1xuICAgIGNvbnN0IHJldDogQmFzZUNvbnRyb2xbXSA9IFtdO1xuICAgICh0aGlzLmNvbnRyb2xzIHx8IFtdKS5mb3JFYWNoKChjb250cm9sOiBCYXNlQ29udHJvbCkgPT4ge1xuICAgICAgcmV0LnB1c2gobmV3IEJhc2VDb250cm9sKGNvbnRyb2wuX190eXBlLCBjb250cm9sKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHByaXZhdGUgYXNzaWduSW5kZXhlcygpIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBpZiAoY29udHJvbHNBcnJheSkge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGNvbnRyb2xzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGNvbnRyb2xzQXJyYXkuYXQoaSkgYXMgTm92b0Zvcm1Hcm91cDtcbiAgICAgICAgZm9ybS5hc3NvY2lhdGlvbnMgPSB7IC4uLmZvcm0uYXNzb2NpYXRpb25zLCBpbmRleDogaSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25GaWVsZEludGVyYWN0aW9uRXZlbnQoKSB7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0YWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=