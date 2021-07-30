import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkAccordion } from '@angular/cdk/accordion';
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
NovoAccordion.decorators = [
    { type: Directive, args: [{
                selector: 'novo-accordion',
                exportAs: 'novoAccordion',
                host: {
                    class: 'novo-accordion',
                },
            },] }
];
NovoAccordion.propDecorators = {
    hideToggle: [{ type: Input }],
    displayMode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9leHBhbnNpb24vYWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUt0RDs7R0FFRztBQVFILE1BQU0sT0FBTyxhQUFjLFNBQVEsWUFBWTtJQVAvQzs7UUFnQlUsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFckM7Ozs7Ozs7V0FPRztRQUVILGdCQUFXLEdBQTZCLFNBQVMsQ0FBQztJQUNwRCxDQUFDO0lBcEJDLHdEQUF3RDtJQUN4RCxJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLElBQWE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7WUFmRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjthQUNGOzs7eUJBR0UsS0FBSzswQkFpQkwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgQ2RrQWNjb3JkaW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2FjY29yZGlvbic7XHJcblxyXG4vKiogTm92b0FjY29yZGlvbidzIGRpc3BsYXkgbW9kZXMuICovXHJcbmV4cG9ydCB0eXBlIE5vdm9BY2NvcmRpb25EaXNwbGF5TW9kZSA9ICdkZWZhdWx0JyB8ICdmbGF0JztcclxuXHJcbi8qKlxyXG4gKiBEaXJlY3RpdmUgZm9yIGEgTWF0ZXJpYWwgRGVzaWduIEFjY29yZGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1hY2NvcmRpb24nLFxyXG4gIGV4cG9ydEFzOiAnbm92b0FjY29yZGlvbicsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdub3ZvLWFjY29yZGlvbicsXHJcbiAgfSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9BY2NvcmRpb24gZXh0ZW5kcyBDZGtBY2NvcmRpb24ge1xyXG4gIC8qKiBXaGV0aGVyIHRoZSBleHBhbnNpb24gaW5kaWNhdG9yIHNob3VsZCBiZSBoaWRkZW4uICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaGlkZVRvZ2dsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oaWRlVG9nZ2xlO1xyXG4gIH1cclxuICBzZXQgaGlkZVRvZ2dsZShzaG93OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRlVG9nZ2xlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHNob3cpO1xyXG4gIH1cclxuICBwcml2YXRlIF9oaWRlVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkaXNwbGF5IG1vZGUgdXNlZCBmb3IgYWxsIGV4cGFuc2lvbiBwYW5lbHMgaW4gdGhlIGFjY29yZGlvbi4gQ3VycmVudGx5IHR3byBkaXNwbGF5XHJcbiAgICogbW9kZXMgZXhpc3Q6XHJcbiAgICogIGRlZmF1bHQgLSBhIGd1dHRlci1saWtlIHNwYWNpbmcgaXMgcGxhY2VkIGFyb3VuZCBhbnkgZXhwYW5kZWQgcGFuZWwsIHBsYWNpbmcgdGhlIGV4cGFuZGVkXHJcbiAgICogICAgIHBhbmVsIGF0IGEgZGlmZmVyZW50IGVsZXZhdGlvbiBmcm9tIHRoZSByZXNldCBvZiB0aGUgYWNjb3JkaW9uLlxyXG4gICAqICBmbGF0IC0gbm8gc3BhY2luZyBpcyBwbGFjZWQgYXJvdW5kIGV4cGFuZGVkIHBhbmVscywgc2hvd2luZyBhbGwgcGFuZWxzIGF0IHRoZSBzYW1lXHJcbiAgICogICAgIGVsZXZhdGlvbi5cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGRpc3BsYXlNb2RlOiBOb3ZvQWNjb3JkaW9uRGlzcGxheU1vZGUgPSAnZGVmYXVsdCc7XHJcbn1cclxuIl19