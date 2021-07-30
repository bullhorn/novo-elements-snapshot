import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';
import { CdkHeaderRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
export class NovoDataTableHeaderRow extends CdkHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-data-table-header-row';
        this.fixedHeader = false;
        this.role = 'row';
    }
}
NovoDataTableHeaderRow.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-header-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableHeaderRow.propDecorators = {
    rowClass: [{ type: HostBinding, args: ['class',] }],
    fixedHeader: [{ type: HostBinding, args: ['class.fixed-header',] }, { type: Input }],
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1oZWFkZXItcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0YS10YWJsZS9yb3dzL2RhdGEtdGFibGUtaGVhZGVyLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU9wRSxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUx4RDs7UUFPUyxhQUFRLEdBQUcsNEJBQTRCLENBQUM7UUFHeEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsU0FBSSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7WUFiQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozt1QkFFRSxXQUFXLFNBQUMsT0FBTzswQkFFbkIsV0FBVyxTQUFDLG9CQUFvQixjQUNoQyxLQUFLO21CQUVMLFdBQVcsU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka0hlYWRlclJvdywgQ0RLX1JPV19URU1QTEFURSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1oZWFkZXItcm93JyxcclxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVIZWFkZXJSb3cgZXh0ZW5kcyBDZGtIZWFkZXJSb3cge1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLWRhdGEtdGFibGUtaGVhZGVyLXJvdyc7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1oZWFkZXInKVxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGZpeGVkSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxyXG4gIHB1YmxpYyByb2xlID0gJ3Jvdyc7XHJcbn1cclxuIl19