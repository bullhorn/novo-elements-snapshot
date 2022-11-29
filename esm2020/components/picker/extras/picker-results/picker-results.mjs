// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/list";
import * as i3 from "novo-elements/components/loading";
import * as i4 from "@angular/common";
import * as i5 from "novo-elements/common";
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
        <item-content> <span [innerHtml]="match.label | highlight: term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i2.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i2.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i2.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }, { type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], pipes: { "highlight": i6.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'picker-results', host: {
                        class: 'active',
                    }, template: `
    <novo-list *ngIf="matches.length > 0" direction="vertical">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
        data-automation-id="picker-result-list-item"
      >
        <item-content> <span [innerHtml]="match.label | highlight: term"></span> </item-content>
      </novo-list-item>
      <novo-loading *ngIf="isLoading && matches.length > 0" theme="line"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3BpY2tlci9leHRyYXMvcGlja2VyLXJlc3VsdHMvcGlja2VyLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOzs7Ozs7OztBQTJCL0UsTUFBTSxPQUFPLGFBQWMsU0FBUSxpQkFBaUI7SUFDbEQsWUFBWSxPQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDdEYsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURrQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUVoRSxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkUsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFO1lBQy9DLDhDQUE4QztZQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7U0FDdkM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQ3RGO0lBQ0gsQ0FBQztJQUVELG9DQUFvQztRQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDaEgsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxDQUFDOzsyR0F4QlUsYUFBYTsrRkFBYixhQUFhLGlIQW5CZDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7NEZBRVUsYUFBYTtrQkF6QnpCLFNBQVM7K0JBQ0UsZ0JBQWdCLFFBRXBCO3dCQUNKLEtBQUssRUFBRSxRQUFRO3FCQUNoQixZQUNTOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL2Jhc2UtcGlja2VyLXJlc3VsdHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwaWNrZXItcmVzdWx0cycsXG4gIHN0eWxlVXJsczogWycuL3BpY2tlci1yZXN1bHRzLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYWN0aXZlJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RNYXRjaCgkZXZlbnQpXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXNlbGVjdGVkKG1hdGNoKVwiXG4gICAgICAgIGRhdGEtYXV0b21hdGlvbi1pZD1cInBpY2tlci1yZXN1bHQtbGlzdC1pdGVtXCJcbiAgICAgID5cbiAgICAgICAgPGl0ZW0tY29udGVudD4gPHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5sYWJlbCB8IGhpZ2hsaWdodDogdGVybVwiPjwvc3Bhbj4gPC9pdGVtLWNvbnRlbnQ+XG4gICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPG5vdm8tbG9hZGluZyAqbmdJZj1cImlzTG9hZGluZyAmJiBtYXRjaGVzLmxlbmd0aCA+IDBcIiB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz5cbiAgICA8L25vdm8tbGlzdD5cbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWxvYWRlclwiICpuZ0lmPVwiaXNMb2FkaW5nICYmIG1hdGNoZXMubGVuZ3RoID09PSAwXCI+PG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz48L2Rpdj5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1lcnJvclwiICpuZ0lmPVwiaGFzRXJyb3JcIj57eyBsYWJlbHMucGlja2VyRXJyb3IgfX08L3A+XG4gICAgPHAgY2xhc3M9XCJwaWNrZXItbnVsbC1yZXN1bHRzXCIgKm5nSWY9XCJoYXNOb25FcnJvck1lc3NhZ2VcIj57eyBnZXRFbXB0eU1lc3NhZ2UoKSB9fTwvcD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgUGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBnZXQgaGFzTm9uRXJyb3JNZXNzYWdlKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0xvYWRpbmcgJiYgIXRoaXMubWF0Y2hlcy5sZW5ndGggJiYgIXRoaXMuaGFzRXJyb3I7XG4gIH1cblxuICBnZXRFbXB0eU1lc3NhZ2UoKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkU2hvd01lc3NhZ2VGb3JaZXJvTGVuZ3RoU2VhcmNoKCkpIHtcbiAgICAgIC8vIHRoaXMgcHJvcGVydHkgY29tZXMgZnJvbSBGaWVsZCBJbnRlcmFjdGlvbnNcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5lbXB0eVBpY2tlck1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRlcm0gPT09ICcnID8gdGhpcy5sYWJlbHMucGlja2VyVGV4dEZpZWxkRW1wdHkgOiB0aGlzLmxhYmVscy5waWNrZXJFbXB0eTtcbiAgICB9XG4gIH1cblxuICBzaG91bGRTaG93TWVzc2FnZUZvclplcm9MZW5ndGhTZWFyY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLm1pblNlYXJjaExlbmd0aCA9PT0gMCAmJiB0aGlzLnRlcm0gPT09ICcnICYmIHRoaXMuY29uZmlnLmVtcHR5UGlja2VyTWVzc2FnZTtcbiAgfVxuXG4gIGdldExpc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLWxpc3QnKTtcbiAgfVxufVxuIl19