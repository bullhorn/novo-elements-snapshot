import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, ViewEncapsulation, } from '@angular/core';
import { NOVO_LAYOUT_CONTAINER } from '../layout.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class NovoLayoutContent extends CdkScrollable {
    constructor(_changeDetectorRef, _container, // NovoLayoutContainer
    elementRef, scrollDispatcher, ngZone) {
        super(elementRef, scrollDispatcher, ngZone);
        this._changeDetectorRef = _changeDetectorRef;
        this._container = _container;
    }
    ngAfterContentInit() {
        this._container._contentMarginChanges.subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    getHostElement() {
        return this.elementRef.nativeElement;
    }
}
NovoLayoutContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLayoutContent, deps: [{ token: i0.ChangeDetectorRef }, { token: NOVO_LAYOUT_CONTAINER }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NovoLayoutContent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoLayoutContent, selector: "novo-layout-content", host: { classAttribute: "novo-layout-content" }, exportAs: ["novoLayoutContent"], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoLayoutContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-layout-content',
                    exportAs: 'novoLayoutContent',
                    template: '<ng-content></ng-content>',
                    host: {
                        class: 'novo-layout-content',
                        // '[style.margin-left.px]': '_container._contentMargins.left',
                        // '[style.margin-right.px]': '_container._contentMargins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_LAYOUT_CONTAINER]
                }] }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9sYXlvdXQvY29udGVudC9sYXlvdXQtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQWM1RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTtJQUNsRCxZQUNVLGtCQUFxQyxFQUNQLFVBQWUsRUFBRSxzQkFBc0I7SUFDN0UsVUFBbUMsRUFDbkMsZ0JBQWtDLEVBQ2xDLE1BQWM7UUFFZCxLQUFLLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBTnBDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDUCxlQUFVLEdBQVYsVUFBVSxDQUFLO0lBTXZELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ25ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDOzsrR0FuQlUsaUJBQWlCLG1EQUdsQixxQkFBcUI7bUdBSHBCLGlCQUFpQixvS0FUbEIsMkJBQTJCOzRGQVMxQixpQkFBaUI7a0JBWjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxxQkFBcUI7d0JBQzVCLCtEQUErRDt3QkFDL0QsaUVBQWlFO3FCQUNsRTtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzswQkFJSSxNQUFNOzJCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1Njcm9sbGFibGUsIFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5PVk9fTEFZT1VUX0NPTlRBSU5FUiB9IGZyb20gJy4uL2xheW91dC5jb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWxheW91dC1jb250ZW50JyxcbiAgZXhwb3J0QXM6ICdub3ZvTGF5b3V0Q29udGVudCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25vdm8tbGF5b3V0LWNvbnRlbnQnLFxuICAgIC8vICdbc3R5bGUubWFyZ2luLWxlZnQucHhdJzogJ19jb250YWluZXIuX2NvbnRlbnRNYXJnaW5zLmxlZnQnLFxuICAgIC8vICdbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XSc6ICdfY29udGFpbmVyLl9jb250ZW50TWFyZ2lucy5yaWdodCcsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTGF5b3V0Q29udGVudCBleHRlbmRzIENka1Njcm9sbGFibGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoTk9WT19MQVlPVVRfQ09OVEFJTkVSKSBwdWJsaWMgX2NvbnRhaW5lcjogYW55LCAvLyBOb3ZvTGF5b3V0Q29udGFpbmVyXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc2Nyb2xsRGlzcGF0Y2hlciwgbmdab25lKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9jb250YWluZXIuX2NvbnRlbnRNYXJnaW5DaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEhvc3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19