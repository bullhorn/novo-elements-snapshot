import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil } from 'novo-elements/utils';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "@angular/common";
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
        return this.activeDate && year === DateUtil.getYear(this.activeDate);
    }
    _isSelected(year) {
        return this.selected && year === DateUtil.getYear(this.selected[0]);
    }
}
NovoYearSelectElement.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoYearSelectElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component });
NovoYearSelectElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoYearSelectElement, selector: "novo-year-select", inputs: { minYear: "minYear", maxYear: "maxYear", activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, ngImport: i0, template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;flex:1;max-height:320px;overflow-y:scroll}:host .year{padding:1rem;cursor:pointer;border-radius:.4rem}:host .year.selected{background-color:#4a89dc;color:#fff}:host .year:hover{background-color:#4a89dc;color:#fff}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoYearSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-year-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;flex:1;max-height:320px;overflow-y:scroll}:host .year{padding:1rem;cursor:pointer;border-radius:.4rem}:host .year.selected{background-color:#4a89dc;color:#fff}:host .year:hover{background-color:#4a89dc;color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; }, propDecorators: { minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIveWVhci1zZWxlY3QveWVhci1zZWxlY3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIveWVhci1zZWxlY3QveWVhci1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFRL0MsTUFBTSxPQUFPLHFCQUFxQjtJQWlCaEMsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFWM0MsZUFBVSxHQUFhLElBQUksSUFBSSxFQUFFLENBQUM7UUFFbEMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUMxQiw2QkFBNkI7UUFFN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCw0Q0FBNEM7UUFDNUMsVUFBSyxHQUFlLEVBQUUsQ0FBQztJQUV1QixDQUFDO0lBRS9DLFFBQVE7UUFDTiwyQkFBMkI7UUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQzVFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDekUsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFZLEVBQUUsSUFBWTtRQUNqQywrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDcEIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDOzttSEExQ1UscUJBQXFCO3VHQUFyQixxQkFBcUIsMkxDWGxDLGlNQUVNOzRGRFNPLHFCQUFxQjtrQkFOakMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTTt1R0FJL0MsT0FBTztzQkFETixLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFJTixVQUFVO3NCQURULEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLE1BQU07c0JBREwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgdHlwZSB7IERhdGVMaWtlIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLXllYXItc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3llYXItc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4veWVhci1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9ZZWFyU2VsZWN0RWxlbWVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIG1pblllYXI6IHN0cmluZyB8IG51bWJlcjtcbiAgQElucHV0KClcbiAgbWF4WWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZURhdGU6IERhdGVMaWtlID0gbmV3IERhdGUoKTtcbiAgQElucHV0KClcbiAgc2VsZWN0ZWQ6IERhdGVMaWtlW10gPSBbXTtcbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvLyBMaXN0IG9mIGFsbCB5ZWFycyAoZ2VuZXJhdGVkIGluIG5nT25Jbml0KVxuICB5ZWFyczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSB5ZWFyIGFycmF5XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMubWluWWVhciA/IE51bWJlcih0aGlzLm1pblllYXIpIDogbm93LmdldEZ1bGxZZWFyKCkgLSAxMDA7XG4gICAgY29uc3QgZW5kID0gdGhpcy5tYXhZZWFyID8gTnVtYmVyKHRoaXMubWF4WWVhcikgOiBub3cuZ2V0RnVsbFllYXIoKSArIDEwO1xuICAgIGNvbnN0IHllYXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICB5ZWFycy5wdXNoKGkpO1xuICAgIH1cbiAgICB0aGlzLnllYXJzID0geWVhcnMucmV2ZXJzZSgpO1xuICB9XG5cbiAgb25TZWxlY3QoZXZlbnQ6IEV2ZW50LCB5ZWFyOiBudW1iZXIpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3QubmV4dCh7IGV2ZW50LCB5ZWFyIH0pO1xuICB9XG5cbiAgX2lzQWN0aXZlKHllYXI6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZURhdGUgJiYgeWVhciA9PT0gRGF0ZVV0aWwuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpO1xuICB9XG5cbiAgX2lzU2VsZWN0ZWQoeWVhcjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgeWVhciA9PT0gRGF0ZVV0aWwuZ2V0WWVhcih0aGlzLnNlbGVjdGVkWzBdKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyc1wiIChjbGljayk9XCJvblNlbGVjdCgkZXZlbnQsIHllYXIpXCI+XG4gIDxkaXYgY2xhc3M9XCJ5ZWFyXCIgW2NsYXNzLnNlbGVjdGVkXT1cIl9pc1NlbGVjdGVkKHllYXIpXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uLWlkXT1cInllYXJcIj57eyB5ZWFyIH19PC9kaXY+XG48L2Rpdj4iXX0=