// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../button/Button";
import * as i4 from "@angular/common";
export class NovoTipWellElement {
    constructor(labels, sanitizer) {
        this.labels = labels;
        this.sanitizer = sanitizer;
        this.button = true;
        this.sanitize = true;
        this.confirmed = new EventEmitter();
        this.isActive = true;
        this.isActive = true;
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = (() => {
            let isEnabled = false;
            if (typeof localStorage === 'object') {
                try {
                    localStorage.setItem('lsTest', '1');
                    localStorage.removeItem('lsTest');
                    isEnabled = true;
                }
                catch (e) {
                    console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
                }
            }
            return isEnabled;
        })();
    }
    // Trusts the HTML in order to show CSS styles
    get tipWithStyles() {
        if (!this._tipWithStyles || this._lastTipStyled !== this.tip) {
            this._tipWithStyles = this.sanitizer.bypassSecurityTrustHtml(this.tip);
            this._lastTipStyled = this.tip;
        }
        return this._tipWithStyles;
    }
    ngOnInit() {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || this.labels.okGotIt;
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || null;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = `novo-tw_${this.name}`;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            const storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    }
    hideTip() {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
        this.confirmed.emit();
    }
}
NovoTipWellElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoTipWellElement, deps: [{ token: i1.NovoLabelService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoTipWellElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: NovoTipWellElement, selector: "novo-tip-well", inputs: { name: "name", tip: "tip", buttonText: "buttonText", button: "button", icon: "icon", sanitize: "sanitize" }, outputs: { confirmed: "confirmed" }, host: { properties: { "class.active": "isActive" } }, ngImport: i0, template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `, isInline: true, components: [{ type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoTipWellElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'novo-tip-well',
                    template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <ng-content select="novo-icon"></ng-content>
        <p *ngIf="sanitize && tip.length" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize && tipWithStyles" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
        <p [attr.data-automation-id]="'novo-tip-well-tip-' + name"><ng-content></ng-content></p>
      </div>
      <button theme="dialogue" size="small" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `,
                    host: {
                        '[class.active]': 'isActive',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }, { type: i2.DomSanitizer }]; }, propDecorators: { name: [{
                type: Input
            }], tip: [{
                type: Input
            }], buttonText: [{
                type: Input
            }], button: [{
                type: Input
            }], icon: [{
                type: Input
            }], sanitize: [{
                type: Input
            }], confirmed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlwV2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RpcC13ZWxsL1RpcFdlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7O0FBc0JyRSxNQUFNLE9BQU8sa0JBQWtCO0lBdUI3QixZQUFvQixNQUF3QixFQUFVLFNBQXVCO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWY3RSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSXZCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQVF2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsSUFBSTtvQkFDRixZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDcEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDbEI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FDVixtTkFBbU4sQ0FDcE4sQ0FBQztpQkFDSDthQUNGO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsSUFBSSxhQUFhO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQzlCLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QywrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxLQUFLLEtBQUssQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7K0dBekVVLGtCQUFrQjttR0FBbEIsa0JBQWtCLHNRQWxCbkI7Ozs7Ozs7Ozs7Ozs7R0FhVDsyRkFLVSxrQkFBa0I7a0JBcEI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsVUFBVTtxQkFDN0I7aUJBQ0Y7a0lBR0MsSUFBSTtzQkFESCxLQUFLO2dCQUdOLEdBQUc7c0JBREYsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sU0FBUztzQkFEUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXRpcC13ZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaXNBY3RpdmVcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXt7IGljb24gfX1cIiAqbmdJZj1cImljb25cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tdGlwLXdlbGwtaWNvbi0nICsgbmFtZVwiPjwvaT5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibm92by1pY29uXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8cCAqbmdJZj1cInNhbml0aXplICYmIHRpcC5sZW5ndGhcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tdGlwLXdlbGwtdGlwLScgKyBuYW1lXCI+e3sgdGlwIH19PC9wPlxuICAgICAgICA8cCAqbmdJZj1cIiFzYW5pdGl6ZSAmJiB0aXBXaXRoU3R5bGVzXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLXRpcC0nICsgbmFtZVwiIFtpbm5lckhUTUxdPVwidGlwV2l0aFN0eWxlc1wiPjwvcD5cbiAgICAgICAgPHAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLXRpcC0nICsgbmFtZVwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxidXR0b24gdGhlbWU9XCJkaWFsb2d1ZVwiIHNpemU9XCJzbWFsbFwiIChjbGljayk9XCJoaWRlVGlwKClcIiAqbmdJZj1cImJ1dHRvblwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by10aXAtd2VsbC1idXR0b24tJyArIG5hbWVcIj5cbiAgICAgICAge3sgYnV0dG9uVGV4dCB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnaXNBY3RpdmUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGlwV2VsbEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmcgfCBudW1iZXI7XG4gIEBJbnB1dCgpXG4gIHRpcDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBidXR0b25UZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpXG4gIGljb246IHN0cmluZztcbiAgQElucHV0KClcbiAgc2FuaXRpemU6IGJvb2xlYW4gPSB0cnVlO1xuICBAT3V0cHV0KClcbiAgY29uZmlybWVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlzQWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNMb2NhbFN0b3JhZ2VFbmFibGVkOiBhbnk7XG4gIGxvY2FsU3RvcmFnZUtleTogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3RpcFdpdGhTdHlsZXM6IFNhZmVIdG1sO1xuICBwcml2YXRlIF9sYXN0VGlwU3R5bGVkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgaXMgZW5hYmxlZFxuICAgIHRoaXMuaXNMb2NhbFN0b3JhZ2VFbmFibGVkID0gKCgpID0+IHtcbiAgICAgIGxldCBpc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsc1Rlc3QnLCAnMScpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdsc1Rlc3QnKTtcbiAgICAgICAgICBpc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ1RoaXMgd2ViIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBzdG9yaW5nIHNldHRpbmdzIGxvY2FsbHkuIEluIFNhZmFyaSwgdGhlIG1vc3QgY29tbW9uIGNhdXNlIG9mIHRoaXMgaXMgdXNpbmcgXCJQcml2YXRlIEJyb3dzaW5nIE1vZGVcIi4gU29tZSBzZXR0aW5ncyBtYXkgbm90IHNhdmUgb3Igc29tZSBmZWF0dXJlcyBtYXkgbm90IHdvcmsgcHJvcGVybHkgZm9yIHlvdS4nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpc0VuYWJsZWQ7XG4gICAgfSkoKTtcbiAgfVxuXG4gIC8vIFRydXN0cyB0aGUgSFRNTCBpbiBvcmRlciB0byBzaG93IENTUyBzdHlsZXNcbiAgZ2V0IHRpcFdpdGhTdHlsZXMoKTogU2FmZUh0bWwge1xuICAgIGlmICghdGhpcy5fdGlwV2l0aFN0eWxlcyB8fCB0aGlzLl9sYXN0VGlwU3R5bGVkICE9PSB0aGlzLnRpcCkge1xuICAgICAgdGhpcy5fdGlwV2l0aFN0eWxlcyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMudGlwKTtcbiAgICAgIHRoaXMuX2xhc3RUaXBTdHlsZWQgPSB0aGlzLnRpcDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RpcFdpdGhTdHlsZXM7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICcnO1xuICAgIHRoaXMuYnV0dG9uVGV4dCA9IHRoaXMuYnV0dG9uVGV4dCB8fCB0aGlzLmxhYmVscy5va0dvdEl0O1xuICAgIHRoaXMuYnV0dG9uID0gdHlwZW9mIHRoaXMuYnV0dG9uID09PSAnc3RyaW5nJyA/IHRoaXMuYnV0dG9uID09PSAndHJ1ZScgOiB0aGlzLmJ1dHRvbjtcbiAgICB0aGlzLmljb24gPSB0aGlzLmljb24gfHwgbnVsbDtcbiAgICAvLyBTZXQgYSAoc2VtaSkgdW5pcXVlIG5hbWUgZm9yIHRoZSB0aXAtd2VsbFxuICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlS2V5ID0gYG5vdm8tdHdfJHt0aGlzLm5hbWV9YDtcbiAgICAvLyBDaGVjayBsb2NhbFN0b3JhZ2UgZm9yIHN0YXRlXG4gICAgaWYgKHRoaXMuaXNMb2NhbFN0b3JhZ2VFbmFibGVkKSB7XG4gICAgICBjb25zdCBzdG9yZWRWYWx1ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXkpKTtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBzdG9yZWRWYWx1ZSAhPT0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaGlkZVRpcCgpIHtcbiAgICBpZiAodGhpcy5pc0xvY2FsU3RvcmFnZUVuYWJsZWQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShmYWxzZSkpO1xuICAgIH1cbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5jb25maXJtZWQuZW1pdCgpO1xuICB9XG59XG4iXX0=