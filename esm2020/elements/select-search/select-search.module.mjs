import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9zZWxlY3Qtc2VhcmNoL3NlbGVjdC1zZWFyY2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBRXRFLGtEQUFrRDtBQWlCbEQsTUFBTSxPQUFPLHNCQUFzQjs7b0hBQXRCLHNCQUFzQjtxSEFBdEIsc0JBQXNCLGlCQUhsQix5QkFBeUIsRUFBRSw4QkFBOEIsYUFWdEUsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixlQUFlLGFBR1AseUJBQXlCLEVBQUUsOEJBQThCO3FIQUV4RCxzQkFBc0IsWUFkeEI7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLGVBQWU7U0FDaEI7NEZBSVUsc0JBQXNCO2tCQWZsQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsOEJBQThCLENBQUM7b0JBQ3pFLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLDhCQUE4QixDQUFDO2lCQUNyRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NoZWNrYm94JztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9pY29uJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy90b29sdGlwJztcbmltcG9ydCB7IE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC1jbGVhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXNlYXJjaC5jb21wb25lbnQnO1xuXG4vLyBleHBvcnQgY29uc3QgTm92b1NlbGVjdFNlYXJjaFZlcnNpb24gPSAnMy4zLjAnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvSWNvbk1vZHVsZSxcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcbiAgICBOb3ZvRmllbGRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05vdm9TZWxlY3RTZWFyY2hDb21wb25lbnQsIE5vdm9TZWxlY3RTZWFyY2hDbGVhckRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtOb3ZvU2VsZWN0U2VhcmNoQ29tcG9uZW50LCBOb3ZvU2VsZWN0U2VhcmNoQ2xlYXJEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvU2VsZWN0U2VhcmNoTW9kdWxlIHt9XG4iXX0=