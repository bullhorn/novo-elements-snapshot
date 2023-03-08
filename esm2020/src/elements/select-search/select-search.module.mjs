import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from '../button';
import { NovoCheckboxModule } from '../checkbox';
import { NovoCommonModule } from '../common';
import { NovoFieldModule } from '../field/field.module';
import { NovoIconModule } from '../icon';
import { NovoLoadingModule } from '../loading';
import { NovoTooltipModule } from '../tooltip';
import { NovoSelectSearchClearDirective } from './select-search-clear.directive';
import { NovoSelectSearchComponent } from './select-search.component';
import * as i0 from "@angular/core";
// export const NovoSelectSearchVersion = '3.3.0';
export class NovoSelectSearchModule {
}
NovoSelectSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoSelectSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectSearchModule, declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective], imports: [CommonModule,
        ReactiveFormsModule,
        NovoCheckboxModule,
        NovoButtonModule,
        NovoCommonModule,
        NovoIconModule,
        NovoLoadingModule,
        NovoTooltipModule,
        NovoFieldModule], exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective] });
NovoSelectSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectSearchModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            NovoCheckboxModule,
            NovoButtonModule,
            NovoCommonModule,
            NovoIconModule,
            NovoLoadingModule,
            NovoTooltipModule,
            NovoFieldModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoSelectSearchModule, decorators: [{
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
                        NovoFieldModule,
                    ],
                    declarations: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                    exports: [NovoSelectSearchComponent, NovoSelectSearchClearDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoL3NlbGVjdC1zZWFyY2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDL0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRXRFLGtEQUFrRDtBQWlCbEQsTUFBTSxPQUFPLHNCQUFzQjs7b0hBQXRCLHNCQUFzQjtxSEFBdEIsc0JBQXNCLGlCQUhsQix5QkFBeUIsRUFBRSw4QkFBOEIsYUFWdEUsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixlQUFlLGFBR1AseUJBQXlCLEVBQUUsOEJBQThCO3FIQUV4RCxzQkFBc0IsWUFkeEI7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLGVBQWU7U0FDaEI7NEZBSVUsc0JBQXNCO2tCQWZsQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsOEJBQThCLENBQUM7b0JBQ3pFLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO2lCQUNyRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICcuLi9maWVsZC9maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGluZyc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLWNsZWFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudCc7XG5cbi8vIGV4cG9ydCBjb25zdCBOb3ZvU2VsZWN0U2VhcmNoVmVyc2lvbiA9ICczLjMuMCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCwgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05vdm9TZWxlY3RTZWFyY2hDb21wb25lbnQsIE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUge31cbiJdfQ==