// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import { PickerResults } from '../picker-results';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "novo-elements/services";
import * as i3 from "novo-elements/components/loading";
import * as i4 from "novo-elements/components/list";
import * as i5 from "@angular/common";
import * as i6 from "novo-elements/common";
export class WorkersCompCodesPickerResults extends PickerResults {
    constructor(element, sanitizer, labels, ref) {
        super(element, labels, ref);
        this.sanitizer = sanitizer;
        this.labels = labels;
    }
    sanitizeHTML(compCode, name) {
        return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
    }
}
WorkersCompCodesPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WorkersCompCodesPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.DomSanitizer }, { token: i2.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
WorkersCompCodesPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: WorkersCompCodesPickerResults, selector: "workers-comp-codes-picker-results", host: { classAttribute: "active" }, usesInheritance: true, ngImport: i0, template: `
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
            <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, isInline: true, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"], components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i4.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i4.NovoListItemElement, selector: "novo-list-item, [list-item]" }, { type: i4.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i4.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i4.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WorkersCompCodesPickerResults, decorators: [{
            type: Component,
            args: [{ selector: 'workers-comp-codes-picker-results', host: {
                        class: 'active',
                    }, template: `
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
            <span [innerHtml]="sanitizeHTML(match?.data?.compensation?.code, match?.data?.compensation?.name)"></span>
          </item-title>
        </item-header>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.state }}: </span><span>{{ match?.data?.compensation?.state }}</span>
          </p>
          <p>
            <span class="label">{{ labels.rate }}: </span><span>{{ labels.formatCurrency(match?.data?.rate) }}</span>
          </p>
        </item-content>
        <item-content direction="horizontal">
          <p>
            <span class="label">{{ labels.startDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.startDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
          <p>
            <span class="label">{{ labels.endDate }}: </span
            ><span>{{ labels.formatDateWithFormat(match?.data?.endDate, { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
          </p>
        </item-content>
      </novo-list-item>
      <novo-loading theme="line" *ngIf="isLoading && matches?.length > 0"></novo-loading>
    </novo-list>
    <div class="picker-loader" *ngIf="isLoading && matches.length === 0"><novo-loading theme="line"></novo-loading></div>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="hasNonErrorMessage">{{ getEmptyMessage() }}</p>
  `, styles: [":host{display:block;color:#000;width:100%;max-width:none;z-index:99;background:var(--color-background);padding:1px}:host.active{border:1px solid var(--color-selection)}:host .novo-list{min-height:100%;background:var(--color-background);max-height:330px;overflow-y:auto;overflow-x:hidden}:host .novo-list .novo-list-item{display:block;transition:background-color .25s;border-bottom:var(--border-main);cursor:pointer}:host .novo-list .novo-list-item.disabled{opacity:.5;pointer-events:none}:host .novo-list .novo-list-item item-title h6{font-weight:500;padding:.6em 0 .5em}:host .novo-list .novo-list-item item-title h6 span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:100px;width:80%;display:block}:host .novo-list .novo-list-item>div{width:100%;margin-left:15px}:host .novo-list .novo-list-item.active{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item:hover{background-color:var(--color-selection-overlay)}:host .novo-list .novo-list-item item-content{flex-flow:row nowrap;justify-content:space-between}:host .novo-list .novo-list-item item-content>*{flex:0 0 60%;white-space:nowrap}:host .novo-list .novo-list-item item-content p{margin-right:.5em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1}:host .novo-list .novo-list-item item-content p .label{font-weight:700}:host .novo-list novo-loading{justify-content:center}:host .picker-null,:host .picker-error,:host .picker-loading,:host .picker-no-recents{text-align:center;padding:1em 0 4em}:host .picker-null>i,:host .picker-error>i,:host .picker-loading>i,:host .picker-no-recents>i{font-size:3em;margin:.5em;color:#0000004d}:host .picker-null>h4,:host .picker-null>p,:host .picker-error>h4,:host .picker-error>p,:host .picker-loading>h4,:host .picker-loading>p,:host .picker-no-recents>h4,:host .picker-no-recents>p{margin:0;max-width:none;padding:0}:host .picker-null>h4,:host .picker-error>h4,:host .picker-loading>h4,:host .picker-no-recents>h4{font-weight:500}:host section{box-shadow:.1em .1em 1em #00000040;z-index:9;position:absolute;width:100%;background-color:#fff;color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.DomSanitizer }, { type: i2.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9waWNrZXIvZXh0cmFzL3dvcmtlcnMtY29tcC1jb2Rlcy1waWNrZXItcmVzdWx0cy93b3JrZXJzLWNvbXAtY29kZXMtcGlja2VyLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7O0FBbURsRCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsYUFBYTtJQUM5RCxZQUFZLE9BQW1CLEVBQVUsU0FBdUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ3ZILEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRFcsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBRWpHLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBZ0IsRUFBRSxJQUFZO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLFFBQVEsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7OzJIQVBVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLG9JQTNDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNUOzRGQUVVLDZCQUE2QjtrQkFqRHpDLFNBQVM7K0JBQ0UsbUNBQW1DLFFBRXZDO3dCQUNKLEtBQUssRUFBRSxRQUFRO3FCQUNoQixZQUNTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDVCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vcGlja2VyLXJlc3VsdHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3b3JrZXJzLWNvbXAtY29kZXMtcGlja2VyLXJlc3VsdHMnLFxuICBzdHlsZVVybHM6IFsnLi4vcGlja2VyLXJlc3VsdHMvcGlja2VyLXJlc3VsdHMuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhY3RpdmUnLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uIGNsYXNzPVwicGlja2VyLWxvYWRpbmdcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcz8ubGVuZ3RoXCI+XG4gICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvc2VjdGlvbj5cbiAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCIgKm5nSWY9XCJtYXRjaGVzPy5sZW5ndGggPiAwICYmICFoYXNFcnJvclwiPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpXCJcbiAgICAgID5cbiAgICAgICAgPGl0ZW0taGVhZGVyPlxuICAgICAgICAgIDxpdGVtLXRpdGxlPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySHRtbF09XCJzYW5pdGl6ZUhUTUwobWF0Y2g/LmRhdGE/LmNvbXBlbnNhdGlvbj8uY29kZSwgbWF0Y2g/LmRhdGE/LmNvbXBlbnNhdGlvbj8ubmFtZSlcIj48L3NwYW4+XG4gICAgICAgICAgPC9pdGVtLXRpdGxlPlxuICAgICAgICA8L2l0ZW0taGVhZGVyPlxuICAgICAgICA8aXRlbS1jb250ZW50IGRpcmVjdGlvbj1cImhvcml6b250YWxcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57eyBsYWJlbHMuc3RhdGUgfX06IDwvc3Bhbj48c3Bhbj57eyBtYXRjaD8uZGF0YT8uY29tcGVuc2F0aW9uPy5zdGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgbGFiZWxzLnJhdGUgfX06IDwvc3Bhbj48c3Bhbj57eyBsYWJlbHMuZm9ybWF0Q3VycmVuY3kobWF0Y2g/LmRhdGE/LnJhdGUpIH19PC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICAgIDxpdGVtLWNvbnRlbnQgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7IGxhYmVscy5zdGFydERhdGUgfX06IDwvc3BhblxuICAgICAgICAgICAgPjxzcGFuPnt7IGxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdChtYXRjaD8uZGF0YT8uc3RhcnREYXRlLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSkgfX08L3NwYW4+XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7IGxhYmVscy5lbmREYXRlIH19OiA8L3NwYW5cbiAgICAgICAgICAgID48c3Bhbj57eyBsYWJlbHMuZm9ybWF0RGF0ZVdpdGhGb3JtYXQobWF0Y2g/LmRhdGE/LmVuZERhdGUsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcz8ubGVuZ3RoID4gMFwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvbm92by1saXN0PlxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItbG9hZGVyXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDBcIj48bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPjwvZGl2PlxuICAgIDxwIGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvcD5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1udWxsLXJlc3VsdHNcIiAqbmdJZj1cImhhc05vbkVycm9yTWVzc2FnZVwiPnt7IGdldEVtcHR5TWVzc2FnZSgpIH19PC9wPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBXb3JrZXJzQ29tcENvZGVzUGlja2VyUmVzdWx0cyBleHRlbmRzIFBpY2tlclJlc3VsdHMge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgbGFiZWxzLCByZWYpO1xuICB9XG5cbiAgc2FuaXRpemVIVE1MKGNvbXBDb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChgJHtjb21wQ29kZX0gfCAke25hbWV9YCk7XG4gIH1cbn1cbiJdfQ==