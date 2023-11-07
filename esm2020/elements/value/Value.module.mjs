// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';
import * as i0 from "@angular/core";
export class NovoValueModule {
}
NovoValueModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoValueModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoValueModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoValueModule, declarations: [NovoValueElement, RenderPipe, EntityList], imports: [CommonModule, NovoCommonModule, NovoIconModule], exports: [NovoValueElement, RenderPipe, EntityList] });
NovoValueModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoValueModule, imports: [[CommonModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoValueModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoCommonModule, NovoIconModule],
                    declarations: [NovoValueElement, RenderPipe, EntityList],
                    exports: [NovoValueElement, RenderPipe, EntityList],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdmFsdWUvVmFsdWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLGVBQWU7OzZHQUFmLGVBQWU7OEdBQWYsZUFBZSxpQkFIWCxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxhQUQ3QyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxhQUU5QyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVTs4R0FFdkMsZUFBZSxZQUpqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7NEZBSTlDLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztvQkFDekQsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztpQkFDcEQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IEVudGl0eUxpc3QgfSBmcm9tICcuL0VudGl0eUxpc3QnO1xuaW1wb3J0IHsgUmVuZGVyUGlwZSB9IGZyb20gJy4vUmVuZGVyJztcbmltcG9ydCB7IE5vdm9WYWx1ZUVsZW1lbnQgfSBmcm9tICcuL1ZhbHVlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm92b0NvbW1vbk1vZHVsZSwgTm92b0ljb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvVmFsdWVFbGVtZW50LCBSZW5kZXJQaXBlLCBFbnRpdHlMaXN0XSxcbiAgZXhwb3J0czogW05vdm9WYWx1ZUVsZW1lbnQsIFJlbmRlclBpcGUsIEVudGl0eUxpc3RdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVmFsdWVNb2R1bGUge31cbiJdfQ==