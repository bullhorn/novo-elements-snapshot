// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoCommonModule } from '../common/common.module';
import { NovoIconModule } from '../icon/Icon.module';
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';
import * as i0 from "@angular/core";
export class NovoValueModule {
}
NovoValueModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoValueModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoValueModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoValueModule, declarations: [NovoValueElement, RenderPipe, EntityList], imports: [CommonModule, NovoCommonModule, NovoIconModule], exports: [NovoValueElement, RenderPipe, EntityList] });
NovoValueModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoValueModule, imports: [[CommonModule, NovoCommonModule, NovoIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoValueModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoCommonModule, NovoIconModule],
                    declarations: [NovoValueElement, RenderPipe, EntityList],
                    exports: [NovoValueElement, RenderPipe, EntityList],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvZWxlbWVudHMvdmFsdWUvVmFsdWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFIWCxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxhQUQ3QyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxhQUU5QyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVTs2R0FFdkMsZUFBZSxZQUpqQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7MkZBSTlDLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztvQkFDekQsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztpQkFDcEQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBFbnRpdHlMaXN0IH0gZnJvbSAnLi9FbnRpdHlMaXN0JztcbmltcG9ydCB7IFJlbmRlclBpcGUgfSBmcm9tICcuL1JlbmRlcic7XG5pbXBvcnQgeyBOb3ZvVmFsdWVFbGVtZW50IH0gZnJvbSAnLi9WYWx1ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9Db21tb25Nb2R1bGUsIE5vdm9JY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1ZhbHVlRWxlbWVudCwgUmVuZGVyUGlwZSwgRW50aXR5TGlzdF0sXG4gIGV4cG9ydHM6IFtOb3ZvVmFsdWVFbGVtZW50LCBSZW5kZXJQaXBlLCBFbnRpdHlMaXN0XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1ZhbHVlTW9kdWxlIHt9XG4iXX0=