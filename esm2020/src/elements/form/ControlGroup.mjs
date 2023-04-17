// NG
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Helpers } from '../../utils/Helpers';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { BaseControl } from './controls/BaseControl';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
import * as i1 from "./../../utils/form-utils/FormUtils";
import * as i2 from "@angular/forms";
import * as i3 from "./Control";
import * as i4 from "../button/Button";
import * as i5 from "@angular/common";
import * as i6 from "../common/directives/theme.directive";
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
            this.onRemove.emit({ value: nestedFormGroup.getRawValue(), index });
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
                form.associations = { ...form.associations, index: i };
            }
        }
    }
    onFieldInteractionEvent() {
        this.ref.markForCheck();
    }
}
NovoControlGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlGroup, deps: [{ token: i1.FormUtils }, { token: i2.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoControlGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoControlGroup, selector: "novo-control-group", inputs: { appearance: "appearance", vertical: "vertical", stacked: "stacked", add: "add", remove: "remove", edit: "edit", collapsible: "collapsible", form: "form", controls: "controls", key: "key", label: "label", description: "description", emptyMessage: "emptyMessage", icon: "icon", editIcon: "editIcon", removeIcon: "removeIcon", initialValue: "initialValue", canEdit: "canEdit", canRemove: "canRemove", shouldRemove: "shouldRemove", rowTemplate: "rowTemplate", columnLabelTemplate: "columnLabelTemplate" }, outputs: { onRemove: "onRemove", onEdit: "onEdit", onAdd: "onAdd", change: "change" }, host: { properties: { "class.novo-control-group-appearance-card": "appearance=='card'", "class.novo-control-group-appearance-none": "appearance=='none'" } }, usesOnChanges: true, ngImport: i0, template: "<h6 class=\"novo-section-header\" *ngIf=\"label\">\n  <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\n    <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\n    <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\"\n      [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\n    <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\n  </span>\n  <label class=\"novo-control-group-description\" *ngIf=\"description\"\n    [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\n</h6>\n<div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\"\n  [class.hidden]=\"collapsible && !toggled\">\n\n  <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\n    <div class=\"novo-control-group-control\">\n      <div *ngFor=\"let c of controls\" class=\"novo-control-container {{c.key}}\"\n        [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\n        <novo-control (change)=\"onChange()\" [form]=\"(form?.controls)[key]['controls'][index]\" [control]=\"c\"\n          [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\n      </div>\n      <div class=\"novo-control-container edit last\" *ngIf=\"edit && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n          *ngIf=\"edit && !vertical\" theme=\"icon\" [icon]=\"editIcon\"\n          (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n        </novo-button>\n      </div>\n      <div class=\"novo-control-container remove last\" *ngIf=\"remove && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n          *ngIf=\"remove && !vertical\" theme=\"icon\"\n          [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n          [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n          index=\"-1\">\n        </novo-button>\n      </div>\n    </div>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n      *ngIf=\"edit && vertical\"\n      theme=\"icon\" [icon]=\"editIcon\"\n      (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n    </novo-button>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n      *ngIf=\"remove && vertical\" theme=\"icon\"\n      [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n      index=\"-1\">\n    </novo-button>\n  </ng-template>\n\n  <ng-template #defaultColumnLabelTemplate let-form=\"form\" let-key=\"key\">\n    <div *ngFor=\"let label of controlLabels\"\n      class=\"novo-control-group-control-label {{ label.key }}\"\n      [class.novo-control-group-control-hidden]=\"label.hidden\"\n      [style.max-width.px]=\"label.width\" [class.column-required]=\"label.required\">\n      <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\n    </div>\n    <div class=\"novo-control-group-control-label edit last\" *ngIf=\"edit\"\n      [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\n    <div class=\"novo-control-group-control-label remove last\" *ngIf=\"remove\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\n  </ng-template>\n\n  <ng-container *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n    <div class=\"novo-control-group-labels\"\n      *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n      <ng-template [ngTemplateOutlet]=\"columnLabelTemplate || defaultColumnLabelTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, key: key, controlLabels: controlLabels }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"(form?.controls)[key]\">\n    <div class=\"novo-control-group-row\"\n      *ngFor=\"let control of (form?.controls)[key]['controls']; let index = index\">\n      <ng-template [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, formGroup: control, index: index, key: key, controls: controls }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <div class=\"novo-control-group-empty\"\n    *ngIf=\"(form?.controls)[key] && (form?.controls)[key]['controls'].length === 0\"\n    [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\n    {{ emptyMessage }}\n  </div>\n\n  <div *ngIf=\"add\" class=\"novo-control-group-footer\">\n    <novo-button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" side=\"left\" (click)=\"onClickAdd()\"\n      [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">\n      {{ add?.label }}\n    </novo-button>\n    <!-- <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"close\" side=\"left\"\n                  (click)=\"onClickCancel()\" [attr.data-automation-id]=\"'novo-control-group-bottom-cancel-' + key\"\n                  index=\"-1\">\n                {{ 'cancel' }}\n                </novo-button>\n                  <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"check\" side=\"left\"\n                  (click)=\"onClickSave()\" [attr.data-automation-id]=\"'novo-control-group-bottom-save-' + key\"\n                  index=\"-1\">\n                {{ add?.label }}\n                </novo-button> -->\n  </div>\n</div>\n", components: [{ type: i3.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoControlGroup, decorators: [{
            type: Component,
            args: [{ selector: 'novo-control-group', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.novo-control-group-appearance-card]': "appearance=='card'",
                        '[class.novo-control-group-appearance-none]': "appearance=='none'",
                    }, template: "<h6 class=\"novo-section-header\" *ngIf=\"label\">\n  <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\n    <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\n    <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\"\n      [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\n    <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\n  </span>\n  <label class=\"novo-control-group-description\" *ngIf=\"description\"\n    [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\n</h6>\n<div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\"\n  [class.hidden]=\"collapsible && !toggled\">\n\n  <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\n    <div class=\"novo-control-group-control\">\n      <div *ngFor=\"let c of controls\" class=\"novo-control-container {{c.key}}\"\n        [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\n        <novo-control (change)=\"onChange()\" [form]=\"(form?.controls)[key]['controls'][index]\" [control]=\"c\"\n          [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\n      </div>\n      <div class=\"novo-control-container edit last\" *ngIf=\"edit && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n          *ngIf=\"edit && !vertical\" theme=\"icon\" [icon]=\"editIcon\"\n          (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n        </novo-button>\n      </div>\n      <div class=\"novo-control-container remove last\" *ngIf=\"remove && !vertical\">\n        <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n          *ngIf=\"remove && !vertical\" theme=\"icon\"\n          [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n          [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n          index=\"-1\">\n        </novo-button>\n      </div>\n    </div>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].edit\" type=\"button\"\n      *ngIf=\"edit && vertical\"\n      theme=\"icon\" [icon]=\"editIcon\"\n      (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\">\n    </novo-button>\n    <novo-button class=\"control-group-action\" [disabled]=\"!disabledArray[index].remove\" type=\"button\"\n      *ngIf=\"remove && vertical\" theme=\"icon\"\n      [icon]=\"removeIcon\" (click)=\"removeControl(index)\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"\n      index=\"-1\">\n    </novo-button>\n  </ng-template>\n\n  <ng-template #defaultColumnLabelTemplate let-form=\"form\" let-key=\"key\">\n    <div *ngFor=\"let label of controlLabels\"\n      class=\"novo-control-group-control-label {{ label.key }}\"\n      [class.novo-control-group-control-hidden]=\"label.hidden\"\n      [style.max-width.px]=\"label.width\" [class.column-required]=\"label.required\">\n      <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\n    </div>\n    <div class=\"novo-control-group-control-label edit last\" *ngIf=\"edit\"\n      [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\n    <div class=\"novo-control-group-control-label remove last\" *ngIf=\"remove\"\n      [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\n  </ng-template>\n\n  <ng-container *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n    <div class=\"novo-control-group-labels\"\n      *ngIf=\"!vertical && (form?.controls)[key] && (form?.controls)[key]['controls'].length !== 0\">\n      <ng-template [ngTemplateOutlet]=\"columnLabelTemplate || defaultColumnLabelTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, key: key, controlLabels: controlLabels }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <ng-container *ngIf=\"(form?.controls)[key]\">\n    <div class=\"novo-control-group-row\"\n      *ngFor=\"let control of (form?.controls)[key]['controls']; let index = index\">\n      <ng-template [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{ form: form, formGroup: control, index: index, key: key, controls: controls }\">\n      </ng-template>\n    </div>\n  </ng-container>\n\n  <div class=\"novo-control-group-empty\"\n    *ngIf=\"(form?.controls)[key] && (form?.controls)[key]['controls'].length === 0\"\n    [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\n    {{ emptyMessage }}\n  </div>\n\n  <div *ngIf=\"add\" class=\"novo-control-group-footer\">\n    <novo-button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" side=\"left\" (click)=\"onClickAdd()\"\n      [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">\n      {{ add?.label }}\n    </novo-button>\n    <!-- <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"close\" side=\"left\"\n                  (click)=\"onClickCancel()\" [attr.data-automation-id]=\"'novo-control-group-bottom-cancel-' + key\"\n                  index=\"-1\">\n                {{ 'cancel' }}\n                </novo-button>\n                  <novo-button *ngIf=\"editState==='editing'\" type=\"button\" theme=\"dialogue\" icon=\"check\" side=\"left\"\n                  (click)=\"onClickSave()\" [attr.data-automation-id]=\"'novo-control-group-bottom-save-' + key\"\n                  index=\"-1\">\n                {{ add?.label }}\n                </novo-button> -->\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormUtils }, { type: i2.FormBuilder }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { appearance: [{
                type: Input
            }], vertical: [{
                type: Input
            }], stacked: [{
                type: Input
            }], add: [{
                type: Input
            }], remove: [{
                type: Input
            }], edit: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], form: [{
                type: Input
            }], controls: [{
                type: Input
            }], key: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], icon: [{
                type: Input
            }], editIcon: [{
                type: Input
            }], removeIcon: [{
                type: Input
            }], initialValue: [{
                type: Input
            }], canEdit: [{
                type: Input
            }], canRemove: [{
                type: Input
            }], shouldRemove: [{
                type: Input
            }], rowTemplate: [{
                type: Input
            }], columnLabelTemplate: [{
                type: Input
            }], onRemove: [{
                type: Output
            }], onEdit: [{
                type: Output
            }], onAdd: [{
                type: Output
            }], change: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9Db250cm9sR3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL0NvbnRyb2xHcm91cC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUdOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7OztBQU1oRCxNQUFNLENBQU4sSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLGdDQUFtQixDQUFBO0lBQ25CLHVDQUEwQixDQUFBO0FBQzVCLENBQUMsRUFIVyxTQUFTLEtBQVQsU0FBUyxRQUdwQjtBQWlCRCxNQUFNLE9BQU8sZ0JBQWdCO0lBMEczQixZQUFvQixTQUFvQixFQUFVLEVBQWUsRUFBVSxHQUFzQjtRQUE3RSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbEd6RixnQkFBVyxHQUFv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QUFLO2dCQUdGLE1BQU07c0JBRFQsS0FBSztnQkFVRixJQUFJO3NCQURQLEtBQUs7Z0JBVUYsV0FBVztzQkFEZCxLQUFLO2dCQVNHLElBQUk7c0JBQVosS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLEdBQUc7c0JBQVgsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUdGLElBQUk7c0JBRFAsS0FBSztnQkFTRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvZm9ybS11dGlscy9Gb3JtVXRpbHMnO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2wgfSBmcm9tICcuL2NvbnRyb2xzL0Jhc2VDb250cm9sJztcbmltcG9ydCB7IE5vdm9Gb3JtR3JvdXAgfSBmcm9tICcuL05vdm9Gb3JtR3JvdXAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9Db250cm9sR3JvdXBBZGRDb25maWcge1xuICBsYWJlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBFZGl0U3RhdGUge1xuICBFRElUSU5HID0gJ2VkaXRpbmcnLFxuICBOT1RfRURJVElORyA9ICdub3RlZGl0aW5nJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQ29udHJvbEdyb3VwUm93Q29uZmlnIHtcbiAgZWRpdDogYm9vbGVhbjtcbiAgcmVtb3ZlOiBib29sZWFuO1xuICBzdGF0ZTogRWRpdFN0YXRlO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNvbnRyb2wtZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vQ29udHJvbEdyb3VwLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mubm92by1jb250cm9sLWdyb3VwLWFwcGVhcmFuY2UtY2FyZF0nOiBcImFwcGVhcmFuY2U9PSdjYXJkJ1wiLFxuICAgICdbY2xhc3Mubm92by1jb250cm9sLWdyb3VwLWFwcGVhcmFuY2Utbm9uZV0nOiBcImFwcGVhcmFuY2U9PSdub25lJ1wiLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ29udHJvbEdyb3VwIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZTogJ25vbmUnIHwgJ2NhcmQnKSB7XG4gICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlO1xuICB9XG4gIGdldCBhcHBlYXJhbmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBlYXJhbmNlO1xuICB9XG4gIHByaXZhdGUgX2FwcGVhcmFuY2U6ICdub25lJyB8ICdjYXJkJyA9ICdub25lJztcblxuICAvLyBTZXRzIHRoZSBkaXNwbGF5IG9mIHRoZSBncm91cCB0byBlaXRoZXIgYmUgcm93IChkZWZhdWx0KSBvciB2ZXJ0aWNhbCB2aWEgZmxleC1ib3hcbiAgQElucHV0KClcbiAgc2V0IHZlcnRpY2FsKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgdmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xuICB9XG4gIHByaXZhdGUgX3ZlcnRpY2FsID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBzdGFja2VkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdGFja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBzdGFja2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja2VkO1xuICB9XG4gIHByaXZhdGUgX3N0YWNrZWQgPSBmYWxzZTtcblxuICAvLyBIaWRlcy9zaG93cyB0aGUgYWRkIGJ1dHRvbiBmb3IgYWRkaW5nIGEgbmV3IGNvbnRyb2xcbiAgQElucHV0KCkgYWRkOiBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnO1xuICAvLyBIaWRlL3Nob3dzIHRoZSByZW1vdmUgYnV0dG9uIGZvciByZW1vdmluZyBhIGNvbnRyb2xcbiAgQElucHV0KClcbiAgc2V0IHJlbW92ZSh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCByZW1vdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmUgPSBmYWxzZTtcbiAgLy8gSGlkZS9zaG93cyB0aGUgZWRpdCBidXR0b24gZm9yIGVkaXRpbmcgYSBjb250cm9sXG4gIEBJbnB1dCgpXG4gIHNldCBlZGl0KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lZGl0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBlZGl0KCkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0O1xuICB9XG4gIHByaXZhdGUgX2VkaXQgPSBmYWxzZTtcbiAgLy8gQWxsb3dzIHRoZSBjb250cm9sIHRvIGNvbGxhcHNlIG9yIG5vdFxuICBASW5wdXQoKVxuICBzZXQgY29sbGFwc2libGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbGxhcHNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBjb2xsYXBzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cbiAgcHJpdmF0ZSBfY29sbGFwc2libGUgPSBmYWxzZTtcbiAgLy8gTWFpbiBmb3JtIGdyb3VwXG4gIEBJbnB1dCgpIGZvcm06IE5vdm9Gb3JtR3JvdXA7XG4gIC8vIENvbnRyb2xzIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGNvbnRyb2wgZ3JvdXBcbiAgQElucHV0KCkgY29udHJvbHM6IEJhc2VDb250cm9sW107XG4gIC8vIEtleSBvZiB0aGUgY29udHJvbCBncm91cCAob24gdGhlIG1haW4gZm9ybSlcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIC8vIExhYmVsIG9mIHRoZSBjb250cm9sIGdyb3VwXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIC8vIERlc2NyaXB0aW9uIG9mIHRoZSBjb250cm9sIGdyb3VwIChvbmx5IHVzZSB3aXRoIHBvc2l0aW9uOmJvdHRvbSBBZGQgYnV0dG9uISlcbiAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZztcbiAgLy8gTWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZXJlIGFyZSBubyBjb250cm9sc1xuICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZztcbiAgLy8gSWNvbiBvZiB0aGUgY29udHJvbCBncm91cCAoY2FuIGhhdmUgYmhpIHByZWZpeCBvciBub3QpXG4gIEBJbnB1dCgpXG4gIHNldCBpY29uKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2ljb24gPSB2ICYmIHYuaW5kZXhPZignYmhpJykgIT09IC0xID8gdiA6IGBiaGktJHt2fWA7XG4gIH1cbiAgZ2V0IGljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICAvLyBFZGl0IGljb24gYXQgdGhlIGVuZCBvZiBlYWNoIHJvdyAobm8gYmhpLSBwcmVmaXgpXG4gIEBJbnB1dCgpIGVkaXRJY29uID0gJ2VkaXQnO1xuICAvLyBSZW1vdmUgaWNvbiBhdCB0aGUgZW5kIG9mIGVhY2ggcm93IChubyBiaGktIHByZWZpeClcbiAgQElucHV0KCkgcmVtb3ZlSWNvbiA9ICdkZWxldGUtbyc7XG4gIC8vIFRoZSBpbml0aWFsIHZhbHVlIG9iamVjdCwgd2lsbCBjcmVhdGUgdGhlIGZvcm0gcm93cyBvZmYgb2ZcbiAgQElucHV0KCkgaW5pdGlhbFZhbHVlOiB7fVtdO1xuICAvLyBDYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGVkaXRcbiAgQElucHV0KCkgY2FuRWRpdDogRnVuY3Rpb247XG4gIC8vIENhbGxiYWNrIHRvIGRldGVybWluZSBpZiB0aGUgdXNlciBjYW4gZGVsZXRlXG4gIEBJbnB1dCgpIGNhblJlbW92ZTogRnVuY3Rpb247XG4gIC8vIE9wdGlvbmFsIGNhbGxiYWNrIGZvciB3aGV0aGVyIG9yIG5vdCB0byByZW1vdmUgdGhlIGdpdmVuIHJvd1xuICBASW5wdXQoKSBzaG91bGRSZW1vdmU6IChudW1iZXIpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIC8vIFRlbXBsYXRlIGZvciBjdXN0b20gcm93IHJlbmRlcmluZ1xuICBASW5wdXQoKSByb3dUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgLy8gVGVtcGxhdGUgZm9yIGN1c3RvbSBjb2x1bW4gbGFiZWwgcmVuZGVyaW5nXG4gIEBJbnB1dCgpIGNvbHVtbkxhYmVsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIG9uUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOyBpbmRleCB9PigpO1xuICBAT3V0cHV0KCkgb25FZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHZhbHVlOyBpbmRleCB9PigpO1xuICBAT3V0cHV0KCkgb25BZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnRyb2xMYWJlbHM6IHsgdmFsdWU6IHN0cmluZzsgd2lkdGg6IG51bWJlcjsgcmVxdWlyZWQ6IGJvb2xlYW47IGhpZGRlbj86IGJvb2xlYW47IGtleTogc3RyaW5nIH1bXSA9IFtdO1xuICB0b2dnbGVkID0gZmFsc2U7XG4gIGRpc2FibGVkQXJyYXk6IE5vdm9Db250cm9sR3JvdXBSb3dDb25maWdbXSA9IFtdO1xuICBlZGl0U3RhdGU6IEVkaXRTdGF0ZSA9IEVkaXRTdGF0ZS5OT1RfRURJVElORztcbiAgY3VycmVudEluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1VdGlsczogRm9ybVV0aWxzLCBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdm8tY29udHJvbC1ncm91cCBtdXN0IGhhdmUgdGhlIFtrZXldIGF0dHJpYnV0ZSBwcm92aWRlZCEnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmluaXRpYWxWYWx1ZTtcblxuICAgIC8vIElmIGluaXRpYWwgdmFsdWUgY2hhbmdlcywgY2xlYXIgdGhlIGNvbnRyb2xzXG4gICAgaWYgKGluaXRpYWxWYWx1ZUNoYW5nZSAmJiBpbml0aWFsVmFsdWVDaGFuZ2UuY3VycmVudFZhbHVlICE9PSBpbml0aWFsVmFsdWVDaGFuZ2UucHJldmlvdXNWYWx1ZSAmJiAhaW5pdGlhbFZhbHVlQ2hhbmdlLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmNsZWFyQ29udHJvbHMoKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgYXJyYXksIGFkZCBhIGNvbnRyb2wgZm9yIGVhY2ggdmFsdWVcbiAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmluaXRpYWxWYWx1ZSkpIHtcbiAgICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB0aGlzLmluaXRpYWxWYWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4gdGhpcy5hZGROZXdDb250cm9sKHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxWYWx1ZSkge1xuICAgICAgLy8gSWYgdmFsdWUgaXMgYW4gb2JqZWN0LCBqdXN0IGFkZCBvbmUgY29udHJvbFxuICAgICAgdGhpcy5hZGROZXdDb250cm9sKHRoaXMuaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgLy8gSWYgd2UgYXJlIGhvcml6b250YWwsIGdyYWIgdGhlIGxhYmVscyB0byBoZWxwIHdpdGggbGF5b3V0XG4gICAgaWYgKCF0aGlzLnZlcnRpY2FsKSB7XG4gICAgICB0aGlzLmNvbnRyb2xMYWJlbHMgPSAodGhpcy5jb250cm9scyB8fCBbXSkubWFwKChjb250cm9sOiBCYXNlQ29udHJvbCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiBjb250cm9sLmxhYmVsLFxuICAgICAgICAgIHdpZHRoOiBjb250cm9sLndpZHRoLFxuICAgICAgICAgIHJlcXVpcmVkOiBjb250cm9sLnJlcXVpcmVkLFxuICAgICAgICAgIGtleTogY29udHJvbC5rZXksXG4gICAgICAgICAgaGlkZGVuOiBjb250cm9sLmhpZGRlbixcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhckNvbnRyb2xzKCk7XG4gIH1cblxuICBvbkNoYW5nZSgpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMpO1xuICB9XG5cbiAgb25DbGlja0FkZCgpIHtcbiAgICB0aGlzLmFkZE5ld0NvbnRyb2woKTtcbiAgICAvLyB0aGlzLmVkaXRTdGF0ZSA9IEVkaXRTdGF0ZS5FRElUSU5HO1xuICB9XG4gIG9uQ2xpY2tDYW5jZWwoKSB7XG4gICAgdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gIH1cbiAgb25DbGlja1NhdmUoKSB7XG4gICAgdGhpcy5kaXNhYmxlZEFycmF5W3RoaXMuY3VycmVudEluZGV4IC0gMV0uc3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgY29uc3QgY29udHJvbDogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGZnOiBOb3ZvRm9ybUdyb3VwID0gY29udHJvbC5hdCh0aGlzLmN1cnJlbnRJbmRleCAtIDEpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgICBmZy5kaXNhYmxlQWxsQ29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICByZXNldEFkZFJlbW92ZSgpIHtcbiAgICB0aGlzLmRpc2FibGVkQXJyYXkuZm9yRWFjaCgoaXRlbTogTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZywgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgIGl0ZW0uZWRpdCA9IHRoaXMuY2hlY2tDYW5FZGl0KGlkeCk7XG4gICAgICBpdGVtLnJlbW92ZSA9IHRoaXMuY2hlY2tDYW5SZW1vdmUoaWR4KTtcbiAgICAgIGlmICghaXRlbS5lZGl0KSB7XG4gICAgICAgIGl0ZW0uc3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhZGROZXdDb250cm9sKHZhbHVlPzoge30pIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCBuZXN0ZWRGb3JtR3JvdXA6IE5vdm9Gb3JtR3JvdXAgPSB0aGlzLmJ1aWxkTmVzdGVkRm9ybUdyb3VwKHZhbHVlKTtcbiAgICBpZiAoY29udHJvbHNBcnJheSkge1xuICAgICAgY29udHJvbHNBcnJheS5wdXNoKG5lc3RlZEZvcm1Hcm91cCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMua2V5LCB0aGlzLmZiLmFycmF5KFtuZXN0ZWRGb3JtR3JvdXBdKSk7XG4gICAgfVxuICAgIHRoaXMuZGlzYWJsZWRBcnJheS5wdXNoKHtcbiAgICAgIHN0YXRlOiBFZGl0U3RhdGUuRURJVElORyxcbiAgICAgIGVkaXQ6IHRydWUsXG4gICAgICByZW1vdmU6IHRydWUsXG4gICAgfSk7XG4gICAgdGhpcy5yZXNldEFkZFJlbW92ZSgpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMub25BZGQuZW1pdChuZXN0ZWRGb3JtR3JvdXApO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuICAgIHRoaXMuYXNzaWduSW5kZXhlcygpO1xuICAgIC8vIEVuc3VyZSB0aGF0IGZpZWxkIGludGVyYWN0aW9uIGNoYW5nZXMgZm9yIG5lc3RlZCBmb3JtcyBvcmlnaW5hdGluZyBmcm9tIG91dHNpZGUgdGhlIGZvcm0gd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlIG5lc3RlZCBlbGVtZW50c1xuICAgIG5lc3RlZEZvcm1Hcm91cC5maWVsZEludGVyYWN0aW9uRXZlbnRzLnN1YnNjcmliZSh0aGlzLm9uRmllbGRJbnRlcmFjdGlvbkV2ZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdpbGwgcmVtb3ZlIHRoZSBjb250cm9sLCBhbmQgb3B0aW9uYWxseSwgaWYgdGhlIGV2ZW50IGlzIHRvIGJlIHB1YmxpY2l6ZWQgKGVtaXRFdmVudCA9IHRydWUpIGFuZCB0aGVyZSBpcyBhXG4gICAqIHNob3VsZFJlbW92ZSBjYWxsYmFjaywgdGhlbiBjYWxsIHRoZSBzaG91bGRSZW1vdmUoKSBjYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIGRvUmVtb3ZlQ29udHJvbCBzaG91bGQgYmUgY2FsbGVkLlxuICAgKi9cbiAgcmVtb3ZlQ29udHJvbChpbmRleDogbnVtYmVyLCBlbWl0RXZlbnQgPSB0cnVlKSB7XG4gICAgaWYgKGVtaXRFdmVudCAmJiBIZWxwZXJzLmlzRnVuY3Rpb24odGhpcy5zaG91bGRSZW1vdmUpKSB7XG4gICAgICB0aGlzLnNob3VsZFJlbW92ZShpbmRleCkudGhlbigoc2hvdWxkUmVtb3ZlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgICAgICB0aGlzLmRvUmVtb3ZlQ29udHJvbChpbmRleCwgZW1pdEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9SZW1vdmVDb250cm9sKGluZGV4LCBlbWl0RXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZG9SZW1vdmVDb250cm9sKGluZGV4OiBudW1iZXIsIGVtaXRFdmVudDogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGNvbnN0IG5lc3RlZEZvcm1Hcm91cCA9IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgbmVzdGVkRm9ybUdyb3VwLmZpZWxkSW50ZXJhY3Rpb25FdmVudHMudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAoZW1pdEV2ZW50KSB7XG4gICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoeyB2YWx1ZTogbmVzdGVkRm9ybUdyb3VwLmdldFJhd1ZhbHVlKCksIGluZGV4IH0pO1xuICAgIH1cbiAgICBjb250cm9sc0FycmF5LnJlbW92ZUF0KGluZGV4KTtcbiAgICB0aGlzLmRpc2FibGVkQXJyYXkgPSB0aGlzLmRpc2FibGVkQXJyYXkuZmlsdGVyKCh2YWx1ZTogTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZywgaWR4OiBudW1iZXIpID0+IGlkeCAhPT0gaW5kZXgpO1xuICAgIHRoaXMucmVzZXRBZGRSZW1vdmUoKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xuICAgIHRoaXMuYXNzaWduSW5kZXhlcygpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZWRpdENvbnRyb2woaW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGNvbnN0IGZnID0gY29udHJvbHNBcnJheS5hdChpbmRleCkgYXMgTm92b0Zvcm1Hcm91cDtcbiAgICBmZy5lbmFibGVBbGxDb250cm9scygpO1xuICAgIHRoaXMub25FZGl0LmVtaXQoeyB2YWx1ZTogY29udHJvbHNBcnJheS5hdChpbmRleCkudmFsdWUsIGluZGV4IH0pO1xuICB9XG5cbiAgdG9nZ2xlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGlmICh0aGlzLmNvbGxhcHNpYmxlKSB7XG4gICAgICB0aGlzLnRvZ2dsZWQgPSAhdGhpcy50b2dnbGVkO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBidWlsZE5lc3RlZEZvcm1Hcm91cCh2YWx1ZT86IHt9KTogTm92b0Zvcm1Hcm91cCB7XG4gICAgY29uc3QgbmV3Q29udHJvbHMgPSB0aGlzLmdldE5ld0NvbnRyb2xzKCk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmZvcm1VdGlscy5zZXRJbml0aWFsVmFsdWVzKG5ld0NvbnRyb2xzLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZvcm1VdGlscy50b0Zvcm1Hcm91cChuZXdDb250cm9scyk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyQ29udHJvbHMoKSB7XG4gICAgY29uc3QgY29udHJvbHNBcnJheTogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgaWYgKGNvbnRyb2xzQXJyYXkpIHtcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGNvbnRyb2xzQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDb250cm9sKGksIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQ2FuRWRpdChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY2FuRWRpdCkge1xuICAgICAgY29uc3QgY29udHJvbHNBcnJheTogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgICByZXR1cm4gdGhpcy5jYW5FZGl0KGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpLnZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0NhblJlbW92ZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY2FuUmVtb3ZlKSB7XG4gICAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICAgIGlmIChjb250cm9sc0FycmF5LmF0KGluZGV4KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5SZW1vdmUoY29udHJvbHNBcnJheS5hdChpbmRleCkudmFsdWUsIGluZGV4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmV3Q29udHJvbHMoKSB7XG4gICAgY29uc3QgcmV0OiBCYXNlQ29udHJvbFtdID0gW107XG4gICAgKHRoaXMuY29udHJvbHMgfHwgW10pLmZvckVhY2goKGNvbnRyb2w6IEJhc2VDb250cm9sKSA9PiB7XG4gICAgICByZXQucHVzaChuZXcgQmFzZUNvbnRyb2woY29udHJvbC5fX3R5cGUsIGNvbnRyb2wpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3NpZ25JbmRleGVzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmIChjb250cm9sc0FycmF5KSB7XG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgY29udHJvbHNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JtID0gY29udHJvbHNBcnJheS5hdChpKSBhcyBOb3ZvRm9ybUdyb3VwO1xuICAgICAgICBmb3JtLmFzc29jaWF0aW9ucyA9IHsgLi4uZm9ybS5hc3NvY2lhdGlvbnMsIGluZGV4OiBpIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkZpZWxkSW50ZXJhY3Rpb25FdmVudCgpIHtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RhY2tlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxoNiBjbGFzcz1cIm5vdm8tc2VjdGlvbi1oZWFkZXJcIiAqbmdJZj1cImxhYmVsXCI+XG4gIDxzcGFuIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIFtjbGFzcy5jbGlja2FibGVdPVwiY29sbGFwc2libGVcIj5cbiAgICA8aSAqbmdJZj1cImljb24gJiYgIWNvbGxhcHNpYmxlXCIgW25nQ2xhc3NdPVwiaWNvblwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWljb24tJyArIGtleVwiPjwvaT5cbiAgICA8aSAqbmdJZj1cImNvbGxhcHNpYmxlXCIgY2xhc3M9XCJiaGktbmV4dFwiIFtjbGFzcy50b2dnbGVkXT1cInRvZ2dsZWRcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtY29sbGFwc2UtJyArIGtleVwiPjwvaT5cbiAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1sYWJlbC0nICsga2V5XCI+e3sgbGFiZWwgfX08L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPGxhYmVsIGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJkZXNjcmlwdGlvblwiXG4gICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZGVzY3JpcHRpb24tJyArIGtleVwiPnt7IGRlc2NyaXB0aW9uIH19PC9sYWJlbD5cbjwvaDY+XG48ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWNvbnRyb2xzXCIgW2NsYXNzLnZlcnRpY2FsXT1cInZlcnRpY2FsXCIgW2NsYXNzLmhvcml6b250YWxdPVwiIXZlcnRpY2FsXCJcbiAgW2NsYXNzLmhpZGRlbl09XCJjb2xsYXBzaWJsZSAmJiAhdG9nZ2xlZFwiPlxuXG4gIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWtleT1cImtleVwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtZ3JvdXAtY29udHJvbFwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgYyBvZiBjb250cm9sc1wiIGNsYXNzPVwibm92by1jb250cm9sLWNvbnRhaW5lciB7e2Mua2V5fX1cIlxuICAgICAgICBbY2xhc3MuaXMtbGFiZWxdPVwiYy5jb250cm9sVHlwZSA9PT0gJ3JlYWQtb25seSdcIiBbc3R5bGUubWF4LXdpZHRoLnB4XT1cImMud2lkdGhcIj5cbiAgICAgICAgPG5vdm8tY29udHJvbCAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIiBbZm9ybV09XCIoZm9ybT8uY29udHJvbHMpW2tleV1bJ2NvbnRyb2xzJ11baW5kZXhdXCIgW2NvbnRyb2xdPVwiY1wiXG4gICAgICAgICAgW2NvbmRlbnNlZF09XCIhdmVydGljYWwgfHwgYy5jb250cm9sVHlwZSA9PT0gJ3JlYWQtb25seSdcIj48L25vdm8tY29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1jb250YWluZXIgZWRpdCBsYXN0XCIgKm5nSWY9XCJlZGl0ICYmICF2ZXJ0aWNhbFwiPlxuICAgICAgICA8bm92by1idXR0b24gY2xhc3M9XCJjb250cm9sLWdyb3VwLWFjdGlvblwiIFtkaXNhYmxlZF09XCIhZGlzYWJsZWRBcnJheVtpbmRleF0uZWRpdFwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICpuZ0lmPVwiZWRpdCAmJiAhdmVydGljYWxcIiB0aGVtZT1cImljb25cIiBbaWNvbl09XCJlZGl0SWNvblwiXG4gICAgICAgICAgKGNsaWNrKT1cImVkaXRDb250cm9sKGluZGV4KVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWVkaXQtJyArIGtleVwiIGluZGV4PVwiLTFcIj5cbiAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1jb250YWluZXIgcmVtb3ZlIGxhc3RcIiAqbmdJZj1cInJlbW92ZSAmJiAhdmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tYnV0dG9uIGNsYXNzPVwiY29udHJvbC1ncm91cC1hY3Rpb25cIiBbZGlzYWJsZWRdPVwiIWRpc2FibGVkQXJyYXlbaW5kZXhdLnJlbW92ZVwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICpuZ0lmPVwicmVtb3ZlICYmICF2ZXJ0aWNhbFwiIHRoZW1lPVwiaWNvblwiXG4gICAgICAgICAgW2ljb25dPVwicmVtb3ZlSWNvblwiIChjbGljayk9XCJyZW1vdmVDb250cm9sKGluZGV4KVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZGVsZXRlLScgKyBrZXlcIlxuICAgICAgICAgIGluZGV4PVwiLTFcIj5cbiAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxub3ZvLWJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtZ3JvdXAtYWN0aW9uXCIgW2Rpc2FibGVkXT1cIiFkaXNhYmxlZEFycmF5W2luZGV4XS5lZGl0XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAqbmdJZj1cImVkaXQgJiYgdmVydGljYWxcIlxuICAgICAgdGhlbWU9XCJpY29uXCIgW2ljb25dPVwiZWRpdEljb25cIlxuICAgICAgKGNsaWNrKT1cImVkaXRDb250cm9sKGluZGV4KVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWVkaXQtJyArIGtleVwiIGluZGV4PVwiLTFcIj5cbiAgICA8L25vdm8tYnV0dG9uPlxuICAgIDxub3ZvLWJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtZ3JvdXAtYWN0aW9uXCIgW2Rpc2FibGVkXT1cIiFkaXNhYmxlZEFycmF5W2luZGV4XS5yZW1vdmVcIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICpuZ0lmPVwicmVtb3ZlICYmIHZlcnRpY2FsXCIgdGhlbWU9XCJpY29uXCJcbiAgICAgIFtpY29uXT1cInJlbW92ZUljb25cIiAoY2xpY2spPVwicmVtb3ZlQ29udHJvbChpbmRleClcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZGVsZXRlLScgKyBrZXlcIlxuICAgICAgaW5kZXg9XCItMVwiPlxuICAgIDwvbm92by1idXR0b24+XG4gIDwvbmctdGVtcGxhdGU+XG5cbiAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q29sdW1uTGFiZWxUZW1wbGF0ZSBsZXQtZm9ybT1cImZvcm1cIiBsZXQta2V5PVwia2V5XCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgbGFiZWwgb2YgY29udHJvbExhYmVsc1wiXG4gICAgICBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWxhYmVsIHt7IGxhYmVsLmtleSB9fVwiXG4gICAgICBbY2xhc3Mubm92by1jb250cm9sLWdyb3VwLWNvbnRyb2wtaGlkZGVuXT1cImxhYmVsLmhpZGRlblwiXG4gICAgICBbc3R5bGUubWF4LXdpZHRoLnB4XT1cImxhYmVsLndpZHRoXCIgW2NsYXNzLmNvbHVtbi1yZXF1aXJlZF09XCJsYWJlbC5yZXF1aXJlZFwiPlxuICAgICAgPHNwYW4gW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtbGFiZWwtJyArIGxhYmVsLnZhbHVlXCI+e3sgbGFiZWwudmFsdWUgfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWxhYmVsIGVkaXQgbGFzdFwiICpuZ0lmPVwiZWRpdFwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1lZGl0LScgKyBrZXlcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWNvbnRyb2wtbGFiZWwgcmVtb3ZlIGxhc3RcIiAqbmdJZj1cInJlbW92ZVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1kZWxldGUtJyArIGtleVwiPjwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmVydGljYWwgJiYgKGZvcm0/LmNvbnRyb2xzKVtrZXldICYmIChmb3JtPy5jb250cm9scylba2V5XVsnY29udHJvbHMnXS5sZW5ndGggIT09IDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWxhYmVsc1wiXG4gICAgICAqbmdJZj1cIiF2ZXJ0aWNhbCAmJiAoZm9ybT8uY29udHJvbHMpW2tleV0gJiYgKGZvcm0/LmNvbnRyb2xzKVtrZXldWydjb250cm9scyddLmxlbmd0aCAhPT0gMFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbkxhYmVsVGVtcGxhdGUgfHwgZGVmYXVsdENvbHVtbkxhYmVsVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBmb3JtOiBmb3JtLCBrZXk6IGtleSwgY29udHJvbExhYmVsczogY29udHJvbExhYmVscyB9XCI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiKGZvcm0/LmNvbnRyb2xzKVtrZXldXCI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1yb3dcIlxuICAgICAgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgKGZvcm0/LmNvbnRyb2xzKVtrZXldWydjb250cm9scyddOyBsZXQgaW5kZXggPSBpbmRleFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJvd1RlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGZvcm06IGZvcm0sIGZvcm1Hcm91cDogY29udHJvbCwgaW5kZXg6IGluZGV4LCBrZXk6IGtleSwgY29udHJvbHM6IGNvbnRyb2xzIH1cIj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtZ3JvdXAtZW1wdHlcIlxuICAgICpuZ0lmPVwiKGZvcm0/LmNvbnRyb2xzKVtrZXldICYmIChmb3JtPy5jb250cm9scylba2V5XVsnY29udHJvbHMnXS5sZW5ndGggPT09IDBcIlxuICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWVtcHR5LScgKyBrZXlcIj5cbiAgICB7eyBlbXB0eU1lc3NhZ2UgfX1cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cImFkZFwiIGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWZvb3RlclwiPlxuICAgIDxub3ZvLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJkaWFsb2d1ZVwiIGljb249XCJhZGQtdGhpblwiIHNpZGU9XCJsZWZ0XCIgKGNsaWNrKT1cIm9uQ2xpY2tBZGQoKVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1ib3R0b20tYWRkLScgKyBrZXlcIiBpbmRleD1cIi0xXCI+XG4gICAgICB7eyBhZGQ/LmxhYmVsIH19XG4gICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICA8IS0tIDxub3ZvLWJ1dHRvbiAqbmdJZj1cImVkaXRTdGF0ZT09PSdlZGl0aW5nJ1wiIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cImRpYWxvZ3VlXCIgaWNvbj1cImNsb3NlXCIgc2lkZT1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tDYW5jZWwoKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWJvdHRvbS1jYW5jZWwtJyArIGtleVwiXG4gICAgICAgICAgICAgICAgICBpbmRleD1cIi0xXCI+XG4gICAgICAgICAgICAgICAge3sgJ2NhbmNlbCcgfX1cbiAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPG5vdm8tYnV0dG9uICpuZ0lmPVwiZWRpdFN0YXRlPT09J2VkaXRpbmcnXCIgdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBpY29uPVwiY2hlY2tcIiBzaWRlPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGlja1NhdmUoKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWJvdHRvbS1zYXZlLScgKyBrZXlcIlxuICAgICAgICAgICAgICAgICAgaW5kZXg9XCItMVwiPlxuICAgICAgICAgICAgICAgIHt7IGFkZD8ubGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8L25vdm8tYnV0dG9uPiAtLT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==