import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { NovoListElement } from 'novo-elements/elements/list';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/list";
import * as i3 from "novo-elements/elements/loading";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "novo-elements/elements/common";
export class MixedMultiPickerResults extends BasePickerResults {
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.placeholder = '';
        this.emptyOptionsLabel = '';
        this.internalMap = new Map();
    }
    set term(value) {
        if (this.config.placeholder) {
            this.placeholder = this.config.placeholder;
        }
        // Focus
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        });
    }
    get options() {
        return this.config.options || [];
    }
    ngOnDestroy() {
        // Cleanup
        if (this.keyboardSubscription) {
            this.keyboardSubscription.unsubscribe();
        }
        if (this.config.options) {
            this.config.options.forEach((option) => {
                if (option.clearSecondaryOptions) {
                    option.clearSecondaryOptions.unsubscribe();
                }
            });
        }
    }
    selectPrimaryOption(primaryOption, event) {
        if (this.keyboardSubscription) {
            this.keyboardSubscription.unsubscribe();
        }
        // Scroll to top
        this.renderer.setProperty(this.listElement.element.nativeElement, 'scrollTop', 0);
        // Set focus
        this.inputElement.nativeElement.focus();
        // Find new items
        const key = primaryOption.value;
        this.selectedPrimaryOption = primaryOption;
        // Clear
        this.matches = [];
        this.ref.markForCheck();
        // New matches
        if (this.optionHasSecondaryOptions(primaryOption)) {
            // Subscribe to keyboard events and debounce
            this.keyboardSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
                .pipe(debounceTime(350), distinctUntilChanged())
                .subscribe((keyEvent) => {
                this.searchTerm = keyEvent.target.value;
                this.matches = this.filterData();
                this.ref.markForCheck();
            });
            this.getNewMatches(primaryOption);
        }
        else {
            this.selectActive(primaryOption);
            this.selectMatch(event);
        }
    }
    selectMatch(event) {
        // Set focus
        this.inputElement.nativeElement.focus();
        return super.selectMatch(event);
    }
    clearSearchTerm(event) {
        Helpers.swallowEvent(event);
        this.searchTerm = '';
        this.selectPrimaryOption({ value: this.selectedPrimaryOption.value, label: this.selectedPrimaryOption.label });
        this.ref.markForCheck();
    }
    optionHasSecondaryOptions(primaryOption) {
        return !!(primaryOption && (primaryOption.secondaryOptions || primaryOption.getSecondaryOptionsAsync));
    }
    shouldShowSearchBox(primaryOption) {
        return !!(primaryOption && primaryOption.showSearchOnSecondaryOptions);
    }
    clearPrimaryOption(primaryOption) {
        if (this.internalMap.get(primaryOption.value)) {
            if (primaryOption.value === this.selectedPrimaryOption?.value) {
                this.activeMatch = null;
                this.matches = [];
                this.selectedPrimaryOption = null;
            }
            this.internalMap.delete(primaryOption.value);
            this.ref.markForCheck();
        }
    }
    filterData() {
        if (this.selectedPrimaryOption) {
            if (this.selectedPrimaryOption.secondaryOptions) {
                return this.filter(this.selectedPrimaryOption.secondaryOptions);
            }
            else {
                return this.filter(this.internalMap.get(this.selectedPrimaryOption.value).items);
            }
        }
        return [];
    }
    filter(array) {
        let matches = array;
        if (this.searchTerm && this.searchTerm.length !== 0 && this.selectedPrimaryOption) {
            matches = matches.filter((match) => {
                const searchTerm = this.searchTerm.toLowerCase();
                return match.label.toLowerCase().indexOf(searchTerm) > -1 || match.value.toLowerCase().indexOf(searchTerm) > -1;
            });
        }
        return matches;
    }
    getNewMatches(primaryOption) {
        // Get new matches
        if (primaryOption.secondaryOptions) {
            this.matches = this.filter(primaryOption.secondaryOptions);
            this.ref.markForCheck();
        }
        else {
            if (!primaryOption.getSecondaryOptionsAsync) {
                throw new Error('An option needs to have either an array of secondaryOptions or a function getSecondaryOptionsAsync');
            }
            if (!this.internalMap.get(primaryOption.value)) {
                this.isLoading = true;
                primaryOption.getSecondaryOptionsAsync().then((items) => {
                    this.internalMap.set(primaryOption.value, { value: primaryOption.value, label: primaryOption.label, items });
                    this.matches = this.filter(items);
                    this.isLoading = false;
                    this.ref.markForCheck();
                    setTimeout(() => {
                        this.inputElement.nativeElement.focus();
                    });
                });
                if (primaryOption.clearSecondaryOptions) {
                    primaryOption.clearSecondaryOptions.subscribe(() => {
                        this.clearPrimaryOption(primaryOption);
                    });
                }
            }
            else {
                this.matches = this.filter(this.internalMap.get(primaryOption.value).items);
                this.ref.markForCheck();
            }
        }
    }
}
MixedMultiPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MixedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MixedMultiPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MixedMultiPickerResults, selector: "mixed-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: ` <div class="mixed-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngFor="let option of options"
          (click)="selectPrimaryOption(option, $event)"
          [class.active]="selectedPrimaryOption?.value === option.value"
          [attr.data-automation-id]="option.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="option.iconClass" [class]="option.iconClass"></i>
            <span data-automation-id="label">{{ option.label }}</span>
          </item-content>
          <item-end *ngIf="optionHasSecondaryOptions(option)">
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="mixed-multi-picker-matches" [hidden]="!optionHasSecondaryOptions(selectedPrimaryOption)">
      <div
        class="mixed-multi-picker-input-container"
        [hidden]="!shouldShowSearchBox(selectedPrimaryOption)"
        data-automation-id="input-container"
      >
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
      <div class="mixed-multi-picker-list-container">
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
          class="mixed-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption"
          data-automation-id="empty-message"
        >
          {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
        </div>
        <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>`, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i2.NovoItemEndElement, selector: "item-end, novo-item-end" }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MixedMultiPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'mixed-multi-picker-results',
                    template: ` <div class="mixed-multi-picker-groups">
      <novo-list direction="vertical">
        <novo-list-item
          *ngFor="let option of options"
          (click)="selectPrimaryOption(option, $event)"
          [class.active]="selectedPrimaryOption?.value === option.value"
          [attr.data-automation-id]="option.label"
          [class.disabled]="isLoading"
        >
          <item-content>
            <i *ngIf="option.iconClass" [class]="option.iconClass"></i>
            <span data-automation-id="label">{{ option.label }}</span>
          </item-content>
          <item-end *ngIf="optionHasSecondaryOptions(option)">
            <i class="bhi-next"></i>
          </item-end>
        </novo-list-item>
      </novo-list>
    </div>
    <div class="mixed-multi-picker-matches" [hidden]="!optionHasSecondaryOptions(selectedPrimaryOption)">
      <div
        class="mixed-multi-picker-input-container"
        [hidden]="!shouldShowSearchBox(selectedPrimaryOption)"
        data-automation-id="input-container"
      >
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
      <div class="mixed-multi-picker-list-container">
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
          class="mixed-multi-picker-no-results"
          *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption"
          data-automation-id="empty-message"
        >
          {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
        </div>
        <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
          <novo-loading theme="line"></novo-loading>
        </div>
      </div>
    </div>`,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9waWNrZXIvZXh0cmFzL21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzL01peGVkTXVsdGlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLFNBQVMsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7Ozs7O0FBa0Y3RSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCO0lBZ0M1RCxZQUFZLE9BQW1CLEVBQVUsUUFBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ25ILEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeEJ0RixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFJOUIsZ0JBQVcsR0FBNkYsSUFBSSxHQUFHLEVBR3BILENBQUM7SUFrQkosQ0FBQztJQWhCRCxJQUFJLElBQUksQ0FBQyxLQUFL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YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOztxSEF0S1UsdUJBQXVCO3lHQUF2Qix1QkFBdUIsb1NBL0R4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTZERDs0RkFFRSx1QkFBdUI7a0JBakVuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTZERDtpQkFDVjt3TEFHUyxZQUFZO3NCQURuQixTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRzVCLFdBQVc7c0JBRGxCLFNBQVM7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b0xpc3RFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9saXN0JztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1peGVkTXVsdGlQaWNrZXJPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBzZWNvbmRhcnlPcHRpb25zPzoge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBmaWx0ZXJWYWx1ZT86IGFueTtcbiAgfVtdO1xuICBnZXRTZWNvbmRhcnlPcHRpb25zQXN5bmM/KCk6IFByb21pc2U8eyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXT47XG4gIC8vIFRPRE86IFJlZmFjdG9yIHRvIHByZXZlbnQgdGhlIG5lZWQgZm9yIGEgYmVoYXZpb3JTdWJqZWN0IHRvIGFsbG93IHByaW1hcnlPcHRpb24ncyBzZWNvbmRhcnlPcHRpb25zIHRvIGJlIGNsZWFyZWRcbiAgLy8gQ3VycmVudGx5IHNlY29uZGFyeU9wdGlvbnMgY2Fubm90IGJlIGNsZWFyZWQgdmlhIEZpZWxkSW50ZXJhY3Rpb24gQVBJIGFuZCBtdXN0IHVzZSBhIGJlaGF2aW9yIHN1YmplY3QgLSB0aGlzIGluY2x1ZGVzIG1vZGlmeVBpY2tlckNvbmZpZ1xuICBjbGVhclNlY29uZGFyeU9wdGlvbnM/OiBTdWJqZWN0PGFueT47XG4gIHNob3dTZWFyY2hPblNlY29uZGFyeU9wdGlvbnM/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cycsXG4gIHRlbXBsYXRlOiBgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItZ3JvdXBzXCI+XG4gICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uc1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFByaW1hcnlPcHRpb24ob3B0aW9uLCAkZXZlbnQpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdGVkUHJpbWFyeU9wdGlvbj8udmFsdWUgPT09IG9wdGlvbi52YWx1ZVwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbFwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJvcHRpb24uaWNvbkNsYXNzXCIgW2NsYXNzXT1cIm9wdGlvbi5pY29uQ2xhc3NcIj48L2k+XG4gICAgICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsYWJlbFwiPnt7IG9wdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8aXRlbS1lbmQgKm5nSWY9XCJvcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKG9wdGlvbilcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW5leHRcIj48L2k+XG4gICAgICAgICAgPC9pdGVtLWVuZD5cbiAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDwvbm92by1saXN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbWF0Y2hlc1wiIFtoaWRkZW5dPVwiIW9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMoc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1pbnB1dC1jb250YWluZXJcIlxuICAgICAgICBbaGlkZGVuXT1cIiFzaG91bGRTaG93U2VhcmNoQm94KHNlbGVjdGVkUHJpbWFyeU9wdGlvbilcIlxuICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dC1jb250YWluZXJcIlxuICAgICAgPlxuICAgICAgICA8aW5wdXQgYXV0b2ZvY3VzICNpbnB1dCBbKG5nTW9kZWwpXT1cInNlYXJjaFRlcm1cIiBbZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaW5wdXRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAvPlxuICAgICAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiFzZWFyY2hUZXJtXCIgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlYWNoLWljb25cIj48L2k+XG4gICAgICAgIDxpXG4gICAgICAgICAgY2xhc3M9XCJiaGktdGltZXNcIlxuICAgICAgICAgICpuZ0lmPVwic2VhcmNoVGVybVwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsZWFyU2VhcmNoVGVybSgkZXZlbnQpXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJyZW1vdmUtaWNvblwiXG4gICAgICAgID48L2k+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiICNsaXN0PlxuICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxuICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpIHx8IGlzTG9hZGluZ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWF0Y2gubGFiZWxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IG1hdGNoLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1uby1yZXN1bHRzXCJcbiAgICAgICAgICAqbmdJZj1cIm1hdGNoZXMubGVuZ3RoID09PSAwICYmICFpc0xvYWRpbmcgJiYgc2VsZWN0ZWRQcmltYXJ5T3B0aW9uXCJcbiAgICAgICAgICBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS1tZXNzYWdlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGNvbmZpZy5lbXB0eU9wdGlvbnNMYWJlbCA/IGNvbmZpZy5lbXB0eU9wdGlvbnNMYWJlbCA6IGxhYmVscy5ncm91cGVkTXVsdGlQaWNrZXJFbXB0eSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1sb2FkaW5nXCIgKm5nSWY9XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsb2FkaW5nLW1lc3NhZ2VcIj5cbiAgICAgICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdsaXN0JylcbiAgcHJpdmF0ZSBsaXN0RWxlbWVudDogTm92b0xpc3RFbGVtZW50O1xuXG4gIHB1YmxpYyBzZWxlY3RlZFByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uO1xuICBwdWJsaWMgc2VhcmNoVGVybTogc3RyaW5nO1xuICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZW1wdHlPcHRpb25zTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUga2V5Ym9hcmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIGludGVybmFsTWFwOiBNYXA8c3RyaW5nLCB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH0+ID0gbmV3IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9XG4gID4oKTtcblxuICBzZXQgdGVybSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICAvLyBGb2N1c1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm9wdGlvbnMgfHwgW107XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50LCByZWYpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIC8vIENsZWFudXBcbiAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucykge1xuICAgICAgdGhpcy5jb25maWcub3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb24uY2xlYXJTZWNvbmRhcnlPcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RQcmltYXJ5T3B0aW9uKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uLCBldmVudD86IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICAvLyBTY3JvbGwgdG8gdG9wXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmxpc3RFbGVtZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbFRvcCcsIDApO1xuICAgIC8vIFNldCBmb2N1c1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAvLyBGaW5kIG5ldyBpdGVtc1xuICAgIGNvbnN0IGtleTogc3RyaW5nID0gcHJpbWFyeU9wdGlvbi52YWx1ZTtcbiAgICB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbiA9IHByaW1hcnlPcHRpb247XG4gICAgLy8gQ2xlYXJcbiAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAvLyBOZXcgbWF0Y2hlc1xuICAgIGlmICh0aGlzLm9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMocHJpbWFyeU9wdGlvbikpIHtcbiAgICAgIC8vIFN1YnNjcmliZSB0byBrZXlib2FyZCBldmVudHMgYW5kIGRlYm91bmNlXG4gICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcpXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgzNTApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAuc3Vic2NyaWJlKChrZXlFdmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IChrZXlFdmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXJEYXRhKCk7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5nZXROZXdNYXRjaGVzKHByaW1hcnlPcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdEFjdGl2ZShwcmltYXJ5T3B0aW9uKTtcbiAgICAgIHRoaXMuc2VsZWN0TWF0Y2goZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RNYXRjaChldmVudD86IE1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgICAvLyBTZXQgZm9jdXNcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlYXJjaFRlcm0oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgdGhpcy5zZWxlY3RQcmltYXJ5T3B0aW9uKHsgdmFsdWU6IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnZhbHVlLCBsYWJlbDogdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24ubGFiZWwgfSk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xuICAgIHJldHVybiAhIShwcmltYXJ5T3B0aW9uICYmIChwcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMgfHwgcHJpbWFyeU9wdGlvbi5nZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRTaG93U2VhcmNoQm94KHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uKSB7XG4gICAgcmV0dXJuICEhKHByaW1hcnlPcHRpb24gJiYgcHJpbWFyeU9wdGlvbi5zaG93U2VhcmNoT25TZWNvbmRhcnlPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pIHtcbiAgICBpZiAodGhpcy5pbnRlcm5hbE1hcC5nZXQocHJpbWFyeU9wdGlvbi52YWx1ZSkpIHtcbiAgICAgIGlmIChwcmltYXJ5T3B0aW9uLnZhbHVlID09PSB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbj8udmFsdWUpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVNYXRjaCA9IG51bGw7XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbiA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLmludGVybmFsTWFwLmRlbGV0ZShwcmltYXJ5T3B0aW9uLnZhbHVlKTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlckRhdGEoKTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24udmFsdWUpLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXIoYXJyYXk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgZmlsdGVyVmFsdWU/OiBhbnkgfVtdKTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB7XG4gICAgbGV0IG1hdGNoZXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgZmlsdGVyVmFsdWU/OiBhbnkgfVtdID0gYXJyYXk7XG4gICAgaWYgKHRoaXMuc2VhcmNoVGVybSAmJiB0aGlzLnNlYXJjaFRlcm0ubGVuZ3RoICE9PSAwICYmIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKSB7XG4gICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSB0aGlzLnNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIG1hdGNoLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hUZXJtKSA+IC0xIHx8IG1hdGNoLnZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hUZXJtKSA+IC0xO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROZXdNYXRjaGVzKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uKTogdm9pZCB7XG4gICAgLy8gR2V0IG5ldyBtYXRjaGVzXG4gICAgaWYgKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gb3B0aW9uIG5lZWRzIHRvIGhhdmUgZWl0aGVyIGFuIGFycmF5IG9mIHNlY29uZGFyeU9wdGlvbnMgb3IgYSBmdW5jdGlvbiBnZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMnKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pbnRlcm5hbE1hcC5nZXQocHJpbWFyeU9wdGlvbi52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBwcmltYXJ5T3B0aW9uLmdldFNlY29uZGFyeU9wdGlvbnNBc3luYygpLnRoZW4oKGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbnRlcm5hbE1hcC5zZXQocHJpbWFyeU9wdGlvbi52YWx1ZSwgeyB2YWx1ZTogcHJpbWFyeU9wdGlvbi52YWx1ZSwgbGFiZWw6IHByaW1hcnlPcHRpb24ubGFiZWwsIGl0ZW1zIH0pO1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHByaW1hcnlPcHRpb24uY2xlYXJTZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgICAgcHJpbWFyeU9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJQcmltYXJ5T3B0aW9uKHByaW1hcnlPcHRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKS5pdGVtcyk7XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19