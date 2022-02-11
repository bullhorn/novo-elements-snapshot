import { CdkAccordion } from '@angular/cdk/accordion';
/** NovoAccordion's display modes. */
export declare type NovoAccordionDisplayMode = 'default' | 'flat';
/**
 * Directive for a Material Design Accordion.
 */
export declare class NovoAccordion extends CdkAccordion {
    /** Whether the expansion indicator should be hidden. */
    get hideToggle(): boolean;
    set hideToggle(show: boolean);
    private _hideToggle;
    /**
     * The display mode used for all expansion panels in the accordion. Currently two display
     * modes exist:
     *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
     *     panel at a different elevation from the reset of the accordion.
     *  flat - no spacing is placed around expanded panels, showing all panels at the same
     *     elevation.
     */
    displayMode: NovoAccordionDisplayMode;
}
