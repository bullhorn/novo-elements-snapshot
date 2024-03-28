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
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/elements/common";
import * as i5 from "novo-elements/elements/flex";
import * as i6 from "../condition-group/condition-group.component";
import * as i7 from "../condition-definitions/address-condition.definition";
import * as i8 from "../condition-definitions/boolean-condition.definition";
import * as i9 from "../condition-definitions/date-condition.definition";
import * as i10 from "../condition-definitions/date-time-condition.definition";
import * as i11 from "../condition-definitions/string-condition.definition";
import * as i12 from "../condition-definitions/number-condition.definition";
import * as i13 from "../condition-definitions/id-condition.definition";
import * as i14 from "../condition-definitions/picker-condition.definition";
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
            value: [value],
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i1.ControlContainer }, { token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.QueryBuilderService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: CriteriaBuilderComponent, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn" }, host: { classAttribute: "novo-criteria-builder" }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
            { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
            { provide: QueryBuilderService, useClass: QueryBuilderService },
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i4.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "directive", type: i4.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i5.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i6.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex"] }, { kind: "component", type: i7.NovoDefaultAddressConditionDef, selector: "novo-address-condition-def" }, { kind: "component", type: i8.NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def" }, { kind: "component", type: i9.NovoDefaultDateConditionDef, selector: "novo-date-condition-def" }, { kind: "component", type: i10.NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def" }, { kind: "component", type: i11.NovoDefaultStringConditionDef, selector: "novo-string-condition-def" }, { kind: "component", type: i12.NovoDefaultNumberConditionDef, selector: "novo-number-condition-def" }, { kind: "component", type: i13.NovoDefaultIdConditionDef, selector: "novo-id-condition-def" }, { kind: "component", type: i14.NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
        }], ctorParameters: () => [{ type: i1.ControlContainer }, { type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.QueryBuilderService }], propDecorators: { config: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQW9CLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUEyQyxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQUU5RixNQUFNLGVBQWUsR0FBYztJQUNqQyxLQUFLLEVBQUUsSUFBSTtJQUNYLFFBQVEsRUFBRSxJQUFJO0lBQ2QsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBZUYsTUFBTSxPQUFPLHdCQUF3QjtJQWFuQyxZQUNVLGdCQUFrQyxFQUNsQyxXQUF3QixFQUN4QixHQUFzQixFQUN2QixHQUF3QjtRQUh2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3ZCLFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBZHhCLHFCQUFnQixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQU8vRSxnRUFBZ0U7UUFDL0MsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFPL0MsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUEyQixDQUFDO1FBQ3BFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDdEMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNyQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hGLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZO2FBQ3hCLElBQUksQ0FDSCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQzNCO2FBQ0EsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUNELE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEtBQWM7UUFDckMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTyxjQUFjLENBQUMsS0FBcUM7UUFDMUQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBYyxDQUFDO0lBQ3JELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxPQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBb0I7UUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUMvRCxPQUFPO2dCQUNMLEdBQUcsR0FBRztnQkFDTixDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN0RSxDQUFDO1FBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEtBQWdCLGVBQWU7UUFDbEUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM1QixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUN6QyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsS0FBYTtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUVPLDZCQUE2QjtRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWlDLENBQUM7SUFDckUsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0EvSFUsd0JBQXdCO2tHQUF4Qix3QkFBd0IsNk5BVHhCO1lBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7WUFDcEcsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFO1lBQ3pFLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtTQUNoRSw0REFXZ0IscUJBQXFCLGdEQzlDeEMsc2xEQWtDSTs7MkZETVMsd0JBQXdCO2tCQWRwQyxTQUFTOytCQUNFLHVCQUF1QixtQkFHaEIsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDVCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSx5QkFBeUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7d0JBQ3BHLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFdBQVcsMEJBQTBCLEVBQUU7d0JBQ3pFLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtxQkFDaEUsUUFDSzt3QkFDSixLQUFLLEVBQUUsdUJBQXVCO3FCQUMvQjtpTEFHUSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFeUQsaUJBQWlCO3NCQUEvRSxlQUFlO3VCQUFDLHFCQUFxQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1BcnJheSwgRm9ybUJ1aWxkZXIsIFVudHlwZWRGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvQ29uZGl0aW9uRmllbGREZWYgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLmRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUXVlcnlCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOT1ZPX0NSSVRFUklBX0JVSUxERVIgfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnRva2Vucyc7XG5pbXBvcnQgeyBCYXNlRmllbGREZWYsIENvbmRpdGlvbiwgQ29uZGl0aW9uR3JvdXAsIENvbmp1bmN0aW9uIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbmNvbnN0IEVNUFRZX0NPTkRJVElPTjogQ29uZGl0aW9uID0ge1xuICBmaWVsZDogbnVsbCxcbiAgb3BlcmF0b3I6IG51bGwsXG4gIHZhbHVlOiBudWxsLFxufTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY3JpdGVyaWEtYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50KSwgbXVsdGk6IHRydWUgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiwgdXNlRXhpc3Rpbmc6IENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogUXVlcnlCdWlsZGVyU2VydmljZSwgdXNlQ2xhc3M6IFF1ZXJ5QnVpbGRlclNlcnZpY2UgfSxcbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQElucHV0KCkgY29udHJvbE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgYWxsb3dlZEdyb3VwaW5ncyA9IFtDb25qdW5jdGlvbi5BTkQsIENvbmp1bmN0aW9uLk9SLCBDb25qdW5jdGlvbi5OT1RdO1xuICBASW5wdXQoKSBlZGl0VHlwZUZuOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b0NvbmRpdGlvbkZpZWxkRGVmLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIF9jb250ZW50RmllbGREZWZzOiBRdWVyeUxpc3Q8Tm92b0NvbmRpdGlvbkZpZWxkRGVmPjtcblxuICBwdWJsaWMgcGFyZW50Rm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgcHVibGljIGlubmVyRm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgLyoqIFN1YmplY3QgdGhhdCBlbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udHJvbENvbnRhaW5lcjogQ29udHJvbENvbnRhaW5lcixcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIHFiczogUXVlcnlCdWlsZGVyU2VydmljZSxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFyZW50Rm9ybSA9IHRoaXMuY29udHJvbENvbnRhaW5lci5jb250cm9sIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgdGhpcy5pbm5lckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGNyaXRlcmlhOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICB9KTtcblxuICAgIHRoaXMucGFyZW50Rm9ybS52YWx1ZUNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5pdGFsVmFsdWUodmFsdWVbdGhpcy5jb250cm9sTmFtZV0pO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuaW5uZXJGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlKCgpID0+IGludGVydmFsKDEwKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUuY3JpdGVyaWEuZmlsdGVyKChpdCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGl0KVswXTtcbiAgICAgICAgICBpZiAoaXRba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29uZGl0aW9uR3JvdXBBdChpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0W2tleV0ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXJlbnRGb3JtLmdldCh0aGlzLmNvbnRyb2xOYW1lKS5zZXRWYWx1ZShyZXN1bHQsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWd1cmVRdWVyeUJ1aWxkZXJTZXJ2aWNlKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlZ2lzdGVyRmllbGREZWZzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NvbmRpdGlvbkdyb3VwKGdyb3VwOiB1bmtub3duKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5ldmVyeSgoa2V5KSA9PiBbJyRhbmQnLCAnJG9yJywgJyRub3QnXS5pbmNsdWRlcyhrZXkpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGFsVmFsdWUodmFsdWU6IENvbmRpdGlvbkdyb3VwW10gfCBDb25kaXRpb25bXSkge1xuICAgIGlmICh2YWx1ZS5sZW5ndGggJiYgdGhpcy5pc0NvbmRpdGlvbkdyb3VwKHZhbHVlWzBdKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoaXQpID0+IHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoaXQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDb25kaXRpb25Hcm91cCh7ICRhbmQ6IHZhbHVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCByb290KCk6IEZvcm1BcnJheSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJGb3JtLmdldCgnY3JpdGVyaWEnKSBhcyBGb3JtQXJyYXk7XG4gIH1cblxuICBhZGRDb25kaXRpb25Hcm91cChkYXRhOiBhbnkgPSB7ICRhbmQ6IFtFTVBUWV9DT05ESVRJT05dIH0pIHtcbiAgICB0aGlzLnJvb3QucHVzaCh0aGlzLm5ld0NvbmRpdGlvbkdyb3VwKGRhdGEpKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5ld0NvbmRpdGlvbkdyb3VwKGRhdGE6IENvbmRpdGlvbkdyb3VwKTogVW50eXBlZEZvcm1Hcm91cCB7XG4gICAgY29uc3QgY29udHJvbHMgPSBPYmplY3QuZW50cmllcyhkYXRhKS5yZWR1Y2UoKG9iaiwgW2tleSwgdmFsXSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ub2JqLFxuICAgICAgICBba2V5XTogdGhpcy5mb3JtQnVpbGRlci5hcnJheSh2YWwubWFwKChpdCkgPT4gdGhpcy5uZXdDb25kaXRpb24oaXQpKSksXG4gICAgICB9O1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cChjb250cm9scyk7XG4gIH1cblxuICBuZXdDb25kaXRpb24oeyBmaWVsZCwgb3BlcmF0b3IsIHZhbHVlIH06IENvbmRpdGlvbiA9IEVNUFRZX0NPTkRJVElPTik6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGZpZWxkOiBbZmllbGQsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgb3BlcmF0b3I6IFtvcGVyYXRvciwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICB2YWx1ZTogW3ZhbHVlXSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbmRpdGlvbkdyb3VwQXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMucm9vdC5yZW1vdmVBdChpbmRleCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICB9XG5cbiAgY2xlYXJBbGxDb25kaXRpb25zKCkge1xuICAgIHdoaWxlICh0aGlzLnJvb3QubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJvb3QucmVtb3ZlQXQoMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uZmlndXJlUXVlcnlCdWlsZGVyU2VydmljZSgpIHtcbiAgICB0aGlzLnFicy5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLnFicy5lZGl0VHlwZUZuID0gdGhpcy5lZGl0VHlwZUZuO1xuICAgIHRoaXMucWJzLmFsbG93ZWRHcm91cGluZ3MgPSB0aGlzLmFsbG93ZWRHcm91cGluZ3MgYXMgQ29uanVuY3Rpb25bXTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyRmllbGREZWZzKCkge1xuICAgIGNvbnN0IGRlZnMgPSBbLi4uQXJyYXkuZnJvbSh0aGlzLl9jb250ZW50RmllbGREZWZzKV07XG4gICAgZGVmcy5mb3JFYWNoKChmaWVsZERlZikgPT4ge1xuICAgICAgdGhpcy5xYnMucmVnaXN0ZXJGaWVsZERlZihmaWVsZERlZik7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxmb3JtIFtmb3JtR3JvdXBdPVwiaW5uZXJGb3JtXCI+XG4gIDxub3ZvLXN0YWNrIFtmb3JtQXJyYXlOYW1lXT1cImNvbnRyb2xOYW1lXCIgY2xhc3M9XCJjcml0ZXJpYS1idWlsZGVyLWlubmVyXCI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nRm9yPVwibGV0IGFuZEdyb3VwIG9mIHJvb3QuY29udHJvbHM7IGxldCBhbmRJbmRleCA9IGluZGV4OyBsZXQgaXNGaXJzdCA9IGZpcnN0O2xldCBpc0xhc3RBbmQgPSBsYXN0O1wiPlxuICAgICAgPG5vdm8tbGFiZWwgKm5nSWY9XCIhaXNGaXJzdFwiIGNvbG9yPVwiYXNoXCIgc2l6ZT1cInhzXCIgdXBwZXJjYXNlIHBhZGRpbmc9XCJzbVwiPnt7cWJzLmdldENvbmp1bmN0aW9uTGFiZWwoJ2FuZCcpfX1cbiAgICAgIDwvbm92by1sYWJlbD5cbiAgICAgIDxub3ZvLWNvbmRpdGlvbi1ncm91cCBbZ3JvdXBJbmRleF09XCJhbmRJbmRleFwiIFtmb3JtR3JvdXBOYW1lXT1cImFuZEluZGV4XCI+PC9ub3ZvLWNvbmRpdGlvbi1ncm91cD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9ub3ZvLXN0YWNrPlxuPC9mb3JtPlxuPG5vdm8taWQtY29uZGl0aW9uLWRlZiBuYW1lPVwiSURcIj48L25vdm8taWQtY29uZGl0aW9uLWRlZj5cbjxub3ZvLWRhdGUtY29uZGl0aW9uLWRlZiBuYW1lPVwiREFURVwiPjwvbm92by1kYXRlLWNvbmRpdGlvbi1kZWY+XG48bm92by1kYXRlLXRpbWUtY29uZGl0aW9uLWRlZiBuYW1lPVwiVElNRVNUQU1QXCI+PC9ub3ZvLWRhdGUtdGltZS1jb25kaXRpb24tZGVmPlxuPG5vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWYgbmFtZT1cIlNUUklOR1wiPjwvbm92by1zdHJpbmctY29uZGl0aW9uLWRlZj5cbjxub3ZvLW51bWJlci1jb25kaXRpb24tZGVmIG5hbWU9XCJGTE9BVFwiPjwvbm92by1udW1iZXItY29uZGl0aW9uLWRlZj5cbjxub3ZvLW51bWJlci1jb25kaXRpb24tZGVmIG5hbWU9XCJJTlRFR0VSXCI+PC9ub3ZvLW51bWJlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkJJR0RFQ0lNQUxcIj48L25vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWY+XG48bm92by1udW1iZXItY29uZGl0aW9uLWRlZiBuYW1lPVwiRE9VQkxFXCI+PC9ub3ZvLW51bWJlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmIG5hbWU9XCJBRERSRVNTXCI+PC9ub3ZvLWFkZHJlc3MtY29uZGl0aW9uLWRlZj5cbjxub3ZvLWJvb2xlYW4tY29uZGl0aW9uLWRlZiBuYW1lPVwiQk9PTEVBTlwiPjwvbm92by1ib29sZWFuLWNvbmRpdGlvbi1kZWY+XG48bm92by1waWNrZXItY29uZGl0aW9uLWRlZiBuYW1lPVwiU0VMRUNUXCI+PC9ub3ZvLXBpY2tlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkRFRkFVTFRcIj48L25vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWY+XG5cbjwhLS0gXG4gIHtcbiAgICAkYW5kOiBbe1xuICAgICAgJG9yOiBbe1xuICAgICAgICBlbnRpdHk6ICdKb2JPcmRlcidcbiAgICAgICAgZmllbGQ6ICdjYXRlZ29yaWVzJyxcbiAgICAgICAgb3BlcmF0b3I6ICdkb2VzTm90Q29udGFpbicsXG4gICAgICAgIHZhbHVlOiAnSGVhbHRoY2FyZSdcbiAgICAgIH1dXG4gICAgfV1cbiAgfVxuIC0tPiJdfQ==