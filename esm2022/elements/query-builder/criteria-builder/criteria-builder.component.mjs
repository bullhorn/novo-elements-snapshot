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
import * as i4 from "novo-elements/elements/flex";
import * as i5 from "../condition-group/condition-group.component";
import * as i6 from "../condition-definitions/address-condition.definition";
import * as i7 from "../condition-definitions/boolean-condition.definition";
import * as i8 from "../condition-definitions/date-condition.definition";
import * as i9 from "../condition-definitions/date-time-condition.definition";
import * as i10 from "../condition-definitions/string-condition.definition";
import * as i11 from "../condition-definitions/number-condition.definition";
import * as i12 from "../condition-definitions/id-condition.definition";
import * as i13 from "../condition-definitions/picker-condition.definition";
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
                this.setInitialValue(value[this.controlName]);
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
    setInitialValue(value) {
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
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n  -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i4.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i5.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex"] }, { kind: "component", type: i6.NovoDefaultAddressConditionDef, selector: "novo-address-condition-def" }, { kind: "component", type: i7.NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def" }, { kind: "component", type: i8.NovoDefaultDateConditionDef, selector: "novo-date-condition-def" }, { kind: "component", type: i9.NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def" }, { kind: "component", type: i10.NovoDefaultStringConditionDef, selector: "novo-string-condition-def" }, { kind: "component", type: i11.NovoDefaultNumberConditionDef, selector: "novo-number-condition-def" }, { kind: "component", type: i12.NovoDefaultIdConditionDef, selector: "novo-id-condition-def" }, { kind: "component", type: i13.NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n  -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQW9CLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUEyQyxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBRTlGLE1BQU0sZUFBZSxHQUFjO0lBQ2pDLEtBQUssRUFBRSxJQUFJO0lBQ1gsUUFBUSxFQUFFLElBQUk7SUFDZCxLQUFLLEVBQUUsSUFB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RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO3FCQUNoRSxRQUNLO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7cUJBQy9CO2lMQUdRLE1BQU07c0JBQWQsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUV5RCxpQkFBaUI7c0JBQS9FLGVBQWU7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbnRhaW5lciwgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgVW50eXBlZEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudG9rZW5zJztcbmltcG9ydCB7IEJhc2VGaWVsZERlZiwgQ29uZGl0aW9uLCBDb25kaXRpb25Hcm91cCwgQ29uanVuY3Rpb24gfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcblxuY29uc3QgRU1QVFlfQ09ORElUSU9OOiBDb25kaXRpb24gPSB7XG4gIGZpZWxkOiBudWxsLFxuICBvcGVyYXRvcjogbnVsbCxcbiAgdmFsdWU6IG51bGwsXG59O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyaXRlcmlhLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZSB9LFxuICAgIHsgcHJvdmlkZTogTk9WT19DUklURVJJQV9CVUlMREVSLCB1c2VFeGlzdGluZzogQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IH0sXG4gICAgeyBwcm92aWRlOiBRdWVyeUJ1aWxkZXJTZXJ2aWNlLCB1c2VDbGFzczogUXVlcnlCdWlsZGVyU2VydmljZSB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWNyaXRlcmlhLWJ1aWxkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuICBASW5wdXQoKSBjb250cm9sTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxvd2VkR3JvdXBpbmdzID0gW0Nvbmp1bmN0aW9uLkFORCwgQ29uanVuY3Rpb24uT1IsIENvbmp1bmN0aW9uLk5PVF07XG4gIEBJbnB1dCgpIGVkaXRUeXBlRm46IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvQ29uZGl0aW9uRmllbGREZWYsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgX2NvbnRlbnRGaWVsZERlZnM6IFF1ZXJ5TGlzdDxOb3ZvQ29uZGl0aW9uRmllbGREZWY+O1xuXG4gIHB1YmxpYyBwYXJlbnRGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgaW5uZXJGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250cm9sQ29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgcWJzOiBRdWVyeUJ1aWxkZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRGb3JtID0gdGhpcy5jb250cm9sQ29udGFpbmVyLmNvbnRyb2wgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICB0aGlzLmlubmVyRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgY3JpdGVyaWE6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW10pLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wYXJlbnRGb3JtLnZhbHVlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRJbml0aWFsVmFsdWUodmFsdWVbdGhpcy5jb250cm9sTmFtZV0pO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuaW5uZXJGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlKCgpID0+IGludGVydmFsKDEwKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUuY3JpdGVyaWEuZmlsdGVyKChpdCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGl0KVswXTtcbiAgICAgICAgICBpZiAoaXRba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29uZGl0aW9uR3JvdXBBdChpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0W2tleV0ubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wYXJlbnRGb3JtLmdldCh0aGlzLmNvbnRyb2xOYW1lKS5zZXRWYWx1ZShyZXN1bHQsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWd1cmVRdWVyeUJ1aWxkZXJTZXJ2aWNlKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlZ2lzdGVyRmllbGREZWZzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NvbmRpdGlvbkdyb3VwKGdyb3VwOiB1bmtub3duKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5ldmVyeSgoa2V5KSA9PiBbJyRhbmQnLCAnJG9yJywgJyRub3QnXS5pbmNsdWRlcyhrZXkpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFZhbHVlKHZhbHVlOiBDb25kaXRpb25Hcm91cFtdIHwgQ29uZGl0aW9uW10pIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoICYmIHRoaXMuaXNDb25kaXRpb25Hcm91cCh2YWx1ZVswXSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGl0KSA9PiB0aGlzLmFkZENvbmRpdGlvbkdyb3VwKGl0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgcm9vdCgpOiBGb3JtQXJyYXkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRm9ybS5nZXQoJ2NyaXRlcmlhJykgYXMgRm9ybUFycmF5O1xuICB9XG5cbiAgYWRkQ29uZGl0aW9uR3JvdXAoZGF0YTogYW55ID0geyAkYW5kOiBbRU1QVFlfQ09ORElUSU9OXSB9KSB7XG4gICAgdGhpcy5yb290LnB1c2godGhpcy5uZXdDb25kaXRpb25Hcm91cChkYXRhKSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZXdDb25kaXRpb25Hcm91cChkYXRhOiBDb25kaXRpb25Hcm91cCk6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmVudHJpZXMoZGF0YSkucmVkdWNlKChvYmosIFtrZXksIHZhbF0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW2tleV06IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkodmFsLm1hcCgoaXQpID0+IHRoaXMubmV3Q29uZGl0aW9uKGl0KSkpLFxuICAgICAgfTtcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoY29udHJvbHMpO1xuICB9XG5cbiAgbmV3Q29uZGl0aW9uKHsgZmllbGQsIG9wZXJhdG9yLCB2YWx1ZSB9OiBDb25kaXRpb24gPSBFTVBUWV9DT05ESVRJT04pOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBmaWVsZDogW2ZpZWxkLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIG9wZXJhdG9yOiBbb3BlcmF0b3IsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgdmFsdWU6IFt2YWx1ZV0sXG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb25kaXRpb25Hcm91cEF0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnJvb3QucmVtb3ZlQXQoaW5kZXgsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsQ29uZGl0aW9ucygpIHtcbiAgICB3aGlsZSAodGhpcy5yb290Lmxlbmd0aCkge1xuICAgICAgdGhpcy5yb290LnJlbW92ZUF0KDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKSB7XG4gICAgdGhpcy5xYnMuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5xYnMuZWRpdFR5cGVGbiA9IHRoaXMuZWRpdFR5cGVGbjtcbiAgICB0aGlzLnFicy5hbGxvd2VkR3JvdXBpbmdzID0gdGhpcy5hbGxvd2VkR3JvdXBpbmdzIGFzIENvbmp1bmN0aW9uW107XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3RlckZpZWxkRGVmcygpIHtcbiAgICBjb25zdCBkZWZzID0gWy4uLkFycmF5LmZyb20odGhpcy5fY29udGVudEZpZWxkRGVmcyldO1xuICAgIGRlZnMuZm9yRWFjaCgoZmllbGREZWYpID0+IHtcbiAgICAgIHRoaXMucWJzLnJlZ2lzdGVyRmllbGREZWYoZmllbGREZWYpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cImlubmVyRm9ybVwiPlxuICA8bm92by1zdGFjayBbZm9ybUFycmF5TmFtZV09XCJjb250cm9sTmFtZVwiIGNsYXNzPVwiY3JpdGVyaWEtYnVpbGRlci1pbm5lclwiPlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ0Zvcj1cImxldCBhbmRHcm91cCBvZiByb290LmNvbnRyb2xzOyBsZXQgYW5kSW5kZXggPSBpbmRleDsgbGV0IGlzRmlyc3QgPSBmaXJzdDtsZXQgaXNMYXN0QW5kID0gbGFzdDtcIj5cbiAgICAgIDxub3ZvLWNvbmRpdGlvbi1ncm91cCBbZ3JvdXBJbmRleF09XCJhbmRJbmRleFwiIFtmb3JtR3JvdXBOYW1lXT1cImFuZEluZGV4XCI+PC9ub3ZvLWNvbmRpdGlvbi1ncm91cD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9ub3ZvLXN0YWNrPlxuPC9mb3JtPlxuPG5vdm8taWQtY29uZGl0aW9uLWRlZiBuYW1lPVwiSURcIj48L25vdm8taWQtY29uZGl0aW9uLWRlZj5cbjxub3ZvLWRhdGUtY29uZGl0aW9uLWRlZiBuYW1lPVwiREFURVwiPjwvbm92by1kYXRlLWNvbmRpdGlvbi1kZWY+XG48bm92by1kYXRlLXRpbWUtY29uZGl0aW9uLWRlZiBuYW1lPVwiVElNRVNUQU1QXCI+PC9ub3ZvLWRhdGUtdGltZS1jb25kaXRpb24tZGVmPlxuPG5vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWYgbmFtZT1cIlNUUklOR1wiPjwvbm92by1zdHJpbmctY29uZGl0aW9uLWRlZj5cbjxub3ZvLW51bWJlci1jb25kaXRpb24tZGVmIG5hbWU9XCJGTE9BVFwiPjwvbm92by1udW1iZXItY29uZGl0aW9uLWRlZj5cbjxub3ZvLW51bWJlci1jb25kaXRpb24tZGVmIG5hbWU9XCJJTlRFR0VSXCI+PC9ub3ZvLW51bWJlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkJJR0RFQ0lNQUxcIj48L25vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWY+XG48bm92by1udW1iZXItY29uZGl0aW9uLWRlZiBuYW1lPVwiRE9VQkxFXCI+PC9ub3ZvLW51bWJlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmIG5hbWU9XCJBRERSRVNTXCI+PC9ub3ZvLWFkZHJlc3MtY29uZGl0aW9uLWRlZj5cbjxub3ZvLWJvb2xlYW4tY29uZGl0aW9uLWRlZiBuYW1lPVwiQk9PTEVBTlwiPjwvbm92by1ib29sZWFuLWNvbmRpdGlvbi1kZWY+XG48bm92by1waWNrZXItY29uZGl0aW9uLWRlZiBuYW1lPVwiU0VMRUNUXCI+PC9ub3ZvLXBpY2tlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkRFRkFVTFRcIj48L25vdm8tc3RyaW5nLWNvbmRpdGlvbi1kZWY+XG5cbjwhLS1cbiAge1xuICAgICRhbmQ6IFt7XG4gICAgICAkb3I6IFt7XG4gICAgICAgIGVudGl0eTogJ0pvYk9yZGVyJ1xuICAgICAgICBmaWVsZDogJ2NhdGVnb3JpZXMnLFxuICAgICAgICBvcGVyYXRvcjogJ2RvZXNOb3RDb250YWluJyxcbiAgICAgICAgdmFsdWU6ICdIZWFsdGhjYXJlJ1xuICAgICAgfV1cbiAgICB9XVxuICB9XG4gIC0tPlxuIl19