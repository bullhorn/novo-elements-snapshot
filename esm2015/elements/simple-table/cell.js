import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, Input, Optional, Renderer2, } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { NovoSelection } from './sort';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "./sort";
import * as i3 from "../form/extras/checkbox/Checkbox";
import * as i4 from "@angular/forms";
import * as i5 from "../../services/novo-label-service";
import * as i6 from "@angular/common";
import * as i7 from "../button/Button";
import * as i8 from "../dropdown/Dropdown";
function NovoSimpleActionCell_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 1);
    i0.ɵɵlistener("click", function NovoSimpleActionCell_ng_container_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.column.onClick(ctx_r2.row); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("icon", ctx_r0.column.icon)("disabled", ctx_r0.isDisabled(ctx_r0.column, ctx_r0.row));
} }
function NovoSimpleActionCell_ng_container_1_item_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "item", 5);
    i0.ɵɵlistener("action", function NovoSimpleActionCell_ng_container_1_item_5_Template_item_action_0_listener() { i0.ɵɵrestoreView(_r7); const option_r5 = ctx.$implicit; const ctx_r6 = i0.ɵɵnextContext(2); return option_r5.onClick(ctx_r6.row); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r4.isDisabled(option_r5, ctx_r4.row));
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("data-automation-id", option_r5.label);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(option_r5.label);
} }
function NovoSimpleActionCell_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "novo-dropdown", 2);
    i0.ɵɵelementStart(2, "button", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "list");
    i0.ɵɵtemplate(5, NovoSimpleActionCell_ng_container_1_item_5_Template, 3, 3, "item", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.column.label || ctx_r1.labels.actions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.column.options);
} }
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoCellDef = CdkCellDef;
export const _NovoHeaderCellDef = CdkHeaderCellDef;
export const _NovoColumnDef = CdkColumnDef;
export const _NovoHeaderCell = CdkHeaderCell;
export const _NovoCell = CdkCell;
export class NovoSimpleCellDef extends _NovoCellDef {
}
NovoSimpleCellDef.ɵfac = function NovoSimpleCellDef_Factory(t) { return ɵNovoSimpleCellDef_BaseFactory(t || NovoSimpleCellDef); };
NovoSimpleCellDef.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleCellDef, selectors: [["", "novoSimpleCellDef", ""]], features: [i0.ɵɵProvidersFeature([{ provide: CdkCellDef, useExisting: NovoSimpleCellDef }]), i0.ɵɵInheritDefinitionFeature] });
const ɵNovoSimpleCellDef_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleCellDef);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleCellDef, [{
        type: Directive,
        args: [{
                selector: '[novoSimpleCellDef]',
                providers: [{ provide: CdkCellDef, useExisting: NovoSimpleCellDef }],
            }]
    }], null, null); })();
export class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
}
NovoSimpleHeaderCellDef.ɵfac = function NovoSimpleHeaderCellDef_Factory(t) { return ɵNovoSimpleHeaderCellDef_BaseFactory(t || NovoSimpleHeaderCellDef); };
NovoSimpleHeaderCellDef.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleHeaderCellDef, selectors: [["", "novoSimpleHeaderCellDef", ""]], features: [i0.ɵɵProvidersFeature([{ provide: CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }]), i0.ɵɵInheritDefinitionFeature] });
const ɵNovoSimpleHeaderCellDef_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleHeaderCellDef);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleHeaderCellDef, [{
        type: Directive,
        args: [{
                selector: '[novoSimpleHeaderCellDef]',
                providers: [{ provide: CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }],
            }]
    }], null, null); })();
