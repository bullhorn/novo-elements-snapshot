var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Inject, Input, Optional, } from '@angular/core';
import { BooleanInput } from '../../utils';
import { MenuContentComponent } from './menu-content.component';
import { MenuComponent } from './menu.component';
import { NovoMenuService } from './menu.service';
import { PARENT_MENU } from './menu.tokens';
import * as i0 from "@angular/core";
import * as i1 from "./menu.service";
import * as i2 from "./menu.component";
export class MenuDirective {
    constructor(element, menuService, cdr, _parentMenu) {
        this.element = element;
        this.menuService = menuService;
        this.cdr = cdr;
        this._parentMenu = _parentMenu;
        this.waitWhenOpen = false;
        this.capture = false;
        this.anchor = false;
        this.trigger = 'click';
        this.isSubMenu = false;
        this.isActive = false;
        if (!!this._parentMenu) {
            this.isSubMenu = true;
            this.trigger = 'mouseenter';
        }
    }
    get hb_menuActive() {
        return this.isActive;
    }
    ngOnInit() {
        this.subscription = this.menuService.close.subscribe(() => {
            this.isActive = false;
            this.cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        this.isActive = false;
        this.subscription.unsubscribe();
    }
    onMenuClick(event) {
        if (this.trigger !== event.type) {
            return;
        }
        if (this.trigger === 'click' && event.button !== 0) {
            return;
        }
        else if (this.trigger === 'contextmenu' && event.button !== 2) {
            return;
        }
        else if (this.waitWhenOpen && this.menuService.hasOpenMenus()) {
            return;
        }
        if (!this.menu.disabled) {
            this.menuService.show.next({
                menu: this.menu,
                event,
                item: this.menuContext,
                anchorElement: this.anchor ? this.element.nativeElement : null,
                parentMenu: this._parentMenu,
                menuTrigger: this,
            });
            this.isActive = true;
            event.preventDefault();
            event.stopPropagation();
            this.cdr.detectChanges();
        }
    }
}
MenuDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuDirective, deps: [{ token: i0.ElementRef }, { token: i1.NovoMenuService }, { token: i0.ChangeDetectorRef }, { token: PARENT_MENU, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MenuDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: MenuDirective, selector: "[menu]", inputs: { menuContext: "menuContext", menu: "menu", menuContent: "menuContent", waitWhenOpen: "waitWhenOpen", capture: "capture", anchor: "anchor", trigger: "trigger" }, host: { listeners: { "click": "onMenuClick($event)", "contextmenu": "onMenuClick($event)", "mouseenter": "onMenuClick($event)" }, properties: { "class.menu-active": "this.hb_menuActive" } }, ngImport: i0 });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], MenuDirective.prototype, "waitWhenOpen", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], MenuDirective.prototype, "capture", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], MenuDirective.prototype, "anchor", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[menu]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NovoMenuService }, { type: i0.ChangeDetectorRef }, { type: i2.MenuComponent, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [PARENT_MENU]
                }] }]; }, propDecorators: { menuContext: [{
                type: Input
            }], menu: [{
                type: Input
            }], menuContent: [{
                type: Input
            }], waitWhenOpen: [{
                type: Input
            }], capture: [{
                type: Input
            }], anchor: [{
                type: Input
            }], trigger: [{
                type: Input
            }], hb_menuActive: [{
                type: HostBinding,
                args: ['class.menu-active']
            }], onMenuClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }, {
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }, {
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tZW51L21lbnUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzVDLE1BQU0sT0FBTyxhQUFhO0lBa0J4QixZQUNVLE9BQW1CLEVBQ25CLFdBQTRCLEVBQzVCLEdBQXNCLEVBQ1csV0FBMEI7UUFIM0QsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDVyxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtRQWxCckMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hDLFlBQU8sR0FBMkMsT0FBTyxDQUFDO1FBRTFFLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQWN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQWpCRCxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQWdCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUtNLFdBQVcsQ0FBQyxLQUFpQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRTtZQUMvQixPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xELE9BQU87U0FDUjthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxhQUFhLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0QsT0FBTztTQUNSO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDL0QsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLEtBQUs7Z0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN0QixhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQzlELFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDNUIsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7MkdBdkVVLGFBQWEsNEdBc0JGLFdBQVc7K0ZBdEJ0QixhQUFhO0FBSUM7SUFBZixZQUFZLEVBQUU7O21EQUFzQztBQUNyQztJQUFmLFlBQVksRUFBRTs7OENBQWlDO0FBQ2hDO0lBQWYsWUFBWSxFQUFFOzs2Q0FBZ0M7NEZBTjdDLGFBQWE7a0JBSHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7aUJBQ25COzswQkF1QkksUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxXQUFXOzRDQXJCakIsV0FBVztzQkFBMUIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNVLFdBQVc7c0JBQTFCLEtBQUs7Z0JBQzBCLFlBQVk7c0JBQTNDLEtBQUs7Z0JBQzBCLE9BQU87c0JBQXRDLEtBQUs7Z0JBQzBCLE1BQU07c0JBQXJDLEtBQUs7Z0JBQ1UsT0FBTztzQkFBdEIsS0FBSztnQkFLRixhQUFhO3NCQURoQixXQUFXO3VCQUFDLG1CQUFtQjtnQkFrQ3pCLFdBQVc7c0JBSGpCLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDaEMsWUFBWTt1QkFBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQUN0QyxZQUFZO3VCQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IE1lbnVDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9NZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IFBBUkVOVF9NRU5VIH0gZnJvbSAnLi9tZW51LnRva2Vucyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZW51XScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51Q29udGV4dDogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudTogTWVudUNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDb250ZW50OiBNZW51Q29udGVudENvbXBvbmVudDtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIHB1YmxpYyB3YWl0V2hlbk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIHB1YmxpYyBjYXB0dXJlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBCb29sZWFuSW5wdXQoKSBwdWJsaWMgYW5jaG9yOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB0cmlnZ2VyOiAnY2xpY2snIHwgJ2NvbnRleHRtZW51JyB8ICdtb3VzZWVudGVyJyA9ICdjbGljayc7XG5cbiAgaXNTdWJNZW51OiBib29sZWFuID0gZmFsc2U7XG4gIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MubWVudS1hY3RpdmUnKVxuICBnZXQgaGJfbWVudUFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0FjdGl2ZTtcbiAgfVxuXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBOb3ZvTWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUEFSRU5UX01FTlUpIHByaXZhdGUgX3BhcmVudE1lbnU6IE1lbnVDb21wb25lbnQsXG4gICkge1xuICAgIGlmICghIXRoaXMuX3BhcmVudE1lbnUpIHtcbiAgICAgIHRoaXMuaXNTdWJNZW51ID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJpZ2dlciA9ICdtb3VzZWVudGVyJztcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMubWVudVNlcnZpY2UuY2xvc2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25NZW51Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyICE9PSBldmVudC50eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjb250ZXh0bWVudScgJiYgZXZlbnQuYnV0dG9uICE9PSAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLndhaXRXaGVuT3BlbiAmJiB0aGlzLm1lbnVTZXJ2aWNlLmhhc09wZW5NZW51cygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm1lbnUuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMubWVudVNlcnZpY2Uuc2hvdy5uZXh0KHtcbiAgICAgICAgbWVudTogdGhpcy5tZW51LFxuICAgICAgICBldmVudCxcbiAgICAgICAgaXRlbTogdGhpcy5tZW51Q29udGV4dCxcbiAgICAgICAgYW5jaG9yRWxlbWVudDogdGhpcy5hbmNob3IgPyB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCA6IG51bGwsXG4gICAgICAgIHBhcmVudE1lbnU6IHRoaXMuX3BhcmVudE1lbnUsXG4gICAgICAgIG1lbnVUcmlnZ2VyOiB0aGlzLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==