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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZmxleC9ncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBTXpELE1BQU0sT0FBTyxlQUFlO0lBNkIxQixZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBckI1QyxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxPQUFPLENBQUM7UUFJeEIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUcvQixZQUFPLEdBQVcsR0FBRyxDQUFDO0lBVXlCLENBQUM7SUE1QmhELElBQ0ksT0FBTztRQUNULE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFpQkQsSUFDSSxXQUFXO1FBQ2IsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLFFBQVEsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQzs7NkdBM0JVLGVBQWU7aUdBQWYsZUFBZSxpWEFGaEIsNkJBQTZCOzRGQUU1QixlQUFlO2tCQUozQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsNkJBQTZCO2lCQUN4QzttR0FHSyxPQUFPO3NCQURWLFdBQVc7dUJBQUMsZUFBZTtnQkFPNUIsU0FBUztzQkFGUixXQUFXO3VCQUFDLHNCQUFzQjs7c0JBQ2xDLEtBQUs7Z0JBS04sS0FBSztzQkFGSixXQUFXO3VCQUFDLG1CQUFtQjs7c0JBQy9CLEtBQUs7Z0JBS04sT0FBTztzQkFGTixXQUFXO3VCQUFDLHVCQUF1Qjs7c0JBQ25DLEtBQUs7Z0JBSU4sT0FBTztzQkFETixLQUFLO2dCQUlGLFdBQVc7c0JBRGQsV0FBVzt1QkFBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IF9pc051bWJlclZhbHVlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ncmlkJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvR3JpZEVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKVxuICBnZXQgZGlzcGxheSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnZ3JpZCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJylcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAncm93JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmFsaWduLWl0ZW1zJylcbiAgQElucHV0KClcbiAgYWxpZ246IHN0cmluZyA9ICdzdGFydCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5qdXN0aWZ5LWNvbnRlbnQnKVxuICBASW5wdXQoKVxuICBqdXN0aWZ5OiBzdHJpbmcgPSAnZmxleC1zdGFydCc7XG5cbiAgQElucHV0KClcbiAgY29sdW1uczogc3RyaW5nID0gJzEnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJylcbiAgZ2V0IGhiX2dyaWRDb2xzKCkge1xuICAgIGlmIChfaXNOdW1iZXJWYWx1ZSh0aGlzLmNvbHVtbnMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgMWZyKWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgJHt0aGlzLmNvbHVtbnN9YCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cbn1cbiJdfQ==