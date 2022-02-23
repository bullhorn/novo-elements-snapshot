// NG2
import { Component, HostBinding, Input } from '@angular/core';
export class NovoBoxElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
        // get hb_gridCols() {
        //   return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, ${ResourceSettings.eventWidth})`);
        // }
    }
    get display() {
        return 'block';
    }
}
NovoBoxElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-box',
                template: ` <ng-content></ng-content> `
            },] }
];
NovoBoxElement.propDecorators = {
    display: [{ type: HostBinding, args: ['style.display',] }],
    direction: [{ type: HostBinding, args: ['style.flex-direction',] }, { type: Input }],
    align: [{ type: HostBinding, args: ['style.align-items',] }, { type: Input }],
    justify: [{ type: HostBinding, args: ['style.justify-content',] }, { type: Input }],
    wrap: [{ type: HostBinding, args: ['style.flex-wrap',] }, { type: Input }],
    gap: [{ type: HostBinding, args: ['style.gap',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm94LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2ZsZXgvQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNOUQsTUFBTSxPQUFPLGNBQWM7SUFKM0I7UUFZRSxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxRQUFRLENBQUM7UUFJekIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUkvQixTQUFJLEdBQVcsUUFBUSxDQUFDO1FBTXhCLHNCQUFzQjtRQUN0QixnSEFBZ0g7UUFDaEgsSUFBSTtJQUNOLENBQUM7SUE1QkMsSUFDSSxPQUFPO1FBQ1QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7O1lBUkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzs7c0JBRUUsV0FBVyxTQUFDLGVBQWU7d0JBSzNCLFdBQVcsU0FBQyxzQkFBc0IsY0FDbEMsS0FBSztvQkFHTCxXQUFXLFNBQUMsbUJBQW1CLGNBQy9CLEtBQUs7c0JBR0wsV0FBVyxTQUFDLHVCQUF1QixjQUNuQyxLQUFLO21CQUdMLFdBQVcsU0FBQyxpQkFBaUIsY0FDN0IsS0FBSztrQkFHTCxXQUFXLFNBQUMsV0FBVyxjQUN2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWJveCcsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0JveEVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKVxuICBnZXQgZGlzcGxheSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnYmxvY2snO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LWRpcmVjdGlvbicpXG4gIEBJbnB1dCgpXG4gIGRpcmVjdGlvbjogc3RyaW5nID0gJ3Jvdyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5hbGlnbi1pdGVtcycpXG4gIEBJbnB1dCgpXG4gIGFsaWduOiBzdHJpbmcgPSAnY2VudGVyJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmp1c3RpZnktY29udGVudCcpXG4gIEBJbnB1dCgpXG4gIGp1c3RpZnk6IHN0cmluZyA9ICdmbGV4LXN0YXJ0JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtd3JhcCcpXG4gIEBJbnB1dCgpXG4gIHdyYXA6IHN0cmluZyA9ICdub3dyYXAnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ2FwJylcbiAgQElucHV0KClcbiAgZ2FwOiBzdHJpbmc7XG5cbiAgLy8gZ2V0IGhiX2dyaWRDb2xzKCkge1xuICAvLyAgIHJldHVybiB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGByZXBlYXQoJHt0aGlzLmNvbHVtbnN9LCAke1Jlc291cmNlU2V0dGluZ3MuZXZlbnRXaWR0aH0pYCk7XG4gIC8vIH1cbn1cbiJdfQ==