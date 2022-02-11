import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvcm93cy9kYXRhLXRhYmxlLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU92RixNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsTUFBTTtJQUw1Qzs7UUFPUyxhQUFRLEdBQUcscUJBQXFCLENBQUM7UUFFakMsU0FBSSxHQUFHLEtBQUssQ0FBQztJQVN0QixDQUFDOzs7WUFsQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7dUJBRUUsV0FBVyxTQUFDLE9BQU87bUJBRW5CLFdBQVcsU0FBQyxXQUFXO2lCQUd2QixXQUFXLFNBQUMsU0FBUyxjQUNyQixLQUFLOytCQUdMLFdBQVcsU0FBQyx5QkFBeUIsY0FDckMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1JvdywgQ0RLX1JPV19URU1QTEFURSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLXJvdycsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZVJvdyBleHRlbmRzIENka1JvdyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgcm93Q2xhc3MgPSAnbm92by1kYXRhLXRhYmxlLXJvdyc7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAncm93JztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICBASW5wdXQoKVxuICBpZDtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkJylcbiAgQElucHV0KClcbiAgZGF0YUF1dG9tYXRpb25JZDtcbn1cbiJdfQ==