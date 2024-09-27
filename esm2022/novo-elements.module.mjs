// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoAceEditorModule, NovoCodeEditorModule, NovoNovoCKEditorModule } from 'novo-elements/addons';
import { FormUtils, GooglePlacesModule, GooglePlacesService, NovoAgendaModule, NovoAsideModule, NovoAutoCompleteModule, NovoAvatarModule, NovoBreadcrumbModule, NovoButtonModule, NovoCalendarModule, NovoCardModule, NovoCategoryDropdownModule, NovoCheckboxModule, NovoChipsModule, NovoColorPickerModule, NovoCommonModule, NovoDataTableModule, NovoDatePickerModule, NovoDateTimePickerModule, NovoDividerModule, NovoDragDropModule, NovoDropdownModule, NovoExpansionModule, NovoFieldModule, NovoFlexModule, NovoFormExtrasModule, NovoFormModule, NovoHeaderModule, NovoIconModule, NovoLayoutModule, NovoListModule, NovoLoadingModule, NovoMenuModule, NovoModalModule, NovoMultiPickerModule, NovoNonIdealStateModule, NovoOptionModule, NovoOverlayModule, NovoPickerModule, NovoPopOverModule, NovoProgressModule, NovoQueryBuilderModule, NovoQuickNoteModule, NovoRadioModule, NovoSearchBoxModule, NovoSelectModule, NovoSelectSearchModule, NovoSimpleTableModule, NovoSliderModule, NovoStepperModule, NovoSwitchModule, NovoTabModule, NovoTabbedGroupPickerModule, NovoTilesModule, NovoTimePickerModule, NovoTipWellModule, NovoToastModule, NovoToolbarModule, NovoTooltipModule, NovoValueModule, UnlessModule, } from 'novo-elements/elements';
import { NovoPipesModule } from 'novo-elements/pipes';
import { BrowserGlobalRef, ComponentUtils, DateFormatService, GlobalRef, LocalStorageService, NovoLabelService, OptionsService, } from 'novo-elements/services';
import * as i0 from "@angular/core";
export class NovoElementsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoElementsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.3", ngImport: i0, type: NovoElementsModule, imports: [ReactiveFormsModule], exports: [NovoAsideModule,
            NovoAutoCompleteModule,
            NovoAvatarModule,
            NovoPipesModule,
            NovoButtonModule,
            NovoLoadingModule,
            NovoCardModule,
            NovoAgendaModule,
            NovoCalendarModule,
            NovoCheckboxModule,
            NovoFlexModule,
            NovoLayoutModule,
            NovoDividerModule,
            NovoToastModule,
            NovoTooltipModule,
            NovoHeaderModule,
            NovoTabModule,
            NovoTilesModule,
            NovoModalModule,
            NovoQuickNoteModule,
            NovoRadioModule,
            NovoDropdownModule,
            NovoSelectModule,
            NovoListModule,
            NovoSwitchModule,
            NovoSliderModule,
            NovoPickerModule,
            NovoChipsModule,
            NovoDatePickerModule,
            NovoTimePickerModule,
            NovoDateTimePickerModule,
            NovoNovoCKEditorModule,
            NovoTipWellModule,
            NovoSimpleTableModule,
            NovoFormModule,
            NovoFormExtrasModule,
            NovoCategoryDropdownModule,
            NovoMultiPickerModule,
            NovoPopOverModule,
            NovoDataTableModule,
            NovoSearchBoxModule,
            NovoProgressModule,
            NovoOverlayModule,
            NovoDragDropModule,
            GooglePlacesModule,
            NovoValueModule,
            NovoAceEditorModule,
            NovoCodeEditorModule,
            NovoIconModule,
            NovoExpansionModule,
            UnlessModule,
            NovoCommonModule,
            NovoOptionModule,
            NovoStepperModule,
            NovoToolbarModule,
            ScrollingModule,
            NovoTabbedGroupPickerModule,
            NovoNonIdealStateModule,
            NovoBreadcrumbModule,
            NovoFieldModule,
            NovoColorPickerModule,
            NovoMenuModule,
            NovoSelectSearchModule,
            NovoQueryBuilderModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoElementsModule, providers: [
            { provide: ComponentUtils, useClass: ComponentUtils },
            { provide: DateFormatService, useClass: DateFormatService },
            { provide: NovoLabelService, useClass: NovoLabelService },
            { provide: GooglePlacesService, useClass: GooglePlacesService },
            { provide: GlobalRef, useClass: BrowserGlobalRef },
            { provide: LocalStorageService, useClass: LocalStorageService },
            { provide: OptionsService, useClass: OptionsService },
            { provide: FormUtils, useClass: FormUtils },
        ], imports: [ReactiveFormsModule, NovoAsideModule,
            NovoAutoCompleteModule,
            NovoAvatarModule,
            NovoPipesModule,
            NovoButtonModule,
            NovoLoadingModule,
            NovoCardModule,
            NovoAgendaModule,
            NovoCalendarModule,
            NovoCheckboxModule,
            NovoFlexModule,
            NovoLayoutModule,
            NovoDividerModule,
            NovoToastModule,
            NovoTooltipModule,
            NovoHeaderModule,
            NovoTabModule,
            NovoTilesModule,
            NovoModalModule,
            NovoQuickNoteModule,
            NovoRadioModule,
            NovoDropdownModule,
            NovoSelectModule,
            NovoListModule,
            NovoSwitchModule,
            NovoSliderModule,
            NovoPickerModule,
            NovoChipsModule,
            NovoDatePickerModule,
            NovoTimePickerModule,
            NovoDateTimePickerModule,
            NovoNovoCKEditorModule,
            NovoTipWellModule,
            NovoSimpleTableModule,
            NovoFormModule,
            NovoFormExtrasModule,
            NovoCategoryDropdownModule,
            NovoMultiPickerModule,
            NovoPopOverModule,
            NovoDataTableModule,
            NovoSearchBoxModule,
            NovoProgressModule,
            NovoOverlayModule,
            NovoDragDropModule,
            GooglePlacesModule,
            NovoValueModule,
            NovoAceEditorModule,
            NovoCodeEditorModule,
            NovoIconModule,
            NovoExpansionModule,
            UnlessModule,
            NovoCommonModule,
            NovoOptionModule,
            NovoStepperModule,
            NovoToolbarModule,
            ScrollingModule,
            NovoTabbedGroupPickerModule,
            NovoNonIdealStateModule,
            NovoBreadcrumbModule,
            NovoFieldModule,
            NovoColorPickerModule,
            NovoMenuModule,
            NovoSelectSearchModule,
            NovoQueryBuilderModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoElementsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ReactiveFormsModule],
                    exports: [
                        NovoAsideModule,
                        NovoAutoCompleteModule,
                        NovoAvatarModule,
                        NovoPipesModule,
                        NovoButtonModule,
                        NovoLoadingModule,
                        NovoCardModule,
                        NovoAgendaModule,
                        NovoCalendarModule,
                        NovoCheckboxModule,
                        NovoFlexModule,
                        NovoLayoutModule,
                        NovoDividerModule,
                        NovoToastModule,
                        NovoTooltipModule,
                        NovoHeaderModule,
                        NovoTabModule,
                        NovoTilesModule,
                        NovoModalModule,
                        NovoQuickNoteModule,
                        NovoRadioModule,
                        NovoDropdownModule,
                        NovoSelectModule,
                        NovoListModule,
                        NovoSwitchModule,
                        NovoSliderModule,
                        NovoPickerModule,
                        NovoChipsModule,
                        NovoDatePickerModule,
                        NovoTimePickerModule,
                        NovoDateTimePickerModule,
                        NovoNovoCKEditorModule,
                        NovoTipWellModule,
                        NovoSimpleTableModule,
                        NovoFormModule,
                        NovoFormExtrasModule,
                        NovoCategoryDropdownModule,
                        NovoMultiPickerModule,
                        NovoPopOverModule,
                        NovoDataTableModule,
                        NovoSearchBoxModule,
                        NovoProgressModule,
                        NovoOverlayModule,
                        NovoDragDropModule,
                        GooglePlacesModule,
                        NovoValueModule,
                        NovoAceEditorModule,
                        NovoCodeEditorModule,
                        NovoIconModule,
                        NovoExpansionModule,
                        UnlessModule,
                        NovoCommonModule,
                        NovoOptionModule,
                        NovoStepperModule,
                        NovoToolbarModule,
                        ScrollingModule,
                        NovoTabbedGroupPickerModule,
                        NovoNonIdealStateModule,
                        NovoBreadcrumbModule,
                        NovoFieldModule,
                        NovoColorPickerModule,
                        NovoMenuModule,
                        NovoSelectSearchModule,
                        NovoQueryBuilderModule,
                    ],
                    providers: [
                        { provide: ComponentUtils, useClass: ComponentUtils },
                        { provide: DateFormatService, useClass: DateFormatService },
                        { provide: NovoLabelService, useClass: NovoLabelService },
                        { provide: GooglePlacesService, useClass: GooglePlacesService },
                        { provide: GlobalRef, useClass: BrowserGlobalRef },
                        { provide: LocalStorageService, useClass: LocalStorageService },
                        { provide: OptionsService, useClass: OptionsService },
                        { provide: FormUtils, useClass: FormUtils },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9ub3ZvLWVsZW1lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekcsT0FBTyxFQUNMLFNBQVMsRUFDVCxrQkFBa0IsRUFBRSxtQkFBbUIsRUFDdkMsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixzQkFBc0IsRUFDdEIsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCwwQkFBMEIsRUFDMUIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsd0JBQXdCLEVBQ3hCLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsY0FBYyxFQUNkLG9CQUFvQixFQUFFLGNBQWMsRUFDcEMsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZUFBZSxFQUNmLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQ25DLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0QixtQkFBbUIs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RUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO3dCQUMvRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO3dCQUNsRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7d0JBQy9ELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO3dCQUNyRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtxQkFDNUM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQWNlRWRpdG9yTW9kdWxlLCBOb3ZvQ29kZUVkaXRvck1vZHVsZSwgTm92b05vdm9DS0VkaXRvck1vZHVsZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvYWRkb25zJztcbmltcG9ydCB7XG4gIEZvcm1VdGlscyxcbiAgR29vZ2xlUGxhY2VzTW9kdWxlLCBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICBOb3ZvQWdlbmRhTW9kdWxlLFxuICBOb3ZvQXNpZGVNb2R1bGUsXG4gIE5vdm9BdXRvQ29tcGxldGVNb2R1bGUsXG4gIE5vdm9BdmF0YXJNb2R1bGUsXG4gIE5vdm9CcmVhZGNydW1iTW9kdWxlLFxuICBOb3ZvQnV0dG9uTW9kdWxlLFxuICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXG4gIE5vdm9DYXJkTW9kdWxlLFxuICBOb3ZvQ2F0ZWdvcnlEcm9wZG93bk1vZHVsZSxcbiAgTm92b0NoZWNrYm94TW9kdWxlLFxuICBOb3ZvQ2hpcHNNb2R1bGUsXG4gIE5vdm9Db2xvclBpY2tlck1vZHVsZSxcbiAgTm92b0NvbW1vbk1vZHVsZSxcbiAgTm92b0RhdGFUYWJsZU1vZHVsZSxcbiAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXG4gIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgTm92b0RpdmlkZXJNb2R1bGUsXG4gIE5vdm9EcmFnRHJvcE1vZHVsZSxcbiAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICBOb3ZvRXhwYW5zaW9uTW9kdWxlLFxuICBOb3ZvRmllbGRNb2R1bGUsXG4gIE5vdm9GbGV4TW9kdWxlLFxuICBOb3ZvRm9ybUV4dHJhc01vZHVsZSwgTm92b0Zvcm1Nb2R1bGUsXG4gIE5vdm9IZWFkZXJNb2R1bGUsXG4gIE5vdm9JY29uTW9kdWxlLFxuICBOb3ZvTGF5b3V0TW9kdWxlLFxuICBOb3ZvTGlzdE1vZHVsZSxcbiAgTm92b0xvYWRpbmdNb2R1bGUsXG4gIE5vdm9NZW51TW9kdWxlLFxuICBOb3ZvTW9kYWxNb2R1bGUsXG4gIE5vdm9NdWx0aVBpY2tlck1vZHVsZSxcbiAgTm92b05vbklkZWFsU3RhdGVNb2R1bGUsXG4gIE5vdm9PcHRpb25Nb2R1bGUsIE5vdm9PdmVybGF5TW9kdWxlLFxuICBOb3ZvUGlja2VyTW9kdWxlLFxuICBOb3ZvUG9wT3Zlck1vZHVsZSxcbiAgTm92b1Byb2dyZXNzTW9kdWxlLFxuICBOb3ZvUXVlcnlCdWlsZGVyTW9kdWxlLFxuICBOb3ZvUXVpY2tOb3RlTW9kdWxlLFxuICBOb3ZvUmFkaW9Nb2R1bGUsXG4gIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gIE5vdm9TZWxlY3RNb2R1bGUsXG4gIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUsXG4gIE5vdm9TaW1wbGVUYWJsZU1vZHVsZSxcbiAgTm92b1NsaWRlck1vZHVsZSxcbiAgTm92b1N0ZXBwZXJNb2R1bGUsXG4gIE5vdm9Td2l0Y2hNb2R1bGUsXG4gIE5vdm9UYWJNb2R1bGUsXG4gIE5vdm9UYWJiZWRHcm91cFBpY2tlck1vZHVsZSxcbiAgTm92b1RpbGVzTW9kdWxlLFxuICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcbiAgTm92b1RpcFdlbGxNb2R1bGUsXG4gIE5vdm9Ub2FzdE1vZHVsZSxcbiAgTm92b1Rvb2xiYXJNb2R1bGUsXG4gIE5vdm9Ub29sdGlwTW9kdWxlLFxuICBOb3ZvVmFsdWVNb2R1bGUsXG4gIFVubGVzc01vZHVsZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cyc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3BpcGVzJztcbmltcG9ydCB7XG4gIEJyb3dzZXJHbG9iYWxSZWYsXG4gIENvbXBvbmVudFV0aWxzLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgR2xvYmFsUmVmLFxuICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICBOb3ZvTGFiZWxTZXJ2aWNlLFxuICBPcHRpb25zU2VydmljZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9Bc2lkZU1vZHVsZSxcbiAgICBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIE5vdm9BdmF0YXJNb2R1bGUsXG4gICAgTm92b1BpcGVzTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0FnZW5kYU1vZHVsZSxcbiAgICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9MYXlvdXRNb2R1bGUsXG4gICAgTm92b0RpdmlkZXJNb2R1bGUsXG4gICAgTm92b1RvYXN0TW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9IZWFkZXJNb2R1bGUsXG4gICAgTm92b1RhYk1vZHVsZSxcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXG4gICAgTm92b01vZGFsTW9kdWxlLFxuICAgIE5vdm9RdWlja05vdGVNb2R1bGUsXG4gICAgTm92b1JhZGlvTW9kdWxlLFxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9MaXN0TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b1NsaWRlck1vZHVsZSxcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vdm9DS0VkaXRvck1vZHVsZSxcbiAgICBOb3ZvVGlwV2VsbE1vZHVsZSxcbiAgICBOb3ZvU2ltcGxlVGFibGVNb2R1bGUsXG4gICAgTm92b0Zvcm1Nb2R1bGUsXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXG4gICAgTm92b0NhdGVnb3J5RHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b011bHRpUGlja2VyTW9kdWxlLFxuICAgIE5vdm9Qb3BPdmVyTW9kdWxlLFxuICAgIE5vdm9EYXRhVGFibGVNb2R1bGUsXG4gICAgTm92b1NlYXJjaEJveE1vZHVsZSxcbiAgICBOb3ZvUHJvZ3Jlc3NNb2R1bGUsXG4gICAgTm92b092ZXJsYXlNb2R1bGUsXG4gICAgTm92b0RyYWdEcm9wTW9kdWxlLFxuICAgIEdvb2dsZVBsYWNlc01vZHVsZSxcbiAgICBOb3ZvVmFsdWVNb2R1bGUsXG4gICAgTm92b0FjZUVkaXRvck1vZHVsZSxcbiAgICBOb3ZvQ29kZUVkaXRvck1vZHVsZSxcbiAgICBOb3ZvSWNvbk1vZHVsZSxcbiAgICBOb3ZvRXhwYW5zaW9uTW9kdWxlLFxuICAgIFVubGVzc01vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9PcHRpb25Nb2R1bGUsXG4gICAgTm92b1N0ZXBwZXJNb2R1bGUsXG4gICAgTm92b1Rvb2xiYXJNb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxuICAgIE5vdm9UYWJiZWRHcm91cFBpY2tlck1vZHVsZSxcbiAgICBOb3ZvTm9uSWRlYWxTdGF0ZU1vZHVsZSxcbiAgICBOb3ZvQnJlYWRjcnVtYk1vZHVsZSxcbiAgICBOb3ZvRmllbGRNb2R1bGUsXG4gICAgTm92b0NvbG9yUGlja2VyTW9kdWxlLFxuICAgIE5vdm9NZW51TW9kdWxlLFxuICAgIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUsXG4gICAgTm92b1F1ZXJ5QnVpbGRlck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDb21wb25lbnRVdGlscywgdXNlQ2xhc3M6IENvbXBvbmVudFV0aWxzIH0sXG4gICAgeyBwcm92aWRlOiBEYXRlRm9ybWF0U2VydmljZSwgdXNlQ2xhc3M6IERhdGVGb3JtYXRTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBOb3ZvTGFiZWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b0xhYmVsU2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogR29vZ2xlUGxhY2VzU2VydmljZSwgdXNlQ2xhc3M6IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgICB7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBPcHRpb25zU2VydmljZSwgdXNlQ2xhc3M6IE9wdGlvbnNTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBGb3JtVXRpbHMsIHVzZUNsYXNzOiBGb3JtVXRpbHMgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRzTW9kdWxlIHt9XG4iXX0=