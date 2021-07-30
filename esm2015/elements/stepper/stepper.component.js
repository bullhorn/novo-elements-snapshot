import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, forwardRef, Inject, Input, Optional, QueryList, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NovoIconComponent } from '../icon/Icon';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { novoStepperAnimations } from './stepper.animations';
export const _NovoStep = CdkStep;
export const _NovoStepper = CdkStepper;
export class NovoStep extends CdkStep {
    constructor(stepper) {
        super(stepper);
    }
}
NovoStep.decorators = [
    { type: Component, args: [{
                selector: 'novo-step',
                template: "<ng-template><ng-content></ng-content></ng-template>\r\n",
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoStep.ctorParameters = () => [
    { type: CdkStepper, decorators: [{ type: Inject, args: [forwardRef(() => NovoStepper),] }] }
];
NovoStep.propDecorators = {
    stepLabel: [{ type: ContentChild, args: [NovoStepLabel,] }],
    theme: [{ type: Input }],
    color: [{ type: Input }],
    icon: [{ type: Input }]
};
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
NovoStepper.decorators = [
    { type: Directive, args: [{
                selector: '[novoStepper]',
            },] }
];
NovoStepper.propDecorators = {
    _stepHeader: [{ type: ViewChildren, args: [NovoStepHeader,] }],
    _steps: [{ type: ContentChildren, args: [NovoStep,] }],
    _icons: [{ type: ContentChildren, args: [NovoIconComponent,] }]
};
export class NovoHorizontalStepper extends NovoStepper {
}
NovoHorizontalStepper.decorators = [
    { type: Component, args: [{
                selector: 'novo-horizontal-stepper',
                template: "<div class=\"novo-horizontal-stepper-header-container\">\r\n    <div class=\"novo-stepper-horizontal-line complete\"></div>\r\n  <ng-container *ngFor=\"let step of _steps; let i = index; let isLast = last\">\r\n    <novo-step-header  class=\"novo-horizontal-stepper-header\"\r\n                     (click)=\"step.select()\"\r\n                     (keydown)=\"_onKeydown($event)\"\r\n                     [tabIndex]=\"_getFocusIndex() === i ? 0 : -1\"\r\n                     [id]=\"_getStepLabelId(i)\"\r\n                     [attr.aria-controls]=\"_getStepContentId(i)\"\r\n                     [attr.aria-selected]=\"selectedIndex == i\"\r\n                     [index]=\"i\"\r\n                     [theme]=\"step.theme\"\r\n                     [color]=\"step.color\"\r\n                     [icon]=\"step.icon\"\r\n                     [state]=\"getIndicatorType(i)\"\r\n                     [label]=\"step.stepLabel || step.label\"\r\n                     [selected]=\"selectedIndex === i\"\r\n                     [active]=\"step.completed || selectedIndex === i || !linear\"\r\n                     [optional]=\"step.optional\"\r\n                     [iconOverrides]=\"_iconOverrides\">\r\n    </novo-step-header>\r\n  </ng-container>\r\n  <div class=\"novo-stepper-horizontal-line\" [class.complete]=\"completed\"></div>\r\n</div>\r\n\r\n<div class=\"novo-horizontal-content-container\">\r\n  <div *ngFor=\"let step of _steps; let i = index\"\r\n       class=\"novo-horizontal-stepper-content\" role=\"tabpanel\"\r\n       [@stepTransition]=\"_getAnimationDirection(i)\"\r\n       [id]=\"_getStepContentId(i)\"\r\n       [attr.aria-labelledby]=\"_getStepLabelId(i)\"\r\n       [attr.aria-expanded]=\"selectedIndex === i\">\r\n    <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\r\n  </div>\r\n</div>\r\n",
                host: {
                    class: 'novo-stepper-horizontal',
                    'aria-orientation': 'horizontal',
                    role: 'tablist',
                },
                animations: [novoStepperAnimations.horizontalStepTransition],
                providers: [{ provide: NovoStepper, useExisting: NovoHorizontalStepper }],
                // encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-stepper-horizontal,.novo-stepper-vertical{display:block}.novo-horizontal-stepper-header-container{align-items:center;background:#f4f4f4;display:flex;justify-content:center;margin-bottom:1em;white-space:nowrap}.novo-stepper-horizontal-line{border-bottom:1px solid #d9dadc;flex:auto;height:80px;min-width:0}.novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header{align-items:center;display:flex;flex-flow:column;height:80px;justify-content:center;overflow:visible;padding:0 24px}.novo-horizontal-stepper-header .novo-step-status{align-items:center;bottom:0;display:flex;height:1px;justify-content:center;position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line{position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:before{border-bottom:1px solid #d9dadc;content:\"\";display:block;margin-right:8px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:after{border-top:1px solid #d9dadc;content:\"\";display:block;margin-left:calc(50% + 8px);margin-top:-1px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:before,.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.edit:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:after{border-top:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon{position:relative}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon:before{background:#fff;border-radius:50%;bottom:1px;content:\"\";display:block;left:1px;position:absolute;right:1px;top:1px;z-index:0}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon>*{position:relative;z-index:1}.novo-vertical-stepper-header{align-items:center;display:flex;max-height:24px;padding:24px}.novo-vertical-stepper-header .novo-step-icon,.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:12px}[dir=rtl] .novo-vertical-stepper-header .novo-step-icon,[dir=rtl] .novo-vertical-stepper-header .novo-step-icon-not-touched{margin-left:12px;margin-right:0}.novo-horizontal-stepper-content{overflow:hidden}.novo-horizontal-stepper-content[aria-expanded=false]{height:0}.novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}.novo-vertical-content-container{border:0;margin-left:36px;position:relative}[dir=rtl] .novo-vertical-content-container{margin-left:0;margin-right:36px}.novo-stepper-vertical-line:before{border-left:1px solid #d9dadc;bottom:-16px;content:\"\";left:0;position:absolute;top:-16px;z-index:-1}[dir=rtl] .novo-stepper-vertical-line:before{left:auto;right:0}.novo-stepper-vertical-line.done:after,.novo-stepper-vertical-line.done:before,.novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical novo-step-status{left:35px;position:absolute;top:25px;transform:scale(.8)}.novo-vertical-stepper-content{overflow:hidden}.novo-vertical-content{padding:0 24px 24px}.novo-step:last-child .novo-vertical-content-container{border:none}"]
            },] }
];
NovoHorizontalStepper.propDecorators = {
    selectedIndex: [{ type: Input }]
};
export class NovoVerticalStepper extends NovoStepper {
    constructor(dir, changeDetectorRef) {
        super(dir, changeDetectorRef);
        this._orientation = 'vertical';
    }
}
NovoVerticalStepper.decorators = [
    { type: Component, args: [{
                selector: 'novo-vertical-stepper',
                template: "<div class=\"novo-step\" *ngFor=\"let step of _steps; let i = index; let isLast = last\">\r\n    <novo-step-header  class=\"novo-vertical-stepper-header\"\r\n                     (click)=\"step.select()\"\r\n                     (keydown)=\"_onKeydown($event)\"\r\n                     [tabIndex]=\"_getFocusIndex() == i ? 0 : -1\"\r\n                     [id]=\"_getStepLabelId(i)\"\r\n                     [attr.aria-controls]=\"_getStepContentId(i)\"\r\n                     [attr.aria-selected]=\"selectedIndex === i\"\r\n                     [index]=\"i\"\r\n                     [theme]=\"step.theme\"\r\n                     [color]=\"step.color\"\r\n                     [icon]=\"step.icon\"\r\n                     [state]=\"getIndicatorType(i)\"\r\n                     [label]=\"step.stepLabel || step.label\"\r\n                     [selected]=\"selectedIndex === i\"\r\n                     [active]=\"step.completed || selectedIndex === i || !linear\"\r\n                     [optional]=\"step.optional\"\r\n                     [iconOverrides]=\"_iconOverrides\">\r\n    </novo-step-header>\r\n\r\n    <div class=\"novo-vertical-content-container\" [class.novo-stepper-vertical-line]=\"!isLast\" [ngClass]=\"getIndicatorType(i)\">\r\n      <div class=\"novo-vertical-stepper-content\" role=\"tabpanel\"\r\n           [@stepTransition]=\"_getAnimationDirection(i)\"\r\n           [id]=\"_getStepContentId(i)\"\r\n           [attr.aria-labelledby]=\"_getStepLabelId(i)\"\r\n           [attr.aria-expanded]=\"selectedIndex === i\">\r\n        <div class=\"novo-vertical-content\">\r\n          <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n",
                host: {
                    class: 'novo-stepper-vertical',
                    'aria-orientation': 'vertical',
                    role: 'tablist',
                },
                animations: [novoStepperAnimations.verticalStepTransition],
                providers: [{ provide: NovoStepper, useExisting: NovoVerticalStepper }],
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-stepper-horizontal,.novo-stepper-vertical{display:block}.novo-horizontal-stepper-header-container{align-items:center;background:#f4f4f4;display:flex;justify-content:center;margin-bottom:1em;white-space:nowrap}.novo-stepper-horizontal-line{border-bottom:1px solid #d9dadc;flex:auto;height:80px;min-width:0}.novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header{align-items:center;display:flex;flex-flow:column;height:80px;justify-content:center;overflow:visible;padding:0 24px}.novo-horizontal-stepper-header .novo-step-status{align-items:center;bottom:0;display:flex;height:1px;justify-content:center;position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line{position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:before{border-bottom:1px solid #d9dadc;content:\"\";display:block;margin-right:8px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:after{border-top:1px solid #d9dadc;content:\"\";display:block;margin-left:calc(50% + 8px);margin-top:-1px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:before,.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.edit:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:after{border-top:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon{position:relative}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon:before{background:#fff;border-radius:50%;bottom:1px;content:\"\";display:block;left:1px;position:absolute;right:1px;top:1px;z-index:0}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon>*{position:relative;z-index:1}.novo-vertical-stepper-header{align-items:center;display:flex;max-height:24px;padding:24px}.novo-vertical-stepper-header .novo-step-icon,.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:12px}[dir=rtl] .novo-vertical-stepper-header .novo-step-icon,[dir=rtl] .novo-vertical-stepper-header .novo-step-icon-not-touched{margin-left:12px;margin-right:0}.novo-horizontal-stepper-content{overflow:hidden}.novo-horizontal-stepper-content[aria-expanded=false]{height:0}.novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}.novo-vertical-content-container{border:0;margin-left:36px;position:relative}[dir=rtl] .novo-vertical-content-container{margin-left:0;margin-right:36px}.novo-stepper-vertical-line:before{border-left:1px solid #d9dadc;bottom:-16px;content:\"\";left:0;position:absolute;top:-16px;z-index:-1}[dir=rtl] .novo-stepper-vertical-line:before{left:auto;right:0}.novo-stepper-vertical-line.done:after,.novo-stepper-vertical-line.done:before,.novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical novo-step-status{left:35px;position:absolute;top:25px;transform:scale(.8)}.novo-vertical-stepper-content{overflow:hidden}.novo-vertical-content{padding:0 24px 24px}.novo-step:last-child .novo-vertical-content-container{border:none}"]
            },] }
];
NovoVerticalStepper.ctorParameters = () => [
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
NovoVerticalStepper.propDecorators = {
    selectedIndex: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3N0ZXBwZXIvc3RlcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFvQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBZSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN04sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFDakMsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQztBQVF2QyxNQUFNLE9BQU8sUUFBUyxTQUFRLE9BQU87SUFZbkMsWUFBbUQsT0FBbUI7UUFDcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7OztZQXBCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLG9FQUFrQztnQkFDbEMsbUJBQW1C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LGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OzRCQUVFLEtBQUs7O0FBa0JSLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxXQUFXO0lBSWxELFlBQXdCLEdBQW1CLEVBQUUsaUJBQW9DO1FBQy9FLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDOzs7WUFyQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLG10REFBb0M7Z0JBRXBDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsdUJBQXVCO29CQUM5QixrQkFBa0IsRUFBRSxVQUFVO29CQUM5QixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0QsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLENBQUM7Z0JBQzFELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztnQkFDdkUsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFoSVEsY0FBYyx1QkFxSVIsUUFBUTtZQW5JNkIsaUJBQWlCOzs7NEJBZ0lsRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgQ2RrU3RlcCwgQ2RrU3RlcHBlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zdGVwcGVyJztcclxuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOb3ZvSWNvbkNvbXBvbmVudCB9IGZyb20gJy4uL2ljb24vSWNvbic7XHJcbmltcG9ydCB7IE5vdm9TdGVwSGVhZGVyIH0gZnJvbSAnLi9zdGVwLWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3ZvU3RlcExhYmVsIH0gZnJvbSAnLi9zdGVwLWxhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IG5vdm9TdGVwcGVyQW5pbWF0aW9ucyB9IGZyb20gJy4vc3RlcHBlci5hbmltYXRpb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBfTm92b1N0ZXAgPSBDZGtTdGVwO1xyXG5leHBvcnQgY29uc3QgX05vdm9TdGVwcGVyID0gQ2RrU3RlcHBlcjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1zdGVwJyxcclxuICB0ZW1wbGF0ZVVybDogJ3N0ZXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1N0ZXAgZXh0ZW5kcyBDZGtTdGVwIHtcclxuICAvKiogQ29udGVudCBmb3Igc3RlcCBsYWJlbCBnaXZlbiBieSBgPG5nLXRlbXBsYXRlIG5vdm9TdGVwTGFiZWw+YC4gKi9cclxuICBAQ29udGVudENoaWxkKE5vdm9TdGVwTGFiZWwpXHJcbiAgc3RlcExhYmVsOiBOb3ZvU3RlcExhYmVsO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHRoZW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgaWNvbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTm92b1N0ZXBwZXIpKSBzdGVwcGVyOiBDZGtTdGVwcGVyKSB7XHJcbiAgICBzdXBlcihzdGVwcGVyKTtcclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25vdm9TdGVwcGVyXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU3RlcHBlciBleHRlbmRzIENka1N0ZXBwZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKiogVGhlIGxpc3Qgb2Ygc3RlcCBoZWFkZXJzIG9mIHRoZSBzdGVwcyBpbiB0aGUgc3RlcHBlci4gKi9cclxuICBAVmlld0NoaWxkcmVuKE5vdm9TdGVwSGVhZGVyKVxyXG4gIF9zdGVwSGVhZGVyOiBRdWVyeUxpc3Q8Rm9jdXNhYmxlT3B0aW9uPjtcclxuXHJcbiAgLyoqIFN0ZXBzIHRoYXQgdGhlIHN0ZXBwZXIgaG9sZHMuICovXHJcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvU3RlcClcclxuICBfc3RlcHM6IFF1ZXJ5TGlzdDxOb3ZvU3RlcD47XHJcblxyXG4gIC8qKiBDdXN0b20gaWNvbiBvdmVycmlkZXMgcGFzc2VkIGluIGJ5IHRoZSBjb25zdW1lci4gKi9cclxuICBAQ29udGVudENoaWxkcmVuKE5vdm9JY29uQ29tcG9uZW50KVxyXG4gIF9pY29uczogUXVlcnlMaXN0PE5vdm9JY29uQ29tcG9uZW50PjtcclxuXHJcbiAgLyoqIENvbnN1bWVyLXNwZWNpZmllZCB0ZW1wbGF0ZS1yZWZzIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGhlYWRlciBpY29ucy4gKi9cclxuICBfaWNvbk92ZXJyaWRlczogeyBba2V5OiBzdHJpbmddOiBUZW1wbGF0ZVJlZjxhbnk+IH0gPSB7fTtcclxuXHJcbiAgZ2V0IGNvbXBsZXRlZCgpOiBib29sZWFuIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5fc3RlcHMudG9BcnJheSgpO1xyXG4gICAgICBjb25zdCBsZW5ndGggPSBzdGVwcy5sZW5ndGggLSAxO1xyXG4gICAgICByZXR1cm4gc3RlcHNbbGVuZ3RoXS5jb21wbGV0ZWQgJiYgbGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSW5kZXg7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gTWFyayB0aGUgY29tcG9uZW50IGZvciBjaGFuZ2UgZGV0ZWN0aW9uIHdoZW5ldmVyIHRoZSBjb250ZW50IGNoaWxkcmVuIHF1ZXJ5IGNoYW5nZXNcclxuICAgIHRoaXMuX3N0ZXBzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3N0YXRlQ2hhbmdlZCgpKTtcclxuICB9XHJcblxyXG4gIGNvbXBsZXRlKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLl9zdGVwcy50b0FycmF5KCk7XHJcbiAgICAgIHN0ZXBzW3RoaXMuc2VsZWN0ZWRJbmRleF0uY29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEluZGljYXRvclR5cGUoaW5kZXg6IG51bWJlcik6ICdub25lJyB8ICcnIHwgJ2VkaXQnIHwgJ2RvbmUnIHtcclxuICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5fc3RlcHMudG9BcnJheSgpO1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgaWYgKHN0ZXBzW2luZGV4XSAmJiBpbmRleCA9PT0gc3RlcHMubGVuZ3RoIC0gMSAmJiBzdGVwc1tpbmRleF0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgcmV0dXJuICdkb25lJztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gJ2VkaXQnO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgdGhpcy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgIHJldHVybiAnZG9uZSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ25vbmUnO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWhvcml6b250YWwtc3RlcHBlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICdzdGVwcGVyLWhvcml6b250YWwuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ3N0ZXBwZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ25vdm8tc3RlcHBlci1ob3Jpem9udGFsJyxcclxuICAgICdhcmlhLW9yaWVudGF0aW9uJzogJ2hvcml6b250YWwnLFxyXG4gICAgcm9sZTogJ3RhYmxpc3QnLFxyXG4gIH0sXHJcbiAgYW5pbWF0aW9uczogW25vdm9TdGVwcGVyQW5pbWF0aW9ucy5ob3Jpem9udGFsU3RlcFRyYW5zaXRpb25dLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTm92b1N0ZXBwZXIsIHVzZUV4aXN0aW5nOiBOb3ZvSG9yaXpvbnRhbFN0ZXBwZXIgfV0sXHJcbiAgLy8gZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Ib3Jpem9udGFsU3RlcHBlciBleHRlbmRzIE5vdm9TdGVwcGVyIHtcclxuICBASW5wdXQoKVxyXG4gIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXZlcnRpY2FsLXN0ZXBwZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnc3RlcHBlci12ZXJ0aWNhbC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnc3RlcHBlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbm92by1zdGVwcGVyLXZlcnRpY2FsJyxcclxuICAgICdhcmlhLW9yaWVudGF0aW9uJzogJ3ZlcnRpY2FsJyxcclxuICAgIHJvbGU6ICd0YWJsaXN0JyxcclxuICB9LFxyXG4gIGFuaW1hdGlvbnM6IFtub3ZvU3RlcHBlckFuaW1hdGlvbnMudmVydGljYWxTdGVwVHJhbnNpdGlvbl0sXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOb3ZvU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9WZXJ0aWNhbFN0ZXBwZXIgfV0sXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVmVydGljYWxTdGVwcGVyIGV4dGVuZHMgTm92b1N0ZXBwZXIge1xyXG4gIEBJbnB1dCgpXHJcbiAgc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIHN1cGVyKGRpciwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xyXG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xyXG4gIH1cclxufVxyXG4iXX0=