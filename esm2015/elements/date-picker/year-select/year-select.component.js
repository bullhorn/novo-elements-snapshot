// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getYear } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "@angular/common";
function NovoYearSelectElement_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("click", function NovoYearSelectElement_div_0_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r3); const year_r1 = ctx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.onSelect($event, year_r1); });
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("selected", ctx_r0._isSelected(year_r1));
    i0.ɵɵattribute("data-automation-id", year_r1);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(year_r1);
} }
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
NovoYearSelectElement.ɵfac = function NovoYearSelectElement_Factory(t) { return new (t || NovoYearSelectElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService)); };
NovoYearSelectElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoYearSelectElement, selectors: [["novo-year-select"]], inputs: { minYear: "minYear", maxYear: "maxYear", activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, decls: 1, vars: 1, consts: [[3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "year"]], template: function NovoYearSelectElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoYearSelectElement_div_0_Template, 3, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.years);
    } }, directives: [i2.NgForOf], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{display:grid;flex:1;grid-template-columns:1fr 1fr 1fr 1fr;max-height:320px;overflow-y:scroll}[_nghost-%COMP%]   .year[_ngcontent-%COMP%]{border-radius:.4rem;cursor:pointer;padding:1rem}[_nghost-%COMP%]   .year.selected[_ngcontent-%COMP%]{background-color:#4a89dc;color:#fff}[_nghost-%COMP%]   .year[_ngcontent-%COMP%]:hover{background-color:#4a89dc;color:#fff}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoYearSelectElement, [{
        type: Component,
        args: [{
                selector: 'novo-year-select',
                templateUrl: './year-select.component.html',
                styleUrls: ['./year-select.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.NovoLabelService }]; }, { minYear: [{
            type: Input
        }], maxYear: [{
            type: Input
        }], activeDate: [{
            type: Input
        }], selected: [{
            type: Input
        }], select: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2RhdGUtcGlja2VyL3llYXItc2VsZWN0L3llYXItc2VsZWN0LmNvbXBvbmVudC50cyIsImVsZW1lbnRzL2RhdGUtcGlja2VyL3llYXItc2VsZWN0L3llYXItc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztJQ0h4RSw4QkFDRTtJQUQ4Qix3T0FBZ0M7SUFDOUQsOEJBQXdGO0lBQUEsWUFBVTtJQUFBLGlCQUFNO0lBQzFHLGlCQUFNOzs7O0lBRGMsZUFBb0M7SUFBcEMsdURBQW9DO0lBQUMsNkNBQWdDO0lBQUMsZUFBVTtJQUFWLDZCQUFVOztBRFdwRyxNQUFNLE9BQU8scUJBQXFCO0lBaUJoQyxZQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQVYzQyxlQUFVLEdBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVsQyxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBQzFCLDZCQUE2QjtRQUU3QixXQUFNLEdBQXNCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELDRDQUE0QztRQUM1QyxVQUFLLEdBQWUsRUFBRSxDQUFDO0lBRXVCLENBQUM7SUFFL0MsUUFBUTtRQUNOLDJCQUEyQjtRQUMzQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDNUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUN6RSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVksRUFBRSxJQUFZO1FBQ2pDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDOzswRkExQ1UscUJBQXFCOzBEQUFyQixxQkFBcUI7UUNabEMsc0VBQ0U7O1FBREcsbUNBQTBCOztrRERZbEIscUJBQXFCO2NBTmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztnQkFDM0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7bUVBR0MsT0FBTztrQkFETixLQUFLO1lBR04sT0FBTztrQkFETixLQUFLO1lBSU4sVUFBVTtrQkFEVCxLQUFLO1lBR04sUUFBUTtrQkFEUCxLQUFLO1lBSU4sTUFBTTtrQkFETCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0WWVhciB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZUxpa2UgfSBmcm9tICcuLi9kYXRlLXBpY2tlci50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25vdm8teWVhci1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4veWVhci1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi95ZWFyLXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1llYXJTZWxlY3RFbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgbWluWWVhcjogc3RyaW5nIHwgbnVtYmVyO1xuICBASW5wdXQoKVxuICBtYXhZZWFyOiBzdHJpbmcgfCBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgYWN0aXZlRGF0ZTogRGF0ZUxpa2UgPSBuZXcgRGF0ZSgpO1xuICBASW5wdXQoKVxuICBzZWxlY3RlZDogRGF0ZUxpa2VbXSA9IFtdO1xuICAvLyBTZWxlY3QgY2FsbGJhY2sgZm9yIG91dHB1dFxuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIC8vIExpc3Qgb2YgYWxsIHllYXJzIChnZW5lcmF0ZWQgaW4gbmdPbkluaXQpXG4gIHllYXJzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHllYXIgYXJyYXlcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5taW5ZZWFyID8gTnVtYmVyKHRoaXMubWluWWVhcikgOiBub3cuZ2V0RnVsbFllYXIoKSAtIDEwMDtcbiAgICBjb25zdCBlbmQgPSB0aGlzLm1heFllYXIgPyBOdW1iZXIodGhpcy5tYXhZZWFyKSA6IG5vdy5nZXRGdWxsWWVhcigpICsgMTA7XG4gICAgY29uc3QgeWVhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgIHllYXJzLnB1c2goaSk7XG4gICAgfVxuICAgIHRoaXMueWVhcnMgPSB5ZWFycy5yZXZlcnNlKCk7XG4gIH1cblxuICBvblNlbGVjdChldmVudDogRXZlbnQsIHllYXI6IG51bWJlcikge1xuICAgIC8vIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnNlbGVjdC5uZXh0KHsgZXZlbnQsIHllYXIgfSk7XG4gIH1cblxuICBfaXNBY3RpdmUoeWVhcjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRGF0ZSAmJiB5ZWFyID09PSBnZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XG4gIH1cblxuICBfaXNTZWxlY3RlZCh5ZWFyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB5ZWFyID09PSBnZXRZZWFyKHRoaXMuc2VsZWN0ZWRbMF0pO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJzXCIgKGNsaWNrKT1cIm9uU2VsZWN0KCRldmVudCwgeWVhcilcIj5cbiAgPGRpdiBjbGFzcz1cInllYXJcIiBbY2xhc3Muc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoeWVhcilcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwieWVhclwiPnt7IHllYXIgfX08L2Rpdj5cbjwvZGl2PiJdfQ==