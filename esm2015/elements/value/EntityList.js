// NG2
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./Render";
function EntityList_div_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 4);
    i0.ɵɵlistener("click", function EntityList_div_0_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r7); const entity_r1 = i0.ɵɵnextContext().$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.openLink(entity_r1); });
    i0.ɵɵelement(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "render");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("bhi-circle ", entity_r1.class, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(3, 4, entity_r1, ctx_r2.metaDisplay), " ");
} }
function EntityList_div_0_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "render");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("bhi-circle ", entity_r1.class, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(3, 4, entity_r1, ctx_r3.metaDisplay), " ");
} }
function EntityList_div_0_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "render");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 1, entity_r1, ctx_r4.metaDisplay), " ");
} }
function EntityList_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, EntityList_div_0_a_1_Template, 4, 7, "a", 2);
    i0.ɵɵtemplate(2, EntityList_div_0_span_2_Template, 4, 7, "span", 3);
    i0.ɵɵtemplate(3, EntityList_div_0_span_3_Template, 3, 4, "span", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entity_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", entity_r1.isLinkable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !entity_r1.isLinkable && entity_r1.personSubtype);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !entity_r1.isLinkable && !entity_r1.personSubtype);
} }
export class EntityList {
    constructor() {
        this.baseEntity = '';
        this.ENTITY_SHORT_NAMES = {
            Lead: 'lead',
            ClientContact: 'contact',
            ClientContact1: 'contact',
            ClientContact2: 'contact',
            ClientContact3: 'contact',
            ClientContact4: 'contact',
            ClientContact5: 'contact',
            ClientCorporation: 'company',
            ClientCorporation1: 'company',
            ClientCorporation2: 'company',
            ClientCorporation3: 'company',
            ClientCorporation4: 'company',
            ClientCorporation5: 'company',
            Opportunity: 'opportunity',
            Task: 'task',
            Note: 'note',
            CorporateUser: 'user',
            Candidate: 'candidate',
            JobOrder: 'job',
            JobOrder1: 'job',
            JobOrder2: 'job',
            JobOrder3: 'job',
            JobOrder4: 'job',
            JobOrder5: 'job',
            Placement: 'placement',
            JobSubmission: 'submission',
            CandidateReference: 'references',
            DistributionList: 'distributionList',
            Appointment: 'appointment',
        };
    }
    ngOnInit() {
        // use a local copy of the meta to set the type to TO_ONE for proper display
        // without changing the input object
        this.metaDisplay = Helpers.deepClone(this.meta);
        this.metaDisplay.type = 'TO_ONE';
        this.baseEntity = this.meta.associatedEntity.entity;
        for (const entity of this.data.data) {
            entity.isLinkable = this.isLinkable(entity);
            entity.class = this.getClass(entity);
        }
    }
    getClass(entity) {
        return this.ENTITY_SHORT_NAMES[entity.personSubtype];
    }
    openLink(entity) {
        entity.openLink(entity);
    }
    isLinkable(entity) {
        return entity.openLink;
    }
}
EntityList.ɵfac = function EntityList_Factory(t) { return new (t || EntityList)(); };
EntityList.ɵcmp = i0.ɵɵdefineComponent({ type: EntityList, selectors: [["novo-entity-list"]], inputs: { data: "data", meta: "meta" }, decls: 1, vars: 1, consts: [["class", "entity", 4, "ngFor", "ngForOf"], [1, "entity"], [3, "click", 4, "ngIf"], [4, "ngIf"], [3, "click"]], template: function EntityList_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, EntityList_div_0_Template, 4, 3, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.data.data);
    } }, directives: [i1.NgForOf, i1.NgIf], pipes: [i2.RenderPipe], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(EntityList, [{
        type: Component,
        args: [{
                selector: 'novo-entity-list',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngFor="let entity of data.data" class="entity">
      <a *ngIf="entity.isLinkable" (click)="openLink(entity)">
        <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render: metaDisplay }}
      </a>
      <span *ngIf="!entity.isLinkable && entity.personSubtype">
        <i class="bhi-circle {{ entity.class }}"></i>{{ entity | render: metaDisplay }}
      </span>
      <span *ngIf="!entity.isLinkable && !entity.personSubtype">
        {{ entity | render: metaDisplay }}
      </span>
    </div>
  `,
            }]
    }], function () { return []; }, { data: [{
            type: Input
        }], meta: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5TGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy92YWx1ZS9FbnRpdHlMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztJQU94Qyw0QkFDRTtJQUQyQixvT0FBMEI7SUFDckQsb0JBQTZDO0lBQUEsWUFDL0M7O0lBQUEsaUJBQUk7Ozs7SUFEQyxlQUFxQztJQUFyQyw2REFBcUM7SUFBSyxlQUMvQztJQUQrQyxtRkFDL0M7OztJQUNBLDRCQUNFO0lBQUEsb0JBQTZDO0lBQUEsWUFDL0M7O0lBQUEsaUJBQU87Ozs7SUFERixlQUFxQztJQUFyQyw2REFBcUM7SUFBSyxlQUMvQztJQUQrQyxtRkFDL0M7OztJQUNBLDRCQUNFO0lBQUEsWUFDRjs7SUFBQSxpQkFBTzs7OztJQURMLGVBQ0Y7SUFERSxvRkFDRjs7O0lBVEYsOEJBQ0U7SUFBQSw2REFDRTtJQUVGLG1FQUNFO0lBRUYsbUVBQ0U7SUFFSixpQkFBTTs7O0lBVEQsZUFBeUI7SUFBekIsMkNBQXlCO0lBR3RCLGVBQWtEO0lBQWxELHVFQUFrRDtJQUdsRCxlQUFtRDtJQUFuRCx3RUFBbUQ7O0FBTS9ELE1BQU0sT0FBTyxVQUFVO0lBdUNyQjtRQWxDQSxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLHVCQUFrQixHQUFRO1lBQ3hCLElBQUksRUFBRSxNQUFNO1lBQ1osYUFBYSxFQUFFLFNBQVM7WUFDeEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsY0FBYyxFQUFFLFNBQVM7WUFDekIsaUJBQWlCLEVBQUUsU0FBUztZQUM1QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0Isa0JBQWtCLEVBQUUsU0FBUztZQUM3QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsV0FBVyxFQUFFLGFBQWE7WUFDMUIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLFNBQVMsRUFBRSxXQUFXO1lBQ3RCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsYUFBYSxFQUFFLFlBQVk7WUFDM0Isa0JBQWtCLEVBQUUsWUFBWTtZQUNoQyxnQkFBZ0IsRUFBRSxrQkFBa0I7WUFDcEMsV0FBVyxFQUFFLGFBQWE7U0FDM0IsQ0FBQztJQUVhLENBQUM7SUFFaEIsUUFBUTtRQUNOLDRFQUE0RTtRQUM1RSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztRQUNwRCxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxRQUFRLENBQUMsTUFBVztRQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7b0VBL0RVLFVBQVU7K0NBQVYsVUFBVTtRQWJuQiwyREFDRTs7UUFERyx1Q0FBZ0M7O2tEQWE1QixVQUFVO2NBakJ0QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7YUFDRjtzQ0FHQyxJQUFJO2tCQURILEtBQUs7WUFHTixJQUFJO2tCQURILEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1lbnRpdHktbGlzdCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGVudGl0eSBvZiBkYXRhLmRhdGFcIiBjbGFzcz1cImVudGl0eVwiPlxuICAgICAgPGEgKm5nSWY9XCJlbnRpdHkuaXNMaW5rYWJsZVwiIChjbGljayk9XCJvcGVuTGluayhlbnRpdHkpXCI+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLWNpcmNsZSB7eyBlbnRpdHkuY2xhc3MgfX1cIj48L2k+e3sgZW50aXR5IHwgcmVuZGVyOiBtZXRhRGlzcGxheSB9fVxuICAgICAgPC9hPlxuICAgICAgPHNwYW4gKm5nSWY9XCIhZW50aXR5LmlzTGlua2FibGUgJiYgZW50aXR5LnBlcnNvblN1YnR5cGVcIj5cbiAgICAgICAgPGkgY2xhc3M9XCJiaGktY2lyY2xlIHt7IGVudGl0eS5jbGFzcyB9fVwiPjwvaT57eyBlbnRpdHkgfCByZW5kZXI6IG1ldGFEaXNwbGF5IH19XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cIiFlbnRpdHkuaXNMaW5rYWJsZSAmJiAhZW50aXR5LnBlcnNvblN1YnR5cGVcIj5cbiAgICAgICAge3sgZW50aXR5IHwgcmVuZGVyOiBtZXRhRGlzcGxheSB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBFbnRpdHlMaXN0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgZGF0YTogYW55O1xuICBASW5wdXQoKVxuICBtZXRhOiBhbnk7XG4gIGJhc2VFbnRpdHk6IHN0cmluZyA9ICcnO1xuICBtZXRhRGlzcGxheTogYW55O1xuICBFTlRJVFlfU0hPUlRfTkFNRVM6IGFueSA9IHtcbiAgICBMZWFkOiAnbGVhZCcsXG4gICAgQ2xpZW50Q29udGFjdDogJ2NvbnRhY3QnLFxuICAgIENsaWVudENvbnRhY3QxOiAnY29udGFjdCcsXG4gICAgQ2xpZW50Q29udGFjdDI6ICdjb250YWN0JyxcbiAgICBDbGllbnRDb250YWN0MzogJ2NvbnRhY3QnLFxuICAgIENsaWVudENvbnRhY3Q0OiAnY29udGFjdCcsXG4gICAgQ2xpZW50Q29udGFjdDU6ICdjb250YWN0JyxcbiAgICBDbGllbnRDb3Jwb3JhdGlvbjogJ2NvbXBhbnknLFxuICAgIENsaWVudENvcnBvcmF0aW9uMTogJ2NvbXBhbnknLFxuICAgIENsaWVudENvcnBvcmF0aW9uMjogJ2NvbXBhbnknLFxuICAgIENsaWVudENvcnBvcmF0aW9uMzogJ2NvbXBhbnknLFxuICAgIENsaWVudENvcnBvcmF0aW9uNDogJ2NvbXBhbnknLFxuICAgIENsaWVudENvcnBvcmF0aW9uNTogJ2NvbXBhbnknLFxuICAgIE9wcG9ydHVuaXR5OiAnb3Bwb3J0dW5pdHknLFxuICAgIFRhc2s6ICd0YXNrJyxcbiAgICBOb3RlOiAnbm90ZScsXG4gICAgQ29ycG9yYXRlVXNlcjogJ3VzZXInLFxuICAgIENhbmRpZGF0ZTogJ2NhbmRpZGF0ZScsXG4gICAgSm9iT3JkZXI6ICdqb2InLFxuICAgIEpvYk9yZGVyMTogJ2pvYicsXG4gICAgSm9iT3JkZXIyOiAnam9iJyxcbiAgICBKb2JPcmRlcjM6ICdqb2InLFxuICAgIEpvYk9yZGVyNDogJ2pvYicsXG4gICAgSm9iT3JkZXI1OiAnam9iJyxcbiAgICBQbGFjZW1lbnQ6ICdwbGFjZW1lbnQnLFxuICAgIEpvYlN1Ym1pc3Npb246ICdzdWJtaXNzaW9uJyxcbiAgICBDYW5kaWRhdGVSZWZlcmVuY2U6ICdyZWZlcmVuY2VzJyxcbiAgICBEaXN0cmlidXRpb25MaXN0OiAnZGlzdHJpYnV0aW9uTGlzdCcsXG4gICAgQXBwb2ludG1lbnQ6ICdhcHBvaW50bWVudCcsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IGFueSB7XG4gICAgLy8gdXNlIGEgbG9jYWwgY29weSBvZiB0aGUgbWV0YSB0byBzZXQgdGhlIHR5cGUgdG8gVE9fT05FIGZvciBwcm9wZXIgZGlzcGxheVxuICAgIC8vIHdpdGhvdXQgY2hhbmdpbmcgdGhlIGlucHV0IG9iamVjdFxuICAgIHRoaXMubWV0YURpc3BsYXkgPSBIZWxwZXJzLmRlZXBDbG9uZSh0aGlzLm1ldGEpO1xuICAgIHRoaXMubWV0YURpc3BsYXkudHlwZSA9ICdUT19PTkUnO1xuICAgIHRoaXMuYmFzZUVudGl0eSA9IHRoaXMubWV0YS5hc3NvY2lhdGVkRW50aXR5LmVudGl0eTtcbiAgICBmb3IgKGNvbnN0IGVudGl0eSBvZiB0aGlzLmRhdGEuZGF0YSkge1xuICAgICAgZW50aXR5LmlzTGlua2FibGUgPSB0aGlzLmlzTGlua2FibGUoZW50aXR5KTtcbiAgICAgIGVudGl0eS5jbGFzcyA9IHRoaXMuZ2V0Q2xhc3MoZW50aXR5KTtcbiAgICB9XG4gIH1cblxuICBnZXRDbGFzcyhlbnRpdHk6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuRU5USVRZX1NIT1JUX05BTUVTW2VudGl0eS5wZXJzb25TdWJ0eXBlXTtcbiAgfVxuXG4gIG9wZW5MaW5rKGVudGl0eTogYW55KTogdm9pZCB7XG4gICAgZW50aXR5Lm9wZW5MaW5rKGVudGl0eSk7XG4gIH1cblxuICBpc0xpbmthYmxlKGVudGl0eTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVudGl0eS5vcGVuTGluaztcbiAgfVxufVxuIl19