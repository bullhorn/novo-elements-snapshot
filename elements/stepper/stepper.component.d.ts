import { FocusableOption } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { AfterContentInit, ChangeDetectorRef, QueryList, TemplateRef } from '@angular/core';
import { NovoIconComponent } from '../icon/Icon';
import { NovoStepLabel } from './step-label.component';
import * as i0 from "@angular/core";
export declare class NovoStep extends CdkStep {
    /** Content for step label given by `<ng-template novoStepLabel>`. */
    stepLabel: NovoStepLabel;
    theme: string;
    color: string;
    icon: string;
    constructor(stepper: CdkStepper);
    static ɵfac: i0.ɵɵFactoryDef<NovoStep, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoStep, "novo-step", never, { "theme": "theme"; "color": "color"; "icon": "icon"; }, {}, ["stepLabel"], ["*"]>;
}
export declare class NovoStepper extends CdkStepper implements AfterContentInit {
    /** The list of step headers of the steps in the stepper. */
    _stepHeader: QueryList<FocusableOption>;
    /** Steps that the stepper holds. */
    _steps: QueryList<NovoStep>;
    /** Custom icon overrides passed in by the consumer. */
    _icons: QueryList<NovoIconComponent>;
    /** Consumer-specified template-refs to be used to override the header icons. */
    _iconOverrides: {
        [key: string]: TemplateRef<any>;
    };
    get completed(): boolean;
    ngAfterContentInit(): void;
    complete(): void;
    getIndicatorType(index: number): 'none' | '' | 'edit' | 'done';
    static ɵfac: i0.ɵɵFactoryDef<NovoStepper, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NovoStepper, "[novoStepper]", never, {}, {}, ["_steps", "_icons"]>;
}
export declare class NovoHorizontalStepper extends NovoStepper {
    static ɵfac: i0.ɵɵFactoryDef<NovoHorizontalStepper, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoHorizontalStepper, "novo-horizontal-stepper", ["novoHorizontalStepper"], {}, {}, never, never>;
}
export declare class NovoVerticalStepper extends NovoStepper {
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef);
    static ɵfac: i0.ɵɵFactoryDef<NovoVerticalStepper, [{ optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NovoVerticalStepper, "novo-vertical-stepper", ["novoVerticalStepper"], {}, {}, never, never>;
}
