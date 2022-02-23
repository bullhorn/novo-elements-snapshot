// NG2
import { NgModule } from '@angular/core';
import { PopOverDirective } from './PopOver';
// APP
import { PopOverContent } from './PopOverContent';
export class NovoPopOverModule {
}
NovoPopOverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PopOverContent, PopOverDirective],
                exports: [PopOverContent, PopOverDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvZWxlbWVudHMvcG9wb3Zlci9Qb3BPdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU1sRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFKN0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQztnQkFDaEQsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDO2FBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wT3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vUG9wT3Zlcic7XG4vLyBBUFBcbmltcG9ydCB7IFBvcE92ZXJDb250ZW50IH0gZnJvbSAnLi9Qb3BPdmVyQ29udGVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1BvcE92ZXJDb250ZW50LCBQb3BPdmVyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1BvcE92ZXJDb250ZW50LCBQb3BPdmVyRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1BvcE92ZXJNb2R1bGUge31cbiJdfQ==