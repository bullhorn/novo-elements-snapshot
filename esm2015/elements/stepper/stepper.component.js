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
const _c1 = "@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-stepper-horizontal[_ngcontent-%COMP%], .novo-stepper-vertical[_ngcontent-%COMP%]{display:block}.novo-horizontal-stepper-header-container[_ngcontent-%COMP%]{align-items:center;background:#f4f4f4;display:flex;justify-content:center;margin-bottom:1em;white-space:nowrap}.novo-stepper-horizontal-line[_ngcontent-%COMP%]{border-bottom:1px solid #d9dadc;flex:auto;height:80px;min-width:0}.novo-stepper-horizontal-line.complete[_ngcontent-%COMP%]{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]{align-items:center;display:flex;flex-flow:column;height:80px;justify-content:center;overflow:visible;padding:0 24px}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]{align-items:center;bottom:0;display:flex;height:1px;justify-content:center;position:absolute;width:100%}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line[_ngcontent-%COMP%]{position:absolute;width:100%}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line[_ngcontent-%COMP%]:before{border-bottom:1px solid #d9dadc;content:\"\";display:block;margin-right:8px;width:calc(50% - 8px)}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line[_ngcontent-%COMP%]:after{border-top:1px solid #d9dadc;content:\"\";display:block;margin-left:calc(50% + 8px);margin-top:-1px;width:calc(50% - 8px)}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line.done[_ngcontent-%COMP%]:before, .novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line.edit[_ngcontent-%COMP%]:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-line.done[_ngcontent-%COMP%]:after{border-top:1px solid #4a89dc}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-icon[_ngcontent-%COMP%]{position:relative}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-icon[_ngcontent-%COMP%]:before{background:#fff;border-radius:50%;bottom:1px;content:\"\";display:block;left:1px;position:absolute;right:1px;top:1px;z-index:0}.novo-horizontal-stepper-header[_ngcontent-%COMP%]   .novo-step-status[_ngcontent-%COMP%]   .novo-stepper-status-icon[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{position:relative;z-index:1}.novo-vertical-stepper-header[_ngcontent-%COMP%]{align-items:center;display:flex;max-height:24px;padding:24px}.novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon[_ngcontent-%COMP%], .novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon-not-touched[_ngcontent-%COMP%]{margin-right:12px}[dir=rtl][_ngcontent-%COMP%]   .novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon[_ngcontent-%COMP%], [dir=rtl][_ngcontent-%COMP%]   .novo-vertical-stepper-header[_ngcontent-%COMP%]   .novo-step-icon-not-touched[_ngcontent-%COMP%]{margin-left:12px;margin-right:0}.novo-horizontal-stepper-content[_ngcontent-%COMP%]{overflow:hidden}.novo-horizontal-stepper-content[aria-expanded=false][_ngcontent-%COMP%]{height:0}.novo-horizontal-content-container[_ngcontent-%COMP%]{overflow:hidden;padding:0 24px 24px}.novo-vertical-content-container[_ngcontent-%COMP%]{border:0;margin-left:36px;position:relative}[dir=rtl][_ngcontent-%COMP%]   .novo-vertical-content-container[_ngcontent-%COMP%]{margin-left:0;margin-right:36px}.novo-stepper-vertical-line[_ngcontent-%COMP%]:before{border-left:1px solid #d9dadc;bottom:-16px;content:\"\";left:0;position:absolute;top:-16px;z-index:-1}[dir=rtl][_ngcontent-%COMP%]   .novo-stepper-vertical-line[_ngcontent-%COMP%]:before{left:auto;right:0}.novo-stepper-vertical-line.done[_ngcontent-%COMP%]:after, .novo-stepper-vertical-line.done[_ngcontent-%COMP%]:before, .novo-stepper-vertical-line.edit[_ngcontent-%COMP%]:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical[_ngcontent-%COMP%]   novo-step-status[_ngcontent-%COMP%]{left:35px;position:absolute;top:25px;transform:scale(.8)}.novo-vertical-stepper-content[_ngcontent-%COMP%]{overflow:hidden}.novo-vertical-content[_ngcontent-%COMP%]{padding:0 24px 24px}.novo-step[_ngcontent-%COMP%]:last-child   .novo-vertical-content-container[_ngcontent-%COMP%]{border:none}";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdHJhdmlzL2J1aWxkL2J1bGxob3JuL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50LnRzIiwiZWxlbWVudHMvc3RlcHBlci9zdGVwLmNvbXBvbmVudC5odG1sIiwiZWxlbWVudHMvc3RlcHBlci9zdGVwcGVyLWhvcml6b250YWwuaHRtbCIsImVsZW1lbnRzL3N0ZXBwZXIvc3RlcHBlci12ZXJ0aWNhbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUVULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7SUN2QmhELGtCQUFZOzs7OztJQ0V2Qiw2QkFDRTtJQUFBLDJDQWlCbUI7SUFoQkYsMEpBQVMsZ0JBQWEsSUFBQywrTUFBQTtJQWdCeEMsaUJBQW1CO0lBQ3JCLDBCQUFlOzs7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Y3VzYWJsZU9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQ2RrU3RlcCwgQ2RrU3RlcHBlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9JY29uQ29tcG9uZW50IH0gZnJvbSAnLi4vaWNvbi9JY29uJztcbmltcG9ydCB7IE5vdm9TdGVwSGVhZGVyIH0gZnJvbSAnLi9zdGVwLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b1N0ZXBMYWJlbCB9IGZyb20gJy4vc3RlcC1sYWJlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgbm92b1N0ZXBwZXJBbmltYXRpb25zIH0gZnJvbSAnLi9zdGVwcGVyLmFuaW1hdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXN0ZXAnLFxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAuY29tcG9uZW50Lmh0bWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrU3RlcCwgdXNlRXhpc3Rpbmc6IE5vdm9TdGVwIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcCBleHRlbmRzIENka1N0ZXAge1xuICAvKiogQ29udGVudCBmb3Igc3RlcCBsYWJlbCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIG5vdm9TdGVwTGFiZWw+YC4gKi9cbiAgQENvbnRlbnRDaGlsZChOb3ZvU3RlcExhYmVsKVxuICBzdGVwTGFiZWw6IE5vdm9TdGVwTGFiZWw7XG5cbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgaWNvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOb3ZvU3RlcHBlcikpIHN0ZXBwZXI6IENka1N0ZXBwZXIpIHtcbiAgICBzdXBlcihzdGVwcGVyKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b1N0ZXBwZXJdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtTdGVwcGVyLCB1c2VFeGlzdGluZzogTm92b1N0ZXBwZXIgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwcGVyIGV4dGVuZHMgQ2RrU3RlcHBlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKiogVGhlIGxpc3Qgb2Ygc3RlcCBoZWFkZXJzIG9mIHRoZSBzdGVwcyBpbiB0aGUgc3RlcHBlci4gKi9cbiAgQFZpZXdDaGlsZHJlbihOb3ZvU3RlcEhlYWRlcilcbiAgX3N0ZXBIZWFkZXI6IFF1ZXJ5TGlzdDxGb2N1c2FibGVPcHRpb24+O1xuXG4gIC8qKiBTdGVwcyB0aGF0IHRoZSBzdGVwcGVyIGhvbGRzLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9TdGVwKVxuICBfc3RlcHM6IFF1ZXJ5TGlzdDxOb3ZvU3RlcD47XG5cbiAgLyoqIEN1c3RvbSBpY29uIG92ZXJyaWRlcyBwYXNzZWQgaW4gYnkgdGhlIGNvbnN1bWVyLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9JY29uQ29tcG9uZW50KVxuICBfaWNvbnM6IFF1ZXJ5TGlzdDxOb3ZvSWNvbkNvbXBvbmVudD47XG5cbiAgLyoqIENvbnN1bWVyLXNwZWNpZmllZCB0ZW1wbGF0ZS1yZWZzIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGhlYWRlciBpY29ucy4gKi9cbiAgX2ljb25PdmVycmlkZXM6IHsgW2tleTogc3RyaW5nXTogVGVtcGxhdGVSZWY8YW55PiB9ID0ge307XG5cbiAgZ2V0IGNvbXBsZXRlZCgpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLl9zdGVwcy50b0FycmF5KCk7XG4gICAgICBjb25zdCBsZW5ndGggPSBzdGVwcy5sZW5ndGggLSAxO1xuICAgICAgcmV0dXJuIHN0ZXBzW2xlbmd0aF0uY29tcGxldGVkICYmIGxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBNYXJrIHRoZSBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb24gd2hlbmV2ZXIgdGhlIGNvbnRlbnQgY2hpbGRyZW4gcXVlcnkgY2hhbmdlc1xuICAgIHRoaXMuX3N0ZXBzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3N0YXRlQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdGVwcyA9IHRoaXMuX3N0ZXBzLnRvQXJyYXkoKTtcbiAgICAgIHN0ZXBzW3RoaXMuc2VsZWN0ZWRJbmRleF0uY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG5cbiAgZ2V0SW5kaWNhdG9yVHlwZShpbmRleDogbnVtYmVyKTogJ25vbmUnIHwgJycgfCAnZWRpdCcgfCAnZG9uZScge1xuICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5fc3RlcHMudG9BcnJheSgpO1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICBpZiAoc3RlcHNbaW5kZXhdICYmIGluZGV4ID09PSBzdGVwcy5sZW5ndGggLSAxICYmIHN0ZXBzW2luZGV4XS5jb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuICdkb25lJztcbiAgICAgIH1cbiAgICAgIHJldHVybiAnZWRpdCc7XG4gICAgfVxuICAgIGlmIChpbmRleCA8IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgcmV0dXJuICdkb25lJztcbiAgICB9XG4gICAgcmV0dXJuICdub25lJztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWhvcml6b250YWwtc3RlcHBlcicsXG4gIGV4cG9ydEFzOiAnbm92b0hvcml6b250YWxTdGVwcGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwcGVyLWhvcml6b250YWwuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdGVwcGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc3RlcHBlci1ob3Jpem9udGFsJyxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6ICdob3Jpem9udGFsJyxcbiAgICByb2xlOiAndGFibGlzdCcsXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtub3ZvU3RlcHBlckFuaW1hdGlvbnMuaG9yaXpvbnRhbFN0ZXBUcmFuc2l0aW9uXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOb3ZvU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9Ib3Jpem9udGFsU3RlcHBlciB9LFxuICAgIHsgcHJvdmlkZTogQ2RrU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9Ib3Jpem9udGFsU3RlcHBlciB9LFxuICBdLFxuICAvLyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ib3Jpem9udGFsU3RlcHBlciBleHRlbmRzIE5vdm9TdGVwcGVyIHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdmVydGljYWwtc3RlcHBlcicsXG4gIGV4cG9ydEFzOiAnbm92b1ZlcnRpY2FsU3RlcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcHBlci12ZXJ0aWNhbC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3N0ZXBwZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1zdGVwcGVyLXZlcnRpY2FsJyxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6ICd2ZXJ0aWNhbCcsXG4gICAgcm9sZTogJ3RhYmxpc3QnLFxuICB9LFxuICBhbmltYXRpb25zOiBbbm92b1N0ZXBwZXJBbmltYXRpb25zLnZlcnRpY2FsU3RlcFRyYW5zaXRpb25dLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5vdm9TdGVwcGVyLCB1c2VFeGlzdGluZzogTm92b1ZlcnRpY2FsU3RlcHBlciB9LFxuICAgIHsgcHJvdmlkZTogQ2RrU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9WZXJ0aWNhbFN0ZXBwZXIgfSxcbiAgXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVmVydGljYWxTdGVwcGVyIGV4dGVuZHMgTm92b1N0ZXBwZXIge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihkaXIsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cbiIsIjxkaXYgY2xhc3M9XCJub3ZvLWhvcml6b250YWwtc3RlcHBlci1oZWFkZXItY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tc3RlcHBlci1ob3Jpem9udGFsLWxpbmUgY29tcGxldGVcIj48L2Rpdj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc3RlcCBvZiBfc3RlcHM7IGxldCBpID0gaW5kZXg7IGxldCBpc0xhc3QgPSBsYXN0XCI+XG4gICAgPG5vdm8tc3RlcC1oZWFkZXIgIGNsYXNzPVwibm92by1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzdGVwLnNlbGVjdCgpXCJcbiAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIl9vbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICBbdGFiSW5kZXhdPVwiX2dldEZvY3VzSW5kZXgoKSA9PT0gaSA/IDAgOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgICBbaWRdPVwiX2dldFN0ZXBMYWJlbElkKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiX2dldFN0ZXBDb250ZW50SWQoaSlcIlxuICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzZWxlY3RlZEluZGV4ID09IGlcIlxuICAgICAgICAgICAgICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgICAgICAgICAgICAgW3RoZW1lXT1cInN0ZXAudGhlbWVcIlxuICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cInN0ZXAuY29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgW2ljb25dPVwic3RlcC5pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJnZXRJbmRpY2F0b3JUeXBlKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJzdGVwLnN0ZXBMYWJlbCB8fCBzdGVwLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZEluZGV4ID09PSBpXCJcbiAgICAgICAgICAgICAgICAgICAgIFthY3RpdmVdPVwic3RlcC5jb21wbGV0ZWQgfHwgc2VsZWN0ZWRJbmRleCA9PT0gaSB8fCAhbGluZWFyXCJcbiAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25hbF09XCJzdGVwLm9wdGlvbmFsXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpY29uT3ZlcnJpZGVzXT1cIl9pY29uT3ZlcnJpZGVzXCI+XG4gICAgPC9ub3ZvLXN0ZXAtaGVhZGVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGRpdiBjbGFzcz1cIm5vdm8tc3RlcHBlci1ob3Jpem9udGFsLWxpbmVcIiBbY2xhc3MuY29tcGxldGVdPVwiY29tcGxldGVkXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm5vdm8taG9yaXpvbnRhbC1jb250ZW50LWNvbnRhaW5lclwiPlxuICA8ZGl2ICpuZ0Zvcj1cImxldCBzdGVwIG9mIF9zdGVwczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgY2xhc3M9XCJub3ZvLWhvcml6b250YWwtc3RlcHBlci1jb250ZW50XCIgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICBbQHN0ZXBUcmFuc2l0aW9uXT1cIl9nZXRBbmltYXRpb25EaXJlY3Rpb24oaSlcIlxuICAgICAgIFtpZF09XCJfZ2V0U3RlcENvbnRlbnRJZChpKVwiXG4gICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIl9nZXRTdGVwTGFiZWxJZChpKVwiXG4gICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJzZWxlY3RlZEluZGV4ID09PSBpXCI+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbiIsIjxkaXYgY2xhc3M9XCJub3ZvLXN0ZXBcIiAqbmdGb3I9XCJsZXQgc3RlcCBvZiBfc3RlcHM7IGxldCBpID0gaW5kZXg7IGxldCBpc0xhc3QgPSBsYXN0XCI+XG4gICAgPG5vdm8tc3RlcC1oZWFkZXIgIGNsYXNzPVwibm92by12ZXJ0aWNhbC1zdGVwcGVyLWhlYWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic3RlcC5zZWxlY3QoKVwiXG4gICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJfb25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgW3RhYkluZGV4XT1cIl9nZXRGb2N1c0luZGV4KCkgPT0gaSA/IDAgOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgICBbaWRdPVwiX2dldFN0ZXBMYWJlbElkKGkpXCJcbiAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiX2dldFN0ZXBDb250ZW50SWQoaSlcIlxuICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzZWxlY3RlZEluZGV4ID09PSBpXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgICAgICAgIFt0aGVtZV09XCJzdGVwLnRoZW1lXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJzdGVwLmNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgIFtpY29uXT1cInN0ZXAuaWNvblwiXG4gICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SW5kaWNhdG9yVHlwZShpKVwiXG4gICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwic3RlcC5zdGVwTGFiZWwgfHwgc3RlcC5sYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRJbmRleCA9PT0gaVwiXG4gICAgICAgICAgICAgICAgICAgICBbYWN0aXZlXT1cInN0ZXAuY29tcGxldGVkIHx8IHNlbGVjdGVkSW5kZXggPT09IGkgfHwgIWxpbmVhclwiXG4gICAgICAgICAgICAgICAgICAgICBbb3B0aW9uYWxdPVwic3RlcC5vcHRpb25hbFwiXG4gICAgICAgICAgICAgICAgICAgICBbaWNvbk92ZXJyaWRlc109XCJfaWNvbk92ZXJyaWRlc1wiPlxuICAgIDwvbm92by1zdGVwLWhlYWRlcj5cblxuICAgIDxkaXYgY2xhc3M9XCJub3ZvLXZlcnRpY2FsLWNvbnRlbnQtY29udGFpbmVyXCIgW2NsYXNzLm5vdm8tc3RlcHBlci12ZXJ0aWNhbC1saW5lXT1cIiFpc0xhc3RcIiBbbmdDbGFzc109XCJnZXRJbmRpY2F0b3JUeXBlKGkpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibm92by12ZXJ0aWNhbC1zdGVwcGVyLWNvbnRlbnRcIiByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgICBbQHN0ZXBUcmFuc2l0aW9uXT1cIl9nZXRBbmltYXRpb25EaXJlY3Rpb24oaSlcIlxuICAgICAgICAgICBbaWRdPVwiX2dldFN0ZXBDb250ZW50SWQoaSlcIlxuICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiX2dldFN0ZXBMYWJlbElkKGkpXCJcbiAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJzZWxlY3RlZEluZGV4ID09PSBpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXZlcnRpY2FsLWNvbnRlbnRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInN0ZXAuY29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiJdfQ==