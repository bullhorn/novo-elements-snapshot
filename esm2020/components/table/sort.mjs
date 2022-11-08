import { Directive, EventEmitter, Output } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import { NovoActivityTableState } from './state';
import * as i0 from "@angular/core";
import * as i1 from "./state";
export class NovoSortFilter {
    constructor(state) {
        this.state = state;
    }
    filter(id, value, transform) {
        let filter;
        if (!Helpers.isBlank(value)) {
            filter = { id, value, transform };
        }
        else {
            filter = undefined;
        }
        this.state.filter = filter;
        this.state.reset(false, true);
        this.state.updates.next({ filter, sort: this.state.sort });
    }
    sort(id, value, transform) {
        const sort = { id, value, transform };
        this.state.sort = sort;
        this.state.reset(false, true);
        this.state.updates.next({ sort, filter: this.state.filter });
    }
}
NovoSortFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSortFilter, deps: [{ token: i1.NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Directive });
NovoSortFilter.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSortFilter, selector: "[novoSortFilter]", exportAs: ["sort"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSortFilter, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSortFilter]',
                    exportAs: 'sort',
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoActivityTableState }]; } });
export class NovoSelection {
    constructor(state) {
        this.state = state;
        this.novoSelectAllToggle = new EventEmitter();
        this.allRows = new Map();
    }
    register(id, row) {
        this.allRows.set(id, row);
    }
    deregister(id) {
        this.allRows.delete(id);
        this.state.selectedRows.delete(id);
        clearTimeout(this.throttleTimeout);
        this.throttleTimeout = setTimeout(() => {
            if (this.state.selectedRows.size === 0) {
                this.novoSelectAllToggle.emit(false);
            }
        });
    }
    ngOnDestroy() {
        this.allRows.clear();
        this.state.selectedRows.clear();
    }
    toggle(id, selected, row) {
        if (selected) {
            this.state.selectedRows.set(id, row);
        }
        else {
            this.state.selectedRows.delete(id);
        }
    }
    selectAll(value) {
        if (value) {
            this.state.selectedRows = new Map(this.allRows);
        }
        else {
            this.state.selectedRows.clear();
        }
        this.novoSelectAllToggle.emit(value);
    }
}
NovoSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelection, deps: [{ token: i1.NovoActivityTableState }], target: i0.ɵɵFactoryTarget.Directive });
NovoSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NovoSelection, selector: "[novoSelection]", outputs: { novoSelectAllToggle: "novoSelectAllToggle" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[novoSelection]',
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoActivityTableState }]; }, propDecorators: { novoSelectAllToggle: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvdGFibGUvc29ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7O0FBTWpELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQW9CLEtBQTZCO1FBQTdCLFVBQUssR0FBTCxLQUFLLENBQXdCO0lBQUcsQ0FBQztJQUU5QyxNQUFNLENBQUMsRUFBVSxFQUFFLEtBQVUsRUFBRSxTQUFtQjtRQUN2RCxJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7U0FDbkM7YUFBTTtZQUNMLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxJQUFJLENBQUMsRUFBVSxFQUFFLEtBQWEsRUFBRSxTQUFtQjtRQUN4RCxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs0R0FwQlUsY0FBYztnR0FBZCxjQUFjOzRGQUFkLGNBQWM7a0JBSjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCOztBQTJCRCxNQUFNLE9BQU8sYUFBYTtJQU94QixZQUFtQixLQUE2QjtRQUE3QixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUx6Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRWxELFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUdRLENBQUM7SUFFN0MsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sVUFBVSxDQUFDLEVBQUU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQVUsRUFBRSxRQUFpQixFQUFFLEdBQVE7UUFDbkQsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRU0sU0FBUyxDQUFDLEtBQWM7UUFDN0IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FBaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pFO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7MkdBNUNVLGFBQWE7K0ZBQWIsYUFBYTs0RkFBYixhQUFhO2tCQUh6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCOzZHQUdRLG1CQUFtQjtzQkFEekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b0FjdGl2aXR5VGFibGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbm92b1NvcnRGaWx0ZXJdJyxcbiAgZXhwb3J0QXM6ICdzb3J0Jyxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NvcnRGaWx0ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlOiBOb3ZvQWN0aXZpdHlUYWJsZVN0YXRlKSB7fVxuXG4gIHB1YmxpYyBmaWx0ZXIoaWQ6IHN0cmluZywgdmFsdWU6IGFueSwgdHJhbnNmb3JtOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIGxldCBmaWx0ZXI7XG4gICAgaWYgKCFIZWxwZXJzLmlzQmxhbmsodmFsdWUpKSB7XG4gICAgICBmaWx0ZXIgPSB7IGlkLCB2YWx1ZSwgdHJhbnNmb3JtIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbHRlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgdGhpcy5zdGF0ZS5yZXNldChmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBmaWx0ZXIsIHNvcnQ6IHRoaXMuc3RhdGUuc29ydCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzb3J0KGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRyYW5zZm9ybTogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCBzb3J0ID0geyBpZCwgdmFsdWUsIHRyYW5zZm9ybSB9O1xuICAgIHRoaXMuc3RhdGUuc29ydCA9IHNvcnQ7XG4gICAgdGhpcy5zdGF0ZS5yZXNldChmYWxzZSwgdHJ1ZSk7XG4gICAgdGhpcy5zdGF0ZS51cGRhdGVzLm5leHQoeyBzb3J0LCBmaWx0ZXI6IHRoaXMuc3RhdGUuZmlsdGVyIH0pO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tub3ZvU2VsZWN0aW9uXScsXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3Rpb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KClcbiAgcHVibGljIG5vdm9TZWxlY3RBbGxUb2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHVibGljIGFsbFJvd3MgPSBuZXcgTWFwPHN0cmluZywgb2JqZWN0PigpO1xuICBwcml2YXRlIHRocm90dGxlVGltZW91dDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGF0ZTogTm92b0FjdGl2aXR5VGFibGVTdGF0ZSkge31cblxuICBwdWJsaWMgcmVnaXN0ZXIoaWQsIHJvdyk6IHZvaWQge1xuICAgIHRoaXMuYWxsUm93cy5zZXQoaWQsIHJvdyk7XG4gIH1cblxuICBwdWJsaWMgZGVyZWdpc3RlcihpZCk6IHZvaWQge1xuICAgIHRoaXMuYWxsUm93cy5kZWxldGUoaWQpO1xuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLmRlbGV0ZShpZCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGhyb3R0bGVUaW1lb3V0KTtcbiAgICB0aGlzLnRocm90dGxlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLnNpemUgPT09IDApIHtcbiAgICAgICAgdGhpcy5ub3ZvU2VsZWN0QWxsVG9nZ2xlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuYWxsUm93cy5jbGVhcigpO1xuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzLmNsZWFyKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKGlkOiBzdHJpbmcsIHNlbGVjdGVkOiBib29sZWFuLCByb3c6IGFueSk6IHZvaWQge1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3Muc2V0KGlkLCByb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkUm93cy5kZWxldGUoaWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RBbGwodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWRSb3dzID0gbmV3IE1hcDxzdHJpbmcsIG9iamVjdD4odGhpcy5hbGxSb3dzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJvd3MuY2xlYXIoKTtcbiAgICB9XG4gICAgdGhpcy5ub3ZvU2VsZWN0QWxsVG9nZ2xlLmVtaXQodmFsdWUpO1xuICB9XG59XG4iXX0=