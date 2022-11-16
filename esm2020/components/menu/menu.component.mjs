import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MENU_OPTIONS, PARENT_MENU } from './menu.tokens';
import { NovoMenuService } from './menu.service';
import { MenuItemDirective } from './menu-item.directive';
import { NovoOption } from 'novo-elements/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL21lbnUvbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBbUMsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFpQ2xELE1BQU0sT0FBTyxhQUFhO0lBZ0J4QixZQUNVLFdBQTRCLEVBQzVCLGNBQWlDLEVBQ2pDLFVBQXNCLEVBR3RCLE9BQXFCO1FBTHJCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUd0QixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBckJmLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELFNBQUksR0FBa0Ms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QkksUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxZQUFZOzRDQXBCTixTQUFTO3NCQUF4QixLQUFLO2dCQUNVLFNBQVM7c0JBQXhCLEtBQUs7Z0JBQ1UsUUFBUTtzQkFBdkIsS0FBSztnQkFDVyxLQUFLO3NCQUFyQixNQUFNO2dCQUNVLElBQUk7c0JBQXBCLE1BQU07Z0JBQ29DLFNBQVM7c0JBQW5ELGVBQWU7dUJBQUMsaUJBQWlCO2dCQUNFLFdBQVc7c0JBQTlDLGVBQWU7dUJBQUMsVUFBVTtnQkFDRCxXQUFXO3NCQUFwQyxTQUFTO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElMaW5rQ29uZmlnLCBJTWVudU9wdGlvbnMgfSBmcm9tICcuL21lbnUudHlwZXMnO1xuaW1wb3J0IHsgTUVOVV9PUFRJT05TLCBQQVJFTlRfTUVOVSB9IGZyb20gJy4vbWVudS50b2tlbnMnO1xuaW1wb3J0IHsgQ2xvc2VNZW51RXZlbnQsIElNZW51Q2xpY2tFdmVudCwgTm92b01lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b09wdGlvbiB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBNb3VzZUxvY2F0aW9uIHtcbiAgbGVmdD86IHN0cmluZztcbiAgbWFyZ2luTGVmdD86IHN0cmluZztcbiAgbWFyZ2luVG9wPzogc3RyaW5nO1xuICB0b3A/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ25vdm8tbWVudScsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHotaW5kZXg6IHoob3ZlcmxheSk7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB9XG4gICAgICAubm92by1tZW51LmNkay1vdmVybGF5LXBhbmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG4gIHRlbXBsYXRlOiBgYCxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBQQVJFTlRfTUVOVSwgdXNlRXhpc3Rpbmc6IE1lbnVDb21wb25lbnQgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNsYXNzID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY2xvc2U6IEV2ZW50RW1pdHRlcjxDbG9zZU1lbnVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb3BlbjogRXZlbnRFbWl0dGVyPElNZW51Q2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWVudUl0ZW1EaXJlY3RpdmUpIHB1YmxpYyBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxNZW51SXRlbURpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTm92b09wdGlvbikgcHVibGljIG1lbnVPcHRpb25zOiBRdWVyeUxpc3Q8Tm92b09wdGlvbj47XG4gIEBWaWV3Q2hpbGQoJ21lbnUnKSBwdWJsaWMgbWVudUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyB2aXNpYmxlTWVudUl0ZW1zOiBNZW51SXRlbURpcmVjdGl2ZVtdID0gW107XG5cbiAgcHVibGljIGxpbmtzOiBJTGlua0NvbmZpZ1tdID0gW107XG4gIHB1YmxpYyBpdGVtOiBhbnk7XG4gIHB1YmxpYyBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtZW51U2VydmljZTogTm92b01lbnVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTUVOVV9PUFRJT05TKVxuICAgIHByaXZhdGUgb3B0aW9uczogSU1lbnVPcHRpb25zLFxuICApIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5hdXRvRm9jdXMgPSBvcHRpb25zLmF1dG9Gb2N1cztcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgbWVudVNlcnZpY2Uuc2hvdy5zdWJzY3JpYmUoKG1lbnVFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9uTWVudUV2ZW50KG1lbnVFdmVudCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgb25NZW51RXZlbnQobWVudUV2ZW50OiBJTWVudUNsaWNrRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IG1lbnUsIGV2ZW50LCBpdGVtIH0gPSBtZW51RXZlbnQ7XG4gICAgaWYgKG1lbnUgJiYgbWVudSAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5pdGVtID0gaXRlbTtcbiAgICB0aGlzLnNldFZpc2libGVNZW51SXRlbXMoKTtcbiAgICB0aGlzLm1lbnVTZXJ2aWNlLm9wZW5NZW51KHsgLi4ubWVudUV2ZW50LCBtZW51SXRlbXM6IHRoaXMudmlzaWJsZU1lbnVJdGVtcywgbWVudUNsYXNzOiB0aGlzLm1lbnVDbGFzcyB9KTtcbiAgICB0aGlzLm1lbnVTZXJ2aWNlLmNsb3NlXG4gICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKChjbG9zZUV2ZW50KSA9PiB0aGlzLmNsb3NlLmVtaXQoY2xvc2VFdmVudCkpO1xuICAgIHRoaXMub3Blbi5uZXh0KG1lbnVFdmVudCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtLm1lbnVJdGVtVmlzaWJsZSk7XG4gIH1cblxuICBwdWJsaWMgc2V0VmlzaWJsZU1lbnVJdGVtcygpOiB2b2lkIHtcbiAgICB0aGlzLnZpc2libGVNZW51SXRlbXMgPSB0aGlzLm1lbnVJdGVtcy5maWx0ZXIoKG1lbnVJdGVtKSA9PiB0aGlzLmlzTWVudUl0ZW1WaXNpYmxlKG1lbnVJdGVtKSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=