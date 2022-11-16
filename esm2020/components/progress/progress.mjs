// NG2
import { Component, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './progress-constants';
import { NovoProgressBarElement } from './progress-bar';
import * as i0 from "@angular/core";
export class NovoProgressElement {
    constructor() {
        this.total = 100;
        this.radius = 54;
        this.striped = false;
        // Private vars for getters
        this._appearance = ProgressAppearance.LINEAR;
        this._disabled = false;
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(value) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._updateBarAppearance();
        }
    }
    // Disabled State
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = !!value;
    }
    ngAfterContentInit() {
        this._updateBarRadius();
    }
    _updateBarAppearance() {
        if (this._bars) {
            this._bars.forEach((bar) => {
                bar.appearance = this.appearance;
            });
        }
    }
    _updateBarRadius() {
        if (this._bars) {
            this._bars.forEach((bar, i) => {
                bar.radius = this.radius - i * 5;
            });
        }
    }
}
NovoProgressElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressElement, deps: [], target: i0.ɵɵFactoryTarget.Component });
NovoProgressElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoProgressElement, selector: "novo-progress", inputs: { color: "color", theme: "theme", total: "total", radius: "radius", striped: "striped", appearance: "appearance", disabled: "disabled" }, host: { properties: { "class.striped": "this.striped", "class": "this.appearance", "class.disabled": "this.disabled" } }, providers: [
        {
            provide: NOVO_PROGRESS_CONTAINER,
            useExisting: NovoProgressElement,
        },
    ], queries: [{ propertyName: "_bars", predicate: i0.forwardRef(function () { return NovoProgressBarElement; }), descendants: true }], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:var(--color-background);border:1px solid var(--color-border)}:host.radial{width:9.2em;height:9.2em}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoProgressElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-progress', template: ` <ng-content></ng-content> `, providers: [
                        {
                            provide: NOVO_PROGRESS_CONTAINER,
                            useExisting: NovoProgressElement,
                        },
                    ], styles: [":host{display:flex;position:relative;border-radius:.2em}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.25) 75%,transparent 75%,transparent);background-size:20px 20px}:host.linear{width:200px;height:1.2em;background-color:var(--color-background);border:1px solid var(--color-border)}:host.radial{width:9.2em;height:9.2em}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], theme: [{
                type: Input
            }], total: [{
                type: Input
            }], radius: [{
                type: Input
            }], striped: [{
                type: HostBinding,
                args: ['class.striped']
            }, {
                type: Input
            }], appearance: [{
                type: HostBinding,
                args: ['class']
            }, {
                type: Input
            }], disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }], _bars: [{
                type: ContentChildren,
                args: [forwardRef(() => NovoProgressBarElement), { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3Byb2dyZXNzL3Byb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQWF4RCxNQUFNLE9BQU8sbUJBQW1CO0lBWGhDO1FBZVcsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBSTdCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsMkJBQTJCO1FBQ25CLGdCQUFXLEdBQXVCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUM1RCxjQUFTLEdBQVksS0FBSyxDQUFDO0tBOENwQztJQTVDQyxJQUVJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLEtBQXlCO1FBQ3RDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUEyQixDQUFDO1lBQy9DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixJQUVJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFLRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLG9CQUFvQjtRQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN6QixHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFnQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QixHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7aUhBMURVLG1CQUFtQjtxR0FBbkIsbUJBQW1CLG9UQVBuQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxXQUFXLEVBQUUsbUJBQW1CO1NBQ2pDO0tBQ0YsbUZBdUNpQyxzQkFBc0Isb0RBN0M5Qyw2QkFBNkI7NEZBUTVCLG1CQUFtQjtrQkFYL0IsU0FBUzsrQkFDRSxlQUFlLFlBRWYsNkJBQTZCLGFBQzVCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSx1QkFBdUI7NEJBQ2hDLFdBQVcscUJBQXFCO3lCQUNqQztxQkFDRjs4QkFJRCxLQUFLO3NCQURKLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBSU4sT0FBTztzQkFGTixXQUFXO3VCQUFDLGVBQWU7O3NCQUMzQixLQUFLO2dCQVNGLFVBQVU7c0JBRmIsV0FBVzt1QkFBQyxPQUFPOztzQkFDbkIsS0FBSztnQkFjRixRQUFRO3NCQUZYLEtBQUs7O3NCQUNMLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQVM3QixLQUFLO3NCQURKLGVBQWU7dUJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSLCBQcm9ncmVzc0FwcGVhcmFuY2UgfSBmcm9tICcuL3Byb2dyZXNzLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50IH0gZnJvbSAnLi9wcm9ncmVzcy1iYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXByb2dyZXNzJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3Muc2NzcyddLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE5vdm9Qcm9ncmVzc0VsZW1lbnQsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1Byb2dyZXNzRWxlbWVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBASW5wdXQoKVxuICBjb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSB0b3RhbDogbnVtYmVyID0gMTAwO1xuICBASW5wdXQoKSByYWRpdXM6IG51bWJlciA9IDU0O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RyaXBlZCcpXG4gIEBJbnB1dCgpXG4gIHN0cmlwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBQcml2YXRlIHZhcnMgZm9yIGdldHRlcnNcbiAgcHJpdmF0ZSBfYXBwZWFyYW5jZTogUHJvZ3Jlc3NBcHBlYXJhbmNlID0gUHJvZ3Jlc3NBcHBlYXJhbmNlLkxJTkVBUjtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgQElucHV0KClcbiAgZ2V0IGFwcGVhcmFuY2UoKTogUHJvZ3Jlc3NBcHBlYXJhbmNlIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBzZXQgYXBwZWFyYW5jZSh2YWx1ZTogUHJvZ3Jlc3NBcHBlYXJhbmNlKSB7XG4gICAgaWYgKHRoaXMuX2FwcGVhcmFuY2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9hcHBlYXJhbmNlID0gdmFsdWUgYXMgUHJvZ3Jlc3NBcHBlYXJhbmNlO1xuICAgICAgdGhpcy5fdXBkYXRlQmFyQXBwZWFyYW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERpc2FibGVkIFN0YXRlXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gISF2YWx1ZTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50KSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBfYmFyczogUXVlcnlMaXN0PE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQ+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl91cGRhdGVCYXJSYWRpdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJhckFwcGVhcmFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2JhcnMpIHtcbiAgICAgIHRoaXMuX2JhcnMuZm9yRWFjaCgoYmFyKSA9PiB7XG4gICAgICAgIGJhci5hcHBlYXJhbmNlID0gdGhpcy5hcHBlYXJhbmNlIGFzIFByb2dyZXNzQXBwZWFyYW5jZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJhclJhZGl1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYmFycykge1xuICAgICAgdGhpcy5fYmFycy5mb3JFYWNoKChiYXIsIGkpID0+IHtcbiAgICAgICAgYmFyLnJhZGl1cyA9IHRoaXMucmFkaXVzIC0gaSAqIDU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==