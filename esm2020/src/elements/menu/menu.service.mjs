import { Overlay, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MenuContentComponent } from './menu-content.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class NovoMenuService {
    constructor(overlay, scrollStrategy) {
        this.overlay = overlay;
        this.scrollStrategy = scrollStrategy;
        this.isDestroyingLeafMenu = false;
        this.show = new Subject();
        this.triggerClose = new Subject();
        this.close = new Subject();
        this.overlays = [];
        this.fakeElement = {
            getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0,
                x: 0,
                y: 0,
            }),
        };
    }
    openMenu(context) {
        const { anchorElement, event, parentMenu } = context;
        if (!parentMenu) {
            const mouseEvent = event;
            this.fakeElement.getBoundingClientRect = () => ({
                bottom: mouseEvent.clientY,
                height: 0,
                left: mouseEvent.clientX,
                right: mouseEvent.clientX,
                top: mouseEvent.clientY,
                width: 0,
                x: mouseEvent.clientX,
                y: mouseEvent.clientY,
            });
            this.closeAllMenus({ eventType: 'cancel', event });
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(new ElementRef(anchorElement || this.fakeElement))
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
                { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
                { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
                { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
            ]);
            this.overlays = [
                this.overlay.create({
                    positionStrategy,
                    panelClass: 'novo-menu',
                    scrollStrategy: this.scrollStrategy.close(),
                }),
            ];
            this.attachMenu(this.overlays[0], context);
        }
        else {
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(new ElementRef(event ? event.target : anchorElement))
                .withFlexibleDimensions(false)
                .withPositions([
                { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
                { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
                { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
            ]);
            const newOverlay = this.overlay.create({
                positionStrategy,
                panelClass: 'novo-menu',
                scrollStrategy: this.scrollStrategy.close(),
            });
            // this.destroySubMenus(parentMenu);
            this.overlays = this.overlays.concat(newOverlay);
            this.attachMenu(newOverlay, context);
        }
    }
    attachMenu(overlay, context) {
        const { event, item, menu, menuItems, menuClass, menuTrigger } = context;
        const menuContent = overlay.attach(new ComponentPortal(MenuContentComponent));
        menuContent.instance.event = event;
        menuContent.instance.item = item;
        menuContent.instance.menu = menu;
        menuContent.instance.menuItems = menuItems;
        menuContent.instance.overlay = overlay;
        menuContent.instance.isLeaf = true;
        menuContent.instance.menuClass = menuClass;
        overlay.menu = menuContent.instance;
        if (!!menuTrigger) {
            menuTrigger.menuContent = menuContent.instance;
        }
        const subscriptions = new Subscription();
        // subscriptions.add(
        //   menuContent.instance.execute
        //     .asObservable()
        //     .subscribe((executeEvent) => this.closeAllMenus({ eventType: 'execute', ...executeEvent })),
        // );
        subscriptions.add(menuContent.instance.closeAllMenus
            .asObservable()
            .subscribe((closeAllEvent) => this.closeAllMenus({ eventType: 'cancel', ...closeAllEvent })));
        subscriptions.add(menuContent.instance.closeLeafMenu.asObservable().subscribe((closeLeafMenuEvent) => this.destroyLeafMenu(closeLeafMenuEvent)));
        subscriptions.add(menuContent.instance.openSubMenu.asObservable().subscribe((subMenuEvent) => {
            this.destroySubMenus(menuContent.instance);
            if (!subMenuEvent.menu) {
                menuContent.instance.isLeaf = true;
                return;
            }
            menuContent.instance.isLeaf = false;
            this.show.next(subMenuEvent);
        }));
        menuContent.onDestroy(() => {
            // menuItems.forEach((menuItem) => (menuItem.isActive = false));
            subscriptions.unsubscribe();
        });
        menuContent.changeDetectorRef.detectChanges();
    }
    closeAllMenus(closeEvent) {
        if (this.overlays) {
            this.close.next(closeEvent);
            this.overlays.forEach((overlay, index) => {
                overlay.detach();
                overlay.dispose();
            });
        }
        this.overlays = [];
    }
    hasOpenMenus() {
        return this.overlays?.length > 0;
    }
    getLastAttachedOverlay() {
        let overlay = this.overlays[this.overlays.length - 1];
        while (this.overlays.length > 1 && overlay && !overlay.hasAttached()) {
            overlay.detach();
            overlay.dispose();
            this.overlays = this.overlays.slice(0, -1);
            overlay = this.overlays[this.overlays.length - 1];
        }
        return overlay;
    }
    destroyLeafMenu({ exceptRootMenu, event } = {}) {
        if (this.isDestroyingLeafMenu) {
            return;
        }
        this.isDestroyingLeafMenu = true;
        setTimeout(() => {
            const overlay = this.getLastAttachedOverlay();
            if (this.overlays.length > 1 && overlay) {
                overlay.detach();
                overlay.dispose();
            }
            if (!exceptRootMenu && this.overlays.length > 0 && overlay) {
                this.close.next({ eventType: 'cancel', event });
                overlay.detach();
                overlay.dispose();
            }
            const newLeaf = this.getLastAttachedOverlay();
            if (newLeaf) {
                newLeaf.menu.isLeaf = true;
            }
            this.isDestroyingLeafMenu = false;
        });
    }
    destroySubMenus(menu) {
        const overlay = menu.overlay;
        const index = this.overlays.indexOf(overlay);
        this.overlays.slice(index + 1).forEach((subMenuOverlay) => {
            subMenuOverlay.detach();
            subMenuOverlay.dispose();
        });
    }
    isLeafMenu(menuContent) {
        const overlay = this.getLastAttachedOverlay();
        return menuContent.overlay === overlay;
    }
}
NovoMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuService, deps: [{ token: i1.Overlay }, { token: i1.ScrollStrategyOptions }], target: i0.ɵɵFactoryTarget.Injectable });
NovoMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.ScrollStrategyOptions }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvbWVudS9tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBYyxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQWdCLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQXVDaEUsTUFBTSxPQUFPLGVBQWU7SUFzQjFCLFlBQW9CLE9BQWdCLEVBQVUsY0FBcUM7UUFBL0QsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQXJCNUUseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBRTdCLFNBQUksR0FBNkIsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDaEUsaUJBQVksR0FBa0MsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1RCxVQUFLLEdBQTRCLElBQUksT0FBTyxFQUFFLENBQUM7UUFHOUMsYUFBUSxHQUFpQixFQUFFLENBQUM7UUFDNUIsZ0JBQVcsR0FBUTtZQUN6QixxQkFBcUIsRUFBRSxHQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQztnQkFDVCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFD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TSxFQUFFLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNuQjtZQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlDLElBQUksT0FBTyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUM1QjtZQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sZUFBZSxDQUFDLElBQTBCO1FBQy9DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3hELGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sVUFBVSxDQUFDLFdBQWlDO1FBQ2pELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlDLE9BQU8sV0FBVyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUM7SUFDekMsQ0FBQzs7NkdBcE1VLGVBQWU7aUhBQWYsZUFBZSxjQURGLE1BQU07NEZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiwgU2Nyb2xsU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWVudUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL21lbnUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHR5cGUgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgdHlwZSB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUuY29tcG9uZW50JztcbmltcG9ydCB0eXBlIHsgTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZW51Q2xpY2tFdmVudCB7XG4gIGFuY2hvckVsZW1lbnQ/OiBFbGVtZW50IHwgRXZlbnRUYXJnZXQ7XG4gIG1lbnU/OiBNZW51Q29tcG9uZW50O1xuICBldmVudD86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xuICBwYXJlbnRNZW51PzogTWVudUNvbXBvbmVudDtcbiAgbWVudVRyaWdnZXI/OiBNZW51RGlyZWN0aXZlO1xuICBpdGVtOiBhbnk7XG4gIGFjdGl2ZU1lbnVJdGVtSW5kZXg/OiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIElNZW51Q29udGV4dCBleHRlbmRzIElNZW51Q2xpY2tFdmVudCB7XG4gIG1lbnVJdGVtczogTWVudUl0ZW1EaXJlY3RpdmVbXTtcbiAgbWVudUNsYXNzOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIENsb3NlTGVhZk1lbnVFdmVudCB7XG4gIGV4Y2VwdFJvb3RNZW51PzogYm9vbGVhbjtcbiAgZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgT3ZlcmxheVJlZldpdGhNZW51IGV4dGVuZHMgT3ZlcmxheVJlZiB7XG4gIG1lbnU/OiBNZW51Q29udGVudENvbXBvbmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYW5jZWxNZW51RXZlbnQge1xuICBldmVudFR5cGU6ICdjYW5jZWwnO1xuICBldmVudD86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xufVxuZXhwb3J0IGludGVyZmFjZSBFeGVjdXRlTWVudUV2ZW50IHtcbiAgZXZlbnRUeXBlOiAnZXhlY3V0ZSc7XG4gIGV2ZW50PzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIGl0ZW06IGFueTtcbiAgbWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlO1xufVxuZXhwb3J0IHR5cGUgQ2xvc2VNZW51RXZlbnQgPSBFeGVjdXRlTWVudUV2ZW50IHwgQ2FuY2VsTWVudUV2ZW50O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE5vdm9NZW51U2VydmljZSB7XG4gIHB1YmxpYyBpc0Rlc3Ryb3lpbmdMZWFmTWVudSA9IGZhbHNlO1xuXG4gIHB1YmxpYyBzaG93OiBTdWJqZWN0PElNZW51Q2xpY2tFdmVudD4gPSBuZXcgU3ViamVjdDxJTWVudUNsaWNrRXZlbnQ+KCk7XG4gIHB1YmxpYyB0cmlnZ2VyQ2xvc2U6IFN1YmplY3Q8TWVudUNvbnRlbnRDb21wb25lbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHVibGljIGNsb3NlOiBTdWJqZWN0PENsb3NlTWVudUV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJpdmF0ZSBtZW51Q29udGVudDogQ29tcG9uZW50UmVmPE1lbnVDb250ZW50Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBvdmVybGF5czogT3ZlcmxheVJlZltdID0gW107XG4gIHByaXZhdGUgZmFrZUVsZW1lbnQ6IGFueSA9IHtcbiAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3Q6ICgpOiBhbnkgPT4gKHtcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfSksXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LCBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneU9wdGlvbnMpIHt9XG5cbiAgcHVibGljIG9wZW5NZW51KGNvbnRleHQ6IElNZW51Q29udGV4dCkge1xuICAgIGNvbnN0IHsgYW5jaG9yRWxlbWVudCwgZXZlbnQsIHBhcmVudE1lbnUgfSA9IGNvbnRleHQ7XG5cbiAgICBpZiAoIXBhcmVudE1lbnUpIHtcbiAgICAgIGNvbnN0IG1vdXNlRXZlbnQgPSBldmVudCBhcyBNb3VzZUV2ZW50O1xuICAgICAgdGhpcy5mYWtlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPSAoKTogYW55ID0+ICh7XG4gICAgICAgIGJvdHRvbTogbW91c2VFdmVudC5jbGllbnRZLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIGxlZnQ6IG1vdXNlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgcmlnaHQ6IG1vdXNlRXZlbnQuY2xpZW50WCxcbiAgICAgICAgdG9wOiBtb3VzZUV2ZW50LmNsaWVudFksXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICB4OiBtb3VzZUV2ZW50LmNsaWVudFgsXG4gICAgICAgIHk6IG1vdXNlRXZlbnQuY2xpZW50WSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jbG9zZUFsbE1lbnVzKHsgZXZlbnRUeXBlOiAnY2FuY2VsJywgZXZlbnQgfSk7XG4gICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5XG4gICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKG5ldyBFbGVtZW50UmVmKGFuY2hvckVsZW1lbnQgfHwgdGhpcy5mYWtlRWxlbWVudCkpXG4gICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSxcbiAgICAgICAgICB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICd0b3AnIH0sXG4gICAgICAgICAgeyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2NlbnRlcicgfSxcbiAgICAgICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9LFxuICAgICAgICBdKTtcbiAgICAgIHRoaXMub3ZlcmxheXMgPSBbXG4gICAgICAgIHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICAgICAgcGFuZWxDbGFzczogJ25vdm8tbWVudScsXG4gICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3kuY2xvc2UoKSxcbiAgICAgICAgfSksXG4gICAgICBdO1xuICAgICAgdGhpcy5hdHRhY2hNZW51KHRoaXMub3ZlcmxheXNbMF0sIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5XG4gICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKG5ldyBFbGVtZW50UmVmKGV2ZW50ID8gZXZlbnQudGFyZ2V0IDogYW5jaG9yRWxlbWVudCkpXG4gICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxuICAgICAgICAud2l0aFBvc2l0aW9ucyhbXG4gICAgICAgICAgeyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSxcbiAgICAgICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJyB9LFxuICAgICAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdib3R0b20nIH0sXG4gICAgICAgIF0pO1xuICAgICAgY29uc3QgbmV3T3ZlcmxheSA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5LFxuICAgICAgICBwYW5lbENsYXNzOiAnbm92by1tZW51JyxcbiAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3kuY2xvc2UoKSxcbiAgICAgIH0pO1xuICAgICAgLy8gdGhpcy5kZXN0cm95U3ViTWVudXMocGFyZW50TWVudSk7XG4gICAgICB0aGlzLm92ZXJsYXlzID0gdGhpcy5vdmVybGF5cy5jb25jYXQobmV3T3ZlcmxheSk7XG4gICAgICB0aGlzLmF0dGFjaE1lbnUobmV3T3ZlcmxheSwgY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGF0dGFjaE1lbnUob3ZlcmxheTogT3ZlcmxheVJlZiwgY29udGV4dDogSU1lbnVDb250ZXh0KTogdm9pZCB7XG4gICAgY29uc3QgeyBldmVudCwgaXRlbSwgbWVudSwgbWVudUl0ZW1zLCBtZW51Q2xhc3MsIG1lbnVUcmlnZ2VyIH0gPSBjb250ZXh0O1xuXG4gICAgY29uc3QgbWVudUNvbnRlbnQ6IENvbXBvbmVudFJlZjxNZW51Q29udGVudENvbXBvbmVudD4gPSBvdmVybGF5LmF0dGFjaChuZXcgQ29tcG9uZW50UG9ydGFsKE1lbnVDb250ZW50Q29tcG9uZW50KSk7XG4gICAgbWVudUNvbnRlbnQuaW5zdGFuY2UuZXZlbnQgPSBldmVudDtcbiAgICBtZW51Q29udGVudC5pbnN0YW5jZS5pdGVtID0gaXRlbTtcbiAgICBtZW51Q29udGVudC5pbnN0YW5jZS5tZW51ID0gbWVudTtcbiAgICBtZW51Q29udGVudC5pbnN0YW5jZS5tZW51SXRlbXMgPSBtZW51SXRlbXM7XG4gICAgbWVudUNvbnRlbnQuaW5zdGFuY2Uub3ZlcmxheSA9IG92ZXJsYXk7XG4gICAgbWVudUNvbnRlbnQuaW5zdGFuY2UuaXNMZWFmID0gdHJ1ZTtcbiAgICBtZW51Q29udGVudC5pbnN0YW5jZS5tZW51Q2xhc3MgPSBtZW51Q2xhc3M7XG4gICAgKG92ZXJsYXkgYXMgT3ZlcmxheVJlZldpdGhNZW51KS5tZW51ID0gbWVudUNvbnRlbnQuaW5zdGFuY2U7XG5cbiAgICBpZiAoISFtZW51VHJpZ2dlcikge1xuICAgICAgbWVudVRyaWdnZXIubWVudUNvbnRlbnQgPSBtZW51Q29udGVudC5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgLy8gc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgLy8gICBtZW51Q29udGVudC5pbnN0YW5jZS5leGVjdXRlXG4gICAgLy8gICAgIC5hc09ic2VydmFibGUoKVxuICAgIC8vICAgICAuc3Vic2NyaWJlKChleGVjdXRlRXZlbnQpID0+IHRoaXMuY2xvc2VBbGxNZW51cyh7IGV2ZW50VHlwZTogJ2V4ZWN1dGUnLCAuLi5leGVjdXRlRXZlbnQgfSkpLFxuICAgIC8vICk7XG4gICAgc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBtZW51Q29udGVudC5pbnN0YW5jZS5jbG9zZUFsbE1lbnVzXG4gICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAuc3Vic2NyaWJlKChjbG9zZUFsbEV2ZW50KSA9PiB0aGlzLmNsb3NlQWxsTWVudXMoeyBldmVudFR5cGU6ICdjYW5jZWwnLCAuLi5jbG9zZUFsbEV2ZW50IH0pKSxcbiAgICApO1xuICAgIHN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgbWVudUNvbnRlbnQuaW5zdGFuY2UuY2xvc2VMZWFmTWVudS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGNsb3NlTGVhZk1lbnVFdmVudCkgPT4gdGhpcy5kZXN0cm95TGVhZk1lbnUoY2xvc2VMZWFmTWVudUV2ZW50KSksXG4gICAgKTtcbiAgICBzdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIG1lbnVDb250ZW50Lmluc3RhbmNlLm9wZW5TdWJNZW51LmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoc3ViTWVudUV2ZW50OiBJTWVudUNvbnRleHQpID0+IHtcbiAgICAgICAgdGhpcy5kZXN0cm95U3ViTWVudXMobWVudUNvbnRlbnQuaW5zdGFuY2UpO1xuICAgICAgICBpZiAoIXN1Yk1lbnVFdmVudC5tZW51KSB7XG4gICAgICAgICAgbWVudUNvbnRlbnQuaW5zdGFuY2UuaXNMZWFmID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbWVudUNvbnRlbnQuaW5zdGFuY2UuaXNMZWFmID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvdy5uZXh0KHN1Yk1lbnVFdmVudCk7XG4gICAgICB9KSxcbiAgICApO1xuICAgIG1lbnVDb250ZW50Lm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAvLyBtZW51SXRlbXMuZm9yRWFjaCgobWVudUl0ZW0pID0+IChtZW51SXRlbS5pc0FjdGl2ZSA9IGZhbHNlKSk7XG4gICAgICBzdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gICAgbWVudUNvbnRlbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlQWxsTWVudXMoY2xvc2VFdmVudDogQ2xvc2VNZW51RXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5cykge1xuICAgICAgdGhpcy5jbG9zZS5uZXh0KGNsb3NlRXZlbnQpO1xuICAgICAgdGhpcy5vdmVybGF5cy5mb3JFYWNoKChvdmVybGF5LCBpbmRleCkgPT4ge1xuICAgICAgICBvdmVybGF5LmRldGFjaCgpO1xuICAgICAgICBvdmVybGF5LmRpc3Bvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXlzID0gW107XG4gIH1cblxuICBwdWJsaWMgaGFzT3Blbk1lbnVzKCkge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlzPy5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHVibGljIGdldExhc3RBdHRhY2hlZE92ZXJsYXkoKTogT3ZlcmxheVJlZldpdGhNZW51IHtcbiAgICBsZXQgb3ZlcmxheTogT3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheXNbdGhpcy5vdmVybGF5cy5sZW5ndGggLSAxXTtcbiAgICB3aGlsZSAodGhpcy5vdmVybGF5cy5sZW5ndGggPiAxICYmIG92ZXJsYXkgJiYgIW92ZXJsYXkuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgb3ZlcmxheS5kZXRhY2goKTtcbiAgICAgIG92ZXJsYXkuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5vdmVybGF5cyA9IHRoaXMub3ZlcmxheXMuc2xpY2UoMCwgLTEpO1xuICAgICAgb3ZlcmxheSA9IHRoaXMub3ZlcmxheXNbdGhpcy5vdmVybGF5cy5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgcmV0dXJuIG92ZXJsYXk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveUxlYWZNZW51KHsgZXhjZXB0Um9vdE1lbnUsIGV2ZW50IH06IENsb3NlTGVhZk1lbnVFdmVudCA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEZXN0cm95aW5nTGVhZk1lbnUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc0Rlc3Ryb3lpbmdMZWFmTWVudSA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmdldExhc3RBdHRhY2hlZE92ZXJsYXkoKTtcbiAgICAgIGlmICh0aGlzLm92ZXJsYXlzLmxlbmd0aCA+IDEgJiYgb3ZlcmxheSkge1xuICAgICAgICBvdmVybGF5LmRldGFjaCgpO1xuICAgICAgICBvdmVybGF5LmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICghZXhjZXB0Um9vdE1lbnUgJiYgdGhpcy5vdmVybGF5cy5sZW5ndGggPiAwICYmIG92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5jbG9zZS5uZXh0KHsgZXZlbnRUeXBlOiAnY2FuY2VsJywgZXZlbnQgfSk7XG4gICAgICAgIG92ZXJsYXkuZGV0YWNoKCk7XG4gICAgICAgIG92ZXJsYXkuZGlzcG9zZSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdMZWFmID0gdGhpcy5nZXRMYXN0QXR0YWNoZWRPdmVybGF5KCk7XG4gICAgICBpZiAobmV3TGVhZikge1xuICAgICAgICBuZXdMZWFmLm1lbnUuaXNMZWFmID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0Rlc3Ryb3lpbmdMZWFmTWVudSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lTdWJNZW51cyhtZW51OiBNZW51Q29udGVudENvbXBvbmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXkgPSBtZW51Lm92ZXJsYXk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm92ZXJsYXlzLmluZGV4T2Yob3ZlcmxheSk7XG4gICAgdGhpcy5vdmVybGF5cy5zbGljZShpbmRleCArIDEpLmZvckVhY2goKHN1Yk1lbnVPdmVybGF5KSA9PiB7XG4gICAgICBzdWJNZW51T3ZlcmxheS5kZXRhY2goKTtcbiAgICAgIHN1Yk1lbnVPdmVybGF5LmRpc3Bvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0xlYWZNZW51KG1lbnVDb250ZW50OiBNZW51Q29udGVudENvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmdldExhc3RBdHRhY2hlZE92ZXJsYXkoKTtcbiAgICByZXR1cm4gbWVudUNvbnRlbnQub3ZlcmxheSA9PT0gb3ZlcmxheTtcbiAgfVxufVxuIl19