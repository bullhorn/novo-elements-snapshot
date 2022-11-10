// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoValueElement } from './value';
import { RenderPipe } from './render';
import { EntityList } from './entity-list';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoCommonModule } from 'novo-elements/common';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZWxlbWVudHMvY29tcG9uZW50cy92YWx1ZS92YWx1ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQU94RCxNQUFNLE9BQU8sZUFBZTs7NkdBQWYsZUFBZTs4R0FBZixlQUFlLGlCQUhYLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxVQUFVLGFBRDdDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLGFBRTlDLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxVQUFVOzhHQUV2QyxlQUFlLFlBSmpCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQzs0RkFJOUMsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO29CQUN6RCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUN4RCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO2lCQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3ZvVmFsdWVFbGVtZW50IH0gZnJvbSAnLi92YWx1ZSc7XG5pbXBvcnQgeyBSZW5kZXJQaXBlIH0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IHsgRW50aXR5TGlzdCB9IGZyb20gJy4vZW50aXR5LWxpc3QnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9WYWx1ZUVsZW1lbnQsIFJlbmRlclBpcGUsIEVudGl0eUxpc3RdLFxuICBleHBvcnRzOiBbTm92b1ZhbHVlRWxlbWVudCwgUmVuZGVyUGlwZSwgRW50aXR5TGlzdF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9WYWx1ZU1vZHVsZSB7fVxuIl19