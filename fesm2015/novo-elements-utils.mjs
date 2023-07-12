import { isDate, format, addDays, addWeeks, addMonths, startOfMinute, startOfDay, startOfWeek, startOfMonth, endOfDay, endOfWeek, endOfMonth, isSameDay, isSameMonth, isSameSecond, differenceInSeconds, differenceInCalendarDays, differenceInDays, isWithinInterval, getMonth, getYear, setMinutes, setHours, isBefore, isAfter, addMinutes, getDay, differenceInMinutes, addHours } from 'date-fns';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { TemplateRef, isDevMode, EventEmitter, Injectable } from '@angular/core';

var AppBridgeHandler;
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
class AppBridgeService {
    create(name) {
        return new AppBridge(name);
    }
}
class DevAppBridgeService {
    constructor(http) {
        this.http = http;
    }
    create(name) {
        return new DevAppBridge(name, this.http);
    }
}
class AppBridge {
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
        // PING
        postRobot.on(MESSAGE_TYPES.PING, (event) => {
            this._trace(MESSAGE_TYPES.PING, event);
            return this.httpGET('ping').then((result) => {
                return { data: result.data, error: result.error };
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
    ping() {
        return new Promise((resolve, reject) => {
            if (this._handlers[AppBridgeHandler.PING]) {
                this._handlers[AppBridgeHandler.PING]({}, (data, error) => {
                    resolve({ data, error });
                });
            }
            else {
                postRobot
                    .sendToParent(MESSAGE_TYPES.PING, {})
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
                    event,
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
class DevAppBridge extends AppBridge {
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

/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
const tokensMap = {
    // 'D MMMM': '',
    // 'Do MMMM': '',
    // 'DD MMMM': '',
    M: 'L',
    Mo: 'Mo',
    MM: 'LL',
    MMM: 'LLL',
    MMMM: 'LLLL',
    Q: 'q',
    Qo: 'qo',
    D: 'd',
    Do: 'do',
    DD: 'dd',
    DDD: 'D',
    DDDo: 'Do',
    DDDD: 'DDD',
    d: 'i',
    do: 'io',
    dd: 'iiiiii',
    ddd: 'iii',
    dddd: 'iiii',
    A: 'a',
    a: 'a',
    aa: 'aaaa',
    E: 'i',
    W: 'I',
    Wo: 'Io',
    WW: 'II',
    YY: 'yy',
    YYYY: 'yyyy',
    GG: 'RR',
    GGGG: 'RRRR',
    H: 'H',
    HH: 'HH',
    h: 'h',
    hh: 'hh',
    m: 'm',
    mm: 'mm',
    s: 's',
    ss: 'ss',
    S: 'S',
    SS: 'SS',
    SSS: 'SSS',
    Z: 'xxx',
    ZZ: 'xx',
    X: 't',
    x: 'T'
};
const v1tokens = Object.keys(tokensMap)
    .sort()
    .reverse();
const tokensRegExp = new RegExp('(\\[[^\\[]*\\])|(\\\\)?' + '(' + v1tokens.join('|') + '|.)', 'g');
function convertTokens(format) {
    const tokensCaptures = format.match(tokensRegExp);
    if (tokensCaptures) {
        return tokensCaptures
            .reduce((acc, tokenString, index) => {
            const v2token = tokensMap[tokenString];
            if (!v2token) {
                const escapedCaptures = tokenString.match(/^\[(.+)\]$/);
                if (escapedCaptures) {
                    acc.textBuffer.push(escapedCaptures[1]);
                }
                else {
                    acc.textBuffer.push(tokenString);
                }
            }
            const endOfString = index === tokensCaptures.length - 1;
            if (acc.textBuffer.length && (v2token || endOfString)) {
                acc.formatBuffer.push(`'${acc.textBuffer.join('')}'`);
                acc.textBuffer = [];
            }
            if (v2token)
                acc.formatBuffer.push(v2token);
            return acc;
        }, { formatBuffer: [], textBuffer: [] })
            .formatBuffer.join('');
    }
    else {
        return format;
    }
}

/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const DEFAULT_ADDITIONAL_DIGITS = 2;
const parseTokenDateTimeDelimeter = /[T ]/;
const parseTokenPlainTime = /:/;
// year tokens
const parseTokenYY = /^(\d{2})$/;
const parseTokensYYY = [
    /^([+-]\d{2})$/,
    /^([+-]\d{3})$/,
    /^([+-]\d{4})$/ // 2 additional digits
];
const parseTokenYYYY = /^(\d{4})/;
const parseTokensYYYYY = [
    /^([+-]\d{4})/,
    /^([+-]\d{5})/,
    /^([+-]\d{6})/ // 2 additional digits
];
// date tokens
const parseTokenMM = /^-(\d{2})$/;
const parseTokenDDD = /^-?(\d{3})$/;
const parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
const parseTokenWww = /^-?W(\d{2})$/;
const parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;
// time tokens
const parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
const parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
const parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;
// timezone tokens
const parseTokenTimezone = /([Z+-].*)$/;
const parseTokenTimezoneZ = /^(Z)$/;
const parseTokenTimezoneHH = /^([+-])(\d{2})$/;
const parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;
function legacyParse(argument, options = {}) {
    if (isDate(argument)) {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
    }
    else if (typeof argument !== 'string') {
        return new Date(argument);
    }
    const additionalDigits = options.additionalDigits == null
        ? DEFAULT_ADDITIONAL_DIGITS
        : Number(options.additionalDigits);
    const dateStrings = splitDateString(argument);
    const parseYearResult = parseYear(dateStrings.date || '', additionalDigits);
    const year = parseYearResult.year;
    const restDateString = parseYearResult.restDateString;
    const date = parseDate(restDateString || '', year);
    if (date) {
        const timestamp = date.getTime();
        let time = 0;
        let offset;
        if (dateStrings.time) {
            time = parseTime(dateStrings.time) || 0;
        }
        if (dateStrings.timezone) {
            offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE;
        }
        else {
            const fullTime = timestamp + time;
            const fullTimeDate = new Date(fullTime);
            offset = getTimezoneOffsetInMilliseconds(fullTimeDate);
            // Adjust time when it's coming from DST
            const fullTimeDateNextDay = new Date(fullTime);
            fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1);
            const offsetDiff = getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -
                getTimezoneOffsetInMilliseconds(fullTimeDate);
            if (offsetDiff > 0) {
                offset += offsetDiff;
            }
        }
        return new Date(timestamp + time + offset);
    }
    else {
        return new Date(argument);
    }
}
function splitDateString(dateString) {
    const array = dateString.split(parseTokenDateTimeDelimeter);
    let timeString, date, time, timezone;
    if (parseTokenPlainTime.test(array[0])) {
        date = undefined;
        timeString = array[0];
    }
    else {
        date = array[0];
        timeString = array[1];
    }
    if (timeString) {
        const token = parseTokenTimezone.exec(timeString);
        if (token) {
            time = timeString.replace(token[1], '');
            timezone = token[1];
        }
        else {
            time = timeString;
        }
    }
    return {
        date,
        time,
        timezone
    };
}
function parseYear(dateString, additionalDigits) {
    const parseTokenYYY = parseTokensYYY[additionalDigits];
    const parseTokenYYYYY = parseTokensYYYYY[additionalDigits];
    let token;
    // YYYY or ±YYYYY
    token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
    if (token) {
        const yearString = token[1];
        return {
            year: parseInt(yearString, 10),
            restDateString: dateString.slice(yearString.length)
        };
    }
    // YY or ±YYY
    token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
    if (token) {
        const centuryString = token[1];
        return {
            year: parseInt(centuryString, 10) * 100,
            restDateString: dateString.slice(centuryString.length)
        };
    }
    // Invalid ISO-formatted year
    return {
        year: null
    };
}
function parseDate(dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) {
        return null;
    }
    let token;
    let date;
    let month;
    let week;
    // YYYY
    if (dateString.length === 0) {
        date = new Date(0);
        date.setUTCFullYear(year);
        return date;
    }
    // YYYY-MM
    token = parseTokenMM.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        date.setUTCFullYear(year, month);
        return date;
    }
    // YYYY-DDD or YYYYDDD
    token = parseTokenDDD.exec(dateString);
    if (token) {
        date = new Date(0);
        const dayOfYear = parseInt(token[1], 10);
        date.setUTCFullYear(year, 0, dayOfYear);
        return date;
    }
    // YYYY-MM-DD or YYYYMMDD
    token = parseTokenMMDD.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        const day = parseInt(token[2], 10);
        date.setUTCFullYear(year, month, day);
        return date;
    }
    // YYYY-Www or YYYYWww
    token = parseTokenWww.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        return dayOfISOYear(year, week);
    }
    // YYYY-Www-D or YYYYWwwD
    token = parseTokenWwwD.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        const dayOfWeek = parseInt(token[2], 10) - 1;
        return dayOfISOYear(year, week, dayOfWeek);
    }
    // Invalid ISO-formatted date
    return null;
}
function parseTime(timeString) {
    let token;
    let hours;
    let minutes;
    // hh
    token = parseTokenHH.exec(timeString);
    if (token) {
        hours = parseFloat(token[1].replace(',', '.'));
        return (hours % 24) * MILLISECONDS_IN_HOUR;
    }
    // hh:mm or hhmm
    token = parseTokenHHMM.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseFloat(token[2].replace(',', '.'));
        return ((hours % 24) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE);
    }
    // hh:mm:ss or hhmmss
    token = parseTokenHHMMSS.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseInt(token[2], 10);
        const seconds = parseFloat(token[3].replace(',', '.'));
        return ((hours % 24) * MILLISECONDS_IN_HOUR +
            minutes * MILLISECONDS_IN_MINUTE +
            seconds * 1000);
    }
    // Invalid ISO-formatted time
    return null;
}
function parseTimezone(timezoneString) {
    let token;
    let absoluteOffset;
    // Z
    token = parseTokenTimezoneZ.exec(timezoneString);
    if (token) {
        return 0;
    }
    // ±hh
    token = parseTokenTimezoneHH.exec(timezoneString);
    if (token) {
        absoluteOffset = parseInt(token[2], 10) * 60;
        return token[1] === '+' ? -absoluteOffset : absoluteOffset;
    }
    // ±hh:mm or ±hhmm
    token = parseTokenTimezoneHHMM.exec(timezoneString);
    if (token) {
        absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
        return token[1] === '+' ? -absoluteOffset : absoluteOffset;
    }
    return 0;
}
function dayOfISOYear(isoYear, week = 0, day = 0) {
    const date = new Date(0);
    date.setUTCFullYear(isoYear, 0, 4);
    const fourthOfJanuaryDay = date.getUTCDay() || 7;
    const diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}
function getTimezoneOffsetInMilliseconds(dirtyDate) {
    const date = new Date(dirtyDate.getTime());
    const baseTimezoneOffset = date.getTimezoneOffset();
    date.setSeconds(0, 0);
    const millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;
    return (baseTimezoneOffset * MILLISECONDS_IN_MINUTE +
        millisecondsPartOfTimezoneOffset);
}

/**
 * This DateUtil is a wrapper for calling new date-fns v2 functions with existing legacy
 * v1 function calls without having to refactor too much code and potentially introduce
 * breaking changes.
 *
 * The old calls generally called date-fns functions with loosely-typed date values, often
 * of type DateLike (Date | string | number). This was a problem when upgrading to date-fns
 * v2 since functions are now typed more strongly and no longer accept strings.
 *
 * If you are adding a new component/feature and looking here to add a new date-fns wrapper
 * function, strongly consider not doing that and instead refactoring your code to not use
 * DateLike, and calling the date-fns function(s) directly.
 **/
class DateUtil {
    static getDateFromAnyType(date) {
        return legacyParse(date);
    }
    static getWeekDayFromNumber(weekDay) {
        if (0 <= weekDay && weekDay <= 6) {
            return weekDay;
        }
        else {
            console.warn('Invalid weekDay value:', weekDay);
            return 0;
        }
    }
    static parse(date, options) {
        return legacyParse(date, options);
    }
    static format(date, formatString) {
        if (!date) {
            return '';
        }
        date = this.getDateFromAnyType(date);
        formatString = convertTokens(formatString);
        return format(date, formatString);
    }
    static addDays(date, days) {
        date = this.getDateFromAnyType(date);
        return addDays(date, days);
    }
    static addWeeks(date, weeks) {
        date = this.getDateFromAnyType(date);
        return addWeeks(date, weeks);
    }
    static addMonths(date, months) {
        date = this.getDateFromAnyType(date);
        return addMonths(date, months);
    }
    static startOfMinute(date) {
        date = this.getDateFromAnyType(date);
        return startOfMinute(date);
    }
    static startOfDay(date) {
        date = this.getDateFromAnyType(date);
        return startOfDay(date);
    }
    static startOfWeek(date, options) {
        date = this.getDateFromAnyType(date);
        if (options === null || options === void 0 ? void 0 : options.weekStartsOn) {
            options.weekStartsOn = this.getWeekDayFromNumber(options.weekStartsOn);
        }
        return startOfWeek(date, options);
    }
    static startOfMonth(date) {
        date = this.getDateFromAnyType(date);
        return startOfMonth(date);
    }
    static endOfDay(date) {
        date = this.getDateFromAnyType(date);
        return endOfDay(date);
    }
    static endOfWeek(date, options) {
        date = this.getDateFromAnyType(date);
        if (options === null || options === void 0 ? void 0 : options.weekStartsOn) {
            options.weekStartsOn = this.getWeekDayFromNumber(options.weekStartsOn);
        }
        return endOfWeek(date, options);
    }
    static endOfMonth(date) {
        date = this.getDateFromAnyType(date);
        return endOfMonth(date);
    }
    static isSameDay(dateLeft, dateRight) {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameDay(dateLeft, dateRight);
    }
    static isSameMonth(dateLeft, dateRight) {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameMonth(dateLeft, dateRight);
    }
    static isSameSecond(dateLeft, dateRight) {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameSecond(dateLeft, dateRight);
    }
    static differenceInSeconds(date, start) {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInSeconds(date, start);
    }
    static differenceInCalendarDays(date, start) {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInCalendarDays(date, start);
    }
    static differenceInDays(date, start) {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInDays(date, start);
    }
    static isWithinRange(date, start, end) {
        date = this.getDateFromAnyType(date);
        const interval = {
            start: this.getDateFromAnyType(start),
            end: this.getDateFromAnyType(end),
        };
        /**
         * Need extra error handling here to retain backwards compatibility because the new
         * isWithinInterval replacement function throws an error for Invalid Dates and Invalid
         * Intervals instead of returning true or false.
         **/
        try {
            return isWithinInterval(date, interval);
        }
        catch (e) {
            console.warn(e.toString());
            return false;
        }
    }
    static getMonth(date) {
        date = this.getDateFromAnyType(date);
        return getMonth(date);
    }
    static getYear(date) {
        date = this.getDateFromAnyType(date);
        return getYear(date);
    }
    static setMinutes(date, minutes) {
        date = this.getDateFromAnyType(date);
        return setMinutes(date, minutes);
    }
    static setHours(date, hours) {
        date = this.getDateFromAnyType(date);
        return setHours(date, hours);
    }
    static isBefore(date, minDate) {
        date = this.getDateFromAnyType(date);
        return isBefore(date, minDate);
    }
    static isAfter(date, maxDate) {
        date = this.getDateFromAnyType(date);
        return isAfter(date, maxDate);
    }
}

class DateRange {
    constructor(
    /** The start date of the range. */
    start, 
    /** The end date of the range. */
    end) {
        this.start = start;
        this.end = end;
    }
}

const WEEKEND_DAY_NUMBERS = [0, 6];
const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
var CalendarEventResponse;
(function (CalendarEventResponse) {
    CalendarEventResponse[CalendarEventResponse["Maybe"] = 0] = "Maybe";
    CalendarEventResponse[CalendarEventResponse["Accepted"] = 1] = "Accepted";
    CalendarEventResponse[CalendarEventResponse["Rejected"] = 2] = "Rejected";
})(CalendarEventResponse || (CalendarEventResponse = {}));
function getExcludedDays({ startDate, days, excluded }) {
    if (excluded.length < 1) {
        return 0;
    }
    let day = startDate.getDay();
    let reduce = 0;
    for (let i = 0; i < days; i++) {
        if (day === DAYS_IN_WEEK) {
            day = 0;
        }
        if (excluded.some((e) => e === day)) {
            reduce++;
        }
        day++;
    }
    return reduce;
}
function getWeekViewEventSpan({ event, offset, startOfWeek, excluded, }) {
    const begin = event.start < startOfWeek ? startOfWeek : event.start;
    let span = 1;
    if (event.end) {
        span = DateUtil.differenceInDays(addMinutes(DateUtil.endOfDay(event.end), 1), DateUtil.startOfDay(begin));
    }
    const totalLength = offset + span;
    if (totalLength > DAYS_IN_WEEK) {
        span = DAYS_IN_WEEK - offset;
    }
    return span - getExcludedDays({ startDate: begin, days: span, excluded });
}
function getWeekViewEventOffset({ event, startOfWeek, excluded = [], }) {
    if (event.start < startOfWeek) {
        return 0;
    }
    const distance = DateUtil.differenceInDays(event.start, startOfWeek);
    return distance - getExcludedDays({ startDate: startOfWeek, days: distance, excluded });
}
function isEventIsPeriod({ event, periodStart, periodEnd }) {
    const eventStart = event.start;
    const eventEnd = event.end || event.start;
    if (eventStart > periodStart && eventStart < periodEnd) {
        return true;
    }
    if (eventEnd > periodStart && eventEnd < periodEnd) {
        return true;
    }
    if (eventStart < periodStart && eventEnd > periodEnd) {
        return true;
    }
    if (DateUtil.isSameSecond(eventStart, periodStart) || DateUtil.isSameSecond(eventStart, periodEnd)) {
        return true;
    }
    if (DateUtil.isSameSecond(eventEnd, periodStart) || DateUtil.isSameSecond(eventEnd, periodEnd)) {
        return true;
    }
    return false;
}
function getEventsInPeriod({ events, periodStart, periodEnd }) {
    return events.filter((event) => isEventIsPeriod({ event, periodStart, periodEnd }));
}
function getEventsInTimeRange(events, dayStart, dayEnd) {
    return events.filter((event) => {
        const eventStart = event.start;
        const eventEnd = event.end || eventStart;
        const startOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfDay(eventStart), dayStart.hour), dayStart.minute);
        const endOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfMinute(eventStart), dayEnd.hour), dayEnd.minute);
        return DateUtil.isAfter(eventEnd, startOfView) && DateUtil.isBefore(eventStart, endOfView);
    });
}
function getWeekDay({ date }) {
    const today = DateUtil.startOfDay(new Date());
    return {
        date,
        isPast: date < today,
        isToday: DateUtil.isSameDay(date, today),
        isFuture: date > today,
        isWeekend: WEEKEND_DAY_NUMBERS.indexOf(getDay(date)) > -1,
    };
}
function getWeekViewHeader({ viewDate, weekStartsOn, excluded = [], }) {
    const start = DateUtil.startOfWeek(viewDate, { weekStartsOn });
    const days = [];
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        const date = DateUtil.addDays(start, i);
        if (!excluded.some((e) => date.getDay() === e)) {
            days.push(getWeekDay({ date }));
        }
    }
    return days;
}
function getWeekView({ events = [], viewDate, weekStartsOn, excluded = [], hourSegments, segmentHeight, dayStart, dayEnd, }) {
    if (!events) {
        events = [];
    }
    const startOfViewWeek = DateUtil.startOfWeek(viewDate, { weekStartsOn });
    const endOfViewWeek = DateUtil.endOfWeek(viewDate, { weekStartsOn });
    const maxRange = DAYS_IN_WEEK - excluded.length;
    const eventsMapped = getEventsInTimeRange(getEventsInPeriod({ events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek }), dayStart, dayEnd)
        .map((event) => {
        const offset = getWeekViewEventOffset({ event, startOfWeek: startOfViewWeek, excluded });
        const span = 1; // getWeekViewEventSpan({ event, offset, startOfWeek: startOfViewWeek, excluded });
        return { event, offset, span };
    })
        .filter((e) => e.offset < maxRange)
        .filter((e) => e.span > 0)
        .map((entry) => ({
        event: entry.event,
        offset: entry.offset,
        span: entry.span,
        startsBeforeWeek: entry.event.start < startOfViewWeek,
        endsAfterWeek: (entry.event.end || entry.event.start) > endOfViewWeek,
        top: 0,
    }))
        .sort((itemA, itemB) => {
        const startSecondsDiff = DateUtil.differenceInSeconds(itemA.event.start, itemB.event.start);
        if (startSecondsDiff === 0) {
            return DateUtil.differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
        }
        return startSecondsDiff;
    })
        .map((entry) => {
        const startOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfDay(entry.event.start), dayStart.hour), dayStart.minute);
        const endOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfMinute(DateUtil.endOfDay(entry.event.start)), dayEnd.hour), dayEnd.minute);
        const eventStart = entry.event.start;
        const eventEnd = entry.event.end || eventStart;
        const hourHeightModifier = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;
        if (eventStart > startOfView) {
            entry.top += differenceInMinutes(eventStart, startOfView);
        }
        entry.top *= hourHeightModifier;
        const startsBeforeDay = eventStart < startOfView;
        const endsAfterDay = eventEnd > endOfView;
        const startDate = startsBeforeDay ? startOfView : eventStart;
        const endDate = endsAfterDay ? endOfView : eventEnd;
        let height = differenceInMinutes(endDate, startDate);
        if (!entry.event.end) {
            height = segmentHeight;
        }
        else {
            height *= hourHeightModifier;
        }
        entry.height = height;
        return entry;
    });
    const eventRows = [];
    const allocatedEvents = [];
    eventsMapped.forEach((event, index) => {
        if (allocatedEvents.indexOf(event) === -1) {
            allocatedEvents.push(event);
            const otherRowEvents = eventsMapped.slice(index + 1).filter((nextEvent) => {
                return nextEvent.top === event.top && nextEvent.offset === event.offset;
            });
            if (otherRowEvents.length > 0) {
                const totalEventsForRow = otherRowEvents.length + 1;
                event.span = 1 / totalEventsForRow;
                let nextOffset = event.span + event.offset;
                otherRowEvents.forEach((nextEvent) => {
                    nextEvent.offset = nextOffset;
                    nextEvent.span = event.span;
                    nextOffset = nextEvent.span + nextEvent.offset;
                });
                allocatedEvents.push(...otherRowEvents);
            }
            eventRows.push({
                row: [event, ...otherRowEvents],
            });
        }
    });
    return eventRows;
}
function getMonthView({ events = [], viewDate, weekStartsOn, excluded = [], }) {
    if (!events) {
        events = [];
    }
    const start = DateUtil.startOfWeek(DateUtil.startOfMonth(viewDate), { weekStartsOn });
    const end = DateUtil.endOfWeek(DateUtil.endOfMonth(viewDate), { weekStartsOn });
    const eventsInMonth = getEventsInPeriod({
        events,
        periodStart: start,
        periodEnd: end,
    });
    const days = [];
    for (let i = 0; i < DateUtil.differenceInDays(end, start) + 1; i++) {
        const date = DateUtil.addDays(start, i);
        if (!excluded.some((e) => date.getDay() === e)) {
            const day = getWeekDay({ date });
            const calEvents = getEventsInPeriod({
                events: eventsInMonth,
                periodStart: DateUtil.startOfDay(date),
                periodEnd: DateUtil.endOfDay(date),
            });
            day.inMonth = DateUtil.isSameMonth(date, viewDate);
            day.events = calEvents;
            day.badgeTotal = calEvents.length;
            days.push(day);
        }
    }
    const totalDaysVisibleInWeek = DAYS_IN_WEEK - excluded.length;
    const rows = Math.floor(days.length / totalDaysVisibleInWeek);
    const rowOffsets = [];
    for (let i = 0; i < rows; i++) {
        rowOffsets.push(i * totalDaysVisibleInWeek);
    }
    return {
        rowOffsets,
        totalDaysVisibleInWeek,
        days,
    };
}
function getDayView({ events = [], viewDate, hourSegments, dayStart, dayEnd, eventWidth, segmentHeight }) {
    if (!events) {
        events = [];
    }
    const startOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfDay(viewDate), dayStart.hour), dayStart.minute);
    const endOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfMinute(DateUtil.endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
    const previousDayEvents = [];
    const dayViewEvents = getEventsInTimeRange(getEventsInPeriod({
        events: events.filter((event) => !event.allDay),
        periodStart: startOfView,
        periodEnd: endOfView,
    }), dayStart, dayEnd)
        .sort((eventA, eventB) => {
        return eventA.start.valueOf() - eventB.start.valueOf();
    })
        .map((event) => {
        const eventStart = event.start;
        const eventEnd = event.end || eventStart;
        const startsBeforeDay = eventStart < startOfView;
        const endsAfterDay = eventEnd > endOfView;
        const hourHeightModifier = (hourSegments * segmentHeight) / MINUTES_IN_HOUR;
        let top = 0;
        if (eventStart > startOfView) {
            top += differenceInMinutes(eventStart, startOfView);
        }
        top *= hourHeightModifier;
        const startDate = startsBeforeDay ? startOfView : eventStart;
        const endDate = endsAfterDay ? endOfView : eventEnd;
        let height = differenceInMinutes(endDate, startDate);
        if (!event.end) {
            height = segmentHeight;
        }
        else {
            height *= hourHeightModifier;
        }
        const bottom = top + height;
        const overlappingPreviousEvents = previousDayEvents.filter((previousEvent) => {
            const previousEventTop = previousEvent.top;
            const previousEventBottom = previousEvent.top + previousEvent.height;
            if (top < previousEventBottom && previousEventBottom < bottom) {
                return true;
            }
            else if (previousEventTop <= top && bottom <= previousEventBottom) {
                return true;
            }
            return false;
        });
        let left = 0;
        while (overlappingPreviousEvents.some((previousEvent) => previousEvent.left === left)) {
            left += eventWidth;
        }
        const dayEvent = {
            event,
            height,
            width: eventWidth,
            top,
            left,
            startsBeforeDay,
            endsAfterDay,
        };
        if (height > 0) {
            previousDayEvents.push(dayEvent);
        }
        return dayEvent;
    })
        .filter((dayEvent) => dayEvent.height > 0);
    const width = Math.max(...dayViewEvents.map((event) => event.left + event.width));
    const allDayEvents = getEventsInPeriod({
        events: events.filter((event) => event.allDay),
        periodStart: DateUtil.startOfDay(startOfView),
        periodEnd: DateUtil.endOfDay(endOfView),
    });
    return {
        events: dayViewEvents,
        width,
        allDayEvents,
    };
}
function getDayViewHourGrid({ viewDate, hourSegments, dayStart, dayEnd, }) {
    const hours = [];
    const startOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfDay(viewDate), dayStart.hour), dayStart.minute);
    const endOfView = DateUtil.setMinutes(DateUtil.setHours(DateUtil.startOfMinute(DateUtil.endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
    const segmentDuration = MINUTES_IN_HOUR / hourSegments;
    const startOfViewDay = DateUtil.startOfDay(viewDate);
    for (let i = 0; i < HOURS_IN_DAY; i++) {
        const segments = [];
        for (let j = 0; j < hourSegments; j++) {
            const date = addMinutes(addHours(startOfViewDay, i), j * segmentDuration);
            if (date >= startOfView && date < endOfView) {
                segments.push({
                    date,
                    isStart: j === 0,
                });
            }
        }
        if (segments.length > 0) {
            hours.push({ segments });
        }
    }
    return hours;
}

class Color {
    constructor(value) {
        this.isValid = true;
        if (Color.isHSL(value)) {
            // let { h, s, l, a = 1 } = value as HSLA;
            this.source = rgbToHex(hslToRgb(value));
        }
        else if (Color.isHSV(value)) {
            this.source = rgbToHex(hsvToRgb(value));
        }
        else if (Color.isRGB(value)) {
            this.source = rgbToHex(value);
        }
        else if (Color.isValidHex(value.toString())) {
            this.source = value;
        }
        else {
            this.isValid = false;
            console.error(`Invalid color: ${value}`);
        }
    }
    get hex() {
        return this.source;
    }
    get rgb() {
        return hexToRgb(this.source);
    }
    get hsl() {
        return rgbToHsl(hexToRgb(this.source));
    }
    get hsv() {
        return rgbToHsv(hexToRgb(this.source));
    }
    static isValidHex(h) {
        const clean = h.replace('#', '').toLowerCase();
        const a = parseInt(clean, 16);
        return a.toString(16).padStart(6, '0') === clean;
    }
    static isRGB(obj) {
        const keys = ['r', 'g', 'b'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isRGBA(obj) {
        const keys = ['r', 'g', 'b', 'a'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSL(obj) {
        const keys = ['h', 's', 'l'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSLA(obj) {
        const keys = ['h', 's', 'l', 'a'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSV(obj) {
        const keys = ['h', 's', 'v'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
    static isHSVA(obj) {
        const keys = ['h', 's', 'v', 'a'];
        return keys.every((item) => obj.hasOwnProperty(item));
    }
}
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
function rgbToHex({ r, g, b }) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl({ r, g, b }) {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, l };
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb({ h, s, l }) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        function hue2rgb(p1, q1, t1) {
            if (t1 < 0) {
                t1 += 1;
            }
            if (t1 > 1) {
                t1 -= 1;
            }
            if (t1 < 1 / 6) {
                return p1 + (q1 - p1) * 6 * t1;
            }
            if (t1 < 1 / 2) {
                return q1;
            }
            if (t1 < 2 / 3) {
                return p1 + (q1 - p1) * (2 / 3 - t1) * 6;
            }
            return p1;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255,
    };
}
/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv({ r, g, b }) {
    (r = r / 255), (g = g / 255), (b = b / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, v };
}
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb({ h, s, v }) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255,
    };
}

/* tslint:disable:quotemark */
/**
 * AUTOGENERATED FILE - DO NOT EDIT
 * Generated by: https://bhsource.bullhorn.com/DEV_WORKSPACE/country-state-parser
 * Last generated on: Tue Feb 26 2019 15:45:12 GMT-0600 (Central Standard Time)
 */
const COUNTRIES = [
    {
        code: 'US',
        id: 1,
        name: 'United States',
        states: [
            {
                code: 'AL',
                name: 'Alabama',
            },
            {
                code: 'AK',
                name: 'Alaska',
            },
            {
                code: 'AZ',
                name: 'Arizona',
            },
            {
                code: 'AR',
                name: 'Arkansas',
            },
            {
                code: 'CA',
                name: 'California',
            },
            {
                code: 'CO',
                name: 'Colorado',
            },
            {
                code: 'CT',
                name: 'Connecticut',
            },
            {
                code: 'DE',
                name: 'Delaware',
            },
            {
                code: 'DC',
                name: 'District Of Columbia',
            },
            {
                code: 'FL',
                name: 'Florida',
            },
            {
                code: 'GA',
                name: 'Georgia',
            },
            {
                code: 'GU',
                name: 'Guam',
            },
            {
                code: 'HI',
                name: 'Hawaii',
            },
            {
                code: 'ID',
                name: 'Idaho',
            },
            {
                code: 'IL',
                name: 'Illinois',
            },
            {
                code: 'IN',
                name: 'Indiana',
            },
            {
                code: 'IA',
                name: 'Iowa',
            },
            {
                code: 'KS',
                name: 'Kansas',
            },
            {
                code: 'KY',
                name: 'Kentucky',
            },
            {
                code: 'LA',
                name: 'Louisiana',
            },
            {
                code: 'ME',
                name: 'Maine',
            },
            {
                code: 'MH',
                name: 'Marshall Islands',
            },
            {
                code: 'MD',
                name: 'Maryland',
            },
            {
                code: 'MA',
                name: 'Massachusetts',
            },
            {
                code: 'MI',
                name: 'Michigan',
            },
            {
                code: 'MN',
                name: 'Minnesota',
            },
            {
                code: 'MS',
                name: 'Mississippi',
            },
            {
                code: 'MO',
                name: 'Missouri',
            },
            {
                code: 'MT',
                name: 'Montana',
            },
            {
                code: 'NE',
                name: 'Nebraska',
            },
            {
                code: 'NV',
                name: 'Nevada',
            },
            {
                code: 'NH',
                name: 'New Hampshire',
            },
            {
                code: 'NJ',
                name: 'New Jersey',
            },
            {
                code: 'NM',
                name: 'New Mexico',
            },
            {
                code: 'NY',
                name: 'New York',
            },
            {
                code: 'NC',
                name: 'North Carolina',
            },
            {
                code: 'ND',
                name: 'North Dakota',
            },
            {
                code: 'MP',
                name: 'Northern Mariana Islands',
            },
            {
                code: 'OH',
                name: 'Ohio',
            },
            {
                code: 'OK',
                name: 'Oklahoma',
            },
            {
                code: 'OR',
                name: 'Oregon',
            },
            {
                code: 'PW',
                name: 'Palau',
            },
            {
                code: 'PA',
                name: 'Pennsylvania',
            },
            {
                code: 'PR',
                name: 'Puerto Rico',
            },
            {
                code: 'RI',
                name: 'Rhode Island',
            },
            {
                code: 'SC',
                name: 'South Carolina',
            },
            {
                code: 'SD',
                name: 'South Dakota',
            },
            {
                code: 'TN',
                name: 'Tennessee',
            },
            {
                code: 'TX',
                name: 'Texas',
            },
            {
                code: 'UT',
                name: 'Utah',
            },
            {
                code: 'VT',
                name: 'Vermont',
            },
            {
                code: 'VI',
                name: 'Virgin Islands',
            },
            {
                code: 'VA',
                name: 'Virginia',
            },
            {
                code: 'WA',
                name: 'Washington',
            },
            {
                code: 'WV',
                name: 'West Virginia',
            },
            {
                code: 'WI',
                name: 'Wisconsin',
            },
            {
                code: 'WY',
                name: 'Wyoming',
            },
        ],
    },
    {
        code: 'UK',
        id: 2359,
        name: 'United Kingdom',
        states: [
            {
                code: 'ABD',
                name: 'Aberdeenshire',
            },
            {
                code: 'ALD',
                name: 'Alderney',
            },
            {
                code: 'ANS',
                name: 'Angus',
            },
            {
                code: 'ANN',
                name: 'Antrim and Newtownabbey',
            },
            {
                code: 'AGB',
                name: 'Argyllshire',
            },
            {
                code: 'ABC',
                name: 'Armagh',
            },
            {
                code: 'EAY',
                name: 'Ayrshire',
            },
            {
                code: 'BLA',
                name: 'Ballymena',
            },
            {
                code: 'BAY',
                name: 'Ballymoney',
            },
            {
                code: 'BNB',
                name: 'Banbridge',
            },
            {
                code: 'BAN',
                name: 'Banffshire',
            },
            {
                code: 'BDF',
                name: 'Bedfordshire',
            },
            {
                code: 'BFS',
                name: 'Belfast',
            },
            {
                code: 'BRK',
                name: 'Berkshire',
            },
            {
                code: 'BGW',
                name: 'Blaenau Gwent',
            },
            {
                code: 'SCB',
                name: 'Borders',
            },
            {
                code: 'BGE',
                name: 'Bridgend',
            },
            {
                code: 'BST',
                name: 'Bristol',
            },
            {
                code: 'BKM',
                name: 'Buckinghamshire',
            },
            {
                code: 'CAY',
                name: 'Caerphilly',
            },
            {
                code: 'CAI',
                name: 'Caithness',
            },
            {
                code: 'CAM',
                name: 'Cambridgeshire',
            },
            {
                code: 'CRF',
                name: 'Cardiff',
            },
            {
                code: 'CMN',
                name: 'Carmarthenshire',
            },
            {
                code: 'CKF',
                name: 'Carrickfergus',
            },
            {
                code: 'CAS',
                name: 'Castlereagh',
            },
            {
                code: 'CGN',
                name: 'Ceredigion',
            },
            {
                code: 'CHE',
                name: 'Cheshire',
            },
            {
                code: 'CLK',
                name: 'Clackmannanshire',
            },
            {
                code: 'CLR',
                name: 'Coleraine',
            },
            {
                code: 'CWY',
                name: 'Conwy',
            },
            {
                code: 'CKT',
                name: 'Cookstown',
            },
            {
                code: 'CON',
                name: 'Cornwall',
            },
            {
                code: 'DUR',
                name: 'County Durham',
            },
            {
                code: 'DRS',
                name: 'County Londonderry',
            },
            {
                code: 'CRA',
                name: 'Craigavon',
            },
            {
                code: 'CMA',
                name: 'Cumbria',
            },
            {
                code: 'DEN',
                name: 'Denbighshire',
            },
            {
                code: 'DBY',
                name: 'Derbyshire',
            },
            {
                code: 'DEV',
                name: 'Devon',
            },
            {
                code: 'DOR',
                name: 'Dorset',
            },
            {
                code: 'EDU',
                name: 'Dumbartonshire',
            },
            {
                code: 'DGY',
                name: 'Dumfries and Galloway',
            },
            {
                code: 'DGN',
                name: 'Dungannon and South Tyrone',
            },
            {
                code: 'ELN',
                name: 'East Lothian',
            },
            {
                code: 'ESX',
                name: 'East Sussex',
            },
            {
                code: 'ERY',
                name: 'East Yorkshire',
            },
            {
                code: 'ESS',
                name: 'Essex',
            },
            {
                code: 'FMO',
                name: 'Fermanagh and Omagh',
            },
            {
                code: 'FIF',
                name: 'Fife',
            },
            {
                code: 'FLN',
                name: 'Flintshire',
            },
            {
                code: 'GLG',
                name: 'Glasgow',
            },
            {
                code: 'GLS',
                name: 'Gloucestershire',
            },
            {
                code: 'LND',
                name: 'Greater London',
            },
            {
                code: 'MAN',
                name: 'Greater Manchester',
            },
            {
                code: 'GSY',
                name: 'Guernsey',
            },
            {
                code: 'GWN',
                name: 'Gwynedd',
            },
            {
                code: 'HAM',
                name: 'Hampshire',
            },
            {
                code: 'HEF',
                name: 'Herefordshire',
            },
            {
                code: 'HRM',
                name: 'Herm',
            },
            {
                code: 'HRT',
                name: 'Hertfordshire',
            },
            {
                code: 'HLD',
                name: 'Highland',
            },
            {
                code: 'INV',
                name: 'Inverness-shire',
            },
            {
                code: 'AGY',
                name: 'Isle of Anglesey',
            },
            {
                code: 'IOM',
                name: 'Isle of Man',
            },
            {
                code: 'IOW',
                name: 'Isle of Wight',
            },
            {
                code: 'JSY',
                name: 'Jersey',
            },
            {
                code: 'KEN',
                name: 'Kent',
            },
            {
                code: 'KCD',
                name: 'Kincardineshire',
            },
            {
                code: 'KKD',
                name: 'Kirkcudbrightshire',
            },
            {
                code: 'LAN',
                name: 'Lancashire',
            },
            {
                code: 'LRN',
                name: 'Larne',
            },
            {
                code: 'LEC',
                name: 'Leicestershire',
            },
            {
                code: 'LMV',
                name: 'Limavady',
            },
            {
                code: 'LIN',
                name: 'Lincolnshire',
            },
            {
                code: 'LBC',
                name: 'Lisburn and Castlereagh',
            },
            {
                code: 'MFT',
                name: 'Magherafelt',
            },
            {
                code: 'MER',
                name: 'Merseyside',
            },
            {
                code: 'MTY',
                name: 'Merthyr Tydfil',
            },
            {
                code: 'MLN',
                name: 'Midlothian',
            },
            {
                code: 'MON',
                name: 'Monmouthshire',
            },
            {
                code: 'MRY',
                name: 'Morayshire',
            },
            {
                code: 'MYL',
                name: 'Moyle',
            },
            {
                code: 'NAI',
                name: 'Nairn',
            },
            {
                code: 'NTL',
                name: 'Neath Port Talbot',
            },
            {
                code: 'NWP',
                name: 'Newport',
            },
            {
                code: 'NMD',
                name: 'Newry, Mourne and Down',
            },
            {
                code: 'NFK',
                name: 'Norfolk',
            },
            {
                code: 'AND',
                name: 'North Down and Ards',
            },
            {
                code: 'NLK',
                name: 'North Lanarkshire',
            },
            {
                code: 'NYK',
                name: 'North Yorkshire',
            },
            {
                code: 'NTH',
                name: 'Northamptonshire',
            },
            {
                code: 'NBL',
                name: 'Northumberland',
            },
            {
                code: 'NTT',
                name: 'Nottinghamshire',
            },
            {
                code: 'OMA',
                name: 'Omagh',
            },
            {
                code: 'ORK',
                name: 'Orkney Islands',
            },
            {
                code: 'OXF',
                name: 'Oxfordshire',
            },
            {
                code: 'PEM',
                name: 'Pembrokeshire',
            },
            {
                code: 'PKN',
                name: 'Perth and Kinross',
            },
            {
                code: 'PER',
                name: 'Perthshire and Kinross',
            },
            {
                code: 'POW',
                name: 'Powys',
            },
            {
                code: 'RCC',
                name: 'Redcar and Cleveland',
            },
            {
                code: 'RFW',
                name: 'Renfrewshire',
            },
            {
                code: 'RCT',
                name: 'Rhondda Cynon Taff',
            },
            {
                code: 'RUT',
                name: 'Rutland',
            },
            {
                code: 'SRK',
                name: 'Sark',
            },
            {
                code: 'ZET',
                name: 'Shetland Islands',
            },
            {
                code: 'SHR',
                name: 'Shropshire',
            },
            {
                code: 'SOM',
                name: 'Somerset',
            },
            {
                code: 'SLK',
                name: 'South Lanarkshire',
            },
            {
                code: 'SYK',
                name: 'South Yorkshire',
            },
            {
                code: 'STS',
                name: 'Staffordshire',
            },
            {
                code: 'STG',
                name: 'Stirlingshire',
            },
            {
                code: 'STR',
                name: 'Strabane',
            },
            {
                code: 'SFK',
                name: 'Suffolk',
            },
            {
                code: 'SRY',
                name: 'Surrey',
            },
            {
                code: 'SSX',
                name: 'Sussex',
            },
            {
                code: 'SUT',
                name: 'Sutherland',
            },
            {
                code: 'SWA',
                name: 'Swansea',
            },
            {
                code: 'TOF',
                name: 'Torfaen',
            },
            {
                code: 'TWR',
                name: 'Tyne and Wear',
            },
            {
                code: 'VGL',
                name: 'Vale of Glamorgan',
            },
            {
                code: 'WAR',
                name: 'Warwickshire',
            },
            {
                code: 'WLN',
                name: 'West Lothian',
            },
            {
                code: 'WMD',
                name: 'West Midlands',
            },
            {
                code: 'WSX',
                name: 'West Sussex',
            },
            {
                code: 'WRY',
                name: 'West Yorkshire',
            },
            {
                code: 'ELS',
                name: 'Western Isles',
            },
            {
                code: 'WIL',
                name: 'Wiltshire',
            },
            {
                code: 'WOR',
                name: 'Worcestershire',
            },
            {
                code: 'WRX',
                name: 'Wrexham',
            },
        ],
    },
    {
        code: 'AF',
        id: 2185,
        name: 'Afghanistan',
        states: [
            {
                code: 'AF01',
                name: 'Badakhshan',
            },
            {
                code: 'AF02',
                name: 'Badghis',
            },
            {
                code: 'AF03',
                name: 'Baghlan',
            },
            {
                code: 'AF30',
                name: 'Balkh',
            },
            {
                code: 'AF05',
                name: 'Bamian',
            },
            {
                code: 'AF41',
                name: 'Daikondi',
            },
            {
                code: 'AF06',
                name: 'Farah',
            },
            {
                code: 'AF07',
                name: 'Faryab',
            },
            {
                code: 'AF08',
                name: 'Ghazni',
            },
            {
                code: 'AF09',
                name: 'Ghowr',
            },
            {
                code: 'AF10',
                name: 'Helmand',
            },
            {
                code: 'AF11',
                name: 'Herat',
            },
            {
                code: 'AF31',
                name: 'Jowzjan',
            },
            {
                code: 'AF13',
                name: 'Kabul',
            },
            {
                code: 'AF23',
                name: 'Kandahar',
            },
            {
                code: 'AF14',
                name: 'Kapisa',
            },
            {
                code: 'AF37',
                name: 'Khowst',
            },
            {
                code: 'AF34',
                name: 'Konar',
            },
            {
                code: 'AF24',
                name: 'Kondoz',
            },
            {
                code: 'AF35',
                name: 'Laghman',
            },
            {
                code: 'AF17',
                name: 'Lowgar',
            },
            {
                code: 'AF18',
                name: 'Nangarhar',
            },
            {
                code: 'AF19',
                name: 'Nimruz',
            },
            {
                code: 'AF38',
                name: 'Nurestan',
            },
            {
                code: 'AF39',
                name: 'Oruzgan',
            },
            {
                code: 'AF36',
                name: 'Paktia',
            },
            {
                code: 'AF29',
                name: 'Paktika',
            },
            {
                code: 'AF42',
                name: 'Panjshir',
            },
            {
                code: 'AF40',
                name: 'Parvan',
            },
            {
                code: 'AF32',
                name: 'Samangan',
            },
            {
                code: 'AF33',
                name: 'Sar-e Pol',
            },
            {
                code: 'AF26',
                name: 'Takhar',
            },
            {
                code: 'AF27',
                name: 'Vardak',
            },
            {
                code: 'AF28',
                name: 'Zabol',
            },
        ],
    },
    {
        code: 'AX',
        id: 2407,
        name: 'Åland Islands',
        states: [],
    },
    {
        code: 'AL',
        id: 2186,
        name: 'Albania',
        states: [],
    },
    {
        code: 'DZ',
        id: 2187,
        name: 'Algeria',
        states: [
            {
                code: 'DZ.AR',
                name: 'Adrar',
            },
            {
                code: 'DZ.AD',
                name: 'Aïn Defla',
            },
            {
                code: 'DZ.AT',
                name: 'Aïn Témouchent',
            },
            {
                code: 'DZ.AL',
                name: 'Algiers',
            },
            {
                code: 'DZ.AN',
                name: 'Annaba',
            },
            {
                code: 'DZ.BT',
                name: 'Batna',
            },
            {
                code: 'DZ.BC',
                name: 'Béchar',
            },
            {
                code: 'DZ.BJ',
                name: 'Béjaïa',
            },
            {
                code: 'DZ.BS',
                name: 'Biskra',
            },
            {
                code: 'DZ.BL',
                name: 'Blida',
            },
            {
                code: 'DZ.BB',
                name: 'Bordj Bou Arréridj',
            },
            {
                code: 'DZ.BU',
                name: 'Bouira',
            },
            {
                code: 'DZ.BM',
                name: 'Boumerdès',
            },
            {
                code: 'DZ.CH',
                name: 'Chlef',
            },
            {
                code: 'DZ.CO',
                name: 'Constantine',
            },
            {
                code: 'DZ.DJ',
                name: 'Djelfa',
            },
            {
                code: 'DZ.EB',
                name: 'El Bayadh',
            },
            {
                code: 'DZ.EO',
                name: 'El Oued',
            },
            {
                code: 'DZ.ET',
                name: 'El Tarf',
            },
            {
                code: 'DZ.GR',
                name: 'Ghardaïa',
            },
            {
                code: 'DZ.GL',
                name: 'Guelma',
            },
            {
                code: 'DZ.IL',
                name: 'Illizi',
            },
            {
                code: 'DZ.JJ',
                name: 'Jijel',
            },
            {
                code: 'DZ.KH',
                name: 'Khenchela',
            },
            {
                code: 'DZ.LG',
                name: 'Laghouat',
            },
            {
                code: 'DZ.MC',
                name: 'Mascara',
            },
            {
                code: 'DZ.MD',
                name: 'Médéa',
            },
            {
                code: 'DZ.ML',
                name: 'Mila',
            },
            {
                code: 'DZ.MG',
                name: 'Mostaganem',
            },
            {
                code: 'DZ.MS',
                name: 'Msila',
            },
            {
                code: 'DZ.NA',
                name: 'Naama',
            },
            {
                code: 'DZ.OR',
                name: 'Oran',
            },
            {
                code: 'DZ.OG',
                name: 'Ouargla',
            },
            {
                code: 'DZ.OB',
                name: 'Oum el Bouaghi',
            },
            {
                code: 'DZ.RE',
                name: 'Relizane',
            },
            {
                code: 'DZ.SD',
                name: 'Saïda',
            },
            {
                code: 'DZ.SF',
                name: 'Sétif',
            },
            {
                code: 'DZ.SB',
                name: 'Sidi Bel Abbès',
            },
            {
                code: 'DZ.SK',
                name: 'Skikda',
            },
            {
                code: 'DZ.SA',
                name: 'Souk Ahras',
            },
            {
                code: 'DZ.TM',
                name: 'Tamanrasset',
            },
            {
                code: 'DZ.TB',
                name: 'Tébessa',
            },
            {
                code: 'DZ.TR',
                name: 'Tiaret',
            },
            {
                code: 'DZ.TN',
                name: 'Tindouf',
            },
            {
                code: 'DZ.TP',
                name: 'Tipaza',
            },
            {
                code: 'DZ.TS',
                name: 'Tissemsilt',
            },
            {
                code: 'DZ.TO',
                name: 'Tizi Ouzou',
            },
            {
                code: 'DZ.TL',
                name: 'Tlemcen',
            },
        ],
    },
    {
        code: 'AS',
        id: 2408,
        name: 'American Samoa',
        states: [],
    },
    {
        code: 'AD',
        id: 2188,
        name: 'Andorra',
        states: [],
    },
    {
        code: 'AO',
        id: 2189,
        name: 'Angola',
        states: [
            {
                code: 'AO19',
                name: 'Bengo',
            },
            {
                code: 'AO01',
                name: 'Benguela',
            },
            {
                code: 'AO02',
                name: 'Bié',
            },
            {
                code: 'AO03',
                name: 'Cabinda',
            },
            {
                code: 'AO04',
                name: 'Cuando Cubango',
            },
            {
                code: 'AO05',
                name: 'Cuanza Norte',
            },
            {
                code: 'AO06',
                name: 'Cuanza Sul',
            },
            {
                code: 'AO07',
                name: 'Cunene',
            },
            {
                code: 'AO08',
                name: 'Huambo',
            },
            {
                code: 'AO09',
                name: 'Huíla',
            },
            {
                code: 'AO20',
                name: 'Luanda',
            },
            {
                code: 'AO17',
                name: 'Lunda Norte',
            },
            {
                code: 'AO18',
                name: 'Lunda Sul',
            },
            {
                code: 'AO12',
                name: 'Malanje',
            },
            {
                code: 'AO14',
                name: 'Moxico',
            },
            {
                code: 'AO13',
                name: 'Namibe',
            },
            {
                code: 'AO15',
                name: 'Uíge',
            },
            {
                code: 'AO16',
                name: 'Zaire',
            },
        ],
    },
    {
        code: 'AI',
        id: 2409,
        name: 'Anguilla',
        states: [],
    },
    {
        code: 'AQ',
        id: 2190,
        name: 'Antarctica',
        states: [],
    },
    {
        code: 'AG',
        id: 2191,
        name: 'Antigua and Barbuda',
        states: [],
    },
    {
        code: 'AR',
        id: 2192,
        name: 'Argentina',
        states: [
            {
                code: 'AR01',
                name: 'Buenos Aires',
            },
            {
                code: 'AR02',
                name: 'Catamarca',
            },
            {
                code: 'AR03',
                name: 'Chaco',
            },
            {
                code: 'AR04',
                name: 'Chubut',
            },
            {
                code: 'AR07',
                name: 'Ciudad de Buenos Aires',
            },
            {
                code: 'AR05',
                name: 'Córdoba',
            },
            {
                code: 'AR06',
                name: 'Corrientes',
            },
            {
                code: 'AR08',
                name: 'Entre Ríos',
            },
            {
                code: 'AR09',
                name: 'Formosa',
            },
            {
                code: 'AR10',
                name: 'Jujuy',
            },
            {
                code: 'AR11',
                name: 'La Pampa',
            },
            {
                code: 'AR12',
                name: 'La Rioja',
            },
            {
                code: 'AR13',
                name: 'Mendoza',
            },
            {
                code: 'AR14',
                name: 'Misiones',
            },
            {
                code: 'AR15',
                name: 'Neuquén',
            },
            {
                code: 'AR16',
                name: 'Río Negro',
            },
            {
                code: 'AR17',
                name: 'Salta',
            },
            {
                code: 'AR18',
                name: 'San Juan',
            },
            {
                code: 'AR19',
                name: 'San Luis',
            },
            {
                code: 'AR20',
                name: 'Santa Cruz',
            },
            {
                code: 'AR21',
                name: 'Santa Fe',
            },
            {
                code: 'AR22',
                name: 'Santiago del Estero',
            },
            {
                code: 'AR23',
                name: 'Tierra del Fuego',
            },
            {
                code: 'AR24',
                name: 'Tucumán',
            },
        ],
    },
    {
        code: 'AM',
        id: 2193,
        name: 'Armenia',
        states: [],
    },
    {
        code: 'AB',
        id: 2373,
        name: 'Aruba',
        states: [
            {
                code: 'AW.AA',
                name: 'Aruba',
            },
        ],
    },
    {
        code: 'AU',
        id: 2194,
        name: 'Australia',
        states: [
            {
                code: 'ACT',
                name: 'Australian Capital Territory',
            },
            {
                code: 'NSW',
                name: 'New South Wales',
            },
            {
                code: 'NT',
                name: 'Northern Territory',
            },
            {
                code: 'QLD',
                name: 'Queensland',
            },
            {
                code: 'SA',
                name: 'South Australia',
            },
            {
                code: 'TAS',
                name: 'Tasmania',
            },
            {
                code: 'VIC',
                name: 'Victoria',
            },
            {
                code: 'WA',
                name: 'Western Australia',
            },
        ],
    },
    {
        code: 'AT',
        id: 2195,
        name: 'Austria',
        states: [
            {
                code: 'AU01',
                name: 'Burgenland',
            },
            {
                code: 'AU02',
                name: 'Carinthia',
            },
            {
                code: 'AU03',
                name: 'Lower Austria',
            },
            {
                code: 'AU05',
                name: 'Salzburg',
            },
            {
                code: 'AU06',
                name: 'Styria',
            },
            {
                code: 'AU07',
                name: 'Tyrol',
            },
            {
                code: 'AU04',
                name: 'Upper Austria',
            },
            {
                code: 'AU09',
                name: 'Vienna',
            },
            {
                code: 'AU08',
                name: 'Vorarlberg',
            },
        ],
    },
    {
        code: 'AZ',
        id: 2196,
        name: 'Azerbaijan',
        states: [
            {
                code: 'AZ-ABS',
                name: 'Absheron',
            },
            {
                code: 'AZ-AGM',
                name: 'Aghdam',
            },
            {
                code: 'AZ-AGS',
                name: 'Aghdash',
            },
            {
                code: 'AZ-AGC',
                name: 'Aghjabedi',
            },
            {
                code: 'AZ-AGA',
                name: 'Aghstafa',
            },
            {
                code: 'AZ-AGU',
                name: 'Aghsu',
            },
            {
                code: 'AZ-AB',
                name: 'Ali-Bairamly',
            },
            {
                code: 'AZ-AST',
                name: 'Astara',
            },
            {
                code: 'AZ-BAB',
                name: 'Babek',
            },
            {
                code: 'AZ-BA',
                name: 'Baku',
            },
            {
                code: 'AZ-BAL',
                name: 'Balaken',
            },
            {
                code: 'AZ-BAR',
                name: 'Barda',
            },
            {
                code: 'AZ-BEY',
                name: 'Beilagan',
            },
            {
                code: 'AZ-BIL',
                name: 'Bilasuvar',
            },
            {
                code: 'AZ-DAS',
                name: 'Dashkesan',
            },
            {
                code: 'AZ-DAV',
                name: 'Devechi',
            },
            {
                code: 'AZ-FUZ',
                name: 'Fizuli',
            },
            {
                code: 'AZ-QAB',
                name: 'Gabala',
            },
            {
                code: 'AZ-GAD',
                name: 'Gadabey',
            },
            {
                code: 'AZ-QAX',
                name: 'Gakh',
            },
            {
                code: 'AZ-GA',
                name: 'Ganja',
            },
            {
                code: 'AZ-QAZ',
                name: 'Gazakh',
            },
            {
                code: 'AZ-GOR',
                name: 'Geranboy',
            },
            {
                code: 'AZ-QOB',
                name: 'Gobustan',
            },
            {
                code: 'AZ-GOY',
                name: 'Goychay',
            },
            {
                code: 'AZ-QBA',
                name: 'Guba',
            },
            {
                code: 'AZ-QBI',
                name: 'Gubadly',
            },
            {
                code: 'AZ-QUS',
                name: 'Gusar',
            },
            {
                code: 'AZ-HAC',
                name: 'Hacuqabul',
            },
            {
                code: 'AZ-IMI',
                name: 'Imishli',
            },
            {
                code: 'AZ-ISM',
                name: 'Ismailly',
            },
            {
                code: 'AZ-CAL',
                name: 'Jalilabad',
            },
            {
                code: 'AZ-CAB',
                name: 'Jebrail',
            },
            {
                code: 'AZ-CUL',
                name: 'Julfa',
            },
            {
                code: 'AZ-KAL',
                name: 'Kelbajar',
            },
            {
                code: 'AZ-XAC',
                name: 'Khachmaz',
            },
            {
                code: 'AZ-XA',
                name: 'Khankendy',
            },
            {
                code: 'AZ-XAN',
                name: 'Khanlar',
            },
            {
                code: 'AZ-XCI',
                name: 'Khojaly',
            },
            {
                code: 'AZ-XVD',
                name: 'Khojavend',
            },
            {
                code: 'AZ-XIZ',
                name: 'Khyzy',
            },
            {
                code: 'AZ-KUR',
                name: 'Kyurdamir',
            },
            {
                code: 'AZ-LAC',
                name: 'Lachin',
            },
            {
                code: 'AZ-LAN',
                name: 'Lenkaran',
            },
            {
                code: 'AZ-LA',
                name: 'Lenkaran',
            },
            {
                code: 'AZ-LER',
                name: 'Lerik',
            },
            {
                code: 'AZ-MAS',
                name: 'Masally',
            },
            {
                code: 'AZ-MI',
                name: 'Mingechevir',
            },
            {
                code: 'AZ-NA',
                name: 'Naftalan',
            },
            {
                code: 'AZ-NX',
                name: 'Nakhchivan',
            },
            {
                code: 'AZ-NEF',
                name: 'Neftchala',
            },
            {
                code: 'AZ-OGU',
                name: 'Oghuz',
            },
            {
                code: 'AZ-ORD',
                name: 'Ordubad',
            },
            {
                code: 'AZ-SAT',
                name: 'Saatly',
            },
            {
                code: 'AZ-SAB',
                name: 'Sabirabad',
            },
            {
                code: 'AZ-SAL',
                name: 'Salyan',
            },
            {
                code: 'AZ-SMX',
                name: 'Samuh',
            },
            {
                code: 'AZ-SAD',
                name: 'Sedarak',
            },
            {
                code: 'AZ-SAH',
                name: 'Shahbuz',
            },
            {
                code: 'AZ-SMI',
                name: 'Shamakhy',
            },
            {
                code: 'AZ-SKR',
                name: 'Shamkir',
            },
            {
                code: 'AZ-SAK',
                name: 'Sheki',
            },
            {
                code: 'AZ-SA',
                name: 'Sheki',
            },
            {
                code: 'AZ-SAR',
                name: 'Sherur',
            },
            {
                code: 'AZ-SS',
                name: 'Shusha',
            },
            {
                code: 'AZ-SUS',
                name: 'Shusha',
            },
            {
                code: 'AZ-SIY',
                name: 'Siazan',
            },
            {
                code: 'AZ-SM',
                name: 'Sumgayit',
            },
            {
                code: 'AZ-TAR',
                name: 'Terter',
            },
            {
                code: 'AZ-TOV',
                name: 'Tovuz',
            },
            {
                code: 'AZ-UCA',
                name: 'Ujar',
            },
            {
                code: 'AZ-YAR',
                name: 'Yardymly',
            },
            {
                code: 'AZ-YE',
                name: 'Yevlakh',
            },
            {
                code: 'AZ-YEV',
                name: 'Yevlakh',
            },
            {
                code: 'AZ-ZAQ',
                name: 'Zagatala',
            },
            {
                code: 'AZ-ZAN',
                name: 'Zangilan',
            },
            {
                code: 'AZ-ZAR',
                name: 'Zerdab',
            },
        ],
    },
    {
        code: 'BS',
        id: 2197,
        name: 'Bahamas',
        states: [
            {
                code: 'BF24',
                name: 'Acklins',
            },
            {
                code: 'BF32',
                name: 'Berry Islands',
            },
            {
                code: 'BF05',
                name: 'Bimini',
            },
            {
                code: 'BF36',
                name: 'Black Point',
            },
            {
                code: 'BF06',
                name: 'Cat Island',
            },
            {
                code: 'BF37',
                name: 'Central Abaco',
            },
            {
                code: 'BF38',
                name: 'Central Andros',
            },
            {
                code: 'BF39',
                name: 'Central Eleuthera',
            },
            {
                code: 'BF25',
                name: 'City of Freeport',
            },
            {
                code: 'BF40',
                name: 'Crooked Island',
            },
            {
                code: 'BF41',
                name: 'East Grand Bahama',
            },
            {
                code: 'BF10',
                name: 'Exuma',
            },
            {
                code: 'BF42',
                name: 'Grand Cay',
            },
            {
                code: 'BS.GT\t',
                name: 'Green Turtle Cay',
            },
            {
                code: 'BF22',
                name: 'Harbour Island',
            },
            {
                code: 'BF43',
                name: 'Hope Town',
            },
            {
                code: 'BF13',
                name: 'Inagua',
            },
            {
                code: 'BF15',
                name: 'Long Island',
            },
            {
                code: 'BF44',
                name: 'Mangrove Cay',
            },
            {
                code: 'BF16',
                name: 'Mayaguana',
            },
            {
                code: 'BF45',
                name: "Moore's Island",
            },
            {
                code: 'BS.NW',
                name: 'New Providence',
            },
            {
                code: 'BF46',
                name: 'North Abaco',
            },
            {
                code: 'BF47',
                name: 'North Andros',
            },
            {
                code: 'BF48',
                name: 'North Eleuthera',
            },
            {
                code: 'BF18',
                name: 'Ragged Island',
            },
            {
                code: 'BF49',
                name: 'Rum Cay',
            },
            {
                code: 'BF35',
                name: 'San Salvador',
            },
            {
                code: 'BF50',
                name: 'South Abaco',
            },
            {
                code: 'BF51',
                name: 'South Andros',
            },
            {
                code: 'BF52',
                name: 'South Eleuthera',
            },
            {
                code: 'BF53',
                name: 'Spanish Wells',
            },
            {
                code: 'BF54',
                name: 'West Grand Bahama',
            },
        ],
    },
    {
        code: 'BH',
        id: 2198,
        name: 'Bahrain',
        states: [
            {
                code: 'BA16',
                name: 'Capital',
            },
            {
                code: 'BA19',
                name: 'Central',
            },
            {
                code: 'BA15',
                name: 'Muharraq',
            },
            {
                code: 'BA18',
                name: 'Northern',
            },
            {
                code: 'BA17',
                name: 'Southern',
            },
        ],
    },
    {
        code: 'BD',
        id: 2199,
        name: 'Bangladesh',
        states: [
            {
                code: 'BG85',
                name: 'Barisal',
            },
            {
                code: 'BG84',
                name: 'Chittagong',
            },
            {
                code: 'BG81',
                name: 'Dhaka',
            },
            {
                code: 'BG82',
                name: 'Khulna',
            },
            {
                code: 'BG81',
                name: 'Mymensingh',
            },
            {
                code: 'BG83',
                name: 'Rajshahi',
            },
            {
                code: 'BG87',
                name: 'Rangpur',
            },
            {
                code: 'BG86',
                name: 'Sylhet',
            },
        ],
    },
    {
        code: 'BB',
        id: 2200,
        name: 'Barbados',
        states: [
            {
                code: 'BB01',
                name: 'Christ Church',
            },
            {
                code: 'BB02',
                name: 'Saint Andrew',
            },
            {
                code: 'BB03',
                name: 'Saint George',
            },
            {
                code: 'BB04',
                name: 'Saint James',
            },
            {
                code: 'BB05',
                name: 'Saint John',
            },
            {
                code: 'BB06',
                name: 'Saint Joseph',
            },
            {
                code: 'BB07',
                name: 'Saint Lucy',
            },
            {
                code: 'BB08',
                name: 'Saint Michael',
            },
            {
                code: 'BB09',
                name: 'Saint Peter',
            },
            {
                code: 'BB10',
                name: 'Saint Philip',
            },
            {
                code: 'BB11',
                name: 'Saint Thomas',
            },
        ],
    },
    {
        code: 'BY',
        id: 2201,
        name: 'Belarus',
        states: [
            {
                code: 'BO01',
                name: 'Brest',
            },
            {
                code: 'BO02',
                name: 'Gomel',
            },
            {
                code: 'BO03',
                name: 'Grodno',
            },
            {
                code: 'BO05',
                name: 'Minsk',
            },
            {
                code: 'BO04',
                name: 'Minsk City',
            },
            {
                code: 'BO06',
                name: 'Mogilev',
            },
            {
                code: 'BO07',
                name: 'Vitebsk',
            },
        ],
    },
    {
        code: 'BE',
        id: 2202,
        name: 'Belgium',
        states: [
            {
                code: 'BE01',
                name: 'Antwerpen Province',
            },
            {
                code: 'BE11',
                name: 'Brussels-Capital Region',
            },
            {
                code: 'BE12',
                name: 'Flemish Brabant Province',
            },
            {
                code: 'BE03',
                name: 'Hainaut Province',
            },
            {
                code: 'BE04',
                name: 'Liege Province',
            },
            {
                code: 'BE05',
                name: 'Limburg Province',
            },
            {
                code: 'BE06',
                name: 'Luxembourg Province',
            },
            {
                code: 'BE07',
                name: 'Namur Province',
            },
            {
                code: 'BE08',
                name: 'Oost-Vlaanderen Province',
            },
            {
                code: 'BE10',
                name: 'Walloon Brabant Province',
            },
            {
                code: 'BE09',
                name: 'West-Vlaanderen Province',
            },
        ],
    },
    {
        code: 'BZ',
        id: 2203,
        name: 'Belize',
        states: [],
    },
    {
        code: 'BJ',
        id: 2204,
        name: 'Benin',
        states: [
            {
                code: 'BN07',
                name: 'Alibori',
            },
            {
                code: 'BN08',
                name: 'Atacora',
            },
            {
                code: 'BN09',
                name: 'Atlantique',
            },
            {
                code: 'BN10',
                name: 'Borgou',
            },
            {
                code: 'BN11',
                name: 'Collines',
            },
            {
                code: 'BN12',
                name: 'Couffo',
            },
            {
                code: 'BN13',
                name: 'Donga',
            },
            {
                code: 'BN14',
                name: 'Littoral',
            },
            {
                code: 'BN15',
                name: 'Mono',
            },
            {
                code: 'BN16',
                name: 'Ouémé',
            },
            {
                code: 'BN17',
                name: 'Plateau',
            },
            {
                code: 'BN18',
                name: 'Zou',
            },
        ],
    },
    {
        code: 'BU',
        id: 2372,
        name: 'Bermuda',
        states: [
            {
                code: 'BM.BD',
                name: 'Bermuda',
            },
            {
                code: 'BD01',
                name: 'Devonshire',
            },
            {
                code: 'BD03',
                name: 'Hamilton municipality',
            },
            {
                code: 'BD02',
                name: 'Hamilton',
            },
            {
                code: 'BD04',
                name: 'Paget',
            },
            {
                code: 'BD05',
                name: 'Pembroke',
            },
            {
                code: 'BD06',
                name: 'Saint George municipality',
            },
            {
                code: 'BD07',
                name: "Saint George's",
            },
            {
                code: 'BD08',
                name: 'Sandys',
            },
            {
                code: 'BD09',
                name: 'Smiths',
            },
            {
                code: 'BD10',
                name: 'Southampton',
            },
            {
                code: 'BD11',
                name: 'Warwick',
            },
        ],
    },
    {
        code: 'BT',
        id: 2205,
        name: 'Bhutan',
        states: [],
    },
    {
        code: 'BO',
        id: 2206,
        name: 'Bolivia; Plurinational State',
        states: [
            {
                code: 'BL01',
                name: 'Chuquisaca',
            },
            {
                code: 'BL02',
                name: 'Cochabamba',
            },
            {
                code: 'BL03',
                name: 'El Beni',
            },
            {
                code: 'BL04',
                name: 'La Paz',
            },
            {
                code: 'BL05',
                name: 'Oruro',
            },
            {
                code: 'BL06',
                name: 'Pando',
            },
            {
                code: 'BL07',
                name: 'Potosí',
            },
            {
                code: 'BL08',
                name: 'Santa Cruz',
            },
            {
                code: 'BL09',
                name: 'Tarija',
            },
        ],
    },
    {
        code: 'BQ',
        id: 2449,
        name: 'Bonaire',
        states: [
            {
                code: 'BQ.BO',
                name: 'Bonaire',
            },
            {
                code: 'BQ.SB',
                name: 'Saba',
            },
            {
                code: 'BQ.SE',
                name: 'Sint Eustatius',
            },
        ],
    },
    {
        code: 'BA',
        id: 2207,
        name: 'Bosnia and Herzegovina',
        states: [
            {
                code: 'BA-05',
                name: 'Bosansko-podrinjski kanton',
            },
            {
                code: 'BA-BRC',
                name: 'Brcko distrikt',
            },
            {
                code: 'BA-BIH',
                name: 'Federacija Bosna i Hercegovina',
            },
            {
                code: 'BA-07',
                name: 'Hercegovacko-neretvanski kanton',
            },
            {
                code: 'BA-09',
                name: 'Kanton Sarajevo',
            },
            {
                code: 'BA-10',
                name: 'Livanjski kanton',
            },
            {
                code: 'BA-02',
                name: 'Posavski kanton',
            },
            {
                code: 'BA-SRP',
                name: 'Republika Srpska',
            },
            {
                code: 'BA-06',
                name: 'Srednjobosanski kanton',
            },
            {
                code: 'BA-03',
                name: 'Tuzlanski kanton',
            },
            {
                code: 'BA-01',
                name: 'Unsko-sanski kanton',
            },
            {
                code: 'BA-08',
                name: 'Zapadnohercegovacki kanton',
            },
            {
                code: 'BA-04',
                name: 'Zenicko-dobojski kanton',
            },
        ],
    },
    {
        code: 'BW',
        id: 2208,
        name: 'Botswana',
        states: [
            {
                code: 'BC01',
                name: 'Central',
            },
            {
                code: 'BC12',
                name: 'Chobe',
            },
            {
                code: 'BC13',
                name: 'Francistown',
            },
            {
                code: 'BC14',
                name: 'Gaborone',
            },
            {
                code: 'BC03',
                name: 'Ghanzi',
            },
            {
                code: 'BC15',
                name: 'Jwaneng',
            },
            {
                code: 'BC04',
                name: 'Kgalagadi',
            },
            {
                code: 'BC05',
                name: 'Kgatleng',
            },
            {
                code: 'BC06',
                name: 'Kweneng',
            },
            {
                code: 'BC16',
                name: 'Lobatse',
            },
            {
                code: 'BC08',
                name: 'North-East',
            },
            {
                code: 'BC11',
                name: 'North-West',
            },
            {
                code: 'BC17',
                name: 'Selibe Phikwe',
            },
            {
                code: 'BC09',
                name: 'South East',
            },
            {
                code: 'BC10',
                name: 'Southern',
            },
            {
                code: 'BC18',
                name: 'Sowa Town',
            },
        ],
    },
    {
        code: 'BV',
        id: 2410,
        name: 'Bouvet Island',
        states: [],
    },
    {
        code: 'BR',
        id: 2209,
        name: 'Brazil',
        states: [
            {
                code: 'AC',
                name: 'Acre',
            },
            {
                code: 'AL',
                name: 'Alagoas',
            },
            {
                code: 'AP',
                name: 'Amapá',
            },
            {
                code: 'AM',
                name: 'Amazonas',
            },
            {
                code: 'BA',
                name: 'Bahia',
            },
            {
                code: 'CE',
                name: 'Ceará',
            },
            {
                code: 'DF',
                name: 'Distrito Federal',
            },
            {
                code: 'ES',
                name: 'Espírito Santo',
            },
            {
                code: 'GO',
                name: 'Goiás',
            },
            {
                code: 'MA',
                name: 'Maranhão',
            },
            {
                code: 'MT',
                name: 'Mato Grosso',
            },
            {
                code: 'MS',
                name: 'Mato Grosso do Sul',
            },
            {
                code: 'MG',
                name: 'Minas Gerais',
            },
            {
                code: 'PA',
                name: 'Pará',
            },
            {
                code: 'PR',
                name: 'Paraná',
            },
            {
                code: 'PB',
                name: 'Paraíba',
            },
            {
                code: 'PE',
                name: 'Pernambuco',
            },
            {
                code: 'PI',
                name: 'Piauí',
            },
            {
                code: 'RN',
                name: 'Rio Grande do Norte',
            },
            {
                code: 'RS',
                name: 'Rio Grande do Sul',
            },
            {
                code: 'RJ',
                name: 'Rio de Janeiro',
            },
            {
                code: 'RO',
                name: 'Rondônia',
            },
            {
                code: 'RR',
                name: 'Roraima',
            },
            {
                code: 'SC',
                name: 'Santa Catarina',
            },
            {
                code: 'SP',
                name: 'São Paulo',
            },
            {
                code: 'SE',
                name: 'Sergipe',
            },
            {
                code: 'TO',
                name: 'Tocantins',
            },
        ],
    },
    {
        code: 'IO',
        id: 2411,
        name: 'British Indian Ocean Territory',
        states: [],
    },
    {
        code: 'BN',
        id: 2210,
        name: 'Brunei Darussalam',
        states: [
            {
                code: 'BX01',
                name: 'Amo',
            },
            {
                code: 'BX02',
                name: 'Bandar Seri Begawan',
            },
            {
                code: 'BX03',
                name: 'Bangar',
            },
            {
                code: 'BX04',
                name: 'Batu Apoi',
            },
            {
                code: 'BX05',
                name: 'Berakas',
            },
            {
                code: 'BX06',
                name: 'Bokok',
            },
            {
                code: 'BX07',
                name: 'Bukit Sawat',
            },
            {
                code: 'BX08',
                name: 'Burong Pinggai Ayer',
            },
            {
                code: 'BX09',
                name: 'Gadong',
            },
            {
                code: 'BX10',
                name: 'Keriam',
            },
            {
                code: 'BX11',
                name: 'Kianggeh',
            },
            {
                code: 'BX12',
                name: 'Kilanas',
            },
            {
                code: 'BX13',
                name: 'Kiudang',
            },
            {
                code: 'BX14',
                name: 'Kota Batu',
            },
            {
                code: 'BX15',
                name: 'Kuala Balai',
            },
            {
                code: 'BX16',
                name: 'Kuala Belait',
            },
            {
                code: 'BX17',
                name: 'Labi',
            },
            {
                code: 'BX18',
                name: 'Labu',
            },
            {
                code: 'BX19',
                name: 'Lamunin',
            },
            {
                code: 'BX20',
                name: 'Liang',
            },
            {
                code: 'BX21',
                name: 'Lumapas',
            },
            {
                code: 'BX22',
                name: 'Melilas',
            },
            {
                code: 'BX23',
                name: 'Mentiri',
            },
            {
                code: 'BX24',
                name: 'Pekan Tutong',
            },
            {
                code: 'BX25',
                name: 'Pengkalan Batu',
            },
            {
                code: 'BX26',
                name: 'Peramu',
            },
            {
                code: 'BX27',
                name: 'Rambai',
            },
            {
                code: 'BX28',
                name: 'Saba',
            },
            {
                code: 'BX29',
                name: 'Sengkurong',
            },
            {
                code: 'BX30',
                name: 'Serasa',
            },
            {
                code: 'BX31',
                name: 'Seria',
            },
            {
                code: 'BX32',
                name: 'Sukang',
            },
            {
                code: 'BX33',
                name: 'Sungai Kebun',
            },
            {
                code: 'BX34',
                name: 'Sungai Kedayan',
            },
            {
                code: 'BX35',
                name: 'Tamoi',
            },
            {
                code: 'BX36',
                name: 'Tanjong Maya',
            },
            {
                code: 'BX37',
                name: 'Telisai',
            },
            {
                code: 'BX38',
                name: 'Ukong',
            },
        ],
    },
    {
        code: 'BG',
        id: 2211,
        name: 'Bulgaria',
        states: [
            {
                code: 'BU38',
                name: 'Blagoevgrad',
            },
            {
                code: 'BU39',
                name: 'Burgas',
            },
            {
                code: 'BU40',
                name: 'Dobrich',
            },
            {
                code: 'BU41',
                name: 'Gabrovo',
            },
            {
                code: 'BU42',
                name: 'Grad Sofiya',
            },
            {
                code: 'BU43',
                name: 'Khaskovo',
            },
            {
                code: 'BU44',
                name: 'Kurdzhali',
            },
            {
                code: 'BU45',
                name: 'Kyustendil',
            },
            {
                code: 'BU46',
                name: 'Lovech',
            },
            {
                code: 'BU47',
                name: 'Montana',
            },
            {
                code: 'BU48',
                name: 'Pazardzhik',
            },
            {
                code: 'BU49',
                name: 'Pernik',
            },
            {
                code: 'BU50',
                name: 'Pleven',
            },
            {
                code: 'BU51',
                name: 'Plovdiv',
            },
            {
                code: 'BU52',
                name: 'Razgrad',
            },
            {
                code: 'BU53',
                name: 'Ruse',
            },
            {
                code: 'BU54',
                name: 'Shumen',
            },
            {
                code: 'BU55',
                name: 'Silistra',
            },
            {
                code: 'BU56',
                name: 'Sliven',
            },
            {
                code: 'BU57',
                name: 'Smolyan',
            },
            {
                code: 'BU58',
                name: 'Sofiya',
            },
            {
                code: 'BU59',
                name: 'Stara Zagora',
            },
            {
                code: 'BU60',
                name: 'Turgovishte',
            },
            {
                code: 'BU61',
                name: 'Varna',
            },
            {
                code: 'BU62',
                name: 'Veliko Turnovo',
            },
            {
                code: 'BU63',
                name: 'Vidin',
            },
            {
                code: 'BU64',
                name: 'Vratsa',
            },
            {
                code: 'BU65',
                name: 'Yambol',
            },
        ],
    },
    {
        code: 'BF',
        id: 2212,
        name: 'Burkina Faso',
        states: [
            {
                code: 'UV79',
                name: 'Boucle du Mouhoun',
            },
            {
                code: 'UV80',
                name: 'Cascades',
            },
            {
                code: 'UV82',
                name: 'Centre Est',
            },
            {
                code: 'UV83',
                name: 'Centre Nord',
            },
            {
                code: 'UV84',
                name: 'Centre Ouest',
            },
            {
                code: 'UV81',
                name: 'Centre',
            },
            {
                code: 'UV85',
                name: 'Centre Sud',
            },
            {
                code: 'UV86',
                name: 'Est',
            },
            {
                code: 'UV87',
                name: 'Hauts Bassins',
            },
            {
                code: 'UV88',
                name: 'Nord',
            },
            {
                code: 'UV89',
                name: 'Plateau Central',
            },
            {
                code: 'UV90',
                name: 'Sahel',
            },
            {
                code: 'UV91',
                name: 'Sud-Ouest',
            },
        ],
    },
    {
        code: 'BM',
        id: 2385,
        name: 'Burma',
        states: [
            {
                code: 'BM03',
                name: 'Ayeyarwady',
            },
            {
                code: 'BM16',
                name: 'Bago',
            },
            {
                code: 'BM02',
                name: 'Chin',
            },
            {
                code: 'BM04',
                name: 'Kachin',
            },
            {
                code: 'BM06',
                name: 'Kayah',
            },
            {
                code: 'BM05',
                name: 'Kayin',
            },
            {
                code: 'BM15',
                name: 'Magway',
            },
            {
                code: 'BM08',
                name: 'Mandalay',
            },
            {
                code: 'BM13',
                name: 'Mon',
            },
            {
                code: 'BM18',
                name: 'Naypyidaw',
            },
            {
                code: 'BM01',
                name: 'Rakhine',
            },
            {
                code: 'BM10',
                name: 'Sagaing',
            },
            {
                code: 'BM11',
                name: 'Shan',
            },
            {
                code: 'BM12',
                name: 'Tanintharyi',
            },
            {
                code: 'BM17',
                name: 'Yangon',
            },
        ],
    },
    {
        code: 'BI',
        id: 2213,
        name: 'Burundi',
        states: [],
    },
    {
        code: 'KH',
        id: 2214,
        name: 'Cambodia',
        states: [
            {
                code: 'CB25',
                name: 'Bântéay Méanchey',
            },
            {
                code: 'CB29',
                name: 'Batdâmbâng',
            },
            {
                code: 'CB02',
                name: 'Kâmpóng Cham',
            },
            {
                code: 'CB03',
                name: 'Kâmpóng Chhnang',
            },
            {
                code: 'CB04',
                name: 'Kâmpóng Spœ',
            },
            {
                code: 'CB05',
                name: 'Kâmpóng Thum',
            },
            {
                code: 'CB21',
                name: 'Kâmpôt',
            },
            {
                code: 'CB07',
                name: 'Kândal',
            },
            {
                code: 'CB08',
                name: 'Kaôh Kong',
            },
            {
                code: 'CB09',
                name: 'Krâchéh',
            },
            {
                code: 'CB26',
                name: 'Krong Keb',
            },
            {
                code: 'CB30',
                name: 'Krong Pailin',
            },
            {
                code: 'CB28',
                name: 'Krong Preah Sihanouk',
            },
            {
                code: 'CB10',
                name: 'Môndól Kiri',
            },
            {
                code: 'CB27',
                name: 'Otdâr Méanchey',
            },
            {
                code: 'CB22',
                name: 'Phnom Penh',
            },
            {
                code: 'CB12',
                name: 'Pouthisat',
            },
            {
                code: 'CB13',
                name: 'Preah Vihéar',
            },
            {
                code: 'CB14',
                name: 'Prey Vêng',
            },
            {
                code: 'CB23',
                name: 'Rôtânôkiri',
            },
            {
                code: 'CB24',
                name: 'Siemréab',
            },
            {
                code: 'CB17',
                name: 'Stœ?ng Trêng',
            },
            {
                code: 'CB18',
                name: 'Svay Rieng',
            },
            {
                code: 'CB19',
                name: 'Takêv',
            },
            {
                code: 'CB31',
                name: 'Tbong Khmum',
            },
        ],
    },
    {
        code: 'CM',
        id: 2215,
        name: 'Cameroon',
        states: [
            {
                code: 'CM10',
                name: 'Adamaoua',
            },
            {
                code: 'CM11',
                name: 'Centre',
            },
            {
                code: 'CM04',
                name: 'Est',
            },
            {
                code: 'CM12',
                name: 'Extrême-Nord',
            },
            {
                code: 'CM05',
                name: 'Littoral',
            },
            {
                code: 'CM07',
                name: 'Nord-Ouest',
            },
            {
                code: 'CM13',
                name: 'Nord',
            },
            {
                code: 'CM08',
                name: 'Ouest',
            },
            {
                code: 'CM09',
                name: 'Sud-Ouest',
            },
            {
                code: 'CM14',
                name: 'Sud',
            },
        ],
    },
    {
        code: 'CA',
        id: 2216,
        name: 'Canada',
        states: [
            {
                code: 'AB',
                name: 'Alberta',
            },
            {
                code: 'BC',
                name: 'British Columbia',
            },
            {
                code: 'MB',
                name: 'Manitoba',
            },
            {
                code: 'NB',
                name: 'New Brunswick',
            },
            {
                code: 'NL',
                name: 'Newfoundland and Labrador',
            },
            {
                code: 'NT',
                name: 'Northwest Territories',
            },
            {
                code: 'NS',
                name: 'Nova Scotia',
            },
            {
                code: 'NU',
                name: 'Nunavut',
            },
            {
                code: 'ON',
                name: 'Ontario',
            },
            {
                code: 'PE',
                name: 'Prince Edward Island',
            },
            {
                code: 'QC',
                name: 'Quebec',
            },
            {
                code: 'SK',
                name: 'Saskatchewan',
            },
            {
                code: 'YT',
                name: 'Yukon',
            },
        ],
    },
    {
        code: 'CV',
        id: 2217,
        name: 'Cape Verde',
        states: [],
    },
    {
        code: 'KY',
        id: 2379,
        name: 'Cayman Islands',
        states: [
            {
                code: 'KY.BT',
                name: 'Bodden Town',
            },
            {
                code: 'KY.CJ',
                name: 'Cayman Islands',
            },
            {
                code: 'KY.EE',
                name: 'East End',
            },
            {
                code: 'KY.GT',
                name: 'George Town',
            },
            {
                code: 'KY.NS',
                name: 'North Side',
            },
            {
                code: 'KY.SI',
                name: 'Sister Islands',
            },
            {
                code: 'KY.WB',
                name: 'West Bay',
            },
        ],
    },
    {
        code: 'CF',
        id: 2218,
        name: 'Central African Republic',
        states: [
            {
                code: 'CT01',
                name: 'Bamingui-Bangoran',
            },
            {
                code: 'CT18',
                name: 'Bangui',
            },
            {
                code: 'CT02',
                name: 'Basse-Kotto',
            },
            {
                code: 'CT05',
                name: 'Haut-Mbomou',
            },
            {
                code: 'CT03',
                name: 'Haute-Kotto',
            },
            {
                code: 'CT06',
                name: 'Kémo',
            },
            {
                code: 'CT07',
                name: 'Lobaye',
            },
            {
                code: 'CT04',
                name: 'Mambéré-Kadéï',
            },
            {
                code: 'CT08',
                name: 'Mbomou',
            },
            {
                code: 'CT15',
                name: 'Nana-Grébizi',
            },
            {
                code: 'CT09',
                name: 'Nana-Mambéré',
            },
            {
                code: 'CT17',
                name: "Ombella-M'Poko",
            },
            {
                code: 'CT11',
                name: 'Ouaka',
            },
            {
                code: 'CT12',
                name: 'Ouham',
            },
            {
                code: 'CT13',
                name: 'Ouham-Pendé',
            },
            {
                code: 'CT16',
                name: 'Sangha-Mbaéré',
            },
            {
                code: 'CT14',
                name: 'Vakaga',
            },
        ],
    },
    {
        code: 'TD',
        id: 2219,
        name: 'Chad',
        states: [
            {
                code: 'CD22',
                name: 'Barh el Ghazel',
            },
            {
                code: 'CD01',
                name: 'Batha',
            },
            {
                code: 'CD23',
                name: 'Borkou',
            },
            {
                code: 'CD15',
                name: 'Chari-Baguirmi',
            },
            {
                code: 'CD27',
                name: 'Ennedi Est',
            },
            {
                code: 'CD28',
                name: 'Ennedi Ouest',
            },
            {
                code: 'CD05',
                name: 'Guéra',
            },
            {
                code: 'CD18',
                name: 'Hadjer-Lamis',
            },
            {
                code: 'CD06',
                name: 'Kanem',
            },
            {
                code: 'CD07',
                name: 'Lac',
            },
            {
                code: 'CD08',
                name: 'Logone Occidental',
            },
            {
                code: 'CD09',
                name: 'Logone Oriental',
            },
            {
                code: 'CD19',
                name: 'Mandoul',
            },
            {
                code: 'CD16',
                name: 'Mayo-Kebbi Est',
            },
            {
                code: 'CD20',
                name: 'Mayo-Kebbi Ouest',
            },
            {
                code: 'CD17',
                name: 'Moyen-Chari',
            },
            {
                code: 'CD12',
                name: 'Ouaddaï',
            },
            {
                code: 'CD13',
                name: 'Salamat',
            },
            {
                code: 'CD25',
                name: 'Sila',
            },
            {
                code: 'CD14',
                name: 'Tandjilé',
            },
            {
                code: 'CD26',
                name: 'Tibesti',
            },
            {
                code: 'CD21',
                name: "Ville de N'Djamena",
            },
            {
                code: 'CD02',
                name: 'Wadi Fira',
            },
        ],
    },
    {
        code: 'CH99',
        id: 2386,
        name: 'Channel Islands',
        states: [],
    },
    {
        code: 'CL',
        id: 2220,
        name: 'Chile',
        states: [
            {
                code: 'CL.AI',
                name: 'Aisén del General Carlos Ibáñez del Campo',
            },
            {
                code: 'CL.AN',
                name: 'Antofagasta',
            },
            {
                code: 'CL.AR',
                name: 'Araucanía',
            },
            {
                code: 'CL.AP',
                name: 'Arica and Parinacota',
            },
            {
                code: 'CL.AT',
                name: 'Atacama',
            },
            {
                code: 'CL.BI',
                name: 'Bío-Bío',
            },
            {
                code: 'CL.CO',
                name: 'Coquimbo',
            },
            {
                code: 'CL.LI',
                name: "Libertador General Bernardo O'Higgins",
            },
            {
                code: 'CL.LG',
                name: 'Los Lagos',
            },
            {
                code: 'CL.LR',
                name: 'Los Ríos',
            },
            {
                code: 'CL.MA',
                name: 'Magallanes y Antártica Chilena',
            },
            {
                code: 'CL.ML',
                name: 'Maule',
            },
            {
                code: 'CL.RM',
                name: 'Región Metropolitana de Santiago',
            },
            {
                code: 'CL.TP',
                name: 'Tarapacá',
            },
            {
                code: 'CL.VS',
                name: 'Valparaíso',
            },
        ],
    },
    {
        code: 'CN',
        id: 2221,
        name: 'China',
        states: [
            {
                code: 'CH01',
                name: 'Anhui',
            },
            {
                code: 'CH22',
                name: 'Beijing',
            },
            {
                code: 'CH33',
                name: 'Chongqing',
            },
            {
                code: 'CH07',
                name: 'Fujian',
            },
            {
                code: 'CH15',
                name: 'Gansu',
            },
            {
                code: 'CH17',
                name: 'Guangdon',
            },
            {
                code: 'CH30',
                name: 'Guangdong',
            },
            {
                code: 'CH16',
                name: 'Guangxi',
            },
            {
                code: 'CH18',
                name: 'Guizhou',
            },
            {
                code: 'CH31',
                name: 'Hainan',
            },
            {
                code: 'CH10',
                name: 'Hebei',
            },
            {
                code: 'CH08',
                name: 'Heilongjiang',
            },
            {
                code: 'CH09',
                name: 'Henan',
            },
            {
                code: 'CH34',
                name: 'Hong Kong',
            },
            {
                code: 'CH12',
                name: 'Hubei',
            },
            {
                code: 'CH11',
                name: 'Hunan',
            },
            {
                code: 'CH04',
                name: 'Jiangsu',
            },
            {
                code: 'CH03',
                name: 'Jiangxi',
            },
            {
                code: 'CH05',
                name: 'Jilin',
            },
            {
                code: 'CH19',
                name: 'Liaoning',
            },
            {
                code: 'CH20',
                name: 'Nei Mongol',
            },
            {
                code: 'CH21',
                name: 'Ningxia',
            },
            {
                code: 'CH06',
                name: 'Qinghai',
            },
            {
                code: 'CH26',
                name: 'Shaanxi',
            },
            {
                code: 'CH25',
                name: 'Shandong',
            },
            {
                code: 'CH23',
                name: 'Shanghai',
            },
            {
                code: 'CH24',
                name: 'Shanxi',
            },
            {
                code: 'CH32',
                name: 'Sichuan',
            },
            {
                code: 'CH27',
                name: 'Sichuan',
            },
            {
                code: 'CH28',
                name: 'Tianjin',
            },
            {
                code: 'CH13',
                name: 'Xinjiang',
            },
            {
                code: 'CH14',
                name: 'Xizang',
            },
            {
                code: 'CH29',
                name: 'Yunnan',
            },
            {
                code: 'CH02',
                name: 'Zhejiang',
            },
        ],
    },
    {
        code: 'CX',
        id: 2412,
        name: 'Christmas Island',
        states: [],
    },
    {
        code: 'CC',
        id: 2413,
        name: 'Cocos (Keeling) Islands',
        states: [],
    },
    {
        code: 'CO',
        id: 2222,
        name: 'Colombia',
        states: [
            {
                code: 'CO01',
                name: 'Amazonas',
            },
            {
                code: 'CO02',
                name: 'Antioquia',
            },
            {
                code: 'CO03',
                name: 'Arauca',
            },
            {
                code: 'CO04',
                name: 'Atlántico',
            },
            {
                code: 'CO35',
                name: 'Bolívar',
            },
            {
                code: 'CO36',
                name: 'Boyacá',
            },
            {
                code: 'CO37',
                name: 'Caldas',
            },
            {
                code: 'CO08',
                name: 'Caquetá',
            },
            {
                code: 'CO32',
                name: 'Casanare',
            },
            {
                code: 'CO09',
                name: 'Cauca',
            },
            {
                code: 'CO10',
                name: 'Cesar',
            },
            {
                code: 'CO11',
                name: 'Chocó',
            },
            {
                code: 'CO12',
                name: 'Córdoba',
            },
            {
                code: 'CO33',
                name: 'Cundinamarca',
            },
            {
                code: 'CO34',
                name: 'Distrito Capital',
            },
            {
                code: 'CO15',
                name: 'Guainía',
            },
            {
                code: 'CO14',
                name: 'Guaviare',
            },
            {
                code: 'CO16',
                name: 'Huila',
            },
            {
                code: 'CO17',
                name: 'La Guajira',
            },
            {
                code: 'CO38',
                name: 'Magdalena',
            },
            {
                code: 'CO19',
                name: 'Meta',
            },
            {
                code: 'CO20',
                name: 'Nariño',
            },
            {
                code: 'CO21',
                name: 'Norte de Santander',
            },
            {
                code: 'CO22',
                name: 'Putumayo',
            },
            {
                code: 'CO23',
                name: 'Quindío',
            },
            {
                code: 'CO24',
                name: 'Risaralda',
            },
            {
                code: 'CO25',
                name: 'San Andrés y Providencia',
            },
            {
                code: 'CO26',
                name: 'Santander',
            },
            {
                code: 'CO27',
                name: 'Sucre',
            },
            {
                code: 'CO28',
                name: 'Tolima',
            },
            {
                code: 'CO29',
                name: 'Valle del Cauca',
            },
            {
                code: 'CO30',
                name: 'Vaupés',
            },
            {
                code: 'CO31',
                name: 'Vichada',
            },
        ],
    },
    {
        code: 'KM',
        id: 2223,
        name: 'Comoros',
        states: [],
    },
    {
        code: 'ZR',
        id: 2368,
        name: 'Congo; Democratic Republic of',
        states: [
            {
                code: 'CD.BU',
                name: 'Bas-Uélé',
            },
            {
                code: 'CD.HK',
                name: 'Haut-Katanga',
            },
            {
                code: 'CD.HL',
                name: 'Haut-Lomami',
            },
            {
                code: 'CD.HU',
                name: 'Haut-Uélé',
            },
            {
                code: 'CD.IT',
                name: 'Ituri',
            },
            {
                code: 'CD.KS',
                name: 'Kasaï',
            },
            {
                code: 'CD.LL',
                name: 'Kasaï-Central',
            },
            {
                code: 'CD.KO',
                name: 'Kasaï Oriental',
            },
            {
                code: 'CD.KN',
                name: 'Kinshasa',
            },
            {
                code: 'CD.BC',
                name: 'Kongo Central',
            },
            {
                code: 'CD.KG',
                name: 'Kwango',
            },
            {
                code: 'CD.KU',
                name: 'Kwilu',
            },
            {
                code: 'CD.LM',
                name: 'Lomami',
            },
            {
                code: 'CD.LB',
                name: 'Lualaba',
            },
            {
                code: 'CD.MA',
                name: 'Mai-Ndombe',
            },
            {
                code: 'CD.MN',
                name: 'Maniema',
            },
            {
                code: 'CD.MO',
                name: 'Mongala',
            },
            {
                code: 'CD.NK',
                name: 'Nord-Kivu',
            },
            {
                code: 'CD.NU',
                name: 'Nord-Ubangi',
            },
            {
                code: 'CD.SN',
                name: 'Sankuru',
            },
            {
                code: 'CD.SK',
                name: 'Sud-Kivu',
            },
            {
                code: 'CD.SU',
                name: 'Sud-Ubangi',
            },
            {
                code: 'CD.TG',
                name: 'Tanganyika',
            },
            {
                code: 'CD.TO',
                name: 'Tshopo',
            },
            {
                code: 'CD.TP',
                name: 'Tshuapa',
            },
            {
                code: 'CD.ET',
                name: 'Équateur',
            },
        ],
    },
    {
        code: 'CG',
        id: 2383,
        name: 'Congo; Republic of',
        states: [],
    },
    {
        code: 'CK',
        id: 2414,
        name: 'Cook Islands',
        states: [],
    },
    {
        code: 'CR',
        id: 2226,
        name: 'Costa Rica',
        states: [
            {
                code: 'CS01',
                name: 'Alajuela',
            },
            {
                code: 'CS02',
                name: 'Cartago',
            },
            {
                code: 'CS03',
                name: 'Guanacaste',
            },
            {
                code: 'CS04',
                name: 'Heredia',
            },
            {
                code: 'CS06',
                name: 'Limón',
            },
            {
                code: 'CS07',
                name: 'Puntarenas',
            },
            {
                code: 'CS08',
                name: 'San José',
            },
        ],
    },
    {
        code: 'CI',
        id: 2227,
        name: "Cote D'Ivoire",
        states: [
            {
                code: 'IV93',
                name: 'Abidjan',
            },
            {
                code: 'IV76',
                name: 'Bas-Sassandra',
            },
            {
                code: 'IV94',
                name: 'Comoé',
            },
            {
                code: 'IV77',
                name: 'Denguélé',
            },
            {
                code: 'IV95',
                name: 'Gôh-Djiboua',
            },
            {
                code: 'IV81',
                name: 'Lacs',
            },
            {
                code: 'IV82',
                name: 'Lagunes',
            },
            {
                code: 'IV78',
                name: 'Montagnes',
            },
            {
                code: 'IV96',
                name: 'Sassandra-Marahoué',
            },
            {
                code: 'IV87',
                name: 'Savanes',
            },
            {
                code: 'IV90',
                name: 'Vallée du Bandama',
            },
            {
                code: 'IV97',
                name: 'Woroba',
            },
            {
                code: 'IV98',
                name: 'Yamoussoukro',
            },
            {
                code: 'IV92',
                name: 'Zanzan',
            },
        ],
    },
    {
        code: 'HR',
        id: 2228,
        name: 'Croatia',
        states: [
            {
                code: 'HR07',
                name: 'Bjelovarsko-bilogorska',
            },
            {
                code: 'HR12',
                name: 'Brodsko-posavska',
            },
            {
                code: 'HR19',
                name: 'Dubrovacko-neretvanska',
            },
            {
                code: 'HR21',
                name: 'Grad Zagreb',
            },
            {
                code: 'HR-18',
                name: 'Istarska',
            },
            {
                code: 'HR04',
                name: 'Karlovacka',
            },
            {
                code: 'HR06',
                name: 'Koprivnicko-križevacka',
            },
            {
                code: 'HR02',
                name: 'Krapinsko-zagorska',
            },
            {
                code: 'HR09',
                name: 'Licko-senjska',
            },
            {
                code: 'HR20',
                name: 'Medimurska',
            },
            {
                code: 'HR14',
                name: 'Osjecko-baranjska',
            },
            {
                code: 'HR11',
                name: 'Požeško-slavonska',
            },
            {
                code: 'HR08',
                name: 'Primorsko-goranska',
            },
            {
                code: 'HR15',
                name: 'Šibensko-kninska',
            },
            {
                code: 'HR03',
                name: 'Sisacko-moslavacka',
            },
            {
                code: 'HR17',
                name: 'Splitsko-dalmatinska',
            },
            {
                code: 'HR05',
                name: 'Varaždinska',
            },
            {
                code: 'HR10',
                name: 'Viroviticko-podravska',
            },
            {
                code: 'HR16',
                name: 'Vukovarsko-srijemska',
            },
            {
                code: 'HR13',
                name: 'Zadarska',
            },
            {
                code: 'HR01',
                name: 'Zagrebacka',
            },
        ],
    },
    {
        code: 'CU',
        id: 2229,
        name: 'Cuba',
        states: [
            {
                code: 'CU17',
                name: 'Artemisa',
            },
            {
                code: 'CU05',
                name: 'Camagüey',
            },
            {
                code: 'CU07',
                name: 'Ciego de Ávila',
            },
            {
                code: 'CU08',
                name: 'Cienfuegos',
            },
            {
                code: 'CU09',
                name: 'Granma',
            },
            {
                code: 'CU10',
                name: 'Guantánamo',
            },
            {
                code: 'CU12',
                name: 'Holguín',
            },
            {
                code: 'CU04',
                name: 'Isla de la Juventud',
            },
            {
                code: 'CU02',
                name: 'La Habana',
            },
            {
                code: 'CU13',
                name: 'Las Tunas',
            },
            {
                code: 'CU03',
                name: 'Matanzas',
            },
            {
                code: 'CU18',
                name: 'Mayabeque',
            },
            {
                code: 'CU01',
                name: 'Pinar del Río',
            },
            {
                code: 'CU14',
                name: 'Sancti Spíritus',
            },
            {
                code: 'CU15',
                name: 'Santiago de Cuba',
            },
            {
                code: 'CU16',
                name: 'Villa Clara',
            },
        ],
    },
    {
        code: 'C999',
        id: 2387,
        name: 'Curacao',
        states: [
            {
                code: 'CW.CU',
                name: 'Curacao',
            },
        ],
    },
    {
        code: 'CY',
        id: 2230,
        name: 'Cyprus',
        states: [
            {
                code: 'CY01',
                name: 'Famagusta',
            },
            {
                code: 'CY02',
                name: 'Kyrenia',
            },
            {
                code: 'CY03',
                name: 'Larnaca',
            },
            {
                code: 'CY05',
                name: 'Limassol',
            },
            {
                code: 'CY04',
                name: 'Nicosia',
            },
            {
                code: 'CY06',
                name: 'Paphos',
            },
        ],
    },
    {
        code: 'CZ',
        id: 2231,
        name: 'Czech Republic',
        states: [
            {
                code: 'JC',
                name: 'Jihoceský kraj',
            },
            {
                code: 'JM',
                name: 'Jihomoravský kraj',
            },
            {
                code: 'KA',
                name: 'Karlovarský kraj',
            },
            {
                code: 'KR',
                name: 'Královéhradecký kraj',
            },
            {
                code: 'LI',
                name: 'Liberecký kraj',
            },
            {
                code: 'MO',
                name: 'Moravskoslezský kraj',
            },
            {
                code: 'OL',
                name: 'Olomoucký kraj',
            },
            {
                code: 'PA',
                name: 'Pardubický kraj',
            },
            {
                code: 'PL',
                name: 'Plzenský kraj',
            },
            {
                code: 'PR',
                name: 'Praha, hlavní mesto',
            },
            {
                code: 'ST',
                name: 'Stredoceský kraj',
            },
            {
                code: 'VY',
                name: 'Vysocina',
            },
            {
                code: 'ZL',
                name: 'Zlínský kraj',
            },
            {
                code: 'US',
                name: 'Ústecký kraj',
            },
        ],
    },
    {
        code: 'DK',
        id: 2232,
        name: 'Denmark',
        states: [
            {
                code: 'DA01',
                name: 'Arhus County',
            },
            {
                code: 'DA02',
                name: 'Bornholm Regional Municipality',
            },
            {
                code: 'DA17',
                name: 'Capital Region',
            },
            {
                code: 'DA18',
                name: 'Central Jutland Region',
            },
            {
                code: 'DA16',
                name: 'Frederiksberg municipal',
            },
            {
                code: 'DA03',
                name: 'Frederiksborg County',
            },
            {
                code: 'DA04',
                name: 'Fyn County',
            },
            {
                code: 'DA06',
                name: 'Kobenhavn County',
            },
            {
                code: 'DA05',
                name: 'Kobenhavn municipal',
            },
            {
                code: 'DA07',
                name: 'Nordjylland County',
            },
            {
                code: 'DA19',
                name: 'North Jutland Region',
            },
            {
                code: 'DA08',
                name: 'Ribe County',
            },
            {
                code: 'DA09',
                name: 'Ringkobing County',
            },
            {
                code: 'DA10',
                name: 'Roskilde County',
            },
            {
                code: 'DA11',
                name: 'Sonderjylland County',
            },
            {
                code: 'DA21',
                name: 'South Denmark Region',
            },
            {
                code: 'DA12',
                name: 'Storstrom County',
            },
            {
                code: 'DA13',
                name: 'Vejle County',
            },
            {
                code: 'DA14',
                name: 'Vestsjaelland County',
            },
            {
                code: 'DA15',
                name: 'Viborg County',
            },
            {
                code: 'DA20',
                name: 'Zealand Region',
            },
        ],
    },
    {
        code: 'DJ',
        id: 2233,
        name: 'Djibouti',
        states: [],
    },
    {
        code: 'DM',
        id: 2234,
        name: 'Dominica',
        states: [],
    },
    {
        code: 'DO',
        id: 2235,
        name: 'Dominican Republic',
        states: [
            {
                code: 'DR01',
                name: 'Azua',
            },
            {
                code: 'DR02',
                name: 'Bahoruco',
            },
            {
                code: 'DR03',
                name: 'Barahona',
            },
            {
                code: 'DR04',
                name: 'Dajabón',
            },
            {
                code: 'DR34',
                name: 'Distrito Nacional',
            },
            {
                code: 'DR06',
                name: 'Duarte',
            },
            {
                code: 'DR28',
                name: 'El Seibo',
            },
            {
                code: 'DR11',
                name: 'Elías Piña',
            },
            {
                code: 'DR08',
                name: 'Espaillat',
            },
            {
                code: 'DR29',
                name: 'Hato Mayor',
            },
            {
                code: 'DR19',
                name: 'Hermanas Mirabal',
            },
            {
                code: 'DR09',
                name: 'Independencia',
            },
            {
                code: 'DR10',
                name: 'La Altagracia',
            },
            {
                code: 'DR12',
                name: 'La Romana',
            },
            {
                code: 'DR30',
                name: 'La Vega',
            },
            {
                code: 'DR14',
                name: 'María Trinidad Sánchez',
            },
            {
                code: 'DR31',
                name: 'Monseñor Nouel',
            },
            {
                code: 'DR15',
                name: 'Monte Cristi',
            },
            {
                code: 'DR32',
                name: 'Monte Plata',
            },
            {
                code: 'DR16',
                name: 'Pedernales',
            },
            {
                code: 'DR35',
                name: 'Peravia',
            },
            {
                code: 'DR18',
                name: 'Puerto Plata',
            },
            {
                code: 'DR20',
                name: 'Samaná',
            },
            {
                code: 'DR33',
                name: 'San Cristóbal',
            },
            {
                code: 'DR36',
                name: 'San José de Ocoa',
            },
            {
                code: 'DR23',
                name: 'San Juan',
            },
            {
                code: 'DR24',
                name: 'San Pedro de Macorís',
            },
            {
                code: 'DR21',
                name: 'Sánchez Ramírez',
            },
            {
                code: 'DR25',
                name: 'Santiago',
            },
            {
                code: 'DR26',
                name: 'Santiago Rodríguez',
            },
            {
                code: 'DR37',
                name: 'Santo Domingo',
            },
            {
                code: 'DR27',
                name: 'Valverde',
            },
        ],
    },
    {
        code: 'EC',
        id: 2236,
        name: 'Ecuador',
        states: [
            {
                code: 'EC02',
                name: 'Azuay',
            },
            {
                code: 'EC02',
                name: 'Azuay',
            },
            {
                code: 'EC03',
                name: 'Bolívar',
            },
            {
                code: 'EC04',
                name: 'Cañar',
            },
            {
                code: 'EC05',
                name: 'Carchi',
            },
            {
                code: 'EC06',
                name: 'Chimborazo',
            },
            {
                code: 'EC07',
                name: 'Cotopaxi',
            },
            {
                code: 'EC08',
                name: 'El Oro',
            },
            {
                code: 'EC09',
                name: 'Esmeraldas',
            },
            {
                code: 'EC01',
                name: 'Galápagos',
            },
            {
                code: 'EC10',
                name: 'Guayas',
            },
            {
                code: 'EC11',
                name: 'Imbabura',
            },
            {
                code: 'EC12',
                name: 'Loja',
            },
            {
                code: 'EC13',
                name: 'Los Ríos',
            },
            {
                code: 'EC14',
                name: 'Manabí',
            },
            {
                code: 'EC15',
                name: 'Morona-Santiago',
            },
            {
                code: 'EC23',
                name: 'Napo',
            },
            {
                code: 'EC24',
                name: 'Orellana',
            },
            {
                code: 'EC17',
                name: 'Pastaza',
            },
            {
                code: 'EC18',
                name: 'Pichincha',
            },
            {
                code: 'EC25',
                name: 'Santa Elena',
            },
            {
                code: 'EC26',
                name: 'Santo Domingo de los Tsáchilas',
            },
            {
                code: 'EC22',
                name: 'Sucumbíos',
            },
            {
                code: 'EC19',
                name: 'Tungurahua',
            },
            {
                code: 'EC20',
                name: 'Zamora-Chinchipe',
            },
        ],
    },
    {
        code: 'EG',
        id: 2237,
        name: 'Egypt',
        states: [
            {
                code: 'EG01',
                name: 'Ad Daqahliyah',
            },
            {
                code: 'EG02',
                name: 'Al Bahr al Ahmar',
            },
            {
                code: 'EG03',
                name: 'Al Buhayrah',
            },
            {
                code: 'EG04',
                name: 'Al Fayyum',
            },
            {
                code: 'EG05',
                name: 'Al Gharbiyah',
            },
            {
                code: 'EG06',
                name: 'Al Iskandariyah',
            },
            {
                code: 'EG07',
                name: 'Al Isma`iliyah',
            },
            {
                code: 'EG08',
                name: 'Al Jizah',
            },
            {
                code: 'EG09',
                name: 'Al Minufiyah',
            },
            {
                code: 'EG10',
                name: 'Al Minya',
            },
            {
                code: 'EG11',
                name: 'Al Qahirah',
            },
            {
                code: 'EG12',
                name: 'Al Qalyubiyah',
            },
            {
                code: 'EG28',
                name: 'Al Uqsur',
            },
            {
                code: 'EG13',
                name: 'Al Wadi al Jadid',
            },
            {
                code: 'EG15',
                name: 'As Suways',
            },
            {
                code: 'EG14',
                name: 'Ash Sharqiyah',
            },
            {
                code: 'EG16',
                name: 'Aswan',
            },
            {
                code: 'EG17',
                name: 'Asyut',
            },
            {
                code: 'EG18',
                name: 'Bani Suwayf',
            },
            {
                code: 'EG19',
                name: 'Bur Sa`id',
            },
            {
                code: 'EG20',
                name: 'Dumyat',
            },
            {
                code: 'EG26',
                name: 'Janub Sina',
            },
            {
                code: 'EG21',
                name: 'Kafr ash Shaykh',
            },
            {
                code: 'EG22',
                name: 'Matruh',
            },
            {
                code: 'EG23',
                name: 'Qina',
            },
            {
                code: 'EG27',
                name: 'Shamal Sina',
            },
            {
                code: 'EG24',
                name: 'Suhaj',
            },
        ],
    },
    {
        code: 'SV',
        id: 2238,
        name: 'El Salvador',
        states: [
            {
                code: 'ES01',
                name: 'Ahuachapán',
            },
            {
                code: 'ES02',
                name: 'Cabañas',
            },
            {
                code: 'ES03',
                name: 'Chalatenango',
            },
            {
                code: 'ES04',
                name: 'Cuscatlán',
            },
            {
                code: 'ES05',
                name: 'La Libertad',
            },
            {
                code: 'ES06',
                name: 'La Paz',
            },
            {
                code: 'ES07',
                name: 'La Unión',
            },
            {
                code: 'ES08',
                name: 'Morazán',
            },
            {
                code: 'ES09',
                name: 'San Miguel',
            },
            {
                code: 'ES10',
                name: 'San Salvador',
            },
            {
                code: 'ES12',
                name: 'San Vicente',
            },
            {
                code: 'ES11',
                name: 'Santa Ana',
            },
            {
                code: 'ES13',
                name: 'Sonsonate',
            },
            {
                code: 'ES14',
                name: 'Usulután',
            },
        ],
    },
    {
        code: 'GQ',
        id: 2239,
        name: 'Equatorial Guinea',
        states: [],
    },
    {
        code: 'ER',
        id: 2240,
        name: 'Eritrea',
        states: [],
    },
    {
        code: 'EE',
        id: 2241,
        name: 'Estonia',
        states: [
            {
                code: 'EN01',
                name: 'Harju',
            },
            {
                code: 'EN02',
                name: 'Hiiu',
            },
            {
                code: 'EN03',
                name: 'Ida-Viru',
            },
            {
                code: 'EN04',
                name: 'Järva',
            },
            {
                code: 'EN05',
                name: 'Jõgeva',
            },
            {
                code: 'EN07',
                name: 'Lääne',
            },
            {
                code: 'EN08',
                name: 'Lääne-Viru',
            },
            {
                code: 'EN11',
                name: 'Pärnu',
            },
            {
                code: 'EN12',
                name: 'Põlva',
            },
            {
                code: 'EN13',
                name: 'Rapla',
            },
            {
                code: 'EN14',
                name: 'Saare',
            },
            {
                code: 'EN18',
                name: 'Tartu',
            },
            {
                code: 'EN19',
                name: 'Valga',
            },
            {
                code: 'EN20',
                name: 'Viljandi',
            },
            {
                code: 'EN21',
                name: 'Võru',
            },
        ],
    },
    {
        code: 'ET',
        id: 2242,
        name: 'Ethiopia',
        states: [
            {
                code: 'ET44',
                name: 'Addis Ababa',
            },
            {
                code: 'ET45',
                name: 'Afar',
            },
            {
                code: 'ET46',
                name: 'Amhara',
            },
            {
                code: 'ET47',
                name: 'Benshangul-Gumaz',
            },
            {
                code: 'ET48',
                name: 'Dire Dawa',
            },
            {
                code: 'ET49',
                name: 'Gambela Peoples',
            },
            {
                code: 'ET50',
                name: 'Harari People',
            },
            {
                code: 'ET51',
                name: 'Oromia',
            },
            {
                code: 'ET52',
                name: 'Somali',
            },
            {
                code: 'ET54',
                name: 'Southern Nations, Nationalities and Peoples',
            },
            {
                code: 'ET53',
                name: 'Tigray',
            },
        ],
    },
    {
        code: 'FK',
        id: 2415,
        name: 'Falkland Islands (Malvinas)',
        states: [],
    },
    {
        code: 'FI99',
        id: 2388,
        name: 'Faroe Islands',
        states: [],
    },
    {
        code: 'FJ',
        id: 2243,
        name: 'Fiji',
        states: [],
    },
    {
        code: 'FI',
        id: 2244,
        name: 'Finland',
        states: [
            {
                code: 'FI-AL',
                name: 'Ahvenanmaan lääni',
            },
            {
                code: 'AX',
                name: 'Ahvenanmaa',
            },
            {
                code: 'FI.SK',
                name: 'Etelä-Karjala',
            },
            {
                code: 'FI.SO',
                name: 'Etelä-Pohjanmaa',
            },
            {
                code: 'FI.SS',
                name: 'Etelä-Savo',
            },
            {
                code: 'FI-ES',
                name: 'Etelä-Suomen lääni',
            },
            {
                code: 'FI-IS',
                name: 'Itä-Suomen lääni',
            },
            {
                code: 'FI.KA',
                name: 'Kainuu',
            },
            {
                code: 'FI.KH',
                name: 'Kanta-Häme',
            },
            {
                code: 'FI.CO',
                name: 'Keski-Pohjanmaa',
            },
            {
                code: 'FI.CF',
                name: 'Keski-Suomi',
            },
            {
                code: 'FI.KY',
                name: 'Kymenlaakso',
            },
            {
                code: 'FI-LS',
                name: 'Länsi-Suomen lääni',
            },
            {
                code: 'FI-LL',
                name: 'Lapin lääni',
            },
            {
                code: 'FI.LA',
                name: 'Lappi',
            },
            {
                code: 'FI-OL',
                name: 'Oulun lääni',
            },
            {
                code: 'FI.PH',
                name: 'Päijät-Häme',
            },
            {
                code: 'FI.TR',
                name: 'Pirkanmaa',
            },
            {
                code: 'FI.OS',
                name: 'Pohjanmaa',
            },
            {
                code: 'FI.NK',
                name: 'Pohjois-Karjala',
            },
            {
                code: 'FI.NO',
                name: 'Pohjois-Pohjanmaa',
            },
            {
                code: 'FI.NS',
                name: 'Pohjois-Savo',
            },
            {
                code: 'FI.SA',
                name: 'Satakunta',
            },
            {
                code: 'FI.US',
                name: 'Uusimaa',
            },
            {
                code: 'FI.SF',
                name: 'Varsinais-Suomi',
            },
        ],
    },
    {
        code: 'FR',
        id: 2245,
        name: 'France',
        states: [
            {
                code: 'FRC2',
                name: 'Ain',
            },
            {
                code: 'FRC3',
                name: 'Aisne',
            },
            {
                code: 'FRC4',
                name: 'Allier',
            },
            {
                code: 'FRC6',
                name: 'Alpes-Maritimes',
            },
            {
                code: 'FRC5',
                name: 'Alpes-de-Haute-Provence',
            },
            {
                code: 'FRC1',
                name: 'Alsace',
            },
            {
                code: 'FR97',
                name: 'Aquitaine',
            },
            {
                code: 'FRC7',
                name: 'Ardèche',
            },
            {
                code: 'FRC8',
                name: 'Ardennes',
            },
            {
                code: 'FRC9',
                name: 'Ariège',
            },
            {
                code: 'FRD1',
                name: 'Aube',
            },
            {
                code: 'FRD2',
                name: 'Aude',
            },
            {
                code: 'FR.AR',
                name: 'Auvergne-Rhône-Alpes',
            },
            {
                code: 'FR98',
                name: 'Auvergne',
            },
            {
                code: 'FRD3',
                name: 'Aveyron',
            },
            {
                code: 'FRD4',
                name: 'Bas-Rhin',
            },
            {
                code: 'FR99',
                name: 'Basse-Normandie',
            },
            {
                code: 'FRD5',
                name: 'Bouches-du-Rhône',
            },
            {
                code: 'FR.BF',
                name: 'Bourgogne-Franche-Comté',
            },
            {
                code: 'FRA1',
                name: 'Bourgogne',
            },
            {
                code: 'FRA2',
                name: 'Bretagne',
            },
            {
                code: 'FRD8',
                name: 'Calvados',
            },
            {
                code: 'FRD9',
                name: 'Cantal',
            },
            {
                code: 'FRA3',
                name: 'Centre',
            },
            {
                code: 'FR.CN',
                name: 'Centre-Val de Loire',
            },
            {
                code: 'FRA4',
                name: 'Champagne-Ardenne',
            },
            {
                code: 'FRE1',
                name: 'Charente-Maritime',
            },
            {
                code: 'FRE2',
                name: 'Charente',
            },
            {
                code: 'FRE3',
                name: 'Cher',
            },
            {
                code: 'FRE4',
                name: 'Corrèze',
            },
            {
                code: 'FRE5',
                name: 'Corse-du-Sud',
            },
            {
                code: 'FR.CE',
                name: 'Corse',
            },
            {
                code: 'FRD6',
                name: "Côte-d'Or",
            },
            {
                code: 'FRD7',
                name: "Côtes-d'Armor",
            },
            {
                code: 'FRE6',
                name: 'Creuse',
            },
            {
                code: 'FRE7',
                name: 'Deux-Sèvres',
            },
            {
                code: 'FRE8',
                name: 'Dordogne',
            },
            {
                code: 'FRE9',
                name: 'Doubs',
            },
            {
                code: 'FRF1',
                name: 'Drôme',
            },
            {
                code: 'FRF2',
                name: 'Essonne',
            },
            {
                code: 'FRF3',
                name: 'Eure-et-Loir',
            },
            {
                code: 'FRF4',
                name: 'Eure',
            },
            {
                code: 'FRF5',
                name: 'Finistère',
            },
            {
                code: 'FRA6',
                name: 'Franche-Comte',
            },
            {
                code: 'FRF6',
                name: 'Gard',
            },
            {
                code: 'FRF7',
                name: 'Gers',
            },
            {
                code: 'FRF8',
                name: 'Gironde',
            },
            {
                code: 'FR.AO',
                name: 'Grand Est',
            },
            {
                code: 'FRG1',
                name: 'Haut-Rhin',
            },
            {
                code: 'FRG2',
                name: 'Haute-Corse',
            },
            {
                code: 'FRG3',
                name: 'Haute-Garonne',
            },
            {
                code: 'FRG4',
                name: 'Haute-Loire',
            },
            {
                code: 'FRG5',
                name: 'Haute-Marne',
            },
            {
                code: 'FRA7',
                name: 'Haute-Normandie',
            },
            {
                code: 'FRG6',
                name: 'Haute-Saône',
            },
            {
                code: 'FRG7',
                name: 'Haute-Savoie',
            },
            {
                code: 'FRG8',
                name: 'Haute-Vienne',
            },
            {
                code: 'FRG9',
                name: 'Hautes-Alpes',
            },
            {
                code: 'FRH1',
                name: 'Hautes-Pyrénées',
            },
            {
                code: 'FR.NC',
                name: 'Hauts-de-France',
            },
            {
                code: 'FRH2',
                name: 'Hauts-de-Seine',
            },
            {
                code: 'FRF9',
                name: 'Hérault',
            },
            {
                code: 'FRA8',
                name: 'Ile-de-France',
            },
            {
                code: 'FRH3',
                name: 'Ille-et-Vilaine',
            },
            {
                code: 'FRH5',
                name: 'Indre',
            },
            {
                code: 'FRH4',
                name: 'Indre-et-Loire',
            },
            {
                code: 'FRH6',
                name: 'Isère',
            },
            {
                code: 'FRH7',
                name: 'Jura',
            },
            {
                code: 'FRH8',
                name: 'Landes',
            },
            {
                code: 'FRA9',
                name: 'Languedoc-Roussillon',
            },
            {
                code: 'FRB1',
                name: 'Limousin',
            },
            {
                code: 'FRI3',
                name: 'Loir-et-Cher',
            },
            {
                code: 'FRI2',
                name: 'Loiret',
            },
            {
                code: 'FRI1',
                name: 'Loire',
            },
            {
                code: 'FRH9',
                name: 'Loire-Atlantique',
            },
            {
                code: 'FRB2',
                name: 'Lorraine',
            },
            {
                code: 'FRI4',
                name: 'Lot-et-Garonne',
            },
            {
                code: 'FRI5',
                name: 'Lot',
            },
            {
                code: 'FRI6',
                name: 'Lozère',
            },
            {
                code: 'FRI7',
                name: 'Maine-et-Loire',
            },
            {
                code: 'FRI8',
                name: 'Manche',
            },
            {
                code: 'FRI9',
                name: 'Marne',
            },
            {
                code: 'FRJ1',
                name: 'Mayenne',
            },
            {
                code: 'FRJ2',
                name: 'Meurthe-et-Moselle',
            },
            {
                code: 'FRJ3',
                name: 'Meuse',
            },
            {
                code: 'FRB3',
                name: 'Midi-Pyrenees',
            },
            {
                code: 'FRJ4',
                name: 'Morbihan',
            },
            {
                code: 'FRJ5',
                name: 'Moselle',
            },
            {
                code: 'FRJ6',
                name: 'Nièvre',
            },
            {
                code: 'FRJ7',
                name: 'Nord France',
            },
            {
                code: 'FR67',
                name: 'Nord',
            },
            {
                code: 'FR.ND',
                name: 'Normandie',
            },
            {
                code: 'FR.AC',
                name: 'Nouvelle-Aquitaine',
            },
            {
                code: 'FR.LP',
                name: 'Occitanie',
            },
            {
                code: 'FRJ8',
                name: 'Oise',
            },
            {
                code: 'FRJ9',
                name: 'Orne',
            },
            {
                code: 'FRK1',
                name: 'Paris',
            },
            {
                code: 'FRB4',
                name: 'Pas-de-Calais',
            },
            {
                code: 'FRB5',
                name: 'Pays de la Loire',
            },
            {
                code: 'FRB6',
                name: 'Picardie',
            },
            {
                code: 'FRB7',
                name: 'Poitou-Charentes',
            },
            {
                code: 'FRB8',
                name: "Provence-Alpes-Cote d'Azur",
            },
            {
                code: 'FRK2',
                name: 'Puy-de-Dôme',
            },
            {
                code: 'FRK3',
                name: 'Pyrénées-Atlantiques',
            },
            {
                code: 'FRK4',
                name: 'Pyrénées-Orientales',
            },
            {
                code: 'FRB9',
                name: 'Rhône',
            },
            {
                code: 'FRK5',
                name: 'Saône-et-Loire',
            },
            {
                code: 'FRK6',
                name: 'Sarthe',
            },
            {
                code: 'FRK7',
                name: 'Savoie',
            },
            {
                code: 'FRK9',
                name: 'Seine-Maritime',
            },
            {
                code: 'FRL1',
                name: 'Seine-Saint-Denis',
            },
            {
                code: 'FRK8',
                name: 'Seine-et-Marne',
            },
            {
                code: 'FRL2',
                name: 'Somme',
            },
            {
                code: 'FRL3',
                name: 'Tarn-et-Garonne',
            },
            {
                code: 'FRL4',
                name: 'Tarn',
            },
            {
                code: 'FRL5',
                name: 'Territoire de Belfor',
            },
            {
                code: 'FR14',
                name: 'Territoire de Belfort',
            },
            {
                code: 'FRL6',
                name: "Val-d'Oise",
            },
            {
                code: 'FRL7',
                name: 'Val-de-Marne',
            },
            {
                code: 'FRL8',
                name: 'Var',
            },
            {
                code: 'FRL9',
                name: 'Vaucluse',
            },
            {
                code: 'FRM1',
                name: 'Vendée',
            },
            {
                code: 'FRM2',
                name: 'Vienne',
            },
            {
                code: 'FR94',
                name: 'Ville de Paris',
            },
            {
                code: 'FRM3',
                name: 'Vosges',
            },
            {
                code: 'FRM4',
                name: 'Yonne',
            },
            {
                code: 'FRM5',
                name: 'Yvelines',
            },
            {
                code: 'FR.IF',
                name: 'Île-de-France',
            },
        ],
    },
    {
        code: 'GF',
        id: 2416,
        name: 'French Guiana',
        states: [],
    },
    {
        code: 'PF',
        id: 2417,
        name: 'French Polynesia',
        states: [],
    },
    {
        code: 'TF',
        id: 2418,
        name: 'French Southern Territories',
        states: [],
    },
    {
        code: 'GA',
        id: 2246,
        name: 'Gabon',
        states: [
            {
                code: 'GB01',
                name: 'Estuaire',
            },
            {
                code: 'GB02',
                name: 'Haut-Ogooué',
            },
            {
                code: 'GB03',
                name: 'Moyen-Ogooué',
            },
            {
                code: 'GB04',
                name: 'Ngounié',
            },
            {
                code: 'GB05',
                name: 'Nyanga',
            },
            {
                code: 'GB06',
                name: 'Ogooué-Ivindo',
            },
            {
                code: 'GB07',
                name: 'Ogooué-Lolo',
            },
            {
                code: 'GB08',
                name: 'Ogooué-Maritime',
            },
            {
                code: 'GB09',
                name: 'Woleu-Ntem',
            },
        ],
    },
    {
        code: 'GM',
        id: 2389,
        name: 'Gambia',
        states: [
            {
                code: 'GA01',
                name: 'Banjul',
            },
            {
                code: 'GA03',
                name: 'Central River',
            },
            {
                code: 'GA02',
                name: 'Lower River',
            },
            {
                code: 'GA07',
                name: 'North Bank',
            },
            {
                code: 'GA04',
                name: 'Upper River',
            },
            {
                code: 'GA05',
                name: 'West Coast',
            },
        ],
    },
    {
        code: 'GE',
        id: 2248,
        name: 'Georgia',
        states: [
            {
                code: 'GG02',
                name: 'Abkhazia',
            },
            {
                code: 'GG04',
                name: 'Ajaria',
            },
            {
                code: 'GG65',
                name: 'Guria',
            },
            {
                code: 'GG66',
                name: 'Imereti',
            },
            {
                code: 'GG67',
                name: 'Kakheti',
            },
            {
                code: 'GG68',
                name: 'Kvemo Kartli',
            },
            {
                code: 'GG69',
                name: 'Mtskheta-Mtianeti',
            },
            {
                code: 'GG70',
                name: 'Racha-Lochkhumi-Kvemo Svaneti',
            },
            {
                code: 'GG71',
                name: 'Samegrelo-Zemo Svaneti',
            },
            {
                code: 'GG72',
                name: 'Samtskhe-Javakheti',
            },
            {
                code: 'GG73',
                name: 'Shida Kartli',
            },
            {
                code: 'GG51',
                name: 'Tbilisi',
            },
        ],
    },
    {
        code: 'DE',
        id: 2249,
        name: 'Germany',
        states: [
            {
                code: 'BW',
                name: 'Baden-Württemberg',
            },
            {
                code: 'BY',
                name: 'Bayern',
            },
            {
                code: 'BE',
                name: 'Berlin',
            },
            {
                code: 'BB',
                name: 'Brandenburg',
            },
            {
                code: 'HB',
                name: 'Bremen',
            },
            {
                code: 'HH',
                name: 'Hamburg',
            },
            {
                code: 'HE',
                name: 'Hessen',
            },
            {
                code: 'MV',
                name: 'Mecklenburg-Vorpommern',
            },
            {
                code: 'NI',
                name: 'Niedersachsen',
            },
            {
                code: 'NW',
                name: 'Nordrhein-Westfalen',
            },
            {
                code: 'RP',
                name: 'Rheinland-Pfalz',
            },
            {
                code: 'SL',
                name: 'Saarland',
            },
            {
                code: 'SN',
                name: 'Sachsen',
            },
            {
                code: 'ST',
                name: 'Sachsen-Anhalt',
            },
            {
                code: 'SH',
                name: 'Schleswig-Holstein',
            },
            {
                code: 'TH',
                name: 'Thüringen',
            },
        ],
    },
    {
        code: 'GH',
        id: 2250,
        name: 'Ghana',
        states: [
            {
                code: 'GH02',
                name: 'Ashanti',
            },
            {
                code: 'GH03',
                name: 'Brong-Ahafo',
            },
            {
                code: 'GH04',
                name: 'Central',
            },
            {
                code: 'GH05',
                name: 'Eastern',
            },
            {
                code: 'GH01',
                name: 'Greater Accra',
            },
            {
                code: 'GH06',
                name: 'Northern',
            },
            {
                code: 'GH10',
                name: 'Upper East',
            },
            {
                code: 'GH11',
                name: 'Upper West',
            },
            {
                code: 'GH08',
                name: 'Volta',
            },
            {
                code: 'GH09',
                name: 'Western',
            },
        ],
    },
    {
        code: 'G999',
        id: 2390,
        name: 'Gibraltar',
        states: [
            {
                code: 'GI.GI',
                name: 'Gibraltar',
            },
        ],
    },
    {
        code: 'GR',
        id: 2251,
        name: 'Greece',
        states: [
            {
                code: '13',
                name: 'Achaïa',
            },
            {
                code: '69',
                name: 'Agio Oros',
            },
            {
                code: '01',
                name: 'Aitolia kai Akarnania',
            },
            {
                code: '11',
                name: 'Argolida',
            },
            {
                code: '12',
                name: 'Arkadia',
            },
            {
                code: '31',
                name: 'Arta',
            },
            {
                code: 'A1',
                name: 'Attiki',
            },
            {
                code: '64',
                name: 'Chalkidiki',
            },
            {
                code: '94',
                name: 'Chania',
            },
            {
                code: '85',
                name: 'Chios',
            },
            {
                code: '81',
                name: 'Dodekanisos',
            },
            {
                code: '52',
                name: 'Drama',
            },
            {
                code: '71',
                name: 'Evros',
            },
            {
                code: '05',
                name: 'Evrytania',
            },
            {
                code: '04',
                name: 'Evvoia',
            },
            {
                code: '63',
                name: 'Florina',
            },
            {
                code: '07',
                name: 'Fokida',
            },
            {
                code: '06',
                name: 'Fthiotida',
            },
            {
                code: '51',
                name: 'Grevena',
            },
            {
                code: '14',
                name: 'Ileia',
            },
            {
                code: '53',
                name: 'Imathia',
            },
            {
                code: '33',
                name: 'Ioannina',
            },
            {
                code: '91',
                name: 'Irakleio',
            },
            {
                code: '41',
                name: 'Karditsa',
            },
            {
                code: '56',
                name: 'Kastoria',
            },
            {
                code: '55',
                name: 'Kavala',
            },
            {
                code: '23',
                name: 'Kefallonia',
            },
            {
                code: '22',
                name: 'Kerkyra',
            },
            {
                code: '57',
                name: 'Kilkis',
            },
            {
                code: '15',
                name: 'Korinthia',
            },
            {
                code: '58',
                name: 'Kozani',
            },
            {
                code: '82',
                name: 'Kyklades',
            },
            {
                code: '16',
                name: 'Lakonia',
            },
            {
                code: '42',
                name: 'Larisa',
            },
            {
                code: '92',
                name: 'Lasithi',
            },
            {
                code: '24',
                name: 'Lefkada',
            },
            {
                code: '83',
                name: 'Lesvos',
            },
            {
                code: '43',
                name: 'Magnisia',
            },
            {
                code: '17',
                name: 'Messinia',
            },
            {
                code: '59',
                name: 'Pella',
            },
            {
                code: '61',
                name: 'Pieria',
            },
            {
                code: '34',
                name: 'Preveza',
            },
            {
                code: '93',
                name: 'Rethymno',
            },
            {
                code: '73',
                name: 'Rodopi',
            },
            {
                code: '84',
                name: 'Samos',
            },
            {
                code: '62',
                name: 'Serres',
            },
            {
                code: '32',
                name: 'Thesprotia',
            },
            {
                code: '54',
                name: 'Thessaloniki',
            },
            {
                code: '44',
                name: 'Trikala',
            },
            {
                code: '03',
                name: 'Voiotia',
            },
            {
                code: '72',
                name: 'Xanthi',
            },
            {
                code: '21',
                name: 'Zakynthos',
            },
        ],
    },
    {
        code: 'GL',
        id: 2252,
        name: 'Greenland',
        states: [],
    },
    {
        code: 'GD',
        id: 2253,
        name: 'Grenada',
        states: [],
    },
    {
        code: 'GP',
        id: 2419,
        name: 'Guadeloupe',
        states: [],
    },
    {
        code: 'GU',
        id: 2376,
        name: 'Guam',
        states: [],
    },
    {
        code: 'GT',
        id: 2371,
        name: 'Guatemala',
        states: [
            {
                code: 'GT01',
                name: 'Alta Verapaz',
            },
            {
                code: 'GT02',
                name: 'Baja Verapaz',
            },
            {
                code: 'GT03',
                name: 'Chimaltenango',
            },
            {
                code: 'GT04',
                name: 'Chiquimula',
            },
            {
                code: 'GT05',
                name: 'El Progreso',
            },
            {
                code: 'GT06',
                name: 'Escuintla',
            },
            {
                code: 'GT07',
                name: 'Guatemala',
            },
            {
                code: 'GT08',
                name: 'Huehuetenango',
            },
            {
                code: 'GT09',
                name: 'Izabal',
            },
            {
                code: 'GT10',
                name: 'Jalapa',
            },
            {
                code: 'GT11',
                name: 'Jutiapa',
            },
            {
                code: 'GT12',
                name: 'Petén',
            },
            {
                code: 'GT13',
                name: 'Quetzaltenango',
            },
            {
                code: 'GT14',
                name: 'Quiché',
            },
            {
                code: 'GT15',
                name: 'Retalhuleu',
            },
            {
                code: 'GT16',
                name: 'Sacatepéquez',
            },
            {
                code: 'GT17',
                name: 'San Marcos',
            },
            {
                code: 'GT18',
                name: 'Santa Rosa',
            },
            {
                code: 'GT19',
                name: 'Sololá',
            },
            {
                code: 'GT20',
                name: 'Suchitepéquez',
            },
            {
                code: 'GT21',
                name: 'Totonicapán',
            },
            {
                code: 'GT22',
                name: 'Zacapa',
            },
        ],
    },
    {
        code: 'GG',
        id: 2420,
        name: 'Guernsey',
        states: [],
    },
    {
        code: 'GN',
        id: 2255,
        name: 'Guinea',
        states: [
            {
                code: 'GV01',
                name: 'Beyla',
            },
            {
                code: 'GV02',
                name: 'Boffa',
            },
            {
                code: 'GV03',
                name: 'Boké',
            },
            {
                code: 'GV04',
                name: 'Conakry',
            },
            {
                code: 'GV30',
                name: 'Coyah',
            },
            {
                code: 'GV05',
                name: 'Dabola',
            },
            {
                code: 'GV06',
                name: 'Dalaba',
            },
            {
                code: 'GV07',
                name: 'Dinguiraye',
            },
            {
                code: 'GV31',
                name: 'Dubréka',
            },
            {
                code: 'GV09',
                name: 'Faranah',
            },
            {
                code: 'GV10',
                name: 'Forécariah',
            },
            {
                code: 'GV11',
                name: 'Fria',
            },
            {
                code: 'GV12',
                name: 'Gaoual',
            },
            {
                code: 'GV13',
                name: 'Guéckédou',
            },
            {
                code: 'GV32',
                name: 'Kankan',
            },
            {
                code: 'GV15',
                name: 'Kérouané',
            },
            {
                code: 'GV16',
                name: 'Kindia',
            },
            {
                code: 'GV17',
                name: 'Kissidougou',
            },
            {
                code: 'GV33',
                name: 'Koubia',
            },
            {
                code: 'GV18',
                name: 'Koundara',
            },
            {
                code: 'GV19',
                name: 'Kouroussa',
            },
            {
                code: 'GV34',
                name: 'Labé',
            },
            {
                code: 'GV35',
                name: 'Lélouma',
            },
            {
                code: 'GV36',
                name: 'Lola',
            },
            {
                code: 'GV21',
                name: 'Macenta',
            },
            {
                code: 'GV22',
                name: 'Mali',
            },
            {
                code: 'GV23',
                name: 'Mamou',
            },
            {
                code: 'GV37',
                name: 'Mandiana',
            },
            {
                code: 'GV38',
                name: 'Nzérékoré',
            },
            {
                code: 'GV25',
                name: 'Pita',
            },
            {
                code: 'GV39',
                name: 'Siguiri',
            },
            {
                code: 'GV27',
                name: 'Télimélé',
            },
            {
                code: 'GV28',
                name: 'Tougué',
            },
            {
                code: 'GV29',
                name: 'Yomou',
            },
        ],
    },
    {
        code: 'GW',
        id: 2256,
        name: 'Guinea-Bissau',
        states: [
            {
                code: 'PU01',
                name: 'Bafatá',
            },
            {
                code: 'PU12',
                name: 'Biombo',
            },
            {
                code: 'PU11',
                name: 'Bissau',
            },
            {
                code: 'PU05',
                name: 'Bolama',
            },
            {
                code: 'PU06',
                name: 'Cacheu',
            },
            {
                code: 'PU10',
                name: 'Gabú',
            },
            {
                code: 'PU04',
                name: 'Oio',
            },
            {
                code: 'PU02',
                name: 'Quinara',
            },
            {
                code: 'PU07',
                name: 'Tombali',
            },
        ],
    },
    {
        code: 'GY',
        id: 2257,
        name: 'Guyana',
        states: [
            {
                code: 'GY10',
                name: 'Barima-Waini',
            },
            {
                code: 'GY11',
                name: 'Cuyuni-Mazaruni',
            },
            {
                code: 'GY12',
                name: 'Demerara-Mahaica',
            },
            {
                code: 'GY13',
                name: 'East Berbice-Corentyne',
            },
            {
                code: 'GY14',
                name: 'Essequibo Islands-West Demerara',
            },
            {
                code: 'GY15',
                name: 'Mahaica-Berbice',
            },
            {
                code: 'GY16',
                name: 'Pomeroon-Supenaam',
            },
            {
                code: 'GY17',
                name: 'Potaro-Siparuni',
            },
            {
                code: 'GY18',
                name: 'Upper Demerara-Berbice',
            },
            {
                code: 'GY19',
                name: 'Upper Takutu-Upper Essequibo',
            },
        ],
    },
    {
        code: 'HT',
        id: 2258,
        name: 'Haiti',
        states: [
            {
                code: 'HA07',
                name: 'Centre',
            },
            {
                code: 'HA14',
                name: "Grand' Anse",
            },
            {
                code: 'HA06',
                name: "L'Artibonite",
            },
            {
                code: 'HA15',
                name: 'Nippes',
            },
            {
                code: 'HA10',
                name: 'Nord-Est',
            },
            {
                code: 'HA03',
                name: 'Nord-Ouest',
            },
            {
                code: 'HA09',
                name: 'Nord',
            },
            {
                code: 'HA11',
                name: 'Ouest',
            },
            {
                code: 'HA13',
                name: 'Sud-Est',
            },
            {
                code: 'HA12',
                name: 'Sud',
            },
        ],
    },
    {
        code: 'HM',
        id: 2421,
        name: 'Heard and McDonald Islands',
        states: [],
    },
    {
        code: 'VA',
        id: 2362,
        name: 'Holy See (Vatican City State)',
        states: [],
    },
    {
        code: 'HN',
        id: 2259,
        name: 'Honduras',
        states: [
            {
                code: 'HO01',
                name: 'Atlántida',
            },
            {
                code: 'HO02',
                name: 'Choluteca',
            },
            {
                code: 'HO03',
                name: 'Colón',
            },
            {
                code: 'HO04',
                name: 'Comayagua',
            },
            {
                code: 'HO05',
                name: 'Copán',
            },
            {
                code: 'HO06',
                name: 'Cortés',
            },
            {
                code: 'HO07',
                name: 'El Paraíso',
            },
            {
                code: 'HO08',
                name: 'Francisco Morazán',
            },
            {
                code: 'HO09',
                name: 'Gracias a Dios',
            },
            {
                code: 'HO10',
                name: 'Intibucá',
            },
            {
                code: 'HO11',
                name: 'Islas de la Bahía',
            },
            {
                code: 'HO12',
                name: 'La Paz',
            },
            {
                code: 'HO13',
                name: 'Lempira',
            },
            {
                code: 'HO14',
                name: 'Ocotepeque',
            },
            {
                code: 'HO15',
                name: 'Olancho',
            },
            {
                code: 'HO16',
                name: 'Santa Bárbara',
            },
            {
                code: 'HO17',
                name: 'Valle',
            },
            {
                code: 'HO18',
                name: 'Yoro',
            },
        ],
    },
    {
        code: 'HK',
        id: 2377,
        name: 'Hong Kong',
        states: [
            {
                code: 'HK001',
                name: 'Hong Kong Island',
            },
            {
                code: 'HK002',
                name: 'Kowloon',
            },
            {
                code: 'HK003',
                name: 'New Territories',
            },
        ],
    },
    {
        code: 'HU',
        id: 2260,
        name: 'Hungary',
        states: [
            {
                code: 'BK',
                name: 'Bács-Kiskun',
            },
            {
                code: 'BA',
                name: 'Baranya',
            },
            {
                code: 'BE',
                name: 'Békés',
            },
            {
                code: 'BC',
                name: 'Békéscsaba',
            },
            {
                code: 'BZ',
                name: 'Borsod-Abaúj-Zemplén',
            },
            {
                code: 'BU',
                name: 'Budapest',
            },
            {
                code: 'CS',
                name: 'Csongrád',
            },
            {
                code: 'DE',
                name: 'Debrecen',
            },
            {
                code: 'DU',
                name: 'Dunaújváros',
            },
            {
                code: 'EG',
                name: 'Eger',
            },
            {
                code: 'ER',
                name: 'Erd',
            },
            {
                code: 'FE',
                name: 'Fejér',
            },
            {
                code: 'GY',
                name: 'Gyor',
            },
            {
                code: 'GS',
                name: 'Gyor-Moson-Sopron',
            },
            {
                code: 'HB',
                name: 'Hajdú-Bihar',
            },
            {
                code: 'HE',
                name: 'Heves',
            },
            {
                code: 'HV',
                name: 'Hódmezovásárhely',
            },
            {
                code: 'JN',
                name: 'Jász-Nagykun-Szolnok',
            },
            {
                code: 'KV',
                name: 'Kaposvár',
            },
            {
                code: 'KM',
                name: 'Kecskemét',
            },
            {
                code: 'KE',
                name: 'Komárom-Esztergom',
            },
            {
                code: 'MI',
                name: 'Miskolc',
            },
            {
                code: 'NK',
                name: 'Nagykanizsa',
            },
            {
                code: 'NO',
                name: 'Nógrád',
            },
            {
                code: 'NY',
                name: 'Nyíregyháza',
            },
            {
                code: 'PS',
                name: 'Pécs',
            },
            {
                code: 'PE',
                name: 'Pest',
            },
            {
                code: 'ST',
                name: 'Salgótarján',
            },
            {
                code: 'SO',
                name: 'Somogy',
            },
            {
                code: 'SN',
                name: 'Sopron',
            },
            {
                code: 'SZ',
                name: 'Szabolcs-Szatmár-Bereg',
            },
            {
                code: 'SD',
                name: 'Szeged',
            },
            {
                code: 'SF',
                name: 'Székesfehérvár',
            },
            {
                code: 'SS',
                name: 'Szekszárd',
            },
            {
                code: 'SK',
                name: 'Szolnok',
            },
            {
                code: 'SH',
                name: 'Szombathely',
            },
            {
                code: 'TB',
                name: 'Tatabánya',
            },
            {
                code: 'TO',
                name: 'Tolna',
            },
            {
                code: 'VA',
                name: 'Vas',
            },
            {
                code: 'VE',
                name: 'Veszprém',
            },
            {
                code: 'VM',
                name: 'Veszprém City',
            },
            {
                code: 'ZA',
                name: 'Zala',
            },
            {
                code: 'ZE',
                name: 'Zalaegerszeg',
            },
        ],
    },
    {
        code: 'IS',
        id: 2261,
        name: 'Iceland',
        states: [
            {
                code: '7',
                name: 'Austurland',
            },
            {
                code: '1',
                name: 'Höfuðborgarsvæði utan Reykjavíkur',
            },
            {
                code: '6',
                name: 'Norðurland eystra',
            },
            {
                code: '5',
                name: 'Norðurland vestra',
            },
            {
                code: '0',
                name: 'Reykjavík',
            },
            {
                code: '8',
                name: 'Suðurland',
            },
            {
                code: '2',
                name: 'Suðurnes',
            },
            {
                code: '4',
                name: 'Vestfirðir',
            },
            {
                code: '3',
                name: 'Vesturland',
            },
        ],
    },
    {
        code: 'IN',
        id: 2262,
        name: 'India',
        states: [
            {
                code: 'AN',
                name: 'Andaman and Nicobar Islands',
            },
            {
                code: 'AP',
                name: 'Andhra Pradesh',
            },
            {
                code: 'AR',
                name: 'Arunachal Pradesh',
            },
            {
                code: 'AS',
                name: 'Assam',
            },
            {
                code: 'BR',
                name: 'Bihar',
            },
            {
                code: 'CH',
                name: 'Chandigarh',
            },
            {
                code: 'CT',
                name: 'Chhattisgarh',
            },
            {
                code: 'DN',
                name: 'Dadra and Nagar Haveli',
            },
            {
                code: 'DD',
                name: 'Daman and Diu',
            },
            {
                code: 'DL',
                name: 'Delhi',
            },
            {
                code: 'GA',
                name: 'Goa',
            },
            {
                code: 'GJ',
                name: 'Gujarat',
            },
            {
                code: 'HR',
                name: 'Haryana',
            },
            {
                code: 'HP',
                name: 'Himachal Pradesh',
            },
            {
                code: 'JK',
                name: 'Jammu and Kashmir',
            },
            {
                code: 'JH',
                name: 'Jharkhand',
            },
            {
                code: 'KA',
                name: 'Karnataka',
            },
            {
                code: 'KL',
                name: 'Kerala',
            },
            {
                code: 'LD',
                name: 'Lakshadweep',
            },
            {
                code: 'MP',
                name: 'Madhya Pradesh',
            },
            {
                code: 'MH',
                name: 'Maharashtra',
            },
            {
                code: 'MN',
                name: 'Manipur',
            },
            {
                code: 'ML',
                name: 'Meghalaya',
            },
            {
                code: 'MZ',
                name: 'Mizoram',
            },
            {
                code: 'NL',
                name: 'Nagaland',
            },
            {
                code: 'OR',
                name: 'Orissa',
            },
            {
                code: 'PY',
                name: 'Pondicherry',
            },
            {
                code: 'PB',
                name: 'Punjab',
            },
            {
                code: 'RJ',
                name: 'Rajasthan',
            },
            {
                code: 'SK',
                name: 'Sikkim',
            },
            {
                code: 'TN',
                name: 'Tamil Nadu',
            },
            {
                code: 'TG',
                name: 'Telangana',
            },
            {
                code: 'TR',
                name: 'Tripura',
            },
            {
                code: 'UP',
                name: 'Uttar Pradesh',
            },
            {
                code: 'UL',
                name: 'Uttaranchal',
            },
            {
                code: 'WB',
                name: 'West Bengal',
            },
        ],
    },
    {
        code: 'ID',
        id: 2263,
        name: 'Indonesia',
        states: [
            {
                code: 'AC',
                name: 'Aceh',
            },
            {
                code: 'BA',
                name: 'Bali',
            },
            {
                code: 'BB',
                name: 'Bangka Belitung',
            },
            {
                code: 'BT',
                name: 'Banten',
            },
            {
                code: 'BE',
                name: 'Bengkulu',
            },
            {
                code: 'GO',
                name: 'Gorontalo',
            },
            {
                code: 'JK',
                name: 'Jakarta Raya',
            },
            {
                code: 'JA',
                name: 'Jambi',
            },
            {
                code: 'JB',
                name: 'Jawa Barat',
            },
            {
                code: 'JT',
                name: 'Jawa Tengah',
            },
            {
                code: 'JI',
                name: 'Jawa Timur',
            },
            {
                code: 'KB',
                name: 'Kalimantan Barat',
            },
            {
                code: 'KS',
                name: 'Kalimantan Selatan',
            },
            {
                code: 'KT',
                name: 'Kalimantan Tengah',
            },
            {
                code: 'KI',
                name: 'Kalimantan Timur',
            },
            {
                code: 'KR',
                name: 'Kepulauan Riau',
            },
            {
                code: 'LA',
                name: 'Lampung',
            },
            {
                code: 'MA',
                name: 'Maluku',
            },
            {
                code: 'MU',
                name: 'Maluku Utara',
            },
            {
                code: 'NB',
                name: 'Nusa Tenggara Barat',
            },
            {
                code: 'NT',
                name: 'Nusa Tenggara Timur',
            },
            {
                code: 'PA',
                name: 'Papua',
            },
            {
                code: 'PB',
                name: 'Papua Barat',
            },
            {
                code: 'RI',
                name: 'Riau',
            },
            {
                code: 'SR',
                name: 'Sulawesi Barat',
            },
            {
                code: 'SN',
                name: 'Sulawesi Selatan',
            },
            {
                code: 'ST',
                name: 'Sulawesi Tengah',
            },
            {
                code: 'SG',
                name: 'Sulawesi Tenggara',
            },
            {
                code: 'SA',
                name: 'Sulawesi Utara',
            },
            {
                code: 'SB',
                name: 'Sumatera Barat',
            },
            {
                code: 'SS',
                name: 'Sumatera Selatan',
            },
            {
                code: 'SU',
                name: 'Sumatera Utara',
            },
            {
                code: 'YO',
                name: 'Yogyakarta',
            },
        ],
    },
    {
        code: 'IR',
        id: 2264,
        name: 'Iran; Islamic Republic of',
        states: [
            {
                code: 'IR44',
                name: 'Alborz',
            },
            {
                code: 'IR32',
                name: 'Ardebil',
            },
            {
                code: 'IR22',
                name: 'Bushehr',
            },
            {
                code: 'IR03',
                name: 'Chahar Mahall and Bakhtiari',
            },
            {
                code: 'IR33',
                name: 'East Azarbaijan',
            },
            {
                code: 'IR28',
                name: 'Esfahan',
            },
            {
                code: 'IR07',
                name: 'Fars',
            },
            {
                code: 'IR08',
                name: 'Gilan',
            },
            {
                code: 'IR37',
                name: 'Golestan',
            },
            {
                code: 'IR09',
                name: 'Hamadan',
            },
            {
                code: 'IR11',
                name: 'Hormozgan',
            },
            {
                code: 'IR42',
                name: 'IRazavi Khorasan',
            },
            {
                code: 'IR10',
                name: 'Ilam',
            },
            {
                code: 'IR29',
                name: 'Kerman',
            },
            {
                code: 'IR13',
                name: 'Kermanshah',
            },
            {
                code: 'IR15',
                name: 'Khuzestan',
            },
            {
                code: 'IR05',
                name: 'Kohgiluyeh and Buyer Ahmad',
            },
            {
                code: 'IR16',
                name: 'Kordestan',
            },
            {
                code: 'IR23',
                name: 'Lorestan',
            },
            {
                code: 'IR34',
                name: 'Markazi',
            },
            {
                code: 'IR35',
                name: 'Mazandaran',
            },
            {
                code: 'IR43',
                name: 'North Khorasan',
            },
            {
                code: 'IR38',
                name: 'Qazvin',
            },
            {
                code: 'IR39',
                name: 'Qom',
            },
            {
                code: 'IR25',
                name: 'Semnan',
            },
            {
                code: 'IR04',
                name: 'Sistan and Baluchestan',
            },
            {
                code: 'IR41',
                name: 'South Khorasan',
            },
            {
                code: 'IR26',
                name: 'Tehran',
            },
            {
                code: 'IR01',
                name: 'West Azarbaijan',
            },
            {
                code: 'IR40',
                name: 'Yazd',
            },
            {
                code: 'IR36',
                name: 'Zanjan',
            },
        ],
    },
    {
        code: 'IQ',
        id: 2265,
        name: 'Iraq',
        states: [
            {
                code: 'IZ01',
                name: 'Al-Anbar',
            },
            {
                code: 'IZ02',
                name: 'Al-Basrah',
            },
            {
                code: 'IZ03',
                name: 'Al-Muthanna',
            },
            {
                code: 'IZ04',
                name: 'Al-Qadisiyah',
            },
            {
                code: 'IZ17',
                name: 'An-Najaf',
            },
            {
                code: 'IZ11',
                name: 'Arbil',
            },
            {
                code: 'IZ05',
                name: 'As-Sulaymaniyah',
            },
            {
                code: 'IZ13',
                name: "At-Ta'mim",
            },
            {
                code: 'IZ06',
                name: 'Babil',
            },
            {
                code: 'IZ07',
                name: 'Baghdad',
            },
            {
                code: 'IZ08',
                name: 'Dahuk',
            },
            {
                code: 'IZ09',
                name: 'Dhi Qar',
            },
            {
                code: 'IZ10',
                name: 'Diyala',
            },
            {
                code: 'IZ12',
                name: 'Karbala',
            },
            {
                code: 'IZ14',
                name: 'Maysan',
            },
            {
                code: 'IZ15',
                name: 'Ninawa',
            },
            {
                code: 'IZ18',
                name: 'Salah ad-Din',
            },
            {
                code: 'IZ16',
                name: 'Wasit',
            },
        ],
    },
    {
        code: 'IE',
        id: 2266,
        name: 'Ireland',
        states: [
            {
                code: 'CW',
                name: 'Carlow',
            },
            {
                code: 'CN',
                name: 'Cavan',
            },
            {
                code: 'CE',
                name: 'Clare',
            },
            {
                code: 'C',
                name: 'Connacht',
            },
            {
                code: 'CO',
                name: 'Cork',
            },
            {
                code: 'DL',
                name: 'Donegal',
            },
            {
                code: 'D',
                name: 'Dublin',
            },
            {
                code: 'G',
                name: 'Galway',
            },
            {
                code: 'KY',
                name: 'Kerry',
            },
            {
                code: 'KE',
                name: 'Kildare',
            },
            {
                code: 'KK',
                name: 'Kilkenny',
            },
            {
                code: 'LS',
                name: 'Laois',
            },
            {
                code: 'L',
                name: 'Leinster',
            },
            {
                code: 'LM',
                name: 'Leitrim',
            },
            {
                code: 'LK',
                name: 'Limerick',
            },
            {
                code: 'LD',
                name: 'Longford',
            },
            {
                code: 'LH',
                name: 'Louth',
            },
            {
                code: 'MO',
                name: 'Mayo',
            },
            {
                code: 'MH',
                name: 'Meath',
            },
            {
                code: 'MN',
                name: 'Monaghan',
            },
            {
                code: 'M',
                name: 'Munster',
            },
            {
                code: 'OY',
                name: 'Offaly',
            },
            {
                code: 'RN',
                name: 'Roscommon',
            },
            {
                code: 'SO',
                name: 'Sligo',
            },
            {
                code: 'TA',
                name: 'Tipperary',
            },
            {
                code: 'U',
                name: 'Ulster',
            },
            {
                code: 'WD',
                name: 'Waterford',
            },
            {
                code: 'WH',
                name: 'Westmeath',
            },
            {
                code: 'WX',
                name: 'Wexford',
            },
            {
                code: 'WW',
                name: 'Wicklow',
            },
        ],
    },
    {
        code: 'IM',
        id: 2445,
        name: 'Isle of Man',
        states: [],
    },
    {
        code: 'IL',
        id: 2267,
        name: 'Israel',
        states: [
            {
                code: 'IS01',
                name: 'HaDarom',
            },
            {
                code: 'IS02',
                name: 'HaMerkaz',
            },
            {
                code: 'IS03',
                name: 'HaZafon',
            },
            {
                code: 'IS04',
                name: 'Haifa',
            },
            {
                code: 'IS06',
                name: 'Jerusalem',
            },
            {
                code: 'IS05',
                name: 'Tel Aviv',
            },
        ],
    },
    {
        code: 'IT',
        id: 2268,
        name: 'Italy',
        states: [
            {
                code: '65',
                name: 'Abruzzo',
            },
            {
                code: 'AG',
                name: 'Agrigento',
            },
            {
                code: 'AL',
                name: 'Alessandria',
            },
            {
                code: 'AN',
                name: 'Ancona',
            },
            {
                code: 'AO',
                name: 'Aosta',
            },
            {
                code: 'AR',
                name: 'Arezzo',
            },
            {
                code: 'AP',
                name: 'Ascoli Piceno',
            },
            {
                code: 'AT',
                name: 'Asti',
            },
            {
                code: 'AV',
                name: 'Avellino',
            },
            {
                code: 'BA',
                name: 'Bari',
            },
            {
                code: 'BT',
                name: 'Barletta-Andria-Trani',
            },
            {
                code: '77',
                name: 'Basilicata',
            },
            {
                code: 'BL',
                name: 'Belluno',
            },
            {
                code: 'BN',
                name: 'Benevento',
            },
            {
                code: 'BG',
                name: 'Bergamo',
            },
            {
                code: 'BI',
                name: 'Biella',
            },
            {
                code: 'BO',
                name: 'Bologna',
            },
            {
                code: 'BZ',
                name: 'Bolzano',
            },
            {
                code: 'BS',
                name: 'Brescia',
            },
            {
                code: 'BR',
                name: 'Brindisi',
            },
            {
                code: 'CA',
                name: 'Cagliari',
            },
            {
                code: '78',
                name: 'Calabria',
            },
            {
                code: 'CL',
                name: 'Caltanissetta',
            },
            {
                code: '72',
                name: 'Campania',
            },
            {
                code: 'CB',
                name: 'Campobasso',
            },
            {
                code: 'CI',
                name: 'Carbonia-Iglesias',
            },
            {
                code: 'CE',
                name: 'Caserta',
            },
            {
                code: 'CT',
                name: 'Catania',
            },
            {
                code: 'CZ',
                name: 'Catanzaro',
            },
            {
                code: 'CH',
                name: 'Chieti',
            },
            {
                code: 'CO',
                name: 'Como',
            },
            {
                code: 'CS',
                name: 'Cosenza',
            },
            {
                code: 'CR',
                name: 'Cremona',
            },
            {
                code: 'KR',
                name: 'Crotone',
            },
            {
                code: 'CN',
                name: 'Cuneo',
            },
            {
                code: '45',
                name: 'Emilia-Romagna',
            },
            {
                code: 'EN',
                name: 'Enna',
            },
            {
                code: 'FM',
                name: 'Fermo',
            },
            {
                code: 'FE',
                name: 'Ferrara',
            },
            {
                code: 'FI',
                name: 'Firenze',
            },
            {
                code: 'FG',
                name: 'Foggia',
            },
            {
                code: 'FC',
                name: 'Forli-Cesena',
            },
            {
                code: '36',
                name: 'Friuli-Venezia Giulia',
            },
            {
                code: 'FR',
                name: 'Frosinone',
            },
            {
                code: 'GE',
                name: 'Genova',
            },
            {
                code: 'GO',
                name: 'Gorizia',
            },
            {
                code: 'GR',
                name: 'Grosseto',
            },
            {
                code: 'IM',
                name: 'Imperia',
            },
            {
                code: 'IS',
                name: 'Isernia',
            },
            {
                code: 'AQ',
                name: "L'Aquila",
            },
            {
                code: 'SP',
                name: 'La Spezia',
            },
            {
                code: 'LT',
                name: 'Latina',
            },
            {
                code: '62',
                name: 'Lazio',
            },
            {
                code: 'LE',
                name: 'Lecce',
            },
            {
                code: 'LC',
                name: 'Lecco',
            },
            {
                code: '42',
                name: 'Liguria',
            },
            {
                code: 'LI',
                name: 'Livorno',
            },
            {
                code: 'LO',
                name: 'Lodi',
            },
            {
                code: '25',
                name: 'Lombardia',
            },
            {
                code: 'LU',
                name: 'Lucca',
            },
            {
                code: 'MC',
                name: 'Macerata',
            },
            {
                code: 'MN',
                name: 'Mantova',
            },
            {
                code: '57',
                name: 'Marche',
            },
            {
                code: 'MS',
                name: 'Massa-Carrara',
            },
            {
                code: 'MT',
                name: 'Matera',
            },
            {
                code: 'VS',
                name: 'Medio Campidano',
            },
            {
                code: 'ME',
                name: 'Messina',
            },
            {
                code: 'MI',
                name: 'Milano',
            },
            {
                code: 'MO',
                name: 'Modena',
            },
            {
                code: '67',
                name: 'Molise',
            },
            {
                code: 'MB',
                name: 'Monza e Brianza',
            },
            {
                code: 'NA',
                name: 'Napoli',
            },
            {
                code: 'NO',
                name: 'Novara',
            },
            {
                code: 'NU',
                name: 'Nuoro',
            },
            {
                code: 'OG',
                name: 'Ogliastra',
            },
            {
                code: 'OT',
                name: 'Olbia-Tempio',
            },
            {
                code: 'OR',
                name: 'Oristano',
            },
            {
                code: 'PD',
                name: 'Padova',
            },
            {
                code: 'PA',
                name: 'Palermo',
            },
            {
                code: 'PR',
                name: 'Parma',
            },
            {
                code: 'PV',
                name: 'Pavia',
            },
            {
                code: 'PG',
                name: 'Perugia',
            },
            {
                code: 'PU',
                name: 'Pesaro e Urbino',
            },
            {
                code: 'PE',
                name: 'Pescara',
            },
            {
                code: 'PC',
                name: 'Piacenza',
            },
            {
                code: '21',
                name: 'Piemonte',
            },
            {
                code: 'PI',
                name: 'Pisa',
            },
            {
                code: 'PT',
                name: 'Pistoia',
            },
            {
                code: 'PN',
                name: 'Pordenone',
            },
            {
                code: 'PZ',
                name: 'Potenza',
            },
            {
                code: 'PO',
                name: 'Prato',
            },
            {
                code: '75',
                name: 'Puglia',
            },
            {
                code: 'RG',
                name: 'Ragusa',
            },
            {
                code: 'RA',
                name: 'Ravenna',
            },
            {
                code: 'RC',
                name: 'Reggio Calabria',
            },
            {
                code: 'RE',
                name: 'Reggio Emilia',
            },
            {
                code: 'RI',
                name: 'Rieti',
            },
            {
                code: 'RN',
                name: 'Rimini',
            },
            {
                code: 'RM',
                name: 'Roma',
            },
            {
                code: 'RO',
                name: 'Rovigo',
            },
            {
                code: 'SA',
                name: 'Salerno',
            },
            {
                code: '88',
                name: 'Sardegna',
            },
            {
                code: 'SS',
                name: 'Sassari',
            },
            {
                code: 'SV',
                name: 'Savona',
            },
            {
                code: '82',
                name: 'Sicilia',
            },
            {
                code: 'SI',
                name: 'Siena',
            },
            {
                code: 'SR',
                name: 'Siracusa',
            },
            {
                code: 'SO',
                name: 'Sondrio',
            },
            {
                code: 'TA',
                name: 'Taranto',
            },
            {
                code: 'TE',
                name: 'Teramo',
            },
            {
                code: 'TR',
                name: 'Terni',
            },
            {
                code: 'TO',
                name: 'Torino',
            },
            {
                code: '52',
                name: 'Toscana',
            },
            {
                code: 'TP',
                name: 'Trapani',
            },
            {
                code: '32',
                name: 'Trentino-Alto Adige',
            },
            {
                code: 'TN',
                name: 'Trento',
            },
            {
                code: 'TV',
                name: 'Treviso',
            },
            {
                code: 'TS',
                name: 'Trieste',
            },
            {
                code: 'UD',
                name: 'Udine',
            },
            {
                code: '55',
                name: 'Umbria',
            },
            {
                code: '23',
                name: "Valle d'Aosta",
            },
            {
                code: 'VA',
                name: 'Varese',
            },
            {
                code: '34',
                name: 'Veneto',
            },
            {
                code: 'VE',
                name: 'Venezia',
            },
            {
                code: 'VB',
                name: 'Verbano-Cusio-Ossola',
            },
            {
                code: 'VC',
                name: 'Vercelli',
            },
            {
                code: 'VR',
                name: 'Verona',
            },
            {
                code: 'VV',
                name: 'Vibo Valentia',
            },
            {
                code: 'VI',
                name: 'Vicenza',
            },
            {
                code: 'VT',
                name: 'Viterbo',
            },
        ],
    },
    {
        code: 'JM',
        id: 2269,
        name: 'Jamaica',
        states: [
            {
                code: 'JM01',
                name: 'Clarendon',
            },
            {
                code: 'JM02',
                name: 'Hanover',
            },
            {
                code: 'JM17',
                name: 'Kingston',
            },
            {
                code: 'JM04',
                name: 'Manchester',
            },
            {
                code: 'JM07',
                name: 'Portland',
            },
            {
                code: 'JM08',
                name: 'Saint Andrew',
            },
            {
                code: 'JM09',
                name: 'Saint Ann',
            },
            {
                code: 'JM10',
                name: 'Saint Catherine',
            },
            {
                code: 'JM11',
                name: 'Saint Elizabeth',
            },
            {
                code: 'JM12',
                name: 'Saint James',
            },
            {
                code: 'JM13',
                name: 'Saint Mary',
            },
            {
                code: 'JM14',
                name: 'Saint Thomas',
            },
            {
                code: 'JM15',
                name: 'Trelawny',
            },
            {
                code: 'JM16',
                name: 'Westmoreland',
            },
        ],
    },
    {
        code: 'JP',
        id: 2270,
        name: 'Japan',
        states: [
            {
                code: 'JP23',
                name: 'Aichi',
            },
            {
                code: 'JP05',
                name: 'Akita',
            },
            {
                code: 'JP02',
                name: 'Aomori',
            },
            {
                code: 'JP12',
                name: 'Chiba',
            },
            {
                code: 'JP38',
                name: 'Ehime',
            },
            {
                code: 'JP18',
                name: 'Fukui',
            },
            {
                code: 'JP40',
                name: 'Fukuoka',
            },
            {
                code: 'JP07',
                name: 'Fukushima',
            },
            {
                code: 'JP21',
                name: 'Gifu',
            },
            {
                code: 'JP10',
                name: 'Gunma',
            },
            {
                code: 'JP34',
                name: 'Hiroshima',
            },
            {
                code: 'JP01',
                name: 'Hokkaido',
            },
            {
                code: 'JP28',
                name: 'Hyogo',
            },
            {
                code: 'JP08',
                name: 'Ibaraki',
            },
            {
                code: 'JP17',
                name: 'Ishikawa',
            },
            {
                code: 'JP03',
                name: 'Iwate',
            },
            {
                code: 'JP37',
                name: 'Kagawa',
            },
            {
                code: 'JP46',
                name: 'Kagoshima',
            },
            {
                code: 'JP14',
                name: 'Kanagawa',
            },
            {
                code: 'JP39',
                name: 'Kochi',
            },
            {
                code: 'JP43',
                name: 'Kumamoto',
            },
            {
                code: 'JP26',
                name: 'Kyoto',
            },
            {
                code: 'JP24',
                name: 'Mie',
            },
            {
                code: 'JP04',
                name: 'Miyagi',
            },
            {
                code: 'JP45',
                name: 'Miyazaki',
            },
            {
                code: 'JP20',
                name: 'Nagano',
            },
            {
                code: 'JP42',
                name: 'Nagasaki',
            },
            {
                code: 'JP29',
                name: 'Nara',
            },
            {
                code: 'JP15',
                name: 'Niigata',
            },
            {
                code: 'JP44',
                name: 'Oita',
            },
            {
                code: 'JP33',
                name: 'Okayama',
            },
            {
                code: 'JP47',
                name: 'Okinawa',
            },
            {
                code: 'JP27',
                name: 'Osaka',
            },
            {
                code: 'JP41',
                name: 'Saga',
            },
            {
                code: 'JP11',
                name: 'Saitama',
            },
            {
                code: 'JP25',
                name: 'Shiga',
            },
            {
                code: 'JP32',
                name: 'Shimane',
            },
            {
                code: 'JP22',
                name: 'Shizuoka',
            },
            {
                code: 'JP09',
                name: 'Tochigi',
            },
            {
                code: 'JP36',
                name: 'Tokushima',
            },
            {
                code: 'JP13',
                name: 'Tokyo',
            },
            {
                code: 'JP31',
                name: 'Tottori',
            },
            {
                code: 'JP16',
                name: 'Toyama',
            },
            {
                code: 'JP30',
                name: 'Wakayama',
            },
            {
                code: 'JP06',
                name: 'Yamagata',
            },
            {
                code: 'JP35',
                name: 'Yamaguchi',
            },
            {
                code: 'JP19',
                name: 'Yamanashi',
            },
        ],
    },
    {
        code: 'JE',
        id: 2422,
        name: 'Jersey',
        states: [],
    },
    {
        code: 'JO',
        id: 2271,
        name: 'Jordan',
        states: [
            {
                code: 'JO01',
                name: 'Ajlun',
            },
            {
                code: 'JO02',
                name: 'Amman',
            },
            {
                code: 'JO03',
                name: 'Aqaba',
            },
            {
                code: 'JO04',
                name: 'Balqa',
            },
            {
                code: 'JO05',
                name: 'Irbid',
            },
            {
                code: 'JO06',
                name: 'JarasJ',
            },
            {
                code: 'JO07',
                name: 'Karak',
            },
            {
                code: 'JO08',
                name: "Ma'an",
            },
            {
                code: 'JO09',
                name: 'Madaba',
            },
            {
                code: 'JO10',
                name: 'Mafraq',
            },
            {
                code: 'JO11',
                name: 'Tafilah',
            },
            {
                code: 'JO12',
                name: 'Zarqa',
            },
        ],
    },
    {
        code: 'KZ',
        id: 2272,
        name: 'Kazakhstan',
        states: [
            {
                code: 'KZ01',
                name: 'Almaty',
            },
            {
                code: 'KZ02',
                name: 'Almaty (City)',
            },
            {
                code: 'KZ03',
                name: 'Aqmola',
            },
            {
                code: 'KZ04',
                name: 'Aqtöbe',
            },
            {
                code: 'KZ05',
                name: 'Astana',
            },
            {
                code: 'KZ06',
                name: 'Atyrau',
            },
            {
                code: 'KZ08',
                name: 'Bayqonyr',
            },
            {
                code: 'KZ15',
                name: 'East Kazakhstan',
            },
            {
                code: 'KZ09',
                name: 'Mangghystau',
            },
            {
                code: 'KZ16',
                name: 'North Kazakhstan',
            },
            {
                code: 'KZ11',
                name: 'Pavlodar',
            },
            {
                code: 'KZ12',
                name: 'Qaraghandy',
            },
            {
                code: 'KZ13',
                name: 'Qostanay',
            },
            {
                code: 'KZ14',
                name: 'Qyzylorda',
            },
            {
                code: 'KZ10',
                name: 'South Kazakhstan',
            },
            {
                code: 'KZ07',
                name: 'West Kazakhstan',
            },
            {
                code: 'KZ17',
                name: 'Zhambyl',
            },
        ],
    },
    {
        code: 'KE',
        id: 2273,
        name: 'Kenya',
        states: [
            {
                code: 'KE10',
                name: 'Baringo',
            },
            {
                code: 'KE11',
                name: 'Bomet',
            },
            {
                code: 'KE12',
                name: 'Bungoma',
            },
            {
                code: 'KE13',
                name: 'Busia',
            },
            {
                code: 'KE14',
                name: 'Elgeyo Marakwet',
            },
            {
                code: 'KE15',
                name: 'Embu',
            },
            {
                code: 'KE16',
                name: 'Garissa',
            },
            {
                code: 'KE17',
                name: 'Homa Bay',
            },
            {
                code: 'KE18',
                name: 'Isiolo',
            },
            {
                code: 'KE19',
                name: 'Kajiado',
            },
            {
                code: 'KE20',
                name: 'Kakamega',
            },
            {
                code: 'KE21',
                name: 'Kericho',
            },
            {
                code: 'KE22',
                name: 'Kiambu',
            },
            {
                code: 'KE23',
                name: 'Kilifi',
            },
            {
                code: 'KE24',
                name: 'Kirinyaga',
            },
            {
                code: 'KE25',
                name: 'Kisii',
            },
            {
                code: 'KE26',
                name: 'Kisumu',
            },
            {
                code: 'KE27',
                name: 'Kitui',
            },
            {
                code: 'KE28',
                name: 'Kwale',
            },
            {
                code: 'KE29',
                name: 'Laikipia',
            },
            {
                code: 'KE30',
                name: 'Lamu',
            },
            {
                code: 'KE31',
                name: 'Machakos',
            },
            {
                code: 'KE32',
                name: 'Makueni',
            },
            {
                code: 'KE33',
                name: 'Mandera',
            },
            {
                code: 'KE34',
                name: 'Marsabit',
            },
            {
                code: 'KE35',
                name: 'Meru',
            },
            {
                code: 'KE36',
                name: 'Migori',
            },
            {
                code: 'KE37',
                name: 'Mombasa',
            },
            {
                code: 'KE38',
                name: 'Murang',
            },
            {
                code: 'KE05',
                name: 'Nairobi',
            },
            {
                code: 'KE39',
                name: 'Nakuru',
            },
            {
                code: 'KE40',
                name: 'Nandi',
            },
            {
                code: 'KE41',
                name: 'Narok',
            },
            {
                code: 'KE42',
                name: 'Nyamira',
            },
            {
                code: 'KE43',
                name: 'Nyandarua',
            },
            {
                code: 'KE44',
                name: 'Nyeri',
            },
            {
                code: 'KE45',
                name: 'Samburu',
            },
            {
                code: 'KE46',
                name: 'Siaya',
            },
            {
                code: 'KE47',
                name: 'Taita Taveta',
            },
            {
                code: 'KE48',
                name: 'Tana River',
            },
            {
                code: 'KE49',
                name: 'Tharaka Nithi',
            },
            {
                code: 'KE50',
                name: 'Trans Nzoia',
            },
            {
                code: 'KE51',
                name: 'Turkana',
            },
            {
                code: 'KE52',
                name: 'Uasin Gishu',
            },
            {
                code: 'KE53',
                name: 'Vihiga',
            },
            {
                code: 'KE54',
                name: 'Wajir',
            },
            {
                code: 'KE55',
                name: 'West Pokot',
            },
        ],
    },
    {
        code: 'KI',
        id: 2391,
        name: 'Kiribati',
        states: [],
    },
    {
        code: 'KP',
        id: 2274,
        name: "Korea; Democratic People's Republic Of (North)",
        states: [
            {
                code: 'KN01',
                name: 'Chagang-do',
            },
            {
                code: 'KN17',
                name: 'Hamgyong-bukto',
            },
            {
                code: 'KN03',
                name: 'Hamgyong-namdo',
            },
            {
                code: 'KN07',
                name: 'Hwanghae-bukto',
            },
            {
                code: 'KN06',
                name: 'Hwanghae-namdo',
            },
            {
                code: 'KN09',
                name: 'Kangwon-do',
            },
            {
                code: 'KN18',
                name: 'Najin Sonbong-si',
            },
            {
                code: 'KN11',
                name: "P'yongan-bukto",
            },
            {
                code: 'KN15',
                name: "P'yongan-namdo",
            },
            {
                code: 'KN12',
                name: "P'yongyang-si",
            },
            {
                code: 'KN13',
                name: 'Yanggang-do',
            },
        ],
    },
    {
        code: 'KR',
        id: 2275,
        name: 'Korea; Republic Of (South)',
        states: [
            {
                code: 'KS10',
                name: 'Busan',
            },
            {
                code: 'KS05',
                name: 'Chungcheongbuk-do',
            },
            {
                code: 'KS17',
                name: 'Chungcheongnam-do',
            },
            {
                code: 'KS15',
                name: 'Daegu',
            },
            {
                code: 'KS19',
                name: 'Daejeon',
            },
            {
                code: 'KS06',
                name: 'Gangwon-do',
            },
            {
                code: 'KS18',
                name: 'Gwangju',
            },
            {
                code: 'KS13',
                name: 'Gyeonggi-do',
            },
            {
                code: 'KS14',
                name: 'Gyeongsangbuk-do',
            },
            {
                code: 'KS20',
                name: 'Gyeongsangnam-do',
            },
            {
                code: 'KS12',
                name: 'Incheon',
            },
            {
                code: 'KS01',
                name: 'Jeju-do',
            },
            {
                code: 'KS03',
                name: 'Jeollabuk-do',
            },
            {
                code: 'KS16',
                name: 'Jeollanam-do',
            },
            {
                code: 'KS22',
                name: 'Sejong',
            },
            {
                code: 'KS11',
                name: 'Seoul',
            },
            {
                code: 'KS21',
                name: 'Ulsan',
            },
        ],
    },
    {
        code: 'KV',
        id: 2392,
        name: 'Kosovo',
        states: [],
    },
    {
        code: 'KW',
        id: 2276,
        name: 'Kuwait',
        states: [
            {
                code: 'KU04',
                name: 'Al Ahmadi',
            },
            {
                code: 'KU07',
                name: 'Al Farwaniyah',
            },
            {
                code: 'KU05',
                name: 'Al Jahrah',
            },
            {
                code: 'KU02',
                name: 'Al Kuwayt',
            },
            {
                code: 'KU08',
                name: 'Hawalli',
            },
            {
                code: 'KU09',
                name: 'Mubarak Al-Kabir',
            },
        ],
    },
    {
        code: 'KG',
        id: 2277,
        name: 'Kyrgyzstan',
        states: [
            {
                code: 'KG09',
                name: 'Batken',
            },
            {
                code: 'KG01',
                name: 'Bishkek',
            },
            {
                code: 'KG02',
                name: 'Chüy',
            },
            {
                code: 'KG03',
                name: 'Jalal-Abad',
            },
            {
                code: 'KG04',
                name: 'Naryn',
            },
            {
                code: 'KG10',
                name: 'Osh [City]',
            },
            {
                code: 'KG08',
                name: 'Osh',
            },
            {
                code: 'KG06',
                name: 'Talas',
            },
            {
                code: 'KG07',
                name: 'Ysyk-Köl',
            },
        ],
    },
    {
        code: 'LA',
        id: 2278,
        name: "Lao People's Democratic Republic",
        states: [
            {
                code: 'LA01',
                name: 'Attapu',
            },
            {
                code: 'LA22',
                name: 'Bokeo',
            },
            {
                code: 'LA23',
                name: 'Bolikhamxai',
            },
            {
                code: 'LA02',
                name: 'Champasak',
            },
            {
                code: 'LA03',
                name: 'Houaphan',
            },
            {
                code: 'LA15',
                name: 'Khammouan',
            },
            {
                code: 'LA16',
                name: 'Louang Namtha',
            },
            {
                code: 'LA17',
                name: 'Louangphrabang',
            },
            {
                code: 'LA07',
                name: 'Oudômxai',
            },
            {
                code: 'LA18',
                name: 'Phôngsali',
            },
            {
                code: 'LA19',
                name: 'Saravan',
            },
            {
                code: 'LA20',
                name: 'Savannakhét',
            },
            {
                code: 'LA27',
                name: 'Vientiane',
            },
            {
                code: 'LA24',
                name: 'Vientiane [prefecture]',
            },
            {
                code: 'LA13',
                name: 'Xaignabouri',
            },
            {
                code: 'LA28',
                name: 'Xaisômboun',
            },
            {
                code: 'LA26',
                name: 'Xékong',
            },
            {
                code: 'LA14',
                name: 'Xiangkhoang',
            },
        ],
    },
    {
        code: 'LV',
        id: 2279,
        name: 'Latvia',
        states: [
            {
                code: 'LG34',
                name: 'Adaži',
            },
            {
                code: 'LG35',
                name: 'Aglona',
            },
            {
                code: 'LG36',
                name: 'Aizkraukle',
            },
            {
                code: 'LG37',
                name: 'Aizpute',
            },
            {
                code: 'LG38',
                name: 'Akniste',
            },
            {
                code: 'LG39',
                name: 'Aloja',
            },
            {
                code: 'LG40',
                name: 'Alsunga',
            },
            {
                code: 'LG41',
                name: 'Aluksne',
            },
            {
                code: 'LG42',
                name: 'Amata',
            },
            {
                code: 'LG43',
                name: 'Ape',
            },
            {
                code: 'LG44',
                name: 'Auce',
            },
            {
                code: 'LG45',
                name: 'Babite',
            },
            {
                code: 'LG46',
                name: 'Baldone',
            },
            {
                code: 'LG47',
                name: 'Baltinava',
            },
            {
                code: 'LG48',
                name: 'Balvi',
            },
            {
                code: 'LG49',
                name: 'Bauska',
            },
            {
                code: 'LG50',
                name: 'Beverina',
            },
            {
                code: 'LG51',
                name: 'Broceni',
            },
            {
                code: 'LG52',
                name: 'Burtnieki',
            },
            {
                code: 'LG53',
                name: 'Carnikava',
            },
            {
                code: 'LG54',
                name: 'Cesis',
            },
            {
                code: 'LG55',
                name: 'Cesvaine',
            },
            {
                code: 'LG56',
                name: 'Cibla',
            },
            {
                code: 'LG57',
                name: 'Dagda',
            },
            {
                code: 'LG06',
                name: 'Daugavpils',
            },
            {
                code: 'LG58',
                name: 'Daugavpils',
            },
            {
                code: 'LG59',
                name: 'Dobele',
            },
            {
                code: 'LG60',
                name: 'Dundaga',
            },
            {
                code: 'LG61',
                name: 'Durbe',
            },
            {
                code: 'LG62',
                name: 'Engure',
            },
            {
                code: 'LG63',
                name: 'Ergli',
            },
            {
                code: 'LG64',
                name: 'Garkalne',
            },
            {
                code: 'LG65',
                name: 'Grobina',
            },
            {
                code: 'LG66',
                name: 'Gulbene',
            },
            {
                code: 'LG67',
                name: 'Iecava',
            },
            {
                code: 'LG68',
                name: 'Ikškile',
            },
            {
                code: 'LG69',
                name: 'Ilukste',
            },
            {
                code: 'LG70',
                name: 'Incukalns',
            },
            {
                code: 'LG71',
                name: 'Jaunjelgava',
            },
            {
                code: 'LG72',
                name: 'Jaunpiebalga',
            },
            {
                code: 'LG73',
                name: 'Jaunpils',
            },
            {
                code: 'LG75',
                name: 'Jekabpils',
            },
            {
                code: 'LG74',
                name: 'Jekabpils',
            },
            {
                code: 'LG76',
                name: 'Jelgava',
            },
            {
                code: 'LG11',
                name: 'Jelgava',
            },
            {
                code: 'LG13',
                name: 'Jurmala',
            },
            {
                code: 'LG77',
                name: 'Kandava',
            },
            {
                code: 'LG78',
                name: 'Karsava',
            },
            {
                code: 'LG79',
                name: 'Kegums',
            },
            {
                code: 'LG80',
                name: 'Kekava',
            },
            {
                code: 'LG81',
                name: 'Kocenu',
            },
            {
                code: 'LG82',
                name: 'Koknese',
            },
            {
                code: 'LG83',
                name: 'Kraslava',
            },
            {
                code: 'LG84',
                name: 'Krimulda',
            },
            {
                code: 'LG85',
                name: 'Krustpils',
            },
            {
                code: 'LG86',
                name: 'Kuldiga',
            },
            {
                code: 'LG87',
                name: 'Lielvarde',
            },
            {
                code: 'LG16',
                name: 'Liepaja',
            },
            {
                code: 'LG88',
                name: 'Ligatne',
            },
            {
                code: 'LG89',
                name: 'Limbaži',
            },
            {
                code: 'LG90',
                name: 'Livani',
            },
            {
                code: 'LG91',
                name: 'Lubana',
            },
            {
                code: 'LG92',
                name: 'Ludza',
            },
            {
                code: 'LG93',
                name: 'Madona',
            },
            {
                code: 'LG94',
                name: 'Malpils',
            },
            {
                code: 'LG95',
                name: 'Marupe',
            },
            {
                code: 'LG96',
                name: 'Mazsalaca',
            },
            {
                code: 'LGF1',
                name: 'Mersraga',
            },
            {
                code: 'LG97',
                name: 'Naukšeni',
            },
            {
                code: 'LG98',
                name: 'Nereta',
            },
            {
                code: 'LG99',
                name: 'Nica',
            },
            {
                code: 'LGA1',
                name: 'Ogre',
            },
            {
                code: 'LGA2',
                name: 'Olaine',
            },
            {
                code: 'LGA3',
                name: 'Ozolnieki',
            },
            {
                code: 'LGA4',
                name: 'Pargauja',
            },
            {
                code: 'LGA5',
                name: 'Pavilosta',
            },
            {
                code: 'LGA6',
                name: 'Plavinas',
            },
            {
                code: 'LGA7',
                name: 'Preili',
            },
            {
                code: 'LGA8',
                name: 'Priekule',
            },
            {
                code: 'LGA9',
                name: 'Priekuli',
            },
            {
                code: 'LGB1',
                name: 'Rauna',
            },
            {
                code: 'LGB2',
                name: 'Rezekne',
            },
            {
                code: 'LG23',
                name: 'Rezekne',
            },
            {
                code: 'LGB3',
                name: 'Riebini',
            },
            {
                code: 'LG25',
                name: 'Riga',
            },
            {
                code: 'LGB4',
                name: 'Roja',
            },
            {
                code: 'LGB5',
                name: 'Ropaži',
            },
            {
                code: 'LGB6',
                name: 'Rucava',
            },
            {
                code: 'LGB7',
                name: 'Rugaji',
            },
            {
                code: 'LGB8',
                name: 'Rujiena',
            },
            {
                code: 'LGB9',
                name: 'Rundale',
            },
            {
                code: 'LGC1',
                name: 'Salacgriva',
            },
            {
                code: 'LGC2',
                name: 'Sala',
            },
            {
                code: 'LGC3',
                name: 'Salaspils',
            },
            {
                code: 'LGC4',
                name: 'Saldus',
            },
            {
                code: 'LGC5',
                name: 'Saulkrasti',
            },
            {
                code: 'LGC6',
                name: 'Seja',
            },
            {
                code: 'LGC7',
                name: 'Sigulda',
            },
            {
                code: 'LGC8',
                name: 'Skriveri',
            },
            {
                code: 'LGC9',
                name: 'Skrunda',
            },
            {
                code: 'LGD1',
                name: 'Smiltene',
            },
            {
                code: 'LGD2',
                name: 'Stopini',
            },
            {
                code: 'LGD3',
                name: 'Strenci',
            },
            {
                code: 'LGD4',
                name: 'Talsi',
            },
            {
                code: 'LGD5',
                name: 'Tervete',
            },
            {
                code: 'LGD6',
                name: 'Tukums',
            },
            {
                code: 'LGD7',
                name: 'Vainode',
            },
            {
                code: 'LGD8',
                name: 'Valka',
            },
            {
                code: 'LGD9',
                name: 'Valmiera',
            },
            {
                code: 'LGE1',
                name: 'Varaklani',
            },
            {
                code: 'LGE2',
                name: 'Varkava',
            },
            {
                code: 'LGE3',
                name: 'Vecpiebalga',
            },
            {
                code: 'LGE4',
                name: 'Vecumnieki',
            },
            {
                code: 'LGE5',
                name: 'Ventspils',
            },
            {
                code: 'LG32',
                name: 'Ventspils',
            },
            {
                code: 'LGE6',
                name: 'Viesite',
            },
            {
                code: 'LGE7',
                name: 'Vilaka',
            },
            {
                code: 'LGE8',
                name: 'Vilani',
            },
            {
                code: 'LGE9',
                name: 'Zilupe',
            },
        ],
    },
    {
        code: 'LB',
        id: 2280,
        name: 'Lebanon',
        states: [
            {
                code: 'LE10',
                name: 'Aakkar',
            },
            {
                code: 'LE07',
                name: 'An Nabatiyah',
            },
            {
                code: 'LE11',
                name: 'Baalbek-Hermel',
            },
            {
                code: 'LE04',
                name: 'Beirut',
            },
            {
                code: 'LE08',
                name: 'Beqaa',
            },
            {
                code: 'LE05',
                name: 'Mount Lebanon',
            },
            {
                code: 'LE09',
                name: 'North Lebanon',
            },
            {
                code: 'LE06',
                name: 'South Lebanon',
            },
        ],
    },
    {
        code: 'LS',
        id: 2281,
        name: 'Lesotho',
        states: [
            {
                code: 'LT10',
                name: 'Berea',
            },
            {
                code: 'LT11',
                name: 'Butha-Buthe',
            },
            {
                code: 'LT12',
                name: 'Leribe',
            },
            {
                code: 'LT14',
                name: 'Mafeteng',
            },
            {
                code: 'LT13',
                name: 'Mafeteng',
            },
            {
                code: 'LT15',
                name: "Mohale's Hoek",
            },
            {
                code: 'LT16',
                name: 'Mokhotlong',
            },
            {
                code: 'LT17',
                name: "Qacha's Nek",
            },
            {
                code: 'LT18',
                name: 'Quthing',
            },
            {
                code: 'LT19',
                name: 'Thaba-Tseka',
            },
        ],
    },
    {
        code: 'LR',
        id: 2282,
        name: 'Liberia',
        states: [
            {
                code: 'LI15',
                name: 'Bomi',
            },
            {
                code: 'LI01',
                name: 'Bong',
            },
            {
                code: 'LI21\t',
                name: 'Gbarpolu',
            },
            {
                code: 'LI11',
                name: 'Grand Bassa',
            },
            {
                code: 'LI12',
                name: 'Grand Cape Mount',
            },
            {
                code: 'LI19',
                name: 'Grand Gedeh',
            },
            {
                code: 'LI16',
                name: 'Grand Kru',
            },
            {
                code: 'LI20',
                name: 'Lofa',
            },
            {
                code: 'LI17',
                name: 'Margibi',
            },
            {
                code: 'LI13',
                name: 'Maryland',
            },
            {
                code: 'LI14',
                name: 'Montserrado',
            },
            {
                code: 'LI09',
                name: 'Nimba',
            },
            {
                code: 'LI22',
                name: 'River Gee',
            },
            {
                code: 'LI18',
                name: 'Rivercess',
            },
            {
                code: 'LI10',
                name: 'Sinoe',
            },
        ],
    },
    {
        code: 'LY',
        id: 2380,
        name: 'Libyan Arab Jamahiriya',
        states: [],
    },
    {
        code: 'LI',
        id: 2284,
        name: 'Liechtenstein',
        states: [],
    },
    {
        code: 'LT',
        id: 2285,
        name: 'Lithuania',
        states: [
            {
                code: 'LH56',
                name: 'Alytus',
            },
            {
                code: 'LH57',
                name: 'Kaunas',
            },
            {
                code: 'LH58',
                name: 'Klaipeda',
            },
            {
                code: 'LH59',
                name: 'Marijampole',
            },
            {
                code: 'LH60',
                name: 'Panevežys',
            },
            {
                code: 'LH61',
                name: 'Siauliai',
            },
            {
                code: 'LH62',
                name: 'Taurage',
            },
            {
                code: 'LH63',
                name: 'Telšiai',
            },
            {
                code: 'LH64',
                name: 'Utena',
            },
            {
                code: 'LH65',
                name: 'Vilnius',
            },
        ],
    },
    {
        code: 'LU',
        id: 2286,
        name: 'Luxembourg',
        states: [
            {
                code: 'LU01',
                name: 'Diekirch',
            },
            {
                code: 'LU02',
                name: 'Grevenmacher',
            },
            {
                code: 'LU03',
                name: 'Luxembourg',
            },
        ],
    },
    {
        code: 'MO',
        id: 2287,
        name: 'Macau',
        states: [],
    },
    {
        code: 'MK',
        id: 2288,
        name: 'Macedonia',
        states: [],
    },
    {
        code: 'YU',
        id: 2367,
        name: 'Macedonia; the Former Yugoslav Republic',
        states: [],
    },
    {
        code: 'MG',
        id: 2289,
        name: 'Madagascar',
        states: [
            {
                code: 'MA05',
                name: 'Antananarivo',
            },
            {
                code: 'MA01',
                name: 'Antsiranana',
            },
            {
                code: 'MA02',
                name: 'Fianarantsoa',
            },
            {
                code: 'MA03',
                name: 'Mahajanga',
            },
            {
                code: 'MA04',
                name: 'Toamasina',
            },
            {
                code: 'MA06',
                name: 'Toliara',
            },
        ],
    },
    {
        code: 'MW',
        id: 2290,
        name: 'Malawi',
        states: [
            {
                code: 'MI26',
                name: 'Balaka',
            },
            {
                code: 'MI24',
                name: 'Blantyre',
            },
            {
                code: 'MI02',
                name: 'Chikwawa',
            },
            {
                code: 'MI03',
                name: 'Chiradzulu',
            },
            {
                code: 'MI04',
                name: 'Chitipa',
            },
            {
                code: 'MI06',
                name: 'Dedza',
            },
            {
                code: 'MI07',
                name: 'Dowa',
            },
            {
                code: 'MI08',
                name: 'Karonga',
            },
            {
                code: 'MI09',
                name: 'Kasungu',
            },
            {
                code: 'MI27',
                name: 'Likoma',
            },
            {
                code: 'MI11',
                name: 'Lilongwe',
            },
            {
                code: 'MI28',
                name: 'Machinga',
            },
            {
                code: 'MI12',
                name: 'Mangochi',
            },
            {
                code: 'MI13',
                name: 'Mchinji',
            },
            {
                code: 'MI29',
                name: 'Mulanje',
            },
            {
                code: 'MI25',
                name: 'Mwanza',
            },
            {
                code: 'MI15',
                name: 'Mzimba',
            },
            {
                code: 'MI31',
                name: 'Neno',
            },
            {
                code: 'MI17',
                name: 'Nkhata Bay',
            },
            {
                code: 'MI18',
                name: 'Nkhotakota',
            },
            {
                code: 'MI19',
                name: 'Nsanje',
            },
            {
                code: 'MI16',
                name: 'Ntcheu',
            },
            {
                code: 'MI20',
                name: 'Ntchisi',
            },
            {
                code: 'MI30',
                name: 'Phalombe',
            },
            {
                code: 'MI21',
                name: 'Rumphi',
            },
            {
                code: 'MI22',
                name: 'Salima',
            },
            {
                code: 'MI05',
                name: 'Thyolo',
            },
            {
                code: 'MI23',
                name: 'Zomba',
            },
        ],
    },
    {
        code: 'MY',
        id: 2291,
        name: 'Malaysia',
        states: [
            {
                code: 'MY01',
                name: 'Johor',
            },
            {
                code: 'MY02',
                name: 'Kedah',
            },
            {
                code: 'MY03',
                name: 'Kelantan',
            },
            {
                code: 'MY04',
                name: 'Melaka',
            },
            {
                code: 'MY05',
                name: 'Negeri Sembilan',
            },
            {
                code: 'MY06',
                name: 'Pahang',
            },
            {
                code: 'MY08',
                name: 'Perak',
            },
            {
                code: 'MY09',
                name: 'Perlis',
            },
            {
                code: 'MY07',
                name: 'Pulau Pinang',
            },
            {
                code: 'MY12',
                name: 'Sabah',
            },
            {
                code: 'MY13',
                name: 'Sarawak',
            },
            {
                code: 'MY10',
                name: 'Selangor',
            },
            {
                code: 'MY11',
                name: 'Terengganu',
            },
            {
                code: 'MY14',
                name: 'W.P. Kuala Lumpur',
            },
            {
                code: 'MY15',
                name: 'W.P. Labuan',
            },
            {
                code: 'MY16',
                name: 'W.P. Putrajaya',
            },
        ],
    },
    {
        code: 'MV',
        id: 2384,
        name: 'Maldives; Republic of',
        states: [],
    },
    {
        code: 'ML',
        id: 2292,
        name: 'Mali',
        states: [
            {
                code: 'ML01',
                name: 'Bamako',
            },
            {
                code: 'ML09',
                name: 'Gao',
            },
            {
                code: 'ML03',
                name: 'Kayes',
            },
            {
                code: 'ML10',
                name: 'Kidal',
            },
            {
                code: 'ML07',
                name: 'Koulikoro',
            },
            {
                code: 'ML.ME',
                name: 'Ménaka',
            },
            {
                code: 'ML04',
                name: 'Mopti',
            },
            {
                code: 'ML05',
                name: 'Ségou',
            },
            {
                code: 'ML06',
                name: 'Sikasso',
            },
            {
                code: 'ML.TD',
                name: 'Taoudénit',
            },
            {
                code: 'ML08',
                name: 'Timbuktu',
            },
        ],
    },
    {
        code: 'MT',
        id: 2293,
        name: 'Malta',
        states: [
            {
                code: 'MT.CE',
                name: 'Central',
            },
            {
                code: 'MT.GO',
                name: 'Gozo',
            },
            {
                code: 'MT.NO',
                name: 'Northern',
            },
            {
                code: 'MT.SE',
                name: 'South Eastern',
            },
            {
                code: 'MT.SO',
                name: 'Southern',
            },
        ],
    },
    {
        code: 'RM',
        id: 2394,
        name: 'Marshall Islands',
        states: [],
    },
    {
        code: 'MQ',
        id: 2423,
        name: 'Martinique',
        states: [],
    },
    {
        code: 'MR',
        id: 2294,
        name: 'Mauritania',
        states: [
            {
                code: 'MR07',
                name: 'Adrar',
            },
            {
                code: 'MR03',
                name: 'Assaba',
            },
            {
                code: 'MR05',
                name: 'Brakna',
            },
            {
                code: 'MR08',
                name: 'Dakhlet Nouadhibou',
            },
            {
                code: 'MR04',
                name: 'Gorgol',
            },
            {
                code: 'MR10',
                name: 'Guidimaka',
            },
            {
                code: 'MR01',
                name: 'Hodh ech Chargui',
            },
            {
                code: 'MR02',
                name: 'Hodh el Gharbi',
            },
            {
                code: 'MR12',
                name: 'Inchiri',
            },
            {
                code: 'MR.NN',
                name: 'Nouakchott Nord',
            },
            {
                code: 'MR13',
                name: 'Nouakchott Ouest',
            },
            {
                code: 'MR.NS',
                name: 'Nouakchott Sud',
            },
            {
                code: 'MR09',
                name: 'Tagant',
            },
            {
                code: 'MR11',
                name: 'Tiris Zemmour',
            },
            {
                code: 'MR06',
                name: 'Trarza',
            },
        ],
    },
    {
        code: 'MU',
        id: 2295,
        name: 'Mauritius',
        states: [
            {
                code: 'MP21',
                name: 'Agalega Islands',
            },
            {
                code: 'MP12',
                name: 'Black River',
            },
            {
                code: 'MP22',
                name: 'Cargados Carajos',
            },
            {
                code: 'MP13',
                name: 'Flacq',
            },
            {
                code: 'MP14',
                name: 'Grand Port',
            },
            {
                code: 'MP15',
                name: 'Moka',
            },
            {
                code: 'MP16',
                name: 'Pamplemousses',
            },
            {
                code: 'MP17',
                name: 'Plaines Wilhems',
            },
            {
                code: 'MP18',
                name: 'Port Louis',
            },
            {
                code: 'MP19',
                name: 'Rivière du Rempart',
            },
            {
                code: 'MP23',
                name: 'Rodrigues',
            },
            {
                code: 'MP20',
                name: 'Savanne',
            },
        ],
    },
    {
        code: 'M999',
        id: 2393,
        name: 'Mayotte',
        states: [],
    },
    {
        code: 'MX',
        id: 2296,
        name: 'Mexico',
        states: [
            {
                code: 'AGU',
                name: 'Aguascalientes',
            },
            {
                code: 'BCS',
                name: 'Baja California Sur',
            },
            {
                code: 'BCN',
                name: 'Baja California',
            },
            {
                code: 'CAM',
                name: 'Campeche',
            },
            {
                code: 'CHP',
                name: 'Chiapas',
            },
            {
                code: 'CHH',
                name: 'Chihuahua',
            },
            {
                code: 'COA',
                name: 'Coahuila',
            },
            {
                code: 'COL',
                name: 'Colima',
            },
            {
                code: 'DIF',
                name: 'Distrito Federal',
            },
            {
                code: 'DUR',
                name: 'Durango',
            },
            {
                code: 'GUA',
                name: 'Guanajuato',
            },
            {
                code: 'GRO',
                name: 'Guerrero',
            },
            {
                code: 'HID',
                name: 'Hidalgo',
            },
            {
                code: 'JAL',
                name: 'Jalisco',
            },
            {
                code: 'MEX',
                name: 'México',
            },
            {
                code: 'MIC',
                name: 'Michoacán',
            },
            {
                code: 'MOR',
                name: 'Morelos',
            },
            {
                code: 'NAY',
                name: 'Nayarit',
            },
            {
                code: 'NLE',
                name: 'Nuevo León',
            },
            {
                code: 'OAX',
                name: 'Oaxaca',
            },
            {
                code: 'PUE',
                name: 'Puebla',
            },
            {
                code: 'QUE',
                name: 'Querétaro',
            },
            {
                code: 'ROO',
                name: 'Quintana Roo',
            },
            {
                code: 'SLP',
                name: 'San Luis Potosí',
            },
            {
                code: 'SIN',
                name: 'Sinaloa',
            },
            {
                code: 'SON',
                name: 'Sonora',
            },
            {
                code: 'TAB',
                name: 'Tabasco',
            },
            {
                code: 'TAM',
                name: 'Tamaulipas',
            },
            {
                code: 'TLA',
                name: 'Tlaxcala',
            },
            {
                code: 'VER',
                name: 'Veracruz',
            },
            {
                code: 'YUC',
                name: 'Yucatán',
            },
            {
                code: 'ZAC',
                name: 'Zacatecas',
            },
        ],
    },
    {
        code: 'FM',
        id: 2297,
        name: 'Micronesia; Federated States of',
        states: [
            {
                code: 'FM03',
                name: 'Chuuk',
            },
            {
                code: 'FM01',
                name: 'Kosrae',
            },
            {
                code: 'FM02',
                name: 'Pohnpei',
            },
            {
                code: 'FM04',
                name: 'Yap',
            },
        ],
    },
    {
        code: 'MD',
        id: 2395,
        name: 'Moldova; Republic of',
        states: [],
    },
    {
        code: 'MC',
        id: 2299,
        name: 'Monaco',
        states: [],
    },
    {
        code: 'MN',
        id: 2300,
        name: 'Mongolia',
        states: [],
    },
    {
        code: 'MJ',
        id: 2396,
        name: 'Montenegro',
        states: [
            {
                code: 'ME-1',
                name: 'Andrijevica',
            },
            {
                code: 'ME-2',
                name: 'Bar',
            },
            {
                code: 'ME-3',
                name: 'Berane',
            },
            {
                code: 'ME-4',
                name: 'Bijelo Polje',
            },
            {
                code: 'ME-5',
                name: 'Budva',
            },
            {
                code: 'ME-6',
                name: 'Cetinje',
            },
            {
                code: 'ME-7',
                name: 'Danilovgrad',
            },
            {
                code: 'ME-8',
                name: 'Herceg Novi',
            },
            {
                code: 'ME-9',
                name: 'Kolašin',
            },
            {
                code: 'ME-10',
                name: 'Kotor',
            },
            {
                code: 'ME-11',
                name: 'Mojkovac',
            },
            {
                code: 'ME-12',
                name: 'Nikšic',
            },
            {
                code: 'ME-13',
                name: 'Plav',
            },
            {
                code: 'ME-14',
                name: 'Pljevlja',
            },
            {
                code: 'ME-15',
                name: 'Plužine',
            },
            {
                code: 'ME-16',
                name: 'Podgorica',
            },
            {
                code: 'ME-17',
                name: 'Rožaje',
            },
            {
                code: 'ME-18',
                name: 'Šavnik',
            },
            {
                code: 'ME-19',
                name: 'Tivat',
            },
            {
                code: 'ME-20',
                name: 'Ulcinj',
            },
            {
                code: 'ME-21',
                name: 'Žabljak',
            },
        ],
    },
    {
        code: 'MS',
        id: 2424,
        name: 'Montserrat',
        states: [],
    },
    {
        code: 'MA',
        id: 2301,
        name: 'Morocco',
        states: [
            {
                code: 'MA.BK',
                name: 'Béni Mellal-Khénifra',
            },
            {
                code: 'MA.CS',
                name: 'Casablanca-Settat',
            },
            {
                code: 'MA.OL',
                name: 'Dakhla-Oued Ed-Dahab',
            },
            {
                code: 'MA.DT',
                name: 'Drâa-Tafilalet',
            },
            {
                code: 'MA.FK',
                name: 'Fès-Meknès',
            },
            {
                code: 'MA.GN',
                name: 'Guelmim-Oued Noun',
            },
            {
                code: 'MA.OF',
                name: "L'oriental",
            },
            {
                code: 'MA.LS',
                name: 'Laâyoune-Sakia al Hamra',
            },
            {
                code: 'MA.MS',
                name: 'Marrakech-Safi',
            },
            {
                code: 'MA.RK',
                name: 'Rabat-Salé-Kénitra',
            },
            {
                code: 'MA.SS',
                name: 'Souss-Massa',
            },
            {
                code: 'MA.TC',
                name: 'Tanger-Tétouan-Al Hoceima',
            },
        ],
    },
    {
        code: 'MZ',
        id: 2302,
        name: 'Mozambique',
        states: [
            {
                code: 'MZ01',
                name: 'Cabo Delgado',
            },
            {
                code: 'MZ02',
                name: 'Gaza',
            },
            {
                code: 'MZ03',
                name: 'Inhambane',
            },
            {
                code: 'MZ10',
                name: 'Manica',
            },
            {
                code: 'MZ11',
                name: 'Maputo [city]',
            },
            {
                code: 'MZ04',
                name: 'Maputo',
            },
            {
                code: 'MZ06',
                name: 'Nampula',
            },
            {
                code: 'MZ07',
                name: 'Niassa',
            },
            {
                code: 'MZ05',
                name: 'Sofala',
            },
            {
                code: 'MZ08',
                name: 'Tete',
            },
            {
                code: 'MZ09',
                name: 'Zambézia',
            },
        ],
    },
    {
        code: 'MM',
        id: 2303,
        name: 'Myanmar',
        states: [
            {
                code: 'MM.AY',
                name: 'Ayeyarwady',
            },
            {
                code: 'MM.BA',
                name: 'Bago',
            },
            {
                code: 'MM.CH',
                name: 'Chin',
            },
            {
                code: 'MM.KC',
                name: 'Kachin',
            },
            {
                code: 'MM.KH',
                name: 'Kayah',
            },
            {
                code: 'MM.KN',
                name: 'Kayin',
            },
            {
                code: 'MM.MG',
                name: 'Magway',
            },
            {
                code: 'MM.ML',
                name: 'Mandalay',
            },
            {
                code: 'MM.MO',
                name: 'Mon',
            },
            {
                code: 'MM.NY',
                name: 'Naypyidaw',
            },
            {
                code: 'MM.RA',
                name: 'Rakhine',
            },
            {
                code: 'MM.SA',
                name: 'Sagaing',
            },
            {
                code: 'MM.SH',
                name: 'Shan',
            },
            {
                code: 'MM.TN',
                name: 'Tanintharyi',
            },
            {
                code: 'MM.YA',
                name: 'Yangon',
            },
        ],
    },
    {
        code: 'NA',
        id: 2304,
        name: 'Namibia',
        states: [
            {
                code: 'WA29',
                name: 'Erongo',
            },
            {
                code: 'WA30',
                name: 'Hardap',
            },
            {
                code: 'WA31',
                name: 'Karas',
            },
            {
                code: 'WA40',
                name: 'Kavango East',
            },
            {
                code: 'WA41',
                name: 'Kavango West',
            },
            {
                code: 'WA21',
                name: 'Khomas',
            },
            {
                code: 'WA32',
                name: 'Kunene',
            },
            {
                code: 'WA33',
                name: 'Ohangwena',
            },
            {
                code: 'WA35',
                name: 'Omaheke',
            },
            {
                code: 'WA36',
                name: 'Omusati',
            },
            {
                code: 'WA37',
                name: 'Oshana',
            },
            {
                code: 'WA38',
                name: 'Oshikoto',
            },
            {
                code: 'WA39',
                name: 'Otjozondjupa',
            },
            {
                code: 'WA28',
                name: 'Zambezi',
            },
        ],
    },
    {
        code: 'NR',
        id: 2397,
        name: 'Nauru',
        states: [],
    },
    {
        code: 'NP',
        id: 2305,
        name: 'Nepal',
        states: [
            {
                code: 'NP.FI',
                name: 'Five',
            },
            {
                code: 'NP.FO',
                name: 'Four',
            },
            {
                code: 'NP.ON',
                name: 'One',
            },
            {
                code: 'NP.SE',
                name: 'Seven',
            },
            {
                code: 'NP.SI',
                name: 'Six',
            },
            {
                code: 'NP.TH',
                name: 'Three',
            },
            {
                code: 'NP.TW',
                name: 'Two',
            },
        ],
    },
    {
        code: 'NL',
        id: 2306,
        name: 'Netherlands',
        states: [
            {
                code: 'DR',
                name: 'Drenthe',
            },
            {
                code: 'FL',
                name: 'Flevoland',
            },
            {
                code: 'FR',
                name: 'Friesland',
            },
            {
                code: 'GE',
                name: 'Gelderland',
            },
            {
                code: 'GR',
                name: 'Groningen',
            },
            {
                code: 'LI',
                name: 'Limburg',
            },
            {
                code: 'NB',
                name: 'Noord-Brabant',
            },
            {
                code: 'NH',
                name: 'Noord-Holland',
            },
            {
                code: 'OV',
                name: 'Overijssel',
            },
            {
                code: 'UT',
                name: 'Utrecht',
            },
            {
                code: 'ZE',
                name: 'Zeeland',
            },
            {
                code: 'ZH',
                name: 'Zuid-Holland',
            },
        ],
    },
    {
        code: 'AN',
        id: 2425,
        name: 'Netherlands Antilles',
        states: [],
    },
    {
        code: 'NC',
        id: 2426,
        name: 'New Caledonia',
        states: [],
    },
    {
        code: 'NZ',
        id: 2307,
        name: 'New Zealand',
        states: [
            {
                code: 'AUK',
                name: 'Auckland',
            },
            {
                code: 'BOP',
                name: 'Bay of Plenty',
            },
            {
                code: 'CAN',
                name: 'Canterbury',
            },
            {
                code: 'CIT',
                name: 'Chatham Islands Territory',
            },
            {
                code: 'GIS',
                name: 'Gisborne',
            },
            {
                code: 'HKB',
                name: "Hawke's Bay",
            },
            {
                code: 'MWT',
                name: 'Manawatu-Wanganui',
            },
            {
                code: 'MBH',
                name: 'Marlborough',
            },
            {
                code: 'NSN',
                name: 'Nelson',
            },
            {
                code: 'N',
                name: 'North Island',
            },
            {
                code: 'NTL',
                name: 'Northland',
            },
            {
                code: 'OTA',
                name: 'Otago',
            },
            {
                code: 'S',
                name: 'South Island',
            },
            {
                code: 'STL',
                name: 'Southland',
            },
            {
                code: 'TKI',
                name: 'Taranaki',
            },
            {
                code: 'TAS',
                name: 'Tasman District',
            },
            {
                code: 'WKO',
                name: 'Waikato',
            },
            {
                code: 'WGN',
                name: 'Wellington',
            },
            {
                code: 'WTC',
                name: 'West Coast',
            },
        ],
    },
    {
        code: 'NI',
        id: 2308,
        name: 'Nicaragua',
        states: [
            {
                code: 'NU01',
                name: 'Boaco',
            },
            {
                code: 'NU02',
                name: 'Carazo',
            },
            {
                code: 'NU03',
                name: 'Chinandega',
            },
            {
                code: 'NU04',
                name: 'Chontales',
            },
            {
                code: 'NU05',
                name: 'Estelí',
            },
            {
                code: 'NU06',
                name: 'Granada',
            },
            {
                code: 'NU07',
                name: 'Jinotega',
            },
            {
                code: 'NU08',
                name: 'León',
            },
            {
                code: 'NU09',
                name: 'Madriz',
            },
            {
                code: 'NU10',
                name: 'Managua',
            },
            {
                code: 'NU11',
                name: 'Masaya',
            },
            {
                code: 'NU12',
                name: 'Matagalpa',
            },
            {
                code: 'NU13',
                name: 'Nueva Segovia',
            },
            {
                code: 'NU17',
                name: 'Región Autónoma del Caribe Norte',
            },
            {
                code: 'NU18',
                name: 'Región Autónoma del Caribe Sur',
            },
            {
                code: 'NU14',
                name: 'Río San Juan',
            },
            {
                code: 'NU15',
                name: 'Rivas',
            },
        ],
    },
    {
        code: 'NE',
        id: 2309,
        name: 'Niger',
        states: [
            {
                code: 'NG01',
                name: 'Agadez',
            },
            {
                code: 'NG02',
                name: 'Diffa',
            },
            {
                code: 'NG03',
                name: 'Dosso',
            },
            {
                code: 'NG04',
                name: 'Maradi',
            },
            {
                code: 'NG08',
                name: 'Niamey',
            },
            {
                code: 'NG06',
                name: 'Tahoua',
            },
            {
                code: 'NG09',
                name: 'Tillabéri',
            },
            {
                code: 'NG07',
                name: 'Zinder',
            },
        ],
    },
    {
        code: 'NG',
        id: 2310,
        name: 'Nigeria',
        states: [
            {
                code: 'NI45',
                name: 'Abia',
            },
            {
                code: 'NI35',
                name: 'Adamawa',
            },
            {
                code: 'NI21',
                name: 'Akwa Ibom',
            },
            {
                code: 'NI25',
                name: 'Anambra',
            },
            {
                code: 'NI46',
                name: 'Bauchi',
            },
            {
                code: 'NI52',
                name: 'Bayelsa',
            },
            {
                code: 'NI26',
                name: 'Benue',
            },
            {
                code: 'NI27',
                name: 'Borno',
            },
            {
                code: 'NI22',
                name: 'Cross River',
            },
            {
                code: 'NI36',
                name: 'Delta',
            },
            {
                code: 'NI53',
                name: 'Ebonyi',
            },
            {
                code: 'NI37',
                name: 'Edo',
            },
            {
                code: 'NI54',
                name: 'Ekiti',
            },
            {
                code: 'NI47',
                name: 'Enugu',
            },
            {
                code: 'NI11',
                name: 'Federal Capital Territory',
            },
            {
                code: 'NI55',
                name: 'Gombe',
            },
            {
                code: 'NI28',
                name: 'Imo',
            },
            {
                code: 'NI39',
                name: 'Jigawa',
            },
            {
                code: 'NI23',
                name: 'Kaduna',
            },
            {
                code: 'NI29',
                name: 'Kano',
            },
            {
                code: 'NI24',
                name: 'Katsina',
            },
            {
                code: 'NI40',
                name: 'Kebbi',
            },
            {
                code: 'NI41',
                name: 'Kogi',
            },
            {
                code: 'NI30',
                name: 'Kwara',
            },
            {
                code: 'NI05',
                name: 'Lagos',
            },
            {
                code: 'NI56',
                name: 'Nassarawa',
            },
            {
                code: 'NI31',
                name: 'Niger',
            },
            {
                code: 'NI16',
                name: 'Ogun',
            },
            {
                code: 'NI48',
                name: 'Ondo',
            },
            {
                code: 'NI42',
                name: 'Osun',
            },
            {
                code: 'NI32',
                name: 'Oyo',
            },
            {
                code: 'NI49',
                name: 'Plateau',
            },
            {
                code: 'NI50',
                name: 'Rivers',
            },
            {
                code: 'NI51',
                name: 'Sokoto',
            },
            {
                code: 'NI43',
                name: 'Taraba',
            },
            {
                code: 'NI44',
                name: 'Yobe',
            },
            {
                code: 'NI57',
                name: 'Zamfara',
            },
        ],
    },
    {
        code: 'NU',
        id: 2427,
        name: 'Niue',
        states: [],
    },
    {
        code: 'NF',
        id: 2428,
        name: 'Norfolk Island',
        states: [],
    },
    {
        code: 'MP',
        id: 2429,
        name: 'Northern Mariana Islands',
        states: [],
    },
    {
        code: 'NO',
        id: 2311,
        name: 'Norway',
        states: [
            {
                code: 'NO02',
                name: 'Akershus',
            },
            {
                code: 'NO09',
                name: 'Aust-Agder',
            },
            {
                code: 'NO06',
                name: 'Buskerud',
            },
            {
                code: 'NO20',
                name: 'Finnmark',
            },
            {
                code: 'NO04',
                name: 'Hedmark',
            },
            {
                code: 'NO12',
                name: 'Hordaland',
            },
            {
                code: 'NO22',
                name: 'Jan Mayen (Arctic Region)',
            },
            {
                code: 'NO15',
                name: 'Møre og Romsdal',
            },
            {
                code: 'NO17',
                name: 'Nord-Trøndelag',
            },
            {
                code: 'NO18',
                name: 'Nordland',
            },
            {
                code: 'NO05',
                name: 'Oppland',
            },
            {
                code: 'NO03',
                name: 'Oslo',
            },
            {
                code: 'NO01',
                name: 'Østfold',
            },
            {
                code: 'NO11',
                name: 'Rogaland',
            },
            {
                code: 'NO14',
                name: 'Sogn og Fjordane',
            },
            {
                code: 'NO16',
                name: 'Sør-Trøndelag',
            },
            {
                code: 'NO21',
                name: 'Svalbard (Arctic Region)',
            },
            {
                code: 'NO08',
                name: 'Telemark',
            },
            {
                code: 'NO19',
                name: 'Troms',
            },
            {
                code: 'NO10',
                name: 'Vest-Agder',
            },
            {
                code: 'NO07',
                name: 'Vestfold',
            },
        ],
    },
    {
        code: 'OM',
        id: 2312,
        name: 'Oman',
        states: [
            {
                code: 'MU01',
                name: 'Ad Dakhliyah',
            },
            {
                code: 'MU09',
                name: 'Adh Dhahirah',
            },
            {
                code: 'MU11',
                name: 'Al Batinah North',
            },
            {
                code: 'MU02',
                name: 'Al Batinah South',
            },
            {
                code: 'MU10',
                name: 'Al Buraymi',
            },
            {
                code: 'MU03',
                name: 'Al Wusta',
            },
            {
                code: 'MU12',
                name: 'Ash Sharqiyah North',
            },
            {
                code: 'MU04',
                name: 'Ash Sharqiyah South',
            },
            {
                code: 'MU08',
                name: 'Dhofar',
            },
            {
                code: 'MU07',
                name: 'Musandam',
            },
            {
                code: 'MU06',
                name: 'Muscat',
            },
        ],
    },
    {
        code: 'PK',
        id: 2313,
        name: 'Pakistan',
        states: [
            {
                code: 'PK06',
                name: 'Azad Kashmir',
            },
            {
                code: 'PK02',
                name: 'Balochistan',
            },
            {
                code: 'PK01',
                name: 'Federally Administered Tribal Areas',
            },
            {
                code: 'PK07',
                name: 'Gilgit-Baltistan',
            },
            {
                code: 'PK08',
                name: 'Islamabad',
            },
            {
                code: 'PK03',
                name: 'Khyber-Pakhtunkhwa',
            },
            {
                code: 'PK04',
                name: 'Punjab',
            },
            {
                code: 'PK05',
                name: 'Sindh',
            },
        ],
    },
    {
        code: 'PW',
        id: 2314,
        name: 'Palau',
        states: [],
    },
    {
        code: 'PS',
        id: 2430,
        name: 'Palestinian Territory; Occupied',
        states: [],
    },
    {
        code: 'PA',
        id: 2315,
        name: 'Panama',
        states: [
            {
                code: 'PM01',
                name: 'Bocas del Toro',
            },
            {
                code: 'PM02\t',
                name: 'Chiriquí',
            },
            {
                code: 'PM03',
                name: 'Coclé',
            },
            {
                code: 'PM04',
                name: 'Coclé',
            },
            {
                code: 'PM05',
                name: 'Darién',
            },
            {
                code: 'PM11',
                name: 'Emberá',
            },
            {
                code: 'PM06',
                name: 'Herrera',
            },
            {
                code: 'PM09',
                name: 'Kuna Yala',
            },
            {
                code: 'PM07',
                name: 'Los Santos',
            },
            {
                code: 'PM12',
                name: 'Ngäbe Buglé',
            },
            {
                code: 'PM13',
                name: 'Panamá Oeste',
            },
            {
                code: 'PM08',
                name: 'Panamá',
            },
            {
                code: 'PM10',
                name: 'Veraguas',
            },
        ],
    },
    {
        code: 'PG',
        id: 2316,
        name: 'Papua New Guinea',
        states: [
            {
                code: 'PP07',
                name: 'Bougainville',
            },
            {
                code: 'PP01',
                name: 'Central',
            },
            {
                code: 'PP08',
                name: 'Chimbu',
            },
            {
                code: 'PP10',
                name: 'East New Britain',
            },
            {
                code: 'PP11',
                name: 'East Sepik',
            },
            {
                code: 'PP09',
                name: 'Eastern Highlands',
            },
            {
                code: 'PP19',
                name: 'Enga',
            },
            {
                code: 'PP02',
                name: 'Gulf',
            },
            {
                code: 'PP21',
                name: 'Hela',
            },
            {
                code: 'PP22',
                name: 'Jiwaka',
            },
            {
                code: 'PP12',
                name: 'Madang',
            },
            {
                code: 'PP13',
                name: 'Manus',
            },
            {
                code: 'PP03',
                name: 'Milne Bay',
            },
            {
                code: 'PP14',
                name: 'Morobe',
            },
            {
                code: 'PP20',
                name: 'National Capital District',
            },
            {
                code: 'PP15',
                name: 'New Ireland',
            },
            {
                code: 'PP04',
                name: 'Northern',
            },
            {
                code: 'PP18',
                name: 'Sandaun',
            },
            {
                code: 'PP05',
                name: 'Southern Highlands',
            },
            {
                code: 'PP17',
                name: 'West New Britain',
            },
            {
                code: 'PP06',
                name: 'Western',
            },
            {
                code: 'PP16',
                name: 'Western Highlands',
            },
        ],
    },
    {
        code: 'PY',
        id: 2317,
        name: 'Paraguay',
        states: [
            {
                code: 'PA23',
                name: 'Alto Paraguay',
            },
            {
                code: 'PA01',
                name: 'Alto Paraná',
            },
            {
                code: 'PA02',
                name: 'Amambay',
            },
            {
                code: 'PA22',
                name: 'Asunción',
            },
            {
                code: 'PA24',
                name: 'Boquerón',
            },
            {
                code: 'PA04',
                name: 'Caaguazú',
            },
            {
                code: 'PA05',
                name: 'Caazapá',
            },
            {
                code: 'PA19',
                name: 'Canindeyú',
            },
            {
                code: 'PA06',
                name: 'Central',
            },
            {
                code: 'PA07',
                name: 'Concepción',
            },
            {
                code: 'PA08',
                name: 'Cordillera',
            },
            {
                code: 'PA10',
                name: 'Guairá',
            },
            {
                code: 'PA11',
                name: 'Itapúa',
            },
            {
                code: 'PA12',
                name: 'Misiones',
            },
            {
                code: 'PA15',
                name: 'Paraguarí',
            },
            {
                code: 'PA16',
                name: 'Presidente Hayes',
            },
            {
                code: 'PA17',
                name: 'San Pedro',
            },
            {
                code: 'PA13',
                name: 'Ñeembucú',
            },
        ],
    },
    {
        code: 'PE',
        id: 2318,
        name: 'Peru',
        states: [
            {
                code: 'PE01',
                name: 'Amazonas',
            },
            {
                code: 'PE02',
                name: 'Ancash',
            },
            {
                code: 'PE03',
                name: 'Apurímac',
            },
            {
                code: 'PE04',
                name: 'Arequipa',
            },
            {
                code: 'PE05',
                name: 'Ayacucho',
            },
            {
                code: 'PE06',
                name: 'Cajamarca',
            },
            {
                code: 'PE07',
                name: 'Callao',
            },
            {
                code: 'PE08',
                name: 'Cusco',
            },
            {
                code: 'PE09',
                name: 'Huancavelica',
            },
            {
                code: 'PE10',
                name: 'Huánuco',
            },
            {
                code: 'PE11',
                name: 'Ica',
            },
            {
                code: 'PE12',
                name: 'Junín',
            },
            {
                code: 'PE13',
                name: 'La Libertad',
            },
            {
                code: 'PE14',
                name: 'Lambayeque',
            },
            {
                code: 'PE15',
                name: 'Lima',
            },
            {
                code: 'PE26',
                name: 'Lima [Province]',
            },
            {
                code: 'PE16',
                name: 'Loreto',
            },
            {
                code: 'PE17',
                name: 'Madre de Dios',
            },
            {
                code: 'PE18',
                name: 'Moquegua',
            },
            {
                code: 'PE19',
                name: 'Pasco',
            },
            {
                code: 'PE20',
                name: 'Piura',
            },
            {
                code: 'PE21',
                name: 'Puno',
            },
            {
                code: 'PE22',
                name: 'San Martín',
            },
            {
                code: 'PE23',
                name: 'Tacna',
            },
            {
                code: 'PE24',
                name: 'Tumbes',
            },
            {
                code: 'PE25',
                name: 'Ucayali',
            },
        ],
    },
    {
        code: 'PH',
        id: 2319,
        name: 'Philippines',
        states: [
            {
                code: 'RP01',
                name: 'Abra',
            },
            {
                code: 'RP02',
                name: 'Agusan del Norte',
            },
            {
                code: 'RP03',
                name: 'Agusan del Sur',
            },
            {
                code: 'RP04',
                name: 'Aklan',
            },
            {
                code: 'RP05',
                name: 'Albay',
            },
            {
                code: 'RP06',
                name: 'Antique',
            },
            {
                code: 'RPH6',
                name: 'Apayao',
            },
            {
                code: 'RPG8',
                name: 'Aurora',
            },
            {
                code: 'RP22',
                name: 'Basilan',
            },
            {
                code: 'RP07',
                name: 'Bataan',
            },
            {
                code: 'RP08',
                name: 'Batanes',
            },
            {
                code: 'RP09',
                name: 'Batangas',
            },
            {
                code: 'RP10',
                name: 'Benguet',
            },
            {
                code: 'RPH9',
                name: 'Biliran',
            },
            {
                code: 'RP11',
                name: 'Bohol',
            },
            {
                code: 'RP12',
                name: 'Bukidnon',
            },
            {
                code: 'RP13',
                name: 'Bulacan',
            },
            {
                code: 'RP14',
                name: 'Cagayan',
            },
            {
                code: 'RP15',
                name: 'Camarines Norte',
            },
            {
                code: 'RP16',
                name: 'Camarines Sur',
            },
            {
                code: 'RP17',
                name: 'Camiguin',
            },
            {
                code: 'RP18',
                name: 'Capiz',
            },
            {
                code: 'RP19',
                name: 'Catanduanes',
            },
            {
                code: 'RP20',
                name: 'Cavite',
            },
            {
                code: 'RP21',
                name: 'Cebu',
            },
            {
                code: 'RPI6',
                name: 'Compostela Valley',
            },
            {
                code: 'RP57',
                name: 'Cotabato',
            },
            {
                code: 'RP26',
                name: 'Davao Oriental',
            },
            {
                code: 'RPI7',
                name: 'Davao del Norte',
            },
            {
                code: 'RP25',
                name: 'Davao del Sur',
            },
            {
                code: 'RPI9',
                name: 'Dinagat Islands',
            },
            {
                code: 'RP23',
                name: 'Eastern Samar',
            },
            {
                code: 'RPJ3',
                name: 'Guimaras',
            },
            {
                code: 'RP27',
                name: 'Ifugao',
            },
            {
                code: 'RP28',
                name: 'Ilocos Norte',
            },
            {
                code: 'RP29',
                name: 'Ilocos Sur',
            },
            {
                code: 'RP30',
                name: 'Iloilo',
            },
            {
                code: 'RP31',
                name: 'Isabela',
            },
            {
                code: 'RPJ7',
                name: 'Kalinga',
            },
            {
                code: 'RP36',
                name: 'La Union',
            },
            {
                code: 'RP33',
                name: 'Laguna',
            },
            {
                code: 'RP34',
                name: 'Lanao del Norte',
            },
            {
                code: 'RP35',
                name: 'Lanao del Sur',
            },
            {
                code: 'RP37',
                name: 'Leyte',
            },
            {
                code: 'RP56',
                name: 'Maguindanao',
            },
            {
                code: 'RP38',
                name: 'Marinduque',
            },
            {
                code: 'RP39',
                name: 'Masbate',
            },
            {
                code: 'RPD9',
                name: 'Metropolitan Manila',
            },
            {
                code: 'RP42',
                name: 'Misamis Occidental',
            },
            {
                code: 'RP43',
                name: 'Misamis Oriental',
            },
            {
                code: 'RP44',
                name: 'Mountain',
            },
            {
                code: 'RPH3',
                name: 'Negros Occidental',
            },
            {
                code: 'RP46',
                name: 'Negros Oriental',
            },
            {
                code: 'RP67',
                name: 'Northern Samar',
            },
            {
                code: 'RP47',
                name: 'Nueva Ecija',
            },
            {
                code: 'RP48',
                name: 'Nueva Vizcaya',
            },
            {
                code: 'RP40',
                name: 'Occidental Mindoro',
            },
            {
                code: 'RP41',
                name: 'Oriental Mindoro',
            },
            {
                code: 'RP49',
                name: 'Palawan',
            },
            {
                code: 'RP50',
                name: 'Pampanga',
            },
            {
                code: 'RP51',
                name: 'Pangasinan',
            },
            {
                code: 'RPH2',
                name: 'Quezon',
            },
            {
                code: 'RP68',
                name: 'Quirino',
            },
            {
                code: 'RP53',
                name: 'Rizal',
            },
            {
                code: 'RP54',
                name: 'Romblon',
            },
            {
                code: 'RP55',
                name: 'Samar',
            },
            {
                code: 'PH72',
                name: 'Sarangani',
            },
            {
                code: 'RP69',
                name: 'Siquijor',
            },
            {
                code: 'RP58',
                name: 'Sorsogon',
            },
            {
                code: 'RP70',
                name: 'South Cotabato',
            },
            {
                code: 'RP59',
                name: 'Southern Leyte',
            },
            {
                code: 'RP71',
                name: 'Sultan Kudarat',
            },
            {
                code: 'RP60',
                name: 'Sulu',
            },
            {
                code: 'RP61',
                name: 'Surigao del Norte',
            },
            {
                code: 'RP62',
                name: 'Surigao del Sur',
            },
            {
                code: 'RPO3',
                name: 'Tarlac',
            },
            {
                code: 'RPO4',
                name: 'Tawi-Tawi',
            },
            {
                code: 'RPP1',
                name: 'Zambales',
            },
            {
                code: 'RPG7',
                name: 'Zamboanga del Norte',
            },
            {
                code: 'RP65',
                name: 'Zamboanga del Sur',
            },
            {
                code: 'RP66',
                name: 'Zamboanga-Sibugay',
            },
        ],
    },
    {
        code: 'PN',
        id: 2431,
        name: 'Pitcairn',
        states: [],
    },
    {
        code: 'PL',
        id: 2320,
        name: 'Poland',
        states: [
            {
                code: 'PL-DS',
                name: 'Dolnoslaskie',
            },
            {
                code: 'PL-KP',
                name: 'Kujawsko-pomorskie',
            },
            {
                code: 'PL-LD',
                name: 'Lódzkie',
            },
            {
                code: 'PL-LU',
                name: 'Lubelskie',
            },
            {
                code: 'PL-LB',
                name: 'Lubuskie',
            },
            {
                code: 'PL-MA',
                name: 'Malopolskie',
            },
            {
                code: 'PL-MZ',
                name: 'Mazowieckie',
            },
            {
                code: 'PL-OP',
                name: 'Opolskie',
            },
            {
                code: 'PL-PK',
                name: 'Podkarpackie',
            },
            {
                code: 'PL-PD',
                name: 'Podlaskie',
            },
            {
                code: 'PL-PM',
                name: 'Pomorskie',
            },
            {
                code: 'PL-SL',
                name: 'Slaskie',
            },
            {
                code: 'PL-SK',
                name: 'Swietokrzyskie',
            },
            {
                code: 'PL-WN',
                name: 'Warminsko-mazurskie',
            },
            {
                code: 'PL-WP',
                name: 'Wielkopolskie',
            },
        ],
    },
    {
        code: 'PT',
        id: 2321,
        name: 'Portugal',
        states: [
            {
                code: 'PO23',
                name: 'Acores Autonomous',
            },
            {
                code: 'PO02',
                name: 'Aveiro',
            },
            {
                code: 'PO03',
                name: 'Beja',
            },
            {
                code: 'PO04',
                name: 'Braga',
            },
            {
                code: 'PO05',
                name: 'Braganca',
            },
            {
                code: 'PO06',
                name: 'Castelo Branco',
            },
            {
                code: 'PO07',
                name: 'Coimbra',
            },
            {
                code: 'PO08',
                name: 'Evora',
            },
            {
                code: 'PO09',
                name: 'Faro',
            },
            {
                code: 'PO11',
                name: 'Guarda',
            },
            {
                code: 'PO13',
                name: 'Leiria',
            },
            {
                code: 'PO14',
                name: 'Lisboa',
            },
            {
                code: 'PO10',
                name: 'Madeira Autonomous',
            },
            {
                code: 'PO16',
                name: 'Portalegre',
            },
            {
                code: 'PO17',
                name: 'Porto',
            },
            {
                code: 'PO18',
                name: 'Santarem',
            },
            {
                code: 'PO19',
                name: 'Setubal',
            },
            {
                code: 'PO20',
                name: 'Viana do Castelo',
            },
            {
                code: 'PO21',
                name: 'Vila Real',
            },
            {
                code: 'PO22',
                name: 'Viseu',
            },
        ],
    },
    {
        code: 'PR',
        id: 2374,
        name: 'Puerto Rico',
        states: [
            {
                code: 'PR.AJ',
                name: 'Adjuntas',
            },
            {
                code: 'PR.AD',
                name: 'Aguada',
            },
            {
                code: 'PR.AL',
                name: 'Aguadilla',
            },
            {
                code: 'PR.AB',
                name: 'Aguas Buenas',
            },
            {
                code: 'PR.AI',
                name: 'Aibonito',
            },
            {
                code: 'PR.AN',
                name: 'Añasco',
            },
            {
                code: 'PR.AC',
                name: 'Arecibo',
            },
            {
                code: 'PR.AR',
                name: 'Arroyo',
            },
            {
                code: 'PR.BC',
                name: 'Barceloneta',
            },
            {
                code: 'PR.BQ',
                name: 'Barranquitas',
            },
            {
                code: 'PR.BY',
                name: 'Bayamón',
            },
            {
                code: 'PR.CR',
                name: 'Cabo Rojo',
            },
            {
                code: 'PR.CG',
                name: 'Caguas',
            },
            {
                code: 'PR.CA',
                name: 'Camuy',
            },
            {
                code: 'PR.CV',
                name: 'Canóvanas',
            },
            {
                code: 'PR.CN',
                name: 'Carolina',
            },
            {
                code: 'PR.CT',
                name: 'Cataño',
            },
            {
                code: 'PR.CY',
                name: 'Cayey',
            },
            {
                code: 'PR.CB',
                name: 'Ceiba',
            },
            {
                code: 'PR.CL',
                name: 'Ciales',
            },
            {
                code: 'PR.CD',
                name: 'Cidra',
            },
            {
                code: 'PR.CO',
                name: 'Coamo',
            },
            {
                code: 'PR.CM',
                name: 'Comerío',
            },
            {
                code: 'PR.CZ',
                name: 'Corozal',
            },
            {
                code: 'PR.CU',
                name: 'Culebra',
            },
            {
                code: 'PR.DO',
                name: 'Dorado',
            },
            {
                code: 'PR.FJ',
                name: 'Fajardo',
            },
            {
                code: 'PR.FL',
                name: 'Florida',
            },
            {
                code: 'PR.GC',
                name: 'Guánica',
            },
            {
                code: 'PR.GM',
                name: 'Guayama',
            },
            {
                code: 'PR.GL',
                name: 'Guayanilla',
            },
            {
                code: 'PR.GB',
                name: 'Guaynabo',
            },
            {
                code: 'PR.GR',
                name: 'Gurabo',
            },
            {
                code: 'PR.HA',
                name: 'Hatillo',
            },
            {
                code: 'PR.HO',
                name: 'Hormigueros',
            },
            {
                code: 'PR.HU',
                name: 'Humacao',
            },
            {
                code: 'PR.IS',
                name: 'Isabela',
            },
            {
                code: 'PR.JY',
                name: 'Jayuya',
            },
            {
                code: 'PR.JD',
                name: 'Juana Díaz',
            },
            {
                code: 'PR.JC',
                name: 'Juncos',
            },
            {
                code: 'PR.LJ',
                name: 'Lajas',
            },
            {
                code: 'PR.LR',
                name: 'Lares',
            },
            {
                code: 'PR.LM',
                name: 'Las Marías',
            },
            {
                code: 'PR.LP',
                name: 'Las Piedras',
            },
            {
                code: 'PR.LZ',
                name: 'Loíza',
            },
            {
                code: 'PR.LQ',
                name: 'Luquillo',
            },
            {
                code: 'PR.MT',
                name: 'Manatí',
            },
            {
                code: 'PR.MR',
                name: 'Maricao',
            },
            {
                code: 'PR.MB',
                name: 'Maunabo',
            },
            {
                code: 'PR.MG',
                name: 'Mayagüez',
            },
            {
                code: 'PR.MC',
                name: 'Moca',
            },
            {
                code: 'PR.MV',
                name: 'Morovis',
            },
            {
                code: 'PR.NG',
                name: 'Naguabo',
            },
            {
                code: 'PR.NR',
                name: 'Naranjito',
            },
            {
                code: 'PR.OR',
                name: 'Orocovis',
            },
            {
                code: 'PR.PT',
                name: 'Patillas',
            },
            {
                code: 'PR.PN\t',
                name: 'Peñuelas',
            },
            {
                code: 'PR.PO',
                name: 'Ponce',
            },
            {
                code: 'PR.QB',
                name: 'Quebradillas',
            },
            {
                code: 'PR.RC',
                name: 'Rincón',
            },
            {
                code: 'PR.RG',
                name: 'Río Grande',
            },
            {
                code: 'PR.SB',
                name: 'Sabana Grande',
            },
            {
                code: 'PR.SA',
                name: 'Salinas',
            },
            {
                code: 'PR.SG',
                name: 'San Germán',
            },
            {
                code: 'PR.SJ',
                name: 'San Juan',
            },
            {
                code: 'PR.SL',
                name: 'San Lorenzo',
            },
            {
                code: 'PR.SS',
                name: 'San Sebastián',
            },
            {
                code: 'PR.SI',
                name: 'Santa Isabel',
            },
            {
                code: 'PR.TA',
                name: 'Toa Alta',
            },
            {
                code: 'PR.TB',
                name: 'Toa Baja',
            },
            {
                code: 'PR.TJ',
                name: 'Trujillo Alto',
            },
            {
                code: 'PR.UT',
                name: 'Utuado',
            },
            {
                code: 'PR.VA',
                name: 'Vega Alta',
            },
            {
                code: 'PR.VB',
                name: 'Vega Baja',
            },
            {
                code: 'PR.VQ',
                name: 'Vieques',
            },
            {
                code: 'PR.VL',
                name: 'Villalba',
            },
            {
                code: 'PR.YB',
                name: 'Yabucoa',
            },
            {
                code: 'PR.YU',
                name: 'Yauco',
            },
        ],
    },
    {
        code: 'QA',
        id: 2322,
        name: 'Qatar',
        states: [
            {
                code: 'QA01',
                name: 'Ad Dawhah',
            },
            {
                code: 'QA13',
                name: 'Al Daayen',
            },
            {
                code: 'QA04',
                name: 'Al Khawr',
            },
            {
                code: 'QA10',
                name: 'Al Wakrah',
            },
            {
                code: 'QA14',
                name: 'Al-Shahaniya',
            },
            {
                code: 'QA06',
                name: 'Ar Rayyan',
            },
            {
                code: 'QA08',
                name: 'Madinat ach Shamal',
            },
            {
                code: 'QA09',
                name: 'Umm Salal',
            },
        ],
    },
    {
        code: 'R999',
        id: 2398,
        name: 'Reunion',
        states: [],
    },
    {
        code: 'RO',
        id: 2323,
        name: 'Romania',
        states: [
            {
                code: 'RO-AB',
                name: 'Alba',
            },
            {
                code: 'RO-AR',
                name: 'Arad',
            },
            {
                code: 'RO-AG',
                name: 'Arges',
            },
            {
                code: 'RO-BC',
                name: 'Bacau',
            },
            {
                code: 'RO-BH',
                name: 'Bihor',
            },
            {
                code: 'RO-BN',
                name: 'Bistrita-Nasaud',
            },
            {
                code: 'RO-BT',
                name: 'Botosani',
            },
            {
                code: 'RO-BR',
                name: 'Braila',
            },
            {
                code: 'RO-BV',
                name: 'Brasov',
            },
            {
                code: 'RO-B',
                name: 'Bucuresti',
            },
            {
                code: 'RO-BZ',
                name: 'Buzau',
            },
            {
                code: 'RO-CL',
                name: 'Calarasi',
            },
            {
                code: 'RO-CS',
                name: 'Caras-Severin',
            },
            {
                code: 'RO-CJ',
                name: 'Cluj',
            },
            {
                code: 'RO-CT',
                name: 'Constanta',
            },
            {
                code: 'RO-CV',
                name: 'Covasna',
            },
            {
                code: 'RO-DB',
                name: 'Dâmbovita',
            },
            {
                code: 'RO-DJ',
                name: 'Dolj',
            },
            {
                code: 'RO-GL',
                name: 'Galati',
            },
            {
                code: 'RO-GR',
                name: 'Giurgiu',
            },
            {
                code: 'RO-GJ',
                name: 'Gorj',
            },
            {
                code: 'RO-HR',
                name: 'Harghita',
            },
            {
                code: 'RO-HD',
                name: 'Hunedoara',
            },
            {
                code: 'RO-IL',
                name: 'Ialomita',
            },
            {
                code: 'RO-IS',
                name: 'Iasi',
            },
            {
                code: 'RO-IF',
                name: 'Ilfov',
            },
            {
                code: 'RO-MM',
                name: 'Maramures',
            },
            {
                code: 'RO-MH',
                name: 'Mehedinti',
            },
            {
                code: 'RO-MS',
                name: 'Mures',
            },
            {
                code: 'RO-NT',
                name: 'Neamt',
            },
            {
                code: 'RO-OT',
                name: 'Olt',
            },
            {
                code: 'RO-PH',
                name: 'Prahova',
            },
            {
                code: 'RO-SJ',
                name: 'Salaj',
            },
            {
                code: 'RO-SM',
                name: 'Satu Mare',
            },
            {
                code: 'RO-SB',
                name: 'Sibiu',
            },
            {
                code: 'RO-SV',
                name: 'Suceava',
            },
            {
                code: 'RO-TR',
                name: 'Teleorman',
            },
            {
                code: 'RO-TM',
                name: 'Timis',
            },
            {
                code: 'RO-TL',
                name: 'Tulcea',
            },
            {
                code: 'RO-VL',
                name: 'Vâlcea',
            },
            {
                code: 'RO-VS',
                name: 'Vaslui',
            },
            {
                code: 'RO-VN',
                name: 'Vrancea',
            },
        ],
    },
    {
        code: 'RU',
        id: 2324,
        name: 'Russian Federation',
        states: [
            {
                code: 'RS01',
                name: 'Adygeya Republic',
            },
            {
                code: 'RS02',
                name: 'Aginskiy Buryatskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS03',
                name: 'Altay Republic',
            },
            {
                code: 'RS04',
                name: 'Altayskiy Kray',
            },
            {
                code: 'RS05',
                name: "Amurskaya Oblast'",
            },
            {
                code: 'RS06',
                name: "Arkhangel'skaya Oblast'",
            },
            {
                code: 'RS07',
                name: "Astrakhanskaya Oblast'",
            },
            {
                code: 'RS08',
                name: 'Bashkortostan Republic',
            },
            {
                code: 'RS09',
                name: "Belgorodskaya Oblast'",
            },
            {
                code: 'RS10',
                name: "Bryanskaya Oblast'",
            },
            {
                code: 'RS11',
                name: 'Buryatiya Republic',
            },
            {
                code: 'RSCI',
                name: 'Chechnya Republic',
            },
            {
                code: 'RS13',
                name: "Chelyabinskaya Oblast'",
            },
            {
                code: 'RS14',
                name: "Chitinskaya Oblast'",
            },
            {
                code: 'RS15',
                name: 'Chukotskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS16',
                name: 'Chuvashiya Republic',
            },
            {
                code: 'RS17',
                name: 'Dagestan Republic',
            },
            {
                code: 'RS18',
                name: 'Evenkiyskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS20',
                name: "Irkutskaya Oblast'",
            },
            {
                code: 'RS21',
                name: "Ivanovskaya Oblast'",
            },
            {
                code: 'RS22',
                name: 'Kabardino-Balkariya Republic',
            },
            {
                code: 'RS23',
                name: "Kaliningradskaya Oblast'",
            },
            {
                code: 'RS24',
                name: 'Kalmykiya Republic',
            },
            {
                code: 'RS25',
                name: "Kaluzhskaya Oblast'",
            },
            {
                code: 'RS26',
                name: "Kamchatskaya Oblast'",
            },
            {
                code: 'RS27',
                name: 'Karachayevo-Cherkesiya Republic',
            },
            {
                code: 'RS28',
                name: 'Kareliya Republic',
            },
            {
                code: 'RS29',
                name: "Kemerovskaya Oblast'",
            },
            {
                code: 'RS30',
                name: 'Khabarovskiy Kray',
            },
            {
                code: 'RS31',
                name: 'Khakasiya Republic',
            },
            {
                code: 'RS32',
                name: 'Khanty-Mansiyskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS33',
                name: "Kirovskaya Oblast'",
            },
            {
                code: 'RS34',
                name: 'Komi Republic',
            },
            {
                code: 'RS36',
                name: 'Koryakskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS37',
                name: "Kostromskaya Oblast'",
            },
            {
                code: 'RS38',
                name: 'Krasnodarskiy Kray',
            },
            {
                code: 'RS39',
                name: 'Krasnoyarskiy Kray',
            },
            {
                code: 'RS40',
                name: "Kurganskaya Oblast'",
            },
            {
                code: 'RS41',
                name: "Kurskaya Oblast'",
            },
            {
                code: 'RS42',
                name: "Leningradskaya Oblast'",
            },
            {
                code: 'RS43',
                name: "Lipetskaya Oblast'",
            },
            {
                code: 'RS44',
                name: "Magadanskaya Oblast'",
            },
            {
                code: 'RS45',
                name: 'Mariy-El Republic',
            },
            {
                code: 'RS46',
                name: 'Mordoviya Republic',
            },
            {
                code: 'RS47',
                name: "Moskovskaya Oblast'",
            },
            {
                code: 'RS48',
                name: 'Moskva Federal City',
            },
            {
                code: 'RS49',
                name: "Murmanskaya Oblast'",
            },
            {
                code: 'RS50',
                name: 'Nenetskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS51',
                name: "Nizhegorodskaya Oblast'",
            },
            {
                code: 'RS52',
                name: "Novgorodskaya Oblast'",
            },
            {
                code: 'RS53',
                name: "Novosibirskaya Oblast'",
            },
            {
                code: 'RS54',
                name: "Omskaya Oblast'",
            },
            {
                code: 'RS55',
                name: "Orenburgskaya Oblast'",
            },
            {
                code: 'RS56',
                name: "Orlovskaya Oblast'",
            },
            {
                code: 'RS57',
                name: "Penzenskaya Oblast'",
            },
            {
                code: 'RS90',
                name: 'Permskiy Kray',
            },
            {
                code: 'RS59',
                name: 'Primorskiy Kray',
            },
            {
                code: 'RS60',
                name: "Pskovskaya Oblast'",
            },
            {
                code: 'RS61',
                name: "Rostovskaya Oblast'",
            },
            {
                code: 'RS62',
                name: "Ryazanskaya Oblast'",
            },
            {
                code: 'RS63',
                name: 'Sakha (Yakutiya) Republic',
            },
            {
                code: 'RS64',
                name: "Sakhalinskaya Oblast'",
            },
            {
                code: 'RS65',
                name: "Samarskaya Oblast'",
            },
            {
                code: 'RS66',
                name: 'Sankt-Peterburg Federal City',
            },
            {
                code: 'RS67',
                name: "Saratovskaya Oblast'",
            },
            {
                code: 'RS68',
                name: 'Severnaya Osetiya-Alaniya Respublika',
            },
            {
                code: 'RS69',
                name: "Smolenskaya Oblast'",
            },
            {
                code: 'RS70',
                name: "Stavropol'skiy Kray",
            },
            {
                code: 'RS71',
                name: "Sverdlovskaya Oblast'",
            },
            {
                code: 'RS72',
                name: "Tambovskaya Oblast'",
            },
            {
                code: 'RS73',
                name: 'Tatarstan Republic',
            },
            {
                code: 'RS74',
                name: 'Taymyrskiy (Dolgano-Nenetskiy) Avtonomnyy Okrug',
            },
            {
                code: 'RS75',
                name: "Tomskaya Oblast'",
            },
            {
                code: 'RS76',
                name: "Tul'skaya Oblast'",
            },
            {
                code: 'RS77',
                name: "Tverskaya Oblast'",
            },
            {
                code: 'RS78',
                name: "Tyumenskaya Oblast'",
            },
            {
                code: 'RS79',
                name: 'Tyva Republic',
            },
            {
                code: 'RS80',
                name: 'Udmurtiya Republic',
            },
            {
                code: 'RS81',
                name: "Ul'yanovskaya Oblast'",
            },
            {
                code: 'RS82',
                name: "Ust'-Ordynskiy Buryatskiy Avtonomnyy Okrug",
            },
            {
                code: 'RS83',
                name: "Vladimirskaya Oblast'",
            },
            {
                code: 'RS84',
                name: "Volgogradskaya Oblast'",
            },
            {
                code: 'RS85',
                name: "Vologodskaya Oblast'",
            },
            {
                code: 'RS86',
                name: "Voronezhskaya Oblast'",
            },
            {
                code: 'RS87',
                name: 'Yamalo-Nenetskiy Avtonomnyy Okrug',
            },
            {
                code: 'RS88',
                name: "Yaroslavskaya Oblast'",
            },
            {
                code: 'RS89',
                name: "Yevreyskaya Avtonomnaya Oblast'",
            },
        ],
    },
    {
        code: 'RW',
        id: 2325,
        name: 'Rwanda',
        states: [
            {
                code: 'RW11',
                name: 'Eastern',
            },
            {
                code: 'RW12',
                name: 'Kigali City',
            },
            {
                code: 'RW13',
                name: 'Northern',
            },
            {
                code: 'RW15',
                name: 'Southern',
            },
            {
                code: 'RW14',
                name: 'Western',
            },
        ],
    },
    {
        code: 'BL',
        id: 2432,
        name: 'Saint Barthélemy',
        states: [],
    },
    {
        code: 'SH',
        id: 2433,
        name: 'Saint Helena; Ascension and Tristan Da Cunha',
        states: [],
    },
    {
        code: 'KN',
        id: 2399,
        name: 'Saint Kitts and Nevis',
        states: [],
    },
    {
        code: 'LC',
        id: 2326,
        name: 'Saint Lucia',
        states: [],
    },
    {
        code: 'MF',
        id: 2434,
        name: 'Saint Martin',
        states: [
            {
                code: 'MF.SM',
                name: 'Saint Martin',
            },
        ],
    },
    {
        code: 'PM',
        id: 2435,
        name: 'Saint Pierre And Miquelon',
        states: [],
    },
    {
        code: 'VC',
        id: 2400,
        name: 'Saint Vincent and Grenadines',
        states: [],
    },
    {
        code: 'WS',
        id: 2401,
        name: 'Samoa',
        states: [
            {
                code: 'WS01',
                name: "A'ana",
            },
            {
                code: 'WS02',
                name: 'Aiga-i-le-Tai',
            },
            {
                code: 'WS03',
                name: 'Atua',
            },
            {
                code: 'WS04',
                name: "Fa'asaleleaga",
            },
            {
                code: 'WS05',
                name: "Gaga'emauga",
            },
            {
                code: 'WS07',
                name: 'Gagaifomauga',
            },
            {
                code: 'WS08',
                name: 'Palauli',
            },
            {
                code: 'WS09',
                name: "Satupa'itea",
            },
            {
                code: 'WS10',
                name: 'Tuamasaga',
            },
            {
                code: 'WS06',
                name: "Va'a-o-Fonoti",
            },
            {
                code: 'WS11',
                name: 'Vaisigano',
            },
        ],
    },
    {
        code: 'SM',
        id: 2327,
        name: 'San Marino',
        states: [],
    },
    {
        code: 'TP',
        id: 2403,
        name: 'Sao Tome and Principe',
        states: [],
    },
    {
        code: 'SA',
        id: 2328,
        name: 'Saudi Arabia',
        states: [
            {
                code: 'SA02',
                name: 'Al Bahah',
            },
            {
                code: 'SA15',
                name: 'Al Hudud ash Shamaliyah',
            },
            {
                code: 'SA20',
                name: 'Al Jawf',
            },
            {
                code: 'SA05',
                name: 'Al Madinah',
            },
            {
                code: 'SA08',
                name: 'Al Qasim',
            },
            {
                code: 'SA10',
                name: 'Ar Riyad',
            },
            {
                code: 'SA06',
                name: 'Ash Sharqiyah',
            },
            {
                code: 'SA11',
                name: 'Asir',
            },
            {
                code: 'SA13',
                name: "Ha'il",
            },
            {
                code: 'SA17',
                name: 'Jizan',
            },
            {
                code: 'SA14',
                name: 'Makkah',
            },
            {
                code: 'SA16',
                name: 'Najran',
            },
            {
                code: 'SA19',
                name: 'Tabuk',
            },
        ],
    },
    {
        code: 'SN',
        id: 2329,
        name: 'Senegal',
        states: [
            {
                code: 'SG01',
                name: 'Dakar',
            },
            {
                code: 'SG03',
                name: 'Diourbel',
            },
            {
                code: 'SG09',
                name: 'Fatick',
            },
            {
                code: 'SG16',
                name: 'Kaffrine',
            },
            {
                code: 'SG10',
                name: 'Kaolack',
            },
            {
                code: 'SG17',
                name: 'Kédougou',
            },
            {
                code: 'SG11',
                name: 'Kolda',
            },
            {
                code: 'SG13',
                name: 'Louga',
            },
            {
                code: 'SG15',
                name: 'Matam',
            },
            {
                code: 'SG14',
                name: 'Saint-Louis',
            },
            {
                code: 'SG18',
                name: 'Sédhiou',
            },
            {
                code: 'SG05',
                name: 'Tambacounda',
            },
            {
                code: 'SG07',
                name: 'Thiès',
            },
            {
                code: 'SG12',
                name: 'Ziguinchor',
            },
        ],
    },
    {
        code: 'RI',
        id: 2402,
        name: 'Serbia',
        states: [
            {
                code: 'RS-00',
                name: 'Belgrade',
            },
            {
                code: 'RS-14',
                name: 'Borski okrug',
            },
            {
                code: 'RS-11',
                name: 'Branicevski okrug',
            },
            {
                code: 'RS-23',
                name: 'Jablanicki okrug',
            },
            {
                code: 'RS-06',
                name: 'Južnobanatski okrug',
            },
            {
                code: 'RS-04',
                name: 'Južnobanatski okrug',
            },
            {
                code: 'RS-09',
                name: 'Kolubarski okrug',
            },
            {
                code: 'RS-25',
                name: 'Kosovski okrug',
            },
            {
                code: 'RS-28',
                name: 'Kosovsko-Mitrovacki okrug',
            },
            {
                code: 'RS-29',
                name: 'Kosovsko-Pomoravski okrug',
            },
            {
                code: 'RS-08',
                name: 'Macvanski okrug',
            },
            {
                code: 'RS-17',
                name: 'Moravicki okrug',
            },
            {
                code: 'RS-20',
                name: 'Nišavski okrug',
            },
            {
                code: 'RS-24',
                name: 'Pcinjski okrug',
            },
            {
                code: 'RS-26',
                name: 'Pecki okrug',
            },
            {
                code: 'RS-22',
                name: 'Pirotski okrug',
            },
            {
                code: 'RS-10',
                name: 'Podunavski okrug',
            },
            {
                code: 'RS-13',
                name: 'Pomoravski okrug',
            },
            {
                code: 'RS-27',
                name: 'Prizrenski okrug',
            },
            {
                code: 'RS-19',
                name: 'Rasinski okrug',
            },
            {
                code: 'RS-18',
                name: 'Raška okrug',
            },
            {
                code: 'RS-01',
                name: 'Severnobacki okrug',
            },
            {
                code: 'RS-03',
                name: 'Severnobanatski okrug',
            },
            {
                code: 'RS-02',
                name: 'Srednjebanatski okrug',
            },
            {
                code: 'RS-07',
                name: 'Sremski okrug',
            },
            {
                code: 'RS-12',
                name: 'Šumadijski okrug',
            },
            {
                code: 'RS-21',
                name: 'Toplièki okrug',
            },
            {
                code: 'RS-15',
                name: 'Zajeèarski okrug',
            },
            {
                code: 'RS-05',
                name: 'Zapadnobaèki okrug',
            },
            {
                code: 'RS-16',
                name: 'Zlatiborski okrug',
            },
        ],
    },
    {
        code: 'SC',
        id: 2331,
        name: 'Seychelles',
        states: [],
    },
    {
        code: 'SL',
        id: 2332,
        name: 'Sierra Leone',
        states: [
            {
                code: 'SL01',
                name: 'Eastern',
            },
            {
                code: 'SL02',
                name: 'Northern',
            },
            {
                code: 'SL03',
                name: 'Southern',
            },
            {
                code: 'SL04',
                name: 'Western',
            },
        ],
    },
    {
        code: 'SG',
        id: 2333,
        name: 'Singapore',
        states: [
            {
                code: 'SG01',
                name: 'Central Singapore',
            },
            {
                code: 'SG02',
                name: 'North East',
            },
            {
                code: 'SG03',
                name: 'North West',
            },
            {
                code: 'SG04',
                name: 'South East',
            },
            {
                code: 'SG05',
                name: 'South West',
            },
        ],
    },
    {
        code: 'SX',
        id: 2448,
        name: 'Sint Maarten',
        states: [
            {
                code: 'SX.SM',
                name: 'Sint Maarten',
            },
        ],
    },
    {
        code: 'SK',
        id: 2334,
        name: 'Slovakia',
        states: [
            {
                code: 'SK-BC',
                name: 'Banskobystrický kraj',
            },
            {
                code: 'SK-BL',
                name: 'Bratislavský kraj',
            },
            {
                code: 'SK-KI',
                name: 'Košický kraj',
            },
            {
                code: 'SK-NI',
                name: 'Nitriansky kraj',
            },
            {
                code: 'SK-PV',
                name: 'Prešovský kraj',
            },
            {
                code: 'SK-TC',
                name: 'Trenciansky kraj',
            },
            {
                code: 'SK-TA',
                name: 'Trnavský kraj',
            },
            {
                code: 'SK-ZI',
                name: 'Žilinský kraj',
            },
        ],
    },
    {
        code: 'SI',
        id: 2335,
        name: 'Slovenia',
        states: [
            {
                code: 'SI-001',
                name: 'Ajdovšcina',
            },
            {
                code: 'SI-195',
                name: 'Apace',
            },
            {
                code: 'SI-002',
                name: 'Beltinci',
            },
            {
                code: 'SI-148',
                name: 'Benedikt',
            },
            {
                code: 'SI-149',
                name: 'Bistrica ob Sotli',
            },
            {
                code: 'SI-003',
                name: 'Bled',
            },
            {
                code: 'SI-150',
                name: 'Bloke',
            },
            {
                code: 'SI-004',
                name: 'Bohinj',
            },
            {
                code: 'SI-005',
                name: 'Borovnica',
            },
            {
                code: 'SI-006',
                name: 'Bovec',
            },
            {
                code: 'SI-151',
                name: 'Braslovce',
            },
            {
                code: 'SI-007',
                name: 'Brda',
            },
            {
                code: 'SI-009',
                name: 'Brežice',
            },
            {
                code: 'SI-008',
                name: 'Brezovica',
            },
            {
                code: 'SI-152',
                name: 'Cankova',
            },
            {
                code: 'SI-011',
                name: 'Celje',
            },
            {
                code: 'SI-012',
                name: 'Cerklje na Gorenjskem',
            },
            {
                code: 'SI-013',
                name: 'Cerknica',
            },
            {
                code: 'SI-014',
                name: 'Cerkno',
            },
            {
                code: 'SI-153',
                name: 'Cerkvenjak',
            },
            {
                code: 'SI-197',
                name: 'Cirkulane',
            },
            {
                code: 'SI-015',
                name: 'Crenšovci',
            },
            {
                code: 'SI-016',
                name: 'Crna na Koroškem',
            },
            {
                code: 'SI-017',
                name: 'Crnomelj',
            },
            {
                code: 'SI-018',
                name: 'Destrnik',
            },
            {
                code: 'SI-019',
                name: 'Divaca',
            },
            {
                code: 'SI-154',
                name: 'Dobje',
            },
            {
                code: 'SI-020',
                name: 'Dobrepolje',
            },
            {
                code: 'SI-155',
                name: 'Dobrna',
            },
            {
                code: 'SI-021',
                name: 'Dobrova-Polhov Gradec',
            },
            {
                code: 'SI-156',
                name: 'Dobrovnik/Dobronak',
            },
            {
                code: 'SI-022',
                name: 'Dol pri Ljubljani',
            },
            {
                code: 'SI-157',
                name: 'Dolenjske Toplice',
            },
            {
                code: 'SI-023',
                name: 'Domžale',
            },
            {
                code: 'SI-024',
                name: 'Dornava',
            },
            {
                code: 'SI-025',
                name: 'Dravograd',
            },
            {
                code: 'SI-026',
                name: 'Duplek',
            },
            {
                code: 'SI-027',
                name: 'Gorenja vas-Poljane',
            },
            {
                code: 'SI-028',
                name: 'Gorišnica',
            },
            {
                code: 'SI-207',
                name: 'Gorje',
            },
            {
                code: 'SI-029',
                name: 'Gornja Radgona',
            },
            {
                code: 'SI-030',
                name: 'Gornji Grad',
            },
            {
                code: 'SI-031',
                name: 'Gornji Petrovci',
            },
            {
                code: 'SI-158',
                name: 'Grad',
            },
            {
                code: 'SI-032',
                name: 'Grosuplje',
            },
            {
                code: 'SI-159',
                name: 'Hajdina',
            },
            {
                code: 'SI-160',
                name: 'Hoce-Slivnica',
            },
            {
                code: 'SI-161',
                name: 'Hodoš/Hodos',
            },
            {
                code: 'SI-162',
                name: 'Horjul',
            },
            {
                code: 'SI-034',
                name: 'Hrastnik',
            },
            {
                code: 'SI-035',
                name: 'Hrpelje-Kozina',
            },
            {
                code: 'SI-036',
                name: 'Idrija',
            },
            {
                code: 'SI-037',
                name: 'Ig',
            },
            {
                code: 'SI-038',
                name: 'Ilirska Bistrica',
            },
            {
                code: 'SI-039',
                name: 'Ivancna Gorica',
            },
            {
                code: 'SI-040',
                name: 'Izola/Isola',
            },
            {
                code: 'SI-041',
                name: 'Jesenice',
            },
            {
                code: 'SI-163',
                name: 'Jezersko',
            },
            {
                code: 'SI-042',
                name: 'Juršinci',
            },
            {
                code: 'SI-043',
                name: 'Kamnik',
            },
            {
                code: 'SI-044',
                name: 'Kanal',
            },
            {
                code: 'SI-045',
                name: 'Kidricevo',
            },
            {
                code: 'SI-046',
                name: 'Kobarid',
            },
            {
                code: 'SI-047',
                name: 'Kobilje',
            },
            {
                code: 'SI-048',
                name: 'Kocevje',
            },
            {
                code: 'SI-049',
                name: 'Komen',
            },
            {
                code: 'SI-164',
                name: 'Komenda',
            },
            {
                code: 'SI-050',
                name: 'Koper/Capodistria',
            },
            {
                code: 'SI-196',
                name: 'Kosanjevica na Krki',
            },
            {
                code: 'SI-165',
                name: 'Kostel',
            },
            {
                code: 'SI-051',
                name: 'Kozje',
            },
            {
                code: 'SI-052',
                name: 'Kranj',
            },
            {
                code: 'SI-053',
                name: 'Kranjska Gora',
            },
            {
                code: 'SI-166',
                name: 'Križevci',
            },
            {
                code: 'SI-054',
                name: 'Krško',
            },
            {
                code: 'SI-055',
                name: 'Kungota',
            },
            {
                code: 'SI-056',
                name: 'Kuzma',
            },
            {
                code: 'SI-057',
                name: 'Laško',
            },
            {
                code: 'SI-058',
                name: 'Lenart',
            },
            {
                code: 'SI-059',
                name: 'Lendava/Lendva',
            },
            {
                code: 'SI-060',
                name: 'Litija',
            },
            {
                code: 'SI-061',
                name: 'Ljubljana',
            },
            {
                code: 'SI-062',
                name: 'Ljubno',
            },
            {
                code: 'SI-063',
                name: 'Ljutomer',
            },
            {
                code: 'SI-208',
                name: 'Log-Dragomer',
            },
            {
                code: 'SI-064',
                name: 'Logatec',
            },
            {
                code: 'SI-065',
                name: 'Loška dolina',
            },
            {
                code: 'SI-066',
                name: 'Loški Potok',
            },
            {
                code: 'SI-167',
                name: 'Lovrenc na Pohorju',
            },
            {
                code: 'SI-067',
                name: 'Luce',
            },
            {
                code: 'SI-068',
                name: 'Lukovica',
            },
            {
                code: 'SI-069',
                name: 'Majšperk',
            },
            {
                code: 'SI-198',
                name: 'Makole',
            },
            {
                code: 'SI-070',
                name: 'Maribor',
            },
            {
                code: 'SI-168',
                name: 'Markovci',
            },
            {
                code: 'SI-071',
                name: 'Medvode',
            },
            {
                code: 'SI-072',
                name: 'Mengeš',
            },
            {
                code: 'SI-073',
                name: 'Metlika',
            },
            {
                code: 'SI-074',
                name: 'Mežica',
            },
            {
                code: 'SI-169',
                name: 'Miklavž na Dravskem polju',
            },
            {
                code: 'SI-075',
                name: 'Miren-Kostanjevica',
            },
            {
                code: 'SI-170',
                name: 'Mirna Pec',
            },
            {
                code: 'SI-076',
                name: 'Mislinja',
            },
            {
                code: 'SI-199',
                name: 'Mokronog-Trebelno',
            },
            {
                code: 'SI-077',
                name: 'Moravce',
            },
            {
                code: 'SI-078',
                name: 'Moravske Toplice',
            },
            {
                code: 'SI-079',
                name: 'Mozirje',
            },
            {
                code: 'SI-080',
                name: 'Murska Sobota',
            },
            {
                code: 'SI-081',
                name: 'Muta',
            },
            {
                code: 'SI-082',
                name: 'Naklo',
            },
            {
                code: 'SI-083',
                name: 'Nazarje',
            },
            {
                code: 'SI-084',
                name: 'Nova Gorica',
            },
            {
                code: 'SI-085',
                name: 'Novo mesto',
            },
            {
                code: 'SI-086',
                name: 'Odranci',
            },
            {
                code: 'SI-171',
                name: 'Oplotnica',
            },
            {
                code: 'SI-087',
                name: 'Ormož',
            },
            {
                code: 'SI-088',
                name: 'Osilnica',
            },
            {
                code: 'SI-089',
                name: 'Pesnica',
            },
            {
                code: 'SI-090',
                name: 'Piran/Pirano',
            },
            {
                code: 'SI-091',
                name: 'Pivka',
            },
            {
                code: 'SI-092',
                name: 'Podcetrtek',
            },
            {
                code: 'SI-172',
                name: 'Podlehnik',
            },
            {
                code: 'SI-093',
                name: 'Podvelka',
            },
            {
                code: 'SI-200',
                name: 'Poljcane',
            },
            {
                code: 'SI-173',
                name: 'Polzela',
            },
            {
                code: 'SI-094',
                name: 'Postojna',
            },
            {
                code: 'SI-174',
                name: 'Prebold',
            },
            {
                code: 'SI-095',
                name: 'Preddvor',
            },
            {
                code: 'SI-175',
                name: 'Prevalje',
            },
            {
                code: 'SI-096',
                name: 'Ptuj',
            },
            {
                code: 'SI-097',
                name: 'Puconci',
            },
            {
                code: 'SI-098',
                name: 'Race-Fram',
            },
            {
                code: 'SI-099',
                name: 'Radece',
            },
            {
                code: 'SI-100',
                name: 'Radenci',
            },
            {
                code: 'SI-101',
                name: 'Radlje ob Dravi',
            },
            {
                code: 'SI-102',
                name: 'Radovljica',
            },
            {
                code: 'SI-103',
                name: 'Ravne na Koroškem',
            },
            {
                code: 'SI-176',
                name: 'Razkrižje',
            },
            {
                code: 'SI-209',
                name: 'Recica ob Savinji',
            },
            {
                code: 'SI-201',
                name: 'Rence-Vogrsko',
            },
            {
                code: 'SI-177',
                name: 'Ribnica na Pohorju',
            },
            {
                code: 'SI-104',
                name: 'Ribnica',
            },
            {
                code: 'SI-106',
                name: 'Rogaška Slatina',
            },
            {
                code: 'SI-105',
                name: 'Rogašovci',
            },
            {
                code: 'SI-107',
                name: 'Rogatec',
            },
            {
                code: 'SI-108',
                name: 'Ruše',
            },
            {
                code: 'SI-033',
                name: 'Šalovci',
            },
            {
                code: 'SI-178',
                name: 'Selnica ob Dravi',
            },
            {
                code: 'SI-109',
                name: 'Semic',
            },
            {
                code: 'SI-183',
                name: 'Šempeter-Vrtojba',
            },
            {
                code: 'SI-117',
                name: 'Šencur',
            },
            {
                code: 'SI-118',
                name: 'Šentilj',
            },
            {
                code: 'SI-119',
                name: 'Šentjernej',
            },
            {
                code: 'SI-120',
                name: 'Šentjur pri Celju',
            },
            {
                code: 'SI-211',
                name: 'Šentrupert',
            },
            {
                code: 'SI-110',
                name: 'Sevnica',
            },
            {
                code: 'SI-111',
                name: 'Sežana',
            },
            {
                code: 'SI-121',
                name: 'Škocjan',
            },
            {
                code: 'SI-122',
                name: 'Škofja Loka',
            },
            {
                code: 'SI-123',
                name: 'Škofljica',
            },
            {
                code: 'SI-112',
                name: 'Slovenj Gradec',
            },
            {
                code: 'SI-113',
                name: 'Slovenska Bistrica',
            },
            {
                code: 'SI-114',
                name: 'Slovenske Konjice',
            },
            {
                code: 'SI-124',
                name: 'Šmarje pri Jelšah',
            },
            {
                code: 'SI-206',
                name: 'Šmarješke Toplice',
            },
            {
                code: 'SI-125',
                name: 'Šmartno ob Paki',
            },
            {
                code: 'SI-194',
                name: 'Šmartno pri Litiji',
            },
            {
                code: 'SI-194',
                name: 'Šmartno pri Litiji',
            },
            {
                code: 'SI-179',
                name: 'Sodražica',
            },
            {
                code: 'SI-180',
                name: 'Solcava',
            },
            {
                code: 'SI-126',
                name: 'Šoštanj',
            },
            {
                code: 'SI-202',
                name: 'Središce ob Dravi',
            },
            {
                code: 'SI-115',
                name: 'Starše',
            },
            {
                code: 'SI-127',
                name: 'Štore',
            },
            {
                code: 'SI-203',
                name: 'Straža',
            },
            {
                code: 'SI-181',
                name: 'Sveta Ana',
            },
            {
                code: 'SI-204',
                name: 'Sveta Trojica v Slovenskih Goricah',
            },
            {
                code: 'SI-182',
                name: 'Sveti Andraž v Slovenskih goricah',
            },
            {
                code: 'SI-116',
                name: 'Sveti Jurij',
            },
            {
                code: 'SI-210',
                name: 'Sveti Jurij v Slovenskih Goricah',
            },
            {
                code: 'SI-205',
                name: 'Sveti Tomaž',
            },
            {
                code: 'SI-184',
                name: 'Tabor',
            },
            {
                code: 'SI-010',
                name: 'Tišina',
            },
            {
                code: 'SI-128',
                name: 'Tolmin',
            },
            {
                code: 'SI-129',
                name: 'Trbovlje',
            },
            {
                code: 'SI-130',
                name: 'Trebnje',
            },
            {
                code: 'SI-185',
                name: 'Trnovska vas',
            },
            {
                code: 'SI-131',
                name: 'Tržic',
            },
            {
                code: 'SI-186',
                name: 'Trzin',
            },
            {
                code: 'SI-132',
                name: 'Turnišce',
            },
            {
                code: 'SI-133',
                name: 'Velenje',
            },
            {
                code: 'SI-187',
                name: 'Velika Polana',
            },
            {
                code: 'SI-134',
                name: 'Velike Lašce',
            },
            {
                code: 'SI-188',
                name: 'Veržej',
            },
            {
                code: 'SI-135',
                name: 'Videm',
            },
            {
                code: 'SI-136',
                name: 'Vipava',
            },
            {
                code: 'SI-137',
                name: 'Vitanje',
            },
            {
                code: 'SI-138',
                name: 'Vodice',
            },
            {
                code: 'SI-139',
                name: 'Vojnik',
            },
            {
                code: 'SI-189',
                name: 'Vransko',
            },
            {
                code: 'SI-140',
                name: 'Vrhnika',
            },
            {
                code: 'SI-141',
                name: 'Vuzenica',
            },
            {
                code: 'SI-142',
                name: 'Zagorje ob Savi',
            },
            {
                code: 'SI-190',
                name: 'Žalec',
            },
            {
                code: 'SI-143',
                name: 'Zavrc',
            },
            {
                code: 'SI-146',
                name: 'Železniki',
            },
            {
                code: 'SI-191',
                name: 'Žetale',
            },
            {
                code: 'SI-147',
                name: 'Žiri',
            },
            {
                code: 'SI-192',
                name: 'Žirovnica',
            },
            {
                code: 'SI-144',
                name: 'Zrece',
            },
            {
                code: 'SI-193',
                name: 'Žužemberk',
            },
        ],
    },
    {
        code: 'SB',
        id: 2336,
        name: 'Solomon Islands',
        states: [],
    },
    {
        code: 'SO',
        id: 2337,
        name: 'Somalia',
        states: [
            {
                code: 'SO21',
                name: 'Awdal',
            },
            {
                code: 'SO01',
                name: 'Bakool',
            },
            {
                code: 'SO02',
                name: 'Banaadir',
            },
            {
                code: 'SO03',
                name: 'Bari',
            },
            {
                code: 'SO04',
                name: 'Bay',
            },
            {
                code: 'SO05',
                name: 'Galguduud',
            },
            {
                code: 'SO06',
                name: 'Gedo',
            },
            {
                code: 'SO07',
                name: 'Hiiraan',
            },
            {
                code: 'SO08',
                name: 'Jubbada Dhexe',
            },
            {
                code: 'SO09',
                name: 'Jubbada Hoose',
            },
            {
                code: 'SO10',
                name: 'Mudug',
            },
            {
                code: 'SO18',
                name: 'Nugaal',
            },
            {
                code: 'SO12',
                name: 'Sanaag',
            },
            {
                code: 'SO13',
                name: 'Shabeellaha Dhexe',
            },
            {
                code: 'SO14',
                name: 'Shabeellaha Hoose',
            },
            {
                code: 'SO22',
                name: 'Sool',
            },
            {
                code: 'SO19',
                name: 'Togdheer',
            },
            {
                code: 'SO20',
                name: 'Woqooyi Galbeed',
            },
        ],
    },
    {
        code: 'ZA',
        id: 2338,
        name: 'South Africa',
        states: [
            {
                code: 'SF01',
                name: 'Cape Province',
            },
            {
                code: 'SF05',
                name: 'Eastern Cape',
            },
            {
                code: 'SF03',
                name: 'Free State',
            },
            {
                code: 'SF06',
                name: 'Gauteng',
            },
            {
                code: 'SF02',
                name: 'KwaZulu-Natal',
            },
            {
                code: 'SF09',
                name: 'Limpopo',
            },
            {
                code: 'SF07',
                name: 'Mpumalanga',
            },
            {
                code: 'SF10',
                name: 'North-West',
            },
            {
                code: 'SF08',
                name: 'Northern Cape',
            },
            {
                code: 'SF04',
                name: 'Transvaal',
            },
            {
                code: 'SF11',
                name: 'Western Cape',
            },
        ],
    },
    {
        code: 'GS',
        id: 2436,
        name: 'South Georgia and the South Sandwich Islands',
        states: [],
    },
    {
        code: 'SS',
        id: 2447,
        name: 'South Sudan',
        states: [
            {
                code: 'OD01',
                name: 'Central Equatoria',
            },
            {
                code: 'OD02',
                name: 'East Equatoria',
            },
            {
                code: 'OD03',
                name: 'Jungoli',
            },
            {
                code: 'OD04',
                name: 'Lakes',
            },
            {
                code: 'OD05',
                name: 'North Bahr-al-Ghazal',
            },
            {
                code: 'OD06',
                name: 'Unity',
            },
            {
                code: 'OD07',
                name: 'Upper Nile',
            },
            {
                code: 'OD08',
                name: 'Warap',
            },
            {
                code: 'OD09',
                name: 'West Bahr-al-Ghazal',
            },
            {
                code: 'OD10',
                name: 'West Equatoria',
            },
        ],
    },
    {
        code: 'ES',
        id: 2339,
        name: 'Spain',
        states: [
            {
                code: 'SP23',
                name: 'A Coruña',
            },
            {
                code: 'SP01',
                name: 'Alava',
            },
            {
                code: 'SP02',
                name: 'Albacete',
            },
            {
                code: 'SP03',
                name: 'Alicante',
            },
            {
                code: 'SP04',
                name: 'Almeria',
            },
            {
                code: 'SP51',
                name: 'Andalucia',
            },
            {
                code: 'SP52',
                name: 'Aragon',
            },
            {
                code: 'SP34',
                name: 'Asturias',
            },
            {
                code: 'SP05',
                name: 'Avila',
            },
            {
                code: 'SP06',
                name: 'Badajoz',
            },
            {
                code: 'SP08',
                name: 'Barcelona',
            },
            {
                code: 'SP09',
                name: 'Burgos',
            },
            {
                code: 'SP10',
                name: 'Caceres',
            },
            {
                code: 'SP11',
                name: 'Cadiz',
            },
            {
                code: 'SP53',
                name: 'Canarias',
            },
            {
                code: 'SP39',
                name: 'Cantabria',
            },
            {
                code: 'SP12',
                name: 'Castellon',
            },
            {
                code: 'SP55',
                name: 'Castilla y Leon',
            },
            {
                code: 'SP54',
                name: 'Castilla-La Mancha',
            },
            {
                code: 'SP56',
                name: 'Cataluna',
            },
            {
                code: 'SP13',
                name: 'Ciudad Real',
            },
            {
                code: 'SP14',
                name: 'Cordoba',
            },
            {
                code: 'SP15',
                name: 'Cuenca',
            },
            {
                code: 'SP57',
                name: 'Extremadura',
            },
            {
                code: 'SP58',
                name: 'Galicia',
            },
            {
                code: 'SP16',
                name: 'Gerona',
            },
            {
                code: 'SP17',
                name: 'Granada',
            },
            {
                code: 'SP18',
                name: 'Guadalajara',
            },
            {
                code: 'SP19',
                name: 'Guipuzcoa',
            },
            {
                code: 'SP20',
                name: 'Huelva',
            },
            {
                code: 'SP21',
                name: 'Huesca',
            },
            {
                code: 'SP07',
                name: 'Islas Baleares',
            },
            {
                code: 'SP22',
                name: 'Jaen',
            },
            {
                code: 'SP23',
                name: 'La Coruna',
            },
            {
                code: 'SP27',
                name: 'La Rioja',
            },
            {
                code: 'SP24',
                name: 'Las Palmas',
            },
            {
                code: 'SP25',
                name: 'Leon',
            },
            {
                code: 'SP26',
                name: 'Lerida',
            },
            {
                code: 'SP28',
                name: 'Lugo',
            },
            {
                code: 'SP29',
                name: 'Madrid',
            },
            {
                code: 'SP30',
                name: 'Malaga',
            },
            {
                code: 'SP31',
                name: 'Murcia',
            },
            {
                code: 'SP32',
                name: 'Navarra',
            },
            {
                code: 'SP33',
                name: 'Orense',
            },
            {
                code: 'SP59',
                name: 'Pais Vasco',
            },
            {
                code: 'SP35',
                name: 'Palencia',
            },
            {
                code: 'SP36',
                name: 'Pontevedra',
            },
            {
                code: 'SP37',
                name: 'Salamanca',
            },
            {
                code: 'SP38',
                name: 'Santa Cruz de Tenerife',
            },
            {
                code: 'SP40',
                name: 'Segovia',
            },
            {
                code: 'SP41',
                name: 'Sevilla',
            },
            {
                code: 'SP42',
                name: 'Soria',
            },
            {
                code: 'SP43',
                name: 'Tarragona',
            },
            {
                code: 'SP44',
                name: 'Teruel',
            },
            {
                code: 'SP45',
                name: 'Toledo',
            },
            {
                code: 'SP46',
                name: 'Valencia',
            },
            {
                code: 'SP60',
                name: 'Valenciana',
            },
            {
                code: 'SP47',
                name: 'Valladolid',
            },
            {
                code: 'SP48',
                name: 'Vizcaya',
            },
            {
                code: 'SP49',
                name: 'Zamora',
            },
            {
                code: 'SP50',
                name: 'Zaragoza',
            },
        ],
    },
    {
        code: 'LK',
        id: 2340,
        name: 'Sri Lanka',
        states: [],
    },
    {
        code: 'SD',
        id: 2341,
        name: 'Sudan',
        states: [
            {
                code: 'SU42',
                name: 'Blue Nile',
            },
            {
                code: 'SU61',
                name: 'Central Darfur',
            },
            {
                code: 'SU60',
                name: 'East Darfur',
            },
            {
                code: 'SU39',
                name: 'Gedarif',
            },
            {
                code: 'SU38',
                name: 'Gezira',
            },
            {
                code: 'SU52',
                name: 'Kassala',
            },
            {
                code: 'SU29',
                name: 'Khartoum',
            },
            {
                code: 'SU55',
                name: 'North Darfur',
            },
            {
                code: 'SU56',
                name: 'North Kordofan',
            },
            {
                code: 'SU43',
                name: 'Northern',
            },
            {
                code: 'SU36',
                name: 'Red Sea',
            },
            {
                code: 'SU53',
                name: 'River Nile',
            },
            {
                code: 'SU58',
                name: 'Sennar',
            },
            {
                code: 'SU49',
                name: 'South Darfur',
            },
            {
                code: 'SU50',
                name: 'South Kordofan',
            },
            {
                code: 'SU47',
                name: 'West Darfur',
            },
            {
                code: 'SU62',
                name: 'West Kordofan',
            },
            {
                code: 'SU41',
                name: 'White Nile',
            },
        ],
    },
    {
        code: 'SR',
        id: 2342,
        name: 'Suriname',
        states: [
            {
                code: 'NS10',
                name: 'Brokopondo',
            },
            {
                code: 'NS11',
                name: 'Commewijne',
            },
            {
                code: 'NS12',
                name: 'Coronie',
            },
            {
                code: 'NS13',
                name: 'Marowijne',
            },
            {
                code: 'NS14',
                name: 'Nickerie',
            },
            {
                code: 'NS16',
                name: 'Paramaribo',
            },
            {
                code: 'NS15',
                name: 'Para',
            },
            {
                code: 'NS17',
                name: 'Saramacca',
            },
            {
                code: 'NS18',
                name: 'Sipaliwini',
            },
            {
                code: 'NS19',
                name: 'Wanica',
            },
        ],
    },
    {
        code: 'SJ',
        id: 2437,
        name: 'Svalbard And Jan Mayen',
        states: [],
    },
    {
        code: 'SZ',
        id: 2343,
        name: 'Swaziland',
        states: [
            {
                code: 'WZ01',
                name: 'Hhohho',
            },
            {
                code: 'WZ02',
                name: 'Lubombo',
            },
            {
                code: 'WZ03',
                name: 'Manzini',
            },
            {
                code: 'WZ04',
                name: 'Shiselweni',
            },
        ],
    },
    {
        code: 'SE',
        id: 2344,
        name: 'Sweden',
        states: [
            {
                code: 'SE-K',
                name: 'Blekinge län',
            },
            {
                code: 'SE-W',
                name: 'Dalarnas län',
            },
            {
                code: 'SE-X',
                name: 'Gävleborgs län',
            },
            {
                code: 'SE-I',
                name: 'Gotlands län',
            },
            {
                code: 'SE-N',
                name: 'Hallands län',
            },
            {
                code: 'SE-Z',
                name: 'Jämtlands län',
            },
            {
                code: 'SE-F',
                name: 'Jönköpings län',
            },
            {
                code: 'SE-H',
                name: 'Kalmar län',
            },
            {
                code: 'SE-G',
                name: 'Kronobergs län',
            },
            {
                code: 'SE-BD',
                name: 'Norrbottens län',
            },
            {
                code: 'SE-M',
                name: 'Skåne län',
            },
            {
                code: 'SE-D',
                name: 'Södermanlands län',
            },
            {
                code: 'SE-AB',
                name: 'Stockholms län',
            },
            {
                code: 'SE-C',
                name: 'Uppsala län',
            },
            {
                code: 'SE-S',
                name: 'Värmlands län',
            },
            {
                code: 'SE-AC',
                name: 'Västerbottens län',
            },
            {
                code: 'SE-Y',
                name: 'Västernorrlands län',
            },
            {
                code: 'SE-U',
                name: 'Västmanlands län',
            },
            {
                code: 'SE-O',
                name: 'Västra Götalands län',
            },
            {
                code: 'SE-T',
                name: 'Örebro län',
            },
            {
                code: 'SE-E',
                name: 'Östergötlands län',
            },
        ],
    },
    {
        code: 'CH',
        id: 2345,
        name: 'Switzerland',
        states: [
            {
                code: 'AG',
                name: 'Aargau',
            },
            {
                code: 'AR',
                name: 'Appenzell Ausserrhoden',
            },
            {
                code: 'AI',
                name: 'Appenzell Innerrhoden',
            },
            {
                code: 'BL',
                name: 'Basel-Landschaft',
            },
            {
                code: 'BS',
                name: 'Basel-Stadt',
            },
            {
                code: 'BE',
                name: 'Bern',
            },
            {
                code: 'FR',
                name: 'Fribourg',
            },
            {
                code: 'GE',
                name: 'Genève',
            },
            {
                code: 'GL',
                name: 'Glarus',
            },
            {
                code: 'GR',
                name: 'Graubünden',
            },
            {
                code: 'JU',
                name: 'Jura',
            },
            {
                code: 'LU',
                name: 'Luzern',
            },
            {
                code: 'NE',
                name: 'Neuchâtel',
            },
            {
                code: 'NW',
                name: 'Nidwalden',
            },
            {
                code: 'OW',
                name: 'Obwalden',
            },
            {
                code: 'SG',
                name: 'Sankt Gallen',
            },
            {
                code: 'SH',
                name: 'Schaffhausen',
            },
            {
                code: 'SZ',
                name: 'Schwyz',
            },
            {
                code: 'SO',
                name: 'Solothurn',
            },
            {
                code: 'TG',
                name: 'Thurgau',
            },
            {
                code: 'TI',
                name: 'Ticino',
            },
            {
                code: 'UR',
                name: 'Uri',
            },
            {
                code: 'VS',
                name: 'Valais',
            },
            {
                code: 'VD',
                name: 'Vaud',
            },
            {
                code: 'ZG',
                name: 'Zug',
            },
            {
                code: 'ZH',
                name: 'Zürich',
            },
        ],
    },
    {
        code: 'SY',
        id: 2381,
        name: 'Syrian Arab Republic',
        states: [
            {
                code: 'SY01',
                name: 'Al Hasakah',
            },
            {
                code: 'SY09',
                name: 'Aleppo',
            },
            {
                code: 'SY04',
                name: 'Ar Raqqah',
            },
            {
                code: 'SY05',
                name: "As Suwayda'",
            },
            {
                code: 'SY13',
                name: 'Damascus',
            },
            {
                code: 'SY06',
                name: 'Dar`a',
            },
            {
                code: 'SY07',
                name: 'Dayr az Zawr',
            },
            {
                code: 'SY10',
                name: 'Hama',
            },
            {
                code: 'SY11',
                name: 'Hims',
            },
            {
                code: 'SY12',
                name: 'Idlib',
            },
            {
                code: 'SY02',
                name: 'Latakia',
            },
            {
                code: 'SY03',
                name: 'Quneitra',
            },
            {
                code: 'SY08',
                name: 'Rif Dimashq',
            },
            {
                code: 'SY14',
                name: 'Tartus',
            },
        ],
    },
    {
        code: 'TW',
        id: 2375,
        name: 'Taiwan',
        states: [
            {
                code: 'TW02',
                name: 'Kaohsiung',
            },
            {
                code: 'TW03',
                name: 'Taipei',
            },
        ],
    },
    {
        code: 'TJ',
        id: 2348,
        name: 'Tajikistan',
        states: [
            {
                code: 'TI01',
                name: 'Badakhshoni Kuni',
            },
            {
                code: 'TI04',
                name: 'Dushanbe',
            },
            {
                code: 'TI02',
                name: 'Khatlon',
            },
            {
                code: 'TI05',
                name: 'Regions of Republican Subordination',
            },
            {
                code: 'TI03',
                name: 'Sogd',
            },
        ],
    },
    {
        code: 'TZ',
        id: 2349,
        name: 'Tanzania',
        states: [
            {
                code: 'TZ26',
                name: 'Arusha',
            },
            {
                code: 'TZ23',
                name: 'Dar es Salaam',
            },
            {
                code: 'TZ03',
                name: 'Dodoma',
            },
            {
                code: 'TZ28',
                name: 'Geita',
            },
            {
                code: 'TZ04',
                name: 'Iringa',
            },
            {
                code: 'TZ19',
                name: 'Kagera',
            },
            {
                code: 'TZ29',
                name: 'Katavi',
            },
            {
                code: 'TZ05',
                name: 'Kigoma',
            },
            {
                code: 'TZ06',
                name: 'Kilimanjaro',
            },
            {
                code: 'TZ07',
                name: 'Lindi',
            },
            {
                code: 'TZ27',
                name: 'Manyara',
            },
            {
                code: 'TZ08',
                name: 'Mara',
            },
            {
                code: 'TZ09',
                name: 'Mbeya',
            },
            {
                code: 'TZ10',
                name: 'Morogoro',
            },
            {
                code: 'TZ11',
                name: 'Mtwara',
            },
            {
                code: 'TZ12',
                name: 'Mwanza',
            },
            {
                code: 'TZ30',
                name: 'Njombe',
            },
            {
                code: 'TZ13',
                name: 'Pemba North',
            },
            {
                code: 'TZ20',
                name: 'Pemba South',
            },
            {
                code: 'TZ02',
                name: 'Pwani',
            },
            {
                code: 'TZ24',
                name: 'Rukwa',
            },
            {
                code: 'TZ14',
                name: 'Ruvuma',
            },
            {
                code: 'TZ15',
                name: 'Shinyanga',
            },
            {
                code: 'TZ31',
                name: 'Simiyu',
            },
            {
                code: 'TZ16',
                name: 'Singida',
            },
            {
                code: 'TZ17',
                name: 'Tabora',
            },
            {
                code: 'TZ18',
                name: 'Tanga',
            },
            {
                code: 'TZ22',
                name: 'Zanzibar North',
            },
            {
                code: 'TZ21',
                name: 'Zanzibar South and Central',
            },
            {
                code: 'TZ25',
                name: 'Zanzibar West',
            },
        ],
    },
    {
        code: 'TH',
        id: 2350,
        name: 'Thailand',
        states: [
            {
                code: 'TH77',
                name: 'Amnat Charoen',
            },
            {
                code: 'TH35',
                name: 'Ang Thong',
            },
            {
                code: 'TH40',
                name: 'Bangkok Metropolis',
            },
            {
                code: 'TH81',
                name: 'Bueng Kan',
            },
            {
                code: 'TH28',
                name: 'Buri Ram',
            },
            {
                code: 'TH44',
                name: 'Chachoengsao',
            },
            {
                code: 'TH32',
                name: 'Chai Nat',
            },
            {
                code: 'TH26',
                name: 'Chaiyaphum',
            },
            {
                code: 'TH48',
                name: 'Chanthaburi',
            },
            {
                code: 'TH02',
                name: 'Chiang Mai',
            },
            {
                code: 'TH03',
                name: 'Chiang Rai',
            },
            {
                code: 'TH46',
                name: 'Chon Buri',
            },
            {
                code: 'TH58',
                name: 'Chumphon',
            },
            {
                code: 'TH23',
                name: 'Kalasin',
            },
            {
                code: 'TH11',
                name: 'Kamphaeng Phet',
            },
            {
                code: 'TH50',
                name: 'Kanchanaburi',
            },
            {
                code: 'TH22',
                name: 'Khon Kaen',
            },
            {
                code: 'TH63',
                name: 'Krabi',
            },
            {
                code: 'TH06',
                name: 'Lampang',
            },
            {
                code: 'TH05',
                name: 'Lamphun',
            },
            {
                code: 'TH18',
                name: 'Loei',
            },
            {
                code: 'TH34',
                name: 'Lop Buri',
            },
            {
                code: 'TH01',
                name: 'Mae Hong Son',
            },
            {
                code: 'TH24',
                name: 'Maha Sarakham',
            },
            {
                code: 'TH78',
                name: 'Mukdahan',
            },
            {
                code: 'TH43',
                name: 'Nakhon Nayok',
            },
            {
                code: 'TH53',
                name: 'Nakhon Pathom',
            },
            {
                code: 'TH73',
                name: 'Nakhon Phanom',
            },
            {
                code: 'TH27',
                name: 'Nakhon Ratchasima',
            },
            {
                code: 'TH16',
                name: 'Nakhon Sawan',
            },
            {
                code: 'TH64',
                name: 'Nakhon Si Thammarat',
            },
            {
                code: 'TH04',
                name: 'Nan',
            },
            {
                code: 'TH31',
                name: 'Narathiwat',
            },
            {
                code: 'TH79',
                name: 'Nong Bua Lam Phu',
            },
            {
                code: 'TH17',
                name: 'Nong Khai',
            },
            {
                code: 'TH38',
                name: 'Nonthaburi',
            },
            {
                code: 'TH39',
                name: 'Pathum Thani',
            },
            {
                code: 'TH69',
                name: 'Pattani',
            },
            {
                code: 'TH61',
                name: 'Phangnga',
            },
            {
                code: 'TH66',
                name: 'Phatthalung',
            },
            {
                code: 'TH41',
                name: 'Phayao',
            },
            {
                code: 'TH14',
                name: 'Phetchabun',
            },
            {
                code: 'TH56',
                name: 'Phetchaburi',
            },
            {
                code: 'TH13',
                name: 'Phichit',
            },
            {
                code: 'TH12',
                name: 'Phitsanulok',
            },
            {
                code: 'TH36',
                name: 'Phra Nakhon Si Ayutthaya',
            },
            {
                code: 'TH07',
                name: 'Phrae',
            },
            {
                code: 'TH62',
                name: 'Phuket',
            },
            {
                code: 'TH74',
                name: 'Prachin Buri',
            },
            {
                code: 'TH57',
                name: 'Prachuap Khiri Khan',
            },
            {
                code: 'TH59',
                name: 'Ranong',
            },
            {
                code: 'TH52',
                name: 'Ratchaburi',
            },
            {
                code: 'TH47',
                name: 'Rayong',
            },
            {
                code: 'TH25',
                name: 'Roi Et',
            },
            {
                code: 'TH80',
                name: 'Sa Kaeo',
            },
            {
                code: 'TH20',
                name: 'Sakon Nakhon',
            },
            {
                code: 'TH42',
                name: 'Samut Prakan',
            },
            {
                code: 'TH55',
                name: 'Samut Sakhon',
            },
            {
                code: 'TH54',
                name: 'Samut Songkhram',
            },
            {
                code: 'TH37',
                name: 'Saraburi',
            },
            {
                code: 'TH67',
                name: 'Satun',
            },
            {
                code: 'TH30',
                name: 'Si Sa Ket',
            },
            {
                code: 'TH33',
                name: 'Sing Buri',
            },
            {
                code: 'TH68',
                name: 'Songkhla',
            },
            {
                code: 'TH09',
                name: 'Sukhothai',
            },
            {
                code: 'TH51',
                name: 'Suphan Buri',
            },
            {
                code: 'TH60',
                name: 'Surat Thani',
            },
            {
                code: 'TH29',
                name: 'Surin',
            },
            {
                code: 'TH08',
                name: 'Tak',
            },
            {
                code: 'TH65',
                name: 'Trang',
            },
            {
                code: 'TH49',
                name: 'Trat',
            },
            {
                code: 'TH75',
                name: 'Ubon Ratchathani',
            },
            {
                code: 'TH76',
                name: 'Udon Thani',
            },
            {
                code: 'TH15',
                name: 'Uthai Thani',
            },
            {
                code: 'TH10',
                name: 'Uttaradit',
            },
            {
                code: 'TH70',
                name: 'Yala',
            },
            {
                code: 'TH72',
                name: 'Yasothon',
            },
        ],
    },
    {
        code: 'TL',
        id: 2404,
        name: 'Timor-Leste',
        states: [],
    },
    {
        code: 'TG',
        id: 2351,
        name: 'Togo',
        states: [
            {
                code: 'TO22',
                name: 'Centrale',
            },
            {
                code: 'TO23',
                name: 'Kara',
            },
            {
                code: 'TO24',
                name: 'Maritime',
            },
            {
                code: 'TO25',
                name: 'Plateaux',
            },
            {
                code: 'TO26',
                name: 'Savanes',
            },
        ],
    },
    {
        code: 'TK',
        id: 2438,
        name: 'Tokelau',
        states: [],
    },
    {
        code: 'TO',
        id: 2405,
        name: 'Tonga',
        states: [],
    },
    {
        code: 'TT',
        id: 2352,
        name: 'Trinidad and Tobago',
        states: [
            {
                code: 'TD01',
                name: 'Arima',
            },
            {
                code: 'TD13',
                name: 'Chaguanas',
            },
            {
                code: 'TD14',
                name: 'Couva/Tabaquite/Talparo',
            },
            {
                code: 'TD15',
                name: 'Diego Martin',
            },
            {
                code: 'TD11',
                name: 'Eastern Tobago',
            },
            {
                code: 'TD16',
                name: 'Mayaro/Rio Claro',
            },
            {
                code: 'TD17',
                name: 'Penal/Debe',
            },
            {
                code: 'TD18',
                name: 'Point Fortin',
            },
            {
                code: 'TD05',
                name: 'Port of Spain',
            },
            {
                code: 'TD19',
                name: 'Princes Town',
            },
            {
                code: 'TD10',
                name: 'San Fernando',
            },
            {
                code: 'TD20',
                name: 'San Juan/Laventille',
            },
            {
                code: 'TD21',
                name: 'Sangre Grande',
            },
            {
                code: 'TD22',
                name: 'Siparia',
            },
            {
                code: 'TD23',
                name: 'Tunapuna/Piarco',
            },
            {
                code: 'TD11',
                name: 'Western Tobago',
            },
        ],
    },
    {
        code: 'TN',
        id: 2353,
        name: 'Tunisia',
        states: [
            {
                code: 'TS38',
                name: 'Ariana',
            },
            {
                code: 'TS17',
                name: 'Béja',
            },
            {
                code: 'TS27',
                name: 'Ben Arous',
            },
            {
                code: 'TS18',
                name: 'Bizerte',
            },
            {
                code: 'TS29',
                name: 'Gabès',
            },
            {
                code: 'TS30',
                name: 'Gafsa',
            },
            {
                code: 'TS06',
                name: 'Jendouba',
            },
            {
                code: 'TS03',
                name: 'Kairouan',
            },
            {
                code: 'TS02',
                name: 'Kassérine',
            },
            {
                code: 'TS31',
                name: 'Kebili',
            },
            {
                code: 'TS14',
                name: 'Le Kef',
            },
            {
                code: 'TS15',
                name: 'Mahdia',
            },
            {
                code: 'TS39',
                name: 'Manouba',
            },
            {
                code: 'TS28',
                name: 'Médenine',
            },
            {
                code: 'TS16',
                name: 'Monastir',
            },
            {
                code: 'TS19',
                name: 'Nabeul',
            },
            {
                code: 'TS32',
                name: 'Sfax',
            },
            {
                code: 'TS33',
                name: 'Sidi Bou Zid',
            },
            {
                code: 'TS22',
                name: 'Siliana',
            },
            {
                code: 'TS23',
                name: 'Sousse',
            },
            {
                code: 'TS34',
                name: 'Tataouine',
            },
            {
                code: 'TS35',
                name: 'Tozeur',
            },
            {
                code: 'TS36',
                name: 'Tunis',
            },
            {
                code: 'TS37',
                name: 'Zaghouan',
            },
        ],
    },
    {
        code: 'TR',
        id: 2354,
        name: 'Turkey',
        states: [
            {
                code: 'TU81',
                name: 'Adana',
            },
            {
                code: 'TU02',
                name: 'Adiyaman',
            },
            {
                code: 'TU03',
                name: 'Afyonkarahisar',
            },
            {
                code: 'TU04',
                name: 'Agri',
            },
            {
                code: 'TU75',
                name: 'Aksaray',
            },
            {
                code: 'TU05',
                name: 'Amasya',
            },
            {
                code: 'TU68',
                name: 'Ankara',
            },
            {
                code: 'TU07',
                name: 'Antalya',
            },
            {
                code: 'TU86',
                name: 'Ardahan',
            },
            {
                code: 'TU08',
                name: 'Artvin',
            },
            {
                code: 'TU09',
                name: 'Aydin',
            },
            {
                code: 'TU10',
                name: 'Balikesir',
            },
            {
                code: 'TU87',
                name: 'Bartin',
            },
            {
                code: 'TU76',
                name: 'Batman',
            },
            {
                code: 'TU77',
                name: 'Bayburt',
            },
            {
                code: 'TU11',
                name: 'Bilecik',
            },
            {
                code: 'TU12',
                name: 'Bingöl',
            },
            {
                code: 'TU13',
                name: 'Bitlis',
            },
            {
                code: 'TU14',
                name: 'Bolu',
            },
            {
                code: 'TU15',
                name: 'Burdur',
            },
            {
                code: 'TU16',
                name: 'Bursa',
            },
            {
                code: 'TU17',
                name: 'Çanakkale',
            },
            {
                code: 'TU82',
                name: 'Çankiri',
            },
            {
                code: 'TU19',
                name: 'Çorum',
            },
            {
                code: 'TU20',
                name: 'Denizli',
            },
            {
                code: 'TU21',
                name: 'Diyarbakir',
            },
            {
                code: 'TU93',
                name: 'Düzce',
            },
            {
                code: 'TU22',
                name: 'Edirne',
            },
            {
                code: 'TU23',
                name: 'Elazig',
            },
            {
                code: 'TU24',
                name: 'Erzincan',
            },
            {
                code: 'TU25',
                name: 'Erzurum',
            },
            {
                code: 'TU26',
                name: 'Eskisehir',
            },
            {
                code: 'TU83',
                name: 'Gaziantep',
            },
            {
                code: 'TU28',
                name: 'Giresun',
            },
            {
                code: 'TU69',
                name: 'Gümüshane',
            },
            {
                code: 'TU70',
                name: 'Hakkari',
            },
            {
                code: 'TU31',
                name: 'Hatay',
            },
            {
                code: 'TU88',
                name: 'Igdir',
            },
            {
                code: 'TU33',
                name: 'Isparta',
            },
            {
                code: 'TU34',
                name: 'Istanbul',
            },
            {
                code: 'TU35',
                name: 'Izmir',
            },
            {
                code: 'TU46',
                name: 'Kahramanmaras',
            },
            {
                code: 'TU89',
                name: 'Karabük',
            },
            {
                code: 'TU78',
                name: 'Karaman',
            },
            {
                code: 'TU84',
                name: 'Kars',
            },
            {
                code: 'TU37',
                name: 'Kastamonu',
            },
            {
                code: 'TU38',
                name: 'Kayseri',
            },
            {
                code: 'TU90',
                name: 'Kilis',
            },
            {
                code: 'TU79',
                name: 'Kirikkale',
            },
            {
                code: 'TU39',
                name: 'Kirklareli',
            },
            {
                code: 'TU40',
                name: 'Kirsehir',
            },
            {
                code: 'TU41',
                name: 'Kocaeli',
            },
            {
                code: 'TU71',
                name: 'Konya',
            },
            {
                code: 'TU43',
                name: 'Kütahya',
            },
            {
                code: 'TU44',
                name: 'Malatya',
            },
            {
                code: 'TU45',
                name: 'Manisa',
            },
            {
                code: 'TU72',
                name: 'Mardin',
            },
            {
                code: 'TU32',
                name: 'Mersin',
            },
            {
                code: 'TU48',
                name: 'Mugla',
            },
            {
                code: 'TU49',
                name: 'Mus',
            },
            {
                code: 'TU50',
                name: 'Nevsehir',
            },
            {
                code: 'TU73',
                name: 'Nigde',
            },
            {
                code: 'TU52',
                name: 'Ordu',
            },
            {
                code: 'TU91',
                name: 'Osmaniye',
            },
            {
                code: 'TU53',
                name: 'Rize',
            },
            {
                code: 'TU54',
                name: 'Sakarya',
            },
            {
                code: 'TU55',
                name: 'Samsun',
            },
            {
                code: 'TU63',
                name: 'Sanliurfa',
            },
            {
                code: 'TU74',
                name: 'Siirt',
            },
            {
                code: 'TU57',
                name: 'Sinop',
            },
            {
                code: 'TU80',
                name: 'Sirnak',
            },
            {
                code: 'TU58',
                name: 'Sivas',
            },
            {
                code: 'TU59',
                name: 'Tekirdag',
            },
            {
                code: 'TU60',
                name: 'Tokat',
            },
            {
                code: 'TU61',
                name: 'Trabzon',
            },
            {
                code: 'TU62',
                name: 'Tunceli',
            },
            {
                code: 'TU64',
                name: 'Usak',
            },
            {
                code: 'TU65',
                name: 'Van',
            },
            {
                code: 'TU92',
                name: 'Yalova',
            },
            {
                code: 'TU66',
                name: 'Yozgat',
            },
            {
                code: 'TU85',
                name: 'Zonguldak',
            },
        ],
    },
    {
        code: 'TM',
        id: 2355,
        name: 'Turkmenistan',
        states: [
            {
                code: 'TX01',
                name: 'Ahal',
            },
            {
                code: 'TM.AB',
                name: 'Ashgabat',
            },
            {
                code: 'TX02',
                name: 'Balkan',
            },
            {
                code: 'TX03',
                name: 'Dashoguz',
            },
            {
                code: 'TX04',
                name: 'Lebap',
            },
            {
                code: 'TX05',
                name: 'Mary',
            },
        ],
    },
    {
        code: 'TC',
        id: 2439,
        name: 'Turks and Caicos Islands',
        states: [],
    },
    {
        code: 'TV',
        id: 2440,
        name: 'Tuvalu',
        states: [],
    },
    {
        code: 'UG',
        id: 2356,
        name: 'Uganda',
        states: [
            {
                code: 'UG.AI',
                name: 'Abim',
            },
            {
                code: 'UG.AD',
                name: 'Adjumani',
            },
            {
                code: 'UG.AG',
                name: 'Agago',
            },
            {
                code: 'UG.AL',
                name: 'Alebtong',
            },
            {
                code: 'UG.AT',
                name: 'Amolatar',
            },
            {
                code: 'UG.AZ',
                name: 'Amudat',
            },
            {
                code: 'UG.AM',
                name: 'Amuria',
            },
            {
                code: 'UG.AY',
                name: 'Amuru',
            },
            {
                code: 'UG.AQ',
                name: 'Apac',
            },
            {
                code: 'UG.AX',
                name: 'Arua',
            },
            {
                code: 'UG.BD',
                name: 'Budaka',
            },
            {
                code: 'UG.BA',
                name: 'Bududa',
            },
            {
                code: 'UG.BI',
                name: 'Bugiri',
            },
            {
                code: 'UG.BH',
                name: 'Buhweju',
            },
            {
                code: 'UG.BZ',
                name: 'Buikwe',
            },
            {
                code: 'UG.BE',
                name: 'Bukedea',
            },
            {
                code: 'UG.BM',
                name: 'Bukomansimbi',
            },
            {
                code: 'UG.BW',
                name: 'Bukwo',
            },
            {
                code: 'UG.BB',
                name: 'Bulambuli',
            },
            {
                code: 'UG.BL',
                name: 'Buliisa',
            },
            {
                code: 'UG.BX',
                name: 'Bundibugyo',
            },
            {
                code: 'UG.BC',
                name: 'Bushenyi',
            },
            {
                code: 'UG.BU',
                name: 'Busia',
            },
            {
                code: 'UG.BJ',
                name: 'Butaleja',
            },
            {
                code: 'UG.BT',
                name: 'Butambala',
            },
            {
                code: 'UG.BV',
                name: 'Buvuma',
            },
            {
                code: 'UG.BY',
                name: 'Buyende',
            },
            {
                code: 'UG.DO',
                name: 'Dokolo',
            },
            {
                code: 'UG.GM',
                name: 'Gomba',
            },
            {
                code: 'UG.GL',
                name: 'Gulu',
            },
            {
                code: 'UG.HO',
                name: 'Hoima',
            },
            {
                code: 'UG.IB',
                name: 'Ibanda',
            },
            {
                code: 'UG.IC',
                name: 'Iganga',
            },
            {
                code: 'UG.NG',
                name: 'Isingiro',
            },
            {
                code: 'UG.JI',
                name: 'Jinja',
            },
            {
                code: 'UG.AB',
                name: 'Kaabong',
            },
            {
                code: 'UG.KA',
                name: 'Kabale',
            },
            {
                code: 'UG.BR',
                name: 'Kabarole',
            },
            {
                code: 'UG.KD',
                name: 'Kaberamaido',
            },
            {
                code: 'UG.KN',
                name: 'Kalangala',
            },
            {
                code: 'UG.RO',
                name: 'Kaliro',
            },
            {
                code: 'UG.QA',
                name: 'Kalungu',
            },
            {
                code: 'UG.KM',
                name: 'Kampala',
            },
            {
                code: 'UG.QU',
                name: 'Kamuli',
            },
            {
                code: 'UG.KE',
                name: 'Kamwenge',
            },
            {
                code: 'UG.UU',
                name: 'Kanungu',
            },
            {
                code: 'UG.QP',
                name: 'Kapchorwa',
            },
            {
                code: 'UG.KS',
                name: 'Kasese',
            },
            {
                code: 'UG.KK',
                name: 'Katakwi',
            },
            {
                code: 'UG.KY',
                name: 'Kayunga',
            },
            {
                code: 'UG.KI',
                name: 'Kibaale',
            },
            {
                code: 'UG.QO',
                name: 'Kiboga',
            },
            {
                code: 'UG.QB',
                name: 'Kibuku',
            },
            {
                code: 'UG.KH',
                name: 'Kiruhuura',
            },
            {
                code: 'UG.QD',
                name: 'Kiryandongo',
            },
            {
                code: 'UG.KR',
                name: 'Kisoro',
            },
            {
                code: 'UG.QT',
                name: 'Kitgum',
            },
            {
                code: 'UG.OK',
                name: 'Koboko',
            },
            {
                code: 'UG.QL',
                name: 'Kole',
            },
            {
                code: 'UG.KF',
                name: 'Kotido',
            },
            {
                code: 'UG.QM',
                name: 'Kumi',
            },
            {
                code: 'UG.QW',
                name: 'Kween',
            },
            {
                code: 'UG.QZ',
                name: 'Kyankwanzi',
            },
            {
                code: 'UG.QG',
                name: 'Kyegegwa',
            },
            {
                code: 'UG.QJ',
                name: 'Kyenjojo',
            },
            {
                code: 'UG.LM',
                name: 'Lamwo',
            },
            {
                code: 'UG.LL',
                name: 'Lira',
            },
            {
                code: 'UG.LK',
                name: 'Luuka',
            },
            {
                code: 'UG.LW',
                name: 'Luwero',
            },
            {
                code: 'UG.LE',
                name: 'Lwengo',
            },
            {
                code: 'UG.LY',
                name: 'Lyantonde',
            },
            {
                code: 'UG.MW',
                name: 'Manafwa',
            },
            {
                code: 'UG.MQ',
                name: 'Masaka',
            },
            {
                code: 'UG.MZ',
                name: 'Masindi',
            },
            {
                code: 'UG.MG',
                name: 'Mayuge',
            },
            {
                code: 'UG.ME',
                name: 'Mbale',
            },
            {
                code: 'UG.RR',
                name: 'Mbarara',
            },
            {
                code: 'UG.MM',
                name: 'Mitoma',
            },
            {
                code: 'UG.TY',
                name: 'Mityana',
            },
            {
                code: 'UG.MX',
                name: 'Moroto',
            },
            {
                code: 'UG.MY',
                name: 'Moyo',
            },
            {
                code: 'UG.MJ',
                name: 'Mpigi',
            },
            {
                code: 'UG.MD',
                name: 'Mubende',
            },
            {
                code: 'UG.MV',
                name: 'Mukono',
            },
            {
                code: 'UG.NI',
                name: 'Nakapiripirit',
            },
            {
                code: 'UG.NK',
                name: 'Nakaseke',
            },
            {
                code: 'UG.NA',
                name: 'Nakasongola',
            },
            {
                code: 'UG.NY',
                name: 'Namayingo',
            },
            {
                code: 'UG.BK',
                name: 'Namutumba',
            },
            {
                code: 'UG.NQ',
                name: 'Napak',
            },
            {
                code: 'UG.NB',
                name: 'Nebbi',
            },
            {
                code: 'UG.NR',
                name: 'Ngora',
            },
            {
                code: 'UG.NO',
                name: 'Ntoroko',
            },
            {
                code: 'UG.NT',
                name: 'Ntungamo',
            },
            {
                code: 'UG.NW',
                name: 'Nwoya',
            },
            {
                code: 'UG.MH',
                name: 'Nyadri',
            },
            {
                code: 'UG.OT',
                name: 'Otuke',
            },
            {
                code: 'UG.OY',
                name: 'Oyam',
            },
            {
                code: 'UG.PR',
                name: 'Pader',
            },
            {
                code: 'UG.PS',
                name: 'Pallisa',
            },
            {
                code: 'UG.RI',
                name: 'Rakai',
            },
            {
                code: 'UG.RZ',
                name: 'Rubirizi',
            },
            {
                code: 'UG.RK',
                name: 'Rukungiri',
            },
            {
                code: 'UG.SE',
                name: 'Sembabule',
            },
            {
                code: 'UG.SX',
                name: 'Serere',
            },
            {
                code: 'UG.SH',
                name: 'Sheema',
            },
            {
                code: 'UG.SK',
                name: 'Sironko',
            },
            {
                code: 'UG.ST',
                name: 'Soroti',
            },
            {
                code: 'UG.TR',
                name: 'Tororo',
            },
            {
                code: 'UG.WA',
                name: 'Wakiso',
            },
            {
                code: 'UG.YU',
                name: 'Yumbe',
            },
            {
                code: 'UG.ZO',
                name: 'Zombo',
            },
        ],
    },
    {
        code: 'UA',
        id: 2357,
        name: 'Ukraine',
        states: [
            {
                code: 'UP01',
                name: 'Cherkasy',
            },
            {
                code: 'UP02',
                name: 'Chernihiv',
            },
            {
                code: 'UP03',
                name: 'Chernivtsi',
            },
            {
                code: 'UP11',
                name: 'Crimea',
            },
            {
                code: 'UP04',
                name: "Dnipropetrovs'k",
            },
            {
                code: 'UP05',
                name: "Donets'k",
            },
            {
                code: 'UP06',
                name: "Ivano-Frankivs'k",
            },
            {
                code: 'UP07',
                name: 'Kharkiv',
            },
            {
                code: 'UP08',
                name: 'Kherson',
            },
            {
                code: 'UP09',
                name: "Khmel'nyts'kyy",
            },
            {
                code: 'UP13',
                name: 'Kiev',
            },
            {
                code: 'UP12',
                name: 'Kiev City',
            },
            {
                code: 'UP10',
                name: 'Kirovohrad',
            },
            {
                code: 'UP15',
                name: "L'viv",
            },
            {
                code: 'UP14',
                name: "Luhans'k",
            },
            {
                code: 'UP16',
                name: 'Mykolayiv',
            },
            {
                code: 'UP17',
                name: 'Odessa',
            },
            {
                code: 'UP18',
                name: 'Poltava',
            },
            {
                code: 'UP19',
                name: 'Rivne',
            },
            {
                code: 'UP20',
                name: "Sevastopol' City",
            },
            {
                code: 'UP21',
                name: 'Sumy',
            },
            {
                code: 'UP22',
                name: "Ternopil'",
            },
            {
                code: 'UP25',
                name: 'Transcarpathia',
            },
            {
                code: 'UP23',
                name: 'Vinnytsya',
            },
            {
                code: 'UP24',
                name: 'Volyn',
            },
            {
                code: 'UP26',
                name: 'Zaporizhzhya',
            },
            {
                code: 'UP27',
                name: 'Zhytomyr',
            },
        ],
    },
    {
        code: 'AE',
        id: 2358,
        name: 'United Arab Emirates',
        states: [
            {
                code: 'AE02',
                name: "'Ajman",
            },
            {
                code: 'AE01',
                name: 'Abu Dhabi',
            },
            {
                code: 'AE04',
                name: 'Al Fujayrah',
            },
            {
                code: 'AE03',
                name: 'Dubai',
            },
            {
                code: 'AE05',
                name: "Ra's al Khaymah",
            },
            {
                code: 'AE06',
                name: 'Sharjah',
            },
            {
                code: 'AE07',
                name: 'Umm al Qaywayn',
            },
        ],
    },
    {
        code: 'UM',
        id: 2441,
        name: 'United States Minor Outlying Islands',
        states: [],
    },
    {
        code: 'UY',
        id: 2360,
        name: 'Uruguay',
        states: [],
    },
    {
        code: 'UZ',
        id: 2361,
        name: 'Uzbekistan',
        states: [
            {
                code: 'UZ01',
                name: 'Andijon',
            },
            {
                code: 'UZ02',
                name: 'Buxoro',
            },
            {
                code: 'UZ03',
                name: 'Farg`ona',
            },
            {
                code: 'UZ15',
                name: 'Jizzax',
            },
            {
                code: 'UZ09',
                name: 'Karakalpakstan',
            },
            {
                code: 'UZ08',
                name: 'Kashkadarya',
            },
            {
                code: 'UZ06',
                name: 'Namangan',
            },
            {
                code: 'UZ07',
                name: 'Navoi',
            },
            {
                code: 'UZ10',
                name: 'Samarkand',
            },
            {
                code: 'UZ16',
                name: 'Sirdaryo',
            },
            {
                code: 'UZ12',
                name: 'Surxondaryo',
            },
            {
                code: 'UZ13',
                name: 'Tashkent City',
            },
            {
                code: 'UZ14',
                name: 'Tashkent',
            },
            {
                code: 'UZ05',
                name: 'Xorazm',
            },
        ],
    },
    {
        code: 'NH',
        id: 2406,
        name: 'Vanuatu',
        states: [],
    },
    {
        code: 'VE',
        id: 2363,
        name: 'Venezuela; Bolivarian Republic of',
        states: [
            {
                code: 'VE01',
                name: 'Amazonas',
            },
            {
                code: 'VE02',
                name: 'Anzoátegui',
            },
            {
                code: 'VE03',
                name: 'Apure',
            },
            {
                code: 'VE04',
                name: 'Aragua',
            },
            {
                code: 'VE05',
                name: 'Barinas',
            },
            {
                code: 'VE06',
                name: 'Bolívar',
            },
            {
                code: 'VE07',
                name: 'Carabobo',
            },
            {
                code: 'VE08',
                name: 'Cojedes',
            },
            {
                code: 'VE09',
                name: 'Delta Amacuro',
            },
            {
                code: 'VE24',
                name: 'Dependencias Federales',
            },
            {
                code: 'VE25',
                name: 'Distrito Capital',
            },
            {
                code: 'VE11',
                name: 'Falcón',
            },
            {
                code: 'VE12',
                name: 'Guárico',
            },
            {
                code: 'VE13',
                name: 'Lara',
            },
            {
                code: 'VE14',
                name: 'Mérida',
            },
            {
                code: 'VE15',
                name: 'Miranda',
            },
            {
                code: 'VE16',
                name: 'Monagas',
            },
            {
                code: 'VE17',
                name: 'Nueva Esparta',
            },
            {
                code: 'VE18',
                name: 'Portuguesa',
            },
            {
                code: 'VE19',
                name: 'Sucre',
            },
            {
                code: 'VE20',
                name: 'Táchira',
            },
            {
                code: 'VE21',
                name: 'Trujillo',
            },
            {
                code: 'VE26',
                name: 'Vargas',
            },
            {
                code: 'VE22',
                name: 'Yaracuy',
            },
            {
                code: 'VE23',
                name: 'Zulia',
            },
        ],
    },
    {
        code: 'VN',
        id: 2364,
        name: 'Vietnam',
        states: [
            {
                code: 'VM01',
                name: 'An Giang',
            },
            {
                code: 'VM45',
                name: 'Ba Ria-Vung Tau',
            },
            {
                code: 'VM72',
                name: 'Bac Can',
            },
            {
                code: 'VM71',
                name: 'Bac Giang',
            },
            {
                code: 'VM73',
                name: 'Bac Lieu',
            },
            {
                code: 'VM74',
                name: 'Bac Ninh',
            },
            {
                code: 'VM03',
                name: 'Ben Tre',
            },
            {
                code: 'VM46',
                name: 'Binh Dinh',
            },
            {
                code: 'VM75',
                name: 'Binh Duong',
            },
            {
                code: 'VM76',
                name: 'Binh Phuoc',
            },
            {
                code: 'VM47',
                name: 'Binh Thuan',
            },
            {
                code: 'VM77',
                name: 'Ca Mau',
            },
            {
                code: 'VM87',
                name: 'Can Tho',
            },
            {
                code: 'VM05',
                name: 'Cao Bang',
            },
            {
                code: 'VM78',
                name: 'Da Nang',
            },
            {
                code: 'VM88',
                name: 'Dac Lac',
            },
            {
                code: 'VM91',
                name: 'Dac Nong',
            },
            {
                code: 'VM92',
                name: 'Dien Bien',
            },
            {
                code: 'VM43',
                name: 'Dong Nai',
            },
            {
                code: 'VM09',
                name: 'Dong Thap',
            },
            {
                code: 'VM49',
                name: 'Gia Lai',
            },
            {
                code: 'VM50',
                name: 'Ha Giang',
            },
            {
                code: 'VM80',
                name: 'Ha Nam',
            },
            {
                code: 'VM52',
                name: 'Ha Tinh',
            },
            {
                code: 'VM79',
                name: 'Hai Duong',
            },
            {
                code: 'VM13',
                name: 'Haiphong',
            },
            {
                code: 'VM44',
                name: 'Hanoi',
            },
            {
                code: 'VM93',
                name: 'Hau Giang',
            },
            {
                code: 'VM20',
                name: 'Ho Chi Minh',
            },
            {
                code: 'VM53',
                name: 'Hoa Binh',
            },
            {
                code: 'VM81',
                name: 'Hung Yen',
            },
            {
                code: 'VM54',
                name: 'Khanh Hoa',
            },
            {
                code: 'VM21',
                name: 'Kien Giang',
            },
            {
                code: 'VM55',
                name: 'Kon Tum',
            },
            {
                code: 'VM89',
                name: 'Lai Chau',
            },
            {
                code: 'VM23',
                name: 'Lam Dong',
            },
            {
                code: 'VM39',
                name: 'Lang Son',
            },
            {
                code: 'VM90',
                name: 'Lao Cai',
            },
            {
                code: 'VM24',
                name: 'Long An',
            },
            {
                code: 'VM82',
                name: 'Nam Dinh',
            },
            {
                code: 'VM58',
                name: 'Nghe An',
            },
            {
                code: 'VM59',
                name: 'Ninh Binh',
            },
            {
                code: 'VM60',
                name: 'Ninh Thuan',
            },
            {
                code: 'VM83',
                name: 'Phu Tho',
            },
            {
                code: 'VM61',
                name: 'Phu Yen',
            },
            {
                code: 'VM62',
                name: 'Quang Binh',
            },
            {
                code: 'VM84',
                name: 'Quang Nam',
            },
            {
                code: 'VM63',
                name: 'Quang Ngai',
            },
            {
                code: 'VM30',
                name: 'Quang Ninh',
            },
            {
                code: 'VM64',
                name: 'Quang Tri',
            },
            {
                code: 'VM65',
                name: 'Soc Trang',
            },
            {
                code: 'VM32',
                name: 'Son La',
            },
            {
                code: 'VM33',
                name: 'Tay Ninh',
            },
            {
                code: 'VM35',
                name: 'Thai Binh',
            },
            {
                code: 'VM85',
                name: 'Thai Nguyen',
            },
            {
                code: 'VM34',
                name: 'Thanh Hoa',
            },
            {
                code: 'VM66',
                name: 'Thua Thien-Hue',
            },
            {
                code: 'VM37',
                name: 'Tien Giang',
            },
            {
                code: 'VM67',
                name: 'Tra Vinh',
            },
            {
                code: 'VM68',
                name: 'Tuyen Quang',
            },
            {
                code: 'VM69',
                name: 'Vinh Long',
            },
            {
                code: 'VM86',
                name: 'Vinh Phuc',
            },
            {
                code: 'VM70',
                name: 'Yen Bai',
            },
        ],
    },
    {
        code: 'VG',
        id: 2446,
        name: 'Virgin Islands; British',
        states: [
            {
                code: 'VG.VI',
                name: 'British Virgin Islands',
            },
        ],
    },
    {
        code: 'VI',
        id: 2442,
        name: 'Virgin Islands; U.S.',
        states: [
            {
                code: '010',
                name: 'Saint Croix',
            },
            {
                code: '020',
                name: 'Saint John',
            },
            {
                code: '030',
                name: 'Saint Thomas',
            },
        ],
    },
    {
        code: 'WF',
        id: 2443,
        name: 'Wallis and Futuna',
        states: [],
    },
    {
        code: 'EH',
        id: 2444,
        name: 'Western Sahara',
        states: [],
    },
    {
        code: 'YE',
        id: 2382,
        name: 'Yemen',
        states: [
            {
                code: 'YM01',
                name: 'Abyan',
            },
            {
                code: 'YM20',
                name: "Al Bayda'",
            },
            {
                code: 'YM18',
                name: "Al Dali'",
            },
            {
                code: 'YM08',
                name: 'Al Hudaydah',
            },
            {
                code: 'YM21',
                name: 'Al Jawf',
            },
            {
                code: 'YM03',
                name: 'Al Mahrah',
            },
            {
                code: 'YM10',
                name: 'Al Mahwit',
            },
            {
                code: 'YM19',
                name: 'Amran',
            },
            {
                code: 'YM11',
                name: 'Dhamar',
            },
            {
                code: 'YM04',
                name: 'Hadramawt',
            },
            {
                code: 'YM22',
                name: 'Hajjah',
            },
            {
                code: 'YM23',
                name: 'Ibb',
            },
            {
                code: 'YM24',
                name: 'Lahij',
            },
            {
                code: 'YM14',
                name: "Ma'rib",
            },
            {
                code: 'YM27',
                name: 'Raymah',
            },
            {
                code: 'YM15',
                name: 'Sa`dah',
            },
            {
                code: 'YM16',
                name: "San`a'",
            },
            {
                code: 'YM26',
                name: "San`a' [City]",
            },
            {
                code: 'YM05',
                name: 'Shabwah',
            },
            {
                code: 'YM28',
                name: 'Socotra',
            },
            {
                code: 'YM25',
                name: 'Ta`izz',
            },
            {
                code: 'YM02',
                name: '`Adan',
            },
        ],
    },
    {
        code: 'ZM',
        id: 2369,
        name: 'Zambia',
        states: [
            {
                code: 'ZA02',
                name: 'Central',
            },
            {
                code: 'ZA08',
                name: 'Copperbelt',
            },
            {
                code: 'ZA03',
                name: 'Eastern',
            },
            {
                code: 'ZA04',
                name: 'Luapula',
            },
            {
                code: 'ZA09',
                name: 'Lusaka',
            },
            {
                code: 'ZA10',
                name: 'Muchinga',
            },
            {
                code: 'ZA06',
                name: 'North-Western',
            },
            {
                code: 'ZA05',
                name: 'Northern',
            },
            {
                code: 'ZA07',
                name: 'Southern',
            },
            {
                code: 'ZA01',
                name: 'Western',
            },
        ],
    },
    {
        code: 'ZW',
        id: 2370,
        name: 'Zimbabwe',
        states: [
            {
                code: 'ZI09',
                name: 'Bulawayo',
            },
            {
                code: 'ZI10',
                name: 'Harare',
            },
            {
                code: 'ZI01',
                name: 'Manicaland',
            },
            {
                code: 'ZI03',
                name: 'Mashonaland Central',
            },
            {
                code: 'ZI04',
                name: 'Mashonaland East',
            },
            {
                code: 'ZI05',
                name: 'Mashonaland West',
            },
            {
                code: 'ZI08',
                name: 'Masvingo',
            },
            {
                code: 'ZI06',
                name: 'Matabeleland North',
            },
            {
                code: 'ZI07',
                name: 'Matabeleland South',
            },
            {
                code: 'ZI02',
                name: 'Midlands',
            },
        ],
    },
    {
        code: 'NONE',
        id: 2378,
        name: '- None Specified -',
        states: [],
    },
];
/**
 * Gets all countries
 */
function getCountries() {
    return COUNTRIES.map((country) => country.name);
}
/**
 * Gets a country by country ID
 */
function findByCountryId(id) {
    return COUNTRIES.find((country) => country.id === id);
}
/**
 * Gets a country by country name
 * @param name - Name of country to find
 */
function findByCountryName(name) {
    return COUNTRIES.find((country) => country.name === name.trim());
}
/**
 * Gets a country by country code
 * @param code - Code of country to find
 */
function findByCountryCode(code) {
    return COUNTRIES.find((country) => country.code === code.trim());
}
/**
 * Gets states by country name
 * @param name - Name of the country to search by
 */
function getStateObjects(name) {
    if (name) {
        const foundCountry = COUNTRIES.find((country) => country.name === name.trim());
        return (foundCountry && foundCountry.states) || [];
    }
    return [];
}
/**
 * Gets state names by country name
 * @param name - Name of the country to search by
 */
function getStates(name) {
    return getStateObjects(name).map((state) => state.name);
}

function BooleanInput() {
    return (target, propertyKey) => {
        const key = Symbol();
        return {
            get() {
                return this[key] || false;
            },
            set(value) {
                this[key] = coerceBooleanProperty(value);
            },
        };
    };
}

function Deferred() {
    const temp = {};
    const promise = new Promise((resolve, reject) => {
        temp.resolve = resolve;
        temp.reject = reject;
    });
    promise.resolve = temp.resolve;
    promise.reject = temp.reject;
    return promise;
}

// @dynamic
class Helpers {
    static isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    /**
     * Swallows an event to stop further execution
     */
    static swallowEvent(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    static interpolate(str, props) {
        if (typeof str === 'function') {
            return str(props);
        }
        if (this.isDate(props)) {
            props = this.dateToObject(props);
        }
        // else {
        //   props = Object.entries(props).reduce((obj, [key, value]) => {
        //     const res = { ...obj, [key]: value };
        //     if (this.isIsoDate(value as string)) {
        //       res[`${key}Parts`] = this.dateToObject(new Date(value as string));
        //     }
        //     return res;
        //   }, {});
        // }
        return str.replace(/\$([\w\.]+)/g, (original, key) => {
            const keys = key.split('.');
            let value = props[keys.shift()];
            while (keys.length && value !== undefined) {
                const k = keys.shift();
                value = k ? value[k] : `${value}.`;
            }
            return value !== undefined ? value : '';
        });
    }
    static interpolateWithFallback(formatString, data) {
        // Format string can be an array, it will attempt to interpolate each item
        // in the array, if there is a failure to replace it will mark it as such
        // It will either return the first successful replacement of ALL variables,
        // or an empty string
        if (Array.isArray(formatString)) {
            const successes = [];
            const failures = [];
            formatString.forEach((format) => {
                let isSuccess = true;
                const attempt = format.replace(/\$([\w\.]+)/g, (original, key) => {
                    const keys = key.split('.');
                    let value = data[keys.shift()];
                    while (keys.length && value !== undefined) {
                        const k = keys.shift();
                        value = k ? value[k] : `${value}.`;
                    }
                    if (isSuccess && Helpers.isEmpty(value)) {
                        isSuccess = false;
                    }
                    return Helpers.isEmpty(value) ? '' : value;
                });
                if (isSuccess) {
                    successes.push(attempt);
                }
                else {
                    failures.push(attempt);
                }
            });
            if (successes.length !== 0) {
                return successes[0];
            }
            return '';
        }
        else {
            return Helpers.interpolate(formatString, data);
        }
    }
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param str   The string to interpolate
     * @param props The params to replace in string.
     */
    static validateInterpolationProps(str, props) {
        if (typeof str === 'function') {
            return true;
        }
        const keys = str.match(/\$([\w\.]+)/g);
        return keys.every((key) => {
            return props.hasOwnProperty(key.substr(1));
        });
    }
    static isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
    }
    /**
     * Checks to see if the object is a string
     */
    static isString(obj) {
        return typeof obj === 'string';
    }
    static escapeString(obj) {
        if (Helpers.isString(obj)) {
            return obj.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        return obj;
    }
    static isNumber(val, includeNegatives = false) {
        const numberRegex = includeNegatives ? /^-{0,1}\d*\.?\d*$/ : /^\d*\.?\d*$/;
        if (typeof val === 'string') {
            return val.length > 0 && val !== '.' && numberRegex.test(val);
        }
        else {
            return !isNaN(parseFloat(val));
        }
    }
    /**
     * Checks to see if the object is a undefined or null
     */
    static isBlank(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * Checks to see if the object is a undefined or null
     */
    static isEmpty(obj) {
        return Helpers.isBlank(obj) || obj === '' || (Array.isArray(obj) && obj.length === 0);
    }
    /**
     * Checks to see if the object is a function
     */
    static isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    /**
     * Checks to see if the object is a Date
     */
    static isDate(obj) {
        return obj instanceof Date;
    }
    static isIsoDate(str) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
            return false;
        }
        const d = new Date(str);
        return d.toISOString() === str;
    }
    static convertToArray(obj) {
        if (obj === undefined) {
            return [];
        }
        else if (!Array.isArray(obj)) {
            return [obj];
        }
        return obj;
    }
    static sortByField(fields, reverse = false) {
        return (previous, current) => {
            if (Helpers.isFunction(fields)) {
                return fields(reverse ? 'desc' : 'asc', previous, current);
            }
            if (!Array.isArray(fields)) {
                fields = [fields];
            }
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                let first = previous[field] || '';
                let second = current[field] || '';
                if (Helpers.isDate(first) && Helpers.isDate(second)) {
                    // Dates
                    first = first.getTime();
                    second = second.getTime();
                }
                else if (Helpers.isString(first) && Helpers.isString(second)) {
                    // Basic strings
                    first = first.toLowerCase();
                    second = second.toLowerCase();
                }
                else {
                    // Numbers
                    first = isNaN(Number(first)) ? first : Number(first);
                    second = isNaN(Number(second)) ? second : Number(second);
                }
                if (first > second) {
                    return reverse ? -1 : 1;
                }
                else if (first < second) {
                    return reverse ? 1 : -1;
                }
            }
            return 0;
        };
    }
    static filterByField(key, value) {
        return (item) => {
            const results = [];
            let field = can(item).have(key);
            if (value instanceof Function) {
                results.push(value(field, item));
            }
            else if (Array.isArray(value)) {
                results.push(value.includes(field));
            }
            else if (value instanceof Object) {
                if (field instanceof Date) {
                    field = field.getTime();
                }
                if (value.min) {
                    results.push(field >= value.min);
                }
                if (value.max) {
                    results.push(field <= value.max);
                }
                if (value.any && Array.isArray(value.any)) {
                    if (Array.isArray(field)) {
                        results.push(value.any.some((v) => field.includes(v)));
                    }
                    else {
                        results.push(value.any.includes(field));
                    }
                }
                if (value.all && Array.isArray(value.all)) {
                    results.push(value.all.every((v) => field.includes(v)));
                }
                if (value.not) {
                    results.push(!Helpers.filterByField(key, value.not)(item));
                }
                for (const subkey in value) {
                    if (['min', 'max', 'any', 'all', 'not'].indexOf(subkey) < 0) {
                        const subvalue = value[subkey];
                        results.push(Helpers.filterByField(`${key}.${subkey}`, subvalue)(item));
                    }
                }
            }
            else {
                results.push(JSON.stringify(field).match(new RegExp(value, 'gi')));
            }
            return results.every((x) => x);
        };
    }
    static findAncestor(element, selector) {
        while ((element = element.parentElement) && !element.matches.call(element, selector))
            ; // tslint:disable-line
        return element;
    }
    static deepClone(item) {
        if (Array.isArray(item)) {
            const newArr = [];
            for (let i = item.length; i-- > 0;) {
                // tslint:disable-line
                newArr[i] = Helpers.deepClone(item[i]);
            }
            return newArr;
        }
        if (typeof item === 'function' && !/\(\) \{ \[native/.test(item.toString()) && !item.toString().startsWith('class')) {
            let obj;
            for (const k in item) {
                if (k in item) {
                    obj[k] = Helpers.deepClone(item[k]);
                }
            }
            return obj;
        }
        if (item && typeof item === 'object') {
            const obj = {};
            for (const k in item) {
                if (k in item) {
                    obj[k] = Helpers.deepClone(item[k]);
                }
            }
            return obj;
        }
        return item;
    }
    static deepAssign(...objs) {
        if (objs.length < 2) {
            throw new Error('Need two or more objects to merge');
        }
        const target = Object.assign({}, objs[0]);
        for (let i = 1; i < objs.length; i++) {
            const source = Object.assign({}, objs[i]);
            Object.keys(source).forEach((prop) => {
                const value = source[prop];
                if (Helpers.isObject(value)) {
                    if (target.hasOwnProperty(prop) && Helpers.isObject(target[prop])) {
                        target[prop] = Helpers.deepAssign(target[prop], value);
                    }
                    else {
                        target[prop] = value;
                    }
                }
                else if (Array.isArray(value)) {
                    if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {
                        const targetArray = target[prop];
                        value.forEach((sourceItem, itemIndex) => {
                            if (itemIndex < targetArray.length) {
                                const targetItem = targetArray[itemIndex];
                                if (Object.is(targetItem, sourceItem)) {
                                    return;
                                }
                                if (Helpers.isObject(targetItem) && Helpers.isObject(sourceItem)) {
                                    targetArray[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                                }
                                else if (Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                                    targetArray[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                                }
                                else {
                                    targetArray[itemIndex] = sourceItem;
                                }
                            }
                            else {
                                targetArray.push(sourceItem);
                            }
                        });
                    }
                    else {
                        target[prop] = value;
                    }
                }
                else {
                    target[prop] = value;
                }
            });
        }
        return target;
    }
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    static getNextElementSibling(element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
        else {
            let e = element.nextSibling;
            while (e && 1 !== e.nodeType) {
                e = e.nextSibling;
            }
            return e;
        }
    }
    static dateToObject(date) {
        const dateObj = {
            day: '',
            dayPeriod: '',
            era: '',
            hour: '',
            minute: '',
            month: '',
            second: '',
            weekday: '',
            year: '',
        };
        Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            era: 'short',
            hour: 'numeric',
            minute: 'numeric',
            month: 'numeric',
            second: 'numeric',
            weekday: 'long',
            year: 'numeric',
        })
            .formatToParts(date)
            .forEach((dateTimeFormatPart) => {
            if (dateTimeFormatPart.type !== 'literal') {
                dateObj[dateTimeFormatPart.type] = dateTimeFormatPart.value;
            }
        });
        return dateObj;
    }
}
class Can {
    constructor(obj) {
        this.obj = obj;
    }
    have(key) {
        const props = key.split('.');
        let item = this.obj;
        for (let i = 0; i < props.length; i++) {
            item = item[props[i]];
            if (this.check(item) === false) {
                return item;
            }
        }
        return item;
    }
    check(thing) {
        return thing !== void 0;
    }
}
function can(obj) {
    return new Can(obj);
}
// Assumes data is already sorted
function binarySearch(item, array, compare) {
    return search(0, array.length - 1);
    function search(min, max) {
        if (min > max) {
            return undefined;
        }
        const guess = min + Math.floor((max - min) / 2);
        const comparison = compare(item, array[guess]);
        if (comparison === 0) {
            return array[guess];
        }
        else if (comparison === -1) {
            return search(min, guess - 1);
        }
        else if (comparison === 1) {
            return search(guess + 1, max);
        }
        else {
            throw new Error(`Input mismatch: ${JSON.stringify(item)} not comparable to ${JSON.stringify(array[guess])}`);
        }
    }
}

const isAlphaNumeric = (letter) => {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.includes(letter.toUpperCase());
};

// Helper to keep track of key codes
const KeyCodes = {
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    RETURN: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    HASH_SYMBOL: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    AT_SYMBOL: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    DASH: 189,
    PERIOD: 190,
    FORWARD_SLASH: 191,
};

const notifications = {};
function notify(message) {
    if (!isDevMode() || message in notifications) {
        return;
    }
    notifications[message] = true;
    console.warn(message); // tslint:disable-line
}

// NG2
/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
class OutsideClick {
    constructor(element) {
        this.active = false;
        this.onActiveChange = new EventEmitter();
        // Component element
        this.element = element;
        // Outside click handler
        // Property because `this.func.bind(this)` returns a new function each time
        this.onOutsideClick = this.handleOutsideClick.bind(this);
    }
    /**
     * When the element is destroyed, make sure to remove the handler
     */
    ngOnDestroy() {
        window.removeEventListener('click', this.onOutsideClick);
    }
    /**
     * Toggles the element as active and adds/removes the outside click handler
     */
    toggleActive(event, forceValue) {
        // Reverse the active property (if forceValue, use that)
        this.active = !Helpers.isBlank(forceValue) ? forceValue : !this.active;
        // Bind window click events to hide on outside click
        if (this.active) {
            window.addEventListener('click', this.onOutsideClick);
        }
        else {
            window.removeEventListener('click', this.onOutsideClick);
        }
        // Fire the active change event
        this.onActiveChange.emit(this.active);
    }
    /**
     * When clicking outside, checks the element and closes if outside
     */
    handleOutsideClick(event) {
        // If the elements doesn't contain the target element, it is an outside click
        let outsideClick = !this.element.nativeElement.contains(event.target);
        if (this.otherElement && outsideClick) {
            outsideClick = !this.otherElement.nativeElement.contains(event.target);
        }
        if (outsideClick) {
            this.toggleActive(event, false);
        }
    }
}
OutsideClick.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: OutsideClick, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Injectable });
OutsideClick.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: OutsideClick });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: OutsideClick, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { AppBridge, AppBridgeHandler, AppBridgeService, BooleanInput, COUNTRIES, CalendarEventResponse, Can, Color, DateRange, DateUtil, Deferred, DevAppBridge, DevAppBridgeService, Helpers, KeyCodes, OutsideClick, binarySearch, can, convertTokens, findByCountryCode, findByCountryId, findByCountryName, getCountries, getDayView, getDayViewHourGrid, getMonthView, getStateObjects, getStates, getWeekView, getWeekViewEventOffset, getWeekViewHeader, isAlphaNumeric, legacyParse, notify };
//# sourceMappingURL=novo-elements-utils.mjs.map