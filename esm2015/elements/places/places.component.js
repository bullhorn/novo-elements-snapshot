// NG2
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { GlobalRef } from '../../services/global/global.service';
import { GooglePlacesService } from './places.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/global/global.service";
import * as i2 from "./places.service";
import * as i3 from "../list/List";
import * as i4 from "@angular/common";
function PlacesListComponent_novo_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "novo-list-item", 2);
    i0.ɵɵlistener("click", function PlacesListComponent_novo_list_item_1_Template_novo_list_item_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const $index_r2 = ctx.index; const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.selectedListNode($event, $index_r2); });
    i0.ɵɵelementStart(1, "item-header");
    i0.ɵɵelement(2, "item-avatar", 3);
    i0.ɵɵelementStart(3, "item-title");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "item-content");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((data_r1.structured_formatting == null ? null : data_r1.structured_formatting.main_text) ? data_r1.structured_formatting.main_text : data_r1.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(data_r1.structured_formatting == null ? null : data_r1.structured_formatting.secondary_text);
} }
export class PlacesListComponent {
    constructor(platformId, _elmRef, _global, _googlePlacesService) {
        this.platformId = platformId;
        this._elmRef = _elmRef;
        this._global = _global;
        this._googlePlacesService = _googlePlacesService;
        this.term = '';
        this.termChange = new EventEmitter();
        this.select = new EventEmitter();
        this.locationInput = '';
        this.gettingCurrentLocationFlag = false;
        this.dropdownOpen = false;
        this.recentDropdownOpen = false;
        this.queryItems = [];
        this.isSettingsError = false;
        this.settingsErrorMsg = '';
        this.settings = {};
        this.moduleinit = false;
        this.selectedDataIndex = -1;
        this.recentSearchData = [];
        this.userSelectedOption = '';
        this.defaultSettings = {
            geoPredictionServerUrl: '',
            geoLatLangServiceUrl: '',
            geoLocDetailServerUrl: '',
            geoCountryRestriction: [],
            geoTypes: [],
            geoLocation: [],
            geoRadius: 0,
            serverResponseListHierarchy: [],
            serverResponseatLangHierarchy: [],
            serverResponseDetailHierarchy: [],
            resOnSearchButtonClickOnly: false,
            useGoogleGeoApi: true,
            inputPlaceholderText: 'Enter Area Name',
            inputString: '',
            showSearchButton: true,
            showRecentSearch: true,
            showCurrentLocation: true,
            recentStorageName: 'recentSearches',
            noOfRecentSearchSave: 5,
            currentLocIconUrl: '',
            searchIconUrl: '',
            locationIconUrl: '',
        };
    }
    ngOnInit() {
        if (!this.moduleinit) {
            this.moduleInit();
        }
    }
    ngOnChanges() {
        this.moduleinit = true;
        this.moduleInit();
        this.searchinputCallback(null);
    }
    // function called when click event happens in input box. (Binded with view)
    searchinputClickCallback(event) {
        event.target.select();
        this.searchinputCallback(event);
    }
    // function called when there is a change in input. (Binded with view)
    searchinputCallback(event) {
        const inputVal = this.locationInput;
        if (inputVal) {
            this.getListQuery(inputVal);
        }
        else {
            this.queryItems = [];
            if (this.userSelectedOption) {
                this.userQuerySubmit('false');
            }
            this.userSelectedOption = '';
            if (this.settings.showRecentSearch) {
                this.showRecentSearch();
            }
            else {
                this.dropdownOpen = false;
            }
        }
    }
    // function to execute when user hover over autocomplete list.(binded with view)
    activeListNode(index) {
        for (let i = 0; i < this.queryItems.length; i++) {
            if (index === i) {
                this.queryItems[i].active = true;
                this.selectedDataIndex = index;
            }
            else {
                this.queryItems[i].active = false;
            }
        }
    }
    // function to execute when user select the autocomplete list.(binded with view)
    selectedListNode(event, index) {
        this.dropdownOpen = false;
        if (this.recentDropdownOpen) {
            this.setRecentLocation(this.queryItems[index]);
        }
        else {
            this.getPlaceLocationInfo(this.queryItems[index]);
        }
    }
    // function to close the autocomplete list when clicked outside. (binded with view)
    closeAutocomplete(event) {
        if (!this._elmRef.nativeElement.contains(event.target)) {
            this.selectedDataIndex = -1;
            this.dropdownOpen = false;
        }
    }
    // function to manually trigger the callback to parent component when clicked search button.
    userQuerySubmit(selectedOption) {
        const _userOption = selectedOption === 'false' ? '' : this.userSelectedOption;
        if (_userOption) {
            this.select.emit(this.userSelectedOption);
        }
        else {
            // this.select.emit(false);
        }
    }
    // function to get user current location from the device.
    currentLocationSelected() {
        if (isPlatformBrowser(this.platformId)) {
            this.gettingCurrentLocationFlag = true;
            this.dropdownOpen = false;
            this._googlePlacesService.getGeoCurrentLocation().then((result) => {
                if (!result) {
                    this.gettingCurrentLocationFlag = false;
                }
                else {
                    this.getCurrentLocationInfo(result);
                }
            });
        }
    }
    // module initialization happens. function called by ngOninit and ngOnChange
    moduleInit() {
        this.settings = this.setUserSettings();
        // condition to check if Radius is set without location detail.
        if (this.settings.geoRadius) {
            if (this.settings.geoLocation.length !== 2) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Radius should be used with GeoLocation. Please use "geoLocation" key to set lat and lng. ';
            }
        }
        // condition to check if lat and lng is set and radious is not set then it will set to 20,000KM by default
        if (this.settings.geoLocation.length === 2 && !this.settings.geoRadius) {
            this.settings.geoRadius = 20000000;
        }
        if (this.settings.showRecentSearch) {
            this.getRecentLocations();
        }
        if (!this.settings.useGoogleGeoApi) {
            if (!this.settings.geoPredictionServerUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Prediction custom server url is not defined. Please use "geoPredictionServerUrl" key to set. ';
            }
            if (!this.settings.geoLatLangServiceUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Latitude and longitude custom server url is not defined. Please use "geoLatLangServiceUrl" key to set. ';
            }
            if (!this.settings.geoLocDetailServerUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Location detail custom server url is not defined. Please use "geoLocDetailServerUrl" key to set. ';
            }
        }
        this.locationInput = this.term;
    }
    // function to process the search query when pressed enter.
    processSearchQuery() {
        if (this.queryItems.length) {
            if (this.selectedDataIndex > -1) {
                this.selectedListNode(null, this.selectedDataIndex);
            }
            else {
                this.selectedListNode(null, 0);
            }
        }
    }
    // function to set user settings if it is available.
    setUserSettings() {
        const _tempObj = {};
        if (this.userSettings && typeof this.userSettings === 'object') {
            const keys = Object.keys(this.defaultSettings);
            for (const value of keys) {
                _tempObj[value] = this.userSettings[value] !== undefined ? this.userSettings[value] : this.defaultSettings[value];
            }
            return _tempObj;
        }
        else {
            return this.defaultSettings;
        }
    }
    // function to get the autocomplete list based on user input.
    getListQuery(value) {
        this.recentDropdownOpen = false;
        if (this.settings.useGoogleGeoApi) {
            const _tempParams = {
                query: value,
                countryRestriction: this.settings.geoCountryRestriction,
                geoTypes: this.settings.geoTypes,
            };
            if (this.settings.geoLocation.length === 2) {
                _tempParams.geoLocation = this.settings.geoLocation;
                _tempParams.radius = this.settings.geoRadius;
            }
            this._googlePlacesService.getGeoPrediction(_tempParams).then((result) => {
                this.updateListItem(result);
            });
        }
        else {
            this._googlePlacesService.getPredictions(this.settings.geoPredictionServerUrl, value).then((result) => {
                result = this.extractServerList(this.settings.serverResponseListHierarchy, result);
                this.updateListItem(result);
            });
        }
    }
    // function to extratc custom data which is send by the server.
    extractServerList(arrayList, data) {
        if (arrayList.length) {
            let _tempData = data;
            for (const key of arrayList) {
                _tempData = _tempData[key];
            }
            return _tempData;
        }
        else {
            return data;
        }
    }
    // function to update the predicted list.
    updateListItem(listData) {
        this.queryItems = listData ? listData : [];
        this.dropdownOpen = true;
    }
    // function to show the recent search result.
    showRecentSearch() {
        this.recentDropdownOpen = true;
        this.dropdownOpen = true;
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((result) => {
            if (result) {
                this.queryItems = result;
            }
            else {
                this.queryItems = [];
            }
        });
    }
    // function to execute to get location detail based on latitude and longitude.
    getCurrentLocationInfo(latlng) {
        if (this.settings.useGoogleGeoApi) {
            this._googlePlacesService.getGeoLatLngDetail(latlng).then((result) => {
                if (result) {
                    this.setRecentLocation(result);
                }
                this.gettingCurrentLocationFlag = false;
            });
        }
        else {
            this._googlePlacesService.getLatLngDetail(this.settings.geoLatLangServiceUrl, latlng.lat, latlng.lng).then((result) => {
                if (result) {
                    result = this.extractServerList(this.settings.serverResponseatLangHierarchy, result);
                    this.setRecentLocation(result);
                }
                this.gettingCurrentLocationFlag = false;
            });
        }
    }
    // function to retrive the location info based on goovle place id.
    getPlaceLocationInfo(selectedData) {
        if (this.settings.useGoogleGeoApi) {
            this._googlePlacesService.getGeoPlaceDetail(selectedData.place_id).then((data) => {
                if (data) {
                    this.setRecentLocation(data);
                }
            });
        }
        else {
            this._googlePlacesService.getPlaceDetails(this.settings.geoLocDetailServerUrl, selectedData.place_id).then((result) => {
                if (result) {
                    result = this.extractServerList(this.settings.serverResponseDetailHierarchy, result);
                    this.setRecentLocation(result);
                }
            });
        }
    }
    // function to store the selected user search in the localstorage.
    setRecentLocation(data) {
        data = JSON.parse(JSON.stringify(data));
        data.description = data.description ? data.description : data.formatted_address;
        data.active = false;
        this.selectedDataIndex = -1;
        this.locationInput = data.description;
        if (this.settings.showRecentSearch) {
            this._googlePlacesService.addRecentList(this.settings.recentStorageName, data, this.settings.noOfRecentSearchSave);
            this.getRecentLocations();
        }
        this.userSelectedOption = data;
        // below code will execute only when user press enter or select any option selection and it emit a callback to the parent component.
        if (!this.settings.resOnSearchButtonClickOnly) {
            this.select.emit(data);
            this.termChange.emit(data);
        }
    }
    // function to retrive the stored recent user search from the localstorage.
    getRecentLocations() {
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((data) => {
            this.recentSearchData = data && data.length ? data : [];
        });
    }
}
PlacesListComponent.ɵfac = function PlacesListComponent_Factory(t) { return new (t || PlacesListComponent)(i0.ɵɵdirectiveInject(PLATFORM_ID), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.GlobalRef), i0.ɵɵdirectiveInject(i2.GooglePlacesService)); };
PlacesListComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PlacesListComponent, selectors: [["google-places-list"]], inputs: { userSettings: "userSettings", term: "term" }, outputs: { termChange: "termChange", select: "select" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 1, consts: [["direction", "vertical"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["icon", "location"]], template: function PlacesListComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "novo-list", 0);
        i0.ɵɵtemplate(1, PlacesListComponent_novo_list_item_1_Template, 7, 2, "novo-list-item", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.queryItems);
    } }, directives: [i3.NovoListElement, i4.NgForOf, i3.NovoListItemElement, i3.NovoItemHeaderElement, i3.NovoItemAvatarElement, i3.NovoItemTitleElement, i3.NovoItemContentElement], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PlacesListComponent, [{
        type: Component,
        args: [{
                selector: 'google-places-list',
                template: `
    <novo-list direction="vertical">
      <novo-list-item *ngFor="let data of queryItems; let $index = index" (click)="selectedListNode($event, $index)">
        <item-header>
          <item-avatar icon="location"></item-avatar>
          <item-title>{{ data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description }}</item-title>
        </item-header>
        <item-content>{{ data.structured_formatting?.secondary_text }}</item-content>
      </novo-list-item>
    </novo-list>
  `,
            }]
    }], function () { return [{ type: Object, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }, { type: i0.ElementRef }, { type: i1.GlobalRef }, { type: i2.GooglePlacesService }]; }, { userSettings: [{
            type: Input
        }], term: [{
            type: Input
        }], termChange: [{
            type: Output
        }], select: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9ydW5uZXIvd29yay9ub3ZvLWVsZW1lbnRzL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJlbGVtZW50cy9wbGFjZXMvcGxhY2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNO0FBQ04sT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7OztJQStCakQseUNBQ0U7SUFEa0Usb1FBQTBDO0lBQzVHLG1DQUNFO0lBQUEsaUNBQTJDO0lBQzNDLGtDQUFZO0lBQUEsWUFBcUc7SUFBQSxpQkFBYTtJQUNoSSxpQkFBYztJQUNkLG9DQUFjO0lBQUEsWUFBZ0Q7SUFBQSxpQkFBZTtJQUMvRSxpQkFBaUI7OztJQUhELGVBQXFHO0lBQXJHLDhLQUFxRztJQUVyRyxlQUFnRDtJQUFoRCxpSEFBZ0Q7O0FBS3RFLE1BQU0sT0FBTyxtQkFBbUI7SUErQzlCLFlBQytCLFVBQWtCLEVBQ3ZDLE9BQW1CLEVBQ25CLE9BQWtCLEVBQ2xCLG9CQUF5QztRQUhwQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBL0NuRCxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBRWxCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FB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RTtRQU1KLGlCQUFZOztRQVBNLGVBQW1EO1FBQW5ELHdDQUFtRDs7a0RBVTVELG1CQUFtQjtjQWQvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7YUFDRjtzQ0FpRDRDLE1BQU07c0JBQTlDLE1BQU07dUJBQUMsV0FBVzsyR0E5Q3JCLFlBQVk7a0JBRFgsS0FBSztZQUdOLElBQUk7a0JBREgsS0FBSztZQUdOLFVBQVU7a0JBRFQsTUFBTTtZQUdQLE1BQU07a0JBREwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHbG9iYWxSZWYgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nbG9iYWwvZ2xvYmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlUGxhY2VzU2VydmljZSB9IGZyb20gJy4vcGxhY2VzLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgZ2VvUHJlZGljdGlvblNlcnZlclVybD86IHN0cmluZztcbiAgZ2VvTGF0TGFuZ1NlcnZpY2VVcmw/OiBzdHJpbmc7XG4gIGdlb0xvY0RldGFpbFNlcnZlclVybD86IHN0cmluZztcbiAgZ2VvQ291bnRyeVJlc3RyaWN0aW9uPzogYW55O1xuICBnZW9UeXBlcz86IGFueTtcbiAgZ2VvTG9jYXRpb24/OiBhbnk7XG4gIGdlb1JhZGl1cz86IG51bWJlcjtcbiAgc2VydmVyUmVzcG9uc2VMaXN0SGllcmFyY2h5PzogYW55O1xuICBzZXJ2ZXJSZXNwb25zZWF0TGFuZ0hpZXJhcmNoeT86IGFueTtcbiAgc2VydmVyUmVzcG9uc2VEZXRhaWxIaWVyYXJjaHk/OiBhbnk7XG4gIHJlc09uU2VhcmNoQnV0dG9uQ2xpY2tPbmx5PzogYm9vbGVhbjtcbiAgdXNlR29vZ2xlR2VvQXBpPzogYm9vbGVhbjtcbiAgaW5wdXRQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIGlucHV0U3RyaW5nPzogc3RyaW5nO1xuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcbiAgc2hvd1JlY2VudFNlYXJjaD86IGJvb2xlYW47XG4gIHNob3dDdXJyZW50TG9jYXRpb24/OiBib29sZWFuO1xuICByZWNlbnRTdG9yYWdlTmFtZT86IHN0cmluZztcbiAgbm9PZlJlY2VudFNlYXJjaFNhdmU/OiBudW1iZXI7XG4gIGN1cnJlbnRMb2NJY29uVXJsPzogc3RyaW5nO1xuICBzZWFyY2hJY29uVXJsPzogc3RyaW5nO1xuICBsb2NhdGlvbkljb25Vcmw/OiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dvb2dsZS1wbGFjZXMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBkYXRhIG9mIHF1ZXJ5SXRlbXM7IGxldCAkaW5kZXggPSBpbmRleFwiIChjbGljayk9XCJzZWxlY3RlZExpc3ROb2RlKCRldmVudCwgJGluZGV4KVwiPlxuICAgICAgICA8aXRlbS1oZWFkZXI+XG4gICAgICAgICAgPGl0ZW0tYXZhdGFyIGljb249XCJsb2NhdGlvblwiPjwvaXRlbS1hdmF0YXI+XG4gICAgICAgICAgPGl0ZW0tdGl0bGU+e3sgZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/Lm1haW5fdGV4dCA/IGRhdGEuc3RydWN0dXJlZF9mb3JtYXR0aW5nLm1haW5fdGV4dCA6IGRhdGEuZGVzY3JpcHRpb24gfX08L2l0ZW0tdGl0bGU+XG4gICAgICAgIDwvaXRlbS1oZWFkZXI+XG4gICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/LnNlY29uZGFyeV90ZXh0IH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgIDwvbm92by1saXN0PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBQbGFjZXNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICB1c2VyU2V0dGluZ3M6IFNldHRpbmdzO1xuICBASW5wdXQoKVxuICB0ZXJtOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpXG4gIHRlcm1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGxvY2F0aW9uSW5wdXQ6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGRyb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcmVjZW50RHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBxdWVyeUl0ZW1zOiBhbnkgPSBbXTtcbiAgcHVibGljIGlzU2V0dGluZ3NFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2V0dGluZ3NFcnJvck1zZzogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBzZXR0aW5nczogU2V0dGluZ3MgPSB7fTtcbiAgcHJpdmF0ZSBtb2R1bGVpbml0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0ZWREYXRhSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIHJlY2VudFNlYXJjaERhdGE6IGFueSA9IFtdO1xuICBwcml2YXRlIHVzZXJTZWxlY3RlZE9wdGlvbjogYW55ID0gJyc7XG4gIHByaXZhdGUgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgICBnZW9QcmVkaWN0aW9uU2VydmVyVXJsOiAnJyxcbiAgICBnZW9MYXRMYW5nU2VydmljZVVybDogJycsXG4gICAgZ2VvTG9jRGV0YWlsU2VydmVyVXJsOiAnJyxcbiAgICBnZW9Db3VudHJ5UmVzdHJpY3Rpb246IFtdLFxuICAgIGdlb1R5cGVzOiBbXSxcbiAgICBnZW9Mb2NhdGlvbjogW10sXG4gICAgZ2VvUmFkaXVzOiAwLFxuICAgIHNlcnZlclJlc3BvbnNlTGlzdEhpZXJhcmNoeTogW10sXG4gICAgc2VydmVyUmVzcG9uc2VhdExhbmdIaWVyYXJjaHk6IFtdLFxuICAgIHNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5OiBbXSxcbiAgICByZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seTogZmFsc2UsXG4gICAgdXNlR29vZ2xlR2VvQXBpOiB0cnVlLFxuICAgIGlucHV0UGxhY2Vob2xkZXJUZXh0OiAnRW50ZXIgQXJlYSBOYW1lJyxcbiAgICBpbnB1dFN0cmluZzogJycsXG4gICAgc2hvd1NlYXJjaEJ1dHRvbjogdHJ1ZSxcbiAgICBzaG93UmVjZW50U2VhcmNoOiB0cnVlLFxuICAgIHNob3dDdXJyZW50TG9jYXRpb246IHRydWUsXG4gICAgcmVjZW50U3RvcmFnZU5hbWU6ICdyZWNlbnRTZWFyY2hlcycsXG4gICAgbm9PZlJlY2VudFNlYXJjaFNhdmU6IDUsXG4gICAgY3VycmVudExvY0ljb25Vcmw6ICcnLFxuICAgIHNlYXJjaEljb25Vcmw6ICcnLFxuICAgIGxvY2F0aW9uSWNvblVybDogJycsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBfZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2dsb2JhbDogR2xvYmFsUmVmLFxuICAgIHByaXZhdGUgX2dvb2dsZVBsYWNlc1NlcnZpY2U6IEdvb2dsZVBsYWNlc1NlcnZpY2UsXG4gICkge31cblxuICBuZ09uSW5pdCgpOiBhbnkge1xuICAgIGlmICghdGhpcy5tb2R1bGVpbml0KSB7XG4gICAgICB0aGlzLm1vZHVsZUluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiBhbnkge1xuICAgIHRoaXMubW9kdWxlaW5pdCA9IHRydWU7XG4gICAgdGhpcy5tb2R1bGVJbml0KCk7XG4gICAgdGhpcy5zZWFyY2hpbnB1dENhbGxiYWNrKG51bGwpO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gY2xpY2sgZXZlbnQgaGFwcGVucyBpbiBpbnB1dCBib3guIChCaW5kZWQgd2l0aCB2aWV3KVxuICBzZWFyY2hpbnB1dENsaWNrQ2FsbGJhY2soZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgZXZlbnQudGFyZ2V0LnNlbGVjdCgpO1xuICAgIHRoaXMuc2VhcmNoaW5wdXRDYWxsYmFjayhldmVudCk7XG4gIH1cblxuICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZSBpbiBpbnB1dC4gKEJpbmRlZCB3aXRoIHZpZXcpXG4gIHNlYXJjaGlucHV0Q2FsbGJhY2soZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgY29uc3QgaW5wdXRWYWw6IGFueSA9IHRoaXMubG9jYXRpb25JbnB1dDtcbiAgICBpZiAoaW5wdXRWYWwpIHtcbiAgICAgIHRoaXMuZ2V0TGlzdFF1ZXJ5KGlucHV0VmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWVyeUl0ZW1zID0gW107XG4gICAgICBpZiAodGhpcy51c2VyU2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgdGhpcy51c2VyUXVlcnlTdWJtaXQoJ2ZhbHNlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbiA9ICcnO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1JlY2VudFNlYXJjaCkge1xuICAgICAgICB0aGlzLnNob3dSZWNlbnRTZWFyY2goKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHVzZXIgaG92ZXIgb3ZlciBhdXRvY29tcGxldGUgbGlzdC4oYmluZGVkIHdpdGggdmlldylcbiAgYWN0aXZlTGlzdE5vZGUoaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMucXVlcnlJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XG4gICAgICAgIHRoaXMucXVlcnlJdGVtc1tpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID0gaW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnF1ZXJ5SXRlbXNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHVzZXIgc2VsZWN0IHRoZSBhdXRvY29tcGxldGUgbGlzdC4oYmluZGVkIHdpdGggdmlldylcbiAgc2VsZWN0ZWRMaXN0Tm9kZShldmVudDogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5yZWNlbnREcm9wZG93bk9wZW4pIHtcbiAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24odGhpcy5xdWVyeUl0ZW1zW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0UGxhY2VMb2NhdGlvbkluZm8odGhpcy5xdWVyeUl0ZW1zW2luZGV4XSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBsaXN0IHdoZW4gY2xpY2tlZCBvdXRzaWRlLiAoYmluZGVkIHdpdGggdmlldylcbiAgY2xvc2VBdXRvY29tcGxldGUoZXZlbnQ6IGFueSk6IGFueSB7XG4gICAgaWYgKCF0aGlzLl9lbG1SZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID0gLTE7XG4gICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIG1hbnVhbGx5IHRyaWdnZXIgdGhlIGNhbGxiYWNrIHRvIHBhcmVudCBjb21wb25lbnQgd2hlbiBjbGlja2VkIHNlYXJjaCBidXR0b24uXG4gIHVzZXJRdWVyeVN1Ym1pdChzZWxlY3RlZE9wdGlvbj86IGFueSk6IGFueSB7XG4gICAgY29uc3QgX3VzZXJPcHRpb246IGFueSA9IHNlbGVjdGVkT3B0aW9uID09PSAnZmFsc2UnID8gJycgOiB0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbjtcbiAgICBpZiAoX3VzZXJPcHRpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy51c2VyU2VsZWN0ZWRPcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLnNlbGVjdC5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBnZXQgdXNlciBjdXJyZW50IGxvY2F0aW9uIGZyb20gdGhlIGRldmljZS5cbiAgY3VycmVudExvY2F0aW9uU2VsZWN0ZWQoKTogYW55IHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IHRydWU7XG4gICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9DdXJyZW50TG9jYXRpb24oKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdldEN1cnJlbnRMb2NhdGlvbkluZm8ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gbW9kdWxlIGluaXRpYWxpemF0aW9uIGhhcHBlbnMuIGZ1bmN0aW9uIGNhbGxlZCBieSBuZ09uaW5pdCBhbmQgbmdPbkNoYW5nZVxuICBwcml2YXRlIG1vZHVsZUluaXQoKTogYW55IHtcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5zZXRVc2VyU2V0dGluZ3MoKTtcbiAgICAvLyBjb25kaXRpb24gdG8gY2hlY2sgaWYgUmFkaXVzIGlzIHNldCB3aXRob3V0IGxvY2F0aW9uIGRldGFpbC5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5nZW9SYWRpdXMpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCAhPT0gMikge1xuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyA9XG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ1JhZGl1cyBzaG91bGQgYmUgdXNlZCB3aXRoIEdlb0xvY2F0aW9uLiBQbGVhc2UgdXNlIFwiZ2VvTG9jYXRpb25cIiBrZXkgdG8gc2V0IGxhdCBhbmQgbG5nLiAnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbmRpdGlvbiB0byBjaGVjayBpZiBsYXQgYW5kIGxuZyBpcyBzZXQgYW5kIHJhZGlvdXMgaXMgbm90IHNldCB0aGVuIGl0IHdpbGwgc2V0IHRvIDIwLDAwMEtNIGJ5IGRlZmF1bHRcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbi5sZW5ndGggPT09IDIgJiYgIXRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmdlb1JhZGl1cyA9IDIwMDAwMDAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93UmVjZW50U2VhcmNoKSB7XG4gICAgICB0aGlzLmdldFJlY2VudExvY2F0aW9ucygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MudXNlR29vZ2xlR2VvQXBpKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZ2VvUHJlZGljdGlvblNlcnZlclVybCkge1xuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyA9XG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ1ByZWRpY3Rpb24gY3VzdG9tIHNlcnZlciB1cmwgaXMgbm90IGRlZmluZWQuIFBsZWFzZSB1c2UgXCJnZW9QcmVkaWN0aW9uU2VydmVyVXJsXCIga2V5IHRvIHNldC4gJztcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5nZW9MYXRMYW5nU2VydmljZVVybCkge1xuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyA9XG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ0xhdGl0dWRlIGFuZCBsb25naXR1ZGUgY3VzdG9tIHNlcnZlciB1cmwgaXMgbm90IGRlZmluZWQuIFBsZWFzZSB1c2UgXCJnZW9MYXRMYW5nU2VydmljZVVybFwiIGtleSB0byBzZXQuICc7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZ2VvTG9jRGV0YWlsU2VydmVyVXJsKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnTG9jYXRpb24gZGV0YWlsIGN1c3RvbSBzZXJ2ZXIgdXJsIGlzIG5vdCBkZWZpbmVkLiBQbGVhc2UgdXNlIFwiZ2VvTG9jRGV0YWlsU2VydmVyVXJsXCIga2V5IHRvIHNldC4gJztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2NhdGlvbklucHV0ID0gdGhpcy50ZXJtO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gcHJvY2VzcyB0aGUgc2VhcmNoIHF1ZXJ5IHdoZW4gcHJlc3NlZCBlbnRlci5cbiAgcHJpdmF0ZSBwcm9jZXNzU2VhcmNoUXVlcnkoKTogYW55IHtcbiAgICBpZiAodGhpcy5xdWVyeUl0ZW1zLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdE5vZGUobnVsbCwgdGhpcy5zZWxlY3RlZERhdGFJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdE5vZGUobnVsbCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gc2V0IHVzZXIgc2V0dGluZ3MgaWYgaXQgaXMgYXZhaWxhYmxlLlxuICBwcml2YXRlIHNldFVzZXJTZXR0aW5ncygpOiBTZXR0aW5ncyB7XG4gICAgY29uc3QgX3RlbXBPYmo6IGFueSA9IHt9O1xuICAgIGlmICh0aGlzLnVzZXJTZXR0aW5ncyAmJiB0eXBlb2YgdGhpcy51c2VyU2V0dGluZ3MgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKHRoaXMuZGVmYXVsdFNldHRpbmdzKTtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2Yga2V5cykge1xuICAgICAgICBfdGVtcE9ialt2YWx1ZV0gPSB0aGlzLnVzZXJTZXR0aW5nc1t2YWx1ZV0gIT09IHVuZGVmaW5lZCA/IHRoaXMudXNlclNldHRpbmdzW3ZhbHVlXSA6IHRoaXMuZGVmYXVsdFNldHRpbmdzW3ZhbHVlXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfdGVtcE9iajtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFNldHRpbmdzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGdldCB0aGUgYXV0b2NvbXBsZXRlIGxpc3QgYmFzZWQgb24gdXNlciBpbnB1dC5cbiAgcHJpdmF0ZSBnZXRMaXN0UXVlcnkodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgdGhpcy5yZWNlbnREcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIGNvbnN0IF90ZW1wUGFyYW1zOiBhbnkgPSB7XG4gICAgICAgIHF1ZXJ5OiB2YWx1ZSxcbiAgICAgICAgY291bnRyeVJlc3RyaWN0aW9uOiB0aGlzLnNldHRpbmdzLmdlb0NvdW50cnlSZXN0cmljdGlvbixcbiAgICAgICAgZ2VvVHlwZXM6IHRoaXMuc2V0dGluZ3MuZ2VvVHlwZXMsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb24ubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIF90ZW1wUGFyYW1zLmdlb0xvY2F0aW9uID0gdGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbjtcbiAgICAgICAgX3RlbXBQYXJhbXMucmFkaXVzID0gdGhpcy5zZXR0aW5ncy5nZW9SYWRpdXM7XG4gICAgICB9XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldEdlb1ByZWRpY3Rpb24oX3RlbXBQYXJhbXMpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRQcmVkaWN0aW9ucyh0aGlzLnNldHRpbmdzLmdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmwsIHZhbHVlKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5leHRyYWN0U2VydmVyTGlzdCh0aGlzLnNldHRpbmdzLnNlcnZlclJlc3BvbnNlTGlzdEhpZXJhcmNoeSwgcmVzdWx0KTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZXh0cmF0YyBjdXN0b20gZGF0YSB3aGljaCBpcyBzZW5kIGJ5IHRoZSBzZXJ2ZXIuXG4gIHByaXZhdGUgZXh0cmFjdFNlcnZlckxpc3QoYXJyYXlMaXN0OiBhbnksIGRhdGE6IGFueSk6IGFueSB7XG4gICAgaWYgKGFycmF5TGlzdC5sZW5ndGgpIHtcbiAgICAgIGxldCBfdGVtcERhdGE6IGFueSA9IGRhdGE7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBhcnJheUxpc3QpIHtcbiAgICAgICAgX3RlbXBEYXRhID0gX3RlbXBEYXRhW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gX3RlbXBEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByZWRpY3RlZCBsaXN0LlxuICBwcml2YXRlIHVwZGF0ZUxpc3RJdGVtKGxpc3REYXRhOiBhbnkpOiBhbnkge1xuICAgIHRoaXMucXVlcnlJdGVtcyA9IGxpc3REYXRhID8gbGlzdERhdGEgOiBbXTtcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWU7XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBzaG93IHRoZSByZWNlbnQgc2VhcmNoIHJlc3VsdC5cbiAgcHJpdmF0ZSBzaG93UmVjZW50U2VhcmNoKCk6IGFueSB7XG4gICAgdGhpcy5yZWNlbnREcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zID0gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zID0gW107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHRvIGdldCBsb2NhdGlvbiBkZXRhaWwgYmFzZWQgb24gbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZS5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50TG9jYXRpb25JbmZvKGxhdGxuZzogYW55KTogYW55IHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvTGF0TG5nRGV0YWlsKGxhdGxuZykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRMYXRMbmdEZXRhaWwodGhpcy5zZXR0aW5ncy5nZW9MYXRMYW5nU2VydmljZVVybCwgbGF0bG5nLmxhdCwgbGF0bG5nLmxuZykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZWF0TGFuZ0hpZXJhcmNoeSwgcmVzdWx0KTtcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gcmV0cml2ZSB0aGUgbG9jYXRpb24gaW5mbyBiYXNlZCBvbiBnb292bGUgcGxhY2UgaWQuXG4gIHByaXZhdGUgZ2V0UGxhY2VMb2NhdGlvbkluZm8oc2VsZWN0ZWREYXRhOiBhbnkpOiBhbnkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9QbGFjZURldGFpbChzZWxlY3RlZERhdGEucGxhY2VfaWQpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24oZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFBsYWNlRGV0YWlscyh0aGlzLnNldHRpbmdzLmdlb0xvY0RldGFpbFNlcnZlclVybCwgc2VsZWN0ZWREYXRhLnBsYWNlX2lkKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5leHRyYWN0U2VydmVyTGlzdCh0aGlzLnNldHRpbmdzLnNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5LCByZXN1bHQpO1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gc3RvcmUgdGhlIHNlbGVjdGVkIHVzZXIgc2VhcmNoIGluIHRoZSBsb2NhbHN0b3JhZ2UuXG4gIHByaXZhdGUgc2V0UmVjZW50TG9jYXRpb24oZGF0YTogYW55KTogYW55IHtcbiAgICBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgZGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb24gPyBkYXRhLmRlc2NyaXB0aW9uIDogZGF0YS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICBkYXRhLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSAtMTtcbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuYWRkUmVjZW50TGlzdCh0aGlzLnNldHRpbmdzLnJlY2VudFN0b3JhZ2VOYW1lLCBkYXRhLCB0aGlzLnNldHRpbmdzLm5vT2ZSZWNlbnRTZWFyY2hTYXZlKTtcbiAgICAgIHRoaXMuZ2V0UmVjZW50TG9jYXRpb25zKCk7XG4gICAgfVxuICAgIHRoaXMudXNlclNlbGVjdGVkT3B0aW9uID0gZGF0YTtcbiAgICAvLyBiZWxvdyBjb2RlIHdpbGwgZXhlY3V0ZSBvbmx5IHdoZW4gdXNlciBwcmVzcyBlbnRlciBvciBzZWxlY3QgYW55IG9wdGlvbiBzZWxlY3Rpb24gYW5kIGl0IGVtaXQgYSBjYWxsYmFjayB0byB0aGUgcGFyZW50IGNvbXBvbmVudC5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MucmVzT25TZWFyY2hCdXR0b25DbGlja09ubHkpIHtcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gICAgICB0aGlzLnRlcm1DaGFuZ2UuZW1pdChkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byByZXRyaXZlIHRoZSBzdG9yZWQgcmVjZW50IHVzZXIgc2VhcmNoIGZyb20gdGhlIGxvY2Fsc3RvcmFnZS5cbiAgcHJpdmF0ZSBnZXRSZWNlbnRMb2NhdGlvbnMoKTogYW55IHtcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICB0aGlzLnJlY2VudFNlYXJjaERhdGEgPSBkYXRhICYmIGRhdGEubGVuZ3RoID8gZGF0YSA6IFtdO1xuICAgIH0pO1xuICB9XG59XG4iXX0=