// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/loading";
import * as i3 from "novo-elements/components/list";
import * as i4 from "@angular/common";
import * as i5 from "novo-elements/common";
import * as i6 from "novo-elements/pipes";
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
SkillsSpecialtyPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SkillsSpecialtyPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SkillsSpecialtyPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: SkillsSpecialtyPickerResults, selector: "skill-specialty-picker-results", host: { properties: { "class.active": "this.active" } }, usesInheritance: true, ngImport: i0, template: `
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
          <h6><span [innerHtml]="match.label | highlight: term"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight: term"></span>
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
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i2.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i3.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i3.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i3.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "highlight": i6.HighlightPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SkillsSpecialtyPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'skill-specialty-picker-results', template: `
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
          <h6><span [innerHtml]="match.label | highlight: term"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="match.data.categories || match.data.parentCategory.name | highlight: term"></span>
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
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLXNwZWNpYWx0eS1waWNrZXItcmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvcGlja2VyL2V4dHJhcy9za2lsbHMtcGlja2VyLXJlc3VsdHMvc2tpbGxzLXNwZWNpYWx0eS1waWNrZXItcmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOzs7Ozs7OztBQWdDL0UsTUFBTSxPQUFPLDRCQUE2QixTQUFRLGlCQUFpQjtJQU9qRSxZQUFtQixPQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDN0YsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURILFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUx2RSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsVUFBSyxHQUFXLEdBQUcsQ0FBQztJQUtwQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxjQUFjLENBQUMsVUFBZTtRQUM1QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUM7UUFDdEIsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDOUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzswSEFsQ1UsNEJBQTRCOzhHQUE1Qiw0QkFBNEIsc0pBM0I3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDs0RkFFVSw0QkFBNEI7a0JBOUJ4QyxTQUFTOytCQUNFLGdDQUFnQyxZQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDtnS0FJRCxNQUFNO3NCQURMLFdBQVc7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9iYXNlLXBpY2tlci1yZXN1bHRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2tpbGwtc3BlY2lhbHR5LXBpY2tlci1yZXN1bHRzJyxcbiAgc3R5bGVVcmxzOiBbJy4uL3BpY2tlci1yZXN1bHRzL3BpY2tlci1yZXN1bHRzLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VjdGlvbiBjbGFzcz1cInBpY2tlci1sb2FkaW5nXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgIW1hdGNoZXM/Lmxlbmd0aFwiPjxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+PC9zZWN0aW9uPlxuICAgIDxub3ZvLWxpc3QgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpXCJcbiAgICAgID5cbiAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICA8aDY+PHNwYW4gW2lubmVySHRtbF09XCJtYXRjaC5sYWJlbCB8IGhpZ2hsaWdodDogdGVybVwiPjwvc3Bhbj48L2g2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2F0ZWdvcnktdGFnc1wiPjwvaVxuICAgICAgICAgICAgPjxzcGFuIFtpbm5lckh0bWxdPVwibWF0Y2guZGF0YS5jYXRlZ29yaWVzIHx8IG1hdGNoLmRhdGEucGFyZW50Q2F0ZWdvcnkubmFtZSB8IGhpZ2hsaWdodDogdGVybVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtICpuZ0lmPVwibGltaXRlZFRvXCJcbiAgICAgICAgPjxkaXY+e3sgbGFiZWxzLnNob3dpbmdYb2ZYUmVzdWx0cyhsaW1pdCwgdG90YWwpIH19PC9kaXY+PC9ub3ZvLWxpc3QtaXRlbVxuICAgICAgPlxuICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiBtYXRjaGVzLmxlbmd0aCA+IDBcIj48L25vdm8tbG9hZGluZz5cbiAgICA8L25vdm8tbGlzdD5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1lcnJvclwiICpuZ0lmPVwiaGFzRXJyb3JcIj57eyBsYWJlbHMucGlja2VyRXJyb3IgfX08L3A+XG4gICAgPHAgY2xhc3M9XCJwaWNrZXItbnVsbFwiICpuZ0lmPVwiIWlzTG9hZGluZyAmJiAhbWF0Y2hlcy5sZW5ndGggJiYgIWhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVtcHR5IH19PC9wPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBTa2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG4gIGxpbWl0ZWRUbzogYm9vbGVhbiA9IGZhbHNlO1xuICBsaW1pdDogbnVtYmVyID0gMjAwO1xuICB0b3RhbDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgcmVmKTtcbiAgfVxuXG4gIGdldExpc3RFbGVtZW50KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tbGlzdCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIHN0cnVjdHVyZUFycmF5XG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uIC0gdGhlIGRhdGEgb25jZSBnZXREYXRhIHJlc29sdmVzIGl0XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHN0cnVjdHVyZXMgYW4gYXJyYXkgb2Ygbm9kZXMgaW50byBhbiBhcnJheSBvZiBvYmplY3RzIHdpdGggYVxuICAgKiAnbmFtZScgZmllbGQgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0cnVjdHVyZUFycmF5KGNvbGxlY3Rpb246IGFueSk6IGFueSB7XG4gICAgbGV0IGRhdGEgPSBjb2xsZWN0aW9uO1xuICAgIGlmIChjb2xsZWN0aW9uLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgIHRoaXMubGltaXRlZFRvID0gY29sbGVjdGlvbi5saW1pdGVkVG8yMDA7XG4gICAgICB0aGlzLnRvdGFsID0gY29sbGVjdGlvbi50b3RhbDtcbiAgICAgIGRhdGEgPSBjb2xsZWN0aW9uLmRhdGE7XG4gICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IHRoaXMubGltaXQpIHtcbiAgICAgIHRoaXMubGltaXRlZFRvID0gdHJ1ZTtcbiAgICAgIHRoaXMudG90YWwgPSBkYXRhLmxlbmd0aDtcbiAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDAsIHRoaXMubGltaXQpO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuc3RydWN0dXJlQXJyYXkoZGF0YSk7XG4gIH1cbn1cbiJdfQ==