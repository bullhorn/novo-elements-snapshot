import { CdkColumnDef, CdkHeaderCell } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, Renderer2, } from '@angular/core';
import { NOVO_DATA_TABLE_REF } from '../data-table.token';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
export class NovoDataTableExpandHeaderCell extends CdkHeaderCell {
    constructor(columnDef, elementRef, renderer, dataTable, ref) {
        super(columnDef, elementRef);
        this.dataTable = dataTable;
        this.ref = ref;
        this.role = 'columnheader';
        this.expanded = false;
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-expand-column-header-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-expand-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-expand-header-cell');
        this.expandSubscription = this.dataTable.state.expandSource.subscribe(() => {
            this.expanded = this.dataTable.allCurrentRowsExpanded();
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.expandSubscription) {
            this.expandSubscription.unsubscribe();
        }
    }
    expandAll() {
        this.dataTable.expandRows(!this.expanded);
    }
}
NovoDataTableExpandHeaderCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDataTableExpandHeaderCell, deps: [{ token: i1.CdkColumnDef }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NOVO_DATA_TABLE_REF }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoDataTableExpandHeaderCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NovoDataTableExpandHeaderCell, selector: "novo-data-table-expand-header-cell", host: { properties: { "attr.role": "this.role" } }, usesInheritance: true, ngImport: i0, template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NovoDataTableExpandHeaderCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-data-table-expand-header-cell',
                    template: ` <i class="bhi-next data-table-icon" novo-data-table-expander="true" (click)="expandAll()" [class.expanded]="expanded"></i> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1leHBhbmQtaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9jZWxsLWhlYWRlcnMvZGF0YS10YWJsZS1leHBhbmQtaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQW9CLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQU81RSxNQUFNLE9BQU8sNkJBQWlDLFNBQVEsYUFBYTtJQU9qRSxZQUNFLFNBQXVCLEVBQ3ZCLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ2tCLFNBQTJCLEVBQ3hELEdBQXNCO1FBRTlCLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFIUSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN4RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVZ6QixTQUFJLEdBQUcsY0FBYyxDQUFDO1FBRXRCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFXL0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLG9CQUFvQixFQUFFLDZCQUE2QixTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3JJLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxzQkFBc0IsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUNwRyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7MkhBakNVLDZCQUE2QixpR0FXOUIsbUJBQW1COytHQVhsQiw2QkFBNkIscUpBSDlCLDhIQUE4SDs0RkFHN0gsNkJBQTZCO2tCQUx6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLFFBQVEsRUFBRSw4SEFBOEg7b0JBQ3hJLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBWUksTUFBTTsyQkFBQyxtQkFBbUI7NEVBVHRCLElBQUk7c0JBRFYsV0FBVzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrQ29sdW1uRGVmLCBDZGtIZWFkZXJDZWxsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVSZWYsIE5PVk9fREFUQV9UQUJMRV9SRUYgfSBmcm9tICcuLi9kYXRhLXRhYmxlLnRva2VuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kYXRhLXRhYmxlLWV4cGFuZC1oZWFkZXItY2VsbCcsXG4gIHRlbXBsYXRlOiBgIDxpIGNsYXNzPVwiYmhpLW5leHQgZGF0YS10YWJsZS1pY29uXCIgbm92by1kYXRhLXRhYmxlLWV4cGFuZGVyPVwidHJ1ZVwiIChjbGljayk9XCJleHBhbmRBbGwoKVwiIFtjbGFzcy5leHBhbmRlZF09XCJleHBhbmRlZFwiPjwvaT4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVFeHBhbmRIZWFkZXJDZWxsPFQ+IGV4dGVuZHMgQ2RrSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAnY29sdW1uaGVhZGVyJztcblxuICBwdWJsaWMgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBleHBhbmRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb2x1bW5EZWY6IENka0NvbHVtbkRlZixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChOT1ZPX0RBVEFfVEFCTEVfUkVGKSBwcml2YXRlIGRhdGFUYWJsZTogTm92b0RhdGFUYWJsZVJlZixcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2RhdGEtYXV0b21hdGlvbi1pZCcsIGBub3ZvLWV4cGFuZC1jb2x1bW4taGVhZGVyLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tZXhwYW5kLWNvbHVtbi0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gKTtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdub3ZvLWRhdGEtdGFibGUtZXhwYW5kLWhlYWRlci1jZWxsJyk7XG5cbiAgICB0aGlzLmV4cGFuZFN1YnNjcmlwdGlvbiA9IHRoaXMuZGF0YVRhYmxlLnN0YXRlLmV4cGFuZFNvdXJjZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMuZGF0YVRhYmxlLmFsbEN1cnJlbnRSb3dzRXhwYW5kZWQoKTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4cGFuZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5leHBhbmRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXhwYW5kQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVRhYmxlLmV4cGFuZFJvd3MoIXRoaXMuZXhwYW5kZWQpO1xuICB9XG59XG4iXX0=