// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoTabbedGroupPickerElement } from './tabbed-group-picker';
import { NovoTabModule } from 'novo-elements/components/tabs';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoFormExtrasModule } from 'novo-elements/components/form/extras';
import { NovoDropdownModule } from 'novo-elements/components/dropdown';
import { NovoOptionModule } from 'novo-elements/common';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export class NovoTabbedGroupPickerModule {
}
NovoTabbedGroupPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoTabbedGroupPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, declarations: [NovoTabbedGroupPickerElement], imports: [CommonModule,
        FormsModule,
        ScrollingModule,
        NovoTabModule,
        NovoListModule,
        NovoFormExtrasModule,
        NovoButtonModule,
        NovoDropdownModule,
        NovoOptionModule,
        NovoCheckboxModule], exports: [NovoTabbedGroupPickerElement] });
NovoTabbedGroupPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, providers: [NovoLabelService], imports: [[
            CommonModule,
            FormsModule,
            ScrollingModule,
            NovoTabModule,
            NovoListModule,
            NovoFormExtrasModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoOptionModule,
            NovoCheckboxModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoTabbedGroupPickerModule, decorators: [{
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
                        NovoOptionModule,
                        NovoCheckboxModule,
                    ],
                    providers: [NovoLabelService],
                    declarations: [NovoTabbedGroupPickerElement],
                    exports: [NovoTabbedGroupPickerElement],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmVkLWdyb3VwLXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL3RhYmJlZC1ncm91cC1waWNrZXIvdGFiYmVkLWdyb3VwLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFtQjFELE1BQU0sT0FBTywyQkFBMkI7O3lIQUEzQiwyQkFBMkI7MEhBQTNCLDJCQUEyQixpQkFIdkIsNEJBQTRCLGFBWnpDLFlBQVk7UUFDWixXQUFXO1FBQ1gsZUFBZTtRQUNmLGFBQWE7UUFDYixjQUFjO1FBQ2Qsb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLGtCQUFrQixhQUlWLDRCQUE0QjswSEFFM0IsMkJBQTJCLGFBSjNCLENBQUMsZ0JBQWdCLENBQUMsWUFacEI7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGVBQWU7WUFDZixhQUFhO1lBQ2IsY0FBYztZQUNkLG9CQUFvQjtZQUNwQixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtZQUNoQixrQkFBa0I7U0FDbkI7NEZBS1UsMkJBQTJCO2tCQWpCdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixjQUFjO3dCQUNkLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3FCQUNuQjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b1RhYmJlZEdyb3VwUGlja2VyRWxlbWVudCB9IGZyb20gJy4vdGFiYmVkLWdyb3VwLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvVGFiTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3RhYnMnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvbGlzdCc7XG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9mb3JtL2V4dHJhcyc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZHJvcGRvd24nO1xuaW1wb3J0IHsgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b0xpc3RNb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvRHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b09wdGlvbk1vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9MYWJlbFNlcnZpY2VdLFxuICBkZWNsYXJhdGlvbnM6IFtOb3ZvVGFiYmVkR3JvdXBQaWNrZXJFbGVtZW50XSxcbiAgZXhwb3J0czogW05vdm9UYWJiZWRHcm91cFBpY2tlckVsZW1lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJNb2R1bGUge31cbiJdfQ==