import * as i1 from '@angular/cdk/table';
import { CdkCellDef, CdkHeaderCellDef, CdkColumnDef, CdkHeaderCell, CdkCell, CdkHeaderRowDef, CdkRowDef, CdkHeaderRow, CdkRow, CDK_ROW_TEMPLATE, DataSource, CdkTable, CDK_TABLE_TEMPLATE, _COALESCED_STYLE_SCHEDULER, _CoalescedStyleScheduler, CdkTableModule } from '@angular/cdk/table';
import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Directive, Output, Input, HostBinding, Component, Optional, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import { Helpers, DateUtil, notify } from 'novo-elements/utils';
import * as i3 from 'novo-elements/elements/checkbox';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import * as i4 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1$1 from 'novo-elements/services';
import * as i6 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i7 from 'novo-elements/elements/dropdown';
import { NovoDropdownElement, NovoDropdownModule } from 'novo-elements/elements/dropdown';
import * as i9 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i7$1 from 'novo-elements/elements/common';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { startOfToday, startOfTomorrow } from 'date-fns';
import * as i8 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i3$1 from 'novo-elements/elements/tiles';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';
import * as i6$1 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i4$1 from 'novo-elements/elements/search';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { _VIEW_REPEATER_STRATEGY, _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { of, merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

class ActivityTableRenderers {
    static propertyRenderer(prop) {
        const ret = (data) => {
            // TODO - allow for dots and sub props
            return data[prop];
        };
        return ret;
    }
    static dateRenderer(prop) {
        const ret = (data) => {
            return data[prop] ? new Date(data[prop]).toLocaleDateString() : '';
        };
        return ret;
    }
}

class NovoActivityTableState {
    constructor() {
        this.id = Math.random();
        this.sort = undefined;
        this.filter = undefined;
        this.page = 0;
        this.pageSize = undefined;
        this.globalSearch = undefined;
        this.selectedRows = new Map();
        this.updates = new EventEmitter();
        this.onReset = new EventEmitter();
    }
    get userFiltered() {
        return !!(this.filter || this.sort || this.globalSearch || this.outsideFilter);
    }
    reset(fireUpdate = true, persistUserFilters) {
        if (!persistUserFilters) {
            this.sort = undefined;
            this.globalSearch = undefined;
            this.filter = undefined;
        }
        this.page = 0;
        this.selectedRows.clear();
        this.onReset.emit(true);
        if (fireUpdate) {
            this.updates.emit({
                sort: this.sort,
                filter: this.filter,
                globalSearch: this.globalSearch,
            });
        }
    }
}
NovoActivityTableState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NovoActivityTableState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableState });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableState, decorators: [{
            type: Injectable
        }] });

class NovoSortFilter {
    constructor(state) {
        this.state = state;
    }
    filter(id, value, transform) {
        let filter;
        if (!Helpers.isBlank(value)) {
            filter = { id, value, transform };
        }
        else {
            filter = undefined;
        }
        this.state.filter = filter;
        this.state.reset(false, true);
        this.state.updates.next({ filter, sort: this.state.sort });
    }
    sort(id, value, transform) {
        const sort = { id, value, transform };
        this.state.sort = sort;
        this.state.reset(false, true);
        this.state.updates.next({ sort, filter: this.state.filter });
    }
}
NovoSortFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSortFilter, deps: [{ token: NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Directive });
NovoSortFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSortFilter, selector: "[novoSortFilter]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSortFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSortFilter]',
                }]
        }], ctorParameters: function () { return [{ type: NovoActivityTableState }]; } });
class NovoSelection {
    constructor(state) {
        this.state = state;
        this.novoSelectAllToggle = new EventEmitter();
        this.allRows = new Map();
    }
    register(id, row) {
        this.allRows.set(id, row);
    }
    deregister(id) {
        this.allRows.delete(id);
        this.state.selectedRows.delete(id);
        clearTimeout(this.throttleTimeout);
        this.throttleTimeout = setTimeout(() => {
            if (this.state.selectedRows.size === 0) {
                this.novoSelectAllToggle.emit(false);
            }
        });
    }
    ngOnDestroy() {
        this.allRows.clear();
        this.state.selectedRows.clear();
    }
    toggle(id, selected, row) {
        if (selected) {
            this.state.selectedRows.set(id, row);
        }
        else {
            this.state.selectedRows.delete(id);
        }
    }
    selectAll(value) {
        if (value) {
            this.state.selectedRows = new Map(this.allRows);
        }
        else {
            this.state.selectedRows.clear();
        }
        this.novoSelectAllToggle.emit(value);
    }
}
NovoSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelection, deps: [{ token: NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Directive });
NovoSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSelection, selector: "[novoSelection]", outputs: { novoSelectAllToggle: "novoSelectAllToggle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSelection]',
                }]
        }], ctorParameters: function () { return [{ type: NovoActivityTableState }]; }, propDecorators: { novoSelectAllToggle: [{
                type: Output
            }] } });

/** Workaround for https://github.com/angular/angular/issues/17849 */
const _NovoCellDef = CdkCellDef;
const _NovoHeaderCellDef = CdkHeaderCellDef;
const _NovoColumnDef = CdkColumnDef;
const _NovoHeaderCell = CdkHeaderCell;
const _NovoCell = CdkCell;
class NovoSimpleCellDef extends _NovoCellDef {
}
NovoSimpleCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleCellDef, selector: "[novoSimpleCellDef]", providers: [{ provide: CdkCellDef, useExisting: NovoSimpleCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleCellDef]',
                    providers: [{ provide: CdkCellDef, useExisting: NovoSimpleCellDef }],
                }]
        }] });
class NovoSimpleHeaderCellDef extends _NovoHeaderCellDef {
}
NovoSimpleHeaderCellDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderCellDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleHeaderCellDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleHeaderCellDef, selector: "[novoSimpleHeaderCellDef]", providers: [{ provide: CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderCellDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleHeaderCellDef]',
                    providers: [{ provide: CdkHeaderCellDef, useExisting: NovoSimpleHeaderCellDef }],
                }]
        }] });
class NovoSimpleColumnDef extends _NovoColumnDef {
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
NovoSimpleColumnDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleColumnDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleColumnDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleColumnDef, selector: "[novoSimpleColumnDef]", inputs: { name: ["novoSimpleColumnDef", "name"] }, providers: [{ provide: CdkColumnDef, useExisting: NovoSimpleColumnDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleColumnDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleColumnDef]',
                    providers: [{ provide: CdkColumnDef, useExisting: NovoSimpleColumnDef }],
                }]
        }], propDecorators: { name: [{
                type: Input,
                args: ['novoSimpleColumnDef']
            }] } });
class NovoSimpleHeaderCell extends _NovoHeaderCell {
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
NovoSimpleHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleHeaderCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleHeaderCell, selector: "novo-simple-header-cell", inputs: { column: "column" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-simple-header-cell',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], column: [{
                type: Input
            }] } });
class NovoSimpleEmptyHeaderCell extends _NovoHeaderCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.role = 'columnheader';
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-simple-empty-header-cell');
    }
}
NovoSimpleEmptyHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleEmptyHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleEmptyHeaderCell.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleEmptyHeaderCell, selector: "novo-simple-empty-header-cell", host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleEmptyHeaderCell, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-simple-empty-header-cell',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
class NovoSimpleCheckboxHeaderCell extends _NovoHeaderCell {
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
NovoSimpleCheckboxHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCheckboxHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: NovoSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleCheckboxHeaderCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleCheckboxHeaderCell, selector: "novo-simple-checkbox-header-cell", host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`, isInline: true, components: [{ type: i3.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCheckboxHeaderCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-checkbox-header-cell',
                    template: `<novo-checkbox [(ngModel)]="selectAll" (ngModelChange)="toggle($event)"></novo-checkbox>`,
                }]
        }], ctorParameters: function () {
        return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: NovoSelection, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
class NovoSimpleCell extends _NovoCell {
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
NovoSimpleCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleCell, selector: "novo-simple-cell", inputs: { row: "row", column: "column" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: ` <span [class.clickable]="!!column.onClick" (click)="onClick($event)" #span>{{ column.renderer(row) }}</span> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-cell',
                    template: ` <span [class.clickable]="!!column.onClick" (click)="onClick($event)" #span>{{ column.renderer(row) }}</span> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }], column: [{
                type: Input
            }] } });
class NovoSimpleCheckboxCell extends _NovoCell {
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
NovoSimpleCheckboxCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCheckboxCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NovoSelection, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleCheckboxCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleCheckboxCell, selector: "novo-simple-checkbox-cell", inputs: { row: "row", index: "index" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: ` <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox> `, isInline: true, components: [{ type: i3.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCheckboxCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-checkbox-cell',
                    template: ` <novo-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></novo-checkbox> `,
                }]
        }], ctorParameters: function () {
        return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NovoSelection, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }], index: [{
                type: Input
            }] } });
class NovoSimpleActionCell extends _NovoCell {
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
NovoSimpleActionCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleActionCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1$1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleActionCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleActionCell, selector: "novo-simple-action-cell", inputs: { row: "row", column: "column" }, host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: `
    <ng-container *ngIf="!column.options">
      <novo-button theme="icon" [icon]="column.icon" (click)="column.onClick(row)" [disabled]="isDisabled(column, row)"></novo-button>
    </ng-container>
    <ng-container *ngIf="column.options">
      <novo-dropdown parentScrollSelector=".novo-simple-table" containerClass="novo-table-dropdown-cell">
        <novo-button type="button" theme="dialogue" icon="collapse" inverse>{{ column.label || labels.actions }}</novo-button>
        <list>
          <item *ngFor="let option of column.options" (action)="option.onClick(row)" [disabled]="isDisabled(option, row)">
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </item>
        </list>
      </novo-dropdown>
    </ng-container>
  `, isInline: true, components: [{ type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i7.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i7.NovoDropdownListElement, selector: "list" }, { type: i7.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleActionCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-action-cell',
                    template: `
    <ng-container *ngIf="!column.options">
      <novo-button theme="icon" [icon]="column.icon" (click)="column.onClick(row)" [disabled]="isDisabled(column, row)"></novo-button>
    </ng-container>
    <ng-container *ngIf="column.options">
      <novo-dropdown parentScrollSelector=".novo-simple-table" containerClass="novo-table-dropdown-cell">
        <novo-button type="button" theme="dialogue" icon="collapse" inverse>{{ column.label || labels.actions }}</novo-button>
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
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$1.NovoLabelService }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], row: [{
                type: Input
            }], column: [{
                type: Input
            }] } });

class NovoSimpleFilterFocus {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        this.element.nativeElement.focus();
    }
}
NovoSimpleFilterFocus.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleFilterFocus, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleFilterFocus.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleFilterFocus, selector: "[novoSimpleFilterFocus]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleFilterFocus, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleFilterFocus]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
class NovoSimpleCellHeader {
    constructor(changeDetectorRef, labels, state, _sort, _cdkColumnDef) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._sort = _sort;
        this._cdkColumnDef = _cdkColumnDef;
        this.icon = 'sortable';
        this.filterActive = false;
        this.sortActive = false;
        this.showCustomRange = false;
        this._rerenderSubscription = state.updates.subscribe((change) => {
            if (change.sort && change.sort.id === this.id) {
                this.icon = `sort-${change.sort.value}`;
                this.sortActive = true;
            }
            else {
                this.icon = 'sortable';
                this.sortActive = false;
            }
            if (change.filter && change.filter.id === this.id) {
                this.filterActive = true;
                this.filter = change.filter.value;
            }
            else {
                this.filterActive = false;
                this.filter = undefined;
            }
            changeDetectorRef.markForCheck();
        });
    }
    get config() {
        return this._config;
    }
    set config(v) {
        if (!v) {
            this._config = {
                sortable: false,
                filterable: false,
                filterConfig: {
                    type: 'text',
                },
            };
        }
        else {
            this._config = {
                sortable: coerceBooleanProperty(v.sortable),
                filterable: coerceBooleanProperty(v.filterable),
                transforms: v.transforms || {},
                filterConfig: v.filterConfig || {
                    type: 'text',
                },
            };
            if (this._config.filterConfig.type === 'date' && !this._config.filterConfig.options) {
                this._config.filterConfig.options = this.getDefaultDateFilterOptions();
            }
        }
    }
    ngOnInit() {
        if (this._cdkColumnDef) {
            this.id = this._cdkColumnDef.name;
        }
        if (this.defaultSort && this.id === this.defaultSort.id) {
            this.icon = `sort-${this.defaultSort.value}`;
            this.sortActive = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        this._rerenderSubscription.unsubscribe();
    }
    sort() {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            this.direction = this.getNextSortDirection(this.direction);
            this._sort.sort(this.id, this.direction, this._config.transforms.sort);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    toggleCustomRange(event, value) {
        Helpers.swallowEvent(event);
        this.showCustomRange = value;
        this.changeDetectorRef.markForCheck();
        this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
    }
    filterData(filter) {
        let actualFilter = filter;
        if (this.config.filterConfig.type === 'date' && filter) {
            this.activeDateFilter = filter.label || this.labels.customDateRange;
            if (filter.startDate && filter.endDate) {
                actualFilter = {
                    min: DateUtil.startOfDay(filter.startDate.date),
                    max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(filter.endDate.date), 1)),
                };
            }
            else {
                actualFilter = {
                    min: filter.min ? DateUtil.addDays(startOfToday(), filter.min) : startOfToday(),
                    max: filter.max ? DateUtil.addDays(startOfTomorrow(), filter.max) : startOfTomorrow(),
                };
            }
        }
        if (actualFilter && actualFilter.hasOwnProperty('value')) {
            actualFilter = filter.value;
        }
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }
        this.changeTimeout = setTimeout(() => {
            if (actualFilter === '') {
                actualFilter = undefined;
            }
            this._sort.filter(this.id, actualFilter, this.config.transforms.filter);
            this.changeDetectorRef.markForCheck();
        }, 300);
    }
    clearFilter() {
        this.filter = undefined;
        this.activeDateFilter = undefined;
        this.filterData();
    }
    getNextSortDirection(direction) {
        if (!direction) {
            return 'asc';
        }
        if (direction === 'asc') {
            return 'desc';
        }
        return 'asc';
    }
    getDefaultDateFilterOptions() {
        const opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 },
        ];
        return opts;
    }
}
NovoSimpleCellHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCellHeader, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }, { token: NovoActivityTableState }, { token: NovoSortFilter, optional: true }, { token: i1.CdkColumnDef, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleCellHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleCellHeader, selector: "[novo-simple-cell-config]", inputs: { defaultSort: "defaultSort", config: ["novo-simple-cell-config", "config"] }, viewQueries: [{ propertyName: "dropdown", first: true, predicate: NovoDropdownElement, descendants: true }], ngImport: i0, template: `
    <label (click)="sort()" data-automation-id="novo-activity-table-label" [class.sort-disabled]="!config.sortable">
      <ng-content></ng-content>
    </label>
    <div>
      <novo-button
        *ngIf="config.sortable"
        theme="icon"
        [icon]="icon"
        (click)="sort()"
        [class.active]="sortActive"
        data-automation-id="novo-activity-table-sort"
      ></novo-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-simple-table"
        containerClass="simple-table-dropdown"
        data-automation-id="novo-activity-table-filter"
      >
        <novo-button type="button" theme="icon" icon="filter" [class.active]="filterActive"></novo-button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <novo-button
            theme="dialogue"
            color="negative"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter"
            data-automation-id="novo-activity-table-filter-clear"
          >
            {{ labels.clear }}
          </novo-button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <novo-optgroup *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <novo-option
                [class.active]="activeDateFilter === option.label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-activity-table-filter-' + option.label"
              >
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </novo-option>
            </ng-container>
            <novo-option
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </novo-option>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'select'">
            <novo-option
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-activity-table-filter-' + (option?.label || option)"
            >
              <span>{{ option?.label || option }}</span>
              <i class="bhi-check" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </novo-option>
          </novo-optgroup>
          <novo-optgroup *ngSwitchDefault>
            <novo-option class="filter-search" keepOpen>
              <input
                type="text"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                novoSimpleFilterFocus
                data-automation-id="novo-activity-table-filter-input"
              />
            </novo-option>
          </novo-optgroup>
        </ng-container>
      </novo-dropdown>
    </div>
  `, isInline: true, components: [{ type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i7.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i7$1.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i7$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i8.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i9.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i9.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i9.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: NovoSimpleFilterFocus, selector: "[novoSimpleFilterFocus]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleCellHeader, decorators: [{
            type: Component,
            args: [{
                    selector: '[novo-simple-cell-config]',
                    template: `
    <label (click)="sort()" data-automation-id="novo-activity-table-label" [class.sort-disabled]="!config.sortable">
      <ng-content></ng-content>
    </label>
    <div>
      <novo-button
        *ngIf="config.sortable"
        theme="icon"
        [icon]="icon"
        (click)="sort()"
        [class.active]="sortActive"
        data-automation-id="novo-activity-table-sort"
      ></novo-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-simple-table"
        containerClass="simple-table-dropdown"
        data-automation-id="novo-activity-table-filter"
      >
        <novo-button type="button" theme="icon" icon="filter" [class.active]="filterActive"></novo-button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <novo-button
            theme="dialogue"
            color="negative"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter"
            data-automation-id="novo-activity-table-filter-clear"
          >
            {{ labels.clear }}
          </novo-button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <novo-optgroup *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <novo-option
                [class.active]="activeDateFilter === option.label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-activity-table-filter-' + option.label"
              >
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </novo-option>
            </ng-container>
            <novo-option
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </novo-option>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'select'">
            <novo-option
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-activity-table-filter-' + (option?.label || option)"
            >
              <span>{{ option?.label || option }}</span>
              <i class="bhi-check" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </novo-option>
          </novo-optgroup>
          <novo-optgroup *ngSwitchDefault>
            <novo-option class="filter-search" keepOpen>
              <input
                type="text"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                novoSimpleFilterFocus
                data-automation-id="novo-activity-table-filter-input"
              />
            </novo-option>
          </novo-optgroup>
        </ng-container>
      </novo-dropdown>
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }, { type: NovoActivityTableState }, { type: NovoSortFilter, decorators: [{
                        type: Optional
                    }] }, { type: i1.CdkColumnDef, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { dropdown: [{
                type: ViewChild,
                args: [NovoDropdownElement]
            }], defaultSort: [{
                type: Input
            }], config: [{
                type: Input,
                args: ['novo-simple-cell-config']
            }] } });

const DEFAULT_PAGE_SIZE = 50;
class NovoSimpleTablePagination {
    constructor(changeDetectorRef, labels, state) {
        this.changeDetectorRef = changeDetectorRef;
        this.labels = labels;
        this.state = state;
        this._page = 0;
        this._length = 0;
        this._pageSizeOptions = [];
        this.pageChange = new EventEmitter();
        if (state && state.onReset) {
            this.resetSubscription = this.state.onReset.subscribe((clear) => {
                if (clear) {
                    this.page = 0;
                    this.changeDetectorRef.markForCheck();
                }
            });
        }
    }
    get page() {
        return this._page;
    }
    set page(page) {
        this._page = page;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.page = this._page;
    }
    get length() {
        return this._length;
    }
    set length(length) {
        this._length = length;
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(pageSize) {
        this._pageSize = pageSize;
        this.updateDisplayedPageSizeOptions();
        this.state.pageSize = this._pageSize;
    }
    get pageSizeOptions() {
        return this._pageSizeOptions;
    }
    set pageSizeOptions(pageSizeOptions) {
        this._pageSizeOptions = pageSizeOptions;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnInit() {
        this._initialized = true;
        this.updateDisplayedPageSizeOptions();
    }
    ngOnDestroy() {
        this.resetSubscription.unsubscribe();
    }
    nextPage() {
        if (!this.hasNextPage()) {
            return;
        }
        this.page++;
        this.emitPageEvent();
    }
    previousPage() {
        if (!this.hasPreviousPage()) {
            return;
        }
        this.page--;
        this.emitPageEvent();
    }
    hasPreviousPage() {
        return this.page >= 1 && this.pageSize !== 0;
    }
    hasNextPage() {
        const numberOfPages = Math.ceil(this.length / this.pageSize) - 1;
        return this.page < numberOfPages && this.pageSize !== 0;
    }
    changePageSize(pageSize) {
        this.page = 0;
        this.pageSize = pageSize;
        this.emitPageEvent();
    }
    updateDisplayedPageSizeOptions() {
        if (!this._initialized) {
            return;
        }
        if (!this.pageSize) {
            this._pageSize = this.pageSizeOptions.length !== 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
        }
        this.displayedPageSizeOptions = this.pageSizeOptions.slice();
        if (this.displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
            this.displayedPageSizeOptions.push(this.pageSize);
        }
        this.displayedPageSizeOptions.sort((a, b) => a - b);
        this.changeDetectorRef.markForCheck();
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
    }
    emitPageEvent() {
        const event = {
            page: this.page,
            pageSize: this.pageSize,
            length: this.length,
        };
        this.pageChange.next(event);
        this.state.page = this.page;
        this.state.pageSize = this.pageSize;
        this.longRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, false);
        this.shortRangeLabel = this.labels.getRangeText(this.page, this.pageSize, this.length, true);
        this.state.updates.next(event);
    }
}
NovoSimpleTablePagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleTablePagination, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NovoLabelService }, { token: NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Component });
NovoSimpleTablePagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleTablePagination, selector: "novo-simple-table-pagination", inputs: { page: "page", length: "length", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: `
    <div class="novo-simple-table-pagination-size">
      <novo-tiles
        *ngIf="displayedPageSizeOptions.length > 1"
        [(ngModel)]="pageSize"
        [options]="displayedPageSizeOptions"
        (onChange)="changePageSize($event)"
        data-automation-id="novo-simple-table-pagination-tiles"
      >
      </novo-tiles>
      <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
    </div>

    <div class="novo-simple-table-range-label-long" data-automation-id="novo-simple-table-pagination-range-label-long">
      {{ longRangeLabel }}
    </div>
    <div class="novo-simple-table-range-label-short" data-automation-id="novo-simple-table-pagination-range-label-short">
      {{ shortRangeLabel }}
    </div>

    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-previous"
      (click)="previousPage()"
      icon="previous"
      side="left"
      [disabled]="!hasPreviousPage()"
      data-automation-id="novo-simple-table-pagination-previous"
    >
      <span>{{ labels.previous }}</span>
    </novo-button>
    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-next"
      (click)="nextPage()"
      icon="next"
      side="right"
      [disabled]="!hasNextPage()"
      data-automation-id="novo-simple-table-pagination-next"
    >
      <span>{{ labels.next }}</span>
    </novo-button>
  `, isInline: true, components: [{ type: i3$1.NovoTilesElement, selector: "novo-tiles", inputs: ["name", "options", "required", "controlDisabled"], outputs: ["onChange", "onSelectedOptionClick", "onDisabledOptionClick"] }, { type: i6.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleTablePagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-table-pagination',
                    template: `
    <div class="novo-simple-table-pagination-size">
      <novo-tiles
        *ngIf="displayedPageSizeOptions.length > 1"
        [(ngModel)]="pageSize"
        [options]="displayedPageSizeOptions"
        (onChange)="changePageSize($event)"
        data-automation-id="novo-simple-table-pagination-tiles"
      >
      </novo-tiles>
      <div *ngIf="displayedPageSizeOptions.length <= 1">{{ pageSize }}</div>
    </div>

    <div class="novo-simple-table-range-label-long" data-automation-id="novo-simple-table-pagination-range-label-long">
      {{ longRangeLabel }}
    </div>
    <div class="novo-simple-table-range-label-short" data-automation-id="novo-simple-table-pagination-range-label-short">
      {{ shortRangeLabel }}
    </div>

    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-previous"
      (click)="previousPage()"
      icon="previous"
      side="left"
      [disabled]="!hasPreviousPage()"
      data-automation-id="novo-simple-table-pagination-previous"
    >
      <span>{{ labels.previous }}</span>
    </novo-button>
    <novo-button
      theme="dialogue"
      type="button"
      class="novo-simple-table-pagination-navigation-next"
      (click)="nextPage()"
      icon="next"
      side="right"
      [disabled]="!hasNextPage()"
      data-automation-id="novo-simple-table-pagination-next"
    >
      <span>{{ labels.next }}</span>
    </novo-button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1$1.NovoLabelService }, { type: NovoActivityTableState }]; }, propDecorators: { page: [{
                type: Input
            }], length: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageChange: [{
                type: Output
            }] } });

