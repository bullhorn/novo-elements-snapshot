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
    newCondition({ field, operator, scope, value } = EMPTY_CONDITION) {
        return this.formBuilder.group({
            conditionType: '$and',
            field: [field, Validators.required],
            operator: [operator, Validators.required],
            scope: [scope],
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
    resetValues() {
        for (const conditionOrGroup of this.root?.value) {
            this.resetValuesRecursively(conditionOrGroup);
        }
    }
    resetValuesRecursively(conditionOrGroup) {
        if (this.isConditionGroup(conditionOrGroup)) {
            if (conditionOrGroup.$and?.length) {
                for (const condition of conditionOrGroup.$and) {
                    this.resetValuesRecursively(condition);
                }
            }
            if (conditionOrGroup.$or?.length) {
                for (const condition of conditionOrGroup.$or) {
                    this.resetValuesRecursively(condition);
                }
            }
            if (conditionOrGroup.$not?.length) {
                for (const condition of conditionOrGroup.$not) {
                    this.resetValuesRecursively(condition);
                }
            }
        }
        else if (conditionOrGroup.hasOwnProperty('value')) {
            conditionOrGroup.value = null;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i1.ControlContainer }, { token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.QueryBuilderService }, { token: i3.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "17.2.3", type: CriteriaBuilderComponent, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn", addressConfig: "addressConfig", canBeEmpty: "canBeEmpty", HideFirstOperator: ["hideFirstOperator", "HideFirstOperator"] }, host: { classAttribute: "novo-criteria-builder" }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
            { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
            { provide: QueryBuilderService, useClass: QueryBuilderService },
        ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], viewQueries: [{ propertyName: "scopedFieldPicker", first: true, predicate: NovoTabbedGroupPickerElement, descendants: true, isSignal: true }, { propertyName: "conditionGroups", predicate: ConditionGroupComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{ qbs.hasMultipleScopes() ? conditionGroup.scope + ' ' + labels.filterss : qbs.getConjunctionLabel('and') }}</novo-label>\n      <novo-condition-group [hideFirstOperator]=\"hideFirstOperator\" [canBeEmpty]=\"canBeEmpty\" [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\" #conditionGroup></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n  <novo-tabbed-group-picker\n    *ngIf=\"qbs.hasMultipleScopes()\"\n    [tabs]=\"tabbedGroupPickerTabs()\"\n    [selectionEnabled]=\"false\"\n    [buttonConfig]=\"addButtonConfig\"\n    (activation)=\"onFieldSelect($event)\">\n  </novo-tabbed-group-picker>\n</form>\n<novo-condition-templates [addressConfig]=\"addressConfig\"/>\n\n<!--\n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->\n", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i5.NovoLabel, selector: "novo-label,[novo-label]" }, { kind: "directive", type: i5.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { kind: "component", type: i6.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { kind: "component", type: i7.NovoTabbedGroupPickerElement, selector: "novo-tabbed-group-picker", inputs: ["buttonConfig", "tabs", "quickSelectConfig", "showFooter", "selectionEnabled"], outputs: ["activation", "selectionChange", "applyChange"] }, { kind: "component", type: i8.ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex", "hideFirstOperator", "canBeEmpty", "formGroupName"] }, { kind: "component", type: i9.NovoConditionTemplatesComponent, selector: "novo-condition-templates", inputs: ["addressConfig"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9xdWVyeS1idWlsZGVyL2NyaXRlcmlhLWJ1aWxkZXIvY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsUUFBUSxFQUNSLGVBQWUsRUFDZixVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxXQUFXLEVBQUUsaUJBQWlCLEVBQW9CLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNILE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsNEJBQTRCLEVBQXVELE1BQU0sNENBQTRDLENBQUM7QUFDL0ksT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFD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LENBQUMsR0FBRyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTt3QkFDcEcsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsV0FBVywwQkFBMEIsRUFBRTt3QkFDekUsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO3FCQUNoRSxRQUNLO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7cUJBQy9CO2dOQUdRLE1BQU07c0JBQWQsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFHRixpQkFBaUI7c0JBRHBCLEtBQUs7dUJBQUMsbUJBQW1CO2dCQVdxQyxpQkFBaUI7c0JBQS9FLGVBQWU7dUJBQUMscUJBQXFCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIGNvbXB1dGVkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICB2aWV3Q2hpbGQsXG4gIHZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBOR19WQUxVRV9BQ0NFU1NPUiwgVW50eXBlZEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgZmlsdGVyLCBzdGFydFdpdGgsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9UYWJiZWRHcm91cFBpY2tlckVsZW1lbnQsIFRhYmJlZEdyb3VwUGlja2VyQnV0dG9uQ29uZmlnLCBUYWJiZWRHcm91cFBpY2tlclRhYiB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdGFiYmVkLWdyb3VwLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBDb25kaXRpb25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4uL2NvbmRpdGlvbi1ncm91cC9jb25kaXRpb24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9Db25kaXRpb25GaWVsZERlZiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiB9IGZyb20gJy4uL3F1ZXJ5LWJ1aWxkZXIudG9rZW5zJztcbmltcG9ydCB7XG4gIEJhc2VGaWVsZERlZixcbiAgQ29uZGl0aW9uLFxuICBDb25kaXRpb25Hcm91cCxcbiAgQ29uanVuY3Rpb24sXG4gIEFkZHJlc3NDcml0ZXJpYUNvbmZpZyxcbiAgQ29uZGl0aW9uT3JDb25kaXRpb25Hcm91cCxcbiAgTmVzdGVkQ29uZGl0aW9uR3JvdXBcbn0gZnJvbSAnLi4vcXVlcnktYnVpbGRlci50eXBlcyc7XG5cbmNvbnN0IEVNUFRZX0NPTkRJVElPTjogQ29uZGl0aW9uID0ge1xuICBjb25kaXRpb25UeXBlOiAnJGFuZCcsXG4gIGZpZWxkOiBudWxsLFxuICBvcGVyYXRvcjogbnVsbCxcbiAgc2NvcGU6IG51bGwsXG4gIHZhbHVlOiBudWxsLFxufTtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tY3JpdGVyaWEtYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcml0ZXJpYS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JpdGVyaWEtYnVpbGRlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50KSwgbXVsdGk6IHRydWUgfSxcbiAgICB7IHByb3ZpZGU6IE5PVk9fQ1JJVEVSSUFfQlVJTERFUiwgdXNlRXhpc3Rpbmc6IENyaXRlcmlhQnVpbGRlckNvbXBvbmVudCB9LFxuICAgIHsgcHJvdmlkZTogUXVlcnlCdWlsZGVyU2VydmljZSwgdXNlQ2xhc3M6IFF1ZXJ5QnVpbGRlclNlcnZpY2UgfSxcbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jcml0ZXJpYS1idWlsZGVyJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ3JpdGVyaWFCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQElucHV0KCkgY29udHJvbE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgYWxsb3dlZEdyb3VwaW5ncyA9IFtDb25qdW5jdGlvbi5BTkQsIENvbmp1bmN0aW9uLk9SLCBDb25qdW5jdGlvbi5OT1RdO1xuICBASW5wdXQoKSBlZGl0VHlwZUZuOiAoZmllbGQ6IEJhc2VGaWVsZERlZikgPT4gc3RyaW5nO1xuICBASW5wdXQoKSBhZGRyZXNzQ29uZmlnOiBBZGRyZXNzQ3JpdGVyaWFDb25maWc7XG4gIEBJbnB1dCgpIGNhbkJlRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2hpZGVGaXJzdE9wZXJhdG9yJylcbiAgc2V0IEhpZGVGaXJzdE9wZXJhdG9yKGhpZGU6IGJvb2xlYW4pIHtcbiAgICAgIGlmICghSGVscGVycy5pc0VtcHR5KGhpZGUpKSB7XG4gICAgICAgIHRoaXMuX2hpZGVGaXJzdE9wZXJhdG9yID0gaGlkZTtcbiAgICAgIH1cbiAgfVxuICBnZXQgaGlkZUZpcnN0T3BlcmF0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVGaXJzdE9wZXJhdG9yO1xuICB9XG4gIHByaXZhdGUgX2hpZGVGaXJzdE9wZXJhdG9yOiBib29sZWFuID0gdHJ1ZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5vdm9Db25kaXRpb25GaWVsZERlZiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBfY29udGVudEZpZWxkRGVmczogUXVlcnlMaXN0PE5vdm9Db25kaXRpb25GaWVsZERlZj47XG4gIHNjb3BlZEZpZWxkUGlja2VyID0gdmlld0NoaWxkKE5vdm9UYWJiZWRHcm91cFBpY2tlckVsZW1lbnQpO1xuICBjb25kaXRpb25Hcm91cHMgPSB2aWV3Q2hpbGRyZW4oQ29uZGl0aW9uR3JvdXBDb21wb25lbnQpO1xuXG4gIHB1YmxpYyBwYXJlbnRGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgaW5uZXJGb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBwdWJsaWMgdGFiYmVkR3JvdXBQaWNrZXJUYWJzID0gY29tcHV0ZWQ8VGFiYmVkR3JvdXBQaWNrZXJUYWJbXT4oKCkgPT4ge1xuICAgIGNvbnN0IHRhYnMgPSBbXTtcbiAgICB0aGlzLnFicy5zY29wZXMoKT8uZm9yRWFjaCgoc2NvcGUpID0+IHtcbiAgICAgIHRhYnMucHVzaCh7XG4gICAgICAgIHR5cGVOYW1lOiBzY29wZSxcbiAgICAgICAgdHlwZUxhYmVsOiBzY29wZSxcbiAgICAgICAgdmFsdWVGaWVsZDogJ25hbWUnLFxuICAgICAgICBsYWJlbEZpZWxkOiAnbGFiZWwnLFxuICAgICAgICBkYXRhOiB0aGlzLnFicy5jb25maWcuZmllbGRzLmZpbmQoKGZpZWxkKSA9PiBmaWVsZC52YWx1ZSA9PT0gc2NvcGUpPy5vcHRpb25zIHx8IFtdLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhYnM7XG4gIH0pO1xuICBwdWJsaWMgYWRkQnV0dG9uQ29uZmlnOiBUYWJiZWRHcm91cFBpY2tlckJ1dHRvbkNvbmZpZyA9IHtcbiAgICB0aGVtZTogJ2RpYWxvZ3VlJyxcbiAgICBzaWRlOiAnbGVmdCcsXG4gICAgc2l6ZTogJ3NtJyxcbiAgICBpY29uOiAnYWRkLXRoaW4nLFxuICAgIGxhYmVsOiB0aGlzLmxhYmVscy5hZGRDb25kaXRpb24sXG4gIH07XG4gIC8qKiBTdWJqZWN0IHRoYXQgZW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRyb2xDb250YWluZXI6IENvbnRyb2xDb250YWluZXIsXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHB1YmxpYyBxYnM6IFF1ZXJ5QnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSxcbiAgKSB7XG4gICAgaWYgKCFxYnMuY29tcG9uZW50SG9zdCkge1xuICAgICAgcWJzLmNvbXBvbmVudEhvc3QgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFyZW50Rm9ybSA9IHRoaXMuY29udHJvbENvbnRhaW5lci5jb250cm9sIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgdGhpcy5pbm5lckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGNyaXRlcmlhOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICB9KTtcblxuICAgIHRoaXMucGFyZW50Rm9ybS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgIHN0YXJ0V2l0aCh0aGlzLnBhcmVudEZvcm0udmFsdWUpLFxuICAgICAgZmlsdGVyKHYgPT4gdj8uY3JpdGVyaWEpLFxuICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICApLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldEluaXRpYWxWYWx1ZSh2YWx1ZVt0aGlzLmNvbnRyb2xOYW1lXSk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5pbm5lckZvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2UoKCkgPT4gaW50ZXJ2YWwoMTApKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZS5jcml0ZXJpYS5maWx0ZXIoKGl0LCBpKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoaXQpWzBdO1xuICAgICAgICAgIGlmIChpdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb25kaXRpb25Hcm91cEF0KGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRba2V5XS5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhcmVudEZvcm0uZ2V0KHRoaXMuY29udHJvbE5hbWUpLnNldFZhbHVlKHJlc3VsdCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVnaXN0ZXJGaWVsZERlZnMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGlzQ29uZGl0aW9uR3JvdXAoZ3JvdXA6IHVua25vd24pOiBncm91cCBpcyBDb25kaXRpb25Hcm91cCB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5ldmVyeSgoa2V5KSA9PiBbJyRhbmQnLCAnJG9yJywgJyRub3QnXS5pbmNsdWRlcyhrZXkpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFZhbHVlKHZhbHVlOiBDb25kaXRpb25Hcm91cFtdIHwgQ29uZGl0aW9uW10pIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5pc0NvbmRpdGlvbkdyb3VwKHZhbHVlWzBdKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdCkgPT4gdGhpcy5hZGRDb25kaXRpb25Hcm91cChpdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uczogQ29uZGl0aW9uW10gPSBbLi4udmFsdWVdIGFzIENvbmRpdGlvbltdO1xuICAgICAgICBpZiAodGhpcy5xYnMuaGFzTXVsdGlwbGVTY29wZXMoKSkge1xuICAgICAgICAgIC8vIGRpdmlkZSB1cCBieSBzY29wZSBpbnRvIHNlcGFyYXRlIGdyb3Vwc1xuICAgICAgICAgIGNvbnN0IHNjb3BlZENvbmRpdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQ29uZGl0aW9uW10gfSA9IHt9O1xuICAgICAgICAgIGNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICBzY29wZWRDb25kaXRpb25zW2NvbmRpdGlvbi5zY29wZV0gPSBzY29wZWRDb25kaXRpb25zW2NvbmRpdGlvbi5zY29wZV0gfHwgW107XG4gICAgICAgICAgICBzY29wZWRDb25kaXRpb25zW2NvbmRpdGlvbi5zY29wZV0ucHVzaChjb25kaXRpb24pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgZm9yIChjb25zdCBzY29wZSBpbiBzY29wZWRDb25kaXRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENvbmRpdGlvbkdyb3VwKHsgJGFuZDogc2NvcGVkQ29uZGl0aW9uc1tzY29wZV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiBjb25kaXRpb25zIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgcm9vdCgpOiBGb3JtQXJyYXkge1xuICAgIHJldHVybiB0aGlzLmlubmVyRm9ybS5nZXQoJ2NyaXRlcmlhJykgYXMgRm9ybUFycmF5O1xuICB9XG5cbiAgYWRkQ29uZGl0aW9uR3JvdXAoZGF0YTogYW55ID0geyAkYW5kOiBbRU1QVFlfQ09ORElUSU9OXSB9KSB7XG4gICAgdGhpcy5yb290LnB1c2godGhpcy5uZXdDb25kaXRpb25Hcm91cChkYXRhKSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZXdDb25kaXRpb25Hcm91cChkYXRhOiBDb25kaXRpb25Hcm91cCk6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmVudHJpZXMoZGF0YSkucmVkdWNlKChvYmosIFtrZXksIHZhbF0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9iaixcbiAgICAgICAgW2tleV06IHRoaXMuZm9ybUJ1aWxkZXIuYXJyYXkodmFsLm1hcCgoaXQpID0+IHRoaXMubmV3Q29uZGl0aW9uKGl0KSkpLFxuICAgICAgfTtcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoY29udHJvbHMpO1xuICB9XG5cbiAgbmV3Q29uZGl0aW9uKHsgZmllbGQsIG9wZXJhdG9yLCBzY29wZSwgdmFsdWUgfTogQ29uZGl0aW9uID0gRU1QVFlfQ09ORElUSU9OKTogVW50eXBlZEZvcm1Hcm91cCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgY29uZGl0aW9uVHlwZTogJyRhbmQnLFxuICAgICAgZmllbGQ6IFtmaWVsZCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBvcGVyYXRvcjogW29wZXJhdG9yLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHNjb3BlOiBbc2NvcGVdLFxuICAgICAgdmFsdWU6IFt2YWx1ZV0sXG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb25kaXRpb25Hcm91cEF0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnJvb3QucmVtb3ZlQXQoaW5kZXgsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgfVxuXG4gIGNsZWFyQWxsQ29uZGl0aW9ucygpIHtcbiAgICB3aGlsZSAodGhpcy5yb290Lmxlbmd0aCkge1xuICAgICAgdGhpcy5yb290LnJlbW92ZUF0KDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRmllbGRTZWxlY3QoZmllbGQpIHtcbiAgICB0aGlzLnNjb3BlZEZpZWxkUGlja2VyKCkuZHJvcGRvd24uY2xvc2VQYW5lbCgpO1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IHsgZmllbGQ6IGZpZWxkLm5hbWUsIG9wZXJhdG9yOiBudWxsLCBzY29wZTogZmllbGQuc2NvcGUsIHZhbHVlOiBudWxsIH07XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmNvbmRpdGlvbkdyb3VwcygpLmZpbmQoKGdyb3VwKSA9PiBncm91cC5zY29wZSA9PT0gZmllbGQuc2NvcGUpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgZ3JvdXAuYWRkQ29uZGl0aW9uKGNvbmRpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ29uZGl0aW9uR3JvdXAoeyAkYW5kOiBbY29uZGl0aW9uXSB9KVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0VmFsdWVzKCkge1xuICAgIGZvciAoY29uc3QgY29uZGl0aW9uT3JHcm91cCBvZiB0aGlzLnJvb3Q/LnZhbHVlIGFzIENvbmRpdGlvbk9yQ29uZGl0aW9uR3JvdXBbXSkge1xuICAgICAgdGhpcy5yZXNldFZhbHVlc1JlY3Vyc2l2ZWx5KGNvbmRpdGlvbk9yR3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRWYWx1ZXNSZWN1cnNpdmVseShjb25kaXRpb25Pckdyb3VwOiBDb25kaXRpb25PckNvbmRpdGlvbkdyb3VwKSB7XG4gICAgaWYgKHRoaXMuaXNDb25kaXRpb25Hcm91cChjb25kaXRpb25Pckdyb3VwKSkge1xuICAgICAgaWYgKGNvbmRpdGlvbk9yR3JvdXAuJGFuZD8ubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29uZGl0aW9uIG9mIGNvbmRpdGlvbk9yR3JvdXAuJGFuZCkge1xuICAgICAgICAgIHRoaXMucmVzZXRWYWx1ZXNSZWN1cnNpdmVseShjb25kaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY29uZGl0aW9uT3JHcm91cC4kb3I/Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNvbmRpdGlvbiBvZiBjb25kaXRpb25Pckdyb3VwLiRvcikge1xuICAgICAgICAgIHRoaXMucmVzZXRWYWx1ZXNSZWN1cnNpdmVseShjb25kaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY29uZGl0aW9uT3JHcm91cC4kbm90Py5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChjb25zdCBjb25kaXRpb24gb2YgY29uZGl0aW9uT3JHcm91cC4kbm90KSB7XG4gICAgICAgICAgdGhpcy5yZXNldFZhbHVlc1JlY3Vyc2l2ZWx5KGNvbmRpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbmRpdGlvbk9yR3JvdXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgIChjb25kaXRpb25Pckdyb3VwIGFzIENvbmRpdGlvbikudmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbmZpZ3VyZVF1ZXJ5QnVpbGRlclNlcnZpY2UoKSB7XG4gICAgdGhpcy5xYnMuc2NvcGVzLnNldCh0aGlzLmNvbmZpZz8uZmllbGRzLm1hcCgoZikgPT4gZi52YWx1ZSkpO1xuICAgIHRoaXMucWJzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMucWJzLmVkaXRUeXBlRm4gPSB0aGlzLmVkaXRUeXBlRm47XG4gICAgdGhpcy5xYnMuYWxsb3dlZEdyb3VwaW5ncyA9IHRoaXMuYWxsb3dlZEdyb3VwaW5ncyBhcyBDb25qdW5jdGlvbltdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJGaWVsZERlZnMoKSB7XG4gICAgY29uc3QgZGVmcyA9IFsuLi5BcnJheS5mcm9tKHRoaXMuX2NvbnRlbnRGaWVsZERlZnMpXTtcbiAgICBkZWZzLmZvckVhY2goKGZpZWxkRGVmKSA9PiB7XG4gICAgICB0aGlzLnFicy5yZWdpc3RlckZpZWxkRGVmKGZpZWxkRGVmKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJpbm5lckZvcm1cIj5cbiAgPG5vdm8tc3RhY2sgW2Zvcm1BcnJheU5hbWVdPVwiY29udHJvbE5hbWVcIiBjbGFzcz1cImNyaXRlcmlhLWJ1aWxkZXItaW5uZXJcIj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdGb3I9XCJsZXQgYW5kR3JvdXAgb2Ygcm9vdC5jb250cm9sczsgbGV0IGFuZEluZGV4ID0gaW5kZXg7IGxldCBpc0ZpcnN0ID0gZmlyc3Q7bGV0IGlzTGFzdEFuZCA9IGxhc3Q7XCI+XG4gICAgICA8bm92by1sYWJlbCAqbmdJZj1cIiFpc0ZpcnN0XCIgY29sb3I9XCJhc2hcIiBzaXplPVwieHNcIiB1cHBlcmNhc2UgcGFkZGluZz1cInNtXCI+e3sgcWJzLmhhc011bHRpcGxlU2NvcGVzKCkgPyBjb25kaXRpb25Hcm91cC5zY29wZSArICcgJyArIGxhYmVscy5maWx0ZXJzcyA6IHFicy5nZXRDb25qdW5jdGlvbkxhYmVsKCdhbmQnKSB9fTwvbm92by1sYWJlbD5cbiAgICAgIDxub3ZvLWNvbmRpdGlvbi1ncm91cCBbaGlkZUZpcnN0T3BlcmF0b3JdPVwiaGlkZUZpcnN0T3BlcmF0b3JcIiBbY2FuQmVFbXB0eV09XCJjYW5CZUVtcHR5XCIgW2dyb3VwSW5kZXhdPVwiYW5kSW5kZXhcIiBbZm9ybUdyb3VwTmFtZV09XCJhbmRJbmRleFwiICNjb25kaXRpb25Hcm91cD48L25vdm8tY29uZGl0aW9uLWdyb3VwPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25vdm8tc3RhY2s+XG4gIDxub3ZvLXRhYmJlZC1ncm91cC1waWNrZXJcbiAgICAqbmdJZj1cInFicy5oYXNNdWx0aXBsZVNjb3BlcygpXCJcbiAgICBbdGFic109XCJ0YWJiZWRHcm91cFBpY2tlclRhYnMoKVwiXG4gICAgW3NlbGVjdGlvbkVuYWJsZWRdPVwiZmFsc2VcIlxuICAgIFtidXR0b25Db25maWddPVwiYWRkQnV0dG9uQ29uZmlnXCJcbiAgICAoYWN0aXZhdGlvbik9XCJvbkZpZWxkU2VsZWN0KCRldmVudClcIj5cbiAgPC9ub3ZvLXRhYmJlZC1ncm91cC1waWNrZXI+XG48L2Zvcm0+XG48bm92by1jb25kaXRpb24tdGVtcGxhdGVzIFthZGRyZXNzQ29uZmlnXT1cImFkZHJlc3NDb25maWdcIi8+XG5cbjwhLS1cbiAge1xuICAgICRhbmQ6IFt7XG4gICAgICAkb3I6IFt7XG4gICAgICAgIGVudGl0eTogJ0pvYk9yZGVyJ1xuICAgICAgICBmaWVsZDogJ2NhdGVnb3JpZXMnLFxuICAgICAgICBvcGVyYXRvcjogJ2RvZXNOb3RDb250YWluJyxcbiAgICAgICAgdmFsdWU6ICdIZWFsdGhjYXJlJ1xuICAgICAgfV1cbiAgICB9XVxuICB9XG4gLS0+XG4iXX0=