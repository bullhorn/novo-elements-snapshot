// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoAceEditorModule, NovoNovoCKEditorModule, NovoDragulaModule, NovoDragulaService } from 'novo-elements/addons';
import { NovoAgendaModule, NovoAsideModule, NovoAutoCompleteModule, NovoAvatarModule, NovoBreadcrumbModule, NovoButtonModule, NovoCalendarModule, NovoCardModule, NovoCategoryDropdownModule, NovoCheckboxModule, NovoChipsModule, NovoColorPickerModule, NovoCommonModule, NovoOptionModule, NovoOverlayModule, NovoDataTableModule, NovoDatePickerModule, NovoDateTimePickerModule, NovoDividerModule, NovoDropdownModule, NovoExpansionModule, NovoFieldModule, NovoFlexModule, FormUtils, NovoFormExtrasModule, NovoFormModule, NovoHeaderModule, NovoIconModule, NovoLayoutModule, NovoListModule, NovoLoadingModule, NovoMenuModule, NovoModalModule, NovoMultiPickerModule, NovoNonIdealStateModule, NovoPickerModule, GooglePlacesModule, GooglePlacesService, NovoPopOverModule, NovoProgressModule, NovoQueryBuilderModule, NovoQuickNoteModule, NovoRadioModule, NovoSearchBoxModule, NovoSelectSearchModule, NovoSelectModule, NovoSimpleTableModule, NovoSliderModule, NovoStepperModule, NovoSwitchModule, NovoTabbedGroupPickerModule, NovoTableExtrasModule, NovoTableModule, NovoTabModule, NovoTilesModule, NovoTimePickerModule, NovoTipWellModule, NovoToastModule, NovoToolbarModule, NovoTooltipModule, UnlessModule, NovoValueModule, } from 'novo-elements/elements';
import { NovoPipesModule } from 'novo-elements/pipes';
import { BrowserGlobalRef, ComponentUtils, DateFormatService, GlobalRef, LocalStorageService, NovoLabelService, OptionsService, } from 'novo-elements/services';
import * as i0 from "@angular/core";
export class NovoElementsModule {
}
NovoElementsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NovoElementsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementsModule, imports: [ReactiveFormsModule], exports: [NovoAsideModule,
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
        NovoDragulaModule,
        NovoSliderModule,
        NovoPickerModule,
        NovoChipsModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoDateTimePickerModule,
        NovoNovoCKEditorModule,
        NovoTipWellModule,
        NovoSimpleTableModule,
        NovoTableModule,
        NovoTableExtrasModule,
        NovoFormModule,
        NovoFormExtrasModule,
        NovoCategoryDropdownModule,
        NovoMultiPickerModule,
        NovoPopOverModule,
        NovoDataTableModule,
        NovoSearchBoxModule,
        NovoProgressModule,
        NovoOverlayModule,
        GooglePlacesModule,
        NovoValueModule,
        NovoAceEditorModule,
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
        NovoQueryBuilderModule] });
NovoElementsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementsModule, providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: DateFormatService, useClass: DateFormatService },
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: NovoDragulaService, useClass: NovoDragulaService },
        { provide: GooglePlacesService, useClass: GooglePlacesService },
        { provide: GlobalRef, useClass: BrowserGlobalRef },
        { provide: LocalStorageService, useClass: LocalStorageService },
        { provide: OptionsService, useClass: OptionsService },
        { provide: FormUtils, useClass: FormUtils },
    ], imports: [[ReactiveFormsModule], NovoAsideModule,
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
        NovoDragulaModule,
        NovoSliderModule,
        NovoPickerModule,
        NovoChipsModule,
        NovoDatePickerModule,
        NovoTimePickerModule,
        NovoDateTimePickerModule,
        NovoNovoCKEditorModule,
        NovoTipWellModule,
        NovoSimpleTableModule,
        NovoTableModule,
        NovoTableExtrasModule,
        NovoFormModule,
        NovoFormExtrasModule,
        NovoCategoryDropdownModule,
        NovoMultiPickerModule,
        NovoPopOverModule,
        NovoDataTableModule,
        NovoSearchBoxModule,
        NovoProgressModule,
        NovoOverlayModule,
        GooglePlacesModule,
        NovoValueModule,
        NovoAceEditorModule,
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
        NovoQueryBuilderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NovoElementsModule, decorators: [{
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
                        NovoDragulaModule,
                        NovoSliderModule,
                        NovoPickerModule,
                        NovoChipsModule,
                        NovoDatePickerModule,
                        NovoTimePickerModule,
                        NovoDateTimePickerModule,
                        NovoNovoCKEditorModule,
                        NovoTipWellModule,
                        NovoSimpleTableModule,
                        NovoTableModule,
                        NovoTableExtrasModule,
                        NovoFormModule,
                        NovoFormExtrasModule,
                        NovoCategoryDropdownModule,
                        NovoMultiPickerModule,
                        NovoPopOverModule,
                        NovoDataTableModule,
                        NovoSearchBoxModule,
                        NovoProgressModule,
                        NovoOverlayModule,
                        GooglePlacesModule,
                        NovoValueModule,
                        NovoAceEditorModule,
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
                        { provide: NovoDragulaService, useClass: NovoDragulaService },
                        { provide: GooglePlacesService, useClass: GooglePlacesService },
                        { provide: GlobalRef, useClass: BrowserGlobalRef },
                        { provide: LocalStorageService, useClass: LocalStorageService },
                        { provide: OptionsService, useClass: OptionsService },
                        { provide: FormUtils, useClass: FormUtils },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9ub3ZvLWVsZW1lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUgsT0FBTyxFQUNILGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsMEJBQTBCLEVBQzFCLGtCQUFrQixFQUNsQixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUNyRCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsY0FBYyxFQUNkLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQy9DLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsY0FBYyxFQUNkLGVBQWUsRUFDZixxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLGdCQUFnQixFQUNoQixrQkFBa0IsRUFBRSxtQkFBbUIsRUFDdkMsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVB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QkFDckQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO3dCQUMzRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7d0JBQ3pELEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTt3QkFDN0QsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO3dCQUMvRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO3dCQUNsRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7d0JBQy9ELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO3dCQUNyRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtxQkFDNUM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOb3ZvQWNlRWRpdG9yTW9kdWxlLCBOb3ZvTm92b0NLRWRpdG9yTW9kdWxlLCBOb3ZvRHJhZ3VsYU1vZHVsZSwgTm92b0RyYWd1bGFTZXJ2aWNlIH0gZnJvbSAnbm92by1lbGVtZW50cy9hZGRvbnMnO1xuaW1wb3J0IHtcbiAgICBOb3ZvQWdlbmRhTW9kdWxlLFxuICAgIE5vdm9Bc2lkZU1vZHVsZSxcbiAgICBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIE5vdm9BdmF0YXJNb2R1bGUsXG4gICAgTm92b0JyZWFkY3J1bWJNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0NhdGVnb3J5RHJvcGRvd25Nb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvQ29sb3JQaWNrZXJNb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSwgTm92b092ZXJsYXlNb2R1bGUsXG4gICAgTm92b0RhdGFUYWJsZU1vZHVsZSxcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b0RpdmlkZXJNb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICAgIE5vdm9FeHBhbnNpb25Nb2R1bGUsXG4gICAgTm92b0ZpZWxkTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIEZvcm1VdGlscywgTm92b0Zvcm1FeHRyYXNNb2R1bGUsIE5vdm9Gb3JtTW9kdWxlLFxuICAgIE5vdm9IZWFkZXJNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0xheW91dE1vZHVsZSxcbiAgICBOb3ZvTGlzdE1vZHVsZSxcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcbiAgICBOb3ZvTWVudU1vZHVsZSxcbiAgICBOb3ZvTW9kYWxNb2R1bGUsXG4gICAgTm92b011bHRpUGlja2VyTW9kdWxlLFxuICAgIE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlLFxuICAgIE5vdm9QaWNrZXJNb2R1bGUsXG4gICAgR29vZ2xlUGxhY2VzTW9kdWxlLCBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICAgIE5vdm9Qb3BPdmVyTW9kdWxlLFxuICAgIE5vdm9Qcm9ncmVzc01vZHVsZSxcbiAgICBOb3ZvUXVlcnlCdWlsZGVyTW9kdWxlLFxuICAgIE5vdm9RdWlja05vdGVNb2R1bGUsXG4gICAgTm92b1JhZGlvTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b1NlbGVjdFNlYXJjaE1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9TaW1wbGVUYWJsZU1vZHVsZSxcbiAgICBOb3ZvU2xpZGVyTW9kdWxlLFxuICAgIE5vdm9TdGVwcGVyTW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b1RhYmJlZEdyb3VwUGlja2VyTW9kdWxlLFxuICAgIE5vdm9UYWJsZUV4dHJhc01vZHVsZSwgTm92b1RhYmxlTW9kdWxlLFxuICAgIE5vdm9UYWJNb2R1bGUsXG4gICAgTm92b1RpbGVzTW9kdWxlLFxuICAgIE5vdm9UaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9UaXBXZWxsTW9kdWxlLFxuICAgIE5vdm9Ub2FzdE1vZHVsZSxcbiAgICBOb3ZvVG9vbGJhck1vZHVsZSxcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcbiAgICBVbmxlc3NNb2R1bGUsIE5vdm9WYWx1ZU1vZHVsZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cyc7XG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3BpcGVzJztcbmltcG9ydCB7XG4gIEJyb3dzZXJHbG9iYWxSZWYsXG4gIENvbXBvbmVudFV0aWxzLFxuICBEYXRlRm9ybWF0U2VydmljZSxcbiAgR2xvYmFsUmVmLFxuICBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICBOb3ZvTGFiZWxTZXJ2aWNlLFxuICBPcHRpb25zU2VydmljZSxcbn0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE5vdm9Bc2lkZU1vZHVsZSxcbiAgICBOb3ZvQXV0b0NvbXBsZXRlTW9kdWxlLFxuICAgIE5vdm9BdmF0YXJNb2R1bGUsXG4gICAgTm92b1BpcGVzTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0FnZW5kYU1vZHVsZSxcbiAgICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXG4gICAgTm92b0NoZWNrYm94TW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9MYXlvdXRNb2R1bGUsXG4gICAgTm92b0RpdmlkZXJNb2R1bGUsXG4gICAgTm92b1RvYXN0TW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9IZWFkZXJNb2R1bGUsXG4gICAgTm92b1RhYk1vZHVsZSxcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXG4gICAgTm92b01vZGFsTW9kdWxlLFxuICAgIE5vdm9RdWlja05vdGVNb2R1bGUsXG4gICAgTm92b1JhZGlvTW9kdWxlLFxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9MaXN0TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b0RyYWd1bGFNb2R1bGUsXG4gICAgTm92b1NsaWRlck1vZHVsZSxcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vdm9DS0VkaXRvck1vZHVsZSxcbiAgICBOb3ZvVGlwV2VsbE1vZHVsZSxcbiAgICBOb3ZvU2ltcGxlVGFibGVNb2R1bGUsXG4gICAgTm92b1RhYmxlTW9kdWxlLFxuICAgIE5vdm9UYWJsZUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvQ2F0ZWdvcnlEcm9wZG93bk1vZHVsZSxcbiAgICBOb3ZvTXVsdGlQaWNrZXJNb2R1bGUsXG4gICAgTm92b1BvcE92ZXJNb2R1bGUsXG4gICAgTm92b0RhdGFUYWJsZU1vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICAgIE5vdm9Qcm9ncmVzc01vZHVsZSxcbiAgICBOb3ZvT3ZlcmxheU1vZHVsZSxcbiAgICBHb29nbGVQbGFjZXNNb2R1bGUsXG4gICAgTm92b1ZhbHVlTW9kdWxlLFxuICAgIE5vdm9BY2VFZGl0b3JNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0V4cGFuc2lvbk1vZHVsZSxcbiAgICBVbmxlc3NNb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9TdGVwcGVyTW9kdWxlLFxuICAgIE5vdm9Ub29sYmFyTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZSxcbiAgICBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vbklkZWFsU3RhdGVNb2R1bGUsXG4gICAgTm92b0JyZWFkY3J1bWJNb2R1bGUsXG4gICAgTm92b0ZpZWxkTW9kdWxlLFxuICAgIE5vdm9Db2xvclBpY2tlck1vZHVsZSxcbiAgICBOb3ZvTWVudU1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0U2VhcmNoTW9kdWxlLFxuICAgIE5vdm9RdWVyeUJ1aWxkZXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxuICAgIHsgcHJvdmlkZTogRGF0ZUZvcm1hdFNlcnZpY2UsIHVzZUNsYXNzOiBEYXRlRm9ybWF0U2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogTm92b0xhYmVsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9MYWJlbFNlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogR29vZ2xlUGxhY2VzU2VydmljZSwgdXNlQ2xhc3M6IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgICB7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBPcHRpb25zU2VydmljZSwgdXNlQ2xhc3M6IE9wdGlvbnNTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBGb3JtVXRpbHMsIHVzZUNsYXNzOiBGb3JtVXRpbHMgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRzTW9kdWxlIHt9XG4iXX0=