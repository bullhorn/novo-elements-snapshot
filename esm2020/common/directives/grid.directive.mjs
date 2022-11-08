import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export class GridDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.renderer.setStyle(this.el.nativeElement, 'display', 'grid');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}
GridDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
GridDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: GridDirective, selector: "[appGrid]", inputs: { columns: "columns", rows: "rows", areas: "areas" }, host: { properties: { "style.grid-template-columns": "this.columns", "style.grid-template-rows": "this.rows", "style.grid-template-areas": "this.areas" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appGrid]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { columns: [{
                type: HostBinding,
                args: ['style.grid-template-columns']
            }, {
                type: Input
            }], rows: [{
                type: HostBinding,
                args: ['style.grid-template-rows']
            }, {
                type: Input
            }], areas: [{
                type: HostBinding,
                args: ['style.grid-template-areas']
            }, {
                type: Input
            }] } });
export class GridAreaDirective {
}
GridAreaDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridAreaDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
GridAreaDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: GridAreaDirective, selector: "[appGridArea]", inputs: { area: ["appGridArea", "area"] }, host: { properties: { "style.grid-area": "this.area" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: GridAreaDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appGridArea]',
                }]
        }], propDecorators: { area: [{
                type: HostBinding,
                args: ['style.grid-area']
            }, {
                type: Input,
                args: ['appGridArea']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21tb24vZGlyZWN0aXZlcy9ncmlkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLckYsTUFBTSxPQUFPLGFBQWE7SUFXeEIsWUFBNkIsRUFBYyxFQUFtQixRQUFtQjtRQUFwRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQW1CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRSxDQUFDOzsyR0FkVSxhQUFhOytGQUFiLGFBQWE7NEZBQWIsYUFBYTtrQkFIekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztpQkFDdEI7eUhBSUMsT0FBTztzQkFGTixXQUFXO3VCQUFDLDZCQUE2Qjs7c0JBQ3pDLEtBQUs7Z0JBSU4sSUFBSTtzQkFGSCxXQUFXO3VCQUFDLDBCQUEwQjs7c0JBQ3RDLEtBQUs7Z0JBSU4sS0FBSztzQkFGSixXQUFXO3VCQUFDLDJCQUEyQjs7c0JBQ3ZDLEtBQUs7O0FBWVIsTUFBTSxPQUFPLGlCQUFpQjs7K0dBQWpCLGlCQUFpQjttR0FBakIsaUJBQWlCOzRGQUFqQixpQkFBaUI7a0JBSDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzhCQUlDLElBQUk7c0JBRkgsV0FBVzt1QkFBQyxpQkFBaUI7O3NCQUM3QixLQUFLO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBHcmlkXScsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWREaXJlY3RpdmUge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdyaWQtdGVtcGxhdGUtY29sdW1ucycpXG4gIEBJbnB1dCgpXG4gIGNvbHVtbnM6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ncmlkLXRlbXBsYXRlLXJvd3MnKVxuICBASW5wdXQoKVxuICByb3dzOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ3JpZC10ZW1wbGF0ZS1hcmVhcycpXG4gIEBJbnB1dCgpXG4gIGFyZWFzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2dyaWQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcxMDAlJyk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEdyaWRBcmVhXScsXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRBcmVhRGlyZWN0aXZlIHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5ncmlkLWFyZWEnKVxuICBASW5wdXQoJ2FwcEdyaWRBcmVhJylcbiAgYXJlYTogc3RyaW5nO1xufVxuIl19