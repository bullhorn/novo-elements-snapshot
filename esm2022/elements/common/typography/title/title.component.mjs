// NG2
import { Component } from '@angular/core';
import { NovoBaseTextElement } from '../base/base-text.component';
import * as i0 from "@angular/core";
/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
export class NovoTitle extends NovoBaseTextElement {
    constructor() {
        super(...arguments);
        this.weight = 'medium';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoTitle, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: NovoTitle, selector: "novo-title,[novo-title]", host: { classAttribute: "novo-title" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NovoTitle, decorators: [{
            type: Component,
            args: [{ selector: 'novo-title,[novo-title]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-title',
                    }, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--text-main, #3d464d);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:1.3rem}:host.text-size-xs{font-size:1rem}:host.text-size-sm{font-size:1.2rem}:host.text-size-md{font-size:1.3rem}:host.text-size-lg{font-size:1.6rem}:host.text-size-xl{font-size:2rem}:host.text-size-2xl{font-size:2.6rem}:host.text-size-3xl{font-size:3.2rem}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-black{color:#000}:host.text-color-white{color:#fff}:host.text-color-gray{color:#9e9e9e}:host.text-color-grey{color:#9e9e9e}:host.text-color-offWhite{color:#f7f7f7}:host.text-color-bright{color:#f7f7f7}:host.text-color-light{color:#dbdbdb}:host.text-color-neutral{color:#4f5361}:host.text-color-dark{color:#3d464d}:host.text-color-orange{color:#ff6900}:host.text-color-navigation{color:#202945}:host.text-color-skyBlue{color:#009bdf}:host.text-color-steel{color:#5b6770}:host.text-color-metal{color:#637893}:host.text-color-sand{color:#f4f4f4}:host.text-color-silver{color:#e2e2e2}:host.text-color-stone{color:#bebebe}:host.text-color-ash{color:#a0a0a0}:host.text-color-slate{color:#707070}:host.text-color-onyx{color:#526980}:host.text-color-charcoal{color:#282828}:host.text-color-moonlight{color:#1a242f}:host.text-color-midnight{color:#202945}:host.text-color-darkness{color:#161f27}:host.text-color-navy{color:#0d2d42}:host.text-color-aqua{color:#3bafda}:host.text-color-ocean{color:#4a89dc}:host.text-color-mint{color:#37bc9b}:host.text-color-grass{color:#8cc152}:host.text-color-sunflower{color:#f6b042}:host.text-color-bittersweet{color:#eb6845}:host.text-color-grapefruit{color:#da4453}:host.text-color-carnation{color:#d770ad}:host.text-color-lavender{color:#967adc}:host.text-color-mountain{color:#9678b6}:host.text-color-info{color:#4a89dc}:host.text-color-positive{color:#4a89dc}:host.text-color-success{color:#8cc152}:host.text-color-negative{color:#da4453}:host.text-color-danger{color:#da4453}:host.text-color-error{color:#da4453}:host.text-color-warning{color:#f6b042}:host.text-color-empty{color:#cccdcc}:host.text-color-disabled{color:#bebebe}:host.text-color-background{color:#f7f7f7}:host.text-color-backgroundDark{color:#e2e2e2}:host.text-color-presentation{color:#5b6770}:host.text-color-bullhorn{color:#ff6900}:host.text-color-pulse{color:#3bafda}:host.text-color-company{color:#39d}:host.text-color-candidate{color:#4b7}:host.text-color-lead{color:#a69}:host.text-color-contact{color:#fa4}:host.text-color-clientcontact{color:#fa4}:host.text-color-opportunity{color:#625}:host.text-color-job{color:#b56}:host.text-color-joborder{color:#b56}:host.text-color-submission{color:#a9adbb}:host.text-color-sendout{color:#747884}:host.text-color-placement{color:#0b344f}:host.text-color-note{color:#747884}:host.text-color-contract{color:#454ea0}:host.text-color-jobCode{color:#696d79}:host.text-color-earnCode{color:#696d79}:host.text-color-invoiceStatement{color:#696d79}:host.text-color-billableCharge{color:#696d79}:host.text-color-payableCharge{color:#696d79}:host.text-color-user{color:#696d79}:host.text-color-corporateUser{color:#696d79}:host.text-color-distributionList{color:#696d79}:host.text-color-credential{color:#696d79}:host.text-color-person{color:#696d79}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY29tbW9uL3R5cG9ncmFwaHkvdGl0bGUvdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUdsRTs7Ozs7Ozs7O0dBU0c7QUFVSCxNQUFNLE9BQU8sU0FBVSxTQUFRLG1CQUFtQjtJQVJsRDs7UUFTRSxXQUFNLEdBQXFCLFFBQVEsQ0FBQztLQUNyQzsrR0FGWSxTQUFTO21HQUFULFNBQVMsOEhBTlYsNkJBQTZCOzs0RkFNNUIsU0FBUztrQkFSckIsU0FBUzsrQkFDRSx5QkFBeUIsWUFDekIsNkJBQTZCLFFBRWpDO3dCQUNKLEtBQUssRUFBRSxZQUFZO3FCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvQmFzZVRleHRFbGVtZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLXRleHQuY29tcG9uZW50JztcbmltcG9ydCB7IFR5cG9ncmFwaHlXZWlnaHQgfSBmcm9tICcuLi90ZXh0LnR5cGVzJztcblxuLyoqXG4gKiBUYWcgRXhhbXBsZVxuICogPG5vdm8tdGl0bGUgc2l6ZT1cInNtXCIgZGlzYWJsZWQ+TGFiZWw8L25vdm8tdGl0bGVcbiAqIDxub3ZvLXRpdGxlIHNtYWxsIGRpc2FibGVkPkxhYmVsPC9ub3ZvLXRpdGxlPlxuICogPG5vdm8tdGl0bGUgbGFyZ2UgZGlzYWJsZWQ+TGFiZWw8L25vdm8tdGl0bGU+XG4gKiA8bm92by10aXRsZSBlcnJvcj5MYWJlbDwvbm92by10aXRsZT5cbiAqIDxub3ZvLXRpdGxlIG11dGVkPkxhYmVsPC9ub3ZvLXRpdGxlPlxuICogPG5vdm8tdGl0bGUgY2xhc3M9XCJ0Yy1ncmFwZWZydWl0XCI+TGFiZWw8L25vdm8tdGl0bGU+XG4gKiA8bm92by10aXRsZSBjb2xvcj1cImdyYXBlZnJ1aXRcIj5MYWJlbDwvbm92by10aXRsZT5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpdGxlLFtub3ZvLXRpdGxlXScsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgc3R5bGVVcmxzOiBbJy4vdGl0bGUuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRpdGxlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpdGxlIGV4dGVuZHMgTm92b0Jhc2VUZXh0RWxlbWVudCB7XG4gIHdlaWdodDogVHlwb2dyYXBoeVdlaWdodCA9ICdtZWRpdW0nO1xufVxuIl19