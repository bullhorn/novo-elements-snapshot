import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { NovoOption } from '../common';
import { MenuItemDirective } from './menu-item.directive';
import { NovoMenuService } from './menu.service';
import { MENU_OPTIONS, PARENT_MENU } from './menu.tokens';
import * as i0 from "@angular/core";
import * as i1 from "./menu.service";
const _c0 = ["menu"];
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
MenuComponent.ɵfac = function MenuComponent_Factory(t) { return new (t || MenuComponent)(i0.ɵɵdirectiveInject(i1.NovoMenuService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(MENU_OPTIONS, 8)); };
MenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MenuComponent, selectors: [["novo-menu"]], contentQueries: function MenuComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, MenuItemDirective, false);
        i0.ɵɵcontentQuery(dirIndex, NovoOption, false);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuItems = _t);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuOptions = _t);
    } }, viewQuery: function MenuComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuElement = _t.first);
    } }, inputs: { menuClass: "menuClass", autoFocus: "autoFocus", disabled: "disabled" }, outputs: { close: "close", open: "open" }, features: [i0.ɵɵProvidersFeature([{ provide: PARENT_MENU, useExisting: MenuComponent }])], decls: 0, vars: 0, template: function MenuComponent_Template(rf, ctx) { }, styles: ["\n      .cdk-overlay-container {\n        position: fixed;\n        z-index: 1000;\n        pointer-events: none;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n      .novo-menu.cdk-overlay-pane {\n        position: absolute;\n        pointer-events: auto;\n        box-sizing: border-box;\n      }\n    "], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MenuComponent, [{
        type: Component,
        args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'novo-menu',
                styles: [
                    `
      .cdk-overlay-container {
        position: fixed;
        z-index: 1000;
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
    }], function () { return [{ type: i1.NovoMenuService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MENU_OPTIONS]
            }] }]; }, { menuClass: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvbWVudS9tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQW1DLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBa0MxRCxNQUFNLE9BQU8sYUFBYTtJQWdCeEIsWUFDVSxXQUE0QixFQUM1QixjQUFpQyxFQUNqQyxVQUFzQixFQUd0QixPQUFxQjtRQUxyQixnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHdEIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQXJCZixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBaUMs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YSxFQUFFLENBQUM7YUFDbEU7O3NCQXFCSSxRQUFROztzQkFDUixNQUFNO3VCQUFDLFlBQVk7d0JBcEJOLFNBQVM7a0JBQXhCLEtBQUs7WUFDVSxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsUUFBUTtrQkFBdkIsS0FBSztZQUNXLEtBQUs7a0JBQXJCLE1BQU07WUFDVSxJQUFJO2tCQUFwQixNQUFNO1lBQ29DLFNBQVM7a0JBQW5ELGVBQWU7bUJBQUMsaUJBQWlCO1lBQ0UsV0FBVztrQkFBOUMsZUFBZTttQkFBQyxVQUFVO1lBQ0QsV0FBVztrQkFBcEMsU0FBUzttQkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3NlTWVudUV2ZW50LCBJTWVudUNsaWNrRXZlbnQsIE5vdm9NZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE1FTlVfT1BUSU9OUywgUEFSRU5UX01FTlUgfSBmcm9tICcuL21lbnUudG9rZW5zJztcbmltcG9ydCB7IElMaW5rQ29uZmlnLCBJTWVudU9wdGlvbnMgfSBmcm9tICcuL21lbnUudHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vdXNlTG9jYXRpb24ge1xuICBsZWZ0Pzogc3RyaW5nO1xuICBtYXJnaW5MZWZ0Pzogc3RyaW5nO1xuICBtYXJnaW5Ub3A/OiBzdHJpbmc7XG4gIHRvcD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbm92by1tZW51JyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIH1cbiAgICAgIC5ub3ZvLW1lbnUuY2RrLW92ZXJsYXktcGFuZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbiAgdGVtcGxhdGU6IGBgLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFBBUkVOVF9NRU5VLCB1c2VFeGlzdGluZzogTWVudUNvbXBvbmVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51Q2xhc3MgPSAnJztcbiAgQElucHV0KCkgcHVibGljIGF1dG9Gb2N1cyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbG9zZTogRXZlbnRFbWl0dGVyPENsb3NlTWVudUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvcGVuOiBFdmVudEVtaXR0ZXI8SU1lbnVDbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQENvbnRlbnRDaGlsZHJlbihNZW51SXRlbURpcmVjdGl2ZSkgcHVibGljIG1lbnVJdGVtczogUXVlcnlMaXN0PE1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOb3ZvT3B0aW9uKSBwdWJsaWMgbWVudU9wdGlvbnM6IFF1ZXJ5TGlzdDxOb3ZvT3B0aW9uPjtcbiAgQFZpZXdDaGlsZCgnbWVudScpIHB1YmxpYyBtZW51RWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHVibGljIHZpc2libGVNZW51SXRlbXM6IE1lbnVJdGVtRGlyZWN0aXZlW10gPSBbXTtcblxuICBwdWJsaWMgbGlua3M6IElMaW5rQ29uZmlnW10gPSBbXTtcbiAgcHVibGljIGl0ZW06IGFueTtcbiAgcHVibGljIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG1lbnVTZXJ2aWNlOiBOb3ZvTWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChNRU5VX09QVElPTlMpXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBJTWVudU9wdGlvbnMsXG4gICkge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLmF1dG9Gb2N1cyA9IG9wdGlvbnMuYXV0b0ZvY3VzO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICBtZW51U2VydmljZS5zaG93LnN1YnNjcmliZSgobWVudUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25NZW51RXZlbnQobWVudUV2ZW50KTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1lbnVFdmVudChtZW51RXZlbnQ6IElNZW51Q2xpY2tFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgbWVudSwgZXZlbnQsIGl0ZW0gfSA9IG1lbnVFdmVudDtcbiAgICBpZiAobWVudSAmJiBtZW51ICE9PSB0aGlzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB0aGlzLml0ZW0gPSBpdGVtO1xuICAgIHRoaXMuc2V0VmlzaWJsZU1lbnVJdGVtcygpO1xuICAgIHRoaXMubWVudVNlcnZpY2Uub3Blbk1lbnUoeyAuLi5tZW51RXZlbnQsIG1lbnVJdGVtczogdGhpcy52aXNpYmxlTWVudUl0ZW1zLCBtZW51Q2xhc3M6IHRoaXMubWVudUNsYXNzIH0pO1xuICAgIHRoaXMubWVudVNlcnZpY2UuY2xvc2VcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNsb3NlRXZlbnQpID0+IHRoaXMuY2xvc2UuZW1pdChjbG9zZUV2ZW50KSk7XG4gICAgdGhpcy5vcGVuLm5leHQobWVudUV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBpc01lbnVJdGVtVmlzaWJsZShtZW51SXRlbTogTWVudUl0ZW1EaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZUlmRnVuY3Rpb24obWVudUl0ZW0ubWVudUl0ZW1WaXNpYmxlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWaXNpYmxlTWVudUl0ZW1zKCk6IHZvaWQge1xuICAgIHRoaXMudmlzaWJsZU1lbnVJdGVtcyA9IHRoaXMubWVudUl0ZW1zLmZpbHRlcigobWVudUl0ZW0pID0+IHRoaXMuaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW0pKTtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZUlmRnVuY3Rpb24odmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB2YWx1ZSh0aGlzLml0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==