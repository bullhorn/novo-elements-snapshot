// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "novo-elements/services";
import * as i3 from "novo-elements/components/loading";
import * as i4 from "novo-elements/components/list";
import * as i5 from "@angular/common";
import * as i6 from "novo-elements/common";
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
DistributionListPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DistributionListPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.DomSanitizer }, { token: i2.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DistributionListPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: DistributionListPickerResults, selector: "distribution-list-picker-results", host: { properties: { "class.active": "this.active", "hidden": "this.isHidden" } }, usesInheritance: true, ngImport: i0, template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match.label)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
          </p>
          <p>
            <span class="label">{{ labels.dateAdded }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i4.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i4.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i4.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i4.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i4.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DistributionListPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'distribution-list-picker-results', template: `
    <section class="picker-loading" *ngIf="isLoading && !matches?.length">
      <novo-loading theme="line"></novo-loading>
    </section>
    <novo-list direction="vertical" *ngIf="matches?.length > 0 && !hasError">
      <novo-list-item
        *ngFor="let match of matches"
        (click)="selectMatch($event)"
        [class.active]="match === activeMatch"
        (mouseenter)="selectActive(match)"
        [class.disabled]="preselected(match)"
      >
        <item-header>
          <item-title>
            <span [innerHtml]="sanitizeHTML(match.label)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.distributionListOwner }}: </span><span>{{ match?.data?.owner?.name }}</span>
          </p>
          <p>
            <span class="label">{{ labels.dateAdded }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.dateAdded, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.DomSanitizer }, { type: i2.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }], isHidden: [{
                type: HostBinding,
                args: ['hidden']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdHJpYnV0aW9uLWxpc3QtcGlja2VyLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3BpY2tlci9leHRyYXMvZGlzdHJpYnV0aW9ubGlzdC1waWNrZXItcmVzdWx0cy9kaXN0cmlidXRpb24tbGlzdC1waWNrZXItcmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7Ozs7QUFvQy9FLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxpQkFBaUI7SUFRbEUsWUFBWSxPQUFtQixFQUFVLFNBQXVCLEVBQVMsTUFBd0IsRUFBRSxHQUFzQjtRQUN2SCxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRG1CLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQU5qRyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBUXJCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFSRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBT0QsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxZQUFZLENBQUMsSUFBUztRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7MkhBbkJVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLG1MQS9COUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUOzRGQUVVLDZCQUE2QjtrQkFsQ3pDLFNBQVM7K0JBQ0Usa0NBQWtDLFlBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDsyTEFJRCxNQUFNO3NCQURMLFdBQVc7dUJBQUMsY0FBYztnQkFHdkIsUUFBUTtzQkFEWCxXQUFXO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9iYXNlLXBpY2tlci1yZXN1bHRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGlzdHJpYnV0aW9uLWxpc3QtcGlja2VyLXJlc3VsdHMnLFxuICBzdHlsZVVybHM6IFsnLi4vcGlja2VyLXJlc3VsdHMvcGlja2VyLXJlc3VsdHMuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uIGNsYXNzPVwicGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcz8ubGVuZ3RoXCI+XG4gICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvc2VjdGlvbj5cbiAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgKm5nSWY9XCJtYXRjaGVzPy5sZW5ndGggPiAwICYmICFoYXNFcnJvclwiPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpXCJcbiAgICAgID5cbiAgICAgICAgPGl0ZW0taGVhZGVyPlxuICAgICAgICAgIDxpdGVtLXRpdGxlPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJzYW5pdGl6ZUhUTUwobWF0Y2gubGFiZWwpXCI+PC9zcGFuPlxuICAgICAgICAgIDwvaXRlbS10aXRsZT5cbiAgICAgICAgPC9pdGVtLWhlYWRlcj5cbiAgICAgICAgPGl0ZW0tY29udGVudCBkaXJlY3Rpb249XCJob3Jpem9udGFsXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgbGFiZWxzLmRpc3RyaWJ1dGlvbkxpc3RPd25lciB9fTogPC9zcGFuPjxzcGFuPnt7IG1hdGNoPy5kYXRhPy5vd25lcj8ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgbGFiZWxzLmRhdGVBZGRlZCB9fTogPC9zcGFuXG4gICAgICAgICAgICA+PHNwYW4+e3sgbGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KG1hdGNoPy5kYXRhPy5kYXRlQWRkZWQsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcz8ubGVuZ3RoID4gMFwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvbm92by1saXN0PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBASG9zdEJpbmRpbmcoJ2hpZGRlbicpXG4gIGdldCBpc0hpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50LCByZWYpO1xuICAgIHRoaXMuc2FuaXRpemVyID0gc2FuaXRpemVyO1xuICB9XG5cbiAgZ2V0TGlzdEVsZW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0Jyk7XG4gIH1cblxuICBzYW5pdGl6ZUhUTUwoaHRtbDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCk7XG4gIH1cbn1cbiJdfQ==