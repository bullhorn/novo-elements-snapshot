import { Directive, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataTableState } from './state/data-table-state.service';
import { Helpers } from '../../utils/Helpers';
import { NovoDataTable } from './data-table.component';
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
NovoDataTableExpandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[novoDataTableExpand]',
            },] }
];
NovoDataTableExpandDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: DataTableState },
    { type: NovoDataTable }
];
NovoDataTableExpandDirective.propDecorators = {
    row: [{ type: Input }],
    template: [{ type: Input, args: ['novoDataTableExpand',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1leHBhbmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUtZXhwYW5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBR3pHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBS3ZELE1BQU0sT0FBTyw0QkFBNEI7SUFRdkMsWUFBbUIsS0FBdUIsRUFBVSxLQUF3QixFQUFVLFNBQTJCO1FBQTlGLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVlqSCx3QkFBbUIsR0FBRyxDQUFDLFFBQWdCLEVBQVcsRUFBRSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUM7UUFFNUUsdUJBQWtCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxRQUFRLEtBQU8sSUFBSSxDQUFDLEdBQWtDLENBQUMsRUFBRSxDQUFDO1FBYm5HLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBaUIsRUFBRSxFQUFFO1lBQzFFLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0UsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBTUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUdELE9BQU8sQ0FBQyxLQUFpQjtRQUN2QixJQUFLLEtBQUssQ0FBQyxNQUFrQixDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO1lBQ3RFLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVPLEtBQUs7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxNQUFNO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDOzs7WUFoREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7YUFDbEM7OztZQVRxRCxnQkFBZ0I7WUFHN0QsY0FBYztZQUVkLGFBQWE7OztrQkFNbkIsS0FBSzt1QkFFTCxLQUFLLFNBQUMscUJBQXFCO3NCQXlCM0IsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvSGVscGVycyc7XHJcbmltcG9ydCB7IE5vdm9EYXRhVGFibGUgfSBmcm9tICcuL2RhdGEtdGFibGUuY29tcG9uZW50JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25vdm9EYXRhVGFibGVFeHBhbmRdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVFeHBhbmREaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpXHJcbiAgcm93OiBUO1xyXG4gIEBJbnB1dCgnbm92b0RhdGFUYWJsZUV4cGFuZCcpXHJcbiAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBzdGF0ZTogRGF0YVRhYmxlU3RhdGU8VD4sIHByaXZhdGUgZGF0YVRhYmxlOiBOb3ZvRGF0YVRhYmxlPFQ+KSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc3RhdGUuZXhwYW5kU291cmNlLnN1YnNjcmliZSgodGFyZ2V0SWQ/OiBudW1iZXIpID0+IHtcclxuICAgICAgaWYgKHRoaXMuc2hvdWxkRXhwYW5kQWxsUm93cyh0YXJnZXRJZCkgfHwgdGhpcy5zaG91bGRFeHBhbmRPbmVSb3codGFyZ2V0SWQpKSB7XHJcbiAgICAgICAgaWYgKGRhdGFUYWJsZS5pc0V4cGFuZGVkKHRoaXMucm93KSkge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRFeHBhbmRBbGxSb3dzID0gKHRhcmdldElkOiBudW1iZXIpOiBib29sZWFuID0+IHRhcmdldElkID09PSB1bmRlZmluZWQ7XHJcblxyXG4gIHNob3VsZEV4cGFuZE9uZVJvdyA9ICh0YXJnZXRJZDogbnVtYmVyKSA9PiB0YXJnZXRJZCA9PT0gKCh0aGlzLnJvdyBhcyB1bmtub3duKSBhcyB7IGlkOiBudW1iZXIgfSkuaWQ7XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS5oYXNBdHRyaWJ1dGUoJ25vdm8tZGF0YS10YWJsZS1leHBhbmRlcicpKSB7XHJcbiAgICAgIEhlbHBlcnMuc3dhbGxvd0V2ZW50KGV2ZW50KTtcclxuICAgICAgdGhpcy5kYXRhVGFibGUuZXhwYW5kUm93KHRoaXMucm93KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcclxuICAgIGlmICh0aGlzLnRlbXBsYXRlICYmIHRoaXMucm93KSB7XHJcbiAgICAgIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUsIHsgJGltcGxpY2l0OiB0aGlzLnJvdyB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19