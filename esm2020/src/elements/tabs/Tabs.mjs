import { __decorate, __metadata } from "tslib";
// NG2
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, ViewChild, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BooleanInput } from '../../utils';
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
NovoNavElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavElement, selector: "novo-nav", inputs: { theme: "theme", direction: "direction", outlet: "outlet", router: "router", condensed: "condensed", selectedIndex: "selectedIndex" }, outputs: { selectedIndexChange: "selectedIndexChange" }, host: { properties: { "class.condensed": "this.condensed" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoNavElement.prototype, "condensed", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-nav',
                    template: '<ng-content></ng-content>',
                }]
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
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoTabElement.prototype, "disabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-tab',
                    host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                        '[attr.role]': 'tab',
                    },
                    template: `
    <div #tablink class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
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
NovoTabButtonElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTabButtonElement, selector: "novo-tab-button", inputs: { active: "active", disabled: "disabled" }, host: { listeners: { "click": "select()" }, properties: { "class.active": "active", "class.disabled": "disabled", "attr.role": "this.role" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabButtonElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-tab-button',
                    host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                    },
                    template: '<ng-content></ng-content>',
                }]
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
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabLinkElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-tab-link',
                    host: {
                        '(click)': 'select()',
                        '[class.active]': 'active',
                        '[class.disabled]': 'disabled',
                    },
                    template: `
    <div class="novo-tab-link">
      <ng-content></ng-content>
    </div>
    <span class="indicator"></span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
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
NovoNavOutletElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavOutletElement, selector: "novo-nav-outlet", ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavOutletElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-nav-outlet',
                    template: '<ng-content></ng-content>',
                }]
        }] });
export class NovoNavContentElement {
    constructor(outlet) {
        this.active = false;
        outlet.add(this);
    }
}
NovoNavContentElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavContentElement, deps: [{ token: NovoNavOutletElement }], target: i0.ɵɵFactoryTarget.Component });
NovoNavContentElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavContentElement, selector: "novo-nav-content", inputs: { active: "active" }, host: { properties: { "class.active": "active" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavContentElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-nav-content',
                    host: {
                        '[class.active]': 'active',
                    },
                    template: '<ng-content></ng-content>',
                }]
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
NovoNavHeaderElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoNavHeaderElement, selector: "novo-nav-header", inputs: { active: "active", forElement: ["for", "forElement"] }, host: { listeners: { "click": "show($event)" }, properties: { "class.active": "active", "attr.role": "this.role" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoNavHeaderElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-nav-header',
                    host: {
                        '[class.active]': 'active',
                        '(click)': 'show($event)',
                    },
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: NovoNavOutletElement }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], active: [{
                type: Input
            }], forElement: [{
                type: Input,
                args: ['for']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RhYnMvVGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLGNBQWM7SUFKM0I7UUFNRSxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFRdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBVWYsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQzdDLGdGQUFnRjtRQUN4RSxtQkFBYyxHQUFrQixDQUFDLENBQUM7UUFDMUMsMEVBQTBFO1FBQ3ZELHdCQUFtQixHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO0tBa0UzRjtJQTlFQyxtQ0FBbUM7SUFDbkMsSUFDSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFvQjtRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBT0QscUJBQXFCO1FBQ25CLHVGQUF1RjtRQUN2RixzRUFB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TUFBTTtzQkFETCxLQUFLO2dCQUdOLFVBQVU7c0JBRFQsS0FBSzt1QkFBQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGVyTGluayB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbmF2JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b05hdkVsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKVxuICBvdXRsZXQ6IGFueTtcbiAgQElucHV0KClcbiAgcm91dGVyOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29uZGVuc2VkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gIH1cbiAgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLl9pbmRleFRvU2VsZWN0ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIG51bGwpO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvKiogVGhlIHRhYiBpbmRleCB0aGF0IHNob3VsZCBiZSBzZWxlY3RlZCBhZnRlciB0aGUgY29udGVudCBoYXMgYmVlbiBjaGVja2VkLiAqL1xuICBwcml2YXRlIF9pbmRleFRvU2VsZWN0OiBudW1iZXIgfCBudWxsID0gMDtcbiAgLyoqIE91dHB1dCB0byBlbmFibGUgc3VwcG9ydCBmb3IgdHdvLXdheSBiaW5kaW5nIG9uIGBbKHNlbGVjdGVkSW5kZXgpXWAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIERvbid0IGNsYW1wIHRoZSBgaW5kZXhUb1NlbGVjdGAgaW1tZWRpYXRlbHkgaW4gdGhlIHNldHRlciBiZWNhdXNlIGl0IGNhbiBoYXBwZW4gdGhhdFxuICAgIC8vIHRoZSBhbW91bnQgb2YgdGFicyBjaGFuZ2VzIGJlZm9yZSB0aGUgYWN0dWFsIGNoYW5nZSBkZXRlY3Rpb24gcnVucy5cbiAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gKHRoaXMuX2luZGV4VG9TZWxlY3QgPSB0aGlzLl9jbGFtcFRhYkluZGV4KHRoaXMuX2luZGV4VG9TZWxlY3QpKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCkge1xuICAgICAgY29uc3QgaXNGaXJzdFJ1biA9IHRoaXMuX3NlbGVjdGVkSW5kZXggPT0gbnVsbDtcbiAgICAgIC8vIENoYW5naW5nIHRoZXNlIHZhbHVlcyBhZnRlciBjaGFuZ2UgZGV0ZWN0aW9uIGhhcyBydW5cbiAgICAgIC8vIHNpbmNlIHRoZSBjaGVja2VkIGNvbnRlbnQgbWF5IGNvbnRhaW4gcmVmZXJlbmNlcyB0byB0aGVtLlxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuX2RlYWN0aXZhdGVBbGxJdGVtcyh0aGlzLml0ZW1zKTtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVTZWxlY3RlZEl0ZW0oaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgIHRoaXMuX3Nob3dBY3RpdmVDb250ZW50KGluZGV4VG9TZWxlY3QpO1xuICAgICAgICBpZiAoIWlzRmlyc3RSdW4pIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhDaGFuZ2UuZW1pdChpbmRleFRvU2VsZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleFRvU2VsZWN0O1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdChpdGVtKSB7XG4gICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBvdGhlciB0YWJzXG4gICAgdGhpcy5fZGVhY3RpdmF0ZUFsbEl0ZW1zKHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuX2FjdGl2YXRlU2VsZWN0ZWRJdGVtKGluZGV4VG9TZWxlY3QpO1xuICAgIHRoaXMuX3Nob3dBY3RpdmVDb250ZW50KGluZGV4VG9TZWxlY3QpO1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KGluZGV4VG9TZWxlY3QpO1xuICB9XG5cbiAgYWRkKGl0ZW0pIHtcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgIC8vIGl0ZW0uc2VsZWN0ZWQubmV4dCgpO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmF0ZVNlbGVjdGVkSXRlbShpbmRleFRvU2VsZWN0OiBudW1iZXIpIHtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpbmRleFRvU2VsZWN0XTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dBY3RpdmVDb250ZW50KGluZGV4VG9TZWxlY3Q6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm91dGxldCkge1xuICAgICAgdGhpcy5vdXRsZXQuc2hvdyhpbmRleFRvU2VsZWN0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZWFjdGl2YXRlQWxsSXRlbXMoaXRlbXM6IEFycmF5PGFueT4pIHtcbiAgICBpdGVtcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICBpZiAodC5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgLy8gdC5kZXNlbGVjdGVkLm5leHQoKTtcbiAgICAgIH1cbiAgICAgIHQuYWN0aXZlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQ2xhbXBzIHRoZSBnaXZlbiBpbmRleCB0byB0aGUgYm91bmRzIG9mIDAgYW5kIHRoZSB0YWJzIGxlbmd0aC4gKi9cbiAgcHJpdmF0ZSBfY2xhbXBUYWJJbmRleChpbmRleDogbnVtYmVyIHwgbnVsbCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWluKHRoaXMuaXRlbXMubGVuZ3RoIC0gMSwgTWF0aC5tYXgoaW5kZXggfHwgMCwgMCkpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFiJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ3NlbGVjdCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ3RhYicsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjdGFibGluayBjbGFzcz1cIm5vdm8tdGFiLWxpbmtcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz1cImluZGljYXRvclwiPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICd0YWInO1xuXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIGFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIG9ubHlUZXh0ID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50ZXh0LW9ubHknKVxuICBnZXQgaGJfdGV4dE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMub25seVRleHQ7XG4gIH1cblxuICBAVmlld0NoaWxkKCd0YWJsaW5rJylcbiAgdGFibGluaztcblxuICBuYXY6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYXY6IE5vdm9OYXZFbGVtZW50LCBwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XG4gICAgY29uc3QgdGFibGluayA9IGVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5vdm8tdGFiLWxpbmsnKTtcbiAgICBpZiAodGFibGluaykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsaW5rLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRhYmxpbmsuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHRoaXMub25seVRleHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWItYnV0dG9uJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ3NlbGVjdCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJCdXR0b25FbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICd0YWInO1xuICBASW5wdXQoKVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBuYXY6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYXY6IE5vdm9OYXZFbGVtZW50KSB7XG4gICAgdGhpcy5uYXYgPSBuYXY7XG4gICAgdGhpcy5uYXYuYWRkKHRoaXMpO1xuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYi1saW5rJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ3NlbGVjdCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFiLWxpbmtcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz1cImluZGljYXRvclwiPjwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9UYWJMaW5rRWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAndGFiJztcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNweTogc3RyaW5nO1xuXG4gIG5hdjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsaW5rPzogUm91dGVyTGluaykge1xuICAgIHRoaXMubmF2ID0gbmF2O1xuICAgIHRoaXMubmF2LmFkZCh0aGlzKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTGlua0FjdGl2ZSh0aGlzLmxpbmspKSB7XG4gICAgICB0aGlzLm5hdi5zZWxlY3QodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgICAgaWYgKHRoaXMuc3B5KSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5zcHl9YCk7XG4gICAgICAgIGVsPy5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzTGlua0FjdGl2ZShsaW5rOiBSb3V0ZXJMaW5rKSB7XG4gICAgcmV0dXJuIGxpbmsgJiYgbGluay51cmxUcmVlID8gdGhpcy5yb3V0ZXIuaXNBY3RpdmUobGluay51cmxUcmVlLCBmYWxzZSkgOiBmYWxzZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdi1vdXRsZXQnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2T3V0bGV0RWxlbWVudCB7XG4gIGl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG5cbiAgc2hvdyhpbmRleCkge1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcblxuICAgIC8qKlxuICAgICAqIERlYWN0aXZhdGVzIG90aGVyIHRhYiBpdGVtc1xuICAgICAqIEBwYXJhbSBpdGVtcyAtIGRlYWN0aXZhdGVkIGl0ZW1zXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2RlYWN0aXZhdGVBbGxJdGVtcyhpdGVtcykge1xuICAgICAgaXRlbXMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICBpZiAodC5hY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyB0LmRlc2VsZWN0ZWQubmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIHQuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfZGVhY3RpdmF0ZUFsbEl0ZW1zKHRoaXMuaXRlbXMpO1xuICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIGFkZChpdGVtKSB7XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdi1jb250ZW50JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICB9LFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2Q29udGVudEVsZW1lbnQge1xuICBASW5wdXQoKVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvdXRsZXQ6IE5vdm9OYXZPdXRsZXRFbGVtZW50KSB7XG4gICAgb3V0bGV0LmFkZCh0aGlzKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdi1oZWFkZXInLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gICAgJyhjbGljayknOiAnc2hvdygkZXZlbnQpJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b05hdkhlYWRlckVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYnBhbmVsJztcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnZm9yJylcbiAgZm9yRWxlbWVudDogYW55O1xuICBvdXRsZXQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihvdXRsZXQ6IE5vdm9OYXZPdXRsZXRFbGVtZW50KSB7XG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSB8fCBmYWxzZTtcbiAgICB0aGlzLm91dGxldCA9IG91dGxldDtcbiAgfVxuXG4gIHNob3coZXZlbnQ/OiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgSU5ERVggPSB0aGlzLm91dGxldC5pdGVtcy5pbmRleE9mKHRoaXMuZm9yRWxlbWVudCk7XG4gICAgICBpZiAoSU5ERVggPiAtMSkge1xuICAgICAgICB0aGlzLm91dGxldC5zaG93KElOREVYKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG4gIH1cbn1cbiJdfQ==