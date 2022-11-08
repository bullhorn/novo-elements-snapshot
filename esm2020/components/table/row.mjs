import { CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
/** Workaround for https://github.com/angular/angular/issues/17849 */
export const _NovoHeaderRowDef = CdkHeaderRowDef;
export const _NovoCdkRowDef = CdkRowDef;
export const _NovoHeaderRow = CdkHeaderRow;
export const _NovoRow = CdkRow;
export class NovoHeaderRowDef extends _NovoHeaderRowDef {
}
NovoHeaderRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoHeaderRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoHeaderRowDef, selector: "[novoHeaderRowDef]", inputs: { columns: ["novoHeaderRowDef", "columns"] }, providers: [{ provide: CdkHeaderRowDef, useExisting: NovoHeaderRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoHeaderRowDef]',
                    providers: [{ provide: CdkHeaderRowDef, useExisting: NovoHeaderRowDef }],
                }]
        }], propDecorators: { columns: [{
                type: Input,
                args: ['novoHeaderRowDef']
            }] } });
export class NovoRowDef extends _NovoCdkRowDef {
}
NovoRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRowDef, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NovoRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoRowDef, selector: "[novoRowDef]", inputs: { columns: ["novoRowDefColumns", "columns"] }, providers: [{ provide: CdkRowDef, useExisting: NovoRowDef }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoRowDef]',
                    providers: [{ provide: CdkRowDef, useExisting: NovoRowDef }],
                }]
        }], propDecorators: { columns: [{
                type: Input,
                args: ['novoRowDefColumns']
            }] } });
export class NovoHeaderRow extends _NovoHeaderRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-header-row';
        this.role = 'row';
    }
}
NovoHeaderRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoHeaderRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoHeaderRow, selector: "novo-header-row", host: { properties: { "class": "this.rowClass", "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, directives: [{ type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoHeaderRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-header-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
export class NovoRow extends _NovoRow {
    constructor() {
        super(...arguments);
        this.rowClass = 'novo-row';
        this.role = 'row';
    }
}
NovoRow.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRow, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoRow.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoRow, selector: "novo-table-row", host: { properties: { "class": "this.rowClass", "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: "<ng-container cdkCellOutlet></ng-container>", isInline: true, directives: [{ type: i1.CdkCellOutlet, selector: "[cdkCellOutlet]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-table-row',
                    template: CDK_ROW_TEMPLATE,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { rowClass: [{
                type: HostBinding,
                args: ['class']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy90YWJsZS9yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUVsRyxxRUFBcUU7QUFDckUsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDeEMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDO0FBTS9CLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxpQkFBaUI7OzhHQUExQyxnQkFBZ0I7a0dBQWhCLGdCQUFnQixtR0FGaEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLENBQUM7NEZBRTdELGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO2lCQUN6RTs4QkFLQyxPQUFPO3NCQUROLEtBQUs7dUJBQUMsa0JBQWtCOztBQVEzQixNQUFNLE9BQU8sVUFBYyxTQUFRLGNBQWlCOzt3R0FBdkMsVUFBVTs0RkFBVixVQUFVLDhGQUZWLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQzs0RkFFakQsVUFBVTtrQkFKdEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsWUFBWSxFQUFFLENBQUM7aUJBQzdEOzhCQUtDLE9BQU87c0JBRE4sS0FBSzt1QkFBQyxtQkFBbUI7O0FBUzVCLE1BQU0sT0FBTyxhQUFjLFNBQVEsY0FBYztJQUxqRDs7UUFPUyxhQUFRLEdBQUcsaUJBQWlCLENBQUM7UUFFN0IsU0FBSSxHQUFHLEtBQUssQ0FBQztLQUNyQjs7MkdBTFksYUFBYTsrRkFBYixhQUFhOzRGQUFiLGFBQWE7a0JBTHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzhCQUdRLFFBQVE7c0JBRGQsV0FBVzt1QkFBQyxPQUFPO2dCQUdiLElBQUk7c0JBRFYsV0FBVzt1QkFBQyxXQUFXOztBQVMxQixNQUFNLE9BQU8sT0FBUSxTQUFRLFFBQVE7SUFMckM7O1FBT1MsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUV0QixTQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOztxR0FMWSxPQUFPO3lGQUFQLE9BQU87NEZBQVAsT0FBTztrQkFMbkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBR1EsUUFBUTtzQkFEZCxXQUFXO3VCQUFDLE9BQU87Z0JBR2IsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtIZWFkZXJSb3csIENka0hlYWRlclJvd0RlZiwgQ2RrUm93LCBDZGtSb3dEZWYsIENES19ST1dfVEVNUExBVEUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE3ODQ5ICovXG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3dEZWYgPSBDZGtIZWFkZXJSb3dEZWY7XG5leHBvcnQgY29uc3QgX05vdm9DZGtSb3dEZWYgPSBDZGtSb3dEZWY7XG5leHBvcnQgY29uc3QgX05vdm9IZWFkZXJSb3cgPSBDZGtIZWFkZXJSb3c7XG5leHBvcnQgY29uc3QgX05vdm9Sb3cgPSBDZGtSb3c7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvSGVhZGVyUm93RGVmXScsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ2RrSGVhZGVyUm93RGVmLCB1c2VFeGlzdGluZzogTm92b0hlYWRlclJvd0RlZiB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0hlYWRlclJvd0RlZiBleHRlbmRzIF9Ob3ZvSGVhZGVyUm93RGVmIHtcbiAgLy8gVE9ETzogYWRkIGV4cGxpY2l0IGNvbnN0cnVjdG9yXG5cbiAgQElucHV0KCdub3ZvSGVhZGVyUm93RGVmJylcbiAgY29sdW1ucztcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25vdm9Sb3dEZWZdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBOb3ZvUm93RGVmIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUm93RGVmPFQ+IGV4dGVuZHMgX05vdm9DZGtSb3dEZWY8VD4ge1xuICAvLyBUT0RPOiBhZGQgZXhwbGljaXQgY29uc3RydWN0b3JcblxuICBASW5wdXQoJ25vdm9Sb3dEZWZDb2x1bW5zJylcbiAgY29sdW1ucztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1oZWFkZXItcm93JyxcbiAgdGVtcGxhdGU6IENES19ST1dfVEVNUExBVEUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvSGVhZGVyUm93IGV4dGVuZHMgX05vdm9IZWFkZXJSb3cge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgcHVibGljIHJvd0NsYXNzID0gJ25vdm8taGVhZGVyLXJvdyc7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAncm93Jztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWJsZS1yb3cnLFxuICB0ZW1wbGF0ZTogQ0RLX1JPV19URU1QTEFURSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Sb3cgZXh0ZW5kcyBfTm92b1JvdyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBwdWJsaWMgcm93Q2xhc3MgPSAnbm92by1yb3cnO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3Jvdyc7XG59XG4iXX0=