// NG2
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoRadioModule } from './../radio/Radio.module';
import { NovoButtonModule } from './../button/Button.module';
import { NovoTilesModule } from './../tiles/Tiles.module';
import { NovoSelectModule } from './../select/Select.module';
import { NovoPickerModule } from './../picker/Picker.module';
import { NovoChipsModule } from './../chips/Chips.module';
import { NovoDatePickerModule } from './../date-picker/DatePicker.module';
import { NovoTimePickerModule } from './../time-picker/TimePicker.module';
import { NovoDateTimePickerModule } from './../date-time-picker/DateTimePicker.module';
import { NovoNovoCKEditorModule } from './../ckeditor/CKEditor.module';
import { NovoQuickNoteModule } from './../quick-note/QuickNote.module';
import { NovoDynamicFormElement, NovoFieldsetElement, NovoFieldsetHeaderElement } from './DynamicForm';
import { NovoFormElement } from './Form';
import { NovoControlElement, NovoAutoSize } from './Control';
import { NovoFormExtrasModule } from './extras/FormExtras.module';
import { NovoHeaderModule } from './../header/Header.module';
import { NovoTooltipModule } from './../tooltip/Tooltip.module';
import { NovoDragulaModule } from './../dragula/Dragula.module';
import { NovoTipWellModule } from './../tip-well/TipWell.module';
import { NovoAceEditorModule } from './../ace-editor/AceEditor.module';
import { NovoModalModule } from './../modal/Modal.module';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoControlGroup } from './ControlGroup';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoTemplateService } from './../../services/template/NovoTemplateService';
import { NovoCommonModule } from '../common/common.module';
export class NovoFormModule {
}
NovoFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
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
                    TextMaskModule,
                    NovoTipWellModule,
                    NovoModalModule,
                    NovoButtonModule,
                    NovoAceEditorModule,
                    NovoCommonModule,
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL2Zvcm0vRm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELFNBQVM7QUFDVCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBa0QzRCxNQUFNLE9BQU8sY0FBYzs7O1lBaEQxQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsb0JBQW9CO29CQUNwQixtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLGdCQUFnQjtpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFlBQVk7b0JBQ1osa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQix5QkFBeUI7b0JBQ3pCLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0QixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YseUJBQXlCO29CQUN6QixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtpQkFDckI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDakMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuLy8gVmVuZG9yXHJcbmltcG9ydCB7IFRleHRNYXNrTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItdGV4dC1tYXNrJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJy4vLi4vcmFkaW8vUmFkaW8ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4vLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICcuLy4uL3RpbGVzL1RpbGVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuLy4uL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJy4vLi4vcGlja2VyL1BpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICcuLy4uL2NoaXBzL0NoaXBzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi8uLi90aW1lLXBpY2tlci9UaW1lUGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4vLi4vZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTm92b0NLRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi8uLi9ja2VkaXRvci9DS0VkaXRvci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvUXVpY2tOb3RlTW9kdWxlIH0gZnJvbSAnLi8uLi9xdWljay1ub3RlL1F1aWNrTm90ZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRHluYW1pY0Zvcm1FbGVtZW50LCBOb3ZvRmllbGRzZXRFbGVtZW50LCBOb3ZvRmllbGRzZXRIZWFkZXJFbGVtZW50IH0gZnJvbSAnLi9EeW5hbWljRm9ybSc7XHJcbmltcG9ydCB7IE5vdm9Gb3JtRWxlbWVudCB9IGZyb20gJy4vRm9ybSc7XHJcbmltcG9ydCB7IE5vdm9Db250cm9sRWxlbWVudCwgTm92b0F1dG9TaXplIH0gZnJvbSAnLi9Db250cm9sJztcclxuaW1wb3J0IHsgTm92b0Zvcm1FeHRyYXNNb2R1bGUgfSBmcm9tICcuL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9IZWFkZXJNb2R1bGUgfSBmcm9tICcuLy4uL2hlYWRlci9IZWFkZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1Rvb2x0aXBNb2R1bGUgfSBmcm9tICcuLy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYU1vZHVsZSB9IGZyb20gJy4vLi4vZHJhZ3VsYS9EcmFndWxhLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9UaXBXZWxsTW9kdWxlIH0gZnJvbSAnLi8uLi90aXAtd2VsbC9UaXBXZWxsLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9BY2VFZGl0b3JNb2R1bGUgfSBmcm9tICcuLy4uL2FjZS1lZGl0b3IvQWNlRWRpdG9yLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Nb2RhbE1vZHVsZSB9IGZyb20gJy4vLi4vbW9kYWwvTW9kYWwubW9kdWxlJztcclxuaW1wb3J0IHsgQ29udHJvbENvbmZpcm1Nb2RhbCwgQ29udHJvbFByb21wdE1vZGFsIH0gZnJvbSAnLi9GaWVsZEludGVyYWN0aW9uTW9kYWxzJztcclxuaW1wb3J0IHsgTm92b0NvbnRyb2xHcm91cCB9IGZyb20gJy4vQ29udHJvbEdyb3VwJztcclxuaW1wb3J0IHsgTm92b0NvbnRyb2xUZW1wbGF0ZXMgfSBmcm9tICcuL0NvbnRyb2xUZW1wbGF0ZXMnO1xyXG5pbXBvcnQgeyBOb3ZvVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy90ZW1wbGF0ZS9Ob3ZvVGVtcGxhdGVTZXJ2aWNlJztcclxuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jb21tb24ubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5vdm9SYWRpb01vZHVsZSxcclxuICAgIE5vdm9UaWxlc01vZHVsZSxcclxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXHJcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxyXG4gICAgTm92b0NoaXBzTW9kdWxlLFxyXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXHJcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcclxuICAgIE5vdm9Ob3ZvQ0tFZGl0b3JNb2R1bGUsXHJcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcclxuICAgIE5vdm9RdWlja05vdGVNb2R1bGUsXHJcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXHJcbiAgICBOb3ZvSGVhZGVyTW9kdWxlLFxyXG4gICAgTm92b1Rvb2x0aXBNb2R1bGUsXHJcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcclxuICAgIFRleHRNYXNrTW9kdWxlLFxyXG4gICAgTm92b1RpcFdlbGxNb2R1bGUsXHJcbiAgICBOb3ZvTW9kYWxNb2R1bGUsXHJcbiAgICBOb3ZvQnV0dG9uTW9kdWxlLFxyXG4gICAgTm92b0FjZUVkaXRvck1vZHVsZSxcclxuICAgIE5vdm9Db21tb25Nb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5vdm9BdXRvU2l6ZSxcclxuICAgIE5vdm9Db250cm9sRWxlbWVudCxcclxuICAgIE5vdm9EeW5hbWljRm9ybUVsZW1lbnQsXHJcbiAgICBOb3ZvRm9ybUVsZW1lbnQsXHJcbiAgICBOb3ZvRmllbGRzZXRFbGVtZW50LFxyXG4gICAgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCxcclxuICAgIENvbnRyb2xDb25maXJtTW9kYWwsXHJcbiAgICBDb250cm9sUHJvbXB0TW9kYWwsXHJcbiAgICBOb3ZvQ29udHJvbEdyb3VwLFxyXG4gICAgTm92b0NvbnRyb2xUZW1wbGF0ZXMsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBOb3ZvQXV0b1NpemUsXHJcbiAgICBOb3ZvRHluYW1pY0Zvcm1FbGVtZW50LFxyXG4gICAgTm92b0NvbnRyb2xFbGVtZW50LFxyXG4gICAgTm92b0Zvcm1FbGVtZW50LFxyXG4gICAgTm92b0ZpZWxkc2V0SGVhZGVyRWxlbWVudCxcclxuICAgIE5vdm9Db250cm9sR3JvdXAsXHJcbiAgICBOb3ZvQ29udHJvbFRlbXBsYXRlcyxcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW05vdm9UZW1wbGF0ZVNlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b0Zvcm1Nb2R1bGUgeyB9XHJcbiJdfQ==