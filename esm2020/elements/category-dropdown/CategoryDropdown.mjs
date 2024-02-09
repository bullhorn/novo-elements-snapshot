// NG2
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers, OutsideClick } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/tabs";
import * as i3 from "novo-elements/elements/list";
import * as i4 from "@angular/common";
export class NovoCategoryDropdownElement extends OutsideClick {
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
          (input)="queryCategories($any($event.target).value)"
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
  `, isInline: true, styles: [":host{display:block;position:relative}:host button{position:relative;z-index:0}:host.active .dropdown-container{overflow:hidden;max-height:inherit;max-width:400px;min-width:400px;display:block;z-index:9001;border-radius:2px;top:100%;margin-top:5px}:host .dropdown-container{background-color:#fff;list-style:none;line-height:26px;display:none;margin:0;max-height:0;position:absolute;padding:0;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);min-width:180px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}:host .dropdown-container .novo-category-dropdown-search{width:100%;padding:5px;border-bottom:1px solid #ccc;position:relative}:host .dropdown-container .novo-category-dropdown-search input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid #afb9c0;border-radius:0;outline:none;height:2rem;width:95%;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b;margin:0 0 0 10px}:host .dropdown-container .novo-category-dropdown-search input:hover{border-bottom:1px solid #5f6d78}:host .dropdown-container .novo-category-dropdown-search input:focus{border-bottom:1px solid #4a89dc}:host .dropdown-container .novo-category-dropdown-search input::-moz-placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search input::placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search i.bhi-search,:host .dropdown-container .novo-category-dropdown-search i.bhi-times{position:absolute;bottom:15px;right:5px;color:#aaa;font-size:1.2rem;margin-right:10px}:host .dropdown-container .novo-category-dropdown-search i.bhi-times{cursor:pointer;font-size:1.2rem}:host .dropdown-container footer{padding:5px 23px;border-top:1px solid #ccc;display:flex;justify-content:flex-end}:host .dropdown-container footer>a{margin-left:10px;margin-right:0;font-weight:500}:host .dropdown-container footer.novo-category-dropdown-footer-align-left{justify-content:flex-start}:host .dropdown-container footer.novo-category-dropdown-footer-align-left>a{margin-right:10px;margin-left:0}:host .dropdown-container novo-nav{max-height:140px;overflow:auto;border-bottom:1px solid #ccc}:host .dropdown-container novo-nav>novo-tab{height:30px;min-height:30px}:host .dropdown-container novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;font-size:.9em;padding:.5em;display:flex;align-items:center}:host .dropdown-container novo-list{max-height:350px;overflow:auto}:host .dropdown-container novo-list-item{padding:.5em;flex-shrink:0;cursor:pointer;font-size:.9em}:host .dropdown-container novo-list-item:focus,:host .dropdown-container novo-list-item:hover{background:whitesmoke;color:#4f4f4f}:host .dropdown-container novo-list-item:focus .novo-category-dropdown-hover,:host .dropdown-container novo-list-item:hover .novo-category-dropdown-hover{display:block}:host .dropdown-container novo-list-item .novo-category-dropdown-hover{display:none;color:#4a89dc;font-size:.9em}:host .dropdown-container novo-list-item .novo-category-dropdown-hover>i{font-size:.9em}:host .dropdown-container novo-list-item.novo-category-dropdown-empty-item{pointer-events:none}:host[side=left]{display:flex;flex-direction:column;align-items:flex-start}:host[side=right]{display:flex;flex-direction:column;align-items:flex-end}:host[side=right] .dropdown-container{right:0}\n"], components: [{ type: i2.NovoNavElement, selector: "novo-nav", inputs: ["theme", "direction", "outlet", "router", "condensed", "selectedIndex"], outputs: ["selectedIndexChange"] }, { type: i2.NovoTabElement, selector: "novo-tab", inputs: ["active", "color", "disabled"], outputs: ["activeChange"] }, { type: i2.NovoNavOutletElement, selector: "novo-nav-outlet" }, { type: i2.NovoNavContentElement, selector: "novo-nav-content", inputs: ["active"] }, { type: i3.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i3.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i3.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoItemEndElement, selector: "item-end, novo-item-end" }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
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
          (input)="queryCategories($any($event.target).value)"
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
                    }, styles: [":host{display:block;position:relative}:host button{position:relative;z-index:0}:host.active .dropdown-container{overflow:hidden;max-height:inherit;max-width:400px;min-width:400px;display:block;z-index:9001;border-radius:2px;top:100%;margin-top:5px}:host .dropdown-container{background-color:#fff;list-style:none;line-height:26px;display:none;margin:0;max-height:0;position:absolute;padding:0;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);min-width:180px;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f}:host .dropdown-container .novo-category-dropdown-search{width:100%;padding:5px;border-bottom:1px solid #ccc;position:relative}:host .dropdown-container .novo-category-dropdown-search input{font-size:1em;background:transparent!important;border:none;border-bottom:1px solid #afb9c0;border-radius:0;outline:none;height:2rem;width:95%;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:#26282b;margin:0 0 0 10px}:host .dropdown-container .novo-category-dropdown-search input:hover{border-bottom:1px solid #5f6d78}:host .dropdown-container .novo-category-dropdown-search input:focus{border-bottom:1px solid #4a89dc}:host .dropdown-container .novo-category-dropdown-search input::-moz-placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search input::placeholder{color:var(--form-placeholder)}:host .dropdown-container .novo-category-dropdown-search i.bhi-search,:host .dropdown-container .novo-category-dropdown-search i.bhi-times{position:absolute;bottom:15px;right:5px;color:#aaa;font-size:1.2rem;margin-right:10px}:host .dropdown-container .novo-category-dropdown-search i.bhi-times{cursor:pointer;font-size:1.2rem}:host .dropdown-container footer{padding:5px 23px;border-top:1px solid #ccc;display:flex;justify-content:flex-end}:host .dropdown-container footer>a{margin-left:10px;margin-right:0;font-weight:500}:host .dropdown-container footer.novo-category-dropdown-footer-align-left{justify-content:flex-start}:host .dropdown-container footer.novo-category-dropdown-footer-align-left>a{margin-right:10px;margin-left:0}:host .dropdown-container novo-nav{max-height:140px;overflow:auto;border-bottom:1px solid #ccc}:host .dropdown-container novo-nav>novo-tab{height:30px;min-height:30px}:host .dropdown-container novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;font-size:.9em;padding:.5em;display:flex;align-items:center}:host .dropdown-container novo-list{max-height:350px;overflow:auto}:host .dropdown-container novo-list-item{padding:.5em;flex-shrink:0;cursor:pointer;font-size:.9em}:host .dropdown-container novo-list-item:focus,:host .dropdown-container novo-list-item:hover{background:whitesmoke;color:#4f4f4f}:host .dropdown-container novo-list-item:focus .novo-category-dropdown-hover,:host .dropdown-container novo-list-item:hover .novo-category-dropdown-hover{display:block}:host .dropdown-container novo-list-item .novo-category-dropdown-hover{display:none;color:#4a89dc;font-size:.9em}:host .dropdown-container novo-list-item .novo-category-dropdown-hover>i{font-size:.9em}:host .dropdown-container novo-list-item.novo-category-dropdown-empty-item{pointer-events:none}:host[side=left]{display:flex;flex-direction:column;align-items:flex-start}:host[side=right]{display:flex;flex-direction:column;align-items:flex-end}:host[side=right] .dropdown-container{right:0}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NhdGVnb3J5LWRyb3Bkb3duL0NhdGVnb3J5RHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFPLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUF1RWpFLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxZQUFZO0lBMkMzRCxZQUFZLE9BQW1CLEVBQVMsTUFBd0I7UUFDOUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRHVCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBMUNoRSxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBSTNCLGtFQUFrRTtRQUVsRSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsNkNBQTZDO1FBRTdDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBaUIvQixxREFBcUQ7UUFFckQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELHdEQUF3RDtRQUV4RCxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBV3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQVZELElBQ0ksVUFBVSxDQUFDLFVBQWU7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1B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QUNFLHdCQUF3QixZQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDVCxRQUVLO3dCQUNKLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGdCQUFnQixFQUFFLFFBQVE7cUJBQzNCO2dJQVdELGdCQUFnQjtzQkFEZixLQUFLO2dCQUlOLGFBQWE7c0JBRFosS0FBSztnQkFVTixNQUFNO3NCQURMLEtBQUs7Z0JBUU4sTUFBTTtzQkFETCxLQUFLO2dCQUlOLE9BQU87c0JBRE4sTUFBTTt1QkFBQyxjQUFjO2dCQUl0QixnQkFBZ0I7c0JBRGYsTUFBTTtnQkFJSCxVQUFVO3NCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycywgS2V5LCBPdXRzaWRlQ2xpY2sgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvRHJvcGRvd25TZWFyY2hDb25maWcge1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBlbXB0eU1lc3NhZ2U6IHN0cmluZztcbiAgZGVib3VuY2U6IG51bWJlcjtcbiAgY29tcGFyZTogKHF1ZXJ5OiBzdHJpbmcsIGl0ZW06IGFueSkgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb3ZvRHJvcGRvd25Gb290ZXJDb25maWcge1xuICBhbGlnbj86ICdsZWZ0JyB8ICdyaWdodCc7XG4gIGxpbmtzPzogTm92b0Ryb3Bkb3duRm9vdGVyTGlua1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdm9Ecm9wZG93bkZvb3Rlckxpbmsge1xuICBsYWJlbDogc3RyaW5nO1xuICBjYWxsYmFjazogKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWNhdGVnb3J5LWRyb3Bkb3duJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJidXR0b25cIj48L25nLWNvbnRlbnQ+XG4gICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWNvbnRhaW5lclwiICpuZ0lmPVwiYWN0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1zZWFyY2hcIiAqbmdJZj1cInNlYXJjaFwiIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tc2VhcmNoXCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VhcmNoLnBsYWNlaG9sZGVyIHx8IGxhYmVscy5zZWFyY2hcIlxuICAgICAgICAgIFt2YWx1ZV09XCJfcXVlcnlcIlxuICAgICAgICAgIChpbnB1dCk9XCJxdWVyeUNhdGVnb3JpZXMoJGFueSgkZXZlbnQudGFyZ2V0KS52YWx1ZSlcIlxuICAgICAgICAvPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiFfcXVlcnlcIj48L2k+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXRpbWVzXCIgKm5nSWY9XCJfcXVlcnlcIiAoY2xpY2spPVwiY2xlYXJRdWVyeSgkZXZlbnQpXCI+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgICA8bm92by1uYXYgdGhlbWU9XCJ3aGl0ZVwiIFtvdXRsZXRdPVwibm92b0NhdGVnb3J5RHJvcGRvd25PdXRsZXRcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICA8bm92by10YWIgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIF9jYXRlZ29yaWVzXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhdGVnb3J5XCIgKGFjdGl2ZUNoYW5nZSk9XCJvbkNhdGVnb3J5U2VsZWN0ZWQoY2F0ZWdvcnkpXCI+XG4gICAgICAgICAgPHNwYW4+e3sgY2F0ZWdvcnkgfX0gKHt7IF9jYXRlZ29yeU1hcFtjYXRlZ29yeV0ubGVuZ3RoIH19KTwvc3Bhbj5cbiAgICAgICAgPC9ub3ZvLXRhYj5cbiAgICAgIDwvbm92by1uYXY+XG4gICAgICA8bm92by1uYXYtb3V0bGV0ICNub3ZvQ2F0ZWdvcnlEcm9wZG93bk91dGxldD5cbiAgICAgICAgPG5vdm8tbmF2LWNvbnRlbnQgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIF9jYXRlZ29yaWVzXCI+XG4gICAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIF9jYXRlZ29yeU1hcFtjYXRlZ29yeV1cIlxuICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiaXRlbS5sYWJlbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgaXRlbS5sYWJlbCB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICA8aXRlbS1lbmQgY2xhc3M9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLWhvdmVyXCIgKm5nSWY9XCJpdGVtLmhvdmVyVGV4dCAmJiAhaXRlbS5zZWxlY3RlZFwiPnt7IGl0ZW0uaG92ZXJUZXh0IH19PC9pdGVtLWVuZD5cbiAgICAgICAgICAgICAgPGl0ZW0tZW5kIGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1ob3ZlclwiICpuZ0lmPVwiaXRlbS5ob3Zlckljb24gJiYgIWl0ZW0uc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgID48aSBjbGFzcz1cImJoaS17eyBpdGVtLmhvdmVySWNvbiB9fVwiPjwvaVxuICAgICAgICAgICAgICA+PC9pdGVtLWVuZD5cbiAgICAgICAgICAgICAgPGl0ZW0tZW5kICpuZ0lmPVwiaXRlbS5zZWxlY3RlZFwiPjxpIGNsYXNzPVwiYmhpLWNoZWNrXCI+PC9pPjwvaXRlbS1lbmQ+XG4gICAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtICpuZ0lmPVwiX2NhdGVnb3J5TWFwW2NhdGVnb3J5XS5sZW5ndGggPT09IDAgJiYgc2VhcmNoXCIgY2xhc3M9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLWVtcHR5LWl0ZW1cIj5cbiAgICAgICAgICAgICAgPGl0ZW0tY29udGVudD57eyBzZWFyY2guZW1wdHlNZXNzYWdlIHx8IGxhYmVscy5ub0l0ZW1zIH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICAgIDwvbm92by1saXN0PlxuICAgICAgICA8L25vdm8tbmF2LWNvbnRlbnQ+XG4gICAgICA8L25vdm8tbmF2LW91dGxldD5cbiAgICAgIDxmb290ZXIgKm5nSWY9XCJmb290ZXJcIiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tZm9vdGVyLWFsaWduLXt7IGZvb3Rlci5hbGlnbiB8fCAncmlnaHQnIH19XCI+XG4gICAgICAgIDxhICpuZ0Zvcj1cImxldCBsaW5rIG9mIGZvb3Rlci5saW5rc1wiIChjbGljayk9XCJleGVjdXRlQ2xpY2tDYWxsYmFjaygkZXZlbnQsIGxpbmspXCI+e3sgbGluay5sYWJlbCB9fTwvYT5cbiAgICAgIDwvZm9vdGVyPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9DYXRlZ29yeURyb3Bkb3duLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2F0ZWdvcnlEcm9wZG93bkVsZW1lbnQgZXh0ZW5kcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIF9xdWVyeTogc3RyaW5nID0gJyc7XG4gIF9jYXRlZ29yeU1hcDogYW55ID0ge307XG4gIF9jYXRlZ29yaWVzOiBzdHJpbmdbXSA9IFtdO1xuICBjbGlja0hhbmRsZXI6IEZ1bmN0aW9uO1xuICBfbWFzdGVyQ2F0ZWdvcnlNYXA6IGFueTtcbiAgX3F1ZXJ5VGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG4gIC8vIEJvb2xlYW4gdG8ga2VlcCB0aGUgc2VsZWN0aW9uIHBlcnNpc3Qgd2hlbiBjbG9zaW5nIHRoZSBkcm9wZG93blxuICBASW5wdXQoKVxuICBwZXJzaXN0U2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIC8vIEJvb2xlYW4gdG8gY2xvc2UgdGhlIGRyb3Bkb3duIG9uIHNlbGVjdGlvblxuICBASW5wdXQoKVxuICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG4gIC8vIFNlYXJjaCBDb25maWdcbiAgLy8ge1xuICAvLyAgIHBsYWNlaG9sZGVyOiAnU1RSSU5HJyAvLyBkZWZhdWx0cyB0byBcIlNFQVJDSFwiIC0gcGxhY2Vob2xkZXIgZm9yIHNlYXJjaCBpbnB1dFxuICAvLyAgIGVtcHR5TWVzc2FnZTogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJUaGVyZSBhcmUgbm8gaXRlbXMuXCIgLSBlbXB0eSBtZXNzYWdlIHdoZW4gdGhlcmUgYXJlIG5vIGl0ZW1zIGluIHRoZSBjYXRlZ29yeVxuICAvLyAgIGRlYm91bmNlOiAnTlVNQkVSIChpbiBNUyknIC8vIGRlZmF1bHRzIHRvIDMwMG1zIC0gZGVib3VuY2UgdGltZSBmb3IgdGhlIHNlYXJjaFxuICAvLyAgIGNvbXBhcmU6ICdGVU5DVElPTicgLy8gZGVmYXVsdCB0byBzaW1wbGUgaW5kZXhPZiAtIGNvbXBhcmUgZnVuY3Rpb24gZm9yIGNhdGVnb3J5IHNlYXJjaCwgc2hvdWxkIGFjY2VwdCAocXVlcnksIGl0ZW0pIGFuZCByZXR1cm4gdHJ1ZS9mYWxzZVxuICAvLyB9XG4gIEBJbnB1dCgpXG4gIHNlYXJjaDogYW55O1xuICAvLyBGb290ZXIgY29uZmlnXG4gIC8vIHtcbiAgLy8gICBhbGlnbjogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJyaWdodFwiIC0gYWxpZ25tZW50IG9mIHRoZSBsaW5rc1xuICAvLyAgIGxpbmtzOiAnQVJSQVknIC8vIGFycmF5IG9mIGxpbmtzIHRvIGdvIGludG8gdGhlIGZvb3RlciwgYmUgYXdheSBvZiBzcGFjaW5nIC0geyBsYWJlbCwgY2FsbGJhY2sgfSBmb3IgdGhlIG9iamVjdCBpbnNpZGVcbiAgLy8gfVxuICBASW5wdXQoKVxuICBmb290ZXI6IGFueTtcbiAgLy8gRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgQE91dHB1dCgnaXRlbVNlbGVjdGVkJylcbiAgX3NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhIGNhdGVnb3J5IGlzIHNlbGVjdGVkXG4gIEBPdXRwdXQoKVxuICBjYXRlZ29yeVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGNhdGVnb3JpZXMoY2F0ZWdvcmllczogYW55KSB7XG4gICAgdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXAgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRlZ29yaWVzKTtcbiAgICB0aGlzLl9jYXRlZ29yeU1hcCA9IE9iamVjdC5hc3NpZ24oe30sIGNhdGVnb3JpZXMpO1xuICAgIHRoaXMuX2NhdGVnb3JpZXMgPSBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQWN0aXZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIpKSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgIHRoaXMuX2NhdGVnb3J5TWFwW2NhdGVnb3J5XS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIC8vIElmIHdlIHBlcnNpc3QgdGhlIHNlbGVjdGlvbiwgY2xlYXIgYW5kIHNob3cgYSBjaGVja1xuICAgIGlmICh0aGlzLnBlcnNpc3RTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFbWl0IHRoZSBpdGVtXG4gICAgdGhpcy5fc2VsZWN0LmVtaXQoaXRlbSk7XG4gICAgLy8gQ2xvc2UsIGlmIGlucHV0IGlzIHNldFxuICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgb25DYXRlZ29yeVNlbGVjdGVkKGNhdGVnb3J5OiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0ZWQuZW1pdChjYXRlZ29yeSk7XG4gIH1cblxuICBjbGVhclF1ZXJ5KGV2ZW50OiBFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLl9xdWVyeSA9ICcnO1xuICAgIC8vIFJlc2V0IHRoZSBjYXRlZ29yaWVzXG4gICAgdGhpcy5fY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xuICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldO1xuICAgIH0pO1xuICB9XG5cbiAgcXVlcnlDYXRlZ29yaWVzKHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICAvLyBTYXZlIHRoZSBxdWVyeVxuICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG4gICAgLy8gQ2hlY2sgdGltZW91dFxuICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgIH1cbiAgICAvLyBTdG9yZSBhIHRpbWVvdXQsIHRvIGRlYm91bmNlIHVzZXIgaW5wdXRcbiAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLmNvbXBhcmUpIHtcbiAgICAgICAgICB0aGlzLl9jYXRlZ29yeU1hcFtjYXRlZ29yeV0gPSB0aGlzLl9tYXN0ZXJDYXRlZ29yeU1hcFtjYXRlZ29yeV0uZmlsdGVyKChpdGVtKSA9PiB0aGlzLnNlYXJjaC5jb21wYXJlKHF1ZXJ5LCBpdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtKSA9PiB+aXRlbS5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgdGhpcy5zZWFyY2guZGVib3VuY2UgfHwgMzAwKTtcbiAgfVxuXG4gIGV4ZWN1dGVDbGlja0NhbGxiYWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBsaW5rOiBOb3ZvRHJvcGRvd25Gb290ZXJMaW5rKSB7XG4gICAgbGluay5jYWxsYmFjayhldmVudCk7XG4gICAgLy8gQ2xvc2UsIGlmIGlucHV0IGlzIHNldFxuICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=