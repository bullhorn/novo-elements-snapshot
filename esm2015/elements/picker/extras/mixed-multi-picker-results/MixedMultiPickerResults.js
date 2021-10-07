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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcGlja2VyL2V4dHJhcy9taXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9NaXhlZE11bHRpUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBaUUvQyxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCO0lBK0IxRCxZQUFZLE9BQW1CLEVBQVUsUUFBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ2pILEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEaUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBdkJ0RixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUl4QixnQkFBVyxHQUE2RixJQUFJLEdBQUcsRUFHcEgsQ0FBQztJQWtCSixDQUFDO0lBaEJELElBQUksSUFBSSxDQUFDLEtBQUs7UUFDVixJQUFJ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QUFZLEVBQUUsQ0FBQztvQkFDeEIsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDWixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDNUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzNCO1NBQ0o7SUFDTCxDQUFDOzs7WUFyTUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQThDSDthQUNWOzs7WUF2RXNDLFVBQVU7WUFBYSxTQUFTO1lBSzlELGdCQUFnQjtZQUxoQixpQkFBaUI7OzsyQkF5RXJCLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQUVuQyxTQUFTLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvSGVscGVycyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9MaXN0RWxlbWVudCB9IGZyb20gJy4uLy4uLy4uL2xpc3QvTGlzdCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1peGVkTXVsdGlQaWNrZXJPcHRpb24ge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBzZWNvbmRhcnlPcHRpb25zPzoge1xuICAgICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICAgICBsYWJlbDogc3RyaW5nLFxuICAgICAgICBmaWx0ZXJWYWx1ZT86IGFueSxcbiAgICB9W107XG4gICAgZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jPygpOiBQcm9taXNlPHt2YWx1ZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nfVtdPjtcbiAgICBzaG93U2VhcmNoT25TZWNvbmRhcnlPcHRpb25zPzogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtaXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWdyb3Vwc1wiPlxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICAgICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQcmltYXJ5T3B0aW9uKG9wdGlvbiwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzZWxlY3RlZFByaW1hcnlPcHRpb24/LnZhbHVlID09PSBvcHRpb24udmFsdWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWxcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8aSAqbmdJZj1cIm9wdGlvbi5pY29uQ2xhc3NcIiBbY2xhc3NdPVwib3B0aW9uLmljb25DbGFzc1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibGFiZWxcIj57eyBvcHRpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGl0ZW0tZW5kICpuZ0lmPVwib3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLW5leHRcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9pdGVtLWVuZD5cbiAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICAgIDwvbm92by1saXN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbWF0Y2hlc1wiIFtoaWRkZW5dPVwiIW9wdGlvbkhhc1NlY29uZGFyeU9wdGlvbnMoc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWlucHV0LWNvbnRhaW5lclwiIFtoaWRkZW5dPVwiIXNob3VsZFNob3dTZWFyY2hCb3goc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKVwiIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGlucHV0IGF1dG9mb2N1cyAjaW5wdXQgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCIgW2Rpc2FibGVkXT1cImlzTG9hZGluZ1wiIGRhdGEtYXV0b21hdGlvbi1pZD1cImlucHV0XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIvPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktc2VhcmNoXCIgKm5nSWY9XCIhc2VhcmNoVGVybVwiIFtjbGFzcy5kaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJzZWFjaC1pY29uXCI+PC9pPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktdGltZXNcIiAqbmdJZj1cInNlYXJjaFRlcm1cIiAoY2xpY2spPVwiY2xlYXJTZWFyY2hUZXJtKCRldmVudClcIiBbY2xhc3MuZGlzYWJsZWRdPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwicmVtb3ZlLWljb25cIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWl4ZWQtbXVsdGktcGlja2VyLWxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgI2xpc3Q+XG4gICAgICAgICAgICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpIHx8IGlzTG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJtYXRjaC5sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgbWF0Y2gubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8L25vdm8tbGlzdD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbm8tcmVzdWx0c1wiICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPT09IDAgJiYgIWlzTG9hZGluZyAmJiBzZWxlY3RlZFByaW1hcnlPcHRpb25cIiBkYXRhLWF1dG9tYXRpb24taWQ9XCJlbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAge3sgbGFiZWxzLmdyb3VwZWRNdWx0aVBpY2tlckVtcHR5IH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtaXhlZC1tdWx0aS1waWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nXCIgZGF0YS1hdXRvbWF0aW9uLWlkPVwibG9hZGluZy1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gLFxufSlcbmV4cG9ydCBjbGFzcyBNaXhlZE11bHRpUGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgcHJpdmF0ZSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbGlzdCcpXG4gICAgcHJpdmF0ZSBsaXN0RWxlbWVudDogTm92b0xpc3RFbGVtZW50O1xuXG4gICAgcHVibGljIHNlbGVjdGVkUHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb247XG4gICAgcHVibGljIHNlYXJjaFRlcm06IHN0cmluZztcbiAgICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gICAgcHJpdmF0ZSBrZXlib2FyZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBpbnRlcm5hbE1hcDogTWFwPHN0cmluZywgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9PiA9IG5ldyBNYXA8XG4gICAgICAgIHN0cmluZyxcbiAgICAgICAgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBpdGVtczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSB9XG4gICAgPigpO1xuXG4gICAgc2V0IHRlcm0odmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMuY29uZmlnLnBsYWNlaG9sZGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZvY3VzXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5vcHRpb25zIHx8IFtdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50LCByZWYpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gQ2xlYW51cFxuICAgICAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdFByaW1hcnlPcHRpb24ocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24sIGV2ZW50PzogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3BcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmxpc3RFbGVtZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbFRvcCcsIDApO1xuICAgICAgICAvLyBTZXQgZm9jdXNcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAvLyBGaW5kIG5ldyBpdGVtc1xuICAgICAgICBjb25zdCBrZXk6IHN0cmluZyA9IHByaW1hcnlPcHRpb24udmFsdWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uID0gcHJpbWFyeU9wdGlvbjtcbiAgICAgICAgLy8gQ2xlYXJcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAvLyBOZXcgbWF0Y2hlc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25IYXNTZWNvbmRhcnlPcHRpb25zKHByaW1hcnlPcHRpb24pKSB7XG4gICAgICAgICAgICAvLyBTdWJzY3JpYmUgdG8ga2V5Ym9hcmQgZXZlbnRzIGFuZCBkZWJvdW5jZVxuICAgICAgICAgICAgdGhpcy5rZXlib2FyZFN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAna2V5dXAnKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDM1MCksXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKChrZXlFdmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IGtleUV2ZW50LnRhcmdldFsndmFsdWUnXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlckRhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5nZXROZXdNYXRjaGVzKHByaW1hcnlPcHRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBY3RpdmUocHJpbWFyeU9wdGlvbik7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RNYXRjaChldmVudD86IE1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gU2V0IGZvY3VzXG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnNlbGVjdE1hdGNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJTZWFyY2hUZXJtKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIHRoaXMuc2VsZWN0UHJpbWFyeU9wdGlvbih7IHZhbHVlOiB0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi52YWx1ZSwgbGFiZWw6IHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLmxhYmVsIH0pO1xuICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uSGFzU2Vjb25kYXJ5T3B0aW9ucyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbikge1xuICAgICAgICByZXR1cm4gISEocHJpbWFyeU9wdGlvbiAmJiAocHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zIHx8IHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3VsZFNob3dTZWFyY2hCb3gocHJpbWFyeU9wdGlvbjogSU1peGVkTXVsdGlQaWNrZXJPcHRpb24pIHtcbiAgICAgICAgcmV0dXJuICEhKHByaW1hcnlPcHRpb24gJiYgcHJpbWFyeU9wdGlvbi5zaG93U2VhcmNoT25TZWNvbmRhcnlPcHRpb25zKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhKCk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJpbWFyeU9wdGlvbi5zZWNvbmRhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uLnNlY29uZGFyeU9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIodGhpcy5pbnRlcm5hbE1hcC5nZXQodGhpcy5zZWxlY3RlZFByaW1hcnlPcHRpb24udmFsdWUpLml0ZW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaWx0ZXIoXG4gICAgICAgIGFycmF5OiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGZpbHRlclZhbHVlPzogYW55IH1bXVxuICAgICk6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10ge1xuICAgICAgICBsZXQgbWF0Y2hlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWx0ZXJWYWx1ZT86IGFueSB9W10gPSBhcnJheTtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGVybSAmJiB0aGlzLnNlYXJjaFRlcm0ubGVuZ3RoICE9PSAwICYmIHRoaXMuc2VsZWN0ZWRQcmltYXJ5T3B0aW9uKSB7XG4gICAgICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcy5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHRoaXMuc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMSB8fCBtYXRjaC52YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGVybSkgPiAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmV3TWF0Y2hlcyhwcmltYXJ5T3B0aW9uOiBJTWl4ZWRNdWx0aVBpY2tlck9wdGlvbik6IHZvaWQge1xuICAgICAgICAvLyBHZXQgbmV3IG1hdGNoZXNcbiAgICAgICAgaWYgKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucykge1xuICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHByaW1hcnlPcHRpb24uc2Vjb25kYXJ5T3B0aW9ucyk7XG4gICAgICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gb3B0aW9uIG5lZWRzIHRvIGhhdmUgZWl0aGVyIGFuIGFycmF5IG9mIHNlY29uZGFyeU9wdGlvbnMgb3IgYSBmdW5jdGlvbiBnZXRTZWNvbmRhcnlPcHRpb25zQXN5bmMnLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByaW1hcnlPcHRpb24uZ2V0U2Vjb25kYXJ5T3B0aW9uc0FzeW5jKCkudGhlbigoaXRlbXM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5hbE1hcC5zZXQocHJpbWFyeU9wdGlvbi52YWx1ZSwgeyB2YWx1ZTogcHJpbWFyeU9wdGlvbi52YWx1ZSwgbGFiZWw6IHByaW1hcnlPcHRpb24ubGFiZWwsIGl0ZW1zIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSB0aGlzLmZpbHRlcihpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlcyA9IHRoaXMuZmlsdGVyKHRoaXMuaW50ZXJuYWxNYXAuZ2V0KHByaW1hcnlPcHRpb24udmFsdWUpLml0ZW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==