export class NovoSimpleColumnDef extends _NovoColumnDef {
    get name() {
        return this._name;
    }
    set name(name) {
        this._setNameInput(name);
    }
    /**
     * This has been extracted to a util because of TS 4 and VE.
     * View Engine doesn't support property rename inheritance.
     * TS 4.0 doesn't allow properties to override accessors or vice-versa.
     * @docs-private
     */
    _setNameInput(value) {
        // If the directive is set without a name (updated programatically), then this setter will
        // trigger with an empty string and should not overwrite the programatically set value.
        if (value) {
            this._name = value;
            this.cssClassFriendlyName = value.replace(/[^a-z0-9_-]/gi, '-');
            this._updateColumnCssClassName();
        }
    }
}
NovoSimpleColumnDef.ɵfac = function NovoSimpleColumnDef_Factory(t) { return ɵNovoSimpleColumnDef_BaseFactory(t || NovoSimpleColumnDef); };
NovoSimpleColumnDef.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleColumnDef, selectors: [["", "novoSimpleColumnDef", ""]], inputs: { name: ["novoSimpleColumnDef", "name"] }, features: [i0.ɵɵProvidersFeature([{ provide: CdkColumnDef, useExisting: NovoSimpleColumnDef }]), i0.ɵɵInheritDefinitionFeature] });
const ɵNovoSimpleColumnDef_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleColumnDef);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleColumnDef, [{
        type: Directive,
        args: [{
                selector: '[novoSimpleColumnDef]',
                providers: [{ provide: CdkColumnDef, useExisting: NovoSimpleColumnDef }],
            }]
    }], null, { name: [{
            type: Input,
            args: ['novoSimpleColumnDef']
        }] }); })();
export class NovoSimpleHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-header-cell');
    }
    ngOnInit() {
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
        }
    }
}
NovoSimpleHeaderCell.ɵfac = function NovoSimpleHeaderCell_Factory(t) { return new (t || NovoSimpleHeaderCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
NovoSimpleHeaderCell.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleHeaderCell, selectors: [["novo-simple-header-cell"]], hostVars: 1, hostBindings: function NovoSimpleHeaderCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, inputs: { column: "column" }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleHeaderCell, [{
        type: Directive,
        args: [{
                selector: 'novo-simple-header-cell',
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }], column: [{
            type: Input
        }] }); })();
