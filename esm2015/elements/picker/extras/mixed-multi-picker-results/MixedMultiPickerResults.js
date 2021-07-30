import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { Helpers } from '../../../../utils/Helpers';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoListElement } from '../../../list/List';
import { fromEvent } from 'rxjs';
export class MixedMultiPickerResults extends BasePickerResults {
    constructor(element, renderer, labels, ref) {
        super(element, ref);
        this.renderer = renderer;
        this.labels = labels;
        this.placeholder = '';
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
                .pipe(debounceTime(350), distinctUntilChanged()).subscribe((keyEvent) => {
                this.searchTerm = keyEvent.target['value'];
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
            }
            else {
                this.matches = this.filter(this.internalMap.get(primaryOption.value).items);
                this.ref.markForCheck();
            }
        }
    }
}
MixedMultiPickerResults.decorators = [
    { type: Component, args: [{
                selector: 'mixed-multi-picker-results',
                template: `
    <div class="mixed-multi-picker-groups">
        <novo-list direction="vertical">
            <novo-list-item
                *ngFor="let option of options"
                (click)="selectPrimaryOption(option, $event)"
                [class.active]="selectedPrimaryOption?.value === option.value"
                [attr.data-automation-id]="option.label"
                [class.disabled]="isLoading">
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
        <div class="mixed-multi-picker-input-container" [hidden]="!shouldShowSearchBox(selectedPrimaryOption)" data-automation-id="input-container">
            <input autofocus #input [(ngModel)]="searchTerm" [disabled]="isLoading" data-automation-id="input" [placeholder]="placeholder"/>
            <i class="bhi-search" *ngIf="!searchTerm" [class.disabled]="isLoading" data-automation-id="seach-icon"></i>
            <i class="bhi-times" *ngIf="searchTerm" (click)="clearSearchTerm($event)" [class.disabled]="isLoading" data-automation-id="remove-icon"></i>
        </div>
        <div class="mixed-multi-picker-list-container">
            <novo-list direction="vertical" #list>
                <novo-list-item
                    *ngFor="let match of matches"
                    (click)="selectMatch($event)"
                    [class.active]="match === activeMatch"
                    (mouseenter)="selectActive(match)"
                    [class.disabled]="preselected(match) || isLoading"
                    [attr.data-automation-id]="match.label">
                    <item-content>
                        <span>{{ match.label }}</span>
                    </item-content>
                </novo-list-item>
            </novo-list>
            <div class="mixed-multi-picker-no-results" *ngIf="matches.length === 0 && !isLoading && selectedPrimaryOption" data-automation-id="empty-message">
                {{ labels.groupedMultiPickerEmpty }}
            </div>
            <div class="mixed-multi-picker-loading" *ngIf="isLoading" data-automation-id="loading-message">
                <novo-loading theme="line"></novo-loading>
            </div>
        </div>
    </div>`
            },] }
];
MixedMultiPickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
MixedMultiPickerResults.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['input', { static: true },] }],
    listElement: [{ type: ViewChild, args: ['list',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BpY2tlci9leHRyYXMvbWl4ZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQWlFL0MsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGlCQUFpQjtJQStCMUQsWUFBWSxPQUFtQixFQUFVLFFBQW1CLEVBQVMsTUFBd0IsRUFBRSxHQUFzQjtRQUNqSCxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRGlCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQXZCdEYsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFJeEIsZ0JBQVcsR0FBNkYsSUFBSSxHQUFHLEVBR3BILENBQUM7SUFrQkosQ0FBQztJQWhCRCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsTUFB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b0JBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzVDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQzs7O1lBck1KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E4Q0g7YUFDVjs7O1lBdkVzQyxVQUFVO1lBQWEsU0FBUztZQUs5RCxnQkFBZ0I7WUFMaEIsaUJBQWlCOzs7MkJBeUVyQixTQUFTLFNBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFFbkMsU0FBUyxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uL2Jhc2UtcGlja2VyLXJlc3VsdHMvQmFzZVBpY2tlclJlc3VsdHMnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOb3ZvTGlzdEVsZW1lbnQgfSBmcm9tICcuLi8uLi8uLi9saXN0L0xpc3QnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1peGVkTXVsdGlQaWNrZXJPcHRpb24ge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBzZWNvbmRhcnlPcHRpb25zPzoge1xyXG4gICAgICAgIHZhbHVlOiBzdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IHN0cmluZyxcclxuICAgICAgICBmaWx0ZXJWYWx1ZT86IGFueSxcclxuICAgIH1bXTtcclxuICAgIGdldFNlY29uZGFyeU9wdGlvbnNBc3luYz8oKTogUHJvbWlzZTx7dmFsdWU6IHN0cmluZywgbGFiZWw6IHN0cmluZ31bXT47XHJcbiAgICBzaG93U2VhcmNoT25TZWNvbmRhcnlPcHRpb25zPzogYm9vbGVhbjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWdyb3Vwc1wiPlxyXG4gICAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cclxuICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXHJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFByaW1hcnlPcHRpb24ob3B0aW9uLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwic2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlXCJcclxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWxcIlxyXG4gICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGl0ZW0tY29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICA8aSAqbmdJZj1cIm9wdGlvbi5pY29uQ2xhc3NcIiBbY2xhc3NdPVwib3B0aW9uLmljb25DbGFzc1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsYWJlbFwiPnt7IG9wdGlvbi5sYWJlbCB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPGl0ZW0tZW5kICpuZ0lmPVwib3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhvcHRpb24pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvaXRlbS1lbmQ+XHJcbiAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XHJcbiAgICAgICAgPC9ub3ZvLWxpc3Q+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbWF0Y2hlc1wiIFtoaWRkZW5dPVwiIW9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMoc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItaW5wdXQtY29udGFpbmVyXCIgW2hpZGRlbl09XCIhc2hvdWxkU2hvd1NlYXJjaEJveChzZWxlY3RlZFByaW1hcnlPcHRpb24pXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBhdXRvZm9jdXMgI2lucHV0IFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJpbnB1dFwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiLz5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgKm5nSWY9XCIhc2VhcmNoVGVybVwiIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWFjaC1pY29uXCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiICpuZ0lmPVwic2VhcmNoVGVybVwiIChjbGljayk9XCJjbGVhclNlYXJjaFRlcm0oJGV2ZW50KVwiIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJyZW1vdmUtaWNvblwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWxpc3QtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIiAjbGlzdD5cclxuICAgICAgICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxyXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaCkgfHwgaXNMb2FkaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibWF0Y2gubGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBtYXRjaC5sYWJlbCB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cclxuICAgICAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XHJcbiAgICAgICAgICAgIDwvbm92by1saXN0PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLW5vLXJlc3VsdHNcIiAqbmdJZj1cIm1hdGNoZXMubGVuZ3RoID09PSAwICYmICFpc0xvYWRpbmcgJiYgc2VsZWN0ZWRQcmltYXJ5T3B0aW9uXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiZW1wdHktbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAge3sgbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlckVtcHR5IH19XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImxvYWRpbmctbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5gLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMgZXh0ZW5kcyBCYXNlUGlja2VyUmVzdWx0cyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXHJcbiAgICBwcml2YXRlIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2xpc3QnKVxyXG4gICAgcHJpdmF0ZSBsaXN0RWxlbWVudDogTm92b0xpc3RFbGVtZW50O1xyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZFByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uO1xyXG4gICAgcHVibGljIHNlYXJjaFRlcm06IHN0cmluZztcclxuICAgIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgaW50ZXJuYWxNYXA6IE1hcDxzdHJpbmcsIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfT4gPSBuZXcgTWFwPFxyXG4gICAgICAgIHN0cmluZyxcclxuICAgICAgICB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGl0ZW1zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIH1cclxuICAgID4oKTtcclxuXHJcbiAgICBzZXQgdGVybSh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcikge1xyXG4gICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGb2N1c1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5vcHRpb25zIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIC8vIENsZWFudXBcclxuICAgICAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RQcmltYXJ5T3B0aW9uKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uLCBldmVudD86IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3BcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMubGlzdEVsZW1lbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsVG9wJywgMCk7XHJcbiAgICAgICAgLy8gU2V0IGZvY3VzXHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIC8vIEZpbmQgbmV3IGl0ZW1zXHJcbiAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBwcmltYXJ5T3B0aW9uLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gcHJpbWFyeU9wdGlvbjtcclxuICAgICAgICAvLyBDbGVhclxyXG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIC8vIE5ldyBtYXRjaGVzXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uKSkge1xyXG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8ga2V5Ym9hcmQgZXZlbnRzIGFuZCBkZWJvdW5jZVxyXG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDM1MCksXHJcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICApLnN1YnNjcmliZSgoa2V5RXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IGtleUV2ZW50LnRhcmdldFsndmFsdWUnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdldE5ld01hdGNoZXMocHJpbWFyeU9wdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RBY3RpdmUocHJpbWFyeU9wdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWF0Y2goZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0TWF0Y2goZXZlbnQ/OiBNb3VzZUV2ZW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gU2V0IGZvY3VzXHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5zZWxlY3RNYXRjaChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyU2VhcmNoVGVybShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcclxuICAgICAgICB0aGlzLnNlbGVjdFByaW1hcnlPcHRpb24oeyB2YWx1ZTogdGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24udmFsdWUsIGxhYmVsOiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5sYWJlbCB9KTtcclxuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xyXG4gICAgICAgIHJldHVybiAhIShwcmltYXJ5T3B0aW9uICYmIChwcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMgfHwgcHJpbWFyeU9wdGlvbi5nZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdWxkU2hvd1NlYXJjaEJveChwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xyXG4gICAgICAgIHJldHVybiAhIShwcmltYXJ5T3B0aW9uICYmIHByaW1hcnlPcHRpb24uc2hvd1NlYXJjaE9uU2Vjb25kYXJ5T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyRGF0YSgpOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldCh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi52YWx1ZSkuaXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbHRlcihcclxuICAgICAgICBhcnJheTogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W11cclxuICAgICk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xyXG4gICAgICAgIGxldCBtYXRjaGVzOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXSA9IGFycmF5O1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRlcm0gJiYgdGhpcy5zZWFyY2hUZXJtLmxlbmd0aCAhPT0gMCAmJiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbikge1xyXG4gICAgICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gdGhpcy5zZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2gubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTEgfHwgbWF0Y2gudmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0pID4gLTE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5ld01hdGNoZXMocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pOiB2b2lkIHtcclxuICAgICAgICAvLyBHZXQgbmV3IG1hdGNoZXNcclxuICAgICAgICBpZiAocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XHJcbiAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihwcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpO1xyXG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFwcmltYXJ5T3B0aW9uLmdldFNlY29uZGFyeU9wdGlvbnNBc3luYykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICdBbiBvcHRpb24gbmVlZHMgdG8gaGF2ZSBlaXRoZXIgYW4gYXJyYXkgb2Ygc2Vjb25kYXJ5T3B0aW9ucyBvciBhIGZ1bmN0aW9uIGdldFNlY29uZGFyeU9wdGlvbnNBc3luYycsXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnRlcm5hbE1hcC5nZXQocHJpbWFyeU9wdGlvbi52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKCkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVybmFsTWFwLnNldChwcmltYXJ5T3B0aW9uLnZhbHVlLCB7IHZhbHVlOiBwcmltYXJ5T3B0aW9uLnZhbHVlLCBsYWJlbDogcHJpbWFyeU9wdGlvbi5sYWJlbCwgaXRlbXMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIoaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQocHJpbWFyeU9wdGlvbi52YWx1ZSkuaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19