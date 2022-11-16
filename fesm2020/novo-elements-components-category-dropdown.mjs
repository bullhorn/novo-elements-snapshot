import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as i1 from 'novo-elements/services';
import { OutsideClick, Helpers } from 'novo-elements/utils';
import * as i2 from 'novo-elements/components/tabs';
import { NovoTabModule } from 'novo-elements/components/tabs';
import * as i3 from 'novo-elements/components/list';
import { NovoListModule } from 'novo-elements/components/list';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

// NG2
class NovoCategoryDropdownElement extends OutsideClick {
    constructor(element, labels) {
        super(element);
        this.labels = labels;
        this._query = '';
        this._categoryMap = {};
        this._categories = [];
        // Boolean to keep the selection persist when closing the dropdown
        this.persistSelection = false;
        // Boolean to close the dropdown on selection
        this.closeOnSelect = false;
        // Event that is emitted whenever an item is selected
        this._select = new EventEmitter();
        // Event that is emitted whenever a category is selected
        this.categorySelected = new EventEmitter();
        this.clickHandler = this.toggleActive.bind(this);
    }
    set categories(categories) {
        this._masterCategoryMap = Object.assign({}, categories);
        this._categoryMap = Object.assign({}, categories);
        this._categories = Object.keys(categories);
    }
    ngOnInit() {
        const button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
    }
    ngOnDestroy() {
        const button = this.element.nativeElement.querySelector('button');
        if (button) {
            button.removeEventListener('click', this.clickHandler);
        }
    }
    onKeyDown(event) {
        if (this.active && (event.key === "Escape" /* Escape */ || event.key === "Enter" /* Enter */)) {
            this.toggleActive();
        }
    }
    clearSelection() {
        this._categories.forEach((category) => {
            this._categoryMap[category].forEach((item) => {
                item.selected = false;
            });
        });
    }
    select(event, item) {
        Helpers.swallowEvent(event);
        // If we persist the selection, clear and show a check
        if (this.persistSelection) {
            this.clearSelection();
            item.selected = true;
        }
        // Emit the item
        this._select.emit(item);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    }
    onCategorySelected(category) {
        this.categorySelected.emit(category);
    }
    clearQuery(event) {
        Helpers.swallowEvent(event);
        this._query = '';
        // Reset the categories
        this._categories.forEach((category) => {
            this._categoryMap[category] = this._masterCategoryMap[category];
        });
    }
    queryCategories(query) {
        // Save the query
        this._query = query;
        // Check timeout
        if (this._queryTimeout) {
            clearTimeout(this._queryTimeout);
        }
        // Store a timeout, to debounce user input
        this._queryTimeout = setTimeout(() => {
            this._categories.forEach((category) => {
                if (this.search.compare) {
                    this._categoryMap[category] = this._masterCategoryMap[category].filter((item) => this.search.compare(query, item));
                }
                else {
                    this._categoryMap[category] = this._masterCategoryMap[category].filter((item) => ~item.label.toLowerCase().indexOf(query.toLowerCase()));
                }
            });
        }, this.search.debounce || 300);
    }
    executeClickCallback(event, link) {
        link.callback(event);
        // Close, if input is set
        if (this.closeOnSelect) {
            this.toggleActive();
        }
    }
}
NovoCategoryDropdownElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoCategoryDropdownElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoCategoryDropdownElement, selector: "novo-category-dropdown", inputs: { persistSelection: "persistSelection", closeOnSelect: "closeOnSelect", search: "search", footer: "footer", categories: "categories" }, outputs: { _select: "itemSelected", categorySelected: "categorySelected" }, host: { listeners: { "keydown": "onKeyDown($event)" }, properties: { "class.active": "active" } }, usesInheritance: true, ngImport: i0, template: `
    <ng-content select="button"></ng-content>
    <div class="dropdown-container" *ngIf="active">
      <div class="novo-category-dropdown-search" *ngIf="search" data-automation-id="novo-category-dropdown-search">
        <input
          type="text"
          [placeholder]="search.placeholder || labels.search"
          [value]="_query"
          (input)="queryCategories($event.target.value)"
        />
        <i class="bhi-search" *ngIf="!_query"></i>
        <i class="bhi-times" *ngIf="_query" (click)="clearQuery($event)"></i>
      </div>
      <novo-nav theme="white" [outlet]="novoCategoryDropdownOutlet" direction="vertical">
        <novo-tab *ngFor="let category of _categories" [attr.data-automation-id]="category" (activeChange)="onCategorySelected(category)">
          <span>{{ category }} ({{ _categoryMap[category].length }})</span>
        </novo-tab>
      </novo-nav>
      <novo-nav-outlet #novoCategoryDropdownOutlet>
        <novo-nav-content *ngFor="let category of _categories">
          <novo-list direction="vertical">
            <novo-list-item
              *ngFor="let item of _categoryMap[category]"
              (click)="select($event, item)"
              [attr.data-automation-id]="item.label"
            >
              <item-content>{{ item.label }}</item-content>
              <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverText && !item.selected">{{ item.hoverText }}</item-end>
              <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverIcon && !item.selected"
                ><i class="bhi-{{ item.hoverIcon }}"></i
              ></item-end>
              <item-end *ngIf="item.selected"><i class="bhi-check"></i></item-end>
            </novo-list-item>
            <novo-list-item *ngIf="_categoryMap[category].length === 0 && search" class="novo-category-dropdown-empty-item">
              <item-content>{{ search.emptyMessage || labels.noItems }}</item-content>
            </novo-list-item>
          </novo-list>
        </novo-nav-content>
      </novo-nav-outlet>
      <footer *ngIf="footer" class="novo-category-dropdown-footer-align-{{ footer.align || 'right' }}">
        <a *ngFor="let link of footer.links" (click)="executeClickCallback($event, link)">{{ link.label }}</a>
      </footer>
    </div>
  `, isInline: true, styles: [":host{display:block;position:relative}:host button{position:relative;z-index:0}:host.active .dropdown-container{overflow:hidden;max-height:inherit;max-width:400px;min-width:400px;display:block;z-index:z(\"max\");border-radius:2px;top:100%;margin-top:5px}:host .dropdown-container{background-color:#fff;list-style:none;line-height:26px;display:none;margin:0;max-height:0;position:absolute;padding:0;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);min-width:180px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}:host .dropdown-container .novo-category-dropdown-search{width:100%;padding:5px;border-bottom:1px solid #ccc;position:relative}:host .dropdown-container .novo-category-dropdown-search input{font-size:1em;background:transparent!important;border:none;border-bottom:var(--border-main);border-radius:0;outline:none;height:2rem;width:95%;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b;margin:0 0 0 10px}:host .dropdown-container .novo-category-dropdown-search input:hover{border-bottom:var(--border-main)}:host .dropdown-container .novo-category-dropdown-search input:focus{border-bottom:1px solid var(--color-selection)}:host .dropdown-container .novo-category-dropdown-search input::-moz-placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search input::placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search i.bhi-search,:host .dropdown-container .novo-category-dropdown-search i.bhi-times{position:absolute;bottom:15px;right:5px;color:#aaa;font-size:1.2rem;margin-right:10px}:host .dropdown-container .novo-category-dropdown-search i.bhi-times{cursor:pointer;font-size:1.2rem}:host .dropdown-container footer{padding:5px 23px;border-top:var(--border-main);display:flex;justify-content:flex-end}:host .dropdown-container footer>a{margin-left:10px;margin-right:0;font-weight:500}:host .dropdown-container footer.novo-category-dropdown-footer-align-left{justify-content:flex-start}:host .dropdown-container footer.novo-category-dropdown-footer-align-left>a{margin-right:10px;margin-left:0}:host[side=left]{display:flex;flex-direction:column;align-items:flex-start}:host[side=right]{display:flex;flex-direction:column;align-items:flex-end}:host[side=right] .dropdown-container{right:0}:host ::ng-deep novo-nav{max-height:140px;overflow:auto;border-bottom:var(--border-main)}:host ::ng-deep novo-nav>novo-tab{height:30px;min-height:30px}:host ::ng-deep novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;font-size:.9em;padding:.5em;display:flex;align-items:center}:host ::ng-deep novo-list{max-height:350px;overflow:auto}:host ::ng-deep novo-list-item{padding:.5em;flex-shrink:0;cursor:pointer;font-size:.9em}:host ::ng-deep novo-list-item:focus .novo-category-dropdown-hover,:host ::ng-deep novo-list-item:hover .novo-category-dropdown-hover{display:block}:host ::ng-deep novo-list-item .novo-category-dropdown-hover{display:none;color:var(--color-selection);font-size:.9em}:host ::ng-deep novo-list-item .novo-category-dropdown-hover>i{font-size:.9em}:host ::ng-deep novo-list-item.novo-category-dropdown-empty-item{pointer-events:none}\n"], components: [{ type: i2.NovoNavElement, selector: "novo-nav", inputs: ["theme", "direction", "outlet", "router", "condensed", "selectedIndex"], outputs: ["selectedIndexChange"] }, { type: i2.NovoTabElement, selector: "novo-tab", inputs: ["active", "color", "disabled"], outputs: ["activeChange"] }, { type: i2.NovoNavOutletElement, selector: "novo-nav-outlet" }, { type: i2.NovoNavContentElement, selector: "novo-nav-content", inputs: ["active"] }, { type: i3.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i3.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i3.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoItemEndElement, selector: "item-end, novo-item-end" }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-category-dropdown', template: `
    <ng-content select="button"></ng-content>
    <div class="dropdown-container" *ngIf="active">
      <div class="novo-category-dropdown-search" *ngIf="search" data-automation-id="novo-category-dropdown-search">
        <input
          type="text"
          [placeholder]="search.placeholder || labels.search"
          [value]="_query"
          (input)="queryCategories($event.target.value)"
        />
        <i class="bhi-search" *ngIf="!_query"></i>
        <i class="bhi-times" *ngIf="_query" (click)="clearQuery($event)"></i>
      </div>
      <novo-nav theme="white" [outlet]="novoCategoryDropdownOutlet" direction="vertical">
        <novo-tab *ngFor="let category of _categories" [attr.data-automation-id]="category" (activeChange)="onCategorySelected(category)">
          <span>{{ category }} ({{ _categoryMap[category].length }})</span>
        </novo-tab>
      </novo-nav>
      <novo-nav-outlet #novoCategoryDropdownOutlet>
        <novo-nav-content *ngFor="let category of _categories">
          <novo-list direction="vertical">
            <novo-list-item
              *ngFor="let item of _categoryMap[category]"
              (click)="select($event, item)"
              [attr.data-automation-id]="item.label"
            >
              <item-content>{{ item.label }}</item-content>
              <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverText && !item.selected">{{ item.hoverText }}</item-end>
              <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverIcon && !item.selected"
                ><i class="bhi-{{ item.hoverIcon }}"></i
              ></item-end>
              <item-end *ngIf="item.selected"><i class="bhi-check"></i></item-end>
            </novo-list-item>
            <novo-list-item *ngIf="_categoryMap[category].length === 0 && search" class="novo-category-dropdown-empty-item">
              <item-content>{{ search.emptyMessage || labels.noItems }}</item-content>
            </novo-list-item>
          </novo-list>
        </novo-nav-content>
      </novo-nav-outlet>
      <footer *ngIf="footer" class="novo-category-dropdown-footer-align-{{ footer.align || 'right' }}">
        <a *ngFor="let link of footer.links" (click)="executeClickCallback($event, link)">{{ link.label }}</a>
      </footer>
    </div>
  `, host: {
                        '(keydown)': 'onKeyDown($event)',
                        '[class.active]': 'active',
                    }, styles: [":host{display:block;position:relative}:host button{position:relative;z-index:0}:host.active .dropdown-container{overflow:hidden;max-height:inherit;max-width:400px;min-width:400px;display:block;z-index:z(\"max\");border-radius:2px;top:100%;margin-top:5px}:host .dropdown-container{background-color:#fff;list-style:none;line-height:26px;display:none;margin:0;max-height:0;position:absolute;padding:0;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);min-width:180px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}:host .dropdown-container .novo-category-dropdown-search{width:100%;padding:5px;border-bottom:1px solid #ccc;position:relative}:host .dropdown-container .novo-category-dropdown-search input{font-size:1em;background:transparent!important;border:none;border-bottom:var(--border-main);border-radius:0;outline:none;height:2rem;width:95%;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b;margin:0 0 0 10px}:host .dropdown-container .novo-category-dropdown-search input:hover{border-bottom:var(--border-main)}:host .dropdown-container .novo-category-dropdown-search input:focus{border-bottom:1px solid var(--color-selection)}:host .dropdown-container .novo-category-dropdown-search input::-moz-placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search input::placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search i.bhi-search,:host .dropdown-container .novo-category-dropdown-search i.bhi-times{position:absolute;bottom:15px;right:5px;color:#aaa;font-size:1.2rem;margin-right:10px}:host .dropdown-container .novo-category-dropdown-search i.bhi-times{cursor:pointer;font-size:1.2rem}:host .dropdown-container footer{padding:5px 23px;border-top:var(--border-main);display:flex;justify-content:flex-end}:host .dropdown-container footer>a{margin-left:10px;margin-right:0;font-weight:500}:host .dropdown-container footer.novo-category-dropdown-footer-align-left{justify-content:flex-start}:host .dropdown-container footer.novo-category-dropdown-footer-align-left>a{margin-right:10px;margin-left:0}:host[side=left]{display:flex;flex-direction:column;align-items:flex-start}:host[side=right]{display:flex;flex-direction:column;align-items:flex-end}:host[side=right] .dropdown-container{right:0}:host ::ng-deep novo-nav{max-height:140px;overflow:auto;border-bottom:var(--border-main)}:host ::ng-deep novo-nav>novo-tab{height:30px;min-height:30px}:host ::ng-deep novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;font-size:.9em;padding:.5em;display:flex;align-items:center}:host ::ng-deep novo-list{max-height:350px;overflow:auto}:host ::ng-deep novo-list-item{padding:.5em;flex-shrink:0;cursor:pointer;font-size:.9em}:host ::ng-deep novo-list-item:focus .novo-category-dropdown-hover,:host ::ng-deep novo-list-item:hover .novo-category-dropdown-hover{display:block}:host ::ng-deep novo-list-item .novo-category-dropdown-hover{display:none;color:var(--color-selection);font-size:.9em}:host ::ng-deep novo-list-item .novo-category-dropdown-hover>i{font-size:.9em}:host ::ng-deep novo-list-item.novo-category-dropdown-empty-item{pointer-events:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }]; }, propDecorators: { persistSelection: [{
                type: Input
            }], closeOnSelect: [{
                type: Input
            }], search: [{
                type: Input
            }], footer: [{
                type: Input
            }], _select: [{
                type: Output,
                args: ['itemSelected']
            }], categorySelected: [{
                type: Output
            }], categories: [{
                type: Input
            }] } });

// NG2
class NovoCategoryDropdownModule {
}
NovoCategoryDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoCategoryDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownModule, declarations: [NovoCategoryDropdownElement], imports: [CommonModule, NovoTabModule, NovoListModule], exports: [NovoCategoryDropdownElement] });
NovoCategoryDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownModule, imports: [[CommonModule, NovoTabModule, NovoListModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoTabModule, NovoListModule],
                    declarations: [NovoCategoryDropdownElement],
                    exports: [NovoCategoryDropdownElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoCategoryDropdownElement, NovoCategoryDropdownModule };
//# sourceMappingURL=novo-elements-components-category-dropdown.mjs.map
