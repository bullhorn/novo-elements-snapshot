// NG2
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { GlobalRef } from '../../services/global/global.service';
import { GooglePlacesService } from './places.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/global/global.service";
import * as i2 from "./places.service";
import * as i3 from "../list/List";
import * as i4 from "@angular/common";
// Value accessor for the component (supports ngModel)
const PLACES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlacesListComponent),
    multi: true,
};
export class PlacesListComponent {
    constructor(platformId, _elmRef, _global, _googlePlacesService, cdr) {
        this.platformId = platformId;
        this._elmRef = _elmRef;
        this._global = _global;
        this._googlePlacesService = _googlePlacesService;
        this.cdr = cdr;
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
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
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
        this.cdr.detectChanges();
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
PlacesListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PlacesListComponent, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i1.GlobalRef }, { token: i2.GooglePlacesService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PlacesListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PlacesListComponent, selector: "google-places-list", inputs: { userSettings: "userSettings", term: "term" }, outputs: { termChange: "termChange", select: "select" }, providers: [PLACES_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0, template: `
    <novo-list direction="vertical">
      <novo-list-item *ngFor="let data of queryItems; let $index = index" (click)="selectedListNode($event, $index)">
        <item-header>
          <item-avatar icon="location"></item-avatar>
          <item-title>{{ data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description }}</item-title>
        </item-header>
        <item-content>{{ data.structured_formatting?.secondary_text }}</item-content>
      </novo-list-item>
    </novo-list>
  `, isInline: true, components: [{ type: i3.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { type: i3.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { type: i3.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { type: i3.NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: ["icon", "color"] }, { type: i3.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { type: i3.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PlacesListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'google-places-list',
                    providers: [PLACES_VALUE_ACCESSOR],
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
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i1.GlobalRef }, { type: i2.GooglePlacesService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { userSettings: [{
                type: Input
            }], term: [{
                type: Input
            }], termChange: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjL2VsZW1lbnRzL3BsYWNlcy9wbGFjZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU07QUFDTixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBMkJ2RCxzREFBc0Q7QUFDdEQsTUFBTSxxQkFBcUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBaUJGLE1BQU0sT0FBTyxtQkFBbUI7SUFtRDlCLFlBQytCLFVBQWtCLEVBQ3ZDLE9BQW1CLEVBQ25CLE9BQWtCLEVBQ2xCLG9CQUF5QyxFQUN6QyxHQUFzQjtRQUpELGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFwRGhDLFNBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsZUFB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QUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsMkVBQTJFO0lBQ25FLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUMxRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7aUhBMVZVLG1CQUFtQixrQkFvRHBCLFdBQVc7cUdBcERWLG1CQUFtQiw4SkFibkIsQ0FBQyxxQkFBcUIsQ0FBQywrQ0FDeEI7Ozs7Ozs7Ozs7R0FVVDs0RkFFVSxtQkFBbUI7a0JBZi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2lCQUNGOzBEQXFENEMsTUFBTTswQkFBOUMsTUFBTTsyQkFBQyxXQUFXOytKQWxEckIsWUFBWTtzQkFEWCxLQUFLO2dCQUdOLElBQUk7c0JBREgsS0FBSztnQkFHTixVQUFVO3NCQURULE1BQU07Z0JBR1AsTUFBTTtzQkFETCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBHbG9iYWxSZWYgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nbG9iYWwvZ2xvYmFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlUGxhY2VzU2VydmljZSB9IGZyb20gJy4vcGxhY2VzLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgZ2VvUHJlZGljdGlvblNlcnZlclVybD86IHN0cmluZztcbiAgZ2VvTGF0TGFuZ1NlcnZpY2VVcmw/OiBzdHJpbmc7XG4gIGdlb0xvY0RldGFpbFNlcnZlclVybD86IHN0cmluZztcbiAgZ2VvQ291bnRyeVJlc3RyaWN0aW9uPzogYW55O1xuICBnZW9UeXBlcz86IGFueTtcbiAgZ2VvTG9jYXRpb24/OiBhbnk7XG4gIGdlb1JhZGl1cz86IG51bWJlcjtcbiAgc2VydmVyUmVzcG9uc2VMaXN0SGllcmFyY2h5PzogYW55O1xuICBzZXJ2ZXJSZXNwb25zZWF0TGFuZ0hpZXJhcmNoeT86IGFueTtcbiAgc2VydmVyUmVzcG9uc2VEZXRhaWxIaWVyYXJjaHk/OiBhbnk7XG4gIHJlc09uU2VhcmNoQnV0dG9uQ2xpY2tPbmx5PzogYm9vbGVhbjtcbiAgdXNlR29vZ2xlR2VvQXBpPzogYm9vbGVhbjtcbiAgaW5wdXRQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIGlucHV0U3RyaW5nPzogc3RyaW5nO1xuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcbiAgc2hvd1JlY2VudFNlYXJjaD86IGJvb2xlYW47XG4gIHNob3dDdXJyZW50TG9jYXRpb24/OiBib29sZWFuO1xuICByZWNlbnRTdG9yYWdlTmFtZT86IHN0cmluZztcbiAgbm9PZlJlY2VudFNlYXJjaFNhdmU/OiBudW1iZXI7XG4gIGN1cnJlbnRMb2NJY29uVXJsPzogc3RyaW5nO1xuICBzZWFyY2hJY29uVXJsPzogc3RyaW5nO1xuICBsb2NhdGlvbkljb25Vcmw/OiBzdHJpbmc7XG59XG5cbi8vIFZhbHVlIGFjY2Vzc29yIGZvciB0aGUgY29tcG9uZW50IChzdXBwb3J0cyBuZ01vZGVsKVxuY29uc3QgUExBQ0VTX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGxhY2VzTGlzdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ29vZ2xlLXBsYWNlcy1saXN0JyxcbiAgcHJvdmlkZXJzOiBbUExBQ0VTX1ZBTFVFX0FDQ0VTU09SXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XG4gICAgICA8bm92by1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IGRhdGEgb2YgcXVlcnlJdGVtczsgbGV0ICRpbmRleCA9IGluZGV4XCIgKGNsaWNrKT1cInNlbGVjdGVkTGlzdE5vZGUoJGV2ZW50LCAkaW5kZXgpXCI+XG4gICAgICAgIDxpdGVtLWhlYWRlcj5cbiAgICAgICAgICA8aXRlbS1hdmF0YXIgaWNvbj1cImxvY2F0aW9uXCI+PC9pdGVtLWF2YXRhcj5cbiAgICAgICAgICA8aXRlbS10aXRsZT57eyBkYXRhLnN0cnVjdHVyZWRfZm9ybWF0dGluZz8ubWFpbl90ZXh0ID8gZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmcubWFpbl90ZXh0IDogZGF0YS5kZXNjcmlwdGlvbiB9fTwvaXRlbS10aXRsZT5cbiAgICAgICAgPC9pdGVtLWhlYWRlcj5cbiAgICAgICAgPGl0ZW0tY29udGVudD57eyBkYXRhLnN0cnVjdHVyZWRfZm9ybWF0dGluZz8uc2Vjb25kYXJ5X3RleHQgfX08L2l0ZW0tY29udGVudD5cbiAgICAgIDwvbm92by1saXN0LWl0ZW0+XG4gICAgPC9ub3ZvLWxpc3Q+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFBsYWNlc0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKVxuICB1c2VyU2V0dGluZ3M6IFNldHRpbmdzO1xuICBASW5wdXQoKVxuICB0ZXJtOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpXG4gIHRlcm1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKVxuICBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIGxvY2F0aW9uSW5wdXQ6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGRyb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcmVjZW50RHJvcGRvd25PcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBxdWVyeUl0ZW1zOiBhbnkgPSBbXTtcbiAgcHVibGljIGlzU2V0dGluZ3NFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2V0dGluZ3NFcnJvck1zZzogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBzZXR0aW5nczogU2V0dGluZ3MgPSB7fTtcbiAgcHJpdmF0ZSBtb2R1bGVpbml0OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0ZWREYXRhSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIHJlY2VudFNlYXJjaERhdGE6IGFueSA9IFtdO1xuICBwcml2YXRlIHVzZXJTZWxlY3RlZE9wdGlvbjogYW55ID0gJyc7XG4gIHByaXZhdGUgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncyA9IHtcbiAgICBnZW9QcmVkaWN0aW9uU2VydmVyVXJsOiAnJyxcbiAgICBnZW9MYXRMYW5nU2VydmljZVVybDogJycsXG4gICAgZ2VvTG9jRGV0YWlsU2VydmVyVXJsOiAnJyxcbiAgICBnZW9Db3VudHJ5UmVzdHJpY3Rpb246IFtdLFxuICAgIGdlb1R5cGVzOiBbXSxcbiAgICBnZW9Mb2NhdGlvbjogW10sXG4gICAgZ2VvUmFkaXVzOiAwLFxuICAgIHNlcnZlclJlc3BvbnNlTGlzdEhpZXJhcmNoeTogW10sXG4gICAgc2VydmVyUmVzcG9uc2VhdExhbmdIaWVyYXJjaHk6IFtdLFxuICAgIHNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5OiBbXSxcbiAgICByZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seTogZmFsc2UsXG4gICAgdXNlR29vZ2xlR2VvQXBpOiB0cnVlLFxuICAgIGlucHV0UGxhY2Vob2xkZXJUZXh0OiAnRW50ZXIgQXJlYSBOYW1lJyxcbiAgICBpbnB1dFN0cmluZzogJycsXG4gICAgc2hvd1NlYXJjaEJ1dHRvbjogdHJ1ZSxcbiAgICBzaG93UmVjZW50U2VhcmNoOiB0cnVlLFxuICAgIHNob3dDdXJyZW50TG9jYXRpb246IHRydWUsXG4gICAgcmVjZW50U3RvcmFnZU5hbWU6ICdyZWNlbnRTZWFyY2hlcycsXG4gICAgbm9PZlJlY2VudFNlYXJjaFNhdmU6IDUsXG4gICAgY3VycmVudExvY0ljb25Vcmw6ICcnLFxuICAgIHNlYXJjaEljb25Vcmw6ICcnLFxuICAgIGxvY2F0aW9uSWNvblVybDogJycsXG4gIH07XG5cbiAgbW9kZWw6IGFueTtcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBfZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2dsb2JhbDogR2xvYmFsUmVmLFxuICAgIHByaXZhdGUgX2dvb2dsZVBsYWNlc1NlcnZpY2U6IEdvb2dsZVBsYWNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICBpZiAoIXRoaXMubW9kdWxlaW5pdCkge1xuICAgICAgdGhpcy5tb2R1bGVJbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogYW55IHtcbiAgICB0aGlzLm1vZHVsZWluaXQgPSB0cnVlO1xuICAgIHRoaXMubW9kdWxlSW5pdCgpO1xuICAgIHRoaXMuc2VhcmNoaW5wdXRDYWxsYmFjayhudWxsKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBjbGljayBldmVudCBoYXBwZW5zIGluIGlucHV0IGJveC4gKEJpbmRlZCB3aXRoIHZpZXcpXG4gIHNlYXJjaGlucHV0Q2xpY2tDYWxsYmFjayhldmVudDogYW55KTogYW55IHtcbiAgICBldmVudC50YXJnZXQuc2VsZWN0KCk7XG4gICAgdGhpcy5zZWFyY2hpbnB1dENhbGxiYWNrKGV2ZW50KTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIGluIGlucHV0LiAoQmluZGVkIHdpdGggdmlldylcbiAgc2VhcmNoaW5wdXRDYWxsYmFjayhldmVudDogYW55KTogYW55IHtcbiAgICBjb25zdCBpbnB1dFZhbDogYW55ID0gdGhpcy5sb2NhdGlvbklucHV0O1xuICAgIGlmIChpbnB1dFZhbCkge1xuICAgICAgdGhpcy5nZXRMaXN0UXVlcnkoaW5wdXRWYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXJ5SXRlbXMgPSBbXTtcbiAgICAgIGlmICh0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbikge1xuICAgICAgICB0aGlzLnVzZXJRdWVyeVN1Ym1pdCgnZmFsc2UnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXNlclNlbGVjdGVkT3B0aW9uID0gJyc7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93UmVjZW50U2VhcmNoKSB7XG4gICAgICAgIHRoaXMuc2hvd1JlY2VudFNlYXJjaCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdXNlciBob3ZlciBvdmVyIGF1dG9jb21wbGV0ZSBsaXN0LihiaW5kZWQgd2l0aCB2aWV3KVxuICBhY3RpdmVMaXN0Tm9kZShpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5xdWVyeUl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zW2ldLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSBpbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucXVlcnlJdGVtc1tpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdXNlciBzZWxlY3QgdGhlIGF1dG9jb21wbGV0ZSBsaXN0LihiaW5kZWQgd2l0aCB2aWV3KVxuICBzZWxlY3RlZExpc3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnJlY2VudERyb3Bkb3duT3Blbikge1xuICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbih0aGlzLnF1ZXJ5SXRlbXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRQbGFjZUxvY2F0aW9uSW5mbyh0aGlzLnF1ZXJ5SXRlbXNbaW5kZXhdKTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIGxpc3Qgd2hlbiBjbGlja2VkIG91dHNpZGUuIChiaW5kZWQgd2l0aCB2aWV3KVxuICBjbG9zZUF1dG9jb21wbGV0ZShldmVudDogYW55KTogYW55IHtcbiAgICBpZiAoIXRoaXMuX2VsbVJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSAtMTtcbiAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gbWFudWFsbHkgdHJpZ2dlciB0aGUgY2FsbGJhY2sgdG8gcGFyZW50IGNvbXBvbmVudCB3aGVuIGNsaWNrZWQgc2VhcmNoIGJ1dHRvbi5cbiAgdXNlclF1ZXJ5U3VibWl0KHNlbGVjdGVkT3B0aW9uPzogYW55KTogYW55IHtcbiAgICBjb25zdCBfdXNlck9wdGlvbjogYW55ID0gc2VsZWN0ZWRPcHRpb24gPT09ICdmYWxzZScgPyAnJyA6IHRoaXMudXNlclNlbGVjdGVkT3B0aW9uO1xuICAgIGlmIChfdXNlck9wdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMuc2VsZWN0LmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGdldCB1c2VyIGN1cnJlbnQgbG9jYXRpb24gZnJvbSB0aGUgZGV2aWNlLlxuICBjdXJyZW50TG9jYXRpb25TZWxlY3RlZCgpOiBhbnkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gdHJ1ZTtcbiAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldEdlb0N1cnJlbnRMb2NhdGlvbigpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ2V0Q3VycmVudExvY2F0aW9uSW5mbyhyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBtb2R1bGUgaW5pdGlhbGl6YXRpb24gaGFwcGVucy4gZnVuY3Rpb24gY2FsbGVkIGJ5IG5nT25pbml0IGFuZCBuZ09uQ2hhbmdlXG4gIHByaXZhdGUgbW9kdWxlSW5pdCgpOiBhbnkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLnNldFVzZXJTZXR0aW5ncygpO1xuICAgIC8vIGNvbmRpdGlvbiB0byBjaGVjayBpZiBSYWRpdXMgaXMgc2V0IHdpdGhvdXQgbG9jYXRpb24gZGV0YWlsLlxuICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb1JhZGl1cykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb24ubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnUmFkaXVzIHNob3VsZCBiZSB1c2VkIHdpdGggR2VvTG9jYXRpb24uIFBsZWFzZSB1c2UgXCJnZW9Mb2NhdGlvblwiIGtleSB0byBzZXQgbGF0IGFuZCBsbmcuICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29uZGl0aW9uIHRvIGNoZWNrIGlmIGxhdCBhbmQgbG5nIGlzIHNldCBhbmQgcmFkaW91cyBpcyBub3Qgc2V0IHRoZW4gaXQgd2lsbCBzZXQgdG8gMjAsMDAwS00gYnkgZGVmYXVsdFxuICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCA9PT0gMiAmJiAhdGhpcy5zZXR0aW5ncy5nZW9SYWRpdXMpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzID0gMjAwMDAwMDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgIHRoaXMuZ2V0UmVjZW50TG9jYXRpb25zKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5nZW9QcmVkaWN0aW9uU2VydmVyVXJsKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnUHJlZGljdGlvbiBjdXN0b20gc2VydmVyIHVybCBpcyBub3QgZGVmaW5lZC4gUGxlYXNlIHVzZSBcImdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmxcIiBrZXkgdG8gc2V0LiAnO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmdlb0xhdExhbmdTZXJ2aWNlVXJsKSB7XG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cbiAgICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgKyAnTGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBjdXN0b20gc2VydmVyIHVybCBpcyBub3QgZGVmaW5lZC4gUGxlYXNlIHVzZSBcImdlb0xhdExhbmdTZXJ2aWNlVXJsXCIga2V5IHRvIHNldC4gJztcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5nZW9Mb2NEZXRhaWxTZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdMb2NhdGlvbiBkZXRhaWwgY3VzdG9tIHNlcnZlciB1cmwgaXMgbm90IGRlZmluZWQuIFBsZWFzZSB1c2UgXCJnZW9Mb2NEZXRhaWxTZXJ2ZXJVcmxcIiBrZXkgdG8gc2V0LiAnO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSB0aGlzLnRlcm07XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBwcm9jZXNzIHRoZSBzZWFyY2ggcXVlcnkgd2hlbiBwcmVzc2VkIGVudGVyLlxuICBwcml2YXRlIHByb2Nlc3NTZWFyY2hRdWVyeSgpOiBhbnkge1xuICAgIGlmICh0aGlzLnF1ZXJ5SXRlbXMubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFJbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Tm9kZShudWxsLCB0aGlzLnNlbGVjdGVkRGF0YUluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Tm9kZShudWxsLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBzZXQgdXNlciBzZXR0aW5ncyBpZiBpdCBpcyBhdmFpbGFibGUuXG4gIHByaXZhdGUgc2V0VXNlclNldHRpbmdzKCk6IFNldHRpbmdzIHtcbiAgICBjb25zdCBfdGVtcE9iajogYW55ID0ge307XG4gICAgaWYgKHRoaXMudXNlclNldHRpbmdzICYmIHR5cGVvZiB0aGlzLnVzZXJTZXR0aW5ncyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXModGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiBrZXlzKSB7XG4gICAgICAgIF90ZW1wT2JqW3ZhbHVlXSA9IHRoaXMudXNlclNldHRpbmdzW3ZhbHVlXSAhPT0gdW5kZWZpbmVkID8gdGhpcy51c2VyU2V0dGluZ3NbdmFsdWVdIDogdGhpcy5kZWZhdWx0U2V0dGluZ3NbdmFsdWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF90ZW1wT2JqO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZ2V0IHRoZSBhdXRvY29tcGxldGUgbGlzdCBiYXNlZCBvbiB1c2VyIGlucHV0LlxuICBwcml2YXRlIGdldExpc3RRdWVyeSh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICB0aGlzLnJlY2VudERyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgY29uc3QgX3RlbXBQYXJhbXM6IGFueSA9IHtcbiAgICAgICAgcXVlcnk6IHZhbHVlLFxuICAgICAgICBjb3VudHJ5UmVzdHJpY3Rpb246IHRoaXMuc2V0dGluZ3MuZ2VvQ291bnRyeVJlc3RyaWN0aW9uLFxuICAgICAgICBnZW9UeXBlczogdGhpcy5zZXR0aW5ncy5nZW9UeXBlcyxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbi5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgX3RlbXBQYXJhbXMuZ2VvTG9jYXRpb24gPSB0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uO1xuICAgICAgICBfdGVtcFBhcmFtcy5yYWRpdXMgPSB0aGlzLnNldHRpbmdzLmdlb1JhZGl1cztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvUHJlZGljdGlvbihfdGVtcFBhcmFtcykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0ocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFByZWRpY3Rpb25zKHRoaXMuc2V0dGluZ3MuZ2VvUHJlZGljdGlvblNlcnZlclVybCwgdmFsdWUpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHQgPSB0aGlzLmV4dHJhY3RTZXJ2ZXJMaXN0KHRoaXMuc2V0dGluZ3Muc2VydmVyUmVzcG9uc2VMaXN0SGllcmFyY2h5LCByZXN1bHQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RJdGVtKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleHRyYXRjIGN1c3RvbSBkYXRhIHdoaWNoIGlzIHNlbmQgYnkgdGhlIHNlcnZlci5cbiAgcHJpdmF0ZSBleHRyYWN0U2VydmVyTGlzdChhcnJheUxpc3Q6IGFueSwgZGF0YTogYW55KTogYW55IHtcbiAgICBpZiAoYXJyYXlMaXN0Lmxlbmd0aCkge1xuICAgICAgbGV0IF90ZW1wRGF0YTogYW55ID0gZGF0YTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGFycmF5TGlzdCkge1xuICAgICAgICBfdGVtcERhdGEgPSBfdGVtcERhdGFba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfdGVtcERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJlZGljdGVkIGxpc3QuXG4gIHByaXZhdGUgdXBkYXRlTGlzdEl0ZW0obGlzdERhdGE6IGFueSk6IGFueSB7XG4gICAgdGhpcy5xdWVyeUl0ZW1zID0gbGlzdERhdGEgPyBsaXN0RGF0YSA6IFtdO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBzaG93IHRoZSByZWNlbnQgc2VhcmNoIHJlc3VsdC5cbiAgcHJpdmF0ZSBzaG93UmVjZW50U2VhcmNoKCk6IGFueSB7XG4gICAgdGhpcy5yZWNlbnREcm9wZG93bk9wZW4gPSB0cnVlO1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zID0gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zID0gW107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBleGVjdXRlIHRvIGdldCBsb2NhdGlvbiBkZXRhaWwgYmFzZWQgb24gbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZS5cbiAgcHJpdmF0ZSBnZXRDdXJyZW50TG9jYXRpb25JbmZvKGxhdGxuZzogYW55KTogYW55IHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvTGF0TG5nRGV0YWlsKGxhdGxuZykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRMYXRMbmdEZXRhaWwodGhpcy5zZXR0aW5ncy5nZW9MYXRMYW5nU2VydmljZVVybCwgbGF0bG5nLmxhdCwgbGF0bG5nLmxuZykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZWF0TGFuZ0hpZXJhcmNoeSwgcmVzdWx0KTtcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gcmV0cml2ZSB0aGUgbG9jYXRpb24gaW5mbyBiYXNlZCBvbiBnb292bGUgcGxhY2UgaWQuXG4gIHByaXZhdGUgZ2V0UGxhY2VMb2NhdGlvbkluZm8oc2VsZWN0ZWREYXRhOiBhbnkpOiBhbnkge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9QbGFjZURldGFpbChzZWxlY3RlZERhdGEucGxhY2VfaWQpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24oZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFBsYWNlRGV0YWlscyh0aGlzLnNldHRpbmdzLmdlb0xvY0RldGFpbFNlcnZlclVybCwgc2VsZWN0ZWREYXRhLnBsYWNlX2lkKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5leHRyYWN0U2VydmVyTGlzdCh0aGlzLnNldHRpbmdzLnNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5LCByZXN1bHQpO1xuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gc3RvcmUgdGhlIHNlbGVjdGVkIHVzZXIgc2VhcmNoIGluIHRoZSBsb2NhbHN0b3JhZ2UuXG4gIHByaXZhdGUgc2V0UmVjZW50TG9jYXRpb24oZGF0YTogYW55KTogYW55IHtcbiAgICBkYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgZGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb24gPyBkYXRhLmRlc2NyaXB0aW9uIDogZGF0YS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICBkYXRhLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSAtMTtcbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuYWRkUmVjZW50TGlzdCh0aGlzLnNldHRpbmdzLnJlY2VudFN0b3JhZ2VOYW1lLCBkYXRhLCB0aGlzLnNldHRpbmdzLm5vT2ZSZWNlbnRTZWFyY2hTYXZlKTtcbiAgICAgIHRoaXMuZ2V0UmVjZW50TG9jYXRpb25zKCk7XG4gICAgfVxuICAgIHRoaXMudXNlclNlbGVjdGVkT3B0aW9uID0gZGF0YTtcbiAgICAvLyBiZWxvdyBjb2RlIHdpbGwgZXhlY3V0ZSBvbmx5IHdoZW4gdXNlciBwcmVzcyBlbnRlciBvciBzZWxlY3QgYW55IG9wdGlvbiBzZWxlY3Rpb24gYW5kIGl0IGVtaXQgYSBjYWxsYmFjayB0byB0aGUgcGFyZW50IGNvbXBvbmVudC5cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MucmVzT25TZWFyY2hCdXR0b25DbGlja09ubHkpIHtcbiAgICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gICAgICB0aGlzLnRlcm1DaGFuZ2UuZW1pdChkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byByZXRyaXZlIHRoZSBzdG9yZWQgcmVjZW50IHVzZXIgc2VhcmNoIGZyb20gdGhlIGxvY2Fsc3RvcmFnZS5cbiAgcHJpdmF0ZSBnZXRSZWNlbnRMb2NhdGlvbnMoKTogYW55IHtcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICB0aGlzLnJlY2VudFNlYXJjaERhdGEgPSBkYXRhICYmIGRhdGEubGVuZ3RoID8gZGF0YSA6IFtdO1xuICAgIH0pO1xuICB9XG59XG4iXX0=