/** Workaround for https://github.com/angular/angular/issues/17849 */
const _NovoHeaderRowDef = CdkHeaderRowDef;
const _NovoCdkRowDef = CdkRowDef;
const _NovoHeaderRow = CdkHeaderRow;
const _NovoRow = CdkRow;
class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
}
NovoSimpleHeaderRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleHeaderRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleHeaderRowDef, selector: "[novoSimpleHeaderRowDef]", inputs: { columns: ["novoSimpleHeaderRowDef", "columns"] }, providers: [{ provide: CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }],
                }]
        }], propDecorators: { columns: [{
                type: Input,
                args: ['novoSimpleHeaderRowDef']
            }] } });
class NovoSimpleRowDef extends _NovoCdkRowDef {
}
NovoSimpleRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoSimpleRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleRowDef, selector: "[novoSimpleRowDef]", inputs: { columns: ["novoSimpleRowDefColumns", "columns"] }, providers: [{ provide: CdkRowDef, useExisting: NovoSimpleRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSimpleRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: NovoSimpleRowDef }],
                }]
        }], propDecorators: { columns: [{
                type: Input,
                args: ['novoSimpleRowDefColumns']
            }] } });
class NovoSimpleHeaderRow extends _NovoHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-simple-header-row';
        this.role = 'row';
    }
}
NovoSimpleHeaderRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoSimpleHeaderRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleHeaderRow, selector: "novo-simple-header-row", host: { properties: { "class": "this.rowClass", "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, directives: [{ type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleHeaderRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-header-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
class NovoSimpleRow extends _NovoRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-simple-row';
        this.role = 'row';
    }
}
NovoSimpleRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoSimpleRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoSimpleRow, selector: "novo-simple-row", host: { properties: { "class": "this.rowClass", "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, directives: [{ type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-simple-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });

class RemoteActivityTableService {
}
class StaticActivityTableService {
    constructor(data = []) {
        this.data = data;
    }
    getTableResults(sort, filter, page = 0, pageSize, globalSearch, outsideFilter) {
        let ret = Helpers.deepClone(this.data);
        if (ret.length !== 0) {
            if (globalSearch) {
                ret = ret.filter((item) => Object.keys(item).some((key) => `${item[key]}`.toLowerCase().includes(globalSearch.toLowerCase())));
            }
            if (filter) {
                const value = Helpers.isString(filter.value) ? filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : filter.value;
                ret = ret.filter(Helpers.filterByField(filter.id, value));
            }
            if (sort) {
                ret = ret.sort(Helpers.sortByField(sort.id, sort.value === 'desc'));
            }
            if (!Helpers.isBlank(page) && !Helpers.isBlank(pageSize)) {
                ret = ret.slice(page * pageSize, (page + 1) * pageSize);
            }
        }
        return of({ results: ret, total: this.data.length });
    }
}
class ActivityTableDataSource extends DataSource {
    constructor(tableService, state, ref) {
        super();
        this.tableService = tableService;
        this.state = state;
        this.ref = ref;
        this.total = 0;
        this.current = 0;
        this.loading = false;
        this.pristine = true;
    }
    get totallyEmpty() {
        return this.total === 0;
    }
    get currentlyEmpty() {
        return this.current === 0;
    }
    connect() {
        const displayDataChanges = [this.state.updates];
        return merge(...displayDataChanges).pipe(startWith(null), switchMap(() => {
            this.pristine = false;
            this.loading = true;
            return this.tableService.getTableResults(this.state.sort, this.state.filter, this.state.page, this.state.pageSize, this.state.globalSearch, this.state.outsideFilter);
        }), map((data) => {
            this.loading = false;
            this.total = data.total;
            this.current = data.results.length;
            setTimeout(() => {
                this.ref.markForCheck();
            });
            return data.results;
        }), catchError((error) => {
            console.error(error); // tslint: disable-line
            this.loading = false;
            return of(null);
        }));
    }
    disconnect() { }
}

class NovoTable extends CdkTable {
}
NovoTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTable, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTable, selector: "novo-simple-table", usesInheritance: true, ngImport: i0, template: "\n  <ng-content select=\"caption\"></ng-content>\n  <ng-content select=\"colgroup, col\"></ng-content>\n  <ng-container headerRowOutlet></ng-container>\n  <ng-container rowOutlet></ng-container>\n  <ng-container noDataRowOutlet></ng-container>\n  <ng-container footerRowOutlet></ng-container>\n", isInline: true, styles: ["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-activity-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}novo-simple-table{display:block;min-height:300px;flex:1}novo-simple-table.empty{min-height:52px;overflow:hidden;max-height:52px}novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-checkbox-cell{background-color:#f4f4f4}novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-checkbox-cell{background-color:#4a89dc26}novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-checkbox-cell{background-color:#fff}novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-checkbox-cell{background-color:#4a89dc26}.novo-simple-row,.novo-simple-header-row{display:flex;flex-direction:row;flex-wrap:no-wrap}.novo-simple-row .novo-simple-header-cell,.novo-simple-row novo-simple-empty-header-cell,.novo-simple-row .novo-simple-checkbox-header-cell,.novo-simple-header-row .novo-simple-header-cell,.novo-simple-header-row novo-simple-empty-header-cell,.novo-simple-header-row .novo-simple-checkbox-header-cell{border-bottom:1px solid #f7f7f7}.novo-simple-cell,.novo-simple-header-cell{min-width:200px;padding:10px;flex:1}.novo-simple-cell>span,.novo-simple-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis}.novo-simple-cell novo-dropdown,.novo-simple-header-cell novo-dropdown{display:inline-block}.novo-simple-cell button.active,.novo-simple-header-cell button.active{color:#4a89dc}.novo-simple-cell.clickable,.novo-simple-header-cell.clickable{cursor:pointer;color:#39d}.novo-simple-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column}.novo-simple-header-cell{border-left:1px solid #f7f7f7;white-space:nowrap;display:flex;align-items:center}.novo-simple-header-cell+novo-simple-empty-header-cell{border-left:none}.novo-simple-header-cell>label{display:inline-block;padding-right:10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.novo-simple-header-cell>label.sort-disabled{cursor:default}.novo-simple-header-cell>div{width:60px}.novo-simple-header-cell novo-dropdown[side=right]{display:inline-block}novo-simple-empty-header-cell.button-header-cell{min-width:40px}novo-simple-empty-header-cell.dropdown-header-cell{min-width:98px}.novo-simple-button-cell,.novo-simple-dropdown-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-simple-button-cell novo-dropdown button,.novo-simple-dropdown-cell novo-dropdown button{padding:5px}.novo-simple-button-cell novo-dropdown button:hover,.novo-simple-button-cell novo-dropdown button:active,.novo-simple-button-cell novo-dropdown button:focus,.novo-simple-dropdown-cell novo-dropdown button:hover,.novo-simple-dropdown-cell novo-dropdown button:active,.novo-simple-dropdown-cell novo-dropdown button:focus{background:rgba(0,0,0,.1)!important}.novo-simple-checkbox-header-cell,.novo-simple-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-simple-checkbox-header-cell>novo-checkbox,.novo-simple-checkbox-cell>novo-checkbox{margin-top:-4px}novo-activity-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-activity-table.loading{min-height:300px}novo-activity-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid #f7f7f7}novo-activity-table header>[novo-activity-table-custom-header]{flex:1}novo-activity-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-activity-table header>novo-search{display:flex}}novo-activity-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-activity-table header>novo-search.active>button[theme=fab]{height:35px}novo-activity-table header>div.novo-activity-table-actions{flex:1;display:flex;align-items:center;justify-content:flex-end}novo-activity-table header>div.novo-activity-table-actions>div,novo-activity-table header>div.novo-activity-table-actions>section{display:flex;align-items:center}novo-activity-table header>div.novo-activity-table-actions>div button,novo-activity-table header>div.novo-activity-table-actions>section button{margin-left:3px}novo-activity-table header>div.novo-activity-table-actions>div button[theme][theme=icon],novo-activity-table header>div.novo-activity-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-activity-table header>div.novo-activity-table-actions>div novo-dropdown button[theme],novo-activity-table header>div.novo-activity-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-activity-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-activity-table .novo-activity-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.07);z-index:99}novo-activity-table .novo-activity-table-empty-container,novo-activity-table .novo-activity-table-no-results-container{height:200px;display:flex;align-items:center;justify-content:center;color:#9e9e9e}novo-activity-table .novo-activity-table-filter-container{display:flex;flex:1}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter{border-right:1px solid #f7f7f7}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector{padding:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-container{flex:1;overflow:auto}novo-simple-table-pagination{display:flex;align-items:center}novo-simple-table-pagination novo-tiles>.tile-container .tile{padding:7px 10px}novo-simple-table-pagination>.novo-simple-table-pagination-size{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long,novo-simple-table-pagination>.novo-simple-table-range-label-short{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long{display:none}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-long{display:block}}novo-simple-table-pagination>.novo-simple-table-range-label-short{display:block}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-short{display:none}}novo-simple-table-pagination>button:first-of-type{margin-right:5px}novo-simple-table-pagination>button span{display:none}@media (min-width: 1000px){novo-simple-table-pagination>button span{display:block}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}.simple-table-dropdown .header{padding:5px 10px 0;display:flex;justify-content:space-between;align-items:center}.simple-table-dropdown .header button{padding:3px}.simple-table-dropdown .header button icon{font-size:.8em}.simple-table-dropdown list item.active{background:transparent;font-weight:500}\n"], directives: [{ type: i1.HeaderRowOutlet, selector: "[headerRowOutlet]" }, { type: i1.DataRowOutlet, selector: "[rowOutlet]" }, { type: i1.NoDataRowOutlet, selector: "[noDataRowOutlet]" }, { type: i1.FooterRowOutlet, selector: "[footerRowOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTable, decorators: [{
            type: Component,
            args: [{ selector: 'novo-simple-table', template: CDK_TABLE_TEMPLATE, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-activity-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}novo-simple-table{display:block;min-height:300px;flex:1}novo-simple-table.empty{min-height:52px;overflow:hidden;max-height:52px}novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-checkbox-cell{background-color:#f4f4f4}novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-checkbox-cell{background-color:#4a89dc26}novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-checkbox-cell{background-color:#fff}novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-checkbox-cell{background-color:#4a89dc26}.novo-simple-row,.novo-simple-header-row{display:flex;flex-direction:row;flex-wrap:no-wrap}.novo-simple-row .novo-simple-header-cell,.novo-simple-row novo-simple-empty-header-cell,.novo-simple-row .novo-simple-checkbox-header-cell,.novo-simple-header-row .novo-simple-header-cell,.novo-simple-header-row novo-simple-empty-header-cell,.novo-simple-header-row .novo-simple-checkbox-header-cell{border-bottom:1px solid #f7f7f7}.novo-simple-cell,.novo-simple-header-cell{min-width:200px;padding:10px;flex:1}.novo-simple-cell>span,.novo-simple-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis}.novo-simple-cell novo-dropdown,.novo-simple-header-cell novo-dropdown{display:inline-block}.novo-simple-cell button.active,.novo-simple-header-cell button.active{color:#4a89dc}.novo-simple-cell.clickable,.novo-simple-header-cell.clickable{cursor:pointer;color:#39d}.novo-simple-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column}.novo-simple-header-cell{border-left:1px solid #f7f7f7;white-space:nowrap;display:flex;align-items:center}.novo-simple-header-cell+novo-simple-empty-header-cell{border-left:none}.novo-simple-header-cell>label{display:inline-block;padding-right:10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.novo-simple-header-cell>label.sort-disabled{cursor:default}.novo-simple-header-cell>div{width:60px}.novo-simple-header-cell novo-dropdown[side=right]{display:inline-block}novo-simple-empty-header-cell.button-header-cell{min-width:40px}novo-simple-empty-header-cell.dropdown-header-cell{min-width:98px}.novo-simple-button-cell,.novo-simple-dropdown-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-simple-button-cell novo-dropdown button,.novo-simple-dropdown-cell novo-dropdown button{padding:5px}.novo-simple-button-cell novo-dropdown button:hover,.novo-simple-button-cell novo-dropdown button:active,.novo-simple-button-cell novo-dropdown button:focus,.novo-simple-dropdown-cell novo-dropdown button:hover,.novo-simple-dropdown-cell novo-dropdown button:active,.novo-simple-dropdown-cell novo-dropdown button:focus{background:rgba(0,0,0,.1)!important}.novo-simple-checkbox-header-cell,.novo-simple-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-simple-checkbox-header-cell>novo-checkbox,.novo-simple-checkbox-cell>novo-checkbox{margin-top:-4px}novo-activity-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-activity-table.loading{min-height:300px}novo-activity-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid #f7f7f7}novo-activity-table header>[novo-activity-table-custom-header]{flex:1}novo-activity-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-activity-table header>novo-search{display:flex}}novo-activity-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-activity-table header>novo-search.active>button[theme=fab]{height:35px}novo-activity-table header>div.novo-activity-table-actions{flex:1;display:flex;align-items:center;justify-content:flex-end}novo-activity-table header>div.novo-activity-table-actions>div,novo-activity-table header>div.novo-activity-table-actions>section{display:flex;align-items:center}novo-activity-table header>div.novo-activity-table-actions>div button,novo-activity-table header>div.novo-activity-table-actions>section button{margin-left:3px}novo-activity-table header>div.novo-activity-table-actions>div button[theme][theme=icon],novo-activity-table header>div.novo-activity-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-activity-table header>div.novo-activity-table-actions>div novo-dropdown button[theme],novo-activity-table header>div.novo-activity-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-activity-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-activity-table .novo-activity-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.07);z-index:99}novo-activity-table .novo-activity-table-empty-container,novo-activity-table .novo-activity-table-no-results-container{height:200px;display:flex;align-items:center;justify-content:center;color:#9e9e9e}novo-activity-table .novo-activity-table-filter-container{display:flex;flex:1}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter{border-right:1px solid #f7f7f7}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector{padding:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-container{flex:1;overflow:auto}novo-simple-table-pagination{display:flex;align-items:center}novo-simple-table-pagination novo-tiles>.tile-container .tile{padding:7px 10px}novo-simple-table-pagination>.novo-simple-table-pagination-size{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long,novo-simple-table-pagination>.novo-simple-table-range-label-short{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long{display:none}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-long{display:block}}novo-simple-table-pagination>.novo-simple-table-range-label-short{display:block}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-short{display:none}}novo-simple-table-pagination>button:first-of-type{margin-right:5px}novo-simple-table-pagination>button span{display:none}@media (min-width: 1000px){novo-simple-table-pagination>button span{display:block}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}.simple-table-dropdown .header{padding:5px 10px 0;display:flex;justify-content:space-between;align-items:center}.simple-table-dropdown .header button{padding:3px}.simple-table-dropdown .header button icon{font-size:.8em}.simple-table-dropdown list item.active{background:transparent;font-weight:500}\n"] }]
        }] });
class NovoActivityTableActions {
}
NovoActivityTableActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableActions, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableActions.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableActions, selector: "novo-activity-table-actions", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableActions, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-actions',
                }]
        }] });
