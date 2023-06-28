// NG2
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/platform-browser";
import * as i3 from "novo-elements/elements/button";
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
NovoTipWellElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellElement, deps: [{ token: i1.NovoLabelService }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
NovoTipWellElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoTipWellElement, selector: "novo-tip-well", inputs: { name: "name", tip: "tip", buttonText: "buttonText", button: "button", icon: "icon", sanitize: "sanitize" }, outputs: { confirmed: "confirmed" }, host: { properties: { "class.active": "isActive" } }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTipWellElement, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlwV2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3RpcC13ZWxsL1RpcFdlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBc0IxRCxNQUFNLE9BQU8sa0JBQWtCO0lBdUI3QixZQUFvQixNQUF3QixFQUFVLFNBQXVCO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWY3RSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSXZCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQVF2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsSUFBSTtvQkFDRixZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDcEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDbEI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FDVixtTkFBbU4sQ0FDcE4sQ0FBQztpQkFDSDthQUNGO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsSUFBSSxhQUFhO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQzlCLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QywrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxLQUFLLEtBQUssQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0hBekVVLGtCQUFrQjtvR0FBbEIsa0JBQWtCLHNRQWxCbkI7Ozs7Ozs7Ozs7Ozs7R0FhVDs0RkFLVSxrQkFBa0I7a0JBcEI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsVUFBVTtxQkFDN0I7aUJBQ0Y7a0lBR0MsSUFBSTtzQkFESCxLQUFLO2dCQUdOLEdBQUc7c0JBREYsS0FBSztnQkFHTixVQUFVO3NCQURULEtBQUs7Z0JBR04sTUFBTTtzQkFETCxLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7Z0JBR04sU0FBUztzQkFEUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by10aXAtd2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImlzQWN0aXZlXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8aSBjbGFzcz1cImJoaS17eyBpY29uIH19XCIgKm5nSWY9XCJpY29uXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLWljb24tJyArIG5hbWVcIj48L2k+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5vdm8taWNvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgPHAgKm5nSWY9XCJzYW5pdGl6ZSAmJiB0aXAubGVuZ3RoXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLXRpcC0nICsgbmFtZVwiPnt7IHRpcCB9fTwvcD5cbiAgICAgICAgPHAgKm5nSWY9XCIhc2FuaXRpemUgJiYgdGlwV2l0aFN0eWxlc1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by10aXAtd2VsbC10aXAtJyArIG5hbWVcIiBbaW5uZXJIVE1MXT1cInRpcFdpdGhTdHlsZXNcIj48L3A+XG4gICAgICAgIDxwIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by10aXAtd2VsbC10aXAtJyArIG5hbWVcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8YnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiBzaXplPVwic21hbGxcIiAoY2xpY2spPVwiaGlkZVRpcCgpXCIgKm5nSWY9XCJidXR0b25cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tdGlwLXdlbGwtYnV0dG9uLScgKyBuYW1lXCI+XG4gICAgICAgIHt7IGJ1dHRvblRleHQgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQWN0aXZlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RpcFdlbGxFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICB0aXA6IHN0cmluZztcbiAgQElucHV0KClcbiAgYnV0dG9uVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBidXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNhbml0aXplOiBib29sZWFuID0gdHJ1ZTtcbiAgQE91dHB1dCgpXG4gIGNvbmZpcm1lZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpc0FjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG4gIGlzTG9jYWxTdG9yYWdlRW5hYmxlZDogYW55O1xuICBsb2NhbFN0b3JhZ2VLZXk6IHN0cmluZztcblxuICBwcml2YXRlIF90aXBXaXRoU3R5bGVzOiBTYWZlSHRtbDtcbiAgcHJpdmF0ZSBfbGFzdFRpcFN0eWxlZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIGlzIGVuYWJsZWRcbiAgICB0aGlzLmlzTG9jYWxTdG9yYWdlRW5hYmxlZCA9ICgoKSA9PiB7XG4gICAgICBsZXQgaXNFbmFibGVkID0gZmFsc2U7XG4gICAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbHNUZXN0JywgJzEnKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbHNUZXN0Jyk7XG4gICAgICAgICAgaXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICdUaGlzIHdlYiBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgc3RvcmluZyBzZXR0aW5ncyBsb2NhbGx5LiBJbiBTYWZhcmksIHRoZSBtb3N0IGNvbW1vbiBjYXVzZSBvZiB0aGlzIGlzIHVzaW5nIFwiUHJpdmF0ZSBCcm93c2luZyBNb2RlXCIuIFNvbWUgc2V0dGluZ3MgbWF5IG5vdCBzYXZlIG9yIHNvbWUgZmVhdHVyZXMgbWF5IG5vdCB3b3JrIHByb3Blcmx5IGZvciB5b3UuJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaXNFbmFibGVkO1xuICAgIH0pKCk7XG4gIH1cblxuICAvLyBUcnVzdHMgdGhlIEhUTUwgaW4gb3JkZXIgdG8gc2hvdyBDU1Mgc3R5bGVzXG4gIGdldCB0aXBXaXRoU3R5bGVzKCk6IFNhZmVIdG1sIHtcbiAgICBpZiAoIXRoaXMuX3RpcFdpdGhTdHlsZXMgfHwgdGhpcy5fbGFzdFRpcFN0eWxlZCAhPT0gdGhpcy50aXApIHtcbiAgICAgIHRoaXMuX3RpcFdpdGhTdHlsZXMgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLnRpcCk7XG4gICAgICB0aGlzLl9sYXN0VGlwU3R5bGVkID0gdGhpcy50aXA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90aXBXaXRoU3R5bGVzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50aXAgPSB0aGlzLnRpcCB8fCAnJztcbiAgICB0aGlzLmJ1dHRvblRleHQgPSB0aGlzLmJ1dHRvblRleHQgfHwgdGhpcy5sYWJlbHMub2tHb3RJdDtcbiAgICB0aGlzLmJ1dHRvbiA9IHR5cGVvZiB0aGlzLmJ1dHRvbiA9PT0gJ3N0cmluZycgPyB0aGlzLmJ1dHRvbiA9PT0gJ3RydWUnIDogdGhpcy5idXR0b247XG4gICAgdGhpcy5pY29uID0gdGhpcy5pY29uIHx8IG51bGw7XG4gICAgLy8gU2V0IGEgKHNlbWkpIHVuaXF1ZSBuYW1lIGZvciB0aGUgdGlwLXdlbGxcbiAgICB0aGlzLm5hbWUgPSB0aGlzLm5hbWUgfHwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZUtleSA9IGBub3ZvLXR3XyR7dGhpcy5uYW1lfWA7XG4gICAgLy8gQ2hlY2sgbG9jYWxTdG9yYWdlIGZvciBzdGF0ZVxuICAgIGlmICh0aGlzLmlzTG9jYWxTdG9yYWdlRW5hYmxlZCkge1xuICAgICAgY29uc3Qgc3RvcmVkVmFsdWUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5KSk7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gc3RvcmVkVmFsdWUgIT09IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhpZGVUaXAoKSB7XG4gICAgaWYgKHRoaXMuaXNMb2NhbFN0b3JhZ2VFbmFibGVkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoZmFsc2UpKTtcbiAgICB9XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuY29uZmlybWVkLmVtaXQoKTtcbiAgfVxufVxuIl19