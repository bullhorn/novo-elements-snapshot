import { Directive, HostListener, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataTableState } from './state/data-table-state.service';
import { NOVO_DATA_TABLE_REF } from './data-table.token';
import { Helpers } from 'novo-elements/utils';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1leHBhbmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUtZXhwYW5kLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFhLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbEUsT0FBTyxFQUFvQixtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBSzlDLE1BQU0sT0FBTyw0QkFBNEI7SUFRdkMsWUFDUyxLQUF1QixFQUN0QixLQUF3QixFQUNLLFNBQTJCO1FBRnpELFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ0ssY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFhbEUsd0JBQW1CLEdBQUcsQ0FBQyxRQUFnQixFQUFXLEVBQUUsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO1FBRTVFLHVCQUFrQixHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFLENBQUMsUUFBUSxLQUFNLElBQUksQ0FBQyxHQUFpQyxDQUFDLEVBQUUsQ0FBQztRQWJqRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQWlCLEVBQUUsRUFBRTtZQUMxRSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNFLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU1ELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFHRCxPQUFPLENBQUMsS0FBaUI7UUFDdkIsSUFBSyxLQUFLLENBQUMsTUFBa0IsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsRUFBRTtZQUN0RSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFTyxLQUFLO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQzs7MEhBakRVLDRCQUE0QixnRkFXN0IsbUJBQW1COzhHQVhsQiw0QkFBNEI7NEZBQTVCLDRCQUE0QjtrQkFIeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2lCQUNsQzs7MEJBWUksTUFBTTsyQkFBQyxtQkFBbUI7NENBVDdCLEdBQUc7c0JBREYsS0FBSztnQkFHTixRQUFRO3NCQURQLEtBQUs7dUJBQUMscUJBQXFCO2dCQThCNUIsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGFUYWJsZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZS9kYXRhLXRhYmxlLXN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b0RhdGFUYWJsZVJlZiwgTk9WT19EQVRBX1RBQkxFX1JFRiB9IGZyb20gJy4vZGF0YS10YWJsZS50b2tlbic7XG5pbXBvcnQgeyBIZWxwZXJzIH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvRGF0YVRhYmxlRXhwYW5kXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9EYXRhVGFibGVFeHBhbmREaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICByb3c6IFQ7XG4gIEBJbnB1dCgnbm92b0RhdGFUYWJsZUV4cGFuZCcpXG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgc3RhdGU6IERhdGFUYWJsZVN0YXRlPFQ+LFxuICAgIEBJbmplY3QoTk9WT19EQVRBX1RBQkxFX1JFRikgcHJpdmF0ZSBkYXRhVGFibGU6IE5vdm9EYXRhVGFibGVSZWYsXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5leHBhbmRTb3VyY2Uuc3Vic2NyaWJlKCh0YXJnZXRJZD86IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHRoaXMuc2hvdWxkRXhwYW5kQWxsUm93cyh0YXJnZXRJZCkgfHwgdGhpcy5zaG91bGRFeHBhbmRPbmVSb3codGFyZ2V0SWQpKSB7XG4gICAgICAgIGlmIChkYXRhVGFibGUuaXNFeHBhbmRlZCh0aGlzLnJvdykpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvdWxkRXhwYW5kQWxsUm93cyA9ICh0YXJnZXRJZDogbnVtYmVyKTogYm9vbGVhbiA9PiB0YXJnZXRJZCA9PT0gdW5kZWZpbmVkO1xuXG4gIHNob3VsZEV4cGFuZE9uZVJvdyA9ICh0YXJnZXRJZDogbnVtYmVyKSA9PiB0YXJnZXRJZCA9PT0gKHRoaXMucm93IGFzIHVua25vd24gYXMgeyBpZDogbnVtYmVyIH0pLmlkO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS5oYXNBdHRyaWJ1dGUoJ25vdm8tZGF0YS10YWJsZS1leHBhbmRlcicpKSB7XG4gICAgICBIZWxwZXJzLnN3YWxsb3dFdmVudChldmVudCk7XG4gICAgICB0aGlzLmRhdGFUYWJsZS5leHBhbmRSb3codGhpcy5yb3cpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy52Y1JlZi5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy52Y1JlZi5jbGVhcigpO1xuICAgIGlmICh0aGlzLnRlbXBsYXRlICYmIHRoaXMucm93KSB7XG4gICAgICB0aGlzLnZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlLCB7ICRpbXBsaWNpdDogdGhpcy5yb3cgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=