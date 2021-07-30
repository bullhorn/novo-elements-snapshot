// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoOverlayModule } from '../overlay/Overlay.module';
import { NovoListModule } from '../list/List.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSwitchModule } from '../switch/Switch.module';
import { NovoPickerElement } from './Picker';
import { PickerResults } from './extras/picker-results/PickerResults';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';
import { ChecklistPickerResults } from './extras/checklist-picker-results/ChecklistPickerResults';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/GroupedMultiPickerResults';
import { MixedMultiPickerResults } from './extras/mixed-multi-picker-results/MixedMultiPickerResults';
import { SkillsSpecialtyPickerResults } from './extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/DistributionListPickerResults';
import { WorkersCompCodesPickerResults } from './extras/workers-comp-codes-picker-results/WorkersCompCodesPickerResults';
export class NovoPickerModule {
}
NovoPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule],
                declarations: [
                    NovoPickerElement,
                    PickerResults,
                    EntityPickerResult,
                    EntityPickerResults,
                    ChecklistPickerResults,
                    GroupedMultiPickerResults,
                    MixedMultiPickerResults,
                    DistributionListPickerResults,
                    WorkersCompCodesPickerResults,
                    SkillsSpecialtyPickerResults,
                ],
                exports: [
                    NovoPickerElement,
                    PickerResults,
                    EntityPickerResult,
                    EntityPickerResults,
                    ChecklistPickerResults,
                    GroupedMultiPickerResults,
                    MixedMultiPickerResults,
                    DistributionListPickerResults,
                    WorkersCompCodesPickerResults,
                    SkillsSpecialtyPickerResults,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcGlja2VyL1BpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDN0csT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDNUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDdEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDM0csT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDdkgsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUE2QnpILE1BQU0sT0FBTyxnQkFBZ0I7OztZQTNCNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO2dCQUM1RyxZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0IsNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsbUJBQW1CO29CQUNuQixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0IsNEJBQTRCO2lCQUM3QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG4vLyBBUFBcclxuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLi9saXN0L0xpc3QubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuLi9sb2FkaW5nL0xvYWRpbmcubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1N3aXRjaE1vZHVsZSB9IGZyb20gJy4uL3N3aXRjaC9Td2l0Y2gubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1BpY2tlckVsZW1lbnQgfSBmcm9tICcuL1BpY2tlcic7XHJcbmltcG9ydCB7IFBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9waWNrZXItcmVzdWx0cy9QaWNrZXJSZXN1bHRzJztcclxuaW1wb3J0IHsgRW50aXR5UGlja2VyUmVzdWx0LCBFbnRpdHlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZW50aXR5LXBpY2tlci1yZXN1bHRzL0VudGl0eVBpY2tlclJlc3VsdHMnO1xyXG5pbXBvcnQgeyBDaGVja2xpc3RQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvY2hlY2tsaXN0LXBpY2tlci1yZXN1bHRzL0NoZWNrbGlzdFBpY2tlclJlc3VsdHMnO1xyXG5pbXBvcnQgeyBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9Hcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzJztcclxuaW1wb3J0IHsgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9taXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9NaXhlZE11bHRpUGlja2VyUmVzdWx0cyc7XHJcbmltcG9ydCB7IFNraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9za2lsbHMtcGlja2VyLXJlc3VsdHMvU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyc7XHJcbmltcG9ydCB7IERpc3RyaWJ1dGlvbkxpc3RQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZGlzdHJpYnV0aW9ubGlzdC1waWNrZXItcmVzdWx0cy9EaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyc7XHJcbmltcG9ydCB7IFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvd29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzL1dvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9Mb2FkaW5nTW9kdWxlLCBOb3ZvTGlzdE1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9Td2l0Y2hNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTm92b1BpY2tlckVsZW1lbnQsXHJcbiAgICBQaWNrZXJSZXN1bHRzLFxyXG4gICAgRW50aXR5UGlja2VyUmVzdWx0LFxyXG4gICAgRW50aXR5UGlja2VyUmVzdWx0cyxcclxuICAgIENoZWNrbGlzdFBpY2tlclJlc3VsdHMsXHJcbiAgICBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzLFxyXG4gICAgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMsXHJcbiAgICBEaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyxcclxuICAgIFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzLFxyXG4gICAgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE5vdm9QaWNrZXJFbGVtZW50LFxyXG4gICAgUGlja2VyUmVzdWx0cyxcclxuICAgIEVudGl0eVBpY2tlclJlc3VsdCxcclxuICAgIEVudGl0eVBpY2tlclJlc3VsdHMsXHJcbiAgICBDaGVja2xpc3RQaWNrZXJSZXN1bHRzLFxyXG4gICAgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyxcclxuICAgIE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzLFxyXG4gICAgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMsXHJcbiAgICBXb3JrZXJzQ29tcENvZGVzUGlja2VyUmVzdWx0cyxcclxuICAgIFNraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMsXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9QaWNrZXJNb2R1bGUgeyB9XHJcbiJdfQ==