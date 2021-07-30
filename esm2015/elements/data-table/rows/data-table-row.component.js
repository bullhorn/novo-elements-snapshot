import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';
import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
export class NovoDataTableRow extends CdkRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-data-table-row';
        this.role = 'row';
    }
}
NovoDataTableRow.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableRow.propDecorators = {
    rowClass: [{ type: HostBinding, args: ['class',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    id: [{ type: HostBinding, args: ['attr.id',] }, { type: Input }],
    dataAutomationId: [{ type: HostBinding, args: ['attr.data-automation-id',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRhLXRhYmxlL3Jvd3MvZGF0YS10YWJsZS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFPOUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLE1BQU07SUFMNUM7O1FBT1MsYUFBUSxHQUFHLHFCQUFxQixDQUFDO1FBRWpDLFNBQUksR0FBRyxLQUFLLENBQUM7SUFTdEIsQ0FBQzs7O1lBbEJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O3VCQUVFLFdBQVcsU0FBQyxPQUFPO21CQUVuQixXQUFXLFNBQUMsV0FBVztpQkFHdkIsV0FBVyxTQUFDLFNBQVMsY0FDckIsS0FBSzsrQkFHTCxXQUFXLFNBQUMseUJBQXlCLGNBQ3JDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2RrUm93LCBDREtfUk9XX1RFTVBMQVRFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLXJvdycsXHJcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlUm93IGV4dGVuZHMgQ2RrUm93IHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcclxuICBwdWJsaWMgcm93Q2xhc3MgPSAnbm92by1kYXRhLXRhYmxlLXJvdyc7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxyXG4gIHB1YmxpYyByb2xlID0gJ3Jvdyc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpXHJcbiAgQElucHV0KClcclxuICBpZDtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtYXV0b21hdGlvbi1pZCcpXHJcbiAgQElucHV0KClcclxuICBkYXRhQXV0b21hdGlvbklkO1xyXG59XHJcbiJdfQ==