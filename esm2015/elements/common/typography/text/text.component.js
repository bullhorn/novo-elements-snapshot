import { __decorate, __metadata } from "tslib";
// NG2
import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput } from '../../../../utils';
import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
const _c0 = ["*"];
/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
export class NovoText extends NovoBaseTextElement {
}
NovoText.ɵfac = function NovoText_Factory(t) { return ɵNovoText_BaseFactory(t || NovoText); };
NovoText.ɵcmp = i0.ɵɵdefineComponent({ type: NovoText, selectors: [["novo-text"], ["", "novo-text", ""]], hostVars: 2, hostBindings: function NovoText_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("text-block", ctx.block);
    } }, inputs: { block: "block" }, features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoText_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{color:inherit;display:inline;font-family:Roboto,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.5rem}.text-block[_nghost-%COMP%]{display:block;line-height:1.5rem;max-width:75ch;min-width:55ch}[_nghost-%COMP%]  novo-icon{font-size:1.2em;vertical-align:top}.text-size-default[_nghost-%COMP%]{font-size:1.2rem}.text-size-small[_nghost-%COMP%]{font-size:1rem}.text-size-large[_nghost-%COMP%]{font-size:1.4rem}.text-color-company[_nghost-%COMP%]{color:#39d}.text-color-candidate[_nghost-%COMP%]{color:#4b7}.text-color-navigation[_nghost-%COMP%]{color:#2f384f}.text-color-lead[_nghost-%COMP%]{color:#a69}.text-color-contact[_nghost-%COMP%]{color:#fa4}.text-color-opportunity[_nghost-%COMP%]{color:#625}.text-color-job[_nghost-%COMP%]{color:#b56}.text-color-earnCode[_nghost-%COMP%], .text-color-jobCode[_nghost-%COMP%]{color:#696d79}.text-color-sendout[_nghost-%COMP%]{color:#747884}.text-color-placement[_nghost-%COMP%]{color:#0b344f}.text-color-corporateuser[_nghost-%COMP%], .text-color-credential[_nghost-%COMP%], .text-color-distributionList[_nghost-%COMP%], .text-color-task[_nghost-%COMP%], .text-color-user[_nghost-%COMP%]{color:#4f5361}.text-color-aqua[_nghost-%COMP%]{color:#3bafda}.text-color-ocean[_nghost-%COMP%]{color:#4a89dc}.text-color-mint[_nghost-%COMP%]{color:#37bc9b}.text-color-grass[_nghost-%COMP%]{color:#8cc152}.text-color-sunflower[_nghost-%COMP%]{color:#f6b042}.text-color-bittersweet[_nghost-%COMP%]{color:#eb6845}.text-color-grapefruit[_nghost-%COMP%]{color:#da4453}.text-color-carnation[_nghost-%COMP%]{color:#d770ad}.text-color-lavender[_nghost-%COMP%]{color:#967adc}.text-color-positive[_nghost-%COMP%]{color:#4a89dc}.text-color-success[_nghost-%COMP%]{color:#8cc152}.text-color-negative[_nghost-%COMP%]{color:#da4453}.text-color-warning[_nghost-%COMP%]{color:#f6b042}.text-color-black[_nghost-%COMP%]{color:#000}.text-color-dark[_nghost-%COMP%]{color:#3d464d}.text-color-pulse[_nghost-%COMP%]{color:#3bafda}.text-color-neutral[_nghost-%COMP%]{color:#4f5361}.text-color-navy[_nghost-%COMP%]{color:#0d2d42}.text-color-contract[_nghost-%COMP%]{color:#454ea0}.text-color-mountain[_nghost-%COMP%]{color:#9678b6}.text-color-billableCharge[_nghost-%COMP%], .text-color-invoiceStatement[_nghost-%COMP%], .text-color-payableCharge[_nghost-%COMP%]{color:#696d79}.text-color-submission[_nghost-%COMP%]{color:#a9adbb}.text-color-note[_nghost-%COMP%]{color:#747884}.text-color-ash[_nghost-%COMP%]{color:#a0a0a0}.text-color-slate[_nghost-%COMP%]{color:#707070}.text-color-charcoal[_nghost-%COMP%]{color:#282828}.text-color-midnight[_nghost-%COMP%]{color:#0b0f1a}.text-color-background[_nghost-%COMP%]{color:#f4f4f4}.text-color-background-dark[_nghost-%COMP%]{color:#e2e2e2}.text-color-white[_nghost-%COMP%]{color:#fff}.text-color-grey[_nghost-%COMP%]{color:#999}.text-color-off-white[_nghost-%COMP%]{color:#f4f4f4}.text-color-light[_nghost-%COMP%]{color:#bebebe}.text-color-empty[_nghost-%COMP%]{color:#cccdcc}.text-color-disabled[_nghost-%COMP%]{color:#bebebe}.text-color-sand[_nghost-%COMP%]{color:#f4f4f4}.text-color-silver[_nghost-%COMP%]{color:#e2e2e2}.text-color-stone[_nghost-%COMP%]{color:#bebebe}.text-weight-thin[_nghost-%COMP%]{font-weight:200}.text-weight-default[_nghost-%COMP%]{font-weight:400}.text-weight-medium[_nghost-%COMP%]{font-weight:500}.text-weight-bold[_nghost-%COMP%]{font-weight:700}.margin-before[_nghost-%COMP%]{margin-top:.4rem}.margin-after[_nghost-%COMP%]{margin-bottom:.8rem}.text-length-small[_nghost-%COMP%]{max-width:40ch}.text-length-medium[_nghost-%COMP%]{max-width:55ch}.text-length-large[_nghost-%COMP%]{max-width:70ch}"] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoText.prototype, "block", void 0);
const ɵNovoText_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoText);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoText, [{
        type: Component,
        args: [{
                selector: 'novo-text,[novo-text]',
                template: ` <ng-content></ng-content> `,
                styleUrls: ['./text.scss'],
            }]
    }], null, { block: [{
            type: HostBinding,
            args: ['class.text-block']
        }, {
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvY29tbW9uL3R5cG9ncmFwaHkvdGV4dC90ZXh0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUVsRTs7Ozs7Ozs7O0dBU0c7QUFPSCxNQUFNLE9BQU8sUUFBUyxTQUFRLG1CQUFtQjs7aUZBQXBDLFFBQVE7NkNBQVIsUUFBUTs7OztRQUhQLGtCQUFZOztBQU94QjtJQURDLFlBQVksRUFBRTs7dUNBQ0E7cUVBSkosUUFBUTtrREFBUixRQUFRO2NBTHBCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDM0I7Z0JBS0MsS0FBSztrQkFISixXQUFXO21CQUFDLGtCQUFrQjs7a0JBQzlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscyc7XG5pbXBvcnQgeyBOb3ZvQmFzZVRleHRFbGVtZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLXRleHQuY29tcG9uZW50JztcblxuLyoqXG4gKiBUYWcgRXhhbXBsZVxuICogPG5vdm8tdGV4dCBzaXplPVwic21hbGxcIiBkaXNhYmxlZD5MYWJlbDwvbm92by10ZXh0XG4gKiA8bm92by10ZXh0IHNtYWxsIGRpc2FibGVkPkxhYmVsPC9ub3ZvLXRleHQ+XG4gKiA8bm92by10ZXh0IGxhcmdlIGRpc2FibGVkPkxhYmVsPC9ub3ZvLXRleHQ+XG4gKiA8bm92by10ZXh0IGVycm9yPkxhYmVsPC9ub3ZvLXRleHQ+XG4gKiA8bm92by10ZXh0IG11dGVkPkxhYmVsPC9ub3ZvLXRleHQ+XG4gKiA8bm92by10ZXh0IGNsYXNzPVwidGMtZ3JhcGVmcnVpdFwiPkxhYmVsPC9ub3ZvLXRleHQ+XG4gKiA8bm92by10ZXh0IGNvbG9yPVwiZ3JhcGVmcnVpdFwiPkxhYmVsPC9ub3ZvLXRleHQ+XG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10ZXh0LFtub3ZvLXRleHRdJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBzdHlsZVVybHM6IFsnLi90ZXh0LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RleHQgZXh0ZW5kcyBOb3ZvQmFzZVRleHRFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LWJsb2NrJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGJsb2NrOiBib29sZWFuO1xufVxuIl19