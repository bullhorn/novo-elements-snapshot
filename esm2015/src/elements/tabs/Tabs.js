import { __decorate, __metadata } from "tslib";
// NG2
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { BooleanInput } from '../../utils';
export class NovoNavElement {
    constructor() {
        this.theme = '';
        this.direction = '';
        this.condensed = false;
        this.items = [];
        this._selectedIndex = null;
    }
    /** The index of the active tab. */
    get selectedIndex() {
        return this._selectedIndex;
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
    condensed: [{ type: HostBinding, args: ['class.condensed',] }, { type: Input }],
    selectedIndex: [{ type: Input }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoNavElement.prototype, "condensed", void 0);
export class NovoTabElement {
    constructor(nav) {
        this.role = 'tab';
        this.active = false;
        this.disabled = false;
        this.activeChange = new EventEmitter();
        this.onlyText = true;
        this.nav = nav;
        this.nav.add(this);
    }
    get hb_textOnly() {
        return this.onlyText;
    }
    ngAfterViewInit() {
        const nodes = this.tablink.nativeElement.childNodes;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType !== Node.TEXT_NODE)
                this.onlyText = false;
        }
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
                    '[attr.role]': 'tab',
                },
                template: `
    <div #tablink class="novo-tab-link">
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
    role: [{ type: HostBinding, args: ['attr.role',] }],
    active: [{ type: Input }],
    color: [{ type: Input }],
    disabled: [{ type: Input }],
    activeChange: [{ type: Output }],
    hb_textOnly: [{ type: HostBinding, args: ['class.text-only',] }],
    tablink: [{ type: ViewChild, args: ['tablink',] }]
};
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoTabElement.prototype, "disabled", void 0);
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
    role: [{ type: HostBinding, args: ['attr.role',] }],
    active: [{ type: Input }],
    disabled: [{ type: Input }]
};
export class NovoTabLinkElement {
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
            if (this.spy) {
                const el = document.querySelector(`#${this.spy}`);
                el === null || el === void 0 ? void 0 : el.scrollIntoView(true);
            }
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
    role: [{ type: HostBinding, args: ['attr.role',] }],
    active: [{ type: Input }],
    disabled: [{ type: Input }],
    spy: [{ type: Input }]
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
    role: [{ type: HostBinding, args: ['attr.role',] }],
    active: [{ type: Input }],
    forElement: [{ type: Input, args: ['for',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy90YWJzL1RhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU07QUFDTixPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFNM0MsTUFBTSxPQUFPLGNBQWM7SUFKM0I7UUFNRSxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5CLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFRdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBUWYsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO0lBc0MvQyxDQUFDO0lBNUNDLG1DQUFtQztJQUNuQyxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUlELE1BQU0sQ0FBQyxJQUFJO1FBQ1Q7O1dBRUc7UUFDSCxTQUFTLG1CQUFtQixDQUFDLEtBQUs7WUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUNyQix1QkFBdUI7aUJBQ3hCO2dCQUNELENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEVB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QWE7U0FDZDtJQUNILENBQUM7OztZQS9CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsSUFBSSxFQUFFO29CQUNKLGdCQUFnQixFQUFFLFFBQVE7b0JBQzFCLFNBQVMsRUFBRSxjQUFjO2lCQUMxQjtnQkFDRCxRQUFRLEVBQUUsMkJBQTJCO2FBQ3RDOzs7WUFVcUIsb0JBQW9COzs7bUJBUnZDLFdBQVcsU0FBQyxXQUFXO3FCQUV2QixLQUFLO3lCQUVMLEtBQUssU0FBQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5hdicsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9OYXZFbGVtZW50IHtcbiAgQElucHV0KClcbiAgdGhlbWU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKVxuICBvdXRsZXQ6IGFueTtcbiAgQElucHV0KClcbiAgcm91dGVyOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29uZGVuc2VkJylcbiAgQElucHV0KClcbiAgQEJvb2xlYW5JbnB1dCgpXG4gIGNvbmRlbnNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG5cbiAgLyoqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHRhYi4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZEluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBzZWxlY3QoaXRlbSkge1xuICAgIC8qKlxuICAgICAqIERlYWN0aXZhdGUgYWxsIG90aGVyIHRhYnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZGVhY3RpdmF0ZUFsbEl0ZW1zKGl0ZW1zKSB7XG4gICAgICBpdGVtcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgIGlmICh0LmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIHQuZGVzZWxlY3RlZC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF9kZWFjdGl2YXRlQWxsSXRlbXModGhpcy5pdGVtcyk7XG4gICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgIGlmICh0aGlzLm91dGxldCkge1xuICAgICAgdGhpcy5vdXRsZXQuc2hvdyh0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSkpO1xuICAgIH1cblxuICAgIC8vIFRPRE8gLSByZW1vdmUgaGFjayB0byBtYWtlIERPTSByZXJlbmRlciAtIGpnb2RpXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25vdm8tdGFiLWxpbmsuYWN0aXZlIHNwYW4uaW5kaWNhdG9yJykgYXMgYW55O1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwLjk5O1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkKGl0ZW0pIHtcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgIC8vIGl0ZW0uc2VsZWN0ZWQubmV4dCgpO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10YWInLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIucm9sZV0nOiAndGFiJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICN0YWJsaW5rIGNsYXNzPVwibm92by10YWItbGlua1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiaW5kaWNhdG9yXCI+PC9zcGFuPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYic7XG5cbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBAQm9vbGVhbklucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgYWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgb25seVRleHQgPSB0cnVlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRleHQtb25seScpXG4gIGdldCBoYl90ZXh0T25seSgpIHtcbiAgICByZXR1cm4gdGhpcy5vbmx5VGV4dDtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3RhYmxpbmsnKVxuICB0YWJsaW5rO1xuXG4gIG5hdjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQpIHtcbiAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnRhYmxpbmsubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChub2Rlc1tpXS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHRoaXMub25seVRleHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRhYi1idXR0b24nLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYkJ1dHRvbkVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYic7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG5hdjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdjogTm92b05hdkVsZW1lbnQpIHtcbiAgICB0aGlzLm5hdiA9IG5hdjtcbiAgICB0aGlzLm5hdi5hZGQodGhpcyk7XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm5hdi5zZWxlY3QodGhpcyk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tdGFiLWxpbmsnLFxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnc2VsZWN0KCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibm92by10YWItbGlua1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPVwiaW5kaWNhdG9yXCI+PC9zcGFuPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiTGlua0VsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIHB1YmxpYyByb2xlID0gJ3RhYic7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzcHk6IHN0cmluZztcblxuICBuYXY6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYXY6IE5vdm9OYXZFbGVtZW50KSB7XG4gICAgdGhpcy5uYXYgPSBuYXY7XG4gICAgdGhpcy5uYXYuYWRkKHRoaXMpO1xuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5uYXYuc2VsZWN0KHRoaXMpO1xuICAgICAgaWYgKHRoaXMuc3B5KSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5zcHl9YCk7XG4gICAgICAgIGVsPy5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1uYXYtb3V0bGV0JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b05hdk91dGxldEVsZW1lbnQge1xuICBpdGVtczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIHNob3coaW5kZXgpIHtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XG5cbiAgICAvKipcbiAgICAgKiBEZWFjdGl2YXRlcyBvdGhlciB0YWIgaXRlbXNcbiAgICAgKiBAcGFyYW0gaXRlbXMgLSBkZWFjdGl2YXRlZCBpdGVtc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9kZWFjdGl2YXRlQWxsSXRlbXMoaXRlbXMpIHtcbiAgICAgIGl0ZW1zLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKHQuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gdC5kZXNlbGVjdGVkLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2RlYWN0aXZhdGVBbGxJdGVtcyh0aGlzLml0ZW1zKTtcbiAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBhZGQoaXRlbSkge1xuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1uYXYtY29udGVudCcsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b05hdkNvbnRlbnRFbGVtZW50IHtcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob3V0bGV0OiBOb3ZvTmF2T3V0bGV0RWxlbWVudCkge1xuICAgIG91dGxldC5hZGQodGhpcyk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1uYXYtaGVhZGVyJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICcoY2xpY2spJzogJ3Nob3coJGV2ZW50KScsXG4gIH0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9OYXZIZWFkZXJFbGVtZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBwdWJsaWMgcm9sZSA9ICd0YWJwYW5lbCc7XG4gIEBJbnB1dCgpXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2ZvcicpXG4gIGZvckVsZW1lbnQ6IGFueTtcbiAgb3V0bGV0OiBhbnk7XG5cbiAgY29uc3RydWN0b3Iob3V0bGV0OiBOb3ZvTmF2T3V0bGV0RWxlbWVudCkge1xuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5hY3RpdmUgfHwgZmFsc2U7XG4gICAgdGhpcy5vdXRsZXQgPSBvdXRsZXQ7XG4gIH1cblxuICBzaG93KGV2ZW50PzogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IElOREVYID0gdGhpcy5vdXRsZXQuaXRlbXMuaW5kZXhPZih0aGlzLmZvckVsZW1lbnQpO1xuICAgICAgaWYgKElOREVYID4gLTEpIHtcbiAgICAgICAgdGhpcy5vdXRsZXQuc2hvdyhJTkRFWCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxuICB9XG59XG4iXX0=