export class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-empty-header-cell');
    }
}
NovoSimpleEmptyHeaderCell.ɵfac = function NovoSimpleEmptyHeaderCell_Factory(t) { return new (t || NovoSimpleEmptyHeaderCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
NovoSimpleEmptyHeaderCell.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleEmptyHeaderCell, selectors: [["novo-simple-empty-header-cell"]], hostVars: 1, hostBindings: function NovoSimpleEmptyHeaderCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleEmptyHeaderCell, [{
        type: Directive,
        args: [{
                selector: 'novo-simple-empty-header-cell',
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }] }); })();
export class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer, ref, _selection) {
        super(columnDef, elementRef);
        this._selection = _selection;
        this.role = 'columnheader';
        this.selectAll = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-header-cell');
        this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value) => {
            this.selectAll = value;
            ref.markForCheck();
        });
    }
    ngOnDestroy() {
        this.selectAllSubscription.unsubscribe();
    }
    toggle(value) {
        this._selection.selectAll(value);
    }
}
NovoSimpleCheckboxHeaderCell.ɵfac = function NovoSimpleCheckboxHeaderCell_Factory(t) { return new (t || NovoSimpleCheckboxHeaderCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.NovoSelection, 8)); };
NovoSimpleCheckboxHeaderCell.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSimpleCheckboxHeaderCell, selectors: [["novo-simple-checkbox-header-cell"]], hostVars: 1, hostBindings: function NovoSimpleCheckboxHeaderCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "ngModel", "ngModelChange"]], template: function NovoSimpleCheckboxHeaderCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-checkbox", 0);
        i0.ɵɵlistener("ngModelChange", function NovoSimpleCheckboxHeaderCell_Template_novo_checkbox_ngModelChange_0_listener($event) { return ctx.selectAll = $event; })("ngModelChange", function NovoSimpleCheckboxHeaderCell_Template_novo_checkbox_ngModelChange_0_listener($event) { return ctx.toggle($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngModel", ctx.selectAll);
    } }, directives: [i3.NovoCheckboxElement, i4.NgControlStatus, i4.NgModel], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleCheckboxHeaderCell, [{
        type: Component,
        args: [{
                selector: 'novo-simple-checkbox-header-cell',
                template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`,
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i2.NovoSelection, decorators: [{
                type: Optional
            }] }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }] }); })();
export class NovoSimpleCell extends _NovoCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'gridcell';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-cell');
    }
    ngOnInit() {
        if (this.column.customClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.column.customClass(this.row));
        }
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
            // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
            // this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.column.width - 20}px`);
            // this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.column.width - 20}px`);
            // this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.column.width - 20}px`);
        }
        // else {
        //     // TODO - this inhibits resizing the page after the initial load -- but do we care?!?!
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'min-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'max-width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        //     this.renderer.setStyle(this.spanElement.nativeElement, 'width', `${this.elementRef.nativeElement.offsetWidth - 20}px`);
        // }
    }
    onClick(event) {
        Helpers.swallowEvent(event);
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
        return;
    }
}
NovoSimpleCell.ɵfac = function NovoSimpleCell_Factory(t) { return new (t || NovoSimpleCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
NovoSimpleCell.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSimpleCell, selectors: [["novo-simple-cell"]], hostVars: 1, hostBindings: function NovoSimpleCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, inputs: { row: "row", column: "column" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 3, consts: [[3, "click"], ["span", ""]], template: function NovoSimpleCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0, 1);
        i0.ɵɵlistener("click", function NovoSimpleCell_Template_span_click_0_listener($event) { return ctx.onClick($event); });
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassProp("clickable", !!ctx.column.onClick);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.column.renderer(ctx.row));
    } }, encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleCell, [{
        type: Component,
        args: [{
                selector: 'novo-simple-cell',
                template: ` <span [class.clickable]="!!column.onClick" (click)="onClick($event)" #span>{{ column.renderer(row) }}</span> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }], row: [{
            type: Input
        }], column: [{
            type: Input
        }] }); })();
export class NovoSimpleCheckboxCell extends _NovoCell {
    constructor(columnDef, elementRef, renderer, _selection) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this._selection = _selection;
        this.role = 'gridcell';
        this.selected = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-checkbox-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-checkbox-cell');
        this.selectAllSubscription = _selection.novoSelectAllToggle.subscribe((value) => {
            this.selected = value;
        });
    }
    ngOnInit() {
        this._selection.register(this.row.id || this.index, this.row);
        this.selected = this._selection.state.selectedRows.has(this.row.id || this.index);
    }
    ngOnDestroy() {
        this._selection.deregister(this.row.id || this.index);
        this.selectAllSubscription.unsubscribe();
    }
    toggle(value) {
        this._selection.toggle(this.row.id || this.index, value, this.row);
    }
}
NovoSimpleCheckboxCell.ɵfac = function NovoSimpleCheckboxCell_Factory(t) { return new (t || NovoSimpleCheckboxCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i2.NovoSelection, 8)); };
NovoSimpleCheckboxCell.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSimpleCheckboxCell, selectors: [["novo-simple-checkbox-cell"]], hostVars: 1, hostBindings: function NovoSimpleCheckboxCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, inputs: { row: "row", index: "index" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "ngModel", "ngModelChange"]], template: function NovoSimpleCheckboxCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-checkbox", 0);
        i0.ɵɵlistener("ngModelChange", function NovoSimpleCheckboxCell_Template_novo_checkbox_ngModelChange_0_listener($event) { return ctx.toggle($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngModel", ctx.selected);
    } }, directives: [i3.NovoCheckboxElement, i4.NgControlStatus, i4.NgModel], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleCheckboxCell, [{
        type: Component,
        args: [{
                selector: 'novo-simple-checkbox-cell',
                template: ` <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox> `,
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.NovoSelection, decorators: [{
                type: Optional
            }] }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }], row: [{
            type: Input
        }], index: [{
            type: Input
        }] }); })();
export class NovoSimpleActionCell extends _NovoCell {
    constructor(columnDef, elementRef, renderer, labels) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.labels = labels;
        this.role = 'gridcell';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-action-column-${columnDef.cssClassFriendlyName}`);
    }
    ngOnInit() {
        if (this.column.options) {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-dropdown-cell');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-simple-button-cell');
        }
    }
    isDisabled(check, row) {
        if (check.disabled === true) {
            return true;
        }
        if (check.disabledCheck) {
            return check.disabledCheck(row);
        }
        return false;
    }
}
NovoSimpleActionCell.ɵfac = function NovoSimpleActionCell_Factory(t) { return new (t || NovoSimpleActionCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i5.NovoLabelService)); };
NovoSimpleActionCell.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSimpleActionCell, selectors: [["novo-simple-action-cell"]], hostVars: 1, hostBindings: function NovoSimpleActionCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, inputs: { row: "row", column: "column" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], ["theme", "icon", 3, "icon", "disabled", "click"], ["parentScrollSelector", ".novo-simple-table", "containerClass", "novo-table-dropdown-cell"], ["type", "button", "theme", "dialogue", "icon", "collapse", "inverse", ""], [3, "disabled", "action", 4, "ngFor", "ngForOf"], [3, "disabled", "action"]], template: function NovoSimpleActionCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoSimpleActionCell_ng_container_0_Template, 2, 2, "ng-container", 0);
        i0.ɵɵtemplate(1, NovoSimpleActionCell_ng_container_1_Template, 6, 2, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.column.options);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.column.options);
    } }, directives: [i6.NgIf, i7.NovoButtonElement, i8.NovoDropdownElement, i8.NovoDropdownListElement, i6.NgForOf, i8.NovoItemElement], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleActionCell, [{
        type: Component,
        args: [{
                selector: 'novo-simple-action-cell',
                template: `
    <ng-container *ngIf="!column.options">
      <button theme="icon" [icon]="column.icon" (click)="column.onClick(row)" [disabled]="isDisabled(column, row)"></button>
    </ng-container>
    <ng-container *ngIf="column.options">
      <novo-dropdown parentScrollSelector=".novo-simple-table" containerClass="novo-table-dropdown-cell">
        <button type="button" theme="dialogue" icon="collapse" inverse>{{ column.label || labels.actions }}</button>
        <list>
          <item *ngFor="let option of column.options" (action)="option.onClick(row)" [disabled]="isDisabled(option, row)">
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </item>
        </list>
      </novo-dropdown>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i5.NovoLabelService }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }], row: [{
            type: Input
        }], column: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zaW1wbGUtdGFibGUvY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEcsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFHTCxRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7SUFxT25DLDZCQUNFO0lBQUEsaUNBQXNIO0lBQTVFLDBLQUFTLGlDQUFtQixJQUFDO0lBQXNDLGlCQUFTO0lBQ3hILDBCQUFlOzs7SUFEUSxlQUFvQjtJQUFwQix5Q0FBb0IsMERBQUE7Ozs7SUFNckMsK0JBQ0U7SUFEMEMsbU5BQVUsNkJBQW1CLElBQUM7SUFDeEUsNEJBQStDO0lBQUEsWUFBa0I7SUFBQSxpQkFBTztJQUMxRSxpQkFBTzs7OztJQUZvRSxtRUFBb0M7SUFDdkcsZUFBd0M7SUFBeEMscURBQXdDO0lBQUMsZUFBa0I7SUFBbEIscUNBQWtCOzs7SUFMekUsNkJBQ0U7SUFBQSx3Q0FDRTtJQUFBLGlDQUErRDtJQUFBLFlBQW9DO0lBQUEsaUJBQVM7SUFDNUcsNEJBQ0U7SUFBQSxzRkFDRTtJQUVKLGlCQUFPO0lBQ1QsaUJBQWdCO0lB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QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOytJQUdRLElBQUk7a0JBRFYsV0FBVzttQkFBQyxXQUFXO1lBSWpCLEdBQUc7a0JBRFQsS0FBSztZQUdDLE1BQU07a0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0NlbGwsIENka0NlbGxEZWYsIENka0NvbHVtbkRlZiwgQ2RrSGVhZGVyQ2VsbCwgQ2RrSGVhZGVyQ2VsbERlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbiwgU2ltcGxlVGFibGVBY3Rpb25Db2x1bW5PcHRpb24sIFNpbXBsZVRhYmxlQ29sdW1uIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IE5vdm9TZWxlY3Rpb24gfSBmcm9tICcuL3NvcnQnO1xuXG4vKiogV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTc4NDkgKi9cbmV4cG9ydCBjb25zdCBfTm92b0NlbGxEZWYgPSBDZGtDZWxsRGVmO1xuZXhwb3J0IGNvbnN0IF9Ob3ZvSGVhZGVyQ2VsbERlZiA9IENka0hlYWRlckNlbGxEZWY7XG5leHBvcnQgY29uc3QgX05vdm9Db2x1bW5EZWYgPSBDZGtDb2x1bW5EZWY7XG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJDZWxsID0gQ2RrSGVhZGVyQ2VsbDtcbmV4cG9ydCBjb25zdCBfTm92b0NlbGwgPSBDZGtDZWxsO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b1NpbXBsZUNlbGxEZWZdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtDZWxsRGVmLCB1c2VFeGlzdGluZzogTm92b1NpbXBsZUNlbGxEZWYgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVDZWxsRGVmIGV4dGVuZHMgX05vdm9DZWxsRGVmIHtcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlSGVhZGVyQ2VsbERlZl0nLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka0hlYWRlckNlbGxEZWYsIHVzZUV4aXN0aW5nOiBOb3ZvU2ltcGxlSGVhZGVyQ2VsbERlZiB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlckNlbGxEZWYgZXh0ZW5kcyBfTm92b0hlYWRlckNlbGxEZWYge1xuICAvLyBUT0RPOiBhZGQgZXhwbGljaXQgY29uc3RydWN0b3Jcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9TaW1wbGVDb2x1bW5EZWZdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtDb2x1bW5EZWYsIHVzZUV4aXN0aW5nOiBOb3ZvU2ltcGxlQ29sdW1uRGVmIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlQ29sdW1uRGVmIGV4dGVuZHMgX05vdm9Db2x1bW5EZWYge1xuICBASW5wdXQoJ25vdm9TaW1wbGVDb2x1bW5EZWYnKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NldE5hbWVJbnB1dChuYW1lKTtcbiAgfVxuICAvKipcbiAgICogVGhpcyBoYXMgYmVlbiBleHRyYWN0ZWQgdG8gYSB1dGlsIGJlY2F1c2Ugb2YgVFMgNCBhbmQgVkUuXG4gICAqIFZpZXcgRW5naW5lIGRvZXNuJ3Qgc3VwcG9ydCBwcm9wZXJ0eSByZW5hbWUgaW5oZXJpdGFuY2UuXG4gICAqIFRTIDQuMCBkb2Vzbid0IGFsbG93IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgYWNjZXNzb3JzIG9yIHZpY2UtdmVyc2EuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByb3RlY3RlZCBfc2V0TmFtZUlucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBJZiB0aGUgZGlyZWN0aXZlIGlzIHNldCB3aXRob3V0IGEgbmFtZSAodXBkYXRlZCBwcm9ncmFtYXRpY2FsbHkpLCB0aGVuIHRoaXMgc2V0dGVyIHdpbGxcbiAgICAvLyB0cmlnZ2VyIHdpdGggYW4gZW1wdHkgc3RyaW5nIGFuZCBzaG91bGQgbm90IG92ZXJ3cml0ZSB0aGUgcHJvZ3JhbWF0aWNhbGx5IHNldCB2YWx1ZS5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY3NzQ2xhc3NGcmllbmRseU5hbWUgPSB2YWx1ZS5yZXBsYWNlKC9bXmEtejAtOV8tXS9naSwgJy0nKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUNvbHVtbkNzc0NsYXNzTmFtZSgpO1xuICAgIH1cbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1oZWFkZXItY2VsbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVIZWFkZXJDZWxsPFQ+IGV4dGVuZHMgX05vdm9IZWFkZXJDZWxsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdjb2x1bW5oZWFkZXInO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjb2x1bW46IFNpbXBsZVRhYmxlQ29sdW1uPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWNvbHVtbi1oZWFkZXItJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtaGVhZGVyLWNlbGwnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW4ud2lkdGgpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCBgJHt0aGlzLmNvbHVtbi53aWR0aH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHt0aGlzLmNvbHVtbi53aWR0aH1weGApO1xuICAgIH1cbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1lbXB0eS1oZWFkZXItY2VsbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVFbXB0eUhlYWRlckNlbGwgZXh0ZW5kcyBfTm92b0hlYWRlckNlbGwge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ2NvbHVtbmhlYWRlcic7XG5cbiAgY29uc3RydWN0b3IoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tc2ltcGxlLWVtcHR5LWhlYWRlci1jZWxsJyk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtY2hlY2tib3gtaGVhZGVyLWNlbGwnLFxuICB0ZW1wbGF0ZTogYDxub3ZvLWNoZWNrYm94IFsobmdNb2RlbCldPVwic2VsZWN0QWxsXCIgKG5nTW9kZWxDaGFuZ2UpPVwidG9nZ2xlKCRldmVudClcIj48L25vdm8tY2hlY2tib3g+YCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUNoZWNrYm94SGVhZGVyQ2VsbCBleHRlbmRzIF9Ob3ZvSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcblxuICBwdWJsaWMgc2VsZWN0QWxsOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0QWxsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfc2VsZWN0aW9uOiBOb3ZvU2VsZWN0aW9uLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jaGVja2JveC1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tc2ltcGxlLWNoZWNrYm94LWhlYWRlci1jZWxsJyk7XG5cbiAgICB0aGlzLnNlbGVjdEFsbFN1YnNjcmlwdGlvbiA9IF9zZWxlY3Rpb24ubm92b1NlbGVjdEFsbFRvZ2dsZS5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdEFsbCA9IHZhbHVlO1xuICAgICAgcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0QWxsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uLnNlbGVjdEFsbCh2YWx1ZSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtY2VsbCcsXG4gIHRlbXBsYXRlOiBgIDxzcGFuIFtjbGFzcy5jbGlja2FibGVdPVwiISFjb2x1bW4ub25DbGlja1wiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIiAjc3Bhbj57eyBjb2x1bW4ucmVuZGVyZXIocm93KSB9fTwvc3Bhbj4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVDZWxsPFQ+IGV4dGVuZHMgX05vdm9DZWxsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdncmlkY2VsbCc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJvdzogYW55O1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29sdW1uOiBTaW1wbGVUYWJsZUNvbHVtbjxUPjtcblxuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtY2VsbCcpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbi5jdXN0b21DbGFzcykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jb2x1bW4uY3VzdG9tQ2xhc3ModGhpcy5yb3cpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29sdW1uLndpZHRoKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnLCBgJHt0aGlzLmNvbHVtbi53aWR0aH1weGApO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcbiAgICAgIC8vIFRPRE8gLSB0aGlzIGluaGliaXRzIHJlc2l6aW5nIHRoZSBwYWdlIGFmdGVyIHRoZSBpbml0aWFsIGxvYWQgLS0gYnV0IGRvIHdlIGNhcmU/IT8hXG4gICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbkVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRoIC0gMjB9cHhgKTtcbiAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuRWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGggLSAyMH1weGApO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRoIC0gMjB9cHhgKTtcbiAgICB9XG4gICAgLy8gZWxzZSB7XG4gICAgLy8gICAgIC8vIFRPRE8gLSB0aGlzIGluaGliaXRzIHJlc2l6aW5nIHRoZSBwYWdlIGFmdGVyIHRoZSBpbml0aWFsIGxvYWQgLS0gYnV0IGRvIHdlIGNhcmU/IT8hXG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zcGFuRWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJywgYCR7dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLSAyMH1weGApO1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3BhbkVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gMjB9cHhgKTtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnNwYW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gMjB9cHhgKTtcbiAgICAvLyB9XG4gIH1cblxuICBwdWJsaWMgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICBpZiAodGhpcy5jb2x1bW4ub25DbGljaykge1xuICAgICAgdGhpcy5jb2x1bW4ub25DbGljayh0aGlzLnJvdyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1jaGVja2JveC1jZWxsJyxcbiAgdGVtcGxhdGU6IGAgPG5vdm8tY2hlY2tib3ggW25nTW9kZWxdPVwic2VsZWN0ZWRcIiAobmdNb2RlbENoYW5nZSk9XCJ0b2dnbGUoJGV2ZW50KVwiPjwvbm92by1jaGVja2JveD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUNoZWNrYm94Q2VsbCBleHRlbmRzIF9Ob3ZvQ2VsbCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdncmlkY2VsbCc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJvdzogYW55O1xuICBASW5wdXQoKVxuICBwdWJsaWMgaW5kZXg6IGFueTtcblxuICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RBbGxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIEBPcHRpb25hbCgpIHB1YmxpYyBfc2VsZWN0aW9uOiBOb3ZvU2VsZWN0aW9uKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY2hlY2tib3gtY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tc2ltcGxlLWNoZWNrYm94LWNlbGwnKTtcblxuICAgIHRoaXMuc2VsZWN0QWxsU3Vic2NyaXB0aW9uID0gX3NlbGVjdGlvbi5ub3ZvU2VsZWN0QWxsVG9nZ2xlLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24ucmVnaXN0ZXIodGhpcy5yb3cuaWQgfHwgdGhpcy5pbmRleCwgdGhpcy5yb3cpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3Rpb24uc3RhdGUuc2VsZWN0ZWRSb3dzLmhhcyh0aGlzLnJvdy5pZCB8fCB0aGlzLmluZGV4KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24uZGVyZWdpc3Rlcih0aGlzLnJvdy5pZCB8fCB0aGlzLmluZGV4KTtcbiAgICB0aGlzLnNlbGVjdEFsbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGlvbi50b2dnbGUodGhpcy5yb3cuaWQgfHwgdGhpcy5pbmRleCwgdmFsdWUsIHRoaXMucm93KTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1hY3Rpb24tY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2x1bW4ub3B0aW9uc1wiPlxuICAgICAgPGJ1dHRvbiB0aGVtZT1cImljb25cIiBbaWNvbl09XCJjb2x1bW4uaWNvblwiIChjbGljayk9XCJjb2x1bW4ub25DbGljayhyb3cpXCIgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWQoY29sdW1uLCByb3cpXCI+PC9idXR0b24+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbHVtbi5vcHRpb25zXCI+XG4gICAgICA8bm92by1kcm9wZG93biBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi5ub3ZvLXNpbXBsZS10YWJsZVwiIGNvbnRhaW5lckNsYXNzPVwibm92by10YWJsZS1kcm9wZG93bi1jZWxsXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwiZGlhbG9ndWVcIiBpY29uPVwiY29sbGFwc2VcIiBpbnZlcnNlPnt7IGNvbHVtbi5sYWJlbCB8fCBsYWJlbHMuYWN0aW9ucyB9fTwvYnV0dG9uPlxuICAgICAgICA8bGlzdD5cbiAgICAgICAgICA8aXRlbSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbHVtbi5vcHRpb25zXCIgKGFjdGlvbik9XCJvcHRpb24ub25DbGljayhyb3cpXCIgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWQob3B0aW9uLCByb3cpXCI+XG4gICAgICAgICAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbT5cbiAgICAgICAgPC9saXN0PlxuICAgICAgPC9ub3ZvLWRyb3Bkb3duPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUFjdGlvbkNlbGw8VD4gZXh0ZW5kcyBfTm92b0NlbGwgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ2dyaWRjZWxsJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcm93OiBUO1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29sdW1uOiBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbjxUPjtcblxuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkYXRhLWF1dG9tYXRpb24taWQnLCBgbm92by1hY3Rpb24tY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbi5vcHRpb25zKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtZHJvcGRvd24tY2VsbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbm92by1zaW1wbGUtYnV0dG9uLWNlbGwnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEaXNhYmxlZChjaGVjazogU2ltcGxlVGFibGVBY3Rpb25Db2x1bW48VD4gfCBTaW1wbGVUYWJsZUFjdGlvbkNvbHVtbk9wdGlvbjxUPiwgcm93OiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKGNoZWNrLmRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNoZWNrLmRpc2FibGVkQ2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjay5kaXNhYmxlZENoZWNrKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19