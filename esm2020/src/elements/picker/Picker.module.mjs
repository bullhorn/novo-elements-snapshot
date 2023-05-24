// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from '../../pipes/Pipes.module';
import { NovoCommonModule } from '../common';
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
import * as i0 from "@angular/core";
export class NovoPickerModule {
}
NovoPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, declarations: [NovoPickerElement,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        MixedMultiPickerResults,
        DistributionListPickerResults,
        WorkersCompCodesPickerResults,
        SkillsSpecialtyPickerResults], imports: [CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule], exports: [NovoPickerElement,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        MixedMultiPickerResults,
        DistributionListPickerResults,
        WorkersCompCodesPickerResults,
        SkillsSpecialtyPickerResults] });
NovoPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, imports: [[CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NovoPipesModule, FormsModule, NovoCommonModule, NovoLoadingModule, NovoListModule, NovoOverlayModule, NovoSwitchModule],
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BpY2tlci9QaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzdHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzVHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUMzRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUN6SCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBNkI3QyxNQUFNLE9BQU8sZ0JBQWdCOzs4R0FBaEIsZ0JBQWdCOytHQUFoQixnQkFBZ0IsaUJBeEJ6QixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3Qiw0QkFBNEIsYUFYcEIsWUFBWSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixhQWM1SSxpQkFBaUI7UUFDakIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7K0dBR25CLGdCQUFnQixZQTFCbEIsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7NEZBMEJwSSxnQkFBZ0I7a0JBM0I1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDL0ksWUFBWSxFQUFFO3dCQUNaLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3dCQUN0Qix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3Qiw2QkFBNkI7d0JBQzdCLDRCQUE0QjtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsc0JBQXNCO3dCQUN0Qix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3Qiw2QkFBNkI7d0JBQzdCLDRCQUE0QjtxQkFDN0I7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBBUFBcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4uLy4uL3BpcGVzL1BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL292ZXJsYXkvT3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuLi9saXN0L0xpc3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi4vbG9hZGluZy9Mb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvU3dpdGNoTW9kdWxlIH0gZnJvbSAnLi4vc3dpdGNoL1N3aXRjaC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cy9DaGVja2xpc3RQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IERpc3RyaWJ1dGlvbkxpc3RQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZGlzdHJpYnV0aW9ubGlzdC1waWNrZXItcmVzdWx0cy9EaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBFbnRpdHlQaWNrZXJSZXN1bHQsIEVudGl0eVBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9lbnRpdHktcGlja2VyLXJlc3VsdHMvRW50aXR5UGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9Hcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvbWl4ZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgUGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL3BpY2tlci1yZXN1bHRzL1BpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL3NraWxscy1waWNrZXItcmVzdWx0cy9Ta2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvd29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzL1dvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IE5vdm9QaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9QaWNrZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3ZvUGlwZXNNb2R1bGUsIEZvcm1zTW9kdWxlLCBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvTG9hZGluZ01vZHVsZSwgTm92b0xpc3RNb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlLCBOb3ZvU3dpdGNoTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTm92b1BpY2tlckVsZW1lbnQsXG4gICAgUGlja2VyUmVzdWx0cyxcbiAgICBFbnRpdHlQaWNrZXJSZXN1bHQsXG4gICAgRW50aXR5UGlja2VyUmVzdWx0cyxcbiAgICBDaGVja2xpc3RQaWNrZXJSZXN1bHRzLFxuICAgIEdyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHMsXG4gICAgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMsXG4gICAgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMsXG4gICAgV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMsXG4gICAgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9QaWNrZXJFbGVtZW50LFxuICAgIFBpY2tlclJlc3VsdHMsXG4gICAgRW50aXR5UGlja2VyUmVzdWx0LFxuICAgIEVudGl0eVBpY2tlclJlc3VsdHMsXG4gICAgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyxcbiAgICBHcm91cGVkTXVsdGlQaWNrZXJSZXN1bHRzLFxuICAgIE1peGVkTXVsdGlQaWNrZXJSZXN1bHRzLFxuICAgIERpc3RyaWJ1dGlvbkxpc3RQaWNrZXJSZXN1bHRzLFxuICAgIFdvcmtlcnNDb21wQ29kZXNQaWNrZXJSZXN1bHRzLFxuICAgIFNraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdm9QaWNrZXJNb2R1bGUge31cbiJdfQ==