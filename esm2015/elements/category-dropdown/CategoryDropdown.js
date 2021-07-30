// NG2
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
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
        if (this.active && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
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
                <input type="text" [placeholder]="search.placeholder || labels.search" [value]="_query" (input)="queryCategories($event.target.value)"/>
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
                        <novo-list-item *ngFor="let item of _categoryMap[category]" (click)="select($event, item)" [attr.data-automation-id]="item.label">
                            <item-content>{{ item.label }}</item-content>
                            <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverText && !item.selected">{{ item.hoverText }}</item-end>
                            <item-end class="novo-category-dropdown-hover" *ngIf="item.hoverIcon && !item.selected"><i class="bhi-{{ item.hoverIcon }}"></i></item-end>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2F0ZWdvcnktZHJvcGRvd24vQ2F0ZWdvcnlEcm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQTBDckUsTUFBTSxPQUFPLDJCQUE0QixTQUFRLFlBQVk7SUEyQzNELFlBQVksT0FBbUIsRUFBUyxNQUF3QjtRQUM5RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEdUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUExQ2hFLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsaUJBQVksR0FBUSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFJM0Isa0VBQWtFO1FBRWxFLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyw2Q0FBNkM7UUFFN0Msa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFpQi9CLHFEQUFxRDtRQUVyRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsd0RBQXdEO1FBRXhELHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBVzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlB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SCxDQUFDOzs7WUF6S0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQ1A7Z0JBQ0gsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSxtQkFBbUI7b0JBQ2hDLGdCQUFnQixFQUFFLFFBQVE7aUJBQzNCO2FBQ0Y7OztZQTlDbUIsVUFBVTtZQUtyQixnQkFBZ0I7OzsrQkFrRHRCLEtBQUs7NEJBR0wsS0FBSztxQkFTTCxLQUFLO3FCQU9MLEtBQUs7c0JBR0wsTUFBTSxTQUFDLGNBQWM7K0JBR3JCLE1BQU07eUJBR04sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE91dHNpZGVDbGljayB9IGZyb20gJy4uLy4uL3V0aWxzL291dHNpZGUtY2xpY2svT3V0c2lkZUNsaWNrJztcclxuaW1wb3J0IHsgS2V5Q29kZXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXktY29kZXMvS2V5Q29kZXMnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNhdGVnb3J5LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJ1dHRvblwiPjwvbmctY29udGVudD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tY29udGFpbmVyXCIgKm5nSWY9XCJhY3RpdmVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tc2VhcmNoXCIgKm5nSWY9XCJzZWFyY2hcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWNhdGVnb3J5LWRyb3Bkb3duLXNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW3BsYWNlaG9sZGVyXT1cInNlYXJjaC5wbGFjZWhvbGRlciB8fCBsYWJlbHMuc2VhcmNoXCIgW3ZhbHVlXT1cIl9xdWVyeVwiIChpbnB1dCk9XCJxdWVyeUNhdGVnb3JpZXMoJGV2ZW50LnRhcmdldC52YWx1ZSlcIi8+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiFfcXVlcnlcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiICpuZ0lmPVwiX3F1ZXJ5XCIgKGNsaWNrKT1cImNsZWFyUXVlcnkoJGV2ZW50KVwiPjwvaT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxub3ZvLW5hdiB0aGVtZT1cIndoaXRlXCIgW291dGxldF09XCJub3ZvQ2F0ZWdvcnlEcm9wZG93bk91dGxldFwiIGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XHJcbiAgICAgICAgICAgICAgICA8bm92by10YWIgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIF9jYXRlZ29yaWVzXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhdGVnb3J5XCIgKGFjdGl2ZUNoYW5nZSk9XCJvbkNhdGVnb3J5U2VsZWN0ZWQoY2F0ZWdvcnkpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgY2F0ZWdvcnkgfX0gKHt7IF9jYXRlZ29yeU1hcFtjYXRlZ29yeV0ubGVuZ3RoIH19KTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbm92by10YWI+XHJcbiAgICAgICAgICAgIDwvbm92by1uYXY+XHJcbiAgICAgICAgICAgIDxub3ZvLW5hdi1vdXRsZXQgI25vdm9DYXRlZ29yeURyb3Bkb3duT3V0bGV0PlxyXG4gICAgICAgICAgICAgICAgPG5vdm8tbmF2LWNvbnRlbnQgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIF9jYXRlZ29yaWVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bm92by1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2NhdGVnb3J5TWFwW2NhdGVnb3J5XVwiIChjbGljayk9XCJzZWxlY3QoJGV2ZW50LCBpdGVtKVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJpdGVtLmxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IGl0ZW0ubGFiZWwgfX08L2l0ZW0tY29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtLWVuZCBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24taG92ZXJcIiAqbmdJZj1cIml0ZW0uaG92ZXJUZXh0ICYmICFpdGVtLnNlbGVjdGVkXCI+e3sgaXRlbS5ob3ZlclRleHQgfX08L2l0ZW0tZW5kPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGl0ZW0tZW5kIGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1ob3ZlclwiICpuZ0lmPVwiaXRlbS5ob3Zlckljb24gJiYgIWl0ZW0uc2VsZWN0ZWRcIj48aSBjbGFzcz1cImJoaS17eyBpdGVtLmhvdmVySWNvbiB9fVwiPjwvaT48L2l0ZW0tZW5kPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGl0ZW0tZW5kICpuZ0lmPVwiaXRlbS5zZWxlY3RlZFwiPjxpIGNsYXNzPVwiYmhpLWNoZWNrXCI+PC9pPjwvaXRlbS1lbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdJZj1cIl9jYXRlZ29yeU1hcFtjYXRlZ29yeV0ubGVuZ3RoID09PSAwICYmIHNlYXJjaFwiIGNsYXNzPVwibm92by1jYXRlZ29yeS1kcm9wZG93bi1lbXB0eS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7IHNlYXJjaC5lbXB0eU1lc3NhZ2UgfHwgbGFiZWxzLm5vSXRlbXMgfX08L2l0ZW0tY29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cclxuICAgICAgICAgICAgICAgICAgICA8L25vdm8tbGlzdD5cclxuICAgICAgICAgICAgICAgIDwvbm92by1uYXYtY29udGVudD5cclxuICAgICAgICAgICAgPC9ub3ZvLW5hdi1vdXRsZXQ+XHJcbiAgICAgICAgICAgIDxmb290ZXIgKm5nSWY9XCJmb290ZXJcIiBjbGFzcz1cIm5vdm8tY2F0ZWdvcnktZHJvcGRvd24tZm9vdGVyLWFsaWduLXt7IGZvb3Rlci5hbGlnbiB8fCAncmlnaHQnIH19XCI+XHJcbiAgICAgICAgICAgICAgICA8YSAqbmdGb3I9XCJsZXQgbGluayBvZiBmb290ZXIubGlua3NcIiAoY2xpY2spPVwiZXhlY3V0ZUNsaWNrQ2FsbGJhY2soJGV2ZW50LCBsaW5rKVwiPnt7IGxpbmsubGFiZWwgfX08L2E+XHJcbiAgICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICBob3N0OiB7XHJcbiAgICAnKGtleWRvd24pJzogJ29uS2V5RG93bigkZXZlbnQpJyxcclxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxyXG4gIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQ2F0ZWdvcnlEcm9wZG93bkVsZW1lbnQgZXh0ZW5kcyBPdXRzaWRlQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgX3F1ZXJ5OiBzdHJpbmcgPSAnJztcclxuICBfY2F0ZWdvcnlNYXA6IGFueSA9IHt9O1xyXG4gIF9jYXRlZ29yaWVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGNsaWNrSGFuZGxlcjogRnVuY3Rpb247XHJcbiAgX21hc3RlckNhdGVnb3J5TWFwOiBhbnk7XHJcbiAgX3F1ZXJ5VGltZW91dDogYW55O1xyXG4gIC8vIEJvb2xlYW4gdG8ga2VlcCB0aGUgc2VsZWN0aW9uIHBlcnNpc3Qgd2hlbiBjbG9zaW5nIHRoZSBkcm9wZG93blxyXG4gIEBJbnB1dCgpXHJcbiAgcGVyc2lzdFNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIEJvb2xlYW4gdG8gY2xvc2UgdGhlIGRyb3Bkb3duIG9uIHNlbGVjdGlvblxyXG4gIEBJbnB1dCgpXHJcbiAgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIFNlYXJjaCBDb25maWdcclxuICAvLyB7XHJcbiAgLy8gICBwbGFjZWhvbGRlcjogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJTRUFSQ0hcIiAtIHBsYWNlaG9sZGVyIGZvciBzZWFyY2ggaW5wdXRcclxuICAvLyAgIGVtcHR5TWVzc2FnZTogJ1NUUklORycgLy8gZGVmYXVsdHMgdG8gXCJUaGVyZSBhcmUgbm8gaXRlbXMuXCIgLSBlbXB0eSBtZXNzYWdlIHdoZW4gdGhlcmUgYXJlIG5vIGl0ZW1zIGluIHRoZSBjYXRlZ29yeVxyXG4gIC8vICAgZGVib3VuY2U6ICdOVU1CRVIgKGluIE1TKScgLy8gZGVmYXVsdHMgdG8gMzAwbXMgLSBkZWJvdW5jZSB0aW1lIGZvciB0aGUgc2VhcmNoXHJcbiAgLy8gICBjb21wYXJlOiAnRlVOQ1RJT04nIC8vIGRlZmF1bHQgdG8gc2ltcGxlIGluZGV4T2YgLSBjb21wYXJlIGZ1bmN0aW9uIGZvciBjYXRlZ29yeSBzZWFyY2gsIHNob3VsZCBhY2NlcHQgKHF1ZXJ5LCBpdGVtKSBhbmQgcmV0dXJuIHRydWUvZmFsc2VcclxuICAvLyB9XHJcbiAgQElucHV0KClcclxuICBzZWFyY2g6IGFueTtcclxuICAvLyBGb290ZXIgY29uZmlnXHJcbiAgLy8ge1xyXG4gIC8vICAgYWxpZ246ICdTVFJJTkcnIC8vIGRlZmF1bHRzIHRvIFwicmlnaHRcIiAtIGFsaWdubWVudCBvZiB0aGUgbGlua3NcclxuICAvLyAgIGxpbmtzOiAnQVJSQVknIC8vIGFycmF5IG9mIGxpbmtzIHRvIGdvIGludG8gdGhlIGZvb3RlciwgYmUgYXdheSBvZiBzcGFjaW5nIC0geyBsYWJlbCwgY2FsbGJhY2sgfSBmb3IgdGhlIG9iamVjdCBpbnNpZGVcclxuICAvLyB9XHJcbiAgQElucHV0KClcclxuICBmb290ZXI6IGFueTtcclxuICAvLyBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaXRlbSBpcyBzZWxlY3RlZFxyXG4gIEBPdXRwdXQoJ2l0ZW1TZWxlY3RlZCcpXHJcbiAgX3NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGEgY2F0ZWdvcnkgaXMgc2VsZWN0ZWRcclxuICBAT3V0cHV0KClcclxuICBjYXRlZ29yeVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjYXRlZ29yaWVzKGNhdGVnb3JpZXM6IGFueSkge1xyXG4gICAgdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXAgPSBPYmplY3QuYXNzaWduKHt9LCBjYXRlZ29yaWVzKTtcclxuICAgIHRoaXMuX2NhdGVnb3J5TWFwID0gT2JqZWN0LmFzc2lnbih7fSwgY2F0ZWdvcmllcyk7XHJcbiAgICB0aGlzLl9jYXRlZ29yaWVzID0gT2JqZWN0LmtleXMoY2F0ZWdvcmllcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7XHJcbiAgICBzdXBlcihlbGVtZW50KTtcclxuICAgIHRoaXMuY2xpY2tIYW5kbGVyID0gdGhpcy50b2dnbGVBY3RpdmUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG4gICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbktleURvd24oZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAoZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZXMuRVNDIHx8IGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGVzLkVOVEVSKSkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWxlY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XHJcbiAgICAgIHRoaXMuX2NhdGVnb3J5TWFwW2NhdGVnb3J5XS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KGV2ZW50LCBpdGVtKSB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICAvLyBJZiB3ZSBwZXJzaXN0IHRoZSBzZWxlY3Rpb24sIGNsZWFyIGFuZCBzaG93IGEgY2hlY2tcclxuICAgIGlmICh0aGlzLnBlcnNpc3RTZWxlY3Rpb24pIHtcclxuICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIEVtaXQgdGhlIGl0ZW1cclxuICAgIHRoaXMuX3NlbGVjdC5lbWl0KGl0ZW0pO1xyXG4gICAgLy8gQ2xvc2UsIGlmIGlucHV0IGlzIHNldFxyXG4gICAgaWYgKHRoaXMuY2xvc2VPblNlbGVjdCkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUFjdGl2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DYXRlZ29yeVNlbGVjdGVkKGNhdGVnb3J5KSB7XHJcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0ZWQuZW1pdChjYXRlZ29yeSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclF1ZXJ5KGV2ZW50KSB7XHJcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XHJcbiAgICB0aGlzLl9xdWVyeSA9ICcnO1xyXG4gICAgLy8gUmVzZXQgdGhlIGNhdGVnb3JpZXNcclxuICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBxdWVyeUNhdGVnb3JpZXMocXVlcnkpIHtcclxuICAgIC8vIFNhdmUgdGhlIHF1ZXJ5XHJcbiAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xyXG4gICAgLy8gQ2hlY2sgdGltZW91dFxyXG4gICAgaWYgKHRoaXMuX3F1ZXJ5VGltZW91dCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fcXVlcnlUaW1lb3V0KTtcclxuICAgIH1cclxuICAgIC8vIFN0b3JlIGEgdGltZW91dCwgdG8gZGVib3VuY2UgdXNlciBpbnB1dFxyXG4gICAgdGhpcy5fcXVlcnlUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2guY29tcGFyZSkge1xyXG4gICAgICAgICAgdGhpcy5fY2F0ZWdvcnlNYXBbY2F0ZWdvcnldID0gdGhpcy5fbWFzdGVyQ2F0ZWdvcnlNYXBbY2F0ZWdvcnldLmZpbHRlcigoaXRlbSkgPT4gdGhpcy5zZWFyY2guY29tcGFyZShxdWVyeSwgaXRlbSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9jYXRlZ29yeU1hcFtjYXRlZ29yeV0gPSB0aGlzLl9tYXN0ZXJDYXRlZ29yeU1hcFtjYXRlZ29yeV0uZmlsdGVyKFxyXG4gICAgICAgICAgICAoaXRlbSkgPT4gfml0ZW0ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgdGhpcy5zZWFyY2guZGVib3VuY2UgfHwgMzAwKTtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGVDbGlja0NhbGxiYWNrKGV2ZW50LCBsaW5rKSB7XHJcbiAgICBsaW5rLmNhbGxiYWNrKGV2ZW50KTtcclxuICAgIC8vIENsb3NlLCBpZiBpbnB1dCBpcyBzZXRcclxuICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcclxuICAgICAgdGhpcy50b2dnbGVBY3RpdmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19