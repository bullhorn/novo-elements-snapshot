// NG2
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasePickerResults } from 'novo-elements/elements/picker';
import { GlobalRef } from 'novo-elements/services';
import { GooglePlacesService } from './places.service';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./places.service";
import * as i3 from "@angular/common";
import * as i4 from "novo-elements/elements/list";
// Value accessor for the component (supports ngModel)
const PLACES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlacesListComponent),
    multi: true,
};
export class PlacesListComponent extends BasePickerResults {
    constructor(platformId, _elmRef, _global, _googlePlacesService, cdr) {
        super(_elmRef, cdr);
        this.platformId = platformId;
        this._elmRef = _elmRef;
        this._global = _global;
        this._googlePlacesService = _googlePlacesService;
        this.cdr = cdr;
        this.termChange = new EventEmitter();
        this.select = new EventEmitter();
        this.locationInput = '';
        this.gettingCurrentLocationFlag = false;
        this.dropdownOpen = false;
        this.recentDropdownOpen = false;
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
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.config = {};
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
    writeValue(model) {
        this.model = model;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
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
            this.matches = [];
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
    // function to execute when user hover over autocomplete list. (binded with view)
    activeListNode(index) {
        for (let i = 0; i < this.matches.length; i++) {
            if (index === i) {
                this.matches[i].active = true;
                this.selectedDataIndex = index;
            }
            else {
                this.matches[i].active = false;
            }
        }
    }
    // function to execute when user selects a match from the autocomplete list. (binded with view)
    selectedListNode(event, index) {
        this.selectMatch(this.matches[index]);
    }
    // function to execute when user selects a match.
    selectMatch(match) {
        this.dropdownOpen = false;
        if (this.recentDropdownOpen) {
            this.setRecentLocation(match);
        }
        else {
            this.getPlaceLocationInfo(match);
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
        if (this.matches.length) {
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
        this.matches = listData ? listData : [];
        this.dropdownOpen = true;
        this.cdr.detectChanges();
    }
    // function to show the recent search result.
    showRecentSearch() {
        this.recentDropdownOpen = true;
        this.dropdownOpen = true;
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((result) => {
            if (result) {
                this.matches = result;
            }
            else {
                this.matches = [];
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
    onKeyDown(event) {
        if (this.dropdownOpen) {
            if (event.key === "ArrowUp" /* Key.ArrowUp */) {
                this.prevActiveMatch();
                return;
            }
            if (event.key === "ArrowDown" /* Key.ArrowDown */) {
                this.nextActiveMatch();
                return;
            }
            if (event.key === "Enter" /* Key.Enter */) {
                this.selectMatch(this.activeMatch);
                return;
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PlacesListComponent, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i1.GlobalRef }, { token: i2.GooglePlacesService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PlacesListComponent, selector: "google-places-list", inputs: { userSettings: "userSettings" }, outputs: { termChange: "termChange", select: "select" }, providers: [PLACES_VALUE_ACCESSOR], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <novo-list direction="vertical">
      <novo-list-item *ngFor="let data of matches; let $index = index" (click)="selectedListNode($event, $index)" [ngClass]="{ active: data === activeMatch }">
        <item-header>
          <item-avatar icon="location"></item-avatar>
          <item-title>{{ data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description }}</item-title>
        </item-header>
        <item-content>{{ data.structured_formatting?.secondary_text }}</item-content>
      </novo-list-item>
    </novo-list>
  `, isInline: true, styles: [":host{display:grid}:host novo-list{border:1px solid #4a89dc;background-color:#fff}:host novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host novo-list novo-list-item>div{width:100%}:host novo-list novo-list-item.active{background-color:#e0ebf9}:host novo-list novo-list-item:hover{background-color:#f1f6fc}:host novo-list novo-list-item item-content{flex-flow:row wrap}:host novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i4.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i4.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i4.NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: ["icon", "color"] }, { kind: "component", type: i4.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { kind: "component", type: i4.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { kind: "component", type: i4.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PlacesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'google-places-list', providers: [PLACES_VALUE_ACCESSOR], template: `
    <novo-list direction="vertical">
      <novo-list-item *ngFor="let data of matches; let $index = index" (click)="selectedListNode($event, $index)" [ngClass]="{ active: data === activeMatch }">
        <item-header>
          <item-avatar icon="location"></item-avatar>
          <item-title>{{ data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description }}</item-title>
        </item-header>
        <item-content>{{ data.structured_formatting?.secondary_text }}</item-content>
      </novo-list-item>
    </novo-list>
  `, styles: [":host{display:grid}:host novo-list{border:1px solid #4a89dc;background-color:#fff}:host novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host novo-list novo-list-item>div{width:100%}:host novo-list novo-list-item.active{background-color:#e0ebf9}:host novo-list novo-list-item:hover{background-color:#f1f6fc}:host novo-list novo-list-item item-content{flex-flow:row wrap}:host novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}\n"] }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i1.GlobalRef }, { type: i2.GooglePlacesService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { userSettings: [{
                type: Input
            }], termChange: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBMkJ2RCxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBa0JGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxpQkFBaUI7SUFnRHhELFlBQytCLFVBQWtCLEVBQ3ZDLE9BQW1CLEVBQ25CLE9BQWtCLEVBQ2xCLG9CQUF5QyxFQUN6QyxHQUFzQjtRQUU5QixLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBTlMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVc7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b0IsYUFDbkIsQ0FBQyxxQkFBcUIsQ0FBQyxZQUN4Qjs7Ozs7Ozs7OztHQVVUOzswQkFvREUsTUFBTTsyQkFBQyxXQUFXOytKQS9DckIsWUFBWTtzQkFEWCxLQUFLO2dCQUdOLFVBQVU7c0JBRFQsTUFBTTtnQkFHUCxNQUFNO3NCQURMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBORzJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJhc2VQaWNrZXJSZXN1bHRzIH0gZnJvbSAnbm92by1lbGVtZW50cy9lbGVtZW50cy9waWNrZXInO1xuaW1wb3J0IHsgR2xvYmFsUmVmIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLZXkgfSBmcm9tICdub3ZvLWVsZW1lbnRzL3V0aWxzJztcbmltcG9ydCB7IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSBmcm9tICcuL3BsYWNlcy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBTZXR0aW5ncyB7XG4gIGdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmw/OiBzdHJpbmc7XG4gIGdlb0xhdExhbmdTZXJ2aWNlVXJsPzogc3RyaW5nO1xuICBnZW9Mb2NEZXRhaWxTZXJ2ZXJVcmw/OiBzdHJpbmc7XG4gIGdlb0NvdW50cnlSZXN0cmljdGlvbj86IGFueTtcbiAgZ2VvVHlwZXM/OiBhbnk7XG4gIGdlb0xvY2F0aW9uPzogYW55O1xuICBnZW9SYWRpdXM/OiBudW1iZXI7XG4gIHNlcnZlclJlc3BvbnNlTGlzdEhpZXJhcmNoeT86IGFueTtcbiAgc2VydmVyUmVzcG9uc2VhdExhbmdIaWVyYXJjaHk/OiBhbnk7XG4gIHNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5PzogYW55O1xuICByZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seT86IGJvb2xlYW47XG4gIHVzZUdvb2dsZUdlb0FwaT86IGJvb2xlYW47XG4gIGlucHV0UGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBpbnB1dFN0cmluZz86IHN0cmluZztcbiAgc2hvd1NlYXJjaEJ1dHRvbj86IGJvb2xlYW47XG4gIHNob3dSZWNlbnRTZWFyY2g/OiBib29sZWFuO1xuICBzaG93Q3VycmVudExvY2F0aW9uPzogYm9vbGVhbjtcbiAgcmVjZW50U3RvcmFnZU5hbWU/OiBzdHJpbmc7XG4gIG5vT2ZSZWNlbnRTZWFyY2hTYXZlPzogbnVtYmVyO1xuICBjdXJyZW50TG9jSWNvblVybD86IHN0cmluZztcbiAgc2VhcmNoSWNvblVybD86IHN0cmluZztcbiAgbG9jYXRpb25JY29uVXJsPzogc3RyaW5nO1xufVxuXG4vLyBWYWx1ZSBhY2Nlc3NvciBmb3IgdGhlIGNvbXBvbmVudCAoc3VwcG9ydHMgbmdNb2RlbClcbmNvbnN0IFBMQUNFU19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBsYWNlc0xpc3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dvb2dsZS1wbGFjZXMtbGlzdCcsXG4gIHByb3ZpZGVyczogW1BMQUNFU19WQUxVRV9BQ0NFU1NPUl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tbGlzdCBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiPlxuICAgICAgPG5vdm8tbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBkYXRhIG9mIG1hdGNoZXM7IGxldCAkaW5kZXggPSBpbmRleFwiIChjbGljayk9XCJzZWxlY3RlZExpc3ROb2RlKCRldmVudCwgJGluZGV4KVwiIFtuZ0NsYXNzXT1cInsgYWN0aXZlOiBkYXRhID09PSBhY3RpdmVNYXRjaCB9XCI+XG4gICAgICAgIDxpdGVtLWhlYWRlcj5cbiAgICAgICAgICA8aXRlbS1hdmF0YXIgaWNvbj1cImxvY2F0aW9uXCI+PC9pdGVtLWF2YXRhcj5cbiAgICAgICAgICA8aXRlbS10aXRsZT57eyBkYXRhLnN0cnVjdHVyZWRfZm9ybWF0dGluZz8ubWFpbl90ZXh0ID8gZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmcubWFpbl90ZXh0IDogZGF0YS5kZXNjcmlwdGlvbiB9fTwvaXRlbS10aXRsZT5cbiAgICAgICAgPC9pdGVtLWhlYWRlcj5cbiAgICAgICAgPGl0ZW0tY29udGVudD57eyBkYXRhLnN0cnVjdHVyZWRfZm9ybWF0dGluZz8uc2Vjb25kYXJ5X3RleHQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgPC9ub3ZvLWxpc3Q+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL3BsYWNlcy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQbGFjZXNMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZVBpY2tlclJlc3VsdHMgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICB1c2VyU2V0dGluZ3M6IFNldHRpbmdzO1xuICBAT3V0cHV0KClcbiAgdGVybUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpXG4gIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwdWJsaWMgbG9jYXRpb25JbnB1dDogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBnZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyByZWNlbnREcm9wZG93bk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzU2V0dGluZ3NFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2V0dGluZ3NFcnJvck1zZzogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBzZXR0aW5nczogU2V0dGluZ3MgPSB7fTtcbiAgcHJpdmF0ZSBtb2R1bGVpbml0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0ZWREYXRhSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIHJlY2VudFNlYXJjaERhdGE6IGFueSA9IFtdO1xuICBwcml2YXRlIHVzZXJTZWxlY3RlZE9wdGlvbjogYW55ID0gJyc7XG4gIHByaXZhdGUgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgICBnZW9QcmVkaWN0aW9uU2VydmVyVXJsOiAnJyxcbiAgICBnZW9MYXRMYW5nU2VydmljZVVybDogJycsXG4gICAgZ2VvTG9jRGV0YWlsU2VydmVyVXJsOiAnJyxcbiAgICBnZW9Db3VudHJ5UmVzdHJpY3Rpb246IFtdLFxuICAgIGdlb1R5cGVzOiBbXSxcbiAgICBnZW9Mb2NhdGlvbjogW10sXG4gICAgZ2VvUmFkaXVzOiAwLFxuICAgIHNlcnZlclJlc3BvbnNlTGlzdEhpZXJhcmNoeTogW10sXG4gICAgc2VydmVyUmVzcG9uc2VhdExhbmdIaWVyYXJjaHk6IFtdLFxuICAgIHNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5OiBbXSxcbiAgICByZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seTogZmFsc2UsXG4gICAgdXNlR29vZ2xlR2VvQXBpOiB0cnVlLFxuICAgIGlucHV0UGxhY2Vob2xkZXJUZXh0OiAnRW50ZXIgQXJlYSBOYW1lJyxcbiAgICBpbnB1dFN0cmluZzogJycsXG4gICAgc2hvd1NlYXJjaEJ1dHRvbjogdHJ1ZSxcbiAgICBzaG93UmVjZW50U2VhcmNoOiB0cnVlLFxuICAgIHNob3dDdXJyZW50TG9jYXRpb246IHRydWUsXG4gICAgcmVjZW50U3RvcmFnZU5hbWU6ICdyZWNlbnRTZWFyY2hlcycsXG4gICAgbm9PZlJlY2VudFNlYXJjaFNhdmU6IDUsXG4gICAgY3VycmVudExvY0ljb25Vcmw6ICcnLFxuICAgIHNlYXJjaEljb25Vcmw6ICcnLFxuICAgIGxvY2F0aW9uSWNvblVybDogJycsXG4gIH07XG5cbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBfZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2dsb2JhbDogR2xvYmFsUmVmLFxuICAgIHByaXZhdGUgX2dvb2dsZVBsYWNlc1NlcnZpY2U6IEdvb2dsZVBsYWNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcihfZWxtUmVmLCBjZHIpO1xuICAgIHRoaXMuY29uZmlnID0ge307XG4gIH1cblxuICBuZ09uSW5pdCgpOiBhbnkge1xuICAgIGlmICghdGhpcy5tb2R1bGVpbml0KSB7XG4gICAgICB0aGlzLm1vZHVsZUluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiBhbnkge1xuICAgIHRoaXMubW9kdWxlaW5pdCA9IHRydWU7XG4gICAgdGhpcy5tb2R1bGVJbml0KCk7XG4gICAgdGhpcy5zZWFyY2hpbnB1dENhbGxiYWNrKG51bGwpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGNsaWNrIGV2ZW50IGhhcHBlbnMgaW4gaW5wdXQgYm94LiAoQmluZGVkIHdpdGggdmlldylcbiAgc2VhcmNoaW5wdXRDbGlja0NhbGxiYWNrKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGV2ZW50LnRhcmdldC5zZWxlY3QoKTtcbiAgICB0aGlzLnNlYXJjaGlucHV0Q2FsbGJhY2soZXZlbnQpO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjaGFuZ2UgaW4gaW5wdXQuIChCaW5kZWQgd2l0aCB2aWV3KVxuICBzZWFyY2hpbnB1dENhbGxiYWNrKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGlucHV0VmFsOiBhbnkgPSB0aGlzLmxvY2F0aW9uSW5wdXQ7XG4gICAgaWYgKGlucHV0VmFsKSB7XG4gICAgICB0aGlzLmdldExpc3RRdWVyeShpbnB1dFZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF0Y2hlcyA9IFtdO1xuICAgICAgaWYgKHRoaXMudXNlclNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgIHRoaXMudXNlclF1ZXJ5U3VibWl0KCdmYWxzZScpO1xuICAgICAgfVxuICAgICAgdGhpcy51c2VyU2VsZWN0ZWRPcHRpb24gPSAnJztcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgICAgdGhpcy5zaG93UmVjZW50U2VhcmNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB1c2VyIGhvdmVyIG92ZXIgYXV0b2NvbXBsZXRlIGxpc3QuIChiaW5kZWQgd2l0aCB2aWV3KVxuICBhY3RpdmVMaXN0Tm9kZShpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5tYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcbiAgICAgICAgdGhpcy5tYXRjaGVzW2ldLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSBpbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF0Y2hlc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdXNlciBzZWxlY3RzIGEgbWF0Y2ggZnJvbSB0aGUgYXV0b2NvbXBsZXRlIGxpc3QuIChiaW5kZWQgd2l0aCB2aWV3KVxuICBzZWxlY3RlZExpc3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICB0aGlzLnNlbGVjdE1hdGNoKHRoaXMubWF0Y2hlc1tpbmRleF0pO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHVzZXIgc2VsZWN0cyBhIG1hdGNoLlxuICBzZWxlY3RNYXRjaChtYXRjaDogYW55KTogYW55IHtcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnJlY2VudERyb3Bkb3duT3Blbikge1xuICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbihtYXRjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0UGxhY2VMb2NhdGlvbkluZm8obWF0Y2gpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGNsb3NlIHRoZSBhdXRvY29tcGxldGUgbGlzdCB3aGVuIGNsaWNrZWQgb3V0c2lkZS4gKGJpbmRlZCB3aXRoIHZpZXcpXG4gIGNsb3NlQXV0b2NvbXBsZXRlKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGlmICghdGhpcy5fZWxtUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGFJbmRleCA9IC0xO1xuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBtYW51YWxseSB0cmlnZ2VyIHRoZSBjYWxsYmFjayB0byBwYXJlbnQgY29tcG9uZW50IHdoZW4gY2xpY2tlZCBzZWFyY2ggYnV0dG9uLlxuICB1c2VyUXVlcnlTdWJtaXQoc2VsZWN0ZWRPcHRpb24/OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IF91c2VyT3B0aW9uOiBhbnkgPSBzZWxlY3RlZE9wdGlvbiA9PT0gJ2ZhbHNlJyA/ICcnIDogdGhpcy51c2VyU2VsZWN0ZWRPcHRpb247XG4gICAgaWYgKF91c2VyT3B0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMudXNlclNlbGVjdGVkT3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5zZWxlY3QuZW1pdChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZ2V0IHVzZXIgY3VycmVudCBsb2NhdGlvbiBmcm9tIHRoZSBkZXZpY2UuXG4gIGN1cnJlbnRMb2NhdGlvblNlbGVjdGVkKCk6IGFueSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWcgPSB0cnVlO1xuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvQ3VycmVudExvY2F0aW9uKCkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRDdXJyZW50TG9jYXRpb25JbmZvKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG1vZHVsZSBpbml0aWFsaXphdGlvbiBoYXBwZW5zLiBmdW5jdGlvbiBjYWxsZWQgYnkgbmdPbmluaXQgYW5kIG5nT25DaGFuZ2VcbiAgcHJpdmF0ZSBtb2R1bGVJbml0KCk6IGFueSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuc2V0VXNlclNldHRpbmdzKCk7XG4gICAgLy8gY29uZGl0aW9uIHRvIGNoZWNrIGlmIFJhZGl1cyBpcyBzZXQgd2l0aG91dCBsb2NhdGlvbiBkZXRhaWwuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbi5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdSYWRpdXMgc2hvdWxkIGJlIHVzZWQgd2l0aCBHZW9Mb2NhdGlvbi4gUGxlYXNlIHVzZSBcImdlb0xvY2F0aW9uXCIga2V5IHRvIHNldCBsYXQgYW5kIGxuZy4gJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25kaXRpb24gdG8gY2hlY2sgaWYgbGF0IGFuZCBsbmcgaXMgc2V0IGFuZCByYWRpb3VzIGlzIG5vdCBzZXQgdGhlbiBpdCB3aWxsIHNldCB0byAyMCwwMDBLTSBieSBkZWZhdWx0XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb24ubGVuZ3RoID09PSAyICYmICF0aGlzLnNldHRpbmdzLmdlb1JhZGl1cykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5nZW9SYWRpdXMgPSAyMDAwMDAwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1JlY2VudFNlYXJjaCkge1xuICAgICAgdGhpcy5nZXRSZWNlbnRMb2NhdGlvbnMoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdQcmVkaWN0aW9uIGN1c3RvbSBzZXJ2ZXIgdXJsIGlzIG5vdCBkZWZpbmVkLiBQbGVhc2UgdXNlIFwiZ2VvUHJlZGljdGlvblNlcnZlclVybFwiIGtleSB0byBzZXQuICc7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZ2VvTGF0TGFuZ1NlcnZpY2VVcmwpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdMYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGN1c3RvbSBzZXJ2ZXIgdXJsIGlzIG5vdCBkZWZpbmVkLiBQbGVhc2UgdXNlIFwiZ2VvTGF0TGFuZ1NlcnZpY2VVcmxcIiBrZXkgdG8gc2V0LiAnO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmdlb0xvY0RldGFpbFNlcnZlclVybCkge1xuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyA9XG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ0xvY2F0aW9uIGRldGFpbCBjdXN0b20gc2VydmVyIHVybCBpcyBub3QgZGVmaW5lZC4gUGxlYXNlIHVzZSBcImdlb0xvY0RldGFpbFNlcnZlclVybFwiIGtleSB0byBzZXQuICc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubG9jYXRpb25JbnB1dCA9IHRoaXMudGVybTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHByb2Nlc3MgdGhlIHNlYXJjaCBxdWVyeSB3aGVuIHByZXNzZWQgZW50ZXIuXG4gIHByaXZhdGUgcHJvY2Vzc1NlYXJjaFF1ZXJ5KCk6IGFueSB7XG4gICAgaWYgKHRoaXMubWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3ROb2RlKG51bGwsIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3ROb2RlKG51bGwsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHNldCB1c2VyIHNldHRpbmdzIGlmIGl0IGlzIGF2YWlsYWJsZS5cbiAgcHJpdmF0ZSBzZXRVc2VyU2V0dGluZ3MoKTogU2V0dGluZ3Mge1xuICAgIGNvbnN0IF90ZW1wT2JqOiBhbnkgPSB7fTtcbiAgICBpZiAodGhpcy51c2VyU2V0dGluZ3MgJiYgdHlwZW9mIHRoaXMudXNlclNldHRpbmdzID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyh0aGlzLmRlZmF1bHRTZXR0aW5ncyk7XG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGtleXMpIHtcbiAgICAgICAgX3RlbXBPYmpbdmFsdWVdID0gdGhpcy51c2VyU2V0dGluZ3NbdmFsdWVdICE9PSB1bmRlZmluZWQgPyB0aGlzLnVzZXJTZXR0aW5nc1t2YWx1ZV0gOiB0aGlzLmRlZmF1bHRTZXR0aW5nc1t2YWx1ZV07XG4gICAgICB9XG4gICAgICByZXR1cm4gX3RlbXBPYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTZXR0aW5ncztcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBnZXQgdGhlIGF1dG9jb21wbGV0ZSBsaXN0IGJhc2VkIG9uIHVzZXIgaW5wdXQuXG4gIHByaXZhdGUgZ2V0TGlzdFF1ZXJ5KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHRoaXMucmVjZW50RHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlR29vZ2xlR2VvQXBpKSB7XG4gICAgICBjb25zdCBfdGVtcFBhcmFtczogYW55ID0ge1xuICAgICAgICBxdWVyeTogdmFsdWUsXG4gICAgICAgIGNvdW50cnlSZXN0cmljdGlvbjogdGhpcy5zZXR0aW5ncy5nZW9Db3VudHJ5UmVzdHJpY3Rpb24sXG4gICAgICAgIGdlb1R5cGVzOiB0aGlzLnNldHRpbmdzLmdlb1R5cGVzLFxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBfdGVtcFBhcmFtcy5nZW9Mb2NhdGlvbiA9IHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb247XG4gICAgICAgIF90ZW1wUGFyYW1zLnJhZGl1cyA9IHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzO1xuICAgICAgfVxuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9QcmVkaWN0aW9uKF90ZW1wUGFyYW1zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0UHJlZGljdGlvbnModGhpcy5zZXR0aW5ncy5nZW9QcmVkaWN0aW9uU2VydmVyVXJsLCB2YWx1ZSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHksIHJlc3VsdCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0ocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4dHJhdGMgY3VzdG9tIGRhdGEgd2hpY2ggaXMgc2VuZCBieSB0aGUgc2VydmVyLlxuICBwcml2YXRlIGV4dHJhY3RTZXJ2ZXJMaXN0KGFycmF5TGlzdDogYW55LCBkYXRhOiBhbnkpOiBhbnkge1xuICAgIGlmIChhcnJheUxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgX3RlbXBEYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgYXJyYXlMaXN0KSB7XG4gICAgICAgIF90ZW1wRGF0YSA9IF90ZW1wRGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF90ZW1wRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcmVkaWN0ZWQgbGlzdC5cbiAgcHJpdmF0ZSB1cGRhdGVMaXN0SXRlbShsaXN0RGF0YTogYW55KTogYW55IHtcbiAgICB0aGlzLm1hdGNoZXMgPSBsaXN0RGF0YSA/IGxpc3REYXRhIDogW107XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHNob3cgdGhlIHJlY2VudCBzZWFyY2ggcmVzdWx0LlxuICBwcml2YXRlIHNob3dSZWNlbnRTZWFyY2goKTogYW55IHtcbiAgICB0aGlzLnJlY2VudERyb3Bkb3duT3BlbiA9IHRydWU7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0UmVjZW50TGlzdCh0aGlzLnNldHRpbmdzLnJlY2VudFN0b3JhZ2VOYW1lKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSByZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgdG8gZ2V0IGxvY2F0aW9uIGRldGFpbCBiYXNlZCBvbiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlLlxuICBwcml2YXRlIGdldEN1cnJlbnRMb2NhdGlvbkluZm8obGF0bG5nOiBhbnkpOiBhbnkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9MYXRMbmdEZXRhaWwobGF0bG5nKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldExhdExuZ0RldGFpbCh0aGlzLnNldHRpbmdzLmdlb0xhdExhbmdTZXJ2aWNlVXJsLCBsYXRsbmcubGF0LCBsYXRsbmcubG5nKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5leHRyYWN0U2VydmVyTGlzdCh0aGlzLnNldHRpbmdzLnNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5LCByZXN1bHQpO1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byByZXRyaXZlIHRoZSBsb2NhdGlvbiBpbmZvIGJhc2VkIG9uIGdvb3ZsZSBwbGFjZSBpZC5cbiAgcHJpdmF0ZSBnZXRQbGFjZUxvY2F0aW9uSW5mbyhzZWxlY3RlZERhdGE6IGFueSk6IGFueSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlR29vZ2xlR2VvQXBpKSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldEdlb1BsYWNlRGV0YWlsKHNlbGVjdGVkRGF0YS5wbGFjZV9pZCkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbihkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0UGxhY2VEZXRhaWxzKHRoaXMuc2V0dGluZ3MuZ2VvTG9jRGV0YWlsU2VydmVyVXJsLCBzZWxlY3RlZERhdGEucGxhY2VfaWQpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmV4dHJhY3RTZXJ2ZXJMaXN0KHRoaXMuc2V0dGluZ3Muc2VydmVyUmVzcG9uc2VEZXRhaWxIaWVyYXJjaHksIHJlc3VsdCk7XG4gICAgICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBzdG9yZSB0aGUgc2VsZWN0ZWQgdXNlciBzZWFyY2ggaW4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAgcHJpdmF0ZSBzZXRSZWNlbnRMb2NhdGlvbihkYXRhOiBhbnkpOiBhbnkge1xuICAgIGRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICBkYXRhLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbiA/IGRhdGEuZGVzY3JpcHRpb24gOiBkYXRhLmZvcm1hdHRlZF9hZGRyZXNzO1xuICAgIGRhdGEuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZERhdGFJbmRleCA9IC0xO1xuICAgIHRoaXMubG9jYXRpb25JbnB1dCA9IGRhdGEuZGVzY3JpcHRpb247XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1JlY2VudFNlYXJjaCkge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5hZGRSZWNlbnRMaXN0KHRoaXMuc2V0dGluZ3MucmVjZW50U3RvcmFnZU5hbWUsIGRhdGEsIHRoaXMuc2V0dGluZ3Mubm9PZlJlY2VudFNlYXJjaFNhdmUpO1xuICAgICAgdGhpcy5nZXRSZWNlbnRMb2NhdGlvbnMoKTtcbiAgICB9XG4gICAgdGhpcy51c2VyU2VsZWN0ZWRPcHRpb24gPSBkYXRhO1xuICAgIC8vIGJlbG93IGNvZGUgd2lsbCBleGVjdXRlIG9ubHkgd2hlbiB1c2VyIHByZXNzIGVudGVyIG9yIHNlbGVjdCBhbnkgb3B0aW9uIHNlbGVjdGlvbiBhbmQgaXQgZW1pdCBhIGNhbGxiYWNrIHRvIHRoZSBwYXJlbnQgY29tcG9uZW50LlxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5yZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seSkge1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdChkYXRhKTtcbiAgICAgIHRoaXMudGVybUNoYW5nZS5lbWl0KGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHJldHJpdmUgdGhlIHN0b3JlZCByZWNlbnQgdXNlciBzZWFyY2ggZnJvbSB0aGUgbG9jYWxzdG9yYWdlLlxuICBwcml2YXRlIGdldFJlY2VudExvY2F0aW9ucygpOiBhbnkge1xuICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0UmVjZW50TGlzdCh0aGlzLnNldHRpbmdzLnJlY2VudFN0b3JhZ2VOYW1lKS50aGVuKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucmVjZW50U2VhcmNoRGF0YSA9IGRhdGEgJiYgZGF0YS5sZW5ndGggPyBkYXRhIDogW107XG4gICAgfSk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bk9wZW4pIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd1VwKSB7XG4gICAgICAgIHRoaXMucHJldkFjdGl2ZU1hdGNoKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5BcnJvd0Rvd24pIHtcbiAgICAgICAgdGhpcy5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gS2V5LkVudGVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0TWF0Y2godGhpcy5hY3RpdmVNYXRjaCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==