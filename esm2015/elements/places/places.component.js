// NG2
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { GlobalRef } from '../../services/global/global.service';
import { GooglePlacesService } from './places.service';
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
    // //function to navigate through list when up and down keyboard key is pressed;
    // private navigateInList(keyCode: number): any {
    //     let arrayIndex: number = 0;
    //     //arrow down
    //     if (keyCode === 40) {
    //         if (this.selectedDataIndex >= 0) {
    //             arrayIndex = ((this.selectedDataIndex + 1) <= (this.queryItems.length - 1)) ? (this.selectedDataIndex + 1) : 0;
    //         }
    //         this.activeListNode(arrayIndex);
    //     } else if (keyCode === 38) {//arrow up
    //         if (this.selectedDataIndex >= 0) {
    //             arrayIndex = ((this.selectedDataIndex - 1) >= 0) ? (this.selectedDataIndex - 1) : (this.queryItems.length - 1);
    //         } else {
    //             arrayIndex = this.queryItems.length - 1;
    //         }
    //         this.activeListNode(arrayIndex);
    //     } else {
    //         this.processSearchQuery();
    //     }
    // }
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
PlacesListComponent.decorators = [
    { type: Component, args: [{
                selector: 'google-places-list',
                template: `
        <novo-list direction="vertical">
            <novo-list-item *ngFor="let data of queryItems;let $index = index" (click)="selectedListNode($event, $index)">
                <item-header>
                    <item-avatar icon="location"></item-avatar>
                    <item-title>{{data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description}}</item-title>
                </item-header>
                <item-content>{{data.structured_formatting?.secondary_text}}</item-content>
            </novo-list-item>
        </novo-list>
    `
            },] }
];
PlacesListComponent.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: GlobalRef },
    { type: GooglePlacesService }
];
PlacesListComponent.propDecorators = {
    userSettings: [{ type: Input }],
    term: [{ type: Input }],
    termChange: [{ type: Output }],
    select: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9kZXYvZGV2bWFjaGluZS9ub3ZvLWVsZW1lbnRzL3Byb2plY3RzL25vdm8tZWxlbWVudHMvc3JjLyIsInNvdXJjZXMiOlsiZWxlbWVudHMvcGxhY2VzL3BsYWNlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTTtBQUNOLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXlDdkQsTUFBTSxPQUFPLG1CQUFtQjtJQStDOUIsWUFDK0IsVUFBa0IsRUFDdkMsT0FBbUIsRUFDbkIsT0FBa0IsRUFDbEIsb0JBQXlDO1FBSHBCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUEvQ25ELFNBQUksR0FBVyxFQUFFLENBQUM7UUFFbEIsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXhELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU3QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQiwrQkFBMEIsR0FBWSxLQUFLLENBQUM7UUFDNUMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFDckIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMscUJBQWdC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RSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVQO2FBQ0o7OztZQWlENEMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7WUEzRkgsVUFBVTtZQUNyQixTQUFTO1lBQ1QsbUJBQW1COzs7MkJBMEN6QixLQUFLO21CQUVMLEtBQUs7eUJBRUwsTUFBTTtxQkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTkcyXHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdsb2JhbFJlZiB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dsb2JhbC9nbG9iYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEdvb2dsZVBsYWNlc1NlcnZpY2UgfSBmcm9tICcuL3BsYWNlcy5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xyXG4gIGdlb1ByZWRpY3Rpb25TZXJ2ZXJVcmw/OiBzdHJpbmc7XHJcbiAgZ2VvTGF0TGFuZ1NlcnZpY2VVcmw/OiBzdHJpbmc7XHJcbiAgZ2VvTG9jRGV0YWlsU2VydmVyVXJsPzogc3RyaW5nO1xyXG4gIGdlb0NvdW50cnlSZXN0cmljdGlvbj86IGFueTtcclxuICBnZW9UeXBlcz86IGFueTtcclxuICBnZW9Mb2NhdGlvbj86IGFueTtcclxuICBnZW9SYWRpdXM/OiBudW1iZXI7XHJcbiAgc2VydmVyUmVzcG9uc2VMaXN0SGllcmFyY2h5PzogYW55O1xyXG4gIHNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5PzogYW55O1xyXG4gIHNlcnZlclJlc3BvbnNlRGV0YWlsSGllcmFyY2h5PzogYW55O1xyXG4gIHJlc09uU2VhcmNoQnV0dG9uQ2xpY2tPbmx5PzogYm9vbGVhbjtcclxuICB1c2VHb29nbGVHZW9BcGk/OiBib29sZWFuO1xyXG4gIGlucHV0UGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xyXG4gIGlucHV0U3RyaW5nPzogc3RyaW5nO1xyXG4gIHNob3dTZWFyY2hCdXR0b24/OiBib29sZWFuO1xyXG4gIHNob3dSZWNlbnRTZWFyY2g/OiBib29sZWFuO1xyXG4gIHNob3dDdXJyZW50TG9jYXRpb24/OiBib29sZWFuO1xyXG4gIHJlY2VudFN0b3JhZ2VOYW1lPzogc3RyaW5nO1xyXG4gIG5vT2ZSZWNlbnRTZWFyY2hTYXZlPzogbnVtYmVyO1xyXG4gIGN1cnJlbnRMb2NJY29uVXJsPzogc3RyaW5nO1xyXG4gIHNlYXJjaEljb25Vcmw/OiBzdHJpbmc7XHJcbiAgbG9jYXRpb25JY29uVXJsPzogc3RyaW5nO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dvb2dsZS1wbGFjZXMtbGlzdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bm92by1saXN0IGRpcmVjdGlvbj1cInZlcnRpY2FsXCI+XHJcbiAgICAgICAgICAgIDxub3ZvLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgZGF0YSBvZiBxdWVyeUl0ZW1zO2xldCAkaW5kZXggPSBpbmRleFwiIChjbGljayk9XCJzZWxlY3RlZExpc3ROb2RlKCRldmVudCwgJGluZGV4KVwiPlxyXG4gICAgICAgICAgICAgICAgPGl0ZW0taGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpdGVtLWF2YXRhciBpY29uPVwibG9jYXRpb25cIj48L2l0ZW0tYXZhdGFyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpdGVtLXRpdGxlPnt7ZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/Lm1haW5fdGV4dCA/IGRhdGEuc3RydWN0dXJlZF9mb3JtYXR0aW5nLm1haW5fdGV4dCA6IGRhdGEuZGVzY3JpcHRpb259fTwvaXRlbS10aXRsZT5cclxuICAgICAgICAgICAgICAgIDwvaXRlbS1oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8aXRlbS1jb250ZW50Pnt7ZGF0YS5zdHJ1Y3R1cmVkX2Zvcm1hdHRpbmc/LnNlY29uZGFyeV90ZXh0fX08L2l0ZW0tY29udGVudD5cclxuICAgICAgICAgICAgPC9ub3ZvLWxpc3QtaXRlbT5cclxuICAgICAgICA8L25vdm8tbGlzdD5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbGFjZXNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgdXNlclNldHRpbmdzOiBTZXR0aW5ncztcclxuICBASW5wdXQoKVxyXG4gIHRlcm06IHN0cmluZyA9ICcnO1xyXG4gIEBPdXRwdXQoKVxyXG4gIHRlcm1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBwdWJsaWMgbG9jYXRpb25JbnB1dDogc3RyaW5nID0gJyc7XHJcbiAgcHVibGljIGdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGRyb3Bkb3duT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyByZWNlbnREcm9wZG93bk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgcXVlcnlJdGVtczogYW55ID0gW107XHJcbiAgcHVibGljIGlzU2V0dGluZ3NFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBzZXR0aW5nc0Vycm9yTXNnOiBzdHJpbmcgPSAnJztcclxuICBwdWJsaWMgc2V0dGluZ3M6IFNldHRpbmdzID0ge307XHJcbiAgcHJpdmF0ZSBtb2R1bGVpbml0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzZWxlY3RlZERhdGFJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgcHJpdmF0ZSByZWNlbnRTZWFyY2hEYXRhOiBhbnkgPSBbXTtcclxuICBwcml2YXRlIHVzZXJTZWxlY3RlZE9wdGlvbjogYW55ID0gJyc7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0U2V0dGluZ3M6IFNldHRpbmdzID0ge1xyXG4gICAgZ2VvUHJlZGljdGlvblNlcnZlclVybDogJycsXHJcbiAgICBnZW9MYXRMYW5nU2VydmljZVVybDogJycsXHJcbiAgICBnZW9Mb2NEZXRhaWxTZXJ2ZXJVcmw6ICcnLFxyXG4gICAgZ2VvQ291bnRyeVJlc3RyaWN0aW9uOiBbXSxcclxuICAgIGdlb1R5cGVzOiBbXSxcclxuICAgIGdlb0xvY2F0aW9uOiBbXSxcclxuICAgIGdlb1JhZGl1czogMCxcclxuICAgIHNlcnZlclJlc3BvbnNlTGlzdEhpZXJhcmNoeTogW10sXHJcbiAgICBzZXJ2ZXJSZXNwb25zZWF0TGFuZ0hpZXJhcmNoeTogW10sXHJcbiAgICBzZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeTogW10sXHJcbiAgICByZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seTogZmFsc2UsXHJcbiAgICB1c2VHb29nbGVHZW9BcGk6IHRydWUsXHJcbiAgICBpbnB1dFBsYWNlaG9sZGVyVGV4dDogJ0VudGVyIEFyZWEgTmFtZScsXHJcbiAgICBpbnB1dFN0cmluZzogJycsXHJcbiAgICBzaG93U2VhcmNoQnV0dG9uOiB0cnVlLFxyXG4gICAgc2hvd1JlY2VudFNlYXJjaDogdHJ1ZSxcclxuICAgIHNob3dDdXJyZW50TG9jYXRpb246IHRydWUsXHJcbiAgICByZWNlbnRTdG9yYWdlTmFtZTogJ3JlY2VudFNlYXJjaGVzJyxcclxuICAgIG5vT2ZSZWNlbnRTZWFyY2hTYXZlOiA1LFxyXG4gICAgY3VycmVudExvY0ljb25Vcmw6ICcnLFxyXG4gICAgc2VhcmNoSWNvblVybDogJycsXHJcbiAgICBsb2NhdGlvbkljb25Vcmw6ICcnLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIF9lbG1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9nbG9iYWw6IEdsb2JhbFJlZixcclxuICAgIHByaXZhdGUgX2dvb2dsZVBsYWNlc1NlcnZpY2U6IEdvb2dsZVBsYWNlc1NlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKTogYW55IHtcclxuICAgIGlmICghdGhpcy5tb2R1bGVpbml0KSB7XHJcbiAgICAgIHRoaXMubW9kdWxlSW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogYW55IHtcclxuICAgIHRoaXMubW9kdWxlaW5pdCA9IHRydWU7XHJcbiAgICB0aGlzLm1vZHVsZUluaXQoKTtcclxuICAgIHRoaXMuc2VhcmNoaW5wdXRDYWxsYmFjayhudWxsKTtcclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGNsaWNrIGV2ZW50IGhhcHBlbnMgaW4gaW5wdXQgYm94LiAoQmluZGVkIHdpdGggdmlldylcclxuICBzZWFyY2hpbnB1dENsaWNrQ2FsbGJhY2soZXZlbnQ6IGFueSk6IGFueSB7XHJcbiAgICBldmVudC50YXJnZXQuc2VsZWN0KCk7XHJcbiAgICB0aGlzLnNlYXJjaGlucHV0Q2FsbGJhY2soZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjaGFuZ2UgaW4gaW5wdXQuIChCaW5kZWQgd2l0aCB2aWV3KVxyXG4gIHNlYXJjaGlucHV0Q2FsbGJhY2soZXZlbnQ6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBpbnB1dFZhbDogYW55ID0gdGhpcy5sb2NhdGlvbklucHV0O1xyXG4gICAgaWYgKGlucHV0VmFsKSB7XHJcbiAgICAgIHRoaXMuZ2V0TGlzdFF1ZXJ5KGlucHV0VmFsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucXVlcnlJdGVtcyA9IFtdO1xyXG4gICAgICBpZiAodGhpcy51c2VyU2VsZWN0ZWRPcHRpb24pIHtcclxuICAgICAgICB0aGlzLnVzZXJRdWVyeVN1Ym1pdCgnZmFsc2UnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbiA9ICcnO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93UmVjZW50U2VhcmNoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVjZW50U2VhcmNoKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHVzZXIgaG92ZXIgb3ZlciBhdXRvY29tcGxldGUgbGlzdC4oYmluZGVkIHdpdGggdmlldylcclxuICBhY3RpdmVMaXN0Tm9kZShpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnF1ZXJ5SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGFJbmRleCA9IGluZGV4O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucXVlcnlJdGVtc1tpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHVzZXIgc2VsZWN0IHRoZSBhdXRvY29tcGxldGUgbGlzdC4oYmluZGVkIHdpdGggdmlldylcclxuICBzZWxlY3RlZExpc3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5yZWNlbnREcm9wZG93bk9wZW4pIHtcclxuICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbih0aGlzLnF1ZXJ5SXRlbXNbaW5kZXhdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2V0UGxhY2VMb2NhdGlvbkluZm8odGhpcy5xdWVyeUl0ZW1zW2luZGV4XSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBmdW5jdGlvbiB0byBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIGxpc3Qgd2hlbiBjbGlja2VkIG91dHNpZGUuIChiaW5kZWQgd2l0aCB2aWV3KVxyXG4gIGNsb3NlQXV0b2NvbXBsZXRlKGV2ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKCF0aGlzLl9lbG1SZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPSAtMTtcclxuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIHRvIG1hbnVhbGx5IHRyaWdnZXIgdGhlIGNhbGxiYWNrIHRvIHBhcmVudCBjb21wb25lbnQgd2hlbiBjbGlja2VkIHNlYXJjaCBidXR0b24uXHJcbiAgdXNlclF1ZXJ5U3VibWl0KHNlbGVjdGVkT3B0aW9uPzogYW55KTogYW55IHtcclxuICAgIGNvbnN0IF91c2VyT3B0aW9uOiBhbnkgPSBzZWxlY3RlZE9wdGlvbiA9PT0gJ2ZhbHNlJyA/ICcnIDogdGhpcy51c2VyU2VsZWN0ZWRPcHRpb247XHJcbiAgICBpZiAoX3VzZXJPcHRpb24pIHtcclxuICAgICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB0aGlzLnNlbGVjdC5lbWl0KGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIHRvIGdldCB1c2VyIGN1cnJlbnQgbG9jYXRpb24gZnJvbSB0aGUgZGV2aWNlLlxyXG4gIGN1cnJlbnRMb2NhdGlvblNlbGVjdGVkKCk6IGFueSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9DdXJyZW50TG9jYXRpb24oKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZ2V0Q3VycmVudExvY2F0aW9uSW5mbyhyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBtb2R1bGUgaW5pdGlhbGl6YXRpb24gaGFwcGVucy4gZnVuY3Rpb24gY2FsbGVkIGJ5IG5nT25pbml0IGFuZCBuZ09uQ2hhbmdlXHJcbiAgcHJpdmF0ZSBtb2R1bGVJbml0KCk6IGFueSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5zZXRVc2VyU2V0dGluZ3MoKTtcclxuICAgIC8vIGNvbmRpdGlvbiB0byBjaGVjayBpZiBSYWRpdXMgaXMgc2V0IHdpdGhvdXQgbG9jYXRpb24gZGV0YWlsLlxyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvUmFkaXVzKSB7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ1JhZGl1cyBzaG91bGQgYmUgdXNlZCB3aXRoIEdlb0xvY2F0aW9uLiBQbGVhc2UgdXNlIFwiZ2VvTG9jYXRpb25cIiBrZXkgdG8gc2V0IGxhdCBhbmQgbG5nLiAnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uZGl0aW9uIHRvIGNoZWNrIGlmIGxhdCBhbmQgbG5nIGlzIHNldCBhbmQgcmFkaW91cyBpcyBub3Qgc2V0IHRoZW4gaXQgd2lsbCBzZXQgdG8gMjAsMDAwS00gYnkgZGVmYXVsdFxyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2VvTG9jYXRpb24ubGVuZ3RoID09PSAyICYmICF0aGlzLnNldHRpbmdzLmdlb1JhZGl1cykge1xyXG4gICAgICB0aGlzLnNldHRpbmdzLmdlb1JhZGl1cyA9IDIwMDAwMDAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1JlY2VudFNlYXJjaCkge1xyXG4gICAgICB0aGlzLmdldFJlY2VudExvY2F0aW9ucygpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnVzZUdvb2dsZUdlb0FwaSkge1xyXG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZ2VvUHJlZGljdGlvblNlcnZlclVybCkge1xyXG4gICAgICAgIHRoaXMuaXNTZXR0aW5nc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldHRpbmdzRXJyb3JNc2cgPVxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnICsgJ1ByZWRpY3Rpb24gY3VzdG9tIHNlcnZlciB1cmwgaXMgbm90IGRlZmluZWQuIFBsZWFzZSB1c2UgXCJnZW9QcmVkaWN0aW9uU2VydmVyVXJsXCIga2V5IHRvIHNldC4gJztcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZ2VvTGF0TGFuZ1NlcnZpY2VVcmwpIHtcclxuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdMYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGN1c3RvbSBzZXJ2ZXIgdXJsIGlzIG5vdCBkZWZpbmVkLiBQbGVhc2UgdXNlIFwiZ2VvTGF0TGFuZ1NlcnZpY2VVcmxcIiBrZXkgdG8gc2V0LiAnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5nZW9Mb2NEZXRhaWxTZXJ2ZXJVcmwpIHtcclxuICAgICAgICB0aGlzLmlzU2V0dGluZ3NFcnJvciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Vycm9yTXNnID1cclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3NFcnJvck1zZyArICdMb2NhdGlvbiBkZXRhaWwgY3VzdG9tIHNlcnZlciB1cmwgaXMgbm90IGRlZmluZWQuIFBsZWFzZSB1c2UgXCJnZW9Mb2NEZXRhaWxTZXJ2ZXJVcmxcIiBrZXkgdG8gc2V0LiAnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSB0aGlzLnRlcm07XHJcbiAgfVxyXG5cclxuICAvLyBmdW5jdGlvbiB0byBwcm9jZXNzIHRoZSBzZWFyY2ggcXVlcnkgd2hlbiBwcmVzc2VkIGVudGVyLlxyXG4gIHByaXZhdGUgcHJvY2Vzc1NlYXJjaFF1ZXJ5KCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5xdWVyeUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGFJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3ROb2RlKG51bGwsIHRoaXMuc2VsZWN0ZWREYXRhSW5kZXgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Tm9kZShudWxsLCAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gdG8gc2V0IHVzZXIgc2V0dGluZ3MgaWYgaXQgaXMgYXZhaWxhYmxlLlxyXG4gIHByaXZhdGUgc2V0VXNlclNldHRpbmdzKCk6IFNldHRpbmdzIHtcclxuICAgIGNvbnN0IF90ZW1wT2JqOiBhbnkgPSB7fTtcclxuICAgIGlmICh0aGlzLnVzZXJTZXR0aW5ncyAmJiB0eXBlb2YgdGhpcy51c2VyU2V0dGluZ3MgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXModGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xyXG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGtleXMpIHtcclxuICAgICAgICBfdGVtcE9ialt2YWx1ZV0gPSB0aGlzLnVzZXJTZXR0aW5nc1t2YWx1ZV0gIT09IHVuZGVmaW5lZCA/IHRoaXMudXNlclNldHRpbmdzW3ZhbHVlXSA6IHRoaXMuZGVmYXVsdFNldHRpbmdzW3ZhbHVlXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gX3RlbXBPYmo7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2V0dGluZ3M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBmdW5jdGlvbiB0byBnZXQgdGhlIGF1dG9jb21wbGV0ZSBsaXN0IGJhc2VkIG9uIHVzZXIgaW5wdXQuXHJcbiAgcHJpdmF0ZSBnZXRMaXN0UXVlcnkodmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICB0aGlzLnJlY2VudERyb3Bkb3duT3BlbiA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlR29vZ2xlR2VvQXBpKSB7XHJcbiAgICAgIGNvbnN0IF90ZW1wUGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgICAgcXVlcnk6IHZhbHVlLFxyXG4gICAgICAgIGNvdW50cnlSZXN0cmljdGlvbjogdGhpcy5zZXR0aW5ncy5nZW9Db3VudHJ5UmVzdHJpY3Rpb24sXHJcbiAgICAgICAgZ2VvVHlwZXM6IHRoaXMuc2V0dGluZ3MuZ2VvVHlwZXMsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdlb0xvY2F0aW9uLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIF90ZW1wUGFyYW1zLmdlb0xvY2F0aW9uID0gdGhpcy5zZXR0aW5ncy5nZW9Mb2NhdGlvbjtcclxuICAgICAgICBfdGVtcFBhcmFtcy5yYWRpdXMgPSB0aGlzLnNldHRpbmdzLmdlb1JhZGl1cztcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldEdlb1ByZWRpY3Rpb24oX3RlbXBQYXJhbXMpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdEl0ZW0ocmVzdWx0KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFByZWRpY3Rpb25zKHRoaXMuc2V0dGluZ3MuZ2VvUHJlZGljdGlvblNlcnZlclVybCwgdmFsdWUpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZUxpc3RIaWVyYXJjaHksIHJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0SXRlbShyZXN1bHQpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIHRvIGV4dHJhdGMgY3VzdG9tIGRhdGEgd2hpY2ggaXMgc2VuZCBieSB0aGUgc2VydmVyLlxyXG4gIHByaXZhdGUgZXh0cmFjdFNlcnZlckxpc3QoYXJyYXlMaXN0OiBhbnksIGRhdGE6IGFueSk6IGFueSB7XHJcbiAgICBpZiAoYXJyYXlMaXN0Lmxlbmd0aCkge1xyXG4gICAgICBsZXQgX3RlbXBEYXRhOiBhbnkgPSBkYXRhO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBhcnJheUxpc3QpIHtcclxuICAgICAgICBfdGVtcERhdGEgPSBfdGVtcERhdGFba2V5XTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gX3RlbXBEYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByZWRpY3RlZCBsaXN0LlxyXG4gIHByaXZhdGUgdXBkYXRlTGlzdEl0ZW0obGlzdERhdGE6IGFueSk6IGFueSB7XHJcbiAgICB0aGlzLnF1ZXJ5SXRlbXMgPSBsaXN0RGF0YSA/IGxpc3REYXRhIDogW107XHJcbiAgICB0aGlzLmRyb3Bkb3duT3BlbiA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBmdW5jdGlvbiB0byBzaG93IHRoZSByZWNlbnQgc2VhcmNoIHJlc3VsdC5cclxuICBwcml2YXRlIHNob3dSZWNlbnRTZWFyY2goKTogYW55IHtcclxuICAgIHRoaXMucmVjZW50RHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0UmVjZW50TGlzdCh0aGlzLnNldHRpbmdzLnJlY2VudFN0b3JhZ2VOYW1lKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5xdWVyeUl0ZW1zID0gcmVzdWx0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucXVlcnlJdGVtcyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIC8vZnVuY3Rpb24gdG8gbmF2aWdhdGUgdGhyb3VnaCBsaXN0IHdoZW4gdXAgYW5kIGRvd24ga2V5Ym9hcmQga2V5IGlzIHByZXNzZWQ7XHJcbiAgLy8gcHJpdmF0ZSBuYXZpZ2F0ZUluTGlzdChrZXlDb2RlOiBudW1iZXIpOiBhbnkge1xyXG4gIC8vICAgICBsZXQgYXJyYXlJbmRleDogbnVtYmVyID0gMDtcclxuICAvLyAgICAgLy9hcnJvdyBkb3duXHJcbiAgLy8gICAgIGlmIChrZXlDb2RlID09PSA0MCkge1xyXG4gIC8vICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggPj0gMCkge1xyXG4gIC8vICAgICAgICAgICAgIGFycmF5SW5kZXggPSAoKHRoaXMuc2VsZWN0ZWREYXRhSW5kZXggKyAxKSA8PSAodGhpcy5xdWVyeUl0ZW1zLmxlbmd0aCAtIDEpKSA/ICh0aGlzLnNlbGVjdGVkRGF0YUluZGV4ICsgMSkgOiAwO1xyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgdGhpcy5hY3RpdmVMaXN0Tm9kZShhcnJheUluZGV4KTtcclxuICAvLyAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAzOCkgey8vYXJyb3cgdXBcclxuICAvLyAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID49IDApIHtcclxuICAvLyAgICAgICAgICAgICBhcnJheUluZGV4ID0gKCh0aGlzLnNlbGVjdGVkRGF0YUluZGV4IC0gMSkgPj0gMCkgPyAodGhpcy5zZWxlY3RlZERhdGFJbmRleCAtIDEpIDogKHRoaXMucXVlcnlJdGVtcy5sZW5ndGggLSAxKTtcclxuICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgLy8gICAgICAgICAgICAgYXJyYXlJbmRleCA9IHRoaXMucXVlcnlJdGVtcy5sZW5ndGggLSAxO1xyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICAgICAgdGhpcy5hY3RpdmVMaXN0Tm9kZShhcnJheUluZGV4KTtcclxuICAvLyAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFF1ZXJ5KCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgdG8gZ2V0IGxvY2F0aW9uIGRldGFpbCBiYXNlZCBvbiBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlLlxyXG4gIHByaXZhdGUgZ2V0Q3VycmVudExvY2F0aW9uSW5mbyhsYXRsbmc6IGFueSk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcclxuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9MYXRMbmdEZXRhaWwobGF0bG5nKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXR0aW5nQ3VycmVudExvY2F0aW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2dvb2dsZVBsYWNlc1NlcnZpY2UuZ2V0TGF0TG5nRGV0YWlsKHRoaXMuc2V0dGluZ3MuZ2VvTGF0TGFuZ1NlcnZpY2VVcmwsIGxhdGxuZy5sYXQsIGxhdGxuZy5sbmcpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5leHRyYWN0U2VydmVyTGlzdCh0aGlzLnNldHRpbmdzLnNlcnZlclJlc3BvbnNlYXRMYW5nSGllcmFyY2h5LCByZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy5zZXRSZWNlbnRMb2NhdGlvbihyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldHRpbmdDdXJyZW50TG9jYXRpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gdG8gcmV0cml2ZSB0aGUgbG9jYXRpb24gaW5mbyBiYXNlZCBvbiBnb292bGUgcGxhY2UgaWQuXHJcbiAgcHJpdmF0ZSBnZXRQbGFjZUxvY2F0aW9uSW5mbyhzZWxlY3RlZERhdGE6IGFueSk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VHb29nbGVHZW9BcGkpIHtcclxuICAgICAgdGhpcy5fZ29vZ2xlUGxhY2VzU2VydmljZS5nZXRHZW9QbGFjZURldGFpbChzZWxlY3RlZERhdGEucGxhY2VfaWQpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFJlY2VudExvY2F0aW9uKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFBsYWNlRGV0YWlscyh0aGlzLnNldHRpbmdzLmdlb0xvY0RldGFpbFNlcnZlclVybCwgc2VsZWN0ZWREYXRhLnBsYWNlX2lkKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZXh0cmFjdFNlcnZlckxpc3QodGhpcy5zZXR0aW5ncy5zZXJ2ZXJSZXNwb25zZURldGFpbEhpZXJhcmNoeSwgcmVzdWx0KTtcclxuICAgICAgICAgIHRoaXMuc2V0UmVjZW50TG9jYXRpb24ocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZnVuY3Rpb24gdG8gc3RvcmUgdGhlIHNlbGVjdGVkIHVzZXIgc2VhcmNoIGluIHRoZSBsb2NhbHN0b3JhZ2UuXHJcbiAgcHJpdmF0ZSBzZXRSZWNlbnRMb2NhdGlvbihkYXRhOiBhbnkpOiBhbnkge1xyXG4gICAgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgZGF0YS5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb24gPyBkYXRhLmRlc2NyaXB0aW9uIDogZGF0YS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgIGRhdGEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF0YUluZGV4ID0gLTE7XHJcbiAgICB0aGlzLmxvY2F0aW9uSW5wdXQgPSBkYXRhLmRlc2NyaXB0aW9uO1xyXG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc2hvd1JlY2VudFNlYXJjaCkge1xyXG4gICAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmFkZFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSwgZGF0YSwgdGhpcy5zZXR0aW5ncy5ub09mUmVjZW50U2VhcmNoU2F2ZSk7XHJcbiAgICAgIHRoaXMuZ2V0UmVjZW50TG9jYXRpb25zKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVzZXJTZWxlY3RlZE9wdGlvbiA9IGRhdGE7XHJcbiAgICAvLyBiZWxvdyBjb2RlIHdpbGwgZXhlY3V0ZSBvbmx5IHdoZW4gdXNlciBwcmVzcyBlbnRlciBvciBzZWxlY3QgYW55IG9wdGlvbiBzZWxlY3Rpb24gYW5kIGl0IGVtaXQgYSBjYWxsYmFjayB0byB0aGUgcGFyZW50IGNvbXBvbmVudC5cclxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5yZXNPblNlYXJjaEJ1dHRvbkNsaWNrT25seSkge1xyXG4gICAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xyXG4gICAgICB0aGlzLnRlcm1DaGFuZ2UuZW1pdChkYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGZ1bmN0aW9uIHRvIHJldHJpdmUgdGhlIHN0b3JlZCByZWNlbnQgdXNlciBzZWFyY2ggZnJvbSB0aGUgbG9jYWxzdG9yYWdlLlxyXG4gIHByaXZhdGUgZ2V0UmVjZW50TG9jYXRpb25zKCk6IGFueSB7XHJcbiAgICB0aGlzLl9nb29nbGVQbGFjZXNTZXJ2aWNlLmdldFJlY2VudExpc3QodGhpcy5zZXR0aW5ncy5yZWNlbnRTdG9yYWdlTmFtZSkudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMucmVjZW50U2VhcmNoRGF0YSA9IGRhdGEgJiYgZGF0YS5sZW5ndGggPyBkYXRhIDogW107XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19