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
NovoAccordion.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAccordion, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoAccordion.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoAccordion, selector: "novo-accordion", inputs: { hideToggle: "hideToggle", displayMode: "displayMode" }, host: { classAttribute: "novo-accordion" }, exportAs: ["novoAccordion"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoAccordion, decorators: [{
            type: Directive,
            args: [{
                    selector: 'novo-accordion',
                    exportAs: 'novoAccordion',
                    host: {
                        class: 'novo-accordion',
                    },
                }]
        }], propDecorators: { hideToggle: [{
                type: Input
            }], displayMode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9leHBhbnNpb24vYWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLakQ7O0dBRUc7QUFRSCxNQUFNLE9BQU8sYUFBYyxTQUFRLFlBQVk7SUFQL0M7O1FBZ0JVLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRXJDOzs7Ozs7O1dBT0c7UUFFSCxnQkFBVyxHQUE2QixTQUFTLENBQUM7S0FDbkQ7SUFwQkMsd0RBQXdEO0lBQ3hELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsSUFBYTtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7OzJHQVJVLGFBQWE7K0ZBQWIsYUFBYTs0RkFBYixhQUFhO2tCQVB6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGdCQUFnQjtxQkFDeEI7aUJBQ0Y7OEJBSUssVUFBVTtzQkFEYixLQUFLO2dCQWtCTixXQUFXO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtBY2NvcmRpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYWNjb3JkaW9uJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBOb3ZvQWNjb3JkaW9uJ3MgZGlzcGxheSBtb2Rlcy4gKi9cbmV4cG9ydCB0eXBlIE5vdm9BY2NvcmRpb25EaXNwbGF5TW9kZSA9ICdkZWZhdWx0JyB8ICdmbGF0JztcblxuLyoqXG4gKiBEaXJlY3RpdmUgZm9yIGEgTWF0ZXJpYWwgRGVzaWduIEFjY29yZGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbm92by1hY2NvcmRpb24nLFxuICBleHBvcnRBczogJ25vdm9BY2NvcmRpb24nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWFjY29yZGlvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9BY2NvcmRpb24gZXh0ZW5kcyBDZGtBY2NvcmRpb24ge1xuICAvKiogV2hldGhlciB0aGUgZXhwYW5zaW9uIGluZGljYXRvciBzaG91bGQgYmUgaGlkZGVuLiAqL1xuICBASW5wdXQoKVxuICBnZXQgaGlkZVRvZ2dsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVRvZ2dsZTtcbiAgfVxuICBzZXQgaGlkZVRvZ2dsZShzaG93OiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZVRvZ2dsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShzaG93KTtcbiAgfVxuICBwcml2YXRlIF9oaWRlVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBkaXNwbGF5IG1vZGUgdXNlZCBmb3IgYWxsIGV4cGFuc2lvbiBwYW5lbHMgaW4gdGhlIGFjY29yZGlvbi4gQ3VycmVudGx5IHR3byBkaXNwbGF5XG4gICAqIG1vZGVzIGV4aXN0OlxuICAgKiAgZGVmYXVsdCAtIGEgZ3V0dGVyLWxpa2Ugc3BhY2luZyBpcyBwbGFjZWQgYXJvdW5kIGFueSBleHBhbmRlZCBwYW5lbCwgcGxhY2luZyB0aGUgZXhwYW5kZWRcbiAgICogICAgIHBhbmVsIGF0IGEgZGlmZmVyZW50IGVsZXZhdGlvbiBmcm9tIHRoZSByZXNldCBvZiB0aGUgYWNjb3JkaW9uLlxuICAgKiAgZmxhdCAtIG5vIHNwYWNpbmcgaXMgcGxhY2VkIGFyb3VuZCBleHBhbmRlZCBwYW5lbHMsIHNob3dpbmcgYWxsIHBhbmVscyBhdCB0aGUgc2FtZVxuICAgKiAgICAgZWxldmF0aW9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgZGlzcGxheU1vZGU6IE5vdm9BY2NvcmRpb25EaXNwbGF5TW9kZSA9ICdkZWZhdWx0Jztcbn1cbiJdfQ==