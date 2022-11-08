// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
import { NovoAceEditorModule } from 'novo-elements/addons/ace-editor';
import { NovoNovoCKEditorModule } from 'novo-elements/addons/ck-editor';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoButtonModule } from 'novo-elements/components/button';
import { NovoCheckboxModule } from 'novo-elements/components/checkbox';
import { NovoChipsModule } from 'novo-elements/components/chips';
import { NovoDatePickerModule } from 'novo-elements/components/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/components/date-time-picker';
import { NovoHeaderModule } from 'novo-elements/components/header';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoModalModule } from 'novo-elements/components/modal';
import { NovoPickerModule } from 'novo-elements/components/picker';
import { NovoQuickNoteModule } from 'novo-elements/components/quick-note';
import { NovoRadioModule } from 'novo-elements/components/radio';
import { NovoSelectModule } from 'novo-elements/components/select';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import { NovoTilesModule } from 'novo-elements/components/tiles';
import { NovoTimePickerModule } from 'novo-elements/components/time-picker';
import { NovoTipWellModule } from 'novo-elements/components/tip-well';
import { NovoTooltipModule } from 'novo-elements/components/tooltip';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoAutoSize, NovoControlElement } from './control';
import { NovoControlGroup } from './control-group';
import { NovoControlTemplates } from './control-templates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './dynamic-form';
import { NovoFormExtrasModule } from './extras';
import { ControlConfirmModal, ControlPromptModal } from './field-interaction-modals';
import { NovoFormElement } from './form';
import * as i0 from "@angular/core";
export class NovoFormModule {
}
NovoFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, declarations: [NovoAutoSize,
        NovoControlElement,
        NovoDynamicFormElement,
        NovoFormElement,
        NovoFieldsetElement,
        NovoFieldsetHeaderElement,
        ControlConfirmModal,
        ControlPromptModal,
        NovoControlGroup,
        NovoControlTemplates], imports: [CommonModule,
        OverlayModule,
        ReactiveFormsModule,
        NovoRadioModule,
        NovoTilesModule,
        NovoSelectModule,
        NovoPickerModule,
        NovoChipsModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoNovoCKEditorModule,
        NovoFormExtrasModule,
        NovoQuickNoteModule,
        NovoDateTimePickerModule,
        NovoHeaderModule,
        NovoTooltipModule,
        NovoDragulaModule,
        IMaskDirectiveModule,
        TextMaskModule,
        NovoTipWellModule,
        NovoModalModule,
        NovoButtonModule,
        NovoAceEditorModule,
        NovoCommonModule,
        NovoCheckboxModule,
        NovoIconModule,
        NovoRadioModule,
        NovoSwitchModule], exports: [NovoAutoSize,
        NovoDynamicFormElement,
        NovoControlElement,
        NovoFormElement,
        NovoFieldsetHeaderElement,
        NovoControlGroup,
        NovoControlTemplates] });
NovoFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, providers: [NovoTemplateService], imports: [[
            CommonModule,
            OverlayModule,
            ReactiveFormsModule,
            NovoRadioModule,
            NovoTilesModule,
            NovoSelectModule,
            NovoPickerModule,
            NovoChipsModule,
            NovoDatePickerModule,
            NovoTimePickerModule,
            NovoNovoCKEditorModule,
            NovoFormExtrasModule,
            NovoQuickNoteModule,
            NovoDateTimePickerModule,
            NovoHeaderModule,
            NovoTooltipModule,
            NovoDragulaModule,
            IMaskDirectiveModule,
            TextMaskModule,
            NovoTipWellModule,
            NovoModalModule,
            NovoButtonModule,
            NovoAceEditorModule,
            NovoCommonModule,
            NovoCheckboxModule,
            NovoIconModule,
            NovoRadioModule,
            NovoSwitchModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        ReactiveFormsModule,
                        NovoRadioModule,
                        NovoTilesModule,
                        NovoSelectModule,
                        NovoPickerModule,
                        NovoChipsModule,
                        NovoDatePickerModule,
                        NovoTimePickerModule,
                        NovoNovoCKEditorModule,
                        NovoFormExtrasModule,
                        NovoQuickNoteModule,
                        NovoDateTimePickerModule,
                        NovoHeaderModule,
                        NovoTooltipModule,
                        NovoDragulaModule,
                        IMaskDirectiveModule,
                        TextMaskModule,
                        NovoTipWellModule,
                        NovoModalModule,
                        NovoButtonModule,
                        NovoAceEditorModule,
                        NovoCommonModule,
                        NovoCheckboxModule,
                        NovoIconModule,
                        NovoRadioModule,
                        NovoSwitchModule,
                    ],
                    declarations: [
                        NovoAutoSize,
                        NovoControlElement,
                        NovoDynamicFormElement,
                        NovoFormElement,
                        NovoFieldsetElement,
                        NovoFieldsetHeaderElement,
                        ControlConfirmModal,
                        ControlPromptModal,
                        NovoControlGroup,
                        NovoControlTemplates,
                    ],
                    exports: [
                        NovoAutoSize,
                        NovoDynamicFormElement,
                        NovoControlElement,
                        NovoFormElement,
                        NovoFieldsetHeaderElement,
                        NovoControlGroup,
                        NovoControlTemplates,
                    ],
                    providers: [NovoTemplateService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2Zvcm0vZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsU0FBUztBQUNULE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGNBQWMs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QjtZQUNsQixjQUFjO1lBQ2QsZUFBZTtZQUNmLGdCQUFnQjtTQUNqQjs0RkF3QlUsY0FBYztrQkF0RDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGdCQUFnQjtxQkFDakI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLFlBQVk7d0JBQ1osa0JBQWtCO3dCQUNsQixzQkFBc0I7d0JBQ3RCLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQix5QkFBeUI7d0JBQ3pCLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YseUJBQXlCO3dCQUN6QixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSU1hc2tEaXJlY3RpdmVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWltYXNrJztcbi8vIFZlbmRvclxuaW1wb3J0IHsgVGV4dE1hc2tNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi10ZXh0LW1hc2snO1xuaW1wb3J0IHsgTm92b0FjZUVkaXRvck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2FjZS1lZGl0b3InO1xuaW1wb3J0IHsgTm92b05vdm9DS0VkaXRvck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2NrLWVkaXRvcic7XG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2RyYWd1bGEnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvYnV0dG9uJztcbmltcG9ydCB7IE5vdm9DaGVja2JveE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvY2hpcHMnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0hlYWRlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9oZWFkZXInO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvTW9kYWxNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvbW9kYWwnO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9waWNrZXInO1xuaW1wb3J0IHsgTm92b1F1aWNrTm90ZU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9xdWljay1ub3RlJztcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9yYWRpbyc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3NlbGVjdCc7XG5pbXBvcnQgeyBOb3ZvU3dpdGNoTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3N3aXRjaCc7XG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdGlsZXMnO1xuaW1wb3J0IHsgTm92b1RpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b1RpcFdlbGxNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdGlwLXdlbGwnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvdG9vbHRpcCc7XG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOb3ZvQXV0b1NpemUsIE5vdm9Db250cm9sRWxlbWVudCB9IGZyb20gJy4vY29udHJvbCc7XG5pbXBvcnQgeyBOb3ZvQ29udHJvbEdyb3VwIH0gZnJvbSAnLi9jb250cm9sLWdyb3VwJztcbmltcG9ydCB7IE5vdm9Db250cm9sVGVtcGxhdGVzIH0gZnJvbSAnLi9jb250cm9sLXRlbXBsYXRlcyc7XG5pbXBvcnQgeyBOb3ZvRHluYW1pY0Zvcm1FbGVtZW50LCBOb3ZvRmllbGRzZXRFbGVtZW50LCBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0nO1xuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICcuL2V4dHJhcyc7XG5pbXBvcnQgeyBDb250cm9sQ29uZmlybU1vZGFsLCBDb250cm9sUHJvbXB0TW9kYWwgfSBmcm9tICcuL2ZpZWxkLWludGVyYWN0aW9uLW1vZGFscyc7XG5pbXBvcnQgeyBOb3ZvRm9ybUVsZW1lbnQgfSBmcm9tICcuL2Zvcm0nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOb3ZvUmFkaW9Nb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXG4gICAgTm92b1BpY2tlck1vZHVsZSxcbiAgICBOb3ZvQ2hpcHNNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b1RpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vdm9DS0VkaXRvck1vZHVsZSxcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvUXVpY2tOb3RlTW9kdWxlLFxuICAgIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvSGVhZGVyTW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9EcmFndWxhTW9kdWxlLFxuICAgIElNYXNrRGlyZWN0aXZlTW9kdWxlLFxuICAgIFRleHRNYXNrTW9kdWxlLFxuICAgIE5vdm9UaXBXZWxsTW9kdWxlLFxuICAgIE5vdm9Nb2RhbE1vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9BY2VFZGl0b3JNb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b1JhZGlvTW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9BdXRvU2l6ZSxcbiAgICBOb3ZvQ29udHJvbEVsZW1lbnQsXG4gICAgTm92b0R5bmFtaWNGb3JtRWxlbWVudCxcbiAgICBOb3ZvRm9ybUVsZW1lbnQsXG4gICAgTm92b0ZpZWxkc2V0RWxlbWVudCxcbiAgICBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50LFxuICAgIENvbnRyb2xDb25maXJtTW9kYWwsXG4gICAgQ29udHJvbFByb21wdE1vZGFsLFxuICAgIE5vdm9Db250cm9sR3JvdXAsXG4gICAgTm92b0NvbnRyb2xUZW1wbGF0ZXMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvQXV0b1NpemUsXG4gICAgTm92b0R5bmFtaWNGb3JtRWxlbWVudCxcbiAgICBOb3ZvQ29udHJvbEVsZW1lbnQsXG4gICAgTm92b0Zvcm1FbGVtZW50LFxuICAgIE5vdm9GaWVsZHNldEhlYWRlckVsZW1lbnQsXG4gICAgTm92b0NvbnRyb2xHcm91cCxcbiAgICBOb3ZvQ29udHJvbFRlbXBsYXRlcyxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbTm92b1RlbXBsYXRlU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9Gb3JtTW9kdWxlIHt9XG4iXX0=