import { ElementRef, Input, Renderer2, HostBinding, Component, ChangeDetectionStrategy, TemplateRef, EventEmitter, } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/table";
import * as i2 from "@angular/common";
function NovoDataTableCell_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0, a1) { return { $implicit: a0, col: a1 }; };
export class NovoDataTableCell extends CdkCell {
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef);
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.role = 'gridcell';
        this.subscriptions = [];
        renderer.setAttribute(elementRef.nativeElement, 'data-automation-id', `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, `novo-column-${columnDef.cssClassFriendlyName}`);
        renderer.addClass(elementRef.nativeElement, 'novo-data-table-cell');
    }
    ngOnInit() {
        if (this.column.cellClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.column.cellClass(this.row));
        }
        if (this.column.rightAlignCellContent) {
            this.renderer.addClass(this.elementRef.nativeElement, 'novo-data-table-cell-align-right');
        }
        this.calculateWidths();
        this.subscriptions.push(this.resized.subscribe((column) => {
            if (column === this.column) {
                this.calculateWidths();
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }
    calculateWidths() {
        if (this.column.width) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this.column.width}px`);
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this.column.width}px`);
        }
    }
}
NovoDataTableCell.ɵfac = function NovoDataTableCell_Factory(t) { return new (t || NovoDataTableCell)(i0.ɵɵdirectiveInject(i1.CdkColumnDef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
NovoDataTableCell.ɵcmp = i0.ɵɵdefineComponent({ type: NovoDataTableCell, selectors: [["novo-data-table-cell"]], hostVars: 1, hostBindings: function NovoDataTableCell_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("role", ctx.role);
    } }, inputs: { row: "row", template: "template", column: "column", resized: "resized" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 5, consts: [[4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function NovoDataTableCell_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoDataTableCell_ng_container_0_Template, 1, 0, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c0, ctx.row, ctx.column));
    } }, directives: [i2.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoDataTableCell, [{
        type: Component,
        args: [{
                selector: 'novo-data-table-cell',
                template: `
    <ng-container *ngTemplateOutlet="template; context: {$implicit: row, col: column}"></ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.CdkColumnDef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { role: [{
            type: HostBinding,
            args: ['attr.role']
        }], row: [{
            type: Input
        }], template: [{
            type: Input
        }], column: [{
            type: Input
        }], resized: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRhLXRhYmxlL2NlbGxzL2RhdGEtdGFibGUtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1QsdUJBQXVCLEVBRXZCLFdBQVcsRUFDWCxZQUFZLEdBRWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7SUFRdkQsd0JBQWtHOzs7QUFJdEcsTUFBTSxPQUFPLGlCQUFxQixTQUFRLE9BQU87SUFTL0MsWUFBWSxTQUF1QixFQUFVLFVBQXNCLEVBQVUsUUFBbUI7UUFDOUYsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQURjLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUnRFLFNBQUksR0FBRyxVQUFVLENBQUM7UUFNcEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBSXpDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDdkgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGVBQWUsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUM3RixRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztTQUMzRjtRQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUEyQixFQUFFLEVBQUU7WUFDckQsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBMEIsRUFBRSxFQUFFO1lBQ3hELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDOztrRkEvQ1UsaUJBQWlCO3NEQUFqQixpQkFBaUI7OztRQUoxQixvRkFBbUY7O1FBQXJFLCtDQUFvRSw0RUFBQTs7a0RBSXpFLGlCQUFpQjtjQVA3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOztHQUVUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEO2dIQUUyQixJQUFJO2tCQUE3QixXQUFXO21CQUFDLFdBQVc7WUFFZixHQUFHO2tCQUFYLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMixcbiAgSG9zdEJpbmRpbmcsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka0NlbGwsIENka0NvbHVtbkRlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IElEYXRhVGFibGVDb2x1bW4gfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRhdGEtdGFibGUtY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3csIGNvbDogY29sdW1ufVwiPjwvbmctY29udGFpbmVyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0RhdGFUYWJsZUNlbGw8VD4gZXh0ZW5kcyBDZGtDZWxsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJvbGUgPSAnZ3JpZGNlbGwnO1xuXG4gIEBJbnB1dCgpIHJvdzogVDtcbiAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPjtcbiAgQElucHV0KCkgcmVzaXplZDogRXZlbnRFbWl0dGVyPElEYXRhVGFibGVDb2x1bW48VD4+O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG5vdm8tY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1jZWxsJyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sdW1uLmNlbGxDbGFzcykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5jb2x1bW4uY2VsbENsYXNzKHRoaXMucm93KSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29sdW1uLnJpZ2h0QWxpZ25DZWxsQ29udGVudCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25vdm8tZGF0YS10YWJsZS1jZWxsLWFsaWduLXJpZ2h0Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5jYWxjdWxhdGVXaWR0aHMoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucmVzaXplZC5zdWJzY3JpYmUoKGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPikgPT4ge1xuICAgICAgICBpZiAoY29sdW1uID09PSB0aGlzLmNvbHVtbikge1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlV2lkdGhzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbi53aWR0aCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRofXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuY29sdW1uLndpZHRofXB4YCk7XG4gICAgfVxuICB9XG59XG4iXX0=