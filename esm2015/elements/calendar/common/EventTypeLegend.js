import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../pipes/group-by/GroupBy";
function NovoEventTypeLegendElement_ng_template_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵlistener("click", function NovoEventTypeLegendElement_ng_template_0_div_1_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r6); const type_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(2); $event.stopPropagation(); return ctx_r5.eventTypeClicked.emit({ event: type_r4 == null ? null : type_r4.key }); });
    i0.ɵɵelement(1, "div", 5);
    i0.ɵɵelementStart(2, "div");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(type_r4 == null ? null : type_r4.key);
} }
function NovoEventTypeLegendElement_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, NovoEventTypeLegendElement_ng_template_0_div_1_Template, 4, 1, "div", 3);
    i0.ɵɵpipe(2, "groupBy");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(2, 1, ctx_r1.events, "type"));
} }
function NovoEventTypeLegendElement_ng_template_2_Template(rf, ctx) { }
const _c0 = function (a0, a1) { return { events: a0, eventTypeClicked: a1 }; };
export class NovoEventTypeLegendElement {
    constructor() {
        this.eventTypeClicked = new EventEmitter();
    }
}
NovoEventTypeLegendElement.ɵfac = function NovoEventTypeLegendElement_Factory(t) { return new (t || NovoEventTypeLegendElement)(); };
NovoEventTypeLegendElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoEventTypeLegendElement, selectors: [["novo-event-type-legend"]], inputs: { events: "events", customTemplate: "customTemplate" }, outputs: { eventTypeClicked: "eventTypeClicked" }, decls: 3, vars: 5, consts: [["defaultTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "cal-event-legend"], ["class", "cal-event-type", 3, "click", 4, "ngFor", "ngForOf"], [1, "cal-event-type", 3, "click"], [1, "cal-event-type-swatch"]], template: function NovoEventTypeLegendElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoEventTypeLegendElement_ng_template_0_Template, 3, 4, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(2, NovoEventTypeLegendElement_ng_template_2_Template, 0, 0, "ng-template", 1);
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.customTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c0, ctx.events, ctx.eventTypeClicked));
    } }, directives: [i1.NgTemplateOutlet, i1.NgForOf], pipes: [i2.GroupByPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoEventTypeLegendElement, [{
        type: Component,
        args: [{
                selector: 'novo-event-type-legend',
                template: `
    <ng-template #defaultTemplate>
      <div class="cal-event-legend">
        <div
          class="cal-event-type"
          *ngFor="let type of events | groupBy: 'type'"
          (click)="$event.stopPropagation(); eventTypeClicked.emit({ event: type?.key })"
        >
          <div class="cal-event-type-swatch"></div>
          <div>{{ type?.key }}</div>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{ events: events, eventTypeClicked: eventTypeClicked }"
    >
    </ng-template>
  `,
            }]
    }], null, { events: [{
            type: Input
        }], customTemplate: [{
            type: Input
        }], eventTypeClicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRUeXBlTGVnZW5kLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NhbGVuZGFyL2NvbW1vbi9FdmVudFR5cGVMZWdlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztJQVE1RSw4QkFLRTtJQUZBLGlOQUFTLHdCQUF3QixTQUFFLDZFQUEyQyxJQUFDO0lBRS9FLHlCQUF5QztJQUN6QywyQkFBSztJQUFBLFlBQWU7SUFBQSxpQkFBTTtJQUM1QixpQkFBTTs7O0lBREMsZUFBZTtJQUFmLDBEQUFlOzs7SUFQeEIsOEJBQ0U7SUFBQSx5RkFLRTs7SUFHSixpQkFBTTs7O0lBTkYsZUFBNkM7SUFBN0MscUVBQTZDOzs7O0FBZXZELE1BQU0sT0FBTywwQkFBMEI7SUF0QnZDO1FBOEJFLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0tBQzFEOztvR0FUWSwwQkFBMEI7K0RBQTFCLDBCQUEwQjtRQW5CbkMsNEhBQ0U7UUFXRiwyRkFJQTs7O1FBSEUsZUFBc0Q7UUFBdEQsNERBQXNELHlGQUFBOztrREFNL0MsMEJBQTBCO2NBdEJ0QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQlQ7YUFDRjtnQkFHQyxNQUFNO2tCQURMLEtBQUs7WUFJTixjQUFjO2tCQURiLEtBQUs7WUFJTixnQkFBZ0I7a0JBRGYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NhbGVuZGFyLXV0aWxzL0NhbGVuZGFyVXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWV2ZW50LXR5cGUtbGVnZW5kJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtbGVnZW5kXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC10eXBlXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgdHlwZSBvZiBldmVudHMgfCBncm91cEJ5OiAndHlwZSdcIlxuICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50VHlwZUNsaWNrZWQuZW1pdCh7IGV2ZW50OiB0eXBlPy5rZXkgfSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudC10eXBlLXN3YXRjaFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXY+e3sgdHlwZT8ua2V5IH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBldmVudHM6IGV2ZW50cywgZXZlbnRUeXBlQ2xpY2tlZDogZXZlbnRUeXBlQ2xpY2tlZCB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0V2ZW50VHlwZUxlZ2VuZEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBldmVudHM6IENhbGVuZGFyRXZlbnRbXTtcblxuICBASW5wdXQoKVxuICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KClcbiAgZXZlbnRUeXBlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=