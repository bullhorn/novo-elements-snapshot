// NG2
import { Component, Input, ViewEncapsulation } from '@angular/core';
// APP
import { BaseRenderer } from '../base-renderer';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/elements/dropdown";
import * as i2 from "novo-elements/elements/button";
import * as i3 from "novo-elements/elements/common";
import * as i4 from "@angular/common";
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
NovoDropdownCell.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownCell, deps: null, target: i0.ɵɵFactoryTarget.Component });
NovoDropdownCell.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoDropdownCell, selector: "novo-dropdown-cell", inputs: { meta: "meta", value: "value" }, usesInheritance: true, ngImport: i0, template: `
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
  `, isInline: true, styles: ["novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon],.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]{font-size:inherit;color:inherit;border:none;background:inherit;text-transform:inherit;border-radius:0;border-bottom:1px solid #dedede;padding:0;width:100%!important;max-width:200px}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] i{font-size:10px;margin-right:-5px;color:#a0a0a0}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] .flex-wrapper{justify-content:space-between}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:active,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon]:hover{background:inherit;box-shadow:none}novo-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span,.novo-table-dropdown-cell>novo-dropdown>button[theme][theme=secondary][icon] span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell list,.novo-table-dropdown-cell list{max-height:400px;display:block;overflow:auto;padding:5px 0}novo-dropdown-cell item,.novo-table-dropdown-cell item{height:30px!important;padding:0 16px!important}novo-dropdown-cell item span,.novo-table-dropdown-cell item span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;max-width:80%}novo-dropdown-cell item.active,.novo-table-dropdown-cell item.active{font-weight:500}novo-dropdown-cell dropdown-item-header,.novo-table-dropdown-cell dropdown-item-header{padding:0 10px!important}\n"], components: [{ type: i1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i1.NovoDropdownListElement, selector: "list" }, { type: i1.NovoDropDownItemHeaderElement, selector: "dropdown-item-header" }, { type: i1.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }], directives: [{ type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownCell, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL2Ryb3Bkb3duLWNlbGwvRHJvcGRvd25DZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFrQ2hELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZO0lBSWhELElBQ0ksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRO1FBQ2IsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OEdBdkJVLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLDJIQXhCakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzRGQUlVLGdCQUFnQjtrQkExQjVCLFNBQVM7K0JBQ0Usb0JBQW9CLFlBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVCxpQkFFYyxpQkFBaUIsQ0FBQyxJQUFJOzhCQUlyQyxJQUFJO3NCQURILEtBQUs7Z0JBSUYsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IEJhc2VSZW5kZXJlciB9IGZyb20gJy4uL2Jhc2UtcmVuZGVyZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3ZvRHJvcGRvd25DZWxsQ29uZmlnIHtcbiAgY2F0ZWdvcnk/OiBzdHJpbmc7XG4gIGNhbGxiYWNrPzogRnVuY3Rpb247XG4gIG9wdGlvbnM6ICh7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZT86IHN0cmluZzsgY2FsbGJhY2s/OiBGdW5jdGlvbiB9IHwgc3RyaW5nKVtdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLWRyb3Bkb3duLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWRyb3Bkb3duIHBhcmVudFNjcm9sbFNlbGVjdG9yPVwiLnRhYmxlLWNvbnRhaW5lclwiIGNvbnRhaW5lckNsYXNzPVwibm92by10YWJsZS1kcm9wZG93bi1jZWxsXCI+XG4gICAgICA8bm92by1idXR0b24gdHlwZT1cImJ1dHRvblwiIHRoZW1lPVwic2Vjb25kYXJ5XCIgaWNvbj1cImNvbGxhcHNlXCIgaW52ZXJzZT5cbiAgICAgICAgPHNwYW4gZGF0YS1hdXRvbWF0aW9uLWlkPVwibm92by1kcm9wZG93bi1jZWxsLXZhbHVlXCI+e3sgdmFsdWUgfX08L3NwYW4+XG4gICAgICA8L25vdm8tYnV0dG9uPlxuICAgICAgPGxpc3Q+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbmZpZyBvZiBtZXRhLmRyb3Bkb3duQ2VsbENvbmZpZzsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgIDxkcm9wZG93bi1pdGVtLWhlYWRlciAqbmdJZj1cImNvbmZpZy5jYXRlZ29yeVwiPnt7IGNvbmZpZy5jYXRlZ29yeSB9fTwvZHJvcGRvd24taXRlbS1oZWFkZXI+XG4gICAgICAgICAgPGl0ZW1cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLm9wdGlvbnNcIlxuICAgICAgICAgICAgKGFjdGlvbik9XCJvbkNsaWNrKGNvbmZpZywgb3B0aW9uLCBvcHRpb24udmFsdWUpXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiKG9wdGlvbiB8fCBvcHRpb24udmFsdWUpID09PSB2YWx1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbCB8fCBvcHRpb25cIj57eyBvcHRpb24ubGFiZWwgfHwgb3B0aW9uIH19PC9zcGFuPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCIob3B0aW9uIHx8IG9wdGlvbi52YWx1ZSkgPT09IHZhbHVlXCIgY2xhc3M9XCJiaGktY2hlY2tcIj48L2k+XG4gICAgICAgICAgPC9pdGVtPlxuICAgICAgICAgIDxociAqbmdJZj1cImkgPCBtZXRhLmRyb3Bkb3duQ2VsbENvbmZpZy5sZW5ndGggLSAxXCIgLz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2xpc3Q+XG4gICAgPC9ub3ZvLWRyb3Bkb3duPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9Ecm9wZG93bkNlbGwuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRHJvcGRvd25DZWxsIGV4dGVuZHMgQmFzZVJlbmRlcmVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWV0YTogYW55O1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHY7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGZvciBhbmQgZml4IGJhZCBjb25maWdcbiAgICBpZiAoIXRoaXMubWV0YS5kcm9wZG93bkNlbGxDb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBcImRyb3Bkb3duQ2VsbENvbmZpZ1wiIG9uIHRoZSBjb2x1bW4gc2V0dXAnKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbGljayhjb25maWcsIG9wdGlvbiwgdmFsdWUpOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IG9wdGlvbi5jYWxsYmFjayB8fCBjb25maWcuY2FsbGJhY2s7XG4gICAgY2FsbGJhY2sodGhpcy5kYXRhLCB2YWx1ZSB8fCBvcHRpb24pO1xuICB9XG59XG4iXX0=