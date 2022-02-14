// NG2
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { getMonth } from 'date-fns';
import { NovoLabelService } from '../../../services/novo-label-service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/novo-label-service";
import * as i2 from "@angular/common";
function NovoMonthSelectElement_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("click", function NovoMonthSelectElement_div_0_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const i_r2 = ctx.index; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.onSelect($event, i_r2); });
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const month_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("selected", ctx_r0._isSelected(i_r2));
    i0.ɵɵattribute("data-automation-id", month_r1);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", month_r1, "");
} }
export class NovoMonthSelectElement {
    constructor(labels) {
        this.labels = labels;
        this.activeDate = new Date();
        this.selected = [];
        // Select callback for output
        this.select = new EventEmitter(false);
        // List of all months
        this.monthNames = this.labels.getMonths();
    }
    ngOnInit() { }
    onSelect(event, month) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, month });
    }
    _isActive(month) {
        return this.activeDate && month === getMonth(this.activeDate);
    }
    _isSelected(month) {
        return this.selected && month === getMonth(this.selected[0]);
    }
}
NovoMonthSelectElement.ɵfac = function NovoMonthSelectElement_Factory(t) { return new (t || NovoMonthSelectElement)(i0.ɵɵdirectiveInject(i1.NovoLabelService)); };
NovoMonthSelectElement.ɵcmp = i0.ɵɵdefineComponent({ type: NovoMonthSelectElement, selectors: [["novo-month-select"]], inputs: { activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, decls: 1, vars: 1, consts: [[3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "month"]], template: function NovoMonthSelectElement_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NovoMonthSelectElement_div_0_Template, 3, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.monthNames);
    } }, directives: [i2.NgForOf], styles: ["@-webkit-keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@keyframes rotate{0%{transform:rotate(0deg)}75%{transform:rotate(200deg)}to{transform:rotate(180deg)}}@-webkit-keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@keyframes half-rotate{0%{transform:rotate(45deg)}75%{transform:rotate(100deg)}to{transform:rotate(90deg)}}@-webkit-keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@keyframes rotateBack{0%{transform:rotate(90deg)}to{transform:rotate(0deg)}}@-webkit-keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}@keyframes show{0%{opacity:0;transform:translateX(-100%)}75%{transform:translateX(0)}to{opacity:1;transform:translateX(0)}}[_nghost-%COMP%]{display:grid;flex:1;grid-template-columns:1fr 1fr 1fr}[_nghost-%COMP%]   .month[_ngcontent-%COMP%]{border-radius:.4rem;cursor:pointer;padding:1rem}[_nghost-%COMP%]   .month.selected[_ngcontent-%COMP%]{background-color:#4a89dc;color:#fff}[_nghost-%COMP%]   .month[_ngcontent-%COMP%]:hover{background-color:#4a89dc;color:#fff}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoMonthSelectElement, [{
        type: Component,
        args: [{
                selector: 'novo-month-select',
                templateUrl: './month-select.component.html',
                styleUrls: ['./month-select.component.scss'],
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return [{ type: i1.NovoLabelService }]; }, { activeDate: [{
            type: Input
        }], selected: [{
            type: Input
        }], select: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRlLXBpY2tlci9tb250aC1zZWxlY3QvbW9udGgtc2VsZWN0LmNvbXBvbmVudC50cyIsImVsZW1lbnRzL2RhdGUtcGlja2VyL21vbnRoLXNlbGVjdC9tb250aC1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7O0lDSHhFLDhCQUNFO0lBRG1ELCtOQUE2QjtJQUNoRiw4QkFDRTtJQUFBLFlBQVc7SUFBQSxpQkFBTTtJQUNyQixpQkFBTTs7Ozs7SUFGZSxlQUFpQztJQUFqQyxvREFBaUM7SUFBQyw4Q0FBaUM7SUFDcEYsZUFBVztJQUFYLHdDQUFXOztBRFVmLE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsWUFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFYM0MsZUFBVSxHQUFhLElBQUksSUFBSSxFQUFFLENBQUM7UUFFbEMsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUUxQiw2QkFBNkI7UUFFN0IsV0FBTSxHQUFzQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCxxQkFBcUI7UUFDckIsZUFBVSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFRCxDQUFDO0lBRS9DLFFBQVEsS0FBSSxDQUFDO0lBRWIsUUFBUSxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2xDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNyQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs0RkE1QlUsc0JBQXNCOzJEQUF0QixzQkFBc0I7UUNabkMsdUVBQ0U7O1FBREcsd0NBQStDOztrRERZdkMsc0JBQXNCO2NBTmxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztnQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7bUVBR0MsVUFBVTtrQkFEVCxLQUFLO1lBR04sUUFBUTtrQkFEUCxLQUFLO1lBS04sTUFBTTtrQkFETCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0TW9udGggfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVMaWtlIH0gZnJvbSAnLi4vZGF0ZS1waWNrZXIudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdub3ZvLW1vbnRoLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tb250aC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tb250aC1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Nb250aFNlbGVjdEVsZW1lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBhY3RpdmVEYXRlOiBEYXRlTGlrZSA9IG5ldyBEYXRlKCk7XG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkOiBEYXRlTGlrZVtdID0gW107XG5cbiAgLy8gU2VsZWN0IGNhbGxiYWNrIGZvciBvdXRwdXRcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICAvLyBMaXN0IG9mIGFsbCBtb250aHNcbiAgbW9udGhOYW1lczogc3RyaW5nW10gPSB0aGlzLmxhYmVscy5nZXRNb250aHMoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBvblNlbGVjdChldmVudDogRXZlbnQsIG1vbnRoOiBudW1iZXIpIHtcbiAgICAvLyBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgdGhpcy5zZWxlY3QubmV4dCh7IGV2ZW50LCBtb250aCB9KTtcbiAgfVxuXG4gIF9pc0FjdGl2ZShtb250aDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRGF0ZSAmJiBtb250aCA9PT0gZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIF9pc1NlbGVjdGVkKG1vbnRoOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiBtb250aCA9PT0gZ2V0TW9udGgodGhpcy5zZWxlY3RlZFswXSk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoTmFtZXM7IGxldCBpID0gaW5kZXhcIiAoY2xpY2spPVwib25TZWxlY3QoJGV2ZW50LCBpKVwiPlxuICA8ZGl2IGNsYXNzPVwibW9udGhcIiBbY2xhc3Muc2VsZWN0ZWRdPVwiX2lzU2VsZWN0ZWQoaSlcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb24taWRdPVwibW9udGhcIj5cbiAgICB7eyBtb250aCB9fTwvZGl2PlxuPC9kaXY+Il19