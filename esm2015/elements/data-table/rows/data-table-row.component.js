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
NovoDataTableRow.ɵfac = function NovoDataTableRow_Factory(t) { return ɵNovoDataTableRow_BaseFactory(t || NovoDataTableRow); };
NovoDataTableRow.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDataTableRow, selectors: [["novo-data-table-row"]], hostVars: 5, hostBindings: function NovoDataTableRow_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role)("id", ctx.id)("data-automation-id", ctx.dataAutomationId);
        i0.ɵɵclassMap(ctx.rowClass);
    } }, inputs: { id: "id", dataAutomationId: "dataAutomationId" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 0, consts: [["cdkCellOutlet", ""]], template: function NovoDataTableRow_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainer(0, 0);
    } }, directives: [i1.CdkCellOutlet], encapsulation: 2, changeDetection: 0 });
const ɵNovoDataTableRow_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoDataTableRow);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableRow, [{
        type: Component,
        args: [{
                selector: 'novo-data-table-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { rowClass: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGEtdGFibGUvcm93cy9kYXRhLXRhYmxlLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBT3ZGLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxNQUFNO0lBTDVDOztRQU9TLGFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUVqQyxTQUFJLEdBQUcsS0FBSyxDQUFDO0tBU3JCOzt5R0FiWSxnQkFBZ0I7cURBQWhCLGdCQUFnQjs7Ozs7OzZFQUFoQixnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUw1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Z0JBR1EsUUFBUTtrQkFEZCxXQUFXO21CQUFDLE9BQU87WUFHYixJQUFJO2tCQURWLFdBQVc7bUJBQUMsV0FBVztZQUt4QixFQUFFO2tCQUZELFdBQVc7bUJBQUMsU0FBUzs7a0JBQ3JCLEtBQUs7WUFLTixnQkFBZ0I7a0JBRmYsV0FBVzttQkFBQyx5QkFBeUI7O2tCQUNyQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrUm93LCBDREtfUk9XX1RFTVBMQVRFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtcm93JyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlUm93IGV4dGVuZHMgQ2RrUm93IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLWRhdGEtdGFibGUtcm93JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5pZCcpXG4gIEBJbnB1dCgpXG4gIGlkO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLWF1dG9tYXRpb24taWQnKVxuICBASW5wdXQoKVxuICBkYXRhQXV0b21hdGlvbklkO1xufVxuIl19