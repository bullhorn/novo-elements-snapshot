import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, QueryList, } from '@angular/core';
import { ControlContainer, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';
import { NovoConditionFieldDef } from '../query-builder.directives';
import { QueryBuilderService } from '../query-builder.service';
import { NOVO_CRITERIA_BUILDER } from '../query-builder.tokens';
import { Conjunction } from '../query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../query-builder.service";
import * as i3 from "../../flex/Flex";
import * as i4 from "../../common/typography/label/label.component";
import * as i5 from "../condition-group/condition-group.component";
import * as i6 from "../condition-definitions/id-condition.definition";
import * as i7 from "../condition-definitions/date-condition.definition";
import * as i8 from "../condition-definitions/string-condition.definition";
import * as i9 from "../condition-definitions/number-condition.definition";
import * as i10 from "../condition-definitions/address-condition.definition";
import * as i11 from "../condition-definitions/boolean-condition.definition";
import * as i12 from "../condition-definitions/picker-condition.definition";
import * as i13 from "@angular/common";
import * as i14 from "../../common/directives/space.directive";
const EMPTY_CONDITION = {
    field: null,
    operator: null,
    value: null,
};
export class CriteriaBuilderComponent {
    constructor(controlContainer, formBuilder, cdr, qbs) {
        this.controlContainer = controlContainer;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.qbs = qbs;
        this.allowedGroupings = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.innerForm = this.formBuilder.group({
            criteria: this.formBuilder.array([]),
        });
        this.parentForm.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((value) => {
            Promise.resolve().then(() => {
                this.setInitalValue(value[this.controlName]);
                this.cdr.markForCheck();
            });
        });
        this.innerForm.valueChanges
            .pipe(debounce(() => interval(10)), takeUntil(this._onDestroy))
            .subscribe((value) => {
            const result = value.criteria.filter((it, i) => {
                const key = Object.keys(it)[0];
                if (it[key].length === 0) {
                    this.removeConditionGroupAt(i);
                }
                return it[key].length > 0;
            });
            Promise.resolve().then(() => {
                this.parentForm.get(this.controlName).setValue(result, { emitEvent: false });
                this.cdr.markForCheck();
            });
        });
    }
    ngAfterContentChecked() {
        this._configureQueryBuilderService();
        this.cdr.detectChanges();
    }
    ngAfterViewInit() {
        this._registerFieldDefs();
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    isConditionGroup(group) {
        return Object.keys(group).every((key) => ['$and', '$or', '$not'].includes(key));
    }
    setInitalValue(value) {
        if (value.length && this.isConditionGroup(value[0])) {
            value.forEach((it) => this.addConditionGroup(it));
        }
        else {
            this.addConditionGroup({ $and: value });
        }
    }
    get root() {
        return this.innerForm.get('criteria');
    }
    addConditionGroup(data = { $and: [EMPTY_CONDITION] }) {
        this.root.push(this.newConditionGroup(data));
        this.cdr.markForCheck();
    }
    newConditionGroup(data) {
        const controls = Object.entries(data).reduce((obj, [key, val]) => {
            return {
                ...obj,
                [key]: this.formBuilder.array(val.map((it) => this.newCondition(it))),
            };
        }, {});
        return this.formBuilder.group(controls);
    }
    newCondition({ field, operator, value } = EMPTY_CONDITION) {
        return this.formBuilder.group({
            field: [field, Validators.required],
            operator: [operator, Validators.required],
            value: [value, Validators.required],
        });
    }
    removeConditionGroupAt(index) {
        this.root.removeAt(index, { emitEvent: false });
    }
    clearAllConditions() {
        while (this.root.length) {
            this.root.removeAt(0);
        }
    }
    _configureQueryBuilderService() {
        this.qbs.config = this.config;
        this.qbs.editTypeFn = this.editTypeFn;
        this.qbs.allowedGroupings = this.allowedGroupings;
    }
    _registerFieldDefs() {
        const defs = [...Array.from(this._contentFieldDefs)];
        defs.forEach((fieldDef) => {
            this.qbs.registerFieldDef(fieldDef);
        });
    }
}
CriteriaBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i1.ControlContainer }, { token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.QueryBuilderService }], target: i0.ɵɵFactoryTarget.Component });
CriteriaBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CriteriaBuilderComponent, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn" }, host: { classAttribute: "novo-criteria-builder" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
        { provide: QueryBuilderService, useClass: QueryBuilderService },
    ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"TIMESTAMP\"></novo-date-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], components: [{ type: i3.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i4.NovoLabel, selector: "novo-label,[novo-label]" }, { type: i5.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex"] }, { type: i6.NovoDefaultIdConditionDef, selector: "novo-id-condition-def" }, { type: i7.NovoDefaultDateConditionDef, selector: "novo-date-condition-def" }, { type: i8.NovoDefaultStringConditionDef, selector: "novo-string-condition-def" }, { type: i9.NovoDefaultNumberConditionDef, selector: "novo-number-condition-def" }, { type: i10.NovoDefaultAddressConditionDef, selector: "novo-address-condition-def" }, { type: i11.NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def" }, { type: i12.NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def" }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { type: i13.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i14.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"TIMESTAMP\"></novo-date-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ControlContainer }, { type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.QueryBuilderService }]; }, propDecorators: { config: [{
                type: Input
            }], controlName: [{
                type: Input
            }], allowedGroupings: [{
                type: Input
            }], editTypeFn: [{
                type: Input
            }], _contentFieldDefs: [{
                type: ContentChildren,
                args: [NovoConditionFieldDef, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQWEsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQTJDLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBRTlGLE1BQU0sZUFBZSxHQUFjO0lBQ2pDLEtBQUssRUFBRSxJQUFJO0lBQ1gsUUFBUSxFQUFFLElBQUk7SUFDZCxLQUFLLEVB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QkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7cUJBQ2hFLFFBQ0s7d0JBQ0osS0FBSyxFQUFFLHVCQUF1QjtxQkFDL0I7bU1BR1EsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRXlELGlCQUFpQjtzQkFBL0UsZUFBZTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvQ29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUXVlcnlCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOT1ZPX0NSSVRFUklBX0JVSUxERVIgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnRva2Vucyc7XG5pbXBvcnQgeyBCYXNlRmllbGREZWYsIENvbmRpdGlvbiwgQ29uZGl0aW9uR3JvdXAsIENvbmp1bmN0aW9uIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbmNvbnN0IEVNUFRZX0NPTkRJVElPTjogQ29uZGl0aW9uID0ge1xuICBmaWVsZDogbnVsbCxcbiAgb3BlcmF0b3I6IG51bGwsXG4gIHZhbHVlOiBudWxsLFxufTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY3JpdGVyaWEtYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50KSwgbXVsdGk6IHRydWUgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiwgdXNlRXhpc3Rpbmc6IENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogUXVlcnlCdWlsZGVyU2VydmljZSwgdXNlQ2xhc3M6IFF1ZXJ5QnVpbGRlclNlcnZpY2UgfSxcbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQElucHV0KCkgY29udHJvbE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgYWxsb3dlZEdyb3VwaW5ncyA9IFtDb25qdW5jdGlvbi5BTkQsIENvbmp1bmN0aW9uLk9SLCBDb25qdW5jdGlvbi5OT1RdO1xuICBASW5wdXQoKSBlZGl0VHlwZUZuOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0NvbmRpdGlvbkZpZWxkRGVmLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIF9jb250ZW50RmllbGREZWZzOiBRdWVyeUxpc3Q8Tm92b0NvbmRpdGlvbkZpZWxkRGVmPjtcblxuICBwdWJsaWMgcGFyZW50Rm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgaW5uZXJGb3JtOiBGb3JtR3JvdXA7XG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRyb2xDb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBxYnM6IFF1ZXJ5QnVpbGRlclNlcnZpY2UsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhcmVudEZvcm0gPSB0aGlzLmNvbnRyb2xDb250YWluZXIuY29udHJvbCBhcyBGb3JtR3JvdXA7XG4gICAgdGhpcy5pbm5lckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGNyaXRlcmlhOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICB9KTtcblxuICAgIHRoaXMucGFyZW50Rm9ybS52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5pdGFsVmFsdWUodmFsdWVbdGhpcy5jb250cm9sTmFtZV0pO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuaW5uZXJGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlKCgpID0+IGludGVydmFsKDEwKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUuY3JpdGVyaWEuZmlsdGVyKChpdCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGl0KVswXTtcbiAgICAgICAgICBpZiAoaXRba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29uZGl0aW9uR3JvdXBBdChpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0W2tleV0ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXJlbnRGb3JtLmdldCh0aGlzLmNvbnRyb2xOYW1lKS5zZXRWYWx1ZShyZXN1bHQsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWd1cmVRdWVyeUJ1aWxkZXJTZXJ2aWNlKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlZ2lzdGVyRmllbGREZWZzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NvbmRpdGlvbkdyb3VwKGdyb3VwOiB1bmtub3duKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5ldmVyeSgoa2V5KSA9PiBbJyRhbmQnLCAnJG9yJywgJyRub3QnXS5pbmNsdWRlcyhrZXkpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGFsVmFsdWUodmFsdWU6IENvbmRpdGlvbkdyb3VwW10gfCBDb25kaXRpb25bXSkge1xuICAgIGlmICh2YWx1ZS5sZW5ndGggJiYgdGhpcy5pc0NvbmRpdGlvbkdyb3VwKHZhbHVlWzBdKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoaXQpID0+IHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoaXQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDb25kaXRpb25Hcm91cCh7ICRhbmQ6IHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCByb290KCk6IEZvcm1BcnJheSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJGb3JtLmdldCgnY3JpdGVyaWEnKSBhcyBGb3JtQXJyYXk7XG4gIH1cblxuICBhZGRDb25kaXRpb25Hcm91cChkYXRhOiBhbnkgPSB7ICRhbmQ6IFtFTVBUWV9DT05ESVRJT05dIH0pIHtcbiAgICB0aGlzLnJvb3QucHVzaCh0aGlzLm5ld0NvbmRpdGlvbkdyb3VwKGRhdGEpKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5ld0NvbmRpdGlvbkdyb3VwKGRhdGE6IENvbmRpdGlvbkdyb3VwKTogRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpLnJlZHVjZSgob2JqLCBba2V5LCB2YWxdKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFtrZXldOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KHZhbC5tYXAoKGl0KSA9PiB0aGlzLm5ld0NvbmRpdGlvbihpdCkpKSxcbiAgICAgIH07XG4gICAgfSwge30pO1xuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKGNvbnRyb2xzKTtcbiAgfVxuXG4gIG5ld0NvbmRpdGlvbih7IGZpZWxkLCBvcGVyYXRvciwgdmFsdWUgfTogQ29uZGl0aW9uID0gRU1QVFlfQ09ORElUSU9OKTogRm9ybUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBmaWVsZDogW2ZpZWxkLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIG9wZXJhdG9yOiBbb3BlcmF0b3IsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgdmFsdWU6IFt2YWx1ZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb25kaXRpb25Hcm91cEF0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnJvb3QucmVtb3ZlQXQoaW5kZXgsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsQ29uZGl0aW9ucygpIHtcbiAgICB3aGlsZSAodGhpcy5yb290Lmxlbmd0aCkge1xuICAgICAgdGhpcy5yb290LnJlbW92ZUF0KDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKSB7XG4gICAgdGhpcy5xYnMuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5xYnMuZWRpdFR5cGVGbiA9IHRoaXMuZWRpdFR5cGVGbjtcbiAgICB0aGlzLnFicy5hbGxvd2VkR3JvdXBpbmdzID0gdGhpcy5hbGxvd2VkR3JvdXBpbmdzIGFzIENvbmp1bmN0aW9uW107XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3RlckZpZWxkRGVmcygpIHtcbiAgICBjb25zdCBkZWZzID0gWy4uLkFycmF5LmZyb20odGhpcy5fY29udGVudEZpZWxkRGVmcyldO1xuICAgIGRlZnMuZm9yRWFjaCgoZmllbGREZWYpID0+IHtcbiAgICAgIHRoaXMucWJzLnJlZ2lzdGVyRmllbGREZWYoZmllbGREZWYpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImlubmVyRm9ybVwiPlxuICA8bm92by1zdGFjayBbZm9ybUFycmF5TmFtZV09XCJjb250cm9sTmFtZVwiIGNsYXNzPVwiY3JpdGVyaWEtYnVpbGRlci1pbm5lclwiPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ0Zvcj1cImxldCBhbmRHcm91cCBvZiByb290LmNvbnRyb2xzOyBsZXQgYW5kSW5kZXggPSBpbmRleDsgbGV0IGlzRmlyc3QgPSBmaXJzdDtsZXQgaXNMYXN0QW5kID0gbGFzdDtcIj5cbiAgICAgIDxub3ZvLWxhYmVsICpuZ0lmPVwiIWlzRmlyc3RcIiBjb2xvcj1cImFzaFwiIHNpemU9XCJ4c1wiIHVwcGVyY2FzZSBwYWRkaW5nPVwic21cIj57e3Ficy5nZXRDb25qdW5jdGlvbkxhYmVsKCdhbmQnKX19XG4gICAgICA8L25vdm8tbGFiZWw+XG4gICAgICA8bm92by1jb25kaXRpb24tZ3JvdXAgW2dyb3VwSW5kZXhdPVwiYW5kSW5kZXhcIiBbZm9ybUdyb3VwTmFtZV09XCJhbmRJbmRleFwiPjwvbm92by1jb25kaXRpb24tZ3JvdXA+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbm92by1zdGFjaz5cbjwvZm9ybT5cbjxub3ZvLWlkLWNvbmRpdGlvbi1kZWYgbmFtZT1cIklEXCI+PC9ub3ZvLWlkLWNvbmRpdGlvbi1kZWY+XG48bm92by1kYXRlLWNvbmRpdGlvbi1kZWYgbmFtZT1cIlRJTUVTVEFNUFwiPjwvbm92by1kYXRlLWNvbmRpdGlvbi1kZWY+XG48bm92by1zdHJpbmctY29uZGl0aW9uLWRlZiBuYW1lPVwiU1RSSU5HXCI+PC9ub3ZvLXN0cmluZy1jb25kaXRpb24tZGVmPlxuPG5vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkZMT0FUXCI+PC9ub3ZvLW51bWJlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWYgbmFtZT1cIklOVEVHRVJcIj48L25vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWY+XG48bm92by1udW1iZXItY29uZGl0aW9uLWRlZiBuYW1lPVwiQklHREVDSU1BTFwiPjwvbm92by1udW1iZXItY29uZGl0aW9uLWRlZj5cbjxub3ZvLW51bWJlci1jb25kaXRpb24tZGVmIG5hbWU9XCJET1VCTEVcIj48L25vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWY+XG48bm92by1hZGRyZXNzLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkFERFJFU1NcIj48L25vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmPlxuPG5vdm8tYm9vbGVhbi1jb25kaXRpb24tZGVmIG5hbWU9XCJCT09MRUFOXCI+PC9ub3ZvLWJvb2xlYW4tY29uZGl0aW9uLWRlZj5cbjxub3ZvLXBpY2tlci1jb25kaXRpb24tZGVmIG5hbWU9XCJTRUxFQ1RcIj48L25vdm8tcGlja2VyLWNvbmRpdGlvbi1kZWY+XG48bm92by1zdHJpbmctY29uZGl0aW9uLWRlZiBuYW1lPVwiREVGQVVMVFwiPjwvbm92by1zdHJpbmctY29uZGl0aW9uLWRlZj5cblxuPCEtLSBcbiAge1xuICAgICRhbmQ6IFt7XG4gICAgICAkb3I6IFt7XG4gICAgICAgIGVudGl0eTogJ0pvYk9yZGVyJ1xuICAgICAgICBmaWVsZDogJ2NhdGVnb3JpZXMnLFxuICAgICAgICBvcGVyYXRvcjogJ2RvZXNOb3RDb250YWluJyxcbiAgICAgICAgdmFsdWU6ICdIZWFsdGhjYXJlJ1xuICAgICAgfV1cbiAgICB9XVxuICB9XG4gLS0+Il19