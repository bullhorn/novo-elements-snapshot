import { CdkHeaderRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
export class NovoDataTableHeaderRow extends CdkHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-data-table-header-row';
        this.fixedHeader = false;
        this.role = 'row';
    }
}
NovoDataTableHeaderRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableHeaderRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDataTableHeaderRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableHeaderRow, selector: "novo-data-table-header-row", inputs: { fixedHeader: "fixedHeader" }, host: { properties: { "class": "this.rowClass", "class.fixed-header": "this.fixedHeader", "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, directives: [{ type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableHeaderRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-header-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], fixedHeader: [{
                type: HostBinding,
                args: ['class.fixed-header']
            }, {
                type: Input
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1oZWFkZXItcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZGF0YS10YWJsZS9yb3dzL2RhdGEtdGFibGUtaGVhZGVyLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBT3ZGLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxZQUFZO0lBTHhEOztRQU9TLGFBQVEsR0FBRyw0QkFBNEIsQ0FBQztRQUd4QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixTQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOztvSEFSWSxzQkFBc0I7d0dBQXRCLHNCQUFzQjs0RkFBdEIsc0JBQXNCO2tCQUxsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFHUSxRQUFRO3NCQURkLFdBQVc7dUJBQUMsT0FBTztnQkFJYixXQUFXO3NCQUZqQixXQUFXO3VCQUFDLG9CQUFvQjs7c0JBQ2hDLEtBQUs7Z0JBR0MsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtIZWFkZXJSb3csIENES19ST1dfVEVNUExBVEUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1oZWFkZXItcm93JyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlSGVhZGVyUm93IGV4dGVuZHMgQ2RrSGVhZGVyUm93IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvdyc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml4ZWQtaGVhZGVyJylcbiAgQElucHV0KClcbiAgcHVibGljIGZpeGVkSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAncm93Jztcbn1cbiJdfQ==