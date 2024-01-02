/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
export declare type LegacyParseOptions = {
    additionalDigits?: 0 | 1 | 2;
};
export declare function legacyParse(argument: any, options?: LegacyParseOptions): Date;
