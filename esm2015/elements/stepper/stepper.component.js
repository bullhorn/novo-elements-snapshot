import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, forwardRef, Inject, Input, Optional, QueryList, ViewChildren, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NovoIconComponent } from '../icon/Icon';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { novoStepperAnimations } from './stepper.animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/stepper";
import * as i2 from "@angular/common";
import * as i3 from "./step-header.component";
import * as i4 from "@angular/cdk/bidi";
function NovoStep_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0);
} }
const _c0 = ["*"];
function NovoHorizontalStepper_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "novo-step-header", 6);
    i0.ɵɵlistener("click", function NovoHorizontalStepper_ng_container_2_Template_novo_step_header_click_1_listener() { const step_r2 = ctx.$implicit; return step_r2.select(); })("keydown", function NovoHorizontalStepper_ng_container_2_Template_novo_step_header_keydown_1_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6._onKeydown($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("tabIndex", ctx_r0._getFocusIndex() === i_r3 ? 0 : 0 - 1)("id", ctx_r0._getStepLabelId(i_r3))("index", i_r3)("theme", step_r2.theme)("color", step_r2.color)("icon", step_r2.icon)("state", ctx_r0.getIndicatorType(i_r3))("label", step_r2.stepLabel || step_r2.label)("selected", ctx_r0.selectedIndex === i_r3)("active", step_r2.completed || ctx_r0.selectedIndex === i_r3 || !ctx_r0.linear)("optional", step_r2.optional)("iconOverrides", ctx_r0._iconOverrides);
    i0.ɵɵattribute("aria-controls", ctx_r0._getStepContentId(i_r3))("aria-selected", ctx_r0.selectedIndex == i_r3);
} }
function NovoHorizontalStepper_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementContainer(1, 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r8 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@stepTransition", ctx_r1._getAnimationDirection(i_r9))("id", ctx_r1._getStepContentId(i_r9));
    i0.ɵɵattribute("aria-labelledby", ctx_r1._getStepLabelId(i_r9))("aria-expanded", ctx_r1.selectedIndex === i_r9);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", step_r8.content);
} }
function NovoVerticalStepper_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "novo-step-header", 2);
    i0.ɵɵlistener("click", function NovoVerticalStepper_div_0_Template_novo_step_header_click_1_listener() { const step_r1 = ctx.$implicit; return step_r1.select(); })("keydown", function NovoVerticalStepper_div_0_Template_novo_step_header_keydown_1_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5._onKeydown($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 3);
    i0.ɵɵelementStart(3, "div", 4);
    i0.ɵɵelementStart(4, "div", 5);
    i0.ɵɵelementContainer(5, 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const isLast_r3 = ctx.last;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("tabIndex", ctx_r0._getFocusIndex() == i_r2 ? 0 : 0 - 1)("id", ctx_r0._getStepLabelId(i_r2))("index", i_r2)("theme", step_r1.theme)("color", step_r1.color)("icon", step_r1.icon)("state", ctx_r0.getIndicatorType(i_r2))("label", step_r1.stepLabel || step_r1.label)("selected", ctx_r0.selectedIndex === i_r2)("active", step_r1.completed || ctx_r0.selectedIndex === i_r2 || !ctx_r0.linear)("optional", step_r1.optional)("iconOverrides", ctx_r0._iconOverrides);
    i0.ɵɵattribute("aria-controls", ctx_r0._getStepContentId(i_r2))("aria-selected", ctx_r0.selectedIndex === i_r2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("novo-stepper-vertical-line", !isLast_r3);
    i0.ɵɵproperty("ngClass", ctx_r0.getIndicatorType(i_r2));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("@stepTransition", ctx_r0._getAnimationDirection(i_r2))("id", ctx_r0._getStepContentId(i_r2));
    i0.ɵɵattribute("aria-labelledby", ctx_r0._getStepLabelId(i_r2))("aria-expanded", ctx_r0.selectedIndex === i_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", step_r1.content);
} }
const _c1 = "@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-stepper-horizontal[_ngcontent-%COMP%], .novo-stepper-vertical[_ngcontent-%COMP%]{display:block}.novo-horizontal-stepper-header-container[_ngcontent-%COMP%]{align-items:center;background:#f4f4f4;display:flex;justify-content:center;margin-bottom:1em;white-space:nowrap}.novo-stepper-horizontal-line[_ngcontent-%COMP%]{border-bottom:1px solid #bebebe;flex:auto;height:80px;min-width:0}.novo-stepper-horizontal-line.complete[_ngcontent-%COMP%]{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]{align-items:center;display:flex;flex-flow:column;height:80px;justify-content:center;overflow:visible;padding:0 24px}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]{align-items:center;bottom:0;display:flex;height:1px;justify-content:center;position:absolute;width:100%}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line[_ngcontent-%COMP%]{position:absolute;width:100%}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line[_ngcontent-%COMP%]:before{border-bottom:1px solid #bebebe;content:\"\";display:block;margin-right:8px;width:calc(50% - 8px)}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line[_ngcontent-%COMP%]:after{border-top:1px solid #bebebe;content:\"\";display:block;margin-left:calc(50% + 8px);margin-top:-1px;width:calc(50% - 8px)}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line.edit[_ngcontent-%COMP%]:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line.done[_ngcontent-%COMP%]:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line.done[_ngcontent-%COMP%]:after{border-top:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-icon[_ngcontent-%COMP%]{position:relative}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-icon[_ngcontent-%COMP%]:before{background:#fff;border-radius:50%;bottom:1px;content:\"\";display:block;left:1px;position:absolute;right:1px;top:1px;z-index:0}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-icon[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{position:relative;z-index:1}.novo-vertical-stepper-header[_ngcontent-%COMP%]{align-items:center;display:flex;max-height:24px;padding:24px}.novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon[_ngcontent-%COMP%], .novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon-not-touched[_ngcontent-%COMP%]{margin-right:12px}[dir=rtl][_ngcontent-%COMP%]   .novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon[_ngcontent-%COMP%], [dir=rtl][_ngcontent-%COMP%]   .novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon-not-touched[_ngcontent-%COMP%]{margin-left:12px;margin-right:0}.novo-horizontal-stepper-content[_ngcontent-%COMP%]{overflow:hidden}.novo-horizontal-stepper-content[aria-expanded=false][_ngcontent-%COMP%]{height:0}.novo-horizontal-content-container[_ngcontent-%COMP%]{overflow:hidden;padding:0 24px 24px}.novo-vertical-content-container[_ngcontent-%COMP%]{border:0;margin-left:36px;position:relative}[dir=rtl][_ngcontent-%COMP%]   .novo-vertical-content-container[_ngcontent-%COMP%]{margin-left:0;margin-right:36px}.novo-stepper-vertical-line[_ngcontent-%COMP%]:before{border-left:1px solid #bebebe;bottom:-16px;content:\"\";left:0;position:absolute;top:-16px;z-index:-1}[dir=rtl][_ngcontent-%COMP%]   .novo-stepper-vertical-line[_ngcontent-%COMP%]:before{left:auto;right:0}.novo-stepper-vertical-line.edit[_ngcontent-%COMP%]:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical-line.done[_ngcontent-%COMP%]:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical-line.done[_ngcontent-%COMP%]:after{border-left-color:1px solid #4a89dc}.novo-stepper-vertical[_ngcontent-%COMP%]   novo-step-status[_ngcontent-%COMP%]{left:35px;position:absolute;top:25px;transform:scale(.8)}.novo-vertical-stepper-content[_ngcontent-%COMP%]{overflow:hidden}.novo-vertical-content[_ngcontent-%COMP%]{padding:0 24px 24px}.novo-step[_ngcontent-%COMP%]:last-child   .novo-vertical-content-container[_ngcontent-%COMP%]{border:none}";
export class NovoStep extends CdkStep {
    constructor(stepper) {
        super(stepper);
    }
}
NovoStep.ɵfac = function NovoStep_Factory(t) { return new (t || NovoStep)(i0.ɵɵdirectiveInject(forwardRef(() => NovoStepper))); };
NovoStep.ɵcmp = i0.ɵɵdefineComponent({ type: NovoStep, selectors: [["novo-step"]], contentQueries: function NovoStep_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoStepLabel, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.stepLabel = _t.first);
    } }, inputs: { theme: "theme", color: "color", icon: "icon" }, features: [i0.ɵɵProvidersFeature([{ provide: CdkStep, useExisting: NovoStep }]), i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoStep_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, NovoStep_ng_template_0_Template, 1, 0, "ng-template");
    } }, encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoStep, [{
        type: Component,
        args: [{
                selector: 'novo-step',
                templateUrl: 'step.component.html',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: CdkStep, useExisting: NovoStep }],
            }]
    }], function () { return [{ type: i1.CdkStepper, decorators: [{
                type: Inject,
                args: [forwardRef(() => NovoStepper)]
            }] }]; }, { stepLabel: [{
            type: ContentChild,
            args: [NovoStepLabel]
        }], theme: [{
            type: Input
        }], color: [{
            type: Input
        }], icon: [{
            type: Input
        }] }); })();
