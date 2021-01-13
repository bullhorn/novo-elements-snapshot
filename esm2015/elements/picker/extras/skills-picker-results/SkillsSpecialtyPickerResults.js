// NG2
import { ChangeDetectorRef, Component, ElementRef, HostBinding } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
// App
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/novo-label-service";
import * as i2 from "@angular/common";
import * as i3 from "../../../loading/Loading";
import * as i4 from "../../../list/List";
function SkillsSpecialtyPickerResults_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4);
    i0.ɵɵelement(1, "novo-loading", 5);
    i0.ɵɵelementEnd();
} }
function SkillsSpecialtyPickerResults_novo_list_1_novo_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 10);
    i0.ɵɵlistener("click", function SkillsSpecialtyPickerResults_novo_list_1_novo_list_item_1_Template_novo_list_item_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.selectMatch($event); })("mouseenter", function SkillsSpecialtyPickerResults_novo_list_1_novo_list_item_1_Template_novo_list_item_mouseenter_0_listener() { i0.ɵɵrestoreView(_r9); const match_r7 = ctx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.selectActive(match_r7); });
    i0.ɵɵelementStart(1, "item-content");
    i0.ɵɵelementStart(2, "h6");
    i0.ɵɵelement(3, "span", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 12);
    i0.ɵɵelement(5, "i", 13);
    i0.ɵɵelement(6, "span", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r7 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", match_r7 === ctx_r4.activeMatch)("disabled", ctx_r4.preselected(match_r7));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHtml", ctx_r4.highlight(match_r7.label, ctx_r4.term), i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHtml", ctx_r4.highlight(match_r7.data.categories || match_r7.data.parentCategory.name, ctx_r4.term), i0.ɵɵsanitizeHtml);
} }
function SkillsSpecialtyPickerResults_novo_list_1_novo_list_item_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-list-item");
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r5.labels.showingXofXResults(ctx_r5.limit, ctx_r5.total));
} }
function SkillsSpecialtyPickerResults_novo_list_1_novo_loading_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-loading", 5);
} }
function SkillsSpecialtyPickerResults_novo_list_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "novo-list", 6);
    i0.ɵɵtemplate(1, SkillsSpecialtyPickerResults_novo_list_1_novo_list_item_1_Template, 7, 6, "novo-list-item", 7);
    i0.ɵɵtemplate(2, SkillsSpecialtyPickerResults_novo_list_1_novo_list_item_2_Template, 3, 1, "novo-list-item", 8);
    i0.ɵɵtemplate(3, SkillsSpecialtyPickerResults_novo_list_1_novo_loading_3_Template, 1, 0, "novo-loading", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.matches);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.limitedTo);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.isLoading && ctx_r1.matches.length > 0);
} }
function SkillsSpecialtyPickerResults_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.labels.pickerError);
} }
function SkillsSpecialtyPickerResults_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.labels.pickerEmpty);
} }
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
SkillsSpecialtyPickerResults.ɵfac = function SkillsSpecialtyPickerResults_Factory(t) { return new (t || SkillsSpecialtyPickerResults)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SkillsSpecialtyPickerResults.ɵcmp = i0.ɵɵdefineComponent({ type: SkillsSpecialtyPickerResults, selectors: [["skill-specialty-picker-results"]], hostVars: 2, hostBindings: function SkillsSpecialtyPickerResults_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("active", ctx.active);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 4, consts: [["class", "picker-loading", 4, "ngIf"], ["direction", "vertical", 4, "ngIf"], ["class", "picker-error", 4, "ngIf"], ["class", "picker-null", 4, "ngIf"], [1, "picker-loading"], ["theme", "line"], ["direction", "vertical"], [3, "active", "disabled", "click", "mouseenter", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["theme", "line", 4, "ngIf"], [3, "click", "mouseenter"], [3, "innerHtml"], [1, "category"], [1, "bhi-category-tags"], [1, "picker-error"], [1, "picker-null"]], template: function SkillsSpecialtyPickerResults_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SkillsSpecialtyPickerResults_section_0_Template, 2, 0, "section", 0);
        i0.ɵɵtemplate(1, SkillsSpecialtyPickerResults_novo_list_1_Template, 4, 3, "novo-list", 1);
        i0.ɵɵtemplate(2, SkillsSpecialtyPickerResults_p_2_Template, 2, 1, "p", 2);
        i0.ɵɵtemplate(3, SkillsSpecialtyPickerResults_p_3_Template, 2, 1, "p", 3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isLoading && !(ctx.matches == null ? null : ctx.matches.length));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.matches.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.matches.length && !ctx.hasError);
    } }, directives: [i2.NgIf, i3.NovoLoadingElement, i4.NovoListElement, i2.NgForOf, i4.NovoListItemElement, i4.NovoItemContentElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SkillsSpecialtyPickerResults, [{
        type: Component,
        args: [{
                selector: 'skill-specialty-picker-results',
                template: `
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
          <h6><span [innerHtml]="highlight(match.label, term)"></span></h6>
          <div class="category">
            <i class="bhi-category-tags"></i
            ><span [innerHtml]="highlight(match.data.categories || match.data.parentCategory.name, term)"></span>
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
  `,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, { active: [{
            type: HostBinding,
            args: ['class.active']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS90cmF2aXMvYnVpbGQvYnVsbGhvcm4vbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BpY2tlci9leHRyYXMvc2tpbGxzLXBpY2tlci1yZXN1bHRzL1NraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7Ozs7SUFLekUsa0NBQXNFO0lBQUEsa0NBQTBDO0lBQUEsaUJBQVU7Ozs7SUFFeEgsMENBT0U7SUFMQSw2T0FBNkIseVFBQUE7SUFLN0Isb0NBQ0U7SUFBQSwwQkFBSTtJQUFBLDJCQUF3RDtJQUFBLGlCQUFLO0lBQ2pFLCtCQUNFO0lBQUEsd0JBQ0M7SUFBQSwyQkFBb0c7SUFDdkcsaUJBQU07SUFDUixpQkFBZTtJQUNqQixpQkFBaUI7Ozs7SUFYZix5REFBc0MsMENBQUE7SUFLMUIsZUFBMEM7SUFBMUMsNEZBQTBDO0lBRzNDLGVBQXNGO0lBQXRGLDJJQUFzRjs7O0lBSW5HLHNDQUNHO0lBQUEsMkJBQUs7SUFBQSxZQUE2QztJQUFBLGlCQUFNO0lBQUEsaUJBQzFEOzs7SUFETyxlQUE2QztJQUE3QyxrRkFBNkM7OztJQUVyRCxrQ0FBa0Y7OztJQW5CcEYsb0NBQ0U7SUFBQSwrR0FPRTtJQVFGLCtHQUNHO0lBRUgsMkdBQW1FO0lBQ3JFLGlCQUFZOzs7SUFsQlIsZUFBNkI7SUFBN0Isd0NBQTZCO0lBY2YsZUFBaUI7SUFBakIsdUNBQWlCO0lBR04sZUFBdUM7SUFBdkMsb0VBQXVDOzs7SUFFcEUsNkJBQXlDO0lBQUEsWUFBd0I7SUFBQSxpQkFBSTs7O0lBQTVCLGVBQXdCO0lBQXhCLCtDQUF3Qjs7O0lBQ2pFLDZCQUEwRTtJQUFBLFlBQXdCO0lBQUEsaUJBQUk7OztJQUE1QixlQUF3QjtJQUF4QiwrQ0FBd0I7O0FBR3RHLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxpQkFBaUI7SUFPakUsWUFBbUIsT0FBbUIsRUFBUyxNQUF3QixFQUFFLEdBQXNCO1FBQzdGLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFESCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFMdkUsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFVBQUssR0FBVyxHQUFHLENBQUM7SUFLcEIsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsY0FBYyxDQUFDLFVBQWU7UUFDNUIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQzlCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7d0dBbENVLDRCQUE0QjtpRUFBNUIsNEJBQTRCOzs7UUExQnJDLHFGQUFzRTtRQUN0RSx5RkFDRTtRQW9CRix5RUFBeUM7UUFDekMseUVBQTBFOztRQXZCMUMsMEZBQXFDO1FBQzFELGVBQTBCO1FBQTFCLDZDQUEwQjtRQXFCYixlQUFnQjtRQUFoQixtQ0FBZ0I7UUFDakIsZUFBa0Q7UUFBbEQsNkVBQWtEOztrREFHaEUsNEJBQTRCO2NBN0J4QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUO2FBQ0Y7NEhBR0MsTUFBTTtrQkFETCxXQUFXO21CQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbi8vIEFwcFxuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL0Jhc2VQaWNrZXJSZXN1bHRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2tpbGwtc3BlY2lhbHR5LXBpY2tlci1yZXN1bHRzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VjdGlvbiBjbGFzcz1cInBpY2tlci1sb2FkaW5nXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgIW1hdGNoZXM/Lmxlbmd0aFwiPjxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCI+PC9ub3ZvLWxvYWRpbmc+PC9zZWN0aW9uPlxuICAgIDxub3ZvLWxpc3QgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtXG4gICAgICAgICpuZ0Zvcj1cImxldCBtYXRjaCBvZiBtYXRjaGVzXCJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudClcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJlc2VsZWN0ZWQobWF0Y2gpXCJcbiAgICAgID5cbiAgICAgICAgPGl0ZW0tY29udGVudD5cbiAgICAgICAgICA8aDY+PHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2gubGFiZWwsIHRlcm0pXCI+PC9zcGFuPjwvaDY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5XCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImJoaS1jYXRlZ29yeS10YWdzXCI+PC9pXG4gICAgICAgICAgICA+PHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2guZGF0YS5jYXRlZ29yaWVzIHx8IG1hdGNoLmRhdGEucGFyZW50Q2F0ZWdvcnkubmFtZSwgdGVybSlcIj48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvaXRlbS1jb250ZW50PlxuICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cbiAgICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdJZj1cImxpbWl0ZWRUb1wiXG4gICAgICAgID48ZGl2Pnt7IGxhYmVscy5zaG93aW5nWG9mWFJlc3VsdHMobGltaXQsIHRvdGFsKSB9fTwvZGl2Pjwvbm92by1saXN0LWl0ZW1cbiAgICAgID5cbiAgICAgIDxub3ZvLWxvYWRpbmcgdGhlbWU9XCJsaW5lXCIgKm5nSWY9XCJpc0xvYWRpbmcgJiYgbWF0Y2hlcy5sZW5ndGggPiAwXCI+PC9ub3ZvLWxvYWRpbmc+XG4gICAgPC9ub3ZvLWxpc3Q+XG4gICAgPHAgY2xhc3M9XCJwaWNrZXItZXJyb3JcIiAqbmdJZj1cImhhc0Vycm9yXCI+e3sgbGFiZWxzLnBpY2tlckVycm9yIH19PC9wPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLW51bGxcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvcD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBsaW1pdGVkVG86IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGltaXQ6IG51bWJlciA9IDIwMDtcbiAgdG90YWw6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBnZXRMaXN0RWxlbWVudCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdub3ZvLWxpc3QnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBzdHJ1Y3R1cmVBcnJheVxuICAgKiBAcGFyYW0gY29sbGVjdGlvbiAtIHRoZSBkYXRhIG9uY2UgZ2V0RGF0YSByZXNvbHZlcyBpdFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzdHJ1Y3R1cmVzIGFuIGFycmF5IG9mIG5vZGVzIGludG8gYW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIGFcbiAgICogJ25hbWUnIGZpZWxkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdHJ1Y3R1cmVBcnJheShjb2xsZWN0aW9uOiBhbnkpOiBhbnkge1xuICAgIGxldCBkYXRhID0gY29sbGVjdGlvbjtcbiAgICBpZiAoY29sbGVjdGlvbi5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XG4gICAgICB0aGlzLmxpbWl0ZWRUbyA9IGNvbGxlY3Rpb24ubGltaXRlZFRvMjAwO1xuICAgICAgdGhpcy50b3RhbCA9IGNvbGxlY3Rpb24udG90YWw7XG4gICAgICBkYXRhID0gY29sbGVjdGlvbi5kYXRhO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPiB0aGlzLmxpbWl0KSB7XG4gICAgICB0aGlzLmxpbWl0ZWRUbyA9IHRydWU7XG4gICAgICB0aGlzLnRvdGFsID0gZGF0YS5sZW5ndGg7XG4gICAgICBkYXRhID0gZGF0YS5zbGljZSgwLCB0aGlzLmxpbWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnN0cnVjdHVyZUFycmF5KGRhdGEpO1xuICB9XG59XG4iXX0=