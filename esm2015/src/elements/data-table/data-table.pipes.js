import { Pipe } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
export function interpolateCell(value, col) {
    if (col.format) {
        return Helpers.interpolateWithFallback(col.format, value);
    }
    return value;
}
export class DataTableInterpolatePipe {
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return interpolateCell(value, column);
        }
        return '';
    }
}
DataTableInterpolatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableInterpolate',
                pure: true,
            },] }
];
export class DateTableDateRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return column.format ? value : this.labels.formatDate(interpolateCell(value, column));
        }
        return '';
    }
}
DateTableDateRendererPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableDateRenderer',
                pure: true,
            },] }
];
DateTableDateRendererPipe.ctorParameters = () => [
    { type: NovoLabelService }
];
export class DateTableDateTimeRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return column.format ? value : this.labels.formatDateShort(interpolateCell(value, column));
        }
        return '';
    }
}
DateTableDateTimeRendererPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableDateTimeRenderer',
                pure: true,
            },] }
];
DateTableDateTimeRendererPipe.ctorParameters = () => [
    { type: NovoLabelService }
];
export class DateTableTimeRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            return column.format ? value : this.labels.formatTime(interpolateCell(value, column));
        }
        return '';
    }
}
DateTableTimeRendererPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableTimeRenderer',
                pure: true,
            },] }
];
DateTableTimeRendererPipe.ctorParameters = () => [
    { type: NovoLabelService }
];
export class DateTableNumberRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column, isPercent = false) {
        if (!Helpers.isEmpty(value)) {
            let val = interpolateCell(value, column);
            if (isPercent && Helpers.isNumber(val)) {
                val = `${Number(val) * 100}`;
            }
            return `${this.labels.formatNumber(val)}${isPercent ? '%' : ''}`;
        }
        return '';
    }
}
DateTableNumberRendererPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableNumberRenderer',
                pure: true,
            },] }
];
DateTableNumberRendererPipe.ctorParameters = () => [
    { type: NovoLabelService }
];
export class DataTableBigDecimalRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            const val = interpolateCell(value, column);
            return this.labels.formatBigDecimal(Number(val), column.configuration);
        }
        return '';
    }
}
DataTableBigDecimalRendererPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableBigDecimalRenderer',
                pure: true,
            },] }
];
DataTableBigDecimalRendererPipe.ctorParameters = () => [
    { type: NovoLabelService }
];
export class DateTableCurrencyRendererPipe {
    constructor(labels) {
        this.labels = labels;
    }
    transform(value, column) {
        if (!Helpers.isEmpty(value)) {
            const val = interpolateCell(value, column);
            return this.labels.formatCurrency(Number(val));
        }
        return '';
    }
}
DateTableCurrencyRendererPipe.decorators = [
    { type: Pipe, args: [{
                name: 'dataTableCurrencyRenderer',
                pure: true,
            },] }
];
DateTableCurrencyRendererPipe.ctorParameters = () => [
    { type: NovoLabelService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5waXBlcy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUucGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzlDLE1BQU0sVUFBVSxlQUFlLENBQUksS0FBVSxFQUFFLEdBQXdCO0lBQ3JFLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNkLE9BQU8sT0FBTyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDM0Q7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFNRCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBMkI7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxlQUFlLENBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7WUFWRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsSUFBSSxFQUFFLElBQUk7YUFDWDs7QUFjRCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUNoRCxTQUFTLENBQUMsS0FBVSxFQUFFLE1BQTJCO1FBQy9DLElBQUksQ0FBQyxPQUFPLENB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QUEyQjtRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7WUFaRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsSUFBSSxFQUFFLElBQUk7YUFDWDs7O1lBdkZRLGdCQUFnQjs7QUF1R3pCLE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsWUFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBQ2hELFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBMkI7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFJLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7WUFaRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLDJCQUEyQjtnQkFDakMsSUFBSSxFQUFFLElBQUk7YUFDWDs7O1lBdEdRLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL0hlbHBlcnMnO1xuaW1wb3J0IHsgSURhdGFUYWJsZUNvbHVtbiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWU6IGFueSwgY29sOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgaWYgKGNvbC5mb3JtYXQpIHtcbiAgICByZXR1cm4gSGVscGVycy5pbnRlcnBvbGF0ZVdpdGhGYWxsYmFjayhjb2wuZm9ybWF0LCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVJbnRlcnBvbGF0ZScsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUludGVycG9sYXRlUGlwZTxUPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbik7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVEYXRlUmVuZGVyZXInLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGFibGVEYXRlUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjb2x1bW4uZm9ybWF0ID8gdmFsdWUgOiB0aGlzLmxhYmVscy5mb3JtYXREYXRlKGludGVycG9sYXRlQ2VsbDxUPih2YWx1ZSwgY29sdW1uKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVEYXRlVGltZVJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlRGF0ZVRpbWVSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBzdHJpbmcge1xuICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNvbHVtbi5mb3JtYXQgPyB2YWx1ZSA6IHRoaXMubGFiZWxzLmZvcm1hdERhdGVTaG9ydChpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbikpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlVGltZVJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlVGltZVJlbmRlcmVyUGlwZTxUPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY29sdW1uLmZvcm1hdCA/IHZhbHVlIDogdGhpcy5sYWJlbHMuZm9ybWF0VGltZShpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbikpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlTnVtYmVyUmVuZGVyZXInLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGFibGVOdW1iZXJSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4sIGlzUGVyY2VudDogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIGxldCB2YWwgPSBpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbik7XG4gICAgICBpZiAoaXNQZXJjZW50ICYmIEhlbHBlcnMuaXNOdW1iZXIodmFsKSkge1xuICAgICAgICB2YWwgPSBgJHtOdW1iZXIodmFsKSAqIDEwMH1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGAke3RoaXMubGFiZWxzLmZvcm1hdE51bWJlcih2YWwpfSR7aXNQZXJjZW50ID8gJyUnIDogJyd9YDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RhdGFUYWJsZUJpZ0RlY2ltYWxSZW5kZXJlcicsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJpZ0RlY2ltYWxSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBzdHJpbmcge1xuICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgY29uc3QgdmFsID0gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLmZvcm1hdEJpZ0RlY2ltYWwoTnVtYmVyKHZhbCksIGNvbHVtbi5jb25maWd1cmF0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RhdGFUYWJsZUN1cnJlbmN5UmVuZGVyZXInLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGFibGVDdXJyZW5jeVJlbmRlcmVyUGlwZTxUPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICBjb25zdCB2YWwgPSBpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbik7XG4gICAgICByZXR1cm4gdGhpcy5sYWJlbHMuZm9ybWF0Q3VycmVuY3koTnVtYmVyKHZhbCkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbiJdfQ==