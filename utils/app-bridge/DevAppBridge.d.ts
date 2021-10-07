import { HttpClient } from '@angular/common/http';
import { AppBridge } from '@bullhorn/connect';
export declare class DevAppBridgeService {
    private http;
    constructor(http: HttpClient);
    create(name: string): DevAppBridge;
}
export declare class DevAppBridge extends AppBridge {
    private http;
    private baseURL;
    constructor(traceName: string, http: HttpClient);
    protected _setupHandlers(): void;
    /**
     * Fires or responds to an HTTP_GET event
     * @param packet any - packet of data to send with the event
     */
    httpGET(relativeURL: string): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    httpPOST(relativeURL: string, postData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    httpPUT(relativeURL: string, putData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    httpDELETE(relativeURL: string): Promise<any>;
    private getCookie;
}
