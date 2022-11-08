import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3NlbGVjdC1zZWFyY2gvc2VsZWN0LXNlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFdEUsa0RBQWtEO0FBaUJsRCxNQUFNLE9BQU8sc0JBQXNCOztvSEFBdEIsc0JBQXNCO3FIQUF0QixzQkFBc0IsaUJBSGxCLHlCQUF5QixFQUFFLDhCQUE4QixhQVZ0RSxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLGVBQWUsYUFHUCx5QkFBeUIsRUFBRSw4QkFBOEI7cUhBRXhELHNCQUFzQixZQWR4QjtZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsZUFBZTtTQUNoQjs0RkFJVSxzQkFBc0I7a0JBZmxDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSw4QkFBOEIsQ0FBQztvQkFDekUsT0FBTyxFQUFFLENBQUMseUJBQXlCLEVBQUUsOEJBQThCLENBQUM7aUJBQ3JFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZmllbGQnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlIH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLWNsZWFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudCc7XG5cbi8vIGV4cG9ydCBjb25zdCBOb3ZvU2VsZWN0U2VhcmNoVmVyc2lvbiA9ICczLjMuMCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9GaWVsZE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCwgTm92b1NlbGVjdFNlYXJjaENsZWFyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW05vdm9TZWxlY3RTZWFyY2hDb21wb25lbnQsIE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUge31cbiJdfQ==