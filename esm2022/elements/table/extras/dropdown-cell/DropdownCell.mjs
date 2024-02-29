// NG2
import { Component, Input, ViewEncapsulation } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "novo-elements/elements/dropdown";
import * as i3 from "novo-elements/elements/button";
import * as i4 from "novo-elements/elements/common";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDropdownCell, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: NovoDropdownCell, selector: "novo-dropdown-cell", inputs: { meta: "meta", value: "value" }, usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, styles: ["novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon],.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]{font-size:inherit;color:inherit;border:none;background:inherit;text-transform:inherit;border-radius:0;border-bottom:1px solid #dedede;padding:0;width:100%!important;max-width:200px}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i{font-size:10px;margin-right:-5px;color:#a0a0a0}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper{justify-content:space-between}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover{background:inherit;box-shadow:none}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell list,.novo-table-dropdown-cell list{max-height:400px;display:block;overflow:auto;padding:5px 0}novo-dropdown-cell item,.novo-table-dropdown-cell item{height:30px!important;padding:0 16px!important}novo-dropdown-cell item span,.novo-table-dropdown-cell item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell item.active,.novo-table-dropdown-cell item.active{font-weight:500}novo-dropdown-cell dropdown-item-header,.novo-table-dropdown-cell dropdown-item-header{padding:0 10px!important}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i2.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }, { kind: "component", type: i2.NovoDropdownListElement, selector: "list" }, { kind: "component", type: i2.NovoDropDownItemHeaderElement, selector: "dropdown-item-header" }, { kind: "component", type: i3.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { kind: "directive", type: i4.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoDropdownCell, decorators: [{
            type: Component,
            args: [{ selector: 'novo-dropdown-cell', template: `
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
  `, encapsulation: ViewEncapsulation.None, styles: ["novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon],.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]{font-size:inherit;color:inherit;border:none;background:inherit;text-transform:inherit;border-radius:0;border-bottom:1px solid #dedede;padding:0;width:100%!important;max-width:200px}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i{font-size:10px;margin-right:-5px;color:#a0a0a0}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper{justify-content:space-between}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover{background:inherit;box-shadow:none}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell list,.novo-table-dropdown-cell list{max-height:400px;display:block;overflow:auto;padding:5px 0}novo-dropdown-cell item,.novo-table-dropdown-cell item{height:30px!important;padding:0 16px!important}novo-dropdown-cell item span,.novo-table-dropdown-cell item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell item.active,.novo-table-dropdown-cell item.active{font-weight:500}novo-dropdown-cell dropdown-item-header,.novo-table-dropdown-cell dropdown-item-header{padding:0 10px!important}\n"] }]
        }], propDecorators: { meta: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL2Ryb3Bkb3duLWNlbGwvRHJvcGRvd25DZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFrQ2hELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZO0lBSWhELElBQ0ksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRO1FBQ2IsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDSCxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSztRQUNsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OEdBdkJVLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLDJIQXhCakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzsyRkFJVSxnQkFBZ0I7a0JBMUI1QixTQUFTOytCQUNFLG9CQUFvQixZQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQsaUJBRWMsaUJBQWlCLENBQUMsSUFBSTs4QkFJckMsSUFBSTtzQkFESCxLQUFLO2dCQUlGLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gQVBQXG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tICcuLi9iYXNlLXJlbmRlcmVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm92b0Ryb3Bkb3duQ2VsbENvbmZpZyB7XG4gIGNhdGVnb3J5Pzogc3RyaW5nO1xuICBjYWxsYmFjaz86IEZ1bmN0aW9uO1xuICBvcHRpb25zOiAoeyBsYWJlbD86IHN0cmluZzsgdmFsdWU/OiBzdHJpbmc7IGNhbGxiYWNrPzogRnVuY3Rpb24gfSB8IHN0cmluZylbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbm92by1kcm9wZG93bi1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1kcm9wZG93biBwYXJlbnRTY3JvbGxTZWxlY3Rvcj1cIi50YWJsZS1jb250YWluZXJcIiBjb250YWluZXJDbGFzcz1cIm5vdm8tdGFibGUtZHJvcGRvd24tY2VsbFwiPlxuICAgICAgPG5vdm8tYnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aGVtZT1cInNlY29uZGFyeVwiIGljb249XCJjb2xsYXBzZVwiIGludmVyc2U+XG4gICAgICAgIDxzcGFuIGRhdGEtYXV0b21hdGlvbi1pZD1cIm5vdm8tZHJvcGRvd24tY2VsbC12YWx1ZVwiPnt7IHZhbHVlIH19PC9zcGFuPlxuICAgICAgPC9ub3ZvLWJ1dHRvbj5cbiAgICAgIDxsaXN0PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb25maWcgb2YgbWV0YS5kcm9wZG93bkNlbGxDb25maWc7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICA8ZHJvcGRvd24taXRlbS1oZWFkZXIgKm5nSWY9XCJjb25maWcuY2F0ZWdvcnlcIj57eyBjb25maWcuY2F0ZWdvcnkgfX08L2Ryb3Bkb3duLWl0ZW0taGVhZGVyPlxuICAgICAgICAgIDxpdGVtXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5vcHRpb25zXCJcbiAgICAgICAgICAgIChhY3Rpb24pPVwib25DbGljayhjb25maWcsIG9wdGlvbiwgb3B0aW9uLnZhbHVlKVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIFthdHRyLmRhdGEtYXV0b21hdGlvbi1pZF09XCJvcHRpb24ubGFiZWwgfHwgb3B0aW9uXCI+e3sgb3B0aW9uLmxhYmVsIHx8IG9wdGlvbiB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiKG9wdGlvbiB8fCBvcHRpb24udmFsdWUpID09PSB2YWx1ZVwiIGNsYXNzPVwiYmhpLWNoZWNrXCI+PC9pPlxuICAgICAgICAgIDwvaXRlbT5cbiAgICAgICAgICA8aHIgKm5nSWY9XCJpIDwgbWV0YS5kcm9wZG93bkNlbGxDb25maWcubGVuZ3RoIC0gMVwiIC8+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9saXN0PlxuICAgIDwvbm92by1kcm9wZG93bj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vRHJvcGRvd25DZWxsLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0Ryb3Bkb3duQ2VsbCBleHRlbmRzIEJhc2VSZW5kZXJlciBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG1ldGE6IGFueTtcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBmb3IgYW5kIGZpeCBiYWQgY29uZmlnXG4gICAgaWYgKCF0aGlzLm1ldGEuZHJvcGRvd25DZWxsQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXCJkcm9wZG93bkNlbGxDb25maWdcIiBvbiB0aGUgY29sdW1uIHNldHVwJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2xpY2soY29uZmlnLCBvcHRpb24sIHZhbHVlKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBvcHRpb24uY2FsbGJhY2sgfHwgY29uZmlnLmNhbGxiYWNrO1xuICAgIGNhbGxiYWNrKHRoaXMuZGF0YSwgdmFsdWUgfHwgb3B0aW9uKTtcbiAgfVxufVxuIl19