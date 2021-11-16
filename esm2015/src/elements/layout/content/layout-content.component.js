import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, ViewEncapsulation, } from '@angular/core';
import { NOVO_LAYOUT_CONTAINER } from '../layout.constants';
export class NovoLayoutContent extends CdkScrollable {
    constructor(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
        super(elementRef, scrollDispatcher, ngZone);
        this._changeDetectorRef = _changeDetectorRef;
        this._container = _container;
    }
    ngAfterContentInit() {
        this._container._contentMarginChanges.subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
}
NovoLayoutContent.decorators = [
    { type: Component, args: [{
                selector: 'novo-layout-content',
                exportAs: 'novoLayoutContent',
                template: '<ng-content></ng-content>',
                host: {
                    class: 'novo-layout-content',
                    '[style.margin-left.px]': '_container._contentMargins.left',
                    '[style.margin-right.px]': '_container._contentMargins.right',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
NovoLayoutContent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NovoLayoutContainer, decorators: [{ type: Inject, args: [NOVO_LAYOUT_CONTAINER,] }] },
    { type: ElementRef },
    { type: ScrollDispatcher },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2xheW91dC9jb250ZW50L2xheW91dC1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWM1RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTtJQUNsRCxZQUNVLGtCQUFxQyxFQUNQLFVBQStCLEVBQ3JFLFVBQW1DLEVBQ25DLGdCQUFrQyxFQUNsQyxNQUFjO1FBRWQsS0FBSyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQU5wQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ1AsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7SUFNdkUsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbkQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBM0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHFCQUFxQjtvQkFDNUIsd0JBQXdCLEVBQUUsaUNBQWlDO29CQUMzRCx5QkFBeUIsRUFBRSxrQ0FBa0M7aUJBQzlEO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7O1lBckJDLGlCQUFpQjtZQU9MLG1CQUFtQix1QkFrQjVCLE1BQU0sU0FBQyxxQkFBcUI7WUF2Qi9CLFVBQVU7WUFOWSxnQkFBZ0I7WUFRdEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1Njcm9sbGFibGUsIFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgTm92b0xheW91dENvbnRhaW5lciB9IGZyb20gJy4uL2NvbnRhaW5lci9sYXlvdXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOT1ZPX0xBWU9VVF9DT05UQUlORVIgfSBmcm9tICcuLi9sYXlvdXQuY29uc3RhbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1sYXlvdXQtY29udGVudCcsXG4gIGV4cG9ydEFzOiAnbm92b0xheW91dENvbnRlbnQnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdub3ZvLWxheW91dC1jb250ZW50JyxcbiAgICAnW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XSc6ICdfY29udGFpbmVyLl9jb250ZW50TWFyZ2lucy5sZWZ0JyxcbiAgICAnW3N0eWxlLm1hcmdpbi1yaWdodC5weF0nOiAnX2NvbnRhaW5lci5fY29udGVudE1hcmdpbnMucmlnaHQnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0xheW91dENvbnRlbnQgZXh0ZW5kcyBDZGtTY3JvbGxhYmxlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KE5PVk9fTEFZT1VUX0NPTlRBSU5FUikgcHVibGljIF9jb250YWluZXI6IE5vdm9MYXlvdXRDb250YWluZXIsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc2Nyb2xsRGlzcGF0Y2hlciwgbmdab25lKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9jb250YWluZXIuX2NvbnRlbnRNYXJnaW5DaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxufVxuIl19