// NG2
import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';
export class NovoNavElement {
    constructor() {
        this.theme = '';
        this.direction = '';
        this.condensed = false;
        this.items = [];
    }
    select(item) {
        /**
         * Deactivate all other tabs
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
        if (this.outlet) {
            this.outlet.show(this.items.indexOf(item));
        }
        // TODO - remove hack to make DOM rerender - jgodi
        const element = document.querySelector('novo-tab-link.active span.indicator');
        if (element) {
            element.style.opacity = 0.99;
            setTimeout(() => {
                element.style.opacity = 1;
            }, 10);
        }
    }
    add(item) {
        if (this.items.length === 0) {
            item.active = true;
            // item.selected.next();
        }
        this.items.push(item);
    }
}
NovoNavElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-nav',
                template: '<ng-content></ng-content>'
            },] }
];
NovoNavElement.propDecorators = {
    theme: [{ type: Input }],
    direction: [{ type: Input }],
    outlet: [{ type: Input }],
    router: [{ type: Input }],
    condensed: [{ type: HostBinding, args: ['class.condensed',] }, { type: Input }]
};
export class NovoTabElement {
    constructor(nav) {
        this.active = false;
        this.disabled = false;
        this.activeChange = new EventEmitter();
        this.nav = nav;
        this.nav.add(this);
    }
    select() {
        if (!this.disabled) {
            this.activeChange.emit(true);
            this.nav.select(this);
        }
    }
}
NovoTabElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-tab',
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
   `
            },] }
];
NovoTabElement.ctorParameters = () => [
    { type: NovoNavElement }
];
NovoTabElement.propDecorators = {
    active: [{ type: Input }],
    disabled: [{ type: Input }],
    activeChange: [{ type: Output }]
};
export class NovoTabButtonElement {
    constructor(nav) {
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
NovoTabButtonElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-tab-button',
                host: {
                    '(click)': 'select()',
                    '[class.active]': 'active',
                    '[class.disabled]': 'disabled',
                },
                template: '<ng-content></ng-content>'
            },] }
];
NovoTabButtonElement.ctorParameters = () => [
    { type: NovoNavElement }
];
NovoTabButtonElement.propDecorators = {
    active: [{ type: Input }],
    disabled: [{ type: Input }]
};
export class NovoTabLinkElement {
    constructor(nav) {
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
NovoTabLinkElement.decorators = [
    { type: Component, args: [{
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
    `
            },] }
];
NovoTabLinkElement.ctorParameters = () => [
    { type: NovoNavElement }
];
NovoTabLinkElement.propDecorators = {
    active: [{ type: Input }],
    disabled: [{ type: Input }]
};
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
NovoNavOutletElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-nav-outlet',
                template: '<ng-content></ng-content>'
            },] }
];
export class NovoNavContentElement {
    constructor(outlet) {
        this.active = false;
        outlet.add(this);
    }
}
NovoNavContentElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-nav-content',
                host: {
                    '[class.active]': 'active',
                },
                template: '<ng-content></ng-content>'
            },] }
];
NovoNavContentElement.ctorParameters = () => [
    { type: NovoNavOutletElement }
];
NovoNavContentElement.propDecorators = {
    active: [{ type: Input }]
};
export class NovoNavHeaderElement {
    constructor(outlet) {
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
NovoNavHeaderElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-nav-header',
                host: {
                    '[class.active]': 'active',
                    '(click)': 'show($event)',
                },
                template: '<ng-content></ng-content>'
            },] }
];
NovoNavHeaderElement.ctorParameters = () => [
    { type: NovoNavOutletElement }
];
NovoNavHeaderElement.propDecorators = {
    active: [{ type: Input }],
    forElement: [{ type: Input, args: ['for',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGFicy9UYWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1wRixNQUFNLE9BQU8sY0FBYztJQUozQjtRQU1FLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQU92QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLFVBQUssR0FBZSxFQUFFLENBQUM7SUFzQ3pCLENBQUM7SUFwQ0MsTUFBTSxDQUFDLElBQUk7UUFDVDs7V0FFRztRQUNILFNBQVMsbUJBQW1CLENBQUMsS0FBSztZQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFFRCxrREFBa0Q7UUFDbEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQ0FBcUMsQ0FBUSxDQUFD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UyxFQUFFLGNBQWM7aUJBQzFCO2dCQUNELFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7OztZQVFxQixvQkFBb0I7OztxQkFOdkMsS0FBSzt5QkFFTCxLQUFLLFNBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1uYXYnLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2RWxlbWVudCB7XHJcbiAgQElucHV0KClcclxuICB0aGVtZTogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KClcclxuICBkaXJlY3Rpb246IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpXHJcbiAgb3V0bGV0OiBhbnk7XHJcbiAgQElucHV0KClcclxuICByb3V0ZXI6IHN0cmluZztcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbmRlbnNlZCcpXHJcbiAgQElucHV0KClcclxuICBjb25kZW5zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgaXRlbXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgc2VsZWN0KGl0ZW0pIHtcclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZSBhbGwgb3RoZXIgdGFic1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfZGVhY3RpdmF0ZUFsbEl0ZW1zKGl0ZW1zKSB7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goKHQpID0+IHtcclxuICAgICAgICBpZiAodC5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgIC8vIHQuZGVzZWxlY3RlZC5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZWFjdGl2YXRlQWxsSXRlbXModGhpcy5pdGVtcyk7XHJcbiAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5vdXRsZXQpIHtcclxuICAgICAgdGhpcy5vdXRsZXQuc2hvdyh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE8gLSByZW1vdmUgaGFjayB0byBtYWtlIERPTSByZXJlbmRlciAtIGpnb2RpXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignbm92by10YWItbGluay5hY3RpdmUgc3Bhbi5pbmRpY2F0b3InKSBhcyBhbnk7XHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwLjk5O1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICB9LCAxMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGQoaXRlbSkge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgLy8gaXRlbS5zZWxlY3RlZC5uZXh0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25vdm8tdGFiJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGNsaWNrKSc6ICdzZWxlY3QoKScsXHJcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcclxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vdm8tdGFiLWxpbmtcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW5kaWNhdG9yXCI+PC9zcGFuPlxyXG4gICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1RhYkVsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KClcclxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKVxyXG4gIGFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBuYXY6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IobmF2OiBOb3ZvTmF2RWxlbWVudCkge1xyXG4gICAgdGhpcy5uYXYgPSBuYXY7XHJcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5hY3RpdmVDaGFuZ2UuZW1pdCh0cnVlKTtcclxuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYi1idXR0b24nLFxyXG4gIGhvc3Q6IHtcclxuICAgICcoY2xpY2spJzogJ3NlbGVjdCgpJyxcclxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxyXG4gICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gIH0sXHJcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9UYWJCdXR0b25FbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgbmF2OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQpIHtcclxuICAgIHRoaXMubmF2ID0gbmF2O1xyXG4gICAgdGhpcy5uYXYuYWRkKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMubmF2LnNlbGVjdCh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by10YWItbGluaycsXHJcbiAgaG9zdDoge1xyXG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxyXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXHJcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJub3ZvLXRhYi1saW5rXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImluZGljYXRvclwiPjwvc3Bhbj5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiTGlua0VsZW1lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KClcclxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBuYXY6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IobmF2OiBOb3ZvTmF2RWxlbWVudCkge1xyXG4gICAgdGhpcy5uYXYgPSBuYXY7XHJcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdi1vdXRsZXQnLFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2T3V0bGV0RWxlbWVudCB7XHJcbiAgaXRlbXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgc2hvdyhpbmRleCkge1xyXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXhdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVhY3RpdmF0ZXMgb3RoZXIgdGFiIGl0ZW1zXHJcbiAgICAgKiBAcGFyYW0gaXRlbXMgLSBkZWFjdGl2YXRlZCBpdGVtc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfZGVhY3RpdmF0ZUFsbEl0ZW1zKGl0ZW1zKSB7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goKHQpID0+IHtcclxuICAgICAgICBpZiAodC5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgIC8vIHQuZGVzZWxlY3RlZC5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9kZWFjdGl2YXRlQWxsSXRlbXModGhpcy5pdGVtcyk7XHJcbiAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBhZGQoaXRlbSkge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1uYXYtY29udGVudCcsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2FjdGl2ZScsXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b05hdkNvbnRlbnRFbGVtZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvdXRsZXQ6IE5vdm9OYXZPdXRsZXRFbGVtZW50KSB7XHJcbiAgICBvdXRsZXQuYWRkKHRoaXMpO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdi1oZWFkZXInLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxyXG4gICAgJyhjbGljayknOiAnc2hvdygkZXZlbnQpJyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvTmF2SGVhZGVyRWxlbWVudCB7XHJcbiAgQElucHV0KClcclxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoJ2ZvcicpXHJcbiAgZm9yRWxlbWVudDogYW55O1xyXG4gIG91dGxldDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihvdXRsZXQ6IE5vdm9OYXZPdXRsZXRFbGVtZW50KSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlIHx8IGZhbHNlO1xyXG4gICAgdGhpcy5vdXRsZXQgPSBvdXRsZXQ7XHJcbiAgfVxyXG5cclxuICBzaG93KGV2ZW50PzogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBJTkRFWCA9IHRoaXMub3V0bGV0Lml0ZW1zLmluZGV4T2YodGhpcy5mb3JFbGVtZW50KTtcclxuICAgICAgaWYgKElOREVYID4gLTEpIHtcclxuICAgICAgICB0aGlzLm91dGxldC5zaG93KElOREVYKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19