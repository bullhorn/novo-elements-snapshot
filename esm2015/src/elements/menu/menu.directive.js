import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Inject, Input, Optional, } from '@angular/core';
import { BooleanInput } from '../../utils';
import { MenuContentComponent } from './menu-content.component';
import { MenuComponent } from './menu.component';
import { NovoMenuService } from './menu.service';
import { PARENT_MENU } from './menu.tokens';
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
MenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[menu]',
            },] }
];
MenuDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NovoMenuService },
    { type: ChangeDetectorRef },
    { type: MenuComponent, decorators: [{ type: Optional }, { type: Inject, args: [PARENT_MENU,] }] }
];
MenuDirective.propDecorators = {
    menuContext: [{ type: Input }],
    menu: [{ type: Input }],
    menuContent: [{ type: Input }],
    waitWhenOpen: [{ type: Input }],
    capture: [{ type: Input }],
    anchor: [{ type: Input }],
    trigger: [{ type: Input }],
    hb_menuActive: [{ type: HostBinding, args: ['class.menu-active',] }],
    onMenuClick: [{ type: HostListener, args: ['click', ['$event'],] }, { type: HostListener, args: ['contextmenu', ['$event'],] }, { type: HostListener, args: ['mouseenter', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvbWVudS9tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLNUMsTUFBTSxPQUFPLGFBQWE7SUFrQnhCLFlBQ1UsT0FBbUIsRUFDbkIsV0FBNEIsRUFDNUIsR0FBc0IsRUFDVyxXQUEwQjtRQUgzRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNXLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBbEJyQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEMsWUFBTyxHQUEyQyxPQUFPLENBQUM7UUFFMUUsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBY3hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBakJELElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBZ0JELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBS00sV0FBVyxDQUFDLEtBQWlCO1FBQ2xDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEQsT0FBTztTQUNSO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGFBQWEsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvRCxPQUFPO1NBQ1I7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUMvRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsS0FBSztnQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDOUQsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM1QixXQUFXLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7WUExRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2FBQ25COzs7WUFsQkMsVUFBVTtZQWFILGVBQWU7WUFmdEIsaUJBQWlCO1lBY1YsYUFBYSx1QkE2QmpCLFFBQVEsWUFBSSxNQUFNLFNBQUMsV0FBVzs7OzBCQXJCaEMsS0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSzs0QkFJTCxXQUFXLFNBQUMsbUJBQW1COzBCQStCL0IsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUNoQyxZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQ3RDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBeENiO0lBQWYsWUFBWSxFQUFFOzttREFBc0M7QUFDckM7SUFBZixZQUFZLEVBQUU7OzhDQUFpQztBQUNoQztJQUFmLFlBQVksRUFBRTs7NkNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgTWVudUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL21lbnUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm92b01lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgUEFSRU5UX01FTlUgfSBmcm9tICcuL21lbnUudG9rZW5zJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21lbnVdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVDb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51OiBNZW51Q29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNvbnRlbnQ6IE1lbnVDb250ZW50Q29tcG9uZW50O1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgcHVibGljIHdhaXRXaGVuT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAQm9vbGVhbklucHV0KCkgcHVibGljIGNhcHR1cmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQEJvb2xlYW5JbnB1dCgpIHB1YmxpYyBhbmNob3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHRyaWdnZXI6ICdjbGljaycgfCAnY29udGV4dG1lbnUnIHwgJ21vdXNlZW50ZXInID0gJ2NsaWNrJztcblxuICBpc1N1Yk1lbnU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZW51LWFjdGl2ZScpXG4gIGdldCBoYl9tZW51QWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQWN0aXZlO1xuICB9XG5cbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbWVudVNlcnZpY2U6IE5vdm9NZW51U2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChQQVJFTlRfTUVOVSkgcHJpdmF0ZSBfcGFyZW50TWVudTogTWVudUNvbXBvbmVudCxcbiAgKSB7XG4gICAgaWYgKCEhdGhpcy5fcGFyZW50TWVudSkge1xuICAgICAgdGhpcy5pc1N1Yk1lbnUgPSB0cnVlO1xuICAgICAgdGhpcy50cmlnZ2VyID0gJ21vdXNlZW50ZXInO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5tZW51U2VydmljZS5jbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1lbnVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyaWdnZXIgIT09IGV2ZW50LnR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NsaWNrJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NvbnRleHRtZW51JyAmJiBldmVudC5idXR0b24gIT09IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMud2FpdFdoZW5PcGVuICYmIHRoaXMubWVudVNlcnZpY2UuaGFzT3Blbk1lbnVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubWVudS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5tZW51U2VydmljZS5zaG93Lm5leHQoe1xuICAgICAgICBtZW51OiB0aGlzLm1lbnUsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBpdGVtOiB0aGlzLm1lbnVDb250ZXh0LFxuICAgICAgICBhbmNob3JFbGVtZW50OiB0aGlzLmFuY2hvciA/IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50IDogbnVsbCxcbiAgICAgICAgcGFyZW50TWVudTogdGhpcy5fcGFyZW50TWVudSxcbiAgICAgICAgbWVudVRyaWdnZXI6IHRoaXMsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxufVxuIl19