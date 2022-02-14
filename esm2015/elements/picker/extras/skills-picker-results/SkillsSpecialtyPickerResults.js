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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9waWNrZXIvZXh0cmFzL3NraWxscy1waWNrZXItcmVzdWx0cy9Ta2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0UsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7O0lBS3pFLGtDQUFzRTtJQUFBLGtDQUEwQztJQUFBLGlCQUFVOzs7O0lBRXhILDBDQU9FO0lBTEEsNk9BQTZCLHlRQUFBO0lBSzdCLG9DQUNFO0lBQUEsMEJBQUk7SUFBQSwyQkFBd0Q7SUFBQSxpQkFBSztJQUNqRSwrQkFDRTtJQUFBLHdCQUNDO0lBQUEsMkJBQW9HO0lBQ3ZHLGlCQUFNO0lBQ1IsaUJBQWU7SUFDakIsaUJBQWlCOzs7O0lBWGYseURBQXNDLDBDQUFBO0lBSzFCLGVBQTBDO0lBQTFDLDRGQUEwQztJQUczQyxlQUFzRjtJQUF0RiwySUFBc0Y7OztJQUluRyxzQ0FDRztJQUFBLDJCQUFLO0lBQUEsWUFBNkM7SUFBQSxpQkFBTTtJQUFBLGlCQUMxRDs7O0lBRE8sZUFBNkM7SUFBN0Msa0ZBQTZDOzs7SUFFckQsa0NBQWtGOzs7SUFuQnBGLG9DQUNFO0lBQUEsK0dBT0U7SUFRRiwrR0FDRztJQUVILDJHQUFtRTtJQUNyRSxpQkFBWTs7O0lBbEJSLGVBQTZCO0lBQTdCLHdDQUE2QjtJQWNmLGVBQWlCO0lBQWpCLHVDQUFpQjtJQUdOLGVBQXVDO0lBQXZDLG9FQUF1Qzs7O0lBRXBFLDZCQUF5QztJQUFBLFlBQXdCO0lBQUEsaUJBQUk7OztJQUE1QixlQUF3QjtJQUF4QiwrQ0FBd0I7OztJQUNqRSw2QkFBMEU7SUFBQSxZQUF3QjtJQUFBLGlCQUFJOzs7SUFBNUIsZUFBd0I7SUFBeEIsK0NBQXdCOztBQUd0RyxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsaUJBQWlCO0lBT2pFLFlBQW1CLE9BQW1CLEVBQVMsTUFBd0IsRUFBRSxHQUFzQjtRQUM3RixLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBREgsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBTHZFLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixVQUFLLEdBQVcsR0FBRyxDQUFDO0lBS3BCLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FBQyxVQUFlO1FBQzVCLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUN0QixJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O3dHQWxDVSw0QkFBNEI7aUVBQTVCLDRCQUE0Qjs7O1FBMUJyQyxxRkFBc0U7UUFDdEUseUZBQ0U7UUFvQkYseUVBQXlDO1FBQ3pDLHlFQUEwRTs7UUF2QjFDLDBGQUFxQztRQUMxRCxlQUEwQjtRQUExQiw2Q0FBMEI7UUFxQmIsZUFBZ0I7UUFBaEIsbUNBQWdCO1FBQ2pCLGVBQWtEO1FBQWxELDZFQUFrRDs7a0RBR2hFLDRCQUE0QjtjQTdCeEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDthQUNGOzRIQUdDLE1BQU07a0JBREwsV0FBVzttQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG4vLyBBcHBcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi4vYmFzZS1waWNrZXItcmVzdWx0cy9CYXNlUGlja2VyUmVzdWx0cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NraWxsLXNwZWNpYWx0eS1waWNrZXItcmVzdWx0cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJwaWNrZXItbG9hZGluZ1wiICpuZ0lmPVwiaXNMb2FkaW5nICYmICFtYXRjaGVzPy5sZW5ndGhcIj48bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiPjwvbm92by1sb2FkaW5nPjwvc2VjdGlvbj5cbiAgICA8bm92by1saXN0ICpuZ0lmPVwibWF0Y2hlcy5sZW5ndGggPiAwXCIgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgIDxub3ZvLWxpc3QtaXRlbVxuICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2YgbWF0Y2hlc1wiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RNYXRjaCgkZXZlbnQpXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtYXRjaCA9PT0gYWN0aXZlTWF0Y2hcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXNlbGVjdGVkKG1hdGNoKVwiXG4gICAgICA+XG4gICAgICAgIDxpdGVtLWNvbnRlbnQ+XG4gICAgICAgICAgPGg2PjxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmxhYmVsLCB0ZXJtKVwiPjwvc3Bhbj48L2g2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJiaGktY2F0ZWdvcnktdGFnc1wiPjwvaVxuICAgICAgICAgICAgPjxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLmRhdGEuY2F0ZWdvcmllcyB8fCBtYXRjaC5kYXRhLnBhcmVudENhdGVnb3J5Lm5hbWUsIHRlcm0pXCI+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2l0ZW0tY29udGVudD5cbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgICA8bm92by1saXN0LWl0ZW0gKm5nSWY9XCJsaW1pdGVkVG9cIlxuICAgICAgICA+PGRpdj57eyBsYWJlbHMuc2hvd2luZ1hvZlhSZXN1bHRzKGxpbWl0LCB0b3RhbCkgfX08L2Rpdj48L25vdm8tbGlzdC1pdGVtXG4gICAgICA+XG4gICAgICA8bm92by1sb2FkaW5nIHRoZW1lPVwibGluZVwiICpuZ0lmPVwiaXNMb2FkaW5nICYmIG1hdGNoZXMubGVuZ3RoID4gMFwiPjwvbm92by1sb2FkaW5nPlxuICAgIDwvbm92by1saXN0PlxuICAgIDxwIGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvcD5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1udWxsXCIgKm5nSWY9XCIhaXNMb2FkaW5nICYmICFtYXRjaGVzLmxlbmd0aCAmJiAhaGFzRXJyb3JcIj57eyBsYWJlbHMucGlja2VyRW1wdHkgfX08L3A+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFNraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMgZXh0ZW5kcyBCYXNlUGlja2VyUmVzdWx0cyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgbGltaXRlZFRvOiBib29sZWFuID0gZmFsc2U7XG4gIGxpbWl0OiBudW1iZXIgPSAyMDA7XG4gIHRvdGFsOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihlbGVtZW50LCByZWYpO1xuICB9XG5cbiAgZ2V0TGlzdEVsZW1lbnQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3Rvcignbm92by1saXN0Jyk7XG4gIH1cblxuICAvKipcbiAgICogQG5hbWUgc3RydWN0dXJlQXJyYXlcbiAgICogQHBhcmFtIGNvbGxlY3Rpb24gLSB0aGUgZGF0YSBvbmNlIGdldERhdGEgcmVzb2x2ZXMgaXRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc3RydWN0dXJlcyBhbiBhcnJheSBvZiBub2RlcyBpbnRvIGFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBhXG4gICAqICduYW1lJyBmaWVsZCBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RydWN0dXJlQXJyYXkoY29sbGVjdGlvbjogYW55KTogYW55IHtcbiAgICBsZXQgZGF0YSA9IGNvbGxlY3Rpb247XG4gICAgaWYgKGNvbGxlY3Rpb24uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xuICAgICAgdGhpcy5saW1pdGVkVG8gPSBjb2xsZWN0aW9uLmxpbWl0ZWRUbzIwMDtcbiAgICAgIHRoaXMudG90YWwgPSBjb2xsZWN0aW9uLnRvdGFsO1xuICAgICAgZGF0YSA9IGNvbGxlY3Rpb24uZGF0YTtcbiAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gdGhpcy5saW1pdCkge1xuICAgICAgdGhpcy5saW1pdGVkVG8gPSB0cnVlO1xuICAgICAgdGhpcy50b3RhbCA9IGRhdGEubGVuZ3RoO1xuICAgICAgZGF0YSA9IGRhdGEuc2xpY2UoMCwgdGhpcy5saW1pdCk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5zdHJ1Y3R1cmVBcnJheShkYXRhKTtcbiAgfVxufVxuIl19