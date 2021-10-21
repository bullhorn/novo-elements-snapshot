// NG2
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["*"];
let nextUniqueId = 0;
export class NovoHintElement {
    constructor() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = `novo-hint-${nextUniqueId++}`;
    }
    ngOnInit() { }
}
NovoHintElement.ɵfac = function NovoHintElement_Factory(t) { return new (t || NovoHintElement)(); };
NovoHintElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoHintElement, selectors: [["novo-hint"]], hostAttrs: [1, "novo-hint"], hostVars: 4, hostBindings: function NovoHintElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("id", ctx.id)("align", null);
        i0.ɵɵclassProp("novo-field-hint-end", ctx.align === "end");
    } }, inputs: { align: "align", id: "id" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoHintElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{color:#4f5361;color:#999;display:inline;display:flex;flex:1 0 auto;font-size:.8rem;font-size:.9rem;font-weight:400;line-height:1.2rem;padding-bottom:.4rem;padding-top:.4rem;width:-webkit-max-content;width:-moz-max-content;width:max-content}.novo-field-hint-end[_nghost-%COMP%]{align-content:end;justify-content:flex-end;order:1;text-align:right}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoHintElement, [{
        type: Component,
        args: [{
                selector: 'novo-hint',
                templateUrl: './hint.html',
                styleUrls: ['./hint.scss'],
                host: {
                    class: 'novo-hint',
                    '[class.novo-field-hint-end]': 'align === "end"',
                    '[attr.id]': 'id',
                    // Remove align attribute to prevent it from interfering with layout.
                    '[attr.align]': 'null',
                },
            }]
    }], null, { align: [{
            type: Input
        }], id: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9maWVsZC9oaW50L2hpbnQudHMiLCJlbGVtZW50cy9maWVsZC9oaW50L2hpbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7OztBQUV6RCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFhckIsTUFBTSxPQUFPLGVBQWU7SUFaNUI7UUFhRSx1RUFBdUU7UUFDOUQsVUFBSyxHQUFvQixPQUFPLENBQUM7UUFFMUMsdUZBQXVGO1FBQzlFLE9BQUUsR0FBVyxhQUFhLFlBQVksRUFBRSxFQUFFLENBQUM7S0FHckQ7SUFEQyxRQUFRLEtBQVMsQ0FBQzs7OEVBUFAsZUFBZTtvREFBZixlQUFlOzs7OztRQ2hCNUIsa0JBQVk7O2tERGdCQyxlQUFlO2NBWjNCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDMUIsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxXQUFXO29CQUNsQiw2QkFBNkIsRUFBRSxpQkFBaUI7b0JBQ2hELFdBQVcsRUFBRSxJQUFJO29CQUNqQixxRUFBcUU7b0JBQ3JFLGNBQWMsRUFBRSxNQUFNO2lCQUN2QjthQUNGO2dCQUdVLEtBQUs7a0JBQWIsS0FBSztZQUdHLEVBQUU7a0JBQVYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1oaW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hpbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hpbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWhpbnQnLFxuICAgICdbY2xhc3Mubm92by1maWVsZC1oaW50LWVuZF0nOiAnYWxpZ24gPT09IFwiZW5kXCInLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgIC8vIFJlbW92ZSBhbGlnbiBhdHRyaWJ1dGUgdG8gcHJldmVudCBpdCBmcm9tIGludGVyZmVyaW5nIHdpdGggbGF5b3V0LlxuICAgICdbYXR0ci5hbGlnbl0nOiAnbnVsbCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9IaW50RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKiBXaGV0aGVyIHRvIGFsaWduIHRoZSBoaW50IGxhYmVsIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGxpbmUuICovXG4gIEBJbnB1dCgpIGFsaWduOiAnc3RhcnQnIHwgJ2VuZCcgPSAnc3RhcnQnO1xuXG4gIC8qKiBVbmlxdWUgSUQgZm9yIHRoZSBoaW50LiBVc2VkIGZvciB0aGUgYXJpYS1kZXNjcmliZWRieSBvbiB0aGUgZm9ybSBmaWVsZCBjb250cm9sLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG5vdm8taGludC0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgbmdPbkluaXQoKTogYW55IHt9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+Il19