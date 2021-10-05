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
            this.config.options.forEach(option => {
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
    clearPrimaryOption(primaryOption) {
        var _a;
        if (this.internalMap.get(primaryOption.value)) {
            if (primaryOption.value === ((_a = this.selectedPrimaryOption) === null || _a === void 0 ? void 0 : _a.value)) {
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
                {{ config.emptyOptionsLabel ? config.emptyOptionsLabel : labels.groupedMultiPickerEmpty }}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcGlja2VyL2V4dHJhcy9taXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9NaXhlZE11bHRpUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBVyxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBb0V4RCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCO0lBZ0MxRCxZQUFZLE9BQW1CLEVBQVUsUUFBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ2pILEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEaUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBeEJ0RixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFJOUIsZ0JBQVcsR0FBNkYsSUFBSSxHQUFHLEVBR3BILENBQUM7SUFrQkosQ0FBQztJQWhCRCxJ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QyxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDM0I7U0FDSjtJQUNMLENBQUM7OztZQTlOSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBOENIO2FBQ1Y7OztZQTFFc0MsVUFBVTtZQUFhLFNBQVM7WUFLOUQsZ0JBQWdCO1lBTGhCLGlCQUFpQjs7OzJCQTRFckIsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MEJBRW5DLFNBQVMsU0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b0xpc3RFbGVtZW50IH0gZnJvbSAnLi4vLi4vLi4vbGlzdC9MaXN0JztcbmltcG9ydCB7IFN1YmplY3QsIGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbiB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHNlY29uZGFyeU9wdGlvbnM/OiB7XG4gICAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgICAgIGxhYmVsOiBzdHJpbmcsXG4gICAgICAgIGZpbHRlclZhbHVlPzogYW55LFxuICAgIH1bXTtcbiAgICBnZXRTZWNvbmRhcnlPcHRpb25zQXN5bmM/KCk6IFByb21pc2U8e3ZhbHVlOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmd9W10+O1xuICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIHByZXZlbnQgdGhlIG5lZWQgZm9yIGEgYmVoYXZpb3JTdWJqZWN0IHRvIGFsbG93IHByaW1hcnlPcHRpb24ncyBzZWNvbmRhcnlPcHRpb25zIHRvIGJlIGNsZWFyZWRcbiAgICAvLyBDdXJyZW50bHkgc2Vjb25kYXJ5T3B0aW9ucyBjYW5ub3QgYmUgY2xlYXJlZCB2aWEgRmllbGRJbnRlcmFjdGlvbiBBUEkgYW5kIG11c3QgdXNlIGEgYmVoYXZpb3Igc3ViamVjdCAtIHRoaXMgaW5jbHVkZXMgbW9kaWZ5UGlja2VyQ29uZmlnXG4gICAgY2xlYXJTZWNvbmRhcnlPcHRpb25zPzogU3ViamVjdDxhbnk+O1xuICAgIHNob3dTZWFyY2hPblNlY29uZGFyeU9wdGlvbnM/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItZ3JvdXBzXCI+XG4gICAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFByaW1hcnlPcHRpb24ob3B0aW9uLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdGVkUHJpbWFyeU9wdGlvbj8udmFsdWUgPT09IG9wdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbFwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxpICpuZ0lmPVwib3B0aW9uLmljb25DbGFzc1wiIFtjbGFzc109XCJvcHRpb24uaWNvbkNsYXNzXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsYWJlbFwiPnt7IG9wdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgICAgICAgICA8aXRlbS1lbmQgKm5nSWY9XCJvcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKG9wdGlvbilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktbmV4dFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2l0ZW0tZW5kPlxuICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgPC9ub3ZvLWxpc3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1tYXRjaGVzXCIgW2hpZGRlbl09XCIhb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhzZWxlY3RlZFByaW1hcnlPcHRpb24pXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItaW5wdXQtY29udGFpbmVyXCIgW2hpZGRlbl09XCIhc2hvdWxkU2hvd1NlYXJjaEJveChzZWxlY3RlZFByaW1hcnlPcHRpb24pXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW5wdXQgYXV0b2ZvY3VzICNpbnB1dCBbKG5nTW9kZWwpXT1cInNlYXJjaFRlcm1cIiBbZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwiaW5wdXRcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIi8+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1zZWFyY2hcIiAqbmdJZj1cIiFzZWFyY2hUZXJtXCIgW2NsYXNzLmRpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cInNlYWNoLWljb25cIj48L2k+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS10aW1lc1wiICpuZ0lmPVwic2VhcmNoVGVybVwiIChjbGljayk9XCJjbGVhclNlYXJjaFRlcm0oJGV2ZW50KVwiIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJyZW1vdmUtaWNvblwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIiAjbGlzdD5cbiAgICAgICAgICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWF0Y2ggPT09IGFjdGl2ZU1hdGNoXCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaCkgfHwgaXNMb2FkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm1hdGNoLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBtYXRjaC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgICAgICAgIDwvbm92by1saXN0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1uby1yZXN1bHRzXCIgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA9PT0gMCAmJiAhaXNMb2FkaW5nICYmIHNlbGVjdGVkUHJpbWFyeU9wdGlvblwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImVtcHR5LW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICB7eyBjb25maWcuZW1wdHlPcHRpb25zTGFiZWwgPyBjb25maWcuZW1wdHlPcHRpb25zTGFiZWwgOiBsYWJlbHMuZ3JvdXBlZE11bHRpUGlja2VyRW1wdHkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1peGVkLW11bHRpLXBpY2tlci1sb2FkaW5nXCIgKm5nSWY9XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJsb2FkaW5nLW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmAsXG59KVxuZXhwb3J0IGNsYXNzIE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwcml2YXRlIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdsaXN0JylcbiAgICBwcml2YXRlIGxpc3RFbGVtZW50OiBOb3ZvTGlzdEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRQcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbjtcbiAgICBwdWJsaWMgc2VhcmNoVGVybTogc3RyaW5nO1xuICAgIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gICAgcHVibGljIGVtcHR5T3B0aW9uc0xhYmVsOiBzdHJpbmcgPSAnJztcblxuICAgIHByaXZhdGUga2V5Ym9hcmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgaW50ZXJuYWxNYXA6IE1hcDxzdHJpbmcsIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfT4gPSBuZXcgTWFwPFxuICAgICAgICBzdHJpbmcsXG4gICAgICAgIHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10gfVxuICAgID4oKTtcblxuICAgIHNldCB0ZXJtKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmNvbmZpZy5wbGFjZWhvbGRlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBGb2N1c1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcub3B0aW9ucyB8fCBbXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIENsZWFudXBcbiAgICAgICAgaWYgKHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5jb25maWcub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5jbGVhclNlY29uZGFyeU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLmNsZWFyU2Vjb25kYXJ5T3B0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdFByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24sIGV2ZW50PzogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3BcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmxpc3RFbGVtZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbFRvcCcsIDApO1xuICAgICAgICAvLyBTZXQgZm9jdXNcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAvLyBGaW5kIG5ldyBpdGVtc1xuICAgICAgICBjb25zdCBrZXk6IHN0cmluZyA9IHByaW1hcnlPcHRpb24udmFsdWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gcHJpbWFyeU9wdGlvbjtcbiAgICAgICAgLy8gQ2xlYXJcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAvLyBOZXcgbWF0Y2hlc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKHByaW1hcnlPcHRpb24pKSB7XG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8ga2V5Ym9hcmQgZXZlbnRzIGFuZCBkZWJvdW5jZVxuICAgICAgICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5dXAnKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDM1MCksXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKChrZXlFdmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IGtleUV2ZW50LnRhcmdldFsndmFsdWUnXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5nZXROZXdNYXRjaGVzKHByaW1hcnlPcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBY3RpdmUocHJpbWFyeU9wdGlvbik7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RNYXRjaChldmVudD86IE1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gU2V0IGZvY3VzXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJTZWFyY2hUZXJtKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIHRoaXMuc2VsZWN0UHJpbWFyeU9wdGlvbih7IHZhbHVlOiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi52YWx1ZSwgbGFiZWw6IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLmxhYmVsIH0pO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xuICAgICAgICByZXR1cm4gISEocHJpbWFyeU9wdGlvbiAmJiAocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zIHx8IHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3VsZFNob3dTZWFyY2hCb3gocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pIHtcbiAgICAgICAgcmV0dXJuICEhKHByaW1hcnlPcHRpb24gJiYgcHJpbWFyeU9wdGlvbi5zaG93U2VhcmNoT25TZWNvbmRhcnlPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJQcmltYXJ5T3B0aW9uKHByaW1hcnlPcHRpb246IElNaXhlZE11bHRpUGlja2VyT3B0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHByaW1hcnlPcHRpb24udmFsdWUgPT09IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uPy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWF0Y2ggPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxNYXAuZGVsZXRlKHByaW1hcnlPcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhKCk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24udmFsdWUpLml0ZW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaWx0ZXIoXG4gICAgICAgIGFycmF5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXVxuICAgICk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgICAgICBsZXQgbWF0Y2hlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10gPSBhcnJheTtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGVybSAmJiB0aGlzLnNlYXJjaFRlcm0ubGVuZ3RoICE9PSAwICYmIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKSB7XG4gICAgICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMSB8fCBtYXRjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3TWF0Y2hlcyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbik6IHZvaWQge1xuICAgICAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICAgICAgaWYgKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucyk7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gb3B0aW9uIG5lZWRzIHRvIGhhdmUgZWl0aGVyIGFuIGFycmF5IG9mIHNlY29uZGFyeU9wdGlvbnMgb3IgYSBmdW5jdGlvbiBnZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMnLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKCkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5hbE1hcC5zZXQocHJpbWFyeU9wdGlvbi52YWx1ZSwgeyB2YWx1ZTogcHJpbWFyeU9wdGlvbi52YWx1ZSwgbGFiZWw6IHByaW1hcnlPcHRpb24ubGFiZWwsIGl0ZW1zIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHByaW1hcnlPcHRpb24uY2xlYXJTZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlPcHRpb24uY2xlYXJTZWNvbmRhcnlPcHRpb25zLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUHJpbWFyeU9wdGlvbihwcmltYXJ5T3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcih0aGlzLmludGVybmFsTWFwLmdldChwcmltYXJ5T3B0aW9uLnZhbHVlKS5pdGVtcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=