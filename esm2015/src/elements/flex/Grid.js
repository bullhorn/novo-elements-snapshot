// NG2
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
NovoGridElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-grid',
                template: ` <ng-content></ng-content> `
            },] }
];
NovoGridElement.ctorParameters = () => [
    { type: DomSanitizer }
];
NovoGridElement.propDecorators = {
    display: [{ type: HostBinding, args: ['style.display',] }],
    direction: [{ type: HostBinding, args: ['style.flex-direction',] }, { type: Input }],
    align: [{ type: HostBinding, args: ['style.align-items',] }, { type: Input }],
    justify: [{ type: HostBinding, args: ['style.justify-content',] }, { type: Input }],
    columns: [{ type: Input }],
    hb_gridCols: [{ type: HostBinding, args: ['style.grid-template-columns',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mbGV4L0dyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTXpELE1BQU0sT0FBTyxlQUFlO0lBNkIxQixZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBckI1QyxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxPQUFPLENBQUM7UUFJeEIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUcvQixZQUFPLEdBQVcsR0FBRyxDQUFDO0lBVXlCLENBQUM7SUE1QmhELElBQ0ksT0FBTztRQUNULE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFpQkQsSUFDSSxXQUFXO1FBQ2IsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLFFBQVEsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQzs7O1lBL0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLDZCQUE2QjthQUN4Qzs7O1lBTFEsWUFBWTs7O3NCQU9sQixXQUFXLFNBQUMsZUFBZTt3QkFLM0IsV0FBVyxTQUFDLHNCQUFzQixjQUNsQyxLQUFLO29CQUdMLFdBQVcsU0FBQyxtQkFBbUIsY0FDL0IsS0FBSztzQkFHTCxXQUFXLFNBQUMsdUJBQXVCLGNBQ25DLEtBQUs7c0JBR0wsS0FBSzswQkFHTCxXQUFXLFNBQUMsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBfaXNOdW1iZXJWYWx1ZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZ3JpZCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0dyaWRFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcbiAgZ2V0IGRpc3BsYXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2dyaWQnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LWRpcmVjdGlvbicpXG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nID0gJ3Jvdyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5hbGlnbi1pdGVtcycpXG4gIEBJbnB1dCgpXG4gIGFsaWduOiBzdHJpbmcgPSAnc3RhcnQnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuanVzdGlmeS1jb250ZW50JylcbiAgQElucHV0KClcbiAganVzdGlmeTogc3RyaW5nID0gJ2ZsZXgtc3RhcnQnO1xuXG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IHN0cmluZyA9ICcxJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdyaWQtdGVtcGxhdGUtY29sdW1ucycpXG4gIGdldCBoYl9ncmlkQ29scygpIHtcbiAgICBpZiAoX2lzTnVtYmVyVmFsdWUodGhpcy5jb2x1bW5zKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHJlcGVhdCgke3RoaXMuY29sdW1uc30sIDFmcilgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYCR7dGhpcy5jb2x1bW5zfWApO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG59XG4iXX0=