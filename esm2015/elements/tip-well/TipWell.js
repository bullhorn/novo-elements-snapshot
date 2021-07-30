// NG2
import { Component, Input, Output, EventEmitter } from '@angular/core';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { DomSanitizer } from '@angular/platform-browser';
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
NovoTipWellElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-tip-well',
                template: `
    <div *ngIf="isActive">
      <div>
        <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
        <p *ngIf="sanitize" [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
        <p *ngIf="!sanitize" [attr.data-automation-id]="'novo-tip-well-tip-' + name" [innerHTML]="tipWithStyles"></p>
      </div>
      <button theme="dialogue" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">
        {{ buttonText }}
      </button>
    </div>
  `,
                host: {
                    '[class.active]': 'isActive',
                }
            },] }
];
NovoTipWellElement.ctorParameters = () => [
    { type: NovoLabelService },
    { type: DomSanitizer }
];
NovoTipWellElement.propDecorators = {
    name: [{ type: Input }],
    tip: [{ type: Input }],
    buttonText: [{ type: Input }],
    button: [{ type: Input }],
    icon: [{ type: Input }],
    sanitize: [{ type: Input }],
    confirmed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlwV2VsbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvdGlwLXdlbGwvVGlwV2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxNQUFNO0FBQ04sT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBb0JuRSxNQUFNLE9BQU8sa0JBQWtCO0lBdUI3QixZQUFvQixNQUF3QixFQUFVLFNBQXVCO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQWY3RSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSXZCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQVF2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsSUFBSTtvQkFDRixZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDcEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDbEI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FDVixtTkFBbU4sQ0FDcE4sQ0FBQztpQkFDSDthQUNGO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsSUFBSSxhQUFhO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQzlCLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QywrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxLQUFLLEtBQUssQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBM0ZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2dCQUNELElBQUksRUFBRTtvQkFDSixnQkFBZ0IsRUFBRSxVQUFVO2lCQUM3QjthQUNGOzs7WUFwQlEsZ0JBQWdCO1lBQ2hCLFlBQVk7OzttQkFxQmxCLEtBQUs7a0JBRUwsS0FBSzt5QkFFTCxLQUFLO3FCQUVMLEtBQUs7bUJBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by10aXAtd2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgKm5nSWY9XCJpc0FjdGl2ZVwiPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxpIGNsYXNzPVwiYmhpLXt7IGljb24gfX1cIiAqbmdJZj1cImljb25cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tdGlwLXdlbGwtaWNvbi0nICsgbmFtZVwiPjwvaT5cclxuICAgICAgICA8cCAqbmdJZj1cInNhbml0aXplXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIidub3ZvLXRpcC13ZWxsLXRpcC0nICsgbmFtZVwiPnt7IHRpcCB9fTwvcD5cclxuICAgICAgICA8cCAqbmdJZj1cIiFzYW5pdGl6ZVwiIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCInbm92by10aXAtd2VsbC10aXAtJyArIG5hbWVcIiBbaW5uZXJIVE1MXT1cInRpcFdpdGhTdHlsZXNcIj48L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uIHRoZW1lPVwiZGlhbG9ndWVcIiAoY2xpY2spPVwiaGlkZVRpcCgpXCIgKm5nSWY9XCJidXR0b25cIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwiJ25vdm8tdGlwLXdlbGwtYnV0dG9uLScgKyBuYW1lXCI+XHJcbiAgICAgICAge3sgYnV0dG9uVGV4dCB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQWN0aXZlJyxcclxuICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1RpcFdlbGxFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKVxyXG4gIG5hbWU6IHN0cmluZyB8IG51bWJlcjtcclxuICBASW5wdXQoKVxyXG4gIHRpcDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgYnV0dG9uVGV4dDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpXHJcbiAgYnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKVxyXG4gIGljb246IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIHNhbml0aXplOiBib29sZWFuID0gdHJ1ZTtcclxuICBAT3V0cHV0KClcclxuICBjb25maXJtZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGlzQWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcclxuICBpc0xvY2FsU3RvcmFnZUVuYWJsZWQ6IGFueTtcclxuICBsb2NhbFN0b3JhZ2VLZXk6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBfdGlwV2l0aFN0eWxlczogU2FmZUh0bWw7XHJcbiAgcHJpdmF0ZSBfbGFzdFRpcFN0eWxlZDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xyXG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2UgaXMgZW5hYmxlZFxyXG4gICAgdGhpcy5pc0xvY2FsU3RvcmFnZUVuYWJsZWQgPSAoKCkgPT4ge1xyXG4gICAgICBsZXQgaXNFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbHNUZXN0JywgJzEnKTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdsc1Rlc3QnKTtcclxuICAgICAgICAgIGlzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgICAnVGhpcyB3ZWIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHN0b3Jpbmcgc2V0dGluZ3MgbG9jYWxseS4gSW4gU2FmYXJpLCB0aGUgbW9zdCBjb21tb24gY2F1c2Ugb2YgdGhpcyBpcyB1c2luZyBcIlByaXZhdGUgQnJvd3NpbmcgTW9kZVwiLiBTb21lIHNldHRpbmdzIG1heSBub3Qgc2F2ZSBvciBzb21lIGZlYXR1cmVzIG1heSBub3Qgd29yayBwcm9wZXJseSBmb3IgeW91LicsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaXNFbmFibGVkO1xyXG4gICAgfSkoKTtcclxuICB9XHJcblxyXG4gIC8vIFRydXN0cyB0aGUgSFRNTCBpbiBvcmRlciB0byBzaG93IENTUyBzdHlsZXNcclxuICBnZXQgdGlwV2l0aFN0eWxlcygpOiBTYWZlSHRtbCB7XHJcbiAgICBpZiAoIXRoaXMuX3RpcFdpdGhTdHlsZXMgfHwgdGhpcy5fbGFzdFRpcFN0eWxlZCAhPT0gdGhpcy50aXApIHtcclxuICAgICAgdGhpcy5fdGlwV2l0aFN0eWxlcyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMudGlwKTtcclxuICAgICAgdGhpcy5fbGFzdFRpcFN0eWxlZCA9IHRoaXMudGlwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3RpcFdpdGhTdHlsZXM7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJyc7XHJcbiAgICB0aGlzLmJ1dHRvblRleHQgPSB0aGlzLmJ1dHRvblRleHQgfHwgdGhpcy5sYWJlbHMub2tHb3RJdDtcclxuICAgIHRoaXMuYnV0dG9uID0gdHlwZW9mIHRoaXMuYnV0dG9uID09PSAnc3RyaW5nJyA/IHRoaXMuYnV0dG9uID09PSAndHJ1ZScgOiB0aGlzLmJ1dHRvbjtcclxuICAgIHRoaXMuaWNvbiA9IHRoaXMuaWNvbiB8fCBudWxsO1xyXG4gICAgLy8gU2V0IGEgKHNlbWkpIHVuaXF1ZSBuYW1lIGZvciB0aGUgdGlwLXdlbGxcclxuICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZSB8fCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApO1xyXG4gICAgdGhpcy5sb2NhbFN0b3JhZ2VLZXkgPSBgbm92by10d18ke3RoaXMubmFtZX1gO1xyXG4gICAgLy8gQ2hlY2sgbG9jYWxTdG9yYWdlIGZvciBzdGF0ZVxyXG4gICAgaWYgKHRoaXMuaXNMb2NhbFN0b3JhZ2VFbmFibGVkKSB7XHJcbiAgICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSkpO1xyXG4gICAgICB0aGlzLmlzQWN0aXZlID0gc3RvcmVkVmFsdWUgIT09IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZVRpcCgpIHtcclxuICAgIGlmICh0aGlzLmlzTG9jYWxTdG9yYWdlRW5hYmxlZCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoZmFsc2UpKTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuY29uZmlybWVkLmVtaXQoKTtcclxuICB9XHJcbn1cclxuIl19