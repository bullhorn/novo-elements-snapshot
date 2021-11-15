// NG2
import { Component, ContentChildren, forwardRef, HostBinding, Input, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import { NOVO_PROGRESS_CONTAINER, ProgressAppearance } from './ProgressConstants';
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
NovoProgressElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-progress',
                template: ` <ng-content></ng-content> `,
                providers: [
                    {
                        provide: NOVO_PROGRESS_CONTAINER,
                        useExisting: NovoProgressElement,
                    },
                ],
                styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}:host{border-radius:.2em;display:flex;position:relative}:host.striped{background-image:linear-gradient(45deg,rgba(0,0,0,.25) 25%,transparent 0,transparent 50%,rgba(0,0,0,.25) 0,rgba(0,0,0,.25) 75%,transparent 0,transparent);background-size:20px 20px}:host.linear{background-color:#f7f7f7;border:1px solid #cccdcc;height:1.2em;width:200px}:host.radial{height:9.2em;width:9.2em}"]
            },] }
];
NovoProgressElement.propDecorators = {
    color: [{ type: Input }],
    theme: [{ type: Input }],
    total: [{ type: Input }],
    radius: [{ type: Input }],
    striped: [{ type: HostBinding, args: ['class.striped',] }, { type: Input }],
    appearance: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    disabled: [{ type: Input }, { type: HostBinding, args: ['class.disabled',] }],
    _bars: [{ type: ContentChildren, args: [forwardRef(() => NovoProgressBarElement), { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcHJvZ3Jlc3MvUHJvZ3Jlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBYWxGLE1BQU0sT0FBTyxtQkFBbUI7SUFYaEM7UUFlVyxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFJN0IsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QiwyQkFBMkI7UUFDbkIsZ0JBQVcsR0FBdUIsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1FBQzVELGNBQVMsR0FBWSxLQUFLLENBQUM7SUE4Q3JDLENBQUM7SUE1Q0MsSUFFSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUF5QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBMkIsQ0FBQztZQUMvQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxpQkFBaUI7SUFDakIsSUFFSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBS0Qsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDekIsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBZ0MsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQXJFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBRXpCLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxXQUFXLEVBQUUsbUJBQW1CO3FCQUNqQztpQkFDRjs7YUFDRjs7O29CQUVFLEtBQUs7b0JBRUwsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBRUwsV0FBVyxTQUFDLGVBQWUsY0FDM0IsS0FBSzt5QkFPTCxXQUFXLFNBQUMsT0FBTyxjQUNuQixLQUFLO3VCQVlMLEtBQUssWUFDTCxXQUFXLFNBQUMsZ0JBQWdCO29CQVE1QixlQUFlLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9Qcm9ncmVzc0JhckVsZW1lbnQgfSBmcm9tICcuL1Byb2dyZXNzQmFyJztcbmltcG9ydCB7IE5PVk9fUFJPR1JFU1NfQ09OVEFJTkVSLCBQcm9ncmVzc0FwcGVhcmFuY2UgfSBmcm9tICcuL1Byb2dyZXNzQ29uc3RhbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1wcm9ncmVzcycsXG4gIHN0eWxlVXJsczogWycuL1Byb2dyZXNzLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOT1ZPX1BST0dSRVNTX0NPTlRBSU5FUixcbiAgICAgIHVzZUV4aXN0aW5nOiBOb3ZvUHJvZ3Jlc3NFbGVtZW50LFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Qcm9ncmVzc0VsZW1lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQElucHV0KClcbiAgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgdG90YWw6IG51bWJlciA9IDEwMDtcbiAgQElucHV0KCkgcmFkaXVzOiBudW1iZXIgPSA1NDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0cmlwZWQnKVxuICBASW5wdXQoKVxuICBzdHJpcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLy8gUHJpdmF0ZSB2YXJzIGZvciBnZXR0ZXJzXG4gIHByaXZhdGUgX2FwcGVhcmFuY2U6IFByb2dyZXNzQXBwZWFyYW5jZSA9IFByb2dyZXNzQXBwZWFyYW5jZS5MSU5FQVI7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIEBJbnB1dCgpXG4gIGdldCBhcHBlYXJhbmNlKCk6IFByb2dyZXNzQXBwZWFyYW5jZSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGVhcmFuY2U7XG4gIH1cbiAgc2V0IGFwcGVhcmFuY2UodmFsdWU6IFByb2dyZXNzQXBwZWFyYW5jZSkge1xuICAgIGlmICh0aGlzLl9hcHBlYXJhbmNlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IHZhbHVlIGFzIFByb2dyZXNzQXBwZWFyYW5jZTtcbiAgICAgIHRoaXMuX3VwZGF0ZUJhckFwcGVhcmFuY2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyBEaXNhYmxlZCBTdGF0ZVxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTm92b1Byb2dyZXNzQmFyRWxlbWVudCksIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgX2JhcnM6IFF1ZXJ5TGlzdDxOb3ZvUHJvZ3Jlc3NCYXJFbGVtZW50PjtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fdXBkYXRlQmFyUmFkaXVzKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCYXJBcHBlYXJhbmNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9iYXJzKSB7XG4gICAgICB0aGlzLl9iYXJzLmZvckVhY2goKGJhcikgPT4ge1xuICAgICAgICBiYXIuYXBwZWFyYW5jZSA9IHRoaXMuYXBwZWFyYW5jZSBhcyBQcm9ncmVzc0FwcGVhcmFuY2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCYXJSYWRpdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2JhcnMpIHtcbiAgICAgIHRoaXMuX2JhcnMuZm9yRWFjaCgoYmFyLCBpKSA9PiB7XG4gICAgICAgIGJhci5yYWRpdXMgPSB0aGlzLnJhZGl1cyAtIGkgKiA1O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=