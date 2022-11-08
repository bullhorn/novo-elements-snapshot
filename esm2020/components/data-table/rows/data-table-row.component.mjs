import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
export class NovoDataTableRow extends CdkRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-data-table-row';
        this.role = 'row';
    }
}
NovoDataTableRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDataTableRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableRow, selector: "novo-data-table-row", inputs: { id: "id", dataAutomationId: "dataAutomationId" }, host: { properties: { "class": "this.rowClass", "attr.role": "this.role", "attr.id": "this.id", "attr.data-automation-id": "this.dataAutomationId" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, directives: [{ type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }, {
                type: Input
            }], dataAutomationId: [{
                type: HostBinding,
                args: ['attr.data-automation-id']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRhLXRhYmxlL3Jvd3MvZGF0YS10YWJsZS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU92RixNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsTUFBTTtJQUw1Qzs7UUFPUyxhQUFRLEdBQUcscUJBQXFCLENBQUM7UUFFakMsU0FBSSxHQUFHLEtBQUssQ0FBQztLQVNyQjs7OEdBYlksZ0JBQWdCO2tHQUFoQixnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFMNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBR1EsUUFBUTtzQkFEZCxXQUFXO3VCQUFDLE9BQU87Z0JBR2IsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVc7Z0JBS3hCLEVBQUU7c0JBRkQsV0FBVzt1QkFBQyxTQUFTOztzQkFDckIsS0FBSztnQkFLTixnQkFBZ0I7c0JBRmYsV0FBVzt1QkFBQyx5QkFBeUI7O3NCQUNyQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrUm93LCBDREtfUk9XX1RFTVBMQVRFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtcm93JyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlUm93IGV4dGVuZHMgQ2RrUm93IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLWRhdGEtdGFibGUtcm93JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpXG4gIEBJbnB1dCgpXG4gIGlkO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLWF1dG9tYXRpb24taWQnKVxuICBASW5wdXQoKVxuICBkYXRhQXV0b21hdGlvbklkO1xufVxuIl19