// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoAceEditorModule } from 'novo-elements/addons/ace-editor';
import { NovoNovoCKEditorModule } from 'novo-elements/addons/ckeditor';
import { NovoDragulaModule } from 'novo-elements/addons/dragula';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoCommonModule } from 'novo-elements/elements/common';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import { NovoHeaderModule } from 'novo-elements/elements/header';
import { NovoModalModule } from 'novo-elements/elements/modal';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { NovoQuickNoteModule } from 'novo-elements/elements/quick-note';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { NovoTipWellModule } from 'novo-elements/elements/tip-well';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { NovoPopOverModule } from 'novo-elements/elements/popover';
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlGroup } from './ControlGroup';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { NovoFormExtrasModule } from './extras';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoFormElement } from './Form';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9mb3JtL0Zvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELFNBQVM7QUFDVCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0Qs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QztpQkFDakMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJTWFza0RpcmVjdGl2ZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItaW1hc2snO1xuLy8gVmVuZG9yXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9BY2VFZGl0b3JNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2FkZG9ucy9hY2UtZWRpdG9yJztcbmltcG9ydCB7IE5vdm9Ob3ZvQ0tFZGl0b3JNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2FkZG9ucy9ja2VkaXRvcic7XG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zL2RyYWd1bGEnO1xuaW1wb3J0IHsgTm92b0NoZWNrYm94TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jaGVja2JveCc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b1N3aXRjaE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvc3dpdGNoJztcbmltcG9ydCB7IE5vdm9UZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3NlcnZpY2VzJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2J1dHRvbic7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2NoaXBzJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL2RhdGUtdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b0hlYWRlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvaGVhZGVyJztcbmltcG9ydCB7IE5vdm9Nb2RhbE1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvbW9kYWwnO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGlja2VyJztcbmltcG9ydCB7IE5vdm9RdWlja05vdGVNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3F1aWNrLW5vdGUnO1xuaW1wb3J0IHsgTm92b1JhZGlvTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9yYWRpbyc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9zZWxlY3QnO1xuaW1wb3J0IHsgTm92b1RpbGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy90aWxlcyc7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvdGltZS1waWNrZXInO1xuaW1wb3J0IHsgTm92b1RpcFdlbGxNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3RpcC13ZWxsJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy90b29sdGlwJztcbmltcG9ydCB7IE5vdm9Qb3BPdmVyTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9wb3BvdmVyJztcbmltcG9ydCB7IE5vdm9BdXRvU2l6ZSwgTm92b0NvbnRyb2xFbGVtZW50IH0gZnJvbSAnLi9Db250cm9sJztcbmltcG9ydCB7IE5vdm9Db250cm9sR3JvdXAgfSBmcm9tICcuL0NvbnRyb2xHcm91cCc7XG5pbXBvcnQgeyBOb3ZvQ29udHJvbFRlbXBsYXRlcyB9IGZyb20gJy4vQ29udHJvbFRlbXBsYXRlcyc7XG5pbXBvcnQgeyBOb3ZvRHluYW1pY0Zvcm1FbGVtZW50LCBOb3ZvRmllbGRzZXRFbGVtZW50LCBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi9EeW5hbWljRm9ybSc7XG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJy4vZXh0cmFzJztcbmltcG9ydCB7IENvbnRyb2xDb25maXJtTW9kYWwsIENvbnRyb2xQcm9tcHRNb2RhbCB9IGZyb20gJy4vRmllbGRJbnRlcmFjdGlvbk1vZGFscyc7XG5pbXBvcnQgeyBOb3ZvRm9ybUVsZW1lbnQgfSBmcm9tICcuL0Zvcm0nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOb3ZvUmFkaW9Nb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXG4gICAgTm92b1BpY2tlck1vZHVsZSxcbiAgICBOb3ZvQ2hpcHNNb2R1bGUsXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gICAgTm92b1RpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0RhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9Ob3ZvQ0tFZGl0b3JNb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b1F1aWNrTm90ZU1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0hlYWRlck1vZHVsZSxcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcbiAgICBOb3ZvUG9wT3Zlck1vZHVsZSxcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcbiAgICBJTWFza0RpcmVjdGl2ZU1vZHVsZSxcbiAgICBUZXh0TWFza01vZHVsZSxcbiAgICBOb3ZvVGlwV2VsbE1vZHVsZSxcbiAgICBOb3ZvTW9kYWxNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvQWNlRWRpdG9yTW9kdWxlLFxuICAgIE5vdm9Db21tb25Nb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICAgIE5vdm9SYWRpb01vZHVsZSxcbiAgICBOb3ZvU3dpdGNoTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvQXV0b1NpemUsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0Zvcm1FbGVtZW50LFxuICAgIE5vdm9GaWVsZHNldEVsZW1lbnQsXG4gICAgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCxcbiAgICBDb250cm9sQ29uZmlybU1vZGFsLFxuICAgIENvbnRyb2xQcm9tcHRNb2RhbCxcbiAgICBOb3ZvQ29udHJvbEdyb3VwLFxuICAgIE5vdm9Db250cm9sVGVtcGxhdGVzLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0F1dG9TaXplLFxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxuICAgIE5vdm9Gb3JtRWxlbWVudCxcbiAgICBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50LFxuICAgIE5vdm9Db250cm9sR3JvdXAsXG4gICAgTm92b0NvbnRyb2xUZW1wbGF0ZXMsXG4gIF0sXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRm9ybU1vZHVsZSB7fVxuIl19