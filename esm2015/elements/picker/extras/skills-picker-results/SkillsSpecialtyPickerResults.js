// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
// App
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export class SkillsSpecialtyPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.element = element;
        this.labels = labels;
        this.active = true;
        this.limitedTo = false;
        this.limit = 200;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection) {
        let data = collection;
        if (collection.hasOwnProperty('data')) {
            this.limitedTo = collection.limitedTo200;
            this.total = collection.total;
            data = collection.data;
        }
        else if (data.length > this.limit) {
            this.limitedTo = true;
            this.total = data.length;
            data = data.slice(0, this.limit);
        }
        return super.structureArray(data);
    }
}
SkillsSpecialtyPickerResults.decorators = [
    { type: Component, args: [{
                selector: 'skill-specialty-picker-results',
                template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length"><novo-loading theme="line"></novo-loading></section>
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-content>
          <h6><span [innerHtml]="highlight(match.label, term)"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="highlight(match.data.categories || match.data.parentCategory.name, term)"></span>
          </div>
        </item-content>
      </novo-list-item>
      <novo-list-item *ngIf="limitedTo"
        ><div>{{ labels.showingXofXResults(limit, total) }}</div></novo-list-item
      >
      <novo-loading theme="line" *ngIf="isLoading && matches.length > 0"></novo-loading>
    </novo-list>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null" *ngIf="!isLoading && !matches.length && !hasError">{{ labels.pickerEmpty }}</p>
  `
            },] }
];
SkillsSpecialtyPickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
SkillsSpecialtyPickerResults.propDecorators = {
    active: [{ type: HostBinding, args: ['class.active',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcGlja2VyL2V4dHJhcy9za2lsbHMtcGlja2VyLXJlc3VsdHMvU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQStCM0UsTUFBTSxPQUFPLDRCQUE2QixTQUFRLGlCQUFpQjtJQU9qRSxZQUFtQixPQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDN0YsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURILFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUx2RSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsVUFBSyxHQUFXLEdBQUcsQ0FBQztJQUtwQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxjQUFjLENBQUMsVUFBZTtRQUM1QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUM7UUFDdEIsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDOUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUEvREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDthQUNGOzs7WUFqQ21CLFVBQVU7WUFHckIsZ0JBQWdCO1lBSE8saUJBQWlCOzs7cUJBbUM5QyxXQUFXLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBcHBcclxuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcclxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NraWxsLXNwZWNpYWx0eS1waWNrZXItcmVzdWx0cycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxzZWN0aW9uIGNsYXNzPVwicGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcz8ubGVuZ3RoXCI+PG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz48L3NlY3Rpb24+XHJcbiAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cclxuICAgICAgPG5vdm8tbGlzdC1pdGVtXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxyXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RNYXRjaCgkZXZlbnQpXCJcclxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXHJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXHJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXNlbGVjdGVkKG1hdGNoKVwiXHJcbiAgICAgID5cclxuICAgICAgICA8aXRlbS1jb250ZW50PlxyXG4gICAgICAgICAgPGg2PjxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmxhYmVsLCB0ZXJtKVwiPjwvc3Bhbj48L2g2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5XCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiYmhpLWNhdGVnb3J5LXRhZ3NcIj48L2lcclxuICAgICAgICAgICAgPjxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuY2F0ZWdvcmllcyB8fCBtYXRjaC5kYXRhLnBhcmVudENhdGVnb3J5Lm5hbWUsIHRlcm0pXCI+PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XHJcbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XHJcbiAgICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdJZj1cImxpbWl0ZWRUb1wiXHJcbiAgICAgICAgPjxkaXY+e3sgbGFiZWxzLnNob3dpbmdYb2ZYUmVzdWx0cyhsaW1pdCwgdG90YWwpIH19PC9kaXY+PC9ub3ZvLWxpc3QtaXRlbVxyXG4gICAgICA+XHJcbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPiAwXCI+PC9ub3ZvLWxvYWRpbmc+XHJcbiAgICA8L25vdm8tbGlzdD5cclxuICAgIDxwIGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvcD5cclxuICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGxcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvcD5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXHJcbiAgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcclxuICBsaW1pdGVkVG86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsaW1pdDogbnVtYmVyID0gMjAwO1xyXG4gIHRvdGFsOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcihlbGVtZW50LCByZWYpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGlzdEVsZW1lbnQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLWxpc3QnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBuYW1lIHN0cnVjdHVyZUFycmF5XHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb24gLSB0aGUgZGF0YSBvbmNlIGdldERhdGEgcmVzb2x2ZXMgaXRcclxuICAgKlxyXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHN0cnVjdHVyZXMgYW4gYXJyYXkgb2Ygbm9kZXMgaW50byBhbiBhcnJheSBvZiBvYmplY3RzIHdpdGggYVxyXG4gICAqICduYW1lJyBmaWVsZCBieSBkZWZhdWx0LlxyXG4gICAqL1xyXG4gIHN0cnVjdHVyZUFycmF5KGNvbGxlY3Rpb246IGFueSk6IGFueSB7XHJcbiAgICBsZXQgZGF0YSA9IGNvbGxlY3Rpb247XHJcbiAgICBpZiAoY29sbGVjdGlvbi5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XHJcbiAgICAgIHRoaXMubGltaXRlZFRvID0gY29sbGVjdGlvbi5saW1pdGVkVG8yMDA7XHJcbiAgICAgIHRoaXMudG90YWwgPSBjb2xsZWN0aW9uLnRvdGFsO1xyXG4gICAgICBkYXRhID0gY29sbGVjdGlvbi5kYXRhO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IHRoaXMubGltaXQpIHtcclxuICAgICAgdGhpcy5saW1pdGVkVG8gPSB0cnVlO1xyXG4gICAgICB0aGlzLnRvdGFsID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDAsIHRoaXMubGltaXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLnN0cnVjdHVyZUFycmF5KGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=