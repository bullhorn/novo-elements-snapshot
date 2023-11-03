import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NovoOption } from 'novo-elements/elements/common';
import { MenuItemDirective } from './menu-item.directive';
import { NovoMenuService } from './menu.service';
import { MENU_OPTIONS, PARENT_MENU } from './menu.tokens';
import * as i0 from "@angular/core";
import * as i1 from "./menu.service";
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
        this.menuService.openMenu({ ...menuEvent, menuItems: this.visibleMenuItems, menuClass: this.menuClass });
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
MenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuComponent, deps: [{ token: i1.NovoMenuService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: MENU_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MenuComponent, selector: "novo-menu", inputs: { menuClass: "menuClass", autoFocus: "autoFocus", disabled: "disabled" }, outputs: { close: "close", open: "open" }, providers: [{ provide: PARENT_MENU, useExisting: MenuComponent }], queries: [{ propertyName: "menuItems", predicate: MenuItemDirective }, { propertyName: "menuOptions", predicate: NovoOption }], viewQueries: [{ propertyName: "menuElement", first: true, predicate: ["menu"], descendants: true }], ngImport: i0, template: ``, isInline: true, styles: [".cdk-overlay-container{position:fixed;z-index:z(overlay);pointer-events:none;top:0;left:0;width:100%;height:100%}.novo-menu.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuComponent, decorators: [{
            type: Component,
            args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'novo-menu',
                    styles: [
                        `
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
    `,
                    ],
                    template: ``,
                    providers: [{ provide: PARENT_MENU, useExisting: MenuComponent }],
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoMenuService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MENU_OPTIONS]
                }] }]; }, propDecorators: { menuClass: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], disabled: [{
                type: Input
            }], close: [{
                type: Output
            }], open: [{
                type: Output
            }], menuItems: [{
                type: ContentChildren,
                args: [MenuItemDirective]
            }], menuOptions: [{
                type: ContentChildren,
                args: [NovoOption]
            }], menuElement: [{
                type: ViewChild,
                args: ['menu']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tZW51L21lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFtQyxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBa0MxRCxNQUFNLE9BQU8sYUFBYTtJQWdCeEIsWUFDVSxXQUE0QixFQUM1QixjQUFpQyxFQUNqQyxVQUFzQixFQUd0QixPQUFxQjtRQUxyQixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHdEIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQXJCZixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCxTQUFJ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RTs7MEJBcUJJLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsWUFBWTs0Q0FwQk4sU0FBUztzQkFBeEIsS0FBSztnQkFDVSxTQUFTO3NCQUF4QixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1csS0FBSztzQkFBckIsTUFBTTtnQkFDVSxJQUFJO3NCQUFwQixNQUFNO2dCQUNvQyxTQUFTO3NCQUFuRCxlQUFlO3VCQUFDLGlCQUFpQjtnQkFDRSxXQUFXO3NCQUE5QyxlQUFlO3VCQUFDLFVBQVU7Z0JBQ0QsV0FBVztzQkFBcEMsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2xvc2VNZW51RXZlbnQsIElNZW51Q2xpY2tFdmVudCwgTm92b01lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgTUVOVV9PUFRJT05TLCBQQVJFTlRfTUVOVSB9IGZyb20gJy4vbWVudS50b2tlbnMnO1xuaW1wb3J0IHsgSUxpbmtDb25maWcsIElNZW51T3B0aW9ucyB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VMb2NhdGlvbiB7XG4gIGxlZnQ/OiBzdHJpbmc7XG4gIG1hcmdpbkxlZnQ/OiBzdHJpbmc7XG4gIG1hcmdpblRvcD86IHN0cmluZztcbiAgdG9wPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICdub3ZvLW1lbnUnLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuY2RrLW92ZXJsYXktY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB6LWluZGV4OiB6KG92ZXJsYXkpO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgfVxuICAgICAgLm5vdm8tbWVudS5jZGstb3ZlcmxheS1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxuICB0ZW1wbGF0ZTogYGAsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogUEFSRU5UX01FTlUsIHVzZUV4aXN0aW5nOiBNZW51Q29tcG9uZW50IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDbGFzcyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlOiBFdmVudEVtaXR0ZXI8Q2xvc2VNZW51RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW46IEV2ZW50RW1pdHRlcjxJTWVudUNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAQ29udGVudENoaWxkcmVuKE1lbnVJdGVtRGlyZWN0aXZlKSBwdWJsaWMgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TWVudUl0ZW1EaXJlY3RpdmU+O1xuICBAQ29udGVudENoaWxkcmVuKE5vdm9PcHRpb24pIHB1YmxpYyBtZW51T3B0aW9uczogUXVlcnlMaXN0PE5vdm9PcHRpb24+O1xuICBAVmlld0NoaWxkKCdtZW51JykgcHVibGljIG1lbnVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBwdWJsaWMgdmlzaWJsZU1lbnVJdGVtczogTWVudUl0ZW1EaXJlY3RpdmVbXSA9IFtdO1xuXG4gIHB1YmxpYyBsaW5rczogSUxpbmtDb25maWdbXSA9IFtdO1xuICBwdWJsaWMgaXRlbTogYW55O1xuICBwdWJsaWMgZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE5vdm9NZW51U2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1FTlVfT1BUSU9OUylcbiAgICBwcml2YXRlIG9wdGlvbnM6IElNZW51T3B0aW9ucyxcbiAgKSB7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuYXV0b0ZvY3VzID0gb3B0aW9ucy5hdXRvRm9jdXM7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIG1lbnVTZXJ2aWNlLnNob3cuc3Vic2NyaWJlKChtZW51RXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbk1lbnVFdmVudChtZW51RXZlbnQpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIG9uTWVudUV2ZW50KG1lbnVFdmVudDogSU1lbnVDbGlja0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBtZW51LCBldmVudCwgaXRlbSB9ID0gbWVudUV2ZW50O1xuICAgIGlmIChtZW51ICYmIG1lbnUgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgIHRoaXMuaXRlbSA9IGl0ZW07XG4gICAgdGhpcy5zZXRWaXNpYmxlTWVudUl0ZW1zKCk7XG4gICAgdGhpcy5tZW51U2VydmljZS5vcGVuTWVudSh7IC4uLm1lbnVFdmVudCwgbWVudUl0ZW1zOiB0aGlzLnZpc2libGVNZW51SXRlbXMsIG1lbnVDbGFzczogdGhpcy5tZW51Q2xhc3MgfSk7XG4gICAgdGhpcy5tZW51U2VydmljZS5jbG9zZVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoY2xvc2VFdmVudCkgPT4gdGhpcy5jbG9zZS5lbWl0KGNsb3NlRXZlbnQpKTtcbiAgICB0aGlzLm9wZW4ubmV4dChtZW51RXZlbnQpO1xuICB9XG5cbiAgcHVibGljIGlzTWVudUl0ZW1WaXNpYmxlKG1lbnVJdGVtOiBNZW51SXRlbURpcmVjdGl2ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmV2YWx1YXRlSWZGdW5jdGlvbihtZW51SXRlbS5tZW51SXRlbVZpc2libGUpO1xuICB9XG5cbiAgcHVibGljIHNldFZpc2libGVNZW51SXRlbXMoKTogdm9pZCB7XG4gICAgdGhpcy52aXNpYmxlTWVudUl0ZW1zID0gdGhpcy5tZW51SXRlbXMuZmlsdGVyKChtZW51SXRlbSkgPT4gdGhpcy5pc01lbnVJdGVtVmlzaWJsZShtZW51SXRlbSkpO1xuICB9XG5cbiAgcHVibGljIGV2YWx1YXRlSWZGdW5jdGlvbih2YWx1ZTogYW55KTogYW55IHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHZhbHVlKHRoaXMuaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl19