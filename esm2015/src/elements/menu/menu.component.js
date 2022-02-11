import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NovoOption } from '../common';
import { MenuItemDirective } from './menu-item.directive';
import { NovoMenuService } from './menu.service';
import { MENU_OPTIONS, PARENT_MENU } from './menu.tokens';
export class MenuComponent {
    constructor(menuService, changeDetector, elementRef, options) {
        this.menuService = menuService;
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.options = options;
        this.menuClass = '';
        this.autoFocus = false;
        this.disabled = false;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.visibleMenuItems = [];
        this.links = [];
        this.subscription = new Subscription();
        if (options) {
            this.autoFocus = options.autoFocus;
        }
        this.subscription.add(menuService.show.subscribe((menuEvent) => {
            this.onMenuEvent(menuEvent);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onMenuEvent(menuEvent) {
        if (this.disabled) {
            return;
        }
        const { menu, event, item } = menuEvent;
        if (menu && menu !== this) {
            return;
        }
        this.event = event;
        this.item = item;
        this.setVisibleMenuItems();
        this.menuService.openMenu(Object.assign(Object.assign({}, menuEvent), { menuItems: this.visibleMenuItems, menuClass: this.menuClass }));
        this.menuService.close
            .asObservable()
            .pipe(first())
            .subscribe((closeEvent) => this.close.emit(closeEvent));
        this.open.next(menuEvent);
    }
    isMenuItemVisible(menuItem) {
        return this.evaluateIfFunction(menuItem.menuItemVisible);
    }
    setVisibleMenuItems() {
        this.visibleMenuItems = this.menuItems.filter((menuItem) => this.isMenuItemVisible(menuItem));
    }
    evaluateIfFunction(value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'novo-menu',
                template: ``,
                providers: [{ provide: PARENT_MENU, useExisting: MenuComponent }],
                styles: [`
      .cdk-overlay-container {
        position: fixed;
        z-index: z(overlay);
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .novo-menu.cdk-overlay-pane {
        position: absolute;
        pointer-events: auto;
        box-sizing: border-box;
      }
    `]
            },] }
];
MenuComponent.ctorParameters = () => [
    { type: NovoMenuService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MENU_OPTIONS,] }] }
];
MenuComponent.propDecorators = {
    menuClass: [{ type: Input }],
    autoFocus: [{ type: Input }],
    disabled: [{ type: Input }],
    close: [{ type: Output }],
    open: [{ type: Output }],
    menuItems: [{ type: ContentChildren, args: [MenuItemDirective,] }],
    menuOptions: [{ type: ContentChildren, args: [NovoOption,] }],
    menuElement: [{ type: ViewChild, args: ['menu',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvbWVudS9tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQW1DLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBa0MxRCxNQUFNLE9BQU8sYUFBYTtJQWdCeEIsWUFDVSxXQUE0QixFQUM1QixjQUFpQyxFQUNqQyxVQUFzQixFQUd0QixPQUFxQjtRQUxyQixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHdEIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQXJCZixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCxTQUFJLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFJbkUscUJBQWdCLEdBQXdCLEVBQUUsQ0FBQztRQUUzQyxVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUd6QixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVXRELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sV0FBVyxDQUFDLFNBQTBCO1FBQzNDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDeEMsSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsaUNBQU0sU0FBUyxLQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUcsQ0FBQztRQUN6RyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7YUFDbkIsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxRQUEyQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxLQUFVO1FBQ2xDLElBQUksS0FBSyxZQUFZLFFBQVEsRUFBRTtZQUM3QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQTlGRixTQUFTLFNBQUM7Z0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxXQUFXO2dCQW1CckIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsQ0FBQzt5QkFsQi9EOzs7Ozs7Ozs7Ozs7Ozs7S0FlQzthQUlKOzs7WUFsQ3lDLGVBQWU7WUFsQnZELGlCQUFpQjtZQUdqQixVQUFVOzRDQXNFUCxRQUFRLFlBQ1IsTUFBTSxTQUFDLFlBQVk7Ozt3QkFwQnJCLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLE1BQU07bUJBQ04sTUFBTTt3QkFDTixlQUFlLFNBQUMsaUJBQWlCOzBCQUNqQyxlQUFlLFNBQUMsVUFBVTswQkFDMUIsU0FBUyxTQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdm9PcHRpb24gfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xvc2VNZW51RXZlbnQsIElNZW51Q2xpY2tFdmVudCwgTm92b01lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgTUVOVV9PUFRJT05TLCBQQVJFTlRfTUVOVSB9IGZyb20gJy4vbWVudS50b2tlbnMnO1xuaW1wb3J0IHsgSUxpbmtDb25maWcsIElNZW51T3B0aW9ucyB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VMb2NhdGlvbiB7XG4gIGxlZnQ/OiBzdHJpbmc7XG4gIG1hcmdpbkxlZnQ/OiBzdHJpbmc7XG4gIG1hcmdpblRvcD86IHN0cmluZztcbiAgdG9wPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICdub3ZvLW1lbnUnLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuY2RrLW92ZXJsYXktY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB6LWluZGV4OiB6KG92ZXJsYXkpO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgfVxuICAgICAgLm5vdm8tbWVudS5jZGstb3ZlcmxheS1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxuICB0ZW1wbGF0ZTogYGAsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogUEFSRU5UX01FTlUsIHVzZUV4aXN0aW5nOiBNZW51Q29tcG9uZW50IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDbGFzcyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlOiBFdmVudEVtaXR0ZXI8Q2xvc2VNZW51RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW46IEV2ZW50RW1pdHRlcjxJTWVudUNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAQ29udGVudENoaWxkcmVuKE1lbnVJdGVtRGlyZWN0aXZlKSBwdWJsaWMgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TWVudUl0ZW1EaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRpb24pIHB1YmxpYyBtZW51T3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+O1xuICBAVmlld0NoaWxkKCdtZW51JykgcHVibGljIG1lbnVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBwdWJsaWMgdmlzaWJsZU1lbnVJdGVtczogTWVudUl0ZW1EaXJlY3RpdmVbXSA9IFtdO1xuXG4gIHB1YmxpYyBsaW5rczogSUxpbmtDb25maWdbXSA9IFtdO1xuICBwdWJsaWMgaXRlbTogYW55O1xuICBwdWJsaWMgZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE5vdm9NZW51U2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1FTlVfT1BUSU9OUylcbiAgICBwcml2YXRlIG9wdGlvbnM6IElNZW51T3B0aW9ucyxcbiAgKSB7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuYXV0b0ZvY3VzID0gb3B0aW9ucy5hdXRvRm9jdXM7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIG1lbnVTZXJ2aWNlLnNob3cuc3Vic2NyaWJlKChtZW51RXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbk1lbnVFdmVudChtZW51RXZlbnQpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG9uTWVudUV2ZW50KG1lbnVFdmVudDogSU1lbnVDbGlja0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBtZW51LCBldmVudCwgaXRlbSB9ID0gbWVudUV2ZW50O1xuICAgIGlmIChtZW51ICYmIG1lbnUgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMuaXRlbSA9IGl0ZW07XG4gICAgdGhpcy5zZXRWaXNpYmxlTWVudUl0ZW1zKCk7XG4gICAgdGhpcy5tZW51U2VydmljZS5vcGVuTWVudSh7IC4uLm1lbnVFdmVudCwgbWVudUl0ZW1zOiB0aGlzLnZpc2libGVNZW51SXRlbXMsIG1lbnVDbGFzczogdGhpcy5tZW51Q2xhc3MgfSk7XG4gICAgdGhpcy5tZW51U2VydmljZS5jbG9zZVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoY2xvc2VFdmVudCkgPT4gdGhpcy5jbG9zZS5lbWl0KGNsb3NlRXZlbnQpKTtcbiAgICB0aGlzLm9wZW4ubmV4dChtZW51RXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGlzTWVudUl0ZW1WaXNpYmxlKG1lbnVJdGVtOiBNZW51SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlSWZGdW5jdGlvbihtZW51SXRlbS5tZW51SXRlbVZpc2libGUpO1xuICB9XG5cbiAgcHVibGljIHNldFZpc2libGVNZW51SXRlbXMoKTogdm9pZCB7XG4gICAgdGhpcy52aXNpYmxlTWVudUl0ZW1zID0gdGhpcy5tZW51SXRlbXMuZmlsdGVyKChtZW51SXRlbSkgPT4gdGhpcy5pc01lbnVJdGVtVmlzaWJsZShtZW51SXRlbSkpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlSWZGdW5jdGlvbih2YWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHZhbHVlKHRoaXMuaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl19