// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
// APP
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/elements/list";
import * as i3 from "novo-elements/elements/loading";
import * as i4 from "@angular/common";
import * as i5 from "novo-elements/elements/common";
import * as i6 from "novo-elements/pipes";
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
PickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PickerResults, selector: "picker-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight:term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], pipes: { "highlight": i6.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PickerResults, decorators: [{
            type: Component,
            args: [{
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
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight:term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BpY2tlci9leHRyYXMvcGlja2VyLXJlc3VsdHMvUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7OztBQTBCN0UsTUFBTSxPQUFPLGFBQWMsU0FBUSxpQkFBaUI7SUFDbEQsWUFBWSxPQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDdEYsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURrQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUVoRSxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkUsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFO1lBQy9DLDhDQUE4QztZQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7U0FDdkM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQ3RGO0lBQ0gsQ0FBQztJQUVELG9DQUFvQztRQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDaEgsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxDQUFDOzsyR0F4QlUsYUFBYTsrRkFBYixhQUFhLGlIQW5CZDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7NEZBRVUsYUFBYTtrQkF4QnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxRQUFRO3FCQUNoQjtvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BpY2tlci1yZXN1bHRzJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYWN0aXZlJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RNYXRjaCgkZXZlbnQpXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXNlbGVjdGVkKG1hdGNoKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInBpY2tlci1yZXN1bHQtbGlzdC1pdGVtXCJcbiAgICAgID5cbiAgICAgICAgPGl0ZW0tY29udGVudD4gPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5sYWJlbCB8IGhpZ2hsaWdodDp0ZXJtXCI+PC9zcGFuPiA8L2l0ZW0tY29udGVudD5cbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8bm92by1sb2FkaW5nICpuZ0lmPVwiaXNMb2FkaW5nICYmIG1hdGNoZXMubGVuZ3RoID4gMFwiIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvbm92by1saXN0PlxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItbG9hZGVyXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDBcIj48bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPjwvZGl2PlxuICAgIDxwIGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvcD5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1udWxsLXJlc3VsdHNcIiAqbmdJZj1cImhhc05vbkVycm9yTWVzc2FnZVwiPnt7IGdldEVtcHR5TWVzc2FnZSgpIH19PC9wPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgfVxuXG4gIGdldCBoYXNOb25FcnJvck1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzTG9hZGluZyAmJiAhdGhpcy5tYXRjaGVzLmxlbmd0aCAmJiAhdGhpcy5oYXNFcnJvcjtcbiAgfVxuXG4gIGdldEVtcHR5TWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5zaG91bGRTaG93TWVzc2FnZUZvclplcm9MZW5ndGhTZWFyY2goKSkge1xuICAgICAgLy8gdGhpcyBwcm9wZXJ0eSBjb21lcyBmcm9tIEZpZWxkIEludGVyYWN0aW9uc1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmVtcHR5UGlja2VyTWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudGVybSA9PT0gJycgPyB0aGlzLmxhYmVscy5waWNrZXJUZXh0RmllbGRFbXB0eSA6IHRoaXMubGFiZWxzLnBpY2tlckVtcHR5O1xuICAgIH1cbiAgfVxuXG4gIHNob3VsZFNob3dNZXNzYWdlRm9yWmVyb0xlbmd0aFNlYXJjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcubWluU2VhcmNoTGVuZ3RoID09PSAwICYmIHRoaXMudGVybSA9PT0gJycgJiYgdGhpcy5jb25maWcuZW1wdHlQaWNrZXJNZXNzYWdlO1xuICB9XG5cbiAgZ2V0TGlzdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tbGlzdCcpO1xuICB9XG59XG4iXX0=