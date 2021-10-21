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
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../../switch/Switch";
import * as i6 from "../../../loading/Loading";
const _c0 = ["input"];
const _c1 = ["list"];
function GroupedMultiPickerResults_novo_list_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 17);
    i0.ɵɵlistener("click", function GroupedMultiPickerResults_novo_list_item_2_Template_novo_list_item_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.selectCategory({ value: "all", label: "all" }); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵelementStart(2, "span", 18);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "item-end");
    i0.ɵɵelement(5, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r0.selectedCategory == null ? null : ctx_r0.selectedCategory.value) === "all")("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.labels.all);
} }
function GroupedMultiPickerResults_novo_list_item_3_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const category_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(category_r13.iconClass);
} }
function GroupedMultiPickerResults_novo_list_item_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 20);
    i0.ɵɵlistener("click", function GroupedMultiPickerResults_novo_list_item_3_Template_novo_list_item_click_0_listener() { i0.ɵɵrestoreView(_r17); const category_r13 = ctx.$implicit; const ctx_r16 = i0.ɵɵnextContext(); return ctx_r16.selectCategory(category_r13); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵtemplate(2, GroupedMultiPickerResults_novo_list_item_3_i_2_Template, 1, 2, "i", 21);
    i0.ɵɵelementStart(3, "span", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "item-end");
    i0.ɵɵelement(6, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", (ctx_r1.selectedCategory == null ? null : ctx_r1.selectedCategory.value) === category_r13.value)("disabled", ctx_r1.isLoading);
    i0.ɵɵattribute("data-automation-id", category_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", category_r13.iconClass);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(category_r13.label);
} }
function GroupedMultiPickerResults_footer_4_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 22);
    i0.ɵɵelementStart(1, "novo-switch", 23);
    i0.ɵɵlistener("ngModelChange", function GroupedMultiPickerResults_footer_4_Template_novo_switch_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(); return ctx_r18.customFilterValue = $event; })("onChange", function GroupedMultiPickerResults_footer_4_Template_novo_switch_onChange_1_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r20 = i0.ɵɵnextContext(); return ctx_r20.fireCustomFilter($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 18);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r2.isLoading);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngModel", ctx_r2.customFilterValue);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.customFilterLabel);
} }
function GroupedMultiPickerResults_i_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 24);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r4.isLoading);
} }
function GroupedMultiPickerResults_i_10_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 25);
    i0.ɵɵlistener("click", function GroupedMultiPickerResults_i_10_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.clearSearchTerm($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("disabled", ctx_r5.isLoading);
} }
function GroupedMultiPickerResults_novo_list_item_14_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 26);
    i0.ɵɵlistener("click", function GroupedMultiPickerResults_novo_list_item_14_Template_novo_list_item_click_0_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r24 = i0.ɵɵnextContext(); return ctx_r24.selectMatch($event); })("mouseenter", function GroupedMultiPickerResults_novo_list_item_14_Template_novo_list_item_mouseenter_0_listener() { i0.ɵɵrestoreView(_r25); const match_r23 = ctx.$implicit; const ctx_r26 = i0.ɵɵnextContext(); return ctx_r26.selectActive(match_r23); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r23 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", match_r23 === ctx_r7.activeMatch)("disabled", ctx_r7.preselected(match_r23) || ctx_r7.isLoading);
    i0.ɵɵattribute("data-automation-id", match_r23.label);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r23.label);
} }
function GroupedMultiPickerResults_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.labels.groupedMultiPickerEmpty, " ");
} }
function GroupedMultiPickerResults_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r9.labels.groupedMultiPickerSelectCategory, " ");
} }
function GroupedMultiPickerResults_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelement(1, "novo-loading", 30);
    i0.ɵɵelementEnd();
} }
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
GroupedMultiPickerResults.ɵfac = function GroupedMultiPickerResults_Factory(t) { return new (t || GroupedMultiPickerResults)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
GroupedMultiPickerResults.ɵcmp = i0.ɵɵdefineComponent({ type: GroupedMultiPickerResults, selectors: [["grouped-multi-picker-results"]], viewQuery: function GroupedMultiPickerResults_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵstaticViewQuery(_c0, true);
        i0.ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.inputElement = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.listElement = _t.first);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 18, vars: 13, consts: [[1, "grouped-multi-picker-groups"], ["direction", "vertical"], ["data-automation-id", "display-all", 3, "active", "disabled", "click", 4, "ngIf"], [3, "active", "disabled", "click", 4, "ngFor", "ngForOf"], ["class", "grouped-multi-picker-groups-footer", "data-automation-id", "footer", 3, "disabled", 4, "ngIf"], [1, "grouped-multi-picker-matches"], ["data-automation-id", "input-container", 1, "grouped-multi-picker-input-container", 3, "hidden"], ["autofocus", "", "data-automation-id", "input", 3, "ngModel", "disabled", "placeholder", "ngModelChange"], ["input", ""], ["class", "bhi-search", "data-automation-id", "seach-icon", 3, "disabled", 4, "ngIf"], ["class", "bhi-times", "data-automation-id", "remove-icon", 3, "disabled", "click", 4, "ngIf"], [1, "grouped-multi-picker-list-container"], ["list", ""], [3, "active", "disabled", "click", "mouseenter", 4, "ngFor", "ngForOf"], ["class", "grouped-multi-picker-no-results", "data-automation-id", "empty-message", 4, "ngIf"], ["class", "grouped-multi-picker-no-category", "data-automation-id", "select-category-message", 4, "ngIf"], ["class", "grouped-multi-picker-loading", "data-automation-id", "loading-message", 4, "ngIf"], ["data-automation-id", "display-all", 3, "click"], ["data-automation-id", "label"], [1, "bhi-next"], [3, "click"], [3, "class", 4, "ngIf"], ["data-automation-id", "footer", 1, "grouped-multi-picker-groups-footer"], ["data-automation-id", "switch", 3, "ngModel", "ngModelChange", "onChange"], ["data-automation-id", "seach-icon", 1, "bhi-search"], ["data-automation-id", "remove-icon", 1, "bhi-times", 3, "click"], [3, "click", "mouseenter"], ["data-automation-id", "empty-message", 1, "grouped-multi-picker-no-results"], ["data-automation-id", "select-category-message", 1, "grouped-multi-picker-no-category"], ["data-automation-id", "loading-message", 1, "grouped-multi-picker-loading"], ["theme", "line"]], template: function GroupedMultiPickerResults_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "novo-list", 1);
        i0.ɵɵtemplate(2, GroupedMultiPickerResults_novo_list_item_2_Template, 6, 5, "novo-list-item", 2);
        i0.ɵɵtemplate(3, GroupedMultiPickerResults_novo_list_item_3_Template, 7, 7, "novo-list-item", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, GroupedMultiPickerResults_footer_4_Template, 4, 4, "footer", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 5);
        i0.ɵɵelementStart(6, "div", 6);
        i0.ɵɵelementStart(7, "input", 7, 8);
        i0.ɵɵlistener("ngModelChange", function GroupedMultiPickerResults_Template_input_ngModelChange_7_listener($event) { return ctx.searchTerm = $event; });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(9, GroupedMultiPickerResults_i_9_Template, 1, 2, "i", 9);
        i0.ɵɵtemplate(10, GroupedMultiPickerResults_i_10_Template, 1, 2, "i", 10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "div", 11);
        i0.ɵɵelementStart(12, "novo-list", 1, 12);
        i0.ɵɵtemplate(14, GroupedMultiPickerResults_novo_list_item_14_Template, 4, 6, "novo-list-item", 13);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(15, GroupedMultiPickerResults_div_15_Template, 2, 1, "div", 14);
        i0.ɵɵtemplate(16, GroupedMultiPickerResults_div_16_Template, 2, 1, "div", 15);
        i0.ɵɵtemplate(17, GroupedMultiPickerResults_div_17_Template, 2, 0, "div", 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.config.displayAll);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.categories);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.customFilterEnabled);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("hidden", !ctx.selectedCategory);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.searchTerm)("disabled", ctx.isLoading)("placeholder", ctx.placeholder);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !ctx.searchTerm);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.searchTerm);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngForOf", ctx.matches);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.matches.length === 0 && !ctx.isLoading && ctx.selectedCategory);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.matches.length === 0 && !ctx.isLoading && !ctx.selectedCategory);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isLoading);
    } }, directives: [i2.NovoListElement, i3.NgIf, i3.NgForOf, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgModel, i2.NovoListItemElement, i2.NovoItemContentElement, i2.NovoItemEndElement, i5.NovoSwitchElement, i6.NovoLoadingElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GroupedMultiPickerResults, [{
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
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, { inputElement: [{
            type: ViewChild,
            args: ['input', { static: true }]
        }], listElement: [{
            type: ViewChild,
            args: ['list']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9waWNrZXIvZXh0cmFzL2dyb3VwZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBcUIsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7Ozs7Ozs7Ozs7O0lBT3JFLDBDQU9FO0lBTEEsMk5BQWlDLEtBQUssU0FBUyxLQUFLLE9BQUk7SUFLeEQsb0NBQ0U7SUFBQSxnQ0FBaUM7SUFBQSxZQUFnQjtJQUFBLGlCQUFPO0lBQzFELGlCQUFlO0lBQ2YsZ0NBQ0U7SUFBQSx3QkFBd0I7SUFDMUIsaUJBQVc7SUFDYixpQkFBaUI7OztJQVZmLDRHQUFrRCw4QkFBQTtJQUtmLGVBQWdCO0lBQWhCLHVDQUFnQjs7O0lBY2pELG9CQUErRDs7O0lBQWpDLHFDQUE0Qjs7OztJQVI5RCwwQ0FPRTtJQUxBLHVRQUFrQztJQUtsQyxvQ0FDRTtJQUFBLHdGQUEyRDtJ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d0Isc0pBQXdCO1FBQWhELGlCQUNBO1FBQUEsc0VBQXVHO1FBQ3ZHLHlFQU1DO1FBQ0gsaUJBQU07UUFDTixnQ0FDRTtRQUFBLHlDQUNFO1FBQUEsbUdBUUU7UUFJSixpQkFBWTtRQUNaLDZFQUtFO1FBRUYsNkVBS0U7UUFFRiw2RUFDRTtRQUVKLGlCQUFNO1FBQ1IsaUJBQU07O1FBcEZBLGVBQXlCO1FBQXpCLDRDQUF5QjtRQWN6QixlQUFtQztRQUFuQyx3Q0FBbUM7UUFpQnJDLGVBQTJCO1FBQTNCLDhDQUEyQjtRQVNxQixlQUE0QjtRQUE1Qiw4Q0FBNEI7UUFDcEQsZUFBd0I7UUFBeEIsd0NBQXdCLDJCQUFBLGdDQUFBO1FBQzFCLGVBQW1CO1FBQW5CLHNDQUFtQjtRQUd2QyxlQUFrQjtRQUFsQixxQ0FBa0I7UUFTaEIsZUFBNkI7UUFBN0IscUNBQTZCO1FBYy9CLGVBQThEO1FBQTlELHlGQUE4RDtRQU85RCxlQUErRDtRQUEvRCwwRkFBK0Q7UUFLdkIsZUFBaUI7UUFBakIsb0NBQWlCOztrREFPdEQseUJBQXlCO2NBN0ZyQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlGVDthQUNGO29KQUdTLFlBQVk7a0JBRG5CLFNBQVM7bUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtZQUc1QixXQUFXO2tCQURsQixTQUFTO21CQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTGlzdEVsZW1lbnQgfSBmcm9tICcuLi8uLi8uLi9saXN0L0xpc3QnO1xuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImdyb3VwZWQtbXVsdGktcGlja2VyLWdyb3Vwc1wiPlxuICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAqbmdJZj1cImNvbmZpZy5kaXNwbGF5QWxsXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2F0ZWdvcnkoeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnYWxsJyB9KVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZENhdGVnb3J5Py52YWx1ZSA9PT0gJ2FsbCdcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImRpc3BsYXktYWxsXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsYWJlbFwiPnt7IGxhYmVscy5hbGwgfX08L3NwYW4+XG4gICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPGl0ZW0tZW5kPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgY2F0ZWdvcmllc1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENhdGVnb3J5KGNhdGVnb3J5KVwiXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZENhdGVnb3J5Py52YWx1ZSA9PT0gY2F0ZWdvcnkudmFsdWVcIlxuICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJjYXRlZ29yeS5sYWJlbFwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJjYXRlZ29yeS5pY29uQ2xhc3NcIiBbY2xhc3NdPVwiY2F0ZWdvcnkuaWNvbkNsYXNzXCI+PC9pPlxuICAgICAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBjYXRlZ29yeS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8aXRlbS1lbmQ+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1uZXh0XCI+PC9pPlxuICAgICAgICAgIDwvaXRlbS1lbmQ+XG4gICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8L25vdm8tbGlzdD5cbiAgICAgIDxmb290ZXJcbiAgICAgICAgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1ncm91cHMtZm9vdGVyXCJcbiAgICAgICAgKm5nSWY9XCJjdXN0b21GaWx0ZXJFbmFibGVkXCJcbiAgICAgICAgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZm9vdGVyXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICA+XG4gICAgICAgIDxub3ZvLXN3aXRjaCBbKG5nTW9kZWwpXT1cImN1c3RvbUZpbHRlclZhbHVlXCIgKG9uQ2hhbmdlKT1cImZpcmVDdXN0b21GaWx0ZXIoJGV2ZW50KVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cInN3aXRjaFwiPjwvbm92by1zd2l0Y2g+XG4gICAgICAgIDxsYWJlbCBkYXRhLWF1dG9tYXRpb24taWQ9XCJsYWJlbFwiPnt7IGN1c3RvbUZpbHRlckxhYmVsIH19PC9sYWJlbD5cbiAgICAgIDwvZm9vdGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1tYXRjaGVzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItaW5wdXQtY29udGFpbmVyXCIgW2hpZGRlbl09XCIhc2VsZWN0ZWRDYXRlZ29yeVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICA8aW5wdXQgYXV0b2ZvY3VzICNpbnB1dCBbKG5nTW9kZWwpXT1cInNlYXJjaFRlcm1cIiBbZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaW5wdXRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAvPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiFzZWFyY2hUZXJtXCIgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlYWNoLWljb25cIj48L2k+XG4gICAgICAgIDxpXG4gICAgICAgICAgY2xhc3M9XCJiaGktdGltZXNcIlxuICAgICAgICAgICpuZ0lmPVwic2VhcmNoVGVybVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsZWFyU2VhcmNoVGVybSgkZXZlbnQpXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJyZW1vdmUtaWNvblwiXG4gICAgICAgID48L2k+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgI2xpc3Q+XG4gICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaCkgfHwgaXNMb2FkaW5nXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtYXRjaC5sYWJlbFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgbWF0Y2gubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiZ3JvdXBlZC1tdWx0aS1waWNrZXItbm8tcmVzdWx0c1wiXG4gICAgICAgICAgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA9PT0gMCAmJiAhaXNMb2FkaW5nICYmIHNlbGVjdGVkQ2F0ZWdvcnlcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LW1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlckVtcHR5IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1uby1jYXRlZ29yeVwiXG4gICAgICAgICAgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA9PT0gMCAmJiAhaXNMb2FkaW5nICYmICFzZWxlY3RlZENhdGVnb3J5XCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWxlY3QtY2F0ZWdvcnktbWVzc2FnZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBsYWJlbHMuZ3JvdXBlZE11bHRpUGlja2VyU2VsZWN0Q2F0ZWdvcnkgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncm91cGVkLW11bHRpLXBpY2tlci1sb2FkaW5nXCIgKm5nSWY9XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsb2FkaW5nLW1lc3NhZ2VcIj5cbiAgICAgICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2xpc3QnKVxuICBwcml2YXRlIGxpc3RFbGVtZW50OiBOb3ZvTGlzdEVsZW1lbnQ7XG5cbiAgcHVibGljIHNlbGVjdGVkQ2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9O1xuICBwdWJsaWMgc2VhcmNoVGVybTogc3RyaW5nO1xuICBwdWJsaWMgY3VzdG9tRmlsdGVyRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgY3VzdG9tRmlsdGVyTGFiZWw6IHN0cmluZztcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcblxuICBwcml2YXRlIGtleWJvYXJkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgaW50ZXJuYWxNYXA6IE1hcDxzdHJpbmcsIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfT4gPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH1cbiAgPigpO1xuICBwdWJsaWMgY3VzdG9tRmlsdGVyVmFsdWU6IGFueTtcblxuICBzZXQgdGVybSh2YWx1ZSkge1xuICAgIC8vIERpc3BsYXkgYWxsIG9ubHkgd2lsbCB3b3JrIGZvciBzdGF0aWMgY2F0ZWdvcmllc1xuICAgIGlmICh0aGlzLmNvbmZpZy5kaXNwbGF5QWxsICYmIHRoaXMuY29uZmlnLmdldEl0ZW1zRm9yQ2F0ZWdvcnlBc3luYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnW0dyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHNdIC0geW91IGNhbiBvbmx5IGhhdmUgYGRpc3BsYXlBbGxgIHdpdGggYSBzdGF0aWMgYGNhdGVnb3J5TWFwYC4gTm90IGF2YWlsYWJsZSB3aXRoIGBnZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmNgJyxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIEN1c3RvbSBmaWx0ZXJcbiAgICBpZiAodGhpcy5jb25maWcuY3VzdG9tRmlsdGVyKSB7XG4gICAgICB0aGlzLmN1c3RvbUZpbHRlckVuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJMYWJlbCA9IHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlci5sYWJlbDtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyVmFsdWUgPSAhIXRoaXMuY29uZmlnLmN1c3RvbUZpbHRlci5kZWZhdWx0RmlsdGVyVmFsdWU7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIGlmICghdGhpcy5jdXN0b21GaWx0ZXJMYWJlbCB8fCAhdGhpcy5jb25maWcuY3VzdG9tRmlsdGVyLm1hdGNoRnVuY3Rpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0c10gLSBjdXN0b20gZmlsdGVyL21hdGNoRnVuY3Rpb24gc2V0IG5vIGxhYmVsIHdhcyBwcm92aWRlZCEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXN0b21GaWx0ZXJFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIENvbmZpZ3VyZSBBTExcbiAgICBpZiAodGhpcy5jb25maWcuZGlzcGxheUFsbCAmJiAhdGhpcy5zZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICB0aGlzLnNldEFsbENhdGVnb3J5KCk7XG4gICAgfVxuICAgIC8vIFBsYWNlaG9sZGVyXG4gICAgaWYgKHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5jb25maWcucGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIC8vIEZvY3VzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgY2F0ZWdvcmllcygpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY2F0ZWdvcmllcyB8fCB0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5jb25maWcuY2F0ZWdvcmllcyB8fFxuICAgICAgICBBcnJheS5mcm9tKHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLnZhbHVlcygpKS5maWx0ZXIoKGNhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjYXRlZ29yeS52YWx1ZSAhPT0gJ2FsbCc7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50LCByZWYpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIFN1YnNjcmliZSB0byBrZXlib2FyZCBldmVudHMgYW5kIGRlYm91bmNlXG4gICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5dXAnKVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDM1MCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEoKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBDbGVhbnVwXG4gICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHNldEFsbENhdGVnb3J5KCkge1xuICAgIC8vIElmIHdlIGhhdmUgZGlzcGxheSBhbGwsIHNldCB0aGUgYWxsIGNhdGVnb3JpZXMgdXBcbiAgICBpZiAodGhpcy5jb25maWcuZGlzcGxheUFsbCkge1xuICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0geyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnYWxsJyB9O1xuICAgICAgY29uc3QgYWxsSXRlbXMgPSBbXTtcbiAgICAgIEFycmF5LmZyb20odGhpcy5jb25maWcuY2F0ZWdvcnlNYXAudmFsdWVzKCkpXG4gICAgICAgIC5maWx0ZXIoKGNhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjYXRlZ29yeS52YWx1ZSAhPT0gJ2FsbCc7XG4gICAgICAgIH0pXG4gICAgICAgIC5mb3JFYWNoKCh2OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiBhbnlbXSB9KSA9PiBhbGxJdGVtcy5wdXNoKC4uLnYuaXRlbXMpKTtcbiAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKGFsbEl0ZW1zKTtcbiAgICAgIHRoaXMuY29uZmlnLmNhdGVnb3J5TWFwLnNldCgnYWxsJywgeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnQWxsJywgaXRlbXM6IGFsbEl0ZW1zIH0pO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdENhdGVnb3J5KGNhdGVnb3J5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfSk6IHZvaWQge1xuICAgIC8vIFNjcm9sbCB0byB0b3BcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMubGlzdEVsZW1lbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsVG9wJywgMCk7XG4gICAgLy8gU2V0IGZvY3VzXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIC8vIEZpbmQgbmV3IGl0ZW1zXG4gICAgY29uc3Qga2V5OiBzdHJpbmcgPSBjYXRlZ29yeS52YWx1ZTtcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAvLyBDbGVhclxuICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIC8vIE5ldyBtYXRjaGVzXG4gICAgdGhpcy5nZXROZXdNYXRjaGVzKGNhdGVnb3J5LCBrZXkpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU2VhcmNoVGVybShldmVudDogTW91c2VFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICB0aGlzLnNlbGVjdENhdGVnb3J5KHsgdmFsdWU6IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSwgbGFiZWw6IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS5sYWJlbCB9KTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RNYXRjaChldmVudD86IE1vdXNlRXZlbnQsIGl0ZW0/OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfSk6IGJvb2xlYW4ge1xuICAgIC8vIFNldCBmb2N1c1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0TWF0Y2goZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGZpcmVDdXN0b21GaWx0ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmN1c3RvbUZpbHRlclZhbHVlID0gdmFsdWU7XG4gICAgLy8gQ2xlYXIgY2FjaGUgbWFwXG4gICAgdGhpcy5pbnRlcm5hbE1hcC5jbGVhcigpO1xuICAgIC8vIE9ubHkgZmlyZSBpZiB3ZSBoYXZlIGEgc2VsZWN0ZWQgY2F0ZWdvcnlcbiAgICBpZiAodGhpcy5zZWxlY3RDYXRlZ29yeSkge1xuICAgICAgLy8gRmluZCBuZXcgaXRlbXNcbiAgICAgIGNvbnN0IGtleTogc3RyaW5nID0gdGhpcy5zZWxlY3RlZENhdGVnb3J5LnZhbHVlO1xuICAgICAgLy8gR2V0IG5ldyBtYXRjaGVzXG4gICAgICB0aGlzLmdldE5ld01hdGNoZXModGhpcy5zZWxlY3RlZENhdGVnb3J5LCBrZXkpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIC8vIEZvY3VzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXJEYXRhKCk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5jb25maWcuY2F0ZWdvcnlNYXAuZ2V0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSkuaXRlbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KHRoaXMuc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSkuaXRlbXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGdldE5ld01hdGNoZXMoY2F0ZWdvcnk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9LCBrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIEdldCBuZXcgbWF0Y2hlc1xuICAgIGlmICh0aGlzLmNvbmZpZy5jYXRlZ29yeU1hcCkge1xuICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIodGhpcy5jb25maWcuY2F0ZWdvcnlNYXAuZ2V0KGtleSkuaXRlbXMpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5jb25maWcuZ2V0SXRlbXNGb3JDYXRlZ29yeUFzeW5jKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnVGhlIFwiY29uZmlnXCIgZm9yIHRoZSBDaGlwcyBtdXN0IGluY2x1ZGUgYSBmdW5jdGlvbiBcImdldEl0ZW1zRm9yQ2F0ZWdvcnlBc3luYyhjYXRlZ29yeUtleTogc3RyaW5nKVwiIHRvIHJldHJpZXZlIHRoZSBpdGVtcyBieSBjYXRlZ29yeS4gT3IgaWYgeW91IGhhdmUgc3RhdGljIGRhdGEgcHJvdmlkZSBhIFwiY2F0ZWdvcnlNYXBcIicsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuaW50ZXJuYWxNYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbmZpZy5nZXRJdGVtc0ZvckNhdGVnb3J5QXN5bmMoa2V5LCB0aGlzLmN1c3RvbUZpbHRlclZhbHVlKS50aGVuKChpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSkgPT4ge1xuICAgICAgICAgIHRoaXMuaW50ZXJuYWxNYXAuc2V0KGtleSwgeyB2YWx1ZTogY2F0ZWdvcnkudmFsdWUsIGxhYmVsOiBjYXRlZ29yeS5sYWJlbCwgaXRlbXMgfSk7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIoaXRlbXMsIHRydWUpO1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQoa2V5KS5pdGVtcyk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyKFxuICAgIGFycmF5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXSxcbiAgICBpZ25vcmVDdXN0b21GaWx0ZXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgKTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB7XG4gICAgbGV0IG1hdGNoZXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgZmlsdGVyVmFsdWU/OiBhbnkgfVtdID0gYXJyYXk7XG4gICAgaWYgKHRoaXMuc2VhcmNoVGVybSAmJiB0aGlzLnNlYXJjaFRlcm0ubGVuZ3RoICE9PSAwICYmIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSkge1xuICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuZmlsdGVyKChtYXRjaCkgPT4ge1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBtYXRjaC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMSB8fCBtYXRjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXN0b21GaWx0ZXJFbmFibGVkICYmIHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlci5tYXRjaEZ1bmN0aW9uICYmICFpZ25vcmVDdXN0b21GaWx0ZXIpIHtcbiAgICAgIG1hdGNoZXMgPSBtYXRjaGVzLmZpbHRlcigobWF0Y2gpID0+IHRoaXMuY29uZmlnLmN1c3RvbUZpbHRlci5tYXRjaEZ1bmN0aW9uKG1hdGNoLCB0aGlzLmN1c3RvbUZpbHRlclZhbHVlKSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG59XG4iXX0=