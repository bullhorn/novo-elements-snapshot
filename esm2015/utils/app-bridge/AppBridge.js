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
    AppBridgeHandler[AppBridgeHandler["PING"] = 10] = "PING";
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
    PING: 'ping',
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
            return this.register(event.data).then(windowName => {
                return { windowName };
            });
        });
        // Update
        postRobot.on(MESSAGE_TYPES.UPDATE, (event) => {
            this._trace(MESSAGE_TYPES.UPDATE, event);
            return this.update(event.data).then(success => {
                return { success };
            });
        });
        // Open
        postRobot.on(MESSAGE_TYPES.OPEN, (event) => {
            this._trace(MESSAGE_TYPES.OPEN, event);
            return this.open(event.data).then(success => {
                return { success };
            });
        });
        postRobot.on(MESSAGE_TYPES.OPEN_LIST, (event) => {
            this._trace(MESSAGE_TYPES.OPEN_LIST, event);
            return this.openList(event.data).then(success => {
                return { success };
            });
        });
        // Close
        postRobot.on(MESSAGE_TYPES.CLOSE, (event) => {
            this._trace(MESSAGE_TYPES.CLOSE, event);
            const index = this._registeredFrames.findIndex(frame => frame.data.id === event.data.id);
            if (index !== -1) {
                this._registeredFrames.splice(index, 1);
            }
            return this.close(event.data).then(success => {
                return { success };
            });
        });
        // Refresh
        postRobot.on(MESSAGE_TYPES.REFRESH, (event) => {
            this._trace(MESSAGE_TYPES.REFRESH, event);
            return this.refresh(event.data).then(success => {
                return { success };
            });
        });
        // PIN
        postRobot.on(MESSAGE_TYPES.PIN, (event) => {
            this._trace(MESSAGE_TYPES.PIN, event);
            return this.pin(event.data).then(success => {
                return { success };
            });
        });
        // PING
        postRobot.on(MESSAGE_TYPES.PING, (event) => {
            this._trace(MESSAGE_TYPES.PING, event);
            return this.httpGET('ping').then(result => {
                return { data: result.data, error: result.error };
            });
        });
        // REQUEST_DATA
        postRobot.on(MESSAGE_TYPES.REQUEST_DATA, (event) => {
            this._trace(MESSAGE_TYPES.REQUEST_DATA, event);
            return this.requestData(event.data).then(result => {
                return { data: result.data, error: result.error };
            });
        });
        // CALLBACKS
        postRobot.on(MESSAGE_TYPES.CALLBACK, (event) => {
            this._trace(MESSAGE_TYPES.CALLBACK, event);
            return this.callback(event.data).then(success => {
                return { success };
            });
        });
        // HTTP-GET
        postRobot.on(MESSAGE_TYPES.HTTP_GET, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_GET, event);
            return this.httpGET(event.data.relativeURL).then(result => {
                return { data: result.data, error: result.error };
            });
        });
        // HTTP-POST
        postRobot.on(MESSAGE_TYPES.HTTP_POST, (event) => {
            this._trace(MESSAGE_TYPES.HTTP_POST, event);
            return this.httpPOST(event.data.relativeURL, event.data.data).then(result => {
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
            return this.httpDELETE(event.data.relativeURL).then(result => {
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
                this._registeredFrames.forEach(frame => {
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
    ping() {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.PING]) {
                this._handlers[AppBridgeHandler.PING]({}, (data, error) => {
                    resolve({ data, error });
                });
            }
            else {
                postRobot.sendToParent(MESSAGE_TYPES.PING, {}).then((event) => {
                    resolve({ data: event.data.data, error: event.data.error });
                }).catch((err) => {
                    reject(null);
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
            this._registeredFrames.forEach(frame => {
                postRobot.send(frame.source, MESSAGE_TYPES.CUSTOM_EVENT, {
                    event: event,
                    eventType: event,
                    data,
                });
            });
        }
    }
    /**
     * Fires a custom event to specified frames
     * @param source Window - specific iframe contentWindow
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEventToChild(source, event, data) {
        if (source instanceof HTMLIFrameElement) {
            source = source.contentWindow;
        }
        postRobot.send(source, MESSAGE_TYPES.CUSTOM_EVENT, { event, data });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwQnJpZGdlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3J1bm5lci93b3JrL25vdm8tZWxlbWVudHMvbm92by1lbGVtZW50cy9wcm9qZWN0cy9ub3ZvLWVsZW1lbnRzL3NyYy8iLCJzb3VyY2VzIjpbInV0aWxzL2FwcC1icmlkZ2UvQXBwQnJpZGdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBTixJQUFZLGdCQVlYO0FBWkQsV0FBWSxnQkFBZ0I7SUFDMUIsdURBQUksQ0FBQTtJQUNKLHVEQUFJLENBQUE7SUFDSixpRUFBUyxDQUFBO0lBQ1QseURBQUssQ0FBQTtJQUNMLDZEQUFPLENBQUE7SUFDUCxxREFBRyxDQUFBO0lBQ0gsK0RBQVEsQ0FBQTtJQUNSLDJEQUFNLENBQUE7SUFDTix1RUFBWSxDQUFBO0lBQ1osK0RBQVEsQ0FBQTtJQUNSLHdEQUFJLENBQUE7QUFDTixDQUFDLEVBWlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQVkzQjtBQW1FRCxNQUFNLFVBQVUsR0FBRztJQUNqQixHQUFHLEVBQUUsS0FBSztJQUNWLElBQUksRUFBRSxNQUFNO0lBQ1osR0FBRyxFQUFFLEtBQUs7SUFDVixNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUc7SUFDcEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsVUFBVTtJQUNyQixLQUFLLEVBQUUsT0FBTztJQUNkLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEdBQUcsRUFBRSxLQUFLO0lBQ1YsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsU0FBUztJQUNuQixTQUFTLEVBQUUsVUFBVTtJQUNyQixRQUFRLEVBQUUsU0FBUztJQUNuQixXQUFXLEVBQUUsWUFBWTtJQUN6QixZQUFZLEVBQUUsYUFBYTtJQUMzQixZQUFZLEVBQUUsYUFBYTtJQUMzQixRQUFRLEVBQUUsVUFBVTtDQUNy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QUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDekIsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMzQzthQUNGO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5HMlxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGVudW0gQXBwQnJpZGdlSGFuZGxlciB7XG4gIEhUVFAsXG4gIE9QRU4sXG4gIE9QRU5fTElTVCxcbiAgQ0xPU0UsXG4gIFJFRlJFU0gsXG4gIFBJTixcbiAgUkVHSVNURVIsXG4gIFVQREFURSxcbiAgUkVRVUVTVF9EQVRBLFxuICBDQUxMQkFDSyxcbiAgUElOR1xufVxuXG4vLyByZWNvcmQgICAgICAgLSBhbiBpbmRpdmlkdWFsIGVudGl0eSByZWNvcmRcbi8vIGFkZC9mYXN0LWFkZCAtIHRoZSBhZGQgcGFnZSBmb3IgYSBuZXcgcmVjb3JkXG4vLyBjdXN0b20gICAgICAgLSBjdXN0b20gYWN0aW9uIHRoYXQgb3BlbnMgdGhlIHVybCBwcm92aWRlZCBpbiBkYXRhLnVybFxuLy8gcHJldmlldyAgICAgIC0gdGhlIHByZXZpZXcgc2xpZGVvdXQgYXZhaWxhYmxlIG9ubHkgaW4gTm92b1xuZXhwb3J0IHR5cGUgTm92b0FwcHMgPSAncmVjb3JkJyB8ICdhZGQnIHwgJ2Zhc3QtYWRkJyB8ICdzbGlkZS1vdXQtYWRkJyB8ICdjdXN0b20nIHwgJ3ByZXZpZXcnO1xuXG5leHBvcnQgdHlwZSBBbGxleUxpbmtDb2xvcnMgPVxuICB8ICdwdXJwbGUnXG4gIHwgJ2dyZWVuJ1xuICB8ICdibHVlJ1xuICB8ICdsZWFkJ1xuICB8ICdjYW5kaWRhdGUnXG4gIHwgJ2NvbnRhY3QnXG4gIHwgJ2NvbXBhbnknXG4gIHwgJ29wcG9ydHVuaXR5J1xuICB8ICdqb2InXG4gIHwgJ2JpbGxhYmxlLWNoYXJnZSdcbiAgfCAnZWFybi1jb2RlJ1xuICB8ICdpbnZvaWNlLXN0YXRlbWVudCdcbiAgfCAnam9iLWNvZGUnXG4gIHwgJ3BheWFibGUtY2hhcmdlJ1xuICB8ICdzYWxlcy10YXgtcmF0ZSdcbiAgfCAndGF4LXJ1bGVzJ1xuICB8ICdzdWJtaXNzaW9uJ1xuICB8ICdwbGFjZW1lbnQnXG4gIHwgJ25hdmlnYXRpb24nXG4gIHwgJ2NhbnZhcydcbiAgfCAnbmV1dHJhbCdcbiAgfCAnbmV1dHJhbC1pdGFsaWMnXG4gIHwgJ2luaXRpYWwnXG4gIHwgJ2Rpc3RyaWJ1dGlvbkxpc3QnXG4gIHwgJ2NvbnRyYWN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJQXBwQnJpZGdlT3BlbkV2ZW50IHtcbiAgdHlwZTogTm92b0FwcHM7XG4gIGVudGl0eVR5cGU6IHN0cmluZztcbiAgZW50aXR5SWQ/OiBzdHJpbmc7XG4gIHRhYj86IHN0cmluZztcbiAgZGF0YT86IGFueTtcbiAgcGFzc3Rocm91Z2g/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1vc2FpY0xpc3RzID1cbiAgfCAnQ2FuZGlkYXRlJ1xuICB8ICdDbGllbnRDb250YWN0J1xuICB8ICdDbGllbnRDb3Jwb3JhdGlvbidcbiAgfCAnSm9iT3JkZXInXG4gIHwgJ0pvYlN1Ym1pc3Npb24nXG4gIHwgJ0pvYlBvc3RpbmcnXG4gIHwgJ1BsYWNlbWVudCdcbiAgfCAnTGVhZCdcbiAgfCAnT3Bwb3J0dW5pdHknO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBcHBCcmlkZ2VPcGVuTGlzdEV2ZW50IHtcbiAgdHlwZTogTW9zYWljTGlzdHM7XG4gIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+O1xuICBjcml0ZXJpYTogYW55O1xufVxuXG5leHBvcnQgdHlwZSBOb3ZvRGF0YVR5cGUgPSAnZW50aXRsZW1lbnRzJyB8ICdzZXR0aW5ncycgfCAndXNlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFwcEJyaWRnZVJlcXVlc3REYXRhRXZlbnQge1xuICB0eXBlOiBOb3ZvRGF0YVR5cGU7XG59XG5cbmNvbnN0IEhUVFBfVkVSQlMgPSB7XG4gIEdFVDogJ2dldCcsXG4gIFBPU1Q6ICdwb3N0JyxcbiAgUFVUOiAncHV0JyxcbiAgREVMRVRFOiAnZGVsZXRlJyxcbn07XG5cbmNvbnN0IE1FU1NBR0VfVFlQRVMgPSB7XG4gIFJFR0lTVEVSOiAncmVnaXN0ZXInLFxuICBPUEVOOiAnb3BlbicsXG4gIE9QRU5fTElTVDogJ29wZW5MaXN0JyxcbiAgQ0xPU0U6ICdjbG9zZScsXG4gIFJFRlJFU0g6ICdyZWZyZXNoJyxcbiAgUElOOiAncGluJyxcbiAgUElORzogJ3BpbmcnLFxuICBVUERBVEU6ICd1cGRhdGUnLFxuICBIVFRQX0dFVDogJ2h0dHBHRVQnLFxuICBIVFRQX1BPU1Q6ICdodHRwUE9TVCcsXG4gIEhUVFBfUFVUOiAnaHR0cFBVVCcsXG4gIEhUVFBfREVMRVRFOiAnaHR0cERFTEVURScsXG4gIENVU1RPTV9FVkVOVDogJ2N1c3RvbUV2ZW50JyxcbiAgUkVRVUVTVF9EQVRBOiAncmVxdWVzdERhdGEnLFxuICBDQUxMQkFDSzogJ2NhbGxiYWNrJyxcbn07XG5cbmRlY2xhcmUgY29uc3QgcG9zdFJvYm90OiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBBcHBCcmlkZ2VTZXJ2aWNlIHtcbiAgY3JlYXRlKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgQXBwQnJpZGdlKG5hbWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZXZBcHBCcmlkZ2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuICBjcmVhdGUobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBEZXZBcHBCcmlkZ2UobmFtZSwgdGhpcy5odHRwKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXBwQnJpZGdlIHtcbiAgcHVibGljIGlkOiBzdHJpbmcgPSBgJHtEYXRlLm5vdygpfWA7XG4gIHB1YmxpYyB0cmFjZU5hbWU6IHN0cmluZztcbiAgcHVibGljIHdpbmRvd05hbWU6IHN0cmluZztcblxuICBwcml2YXRlIF9yZWdpc3RlcmVkRnJhbWVzID0gW107XG4gIHByaXZhdGUgX2hhbmRsZXJzID0ge307XG4gIHByaXZhdGUgX3RyYWNpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZXZlbnRMaXN0ZW5lcnM6IGFueSA9IHt9O1xuXG4gIC8vIFR5cGU/XG4gIGNvbnN0cnVjdG9yKHRyYWNlTmFtZTogc3RyaW5nID0gJ0FwcEJyaWRnZScpIHtcbiAgICB0aGlzLnRyYWNlTmFtZSA9IHRyYWNlTmFtZTtcbiAgICBpZiAocG9zdFJvYm90KSB7XG4gICAgICBwb3N0Um9ib3QuQ09ORklHLkxPR19MRVZFTCA9ICdlcnJvcic7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9zZXR1cEhhbmRsZXJzKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBObyBvcFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldCB0cmFjaW5nKHRyYWNpbmc6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90cmFjaW5nID0gdHJhY2luZztcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGUodHlwZTogQXBwQnJpZGdlSGFuZGxlciwgaGFuZGxlcjogRnVuY3Rpb24pIHtcbiAgICB0aGlzLl9oYW5kbGVyc1t0eXBlXSA9IGhhbmRsZXI7XG4gIH1cblxuICBwcml2YXRlIF90cmFjZShldmVudFR5cGUsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX3RyYWNpbmcpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBbJHt0aGlzLnRyYWNlTmFtZSB8fCB0aGlzLmlkfV0gXCIke2V2ZW50VHlwZX1cImAsIGV2ZW50KTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfc2V0dXBIYW5kbGVycygpOiB2b2lkIHtcbiAgICAvLyBSZWdpc3RlclxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLlJFR0lTVEVSLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuUkVHSVNURVIsIGV2ZW50KTtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMucHVzaChldmVudCk7XG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihldmVudC5kYXRhKS50aGVuKHdpbmRvd05hbWUgPT4ge1xuICAgICAgICByZXR1cm4geyB3aW5kb3dOYW1lIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBVcGRhdGVcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5VUERBVEUsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5VUERBVEUsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShldmVudC5kYXRhKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBPcGVuXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuT1BFTiwgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLk9QRU4sIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLm9wZW4oZXZlbnQuZGF0YSkudGhlbihzdWNjZXNzID0+IHtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzcyB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuT1BFTl9MSVNULCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuT1BFTl9MSVNULCBldmVudCk7XG4gICAgICByZXR1cm4gdGhpcy5vcGVuTGlzdChldmVudC5kYXRhKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBDbG9zZVxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLkNMT1NFLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuQ0xPU0UsIGV2ZW50KTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fcmVnaXN0ZXJlZEZyYW1lcy5maW5kSW5kZXgoZnJhbWUgPT4gZnJhbWUuZGF0YS5pZCA9PT0gZXZlbnQuZGF0YS5pZCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNsb3NlKGV2ZW50LmRhdGEpLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3MgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIFJlZnJlc2hcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5SRUZSRVNILCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuUkVGUkVTSCwgZXZlbnQpO1xuICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaChldmVudC5kYXRhKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBQSU5cbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5QSU4sIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5QSU4sIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLnBpbihldmVudC5kYXRhKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBQSU5HXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuUElORywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLlBJTkcsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBHRVQoJ3BpbmcnKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3VsdC5kYXRhLCBlcnJvcjogcmVzdWx0LmVycm9yIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBSRVFVRVNUX0RBVEFcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5SRVFVRVNUX0RBVEEsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5SRVFVRVNUX0RBVEEsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3REYXRhKGV2ZW50LmRhdGEpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVzdWx0LmRhdGEsIGVycm9yOiByZXN1bHQuZXJyb3IgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIENBTExCQUNLU1xuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLkNBTExCQUNLLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuQ0FMTEJBQ0ssIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGV2ZW50LmRhdGEpLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3MgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIEhUVFAtR0VUXG4gICAgcG9zdFJvYm90Lm9uKE1FU1NBR0VfVFlQRVMuSFRUUF9HRVQsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5IVFRQX0dFVCwgZXZlbnQpO1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cEdFVChldmVudC5kYXRhLnJlbGF0aXZlVVJMKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3VsdC5kYXRhLCBlcnJvcjogcmVzdWx0LmVycm9yIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIVFRQLVBPU1RcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5IVFRQX1BPU1QsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fdHJhY2UoTUVTU0FHRV9UWVBFUy5IVFRQX1BPU1QsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBQT1NUKGV2ZW50LmRhdGEucmVsYXRpdmVVUkwsIGV2ZW50LmRhdGEuZGF0YSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4geyBkYXRhOiByZXN1bHQuZGF0YSwgZXJyb3I6IHJlc3VsdC5lcnJvciB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gSFRUUC1QVVRcbiAgICBwb3N0Um9ib3Qub24oTUVTU0FHRV9UWVBFUy5IVFRQX1BVVCwgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLkhUVFBfUFVULCBldmVudCk7XG4gICAgICByZXR1cm4gdGhpcy5odHRwUFVUKGV2ZW50LmRhdGEucmVsYXRpdmVVUkwsIGV2ZW50LmRhdGEuZGF0YSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3VsdC5kYXRhLCBlcnJvcjogcmVzdWx0LmVycm9yIH07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBIVFRQLURFTEVURVxuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLkhUVFBfREVMRVRFLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNlKE1FU1NBR0VfVFlQRVMuSFRUUF9ERUxFVEUsIGV2ZW50KTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBERUxFVEUoZXZlbnQuZGF0YS5yZWxhdGl2ZVVSTCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4geyBkYXRhOiByZXN1bHQuZGF0YSwgZXJyb3I6IHJlc3VsdC5lcnJvciB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gQ3VzdG9tIEV2ZW50c1xuICAgIHBvc3RSb2JvdC5vbihNRVNTQUdFX1RZUEVTLkNVU1RPTV9FVkVOVCwgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl90cmFjZShNRVNTQUdFX1RZUEVTLkNVU1RPTV9FVkVOVCwgZXZlbnQpO1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50LmRhdGEuZXZlbnRdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50LmRhdGEuZXZlbnRdLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgbGlzdGVuZXIoZXZlbnQuZGF0YS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZEZyYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyZWRGcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XG4gICAgICAgICAgcG9zdFJvYm90LnNlbmQoZnJhbWUuc291cmNlLCBNRVNTQUdFX1RZUEVTLkNVU1RPTV9FVkVOVCwgZXZlbnQuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIG9wZW4gZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIG9wZW4gZXZlbnRcbiAgICovXG4gIHB1YmxpYyBvcGVuKHBhY2tldDogSUFwcEJyaWRnZU9wZW5FdmVudCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5PUEVOXSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLk9QRU5dKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYWNrZXQsIHsgaWQ6IHRoaXMuaWQsIHdpbmRvd05hbWU6IHRoaXMud2luZG93TmFtZSB9KTtcbiAgICAgICAgcG9zdFJvYm90XG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLk9QRU4sIHBhY2tldClcbiAgICAgICAgICAudGhlbigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuT1BFTn0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gb3Blbkxpc3QgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIG9wZW4gZXZlbnRcbiAgICovXG4gIHB1YmxpYyBvcGVuTGlzdChwYWNrZXQ6IFBhcnRpYWw8SUFwcEJyaWRnZU9wZW5MaXN0RXZlbnQ+KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLk9QRU5fTElTVF0pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5PUEVOX0xJU1RdKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3Blbkxpc3RQYWNrZXQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcGVuTGlzdFBhY2tldCwgeyB0eXBlOiAnTGlzdCcsIGVudGl0eVR5cGU6IHBhY2tldC50eXBlLCBrZXl3b3JkczogcGFja2V0LmtleXdvcmRzLCBjcml0ZXJpYTogcGFja2V0LmNyaXRlcmlhIH0pO1xuICAgICAgICBwb3N0Um9ib3RcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuT1BFTl9MSVNULCBwYWNrZXQpXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmFjZShgJHtNRVNTQUdFX1RZUEVTLk9QRU5fTElTVH0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gY2xvc2UgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGNsb3NlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKFxuICAgIHBhY2tldDogUGFydGlhbDx7IGVudGl0eVR5cGU6IHN0cmluZzsgZW50aXR5SWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgdGl0bGVLZXk6IHN0cmluZzsgY29sb3I6IEFsbGV5TGlua0NvbG9ycyB9PixcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlVQREFURV0pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5VUERBVEVdKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYWNrZXQsIHsgaWQ6IHRoaXMuaWQsIHdpbmRvd05hbWU6IHRoaXMud2luZG93TmFtZSB9KTtcbiAgICAgICAgcG9zdFJvYm90XG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLlVQREFURSwgcGFja2V0KVxuICAgICAgICAgIC50aGVuKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5VUERBVEV9IChjYWxsYmFjaylgLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIGNsb3NlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgY2xvc2UocGFja2V0Pzogb2JqZWN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkNMT1NFXSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkNMT1NFXShwYWNrZXQsIChzdWNjZXNzOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYWNrZXQpIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ1tBcHBCcmlkZ2VdIC0gY2xvc2UocGFja2V0KSBpcyBkZXByZWNhdGVkISBQbGVhc2UganVzdCB1c2UgY2xvc2UoKSEnKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWxQYWNrZXQgPSB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfTtcbiAgICAgICAgcG9zdFJvYm90XG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLkNMT1NFLCByZWFsUGFja2V0KVxuICAgICAgICAgIC50aGVuKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5DTE9TRX0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gY2xvc2UgZXZlbnRcbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKHBhY2tldD86IG9iamVjdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5SRUZSRVNIXSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlJFRlJFU0hdKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnW0FwcEJyaWRnZV0gLSByZWZyZXNoKHBhY2tldCkgaXMgZGVwcmVjYXRlZCEgUGxlYXNlIGp1c3QgdXNlIHJlZnJlc2goKSEnKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWxQYWNrZXQgPSB7IGlkOiB0aGlzLmlkLCB3aW5kb3dOYW1lOiB0aGlzLndpbmRvd05hbWUgfTtcbiAgICAgICAgcG9zdFJvYm90XG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLlJFRlJFU0gsIHJlYWxQYWNrZXQpXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmFjZShgJHtNRVNTQUdFX1RZUEVTLlJFRlJFU0h9IChjYWxsYmFjaylgLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgICBwdWJsaWMgcGluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuUElOR10pIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlBJTkddKHt9LCAoZGF0YTogYW55LCBlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YSwgZXJyb3IgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zdFJvYm90LnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLlBJTkcsIHt9KS50aGVuKChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogZXZlbnQuZGF0YS5kYXRhLCBlcnJvcjogZXZlbnQuZGF0YS5lcnJvciB9KTtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobnVsbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYSBwaW4gZXZlbnRcbiAgICovXG4gIHB1YmxpYyBwaW4ocGFja2V0Pzogb2JqZWN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlBJTl0pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5QSU5dKHBhY2tldCwgKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnW0FwcEJyaWRnZV0gLSBwaW4ocGFja2V0KSBpcyBkZXByZWNhdGVkISBQbGVhc2UganVzdCB1c2UgcGluKCkhJyk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFsUGFja2V0ID0geyBpZDogdGhpcy5pZCwgd2luZG93TmFtZTogdGhpcy53aW5kb3dOYW1lIH07XG4gICAgICAgIHBvc3RSb2JvdFxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5QSU4sIHJlYWxQYWNrZXQpXG4gICAgICAgICAgLnRoZW4oKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmFjZShgJHtNRVNTQUdFX1RZUEVTLlBJTn0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYSByZXF1ZXN0RGF0YSBldmVudFxuICAgKiBAcGFyYW0gcGFja2V0IGFueSAtIHBhY2tldCBvZiBkYXRhIHRvIHNlbmQgd2l0aCB0aGUgcmVxdWVzdERhdGEgZXZlbnRcbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0RGF0YShwYWNrZXQ6IHsgdHlwZTogc3RyaW5nIH0pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlJFUVVFU1RfREFUQV0pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5SRVFVRVNUX0RBVEFdKHBhY2tldCwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YSB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYWNrZXQsIHsgaWQ6IHRoaXMuaWQsIHdpbmRvd05hbWU6IHRoaXMud2luZG93TmFtZSB9KTtcbiAgICAgICAgcG9zdFJvYm90XG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLlJFUVVFU1RfREFUQSwgcGFja2V0KVxuICAgICAgICAgIC50aGVuKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5SRVFVRVNUX0RBVEF9IChjYWxsYmFjaylgLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogZXZlbnQuZGF0YS5kYXRhIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgZ2VuZXJpYyBjYWxsYmFjayBjb21tYW5kXG4gICAqIEBwYXJhbSBwYWNrZXQgc3RyaW5nIC0ga2V5OiBzdHJpbmcsIGdlbmVyaWM6IGJvb2xlYW5cbiAgICovXG4gIHB1YmxpYyBjYWxsYmFjayhwYWNrZXQ6IHsga2V5OiBzdHJpbmc7IGdlbmVyaWM6IGJvb2xlYW47IG9wdGlvbnM6IG9iamVjdCB9KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5DQUxMQkFDS10pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5DQUxMQkFDS10ocGFja2V0LCAoc3VjY2VzczogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKHBhY2tldCwgeyBpZDogdGhpcy5pZCwgd2luZG93TmFtZTogdGhpcy53aW5kb3dOYW1lIH0pO1xuICAgICAgICBwb3N0Um9ib3RcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuQ0FMTEJBQ0ssIHBhY2tldClcbiAgICAgICAgICAudGhlbigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyYWNlKGAke01FU1NBR0VfVFlQRVMuQ0FMTEJBQ0t9IChjYWxsYmFjaylgLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIHJlZ2lzdGVyIGV2ZW50XG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyKHBhY2tldDogUGFydGlhbDx7IHRpdGxlOiBzdHJpbmc7IHVybDogc3RyaW5nOyBjb2xvcjogQWxsZXlMaW5rQ29sb3JzIH0+ID0ge30pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlJFR0lTVEVSXSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLlJFR0lTVEVSXShwYWNrZXQsICh3aW5kb3dOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAod2luZG93TmFtZSkge1xuICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3dOYW1lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihwYWNrZXQsIHsgaWQ6IHRoaXMuaWQgfSk7XG4gICAgICAgIHBvc3RSb2JvdFxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5SRUdJU1RFUiwgcGFja2V0KVxuICAgICAgICAgIC50aGVuKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2UoYCR7TUVTU0FHRV9UWVBFUy5SRUdJU1RFUn0gKGNhbGxiYWNrKWAsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICAgIHRoaXMud2luZG93TmFtZSA9IGV2ZW50LmRhdGEud2luZG93TmFtZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZShldmVudC5kYXRhLndpbmRvd05hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmFjZShgJHtNRVNTQUdFX1RZUEVTLlJFR0lTVEVSfSAtIEZBSUxFRCAtIChubyBwYXJlbnQpYCwgZXJyKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIEhUVFBfR0VUIGV2ZW50XG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgcHVibGljIGh0dHBHRVQocmVsYXRpdmVVUkw6IHN0cmluZywgdGltZW91dDogbnVtYmVyID0gMTAwMDApOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkhUVFBdKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuSFRUUF0oeyB2ZXJiOiBIVFRQX1ZFUkJTLkdFVCwgcmVsYXRpdmVVUkwgfSwgKGRhdGE6IGFueSwgZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoeyBkYXRhLCBlcnJvciB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3N0Um9ib3RcbiAgICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuSFRUUF9HRVQsIHsgcmVsYXRpdmVVUkwgfSwgeyB0aW1lb3V0IH0pXG4gICAgICAgICAgLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoeyBkYXRhOiBldmVudC5kYXRhLmRhdGEsIGVycm9yOiBldmVudC5kYXRhLmVycm9yIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChudWxsKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBvciByZXNwb25kcyB0byBhbiBIVFRQX1BPU1QgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaHR0cFBPU1QocmVsYXRpdmVVUkw6IHN0cmluZywgcG9zdERhdGE6IGFueSwgdGltZW91dDogbnVtYmVyID0gMTAwMDApOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkhUVFBdKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuSFRUUF0oeyB2ZXJiOiBIVFRQX1ZFUkJTLlBPU1QsIHJlbGF0aXZlVVJMLCBkYXRhOiBwb3N0RGF0YSB9LCAoZGF0YTogYW55LCBlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh7IGRhdGEsIGVycm9yIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc3RSb2JvdFxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5IVFRQX1BPU1QsIHsgcmVsYXRpdmVVUkwsIGRhdGE6IHBvc3REYXRhIH0sIHsgdGltZW91dCB9KVxuICAgICAgICAgIC50aGVuKChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogZXZlbnQuZGF0YS5kYXRhLCBlcnJvcjogZXZlbnQuZGF0YS5lcnJvciB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobnVsbCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9QVVQgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaHR0cFBVVChyZWxhdGl2ZVVSTDogc3RyaW5nLCBwdXREYXRhOiBhbnksIHRpbWVvdXQ6IG51bWJlciA9IDEwMDAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5IVFRQXSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVyc1tBcHBCcmlkZ2VIYW5kbGVyLkhUVFBdKHsgdmVyYjogSFRUUF9WRVJCUy5QVVQsIHJlbGF0aXZlVVJMLCBkYXRhOiBwdXREYXRhIH0sIChkYXRhOiBhbnksIGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHsgZGF0YSwgZXJyb3IgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zdFJvYm90XG4gICAgICAgICAgLnNlbmRUb1BhcmVudChNRVNTQUdFX1RZUEVTLkhUVFBfUFVULCB7IHJlbGF0aXZlVVJMLCBkYXRhOiBwdXREYXRhIH0sIHsgdGltZW91dCB9KVxuICAgICAgICAgIC50aGVuKChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogZXZlbnQuZGF0YS5kYXRhLCBlcnJvcjogZXZlbnQuZGF0YS5lcnJvciB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobnVsbCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9ERUxFVEUgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaHR0cERFTEVURShyZWxhdGl2ZVVSTDogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSAxMDAwMCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2hhbmRsZXJzW0FwcEJyaWRnZUhhbmRsZXIuSFRUUF0pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlcnNbQXBwQnJpZGdlSGFuZGxlci5IVFRQXSh7IHZlcmI6IEhUVFBfVkVSQlMuREVMRVRFLCByZWxhdGl2ZVVSTCB9LCAoZGF0YTogYW55LCBlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh7IGRhdGEsIGVycm9yIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc3RSb2JvdFxuICAgICAgICAgIC5zZW5kVG9QYXJlbnQoTUVTU0FHRV9UWVBFUy5IVFRQX0RFTEVURSwgeyByZWxhdGl2ZVVSTCB9LCB7IHRpbWVvdXQgfSlcbiAgICAgICAgICAudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh7IGRhdGE6IGV2ZW50LmRhdGEuZGF0YSwgZXJyb3I6IGV2ZW50LmRhdGEuZXJyb3IgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG51bGwpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3VzdG9tIGV2ZW50IHRvIGFueXdoZXJlIGluIHRoZSBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0gZXZlbnQgc3RyaW5nIC0gZXZlbnQgbmFtZSB0byBmaXJlXG4gICAqIEBwYXJhbSBkYXRhIGFueSAtIGRhdGEgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgcHVibGljIGZpcmVFdmVudChldmVudDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHBvc3RSb2JvdFxuICAgICAgICAuc2VuZFRvUGFyZW50KE1FU1NBR0VfVFlQRVMuQ1VTVE9NX0VWRU5ULCB7IGV2ZW50LCBkYXRhIH0pXG4gICAgICAgIC50aGVuKChlOiBhbnkpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjdXN0b20gZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZnJhbWVzXG4gICAqIEBwYXJhbSBldmVudCBzdHJpbmcgLSBldmVudCBuYW1lIHRvIGZpcmVcbiAgICogQHBhcmFtIGRhdGEgYW55IC0gZGF0YSB0byBiZSBzZW50IGFsb25nIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgZmlyZUV2ZW50VG9DaGlsZHJlbihldmVudDogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZEZyYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9yZWdpc3RlcmVkRnJhbWVzLmZvckVhY2goZnJhbWUgPT4ge1xuICAgICAgICBwb3N0Um9ib3Quc2VuZChmcmFtZS5zb3VyY2UsIE1FU1NBR0VfVFlQRVMuQ1VTVE9NX0VWRU5ULCB7XG4gICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgIGV2ZW50VHlwZTogZXZlbnQsXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIGEgY3VzdG9tIGV2ZW50IHRvIHNwZWNpZmllZCBmcmFtZXNcbiAgICAgKiBAcGFyYW0gc291cmNlIFdpbmRvdyAtIHNwZWNpZmljIGlmcmFtZSBjb250ZW50V2luZG93XG4gICAgICogQHBhcmFtIGV2ZW50IHN0cmluZyAtIGV2ZW50IG5hbWUgdG8gZmlyZVxuICAgICAqIEBwYXJhbSBkYXRhIGFueSAtIGRhdGEgdG8gYmUgc2VudCBhbG9uZyB3aXRoIHRoZSBldmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBmaXJlRXZlbnRUb0NoaWxkKHNvdXJjZTogV2luZG93IHwgSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQge1xuICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS5jb250ZW50V2luZG93O1xuICAgICAgfVxuICAgICAgcG9zdFJvYm90LnNlbmQoc291cmNlLCBNRVNTQUdFX1RZUEVTLkNVU1RPTV9FVkVOVCwgeyBldmVudCwgZGF0YSB9KTtcbiAgICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBjdXN0b20gZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IHN0cmluZyAtIGV2ZW50IG5hbWUgdG8gbGlzdGVuIHRvXG4gICAqIEBwYXJhbSBjYWxsYmFjayBmdW5jdGlvbiAtIGNhbGxiYWNrIHRvIGJlIGZpcmVkIHdoZW4gYW4gZXZlbnQgaXMgY2F1Z2h0XG4gICAqL1xuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGV2QXBwQnJpZGdlIGV4dGVuZHMgQXBwQnJpZGdlIHtcbiAgcHJpdmF0ZSBiYXNlVVJMOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IodHJhY2VOYW1lOiBzdHJpbmcgPSAnRGV2QXBwQnJpZGdlJywgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgc3VwZXIodHJhY2VOYW1lKTtcbiAgICBjb25zdCBjb29raWUgPSB0aGlzLmdldENvb2tpZSgnVWxFbmNvZGVkSWRlbnRpdHknKTtcbiAgICBpZiAoY29va2llICYmIGNvb2tpZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoY29va2llKSk7XG4gICAgICBjb25zdCBlbmRwb2ludHMgPSBpZGVudGl0eS5zZXNzaW9ucy5yZWR1Y2UoKG9iaiwgc2Vzc2lvbikgPT4ge1xuICAgICAgICBvYmpbc2Vzc2lvbi5uYW1lXSA9IHNlc3Npb24udmFsdWUuZW5kcG9pbnQ7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LCB7fSk7XG4gICAgICB0aGlzLmJhc2VVUkwgPSBlbmRwb2ludHMucmVzdDtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9zZXR1cEhhbmRsZXJzKCk6IHZvaWQge31cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9HRVQgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaHR0cEdFVChyZWxhdGl2ZVVSTDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLmJhc2VVUkx9LyR7cmVsYXRpdmVVUkx9YCwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSkudG9Qcm9taXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9QT1NUIGV2ZW50XG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgcHVibGljIGh0dHBQT1NUKHJlbGF0aXZlVVJMOiBzdHJpbmcsIHBvc3REYXRhOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmJhc2VVUkx9LyR7cmVsYXRpdmVVUkx9YCwgcG9zdERhdGEsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIG9yIHJlc3BvbmRzIHRvIGFuIEhUVFBfUFVUIGV2ZW50XG4gICAqIEBwYXJhbSBwYWNrZXQgYW55IC0gcGFja2V0IG9mIGRhdGEgdG8gc2VuZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgcHVibGljIGh0dHBQVVQocmVsYXRpdmVVUkw6IHN0cmluZywgcHV0RGF0YTogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHt0aGlzLmJhc2VVUkx9LyR7cmVsYXRpdmVVUkx9YCwgcHV0RGF0YSwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSkudG9Qcm9taXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgb3IgcmVzcG9uZHMgdG8gYW4gSFRUUF9ERUxFVEUgZXZlbnRcbiAgICogQHBhcmFtIHBhY2tldCBhbnkgLSBwYWNrZXQgb2YgZGF0YSB0byBzZW5kIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgaHR0cERFTEVURShyZWxhdGl2ZVVSTDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHt0aGlzLmJhc2VVUkx9LyR7cmVsYXRpdmVVUkx9YCwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSkudG9Qcm9taXNlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvb2tpZShjbmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBgJHtjbmFtZX09YDtcbiAgICAgIGNvbnN0IGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBjID0gY2FbaV07XG4gICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjLmluZGV4T2YobmFtZSkgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==