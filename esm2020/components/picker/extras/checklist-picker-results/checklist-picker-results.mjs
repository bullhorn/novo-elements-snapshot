// NG2
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
// Vendor
import { from } from 'rxjs';
import { BasePickerResults } from '../base-picker-results/base-picker-results';
import { Helpers } from 'novo-elements/utils';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "novo-elements/components/loading";
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/common";
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
ChecklistPickerResults.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ChecklistPickerResults, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ChecklistPickerResults.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ChecklistPickerResults, selector: "checklist-picker-results", host: { classAttribute: "active picker-results" }, usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i2.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ChecklistPickerResults, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tsaXN0LXBpY2tlci1yZXN1bHRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9waWNrZXIvZXh0cmFzL2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cy9jaGVja2xpc3QtcGlja2VyLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLFNBQVM7QUFDVCxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBRTFEOztHQUVHO0FBbUNILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxpQkFBaUI7SUFHM0QsWUFBWSxPQUFtQixFQUFTLE1BQXdCLEVBQUUsR0FBc0I7UUFDdEYsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQURrQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUVoRSxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3BDLCtCQUErQjtRQUMvQixPQUFPLElBQUksQ0FDVCxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM5QiwrQkFBK0I7WUFDL0IsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsbUJBQW1CO2dCQUNuQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixrQ0FBa0M7b0JBQ2xDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsdUNBQXVDO29CQUN2QyxNQUFNLENBQUMsZ0RBQWdELENBQUMsQ0FBQztvQkFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2lCQUNuRTthQUNGO2lCQUFNO2dCQUNMLHdCQUF3QjtnQkFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFVBQVUsQ0FBQyxPQUFPO1FBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzdFLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDN0I7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxrQ0FBa0M7UUFDbEMsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDOUI7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O29IQXpFVSxzQkFBc0I7d0dBQXRCLHNCQUFzQiwwSUE3QnZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7NEZBRVUsc0JBQXNCO2tCQWxDbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHVCQUF1QjtxQkFDL0I7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQlQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQmFzZVBpY2tlclJlc3VsdHMgfSBmcm9tICcuLi9iYXNlLXBpY2tlci1yZXN1bHRzL2Jhc2UtcGlja2VyLXJlc3VsdHMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIHRoZSBhY3R1YWwgbGlzdCBvZiBtYXRjaGVzIHRoYXQgZ2V0cyBpbmplY3RlZCBpbnRvIHRoZSBET00uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cycsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FjdGl2ZSBwaWNrZXItcmVzdWx0cycsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbG9hZGluZyB0aGVtZT1cImxpbmVcIiAqbmdJZj1cImlzTG9hZGluZyAmJiAhbWF0Y2hlcy5sZW5ndGhcIj48L25vdm8tbG9hZGluZz5cbiAgICA8dWwgKm5nSWY9XCJtYXRjaGVzLmxlbmd0aCA+IDBcIj5cbiAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBzZWN0aW9uIG9mIG1hdGNoZXM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwiaGVhZGVyIGNhcHRpb25cIiAqbmdJZj1cInNlY3Rpb24uZGF0YS5sZW5ndGggPiAwXCI+e3sgc2VjdGlvbi5sYWJlbCB8fCBzZWN0aW9uLnR5cGUgfX08L2xpPlxuICAgICAgICA8bGlcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgbWF0Y2ggb2Ygc2VjdGlvbi5kYXRhOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJ7IGNoZWNrZWQ6IG1hdGNoLmNoZWNrZWQgfVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKCRldmVudCwgbWF0Y2gpXCJcbiAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIm1hdGNoID09PSBhY3RpdmVNYXRjaFwiXG4gICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8aVxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgJ2JoaS1jaGVja2JveC1lbXB0eSc6ICFtYXRjaC5jaGVja2VkLFxuICAgICAgICAgICAgICAgICdiaGktY2hlY2tib3gtZmlsbGVkJzogbWF0Y2guY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAnYmhpLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUnOiBtYXRjaC5pbmRldGVybWluYXRlXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgPjwvaT5cbiAgICAgICAgICAgIHt7IG1hdGNoLmxhYmVsIH19XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3VsPlxuICAgIDxwIGNsYXNzPVwicGlja2VyLWVycm9yXCIgKm5nSWY9XCJoYXNFcnJvclwiPnt7IGxhYmVscy5waWNrZXJFcnJvciB9fTwvcD5cbiAgICA8cCBjbGFzcz1cInBpY2tlci1udWxsLXJlc3VsdHNcIiAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgIW1hdGNoZXMubGVuZ3RoICYmICFoYXNFcnJvciAmJiB0ZXJtICE9PSAnJ1wiPnt7IGxhYmVscy5waWNrZXJFbXB0eSB9fTwvcD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIHtcbiAgZmlsdGVyZWRNYXRjaGVzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKGVsZW1lbnQsIHJlZik7XG4gIH1cblxuICBzZWFyY2goKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICAvLyBvbmx5IHNldCB0aGlzIHRoZSBmaXJzdCB0aW1lXG4gICAgcmV0dXJuIGZyb20oXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIG1hdGNoIGRhdGFcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBkYXRhXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICAgICAgLy8gQXJyYXlzIGFyZSByZXR1cm5lZCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgcmVzb2x2ZShvcHRpb25zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWxsIG90aGVyIGtpbmRzIG9mIGRhdGEgYXJlIHJlamVjdGVkXG4gICAgICAgICAgICByZWplY3QoJ1RoZSBkYXRhIHByb3ZpZGVkIGlzIG5vdCBhbiBhcnJheSBvciBhIHByb21pc2UnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgcHJvdmlkZWQgaXMgbm90IGFuIGFycmF5IG9yIGEgcHJvbWlzZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBObyBkYXRhIGdldHMgcmVqZWN0ZWRcbiAgICAgICAgICByZWplY3QoJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG1hdGNoZXMgLSBDb2xsZWN0aW9uIG9mIG9iamVjdHM9XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGxvb3BzIHRocm91Z2ggdGhlIHBpY2tlciBvcHRpb25zIGFuZCBjcmVhdGVzIGEgZmlsdGVyZWQgbGlzdCBvZiBvYmplY3RzIHRoYXQgY29udGFpblxuICAgKiB0aGUgbmV3U2VhcmNoLlxuICAgKi9cbiAgZmlsdGVyRGF0YShtYXRjaGVzKTogYW55IHtcbiAgICBpZiAodGhpcy50ZXJtICYmIG1hdGNoZXMpIHtcbiAgICAgIHRoaXMuZmlsdGVyZWRNYXRjaGVzID0gbWF0Y2hlcy5tYXAoKHNlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBzZWN0aW9uLm9yaWdpbmFsRGF0YS5maWx0ZXIoKG1hdGNoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIH5TdHJpbmcobWF0Y2gubGFiZWwpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLnRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWN0aW9uLmRhdGEgPSBpdGVtcztcbiAgICAgICAgcmV0dXJuIHNlY3Rpb247XG4gICAgICB9LCB0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkTWF0Y2hlcztcbiAgICB9IGVsc2UgaWYgKHRoaXMudGVybSA9PT0gJycpIHtcbiAgICAgIG1hdGNoZXMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmRhdGEgPSBzZWN0aW9uLm9yaWdpbmFsRGF0YTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgfVxuICAgIC8vIFNob3cgbm8gcmVjZW50IHJlc3VsdHMgdGVtcGxhdGVcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIHNlbGVjdE1hdGNoKGV2ZW50LCBpdGVtKSB7XG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgIGlmIChpdGVtLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgIGl0ZW0uaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlTWF0Y2g7XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnBhcmVudC52YWx1ZSA9IHNlbGVjdGVkO1xuICAgIH1cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==