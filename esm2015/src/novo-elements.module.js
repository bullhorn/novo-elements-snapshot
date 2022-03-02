// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoAceEditorModule } from './elements/ace-editor/AceEditor.module';
import { NovoAgendaModule } from './elements/agenda/Agenda.module';
import { NovoAsideModule } from './elements/aside/aside.module';
import { NovoAvatarModule } from './elements/avatar/Avatar.module';
import { NovoBreadcrumbModule } from './elements/breadcrumbs/Breadcrumb.module';
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoCalendarModule } from './elements/calendar/Calendar.module';
import { NovoCardModule } from './elements/card/Card.module';
import { NovoCategoryDropdownModule } from './elements/category-dropdown/CategoryDropdown.module';
import { NovoCheckboxModule } from './elements/checkbox/Checkbox.module';
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
import { NovoSelectSearchModule } from './elements/select-search/select-search.module';
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
import { NovoToolbarModule } from './elements/toolbar/toolbar.module';
import { NovoTooltipModule } from './elements/tooltip/Tooltip.module';
import { UnlessModule } from './elements/unless/Unless.module';
import { NovoValueModule } from './elements/value/Value.module';
import { NovoPipesModule } from './pipes/Pipes.module';
import { DateFormatService } from './services/date-format/DateFormat';
import { BrowserGlobalRef, GlobalRef } from './services/global/global.service';
import { NovoLabelService } from './services/novo-label-service';
import { OptionsService } from './services/options/OptionsService';
import { LocalStorageService } from './services/storage/storage.service';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FormUtils } from './utils/form-utils/FormUtils';
export class NovoElementsModule {
}
NovoElementsModule.decorators = [
    { type: NgModule, args: [{
                imports: [ReactiveFormsModule],
                exports: [
                    NovoAsideModule,
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvcnVubmVyL3dvcmsvbm92by1lbGVtZW50cy9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvIiwic291cmNlcyI6WyJzcmMvbm92by1lbGVtZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE1BQU07QUFDTixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFC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QUFRLEVBQUUsaUJBQWlCLEVBQUU7b0JBQzNELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtvQkFDekQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO29CQUM3RCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7b0JBQy9ELEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQ2xELEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtvQkFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7b0JBQ3JELEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO2lCQUM1QzthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gQVBQXG5pbXBvcnQgeyBOb3ZvQWNlRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9hY2UtZWRpdG9yL0FjZUVkaXRvci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0FnZW5kYU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvYWdlbmRhL0FnZW5kYS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0FzaWRlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9hc2lkZS9hc2lkZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0F2YXRhck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvYXZhdGFyL0F2YXRhci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0JyZWFkY3J1bWJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2JyZWFkY3J1bWJzL0JyZWFkY3J1bWIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9CdXR0b25Nb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2J1dHRvbi9CdXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DYWxlbmRhck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY2FsZW5kYXIvQ2FsZW5kYXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DYXJkTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jYXJkL0NhcmQubW9kdWxlJztcbmltcG9ydCB7IE5vdm9DYXRlZ29yeURyb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jYXRlZ29yeS1kcm9wZG93bi9DYXRlZ29yeURyb3Bkb3duLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2hlY2tib3hNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2NoZWNrYm94L0NoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2NoaXBzL0NoaXBzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTm92b0NLRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9ja2VkaXRvci9DS0VkaXRvci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0NvbG9yUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvQ29tbW9uTW9kdWxlLCBOb3ZvT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jb21tb24nO1xuaW1wb3J0IHsgTm92b092ZXJsYXlNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2NvbW1vbi9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRhVGFibGVNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2RhdGEtdGFibGUvZGF0YS10YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0RhdGVQaWNrZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2RhdGUtcGlja2VyL0RhdGVQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0RpdmlkZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2RpdmlkZXIvZGl2aWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2RyYWd1bGEvRHJhZ3VsYS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b0RyYWd1bGFTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9kcmFndWxhL0RyYWd1bGFTZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9Ecm9wZG93bk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZHJvcGRvd24vRHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9FeHBhbnNpb25Nb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2V4cGFuc2lvbi9leHBhbnNpb24ubW9kdWxlJztcbmltcG9ydCB7IE5vdm9GaWVsZE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZmllbGQvZmllbGQubW9kdWxlJztcbmltcG9ydCB7IE5vdm9GbGV4TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9mbGV4L0ZsZXgubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9mb3JtL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvRm9ybU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZm9ybS9Gb3JtLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSGVhZGVyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9oZWFkZXIvSGVhZGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvSWNvbk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvaWNvbi9JY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTGF5b3V0TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9sYXlvdXQvbGF5b3V0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTGlzdE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvbGlzdC9MaXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvbG9hZGluZy9Mb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTWVudU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvbWVudS9tZW51Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTW9kYWxNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL21vZGFsL21vZGFsLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvTXVsdGlQaWNrZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL211bHRpLXBpY2tlci9NdWx0aVBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b05vbklkZWFsU3RhdGVNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL25vbi1pZGVhbC1zdGF0ZS9Ob25JZGVhbFN0YXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9waWNrZXIvUGlja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMubW9kdWxlJztcbmltcG9ydCB7IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSBmcm9tICcuL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMuc2VydmljZSc7XG5pbXBvcnQgeyBOb3ZvUG9wT3Zlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvcG9wb3Zlci9Qb3BPdmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvUHJvZ3Jlc3NNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3Byb2dyZXNzL1Byb2dyZXNzLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvUXVpY2tOb3RlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9xdWljay1ub3RlL1F1aWNrTm90ZS5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1JhZGlvTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9yYWRpby9SYWRpby5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc2VhcmNoL1NlYXJjaEJveC5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1NlbGVjdFNlYXJjaE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc2VsZWN0LXNlYXJjaC9zZWxlY3Qtc2VhcmNoLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9zZWxlY3QvU2VsZWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvU2ltcGxlVGFibGVNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3NpbXBsZS10YWJsZS9zaW1wbGUtdGFibGUubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TbGlkZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3NsaWRlci9TbGlkZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9TdGVwcGVyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9Td2l0Y2hNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3N3aXRjaC9Td2l0Y2gubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UYWJiZWRHcm91cFBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdGFiYmVkLWdyb3VwLXBpY2tlci9UYWJiZWRHcm91cFBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RhYmxlRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90YWJsZS9leHRyYXMvVGFibGVFeHRyYXMubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UYWJsZU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdGFibGUvVGFibGUubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UYWJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RhYnMvVGFicy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RpbGVzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90aWxlcy9UaWxlcy5tb2R1bGUnO1xuaW1wb3J0IHsgTm92b1RpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RpbWUtcGlja2VyL1RpbWVQaWNrZXIubW9kdWxlJztcbmltcG9ydCB7IE5vdm9UaXBXZWxsTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90aXAtd2VsbC9UaXBXZWxsLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVG9hc3RNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RvYXN0L1RvYXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVG9vbGJhck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdG9vbGJhci90b29sYmFyLm1vZHVsZSc7XG5pbXBvcnQgeyBOb3ZvVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdG9vbHRpcC9Ub29sdGlwLm1vZHVsZSc7XG5pbXBvcnQgeyBVbmxlc3NNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3VubGVzcy9Vbmxlc3MubW9kdWxlJztcbmltcG9ydCB7IE5vdm9WYWx1ZU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdmFsdWUvVmFsdWUubW9kdWxlJztcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4vcGlwZXMvUGlwZXMubW9kdWxlJztcbmltcG9ydCB7IERhdGVGb3JtYXRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kYXRlLWZvcm1hdC9EYXRlRm9ybWF0JztcbmltcG9ydCB7IEJyb3dzZXJHbG9iYWxSZWYsIEdsb2JhbFJlZiB9IGZyb20gJy4vc2VydmljZXMvZ2xvYmFsL2dsb2JhbC5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdm9MYWJlbFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25vdm8tbGFiZWwtc2VydmljZSc7XG5pbXBvcnQgeyBPcHRpb25zU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb3B0aW9ucy9PcHRpb25zU2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdG9yYWdlL3N0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBDb21wb25lbnRVdGlscyB9IGZyb20gJy4vdXRpbHMvY29tcG9uZW50LXV0aWxzL0NvbXBvbmVudFV0aWxzJztcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscy9Gb3JtVXRpbHMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBOb3ZvQXNpZGVNb2R1bGUsXG4gICAgTm92b0F2YXRhck1vZHVsZSxcbiAgICBOb3ZvUGlwZXNNb2R1bGUsXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcbiAgICBOb3ZvTG9hZGluZ01vZHVsZSxcbiAgICBOb3ZvQ2FyZE1vZHVsZSxcbiAgICBOb3ZvQWdlbmRhTW9kdWxlLFxuICAgIE5vdm9DYWxlbmRhck1vZHVsZSxcbiAgICBOb3ZvQ2hlY2tib3hNb2R1bGUsXG4gICAgTm92b0ZsZXhNb2R1bGUsXG4gICAgTm92b0xheW91dE1vZHVsZSxcbiAgICBOb3ZvRGl2aWRlck1vZHVsZSxcbiAgICBOb3ZvVG9hc3RNb2R1bGUsXG4gICAgTm92b1Rvb2x0aXBNb2R1bGUsXG4gICAgTm92b0hlYWRlck1vZHVsZSxcbiAgICBOb3ZvVGFiTW9kdWxlLFxuICAgIE5vdm9UaWxlc01vZHVsZSxcbiAgICBOb3ZvTW9kYWxNb2R1bGUsXG4gICAgTm92b1F1aWNrTm90ZU1vZHVsZSxcbiAgICBOb3ZvUmFkaW9Nb2R1bGUsXG4gICAgTm92b0Ryb3Bkb3duTW9kdWxlLFxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXG4gICAgTm92b0xpc3RNb2R1bGUsXG4gICAgTm92b1N3aXRjaE1vZHVsZSxcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcbiAgICBOb3ZvU2xpZGVyTW9kdWxlLFxuICAgIE5vdm9QaWNrZXJNb2R1bGUsXG4gICAgTm92b0NoaXBzTW9kdWxlLFxuICAgIE5vdm9EYXRlUGlja2VyTW9kdWxlLFxuICAgIE5vdm9UaW1lUGlja2VyTW9kdWxlLFxuICAgIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvTm92b0NLRWRpdG9yTW9kdWxlLFxuICAgIE5vdm9UaXBXZWxsTW9kdWxlLFxuICAgIE5vdm9TaW1wbGVUYWJsZU1vZHVsZSxcbiAgICBOb3ZvVGFibGVNb2R1bGUsXG4gICAgTm92b1RhYmxlRXh0cmFzTW9kdWxlLFxuICAgIE5vdm9Gb3JtTW9kdWxlLFxuICAgIE5vdm9Gb3JtRXh0cmFzTW9kdWxlLFxuICAgIE5vdm9DYXRlZ29yeURyb3Bkb3duTW9kdWxlLFxuICAgIE5vdm9NdWx0aVBpY2tlck1vZHVsZSxcbiAgICBOb3ZvUG9wT3Zlck1vZHVsZSxcbiAgICBOb3ZvRGF0YVRhYmxlTW9kdWxlLFxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXG4gICAgTm92b1Byb2dyZXNzTW9kdWxlLFxuICAgIE5vdm9PdmVybGF5TW9kdWxlLFxuICAgIEdvb2dsZVBsYWNlc01vZHVsZSxcbiAgICBOb3ZvVmFsdWVNb2R1bGUsXG4gICAgTm92b0FjZUVkaXRvck1vZHVsZSxcbiAgICBOb3ZvSWNvbk1vZHVsZSxcbiAgICBOb3ZvRXhwYW5zaW9uTW9kdWxlLFxuICAgIFVubGVzc01vZHVsZSxcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxuICAgIE5vdm9PcHRpb25Nb2R1bGUsXG4gICAgTm92b1N0ZXBwZXJNb2R1bGUsXG4gICAgTm92b1Rvb2xiYXJNb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxuICAgIE5vdm9UYWJiZWRHcm91cFBpY2tlck1vZHVsZSxcbiAgICBOb3ZvTm9uSWRlYWxTdGF0ZU1vZHVsZSxcbiAgICBOb3ZvQnJlYWRjcnVtYk1vZHVsZSxcbiAgICBOb3ZvRmllbGRNb2R1bGUsXG4gICAgTm92b0NvbG9yUGlja2VyTW9kdWxlLFxuICAgIE5vdm9NZW51TW9kdWxlLFxuICAgIE5vdm9TZWxlY3RTZWFyY2hNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxuICAgIHsgcHJvdmlkZTogRGF0ZUZvcm1hdFNlcnZpY2UsIHVzZUNsYXNzOiBEYXRlRm9ybWF0U2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogTm92b0xhYmVsU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9MYWJlbFNlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxuICAgIHsgcHJvdmlkZTogR29vZ2xlUGxhY2VzU2VydmljZSwgdXNlQ2xhc3M6IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSxcbiAgICB7IHByb3ZpZGU6IEdsb2JhbFJlZiwgdXNlQ2xhc3M6IEJyb3dzZXJHbG9iYWxSZWYgfSxcbiAgICB7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBPcHRpb25zU2VydmljZSwgdXNlQ2xhc3M6IE9wdGlvbnNTZXJ2aWNlIH0sXG4gICAgeyBwcm92aWRlOiBGb3JtVXRpbHMsIHVzZUNsYXNzOiBGb3JtVXRpbHMgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm92b0VsZW1lbnRzTW9kdWxlIHt9XG4iXX0=