class NovoActivityTableCustomHeader {
}
NovoActivityTableCustomHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableCustomHeader.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableCustomHeader, selector: "novo-activity-table-custom-header", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-custom-header',
                }]
        }] });
class NovoActivityTableCustomFilter {
}
NovoActivityTableCustomFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomFilter, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableCustomFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableCustomFilter, selector: "novo-activity-table-custom-filter", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableCustomFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-custom-filter',
                }]
        }] });
class NovoActivityTableEmptyMessage {
}
NovoActivityTableEmptyMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableEmptyMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableEmptyMessage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableEmptyMessage, selector: "novo-activity-table-empty-message", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableEmptyMessage, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-empty-message',
                }]
        }] });
class NovoActivityTableNoResultsMessage {
}
NovoActivityTableNoResultsMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableNoResultsMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NovoActivityTableNoResultsMessage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTableNoResultsMessage, selector: "novo-activity-table-no-results-message", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTableNoResultsMessage, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-activity-table-no-results-message',
                }]
        }] });
class NovoActivityTable {
    constructor(labels, ref, state) {
        this.labels = labels;
        this.ref = ref;
        this.state = state;
        this.globalSearchHiddenClassToggle = false;
        this.loading = true;
        notify('[Deprecated]: The simple table is deprecated. Please migrate to novo-data-tables!');
    }
    set customFilter(v) {
        this._customFilter = coerceBooleanProperty(v);
    }
    get customFilter() {
        return this._customFilter;
    }
    set forceShowHeader(v) {
        this._forceShowHeader = coerceBooleanProperty(v);
    }
    get forceShowHeader() {
        return this._forceShowHeader;
    }
    set hideGlobalSearch(v) {
        this._hideGlobalSearch = coerceBooleanProperty(v);
        this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
    }
    get hideGlobalSearch() {
        return this._hideGlobalSearch;
    }
    set debug(v) {
        this._debug = coerceBooleanProperty(v);
    }
    get debug() {
        return this._debug;
    }
    get empty() {
        return this.dataSource && this.dataSource.totallyEmpty;
    }
    get loadingClass() {
        return this.loading || (this.dataSource && this.dataSource.loading);
    }
    ngOnChanges(changes) {
        this.loading = changes.activityService && !changes.activityService.currentValue;
        this.ref.detectChanges();
        if (changes.activityService && changes.activityService.currentValue) {
            this.loading = false;
            this.dataSource = new ActivityTableDataSource(this.activityService, this.state, this.ref);
            this.ref.detectChanges();
        }
        if (changes.outsideFilter && changes.outsideFilter.currentValue) {
            if (!this.outsideFilterSubscription) {
                this.outsideFilterSubscription = this.outsideFilter.subscribe((filter) => {
                    this.state.outsideFilter = filter;
                    this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
                    this.ref.markForCheck();
                });
            }
        }
    }
    ngOnDestroy() {
        if (this.outsideFilterSubscription) {
            this.outsideFilterSubscription.unsubscribe();
        }
    }
    ngAfterContentInit() {
        if (this.paginationOptions && !this.paginationOptions.page) {
            this.paginationOptions.page = 0;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSize) {
            this.paginationOptions.pageSize = 50;
        }
        if (this.paginationOptions && !this.paginationOptions.pageSizeOptions) {
            this.paginationOptions.pageSizeOptions = [10, 25, 50, 100];
        }
        this.state.page = this.paginationOptions ? this.paginationOptions.page : undefined;
        this.state.pageSize = this.paginationOptions ? this.paginationOptions.pageSize : undefined;
        this.ref.markForCheck();
    }
    onSearchChange(term) {
        this.state.globalSearch = term;
        this.state.reset(false, true);
        this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
    }
}
NovoActivityTable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTable, deps: [{ token: i1$1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Component });
NovoActivityTable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoActivityTable, selector: "novo-activity-table", inputs: { activityService: "activityService", columns: "columns", displayedColumns: "displayedColumns", actionColumns: "actionColumns", paginationOptions: "paginationOptions", searchOptions: "searchOptions", defaultSort: "defaultSort", outsideFilter: "outsideFilter", customFilter: "customFilter", forceShowHeader: "forceShowHeader", hideGlobalSearch: "hideGlobalSearch", debug: "debug" }, host: { properties: { "class.global-search-hidden": "this.globalSearchHiddenClassToggle", "class.empty": "this.empty", "class.loading": "this.loadingClass" } }, providers: [
        NovoActivityTableState,
        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
        { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
    ], usesOnChanges: true, ngImport: i0, template: `
    <div *ngIf="debug">
      <p>Total: {{ dataSource?.total }}</p>
      <p>Current: {{ dataSource?.current }}</p>
      <p>Totally Empty: {{ dataSource?.totallyEmpty }}</p>
      <p>Currently Empty: {{ dataSource?.currentlyEmpty }}</p>
      <p>Loading (DataSource): {{ dataSource?.loading }}</p>
      <p>User Filtered: {{ state.userFiltered }}</p>
      <p>Loading (Table): {{ loading }}</p>
    </div>
    <header *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader">
      <ng-content select="[novo-activity-table-custom-header]"></ng-content>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-simple-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-simple-table-pagination>
      <div class="novo-activity-table-actions">
        <ng-content select="[novo-activity-table-actions]"></ng-content>
      </div>
    </header>
    <div class="novo-activity-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-activity-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-activity-table-filter-container">
      <div class="novo-activity-table-custom-filter" *ngIf="customFilter">
        <ng-content select="[novo-activity-table-custom-filter]"></ng-content>
      </div>
      <div class="novo-activity-table-container">
        <novo-simple-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered">
          <ng-content></ng-content>
          <ng-container novoSimpleColumnDef="selection">
            <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>
            <novo-simple-checkbox-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [index]="i"></novo-simple-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoSimpleColumnDef]="column.id">
            <novo-simple-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoSimpleHeaderCellDef
            ></novo-simple-empty-header-cell>
            <novo-simple-action-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [column]="column"></novo-simple-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoSimpleColumnDef]="column.id">
            <novo-simple-header-cell
              *novoSimpleHeaderCellDef
              [column]="column"
              [novo-simple-cell-config]="column.config"
              [defaultSort]="defaultSort"
              >{{ column.label }}</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row" [column]="column" [row]="row"></novo-simple-cell>
          </ng-container>
          <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns"></novo-simple-row>
        </novo-simple-table>
        <div
          class="novo-activity-table-no-results-container"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
          </div>
        </div>
        <div
          class="novo-activity-table-empty-container"
          *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
        >
          <div #empty><ng-content select="[novo-activity-table-empty-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="empty.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: ["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-activity-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}novo-simple-table{display:block;min-height:300px;flex:1}novo-simple-table.empty{min-height:52px;overflow:hidden;max-height:52px}novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-checkbox-cell{background-color:#f4f4f4}novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-checkbox-cell{background-color:#4a89dc26}novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-checkbox-cell{background-color:#fff}novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-checkbox-cell{background-color:#4a89dc26}.novo-simple-row,.novo-simple-header-row{display:flex;flex-direction:row;flex-wrap:no-wrap}.novo-simple-row .novo-simple-header-cell,.novo-simple-row novo-simple-empty-header-cell,.novo-simple-row .novo-simple-checkbox-header-cell,.novo-simple-header-row .novo-simple-header-cell,.novo-simple-header-row novo-simple-empty-header-cell,.novo-simple-header-row .novo-simple-checkbox-header-cell{border-bottom:1px solid #f7f7f7}.novo-simple-cell,.novo-simple-header-cell{min-width:200px;padding:10px;flex:1}.novo-simple-cell>span,.novo-simple-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis}.novo-simple-cell novo-dropdown,.novo-simple-header-cell novo-dropdown{display:inline-block}.novo-simple-cell button.active,.novo-simple-header-cell button.active{color:#4a89dc}.novo-simple-cell.clickable,.novo-simple-header-cell.clickable{cursor:pointer;color:#39d}.novo-simple-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column}.novo-simple-header-cell{border-left:1px solid #f7f7f7;white-space:nowrap;display:flex;align-items:center}.novo-simple-header-cell+novo-simple-empty-header-cell{border-left:none}.novo-simple-header-cell>label{display:inline-block;padding-right:10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.novo-simple-header-cell>label.sort-disabled{cursor:default}.novo-simple-header-cell>div{width:60px}.novo-simple-header-cell novo-dropdown[side=right]{display:inline-block}novo-simple-empty-header-cell.button-header-cell{min-width:40px}novo-simple-empty-header-cell.dropdown-header-cell{min-width:98px}.novo-simple-button-cell,.novo-simple-dropdown-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-simple-button-cell novo-dropdown button,.novo-simple-dropdown-cell novo-dropdown button{padding:5px}.novo-simple-button-cell novo-dropdown button:hover,.novo-simple-button-cell novo-dropdown button:active,.novo-simple-button-cell novo-dropdown button:focus,.novo-simple-dropdown-cell novo-dropdown button:hover,.novo-simple-dropdown-cell novo-dropdown button:active,.novo-simple-dropdown-cell novo-dropdown button:focus{background:rgba(0,0,0,.1)!important}.novo-simple-checkbox-header-cell,.novo-simple-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-simple-checkbox-header-cell>novo-checkbox,.novo-simple-checkbox-cell>novo-checkbox{margin-top:-4px}novo-activity-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-activity-table.loading{min-height:300px}novo-activity-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid #f7f7f7}novo-activity-table header>[novo-activity-table-custom-header]{flex:1}novo-activity-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-activity-table header>novo-search{display:flex}}novo-activity-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-activity-table header>novo-search.active>button[theme=fab]{height:35px}novo-activity-table header>div.novo-activity-table-actions{flex:1;display:flex;align-items:center;justify-content:flex-end}novo-activity-table header>div.novo-activity-table-actions>div,novo-activity-table header>div.novo-activity-table-actions>section{display:flex;align-items:center}novo-activity-table header>div.novo-activity-table-actions>div button,novo-activity-table header>div.novo-activity-table-actions>section button{margin-left:3px}novo-activity-table header>div.novo-activity-table-actions>div button[theme][theme=icon],novo-activity-table header>div.novo-activity-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-activity-table header>div.novo-activity-table-actions>div novo-dropdown button[theme],novo-activity-table header>div.novo-activity-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-activity-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-activity-table .novo-activity-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.07);z-index:99}novo-activity-table .novo-activity-table-empty-container,novo-activity-table .novo-activity-table-no-results-container{height:200px;display:flex;align-items:center;justify-content:center;color:#9e9e9e}novo-activity-table .novo-activity-table-filter-container{display:flex;flex:1}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter{border-right:1px solid #f7f7f7}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector{padding:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-container{flex:1;overflow:auto}novo-simple-table-pagination{display:flex;align-items:center}novo-simple-table-pagination novo-tiles>.tile-container .tile{padding:7px 10px}novo-simple-table-pagination>.novo-simple-table-pagination-size{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long,novo-simple-table-pagination>.novo-simple-table-range-label-short{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long{display:none}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-long{display:block}}novo-simple-table-pagination>.novo-simple-table-range-label-short{display:block}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-short{display:none}}novo-simple-table-pagination>button:first-of-type{margin-right:5px}novo-simple-table-pagination>button span{display:none}@media (min-width: 1000px){novo-simple-table-pagination>button span{display:block}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}.simple-table-dropdown .header{padding:5px 10px 0;display:flex;justify-content:space-between;align-items:center}.simple-table-dropdown .header button{padding:3px}.simple-table-dropdown .header button icon{font-size:.8em}.simple-table-dropdown list item.active{background:transparent;font-weight:500}\n"], components: [{ type: i4$1.NovoSearchBoxElement, selector: "novo-search", inputs: ["name", "icon", "position", "placeholder", "alwaysOpen", "theme", "color", "closeOnSelect", "displayField", "displayValue", "hint", "keepOpen", "hasBackdrop", "allowPropagation"], outputs: ["searchChanged", "applySearch"] }, { type: NovoSimpleTablePagination, selector: "novo-simple-table-pagination", inputs: ["page", "length", "pageSize", "pageSizeOptions"], outputs: ["pageChange"] }, { type: i6$1.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: NovoTable, selector: "novo-simple-table" }, { type: NovoSimpleCheckboxHeaderCell, selector: "novo-simple-checkbox-header-cell" }, { type: NovoSimpleCheckboxCell, selector: "novo-simple-checkbox-cell", inputs: ["row", "index"] }, { type: NovoSimpleActionCell, selector: "novo-simple-action-cell", inputs: ["row", "column"] }, { type: NovoSimpleCellHeader, selector: "[novo-simple-cell-config]", inputs: ["defaultSort", "novo-simple-cell-config"] }, { type: NovoSimpleCell, selector: "novo-simple-cell", inputs: ["row", "column"] }, { type: NovoSimpleHeaderRow, selector: "novo-simple-header-row" }, { type: NovoSimpleRow, selector: "novo-simple-row" }], directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: NovoSortFilter, selector: "[novoSortFilter]" }, { type: NovoSelection, selector: "[novoSelection]", outputs: ["novoSelectAllToggle"] }, { type: NovoSimpleColumnDef, selector: "[novoSimpleColumnDef]", inputs: ["novoSimpleColumnDef"] }, { type: NovoSimpleHeaderCellDef, selector: "[novoSimpleHeaderCellDef]" }, { type: NovoSimpleCellDef, selector: "[novoSimpleCellDef]" }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: NovoSimpleEmptyHeaderCell, selector: "novo-simple-empty-header-cell" }, { type: NovoSimpleHeaderCell, selector: "novo-simple-header-cell", inputs: ["column"] }, { type: NovoSimpleHeaderRowDef, selector: "[novoSimpleHeaderRowDef]", inputs: ["novoSimpleHeaderRowDef"] }, { type: NovoSimpleRowDef, selector: "[novoSimpleRowDef]", inputs: ["novoSimpleRowDefColumns"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoActivityTable, decorators: [{
            type: Component,
            args: [{ selector: 'novo-activity-table', template: `
    <div *ngIf="debug">
      <p>Total: {{ dataSource?.total }}</p>
      <p>Current: {{ dataSource?.current }}</p>
      <p>Totally Empty: {{ dataSource?.totallyEmpty }}</p>
      <p>Currently Empty: {{ dataSource?.currentlyEmpty }}</p>
      <p>Loading (DataSource): {{ dataSource?.loading }}</p>
      <p>User Filtered: {{ state.userFiltered }}</p>
      <p>Loading (Table): {{ loading }}</p>
    </div>
    <header *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader">
      <ng-content select="[novo-activity-table-custom-header]"></ng-content>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-simple-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-simple-table-pagination>
      <div class="novo-activity-table-actions">
        <ng-content select="[novo-activity-table-actions]"></ng-content>
      </div>
    </header>
    <div class="novo-activity-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-activity-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-activity-table-filter-container">
      <div class="novo-activity-table-custom-filter" *ngIf="customFilter">
        <ng-content select="[novo-activity-table-custom-filter]"></ng-content>
      </div>
      <div class="novo-activity-table-container">
        <novo-simple-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered">
          <ng-content></ng-content>
          <ng-container novoSimpleColumnDef="selection">
            <novo-simple-checkbox-header-cell *novoSimpleHeaderCellDef></novo-simple-checkbox-header-cell>
            <novo-simple-checkbox-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [index]="i"></novo-simple-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoSimpleColumnDef]="column.id">
            <novo-simple-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoSimpleHeaderCellDef
            ></novo-simple-empty-header-cell>
            <novo-simple-action-cell *novoSimpleCellDef="let row; let i = index" [row]="row" [column]="column"></novo-simple-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoSimpleColumnDef]="column.id">
            <novo-simple-header-cell
              *novoSimpleHeaderCellDef
              [column]="column"
              [novo-simple-cell-config]="column.config"
              [defaultSort]="defaultSort"
              >{{ column.label }}</novo-simple-header-cell>
            <novo-simple-cell *novoSimpleCellDef="let row" [column]="column" [row]="row"></novo-simple-cell>
          </ng-container>
          <novo-simple-header-row *novoSimpleHeaderRowDef="displayedColumns"></novo-simple-header-row>
          <novo-simple-row *novoSimpleRowDef="let row; columns: displayedColumns"></novo-simple-row>
        </novo-simple-table>
        <div
          class="novo-activity-table-no-results-container"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
          </div>
        </div>
        <div
          class="novo-activity-table-empty-container"
          *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
        >
          <div #empty><ng-content select="[novo-activity-table-empty-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="empty.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
          </div>
        </div>
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        NovoActivityTableState,
                        { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
                        { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
                    ], styles: ["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}a,novo-activity-table .clickable{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:\"monospace\";font-family:var(--font-family-mono, \"monospace\");font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none!important}novo-simple-table{display:block;min-height:300px;flex:1}novo-simple-table.empty{min-height:52px;overflow:hidden;max-height:52px}novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd) .novo-simple-checkbox-cell{background-color:#f4f4f4}novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(odd).active .novo-simple-checkbox-cell{background-color:#4a89dc26}novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even) .novo-simple-checkbox-cell{background-color:#fff}novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-button-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-dropdown-cell,novo-simple-table>.novo-simple-row:nth-of-type(even).active .novo-simple-checkbox-cell{background-color:#4a89dc26}.novo-simple-row,.novo-simple-header-row{display:flex;flex-direction:row;flex-wrap:no-wrap}.novo-simple-row .novo-simple-header-cell,.novo-simple-row novo-simple-empty-header-cell,.novo-simple-row .novo-simple-checkbox-header-cell,.novo-simple-header-row .novo-simple-header-cell,.novo-simple-header-row novo-simple-empty-header-cell,.novo-simple-header-row .novo-simple-checkbox-header-cell{border-bottom:1px solid #f7f7f7}.novo-simple-cell,.novo-simple-header-cell{min-width:200px;padding:10px;flex:1}.novo-simple-cell>span,.novo-simple-header-cell>span{display:block;min-width:180px;max-width:180px;overflow:hidden;text-overflow:ellipsis}.novo-simple-cell novo-dropdown,.novo-simple-header-cell novo-dropdown{display:inline-block}.novo-simple-cell button.active,.novo-simple-header-cell button.active{color:#4a89dc}.novo-simple-cell.clickable,.novo-simple-header-cell.clickable{cursor:pointer;color:#39d}.novo-simple-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column}.novo-simple-header-cell{border-left:1px solid #f7f7f7;white-space:nowrap;display:flex;align-items:center}.novo-simple-header-cell+novo-simple-empty-header-cell{border-left:none}.novo-simple-header-cell>label{display:inline-block;padding-right:10px;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.novo-simple-header-cell>label.sort-disabled{cursor:default}.novo-simple-header-cell>div{width:60px}.novo-simple-header-cell novo-dropdown[side=right]{display:inline-block}novo-simple-empty-header-cell.button-header-cell{min-width:40px}novo-simple-empty-header-cell.dropdown-header-cell{min-width:98px}.novo-simple-button-cell,.novo-simple-dropdown-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;padding:0 5px}.novo-simple-button-cell novo-dropdown button,.novo-simple-dropdown-cell novo-dropdown button{padding:5px}.novo-simple-button-cell novo-dropdown button:hover,.novo-simple-button-cell novo-dropdown button:active,.novo-simple-button-cell novo-dropdown button:focus,.novo-simple-dropdown-cell novo-dropdown button:hover,.novo-simple-dropdown-cell novo-dropdown button:active,.novo-simple-dropdown-cell novo-dropdown button:focus{background:rgba(0,0,0,.1)!important}.novo-simple-checkbox-header-cell,.novo-simple-checkbox-cell{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;max-width:40px;padding:0 10px}.novo-simple-checkbox-header-cell>novo-checkbox,.novo-simple-checkbox-cell>novo-checkbox{margin-top:-4px}novo-activity-table{position:relative;width:100%;display:flex;flex-direction:column;flex:1}novo-activity-table.loading{min-height:300px}novo-activity-table header{padding:5px;display:flex;align-items:center;flex-shrink:0;border-bottom:1px solid #f7f7f7}novo-activity-table header>[novo-activity-table-custom-header]{flex:1}novo-activity-table header>novo-search{padding-right:10px;display:none}@media (min-width: 1000px){novo-activity-table header>novo-search{display:flex}}novo-activity-table header>novo-search>input{padding:8.5px;font-size:1.1em;height:35px}novo-activity-table header>novo-search.active>button[theme=fab]{height:35px}novo-activity-table header>div.novo-activity-table-actions{flex:1;display:flex;align-items:center;justify-content:flex-end}novo-activity-table header>div.novo-activity-table-actions>div,novo-activity-table header>div.novo-activity-table-actions>section{display:flex;align-items:center}novo-activity-table header>div.novo-activity-table-actions>div button,novo-activity-table header>div.novo-activity-table-actions>section button{margin-left:3px}novo-activity-table header>div.novo-activity-table-actions>div button[theme][theme=icon],novo-activity-table header>div.novo-activity-table-actions>section button[theme][theme=icon]{height:35px;width:35px;font-size:1.4em}novo-activity-table header>div.novo-activity-table-actions>div novo-dropdown button[theme],novo-activity-table header>div.novo-activity-table-actions>section novo-dropdown button[theme]{white-space:nowrap;padding:6px 5px 6px 15px!important}novo-activity-table button[theme][theme=icon]{height:30px;width:30px;padding:5px}novo-activity-table .novo-activity-table-loading-mask{position:absolute;display:flex;padding-top:10%;justify-content:center;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.07);z-index:99}novo-activity-table .novo-activity-table-empty-container,novo-activity-table .novo-activity-table-no-results-container{height:200px;display:flex;align-items:center;justify-content:center;color:#9e9e9e}novo-activity-table .novo-activity-table-filter-container{display:flex;flex:1}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter{border-right:1px solid #f7f7f7}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar{box-shadow:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .date-range-tabs{height:51px}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter novo-date-picker .calendar .calendar-footer{display:none}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector{padding:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-custom-filter div.period-selector .novo-form-control-label{display:block;max-width:100%;margin-bottom:1em}novo-activity-table .novo-activity-table-filter-container .novo-activity-table-container{flex:1;overflow:auto}novo-simple-table-pagination{display:flex;align-items:center}novo-simple-table-pagination novo-tiles>.tile-container .tile{padding:7px 10px}novo-simple-table-pagination>.novo-simple-table-pagination-size{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long,novo-simple-table-pagination>.novo-simple-table-range-label-short{padding-right:10px}novo-simple-table-pagination>.novo-simple-table-range-label-long{display:none}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-long{display:block}}novo-simple-table-pagination>.novo-simple-table-range-label-short{display:block}@media (min-width: 1000px){novo-simple-table-pagination>.novo-simple-table-range-label-short{display:none}}novo-simple-table-pagination>button:first-of-type{margin-right:5px}novo-simple-table-pagination>button span{display:none}@media (min-width: 1000px){novo-simple-table-pagination>button span{display:block}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=left]{padding:5px 15px 5px 5px}}novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px}@media (min-width: 1000px){novo-simple-table-pagination>button[theme][theme=dialogue][icon][side=right]{padding:5px 5px 5px 15px}}.simple-table-dropdown .header{padding:5px 10px 0;display:flex;justify-content:space-between;align-items:center}.simple-table-dropdown .header button{padding:3px}.simple-table-dropdown .header button icon{font-size:.8em}.simple-table-dropdown list item.active{background:transparent;font-weight:500}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: NovoActivityTableState }]; }, propDecorators: { globalSearchHiddenClassToggle: [{
                type: HostBinding,
                args: ['class.global-search-hidden']
            }], activityService: [{
                type: Input
            }], columns: [{
                type: Input
            }], displayedColumns: [{
                type: Input
            }], actionColumns: [{
                type: Input
            }], paginationOptions: [{
                type: Input
            }], searchOptions: [{
                type: Input
            }], defaultSort: [{
                type: Input
            }], outsideFilter: [{
                type: Input
            }], customFilter: [{
                type: Input
            }], forceShowHeader: [{
                type: Input
            }], hideGlobalSearch: [{
                type: Input
            }], debug: [{
                type: Input
            }], empty: [{
                type: HostBinding,
                args: ['class.empty']
            }], loadingClass: [{
                type: HostBinding,
                args: ['class.loading']
            }] } });

