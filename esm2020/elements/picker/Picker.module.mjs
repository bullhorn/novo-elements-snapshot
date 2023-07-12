// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from 'novo-elements/pipes';
import { NovoCommonModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BpY2tlci9QaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDbEcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDdkgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDN0csT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDNUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDdEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzNHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUE2QjdDLE1BQU0sT0FBTyxnQkFBZ0I7OzhHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkF4QnpCLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDRCQUE0QixhQVhwQixZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLGFBYzVJLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDRCQUE0QjsrR0FHbkIsZ0JBQWdCLFlBMUJsQixDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQzs0RkEwQnBJLGdCQUFnQjtrQkEzQjVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO29CQUMvSSxZQUFZLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3FCQUM3QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIEFQUFxuaW1wb3J0IHsgTm92b1BpcGVzTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9waXBlcyc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9MaXN0TW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9saXN0JztcbmltcG9ydCB7IE5vdm9Mb2FkaW5nTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2VsZW1lbnRzL3N3aXRjaCc7XG5pbXBvcnQgeyBDaGVja2xpc3RQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvY2hlY2tsaXN0LXBpY2tlci1yZXN1bHRzL0NoZWNrbGlzdFBpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9kaXN0cmlidXRpb25saXN0LXBpY2tlci1yZXN1bHRzL0Rpc3RyaWJ1dGlvbkxpc3RQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IEVudGl0eVBpY2tlclJlc3VsdCwgRW50aXR5UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL2VudGl0eS1waWNrZXItcmVzdWx0cy9FbnRpdHlQaWNrZXJSZXN1bHRzJztcbmltcG9ydCB7IEdyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9ncm91cGVkLW11bHRpLXBpY2tlci1yZXN1bHRzL0dyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9taXhlZC1tdWx0aS1waWNrZXItcmVzdWx0cy9NaXhlZE11bHRpUGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvcGlja2VyLXJlc3VsdHMvUGlja2VyUmVzdWx0cyc7XG5pbXBvcnQgeyBTa2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvc2tpbGxzLXBpY2tlci1yZXN1bHRzL1NraWxsc1NwZWNpYWx0eVBpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy93b3JrZXJzLWNvbXAtY29kZXMtcGlja2VyLXJlc3VsdHMvV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMnO1xuaW1wb3J0IHsgTm92b1BpY2tlckVsZW1lbnQgfSBmcm9tICcuL1BpY2tlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdm9QaXBlc01vZHVsZSwgRm9ybXNNb2R1bGUsIE5vdm9Db21tb25Nb2R1bGUsIE5vdm9Mb2FkaW5nTW9kdWxlLCBOb3ZvTGlzdE1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsIE5vdm9Td2l0Y2hNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvUGlja2VyRWxlbWVudCxcbiAgICBQaWNrZXJSZXN1bHRzLFxuICAgIEVudGl0eVBpY2tlclJlc3VsdCxcbiAgICBFbnRpdHlQaWNrZXJSZXN1bHRzLFxuICAgIENoZWNrbGlzdFBpY2tlclJlc3VsdHMsXG4gICAgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyxcbiAgICBNaXhlZE11bHRpUGlja2VyUmVzdWx0cyxcbiAgICBEaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyxcbiAgICBXb3JrZXJzQ29tcENvZGVzUGlja2VyUmVzdWx0cyxcbiAgICBTa2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1BpY2tlckVsZW1lbnQsXG4gICAgUGlja2VyUmVzdWx0cyxcbiAgICBFbnRpdHlQaWNrZXJSZXN1bHQsXG4gICAgRW50aXR5UGlja2VyUmVzdWx0cyxcbiAgICBDaGVja2xpc3RQaWNrZXJSZXN1bHRzLFxuICAgIEdyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHMsXG4gICAgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMsXG4gICAgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMsXG4gICAgV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMsXG4gICAgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1BpY2tlck1vZHVsZSB7fVxuIl19