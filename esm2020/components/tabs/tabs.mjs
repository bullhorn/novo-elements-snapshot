var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// NG2
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, ViewChild, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BooleanInput } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class NovoNavElement {
    constructor() {
        this.theme = '';
        this.direction = '';
        this.condensed = false;
        this.items = [];
        this._selectedIndex = null;
        /** The tab index that should be selected after the content has been checked. */
        this._indexToSelect = 0;
        /** Output to enable support for two-way binding on `[(selectedIndex)]` */
        this.selectedIndexChange = new EventEmitter();
    }
    /** The index of the active tab. */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        this._indexToSelect = coerceNumberProperty(value, null);
    }
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        const indexToSelect = (this._indexToSelect = this._clampTabIndex(this._indexToSelect));
        if (this._selectedIndex !== indexToSelect) {
            const isFirstRun = this._selectedIndex == null;
            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(() => {
                this._deactivateAllItems(this.items);
                this._activateSelectedItem(indexToSelect);
                this._showActiveContent(indexToSelect);
                if (!isFirstRun) {
                    this.selectedIndexChange.emit(indexToSelect);
                }
            });
            this._selectedIndex = indexToSelect;
        }
    }
    select(item) {
        const indexToSelect = this.items.indexOf(item);
        // Deactivate all other tabs
        this._deactivateAllItems(this.items);
        this._activateSelectedItem(indexToSelect);
        this._showActiveContent(indexToSelect);
        this.selectedIndexChange.emit(indexToSelect);
    }
    add(item) {
        if (this.items.length === 0) {
            item.active = true;
            // item.selected.next();
        }
        this.items.push(item);
    }
    _activateSelectedItem(indexToSelect) {
        const item = this.items[indexToSelect];
        if (item) {
            item.active = true;
        }
    }
    _showActiveContent(indexToSelect) {
        if (this.outlet) {
            this.outlet.show(indexToSelect);
        }
    }
    _deactivateAllItems(items) {
        items.forEach((t) => {
            if (t.active === true) {
                // t.deselected.next();
            }
            t.active = false;
        });
    }
    /** Clamps the given index to the bounds of 0 and the tabs length. */
    _clampTabIndex(index) {
        return Math.min(this.items.length - 1, Math.max(index || 0, 0));
    }
}
NovoNavElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoNavElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavElement, selector: "novo-nav", inputs: { theme: "theme", direction: "direction", outlet: "outlet", router: "router", condensed: "condensed", selectedIndex: "selectedIndex" }, outputs: { selectedIndexChange: "selectedIndexChange" }, host: { properties: { "attr.role": "tablist", "class.condensed": "this.condensed" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{background:var(--nav-color-background);color:var(--nav-color-text);padding:0 var(--nav-spacing);gap:var(--nav-spacing);box-shadow:var(--nav-shadow);display:flex;align-items:center;justify-content:flex-start;list-style:none;margin:0;z-index:1}:host[direction=vertical]{flex-direction:column;width:auto}:host[type=button-bar]{display:inline-flex;border-radius:3px;border:2px solid var(--color-border)}\n"] });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoNavElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav', template: '<ng-content></ng-content>', host: {
                        '[attr.role]': 'tablist',
                    }, styles: [":host{background:var(--nav-color-background);color:var(--nav-color-text);padding:0 var(--nav-spacing);gap:var(--nav-spacing);box-shadow:var(--nav-shadow);display:flex;align-items:center;justify-content:flex-start;list-style:none;margin:0;z-index:1}:host[direction=vertical]{flex-direction:column;width:auto}:host[type=button-bar]{display:inline-flex;border-radius:3px;border:2px solid var(--color-border)}\n"] }]
        }], propDecorators: { theme: [{
                type: Input
            }], direction: [{
                type: Input
            }], outlet: [{
                type: Input
            }], router: [{
                type: Input
            }], condensed: [{
                type: HostBinding,
                args: ['class.condensed']
            }, {
                type: Input
            }], selectedIndex: [{
                type: Input
            }], selectedIndexChange: [{
                type: Output
            }] } });
export class NovoTabElement {
    constructor(nav, el, cdr) {
        this.el = el;
        this.cdr = cdr;
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.activeChange = new EventEmitter();
        this.onlyText = true;
        this.nav = nav;
        this.nav.add(this);
        const tablink = el.nativeElement.querySelector('.novo-tab-link');
        if (tablink) {
            for (let i = 0; i < tablink.childNodes.length; i++) {
                if (tablink.childNodes[i].nodeType !== Node.TEXT_NODE)
                    this.onlyText = false;
            }
        }
    }
    get hb_textOnly() {
        return this.onlyText;
    }
    select() {
        if (!this.disabled) {
            this.activeChange.emit(true);
            this.nav.select(this);
        }
        this.cdr.detectChanges();
    }
}
NovoTabElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabElement, deps: [{ token: NovoNavElement }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NovoTabElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTabElement, selector: "novo-tab", inputs: { active: "active", color: "color", disabled: "disabled" }, outputs: { activeChange: "activeChange" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role", "class.text-only": "this.hb_textOnly" } }, viewQueries: [{ propertyName: "tablink", first: true, predicate: ["tablink"], descendants: true }], ngImport: i0, template: `
    <div #tablink class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, isInline: true, styles: [":host{color:var(--tab-color-text);background:var(--tab-color-background);padding:0 var(--tab-spacing);gap:var(--tab-spacing);height:var(--tab-height);display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{gap:var(--tab-spacing);font-size:var(--tab-font-size);display:flex;align-items:center;text-transform:uppercase;cursor:pointer}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active,:host.router-link-active{color:var(--tab-color-active)}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--tab-color-active);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;min-width:12rem}:host-context(novo-nav[direction=vertical]) .indicator{order:1;height:100%;width:4px;top:0;bottom:0;left:0;display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoTabElement.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tab', host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                        '[attr.role]': 'tab',
                    }, template: `
    <div #tablink class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{color:var(--tab-color-text);background:var(--tab-color-background);padding:0 var(--tab-spacing);gap:var(--tab-spacing);height:var(--tab-height);display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{gap:var(--tab-spacing);font-size:var(--tab-font-size);display:flex;align-items:center;text-transform:uppercase;cursor:pointer}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active,:host.router-link-active{color:var(--tab-color-active)}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--tab-color-active);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;min-width:12rem}:host-context(novo-nav[direction=vertical]) .indicator{order:1;height:100%;width:4px;top:0;bottom:0;left:0;display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoNavElement }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], color: [{
                type: Input
            }], disabled: [{
                type: Input
            }], activeChange: [{
                type: Output
            }], hb_textOnly: [{
                type: HostBinding,
                args: ['class.text-only']
            }], tablink: [{
                type: ViewChild,
                args: ['tablink']
            }] } });
export class NovoTabButtonElement {
    constructor(nav) {
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.nav = nav;
        this.nav.add(this);
    }
    select() {
        if (!this.disabled) {
            this.nav.select(this);
        }
    }
}
NovoTabButtonElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabButtonElement, deps: [{ token: NovoNavElement }], target: i0.ɵɵFactoryTarget.Component });
NovoTabButtonElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTabButtonElement, selector: "novo-tab-button", inputs: { active: "active", disabled: "disabled" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{padding:var(--spacing-md);cursor:pointer;transition:all .12s ease-in-out}:host.disabled{opacity:.5;cursor:not-allowed}:host.disabled:hover{opacity:.5}:host-context(novo-nav[theme=color]){color:#ffffffbf}:host-context(novo-nav[theme=color]).active{color:#fff;background:rgba(0,0,0,.2)}:host-context(novo-nav[theme=color]):hover{background:rgba(0,0,0,.1)}:host-context(novo-nav[theme=color]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=color]).disabled:hover{opacity:.5}:host-context(novo-nav[theme=white]){color:var(--color-text);opacity:.75}:host-context(novo-nav[theme=white]).active{color:var(--color-selection);background:rgba(0,0,0,.05);opacity:1}:host-context(novo-nav[theme=white]):hover{opacity:1}:host-context(novo-nav[theme=white]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover{opacity:.5}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabButtonElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tab-button', host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                    }, template: '<ng-content></ng-content>', styles: [":host{padding:var(--spacing-md);cursor:pointer;transition:all .12s ease-in-out}:host.disabled{opacity:.5;cursor:not-allowed}:host.disabled:hover{opacity:.5}:host-context(novo-nav[theme=color]){color:#ffffffbf}:host-context(novo-nav[theme=color]).active{color:#fff;background:rgba(0,0,0,.2)}:host-context(novo-nav[theme=color]):hover{background:rgba(0,0,0,.1)}:host-context(novo-nav[theme=color]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=color]).disabled:hover{opacity:.5}:host-context(novo-nav[theme=white]){color:var(--color-text);opacity:.75}:host-context(novo-nav[theme=white]).active{color:var(--color-selection);background:rgba(0,0,0,.05);opacity:1}:host-context(novo-nav[theme=white]):hover{opacity:1}:host-context(novo-nav[theme=white]).disabled{opacity:.5;cursor:not-allowed}:host-context(novo-nav[theme=white]).disabled:hover{opacity:.5}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoNavElement }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
export class NovoTabLinkElement {
    constructor(nav, router, cdr, link) {
        this.router = router;
        this.cdr = cdr;
        this.link = link;
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.nav = nav;
        this.nav.add(this);
    }
    ngOnInit() {
        if (this.isLinkActive(this.link)) {
            this.nav.select(this);
        }
    }
    select() {
        if (!this.disabled) {
            this.nav.select(this);
            if (this.spy) {
                const el = document.querySelector(`#${this.spy}`);
                el?.scrollIntoView(true);
            }
        }
    }
    isLinkActive(link) {
        return link && link.urlTree ? this.router.isActive(link.urlTree, false) : false;
    }
}
NovoTabLinkElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabLinkElement, deps: [{ token: NovoNavElement }, { token: i1.Router }, { token: i0.ChangeDetectorRef }, { token: i1.RouterLink, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NovoTabLinkElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTabLinkElement, selector: "novo-tab-link", inputs: { active: "active", disabled: "disabled", spy: "spy" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role" } }, ngImport: i0, template: `
    <div class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, isInline: true, styles: [":host{color:var(--tab-color-text);background:var(--tab-color-background);padding:0 var(--tab-spacing);gap:var(--tab-spacing);height:var(--tab-height);display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{gap:var(--tab-spacing);font-size:var(--tab-font-size);display:flex;align-items:center;text-transform:uppercase;cursor:pointer}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active,:host.router-link-active{color:var(--tab-color-active)}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--tab-color-active);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;min-width:12rem}:host-context(novo-nav[direction=vertical]) .indicator{order:1;height:100%;width:4px;top:0;bottom:0;left:0;display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabLinkElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tab-link', host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                    }, template: `
    <div class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{color:var(--tab-color-text);background:var(--tab-color-background);padding:0 var(--tab-spacing);gap:var(--tab-spacing);height:var(--tab-height);display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative}:host.disabled .novo-tab-link{opacity:.5;cursor:not-allowed}:host.disabled:hover .novo-tab-link{opacity:.5}:host .novo-tab-link{gap:var(--tab-spacing);font-size:var(--tab-font-size);display:flex;align-items:center;text-transform:uppercase;cursor:pointer}:host .novo-tab-link:focus{outline:none}:host .indicator{position:absolute;bottom:0;width:0;height:3px;display:block;background:transparent;transition:all .22s ease-in-out}:host.active,:host.router-link-active{color:var(--tab-color-active)}:host.active .novo-tab-link,:host.router-link-active .novo-tab-link{opacity:1;font-weight:500}:host.active .indicator,:host.router-link-active .indicator{background:var(--tab-color-active);width:100%}:host:hover .novo-tab-link{opacity:1}:host:focus{outline:none}:host-context(novo-nav[direction=vertical]){display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;min-width:12rem}:host-context(novo-nav[direction=vertical]) .indicator{order:1;height:100%;width:4px;top:0;bottom:0;left:0;display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoNavElement }, { type: i1.Router }, { type: i0.ChangeDetectorRef }, { type: i1.RouterLink, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], disabled: [{
                type: Input
            }], spy: [{
                type: Input
            }] } });
export class NovoNavOutletElement {
    constructor() {
        this.items = [];
    }
    show(index) {
        const item = this.items[index];
        /**
         * Deactivates other tab items
         * @param items - deactivated items
         */
        function _deactivateAllItems(items) {
            items.forEach((t) => {
                if (t.active === true) {
                    // t.deselected.next();
                }
                t.active = false;
            });
        }
        _deactivateAllItems(this.items);
        item.active = true;
    }
    add(item) {
        if (this.items.length === 0) {
            item.active = true;
        }
        this.items.push(item);
    }
}
NovoNavOutletElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavOutletElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoNavOutletElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavOutletElement, selector: "novo-nav-outlet", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block}:host novo-nav-header{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}:host novo-nav-content{display:none}:host novo-nav-content.active{display:block}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavOutletElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav-outlet', template: '<ng-content></ng-content>', styles: [":host{display:block}:host novo-nav-header{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}:host novo-nav-content{display:none}:host novo-nav-content.active{display:block}\n"] }]
        }] });
export class NovoNavContentElement {
    constructor(outlet) {
        this.active = false;
        outlet.add(this);
    }
}
NovoNavContentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavContentElement, deps: [{ token: NovoNavOutletElement }], target: i0.ɵɵFactoryTarget.Component });
NovoNavContentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavContentElement, selector: "novo-nav-content", inputs: { active: "active" }, host: { properties: { "attr.role": "tabpanel", "class.active": "active" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block}:host novo-nav-header{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}:host{display:none}:host.active{display:block}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavContentElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav-content', host: {
                        '[attr.role]': 'tabpanel',
                        '[class.active]': 'active',
                    }, template: '<ng-content></ng-content>', styles: [":host{display:block}:host novo-nav-header{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}:host{display:none}:host.active{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoNavOutletElement }]; }, propDecorators: { active: [{
                type: Input
            }] } });
export class NovoNavHeaderElement {
    constructor(outlet) {
        this.role = 'tabpanel';
        this.active = false;
        this.active = this.active || false;
        this.outlet = outlet;
    }
    show(event) {
        try {
            const INDEX = this.outlet.items.indexOf(this.forElement);
            if (INDEX > -1) {
                this.outlet.show(INDEX);
            }
        }
        catch (err) {
            // do nothing
        }
    }
}
NovoNavHeaderElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavHeaderElement, deps: [{ token: NovoNavOutletElement }], target: i0.ɵɵFactoryTarget.Component });
NovoNavHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavHeaderElement, selector: "novo-nav-header", inputs: { active: "active", forElement: ["for", "forElement"] }, host: { listeners: { "click": "show($event)" }, properties: { "class.active": "active", "attr.role": "this.role" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavHeaderElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-nav-header', host: {
                        '[class.active]': 'active',
                        '(click)': 'show($event)',
                    }, template: '<ng-content></ng-content>', styles: [":host{display:block;padding:var(--spacing-sm);margin:var(--spacing-sm);border:1px solid #333}\n"] }]
        }], ctorParameters: function () { return [{ type: NovoNavOutletElement }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], forElement: [{
                type: Input,
                args: ['for']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvdGFicy90YWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFVbkQsTUFBTSxPQUFPLGNBQWM7SUFSM0I7UUFVRSxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFRdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBVWYsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQzdDLGdGQUFnRjtRQUN4RSxtQkFBYyxHQUFrQixDQUFDLENBQUM7UUFDMUMsMEVBQTBFO1FBQ3ZELHdCQUFtQixHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO0tBa0UzRjtJQTlFQyxtQ0FBbUM7SUFDbkMsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFvQjtRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBT0QscUJBQXFCO1FBQ25CLHVGQUF1RjtRQUN2RixzRUFB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QixZQUFZLE1BQTRCO1FBUGpDLFNBQUksR0FBRyxVQUFVLENBQUM7UUFFekIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQU10QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBVztRQUNkLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLGFBQWE7U0FDZDtJQUNILENBQUM7O2tIQXZCVSxvQkFBb0Isa0JBU1gsb0JBQW9CO3NHQVQ3QixvQkFBb0IsOE9BRnJCLDJCQUEyQjs0RkFFMUIsb0JBQW9CO2tCQVRoQyxTQUFTOytCQUNFLGlCQUFpQixRQUVyQjt3QkFDSixnQkFBZ0IsRUFBRSxRQUFRO3dCQUMxQixTQUFTLEVBQUUsY0FBYztxQkFDMUIsWUFDUywyQkFBMkI7MERBV2pCLG9CQUFvQiwwQkFQakMsSUFBSTtzQkFEVixXQUFXO3VCQUFDLFdBQVc7Z0JBR3hCLE1BQU07c0JBREwsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7dUJBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlckxpbmsgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbmF2JyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFiLW5hdi5zY3NzJ10sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIucm9sZV0nOiAndGFibGlzdCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9OYXZFbGVtZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KClcbiAgb3V0bGV0OiBhbnk7XG4gIEBJbnB1dCgpXG4gIHJvdXRlcjogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbmRlbnNlZCcpXG4gIEBJbnB1dCgpXG4gIEBCb29sZWFuSW5wdXQoKVxuICBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBpdGVtczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWIuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZEluZGV4KCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICB9XG4gIHNldCBzZWxlY3RlZEluZGV4KHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5faW5kZXhUb1NlbGVjdCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCBudWxsKTtcbiAgfVxuICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgLyoqIFRoZSB0YWIgaW5kZXggdGhhdCBzaG91bGQgYmUgc2VsZWN0ZWQgYWZ0ZXIgdGhlIGNvbnRlbnQgaGFzIGJlZW4gY2hlY2tlZC4gKi9cbiAgcHJpdmF0ZSBfaW5kZXhUb1NlbGVjdDogbnVtYmVyIHwgbnVsbCA9IDA7XG4gIC8qKiBPdXRwdXQgdG8gZW5hYmxlIHN1cHBvcnQgZm9yIHR3by13YXkgYmluZGluZyBvbiBgWyhzZWxlY3RlZEluZGV4KV1gICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBEb24ndCBjbGFtcCB0aGUgYGluZGV4VG9TZWxlY3RgIGltbWVkaWF0ZWx5IGluIHRoZSBzZXR0ZXIgYmVjYXVzZSBpdCBjYW4gaGFwcGVuIHRoYXRcbiAgICAvLyB0aGUgYW1vdW50IG9mIHRhYnMgY2hhbmdlcyBiZWZvcmUgdGhlIGFjdHVhbCBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMuXG4gICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9ICh0aGlzLl9pbmRleFRvU2VsZWN0ID0gdGhpcy5fY2xhbXBUYWJJbmRleCh0aGlzLl9pbmRleFRvU2VsZWN0KSk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkSW5kZXggIT09IGluZGV4VG9TZWxlY3QpIHtcbiAgICAgIGNvbnN0IGlzRmlyc3RSdW4gPSB0aGlzLl9zZWxlY3RlZEluZGV4ID09IG51bGw7XG4gICAgICAvLyBDaGFuZ2luZyB0aGVzZSB2YWx1ZXMgYWZ0ZXIgY2hhbmdlIGRldGVjdGlvbiBoYXMgcnVuXG4gICAgICAvLyBzaW5jZSB0aGUgY2hlY2tlZCBjb250ZW50IG1heSBjb250YWluIHJlZmVyZW5jZXMgdG8gdGhlbS5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9kZWFjdGl2YXRlQWxsSXRlbXModGhpcy5pdGVtcyk7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlU2VsZWN0ZWRJdGVtKGluZGV4VG9TZWxlY3QpO1xuICAgICAgICB0aGlzLl9zaG93QWN0aXZlQ29udGVudChpbmRleFRvU2VsZWN0KTtcbiAgICAgICAgaWYgKCFpc0ZpcnN0UnVuKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXhUb1NlbGVjdDtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoaXRlbSkge1xuICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgLy8gRGVhY3RpdmF0ZSBhbGwgb3RoZXIgdGFic1xuICAgIHRoaXMuX2RlYWN0aXZhdGVBbGxJdGVtcyh0aGlzLml0ZW1zKTtcbiAgICB0aGlzLl9hY3RpdmF0ZVNlbGVjdGVkSXRlbShpbmRleFRvU2VsZWN0KTtcbiAgICB0aGlzLl9zaG93QWN0aXZlQ29udGVudChpbmRleFRvU2VsZWN0KTtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2UuZW1pdChpbmRleFRvU2VsZWN0KTtcbiAgfVxuXG4gIGFkZChpdGVtKSB7XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAvLyBpdGVtLnNlbGVjdGVkLm5leHQoKTtcbiAgICB9XG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWN0aXZhdGVTZWxlY3RlZEl0ZW0oaW5kZXhUb1NlbGVjdDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXhUb1NlbGVjdF07XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zaG93QWN0aXZlQ29udGVudChpbmRleFRvU2VsZWN0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5vdXRsZXQpIHtcbiAgICAgIHRoaXMub3V0bGV0LnNob3coaW5kZXhUb1NlbGVjdCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVhY3RpdmF0ZUFsbEl0ZW1zKGl0ZW1zOiBBcnJheTxhbnk+KSB7XG4gICAgaXRlbXMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgaWYgKHQuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgIC8vIHQuZGVzZWxlY3RlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgICB0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIENsYW1wcyB0aGUgZ2l2ZW4gaW5kZXggdG8gdGhlIGJvdW5kcyBvZiAwIGFuZCB0aGUgdGFicyBsZW5ndGguICovXG4gIHByaXZhdGUgX2NsYW1wVGFiSW5kZXgoaW5kZXg6IG51bWJlciB8IG51bGwpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1pbih0aGlzLml0ZW1zLmxlbmd0aCAtIDEsIE1hdGgubWF4KGluZGV4IHx8IDAsIDApKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYicsXG4gIHN0eWxlVXJsczogWycuL3RhYi1saW5rLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ3NlbGVjdCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ3RhYicsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjdGFibGluayBjbGFzcz1cIm5vdm8tdGFiLWxpbmtcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz1cImluZGljYXRvclwiPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICd0YWInO1xuXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIGFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIG9ubHlUZXh0ID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LW9ubHknKVxuICBnZXQgaGJfdGV4dE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMub25seVRleHQ7XG4gIH1cblxuICBAVmlld0NoaWxkKCd0YWJsaW5rJylcbiAgdGFibGluaztcblxuICBuYXY6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYXY6IE5vdm9OYXZFbGVtZW50LCBwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XG4gICAgY29uc3QgdGFibGluayA9IGVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5vdm8tdGFiLWxpbmsnKTtcbiAgICBpZiAodGFibGluaykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsaW5rLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRhYmxpbmsuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHRoaXMub25seVRleHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWItYnV0dG9uJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFiLWJ1dHRvbi5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdzZWxlY3QoKScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICB9LFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiQnV0dG9uRWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAndGFiJztcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbmF2OiBhbnk7XG5cbiAgY29uc3RydWN0b3IobmF2OiBOb3ZvTmF2RWxlbWVudCkge1xuICAgIHRoaXMubmF2ID0gbmF2O1xuICAgIHRoaXMubmF2LmFkZCh0aGlzKTtcbiAgfVxuXG4gIHNlbGVjdCgpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMubmF2LnNlbGVjdCh0aGlzKTtcbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWItbGluaycsXG4gIHN0eWxlVXJsczogWycuL3RhYi1saW5rLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ3NlbGVjdCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFiLWxpbmtcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz1cImluZGljYXRvclwiPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJMaW5rRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAndGFiJztcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNweTogc3RyaW5nO1xuXG4gIG5hdjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsaW5rPzogUm91dGVyTGluaykge1xuICAgIHRoaXMubmF2ID0gbmF2O1xuICAgIHRoaXMubmF2LmFkZCh0aGlzKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTGlua0FjdGl2ZSh0aGlzLmxpbmspKSB7XG4gICAgICB0aGlzLm5hdi5zZWxlY3QodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgICAgaWYgKHRoaXMuc3B5KSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5zcHl9YCk7XG4gICAgICAgIGVsPy5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTGlua0FjdGl2ZShsaW5rOiBSb3V0ZXJMaW5rKSB7XG4gICAgcmV0dXJuIGxpbmsgJiYgbGluay51cmxUcmVlID8gdGhpcy5yb3V0ZXIuaXNBY3RpdmUobGluay51cmxUcmVlLCBmYWxzZSkgOiBmYWxzZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdi1vdXRsZXQnLFxuICBzdHlsZVVybHM6IFsnLi90YWItb3V0bGV0LnNjc3MnXSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b05hdk91dGxldEVsZW1lbnQge1xuICBpdGVtczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIHNob3coaW5kZXgpIHtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XG5cbiAgICAvKipcbiAgICAgKiBEZWFjdGl2YXRlcyBvdGhlciB0YWIgaXRlbXNcbiAgICAgKiBAcGFyYW0gaXRlbXMgLSBkZWFjdGl2YXRlZCBpdGVtc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9kZWFjdGl2YXRlQWxsSXRlbXMoaXRlbXMpIHtcbiAgICAgIGl0ZW1zLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKHQuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gdC5kZXNlbGVjdGVkLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2RlYWN0aXZhdGVBbGxJdGVtcyh0aGlzLml0ZW1zKTtcbiAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBhZGQoaXRlbSkge1xuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1uYXYtY29udGVudCcsXG4gIHN0eWxlVXJsczogWycuL3RhYi1jb250ZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5yb2xlXSc6ICd0YWJwYW5lbCcsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gIH0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9OYXZDb250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG91dGxldDogTm92b05hdk91dGxldEVsZW1lbnQpIHtcbiAgICBvdXRsZXQuYWRkKHRoaXMpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbmF2LWhlYWRlcicsXG4gIHN0eWxlVXJsczogWycuL3RhYi1oZWFkZXIuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJyhjbGljayknOiAnc2hvdygkZXZlbnQpJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b05hdkhlYWRlckVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYnBhbmVsJztcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnZm9yJylcbiAgZm9yRWxlbWVudDogYW55O1xuICBvdXRsZXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihvdXRsZXQ6IE5vdm9OYXZPdXRsZXRFbGVtZW50KSB7XG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSB8fCBmYWxzZTtcbiAgICB0aGlzLm91dGxldCA9IG91dGxldDtcbiAgfVxuXG4gIHNob3coZXZlbnQ/OiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgSU5ERVggPSB0aGlzLm91dGxldC5pdGVtcy5pbmRleE9mKHRoaXMuZm9yRWxlbWVudCk7XG4gICAgICBpZiAoSU5ERVggPiAtMSkge1xuICAgICAgICB0aGlzLm91dGxldC5zaG93KElOREVYKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cbn1cbiJdfQ==