import { ElementRef, Input, Renderer2, HostBinding, Component, ChangeDetectionStrategy, TemplateRef, EventEmitter, } from '@angular/core';
import { CdkCell, CdkColumnDef } from '@angular/cdk/table';
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
NovoDataTableCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-data-table-cell',
                template: `
    <ng-container *ngTemplateOutlet="template; context: {$implicit: row, col: column}"></ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoDataTableCell.ctorParameters = () => [
    { type: CdkColumnDef },
    { type: ElementRef },
    { type: Renderer2 }
];
NovoDataTableCell.propDecorators = {
    role: [{ type: HostBinding, args: ['attr.role',] }],
    row: [{ type: Input }],
    template: [{ type: Input }],
    column: [{ type: Input }],
    resized: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvZGF0YS10YWJsZS9jZWxscy9kYXRhLXRhYmxlLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULHVCQUF1QixFQUV2QixXQUFXLEVBQ1gsWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFZM0QsTUFBTSxPQUFPLGlCQUFxQixTQUFRLE9BQU87SUFTL0MsWUFBWSxTQUF1QixFQUFVLFVBQXNCLEVBQVUsUUFBbUI7UUFDOUYsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQURjLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUnRFLFNBQUksR0FBRyxVQUFVLENBQUM7UUFNcEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBSXpDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDdkgsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGVBQWUsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUM3RixRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztTQUMzRjtRQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUEyQixFQUFFLEVBQUU7WUFDckQsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBMEIsRUFBRSxFQUFFO1lBQ3hELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUM3RixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7R0FFVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBWGlCLFlBQVk7WUFYNUIsVUFBVTtZQUVWLFNBQVM7OzttQkFzQlIsV0FBVyxTQUFDLFdBQVc7a0JBRXZCLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uRGVzdHJveSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2RrQ2VsbCwgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuXHJcbmltcG9ydCB7IElEYXRhVGFibGVDb2x1bW4gfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tZGF0YS10YWJsZS1jZWxsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3csIGNvbDogY29sdW1ufVwiPjwvbmctY29udGFpbmVyPlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlQ2VsbDxUPiBleHRlbmRzIENka0NlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKSByb2xlID0gJ2dyaWRjZWxsJztcclxuXHJcbiAgQElucHV0KCkgcm93OiBUO1xyXG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBJbnB1dCgpIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPjtcclxuICBASW5wdXQoKSByZXNpemVkOiBFdmVudEVtaXR0ZXI8SURhdGFUYWJsZUNvbHVtbjxUPj47XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IENka0NvbHVtbkRlZiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcclxuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XHJcbiAgICByZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGF0YS1hdXRvbWF0aW9uLWlkJywgYG5vdm8tY29sdW1uLSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWApO1xyXG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbm92by1jb2x1bW4tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YCk7XHJcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdub3ZvLWRhdGEtdGFibGUtY2VsbCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uLmNlbGxDbGFzcykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbHVtbi5jZWxsQ2xhc3ModGhpcy5yb3cpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb2x1bW4ucmlnaHRBbGlnbkNlbGxDb250ZW50KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdub3ZvLWRhdGEtdGFibGUtY2VsbC1hbGlnbi1yaWdodCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhzKCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5yZXNpemVkLnN1YnNjcmliZSgoY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gdGhpcy5jb2x1bW4pIHtcclxuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlV2lkdGhzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcclxuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FsY3VsYXRlV2lkdGhzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uLndpZHRoKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCBgJHt0aGlzLmNvbHVtbi53aWR0aH1weGApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7dGhpcy5jb2x1bW4ud2lkdGh9cHhgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19