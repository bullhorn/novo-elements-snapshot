import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NovoListElement } from 'novo-elements/components/list';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/list";
import * as i3 from "novo-elements/components/loading";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "novo-elements/common";
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
    </div>`, isInline: true, styles: [":host{background-color:var(--color-background);max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;padding:10px;border-bottom:none;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid transparent;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:var(--color-selection);border-left-color:var(--color-selection);background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:var(--color-selection)}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:var(--color-selection)!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:var(--border-main);border-left:var(--border-main);border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:var(--border-main)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid var(--color-selection);border-left:1px solid var(--color-selection)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:var(--border-main);flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i2.NovoItemEndElement, selector: "item-end, novo-item-end" }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MixedMultiPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'mixed-multi-picker-results', template: ` <div class="mixed-multi-picker-groups">
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
    </div>`, styles: [":host{background-color:var(--color-background);max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid var(--color-selection);transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;padding:10px;border-bottom:none;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid transparent;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:var(--color-selection);border-left-color:var(--color-selection);background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:var(--color-selection)}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:var(--color-selection)!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:var(--color-selection-overlay)}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:var(--border-main);border-left:var(--border-main);border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:var(--border-main)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid var(--color-selection);border-left:1px solid var(--color-selection)}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:var(--border-main);flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWQtbXVsdGktcGlja2VyLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3BpY2tlci9leHRyYXMvbWl4ZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvbWl4ZWQtbXVsdGktcGlja2VyLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7Ozs7QUFtRi9FLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxpQkFBaUI7SUFnQzVELFlBQVksT0FBbUIsRUFBVSxRQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDbkgsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURtQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUF4QnRGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUk5QixnQkFBVyxHQUE2RixJQUFJLEdBQUcsRUFHcEgsQ0FBQztJQWtCSixDQUFDO0lBaEJELElBQUksSUFBSSxDQUFDLEtBQUs7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QUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7O3FIQXRLVSx1QkFBdUI7eUdBQXZCLHVCQUF1QixvU0EvRHhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNkREOzRGQUVFLHVCQUF1QjtrQkFsRW5DLFNBQVM7K0JBQ0UsNEJBQTRCLFlBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNkREO3dMQUlELFlBQVk7c0JBRG5CLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHNUIsV0FBVztzQkFEbEIsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xpc3RFbGVtZW50IH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2xpc3QnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uL2Jhc2UtcGlja2VyLXJlc3VsdHMvYmFzZS1waWNrZXItcmVzdWx0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1peGVkTXVsdGlQaWNrZXJPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBzZWNvbmRhcnlPcHRpb25zPzoge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBmaWx0ZXJWYWx1ZT86IGFueTtcbiAgfVtdO1xuICBnZXRTZWNvbmRhcnlPcHRpb25zQXN5bmM/KCk6IFByb21pc2U8eyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXT47XG4gIC8vIFRPRE86IFJlZmFjdG9yIHRvIHByZXZlbnQgdGhlIG5lZWQgZm9yIGEgYmVoYXZpb3JTdWJqZWN0IHRvIGFsbG93IHByaW1hcnlPcHRpb24ncyBzZWNvbmRhcnlPcHRpb25zIHRvIGJlIGNsZWFyZWRcbiAgLy8gQ3VycmVudGx5IHNlY29uZGFyeU9wdGlvbnMgY2Fubm90IGJlIGNsZWFyZWQgdmlhIEZpZWxkSW50ZXJhY3Rpb24gQVBJIGFuZCBtdXN0IHVzZSBhIGJlaGF2aW9yIHN1YmplY3QgLSB0aGlzIGluY2x1ZGVzIG1vZGlmeVBpY2tlckNvbmZpZ1xuICBjbGVhclNlY29uZGFyeU9wdGlvbnM/OiBTdWJqZWN0PGFueT47XG4gIHNob3dTZWFyY2hPblNlY29uZGFyeU9wdGlvbnM/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cycsXG4gIHN0eWxlVXJsczogWycuL21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1ncm91cHNcIj5cbiAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UHJpbWFyeU9wdGlvbihvcHRpb24sICRldmVudClcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICA8aSAqbmdJZj1cIm9wdGlvbi5pY29uQ2xhc3NcIiBbY2xhc3NdPVwib3B0aW9uLmljb25DbGFzc1wiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cImxhYmVsXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgIDxpdGVtLWVuZCAqbmdJZj1cIm9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMob3B0aW9uKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1tYXRjaGVzXCIgW2hpZGRlbl09XCIhb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhzZWxlY3RlZFByaW1hcnlPcHRpb24pXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWlucHV0LWNvbnRhaW5lclwiXG4gICAgICAgIFtoaWRkZW5dPVwiIXNob3VsZFNob3dTZWFyY2hCb3goc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0LWNvbnRhaW5lclwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dCBhdXRvZm9jdXMgI2lucHV0IFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIC8+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiICpuZ0lmPVwiIXNlYXJjaFRlcm1cIiBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VhY2gtaWNvblwiPjwvaT5cbiAgICAgICAgPGlcbiAgICAgICAgICBjbGFzcz1cImJoaS10aW1lc1wiXG4gICAgICAgICAgKm5nSWY9XCJzZWFyY2hUZXJtXCJcbiAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWFyY2hUZXJtKCRldmVudClcIlxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInJlbW92ZS1pY29uXCJcbiAgICAgICAgPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgI2xpc3Q+XG4gICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaCkgfHwgaXNMb2FkaW5nXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtYXRjaC5sYWJlbFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgbWF0Y2gubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLW5vLXJlc3VsdHNcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZFByaW1hcnlPcHRpb25cIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LW1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgY29uZmlnLmVtcHR5T3B0aW9uc0xhYmVsID8gY29uZmlnLmVtcHR5T3B0aW9uc0xhYmVsIDogbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlckVtcHR5IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImxvYWRpbmctbWVzc2FnZVwiPlxuICAgICAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMgZXh0ZW5kcyBCYXNlUGlja2VyUmVzdWx0cyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2xpc3QnKVxuICBwcml2YXRlIGxpc3RFbGVtZW50OiBOb3ZvTGlzdEVsZW1lbnQ7XG5cbiAgcHVibGljIHNlbGVjdGVkUHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb247XG4gIHB1YmxpYyBzZWFyY2hUZXJtOiBzdHJpbmc7XG4gIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBlbXB0eU9wdGlvbnNMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBrZXlib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgaW50ZXJuYWxNYXA6IE1hcDxzdHJpbmcsIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfT4gPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH1cbiAgPigpO1xuXG4gIHNldCB0ZXJtKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyKSB7XG4gICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5jb25maWcucGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIC8vIEZvY3VzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcub3B0aW9ucyB8fCBbXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gQ2xlYW51cFxuICAgIGlmICh0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5vcHRpb25zKSB7XG4gICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdFByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24sIGV2ZW50PzogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIC8vIFNjcm9sbCB0byB0b3BcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMubGlzdEVsZW1lbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsVG9wJywgMCk7XG4gICAgLy8gU2V0IGZvY3VzXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIC8vIEZpbmQgbmV3IGl0ZW1zXG4gICAgY29uc3Qga2V5OiBzdHJpbmcgPSBwcmltYXJ5T3B0aW9uLnZhbHVlO1xuICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gcHJpbWFyeU9wdGlvbjtcbiAgICAvLyBDbGVhclxuICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIC8vIE5ldyBtYXRjaGVzXG4gICAgaWYgKHRoaXMub3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uKSkge1xuICAgICAgLy8gU3Vic2NyaWJlIHRvIGtleWJvYXJkIGV2ZW50cyBhbmQgZGVib3VuY2VcbiAgICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2tleXVwJylcbiAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDM1MCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGtleUV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gKGtleUV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEoKTtcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLmdldE5ld01hdGNoZXMocHJpbWFyeU9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0QWN0aXZlKHByaW1hcnlPcHRpb24pO1xuICAgICAgdGhpcy5zZWxlY3RNYXRjaChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdE1hdGNoKGV2ZW50PzogTW91c2VFdmVudCk6IGJvb2xlYW4ge1xuICAgIC8vIFNldCBmb2N1c1xuICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0TWF0Y2goZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU2VhcmNoVGVybShldmVudDogTW91c2VFdmVudCkge1xuICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICB0aGlzLnNlbGVjdFByaW1hcnlPcHRpb24oeyB2YWx1ZTogdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24udmFsdWUsIGxhYmVsOiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5sYWJlbCB9KTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uKSB7XG4gICAgcmV0dXJuICEhKHByaW1hcnlPcHRpb24gJiYgKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucyB8fCBwcmltYXJ5T3B0aW9uLmdldFNlY29uZGFyeU9wdGlvbnNBc3luYykpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dTZWFyY2hCb3gocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pIHtcbiAgICByZXR1cm4gISEocHJpbWFyeU9wdGlvbiAmJiBwcmltYXJ5T3B0aW9uLnNob3dTZWFyY2hPblNlY29uZGFyeU9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUHJpbWFyeU9wdGlvbihwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xuICAgIGlmICh0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKSkge1xuICAgICAgaWYgKHByaW1hcnlPcHRpb24udmFsdWUgPT09IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU1hdGNoID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW50ZXJuYWxNYXAuZGVsZXRlKHByaW1hcnlPcHRpb24udmFsdWUpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyRGF0YSgpOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldCh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi52YWx1ZSkuaXRlbXMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGZpbHRlcihhcnJheTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10pOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcbiAgICBsZXQgbWF0Y2hlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10gPSBhcnJheTtcbiAgICBpZiAodGhpcy5zZWFyY2hUZXJtICYmIHRoaXMuc2VhcmNoVGVybS5sZW5ndGggIT09IDAgJiYgdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcbiAgICAgIG1hdGNoZXMgPSBtYXRjaGVzLmZpbHRlcigobWF0Y2gpID0+IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbWF0Y2gubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTEgfHwgbWF0Y2gudmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBwcml2YXRlIGdldE5ld01hdGNoZXMocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pOiB2b2lkIHtcbiAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICBpZiAocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihwcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpO1xuICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghcHJpbWFyeU9wdGlvbi5nZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBvcHRpb24gbmVlZHMgdG8gaGF2ZSBlaXRoZXIgYW4gYXJyYXkgb2Ygc2Vjb25kYXJ5T3B0aW9ucyBvciBhIGZ1bmN0aW9uIGdldFNlY29uZGFyeU9wdGlvbnNBc3luYycpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKCkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcbiAgICAgICAgICB0aGlzLmludGVybmFsTWFwLnNldChwcmltYXJ5T3B0aW9uLnZhbHVlLCB7IHZhbHVlOiBwcmltYXJ5T3B0aW9uLnZhbHVlLCBsYWJlbDogcHJpbWFyeU9wdGlvbi5sYWJlbCwgaXRlbXMgfSk7XG4gICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocHJpbWFyeU9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMpIHtcbiAgICAgICAgICBwcmltYXJ5T3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhclByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpLml0ZW1zKTtcbiAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=