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
NovoYearSelectElement.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NovoYearSelectElement, selector: "novo-year-select", inputs: { minYear: "minYear", maxYear: "maxYear", activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, ngImport: i0, template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;flex:1;max-height:320px;overflow-y:scroll}:host .year{padding:1rem;cursor:pointer;border-radius:.4rem}:host .year.selected{background-color:var(--color-selection);color:#fff}:host .year:hover{background-color:var(--color-selection);color:#fff}\n"], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoYearSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-year-select', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;flex:1;max-height:320px;overflow-y:scroll}:host .year{padding:1rem;cursor:pointer;border-radius:.4rem}:host .year.selected{background-color:var(--color-selection);color:#fff}:host .year:hover{background-color:var(--color-selection);color:#fff}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9jYWxlbmRhci95ZWFyLXNlbGVjdC95ZWFyLXNlbGVjdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2NhbGVuZGFyL3llYXItc2VsZWN0L3llYXItc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBUS9DLE1BQU0sT0FBTyxxQkFBcUI7SUFpQmhDLFlBQW1CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBVjNDLGVBQVUsR0FBYSxJQUFJLElBQUksRUFBRSxDQUFDO1FBRWxDLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFDMUIsNkJBQTZCO1FBRTdCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEQsNENBQTRDO1FBQzVDLFVBQUssR0FBZSxFQUFFLENBQUM7SUFFdUIsQ0FBQztJQUUvQyxRQUFRO1FBQ04sMkJBQTJCO1FBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUM1RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWSxFQUFFLElBQVk7UUFDakMsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7bUhBMUNVLHFCQUFxQjt1R0FBckIscUJBQXFCLDJMQ1hsQyxpTUFFTTs0RkRTTyxxQkFBcUI7a0JBTmpDLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUdYLHVCQUF1QixDQUFDLE1BQU07dUdBSS9DLE9BQU87c0JBRE4sS0FBSztnQkFHTixPQUFPO3NCQUROLEtBQUs7Z0JBSU4sVUFBVTtzQkFEVCxLQUFLO2dCQUdOLFFBQVE7c0JBRFAsS0FBSztnQkFJTixNQUFNO3NCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgRGF0ZUxpa2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3R5cGVzJztcbmltcG9ydCB7IERhdGVVdGlsIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8teWVhci1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4veWVhci1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi95ZWFyLXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1llYXJTZWxlY3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZUxpa2UgPSBuZXcgRGF0ZSgpO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZDogRGF0ZUxpa2VbXSA9IFtdO1xuICAvLyBTZWxlY3QgY2FsbGJhY2sgZm9yIG91dHB1dFxuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIC8vIExpc3Qgb2YgYWxsIHllYXJzIChnZW5lcmF0ZWQgaW4gbmdPbkluaXQpXG4gIHllYXJzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHllYXIgYXJyYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5taW5ZZWFyID8gTnVtYmVyKHRoaXMubWluWWVhcikgOiBub3cuZ2V0RnVsbFllYXIoKSAtIDEwMDtcbiAgICBjb25zdCBlbmQgPSB0aGlzLm1heFllYXIgPyBOdW1iZXIodGhpcy5tYXhZZWFyKSA6IG5vdy5nZXRGdWxsWWVhcigpICsgMTA7XG4gICAgY29uc3QgeWVhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgIHllYXJzLnB1c2goaSk7XG4gICAgfVxuICAgIHRoaXMueWVhcnMgPSB5ZWFycy5yZXZlcnNlKCk7XG4gIH1cblxuICBvblNlbGVjdChldmVudDogRXZlbnQsIHllYXI6IG51bWJlcikge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdC5uZXh0KHsgZXZlbnQsIHllYXIgfSk7XG4gIH1cblxuICBfaXNBY3RpdmUoeWVhcjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRGF0ZSAmJiB5ZWFyID09PSBEYXRlVXRpbC5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBfaXNTZWxlY3RlZCh5ZWFyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB5ZWFyID09PSBEYXRlVXRpbC5nZXRZZWFyKHRoaXMuc2VsZWN0ZWRbMF0pO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJzXCIgKGNsaWNrKT1cIm9uU2VsZWN0KCRldmVudCwgeWVhcilcIj5cbiAgPGRpdiBjbGFzcz1cInllYXJcIiBbY2xhc3Muc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoeWVhcilcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwieWVhclwiPnt7IHllYXIgfX08L2Rpdj5cbjwvZGl2PiJdfQ==