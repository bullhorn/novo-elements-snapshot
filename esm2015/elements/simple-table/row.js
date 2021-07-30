import { ChangeDetectionStrategy, Component, Directive, Input, HostBinding } from '@angular/core';
import { CdkHeaderRow, CdkRow, CDK_ROW_TEMPLATE, CdkRowDef, CdkHeaderRowDef } from '@angular/cdk/table';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9zaW1wbGUtdGFibGUvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhHLHFFQUFxRTtBQUNyRSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxlQUFlLENBQUM7QUFDakQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUN4QyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFNL0IsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGlCQUFpQjs7O1lBSjVELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFFLENBQUM7YUFDL0U7OztzQkFJRSxLQUFLLFNBQUMsd0JBQXdCOztBQVFqQyxNQUFNLE9BQU8sZ0JBQW9CLFNBQVEsY0FBaUI7OztZQUp6RCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ25FOzs7c0JBSUUsS0FBSyxTQUFDLHlCQUF5Qjs7QUFTbEMsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGNBQWM7SUFMdkQ7O1FBT1MsYUFBUSxHQUFHLHdCQUF3QixDQUFDO1FBRXBDLFNBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7dUJBRUUsV0FBVyxTQUFDLE9BQU87bUJBRW5CLFdBQVcsU0FBQyxXQUFXOztBQVMxQixNQUFNLE9BQU8sYUFBYyxTQUFRLFFBQVE7SUFMM0M7O1FBT1MsYUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBRTdCLFNBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7dUJBRUUsV0FBVyxTQUFDLE9BQU87bUJBRW5CLFdBQVcsU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2RrSGVhZGVyUm93LCBDZGtSb3csIENES19ST1dfVEVNUExBVEUsIENka1Jvd0RlZiwgQ2RrSGVhZGVyUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuXHJcbi8qKiBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xNzg0OSAqL1xyXG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3dEZWYgPSBDZGtIZWFkZXJSb3dEZWY7XHJcbmV4cG9ydCBjb25zdCBfTm92b0Nka1Jvd0RlZiA9IENka1Jvd0RlZjtcclxuZXhwb3J0IGNvbnN0IF9Ob3ZvSGVhZGVyUm93ID0gQ2RrSGVhZGVyUm93O1xyXG5leHBvcnQgY29uc3QgX05vdm9Sb3cgPSBDZGtSb3c7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlSGVhZGVyUm93RGVmXScsXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtIZWFkZXJSb3dEZWYsIHVzZUV4aXN0aW5nOiBOb3ZvU2ltcGxlSGVhZGVyUm93RGVmIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZUhlYWRlclJvd0RlZiBleHRlbmRzIF9Ob3ZvSGVhZGVyUm93RGVmIHtcclxuICAvLyBUT0RPOiBhZGQgZXhwbGljaXQgY29uc3RydWN0b3JcclxuXHJcbiAgQElucHV0KCdub3ZvU2ltcGxlSGVhZGVyUm93RGVmJylcclxuICBjb2x1bW5zO1xyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tub3ZvU2ltcGxlUm93RGVmXScsXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBOb3ZvU2ltcGxlUm93RGVmIH1dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1NpbXBsZVJvd0RlZjxUPiBleHRlbmRzIF9Ob3ZvQ2RrUm93RGVmPFQ+IHtcclxuICAvLyBUT0RPOiBhZGQgZXhwbGljaXQgY29uc3RydWN0b3JcclxuXHJcbiAgQElucHV0KCdub3ZvU2ltcGxlUm93RGVmQ29sdW1ucycpXHJcbiAgY29sdW1ucztcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXNpbXBsZS1oZWFkZXItcm93JyxcclxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9TaW1wbGVIZWFkZXJSb3cgZXh0ZW5kcyBfTm92b0hlYWRlclJvdyB7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXHJcbiAgcHVibGljIHJvd0NsYXNzID0gJ25vdm8tc2ltcGxlLWhlYWRlci1yb3cnO1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcclxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tc2ltcGxlLXJvdycsXHJcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvU2ltcGxlUm93IGV4dGVuZHMgX05vdm9Sb3cge1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIHB1YmxpYyByb3dDbGFzcyA9ICdub3ZvLXNpbXBsZS1yb3cnO1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcclxuICBwdWJsaWMgcm9sZSA9ICdyb3cnO1xyXG59XHJcbiJdfQ==