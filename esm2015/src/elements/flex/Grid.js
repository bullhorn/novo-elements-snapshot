// NG2
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class NovoGridElement {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.direction = 'row';
        this.align = 'start';
        this.justify = 'flex-start';
        this.gap = 'nowrap';
        this.columns = '1';
    }
    get display() {
        return 'grid';
    }
    get hb_gridCols() {
        if (_isNumberValue(this.columns)) {
            return this._sanitizer.bypassSecurityTrustStyle(`repeat(${this.columns}, 1fr)`);
        }
        return this._sanitizer.bypassSecurityTrustStyle(`${this.columns}`);
    }
}
NovoGridElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-grid',
                template: ` <ng-content></ng-content> `
            },] }
];
NovoGridElement.ctorParameters = () => [
    { type: DomSanitizer }
];
NovoGridElement.propDecorators = {
    display: [{ type: HostBinding, args: ['style.display',] }],
    direction: [{ type: HostBinding, args: ['style.flex-direction',] }, { type: Input }],
    align: [{ type: HostBinding, args: ['style.align-items',] }, { type: Input }],
    justify: [{ type: HostBinding, args: ['style.justify-content',] }, { type: Input }],
    gap: [{ type: HostBinding, args: ['style.gap',] }, { type: Input }],
    columns: [{ type: Input }],
    hb_gridCols: [{ type: HostBinding, args: ['style.grid-template-columns',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mbGV4L0dyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBTXpELE1BQU0sT0FBTyxlQUFlO0lBaUMxQixZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBekI1QyxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxPQUFPLENBQUM7UUFJeEIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUkvQixRQUFHLEdBQVcsUUFBUSxDQUFDO1FBR3ZCLFlBQU8sR0FBVyxHQUFHLENBQUM7SUFVeUIsQ0FBQztJQWhDaEQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQXFCRCxJQUNJLFdBQVc7UUFDYixJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sUUFBUSxDQUFDLENBQUM7U0FDakY7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsNkJBQTZCO2FBQ3hDOzs7WUFMUSxZQUFZOzs7c0JBT2xCLFdBQVcsU0FBQyxlQUFlO3dCQUszQixXQUFXLFNBQUMsc0JBQXNCLGNBQ2xDLEtBQUs7b0JBR0wsV0FBVyxTQUFDLG1CQUFtQixjQUMvQixLQUFLO3NCQUdMLFdBQVcsU0FBQyx1QkFBdUIsY0FDbkMsS0FBSztrQkFHTCxXQUFXLFNBQUMsV0FBVyxjQUN2QixLQUFLO3NCQUdMLEtBQUs7MEJBR0wsV0FBVyxTQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgX2lzTnVtYmVyVmFsdWUgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWdyaWQnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9HcmlkRWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpXG4gIGdldCBkaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdncmlkJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKVxuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYWxpZ24taXRlbXMnKVxuICBASW5wdXQoKVxuICBhbGlnbjogc3RyaW5nID0gJ3N0YXJ0JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmp1c3RpZnktY29udGVudCcpXG4gIEBJbnB1dCgpXG4gIGp1c3RpZnk6IHN0cmluZyA9ICdmbGV4LXN0YXJ0JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdhcCcpXG4gIEBJbnB1dCgpXG4gIGdhcDogc3RyaW5nID0gJ25vd3JhcCc7XG5cbiAgQElucHV0KClcbiAgY29sdW1uczogc3RyaW5nID0gJzEnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJylcbiAgZ2V0IGhiX2dyaWRDb2xzKCkge1xuICAgIGlmIChfaXNOdW1iZXJWYWx1ZSh0aGlzLmNvbHVtbnMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgMWZyKWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgJHt0aGlzLmNvbHVtbnN9YCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cbn1cbiJdfQ==