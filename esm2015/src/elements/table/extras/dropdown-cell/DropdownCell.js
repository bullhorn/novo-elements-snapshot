// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
export class NovoDropdownCell extends BaseRenderer {
    set value(v) {
        this._value = v;
    }
    get value() {
        return this._value;
    }
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
      <novo-button type="button" theme="secondary" icon="collapse" inverse>
        <span data-automation-id="novo-dropdown-cell-value">{{ value }}</span>
      </novo-button>
      <list>
        <ng-container *ngFor="let config of meta.dropdownCellConfig; let i = index">
          <dropdown-item-header *ngIf="config.category">{{ config.category }}</dropdown-item-header>
          <item
            *ngFor="let option of config.options"
            (action)="onClick(config, option, option.value)"
            [class.active]="(option || option.value) === value"
          >
            <span [attr.data-automation-id]="option.label || option">{{ option.label || option }}</span>
            <i *ngIf="(option || option.value) === value" class="bhi-check"></i>
          </item>
          <hr *ngIf="i < meta.dropdownCellConfig.length - 1" />
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9kcm9wZG93bi1jZWxsL0Ryb3Bkb3duQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWdDN0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7SUFJaEQsSUFDSSxLQUFLLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLFFBQVE7UUFDYiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUs7UUFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUEvQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7YUFDRjs7O21CQUVFLEtBQUs7b0JBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4uL2Jhc2UtcmVuZGVyZXIvQmFzZVJlbmRlcmVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm92b0Ryb3Bkb3duQ2VsbENvbmZpZyB7XG4gIGNhdGVnb3J5Pzogc3RyaW5nO1xuICBjYWxsYmFjaz86IEZ1bmN0aW9uO1xuICBvcHRpb25zOiAoeyBsYWJlbD86IHN0cmluZzsgdmFsdWU/OiBzdHJpbmc7IGNhbGxiYWNrPzogRnVuY3Rpb24gfSB8IHN0cmluZylbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kcm9wZG93bi1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1kcm9wZG93biBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi50YWJsZS1jb250YWluZXJcIiBjb250YWluZXJDbGFzcz1cIm5vdm8tdGFibGUtZHJvcGRvd24tY2VsbFwiPlxuICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInNlY29uZGFyeVwiIGljb249XCJjb2xsYXBzZVwiIGludmVyc2U+XG4gICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZHJvcGRvd24tY2VsbC12YWx1ZVwiPnt7IHZhbHVlIH19PC9zcGFuPlxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDxsaXN0PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb25maWcgb2YgbWV0YS5kcm9wZG93bkNlbGxDb25maWc7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICA8ZHJvcGRvd24taXRlbS1oZWFkZXIgKm5nSWY9XCJjb25maWcuY2F0ZWdvcnlcIj57eyBjb25maWcuY2F0ZWdvcnkgfX08L2Ryb3Bkb3duLWl0ZW0taGVhZGVyPlxuICAgICAgICAgIDxpdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5vcHRpb25zXCJcbiAgICAgICAgICAgIChhY3Rpb24pPVwib25DbGljayhjb25maWcsIG9wdGlvbiwgb3B0aW9uLnZhbHVlKVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWwgfHwgb3B0aW9uXCI+e3sgb3B0aW9uLmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiKG9wdGlvbiB8fCBvcHRpb24udmFsdWUpID09PSB2YWx1ZVwiIGNsYXNzPVwiYmhpLWNoZWNrXCI+PC9pPlxuICAgICAgICAgIDwvaXRlbT5cbiAgICAgICAgICA8aHIgKm5nSWY9XCJpIDwgbWV0YS5kcm9wZG93bkNlbGxDb25maWcubGVuZ3RoIC0gMVwiIC8+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9saXN0PlxuICAgIDwvbm92by1kcm9wZG93bj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3Bkb3duQ2VsbCBleHRlbmRzIEJhc2VSZW5kZXJlciBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG1ldGE6IGFueTtcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBmb3IgYW5kIGZpeCBiYWQgY29uZmlnXG4gICAgaWYgKCF0aGlzLm1ldGEuZHJvcGRvd25DZWxsQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXCJkcm9wZG93bkNlbGxDb25maWdcIiBvbiB0aGUgY29sdW1uIHNldHVwJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2xpY2soY29uZmlnLCBvcHRpb24sIHZhbHVlKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBvcHRpb24uY2FsbGJhY2sgfHwgY29uZmlnLmNhbGxiYWNrO1xuICAgIGNhbGxiYWNrKHRoaXMuZGF0YSwgdmFsdWUgfHwgb3B0aW9uKTtcbiAgfVxufVxuIl19