export class NovoStepper extends CdkStepper {
    constructor() {
        super(...arguments);
        /** Consumer-specified template-refs to be used to override the header icons. */
        this._iconOverrides = {};
    }
    get completed() {
        try {
            const steps = this._steps.toArray();
            const length = steps.length - 1;
            return steps[length].completed && length === this.selectedIndex;
        }
        catch (err) {
            return false;
        }
    }
    ngAfterContentInit() {
        // Mark the component for change detection whenever the content children query changes
        this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
    }
    complete() {
        try {
            const steps = this._steps.toArray();
            steps[this.selectedIndex].completed = true;
            this.next();
            this._stateChanged();
        }
        catch (err) {
            // do nothing
        }
    }
    getIndicatorType(index) {
        const steps = this._steps.toArray();
        if (index === this.selectedIndex) {
            if (steps[index] && index === steps.length - 1 && steps[index].completed) {
                return 'done';
            }
            return 'edit';
        }
        if (index < this.selectedIndex) {
            return 'done';
        }
        return 'none';
    }
}
NovoStepper.ɵfac = function NovoStepper_Factory(t) { return ɵNovoStepper_BaseFactory(t || NovoStepper); };
NovoStepper.ɵdir = i0.ɵɵdefineDirective({ type: NovoStepper, selectors: [["", "novoStepper", ""]], contentQueries: function NovoStepper_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, NovoStep, false);
        i0.ɵɵcontentQuery(dirIndex, NovoIconComponent, false);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._steps = _t);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._icons = _t);
    } }, viewQuery: function NovoStepper_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(NovoStepHeader, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._stepHeader = _t);
    } }, features: [i0.ɵɵProvidersFeature([{ provide: CdkStepper, useExisting: NovoStepper }]), i0.ɵɵInheritDefinitionFeature] });
