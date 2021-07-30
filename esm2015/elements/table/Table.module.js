// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// APP
import { NovoButtonModule } from '../button/Button.module';
import { NovoToastModule } from '../toast/Toast.module';
import { NovoTooltipModule } from '../tooltip/Tooltip.module';
import { NovoDropdownModule } from '../dropdown/Dropdown.module';
import { NovoFormModule } from '../form/Form.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoDatePickerModule } from '../date-picker/DatePicker.module';
import { NovoTableExtrasModule } from './extras/TableExtras.module';
import { NovoTableElement } from './Table';
import { NovoFormExtrasModule } from '../form/extras/FormExtras.module';
export class NovoTableModule {
}
NovoTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    NovoFormModule,
                    NovoTableExtrasModule,
                    NovoToastModule,
                    NovoButtonModule,
                    NovoTooltipModule,
                    NovoDropdownModule,
                    NovoLoadingModule,
                    NovoDatePickerModule,
                    NovoFormExtrasModule,
                    TextMaskModule,
                ],
                declarations: [NovoTableElement],
                exports: [NovoTableElement],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy90YWJsZS9UYWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxTQUFTO0FBQ1QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE1BQU07QUFDTixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQW9CeEUsTUFBTSxPQUFPLGVBQWU7OztZQWxCM0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsY0FBYztpQkFDZjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbi8vIFZlbmRvclxyXG5pbXBvcnQgeyBUZXh0TWFza01vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXRleHQtbWFzayc7XHJcbi8vIEFQUFxyXG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVG9hc3RNb2R1bGUgfSBmcm9tICcuLi90b2FzdC9Ub2FzdC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4uL3Rvb2x0aXAvVG9vbHRpcC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuLi9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRm9ybU1vZHVsZSB9IGZyb20gJy4uL2Zvcm0vRm9ybS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4uL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0ZVBpY2tlck1vZHVsZSB9IGZyb20gJy4uL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1RhYmxlRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi9leHRyYXMvVGFibGVFeHRyYXMubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1RhYmxlRWxlbWVudCB9IGZyb20gJy4vVGFibGUnO1xyXG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJy4uL2Zvcm0vZXh0cmFzL0Zvcm1FeHRyYXMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBOb3ZvRm9ybU1vZHVsZSxcclxuICAgIE5vdm9UYWJsZUV4dHJhc01vZHVsZSxcclxuICAgIE5vdm9Ub2FzdE1vZHVsZSxcclxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXHJcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcclxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcclxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxyXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXHJcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcclxuICAgIFRleHRNYXNrTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTm92b1RhYmxlRWxlbWVudF0sXHJcbiAgZXhwb3J0czogW05vdm9UYWJsZUVsZW1lbnRdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTm92b1RhYmxlTW9kdWxlIHt9XHJcbiJdfQ==