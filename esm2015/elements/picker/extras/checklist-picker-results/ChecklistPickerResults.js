// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
// Vendor
import { from } from 'rxjs';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Helpers } from '../../../../utils/Helpers';
// APP
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
import * as i1 from "../../../../services/novo-label-service";
import * as i2 from "@angular/common";
import * as i3 from "../../../loading/Loading";
function ChecklistPickerResults_novo_loading_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "novo-loading", 4);
} }
function ChecklistPickerResults_ul_1_span_1_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const section_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(section_r5.label || section_r5.type);
} }
const _c0 = function (a0) { return { checked: a0 }; };
const _c1 = function (a0, a1, a2) { return { "bhi-checkbox-empty": a0, "bhi-checkbox-filled": a1, "bhi-checkbox-indeterminate": a2 }; };
function ChecklistPickerResults_ul_1_span_1_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 9);
    i0.ɵɵlistener("click", function ChecklistPickerResults_ul_1_span_1_li_2_Template_li_click_0_listener($event) { i0.ɵɵrestoreView(_r13); const match_r10 = ctx.$implicit; const ctx_r12 = i0.ɵɵnextContext(3); return ctx_r12.selectMatch($event, match_r10); })("mouseenter", function ChecklistPickerResults_ul_1_span_1_li_2_Template_li_mouseenter_0_listener() { i0.ɵɵrestoreView(_r13); const match_r10 = ctx.$implicit; const ctx_r14 = i0.ɵɵnextContext(3); return ctx_r14.selectActive(match_r10); });
    i0.ɵɵelementStart(1, "label");
    i0.ɵɵelement(2, "i", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r10 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("active", match_r10 === ctx_r8.activeMatch);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c0, match_r10.checked));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(7, _c1, !match_r10.checked, match_r10.checked, match_r10.indeterminate));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", match_r10.label, " ");
} }
function ChecklistPickerResults_ul_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, ChecklistPickerResults_ul_1_span_1_li_1_Template, 2, 1, "li", 6);
    i0.ɵɵtemplate(2, ChecklistPickerResults_ul_1_span_1_li_2_Template, 4, 11, "li", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const section_r5 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", section_r5.data.length > 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", section_r5.data);
} }
function ChecklistPickerResults_ul_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul");
    i0.ɵɵtemplate(1, ChecklistPickerResults_ul_1_span_1_Template, 3, 2, "span", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.matches);
} }
function ChecklistPickerResults_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.labels.pickerError);
} }
function ChecklistPickerResults_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.labels.pickerEmpty);
} }
/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
export class ChecklistPickerResults extends BasePickerResults {
    constructor(element, labels, ref) {
        super(element, ref);
        this.labels = labels;
    }
    search() {
        const options = this.config.options;
        // only set this the first time
        return from(new Promise((resolve, reject) => {
            // Check if there is match data
            if (options) {
                // Resolve the data
                if (Array.isArray(options)) {
                    this.isStatic = true;
                    // Arrays are returned immediately
                    resolve(options);
                }
                else {
                    // All other kinds of data are rejected
                    reject('The data provided is not an array or a promise');
                    throw new Error('The data provided is not an array or a promise');
                }
            }
            else {
                // No data gets rejected
                reject('error');
            }
        }));
    }
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches) {
        if (this.term && matches) {
            this.filteredMatches = matches.map((section) => {
                const items = section.originalData.filter((match) => {
                    return ~String(match.label).toLowerCase().indexOf(this.term.toLowerCase());
                });
                section.data = items;
                return section;
            }, this);
            return this.filteredMatches;
        }
        else if (this.term === '') {
            matches.forEach((section) => {
                section.data = section.originalData;
            });
            return matches;
        }
        // Show no recent results template
        return matches;
    }
    selectMatch(event, item) {
        Helpers.swallowEvent(event);
        if (item.indeterminate) {
            item.indeterminate = false;
            item.checked = true;
        }
        else {
            item.checked = !item.checked;
        }
        const selected = this.activeMatch;
        if (selected) {
            this.parent.value = selected;
        }
        this.ref.markForCheck();
        return false;
    }
}
ChecklistPickerResults.ɵfac = function ChecklistPickerResults_Factory(t) { return new (t || ChecklistPickerResults)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NovoLabelService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
ChecklistPickerResults.ɵcmp = i0.ɵɵdefineComponent({ type: ChecklistPickerResults, selectors: [["checklist-picker-results"]], hostAttrs: [1, "active", "picker-results"], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 4, consts: [["theme", "line", 4, "ngIf"], [4, "ngIf"], ["class", "picker-error", 4, "ngIf"], ["class", "picker-null-results", 4, "ngIf"], ["theme", "line"], [4, "ngFor", "ngForOf"], ["class", "header caption", 4, "ngIf"], [3, "ngClass", "active", "click", "mouseenter", 4, "ngFor", "ngForOf"], [1, "header", "caption"], [3, "ngClass", "click", "mouseenter"], [3, "ngClass"], [1, "picker-error"], [1, "picker-null-results"]], template: function ChecklistPickerResults_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ChecklistPickerResults_novo_loading_0_Template, 1, 0, "novo-loading", 0);
        i0.ɵɵtemplate(1, ChecklistPickerResults_ul_1_Template, 2, 1, "ul", 1);
        i0.ɵɵtemplate(2, ChecklistPickerResults_p_2_Template, 2, 1, "p", 2);
        i0.ɵɵtemplate(3, ChecklistPickerResults_p_3_Template, 2, 1, "p", 3);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isLoading && !ctx.matches.length);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.matches.length > 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasError);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.matches.length && !ctx.hasError && ctx.term !== "");
    } }, directives: [i2.NgIf, i3.NovoLoadingElement, i2.NgForOf, i2.NgClass], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ChecklistPickerResults, [{
        type: Component,
        args: [{
                selector: 'checklist-picker-results',
                host: {
                    class: 'active picker-results',
                },
                template: `
    <novo-loading theme="line" *ngIf="isLoading && !matches.length"></novo-loading>
    <ul *ngIf="matches.length > 0">
      <span *ngFor="let section of matches; let i = index">
        <li class="header caption" *ngIf="section.data.length > 0">{{ section.label || section.type }}</li>
        <li
          *ngFor="let match of section.data; let i = index"
          [ngClass]="{ checked: match.checked }"
          (click)="selectMatch($event, match)"
          [class.active]="match === activeMatch"
          (mouseenter)="selectActive(match)"
        >
          <label>
            <i
              [ngClass]="{
                'bhi-checkbox-empty': !match.checked,
                'bhi-checkbox-filled': match.checked,
                'bhi-checkbox-indeterminate': match.indeterminate
              }"
            ></i>
            {{ match.label }}
          </label>
        </li>
      </span>
    </ul>
    <p class="picker-error" *ngIf="hasError">{{ labels.pickerError }}</p>
    <p class="picker-null-results" *ngIf="!isLoading && !matches.length && !hasError && term !== ''">{{ labels.pickerEmpty }}</p>
  `,
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tsaXN0UGlja2VyUmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9waWNrZXIvZXh0cmFzL2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cy9DaGVja2xpc3RQaWNrZXJSZXN1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxTQUFTO0FBQ1QsT0FBTyxFQUFFLElBQUksRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7Ozs7SUFXekUsa0NBQStFOzs7SUFHM0UsNkJBQTJEO0lBQUEsWUFBbUM7SUFBQSxpQkFBSzs7O0lBQXhDLGVBQW1DO0lBQW5DLHlEQUFtQzs7Ozs7O0lBQzlGLDZCQU9FO0lBSkEsOFBBQW9DLDhPQUFBO0lBSXBDLDZCQUNFO0lBQUEsd0JBTUs7SUFDTCxZQUNGO0lBQUEsaUJBQVE7SUFDVixpQkFBSzs7OztJQWJILDBEQUFzQztJQUZ0Qyx1RUFBc0M7SUFPbEMsZUFJRTtJQUpGLG9IQUlFO0lBRUosZUFDRjtJQURFLGdEQUNGOzs7SUFsQkosNEJBQ0U7SUFBQSxpRkFBMkQ7SUFDM0Qsa0ZBT0U7SUFXSixpQkFBTzs7O0lBbkJzQixlQUErQjtJQUEvQixpREFBK0I7SUFFeEQsZUFBaUQ7SUFBakQseUNBQWlEOzs7SUFKdkQsMEJBQ0U7SUFBQSw4RUFDRTtJQW9CSixpQkFBSzs7O0lB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R0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OzRGQXpFVSxzQkFBc0I7MkRBQXRCLHNCQUFzQjtRQTVCL0IseUZBQWdFO1FBQ2hFLHFFQUNFO1FBc0JGLG1FQUF5QztRQUN6QyxtRUFBaUc7O1FBekJ0RSwyREFBb0M7UUFDM0QsZUFBMEI7UUFBMUIsNkNBQTBCO1FBdUJOLGVBQWdCO1FBQWhCLG1DQUFnQjtRQUNULGVBQWlFO1FBQWpFLGdHQUFpRTs7a0RBR3ZGLHNCQUFzQjtjQWxDbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsdUJBQXVCO2lCQUMvQjtnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuLy8gQVBQXG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJy4uL2Jhc2UtcGlja2VyLXJlc3VsdHMvQmFzZVBpY2tlclJlc3VsdHMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIHRoZSBhY3R1YWwgbGlzdCBvZiBtYXRjaGVzIHRoYXQgZ2V0cyBpbmplY3RlZCBpbnRvIHRoZSBET00uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FjdGl2ZSBwaWNrZXItcmVzdWx0cycsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcy5sZW5ndGhcIj48L25vdm8tbG9hZGluZz5cbiAgICA8dWwgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIj5cbiAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBzZWN0aW9uIG9mIG1hdGNoZXM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwiaGVhZGVyIGNhcHRpb25cIiAqbmdJZj1cInNlY3Rpb24uZGF0YS5sZW5ndGggPiAwXCI+e3sgc2VjdGlvbi5sYWJlbCB8fCBzZWN0aW9uLnR5cGUgfX08L2xpPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2Ygc2VjdGlvbi5kYXRhOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7IGNoZWNrZWQ6IG1hdGNoLmNoZWNrZWQgfVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudCwgbWF0Y2gpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8aVxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgJ2JoaS1jaGVja2JveC1lbXB0eSc6ICFtYXRjaC5jaGVja2VkLFxuICAgICAgICAgICAgICAgICdiaGktY2hlY2tib3gtZmlsbGVkJzogbWF0Y2guY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAnYmhpLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUnOiBtYXRjaC5pbmRldGVybWluYXRlXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgIHt7IG1hdGNoLmxhYmVsIH19XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3VsPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvcD5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1udWxsLXJlc3VsdHNcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvciAmJiB0ZXJtICE9PSAnJ1wiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvcD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcbiAgZmlsdGVyZWRNYXRjaGVzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBzZWFyY2goKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICAvLyBvbmx5IHNldCB0aGlzIHRoZSBmaXJzdCB0aW1lXG4gICAgcmV0dXJuIGZyb20oXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIG1hdGNoIGRhdGFcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBkYXRhXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICAgICAgLy8gQXJyYXlzIGFyZSByZXR1cm5lZCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgcmVzb2x2ZShvcHRpb25zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWxsIG90aGVyIGtpbmRzIG9mIGRhdGEgYXJlIHJlamVjdGVkXG4gICAgICAgICAgICByZWplY3QoJ1RoZSBkYXRhIHByb3ZpZGVkIGlzIG5vdCBhbiBhcnJheSBvciBhIHByb21pc2UnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgcHJvdmlkZWQgaXMgbm90IGFuIGFycmF5IG9yIGEgcHJvbWlzZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBObyBkYXRhIGdldHMgcmVqZWN0ZWRcbiAgICAgICAgICByZWplY3QoJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG1hdGNoZXMgLSBDb2xsZWN0aW9uIG9mIG9iamVjdHM9XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGxvb3BzIHRocm91Z2ggdGhlIHBpY2tlciBvcHRpb25zIGFuZCBjcmVhdGVzIGEgZmlsdGVyZWQgbGlzdCBvZiBvYmplY3RzIHRoYXQgY29udGFpblxuICAgKiB0aGUgbmV3U2VhcmNoLlxuICAgKi9cbiAgZmlsdGVyRGF0YShtYXRjaGVzKTogYW55IHtcbiAgICBpZiAodGhpcy50ZXJtICYmIG1hdGNoZXMpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRNYXRjaGVzID0gbWF0Y2hlcy5tYXAoKHNlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBzZWN0aW9uLm9yaWdpbmFsRGF0YS5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIH5TdHJpbmcobWF0Y2gubGFiZWwpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWN0aW9uLmRhdGEgPSBpdGVtcztcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XG4gICAgICB9LCB0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkTWF0Y2hlcztcbiAgICB9IGVsc2UgaWYgKHRoaXMudGVybSA9PT0gJycpIHtcbiAgICAgIG1hdGNoZXMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmRhdGEgPSBzZWN0aW9uLm9yaWdpbmFsRGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgfVxuICAgIC8vIFNob3cgbm8gcmVjZW50IHJlc3VsdHMgdGVtcGxhdGVcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIHNlbGVjdE1hdGNoKGV2ZW50LCBpdGVtKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGlmIChpdGVtLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgIGl0ZW0uaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlTWF0Y2g7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnBhcmVudC52YWx1ZSA9IHNlbGVjdGVkO1xuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==