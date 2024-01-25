import * as i0 from '@angular/core';
import { Component, Input, ViewEncapsulation, Directive, EventEmitter, Output, ViewContainerRef, ViewChild, HostListener, NgModule, ElementRef, ViewChildren } from '@angular/core';
import * as i1 from 'novo-elements/services';
import { PagedArrayCollection, CollectionEvent } from 'novo-elements/services';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from 'novo-elements/elements/dropdown';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import * as i3 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import * as i19 from 'novo-elements/elements/common';
import { NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i3$1 from '@angular/forms';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import * as i4 from 'novo-elements/elements/select';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Helpers, notify, DateUtil } from 'novo-elements/utils';
import { startOfToday, startOfTomorrow } from 'date-fns';
import * as i2$2 from 'novo-elements/elements/form';
import { ControlFactory, ReadOnlyControl, NovoFormModule, NovoFormExtrasModule } from 'novo-elements/elements/form';
import * as i12 from 'novo-elements/elements/toast';
import { NovoToastModule } from 'novo-elements/elements/toast';
import * as i14 from 'novo-elements/elements/tooltip';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import * as i16 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i17 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i18 from 'novo-elements/elements/checkbox';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import * as i20 from 'novo-elements/elements/flex';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import * as i21 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { IMaskDirectiveModule } from 'angular-imask';

class BaseRenderer {
    constructor() {
        this._data = {};
        this._value = '';
        this.meta = {};
    }
    get data() {
        return this._data;
    }
    set data(d) {
        this._data = d;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
    }
}

// NG2
class DateCell extends BaseRenderer {
    constructor(labels) {
        super();
        this.labels = labels;
    }
    set value(v) {
        this._value = v;
    }
    get value() {
        return this._value;
    }
    getFormattedDate() {
        return this.labels.formatDate(this.value);
    }
}
DateCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DateCell, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
DateCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: DateCell, selector: "date-cell", inputs: { value: "value" }, usesInheritance: true, ngImport: i0, template: `
    <div class="date-cell">
      <label>{{ getFormattedDate() }}</label>
    </div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: DateCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'date-cell',
                    template: `
    <div class="date-cell">
      <label>{{ getFormattedDate() }}</label>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { value: [{
                type: Input
            }] } });

// NG2
class NovoDropdownCell extends BaseRenderer {
    set value(v) {
        this._value = v;
    }
    get value() {
        return this._value;
    }
    ngOnInit() {
        // Check for and fix bad config
        if (!this.meta.dropdownCellConfig) {
            throw new Error('Missing "dropdownCellConfig" on the column setup');
        }
    }
    onClick(config, option, value) {
        const callback = option.callback || config.callback;
        callback(this.data, value || option);
    }
}
NovoDropdownCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDropdownCell, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDropdownCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoDropdownCell, selector: "novo-dropdown-cell", inputs: { meta: "meta", value: "value" }, usesInheritance: true, ngImport: i0, template: `
    <novo-dropdown parentScrollSelector=".table-container" containerClass="novo-table-dropdown-cell">
      <novo-button type="button" theme="secondary" icon="collapse" inverse>
        <span data-automation-id="novo-dropdown-cell-value">{{ value }}</span>
      </novo-button>
      <list>
        <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
          <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
          <item
            *ngFor="let option of config.options"
            (action)="onClick(config, option, option.value)"
            [class.active]="(option || option.value) === value"
          >
            <span [attr.data-automation-id]="option.label || option">{{ option.label || option }}</span>
            <i *ngIf="(option || option.value) === value" class="bhi-check"></i>
          </item>
          <hr *ngIf="i < meta.dropdownCellConfig.length - 1" />
        </ng-container>
      </list>
    </novo-dropdown>
  `, isInline: true, styles: ["novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon],.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]{font-size:inherit;color:inherit;border:none;background:inherit;text-transform:inherit;border-radius:0;border-bottom:1px solid #dedede;padding:0;width:100%!important;max-width:200px}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i{font-size:10px;margin-right:-5px;color:#a0a0a0}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper{justify-content:space-between}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover{background:inherit;box-shadow:none}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell list,.novo-table-dropdown-cell list{max-height:400px;display:block;overflow:auto;padding:5px 0}novo-dropdown-cell item,.novo-table-dropdown-cell item{height:30px!important;padding:0 16px!important}novo-dropdown-cell item span,.novo-table-dropdown-cell item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell item.active,.novo-table-dropdown-cell item.active{font-weight:500}novo-dropdown-cell dropdown-item-header,.novo-table-dropdown-cell dropdown-item-header{padding:0 10px!important}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2$1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i2$1.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }, { kind: "component", type: i2$1.NovoDropdownListElement, selector: "list" }, { kind: "component", type: i2$1.NovoDropDownItemHeaderElement, selector: "dropdown-item-header" }, { kind: "component", type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "directive", type: i19.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoDropdownCell, decorators: [{
            type: Component,
            args: [{ selector: 'novo-dropdown-cell', template: `
    <novo-dropdown parentScrollSelector=".table-container" containerClass="novo-table-dropdown-cell">
      <novo-button type="button" theme="secondary" icon="collapse" inverse>
        <span data-automation-id="novo-dropdown-cell-value">{{ value }}</span>
      </novo-button>
      <list>
        <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
          <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
          <item
            *ngFor="let option of config.options"
            (action)="onClick(config, option, option.value)"
            [class.active]="(option || option.value) === value"
          >
            <span [attr.data-automation-id]="option.label || option">{{ option.label || option }}</span>
            <i *ngIf="(option || option.value) === value" class="bhi-check"></i>
          </item>
          <hr *ngIf="i < meta.dropdownCellConfig.length - 1" />
        </ng-container>
      </list>
    </novo-dropdown>
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon],.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]{font-size:inherit;color:inherit;border:none;background:inherit;text-transform:inherit;border-radius:0;border-bottom:1px solid #dedede;padding:0;width:100%!important;max-width:200px}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i{font-size:10px;margin-right:-5px;color:#a0a0a0}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper{justify-content:space-between}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover{background:inherit;box-shadow:none}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell list,.novo-table-dropdown-cell list{max-height:400px;display:block;overflow:auto;padding:5px 0}novo-dropdown-cell item,.novo-table-dropdown-cell item{height:30px!important;padding:0 16px!important}novo-dropdown-cell item span,.novo-table-dropdown-cell item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell item.active,.novo-table-dropdown-cell item.active{font-weight:500}novo-dropdown-cell dropdown-item-header,.novo-table-dropdown-cell dropdown-item-header{padding:0 10px!important}\n"] }]
        }], propDecorators: { meta: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

// NG2
class NovoTableKeepFilterFocus {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        this.element.nativeElement.focus();
    }
}
NovoTableKeepFilterFocus.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableKeepFilterFocus, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoTableKeepFilterFocus.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: NovoTableKeepFilterFocus, selector: "[keepFilterFocused]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableKeepFilterFocus, decorators: [{
            type: Directive,
            args: [{
                    selector: '[keepFilterFocused]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });

// NG2
class Pagination {
    constructor(labels) {
        this.labels = labels;
        this.itemsPerPage = 10;
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.maxPagesDisplayed = 5;
    }
    get disablePageSelection() {
        return this.pageSelectDisabled;
    }
    set disablePageSelection(val) {
        this.pageSelectDisabled = coerceBooleanProperty(val);
    }
    ngOnInit() {
        this.label = this.label || this.labels.itemsPerPage;
        this.rowOptions = this.rowOptions || this.getDefaultRowOptions();
    }
    ngOnChanges(changes) {
        this.page = this.page || 1;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
    }
    getDefaultRowOptions() {
        return [
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
        ];
    }
    onPageSizeChanged(event) {
        this.page = 1;
        this.itemsPerPage = event.selected;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage,
        });
    }
    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }
        this.page = page;
        this.pages = this.getPages(this.page, this.totalPages);
        this.pageChange.emit(this.page);
        this.onPageChange.emit({
            page: this.page,
            itemsPerPage: this.itemsPerPage,
        });
    }
    noPrevious() {
        return this.page === 1;
    }
    noNext() {
        return this.page === this.totalPages;
    }
    // Create page object used in template
    makePage(num, text, isActive) {
        return { num, text, active: isActive };
    }
    getPages(currentPage, totalPages) {
        const pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        const isMaxSized = this.maxPagesDisplayed < totalPages;
        // recompute if maxPagesDisplayed
        if (isMaxSized) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(this.maxPagesDisplayed / 2), 1);
            endPage = startPage + this.maxPagesDisplayed - 1;
            // Adjust if limit is exceeded
            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = endPage - this.maxPagesDisplayed + 1;
            }
        }
        // Add page number links
        for (let num = startPage; num <= endPage; num++) {
            const page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        return pages;
    }
    calculateTotalPages() {
        const totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
}
Pagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: Pagination, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
Pagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: Pagination, selector: "novo-pagination", inputs: { page: "page", totalItems: "totalItems", itemsPerPage: "itemsPerPage", rowOptions: "rowOptions", label: "label", disablePageSelection: "disablePageSelection" }, outputs: { pageChange: "pageChange", itemsPerPageChange: "itemsPerPageChange", onPageChange: "onPageChange" }, usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
        class="table-pagination-select"
        [options]="rowOptions"
        [placeholder]="labels.select"
        [(ngModel)]="itemsPerPage"
        (onSelect)="onPageSizeChanged($event)"
        data-automation-id="pager-select"
      ></novo-select>
      <span class="spacer"></span>
    </ng-container>
    <ul class="pager" data-automation-id="pager">
      <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-previous" data-automation-id="pager-previous"></i>
      </li>
      <li
        class="page"
        [ngClass]="{ active: p.active }"
        [class.disabled]="disablePageSelection"
        *ngFor="let p of pages"
        (click)="selectPage(p.num, $event)"
      >
        {{ p.text }}
      </li>
      <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-next" data-automation-id="pager-next"></i>
      </li>
    </ul>
  `, isInline: true, styles: ["novo-pagination{display:flex;flex-flow:row nowrap;padding:10px}novo-pagination>*{margin:auto 5px}novo-pagination h5.rows{padding:0;font-size:1rem;opacity:.75;letter-spacing:.1px}novo-pagination span.spacer{flex:1}novo-pagination novo-select.table-pagination-select{max-width:100px;min-width:100px}novo-pagination novo-select.table-pagination-select div[type=button]:hover i{opacity:.75}novo-pagination novo-select.table-pagination-select div[type=button]:active i,novo-pagination novo-select.table-pagination-select div[type=button]:focus i{opacity:1}novo-pagination novo-select.table-pagination-select div[type=button] i{opacity:.45}novo-pagination .pager{list-style-type:none}novo-pagination .pager .page{display:inline-block;padding:0 10px;line-height:2.4rem;font-size:var(--font-size-text);border-radius:2px;text-align:center;list-style-type:none;cursor:pointer;color:#39d}novo-pagination .pager .page:last-child{padding-right:0}novo-pagination .pager .page.disabled{opacity:.3;pointer-events:none}novo-pagination .pager .page.active{color:#39d;background-color:#f7f7f7;opacity:1}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: Pagination, decorators: [{
            type: Component,
            args: [{ selector: 'novo-pagination', template: `
    <ng-container *ngIf="rowOptions.length > 1">
      <h5 class="rows">{{ label }}</h5>
      <novo-select
        class="table-pagination-select"
        [options]="rowOptions"
        [placeholder]="labels.select"
        [(ngModel)]="itemsPerPage"
        (onSelect)="onPageSizeChanged($event)"
        data-automation-id="pager-select"
      ></novo-select>
      <span class="spacer"></span>
    </ng-container>
    <ul class="pager" data-automation-id="pager">
      <li class="page" (click)="selectPage(page - 1)" [ngClass]="{ disabled: noPrevious() }">
        <i class="bhi-previous" data-automation-id="pager-previous"></i>
      </li>
      <li
        class="page"
        [ngClass]="{ active: p.active }"
        [class.disabled]="disablePageSelection"
        *ngFor="let p of pages"
        (click)="selectPage(p.num, $event)"
      >
        {{ p.text }}
      </li>
      <li class="page" (click)="selectPage(page + 1)" [ngClass]="{ disabled: noNext() }">
        <i class="bhi-next" data-automation-id="pager-next"></i>
      </li>
    </ul>
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-pagination{display:flex;flex-flow:row nowrap;padding:10px}novo-pagination>*{margin:auto 5px}novo-pagination h5.rows{padding:0;font-size:1rem;opacity:.75;letter-spacing:.1px}novo-pagination span.spacer{flex:1}novo-pagination novo-select.table-pagination-select{max-width:100px;min-width:100px}novo-pagination novo-select.table-pagination-select div[type=button]:hover i{opacity:.75}novo-pagination novo-select.table-pagination-select div[type=button]:active i,novo-pagination novo-select.table-pagination-select div[type=button]:focus i{opacity:1}novo-pagination novo-select.table-pagination-select div[type=button] i{opacity:.45}novo-pagination .pager{list-style-type:none}novo-pagination .pager .page{display:inline-block;padding:0 10px;line-height:2.4rem;font-size:var(--font-size-text);border-radius:2px;text-align:center;list-style-type:none;cursor:pointer;color:#39d}novo-pagination .pager .page:last-child{padding-right:0}novo-pagination .pager .page.disabled{opacity:.3;pointer-events:none}novo-pagination .pager .page.active{color:#39d;background-color:#f7f7f7;opacity:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { page: [{
                type: Input
            }], totalItems: [{
                type: Input
            }], itemsPerPage: [{
                type: Input
            }], rowOptions: [{
                type: Input
            }], label: [{
                type: Input
            }], disablePageSelection: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], itemsPerPageChange: [{
                type: Output
            }], onPageChange: [{
                type: Output
            }] } });

// NG2
class PercentageCell extends BaseRenderer {
}
PercentageCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: PercentageCell, deps: null, target: i0.ɵɵFactoryTarget.Component });
PercentageCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: PercentageCell, selector: "percentage-cell", usesInheritance: true, ngImport: i0, template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.PercentPipe, name: "percent" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: PercentageCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'percentage-cell',
                    template: ` <div class="percentage" *ngIf="value || value === 0">{{ value | percent: '1.0-2' }}</div> `,
                }]
        }] });

// NG2
class RowDetails {
    constructor(element, componentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
    }
    ngOnInit() {
        if (this.renderer) {
            if (this.renderer.prototype instanceof BaseRenderer) {
                const componentRef = this.componentUtils.append(this.renderer, this.container);
                componentRef.instance.data = this.data;
            }
            else {
                this.value = this.renderer(this.data);
            }
        }
        else {
            // this.value = this.row[this.column.name];
        }
    }
}
RowDetails.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RowDetails, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Component });
RowDetails.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: RowDetails, selector: "novo-row-details", inputs: { data: "data", renderer: "renderer" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: ` <span #container></span> <span>{{ value }}</span> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: RowDetails, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-row-details',
                    template: ` <span #container></span> <span>{{ value }}</span> `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], data: [{
                type: Input
            }], renderer: [{
                type: Input
            }] } });

// NG2
class NovoTableActionsElement {
}
NovoTableActionsElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableActionsElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoTableActionsElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoTableActionsElement, selector: "novo-table-actions", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableActionsElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-table-actions',
                    template: '<ng-content></ng-content>',
                }]
        }] });

