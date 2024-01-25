// NG2
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class NovoGridElement {
    get display() {
        return 'grid';
    }
    get hb_gridCols() {
        if (_isNumberValue(this.columns)) {
            return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, 1fr)`);
        }
        return this._sanitizer.bypassSecurityTrustStyle(`${this.columns}`);
    }
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.direction = 'row';
        this.align = 'start';
        this.justify = 'flex-start';
        this.columns = '1';
    }
}
NovoGridElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoGridElement, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoGridElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoGridElement, selector: "novo-grid", inputs: { direction: "direction", align: "align", justify: "justify", columns: "columns" }, host: { properties: { "style.display": "this.display", "style.flex-direction": "this.direction", "style.align-items": "this.align", "style.justify-content": "this.justify", "style.grid-template-columns": "this.hb_gridCols" } }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoGridElement, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2ZsZXgvR3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQU16RCxNQUFNLE9BQU8sZUFBZTtJQUMxQixJQUNJLE9BQU87UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBaUJELElBQ0ksV0FBVztRQUNiLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQztTQUNqRjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBckI1QyxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxPQUFPLENBQUM7UUFJeEIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUcvQixZQUFPLEdBQVcsR0FBRyxDQUFDO0lBVXlCLENBQUM7OzZHQTdCckMsZUFBZTtpR0FBZixlQUFlLGlYQUZoQiw2QkFBNkI7NEZBRTVCLGVBQWU7a0JBSjNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSw2QkFBNkI7aUJBQ3hDO21HQUdLLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxlQUFlO2dCQU81QixTQUFTO3NCQUZSLFdBQVc7dUJBQUMsc0JBQXNCOztzQkFDbEMsS0FBSztnQkFLTixLQUFLO3NCQUZKLFdBQVc7dUJBQUMsbUJBQW1COztzQkFDL0IsS0FBSztnQkFLTixPQUFPO3NCQUZOLFdBQVc7dUJBQUMsdUJBQXVCOztzQkFDbkMsS0FBSztnQkFJTixPQUFPO3NCQUROLEtBQUs7Z0JBSUYsV0FBVztzQkFEZCxXQUFXO3VCQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgX2lzTnVtYmVyVmFsdWUgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWdyaWQnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9HcmlkRWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpXG4gIGdldCBkaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdncmlkJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKVxuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYWxpZ24taXRlbXMnKVxuICBASW5wdXQoKVxuICBhbGlnbjogc3RyaW5nID0gJ3N0YXJ0JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmp1c3RpZnktY29udGVudCcpXG4gIEBJbnB1dCgpXG4gIGp1c3RpZnk6IHN0cmluZyA9ICdmbGV4LXN0YXJ0JztcblxuICBASW5wdXQoKVxuICBjb2x1bW5zOiBzdHJpbmcgPSAnMSc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ncmlkLXRlbXBsYXRlLWNvbHVtbnMnKVxuICBnZXQgaGJfZ3JpZENvbHMoKSB7XG4gICAgaWYgKF9pc051bWJlclZhbHVlKHRoaXMuY29sdW1ucykpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGByZXBlYXQoJHt0aGlzLmNvbHVtbnN9LCAxZnIpYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGAke3RoaXMuY29sdW1uc31gKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxufVxuIl19