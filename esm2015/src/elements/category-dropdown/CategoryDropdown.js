// NG2
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
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
NovoCategoryDropdownElement.decorators = [
    { type: Component, args: [{
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
                }
            },] }
];
NovoCategoryDropdownElement.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService }
];
NovoCategoryDropdownElement.propDecorators = {
    persistSelection: [{ type: Input }],
    closeOnSelect: [{ type: Input }],
    search: [{ type: Input }],
    footer: [{ type: Input }],
    _select: [{ type: Output, args: ['itemSelected',] }],
    categorySelected: [{ type: Output }],
    categories: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9jYXRlZ29yeS1kcm9wZG93bi9DYXRlZ29yeURyb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFxRHRFLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxZQUFZO0lBMkMzRCxZQUFZLE9BQW1CLEVBQVMsTUFBd0I7UUFDOUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRHVCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBMUNoRSxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBSTNCLGtFQUFrRTtRQUVsRSxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsNkNBQTZDO1FBRTdDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBaUIvQixxREFBcUQ7UUFFckQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELHdEQUF3RDtRQUV4RCxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQVc1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxD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QVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osV0FBVyxFQUFFLG1CQUFtQjtvQkFDaEMsZ0JBQWdCLEVBQUUsUUFBUTtpQkFDM0I7YUFDRjs7O1lBekRtQixVQUFVO1lBQ3JCLGdCQUFnQjs7OytCQWlFdEIsS0FBSzs0QkFHTCxLQUFLO3FCQVNMLEtBQUs7cUJBT0wsS0FBSztzQkFHTCxNQUFNLFNBQUMsY0FBYzsrQkFHckIsTUFBTTt5QkFHTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBPdXRzaWRlQ2xpY2sgfSBmcm9tICcuLi8uLi91dGlscy9vdXRzaWRlLWNsaWNrL091dHNpZGVDbGljayc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2F0ZWdvcnktZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJ1dHRvblwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tY29udGFpbmVyXCIgKm5nSWY9XCJhY3RpdmVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLXNlYXJjaFwiICpuZ0lmPVwic2VhcmNoXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1zZWFyY2hcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJzZWFyY2gucGxhY2Vob2xkZXIgfHwgbGFiZWxzLnNlYXJjaFwiXG4gICAgICAgICAgW3ZhbHVlXT1cIl9xdWVyeVwiXG4gICAgICAgICAgKGlucHV0KT1cInF1ZXJ5Q2F0ZWdvcmllcygkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiICpuZ0lmPVwiIV9xdWVyeVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktdGltZXNcIiAqbmdJZj1cIl9xdWVyeVwiIChjbGljayk9XCJjbGVhclF1ZXJ5KCRldmVudClcIj48L2k+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxub3ZvLW5hdiB0aGVtZT1cIndoaXRlXCIgW291dGxldF09XCJub3ZvQ2F0ZWdvcnlEcm9wZG93bk91dGxldFwiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgIDxub3ZvLXRhYiAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgX2NhdGVnb3JpZXNcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2F0ZWdvcnlcIiAoYWN0aXZlQ2hhbmdlKT1cIm9uQ2F0ZWdvcnlTZWxlY3RlZChjYXRlZ29yeSlcIj5cbiAgICAgICAgICA8c3Bhbj57eyBjYXRlZ29yeSB9fSAoe3sgX2NhdGVnb3J5TWFwW2NhdGVnb3J5XS5sZW5ndGggfX0pPC9zcGFuPlxuICAgICAgICA8L25vdm8tdGFiPlxuICAgICAgPC9ub3ZvLW5hdj5cbiAgICAgIDxub3ZvLW5hdi1vdXRsZXQgI25vdm9DYXRlZ29yeURyb3Bkb3duT3V0bGV0PlxuICAgICAgICA8bm92by1uYXYtY29udGVudCAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgX2NhdGVnb3JpZXNcIj5cbiAgICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2NhdGVnb3J5TWFwW2NhdGVnb3J5XVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QoJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpdGVtLmxhYmVsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGl0ZW0tY29udGVudD57eyBpdGVtLmxhYmVsIH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxpdGVtLWVuZCBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24taG92ZXJcIiAqbmdJZj1cIml0ZW0uaG92ZXJUZXh0ICYmICFpdGVtLnNlbGVjdGVkXCI+e3sgaXRlbS5ob3ZlclRleHQgfX08L2l0ZW0tZW5kPlxuICAgICAgICAgICAgICA8aXRlbS1lbmQgY2xhc3M9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLWhvdmVyXCIgKm5nSWY9XCJpdGVtLmhvdmVySWNvbiAmJiAhaXRlbS5zZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgPjxpIGNsYXNzPVwiYmhpLXt7IGl0ZW0uaG92ZXJJY29uIH19XCI+PC9pXG4gICAgICAgICAgICAgID48L2l0ZW0tZW5kPlxuICAgICAgICAgICAgICA8aXRlbS1lbmQgKm5nSWY9XCJpdGVtLnNlbGVjdGVkXCI+PGkgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+PC9pdGVtLWVuZD5cbiAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8bm92by1saXN0LWl0ZW0gKm5nSWY9XCJfY2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmxlbmd0aCA9PT0gMCAmJiBzZWFyY2hcIiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tZW1wdHktaXRlbVwiPlxuICAgICAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IHNlYXJjaC5lbXB0eU1lc3NhZ2UgfHwgbGFiZWxzLm5vSXRlbXMgfX08L2l0ZW0tY29udGVudD5cbiAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICAgIDwvbm92by1uYXYtY29udGVudD5cbiAgICAgIDwvbm92by1uYXYtb3V0bGV0PlxuICAgICAgPGZvb3RlciAqbmdJZj1cImZvb3RlclwiIGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1mb290ZXItYWxpZ24te3sgZm9vdGVyLmFsaWduIHx8ICdyaWdodCcgfX1cIj5cbiAgICAgICAgPGEgKm5nRm9yPVwibGV0IGxpbmsgb2YgZm9vdGVyLmxpbmtzXCIgKGNsaWNrKT1cImV4ZWN1dGVDbGlja0NhbGxiYWNrKCRldmVudCwgbGluaylcIj57eyBsaW5rLmxhYmVsIH19PC9hPlxuICAgICAgPC9mb290ZXI+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhdGVnb3J5RHJvcGRvd25FbGVtZW50IGV4dGVuZHMgT3V0c2lkZUNsaWNrIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBfcXVlcnk6IHN0cmluZyA9ICcnO1xuICBfY2F0ZWdvcnlNYXA6IGFueSA9IHt9O1xuICBfY2F0ZWdvcmllczogc3RyaW5nW10gPSBbXTtcbiAgY2xpY2tIYW5kbGVyOiBGdW5jdGlvbjtcbiAgX21hc3RlckNhdGVnb3J5TWFwOiBhbnk7XG4gIF9xdWVyeVRpbWVvdXQ6IGFueTtcbiAgLy8gQm9vbGVhbiB0byBrZWVwIHRoZSBzZWxlY3Rpb24gcGVyc2lzdCB3aGVuIGNsb3NpbmcgdGhlIGRyb3Bkb3duXG4gIEBJbnB1dCgpXG4gIHBlcnNpc3RTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gQm9vbGVhbiB0byBjbG9zZSB0aGUgZHJvcGRvd24gb24gc2VsZWN0aW9uXG4gIEBJbnB1dCgpXG4gIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gU2VhcmNoIENvbmZpZ1xuICAvLyB7XG4gIC8vICAgcGxhY2Vob2xkZXI6ICdTVFJJTkcnIC8vIGRlZmF1bHRzIHRvIFwiU0VBUkNIXCIgLSBwbGFjZWhvbGRlciBmb3Igc2VhcmNoIGlucHV0XG4gIC8vICAgZW1wdHlNZXNzYWdlOiAnU1RSSU5HJyAvLyBkZWZhdWx0cyB0byBcIlRoZXJlIGFyZSBubyBpdGVtcy5cIiAtIGVtcHR5IG1lc3NhZ2Ugd2hlbiB0aGVyZSBhcmUgbm8gaXRlbXMgaW4gdGhlIGNhdGVnb3J5XG4gIC8vICAgZGVib3VuY2U6ICdOVU1CRVIgKGluIE1TKScgLy8gZGVmYXVsdHMgdG8gMzAwbXMgLSBkZWJvdW5jZSB0aW1lIGZvciB0aGUgc2VhcmNoXG4gIC8vICAgY29tcGFyZTogJ0ZVTkNUSU9OJyAvLyBkZWZhdWx0IHRvIHNpbXBsZSBpbmRleE9mIC0gY29tcGFyZSBmdW5jdGlvbiBmb3IgY2F0ZWdvcnkgc2VhcmNoLCBzaG91bGQgYWNjZXB0IChxdWVyeSwgaXRlbSkgYW5kIHJldHVybiB0cnVlL2ZhbHNlXG4gIC8vIH1cbiAgQElucHV0KClcbiAgc2VhcmNoOiBhbnk7XG4gIC8vIEZvb3RlciBjb25maWdcbiAgLy8ge1xuICAvLyAgIGFsaWduOiAnU1RSSU5HJyAvLyBkZWZhdWx0cyB0byBcInJpZ2h0XCIgLSBhbGlnbm1lbnQgb2YgdGhlIGxpbmtzXG4gIC8vICAgbGlua3M6ICdBUlJBWScgLy8gYXJyYXkgb2YgbGlua3MgdG8gZ28gaW50byB0aGUgZm9vdGVyLCBiZSBhd2F5IG9mIHNwYWNpbmcgLSB7IGxhYmVsLCBjYWxsYmFjayB9IGZvciB0aGUgb2JqZWN0IGluc2lkZVxuICAvLyB9XG4gIEBJbnB1dCgpXG4gIGZvb3RlcjogYW55O1xuICAvLyBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaXRlbSBpcyBzZWxlY3RlZFxuICBAT3V0cHV0KCdpdGVtU2VsZWN0ZWQnKVxuICBfc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGEgY2F0ZWdvcnkgaXMgc2VsZWN0ZWRcbiAgQE91dHB1dCgpXG4gIGNhdGVnb3J5U2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGNhdGVnb3JpZXMoY2F0ZWdvcmllczogYW55KSB7XG4gICAgdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXAgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRlZ29yaWVzKTtcbiAgICB0aGlzLl9jYXRlZ29yeU1hcCA9IE9iamVjdC5hc3NpZ24oe30sIGNhdGVnb3JpZXMpO1xuICAgIHRoaXMuX2NhdGVnb3JpZXMgPSBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQWN0aXZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmIChldmVudC5rZXkgPT09IEtleS5Fc2NhcGUgfHwgZXZlbnQua2V5ID09PSBLZXkuRW50ZXIpKSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgIHRoaXMuX2NhdGVnb3J5TWFwW2NhdGVnb3J5XS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0KGV2ZW50LCBpdGVtKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIC8vIElmIHdlIHBlcnNpc3QgdGhlIHNlbGVjdGlvbiwgY2xlYXIgYW5kIHNob3cgYSBjaGVja1xuICAgIGlmICh0aGlzLnBlcnNpc3RTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFbWl0IHRoZSBpdGVtXG4gICAgdGhpcy5fc2VsZWN0LmVtaXQoaXRlbSk7XG4gICAgLy8gQ2xvc2UsIGlmIGlucHV0IGlzIHNldFxuICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMudG9nZ2xlQWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgb25DYXRlZ29yeVNlbGVjdGVkKGNhdGVnb3J5KSB7XG4gICAgdGhpcy5jYXRlZ29yeVNlbGVjdGVkLmVtaXQoY2F0ZWdvcnkpO1xuICB9XG5cbiAgY2xlYXJRdWVyeShldmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLl9xdWVyeSA9ICcnO1xuICAgIC8vIFJlc2V0IHRoZSBjYXRlZ29yaWVzXG4gICAgdGhpcy5fY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xuICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldO1xuICAgIH0pO1xuICB9XG5cbiAgcXVlcnlDYXRlZ29yaWVzKHF1ZXJ5KSB7XG4gICAgLy8gU2F2ZSB0aGUgcXVlcnlcbiAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuICAgIC8vIENoZWNrIHRpbWVvdXRcbiAgICBpZiAodGhpcy5fcXVlcnlUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fcXVlcnlUaW1lb3V0KTtcbiAgICB9XG4gICAgLy8gU3RvcmUgYSB0aW1lb3V0LCB0byBkZWJvdW5jZSB1c2VyIGlucHV0XG4gICAgdGhpcy5fcXVlcnlUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaC5jb21wYXJlKSB7XG4gICAgICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmZpbHRlcigoaXRlbSkgPT4gdGhpcy5zZWFyY2guY29tcGFyZShxdWVyeSwgaXRlbSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NhdGVnb3J5TWFwW2NhdGVnb3J5XSA9IHRoaXMuX21hc3RlckNhdGVnb3J5TWFwW2NhdGVnb3J5XS5maWx0ZXIoXG4gICAgICAgICAgICAoaXRlbSkgPT4gfml0ZW0ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIHRoaXMuc2VhcmNoLmRlYm91bmNlIHx8IDMwMCk7XG4gIH1cblxuICBleGVjdXRlQ2xpY2tDYWxsYmFjayhldmVudCwgbGluaykge1xuICAgIGxpbmsuY2FsbGJhY2soZXZlbnQpO1xuICAgIC8vIENsb3NlLCBpZiBpbnB1dCBpcyBzZXRcbiAgICBpZiAodGhpcy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19