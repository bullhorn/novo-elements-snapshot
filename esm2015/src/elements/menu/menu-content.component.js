import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
export class MenuContentComponent {
    constructor() {
        this.menuItems = [];
        this.isLeaf = false;
        ///
        this.openSubMenu = new EventEmitter();
        this.closeLeafMenu = new EventEmitter();
        this.closeAllMenus = new EventEmitter();
        // @ViewChild('menu') public menuElement: ElementRef;
        // @ViewChildren('li') public menuItemElements: QueryList<ElementRef>;
        this.autoFocus = false;
        this.subscription = new Subscription();
    }
    ngOnInit() { }
    ngAfterViewInit() {
        if (this.autoFocus) {
            setTimeout(() => this.focus());
        }
        this.overlay.updatePosition();
        this._keyManager = new ActiveDescendantKeyManager(this.menu.menuOptions).withWrap();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    focus() {
        if (this.autoFocus) {
            // this.menuElement.nativeElement.focus();
        }
    }
    stopEvent($event) {
        $event.stopPropagation();
    }
    isMenuItemEnabled(menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.menuItemEnabled);
    }
    isMenuItemVisible(menuItem) {
        return this.evaluateIfFunction(menuItem && menuItem.menuItemVisible);
    }
    evaluateIfFunction(value) {
        if (value instanceof Function) {
            return value(this.item);
        }
        return value;
    }
    isDisabled(link) {
        return link.enabled && !link.enabled(this.item);
    }
    onKeyEvent(event) {
        if (!this.isLeaf) {
            return;
        }
        this._keyManager.onKeydown(event);
    }
    keyboardOpenSubMenu(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        const menuItem = this.menuItems[this._keyManager.activeItemIndex];
        if (menuItem) {
            this.onOpenSubMenu(menuItem);
        }
    }
    keyboardMenuItemSelect(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        const menuItem = this.menuItems[this._keyManager.activeItemIndex];
        const option = this._keyManager.activeItem;
        option._clickViaInteraction();
        // if (menuItem) {
        //   this.onMenuItemSelect(menuItem, event);
        // }
    }
    onCloseLeafMenu(event) {
        if (!this.isLeaf) {
            return;
        }
        this.cancelEvent(event);
        this.closeLeafMenu.emit({ exceptRootMenu: event.key === "ArrowLeft" /* ArrowLeft */, event });
    }
    // @HostListener('document:contextmenu', ['$event'])
    closeMenu(event) {
        if (event.type === 'click' && event.button === 2) {
            return;
        }
        this.closeAllMenus.emit({ event });
    }
    onMouseLeave(event) {
        if (this.isLeaf) {
            this.closeLeafMenu.emit({ exceptRootMenu: true, event });
        }
    }
    onOpenSubMenu(menuItem, event) {
        // const anchorElementRef = this.menuItemElements.toArray()[this._keyManager.activeItemIndex];
        // const anchorElement = anchorElementRef && anchorElementRef.nativeElement;
        // this.openSubMenu.emit({
        //   anchorElement,
        //   menu: menuItem.subMenu,
        //   event,
        //   item: this.item,
        //   // parentMenu: this,
        // });
    }
    onMenuItemSelect(menuItem, event) {
        event.preventDefault();
        event.stopPropagation();
        this.onOpenSubMenu(menuItem, event);
        // if (!menuItem.subMenu) {
        //   menuItem.triggerExecute(this.item, event);
        // }
    }
    cancelEvent(event) {
        if (!event) {
            return;
        }
        const target = event.target;
        if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(target.tagName) > -1 || target.isContentEditable) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
}
MenuContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'menu-content',
                template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        <!-- <novo-icon class="sub-menu-caret" suffix *ngIf="!!menuItem.subMenu" size="small" color="ash">expand</novo-icon> -->
      </ng-container>
    </ul>
  </div> `,
                styles: [":host .passive{clear:both;display:block;font-weight:400;padding:3px 20px;white-space:nowrap}:host .menu-container{width:180px}:host .menu-container .menu{-webkit-padding-start:0!important;background-color:var(--background-bright);box-shadow:0 -1px 3px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:default;list-style:none;padding-inline-start:0!important}:host .menu-container .menu :hover{background:rgba(74,137,220,.1);color:#3d464d}:host .menu-container .menu :active{background:rgba(74,137,220,.4)}:host .menu-container .menu .menu-item-container{align-items:center;display:flex;position:relative}:host .menu-container .menu .menu-item-container .sub-menu-caret{position:absolute;right:.5rem}:host .menu-container .menu .menu-item{align-items:center;box-sizing:border-box;color:inherit;cursor:pointer;display:inline;display:flex;flex:1;font-size:var(--font-size-text);font-weight:400;gap:1rem;margin:0;padding:1rem 1rem 1rem 1.25rem;transition:.2s ease-out;transition-property:color,opacity;vertical-align:middle}:host .menu-container .menu .menu-item.text-nowrap{white-space:nowrap}:host .menu-container .menu .menu-item.text-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .menu-container .menu .menu-item.text-size-default{font-size:inherit}:host .menu-container .menu .menu-item.text-size-body{font-size:1.3rem}:host .menu-container .menu .menu-item.text-size-xs{font-size:1rem}:host .menu-container .menu .menu-item.text-size-sm{font-size:1.2rem}:host .menu-container .menu .menu-item.text-size-md{font-size:1.3rem}:host .menu-container .menu .menu-item.text-size-lg{font-size:1.6rem}:host .menu-container .menu .menu-item.text-size-xl{font-size:2rem}:host .menu-container .menu .menu-item.text-size-2xl{font-size:2.6rem}:host .menu-container .menu .menu-item.text-size-3xl{font-size:3.2rem}:host .menu-container .menu .menu-item.text-size-smaller{font-size:.8em}:host .menu-container .menu .menu-item.text-size-larger{font-size:1.2em}:host .menu-container .menu .menu-item.text-color-black{color:#000}:host .menu-container .menu .menu-item.text-color-white{color:#fff}:host .menu-container .menu .menu-item.text-color-gray,:host .menu-container .menu .menu-item.text-color-grey{color:#9e9e9e}:host .menu-container .menu .menu-item.text-color-bright,:host .menu-container .menu .menu-item.text-color-offWhite{color:#f7f7f7}:host .menu-container .menu .menu-item.text-color-light{color:#dbdbdb}:host .menu-container .menu .menu-item.text-color-neutral{color:#4f5361}:host .menu-container .menu .menu-item.text-color-dark{color:#3d464d}:host .menu-container .menu .menu-item.text-color-orange{color:#ff6900}:host .menu-container .menu .menu-item.text-color-navigation{color:#202945}:host .menu-container .menu .menu-item.text-color-skyBlue{color:#009bdf}:host .menu-container .menu .menu-item.text-color-steel{color:#5b6770}:host .menu-container .menu .menu-item.text-color-metal{color:#637893}:host .menu-container .menu .menu-item.text-color-sand{color:#f4f4f4}:host .menu-container .menu .menu-item.text-color-silver{color:#e2e2e2}:host .menu-container .menu .menu-item.text-color-stone{color:#bebebe}:host .menu-container .menu .menu-item.text-color-ash{color:#a0a0a0}:host .menu-container .menu .menu-item.text-color-slate{color:#707070}:host .menu-container .menu .menu-item.text-color-onyx{color:#526980}:host .menu-container .menu .menu-item.text-color-charcoal{color:#282828}:host .menu-container .menu .menu-item.text-color-moonlight{color:#1a242f}:host .menu-container .menu .menu-item.text-color-midnight{color:#202945}:host .menu-container .menu .menu-item.text-color-darkness{color:#161f27}:host .menu-container .menu .menu-item.text-color-navy{color:#0d2d42}:host .menu-container .menu .menu-item.text-color-aqua{color:#3bafda}:host .menu-container .menu .menu-item.text-color-ocean{color:#4a89dc}:host .menu-container .menu .menu-item.text-color-mint{color:#37bc9b}:host .menu-container .menu .menu-item.text-color-grass{color:#8cc152}:host .menu-container .menu .menu-item.text-color-sunflower{color:#f6b042}:host .menu-container .menu .menu-item.text-color-bittersweet{color:#eb6845}:host .menu-container .menu .menu-item.text-color-grapefruit{color:#da4453}:host .menu-container .menu .menu-item.text-color-carnation{color:#d770ad}:host .menu-container .menu .menu-item.text-color-lavender{color:#967adc}:host .menu-container .menu .menu-item.text-color-mountain{color:#9678b6}:host .menu-container .menu .menu-item.text-color-info,:host .menu-container .menu .menu-item.text-color-positive{color:#4a89dc}:host .menu-container .menu .menu-item.text-color-success{color:#8cc152}:host .menu-container .menu .menu-item.text-color-danger,:host .menu-container .menu .menu-item.text-color-error,:host .menu-container .menu .menu-item.text-color-negative{color:#da4453}:host .menu-container .menu .menu-item.text-color-warning{color:#f6b042}:host .menu-container .menu .menu-item.text-color-empty{color:#cccdcc}:host .menu-container .menu .menu-item.text-color-disabled{color:#bebebe}:host .menu-container .menu .menu-item.text-color-background{color:#f7f7f7}:host .menu-container .menu .menu-item.text-color-backgroundDark{color:#e2e2e2}:host .menu-container .menu .menu-item.text-color-presentation{color:#5b6770}:host .menu-container .menu .menu-item.text-color-bullhorn{color:#ff6900}:host .menu-container .menu .menu-item.text-color-pulse{color:#3bafda}:host .menu-container .menu .menu-item.text-color-company{color:#39d}:host .menu-container .menu .menu-item.text-color-candidate{color:#4b7}:host .menu-container .menu .menu-item.text-color-lead{color:#a69}:host .menu-container .menu .menu-item.text-color-contact{color:#fa4}:host .menu-container .menu .menu-item.text-color-opportunity{color:#625}:host .menu-container .menu .menu-item.text-color-job{color:#b56}:host .menu-container .menu .menu-item.text-color-submission{color:#a9adbb}:host .menu-container .menu .menu-item.text-color-sendout{color:#747884}:host .menu-container .menu .menu-item.text-color-placement{color:#0b344f}:host .menu-container .menu .menu-item.text-color-note{color:#747884}:host .menu-container .menu .menu-item.text-color-contract{color:#454ea0}:host .menu-container .menu .menu-item.text-color-billableCharge,:host .menu-container .menu .menu-item.text-color-corporateUser,:host .menu-container .menu .menu-item.text-color-credential,:host .menu-container .menu .menu-item.text-color-distributionList,:host .menu-container .menu .menu-item.text-color-earnCode,:host .menu-container .menu .menu-item.text-color-invoiceStatement,:host .menu-container .menu .menu-item.text-color-jobCode,:host .menu-container .menu .menu-item.text-color-payableCharge,:host .menu-container .menu .menu-item.text-color-person,:host .menu-container .menu .menu-item.text-color-user{color:#696d79}:host .menu-container .menu .menu-item.margin-before{margin-top:.4rem}:host .menu-container .menu .menu-item.margin-after{margin-bottom:.8rem}:host .menu-container .menu .menu-item.text-length-small{max-width:40ch}:host .menu-container .menu .menu-item.text-length-medium{max-width:55ch}:host .menu-container .menu .menu-item.text-length-large{max-width:70ch}:host .menu-container .menu .menu-item.text-weight-hairline{font-weight:100}:host .menu-container .menu .menu-item.text-weight-thin{font-weight:200}:host .menu-container .menu .menu-item.text-weight-light{font-weight:300}:host .menu-container .menu .menu-item.text-weight-normal{font-weight:400}:host .menu-container .menu .menu-item.text-weight-medium{font-weight:500}:host .menu-container .menu .menu-item.text-weight-semibold{font-weight:600}:host .menu-container .menu .menu-item.text-weight-bold{font-weight:700}:host .menu-container .menu .menu-item.text-weight-extrabold{font-weight:800}:host .menu-container .menu .menu-item.text-weight-heavy{font-weight:900}:host .menu-container .menu .menu-item.text-weight-lighter{font-weight:lighter}:host .menu-container .menu .menu-item.text-weight-bolder{font-weight:bolder}:host .menu-container .menu .divider{background:#e2e2e2;height:1px;order:none}:host .menu-container .menu a.disabled{color:#bebebe;cursor:not-allowed}"]
            },] }
];
MenuContentComponent.ctorParameters = () => [];
MenuContentComponent.propDecorators = {
    menuItems: [{ type: Input }],
    item: [{ type: Input }],
    event: [{ type: Input }],
    menu: [{ type: Input }],
    parentMenu: [{ type: Input }],
    menuClass: [{ type: Input }],
    overlay: [{ type: Input }],
    isLeaf: [{ type: Input }],
    openSubMenu: [{ type: Output }],
    closeLeafMenu: [{ type: Output }],
    closeAllMenus: [{ type: Output }],
    onKeyEvent: [{ type: HostListener, args: ['window:keydown.ArrowDown', ['$event'],] }, { type: HostListener, args: ['window:keydown.ArrowUp', ['$event'],] }],
    keyboardOpenSubMenu: [{ type: HostListener, args: ['window:keydown.ArrowRight', ['$event'],] }],
    keyboardMenuItemSelect: [{ type: HostListener, args: ['window:keydown.Enter', ['$event'],] }, { type: HostListener, args: ['window:keydown.Space', ['$event'],] }],
    onCloseLeafMenu: [{ type: HostListener, args: ['window:keydown.Escape', ['$event'],] }, { type: HostListener, args: ['window:keydown.ArrowLeft', ['$event'],] }],
    closeMenu: [{ type: HostListener, args: ['document:click', ['$event'],] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9tZW51L21lbnUtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQW9CcEMsTUFBTSxPQUFPLG9CQUFvQjtJQW1CL0I7UUFsQmdCLGNBQVMsR0FBd0IsRUFBRSxDQUFDO1FBT3BDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsR0FBRztRQUNjLGdCQUFXLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsa0JBQWEsR0FBcUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxrQkFBYSxHQUF3QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pGLHFEQUFxRDtRQUNyRCxzRUFBc0U7UUFFL0QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVqQixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFaEIsUUFBUSxLQUFVLENBQUM7SUFFbkIsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxD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OztZQTNLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBRXhCLFFBQVEsRUFBRTs7Ozs7OztVQU9GOzthQUNUOzs7O3dCQUVFLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO21CQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzswQkFFTCxNQUFNOzRCQUNOLE1BQU07NEJBQ04sTUFBTTt5QkFvRE4sWUFBWSxTQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxDQUFDLGNBQ25ELFlBQVksU0FBQyx3QkFBd0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztrQ0FRakQsWUFBWSxTQUFDLDJCQUEyQixFQUFFLENBQUMsUUFBUSxDQUFDO3FDQVlwRCxZQUFZLFNBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDL0MsWUFBWSxTQUFDLHNCQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDOzhCQWMvQyxZQUFZLFNBQUMsdUJBQXVCLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDaEQsWUFBWSxTQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxDQUFDO3dCQVVuRCxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBUXpDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcbi8vIGltcG9ydCB0eXBlIHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xvc2VMZWFmTWVudUV2ZW50LCBJTWVudUNsaWNrRXZlbnQgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBJTGlua0NvbmZpZyB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21lbnUtY29udGVudCcsXG4gIHN0eWxlVXJsczogWycuL21lbnUtY29udGVudC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtZW51LWNvbnRhaW5lciBub3ZvLW1lbnVcIiBbbmdDbGFzc109XCJtZW51Q2xhc3NcIiB0YWJpbmRleD1cIjBcIj5cbiAgICA8dWwgI21lbnUgY2xhc3M9XCJtZW51XCIgc3R5bGU9XCJwb3NpdGlvbjogc3RhdGljOyBmbG9hdDogbm9uZTtcIiB0YWJpbmRleD1cIjBcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1lbnVJdGVtIG9mIG1lbnVJdGVtczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibWVudUl0ZW0udGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwhLS0gPG5vdm8taWNvbiBjbGFzcz1cInN1Yi1tZW51LWNhcmV0XCIgc3VmZml4ICpuZ0lmPVwiISFtZW51SXRlbS5zdWJNZW51XCIgc2l6ZT1cInNtYWxsXCIgY29sb3I9XCJhc2hcIj5leHBhbmQ8L25vdm8taWNvbj4gLS0+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L3VsPlxuICA8L2Rpdj4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51SXRlbXM6IE1lbnVJdGVtRGlyZWN0aXZlW10gPSBbXTtcbiAgQElucHV0KCkgcHVibGljIGl0ZW06IGFueTtcbiAgQElucHV0KCkgcHVibGljIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgQElucHV0KCkgcHVibGljIG1lbnU6IGFueTsgLy8gTWVudUNvbXBvbmVudFxuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50TWVudTogTWVudUNvbnRlbnRDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51Q2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIG92ZXJsYXk6IE92ZXJsYXlSZWY7XG4gIEBJbnB1dCgpIHB1YmxpYyBpc0xlYWYgPSBmYWxzZTtcbiAgLy8vXG4gIEBPdXRwdXQoKSBwdWJsaWMgb3BlblN1Yk1lbnU6IEV2ZW50RW1pdHRlcjxJTWVudUNsaWNrRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlTGVhZk1lbnU6IEV2ZW50RW1pdHRlcjxDbG9zZUxlYWZNZW51RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlQWxsTWVudXM6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBAVmlld0NoaWxkKCdtZW51JykgcHVibGljIG1lbnVFbGVtZW50OiBFbGVtZW50UmVmO1xuICAvLyBAVmlld0NoaWxkcmVuKCdsaScpIHB1YmxpYyBtZW51SXRlbUVsZW1lbnRzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgcHVibGljIGF1dG9Gb2N1cyA9IGZhbHNlO1xuICBwcml2YXRlIF9rZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOb3ZvT3B0aW9uPjtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b0ZvY3VzKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZm9jdXMoKSk7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheS51cGRhdGVQb3NpdGlvbigpO1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj4odGhpcy5tZW51Lm1lbnVPcHRpb25zKS53aXRoV3JhcCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9Gb2N1cykge1xuICAgICAgLy8gdGhpcy5tZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcEV2ZW50KCRldmVudDogTW91c2VFdmVudCkge1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc01lbnVJdGVtRW5hYmxlZChtZW51SXRlbTogTWVudUl0ZW1EaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZUlmRnVuY3Rpb24obWVudUl0ZW0gJiYgbWVudUl0ZW0ubWVudUl0ZW1FbmFibGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBpc01lbnVJdGVtVmlzaWJsZShtZW51SXRlbTogTWVudUl0ZW1EaXJlY3RpdmUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZUlmRnVuY3Rpb24obWVudUl0ZW0gJiYgbWVudUl0ZW0ubWVudUl0ZW1WaXNpYmxlKTtcbiAgfVxuXG4gIHB1YmxpYyBldmFsdWF0ZUlmRnVuY3Rpb24odmFsdWU6IGFueSk6IGFueSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiB2YWx1ZSh0aGlzLml0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgaXNEaXNhYmxlZChsaW5rOiBJTGlua0NvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5rLmVuYWJsZWQgJiYgIWxpbmsuZW5hYmxlZCh0aGlzLml0ZW0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dEb3duJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dVcCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbktleUV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzTGVhZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5BcnJvd1JpZ2h0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIGtleWJvYXJkT3BlblN1Yk1lbnUoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzTGVhZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNhbmNlbEV2ZW50KGV2ZW50KTtcbiAgICBjb25zdCBtZW51SXRlbSA9IHRoaXMubWVudUl0ZW1zW3RoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4XTtcbiAgICBpZiAobWVudUl0ZW0pIHtcbiAgICAgIHRoaXMub25PcGVuU3ViTWVudShtZW51SXRlbSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uRW50ZXInLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5TcGFjZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBrZXlib2FyZE1lbnVJdGVtU2VsZWN0KGV2ZW50PzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jYW5jZWxFdmVudChldmVudCk7XG4gICAgY29uc3QgbWVudUl0ZW0gPSB0aGlzLm1lbnVJdGVtc1t0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleF07XG4gICAgY29uc3Qgb3B0aW9uID0gdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIG9wdGlvbi5fY2xpY2tWaWFJbnRlcmFjdGlvbigpO1xuICAgIC8vIGlmIChtZW51SXRlbSkge1xuICAgIC8vICAgdGhpcy5vbk1lbnVJdGVtU2VsZWN0KG1lbnVJdGVtLCBldmVudCk7XG4gICAgLy8gfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uRXNjYXBlJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dMZWZ0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uQ2xvc2VMZWFmTWVudShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jYW5jZWxFdmVudChldmVudCk7XG4gICAgdGhpcy5jbG9zZUxlYWZNZW51LmVtaXQoeyBleGNlcHRSb290TWVudTogZXZlbnQua2V5ID09PSBLZXkuQXJyb3dMZWZ0LCBldmVudCB9KTtcbiAgfVxuXG4gIC8vIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgY2xvc2VNZW51KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiYgZXZlbnQuYnV0dG9uID09PSAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2xvc2VBbGxNZW51cy5lbWl0KHsgZXZlbnQgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uTW91c2VMZWF2ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTGVhZikge1xuICAgICAgdGhpcy5jbG9zZUxlYWZNZW51LmVtaXQoeyBleGNlcHRSb290TWVudTogdHJ1ZSwgZXZlbnQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uT3BlblN1Yk1lbnUobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlLCBldmVudD86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgLy8gY29uc3QgYW5jaG9yRWxlbWVudFJlZiA9IHRoaXMubWVudUl0ZW1FbGVtZW50cy50b0FycmF5KClbdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXhdO1xuICAgIC8vIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBhbmNob3JFbGVtZW50UmVmICYmIGFuY2hvckVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAvLyB0aGlzLm9wZW5TdWJNZW51LmVtaXQoe1xuICAgIC8vICAgYW5jaG9yRWxlbWVudCxcbiAgICAvLyAgIG1lbnU6IG1lbnVJdGVtLnN1Yk1lbnUsXG4gICAgLy8gICBldmVudCxcbiAgICAvLyAgIGl0ZW06IHRoaXMuaXRlbSxcbiAgICAvLyAgIC8vIHBhcmVudE1lbnU6IHRoaXMsXG4gICAgLy8gfSk7XG4gIH1cblxuICBwdWJsaWMgb25NZW51SXRlbVNlbGVjdChtZW51SXRlbTogTWVudUl0ZW1EaXJlY3RpdmUsIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5vbk9wZW5TdWJNZW51KG1lbnVJdGVtLCBldmVudCk7XG4gICAgLy8gaWYgKCFtZW51SXRlbS5zdWJNZW51KSB7XG4gICAgLy8gICBtZW51SXRlbS50cmlnZ2VyRXhlY3V0ZSh0aGlzLml0ZW0sIGV2ZW50KTtcbiAgICAvLyB9XG4gIH1cblxuICBwcml2YXRlIGNhbmNlbEV2ZW50KGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKFsnSU5QVVQnLCAnVEVYVEFSRUEnLCAnU0VMRUNUJ10uaW5kZXhPZih0YXJnZXQudGFnTmFtZSkgPiAtMSB8fCB0YXJnZXQuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG4iXX0=