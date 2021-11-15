// NG2
import { Component, HostBinding, Input } from '@angular/core';
export class NovoFlexElement {
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
        return 'flex';
    }
}
NovoFlexElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-flex,novo-row',
                template: ` <ng-content></ng-content> `
            },] }
];
NovoFlexElement.propDecorators = {
    display: [{ type: HostBinding, args: ['style.display',] }],
    direction: [{ type: HostBinding, args: ['style.flex-direction',] }, { type: Input }],
    align: [{ type: HostBinding, args: ['style.align-items',] }, { type: Input }],
    justify: [{ type: HostBinding, args: ['style.justify-content',] }, { type: Input }],
    wrap: [{ type: HostBinding, args: ['style.flex-wrap',] }, { type: Input }],
    gap: [{ type: HostBinding, args: ['style.gap',] }, { type: Input }]
};
export class NovoStackElement extends NovoFlexElement {
    constructor() {
        super(...arguments);
        this.direction = 'column';
        this.align = 'start';
    }
}
NovoStackElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-stack,novo-column',
                template: ` <ng-content></ng-content> `
            },] }
];
NovoStackElement.propDecorators = {
    direction: [{ type: HostBinding, args: ['style.flex-direction',] }, { type: Input }],
    align: [{ type: HostBinding, args: ['style.align-items',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxleC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9mbGV4L0ZsZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU05RCxNQUFNLE9BQU8sZUFBZTtJQUo1QjtRQVlFLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFJMUIsVUFBSyxHQUFXLFFBQVEsQ0FBQztRQUl6QixZQUFPLEdBQVcsWUFBWSxDQUFDO1FBSS9CLFNBQUksR0FBVyxRQUFRLENBQUM7UUFNeEIsc0JBQXNCO1FBQ3RCLGdIQUFnSDtRQUNoSCxJQUFJO0lBQ04sQ0FBQztJQTVCQyxJQUNJLE9BQU87UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLDZCQUE2QjthQUN4Qzs7O3NCQUVFLFdBQVcsU0FBQyxlQUFlO3dCQUszQixXQUFXLFNBQUMsc0JBQXNCLGNBQ2xDLEtBQUs7b0JBR0wsV0FBVyxTQUFDLG1CQUFtQixjQUMvQixLQUFLO3NCQUdMLFdBQVcsU0FBQyx1QkFBdUIsY0FDbkMsS0FBSzttQkFHTCxXQUFXLFNBQUMsaUJBQWlCLGNBQzdCLEtBQUs7a0JBR0wsV0FBVyxTQUFDLFdBQVcsY0FDdkIsS0FBSzs7QUFZUixNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQUpyRDs7UUFPRSxjQUFTLEdBQVcsUUFBUSxDQUFDO1FBSTdCLFVBQUssR0FBVyxPQUFPLENBQUM7SUFDMUIsQ0FBQzs7O1lBWkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7Ozt3QkFFRSxXQUFXLFNBQUMsc0JBQXNCLGNBQ2xDLEtBQUs7b0JBR0wsV0FBVyxTQUFDLG1CQUFtQixjQUMvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWZsZXgsbm92by1yb3cnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9GbGV4RWxlbWVudCB7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpXG4gIGdldCBkaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdmbGV4JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKVxuICBASW5wdXQoKVxuICBkaXJlY3Rpb246IHN0cmluZyA9ICdyb3cnO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuYWxpZ24taXRlbXMnKVxuICBASW5wdXQoKVxuICBhbGlnbjogc3RyaW5nID0gJ2NlbnRlcic7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5qdXN0aWZ5LWNvbnRlbnQnKVxuICBASW5wdXQoKVxuICBqdXN0aWZ5OiBzdHJpbmcgPSAnZmxleC1zdGFydCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LXdyYXAnKVxuICBASW5wdXQoKVxuICB3cmFwOiBzdHJpbmcgPSAnbm93cmFwJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmdhcCcpXG4gIEBJbnB1dCgpXG4gIGdhcDogc3RyaW5nO1xuXG4gIC8vIGdldCBoYl9ncmlkQ29scygpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgcmVwZWF0KCR7dGhpcy5jb2x1bW5zfSwgJHtSZXNvdXJjZVNldHRpbmdzLmV2ZW50V2lkdGh9KWApO1xuICAvLyB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tc3RhY2ssbm92by1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TdGFja0VsZW1lbnQgZXh0ZW5kcyBOb3ZvRmxleEVsZW1lbnQge1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJylcbiAgQElucHV0KClcbiAgZGlyZWN0aW9uOiBzdHJpbmcgPSAnY29sdW1uJztcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmFsaWduLWl0ZW1zJylcbiAgQElucHV0KClcbiAgYWxpZ246IHN0cmluZyA9ICdzdGFydCc7XG59XG4iXX0=