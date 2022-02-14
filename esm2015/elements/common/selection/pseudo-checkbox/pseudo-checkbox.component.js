import { ChangeDetectionStrategy, Component, Inject, Input, Optional, ViewEncapsulation } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i0 from "@angular/core";
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `novo-primary .novo-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<novo-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
export class NovoPseudoCheckbox {
    constructor(_animationMode) {
        this._animationMode = _animationMode;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Display state of the checkbox. */
        this.shape = 'box';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
    }
}
NovoPseudoCheckbox.ɵfac = function NovoPseudoCheckbox_Factory(t) { return new (t || NovoPseudoCheckbox)(i0.ɵɵdirectiveInject(ANIMATION_MODULE_TYPE, 8)); };
NovoPseudoCheckbox.ɵcmp = i0.ɵɵdefineComponent({ type: NovoPseudoCheckbox, selectors: [["novo-pseudo-checkbox"]], hostAttrs: [1, "novo-pseudo-checkbox"], hostVars: 8, hostBindings: function NovoPseudoCheckbox_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("novo-pseudo-checkbox-indeterminate", ctx.state === "indeterminate")("novo-pseudo-checkbox-checked", ctx.state === "checked")("novo-pseudo-checkbox-disabled", ctx.disabled)("_novo-animation-noopable", ctx._animationMode === "NoopAnimations");
    } }, inputs: { state: "state", shape: "shape", disabled: "disabled" }, decls: 1, vars: 18, template: function NovoPseudoCheckbox_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "i");
    } if (rf & 2) {
        i0.ɵɵclassProp("bhi-checkbox-empty", ctx.state === "unchecked" && ctx.shape === "box")("bhi-checkbox-filled", ctx.state === "checked" && ctx.shape === "box")("bhi-checkbox-indeterminate", ctx.state === "indeterminate" && ctx.shape === "box")("bhi-circle-o", ctx.state === "unchecked" && ctx.shape === "circle")("bhi-check-circle-filled", ctx.state === "checked" && ctx.shape === "circle")("bhi-circle", ctx.state === "indeterminate" && ctx.shape === "circle")("bhi-box-empty", ctx.state === "unchecked" && ctx.shape === "line")("bhi-check", ctx.state === "checked" && ctx.shape === "line")("bhi-box-minus-o", ctx.state === "indeterminate" && ctx.shape === "line");
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}.novo-pseudo-checkbox{box-sizing:border-box;cursor:pointer;display:inline-block;flex-shrink:0;height:16px;position:relative;transition:color .3s ease-in-out;vertical-align:middle;width:16px}.novo-pseudo-checkbox.novo-pseudo-checkbox-checked,.novo-pseudo-checkbox.novo-pseudo-checkbox-indeterminate{-webkit-animation:iconEnter .16s ease-in-out;animation:iconEnter .16s ease-in-out;color:#4a89dc}.novo-pseudo-checkbox i{font-size:1.4rem;line-height:1rem}.novo-pseudo-checkbox-disabled{cursor:default}"], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoPseudoCheckbox, [{
        type: Component,
        args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'novo-pseudo-checkbox',
                styleUrls: ['pseudo-checkbox.component.scss'],
                template: ` <i
    [class.bhi-checkbox-empty]="state === 'unchecked' && shape === 'box'"
    [class.bhi-checkbox-filled]="state === 'checked' && shape === 'box'"
    [class.bhi-checkbox-indeterminate]="state === 'indeterminate' && shape === 'box'"
    [class.bhi-circle-o]="state === 'unchecked' && shape === 'circle'"
    [class.bhi-check-circle-filled]="state === 'checked' && shape === 'circle'"
    [class.bhi-circle]="state === 'indeterminate' && shape === 'circle'"
    [class.bhi-box-empty]="state === 'unchecked' && shape === 'line'"
    [class.bhi-check]="state === 'checked' && shape === 'line'"
    [class.bhi-box-minus-o]="state === 'indeterminate' && shape === 'line'"
  ></i>`,
                host: {
                    class: 'novo-pseudo-checkbox',
                    '[class.novo-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                    '[class.novo-pseudo-checkbox-checked]': 'state === "checked"',
                    '[class.novo-pseudo-checkbox-disabled]': 'disabled',
                    '[class._novo-animation-noopable]': '_animationMode === "NoopAnimations"',
                },
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [ANIMATION_MODULE_TYPE]
            }] }]; }, { state: [{
            type: Input
        }], shape: [{
            type: Input
        }], disabled: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9jb21tb24vc2VsZWN0aW9uL3BzZXVkby1jaGVja2JveC9wc2V1ZG8tY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7O0FBUzdFOzs7Ozs7Ozs7Ozs7R0FZRztBQXlCSCxNQUFNLE9BQU8sa0JBQWtCO0lBUTdCLFlBQThELGNBQXVCO1FBQXZCLG1CQUFjLEdBQWQsY0FBYyxDQUFTO1FBUHJGLHFDQUFxQztRQUM1QixVQUFLLEdBQTRCLFdBQVcsQ0FBQztRQUN0RCxxQ0FBcUM7UUFDNUIsVUFBSyxHQUE0QixLQUFLLENBQUM7UUFDaEQsd0NBQXdDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFcUQsQ0FBQzs7b0ZBUjlFLGtCQUFrQix1QkFRRyxxQkFBcUI7dURBUjFDLGtCQUFrQjs7O1FBbkJqQixvQkFVUDs7UUFUSCxzRkFBcUUsdUVBQUEsb0ZBQUEscUVBQUEsOEVBQUEsdUVBQUEsb0VBQUEsOERBQUEsMEVBQUE7O2tEQWtCNUQsa0JBQWtCO2NBeEI5QixTQUFTO2VBQUM7Z0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDN0MsUUFBUSxFQUFFOzs7Ozs7Ozs7O1FBVUo7Z0JBQ04sSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxzQkFBc0I7b0JBQzdCLDRDQUE0QyxFQUFFLDJCQUEyQjtvQkFDekUsc0NBQXNDLEVBQUUscUJBQXFCO29CQUM3RCx1Q0FBdUMsRUFBRSxVQUFVO29CQUNuRCxrQ0FBa0MsRUFBRSxxQ0FBcUM7aUJBQzFFO2FBQ0Y7O3NCQVNjLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMscUJBQXFCO3dCQU41QyxLQUFLO2tCQUFiLEtBQUs7WUFFRyxLQUFLO2tCQUFiLEtBQUs7WUFFRyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBTklNQVRJT05fTU9EVUxFX1RZUEUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHN0YXRlcyBmb3IgYSBwc2V1ZG8gY2hlY2tib3guXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCB0eXBlIE5vdm9Qc2V1ZG9DaGVja2JveFN0YXRlID0gJ3VuY2hlY2tlZCcgfCAnY2hlY2tlZCcgfCAnaW5kZXRlcm1pbmF0ZSc7XG5leHBvcnQgdHlwZSBOb3ZvUHNldWRvQ2hlY2tib3hTaGFwZSA9ICdib3gnIHwgJ2NpcmNsZScgfCAnbGluZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgc2hvd3MgYSBzaW1wbGlmaWVkIGNoZWNrYm94IHdpdGhvdXQgaW5jbHVkaW5nIGFueSBraW5kIG9mIFwicmVhbFwiIGNoZWNrYm94LlxuICogTWVhbnQgdG8gYmUgdXNlZCB3aGVuIHRoZSBjaGVja2JveCBpcyBwdXJlbHkgZGVjb3JhdGl2ZSBhbmQgYSBsYXJnZSBudW1iZXIgb2YgdGhlbSB3aWxsIGJlXG4gKiBpbmNsdWRlZCwgc3VjaCBhcyBmb3IgdGhlIG9wdGlvbnMgaW4gYSBtdWx0aS1zZWxlY3QuIFVzZXMgbm8gU1ZHcyBvciBjb21wbGV4IGFuaW1hdGlvbnMuXG4gKiBOb3RlIHRoYXQgdGhlbWluZyBpcyBtZWFudCB0byBiZSBoYW5kbGVkIGJ5IHRoZSBwYXJlbnQgZWxlbWVudCwgZS5nLlxuICogYG5vdm8tcHJpbWFyeSAubm92by1wc2V1ZG8tY2hlY2tib3hgLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGNvbXBvbmVudCB3aWxsIGJlIGNvbXBsZXRlbHkgaW52aXNpYmxlIHRvIHNjcmVlbi1yZWFkZXIgdXNlcnMuIFRoaXMgaXMgKm5vdCpcbiAqIGludGVyY2hhbmdlYWJsZSB3aXRoIGA8bm92by1jaGVja2JveD5gIGFuZCBzaG91bGQgKm5vdCogYmUgdXNlZCBpZiB0aGUgdXNlciB3b3VsZCBkaXJlY3RseVxuICogaW50ZXJhY3Qgd2l0aCB0aGUgY2hlY2tib3guIFRoZSBwc2V1ZG8tY2hlY2tib3ggc2hvdWxkIG9ubHkgYmUgdXNlZCBhcyBhbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWxcbiAqIG9mIG1vcmUgY29tcGxleCBjb21wb25lbnRzIHRoYXQgYXBwcm9wcmlhdGVseSBoYW5kbGUgc2VsZWN0ZWQgLyBjaGVja2VkIHN0YXRlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbm92by1wc2V1ZG8tY2hlY2tib3gnLFxuICBzdHlsZVVybHM6IFsncHNldWRvLWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgIDxpXG4gICAgW2NsYXNzLmJoaS1jaGVja2JveC1lbXB0eV09XCJzdGF0ZSA9PT0gJ3VuY2hlY2tlZCcgJiYgc2hhcGUgPT09ICdib3gnXCJcbiAgICBbY2xhc3MuYmhpLWNoZWNrYm94LWZpbGxlZF09XCJzdGF0ZSA9PT0gJ2NoZWNrZWQnICYmIHNoYXBlID09PSAnYm94J1wiXG4gICAgW2NsYXNzLmJoaS1jaGVja2JveC1pbmRldGVybWluYXRlXT1cInN0YXRlID09PSAnaW5kZXRlcm1pbmF0ZScgJiYgc2hhcGUgPT09ICdib3gnXCJcbiAgICBbY2xhc3MuYmhpLWNpcmNsZS1vXT1cInN0YXRlID09PSAndW5jaGVja2VkJyAmJiBzaGFwZSA9PT0gJ2NpcmNsZSdcIlxuICAgIFtjbGFzcy5iaGktY2hlY2stY2lyY2xlLWZpbGxlZF09XCJzdGF0ZSA9PT0gJ2NoZWNrZWQnICYmIHNoYXBlID09PSAnY2lyY2xlJ1wiXG4gICAgW2NsYXNzLmJoaS1jaXJjbGVdPVwic3RhdGUgPT09ICdpbmRldGVybWluYXRlJyAmJiBzaGFwZSA9PT0gJ2NpcmNsZSdcIlxuICAgIFtjbGFzcy5iaGktYm94LWVtcHR5XT1cInN0YXRlID09PSAndW5jaGVja2VkJyAmJiBzaGFwZSA9PT0gJ2xpbmUnXCJcbiAgICBbY2xhc3MuYmhpLWNoZWNrXT1cInN0YXRlID09PSAnY2hlY2tlZCcgJiYgc2hhcGUgPT09ICdsaW5lJ1wiXG4gICAgW2NsYXNzLmJoaS1ib3gtbWludXMtb109XCJzdGF0ZSA9PT0gJ2luZGV0ZXJtaW5hdGUnICYmIHNoYXBlID09PSAnbGluZSdcIlxuICA+PC9pPmAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tcHNldWRvLWNoZWNrYm94JyxcbiAgICAnW2NsYXNzLm5vdm8tcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGVdJzogJ3N0YXRlID09PSBcImluZGV0ZXJtaW5hdGVcIicsXG4gICAgJ1tjbGFzcy5ub3ZvLXBzZXVkby1jaGVja2JveC1jaGVja2VkXSc6ICdzdGF0ZSA9PT0gXCJjaGVja2VkXCInLFxuICAgICdbY2xhc3Mubm92by1wc2V1ZG8tY2hlY2tib3gtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLl9ub3ZvLWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Qc2V1ZG9DaGVja2JveCB7XG4gIC8qKiBEaXNwbGF5IHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgQElucHV0KCkgc3RhdGU6IE5vdm9Qc2V1ZG9DaGVja2JveFN0YXRlID0gJ3VuY2hlY2tlZCc7XG4gIC8qKiBEaXNwbGF5IHN0YXRlIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgQElucHV0KCkgc2hhcGU6IE5vdm9Qc2V1ZG9DaGVja2JveFNoYXBlID0gJ2JveCc7XG4gIC8qKiBXaGV0aGVyIHRoZSBjaGVja2JveCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nKSB7fVxufVxuIl19