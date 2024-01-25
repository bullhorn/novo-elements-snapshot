import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { NovoListElement } from 'novo-elements/elements/list';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "novo-elements/elements/loading";
import * as i6 from "novo-elements/elements/list";
import * as i7 from "novo-elements/elements/switch";
export class GroupedMultiPickerResults extends BasePickerResults {
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
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.customFilterEnabled = false;
        this.placeholder = '';
        this.internalMap = new Map();
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
GroupedMultiPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GroupedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
GroupedMultiPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: GroupedMultiPickerResults, selector: "grouped-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host novo-list-item ::ng-deep div.list-item{flex:1!important}:host>.grouped-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-groups novo-list{overflow:auto}:host>.grouped-multi-picker-groups footer{flex-basis:50px;min-height:50px;height:50px;display:flex;align-items:center;border-top:1px solid #f7f7f7}:host>.grouped-multi-picker-groups footer label{font-weight:500}:host>.grouped-multi-picker-groups footer.disabled{pointer-events:none;opacity:.75}:host>.grouped-multi-picker-groups novo-list-item{font-weight:500;color:#999;border-left:3px solid #ffffff}:host>.grouped-multi-picker-groups novo-list-item ::ng-deep .list-item{justify-content:center}:host>.grouped-multi-picker-groups novo-list-item item-end{color:#999}:host>.grouped-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e9e9e9}:host>.grouped-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.grouped-multi-picker-groups novo-list-item.active ::ng-deep .list-item>item-content>*{color:#4a89dc!important}:host>.grouped-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-matches novo-list{overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container{position:relative}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search.disabled,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.grouped-multi-picker-matches .grouped-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-no-category,:host>.grouped-multi-picker-matches .grouped-multi-picker-no-results,:host>.grouped-multi-picker-matches .grouped-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i4.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "component", type: i6.NovoItemEndElement, selector: "item-end, novo-item-end" }, { kind: "component", type: i7.NovoSwitchElement, selector: "novo-switch", inputs: ["theme", "icons", "disabled"], outputs: ["onChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: GroupedMultiPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'grouped-multi-picker-results', template: `
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
  `, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host novo-list-item ::ng-deep div.list-item{flex:1!important}:host>.grouped-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-groups novo-list{overflow:auto}:host>.grouped-multi-picker-groups footer{flex-basis:50px;min-height:50px;height:50px;display:flex;align-items:center;border-top:1px solid #f7f7f7}:host>.grouped-multi-picker-groups footer label{font-weight:500}:host>.grouped-multi-picker-groups footer.disabled{pointer-events:none;opacity:.75}:host>.grouped-multi-picker-groups novo-list-item{font-weight:500;color:#999;border-left:3px solid #ffffff}:host>.grouped-multi-picker-groups novo-list-item ::ng-deep .list-item{justify-content:center}:host>.grouped-multi-picker-groups novo-list-item item-end{color:#999}:host>.grouped-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e9e9e9}:host>.grouped-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.grouped-multi-picker-groups novo-list-item.active ::ng-deep .list-item>item-content>*{color:#4a89dc!important}:host>.grouped-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.grouped-multi-picker-matches novo-list{overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container{position:relative}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-search.disabled,:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.grouped-multi-picker-matches .grouped-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.grouped-multi-picker-matches .grouped-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.grouped-multi-picker-matches .grouped-multi-picker-no-category,:host>.grouped-multi-picker-matches .grouped-multi-picker-no-results,:host>.grouped-multi-picker-matches .grouped-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BpY2tlci9leHRyYXMvZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9Hcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7Ozs7QUFnRzdFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxpQkFBaUI7SUFtQjlELElBQUksSUFBSSxDQUFDLEtBQUs7UUFDWixtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFO1lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQ2IseUlBQXlJLENBQzFJLENBQUM7U0FDSDtRQUNELGdCQUFnQjtRQUNoQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFD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QkFBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUc1QixXQUFXO3NCQURsQixTQUFTO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b0xpc3RFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9saXN0JztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dyb3VwZWQtbXVsdGktcGlja2VyLXJlc3VsdHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1ncm91cHNcIj5cbiAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nSWY9XCJjb25maWcuZGlzcGxheUFsbFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENhdGVnb3J5KHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ2FsbCcgfSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDYXRlZ29yeT8udmFsdWUgPT09ICdhbGwnXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJkaXNwbGF5LWFsbFwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBsYWJlbHMuYWxsIH19PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgIDxpdGVtLWVuZD5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW5leHRcIj48L2k+XG4gICAgICAgICAgPC9pdGVtLWVuZD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXNcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDYXRlZ29yeShjYXRlZ29yeSlcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRDYXRlZ29yeT8udmFsdWUgPT09IGNhdGVnb3J5LnZhbHVlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiY2F0ZWdvcnkubGFiZWxcIlxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgICA+XG4gICAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiY2F0ZWdvcnkuaWNvbkNsYXNzXCIgW2NsYXNzXT1cImNhdGVnb3J5Lmljb25DbGFzc1wiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cImxhYmVsXCI+e3sgY2F0ZWdvcnkubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPGl0ZW0tZW5kPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICA8Zm9vdGVyXG4gICAgICAgIGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItZ3JvdXBzLWZvb3RlclwiXG4gICAgICAgICpuZ0lmPVwiY3VzdG9tRmlsdGVyRW5hYmxlZFwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImZvb3RlclwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgPlxuICAgICAgICA8bm92by1zd2l0Y2ggWyhuZ01vZGVsKV09XCJjdXN0b21GaWx0ZXJWYWx1ZVwiIChvbkNoYW5nZSk9XCJmaXJlQ3VzdG9tRmlsdGVyKCRldmVudClcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzd2l0Y2hcIj48L25vdm8tc3dpdGNoPlxuICAgICAgICA8bGFiZWwgZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBjdXN0b21GaWx0ZXJMYWJlbCB9fTwvbGFiZWw+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbWF0Y2hlc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwZWQtbXVsdGktcGlja2VyLWlucHV0LWNvbnRhaW5lclwiIFtoaWRkZW5dPVwiIXNlbGVjdGVkQ2F0ZWdvcnlcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgPGlucHV0IGF1dG9mb2N1cyAjaW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCIgW2Rpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgLz5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgKm5nSWY9XCIhc2VhcmNoVGVybVwiIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWFjaC1pY29uXCI+PC9pPlxuICAgICAgICA8aVxuICAgICAgICAgIGNsYXNzPVwiYmhpLXRpbWVzXCJcbiAgICAgICAgICAqbmdJZj1cInNlYXJjaFRlcm1cIlxuICAgICAgICAgIChjbGljayk9XCJjbGVhclNlYXJjaFRlcm0oJGV2ZW50KVwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwicmVtb3ZlLWljb25cIlxuICAgICAgICA+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiICNsaXN0PlxuICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxuICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpIHx8IGlzTG9hZGluZ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWF0Y2gubGFiZWxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IG1hdGNoLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImdyb3VwZWQtbXVsdGktcGlja2VyLW5vLXJlc3VsdHNcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZENhdGVnb3J5XCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS1tZXNzYWdlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGxhYmVscy5ncm91cGVkTXVsdGlQaWNrZXJFbXB0eSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbm8tY2F0ZWdvcnlcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiAhc2VsZWN0ZWRDYXRlZ29yeVwiXG4gICAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VsZWN0LWNhdGVnb3J5LW1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlclNlbGVjdENhdGVnb3J5IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibG9hZGluZy1tZXNzYWdlXCI+XG4gICAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHMgZXh0ZW5kcyBCYXNlUGlja2VyUmVzdWx0cyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbGlzdCcpXG4gIHByaXZhdGUgbGlzdEVsZW1lbnQ6IE5vdm9MaXN0RWxlbWVudDtcblxuICBwdWJsaWMgc2VsZWN0ZWRDYXRlZ29yeTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH07XG4gIHB1YmxpYyBzZWFyY2hUZXJtOiBzdHJpbmc7XG4gIHB1YmxpYyBjdXN0b21GaWx0ZXJFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBjdXN0b21GaWx0ZXJMYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUga2V5Ym9hcmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBpbnRlcm5hbE1hcDogTWFwPHN0cmluZywgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9PiA9IG5ldyBNYXA8XG4gICAgc3RyaW5nLFxuICAgIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfVxuICA+KCk7XG4gIHB1YmxpYyBjdXN0b21GaWx0ZXJWYWx1ZTogYW55O1xuXG4gIHNldCB0ZXJtKHZhbHVlKSB7XG4gICAgLy8gRGlzcGxheSBhbGwgb25seSB3aWxsIHdvcmsgZm9yIHN0YXRpYyBjYXRlZ29yaWVzXG4gICAgaWYgKHRoaXMuY29uZmlnLmRpc3BsYXlBbGwgJiYgdGhpcy5jb25maWcuZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdbR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0c10gLSB5b3UgY2FuIG9ubHkgaGF2ZSBgZGlzcGxheUFsbGAgd2l0aCBhIHN0YXRpYyBgY2F0ZWdvcnlNYXBgLiBOb3QgYXZhaWxhYmxlIHdpdGggYGdldEl0ZW1zRm9yQ2F0ZWdvcnlBc3luY2AnLFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gQ3VzdG9tIGZpbHRlclxuICAgIGlmICh0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIpIHtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyRW5hYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlckxhYmVsID0gdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLmxhYmVsO1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJWYWx1ZSA9ICEhdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLmRlZmF1bHRGaWx0ZXJWYWx1ZTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlckxhYmVsIHx8ICF0aGlzLmNvbmZpZy5jdXN0b21GaWx0ZXIubWF0Y2hGdW5jdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzXSAtIGN1c3RvbSBmaWx0ZXIvbWF0Y2hGdW5jdGlvbiBzZXQgbm8gbGFiZWwgd2FzIHByb3ZpZGVkIScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlckVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gQ29uZmlndXJlIEFMTFxuICAgIGlmICh0aGlzLmNvbmZpZy5kaXNwbGF5QWxsICYmICF0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuc2V0QWxsQ2F0ZWdvcnkoKTtcbiAgICB9XG4gICAgLy8gUGxhY2Vob2xkZXJcbiAgICBpZiAodGhpcy5jb25maWcucGxhY2Vob2xkZXIpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgLy8gRm9jdXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjYXRlZ29yaWVzKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYXRlZ29yaWVzIHx8IHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmNvbmZpZy5jYXRlZ29yaWVzIHx8XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5jb25maWcuY2F0ZWdvcnlNYXAudmFsdWVzKCkpLmZpbHRlcigoY2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhdGVnb3J5LnZhbHVlICE9PSAnYWxsJztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLy8gU3Vic2NyaWJlIHRvIGtleWJvYXJkIGV2ZW50cyBhbmQgZGVib3VuY2VcbiAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcpXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzUwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyRGF0YSgpO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIC8vIENsZWFudXBcbiAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0QWxsQ2F0ZWdvcnkoKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBkaXNwbGF5IGFsbCwgc2V0IHRoZSBhbGwgY2F0ZWdvcmllcyB1cFxuICAgIGlmICh0aGlzLmNvbmZpZy5kaXNwbGF5QWxsKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdhbGwnIH07XG4gICAgICBjb25zdCBhbGxJdGVtcyA9IFtdO1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC52YWx1ZXMoKSlcbiAgICAgICAgLmZpbHRlcigoY2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNhdGVnb3J5LnZhbHVlICE9PSAnYWxsJztcbiAgICAgICAgfSlcbiAgICAgICAgLmZvckVhY2goKHY6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IGFueVtdIH0pID0+IGFsbEl0ZW1zLnB1c2goLi4udi5pdGVtcykpO1xuICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIoYWxsSXRlbXMpO1xuICAgICAgdGhpcy5jb25maWcuY2F0ZWdvcnlNYXAuc2V0KCdhbGwnLCB7IHZhbHVlOiAnYWxsJywgbGFiZWw6ICdBbGwnLCBpdGVtczogYWxsSXRlbXMgfSk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0Q2F0ZWdvcnkoY2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9KTogdm9pZCB7XG4gICAgLy8gU2Nyb2xsIHRvIHRvcFxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5saXN0RWxlbWVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxUb3AnLCAwKTtcbiAgICAvLyBTZXQgZm9jdXNcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgLy8gRmluZCBuZXcgaXRlbXNcbiAgICBjb25zdCBrZXk6IHN0cmluZyA9IGNhdGVnb3J5LnZhbHVlO1xuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgIC8vIENsZWFyXG4gICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgLy8gTmV3IG1hdGNoZXNcbiAgICB0aGlzLmdldE5ld01hdGNoZXMoY2F0ZWdvcnksIGtleSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWFyY2hUZXJtKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgIHRoaXMuc2VsZWN0Q2F0ZWdvcnkoeyB2YWx1ZTogdGhpcy5zZWxlY3RlZENhdGVnb3J5LnZhbHVlLCBsYWJlbDogdGhpcy5zZWxlY3RlZENhdGVnb3J5LmxhYmVsIH0pO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdE1hdGNoKGV2ZW50PzogTW91c2VFdmVudCwgaXRlbT86IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9KTogYm9vbGVhbiB7XG4gICAgLy8gU2V0IGZvY3VzXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHJldHVybiBzdXBlci5zZWxlY3RNYXRjaChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgZmlyZUN1c3RvbUZpbHRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuY3VzdG9tRmlsdGVyVmFsdWUgPSB2YWx1ZTtcbiAgICAvLyBDbGVhciBjYWNoZSBtYXBcbiAgICB0aGlzLmludGVybmFsTWFwLmNsZWFyKCk7XG4gICAgLy8gT25seSBmaXJlIGlmIHdlIGhhdmUgYSBzZWxlY3RlZCBjYXRlZ29yeVxuICAgIGlmICh0aGlzLnNlbGVjdENhdGVnb3J5KSB7XG4gICAgICAvLyBGaW5kIG5ldyBpdGVtc1xuICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkudmFsdWU7XG4gICAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICAgIHRoaXMuZ2V0TmV3TWF0Y2hlcyh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnksIGtleSk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgLy8gRm9jdXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbHRlckRhdGEoKTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC5nZXQodGhpcy5zZWxlY3RlZENhdGVnb3J5LnZhbHVlKS5pdGVtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQodGhpcy5zZWxlY3RlZENhdGVnb3J5LnZhbHVlKS5pdGVtcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmV3TWF0Y2hlcyhjYXRlZ29yeTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH0sIGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gR2V0IG5ldyBtYXRjaGVzXG4gICAgaWYgKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwKSB7XG4gICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcih0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcC5nZXQoa2V5KS5pdGVtcyk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmNvbmZpZy5nZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdUaGUgXCJjb25maWdcIiBmb3IgdGhlIENoaXBzIG11c3QgaW5jbHVkZSBhIGZ1bmN0aW9uIFwiZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jKGNhdGVnb3J5S2V5OiBzdHJpbmcpXCIgdG8gcmV0cmlldmUgdGhlIGl0ZW1zIGJ5IGNhdGVnb3J5LiBPciBpZiB5b3UgaGF2ZSBzdGF0aWMgZGF0YSBwcm92aWRlIGEgXCJjYXRlZ29yeU1hcFwiJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pbnRlcm5hbE1hcC5nZXQoa2V5KSkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29uZmlnLmdldEl0ZW1zRm9yQ2F0ZWdvcnlBc3luYyhrZXksIHRoaXMuY3VzdG9tRmlsdGVyVmFsdWUpLnRoZW4oKGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbnRlcm5hbE1hcC5zZXQoa2V5LCB7IHZhbHVlOiBjYXRlZ29yeS52YWx1ZSwgbGFiZWw6IGNhdGVnb3J5LmxhYmVsLCBpdGVtcyB9KTtcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihpdGVtcywgdHJ1ZSk7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldChrZXkpLml0ZW1zKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXIoXG4gICAgYXJyYXk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgZmlsdGVyVmFsdWU/OiBhbnkgfVtdLFxuICAgIGlnbm9yZUN1c3RvbUZpbHRlcjogYm9vbGVhbiA9IGZhbHNlLFxuICApOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBsZXQgbWF0Y2hlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10gPSBhcnJheTtcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtICYmIHRoaXMuc2VhcmNoVGVybS5sZW5ndGggIT09IDAgJiYgdGhpcy5zZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSB0aGlzLnNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hUZXJtKSA+IC0xIHx8IG1hdGNoLnZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hUZXJtKSA+IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1c3RvbUZpbHRlckVuYWJsZWQgJiYgdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLm1hdGNoRnVuY3Rpb24gJiYgIWlnbm9yZUN1c3RvbUZpbHRlcikge1xuICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuZmlsdGVyKChtYXRjaCkgPT4gdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLm1hdGNoRnVuY3Rpb24obWF0Y2gsIHRoaXMuY3VzdG9tRmlsdGVyVmFsdWUpKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cbn1cbiJdfQ==