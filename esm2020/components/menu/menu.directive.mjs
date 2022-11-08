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
import { BooleanInput } from 'novo-elements/utils';
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
        this.anchor = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL21lbnUvbWVudS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUs1QyxNQUFNLE9BQU8sYUFBYTtJQWtCeEIsWUFDVSxPQUFtQixFQUNuQixXQUE0QixFQUM1QixHQUFzQixFQUNXLFdBQTBCO1FBSDNELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQzVCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ1csZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFsQnJDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QyxZQUFPLEdBQTJDLE9BQU8sQ0FBQztRQUUxRSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFjeEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QixJQUFJLENBQUMsU0FB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QUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1lbnVDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE5vdm9NZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IFBBUkVOVF9NRU5VIH0gZnJvbSAnLi9tZW51LnRva2Vucyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZW51XScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51Q29udGV4dDogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudTogTWVudUNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDb250ZW50OiBNZW51Q29udGVudENvbXBvbmVudDtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIHB1YmxpYyB3YWl0V2hlbk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIHB1YmxpYyBjYXB0dXJlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBCb29sZWFuSW5wdXQoKSBwdWJsaWMgYW5jaG9yOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIHRyaWdnZXI6ICdjbGljaycgfCAnY29udGV4dG1lbnUnIHwgJ21vdXNlZW50ZXInID0gJ2NsaWNrJztcblxuICBpc1N1Yk1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZW51LWFjdGl2ZScpXG4gIGdldCBoYl9tZW51QWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQWN0aXZlO1xuICB9XG5cbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE5vdm9NZW51U2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChQQVJFTlRfTUVOVSkgcHJpdmF0ZSBfcGFyZW50TWVudTogTWVudUNvbXBvbmVudCxcbiAgKSB7XG4gICAgaWYgKCEhdGhpcy5fcGFyZW50TWVudSkge1xuICAgICAgdGhpcy5pc1N1Yk1lbnUgPSB0cnVlO1xuICAgICAgdGhpcy50cmlnZ2VyID0gJ21vdXNlZW50ZXInO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5tZW51U2VydmljZS5jbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1lbnVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyaWdnZXIgIT09IGV2ZW50LnR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NsaWNrJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NvbnRleHRtZW51JyAmJiBldmVudC5idXR0b24gIT09IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMud2FpdFdoZW5PcGVuICYmIHRoaXMubWVudVNlcnZpY2UuaGFzT3Blbk1lbnVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubWVudS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5tZW51U2VydmljZS5zaG93Lm5leHQoe1xuICAgICAgICBtZW51OiB0aGlzLm1lbnUsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBpdGVtOiB0aGlzLm1lbnVDb250ZXh0LFxuICAgICAgICBhbmNob3JFbGVtZW50OiB0aGlzLmFuY2hvciA/IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50IDogbnVsbCxcbiAgICAgICAgcGFyZW50TWVudTogdGhpcy5fcGFyZW50TWVudSxcbiAgICAgICAgbWVudVRyaWdnZXI6IHRoaXMsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxufVxuIl19