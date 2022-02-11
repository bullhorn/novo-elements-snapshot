// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoAceEditorModule } from './elements/ace-editor/AceEditor.module';
import { NovoAsideModule } from './elements/aside/aside.module';
import { NovoAvatarModule } from './elements/avatar/Avatar.module';
import { NovoBreadcrumbModule } from './elements/breadcrumbs/Breadcrumb.module';
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoCalendarModule } from './elements/calendar/Calendar.module';
import { NovoCardModule } from './elements/card/Card.module';
import { NovoCategoryDropdownModule } from './elements/category-dropdown/CategoryDropdown.module';
import { NovoChipsModule } from './elements/chips/Chips.module';
import { NovoNovoCKEditorModule } from './elements/ckeditor/CKEditor.module';
import { NovoColorPickerModule } from './elements/color-picker/color-picker.module';
import { NovoCommonModule, NovoOptionModule } from './elements/common';
import { NovoOverlayModule } from './elements/common/overlay/Overlay.module';
import { NovoDataTableModule } from './elements/data-table/data-table.module';
import { NovoDatePickerModule } from './elements/date-picker/DatePicker.module';
import { NovoDateTimePickerModule } from './elements/date-time-picker/DateTimePicker.module';
import { NovoDividerModule } from './elements/divider/divider.module';
import { NovoDragulaModule } from './elements/dragula/Dragula.module';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { NovoDropdownModule } from './elements/dropdown/Dropdown.module';
import { NovoExpansionModule } from './elements/expansion/expansion.module';
import { NovoFieldModule } from './elements/field/field.module';
import { NovoFlexModule } from './elements/flex/Flex.module';
import { NovoFormExtrasModule } from './elements/form/extras/FormExtras.module';
import { NovoFormModule } from './elements/form/Form.module';
import { NovoHeaderModule } from './elements/header/Header.module';
import { NovoIconModule } from './elements/icon/Icon.module';
import { NovoLayoutModule } from './elements/layout/layout.module';
import { NovoListModule } from './elements/list/List.module';
import { NovoLoadingModule } from './elements/loading/Loading.module';
import { NovoMenuModule } from './elements/menu/menu.module';
import { NovoModalModule } from './elements/modal/modal.module';
import { NovoMultiPickerModule } from './elements/multi-picker/MultiPicker.module';
import { NovoNonIdealStateModule } from './elements/non-ideal-state/NonIdealState.module';
import { NovoPickerModule } from './elements/picker/Picker.module';
import { GooglePlacesModule } from './elements/places/places.module';
import { GooglePlacesService } from './elements/places/places.service';
import { NovoPopOverModule } from './elements/popover/PopOver.module';
import { NovoProgressModule } from './elements/progress/Progress.module';
import { NovoQuickNoteModule } from './elements/quick-note/QuickNote.module';
import { NovoRadioModule } from './elements/radio/Radio.module';
import { NovoSearchBoxModule } from './elements/search/SearchBox.module';
import { NovoSelectModule } from './elements/select/Select.module';
import { NovoSimpleTableModule } from './elements/simple-table/simple-table.module';
import { NovoSliderModule } from './elements/slider/Slider.module';
import { NovoStepperModule } from './elements/stepper/stepper.module';
import { NovoSwitchModule } from './elements/switch/Switch.module';
import { NovoTabbedGroupPickerModule } from './elements/tabbed-group-picker/TabbedGroupPicker.module';
import { NovoTableExtrasModule } from './elements/table/extras/TableExtras.module';
import { NovoTableModule } from './elements/table/Table.module';
import { NovoTabModule } from './elements/tabs/Tabs.module';
import { NovoTilesModule } from './elements/tiles/Tiles.module';
import { NovoTimePickerModule } from './elements/time-picker/TimePicker.module';
import { NovoTipWellModule } from './elements/tip-well/TipWell.module';
import { NovoToastModule } from './elements/toast/Toast.module';
import { NovoTooltipModule } from './elements/tooltip/Tooltip.module';
import { UnlessModule } from './elements/unless/Unless.module';
import { NovoValueModule } from './elements/value/Value.module';
// APP
import { NovoPipesModule } from './pipes/Pipes.module';
import { DateFormatService } from './services/date-format/DateFormat';
import { BrowserGlobalRef, GlobalRef } from './services/global/global.service';
import { NovoLabelService } from './services/novo-label-service';
import { OptionsService } from './services/options/OptionsService';
import { LocalStorageService } from './services/storage/storage.service';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FormUtils } from './utils/form-utils/FormUtils';
import * as i0 from "@angular/core";
export class NovoElementsModule {
}
NovoElementsModule.ɵmod = i0.ɵɵdefineNgModule({ type: NovoElementsModule });
NovoElementsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NovoElementsModule_Factory(t) { return new (t || NovoElementsModule)(); }, providers: [
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
        NovoAvatarModule,
        NovoPipesModule,
        NovoButtonModule,
        NovoLoadingModule,
        NovoCardModule,
        NovoCalendarModule,
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
        ScrollingModule,
        NovoTabbedGroupPickerModule,
        NovoNonIdealStateModule,
        NovoBreadcrumbModule,
        NovoFieldModule,
        NovoColorPickerModule,
        NovoMenuModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NovoElementsModule, { imports: [ReactiveFormsModule], exports: [NovoAsideModule,
        NovoAvatarModule,
        NovoPipesModule,
        NovoButtonModule,
        NovoLoadingModule,
        NovoCardModule,
        NovoCalendarModule,
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
        ScrollingModule,
        NovoTabbedGroupPickerModule,
        NovoNonIdealStateModule,
        NovoBreadcrumbModule,
        NovoFieldModule,
        NovoColorPickerModule,
        NovoMenuModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NovoElementsModule, [{
        type: NgModule,
        args: [{
                imports: [ReactiveFormsModule],
                exports: [
                    NovoAsideModule,
                    NovoAvatarModule,
                    NovoPipesModule,
                    NovoButtonModule,
                    NovoLoadingModule,
                    NovoCardModule,
                    NovoCalendarModule,
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
                    ScrollingModule,
                    NovoTabbedGroupPickerModule,
                    NovoNonIdealStateModule,
                    NovoBreadcrumbModule,
                    NovoFieldModule,
                    NovoColorPickerModule,
                    NovoMenuModule,
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
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsibm92by1lbGVtZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFB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QUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtvQkFDekQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO29CQUM3RCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7b0JBQy9ELEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQ2xELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtvQkFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7b0JBQ3JELEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO2lCQUM1QzthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTm92b0FjZUVkaXRvck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvYWNlLWVkaXRvci9BY2VFZGl0b3IubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Bc2lkZU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvYXNpZGUvYXNpZGUubW9kdWxlJztcbmltcG9ydCB7IE5vdm9BdmF0YXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2F2YXRhci9BdmF0YXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9CcmVhZGNydW1iTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9icmVhZGNydW1icy9CcmVhZGNydW1iLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9idXR0b24vQnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2NhbGVuZGFyL0NhbGVuZGFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2FyZE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY2FyZC9DYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2F0ZWdvcnlEcm9wZG93bk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY2F0ZWdvcnktZHJvcGRvd24vQ2F0ZWdvcnlEcm9wZG93bi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NoaXBzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jaGlwcy9DaGlwcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b05vdm9DS0VkaXRvck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY2tlZGl0b3IvQ0tFZGl0b3IubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Db2xvclBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSwgTm92b09wdGlvbk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY29tbW9uJztcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jb21tb24vb3ZlcmxheS9PdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2RhdGUtdGltZS1waWNrZXIvRGF0ZVRpbWVQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EaXZpZGVyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kaXZpZGVyL2RpdmlkZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kcmFndWxhL0RyYWd1bGEubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EcmFndWxhU2VydmljZSB9IGZyb20gJy4vZWxlbWVudHMvZHJhZ3VsYS9EcmFndWxhU2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvRHJvcGRvd25Nb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2Ryb3Bkb3duL0Ryb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRmllbGRNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2ZpZWxkL2ZpZWxkLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRmxleE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZmxleC9GbGV4Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRm9ybUV4dHJhc01vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZm9ybS9leHRyYXMvRm9ybUV4dHJhcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0Zvcm1Nb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2Zvcm0vRm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0hlYWRlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvaGVhZGVyL0hlYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2ljb24vSWNvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xheW91dE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvbGF5b3V0L2xheW91dC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xpc3RNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2xpc3QvTGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0xvYWRpbmdNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2xvYWRpbmcvTG9hZGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b01lbnVNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL21lbnUvbWVudS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b01vZGFsTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9tb2RhbC9tb2RhbC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b011bHRpUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9tdWx0aS1waWNrZXIvTXVsdGlQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ob25JZGVhbFN0YXRlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9ub24taWRlYWwtc3RhdGUvTm9uSWRlYWxTdGF0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvcGlja2VyL1BpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgR29vZ2xlUGxhY2VzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9wbGFjZXMvcGxhY2VzLm1vZHVsZSc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9wbGFjZXMvcGxhY2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm92b1BvcE92ZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3BvcG92ZXIvUG9wT3Zlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1Byb2dyZXNzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9wcm9ncmVzcy9Qcm9ncmVzcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1F1aWNrTm90ZU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvcXVpY2stbm90ZS9RdWlja05vdGUubW9kdWxlJztcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvcmFkaW8vUmFkaW8ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWFyY2hCb3hNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3NlYXJjaC9TZWFyY2hCb3gubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TZWxlY3RNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3NlbGVjdC9TZWxlY3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TaW1wbGVUYWJsZU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc2ltcGxlLXRhYmxlL3NpbXBsZS10YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NsaWRlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc2xpZGVyL1NsaWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1N0ZXBwZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3N0ZXBwZXIvc3RlcHBlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1N3aXRjaE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc3dpdGNoL1N3aXRjaC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RhYmJlZEdyb3VwUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90YWJiZWQtZ3JvdXAtcGlja2VyL1RhYmJlZEdyb3VwUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGFibGVFeHRyYXNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9UYWJsZUV4dHJhcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RhYmxlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90YWJsZS9UYWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RhYk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdGFicy9UYWJzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGlsZXNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RpbGVzL1RpbGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdGltZS1waWNrZXIvVGltZVBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RpcFdlbGxNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RpcC13ZWxsL1RpcFdlbGwubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ub2FzdE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdG9hc3QvVG9hc3QubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7IFVubGVzc01vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdW5sZXNzL1VubGVzcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1ZhbHVlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy92YWx1ZS9WYWx1ZS5tb2R1bGUnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvUGlwZXNNb2R1bGUgfSBmcm9tICcuL3BpcGVzL1BpcGVzLm1vZHVsZSc7XG5pbXBvcnQgeyBEYXRlRm9ybWF0U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZGF0ZS1mb3JtYXQvRGF0ZUZvcm1hdCc7XG5pbXBvcnQgeyBCcm93c2VyR2xvYmFsUmVmLCBHbG9iYWxSZWYgfSBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC9nbG9iYWwuc2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xuaW1wb3J0IHsgT3B0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL29wdGlvbnMvT3B0aW9uc1NlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RvcmFnZS9zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XG5pbXBvcnQgeyBGb3JtVXRpbHMgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMvRm9ybVV0aWxzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1JlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTm92b0FzaWRlTW9kdWxlLFxuICAgIE5vdm9BdmF0YXJNb2R1bGUsXG4gICAgTm92b1BpcGVzTW9kdWxlLFxuICAgIE5vdm9CdXR0b25Nb2R1bGUsXG4gICAgTm92b0xvYWRpbmdNb2R1bGUsXG4gICAgTm92b0NhcmRNb2R1bGUsXG4gICAgTm92b0NhbGVuZGFyTW9kdWxlLFxuICAgIE5vdm9GbGV4TW9kdWxlLFxuICAgIE5vdm9MYXlvdXRNb2R1bGUsXG4gICAgTm92b0RpdmlkZXJNb2R1bGUsXG4gICAgTm92b1RvYXN0TW9kdWxlLFxuICAgIE5vdm9Ub29sdGlwTW9kdWxlLFxuICAgIE5vdm9IZWFkZXJNb2R1bGUsXG4gICAgTm92b1RhYk1vZHVsZSxcbiAgICBOb3ZvVGlsZXNNb2R1bGUsXG4gICAgTm92b01vZGFsTW9kdWxlLFxuICAgIE5vdm9RdWlja05vdGVNb2R1bGUsXG4gICAgTm92b1JhZGlvTW9kdWxlLFxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcbiAgICBOb3ZvU2VsZWN0TW9kdWxlLFxuICAgIE5vdm9MaXN0TW9kdWxlLFxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXG4gICAgTm92b0RyYWd1bGFNb2R1bGUsXG4gICAgTm92b1NsaWRlck1vZHVsZSxcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxuICAgIE5vdm9DaGlwc01vZHVsZSxcbiAgICBOb3ZvRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vdm9DS0VkaXRvck1vZHVsZSxcbiAgICBOb3ZvVGlwV2VsbE1vZHVsZSxcbiAgICBOb3ZvU2ltcGxlVGFibGVNb2R1bGUsXG4gICAgTm92b1RhYmxlTW9kdWxlLFxuICAgIE5vdm9UYWJsZUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvRm9ybU1vZHVsZSxcbiAgICBOb3ZvRm9ybUV4dHJhc01vZHVsZSxcbiAgICBOb3ZvQ2F0ZWdvcnlEcm9wZG93bk1vZHVsZSxcbiAgICBOb3ZvTXVsdGlQaWNrZXJNb2R1bGUsXG4gICAgTm92b1BvcE92ZXJNb2R1bGUsXG4gICAgTm92b0RhdGFUYWJsZU1vZHVsZSxcbiAgICBOb3ZvU2VhcmNoQm94TW9kdWxlLFxuICAgIE5vdm9Qcm9ncmVzc01vZHVsZSxcbiAgICBOb3ZvT3ZlcmxheU1vZHVsZSxcbiAgICBHb29nbGVQbGFjZXNNb2R1bGUsXG4gICAgTm92b1ZhbHVlTW9kdWxlLFxuICAgIE5vdm9BY2VFZGl0b3JNb2R1bGUsXG4gICAgTm92b0ljb25Nb2R1bGUsXG4gICAgTm92b0V4cGFuc2lvbk1vZHVsZSxcbiAgICBVbmxlc3NNb2R1bGUsXG4gICAgTm92b0NvbW1vbk1vZHVsZSxcbiAgICBOb3ZvT3B0aW9uTW9kdWxlLFxuICAgIE5vdm9TdGVwcGVyTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZSxcbiAgICBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJNb2R1bGUsXG4gICAgTm92b05vbklkZWFsU3RhdGVNb2R1bGUsXG4gICAgTm92b0JyZWFkY3J1bWJNb2R1bGUsXG4gICAgTm92b0ZpZWxkTW9kdWxlLFxuICAgIE5vdm9Db2xvclBpY2tlck1vZHVsZSxcbiAgICBOb3ZvTWVudU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDb21wb25lbnRVdGlscywgdXNlQ2xhc3M6IENvbXBvbmVudFV0aWxzIH0sXG4gICAgeyBwcm92aWRlOiBEYXRlRm9ybWF0U2VydmljZSwgdXNlQ2xhc3M6IERhdGVGb3JtYXRTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBOb3ZvTGFiZWxTZXJ2aWNlLCB1c2VDbGFzczogTm92b0xhYmVsU2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogTm92b0RyYWd1bGFTZXJ2aWNlLCB1c2VDbGFzczogTm92b0RyYWd1bGFTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLCB1c2VDbGFzczogR29vZ2xlUGxhY2VzU2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogR2xvYmFsUmVmLCB1c2VDbGFzczogQnJvd3Nlckdsb2JhbFJlZiB9LFxuICAgIHsgcHJvdmlkZTogTG9jYWxTdG9yYWdlU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU3RvcmFnZVNlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IE9wdGlvbnNTZXJ2aWNlLCB1c2VDbGFzczogT3B0aW9uc1NlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IEZvcm1VdGlscywgdXNlQ2xhc3M6IEZvcm1VdGlscyB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3ZvRWxlbWVudHNNb2R1bGUge31cbiJdfQ==