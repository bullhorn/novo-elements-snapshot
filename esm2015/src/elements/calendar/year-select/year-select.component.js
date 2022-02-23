// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getYear } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
export class NovoYearSelectElement {
    constructor(labels) {
        this.labels = labels;
        this.activeDate = new Date();
        this.selected = [];
        // Select callback for output
        this.select = new EventEmitter(false);
        // List of all years (generated in ngOnInit)
        this.years = [];
    }
    ngOnInit() {
        // Determine the year array
        const now = new Date();
        const start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
        const end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;
        const years = [];
        for (let i = start; i <= end; i++) {
            years.push(i);
        }
        this.years = years.reverse();
    }
    onSelect(event, year) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, year });
    }
    _isActive(year) {
        return this.activeDate && year === getYear(this.activeDate);
    }
    _isSelected(year) {
        return this.selected && year === getYear(this.selected[0]);
    }
}
NovoYearSelectElement.decorators = [
    { type: Component, args: [{
                selector: 'novo-year-select',
                template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:grid;flex:1;grid-template-columns:1fr 1fr 1fr 1fr;max-height:320px;overflow-y:scroll}:host .year{border-radius:.4rem;cursor:pointer;padding:1rem}:host .year.selected,:host .year:hover{background-color:#4a89dc;color:#fff}"]
            },] }
];
NovoYearSelectElement.ctorParameters = () => [
    { type: NovoLabelService }
];
NovoYearSelectElement.propDecorators = {
    minYear: [{ type: Input }],
    maxYear: [{ type: Input }],
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    select: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzLyIsInNvdXJjZXMiOlsic3JjL2VsZW1lbnRzL2NhbGVuZGFyL3llYXItc2VsZWN0L3llYXItc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBU3hFLE1BQU0sT0FBTyxxQkFBcUI7SUFpQmhDLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBVjNDLGVBQVUsR0FBYSxJQUFJLElBQUksRUFBRSxDQUFDO1FBRWxDLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFDMUIsNkJBQTZCO1FBRTdCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEQsNENBQTRDO1FBQzVDLFVBQUssR0FBZSxFQUFFLENBQUM7SUFFdUIsQ0FBQztJQUUvQyxRQUFRO1FBQ04sMkJBQTJCO1FBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUM1RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWSxFQUFFLElBQVk7UUFDakMsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsMk1BQTJDO2dCQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztZQVJRLGdCQUFnQjs7O3NCQVV0QixLQUFLO3NCQUVMLEtBQUs7eUJBR0wsS0FBSzt1QkFFTCxLQUFLO3FCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRZZWFyIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgdHlwZSB7IERhdGVMaWtlIH0gZnJvbSAnLi4vLi4vZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXllYXItc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3llYXItc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4veWVhci1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9ZZWFyU2VsZWN0RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG1pblllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZURhdGU6IERhdGVMaWtlID0gbmV3IERhdGUoKTtcbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IERhdGVMaWtlW10gPSBbXTtcbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvLyBMaXN0IG9mIGFsbCB5ZWFycyAoZ2VuZXJhdGVkIGluIG5nT25Jbml0KVxuICB5ZWFyczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSB5ZWFyIGFycmF5XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMubWluWWVhciA/IE51bWJlcih0aGlzLm1pblllYXIpIDogbm93LmdldEZ1bGxZZWFyKCkgLSAxMDA7XG4gICAgY29uc3QgZW5kID0gdGhpcy5tYXhZZWFyID8gTnVtYmVyKHRoaXMubWF4WWVhcikgOiBub3cuZ2V0RnVsbFllYXIoKSArIDEwO1xuICAgIGNvbnN0IHllYXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICB5ZWFycy5wdXNoKGkpO1xuICAgIH1cbiAgICB0aGlzLnllYXJzID0geWVhcnMucmV2ZXJzZSgpO1xuICB9XG5cbiAgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCB5ZWFyOiBudW1iZXIpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3QubmV4dCh7IGV2ZW50LCB5ZWFyIH0pO1xuICB9XG5cbiAgX2lzQWN0aXZlKHllYXI6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZURhdGUgJiYgeWVhciA9PT0gZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgX2lzU2VsZWN0ZWQoeWVhcjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgeWVhciA9PT0gZ2V0WWVhcih0aGlzLnNlbGVjdGVkWzBdKTtcbiAgfVxufVxuIl19