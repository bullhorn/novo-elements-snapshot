import { coerceNumberProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, HostBinding, Output, ChangeDetectionStrategy, ViewChild, Optional, NgModule } from '@angular/core';
import * as i1 from '@angular/router';
import { BooleanInput } from 'novo-elements/utils';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoNavElement {
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
class NovoTabElement {
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
class NovoTabButtonElement {
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
class NovoTabLinkElement {
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
class NovoNavOutletElement {
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
class NovoNavContentElement {
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
class NovoNavHeaderElement {
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

// NG2
class NovoTabModule {
}
NovoTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabModule, declarations: [NovoNavElement,
        NovoTabElement,
        NovoTabButtonElement,
        NovoTabLinkElement,
        NovoNavOutletElement,
        NovoNavContentElement,
        NovoNavHeaderElement], imports: [CommonModule], exports: [NovoNavElement,
        NovoTabElement,
        NovoTabButtonElement,
        NovoTabLinkElement,
        NovoNavOutletElement,
        NovoNavContentElement,
        NovoNavHeaderElement] });
NovoTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        NovoNavElement,
                        NovoTabElement,
                        NovoTabButtonElement,
                        NovoTabLinkElement,
                        NovoNavOutletElement,
                        NovoNavContentElement,
                        NovoNavHeaderElement,
                    ],
                    exports: [
                        NovoNavElement,
                        NovoTabElement,
                        NovoTabButtonElement,
                        NovoTabLinkElement,
                        NovoNavOutletElement,
                        NovoNavContentElement,
                        NovoNavHeaderElement,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoNavContentElement, NovoNavElement, NovoNavHeaderElement, NovoNavOutletElement, NovoTabButtonElement, NovoTabElement, NovoTabLinkElement, NovoTabModule };
//# sourceMappingURL=novo-elements-components-tabs.mjs.map
