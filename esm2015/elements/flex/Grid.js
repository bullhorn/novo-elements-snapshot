// NG2
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
const _c0 = ["*"];
export class NovoGridElement {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.gap = 'nowrap';
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
NovoGridElement.ɵfac = function NovoGridElement_Factory(t) { return new (t || NovoGridElement)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
NovoGridElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoGridElement, selectors: [["novo-grid"]], hostVars: 12, hostBindings: function NovoGridElement_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("display", ctx.display)("flex-direction", ctx.direction)("align-items", ctx.align)("justify-content", ctx.justify)("gap", ctx.gap)("grid-template-columns", ctx.hb_gridCols);
    } }, inputs: { direction: "direction", align: "align", justify: "justify", gap: "gap", columns: "columns" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function NovoGridElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoGridElement, [{
        type: Component,
        args: [{
                selector: 'novo-grid',
                template: ` <ng-content></ng-content> `,
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, { display: [{
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
        }], gap: [{
            type: HostBinding,
            args: ['style.gap']
        }, {
            type: Input
        }], columns: [{
            type: Input
        }], hb_gridCols: [{
            type: HostBinding,
            args: ['style.grid-template-columns']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9mbGV4L0dyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBTXpELE1BQU0sT0FBTyxlQUFlO0lBaUMxQixZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBekI1QyxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxRQUFRLENBQUM7UUFJekIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUkvQixRQUFHLEdBQVcsUUFBUSxDQUFDO1FBR3ZCLFlBQU8sR0FBVyxHQUFHLENBQUM7SUFVeUIsQ0FBQztJQWhDaEQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQXFCRCxJQUNJLFdBQVc7UUFDYixJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sUUFBUSxDQUFDLENBQUM7U0FDakY7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs4RUEvQlUsZUFBZTtvREFBZixlQUFlOzs7O1FBRmQsa0JBQVk7O2tEQUViLGVBQWU7Y0FKM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOytEQUdLLE9BQU87a0JBRFYsV0FBVzttQkFBQyxlQUFlO1lBTzVCLFNBQVM7a0JBRlIsV0FBVzttQkFBQyxzQkFBc0I7O2tCQUNsQyxLQUFLO1lBS04sS0FBSztrQkFGSixXQUFXO21CQUFDLG1CQUFtQjs7a0JBQy9CLEtBQUs7WUFLTixPQUFPO2tCQUZOLFdBQVc7bUJBQUMsdUJBQXVCOztrQkFDbkMsS0FBSztZQUtOLEdBQUc7a0JBRkYsV0FBVzttQkFBQyxXQUFXOztrQkFDdkIsS0FBSztZQUlOLE9BQU87a0JBRE4sS0FBSztZQUlGLFdBQVc7a0JBRGQsV0FBVzttQkFBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IF9pc051bWJlclZhbHVlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1ncmlkJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvR3JpZEVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKVxuICBnZXQgZGlzcGxheSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnZ3JpZCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJylcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAncm93JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmFsaWduLWl0ZW1zJylcbiAgQElucHV0KClcbiAgYWxpZ246IHN0cmluZyA9ICdjZW50ZXInO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuanVzdGlmeS1jb250ZW50JylcbiAgQElucHV0KClcbiAganVzdGlmeTogc3RyaW5nID0gJ2ZsZXgtc3RhcnQnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ2FwJylcbiAgQElucHV0KClcbiAgZ2FwOiBzdHJpbmcgPSAnbm93cmFwJztcblxuICBASW5wdXQoKVxuICBjb2x1bW5zOiBzdHJpbmcgPSAnMSc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ncmlkLXRlbXBsYXRlLWNvbHVtbnMnKVxuICBnZXQgaGJfZ3JpZENvbHMoKSB7XG4gICAgaWYgKF9pc051bWJlclZhbHVlKHRoaXMuY29sdW1ucykpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGByZXBlYXQoJHt0aGlzLmNvbHVtbnN9LCAxZnIpYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGAke3RoaXMuY29sdW1uc31gKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxufVxuIl19