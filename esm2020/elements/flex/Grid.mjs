// NG2
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class NovoGridElement {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.direction = 'row';
        this.align = 'start';
        this.justify = 'flex-start';
        this.columns = '1';
    }
    get display() {
        return 'grid';
    }
    get hb_gridCols() {
        if (_isNumberValue(this.columns)) {
            return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, 1fr)`);
        }
        return this._sanitizer.bypassSecurityTrustStyle(`${this.columns}`);
    }
}
NovoGridElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoGridElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoGridElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoGridElement, selector: "novo-grid", inputs: { direction: "direction", align: "align", justify: "justify", columns: "columns" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.grid-template-columns": "this.hb_gridCols" } }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoGridElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-grid',
                    template: ` <ng-content></ng-content> `,
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; }, propDecorators: { display: [{
                type: HostBinding,
                args: ['style.display']
            }], direction: [{
                type: HostBinding,
                args: ['style.flex-direction']
            }, {
                type: Input
            }], align: [{
                type: HostBinding,
                args: ['style.align-items']
            }, {
                type: Input
            }], justify: [{
                type: HostBinding,
                args: ['style.justify-content']
            }, {
                type: Input
            }], columns: [{
                type: Input
            }], hb_gridCols: [{
                type: HostBinding,
                args: ['style.grid-template-columns']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZsZXgvR3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQU16RCxNQUFNLE9BQU8sZUFBZTtJQTZCMUIsWUFBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQXJCNUMsY0FBUyxHQUFXLEtBQUssQ0FBQztRQUkxQixVQUFLLEdBQVcsT0FBTyxDQUFDO1FBSXhCLFlBQU8sR0FBVyxZQUFZLENBQUM7UUFHL0IsWUFBTyxHQUFXLEdBQUcsQ0FBQztJQVV5QixDQUFDO0lBNUJoRCxJQUNJLE9BQU87UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBaUJELElBQ0ksV0FBVztRQUNiLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQztTQUNqRjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7OzZHQTNCVSxlQUFlO2lHQUFmLGVBQWUsaVhBRmhCLDZCQUE2Qjs0RkFFNUIsZUFBZTtrQkFKM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLDZCQUE2QjtpQkFDeEM7bUdBR0ssT0FBTztzQkFEVixXQUFXO3VCQUFDLGVBQWU7Z0JBTzVCLFNBQVM7c0JBRlIsV0FBVzt1QkFBQyxzQkFBc0I7O3NCQUNsQyxLQUFLO2dCQUtOLEtBQUs7c0JBRkosV0FBVzt1QkFBQyxtQkFBbUI7O3NCQUMvQixLQUFLO2dCQUtOLE9BQU87c0JBRk4sV0FBVzt1QkFBQyx1QkFBdUI7O3NCQUNuQyxLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFJRixXQUFXO3NCQURkLFdBQVc7dUJBQUMsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBfaXNOdW1iZXJWYWx1ZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZ3JpZCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0dyaWRFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcbiAgZ2V0IGRpc3BsYXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2dyaWQnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LWRpcmVjdGlvbicpXG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nID0gJ3Jvdyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5hbGlnbi1pdGVtcycpXG4gIEBJbnB1dCgpXG4gIGFsaWduOiBzdHJpbmcgPSAnc3RhcnQnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuanVzdGlmeS1jb250ZW50JylcbiAgQElucHV0KClcbiAganVzdGlmeTogc3RyaW5nID0gJ2ZsZXgtc3RhcnQnO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IHN0cmluZyA9ICcxJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdyaWQtdGVtcGxhdGUtY29sdW1ucycpXG4gIGdldCBoYl9ncmlkQ29scygpIHtcbiAgICBpZiAoX2lzTnVtYmVyVmFsdWUodGhpcy5jb2x1bW5zKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHJlcGVhdCgke3RoaXMuY29sdW1uc30sIDFmcilgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYCR7dGhpcy5jb2x1bW5zfWApO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG59XG4iXX0=