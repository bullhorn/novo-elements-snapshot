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
import * as i3 from "../../../loading/Loading";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "../../../common/directives/theme.directive";
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
    </div>`, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i2.NovoItemEndElement, selector: "item-end, novo-item-end" }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size", "showLoadMessage"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9waWNrZXIvZXh0cmFzL21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzL01peGVkTXVsdGlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLFNBQVMsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7Ozs7O0FBa0Y3RSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCO0lBZ0M1RCxZQUFZLE9BQW1CLEVBQVUsUUFBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ25ILEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeEJ0RixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFJOUIsZ0JBQVcsR0FBNkYsSUFBSSxHQUFHLEVBR3BILENBQUM7SUFrQkosQ0FBQztJQWhCRCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQzVDO1FBQ0QsUUFBUTtRQUNSLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBTU0sV0FBVztRQUNoQixVQUFVO1FBQ1YsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxNQUFNLENBQUMscUJBQXFCLEVBQUU7b0JBQ2hDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDNUM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLG1CQUFtQixDQUFDLGFBQXNDLEVBQUUsS0FBa0I7UUFDbkYsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEYsWUFBWTtRQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLGlCQUFpQjtRQUNqQixNQUFNLEdBQUcsR0FBVyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxhQUFhLENBQUM7UUFDM0MsUUFBUTtRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsY0FBYztRQUNkLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2pELDRDQUE0QztZQUM1QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztpQkFDNUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO2lCQUMvQyxTQUFTLENBQUMsQ0FBQyxRQUF1QixFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUksUUFBUSxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTSxXQUFXLENBQUMsS0FBa0I7UUFDbkMsWUFBWTtRQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sZUFBZSxDQUFDLEtBQWlCO1FBQ3RDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLHlCQUF5QixDQUFDLGFBQXNDO1FBQ3JFLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixJQUFJLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVNLG1CQUFtQixDQUFDLGFBQXNDO1FBQy9ELE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxhQUFzQztRQUM5RCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLHFCQUFxQixFQUFFLEtBQUssRUFBRTtnQkFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFO2dCQUMvQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsRjtTQUNGO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU8sTUFBTSxDQUFDLEtBQTREO1FBQ3pFLElBQUksT0FBTyxHQUEwRCxLQUFLLENBQUM7UUFDM0UsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDakYsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVPLGFBQWEsQ0FBQyxhQUFzQztRQUMxRCxrQkFBa0I7UUFDbEIsSUFBSSxhQUFhLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLEVBQUU7Z0JBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0dBQW9HLENBQUMsQ0FBQzthQUN2SDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixhQUFhLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUF5QyxFQUFFLEVBQUU7b0JBQzFGLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUM3RyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMxQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtvQkFDdkMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDekMsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3pCO1NBQ0Y7SUFDSCxDQUFDOztxSEF0S1UsdUJBQXVCO3lHQUF2Qix1QkFBdUIsb1NBL0R4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTZERDs0RkFFRSx1QkFBdUI7a0JBakVuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQTZERDtpQkFDVjt3TEFHUyxZQUFZO3NCQURuQixTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRzVCLFdBQVc7c0JBRGxCLFNBQVM7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTGlzdEVsZW1lbnQgfSBmcm9tICcuLi8uLi8uLi9saXN0L0xpc3QnO1xuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbiB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHNlY29uZGFyeU9wdGlvbnM/OiB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGZpbHRlclZhbHVlPzogYW55O1xuICB9W107XG4gIGdldFNlY29uZGFyeU9wdGlvbnNBc3luYz8oKTogUHJvbWlzZTx7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdPjtcbiAgLy8gVE9ETzogUmVmYWN0b3IgdG8gcHJldmVudCB0aGUgbmVlZCBmb3IgYSBiZWhhdmlvclN1YmplY3QgdG8gYWxsb3cgcHJpbWFyeU9wdGlvbidzIHNlY29uZGFyeU9wdGlvbnMgdG8gYmUgY2xlYXJlZFxuICAvLyBDdXJyZW50bHkgc2Vjb25kYXJ5T3B0aW9ucyBjYW5ub3QgYmUgY2xlYXJlZCB2aWEgRmllbGRJbnRlcmFjdGlvbiBBUEkgYW5kIG11c3QgdXNlIGEgYmVoYXZpb3Igc3ViamVjdCAtIHRoaXMgaW5jbHVkZXMgbW9kaWZ5UGlja2VyQ29uZmlnXG4gIGNsZWFyU2Vjb25kYXJ5T3B0aW9ucz86IFN1YmplY3Q8YW55PjtcbiAgc2hvd1NlYXJjaE9uU2Vjb25kYXJ5T3B0aW9ucz86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzJyxcbiAgdGVtcGxhdGU6IGAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1ncm91cHNcIj5cbiAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UHJpbWFyeU9wdGlvbihvcHRpb24sICRldmVudClcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICA8aSAqbmdJZj1cIm9wdGlvbi5pY29uQ2xhc3NcIiBbY2xhc3NdPVwib3B0aW9uLmljb25DbGFzc1wiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cImxhYmVsXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgIDxpdGVtLWVuZCAqbmdJZj1cIm9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMob3B0aW9uKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1tYXRjaGVzXCIgW2hpZGRlbl09XCIhb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhzZWxlY3RlZFByaW1hcnlPcHRpb24pXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWlucHV0LWNvbnRhaW5lclwiXG4gICAgICAgIFtoaWRkZW5dPVwiIXNob3VsZFNob3dTZWFyY2hCb3goc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0LWNvbnRhaW5lclwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dCBhdXRvZm9jdXMgI2lucHV0IFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIC8+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiICpuZ0lmPVwiIXNlYXJjaFRlcm1cIiBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VhY2gtaWNvblwiPjwvaT5cbiAgICAgICAgPGlcbiAgICAgICAgICBjbGFzcz1cImJoaS10aW1lc1wiXG4gICAgICAgICAgKm5nSWY9XCJzZWFyY2hUZXJtXCJcbiAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWFyY2hUZXJtKCRldmVudClcIlxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInJlbW92ZS1pY29uXCJcbiAgICAgICAgPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgI2xpc3Q+XG4gICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaCkgfHwgaXNMb2FkaW5nXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtYXRjaC5sYWJlbFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgbWF0Y2gubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLW5vLXJlc3VsdHNcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZFByaW1hcnlPcHRpb25cIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LW1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgY29uZmlnLmVtcHR5T3B0aW9uc0xhYmVsID8gY29uZmlnLmVtcHR5T3B0aW9uc0xhYmVsIDogbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlckVtcHR5IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImxvYWRpbmctbWVzc2FnZVwiPlxuICAgICAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMgZXh0ZW5kcyBCYXNlUGlja2VyUmVzdWx0cyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2xpc3QnKVxuICBwcml2YXRlIGxpc3RFbGVtZW50OiBOb3ZvTGlzdEVsZW1lbnQ7XG5cbiAgcHVibGljIHNlbGVjdGVkUHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb247XG4gIHB1YmxpYyBzZWFyY2hUZXJtOiBzdHJpbmc7XG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBlbXB0eU9wdGlvbnNMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBrZXlib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgaW50ZXJuYWxNYXA6IE1hcDxzdHJpbmcsIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfT4gPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH1cbiAgPigpO1xuXG4gIHNldCB0ZXJtKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5jb25maWcucGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIC8vIEZvY3VzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcub3B0aW9ucyB8fCBbXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gQ2xlYW51cFxuICAgIGlmICh0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5vcHRpb25zKSB7XG4gICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdFByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24sIGV2ZW50PzogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIC8vIFNjcm9sbCB0byB0b3BcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMubGlzdEVsZW1lbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsVG9wJywgMCk7XG4gICAgLy8gU2V0IGZvY3VzXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIC8vIEZpbmQgbmV3IGl0ZW1zXG4gICAgY29uc3Qga2V5OiBzdHJpbmcgPSBwcmltYXJ5T3B0aW9uLnZhbHVlO1xuICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gcHJpbWFyeU9wdGlvbjtcbiAgICAvLyBDbGVhclxuICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIC8vIE5ldyBtYXRjaGVzXG4gICAgaWYgKHRoaXMub3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uKSkge1xuICAgICAgLy8gU3Vic2NyaWJlIHRvIGtleWJvYXJkIGV2ZW50cyBhbmQgZGVib3VuY2VcbiAgICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleXVwJylcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDM1MCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGtleUV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gKGtleUV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEoKTtcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmdldE5ld01hdGNoZXMocHJpbWFyeU9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0QWN0aXZlKHByaW1hcnlPcHRpb24pO1xuICAgICAgdGhpcy5zZWxlY3RNYXRjaChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdE1hdGNoKGV2ZW50PzogTW91c2VFdmVudCk6IGJvb2xlYW4ge1xuICAgIC8vIFNldCBmb2N1c1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0TWF0Y2goZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU2VhcmNoVGVybShldmVudDogTW91c2VFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICB0aGlzLnNlbGVjdFByaW1hcnlPcHRpb24oeyB2YWx1ZTogdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24udmFsdWUsIGxhYmVsOiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5sYWJlbCB9KTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uKSB7XG4gICAgcmV0dXJuICEhKHByaW1hcnlPcHRpb24gJiYgKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucyB8fCBwcmltYXJ5T3B0aW9uLmdldFNlY29uZGFyeU9wdGlvbnNBc3luYykpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dTZWFyY2hCb3gocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pIHtcbiAgICByZXR1cm4gISEocHJpbWFyeU9wdGlvbiAmJiBwcmltYXJ5T3B0aW9uLnNob3dTZWFyY2hPblNlY29uZGFyeU9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUHJpbWFyeU9wdGlvbihwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xuICAgIGlmICh0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKSkge1xuICAgICAgaWYgKHByaW1hcnlPcHRpb24udmFsdWUgPT09IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU1hdGNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW50ZXJuYWxNYXAuZGVsZXRlKHByaW1hcnlPcHRpb24udmFsdWUpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyRGF0YSgpOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldCh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi52YWx1ZSkuaXRlbXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGZpbHRlcihhcnJheTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10pOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBsZXQgbWF0Y2hlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10gPSBhcnJheTtcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtICYmIHRoaXMuc2VhcmNoVGVybS5sZW5ndGggIT09IDAgJiYgdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcbiAgICAgIG1hdGNoZXMgPSBtYXRjaGVzLmZpbHRlcigobWF0Y2gpID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbWF0Y2gubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTEgfHwgbWF0Y2gudmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBwcml2YXRlIGdldE5ld01hdGNoZXMocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pOiB2b2lkIHtcbiAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICBpZiAocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihwcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghcHJpbWFyeU9wdGlvbi5nZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBvcHRpb24gbmVlZHMgdG8gaGF2ZSBlaXRoZXIgYW4gYXJyYXkgb2Ygc2Vjb25kYXJ5T3B0aW9ucyBvciBhIGZ1bmN0aW9uIGdldFNlY29uZGFyeU9wdGlvbnNBc3luYycpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKCkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcbiAgICAgICAgICB0aGlzLmludGVybmFsTWFwLnNldChwcmltYXJ5T3B0aW9uLnZhbHVlLCB7IHZhbHVlOiBwcmltYXJ5T3B0aW9uLnZhbHVlLCBsYWJlbDogcHJpbWFyeU9wdGlvbi5sYWJlbCwgaXRlbXMgfSk7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocHJpbWFyeU9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMpIHtcbiAgICAgICAgICBwcmltYXJ5T3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhclByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpLml0ZW1zKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=