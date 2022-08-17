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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RhYnMvVGFicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQU0zQyxNQUFNLE9BQU8sY0FBYztJQUozQjtRQU1FLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQVF2QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFVZixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDN0MsZ0ZBQWdGO1FBQ3hFLG1CQUFjLEdBQWtCLENBQUMsQ0FBQztRQUMxQywwRUFBMEU7UUFDdkQsd0JBQW1CLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7S0FrRTNGO0lBOUVDLG1DQUFtQztJQUNuQyxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksYUFBYSxDQUFDLEtBQW9CO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFPRCxxQkFBcUI7UUFDbkIsdUZBQXVGO1FB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O2dCQUd4QixNQUFNO3NCQURMLEtBQUs7Z0JBR04sVUFBVTtzQkFEVCxLQUFLO3VCQUFDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJMaW5rIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1uYXYnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2RWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBASW5wdXQoKVxuICB0aGVtZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIG91dGxldDogYW55O1xuICBASW5wdXQoKVxuICByb3V0ZXI6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb25kZW5zZWQnKVxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgY29uZGVuc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgaXRlbXM6IEFycmF5PGFueT4gPSBbXTtcblxuICAvKiogVGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgdGFiLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWRJbmRleCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgfVxuICBzZXQgc2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX2luZGV4VG9TZWxlY3QgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgbnVsbCk7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIC8qKiBUaGUgdGFiIGluZGV4IHRoYXQgc2hvdWxkIGJlIHNlbGVjdGVkIGFmdGVyIHRoZSBjb250ZW50IGhhcyBiZWVuIGNoZWNrZWQuICovXG4gIHByaXZhdGUgX2luZGV4VG9TZWxlY3Q6IG51bWJlciB8IG51bGwgPSAwO1xuICAvKiogT3V0cHV0IHRvIGVuYWJsZSBzdXBwb3J0IGZvciB0d28td2F5IGJpbmRpbmcgb24gYFsoc2VsZWN0ZWRJbmRleCldYCAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gRG9uJ3QgY2xhbXAgdGhlIGBpbmRleFRvU2VsZWN0YCBpbW1lZGlhdGVseSBpbiB0aGUgc2V0dGVyIGJlY2F1c2UgaXQgY2FuIGhhcHBlbiB0aGF0XG4gICAgLy8gdGhlIGFtb3VudCBvZiB0YWJzIGNoYW5nZXMgYmVmb3JlIHRoZSBhY3R1YWwgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICAgIGNvbnN0IGluZGV4VG9TZWxlY3QgPSAodGhpcy5faW5kZXhUb1NlbGVjdCA9IHRoaXMuX2NsYW1wVGFiSW5kZXgodGhpcy5faW5kZXhUb1NlbGVjdCkpO1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBpbmRleFRvU2VsZWN0KSB7XG4gICAgICBjb25zdCBpc0ZpcnN0UnVuID0gdGhpcy5fc2VsZWN0ZWRJbmRleCA9PSBudWxsO1xuICAgICAgLy8gQ2hhbmdpbmcgdGhlc2UgdmFsdWVzIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgLy8gc2luY2UgdGhlIGNoZWNrZWQgY29udGVudCBtYXkgY29udGFpbiByZWZlcmVuY2VzIHRvIHRoZW0uXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZUFsbEl0ZW1zKHRoaXMuaXRlbXMpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZVNlbGVjdGVkSXRlbShpbmRleFRvU2VsZWN0KTtcbiAgICAgICAgdGhpcy5fc2hvd0FjdGl2ZUNvbnRlbnQoaW5kZXhUb1NlbGVjdCk7XG4gICAgICAgIGlmICghaXNGaXJzdFJ1bikge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KGluZGV4VG9TZWxlY3QpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4VG9TZWxlY3Q7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgIC8vIERlYWN0aXZhdGUgYWxsIG90aGVyIHRhYnNcbiAgICB0aGlzLl9kZWFjdGl2YXRlQWxsSXRlbXModGhpcy5pdGVtcyk7XG4gICAgdGhpcy5fYWN0aXZhdGVTZWxlY3RlZEl0ZW0oaW5kZXhUb1NlbGVjdCk7XG4gICAgdGhpcy5fc2hvd0FjdGl2ZUNvbnRlbnQoaW5kZXhUb1NlbGVjdCk7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4Q2hhbmdlLmVtaXQoaW5kZXhUb1NlbGVjdCk7XG4gIH1cblxuICBhZGQoaXRlbSkge1xuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgLy8gaXRlbS5zZWxlY3RlZC5uZXh0KCk7XG4gICAgfVxuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2YXRlU2VsZWN0ZWRJdGVtKGluZGV4VG9TZWxlY3Q6IG51bWJlcikge1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4VG9TZWxlY3RdO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0FjdGl2ZUNvbnRlbnQoaW5kZXhUb1NlbGVjdDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMub3V0bGV0KSB7XG4gICAgICB0aGlzLm91dGxldC5zaG93KGluZGV4VG9TZWxlY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RlYWN0aXZhdGVBbGxJdGVtcyhpdGVtczogQXJyYXk8YW55Pikge1xuICAgIGl0ZW1zLmZvckVhY2goKHQpID0+IHtcbiAgICAgIGlmICh0LmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyB0LmRlc2VsZWN0ZWQubmV4dCgpO1xuICAgICAgfVxuICAgICAgdC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDbGFtcHMgdGhlIGdpdmVuIGluZGV4IHRvIHRoZSBib3VuZHMgb2YgMCBhbmQgdGhlIHRhYnMgbGVuZ3RoLiAqL1xuICBwcml2YXRlIF9jbGFtcFRhYkluZGV4KGluZGV4OiBudW1iZXIgfCBudWxsKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5pdGVtcy5sZW5ndGggLSAxLCBNYXRoLm1heChpbmRleCB8fCAwLCAwKSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWInLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIucm9sZV0nOiAndGFiJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICN0YWJsaW5rIGNsYXNzPVwibm92by10YWItbGlua1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiaW5kaWNhdG9yXCI+PC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYkVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYic7XG5cbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgYWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgb25seVRleHQgPSB0cnVlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtb25seScpXG4gIGdldCBoYl90ZXh0T25seSgpIHtcbiAgICByZXR1cm4gdGhpcy5vbmx5VGV4dDtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxpbmsnKVxuICB0YWJsaW5rO1xuXG4gIG5hdjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubmF2ID0gbmF2O1xuICAgIHRoaXMubmF2LmFkZCh0aGlzKTtcbiAgICBjb25zdCB0YWJsaW5rID0gZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubm92by10YWItbGluaycpO1xuICAgIGlmICh0YWJsaW5rKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxpbmsuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGFibGluay5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkgdGhpcy5vbmx5VGV4dCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdCgpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICB0aGlzLm5hdi5zZWxlY3QodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYi1idXR0b24nLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYkJ1dHRvbkVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYic7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5hdjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQpIHtcbiAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm5hdi5zZWxlY3QodGhpcyk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFiLWxpbmsnLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by10YWItbGlua1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiaW5kaWNhdG9yXCI+PC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYkxpbmtFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICd0YWInO1xuICBASW5wdXQoKVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KClcbiAgc3B5OiBzdHJpbmc7XG5cbiAgbmF2OiBhbnk7XG5cbiAgY29uc3RydWN0b3IobmF2OiBOb3ZvTmF2RWxlbWVudCwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIGxpbms/OiBSb3V0ZXJMaW5rKSB7XG4gICAgdGhpcy5uYXYgPSBuYXY7XG4gICAgdGhpcy5uYXYuYWRkKHRoaXMpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNMaW5rQWN0aXZlKHRoaXMubGluaykpIHtcbiAgICAgIHRoaXMubmF2LnNlbGVjdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm5hdi5zZWxlY3QodGhpcyk7XG4gICAgICBpZiAodGhpcy5zcHkpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLnNweX1gKTtcbiAgICAgICAgZWw/LnNjcm9sbEludG9WaWV3KHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNMaW5rQWN0aXZlKGxpbms6IFJvdXRlckxpbmspIHtcbiAgICByZXR1cm4gbGluayAmJiBsaW5rLnVybFRyZWUgPyB0aGlzLnJvdXRlci5pc0FjdGl2ZShsaW5rLnVybFRyZWUsIGZhbHNlKSA6IGZhbHNlO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbmF2LW91dGxldCcsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9OYXZPdXRsZXRFbGVtZW50IHtcbiAgaXRlbXM6IEFycmF5PGFueT4gPSBbXTtcblxuICBzaG93KGluZGV4KSB7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXhdO1xuXG4gICAgLyoqXG4gICAgICogRGVhY3RpdmF0ZXMgb3RoZXIgdGFiIGl0ZW1zXG4gICAgICogQHBhcmFtIGl0ZW1zIC0gZGVhY3RpdmF0ZWQgaXRlbXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZGVhY3RpdmF0ZUFsbEl0ZW1zKGl0ZW1zKSB7XG4gICAgICBpdGVtcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgIGlmICh0LmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIHQuZGVzZWxlY3RlZC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9kZWFjdGl2YXRlQWxsSXRlbXModGhpcy5pdGVtcyk7XG4gICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgYWRkKGl0ZW0pIHtcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbmF2LWNvbnRlbnQnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXG4gIH0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9OYXZDb250ZW50RWxlbWVudCB7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG91dGxldDogTm92b05hdk91dGxldEVsZW1lbnQpIHtcbiAgICBvdXRsZXQuYWRkKHRoaXMpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tbmF2LWhlYWRlcicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnKGNsaWNrKSc6ICdzaG93KCRldmVudCknLFxuICB9LFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2SGVhZGVyRWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcHVibGljIHJvbGUgPSAndGFicGFuZWwnO1xuICBASW5wdXQoKVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdmb3InKVxuICBmb3JFbGVtZW50OiBhbnk7XG4gIG91dGxldDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG91dGxldDogTm92b05hdk91dGxldEVsZW1lbnQpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlIHx8IGZhbHNlO1xuICAgIHRoaXMub3V0bGV0ID0gb3V0bGV0O1xuICB9XG5cbiAgc2hvdyhldmVudD86IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBJTkRFWCA9IHRoaXMub3V0bGV0Lml0ZW1zLmluZGV4T2YodGhpcy5mb3JFbGVtZW50KTtcbiAgICAgIGlmIChJTkRFWCA+IC0xKSB7XG4gICAgICAgIHRoaXMub3V0bGV0LnNob3coSU5ERVgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgfVxufVxuIl19