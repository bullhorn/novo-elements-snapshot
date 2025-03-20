import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, ContentChildren, forwardRef, Input, QueryList, viewChild, viewChildren, } from '@angular/core';
import { ControlContainer, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { debounce, filter, startWith, takeUntil } from 'rxjs/operators';
import { NovoTabbedGroupPickerElement } from 'novo-elements/elements/tabbed-group-picker';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers } from 'novo-elements/utils';
import { ConditionGroupComponent } from '../condition-group/condition-group.component';
import { NovoConditionFieldDef } from '../query-builder.directives';
import { QueryBuilderService } from '../query-builder.service';
import { NOVO_CRITERIA_BUILDER } from '../query-builder.tokens';
import { Conjunction } from '../query-builder.types';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../query-builder.service";
import * as i3 from "novo-elements/services";
import * as i4 from "@angular/common";
import * as i5 from "novo-elements/elements/common";
import * as i6 from "novo-elements/elements/flex";
import * as i7 from "novo-elements/elements/tabbed-group-picker";
import * as i8 from "../condition-group/condition-group.component";
import * as i9 from "../condition-templates/condition-templates.component";
const EMPTY_CONDITION = {
    conditionType: '$and',
    field: null,
    operator: null,
    scope: null,
    value: null,
    supportingValue: null,
};
export class CriteriaBuilderComponent {
    set HideFirstOperator(hide) {
        if (!Helpers.isEmpty(hide)) {
            this._hideFirstOperator = hide;
        }
    }
    get hideFirstOperator() {
        return this._hideFirstOperator;
    }
    constructor(controlContainer, formBuilder, cdr, qbs, labels) {
        this.controlContainer = controlContainer;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.qbs = qbs;
        this.labels = labels;
        this.allowedGroupings = [Conjunction.AND, Conjunction.OR, Conjunction.NOT];
        this.canBeEmpty = false;
        this._hideFirstOperator = true;
        this.scopedFieldPicker = viewChild(NovoTabbedGroupPickerElement);
        this.conditionGroups = viewChildren(ConditionGroupComponent);
        this.tabbedGroupPickerTabs = computed(() => {
            const tabs = [];
            this.qbs.scopes()?.forEach((scope) => {
                tabs.push({
                    typeName: scope,
                    typeLabel: scope,
                    valueField: 'name',
                    labelField: 'label',
                    data: this.qbs.config.fields.find((field) => field.value === scope)?.options || [],
                });
            });
            return tabs;
        });
        this.addButtonConfig = {
            theme: 'dialogue',
            side: 'left',
            size: 'sm',
            icon: 'add-thin',
            label: this.labels.addCondition,
        };
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
        if (value.length) {
            if (this.isConditionGroup(value[0])) {
                value.forEach((it) => this.addConditionGroup(it));
            }
            else {
                const conditions = [...value];
                if (this.qbs.hasMultipleScopes()) {
                    // divide up by scope into separate groups
                    const scopedConditions = {};
                    conditions.forEach((condition) => {
                        scopedConditions[condition.scope] = scopedConditions[condition.scope] || [];
                        scopedConditions[condition.scope].push(condition);
                    });
                    for (const scope in scopedConditions) {
                        this.addConditionGroup({ $and: scopedConditions[scope] });
                    }
                }
                else {
                    this.addConditionGroup({ $and: conditions });
                }
            }
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
    newCondition({ field, operator, scope, value, supportingValue } = EMPTY_CONDITION) {
        return this.formBuilder.group({
            conditionType: '$and',
            field: [field, Validators.required],
            operator: [operator, Validators.required],
            scope: [scope],
            value: [value],
            supportingValue: [supportingValue],
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
    onFieldSelect(field) {
        this.scopedFieldPicker().dropdown.closePanel();
        const condition = { field: field.name, operator: null, scope: field.scope, value: null };
        const group = this.conditionGroups().find((group) => group.scope === field.scope);
        if (group) {
            group.addCondition(condition);
        }
        else {
            this.addConditionGroup({ $and: [condition] });
        }
    }
    _configureQueryBuilderService() {
        this.qbs.scopes.set(this.config?.fields.map((f) => f.value));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i1.ControlContainer }, { token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.QueryBuilderService }, { token: i3.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "17.3.12", type: CriteriaBuilderComponent, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn", addressConfig: "addressConfig", canBeEmpty: "canBeEmpty", HideFirstOperator: ["hideFirstOperator", "HideFirstOperator"] }, host: { classAttribute: "novo-criteria-builder" }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
            { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
            { provide: QueryBuilderService, useClass: QueryBuilderService },
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], viewQueries: [{ propertyName: "scopedFieldPicker", first: true, predicate: NovoTabbedGroupPickerElement, descendants: true, isSignal: true }, { propertyName: "conditionGroups", predicate: ConditionGroupComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{ qbs.hasMultipleScopes() ? conditionGroup.scope + ' ' + labels.filterss : qbs.getConjunctionLabel('and') }}</novo-label>\n      <novo-condition-group [hideFirstOperator]=\"hideFirstOperator\" [canBeEmpty]=\"canBeEmpty\" [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\" #conditionGroup></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n  <novo-tabbed-group-picker\n    *ngIf=\"qbs.hasMultipleScopes()\"\n    [tabs]=\"tabbedGroupPickerTabs()\"\n    [selectionEnabled]=\"false\"\n    [buttonConfig]=\"addButtonConfig\"\n    (activation)=\"onFieldSelect($event)\">\n  </novo-tabbed-group-picker>\n</form>\n<novo-condition-templates [addressConfig]=\"addressConfig\"/>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i5.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "directive", type: i5.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i6.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i7.NovoTabbedGroupPickerElement, selector: "novo-tabbed-group-picker", inputs: ["buttonConfig", "tabs", "quickSelectConfig", "showFooter", "selectionEnabled"], outputs: ["activation", "selectionChange", "applyChange", "cancelChange"] }, { kind: "component", type: i8.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex", "hideFirstOperator", "canBeEmpty", "formGroupName"] }, { kind: "component", type: i9.NovoConditionTemplatesComponent, selector: "novo-condition-templates", inputs: ["addressConfig"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{ qbs.hasMultipleScopes() ? conditionGroup.scope + ' ' + labels.filterss : qbs.getConjunctionLabel('and') }}</novo-label>\n      <novo-condition-group [hideFirstOperator]=\"hideFirstOperator\" [canBeEmpty]=\"canBeEmpty\" [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\" #conditionGroup></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n  <novo-tabbed-group-picker\n    *ngIf=\"qbs.hasMultipleScopes()\"\n    [tabs]=\"tabbedGroupPickerTabs()\"\n    [selectionEnabled]=\"false\"\n    [buttonConfig]=\"addButtonConfig\"\n    (activation)=\"onFieldSelect($event)\">\n  </novo-tabbed-group-picker>\n</form>\n<novo-condition-templates [addressConfig]=\"addressConfig\"/>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
        }], ctorParameters: () => [{ type: i1.ControlContainer }, { type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.QueryBuilderService }, { type: i3.NovoLabelService }], propDecorators: { config: [{
                type: Input
            }], controlName: [{
                type: Input
            }], allowedGroupings: [{
                type: Input
            }], editTypeFn: [{
                type: Input
            }], addressConfig: [{
                type: Input
            }], canBeEmpty: [{
                type: Input
            }], HideFirstOperator: [{
                type: Input,
                args: ['hideFirstOperator']
            }], _contentFieldDefs: [{
                type: ContentChildren,
                args: [NovoConditionFieldDef, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsUUFBUSxFQUNSLGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQUUsaUJBQWlCLEVBQW9CLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsNEJBQTRCLEVBQXVELE1BQU0sNENBQTRDLENBQUM7QUFDL0ksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFD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Q0E4QkE7OzRGRG9CYSx3QkFBd0I7a0JBZHBDLFNBQVM7K0JBQ0UsdUJBQXVCLG1CQUdoQix1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDO3dCQUNULEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTt3QkFDcEcsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsV0FBVywwQkFBMEIsRUFBRTt3QkFDekUsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO3FCQUNoRSxRQUNLO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7cUJBQy9CO2dOQUdRLE1BQU07c0JBQWQsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFHRixpQkFBaUI7c0JBRHBCLEtBQUs7dUJBQUMsbUJBQW1CO2dCQVdxQyxpQkFBaUI7c0JBQS9FLGVBQWU7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICB2aWV3Q2hpbGQsXG4gIHZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBOR19WQUxVRV9BQ0NFU1NPUiwgVW50eXBlZEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgZmlsdGVyLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9UYWJiZWRHcm91cFBpY2tlckVsZW1lbnQsIFRhYmJlZEdyb3VwUGlja2VyQnV0dG9uQ29uZmlnLCBUYWJiZWRHcm91cFBpY2tlclRhYiB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdGFiYmVkLWdyb3VwLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBDb25kaXRpb25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4uL2NvbmRpdGlvbi1ncm91cC9jb25kaXRpb24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudG9rZW5zJztcbmltcG9ydCB7IEJhc2VGaWVsZERlZiwgQ29uZGl0aW9uLCBDb25kaXRpb25Hcm91cCwgQ29uanVuY3Rpb24sIEFkZHJlc3NDcml0ZXJpYUNvbmZpZyB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudHlwZXMnO1xuXG5jb25zdCBFTVBUWV9DT05ESVRJT046IENvbmRpdGlvbiA9IHtcbiAgY29uZGl0aW9uVHlwZTogJyRhbmQnLFxuICBmaWVsZDogbnVsbCxcbiAgb3BlcmF0b3I6IG51bGwsXG4gIHNjb3BlOiBudWxsLFxuICB2YWx1ZTogbnVsbCxcbiAgc3VwcG9ydGluZ1ZhbHVlOiBudWxsLFxufTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY3JpdGVyaWEtYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50KSwgbXVsdGk6IHRydWUgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiwgdXNlRXhpc3Rpbmc6IENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogUXVlcnlCdWlsZGVyU2VydmljZSwgdXNlQ2xhc3M6IFF1ZXJ5QnVpbGRlclNlcnZpY2UgfSxcbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQElucHV0KCkgY29udHJvbE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgYWxsb3dlZEdyb3VwaW5ncyA9IFtDb25qdW5jdGlvbi5BTkQsIENvbmp1bmN0aW9uLk9SLCBDb25qdW5jdGlvbi5OT1RdO1xuICBASW5wdXQoKSBlZGl0VHlwZUZuOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBhZGRyZXNzQ29uZmlnOiBBZGRyZXNzQ3JpdGVyaWFDb25maWc7XG4gIEBJbnB1dCgpIGNhbkJlRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2hpZGVGaXJzdE9wZXJhdG9yJylcbiAgc2V0IEhpZGVGaXJzdE9wZXJhdG9yKGhpZGU6IGJvb2xlYW4pIHtcbiAgICAgIGlmICghSGVscGVycy5pc0VtcHR5KGhpZGUpKSB7XG4gICAgICAgIHRoaXMuX2hpZGVGaXJzdE9wZXJhdG9yID0gaGlkZTtcbiAgICAgIH1cbiAgfVxuICBnZXQgaGlkZUZpcnN0T3BlcmF0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVGaXJzdE9wZXJhdG9yO1xuICB9XG4gIHByaXZhdGUgX2hpZGVGaXJzdE9wZXJhdG9yOiBib29sZWFuID0gdHJ1ZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9Db25kaXRpb25GaWVsZERlZiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBfY29udGVudEZpZWxkRGVmczogUXVlcnlMaXN0PE5vdm9Db25kaXRpb25GaWVsZERlZj47XG4gIHNjb3BlZEZpZWxkUGlja2VyID0gdmlld0NoaWxkKE5vdm9UYWJiZWRHcm91cFBpY2tlckVsZW1lbnQpO1xuICBjb25kaXRpb25Hcm91cHMgPSB2aWV3Q2hpbGRyZW4oQ29uZGl0aW9uR3JvdXBDb21wb25lbnQpO1xuXG4gIHB1YmxpYyBwYXJlbnRGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgaW5uZXJGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgdGFiYmVkR3JvdXBQaWNrZXJUYWJzID0gY29tcHV0ZWQ8VGFiYmVkR3JvdXBQaWNrZXJUYWJbXT4oKCkgPT4ge1xuICAgIGNvbnN0IHRhYnMgPSBbXTtcbiAgICB0aGlzLnFicy5zY29wZXMoKT8uZm9yRWFjaCgoc2NvcGUpID0+IHtcbiAgICAgIHRhYnMucHVzaCh7XG4gICAgICAgIHR5cGVOYW1lOiBzY29wZSxcbiAgICAgICAgdHlwZUxhYmVsOiBzY29wZSxcbiAgICAgICAgdmFsdWVGaWVsZDogJ25hbWUnLFxuICAgICAgICBsYWJlbEZpZWxkOiAnbGFiZWwnLFxuICAgICAgICBkYXRhOiB0aGlzLnFicy5jb25maWcuZmllbGRzLmZpbmQoKGZpZWxkKSA9PiBmaWVsZC52YWx1ZSA9PT0gc2NvcGUpPy5vcHRpb25zIHx8IFtdLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhYnM7XG4gIH0pO1xuICBwdWJsaWMgYWRkQnV0dG9uQ29uZmlnOiBUYWJiZWRHcm91cFBpY2tlckJ1dHRvbkNvbmZpZyA9IHtcbiAgICB0aGVtZTogJ2RpYWxvZ3VlJyxcbiAgICBzaWRlOiAnbGVmdCcsXG4gICAgc2l6ZTogJ3NtJyxcbiAgICBpY29uOiAnYWRkLXRoaW4nLFxuICAgIGxhYmVsOiB0aGlzLmxhYmVscy5hZGRDb25kaXRpb24sXG4gIH07XG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRyb2xDb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBxYnM6IFF1ZXJ5QnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgKSB7XG4gICAgaWYgKCFxYnMuY29tcG9uZW50SG9zdCkge1xuICAgICAgcWJzLmNvbXBvbmVudEhvc3QgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFyZW50Rm9ybSA9IHRoaXMuY29udHJvbENvbnRhaW5lci5jb250cm9sIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgdGhpcy5pbm5lckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGNyaXRlcmlhOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICB9KTtcblxuICAgIHRoaXMucGFyZW50Rm9ybS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgIHN0YXJ0V2l0aCh0aGlzLnBhcmVudEZvcm0udmFsdWUpLFxuICAgICAgZmlsdGVyKHYgPT4gdj8uY3JpdGVyaWEpLFxuICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICApLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEluaXRpYWxWYWx1ZSh2YWx1ZVt0aGlzLmNvbnRyb2xOYW1lXSk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5pbm5lckZvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2UoKCkgPT4gaW50ZXJ2YWwoMTApKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZS5jcml0ZXJpYS5maWx0ZXIoKGl0LCBpKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoaXQpWzBdO1xuICAgICAgICAgIGlmIChpdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb25kaXRpb25Hcm91cEF0KGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRba2V5XS5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhcmVudEZvcm0uZ2V0KHRoaXMuY29udHJvbE5hbWUpLnNldFZhbHVlKHJlc3VsdCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVnaXN0ZXJGaWVsZERlZnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ29uZGl0aW9uR3JvdXAoZ3JvdXA6IHVua25vd24pOiBncm91cCBpcyBDb25kaXRpb25Hcm91cCB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5ldmVyeSgoa2V5KSA9PiBbJyRhbmQnLCAnJG9yJywgJyRub3QnXS5pbmNsdWRlcyhrZXkpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFZhbHVlKHZhbHVlOiBDb25kaXRpb25Hcm91cFtdIHwgQ29uZGl0aW9uW10pIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5pc0NvbmRpdGlvbkdyb3VwKHZhbHVlWzBdKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdCkgPT4gdGhpcy5hZGRDb25kaXRpb25Hcm91cChpdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uczogQ29uZGl0aW9uW10gPSBbLi4udmFsdWVdIGFzIENvbmRpdGlvbltdO1xuICAgICAgICBpZiAodGhpcy5xYnMuaGFzTXVsdGlwbGVTY29wZXMoKSkge1xuICAgICAgICAgIC8vIGRpdmlkZSB1cCBieSBzY29wZSBpbnRvIHNlcGFyYXRlIGdyb3Vwc1xuICAgICAgICAgIGNvbnN0IHNjb3BlZENvbmRpdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQ29uZGl0aW9uW10gfSA9IHt9O1xuICAgICAgICAgIGNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICBzY29wZWRDb25kaXRpb25zW2NvbmRpdGlvbi5zY29wZV0gPSBzY29wZWRDb25kaXRpb25zW2NvbmRpdGlvbi5zY29wZV0gfHwgW107XG4gICAgICAgICAgICBzY29wZWRDb25kaXRpb25zW2NvbmRpdGlvbi5zY29wZV0ucHVzaChjb25kaXRpb24pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgZm9yIChjb25zdCBzY29wZSBpbiBzY29wZWRDb25kaXRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENvbmRpdGlvbkdyb3VwKHsgJGFuZDogc2NvcGVkQ29uZGl0aW9uc1tzY29wZV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiBjb25kaXRpb25zIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgcm9vdCgpOiBGb3JtQXJyYXkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRm9ybS5nZXQoJ2NyaXRlcmlhJykgYXMgRm9ybUFycmF5O1xuICB9XG5cbiAgYWRkQ29uZGl0aW9uR3JvdXAoZGF0YTogYW55ID0geyAkYW5kOiBbRU1QVFlfQ09ORElUSU9OXSB9KSB7XG4gICAgdGhpcy5yb290LnB1c2godGhpcy5uZXdDb25kaXRpb25Hcm91cChkYXRhKSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZXdDb25kaXRpb25Hcm91cChkYXRhOiBDb25kaXRpb25Hcm91cCk6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmVudHJpZXMoZGF0YSkucmVkdWNlKChvYmosIFtrZXksIHZhbF0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW2tleV06IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkodmFsLm1hcCgoaXQpID0+IHRoaXMubmV3Q29uZGl0aW9uKGl0KSkpLFxuICAgICAgfTtcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoY29udHJvbHMpO1xuICB9XG5cbiAgbmV3Q29uZGl0aW9uKHsgZmllbGQsIG9wZXJhdG9yLCBzY29wZSwgdmFsdWUsIHN1cHBvcnRpbmdWYWx1ZSB9OiBDb25kaXRpb24gPSBFTVBUWV9DT05ESVRJT04pOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBjb25kaXRpb25UeXBlOiAnJGFuZCcsXG4gICAgICBmaWVsZDogW2ZpZWxkLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIG9wZXJhdG9yOiBbb3BlcmF0b3IsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgc2NvcGU6IFtzY29wZV0sXG4gICAgICB2YWx1ZTogW3ZhbHVlXSxcbiAgICAgIHN1cHBvcnRpbmdWYWx1ZTogW3N1cHBvcnRpbmdWYWx1ZV0sXG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb25kaXRpb25Hcm91cEF0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnJvb3QucmVtb3ZlQXQoaW5kZXgsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsQ29uZGl0aW9ucygpIHtcbiAgICB3aGlsZSAodGhpcy5yb290Lmxlbmd0aCkge1xuICAgICAgdGhpcy5yb290LnJlbW92ZUF0KDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRmllbGRTZWxlY3QoZmllbGQpIHtcbiAgICB0aGlzLnNjb3BlZEZpZWxkUGlja2VyKCkuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IHsgZmllbGQ6IGZpZWxkLm5hbWUsIG9wZXJhdG9yOiBudWxsLCBzY29wZTogZmllbGQuc2NvcGUsIHZhbHVlOiBudWxsIH07XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmNvbmRpdGlvbkdyb3VwcygpLmZpbmQoKGdyb3VwKSA9PiBncm91cC5zY29wZSA9PT0gZmllbGQuc2NvcGUpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgZ3JvdXAuYWRkQ29uZGl0aW9uKGNvbmRpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiBbY29uZGl0aW9uXSB9KVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKSB7XG4gICAgdGhpcy5xYnMuc2NvcGVzLnNldCh0aGlzLmNvbmZpZz8uZmllbGRzLm1hcCgoZikgPT4gZi52YWx1ZSkpO1xuICAgIHRoaXMucWJzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMucWJzLmVkaXRUeXBlRm4gPSB0aGlzLmVkaXRUeXBlRm47XG4gICAgdGhpcy5xYnMuYWxsb3dlZEdyb3VwaW5ncyA9IHRoaXMuYWxsb3dlZEdyb3VwaW5ncyBhcyBDb25qdW5jdGlvbltdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJGaWVsZERlZnMoKSB7XG4gICAgY29uc3QgZGVmcyA9IFsuLi5BcnJheS5mcm9tKHRoaXMuX2NvbnRlbnRGaWVsZERlZnMpXTtcbiAgICBkZWZzLmZvckVhY2goKGZpZWxkRGVmKSA9PiB7XG4gICAgICB0aGlzLnFicy5yZWdpc3RlckZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJpbm5lckZvcm1cIj5cbiAgPG5vdm8tc3RhY2sgW2Zvcm1BcnJheU5hbWVdPVwiY29udHJvbE5hbWVcIiBjbGFzcz1cImNyaXRlcmlhLWJ1aWxkZXItaW5uZXJcIj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdGb3I9XCJsZXQgYW5kR3JvdXAgb2Ygcm9vdC5jb250cm9sczsgbGV0IGFuZEluZGV4ID0gaW5kZXg7IGxldCBpc0ZpcnN0ID0gZmlyc3Q7bGV0IGlzTGFzdEFuZCA9IGxhc3Q7XCI+XG4gICAgICA8bm92by1sYWJlbCAqbmdJZj1cIiFpc0ZpcnN0XCIgY29sb3I9XCJhc2hcIiBzaXplPVwieHNcIiB1cHBlcmNhc2UgcGFkZGluZz1cInNtXCI+e3sgcWJzLmhhc011bHRpcGxlU2NvcGVzKCkgPyBjb25kaXRpb25Hcm91cC5zY29wZSArICcgJyArIGxhYmVscy5maWx0ZXJzcyA6IHFicy5nZXRDb25qdW5jdGlvbkxhYmVsKCdhbmQnKSB9fTwvbm92by1sYWJlbD5cbiAgICAgIDxub3ZvLWNvbmRpdGlvbi1ncm91cCBbaGlkZUZpcnN0T3BlcmF0b3JdPVwiaGlkZUZpcnN0T3BlcmF0b3JcIiBbY2FuQmVFbXB0eV09XCJjYW5CZUVtcHR5XCIgW2dyb3VwSW5kZXhdPVwiYW5kSW5kZXhcIiBbZm9ybUdyb3VwTmFtZV09XCJhbmRJbmRleFwiICNjb25kaXRpb25Hcm91cD48L25vdm8tY29uZGl0aW9uLWdyb3VwPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25vdm8tc3RhY2s+XG4gIDxub3ZvLXRhYmJlZC1ncm91cC1waWNrZXJcbiAgICAqbmdJZj1cInFicy5oYXNNdWx0aXBsZVNjb3BlcygpXCJcbiAgICBbdGFic109XCJ0YWJiZWRHcm91cFBpY2tlclRhYnMoKVwiXG4gICAgW3NlbGVjdGlvbkVuYWJsZWRdPVwiZmFsc2VcIlxuICAgIFtidXR0b25Db25maWddPVwiYWRkQnV0dG9uQ29uZmlnXCJcbiAgICAoYWN0aXZhdGlvbik9XCJvbkZpZWxkU2VsZWN0KCRldmVudClcIj5cbiAgPC9ub3ZvLXRhYmJlZC1ncm91cC1waWNrZXI+XG48L2Zvcm0+XG48bm92by1jb25kaXRpb24tdGVtcGxhdGVzIFthZGRyZXNzQ29uZmlnXT1cImFkZHJlc3NDb25maWdcIi8+XG5cbjwhLS1cbiAge1xuICAgICRhbmQ6IFt7XG4gICAgICAkb3I6IFt7XG4gICAgICAgIGVudGl0eTogJ0pvYk9yZGVyJ1xuICAgICAgICBmaWVsZDogJ2NhdGVnb3JpZXMnLFxuICAgICAgICBvcGVyYXRvcjogJ2RvZXNOb3RDb250YWluJyxcbiAgICAgICAgdmFsdWU6ICdIZWFsdGhjYXJlJ1xuICAgICAgfV1cbiAgICB9XVxuICB9XG4gLS0+XG4iXX0=