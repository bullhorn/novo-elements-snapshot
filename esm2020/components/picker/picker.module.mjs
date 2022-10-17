// NG2
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoCommonModule } from 'novo-elements/common';
import { NovoOverlayModule } from 'novo-elements/common/overlay';
import { NovoFieldModule } from 'novo-elements/components/field';
import { NovoIconModule } from 'novo-elements/components/icon';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoSwitchModule } from 'novo-elements/components/switch';
import { NovoPipesModule } from 'novo-elements/pipes';
import { ChecklistPickerResults } from './extras/checklist-picker-results/checklist-picker-results';
import { DistributionListPickerResults } from './extras/distributionlist-picker-results/distribution-list-picker-results';
import { EntityPickerResult, EntityPickerResults } from './extras/entity-picker-results/entity-picker-results';
import { GroupedMultiPickerResults } from './extras/grouped-multi-picker-results/grouped-multi-picker-results';
import { MixedMultiPickerResults } from './extras/mixed-multi-picker-results/mixed-multi-picker-results';
import { PickerResults } from './extras/picker-results/picker-results';
import { SkillsSpecialtyPickerResults } from './extras/skills-picker-results/skills-specialty-picker-results';
import { WorkersCompCodesPickerResults } from './extras/workers-comp-codes-picker-results/workers-comp-codes-picker-results';
import { NovoPickerElement } from './picker';
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
        SkillsSpecialtyPickerResults], imports: [CommonModule,
        NovoPipesModule,
        FormsModule,
        NovoCommonModule,
        NovoLoadingModule,
        NovoListModule,
        NovoOverlayModule,
        NovoSwitchModule,
        NovoFieldModule,
        NovoIconModule], exports: [NovoPickerElement,
        PickerResults,
        EntityPickerResult,
        EntityPickerResults,
        ChecklistPickerResults,
        GroupedMultiPickerResults,
        MixedMultiPickerResults,
        DistributionListPickerResults,
        WorkersCompCodesPickerResults,
        SkillsSpecialtyPickerResults] });
NovoPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, imports: [[
            CommonModule,
            NovoPipesModule,
            FormsModule,
            NovoCommonModule,
            NovoLoadingModule,
            NovoListModule,
            NovoOverlayModule,
            NovoSwitchModule,
            NovoFieldModule,
            NovoIconModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        NovoPipesModule,
                        FormsModule,
                        NovoCommonModule,
                        NovoLoadingModule,
                        NovoListModule,
                        NovoOverlayModule,
                        NovoSwitchModule,
                        NovoFieldModule,
                        NovoIconModule,
                    ],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvcGlja2VyL3BpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDcEcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkVBQTJFLENBQUM7QUFDMUgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDL0csT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDL0csT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhFQUE4RSxDQUFDO0FBQzdILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUF3QzdDLE1BQU0sT0FBTyxnQkFBZ0I7OzhHQUFoQixnQkFBZ0I7K0dBQWhCLGdCQUFnQixpQkF4QnpCLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDRCQUE0QixhQXJCNUIsWUFBWTtRQUNaLGVBQWU7UUFDZixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsY0FBYyxhQWVkLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDRCQUE0QjsrR0FHbkIsZ0JBQWdCLFlBckNsQjtZQUNQLFlBQVk7WUFDWixlQUFlO1lBQ2YsV0FBVztZQUNYLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsY0FBYztZQUNkLGlCQUFpQjtZQUNqQixnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLGNBQWM7U0FDZjs0RkEwQlUsZ0JBQWdCO2tCQXRDNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2QsaUJBQWlCO3dCQUNqQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3FCQUM3QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5vdm9Db21tb25Nb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbW1vbic7XG5pbXBvcnQgeyBOb3ZvT3ZlcmxheU1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tbW9uL292ZXJsYXknO1xuaW1wb3J0IHsgTm92b0ZpZWxkTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2ZpZWxkJztcbmltcG9ydCB7IE5vdm9JY29uTW9kdWxlIH0gZnJvbSAnbm92by1lbGVtZW50cy9jb21wb25lbnRzL2ljb24nO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvbGlzdCc7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvY29tcG9uZW50cy9sb2FkaW5nJztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL2NvbXBvbmVudHMvc3dpdGNoJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvcGlwZXMnO1xuaW1wb3J0IHsgQ2hlY2tsaXN0UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL2NoZWNrbGlzdC1waWNrZXItcmVzdWx0cy9jaGVja2xpc3QtcGlja2VyLXJlc3VsdHMnO1xuaW1wb3J0IHsgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9kaXN0cmlidXRpb25saXN0LXBpY2tlci1yZXN1bHRzL2Rpc3RyaWJ1dGlvbi1saXN0LXBpY2tlci1yZXN1bHRzJztcbmltcG9ydCB7IEVudGl0eVBpY2tlclJlc3VsdCwgRW50aXR5UGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL2VudGl0eS1waWNrZXItcmVzdWx0cy9lbnRpdHktcGlja2VyLXJlc3VsdHMnO1xuaW1wb3J0IHsgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL2dyb3VwZWQtbXVsdGktcGlja2VyLXJlc3VsdHMvZ3JvdXBlZC1tdWx0aS1waWNrZXItcmVzdWx0cyc7XG5pbXBvcnQgeyBNaXhlZE11bHRpUGlja2VyUmVzdWx0cyB9IGZyb20gJy4vZXh0cmFzL21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzL21peGVkLW11bHRpLXBpY2tlci1yZXN1bHRzJztcbmltcG9ydCB7IFBpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy9waWNrZXItcmVzdWx0cy9waWNrZXItcmVzdWx0cyc7XG5pbXBvcnQgeyBTa2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzIH0gZnJvbSAnLi9leHRyYXMvc2tpbGxzLXBpY2tlci1yZXN1bHRzL3NraWxscy1zcGVjaWFsdHktcGlja2VyLXJlc3VsdHMnO1xuaW1wb3J0IHsgV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMgfSBmcm9tICcuL2V4dHJhcy93b3JrZXJzLWNvbXAtY29kZXMtcGlja2VyLXJlc3VsdHMvd29ya2Vycy1jb21wLWNvZGVzLXBpY2tlci1yZXN1bHRzJztcbmltcG9ydCB7IE5vdm9QaWNrZXJFbGVtZW50IH0gZnJvbSAnLi9waWNrZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9QaXBlc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxuICAgIE5vdm9MaXN0TW9kdWxlLFxuICAgIE5vdm9PdmVybGF5TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b0ZpZWxkTW9kdWxlLFxuICAgIE5vdm9JY29uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb3ZvUGlja2VyRWxlbWVudCxcbiAgICBQaWNrZXJSZXN1bHRzLFxuICAgIEVudGl0eVBpY2tlclJlc3VsdCxcbiAgICBFbnRpdHlQaWNrZXJSZXN1bHRzLFxuICAgIENoZWNrbGlzdFBpY2tlclJlc3VsdHMsXG4gICAgR3JvdXBlZE11bHRpUGlja2VyUmVzdWx0cyxcbiAgICBNaXhlZE11bHRpUGlja2VyUmVzdWx0cyxcbiAgICBEaXN0cmlidXRpb25MaXN0UGlja2VyUmVzdWx0cyxcbiAgICBXb3JrZXJzQ29tcENvZGVzUGlja2VyUmVzdWx0cyxcbiAgICBTa2lsbHNTcGVjaWFsdHlQaWNrZXJSZXN1bHRzLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b1BpY2tlckVsZW1lbnQsXG4gICAgUGlja2VyUmVzdWx0cyxcbiAgICBFbnRpdHlQaWNrZXJSZXN1bHQsXG4gICAgRW50aXR5UGlja2VyUmVzdWx0cyxcbiAgICBDaGVja2xpc3RQaWNrZXJSZXN1bHRzLFxuICAgIEdyb3VwZWRNdWx0aVBpY2tlclJlc3VsdHMsXG4gICAgTWl4ZWRNdWx0aVBpY2tlclJlc3VsdHMsXG4gICAgRGlzdHJpYnV0aW9uTGlzdFBpY2tlclJlc3VsdHMsXG4gICAgV29ya2Vyc0NvbXBDb2Rlc1BpY2tlclJlc3VsdHMsXG4gICAgU2tpbGxzU3BlY2lhbHR5UGlja2VyUmVzdWx0cyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b1BpY2tlck1vZHVsZSB7fVxuIl19