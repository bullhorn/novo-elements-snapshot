import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GlobalRef, LocalStorageService } from 'novo-elements/services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "novo-elements/services";
export class GooglePlacesService {
    constructor(_http, platformId, _global, _localStorageService) {
        this._http = _http;
        this.platformId = platformId;
        this._global = _global;
        this._localStorageService = _localStorageService;
    }
    getPredictions(url, query) {
        return new Promise((resolve) => {
            this._http.get(url + '?query=' + query).subscribe((data) => {
                if (data) {
                    resolve(data);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    getLatLngDetail(url, lat, lng) {
        return new Promise((resolve) => {
            this._http.get(url + '?lat=' + lat + '&lng=' + lng).subscribe((data) => {
                if (data) {
                    resolve(data);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    getPlaceDetails(url, placeId) {
        return new Promise((resolve) => {
            this._http.get(url + '?query=' + placeId).subscribe((data) => {
                if (data) {
                    resolve(data);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    getGeoCurrentLocation() {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                if (_window.navigator.geolocation) {
                    _window.navigator.geolocation.getCurrentPosition((pos) => {
                        const latlng = { lat: parseFloat(pos.coords.latitude + ''), lng: parseFloat(pos.coords.longitude + '') };
                        resolve(latlng);
                    });
                }
                else {
                    resolve(false);
                }
            }
            else {
                resolve(false);
            }
        });
    }
    getGeoLatLngDetail(latlng) {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const geocoder = new _window.google.maps.Geocoder();
                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === 'OK') {
                        this.getGeoPlaceDetail(results[0].place_id).then((result) => {
                            if (result) {
                                resolve(result);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    }
    getGeoPrediction(params) {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.AutocompleteService();
                let queryInput = {};
                const promiseArr = [];
                if (params.countryRestriction.length) {
                    queryInput = {
                        input: params.query,
                        componentRestrictions: { country: params.countryRestriction },
                    };
                }
                else {
                    queryInput = {
                        input: params.query,
                    };
                }
                if (params.geoLocation) {
                    queryInput.location = new _window.google.maps.LatLng(parseFloat(params.geoLocation[0]), parseFloat(params.geoLocation[1]));
                    queryInput.radius = params.radius;
                }
                if (params.geoTypes.length) {
                    for (let i = 0; i < params.geoTypes.length; i++) {
                        const _tempQuery = queryInput;
                        _tempQuery.types = new Array(params.geoTypes[i]);
                        promiseArr.push(this.geoPredictionCall(placesService, _tempQuery));
                    }
                }
                else {
                    promiseArr.push(this.geoPredictionCall(placesService, queryInput));
                }
                Promise.all(promiseArr).then((values) => {
                    const val = values;
                    if (val.length > 1) {
                        let _tempArr = [];
                        for (let j = 0; j < val.length; j++) {
                            if (val[j] && val[j].length) {
                                _tempArr = _tempArr.concat(val[j]);
                            }
                        }
                        _tempArr = this.getUniqueResults(_tempArr);
                        resolve(_tempArr);
                    }
                    else {
                        resolve(values[0]);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    }
    async getGeoPlaceDetail(placeId) {
        const placeDetail = await new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.PlacesService(document.createElement('div'));
                placesService.getDetails({ placeId }, (result) => {
                    if (result === null || result.length === 0) {
                        this.getGeoPaceDetailByReferance(result.referance).then((referanceData) => {
                            if (!referanceData) {
                                resolve(false);
                            }
                            else {
                                resolve(referanceData);
                            }
                        });
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
        if (placeDetail?.types?.includes('locality')) {
            placeDetail.postal_codes = await this.getPostalCodes(placeDetail);
        }
        return placeDetail;
    }
    getGeoPaceDetailByReferance(referance) {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.PlacesService();
                placesService.getDetails({ reference: referance }, (result, status) => {
                    if (status === _window.google.maps.places.PlacesServiceStatus.OK) {
                        resolve(result);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    }
    addRecentList(localStorageName, result, itemSavedLength) {
        this.getRecentList(localStorageName).then((data) => {
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].description === result.description) {
                        data.splice(i, 1);
                        break;
                    }
                }
                data.unshift(result);
                if (data.length > itemSavedLength) {
                    data.pop();
                }
                this._localStorageService.setItem(localStorageName, JSON.stringify(data));
            }
        });
    }
    getRecentList(localStorageName) {
        return new Promise((resolve) => {
            let value = this._localStorageService.getItem(localStorageName);
            if (value) {
                value = JSON.parse(value);
            }
            else {
                value = [];
            }
            resolve(value);
        });
    }
    getPostalCodes(placeDetail) {
        const _window = this._global.nativeGlobal;
        const geocoder = new _window.google.maps.Geocoder();
        return new Promise((resolve) => {
            geocoder.geocode({ location: placeDetail.geometry.location }, (results, status) => {
                if (status === 'OK' && results.length) {
                    resolve(results.reduce((postalCodes, result) => {
                        const postalCodeComponent = result.address_components.find(item => item.types.includes('postal_code'));
                        if (postalCodeComponent && !postalCodes.includes(postalCodeComponent.long_name)) {
                            postalCodes.push(postalCodeComponent.long_name);
                        }
                        return postalCodes;
                    }, []));
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    getUniqueResults(arr) {
        return Array.from(arr.reduce((m, t) => m.set(t.place_id, t), new Map()).values());
    }
    geoPredictionCall(placesService, queryInput) {
        const _window = this._global.nativeGlobal;
        return new Promise((resolve) => {
            placesService.getPlacePredictions(queryInput, (result, status) => {
                if (status === _window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(result);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GooglePlacesService, deps: [{ token: i1.HttpClient }, { token: PLATFORM_ID }, { token: i2.GlobalRef }, { token: i2.LocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GooglePlacesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: GooglePlacesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.GlobalRef }, { type: i2.LocalStorageService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy9lbGVtZW50cy9wbGFjZXMvcGxhY2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFHeEUsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNVLEtBQWlCLEVBQ0ksVUFBa0IsRUFDdkMsT0FBa0IsRUFDbEIsb0JBQXlDO1FBSHpDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDSSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtJQUNoRCxDQUFDO0lBRUosY0FBYyxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUM5RCxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUNuRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUMxRSxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNoRSxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFDL0MsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNsQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUN2RCxNQUFNLE1BQU0sR0FBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUM5RyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFXO1FBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFDL0MsTUFBTSxRQUFRLEdBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDekQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQzFELElBQUksTUFBTSxFQUFFLENBQUM7Z0NBQ1gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNsQixDQUFDO2lDQUFNLENBQUM7Z0NBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQixDQUFDO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFXO1FBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFDL0MsTUFBTSxhQUFhLEdBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDaEYsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO2dCQUN6QixNQUFNLFVBQVUsR0FBUSxFQUFFLENBQUM7Z0JBQzNCLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNyQyxVQUFVLEdBQUc7d0JBQ1gsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO3dCQUNuQixxQkFBcUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsa0JBQWtCLEVBQUU7cUJBQzlELENBQUM7Z0JBQ0osQ0FBQztxQkFBTSxDQUFDO29CQUNOLFVBQVUsR0FBRzt3QkFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7cUJBQ3BCLENBQUM7Z0JBQ0osQ0FBQztnQkFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDdkIsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0gsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNwQyxDQUFDO2dCQUNELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDM0IsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hELE1BQU0sVUFBVSxHQUFRLFVBQVUsQ0FBQzt3QkFDbkMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO2dCQUNILENBQUM7cUJBQU0sQ0FBQztvQkFDTixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN0QyxNQUFNLEdBQUcsR0FBUSxNQUFNLENBQUM7b0JBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDbkIsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDO3dCQUN2QixLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUM1QyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0NBQzVCLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyQyxDQUFDO3dCQUNILENBQUM7d0JBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDM0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQixDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQWU7UUFDckMsTUFBTSxXQUFXLEdBQVEsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2dCQUMvQyxNQUFNLGFBQWEsR0FBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2RyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxNQUFXLEVBQUUsRUFBRTtvQkFDcEQsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7d0JBQzNDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBa0IsRUFBRSxFQUFFOzRCQUM3RSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0NBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakIsQ0FBQztpQ0FBTSxDQUFDO2dDQUNOLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDekIsQ0FBQzt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDN0MsV0FBVyxDQUFDLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyQkFBMkIsQ0FBQyxTQUFpQjtRQUMzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7Z0JBQy9DLE1BQU0sYUFBYSxHQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxRSxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsTUFBVyxFQUFFLE1BQVcsRUFBRSxFQUFFO29CQUM5RSxJQUFJLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEIsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxnQkFBd0IsRUFBRSxNQUFXLEVBQUUsZUFBdUI7UUFDMUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3RELElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE1BQU07b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNiLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUUsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxnQkFBd0I7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyRSxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUNWLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2IsQ0FBQztZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsV0FBZ0I7UUFDN0IsTUFBTSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDL0MsTUFBTSxRQUFRLEdBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNoRixJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN0QyxPQUFPLENBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FDWixDQUFDLFdBQXFCLEVBQUUsTUFBVyxFQUFFLEVBQUU7d0JBQ3JDLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZHLElBQUksbUJBQW1CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7NEJBQ2hGLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2xELENBQUM7d0JBQ0QsT0FBTyxXQUFXLENBQUM7b0JBQ3JCLENBQUMsRUFDRCxFQUFFLENBQ0gsQ0FDRixDQUFDO2dCQUNKLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEdBQVE7UUFDL0IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVPLGlCQUFpQixDQUFDLGFBQWtCLEVBQUUsVUFBZTtRQUMzRCxNQUFNLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMvQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IsYUFBYSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQVcsRUFBRSxNQUFXLEVBQUUsRUFBRTtnQkFDekUsSUFBSSxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNqRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0FoUVUsbUJBQW1CLDRDQUdwQixXQUFXO21IQUhWLG1CQUFtQjs7NEZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVTs7MEJBSU4sTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdsb2JhbFJlZiwgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJ25vdm8tZWxlbWVudHMvc2VydmljZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR29vZ2xlUGxhY2VzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBfZ2xvYmFsOiBHbG9iYWxSZWYsXG4gICAgcHJpdmF0ZSBfbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcbiAgKSB7fVxuXG4gIGdldFByZWRpY3Rpb25zKHVybDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuX2h0dHAuZ2V0KHVybCArICc/cXVlcnk9JyArIHF1ZXJ5KS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGF0TG5nRGV0YWlsKHVybDogc3RyaW5nLCBsYXQ6IG51bWJlciwgbG5nOiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5faHR0cC5nZXQodXJsICsgJz9sYXQ9JyArIGxhdCArICcmbG5nPScgKyBsbmcpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFjZURldGFpbHModXJsOiBzdHJpbmcsIHBsYWNlSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLl9odHRwLmdldCh1cmwgKyAnP3F1ZXJ5PScgKyBwbGFjZUlkKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0R2VvQ3VycmVudExvY2F0aW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICBjb25zdCBfd2luZG93OiBhbnkgPSB0aGlzLl9nbG9iYWwubmF0aXZlR2xvYmFsO1xuICAgICAgICBpZiAoX3dpbmRvdy5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICBfd2luZG93Lm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGF0bG5nOiBhbnkgPSB7IGxhdDogcGFyc2VGbG9hdChwb3MuY29vcmRzLmxhdGl0dWRlICsgJycpLCBsbmc6IHBhcnNlRmxvYXQocG9zLmNvb3Jkcy5sb25naXR1ZGUgKyAnJykgfTtcbiAgICAgICAgICAgIHJlc29sdmUobGF0bG5nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRHZW9MYXRMbmdEZXRhaWwobGF0bG5nOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgY29uc3QgX3dpbmRvdzogYW55ID0gdGhpcy5fZ2xvYmFsLm5hdGl2ZUdsb2JhbDtcbiAgICAgICAgY29uc3QgZ2VvY29kZXI6IGFueSA9IG5ldyBfd2luZG93Lmdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeyBsb2NhdGlvbjogbGF0bG5nIH0sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdlb1BsYWNlRGV0YWlsKHJlc3VsdHNbMF0ucGxhY2VfaWQpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0R2VvUHJlZGljdGlvbihwYXJhbXM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICBjb25zdCBfd2luZG93OiBhbnkgPSB0aGlzLl9nbG9iYWwubmF0aXZlR2xvYmFsO1xuICAgICAgICBjb25zdCBwbGFjZXNTZXJ2aWNlOiBhbnkgPSBuZXcgX3dpbmRvdy5nb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlU2VydmljZSgpO1xuICAgICAgICBsZXQgcXVlcnlJbnB1dDogYW55ID0ge307XG4gICAgICAgIGNvbnN0IHByb21pc2VBcnI6IGFueSA9IFtdO1xuICAgICAgICBpZiAocGFyYW1zLmNvdW50cnlSZXN0cmljdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICBxdWVyeUlucHV0ID0ge1xuICAgICAgICAgICAgaW5wdXQ6IHBhcmFtcy5xdWVyeSxcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczogeyBjb3VudHJ5OiBwYXJhbXMuY291bnRyeVJlc3RyaWN0aW9uIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxdWVyeUlucHV0ID0ge1xuICAgICAgICAgICAgaW5wdXQ6IHBhcmFtcy5xdWVyeSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMuZ2VvTG9jYXRpb24pIHtcbiAgICAgICAgICBxdWVyeUlucHV0LmxvY2F0aW9uID0gbmV3IF93aW5kb3cuZ29vZ2xlLm1hcHMuTGF0TG5nKHBhcnNlRmxvYXQocGFyYW1zLmdlb0xvY2F0aW9uWzBdKSwgcGFyc2VGbG9hdChwYXJhbXMuZ2VvTG9jYXRpb25bMV0pKTtcbiAgICAgICAgICBxdWVyeUlucHV0LnJhZGl1cyA9IHBhcmFtcy5yYWRpdXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5nZW9UeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgcGFyYW1zLmdlb1R5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBfdGVtcFF1ZXJ5OiBhbnkgPSBxdWVyeUlucHV0O1xuICAgICAgICAgICAgX3RlbXBRdWVyeS50eXBlcyA9IG5ldyBBcnJheShwYXJhbXMuZ2VvVHlwZXNbaV0pO1xuICAgICAgICAgICAgcHJvbWlzZUFyci5wdXNoKHRoaXMuZ2VvUHJlZGljdGlvbkNhbGwocGxhY2VzU2VydmljZSwgX3RlbXBRdWVyeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9taXNlQXJyLnB1c2godGhpcy5nZW9QcmVkaWN0aW9uQ2FsbChwbGFjZXNTZXJ2aWNlLCBxdWVyeUlucHV0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlQXJyKS50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWw6IGFueSA9IHZhbHVlcztcbiAgICAgICAgICBpZiAodmFsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCBfdGVtcEFycjogYW55ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgdmFsLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmICh2YWxbal0gJiYgdmFsW2pdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIF90ZW1wQXJyID0gX3RlbXBBcnIuY29uY2F0KHZhbFtqXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90ZW1wQXJyID0gdGhpcy5nZXRVbmlxdWVSZXN1bHRzKF90ZW1wQXJyKTtcbiAgICAgICAgICAgIHJlc29sdmUoX3RlbXBBcnIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0R2VvUGxhY2VEZXRhaWwocGxhY2VJZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBwbGFjZURldGFpbDogYW55ID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIGNvbnN0IF93aW5kb3c6IGFueSA9IHRoaXMuX2dsb2JhbC5uYXRpdmVHbG9iYWw7XG4gICAgICAgIGNvbnN0IHBsYWNlc1NlcnZpY2U6IGFueSA9IG5ldyBfd2luZG93Lmdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgcGxhY2VzU2VydmljZS5nZXREZXRhaWxzKHsgcGxhY2VJZCB9LCAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0R2VvUGFjZURldGFpbEJ5UmVmZXJhbmNlKHJlc3VsdC5yZWZlcmFuY2UpLnRoZW4oKHJlZmVyYW5jZURhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXJlZmVyYW5jZURhdGEpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlZmVyYW5jZURhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwbGFjZURldGFpbD8udHlwZXM/LmluY2x1ZGVzKCdsb2NhbGl0eScpKSB7XG4gICAgICBwbGFjZURldGFpbC5wb3N0YWxfY29kZXMgPSBhd2FpdCB0aGlzLmdldFBvc3RhbENvZGVzKHBsYWNlRGV0YWlsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VEZXRhaWw7XG4gIH1cblxuICBnZXRHZW9QYWNlRGV0YWlsQnlSZWZlcmFuY2UocmVmZXJhbmNlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgY29uc3QgX3dpbmRvdzogYW55ID0gdGhpcy5fZ2xvYmFsLm5hdGl2ZUdsb2JhbDtcbiAgICAgICAgY29uc3QgcGxhY2VzU2VydmljZTogYW55ID0gbmV3IF93aW5kb3cuZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UoKTtcbiAgICAgICAgcGxhY2VzU2VydmljZS5nZXREZXRhaWxzKHsgcmVmZXJlbmNlOiByZWZlcmFuY2UgfSwgKHJlc3VsdDogYW55LCBzdGF0dXM6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0dXMgPT09IF93aW5kb3cuZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2VTdGF0dXMuT0spIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkUmVjZW50TGlzdChsb2NhbFN0b3JhZ2VOYW1lOiBzdHJpbmcsIHJlc3VsdDogYW55LCBpdGVtU2F2ZWRMZW5ndGg6IG51bWJlcik6IGFueSB7XG4gICAgdGhpcy5nZXRSZWNlbnRMaXN0KGxvY2FsU3RvcmFnZU5hbWUpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZGF0YVtpXS5kZXNjcmlwdGlvbiA9PT0gcmVzdWx0LmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBkYXRhLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkYXRhLnVuc2hpZnQocmVzdWx0KTtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gaXRlbVNhdmVkTGVuZ3RoKSB7XG4gICAgICAgICAgZGF0YS5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldEl0ZW0obG9jYWxTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UmVjZW50TGlzdChsb2NhbFN0b3JhZ2VOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgbGV0IHZhbHVlOiBhbnkgPSB0aGlzLl9sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0obG9jYWxTdG9yYWdlTmFtZSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gW107XG4gICAgICB9XG4gICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBvc3RhbENvZGVzKHBsYWNlRGV0YWlsOiBhbnkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IF93aW5kb3c6IGFueSA9IHRoaXMuX2dsb2JhbC5uYXRpdmVHbG9iYWw7XG4gICAgY29uc3QgZ2VvY29kZXI6IGFueSA9IG5ldyBfd2luZG93Lmdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBnZW9jb2Rlci5nZW9jb2RlKHsgbG9jYXRpb246IHBsYWNlRGV0YWlsLmdlb21ldHJ5LmxvY2F0aW9uIH0sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJyAmJiByZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICByZXN1bHRzLnJlZHVjZShcbiAgICAgICAgICAgICAgKHBvc3RhbENvZGVzOiBzdHJpbmdbXSwgcmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3N0YWxDb2RlQ29tcG9uZW50ID0gcmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cy5maW5kKGl0ZW0gPT4gaXRlbS50eXBlcy5pbmNsdWRlcygncG9zdGFsX2NvZGUnKSk7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RhbENvZGVDb21wb25lbnQgJiYgIXBvc3RhbENvZGVzLmluY2x1ZGVzKHBvc3RhbENvZGVDb21wb25lbnQubG9uZ19uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgcG9zdGFsQ29kZXMucHVzaChwb3N0YWxDb2RlQ29tcG9uZW50LmxvbmdfbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwb3N0YWxDb2RlcztcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFVuaXF1ZVJlc3VsdHMoYXJyOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFyci5yZWR1Y2UoKG0sIHQpID0+IG0uc2V0KHQucGxhY2VfaWQsIHQpLCBuZXcgTWFwKCkpLnZhbHVlcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VvUHJlZGljdGlvbkNhbGwocGxhY2VzU2VydmljZTogYW55LCBxdWVyeUlucHV0OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IF93aW5kb3c6IGFueSA9IHRoaXMuX2dsb2JhbC5uYXRpdmVHbG9iYWw7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBwbGFjZXNTZXJ2aWNlLmdldFBsYWNlUHJlZGljdGlvbnMocXVlcnlJbnB1dCwgKHJlc3VsdDogYW55LCBzdGF0dXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAoc3RhdHVzID09PSBfd2luZG93Lmdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19