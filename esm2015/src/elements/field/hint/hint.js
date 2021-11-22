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
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{color:var(--text-muted,#3d464d);color:#9e9e9e;display:flex;flex:1 0 auto;font-size:.8rem;font-size:.9rem;font-weight:400;line-height:1.375;padding-bottom:.4rem;padding-top:.4rem;width:-webkit-max-content;width:-moz-max-content;width:max-content}:host.novo-field-hint-end{align-content:end;justify-content:flex-end;order:1;text-align:right}"]
            },] }
];
NovoHintElement.propDecorators = {
    align: [{ type: Input }],
    id: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9maWVsZC9oaW50L2hpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQWFyQixNQUFNLE9BQU8sZUFBZTtJQVo1QjtRQWFFLHVFQUF1RTtRQUM5RCxVQUFLLEdBQW9CLE9BQU8sQ0FBQztRQUUxQyx1RkFBdUY7UUFDOUUsT0FBRSxHQUFXLGFBQWEsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUd0RCxDQUFDO0lBREMsUUFBUSxLQUFTLENBQUM7OztZQW5CbkIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixxQ0FBMEI7Z0JBRTFCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsV0FBVztvQkFDbEIsNkJBQTZCLEVBQUUsaUJBQWlCO29CQUNoRCxXQUFXLEVBQUUsSUFBSTtvQkFDakIscUVBQXFFO29CQUNyRSxjQUFjLEVBQUUsTUFBTTtpQkFDdkI7O2FBQ0Y7OztvQkFHRSxLQUFLO2lCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8taGludCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9oaW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oaW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1oaW50JyxcbiAgICAnW2NsYXNzLm5vdm8tZmllbGQtaGludC1lbmRdJzogJ2FsaWduID09PSBcImVuZFwiJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAvLyBSZW1vdmUgYWxpZ24gYXR0cmlidXRlIHRvIHByZXZlbnQgaXQgZnJvbSBpbnRlcmZlcmluZyB3aXRoIGxheW91dC5cbiAgICAnW2F0dHIuYWxpZ25dJzogJ251bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGludEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogV2hldGhlciB0byBhbGlnbiB0aGUgaGludCBsYWJlbCBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBsaW5lLiAqL1xuICBASW5wdXQoKSBhbGlnbjogJ3N0YXJ0JyB8ICdlbmQnID0gJ3N0YXJ0JztcblxuICAvKiogVW5pcXVlIElEIGZvciB0aGUgaGludC4gVXNlZCBmb3IgdGhlIGFyaWEtZGVzY3JpYmVkYnkgb24gdGhlIGZvcm0gZmllbGQgY29udHJvbC4gKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBub3ZvLWhpbnQtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIG5nT25Jbml0KCk6IGFueSB7fVxufVxuIl19