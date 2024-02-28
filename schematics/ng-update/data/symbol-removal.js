"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolRemoval = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.symbolRemoval = {
    [schematics_1.TargetVersion.V13]: [
    // {
    //   pr: 'https://github.com/bullhorn/novo-elements/pull/1241',
    //   changes: [
    //     'CanColorCtor',
    //     'CanDisableRippleCtor',
    //     'CanDisableCtor',
    //     'CanUpdateErrorStateCtor',
    //     'HasInitializedCtor',
    //     'HasTabIndexCtor',
    //   ].map(name => ({
    //     name,
    //     module: '@angular/material/core',
    //     message: `\`${name}\` is no longer necessary and has been removed.`,
    //   })),
    // },
    ],
};
//# sourceMappingURL=symbol-removal.js.map