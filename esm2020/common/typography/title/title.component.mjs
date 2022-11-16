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
}
NovoTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTitle, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoTitle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTitle, selector: "novo-title,[novo-title]", host: { classAttribute: "novo-title" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTitle, decorators: [{
            type: Component,
            args: [{ selector: 'novo-title,[novo-title]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-title',
                    }, styles: [":host{display:block;font-weight:500;line-height:1.5;color:var(--color-text);white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-title);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tbW9uL3R5cG9ncmFwaHkvdGl0bGUvdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUVsRTs7Ozs7Ozs7O0dBU0c7QUFVSCxNQUFNLE9BQU8sU0FBVSxTQUFRLG1CQUFtQjtJQVJsRDs7UUFTRSxXQUFNLEdBQXFCLFFBQVEsQ0FBQztLQUNyQzs7dUdBRlksU0FBUzsyRkFBVCxTQUFTLDhIQU5WLDZCQUE2Qjs0RkFNNUIsU0FBUztrQkFSckIsU0FBUzsrQkFDRSx5QkFBeUIsWUFDekIsNkJBQTZCLFFBRWpDO3dCQUNKLEtBQUssRUFBRSxZQUFZO3FCQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUeXBvZ3JhcGh5V2VpZ2h0IH0gZnJvbSAnLi4vdGV4dC50eXBlcyc7XG5pbXBvcnQgeyBOb3ZvQmFzZVRleHRFbGVtZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLXRleHQuY29tcG9uZW50JztcblxuLyoqXG4gKiBUYWcgRXhhbXBsZVxuICogPG5vdm8tdGl0bGUgc2l6ZT1cInNtXCIgZGlzYWJsZWQ+TGFiZWw8L25vdm8tdGl0bGVcbiAqIDxub3ZvLXRpdGxlIHNtYWxsIGRpc2FibGVkPkxhYmVsPC9ub3ZvLXRpdGxlPlxuICogPG5vdm8tdGl0bGUgbGFyZ2UgZGlzYWJsZWQ+TGFiZWw8L25vdm8tdGl0bGU+XG4gKiA8bm92by10aXRsZSBlcnJvcj5MYWJlbDwvbm92by10aXRsZT5cbiAqIDxub3ZvLXRpdGxlIG11dGVkPkxhYmVsPC9ub3ZvLXRpdGxlPlxuICogPG5vdm8tdGl0bGUgY2xhc3M9XCJ0Yy1ncmFwZWZydWl0XCI+TGFiZWw8L25vdm8tdGl0bGU+XG4gKiA8bm92by10aXRsZSBjb2xvcj1cImdyYXBlZnJ1aXRcIj5MYWJlbDwvbm92by10aXRsZT5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpdGxlLFtub3ZvLXRpdGxlXScsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgc3R5bGVVcmxzOiBbJy4vdGl0bGUuc2NzcyddLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLXRpdGxlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpdGxlIGV4dGVuZHMgTm92b0Jhc2VUZXh0RWxlbWVudCB7XG4gIHdlaWdodDogVHlwb2dyYXBoeVdlaWdodCA9ICdtZWRpdW0nO1xufVxuIl19