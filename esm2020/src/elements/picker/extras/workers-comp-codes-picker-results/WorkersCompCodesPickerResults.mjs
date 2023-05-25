// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../../../services/novo-label-service';
// Vendor
import { PickerResults } from '../picker-results';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "../../../../services/novo-label-service";
import * as i3 from "../../../loading/Loading";
import * as i4 from "../../../list/List";
import * as i5 from "@angular/common";
import * as i6 from "../../../common/directives/theme.directive";
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
  `, isInline: true, components: [{ type: i3.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }, { type: i4.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i4.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i4.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i4.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i4.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: WorkersCompCodesPickerResults, decorators: [{
            type: Component,
            args: [{
                    selector: 'workers-comp-codes-picker-results',
                    host: {
                        class: 'active',
                    },
                    template: `
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
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.DomSanitizer }, { type: i2.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9waWNrZXIvZXh0cmFzL3dvcmtlcnMtY29tcC1jb2Rlcy1waWNrZXItcmVzdWx0cy9Xb3JrZXJzQ29tcENvZGVzUGlja2VyUmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLFNBQVM7QUFDVCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7O0FBa0RoRCxNQUFNLE9BQU8sNkJBQThCLFNBQVEsYUFBYTtJQUU5RCxZQUFZLE9BQW1CLEVBQVUsU0FBdUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ3ZILEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRFcsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBRWpHLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBZ0IsRUFBRSxJQUFZO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLFFBQVEsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7OzJIQVJVLDZCQUE2QjsrR0FBN0IsNkJBQTZCLG9JQTNDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNUOzRGQUVVLDZCQUE2QjtrQkFoRHpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1DQUFtQztvQkFDN0MsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxRQUFRO3FCQUNoQjtvQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbi8vIFZlbmRvclxuaW1wb3J0IHtQaWNrZXJSZXN1bHRzfSBmcm9tICcuLi9waWNrZXItcmVzdWx0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dvcmtlcnMtY29tcC1jb2Rlcy1waWNrZXItcmVzdWx0cycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FjdGl2ZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJwaWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nICYmICFtYXRjaGVzPy5sZW5ndGhcIj5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIiAqbmdJZj1cIm1hdGNoZXM/Lmxlbmd0aCA+IDAgJiYgIWhhc0Vycm9yXCI+XG4gICAgICA8bm92by1saXN0LWl0ZW1cbiAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoIG9mIG1hdGNoZXNcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWF0Y2ggPT09IGFjdGl2ZU1hdGNoXCJcbiAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaClcIlxuICAgICAgPlxuICAgICAgICA8aXRlbS1oZWFkZXI+XG4gICAgICAgICAgPGl0ZW0tdGl0bGU+XG4gICAgICAgICAgICA8c3BhbiBbaW5uZXJIdG1sXT1cInNhbml0aXplSFRNTChtYXRjaD8uZGF0YT8uY29tcGVuc2F0aW9uPy5jb2RlLCBtYXRjaD8uZGF0YT8uY29tcGVuc2F0aW9uPy5uYW1lKVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L2l0ZW0tdGl0bGU+XG4gICAgICAgIDwvaXRlbS1oZWFkZXI+XG4gICAgICAgIDxpdGVtLWNvbnRlbnQgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7IGxhYmVscy5zdGF0ZSB9fTogPC9zcGFuPjxzcGFuPnt7IG1hdGNoPy5kYXRhPy5jb21wZW5zYXRpb24/LnN0YXRlIH19PC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57eyBsYWJlbHMucmF0ZSB9fTogPC9zcGFuPjxzcGFuPnt7IGxhYmVscy5mb3JtYXRDdXJyZW5jeShtYXRjaD8uZGF0YT8ucmF0ZSkgfX08L3NwYW4+XG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgICAgPGl0ZW0tY29udGVudCBkaXJlY3Rpb249XCJob3Jpem9udGFsXCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgbGFiZWxzLnN0YXJ0RGF0ZSB9fTogPC9zcGFuXG4gICAgICAgICAgICA+PHNwYW4+e3sgbGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KG1hdGNoPy5kYXRhPy5zdGFydERhdGUsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgbGFiZWxzLmVuZERhdGUgfX06IDwvc3BhblxuICAgICAgICAgICAgPjxzcGFuPnt7IGxhYmVscy5mb3JtYXREYXRlV2l0aEZvcm1hdChtYXRjaD8uZGF0YT8uZW5kRGF0ZSwgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0pIH19PC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XG4gICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiBtYXRjaGVzPy5sZW5ndGggPiAwXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9ub3ZvLWxpc3Q+XG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1sb2FkZXJcIiAqbmdJZj1cImlzTG9hZGluZyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gMFwiPjxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+PC9kaXY+XG4gICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVycm9yIH19PC9wPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGwtcmVzdWx0c1wiICpuZ0lmPVwiaGFzTm9uRXJyb3JNZXNzYWdlXCI+e3sgZ2V0RW1wdHlNZXNzYWdlKCkgfX08L3A+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzIGV4dGVuZHMgUGlja2VyUmVzdWx0cyB7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIGxhYmVscywgcmVmKTtcbiAgfVxuXG4gIHNhbml0aXplSFRNTChjb21wQ29kZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoYCR7Y29tcENvZGV9IHwgJHtuYW1lfWApO1xuICB9XG59XG4iXX0=