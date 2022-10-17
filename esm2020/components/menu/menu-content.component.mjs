import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
        console.log('left', this.isLeaf);
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
MenuContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MenuContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: MenuContentComponent, selector: "menu-content", inputs: { menuItems: "menuItems", item: "item", event: "event", menu: "menu", parentMenu: "parentMenu", menuClass: "menuClass", overlay: "overlay", isLeaf: "isLeaf" }, outputs: { openSubMenu: "openSubMenu", closeLeafMenu: "closeLeafMenu", closeAllMenus: "closeAllMenus" }, host: { listeners: { "window:keydown.ArrowDown": "onKeyEvent($event)", "window:keydown.ArrowUp": "onKeyEvent($event)", "window:keydown.ArrowRight": "keyboardOpenSubMenu($event)", "window:keydown.Enter": "keyboardMenuItemSelect($event)", "window:keydown.Space": "keyboardMenuItemSelect($event)", "window:keydown.Escape": "onCloseLeafMenu($event)", "window:keydown.ArrowLeft": "onCloseLeafMenu($event)", "document:click": "closeMenu($event)", "mouseleave": "onMouseLeave($event)" } }, ngImport: i0, template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        <!-- <novo-icon class="sub-menu-caret" suffix *ngIf="!!menuItem.subMenu" size="small" color="ash">expand</novo-icon> -->
      </ng-container>
    </ul>
  </div> `, isInline: true, styles: [":host .passive{display:block;padding:3px 20px;clear:both;font-weight:400;white-space:nowrap}:host .menu-container{width:180px}:host .menu-container .menu{cursor:default;list-style:none;background-color:var(--color-background);-webkit-padding-start:0px!important;padding-inline-start:0px!important;box-shadow:var(--shadow-z2)}:host .menu-container .menu :hover{background:var(--color-selection-overlay);color:var(--color-text)}:host .menu-container .menu :active{background:var(--color-selection-overlay)}:host .menu-container .menu .menu-item-container{display:flex;align-items:center;position:relative}:host .menu-container .menu .menu-item-container .sub-menu-caret{position:absolute;right:var(--spacing-sm)}:host .menu-container .menu .menu-item{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;cursor:pointer;margin:0;padding:var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-lg);box-sizing:border-box;display:flex;align-items:center;gap:1rem;flex:1}:host .menu-container .menu .menu-item.text-capitalize{text-transform:capitalize}:host .menu-container .menu .menu-item.text-uppercase{text-transform:uppercase}:host .menu-container .menu .menu-item.text-nowrap{white-space:nowrap}:host .menu-container .menu .menu-item.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .menu-container .menu .menu-item.text-size-default{font-size:inherit}:host .menu-container .menu .menu-item.text-size-body{font-size:var(--font-size-body)}:host .menu-container .menu .menu-item.text-size-xs{font-size:var(--font-size-xs)}:host .menu-container .menu .menu-item.text-size-sm{font-size:var(--font-size-sm)}:host .menu-container .menu .menu-item.text-size-md{font-size:var(--font-size-md)}:host .menu-container .menu .menu-item.text-size-lg{font-size:var(--font-size-lg)}:host .menu-container .menu .menu-item.text-size-xl{font-size:var(--font-size-xl)}:host .menu-container .menu .menu-item.text-size-2xl{font-size:var(--font-size-2xl)}:host .menu-container .menu .menu-item.text-size-3xl{font-size:var(--font-size-3xl)}:host .menu-container .menu .menu-item.text-size-smaller{font-size:.8em}:host .menu-container .menu .menu-item.text-size-larger{font-size:1.2em}:host .menu-container .menu .menu-item.text-color-person{color:var(--color-person)}:host .menu-container .menu .menu-item.text-color-company{color:var(--color-company)}:host .menu-container .menu .menu-item.text-color-candidate{color:var(--color-candidate)}:host .menu-container .menu .menu-item.text-color-lead{color:var(--color-lead)}:host .menu-container .menu .menu-item.text-color-contact{color:var(--color-contact)}:host .menu-container .menu .menu-item.text-color-clientcontact{color:var(--color-clientcontact)}:host .menu-container .menu .menu-item.text-color-opportunity{color:var(--color-opportunity)}:host .menu-container .menu .menu-item.text-color-job{color:var(--color-job)}:host .menu-container .menu .menu-item.text-color-joborder{color:var(--color-joborder)}:host .menu-container .menu .menu-item.text-color-submission{color:var(--color-submission)}:host .menu-container .menu .menu-item.text-color-sendout{color:var(--color-sendout)}:host .menu-container .menu .menu-item.text-color-placement{color:var(--color-placement)}:host .menu-container .menu .menu-item.text-color-note{color:var(--color-note)}:host .menu-container .menu .menu-item.text-color-task{color:var(--color-task)}:host .menu-container .menu .menu-item.text-color-distribution-list{color:var(--color-distribution-list)}:host .menu-container .menu .menu-item.text-color-credential{color:var(--color-credential)}:host .menu-container .menu .menu-item.text-color-user{color:var(--color-user)}:host .menu-container .menu .menu-item.text-color-corporate-user{color:var(--color-corporate-user)}:host .menu-container .menu .menu-item.text-color-contract{color:var(--color-contract)}:host .menu-container .menu .menu-item.text-color-job-code{color:var(--color-job-code)}:host .menu-container .menu .menu-item.text-color-earn-code{color:var(--color-earn-code)}:host .menu-container .menu .menu-item.text-color-billable-charge{color:var(--color-billable-charge)}:host .menu-container .menu .menu-item.text-color-payable-charge{color:var(--color-payable-charge)}:host .menu-container .menu .menu-item.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .menu-container .menu .menu-item.text-color-selection{color:var(--color-selection)}:host .menu-container .menu .menu-item.text-color-positive{color:var(--color-positive)}:host .menu-container .menu .menu-item.text-color-success{color:var(--color-success)}:host .menu-container .menu .menu-item.text-color-warning{color:var(--color-warning)}:host .menu-container .menu .menu-item.text-color-error{color:var(--color-error)}:host .menu-container .menu .menu-item.text-color-info{color:var(--color-info)}:host .menu-container .menu .menu-item.text-color-disabled{color:var(--color-disabled)}:host .menu-container .menu .menu-item.text-color-red{color:var(--palette-red-50)}:host .menu-container .menu .menu-item.text-color-pink{color:var(--palette-pink-50)}:host .menu-container .menu .menu-item.text-color-orange{color:var(--palette-orange-50)}:host .menu-container .menu .menu-item.text-color-yellow{color:var(--palette-yellow-50)}:host .menu-container .menu .menu-item.text-color-green{color:var(--palette-green-50)}:host .menu-container .menu .menu-item.text-color-teal{color:var(--palette-teal-50)}:host .menu-container .menu .menu-item.text-color-blue{color:var(--palette-blue-50)}:host .menu-container .menu .menu-item.text-color-aqua{color:var(--palette-aqua-50)}:host .menu-container .menu .menu-item.text-color-indigo{color:var(--palette-indigo-50)}:host .menu-container .menu .menu-item.text-color-violet{color:var(--palette-violet-50)}:host .menu-container .menu .menu-item.text-color-gray{color:var(--palette-gray-50)}:host .menu-container .menu .menu-item.margin-before{margin-top:.4rem}:host .menu-container .menu .menu-item.margin-after{margin-bottom:.8rem}:host .menu-container .menu .menu-item.text-length-small{max-width:40ch}:host .menu-container .menu .menu-item.text-length-medium{max-width:55ch}:host .menu-container .menu .menu-item.text-length-large{max-width:70ch}:host .menu-container .menu .menu-item.text-weight-hairline{font-weight:100}:host .menu-container .menu .menu-item.text-weight-thin{font-weight:200}:host .menu-container .menu .menu-item.text-weight-light{font-weight:300}:host .menu-container .menu .menu-item.text-weight-normal{font-weight:400}:host .menu-container .menu .menu-item.text-weight-medium{font-weight:500}:host .menu-container .menu .menu-item.text-weight-semibold{font-weight:600}:host .menu-container .menu .menu-item.text-weight-bold{font-weight:700}:host .menu-container .menu .menu-item.text-weight-extrabold{font-weight:800}:host .menu-container .menu .menu-item.text-weight-heavy{font-weight:900}:host .menu-container .menu .menu-item.text-weight-lighter{font-weight:lighter}:host .menu-container .menu .menu-item.text-weight-bolder{font-weight:bolder}:host .menu-container .menu .divider{order:none;height:1px;background:var(--color-border)}:host .menu-container .menu a.disabled{color:var(--color-disabled);cursor:not-allowed}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: MenuContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'menu-content', template: `<div class="menu-container novo-menu" [ngClass]="menuClass" tabindex="0">
    <ul #menu class="menu" style="position: static; float: none;" tabindex="0">
      <ng-container *ngFor="let menuItem of menuItems; let i = index">
        <ng-template [ngTemplateOutlet]="menuItem.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        <!-- <novo-icon class="sub-menu-caret" suffix *ngIf="!!menuItem.subMenu" size="small" color="ash">expand</novo-icon> -->
      </ng-container>
    </ul>
  </div> `, styles: [":host .passive{display:block;padding:3px 20px;clear:both;font-weight:400;white-space:nowrap}:host .menu-container{width:180px}:host .menu-container .menu{cursor:default;list-style:none;background-color:var(--color-background);-webkit-padding-start:0px!important;padding-inline-start:0px!important;box-shadow:var(--shadow-z2)}:host .menu-container .menu :hover{background:var(--color-selection-overlay);color:var(--color-text)}:host .menu-container .menu :active{background:var(--color-selection-overlay)}:host .menu-container .menu .menu-item-container{display:flex;align-items:center;position:relative}:host .menu-container .menu .menu-item-container .sub-menu-caret{position:absolute;right:var(--spacing-sm)}:host .menu-container .menu .menu-item{display:inline;font-weight:400;color:inherit;font-size:var(--font-size-text);transition:color .2s ease-out,opacity .2s ease-out;vertical-align:middle;cursor:pointer;margin:0;padding:var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-lg);box-sizing:border-box;display:flex;align-items:center;gap:1rem;flex:1}:host .menu-container .menu .menu-item.text-capitalize{text-transform:capitalize}:host .menu-container .menu .menu-item.text-uppercase{text-transform:uppercase}:host .menu-container .menu .menu-item.text-nowrap{white-space:nowrap}:host .menu-container .menu .menu-item.text-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .menu-container .menu .menu-item.text-size-default{font-size:inherit}:host .menu-container .menu .menu-item.text-size-body{font-size:var(--font-size-body)}:host .menu-container .menu .menu-item.text-size-xs{font-size:var(--font-size-xs)}:host .menu-container .menu .menu-item.text-size-sm{font-size:var(--font-size-sm)}:host .menu-container .menu .menu-item.text-size-md{font-size:var(--font-size-md)}:host .menu-container .menu .menu-item.text-size-lg{font-size:var(--font-size-lg)}:host .menu-container .menu .menu-item.text-size-xl{font-size:var(--font-size-xl)}:host .menu-container .menu .menu-item.text-size-2xl{font-size:var(--font-size-2xl)}:host .menu-container .menu .menu-item.text-size-3xl{font-size:var(--font-size-3xl)}:host .menu-container .menu .menu-item.text-size-smaller{font-size:.8em}:host .menu-container .menu .menu-item.text-size-larger{font-size:1.2em}:host .menu-container .menu .menu-item.text-color-person{color:var(--color-person)}:host .menu-container .menu .menu-item.text-color-company{color:var(--color-company)}:host .menu-container .menu .menu-item.text-color-candidate{color:var(--color-candidate)}:host .menu-container .menu .menu-item.text-color-lead{color:var(--color-lead)}:host .menu-container .menu .menu-item.text-color-contact{color:var(--color-contact)}:host .menu-container .menu .menu-item.text-color-clientcontact{color:var(--color-clientcontact)}:host .menu-container .menu .menu-item.text-color-opportunity{color:var(--color-opportunity)}:host .menu-container .menu .menu-item.text-color-job{color:var(--color-job)}:host .menu-container .menu .menu-item.text-color-joborder{color:var(--color-joborder)}:host .menu-container .menu .menu-item.text-color-submission{color:var(--color-submission)}:host .menu-container .menu .menu-item.text-color-sendout{color:var(--color-sendout)}:host .menu-container .menu .menu-item.text-color-placement{color:var(--color-placement)}:host .menu-container .menu .menu-item.text-color-note{color:var(--color-note)}:host .menu-container .menu .menu-item.text-color-task{color:var(--color-task)}:host .menu-container .menu .menu-item.text-color-distribution-list{color:var(--color-distribution-list)}:host .menu-container .menu .menu-item.text-color-credential{color:var(--color-credential)}:host .menu-container .menu .menu-item.text-color-user{color:var(--color-user)}:host .menu-container .menu .menu-item.text-color-corporate-user{color:var(--color-corporate-user)}:host .menu-container .menu .menu-item.text-color-contract{color:var(--color-contract)}:host .menu-container .menu .menu-item.text-color-job-code{color:var(--color-job-code)}:host .menu-container .menu .menu-item.text-color-earn-code{color:var(--color-earn-code)}:host .menu-container .menu .menu-item.text-color-billable-charge{color:var(--color-billable-charge)}:host .menu-container .menu .menu-item.text-color-payable-charge{color:var(--color-payable-charge)}:host .menu-container .menu .menu-item.text-color-invoice-statement{color:var(--color-invoice-statement)}:host .menu-container .menu .menu-item.text-color-selection{color:var(--color-selection)}:host .menu-container .menu .menu-item.text-color-positive{color:var(--color-positive)}:host .menu-container .menu .menu-item.text-color-success{color:var(--color-success)}:host .menu-container .menu .menu-item.text-color-warning{color:var(--color-warning)}:host .menu-container .menu .menu-item.text-color-error{color:var(--color-error)}:host .menu-container .menu .menu-item.text-color-info{color:var(--color-info)}:host .menu-container .menu .menu-item.text-color-disabled{color:var(--color-disabled)}:host .menu-container .menu .menu-item.text-color-red{color:var(--palette-red-50)}:host .menu-container .menu .menu-item.text-color-pink{color:var(--palette-pink-50)}:host .menu-container .menu .menu-item.text-color-orange{color:var(--palette-orange-50)}:host .menu-container .menu .menu-item.text-color-yellow{color:var(--palette-yellow-50)}:host .menu-container .menu .menu-item.text-color-green{color:var(--palette-green-50)}:host .menu-container .menu .menu-item.text-color-teal{color:var(--palette-teal-50)}:host .menu-container .menu .menu-item.text-color-blue{color:var(--palette-blue-50)}:host .menu-container .menu .menu-item.text-color-aqua{color:var(--palette-aqua-50)}:host .menu-container .menu .menu-item.text-color-indigo{color:var(--palette-indigo-50)}:host .menu-container .menu .menu-item.text-color-violet{color:var(--palette-violet-50)}:host .menu-container .menu .menu-item.text-color-gray{color:var(--palette-gray-50)}:host .menu-container .menu .menu-item.margin-before{margin-top:.4rem}:host .menu-container .menu .menu-item.margin-after{margin-bottom:.8rem}:host .menu-container .menu .menu-item.text-length-small{max-width:40ch}:host .menu-container .menu .menu-item.text-length-medium{max-width:55ch}:host .menu-container .menu .menu-item.text-length-large{max-width:70ch}:host .menu-container .menu .menu-item.text-weight-hairline{font-weight:100}:host .menu-container .menu .menu-item.text-weight-thin{font-weight:200}:host .menu-container .menu .menu-item.text-weight-light{font-weight:300}:host .menu-container .menu .menu-item.text-weight-normal{font-weight:400}:host .menu-container .menu .menu-item.text-weight-medium{font-weight:500}:host .menu-container .menu .menu-item.text-weight-semibold{font-weight:600}:host .menu-container .menu .menu-item.text-weight-bold{font-weight:700}:host .menu-container .menu .menu-item.text-weight-extrabold{font-weight:800}:host .menu-container .menu .menu-item.text-weight-heavy{font-weight:900}:host .menu-container .menu .menu-item.text-weight-lighter{font-weight:lighter}:host .menu-container .menu .menu-item.text-weight-bolder{font-weight:bolder}:host .menu-container .menu .divider{order:none;height:1px;background:var(--color-border)}:host .menu-container .menu a.disabled{color:var(--color-disabled);cursor:not-allowed}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { menuItems: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvbWVudS9tZW51LWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQWlCcEMsTUFBTSxPQUFPLG9CQUFvQjtJQW1CL0I7UUFsQmdCLGNBQVMsR0FBd0IsRUFBRSxDQUFDO1FBT3BDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsR0FBRztRQUNjLGdCQUFXLEdBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEUsa0JBQWEsR0FBcUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRSxrQkFBYSxHQUF3QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pGLHFEQUFxRDtRQUNyRCxzRUFBc0U7UUFFL0QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVqQixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFaEIsUUFBUSxLQUFVLENBQUM7SUFFbkIsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBMEIsQ0FBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xHLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQiwwQ0FBMEM7U0FDM0M7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWtCO1FBQzFCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0saUJBQWlCLENBQUMsUUFBMkI7UUFDbEQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0saUJBQWlCLENBQUMsUUFBMkI7UUFDbEQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sa0JBQWtCLENBQUMsS0FBVTtRQUNsQyxJQUFJLEtBQUssWUFBWSxRQUFRLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sVUFBVSxDQUFDLElBQWlCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFJTSxVQUFVLENBQUMsS0FBb0I7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUdNLG1CQUFtQixDQUFDLEtBQXFCO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFJTSxzQkFBc0IsQ0FBQyxLQUFxQjtRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUMzQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM5QixrQkFBa0I7UUFDbEIsNENBQTRDO1FBQzVDLElBQUk7SUFDTixDQUFDO0lBSU0sZUFBZSxDQUFDLEtBQW9CO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLEdBQUcsZ0NBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsb0RBQW9EO0lBRTdDLFNBQVMsQ0FBQyxLQUFpQjtRQUNoQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hELE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBR00sWUFBWSxDQUFDLEtBQWlCO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFTSxhQUFhLENBQUMsUUFBMkIsRUFBRSxLQUFrQztRQUNsRiw4RkFBOEY7UUFDOUYsNEVBQTRFO1FBQzVFLDBCQUEwQjtRQUMxQixtQkFBbUI7UUFDbkIsNEJBQTRCO1FBQzVCLFdBQVc7UUFDWCxxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLE1BQU07SUFDUixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsUUFBMkIsRUFBRSxLQUFpQztRQUNwRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLDJCQUEyQjtRQUMzQiwrQ0FBK0M7UUFDL0MsSUFBSTtJQUNOLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTztTQUNSO1FBRUQsTUFBTSxNQUFNLEdBQWdCLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7WUFDNUYsT0FBTztTQUNSO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDOztrSEFoS1Usb0JBQW9CO3NHQUFwQixvQkFBb0Isd3lCQVRyQjs7Ozs7OztVQU9GOzRGQUVHLG9CQUFvQjtrQkFaaEMsU0FBUzsrQkFDRSxjQUFjLFlBRWQ7Ozs7Ozs7VUFPRjswRUFHUSxTQUFTO3NCQUF4QixLQUFLO2dCQUNVLElBQUk7c0JBQW5CLEtBQUs7Z0JBQ1UsS0FBSztzQkFBcEIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNVLFVBQVU7c0JBQXpCLEtBQUs7Z0JBQ1UsU0FBUztzQkFBeEIsS0FBSztnQkFDVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLE1BQU07c0JBQXJCLEtBQUs7Z0JBRVcsV0FBVztzQkFBM0IsTUFBTTtnQkFDVSxhQUFhO3NCQUE3QixNQUFNO2dCQUNVLGFBQWE7c0JBQTdCLE1BQU07Z0JBc0RBLFVBQVU7c0JBRmhCLFlBQVk7dUJBQUMsMEJBQTBCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQUNuRCxZQUFZO3VCQUFDLHdCQUF3QixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVMzQyxtQkFBbUI7c0JBRHpCLFlBQVk7dUJBQUMsMkJBQTJCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBYzlDLHNCQUFzQjtzQkFGNUIsWUFBWTt1QkFBQyxzQkFBc0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0JBQy9DLFlBQVk7dUJBQUMsc0JBQXNCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBZ0J6QyxlQUFlO3NCQUZyQixZQUFZO3VCQUFDLHVCQUF1QixFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDaEQsWUFBWTt1QkFBQywwQkFBMEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFXN0MsU0FBUztzQkFEZixZQUFZO3VCQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVNuQyxZQUFZO3NCQURsQixZQUFZO3VCQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvT3B0aW9uIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IENsb3NlTGVhZk1lbnVFdmVudCwgSU1lbnVDbGlja0V2ZW50IH0gZnJvbSAnLi9tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgSUxpbmtDb25maWcgfSBmcm9tICcuL21lbnUudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZW51LWNvbnRlbnQnLFxuICBzdHlsZVVybHM6IFsnLi9tZW51LWNvbnRlbnQuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWVudS1jb250YWluZXIgbm92by1tZW51XCIgW25nQ2xhc3NdPVwibWVudUNsYXNzXCIgdGFiaW5kZXg9XCIwXCI+XG4gICAgPHVsICNtZW51IGNsYXNzPVwibWVudVwiIHN0eWxlPVwicG9zaXRpb246IHN0YXRpYzsgZmxvYXQ6IG5vbmU7XCIgdGFiaW5kZXg9XCIwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtZW51SXRlbSBvZiBtZW51SXRlbXM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm1lbnVJdGVtLnRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8IS0tIDxub3ZvLWljb24gY2xhc3M9XCJzdWItbWVudS1jYXJldFwiIHN1ZmZpeCAqbmdJZj1cIiEhbWVudUl0ZW0uc3ViTWVudVwiIHNpemU9XCJzbWFsbFwiIGNvbG9yPVwiYXNoXCI+ZXhwYW5kPC9ub3ZvLWljb24+IC0tPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC91bD5cbiAgPC9kaXY+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUl0ZW1zOiBNZW51SXRlbURpcmVjdGl2ZVtdID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBpdGVtOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51OiBhbnk7IC8vIE1lbnVDb21wb25lbnRcbiAgQElucHV0KCkgcHVibGljIHBhcmVudE1lbnU6IE1lbnVDb250ZW50Q29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbWVudUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBvdmVybGF5OiBPdmVybGF5UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgaXNMZWFmID0gZmFsc2U7XG4gIC8vL1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW5TdWJNZW51OiBFdmVudEVtaXR0ZXI8SU1lbnVDbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbG9zZUxlYWZNZW51OiBFdmVudEVtaXR0ZXI8Q2xvc2VMZWFmTWVudUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbG9zZUFsbE1lbnVzOiBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gQFZpZXdDaGlsZCgnbWVudScpIHB1YmxpYyBtZW51RWxlbWVudDogRWxlbWVudFJlZjtcbiAgLy8gQFZpZXdDaGlsZHJlbignbGknKSBwdWJsaWMgbWVudUl0ZW1FbGVtZW50czogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIHB1YmxpYyBhdXRvRm9jdXMgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8Tm92b09wdGlvbj47XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9Gb2N1cykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmZvY3VzKCkpO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXkudXBkYXRlUG9zaXRpb24oKTtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5vdm9PcHRpb24+KHRoaXMubWVudS5tZW51T3B0aW9ucykud2l0aFdyYXAoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvRm9jdXMpIHtcbiAgICAgIC8vIHRoaXMubWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BFdmVudCgkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbUVuYWJsZWQobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtICYmIG1lbnVJdGVtLm1lbnVJdGVtRW5hYmxlZCk7XG4gIH1cblxuICBwdWJsaWMgaXNNZW51SXRlbVZpc2libGUobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVJZkZ1bmN0aW9uKG1lbnVJdGVtICYmIG1lbnVJdGVtLm1lbnVJdGVtVmlzaWJsZSk7XG4gIH1cblxuICBwdWJsaWMgZXZhbHVhdGVJZkZ1bmN0aW9uKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gdmFsdWUodGhpcy5pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGlzRGlzYWJsZWQobGluazogSUxpbmtDb25maWcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGluay5lbmFibGVkICYmICFsaW5rLmVuYWJsZWQodGhpcy5pdGVtKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93RG93bicsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93VXAnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uQXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBrZXlib2FyZE9wZW5TdWJNZW51KGV2ZW50PzogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0xlYWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jYW5jZWxFdmVudChldmVudCk7XG4gICAgY29uc3QgbWVudUl0ZW0gPSB0aGlzLm1lbnVJdGVtc1t0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleF07XG4gICAgaWYgKG1lbnVJdGVtKSB7XG4gICAgICB0aGlzLm9uT3BlblN1Yk1lbnUobWVudUl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleWRvd24uU3BhY2UnLCBbJyRldmVudCddKVxuICBwdWJsaWMga2V5Ym9hcmRNZW51SXRlbVNlbGVjdChldmVudD86IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIGNvbnN0IG1lbnVJdGVtID0gdGhpcy5tZW51SXRlbXNbdGhpcy5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXhdO1xuICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICBvcHRpb24uX2NsaWNrVmlhSW50ZXJhY3Rpb24oKTtcbiAgICAvLyBpZiAobWVudUl0ZW0pIHtcbiAgICAvLyAgIHRoaXMub25NZW51SXRlbVNlbGVjdChtZW51SXRlbSwgZXZlbnQpO1xuICAgIC8vIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkVzY2FwZScsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLkFycm93TGVmdCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkNsb3NlTGVhZk1lbnUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNMZWFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMuY2xvc2VMZWFmTWVudS5lbWl0KHsgZXhjZXB0Um9vdE1lbnU6IGV2ZW50LmtleSA9PT0gS2V5LkFycm93TGVmdCwgZXZlbnQgfSk7XG4gIH1cblxuICAvLyBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIGNsb3NlTWVudShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snICYmIGV2ZW50LmJ1dHRvbiA9PT0gMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlQWxsTWVudXMuZW1pdCh7IGV2ZW50IH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlTGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnbGVmdCcsIHRoaXMuaXNMZWFmKTtcbiAgICBpZiAodGhpcy5pc0xlYWYpIHtcbiAgICAgIHRoaXMuY2xvc2VMZWFmTWVudS5lbWl0KHsgZXhjZXB0Um9vdE1lbnU6IHRydWUsIGV2ZW50IH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbk9wZW5TdWJNZW51KG1lbnVJdGVtOiBNZW51SXRlbURpcmVjdGl2ZSwgZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIC8vIGNvbnN0IGFuY2hvckVsZW1lbnRSZWYgPSB0aGlzLm1lbnVJdGVtRWxlbWVudHMudG9BcnJheSgpW3RoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4XTtcbiAgICAvLyBjb25zdCBhbmNob3JFbGVtZW50ID0gYW5jaG9yRWxlbWVudFJlZiAmJiBhbmNob3JFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgLy8gdGhpcy5vcGVuU3ViTWVudS5lbWl0KHtcbiAgICAvLyAgIGFuY2hvckVsZW1lbnQsXG4gICAgLy8gICBtZW51OiBtZW51SXRlbS5zdWJNZW51LFxuICAgIC8vICAgZXZlbnQsXG4gICAgLy8gICBpdGVtOiB0aGlzLml0ZW0sXG4gICAgLy8gICAvLyBwYXJlbnRNZW51OiB0aGlzLFxuICAgIC8vIH0pO1xuICB9XG5cbiAgcHVibGljIG9uTWVudUl0ZW1TZWxlY3QobWVudUl0ZW06IE1lbnVJdGVtRGlyZWN0aXZlLCBldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMub25PcGVuU3ViTWVudShtZW51SXRlbSwgZXZlbnQpO1xuICAgIC8vIGlmICghbWVudUl0ZW0uc3ViTWVudSkge1xuICAgIC8vICAgbWVudUl0ZW0udHJpZ2dlckV4ZWN1dGUodGhpcy5pdGVtLCBldmVudCk7XG4gICAgLy8gfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5jZWxFdmVudChldmVudCk6IHZvaWQge1xuICAgIGlmICghZXZlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmIChbJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ1NFTEVDVCddLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUpID4gLTEgfHwgdGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19