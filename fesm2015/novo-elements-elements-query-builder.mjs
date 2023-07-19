import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Directive, Component, ChangeDetectionStrategy, ViewChild, Input, ContentChild, ViewEncapsulation, ViewChildren, forwardRef, ContentChildren, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { FormControl, Validators, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, merge, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, debounce } from 'rxjs/operators';
import * as i1 from 'novo-elements/services';
import * as i4 from 'novo-elements/elements/flex';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import * as i1$1 from 'novo-elements/elements/field';
import { NovoPickerToggleElement, NovoFieldModule } from 'novo-elements/elements/field';
import * as i2 from 'novo-elements/elements/select';
import { NovoSelectModule } from 'novo-elements/elements/select';
import * as i3$1 from 'novo-elements/elements/common';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import * as i8 from 'novo-elements/elements/select-search';
import { NovoSelectSearchModule } from 'novo-elements/elements/select-search';
import * as i9 from 'novo-elements/elements/loading';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import * as i10 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from 'novo-elements/elements/chips';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import * as i6 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i7 from 'novo-elements/elements/places';
import { GooglePlacesModule } from 'novo-elements/elements/places';
import * as i4$1 from 'novo-elements/elements/radio';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import * as i4$2 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i4$3 from 'novo-elements/elements/date-time-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import * as i6$1 from 'novo-elements/elements/autocomplete';
import { NovoAutoCompleteModule } from 'novo-elements/elements/autocomplete';
import * as i5$1 from 'novo-elements/elements/dropdown';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import * as i6$2 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { NovoCardModule } from 'novo-elements/elements/card';
import { NovoFormModule } from 'novo-elements/elements/form';
import { NovoNonIdealStateModule } from 'novo-elements/elements/non-ideal-state';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTabModule } from 'novo-elements/elements/tabs';

const NOVO_QUERY_BUILDER = new InjectionToken('NOVO_QUERY_BUILDER');
const NOVO_CRITERIA_BUILDER = new InjectionToken('NOVO_CRITERIA_BUILDER');
const NOVO_CONDITION_BUILDER = new InjectionToken('NOVO_CONDITION_BUILDER');

var Conjunction;
(function (Conjunction) {
    Conjunction["AND"] = "and";
    Conjunction["OR"] = "or";
    Conjunction["NOT"] = "not";
})(Conjunction || (Conjunction = {}));

