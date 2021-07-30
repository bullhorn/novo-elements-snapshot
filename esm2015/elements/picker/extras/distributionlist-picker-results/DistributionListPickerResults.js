// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export class DistributionListPickerResults extends BasePickerResults {
    constructor(element, sanitizer, labels, ref) {
        super(element, ref);
        this.sanitizer = sanitizer;
        this.labels = labels;
        this.active = true;
        this.sanitizer = sanitizer;
    }
    get isHidden() {
        return this.matches.length === 0;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    sanitizeHTML(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
DistributionListPickerResults.decorators = [
    { type: Component, args: [{
                selector: 'distribution-list-picker-results',
                template: `
        <section class="picker-loading" *ngIf="isLoading && !matches?.length">
            <novo-loading theme="line"></novo-loading>
        </section>
        <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
            <novo-list-item *ngFor="let match of matches" (click)="selectMatch($event)" [class.active]="match === activeMatch" (mouseenter)="selectActive(match)" [class.disabled]="preselected(match)">
                <item-header>
                    <item-title>
                        <span [innerHtml]="sanitizeHTML(match.label)"></span>
                    </item-title>
                </item-header>
                <item-content direction="horizontal">
                    <p>
                        <span class='label'>{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
                    </p>
                    <p>
                        <span class='label'>{{ labels.dateAdded }}: </span><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
                    </p>
                </item-content>
            </novo-list-item>
            <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
        </novo-list>
    `
            },] }
];
DistributionListPickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: DomSanitizer },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
DistributionListPickerResults.propDecorators = {
    active: [{ type: HostBinding, args: ['class.active',] }],
    isHidden: [{ type: HostBinding, args: ['hidden',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BpY2tlci9leHRyYXMvZGlzdHJpYnV0aW9ubGlzdC1waWNrZXItcmVzdWx0cy9EaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxTQUFTO0FBQ1QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUE0QjNFLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxpQkFBaUI7SUFRbEUsWUFBWSxPQUFtQixFQUFVLFNBQXVCLEVBQVMsTUFBd0IsRUFBRSxHQUFzQjtRQUN2SCxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRG1CLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQU5qRyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBUXJCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFSRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBT0QsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxZQUFZLENBQUMsSUFBUztRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7O1lBN0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQlA7YUFDSjs7O1lBL0JtQixVQUFVO1lBQ3JCLFlBQVk7WUFHWixnQkFBZ0I7WUFKTyxpQkFBaUI7OztxQkFpQzlDLFdBQVcsU0FBQyxjQUFjO3VCQUUxQixXQUFXLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuLy8gVmVuZG9yXHJcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkaXN0cmlidXRpb24tbGlzdC1waWNrZXItcmVzdWx0cycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInBpY2tlci1sb2FkaW5nXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgIW1hdGNoZXM/Lmxlbmd0aFwiPlxyXG4gICAgICAgICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgKm5nSWY9XCJtYXRjaGVzPy5sZW5ndGggPiAwICYmICFoYXNFcnJvclwiPlxyXG4gICAgICAgICAgICA8bm92by1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIiAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiIFtjbGFzcy5hY3RpdmVdPVwibWF0Y2ggPT09IGFjdGl2ZU1hdGNoXCIgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaClcIj5cclxuICAgICAgICAgICAgICAgIDxpdGVtLWhlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICA8aXRlbS10aXRsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJzYW5pdGl6ZUhUTUwobWF0Y2gubGFiZWwpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvaXRlbS10aXRsZT5cclxuICAgICAgICAgICAgICAgIDwvaXRlbS1oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50IGRpcmVjdGlvbj1cImhvcml6b250YWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xhYmVsJz57eyBsYWJlbHMuZGlzdHJpYnV0aW9uTGlzdE93bmVyIH19OiA8L3NwYW4+PHNwYW4+e3sgbWF0Y2g/LmRhdGE/Lm93bmVyPy5uYW1lIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2xhYmVsJz57eyBsYWJlbHMuZGF0ZUFkZGVkIH19OiA8L3NwYW4+PHNwYW4+e3sgbGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KG1hdGNoPy5kYXRhPy5kYXRlQWRkZWQsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2l0ZW0tY29udGVudD5cclxuICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cclxuICAgICAgICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiBtYXRjaGVzPy5sZW5ndGggPiAwXCI+PC9ub3ZvLWxvYWRpbmc+XHJcbiAgICAgICAgPC9ub3ZvLWxpc3Q+XHJcbiAgICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMgZXh0ZW5kcyBCYXNlUGlja2VyUmVzdWx0cyB7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxyXG4gIGFjdGl2ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgQEhvc3RCaW5kaW5nKCdoaWRkZW4nKVxyXG4gIGdldCBpc0hpZGRlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1hdGNoZXMubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcclxuICAgIHRoaXMuc2FuaXRpemVyID0gc2FuaXRpemVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGlzdEVsZW1lbnQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLWxpc3QnKTtcclxuICB9XHJcblxyXG4gIHNhbml0aXplSFRNTChodG1sOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpO1xyXG4gIH1cclxufVxyXG4iXX0=