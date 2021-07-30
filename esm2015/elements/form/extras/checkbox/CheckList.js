// NG2
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { Helpers } from '../../../../utils/Helpers';
// Value accessor for the component (supports ngModel)
const CHECKLIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCheckListElement),
    multi: true,
};
export class NovoCheckListElement {
    constructor() {
        this.onSelect = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.setModel();
        this.setupOptions();
    }
    select(event, item) {
        Helpers.swallowEvent(event);
        if (!this.disabled) {
            item.checked = !item.checked;
            this.model = this._options.filter((checkBox) => checkBox.checked).map((x) => x.value);
            this.onModelChange(this.model.length > 0 ? this.model : '');
            this.onSelect.emit({ selected: this.model });
        }
    }
    setupOptions() {
        this.options = this.options || [];
        this._options = [];
        if (this.options.length && !this.options[0].value) {
            this.options.forEach((option) => {
                const formattedOption = {
                    value: option,
                    label: option,
                    checked: this.model && this.model.length && this.model.indexOf(option.value) !== -1,
                };
                this._options.push(formattedOption);
            });
        }
        else {
            this.options.forEach((option) => {
                const formattedOption = option;
                formattedOption.checked = this.model && this.model.length && this.model.indexOf(option.value) !== -1;
                this._options.push(formattedOption);
            });
        }
    }
    setModel() {
        const checkedOptions = this.options.filter((checkBox) => checkBox.checked).map((x) => x.value);
        this.writeValue(checkedOptions);
    }
    writeValue(model) {
        this.model = model || [];
        if (model) {
            this.setupOptions();
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
}
NovoCheckListElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-check-list',
                providers: [CHECKLIST_VALUE_ACCESSOR],
                template: `
    <div
      class="check-box-group"
      *ngFor="let option of _options; let i = index"
      [ngClass]="{ checked: option.checked }"
      [class.disabled]="disabled"
      [attr.data-automation-id]="option.label"
    >
      <input
        [name]="name"
        type="checkbox"
        [ngModel]="option.checked"
        [attr.id]="name + i"
        [value]="option.checked"
        (change)="select($event, option)"
        [disabled]="disabled"
      />
      <label [attr.for]="name + i" (click)="select($event, option)">
        <i [ngClass]="{ 'bhi-checkbox-empty': !option.checked, 'bhi-checkbox-filled': option.checked }"></i>
        <span>{{ option.label }}</span>
      </label>
    </div>
  `
            },] }
];
NovoCheckListElement.propDecorators = {
    name: [{ type: Input }],
    options: [{ type: Input }],
    disabled: [{ type: Input }],
    onSelect: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tMaXN0LmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9mb3JtL2V4dHJhcy9jaGVja2JveC9DaGVja0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxNQUFNO0FBQ04sT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXBELHNEQUFzRDtBQUN0RCxNQUFNLHdCQUF3QixHQUFHO0lBQy9CLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUE2QkYsTUFBTSxPQUFPLG9CQUFvQjtJQTNCakM7UUFtQ0UsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSWpELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ25DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBNkR0QyxDQUFDO0lBM0RDLFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDaEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFH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QyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7OztZQXBHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCVDthQUNGOzs7bUJBRUUsS0FBSztzQkFFTCxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9IZWxwZXJzJztcclxuXHJcbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxyXG5jb25zdCBDSEVDS0xJU1RfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm92b0NoZWNrTGlzdEVsZW1lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdub3ZvLWNoZWNrLWxpc3QnLFxyXG4gIHByb3ZpZGVyczogW0NIRUNLTElTVF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3M9XCJjaGVjay1ib3gtZ3JvdXBcIlxyXG4gICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIF9vcHRpb25zOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgW25nQ2xhc3NdPVwieyBjaGVja2VkOiBvcHRpb24uY2hlY2tlZCB9XCJcclxuICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cIm9wdGlvbi5sYWJlbFwiXHJcbiAgICA+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIFtuYW1lXT1cIm5hbWVcIlxyXG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgW25nTW9kZWxdPVwib3B0aW9uLmNoZWNrZWRcIlxyXG4gICAgICAgIFthdHRyLmlkXT1cIm5hbWUgKyBpXCJcclxuICAgICAgICBbdmFsdWVdPVwib3B0aW9uLmNoZWNrZWRcIlxyXG4gICAgICAgIChjaGFuZ2UpPVwic2VsZWN0KCRldmVudCwgb3B0aW9uKVwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgLz5cclxuICAgICAgPGxhYmVsIFthdHRyLmZvcl09XCJuYW1lICsgaVwiIChjbGljayk9XCJzZWxlY3QoJGV2ZW50LCBvcHRpb24pXCI+XHJcbiAgICAgICAgPGkgW25nQ2xhc3NdPVwieyAnYmhpLWNoZWNrYm94LWVtcHR5JzogIW9wdGlvbi5jaGVja2VkLCAnYmhpLWNoZWNrYm94LWZpbGxlZCc6IG9wdGlvbi5jaGVja2VkIH1cIj48L2k+XHJcbiAgICAgICAgPHNwYW4+e3sgb3B0aW9uLmxhYmVsIH19PC9zcGFuPlxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9DaGVja0xpc3RFbGVtZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XHJcbiAgQElucHV0KClcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KClcclxuICBvcHRpb25zOiBBcnJheTxhbnk+O1xyXG4gIEBJbnB1dCgpXHJcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpXHJcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBfb3B0aW9uczogQXJyYXk8YW55PjtcclxuICBtb2RlbDogYW55O1xyXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZXRNb2RlbCgpO1xyXG4gICAgdGhpcy5zZXR1cE9wdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdChldmVudCwgaXRlbSkge1xyXG4gICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLl9vcHRpb25zLmZpbHRlcigoY2hlY2tCb3gpID0+IGNoZWNrQm94LmNoZWNrZWQpLm1hcCgoeCkgPT4geC52YWx1ZSk7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLm1vZGVsLmxlbmd0aCA+IDAgPyB0aGlzLm1vZGVsIDogJycpO1xyXG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBzZWxlY3RlZDogdGhpcy5tb2RlbCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldHVwT3B0aW9ucygpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCBbXTtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoICYmICF0aGlzLm9wdGlvbnNbMF0udmFsdWUpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZE9wdGlvbiA9IHtcclxuICAgICAgICAgIHZhbHVlOiBvcHRpb24sXHJcbiAgICAgICAgICBsYWJlbDogb3B0aW9uLFxyXG4gICAgICAgICAgY2hlY2tlZDogdGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCAmJiB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9vcHRpb25zLnB1c2goZm9ybWF0dGVkT3B0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkT3B0aW9uID0gb3B0aW9uO1xyXG4gICAgICAgIGZvcm1hdHRlZE9wdGlvbi5jaGVja2VkID0gdGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCAmJiB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTE7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5wdXNoKGZvcm1hdHRlZE9wdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0TW9kZWwoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5maWx0ZXIoKGNoZWNrQm94KSA9PiBjaGVja0JveC5jaGVja2VkKS5tYXAoKHgpID0+IHgudmFsdWUpO1xyXG4gICAgdGhpcy53cml0ZVZhbHVlKGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsIHx8IFtdO1xyXG4gICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgIHRoaXMuc2V0dXBPcHRpb25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICB9XHJcbn1cclxuIl19