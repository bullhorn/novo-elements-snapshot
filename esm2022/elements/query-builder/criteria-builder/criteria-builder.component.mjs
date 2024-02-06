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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i1.ControlContainer }, { token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.QueryBuilderService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: CriteriaBuilderComponent, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn" }, host: { classAttribute: "novo-criteria-builder" }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
            { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
            { provide: QueryBuilderService, useClass: QueryBuilderService },
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i4.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "directive", type: i4.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i5.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i6.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex"] }, { kind: "component", type: i7.NovoDefaultAddressConditionDef, selector: "novo-address-condition-def" }, { kind: "component", type: i8.NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def" }, { kind: "component", type: i9.NovoDefaultDateConditionDef, selector: "novo-date-condition-def" }, { kind: "component", type: i10.NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def" }, { kind: "component", type: i11.NovoDefaultStringConditionDef, selector: "novo-string-condition-def" }, { kind: "component", type: i12.NovoDefaultNumberConditionDef, selector: "novo-number-condition-def" }, { kind: "component", type: i13.NovoDefaultIdConditionDef, selector: "novo-id-condition-def" }, { kind: "component", type: i14.NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQW9CLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUEyQyxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQUU5RixNQUFNLGVBQWUsR0FBYztJQUNqQyxLQUFLLEVBQUUsSUFBSTtJQUNYLFFBQVEsRUFBRSxJQUFJO0lBQ2QsS0FBSyxFQUFFLElB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QixFQUFFO3FCQUNoRSxRQUNLO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7cUJBQy9CO21NQUdRLE1BQU07c0JBQWQsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUV5RCxpQkFBaUI7c0JBQS9FLGVBQWU7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbnRhaW5lciwgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgVW50eXBlZEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudG9rZW5zJztcbmltcG9ydCB7IEJhc2VGaWVsZERlZiwgQ29uZGl0aW9uLCBDb25kaXRpb25Hcm91cCwgQ29uanVuY3Rpb24gfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcblxuY29uc3QgRU1QVFlfQ09ORElUSU9OOiBDb25kaXRpb24gPSB7XG4gIGZpZWxkOiBudWxsLFxuICBvcGVyYXRvcjogbnVsbCxcbiAgdmFsdWU6IG51bGwsXG59O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyaXRlcmlhLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZSB9LFxuICAgIHsgcHJvdmlkZTogTk9WT19DUklURVJJQV9CVUlMREVSLCB1c2VFeGlzdGluZzogQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IH0sXG4gICAgeyBwcm92aWRlOiBRdWVyeUJ1aWxkZXJTZXJ2aWNlLCB1c2VDbGFzczogUXVlcnlCdWlsZGVyU2VydmljZSB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWNyaXRlcmlhLWJ1aWxkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuICBASW5wdXQoKSBjb250cm9sTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxvd2VkR3JvdXBpbmdzID0gW0Nvbmp1bmN0aW9uLkFORCwgQ29uanVuY3Rpb24uT1IsIENvbmp1bmN0aW9uLk5PVF07XG4gIEBJbnB1dCgpIGVkaXRUeXBlRm46IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvQ29uZGl0aW9uRmllbGREZWYsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgX2NvbnRlbnRGaWVsZERlZnM6IFF1ZXJ5TGlzdDxOb3ZvQ29uZGl0aW9uRmllbGREZWY+O1xuXG4gIHB1YmxpYyBwYXJlbnRGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgaW5uZXJGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250cm9sQ29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgcWJzOiBRdWVyeUJ1aWxkZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRGb3JtID0gdGhpcy5jb250cm9sQ29udGFpbmVyLmNvbnRyb2wgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICB0aGlzLmlubmVyRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgY3JpdGVyaWE6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW10pLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wYXJlbnRGb3JtLnZhbHVlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRJbml0YWxWYWx1ZSh2YWx1ZVt0aGlzLmNvbnRyb2xOYW1lXSk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5pbm5lckZvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2UoKCkgPT4gaW50ZXJ2YWwoMTApKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZS5jcml0ZXJpYS5maWx0ZXIoKGl0LCBpKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoaXQpWzBdO1xuICAgICAgICAgIGlmIChpdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb25kaXRpb25Hcm91cEF0KGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRba2V5XS5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhcmVudEZvcm0uZ2V0KHRoaXMuY29udHJvbE5hbWUpLnNldFZhbHVlKHJlc3VsdCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVnaXN0ZXJGaWVsZERlZnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ29uZGl0aW9uR3JvdXAoZ3JvdXA6IHVua25vd24pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZ3JvdXApLmV2ZXJ5KChrZXkpID0+IFsnJGFuZCcsICckb3InLCAnJG5vdCddLmluY2x1ZGVzKGtleSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0YWxWYWx1ZSh2YWx1ZTogQ29uZGl0aW9uR3JvdXBbXSB8IENvbmRpdGlvbltdKSB7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCAmJiB0aGlzLmlzQ29uZGl0aW9uR3JvdXAodmFsdWVbMF0pKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdCkgPT4gdGhpcy5hZGRDb25kaXRpb25Hcm91cChpdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENvbmRpdGlvbkdyb3VwKHsgJGFuZDogdmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvb3QoKTogRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckZvcm0uZ2V0KCdjcml0ZXJpYScpIGFzIEZvcm1BcnJheTtcbiAgfVxuXG4gIGFkZENvbmRpdGlvbkdyb3VwKGRhdGE6IGFueSA9IHsgJGFuZDogW0VNUFRZX0NPTkRJVElPTl0gfSkge1xuICAgIHRoaXMucm9vdC5wdXNoKHRoaXMubmV3Q29uZGl0aW9uR3JvdXAoZGF0YSkpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmV3Q29uZGl0aW9uR3JvdXAoZGF0YTogQ29uZGl0aW9uR3JvdXApOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpLnJlZHVjZSgob2JqLCBba2V5LCB2YWxdKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFtrZXldOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KHZhbC5tYXAoKGl0KSA9PiB0aGlzLm5ld0NvbmRpdGlvbihpdCkpKSxcbiAgICAgIH07XG4gICAgfSwge30pO1xuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKGNvbnRyb2xzKTtcbiAgfVxuXG4gIG5ld0NvbmRpdGlvbih7IGZpZWxkLCBvcGVyYXRvciwgdmFsdWUgfTogQ29uZGl0aW9uID0gRU1QVFlfQ09ORElUSU9OKTogVW50eXBlZEZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgZmllbGQ6IFtmaWVsZCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBvcGVyYXRvcjogW29wZXJhdG9yLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHZhbHVlOiBbdmFsdWVdLFxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29uZGl0aW9uR3JvdXBBdChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5yb290LnJlbW92ZUF0KGluZGV4LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gIH1cblxuICBjbGVhckFsbENvbmRpdGlvbnMoKSB7XG4gICAgd2hpbGUgKHRoaXMucm9vdC5sZW5ndGgpIHtcbiAgICAgIHRoaXMucm9vdC5yZW1vdmVBdCgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb25maWd1cmVRdWVyeUJ1aWxkZXJTZXJ2aWNlKCkge1xuICAgIHRoaXMucWJzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMucWJzLmVkaXRUeXBlRm4gPSB0aGlzLmVkaXRUeXBlRm47XG4gICAgdGhpcy5xYnMuYWxsb3dlZEdyb3VwaW5ncyA9IHRoaXMuYWxsb3dlZEdyb3VwaW5ncyBhcyBDb25qdW5jdGlvbltdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJGaWVsZERlZnMoKSB7XG4gICAgY29uc3QgZGVmcyA9IFsuLi5BcnJheS5mcm9tKHRoaXMuX2NvbnRlbnRGaWVsZERlZnMpXTtcbiAgICBkZWZzLmZvckVhY2goKGZpZWxkRGVmKSA9PiB7XG4gICAgICB0aGlzLnFicy5yZWdpc3RlckZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJpbm5lckZvcm1cIj5cbiAgPG5vdm8tc3RhY2sgW2Zvcm1BcnJheU5hbWVdPVwiY29udHJvbE5hbWVcIiBjbGFzcz1cImNyaXRlcmlhLWJ1aWxkZXItaW5uZXJcIj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdGb3I9XCJsZXQgYW5kR3JvdXAgb2Ygcm9vdC5jb250cm9sczsgbGV0IGFuZEluZGV4ID0gaW5kZXg7IGxldCBpc0ZpcnN0ID0gZmlyc3Q7bGV0IGlzTGFzdEFuZCA9IGxhc3Q7XCI+XG4gICAgICA8bm92by1sYWJlbCAqbmdJZj1cIiFpc0ZpcnN0XCIgY29sb3I9XCJhc2hcIiBzaXplPVwieHNcIiB1cHBlcmNhc2UgcGFkZGluZz1cInNtXCI+e3txYnMuZ2V0Q29uanVuY3Rpb25MYWJlbCgnYW5kJyl9fVxuICAgICAgPC9ub3ZvLWxhYmVsPlxuICAgICAgPG5vdm8tY29uZGl0aW9uLWdyb3VwIFtncm91cEluZGV4XT1cImFuZEluZGV4XCIgW2Zvcm1Hcm91cE5hbWVdPVwiYW5kSW5kZXhcIj48L25vdm8tY29uZGl0aW9uLWdyb3VwPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25vdm8tc3RhY2s+XG48L2Zvcm0+XG48bm92by1pZC1jb25kaXRpb24tZGVmIG5hbWU9XCJJRFwiPjwvbm92by1pZC1jb25kaXRpb24tZGVmPlxuPG5vdm8tZGF0ZS1jb25kaXRpb24tZGVmIG5hbWU9XCJEQVRFXCI+PC9ub3ZvLWRhdGUtY29uZGl0aW9uLWRlZj5cbjxub3ZvLWRhdGUtdGltZS1jb25kaXRpb24tZGVmIG5hbWU9XCJUSU1FU1RBTVBcIj48L25vdm8tZGF0ZS10aW1lLWNvbmRpdGlvbi1kZWY+XG48bm92by1zdHJpbmctY29uZGl0aW9uLWRlZiBuYW1lPVwiU1RSSU5HXCI+PC9ub3ZvLXN0cmluZy1jb25kaXRpb24tZGVmPlxuPG5vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkZMT0FUXCI+PC9ub3ZvLW51bWJlci1jb25kaXRpb24tZGVmPlxuPG5vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWYgbmFtZT1cIklOVEVHRVJcIj48L25vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWY+XG48bm92by1udW1iZXItY29uZGl0aW9uLWRlZiBuYW1lPVwiQklHREVDSU1BTFwiPjwvbm92by1udW1iZXItY29uZGl0aW9uLWRlZj5cbjxub3ZvLW51bWJlci1jb25kaXRpb24tZGVmIG5hbWU9XCJET1VCTEVcIj48L25vdm8tbnVtYmVyLWNvbmRpdGlvbi1kZWY+XG48bm92by1hZGRyZXNzLWNvbmRpdGlvbi1kZWYgbmFtZT1cIkFERFJFU1NcIj48L25vdm8tYWRkcmVzcy1jb25kaXRpb24tZGVmPlxuPG5vdm8tYm9vbGVhbi1jb25kaXRpb24tZGVmIG5hbWU9XCJCT09MRUFOXCI+PC9ub3ZvLWJvb2xlYW4tY29uZGl0aW9uLWRlZj5cbjxub3ZvLXBpY2tlci1jb25kaXRpb24tZGVmIG5hbWU9XCJTRUxFQ1RcIj48L25vdm8tcGlja2VyLWNvbmRpdGlvbi1kZWY+XG48bm92by1zdHJpbmctY29uZGl0aW9uLWRlZiBuYW1lPVwiREVGQVVMVFwiPjwvbm92by1zdHJpbmctY29uZGl0aW9uLWRlZj5cblxuPCEtLSBcbiAge1xuICAgICRhbmQ6IFt7XG4gICAgICAkb3I6IFt7XG4gICAgICAgIGVudGl0eTogJ0pvYk9yZGVyJ1xuICAgICAgICBmaWVsZDogJ2NhdGVnb3JpZXMnLFxuICAgICAgICBvcGVyYXRvcjogJ2RvZXNOb3RDb250YWluJyxcbiAgICAgICAgdmFsdWU6ICdIZWFsdGhjYXJlJ1xuICAgICAgfV1cbiAgICB9XVxuICB9XG4gLS0+Il19