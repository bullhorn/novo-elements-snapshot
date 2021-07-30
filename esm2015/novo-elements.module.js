// NG2
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
// APP
import { NovoPipesModule } from './pipes/Pipes.module';
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoAceEditorModule } from './elements/ace-editor/AceEditor.module';
import { NovoLoadingModule } from './elements/loading/Loading.module';
import { NovoCardModule } from './elements/card/Card.module';
import { NovoCalendarModule } from './elements/calendar/Calendar.module';
import { NovoToastModule } from './elements/toast/Toast.module';
import { NovoTooltipModule } from './elements/tooltip/Tooltip.module';
import { NovoHeaderModule } from './elements/header/Header.module';
import { NovoTabModule } from './elements/tabs/Tabs.module';
import { NovoTilesModule } from './elements/tiles/Tiles.module';
import { NovoModalModule } from './elements/modal/Modal.module';
import { NovoQuickNoteModule } from './elements/quick-note/QuickNote.module';
import { NovoRadioModule } from './elements/radio/Radio.module';
import { NovoDropdownModule } from './elements/dropdown/Dropdown.module';
import { NovoSelectModule } from './elements/select/Select.module';
import { NovoListModule } from './elements/list/List.module';
import { NovoSwitchModule } from './elements/switch/Switch.module';
import { NovoDragulaModule } from './elements/dragula/Dragula.module';
import { NovoSliderModule } from './elements/slider/Slider.module';
import { NovoPickerModule } from './elements/picker/Picker.module';
import { NovoChipsModule } from './elements/chips/Chips.module';
import { NovoDatePickerModule } from './elements/date-picker/DatePicker.module';
import { NovoTimePickerModule } from './elements/time-picker/TimePicker.module';
import { NovoDateTimePickerModule } from './elements/date-time-picker/DateTimePicker.module';
import { NovoNovoCKEditorModule } from './elements/ckeditor/CKEditor.module';
import { NovoTipWellModule } from './elements/tip-well/TipWell.module';
import { NovoSimpleTableModule } from './elements/simple-table/simple-table.module';
import { NovoTableModule } from './elements/table/Table.module';
import { NovoTableExtrasModule } from './elements/table/extras/TableExtras.module';
import { NovoFormModule } from './elements/form/Form.module';
import { NovoFormExtrasModule } from './elements/form/extras/FormExtras.module';
import { NovoCategoryDropdownModule } from './elements/category-dropdown/CategoryDropdown.module';
import { NovoMultiPickerModule } from './elements/multi-picker/MultiPicker.module';
import { NovoPopOverModule } from './elements/popover/PopOver.module';
import { NovoSearchBoxModule } from './elements/search/SearchBox.module';
import { GooglePlacesModule } from './elements/places/places.module';
import { NovoValueModule } from './elements/value/Value.module';
import { NovoDataTableModule } from './elements/data-table/data-table.module';
import { NovoIconModule } from './elements/icon/Icon.module';
import { NovoExpansionModule } from './elements/expansion/expansion.module';
import { NovoStepperModule } from './elements/stepper/stepper.module';
import { UnlessModule } from './elements/unless/Unless.module';
import { NovoOverlayModule } from './elements/overlay/Overlay.module';
import { DateFormatService } from './services/date-format/DateFormat';
import { NovoLabelService } from './services/novo-label-service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { GooglePlacesService } from './elements/places/places.service';
import { GlobalRef, BrowserGlobalRef } from './services/global/global.service';
import { LocalStorageService } from './services/storage/storage.service';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FormUtils } from './utils/form-utils/FormUtils';
import { OptionsService } from './services/options/OptionsService';
import { NovoTabbedGroupPickerModule } from './elements/tabbed-group-picker/TabbedGroupPicker.module';
import { NovoCommonModule } from './elements/common/common.module';
export class NovoElementsModule {
}
NovoElementsModule.decorators = [
    { type: NgModule, args: [{
                imports: [ReactiveFormsModule],
                exports: [
                    NovoPipesModule,
                    NovoButtonModule,
                    NovoLoadingModule,
                    NovoCardModule,
                    NovoCalendarModule,
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
                    NovoOverlayModule,
                    GooglePlacesModule,
                    NovoValueModule,
                    NovoAceEditorModule,
                    NovoIconModule,
                    NovoExpansionModule,
                    UnlessModule,
                    NovoCommonModule,
                    NovoStepperModule,
                    ScrollingModule,
                    NovoTabbedGroupPickerModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92by1lbGVtZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbIm5vdm8tZWxlbWVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxNQUFNO0FBQ04sT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENB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QUFFLGlCQUFpQixFQUFFO29CQUMzRCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQ3pELEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtvQkFDN0QsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO29CQUMvRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO29CQUNsRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7b0JBQy9ELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO29CQUNyRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtpQkFDNUM7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuLy8gQVBQXHJcbmltcG9ydCB7IE5vdm9QaXBlc01vZHVsZSB9IGZyb20gJy4vcGlwZXMvUGlwZXMubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0J1dHRvbk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvYnV0dG9uL0J1dHRvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvQWNlRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9hY2UtZWRpdG9yL0FjZUVkaXRvci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTG9hZGluZ01vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvbG9hZGluZy9Mb2FkaW5nLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9DYXJkTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jYXJkL0NhcmQubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0NhbGVuZGFyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jYWxlbmRhci9DYWxlbmRhci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVG9hc3RNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RvYXN0L1RvYXN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Ub29sdGlwTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90b29sdGlwL1Rvb2x0aXAubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0hlYWRlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvaGVhZGVyL0hlYWRlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVGFiTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90YWJzL1RhYnMubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1RpbGVzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90aWxlcy9UaWxlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTW9kYWxNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL21vZGFsL01vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9RdWlja05vdGVNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3F1aWNrLW5vdGUvUXVpY2tOb3RlLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9SYWRpb01vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvcmFkaW8vUmFkaW8ubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kcm9wZG93bi9Ecm9wZG93bi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9zZWxlY3QvU2VsZWN0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9MaXN0TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9saXN0L0xpc3QubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1N3aXRjaE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc3dpdGNoL1N3aXRjaC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZHJhZ3VsYS9EcmFndWxhLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9TbGlkZXJNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3NsaWRlci9TbGlkZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1BpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvcGlja2VyL1BpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvQ2hpcHNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2NoaXBzL0NoaXBzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRlUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kYXRlLXBpY2tlci9EYXRlUGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9UaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90aW1lLXBpY2tlci9UaW1lUGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZGF0ZS10aW1lLXBpY2tlci9EYXRlVGltZVBpY2tlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvTm92b0NLRWRpdG9yTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9ja2VkaXRvci9DS0VkaXRvci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVGlwV2VsbE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdGlwLXdlbGwvVGlwV2VsbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvU2ltcGxlVGFibGVNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3NpbXBsZS10YWJsZS9zaW1wbGUtdGFibGUubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1RhYmxlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy90YWJsZS9UYWJsZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvVGFibGVFeHRyYXNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3RhYmxlL2V4dHJhcy9UYWJsZUV4dHJhcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRm9ybU1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvZm9ybS9Gb3JtLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Gb3JtRXh0cmFzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9mb3JtL2V4dHJhcy9Gb3JtRXh0cmFzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9DYXRlZ29yeURyb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9jYXRlZ29yeS1kcm9wZG93bi9DYXRlZ29yeURyb3Bkb3duLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9NdWx0aVBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvbXVsdGktcGlja2VyL011bHRpUGlja2VyLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9Qb3BPdmVyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9wb3BvdmVyL1BvcE92ZXIubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1NlYXJjaEJveE1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvc2VhcmNoL1NlYXJjaEJveC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBHb29nbGVQbGFjZXNNb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b1ZhbHVlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy92YWx1ZS9WYWx1ZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRGF0YVRhYmxlTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9kYXRhLXRhYmxlL2RhdGEtdGFibGUubW9kdWxlJztcclxuaW1wb3J0IHsgTm92b0ljb25Nb2R1bGUgfSBmcm9tICcuL2VsZW1lbnRzL2ljb24vSWNvbi5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOb3ZvRXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9leHBhbnNpb24vZXhwYW5zaW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9TdGVwcGVyTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9zdGVwcGVyL3N0ZXBwZXIubW9kdWxlJztcclxuaW1wb3J0IHsgVW5sZXNzTW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy91bmxlc3MvVW5sZXNzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5vdm9PdmVybGF5TW9kdWxlIH0gZnJvbSAnLi9lbGVtZW50cy9vdmVybGF5L092ZXJsYXkubW9kdWxlJztcclxuaW1wb3J0IHsgRGF0ZUZvcm1hdFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGUtZm9ybWF0L0RhdGVGb3JtYXQnO1xyXG5pbXBvcnQgeyBOb3ZvTGFiZWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3ZvLWxhYmVsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOb3ZvRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL2VsZW1lbnRzL2RyYWd1bGEvRHJhZ3VsYVNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9lbGVtZW50cy9wbGFjZXMvcGxhY2VzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHbG9iYWxSZWYsIEJyb3dzZXJHbG9iYWxSZWYgfSBmcm9tICcuL3NlcnZpY2VzL2dsb2JhbC9nbG9iYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0b3JhZ2Uvc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICcuL3V0aWxzL2NvbXBvbmVudC11dGlscy9Db21wb25lbnRVdGlscyc7XHJcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscy9Gb3JtVXRpbHMnO1xyXG5pbXBvcnQgeyBPcHRpb25zU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb3B0aW9ucy9PcHRpb25zU2VydmljZSc7XHJcbmltcG9ydCB7IE5vdm9UYWJiZWRHcm91cFBpY2tlck1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvdGFiYmVkLWdyb3VwLXBpY2tlci9UYWJiZWRHcm91cFBpY2tlci5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgTm92b0NvbW1vbk1vZHVsZSB9IGZyb20gJy4vZWxlbWVudHMvY29tbW9uL2NvbW1vbi5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbUmVhY3RpdmVGb3Jtc01vZHVsZV0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTm92b1BpcGVzTW9kdWxlLFxyXG4gICAgTm92b0J1dHRvbk1vZHVsZSxcclxuICAgIE5vdm9Mb2FkaW5nTW9kdWxlLFxyXG4gICAgTm92b0NhcmRNb2R1bGUsXHJcbiAgICBOb3ZvQ2FsZW5kYXJNb2R1bGUsXHJcbiAgICBOb3ZvVG9hc3RNb2R1bGUsXHJcbiAgICBOb3ZvVG9vbHRpcE1vZHVsZSxcclxuICAgIE5vdm9IZWFkZXJNb2R1bGUsXHJcbiAgICBOb3ZvVGFiTW9kdWxlLFxyXG4gICAgTm92b1RpbGVzTW9kdWxlLFxyXG4gICAgTm92b01vZGFsTW9kdWxlLFxyXG4gICAgTm92b1F1aWNrTm90ZU1vZHVsZSxcclxuICAgIE5vdm9SYWRpb01vZHVsZSxcclxuICAgIE5vdm9Ecm9wZG93bk1vZHVsZSxcclxuICAgIE5vdm9TZWxlY3RNb2R1bGUsXHJcbiAgICBOb3ZvTGlzdE1vZHVsZSxcclxuICAgIE5vdm9Td2l0Y2hNb2R1bGUsXHJcbiAgICBOb3ZvRHJhZ3VsYU1vZHVsZSxcclxuICAgIE5vdm9TbGlkZXJNb2R1bGUsXHJcbiAgICBOb3ZvUGlja2VyTW9kdWxlLFxyXG4gICAgTm92b0NoaXBzTW9kdWxlLFxyXG4gICAgTm92b0RhdGVQaWNrZXJNb2R1bGUsXHJcbiAgICBOb3ZvVGltZVBpY2tlck1vZHVsZSxcclxuICAgIE5vdm9EYXRlVGltZVBpY2tlck1vZHVsZSxcclxuICAgIE5vdm9Ob3ZvQ0tFZGl0b3JNb2R1bGUsXHJcbiAgICBOb3ZvVGlwV2VsbE1vZHVsZSxcclxuICAgIE5vdm9TaW1wbGVUYWJsZU1vZHVsZSxcclxuICAgIE5vdm9UYWJsZU1vZHVsZSxcclxuICAgIE5vdm9UYWJsZUV4dHJhc01vZHVsZSxcclxuICAgIE5vdm9Gb3JtTW9kdWxlLFxyXG4gICAgTm92b0Zvcm1FeHRyYXNNb2R1bGUsXHJcbiAgICBOb3ZvQ2F0ZWdvcnlEcm9wZG93bk1vZHVsZSxcclxuICAgIE5vdm9NdWx0aVBpY2tlck1vZHVsZSxcclxuICAgIE5vdm9Qb3BPdmVyTW9kdWxlLFxyXG4gICAgTm92b0RhdGFUYWJsZU1vZHVsZSxcclxuICAgIE5vdm9TZWFyY2hCb3hNb2R1bGUsXHJcbiAgICBOb3ZvT3ZlcmxheU1vZHVsZSxcclxuICAgIEdvb2dsZVBsYWNlc01vZHVsZSxcclxuICAgIE5vdm9WYWx1ZU1vZHVsZSxcclxuICAgIE5vdm9BY2VFZGl0b3JNb2R1bGUsXHJcbiAgICBOb3ZvSWNvbk1vZHVsZSxcclxuICAgIE5vdm9FeHBhbnNpb25Nb2R1bGUsXHJcbiAgICBVbmxlc3NNb2R1bGUsXHJcbiAgICBOb3ZvQ29tbW9uTW9kdWxlLFxyXG4gICAgTm92b1N0ZXBwZXJNb2R1bGUsXHJcbiAgICBTY3JvbGxpbmdNb2R1bGUsXHJcbiAgICBOb3ZvVGFiYmVkR3JvdXBQaWNrZXJNb2R1bGUsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogQ29tcG9uZW50VXRpbHMsIHVzZUNsYXNzOiBDb21wb25lbnRVdGlscyB9LFxyXG4gICAgeyBwcm92aWRlOiBEYXRlRm9ybWF0U2VydmljZSwgdXNlQ2xhc3M6IERhdGVGb3JtYXRTZXJ2aWNlIH0sXHJcbiAgICB7IHByb3ZpZGU6IE5vdm9MYWJlbFNlcnZpY2UsIHVzZUNsYXNzOiBOb3ZvTGFiZWxTZXJ2aWNlIH0sXHJcbiAgICB7IHByb3ZpZGU6IE5vdm9EcmFndWxhU2VydmljZSwgdXNlQ2xhc3M6IE5vdm9EcmFndWxhU2VydmljZSB9LFxyXG4gICAgeyBwcm92aWRlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLCB1c2VDbGFzczogR29vZ2xlUGxhY2VzU2VydmljZSB9LFxyXG4gICAgeyBwcm92aWRlOiBHbG9iYWxSZWYsIHVzZUNsYXNzOiBCcm93c2VyR2xvYmFsUmVmIH0sXHJcbiAgICB7IHByb3ZpZGU6IExvY2FsU3RvcmFnZVNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0sXHJcbiAgICB7IHByb3ZpZGU6IE9wdGlvbnNTZXJ2aWNlLCB1c2VDbGFzczogT3B0aW9uc1NlcnZpY2UgfSxcclxuICAgIHsgcHJvdmlkZTogRm9ybVV0aWxzLCB1c2VDbGFzczogRm9ybVV0aWxzIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5vdm9FbGVtZW50c01vZHVsZSB7fVxyXG4iXX0=