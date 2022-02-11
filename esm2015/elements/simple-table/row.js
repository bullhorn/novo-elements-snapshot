import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRowDef = CdkHeaderRowDef;
export const _NovoCdkRowDef = CdkRowDef;
export const _NovoHeaderRow = CdkHeaderRow;
export const _NovoRow = CdkRow;
export class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
}
NovoSimpleHeaderRowDef.ɵfac = function NovoSimpleHeaderRowDef_Factory(t) { return ɵNovoSimpleHeaderRowDef_BaseFactory(t || NovoSimpleHeaderRowDef); };
NovoSimpleHeaderRowDef.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleHeaderRowDef, selectors: [["", "novoSimpleHeaderRowDef", ""]], inputs: { columns: ["novoSimpleHeaderRowDef", "columns"] }, features: [i0.ɵɵProvidersFeature([{ provide: CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }]), i0.ɵɵInheritDefinitionFeature] });
const ɵNovoSimpleHeaderRowDef_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleHeaderRowDef);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleHeaderRowDef, [{
        type: Directive,
        args: [{
                selector: '[novoSimpleHeaderRowDef]',
                providers: [{ provide: CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }],
            }]
    }], null, { columns: [{
            type: Input,
            args: ['novoSimpleHeaderRowDef']
        }] }); })();
export class NovoSimpleRowDef extends _NovoCdkRowDef {
}
NovoSimpleRowDef.ɵfac = function NovoSimpleRowDef_Factory(t) { return ɵNovoSimpleRowDef_BaseFactory(t || NovoSimpleRowDef); };
NovoSimpleRowDef.ɵdir = i0.ɵɵdefineDirective({ type: NovoSimpleRowDef, selectors: [["", "novoSimpleRowDef", ""]], inputs: { columns: ["novoSimpleRowDefColumns", "columns"] }, features: [i0.ɵɵProvidersFeature([{ provide: CdkRowDef, useExisting: NovoSimpleRowDef }]), i0.ɵɵInheritDefinitionFeature] });
const ɵNovoSimpleRowDef_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleRowDef);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleRowDef, [{
        type: Directive,
        args: [{
                selector: '[novoSimpleRowDef]',
                providers: [{ provide: CdkRowDef, useExisting: NovoSimpleRowDef }],
            }]
    }], null, { columns: [{
            type: Input,
            args: ['novoSimpleRowDefColumns']
        }] }); })();
export class NovoSimpleHeaderRow extends _NovoHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-simple-header-row';
        this.role = 'row';
    }
}
NovoSimpleHeaderRow.ɵfac = function NovoSimpleHeaderRow_Factory(t) { return ɵNovoSimpleHeaderRow_BaseFactory(t || NovoSimpleHeaderRow); };
NovoSimpleHeaderRow.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSimpleHeaderRow, selectors: [["novo-simple-header-row"]], hostVars: 3, hostBindings: function NovoSimpleHeaderRow_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
        i0.ɵɵclassMap(ctx.rowClass);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 0, consts: [["cdkCellOutlet", ""]], template: function NovoSimpleHeaderRow_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainer(0, 0);
    } }, directives: [i1.CdkCellOutlet], encapsulation: 2, changeDetection: 0 });
const ɵNovoSimpleHeaderRow_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleHeaderRow);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleHeaderRow, [{
        type: Component,
        args: [{
                selector: 'novo-simple-header-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { rowClass: [{
            type: HostBinding,
            args: ['class']
        }], role: [{
            type: HostBinding,
            args: ['attr.role']
        }] }); })();
export class NovoSimpleRow extends _NovoRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-simple-row';
        this.role = 'row';
    }
}
NovoSimpleRow.ɵfac = function NovoSimpleRow_Factory(t) { return ɵNovoSimpleRow_BaseFactory(t || NovoSimpleRow); };
NovoSimpleRow.ɵcmp = i0.ɵɵdefineComponent({ type: NovoSimpleRow, selectors: [["novo-simple-row"]], hostVars: 3, hostBindings: function NovoSimpleRow_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
        i0.ɵɵclassMap(ctx.rowClass);
    } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 0, consts: [["cdkCellOutlet", ""]], template: function NovoSimpleRow_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainer(0, 0);
    } }, directives: [i1.CdkCellOutlet], encapsulation: 2, changeDetection: 0 });
