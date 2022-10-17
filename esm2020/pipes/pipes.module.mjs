// NG2
import { NgModule } from '@angular/core';
import { PluralPipe } from './plural/plural';
import { IsoDatePipe, IsoDateRangePipe, IsoTimePipe, IsoTimeRangePipe } from './iso8601';
import { HighlightPipe } from './highlight/highlight';
import { GroupByPipe } from './group-by/group-by';
import { DefaultPipe } from './default/default';
import { DecodeURIPipe } from './decode-uri/decode-uri';
import * as i0 from "@angular/core";
export class NovoPipesModule {
}
NovoPipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoPipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPipesModule, declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe], exports: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe] });
NovoPipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPipesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
                    exports: [PluralPipe, DecodeURIPipe, GroupByPipe, HighlightPipe, DefaultPipe, IsoTimePipe, IsoDatePipe, IsoTimeRangePipe, IsoDateRangePipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvcGlwZXMvcGlwZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN6RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBTXhELE1BQU0sT0FBTyxlQUFlOzs2R0FBZixlQUFlOzhHQUFmLGVBQWUsaUJBSFgsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixhQUNySSxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCOzhHQUUvSCxlQUFlOzRGQUFmLGVBQWU7a0JBSjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDO29CQUNoSixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUM7aUJBQzVJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGx1cmFsUGlwZSB9IGZyb20gJy4vcGx1cmFsL3BsdXJhbCc7XG5pbXBvcnQgeyBJc29EYXRlUGlwZSwgSXNvRGF0ZVJhbmdlUGlwZSwgSXNvVGltZVBpcGUsIElzb1RpbWVSYW5nZVBpcGUgfSBmcm9tICcuL2lzbzg2MDEnO1xuaW1wb3J0IHsgSGlnaGxpZ2h0UGlwZSB9IGZyb20gJy4vaGlnaGxpZ2h0L2hpZ2hsaWdodCc7XG5pbXBvcnQgeyBHcm91cEJ5UGlwZSB9IGZyb20gJy4vZ3JvdXAtYnkvZ3JvdXAtYnknO1xuaW1wb3J0IHsgRGVmYXVsdFBpcGUgfSBmcm9tICcuL2RlZmF1bHQvZGVmYXVsdCc7XG5pbXBvcnQgeyBEZWNvZGVVUklQaXBlIH0gZnJvbSAnLi9kZWNvZGUtdXJpL2RlY29kZS11cmknO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtQbHVyYWxQaXBlLCBEZWNvZGVVUklQaXBlLCBHcm91cEJ5UGlwZSwgSGlnaGxpZ2h0UGlwZSwgRGVmYXVsdFBpcGUsIElzb1RpbWVQaXBlLCBJc29EYXRlUGlwZSwgSXNvVGltZVJhbmdlUGlwZSwgSXNvRGF0ZVJhbmdlUGlwZV0sXG4gIGV4cG9ydHM6IFtQbHVyYWxQaXBlLCBEZWNvZGVVUklQaXBlLCBHcm91cEJ5UGlwZSwgSGlnaGxpZ2h0UGlwZSwgRGVmYXVsdFBpcGUsIElzb1RpbWVQaXBlLCBJc29EYXRlUGlwZSwgSXNvVGltZVJhbmdlUGlwZSwgSXNvRGF0ZVJhbmdlUGlwZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9QaXBlc01vZHVsZSB7fVxuIl19