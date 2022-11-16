import { Pipe } from '@angular/core';
import { Helpers } from 'novo-elements/utils';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
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
DataTableInterpolatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableInterpolatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DataTableInterpolatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableInterpolatePipe, name: "dataTableInterpolate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableInterpolatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableInterpolate',
                    pure: true,
                }]
        }] });
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
DateTableDateRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableDateRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableDateRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableDateRendererPipe, name: "dataTableDateRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableDateRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableDateRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
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
DateTableDateTimeRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableDateTimeRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableDateTimeRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableDateTimeRendererPipe, name: "dataTableDateTimeRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableDateTimeRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableDateTimeRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
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
DateTableTimeRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableTimeRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableTimeRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableTimeRendererPipe, name: "dataTableTimeRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableTimeRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableTimeRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
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
DateTableNumberRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableNumberRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableNumberRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableNumberRendererPipe, name: "dataTableNumberRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableNumberRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableNumberRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
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
DataTableBigDecimalRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableBigDecimalRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DataTableBigDecimalRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableBigDecimalRendererPipe, name: "dataTableBigDecimalRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataTableBigDecimalRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableBigDecimalRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
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
DateTableCurrencyRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableCurrencyRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableCurrencyRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableCurrencyRendererPipe, name: "dataTableCurrencyRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DateTableCurrencyRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableCurrencyRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5waXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvZGF0YS10YWJsZS9kYXRhLXRhYmxlLnBpcGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBRTFELE1BQU0sVUFBVSxlQUFlLENBQUksS0FBVSxFQUFFLEdBQXdCO0lBQ3JFLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNkLE9BQU8sT0FBTyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDM0Q7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFNRCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBMkI7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxlQUFlLENBQUksS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOztzSEFOVSx3QkFBd0I7b0hBQXhCLHdCQUF3Qjs0RkFBeEIsd0JBQXdCO2tCQUpwQyxJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxzQkFBc0I7b0JBQzVCLElBQUksRUFBRSxJQUFJO2lCQUNYOztBQWNELE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFBb0IsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDO0lBQ2hELFNBQVMsQ0FBQyxLQUFVLEVBQUUsTUFBMkI7UUFDL0MsSUFBSSxDQUFD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QkFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElEYXRhVGFibGVDb2x1bW4gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSGVscGVycyB9IGZyb20gJ25vdm8tZWxlbWVudHMvdXRpbHMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlOiBhbnksIGNvbDogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gIGlmIChjb2wuZm9ybWF0KSB7XG4gICAgcmV0dXJuIEhlbHBlcnMuaW50ZXJwb2xhdGVXaXRoRmFsbGJhY2soY29sLmZvcm1hdCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlSW50ZXJwb2xhdGUnLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVJbnRlcnBvbGF0ZVBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlRGF0ZVJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlRGF0ZVJlbmRlcmVyUGlwZTxUPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY29sdW1uLmZvcm1hdCA/IHZhbHVlIDogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZShpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbikpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlRGF0ZVRpbWVSZW5kZXJlcicsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUYWJsZURhdGVUaW1lUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjb2x1bW4uZm9ybWF0ID8gdmFsdWUgOiB0aGlzLmxhYmVscy5mb3JtYXREYXRlU2hvcnQoaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RhdGFUYWJsZVRpbWVSZW5kZXJlcicsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUYWJsZVRpbWVSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBzdHJpbmcge1xuICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNvbHVtbi5mb3JtYXQgPyB2YWx1ZSA6IHRoaXMubGFiZWxzLmZvcm1hdFRpbWUoaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RhdGFUYWJsZU51bWJlclJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlTnVtYmVyUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+LCBpc1BlcmNlbnQ6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICBsZXQgdmFsID0gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgICAgaWYgKGlzUGVyY2VudCAmJiBIZWxwZXJzLmlzTnVtYmVyKHZhbCkpIHtcbiAgICAgICAgdmFsID0gYCR7TnVtYmVyKHZhbCkgKiAxMDB9YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVscy5mb3JtYXROdW1iZXIodmFsKX0ke2lzUGVyY2VudCA/ICclJyA6ICcnfWA7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXInLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGludGVycG9sYXRlQ2VsbDxUPih2YWx1ZSwgY29sdW1uKTtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVscy5mb3JtYXRCaWdEZWNpbWFsKE51bWJlcih2YWwpLCBjb2x1bW4uY29uZmlndXJhdGlvbik7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVDdXJyZW5jeVJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlQ3VycmVuY3lSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBzdHJpbmcge1xuICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgY29uc3QgdmFsID0gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLmZvcm1hdEN1cnJlbmN5KE51bWJlcih2YWwpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=