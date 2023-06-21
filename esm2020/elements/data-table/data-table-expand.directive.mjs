import { Directive, HostListener, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import { NOVO_DATA_TABLE_REF } from './data-table.token';
import { DataTableState } from './state/data-table-state.service';
import * as i0 from "@angular/core";
import * as i1 from "./state/data-table-state.service";
export class NovoDataTableExpandDirective {
    constructor(vcRef, state, dataTable) {
        this.vcRef = vcRef;
        this.state = state;
        this.dataTable = dataTable;
        this.shouldExpandAllRows = (targetId) => targetId === undefined;
        this.shouldExpandOneRow = (targetId) => targetId === this.row.id;
        this.subscription = this.state.expandSource.subscribe((targetId) => {
            if (this.shouldExpandAllRows(targetId) || this.shouldExpandOneRow(targetId)) {
                if (dataTable.isExpanded(this.row)) {
                    this.render();
                }
                else {
                    this.clear();
                }
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onClick(event) {
        if (event.target.hasAttribute('novo-data-table-expander')) {
            Helpers.swallowEvent(event);
            this.dataTable.expandRow(this.row);
        }
    }
    clear() {
        this.vcRef.clear();
    }
    render() {
        this.vcRef.clear();
        if (this.template && this.row) {
            this.vcRef.createEmbeddedView(this.template, { $implicit: this.row });
        }
    }
}
NovoDataTableExpandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableExpandDirective, deps: [{ token: i0.ViewContainerRef }, { token: i1.DataTableState }, { token: NOVO_DATA_TABLE_REF }], target: i0.ɵɵFactoryTarget.Directive });
NovoDataTableExpandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoDataTableExpandDirective, selector: "[novoDataTableExpand]", inputs: { row: "row", template: ["novoDataTableExpand", "template"] }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoDataTableExpandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoDataTableExpand]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i1.DataTableState }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NOVO_DATA_TABLE_REF]
                }] }]; }, propDecorators: { row: [{
                type: Input
            }], template: [{
                type: Input,
                args: ['novoDataTableExpand']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1leHBhbmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLWV4cGFuZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBYSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBb0IsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7OztBQUtsRSxNQUFNLE9BQU8sNEJBQTRCO0lBUXZDLFlBQ1MsS0FBdUIsRUFDdEIsS0FBd0IsRUFDSyxTQUEyQjtRQUZ6RCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN0QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNLLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBYWxFLHdCQUFtQixHQUFHLENBQUMsUUFBZ0IsRUFBVyxFQUFFLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztRQUU1RSx1QkFBa0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsS0FBTSxJQUFJLENBQUMsR0FBaUMsQ0FBQyxFQUFFLENBQUM7UUFiakcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUU7WUFDMUUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzRSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNkO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFNRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBR0QsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLElBQUssS0FBSyxDQUFDLE1BQWtCLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7WUFDdEUsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRU8sS0FBSztRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLE1BQU07UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUM7OzBIQWpEVSw0QkFBNEIsZ0ZBVzdCLG1CQUFtQjs4R0FYbEIsNEJBQTRCOzRGQUE1Qiw0QkFBNEI7a0JBSHhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtpQkFDbEM7OzBCQVlJLE1BQU07MkJBQUMsbUJBQW1COzRDQVQ3QixHQUFHO3NCQURGLEtBQUs7Z0JBR04sUUFBUTtzQkFEUCxLQUFLO3VCQUFDLHFCQUFxQjtnQkE4QjVCLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlUmVmLCBOT1ZPX0RBVEFfVEFCTEVfUkVGIH0gZnJvbSAnLi9kYXRhLXRhYmxlLnRva2VuJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b0RhdGFUYWJsZUV4cGFuZF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRGF0YVRhYmxlRXhwYW5kRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KClcbiAgcm93OiBUO1xuICBASW5wdXQoJ25vdm9EYXRhVGFibGVFeHBhbmQnKVxuICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHN0YXRlOiBEYXRhVGFibGVTdGF0ZTxUPixcbiAgICBASW5qZWN0KE5PVk9fREFUQV9UQUJMRV9SRUYpIHByaXZhdGUgZGF0YVRhYmxlOiBOb3ZvRGF0YVRhYmxlUmVmLFxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc3RhdGUuZXhwYW5kU291cmNlLnN1YnNjcmliZSgodGFyZ2V0SWQ/OiBudW1iZXIpID0+IHtcbiAgICAgIGlmICh0aGlzLnNob3VsZEV4cGFuZEFsbFJvd3ModGFyZ2V0SWQpIHx8IHRoaXMuc2hvdWxkRXhwYW5kT25lUm93KHRhcmdldElkKSkge1xuICAgICAgICBpZiAoZGF0YVRhYmxlLmlzRXhwYW5kZWQodGhpcy5yb3cpKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3VsZEV4cGFuZEFsbFJvd3MgPSAodGFyZ2V0SWQ6IG51bWJlcik6IGJvb2xlYW4gPT4gdGFyZ2V0SWQgPT09IHVuZGVmaW5lZDtcblxuICBzaG91bGRFeHBhbmRPbmVSb3cgPSAodGFyZ2V0SWQ6IG51bWJlcikgPT4gdGFyZ2V0SWQgPT09ICh0aGlzLnJvdyBhcyB1bmtub3duIGFzIHsgaWQ6IG51bWJlciB9KS5pZDtcblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgRWxlbWVudCkuaGFzQXR0cmlidXRlKCdub3ZvLWRhdGEtdGFibGUtZXhwYW5kZXInKSkge1xuICAgICAgSGVscGVycy5zd2FsbG93RXZlbnQoZXZlbnQpO1xuICAgICAgdGhpcy5kYXRhVGFibGUuZXhwYW5kUm93KHRoaXMucm93KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICBpZiAodGhpcy50ZW1wbGF0ZSAmJiB0aGlzLnJvdykge1xuICAgICAgdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSwgeyAkaW1wbGljaXQ6IHRoaXMucm93IH0pO1xuICAgIH1cbiAgfVxufVxuIl19