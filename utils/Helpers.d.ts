export declare class Helpers {
    /**
     * Swallows an event to stop further execution
     * @param event
     */
    static swallowEvent(event: any): void;
    static interpolate(str: string, props: any): string;
    static interpolateWithFallback(formatString: string | string[], data: any): string;
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param str   The string to interpolate
     * @param props The params to replace in string.
     */
    static validateInterpolationProps(str: string, props: any): boolean;
    static isObject(item: any): boolean;
    /**
     * Checks to see if the object is a string
     */
    static isString(obj: any): boolean;
    static isNumber(val: any): boolean;
    /**
     * Checks to see if the object is a undefined or null
     */
    static isBlank(obj: any): boolean;
    /**
     * Checks to see if the object is a undefined or null
     */
    static isEmpty(obj: any): boolean;
    /**
     * Checks to see if the object is a function
     */
    static isFunction(obj: any): boolean;
    /**
     * Checks to see if the object is a Date
     */
    static isDate(obj: any): boolean;
    static sortByField(fields: any, reverse?: boolean): (previous: any, current: any) => any;
    static filterByField(key: any, value: any): (item: any) => boolean;
    static findAncestor(element: Element, selector: string): Element;
    static deepClone(item: any): any;
    static deepAssign(...objs: any[]): any;
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    static getNextElementSibling(element: Element): Node;
}
export declare class Can {
    obj: Object;
    constructor(obj: Object);
    have(key: string): any;
    check(thing: any): boolean;
}
/**
 * @param obj
 */
export declare function can(obj: any): Can;
