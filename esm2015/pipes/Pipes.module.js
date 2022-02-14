// NG2
import { NgModule } from '@angular/core';
import { DecodeURIPipe } from './decode-uri/DecodeURI';
import { DefaultPipe } from './default/Default';
import { GroupByPipe } from './group-by/GroupBy';
import { IsoDatePipe, IsoDateRangePipe, IsoTimePipe, IsoTimeRangePipe } from './iso8601';
import { PluralPipe } from './plural/Plural';
import * as i0 from "@angular/core";
export class NovoPipesModule {
}
NovoPipesModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoPipesModule });
NovoPipesModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoPipesModule_Factory(t) { return new (t || NovoPipesModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoPipesModule, { declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe], exports: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoPipesModule, [{
        type: NgModule,
        args: [{
                declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
                exports: [PluralPipe, DecodeURIPipe, GroupByPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInBpcGVzL1BpcGVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN6RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTTdDLE1BQU0sT0FBTyxlQUFlOzttREFBZixlQUFlOzZHQUFmLGVBQWU7d0ZBQWYsZUFBZSxtQkFIWCxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsYUFDdEgsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO2tEQUVoSCxlQUFlO2NBSjNCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztnQkFDakksT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUM7YUFDN0giLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNvZGVVUklQaXBlIH0gZnJvbSAnLi9kZWNvZGUtdXJpL0RlY29kZVVSSSc7XG5pbXBvcnQgeyBEZWZhdWx0UGlwZSB9IGZyb20gJy4vZGVmYXVsdC9EZWZhdWx0JztcbmltcG9ydCB7IEdyb3VwQnlQaXBlIH0gZnJvbSAnLi9ncm91cC1ieS9Hcm91cEJ5JztcbmltcG9ydCB7IElzb0RhdGVQaXBlLCBJc29EYXRlUmFuZ2VQaXBlLCBJc29UaW1lUGlwZSwgSXNvVGltZVJhbmdlUGlwZSB9IGZyb20gJy4vaXNvODYwMSc7XG5pbXBvcnQgeyBQbHVyYWxQaXBlIH0gZnJvbSAnLi9wbHVyYWwvUGx1cmFsJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbUGx1cmFsUGlwZSwgRGVjb2RlVVJJUGlwZSwgR3JvdXBCeVBpcGUsIERlZmF1bHRQaXBlLCBJc29UaW1lUGlwZSwgSXNvRGF0ZVBpcGUsIElzb1RpbWVSYW5nZVBpcGUsIElzb0RhdGVSYW5nZVBpcGVdLFxuICBleHBvcnRzOiBbUGx1cmFsUGlwZSwgRGVjb2RlVVJJUGlwZSwgR3JvdXBCeVBpcGUsIERlZmF1bHRQaXBlLCBJc29UaW1lUGlwZSwgSXNvRGF0ZVBpcGUsIElzb1RpbWVSYW5nZVBpcGUsIElzb0RhdGVSYW5nZVBpcGVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUGlwZXNNb2R1bGUge31cbiJdfQ==