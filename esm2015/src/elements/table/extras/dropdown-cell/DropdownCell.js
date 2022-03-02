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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9kcm9wZG93bi1jZWxsL0Ryb3Bkb3duQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWdDN0QsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7SUFNekMsUUFBUTtRQUNiLCtCQUErQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDckU7SUFDSCxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSztRQUNsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQXhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDthQUNGOzs7bUJBRUUsS0FBSztvQkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi4vYmFzZS1yZW5kZXJlci9CYXNlUmVuZGVyZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3ZvRHJvcGRvd25DZWxsQ29uZmlnIHtcbiAgY2F0ZWdvcnk/OiBzdHJpbmc7XG4gIGNhbGxiYWNrPzogRnVuY3Rpb247XG4gIG9wdGlvbnM6ICh7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZT86IHN0cmluZzsgY2FsbGJhY2s/OiBGdW5jdGlvbiB9IHwgc3RyaW5nKVtdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRyb3Bkb3duLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWRyb3Bkb3duIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLnRhYmxlLWNvbnRhaW5lclwiIGNvbnRhaW5lckNsYXNzPVwibm92by10YWJsZS1kcm9wZG93bi1jZWxsXCI+XG4gICAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwic2Vjb25kYXJ5XCIgaWNvbj1cImNvbGxhcHNlXCIgaW52ZXJzZT5cbiAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kcm9wZG93bi1jZWxsLXZhbHVlXCI+e3sgdmFsdWUgfX08L3NwYW4+XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgPGxpc3Q+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbmZpZyBvZiBtZXRhLmRyb3Bkb3duQ2VsbENvbmZpZzsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxkcm9wZG93bi1pdGVtLWhlYWRlciAqbmdJZj1cImNvbmZpZy5jYXRlZ29yeVwiPnt7IGNvbmZpZy5jYXRlZ29yeSB9fTwvZHJvcGRvd24taXRlbS1oZWFkZXI+XG4gICAgICAgICAgPGl0ZW1cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLm9wdGlvbnNcIlxuICAgICAgICAgICAgKGFjdGlvbik9XCJvbkNsaWNrKGNvbmZpZywgb3B0aW9uLCBvcHRpb24udmFsdWUpXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiKG9wdGlvbiB8fCBvcHRpb24udmFsdWUpID09PSB2YWx1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbCB8fCBvcHRpb25cIj57eyBvcHRpb24ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCIob3B0aW9uIHx8IG9wdGlvbi52YWx1ZSkgPT09IHZhbHVlXCIgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+XG4gICAgICAgICAgPC9pdGVtPlxuICAgICAgICAgIDxociAqbmdJZj1cImkgPCBtZXRhLmRyb3Bkb3duQ2VsbENvbmZpZy5sZW5ndGggLSAxXCIgLz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2xpc3Q+XG4gICAgPC9ub3ZvLWRyb3Bkb3duPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25DZWxsIGV4dGVuZHMgQmFzZVJlbmRlcmVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWV0YTogYW55O1xuICBASW5wdXQoKVxuICB2YWx1ZTogYW55O1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBmb3IgYW5kIGZpeCBiYWQgY29uZmlnXG4gICAgaWYgKCF0aGlzLm1ldGEuZHJvcGRvd25DZWxsQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXCJkcm9wZG93bkNlbGxDb25maWdcIiBvbiB0aGUgY29sdW1uIHNldHVwJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2xpY2soY29uZmlnLCBvcHRpb24sIHZhbHVlKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBvcHRpb24uY2FsbGJhY2sgfHwgY29uZmlnLmNhbGxiYWNrO1xuICAgIGNhbGxiYWNrKHRoaXMuZGF0YSwgdmFsdWUgfHwgb3B0aW9uKTtcbiAgfVxufVxuIl19