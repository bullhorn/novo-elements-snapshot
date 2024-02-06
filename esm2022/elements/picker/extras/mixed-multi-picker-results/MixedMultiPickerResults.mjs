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
export class MixedMultiPickerResults extends BasePickerResults {
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
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.placeholder = '';
        this.emptyOptionsLabel = '';
        this.internalMap = new Map();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MixedMultiPickerResults, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: MixedMultiPickerResults, selector: "mixed-multi-picker-results", viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "listElement", first: true, predicate: ["list"], descendants: true }], usesInheritance: true, ngImport: i0, template: ` <div class="mixed-multi-picker-groups">
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
    </div>`, isInline: true, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid #ffffff;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e0ebf9}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:#4a89dc!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:#e0ebf9}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i4.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i5.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { kind: "component", type: i6.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i6.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i6.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { kind: "component", type: i6.NovoItemEndElement, selector: "item-end, novo-item-end" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MixedMultiPickerResults, decorators: [{
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
    </div>`, styles: [":host{background-color:#fff;max-height:300px;padding:0;margin:0;box-shadow:0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;border:1px solid #4a89dc;transform:translateY(0);transition:all .15s cubic-bezier(.35,0,.25,1);display:flex;flex-direction:row}:host novo-list-item{cursor:pointer;flex-shrink:0}:host novo-list-item.disabled{pointer-events:none;opacity:.75}:host>.mixed-multi-picker-groups{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-groups novo-list{overflow:auto}:host>.mixed-multi-picker-groups novo-list-item{color:#999;border-left:3px solid #ffffff;transition:background-color .25s}:host>.mixed-multi-picker-groups novo-list-item>div{width:100%}:host>.mixed-multi-picker-groups novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-groups novo-list-item .list-item{justify-content:center}:host>.mixed-multi-picker-groups novo-list-item item-end{color:#999}:host>.mixed-multi-picker-groups novo-list-item.active{color:#4a89dc;border-left-color:#4a89dc;background-color:#e0ebf9}:host>.mixed-multi-picker-groups novo-list-item.active item-end{color:#4a89dc}:host>.mixed-multi-picker-groups novo-list-item.active .list-item>item-content>*{color:#4a89dc!important}:host>.mixed-multi-picker-groups novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-groups novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches{flex:1;display:flex;flex-direction:column}:host>.mixed-multi-picker-matches novo-list{overflow:auto}:host>.mixed-multi-picker-matches novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host>.mixed-multi-picker-matches novo-list novo-list-item>div{width:100%}:host>.mixed-multi-picker-matches novo-list novo-list-item.active{background-color:#e0ebf9}:host>.mixed-multi-picker-matches novo-list novo-list-item:hover{background-color:#f1f6fc}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content{flex-flow:row wrap}:host>.mixed-multi-picker-matches novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container{position:relative}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input{font-size:1em;padding:.95em;background:transparent!important;border:none;border-bottom:1px solid #f7f7f7;border-left:1px solid #f7f7f7;border-radius:0;outline:none;width:100%;margin:0;box-shadow:none;transition:all .3s;color:#26282b}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:hover{border-bottom:1px solid #f7f7f7}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input:focus{border-bottom:1px solid #4a89dc;border-left:1px solid #4a89dc}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container input[disabled]{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{position:absolute;right:10px;top:12px;font-size:1.2rem}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-search.disabled,:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times.disabled{pointer-events:none;opacity:.4}:host>.mixed-multi-picker-matches .mixed-multi-picker-input-container i.bhi-times{cursor:pointer}:host>.mixed-multi-picker-matches .mixed-multi-picker-list-container{border-left:1px solid #f7f7f7;flex:1;display:flex;flex-direction:column;overflow:auto}:host>.mixed-multi-picker-matches .mixed-multi-picker-no-primary,:host>.mixed-multi-picker-matches .mixed-multi-picker-no-results,:host>.mixed-multi-picker-matches .mixed-multi-picker-loading{flex:1;justify-content:center;align-items:center;display:flex;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], listElement: [{
                type: ViewChild,
                args: ['list']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9waWNrZXIvZXh0cmFzL21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzL01peGVkTXVsdGlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUcsT0FBTyxFQUFFLFNBQVMsRUFBeUIsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7Ozs7O0FBbUY3RSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCO0lBa0I1RCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQzVDO1FBQ0QsUUFBUTtRQUNSLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUks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QUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDekI7U0FDRjtJQUNILENBQUM7K0dBdEtVLHVCQUF1QjttR0FBdkIsdUJBQXVCLG9TQWhFeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E2REQ7OzRGQUdFLHVCQUF1QjtrQkFsRW5DLFNBQVM7K0JBQ0UsNEJBQTRCLFlBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNkREO3dMQUtELFlBQVk7c0JBRG5CLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHNUIsV0FBVztzQkFEbEIsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBOb3ZvTGlzdEVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2xpc3QnO1xuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbiB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHNlY29uZGFyeU9wdGlvbnM/OiB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGZpbHRlclZhbHVlPzogYW55O1xuICB9W107XG4gIGdldFNlY29uZGFyeU9wdGlvbnNBc3luYz8oKTogUHJvbWlzZTx7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdPjtcbiAgLy8gVE9ETzogUmVmYWN0b3IgdG8gcHJldmVudCB0aGUgbmVlZCBmb3IgYSBiZWhhdmlvclN1YmplY3QgdG8gYWxsb3cgcHJpbWFyeU9wdGlvbidzIHNlY29uZGFyeU9wdGlvbnMgdG8gYmUgY2xlYXJlZFxuICAvLyBDdXJyZW50bHkgc2Vjb25kYXJ5T3B0aW9ucyBjYW5ub3QgYmUgY2xlYXJlZCB2aWEgRmllbGRJbnRlcmFjdGlvbiBBUEkgYW5kIG11c3QgdXNlIGEgYmVoYXZpb3Igc3ViamVjdCAtIHRoaXMgaW5jbHVkZXMgbW9kaWZ5UGlja2VyQ29uZmlnXG4gIGNsZWFyU2Vjb25kYXJ5T3B0aW9ucz86IFN1YmplY3Q8YW55PjtcbiAgc2hvd1NlYXJjaE9uU2Vjb25kYXJ5T3B0aW9ucz86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzJyxcbiAgdGVtcGxhdGU6IGAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1ncm91cHNcIj5cbiAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UHJpbWFyeU9wdGlvbihvcHRpb24sICRldmVudClcIlxuICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICA8aSAqbmdJZj1cIm9wdGlvbi5pY29uQ2xhc3NcIiBbY2xhc3NdPVwib3B0aW9uLmljb25DbGFzc1wiPjwvaT5cbiAgICAgICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cImxhYmVsXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgIDxpdGVtLWVuZCAqbmdJZj1cIm9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMob3B0aW9uKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1tYXRjaGVzXCIgW2hpZGRlbl09XCIhb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhzZWxlY3RlZFByaW1hcnlPcHRpb24pXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWlucHV0LWNvbnRhaW5lclwiXG4gICAgICAgIFtoaWRkZW5dPVwiIXNob3VsZFNob3dTZWFyY2hCb3goc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0LWNvbnRhaW5lclwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dCBhdXRvZm9jdXMgI2lucHV0IFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIC8+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXNlYXJjaFwiICpuZ0lmPVwiIXNlYXJjaFRlcm1cIiBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwic2VhY2gtaWNvblwiPjwvaT5cbiAgICAgICAgPGlcbiAgICAgICAgICBjbGFzcz1cImJoaS10aW1lc1wiXG4gICAgICAgICAgKm5nSWY9XCJzZWFyY2hUZXJtXCJcbiAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWFyY2hUZXJtKCRldmVudClcIlxuICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInJlbW92ZS1pY29uXCJcbiAgICAgICAgPjwvaT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgI2xpc3Q+XG4gICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaCkgfHwgaXNMb2FkaW5nXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtYXRjaC5sYWJlbFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgbWF0Y2gubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLW5vLXJlc3VsdHNcIlxuICAgICAgICAgICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZFByaW1hcnlPcHRpb25cIlxuICAgICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LW1lc3NhZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgY29uZmlnLmVtcHR5T3B0aW9uc0xhYmVsID8gY29uZmlnLmVtcHR5T3B0aW9uc0xhYmVsIDogbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlckVtcHR5IH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImxvYWRpbmctbWVzc2FnZVwiPlxuICAgICAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YCxcbiAgc3R5bGVVcmxzOiBbJy4vTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBNaXhlZE11bHRpUGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbGlzdCcpXG4gIHByaXZhdGUgbGlzdEVsZW1lbnQ6IE5vdm9MaXN0RWxlbWVudDtcblxuICBwdWJsaWMgc2VsZWN0ZWRQcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbjtcbiAgcHVibGljIHNlYXJjaFRlcm06IHN0cmluZztcbiAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGVtcHR5T3B0aW9uc0xhYmVsOiBzdHJpbmcgPSAnJztcblxuICBwcml2YXRlIGtleWJvYXJkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBpbnRlcm5hbE1hcDogTWFwPHN0cmluZywgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9PiA9IG5ldyBNYXA8XG4gICAgc3RyaW5nLFxuICAgIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfVxuICA+KCk7XG5cbiAgc2V0IHRlcm0odmFsdWUpIHtcbiAgICBpZiAodGhpcy5jb25maWcucGxhY2Vob2xkZXIpIHtcbiAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgLy8gRm9jdXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBvcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5vcHRpb25zIHx8IFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBDbGVhbnVwXG4gICAgaWYgKHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY29uZmlnLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb24uY2xlYXJTZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0UHJpbWFyeU9wdGlvbihwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbiwgZXZlbnQ/OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgLy8gU2Nyb2xsIHRvIHRvcFxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5saXN0RWxlbWVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxUb3AnLCAwKTtcbiAgICAvLyBTZXQgZm9jdXNcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgLy8gRmluZCBuZXcgaXRlbXNcbiAgICBjb25zdCBrZXk6IHN0cmluZyA9IHByaW1hcnlPcHRpb24udmFsdWU7XG4gICAgdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24gPSBwcmltYXJ5T3B0aW9uO1xuICAgIC8vIENsZWFyXG4gICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgLy8gTmV3IG1hdGNoZXNcbiAgICBpZiAodGhpcy5vcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKHByaW1hcnlPcHRpb24pKSB7XG4gICAgICAvLyBTdWJzY3JpYmUgdG8ga2V5Ym9hcmQgZXZlbnRzIGFuZCBkZWJvdW5jZVxuICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5dXAnKVxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzUwKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgICAgLnN1YnNjcmliZSgoa2V5RXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSAoa2V5RXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyRGF0YSgpO1xuICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0TmV3TWF0Y2hlcyhwcmltYXJ5T3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RBY3RpdmUocHJpbWFyeU9wdGlvbik7XG4gICAgICB0aGlzLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0TWF0Y2goZXZlbnQ/OiBNb3VzZUV2ZW50KTogYm9vbGVhbiB7XG4gICAgLy8gU2V0IGZvY3VzXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHJldHVybiBzdXBlci5zZWxlY3RNYXRjaChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJTZWFyY2hUZXJtKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgIHRoaXMuc2VsZWN0UHJpbWFyeU9wdGlvbih7IHZhbHVlOiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi52YWx1ZSwgbGFiZWw6IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLmxhYmVsIH0pO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIG9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pIHtcbiAgICByZXR1cm4gISEocHJpbWFyeU9wdGlvbiAmJiAocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zIHx8IHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKSk7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd1NlYXJjaEJveChwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xuICAgIHJldHVybiAhIShwcmltYXJ5T3B0aW9uICYmIHByaW1hcnlPcHRpb24uc2hvd1NlYXJjaE9uU2Vjb25kYXJ5T3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJQcmltYXJ5T3B0aW9uKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpKSB7XG4gICAgICBpZiAocHJpbWFyeU9wdGlvbi52YWx1ZSA9PT0gdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24/LnZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlTWF0Y2ggPSBudWxsO1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24gPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy5pbnRlcm5hbE1hcC5kZWxldGUocHJpbWFyeU9wdGlvbi52YWx1ZSk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJEYXRhKCk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbikge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnZhbHVlKS5pdGVtcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyKGFycmF5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXSk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgIGxldCBtYXRjaGVzOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXSA9IGFycmF5O1xuICAgIGlmICh0aGlzLnNlYXJjaFRlcm0gJiYgdGhpcy5zZWFyY2hUZXJtLmxlbmd0aCAhPT0gMCAmJiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbikge1xuICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuZmlsdGVyKChtYXRjaCkgPT4ge1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBtYXRjaC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMSB8fCBtYXRjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmV3TWF0Y2hlcyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbik6IHZvaWQge1xuICAgIC8vIEdldCBuZXcgbWF0Y2hlc1xuICAgIGlmIChwcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpIHtcbiAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucyk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFwcmltYXJ5T3B0aW9uLmdldFNlY29uZGFyeU9wdGlvbnNBc3luYykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIG9wdGlvbiBuZWVkcyB0byBoYXZlIGVpdGhlciBhbiBhcnJheSBvZiBzZWNvbmRhcnlPcHRpb25zIG9yIGEgZnVuY3Rpb24gZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgcHJpbWFyeU9wdGlvbi5nZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMoKS50aGVuKChpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSkgPT4ge1xuICAgICAgICAgIHRoaXMuaW50ZXJuYWxNYXAuc2V0KHByaW1hcnlPcHRpb24udmFsdWUsIHsgdmFsdWU6IHByaW1hcnlPcHRpb24udmFsdWUsIGxhYmVsOiBwcmltYXJ5T3B0aW9uLmxhYmVsLCBpdGVtcyB9KTtcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihpdGVtcyk7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwcmltYXJ5T3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgICAgIHByaW1hcnlPcHRpb24uY2xlYXJTZWNvbmRhcnlPcHRpb25zLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUHJpbWFyeU9wdGlvbihwcmltYXJ5T3B0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQocHJpbWFyeU9wdGlvbi52YWx1ZSkuaXRlbXMpO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==