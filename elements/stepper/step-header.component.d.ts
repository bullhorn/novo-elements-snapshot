import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, TemplateRef } from '@angular/core';
import { NovoStepLabel } from './step-label.component';
export declare class NovoStepHeader implements OnDestroy {
    private _focusMonitor;
    private _element;
    theme: string;
    color: string;
    icon: string;
    /** State of the given step. */
    state: string;
    /** Label of the given step. */
    label: NovoStepLabel | string;
    /** Overrides for the header icons, passed in via the stepper. */
    iconOverrides: {
        [key: string]: TemplateRef<any>;
    };
    /** Index of the given step. */
    index: number;
    private _index;
    /** Whether the given step is selected. */
    selected: boolean;
    private _selected;
    /** Whether the given step label is active. */
    active: boolean;
    private _active;
    /** Whether the given step label is active. */
    readonly touched: boolean;
    /** Whether the given step is optional. */
    optional: boolean;
    private _optional;
    constructor(_focusMonitor: FocusMonitor, _element: ElementRef);
    ngOnDestroy(): void;
    /** Returns string label of given step if it is a text label. */
    _stringLabel(): string | null;
    /** Returns NovoStepLabel if the label of given step is a template label. */
    _templateLabel(): NovoStepLabel | null;
    /** Returns the host HTML element. */
    _getHostElement(): any;
}