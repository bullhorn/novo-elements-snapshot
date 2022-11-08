import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export class TypographyDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
}
TypographyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TypographyDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
TypographyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: TypographyDirective, selector: "[fontWeight],[lineHeight],[textAlign],[textAlign],[fontStyle],[textTransform]", inputs: { fontWeight: "fontWeight", lineHeight: "lineHeight", textAlign: "textAlign", fontStyle: "fontStyle", textTransform: "textTransform" }, host: { properties: { "style.fontWeight": "this.fontWeight", "style.lineHeight": "this.lineHeight", "style.textAlign": "this.textAlign", "style.fontStyle": "this.fontStyle", "style.textTransform": "this.textTransform" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: TypographyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 
                    // tslint:disable-next-line: directive-selector
                    '[fontWeight],[lineHeight],[textAlign],[textAlign],[fontStyle],[textTransform]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { fontWeight: [{
                type: HostBinding,
                args: ['style.fontWeight']
            }, {
                type: Input
            }], lineHeight: [{
                type: HostBinding,
                args: ['style.lineHeight']
            }, {
                type: Input
            }], textAlign: [{
                type: HostBinding,
                args: ['style.textAlign']
            }, {
                type: Input
            }], fontStyle: [{
                type: HostBinding,
                args: ['style.fontStyle']
            }, {
                type: Input
            }], textTransform: [{
                type: HostBinding,
                args: ['style.textTransform']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy90eXBvZ3JhcGh5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPckYsTUFBTSxPQUFPLG1CQUFtQjtJQXFCOUIsWUFBNkIsRUFBYyxFQUFtQixRQUFtQjtRQUFwRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQW1CLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDOztpSEFyQjFFLG1CQUFtQjtxR0FBbkIsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBTC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUTtvQkFDTiwrQ0FBK0M7b0JBQy9DLCtFQUErRTtpQkFDbEY7eUhBSUMsVUFBVTtzQkFGVCxXQUFXO3VCQUFDLGtCQUFrQjs7c0JBQzlCLEtBQUs7Z0JBS04sVUFBVTtzQkFGVCxXQUFXO3VCQUFDLGtCQUFrQjs7c0JBQzlCLEtBQUs7Z0JBS04sU0FBUztzQkFGUixXQUFXO3VCQUFDLGlCQUFpQjs7c0JBQzdCLEtBQUs7Z0JBS04sU0FBUztzQkFGUixXQUFXO3VCQUFDLGlCQUFpQjs7c0JBQzdCLEtBQUs7Z0JBS04sYUFBYTtzQkFGWixXQUFXO3VCQUFDLHFCQUFxQjs7c0JBQ2pDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICAgICdbZm9udFdlaWdodF0sW2xpbmVIZWlnaHRdLFt0ZXh0QWxpZ25dLFt0ZXh0QWxpZ25dLFtmb250U3R5bGVdLFt0ZXh0VHJhbnNmb3JtXScsXG59KVxuZXhwb3J0IGNsYXNzIFR5cG9ncmFwaHlEaXJlY3RpdmUge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZvbnRXZWlnaHQnKVxuICBASW5wdXQoKVxuICBmb250V2VpZ2h0OiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5saW5lSGVpZ2h0JylcbiAgQElucHV0KClcbiAgbGluZUhlaWdodDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUudGV4dEFsaWduJylcbiAgQElucHV0KClcbiAgdGV4dEFsaWduOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mb250U3R5bGUnKVxuICBASW5wdXQoKVxuICBmb250U3R5bGU6IHN0cmluZztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnRleHRUcmFuc2Zvcm0nKVxuICBASW5wdXQoKVxuICB0ZXh0VHJhbnNmb3JtOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxufVxuIl19