import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, forwardRef, Inject, Input, Optional, QueryList, ViewChildren, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NovoIconComponent } from '../icon/Icon';
import { NovoStepHeader } from './step-header.component';
import { NovoStepLabel } from './step-label.component';
import { novoStepperAnimations } from './stepper.animations';
export class NovoStep extends CdkStep {
    constructor(stepper) {
        super(stepper);
    }
}
NovoStep.decorators = [
    { type: Component, args: [{
                selector: 'novo-step',
                template: "<ng-template><ng-content></ng-content></ng-template>\n",
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: CdkStep, useExisting: NovoStep }]
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
            const steps = this.steps.toArray();
            const length = steps.length - 1;
            return steps[length].completed && length === this.selectedIndex;
        }
        catch (err) {
            return false;
        }
    }
    ngAfterContentInit() {
        // Mark the component for change detection whenever the content children query changes
        this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());
    }
    complete() {
        try {
            const steps = this.steps.toArray();
            steps[this.selectedIndex].completed = true;
            this.next();
            this._stateChanged();
        }
        catch (err) {
            // do nothing
        }
    }
    getIndicatorType(index) {
        const steps = this.steps.toArray();
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
                providers: [
                    { provide: CdkStep, useExisting: NovoStep },
                    { provide: CdkStepper, useExisting: NovoStepper },
                ],
            },] }
];
NovoStepper.propDecorators = {
    _stepHeader: [{ type: ViewChildren, args: [NovoStepHeader,] }],
    steps: [{ type: ContentChildren, args: [NovoStep, { descendants: true },] }],
    _icons: [{ type: ContentChildren, args: [NovoIconComponent,] }]
};
export class NovoHorizontalStepper extends NovoStepper {
}
NovoHorizontalStepper.decorators = [
    { type: Component, args: [{
                selector: 'novo-horizontal-stepper',
                exportAs: 'novoHorizontalStepper',
                template: "<div class=\"novo-horizontal-stepper-header-container\">\n  <div class=\"novo-stepper-horizontal-line complete\"></div>\n  <ng-container *ngFor=\"let step of _steps; let i = index; let isLast = last\">\n    <novo-step-header class=\"novo-horizontal-stepper-header\"\n      (click)=\"step.select()\"\n      (keydown)=\"_onKeydown($event)\"\n      [tabIndex]=\"_getFocusIndex() === i ? 0 : -1\"\n      [id]=\"_getStepLabelId(i)\"\n      [attr.aria-controls]=\"_getStepContentId(i)\"\n      [attr.aria-selected]=\"selectedIndex == i\"\n      [index]=\"i\"\n      [theme]=\"step.theme\"\n      [color]=\"step.color\"\n      [icon]=\"step.icon\"\n      [state]=\"getIndicatorType(i)\"\n      [label]=\"step.stepLabel || step.label\"\n      [selected]=\"selectedIndex === i\"\n      [active]=\"step.completed || selectedIndex === i || !linear\"\n      [optional]=\"step.optional\"\n      [iconOverrides]=\"_iconOverrides\">\n    </novo-step-header>\n  </ng-container>\n  <div class=\"novo-stepper-horizontal-line\" [class.complete]=\"completed\"></div>\n</div>\n\n<div class=\"novo-horizontal-content-container\">\n  <div *ngFor=\"let step of _steps; let i = index\"\n    class=\"novo-horizontal-stepper-content\" role=\"tabpanel\"\n    [@stepTransition]=\"_getAnimationDirection(i)\"\n    [id]=\"_getStepContentId(i)\"\n    [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n    [attr.aria-expanded]=\"selectedIndex === i\">\n    <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n  </div>\n</div>",
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
                styles: [".novo-stepper-horizontal,.novo-stepper-vertical{display:block}.novo-horizontal-stepper-header-container{align-items:center;background:#f7f7f7;display:flex;justify-content:center;margin-bottom:1em;white-space:nowrap}.novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;height:80px;min-width:0}.novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header{align-items:center;display:flex;flex-flow:column;height:80px;justify-content:center;overflow:visible;padding:0 24px}.novo-horizontal-stepper-header .novo-step-status{align-items:center;bottom:0;display:flex;height:1px;justify-content:center;position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line{position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:before{border-bottom:1px solid #dbdbdb;content:\"\";display:block;margin-right:8px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:after{border-top:1px solid #dbdbdb;content:\"\";display:block;margin-left:calc(50% + 8px);margin-top:-1px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:before,.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.edit:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:after{border-top:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon{position:relative}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon:before{background:#fff;border-radius:50%;bottom:1px;content:\"\";display:block;left:1px;position:absolute;right:1px;top:1px;z-index:0}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon>*{position:relative;z-index:1}.novo-vertical-stepper-header{align-items:center;display:flex;max-height:24px;padding:24px}.novo-vertical-stepper-header .novo-step-icon,.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:12px}[dir=rtl] .novo-vertical-stepper-header .novo-step-icon,[dir=rtl] .novo-vertical-stepper-header .novo-step-icon-not-touched{margin-left:12px;margin-right:0}.novo-horizontal-stepper-content{overflow:hidden}.novo-horizontal-stepper-content[aria-expanded=false]{height:0}.novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}.novo-vertical-content-container{border:0;margin-left:36px;position:relative}[dir=rtl] .novo-vertical-content-container{margin-left:0;margin-right:36px}.novo-stepper-vertical-line:before{border-left:1px solid #dbdbdb;bottom:-16px;content:\"\";left:0;position:absolute;top:-16px;z-index:-1}[dir=rtl] .novo-stepper-vertical-line:before{left:auto;right:0}.novo-stepper-vertical-line.done:after,.novo-stepper-vertical-line.done:before,.novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical novo-step-status{left:35px;position:absolute;top:25px;transform:scale(.8)}.novo-vertical-stepper-content{overflow:hidden}.novo-vertical-content{padding:0 24px 24px}.novo-step:last-child .novo-vertical-content-container{border:none}"]
            },] }
];
export class NovoVerticalStepper extends NovoStepper {
    constructor(dir, changeDetectorRef) {
        super(dir, changeDetectorRef);
        this._orientation = 'vertical';
    }
}
NovoVerticalStepper.decorators = [
    { type: Component, args: [{
                selector: 'novo-vertical-stepper',
                exportAs: 'novoVerticalStepper',
                template: "<div class=\"novo-step\" *ngFor=\"let step of _steps; let i = index; let isLast = last\">\n  <novo-step-header class=\"novo-vertical-stepper-header\"\n    (click)=\"step.select()\"\n    (keydown)=\"_onKeydown($event)\"\n    [tabIndex]=\"_getFocusIndex() == i ? 0 : -1\"\n    [id]=\"_getStepLabelId(i)\"\n    [attr.aria-controls]=\"_getStepContentId(i)\"\n    [attr.aria-selected]=\"selectedIndex === i\"\n    [index]=\"i\"\n    [theme]=\"step.theme\"\n    [color]=\"step.color\"\n    [icon]=\"step.icon\"\n    [state]=\"getIndicatorType(i)\"\n    [label]=\"step.stepLabel || step.label\"\n    [selected]=\"selectedIndex === i\"\n    [active]=\"step.completed || selectedIndex === i || !linear\"\n    [optional]=\"step.optional\"\n    [iconOverrides]=\"_iconOverrides\">\n  </novo-step-header>\n\n  <div class=\"novo-vertical-content-container\" [class.novo-stepper-vertical-line]=\"!isLast\"\n    [ngClass]=\"getIndicatorType(i)\">\n    <div class=\"novo-vertical-stepper-content\" role=\"tabpanel\"\n      [@stepTransition]=\"_getAnimationDirection(i)\"\n      [id]=\"_getStepContentId(i)\"\n      [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n      [attr.aria-expanded]=\"selectedIndex === i\">\n      <div class=\"novo-vertical-content\">\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n      </div>\n    </div>\n  </div>\n</div>",
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
                styles: [".novo-stepper-horizontal,.novo-stepper-vertical{display:block}.novo-horizontal-stepper-header-container{align-items:center;background:#f7f7f7;display:flex;justify-content:center;margin-bottom:1em;white-space:nowrap}.novo-stepper-horizontal-line{border-bottom:1px solid #dbdbdb;flex:auto;height:80px;min-width:0}.novo-stepper-horizontal-line.complete{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header{align-items:center;display:flex;flex-flow:column;height:80px;justify-content:center;overflow:visible;padding:0 24px}.novo-horizontal-stepper-header .novo-step-status{align-items:center;bottom:0;display:flex;height:1px;justify-content:center;position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line{position:absolute;width:100%}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:before{border-bottom:1px solid #dbdbdb;content:\"\";display:block;margin-right:8px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line:after{border-top:1px solid #dbdbdb;content:\"\";display:block;margin-left:calc(50% + 8px);margin-top:-1px;width:calc(50% - 8px)}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:before,.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.edit:before{border-bottom:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-line.done:after{border-top:1px solid #4a89dc}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon{position:relative}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon:before{background:#fff;border-radius:50%;bottom:1px;content:\"\";display:block;left:1px;position:absolute;right:1px;top:1px;z-index:0}.novo-horizontal-stepper-header .novo-step-status .novo-stepper-status-icon>*{position:relative;z-index:1}.novo-vertical-stepper-header{align-items:center;display:flex;max-height:24px;padding:24px}.novo-vertical-stepper-header .novo-step-icon,.novo-vertical-stepper-header .novo-step-icon-not-touched{margin-right:12px}[dir=rtl] .novo-vertical-stepper-header .novo-step-icon,[dir=rtl] .novo-vertical-stepper-header .novo-step-icon-not-touched{margin-left:12px;margin-right:0}.novo-horizontal-stepper-content{overflow:hidden}.novo-horizontal-stepper-content[aria-expanded=false]{height:0}.novo-horizontal-content-container{overflow:hidden;padding:0 24px 24px}.novo-vertical-content-container{border:0;margin-left:36px;position:relative}[dir=rtl] .novo-vertical-content-container{margin-left:0;margin-right:36px}.novo-stepper-vertical-line:before{border-left:1px solid #dbdbdb;bottom:-16px;content:\"\";left:0;position:absolute;top:-16px;z-index:-1}[dir=rtl] .novo-stepper-vertical-line:before{left:auto;right:0}.novo-stepper-vertical-line.done:after,.novo-stepper-vertical-line.done:before,.novo-stepper-vertical-line.edit:before{border-left-color:1px solid #4a89dc}.novo-stepper-vertical novo-step-status{left:35px;position:absolute;top:25px;transform:scale(.8)}.novo-vertical-stepper-content{overflow:hidden}.novo-vertical-content{padding:0 24px 24px}.novo-step:last-child .novo-vertical-content-container{border:none}"]
            },] }
];
NovoVerticalStepper.ctorParameters = () => [
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvc3RlcHBlci9zdGVwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFFVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBUzdELE1BQU0sT0FBTyxRQUFTLFNBQVEsT0FBTztJQVluQyxZQUFtRCxPQUFtQjtRQUNwRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQzs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsa0VBQWtDO2dCQUNsQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMs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OlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDZGtTdGVwLCBDZGtTdGVwcGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b0ljb25Db21wb25lbnQgfSBmcm9tICcuLi9pY29uL0ljb24nO1xuaW1wb3J0IHsgTm92b1N0ZXBIZWFkZXIgfSBmcm9tICcuL3N0ZXAtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOb3ZvU3RlcExhYmVsIH0gZnJvbSAnLi9zdGVwLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBub3ZvU3RlcHBlckFuaW1hdGlvbnMgfSBmcm9tICcuL3N0ZXBwZXIuYW5pbWF0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3RlcCcsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcC5jb21wb25lbnQuaHRtbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtTdGVwLCB1c2VFeGlzdGluZzogTm92b1N0ZXAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwIGV4dGVuZHMgQ2RrU3RlcCB7XG4gIC8qKiBDb250ZW50IGZvciBzdGVwIGxhYmVsIGdpdmVuIGJ5IGA8bmctdGVtcGxhdGUgbm92b1N0ZXBMYWJlbD5gLiAqL1xuICBAQ29udGVudENoaWxkKE5vdm9TdGVwTGFiZWwpXG4gIHN0ZXBMYWJlbDogTm92b1N0ZXBMYWJlbDtcblxuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5vdm9TdGVwcGVyKSkgc3RlcHBlcjogQ2RrU3RlcHBlcikge1xuICAgIHN1cGVyKHN0ZXBwZXIpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU3RlcHBlcl0nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka1N0ZXAsIHVzZUV4aXN0aW5nOiBOb3ZvU3RlcCB9LFxuICAgIHsgcHJvdmlkZTogQ2RrU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9TdGVwcGVyIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGVwcGVyIGV4dGVuZHMgQ2RrU3RlcHBlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKiogVGhlIGxpc3Qgb2Ygc3RlcCBoZWFkZXJzIG9mIHRoZSBzdGVwcyBpbiB0aGUgc3RlcHBlci4gKi9cbiAgQFZpZXdDaGlsZHJlbihOb3ZvU3RlcEhlYWRlcilcbiAgX3N0ZXBIZWFkZXI6IFF1ZXJ5TGlzdDxGb2N1c2FibGVPcHRpb24+O1xuXG4gIC8qKiBTdGVwcyB0aGF0IHRoZSBzdGVwcGVyIGhvbGRzLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9TdGVwLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIHN0ZXBzOiBRdWVyeUxpc3Q8Tm92b1N0ZXA+O1xuXG4gIC8qKiBDdXN0b20gaWNvbiBvdmVycmlkZXMgcGFzc2VkIGluIGJ5IHRoZSBjb25zdW1lci4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvSWNvbkNvbXBvbmVudClcbiAgX2ljb25zOiBRdWVyeUxpc3Q8Tm92b0ljb25Db21wb25lbnQ+O1xuXG4gIC8qKiBDb25zdW1lci1zcGVjaWZpZWQgdGVtcGxhdGUtcmVmcyB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBoZWFkZXIgaWNvbnMuICovXG4gIF9pY29uT3ZlcnJpZGVzOiB7IFtrZXk6IHN0cmluZ106IFRlbXBsYXRlUmVmPGFueT4gfSA9IHt9O1xuXG4gIGdldCBjb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5zdGVwcy50b0FycmF5KCk7XG4gICAgICBjb25zdCBsZW5ndGggPSBzdGVwcy5sZW5ndGggLSAxO1xuICAgICAgcmV0dXJuIHN0ZXBzW2xlbmd0aF0uY29tcGxldGVkICYmIGxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBNYXJrIHRoZSBjb21wb25lbnQgZm9yIGNoYW5nZSBkZXRlY3Rpb24gd2hlbmV2ZXIgdGhlIGNvbnRlbnQgY2hpbGRyZW4gcXVlcnkgY2hhbmdlc1xuICAgIHRoaXMuc3RlcHMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc3RhdGVDaGFuZ2VkKCkpO1xuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5zdGVwcy50b0FycmF5KCk7XG4gICAgICBzdGVwc1t0aGlzLnNlbGVjdGVkSW5kZXhdLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxuXG4gIGdldEluZGljYXRvclR5cGUoaW5kZXg6IG51bWJlcik6ICdub25lJyB8ICcnIHwgJ2VkaXQnIHwgJ2RvbmUnIHtcbiAgICBjb25zdCBzdGVwcyA9IHRoaXMuc3RlcHMudG9BcnJheSgpO1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICBpZiAoc3RlcHNbaW5kZXhdICYmIGluZGV4ID09PSBzdGVwcy5sZW5ndGggLSAxICYmIHN0ZXBzW2luZGV4XS5jb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuICdkb25lJztcbiAgICAgIH1cbiAgICAgIHJldHVybiAnZWRpdCc7XG4gICAgfVxuICAgIGlmIChpbmRleCA8IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgcmV0dXJuICdkb25lJztcbiAgICB9XG4gICAgcmV0dXJuICdub25lJztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWhvcml6b250YWwtc3RlcHBlcicsXG4gIGV4cG9ydEFzOiAnbm92b0hvcml6b250YWxTdGVwcGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwcGVyLWhvcml6b250YWwuaHRtbCcsXG4gIHN0eWxlVXJsczogWydzdGVwcGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tc3RlcHBlci1ob3Jpem9udGFsJyxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6ICdob3Jpem9udGFsJyxcbiAgICByb2xlOiAndGFibGlzdCcsXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtub3ZvU3RlcHBlckFuaW1hdGlvbnMuaG9yaXpvbnRhbFN0ZXBUcmFuc2l0aW9uXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOb3ZvU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9Ib3Jpem9udGFsU3RlcHBlciB9LFxuICAgIHsgcHJvdmlkZTogQ2RrU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9Ib3Jpem9udGFsU3RlcHBlciB9LFxuICBdLFxuICAvLyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ib3Jpem9udGFsU3RlcHBlciBleHRlbmRzIE5vdm9TdGVwcGVyIHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdmVydGljYWwtc3RlcHBlcicsXG4gIGV4cG9ydEFzOiAnbm92b1ZlcnRpY2FsU3RlcHBlcicsXG4gIHRlbXBsYXRlVXJsOiAnc3RlcHBlci12ZXJ0aWNhbC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3N0ZXBwZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1zdGVwcGVyLXZlcnRpY2FsJyxcbiAgICAnYXJpYS1vcmllbnRhdGlvbic6ICd2ZXJ0aWNhbCcsXG4gICAgcm9sZTogJ3RhYmxpc3QnLFxuICB9LFxuICBhbmltYXRpb25zOiBbbm92b1N0ZXBwZXJBbmltYXRpb25zLnZlcnRpY2FsU3RlcFRyYW5zaXRpb25dLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE5vdm9TdGVwcGVyLCB1c2VFeGlzdGluZzogTm92b1ZlcnRpY2FsU3RlcHBlciB9LFxuICAgIHsgcHJvdmlkZTogQ2RrU3RlcHBlciwgdXNlRXhpc3Rpbmc6IE5vdm9WZXJ0aWNhbFN0ZXBwZXIgfSxcbiAgXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVmVydGljYWxTdGVwcGVyIGV4dGVuZHMgTm92b1N0ZXBwZXIge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihkaXIsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gIH1cbn1cbiJdfQ==