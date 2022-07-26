import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Helpers } from '../../../../utils/Helpers';
import { NovoListElement } from '../../../list/List';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/novo-label-service";
import * as i2 from "../../../list/List";
import * as i3 from "../../../switch/Switch";
import * as i4 from "../../../loading/Loading";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "../../../common/directives/theme.directive";
export class GroupedMultiPickerResults extends BasePickerResults {
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.customFilterEnabled = false;
        this.placeholder = '';
        this.internalMap = new Map();
    }
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
    get categories() {
        if (this.config.categories || this.config.categoryMap) {
            return (this.config.categories ||
                Array.from(this.config.categoryMap.values()).filter((category) => {
                    return category.value !== 'all';
                }));
        }
        return [];
    }
    ngOnInit() {
        // Subscribe to keyboard events and debounce
        this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
            .pipe(debounceTime(350), distinctUntilChanged())
            .subscribe((event) => {
            this.searchTerm = event.target.value;
            this.matches = this.filterData();
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        // Cleanup
        this.keyboardSubscription.unsubscribe();
    }
    setAllCategory() {
        // If we have display all, set the all categories up
        if (this.config.displayAll) {
            this.selectedCategory = { value: 'all', label: 'all' };
            const allItems = [];
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
    selectCategory(category) {
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        const key = category.value;
        this.selectedCategory = category;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        this.getNewMatches(category, key);
    }
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectCategory({ value: this.selectedCategory.value, label: this.selectedCategory.label });
        this.ref.markForCheck();
    }
    selectMatch(event, item) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event);
    }
    fireCustomFilter(value) {
        this.customFilterValue = value;
        // Clear cache map
        this.internalMap.clear();
        // Only fire if we have a selected category
        if (this.selectCategory) {
            // Find new items
            const key = this.selectedCategory.value;
            // Get new matches
            this.getNewMatches(this.selectedCategory, key);
            this.ref.markForCheck();
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
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
                    this.internalMap.set(key, { value: category.value, label: category.label, items });
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
    filter(array, ignoreCustomFilter = false) {
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedCategory) {
            matches = matches.filter((match) => {
                const searchTerm = this.searchTerm.toLowerCase();
                return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
            });
        }
        if (this.customFilterEnabled && this.config.customFilter.matchFunction && !ignoreCustomFilter) {
            matches = matches.filter((match) => this.config.customFilter.matchFunction(match, this.customFilterValue));
        }
        return matches;
    }
}
GroupedMultiPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GroupedMultiPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: GroupedMultiPickerResults, selector: "grouped-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <div class="grouped-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngIf="config.displayAll"
          (click)="selectCategory({ value: 'all', label: 'all' })"
          [class.active]="selectedCategory?.value === 'all'"
          data-automation-id="display-all"
          [class.disabled]="isLoading"
        >
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
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
            <span data-automation-id="label">{{ category.label }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
      <footer
        class="grouped-multi-picker-groups-footer"
        *ngIf="customFilterEnabled"
        data-automation-id="footer"
        [class.disabled]="isLoading"
      >
        <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
        <label data-automation-id="label">{{ customFilterLabel }}</label>
      </footer>
    </div>
    <div class="grouped-multi-picker-matches">
      <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="grouped-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="grouped-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedCategory"
          data-automation-id="empty-message"
        >
          {{ labels.groupedMultiPickerEmpty }}
        </div>
        <div
          class="grouped-multi-picker-no-category"
          *ngIf="matches.length === 0 && !isLoading && !selectedCategory"
          data-automation-id="select-category-message"
        >
          {{ labels.groupedMultiPickerSelectCategory }}
        </div>
        <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>
  `, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i2.NovoItemEndElement, selector: "item-end, novo-item-end" }, { type: i3.NovoSwitchElement, selector: "novo-switch", inputs: ["theme", "icons", "disabled"], outputs: ["onChange"] }, { type: i4.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size", "showLoadMessage"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i7.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GroupedMultiPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'grouped-multi-picker-results',
                    template: `
    <div class="grouped-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngIf="config.displayAll"
          (click)="selectCategory({ value: 'all', label: 'all' })"
          [class.active]="selectedCategory?.value === 'all'"
          data-automation-id="display-all"
          [class.disabled]="isLoading"
        >
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
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="category.iconClass" [class]="category.iconClass"></i>
            <span data-automation-id="label">{{ category.label }}</span>
          </item-content>
          <item-end>
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
      <footer
        class="grouped-multi-picker-groups-footer"
        *ngIf="customFilterEnabled"
        data-automation-id="footer"
        [class.disabled]="isLoading"
      >
        <novo-switch [(ngModel)]="customFilterValue" (onChange)="fireCustomFilter($event)" data-automation-id="switch"></novo-switch>
        <label data-automation-id="label">{{ customFilterLabel }}</label>
      </footer>
    </div>
    <div class="grouped-multi-picker-matches">
      <div class="grouped-multi-picker-input-container" [hidden]="!selectedCategory" data-automation-id="input-container">
        <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder" />
        <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
        <i
          class="bhi-times"
          *ngIf="searchTerm"
          (click)="clearSearchTerm($event)"
          [class.disabled]="isLoading"
          data-automation-id="remove-icon"
        ></i>
      </div>
      <div class="grouped-multi-picker-list-container">
        <novo-list direction="vertical" #list>
          <novo-list-item
            *ngFor="let match of matches"
            (click)="selectMatch($event)"
            [class.active]="match === activeMatch"
            (mouseenter)="selectActive(match)"
            [class.disabled]="preselected(match) || isLoading"
            [attr.data-automation-id]="match.label"
          >
            <item-content>
              <span>{{ match.label }}</span>
            </item-content>
          </novo-list-item>
        </novo-list>
        <div
          class="grouped-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedCategory"
          data-automation-id="empty-message"
        >
          {{ labels.groupedMultiPickerEmpty }}
        </div>
        <div
          class="grouped-multi-picker-no-category"
          *ngIf="matches.length === 0 && !isLoading && !selectedCategory"
          data-automation-id="select-category-message"
        >
          {{ labels.groupedMultiPickerSelectCategory }}
        </div>
        <div class="grouped-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BpY2tlci9leHRyYXMvZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9Hcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7Ozs7QUErRjdFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxpQkFBaUI7SUFnRTlELFlBQVksT0FBbUIsRUFBVSxRQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDbkgsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURtQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUF4RHRGLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUVyQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd4QixnQkFBVyxHQUE2RixJQUFJLEdBQUcsRUFHcEgsQ0FBQztJQWtESixDQUFDO0lBL0NELElBQUksSUFB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O0dBeUZUO2lCQUNGO3dMQUdTLFlBQVk7c0JBRG5CLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHNUIsV0FBVztzQkFEbEIsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgTm92b0xpc3RFbGVtZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlzdC9MaXN0JztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dyb3VwZWQtbXVsdGktcGlja2VyLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1ncm91cHNcIj5cbiAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nSWY9XCJjb25maWcuZGlzcGxheUFsbFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENhdGVnb3J5KHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ2FsbCcgfSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDYXRlZ29yeT8udmFsdWUgPT09ICdhbGwnXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJkaXNwbGF5LWFsbFwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBsYWJlbHMuYWxsIH19PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgIDxpdGVtLWVuZD5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW5leHRcIj48L2k+XG4gICAgICAgICAgPC9pdGVtLWVuZD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXNcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDYXRlZ29yeShjYXRlZ29yeSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDYXRlZ29yeT8udmFsdWUgPT09IGNhdGVnb3J5LnZhbHVlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2F0ZWdvcnkubGFiZWxcIlxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiY2F0ZWdvcnkuaWNvbkNsYXNzXCIgW2NsYXNzXT1cImNhdGVnb3J5Lmljb25DbGFzc1wiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cImxhYmVsXCI+e3sgY2F0ZWdvcnkubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPGl0ZW0tZW5kPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICA8Zm9vdGVyXG4gICAgICAgIGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItZ3JvdXBzLWZvb3RlclwiXG4gICAgICAgICpuZ0lmPVwiY3VzdG9tRmlsdGVyRW5hYmxlZFwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImZvb3RlclwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgPlxuICAgICAgICA8bm92by1zd2l0Y2ggWyhuZ01vZGVsKV09XCJjdXN0b21GaWx0ZXJWYWx1ZVwiIChvbkNoYW5nZSk9XCJmaXJlQ3VzdG9tRmlsdGVyKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzd2l0Y2hcIj48L25vdm8tc3dpdGNoPlxuICAgICAgICA8bGFiZWwgZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBjdXN0b21GaWx0ZXJMYWJlbCB9fTwvbGFiZWw+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbWF0Y2hlc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwZWQtbXVsdGktcGlja2VyLWlucHV0LWNvbnRhaW5lclwiIFtoaWRkZW5dPVwiIXNlbGVjdGVkQ2F0ZWdvcnlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgPGlucHV0IGF1dG9mb2N1cyAjaW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCIgW2Rpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgLz5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgKm5nSWY9XCIhc2VhcmNoVGVybVwiIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWFjaC1pY29uXCI+PC9pPlxuICAgICAgICA8aVxuICAgICAgICAgIGNsYXNzPVwiYmhpLXRpbWVzXCJcbiAgICAgICAgICAqbmdJZj1cInNlYXJjaFRlcm1cIlxuICAgICAgICAgIChjbGljayk9XCJjbGVhclNlYXJjaFRlcm0oJGV2ZW50KVwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwicmVtb3ZlLWljb25cIlxuICAgICAgICA+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiICNsaXN0PlxuICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxuICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpIHx8IGlzTG9hZGluZ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWF0Y2gubGFiZWxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IG1hdGNoLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImdyb3VwZWQtbXVsdGktcGlja2VyLW5vLXJlc3VsdHNcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZENhdGVnb3J5XCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS1tZXNzYWdlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGxhYmVscy5ncm91cGVkTXVsdGlQaWNrZXJFbXB0eSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbm8tY2F0ZWdvcnlcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiAhc2VsZWN0ZWRDYXRlZ29yeVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LWNhdGVnb3J5LW1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlclNlbGVjdENhdGVnb3J5IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibG9hZGluZy1tZXNzYWdlXCI+XG4gICAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdsaXN0JylcbiAgcHJpdmF0ZSBsaXN0RWxlbWVudDogTm92b0xpc3RFbGVtZW50O1xuXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfTtcbiAgcHVibGljIHNlYXJjaFRlcm06IHN0cmluZztcbiAgcHVibGljIGN1c3RvbUZpbHRlckVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGN1c3RvbUZpbHRlckxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBrZXlib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGludGVybmFsTWFwOiBNYXA8c3RyaW5nLCB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH0+ID0gbmV3IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9XG4gID4oKTtcbiAgcHVibGljIGN1c3RvbUZpbHRlclZhbHVlOiBhbnk7XG5cbiAgc2V0IHRlcm0odmFsdWUpIHtcbiAgICAvLyBEaXNwbGF5IGFsbCBvbmx5IHdpbGwgd29yayBmb3Igc3RhdGljIGNhdGVnb3JpZXNcbiAgICBpZiAodGhpcy5jb25maWcuZGlzcGxheUFsbCAmJiB0aGlzLmNvbmZpZy5nZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1tHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzXSAtIHlvdSBjYW4gb25seSBoYXZlIGBkaXNwbGF5QWxsYCB3aXRoIGEgc3RhdGljIGBjYXRlZ29yeU1hcGAuIE5vdCBhdmFpbGFibGUgd2l0aCBgZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jYCcsXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBDdXN0b20gZmlsdGVyXG4gICAgaWYgKHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlcikge1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJFbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyTGFiZWwgPSB0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIubGFiZWw7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlclZhbHVlID0gISF0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIuZGVmYXVsdEZpbHRlclZhbHVlO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRmlsdGVyTGFiZWwgfHwgIXRoaXMuY29uZmlnLmN1c3RvbUZpbHRlci5tYXRjaEZ1bmN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0dyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHNdIC0gY3VzdG9tIGZpbHRlci9tYXRjaEZ1bmN0aW9uIHNldCBubyBsYWJlbCB3YXMgcHJvdmlkZWQhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBDb25maWd1cmUgQUxMXG4gICAgaWYgKHRoaXMuY29uZmlnLmRpc3BsYXlBbGwgJiYgIXRoaXMuc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZXRBbGxDYXRlZ29yeSgpO1xuICAgIH1cbiAgICAvLyBQbGFjZWhvbGRlclxuICAgIGlmICh0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICAvLyBGb2N1c1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNhdGVnb3JpZXMoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmNhdGVnb3JpZXMgfHwgdGhpcy5jb25maWcuY2F0ZWdvcnlNYXApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuY29uZmlnLmNhdGVnb3JpZXMgfHxcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC52YWx1ZXMoKSkuZmlsdGVyKChjYXRlZ29yeTogeyB2YWx1ZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnkudmFsdWUgIT09ICdhbGwnO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8ga2V5Ym9hcmQgZXZlbnRzIGFuZCBkZWJvdW5jZVxuICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleXVwJylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgzNTApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXJEYXRhKCk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gQ2xlYW51cFxuICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBbGxDYXRlZ29yeSgpIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGRpc3BsYXkgYWxsLCBzZXQgdGhlIGFsbCBjYXRlZ29yaWVzIHVwXG4gICAgaWYgKHRoaXMuY29uZmlnLmRpc3BsYXlBbGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ2FsbCcgfTtcbiAgICAgIGNvbnN0IGFsbEl0ZW1zID0gW107XG4gICAgICBBcnJheS5mcm9tKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLnZhbHVlcygpKVxuICAgICAgICAuZmlsdGVyKChjYXRlZ29yeTogeyB2YWx1ZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gY2F0ZWdvcnkudmFsdWUgIT09ICdhbGwnO1xuICAgICAgICB9KVxuICAgICAgICAuZm9yRWFjaCgodjogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogYW55W10gfSkgPT4gYWxsSXRlbXMucHVzaCguLi52Lml0ZW1zKSk7XG4gICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihhbGxJdGVtcyk7XG4gICAgICB0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC5zZXQoJ2FsbCcsIHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ0FsbCcsIGl0ZW1zOiBhbGxJdGVtcyB9KTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RDYXRlZ29yeShjYXRlZ29yeTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICAvLyBTY3JvbGwgdG8gdG9wXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmxpc3RFbGVtZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbFRvcCcsIDApO1xuICAgIC8vIFNldCBmb2N1c1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAvLyBGaW5kIG5ldyBpdGVtc1xuICAgIGNvbnN0IGtleTogc3RyaW5nID0gY2F0ZWdvcnkudmFsdWU7XG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gICAgLy8gQ2xlYXJcbiAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAvLyBOZXcgbWF0Y2hlc1xuICAgIHRoaXMuZ2V0TmV3TWF0Y2hlcyhjYXRlZ29yeSwga2V5KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlYXJjaFRlcm0oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgdGhpcy5zZWxlY3RDYXRlZ29yeSh7IHZhbHVlOiB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUsIGxhYmVsOiB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkubGFiZWwgfSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0TWF0Y2goZXZlbnQ/OiBNb3VzZUV2ZW50LCBpdGVtPzogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH0pOiBib29sZWFuIHtcbiAgICAvLyBTZXQgZm9jdXNcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBmaXJlQ3VzdG9tRmlsdGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5jdXN0b21GaWx0ZXJWYWx1ZSA9IHZhbHVlO1xuICAgIC8vIENsZWFyIGNhY2hlIG1hcFxuICAgIHRoaXMuaW50ZXJuYWxNYXAuY2xlYXIoKTtcbiAgICAvLyBPbmx5IGZpcmUgaWYgd2UgaGF2ZSBhIHNlbGVjdGVkIGNhdGVnb3J5XG4gICAgaWYgKHRoaXMuc2VsZWN0Q2F0ZWdvcnkpIHtcbiAgICAgIC8vIEZpbmQgbmV3IGl0ZW1zXG4gICAgICBjb25zdCBrZXk6IHN0cmluZyA9IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZTtcbiAgICAgIC8vIEdldCBuZXcgbWF0Y2hlc1xuICAgICAgdGhpcy5nZXROZXdNYXRjaGVzKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSwga2V5KTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvLyBGb2N1c1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgZmlsdGVyRGF0YSgpOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuY2F0ZWdvcnlNYXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLmdldCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUpLml0ZW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldCh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUpLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXdNYXRjaGVzKGNhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfSwga2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICBpZiAodGhpcy5jb25maWcuY2F0ZWdvcnlNYXApIHtcbiAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLmdldChrZXkpLml0ZW1zKTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuY29uZmlnLmdldEl0ZW1zRm9yQ2F0ZWdvcnlBc3luYykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1RoZSBcImNvbmZpZ1wiIGZvciB0aGUgQ2hpcHMgbXVzdCBpbmNsdWRlIGEgZnVuY3Rpb24gXCJnZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmMoY2F0ZWdvcnlLZXk6IHN0cmluZylcIiB0byByZXRyaWV2ZSB0aGUgaXRlbXMgYnkgY2F0ZWdvcnkuIE9yIGlmIHlvdSBoYXZlIHN0YXRpYyBkYXRhIHByb3ZpZGUgYSBcImNhdGVnb3J5TWFwXCInLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmludGVybmFsTWFwLmdldChrZXkpKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb25maWcuZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jKGtleSwgdGhpcy5jdXN0b21GaWx0ZXJWYWx1ZSkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcbiAgICAgICAgICB0aGlzLmludGVybmFsTWFwLnNldChrZXksIHsgdmFsdWU6IGNhdGVnb3J5LnZhbHVlLCBsYWJlbDogY2F0ZWdvcnkubGFiZWwsIGl0ZW1zIH0pO1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKGl0ZW1zLCB0cnVlKTtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KGtleSkuaXRlbXMpO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbHRlcihcbiAgICBhcnJheTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10sXG4gICAgaWdub3JlQ3VzdG9tRmlsdGVyOiBib29sZWFuID0gZmFsc2UsXG4gICk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgIGxldCBtYXRjaGVzOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXSA9IGFycmF5O1xuICAgIGlmICh0aGlzLnNlYXJjaFRlcm0gJiYgdGhpcy5zZWFyY2hUZXJtLmxlbmd0aCAhPT0gMCAmJiB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICAgIG1hdGNoZXMgPSBtYXRjaGVzLmZpbHRlcigobWF0Y2gpID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbWF0Y2gubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTEgfHwgbWF0Y2gudmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY3VzdG9tRmlsdGVyRW5hYmxlZCAmJiB0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIubWF0Y2hGdW5jdGlvbiAmJiAhaWdub3JlQ3VzdG9tRmlsdGVyKSB7XG4gICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIubWF0Y2hGdW5jdGlvbihtYXRjaCwgdGhpcy5jdXN0b21GaWx0ZXJWYWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxufVxuIl19