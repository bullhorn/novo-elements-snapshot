import { BooleanInput } from '@angular/cdk/coercion';
import { InjectionToken } from '@angular/core';
import { CanDisable, CanDisableCtor } from '../mixins/disabled.mixin';
import { NovoOptionParentComponent } from './option-parent';
export declare class NovoOptgroupBase implements CanDisable {
    disabled: boolean;
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
    /** Whether the group is in novoInert a11y mode. */
    _novoInert: boolean;
}
export declare const NovoOptgroupMixinBase: CanDisableCtor & typeof NovoOptgroupBase;
/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export declare const NOVO_OPTGROUP: InjectionToken<NovoOptgroup>;
/**
 * Component that is used to group instances of `novo-option`.
 */
export declare class NovoOptgroup extends NovoOptgroupMixinBase {
    constructor(parent?: NovoOptionParentComponent);
    static ngAcceptInputType_disabled: BooleanInput;
}
