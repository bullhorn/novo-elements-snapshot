import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoNovoCKEditorModule, NovoAceEditorModule, NovoCodeEditorModule } from 'novo-elements/addons';
export * from 'novo-elements/addons';
import { NovoAsideModule, NovoAutoCompleteModule, NovoAvatarModule, NovoButtonModule, NovoLoadingModule, NovoCardModule, NovoAgendaModule, NovoCalendarModule, NovoCheckboxModule, NovoFlexModule, NovoLayoutModule, NovoDividerModule, NovoToastModule, NovoTooltipModule, NovoHeaderModule, NovoTabModule, NovoTilesModule, NovoModalModule, NovoQuickNoteModule, NovoRadioModule, NovoDropdownModule, NovoSelectModule, NovoListModule, NovoSwitchModule, NovoSliderModule, NovoPickerModule, NovoChipsModule, NovoDatePickerModule, NovoTimePickerModule, NovoDateTimePickerModule, NovoTipWellModule, NovoSimpleTableModule, NovoFormModule, NovoFormExtrasModule, NovoCategoryDropdownModule, NovoMultiPickerModule, NovoPopOverModule, NovoDataTableModule, NovoSearchBoxModule, NovoProgressModule, NovoOverlayModule, NovoDragDropModule, GooglePlacesModule, NovoValueModule, NovoIconModule, NovoExpansionModule, UnlessModule, NovoCommonModule, NovoOptionModule, NovoStepperModule, NovoToolbarModule, NovoTabbedGroupPickerModule, NovoNonIdealStateModule, NovoBreadcrumbModule, NovoFieldModule, NovoColorPickerModule, NovoMenuModule, NovoSelectSearchModule, NovoQueryBuilderModule, GooglePlacesService, FormUtils, NovoAsideService, NovoModalService, NovoToastService, FieldInteractionApi, MENU_OPTIONS } from 'novo-elements/elements';
export * from 'novo-elements/elements';
import { NovoPipesModule } from 'novo-elements/pipes';
export * from 'novo-elements/pipes';
import { ComponentUtils, DateFormatService, NovoLabelService, GlobalRef, BrowserGlobalRef, LocalStorageService, OptionsService, NovoTemplateService } from 'novo-elements/services';
export * from 'novo-elements/services';
export * from 'novo-elements/utils';

// NG2
class NovoElementsModule {
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

const NOVO_ELEMENTS_PROVIDERS = [
    { provide: NovoAsideService, useClass: NovoAsideService },
    { provide: NovoModalService, useClass: NovoModalService },
    { provide: GooglePlacesService, useClass: GooglePlacesService },
    { provide: NovoToastService, useClass: NovoToastService },
    { provide: ComponentUtils, useClass: ComponentUtils },
    { provide: GlobalRef, useClass: BrowserGlobalRef },
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: OptionsService, useClass: OptionsService },
    FieldInteractionApi,
    DateFormatService,
    NovoTemplateService,
];
class NovoElementProviders {
    static forRoot(options) {
        return {
            ngModule: NovoElementProviders,
            providers: [
                ...NOVO_ELEMENTS_PROVIDERS,
                {
                    provide: MENU_OPTIONS,
                    useValue: options && options.menu,
                },
            ],
        };
    }
    static forChild() {
        return {
            ngModule: NovoElementProviders,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoElementProviders, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.3", ngImport: i0, type: NovoElementProviders }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoElementProviders }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: NovoElementProviders, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoElementProviders, NovoElementsModule };
//# sourceMappingURL=novo-elements.mjs.map
