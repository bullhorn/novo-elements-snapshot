// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoNovoCKEditorModule } from 'novo-elements/addons/ckeditor';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import { NovoHeaderModule } from 'novo-elements/elements/header';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoModalModule } from 'novo-elements/elements/modal';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoPopOverModule } from 'novo-elements/elements/popover';
import { NovoQuickNoteModule } from 'novo-elements/elements/quick-note';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { NovoTipWellModule } from 'novo-elements/elements/tip-well';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlGroup } from './ControlGroup';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoFormElement } from './Form';
import { NovoFormExtrasModule } from './extras';
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
        NovoDateTimePickerModule,
        NovoNovoCKEditorModule,
        NovoFormExtrasModule,
        NovoQuickNoteModule,
        NovoDateTimePickerModule,
        NovoHeaderModule,
        NovoTooltipModule,
        NovoPopOverModule,
        NovoDragulaModule,
        IMaskDirectiveModule,
        TextMaskModule,
        NovoTipWellModule,
        NovoModalModule,
        NovoButtonModule,
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
            NovoDateTimePickerModule,
            NovoNovoCKEditorModule,
            NovoFormExtrasModule,
            NovoQuickNoteModule,
            NovoDateTimePickerModule,
            NovoHeaderModule,
            NovoTooltipModule,
            NovoPopOverModule,
            NovoDragulaModule,
            IMaskDirectiveModule,
            TextMaskModule,
            NovoTipWellModule,
            NovoModalModule,
            NovoButtonModule,
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
                        NovoDateTimePickerModule,
                        NovoNovoCKEditorModule,
                        NovoFormExtrasModule,
                        NovoQuickNoteModule,
                        NovoDateTimePickerModule,
                        NovoHeaderModule,
                        NovoTooltipModule,
                        NovoPopOverModule,
                        NovoDragulaModule,
                        IMaskDirectiveModule,
                        TextMaskModule,
                        NovoTipWellModule,
                        NovoModalModule,
                        NovoButtonModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL0Zvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELFNBQVM7QUFDVCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0Qs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ZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1NBQ2pCOzRGQXdCVSxjQUFjO2tCQXZEMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQix3QkFBd0I7d0JBQ3hCLHNCQUFzQjt3QkFDdEIsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLHdCQUF3Qjt3QkFDeEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDWixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3dCQUN0QixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIseUJBQXlCO3dCQUN6QixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLHlCQUF5Qjt3QkFDekIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IFRleHRNYXNrTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItdGV4dC1tYXNrJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b05vdm9DS0VkaXRvck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2NrZWRpdG9yJztcbmltcG9ydCB7IE5vdm9EcmFndWxhTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9hZGRvbnMvZHJhZ3VsYSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9idXR0b24nO1xuaW1wb3J0IHsgTm92b0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NoaXBzJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9kYXRlLXRpbWUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9IZWFkZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2hlYWRlcic7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaWNvbic7XG5pbXBvcnQgeyBOb3ZvTW9kYWxNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL21vZGFsJztcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3BpY2tlcic7XG5pbXBvcnQgeyBOb3ZvUG9wT3Zlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcG9wb3Zlcic7XG5pbXBvcnQgeyBOb3ZvUXVpY2tOb3RlTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9xdWljay1ub3RlJztcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcmFkaW8nO1xuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc2VsZWN0JztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3N3aXRjaCc7XG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3RpbGVzJztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy90aW1lLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvVGlwV2VsbE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdGlwLXdlbGwnO1xuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgTm92b0F1dG9TaXplLCBOb3ZvQ29udHJvbEVsZW1lbnQgfSBmcm9tICcuL0NvbnRyb2wnO1xuaW1wb3J0IHsgTm92b0NvbnRyb2xHcm91cCB9IGZyb20gJy4vQ29udHJvbEdyb3VwJztcbmltcG9ydCB7IE5vdm9Db250cm9sVGVtcGxhdGVzIH0gZnJvbSAnLi9Db250cm9sVGVtcGxhdGVzJztcbmltcG9ydCB7IE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsIE5vdm9GaWVsZHNldEVsZW1lbnQsIE5vdm9GaWVsZHNldEhlYWRlckVsZW1lbnQgfSBmcm9tICcuL0R5bmFtaWNGb3JtJztcbmltcG9ydCB7IENvbnRyb2xDb25maXJtTW9kYWwsIENvbnRyb2xQcm9tcHRNb2RhbCB9IGZyb20gJy4vRmllbGRJbnRlcmFjdGlvbk1vZGFscyc7XG5pbXBvcnQgeyBOb3ZvRm9ybUVsZW1lbnQgfSBmcm9tICcuL0Zvcm0nO1xuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICcuL2V4dHJhcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXG4gICAgTm92b1NlbGVjdE1vZHVsZSxcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vdm9DS0VkaXRvck1vZHVsZSxcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvUXVpY2tOb3RlTW9kdWxlLFxuICAgIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvSGVhZGVyTW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9Qb3BPdmVyTW9kdWxlLFxuICAgIE5vdm9EcmFndWxhTW9kdWxlLFxuICAgIElNYXNrRGlyZWN0aXZlTW9kdWxlLFxuICAgIFRleHRNYXNrTW9kdWxlLFxuICAgIE5vdm9UaXBXZWxsTW9kdWxlLFxuICAgIE5vdm9Nb2RhbE1vZHVsZSxcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxuICAgIE5vdm9Db21tb25Nb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvU3dpdGNoTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQXV0b1NpemUsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0Zvcm1FbGVtZW50LFxuICAgIE5vdm9GaWVsZHNldEVsZW1lbnQsXG4gICAgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCxcbiAgICBDb250cm9sQ29uZmlybU1vZGFsLFxuICAgIENvbnRyb2xQcm9tcHRNb2RhbCxcbiAgICBOb3ZvQ29udHJvbEdyb3VwLFxuICAgIE5vdm9Db250cm9sVGVtcGxhdGVzLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0F1dG9TaXplLFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9Gb3JtRWxlbWVudCxcbiAgICBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9Db250cm9sR3JvdXAsXG4gICAgTm92b0NvbnRyb2xUZW1wbGF0ZXMsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRm9ybU1vZHVsZSB7fVxuIl19