// NG2
class TableCell {
    constructor(element, componentUtils) {
        this.element = element;
        this.componentUtils = componentUtils;
        this.value = '';
        this.element = element;
        this.componentUtils = componentUtils;
    }
    ngOnInit() {
        this.column._type = this.column.type || 'text';
        if (this.column.renderer) {
            if (this.column.renderer.prototype instanceof BaseRenderer) {
                this.column._type = 'custom';
                const componentRef = this.componentUtils.append(this.column.renderer, this.container);
                componentRef.instance.meta = this.column;
                componentRef.instance.data = this.row;
                componentRef.instance.value = this.form && this.hasEditor ? this.form.getRawValue()[this.column.name] : this.row[this.column.name];
                // TODO - save ref to this and update in the valueChanges below!!
            }
            else {
                // TODO - wtf to do here?
                this.value = this.column.renderer(this.row);
            }
        }
        else {
            this.value = this.form && this.hasEditor ? this.form.getRawValue()[this.column.name] : this.row[this.column.name];
        }
        if (this.form && this.hasEditor) {
            this.valueChangeSubscription = this.form.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
                this.value = value[this.column.name];
            });
        }
    }
    ngOnDestroy() {
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }
    onClick(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.column.onClick) {
            this.column.onClick(this.row);
        }
    }
}
TableCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableCell, deps: [{ token: i0.ElementRef }, { token: i1.ComponentUtils }], target: i0.ɵɵFactoryTarget.Component });
TableCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: TableCell, selector: "novo-table-cell", inputs: { column: "column", row: "row", form: "form", hasEditor: "hasEditor" }, viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <div [ngSwitch]="column._type">
      <span #container></span>
      <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
      <a *ngSwitchCase="'link'" (click)="onClick($event)">{{ value }}</a> <span *ngSwitchDefault>{{ value }}</span>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: DateCell, selector: "date-cell", inputs: ["value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-table-cell',
                    template: `
    <div [ngSwitch]="column._type">
      <span #container></span>
      <date-cell *ngSwitchCase="'date'" [value]="value"></date-cell>
      <a *ngSwitchCase="'link'" (click)="onClick($event)">{{ value }}</a> <span *ngSwitchDefault>{{ value }}</span>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.ComponentUtils }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], column: [{
                type: Input
            }], row: [{
                type: Input
            }], form: [{
                type: Input
            }], hasEditor: [{
                type: Input
            }] } });

// NG2
class TableFilter {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.onFilterChange = new EventEmitter();
        this.element = element;
        this.renderer = renderer;
    }
    ngOnInit() {
        this.ngOnChanges();
    }
    ngOnChanges(changes) {
        let label = '';
        if (this.config.freetextFilter) {
            label = this.config.freetextFilter;
        }
        else if (this.config.filter) {
            label = this.config.filter;
        }
        this.renderer.setProperty(this.element, 'value', label);
    }
    onChangeFilter(event) {
        clearTimeout(this.filterThrottle);
        if ("Enter" /* Key.Enter */ === event.key) {
            this.config.filter = event.target.value;
            this.onFilterChange.emit({ filtering: this.config });
        }
        else {
            this.filterThrottle = setTimeout(() => {
                this.config.filter = event.target.value;
                this.onFilterChange.emit({ filtering: this.config });
            }, 300);
        }
    }
    onClick(event) {
        Helpers.swallowEvent(event);
    }
}
TableFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableFilter, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
TableFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: TableFilter, selector: "[novoTableFilter]", inputs: { config: ["novoTableFilter", "config"] }, outputs: { onFilterChange: "onFilterChange" }, host: { listeners: { "keydown": "onChangeFilter($event)", "click": "onClick($event)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: TableFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoTableFilter]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { config: [{
                type: Input,
                args: ['novoTableFilter']
            }], onFilterChange: [{
                type: Output
            }], onChangeFilter: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

// NG2
class NovoTableFooterElement {
}
NovoTableFooterElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableFooterElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoTableFooterElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoTableFooterElement, selector: "novo-table-footer", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:flex}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableFooterElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-table-footer', template: '<ng-content></ng-content>', styles: [":host{display:flex}\n"] }]
        }] });

// NG2
class NovoTableHeaderElement {
}
NovoTableHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableHeaderElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoTableHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoTableHeaderElement, selector: "novo-table-header", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:10px}:host ::ng-deep button{margin-right:10px}:host ::ng-deep button:last-child{margin-right:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableHeaderElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-table-header', template: '<ng-content></ng-content>', styles: [":host{padding:10px}:host ::ng-deep button{margin-right:10px}:host ::ng-deep button:last-child{margin-right:0}\n"] }]
        }] });

// NG2
class ThOrderable {
    constructor(element) {
        this.element = element;
        this.onOrderChange = new EventEmitter();
        this.element = element;
    }
    get index() {
        let index = null;
        if (this.element.nativeElement && this.element.nativeElement.parentNode) {
            const children = Array.prototype.slice.call(this.element.nativeElement.parentNode.children);
            index = children.indexOf(this.element.nativeElement);
        }
        return index;
    }
    ngOnInit() {
        if (this.column.ordering) {
            this.element.nativeElement.setAttribute('draggable', true);
            this.table = this.findTable(this.element.nativeElement);
        }
    }
    onDragStart(event) {
        if (this.column.ordering) {
            this.element.nativeElement.classList.add('dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', JSON.stringify(this.column));
            this.clone = this.table.cloneNode(true);
            this.clone.style.position = 'absolute';
            this.clone.style.left = '100%';
            this.clone.style.width = '150px';
            this.deleteColumns(this.clone);
            document.body.appendChild(this.clone);
            event.dataTransfer.setDragImage(this.clone, 75, 30);
        }
    }
    deleteColumns(table) {
        // TODO: `table` should be immutable and this method should return the modified data to its caller
        if (table.rows.length > 0) {
            const allRows = table.rows;
            for (let i = 0; i < allRows.length; i++) {
                if (i > 10) {
                    table.deleteRow(-1);
                }
                else {
                    const cellLength = allRows[i].cells.length;
                    for (let c = 0; c < cellLength; c++) {
                        if (c < this.index) {
                            allRows[i].deleteCell(0);
                        }
                        else if (c > this.index) {
                            allRows[i].deleteCell(-1);
                        }
                    }
                }
            }
        }
    }
    findTable(start) {
        let htmlElementNode = start;
        while (htmlElementNode) {
            htmlElementNode = htmlElementNode.parentNode;
            if (htmlElementNode && htmlElementNode.tagName.toLowerCase() === 'table') {
                return htmlElementNode;
            }
        }
        return undefined;
    }
    onDrag(event) {
        Helpers.swallowEvent(event);
        return false;
    }
    onDragEnd(event) {
        Helpers.swallowEvent(event);
        this.element.nativeElement.classList.remove('over');
        this.element.nativeElement.classList.remove('dragging');
        document.body.removeChild(this.clone);
        return false;
    }
    onDrop(event) {
        Helpers.swallowEvent(event);
        this.element.nativeElement.classList.remove('over');
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        this.onOrderChange.emit({
            first: data,
            second: this.column,
        });
        return false;
    }
    onDragOver(event) {
        Helpers.swallowEvent(event);
        event.dataTransfer.dropEffect = 'move';
        return false;
    }
    onDragEnter(event) {
        this.element.nativeElement.classList.add('over');
        this.target = event.target;
    }
    onDragLeave(event) {
        this.element.nativeElement.classList.remove('over');
    }
}
ThOrderable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ThOrderable, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ThOrderable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: ThOrderable, selector: "[novoThOrderable]", inputs: { column: ["novoThOrderable", "column"] }, outputs: { onOrderChange: "onOrderChange" }, host: { listeners: { "dragstart": "onDragStart($event)", "dragover": "onDragOver($event)", "dragenter": "onDragEnter($event)", "dragleave": "onDragLeave($event)", "dragend": "onDragEnd($event)", "drop": "onDrop($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ThOrderable, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoThOrderable]',
                    host: {
                        '(dragstart)': 'onDragStart($event)',
                        '(dragover)': 'onDragOver($event)',
                        '(dragenter)': 'onDragEnter($event)',
                        '(dragleave)': 'onDragLeave($event)',
                        '(dragend)': 'onDragEnd($event)',
                        '(drop)': 'onDrop($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { column: [{
                type: Input,
                args: ['novoThOrderable']
            }], onOrderChange: [{
                type: Output
            }] } });

// NG2
class ThSortable {
    constructor() {
        this.onSortChange = new EventEmitter();
    }
    onToggleSort(event) {
        if (event) {
            // event.preventDefault();
        }
        if (this.config && this.column && this.config.sorting !== false && this.column.sorting !== false) {
            switch (this.column.sort) {
                case 'asc':
                    this.column.sort = 'desc';
                    break;
                default:
                    this.column.sort = 'asc';
                    break;
            }
            this.onSortChange.emit(this.column);
        }
    }
}
ThSortable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ThSortable, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ThSortable.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: ThSortable, selector: "[novoThSortable]", inputs: { config: ["novoThSortable", "config"], column: "column" }, outputs: { onSortChange: "onSortChange" }, host: { listeners: { "click": "onToggleSort($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ThSortable, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoThSortable]',
                    host: {
                        '(click)': 'onToggleSort($event)',
                    },
                }]
        }], propDecorators: { config: [{
                type: Input,
                args: ['novoThSortable']
            }], column: [{
                type: Input
            }], onSortChange: [{
                type: Output
            }] } });

// NG2
class NovoTableExtrasModule {
}
NovoTableExtrasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableExtrasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTableExtrasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoTableExtrasModule, declarations: [NovoTableHeaderElement,
        NovoTableFooterElement,
        NovoTableActionsElement,
        NovoTableKeepFilterFocus,
        Pagination,
        RowDetails,
        TableCell,
        TableFilter,
        ThOrderable,
        ThSortable,
        DateCell,
        PercentageCell,
        NovoDropdownCell], imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule], exports: [NovoTableHeaderElement,
        NovoTableFooterElement,
        NovoTableActionsElement,
        NovoTableKeepFilterFocus,
        Pagination,
        RowDetails,
        TableCell,
        TableFilter,
        ThOrderable,
        ThSortable,
        DateCell,
        PercentageCell,
        NovoDropdownCell] });
NovoTableExtrasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableExtrasModule, imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableExtrasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoSelectModule, NovoDropdownModule, NovoButtonModule, NovoCommonModule],
                    declarations: [
                        NovoTableHeaderElement,
                        NovoTableFooterElement,
                        NovoTableActionsElement,
                        NovoTableKeepFilterFocus,
                        Pagination,
                        RowDetails,
                        TableCell,
                        TableFilter,
                        ThOrderable,
                        ThSortable,
                        DateCell,
                        PercentageCell,
                        NovoDropdownCell,
                    ],
                    exports: [
                        NovoTableHeaderElement,
                        NovoTableFooterElement,
                        NovoTableActionsElement,
                        NovoTableKeepFilterFocus,
                        Pagination,
                        RowDetails,
                        TableCell,
                        TableFilter,
                        ThOrderable,
                        ThSortable,
                        DateCell,
                        PercentageCell,
                        NovoDropdownCell,
                    ],
                }]
        }] });

// NG2
// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
var NovoTableMode;
(function (NovoTableMode) {
    NovoTableMode[NovoTableMode["VIEW"] = 1] = "VIEW";
    NovoTableMode[NovoTableMode["EDIT"] = 2] = "EDIT";
})(NovoTableMode || (NovoTableMode = {}));
class NovoTableElement {
    constructor(labels, formUtils, builder, cdr) {
        this.labels = labels;
        this.formUtils = formUtils;
        this.builder = builder;
        this.cdr = cdr;
        this.config = {};
        this.columns = [];
        this.skipSortAndFilterClear = false;
        this.mode = NovoTableMode.VIEW;
        this.editable = false;
        this.rowIdentifier = 'id';
        this.name = 'table';
        this.onRowClick = new EventEmitter();
        this.onRowSelect = new EventEmitter();
        this.onTableChange = new EventEmitter();
        this._rows = [];
        this.selected = [];
        this.activeId = 0;
        this.master = false;
        this.expandAll = false;
        this.indeterminate = false;
        this.lastPage = 0;
        this.selectedPageCount = 0;
        this.showSelectAllMessage = false;
        this.pagedData = [];
        // Map to keep track of what dropdowns are toggled
        // Used to properly *ngIf the <novo-optgroup> so that the keepFilterFocused Directive
        // will properly fire the ngAfterViewInit event
        this.toggledDropdownMap = {};
        this.NovoTableMode = NovoTableMode;
        this.tableForm = new UntypedFormGroup({});
        this.footers = [];
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        this.loading = false;
        notify('[Deprecated]: The table is deprecated. Please migrate to novo-data-tables!');
    }
    set rows(rows) {
        this.dataProvider = rows;
        if (rows && rows.length > 0) {
            this.setupColumnDefaults();
        }
        // this is a temporary/hacky fix until async dataloading is handled within the table
        if (!this.skipSortAndFilterClear) {
            this.clearAllSortAndFilters();
        }
    }
    get rows() {
        return this._rows;
    }
    set dataProvider(dp) {
        this._dataProvider = Array.isArray(dp) ? new PagedArrayCollection(dp) : dp;
        this._dataProvider.dataChange.pipe(debounceTime(100)).subscribe((event) => {
            switch (event.type) {
                case CollectionEvent.CHANGE:
                    this._rows = event.data;
                    // Setup form
                    this.tableForm = this.builder.group({
                        rows: this.builder.array([]),
                    });
                    // Remove all selection on sort change if selection is on
                    if (this.config.rowSelectionStyle === 'checkbox') {
                        this.pagedData = event.data;
                        this.pageSelected = this.pagedData.filter((r) => r._selected);
                        this.rowSelectHandler();
                    }
                    // Find that columns we might need to sum up via the footer
                    let columnsToSum = [];
                    const columnSums = {};
                    if (this.config.footers) {
                        this.config.footers.forEach((config) => {
                            columnsToSum.push(...config.columns);
                        });
                        // Only have unique columns, filter out duplicates
                        columnsToSum = columnsToSum.filter((item, index, array) => array.indexOf(item) === index);
                    }
                    // Make a form for each row
                    const tableFormRows = this.tableForm.controls.rows;
                    this._rows.forEach((row, index) => {
                        const rowControls = [];
                        row.controls = {};
                        row._editing = {};
                        row._expanded = this.config.expandAll;
                        row.rowId = this._rows.length;
                        this.columns.forEach((column) => {
                            // Use the control passed or use a ReadOnlyControl so that the form has the values
                            const control = column.editorConfig
                                ? ControlFactory.create(column.editorType, column.editorConfig)
                                : new ReadOnlyControl({ key: column.name });
                            row.controls[column.name] = control;
                            rowControls.push(control);
                        });
                        this.formUtils.setInitialValues(rowControls, row, false);
                        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
                        // Setup the total footer if configured
                        // Array of keys to total
                        if (columnsToSum.length !== 0) {
                            columnsToSum.forEach((column) => {
                                if (Helpers.isBlank(columnSums[column])) {
                                    columnSums[column] = 0;
                                }
                                columnSums[column] += row[column];
                            });
                        }
                    });
                    if (this.mode === NovoTableMode.EDIT) {
                        this.setTableEdit();
                    }
                    // Setup the footers (if any)
                    if (this.config.footers) {
                        this.footers = [];
                        this.config.footers.forEach((footerConfig, footerConfigIndex) => {
                            const footer = {};
                            footer[footerConfig.labelColumn] = footerConfig.label;
                            footerConfig.columns.forEach((column) => {
                                if (footerConfig.method === 'AVG' && this._rows.length !== 0) {
                                    footer[column] = columnSums[column] / this._rows.length;
                                }
                                else {
                                    footer[column] = columnSums[column];
                                }
                            });
                            this.footers.push(footer);
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        if (this.config.paging) {
            this._dataProvider.page = this.config.paging.current;
            this._dataProvider.pageSize = this.config.paging.itemsPerPage;
        }
        else {
            // Paging turned off, return basically all of the data
            this._dataProvider.page = 1;
            this._dataProvider.pageSize = 500;
        }
        if (dp && dp.length > 0) {
            this.setupColumnDefaults();
        }
        this._dataProvider.refresh();
    }
    get dataProvider() {
        return this._dataProvider;
    }
    get editing() {
        return this.mode === NovoTableMode.EDIT;
    }
    get formValue() {
        return this.tableForm.getRawValue();
    }
    onDropdownToggled(event, column) {
        this.toggledDropdownMap[column] = event;
        this.cdr.markForCheck();
    }
    focusInput() {
        if (this.filterInputs && this.filterInputs.length) {
            this.filterInputs.forEach((filterInput) => {
                if (filterInput.nativeElement) {
                    setTimeout(() => filterInput.nativeElement.focus(), 0);
                }
            });
        }
    }
    onPageChange(event) {
        // this.dataProvider.page = event.page;
        // this.dataProvider.pageSize = event.itemsPerPage;
    }
    getOptionDataAutomationId(option) {
        if (!Helpers.isBlank(option.value)) {
            return option.value;
        }
        return option;
    }
    setupColumnDefaults() {
        // Check columns for cell option types
        this.columns.forEach((column) => {
            if (column && column.type) {
                switch (column.type) {
                    case 'date':
                        // Set options based on dates if there are none
                        column.options = column.options || this.getDefaultOptions(column);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    ngDoCheck() {
        if (this.config.paging && this.config.paging.current !== this.lastPage) {
            this.rowSelectHandler();
            this.showSelectAllMessage = false;
        }
        this.lastPage = this.config.paging ? this.config.paging.current : 1;
    }
    getPageStart() {
        return this.config.paging ? (this.dataProvider.page - 1) * this.dataProvider.pageSize : 0;
    }
    getPageEnd() {
        return this.config.paging && this.dataProvider.pageSize > -1 ? this.getPageStart() + this.dataProvider.pageSize : this.rows.length;
    }
    getRowControlForm(i) {
        const tableFormRows = this.tableForm.controls.rows;
        return tableFormRows.controls[i];
    }
    onFilterClick(column, filter) {
        if (filter.range && !column.calendarShow) {
            column.calenderShow = true;
            return;
        }
        if (Array.isArray(column.filter) && column.multiple) {
            if (~column.filter.indexOf(filter)) {
                // Remove filter
                column.filter.splice(column.filter.indexOf(filter), 1);
                if (filter.range) {
                    column.calenderShow = false;
                }
                if (column.filter.length === 0) {
                    column.filter = null;
                }
            }
            else {
                // Add filter
                column.filter.push(filter);
            }
        }
        else if (column.multiple) {
            column.filter = new Array();
            column.filter.push(Helpers.isBlank(filter.value) ? filter : filter.value);
        }
        else {
            column.filter = Helpers.isBlank(filter.value) ? filter : filter.value;
        }
        this.onFilterChange();
    }
    onFilterClear(column) {
        setTimeout(() => {
            column.filter = null;
            column.freetextFilter = null;
            this.onFilterChange();
            if (column.originalOptions) {
                column.options = column.originalOptions;
            }
        });
    }
    clearAllSortAndFilters() {
        if (this.config.filtering) {
            this.columns.forEach((column) => {
                column.filter = null;
                column.sort = null;
            });
        }
    }
    /**
     * @description This method updates the row data to reflect the active filters.
     */
    onFilterChange(event) {
        if (this.config.filtering) {
            // Array of filters
            const filters = this.columns.filter((col) => !Helpers.isEmpty(col.filter));
            if (filters.length) {
                let query = {};
                for (const column of filters) {
                    if (Helpers.isFunction(column.match)) {
                        query[column.name] = (value, record) => {
                            return column.match(record, column.filter);
                        };
                    }
                    else if (column.preFilter && Helpers.isFunction(column.preFilter)) {
                        query = Object.assign({}, query, column.preFilter(this.escapeCharacters(column.filter)));
                    }
                    else if (Array.isArray(column.filter)) {
                        // The filters are an array (multi-select), check value
                        let options = column.filter;
                        // We have an array of {value: '', labels: ''}
                        if (options[0].value || options[0].label) {
                            options = column.filter.map((opt) => opt.value);
                        }
                        query[column.name] = { any: options };
                    }
                    else if (column.type && column.type === 'date') {
                        if (column.filter.startDate && column.filter.endDate) {
                            query[column.name] = {
                                min: DateUtil.startOfDay(column.filter.startDate),
                                max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(column.filter.endDate), 1)),
                            };
                        }
                        else {
                            query[column.name] = {
                                min: column.filter.min ? DateUtil.addDays(startOfToday(), column.filter.min) : startOfToday(),
                                max: column.filter.max ? DateUtil.addDays(startOfTomorrow(), column.filter.max) : startOfTomorrow(),
                            };
                        }
                    }
                    else {
                        query[column.name] = column.filter;
                    }
                }
                if (Helpers.isFunction(this.config.filtering)) {
                    this.config.filtering(query);
                }
                else {
                    this._dataProvider.filter = query;
                }
            }
            else {
                this._dataProvider.filter = {};
            }
            // Trickle down to keep sort
            // this.onSortChange(this.currentSortColumn);
            this.fireTableChangeEvent();
            // If paging, reset page
            if (this.config.paging) {
                this.config.paging.current = 1;
            }
            // Remove all selection on sort change if selection is on
            if (this.config.rowSelectionStyle === 'checkbox') {
                this.selectAll(false);
            }
        }
    }
    escapeCharacters(filter) {
        if (typeof filter === 'string') {
            return filter.replace(/'/g, "''");
        }
        return filter;
    }
    isFilterActive(column, filter) {
        // TODO: This needs to be refactored
        let isActive = false;
        if (column && !Helpers.isBlank(column.filter) && !Helpers.isBlank(filter)) {
            if (Array.isArray(column.filter)) {
                if (typeof filter !== 'string') {
                    isActive = column.filter.some((item) => {
                        return item.label === filter.label;
                    });
                }
                else {
                    isActive = column.filter.includes(filter);
                }
            }
            else {
                if (typeof column.filter === typeof filter) {
                    isActive = column.filter === filter;
                }
                else {
                    isActive = column.filter === filter.value;
                }
            }
        }
        return isActive;
    }
    onSortChange(column) {
        this.currentSortColumn = column;
        const sortedColumns = this.columns.filter((thisColumn) => {
            return thisColumn.sort && thisColumn !== this.currentSortColumn;
        });
        for (const sortedColumn of sortedColumns) {
            sortedColumn.sort = null;
        }
        if (column) {
            if (Helpers.isFunction(this.config.sorting)) {
                this.config.sorting();
            }
            else if (Helpers.isFunction(column.preSort)) {
                this._dataProvider.sort = [].concat(column.preSort(column));
            }
            else {
                this._dataProvider.sort = [{ field: column.compare || column.name, reverse: column.sort === 'desc' }];
            }
        }
        // Fire table change event
        // this.fireTableChangeEvent();
        // If paging, reset page
        if (this.config.paging) {
            this.config.paging.current = 1;
        }
        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.selectAll(false);
        }
    }
    fireTableChangeEvent() {
        // Construct a table change object
        const onTableChange = {};
        const filters = this.columns.filter((col) => col.filter && col.filter.length);
        onTableChange.filter = filters.length ? filters : false;
        onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
        onTableChange.rows = this.rows;
        // Emit event
        this.onTableChange.emit(onTableChange);
    }
    findColumnIndex(value) {
        for (let i = 0; i < this.columns.length; i += 1) {
            if (this.columns[i].name === value) {
                return i;
            }
        }
        return null;
    }
    onOrderChange(event) {
        const oldIndex = this.findColumnIndex(event.first.name);
        const newIndex = this.findColumnIndex(event.second.name);
        this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
        this.onSortChange(this.currentSortColumn);
    }
    expandAllOnPage(expanded) {
        this.config.expandAll = !expanded;
        for (const row of this.dataProvider.list) {
            row._expanded = this.config.expandAll;
        }
    }
    selectPage(data) {
        if (!this.master) {
            this.selectAll(false);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
            this.showSelectAllMessage = false;
        }
        else {
            this.indeterminate = false;
            // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            for (const row of this.pagedData) {
                row._selected = this.master;
            }
            this.selected = this.dataProvider.list.filter((r) => r._selected);
            this.pageSelected = this.pagedData.filter((r) => r._selected);
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.dataProvider.total;
        }
        this.cdr.detectChanges();
    }
    selectAll(value) {
        this.master = value;
        this.indeterminate = false;
        for (const row of this.dataProvider.list) {
            row._selected = value;
        }
        this.selected = value ? this.dataProvider.list : [];
        this.showSelectAllMessage = false;
        this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        this.rowSelectHandler();
    }
    rowSelectHandler(data) {
        // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter((r) => r._selected);
        this.selected = this.dataProvider.list.filter((r) => r._selected);
        if (this.pageSelected.length === 0) {
            this.master = false;
            this.indeterminate = false;
        }
        else if (this.pageSelected.length === this.pagedData.length) {
            this.master = true;
            this.indeterminate = false;
        }
        else {
            this.master = false;
            this.indeterminate = true;
            // Breaking the selected page count
            this.showSelectAllMessage = false;
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        }
        this.emitSelected(this.selected);
    }
    emitSelected(selected) {
        this.onRowSelect.emit({ length: selected.length, selected });
    }
    rowClickHandler(row) {
        if (this.config.rowSelect) {
            this.activeId = row.id || 0;
            this.onRowClick.emit(row);
        }
    }
    getDefaultOptions(column) {
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/elements/issues/116
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
        if (column && column.range) {
            opts.push({
                label: this.labels.customDateRange,
                range: true,
            });
        }
        return opts;
    }
    onCalenderSelect(column, event) {
        setTimeout(() => {
            if (event.startDate && event.endDate) {
                this.onFilterChange();
            }
        }, 10);
    }
    onFilterKeywords(config) {
        if (config && config.filtering && config.filtering.freetextFilter) {
            const filterKeywords = config.filtering.freetextFilter.toLowerCase();
            if (!config.filtering.originalOptions) {
                config.filtering.originalOptions = config.filtering.options;
            }
            const newOptions = config.filtering.originalOptions.filter((option) => {
                let value = option && option.label ? option.label : option;
                value = value.toLowerCase() ? value.toLowerCase() : value;
                if (value === filterKeywords) {
                    return true;
                }
                else if (~value.indexOf(filterKeywords) || ~value.indexOf(filterKeywords)) {
                    return true;
                }
                return false;
            });
            config.filtering.options = newOptions;
            config.filtering.filter = config.filtering.freetextFilter;
        }
        else {
            config.filtering.options = config.filtering.originalOptions;
        }
        this.onFilterChange();
    }
    /**
     * @description Sets the Table into EDIT mode, based on the row/column passed you can enter in a few states
     * (1) setTableEdit() - don't pass any to put the FULL table into edit mode
     * (2) setTableEdit(1) - pass only row to put that FULL row of the table into edit mode
     * (3) setTableEdit(1, 1) - pass row and column to put that column of the row of the table into edit mode
     * @memberOf NovoTableElement
     */
    setTableEdit(rowNumber, columnNumber) {
        this.mode = NovoTableMode.EDIT;
        this._dataProvider.edit();
        this._rows.forEach((row, rowIndex) => {
            row._editing = row._editing || {};
            this.columns.forEach((column, columnIndex) => {
                if (column.viewOnly) {
                    row._editing[column.name] = false;
                }
                else if (Helpers.isEmpty(rowNumber) && Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers.isEmpty(rowNumber) && rowIndex === Number(rowNumber) && Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers.isEmpty(rowNumber) &&
                    !Helpers.isEmpty(columnNumber) &&
                    rowIndex === Number(rowNumber) &&
                    columnIndex === Number(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else {
                    row._editing[column.name] = false;
                }
            });
        });
    }
    /**
     * @description Leaves edit mode for the Table and puts everything back to VIEW only
     * @memberOf NovoTableElement
     * @param cancel - whether or not to save data or undo
     */
    leaveEditMode(cancel) {
        this.mode = NovoTableMode.VIEW;
        this._rows.forEach((row) => {
            row._editing = row._editing || {};
            this.columns.forEach((column) => {
                row._editing[column.name] = false;
            });
        });
        if (cancel) {
            this._dataProvider.undo();
        }
        else {
            this._dataProvider.commit();
        }
        this.hideToastMessage();
    }
    /**
     * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
     * @memberOf NovoTableElement
     */
    addEditableRow(defaultValue = {}) {
        const tableFormRows = this.tableForm.controls.rows;
        const row = {};
        const rowControls = [];
        row.controls = {};
        row._editing = {};
        row.rowId = this._rows.length + 1;
        this.columns.forEach((column) => {
            // Use the control passed or use a ReadOnlyControl so that the form has the values
            const control = column.editorConfig
                ? ControlFactory.create(column.editorType, column.editorConfig)
                : new ReadOnlyControl({ key: column.name });
            control.value = null; // remove copied column value
            row.controls[column.name] = control;
            row._editing[column.name] = !column.viewOnly;
            rowControls.push(control);
        });
        this.formUtils.setInitialValues(rowControls, defaultValue, false);
        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
        this._rows.push(row);
    }
    /**
     * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
     * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
     * { id: ID_OF_RECORD, key: value } -- data that was updated
     * { id: undefined, key: value } -- data that was added
     * @memberOf NovoTableElement
     */
    validateAndGetUpdatedData() {
        if (this.tableForm && this.tableForm.controls && this.tableForm.controls.rows) {
            const changedRows = [];
            const errors = [];
            // Go over the FormArray's controls
            this.tableForm.controls.rows.controls.forEach((formGroup, index) => {
                let changedRow = null;
                let error = null;
                // Go over the form group controls
                Object.keys(formGroup.controls).forEach((key) => {
                    const control = formGroup.controls[key];
                    // Handle value changing
                    if (control && control.dirty && !control.errors) {
                        if (!changedRow) {
                            // Append the ID, so we have some key to save against
                            changedRow = {};
                            if (this._rows[index].id) {
                                changedRow.id = this._rows[index].id;
                            }
                        }
                        // If dirty, grab value off the form
                        changedRow[key] = this.tableForm.getRawValue().rows[index][key];
                        // Set value back to row (should be already done via the server call, but do it anyway)
                        this._rows[index][key] = changedRow[key];
                    }
                    else if (control && control.errors) {
                        // Handle errors
                        if (!error) {
                            error = {};
                        }
                        error[key] = control.errors;
                        control.markAsDirty();
                        control.markAsTouched();
                    }
                });
                if (changedRow) {
                    changedRows.push(changedRow);
                }
                if (error) {
                    errors.push({ errors: error, row: this._rows[index], index });
                }
            });
            // Return errors if any, otherwise return the changed rows
            if (errors.length === 0) {
                return { changed: changedRows };
            }
            return { errors };
        }
    }
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    cancelEditing() {
        this.leaveEditMode(true);
    }
    /**
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    saveChanges() {
        this.leaveEditMode(false);
    }
    /**
     * @description Displays a toast message inside of the table
     * @memberOf NovoTableElement
     */
    displayToastMessage(toast, hideDelay) {
        this.loading = false;
        this.toast = toast;
        if (hideDelay) {
            setTimeout(() => this.hideToastMessage(), hideDelay);
        }
    }
    /**
     * @description Force hide the toast message
     * @memberOf NovoTableElement
     */
    hideToastMessage() {
        this.toast = null;
        // Hack to make the table display properly after hiding the toast
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = true;
        setTimeout(() => {
            this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        });
    }
    /**
     * @description display the loading overlay on the table
     * @memberOf NovoTableElement
     */
    toggleLoading(show) {
        this.loading = show;
    }
    /**
     * @description hide a column in edit or view mode
     * @memberOf NovoTableElement
     */
    isColumnHidden(column) {
        return this.editing ? !!column.hideColumnOnEdit : !!column.hideColumnOnView;
    }
}
NovoTableElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableElement, deps: [{ token: i1.NovoLabelService }, { token: i2$2.FormUtils }, { token: i3$1.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTableElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: NovoTableElement, selector: "novo-table", inputs: { config: "config", columns: "columns", theme: "theme", skipSortAndFilterClear: "skipSortAndFilterClear", mode: "mode", editable: "editable", rowIdentifier: "rowIdentifier", name: "name", rows: "rows", dataProvider: "dataProvider" }, outputs: { onRowClick: "onRowClick", onRowSelect: "onRowSelect", onTableChange: "onTableChange" }, host: { properties: { "attr.theme": "theme", "class.editing": "mode === NovoTableMode.EDIT", "class.novo-table-loading": "loading" }, classAttribute: "novo-table" }, viewQueries: [{ propertyName: "filterInputs", predicate: ["filterInput"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <header *ngIf="columns.length">
      <ng-content select="novo-table-header"></ng-content>
      <div class="header-actions">
        <novo-pagination
          *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
          [rowOptions]="config.paging.rowOptions"
          [disablePageSelection]="config.paging.disablePageSelection"
          [(page)]="dataProvider.page"
          [(itemsPerPage)]="dataProvider.pageSize"
          [totalItems]="dataProvider.total"
          (onPageChange)="onPageChange($event)"
        >
        </novo-pagination>
        <ng-content select="novo-table-actions"></ng-content>
      </div>
    </header>
    <div class="novo-table-loading-overlay" *ngIf="loading || dataProvider.isLoading()">
      <novo-loading></novo-loading>
    </div>
    <novo-toast *ngIf="toast" [theme]="toast?.theme" [icon]="toast?.icon" [message]="toast?.message"></novo-toast>
    <div class="table-container" *ngIf="!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast">
      <novo-form hideHeader="true" [form]="tableForm">
        <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
          <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
          <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)">
            <tr role="row">
              <!-- DETAILS -->
              <th class="row-actions" *ngIf="config.hasDetails">
                <novo-button
                  theme="icon"
                  icon="next"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="!config.expandAll"
                  data-automation-id="expand-all"
                ></novo-button>
                <novo-button
                  theme="icon"
                  icon="sort-desc"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="config.expandAll"
                  data-automation-id="collapse-all"
                ></novo-button>
              </th>
              <!-- CHECKBOX -->
              <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                <novo-checkbox
                  [(ngModel)]="master"
                  [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length"
                  (ngModelChange)="selectPage($event)"
                  data-automation-id="select-all-checkbox"
                  [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage"
                  tooltipPosition="right"
                ></novo-checkbox>
              </th>
              <!-- TABLE HEADERS -->
              <th
                *ngFor="let column of columns"
                [ngClass]="{
                  'mass-action': config?.rowSelectionStyle === 'checkbox',
                  actions: column?.actions?.items?.length > 0,
                  preview: column?.name === 'preview'
                }"
                [novoThOrderable]="column"
                (onOrderChange)="onOrderChange($event)"
                [hidden]="isColumnHidden(column)"
              >
                <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                  <!-- LABEL & SORT ARROWS -->
                  <div
                    class="th-title"
                    [ngClass]="config.sorting !== false && column.sorting !== false ? 'sortable' : ''"
                    [novoThSortable]="config"
                    [column]="column"
                    (onSortChange)="onSortChange($event)"
                  >
                    <label>{{ column.title || column.label }}</label>
                    <div
                      class="table-sort-icons"
                      tooltipPosition="bottom"
                      [tooltip]="labels.sort"
                      [ngClass]="column.sort || ''"
                      *ngIf="config.sorting !== false && column.sorting !== false"
                    >
                      <i class="bhi-arrow-up"></i>
                      <i class="bhi-arrow-down"></i>
                    </div>
                  </div>
                  <!-- FILTER DROP-DOWN -->
                  <novo-dropdown
                    side="default"
                    *ngIf="config.filtering !== false && column.filtering !== false"
                    class="column-filters"
                    (toggled)="onDropdownToggled($event, column.name)"
                    parentScrollSelector=".table-container"
                    containerClass="table-dropdown"
                  >
                    <novo-button
                      type="button"
                      theme="icon"
                      icon="filter"
                      tooltipPosition="bottom"
                      [tooltip]="labels.filters"
                      [class.filtered]="column.filter || column.filter === false"
                      (click)="focusInput()"
                    ></novo-button>
                    <!-- FILTER OPTIONS LIST -->
                    <novo-optgroup
                      *ngIf="
                        (column?.options?.length || column?.originalOptions?.length) &&
                        column?.type !== 'date' &&
                        toggledDropdownMap[column.name]
                      "
                    >
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button
                            theme="dialogue"
                            color="negative"
                            icon="times"
                            (click)="onFilterClear(column)"
                            *ngIf="column.filter || column.filter === false"
                          >
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          *ngIf="!!column.allowCustomTextOption"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterKeywords($event)"
                          [(ngModel)]="column.freetextFilter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                      <novo-option
                        [ngClass]="{ active: isFilterActive(column, option) }"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [attr.data-automation-id]="getOptionDataAutomationId(option)"
                      >
                        <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER SEARCH INPUT -->
                    <novo-optgroup *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterChange($event)"
                          [(ngModel)]="column.filter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER DATE OPTIONS -->
                    <novo-optgroup *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" *ngIf="!column.calenderShow" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                      </novo-option>
                      <novo-option
                        [class.active]="isFilterActive(column, option)"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [keepOpen]="option.range"
                        [hidden]="column.calenderShow"
                        [attr.data-automation-id]="option?.label || option"
                      >
                        {{ option?.label || option }}
                        <novo-icon novoSuffix color="positive" *ngIf="isFilterActive(column, option)">check</novo-icon>
                      </novo-option>
                      <novo-option class="calendar-container" *ngIf="column.calenderShow" keepOpen novoInert>
                        <novo-stack>
                          <div class="back-link" (click)="column.calenderShow = false">
                            <i class="bhi-previous"></i>{{ labels.backToPresetFilters }}
                          </div>
                          <novo-date-picker
                            (onSelect)="onCalenderSelect(column, $event)"
                            [(ngModel)]="column.filter"
                            mode="range"
                          ></novo-date-picker>
                        </novo-stack>
                      </novo-option>
                    </novo-optgroup>
                  </novo-dropdown>
                </div>
              </th>
            </tr>
          </thead>
          <!-- TABLE DATA -->
          <tbody *ngIf="!dataProvider.isEmpty() || editing">
            <tr
              class="table-selection-row"
              *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled"
              data-automation-id="table-selection-row"
            >
              <td colspan="100%">
                {{ labels.selectedRecords(selected.length) }}
                <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{ labels.totalRecords(dataProvider.total) }}</a>
              </td>
            </tr>
            <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
              <tr
                class="table-row"
                [ngClass]="row.customClass || ''"
                [id]="name + '-' + row[rowIdentifier]"
                [attr.data-automation-id]="row.id"
                (click)="rowClickHandler(row)"
                [class.active]="row.id === activeId"
              >
                <td class="row-actions" *ngIf="config.hasDetails">
                  <novo-button theme="icon" icon="next" (click)="row._expanded = !row._expanded" *ngIf="!row._expanded"></novo-button>
                  <novo-button theme="icon" icon="sort-desc" (click)="row._expanded = !row._expanded" *ngIf="row._expanded"></novo-button>
                </td>
                <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                  <novo-checkbox
                    [(ngModel)]="row._selected"
                    (ngModelChange)="rowSelectHandler(row)"
                    data-automation-id="select-row-checkbox"
                  ></novo-checkbox>
                </td>
                <td
                  *ngFor="let column of columns"
                  [attr.data-automation-id]="column.id || column.name"
                  [class.novo-form-row]="editable"
                  [hidden]="isColumnHidden(column)"
                >
                  <novo-table-cell
                    *ngIf="row._editing && !row._editing[column.name]"
                    [hasEditor]="editable"
                    [column]="column"
                    [row]="row"
                    [form]="getRowControlForm(i)"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    condensed="true"
                    [form]="getRowControlForm(i)"
                    [control]="row.controls[column.name]"
                  ></novo-control>
                </td>
              </tr>
              <tr
                class="details-row"
                *ngIf="config.hasDetails"
                [hidden]="!row._expanded"
                [attr.data-automation-id]="'details-row-' + row.id"
              >
                <td class="row-actions"></td>
                <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? columns.length + 1 : columns.length">
                  <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                </td>
              </tr>
            </ng-template>
          </tbody>
          <!-- NO TABLE DATA PLACEHOLDER -->
          <tbody
            class="table-message"
            *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing"
            data-automation-id="empty-table"
          >
            <tr>
              <td colspan="100%">
                <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- NO MATCHING RECORDS -->
          <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
            <tr>
              <td colspan="100%">
                <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- TABLE DATA ERROR PLACEHOLDER -->
          <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
            <tr>
              <td colspan="100%">
                <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                  <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot *ngIf="!config.footers" [ngClass]="dataProvider.length % 2 == 0 ? 'odd' : 'even'">
            <tr>
              <td colspan="100%">
                <ng-content select="novo-table-footer"></ng-content>
              </td>
            </tr>
          </tfoot>
          <tfoot *ngFor="let footer of footers; let i = index" class="novo-table-total-footer">
            <tr>
              <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">
                {{ footer[column.name] }}
              </td>
            </tr>
          </tfoot>
        </table>
      </novo-form>
    </div>
  `, isInline: true, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background:rgba(0,0,0,.07);z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:rgba(74,137,220,.2)}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#ffffff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:auto;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n + 2),.table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000000;color:#fff}novo-table[theme=black]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#ffffff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#3399dd;color:#fff}novo-table[theme=company]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#44bb77;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#aa6699;color:#fff}novo-table[theme=lead]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#ffaa44;color:#fff}novo-table[theme=contact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#ffaa44;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#662255;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#bb5566;color:#fff}novo-table[theme=job]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#bb5566;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i2$2.NovoControlElement, selector: "novo-control", inputs: ["control", "form", "condensed", "autoFocus"], outputs: ["change", "edit", "save", "delete", "upload", "blur", "focus"] }, { kind: "component", type: i2$2.NovoFormElement, selector: "novo-form", inputs: ["form", "layout", "hideHeader"] }, { kind: "directive", type: NovoTableKeepFilterFocus, selector: "[keepFilterFocused]" }, { kind: "component", type: Pagination, selector: "novo-pagination", inputs: ["page", "totalItems", "itemsPerPage", "rowOptions", "label", "disablePageSelection"], outputs: ["pageChange", "itemsPerPageChange", "onPageChange"] }, { kind: "component", type: RowDetails, selector: "novo-row-details", inputs: ["data", "renderer"] }, { kind: "component", type: TableCell, selector: "novo-table-cell", inputs: ["column", "row", "form", "hasEditor"] }, { kind: "directive", type: TableFilter, selector: "[novoTableFilter]", inputs: ["novoTableFilter"], outputs: ["onFilterChange"] }, { kind: "directive", type: ThOrderable, selector: "[novoThOrderable]", inputs: ["novoThOrderable"], outputs: ["onOrderChange"] }, { kind: "directive", type: ThSortable, selector: "[novoThSortable]", inputs: ["novoThSortable", "column"], outputs: ["onSortChange"] }, { kind: "component", type: i12.NovoToastElement, selector: "novo-toast", inputs: ["appearance", "theme", "icon", "title", "action", "hasDialogue", "link", "isCloseable", "message"], outputs: ["closed"] }, { kind: "component", type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "directive", type: i14.TooltipDirective, selector: "[tooltip]", inputs: ["tooltip", "tooltipPosition", "tooltipType", "tooltipSize", "tooltipBounce", "tooltipNoAnimate", "tooltipRounded", "tooltipAlways", "tooltipActive", "tooltipPreline", "removeTooltipArrow", "tooltipAutoPosition", "tooltipIsHTML"] }, { kind: "component", type: i2$1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i16.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i17.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i18.NovoCheckboxElement, selector: "novo-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "id", "name", "label", "disabled", "layoutOptions", "color", "value", "tabIndex", "required", "checked", "indeterminate"], outputs: ["change", "indeterminateChange", "onSelect"] }, { kind: "component", type: i19.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i19.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "directive", type: i19.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i20.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i21.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-table', host: {
                        class: 'novo-table',
                        '[attr.theme]': 'theme',
                        '[class.editing]': 'mode === NovoTableMode.EDIT',
                        '[class.novo-table-loading]': 'loading',
                    }, template: `
    <header *ngIf="columns.length">
      <ng-content select="novo-table-header"></ng-content>
      <div class="header-actions">
        <novo-pagination
          *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
          [rowOptions]="config.paging.rowOptions"
          [disablePageSelection]="config.paging.disablePageSelection"
          [(page)]="dataProvider.page"
          [(itemsPerPage)]="dataProvider.pageSize"
          [totalItems]="dataProvider.total"
          (onPageChange)="onPageChange($event)"
        >
        </novo-pagination>
        <ng-content select="novo-table-actions"></ng-content>
      </div>
    </header>
    <div class="novo-table-loading-overlay" *ngIf="loading || dataProvider.isLoading()">
      <novo-loading></novo-loading>
    </div>
    <novo-toast *ngIf="toast" [theme]="toast?.theme" [icon]="toast?.icon" [message]="toast?.message"></novo-toast>
    <div class="table-container" *ngIf="!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast">
      <novo-form hideHeader="true" [form]="tableForm">
        <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
          <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
          <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)">
            <tr role="row">
              <!-- DETAILS -->
              <th class="row-actions" *ngIf="config.hasDetails">
                <novo-button
                  theme="icon"
                  icon="next"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="!config.expandAll"
                  data-automation-id="expand-all"
                ></novo-button>
                <novo-button
                  theme="icon"
                  icon="sort-desc"
                  (click)="expandAllOnPage(config.expandAll)"
                  *ngIf="config.expandAll"
                  data-automation-id="collapse-all"
                ></novo-button>
              </th>
              <!-- CHECKBOX -->
              <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                <novo-checkbox
                  [(ngModel)]="master"
                  [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length"
                  (ngModelChange)="selectPage($event)"
                  data-automation-id="select-all-checkbox"
                  [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage"
                  tooltipPosition="right"
                ></novo-checkbox>
              </th>
              <!-- TABLE HEADERS -->
              <th
                *ngFor="let column of columns"
                [ngClass]="{
                  'mass-action': config?.rowSelectionStyle === 'checkbox',
                  actions: column?.actions?.items?.length > 0,
                  preview: column?.name === 'preview'
                }"
                [novoThOrderable]="column"
                (onOrderChange)="onOrderChange($event)"
                [hidden]="isColumnHidden(column)"
              >
                <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                  <!-- LABEL & SORT ARROWS -->
                  <div
                    class="th-title"
                    [ngClass]="config.sorting !== false && column.sorting !== false ? 'sortable' : ''"
                    [novoThSortable]="config"
                    [column]="column"
                    (onSortChange)="onSortChange($event)"
                  >
                    <label>{{ column.title || column.label }}</label>
                    <div
                      class="table-sort-icons"
                      tooltipPosition="bottom"
                      [tooltip]="labels.sort"
                      [ngClass]="column.sort || ''"
                      *ngIf="config.sorting !== false && column.sorting !== false"
                    >
                      <i class="bhi-arrow-up"></i>
                      <i class="bhi-arrow-down"></i>
                    </div>
                  </div>
                  <!-- FILTER DROP-DOWN -->
                  <novo-dropdown
                    side="default"
                    *ngIf="config.filtering !== false && column.filtering !== false"
                    class="column-filters"
                    (toggled)="onDropdownToggled($event, column.name)"
                    parentScrollSelector=".table-container"
                    containerClass="table-dropdown"
                  >
                    <novo-button
                      type="button"
                      theme="icon"
                      icon="filter"
                      tooltipPosition="bottom"
                      [tooltip]="labels.filters"
                      [class.filtered]="column.filter || column.filter === false"
                      (click)="focusInput()"
                    ></novo-button>
                    <!-- FILTER OPTIONS LIST -->
                    <novo-optgroup
                      *ngIf="
                        (column?.options?.length || column?.originalOptions?.length) &&
                        column?.type !== 'date' &&
                        toggledDropdownMap[column.name]
                      "
                    >
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button
                            theme="dialogue"
                            color="negative"
                            icon="times"
                            (click)="onFilterClear(column)"
                            *ngIf="column.filter || column.filter === false"
                          >
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          *ngIf="!!column.allowCustomTextOption"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterKeywords($event)"
                          [(ngModel)]="column.freetextFilter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                      <novo-option
                        [ngClass]="{ active: isFilterActive(column, option) }"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [attr.data-automation-id]="getOptionDataAutomationId(option)"
                      >
                        <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER SEARCH INPUT -->
                    <novo-optgroup *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                        <input
                          type="text"
                          [attr.id]="column.name + '-input'"
                          [novoTableFilter]="column"
                          (onFilterChange)="onFilterChange($event)"
                          [(ngModel)]="column.filter"
                          keepFilterFocused
                          #filterInput
                        />
                      </novo-option>
                    </novo-optgroup>
                    <!-- FILTER DATE OPTIONS -->
                    <novo-optgroup *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                      <novo-option class="filter-search" *ngIf="!column.calenderShow" novoInert>
                        <div class="header">
                          <span>{{ labels.filters }}</span>
                          <novo-button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">
                            {{ labels.clear }}
                          </novo-button>
                        </div>
                      </novo-option>
                      <novo-option
                        [class.active]="isFilterActive(column, option)"
                        *ngFor="let option of column.options"
                        (click)="onFilterClick(column, option)"
                        [keepOpen]="option.range"
                        [hidden]="column.calenderShow"
                        [attr.data-automation-id]="option?.label || option"
                      >
                        {{ option?.label || option }}
                        <novo-icon novoSuffix color="positive" *ngIf="isFilterActive(column, option)">check</novo-icon>
                      </novo-option>
                      <novo-option class="calendar-container" *ngIf="column.calenderShow" keepOpen novoInert>
                        <novo-stack>
                          <div class="back-link" (click)="column.calenderShow = false">
                            <i class="bhi-previous"></i>{{ labels.backToPresetFilters }}
                          </div>
                          <novo-date-picker
                            (onSelect)="onCalenderSelect(column, $event)"
                            [(ngModel)]="column.filter"
                            mode="range"
                          ></novo-date-picker>
                        </novo-stack>
                      </novo-option>
                    </novo-optgroup>
                  </novo-dropdown>
                </div>
              </th>
            </tr>
          </thead>
          <!-- TABLE DATA -->
          <tbody *ngIf="!dataProvider.isEmpty() || editing">
            <tr
              class="table-selection-row"
              *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled"
              data-automation-id="table-selection-row"
            >
              <td colspan="100%">
                {{ labels.selectedRecords(selected.length) }}
                <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{ labels.totalRecords(dataProvider.total) }}</a>
              </td>
            </tr>
            <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
              <tr
                class="table-row"
                [ngClass]="row.customClass || ''"
                [id]="name + '-' + row[rowIdentifier]"
                [attr.data-automation-id]="row.id"
                (click)="rowClickHandler(row)"
                [class.active]="row.id === activeId"
              >
                <td class="row-actions" *ngIf="config.hasDetails">
                  <novo-button theme="icon" icon="next" (click)="row._expanded = !row._expanded" *ngIf="!row._expanded"></novo-button>
                  <novo-button theme="icon" icon="sort-desc" (click)="row._expanded = !row._expanded" *ngIf="row._expanded"></novo-button>
                </td>
                <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                  <novo-checkbox
                    [(ngModel)]="row._selected"
                    (ngModelChange)="rowSelectHandler(row)"
                    data-automation-id="select-row-checkbox"
                  ></novo-checkbox>
                </td>
                <td
                  *ngFor="let column of columns"
                  [attr.data-automation-id]="column.id || column.name"
                  [class.novo-form-row]="editable"
                  [hidden]="isColumnHidden(column)"
                >
                  <novo-table-cell
                    *ngIf="row._editing && !row._editing[column.name]"
                    [hasEditor]="editable"
                    [column]="column"
                    [row]="row"
                    [form]="getRowControlForm(i)"
                  ></novo-table-cell>
                  <novo-control
                    *ngIf="row._editing && row._editing[column.name]"
                    condensed="true"
                    [form]="getRowControlForm(i)"
                    [control]="row.controls[column.name]"
                  ></novo-control>
                </td>
              </tr>
              <tr
                class="details-row"
                *ngIf="config.hasDetails"
                [hidden]="!row._expanded"
                [attr.data-automation-id]="'details-row-' + row.id"
              >
                <td class="row-actions"></td>
                <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? columns.length + 1 : columns.length">
                  <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                </td>
              </tr>
            </ng-template>
          </tbody>
          <!-- NO TABLE DATA PLACEHOLDER -->
          <tbody
            class="table-message"
            *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing"
            data-automation-id="empty-table"
          >
            <tr>
              <td colspan="100%">
                <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- NO MATCHING RECORDS -->
          <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
            <tr>
              <td colspan="100%">
                <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                  <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- TABLE DATA ERROR PLACEHOLDER -->
          <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
            <tr>
              <td colspan="100%">
                <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                  <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot *ngIf="!config.footers" [ngClass]="dataProvider.length % 2 == 0 ? 'odd' : 'even'">
            <tr>
              <td colspan="100%">
                <ng-content select="novo-table-footer"></ng-content>
              </td>
            </tr>
          </tfoot>
          <tfoot *ngFor="let footer of footers; let i = index" class="novo-table-total-footer">
            <tr>
              <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">
                {{ footer[column.name] }}
              </td>
            </tr>
          </tfoot>
        </table>
      </novo-form>
    </div>
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-table{width:100%;display:block}novo-table>header novo-table-header{padding:10px}novo-table>header novo-table-header button{height:39px;margin-right:10px}novo-table>header novo-table-header button:last-child{margin-right:0}novo-table>header div.header-actions{display:flex;align-items:center}novo-table>header div.header-actions>novo-pagination{flex:1}novo-table>header div.header-actions>novo-pagination>h5{margin-left:0}novo-table>header div.header-actions>novo-pagination novo-select .novo-select-list{transform:translateY(5%)!important}novo-table>header div.header-actions>novo-table-actions{padding:10px;display:flex;align-items:center}novo-table>header div.header-actions>novo-table-actions>*{margin-right:10px}novo-table>header div.header-actions>novo-table-actions>*:last-child{margin-right:0}novo-table>.table-container{overflow-x:auto;overflow-y:hidden;width:100%;display:block}novo-table novo-table-footer{display:flex}novo-table tfoot.novo-table-total-footer td{padding:1.2rem}novo-table.editing th .th-title,novo-table.editing th novo-dropdown,novo-table.editing novo-pagination h5,novo-table.editing novo-pagination novo-select.table-pagination-select,novo-table.editing novo-pagination ul.pager{pointer-events:none;opacity:.7}novo-table.editing novo-control{margin-top:0!important}novo-table.novo-table-loading{position:relative}novo-table div.novo-table-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background:rgba(0,0,0,.07);z-index:1000}novo-table novo-form{max-width:inherit}novo-table novo-form td.novo-form-row{width:inherit!important}.table{width:auto;width:-webkit-fill-available;max-width:100%;background-color:#fff}.table>tbody>tr>td,.table>tbody>tr>th,.table>thead>tr>td,.table>thead>tr>th{position:relative;text-align:left;padding:.6rem;vertical-align:middle}.table>tbody>tr>td .th-title,.table>tbody>tr>th .th-title,.table>thead>tr>td .th-title,.table>thead>tr>th .th-title{padding:5px 5px 5px 0}.table>tbody>tr>td.checkbox,.table>tbody>tr>th.checkbox,.table>thead>tr>td.checkbox,.table>thead>tr>th.checkbox{text-align:center;padding-bottom:15px}.table>tbody>tr>td.checkbox>novo-checkbox,.table>tbody>tr>th.checkbox>novo-checkbox,.table>thead>tr>td.checkbox>novo-checkbox,.table>thead>tr>th.checkbox>novo-checkbox{justify-content:center}.table>tbody>tr.table-selection-row,.table>tbody>tr.active,.table>thead>tr.table-selection-row,.table>thead>tr.active{background-color:#caddf5!important}.table>thead>tr>th.sorted{background:rgba(74,137,220,.2)}.table>thead>tr>th{font-weight:400;color:#757575;vertical-align:bottom;border-bottom:1px solid #f4f4f4;border-top:1px solid #f4f4f4;border-right:1px solid #f4f4f4;padding:.75rem}.table>thead>tr>th.over{background:#eee;border-right:2px double #000!important}.table>thead>tr>th.over *{pointer-events:none}.table>thead>tr>th .th-group{display:flex;flex-direction:row;align-items:center}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button{-webkit-appearance:none}.table>thead>tr>th .th-group novo-dropdown.column-filters .novo-button.filtered i{color:#4a89dc}.table>thead>tr>th .th-group .th-title{display:flex;flex-direction:row;align-items:center;padding:10px 10px 10px 5px;border-radius:3px;font-weight:400}.table>thead>tr>th .th-group .th-title.sortable{cursor:pointer}.table>thead>tr>th .th-group .th-title.sortable label{cursor:pointer;margin-right:10px}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons{opacity:1}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title:hover .table-sort-icons i.bhi-arrow-up{color:#5c5c5c}.table>thead>tr>th .th-group .th-title .table-sort-icons{display:flex;flex-direction:row;opacity:.3;transition:all .2s ease-in-out}.table>thead>tr>th .th-group .th-title .table-sort-icons i{font-size:.8em;margin:0}.table>thead>tr>th .th-group .th-title .table-sort-icons i.bhi-arrow-down{padding-top:5px}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-down{color:#9b9b9b}.table>thead>tr>th .th-group .th-title .table-sort-icons.asc i.bhi-arrow-up{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc{opacity:1}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-down{color:#4a89dc}.table>thead>tr>th .th-group .th-title .table-sort-icons.desc i.bhi-arrow-up{color:#9b9b9b}.table>tbody+tbody{border-top:1px solid rgba(0,0,0,.12)}.table .table-message tr,.table .table-message td{background-color:#fff!important}.table .table{background-color:#fff}.table .row-action{padding:.3rem!important}.table tr.details-row td{padding-top:0!important}.table .no-border{border:0}.table .table-message,.table .no-matching-records,.table .table-empty-message,.table .table-error-message{color:#9e9e9e;margin:40px 0;vertical-align:middle}.table .table-loading{display:flex;vertical-align:middle;align-items:center;justify-content:center;background:#ffffff}.table novo-checkbox .check-box-group{color:#9e9e9e;margin-right:0}.table novo-checkbox .check-box-group.checked{color:#4a89dc}.table novo-checkbox .check-box-group .bhi-checkbox-indeterminate{color:#4a89dc}.dropdown-container.table-dropdown{right:-15px;width:230px;max-height:500px;overflow-x:hidden;overflow-y:auto}.dropdown-container.table-dropdown .novo-button[theme][theme=dialogue][icon] i{padding:inherit;padding-left:5px;height:inherit;width:inherit;display:inline-block;line-height:inherit}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .novo-option-text{padding:10px 0;width:100%;height:auto;flex-direction:column;align-items:flex-start;cursor:auto;cursor:initial}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search:hover{background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header{display:flex;align-items:center;justify-content:space-between;width:90%;font-size:.9em;margin:0 auto}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header span{text-transform:uppercase;font-weight:400}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button{padding:0 5px}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search .header button i{height:auto!important;width:auto!important;font-size:.9em}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input{border:none;border-bottom:2px solid #bebebe;width:90%;margin:0 auto;background:transparent}.dropdown-container.table-dropdown .novo-optgroup .novo-option.filter-search input:focus{outline:none;border-bottom:2px solid #4a89dc}.dropdown-container.table-dropdown .novo-optgroup item>span{display:inline-block;max-width:calc(100% - 20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dropdown-container.table-dropdown .calendar-container{height:100%;min-height:200px;width:100%;background:#fff}.dropdown-container.table-dropdown .calendar-container>div{color:#4a89dc;line-height:3em;font-size:.9em;padding-left:5px;cursor:pointer}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar{width:100%;height:100%;box-shadow:none;padding:0 5px 10px}.dropdown-container.table-dropdown .calendar-container novo-date-picker .calendar .calendar-top{display:none}.table-bordered tbody tr td,.table-bordered tbody tr th,.table-bordered thead tr td,.table-bordered thead tr th,.table-bordered tfoot tr td,.table-bordered tfoot tr th{border-bottom:1px solid #f5f5f5}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row){background-color:#f4f4f4}.table-striped:not(.table-details)>tbody tr:nth-of-type(odd):not(.table-selection-row) td{background-color:#f4f4f4}.table-striped.table-details>tbody tr:nth-of-type(4n + 2),.table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f4}.table-hover>tbody>tr:hover{background-color:#0000001f}.handle{display:block;position:absolute;right:0;top:0;bottom:0;width:6px;cursor:col-resize}novo-table[theme=black]>header{background:#000000;color:#fff}novo-table[theme=black]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=black]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=black]>header novo-pagination .page{color:#fff}novo-table[theme=black]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=black]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=white]>header{background:#ffffff;color:#3d464d}novo-table[theme=white]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=white]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=white]>header novo-pagination .page{color:#fff}novo-table[theme=white]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=white]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=gray]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=gray]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=gray]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=gray]>header novo-pagination .page{color:#fff}novo-table[theme=gray]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=gray]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grey]>header{background:#9e9e9e;color:#3d464d}novo-table[theme=grey]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grey]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grey]>header novo-pagination .page{color:#fff}novo-table[theme=grey]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grey]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=offWhite]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=offWhite]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=offWhite]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=offWhite]>header novo-pagination .page{color:#fff}novo-table[theme=offWhite]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=offWhite]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bright]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=bright]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bright]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bright]>header novo-pagination .page{color:#fff}novo-table[theme=bright]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bright]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=light]>header{background:#dbdbdb;color:#3d464d}novo-table[theme=light]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=light]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=light]>header novo-pagination .page{color:#fff}novo-table[theme=light]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=light]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=neutral]>header{background:#4f5361;color:#fff}novo-table[theme=neutral]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=neutral]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=neutral]>header novo-pagination .page{color:#fff}novo-table[theme=neutral]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=neutral]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=dark]>header{background:#3d464d;color:#fff}novo-table[theme=dark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=dark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=dark]>header novo-pagination .page{color:#fff}novo-table[theme=dark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=dark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=orange]>header{background:#ff6900;color:#3d464d}novo-table[theme=orange]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=orange]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=orange]>header novo-pagination .page{color:#fff}novo-table[theme=orange]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=orange]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navigation]>header{background:#202945;color:#fff}novo-table[theme=navigation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navigation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navigation]>header novo-pagination .page{color:#fff}novo-table[theme=navigation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navigation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=skyBlue]>header{background:#009bdf;color:#fff}novo-table[theme=skyBlue]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=skyBlue]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=skyBlue]>header novo-pagination .page{color:#fff}novo-table[theme=skyBlue]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=skyBlue]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=steel]>header{background:#5b6770;color:#fff}novo-table[theme=steel]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=steel]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=steel]>header novo-pagination .page{color:#fff}novo-table[theme=steel]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=steel]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=metal]>header{background:#637893;color:#fff}novo-table[theme=metal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=metal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=metal]>header novo-pagination .page{color:#fff}novo-table[theme=metal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=metal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sand]>header{background:#f4f4f4;color:#3d464d}novo-table[theme=sand]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sand]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sand]>header novo-pagination .page{color:#fff}novo-table[theme=sand]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sand]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=silver]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=silver]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=silver]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=silver]>header novo-pagination .page{color:#fff}novo-table[theme=silver]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=silver]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=stone]>header{background:#bebebe;color:#3d464d}novo-table[theme=stone]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=stone]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=stone]>header novo-pagination .page{color:#fff}novo-table[theme=stone]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=stone]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ash]>header{background:#a0a0a0;color:#3d464d}novo-table[theme=ash]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ash]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ash]>header novo-pagination .page{color:#fff}novo-table[theme=ash]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ash]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=slate]>header{background:#707070;color:#fff}novo-table[theme=slate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=slate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=slate]>header novo-pagination .page{color:#fff}novo-table[theme=slate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=slate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=onyx]>header{background:#526980;color:#fff}novo-table[theme=onyx]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=onyx]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=onyx]>header novo-pagination .page{color:#fff}novo-table[theme=onyx]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=onyx]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=charcoal]>header{background:#282828;color:#fff}novo-table[theme=charcoal]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=charcoal]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=charcoal]>header novo-pagination .page{color:#fff}novo-table[theme=charcoal]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=charcoal]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=moonlight]>header{background:#1a242f;color:#fff}novo-table[theme=moonlight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=moonlight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=moonlight]>header novo-pagination .page{color:#fff}novo-table[theme=moonlight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=moonlight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=midnight]>header{background:#202945;color:#fff}novo-table[theme=midnight]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=midnight]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=midnight]>header novo-pagination .page{color:#fff}novo-table[theme=midnight]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=midnight]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=darkness]>header{background:#161f27;color:#fff}novo-table[theme=darkness]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=darkness]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=darkness]>header novo-pagination .page{color:#fff}novo-table[theme=darkness]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=darkness]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=navy]>header{background:#0d2d42;color:#fff}novo-table[theme=navy]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=navy]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=navy]>header novo-pagination .page{color:#fff}novo-table[theme=navy]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=navy]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=aqua]>header{background:#3bafda;color:#3d464d}novo-table[theme=aqua]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=aqua]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=aqua]>header novo-pagination .page{color:#fff}novo-table[theme=aqua]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=aqua]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=ocean]>header{background:#4a89dc;color:#fff}novo-table[theme=ocean]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=ocean]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=ocean]>header novo-pagination .page{color:#fff}novo-table[theme=ocean]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=ocean]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mint]>header{background:#37bc9b;color:#3d464d}novo-table[theme=mint]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mint]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mint]>header novo-pagination .page{color:#fff}novo-table[theme=mint]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mint]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grass]>header{background:#8cc152;color:#fff}novo-table[theme=grass]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grass]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grass]>header novo-pagination .page{color:#fff}novo-table[theme=grass]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grass]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sunflower]>header{background:#f6b042;color:#fff}novo-table[theme=sunflower]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sunflower]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sunflower]>header novo-pagination .page{color:#fff}novo-table[theme=sunflower]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sunflower]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bittersweet]>header{background:#eb6845;color:#fff}novo-table[theme=bittersweet]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bittersweet]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bittersweet]>header novo-pagination .page{color:#fff}novo-table[theme=bittersweet]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bittersweet]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=grapefruit]>header{background:#da4453;color:#fff}novo-table[theme=grapefruit]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=grapefruit]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=grapefruit]>header novo-pagination .page{color:#fff}novo-table[theme=grapefruit]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=grapefruit]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=carnation]>header{background:#d770ad;color:#fff}novo-table[theme=carnation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=carnation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=carnation]>header novo-pagination .page{color:#fff}novo-table[theme=carnation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=carnation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lavender]>header{background:#967adc;color:#fff}novo-table[theme=lavender]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lavender]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lavender]>header novo-pagination .page{color:#fff}novo-table[theme=lavender]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lavender]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=mountain]>header{background:#9678b6;color:#fff}novo-table[theme=mountain]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=mountain]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=mountain]>header novo-pagination .page{color:#fff}novo-table[theme=mountain]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=mountain]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=info]>header{background:#4a89dc;color:#fff}novo-table[theme=info]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=info]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=info]>header novo-pagination .page{color:#fff}novo-table[theme=info]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=info]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=positive]>header{background:#4a89dc;color:#fff}novo-table[theme=positive]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=positive]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=positive]>header novo-pagination .page{color:#fff}novo-table[theme=positive]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=positive]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=success]>header{background:#8cc152;color:#fff}novo-table[theme=success]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=success]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=success]>header novo-pagination .page{color:#fff}novo-table[theme=success]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=success]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=negative]>header{background:#da4453;color:#fff}novo-table[theme=negative]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=negative]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=negative]>header novo-pagination .page{color:#fff}novo-table[theme=negative]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=negative]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=danger]>header{background:#da4453;color:#fff}novo-table[theme=danger]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=danger]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=danger]>header novo-pagination .page{color:#fff}novo-table[theme=danger]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=danger]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=error]>header{background:#da4453;color:#fff}novo-table[theme=error]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=error]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=error]>header novo-pagination .page{color:#fff}novo-table[theme=error]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=error]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=warning]>header{background:#f6b042;color:#fff}novo-table[theme=warning]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=warning]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=warning]>header novo-pagination .page{color:#fff}novo-table[theme=warning]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=warning]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=empty]>header{background:#cccdcc;color:#3d464d}novo-table[theme=empty]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=empty]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=empty]>header novo-pagination .page{color:#fff}novo-table[theme=empty]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=empty]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=disabled]>header{background:#bebebe;color:#3d464d}novo-table[theme=disabled]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=disabled]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=disabled]>header novo-pagination .page{color:#fff}novo-table[theme=disabled]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=disabled]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=background]>header{background:#f7f7f7;color:#3d464d}novo-table[theme=background]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=background]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=background]>header novo-pagination .page{color:#fff}novo-table[theme=background]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=background]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=backgroundDark]>header{background:#e2e2e2;color:#3d464d}novo-table[theme=backgroundDark]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=backgroundDark]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=backgroundDark]>header novo-pagination .page{color:#fff}novo-table[theme=backgroundDark]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=backgroundDark]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=presentation]>header{background:#5b6770;color:#fff}novo-table[theme=presentation]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=presentation]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=presentation]>header novo-pagination .page{color:#fff}novo-table[theme=presentation]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=presentation]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=bullhorn]>header{background:#ff6900;color:#3d464d}novo-table[theme=bullhorn]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=bullhorn]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=bullhorn]>header novo-pagination .page{color:#fff}novo-table[theme=bullhorn]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=bullhorn]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=pulse]>header{background:#3bafda;color:#3d464d}novo-table[theme=pulse]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=pulse]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=pulse]>header novo-pagination .page{color:#fff}novo-table[theme=pulse]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=pulse]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=company]>header{background:#3399dd;color:#fff}novo-table[theme=company]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=company]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=company]>header novo-pagination .page{color:#fff}novo-table[theme=company]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=company]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=candidate]>header{background:#44bb77;color:#fff}novo-table[theme=candidate]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=candidate]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=candidate]>header novo-pagination .page{color:#fff}novo-table[theme=candidate]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=candidate]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=lead]>header{background:#aa6699;color:#fff}novo-table[theme=lead]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=lead]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=lead]>header novo-pagination .page{color:#fff}novo-table[theme=lead]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=lead]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contact]>header{background:#ffaa44;color:#fff}novo-table[theme=contact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contact]>header novo-pagination .page{color:#fff}novo-table[theme=contact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=clientcontact]>header{background:#ffaa44;color:#fff}novo-table[theme=clientcontact]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=clientcontact]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=clientcontact]>header novo-pagination .page{color:#fff}novo-table[theme=clientcontact]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=clientcontact]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=opportunity]>header{background:#662255;color:#fff}novo-table[theme=opportunity]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=opportunity]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=opportunity]>header novo-pagination .page{color:#fff}novo-table[theme=opportunity]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=opportunity]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=job]>header{background:#bb5566;color:#fff}novo-table[theme=job]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=job]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=job]>header novo-pagination .page{color:#fff}novo-table[theme=job]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=job]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=joborder]>header{background:#bb5566;color:#fff}novo-table[theme=joborder]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=joborder]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=joborder]>header novo-pagination .page{color:#fff}novo-table[theme=joborder]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=joborder]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=submission]>header{background:#a9adbb;color:#3d464d}novo-table[theme=submission]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=submission]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=submission]>header novo-pagination .page{color:#fff}novo-table[theme=submission]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=submission]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=sendout]>header{background:#747884;color:#fff}novo-table[theme=sendout]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=sendout]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=sendout]>header novo-pagination .page{color:#fff}novo-table[theme=sendout]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=sendout]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=placement]>header{background:#0b344f;color:#fff}novo-table[theme=placement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=placement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=placement]>header novo-pagination .page{color:#fff}novo-table[theme=placement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=placement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=note]>header{background:#747884;color:#fff}novo-table[theme=note]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=note]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=note]>header novo-pagination .page{color:#fff}novo-table[theme=note]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=note]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=contract]>header{background:#454ea0;color:#fff}novo-table[theme=contract]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=contract]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=contract]>header novo-pagination .page{color:#fff}novo-table[theme=contract]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=contract]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=jobCode]>header{background:#696d79;color:#fff}novo-table[theme=jobCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=jobCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=jobCode]>header novo-pagination .page{color:#fff}novo-table[theme=jobCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=jobCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=earnCode]>header{background:#696d79;color:#fff}novo-table[theme=earnCode]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=earnCode]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=earnCode]>header novo-pagination .page{color:#fff}novo-table[theme=earnCode]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=earnCode]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=invoiceStatement]>header{background:#696d79;color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=invoiceStatement]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=invoiceStatement]>header novo-pagination .page{color:#fff}novo-table[theme=invoiceStatement]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=invoiceStatement]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=billableCharge]>header{background:#696d79;color:#fff}novo-table[theme=billableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=billableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=billableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=billableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=billableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=payableCharge]>header{background:#696d79;color:#fff}novo-table[theme=payableCharge]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=payableCharge]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=payableCharge]>header novo-pagination .page{color:#fff}novo-table[theme=payableCharge]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=payableCharge]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=user]>header{background:#696d79;color:#fff}novo-table[theme=user]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=user]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=user]>header novo-pagination .page{color:#fff}novo-table[theme=user]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=user]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=corporateUser]>header{background:#696d79;color:#fff}novo-table[theme=corporateUser]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=corporateUser]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=corporateUser]>header novo-pagination .page{color:#fff}novo-table[theme=corporateUser]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=corporateUser]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=distributionList]>header{background:#696d79;color:#fff}novo-table[theme=distributionList]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=distributionList]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=distributionList]>header novo-pagination .page{color:#fff}novo-table[theme=distributionList]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=distributionList]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=credential]>header{background:#696d79;color:#fff}novo-table[theme=credential]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=credential]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=credential]>header novo-pagination .page{color:#fff}novo-table[theme=credential]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=credential]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[theme=person]>header{background:#696d79;color:#fff}novo-table[theme=person]>header novo-pagination{background:rgba(0,0,0,.15)}novo-table[theme=person]>header novo-pagination>*{color:#fff;opacity:1}novo-table[theme=person]>header novo-pagination .page{color:#fff}novo-table[theme=person]>header novo-pagination h5.rows{opacity:.75}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button]{color:#fff;border-bottom:1px solid rgba(255,255,255,.15)}novo-table[theme=person]>header novo-pagination novo-select.table-pagination-select div[type=button] i{color:#fff!important}novo-table[dark] .table>thead>tr>th{border-right:1px solid rgba(244,244,244,.04)}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd){background-color:#f4f4f40a}novo-table[dark] .table-striped:not(.table-details)>tbody tr:nth-of-type(odd) td{background-color:transparent}novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 2),novo-table[dark] .table-striped.table-details>tbody tr:nth-of-type(4n + 1){background-color:#f4f4f40a}th.dragging{opacity:.4}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i2$2.FormUtils }, { type: i3$1.FormBuilder }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { filterInputs: [{
                type: ViewChildren,
                args: ['filterInput', { read: ElementRef }]
            }], config: [{
                type: Input
            }], columns: [{
                type: Input
            }], theme: [{
                type: Input
            }], skipSortAndFilterClear: [{
                type: Input
            }], mode: [{
                type: Input
            }], editable: [{
                type: Input
            }], rowIdentifier: [{
                type: Input
            }], name: [{
                type: Input
            }], onRowClick: [{
                type: Output
            }], onRowSelect: [{
                type: Output
            }], onTableChange: [{
                type: Output
            }], rows: [{
                type: Input
            }], dataProvider: [{
                type: Input
            }] } });

// NG2
class NovoTableModule {
}
NovoTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: NovoTableModule, declarations: [NovoTableElement], imports: [CommonModule,
        FormsModule,
        NovoFormModule,
        NovoTableExtrasModule,
        NovoToastModule,
        NovoButtonModule,
        NovoTooltipModule,
        NovoDropdownModule,
        NovoLoadingModule,
        NovoDatePickerModule,
        NovoFormExtrasModule,
        NovoCheckboxModule,
        IMaskDirectiveModule,
        NovoOptionModule,
        NovoCommonModule,
        NovoFlexModule,
        NovoIconModule], exports: [NovoTableElement] });
NovoTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableModule, imports: [CommonModule,
        FormsModule,
        NovoFormModule,
        NovoTableExtrasModule,
        NovoToastModule,
        NovoButtonModule,
        NovoTooltipModule,
        NovoDropdownModule,
        NovoLoadingModule,
        NovoDatePickerModule,
        NovoFormExtrasModule,
        NovoCheckboxModule,
        IMaskDirectiveModule,
        NovoOptionModule,
        NovoCommonModule,
        NovoFlexModule,
        NovoIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: NovoTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        NovoFormModule,
                        NovoTableExtrasModule,
                        NovoToastModule,
                        NovoButtonModule,
                        NovoTooltipModule,
                        NovoDropdownModule,
                        NovoLoadingModule,
                        NovoDatePickerModule,
                        NovoFormExtrasModule,
                        NovoCheckboxModule,
                        IMaskDirectiveModule,
                        NovoOptionModule,
                        NovoCommonModule,
                        NovoFlexModule,
                        NovoIconModule,
                    ],
                    declarations: [NovoTableElement],
                    exports: [NovoTableElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BaseRenderer, DateCell, NovoDropdownCell, NovoTableActionsElement, NovoTableElement, NovoTableExtrasModule, NovoTableFooterElement, NovoTableHeaderElement, NovoTableKeepFilterFocus, NovoTableMode, NovoTableModule, Pagination, PercentageCell, RowDetails, TableCell, TableFilter, ThOrderable, ThSortable };
//# sourceMappingURL=novo-elements-elements-table.mjs.map
