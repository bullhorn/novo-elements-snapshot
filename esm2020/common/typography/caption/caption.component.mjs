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
export class NovoCaption extends NovoBaseTextElement {
}
NovoCaption.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCaption, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoCaption.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoCaption, selector: "novo-caption,[novo-caption]", host: { classAttribute: "novo-caption" }, usesInheritance: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:inline;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--color-text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoCaption, decorators: [{
            type: Component,
            args: [{ selector: 'novo-caption,[novo-caption]', template: ` <ng-content></ng-content> `, host: {
                        class: 'novo-caption',
                    }, styles: [":host{display:inline;font-size:var(--font-size-caption);font-weight:400;line-height:1.375;color:var(--color-text-muted);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle}:host.text-capitalize{text-transform:capitalize}:host.text-uppercase{text-transform:uppercase}:host.text-nowrap{white-space:nowrap}:host.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host.text-size-default{font-size:inherit}:host.text-size-body{font-size:var(--font-size-body)}:host.text-size-xs{font-size:var(--font-size-xs)}:host.text-size-sm{font-size:var(--font-size-sm)}:host.text-size-md{font-size:var(--font-size-md)}:host.text-size-lg{font-size:var(--font-size-lg)}:host.text-size-xl{font-size:var(--font-size-xl)}:host.text-size-2xl{font-size:var(--font-size-2xl)}:host.text-size-3xl{font-size:var(--font-size-3xl)}:host.text-size-smaller{font-size:.8em}:host.text-size-larger{font-size:1.2em}:host.text-color-person{color:var(--color-person)}:host.text-color-company{color:var(--color-company)}:host.text-color-candidate{color:var(--color-candidate)}:host.text-color-lead{color:var(--color-lead)}:host.text-color-contact{color:var(--color-contact)}:host.text-color-clientcontact{color:var(--color-clientcontact)}:host.text-color-opportunity{color:var(--color-opportunity)}:host.text-color-job{color:var(--color-job)}:host.text-color-joborder{color:var(--color-joborder)}:host.text-color-submission{color:var(--color-submission)}:host.text-color-sendout{color:var(--color-sendout)}:host.text-color-placement{color:var(--color-placement)}:host.text-color-note{color:var(--color-note)}:host.text-color-task{color:var(--color-task)}:host.text-color-distribution-list{color:var(--color-distribution-list)}:host.text-color-credential{color:var(--color-credential)}:host.text-color-user{color:var(--color-user)}:host.text-color-corporate-user{color:var(--color-corporate-user)}:host.text-color-contract{color:var(--color-contract)}:host.text-color-job-code{color:var(--color-job-code)}:host.text-color-earn-code{color:var(--color-earn-code)}:host.text-color-billable-charge{color:var(--color-billable-charge)}:host.text-color-payable-charge{color:var(--color-payable-charge)}:host.text-color-invoice-statement{color:var(--color-invoice-statement)}:host.text-color-selection{color:var(--color-selection)}:host.text-color-positive{color:var(--color-positive)}:host.text-color-success{color:var(--color-success)}:host.text-color-warning{color:var(--color-warning)}:host.text-color-error{color:var(--color-error)}:host.text-color-info{color:var(--color-info)}:host.text-color-disabled{color:var(--color-disabled)}:host.text-color-red{color:var(--palette-red-50)}:host.text-color-pink{color:var(--palette-pink-50)}:host.text-color-orange{color:var(--palette-orange-50)}:host.text-color-yellow{color:var(--palette-yellow-50)}:host.text-color-green{color:var(--palette-green-50)}:host.text-color-teal{color:var(--palette-teal-50)}:host.text-color-blue{color:var(--palette-blue-50)}:host.text-color-aqua{color:var(--palette-aqua-50)}:host.text-color-indigo{color:var(--palette-indigo-50)}:host.text-color-violet{color:var(--palette-violet-50)}:host.text-color-gray{color:var(--palette-gray-50)}:host.margin-before{margin-top:.4rem}:host.margin-after{margin-bottom:.8rem}:host.text-length-small{max-width:40ch}:host.text-length-medium{max-width:55ch}:host.text-length-large{max-width:70ch}:host.text-weight-hairline{font-weight:100}:host.text-weight-thin{font-weight:200}:host.text-weight-light{font-weight:300}:host.text-weight-normal{font-weight:400}:host.text-weight-medium{font-weight:500}:host.text-weight-semibold{font-weight:600}:host.text-weight-bold{font-weight:700}:host.text-weight-extrabold{font-weight:800}:host.text-weight-heavy{font-weight:900}:host.text-weight-lighter{font-weight:lighter}:host.text-weight-bolder{font-weight:bolder}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vdHlwb2dyYXBoeS9jYXB0aW9uL2NhcHRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQUVsRTs7Ozs7Ozs7O0dBU0c7QUFVSCxNQUFNLE9BQU8sV0FBWSxTQUFRLG1CQUFtQjs7eUdBQXZDLFdBQVc7NkZBQVgsV0FBVyxvSUFOWiw2QkFBNkI7NEZBTTVCLFdBQVc7a0JBUnZCLFNBQVM7K0JBQ0UsNkJBQTZCLFlBQzdCLDZCQUE2QixRQUVqQzt3QkFDSixLQUFLLEVBQUUsY0FBYztxQkFDdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0Jhc2VUZXh0RWxlbWVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS10ZXh0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGFnIEV4YW1wbGVcbiAqIDxub3ZvLXRpdGxlIHNpemU9XCJzbVwiIGRpc2FibGVkPkxhYmVsPC9ub3ZvLXRpdGxlXG4gKiA8bm92by10aXRsZSBzbWFsbCBkaXNhYmxlZD5MYWJlbDwvbm92by10aXRsZT5cbiAqIDxub3ZvLXRpdGxlIGxhcmdlIGRpc2FibGVkPkxhYmVsPC9ub3ZvLXRpdGxlPlxuICogPG5vdm8tdGl0bGUgZXJyb3I+TGFiZWw8L25vdm8tdGl0bGU+XG4gKiA8bm92by10aXRsZSBtdXRlZD5MYWJlbDwvbm92by10aXRsZT5cbiAqIDxub3ZvLXRpdGxlIGNsYXNzPVwidGMtZ3JhcGVmcnVpdFwiPkxhYmVsPC9ub3ZvLXRpdGxlPlxuICogPG5vdm8tdGl0bGUgY29sb3I9XCJncmFwZWZydWl0XCI+TGFiZWw8L25vdm8tdGl0bGU+XG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1jYXB0aW9uLFtub3ZvLWNhcHRpb25dJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBzdHlsZVVybHM6IFsnLi9jYXB0aW9uLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbm92by1jYXB0aW9uJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0NhcHRpb24gZXh0ZW5kcyBOb3ZvQmFzZVRleHRFbGVtZW50IHt9XG4iXX0=