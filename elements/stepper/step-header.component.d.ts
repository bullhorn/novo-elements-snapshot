import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy, TemplateRef } from '@angular/core';
import { NovoStepLabel } from './step-label.component';
import { CdkStepHeader } from '@angular/cdk/stepper';
import * as ɵngcc0 from '@angular/core';
export declare class NovoStepHeader extends CdkStepHeader implements OnDestroy {
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
    get index(): number;
    set index(value: number);
    private _index;
    /** Whether the given step is selected. */
    get selected(): boolean;
    set selected(value: boolean);
    private _selected;
    /** Whether the given step label is active. */
    get active(): boolean;
    set active(value: boolean);
    private _active;
    /** Whether the given step label is active. */
    get touched(): boolean;
    /** Whether the given step is optional. */
    get optional(): boolean;
    set optional(value: boolean);
    private _optional;
    constructor(_focusMonitor: FocusMonitor, _element: ElementRef);
    ngOnDestroy(): void;
    /** Returns string label of given step if it is a text label. */
    _stringLabel(): string | null;
    /** Returns NovoStepLabel if the label of given step is a template label. */
    _templateLabel(): NovoStepLabel | null;
    /** Returns the host HTML element. */
    _getHostElement(): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NovoStepHeader, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NovoStepHeader, "novo-step-header", never, { "index": "index"; "selected": "selected"; "active": "active"; "optional": "optional"; "theme": "theme"; "color": "color"; "icon": "icon"; "state": "state"; "label": "label"; "iconOverrides": "iconOverrides"; }, {}, never, never>;
}

//# sourceMappingURL=step-header.component.d.ts.map