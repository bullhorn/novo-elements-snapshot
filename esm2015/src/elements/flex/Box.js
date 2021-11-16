// NG2
import { Component, HostBinding, Input } from '@angular/core';
export class NovoBoxElement {
    constructor() {
        this.direction = 'row';
        this.align = 'center';
        this.justify = 'flex-start';
        this.wrap = 'nowrap';
        this.gap = 'nowrap';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm94LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2ZsZXgvQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNOUQsTUFBTSxPQUFPLGNBQWM7SUFKM0I7UUFZRSxjQUFTLEdBQVcsS0FBSyxDQUFDO1FBSTFCLFVBQUssR0FBVyxRQUFRLENBQUM7UUFJekIsWUFBTyxHQUFXLFlBQVksQ0FBQztRQUkvQixTQUFJLEdBQVcsUUFBUSxDQUFDO1FBSXhCLFFBQUcsR0FBVyxRQUFRLENBQUM7UUFFdkIsc0JBQXNCO1FBQ3RCLGdIQUFnSDtRQUNoSCxJQUFJO0lBQ04sQ0FBQztJQTVCQyxJQUNJLE9BQU87UUFDVCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUFSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7OztzQkFFRSxXQUFXLFNBQUMsZUFBZTt3QkFLM0IsV0FBVyxTQUFDLHNCQUFzQixjQUNsQyxLQUFLO29CQUdMLFdBQVcsU0FBQyxtQkFBbUIsY0FDL0IsS0FBSztzQkFHTCxXQUFXLFNBQUMsdUJBQXVCLGNBQ25DLEtBQUs7bUJBR0wsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixLQUFLO2tCQUdMLFdBQVcsU0FBQyxXQUFXLGNBQ3ZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tYm94JyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvQm94RWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpXG4gIGdldCBkaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdibG9jayc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJylcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAncm93JztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmFsaWduLWl0ZW1zJylcbiAgQElucHV0KClcbiAgYWxpZ246IHN0cmluZyA9ICdjZW50ZXInO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuanVzdGlmeS1jb250ZW50JylcbiAgQElucHV0KClcbiAganVzdGlmeTogc3RyaW5nID0gJ2ZsZXgtc3RhcnQnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC13cmFwJylcbiAgQElucHV0KClcbiAgd3JhcDogc3RyaW5nID0gJ25vd3JhcCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5nYXAnKVxuICBASW5wdXQoKVxuICBnYXA6IHN0cmluZyA9ICdub3dyYXAnO1xuXG4gIC8vIGdldCBoYl9ncmlkQ29scygpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgJHtSZXNvdXJjZVNldHRpbmdzLmV2ZW50V2lkdGh9KWApO1xuICAvLyB9XG59XG4iXX0=