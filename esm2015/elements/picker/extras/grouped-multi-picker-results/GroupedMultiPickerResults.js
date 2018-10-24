/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { Helpers } from '../../../../utils/Helpers';
import { NovoListElement } from '../../../list/List';
import { NovoLabelService } from '../../../../services/novo-label-service';
export class GroupedMultiPickerResults extends BasePickerResults {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} labels
     * @param {?} ref
     */
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.customFilterEnabled = false;
        this.placeholder = '';
        this.internalMap = new Map();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set term(value) {
        // Display all only will work for static categories
        if (this.config.displayAll && this.config.getItemsForCategoryAsync) {
            throw new Error('[GroupedMultiPickerResults] - you can only have `displayAll` with a static `categoryMap`. Not available with `getItemsForCategoryAsync`');
        }
        // Custom filter
        if (this.config.customFilter) {
            this.customFilterEnabled = true;
            this.customFilterLabel = this.config.customFilter.label;
            this.customFilterValue = !!this.config.customFilter.defaultFilterValue;
            this.ref.markForCheck();
            if (!this.customFilterLabel || !this.config.customFilter.matchFunction) {
                throw new Error('[GroupedMultiPickerResults] - custom filter/matchFunction set no label was provided!');
            }
        }
        else {
            this.customFilterEnabled = false;
        }
        // Configure ALL
        if (this.config.displayAll && !this.selectedCategory) {
            this.setAllCategory();
        }
        // Placeholder
        if (this.config.placeholder) {
            this.placeholder = this.config.placeholder;
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    /**
     * @return {?}
     */
    get categories() {
        if (this.config.categories || this.config.categoryMap) {
            return (this.config.categories ||
                Array.from(this.config.categoryMap.values()).filter((category) => {
                    return category.value !== 'all';
                }));
        }
        return [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Subscribe to keyboard events and debounce
        this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
            .pipe(debounceTime(350), distinctUntilChanged())
            .subscribe((event) => {
            this.searchTerm = event.target['value'];
            this.matches = this.filterData();
            this.ref.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Cleanup
        this.keyboardSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setAllCategory() {
        // If we have display all, set the all categories up
        if (this.config.displayAll) {
            this.selectedCategory = { value: 'all', label: 'all' };
            /** @type {?} */
            let allItems = [];
            Array.from(this.config.categoryMap.values())
                .filter((category) => {
                return category.value !== 'all';
            })
                .forEach((v) => allItems.push(...v.items));
            this.matches = this.filter(allItems);
            this.config.categoryMap.set('all', { value: 'all', label: 'All', items: allItems });
            this.ref.markForCheck();
        }
    }
    /**
     * @param {?} category
     * @return {?}
     */
    selectCategory(category) {
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        /** @type {?} */
        let key = category.value;
        this.selectedCategory = category;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        this.getNewMatches(category, key);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectCategory({ value: this.selectedCategory.value, label: this.selectedCategory.label });
        this.ref.markForCheck();
    }
    /**
     * @param {?=} event
     * @param {?=} item
     * @return {?}
     */
    selectMatch(event, item) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event, item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fireCustomFilter(value) {
        this.customFilterValue = value;
        // Clear cache map
        this.internalMap.clear();
        // Only fire if we have a selected category
        if (this.selectCategory) {
            // Find new items
            /** @type {?} */
            let key = this.selectedCategory.value;
            // Get new matches
            this.getNewMatches(this.selectedCategory, key);
            this.ref.markForCheck();
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    /**
     * @return {?}
     */
    filterData() {
        if (this.selectedCategory) {
            if (this.config.categoryMap) {
                return this.filter(this.config.categoryMap.get(this.selectedCategory.value).items);
            }
            else {
                return this.filter(this.internalMap.get(this.selectedCategory.value).items);
            }
        }
        return [];
    }
    /**
     * @param {?} category
     * @param {?} key
     * @return {?}
     */
    getNewMatches(category, key) {
        // Get new matches
        if (this.config.categoryMap) {
            this.matches = this.filter(this.config.categoryMap.get(key).items);
            this.ref.markForCheck();
        }
        else {
            if (!this.config.getItemsForCategoryAsync) {
                throw new Error('The "config" for the Chips must include a function "getItemsForCategoryAsync(categoryKey: string)" to retrieve the items by category. Or if you have static data provide a "categoryMap"');
            }
            if (!this.internalMap.get(key)) {
                this.isLoading = true;
                this.config.getItemsForCategoryAsync(key, this.customFilterValue).then((items) => {
                    this.internalMap.set(key, { value: category.value, label: category.label, items: items });
                    this.matches = this.filter(items, true);
                    this.isLoading = false;
                    this.ref.markForCheck();
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
            }
            else {
                this.matches = this.filter(this.internalMap.get(key).items);
                this.ref.markForCheck();
            }
        }
    }
    /**
     * @param {?} array
     * @param {?=} ignoreCustomFilter
     * @return {?}
     */
    filter(array, ignoreCustomFilter = false) {
        /** @type {?} */
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedCategory) {
            matches = matches.filter((match) => {
                return ~String(match.label)
                    .toLowerCase()
                    .indexOf(this.searchTerm.toLowerCase());
            });
        }
        if (this.customFilterEnabled && this.config.customFilter.matchFunction && !ignoreCustomFilter) {
            matches = matches.filter((match) => {
                return this.config.customFilter.matchFunction(match, this.customFilterValue);
            });
        }
        return matches;
    }
}
GroupedMultiPickerResults.decorators = [
    { type: Component, args: [{
                selector: 'grouped-multi-picker-results',
                template: `
        <div class="grouped-multi-picker-groups">
            <novo-list direction="vertical">
                <novo-list-item
                    *ngIf="config.displayAll"
                    (click)="selectCategory({ value: 'all', label: 'all' })"
                    [class.active]="selectedCategory?.value === 'all'"
                    data-automation-id="display-all"
                    [class.disabled]="isLoading">
                    <item-content>
                        <span data-automation-id="label">{{ labels.all }}</span>
                    </item-content>
                    <item-end>
                        <i class="bhi-next"></i>
                    </item-end>
                </novo-list-item>
                <novo-list-item
                    *ngFor="let category of categories"
                    (click)="selectCategory(category)"
                    [class.active]="selectedCategory?.value === category.value"
                    [attr.data-automation-id]="category.label"
                    [class.disabled]="isLoading">
                    <item-content>
                        <span data-automation-id="label">{{ category.label }}</span>
                    </item-content>
                    <item-end>
                        <i class="bhi-next"></i>
                    </item-end>
                </novo-list-item>
            </novo-list>
            <footer class="grouped-multi-picker-groups-footer" *ngIf="customFilterEnabled" data-automation-id="footer" [class.disabled]="isLoading">
                <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
                <label data-automation-id="label">{{ customFilterLabel }}</label>
            </footer>
        </div>
        <div class="grouped-multi-picker-matches">
            <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
                <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder"/>
                <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
                <i class="bhi-times" *ngIf="searchTerm" (click)="clearSearchTerm($event)" [class.disabled]="isLoading" data-automation-id="remove-icon"></i>
            </div>
            <div class="grouped-multi-picker-list-container">
                <novo-list direction="vertical" #list>
                    <novo-list-item
                        *ngFor="let match of matches"
                        (click)="selectMatch($event)"
                        [class.active]="match === activeMatch"
                        (mouseenter)="selectActive(match)"
                        [class.disabled]="preselected(match)"
                        [attr.data-automation-id]="match.label"
                        [class.disabled]="isLoading">
                        <item-content>
                            <span>{{ match.label }}</span>
                        </item-content>
                    </novo-list-item>
                </novo-list>
                <div class="grouped-multi-picker-no-results" *ngIf="matches.length === 0 && !isLoading && selectedCategory" data-automation-id="empty-message">
                    {{ labels.groupedMultiPickerEmpty }}
                </div>
                <div class="grouped-multi-picker-no-category" *ngIf="matches.length === 0 && !isLoading && !selectedCategory" data-automation-id="select-category-message">
                    {{ labels.groupedMultiPickerSelectCategory }}
                </div>
                <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
                    <novo-loading theme="line"></novo-loading>
                </div>
            </div>
        </div>
    `
            }] }
];
GroupedMultiPickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
GroupedMultiPickerResults.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['input',] }],
    listElement: [{ type: ViewChild, args: ['list',] }]
};
if (false) {
    /** @type {?} */
    GroupedMultiPickerResults.prototype.inputElement;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.listElement;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.selectedCategory;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.searchTerm;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.customFilterEnabled;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.customFilterLabel;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.placeholder;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.keyboardSubscription;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.internalMap;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.customFilterValue;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.renderer;
    /** @type {?} */
    GroupedMultiPickerResults.prototype.labels;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJlbGVtZW50cy9waWNrZXIvZXh0cmFzL2dyb3VwZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFxQixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUF5RTNFLE1BQU0sZ0NBQWlDLFNBQVEsaUJBQWlCOzs7Ozs7O0lBZ0U5RCxZQUFZLE9BQW1CLEVBQVUsUUFBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ25ILEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeER0Rix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFFckMsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFHeEIsZ0JBQVcsR0FBNkYsSUFBSSxHQUFHLEVBR3BILENBQUM7SUFrREosQ0FBQzs7Ozs7SUEvQ0QsSUFBSSxJQUFJLENBQUMsS0FBSztRQUNaLG1EQUFtRDtRQUNuRCxJ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QUFFLDJDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBPbkluaXQsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTGlzdEVsZW1lbnQgfSBmcm9tICcuLi8uLi8uLi9saXN0L0xpc3QnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dyb3VwZWQtbXVsdGktcGlja2VyLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItZ3JvdXBzXCI+XG4gICAgICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29uZmlnLmRpc3BsYXlBbGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2F0ZWdvcnkoeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnYWxsJyB9KVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDYXRlZ29yeT8udmFsdWUgPT09ICdhbGwnXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZGlzcGxheS1hbGxcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsYWJlbFwiPnt7IGxhYmVscy5hbGwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8aXRlbS1lbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1uZXh0XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjYXRlZ29yeSBvZiBjYXRlZ29yaWVzXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENhdGVnb3J5KGNhdGVnb3J5KVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDYXRlZ29yeT8udmFsdWUgPT09IGNhdGVnb3J5LnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cImNhdGVnb3J5LmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBjYXRlZ29yeS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxpdGVtLWVuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW5leHRcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDwvaXRlbS1lbmQ+XG4gICAgICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgICAgIDwvbm92by1saXN0PlxuICAgICAgICAgICAgPGZvb3RlciBjbGFzcz1cImdyb3VwZWQtbXVsdGktcGlja2VyLWdyb3Vwcy1mb290ZXJcIiAqbmdJZj1cImN1c3RvbUZpbHRlckVuYWJsZWRcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJmb290ZXJcIiBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tc3dpdGNoIFsobmdNb2RlbCldPVwiY3VzdG9tRmlsdGVyVmFsdWVcIiAob25DaGFuZ2UpPVwiZmlyZUN1c3RvbUZpbHRlcigkZXZlbnQpXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwic3dpdGNoXCI+PC9ub3ZvLXN3aXRjaD5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBjdXN0b21GaWx0ZXJMYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1tYXRjaGVzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItaW5wdXQtY29udGFpbmVyXCIgW2hpZGRlbl09XCIhc2VsZWN0ZWRDYXRlZ29yeVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBhdXRvZm9jdXMgI2lucHV0IFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiLz5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiFzZWFyY2hUZXJtXCIgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlYWNoLWljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktdGltZXNcIiAqbmdJZj1cInNlYXJjaFRlcm1cIiAoY2xpY2spPVwiY2xlYXJTZWFyY2hUZXJtKCRldmVudClcIiBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicmVtb3ZlLWljb25cIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIiAjbGlzdD5cbiAgICAgICAgICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1hdGNoLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbWF0Y2gubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbm8tcmVzdWx0c1wiICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZENhdGVnb3J5XCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuZ3JvdXBlZE11bHRpUGlja2VyRW1wdHkgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbm8tY2F0ZWdvcnlcIiAqbmdJZj1cIm1hdGNoZXMubGVuZ3RoID09PSAwICYmICFpc0xvYWRpbmcgJiYgIXNlbGVjdGVkQ2F0ZWdvcnlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWxlY3QtY2F0ZWdvcnktbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuZ3JvdXBlZE11bHRpUGlja2VyU2VsZWN0Q2F0ZWdvcnkgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibG9hZGluZy1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdpbnB1dCcpXG4gIHByaXZhdGUgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdsaXN0JylcbiAgcHJpdmF0ZSBsaXN0RWxlbWVudDogTm92b0xpc3RFbGVtZW50O1xuXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfTtcbiAgcHVibGljIHNlYXJjaFRlcm06IHN0cmluZztcbiAgcHVibGljIGN1c3RvbUZpbHRlckVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGN1c3RvbUZpbHRlckxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBrZXlib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGludGVybmFsTWFwOiBNYXA8c3RyaW5nLCB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH0+ID0gbmV3IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9XG4gID4oKTtcbiAgcHVibGljIGN1c3RvbUZpbHRlclZhbHVlOiBhbnk7XG5cbiAgc2V0IHRlcm0odmFsdWUpIHtcbiAgICAvLyBEaXNwbGF5IGFsbCBvbmx5IHdpbGwgd29yayBmb3Igc3RhdGljIGNhdGVnb3JpZXNcbiAgICBpZiAodGhpcy5jb25maWcuZGlzcGxheUFsbCAmJiB0aGlzLmNvbmZpZy5nZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1tHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzXSAtIHlvdSBjYW4gb25seSBoYXZlIGBkaXNwbGF5QWxsYCB3aXRoIGEgc3RhdGljIGBjYXRlZ29yeU1hcGAuIE5vdCBhdmFpbGFibGUgd2l0aCBgZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jYCcsXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBDdXN0b20gZmlsdGVyXG4gICAgaWYgKHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlcikge1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJFbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyTGFiZWwgPSB0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIubGFiZWw7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlclZhbHVlID0gISF0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIuZGVmYXVsdEZpbHRlclZhbHVlO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRmlsdGVyTGFiZWwgfHwgIXRoaXMuY29uZmlnLmN1c3RvbUZpbHRlci5tYXRjaEZ1bmN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHNdIC0gY3VzdG9tIGZpbHRlci9tYXRjaEZ1bmN0aW9uIHNldCBubyBsYWJlbCB3YXMgcHJvdmlkZWQhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBDb25maWd1cmUgQUxMXG4gICAgaWYgKHRoaXMuY29uZmlnLmRpc3BsYXlBbGwgJiYgIXRoaXMuc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRBbGxDYXRlZ29yeSgpO1xuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlclxuICAgIGlmICh0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICAvLyBGb2N1c1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNhdGVnb3JpZXMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmNhdGVnb3JpZXMgfHwgdGhpcy5jb25maWcuY2F0ZWdvcnlNYXApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuY29uZmlnLmNhdGVnb3JpZXMgfHxcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC52YWx1ZXMoKSkuZmlsdGVyKChjYXRlZ29yeTogeyB2YWx1ZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnkudmFsdWUgIT09ICdhbGwnO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8ga2V5Ym9hcmQgZXZlbnRzIGFuZCBkZWJvdW5jZVxuICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleXVwJylcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzUwKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IGV2ZW50LnRhcmdldFsndmFsdWUnXTtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXJEYXRhKCk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gQ2xlYW51cFxuICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBbGxDYXRlZ29yeSgpIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGRpc3BsYXkgYWxsLCBzZXQgdGhlIGFsbCBjYXRlZ29yaWVzIHVwXG4gICAgaWYgKHRoaXMuY29uZmlnLmRpc3BsYXlBbGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ2FsbCcgfTtcbiAgICAgIGxldCBhbGxJdGVtcyA9IFtdO1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC52YWx1ZXMoKSlcbiAgICAgICAgLmZpbHRlcigoY2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhdGVnb3J5LnZhbHVlICE9PSAnYWxsJztcbiAgICAgICAgfSlcbiAgICAgICAgLmZvckVhY2goKHY6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IGFueVtdIH0pID0+IGFsbEl0ZW1zLnB1c2goLi4udi5pdGVtcykpO1xuICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIoYWxsSXRlbXMpO1xuICAgICAgdGhpcy5jb25maWcuY2F0ZWdvcnlNYXAuc2V0KCdhbGwnLCB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdBbGwnLCBpdGVtczogYWxsSXRlbXMgfSk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9KTogdm9pZCB7XG4gICAgLy8gU2Nyb2xsIHRvIHRvcFxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5saXN0RWxlbWVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxUb3AnLCAwKTtcbiAgICAvLyBTZXQgZm9jdXNcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgLy8gRmluZCBuZXcgaXRlbXNcbiAgICBsZXQga2V5OiBzdHJpbmcgPSBjYXRlZ29yeS52YWx1ZTtcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAvLyBDbGVhclxuICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIC8vIE5ldyBtYXRjaGVzXG4gICAgdGhpcy5nZXROZXdNYXRjaGVzKGNhdGVnb3J5LCBrZXkpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU2VhcmNoVGVybShldmVudDogTW91c2VFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICB0aGlzLnNlbGVjdENhdGVnb3J5KHsgdmFsdWU6IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSwgbGFiZWw6IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS5sYWJlbCB9KTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RNYXRjaChldmVudD86IE1vdXNlRXZlbnQsIGl0ZW0/OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfSk6IGJvb2xlYW4ge1xuICAgIC8vIFNldCBmb2N1c1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0TWF0Y2goZXZlbnQsIGl0ZW0pO1xuICB9XG5cbiAgcHVibGljIGZpcmVDdXN0b21GaWx0ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmN1c3RvbUZpbHRlclZhbHVlID0gdmFsdWU7XG4gICAgLy8gQ2xlYXIgY2FjaGUgbWFwXG4gICAgdGhpcy5pbnRlcm5hbE1hcC5jbGVhcigpO1xuICAgIC8vIE9ubHkgZmlyZSBpZiB3ZSBoYXZlIGEgc2VsZWN0ZWQgY2F0ZWdvcnlcbiAgICBpZiAodGhpcy5zZWxlY3RDYXRlZ29yeSkge1xuICAgICAgLy8gRmluZCBuZXcgaXRlbXNcbiAgICAgIGxldCBrZXk6IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZTtcbiAgICAgIC8vIEdldCBuZXcgbWF0Y2hlc1xuICAgICAgdGhpcy5nZXROZXdNYXRjaGVzKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwga2V5KTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvLyBGb2N1c1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgZmlsdGVyRGF0YSgpOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuY2F0ZWdvcnlNYXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLmdldCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUpLml0ZW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUpLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXdNYXRjaGVzKGNhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfSwga2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICBpZiAodGhpcy5jb25maWcuY2F0ZWdvcnlNYXApIHtcbiAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLmdldChrZXkpLml0ZW1zKTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY29uZmlnLmdldEl0ZW1zRm9yQ2F0ZWdvcnlBc3luYykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1RoZSBcImNvbmZpZ1wiIGZvciB0aGUgQ2hpcHMgbXVzdCBpbmNsdWRlIGEgZnVuY3Rpb24gXCJnZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmMoY2F0ZWdvcnlLZXk6IHN0cmluZylcIiB0byByZXRyaWV2ZSB0aGUgaXRlbXMgYnkgY2F0ZWdvcnkuIE9yIGlmIHlvdSBoYXZlIHN0YXRpYyBkYXRhIHByb3ZpZGUgYSBcImNhdGVnb3J5TWFwXCInLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmludGVybmFsTWFwLmdldChrZXkpKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb25maWcuZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jKGtleSwgdGhpcy5jdXN0b21GaWx0ZXJWYWx1ZSkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcbiAgICAgICAgICB0aGlzLmludGVybmFsTWFwLnNldChrZXksIHsgdmFsdWU6IGNhdGVnb3J5LnZhbHVlLCBsYWJlbDogY2F0ZWdvcnkubGFiZWwsIGl0ZW1zOiBpdGVtcyB9KTtcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihpdGVtcywgdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldChrZXkpLml0ZW1zKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXIoXG4gICAgYXJyYXk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgZmlsdGVyVmFsdWU/OiBhbnkgfVtdLFxuICAgIGlnbm9yZUN1c3RvbUZpbHRlcjogYm9vbGVhbiA9IGZhbHNlLFxuICApOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBsZXQgbWF0Y2hlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10gPSBhcnJheTtcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtICYmIHRoaXMuc2VhcmNoVGVybS5sZW5ndGggIT09IDAgJiYgdGhpcy5zZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgIHJldHVybiB+U3RyaW5nKG1hdGNoLmxhYmVsKVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLmluZGV4T2YodGhpcy5zZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1c3RvbUZpbHRlckVuYWJsZWQgJiYgdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLm1hdGNoRnVuY3Rpb24gJiYgIWlnbm9yZUN1c3RvbUZpbHRlcikge1xuICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuZmlsdGVyKChtYXRjaCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLm1hdGNoRnVuY3Rpb24obWF0Y2gsIHRoaXMuY3VzdG9tRmlsdGVyVmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG59XG4iXX0=