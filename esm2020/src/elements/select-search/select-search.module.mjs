import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoTooltipModule } from '../tooltip';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import { NovoSelectSearchComponent } from './select-search.component';
import * as i0 from "@angular/core";
// export const NovoSelectSearchVersion = '3.3.0';
export class NovoSelectSearchModule {
}
NovoSelectSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSelectSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSelectSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSelectSearchModule, declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective], imports: [CommonModule,
        ReactiveFormsModule,
        NovoCheckboxModule,
        NovoButtonModule,
        NovoCommonModule,
        NovoIconModule,
        NovoLoadingModule,
        NovoTooltipModule], exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective] });
NovoSelectSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSelectSearchModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            NovoCheckboxModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoIconModule,
            NovoLoadingModule,
            NovoTooltipModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NovoSelectSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        NovoCheckboxModule,
                        NovoButtonModule,
                        NovoCommonModule,
                        NovoIconModule,
                        NovoLoadingModule,
                        NovoTooltipModule,
                    ],
                    declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                    exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoL3NlbGVjdC1zZWFyY2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFdEUsa0RBQWtEO0FBZ0JsRCxNQUFNLE9BQU8sc0JBQXNCOzttSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsaUJBSGxCLHlCQUF5QixFQUFFLDhCQUE4QixhQVR0RSxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsaUJBQWlCLGFBR1QseUJBQXlCLEVBQUUsOEJBQThCO29IQUV4RCxzQkFBc0IsWUFieEI7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsaUJBQWlCO1NBQ2xCOzJGQUlVLHNCQUFzQjtrQkFkbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixpQkFBaUI7cUJBQ2xCO29CQUNELFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO29CQUN6RSxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBOEIsQ0FBQztpQkFDckUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGluZyc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLWNsZWFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudCc7XG5cbi8vIGV4cG9ydCBjb25zdCBOb3ZvU2VsZWN0U2VhcmNoVmVyc2lvbiA9ICczLjMuMCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50LCBOb3ZvU2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCwgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1NlbGVjdFNlYXJjaE1vZHVsZSB7fVxuIl19