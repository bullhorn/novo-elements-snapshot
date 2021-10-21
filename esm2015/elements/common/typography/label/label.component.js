// NG2
import { Component } from '@angular/core';
import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
const _c0 = ["*"];
/**
 * Tag Example
 * <novo-label size="sm" disabled>Label</novo-label
 * <novo-label small disabled>Label</novo-label>
 * <novo-label large disabled>Label</novo-label>
 * <novo-label error>Label</novo-label>
 * <novo-label muted>Label</novo-label>
 * <novo-label class="tc-grapefruit">Label</novo-label>
 * <novo-label color="grapefruit">Label</novo-label>
 */
export class NovoLabel extends NovoBaseTextElement {
}
NovoLabel.ɵfac = function NovoLabel_Factory(t) { return ɵNovoLabel_BaseFactory(t || NovoLabel); };
NovoLabel.ɵcmp = i0.ɵɵdefineComponent({ type: NovoLabel, selectors: [["novo-label"], ["", "novo-label", ""]], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoLabel_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{color:inherit;display:inline-block;font-family:Roboto,sans-serif;font-size:1.1rem;font-weight:500;line-height:1.2rem;overflow-wrap:break-word;text-transform:uppercase;transition:.2s ease-out;word-break:word-break}[_nghost-%COMP%]  novo-icon{font-size:1em;vertical-align:top}.text-size-default[_nghost-%COMP%]{font-size:1.1rem}.text-size-small[_nghost-%COMP%]{font-size:1rem}.text-size-large[_nghost-%COMP%]{font-size:1.2rem}.text-color-company[_nghost-%COMP%]{color:#39d}.text-color-candidate[_nghost-%COMP%]{color:#4b7}.text-color-navigation[_nghost-%COMP%]{color:#2f384f}.text-color-lead[_nghost-%COMP%]{color:#a69}.text-color-contact[_nghost-%COMP%]{color:#fa4}.text-color-opportunity[_nghost-%COMP%]{color:#625}.text-color-job[_nghost-%COMP%]{color:#b56}.text-color-earnCode[_nghost-%COMP%], .text-color-jobCode[_nghost-%COMP%]{color:#696d79}.text-color-sendout[_nghost-%COMP%]{color:#747884}.text-color-placement[_nghost-%COMP%]{color:#0b344f}.text-color-corporateuser[_nghost-%COMP%], .text-color-credential[_nghost-%COMP%], .text-color-distributionList[_nghost-%COMP%], .text-color-task[_nghost-%COMP%], .text-color-user[_nghost-%COMP%]{color:#4f5361}.text-color-aqua[_nghost-%COMP%]{color:#3bafda}.text-color-ocean[_nghost-%COMP%]{color:#4a89dc}.text-color-mint[_nghost-%COMP%]{color:#37bc9b}.text-color-grass[_nghost-%COMP%]{color:#8cc152}.text-color-sunflower[_nghost-%COMP%]{color:#f6b042}.text-color-bittersweet[_nghost-%COMP%]{color:#eb6845}.text-color-grapefruit[_nghost-%COMP%]{color:#da4453}.text-color-carnation[_nghost-%COMP%]{color:#d770ad}.text-color-lavender[_nghost-%COMP%]{color:#967adc}.text-color-positive[_nghost-%COMP%]{color:#4a89dc}.text-color-success[_nghost-%COMP%]{color:#8cc152}.text-color-negative[_nghost-%COMP%]{color:#da4453}.text-color-warning[_nghost-%COMP%]{color:#f6b042}.text-color-black[_nghost-%COMP%]{color:#000}.text-color-dark[_nghost-%COMP%]{color:#3d464d}.text-color-pulse[_nghost-%COMP%]{color:#3bafda}.text-color-neutral[_nghost-%COMP%]{color:#4f5361}.text-color-navy[_nghost-%COMP%]{color:#0d2d42}.text-color-contract[_nghost-%COMP%]{color:#454ea0}.text-color-mountain[_nghost-%COMP%]{color:#9678b6}.text-color-billableCharge[_nghost-%COMP%], .text-color-invoiceStatement[_nghost-%COMP%], .text-color-payableCharge[_nghost-%COMP%]{color:#696d79}.text-color-submission[_nghost-%COMP%]{color:#a9adbb}.text-color-note[_nghost-%COMP%]{color:#747884}.text-color-ash[_nghost-%COMP%]{color:#a0a0a0}.text-color-slate[_nghost-%COMP%]{color:#707070}.text-color-charcoal[_nghost-%COMP%]{color:#282828}.text-color-midnight[_nghost-%COMP%]{color:#0b0f1a}.text-color-background[_nghost-%COMP%]{color:#f4f4f4}.text-color-background-dark[_nghost-%COMP%]{color:#e2e2e2}.text-color-white[_nghost-%COMP%]{color:#fff}.text-color-grey[_nghost-%COMP%]{color:#999}.text-color-off-white[_nghost-%COMP%]{color:#f4f4f4}.text-color-light[_nghost-%COMP%]{color:#bebebe}.text-color-empty[_nghost-%COMP%]{color:#cccdcc}.text-color-disabled[_nghost-%COMP%]{color:#bebebe}.text-color-sand[_nghost-%COMP%]{color:#f4f4f4}.text-color-silver[_nghost-%COMP%]{color:#e2e2e2}.text-color-stone[_nghost-%COMP%]{color:#bebebe}.margin-before[_nghost-%COMP%]{margin-top:.4rem}.margin-after[_nghost-%COMP%]{margin-bottom:.8rem}"] });
const ɵNovoLabel_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoLabel);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoLabel, [{
        type: Component,
        args: [{
                selector: 'novo-label,[novo-label]',
                template: ` <ng-content></ng-content> `,
                styleUrls: ['./label.scss'],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbW1vbi90eXBvZ3JhcGh5L2xhYmVsL2xhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRWxFOzs7Ozs7Ozs7R0FTRztBQU9ILE1BQU0sT0FBTyxTQUFVLFNBQVEsbUJBQW1COztvRkFBckMsU0FBUzs4Q0FBVCxTQUFTOztRQUhSLGtCQUFZOztzRUFHYixTQUFTO2tEQUFULFNBQVM7Y0FMckIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQmFzZVRleHRFbGVtZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLXRleHQuY29tcG9uZW50JztcblxuLyoqXG4gKiBUYWcgRXhhbXBsZVxuICogPG5vdm8tbGFiZWwgc2l6ZT1cInNtXCIgZGlzYWJsZWQ+TGFiZWw8L25vdm8tbGFiZWxcbiAqIDxub3ZvLWxhYmVsIHNtYWxsIGRpc2FibGVkPkxhYmVsPC9ub3ZvLWxhYmVsPlxuICogPG5vdm8tbGFiZWwgbGFyZ2UgZGlzYWJsZWQ+TGFiZWw8L25vdm8tbGFiZWw+XG4gKiA8bm92by1sYWJlbCBlcnJvcj5MYWJlbDwvbm92by1sYWJlbD5cbiAqIDxub3ZvLWxhYmVsIG11dGVkPkxhYmVsPC9ub3ZvLWxhYmVsPlxuICogPG5vdm8tbGFiZWwgY2xhc3M9XCJ0Yy1ncmFwZWZydWl0XCI+TGFiZWw8L25vdm8tbGFiZWw+XG4gKiA8bm92by1sYWJlbCBjb2xvcj1cImdyYXBlZnJ1aXRcIj5MYWJlbDwvbm92by1sYWJlbD5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxhYmVsLFtub3ZvLWxhYmVsXScsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgc3R5bGVVcmxzOiBbJy4vbGFiZWwuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGFiZWwgZXh0ZW5kcyBOb3ZvQmFzZVRleHRFbGVtZW50IHt9XG4iXX0=