// NG2
import { Component, HostBinding, Input } from '@angular/core';
export class NonIdealStateElement {
    constructor() {
        this.hb_class = 'novo-non-ideal-state';
        this.theme = 'light';
    }
}
NonIdealStateElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-non-ideal-state',
                template: `
    <novo-icon class="novo-non-ideal-state-icon" *ngIf="icon" [color]="theme">{{ icon }}</novo-icon>
    <novo-title class="novo-non-ideal-state-title" *ngIf="title" marginBefore>{{ title }}</novo-title>
    <novo-text *ngIf="description" block marginBefore marginAfter>{{ description }}</novo-text>
    <ng-content></ng-content>
  `,
                styles: [":host{align-items:center;display:flex;flex-direction:column;justify-content:center;padding:2rem;text-align:center}:host .novo-non-ideal-state-icon{font-size:xx-large}:host button{display:inline-block}"]
            },] }
];
NonIdealStateElement.propDecorators = {
    hb_class: [{ type: HostBinding, args: ['class',] }],
    theme: [{ type: Input }],
    icon: [{ type: Input }],
    title: [{ type: Input }],
    description: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9uSWRlYWxTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9ub24taWRlYWwtc3RhdGUvTm9uSWRlYWxTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBWTlELE1BQU0sT0FBTyxvQkFBb0I7SUFWakM7UUFZRSxhQUFRLEdBQUcsc0JBQXNCLENBQUM7UUFHbEMsVUFBSyxHQUFXLE9BQU8sQ0FBQztJQU8xQixDQUFDOzs7WUF0QkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBRWhDLFFBQVEsRUFBRTs7Ozs7R0FLVDs7YUFDRjs7O3VCQUVFLFdBQVcsU0FBQyxPQUFPO29CQUduQixLQUFLO21CQUVMLEtBQUs7b0JBRUwsS0FBSzswQkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW5vbi1pZGVhbC1zdGF0ZScsXG4gIHN0eWxlVXJsczogWycuL05vbklkZWFsU3RhdGUuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWljb24gY2xhc3M9XCJub3ZvLW5vbi1pZGVhbC1zdGF0ZS1pY29uXCIgKm5nSWY9XCJpY29uXCIgW2NvbG9yXT1cInRoZW1lXCI+e3sgaWNvbiB9fTwvbm92by1pY29uPlxuICAgIDxub3ZvLXRpdGxlIGNsYXNzPVwibm92by1ub24taWRlYWwtc3RhdGUtdGl0bGVcIiAqbmdJZj1cInRpdGxlXCIgbWFyZ2luQmVmb3JlPnt7IHRpdGxlIH19PC9ub3ZvLXRpdGxlPlxuICAgIDxub3ZvLXRleHQgKm5nSWY9XCJkZXNjcmlwdGlvblwiIGJsb2NrIG1hcmdpbkJlZm9yZSBtYXJnaW5BZnRlcj57eyBkZXNjcmlwdGlvbiB9fTwvbm92by10ZXh0PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm9uSWRlYWxTdGF0ZUVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgaGJfY2xhc3MgPSAnbm92by1ub24taWRlYWwtc3RhdGUnO1xuXG4gIEBJbnB1dCgpXG4gIHRoZW1lOiBzdHJpbmcgPSAnbGlnaHQnO1xuICBASW5wdXQoKVxuICBpY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG4iXX0=