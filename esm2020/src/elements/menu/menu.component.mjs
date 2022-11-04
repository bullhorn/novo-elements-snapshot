import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NovoOption } from '../common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tZW51L21lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBbUMsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQWtDMUQsTUFBTSxPQUFPLGFBQWE7SUFnQnhCLFlBQ1UsV0FBNEIsRUFDNUIsY0FBaUMsRUFDakMsVUFBc0IsRUFHdEIsT0FBcUI7UUFMckIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBR3RCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFyQmYsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsU0FB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bEU7OzBCQXFCSSxRQUFROzswQkFDUixNQUFNOzJCQUFDLFlBQVk7NENBcEJOLFNBQVM7c0JBQXhCLEtBQUs7Z0JBQ1UsU0FBUztzQkFBeEIsS0FBSztnQkFDVSxRQUFRO3NCQUF2QixLQUFLO2dCQUNXLEtBQUs7c0JBQXJCLE1BQU07Z0JBQ1UsSUFBSTtzQkFBcEIsTUFBTTtnQkFDb0MsU0FBUztzQkFBbkQsZUFBZTt1QkFBQyxpQkFBaUI7Z0JBQ0UsV0FBVztzQkFBOUMsZUFBZTt1QkFBQyxVQUFVO2dCQUNELFdBQVc7c0JBQXBDLFNBQVM7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm92b09wdGlvbiB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDbG9zZU1lbnVFdmVudCwgSU1lbnVDbGlja0V2ZW50LCBOb3ZvTWVudVNlcnZpY2UgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBNRU5VX09QVElPTlMsIFBBUkVOVF9NRU5VIH0gZnJvbSAnLi9tZW51LnRva2Vucyc7XG5pbXBvcnQgeyBJTGlua0NvbmZpZywgSU1lbnVPcHRpb25zIH0gZnJvbSAnLi9tZW51LnR5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNb3VzZUxvY2F0aW9uIHtcbiAgbGVmdD86IHN0cmluZztcbiAgbWFyZ2luTGVmdD86IHN0cmluZztcbiAgbWFyZ2luVG9wPzogc3RyaW5nO1xuICB0b3A/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ25vdm8tbWVudScsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHotaW5kZXg6IHoob3ZlcmxheSk7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB9XG4gICAgICAubm92by1tZW51LmNkay1vdmVybGF5LXBhbmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIHRlbXBsYXRlOiBgYCxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBQQVJFTlRfTUVOVSwgdXNlRXhpc3Rpbmc6IE1lbnVDb21wb25lbnQgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNsYXNzID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY2xvc2U6IEV2ZW50RW1pdHRlcjxDbG9zZU1lbnVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb3BlbjogRXZlbnRFbWl0dGVyPElNZW51Q2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWVudUl0ZW1EaXJlY3RpdmUpIHB1YmxpYyBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxNZW51SXRlbURpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbikgcHVibGljIG1lbnVPcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGQoJ21lbnUnKSBwdWJsaWMgbWVudUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyB2aXNpYmxlTWVudUl0ZW1zOiBNZW51SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgcHVibGljIGxpbmtzOiBJTGlua0NvbmZpZ1tdID0gW107XG4gIHB1YmxpYyBpdGVtOiBhbnk7XG4gIHB1YmxpYyBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtZW51U2VydmljZTogTm92b01lbnVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUVOVV9PUFRJT05TKVxuICAgIHByaXZhdGUgb3B0aW9uczogSU1lbnVPcHRpb25zLFxuICApIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5hdXRvRm9jdXMgPSBvcHRpb25zLmF1dG9Gb2N1cztcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgbWVudVNlcnZpY2Uuc2hvdy5zdWJzY3JpYmUoKG1lbnVFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9uTWVudUV2ZW50KG1lbnVFdmVudCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgb25NZW51RXZlbnQobWVudUV2ZW50OiBJTWVudUNsaWNrRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IG1lbnUsIGV2ZW50LCBpdGVtIH0gPSBtZW51RXZlbnQ7XG4gICAgaWYgKG1lbnUgJiYgbWVudSAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICB0aGlzLnNldFZpc2libGVNZW51SXRlbXMoKTtcbiAgICB0aGlzLm1lbnVTZXJ2aWNlLm9wZW5NZW51KHsgLi4ubWVudUV2ZW50LCBtZW51SXRlbXM6IHRoaXMudmlzaWJsZU1lbnVJdGVtcywgbWVudUNsYXNzOiB0aGlzLm1lbnVDbGFzcyB9KTtcbiAgICB0aGlzLm1lbnVTZXJ2aWNlLmNsb3NlXG4gICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKChjbG9zZUV2ZW50KSA9PiB0aGlzLmNsb3NlLmVtaXQoY2xvc2VFdmVudCkpO1xuICAgIHRoaXMub3Blbi5uZXh0KG1lbnVFdmVudCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtLm1lbnVJdGVtVmlzaWJsZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0VmlzaWJsZU1lbnVJdGVtcygpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2libGVNZW51SXRlbXMgPSB0aGlzLm1lbnVJdGVtcy5maWx0ZXIoKG1lbnVJdGVtKSA9PiB0aGlzLmlzTWVudUl0ZW1WaXNpYmxlKG1lbnVJdGVtKSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=