const defaultEditTypeFn = (field) => {
    return field.inputType || field.dataType || field.type;
};
class QueryBuilderService {
    constructor(labels) {
        this.labels = labels;
        this._customFieldDefs = new Set();
        this._fieldDefsByName = new Map();
        /**
         * Will dispatch when properties changes, subscribe to this if component should
         * re-render when props are updated
         */
        this.stateChanges = new Subject();
        this._editTypeFn = defaultEditTypeFn;
        this._config = { fields: [] };
    }
    /**
     * Function to determine operator and input templates for a field.  Value passed
     * through the criteria builder Input.
     */
    get editTypeFn() {
        return this._editTypeFn;
    }
    set editTypeFn(value) {
        this._editTypeFn = value !== null && value !== void 0 ? value : defaultEditTypeFn;
        this.stateChanges.next();
    }
    /**
     * The field configuration to control which types of fields are available to select
     * within the Condition Builder.
     */
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
        this.stateChanges.next();
    }
    /**
     * The configuration to control which types of conjuntions can be used in the query builder.
     * Value passed through the criteria builder Input
     * eg. and, or, not
     */
    get allowedGroupings() {
        return this._allowedGroupings;
    }
    set allowedGroupings(value) {
        this._allowedGroupings = value;
        this.stateChanges.next();
    }
    /** Adds a field definition that was not included as part of the content children. */
    registerFieldDef(fieldDef) {
        this._customFieldDefs.add(fieldDef);
        this._fieldDefsByName.set(fieldDef.name, fieldDef);
    }
    /** Removes a field definition that was not included as part of the content children. */
    unregisterFieldDef(fieldDef) {
        this._customFieldDefs.delete(fieldDef);
        this._fieldDefsByName.delete(fieldDef.name);
    }
    getFieldDefsByName() {
        return this._fieldDefsByName;
    }
    getConjunctionLabel(conjunction) {
        switch (conjunction.replace('$', '').toLowerCase()) {
            case Conjunction.OR:
                return this.labels.or;
            case Conjunction.NOT:
                return this.labels.not;
            case Conjunction.AND:
            default:
                return this.labels.and;
        }
    }
}
QueryBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: QueryBuilderService, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Injectable });
QueryBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: QueryBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: QueryBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
class ConditionInputOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
ConditionInputOutlet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionInputOutlet, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ConditionInputOutlet.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: ConditionInputOutlet, selector: "[conditionInputOutlet]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionInputOutlet, decorators: [{
            type: Directive,
            args: [{ selector: '[conditionInputOutlet]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }]; } });
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
class ConditionOperatorOutlet {
    constructor(viewContainer, elementRef) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
    }
}
ConditionOperatorOutlet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionOperatorOutlet, deps: [{ token: i0.ViewContainerRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ConditionOperatorOutlet.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: ConditionOperatorOutlet, selector: "[conditionOperatorOutlet]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionOperatorOutlet, decorators: [{
            type: Directive,
            args: [{ selector: '[conditionOperatorOutlet]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.ElementRef }]; } });
class ConditionBuilderComponent {
    constructor(labels, cdr, qbs, controlContainer) {
        this.labels = labels;
        this.cdr = cdr;
        this.qbs = qbs;
        this.controlContainer = controlContainer;
        this.searchTerm = new FormControl();
        this._lastContext = {};
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.parentForm.valueChanges.subscribe((value) => {
            Promise.resolve().then(() => this.onFieldSelect());
        });
    }
    ngAfterContentInit() {
        const { fields = [] } = this.qbs.config || {};
        fields.length && this.changeFieldOptions(fields[0]);
        this.searches = this.searchTerm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
            this.results$ = Promise.resolve(this.fieldConfig.options.filter((f) => { var _a; return f.name.toLowerCase().includes(term.toLowerCase()) || ((_a = f.label) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term.toLowerCase())); }));
            this.cdr.markForCheck();
        });
    }
    ngAfterViewInit() {
        var _a;
        if (((_a = this.parentForm.value) === null || _a === void 0 ? void 0 : _a.field) !== null) {
            Promise.resolve().then(() => this.onFieldSelect());
        }
    }
    ngOnDestroy() {
        this.searches.unsubscribe();
        // Clear all outlets and Maps
        [this._operatorOutlet.viewContainer, this._inputOutlet.viewContainer].forEach((def) => {
            def.clear();
        });
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Updates the Conditions "Field" Options to Change base on new Scope
     * @param fieldConfig
     */
    changeFieldOptions(fieldConfig) {
        this.fieldConfig = fieldConfig;
        this.searchTerm.setValue('');
        this.results$ = Promise.resolve(this.fieldConfig.options);
    }
    getField() {
        var _a;
        const { field } = (_a = this.parentForm) === null || _a === void 0 ? void 0 : _a.value;
        if (!field)
            return null;
        return this.fieldConfig.find(field);
    }
    getDefaultField() {
        const fields = this.fieldConfig.options;
        if (fields && fields.length) {
            return fields[0].name;
        }
        return null;
    }
    onFieldSelect() {
        const fieldConf = this.getField();
        if (!fieldConf) {
            this.parentForm.get('field').setValue(this.getDefaultField());
            return;
        }
        else {
            this.fieldDisplayWith = () => fieldConf.label || fieldConf.name;
        }
        const { field, operator } = this.parentForm.value;
        if (this._lastContext.field !== field) {
            if (!!this._lastContext.field) {
                // only clearing operator/value is field was previously defined so we can preload values onto the form
                this.parentForm.get('value').setValue(null);
                this.parentForm.get('operator').setValue(null);
            }
            this.createFieldTemplates();
        }
        this._lastContext = Object.assign({}, this.parentForm.value);
        this.cdr.markForCheck();
    }
    findDefinitionForField(field) {
        if (!field)
            return;
        const editType = this.qbs.editTypeFn(field);
        // Don't look at dataSpecialization it is no good, this misses currency, and percent
        const { name, inputType, dataType, type } = field;
        const fieldDefsByName = this.qbs.getFieldDefsByName();
        // Check Fields by priority for match Field Definition
        const key = [name, editType === null || editType === void 0 ? void 0 : editType.toUpperCase(), 'DEFAULT'].find((it) => fieldDefsByName.has(it));
        return fieldDefsByName.get(key);
    }
    createFieldTemplates() {
        const definition = this.findDefinitionForField(this.getField());
        if (!this.parentForm.get('operator').value) {
            this.parentForm.get('operator').setValue(definition.defaultOperator);
        }
        this.createFieldOperators(definition);
        this.createFieldInput(definition);
    }
    createFieldOperators(definition) {
        this._operatorOutlet.viewContainer.clear();
        if (definition) {
            const context = { $implicit: this.parentForm, fieldMeta: this.getField() };
            this._operatorOutlet.viewContainer.createEmbeddedView(definition.fieldOperators.template, context);
        }
        this.cdr.markForCheck();
    }
    createFieldInput(definition) {
        this._inputOutlet.viewContainer.clear();
        if (definition) {
            const context = { $implicit: this.parentForm, fieldMeta: this.getField(), viewIndex: this.groupIndex.toString() + this.andIndex.toString() };
            this._inputOutlet.viewContainer.createEmbeddedView(definition.fieldInput.template, context);
        }
        this.cdr.markForCheck();
    }
}
ConditionBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionBuilderComponent, deps: [{ token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }, { token: QueryBuilderService }, { token: i3.ControlContainer }], target: i0.ɵɵFactoryTarget.Component });
ConditionBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ConditionBuilderComponent, selector: "novo-condition-builder", inputs: { label: "label", isFirst: "isFirst", andIndex: "andIndex", groupIndex: "groupIndex" }, providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent }], viewQueries: [{ propertyName: "_operatorOutlet", first: true, predicate: ConditionOperatorOutlet, descendants: true, static: true }, { propertyName: "_inputOutlet", first: true, predicate: ConditionInputOutlet, descendants: true, static: true }], ngImport: i0, template: "<form [formGroup]=\"parentForm\">\n  <novo-grid gap=\"1rem\" [columns]=\"isFirst ? '20rem 13rem 1fr' : '16rem 13rem 1fr'\" align=\"end\">\n    <novo-field class=\"condition-field\">\n      <novo-select\n        [placeholder]=\"labels.chooseAField\"\n        formControlName=\"field\"\n        (onSelect)=\"onFieldSelect()\"\n        overlayWidth=\"24rem\"\n        overlayHeight=\"20rem\"\n        [displayWith]=\"fieldDisplayWith\"\n        [style.minWidth.px]=\"160\"\n        [style.maxWidth.px]=\"isFirst ? 200 : 160\">\n        <novo-optgroup class=\"filter-search-results\">\n          <novo-option>\n            <novo-select-search [formControl]=\"searchTerm\" [clearSearchInput]=\"false\"></novo-select-search>\n          </novo-option>\n          <ng-container *ngIf=\"results$ | async as results; else loading\">\n            <ng-container *ngIf=\"results.length\">\n              <novo-option *ngFor=\"let field of results\" value=\"{{ field.name }}\"\n                [attr.data-automation-id]=\"field.name\">\n                {{ field.label || field.name }}\n              </novo-option>\n            </ng-container>\n          </ng-container>\n        </novo-optgroup>\n      </novo-select>\n    </novo-field>\n\n    <div class=\"condition-operator\">\n      <ng-container conditionOperatorOutlet></ng-container>\n    </div>\n\n    <div class=\"condition-input\">\n      <ng-container conditionInputOutlet></ng-container>\n    </div>\n  </novo-grid>\n  <ng-content></ng-content>\n</form>\n\n<!-- EMPTY STATE TEMPLATE -->\n<!-- <ng-template #empty>\n  <novo-non-ideal-state>\n    <novo-icon size=\"xl\" color=\"grapefruit\">search</novo-icon>\n    <novo-title>No results found.</novo-title>\n    <novo-text>Your search didn't find anything. Try searching for something else.</novo-text>\n  </novo-non-ideal-state>\n</ng-template> -->\n\n<!-- LOADING TEMPLATE -->\n<ng-template #loading>\n  <novo-loading></novo-loading>\n</ng-template>", styles: [":host{position:relative;display:block;width:100%}:host .condition-field{grid-template-columns:minmax(-webkit-fit-content,1fr);grid-template-columns:minmax(fit-content,1fr);width:100%;width:-webkit-fill-available}:host .condition-operator::ng-deep .novo-select{min-width:13rem}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(-webkit-fit-content,1fr);grid-template-columns:minmax(fit-content,1fr);width:-webkit-fill-available}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host .condition-input::ng-deep novo-field{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .condition-input::ng-deep .novo-field-infix{white-space:nowrap;overflow:hidden}:host .condition-input::ng-deep novo-chip-list{width:36rem}:host .condition-input::ng-deep novo-chip-list novo-chip{max-width:33rem}:host .condition-input::ng-deep novo-chips{border-bottom:none!important}:host .condition-input::ng-deep novo-chips input{padding-left:0!important}:host .condition-input::ng-deep novo-radio-group{padding:0!important}:host .and-or-filter-button{box-sizing:border-box;background:#fff;border:1px solid #ddd;color:#5691f5;display:inline-block;position:relative;cursor:pointer;margin:.4rem auto;align-items:center;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;outline:none;white-space:nowrap;text-transform:uppercase;overflow:hidden;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}\n"], components: [{ type: i4.NovoGridElement, selector: "novo-grid", inputs: ["direction", "align", "justify", "columns"] }, { type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i8.NovoSelectSearchComponent, selector: "novo-select-search", inputs: ["name", "placeholderLabel", "type", "noEntriesFoundLabel", "indexAndLengthScreenReaderText", "clearSearchInput", "searching", "disableInitialFocus", "enableClearOnEscapePressed", "preventHomeEndKeyPropagation", "disableScrollToActiveOnOptionsChanged", "ariaLabel", "showToggleAllCheckbox", "toggleAllCheckboxChecked", "toggleAllCheckboxIndeterminate", "toggleAllCheckboxTooltipMessage", "toogleAllCheckboxTooltipPosition", "hideClearSearchButton", "alwaysRestoreSelectedOptionsMulti"], outputs: ["toggleAll"] }, { type: i9.NovoLoadingElement, selector: "novo-loading", inputs: ["theme", "color", "size"] }], directives: [{ type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3$1.GapDirective, selector: "[gap]", inputs: ["gap"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: ConditionOperatorOutlet, selector: "[conditionOperatorOutlet]" }, { type: ConditionInputOutlet, selector: "[conditionInputOutlet]" }], pipes: { "async": i10.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-condition-builder', providers: [{ provide: NOVO_CONDITION_BUILDER, useExisting: ConditionBuilderComponent }], changeDetection: ChangeDetectionStrategy.OnPush, template: "<form [formGroup]=\"parentForm\">\n  <novo-grid gap=\"1rem\" [columns]=\"isFirst ? '20rem 13rem 1fr' : '16rem 13rem 1fr'\" align=\"end\">\n    <novo-field class=\"condition-field\">\n      <novo-select\n        [placeholder]=\"labels.chooseAField\"\n        formControlName=\"field\"\n        (onSelect)=\"onFieldSelect()\"\n        overlayWidth=\"24rem\"\n        overlayHeight=\"20rem\"\n        [displayWith]=\"fieldDisplayWith\"\n        [style.minWidth.px]=\"160\"\n        [style.maxWidth.px]=\"isFirst ? 200 : 160\">\n        <novo-optgroup class=\"filter-search-results\">\n          <novo-option>\n            <novo-select-search [formControl]=\"searchTerm\" [clearSearchInput]=\"false\"></novo-select-search>\n          </novo-option>\n          <ng-container *ngIf=\"results$ | async as results; else loading\">\n            <ng-container *ngIf=\"results.length\">\n              <novo-option *ngFor=\"let field of results\" value=\"{{ field.name }}\"\n                [attr.data-automation-id]=\"field.name\">\n                {{ field.label || field.name }}\n              </novo-option>\n            </ng-container>\n          </ng-container>\n        </novo-optgroup>\n      </novo-select>\n    </novo-field>\n\n    <div class=\"condition-operator\">\n      <ng-container conditionOperatorOutlet></ng-container>\n    </div>\n\n    <div class=\"condition-input\">\n      <ng-container conditionInputOutlet></ng-container>\n    </div>\n  </novo-grid>\n  <ng-content></ng-content>\n</form>\n\n<!-- EMPTY STATE TEMPLATE -->\n<!-- <ng-template #empty>\n  <novo-non-ideal-state>\n    <novo-icon size=\"xl\" color=\"grapefruit\">search</novo-icon>\n    <novo-title>No results found.</novo-title>\n    <novo-text>Your search didn't find anything. Try searching for something else.</novo-text>\n  </novo-non-ideal-state>\n</ng-template> -->\n\n<!-- LOADING TEMPLATE -->\n<ng-template #loading>\n  <novo-loading></novo-loading>\n</ng-template>", styles: [":host{position:relative;display:block;width:100%}:host .condition-field{grid-template-columns:minmax(-webkit-fit-content,1fr);grid-template-columns:minmax(fit-content,1fr);width:100%;width:-webkit-fill-available}:host .condition-operator::ng-deep .novo-select{min-width:13rem}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical{grid-template-columns:minmax(-webkit-fit-content,1fr);grid-template-columns:minmax(fit-content,1fr);width:-webkit-fill-available}:host .condition-input::ng-deep novo-field.novo-field-layout-vertical .novo-input-element{width:100%}:host .condition-input::ng-deep novo-field{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .condition-input::ng-deep .novo-field-infix{white-space:nowrap;overflow:hidden}:host .condition-input::ng-deep novo-chip-list{width:36rem}:host .condition-input::ng-deep novo-chip-list novo-chip{max-width:33rem}:host .condition-input::ng-deep novo-chips{border-bottom:none!important}:host .condition-input::ng-deep novo-chips input{padding-left:0!important}:host .condition-input::ng-deep novo-radio-group{padding:0!important}:host .and-or-filter-button{box-sizing:border-box;background:#fff;border:1px solid #ddd;color:#5691f5;display:inline-block;position:relative;cursor:pointer;margin:.4rem auto;align-items:center;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;outline:none;white-space:nowrap;text-transform:uppercase;overflow:hidden;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }, { type: QueryBuilderService }, { type: i3.ControlContainer }]; }, propDecorators: { _operatorOutlet: [{
                type: ViewChild,
                args: [ConditionOperatorOutlet, { static: true }]
            }], _inputOutlet: [{
                type: ViewChild,
                args: [ConditionInputOutlet, { static: true }]
            }], label: [{
                type: Input
            }], isFirst: [{
                type: Input
            }], andIndex: [{
                type: Input
            }], groupIndex: [{
                type: Input
            }] } });

/**
 * Contained within a novoConditionField definition describing what input should be
 * used to capture the compare value of the Condtion
 */
class NovoConditionInputDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
}
NovoConditionInputDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionInputDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionInputDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionInputDef, selector: "[novoConditionInputDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionInputDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoConditionInputDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Contained within a novoConditionField definition describing what operators should be available.
 */
class NovoConditionOperatorsDef {
    constructor(/** @docs-private */ template) {
        this.template = template;
    }
}
NovoConditionOperatorsDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionOperatorsDef, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionOperatorsDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionOperatorsDef, decorators: [{
            type: Directive,
            args: [{ selector: '[novoConditionOperatorsDef]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
/**
 * Field Field definition for the QueryBuilder.
 * Defines the inputType and operators to use for the query builder.
 */
class BaseConditionFieldDef {
    constructor() { }
    /** Unique name for this field. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._setNameInput(name);
    }
    /**
     * Overridable method that sets the css classes that will be added to every cell in this
     * column.
     * In the future, columnCssClassName will change from type string[] to string and this
     * will set a single string value.
     * @docs-private
     */
    _updateFieldCssClassName() {
        this._fieldCssClassName = [`novo-filter-field-${this.cssClassFriendlyName}`];
    }
    _setNameInput(value) {
        // If the directive is set without a name (updated programmatically), then this setter will
        // trigger with an empty string and should not overwrite the programmatically set value.
        if (value) {
            this._name = value;
            this.cssClassFriendlyName = value.replace(/[^a-z0-9_-]/gi, '-');
            this._updateFieldCssClassName();
        }
    }
}
BaseConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseConditionFieldDef, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BaseConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: BaseConditionFieldDef, inputs: { name: ["novoFilterFieldDef", "name"] }, queries: [{ propertyName: "fieldInput", first: true, predicate: NovoConditionInputDef, descendants: true }, { propertyName: "fieldOperators", first: true, predicate: NovoConditionOperatorsDef, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BaseConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input,
                args: ['novoFilterFieldDef']
            }], fieldInput: [{
                type: ContentChild,
                args: [NovoConditionInputDef]
            }], fieldOperators: [{
                type: ContentChild,
                args: [NovoConditionOperatorsDef]
            }] } });
class NovoConditionFieldDef extends BaseConditionFieldDef {
    constructor(qbs) {
        super();
        this.qbs = qbs;
    }
    register() {
        this.qbs.registerFieldDef(this);
    }
    unregister() {
        this.qbs.unregisterFieldDef(this);
    }
}
NovoConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionFieldDef, deps: [{ token: QueryBuilderService }], target: i0.ɵɵFactoryTarget.Directive });
NovoConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]", usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoConditionFieldDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoConditionFieldDef]',
                }]
        }], ctorParameters: function () { return [{ type: QueryBuilderService }]; } });

class AbstractConditionFieldDef {
    constructor(labels) {
        this.labels = labels;
    }
    /** Column name that should be used to reference this column. */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        // With Ivy, inputs can be initialized before static query results are
        // available. In that case, we defer the synchronization until "ngOnInit" fires.
        this._syncFieldDefName();
    }
    ngOnInit() {
        var _a;
        this._syncFieldDefName();
        this._syncFieldDefOperatorValue();
        // Need to add self to FilterBuilder because "ContentChildren won't find it"
        (_a = this.fieldDef) === null || _a === void 0 ? void 0 : _a.register();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.fieldDef) === null || _a === void 0 ? void 0 : _a.unregister();
    }
    onOperatorSelect(formGroup) {
        formGroup.get('value').setValue(null);
    }
    /** Synchronizes the column definition name with the text column name. */
    _syncFieldDefName() {
        if (this.fieldDef) {
            this.fieldDef.name = this.name;
        }
    }
    _syncFieldDefOperatorValue() {
        if (this.fieldDef) {
            this.fieldDef.defaultOperator = this.defaultOperator;
        }
    }
}
AbstractConditionFieldDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AbstractConditionFieldDef, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Directive });
AbstractConditionFieldDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: AbstractConditionFieldDef, inputs: { name: "name" }, viewQueries: [{ propertyName: "fieldDef", first: true, predicate: NovoConditionFieldDef, descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: AbstractConditionFieldDef, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { name: [{
                type: Input
            }], fieldDef: [{
                type: ViewChild,
                args: [NovoConditionFieldDef, { static: true }]
            }] } });

/**
 * Handle selection of field values when a list of options is provided.
 */
class NovoDefaultAddressConditionDef extends AbstractConditionFieldDef {
    constructor(element, labels) {
        super(labels);
        this.element = element;
        this.labels = labels;
        this.defaultOperator = 'includeAny';
        this.chipListModel = '';
        this.term = '';
    }
    onKeyup(event, viewIndex) {
        if (!["Escape" /* Escape */, "Enter" /* Enter */].includes(event.key)) {
            this.openPlacesList(viewIndex);
        }
        this.term = event.target.value;
    }
    onKeydown(event, viewIndex) {
        if (!this.placesPicker.dropdownOpen) {
            this.openPlacesList(viewIndex);
            this.placesPicker.dropdownOpen = true;
        }
        if (["Escape" /* Escape */, "Tab" /* Tab */].includes(event.key)) {
            this.closePlacesList(viewIndex);
        }
        else {
            this.placesPicker.onKeyDown(event);
        }
    }
    getValue(formGroup) {
        return formGroup.value.value || [];
    }
    getCurrentOverlay(viewIndex) {
        var _a;
        return (_a = this.overlayChildren) === null || _a === void 0 ? void 0 : _a.find(item => item.overlayId === viewIndex);
    }
    getCurrentInput(viewIndex) {
        var _a;
        return (_a = this.inputChildren) === null || _a === void 0 ? void 0 : _a.find(item => item.nativeElement.id === viewIndex);
    }
    openPlacesList(viewIndex) {
        var _a;
        (_a = this.getCurrentOverlay(viewIndex)) === null || _a === void 0 ? void 0 : _a.openPanel();
    }
    closePlacesList(viewIndex) {
        var _a;
        (_a = this.getCurrentOverlay(viewIndex)) === null || _a === void 0 ? void 0 : _a.closePanel();
    }
    selectPlace(event, formGroup, viewIndex) {
        var _a;
        const valueToAdd = {
            address_components: event.address_components,
            formatted_address: event.formatted_address,
            geometry: event.geometry,
            place_id: event.place_id,
        };
        const current = this.getValue(formGroup);
        if (!Array.isArray(current)) {
            formGroup.get('value').setValue([valueToAdd]);
        }
        else {
            formGroup.get('value').setValue([...current, valueToAdd]);
        }
        this.inputChildren.forEach(input => {
            input.nativeElement.value = '';
        });
        (_a = this.getCurrentInput(viewIndex)) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        this.closePlacesList(viewIndex);
    }
    remove(valueToRemove, formGroup, viewIndex) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const oldValue = [...current];
            oldValue.splice(index, 1);
            formGroup.get('value').setValue(oldValue);
        }
        this.closePlacesList(viewIndex);
    }
}
NovoDefaultAddressConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultAddressConditionDef, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoDefaultAddressConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def", viewQueries: [{ propertyName: "placesPicker", first: true, predicate: ["placesPicker"], descendants: true }, { propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }, { propertyName: "inputChildren", predicate: ["addressInput"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'excludeAny']" #novoField>
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
              <novo-text ellipsis>{{ item.formatted_address }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              (keydown)="onKeydown($event, viewIndex)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i5.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i3$1.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i1$1.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i7.PlacesListComponent, selector: "google-places-list", inputs: ["userSettings"], outputs: ["termChange", "select"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i5.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }, { type: i1$1.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i1$1.NovoFieldSuffixDirective, selector: "[novoSuffix]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultAddressConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-address-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'excludeAny']" #novoField>
          <novo-chip-list [(ngModel)]="chipListModel" [ngModelOptions]="{ standalone: true }" (click)="openPlacesList(viewIndex)">
            <novo-chip *ngFor="let item of formGroup.get('value').value" (removed)="remove(item, formGroup, viewIndex)">
              <novo-text ellipsis>{{ item.formatted_address }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [id]="viewIndex"
              [placeholder]="labels.location"
              (keyup)="onKeyup($event, viewIndex)"
              (keydown)="onKeydown($event, viewIndex)"
              [picker]="placesPicker"
              #addressInput />
          </novo-chip-list>
          <novo-picker-toggle [overlayId]="viewIndex" icon="location" novoSuffix>
            <google-places-list [term]="term" (select)="selectPlace($event, formGroup, viewIndex)" formControlName="value" #placesPicker></google-places-list>
          </novo-picker-toggle>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoLabelService }]; }, propDecorators: { overlayChildren: [{
                type: ViewChildren,
                args: [NovoPickerToggleElement]
            }], inputChildren: [{
                type: ViewChildren,
                args: ['addressInput']
            }], placesPicker: [{
                type: ViewChild,
                args: ['placesPicker']
            }] } });

/**
 * When constructing a query using a field that is a boolean with only true/false as possible values.
 */
class NovoDefaultBooleanConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'include';
    }
}
NovoDefaultBooleanConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultBooleanConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultBooleanConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isNull' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isNull' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultBooleanConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-boolean-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="include">{{ labels.equals }}</novo-option>
          <novo-option value="exclude">{{ labels.doesNotEqual }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [style.width.px]="125" [formGroup]="formGroup">
        <novo-radio-group formControlName="value">
          <novo-radio [value]="true">{{ formGroup.value.operator === 'isNull' ? labels.yes : labels.true }}</novo-radio>
          <novo-radio [value]="false">{{ formGroup.value.operator === 'isNull' ? labels.no : labels.false }}</novo-radio>
        </novo-radio-group>
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
class NovoDefaultDateConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'within';
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
        overlay.closePanel(event);
    }
}
NovoDefaultDateConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultDateConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultDateConditionDef, selector: "novo-date-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['before', 'after']">
          <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value" />
          <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"></novo-date-picker>
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
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i1$1.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i4$2.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "disabledDateMessage", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { type: i4$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i1$1.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i1$1.NovoDateFormatDirective, selector: "input[dateFormat]", inputs: ["dateFormat"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1$1.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i1$1.NovoFieldSuffixDirective, selector: "[novoSuffix]" }, { type: i1$1.NovoDateRangeFormatDirective, selector: "input[dateRangeFormat]", inputs: ["dateRangeFormat"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-date-condition-def',
                    template: `
    <ng-container novoConditionFieldDef="DATE">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="before">{{ labels.before }}</novo-option>
          <novo-option value="after">{{ labels.after }}</novo-option>
          <novo-option value="between">{{ labels.between }}</novo-option>
          <novo-option value="within">{{ labels.within }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; viewIndex as viewIndex" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['before', 'after']">
          <input novoInput dateFormat="iso8601" [picker]="datepicker" formControlName="value" />
          <novo-picker-toggle triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker (onSelect)="closePanel($event, viewIndex)" #datepicker></novo-date-picker>
          </novo-picker-toggle>
        </novo-field>
        <novo-field *novoSwitchCases="['between']">
          <input novoInput dateRangeFormat="date" [picker]="daterangepicker" formControlName="value" />
          <novo-picker-toggle [for]="daterangepicker" triggerOnFocus [overlayId]="viewIndex" novoSuffix icon="calendar">
            <novo-date-picker #daterangepicker (onSelect)="closePanel($event, viewIndex)" mode="range" numberOfMonths="2"></novo-date-picker>
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

/**
 * Most complicated of the default conditions defs, a date needs to provide a different
 * input type depending on the operator selected.
 */
class NovoDefaultDateTimeConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'within';
    }
    closePanel(event, viewIndex) {
        const overlay = this.overlayChildren.find(item => item.overlayId === viewIndex);
    }
}
NovoDefaultDateTimeConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateTimeConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultDateTimeConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def", viewQueries: [{ propertyName: "overlayChildren", predicate: NovoPickerToggleElement, descendants: true }], usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i1$1.NovoPickerToggleElement, selector: "novo-picker-toggle", inputs: ["for", "icon", "tabIndex", "aria-label", "triggerOnFocus", "overlayId", "width", "disabled"], exportAs: ["novoPickerToggle"] }, { type: i4$3.NovoDateTimePickerElement, selector: "novo-date-time-picker", inputs: ["defaultTime", "minYear", "maxYear", "start", "end", "military", "weekStart", "disabledDateMessage"], outputs: ["onSelect"] }, { type: i4$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i1$1.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i1$1.NovoDateTimeFormatDirective, selector: "input[dateTimeFormat]", inputs: ["military", "dateTimeFormat"] }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1$1.NovoPickerDirective, selector: "input[picker]", inputs: ["picker", "autocomplete"] }, { type: i1$1.NovoFieldSuffixDirective, selector: "[novoSuffix]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultDateTimeConditionDef, decorators: [{
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

/**
 * Any condition that has a type of ID usually only is queried by ID.
 */
class NovoDefaultIdConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'equalTo';
    }
}
NovoDefaultIdConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultIdConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultIdConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultIdConditionDef, selector: "novo-id-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <ng-content></ng-content>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <input novoInput type="number" min="1" step="1" formControlName="value" />
      </novo-field>
    </ng-container>
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i1$1.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i3.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultIdConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-id-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator">
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <ng-content></ng-content>
        </novo-select>
      </novo-field>
      <novo-field *novoConditionInputDef="let formGroup" [formGroup]="formGroup">
        <input novoInput type="number" min="1" step="1" formControlName="value" />
      </novo-field>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });

/**
 * When constructing a query using a field that is an Int, Double, Number ...etc.
 * TODO: Do we implment currency formation here potentially>.?
 */
class NovoDefaultNumberConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'equalTo';
    }
}
NovoDefaultNumberConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultNumberConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultNumberConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultNumberConditionDef, selector: "novo-number-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="greaterThan">{{ labels.greaterThan }}</novo-option>
          <novo-option value="lessThan">{{ labels.lessThan }}</novo-option>
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['greaterThan', 'lessThan', 'equalTo']">
          <input novoInput type="number" formControlName="value" />
        </novo-field>
        <novo-field *novoSwitchCases="['isNull']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i1$1.NovoInput, selector: "input[novoInput], textarea[novoInput], select[novoInput]", inputs: ["disabled", "id", "placeholder", "required", "type", "value", "readonly"] }, { type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultNumberConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-number-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="greaterThan">{{ labels.greaterThan }}</novo-option>
          <novo-option value="lessThan">{{ labels.lessThan }}</novo-option>
          <novo-option value="equalTo">{{ labels.equalTo }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['greaterThan', 'lessThan', 'equalTo']">
          <input novoInput type="number" formControlName="value" />
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
        }] });

/**
 * Handle selection of field values when a list of options is provided.
 */
class NovoDefaultPickerConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'includeAny';
    }
}
NovoDefaultPickerConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultPickerConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultPickerConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def", usesInheritance: true, ngImport: i0, template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <!-- WHat about optionUrl/optionType -->
            <novo-option *ngFor="let option of meta?.options" [value]="option.value" [attr.data-automation-value]="option.label">
              {{ option.label }}
            </novo-option>
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
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i4$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultPickerConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-picker-condition-def',
                    template: `
    <ng-container novoConditionFieldDef>
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isNull">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup; fieldMeta as meta" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-select formControlName="value" [placeholder]="labels.select" [multiple]="true">
            <!-- WHat about optionUrl/optionType -->
            <novo-option *ngFor="let option of meta?.options" [value]="option.value" [attr.data-automation-value]="option.label">
              {{ option.label }}
            </novo-option>
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
        }] });

/**
 * Constructing filters against String fields can be complex. Each "chip" added to the
 * condition can be independently used to query a database.  Not all systems support
 * querying within a text column, ie sql unless LIKE is enabled. This could result in a
 * performance penalty.
 */
class NovoDefaultStringConditionDef extends AbstractConditionFieldDef {
    constructor() {
        super(...arguments);
        this.defaultOperator = 'includeAny';
    }
    getValue(formGroup) {
        var _a;
        return ((_a = formGroup.value) === null || _a === void 0 ? void 0 : _a.value) || [];
    }
    add(event, formGroup) {
        const input = event.input;
        input.value = '';
        const valueToAdd = event.value;
        if (valueToAdd !== '') {
            const current = this.getValue(formGroup);
            if (!Array.isArray(current)) {
                formGroup.get('value').setValue([valueToAdd]);
            }
            else {
                formGroup.get('value').setValue([...current, valueToAdd]);
            }
        }
    }
    remove(valueToRemove, formGroup) {
        const current = this.getValue(formGroup);
        const index = current.indexOf(valueToRemove);
        if (index >= 0) {
            const oldValue = [...current];
            oldValue.splice(index, 1);
            formGroup.get('value').setValue(oldValue);
        }
    }
}
NovoDefaultStringConditionDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultStringConditionDef, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDefaultStringConditionDef.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDefaultStringConditionDef, selector: "novo-string-condition-def", usesInheritance: true, ngImport: i0, template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-chip-list #chipList aria-label="filter value" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis>{{ chip }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.typeToAddChips"
              autocomplete="off"
              (novoChipInputTokenEnd)="add($event, formGroup)"
            />
          </novo-chip-list>
          <novo-autocomplete></novo-autocomplete>
        </novo-field>
        <novo-field *novoSwitchCases="['isEmpty']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `, isInline: true, components: [{ type: i1$1.NovoFieldElement, selector: "novo-field", inputs: ["layout", "appearance", "width"], outputs: ["valueChanges", "stateChanges"] }, { type: i2.NovoSelectElement, selector: "novo-select", inputs: ["disabled", "required", "tabIndex", "id", "name", "options", "placeholder", "readonly", "headerConfig", "position", "overlayWidth", "overlayHeight", "displayWith", "compareWith", "value", "multiple"], outputs: ["onSelect", "selectionChange", "valueChange", "openedChange", "opened", "closed"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { type: i5.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { type: i3$1.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i6$1.NovoAutocompleteElement, selector: "novo-autocomplete", inputs: ["tabIndex", "triggerOn", "displayWith", "aria-label", "multiple", "disabled"], outputs: ["optionSelected", "optionActivated"], exportAs: ["novoAutocomplete"] }, { type: i4$1.NovoRadioGroup, selector: "novo-radio-group", inputs: ["id", "tabindex", "errorStateMatcher", "appearance", "value", "name", "disabled", "required", "placeholder"], outputs: ["change", "blur"] }, { type: i4$1.NovoRadioElement, selector: "novo-radio", inputs: ["id", "name", "tabindex", "vertical", "label", "button", "theme", "size", "icon", "color", "disabled", "checked", "value"], outputs: ["change", "blur", "focus"] }], directives: [{ type: NovoConditionFieldDef, selector: "[novoConditionFieldDef]" }, { type: NovoConditionOperatorsDef, selector: "[novoConditionOperatorsDef]" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: NovoConditionInputDef, selector: "[novoConditionInputDef]" }, { type: i10.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3$1.SwitchCasesDirective, selector: "[novoSwitchCases]", inputs: ["novoSwitchCases"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NovoChipRemove, selector: "[novoChipRemove]" }, { type: i5.NovoChipInput, selector: "input[novoChipInput]", inputs: ["novoChipInputAddOnBlur", "novoChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["novoChipInputTokenEnd"], exportAs: ["novoChipInput", "novoChipInputFor"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDefaultStringConditionDef, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-string-condition-def',
                    template: `
    <!-- fieldTypes should be UPPERCASE -->
    <ng-container novoConditionFieldDef="STRING">
      <novo-field *novoConditionOperatorsDef="let formGroup" [formGroup]="formGroup">
        <novo-select [placeholder]="labels.operator" formControlName="operator" (onSelect)="onOperatorSelect(formGroup)">
          <novo-option value="includeAny">{{ labels.includeAny }}</novo-option>
          <novo-option value="includeAll">{{ labels.includeAll }}</novo-option>
          <novo-option value="excludeAny">{{ labels.exclude }}</novo-option>
          <novo-option value="isEmpty">{{ labels.isEmpty }}</novo-option>
        </novo-select>
      </novo-field>
      <ng-container *novoConditionInputDef="let formGroup" [ngSwitch]="formGroup.value.operator" [formGroup]="formGroup">
        <novo-field *novoSwitchCases="['includeAny', 'includeAll', 'excludeAny']">
          <novo-chip-list #chipList aria-label="filter value" formControlName="value">
            <novo-chip *ngFor="let chip of formGroup.value?.value || []" [value]="chip" (removed)="remove(chip, formGroup)">
              <novo-text ellipsis>{{ chip }}</novo-text>
              <novo-icon novoChipRemove>close</novo-icon>
            </novo-chip>
            <input
              novoChipInput
              [placeholder]="labels.typeToAddChips"
              autocomplete="off"
              (novoChipInputTokenEnd)="add($event, formGroup)"
            />
          </novo-chip-list>
          <novo-autocomplete></novo-autocomplete>
        </novo-field>
        <novo-field *novoSwitchCases="['isEmpty']">
          <novo-radio-group formControlName="value">
            <novo-radio [value]="true">{{ labels.yes }}</novo-radio>
            <novo-radio [value]="false">{{ labels.no }}</novo-radio>
          </novo-radio-group>
        </novo-field>
      </ng-container>
    </ng-container>
  `,
                    encapsulation: ViewEncapsulation.None,
                    // Change detection is intentionally not set to OnPush. This component's template will be provided
                    // to the table to be inserted into its view. This is problematic when change detection runs since
                    // the bindings in this template will be evaluated _after_ the table's view is evaluated, which
                    // means the template in the table's view will not have the updated value (and in fact will cause
                    // an ExpressionChangedAfterItHasBeenCheckedError).
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                }]
        }] });

const EMPTY_CONDITION$1 = {
    field: null,
    operator: null,
    value: null,
};
class ConditionGroupComponent {
    constructor(qbs, labels, controlContainer, formBuilder, cdr) {
        this.qbs = qbs;
        this.labels = labels;
        this.controlContainer = controlContainer;
        this.formBuilder = formBuilder;
        this.cdr = cdr;
        this.controlName = '$' + Conjunction.AND;
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new Subject();
    }
    ngOnInit() {
        this.parentForm = this.controlContainer.control;
        this.controlName = Object.keys(this.parentForm.controls)[0];
        merge(this.parentForm.parent.valueChanges, this.qbs.stateChanges)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.cdr.markForCheck());
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    updateControlName(value) {
        const name = `$${value.replace('$', '')}`;
        if (name !== this.controlName) {
            const current = this.parentForm.get(this.controlName).value;
            this.parentForm.controls[name] = this.parentForm.controls[this.controlName];
            delete this.parentForm.controls[this.controlName];
            this.controlName = name;
            this.parentForm.get(this.controlName).setValue(current);
            this.cdr.markForCheck();
        }
    }
    get root() {
        return this.parentForm.get(this.controlName);
    }
    addCondition(data) {
        const conditon = this.newCondition(data);
        this.root.push(conditon);
        this.cdr.markForCheck();
    }
    removeCondition(index) {
        this.root.removeAt(index);
        this.cdr.markForCheck();
    }
    newCondition({ field, operator, value } = EMPTY_CONDITION$1) {
        return this.formBuilder.group({
            field: [field, Validators.required],
            operator: [operator, Validators.required],
            value: [value],
        });
    }
    cantRemoveRow(isFirst) {
        if (this.parentForm.parent.length > 1)
            return false;
        return this.root.length <= 1;
    }
}
ConditionGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionGroupComponent, deps: [{ token: QueryBuilderService }, { token: i1.NovoLabelService }, { token: i3.ControlContainer }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ConditionGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ConditionGroupComponent, selector: "novo-condition-group", inputs: { controlName: "controlName", groupIndex: "groupIndex" }, host: { classAttribute: "novo-condition-group" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConditionGroupComponent), multi: true }], ngImport: i0, template: "<div [formGroup]=\"parentForm\" class=\"condition-group-container\">\n  <novo-stack [formArrayName]=\"controlName\" gap=\"md\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLast = last;\">\n      <ng-container [formGroupName]=\"andIndex\">\n        <novo-flex class=\"condition-row\" align=\"end\" gap=\"sm\">\n          <novo-dropdown *ngIf=\"!isFirst && qbs.allowedGroupings.length > 1; else labeledGroup\">\n            <button theme=\"dialogue\" icon=\"collapse\" size=\"sm\">{{qbs.getConjunctionLabel(controlName)}}</button>\n            <novo-optgroup>\n              <novo-option *ngFor=\"let c of qbs.allowedGroupings\" (click)=\"updateControlName(c)\">\n                {{qbs.getConjunctionLabel(c)}}</novo-option>\n            </novo-optgroup>\n          </novo-dropdown>\n          <ng-template #labeledGroup>\n            <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">\n              {{qbs.getConjunctionLabel(controlName)}}</novo-label>\n          </ng-template>\n          <novo-condition-builder [groupIndex]=\"groupIndex\" [andIndex]=\"andIndex\" [isFirst]=\"isFirst\"></novo-condition-builder>\n          <novo-button theme=\"icon\" icon=\"delete-o\" color=\"negative\" (click)=\"removeCondition(andIndex)\"\n            [disabled]=\"cantRemoveRow(isFirst)\">\n          </novo-button>\n        </novo-flex>\n      </ng-container>\n    </ng-container>\n    <button theme=\"dialogue\" data-automation-id=\"add-advanced-search-condition\" icon=\"add-thin\" side=\"left\" size=\"sm\" uppercase (click)=\"addCondition()\">\n      {{ labels.addCondition }}</button>\n  </novo-stack>\n  <!-- <button class=\"and-or-button\" theme=\"secondary\" size=\"sm\" (click)=\"addRootCondition()\">{{ addCriteriaLabel }}</button> -->\n</div>", styles: [":host{position:relative;display:block;border:1px solid var(--border);border-radius:var(--border-radius-round);padding:var(--spacing-md);width:100%}:host .condition-row{width:100%}\n"], components: [{ type: i4.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i4.NovoFlexElement, selector: "novo-flex,novo-row", inputs: ["direction", "align", "justify", "wrap", "gap"] }, { type: i5$1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i6$2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i3$1.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i3$1.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i3$1.NovoLabel, selector: "novo-label,[novo-label]" }, { type: ConditionBuilderComponent, selector: "novo-condition-builder", inputs: ["label", "isFirst", "andIndex", "groupIndex"] }], directives: [{ type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3$1.GapDirective, selector: "[gap]", inputs: ["gap"] }, { type: i3.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i3$1.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ConditionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-condition-group', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConditionGroupComponent), multi: true }], host: {
                        class: 'novo-condition-group',
                    }, template: "<div [formGroup]=\"parentForm\" class=\"condition-group-container\">\n  <novo-stack [formArrayName]=\"controlName\" gap=\"md\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLast = last;\">\n      <ng-container [formGroupName]=\"andIndex\">\n        <novo-flex class=\"condition-row\" align=\"end\" gap=\"sm\">\n          <novo-dropdown *ngIf=\"!isFirst && qbs.allowedGroupings.length > 1; else labeledGroup\">\n            <button theme=\"dialogue\" icon=\"collapse\" size=\"sm\">{{qbs.getConjunctionLabel(controlName)}}</button>\n            <novo-optgroup>\n              <novo-option *ngFor=\"let c of qbs.allowedGroupings\" (click)=\"updateControlName(c)\">\n                {{qbs.getConjunctionLabel(c)}}</novo-option>\n            </novo-optgroup>\n          </novo-dropdown>\n          <ng-template #labeledGroup>\n            <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">\n              {{qbs.getConjunctionLabel(controlName)}}</novo-label>\n          </ng-template>\n          <novo-condition-builder [groupIndex]=\"groupIndex\" [andIndex]=\"andIndex\" [isFirst]=\"isFirst\"></novo-condition-builder>\n          <novo-button theme=\"icon\" icon=\"delete-o\" color=\"negative\" (click)=\"removeCondition(andIndex)\"\n            [disabled]=\"cantRemoveRow(isFirst)\">\n          </novo-button>\n        </novo-flex>\n      </ng-container>\n    </ng-container>\n    <button theme=\"dialogue\" data-automation-id=\"add-advanced-search-condition\" icon=\"add-thin\" side=\"left\" size=\"sm\" uppercase (click)=\"addCondition()\">\n      {{ labels.addCondition }}</button>\n  </novo-stack>\n  <!-- <button class=\"and-or-button\" theme=\"secondary\" size=\"sm\" (click)=\"addRootCondition()\">{{ addCriteriaLabel }}</button> -->\n</div>", styles: [":host{position:relative;display:block;border:1px solid var(--border);border-radius:var(--border-radius-round);padding:var(--spacing-md);width:100%}:host .condition-row{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: QueryBuilderService }, { type: i1.NovoLabelService }, { type: i3.ControlContainer }, { type: i3.FormBuilder }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { controlName: [{
                type: Input
            }], groupIndex: [{
                type: Input
            }] } });

