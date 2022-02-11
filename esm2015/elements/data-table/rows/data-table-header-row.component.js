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
NovoDataTableHeaderRow.ɵfac = function NovoDataTableHeaderRow_Factory(t) { return ɵNovoDataTableHeaderRow_BaseFactory(t || NovoDataTableHeaderRow); };
NovoDataTableHeaderRow.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDataTableHeaderRow, selectors: [["novo-data-table-header-row"]], hostVars: 5, hostBindings: function NovoDataTableHeaderRow_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
        i0.ɵɵclassMap(ctx.rowClass);
        i0.ɵɵclassProp("fixed-header", ctx.fixedHeader);
    } }, inputs: { fixedHeader: "fixedHeader" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 0, consts: [["cdkCellOutlet", ""]], template: function NovoDataTableHeaderRow_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainer(0, 0);
    } }, directives: [i1.CdkCellOutlet], encapsulation: 2, changeDetection: 0 });
const ɵNovoDataTableHeaderRow_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoDataTableHeaderRow);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableHeaderRow, [{
        type: Component,
        args: [{
                selector: 'novo-data-table-header-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { rowClass: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1oZWFkZXItcm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRhLXRhYmxlL3Jvd3MvZGF0YS10YWJsZS1oZWFkZXItcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPdkYsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFlBQVk7SUFMeEQ7O1FBT1MsYUFBUSxHQUFHLDRCQUE0QixDQUFDO1FBR3hDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLFNBQUksR0FBRyxLQUFLLENBQUM7S0FDckI7OzJIQVJZLHNCQUFzQjsyREFBdEIsc0JBQXNCOzs7Ozs7O21GQUF0QixzQkFBc0I7a0RBQXRCLHNCQUFzQjtjQUxsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Z0JBR1EsUUFBUTtrQkFEZCxXQUFXO21CQUFDLE9BQU87WUFJYixXQUFXO2tCQUZqQixXQUFXO21CQUFDLG9CQUFvQjs7a0JBQ2hDLEtBQUs7WUFHQyxJQUFJO2tCQURWLFdBQVc7bUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0hlYWRlclJvdywgQ0RLX1JPV19URU1QTEFURSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWhlYWRlci1yb3cnLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVIZWFkZXJSb3cgZXh0ZW5kcyBDZGtIZWFkZXJSb3cge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgcHVibGljIHJvd0NsYXNzID0gJ25vdm8tZGF0YS10YWJsZS1oZWFkZXItcm93JztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5maXhlZC1oZWFkZXInKVxuICBASW5wdXQoKVxuICBwdWJsaWMgZml4ZWRIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xufVxuIl19