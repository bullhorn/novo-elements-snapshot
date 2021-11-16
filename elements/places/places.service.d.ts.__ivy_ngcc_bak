import { HttpClient } from '@angular/common/http';
import { GlobalRef } from '../../services/global/global.service';
import { LocalStorageService } from '../../services/storage/storage.service';
export declare class GooglePlacesService {
    private _http;
    private platformId;
    private _global;
    private _localStorageService;
    constructor(_http: HttpClient, platformId: Object, _global: GlobalRef, _localStorageService: LocalStorageService);
    getPredictions(url: string, query: string): Promise<any>;
    getLatLngDetail(url: string, lat: number, lng: number): Promise<any>;
    getPlaceDetails(url: string, placeId: string): Promise<any>;
    getGeoCurrentLocation(): Promise<any>;
    getGeoLatLngDetail(latlng: any): Promise<any>;
    getGeoPrediction(params: any): Promise<any>;
    getGeoPlaceDetail(placeId: string): Promise<any>;
    getGeoPaceDetailByReferance(referance: string): Promise<any>;
    addRecentList(localStorageName: string, result: any, itemSavedLength: number): any;
    getRecentList(localStorageName: string): Promise<any>;
    private getUniqueResults;
    private geoPredictionCall;
}
