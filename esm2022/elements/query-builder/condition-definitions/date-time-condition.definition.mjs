import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NovoPickerToggleElement } from 'novo-elements/elements/field';
import { AbstractConditionFieldDef } from './abstract-condition.definition';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "novo-elements/elements/select";
import * as i5 from "novo-elements/elements/field";
import * as i6 from "novo-elements/elements/date-time-picker";
import * as i7 from "novo-elements/elements/radio";
import * as i8 from "../query-builder.directives";
/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
export class NovoDefaultDateTimeConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'within';
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultDateTimeConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['after']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="end" (onSelect)="closePanel($event, viewIndex)" #datetimepicker></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['before']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepickerbefore" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="start" (onSelect)="closePanel($event, viewIndex)" #datetimepickerbefore></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['within']">
          <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
            <novo-option value="7">{{ labels.next7Days }}</novo-option>
            <novo-option value="-7">{{ labels.past7Days }}</novo-option>
            <novo-option value="-30">{{ labels.past30Days }}</novo-option>
            <novo-option value="-90">{{ labels.past90Days }}</novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { kind: "component", type: i4.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { kind: "component", type: i5.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "customOverlayOrigin", "width"], outputs: ["valueChanges", "stateChanges"] }, { kind: "directive", type: i5.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { kind: "directive", type: i5.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { kind: "directive", type: i5.NovoDateTimeFormatDirective, selector: "input[dateTimeFormat]", inputs: ["military", "dateTimeFormat"] }, { kind: "component", type: i5.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { kind: "directive", type: i5.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { kind: "component", type: i3.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i6.NovoDateTimePickerElement, selector: "novo-date-time-picker", inputs: ["defaultTime", "minYear", "maxYear", "start", "end", "military", "weekStart", "disabledDateMessage"], outputs: ["onSelect"] }, { kind: "component", type: i7.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }, { kind: "component", type: i7.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { kind: "directive", type: i8.NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { kind: "directive", type: i8.NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { kind: "directive", type: i8.NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDefaultDateTimeConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-time-condition-def',
                    template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['after']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepicker" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="end" (onSelect)="closePanel($event, viewIndex)" #datetimepicker></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['before']">
          <input novoInput dateTimeFormat="iso8601" [picker]="datetimepickerbefore" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [width]="-1" [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-time-picker defaultTime="start" (onSelect)="closePanel($event, viewIndex)" #datetimepickerbefore></novo-date-time-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['within']">
          <novo-select [placeholder]="labels.selectDateRange" formControlName="value">
            <novo-option value="7">{{ labels.next7Days }}</novo-option>
            <novo-option value="-7">{{ labels.past7Days }}</novo-option>
            <novo-option value="-30">{{ labels.past30Days }}</novo-option>
            <novo-option value="-90">{{ labels.past90Days }}</novo-option>
          </novo-select>
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvcXVlcnktYnVpbGRlci9jb25kaXRpb24tZGVmaW5pdGlvbnMvZGF0ZS10aW1lLWNvbmRpdGlvbi5kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7OztBQUU1RTs7O0dBR0c7QUE4Q0gsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHlCQUF5QjtJQTdDOUU7O1FBaURFLG9CQUFlLEdBQUcsUUFBUSxDQUFDO0tBSzVCO0lBSEMsVUFBVSxDQUFDLEtBQUssRUFBRSxTQUFTO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztJQUNsRixDQUFDOzhHQVJVLCtCQUErQjtrR0FBL0IsK0JBQStCLHdHQUM1Qix1QkFBdUIsdUVBNUMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUOzsyRkFJVSwrQkFBK0I7a0JBN0MzQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztpQkFDakQ7OEJBR0MsZUFBZTtzQkFEZCxZQUFZO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVuLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcbmltcG9ydCB7IEFic3RyYWN0Q29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuL2Fic3RyYWN0LWNvbmRpdGlvbi5kZWZpbml0aW9uJztcblxuLyoqXG4gKiBNb3N0IGNvbXBsaWNhdGVkIG9mIHRoZSBkZWZhdWx0IGNvbmRpdGlvbnMgZGVmcywgYSBkYXRlIG5lZWRzIHRvIHByb3ZpZGUgYSBkaWZmZXJlbnRcbiAqIGlucHV0IHR5cGUgZGVwZW5kaW5nIG9uIHRoZSBvcGVyYXRvciBzZWxlY3RlZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRlLXRpbWUtY29uZGl0aW9uLWRlZicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBub3ZvQ29uZGl0aW9uRmllbGREZWY9XCJEQVRFXCI+XG4gICAgICA8bm92by1maWVsZCAqbm92b0NvbmRpdGlvbk9wZXJhdG9yc0RlZj1cImxldCBmb3JtR3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICAgICAgICA8bm92by1zZWxlY3QgW3BsYWNlaG9sZGVyXT1cImxhYmVscy5vcGVyYXRvclwiIGZvcm1Db250cm9sTmFtZT1cIm9wZXJhdG9yXCIgKG9uU2VsZWN0KT1cIm9uT3BlcmF0b3JTZWxlY3QoZm9ybUdyb3VwKVwiPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImJlZm9yZVwiPnt7IGxhYmVscy5iZWZvcmUgfX08L25vdm8tb3B0aW9uPlxuICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cImFmdGVyXCI+e3sgbGFiZWxzLmFmdGVyIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJ3aXRoaW5cIj57eyBsYWJlbHMud2l0aGluIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCJpc051bGxcIj57eyBsYWJlbHMuaXNFbXB0eSB9fTwvbm92by1vcHRpb24+XG4gICAgICAgIDwvbm92by1zZWxlY3Q+XG4gICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8bmctY29udGFpbmVyICpub3ZvQ29uZGl0aW9uSW5wdXREZWY9XCJsZXQgZm9ybUdyb3VwOyB2aWV3SW5kZXggYXMgdmlld0luZGV4XCIgW25nU3dpdGNoXT1cImZvcm1Hcm91cC52YWx1ZS5vcGVyYXRvclwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2FmdGVyJ11cIj5cbiAgICAgICAgICA8aW5wdXQgbm92b0lucHV0IGRhdGVUaW1lRm9ybWF0PVwiaXNvODYwMVwiIFtwaWNrZXJdPVwiZGF0ZXRpbWVwaWNrZXJcIiBmb3JtQ29udHJvbE5hbWU9XCJ2YWx1ZVwiIC8+XG4gICAgICAgICAgPG5vdm8tcGlja2VyLXRvZ2dsZSB0cmlnZ2VyT25Gb2N1cyBbd2lkdGhdPVwiLTFcIiBbb3ZlcmxheUlkXT1cInZpZXdJbmRleFwiIG5vdm9TdWZmaXggaWNvbj1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICA8bm92by1kYXRlLXRpbWUtcGlja2VyIGRlZmF1bHRUaW1lPVwiZW5kXCIgKG9uU2VsZWN0KT1cImNsb3NlUGFuZWwoJGV2ZW50LCB2aWV3SW5kZXgpXCIgI2RhdGV0aW1lcGlja2VyPjwvbm92by1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ2JlZm9yZSddXCI+XG4gICAgICAgICAgPGlucHV0IG5vdm9JbnB1dCBkYXRlVGltZUZvcm1hdD1cImlzbzg2MDFcIiBbcGlja2VyXT1cImRhdGV0aW1lcGlja2VyYmVmb3JlXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIiAvPlxuICAgICAgICAgIDxub3ZvLXBpY2tlci10b2dnbGUgdHJpZ2dlck9uRm9jdXMgW3dpZHRoXT1cIi0xXCIgW292ZXJsYXlJZF09XCJ2aWV3SW5kZXhcIiBub3ZvU3VmZml4IGljb249XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgPG5vdm8tZGF0ZS10aW1lLXBpY2tlciBkZWZhdWx0VGltZT1cInN0YXJ0XCIgKG9uU2VsZWN0KT1cImNsb3NlUGFuZWwoJGV2ZW50LCB2aWV3SW5kZXgpXCIgI2RhdGV0aW1lcGlja2VyYmVmb3JlPjwvbm92by1kYXRlLXRpbWUtcGlja2VyPlxuICAgICAgICAgIDwvbm92by1waWNrZXItdG9nZ2xlPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICAgIDxub3ZvLWZpZWxkICpub3ZvU3dpdGNoQ2FzZXM9XCJbJ3dpdGhpbiddXCI+XG4gICAgICAgICAgPG5vdm8tc2VsZWN0IFtwbGFjZWhvbGRlcl09XCJsYWJlbHMuc2VsZWN0RGF0ZVJhbmdlXCIgZm9ybUNvbnRyb2xOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIjdcIj57eyBsYWJlbHMubmV4dDdEYXlzIH19PC9ub3ZvLW9wdGlvbj5cbiAgICAgICAgICAgIDxub3ZvLW9wdGlvbiB2YWx1ZT1cIi03XCI+e3sgbGFiZWxzLnBhc3Q3RGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItMzBcIj57eyBsYWJlbHMucGFzdDMwRGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgICA8bm92by1vcHRpb24gdmFsdWU9XCItOTBcIj57eyBsYWJlbHMucGFzdDkwRGF5cyB9fTwvbm92by1vcHRpb24+XG4gICAgICAgICAgPC9ub3ZvLXNlbGVjdD5cbiAgICAgICAgPC9ub3ZvLWZpZWxkPlxuICAgICAgICA8bm92by1maWVsZCAqbm92b1N3aXRjaENhc2VzPVwiWydpc051bGwnXVwiPlxuICAgICAgICAgIDxub3ZvLXJhZGlvLWdyb3VwIGZvcm1Db250cm9sTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICA8bm92by1yYWRpbyBbdmFsdWVdPVwidHJ1ZVwiPnt7IGxhYmVscy55ZXMgfX08L25vdm8tcmFkaW8+XG4gICAgICAgICAgICA8bm92by1yYWRpbyBbdmFsdWVdPVwiZmFsc2VcIj57eyBsYWJlbHMubm8gfX08L25vdm8tcmFkaW8+XG4gICAgICAgICAgPC9ub3ZvLXJhZGlvLWdyb3VwPlxuICAgICAgICA8L25vdm8tZmllbGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGVmYXVsdERhdGVUaW1lQ29uZGl0aW9uRGVmIGV4dGVuZHMgQWJzdHJhY3RDb25kaXRpb25GaWVsZERlZiB7XG4gIEBWaWV3Q2hpbGRyZW4oTm92b1BpY2tlclRvZ2dsZUVsZW1lbnQpXG4gIG92ZXJsYXlDaGlsZHJlbjogUXVlcnlMaXN0PE5vdm9QaWNrZXJUb2dnbGVFbGVtZW50PjtcblxuICBkZWZhdWx0T3BlcmF0b3IgPSAnd2l0aGluJztcblxuICBjbG9zZVBhbmVsKGV2ZW50LCB2aWV3SW5kZXgpOiB2b2lkIHtcbiAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5vdmVybGF5Q2hpbGRyZW4uZmluZChpdGVtID0+IGl0ZW0ub3ZlcmxheUlkID09PSB2aWV3SW5kZXgpO1xuICB9XG59XG4iXX0=