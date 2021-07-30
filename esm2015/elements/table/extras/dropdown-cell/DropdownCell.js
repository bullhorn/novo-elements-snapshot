// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
export class NovoDropdownCell extends BaseRenderer {
    ngOnInit() {
        // Check for and fix bad config
        if (!this.meta.dropdownCellConfig) {
            throw new Error('Missing "dropdownCellConfig" on the column setup');
        }
    }
    onClick(config, option, value) {
        const callback = option.callback || config.callback;
        callback(this.data, value || option);
    }
}
NovoDropdownCell.decorators = [
    { type: Component, args: [{
                selector: 'novo-dropdown-cell',
                template: `
    <novo-dropdown parentScrollSelector=".table-container" containerClass="novo-table-dropdown-cell">
      <button type="button" theme="secondary" icon="collapse" inverse>
        <span data-automation-id="novo-dropdown-cell-value">{{ value }}</span>
      </button>
      <list>
        <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
          <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
          <item *ngFor="let option of config.options" (action)="onClick(config, option, option.value)"
                [class.active]="(option || option.value) === value">
            <span [attr.data-automation-id]="option.label || option">{{ option.label || option }}</span>
            <i *ngIf="(option || option.value) === value" class="bhi-check"></i>
          </item>
          <hr *ngIf="i < meta.dropdownCellConfig.length - 1"/>
        </ng-container>
      </list>
    </novo-dropdown>
  `
            },] }
];
NovoDropdownCell.propDecorators = {
    meta: [{ type: Input }],
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90YWJsZS9leHRyYXMvZHJvcGRvd24tY2VsbC9Ecm9wZG93bkNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUE2QjdELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZO0lBTXpDLFFBQVE7UUFDYiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUs7UUFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUFyQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7YUFDRjs7O21CQUVFLEtBQUs7b0JBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4uL2Jhc2UtcmVuZGVyZXIvQmFzZVJlbmRlcmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vdm9Ecm9wZG93bkNlbGxDb25maWcge1xyXG4gIGNhdGVnb3J5Pzogc3RyaW5nO1xyXG4gIGNhbGxiYWNrPzogRnVuY3Rpb247XHJcbiAgb3B0aW9uczogKHsgbGFiZWw/OiBzdHJpbmc7IHZhbHVlPzogc3RyaW5nOyBjYWxsYmFjaz86IEZ1bmN0aW9uIH0gfCBzdHJpbmcpW107XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbm92by1kcm9wZG93bi1jZWxsJyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5vdm8tZHJvcGRvd24gcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIudGFibGUtY29udGFpbmVyXCIgY29udGFpbmVyQ2xhc3M9XCJub3ZvLXRhYmxlLWRyb3Bkb3duLWNlbGxcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJzZWNvbmRhcnlcIiBpY29uPVwiY29sbGFwc2VcIiBpbnZlcnNlPlxyXG4gICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZHJvcGRvd24tY2VsbC12YWx1ZVwiPnt7IHZhbHVlIH19PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGxpc3Q+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICA8ZHJvcGRvd24taXRlbS1oZWFkZXIgKm5nSWY9XCJjb25maWcuY2F0ZWdvcnlcIj57eyBjb25maWcuY2F0ZWdvcnkgfX08L2Ryb3Bkb3duLWl0ZW0taGVhZGVyPlxyXG4gICAgICAgICAgPGl0ZW0gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcub3B0aW9uc1wiIChhY3Rpb24pPVwib25DbGljayhjb25maWcsIG9wdGlvbiwgb3B0aW9uLnZhbHVlKVwiXHJcbiAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIj5cclxuICAgICAgICAgICAgPHNwYW4gW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbCB8fCBvcHRpb25cIj57eyBvcHRpb24ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8aSAqbmdJZj1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cclxuICAgICAgICAgIDwvaXRlbT5cclxuICAgICAgICAgIDxociAqbmdJZj1cImkgPCBtZXRhLmRyb3Bkb3duQ2VsbENvbmZpZy5sZW5ndGggLSAxXCIvPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2xpc3Q+XHJcbiAgICA8L25vdm8tZHJvcGRvd24+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpXHJcbiAgbWV0YTogYW55O1xyXG4gIEBJbnB1dCgpXHJcbiAgdmFsdWU6IGFueTtcclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gQ2hlY2sgZm9yIGFuZCBmaXggYmFkIGNvbmZpZ1xyXG4gICAgaWYgKCF0aGlzLm1ldGEuZHJvcGRvd25DZWxsQ29uZmlnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBcImRyb3Bkb3duQ2VsbENvbmZpZ1wiIG9uIHRoZSBjb2x1bW4gc2V0dXAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrKGNvbmZpZywgb3B0aW9uLCB2YWx1ZSk6IHZvaWQge1xyXG4gICAgY29uc3QgY2FsbGJhY2sgPSBvcHRpb24uY2FsbGJhY2sgfHwgY29uZmlnLmNhbGxiYWNrO1xyXG4gICAgY2FsbGJhY2sodGhpcy5kYXRhLCB2YWx1ZSB8fCBvcHRpb24pO1xyXG4gIH1cclxufVxyXG4iXX0=