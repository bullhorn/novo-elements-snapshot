import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, QueryList, } from '@angular/core';
import { ControlContainer, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { debounce, filter, startWith, takeUntil } from 'rxjs/operators';
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
import * as i7 from "../condition-templates/condition-templates.component";
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
        if (!qbs.componentHost) {
            qbs.componentHost = this;
        }
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.innerForm = this.formBuilder.group({
            criteria: this.formBuilder.array([]),
        });
        this.parentForm.valueChanges.pipe(startWith(this.parentForm.value), filter(v => v?.criteria), takeUntil(this._onDestroy)).subscribe((value) => {
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
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-condition-templates></novo-condition-templates>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i4.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "directive", type: i4.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i5.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i6.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex"] }, { kind: "component", type: i7.NovoConditionTemplatesComponent, selector: "novo-condition-templates" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-condition-templates></novo-condition-templates>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQUUsaUJBQWlCLEVBQW9CLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQTJDLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7QUFFOUYsTUFBTSxlQUFlLEdBQWM7SUFDakMsS0FBSyxFQUFFLElBQUk7SUFDWCxRQUFRLEVBQUUsSUFBSTtJQUNk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UzsrQkFDRSx1QkFBdUIsbUJBR2hCLHVCQUF1QixDQUFDLE1BQU0sYUFDcEM7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO3dCQUNwRyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxXQUFXLDBCQUEwQixFQUFFO3dCQUN6RSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7cUJBQ2hFLFFBQ0s7d0JBQ0osS0FBSyxFQUFFLHVCQUF1QjtxQkFDL0I7aUxBR1EsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRXlELGlCQUFpQjtzQkFBL0UsZUFBZTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBOR19WQUxVRV9BQ0NFU1NPUiwgVW50eXBlZEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgZmlsdGVyLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudG9rZW5zJztcbmltcG9ydCB7IEJhc2VGaWVsZERlZiwgQ29uZGl0aW9uLCBDb25kaXRpb25Hcm91cCwgQ29uanVuY3Rpb24gfSBmcm9tICcuLi9xdWVyeS1idWlsZGVyLnR5cGVzJztcblxuY29uc3QgRU1QVFlfQ09ORElUSU9OOiBDb25kaXRpb24gPSB7XG4gIGZpZWxkOiBudWxsLFxuICBvcGVyYXRvcjogbnVsbCxcbiAgdmFsdWU6IG51bGwsXG59O1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyaXRlcmlhLWJ1aWxkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZSB9LFxuICAgIHsgcHJvdmlkZTogTk9WT19DUklURVJJQV9CVUlMREVSLCB1c2VFeGlzdGluZzogQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IH0sXG4gICAgeyBwcm92aWRlOiBRdWVyeUJ1aWxkZXJTZXJ2aWNlLCB1c2VDbGFzczogUXVlcnlCdWlsZGVyU2VydmljZSB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWNyaXRlcmlhLWJ1aWxkZXInLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDcml0ZXJpYUJ1aWxkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuICBASW5wdXQoKSBjb250cm9sTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBhbGxvd2VkR3JvdXBpbmdzID0gW0Nvbmp1bmN0aW9uLkFORCwgQ29uanVuY3Rpb24uT1IsIENvbmp1bmN0aW9uLk5PVF07XG4gIEBJbnB1dCgpIGVkaXRUeXBlRm46IChmaWVsZDogQmFzZUZpZWxkRGVmKSA9PiBzdHJpbmc7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvQ29uZGl0aW9uRmllbGREZWYsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgX2NvbnRlbnRGaWVsZERlZnM6IFF1ZXJ5TGlzdDxOb3ZvQ29uZGl0aW9uRmllbGREZWY+O1xuXG4gIHB1YmxpYyBwYXJlbnRGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgaW5uZXJGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICAvKiogU3ViamVjdCB0aGF0IGVtaXRzIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250cm9sQ29udGFpbmVyOiBDb250cm9sQ29udGFpbmVyLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgcWJzOiBRdWVyeUJ1aWxkZXJTZXJ2aWNlLFxuICApIHtcbiAgICBpZiAoIXFicy5jb21wb25lbnRIb3N0KSB7XG4gICAgICBxYnMuY29tcG9uZW50SG9zdCA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYXJlbnRGb3JtID0gdGhpcy5jb250cm9sQ29udGFpbmVyLmNvbnRyb2wgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICB0aGlzLmlubmVyRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgY3JpdGVyaWE6IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkoW10pLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wYXJlbnRGb3JtLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgc3RhcnRXaXRoKHRoaXMucGFyZW50Rm9ybS52YWx1ZSksXG4gICAgICBmaWx0ZXIodiA9PiB2Py5jcml0ZXJpYSksXG4gICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICkuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlKHZhbHVlW3RoaXMuY29udHJvbE5hbWVdKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLmlubmVyRm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZSgoKSA9PiBpbnRlcnZhbCgxMCkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlLmNyaXRlcmlhLmZpbHRlcigoaXQsIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyhpdClbMF07XG4gICAgICAgICAgaWYgKGl0W2tleV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNvbmRpdGlvbkdyb3VwQXQoaSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpdFtrZXldLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGFyZW50Rm9ybS5nZXQodGhpcy5jb250cm9sTmFtZSkuc2V0VmFsdWUocmVzdWx0LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZmlndXJlUXVlcnlCdWlsZGVyU2VydmljZSgpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWdpc3RlckZpZWxkRGVmcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDb25kaXRpb25Hcm91cChncm91cDogdW5rbm93bikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhncm91cCkuZXZlcnkoKGtleSkgPT4gWyckYW5kJywgJyRvcicsICckbm90J10uaW5jbHVkZXMoa2V5KSk7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxWYWx1ZSh2YWx1ZTogQ29uZGl0aW9uR3JvdXBbXSB8IENvbmRpdGlvbltdKSB7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCAmJiB0aGlzLmlzQ29uZGl0aW9uR3JvdXAodmFsdWVbMF0pKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdCkgPT4gdGhpcy5hZGRDb25kaXRpb25Hcm91cChpdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENvbmRpdGlvbkdyb3VwKHsgJGFuZDogdmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvb3QoKTogRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckZvcm0uZ2V0KCdjcml0ZXJpYScpIGFzIEZvcm1BcnJheTtcbiAgfVxuXG4gIGFkZENvbmRpdGlvbkdyb3VwKGRhdGE6IGFueSA9IHsgJGFuZDogW0VNUFRZX0NPTkRJVElPTl0gfSkge1xuICAgIHRoaXMucm9vdC5wdXNoKHRoaXMubmV3Q29uZGl0aW9uR3JvdXAoZGF0YSkpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmV3Q29uZGl0aW9uR3JvdXAoZGF0YTogQ29uZGl0aW9uR3JvdXApOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5lbnRyaWVzKGRhdGEpLnJlZHVjZSgob2JqLCBba2V5LCB2YWxdKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIFtrZXldOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KHZhbC5tYXAoKGl0KSA9PiB0aGlzLm5ld0NvbmRpdGlvbihpdCkpKSxcbiAgICAgIH07XG4gICAgfSwge30pO1xuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKGNvbnRyb2xzKTtcbiAgfVxuXG4gIG5ld0NvbmRpdGlvbih7IGZpZWxkLCBvcGVyYXRvciwgdmFsdWUgfTogQ29uZGl0aW9uID0gRU1QVFlfQ09ORElUSU9OKTogVW50eXBlZEZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgZmllbGQ6IFtmaWVsZCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBvcGVyYXRvcjogW29wZXJhdG9yLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHZhbHVlOiBbdmFsdWVdLFxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29uZGl0aW9uR3JvdXBBdChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5yb290LnJlbW92ZUF0KGluZGV4LCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gIH1cblxuICBjbGVhckFsbENvbmRpdGlvbnMoKSB7XG4gICAgd2hpbGUgKHRoaXMucm9vdC5sZW5ndGgpIHtcbiAgICAgIHRoaXMucm9vdC5yZW1vdmVBdCgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb25maWd1cmVRdWVyeUJ1aWxkZXJTZXJ2aWNlKCkge1xuICAgIHRoaXMucWJzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMucWJzLmVkaXRUeXBlRm4gPSB0aGlzLmVkaXRUeXBlRm47XG4gICAgdGhpcy5xYnMuYWxsb3dlZEdyb3VwaW5ncyA9IHRoaXMuYWxsb3dlZEdyb3VwaW5ncyBhcyBDb25qdW5jdGlvbltdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJGaWVsZERlZnMoKSB7XG4gICAgY29uc3QgZGVmcyA9IFsuLi5BcnJheS5mcm9tKHRoaXMuX2NvbnRlbnRGaWVsZERlZnMpXTtcbiAgICBkZWZzLmZvckVhY2goKGZpZWxkRGVmKSA9PiB7XG4gICAgICB0aGlzLnFicy5yZWdpc3RlckZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJpbm5lckZvcm1cIj5cbiAgPG5vdm8tc3RhY2sgW2Zvcm1BcnJheU5hbWVdPVwiY29udHJvbE5hbWVcIiBjbGFzcz1cImNyaXRlcmlhLWJ1aWxkZXItaW5uZXJcIj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdGb3I9XCJsZXQgYW5kR3JvdXAgb2Ygcm9vdC5jb250cm9sczsgbGV0IGFuZEluZGV4ID0gaW5kZXg7IGxldCBpc0ZpcnN0ID0gZmlyc3Q7bGV0IGlzTGFzdEFuZCA9IGxhc3Q7XCI+XG4gICAgICA8bm92by1sYWJlbCAqbmdJZj1cIiFpc0ZpcnN0XCIgY29sb3I9XCJhc2hcIiBzaXplPVwieHNcIiB1cHBlcmNhc2UgcGFkZGluZz1cInNtXCI+e3txYnMuZ2V0Q29uanVuY3Rpb25MYWJlbCgnYW5kJyl9fVxuICAgICAgPC9ub3ZvLWxhYmVsPlxuICAgICAgPG5vdm8tY29uZGl0aW9uLWdyb3VwIFtncm91cEluZGV4XT1cImFuZEluZGV4XCIgW2Zvcm1Hcm91cE5hbWVdPVwiYW5kSW5kZXhcIj48L25vdm8tY29uZGl0aW9uLWdyb3VwPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25vdm8tc3RhY2s+XG48L2Zvcm0+XG48bm92by1jb25kaXRpb24tdGVtcGxhdGVzPjwvbm92by1jb25kaXRpb24tdGVtcGxhdGVzPlxuXG48IS0tIFxuICB7XG4gICAgJGFuZDogW3tcbiAgICAgICRvcjogW3tcbiAgICAgICAgZW50aXR5OiAnSm9iT3JkZXInXG4gICAgICAgIGZpZWxkOiAnY2F0ZWdvcmllcycsXG4gICAgICAgIG9wZXJhdG9yOiAnZG9lc05vdENvbnRhaW4nLFxuICAgICAgICB2YWx1ZTogJ0hlYWx0aGNhcmUnXG4gICAgICB9XVxuICAgIH1dXG4gIH1cbiAtLT4iXX0=