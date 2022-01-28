// NG2
import { Component, Input } from '@angular/core';
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
NovoHintElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-hint',
                template: "<ng-content></ng-content>",
                host: {
                    class: 'novo-hint',
                    '[class.novo-field-hint-end]': 'align === "end"',
                    '[attr.id]': 'id',
                    // Remove align attribute to prevent it from interfering with layout.
                    '[attr.align]': 'null',
                },
                styles: [":host{color:var(--text-muted,#3d464d);color:#9e9e9e;display:flex;flex:1 0 auto;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;padding-bottom:.4rem;padding-top:.4rem;transition:.2s ease-out;width:-webkit-max-content;width:-moz-max-content;width:max-content}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.2rem}:host.text-size-xs{font-size:.8rem}:host.text-size-sm{font-size:1rem}:host.text-size-md{font-size:1.2rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray,:host.text-color-grey{color:#9e9e9e}:host.text-color-bright,:host.text-color-offWhite{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info,:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-danger,:host.text-color-error,:host.text-color-negative{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-billableCharge,:host.text-color-corporateUser,:host.text-color-credential,:host.text-color-distributionList,:host.text-color-earnCode,:host.text-color-invoiceStatement,:host.text-color-jobCode,:host.text-color-payableCharge,:host.text-color-person,:host.text-color-user{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}:host.novo-field-hint-end{align-content:end;justify-content:flex-end;order:1;text-align:right}"]
            },] }
];
NovoHintElement.propDecorators = {
    align: [{ type: Input }],
    id: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9maWVsZC9oaW50L2hpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQWFyQixNQUFNLE9BQU8sZUFBZTtJQVo1QjtRQWFFLHVFQUF1RTtRQUM5RCxVQUFLLEdBQW9CLE9BQU8sQ0FBQztRQUUxQyx1RkFBdUY7UUFDOUUsT0FBRSxHQUFXLGFBQWEsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUd0RCxDQUFDO0lBREMsUUFBUSxLQUFTLENBQUM7OztZQW5CbkIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixxQ0FBMEI7Z0JBRTFCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsV0FBVztvQkFDbEIsNkJBQTZCLEVBQUUsaUJBQWlCO29CQUNoRCxXQUFXLEVBQUUsSUFBSTtvQkFDakIscUVBQXFFO29CQUNyRSxjQUFjLEVBQUUsTUFBTTtpQkFDdkI7O2FBQ0Y7OztvQkFHRSxLQUFLO2lCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8taGludCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9oaW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oaW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1oaW50JyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGQtaGludC1lbmRdJzogJ2FsaWduID09PSBcImVuZFwiJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAvLyBSZW1vdmUgYWxpZ24gYXR0cmlidXRlIHRvIHByZXZlbnQgaXQgZnJvbSBpbnRlcmZlcmluZyB3aXRoIGxheW91dC5cbiAgICAnW2F0dHIuYWxpZ25dJzogJ251bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGludEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogV2hldGhlciB0byBhbGlnbiB0aGUgaGludCBsYWJlbCBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBsaW5lLiAqL1xuICBASW5wdXQoKSBhbGlnbjogJ3N0YXJ0JyB8ICdlbmQnID0gJ3N0YXJ0JztcblxuICAvKiogVW5pcXVlIElEIGZvciB0aGUgaGludC4gVXNlZCBmb3IgdGhlIGFyaWEtZGVzY3JpYmVkYnkgb24gdGhlIGZvcm0gZmllbGQgY29udHJvbC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBub3ZvLWhpbnQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIG5nT25Jbml0KCk6IGFueSB7fVxufVxuIl19