const EMPTY_CONDITION = {
    field: null,
    operator: null,
    value: null,
};
class CriteriaBuilderComponent {
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
            return Object.assign(Object.assign({}, obj), { [key]: this.formBuilder.array(val.map((it) => this.newCondition(it))) });
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
}
CriteriaBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CriteriaBuilderComponent, deps: [{ token: i3.ControlContainer }, { token: i3.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: QueryBuilderService }], target: i0.ɵɵFactoryTarget.Component });
CriteriaBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: CriteriaBuilderComponent, selector: "novo-criteria-builder", inputs: { config: "config", controlName: "controlName", allowedGroupings: "allowedGroupings", editTypeFn: "editTypeFn" }, host: { classAttribute: "novo-criteria-builder" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
        { provide: QueryBuilderService, useClass: QueryBuilderService },
    ], queries: [{ propertyName: "_contentFieldDefs", predicate: NovoConditionFieldDef, descendants: true }], ngImport: i0, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"], components: [{ type: i4.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i3$1.NovoLabel, selector: "novo-label,[novo-label]" }, { type: ConditionGroupComponent, selector: "novo-condition-group", inputs: ["controlName", "groupIndex"] }, { type: NovoDefaultIdConditionDef, selector: "novo-id-condition-def" }, { type: NovoDefaultDateConditionDef, selector: "novo-date-condition-def" }, { type: NovoDefaultDateTimeConditionDef, selector: "novo-date-time-condition-def" }, { type: NovoDefaultStringConditionDef, selector: "novo-string-condition-def" }, { type: NovoDefaultNumberConditionDef, selector: "novo-number-condition-def" }, { type: NovoDefaultAddressConditionDef, selector: "novo-address-condition-def" }, { type: NovoDefaultBooleanConditionDef, selector: "novo-boolean-condition-def" }, { type: NovoDefaultPickerConditionDef, selector: "novo-picker-condition-def" }], directives: [{ type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.PaddingDirective, selector: "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", inputs: ["padding", "p", "paddingLeft", "pl", "paddingRight", "pr", "paddingTop", "pt", "paddingBottom", "pb", "paddingX", "px", "paddingY", "py"] }, { type: i3.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: CriteriaBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'novo-criteria-builder', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CriteriaBuilderComponent), multi: true },
                        { provide: NOVO_CRITERIA_BUILDER, useExisting: CriteriaBuilderComponent },
                        { provide: QueryBuilderService, useClass: QueryBuilderService },
                    ], host: {
                        class: 'novo-criteria-builder',
                    }, template: "<form [formGroup]=\"innerForm\">\n  <novo-stack [formArrayName]=\"controlName\" class=\"criteria-builder-inner\">\n    <ng-container\n      *ngFor=\"let andGroup of root.controls; let andIndex = index; let isFirst = first;let isLastAnd = last;\">\n      <novo-label *ngIf=\"!isFirst\" color=\"ash\" size=\"xs\" uppercase padding=\"sm\">{{qbs.getConjunctionLabel('and')}}\n      </novo-label>\n      <novo-condition-group [groupIndex]=\"andIndex\" [formGroupName]=\"andIndex\"></novo-condition-group>\n    </ng-container>\n  </novo-stack>\n</form>\n<novo-id-condition-def name=\"ID\"></novo-id-condition-def>\n<novo-date-condition-def name=\"DATE\"></novo-date-condition-def>\n<novo-date-time-condition-def name=\"TIMESTAMP\"></novo-date-time-condition-def>\n<novo-string-condition-def name=\"STRING\"></novo-string-condition-def>\n<novo-number-condition-def name=\"FLOAT\"></novo-number-condition-def>\n<novo-number-condition-def name=\"INTEGER\"></novo-number-condition-def>\n<novo-number-condition-def name=\"BIGDECIMAL\"></novo-number-condition-def>\n<novo-number-condition-def name=\"DOUBLE\"></novo-number-condition-def>\n<novo-address-condition-def name=\"ADDRESS\"></novo-address-condition-def>\n<novo-boolean-condition-def name=\"BOOLEAN\"></novo-boolean-condition-def>\n<novo-picker-condition-def name=\"SELECT\"></novo-picker-condition-def>\n<novo-string-condition-def name=\"DEFAULT\"></novo-string-condition-def>\n\n<!-- \n  {\n    $and: [{\n      $or: [{\n        entity: 'JobOrder'\n        field: 'categories',\n        operator: 'doesNotContain',\n        value: 'Healthcare'\n      }]\n    }]\n  }\n -->", styles: [":host{position:relative;display:block;width:76rem}:host .criteria-builder-inner{padding-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.ControlContainer }, { type: i3.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: QueryBuilderService }]; }, propDecorators: { config: [{
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

class NovoQueryBuilderModule {
}
NovoQueryBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoQueryBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, declarations: [CriteriaBuilderComponent,
        ConditionBuilderComponent,
        ConditionInputOutlet,
        ConditionOperatorOutlet,
        ConditionGroupComponent,
        NovoDefaultAddressConditionDef,
        NovoDefaultBooleanConditionDef,
        NovoDefaultDateConditionDef,
        NovoDefaultDateTimeConditionDef,
        NovoConditionOperatorsDef,
        NovoConditionInputDef,
        NovoConditionFieldDef,
        NovoDefaultStringConditionDef,
        NovoDefaultNumberConditionDef,
        NovoDefaultIdConditionDef,
        NovoDefaultPickerConditionDef], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        CdkTableModule,
        GooglePlacesModule,
        NovoAutoCompleteModule,
        NovoButtonModule,
        NovoCommonModule,
        NovoFormModule,
        NovoSelectModule,
        NovoNonIdealStateModule,
        NovoFieldModule,
        NovoOptionModule,
        NovoFlexModule,
        NovoTabModule,
        NovoLoadingModule,
        NovoCardModule,
        NovoDatePickerModule,
        NovoDateTimePickerModule,
        NovoIconModule,
        NovoOverlayModule,
        NovoRadioModule,
        NovoSearchBoxModule,
        NovoSwitchModule,
        NovoChipsModule,
        NovoSelectSearchModule,
        NovoDropdownModule], exports: [CriteriaBuilderComponent,
        ConditionBuilderComponent,
        NovoDefaultAddressConditionDef,
        NovoDefaultBooleanConditionDef,
        NovoDefaultDateConditionDef,
        NovoDefaultDateTimeConditionDef,
        NovoConditionOperatorsDef,
        NovoConditionInputDef,
        NovoConditionFieldDef,
        NovoDefaultStringConditionDef,
        NovoDefaultNumberConditionDef,
        NovoDefaultIdConditionDef,
        NovoDefaultPickerConditionDef] });
NovoQueryBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            DragDropModule,
            CdkTableModule,
            GooglePlacesModule,
            NovoAutoCompleteModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoFormModule,
            NovoSelectModule,
            NovoNonIdealStateModule,
            NovoFieldModule,
            NovoOptionModule,
            NovoFlexModule,
            NovoTabModule,
            NovoLoadingModule,
            NovoCardModule,
            NovoDatePickerModule,
            NovoDateTimePickerModule,
            NovoIconModule,
            NovoOverlayModule,
            NovoRadioModule,
            NovoSearchBoxModule,
            NovoSwitchModule,
            NovoChipsModule,
            NovoSelectSearchModule,
            NovoDropdownModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoQueryBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        DragDropModule,
                        CdkTableModule,
                        GooglePlacesModule,
                        NovoAutoCompleteModule,
                        NovoButtonModule,
                        NovoCommonModule,
                        NovoFormModule,
                        NovoSelectModule,
                        NovoNonIdealStateModule,
                        NovoFieldModule,
                        NovoOptionModule,
                        NovoFlexModule,
                        NovoTabModule,
                        NovoLoadingModule,
                        NovoCardModule,
                        NovoDatePickerModule,
                        NovoDateTimePickerModule,
                        NovoIconModule,
                        NovoOverlayModule,
                        NovoRadioModule,
                        NovoSearchBoxModule,
                        NovoSwitchModule,
                        NovoChipsModule,
                        NovoSelectSearchModule,
                        NovoDropdownModule,
                    ],
                    declarations: [
                        CriteriaBuilderComponent,
                        ConditionBuilderComponent,
                        ConditionInputOutlet,
                        ConditionOperatorOutlet,
                        ConditionGroupComponent,
                        NovoDefaultAddressConditionDef,
                        NovoDefaultBooleanConditionDef,
                        NovoDefaultDateConditionDef,
                        NovoDefaultDateTimeConditionDef,
                        NovoConditionOperatorsDef,
                        NovoConditionInputDef,
                        NovoConditionFieldDef,
                        NovoDefaultStringConditionDef,
                        NovoDefaultNumberConditionDef,
                        NovoDefaultIdConditionDef,
                        NovoDefaultPickerConditionDef,
                    ],
                    exports: [
                        CriteriaBuilderComponent,
                        ConditionBuilderComponent,
                        NovoDefaultAddressConditionDef,
                        NovoDefaultBooleanConditionDef,
                        NovoDefaultDateConditionDef,
                        NovoDefaultDateTimeConditionDef,
                        NovoConditionOperatorsDef,
                        NovoConditionInputDef,
                        NovoConditionFieldDef,
                        NovoDefaultStringConditionDef,
                        NovoDefaultNumberConditionDef,
                        NovoDefaultIdConditionDef,
                        NovoDefaultPickerConditionDef,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AbstractConditionFieldDef, BaseConditionFieldDef, ConditionBuilderComponent, ConditionInputOutlet, ConditionOperatorOutlet, Conjunction, CriteriaBuilderComponent, NOVO_CONDITION_BUILDER, NOVO_CRITERIA_BUILDER, NOVO_QUERY_BUILDER, NovoConditionFieldDef, NovoConditionInputDef, NovoConditionOperatorsDef, NovoDefaultAddressConditionDef, NovoDefaultBooleanConditionDef, NovoDefaultDateConditionDef, NovoDefaultDateTimeConditionDef, NovoDefaultIdConditionDef, NovoDefaultNumberConditionDef, NovoDefaultPickerConditionDef, NovoDefaultStringConditionDef, NovoQueryBuilderModule };
//# sourceMappingURL=novo-elements-elements-query-builder.mjs.map
