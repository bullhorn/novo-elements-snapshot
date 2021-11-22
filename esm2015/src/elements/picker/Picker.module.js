// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoOverlayModule } from '../common/overlay/Overlay.module';
import { NovoListModule } from '../list/List.module';
import { NovoLoadingModule } from '../loading/Loading.module';
import { NovoSwitchModule } from '../switch/Switch.module';
import { ChecklistPickerResults } from './extras/checklist-picker-results/ChecklistPickerResults';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/DistributionListPickerResults';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/EntityPickerResults';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/GroupedMultiPickerResults';
import { MixedMultiPickerResults } from './extras/mixed-multi-picker-results/MixedMultiPickerResults';
import { PickerResults } from './extras/picker-results/PickerResults';
import { SkillsSpecialtyPickerResults } from './extras/skills-picker-results/SkillsSpecialtyPickerResults';
import { WorkersCompCodesPickerResults } from './extras/workers-comp-codes-picker-results/WorkersCompCodesPickerResults';
import { NovoPickerElement } from './Picker';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy8iLCJzb3VyY2VzIjpbInNyYy9lbGVtZW50cy9waWNrZXIvUGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDdkgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDN0csT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDNUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDdEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzNHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQTZCN0MsTUFBTSxPQUFPLGdCQUFnQjs7O1lBM0I1QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQzVHLFlBQVksRUFBRTtvQkFDWixpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtvQkFDN0IsNkJBQTZCO29CQUM3Qiw0QkFBNEI7aUJBQzdCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtvQkFDN0IsNkJBQTZCO29CQUM3Qiw0QkFBNEI7aUJBQzdCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLi9saXN0L0xpc3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGluZy9Mb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvU3dpdGNoTW9kdWxlIH0gZnJvbSAnLi4vc3dpdGNoL1N3aXRjaC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cy9DaGVja2xpc3RQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IERpc3RyaWJ1dGlvbkxpc3RQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZGlzdHJpYnV0aW9ubGlzdC1waWNrZXItcmVzdWx0cy9EaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBFbnRpdHlQaWNrZXJSZXN1bHQsIEVudGl0eVBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9lbnRpdHktcGlja2VyLXJlc3VsdHMvRW50aXR5UGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9Hcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvbWl4ZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgUGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL3BpY2tlci1yZXN1bHRzL1BpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL3NraWxscy1waWNrZXItcmVzdWx0cy9Ta2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvd29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzL1dvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IE5vdm9QaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9QaWNrZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTm92b0xvYWRpbmdNb2R1bGUsIE5vdm9MaXN0TW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSwgTm92b1N3aXRjaE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vdm9QaWNrZXJFbGVtZW50LFxuICAgIFBpY2tlclJlc3VsdHMsXG4gICAgRW50aXR5UGlja2VyUmVzdWx0LFxuICAgIEVudGl0eVBpY2tlclJlc3VsdHMsXG4gICAgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyxcbiAgICBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzLFxuICAgIE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzLFxuICAgIERpc3RyaWJ1dGlvbkxpc3RQaWNrZXJSZXN1bHRzLFxuICAgIFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzLFxuICAgIFNraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvUGlja2VyRWxlbWVudCxcbiAgICBQaWNrZXJSZXN1bHRzLFxuICAgIEVudGl0eVBpY2tlclJlc3VsdCxcbiAgICBFbnRpdHlQaWNrZXJSZXN1bHRzLFxuICAgIENoZWNrbGlzdFBpY2tlclJlc3VsdHMsXG4gICAgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyxcbiAgICBNaXhlZE11bHRpUGlja2VyUmVzdWx0cyxcbiAgICBEaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyxcbiAgICBXb3JrZXJzQ29tcENvZGVzUGlja2VyUmVzdWx0cyxcbiAgICBTa2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvUGlja2VyTW9kdWxlIHt9XG4iXX0=