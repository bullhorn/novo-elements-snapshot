// NG2
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { GlobalRef } from 'novo-elements/services';
import { GooglePlacesService } from './places.service';
import * as i0 from "@angular/core";
import * as i1 from "novo-elements/services";
import * as i2 from "./places.service";
import * as i3 from "novo-elements/components/card";
import * as i4 from "novo-elements/common";
import * as i5 from "novo-elements/components/icon";
import * as i6 from "novo-elements/components/flex";
import * as i7 from "@angular/common";
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
PlacesListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PlacesListComponent, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i1.GlobalRef }, { token: i2.GooglePlacesService }], target: i0.ɵɵFactoryTarget.Component });
PlacesListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: PlacesListComponent, selector: "google-places-list", inputs: { userSettings: "userSettings", term: "term" }, outputs: { termChange: "termChange", select: "select" }, usesOnChanges: true, ngImport: i0, template: `
    <novo-card>
      <novo-optgroup>
        <novo-option *ngFor="let data of queryItems; let $index = index" (click)="selectedListNode($event, $index)">
          <novo-icon novoPrefix>location</novo-icon>
          <novo-stack>
            <novo-text bold>{{
              data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description
            }}</novo-text>
            <novo-text>{{ data.structured_formatting?.secondary_text }}</novo-text>
          </novo-stack>
        </novo-option>
      </novo-optgroup>
    </novo-card>
  `, isInline: true, styles: [":host ::ng-deep novo-list{border:1px solid #4a89dc}:host ::ng-deep novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host ::ng-deep novo-list novo-list-item>div{width:100%}:host ::ng-deep novo-list novo-list-item.active{background-color:var(--color-selection-overlay)}:host ::ng-deep novo-list novo-list-item:hover{background-color:var(--color-selection-overlay)}:host ::ng-deep novo-list novo-list-item item-content{flex-flow:row wrap}:host ::ng-deep novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}\n"], components: [{ type: i3.CardElement, selector: "novo-card", inputs: ["padding", "config", "title", "message", "messageIcon", "icon", "iconTooltip", "refresh", "close", "move", "loading", "inline", "inset"], outputs: ["onClose", "onRefresh"] }, { type: i4.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { type: i4.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { type: i5.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { type: i6.NovoStackElement, selector: "novo-stack,novo-column", inputs: ["direction", "align"] }, { type: i4.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }], directives: [{ type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: PlacesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'google-places-list', template: `
    <novo-card>
      <novo-optgroup>
        <novo-option *ngFor="let data of queryItems; let $index = index" (click)="selectedListNode($event, $index)">
          <novo-icon novoPrefix>location</novo-icon>
          <novo-stack>
            <novo-text bold>{{
              data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description
            }}</novo-text>
            <novo-text>{{ data.structured_formatting?.secondary_text }}</novo-text>
          </novo-stack>
        </novo-option>
      </novo-optgroup>
    </novo-card>
  `, styles: [":host ::ng-deep novo-list{border:1px solid #4a89dc}:host ::ng-deep novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host ::ng-deep novo-list novo-list-item>div{width:100%}:host ::ng-deep novo-list novo-list-item.active{background-color:var(--color-selection-overlay)}:host ::ng-deep novo-list novo-list-item:hover{background-color:var(--color-selection-overlay)}:host ::ng-deep novo-list novo-list-item item-content{flex-flow:row wrap}:host ::ng-deep novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}\n"] }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i1.GlobalRef }, { type: i2.GooglePlacesService }]; }, propDecorators: { userSettings: [{
                type: Input
            }], term: [{
                type: Input
            }], termChange: [{
                type: Output
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2VsZW1lbnRzL2NvbXBvbmVudHMvcGxhY2VzL3BsYWNlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O0FBOEN2RCxNQUFNLE9BQU8sbUJBQW1CO0lBK0M5QixZQUMrQixVQUFrQixFQUN2QyxPQUFtQixFQUNuQixPQUFrQixFQUNsQixvQkFBeUM7UUFIcEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQS9DbkQsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFeEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTdDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLCtCQUEwQixHQUFZLEtBQUssQ0FBQztRQUM1QyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDcEMsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBVyxFQUFFLENBQUM7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IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2xvYmFsUmVmIH0gZnJvbSAnbm92by1lbGVtZW50cy9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZXMuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xuICBnZW9QcmVkaWN0aW9uU2VydmVyVXJsPzogc3RyaW5nO1xuICBnZW9MYXRMYW5nU2VydmljZVVybD86IHN0cmluZztcbiAgZ2VvTG9jRGV0YWlsU2VydmVyVXJsPzogc3RyaW5nO1xuICBnZW9Db3VudHJ5UmVzdHJpY3Rpb24/OiBhbnk7XG4gIGdlb1R5cGVzPzogYW55O1xuICBnZW9Mb2NhdGlvbj86IGFueTtcbiAgZ2VvUmFkaXVzPzogbnVtYmVyO1xuICBzZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHk/OiBhbnk7XG4gIHNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5PzogYW55O1xuICBzZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeT86IGFueTtcbiAgcmVzT25TZWFyY2hCdXR0b25DbGlja09ubHk/OiBib29sZWFuO1xuICB1c2VHb29nbGVHZW9BcGk/OiBib29sZWFuO1xuICBpbnB1dFBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgaW5wdXRTdHJpbmc/OiBzdHJpbmc7XG4gIHNob3dTZWFyY2hCdXR0b24/OiBib29sZWFuO1xuICBzaG93UmVjZW50U2VhcmNoPzogYm9vbGVhbjtcbiAgc2hvd0N1cnJlbnRMb2NhdGlvbj86IGJvb2xlYW47XG4gIHJlY2VudFN0b3JhZ2VOYW1lPzogc3RyaW5nO1xuICBub09mUmVjZW50U2VhcmNoU2F2ZT86IG51bWJlcjtcbiAgY3VycmVudExvY0ljb25Vcmw/OiBzdHJpbmc7XG4gIHNlYXJjaEljb25Vcmw/OiBzdHJpbmc7XG4gIGxvY2F0aW9uSWNvblVybD86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ29vZ2xlLXBsYWNlcy1saXN0JyxcbiAgc3R5bGVVcmxzOiBbJy4vcGxhY2VzLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5vdm8tY2FyZD5cbiAgICAgIDxub3ZvLW9wdGdyb3VwPlxuICAgICAgICA8bm92by1vcHRpb24gKm5nRm9yPVwibGV0IGRhdGEgb2YgcXVlcnlJdGVtczsgbGV0ICRpbmRleCA9IGluZGV4XCIgKGNsaWNrKT1cInNlbGVjdGVkTGlzdE5vZGUoJGV2ZW50LCAkaW5kZXgpXCI+XG4gICAgICAgICAgPG5vdm8taWNvbiBub3ZvUHJlZml4PmxvY2F0aW9uPC9ub3ZvLWljb24+XG4gICAgICAgICAgPG5vdm8tc3RhY2s+XG4gICAgICAgICAgICA8bm92by10ZXh0IGJvbGQ+e3tcbiAgICAgICAgICAgICAgZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/Lm1haW5fdGV4dCA/IGRhdGEuc3RydWN0dXJlZF9mb3JtYXR0aW5nLm1haW5fdGV4dCA6IGRhdGEuZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH19PC9ub3ZvLXRleHQ+XG4gICAgICAgICAgICA8bm92by10ZXh0Pnt7IGRhdGEuc3RydWN0dXJlZF9mb3JtYXR0aW5nPy5zZWNvbmRhcnlfdGV4dCB9fTwvbm92by10ZXh0PlxuICAgICAgICAgIDwvbm92by1zdGFjaz5cbiAgICAgICAgPC9ub3ZvLW9wdGlvbj5cbiAgICAgIDwvbm92by1vcHRncm91cD5cbiAgICA8L25vdm8tY2FyZD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VzTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgdXNlclNldHRpbmdzOiBTZXR0aW5ncztcbiAgQElucHV0KClcbiAgdGVybTogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKVxuICB0ZXJtQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KClcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHB1YmxpYyBsb2NhdGlvbklucHV0OiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBkcm9wZG93bk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHJlY2VudERyb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcXVlcnlJdGVtczogYW55ID0gW107XG4gIHB1YmxpYyBpc1NldHRpbmdzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNldHRpbmdzRXJyb3JNc2c6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgc2V0dGluZ3M6IFNldHRpbmdzID0ge307XG4gIHByaXZhdGUgbW9kdWxlaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkRGF0YUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSByZWNlbnRTZWFyY2hEYXRhOiBhbnkgPSBbXTtcbiAgcHJpdmF0ZSB1c2VyU2VsZWN0ZWRPcHRpb246IGFueSA9ICcnO1xuICBwcml2YXRlIGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gICAgZ2VvUHJlZGljdGlvblNlcnZlclVybDogJycsXG4gICAgZ2VvTGF0TGFuZ1NlcnZpY2VVcmw6ICcnLFxuICAgIGdlb0xvY0RldGFpbFNlcnZlclVybDogJycsXG4gICAgZ2VvQ291bnRyeVJlc3RyaWN0aW9uOiBbXSxcbiAgICBnZW9UeXBlczogW10sXG4gICAgZ2VvTG9jYXRpb246IFtdLFxuICAgIGdlb1JhZGl1czogMCxcbiAgICBzZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHk6IFtdLFxuICAgIHNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5OiBbXSxcbiAgICBzZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeTogW10sXG4gICAgcmVzT25TZWFyY2hCdXR0b25DbGlja09ubHk6IGZhbHNlLFxuICAgIHVzZUdvb2dsZUdlb0FwaTogdHJ1ZSxcbiAgICBpbnB1dFBsYWNlaG9sZGVyVGV4dDogJ0VudGVyIEFyZWEgTmFtZScsXG4gICAgaW5wdXRTdHJpbmc6ICcnLFxuICAgIHNob3dTZWFyY2hCdXR0b246IHRydWUsXG4gICAgc2hvd1JlY2VudFNlYXJjaDogdHJ1ZSxcbiAgICBzaG93Q3VycmVudExvY2F0aW9uOiB0cnVlLFxuICAgIHJlY2VudFN0b3JhZ2VOYW1lOiAncmVjZW50U2VhcmNoZXMnLFxuICAgIG5vT2ZSZWNlbnRTZWFyY2hTYXZlOiA1LFxuICAgIGN1cnJlbnRMb2NJY29uVXJsOiAnJyxcbiAgICBzZWFyY2hJY29uVXJsOiAnJyxcbiAgICBsb2NhdGlvbkljb25Vcmw6ICcnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgX2VsbVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9nbG9iYWw6IEdsb2JhbFJlZixcbiAgICBwcml2YXRlIF9nb29nbGVQbGFjZXNTZXJ2aWNlOiBHb29nbGVQbGFjZXNTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICBpZiAoIXRoaXMubW9kdWxlaW5pdCkge1xuICAgICAgdGhpcy5tb2R1bGVJbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogYW55IHtcbiAgICB0aGlzLm1vZHVsZWluaXQgPSB0cnVlO1xuICAgIHRoaXMubW9kdWxlSW5pdCgpO1xuICAgIHRoaXMuc2VhcmNoaW5wdXRDYWxsYmFjayhudWxsKTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGNsaWNrIGV2ZW50IGhhcHBlbnMgaW4gaW5wdXQgYm94LiAoQmluZGVkIHdpdGggdmlldylcbiAgc2VhcmNoaW5wdXRDbGlja0NhbGxiYWNrKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGV2ZW50LnRhcmdldC5zZWxlY3QoKTtcbiAgICB0aGlzLnNlYXJjaGlucHV0Q2FsbGJhY2soZXZlbnQpO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjaGFuZ2UgaW4gaW5wdXQuIChCaW5kZWQgd2l0aCB2aWV3KVxuICBzZWFyY2hpbnB1dENhbGxiYWNrKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGlucHV0VmFsOiBhbnkgPSB0aGlzLmxvY2F0aW9uSW5wdXQ7XG4gICAgaWYgKGlucHV0VmFsKSB7XG4gICAgICB0aGlzLmdldExpc3RRdWVyeShpbnB1dFZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVlcnlJdGVtcyA9IFtdO1xuICAgICAgaWYgKHRoaXMudXNlclNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgIHRoaXMudXNlclF1ZXJ5U3VibWl0KCdmYWxzZScpO1xuICAgICAgfVxuICAgICAgdGhpcy51c2VyU2VsZWN0ZWRPcHRpb24gPSAnJztcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dSZWNlbnRTZWFyY2gpIHtcbiAgICAgICAgdGhpcy5zaG93UmVjZW50U2VhcmNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB1c2VyIGhvdmVyIG92ZXIgYXV0b2NvbXBsZXRlIGxpc3QuKGJpbmRlZCB3aXRoIHZpZXcpXG4gIGFjdGl2ZUxpc3ROb2RlKGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnF1ZXJ5SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICB0aGlzLnF1ZXJ5SXRlbXNbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGFJbmRleCA9IGluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB1c2VyIHNlbGVjdCB0aGUgYXV0b2NvbXBsZXRlIGxpc3QuKGJpbmRlZCB3aXRoIHZpZXcpXG4gIHNlbGVjdGVkTGlzdE5vZGUoZXZlbnQ6IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMucmVjZW50RHJvcGRvd25PcGVuKSB7XG4gICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKHRoaXMucXVlcnlJdGVtc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldFBsYWNlTG9jYXRpb25JbmZvKHRoaXMucXVlcnlJdGVtc1tpbmRleF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGNsb3NlIHRoZSBhdXRvY29tcGxldGUgbGlzdCB3aGVuIGNsaWNrZWQgb3V0c2lkZS4gKGJpbmRlZCB3aXRoIHZpZXcpXG4gIGNsb3NlQXV0b2NvbXBsZXRlKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGlmICghdGhpcy5fZWxtUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGFJbmRleCA9IC0xO1xuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBtYW51YWxseSB0cmlnZ2VyIHRoZSBjYWxsYmFjayB0byBwYXJlbnQgY29tcG9uZW50IHdoZW4gY2xpY2tlZCBzZWFyY2ggYnV0dG9uLlxuICB1c2VyUXVlcnlTdWJtaXQoc2VsZWN0ZWRPcHRpb24/OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IF91c2VyT3B0aW9uOiBhbnkgPSBzZWxlY3RlZE9wdGlvbiA9PT0gJ2ZhbHNlJyA/ICcnIDogdGhpcy51c2VyU2VsZWN0ZWRPcHRpb247XG4gICAgaWYgKF91c2VyT3B0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMudXNlclNlbGVjdGVkT3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5zZWxlY3QuZW1pdChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZ2V0IHVzZXIgY3VycmVudCBsb2NhdGlvbiBmcm9tIHRoZSBkZXZpY2UuXG4gIGN1cnJlbnRMb2NhdGlvblNlbGVjdGVkKCk6IGFueSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWcgPSB0cnVlO1xuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvQ3VycmVudExvY2F0aW9uKCkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5nZXRDdXJyZW50TG9jYXRpb25JbmZvKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG1vZHVsZSBpbml0aWFsaXphdGlvbiBoYXBwZW5zLiBmdW5jdGlvbiBjYWxsZWQgYnkgbmdPbmluaXQgYW5kIG5nT25DaGFuZ2VcbiAgcHJpdmF0ZSBtb2R1bGVJbml0KCk6IGFueSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuc2V0VXNlclNldHRpbmdzKCk7XG4gICAgLy8gY29uZGl0aW9uIHRvIGNoZWNrIGlmIFJhZGl1cyBpcyBzZXQgd2l0aG91dCBsb2NhdGlvbiBkZXRhaWwuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbi5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdSYWRpdXMgc2hvdWxkIGJlIHVzZWQgd2l0aCBHZW9Mb2NhdGlvbi4gUGxlYXNlIHVzZSBcImdlb0xvY2F0aW9uXCIga2V5IHRvIHNldCBsYXQgYW5kIGxuZy4gJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb25kaXRpb24gdG8gY2hlY2sgaWYgbGF0IGFuZCBsbmcgaXMgc2V0IGFuZCByYWRpb3VzIGlzIG5vdCBzZXQgdGhlbiBpdCB3aWxsIHNldCB0byAyMCwwMDBLTSBieSBkZWZhdWx0XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb24ubGVuZ3RoID09PSAyICYmICF0aGlzLnNldHRpbmdzLmdlb1JhZGl1cykge1xuICAgICAgdGhpcy5zZXR0aW5ncy5nZW9SYWRpdXMgPSAyMDAwMDAwMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1JlY2VudFNlYXJjaCkge1xuICAgICAgdGhpcy5nZXRSZWNlbnRMb2NhdGlvbnMoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdQcmVkaWN0aW9uIGN1c3RvbSBzZXJ2ZXIgdXJsIGlzIG5vdCBkZWZpbmVkLiBQbGVhc2UgdXNlIFwiZ2VvUHJlZGljdGlvblNlcnZlclVybFwiIGtleSB0byBzZXQuICc7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZ2VvTGF0TGFuZ1NlcnZpY2VVcmwpIHtcbiAgICAgICAgdGhpcy5pc1NldHRpbmdzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdMYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGN1c3RvbSBzZXJ2ZXIgdXJsIGlzIG5vdCBkZWZpbmVkLiBQbGVhc2UgdXNlIFwiZ2VvTGF0TGFuZ1NlcnZpY2VVcmxcIiBrZXkgdG8gc2V0LiAnO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmdlb0xvY0RldGFpbFNlcnZlclVybCkge1xuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyA9XG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ0xvY2F0aW9uIGRldGFpbCBjdXN0b20gc2VydmVyIHVybCBpcyBub3QgZGVmaW5lZC4gUGxlYXNlIHVzZSBcImdlb0xvY0RldGFpbFNlcnZlclVybFwiIGtleSB0byBzZXQuICc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubG9jYXRpb25JbnB1dCA9IHRoaXMudGVybTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHByb2Nlc3MgdGhlIHNlYXJjaCBxdWVyeSB3aGVuIHByZXNzZWQgZW50ZXIuXG4gIHByaXZhdGUgcHJvY2Vzc1NlYXJjaFF1ZXJ5KCk6IGFueSB7XG4gICAgaWYgKHRoaXMucXVlcnlJdGVtcy5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3ROb2RlKG51bGwsIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3ROb2RlKG51bGwsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHNldCB1c2VyIHNldHRpbmdzIGlmIGl0IGlzIGF2YWlsYWJsZS5cbiAgcHJpdmF0ZSBzZXRVc2VyU2V0dGluZ3MoKTogU2V0dGluZ3Mge1xuICAgIGNvbnN0IF90ZW1wT2JqOiBhbnkgPSB7fTtcbiAgICBpZiAodGhpcy51c2VyU2V0dGluZ3MgJiYgdHlwZW9mIHRoaXMudXNlclNldHRpbmdzID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyh0aGlzLmRlZmF1bHRTZXR0aW5ncyk7XG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGtleXMpIHtcbiAgICAgICAgX3RlbXBPYmpbdmFsdWVdID0gdGhpcy51c2VyU2V0dGluZ3NbdmFsdWVdICE9PSB1bmRlZmluZWQgPyB0aGlzLnVzZXJTZXR0aW5nc1t2YWx1ZV0gOiB0aGlzLmRlZmF1bHRTZXR0aW5nc1t2YWx1ZV07XG4gICAgICB9XG4gICAgICByZXR1cm4gX3RlbXBPYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRTZXR0aW5ncztcbiAgICB9XG4gIH1cblxuICAvLyBmdW5jdGlvbiB0byBnZXQgdGhlIGF1dG9jb21wbGV0ZSBsaXN0IGJhc2VkIG9uIHVzZXIgaW5wdXQuXG4gIHByaXZhdGUgZ2V0TGlzdFF1ZXJ5KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHRoaXMucmVjZW50RHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlR29vZ2xlR2VvQXBpKSB7XG4gICAgICBjb25zdCBfdGVtcFBhcmFtczogYW55ID0ge1xuICAgICAgICBxdWVyeTogdmFsdWUsXG4gICAgICAgIGNvdW50cnlSZXN0cmljdGlvbjogdGhpcy5zZXR0aW5ncy5nZW9Db3VudHJ5UmVzdHJpY3Rpb24sXG4gICAgICAgIGdlb1R5cGVzOiB0aGlzLnNldHRpbmdzLmdlb1R5cGVzLFxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBfdGVtcFBhcmFtcy5nZW9Mb2NhdGlvbiA9IHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb247XG4gICAgICAgIF90ZW1wUGFyYW1zLnJhZGl1cyA9IHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzO1xuICAgICAgfVxuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9QcmVkaWN0aW9uKF90ZW1wUGFyYW1zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0UHJlZGljdGlvbnModGhpcy5zZXR0aW5ncy5nZW9QcmVkaWN0aW9uU2VydmVyVXJsLCB2YWx1ZSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHksIHJlc3VsdCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0ocmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGV4dHJhdGMgY3VzdG9tIGRhdGEgd2hpY2ggaXMgc2VuZCBieSB0aGUgc2VydmVyLlxuICBwcml2YXRlIGV4dHJhY3RTZXJ2ZXJMaXN0KGFycmF5TGlzdDogYW55LCBkYXRhOiBhbnkpOiBhbnkge1xuICAgIGlmIChhcnJheUxpc3QubGVuZ3RoKSB7XG4gICAgICBsZXQgX3RlbXBEYXRhOiBhbnkgPSBkYXRhO1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgYXJyYXlMaXN0KSB7XG4gICAgICAgIF90ZW1wRGF0YSA9IF90ZW1wRGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF90ZW1wRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcmVkaWN0ZWQgbGlzdC5cbiAgcHJpdmF0ZSB1cGRhdGVMaXN0SXRlbShsaXN0RGF0YTogYW55KTogYW55IHtcbiAgICB0aGlzLnF1ZXJ5SXRlbXMgPSBsaXN0RGF0YSA/IGxpc3REYXRhIDogW107XG4gICAgdGhpcy5kcm9wZG93bk9wZW4gPSB0cnVlO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gc2hvdyB0aGUgcmVjZW50IHNlYXJjaCByZXN1bHQuXG4gIHByaXZhdGUgc2hvd1JlY2VudFNlYXJjaCgpOiBhbnkge1xuICAgIHRoaXMucmVjZW50RHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWU7XG4gICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRSZWNlbnRMaXN0KHRoaXMuc2V0dGluZ3MucmVjZW50U3RvcmFnZU5hbWUpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMucXVlcnlJdGVtcyA9IHJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucXVlcnlJdGVtcyA9IFtdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB0byBnZXQgbG9jYXRpb24gZGV0YWlsIGJhc2VkIG9uIGxhdGl0dWRlIGFuZCBsb25naXR1ZGUuXG4gIHByaXZhdGUgZ2V0Q3VycmVudExvY2F0aW9uSW5mbyhsYXRsbmc6IGFueSk6IGFueSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlR29vZ2xlR2VvQXBpKSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldEdlb0xhdExuZ0RldGFpbChsYXRsbmcpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0TGF0TG5nRGV0YWlsKHRoaXMuc2V0dGluZ3MuZ2VvTGF0TGFuZ1NlcnZpY2VVcmwsIGxhdGxuZy5sYXQsIGxhdGxuZy5sbmcpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmV4dHJhY3RTZXJ2ZXJMaXN0KHRoaXMuc2V0dGluZ3Muc2VydmVyUmVzcG9uc2VhdExhbmdIaWVyYXJjaHksIHJlc3VsdCk7XG4gICAgICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0dGluZ0N1cnJlbnRMb2NhdGlvbkZsYWcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHJldHJpdmUgdGhlIGxvY2F0aW9uIGluZm8gYmFzZWQgb24gZ29vdmxlIHBsYWNlIGlkLlxuICBwcml2YXRlIGdldFBsYWNlTG9jYXRpb25JbmZvKHNlbGVjdGVkRGF0YTogYW55KTogYW55IHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0R2VvUGxhY2VEZXRhaWwoc2VsZWN0ZWREYXRhLnBsYWNlX2lkKS50aGVuKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRQbGFjZURldGFpbHModGhpcy5zZXR0aW5ncy5nZW9Mb2NEZXRhaWxTZXJ2ZXJVcmwsIHNlbGVjdGVkRGF0YS5wbGFjZV9pZCkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeSwgcmVzdWx0KTtcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIHN0b3JlIHRoZSBzZWxlY3RlZCB1c2VyIHNlYXJjaCBpbiB0aGUgbG9jYWxzdG9yYWdlLlxuICBwcml2YXRlIHNldFJlY2VudExvY2F0aW9uKGRhdGE6IGFueSk6IGFueSB7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIGRhdGEuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uID8gZGF0YS5kZXNjcmlwdGlvbiA6IGRhdGEuZm9ybWF0dGVkX2FkZHJlc3M7XG4gICAgZGF0YS5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID0gLTE7XG4gICAgdGhpcy5sb2NhdGlvbklucHV0ID0gZGF0YS5kZXNjcmlwdGlvbjtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93UmVjZW50U2VhcmNoKSB7XG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmFkZFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSwgZGF0YSwgdGhpcy5zZXR0aW5ncy5ub09mUmVjZW50U2VhcmNoU2F2ZSk7XG4gICAgICB0aGlzLmdldFJlY2VudExvY2F0aW9ucygpO1xuICAgIH1cbiAgICB0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbiA9IGRhdGE7XG4gICAgLy8gYmVsb3cgY29kZSB3aWxsIGV4ZWN1dGUgb25seSB3aGVuIHVzZXIgcHJlc3MgZW50ZXIgb3Igc2VsZWN0IGFueSBvcHRpb24gc2VsZWN0aW9uIGFuZCBpdCBlbWl0IGEgY2FsbGJhY2sgdG8gdGhlIHBhcmVudCBjb21wb25lbnQuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnJlc09uU2VhcmNoQnV0dG9uQ2xpY2tPbmx5KSB7XG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICAgICAgdGhpcy50ZXJtQ2hhbmdlLmVtaXQoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdG8gcmV0cml2ZSB0aGUgc3RvcmVkIHJlY2VudCB1c2VyIHNlYXJjaCBmcm9tIHRoZSBsb2NhbHN0b3JhZ2UuXG4gIHByaXZhdGUgZ2V0UmVjZW50TG9jYXRpb25zKCk6IGFueSB7XG4gICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRSZWNlbnRMaXN0KHRoaXMuc2V0dGluZ3MucmVjZW50U3RvcmFnZU5hbWUpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5yZWNlbnRTZWFyY2hEYXRhID0gZGF0YSAmJiBkYXRhLmxlbmd0aCA/IGRhdGEgOiBbXTtcbiAgICB9KTtcbiAgfVxufVxuIl19