// NG2
import { Component, Input } from '@angular/core';
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
  `, isInline: true, components: [{ type: i1.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple"], outputs: ["toggled"] }, { type: i2.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "disabled"] }, { type: i1.NovoDropdownListElement, selector: "list" }, { type: i1.NovoDropDownItemHeaderElement, selector: "dropdown-item-header" }, { type: i1.NovoItemElement, selector: "item", inputs: ["disabled", "keepOpen"], outputs: ["action"] }], directives: [{ type: i3.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDropdownCell, decorators: [{
            type: Component,
            args: [{
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
  `,
                }]
        }], propDecorators: { meta: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcGRvd25DZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdGFibGUvZXh0cmFzL2Ryb3Bkb3duLWNlbGwvRHJvcGRvd25DZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFnQ2hELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZO0lBSWhELElBQ0ksS0FBSyxDQUFDLENBQU07UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRO1FBQ2IsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OEdBdkJVLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLDJIQXRCakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzRGQUVVLGdCQUFnQjtrQkF4QjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtpQkFDRjs4QkFHQyxJQUFJO3NCQURILEtBQUs7Z0JBSUYsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEFQUFxuaW1wb3J0IHsgQmFzZVJlbmRlcmVyIH0gZnJvbSAnLi4vYmFzZS1yZW5kZXJlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU5vdm9Ecm9wZG93bkNlbGxDb25maWcge1xuICBjYXRlZ29yeT86IHN0cmluZztcbiAgY2FsbGJhY2s/OiBGdW5jdGlvbjtcbiAgb3B0aW9uczogKHsgbGFiZWw/OiBzdHJpbmc7IHZhbHVlPzogc3RyaW5nOyBjYWxsYmFjaz86IEZ1bmN0aW9uIH0gfCBzdHJpbmcpW107XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8tZHJvcGRvd24tY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tZHJvcGRvd24gcGFyZW50U2Nyb2xsU2VsZWN0b3I9XCIudGFibGUtY29udGFpbmVyXCIgY29udGFpbmVyQ2xhc3M9XCJub3ZvLXRhYmxlLWRyb3Bkb3duLWNlbGxcIj5cbiAgICAgIDxub3ZvLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGhlbWU9XCJzZWNvbmRhcnlcIiBpY29uPVwiY29sbGFwc2VcIiBpbnZlcnNlPlxuICAgICAgICA8c3BhbiBkYXRhLWF1dG9tYXRpb24taWQ9XCJub3ZvLWRyb3Bkb3duLWNlbGwtdmFsdWVcIj57eyB2YWx1ZSB9fTwvc3Bhbj5cbiAgICAgIDwvbm92by1idXR0b24+XG4gICAgICA8bGlzdD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29uZmlnIG9mIG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgPGRyb3Bkb3duLWl0ZW0taGVhZGVyICpuZ0lmPVwiY29uZmlnLmNhdGVnb3J5XCI+e3sgY29uZmlnLmNhdGVnb3J5IH19PC9kcm9wZG93bi1pdGVtLWhlYWRlcj5cbiAgICAgICAgICA8aXRlbVxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcub3B0aW9uc1wiXG4gICAgICAgICAgICAoYWN0aW9uKT1cIm9uQ2xpY2soY29uZmlnLCBvcHRpb24sIG9wdGlvbi52YWx1ZSlcIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCIob3B0aW9uIHx8IG9wdGlvbi52YWx1ZSkgPT09IHZhbHVlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwib3B0aW9uLmxhYmVsIHx8IG9wdGlvblwiPnt7IG9wdGlvbi5sYWJlbCB8fCBvcHRpb24gfX08L3NwYW4+XG4gICAgICAgICAgICA8aSAqbmdJZj1cIihvcHRpb24gfHwgb3B0aW9uLnZhbHVlKSA9PT0gdmFsdWVcIiBjbGFzcz1cImJoaS1jaGVja1wiPjwvaT5cbiAgICAgICAgICA8L2l0ZW0+XG4gICAgICAgICAgPGhyICpuZ0lmPVwiaSA8IG1ldGEuZHJvcGRvd25DZWxsQ29uZmlnLmxlbmd0aCAtIDFcIiAvPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbGlzdD5cbiAgICA8L25vdm8tZHJvcGRvd24+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Ecm9wZG93bkNlbGwgZXh0ZW5kcyBCYXNlUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBtZXRhOiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgZm9yIGFuZCBmaXggYmFkIGNvbmZpZ1xuICAgIGlmICghdGhpcy5tZXRhLmRyb3Bkb3duQ2VsbENvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFwiZHJvcGRvd25DZWxsQ29uZmlnXCIgb24gdGhlIGNvbHVtbiBzZXR1cCcpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrKGNvbmZpZywgb3B0aW9uLCB2YWx1ZSk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gb3B0aW9uLmNhbGxiYWNrIHx8IGNvbmZpZy5jYWxsYmFjaztcbiAgICBjYWxsYmFjayh0aGlzLmRhdGEsIHZhbHVlIHx8IG9wdGlvbik7XG4gIH1cbn1cbiJdfQ==