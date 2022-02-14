// NG
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { BaseControl } from './controls/BaseControl';
// App
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
import * as i1 from "./../../utils/form-utils/FormUtils";
import * as i2 from "@angular/forms";
import * as i3 from "../../services/novo-label-service";
function NovoControlGroup_h6_0_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 12);
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r9.icon);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-icon-" + ctx_r9.key);
} }
function NovoControlGroup_h6_0_i_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("toggled", ctx_r10.toggled);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-collapse-" + ctx_r10.key);
} }
function NovoControlGroup_h6_0_label_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-description-" + ctx_r11.key);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r11.description);
} }
function NovoControlGroup_h6_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "h6", 7);
    i0.ɵɵelementStart(1, "span", 8);
    i0.ɵɵlistener("click", function NovoControlGroup_h6_0_Template_span_click_1_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.toggle($event); });
    i0.ɵɵtemplate(2, NovoControlGroup_h6_0_i_2_Template, 1, 2, "i", 9);
    i0.ɵɵtemplate(3, NovoControlGroup_h6_0_i_3_Template, 1, 3, "i", 10);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, NovoControlGroup_h6_0_label_6_Template, 2, 2, "label", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("clickable", ctx_r0.collapsible);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.icon && !ctx_r0.collapsible);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.collapsible);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-label-" + ctx_r0.key);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.description);
} }
function NovoControlGroup_ng_template_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "novo-control", 20);
    i0.ɵɵlistener("change", function NovoControlGroup_ng_template_2_div_1_Template_novo_control_change_1_listener($event) { i0.ɵɵrestoreView(_r24); const ctx_r23 = i0.ɵɵnextContext(2); return ctx_r23.onChange($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r22 = ctx.$implicit;
    const ctx_r25 = i0.ɵɵnextContext();
    const form_r15 = ctx_r25.form;
    const key_r16 = ctx_r25.key;
    const index_r14 = ctx_r25.index;
    const ctx_r17 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("novo-control-container ", c_r22.key, "");
    i0.ɵɵstyleProp("max-width", c_r22.width, "px");
    i0.ɵɵclassProp("is-label", c_r22.controlType === "read-only");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("form", form_r15 == null ? null : form_r15.controls[key_r16]["controls"][index_r14])("control", c_r22)("condensed", !ctx_r17.vertical || c_r22.controlType === "read-only");
} }
function NovoControlGroup_ng_template_2_div_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function NovoControlGroup_ng_template_2_div_2_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const index_r14 = i0.ɵɵnextContext(2).index; const ctx_r27 = i0.ɵɵnextContext(); return ctx_r27.editControl(index_r14); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r30 = i0.ɵɵnextContext(2);
    const index_r14 = ctx_r30.index;
    const key_r16 = ctx_r30.key;
    const ctx_r26 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r26.disabledArray[index_r14].edit);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-edit-" + key_r16);
} }
function NovoControlGroup_ng_template_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_template_2_div_2_button_1_Template, 1, 2, "button", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r18.edit && !ctx_r18.vertical);
} }
function NovoControlGroup_ng_template_2_div_3_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function NovoControlGroup_ng_template_2_div_3_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r34); const index_r14 = i0.ɵɵnextContext(2).index; const ctx_r32 = i0.ɵɵnextContext(); return ctx_r32.removeControl(index_r14); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r35 = i0.ɵɵnextContext(2);
    const index_r14 = ctx_r35.index;
    const key_r16 = ctx_r35.key;
    const ctx_r31 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r31.disabledArray[index_r14].remove);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-delete-" + key_r16);
} }
function NovoControlGroup_ng_template_2_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_template_2_div_3_button_1_Template, 1, 2, "button", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r19.remove && !ctx_r19.vertical);
} }
function NovoControlGroup_ng_template_2_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function NovoControlGroup_ng_template_2_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r38); const index_r14 = i0.ɵɵnextContext().index; const ctx_r36 = i0.ɵɵnextContext(); return ctx_r36.editControl(index_r14); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r39 = i0.ɵɵnextContext();
    const index_r14 = ctx_r39.index;
    const key_r16 = ctx_r39.key;
    const ctx_r20 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r20.disabledArray[index_r14].edit);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-edit-" + key_r16);
} }
function NovoControlGroup_ng_template_2_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function NovoControlGroup_ng_template_2_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r42); const index_r14 = i0.ɵɵnextContext().index; const ctx_r40 = i0.ɵɵnextContext(); return ctx_r40.removeControl(index_r14); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r43 = i0.ɵɵnextContext();
    const index_r14 = ctx_r43.index;
    const key_r16 = ctx_r43.key;
    const ctx_r21 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", !ctx_r21.disabledArray[index_r14].remove);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-delete-" + key_r16);
} }
function NovoControlGroup_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_template_2_div_1_Template, 2, 10, "div", 16);
    i0.ɵɵtemplate(2, NovoControlGroup_ng_template_2_div_2_Template, 2, 1, "div", 17);
    i0.ɵɵtemplate(3, NovoControlGroup_ng_template_2_div_3_Template, 2, 1, "div", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, NovoControlGroup_ng_template_2_button_4_Template, 1, 2, "button", 18);
    i0.ɵɵtemplate(5, NovoControlGroup_ng_template_2_button_5_Template, 1, 2, "button", 19);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.controls);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.edit && !ctx_r2.vertical);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.remove && !ctx_r2.vertical);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.edit && ctx_r2.vertical);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.remove && ctx_r2.vertical);
} }
function NovoControlGroup_ng_template_4_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const label_r49 = ctx.$implicit;
    i0.ɵɵclassMapInterpolate1("novo-control-group-control-label ", label_r49.key, "");
    i0.ɵɵstyleProp("max-width", label_r49.width, "px");
    i0.ɵɵclassProp("novo-control-group-control-hidden", label_r49.hidden)("column-required", label_r49.required);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-label-" + label_r49.value);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(label_r49.value);
} }
function NovoControlGroup_ng_template_4_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 26);
} if (rf & 2) {
    const key_r45 = i0.ɵɵnextContext().key;
    i0.ɵɵattribute("data-automation-id", "novo-control-group-edit-" + key_r45);
} }
function NovoControlGroup_ng_template_4_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 26);
} if (rf & 2) {
    const key_r45 = i0.ɵɵnextContext().key;
    i0.ɵɵattribute("data-automation-id", "novo-control-group-delete-" + key_r45);
} }
function NovoControlGroup_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, NovoControlGroup_ng_template_4_div_0_Template, 3, 11, "div", 24);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_template_4_div_1_Template, 1, 1, "div", 25);
    i0.ɵɵtemplate(2, NovoControlGroup_ng_template_4_div_2_Template, 1, 1, "div", 25);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngForOf", ctx_r4.controlLabels);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.edit);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r4.remove);
} }
function NovoControlGroup_ng_container_6_div_1_ng_template_1_Template(rf, ctx) { }
const _c0 = function (a0, a1, a2) { return { form: a0, key: a1, controlLabels: a2 }; };
function NovoControlGroup_ng_container_6_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_container_6_div_1_ng_template_1_Template, 0, 0, "ng-template", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r52 = i0.ɵɵnextContext(2);
    const _r3 = i0.ɵɵreference(5);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r52.columnLabelTemplate || _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c0, ctx_r52.form, ctx_r52.key, ctx_r52.controlLabels));
} }
function NovoControlGroup_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_container_6_div_1_Template, 2, 6, "div", 27);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r5.vertical && (ctx_r5.form == null ? null : ctx_r5.form.controls[ctx_r5.key]) && (ctx_r5.form == null ? null : ctx_r5.form.controls[ctx_r5.key]["controls"].length) !== 0);
} }
function NovoControlGroup_ng_container_7_div_1_ng_template_1_Template(rf, ctx) { }
const _c1 = function (a0, a1, a2, a3, a4) { return { form: a0, formGroup: a1, index: a2, key: a3, controls: a4 }; };
function NovoControlGroup_ng_container_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_container_7_div_1_ng_template_1_Template, 0, 0, "ng-template", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const control_r55 = ctx.$implicit;
    const index_r56 = ctx.index;
    const ctx_r54 = i0.ɵɵnextContext(2);
    const _r1 = i0.ɵɵreference(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r54.rowTemplate || _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction5(2, _c1, ctx_r54.form, control_r55, index_r56, ctx_r54.key, ctx_r54.controls));
} }
function NovoControlGroup_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, NovoControlGroup_ng_container_7_div_1_Template, 2, 8, "div", 30);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r6.form == null ? null : ctx_r6.form.controls[ctx_r6.key]["controls"]);
} }
function NovoControlGroup_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-automation-id", "novo-control-group-empty-" + ctx_r7.key);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r7.emptyMessage, " ");
} }
function NovoControlGroup_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelementStart(1, "button", 34);
    i0.ɵɵlistener("click", function NovoControlGroup_div_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r59); const ctx_r58 = i0.ɵɵnextContext(); return ctx_r58.onClickAdd(); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", "novo-control-group-bottom-add-" + ctx_r8.key);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.add == null ? null : ctx_r8.add.label, " ");
} }
export var EditState;
(function (EditState) {
    EditState["EDITING"] = "editing";
    EditState["NOT_EDITING"] = "notediting";
})(EditState || (EditState = {}));
export class NovoControlGroup {
    constructor(formUtils, fb, ref, labels) {
        this.formUtils = formUtils;
        this.fb = fb;
        this.ref = ref;
        this.labels = labels;
        this._vertical = false;
        this._stacked = false;
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
        this.editState = EditState.NOT_EDITING;
        this.currentIndex = 0;
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
    onChange(change) {
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
        const control = this.form.controls[this.key];
        const newCtrl = this.buildControl(value);
        if (control) {
            control.push(newCtrl);
        }
        else {
            this.form.addControl(this.key, this.fb.array([newCtrl]));
        }
        this.disabledArray.push({
            state: EditState.EDITING,
            edit: true,
            remove: true,
        });
        this.resetAddRemove();
        if (!value) {
            this.onAdd.emit(newCtrl);
        }
        this.currentIndex++;
        this.ref.markForCheck();
    }
    buildControl(value) {
        const newControls = this.getNewControls(this.controls);
        if (value) {
            this.formUtils.setInitialValues(newControls, value);
        }
        const ctrl = this.formUtils.toFormGroup(newControls);
        return ctrl;
    }
    removeControl(index, emitEvent = true) {
        const control = this.form.controls[this.key];
        if (emitEvent) {
            this.onRemove.emit({ value: control.at(index).value, index });
        }
        control.removeAt(index);
        this.disabledArray = this.disabledArray.filter((value, idx) => idx !== index);
        this.resetAddRemove();
        this.currentIndex--;
        this.ref.markForCheck();
    }
    editControl(index) {
        const control = this.form.controls[this.key];
        const fg = control.at(index);
        fg.enableAllControls();
        this.onEdit.emit({ value: control.at(index).value, index });
    }
    toggle(event) {
        Helpers.swallowEvent(event);
        if (this.collapsible) {
            this.toggled = !this.toggled;
            this.ref.markForCheck();
        }
    }
    clearControls() {
        const control = this.form.controls[this.key];
        if (control) {
            for (let i = control.controls.length; i >= 0; i--) {
                this.removeControl(i, false);
            }
            this.currentIndex = 0;
        }
    }
    checkCanEdit(index) {
        if (this.canEdit) {
            const control = this.form.controls[this.key];
            return this.canEdit(control.at(index).value, index);
        }
        return true;
    }
    checkCanRemove(index) {
        if (this.canRemove) {
            const control = this.form.controls[this.key];
            if (control.at(index)) {
                return this.canRemove(control.at(index).value, index);
            }
            return true;
        }
        return true;
    }
    getNewControls(controls) {
        const ret = [];
        (this.controls || []).forEach((control) => {
            ret.push(new BaseControl(control.__type, control));
        });
        return ret;
    }
}
NovoControlGroup.ɵfac = function NovoControlGroup_Factory(t) { return new (t || NovoControlGroup)(i0.ɵɵdirectiveInject(i1.FormUtils), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i3.NovoLabelService)); };
NovoControlGroup.ɵcmp = i0.ɵɵdefineComponent({ type: NovoControlGroup, selectors: [["novo-control-group"]], inputs: { vertical: "vertical", stacked: "stacked", add: "add", remove: "remove", edit: "edit", collapsible: "collapsible", form: "form", controls: "controls", key: "key", label: "label", description: "description", emptyMessage: "emptyMessage", icon: "icon", initialValue: "initialValue", canEdit: "canEdit", canRemove: "canRemove", rowTemplate: "rowTemplate", columnLabelTemplate: "columnLabelTemplate" }, outputs: { onRemove: "onRemove", onEdit: "onEdit", onAdd: "onAdd", change: "change" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 11, consts: [["class", "novo-section-header", 4, "ngIf"], [1, "novo-control-group-controls"], ["defaultTemplate", ""], ["defaultColumnLabelTemplate", ""], [4, "ngIf"], ["class", "novo-control-group-empty", 4, "ngIf"], ["class", "novo-control-group-footer", 4, "ngIf"], [1, "novo-section-header"], [3, "click"], [3, "ngClass", 4, "ngIf"], ["class", "bhi-next", 3, "toggled", 4, "ngIf"], ["class", "novo-control-group-description", 4, "ngIf"], [3, "ngClass"], [1, "bhi-next"], [1, "novo-control-group-description"], [1, "novo-control-group-control"], [3, "class", "is-label", "max-width", 4, "ngFor", "ngForOf"], ["class", "novo-control-container last", 4, "ngIf"], ["class", "control-group-action", "type", "button", "theme", "icon", "icon", "edit", "index", "-1", 3, "disabled", "click", 4, "ngIf"], ["class", "control-group-action", "type", "button", "theme", "icon", "icon", "delete-o", "index", "-1", 3, "disabled", "click", 4, "ngIf"], [3, "form", "control", "condensed", "change"], [1, "novo-control-container", "last"], ["type", "button", "theme", "icon", "icon", "edit", "index", "-1", 1, "control-group-action", 3, "disabled", "click"], ["type", "button", "theme", "icon", "icon", "delete-o", "index", "-1", 1, "control-group-action", 3, "disabled", "click"], [3, "class", "novo-control-group-control-hidden", "max-width", "column-required", 4, "ngFor", "ngForOf"], ["class", "novo-control-group-control-label last", 4, "ngIf"], [1, "novo-control-group-control-label", "last"], ["class", "novo-control-group-labels", 4, "ngIf"], [1, "novo-control-group-labels"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "novo-control-group-row", 4, "ngFor", "ngForOf"], [1, "novo-control-group-row"], [1, "novo-control-group-empty"], [1, "novo-control-group-footer"], ["type", "button", "theme", "dialogue", "icon", "add-thin", "side", "left", "index", "-1", 3, "click"]], template: function NovoControlGroup_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoControlGroup_h6_0_Template, 7, 7, "h6", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtemplate(2, NovoControlGroup_ng_template_2_Template, 6, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(4, NovoControlGroup_ng_template_4_Template, 3, 3, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(6, NovoControlGroup_ng_container_6_Template, 2, 1, "ng-container", 4);
        i0.ɵɵtemplate(7, NovoControlGroup_ng_container_7_Template, 2, 1, "ng-container", 4);
        i0.ɵɵtemplate(8, NovoControlGroup_div_8_Template, 2, 2, "div", 5);
        i0.ɵɵtemplate(9, NovoControlGroup_div_9_Template, 3, 2, "div", 6);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.label);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("vertical", ctx.vertical)("horizontal", !ctx.vertical)("hidden", ctx.collapsible && !ctx.toggled);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", !ctx.vertical && (ctx.form == null ? null : ctx.form.controls[ctx.key]) && (ctx.form == null ? null : ctx.form.controls[ctx.key]["controls"].length) !== 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.form == null ? null : ctx.form.controls[ctx.key]);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", (ctx.form == null ? null : ctx.form.controls[ctx.key]) && (ctx.form == null ? null : ctx.form.controls[ctx.key]["controls"].length) === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.add);
    } }, encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoControlGroup, [{
        type: Component,
        args: [{
                selector: 'novo-control-group',
                templateUrl: './ControlGroup.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.FormUtils }, { type: i2.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i3.NovoLabelService }]; }, { vertical: [{
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
        }], initialValue: [{
            type: Input
        }], canEdit: [{
            type: Input
        }], canRemove: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbEdyb3VwLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vQ29udHJvbEdyb3VwLnRzIiwiZWxlbWVudHMvZm9ybS9Db250cm9sR3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFLO0FBQ0wsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE1BQU07QUFDTixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7OztJQ25CNUMsd0JBQWtIOzs7SUFBbEYscUNBQWdCO0lBQUMsNkVBQTREOzs7SUFDN0csd0JBQ3VFOzs7SUFEL0IsMENBQXlCO0lBQy9ELGtGQUFnRTs7O0lBR3BFLGlDQUNzRTtJQUFBLFlBQWlCO0lBQUEsaUJBQVE7OztJQUE3RixxRkFBbUU7SUFBQyxlQUFpQjtJQUFqQix5Q0FBaUI7Ozs7SUFSekYsNkJBQ0U7SUFBQSwrQkFDRTtJQURJLDRMQUF3QjtJQUM1QixrRUFBOEc7SUFDOUcsbUVBQ21FO0lBQ25FLDRCQUFv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VyxFQUFFLHFCQUFxQjtnQkFDbEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7cUpBSUssUUFBUTtrQkFEWCxLQUFLO1lBU0YsT0FBTztrQkFEVixLQUFLO1lBVUcsR0FBRztrQkFBWCxLQUFLO1lBR0YsTUFBTTtrQkFEVCxLQUFLO1lBVUYsSUFBSTtrQkFEUCxLQUFLO1lBVUYsV0FBVztrQkFEZCxLQUFLO1lBU0csSUFBSTtrQkFBWixLQUFLO1lBRUcsUUFBUTtrQkFBaEIsS0FBSztZQUVHLEdBQUc7a0JBQVgsS0FBSztZQUVHLEtBQUs7a0JBQWIsS0FBSztZQUVHLFdBQVc7a0JBQW5CLEtBQUs7WUFFRyxZQUFZO2tCQUFwQixLQUFLO1lBR0YsSUFBSTtrQkFEUCxLQUFLO1lBU0csWUFBWTtrQkFBcEIsS0FBSztZQUVHLE9BQU87a0JBQWYsS0FBSztZQUVHLFNBQVM7a0JBQWpCLEtBQUs7WUFFRyxXQUFXO2tCQUFuQixLQUFLO1lBRUcsbUJBQW1CO2tCQUEzQixLQUFLO1lBRUksUUFBUTtrQkFBakIsTUFBTTtZQUNHLE1BQU07a0JBQWYsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUNHLE1BQU07a0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgRm9ybVV0aWxzIH0gZnJvbSAnLi8uLi8uLi91dGlscy9mb3JtLXV0aWxzL0Zvcm1VdGlscyc7XG5pbXBvcnQgeyBCYXNlQ29udHJvbCB9IGZyb20gJy4vY29udHJvbHMvQmFzZUNvbnRyb2wnO1xuLy8gQXBwXG5pbXBvcnQgeyBOb3ZvRm9ybUdyb3VwIH0gZnJvbSAnLi9Ob3ZvRm9ybUdyb3VwJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnIHtcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRWRpdFN0YXRlIHtcbiAgRURJVElORyA9ICdlZGl0aW5nJyxcbiAgTk9UX0VESVRJTkcgPSAnbm90ZWRpdGluZycsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZyB7XG4gIGVkaXQ6IGJvb2xlYW47XG4gIHJlbW92ZTogYm9vbGVhbjtcbiAgc3RhdGU6IEVkaXRTdGF0ZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jb250cm9sLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL0NvbnRyb2xHcm91cC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Db250cm9sR3JvdXAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMge1xuICAvLyBTZXRzIHRoZSBkaXNwbGF5IG9mIHRoZSBncm91cCB0byBlaXRoZXIgYmUgcm93IChkZWZhdWx0KSBvciB2ZXJ0aWNhbCB2aWEgZmxleC1ib3hcbiAgQElucHV0KClcbiAgc2V0IHZlcnRpY2FsKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl92ZXJ0aWNhbCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2KTtcbiAgfVxuICBnZXQgdmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsO1xuICB9XG4gIHByaXZhdGUgX3ZlcnRpY2FsID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBzdGFja2VkKHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdGFja2VkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBzdGFja2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja2VkO1xuICB9XG4gIHByaXZhdGUgX3N0YWNrZWQgPSBmYWxzZTtcblxuICAvLyBIaWRlcy9zaG93cyB0aGUgYWRkIGJ1dHRvbiBmb3IgYWRkaW5nIGEgbmV3IGNvbnRyb2xcbiAgQElucHV0KCkgYWRkOiBOb3ZvQ29udHJvbEdyb3VwQWRkQ29uZmlnO1xuICAvLyBIaWRlL3Nob3dzIHRoZSByZW1vdmUgYnV0dG9uIGZvciByZW1vdmluZyBhIGNvbnRyb2xcbiAgQElucHV0KClcbiAgc2V0IHJlbW92ZSh2OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCByZW1vdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmUgPSBmYWxzZTtcbiAgLy8gSGlkZS9zaG93cyB0aGUgZWRpdCBidXR0b24gZm9yIGVkaXRpbmcgYSBjb250cm9sXG4gIEBJbnB1dCgpXG4gIHNldCBlZGl0KHY6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lZGl0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBlZGl0KCkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0O1xuICB9XG4gIHByaXZhdGUgX2VkaXQgPSBmYWxzZTtcbiAgLy8gQWxsb3dzIHRoZSBjb250cm9sIHRvIGNvbGxhcHNlIG9yIG5vdFxuICBASW5wdXQoKVxuICBzZXQgY29sbGFwc2libGUodjogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbGxhcHNpYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHYpO1xuICB9XG4gIGdldCBjb2xsYXBzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cbiAgcHJpdmF0ZSBfY29sbGFwc2libGUgPSBmYWxzZTtcbiAgLy8gTWFpbiBmb3JtIGdyb3VwXG4gIEBJbnB1dCgpIGZvcm06IE5vdm9Gb3JtR3JvdXA7XG4gIC8vIENvbnRyb2xzIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGNvbnRyb2wgZ3JvdXBcbiAgQElucHV0KCkgY29udHJvbHM6IEJhc2VDb250cm9sW107XG4gIC8vIEtleSBvZiB0aGUgY29udHJvbCBncm91cCAob24gdGhlIG1haW4gZm9ybSlcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XG4gIC8vIExhYmVsIG9mIHRoZSBjb250cm9sIGdyb3VwXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIC8vIERlc2NyaXB0aW9uIG9mIHRoZSBjb250cm9sIGdyb3VwIChvbmx5IHVzZSB3aXRoIHBvc2l0aW9uOmJvdHRvbSBBZGQgYnV0dG9uISlcbiAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZztcbiAgLy8gTWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZXJlIGFyZSBubyBjb250cm9sc1xuICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZztcbiAgLy8gSWNvbiBvZiB0aGUgY29udHJvbCBncm91cCAoY2FuIGhhdmUgYmhpIHByZWZpeCBvciBub3QpXG4gIEBJbnB1dCgpXG4gIHNldCBpY29uKHY6IHN0cmluZykge1xuICAgIHRoaXMuX2ljb24gPSB2ICYmIHYuaW5kZXhPZignYmhpJykgIT09IC0xID8gdiA6IGBiaGktJHt2fWA7XG4gIH1cbiAgZ2V0IGljb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICAvLyBUaGUgaW5pdGlhbCB2YWx1ZSBvYmplY3QsIHdpbGwgY3JlYXRlIHRoZSBmb3JtIHJvd3Mgb2ZmIG9mXG4gIEBJbnB1dCgpIGluaXRpYWxWYWx1ZToge31bXTtcbiAgLy8gQ2FsbGJhY2sgdG8gZGV0ZXJtaW5lIGlmIHRoZSB1c2VyIGNhbiBlZGl0XG4gIEBJbnB1dCgpIGNhbkVkaXQ6IEZ1bmN0aW9uO1xuICAvLyBDYWxsYmFjayB0byBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2FuIGRlbGV0ZVxuICBASW5wdXQoKSBjYW5SZW1vdmU6IEZ1bmN0aW9uO1xuICAvLyBUZW1wbGF0ZSBmb3IgY3VzdG9tIHJvdyByZW5kZXJpbmdcbiAgQElucHV0KCkgcm93VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIC8vIFRlbXBsYXRlIGZvciBjdXN0b20gY29sdW1uIGxhYmVsIHJlbmRlcmluZ1xuICBASW5wdXQoKSBjb2x1bW5MYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBvblJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTsgaW5kZXggfT4oKTtcbiAgQE91dHB1dCgpIG9uRWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyB2YWx1ZTsgaW5kZXggfT4oKTtcbiAgQE91dHB1dCgpIG9uQWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb250cm9sTGFiZWxzOiB7IHZhbHVlOiBzdHJpbmc7IHdpZHRoOiBudW1iZXI7IHJlcXVpcmVkOiBib29sZWFuOyBoaWRkZW4/OiBib29sZWFuOyBrZXk6IHN0cmluZyB9W10gPSBbXTtcbiAgdG9nZ2xlZCA9IGZhbHNlO1xuICBkaXNhYmxlZEFycmF5OiBOb3ZvQ29udHJvbEdyb3VwUm93Q29uZmlnW10gPSBbXTtcbiAgZWRpdFN0YXRlOiBFZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtVXRpbHM6IEZvcm1VdGlscywgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghdGhpcy5rZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm92by1jb250cm9sLWdyb3VwIG11c3QgaGF2ZSB0aGUgW2tleV0gYXR0cmlidXRlIHByb3ZpZGVkIScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBpbml0aWFsVmFsdWVDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuaW5pdGlhbFZhbHVlO1xuXG4gICAgLy8gSWYgaW5pdGlhbCB2YWx1ZSBjaGFuZ2VzLCBjbGVhciB0aGUgY29udHJvbHNcbiAgICBpZiAoaW5pdGlhbFZhbHVlQ2hhbmdlICYmIGluaXRpYWxWYWx1ZUNoYW5nZS5jdXJyZW50VmFsdWUgIT09IGluaXRpYWxWYWx1ZUNoYW5nZS5wcmV2aW91c1ZhbHVlICYmICFpbml0aWFsVmFsdWVDaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuY2xlYXJDb250cm9scygpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBhcnJheSwgYWRkIGEgY29udHJvbCBmb3IgZWFjaCB2YWx1ZVxuICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSAmJiBBcnJheS5pc0FycmF5KHRoaXMuaW5pdGlhbFZhbHVlKSkge1xuICAgICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbFZhbHVlLmZvckVhY2goKHZhbHVlKSA9PiB0aGlzLmFkZE5ld0NvbnRyb2wodmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAvLyBJZiB2YWx1ZSBpcyBhbiBvYmplY3QsIGp1c3QgYWRkIG9uZSBjb250cm9sXG4gICAgICB0aGlzLmFkZE5ld0NvbnRyb2wodGhpcy5pbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICAvLyBJZiB3ZSBhcmUgaG9yaXpvbnRhbCwgZ3JhYiB0aGUgbGFiZWxzIHRvIGhlbHAgd2l0aCBsYXlvdXRcbiAgICBpZiAoIXRoaXMudmVydGljYWwpIHtcbiAgICAgIHRoaXMuY29udHJvbExhYmVscyA9ICh0aGlzLmNvbnRyb2xzIHx8IFtdKS5tYXAoKGNvbnRyb2w6IEJhc2VDb250cm9sKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGNvbnRyb2wubGFiZWwsXG4gICAgICAgICAgd2lkdGg6IGNvbnRyb2wud2lkdGgsXG4gICAgICAgICAgcmVxdWlyZWQ6IGNvbnRyb2wucmVxdWlyZWQsXG4gICAgICAgICAga2V5OiBjb250cm9sLmtleSxcbiAgICAgICAgICBoaWRkZW46IGNvbnRyb2wuaGlkZGVuLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZShjaGFuZ2UpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMpO1xuICB9XG5cbiAgb25DbGlja0FkZCgpIHtcbiAgICB0aGlzLmFkZE5ld0NvbnRyb2woKTtcbiAgICAvLyB0aGlzLmVkaXRTdGF0ZSA9IEVkaXRTdGF0ZS5FRElUSU5HO1xuICB9XG4gIG9uQ2xpY2tDYW5jZWwoKSB7XG4gICAgdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gIH1cbiAgb25DbGlja1NhdmUoKSB7XG4gICAgdGhpcy5kaXNhYmxlZEFycmF5W3RoaXMuY3VycmVudEluZGV4IC0gMV0uc3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgdGhpcy5lZGl0U3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgY29uc3QgY29udHJvbDogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGZnOiBOb3ZvRm9ybUdyb3VwID0gY29udHJvbC5hdCh0aGlzLmN1cnJlbnRJbmRleCAtIDEpIGFzIE5vdm9Gb3JtR3JvdXA7XG4gICAgICBmZy5kaXNhYmxlQWxsQ29udHJvbHMoKTtcbiAgICB9XG4gIH1cblxuICByZXNldEFkZFJlbW92ZSgpIHtcbiAgICB0aGlzLmRpc2FibGVkQXJyYXkuZm9yRWFjaCgoaXRlbTogTm92b0NvbnRyb2xHcm91cFJvd0NvbmZpZywgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgIGl0ZW0uZWRpdCA9IHRoaXMuY2hlY2tDYW5FZGl0KGlkeCk7XG4gICAgICBpdGVtLnJlbW92ZSA9IHRoaXMuY2hlY2tDYW5SZW1vdmUoaWR4KTtcbiAgICAgIGlmICghaXRlbS5lZGl0KSB7XG4gICAgICAgIGl0ZW0uc3RhdGUgPSBFZGl0U3RhdGUuTk9UX0VESVRJTkc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBhZGROZXdDb250cm9sKHZhbHVlPzoge30pIHtcbiAgICBjb25zdCBjb250cm9sOiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICBjb25zdCBuZXdDdHJsOiBOb3ZvRm9ybUdyb3VwID0gdGhpcy5idWlsZENvbnRyb2wodmFsdWUpO1xuICAgIGlmIChjb250cm9sKSB7XG4gICAgICBjb250cm9sLnB1c2gobmV3Q3RybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKHRoaXMua2V5LCB0aGlzLmZiLmFycmF5KFtuZXdDdHJsXSkpO1xuICAgIH1cbiAgICB0aGlzLmRpc2FibGVkQXJyYXkucHVzaCh7XG4gICAgICBzdGF0ZTogRWRpdFN0YXRlLkVESVRJTkcsXG4gICAgICBlZGl0OiB0cnVlLFxuICAgICAgcmVtb3ZlOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMucmVzZXRBZGRSZW1vdmUoKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLm9uQWRkLmVtaXQobmV3Q3RybCk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEluZGV4Kys7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBidWlsZENvbnRyb2wodmFsdWU/OiB7fSk6IE5vdm9Gb3JtR3JvdXAge1xuICAgIGNvbnN0IG5ld0NvbnRyb2xzID0gdGhpcy5nZXROZXdDb250cm9scyh0aGlzLmNvbnRyb2xzKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZm9ybVV0aWxzLnNldEluaXRpYWxWYWx1ZXMobmV3Q29udHJvbHMsIHZhbHVlKTtcbiAgICB9XG4gICAgY29uc3QgY3RybDogTm92b0Zvcm1Hcm91cCA9IHRoaXMuZm9ybVV0aWxzLnRvRm9ybUdyb3VwKG5ld0NvbnRyb2xzKTtcbiAgICByZXR1cm4gY3RybDtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2woaW5kZXg6IG51bWJlciwgZW1pdEV2ZW50ID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNvbnRyb2w6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIHRoaXMub25SZW1vdmUuZW1pdCh7IHZhbHVlOiBjb250cm9sLmF0KGluZGV4KS52YWx1ZSwgaW5kZXggfSk7XG4gICAgfVxuICAgIGNvbnRyb2wucmVtb3ZlQXQoaW5kZXgpO1xuICAgIHRoaXMuZGlzYWJsZWRBcnJheSA9IHRoaXMuZGlzYWJsZWRBcnJheS5maWx0ZXIoKHZhbHVlOiBOb3ZvQ29udHJvbEdyb3VwUm93Q29uZmlnLCBpZHg6IG51bWJlcikgPT4gaWR4ICE9PSBpbmRleCk7XG4gICAgdGhpcy5yZXNldEFkZFJlbW92ZSgpO1xuICAgIHRoaXMuY3VycmVudEluZGV4LS07XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBlZGl0Q29udHJvbChpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgY29udHJvbDogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgY29uc3QgZmcgPSBjb250cm9sLmF0KGluZGV4KSBhcyBOb3ZvRm9ybUdyb3VwO1xuICAgIGZnLmVuYWJsZUFsbENvbnRyb2xzKCk7XG4gICAgdGhpcy5vbkVkaXQuZW1pdCh7IHZhbHVlOiBjb250cm9sLmF0KGluZGV4KS52YWx1ZSwgaW5kZXggfSk7XG4gIH1cblxuICB0b2dnbGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUpIHtcbiAgICAgIHRoaXMudG9nZ2xlZCA9ICF0aGlzLnRvZ2dsZWQ7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyQ29udHJvbHMoKSB7XG4gICAgY29uc3QgY29udHJvbDogRm9ybUFycmF5ID0gdGhpcy5mb3JtLmNvbnRyb2xzW3RoaXMua2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGNvbnRyb2wuY29udHJvbHMubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbnRyb2woaSwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tDYW5FZGl0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jYW5FZGl0KSB7XG4gICAgICBjb25zdCBjb250cm9sOiBGb3JtQXJyYXkgPSB0aGlzLmZvcm0uY29udHJvbHNbdGhpcy5rZXldIGFzIEZvcm1BcnJheTtcbiAgICAgIHJldHVybiB0aGlzLmNhbkVkaXQoY29udHJvbC5hdChpbmRleCkudmFsdWUsIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQ2FuUmVtb3ZlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jYW5SZW1vdmUpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2w6IEZvcm1BcnJheSA9IHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmtleV0gYXMgRm9ybUFycmF5O1xuICAgICAgaWYgKGNvbnRyb2wuYXQoaW5kZXgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhblJlbW92ZShjb250cm9sLmF0KGluZGV4KS52YWx1ZSwgaW5kZXgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXdDb250cm9scyhjb250cm9sczogQmFzZUNvbnRyb2xbXSkge1xuICAgIGNvbnN0IHJldDogQmFzZUNvbnRyb2xbXSA9IFtdO1xuICAgICh0aGlzLmNvbnRyb2xzIHx8IFtdKS5mb3JFYWNoKChjb250cm9sOiBCYXNlQ29udHJvbCkgPT4ge1xuICAgICAgcmV0LnB1c2gobmV3IEJhc2VDb250cm9sKGNvbnRyb2wuX190eXBlLCBjb250cm9sKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RhY2tlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxoNiBjbGFzcz1cIm5vdm8tc2VjdGlvbi1oZWFkZXJcIiAqbmdJZj1cImxhYmVsXCI+XG4gIDxzcGFuIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIFtjbGFzcy5jbGlja2FibGVdPVwiY29sbGFwc2libGVcIj5cbiAgICA8aSAqbmdJZj1cImljb24gJiYgIWNvbGxhcHNpYmxlXCIgW25nQ2xhc3NdPVwiaWNvblwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWljb24tJyArIGtleVwiPjwvaT5cbiAgICA8aSAqbmdJZj1cImNvbGxhcHNpYmxlXCIgY2xhc3M9XCJiaGktbmV4dFwiIFtjbGFzcy50b2dnbGVkXT1cInRvZ2dsZWRcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtY29sbGFwc2UtJyArIGtleVwiPjwvaT5cbiAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1sYWJlbC0nICsga2V5XCI+e3sgbGFiZWwgfX08L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPGxhYmVsIGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJkZXNjcmlwdGlvblwiXG4gICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZGVzY3JpcHRpb24tJyArIGtleVwiPnt7IGRlc2NyaXB0aW9uIH19PC9sYWJlbD5cbjwvaDY+XG48ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWNvbnRyb2xzXCIgW2NsYXNzLnZlcnRpY2FsXT1cInZlcnRpY2FsXCIgW2NsYXNzLmhvcml6b250YWxdPVwiIXZlcnRpY2FsXCJcbiAgW2NsYXNzLmhpZGRlbl09XCJjb2xsYXBzaWJsZSAmJiAhdG9nZ2xlZFwiPlxuXG4gIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWZvcm09XCJmb3JtXCIgbGV0LWtleT1cImtleVwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNvbnRyb2wtZ3JvdXAtY29udHJvbFwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgYyBvZiBjb250cm9sc1wiIGNsYXNzPVwibm92by1jb250cm9sLWNvbnRhaW5lciB7e2Mua2V5fX1cIlxuICAgICAgICBbY2xhc3MuaXMtbGFiZWxdPVwiYy5jb250cm9sVHlwZSA9PT0gJ3JlYWQtb25seSdcIiBbc3R5bGUubWF4LXdpZHRoLnB4XT1cImMud2lkdGhcIj5cbiAgICAgICAgPG5vdm8tY29udHJvbCAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBbZm9ybV09XCIoZm9ybT8uY29udHJvbHMpW2tleV1bJ2NvbnRyb2xzJ11baW5kZXhdXCIgW2NvbnRyb2xdPVwiY1wiXG4gICAgICAgICAgW2NvbmRlbnNlZF09XCIhdmVydGljYWwgfHwgYy5jb250cm9sVHlwZSA9PT0gJ3JlYWQtb25seSdcIj48L25vdm8tY29udHJvbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1jb250YWluZXIgbGFzdFwiICpuZ0lmPVwiZWRpdCAmJiAhdmVydGljYWxcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtZ3JvdXAtYWN0aW9uXCIgW2Rpc2FibGVkXT1cIiFkaXNhYmxlZEFycmF5W2luZGV4XS5lZGl0XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgKm5nSWY9XCJlZGl0ICYmICF2ZXJ0aWNhbFwiIHRoZW1lPVwiaWNvblwiIGljb249XCJlZGl0XCJcbiAgICAgICAgICAoY2xpY2spPVwiZWRpdENvbnRyb2woaW5kZXgpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZWRpdC0nICsga2V5XCIgaW5kZXg9XCItMVwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWNvbnRhaW5lciBsYXN0XCIgKm5nSWY9XCJyZW1vdmUgJiYgIXZlcnRpY2FsXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sLWdyb3VwLWFjdGlvblwiIFtkaXNhYmxlZF09XCIhZGlzYWJsZWRBcnJheVtpbmRleF0ucmVtb3ZlXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgKm5nSWY9XCJyZW1vdmUgJiYgIXZlcnRpY2FsXCIgdGhlbWU9XCJpY29uXCJcbiAgICAgICAgICBpY29uPVwiZGVsZXRlLW9cIiAoY2xpY2spPVwicmVtb3ZlQ29udHJvbChpbmRleClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1kZWxldGUtJyArIGtleVwiXG4gICAgICAgICAgaW5kZXg9XCItMVwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtZ3JvdXAtYWN0aW9uXCIgW2Rpc2FibGVkXT1cIiFkaXNhYmxlZEFycmF5W2luZGV4XS5lZGl0XCIgdHlwZT1cImJ1dHRvblwiICpuZ0lmPVwiZWRpdCAmJiB2ZXJ0aWNhbFwiXG4gICAgICB0aGVtZT1cImljb25cIiBpY29uPVwiZWRpdFwiXG4gICAgICAoY2xpY2spPVwiZWRpdENvbnRyb2woaW5kZXgpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZWRpdC0nICsga2V5XCIgaW5kZXg9XCItMVwiPjwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sLWdyb3VwLWFjdGlvblwiIFtkaXNhYmxlZF09XCIhZGlzYWJsZWRBcnJheVtpbmRleF0ucmVtb3ZlXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAqbmdJZj1cInJlbW92ZSAmJiB2ZXJ0aWNhbFwiIHRoZW1lPVwiaWNvblwiXG4gICAgICBpY29uPVwiZGVsZXRlLW9cIiAoY2xpY2spPVwicmVtb3ZlQ29udHJvbChpbmRleClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1kZWxldGUtJyArIGtleVwiXG4gICAgICBpbmRleD1cIi0xXCI+PC9idXR0b24+XG4gIDwvbmctdGVtcGxhdGU+XG5cbiAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Q29sdW1uTGFiZWxUZW1wbGF0ZSBsZXQtZm9ybT1cImZvcm1cIiBsZXQta2V5PVwia2V5XCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgbGFiZWwgb2YgY29udHJvbExhYmVsc1wiXG4gICAgICBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWxhYmVsIHt7IGxhYmVsLmtleSB9fVwiXG4gICAgICBbY2xhc3Mubm92by1jb250cm9sLWdyb3VwLWNvbnRyb2wtaGlkZGVuXT1cImxhYmVsLmhpZGRlblwiXG4gICAgICBbc3R5bGUubWF4LXdpZHRoLnB4XT1cImxhYmVsLndpZHRoXCIgW2NsYXNzLmNvbHVtbi1yZXF1aXJlZF09XCJsYWJlbC5yZXF1aXJlZFwiPlxuICAgICAgPHNwYW4gW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtbGFiZWwtJyArIGxhYmVsLnZhbHVlXCI+e3sgbGFiZWwudmFsdWUgfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWxhYmVsIGxhc3RcIiAqbmdJZj1cImVkaXRcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtZWRpdC0nICsga2V5XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1jb250cm9sLWxhYmVsIGxhc3RcIiAqbmdJZj1cInJlbW92ZVwiXG4gICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1kZWxldGUtJyArIGtleVwiPjwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmVydGljYWwgJiYgKGZvcm0/LmNvbnRyb2xzKVtrZXldICYmIChmb3JtPy5jb250cm9scylba2V5XVsnY29udHJvbHMnXS5sZW5ndGggIT09IDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWxhYmVsc1wiXG4gICAgICAqbmdJZj1cIiF2ZXJ0aWNhbCAmJiAoZm9ybT8uY29udHJvbHMpW2tleV0gJiYgKGZvcm0/LmNvbnRyb2xzKVtrZXldWydjb250cm9scyddLmxlbmd0aCAhPT0gMFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbHVtbkxhYmVsVGVtcGxhdGUgfHwgZGVmYXVsdENvbHVtbkxhYmVsVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBmb3JtOiBmb3JtLCBrZXk6IGtleSwgY29udHJvbExhYmVsczogY29udHJvbExhYmVscyB9XCI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiKGZvcm0/LmNvbnRyb2xzKVtrZXldXCI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1yb3dcIiAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiAoZm9ybT8uY29udHJvbHMpW2tleV1bJ2NvbnRyb2xzJ107IGxldCBpbmRleCA9IGluZGV4XCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicm93VGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZm9ybTogZm9ybSwgZm9ybUdyb3VwOiBjb250cm9sLCBpbmRleDogaW5kZXgsIGtleToga2V5LCBjb250cm9sczogY29udHJvbHMgfVwiPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPGRpdiBjbGFzcz1cIm5vdm8tY29udHJvbC1ncm91cC1lbXB0eVwiICpuZ0lmPVwiKGZvcm0/LmNvbnRyb2xzKVtrZXldICYmIChmb3JtPy5jb250cm9scylba2V5XVsnY29udHJvbHMnXS5sZW5ndGggPT09IDBcIlxuICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWVtcHR5LScgKyBrZXlcIj5cbiAgICB7eyBlbXB0eU1lc3NhZ2UgfX1cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cImFkZFwiIGNsYXNzPVwibm92by1jb250cm9sLWdyb3VwLWZvb3RlclwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBpY29uPVwiYWRkLXRoaW5cIiBzaWRlPVwibGVmdFwiIChjbGljayk9XCJvbkNsaWNrQWRkKClcIlxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLWNvbnRyb2wtZ3JvdXAtYm90dG9tLWFkZC0nICsga2V5XCIgaW5kZXg9XCItMVwiPlxuICAgICAge3sgYWRkPy5sYWJlbCB9fVxuICAgIDwvYnV0dG9uPlxuICAgIDwhLS0gPGJ1dHRvbiAqbmdJZj1cImVkaXRTdGF0ZT09PSdlZGl0aW5nJ1wiIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cImRpYWxvZ3VlXCIgaWNvbj1cImNsb3NlXCIgc2lkZT1cImxlZnRcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tDYW5jZWwoKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by1jb250cm9sLWdyb3VwLWJvdHRvbS1jYW5jZWwtJyArIGtleVwiIGluZGV4PVwiLTFcIj5cbiAgICAgIHt7ICdjYW5jZWwnIH19XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImVkaXRTdGF0ZT09PSdlZGl0aW5nJ1wiIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cImRpYWxvZ3VlXCIgaWNvbj1cImNoZWNrXCIgc2lkZT1cImxlZnRcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xpY2tTYXZlKClcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tY29udHJvbC1ncm91cC1ib3R0b20tc2F2ZS0nICsga2V5XCIgaW5kZXg9XCItMVwiPlxuICAgICAge3sgYWRkPy5sYWJlbCB9fVxuICAgIDwvYnV0dG9uPiAtLT5cbiAgPC9kaXY+XG48L2Rpdj4iXX0=