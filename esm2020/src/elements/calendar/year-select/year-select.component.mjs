// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getYear } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
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
        return this.activeDate && year === getYear(this.activeDate);
    }
    _isSelected(year) {
        return this.selected && year === getYear(this.selected[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIveWVhci1zZWxlY3QveWVhci1zZWxlY3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvY2FsZW5kYXIveWVhci1zZWxlY3QveWVhci1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7OztBQVN4RSxNQUFNLE9BQU8scUJBQXFCO0lBaUJoQyxZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVYzQyxlQUFVLEdBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVsQyxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBQzFCLDZCQUE2QjtRQUU3QixXQUFNLEdBQXNCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELDRDQUE0QztRQUM1QyxVQUFLLEdBQWUsRUFBRSxDQUFDO0lBRXVCLENBQUM7SUFFL0MsUUFBUTtRQUNOLDJCQUEyQjtRQUMzQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDNUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN6RSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVksRUFBRSxJQUFZO1FBQ2pDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDOzttSEExQ1UscUJBQXFCO3VHQUFyQixxQkFBcUIsMkxDWmxDLGlNQUVNOzRGRFVPLHFCQUFxQjtrQkFOakMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTTt1R0FJL0MsT0FBTztzQkFETixLQUFLO2dCQUdOLE9BQU87c0JBRE4sS0FBSztnQkFJTixVQUFVO3NCQURULEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLE1BQU07c0JBREwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldFllYXIgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB0eXBlIHsgRGF0ZUxpa2UgfSBmcm9tICcuLi8uLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8teWVhci1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4veWVhci1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi95ZWFyLXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1llYXJTZWxlY3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZUxpa2UgPSBuZXcgRGF0ZSgpO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZDogRGF0ZUxpa2VbXSA9IFtdO1xuICAvLyBTZWxlY3QgY2FsbGJhY2sgZm9yIG91dHB1dFxuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIC8vIExpc3Qgb2YgYWxsIHllYXJzIChnZW5lcmF0ZWQgaW4gbmdPbkluaXQpXG4gIHllYXJzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHllYXIgYXJyYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5taW5ZZWFyID8gTnVtYmVyKHRoaXMubWluWWVhcikgOiBub3cuZ2V0RnVsbFllYXIoKSAtIDEwMDtcbiAgICBjb25zdCBlbmQgPSB0aGlzLm1heFllYXIgPyBOdW1iZXIodGhpcy5tYXhZZWFyKSA6IG5vdy5nZXRGdWxsWWVhcigpICsgMTA7XG4gICAgY29uc3QgeWVhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgIHllYXJzLnB1c2goaSk7XG4gICAgfVxuICAgIHRoaXMueWVhcnMgPSB5ZWFycy5yZXZlcnNlKCk7XG4gIH1cblxuICBvblNlbGVjdChldmVudDogRXZlbnQsIHllYXI6IG51bWJlcikge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdC5uZXh0KHsgZXZlbnQsIHllYXIgfSk7XG4gIH1cblxuICBfaXNBY3RpdmUoeWVhcjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRGF0ZSAmJiB5ZWFyID09PSBnZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBfaXNTZWxlY3RlZCh5ZWFyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB5ZWFyID09PSBnZXRZZWFyKHRoaXMuc2VsZWN0ZWRbMF0pO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJzXCIgKGNsaWNrKT1cIm9uU2VsZWN0KCRldmVudCwgeWVhcilcIj5cbiAgPGRpdiBjbGFzcz1cInllYXJcIiBbY2xhc3Muc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoeWVhcilcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwieWVhclwiPnt7IHllYXIgfX08L2Rpdj5cbjwvZGl2PiJdfQ==