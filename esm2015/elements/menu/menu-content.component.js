import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuComponent } from './menu.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function MenuContentComponent_ng_container_3_ng_template_1_Template(rf, ctx) { }
const _c0 = function (a0) { return { $implicit: a0 }; };
function MenuContentComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MenuContentComponent_ng_container_3_ng_template_1_Template, 0, 0, "ng-template", 4);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const menuItem_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", menuItem_r2.template)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx_r1.item));
} }
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
MenuContentComponent.ɵfac = function MenuContentComponent_Factory(t) { return new (t || MenuContentComponent)(); };
MenuContentComponent.ɵcmp = i0.ɵɵdefineComponent({ type: MenuContentComponent, selectors: [["menu-content"]], hostBindings: function MenuContentComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("keydown.ArrowDown", function MenuContentComponent_keydown_ArrowDown_HostBindingHandler($event) { return ctx.onKeyEvent($event); }, false, i0.ɵɵresolveWindow)("keydown.ArrowUp", function MenuContentComponent_keydown_ArrowUp_HostBindingHandler($event) { return ctx.onKeyEvent($event); }, false, i0.ɵɵresolveWindow)("keydown.ArrowRight", function MenuContentComponent_keydown_ArrowRight_HostBindingHandler($event) { return ctx.keyboardOpenSubMenu($event); }, false, i0.ɵɵresolveWindow)("keydown.Enter", function MenuContentComponent_keydown_Enter_HostBindingHandler($event) { return ctx.keyboardMenuItemSelect($event); }, false, i0.ɵɵresolveWindow)("keydown.Space", function MenuContentComponent_keydown_Space_HostBindingHandler($event) { return ctx.keyboardMenuItemSelect($event); }, false, i0.ɵɵresolveWindow)("keydown.Escape", function MenuContentComponent_keydown_Escape_HostBindingHandler($event) { return ctx.onCloseLeafMenu($event); }, false, i0.ɵɵresolveWindow)("keydown.ArrowLeft", function MenuContentComponent_keydown_ArrowLeft_HostBindingHandler($event) { return ctx.onCloseLeafMenu($event); }, false, i0.ɵɵresolveWindow)("click", function MenuContentComponent_click_HostBindingHandler($event) { return ctx.closeMenu($event); }, false, i0.ɵɵresolveDocument)("mouseleave", function MenuContentComponent_mouseleave_HostBindingHandler($event) { return ctx.onMouseLeave($event); });
    } }, inputs: { menuItems: "menuItems", item: "item", event: "event", menu: "menu", parentMenu: "parentMenu", menuClass: "menuClass", overlay: "overlay", isLeaf: "isLeaf" }, outputs: { openSubMenu: "openSubMenu", closeLeafMenu: "closeLeafMenu", closeAllMenus: "closeAllMenus" }, decls: 4, vars: 2, consts: [["tabindex", "0", 1, "menu-container", "novo-menu", 3, "ngClass"], ["tabindex", "0", 1, "menu", 2, "position", "static", "float", "none"], ["menu", ""], [4, "ngFor", "ngForOf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function MenuContentComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "ul", 1, 2);
        i0.ɵɵtemplate(3, MenuContentComponent_ng_container_3_Template, 2, 4, "ng-container", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", ctx.menuClass);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.menuItems);
    } }, directives: [i1.NgClass, i1.NgForOf, i1.NgTemplateOutlet], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]   .passive[_ngcontent-%COMP%]{clear:both;display:block;font-weight:400;padding:3px 20px;white-space:nowrap}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]{width:180px}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]{-webkit-padding-start:0!important;background-color:#fff;box-shadow:0 -1px 3px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);cursor:default;list-style:none;padding-inline-start:0!important}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{background:rgba(74,137,220,.1);color:#3d464d}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:active{background:rgba(74,137,220,.4)}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   .menu-item-container[_ngcontent-%COMP%]{align-items:center;display:flex;position:relative}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   .menu-item-container[_ngcontent-%COMP%]   .sub-menu-caret[_ngcontent-%COMP%]{position:absolute;right:.8rem}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;color:inherit;cursor:pointer;display:inline;display:flex;flex:1;font-weight:400;gap:1rem;line-height:1.5rem;margin:0;padding:1.2rem 1.2rem 1.2rem 1.6rem}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{background:#e2e2e2;height:1px;order:none}[_nghost-%COMP%]   .menu-container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]   a.disabled[_ngcontent-%COMP%]{color:#bebebe;cursor:not-allowed}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MenuContentComponent, [{
        type: Component,
        args: [{
                selector: 'menu-content',
                styleUrls: ['./menu-content.component.scss'],
                template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        <!-- <novo-icon class="sub-menu-caret" suffix *ngIf="!!menuItem.subMenu" size="small" color="ash">expand</novo-icon> -->
      </ng-container>
    </ul>
  </div> `,
            }]
    }], function () { return []; }, { menuItems: [{
            type: Input
        }], item: [{
            type: Input
        }], event: [{
            type: Input
        }], menu: [{
            type: Input
        }], parentMenu: [{
            type: Input
        }], menuClass: [{
            type: Input
        }], overlay: [{
            type: Input
        }], isLeaf: [{
            type: Input
        }], openSubMenu: [{
            type: Output
        }], closeLeafMenu: [{
            type: Output
        }], closeAllMenus: [{
            type: Output
        }], onKeyEvent: [{
            type: HostListener,
            args: ['window:keydown.ArrowDown', ['$event']]
        }, {
            type: HostListener,
            args: ['window:keydown.ArrowUp', ['$event']]
        }], keyboardOpenSubMenu: [{
            type: HostListener,
            args: ['window:keydown.ArrowRight', ['$event']]
        }], keyboardMenuItemSelect: [{
            type: HostListener,
            args: ['window:keydown.Enter', ['$event']]
        }, {
            type: HostListener,
            args: ['window:keydown.Space', ['$event']]
        }], onCloseLeafMenu: [{
            type: HostListener,
            args: ['window:keydown.Escape', ['$event']]
        }, {
            type: HostListener,
            args: ['window:keydown.ArrowLeft', ['$event']]
        }], closeMenu: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], onMouseLeave: [{
            type: HostListener,
            args: ['mouseleave', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9tZW51L21lbnUtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUlwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztJQVMzQyw2QkFDRTtJQUFBLG9HQUFvRztJQUV0RywwQkFBZTs7OztJQUZBLGVBQXNDO0lBQXRDLHVEQUFzQyxvRUFBQTs7QUFNM0QsTUFBTSxPQUFPLG9CQUFvQjtJQW1CL0I7UUFsQmdCLGNBQVMsR0FBd0IsRUFBRSxDQUFDO1FBT3BDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsR0FBRztRQUNjLGdCQUFXLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsa0JBQWEsR0FBcUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxrQkFBYSxHQUF3QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pGLHFEQUFxRDtRQUNyRCxzRUFBc0U7UUFFL0QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVqQixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFaEIsUUFBUSxLQUFVLENBQUM7SUFFbkIsZUFBZTtRQUNiLElBQUksSUFBSSxD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QXNCO2tCQUY1QixZQUFZO21CQUFDLHNCQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDOztrQkFDL0MsWUFBWTttQkFBQyxzQkFBc0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQWdCekMsZUFBZTtrQkFGckIsWUFBWTttQkFBQyx1QkFBdUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0JBQ2hELFlBQVk7bUJBQUMsMEJBQTBCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFXN0MsU0FBUztrQkFEZixZQUFZO21CQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBU25DLFlBQVk7a0JBRGxCLFlBQVk7bUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgTm92b09wdGlvbiB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbG9zZUxlYWZNZW51RXZlbnQsIElNZW51Q2xpY2tFdmVudCB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IElMaW5rQ29uZmlnIH0gZnJvbSAnLi9tZW51LnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWVudS1jb250ZW50JyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS1jb250ZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1lbnUtY29udGFpbmVyIG5vdm8tbWVudVwiIFtuZ0NsYXNzXT1cIm1lbnVDbGFzc1wiIHRhYmluZGV4PVwiMFwiPlxuICAgIDx1bCAjbWVudSBjbGFzcz1cIm1lbnVcIiBzdHlsZT1cInBvc2l0aW9uOiBzdGF0aWM7IGZsb2F0OiBub25lO1wiIHRhYmluZGV4PVwiMFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWVudUl0ZW0gb2YgbWVudUl0ZW1zOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJtZW51SXRlbS50ZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPCEtLSA8bm92by1pY29uIGNsYXNzPVwic3ViLW1lbnUtY2FyZXRcIiBzdWZmaXggKm5nSWY9XCIhIW1lbnVJdGVtLnN1Yk1lbnVcIiBzaXplPVwic21hbGxcIiBjb2xvcj1cImFzaFwiPmV4cGFuZDwvbm92by1pY29uPiAtLT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvdWw+XG4gIDwvZGl2PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51Q29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgcHVibGljIG1lbnVJdGVtczogTWVudUl0ZW1EaXJlY3RpdmVbXSA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgaXRlbTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudTogTWVudUNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIHBhcmVudE1lbnU6IE1lbnVDb250ZW50Q29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgaXNMZWFmID0gZmFsc2U7XG4gIC8vL1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW5TdWJNZW51OiBFdmVudEVtaXR0ZXI8SU1lbnVDbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbG9zZUxlYWZNZW51OiBFdmVudEVtaXR0ZXI8Q2xvc2VMZWFmTWVudUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbG9zZUFsbE1lbnVzOiBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gQFZpZXdDaGlsZCgnbWVudScpIHB1YmxpYyBtZW51RWxlbWVudDogRWxlbWVudFJlZjtcbiAgLy8gQFZpZXdDaGlsZHJlbignbGknKSBwdWJsaWMgbWVudUl0ZW1FbGVtZW50czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIHB1YmxpYyBhdXRvRm9jdXMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9Gb2N1cykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZvY3VzKCkpO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXkudXBkYXRlUG9zaXRpb24oKTtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+KHRoaXMubWVudS5tZW51T3B0aW9ucykud2l0aFdyYXAoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvRm9jdXMpIHtcbiAgICAgIC8vIHRoaXMubWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BFdmVudCgkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbUVuYWJsZWQobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtICYmIG1lbnVJdGVtLm1lbnVJdGVtRW5hYmxlZCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtICYmIG1lbnVJdGVtLm1lbnVJdGVtVmlzaWJsZSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGlzRGlzYWJsZWQobGluazogSUxpbmtDb25maWcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGluay5lbmFibGVkICYmICFsaW5rLmVuYWJsZWQodGhpcy5pdGVtKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93RG93bicsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93VXAnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBrZXlib2FyZE9wZW5TdWJNZW51KGV2ZW50PzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jYW5jZWxFdmVudChldmVudCk7XG4gICAgY29uc3QgbWVudUl0ZW0gPSB0aGlzLm1lbnVJdGVtc1t0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleF07XG4gICAgaWYgKG1lbnVJdGVtKSB7XG4gICAgICB0aGlzLm9uT3BlblN1Yk1lbnUobWVudUl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uU3BhY2UnLCBbJyRldmVudCddKVxuICBwdWJsaWMga2V5Ym9hcmRNZW51SXRlbVNlbGVjdChldmVudD86IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5tZW51SXRlbXNbdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXhdO1xuICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICBvcHRpb24uX2NsaWNrVmlhSW50ZXJhY3Rpb24oKTtcbiAgICAvLyBpZiAobWVudUl0ZW0pIHtcbiAgICAvLyAgIHRoaXMub25NZW51SXRlbVNlbGVjdChtZW51SXRlbSwgZXZlbnQpO1xuICAgIC8vIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkVzY2FwZScsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93TGVmdCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNsb3NlTGVhZk1lbnUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuY2xvc2VMZWFmTWVudS5lbWl0KHsgZXhjZXB0Um9vdE1lbnU6IGV2ZW50LmtleSA9PT0gS2V5LkFycm93TGVmdCwgZXZlbnQgfSk7XG4gIH1cblxuICAvLyBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIGNsb3NlTWVudShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snICYmIGV2ZW50LmJ1dHRvbiA9PT0gMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlQWxsTWVudXMuZW1pdCh7IGV2ZW50IH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlTGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0xlYWYpIHtcbiAgICAgIHRoaXMuY2xvc2VMZWFmTWVudS5lbWl0KHsgZXhjZXB0Um9vdE1lbnU6IHRydWUsIGV2ZW50IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbk9wZW5TdWJNZW51KG1lbnVJdGVtOiBNZW51SXRlbURpcmVjdGl2ZSwgZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnN0IGFuY2hvckVsZW1lbnRSZWYgPSB0aGlzLm1lbnVJdGVtRWxlbWVudHMudG9BcnJheSgpW3RoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4XTtcbiAgICAvLyBjb25zdCBhbmNob3JFbGVtZW50ID0gYW5jaG9yRWxlbWVudFJlZiAmJiBhbmNob3JFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgLy8gdGhpcy5vcGVuU3ViTWVudS5lbWl0KHtcbiAgICAvLyAgIGFuY2hvckVsZW1lbnQsXG4gICAgLy8gICBtZW51OiBtZW51SXRlbS5zdWJNZW51LFxuICAgIC8vICAgZXZlbnQsXG4gICAgLy8gICBpdGVtOiB0aGlzLml0ZW0sXG4gICAgLy8gICAvLyBwYXJlbnRNZW51OiB0aGlzLFxuICAgIC8vIH0pO1xuICB9XG5cbiAgcHVibGljIG9uTWVudUl0ZW1TZWxlY3QobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlLCBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMub25PcGVuU3ViTWVudShtZW51SXRlbSwgZXZlbnQpO1xuICAgIC8vIGlmICghbWVudUl0ZW0uc3ViTWVudSkge1xuICAgIC8vICAgbWVudUl0ZW0udHJpZ2dlckV4ZWN1dGUodGhpcy5pdGVtLCBldmVudCk7XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5jZWxFdmVudChldmVudCk6IHZvaWQge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChbJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ1NFTEVDVCddLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUpID4gLTEgfHwgdGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19