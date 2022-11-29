// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9lbGVtZW50cy9jb21wb25lbnRzL2Zvcm0vZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckQsU0FBUztBQUNULE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUs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QVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDWixZQUFZO3dCQUNaLGtCQUFrQjt3QkFDbEIsc0JBQXNCO3dCQUN0QixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIseUJBQXlCO3dCQUN6QixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHNCQUFzQjt3QkFDdEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLHlCQUF5Qjt3QkFDekIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNqQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IElNYXNrRGlyZWN0aXZlTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1pbWFzayc7XG4vLyBWZW5kb3JcbmltcG9ydCB7IE5vdm9BY2VFZGl0b3JNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2FkZG9ucy9hY2UtZWRpdG9yJztcbmltcG9ydCB7IE5vdm9Ob3ZvQ0tFZGl0b3JNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2FkZG9ucy9jay1lZGl0b3InO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2FkZG9ucy9kcmFndWxhJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvY2hlY2tib3gnO1xuaW1wb3J0IHsgTm92b0NoaXBzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2NoaXBzJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2RhdGUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9IZWFkZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvaGVhZGVyJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b01vZGFsTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL21vZGFsJztcbmltcG9ydCB7IE5vdm9QaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvcGlja2VyJztcbmltcG9ydCB7IE5vdm9RdWlja05vdGVNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvcXVpY2stbm90ZSc7XG5pbXBvcnQgeyBOb3ZvUmFkaW9Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvcmFkaW8nO1xuaW1wb3J0IHsgTm92b1NlbGVjdE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9zZWxlY3QnO1xuaW1wb3J0IHsgTm92b1N3aXRjaE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9zd2l0Y2gnO1xuaW1wb3J0IHsgTm92b1RpbGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3RpbGVzJztcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3RpbWUtcGlja2VyJztcbmltcG9ydCB7IE5vdm9UaXBXZWxsTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3RpcC13ZWxsJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTm92b1RlbXBsYXRlU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgTm92b0F1dG9TaXplLCBOb3ZvQ29udHJvbEVsZW1lbnQgfSBmcm9tICcuL2NvbnRyb2wnO1xuaW1wb3J0IHsgTm92b0NvbnRyb2xHcm91cCB9IGZyb20gJy4vY29udHJvbC1ncm91cCc7XG5pbXBvcnQgeyBOb3ZvQ29udHJvbFRlbXBsYXRlcyB9IGZyb20gJy4vY29udHJvbC10ZW1wbGF0ZXMnO1xuaW1wb3J0IHsgTm92b0R5bmFtaWNGb3JtRWxlbWVudCwgTm92b0ZpZWxkc2V0RWxlbWVudCwgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCB9IGZyb20gJy4vZHluYW1pYy1mb3JtJztcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi9leHRyYXMnO1xuaW1wb3J0IHsgQ29udHJvbENvbmZpcm1Nb2RhbCwgQ29udHJvbFByb21wdE1vZGFsIH0gZnJvbSAnLi9maWVsZC1pbnRlcmFjdGlvbi1tb2RhbHMnO1xuaW1wb3J0IHsgTm92b0Zvcm1FbGVtZW50IH0gZnJvbSAnLi9mb3JtJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTm92b1JhZGlvTW9kdWxlLFxuICAgIE5vdm9UaWxlc01vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9QaWNrZXJNb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9EYXRlUGlja2VyTW9kdWxlLFxuICAgIE5vdm9UaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9Ob3ZvQ0tFZGl0b3JNb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b1F1aWNrTm90ZU1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0hlYWRlck1vZHVsZSxcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcbiAgICBJTWFza0RpcmVjdGl2ZU1vZHVsZSxcbiAgICBOb3ZvVGlwV2VsbE1vZHVsZSxcbiAgICBOb3ZvTW9kYWxNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvQWNlRWRpdG9yTW9kdWxlLFxuICAgIE5vdm9Db21tb25Nb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvU3dpdGNoTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQXV0b1NpemUsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0Zvcm1FbGVtZW50LFxuICAgIE5vdm9GaWVsZHNldEVsZW1lbnQsXG4gICAgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCxcbiAgICBDb250cm9sQ29uZmlybU1vZGFsLFxuICAgIENvbnRyb2xQcm9tcHRNb2RhbCxcbiAgICBOb3ZvQ29udHJvbEdyb3VwLFxuICAgIE5vdm9Db250cm9sVGVtcGxhdGVzLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0F1dG9TaXplLFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9Gb3JtRWxlbWVudCxcbiAgICBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9Db250cm9sR3JvdXAsXG4gICAgTm92b0NvbnRyb2xUZW1wbGF0ZXMsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRm9ybU1vZHVsZSB7fVxuIl19