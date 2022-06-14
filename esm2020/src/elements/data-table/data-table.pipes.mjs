import { Pipe } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/novo-label-service";
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
DataTableInterpolatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableInterpolatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
DataTableInterpolatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableInterpolatePipe, name: "dataTableInterpolate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableInterpolatePipe, decorators: [{
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
DateTableDateRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableDateRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableDateRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableDateRendererPipe, name: "dataTableDateRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableDateRendererPipe, decorators: [{
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
DateTableDateTimeRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableDateTimeRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableDateTimeRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableDateTimeRendererPipe, name: "dataTableDateTimeRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableDateTimeRendererPipe, decorators: [{
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
DateTableTimeRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableTimeRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableTimeRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableTimeRendererPipe, name: "dataTableTimeRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableTimeRendererPipe, decorators: [{
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
DateTableNumberRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableNumberRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableNumberRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableNumberRendererPipe, name: "dataTableNumberRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableNumberRendererPipe, decorators: [{
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
DataTableBigDecimalRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableBigDecimalRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DataTableBigDecimalRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableBigDecimalRendererPipe, name: "dataTableBigDecimalRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DataTableBigDecimalRendererPipe, decorators: [{
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
DateTableCurrencyRendererPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableCurrencyRendererPipe, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Pipe });
DateTableCurrencyRendererPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableCurrencyRendererPipe, name: "dataTableCurrencyRenderer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: DateTableCurrencyRendererPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dataTableCurrencyRenderer',
                    pure: true,
                }]
        }], ctorParameters: function () { return [{ type: i1.NovoLabelService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5waXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS5waXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQUc5QyxNQUFNLFVBQVUsZUFBZSxDQUFJLEtBQVUsRUFBRSxHQUF3QjtJQUNyRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDZCxPQUFPLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBTUQsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxTQUFTLENBQUMsS0FBVSxFQUFFLE1BQTJCO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE9BQU8sZUFBZSxDQUFJLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7cUhBTlUsd0JBQXdCO21IQUF4Qix3QkFBd0I7MkZBQXhCLHdCQUF3QjtrQkFKcEMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsc0JBQXNCO29CQUM1QixJQUFJLEVBQUUsSUFBSTtpQkFDWDs7QUFjRCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW9CLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUNoRCxTQUFTLENBQUMsS0FBVSxFQUFFLE1BQTJCO1FBQy9D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QUFFLElBQUk7aUJBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm92by1sYWJlbC1zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBlcnMgfSBmcm9tICcuLi8uLi91dGlscy9IZWxwZXJzJztcbmltcG9ydCB7IElEYXRhVGFibGVDb2x1bW4gfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlOiBhbnksIGNvbDogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gIGlmIChjb2wuZm9ybWF0KSB7XG4gICAgcmV0dXJuIEhlbHBlcnMuaW50ZXJwb2xhdGVXaXRoRmFsbGJhY2soY29sLmZvcm1hdCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlSW50ZXJwb2xhdGUnLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVJbnRlcnBvbGF0ZVBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlRGF0ZVJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlRGF0ZVJlbmRlcmVyUGlwZTxUPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxhYmVsczogTm92b0xhYmVsU2VydmljZSkge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGNvbHVtbjogSURhdGFUYWJsZUNvbHVtbjxUPik6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY29sdW1uLmZvcm1hdCA/IHZhbHVlIDogdGhpcy5sYWJlbHMuZm9ybWF0RGF0ZShpbnRlcnBvbGF0ZUNlbGw8VD4odmFsdWUsIGNvbHVtbikpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnZGF0YVRhYmxlRGF0ZVRpbWVSZW5kZXJlcicsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUYWJsZURhdGVUaW1lUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjb2x1bW4uZm9ybWF0ID8gdmFsdWUgOiB0aGlzLmxhYmVscy5mb3JtYXREYXRlU2hvcnQoaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RhdGFUYWJsZVRpbWVSZW5kZXJlcicsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUYWJsZVRpbWVSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBzdHJpbmcge1xuICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNvbHVtbi5mb3JtYXQgPyB2YWx1ZSA6IHRoaXMubGFiZWxzLmZvcm1hdFRpbWUoaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2RhdGFUYWJsZU51bWJlclJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlTnVtYmVyUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+LCBpc1BlcmNlbnQ6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgaWYgKCFIZWxwZXJzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICBsZXQgdmFsID0gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgICAgaWYgKGlzUGVyY2VudCAmJiBIZWxwZXJzLmlzTnVtYmVyKHZhbCkpIHtcbiAgICAgICAgdmFsID0gYCR7TnVtYmVyKHZhbCkgKiAxMDB9YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgJHt0aGlzLmxhYmVscy5mb3JtYXROdW1iZXIodmFsKX0ke2lzUGVyY2VudCA/ICclJyA6ICcnfWA7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXInLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCaWdEZWNpbWFsUmVuZGVyZXJQaXBlPFQ+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGFiZWxzOiBOb3ZvTGFiZWxTZXJ2aWNlKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgY29sdW1uOiBJRGF0YVRhYmxlQ29sdW1uPFQ+KTogc3RyaW5nIHtcbiAgICBpZiAoIUhlbHBlcnMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGludGVycG9sYXRlQ2VsbDxUPih2YWx1ZSwgY29sdW1uKTtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVscy5mb3JtYXRCaWdEZWNpbWFsKE51bWJlcih2YWwpLCBjb2x1bW4uY29uZmlndXJhdGlvbik7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXRhVGFibGVDdXJyZW5jeVJlbmRlcmVyJyxcbiAgcHVyZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRhYmxlQ3VycmVuY3lSZW5kZXJlclBpcGU8VD4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYWJlbHM6IE5vdm9MYWJlbFNlcnZpY2UpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjb2x1bW46IElEYXRhVGFibGVDb2x1bW48VD4pOiBzdHJpbmcge1xuICAgIGlmICghSGVscGVycy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgY29uc3QgdmFsID0gaW50ZXJwb2xhdGVDZWxsPFQ+KHZhbHVlLCBjb2x1bW4pO1xuICAgICAgcmV0dXJuIHRoaXMubGFiZWxzLmZvcm1hdEN1cnJlbmN5KE51bWJlcih2YWwpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=