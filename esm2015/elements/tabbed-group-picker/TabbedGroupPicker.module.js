// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoButtonModule } from '../button/Button.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
import { NovoListModule } from '../list/List.module';
import { NovoTabModule } from '../tabs/Tabs.module';
// APP
import { NovoTabbedGroupPickerElement } from './TabbedGroupPicker';
import * as i0 from "@angular/core";
export class NovoTabbedGroupPickerModule {
}
NovoTabbedGroupPickerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoTabbedGroupPickerModule });
NovoTabbedGroupPickerModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoTabbedGroupPickerModule_Factory(t) { return new (t || NovoTabbedGroupPickerModule)(); }, providers: [NovoLabelService], imports: [[
            CommonModule,
            FormsModule,
            ScrollingModule,
            NovoTabModule,
            NovoListModule,
            NovoFormExtrasModule,
            NovoButtonModule,
            NovoDropdownModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoTabbedGroupPickerModule, { declarations: [NovoTabbedGroupPickerElement], imports: [CommonModule,
        FormsModule,
        ScrollingModule,
        NovoTabModule,
        NovoListModule,
        NovoFormExtrasModule,
        NovoButtonModule,
        NovoDropdownModule], exports: [NovoTabbedGroupPickerElement] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoTabbedGroupPickerModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ScrollingModule,
                    NovoTabModule,
                    NovoListModule,
                    NovoFormExtrasModule,
                    NovoButtonModule,
                    NovoDropdownModule,
                ],
                providers: [NovoLabelService],
                declarations: [NovoTabbedGroupPickerElement],
                exports: [NovoTabbedGroupPickerElement],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiYmVkR3JvdXBQaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3RhYmJlZC1ncm91cC1waWNrZXIvVGFiYmVkR3JvdXBQaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQWlCbkUsTUFBTSxPQUFPLDJCQUEyQjs7K0RBQTNCLDJCQUEyQjtxSUFBM0IsMkJBQTJCLG1CQUozQixDQUFDLGdCQUFnQixDQUFDLFlBVnBCO1lBQ1AsWUFBWTtZQUNaLFdBQVc7WUFDWCxlQUFlO1lBQ2YsYUFBYTtZQUNiLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsZ0JBQWdCO1lBQ2hCLGtCQUFrQjtTQUNuQjt3RkFLVSwyQkFBMkIsbUJBSHZCLDRCQUE0QixhQVZ6QyxZQUFZO1FBQ1osV0FBVztRQUNYLGVBQWU7UUFDZixhQUFhO1FBQ2IsY0FBYztRQUNkLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsa0JBQWtCLGFBSVYsNEJBQTRCO2tEQUUzQiwyQkFBMkI7Y0FmdkMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixhQUFhO29CQUNiLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO2dCQUM1QyxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQzthQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0xhYmVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi4vZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLi9saXN0L0xpc3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UYWJNb2R1bGUgfSBmcm9tICcuLi90YWJzL1RhYnMubW9kdWxlJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b1RhYmJlZEdyb3VwUGlja2VyRWxlbWVudCB9IGZyb20gJy4vVGFiYmVkR3JvdXBQaWNrZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZSxcbiAgICBOb3ZvVGFiTW9kdWxlLFxuICAgIE5vdm9MaXN0TW9kdWxlLFxuICAgIE5vdm9Gb3JtRXh0cmFzTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtOb3ZvTGFiZWxTZXJ2aWNlXSxcbiAgZGVjbGFyYXRpb25zOiBbTm92b1RhYmJlZEdyb3VwUGlja2VyRWxlbWVudF0sXG4gIGV4cG9ydHM6IFtOb3ZvVGFiYmVkR3JvdXBQaWNrZXJFbGVtZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1RhYmJlZEdyb3VwUGlja2VyTW9kdWxlIHt9XG4iXX0=