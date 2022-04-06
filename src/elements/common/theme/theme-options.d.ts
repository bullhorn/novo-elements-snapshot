import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
export declare class NovoThemeOptions {
    themeName: string;
}
export interface ThemeChangeEvent {
    themeName: string;
    options?: NovoThemeOptions;
}
export declare class NovoTheme {
    private _defaultTheme;
    private _currentTheme;
    onThemeChange: EventEmitter<ThemeChangeEvent>;
    /** Name of the theme being used. defaults to `modern-light` */
    get themeName(): string;
    set themeName(value: string);
    use(options: NovoThemeOptions): Observable<any>;
    /**
     * Changes the current theme
     */
    private changeTheme;
}
/**
 getComputedStyle(document.documentElement)
    .getPropertyValue('--my-variable-name'); // #999999
 
 document.documentElement.style
    .setProperty('--my-variable-name', 'pink');
*/
