// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// APP
import { NovoCommonModule } from '../common/common.module';
import { EntityList } from './EntityList';
import { RenderPipe } from './Render';
import { NovoValueElement } from './Value';
import * as i0 from "@angular/core";
export class NovoValueModule {
}
NovoValueModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoValueModule });
NovoValueModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoValueModule_Factory(t) { return new (t || NovoValueModule)(); }, imports: [[CommonModule, NovoCommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoValueModule, { declarations: [NovoValueElement, RenderPipe, EntityList], imports: [CommonModule, NovoCommonModule], exports: [NovoValueElement, RenderPipe, EntityList] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoValueModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, NovoCommonModule],
                declarations: [NovoValueElement, RenderPipe, EntityList],
                exports: [NovoValueElement, RenderPipe, EntityList],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3ZhbHVlL1ZhbHVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsTUFBTTtBQUNOLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBTzNDLE1BQU0sT0FBTyxlQUFlOzttREFBZixlQUFlOzZHQUFmLGVBQWUsa0JBSmpCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO3dGQUk5QixlQUFlLG1CQUhYLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxVQUFVLGFBRDdDLFlBQVksRUFBRSxnQkFBZ0IsYUFFOUIsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVU7a0RBRXZDLGVBQWU7Y0FMM0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDekMsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztnQkFDeEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQzthQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBFbnRpdHlMaXN0IH0gZnJvbSAnLi9FbnRpdHlMaXN0JztcbmltcG9ydCB7IFJlbmRlclBpcGUgfSBmcm9tICcuL1JlbmRlcic7XG5pbXBvcnQgeyBOb3ZvVmFsdWVFbGVtZW50IH0gZnJvbSAnLi9WYWx1ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9Db21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvVmFsdWVFbGVtZW50LCBSZW5kZXJQaXBlLCBFbnRpdHlMaXN0XSxcbiAgZXhwb3J0czogW05vdm9WYWx1ZUVsZW1lbnQsIFJlbmRlclBpcGUsIEVudGl0eUxpc3RdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVmFsdWVNb2R1bGUge31cbiJdfQ==