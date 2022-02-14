import { CdkAccordion } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Directive for a Material Design Accordion.
 */
export class NovoAccordion extends CdkAccordion {
    constructor() {
        super(...arguments);
        this._hideToggle = false;
        /**
         * The display mode used for all expansion panels in the accordion. Currently two display
         * modes exist:
         *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
         *     panel at a different elevation from the reset of the accordion.
         *  flat - no spacing is placed around expanded panels, showing all panels at the same
         *     elevation.
         */
        this.displayMode = 'default';
    }
    /** Whether the expansion indicator should be hidden. */
    get hideToggle() {
        return this._hideToggle;
    }
    set hideToggle(show) {
        this._hideToggle = coerceBooleanProperty(show);
    }
}
NovoAccordion.ɵfac = function NovoAccordion_Factory(t) { return ɵNovoAccordion_BaseFactory(t || NovoAccordion); };
NovoAccordion.ɵdir = i0.ɵɵdefineDirective({ type: NovoAccordion, selectors: [["novo-accordion"]], hostAttrs: [1, "novo-accordion"], inputs: { hideToggle: "hideToggle", displayMode: "displayMode" }, exportAs: ["novoAccordion"], features: [i0.ɵɵInheritDefinitionFeature] });
const ɵNovoAccordion_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoAccordion);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoAccordion, [{
        type: Directive,
        args: [{
                selector: 'novo-accordion',
                exportAs: 'novoAccordion',
                host: {
                    class: 'novo-accordion',
                },
            }]
    }], null, { hideToggle: [{
            type: Input
        }], displayMode: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2V4cGFuc2lvbi9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUtqRDs7R0FFRztBQVFILE1BQU0sT0FBTyxhQUFjLFNBQVEsWUFBWTtJQVAvQzs7UUFnQlUsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFckM7Ozs7Ozs7V0FPRztRQUVILGdCQUFXLEdBQTZCLFNBQVMsQ0FBQztLQUNuRDtJQXBCQyx3REFBd0Q7SUFDeEQsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFVBQVUsQ0FBQyxJQUFhO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0dBUlUsYUFBYTtrREFBYixhQUFhOzBFQUFiLGFBQWE7a0RBQWIsYUFBYTtjQVB6QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjthQUNGO2dCQUlLLFVBQVU7a0JBRGIsS0FBSztZQWtCTixXQUFXO2tCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtBY2NvcmRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBOb3ZvQWNjb3JkaW9uJ3MgZGlzcGxheSBtb2Rlcy4gKi9cbmV4cG9ydCB0eXBlIE5vdm9BY2NvcmRpb25EaXNwbGF5TW9kZSA9ICdkZWZhdWx0JyB8ICdmbGF0JztcblxuLyoqXG4gKiBEaXJlY3RpdmUgZm9yIGEgTWF0ZXJpYWwgRGVzaWduIEFjY29yZGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY2NvcmRpb24nLFxuICBleHBvcnRBczogJ25vdm9BY2NvcmRpb24nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWFjY29yZGlvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY2NvcmRpb24gZXh0ZW5kcyBDZGtBY2NvcmRpb24ge1xuICAvKiogV2hldGhlciB0aGUgZXhwYW5zaW9uIGluZGljYXRvciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICBASW5wdXQoKVxuICBnZXQgaGlkZVRvZ2dsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVRvZ2dsZTtcbiAgfVxuICBzZXQgaGlkZVRvZ2dsZShzaG93OiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZVRvZ2dsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShzaG93KTtcbiAgfVxuICBwcml2YXRlIF9oaWRlVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5IG1vZGUgdXNlZCBmb3IgYWxsIGV4cGFuc2lvbiBwYW5lbHMgaW4gdGhlIGFjY29yZGlvbi4gQ3VycmVudGx5IHR3byBkaXNwbGF5XG4gICAqIG1vZGVzIGV4aXN0OlxuICAgKiAgZGVmYXVsdCAtIGEgZ3V0dGVyLWxpa2Ugc3BhY2luZyBpcyBwbGFjZWQgYXJvdW5kIGFueSBleHBhbmRlZCBwYW5lbCwgcGxhY2luZyB0aGUgZXhwYW5kZWRcbiAgICogICAgIHBhbmVsIGF0IGEgZGlmZmVyZW50IGVsZXZhdGlvbiBmcm9tIHRoZSByZXNldCBvZiB0aGUgYWNjb3JkaW9uLlxuICAgKiAgZmxhdCAtIG5vIHNwYWNpbmcgaXMgcGxhY2VkIGFyb3VuZCBleHBhbmRlZCBwYW5lbHMsIHNob3dpbmcgYWxsIHBhbmVscyBhdCB0aGUgc2FtZVxuICAgKiAgICAgZWxldmF0aW9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgZGlzcGxheU1vZGU6IE5vdm9BY2NvcmRpb25EaXNwbGF5TW9kZSA9ICdkZWZhdWx0Jztcbn1cbiJdfQ==