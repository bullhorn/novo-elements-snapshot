import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input } from '@angular/core';
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRowDef = CdkHeaderRowDef;
export const _NovoCdkRowDef = CdkRowDef;
export const _NovoHeaderRow = CdkHeaderRow;
export const _NovoRow = CdkRow;
export class NovoSimpleHeaderRowDef extends _NovoHeaderRowDef {
}
NovoSimpleHeaderRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[novoSimpleHeaderRowDef]',
                providers: [{ provide: CdkHeaderRowDef, useExisting: NovoSimpleHeaderRowDef }],
            },] }
];
NovoSimpleHeaderRowDef.propDecorators = {
    columns: [{ type: Input, args: ['novoSimpleHeaderRowDef',] }]
};
export class NovoSimpleRowDef extends _NovoCdkRowDef {
}
NovoSimpleRowDef.decorators = [
    { type: Directive, args: [{
                selector: '[novoSimpleRowDef]',
                providers: [{ provide: CdkRowDef, useExisting: NovoSimpleRowDef }],
            },] }
];
NovoSimpleRowDef.propDecorators = {
    columns: [{ type: Input, args: ['novoSimpleRowDefColumns',] }]
};
export class NovoSimpleHeaderRow extends _NovoHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-simple-header-row';
        this.role = 'row';
    }
}
NovoSimpleHeaderRow.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-header-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSimpleHeaderRow.propDecorators = {
    rowClass: [{ type: HostBinding, args: ['class',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
export class NovoSimpleRow extends _NovoRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-simple-row';
        this.role = 'row';
    }
}
NovoSimpleRow.decorators = [
    { type: Component, args: [{
                selector: 'novo-simple-row',
                template: CDK_ROW_TEMPLATE,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoSimpleRow.propDecorators = {
    rowClass: [{ type: HostBinding, args: ['class',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3NpbXBsZS10YWJsZS9yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEcscUVBQXFFO0FBQ3JFLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLGVBQWUsQ0FBQztBQUNqRCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxZQUFZLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztBQU0vQixNQUFNLE9BQU8sc0JBQXVCLFNBQVEsaUJBQWlCOzs7WUFKNUQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQzthQUMvRTs7O3NCQUlFLEtBQUssU0FBQyx3QkFBd0I7O0FBUWpDLE1BQU0sT0FBTyxnQkFBb0IsU0FBUSxjQUFpQjs7O1lBSnpELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLENBQUM7YUFDbkU7OztzQkFJRSxLQUFLLFNBQUMseUJBQXlCOztBQVNsQyxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsY0FBYztJQUx2RDs7UUFPUyxhQUFRLEdBQUcsd0JBQXdCLENBQUM7UUFFcEMsU0FBSSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7WUFWQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozt1QkFFRSxXQUFXLFNBQUMsT0FBTzttQkFFbkIsV0FBVyxTQUFDLFdBQVc7O0FBUzFCLE1BQU0sT0FBTyxhQUFjLFNBQVEsUUFBUTtJQUwzQzs7UUFPUyxhQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFFN0IsU0FBSSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7WUFWQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozt1QkFFRSxXQUFXLFNBQUMsT0FBTzttQkFFbkIsV0FBVyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtIZWFkZXJSb3csIENka0hlYWRlclJvd0RlZiwgQ2RrUm93LCBDZGtSb3dEZWYsIENES19ST1dfVEVNUExBVEUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3ODQ5ICovXG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3dEZWYgPSBDZGtIZWFkZXJSb3dEZWY7XG5leHBvcnQgY29uc3QgX05vdm9DZGtSb3dEZWYgPSBDZGtSb3dEZWY7XG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3cgPSBDZGtIZWFkZXJSb3c7XG5leHBvcnQgY29uc3QgX05vdm9Sb3cgPSBDZGtSb3c7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlSGVhZGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrSGVhZGVyUm93RGVmLCB1c2VFeGlzdGluZzogTm92b1NpbXBsZUhlYWRlclJvd0RlZiB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlclJvd0RlZiBleHRlbmRzIF9Ob3ZvSGVhZGVyUm93RGVmIHtcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXG5cbiAgQElucHV0KCdub3ZvU2ltcGxlSGVhZGVyUm93RGVmJylcbiAgY29sdW1ucztcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9TaW1wbGVSb3dEZWZdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBOb3ZvU2ltcGxlUm93RGVmIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlUm93RGVmPFQ+IGV4dGVuZHMgX05vdm9DZGtSb3dEZWY8VD4ge1xuICAvLyBUT0RPOiBhZGQgZXhwbGljaXQgY29uc3RydWN0b3JcblxuICBASW5wdXQoJ25vdm9TaW1wbGVSb3dEZWZDb2x1bW5zJylcbiAgY29sdW1ucztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1zaW1wbGUtaGVhZGVyLXJvdycsXG4gIHRlbXBsYXRlOiBDREtfUk9XX1RFTVBMQVRFLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlclJvdyBleHRlbmRzIF9Ob3ZvSGVhZGVyUm93IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLXNpbXBsZS1oZWFkZXItcm93JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1yb3cnLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVSb3cgZXh0ZW5kcyBfTm92b1JvdyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgcm93Q2xhc3MgPSAnbm92by1zaW1wbGUtcm93JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xufVxuIl19