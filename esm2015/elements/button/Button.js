// NG2
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export class NovoButtonElement {
    constructor() {
        this.side = 'right';
    }
    set icon(icon) {
        if (icon) {
            this._icon = `bhi-${icon}`;
        }
    }
    get icon() {
        return this._icon;
    }
}
NovoButtonElement.decorators = [
    { type: Component, args: [{
                selector: 'button[theme]',
                host: {
                    '[attr.theme]': 'theme',
                    '[attr.color]': 'color',
                    '[attr.icon]': 'icon',
                    '[attr.loading]': 'loading',
                    '[attr.side]': 'side',
                },
                template: `
    <div class="flex-wrapper">
      <!--Left Icon-->
      <i *ngIf="icon && side === 'left' && !loading" [ngClass]="icon"></i>
      <!--Transcluded Content-->
      <ng-content></ng-content>
      <!--Right Icon-->
      <i *ngIf="icon && side === 'right' && !loading" [ngClass]="icon"></i>
      <!--Loading-->
      <i *ngIf="loading" class="loading">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
          x="0px"
          y="0px"
          width="18.2px"
          height="18.5px"
          viewBox="0 0 18.2 18.5"
          style="enable-background:new 0 0 18.2 18.5;"
          xml:space="preserve"
        >
          <style type="text/css">
            .spinner {
              fill: #ffffff;
            }
          </style>
          <path
            class="spinner"
            d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                        c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                        c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"
          />
        </svg>
      </i>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NovoButtonElement.propDecorators = {
    color: [{ type: Input }],
    side: [{ type: Input }],
    theme: [{ type: Input }],
    loading: [{ type: Input }],
    icon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9idXR0b24vQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW1EMUUsTUFBTSxPQUFPLGlCQUFpQjtJQWpEOUI7UUFtRFcsU0FBSSxHQUFXLE9BQU8sQ0FBQztJQWNsQyxDQUFDO0lBWEMsSUFDSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7O1lBOURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSxPQUFPO29CQUN2QixjQUFjLEVBQUUsT0FBTztvQkFDdkIsYUFBYSxFQUFFLE1BQU07b0JBQ3JCLGdCQUFnQixFQUFFLFNBQVM7b0JBQzNCLGFBQWEsRUFBRSxNQUFNO2lCQUN0QjtnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQ1Q7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztvQkFFRSxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSztzQkFDTCxLQUFLO21CQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnV0dG9uW3RoZW1lXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1thdHRyLnRoZW1lXSc6ICd0aGVtZScsXHJcbiAgICAnW2F0dHIuY29sb3JdJzogJ2NvbG9yJyxcclxuICAgICdbYXR0ci5pY29uXSc6ICdpY29uJyxcclxuICAgICdbYXR0ci5sb2FkaW5nXSc6ICdsb2FkaW5nJyxcclxuICAgICdbYXR0ci5zaWRlXSc6ICdzaWRlJyxcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZmxleC13cmFwcGVyXCI+XHJcbiAgICAgIDwhLS1MZWZ0IEljb24tLT5cclxuICAgICAgPGkgKm5nSWY9XCJpY29uICYmIHNpZGUgPT09ICdsZWZ0JyAmJiAhbG9hZGluZ1wiIFtuZ0NsYXNzXT1cImljb25cIj48L2k+XHJcbiAgICAgIDwhLS1UcmFuc2NsdWRlZCBDb250ZW50LS0+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgPCEtLVJpZ2h0IEljb24tLT5cclxuICAgICAgPGkgKm5nSWY9XCJpY29uICYmIHNpZGUgPT09ICdyaWdodCcgJiYgIWxvYWRpbmdcIiBbbmdDbGFzc109XCJpY29uXCI+PC9pPlxyXG4gICAgICA8IS0tTG9hZGluZy0tPlxyXG4gICAgICA8aSAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cImxvYWRpbmdcIj5cclxuICAgICAgICA8c3ZnXHJcbiAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCJcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcclxuICAgICAgICAgIHhtbG5zOmE9XCJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvXCJcclxuICAgICAgICAgIHg9XCIwcHhcIlxyXG4gICAgICAgICAgeT1cIjBweFwiXHJcbiAgICAgICAgICB3aWR0aD1cIjE4LjJweFwiXHJcbiAgICAgICAgICBoZWlnaHQ9XCIxOC41cHhcIlxyXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAxOC4yIDE4LjVcIlxyXG4gICAgICAgICAgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE4LjIgMTguNTtcIlxyXG4gICAgICAgICAgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cclxuICAgICAgICAgICAgLnNwaW5uZXIge1xyXG4gICAgICAgICAgICAgIGZpbGw6ICNmZmZmZmY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICBjbGFzcz1cInNwaW5uZXJcIlxyXG4gICAgICAgICAgICBkPVwiTTkuMiwxOC41QzQuMSwxOC41LDAsMTQuNCwwLDkuMlM0LjEsMCw5LjIsMGMwLjksMCwxLjksMC4xLDIuNywwLjRjMC44LDAuMiwxLjIsMS4xLDEsMS45XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMtMC4yLDAuOC0xLjEsMS4yLTEuOSwxQzEwLjUsMy4xLDkuOSwzLDkuMiwzQzUuOCwzLDMsNS44LDMsOS4yczIuOCw2LjIsNi4yLDYuMmMyLjgsMCw1LjMtMS45LDYtNC43YzAuMi0wLjgsMS0xLjMsMS44LTEuMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjMC44LDAuMiwxLjMsMSwxLjEsMS44QzE3LjEsMTUuNywxMy40LDE4LjUsOS4yLDE4LjV6XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvaT5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOb3ZvQnV0dG9uRWxlbWVudCB7XHJcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcclxuICBASW5wdXQoKSBzaWRlOiBzdHJpbmcgPSAncmlnaHQnO1xyXG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcclxuICBASW5wdXQoKVxyXG4gIHNldCBpY29uKGljb246IHN0cmluZykge1xyXG4gICAgaWYgKGljb24pIHtcclxuICAgICAgdGhpcy5faWNvbiA9IGBiaGktJHtpY29ufWA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2ljb246IHN0cmluZztcclxufVxyXG4iXX0=