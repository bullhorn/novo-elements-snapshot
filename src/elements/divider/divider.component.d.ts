import { BooleanInput } from '@angular/cdk/coercion';
export declare class NovoDividerComponent {
    /** Whether the divider is vertically aligned. */
    get vertical(): boolean;
    set vertical(value: boolean);
    private _vertical;
    /** Whether the divider is an inset divider. */
    get inset(): boolean;
    set inset(value: boolean);
    private _inset;
    static ngAcceptInputType_vertical: BooleanInput;
    static ngAcceptInputType_inset: BooleanInput;
}