const ɵNovoSimpleRow_BaseFactory = /*@__PURE__*/ i0.ɵɵgetInheritedFactory(NovoSimpleRow);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoSimpleRow, [{
        type: Component,
        args: [{
                selector: 'novo-simple-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { rowClass: [{
            type: HostBinding,
            args: ['class']
        }], role: [{
            type: HostBinding,
            args: ['attr.role']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3NpbXBsZS10YWJsZS9yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUVsRyxxRUFBcUU7QUFDckUsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDeEMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDO0FBTS9CLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxpQkFBaUI7OzJIQUFoRCxzQkFBc0I7MkRBQXRCLHNCQUFzQixnSkFGdEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFFLENBQUM7bUZBRW5FLHNCQUFzQjtrREFBdEIsc0JBQXNCO2NBSmxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFFLENBQUM7YUFDL0U7Z0JBS0MsT0FBTztrQkFETixLQUFLO21CQUFDLHdCQUF3Qjs7QUFRakMsTUFBTSxPQUFPLGdCQUFvQixTQUFRLGNBQWlCOzt5R0FBN0MsZ0JBQWdCO3FEQUFoQixnQkFBZ0IsMklBRmhCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDOzZFQUV2RCxnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUo1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ25FO2dCQUtDLE9BQU87a0JBRE4sS0FBSzttQkFBQyx5QkFBeUI7O0FBU2xDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxjQUFjO0lBTHZEOztRQU9TLGFBQVEsR0FBRyx3QkFBd0IsQ0FBQztRQUVwQyxTQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOztrSEFMWSxtQkFBbUI7d0RBQW5CLG1CQUFtQjs7Ozs7O2dGQUFuQixtQkFBbUI7a0RBQW5CLG1CQUFtQjtjQUwvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Z0JBR1EsUUFBUTtrQkFEZCxXQUFXO21CQUFDLE9BQU87WUFHYixJQUFJO2tCQURWLFdBQVc7bUJBQUMsV0FBVzs7QUFTMUIsTUFBTSxPQUFPLGFBQWMsU0FBUSxRQUFRO0lBTDNDOztRQU9TLGFBQVEsR0FBRyxpQkFBaUIsQ0FBQztRQUU3QixTQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOztnR0FMWSxhQUFhO2tEQUFiLGFBQWE7Ozs7OzswRUFBYixhQUFhO2tEQUFiLGFBQWE7Y0FMekIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEO2dCQUdRLFFBQVE7a0JBRGQsV0FBVzttQkFBQyxPQUFPO1lBR2IsSUFBSTtrQkFEVixXQUFXO21CQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtIZWFkZXJSb3csIENka0hlYWRlclJvd0RlZiwgQ2RrUm93LCBDZGtSb3dEZWYsIENES19ST1dfVEVNUExBVEUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3ODQ5ICovXG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3dEZWYgPSBDZGtIZWFkZXJSb3dEZWY7XG5leHBvcnQgY29uc3QgX05vdm9DZGtSb3dEZWYgPSBDZGtSb3dEZWY7XG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3cgPSBDZGtIZWFkZXJSb3c7XG5leHBvcnQgY29uc3QgX05vdm9Sb3cgPSBDZGtSb3c7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlSGVhZGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrSGVhZGVyUm93RGVmLCB1c2VFeGlzdGluZzogTm92b1NpbXBsZUhlYWRlclJvd0RlZiB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlclJvd0RlZiBleHRlbmRzIF9Ob3ZvSGVhZGVyUm93RGVmIHtcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXG5cbiAgQElucHV0KCdub3ZvU2ltcGxlSGVhZGVyUm93RGVmJylcbiAgY29sdW1ucztcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9TaW1wbGVSb3dEZWZdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBOb3ZvU2ltcGxlUm93RGVmIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlUm93RGVmPFQ+IGV4dGVuZHMgX05vdm9DZGtSb3dEZWY8VD4ge1xuICAvLyBUT0RPOiBhZGQgZXhwbGljaXQgY29uc3RydWN0b3JcblxuICBASW5wdXQoJ25vdm9TaW1wbGVSb3dEZWZDb2x1bW5zJylcbiAgY29sdW1ucztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtaGVhZGVyLXJvdycsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlclJvdyBleHRlbmRzIF9Ob3ZvSGVhZGVyUm93IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLXNpbXBsZS1oZWFkZXItcm93JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1yb3cnLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVSb3cgZXh0ZW5kcyBfTm92b1JvdyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgcm93Q2xhc3MgPSAnbm92by1zaW1wbGUtcm93JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xufVxuIl19