const ɵNovoStepper_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoStepper);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoStepper, [{
        type: Directive,
        args: [{
                selector: '[novoStepper]',
                providers: [{ provide: CdkStepper, useExisting: NovoStepper }],
            }]
    }], null, { _stepHeader: [{
            type: ViewChildren,
            args: [NovoStepHeader]
        }], _steps: [{
            type: ContentChildren,
            args: [NovoStep]
        }], _icons: [{
            type: ContentChildren,
            args: [NovoIconComponent]
        }] }); })();
export class NovoHorizontalStepper extends NovoStepper {
}
NovoHorizontalStepper.ɵfac = function NovoHorizontalStepper_Factory(t) { return ɵNovoHorizontalStepper_BaseFactory(t || NovoHorizontalStepper); };
NovoHorizontalStepper.ɵcmp = i0.ɵɵdefineComponent({ type: NovoHorizontalStepper, selectors: [["novo-horizontal-stepper"]], hostAttrs: ["aria-orientation", "horizontal", "role", "tablist", 1, "novo-stepper-horizontal"], exportAs: ["novoHorizontalStepper"], features: [i0.ɵɵProvidersFeature([
            { provide: NovoStepper, useExisting: NovoHorizontalStepper },
            { provide: CdkStepper, useExisting: NovoHorizontalStepper },
        ]), i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 4, consts: [[1, "novo-horizontal-stepper-header-container"], [1, "novo-stepper-horizontal-line", "complete"], [4, "ngFor", "ngForOf"], [1, "novo-stepper-horizontal-line"], [1, "novo-horizontal-content-container"], ["class", "novo-horizontal-stepper-content", "role", "tabpanel", 3, "id", 4, "ngFor", "ngForOf"], [1, "novo-horizontal-stepper-header", 3, "tabIndex", "id", "index", "theme", "color", "icon", "state", "label", "selected", "active", "optional", "iconOverrides", "click", "keydown"], ["role", "tabpanel", 1, "novo-horizontal-stepper-content", 3, "id"], [3, "ngTemplateOutlet"]], template: function NovoHorizontalStepper_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵtemplate(2, NovoHorizontalStepper_ng_container_2_Template, 2, 14, "ng-container", 2);
        i0.ɵɵelement(3, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 4);
        i0.ɵɵtemplate(5, NovoHorizontalStepper_div_5_Template, 2, 5, "div", 5);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx._steps);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("complete", ctx.completed);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx._steps);
    } }, directives: [i2.NgForOf, i3.NovoStepHeader, i2.NgTemplateOutlet], styles: [_c1], data: { animation: [novoStepperAnimations.horizontalStepTransition] }, changeDetection: 0 });
const ɵNovoHorizontalStepper_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoHorizontalStepper);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoHorizontalStepper, [{
        type: Component,
        args: [{
                selector: 'novo-horizontal-stepper',
                exportAs: 'novoHorizontalStepper',
                templateUrl: 'stepper-horizontal.html',
                styleUrls: ['stepper.component.scss'],
                host: {
                    class: 'novo-stepper-horizontal',
                    'aria-orientation': 'horizontal',
                    role: 'tablist',
                },
                animations: [novoStepperAnimations.horizontalStepTransition],
                providers: [
                    { provide: NovoStepper, useExisting: NovoHorizontalStepper },
                    { provide: CdkStepper, useExisting: NovoHorizontalStepper },
                ],
                // encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, null); })();
export class NovoVerticalStepper extends NovoStepper {
    constructor(dir, changeDetectorRef) {
        super(dir, changeDetectorRef);
        this._orientation = 'vertical';
    }
}
NovoVerticalStepper.ɵfac = function NovoVerticalStepper_Factory(t) { return new (t || NovoVerticalStepper)(i0.ɵɵdirectiveInject(i4.Directionality, 8), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
NovoVerticalStepper.ɵcmp = i0.ɵɵdefineComponent({ type: NovoVerticalStepper, selectors: [["novo-vertical-stepper"]], hostAttrs: ["aria-orientation", "vertical", "role", "tablist", 1, "novo-stepper-vertical"], exportAs: ["novoVerticalStepper"], features: [i0.ɵɵProvidersFeature([
            { provide: NovoStepper, useExisting: NovoVerticalStepper },
            { provide: CdkStepper, useExisting: NovoVerticalStepper },
        ]), i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "novo-step", 4, "ngFor", "ngForOf"], [1, "novo-step"], [1, "novo-vertical-stepper-header", 3, "tabIndex", "id", "index", "theme", "color", "icon", "state", "label", "selected", "active", "optional", "iconOverrides", "click", "keydown"], [1, "novo-vertical-content-container", 3, "ngClass"], ["role", "tabpanel", 1, "novo-vertical-stepper-content", 3, "id"], [1, "novo-vertical-content"], [3, "ngTemplateOutlet"]], template: function NovoVerticalStepper_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoVerticalStepper_div_0_Template, 6, 22, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx._steps);
    } }, directives: [i2.NgForOf, i3.NovoStepHeader, i2.NgClass, i2.NgTemplateOutlet], styles: [_c1], data: { animation: [novoStepperAnimations.verticalStepTransition] }, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoVerticalStepper, [{
        type: Component,
        args: [{
                selector: 'novo-vertical-stepper',
                exportAs: 'novoVerticalStepper',
                templateUrl: 'stepper-vertical.html',
                styleUrls: ['stepper.component.scss'],
                host: {
                    class: 'novo-stepper-vertical',
                    'aria-orientation': 'vertical',
                    role: 'tablist',
                },
                animations: [novoStepperAnimations.verticalStepTransition],
                providers: [
                    { provide: NovoStepper, useExisting: NovoVerticalStepper },
                    { provide: CdkStepper, useExisting: NovoVerticalStepper },
                ],
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i4.Directionality, decorators: [{
                type: Optional
            }] }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvc3RlcHBlci9zdGVwcGVyLmNvbXBvbmVudC50cyIsImVsZW1lbnRzL3N0ZXBwZXIvc3RlcC5jb21wb25lbnQuaHRtbCIsImVsZW1lbnRzL3N0ZXBwZXIvc3RlcHBlci1ob3Jpem9udGFsLmh0bWwiLCJlbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXItdmVydGljYWwuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFFVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7O0lDdkJoRCxrQkFBWTs7Ozs7SUNFdkIsNkJBQ0U7SUFBQSwyQ0FpQm1CO0lBaEJGLDBKQUFTLGdCQUFhLElBQUMsK01BQUE7SUFnQnhDLGlCQUFtQjtJQUNyQiwwQkFB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eyBGb2N1c2FibGVPcHRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IENka1N0ZXAsIENka1N0ZXBwZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc3RlcHBlcic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvSWNvbkNvbXBvbmVudCB9IGZyb20gJy4uL2ljb24vSWNvbic7XG5pbXBvcnQgeyBOb3ZvU3RlcEhlYWRlciB9IGZyb20gJy4vc3RlcC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9TdGVwTGFiZWwgfSBmcm9tICcuL3N0ZXAtbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IG5vdm9TdGVwcGVyQW5pbWF0aW9ucyB9IGZyb20gJy4vc3RlcHBlci5hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zdGVwJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwLmNvbXBvbmVudC5odG1sJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1N0ZXAsIHVzZUV4aXN0aW5nOiBOb3ZvU3RlcCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1N0ZXAgZXh0ZW5kcyBDZGtTdGVwIHtcbiAgLyoqIENvbnRlbnQgZm9yIHN0ZXAgbGFiZWwgZ2l2ZW4gYnkgYDxuZy10ZW1wbGF0ZSBub3ZvU3RlcExhYmVsPmAuICovXG4gIEBDb250ZW50Q2hpbGQoTm92b1N0ZXBMYWJlbClcbiAgc3RlcExhYmVsOiBOb3ZvU3RlcExhYmVsO1xuXG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTm92b1N0ZXBwZXIpKSBzdGVwcGVyOiBDZGtTdGVwcGVyKSB7XG4gICAgc3VwZXIoc3RlcHBlcik7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9TdGVwcGVyXScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9TdGVwcGVyIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcHBlciBleHRlbmRzIENka1N0ZXBwZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyoqIFRoZSBsaXN0IG9mIHN0ZXAgaGVhZGVycyBvZiB0aGUgc3RlcHMgaW4gdGhlIHN0ZXBwZXIuICovXG4gIEBWaWV3Q2hpbGRyZW4oTm92b1N0ZXBIZWFkZXIpXG4gIF9zdGVwSGVhZGVyOiBRdWVyeUxpc3Q8Rm9jdXNhYmxlT3B0aW9uPjtcblxuICAvKiogU3RlcHMgdGhhdCB0aGUgc3RlcHBlciBob2xkcy4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvU3RlcClcbiAgX3N0ZXBzOiBRdWVyeUxpc3Q8Tm92b1N0ZXA+O1xuXG4gIC8qKiBDdXN0b20gaWNvbiBvdmVycmlkZXMgcGFzc2VkIGluIGJ5IHRoZSBjb25zdW1lci4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvSWNvbkNvbXBvbmVudClcbiAgX2ljb25zOiBRdWVyeUxpc3Q8Tm92b0ljb25Db21wb25lbnQ+O1xuXG4gIC8qKiBDb25zdW1lci1zcGVjaWZpZWQgdGVtcGxhdGUtcmVmcyB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBoZWFkZXIgaWNvbnMuICovXG4gIF9pY29uT3ZlcnJpZGVzOiB7IFtrZXk6IHN0cmluZ106IFRlbXBsYXRlUmVmPGFueT4gfSA9IHt9O1xuXG4gIGdldCBjb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5fc3RlcHMudG9BcnJheSgpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gc3RlcHMubGVuZ3RoIC0gMTtcbiAgICAgIHJldHVybiBzdGVwc1tsZW5ndGhdLmNvbXBsZXRlZCAmJiBsZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgLy8gTWFyayB0aGUgY29tcG9uZW50IGZvciBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW5ldmVyIHRoZSBjb250ZW50IGNoaWxkcmVuIHF1ZXJ5IGNoYW5nZXNcbiAgICB0aGlzLl9zdGVwcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9zdGF0ZUNoYW5nZWQoKSk7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLl9zdGVwcy50b0FycmF5KCk7XG4gICAgICBzdGVwc1t0aGlzLnNlbGVjdGVkSW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuXG4gIGdldEluZGljYXRvclR5cGUoaW5kZXg6IG51bWJlcik6ICdub25lJyB8ICcnIHwgJ2VkaXQnIHwgJ2RvbmUnIHtcbiAgICBjb25zdCBzdGVwcyA9IHRoaXMuX3N0ZXBzLnRvQXJyYXkoKTtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgaWYgKHN0ZXBzW2luZGV4XSAmJiBpbmRleCA9PT0gc3RlcHMubGVuZ3RoIC0gMSAmJiBzdGVwc1tpbmRleF0uY29tcGxldGVkKSB7XG4gICAgICAgIHJldHVybiAnZG9uZSc7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ2VkaXQnO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgIHJldHVybiAnZG9uZSc7XG4gICAgfVxuICAgIHJldHVybiAnbm9uZSc7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ob3Jpem9udGFsLXN0ZXBwZXInLFxuICBleHBvcnRBczogJ25vdm9Ib3Jpem9udGFsU3RlcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcHBlci1ob3Jpem9udGFsLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc3RlcHBlci5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXN0ZXBwZXItaG9yaXpvbnRhbCcsXG4gICAgJ2FyaWEtb3JpZW50YXRpb24nOiAnaG9yaXpvbnRhbCcsXG4gICAgcm9sZTogJ3RhYmxpc3QnLFxuICB9LFxuICBhbmltYXRpb25zOiBbbm92b1N0ZXBwZXJBbmltYXRpb25zLmhvcml6b250YWxTdGVwVHJhbnNpdGlvbl0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTm92b1N0ZXBwZXIsIHVzZUV4aXN0aW5nOiBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIgfSxcbiAgICB7IHByb3ZpZGU6IENka1N0ZXBwZXIsIHVzZUV4aXN0aW5nOiBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIgfSxcbiAgXSxcbiAgLy8gZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIgZXh0ZW5kcyBOb3ZvU3RlcHBlciB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXZlcnRpY2FsLXN0ZXBwZXInLFxuICBleHBvcnRBczogJ25vdm9WZXJ0aWNhbFN0ZXBwZXInLFxuICB0ZW1wbGF0ZVVybDogJ3N0ZXBwZXItdmVydGljYWwuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdGVwcGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc3RlcHBlci12ZXJ0aWNhbCcsXG4gICAgJ2FyaWEtb3JpZW50YXRpb24nOiAndmVydGljYWwnLFxuICAgIHJvbGU6ICd0YWJsaXN0JyxcbiAgfSxcbiAgYW5pbWF0aW9uczogW25vdm9TdGVwcGVyQW5pbWF0aW9ucy52ZXJ0aWNhbFN0ZXBUcmFuc2l0aW9uXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOb3ZvU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9WZXJ0aWNhbFN0ZXBwZXIgfSxcbiAgICB7IHByb3ZpZGU6IENka1N0ZXBwZXIsIHVzZUV4aXN0aW5nOiBOb3ZvVmVydGljYWxTdGVwcGVyIH0sXG4gIF0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1ZlcnRpY2FsU3RlcHBlciBleHRlbmRzIE5vdm9TdGVwcGVyIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSwgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgc3VwZXIoZGlyLCBjaGFuZ2VEZXRlY3RvclJlZik7XG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG4iLCI8ZGl2IGNsYXNzPVwibm92by1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXN0ZXBwZXItaG9yaXpvbnRhbC1saW5lIGNvbXBsZXRlXCI+PC9kaXY+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHN0ZXAgb2YgX3N0ZXBzOyBsZXQgaSA9IGluZGV4OyBsZXQgaXNMYXN0ID0gbGFzdFwiPlxuICAgIDxub3ZvLXN0ZXAtaGVhZGVyICBjbGFzcz1cIm5vdm8taG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic3RlcC5zZWxlY3QoKVwiXG4gICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJfb25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgW3RhYkluZGV4XT1cIl9nZXRGb2N1c0luZGV4KCkgPT09IGkgPyAwIDogLTFcIlxuICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIl9nZXRTdGVwTGFiZWxJZChpKVwiXG4gICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIl9nZXRTdGVwQ29udGVudElkKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PSBpXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgICAgICAgIFt0aGVtZV09XCJzdGVwLnRoZW1lXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJzdGVwLmNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpY29uXT1cInN0ZXAuaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SW5kaWNhdG9yVHlwZShpKVwiXG4gICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwic3RlcC5zdGVwTGFiZWwgfHwgc3RlcC5sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgICAgICAgICAgICAgICAgICBbYWN0aXZlXT1cInN0ZXAuY29tcGxldGVkIHx8IHNlbGVjdGVkSW5kZXggPT09IGkgfHwgIWxpbmVhclwiXG4gICAgICAgICAgICAgICAgICAgICBbb3B0aW9uYWxdPVwic3RlcC5vcHRpb25hbFwiXG4gICAgICAgICAgICAgICAgICAgICBbaWNvbk92ZXJyaWRlc109XCJfaWNvbk92ZXJyaWRlc1wiPlxuICAgIDwvbm92by1zdGVwLWhlYWRlcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxkaXYgY2xhc3M9XCJub3ZvLXN0ZXBwZXItaG9yaXpvbnRhbC1saW5lXCIgW2NsYXNzLmNvbXBsZXRlXT1cImNvbXBsZXRlZFwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJub3ZvLWhvcml6b250YWwtY29udGVudC1jb250YWluZXJcIj5cbiAgPGRpdiAqbmdGb3I9XCJsZXQgc3RlcCBvZiBfc3RlcHM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgIGNsYXNzPVwibm92by1ob3Jpem9udGFsLXN0ZXBwZXItY29udGVudFwiIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgW0BzdGVwVHJhbnNpdGlvbl09XCJfZ2V0QW5pbWF0aW9uRGlyZWN0aW9uKGkpXCJcbiAgICAgICBbaWRdPVwiX2dldFN0ZXBDb250ZW50SWQoaSlcIlxuICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJfZ2V0U3RlcExhYmVsSWQoaSlcIlxuICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RlcC5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuPC9kaXY+XG4iLCI8ZGl2IGNsYXNzPVwibm92by1zdGVwXCIgKm5nRm9yPVwibGV0IHN0ZXAgb2YgX3N0ZXBzOyBsZXQgaSA9IGluZGV4OyBsZXQgaXNMYXN0ID0gbGFzdFwiPlxuICAgIDxub3ZvLXN0ZXAtaGVhZGVyICBjbGFzcz1cIm5vdm8tdmVydGljYWwtc3RlcHBlci1oZWFkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInN0ZXAuc2VsZWN0KClcIlxuICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwiX29uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgIFt0YWJJbmRleF09XCJfZ2V0Rm9jdXNJbmRleCgpID09IGkgPyAwIDogLTFcIlxuICAgICAgICAgICAgICAgICAgICAgW2lkXT1cIl9nZXRTdGVwTGFiZWxJZChpKVwiXG4gICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIl9nZXRTdGVwQ29udGVudElkKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgICAgICAgICAgICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgICAgICAgICAgICAgICBbdGhlbWVdPVwic3RlcC50aGVtZVwiXG4gICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwic3RlcC5jb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICBbaWNvbl09XCJzdGVwLmljb25cIlxuICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cImdldEluZGljYXRvclR5cGUoaSlcIlxuICAgICAgICAgICAgICAgICAgICAgW2xhYmVsXT1cInN0ZXAuc3RlcExhYmVsIHx8IHN0ZXAubGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkSW5kZXggPT09IGlcIlxuICAgICAgICAgICAgICAgICAgICAgW2FjdGl2ZV09XCJzdGVwLmNvbXBsZXRlZCB8fCBzZWxlY3RlZEluZGV4ID09PSBpIHx8ICFsaW5lYXJcIlxuICAgICAgICAgICAgICAgICAgICAgW29wdGlvbmFsXT1cInN0ZXAub3B0aW9uYWxcIlxuICAgICAgICAgICAgICAgICAgICAgW2ljb25PdmVycmlkZXNdPVwiX2ljb25PdmVycmlkZXNcIj5cbiAgICA8L25vdm8tc3RlcC1oZWFkZXI+XG5cbiAgICA8ZGl2IGNsYXNzPVwibm92by12ZXJ0aWNhbC1jb250ZW50LWNvbnRhaW5lclwiIFtjbGFzcy5ub3ZvLXN0ZXBwZXItdmVydGljYWwtbGluZV09XCIhaXNMYXN0XCIgW25nQ2xhc3NdPVwiZ2V0SW5kaWNhdG9yVHlwZShpKVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tdmVydGljYWwtc3RlcHBlci1jb250ZW50XCIgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICAgW0BzdGVwVHJhbnNpdGlvbl09XCJfZ2V0QW5pbWF0aW9uRGlyZWN0aW9uKGkpXCJcbiAgICAgICAgICAgW2lkXT1cIl9nZXRTdGVwQ29udGVudElkKGkpXCJcbiAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIl9nZXRTdGVwTGFiZWxJZChpKVwiXG4gICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibm92by12ZXJ0aWNhbC1jb250ZW50XCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4iXX0=