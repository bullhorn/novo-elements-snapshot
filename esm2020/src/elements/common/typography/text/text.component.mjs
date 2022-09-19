import { __decorate, __metadata } from "tslib";
// NG2
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { BooleanInput } from '../../../../utils/decorators';
import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
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
NovoText.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoText, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoText.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoText, selector: "novo-text,[novo-text]", inputs: { block: "block" }, host: { properties: { "class.text-block": "this.block" }, classAttribute: "novo-text" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [".novo-text{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}.novo-text.text-capitalize{text-transform:capitalize}.novo-text.text-uppercase{text-transform:uppercase}.novo-text.text-nowrap{white-space:nowrap}.novo-text.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-text.text-size-default{font-size:inherit}.novo-text.text-size-body{font-size:1.3rem}.novo-text.text-size-xs{font-size:1rem}.novo-text.text-size-sm{font-size:1.2rem}.novo-text.text-size-md{font-size:1.3rem}.novo-text.text-size-lg{font-size:1.6rem}.novo-text.text-size-xl{font-size:2rem}.novo-text.text-size-2xl{font-size:2.6rem}.novo-text.text-size-3xl{font-size:3.2rem}.novo-text.text-size-smaller{font-size:.8em}.novo-text.text-size-larger{font-size:1.2em}.novo-text.text-color-black{color:#000}.novo-text.text-color-white{color:#fff}.novo-text.text-color-gray,.novo-text.text-color-grey{color:#9e9e9e}.novo-text.text-color-offWhite,.novo-text.text-color-bright{color:#f7f7f7}.novo-text.text-color-light{color:#dbdbdb}.novo-text.text-color-neutral{color:#4f5361}.novo-text.text-color-dark{color:#3d464d}.novo-text.text-color-orange{color:#ff6900}.novo-text.text-color-navigation{color:#202945}.novo-text.text-color-skyBlue{color:#009bdf}.novo-text.text-color-steel{color:#5b6770}.novo-text.text-color-metal{color:#637893}.novo-text.text-color-sand{color:#f4f4f4}.novo-text.text-color-silver{color:#e2e2e2}.novo-text.text-color-stone{color:#bebebe}.novo-text.text-color-ash{color:#a0a0a0}.novo-text.text-color-slate{color:#707070}.novo-text.text-color-onyx{color:#526980}.novo-text.text-color-charcoal{color:#282828}.novo-text.text-color-moonlight{color:#1a242f}.novo-text.text-color-midnight{color:#202945}.novo-text.text-color-darkness{color:#161f27}.novo-text.text-color-navy{color:#0d2d42}.novo-text.text-color-aqua{color:#3bafda}.novo-text.text-color-ocean{color:#4a89dc}.novo-text.text-color-mint{color:#37bc9b}.novo-text.text-color-grass{color:#8cc152}.novo-text.text-color-sunflower{color:#f6b042}.novo-text.text-color-bittersweet{color:#eb6845}.novo-text.text-color-grapefruit{color:#da4453}.novo-text.text-color-carnation{color:#d770ad}.novo-text.text-color-lavender{color:#967adc}.novo-text.text-color-mountain{color:#9678b6}.novo-text.text-color-info,.novo-text.text-color-positive{color:#4a89dc}.novo-text.text-color-success{color:#8cc152}.novo-text.text-color-negative,.novo-text.text-color-danger,.novo-text.text-color-error{color:#da4453}.novo-text.text-color-warning{color:#f6b042}.novo-text.text-color-empty{color:#cccdcc}.novo-text.text-color-disabled{color:#bebebe}.novo-text.text-color-background{color:#f7f7f7}.novo-text.text-color-backgroundDark{color:#e2e2e2}.novo-text.text-color-presentation{color:#5b6770}.novo-text.text-color-bullhorn{color:#ff6900}.novo-text.text-color-pulse{color:#3bafda}.novo-text.text-color-company{color:#39d}.novo-text.text-color-candidate{color:#4b7}.novo-text.text-color-lead{color:#a69}.novo-text.text-color-contact,.novo-text.text-color-clientcontact{color:#fa4}.novo-text.text-color-opportunity{color:#625}.novo-text.text-color-job,.novo-text.text-color-joborder{color:#b56}.novo-text.text-color-submission{color:#a9adbb}.novo-text.text-color-sendout{color:#747884}.novo-text.text-color-placement{color:#0b344f}.novo-text.text-color-note{color:#747884}.novo-text.text-color-contract{color:#454ea0}.novo-text.text-color-jobCode,.novo-text.text-color-earnCode,.novo-text.text-color-invoiceStatement,.novo-text.text-color-billableCharge,.novo-text.text-color-payableCharge,.novo-text.text-color-user,.novo-text.text-color-corporateUser,.novo-text.text-color-distributionList,.novo-text.text-color-credential,.novo-text.text-color-person{color:#696d79}.novo-text.margin-before{margin-top:.4rem}.novo-text.margin-after{margin-bottom:.8rem}.novo-text.text-length-small{max-width:40ch}.novo-text.text-length-medium{max-width:55ch}.novo-text.text-length-large{max-width:70ch}.novo-text.text-weight-hairline{font-weight:100}.novo-text.text-weight-thin{font-weight:200}.novo-text.text-weight-light{font-weight:300}.novo-text.text-weight-normal{font-weight:400}.novo-text.text-weight-medium{font-weight:500}.novo-text.text-weight-semibold{font-weight:600}.novo-text.text-weight-bold{font-weight:700}.novo-text.text-weight-extrabold{font-weight:800}.novo-text.text-weight-heavy{font-weight:900}.novo-text.text-weight-lighter{font-weight:lighter}.novo-text.text-weight-bolder{font-weight:bolder}.novo-text.text-block{display:block;line-height:1.375em;min-width:55ch;max-width:75ch}\n"], encapsulation: i0.ViewEncapsulation.None });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoText.prototype, "block", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoText, decorators: [{
            type: Component,
            args: [{ selector: 'novo-text,[novo-text]', template: ` <ng-content></ng-content> `, encapsulation: ViewEncapsulation.None, host: {
                        class: 'novo-text',
                    }, styles: [".novo-text{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}.novo-text.text-capitalize{text-transform:capitalize}.novo-text.text-uppercase{text-transform:uppercase}.novo-text.text-nowrap{white-space:nowrap}.novo-text.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.novo-text.text-size-default{font-size:inherit}.novo-text.text-size-body{font-size:1.3rem}.novo-text.text-size-xs{font-size:1rem}.novo-text.text-size-sm{font-size:1.2rem}.novo-text.text-size-md{font-size:1.3rem}.novo-text.text-size-lg{font-size:1.6rem}.novo-text.text-size-xl{font-size:2rem}.novo-text.text-size-2xl{font-size:2.6rem}.novo-text.text-size-3xl{font-size:3.2rem}.novo-text.text-size-smaller{font-size:.8em}.novo-text.text-size-larger{font-size:1.2em}.novo-text.text-color-black{color:#000}.novo-text.text-color-white{color:#fff}.novo-text.text-color-gray,.novo-text.text-color-grey{color:#9e9e9e}.novo-text.text-color-offWhite,.novo-text.text-color-bright{color:#f7f7f7}.novo-text.text-color-light{color:#dbdbdb}.novo-text.text-color-neutral{color:#4f5361}.novo-text.text-color-dark{color:#3d464d}.novo-text.text-color-orange{color:#ff6900}.novo-text.text-color-navigation{color:#202945}.novo-text.text-color-skyBlue{color:#009bdf}.novo-text.text-color-steel{color:#5b6770}.novo-text.text-color-metal{color:#637893}.novo-text.text-color-sand{color:#f4f4f4}.novo-text.text-color-silver{color:#e2e2e2}.novo-text.text-color-stone{color:#bebebe}.novo-text.text-color-ash{color:#a0a0a0}.novo-text.text-color-slate{color:#707070}.novo-text.text-color-onyx{color:#526980}.novo-text.text-color-charcoal{color:#282828}.novo-text.text-color-moonlight{color:#1a242f}.novo-text.text-color-midnight{color:#202945}.novo-text.text-color-darkness{color:#161f27}.novo-text.text-color-navy{color:#0d2d42}.novo-text.text-color-aqua{color:#3bafda}.novo-text.text-color-ocean{color:#4a89dc}.novo-text.text-color-mint{color:#37bc9b}.novo-text.text-color-grass{color:#8cc152}.novo-text.text-color-sunflower{color:#f6b042}.novo-text.text-color-bittersweet{color:#eb6845}.novo-text.text-color-grapefruit{color:#da4453}.novo-text.text-color-carnation{color:#d770ad}.novo-text.text-color-lavender{color:#967adc}.novo-text.text-color-mountain{color:#9678b6}.novo-text.text-color-info,.novo-text.text-color-positive{color:#4a89dc}.novo-text.text-color-success{color:#8cc152}.novo-text.text-color-negative,.novo-text.text-color-danger,.novo-text.text-color-error{color:#da4453}.novo-text.text-color-warning{color:#f6b042}.novo-text.text-color-empty{color:#cccdcc}.novo-text.text-color-disabled{color:#bebebe}.novo-text.text-color-background{color:#f7f7f7}.novo-text.text-color-backgroundDark{color:#e2e2e2}.novo-text.text-color-presentation{color:#5b6770}.novo-text.text-color-bullhorn{color:#ff6900}.novo-text.text-color-pulse{color:#3bafda}.novo-text.text-color-company{color:#39d}.novo-text.text-color-candidate{color:#4b7}.novo-text.text-color-lead{color:#a69}.novo-text.text-color-contact,.novo-text.text-color-clientcontact{color:#fa4}.novo-text.text-color-opportunity{color:#625}.novo-text.text-color-job,.novo-text.text-color-joborder{color:#b56}.novo-text.text-color-submission{color:#a9adbb}.novo-text.text-color-sendout{color:#747884}.novo-text.text-color-placement{color:#0b344f}.novo-text.text-color-note{color:#747884}.novo-text.text-color-contract{color:#454ea0}.novo-text.text-color-jobCode,.novo-text.text-color-earnCode,.novo-text.text-color-invoiceStatement,.novo-text.text-color-billableCharge,.novo-text.text-color-payableCharge,.novo-text.text-color-user,.novo-text.text-color-corporateUser,.novo-text.text-color-distributionList,.novo-text.text-color-credential,.novo-text.text-color-person{color:#696d79}.novo-text.margin-before{margin-top:.4rem}.novo-text.margin-after{margin-bottom:.8rem}.novo-text.text-length-small{max-width:40ch}.novo-text.text-length-medium{max-width:55ch}.novo-text.text-length-large{max-width:70ch}.novo-text.text-weight-hairline{font-weight:100}.novo-text.text-weight-thin{font-weight:200}.novo-text.text-weight-light{font-weight:300}.novo-text.text-weight-normal{font-weight:400}.novo-text.text-weight-medium{font-weight:500}.novo-text.text-weight-semibold{font-weight:600}.novo-text.text-weight-bold{font-weight:700}.novo-text.text-weight-extrabold{font-weight:800}.novo-text.text-weight-heavy{font-weight:900}.novo-text.text-weight-lighter{font-weight:lighter}.novo-text.text-weight-bolder{font-weight:bolder}.novo-text.text-block{display:block;line-height:1.375em;min-width:55ch;max-width:75ch}\n"] }]
        }], propDecorators: { block: [{
                type: HostBinding,
                args: ['class.text-block']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9jb21tb24vdHlwb2dyYXBoeS90ZXh0L3RleHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFFbEU7Ozs7Ozs7OztHQVNHO0FBV0gsTUFBTSxPQUFPLFFBQVMsU0FBUSxtQkFBbUI7O3NHQUFwQyxRQUFROzBGQUFSLFFBQVEseU1BUFQsNkJBQTZCO0FBV3ZDO0lBREMsWUFBWSxFQUFFOzt1Q0FDQTs0RkFKSixRQUFRO2tCQVRwQixTQUFTOytCQUNFLHVCQUF1QixZQUN2Qiw2QkFBNkIsaUJBRXhCLGlCQUFpQixDQUFDLElBQUksUUFDL0I7d0JBQ0osS0FBSyxFQUFFLFdBQVc7cUJBQ25COzhCQU1ELEtBQUs7c0JBSEosV0FBVzt1QkFBQyxrQkFBa0I7O3NCQUM5QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2RlY29yYXRvcnMnO1xuaW1wb3J0IHsgTm92b0Jhc2VUZXh0RWxlbWVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS10ZXh0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGFnIEV4YW1wbGVcbiAqIDxub3ZvLXRleHQgc2l6ZT1cInNtYWxsXCIgZGlzYWJsZWQ+TGFiZWw8L25vdm8tdGV4dFxuICogPG5vdm8tdGV4dCBzbWFsbCBkaXNhYmxlZD5MYWJlbDwvbm92by10ZXh0PlxuICogPG5vdm8tdGV4dCBsYXJnZSBkaXNhYmxlZD5MYWJlbDwvbm92by10ZXh0PlxuICogPG5vdm8tdGV4dCBlcnJvcj5MYWJlbDwvbm92by10ZXh0PlxuICogPG5vdm8tdGV4dCBtdXRlZD5MYWJlbDwvbm92by10ZXh0PlxuICogPG5vdm8tdGV4dCBjbGFzcz1cInRjLWdyYXBlZnJ1aXRcIj5MYWJlbDwvbm92by10ZXh0PlxuICogPG5vdm8tdGV4dCBjb2xvcj1cImdyYXBlZnJ1aXRcIj5MYWJlbDwvbm92by10ZXh0PlxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGV4dCxbbm92by10ZXh0XScsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tdGV4dCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UZXh0IGV4dGVuZHMgTm92b0Jhc2VUZXh0RWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MudGV4dC1ibG9jaycpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBibG9jazogYm9vbGVhbjtcbn1cbiJdfQ==