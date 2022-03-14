// NG2
import { Component, Input } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer/BaseRenderer';
export class NovoDropdownCell extends BaseRenderer {
    set value(v) {
        this._value = v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9kcm9wZG93bi1jZWxsL0Ryb3Bkb3duQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWdDN0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7SUFJaEQsSUFDSSxLQUFLLENBQUMsQ0FBTTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxRQUFRO1FBQ2IsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO2FBQ0Y7OzttQkFFRSxLQUFLO29CQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLi9iYXNlLXJlbmRlcmVyL0Jhc2VSZW5kZXJlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vdm9Ecm9wZG93bkNlbGxDb25maWcge1xuICBjYXRlZ29yeT86IHN0cmluZztcbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbiAgb3B0aW9uczogKHsgbGFiZWw/OiBzdHJpbmc7IHZhbHVlPzogc3RyaW5nOyBjYWxsYmFjaz86IEZ1bmN0aW9uIH0gfCBzdHJpbmcpW107XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZHJvcGRvd24tY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tZHJvcGRvd24gcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIudGFibGUtY29udGFpbmVyXCIgY29udGFpbmVyQ2xhc3M9XCJub3ZvLXRhYmxlLWRyb3Bkb3duLWNlbGxcIj5cbiAgICAgIDxub3ZvLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJzZWNvbmRhcnlcIiBpY29uPVwiY29sbGFwc2VcIiBpbnZlcnNlPlxuICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRyb3Bkb3duLWNlbGwtdmFsdWVcIj57eyB2YWx1ZSB9fTwvc3Bhbj5cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPGRyb3Bkb3duLWl0ZW0taGVhZGVyICpuZ0lmPVwiY29uZmlnLmNhdGVnb3J5XCI+e3sgY29uZmlnLmNhdGVnb3J5IH19PC9kcm9wZG93bi1pdGVtLWhlYWRlcj5cbiAgICAgICAgICA8aXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcub3B0aW9uc1wiXG4gICAgICAgICAgICAoYWN0aW9uKT1cIm9uQ2xpY2soY29uZmlnLCBvcHRpb24sIG9wdGlvbi52YWx1ZSlcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCIob3B0aW9uIHx8IG9wdGlvbi52YWx1ZSkgPT09IHZhbHVlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsIHx8IG9wdGlvblwiPnt7IG9wdGlvbi5sYWJlbCB8fCBvcHRpb24gfX08L3NwYW4+XG4gICAgICAgICAgICA8aSAqbmdJZj1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0+XG4gICAgICAgICAgPGhyICpuZ0lmPVwiaSA8IG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnLmxlbmd0aCAtIDFcIiAvPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGlzdD5cbiAgICA8L25vdm8tZHJvcGRvd24+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBtZXRhOiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBmb3IgYW5kIGZpeCBiYWQgY29uZmlnXG4gICAgaWYgKCF0aGlzLm1ldGEuZHJvcGRvd25DZWxsQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXCJkcm9wZG93bkNlbGxDb25maWdcIiBvbiB0aGUgY29sdW1uIHNldHVwJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2xpY2soY29uZmlnLCBvcHRpb24sIHZhbHVlKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBvcHRpb24uY2FsbGJhY2sgfHwgY29uZmlnLmNhbGxiYWNrO1xuICAgIGNhbGxiYWNrKHRoaXMuZGF0YSwgdmFsdWUgfHwgb3B0aW9uKTtcbiAgfVxufVxuIl19