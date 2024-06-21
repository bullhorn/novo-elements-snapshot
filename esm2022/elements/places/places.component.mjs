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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: PlacesListComponent, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i1.GlobalRef }, { token: i2.GooglePlacesService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.3", type: PlacesListComponent, selector: "google-places-list", inputs: { userSettings: "userSettings" }, outputs: { termChange: "termChange", select: "select" }, providers: [PLACES_VALUE_ACCESSOR], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.3", ngImport: i0, type: PlacesListComponent, decorators: [{
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
        }], ctorParameters: () => [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i1.GlobalRef }, { type: i2.GooglePlacesService }, { type: i0.ChangeDetectorRef }], propDecorators: { userSettings: [{
                type: Input
            }], termChange: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBMkJ2RCxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBa0JGLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxpQkFBaUI7SUFnRHhELFlBQytCLFVBQWtCLEVBQ3ZDLE9BQW1CLEVBQ25CLE9BQWtCLEVBQ2xCLG9CQUF5QyxFQUN6QyxHQUFzQjtRQUU5QixLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBTlMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVc7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QUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdEIsSUFBSSxLQUFLLENBQUMsR0FBRyxnQ0FBZ0IsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU87WUFDVCxDQUFDO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxvQ0FBa0IsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU87WUFDVCxDQUFDO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyw0QkFBYyxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzhHQWhYVSxtQkFBbUIsa0JBaURwQixXQUFXO2tHQWpEVixtQkFBbUIsZ0pBZG5CLENBQUMscUJBQXFCLENBQUMsc0VBQ3hCOzs7Ozs7Ozs7O0dBVVQ7OzJGQUdVLG1CQUFtQjtrQkFoQi9CLFNBQVM7K0JBQ0Usb0JBQW9CLGFBQ25CLENBQUMscUJBQXFCLENBQUMsWUFDeEI7Ozs7Ozs7Ozs7R0FVVDs7MEJBb0RFLE1BQU07MkJBQUMsV0FBVzs0SkEvQ3JCLFlBQVk7c0JBRFgsS0FBSztnQkFHTixVQUFVO3NCQURULE1BQU07Z0JBR1AsTUFBTTtzQkFETCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCYXNlUGlja2VyUmVzdWx0cyB9IGZyb20gJ25vdm8tZWxlbWVudHMvZWxlbWVudHMvcGlja2VyJztcbmltcG9ydCB7IEdsb2JhbFJlZiB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuaW1wb3J0IHsgS2V5IH0gZnJvbSAnbm92by1lbGVtZW50cy91dGlscyc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZXMuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xuICBnZW9QcmVkaWN0aW9uU2VydmVyVXJsPzogc3RyaW5nO1xuICBnZW9MYXRMYW5nU2VydmljZVVybD86IHN0cmluZztcbiAgZ2VvTG9jRGV0YWlsU2VydmVyVXJsPzogc3RyaW5nO1xuICBnZW9Db3VudHJ5UmVzdHJpY3Rpb24/OiBhbnk7XG4gIGdlb1R5cGVzPzogYW55O1xuICBnZW9Mb2NhdGlvbj86IGFueTtcbiAgZ2VvUmFkaXVzPzogbnVtYmVyO1xuICBzZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHk/OiBhbnk7XG4gIHNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5PzogYW55O1xuICBzZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeT86IGFueTtcbiAgcmVzT25TZWFyY2hCdXR0b25DbGlja09ubHk/OiBib29sZWFuO1xuICB1c2VHb29nbGVHZW9BcGk/OiBib29sZWFuO1xuICBpbnB1dFBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgaW5wdXRTdHJpbmc/OiBzdHJpbmc7XG4gIHNob3dTZWFyY2hCdXR0b24/OiBib29sZWFuO1xuICBzaG93UmVjZW50U2VhcmNoPzogYm9vbGVhbjtcbiAgc2hvd0N1cnJlbnRMb2NhdGlvbj86IGJvb2xlYW47XG4gIHJlY2VudFN0b3JhZ2VOYW1lPzogc3RyaW5nO1xuICBub09mUmVjZW50U2VhcmNoU2F2ZT86IG51bWJlcjtcbiAgY3VycmVudExvY0ljb25Vcmw/OiBzdHJpbmc7XG4gIHNlYXJjaEljb25Vcmw/OiBzdHJpbmc7XG4gIGxvY2F0aW9uSWNvblVybD86IHN0cmluZztcbn1cblxuLy8gVmFsdWUgYWNjZXNzb3IgZm9yIHRoZSBjb21wb25lbnQgKHN1cHBvcnRzIG5nTW9kZWwpXG5jb25zdCBQTEFDRVNfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBQbGFjZXNMaXN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnb29nbGUtcGxhY2VzLWxpc3QnLFxuICBwcm92aWRlcnM6IFtQTEFDRVNfVkFMVUVfQUNDRVNTT1JdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxub3ZvLWxpc3QgZGlyZWN0aW9uPVwidmVydGljYWxcIj5cbiAgICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgZGF0YSBvZiBtYXRjaGVzOyBsZXQgJGluZGV4ID0gaW5kZXhcIiAoY2xpY2spPVwic2VsZWN0ZWRMaXN0Tm9kZSgkZXZlbnQsICRpbmRleClcIiBbbmdDbGFzc109XCJ7IGFjdGl2ZTogZGF0YSA9PT0gYWN0aXZlTWF0Y2ggfVwiPlxuICAgICAgICA8aXRlbS1oZWFkZXI+XG4gICAgICAgICAgPGl0ZW0tYXZhdGFyIGljb249XCJsb2NhdGlvblwiPjwvaXRlbS1hdmF0YXI+XG4gICAgICAgICAgPGl0ZW0tdGl0bGU+e3sgZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/Lm1haW5fdGV4dCA/IGRhdGEuc3RydWN0dXJlZF9mb3JtYXR0aW5nLm1haW5fdGV4dCA6IGRhdGEuZGVzY3JpcHRpb24gfX08L2l0ZW0tdGl0bGU+XG4gICAgICAgIDwvaXRlbS1oZWFkZXI+XG4gICAgICAgIDxpdGVtLWNvbnRlbnQ+e3sgZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/LnNlY29uZGFyeV90ZXh0IH19PC9pdGVtLWNvbnRlbnQ+XG4gICAgICA8L25vdm8tbGlzdC1pdGVtPlxuICAgIDwvbm92by1saXN0PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9wbGFjZXMuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VzTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VQaWNrZXJSZXN1bHRzIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KClcbiAgdXNlclNldHRpbmdzOiBTZXR0aW5ncztcbiAgQE91dHB1dCgpXG4gIHRlcm1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGxvY2F0aW9uSW5wdXQ6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGRyb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcmVjZW50RHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1NldHRpbmdzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNldHRpbmdzRXJyb3JNc2c6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgc2V0dGluZ3M6IFNldHRpbmdzID0ge307XG4gIHByaXZhdGUgbW9kdWxlaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkRGF0YUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSByZWNlbnRTZWFyY2hEYXRhOiBhbnkgPSBbXTtcbiAgcHJpdmF0ZSB1c2VyU2VsZWN0ZWRPcHRpb246IGFueSA9ICcnO1xuICBwcml2YXRlIGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gICAgZ2VvUHJlZGljdGlvblNlcnZlclVybDogJycsXG4gICAgZ2VvTGF0TGFuZ1NlcnZpY2VVcmw6ICcnLFxuICAgIGdlb0xvY0RldGFpbFNlcnZlclVybDogJycsXG4gICAgZ2VvQ291bnRyeVJlc3RyaWN0aW9uOiBbXSxcbiAgICBnZW9UeXBlczogW10sXG4gICAgZ2VvTG9jYXRpb246IFtdLFxuICAgIGdlb1JhZGl1czogMCxcbiAgICBzZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHk6IFtdLFxuICAgIHNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5OiBbXSxcbiAgICBzZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeTogW10sXG4gICAgcmVzT25TZWFyY2hCdXR0b25DbGlja09ubHk6IGZhbHNlLFxuICAgIHVzZUdvb2dsZUdlb0FwaTogdHJ1ZSxcbiAgICBpbnB1dFBsYWNlaG9sZGVyVGV4dDogJ0VudGVyIEFyZWEgTmFtZScsXG4gICAgaW5wdXRTdHJpbmc6ICcnLFxuICAgIHNob3dTZWFyY2hCdXR0b246IHRydWUsXG4gICAgc2hvd1JlY2VudFNlYXJjaDogdHJ1ZSxcbiAgICBzaG93Q3VycmVudExvY2F0aW9uOiB0cnVlLFxuICAgIHJlY2VudFN0b3JhZ2VOYW1lOiAncmVjZW50U2VhcmNoZXMnLFxuICAgIG5vT2ZSZWNlbnRTZWFyY2hTYXZlOiA1LFxuICAgIGN1cnJlbnRMb2NJY29uVXJsOiAnJyxcbiAgICBzZWFyY2hJY29uVXJsOiAnJyxcbiAgICBsb2NhdGlvbkljb25Vcmw6ICcnLFxuICB9O1xuXG4gIG1vZGVsOiBhbnk7XG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgX2VsbVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9nbG9iYWw6IEdsb2JhbFJlZixcbiAgICBwcml2YXRlIF9nb29nbGVQbGFjZXNTZXJ2aWNlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgc3VwZXIoX2VsbVJlZiwgY2RyKTtcbiAgICB0aGlzLmNvbmZpZyA9IHt9O1xuICB9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICBpZiAoIXRoaXMubW9kdWxlaW5pdCkge1xuICAgICAgdGhpcy5tb2R1bGVJbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogYW55IHtcbiAgICB0aGlzLm1vZHVsZWluaXQgPSB0cnVlO1xuICAgIHRoaXMubW9kdWxlSW5pdCgpO1xuICAgIHRoaXMuc2VhcmNoaW5wdXRDYWxsYmFjayhudWxsKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBjbGljayBldmVudCBoYXBwZW5zIGluIGlucHV0IGJveC4gKEJpbmRlZCB3aXRoIHZpZXcpXG4gIHNlYXJjaGlucHV0Q2xpY2tDYWxsYmFjayhldmVudDogYW55KTogYW55IHtcbiAgICBldmVudC50YXJnZXQuc2VsZWN0KCk7XG4gICAgdGhpcy5zZWFyY2hpbnB1dENhbGxiYWNrKGV2ZW50KTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIGluIGlucHV0LiAoQmluZGVkIHdpdGggdmlldylcbiAgc2VhcmNoaW5wdXRDYWxsYmFjayhldmVudDogYW55KTogYW55IHtcbiAgICBjb25zdCBpbnB1dFZhbDogYW55ID0gdGhpcy5sb2NhdGlvbklucHV0O1xuICAgIGlmIChpbnB1dFZhbCkge1xuICAgICAgdGhpcy5nZXRMaXN0UXVlcnkoaW5wdXRWYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hdGNoZXMgPSBbXTtcbiAgICAgIGlmICh0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbikge1xuICAgICAgICB0aGlzLnVzZXJRdWVyeVN1Ym1pdCgnZmFsc2UnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXNlclNlbGVjdGVkT3B0aW9uID0gJyc7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93UmVjZW50U2VhcmNoKSB7XG4gICAgICAgIHRoaXMuc2hvd1JlY2VudFNlYXJjaCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdXNlciBob3ZlciBvdmVyIGF1dG9jb21wbGV0ZSBsaXN0LiAoYmluZGVkIHdpdGggdmlldylcbiAgYWN0aXZlTGlzdE5vZGUoaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMubWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlc1tpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID0gaW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hdGNoZXNbaV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHVzZXIgc2VsZWN0cyBhIG1hdGNoIGZyb20gdGhlIGF1dG9jb21wbGV0ZSBsaXN0LiAoYmluZGVkIHdpdGggdmlldylcbiAgc2VsZWN0ZWRMaXN0Tm9kZShldmVudDogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgdGhpcy5zZWxlY3RNYXRjaCh0aGlzLm1hdGNoZXNbaW5kZXhdKTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB1c2VyIHNlbGVjdHMgYSBtYXRjaC5cbiAgc2VsZWN0TWF0Y2gobWF0Y2g6IGFueSk6IGFueSB7XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5yZWNlbnREcm9wZG93bk9wZW4pIHtcbiAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24obWF0Y2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldFBsYWNlTG9jYXRpb25JbmZvKG1hdGNoKTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIGxpc3Qgd2hlbiBjbGlja2VkIG91dHNpZGUuIChiaW5kZWQgd2l0aCB2aWV3KVxuICBjbG9zZUF1dG9jb21wbGV0ZShldmVudDogYW55KTogYW55IHtcbiAgICBpZiAoIXRoaXMuX2VsbVJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSAtMTtcbiAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gbWFudWFsbHkgdHJpZ2dlciB0aGUgY2FsbGJhY2sgdG8gcGFyZW50IGNvbXBvbmVudCB3aGVuIGNsaWNrZWQgc2VhcmNoIGJ1dHRvbi5cbiAgdXNlclF1ZXJ5U3VibWl0KHNlbGVjdGVkT3B0aW9uPzogYW55KTogYW55IHtcbiAgICBjb25zdCBfdXNlck9wdGlvbjogYW55ID0gc2VsZWN0ZWRPcHRpb24gPT09ICdmYWxzZScgPyAnJyA6IHRoaXMudXNlclNlbGVjdGVkT3B0aW9uO1xuICAgIGlmIChfdXNlck9wdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMuc2VsZWN0LmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGdldCB1c2VyIGN1cnJlbnQgbG9jYXRpb24gZnJvbSB0aGUgZGV2aWNlLlxuICBjdXJyZW50TG9jYXRpb25TZWxlY3RlZCgpOiBhbnkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldEdlb0N1cnJlbnRMb2NhdGlvbigpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0Q3VycmVudExvY2F0aW9uSW5mbyhyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBtb2R1bGUgaW5pdGlhbGl6YXRpb24gaGFwcGVucy4gZnVuY3Rpb24gY2FsbGVkIGJ5IG5nT25pbml0IGFuZCBuZ09uQ2hhbmdlXG4gIHByaXZhdGUgbW9kdWxlSW5pdCgpOiBhbnkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnNldFVzZXJTZXR0aW5ncygpO1xuICAgIC8vIGNvbmRpdGlvbiB0byBjaGVjayBpZiBSYWRpdXMgaXMgc2V0IHdpdGhvdXQgbG9jYXRpb24gZGV0YWlsLlxuICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb1JhZGl1cykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb24ubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnUmFkaXVzIHNob3VsZCBiZSB1c2VkIHdpdGggR2VvTG9jYXRpb24uIFBsZWFzZSB1c2UgXCJnZW9Mb2NhdGlvblwiIGtleSB0byBzZXQgbGF0IGFuZCBsbmcuICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29uZGl0aW9uIHRvIGNoZWNrIGlmIGxhdCBhbmQgbG5nIGlzIHNldCBhbmQgcmFkaW91cyBpcyBub3Qgc2V0IHRoZW4gaXQgd2lsbCBzZXQgdG8gMjAsMDAwS00gYnkgZGVmYXVsdFxuICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCA9PT0gMiAmJiAhdGhpcy5zZXR0aW5ncy5nZW9SYWRpdXMpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzID0gMjAwMDAwMDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgIHRoaXMuZ2V0UmVjZW50TG9jYXRpb25zKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5nZW9QcmVkaWN0aW9uU2VydmVyVXJsKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnUHJlZGljdGlvbiBjdXN0b20gc2VydmVyIHVybCBpcyBub3QgZGVmaW5lZC4gUGxlYXNlIHVzZSBcImdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmxcIiBrZXkgdG8gc2V0LiAnO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmdlb0xhdExhbmdTZXJ2aWNlVXJsKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnTGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjdXN0b20gc2VydmVyIHVybCBpcyBub3QgZGVmaW5lZC4gUGxlYXNlIHVzZSBcImdlb0xhdExhbmdTZXJ2aWNlVXJsXCIga2V5IHRvIHNldC4gJztcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5nZW9Mb2NEZXRhaWxTZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdMb2NhdGlvbiBkZXRhaWwgY3VzdG9tIHNlcnZlciB1cmwgaXMgbm90IGRlZmluZWQuIFBsZWFzZSB1c2UgXCJnZW9Mb2NEZXRhaWxTZXJ2ZXJVcmxcIiBrZXkgdG8gc2V0LiAnO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSB0aGlzLnRlcm07XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBwcm9jZXNzIHRoZSBzZWFyY2ggcXVlcnkgd2hlbiBwcmVzc2VkIGVudGVyLlxuICBwcml2YXRlIHByb2Nlc3NTZWFyY2hRdWVyeSgpOiBhbnkge1xuICAgIGlmICh0aGlzLm1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFJbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Tm9kZShudWxsLCB0aGlzLnNlbGVjdGVkRGF0YUluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Tm9kZShudWxsLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBzZXQgdXNlciBzZXR0aW5ncyBpZiBpdCBpcyBhdmFpbGFibGUuXG4gIHByaXZhdGUgc2V0VXNlclNldHRpbmdzKCk6IFNldHRpbmdzIHtcbiAgICBjb25zdCBfdGVtcE9iajogYW55ID0ge307XG4gICAgaWYgKHRoaXMudXNlclNldHRpbmdzICYmIHR5cGVvZiB0aGlzLnVzZXJTZXR0aW5ncyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXModGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBrZXlzKSB7XG4gICAgICAgIF90ZW1wT2JqW3ZhbHVlXSA9IHRoaXMudXNlclNldHRpbmdzW3ZhbHVlXSAhPT0gdW5kZWZpbmVkID8gdGhpcy51c2VyU2V0dGluZ3NbdmFsdWVdIDogdGhpcy5kZWZhdWx0U2V0dGluZ3NbdmFsdWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF90ZW1wT2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZ2V0IHRoZSBhdXRvY29tcGxldGUgbGlzdCBiYXNlZCBvbiB1c2VyIGlucHV0LlxuICBwcml2YXRlIGdldExpc3RRdWVyeSh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICB0aGlzLnJlY2VudERyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgY29uc3QgX3RlbXBQYXJhbXM6IGFueSA9IHtcbiAgICAgICAgcXVlcnk6IHZhbHVlLFxuICAgICAgICBjb3VudHJ5UmVzdHJpY3Rpb246IHRoaXMuc2V0dGluZ3MuZ2VvQ291bnRyeVJlc3RyaWN0aW9uLFxuICAgICAgICBnZW9UeXBlczogdGhpcy5zZXR0aW5ncy5nZW9UeXBlcyxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbi5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgX3RlbXBQYXJhbXMuZ2VvTG9jYXRpb24gPSB0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uO1xuICAgICAgICBfdGVtcFBhcmFtcy5yYWRpdXMgPSB0aGlzLnNldHRpbmdzLmdlb1JhZGl1cztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvUHJlZGljdGlvbihfdGVtcFBhcmFtcykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0ocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFByZWRpY3Rpb25zKHRoaXMuc2V0dGluZ3MuZ2VvUHJlZGljdGlvblNlcnZlclVybCwgdmFsdWUpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHQgPSB0aGlzLmV4dHJhY3RTZXJ2ZXJMaXN0KHRoaXMuc2V0dGluZ3Muc2VydmVyUmVzcG9uc2VMaXN0SGllcmFyY2h5LCByZXN1bHQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleHRyYXRjIGN1c3RvbSBkYXRhIHdoaWNoIGlzIHNlbmQgYnkgdGhlIHNlcnZlci5cbiAgcHJpdmF0ZSBleHRyYWN0U2VydmVyTGlzdChhcnJheUxpc3Q6IGFueSwgZGF0YTogYW55KTogYW55IHtcbiAgICBpZiAoYXJyYXlMaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IF90ZW1wRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGFycmF5TGlzdCkge1xuICAgICAgICBfdGVtcERhdGEgPSBfdGVtcERhdGFba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfdGVtcERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJlZGljdGVkIGxpc3QuXG4gIHByaXZhdGUgdXBkYXRlTGlzdEl0ZW0obGlzdERhdGE6IGFueSk6IGFueSB7XG4gICAgdGhpcy5tYXRjaGVzID0gbGlzdERhdGEgPyBsaXN0RGF0YSA6IFtdO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBzaG93IHRoZSByZWNlbnQgc2VhcmNoIHJlc3VsdC5cbiAgcHJpdmF0ZSBzaG93UmVjZW50U2VhcmNoKCk6IGFueSB7XG4gICAgdGhpcy5yZWNlbnREcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXRjaGVzID0gW107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHRvIGdldCBsb2NhdGlvbiBkZXRhaWwgYmFzZWQgb24gbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZS5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50TG9jYXRpb25JbmZvKGxhdGxuZzogYW55KTogYW55IHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvTGF0TG5nRGV0YWlsKGxhdGxuZykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRMYXRMbmdEZXRhaWwodGhpcy5zZXR0aW5ncy5nZW9MYXRMYW5nU2VydmljZVVybCwgbGF0bG5nLmxhdCwgbGF0bG5nLmxuZykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZWF0TGFuZ0hpZXJhcmNoeSwgcmVzdWx0KTtcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gcmV0cml2ZSB0aGUgbG9jYXRpb24gaW5mbyBiYXNlZCBvbiBnb292bGUgcGxhY2UgaWQuXG4gIHByaXZhdGUgZ2V0UGxhY2VMb2NhdGlvbkluZm8oc2VsZWN0ZWREYXRhOiBhbnkpOiBhbnkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9QbGFjZURldGFpbChzZWxlY3RlZERhdGEucGxhY2VfaWQpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24oZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFBsYWNlRGV0YWlscyh0aGlzLnNldHRpbmdzLmdlb0xvY0RldGFpbFNlcnZlclVybCwgc2VsZWN0ZWREYXRhLnBsYWNlX2lkKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5leHRyYWN0U2VydmVyTGlzdCh0aGlzLnNldHRpbmdzLnNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5LCByZXN1bHQpO1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gc3RvcmUgdGhlIHNlbGVjdGVkIHVzZXIgc2VhcmNoIGluIHRoZSBsb2NhbHN0b3JhZ2UuXG4gIHByaXZhdGUgc2V0UmVjZW50TG9jYXRpb24oZGF0YTogYW55KTogYW55IHtcbiAgICBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgZGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb24gPyBkYXRhLmRlc2NyaXB0aW9uIDogZGF0YS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICBkYXRhLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSAtMTtcbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuYWRkUmVjZW50TGlzdCh0aGlzLnNldHRpbmdzLnJlY2VudFN0b3JhZ2VOYW1lLCBkYXRhLCB0aGlzLnNldHRpbmdzLm5vT2ZSZWNlbnRTZWFyY2hTYXZlKTtcbiAgICAgIHRoaXMuZ2V0UmVjZW50TG9jYXRpb25zKCk7XG4gICAgfVxuICAgIHRoaXMudXNlclNlbGVjdGVkT3B0aW9uID0gZGF0YTtcbiAgICAvLyBiZWxvdyBjb2RlIHdpbGwgZXhlY3V0ZSBvbmx5IHdoZW4gdXNlciBwcmVzcyBlbnRlciBvciBzZWxlY3QgYW55IG9wdGlvbiBzZWxlY3Rpb24gYW5kIGl0IGVtaXQgYSBjYWxsYmFjayB0byB0aGUgcGFyZW50IGNvbXBvbmVudC5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MucmVzT25TZWFyY2hCdXR0b25DbGlja09ubHkpIHtcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gICAgICB0aGlzLnRlcm1DaGFuZ2UuZW1pdChkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byByZXRyaXZlIHRoZSBzdG9yZWQgcmVjZW50IHVzZXIgc2VhcmNoIGZyb20gdGhlIGxvY2Fsc3RvcmFnZS5cbiAgcHJpdmF0ZSBnZXRSZWNlbnRMb2NhdGlvbnMoKTogYW55IHtcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICB0aGlzLnJlY2VudFNlYXJjaERhdGEgPSBkYXRhICYmIGRhdGEubGVuZ3RoID8gZGF0YSA6IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd25PcGVuKSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQXJyb3dVcCkge1xuICAgICAgICB0aGlzLnByZXZBY3RpdmVNYXRjaCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBLZXkuQXJyb3dEb3duKSB7XG4gICAgICAgIHRoaXMubmV4dEFjdGl2ZU1hdGNoKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5rZXkgPT09IEtleS5FbnRlcikge1xuICAgICAgICB0aGlzLnNlbGVjdE1hdGNoKHRoaXMuYWN0aXZlTWF0Y2gpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=