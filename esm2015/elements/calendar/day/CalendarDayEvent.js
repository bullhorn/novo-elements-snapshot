import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../tooltip/Tooltip.directive";
function NovoCalendarDayEventElement_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function NovoCalendarDayEventElement_ng_template_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.eventClicked.emit({ event: ctx_r3.dayEvent.event }); });
    i0.ɵɵelement(1, "div", 3);
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 6);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("border-color", ctx_r1.dayEvent.event.color.secondary);
    i0.ɵɵclassProp("cal-starts-within-day", !ctx_r1.dayEvent.startsBeforeDay)("cal-ends-within-day", !ctx_r1.dayEvent.endsAfterDay);
    i0.ɵɵproperty("ngClass", ctx_r1.dayEvent.event.cssClass)("tooltip", ctx_r1.dayEvent.event.description)("tooltipPosition", ctx_r1.tooltipPosition);
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("background-color", ctx_r1.dayEvent.event.color.primary);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.dayEvent.event.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.dayEvent.event == null ? null : ctx_r1.dayEvent.event.description);
} }
function NovoCalendarDayEventElement_ng_template_2_Template(rf, ctx) { }
const _c0 = function (a0, a1, a2) { return { dayEvent: a0, tooltipPosition: a1, eventClicked: a2 }; };
export class NovoCalendarDayEventElement {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
NovoCalendarDayEventElement.ɵfac = function NovoCalendarDayEventElement_Factory(t) { return new (t || NovoCalendarDayEventElement)(); };
NovoCalendarDayEventElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoCalendarDayEventElement, selectors: [["novo-calendar-day-event"]], inputs: { dayEvent: "dayEvent", tooltipPosition: "tooltipPosition", customTemplate: "customTemplate" }, outputs: { eventClicked: "eventClicked" }, decls: 3, vars: 6, consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-event", 3, "ngClass", "tooltip", "tooltipPosition", "click"], [1, "cal-event-ribbon"], [1, "cal-event-group"], [1, "cal-event-title"], [1, "cal-event-description"]], template: function NovoCalendarDayEventElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoCalendarDayEventElement_ng_template_0_Template, 7, 13, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(2, NovoCalendarDayEventElement_ng_template_2_Template, 0, 0, "ng-template", 1);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c0, ctx.dayEvent, ctx.tooltipPosition, ctx.eventClicked));
    } }, directives: [i1.NgTemplateOutlet, i1.NgClass, i2.TooltipDirective], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoCalendarDayEventElement, [{
        type: Component,
        args: [{
                selector: 'novo-calendar-day-event',
                template: `
    <ng-template #defaultTemplate>
      <div
        class="cal-event"
        [style.borderColor]="dayEvent.event.color.secondary"
        [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
        [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
        [ngClass]="dayEvent.event.cssClass"
        [tooltip]="dayEvent.event.description"
        [tooltipPosition]="tooltipPosition"
        (click)="eventClicked.emit({ event: dayEvent.event })"
      >
        <div class="cal-event-ribbon" [style.backgroundColor]="dayEvent.event.color.primary"></div>
        <div class="cal-event-group">
          <div class="cal-event-title">{{ dayEvent.event.title }}</div>
          <div class="cal-event-description">{{ dayEvent.event?.description }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ dayEvent: dayEvent, tooltipPosition: tooltipPosition, eventClicked: eventClicked }"
    >
    </ng-template>
  `,
            }]
    }], null, { dayEvent: [{
            type: Input
        }], tooltipPosition: [{
            type: Input
        }], customTemplate: [{
            type: Input
        }], eventClicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJEYXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jYWxlbmRhci9kYXkvQ2FsZW5kYXJEYXlFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lBTzlFLDhCQVVFO0lBRkEsNktBQVMsMERBQTRDLElBQUM7SUFFdEQseUJBQTJGO0lBQzNGLDhCQUNFO0lBQUEsOEJBQTZCO0lBQUEsWUFBMEI7SUFBQSxpQkFBTTtJQUM3RCw4QkFBbUM7SUFBQSxZQUFpQztJQUFBLGlCQUFNO0lBQzVFLGlCQUFNO0lBQ1IsaUJBQU07OztJQWJKLHFFQUFvRDtJQUNwRCx5RUFBeUQsc0RBQUE7SUFFekQsd0RBQW1DLDhDQUFBLDJDQUFBO0lBS0wsZUFBc0Q7SUFBdEQsdUVBQXNEO0lBRXJELGVBQTBCO0lBQTFCLGlEQUEwQjtJQUNwQixlQUFpQztJQUFqQyw4RkFBaUM7Ozs7QUFXOUUsTUFBTSxPQUFPLDJCQUEyQjtJQTVCeEM7UUF1Q0UsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQUN0RDs7c0dBWlksMkJBQTJCO2dFQUEzQiwyQkFBMkI7UUF6QnBDLDhIQUNFO1FBaUJGLDRGQUlBOzs7UUFIRSxlQUFzRDtRQUF0RCw0REFBc0QsNEdBQUE7O2tEQU0vQywyQkFBMkI7Y0E1QnZDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCVDthQUNGO2dCQUdDLFFBQVE7a0JBRFAsS0FBSztZQUlOLGVBQWU7a0JBRGQsS0FBSztZQUlOLGNBQWM7a0JBRGIsS0FBSztZQUlOLFlBQVk7a0JBRFgsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF5Vmlld0V2ZW50IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvY2FsZW5kYXItdXRpbHMvQ2FsZW5kYXJVdGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY2FsZW5kYXItZGF5LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICBbc3R5bGUuYm9yZGVyQ29sb3JdPVwiZGF5RXZlbnQuZXZlbnQuY29sb3Iuc2Vjb25kYXJ5XCJcbiAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuc3RhcnRzQmVmb3JlRGF5XCJcbiAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi1kYXldPVwiIWRheUV2ZW50LmVuZHNBZnRlckRheVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImRheUV2ZW50LmV2ZW50LmNzc0NsYXNzXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiZGF5RXZlbnQuZXZlbnQuZGVzY3JpcHRpb25cIlxuICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgIChjbGljayk9XCJldmVudENsaWNrZWQuZW1pdCh7IGV2ZW50OiBkYXlFdmVudC5ldmVudCB9KVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtcmliYm9uXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJkYXlFdmVudC5ldmVudC5jb2xvci5wcmltYXJ5XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtZ3JvdXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50LXRpdGxlXCI+e3sgZGF5RXZlbnQuZXZlbnQudGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50LWRlc2NyaXB0aW9uXCI+e3sgZGF5RXZlbnQuZXZlbnQ/LmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBkYXlFdmVudDogZGF5RXZlbnQsIHRvb2x0aXBQb3NpdGlvbjogdG9vbHRpcFBvc2l0aW9uLCBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhbGVuZGFyRGF5RXZlbnRFbGVtZW50IHtcbiAgQElucHV0KClcbiAgZGF5RXZlbnQ6IERheVZpZXdFdmVudDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwUG9zaXRpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==