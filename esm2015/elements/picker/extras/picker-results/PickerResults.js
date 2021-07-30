// NG2
import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
// APP
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
export class PickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
    }
    get hasNonErrorMessage() {
        return !this.isLoading && !this.matches.length && !this.hasError;
    }
    getEmptyMessage() {
        if (this.shouldShowMessageForZeroLengthSearch()) {
            // this property comes from Field Interactions
            return this.config.emptyPickerMessage;
        }
        else {
            return this.term === '' ? this.labels.pickerTextFieldEmpty : this.labels.pickerEmpty;
        }
    }
    shouldShowMessageForZeroLengthSearch() {
        return this.config && this.config.minSearchLength === 0 && this.term === '' && this.config.emptyPickerMessage;
    }
    getListElement() {
        return this.element.nativeElement.querySelector('novo-list');
    }
}
PickerResults.decorators = [
    { type: Component, args: [{
                selector: 'picker-results',
                host: {
                    class: 'active',
                },
                template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-content> <span [innerHtml]="highlight(match.label, term)"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `
            },] }
];
PickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcGlja2VyL2V4dHJhcy9waWNrZXItcmVzdWx0cy9QaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUF5QjdFLE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQWlCO0lBQ2xELFlBQVksT0FBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ3RGLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEa0IsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFFaEUsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25FLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsb0NBQW9DLEVBQUUsRUFBRTtZQUM3Qyw4Q0FBOEM7WUFDOUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1NBQ3pDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUN0RjtJQUNILENBQUM7SUFFRCxvQ0FBb0M7UUFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0lBQ2hILENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLFFBQVE7aUJBQ2hCO2dCQUNELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDthQUNGOzs7WUEzQm1CLFVBQVU7WUFFckIsZ0JBQWdCO1lBRk8saUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uL2Jhc2UtcGlja2VyLXJlc3VsdHMvQmFzZVBpY2tlclJlc3VsdHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdwaWNrZXItcmVzdWx0cycsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdhY3RpdmUnLFxyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxub3ZvLWxpc3QgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxyXG4gICAgICA8bm92by1saXN0LWl0ZW1cclxuICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxyXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWF0Y2ggPT09IGFjdGl2ZU1hdGNoXCJcclxuICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcclxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxpdGVtLWNvbnRlbnQ+IDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmxhYmVsLCB0ZXJtKVwiPjwvc3Bhbj4gPC9pdGVtLWNvbnRlbnQ+XHJcbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XHJcbiAgICAgIDxub3ZvLWxvYWRpbmcgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPiAwXCIgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+XHJcbiAgICA8L25vdm8tbGlzdD5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItbG9hZGVyXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDBcIj48bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPjwvZGl2PlxyXG4gICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVycm9yIH19PC9wPlxyXG4gICAgPHAgY2xhc3M9XCJwaWNrZXItbnVsbC1yZXN1bHRzXCIgKm5nSWY9XCJoYXNOb25FcnJvck1lc3NhZ2VcIj57eyBnZXRFbXB0eU1lc3NhZ2UoKSB9fTwvcD5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBzdXBlcihlbGVtZW50LCByZWYpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc05vbkVycm9yTWVzc2FnZSgpIHtcclxuICAgIHJldHVybiAhdGhpcy5pc0xvYWRpbmcgJiYgIXRoaXMubWF0Y2hlcy5sZW5ndGggJiYgIXRoaXMuaGFzRXJyb3I7XHJcbiAgfVxyXG5cclxuICBnZXRFbXB0eU1lc3NhZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5zaG91bGRTaG93TWVzc2FnZUZvclplcm9MZW5ndGhTZWFyY2goKSkge1xyXG4gICAgICAgIC8vIHRoaXMgcHJvcGVydHkgY29tZXMgZnJvbSBGaWVsZCBJbnRlcmFjdGlvbnNcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZW1wdHlQaWNrZXJNZXNzYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGVybSA9PT0gJycgPyB0aGlzLmxhYmVscy5waWNrZXJUZXh0RmllbGRFbXB0eSA6IHRoaXMubGFiZWxzLnBpY2tlckVtcHR5O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkU2hvd01lc3NhZ2VGb3JaZXJvTGVuZ3RoU2VhcmNoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLm1pblNlYXJjaExlbmd0aCA9PT0gMCAmJiB0aGlzLnRlcm0gPT09ICcnICYmIHRoaXMuY29uZmlnLmVtcHR5UGlja2VyTWVzc2FnZTtcclxuICB9XHJcblxyXG4gIGdldExpc3RFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tbGlzdCcpO1xyXG4gIH1cclxufVxyXG4iXX0=