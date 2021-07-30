export var AppBridgeHandler;
(function (AppBridgeHandler) {
    AppBridgeHandler[AppBridgeHandler["HTTP"] = 0] = "HTTP";
    AppBridgeHandler[AppBridgeHandler["OPEN"] = 1] = "OPEN";
    AppBridgeHandler[AppBridgeHandler["OPEN_LIST"] = 2] = "OPEN_LIST";
    AppBridgeHandler[AppBridgeHandler["CLOSE"] = 3] = "CLOSE";
    AppBridgeHandler[AppBridgeHandler["REFRESH"] = 4] = "REFRESH";
    AppBridgeHandler[AppBridgeHandler["PIN"] = 5] = "PIN";
    AppBridgeHandler[AppBridgeHandler["REGISTER"] = 6] = "REGISTER";
    AppBridgeHandler[AppBridgeHandler["UPDATE"] = 7] = "UPDATE";
    AppBridgeHandler[AppBridgeHandler["REQUEST_DATA"] = 8] = "REQUEST_DATA";
    AppBridgeHandler[AppBridgeHandler["CALLBACK"] = 9] = "CALLBACK";
})(AppBridgeHandler || (AppBridgeHandler = {}));
const HTTP_VERBS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
};
const MESSAGE_TYPES = {
    REGISTER: 'register',
    OPEN: 'open',
    OPEN_LIST: 'openList',
    CLOSE: 'close',
    REFRESH: 'refresh',
    PIN: 'pin',
    UPDATE: 'update',
    HTTP_GET: 'httpGET',
    HTTP_POST: 'httpPOST',
    HTTP_PUT: 'httpPUT',
    HTTP_DELETE: 'httpDELETE',
    CUSTOM_EVENT: 'customEvent',
    REQUEST_DATA: 'requestData',
    CALLBACK: 'callback',
};
export class AppBridgeService {
    create(name) {
        return new AppBridge(name);
    }
}
export class DevAppBridgeService {
    constructor(http) {
        this.http = http;
    }
    create(name) {
        return new DevAppBridge(name, this.http);
    }
}
export class AppBridge {
    // Type?
    constructor(traceName = 'AppBridge') {
        this.id = `${Date.now()}`;
        this._registeredFrames = [];
        this._handlers = {};
        this._tracing = false;
        this._eventListeners = {};
        this.traceName = traceName;
        if (postRobot) {
            postRobot.CONFIG.LOG_LEVEL = 'error';
            try {
                this._setupHandlers();
            }
            catch (error) {
                // No op
            }
        }
    }
    set tracing(tracing) {
        this._tracing = tracing;
    }
    handle(type, handler) {
        this._handlers[type] = handler;
    }
    _trace(eventType, event) {
        if (this._tracing) {
            console.log(`[${this.traceName || this.id}] "${eventType}"`, event); // tslint:disable-line
        }
    }
    _setupHandlers() {
        // Register
        postRobot.on(MESSAGE_TYPES.REGISTER, (event) => {
            this._trace(MESSAGE_TYPES.REGISTER, event);
            this._registeredFrames.push(event);
            return this.register(event.data).then((windowName) => {
                return { windowName };
            });
        });
        // Update
        postRobot.on(MESSAGE_TYPES.UPDATE, (event) => {
            this._trace(MESSAGE_TYPES.UPDATE, event);
            return this.update(event.data).then((success) => {
                return { success };
            });
        });
        // Open
        postRobot.on(MESSAGE_TYPES.OPEN, (event) => {
            this._trace(MESSAGE_TYPES.OPEN, event);
            return this.open(event.data).then((success) => {
                return { success };
            });
        });
        postRobot.on(MESSAGE_TYPES.OPEN_LIST, (event) => {
            this._trace(MESSAGE_TYPES.OPEN_LIST, event);
            return this.openList(event.data).then((success) => {
                return { success };
            });
        });
        // Close
        postRobot.on(MESSAGE_TYPES.CLOSE, (event) => {
            this._trace(MESSAGE_TYPES.CLOSE, event);
            const index = this._registeredFrames.findIndex((frame) => frame.data.id === event.data.id);
            if (index !== -1) {
                this._registeredFrames.splice(index, 1);
            }
            return this.close(event.data).then((success) => {
                return { success };
            });
        });
        // Refresh
        postRobot.on(MESSAGE_TYPES.REFRESH, (event) => {
            this._trace(MESSAGE_TYPES.REFRESH, event);
            return this.refresh(event.data).then((success) => {
                return { success };
            });
        });
        // PIN
        postRobot.on(MESSAGE_TYPES.PIN, (event) => {
            this._trace(MESSAGE_TYPES.PIN, event);
            return this.pin(event.data).then((success) => {
                return { success };
            });
        });
        // REQUEST_DATA
        postRobot.on(MESSAGE_TYPES.REQUEST_DATA, (event) => {
            this._trace(MESSAGE_TYPES.REQUEST_DATA, event);
            return this.requestData(event.data).then((result) => {
                return { data: result.data, error: result.error };
            });
        });
        // CALLBACKS
        postRobot.on(MESSAGE_TYPES.CALLBACK, (event) => {
            this._trace(MESSAGE_TYPES.CALLBACK, event);
            return this.callback(event.data).then((success) => {
                return { success };
            });
        });
        // HTTP-GET
        postRobot.on(MESSAGE_TYPES.HTTP_GET, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_GET, event);
            return this.httpGET(event.data.relativeURL).then((result) => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-POST
        postRobot.on(MESSAGE_TYPES.HTTP_POST, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_POST, event);
            return this.httpPOST(event.data.relativeURL, event.data.data).then((result) => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-PUT
        postRobot.on(MESSAGE_TYPES.HTTP_PUT, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_PUT, event);
            return this.httpPUT(event.data.relativeURL, event.data.data).then((result) => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-DELETE
        postRobot.on(MESSAGE_TYPES.HTTP_DELETE, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_DELETE, event);
            return this.httpDELETE(event.data.relativeURL).then((result) => {
                return { data: result.data, error: result.error };
            });
        });
        // Custom Events
        postRobot.on(MESSAGE_TYPES.CUSTOM_EVENT, (event) => {
            this._trace(MESSAGE_TYPES.CUSTOM_EVENT, event);
            if (this._eventListeners[event.data.event]) {
                this._eventListeners[event.data.event].forEach((listener) => {
                    listener(event.data.data);
                });
            }
            if (this._registeredFrames.length > 0) {
                this._registeredFrames.forEach((frame) => {
                    postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, event.data);
                });
            }
        });
    }
    /**
     * Fires or responds to an open event
     * @param packet any - packet of data to send with the open event
     */
    open(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.OPEN]) {
                this._handlers[AppBridgeHandler.OPEN](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                Object.assign(packet, { id: this.id, windowName: this.windowName });
                postRobot
                    .sendToParent(MESSAGE_TYPES.OPEN, packet)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.OPEN} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to an openList event
     * @param packet any - packet of data to send with the open event
     */
    openList(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.OPEN_LIST]) {
                this._handlers[AppBridgeHandler.OPEN_LIST](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                const openListPacket = {};
                Object.assign(openListPacket, { type: 'List', entityType: packet.type, keywords: packet.keywords, criteria: packet.criteria });
                postRobot
                    .sendToParent(MESSAGE_TYPES.OPEN_LIST, packet)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.OPEN_LIST} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to an close event
     * @param packet any - packet of data to send with the close event
     */
    update(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.UPDATE]) {
                this._handlers[AppBridgeHandler.UPDATE](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                Object.assign(packet, { id: this.id, windowName: this.windowName });
                postRobot
                    .sendToParent(MESSAGE_TYPES.UPDATE, packet)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.UPDATE} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to an close event
     */
    close(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.CLOSE]) {
                this._handlers[AppBridgeHandler.CLOSE](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                if (packet) {
                    console.info('[AppBridge] - close(packet) is deprecated! Please just use close()!'); // tslint:disable-line
                }
                const realPacket = { id: this.id, windowName: this.windowName };
                postRobot
                    .sendToParent(MESSAGE_TYPES.CLOSE, realPacket)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.CLOSE} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to an close event
     */
    refresh(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.REFRESH]) {
                this._handlers[AppBridgeHandler.REFRESH](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                if (packet) {
                    console.info('[AppBridge] - refresh(packet) is deprecated! Please just use refresh()!'); // tslint:disable-line
                }
                const realPacket = { id: this.id, windowName: this.windowName };
                postRobot
                    .sendToParent(MESSAGE_TYPES.REFRESH, realPacket)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.REFRESH} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to a pin event
     */
    pin(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.PIN]) {
                this._handlers[AppBridgeHandler.PIN](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                if (packet) {
                    console.info('[AppBridge] - pin(packet) is deprecated! Please just use pin()!'); // tslint:disable-line
                }
                const realPacket = { id: this.id, windowName: this.windowName };
                postRobot
                    .sendToParent(MESSAGE_TYPES.PIN, realPacket)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.PIN} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to a requestData event
     * @param packet any - packet of data to send with the requestData event
     */
    requestData(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.REQUEST_DATA]) {
                this._handlers[AppBridgeHandler.REQUEST_DATA](packet, (data) => {
                    if (data) {
                        resolve({ data });
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                Object.assign(packet, { id: this.id, windowName: this.windowName });
                postRobot
                    .sendToParent(MESSAGE_TYPES.REQUEST_DATA, packet)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.REQUEST_DATA} (callback)`, event);
                    if (event.data) {
                        resolve({ data: event.data.data });
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires a generic callback command
     * @param packet string - key: string, generic: boolean
     */
    callback(packet) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.CALLBACK]) {
                this._handlers[AppBridgeHandler.CALLBACK](packet, (success) => {
                    if (success) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            else {
                Object.assign(packet, { id: this.id, windowName: this.windowName });
                postRobot
                    .sendToParent(MESSAGE_TYPES.CALLBACK, packet)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.CALLBACK} (callback)`, event);
                    if (event.data) {
                        resolve(true);
                    }
                    else {
                        reject(false);
                    }
                })
                    .catch((err) => {
                    reject(false);
                });
            }
        });
    }
    /**
     * Fires or responds to an register event
     * @param packet any - packet of data to send with the event
     */
    register(packet = {}) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.REGISTER]) {
                this._handlers[AppBridgeHandler.REGISTER](packet, (windowName) => {
                    if (windowName) {
                        resolve(windowName);
                    }
                    else {
                        resolve(null);
                    }
                });
            }
            else {
                Object.assign(packet, { id: this.id });
                postRobot
                    .sendToParent(MESSAGE_TYPES.REGISTER, packet)
                    .then((event) => {
                    this._trace(`${MESSAGE_TYPES.REGISTER} (callback)`, event);
                    if (event.data) {
                        this.windowName = event.data.windowName;
                        resolve(event.data.windowName);
                    }
                    else {
                        resolve(null);
                    }
                })
                    .catch((err) => {
                    this._trace(`${MESSAGE_TYPES.REGISTER} - FAILED - (no parent)`, err);
                    reject(err);
                });
            }
        });
    }
    /**
     * Fires or responds to an HTTP_GET event
     * @param packet any - packet of data to send with the event
     */
    httpGET(relativeURL, timeout = 10000) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.HTTP]) {
                this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.GET, relativeURL }, (data, error) => {
                    resolve({ data, error });
                });
            }
            else {
                postRobot
                    .sendToParent(MESSAGE_TYPES.HTTP_GET, { relativeURL }, { timeout })
                    .then((event) => {
                    resolve({ data: event.data.data, error: event.data.error });
                })
                    .catch((err) => {
                    reject(null);
                });
            }
        });
    }
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    httpPOST(relativeURL, postData, timeout = 10000) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.HTTP]) {
                this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.POST, relativeURL, data: postData }, (data, error) => {
                    resolve({ data, error });
                });
            }
            else {
                postRobot
                    .sendToParent(MESSAGE_TYPES.HTTP_POST, { relativeURL, data: postData }, { timeout })
                    .then((event) => {
                    resolve({ data: event.data.data, error: event.data.error });
                })
                    .catch((err) => {
                    reject(null);
                });
            }
        });
    }
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    httpPUT(relativeURL, putData, timeout = 10000) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.HTTP]) {
                this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.PUT, relativeURL, data: putData }, (data, error) => {
                    resolve({ data, error });
                });
            }
            else {
                postRobot
                    .sendToParent(MESSAGE_TYPES.HTTP_PUT, { relativeURL, data: putData }, { timeout })
                    .then((event) => {
                    resolve({ data: event.data.data, error: event.data.error });
                })
                    .catch((err) => {
                    reject(null);
                });
            }
        });
    }
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    httpDELETE(relativeURL, timeout = 10000) {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.HTTP]) {
                this._handlers[AppBridgeHandler.HTTP]({ verb: HTTP_VERBS.DELETE, relativeURL }, (data, error) => {
                    resolve({ data, error });
                });
            }
            else {
                postRobot
                    .sendToParent(MESSAGE_TYPES.HTTP_DELETE, { relativeURL }, { timeout })
                    .then((event) => {
                    resolve({ data: event.data.data, error: event.data.error });
                })
                    .catch((err) => {
                    reject(null);
                });
            }
        });
    }
    /**
     * Fires a custom event to anywhere in the application
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEvent(event, data) {
        return new Promise((resolve, reject) => {
            postRobot
                .sendToParent(MESSAGE_TYPES.CUSTOM_EVENT, { event, data })
                .then((e) => {
                resolve(e);
            })
                .catch((err) => {
                reject(null);
            });
        });
    }
    /**
     * Fires a custom event to all registered frames
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEventToChildren(event, data) {
        if (this._registeredFrames.length > 0) {
            this._registeredFrames.forEach((frame) => {
                postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, {
                    eventType: event,
                    data,
                });
            });
        }
    }
    /**
     * Adds an event listener to a custom event
     * @param event string - event name to listen to
     * @param callback function - callback to be fired when an event is caught
     */
    addEventListener(event, callback) {
        if (!this._eventListeners[event]) {
            this._eventListeners[event] = [];
        }
        this._eventListeners[event].push(callback);
    }
}
export class DevAppBridge extends AppBridge {
    constructor(traceName = 'DevAppBridge', http) {
        super(traceName);
        this.http = http;
        const cookie = this.getCookie('UlEncodedIdentity');
        if (cookie && cookie.length) {
            const identity = JSON.parse(decodeURIComponent(cookie));
            const endpoints = identity.sessions.reduce((obj, session) => {
                obj[session.name] = session.value.endpoint;
                return obj;
            }, {});
            this.baseURL = endpoints.rest;
        }
    }
    _setupHandlers() { }
    /**
     * Fires or responds to an HTTP_GET event
     * @param packet any - packet of data to send with the event
     */
    httpGET(relativeURL) {
        return this.http.get(`${this.baseURL}/${relativeURL}`, { withCredentials: true }).toPromise();
    }
    /**
     * Fires or responds to an HTTP_POST event
     * @param packet any - packet of data to send with the event
     */
    httpPOST(relativeURL, postData) {
        return this.http.post(`${this.baseURL}/${relativeURL}`, postData, { withCredentials: true }).toPromise();
    }
    /**
     * Fires or responds to an HTTP_PUT event
     * @param packet any - packet of data to send with the event
     */
    httpPUT(relativeURL, putData) {
        return this.http.put(`${this.baseURL}/${relativeURL}`, putData, { withCredentials: true }).toPromise();
    }
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param packet any - packet of data to send with the event
     */
    httpDELETE(relativeURL) {
        return this.http.delete(`${this.baseURL}/${relativeURL}`, { withCredentials: true }).toPromise();
    }
    getCookie(cname) {
        if (document) {
            const name = `${cname}=`;
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwQnJpZGdlLmpzIiwic291cmNlUm9vdCI6IkM6L2Rldi9kZXZtYWNoaW5lL25vdm8tZWxlbWVudHMvcHJvamVjdHMvbm92by1lbGVtZW50cy9zcmMvIiwic291cmNlcyI6WyJ1dGlscy9hcHAtYnJpZGdlL0FwcEJyaWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQU4sSUFBWSxnQkFXWDtBQVhELFdBQVksZ0JBQWdCO0lBQzFCLHVEQUFJLENBQUE7SUFDSix1REFBSSxDQUFBO0lBQ0osaUVBQVMsQ0FBQTtJQUNULHlEQUFLLENBQUE7SUFDTCw2REFBTyxDQUFBO0lBQ1AscURBQUcsQ0FBQTtJQUNILCtEQUFRLENBQUE7SUFDUiwyREFBTSxDQUFBO0lBQ04sdUVBQVksQ0FBQTtJQUNaLCtEQUFRLENBQUE7QUFDVixDQUFDLEVBWFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQVczQjtBQW1FRCxNQUFNLFVBQVUsR0FBRztJQUNqQixHQUFHLEVBQUUsS0FBSztJQUNWLElBQUksRUFBRSxNQUFNO0lBQ1osR0FBRyxFQUFFLEtBQUs7SUFDVixNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUc7SUFDcEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsVUFBVTtJQUNyQixLQUFLLEVBQUUsT0FBTztJQUNkLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEdBQUcsRUFBRSxLQUFLO0lBQ1YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsU0FBUyxFQUFFLFVBQVU7SUFDckIsUUFBUSxFQUFFLFNBQVM7SUFDbkIsV0FBVyxFQUFFLFlBQVk7SUFDekIsWUFBWSxFQUFFLGFBQWE7SUFDM0IsWUFBWSxFQUFFLGFBQWE7SUFDM0IsUUFBUSxFQUFFLFVBQVU7Q0FDckIsQ0FBQztBQUlGLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsTUFBTSxDQUFDLElBQVk7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QUM7SUFDekcsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFVBQVUsQ0FBQyxXQUFtQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25HLENBQUM7SUFFTyxTQUFTLENBQUMsS0FBYTtRQUM3QixJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUM7WUFDekIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUMxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDekIsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMzQzthQUNGO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuZXhwb3J0IGVudW0gQXBwQnJpZGdlSGFuZGxlciB7XHJcbiAgSFRUUCxcclxuICBPUEVOLFxyXG4gIE9QRU5fTElTVCxcclxuICBDTE9TRSxcclxuICBSRUZSRVNILFxyXG4gIFBJTixcclxuICBSRUdJU1RFUixcclxuICBVUERBVEUsXHJcbiAgUkVRVUVTVF9EQVRBLFxyXG4gIENBTExCQUNLLFxyXG59XHJcblxyXG4vLyByZWNvcmQgICAgICAgLSBhbiBpbmRpdmlkdWFsIGVudGl0eSByZWNvcmRcclxuLy8gYWRkL2Zhc3QtYWRkIC0gdGhlIGFkZCBwYWdlIGZvciBhIG5ldyByZWNvcmRcclxuLy8gY3VzdG9tICAgICAgIC0gY3VzdG9tIGFjdGlvbiB0aGF0IG9wZW5zIHRoZSB1cmwgcHJvdmlkZWQgaW4gZGF0YS51cmxcclxuLy8gcHJldmlldyAgICAgIC0gdGhlIHByZXZpZXcgc2xpZGVvdXQgYXZhaWxhYmxlIG9ubHkgaW4gTm92b1xyXG5leHBvcnQgdHlwZSBOb3ZvQXBwcyA9ICdyZWNvcmQnIHwgJ2FkZCcgfCAnZmFzdC1hZGQnIHwgJ2N1c3RvbScgfCAncHJldmlldyc7XHJcblxyXG5leHBvcnQgdHlwZSBBbGxleUxpbmtDb2xvcnMgPVxyXG4gIHwgJ3B1cnBsZSdcclxuICB8ICdncmVlbidcclxuICB8ICdibHVlJ1xyXG4gIHwgJ2xlYWQnXHJcbiAgfCAnY2FuZGlkYXRlJ1xyXG4gIHwgJ2NvbnRhY3QnXHJcbiAgfCAnY29tcGFueSdcclxuICB8ICdvcHBvcnR1bml0eSdcclxuICB8ICdqb2InXHJcbiAgfCAnYmlsbGFibGUtY2hhcmdlJ1xyXG4gIHwgJ2Vhcm4tY29kZSdcclxuICB8ICdpbnZvaWNlLXN0YXRlbWVudCdcclxuICB8ICdqb2ItY29kZSdcclxuICB8ICdwYXlhYmxlLWNoYXJnZSdcclxuICB8ICdzYWxlcy10YXgtcmF0ZSdcclxuICB8ICd0YXgtcnVsZXMnXHJcbiAgfCAnc3VibWlzc2lvbidcclxuICB8ICdwbGFjZW1lbnQnXHJcbiAgfCAnbmF2aWdhdGlvbidcclxuICB8ICdjYW52YXMnXHJcbiAgfCAnbmV1dHJhbCdcclxuICB8ICduZXV0cmFsLWl0YWxpYydcclxuICB8ICdpbml0aWFsJ1xyXG4gIHwgJ2Rpc3RyaWJ1dGlvbkxpc3QnXHJcbiAgfCAnY29udHJhY3QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXBwQnJpZGdlT3BlbkV2ZW50IHtcclxuICB0eXBlOiBOb3ZvQXBwcztcclxuICBlbnRpdHlUeXBlOiBzdHJpbmc7XHJcbiAgZW50aXR5SWQ/OiBzdHJpbmc7XHJcbiAgdGFiPzogc3RyaW5nO1xyXG4gIGRhdGE/OiBhbnk7XHJcbiAgcGFzc3Rocm91Z2g/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIE1vc2FpY0xpc3RzID1cclxuICB8ICdDYW5kaWRhdGUnXHJcbiAgfCAnQ2xpZW50Q29udGFjdCdcclxuICB8ICdDbGllbnRDb3Jwb3JhdGlvbidcclxuICB8ICdKb2JPcmRlcidcclxuICB8ICdKb2JTdWJtaXNzaW9uJ1xyXG4gIHwgJ0pvYlBvc3RpbmcnXHJcbiAgfCAnUGxhY2VtZW50J1xyXG4gIHwgJ0xlYWQnXHJcbiAgfCAnT3Bwb3J0dW5pdHknO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXBwQnJpZGdlT3Blbkxpc3RFdmVudCB7XHJcbiAgdHlwZTogTW9zYWljTGlzdHM7XHJcbiAga2V5d29yZHM6IEFycmF5PHN0cmluZz47XHJcbiAgY3JpdGVyaWE6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTm92b0RhdGFUeXBlID0gJ2VudGl0bGVtZW50cycgfCAnc2V0dGluZ3MnIHwgJ3VzZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXBwQnJpZGdlUmVxdWVzdERhdGFFdmVudCB7XHJcbiAgdHlwZTogTm92b0RhdGFUeXBlO1xyXG59XHJcblxyXG5jb25zdCBIVFRQX1ZFUkJTID0ge1xyXG4gIEdFVDogJ2dldCcsXHJcbiAgUE9TVDogJ3Bvc3QnLFxyXG4gIFBVVDogJ3B1dCcsXHJcbiAgREVMRVRFOiAnZGVsZXRlJyxcclxufTtcclxuXHJcbmNvbnN0IE1FU1NBR0VfVFlQRVMgPSB7XHJcbiAgUkVHSVNURVI6ICdyZWdpc3RlcicsXHJcbiAgT1BFTjogJ29wZW4nLFxyXG4gIE9QRU5fTElTVDogJ29wZW5MaXN0JyxcclxuICBDTE9TRTogJ2Nsb3NlJyxcclxuICBSRUZSRVNIOiAncmVmcmVzaCcsXHJcbiAgUElOOiAncGluJyxcclxuICBVUERBVEU6ICd1cGRhdGUnLFxyXG4gIEhUVFBfR0VUOiAnaHR0cEdFVCcsXHJcbiAgSFRUUF9QT1NUOiAnaHR0cFBPU1QnLFxyXG4gIEhUVFBfUFVUOiAnaHR0cFBVVCcsXHJcbiAgSFRUUF9ERUxFVEU6ICdodHRwREVMRVRFJyxcclxuICBDVVNUT01fRVZFTlQ6ICdjdXN0b21FdmVudCcsXHJcbiAgUkVRVUVTVF9EQVRBOiAncmVxdWVzdERhdGEnLFxyXG4gIENBTExCQUNLOiAnY2FsbGJhY2snLFxyXG59O1xyXG5cclxuZGVjbGFyZSBjb25zdCBwb3N0Um9ib3Q6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBCcmlkZ2VTZXJ2aWNlIHtcclxuICBjcmVhdGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IEFwcEJyaWRnZShuYW1lKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZXZBcHBCcmlkZ2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcbiAgY3JlYXRlKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBEZXZBcHBCcmlkZ2UobmFtZSwgdGhpcy5odHRwKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBCcmlkZ2Uge1xyXG4gIHB1YmxpYyBpZDogc3RyaW5nID0gYCR7RGF0ZS5ub3coKX1gO1xyXG4gIHB1YmxpYyB0cmFjZU5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgd2luZG93TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIF9yZWdpc3RlcmVkRnJhbWVzID0gW107XHJcbiAgcHJpdmF0ZSBfaGFuZGxlcnMgPSB7fTtcclxuICBwcml2YXRlIF90cmFjaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZXZlbnRMaXN0ZW5lcnM6IGFueSA9IHt9O1xyXG5cclxuICAvLyBUeXBlP1xyXG4gIGNvbnN0cnVjdG9yKHRyYWNlTmFtZTogc3RyaW5nID0gJ0FwcEJyaWRnZScpIHtcclxuICAgIHRoaXMudHJhY2VOYW1lID0gdHJhY2VOYW1lO1xyXG4gICAgaWYgKHBvc3RSb2JvdCkge1xyXG4gICAgICBwb3N0Um9ib3QuQ09ORklHLkxPR19MRVZFTCA9ICdlcnJvcic7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5fc2V0dXBIYW5kbGVycygpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIC8vIE5vIG9wXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCB0cmFjaW5nKHRyYWNpbmc6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3RyYWNpbmcgPSB0cmFjaW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZSh0eXBlOiBBcHBCcmlkZ2VIYW5kbGVyLCBoYW5kbGVyOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5faGFuZGxlcnNbdHlwZV0gPSBoYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdHJhY2UoZXZlbnRUeXBlLCBldmVudCkge1xyXG4gICAgaWYgKHRoaXMuX3RyYWNpbmcpIHtcclxuICAgICAgY29uc29sZS5sb2coYFske3RoaXMudHJhY2VOYW1lIHx8IHRoaXMuaWR9XSBcIiR7ZXZlbnRUeXBlfVwiYCwgZXZlbnQpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3NldHVwSGFuZGxlcnMoKTogdm9pZCB7XHJcbiAgICAvLyBSZWdpc3RlclxyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuUkVHSVNURVIsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLlJFR0lTVEVSLCBldmVudCk7XHJcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMucHVzaChldmVudCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKGV2ZW50LmRhdGEpLnRoZW4oKHdpbmRvd05hbWUpID0+IHtcclxuICAgICAgICByZXR1cm4geyB3aW5kb3dOYW1lIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBVcGRhdGVcclxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLlVQREFURSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuVVBEQVRFLCBldmVudCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShldmVudC5kYXRhKS50aGVuKChzdWNjZXNzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzcyB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy8gT3BlblxyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuT1BFTiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuT1BFTiwgZXZlbnQpO1xyXG4gICAgICByZXR1cm4gdGhpcy5vcGVuKGV2ZW50LmRhdGEpLnRoZW4oKHN1Y2Nlc3MpID0+IHtcclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5PUEVOX0xJU1QsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLk9QRU5fTElTVCwgZXZlbnQpO1xyXG4gICAgICByZXR1cm4gdGhpcy5vcGVuTGlzdChldmVudC5kYXRhKS50aGVuKChzdWNjZXNzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzcyB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy8gQ2xvc2VcclxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLkNMT1NFLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5DTE9TRSwgZXZlbnQpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMuZmluZEluZGV4KChmcmFtZSkgPT4gZnJhbWUuZGF0YS5pZCA9PT0gZXZlbnQuZGF0YS5pZCk7XHJcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLl9yZWdpc3RlcmVkRnJhbWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuY2xvc2UoZXZlbnQuZGF0YSkudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3MgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIFJlZnJlc2hcclxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLlJFRlJFU0gsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLlJFRlJFU0gsIGV2ZW50KTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaChldmVudC5kYXRhKS50aGVuKChzdWNjZXNzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzcyB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy8gUElOXHJcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5QSU4sIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLlBJTiwgZXZlbnQpO1xyXG4gICAgICByZXR1cm4gdGhpcy5waW4oZXZlbnQuZGF0YSkudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3MgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIFJFUVVFU1RfREFUQVxyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuUkVRVUVTVF9EQVRBLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5SRVFVRVNUX0RBVEEsIGV2ZW50KTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdERhdGEoZXZlbnQuZGF0YSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVzdWx0LmRhdGEsIGVycm9yOiByZXN1bHQuZXJyb3IgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIENBTExCQUNLU1xyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuQ0FMTEJBQ0ssIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLkNBTExCQUNLLCBldmVudCk7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGV2ZW50LmRhdGEpLnRoZW4oKHN1Y2Nlc3MpID0+IHtcclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBIVFRQLUdFVFxyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuSFRUUF9HRVQsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLkhUVFBfR0VULCBldmVudCk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBHRVQoZXZlbnQuZGF0YS5yZWxhdGl2ZVVSTCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVzdWx0LmRhdGEsIGVycm9yOiByZXN1bHQuZXJyb3IgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIEhUVFAtUE9TVFxyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuSFRUUF9QT1NULCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5IVFRQX1BPU1QsIGV2ZW50KTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFBPU1QoZXZlbnQuZGF0YS5yZWxhdGl2ZVVSTCwgZXZlbnQuZGF0YS5kYXRhKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICByZXR1cm4geyBkYXRhOiByZXN1bHQuZGF0YSwgZXJyb3I6IHJlc3VsdC5lcnJvciB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy8gSFRUUC1QVVRcclxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLkhUVFBfUFVULCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5IVFRQX1BVVCwgZXZlbnQpO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwUFVUKGV2ZW50LmRhdGEucmVsYXRpdmVVUkwsIGV2ZW50LmRhdGEuZGF0YSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVzdWx0LmRhdGEsIGVycm9yOiByZXN1bHQuZXJyb3IgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIEhUVFAtREVMRVRFXHJcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5IVFRQX0RFTEVURSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuSFRUUF9ERUxFVEUsIGV2ZW50KTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cERFTEVURShldmVudC5kYXRhLnJlbGF0aXZlVVJMKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICByZXR1cm4geyBkYXRhOiByZXN1bHQuZGF0YSwgZXJyb3I6IHJlc3VsdC5lcnJvciB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy8gQ3VzdG9tIEV2ZW50c1xyXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuQ1VTVE9NX0VWRU5ULCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5DVVNUT01fRVZFTlQsIGV2ZW50KTtcclxuICAgICAgaWYgKHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50LmRhdGEuZXZlbnRdKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnQuZGF0YS5ldmVudF0uZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcclxuICAgICAgICAgIGxpc3RlbmVyKGV2ZW50LmRhdGEuZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMuZm9yRWFjaCgoZnJhbWUpID0+IHtcclxuICAgICAgICAgIHBvc3RSb2JvdC5zZW5kKGZyYW1lLnNvdXJjZSwgTUVTU0FHRV9UWVBFUy5DVVNUT01fRVZFTlQsIGV2ZW50LmRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIG9wZW4gZXZlbnRcclxuICAgKiBAcGFyYW0gcGFja2V0IGFueSAtIHBhY2tldCBvZiBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgb3BlbiBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvcGVuKHBhY2tldDogSUFwcEJyaWRnZU9wZW5FdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuT1BFTl0pIHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLk9QRU5dKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGFja2V0LCB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfSk7XHJcbiAgICAgICAgcG9zdFJvYm90XHJcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuT1BFTiwgcGFja2V0KVxyXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuT1BFTn0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEpIHtcclxuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gb3Blbkxpc3QgZXZlbnRcclxuICAgKiBAcGFyYW0gcGFja2V0IGFueSAtIHBhY2tldCBvZiBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgb3BlbiBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBvcGVuTGlzdChwYWNrZXQ6IFBhcnRpYWw8SUFwcEJyaWRnZU9wZW5MaXN0RXZlbnQ+KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5PUEVOX0xJU1RdKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5PUEVOX0xJU1RdKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG9wZW5MaXN0UGFja2V0ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcGVuTGlzdFBhY2tldCwgeyB0eXBlOiAnTGlzdCcsIGVudGl0eVR5cGU6IHBhY2tldC50eXBlLCBrZXl3b3JkczogcGFja2V0LmtleXdvcmRzLCBjcml0ZXJpYTogcGFja2V0LmNyaXRlcmlhIH0pO1xyXG4gICAgICAgIHBvc3RSb2JvdFxyXG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLk9QRU5fTElTVCwgcGFja2V0KVxyXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuT1BFTl9MSVNUfSAoY2FsbGJhY2spYCwgZXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBjbG9zZSBldmVudFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBjbG9zZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyB1cGRhdGUoXHJcbiAgICBwYWNrZXQ6IFBhcnRpYWw8eyBlbnRpdHlUeXBlOiBzdHJpbmc7IGVudGl0eUlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHRpdGxlS2V5OiBzdHJpbmc7IGNvbG9yOiBBbGxleUxpbmtDb2xvcnMgfT4sXHJcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5VUERBVEVdKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5VUERBVEVdKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGFja2V0LCB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfSk7XHJcbiAgICAgICAgcG9zdFJvYm90XHJcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuVVBEQVRFLCBwYWNrZXQpXHJcbiAgICAgICAgICAudGhlbigoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5VUERBVEV9IChjYWxsYmFjaylgLCBldmVudCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIGNsb3NlIGV2ZW50XHJcbiAgICovXHJcbiAgcHVibGljIGNsb3NlKHBhY2tldD86IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuQ0xPU0VdKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5DTE9TRV0ocGFja2V0LCAoc3VjY2VzczogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhY2tldCkge1xyXG4gICAgICAgICAgY29uc29sZS5pbmZvKCdbQXBwQnJpZGdlXSAtIGNsb3NlKHBhY2tldCkgaXMgZGVwcmVjYXRlZCEgUGxlYXNlIGp1c3QgdXNlIGNsb3NlKCkhJyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVhbFBhY2tldCA9IHsgaWQ6IHRoaXMuaWQsIHdpbmRvd05hbWU6IHRoaXMud2luZG93TmFtZSB9O1xyXG4gICAgICAgIHBvc3RSb2JvdFxyXG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLkNMT1NFLCByZWFsUGFja2V0KVxyXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuQ0xPU0V9IChjYWxsYmFjaylgLCBldmVudCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIGNsb3NlIGV2ZW50XHJcbiAgICovXHJcbiAgcHVibGljIHJlZnJlc2gocGFja2V0Pzogb2JqZWN0KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5SRUZSRVNIXSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUkVGUkVTSF0ocGFja2V0LCAoc3VjY2VzczogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHBhY2tldCkge1xyXG4gICAgICAgICAgY29uc29sZS5pbmZvKCdbQXBwQnJpZGdlXSAtIHJlZnJlc2gocGFja2V0KSBpcyBkZXByZWNhdGVkISBQbGVhc2UganVzdCB1c2UgcmVmcmVzaCgpIScpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlYWxQYWNrZXQgPSB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfTtcclxuICAgICAgICBwb3N0Um9ib3RcclxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5SRUZSRVNILCByZWFsUGFja2V0KVxyXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuUkVGUkVTSH0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEpIHtcclxuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYSBwaW4gZXZlbnRcclxuICAgKi9cclxuICBwdWJsaWMgcGluKHBhY2tldD86IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUElOXSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUElOXShwYWNrZXQsIChzdWNjZXNzOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocGFja2V0KSB7XHJcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ1tBcHBCcmlkZ2VdIC0gcGluKHBhY2tldCkgaXMgZGVwcmVjYXRlZCEgUGxlYXNlIGp1c3QgdXNlIHBpbigpIScpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlYWxQYWNrZXQgPSB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfTtcclxuICAgICAgICBwb3N0Um9ib3RcclxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5QSU4sIHJlYWxQYWNrZXQpXHJcbiAgICAgICAgICAudGhlbigoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5QSU59IChjYWxsYmFjaylgLCBldmVudCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGEgcmVxdWVzdERhdGEgZXZlbnRcclxuICAgKiBAcGFyYW0gcGFja2V0IGFueSAtIHBhY2tldCBvZiBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgcmVxdWVzdERhdGEgZXZlbnRcclxuICAgKi9cclxuICBwdWJsaWMgcmVxdWVzdERhdGEocGFja2V0OiB7IHR5cGU6IHN0cmluZyB9KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUkVRVUVTVF9EQVRBXSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUkVRVUVTVF9EQVRBXShwYWNrZXQsIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyBkYXRhIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHBhY2tldCwgeyBpZDogdGhpcy5pZCwgd2luZG93TmFtZTogdGhpcy53aW5kb3dOYW1lIH0pO1xyXG4gICAgICAgIHBvc3RSb2JvdFxyXG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLlJFUVVFU1RfREFUQSwgcGFja2V0KVxyXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuUkVRVUVTVF9EQVRBfSAoY2FsbGJhY2spYCwgZXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoeyBkYXRhOiBldmVudC5kYXRhLmRhdGEgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBhIGdlbmVyaWMgY2FsbGJhY2sgY29tbWFuZFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgc3RyaW5nIC0ga2V5OiBzdHJpbmcsIGdlbmVyaWM6IGJvb2xlYW5cclxuICAgKi9cclxuICBwdWJsaWMgY2FsbGJhY2socGFja2V0OiB7IGtleTogc3RyaW5nOyBnZW5lcmljOiBib29sZWFuOyBvcHRpb25zOiBvYmplY3QgfSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkNBTExCQUNLXSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuQ0FMTEJBQ0tdKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24ocGFja2V0LCB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfSk7XHJcbiAgICAgICAgcG9zdFJvYm90XHJcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuQ0FMTEJBQ0ssIHBhY2tldClcclxuICAgICAgICAgIC50aGVuKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFjZShgJHtNRVNTQUdFX1RZUEVTLkNBTExCQUNLfSAoY2FsbGJhY2spYCwgZXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiByZWdpc3RlciBldmVudFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZWdpc3RlcihwYWNrZXQ6IFBhcnRpYWw8eyB0aXRsZTogc3RyaW5nOyB1cmw6IHN0cmluZzsgY29sb3I6IEFsbGV5TGlua0NvbG9ycyB9PiA9IHt9KTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUkVHSVNURVJdKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5SRUdJU1RFUl0ocGFja2V0LCAod2luZG93TmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAod2luZG93TmFtZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHdpbmRvd05hbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHBhY2tldCwgeyBpZDogdGhpcy5pZCB9KTtcclxuICAgICAgICBwb3N0Um9ib3RcclxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5SRUdJU1RFUiwgcGFja2V0KVxyXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuUkVHSVNURVJ9IChjYWxsYmFjaylgLCBldmVudCk7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy53aW5kb3dOYW1lID0gZXZlbnQuZGF0YS53aW5kb3dOYW1lO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoZXZlbnQuZGF0YS53aW5kb3dOYW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5SRUdJU1RFUn0gLSBGQUlMRUQgLSAobm8gcGFyZW50KWAsIGVycik7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9HRVQgZXZlbnRcclxuICAgKiBAcGFyYW0gcGFja2V0IGFueSAtIHBhY2tldCBvZiBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgZXZlbnRcclxuICAgKi9cclxuICBwdWJsaWMgaHR0cEdFVChyZWxhdGl2ZVVSTDogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSAxMDAwMCk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkhUVFBdKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5IVFRQXSh7IHZlcmI6IEhUVFBfVkVSQlMuR0VULCByZWxhdGl2ZVVSTCB9LCAoZGF0YTogYW55LCBlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHsgZGF0YSwgZXJyb3IgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcG9zdFJvYm90XHJcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuSFRUUF9HRVQsIHsgcmVsYXRpdmVVUkwgfSwgeyB0aW1lb3V0IH0pXHJcbiAgICAgICAgICAudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogZXZlbnQuZGF0YS5kYXRhLCBlcnJvcjogZXZlbnQuZGF0YS5lcnJvciB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QobnVsbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBIVFRQX1BPU1QgZXZlbnRcclxuICAgKiBAcGFyYW0gcGFja2V0IGFueSAtIHBhY2tldCBvZiBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgZXZlbnRcclxuICAgKi9cclxuICBwdWJsaWMgaHR0cFBPU1QocmVsYXRpdmVVUkw6IHN0cmluZywgcG9zdERhdGE6IGFueSwgdGltZW91dDogbnVtYmVyID0gMTAwMDApOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5IVFRQXSkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuSFRUUF0oeyB2ZXJiOiBIVFRQX1ZFUkJTLlBPU1QsIHJlbGF0aXZlVVJMLCBkYXRhOiBwb3N0RGF0YSB9LCAoZGF0YTogYW55LCBlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHsgZGF0YSwgZXJyb3IgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcG9zdFJvYm90XHJcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuSFRUUF9QT1NULCB7IHJlbGF0aXZlVVJMLCBkYXRhOiBwb3N0RGF0YSB9LCB7IHRpbWVvdXQgfSlcclxuICAgICAgICAgIC50aGVuKChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyBkYXRhOiBldmVudC5kYXRhLmRhdGEsIGVycm9yOiBldmVudC5kYXRhLmVycm9yIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIEhUVFBfUFVUIGV2ZW50XHJcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XHJcbiAgICovXHJcbiAgcHVibGljIGh0dHBQVVQocmVsYXRpdmVVUkw6IHN0cmluZywgcHV0RGF0YTogYW55LCB0aW1lb3V0OiBudW1iZXIgPSAxMDAwMCk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkhUVFBdKSB7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5IVFRQXSh7IHZlcmI6IEhUVFBfVkVSQlMuUFVULCByZWxhdGl2ZVVSTCwgZGF0YTogcHV0RGF0YSB9LCAoZGF0YTogYW55LCBlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHsgZGF0YSwgZXJyb3IgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcG9zdFJvYm90XHJcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuSFRUUF9QVVQsIHsgcmVsYXRpdmVVUkwsIGRhdGE6IHB1dERhdGEgfSwgeyB0aW1lb3V0IH0pXHJcbiAgICAgICAgICAudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogZXZlbnQuZGF0YS5kYXRhLCBlcnJvcjogZXZlbnQuZGF0YS5lcnJvciB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QobnVsbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBIVFRQX0RFTEVURSBldmVudFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBodHRwREVMRVRFKHJlbGF0aXZlVVJMOiBzdHJpbmcsIHRpbWVvdXQ6IG51bWJlciA9IDEwMDAwKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuSFRUUF0pIHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkhUVFBdKHsgdmVyYjogSFRUUF9WRVJCUy5ERUxFVEUsIHJlbGF0aXZlVVJMIH0sIChkYXRhOiBhbnksIGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoeyBkYXRhLCBlcnJvciB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwb3N0Um9ib3RcclxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5IVFRQX0RFTEVURSwgeyByZWxhdGl2ZVVSTCB9LCB7IHRpbWVvdXQgfSlcclxuICAgICAgICAgIC50aGVuKChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyBkYXRhOiBldmVudC5kYXRhLmRhdGEsIGVycm9yOiBldmVudC5kYXRhLmVycm9yIH0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChudWxsKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmVzIGEgY3VzdG9tIGV2ZW50IHRvIGFueXdoZXJlIGluIHRoZSBhcHBsaWNhdGlvblxyXG4gICAqIEBwYXJhbSBldmVudCBzdHJpbmcgLSBldmVudCBuYW1lIHRvIGZpcmVcclxuICAgKiBAcGFyYW0gZGF0YSBhbnkgLSBkYXRhIHRvIGJlIHNlbnQgYWxvbmcgd2l0aCB0aGUgZXZlbnRcclxuICAgKi9cclxuICBwdWJsaWMgZmlyZUV2ZW50KGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHBvc3RSb2JvdFxyXG4gICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5DVVNUT01fRVZFTlQsIHsgZXZlbnQsIGRhdGEgfSlcclxuICAgICAgICAudGhlbigoZTogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIHJlamVjdChudWxsKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgYSBjdXN0b20gZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZnJhbWVzXHJcbiAgICogQHBhcmFtIGV2ZW50IHN0cmluZyAtIGV2ZW50IG5hbWUgdG8gZmlyZVxyXG4gICAqIEBwYXJhbSBkYXRhIGFueSAtIGRhdGEgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBmaXJlRXZlbnRUb0NoaWxkcmVuKGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLl9yZWdpc3RlcmVkRnJhbWVzLmZvckVhY2goKGZyYW1lKSA9PiB7XHJcbiAgICAgICAgcG9zdFJvYm90LnNlbmQoZnJhbWUuc291cmNlLCBNRVNTQUdFX1RZUEVTLkNVU1RPTV9FVkVOVCwge1xyXG4gICAgICAgICAgZXZlbnRUeXBlOiBldmVudCxcclxuICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byBhIGN1c3RvbSBldmVudFxyXG4gICAqIEBwYXJhbSBldmVudCBzdHJpbmcgLSBldmVudCBuYW1lIHRvIGxpc3RlbiB0b1xyXG4gICAqIEBwYXJhbSBjYWxsYmFjayBmdW5jdGlvbiAtIGNhbGxiYWNrIHRvIGJlIGZpcmVkIHdoZW4gYW4gZXZlbnQgaXMgY2F1Z2h0XHJcbiAgICovXHJcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XSkge1xyXG4gICAgICB0aGlzLl9ldmVudExpc3RlbmVyc1tldmVudF0gPSBbXTtcclxuICAgIH1cclxuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZXZBcHBCcmlkZ2UgZXh0ZW5kcyBBcHBCcmlkZ2Uge1xyXG4gIHByaXZhdGUgYmFzZVVSTDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0cmFjZU5hbWU6IHN0cmluZyA9ICdEZXZBcHBCcmlkZ2UnLCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgIHN1cGVyKHRyYWNlTmFtZSk7XHJcbiAgICBjb25zdCBjb29raWUgPSB0aGlzLmdldENvb2tpZSgnVWxFbmNvZGVkSWRlbnRpdHknKTtcclxuICAgIGlmIChjb29raWUgJiYgY29va2llLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBpZGVudGl0eSA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZSkpO1xyXG4gICAgICBjb25zdCBlbmRwb2ludHMgPSBpZGVudGl0eS5zZXNzaW9ucy5yZWR1Y2UoKG9iaiwgc2Vzc2lvbikgPT4ge1xyXG4gICAgICAgIG9ialtzZXNzaW9uLm5hbWVdID0gc2Vzc2lvbi52YWx1ZS5lbmRwb2ludDtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9LCB7fSk7XHJcbiAgICAgIHRoaXMuYmFzZVVSTCA9IGVuZHBvaW50cy5yZXN0O1xyXG4gICAgfVxyXG4gIH1cclxuICBwcm90ZWN0ZWQgX3NldHVwSGFuZGxlcnMoKTogdm9pZCB7fVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBIVFRQX0dFVCBldmVudFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBodHRwR0VUKHJlbGF0aXZlVVJMOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5iYXNlVVJMfS8ke3JlbGF0aXZlVVJMfWAsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9QT1NUIGV2ZW50XHJcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XHJcbiAgICovXHJcbiAgcHVibGljIGh0dHBQT1NUKHJlbGF0aXZlVVJMOiBzdHJpbmcsIHBvc3REYXRhOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMuYmFzZVVSTH0vJHtyZWxhdGl2ZVVSTH1gLCBwb3N0RGF0YSwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSkudG9Qcm9taXNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBIVFRQX1BVVCBldmVudFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBodHRwUFVUKHJlbGF0aXZlVVJMOiBzdHJpbmcsIHB1dERhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHt0aGlzLmJhc2VVUkx9LyR7cmVsYXRpdmVVUkx9YCwgcHV0RGF0YSwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSkudG9Qcm9taXNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBIVFRQX0RFTEVURSBldmVudFxyXG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBodHRwREVMRVRFKHJlbGF0aXZlVVJMOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7dGhpcy5iYXNlVVJMfS8ke3JlbGF0aXZlVVJMfWAsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDb29raWUoY25hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICBpZiAoZG9jdW1lbnQpIHtcclxuICAgICAgY29uc3QgbmFtZSA9IGAke2NuYW1lfT1gO1xyXG4gICAgICBjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGMgPSBjYVtpXTtcclxuICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xyXG4gICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19