class NovoSimpleTableModule {
}
NovoSimpleTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSimpleTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleTableModule, declarations: [NovoTable,
        NovoSimpleCellDef,
        NovoSimpleHeaderCellDef,
        NovoSimpleColumnDef,
        NovoActivityTableEmptyMessage,
        NovoActivityTableNoResultsMessage,
        NovoSimpleHeaderRowDef,
        NovoSimpleRowDef,
        NovoSimpleCellHeader,
        NovoSortFilter,
        NovoSimpleActionCell,
        NovoSimpleEmptyHeaderCell,
        NovoSimpleHeaderCell,
        NovoSimpleCell,
        NovoSimpleHeaderRow,
        NovoSimpleRow,
        NovoSimpleFilterFocus,
        NovoSimpleTablePagination,
        NovoActivityTableCustomHeader,
        NovoSimpleCheckboxCell,
        NovoSimpleCheckboxHeaderCell,
        NovoSelection,
        NovoActivityTable,
        NovoActivityTableActions,
        NovoActivityTableCustomFilter], imports: [NovoDatePickerModule,
        CdkTableModule,
        CommonModule,
        FormsModule,
        NovoCommonModule,
        NovoButtonModule,
        NovoDropdownModule,
        NovoFormExtrasModule,
        NovoLoadingModule,
        NovoTilesModule,
        NovoSearchBoxModule,
        NovoCheckboxModule,
        NovoOptionModule], exports: [NovoTable,
        NovoSimpleCellDef,
        NovoSimpleHeaderCellDef,
        NovoSimpleColumnDef,
        NovoActivityTableEmptyMessage,
        NovoActivityTableNoResultsMessage,
        NovoSimpleHeaderRowDef,
        NovoSimpleRowDef,
        NovoSimpleCellHeader,
        NovoSortFilter,
        NovoSimpleActionCell,
        NovoSimpleEmptyHeaderCell,
        NovoSimpleHeaderCell,
        NovoSimpleCell,
        NovoSimpleHeaderRow,
        NovoSimpleRow,
        NovoSimpleFilterFocus,
        NovoSimpleTablePagination,
        NovoActivityTableCustomHeader,
        NovoSimpleCheckboxCell,
        NovoSimpleCheckboxHeaderCell,
        NovoSelection,
        NovoActivityTable,
        NovoActivityTableActions,
        NovoActivityTableCustomFilter] });
NovoSimpleTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleTableModule, providers: [NovoActivityTableState], imports: [[
            NovoDatePickerModule,
            CdkTableModule,
            CommonModule,
            FormsModule,
            NovoCommonModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoFormExtrasModule,
            NovoLoadingModule,
            NovoTilesModule,
            NovoSearchBoxModule,
            NovoCheckboxModule,
            NovoOptionModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSimpleTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NovoDatePickerModule,
                        CdkTableModule,
                        CommonModule,
                        FormsModule,
                        NovoCommonModule,
                        NovoButtonModule,
                        NovoDropdownModule,
                        NovoFormExtrasModule,
                        NovoLoadingModule,
                        NovoTilesModule,
                        NovoSearchBoxModule,
                        NovoCheckboxModule,
                        NovoOptionModule,
                    ],
                    exports: [
                        NovoTable,
                        NovoSimpleCellDef,
                        NovoSimpleHeaderCellDef,
                        NovoSimpleColumnDef,
                        NovoActivityTableEmptyMessage,
                        NovoActivityTableNoResultsMessage,
                        NovoSimpleHeaderRowDef,
                        NovoSimpleRowDef,
                        NovoSimpleCellHeader,
                        NovoSortFilter,
                        NovoSimpleActionCell,
                        NovoSimpleEmptyHeaderCell,
                        NovoSimpleHeaderCell,
                        NovoSimpleCell,
                        NovoSimpleHeaderRow,
                        NovoSimpleRow,
                        NovoSimpleFilterFocus,
                        NovoSimpleTablePagination,
                        NovoActivityTableCustomHeader,
                        NovoSimpleCheckboxCell,
                        NovoSimpleCheckboxHeaderCell,
                        NovoSelection,
                        NovoActivityTable,
                        NovoActivityTableActions,
                        NovoActivityTableCustomFilter,
                    ],
                    declarations: [
                        NovoTable,
                        NovoSimpleCellDef,
                        NovoSimpleHeaderCellDef,
                        NovoSimpleColumnDef,
                        NovoActivityTableEmptyMessage,
                        NovoActivityTableNoResultsMessage,
                        NovoSimpleHeaderRowDef,
                        NovoSimpleRowDef,
                        NovoSimpleCellHeader,
                        NovoSortFilter,
                        NovoSimpleActionCell,
                        NovoSimpleEmptyHeaderCell,
                        NovoSimpleHeaderCell,
                        NovoSimpleCell,
                        NovoSimpleHeaderRow,
                        NovoSimpleRow,
                        NovoSimpleFilterFocus,
                        NovoSimpleTablePagination,
                        NovoActivityTableCustomHeader,
                        NovoSimpleCheckboxCell,
                        NovoSimpleCheckboxHeaderCell,
                        NovoSelection,
                        NovoActivityTable,
                        NovoActivityTableActions,
                        NovoActivityTableCustomFilter,
                    ],
                    providers: [NovoActivityTableState],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ActivityTableDataSource, ActivityTableRenderers, NovoActivityTable, NovoActivityTableActions, NovoActivityTableCustomFilter, NovoActivityTableCustomHeader, NovoActivityTableEmptyMessage, NovoActivityTableNoResultsMessage, NovoActivityTableState, NovoSelection, NovoSimpleActionCell, NovoSimpleCell, NovoSimpleCellDef, NovoSimpleCellHeader, NovoSimpleCheckboxCell, NovoSimpleCheckboxHeaderCell, NovoSimpleColumnDef, NovoSimpleEmptyHeaderCell, NovoSimpleFilterFocus, NovoSimpleHeaderCell, NovoSimpleHeaderCellDef, NovoSimpleHeaderRow, NovoSimpleHeaderRowDef, NovoSimpleRow, NovoSimpleRowDef, NovoSimpleTableModule, NovoSimpleTablePagination, NovoSortFilter, NovoTable, RemoteActivityTableService, StaticActivityTableService, _NovoCdkRowDef, _NovoCell, _NovoCellDef, _NovoColumnDef, _NovoHeaderCell, _NovoHeaderCellDef, _NovoHeaderRow, _NovoHeaderRowDef, _NovoRow };
//# sourceMappingURL=novo-elements-elements-simple-table.mjs.map
