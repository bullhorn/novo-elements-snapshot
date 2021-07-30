import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GlobalRef } from '../../services/global/global.service';
import { LocalStorageService } from '../../services/storage/storage.service';
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
                        _tempQuery['types'] = new Array(params.geoTypes[i]);
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
    getGeoPlaceDetail(placeId) {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.PlacesService(document.createElement('div'));
                placesService.getDetails({ placeId }, (result, status) => {
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
}
GooglePlacesService.decorators = [
    { type: Injectable }
];
GooglePlacesService.ctorParameters = () => [
    { type: HttpClient },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: GlobalRef },
    { type: LocalStorageService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovZGV2L2Rldm1hY2hpbmUvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbImVsZW1lbnRzL3BsYWNlcy9wbGFjZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUc3RSxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ1UsS0FBaUIsRUFDSSxVQUFrQixFQUN2QyxPQUFrQixFQUNsQixvQkFBeUM7UUFIekMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNJLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO0lBQ2hELENBQUM7SUFFSixjQUFjLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQzlELElBQUksSUFBSSxFQUFFO29CQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hCO1lB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QUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxHQUFRO1FBQy9CLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxhQUFrQixFQUFFLFVBQWU7UUFDM0QsTUFBTSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFXLEVBQUUsTUFBVyxFQUFFLEVBQUU7Z0JBQ3pFLElBQUksTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUU7b0JBQ2hFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFsT0YsVUFBVTs7O1lBSkYsVUFBVTtZQVEwQixNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQVBkLFNBQVM7WUFDVCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgR2xvYmFsUmVmIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2xvYmFsL2dsb2JhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0b3JhZ2Uvc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdvb2dsZVBsYWNlc1NlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsOiBHbG9iYWxSZWYsXHJcbiAgICBwcml2YXRlIF9sb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICkge31cclxuXHJcbiAgZ2V0UHJlZGljdGlvbnModXJsOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHRoaXMuX2h0dHAuZ2V0KHVybCArICc/cXVlcnk9JyArIHF1ZXJ5KS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXRMbmdEZXRhaWwodXJsOiBzdHJpbmcsIGxhdDogbnVtYmVyLCBsbmc6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgdGhpcy5faHR0cC5nZXQodXJsICsgJz9sYXQ9JyArIGxhdCArICcmbG5nPScgKyBsbmcpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBsYWNlRGV0YWlscyh1cmw6IHN0cmluZywgcGxhY2VJZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICB0aGlzLl9odHRwLmdldCh1cmwgKyAnP3F1ZXJ5PScgKyBwbGFjZUlkKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRHZW9DdXJyZW50TG9jYXRpb24oKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgIGNvbnN0IF93aW5kb3c6IGFueSA9IHRoaXMuX2dsb2JhbC5uYXRpdmVHbG9iYWw7XHJcbiAgICAgICAgaWYgKF93aW5kb3cubmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICBfd2luZG93Lm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsYXRsbmc6IGFueSA9IHsgbGF0OiBwYXJzZUZsb2F0KHBvcy5jb29yZHMubGF0aXR1ZGUgKyAnJyksIGxuZzogcGFyc2VGbG9hdChwb3MuY29vcmRzLmxvbmdpdHVkZSArICcnKSB9O1xyXG4gICAgICAgICAgICByZXNvbHZlKGxhdGxuZyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEdlb0xhdExuZ0RldGFpbChsYXRsbmc6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICBjb25zdCBfd2luZG93OiBhbnkgPSB0aGlzLl9nbG9iYWwubmF0aXZlR2xvYmFsO1xyXG4gICAgICAgIGNvbnN0IGdlb2NvZGVyOiBhbnkgPSBuZXcgX3dpbmRvdy5nb29nbGUubWFwcy5HZW9jb2RlcigpO1xyXG4gICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeyBsb2NhdGlvbjogbGF0bG5nIH0sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRHZW9QbGFjZURldGFpbChyZXN1bHRzWzBdLnBsYWNlX2lkKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRHZW9QcmVkaWN0aW9uKHBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgIGNvbnN0IF93aW5kb3c6IGFueSA9IHRoaXMuX2dsb2JhbC5uYXRpdmVHbG9iYWw7XHJcbiAgICAgICAgY29uc3QgcGxhY2VzU2VydmljZTogYW55ID0gbmV3IF93aW5kb3cuZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZVNlcnZpY2UoKTtcclxuICAgICAgICBsZXQgcXVlcnlJbnB1dDogYW55ID0ge307XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZUFycjogYW55ID0gW107XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb3VudHJ5UmVzdHJpY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICBxdWVyeUlucHV0ID0ge1xyXG4gICAgICAgICAgICBpbnB1dDogcGFyYW1zLnF1ZXJ5LFxyXG4gICAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHsgY291bnRyeTogcGFyYW1zLmNvdW50cnlSZXN0cmljdGlvbiB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcXVlcnlJbnB1dCA9IHtcclxuICAgICAgICAgICAgaW5wdXQ6IHBhcmFtcy5xdWVyeSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMuZ2VvTG9jYXRpb24pIHtcclxuICAgICAgICAgIHF1ZXJ5SW5wdXQubG9jYXRpb24gPSBuZXcgX3dpbmRvdy5nb29nbGUubWFwcy5MYXRMbmcocGFyc2VGbG9hdChwYXJhbXMuZ2VvTG9jYXRpb25bMF0pLCBwYXJzZUZsb2F0KHBhcmFtcy5nZW9Mb2NhdGlvblsxXSkpO1xyXG4gICAgICAgICAgcXVlcnlJbnB1dC5yYWRpdXMgPSBwYXJhbXMucmFkaXVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zLmdlb1R5cGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHBhcmFtcy5nZW9UeXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBfdGVtcFF1ZXJ5OiBhbnkgPSBxdWVyeUlucHV0O1xyXG4gICAgICAgICAgICBfdGVtcFF1ZXJ5Wyd0eXBlcyddID0gbmV3IEFycmF5KHBhcmFtcy5nZW9UeXBlc1tpXSk7XHJcbiAgICAgICAgICAgIHByb21pc2VBcnIucHVzaCh0aGlzLmdlb1ByZWRpY3Rpb25DYWxsKHBsYWNlc1NlcnZpY2UsIF90ZW1wUXVlcnkpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcHJvbWlzZUFyci5wdXNoKHRoaXMuZ2VvUHJlZGljdGlvbkNhbGwocGxhY2VzU2VydmljZSwgcXVlcnlJbnB1dCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZUFycikudGhlbigodmFsdWVzKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB2YWw6IGFueSA9IHZhbHVlcztcclxuICAgICAgICAgIGlmICh2YWwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBsZXQgX3RlbXBBcnI6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqOiBudW1iZXIgPSAwOyBqIDwgdmFsLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbFtqXSAmJiB2YWxbal0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGVtcEFyciA9IF90ZW1wQXJyLmNvbmNhdCh2YWxbal0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGVtcEFyciA9IHRoaXMuZ2V0VW5pcXVlUmVzdWx0cyhfdGVtcEFycik7XHJcbiAgICAgICAgICAgIHJlc29sdmUoX3RlbXBBcnIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZXNbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEdlb1BsYWNlRGV0YWlsKHBsYWNlSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgICBjb25zdCBfd2luZG93OiBhbnkgPSB0aGlzLl9nbG9iYWwubmF0aXZlR2xvYmFsO1xyXG4gICAgICAgIGNvbnN0IHBsYWNlc1NlcnZpY2U6IGFueSA9IG5ldyBfd2luZG93Lmdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcclxuICAgICAgICBwbGFjZXNTZXJ2aWNlLmdldERldGFpbHMoeyBwbGFjZUlkIH0sIChyZXN1bHQ6IGFueSwgc3RhdHVzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldEdlb1BhY2VEZXRhaWxCeVJlZmVyYW5jZShyZXN1bHQucmVmZXJhbmNlKS50aGVuKChyZWZlcmFuY2VEYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIXJlZmVyYW5jZURhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlZmVyYW5jZURhdGEpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0R2VvUGFjZURldGFpbEJ5UmVmZXJhbmNlKHJlZmVyYW5jZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgIGNvbnN0IF93aW5kb3c6IGFueSA9IHRoaXMuX2dsb2JhbC5uYXRpdmVHbG9iYWw7XHJcbiAgICAgICAgY29uc3QgcGxhY2VzU2VydmljZTogYW55ID0gbmV3IF93aW5kb3cuZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UoKTtcclxuICAgICAgICBwbGFjZXNTZXJ2aWNlLmdldERldGFpbHMoeyByZWZlcmVuY2U6IHJlZmVyYW5jZSB9LCAocmVzdWx0OiBhbnksIHN0YXR1czogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSBfd2luZG93Lmdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFJlY2VudExpc3QobG9jYWxTdG9yYWdlTmFtZTogc3RyaW5nLCByZXN1bHQ6IGFueSwgaXRlbVNhdmVkTGVuZ3RoOiBudW1iZXIpOiBhbnkge1xyXG4gICAgdGhpcy5nZXRSZWNlbnRMaXN0KGxvY2FsU3RvcmFnZU5hbWUpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YVtpXS5kZXNjcmlwdGlvbiA9PT0gcmVzdWx0LmRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIGRhdGEuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS51bnNoaWZ0KHJlc3VsdCk7XHJcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gaXRlbVNhdmVkTGVuZ3RoKSB7XHJcbiAgICAgICAgICBkYXRhLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldEl0ZW0obG9jYWxTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFJlY2VudExpc3QobG9jYWxTdG9yYWdlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBsZXQgdmFsdWU6IGFueSA9IHRoaXMuX2xvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0SXRlbShsb2NhbFN0b3JhZ2VOYW1lKTtcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFVuaXF1ZVJlc3VsdHMoYXJyOiBhbnkpOiBhbnkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyLnJlZHVjZSgobSwgdCkgPT4gbS5zZXQodC5wbGFjZV9pZCwgdCksIG5ldyBNYXAoKSkudmFsdWVzKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZW9QcmVkaWN0aW9uQ2FsbChwbGFjZXNTZXJ2aWNlOiBhbnksIHF1ZXJ5SW5wdXQ6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCBfd2luZG93OiBhbnkgPSB0aGlzLl9nbG9iYWwubmF0aXZlR2xvYmFsO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHBsYWNlc1NlcnZpY2UuZ2V0UGxhY2VQcmVkaWN0aW9ucyhxdWVyeUlucHV0LCAocmVzdWx0OiBhbnksIHN0YXR1czogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gX3dpbmRvdy5nb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==