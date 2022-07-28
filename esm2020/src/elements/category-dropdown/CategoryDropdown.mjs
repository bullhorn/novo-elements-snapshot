// NG2
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "../tabs/Tabs";
import * as i3 from "../list/List";
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
  `, isInline: true, components: [{ type: i2.NovoNavElement, selector: "novo-nav", inputs: ["theme", "direction", "outlet", "router", "condensed", "selectedIndex"], outputs: ["selectedIndexChange"] }, { type: i2.NovoTabElement, selector: "novo-tab", inputs: ["active", "color", "disabled"], outputs: ["activeChange"] }, { type: i2.NovoNavOutletElement, selector: "novo-nav-outlet" }, { type: i2.NovoNavContentElement, selector: "novo-nav-content", inputs: ["active"] }, { type: i3.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i3.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i3.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoItemEndElement, selector: "item-end, novo-item-end" }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCategoryDropdownElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-category-dropdown',
                    template: `
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
  `,
                    host: {
                        '(keydown)': 'onKeyDown($event)',
                        '[class.active]': 'active',
                    },
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2NhdGVnb3J5LWRyb3Bkb3duL0NhdGVnb3J5RHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7O0FBcUR0RSxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTtJQTJDM0QsWUFBWSxPQUFtQixFQUFTLE1BQXdCO1FBQzlELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUR1QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQTFDaEUsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUN2QixnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUkzQixrRUFBa0U7UUFFbEUscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLDZDQUE2QztRQUU3QyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQWlCL0IscURBQXFEO1FBRXJELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCx3REFBd0Q7UUFFeEQscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFXNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBVkQsSUFD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Ozs7Ozs7R0EyQ1Q7NEZBTVUsMkJBQTJCO2tCQW5EdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGdCQUFnQixFQUFFLFFBQVE7cUJBQzNCO2lCQUNGO2dJQVVDLGdCQUFnQjtzQkFEZixLQUFLO2dCQUlOLGFBQWE7c0JBRFosS0FBSztnQkFVTixNQUFNO3NCQURMLEtBQUs7Z0JBUU4sTUFBTTtzQkFETCxLQUFLO2dCQUlOLE9BQU87c0JBRE4sTUFBTTt1QkFBQyxjQUFjO2dCQUl0QixnQkFBZ0I7c0JBRGYsTUFBTTtnQkFJSCxVQUFVO3NCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XG4vLyBBUFBcbmltcG9ydCB7IE91dHNpZGVDbGljayB9IGZyb20gJy4uLy4uL3V0aWxzL291dHNpZGUtY2xpY2svT3V0c2lkZUNsaWNrJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXRlZ29yeS1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYnV0dG9uXCI+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1jb250YWluZXJcIiAqbmdJZj1cImFjdGl2ZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tc2VhcmNoXCIgKm5nSWY9XCJzZWFyY2hcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLXNlYXJjaFwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlYXJjaC5wbGFjZWhvbGRlciB8fCBsYWJlbHMuc2VhcmNoXCJcbiAgICAgICAgICBbdmFsdWVdPVwiX3F1ZXJ5XCJcbiAgICAgICAgICAoaW5wdXQpPVwicXVlcnlDYXRlZ29yaWVzKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgKm5nSWY9XCIhX3F1ZXJ5XCI+PC9pPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiICpuZ0lmPVwiX3F1ZXJ5XCIgKGNsaWNrKT1cImNsZWFyUXVlcnkoJGV2ZW50KVwiPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5vdm8tbmF2IHRoZW1lPVwid2hpdGVcIiBbb3V0bGV0XT1cIm5vdm9DYXRlZ29yeURyb3Bkb3duT3V0bGV0XCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tdGFiICpuZ0Zvcj1cImxldCBjYXRlZ29yeSBvZiBfY2F0ZWdvcmllc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXRlZ29yeVwiIChhY3RpdmVDaGFuZ2UpPVwib25DYXRlZ29yeVNlbGVjdGVkKGNhdGVnb3J5KVwiPlxuICAgICAgICAgIDxzcGFuPnt7IGNhdGVnb3J5IH19ICh7eyBfY2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmxlbmd0aCB9fSk8L3NwYW4+XG4gICAgICAgIDwvbm92by10YWI+XG4gICAgICA8L25vdm8tbmF2PlxuICAgICAgPG5vdm8tbmF2LW91dGxldCAjbm92b0NhdGVnb3J5RHJvcGRvd25PdXRsZXQ+XG4gICAgICAgIDxub3ZvLW5hdi1jb250ZW50ICpuZ0Zvcj1cImxldCBjYXRlZ29yeSBvZiBfY2F0ZWdvcmllc1wiPlxuICAgICAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfY2F0ZWdvcnlNYXBbY2F0ZWdvcnldXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIml0ZW0ubGFiZWxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IGl0ZW0ubGFiZWwgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgPGl0ZW0tZW5kIGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1ob3ZlclwiICpuZ0lmPVwiaXRlbS5ob3ZlclRleHQgJiYgIWl0ZW0uc2VsZWN0ZWRcIj57eyBpdGVtLmhvdmVyVGV4dCB9fTwvaXRlbS1lbmQ+XG4gICAgICAgICAgICAgIDxpdGVtLWVuZCBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24taG92ZXJcIiAqbmdJZj1cIml0ZW0uaG92ZXJJY29uICYmICFpdGVtLnNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICA+PGkgY2xhc3M9XCJiaGkte3sgaXRlbS5ob3Zlckljb24gfX1cIj48L2lcbiAgICAgICAgICAgICAgPjwvaXRlbS1lbmQ+XG4gICAgICAgICAgICAgIDxpdGVtLWVuZCAqbmdJZj1cIml0ZW0uc2VsZWN0ZWRcIj48aSBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT48L2l0ZW0tZW5kPlxuICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdJZj1cIl9jYXRlZ29yeU1hcFtjYXRlZ29yeV0ubGVuZ3RoID09PSAwICYmIHNlYXJjaFwiIGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1lbXB0eS1pdGVtXCI+XG4gICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgc2VhcmNoLmVtcHR5TWVzc2FnZSB8fCBsYWJlbHMubm9JdGVtcyB9fTwvaXRlbS1jb250ZW50PlxuICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgPC9ub3ZvLW5hdi1jb250ZW50PlxuICAgICAgPC9ub3ZvLW5hdi1vdXRsZXQ+XG4gICAgICA8Zm9vdGVyICpuZ0lmPVwiZm9vdGVyXCIgY2xhc3M9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLWZvb3Rlci1hbGlnbi17eyBmb290ZXIuYWxpZ24gfHwgJ3JpZ2h0JyB9fVwiPlxuICAgICAgICA8YSAqbmdGb3I9XCJsZXQgbGluayBvZiBmb290ZXIubGlua3NcIiAoY2xpY2spPVwiZXhlY3V0ZUNsaWNrQ2FsbGJhY2soJGV2ZW50LCBsaW5rKVwiPnt7IGxpbmsubGFiZWwgfX08L2E+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICcoa2V5ZG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQ2F0ZWdvcnlEcm9wZG93bkVsZW1lbnQgZXh0ZW5kcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIF9xdWVyeTogc3RyaW5nID0gJyc7XG4gIF9jYXRlZ29yeU1hcDogYW55ID0ge307XG4gIF9jYXRlZ29yaWVzOiBzdHJpbmdbXSA9IFtdO1xuICBjbGlja0hhbmRsZXI6IEZ1bmN0aW9uO1xuICBfbWFzdGVyQ2F0ZWdvcnlNYXA6IGFueTtcbiAgX3F1ZXJ5VGltZW91dDogYW55O1xuICAvLyBCb29sZWFuIHRvIGtlZXAgdGhlIHNlbGVjdGlvbiBwZXJzaXN0IHdoZW4gY2xvc2luZyB0aGUgZHJvcGRvd25cbiAgQElucHV0KClcbiAgcGVyc2lzdFNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBCb29sZWFuIHRvIGNsb3NlIHRoZSBkcm9wZG93biBvbiBzZWxlY3Rpb25cbiAgQElucHV0KClcbiAgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBTZWFyY2ggQ29uZmlnXG4gIC8vIHtcbiAgLy8gICBwbGFjZWhvbGRlcjogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJTRUFSQ0hcIiAtIHBsYWNlaG9sZGVyIGZvciBzZWFyY2ggaW5wdXRcbiAgLy8gICBlbXB0eU1lc3NhZ2U6ICdTVFJJTkcnIC8vIGRlZmF1bHRzIHRvIFwiVGhlcmUgYXJlIG5vIGl0ZW1zLlwiIC0gZW1wdHkgbWVzc2FnZSB3aGVuIHRoZXJlIGFyZSBubyBpdGVtcyBpbiB0aGUgY2F0ZWdvcnlcbiAgLy8gICBkZWJvdW5jZTogJ05VTUJFUiAoaW4gTVMpJyAvLyBkZWZhdWx0cyB0byAzMDBtcyAtIGRlYm91bmNlIHRpbWUgZm9yIHRoZSBzZWFyY2hcbiAgLy8gICBjb21wYXJlOiAnRlVOQ1RJT04nIC8vIGRlZmF1bHQgdG8gc2ltcGxlIGluZGV4T2YgLSBjb21wYXJlIGZ1bmN0aW9uIGZvciBjYXRlZ29yeSBzZWFyY2gsIHNob3VsZCBhY2NlcHQgKHF1ZXJ5LCBpdGVtKSBhbmQgcmV0dXJuIHRydWUvZmFsc2VcbiAgLy8gfVxuICBASW5wdXQoKVxuICBzZWFyY2g6IGFueTtcbiAgLy8gRm9vdGVyIGNvbmZpZ1xuICAvLyB7XG4gIC8vICAgYWxpZ246ICdTVFJJTkcnIC8vIGRlZmF1bHRzIHRvIFwicmlnaHRcIiAtIGFsaWdubWVudCBvZiB0aGUgbGlua3NcbiAgLy8gICBsaW5rczogJ0FSUkFZJyAvLyBhcnJheSBvZiBsaW5rcyB0byBnbyBpbnRvIHRoZSBmb290ZXIsIGJlIGF3YXkgb2Ygc3BhY2luZyAtIHsgbGFiZWwsIGNhbGxiYWNrIH0gZm9yIHRoZSBvYmplY3QgaW5zaWRlXG4gIC8vIH1cbiAgQElucHV0KClcbiAgZm9vdGVyOiBhbnk7XG4gIC8vIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpdGVtIGlzIHNlbGVjdGVkXG4gIEBPdXRwdXQoJ2l0ZW1TZWxlY3RlZCcpXG4gIF9zZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYSBjYXRlZ29yeSBpcyBzZWxlY3RlZFxuICBAT3V0cHV0KClcbiAgY2F0ZWdvcnlTZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASW5wdXQoKVxuICBzZXQgY2F0ZWdvcmllcyhjYXRlZ29yaWVzOiBhbnkpIHtcbiAgICB0aGlzLl9tYXN0ZXJDYXRlZ29yeU1hcCA9IE9iamVjdC5hc3NpZ24oe30sIGNhdGVnb3JpZXMpO1xuICAgIHRoaXMuX2NhdGVnb3J5TWFwID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0ZWdvcmllcyk7XG4gICAgdGhpcy5fY2F0ZWdvcmllcyA9IE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy50b2dnbGVBY3RpdmUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBvbktleURvd24oZXZlbnQpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgKGV2ZW50LmtleSA9PT0gS2V5LkVzY2FwZSB8fCBldmVudC5rZXkgPT09IEtleS5FbnRlcikpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5fY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xuICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZWxlY3QoZXZlbnQsIGl0ZW0pIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgLy8gSWYgd2UgcGVyc2lzdCB0aGUgc2VsZWN0aW9uLCBjbGVhciBhbmQgc2hvdyBhIGNoZWNrXG4gICAgaWYgKHRoaXMucGVyc2lzdFNlbGVjdGlvbikge1xuICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuICAgIC8vIEVtaXQgdGhlIGl0ZW1cbiAgICB0aGlzLl9zZWxlY3QuZW1pdChpdGVtKTtcbiAgICAvLyBDbG9zZSwgaWYgaW5wdXQgaXMgc2V0XG4gICAgaWYgKHRoaXMuY2xvc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy50b2dnbGVBY3RpdmUoKTtcbiAgICB9XG4gIH1cblxuICBvbkNhdGVnb3J5U2VsZWN0ZWQoY2F0ZWdvcnkpIHtcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0ZWQuZW1pdChjYXRlZ29yeSk7XG4gIH1cblxuICBjbGVhclF1ZXJ5KGV2ZW50KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuX3F1ZXJ5ID0gJyc7XG4gICAgLy8gUmVzZXQgdGhlIGNhdGVnb3JpZXNcbiAgICB0aGlzLl9jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XG4gICAgICB0aGlzLl9jYXRlZ29yeU1hcFtjYXRlZ29yeV0gPSB0aGlzLl9tYXN0ZXJDYXRlZ29yeU1hcFtjYXRlZ29yeV07XG4gICAgfSk7XG4gIH1cblxuICBxdWVyeUNhdGVnb3JpZXMocXVlcnkpIHtcbiAgICAvLyBTYXZlIHRoZSBxdWVyeVxuICAgIHRoaXMuX3F1ZXJ5ID0gcXVlcnk7XG4gICAgLy8gQ2hlY2sgdGltZW91dFxuICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgIH1cbiAgICAvLyBTdG9yZSBhIHRpbWVvdXQsIHRvIGRlYm91bmNlIHVzZXIgaW5wdXRcbiAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLmNvbXBhcmUpIHtcbiAgICAgICAgICB0aGlzLl9jYXRlZ29yeU1hcFtjYXRlZ29yeV0gPSB0aGlzLl9tYXN0ZXJDYXRlZ29yeU1hcFtjYXRlZ29yeV0uZmlsdGVyKChpdGVtKSA9PiB0aGlzLnNlYXJjaC5jb21wYXJlKHF1ZXJ5LCBpdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmZpbHRlcihcbiAgICAgICAgICAgIChpdGVtKSA9PiB+aXRlbS5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudG9Mb3dlckNhc2UoKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgdGhpcy5zZWFyY2guZGVib3VuY2UgfHwgMzAwKTtcbiAgfVxuXG4gIGV4ZWN1dGVDbGlja0NhbGxiYWNrKGV2ZW50LCBsaW5rKSB7XG4gICAgbGluay5jYWxsYmFjayhldmVudCk7XG4gICAgLy8gQ2xvc2UsIGlmIGlucHV0IGlzIHNldFxuICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=