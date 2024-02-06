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
    get hb_menuActive() {
        return this.isActive;
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuDirective, deps: [{ token: i0.ElementRef }, { token: i1.NovoMenuService }, { token: i0.ChangeDetectorRef }, { token: PARENT_MENU, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: MenuDirective, selector: "[menu]", inputs: { menuContext: "menuContext", menu: "menu", menuContent: "menuContent", waitWhenOpen: "waitWhenOpen", capture: "capture", anchor: "anchor", trigger: "trigger" }, host: { listeners: { "click": "onMenuClick($event)", "contextmenu": "onMenuClick($event)", "mouseenter": "onMenuClick($event)" }, properties: { "class.menu-active": "this.hb_menuActive" } }, ngImport: i0 }); }
}
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: MenuDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9tZW51L21lbnUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLNUMsTUFBTSxPQUFPLGFBQWE7SUFXeEIsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFJRCxZQUNVLE9BQW1CLEVBQ25CLFdBQTRCLEVBQzVCLEdBQXNCLEVBQ1csV0FBMEI7UUFIM0QsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDVyxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtRQWxCckMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hDLFlBQU8sR0FBMkMsT0FBTyxDQUFDO1FBRTFFLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FB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QVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTWVudUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL21lbnUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b01lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgUEFSRU5UX01FTlUgfSBmcm9tICcuL21lbnUudG9rZW5zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21lbnVdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51OiBNZW51Q29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNvbnRlbnQ6IE1lbnVDb250ZW50Q29tcG9uZW50O1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgcHVibGljIHdhaXRXaGVuT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgcHVibGljIGNhcHR1cmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIHB1YmxpYyBhbmNob3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHRyaWdnZXI6ICdjbGljaycgfCAnY29udGV4dG1lbnUnIHwgJ21vdXNlZW50ZXInID0gJ2NsaWNrJztcblxuICBpc1N1Yk1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZW51LWFjdGl2ZScpXG4gIGdldCBoYl9tZW51QWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQWN0aXZlO1xuICB9XG5cbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE5vdm9NZW51U2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChQQVJFTlRfTUVOVSkgcHJpdmF0ZSBfcGFyZW50TWVudTogTWVudUNvbXBvbmVudCxcbiAgKSB7XG4gICAgaWYgKCEhdGhpcy5fcGFyZW50TWVudSkge1xuICAgICAgdGhpcy5pc1N1Yk1lbnUgPSB0cnVlO1xuICAgICAgdGhpcy50cmlnZ2VyID0gJ21vdXNlZW50ZXInO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5tZW51U2VydmljZS5jbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1lbnVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyaWdnZXIgIT09IGV2ZW50LnR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NsaWNrJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NvbnRleHRtZW51JyAmJiBldmVudC5idXR0b24gIT09IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMud2FpdFdoZW5PcGVuICYmIHRoaXMubWVudVNlcnZpY2UuaGFzT3Blbk1lbnVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubWVudS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5tZW51U2VydmljZS5zaG93Lm5leHQoe1xuICAgICAgICBtZW51OiB0aGlzLm1lbnUsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBpdGVtOiB0aGlzLm1lbnVDb250ZXh0LFxuICAgICAgICBhbmNob3JFbGVtZW50OiB0aGlzLmFuY2hvciA/IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50IDogbnVsbCxcbiAgICAgICAgcGFyZW50TWVudTogdGhpcy5fcGFyZW50TWVudSxcbiAgICAgICAgbWVudVRyaWdnZXI6IHRoaXMsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxufVxuIl19