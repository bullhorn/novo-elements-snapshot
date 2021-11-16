import { FocusableOption } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { AfterContentInit, ChangeDetectorRef, QueryList, TemplateRef } from '@angular/core';
import { NovoIconComponent } from '../icon/Icon';
import { NovoStepLabel } from './step-label.component';
export declare const _NovoStep: typeof CdkStep;
export declare const _NovoStepper: typeof CdkStepper;
export declare class NovoStep extends CdkStep {
    /** Content for step label given by `<ng-template novoStepLabel>`. */
    stepLabel: NovoStepLabel;
    theme: string;
    color: string;
    icon: string;
    constructor(stepper: CdkStepper);
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
}
export declare class NovoHorizontalStepper extends NovoStepper {
    selectedIndex: number;
}
export declare class NovoVerticalStepper extends NovoStepper {
    selectedIndex: number;
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef);
}
