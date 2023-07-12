// NG
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Helpers } from 'novo-elements/utils';
import { FormUtils } from './utils/FormUtils';
import { BaseControl } from './controls/BaseControl';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
import * as i1 from "./utils/FormUtils";
import * as i2 from "@angular/forms";
import * as i3 from "./Control";
import * as i4 from "novo-elements/elements/button";
import * as i5 from "@angular/common";
import * as i6 from "novo-elements/elements/common";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZm9ybS9Db250cm9sR3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL0NvbnRyb2xHcm91cC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEtBQUs7QUFDTCxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUdOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7OztBQU1oRCxNQUFNLENBQU4sSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLGdDQUFtQixDQUFBO0lBQ25CLHVDQUEwQixDQUFBO0FBQzVCLENBQUMsRUFIVyxTQUFTLEtBQVQsU0FBUyxRQUdwQjtBQWlCRCxNQUFNLE9BQU8sZ0JBQWdCO0lBMEczQixZQUFvQixTQUFvQixFQUFVLEVBQWUsRUFBVSxHQUFzQjtRQUE3RSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBbEd6RixnQkFBVyxHQUFvQixNQUFN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QUdGLE1BQU07c0JBRFQsS0FBSztnQkFVRixJQUFJO3NCQURQLEtBQUs7Z0JBVUYsV0FBVztzQkFEZCxLQUFLO2dCQVNHLElBQUk7c0JBQVosS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLEdBQUc7c0JBQVgsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUdGLElBQUk7c0JBRFAsS0FBSztnQkFTRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOR1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4vdXRpbHMvRm9ybVV0aWxzJztcbmltcG9ydCB7IEJhc2VDb250cm9sIH0gZnJvbSAnLi9jb250cm9scy9CYXNlQ29udHJvbCc7XG5pbXBvcnQgeyBOb3ZvRm9ybUdyb3VwIH0gZnJvbSAnLi9Ob3ZvRm9ybUdyb3VwJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnIHtcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRWRpdFN0YXRlIHtcbiAgRURJVElORyA9ICdlZGl0aW5nJyxcbiAgTk9UX0VESVRJTkcgPSAnbm90ZWRpdGluZycsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZyB7XG4gIGVkaXQ6IGJvb2xlYW47XG4gIHJlbW92ZTogYm9vbGVhbjtcbiAgc3RhdGU6IEVkaXRTdGF0ZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jb250cm9sLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL0NvbnRyb2xHcm91cC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm5vdm8tY29udHJvbC1ncm91cC1hcHBlYXJhbmNlLWNhcmRdJzogXCJhcHBlYXJhbmNlPT0nY2FyZCdcIixcbiAgICAnW2NsYXNzLm5vdm8tY29udHJvbC1ncm91cC1hcHBlYXJhbmNlLW5vbmVdJzogXCJhcHBlYXJhbmNlPT0nbm9uZSdcIixcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NvbnRyb2xHcm91cCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgc2V0IGFwcGVhcmFuY2UodmFsdWU6ICdub25lJyB8ICdjYXJkJykge1xuICAgIHRoaXMuX2FwcGVhcmFuY2UgPSB2YWx1ZTtcbiAgfVxuICBnZXQgYXBwZWFyYW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBwcml2YXRlIF9hcHBlYXJhbmNlOiAnbm9uZScgfCAnY2FyZCcgPSAnbm9uZSc7XG5cbiAgLy8gU2V0cyB0aGUgZGlzcGxheSBvZiB0aGUgZ3JvdXAgdG8gZWl0aGVyIGJlIHJvdyAoZGVmYXVsdCkgb3IgdmVydGljYWwgdmlhIGZsZXgtYm94XG4gIEBJbnB1dCgpXG4gIHNldCB2ZXJ0aWNhbCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7XG4gIH1cbiAgZ2V0IHZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLl92ZXJ0aWNhbDtcbiAgfVxuICBwcml2YXRlIF92ZXJ0aWNhbCA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgc3RhY2tlZCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RhY2tlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgc3RhY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhY2tlZDtcbiAgfVxuICBwcml2YXRlIF9zdGFja2VkID0gZmFsc2U7XG5cbiAgLy8gSGlkZXMvc2hvd3MgdGhlIGFkZCBidXR0b24gZm9yIGFkZGluZyBhIG5ldyBjb250cm9sXG4gIEBJbnB1dCgpIGFkZDogTm92b0NvbnRyb2xHcm91cEFkZENvbmZpZztcbiAgLy8gSGlkZS9zaG93cyB0aGUgcmVtb3ZlIGJ1dHRvbiBmb3IgcmVtb3ZpbmcgYSBjb250cm9sXG4gIEBJbnB1dCgpXG4gIHNldCByZW1vdmUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlbW92ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgcmVtb3ZlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW1vdmU7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlID0gZmFsc2U7XG4gIC8vIEhpZGUvc2hvd3MgdGhlIGVkaXQgYnV0dG9uIGZvciBlZGl0aW5nIGEgY29udHJvbFxuICBASW5wdXQoKVxuICBzZXQgZWRpdCh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZWRpdCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgZWRpdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdDtcbiAgfVxuICBwcml2YXRlIF9lZGl0ID0gZmFsc2U7XG4gIC8vIEFsbG93cyB0aGUgY29udHJvbCB0byBjb2xsYXBzZSBvciBub3RcbiAgQElucHV0KClcbiAgc2V0IGNvbGxhcHNpYmxlKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb2xsYXBzaWJsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgY29sbGFwc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNpYmxlO1xuICB9XG4gIHByaXZhdGUgX2NvbGxhcHNpYmxlID0gZmFsc2U7XG4gIC8vIE1haW4gZm9ybSBncm91cFxuICBASW5wdXQoKSBmb3JtOiBOb3ZvRm9ybUdyb3VwO1xuICAvLyBDb250cm9scyBmb3IgZWFjaCBpdGVtIGluIHRoZSBjb250cm9sIGdyb3VwXG4gIEBJbnB1dCgpIGNvbnRyb2xzOiBCYXNlQ29udHJvbFtdO1xuICAvLyBLZXkgb2YgdGhlIGNvbnRyb2wgZ3JvdXAgKG9uIHRoZSBtYWluIGZvcm0pXG4gIEBJbnB1dCgpIGtleTogc3RyaW5nO1xuICAvLyBMYWJlbCBvZiB0aGUgY29udHJvbCBncm91cFxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICAvLyBEZXNjcmlwdGlvbiBvZiB0aGUgY29udHJvbCBncm91cCAob25seSB1c2Ugd2l0aCBwb3NpdGlvbjpib3R0b20gQWRkIGJ1dHRvbiEpXG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIC8vIE1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGVyZSBhcmUgbm8gY29udHJvbHNcbiAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmc7XG4gIC8vIEljb24gb2YgdGhlIGNvbnRyb2wgZ3JvdXAgKGNhbiBoYXZlIGJoaSBwcmVmaXggb3Igbm90KVxuICBASW5wdXQoKVxuICBzZXQgaWNvbih2OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pY29uID0gdiAmJiB2LmluZGV4T2YoJ2JoaScpICE9PSAtMSA/IHYgOiBgYmhpLSR7dn1gO1xuICB9XG4gIGdldCBpY29uKCkge1xuICAgIHJldHVybiB0aGlzLl9pY29uO1xuICB9XG4gIHByaXZhdGUgX2ljb246IHN0cmluZztcbiAgLy8gRWRpdCBpY29uIGF0IHRoZSBlbmQgb2YgZWFjaCByb3cgKG5vIGJoaS0gcHJlZml4KVxuICBASW5wdXQoKSBlZGl0SWNvbiA9ICdlZGl0JztcbiAgLy8gUmVtb3ZlIGljb24gYXQgdGhlIGVuZCBvZiBlYWNoIHJvdyAobm8gYmhpLSBwcmVmaXgpXG4gIEBJbnB1dCgpIHJlbW92ZUljb24gPSAnZGVsZXRlLW8nO1xuICAvLyBUaGUgaW5pdGlhbCB2YWx1ZSBvYmplY3QsIHdpbGwgY3JlYXRlIHRoZSBmb3JtIHJvd3Mgb2ZmIG9mXG4gIEBJbnB1dCgpIGluaXRpYWxWYWx1ZToge31bXTtcbiAgLy8gQ2FsbGJhY2sgdG8gZGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBlZGl0XG4gIEBJbnB1dCgpIGNhbkVkaXQ6IEZ1bmN0aW9uO1xuICAvLyBDYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGRlbGV0ZVxuICBASW5wdXQoKSBjYW5SZW1vdmU6IEZ1bmN0aW9uO1xuICAvLyBPcHRpb25hbCBjYWxsYmFjayBmb3Igd2hldGhlciBvciBub3QgdG8gcmVtb3ZlIHRoZSBnaXZlbiByb3dcbiAgQElucHV0KCkgc2hvdWxkUmVtb3ZlOiAobnVtYmVyKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICAvLyBUZW1wbGF0ZSBmb3IgY3VzdG9tIHJvdyByZW5kZXJpbmdcbiAgQElucHV0KCkgcm93VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIC8vIFRlbXBsYXRlIGZvciBjdXN0b20gY29sdW1uIGxhYmVsIHJlbmRlcmluZ1xuICBASW5wdXQoKSBjb2x1bW5MYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBvblJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTsgaW5kZXggfT4oKTtcbiAgQE91dHB1dCgpIG9uRWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTsgaW5kZXggfT4oKTtcbiAgQE91dHB1dCgpIG9uQWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb250cm9sTGFiZWxzOiB7IHZhbHVlOiBzdHJpbmc7IHdpZHRoOiBudW1iZXI7IHJlcXVpcmVkOiBib29sZWFuOyBoaWRkZW4/OiBib29sZWFuOyBrZXk6IHN0cmluZyB9W10gPSBbXTtcbiAgdG9nZ2xlZCA9IGZhbHNlO1xuICBkaXNhYmxlZEFycmF5OiBOb3ZvQ29udHJvbEdyb3VwUm93Q29uZmlnW10gPSBbXTtcbiAgZWRpdFN0YXRlOiBFZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtVXRpbHM6IEZvcm1VdGlscywgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3ZvLWNvbnRyb2wtZ3JvdXAgbXVzdCBoYXZlIHRoZSBba2V5XSBhdHRyaWJ1dGUgcHJvdmlkZWQhJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZUNoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5pbml0aWFsVmFsdWU7XG5cbiAgICAvLyBJZiBpbml0aWFsIHZhbHVlIGNoYW5nZXMsIGNsZWFyIHRoZSBjb250cm9sc1xuICAgIGlmIChpbml0aWFsVmFsdWVDaGFuZ2UgJiYgaW5pdGlhbFZhbHVlQ2hhbmdlLmN1cnJlbnRWYWx1ZSAhPT0gaW5pdGlhbFZhbHVlQ2hhbmdlLnByZXZpb3VzVmFsdWUgJiYgIWluaXRpYWxWYWx1ZUNoYW5nZS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5jbGVhckNvbnRyb2xzKCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGFycmF5LCBhZGQgYSBjb250cm9sIGZvciBlYWNoIHZhbHVlXG4gICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlICYmIEFycmF5LmlzQXJyYXkodGhpcy5pbml0aWFsVmFsdWUpKSB7XG4gICAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5pbml0aWFsVmFsdWUuZm9yRWFjaCgodmFsdWUpID0+IHRoaXMuYWRkTmV3Q29udHJvbCh2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pbml0aWFsVmFsdWUpIHtcbiAgICAgIC8vIElmIHZhbHVlIGlzIGFuIG9iamVjdCwganVzdCBhZGQgb25lIGNvbnRyb2xcbiAgICAgIHRoaXMuYWRkTmV3Q29udHJvbCh0aGlzLmluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIC8vIElmIHdlIGFyZSBob3Jpem9udGFsLCBncmFiIHRoZSBsYWJlbHMgdG8gaGVscCB3aXRoIGxheW91dFxuICAgIGlmICghdGhpcy52ZXJ0aWNhbCkge1xuICAgICAgdGhpcy5jb250cm9sTGFiZWxzID0gKHRoaXMuY29udHJvbHMgfHwgW10pLm1hcCgoY29udHJvbDogQmFzZUNvbnRyb2wpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogY29udHJvbC5sYWJlbCxcbiAgICAgICAgICB3aWR0aDogY29udHJvbC53aWR0aCxcbiAgICAgICAgICByZXF1aXJlZDogY29udHJvbC5yZXF1aXJlZCxcbiAgICAgICAgICBrZXk6IGNvbnRyb2wua2V5LFxuICAgICAgICAgIGhpZGRlbjogY29udHJvbC5oaWRkZW4sXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xlYXJDb250cm9scygpO1xuICB9XG5cbiAgb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIG9uQ2xpY2tBZGQoKSB7XG4gICAgdGhpcy5hZGROZXdDb250cm9sKCk7XG4gICAgLy8gdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuRURJVElORztcbiAgfVxuICBvbkNsaWNrQ2FuY2VsKCkge1xuICAgIHRoaXMuZWRpdFN0YXRlID0gRWRpdFN0YXRlLk5PVF9FRElUSU5HO1xuICB9XG4gIG9uQ2xpY2tTYXZlKCkge1xuICAgIHRoaXMuZGlzYWJsZWRBcnJheVt0aGlzLmN1cnJlbnRJbmRleCAtIDFdLnN0YXRlID0gRWRpdFN0YXRlLk5PVF9FRElUSU5HO1xuICAgIHRoaXMuZWRpdFN0YXRlID0gRWRpdFN0YXRlLk5PVF9FRElUSU5HO1xuICAgIGNvbnN0IGNvbnRyb2w6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICBjb25zdCBmZzogTm92b0Zvcm1Hcm91cCA9IGNvbnRyb2wuYXQodGhpcy5jdXJyZW50SW5kZXggLSAxKSBhcyBOb3ZvRm9ybUdyb3VwO1xuICAgICAgZmcuZGlzYWJsZUFsbENvbnRyb2xzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRBZGRSZW1vdmUoKSB7XG4gICAgdGhpcy5kaXNhYmxlZEFycmF5LmZvckVhY2goKGl0ZW06IE5vdm9Db250cm9sR3JvdXBSb3dDb25maWcsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBpdGVtLmVkaXQgPSB0aGlzLmNoZWNrQ2FuRWRpdChpZHgpO1xuICAgICAgaXRlbS5yZW1vdmUgPSB0aGlzLmNoZWNrQ2FuUmVtb3ZlKGlkeCk7XG4gICAgICBpZiAoIWl0ZW0uZWRpdCkge1xuICAgICAgICBpdGVtLnN0YXRlID0gRWRpdFN0YXRlLk5PVF9FRElUSU5HO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYWRkTmV3Q29udHJvbCh2YWx1ZT86IHt9KSB7XG4gICAgY29uc3QgY29udHJvbHNBcnJheTogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgY29uc3QgbmVzdGVkRm9ybUdyb3VwOiBOb3ZvRm9ybUdyb3VwID0gdGhpcy5idWlsZE5lc3RlZEZvcm1Hcm91cCh2YWx1ZSk7XG4gICAgaWYgKGNvbnRyb2xzQXJyYXkpIHtcbiAgICAgIGNvbnRyb2xzQXJyYXkucHVzaChuZXN0ZWRGb3JtR3JvdXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm0uYWRkQ29udHJvbCh0aGlzLmtleSwgdGhpcy5mYi5hcnJheShbbmVzdGVkRm9ybUdyb3VwXSkpO1xuICAgIH1cbiAgICB0aGlzLmRpc2FibGVkQXJyYXkucHVzaCh7XG4gICAgICBzdGF0ZTogRWRpdFN0YXRlLkVESVRJTkcsXG4gICAgICBlZGl0OiB0cnVlLFxuICAgICAgcmVtb3ZlOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMucmVzZXRBZGRSZW1vdmUoKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLm9uQWRkLmVtaXQobmVzdGVkRm9ybUdyb3VwKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50SW5kZXgrKztcbiAgICB0aGlzLmFzc2lnbkluZGV4ZXMoKTtcbiAgICAvLyBFbnN1cmUgdGhhdCBmaWVsZCBpbnRlcmFjdGlvbiBjaGFuZ2VzIGZvciBuZXN0ZWQgZm9ybXMgb3JpZ2luYXRpbmcgZnJvbSBvdXRzaWRlIHRoZSBmb3JtIHdpbGwgYmUgcmVmbGVjdGVkIGluIHRoZSBuZXN0ZWQgZWxlbWVudHNcbiAgICBuZXN0ZWRGb3JtR3JvdXAuZmllbGRJbnRlcmFjdGlvbkV2ZW50cy5zdWJzY3JpYmUodGhpcy5vbkZpZWxkSW50ZXJhY3Rpb25FdmVudC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaWxsIHJlbW92ZSB0aGUgY29udHJvbCwgYW5kIG9wdGlvbmFsbHksIGlmIHRoZSBldmVudCBpcyB0byBiZSBwdWJsaWNpemVkIChlbWl0RXZlbnQgPSB0cnVlKSBhbmQgdGhlcmUgaXMgYVxuICAgKiBzaG91bGRSZW1vdmUgY2FsbGJhY2ssIHRoZW4gY2FsbCB0aGUgc2hvdWxkUmVtb3ZlKCkgY2FsbGJhY2sgdG8gZGV0ZXJtaW5lIGlmIHRoZSBkb1JlbW92ZUNvbnRyb2wgc2hvdWxkIGJlIGNhbGxlZC5cbiAgICovXG4gIHJlbW92ZUNvbnRyb2woaW5kZXg6IG51bWJlciwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xuICAgIGlmIChlbWl0RXZlbnQgJiYgSGVscGVycy5pc0Z1bmN0aW9uKHRoaXMuc2hvdWxkUmVtb3ZlKSkge1xuICAgICAgdGhpcy5zaG91bGRSZW1vdmUoaW5kZXgpLnRoZW4oKHNob3VsZFJlbW92ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlKSB7XG4gICAgICAgICAgdGhpcy5kb1JlbW92ZUNvbnRyb2woaW5kZXgsIGVtaXRFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvUmVtb3ZlQ29udHJvbChpbmRleCwgZW1pdEV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRvUmVtb3ZlQ29udHJvbChpbmRleDogbnVtYmVyLCBlbWl0RXZlbnQ6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCBuZXN0ZWRGb3JtR3JvdXAgPSBjb250cm9sc0FycmF5LmF0KGluZGV4KSBhcyBOb3ZvRm9ybUdyb3VwO1xuICAgIG5lc3RlZEZvcm1Hcm91cC5maWVsZEludGVyYWN0aW9uRXZlbnRzLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKGVtaXRFdmVudCkge1xuICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHsgdmFsdWU6IG5lc3RlZEZvcm1Hcm91cC5nZXRSYXdWYWx1ZSgpLCBpbmRleCB9KTtcbiAgICB9XG4gICAgY29udHJvbHNBcnJheS5yZW1vdmVBdChpbmRleCk7XG4gICAgdGhpcy5kaXNhYmxlZEFycmF5ID0gdGhpcy5kaXNhYmxlZEFycmF5LmZpbHRlcigodmFsdWU6IE5vdm9Db250cm9sR3JvdXBSb3dDb25maWcsIGlkeDogbnVtYmVyKSA9PiBpZHggIT09IGluZGV4KTtcbiAgICB0aGlzLnJlc2V0QWRkUmVtb3ZlKCk7XG4gICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcbiAgICB0aGlzLmFzc2lnbkluZGV4ZXMoKTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGVkaXRDb250cm9sKGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCBmZyA9IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgZmcuZW5hYmxlQWxsQ29udHJvbHMoKTtcbiAgICB0aGlzLm9uRWRpdC5lbWl0KHsgdmFsdWU6IGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpLnZhbHVlLCBpbmRleCB9KTtcbiAgfVxuXG4gIHRvZ2dsZShldmVudDogTW91c2VFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBpZiAodGhpcy5jb2xsYXBzaWJsZSkge1xuICAgICAgdGhpcy50b2dnbGVkID0gIXRoaXMudG9nZ2xlZDtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYnVpbGROZXN0ZWRGb3JtR3JvdXAodmFsdWU/OiB7fSk6IE5vdm9Gb3JtR3JvdXAge1xuICAgIGNvbnN0IG5ld0NvbnRyb2xzID0gdGhpcy5nZXROZXdDb250cm9scygpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5mb3JtVXRpbHMuc2V0SW5pdGlhbFZhbHVlcyhuZXdDb250cm9scywgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtVXRpbHMudG9Gb3JtR3JvdXAobmV3Q29udHJvbHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmIChjb250cm9sc0FycmF5KSB7XG4gICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBjb250cm9sc0FycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChpLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0NhbkVkaXQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhbkVkaXQpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzQXJyYXk6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgICAgcmV0dXJuIHRoaXMuY2FuRWRpdChjb250cm9sc0FycmF5LmF0KGluZGV4KS52YWx1ZSwgaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tDYW5SZW1vdmUoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhblJlbW92ZSkge1xuICAgICAgY29uc3QgY29udHJvbHNBcnJheTogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgICBpZiAoY29udHJvbHNBcnJheS5hdChpbmRleCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuUmVtb3ZlKGNvbnRyb2xzQXJyYXkuYXQoaW5kZXgpLnZhbHVlLCBpbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGdldE5ld0NvbnRyb2xzKCkge1xuICAgIGNvbnN0IHJldDogQmFzZUNvbnRyb2xbXSA9IFtdO1xuICAgICh0aGlzLmNvbnRyb2xzIHx8IFtdKS5mb3JFYWNoKChjb250cm9sOiBCYXNlQ29udHJvbCkgPT4ge1xuICAgICAgcmV0LnB1c2gobmV3IEJhc2VDb250cm9sKGNvbnRyb2wuX190eXBlLCBjb250cm9sKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHByaXZhdGUgYXNzaWduSW5kZXhlcygpIHtcbiAgICBjb25zdCBjb250cm9sc0FycmF5OiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBpZiAoY29udHJvbHNBcnJheSkge1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGNvbnRyb2xzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGNvbnRyb2xzQXJyYXkuYXQoaSkgYXMgTm92b0Zvcm1Hcm91cDtcbiAgICAgICAgZm9ybS5hc3NvY2lhdGlvbnMgPSB7IC4uLmZvcm0uYXNzb2NpYXRpb25zLCBpbmRleDogaSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25GaWVsZEludGVyYWN0aW9uRXZlbnQoKSB7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0YWNrZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8aDYgY2xhc3M9XCJub3ZvLXNlY3Rpb24taGVhZGVyXCIgKm5nSWY9XCJsYWJlbFwiPlxuICA8c3BhbiAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIiBbY2xhc3MuY2xpY2thYmxlXT1cImNvbGxhcHNpYmxlXCI+XG4gICAgPGkgKm5nSWY9XCJpY29uICYmICFjb2xsYXBzaWJsZVwiIFtuZ0NsYXNzXT1cImljb25cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1pY29uLScgKyBrZXlcIj48L2k+XG4gICAgPGkgKm5nSWY9XCJjb2xsYXBzaWJsZVwiIGNsYXNzPVwiYmhpLW5leHRcIiBbY2xhc3MudG9nZ2xlZF09XCJ0b2dnbGVkXCJcbiAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWNvbGxhcHNlLScgKyBrZXlcIj48L2k+XG4gICAgPHNwYW4gW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtbGFiZWwtJyArIGtleVwiPnt7IGxhYmVsIH19PC9zcGFuPlxuICA8L3NwYW4+XG4gIDxsYWJlbCBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1kZXNjcmlwdGlvblwiICpuZ0lmPVwiZGVzY3JpcHRpb25cIlxuICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWRlc2NyaXB0aW9uLScgKyBrZXlcIj57eyBkZXNjcmlwdGlvbiB9fTwvbGFiZWw+XG48L2g2PlxuPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sc1wiIFtjbGFzcy52ZXJ0aWNhbF09XCJ2ZXJ0aWNhbFwiIFtjbGFzcy5ob3Jpem9udGFsXT1cIiF2ZXJ0aWNhbFwiXG4gIFtjbGFzcy5oaWRkZW5dPVwiY29sbGFwc2libGUgJiYgIXRvZ2dsZWRcIj5cblxuICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZSBsZXQtaW5kZXg9XCJpbmRleFwiIGxldC1mb3JtPVwiZm9ybVwiIGxldC1rZXk9XCJrZXlcIj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWNvbnRyb2xcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGMgb2YgY29udHJvbHNcIiBjbGFzcz1cIm5vdm8tY29udHJvbC1jb250YWluZXIge3tjLmtleX19XCJcbiAgICAgICAgW2NsYXNzLmlzLWxhYmVsXT1cImMuY29udHJvbFR5cGUgPT09ICdyZWFkLW9ubHknXCIgW3N0eWxlLm1heC13aWR0aC5weF09XCJjLndpZHRoXCI+XG4gICAgICAgIDxub3ZvLWNvbnRyb2wgKGNoYW5nZSk9XCJvbkNoYW5nZSgpXCIgW2Zvcm1dPVwiKGZvcm0/LmNvbnRyb2xzKVtrZXldWydjb250cm9scyddW2luZGV4XVwiIFtjb250cm9sXT1cImNcIlxuICAgICAgICAgIFtjb25kZW5zZWRdPVwiIXZlcnRpY2FsIHx8IGMuY29udHJvbFR5cGUgPT09ICdyZWFkLW9ubHknXCI+PC9ub3ZvLWNvbnRyb2w+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtY29udGFpbmVyIGVkaXQgbGFzdFwiICpuZ0lmPVwiZWRpdCAmJiAhdmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tYnV0dG9uIGNsYXNzPVwiY29udHJvbC1ncm91cC1hY3Rpb25cIiBbZGlzYWJsZWRdPVwiIWRpc2FibGVkQXJyYXlbaW5kZXhdLmVkaXRcIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAqbmdJZj1cImVkaXQgJiYgIXZlcnRpY2FsXCIgdGhlbWU9XCJpY29uXCIgW2ljb25dPVwiZWRpdEljb25cIlxuICAgICAgICAgIChjbGljayk9XCJlZGl0Q29udHJvbChpbmRleClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1lZGl0LScgKyBrZXlcIiBpbmRleD1cIi0xXCI+XG4gICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtY29udGFpbmVyIHJlbW92ZSBsYXN0XCIgKm5nSWY9XCJyZW1vdmUgJiYgIXZlcnRpY2FsXCI+XG4gICAgICAgIDxub3ZvLWJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtZ3JvdXAtYWN0aW9uXCIgW2Rpc2FibGVkXT1cIiFkaXNhYmxlZEFycmF5W2luZGV4XS5yZW1vdmVcIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAqbmdJZj1cInJlbW92ZSAmJiAhdmVydGljYWxcIiB0aGVtZT1cImljb25cIlxuICAgICAgICAgIFtpY29uXT1cInJlbW92ZUljb25cIiAoY2xpY2spPVwicmVtb3ZlQ29udHJvbChpbmRleClcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWRlbGV0ZS0nICsga2V5XCJcbiAgICAgICAgICBpbmRleD1cIi0xXCI+XG4gICAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8bm92by1idXR0b24gY2xhc3M9XCJjb250cm9sLWdyb3VwLWFjdGlvblwiIFtkaXNhYmxlZF09XCIhZGlzYWJsZWRBcnJheVtpbmRleF0uZWRpdFwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgKm5nSWY9XCJlZGl0ICYmIHZlcnRpY2FsXCJcbiAgICAgIHRoZW1lPVwiaWNvblwiIFtpY29uXT1cImVkaXRJY29uXCJcbiAgICAgIChjbGljayk9XCJlZGl0Q29udHJvbChpbmRleClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1lZGl0LScgKyBrZXlcIiBpbmRleD1cIi0xXCI+XG4gICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICA8bm92by1idXR0b24gY2xhc3M9XCJjb250cm9sLWdyb3VwLWFjdGlvblwiIFtkaXNhYmxlZF09XCIhZGlzYWJsZWRBcnJheVtpbmRleF0ucmVtb3ZlXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAqbmdJZj1cInJlbW92ZSAmJiB2ZXJ0aWNhbFwiIHRoZW1lPVwiaWNvblwiXG4gICAgICBbaWNvbl09XCJyZW1vdmVJY29uXCIgKGNsaWNrKT1cInJlbW92ZUNvbnRyb2woaW5kZXgpXCJcbiAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWRlbGV0ZS0nICsga2V5XCJcbiAgICAgIGluZGV4PVwiLTFcIj5cbiAgICA8L25vdm8tYnV0dG9uPlxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdENvbHVtbkxhYmVsVGVtcGxhdGUgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWtleT1cImtleVwiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGxhYmVsIG9mIGNvbnRyb2xMYWJlbHNcIlxuICAgICAgY2xhc3M9XCJub3ZvLWNvbnRyb2wtZ3JvdXAtY29udHJvbC1sYWJlbCB7eyBsYWJlbC5rZXkgfX1cIlxuICAgICAgW2NsYXNzLm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWhpZGRlbl09XCJsYWJlbC5oaWRkZW5cIlxuICAgICAgW3N0eWxlLm1heC13aWR0aC5weF09XCJsYWJlbC53aWR0aFwiIFtjbGFzcy5jb2x1bW4tcmVxdWlyZWRdPVwibGFiZWwucmVxdWlyZWRcIj5cbiAgICAgIDxzcGFuIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWxhYmVsLScgKyBsYWJlbC52YWx1ZVwiPnt7IGxhYmVsLnZhbHVlIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtZ3JvdXAtY29udHJvbC1sYWJlbCBlZGl0IGxhc3RcIiAqbmdJZj1cImVkaXRcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZWRpdC0nICsga2V5XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWxhYmVsIHJlbW92ZSBsYXN0XCIgKm5nSWY9XCJyZW1vdmVcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZGVsZXRlLScgKyBrZXlcIj48L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZlcnRpY2FsICYmIChmb3JtPy5jb250cm9scylba2V5XSAmJiAoZm9ybT8uY29udHJvbHMpW2tleV1bJ2NvbnRyb2xzJ10ubGVuZ3RoICE9PSAwXCI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1sYWJlbHNcIlxuICAgICAgKm5nSWY9XCIhdmVydGljYWwgJiYgKGZvcm0/LmNvbnRyb2xzKVtrZXldICYmIChmb3JtPy5jb250cm9scylba2V5XVsnY29udHJvbHMnXS5sZW5ndGggIT09IDBcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW5MYWJlbFRlbXBsYXRlIHx8IGRlZmF1bHRDb2x1bW5MYWJlbFRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZm9ybTogZm9ybSwga2V5OiBrZXksIGNvbnRyb2xMYWJlbHM6IGNvbnRyb2xMYWJlbHMgfVwiPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIihmb3JtPy5jb250cm9scylba2V5XVwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtZ3JvdXAtcm93XCJcbiAgICAgICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIChmb3JtPy5jb250cm9scylba2V5XVsnY29udHJvbHMnXTsgbGV0IGluZGV4ID0gaW5kZXhcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyb3dUZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBmb3JtOiBmb3JtLCBmb3JtR3JvdXA6IGNvbnRyb2wsIGluZGV4OiBpbmRleCwga2V5OiBrZXksIGNvbnRyb2xzOiBjb250cm9scyB9XCI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWVtcHR5XCJcbiAgICAqbmdJZj1cIihmb3JtPy5jb250cm9scylba2V5XSAmJiAoZm9ybT8uY29udHJvbHMpW2tleV1bJ2NvbnRyb2xzJ10ubGVuZ3RoID09PSAwXCJcbiAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1lbXB0eS0nICsga2V5XCI+XG4gICAge3sgZW1wdHlNZXNzYWdlIH19XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJhZGRcIiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1mb290ZXJcIj5cbiAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBpY29uPVwiYWRkLXRoaW5cIiBzaWRlPVwibGVmdFwiIChjbGljayk9XCJvbkNsaWNrQWRkKClcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtYm90dG9tLWFkZC0nICsga2V5XCIgaW5kZXg9XCItMVwiPlxuICAgICAge3sgYWRkPy5sYWJlbCB9fVxuICAgIDwvbm92by1idXR0b24+XG4gICAgPCEtLSA8bm92by1idXR0b24gKm5nSWY9XCJlZGl0U3RhdGU9PT0nZWRpdGluZydcIiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJkaWFsb2d1ZVwiIGljb249XCJjbG9zZVwiIHNpZGU9XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrQ2FuY2VsKClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1ib3R0b20tY2FuY2VsLScgKyBrZXlcIlxuICAgICAgICAgICAgICAgICAgaW5kZXg9XCItMVwiPlxuICAgICAgICAgICAgICAgIHt7ICdjYW5jZWwnIH19XG4gICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxub3ZvLWJ1dHRvbiAqbmdJZj1cImVkaXRTdGF0ZT09PSdlZGl0aW5nJ1wiIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cImRpYWxvZ3VlXCIgaWNvbj1cImNoZWNrXCIgc2lkZT1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tTYXZlKClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1ib3R0b20tc2F2ZS0nICsga2V5XCJcbiAgICAgICAgICAgICAgICAgIGluZGV4PVwiLTFcIj5cbiAgICAgICAgICAgICAgICB7eyBhZGQ/LmxhYmVsIH19XG4gICAgICAgICAgICAgICAgPC9ub3ZvLWJ1dHRvbj4gLS0+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=