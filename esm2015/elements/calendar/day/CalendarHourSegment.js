import { Component, Input, TemplateRef } from '@angular/core';
export class NovoCalendarHourSegmentElement {
}
NovoCalendarHourSegmentElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-calendar-day-hour-segment',
                template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-hour-segment"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass">
        <div class="cal-time">
          {{ segment.date | hours:locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }">
    </ng-template>
  `
            },] }
];
NovoCalendarHourSegmentElement.propDecorators = {
    segment: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJIb3VyU2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY2FsZW5kYXIvZGF5L0NhbGVuZGFySG91clNlZ21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBMEI5RCxNQUFNLE9BQU8sOEJBQThCOzs7WUF2QjFDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7YUFDRjs7O3NCQUVFLEtBQUs7cUJBR0wsS0FBSzs2QkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF5Vmlld0hvdXJTZWdtZW50IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2FsZW5kYXItdXRpbHMvQ2FsZW5kYXJVdGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItZGF5LWhvdXItc2VnbWVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJjYWwtaG91ci1zZWdtZW50XCJcclxuICAgICAgICBbY2xhc3MuY2FsLWhvdXItc3RhcnRdPVwic2VnbWVudC5pc1N0YXJ0XCJcclxuICAgICAgICBbY2xhc3MuY2FsLWFmdGVyLWhvdXItc3RhcnRdPVwiIXNlZ21lbnQuaXNTdGFydFwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwic2VnbWVudC5jc3NDbGFzc1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZVwiPlxyXG4gICAgICAgICAge3sgc2VnbWVudC5kYXRlIHwgaG91cnM6bG9jYWxlIH19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxyXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgIHNlZ21lbnQ6IHNlZ21lbnQsXHJcbiAgICAgICAgbG9jYWxlOiBsb2NhbGVcclxuICAgICAgfVwiPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFySG91clNlZ21lbnRFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudDtcclxuXHJcbiAgQElucHV0KClcclxuICBsb2NhbGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxufVxyXG4iXX0=