// NG2
import { Component, ElementRef, ChangeDetectorRef, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Vendor
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
export class WorkersCompCodesPickerResults extends BasePickerResults {
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
    sanitizeHTML(compCode, name) {
        return this.sanitizer.bypassSecurityTrustHtml(`${compCode} | ${name}`);
    }
}
WorkersCompCodesPickerResults.decorators = [
    { type: Component, args: [{
                selector: 'workers-comp-codes-picker-results',
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
  `
            },] }
];
WorkersCompCodesPickerResults.ctorParameters = () => [
    { type: ElementRef },
    { type: DomSanitizer },
    { type: NovoLabelService },
    { type: ChangeDetectorRef }
];
WorkersCompCodesPickerResults.propDecorators = {
    active: [{ type: HostBinding, args: ['class.active',] }],
    isHidden: [{ type: HostBinding, args: ['hidden',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BpY2tlci9leHRyYXMvd29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzL1dvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELFNBQVM7QUFDVCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQTRDM0UsTUFBTSxPQUFPLDZCQUE4QixTQUFRLGlCQUFpQjtJQVFsRSxZQUFZLE9BQW1CLEVBQVUsU0FBdUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQ3ZILEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFEbUIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTmpHLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFRckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQVJELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFPRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFnQixFQUFFLElBQVk7UUFDekMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsUUFBUSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7O1lBN0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUNBQW1DO2dCQUM3QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUO2FBQ0Y7OztZQS9DbUIsVUFBVTtZQUNyQixZQUFZO1lBR1osZ0JBQWdCO1lBSk8saUJBQWlCOzs7cUJBaUQ5QyxXQUFXLFNBQUMsY0FBYzt1QkFFMUIsV0FBVyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbi8vIFZlbmRvclxyXG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uL2Jhc2UtcGlja2VyLXJlc3VsdHMvQmFzZVBpY2tlclJlc3VsdHMnO1xyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnd29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJwaWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nICYmICFtYXRjaGVzPy5sZW5ndGhcIj5cclxuICAgICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIj48L25vdm8tbG9hZGluZz5cclxuICAgIDwvc2VjdGlvbj5cclxuICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIiAqbmdJZj1cIm1hdGNoZXM/Lmxlbmd0aCA+IDAgJiYgIWhhc0Vycm9yXCI+XHJcbiAgICAgIDxub3ZvLWxpc3QtaXRlbVxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2goJGV2ZW50KVwiXHJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxyXG4gICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxyXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmVzZWxlY3RlZChtYXRjaClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGl0ZW0taGVhZGVyPlxyXG4gICAgICAgICAgPGl0ZW0tdGl0bGU+XHJcbiAgICAgICAgICAgIDxzcGFuIFtpbm5lckh0bWxdPVwic2FuaXRpemVIVE1MKG1hdGNoPy5kYXRhPy5jb21wZW5zYXRpb24/LmNvZGUsIG1hdGNoPy5kYXRhPy5jb21wZW5zYXRpb24/Lm5hbWUpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgPC9pdGVtLXRpdGxlPlxyXG4gICAgICAgIDwvaXRlbS1oZWFkZXI+XHJcbiAgICAgICAgPGl0ZW0tY29udGVudCBkaXJlY3Rpb249XCJob3Jpem9udGFsXCI+XHJcbiAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7IGxhYmVscy5zdGF0ZSB9fTogPC9zcGFuPjxzcGFuPnt7IG1hdGNoPy5kYXRhPy5jb21wZW5zYXRpb24/LnN0YXRlIH19PC9zcGFuPlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57eyBsYWJlbHMucmF0ZSB9fTogPC9zcGFuPjxzcGFuPnt7IGxhYmVscy5mb3JtYXRDdXJyZW5jeShtYXRjaD8uZGF0YT8ucmF0ZSkgfX08L3NwYW4+XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XHJcbiAgICAgICAgPGl0ZW0tY29udGVudCBkaXJlY3Rpb249XCJob3Jpem9udGFsXCI+XHJcbiAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7IGxhYmVscy5zdGFydERhdGUgfX06IDwvc3BhblxyXG4gICAgICAgICAgICA+PHNwYW4+e3sgbGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KG1hdGNoPy5kYXRhPy5zdGFydERhdGUsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9KSB9fTwvc3Bhbj5cclxuICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3sgbGFiZWxzLmVuZERhdGUgfX06IDwvc3BhblxyXG4gICAgICAgICAgICA+PHNwYW4+e3sgbGFiZWxzLmZvcm1hdERhdGVXaXRoRm9ybWF0KG1hdGNoPy5kYXRhPy5lbmREYXRlLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSkgfX08L3NwYW4+XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9pdGVtLWNvbnRlbnQ+XHJcbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XHJcbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcz8ubGVuZ3RoID4gMFwiPjwvbm92by1sb2FkaW5nPlxyXG4gICAgPC9ub3ZvLWxpc3Q+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzIGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMge1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcclxuICBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBIb3N0QmluZGluZygnaGlkZGVuJylcclxuICBnZXQgaXNIaWRkZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XHJcbiAgICB0aGlzLnNhbml0aXplciA9IHNhbml0aXplcjtcclxuICB9XHJcblxyXG4gIGdldExpc3RFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tbGlzdCcpO1xyXG4gIH1cclxuXHJcbiAgc2FuaXRpemVIVE1MKGNvbXBDb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGAke2NvbXBDb2RlfSB8ICR7bmFtZX1gKTtcclxuICB9XHJcbn1cclxuIl19