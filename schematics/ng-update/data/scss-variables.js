"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scssVariables = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.scssVariables = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/angular/components/pull/10296',
            changes: [
                { replace: '$base-font-size', replaceWith: '$font-size-base' },
                { replace: '$base-font-family', replaceWith: '$font-family-body' },
                { replace: '$base-font-color', replaceWith: '$font-color-base' },
                { replace: '$base-line-height', replaceWith: '$font-height-base' },
                { replace: '$alt-font-family', replaceWith: '$font-family-mono' },
                { replace: '$whiteframe-shadow-z1', replaceWith: '$shadow-1' },
                { replace: '$whiteframe-shadow-z2', replaceWith: '$shadow-2' },
                { replace: '$whiteframe-shadow-z3', replaceWith: '$shadow-3' },
                { replace: '$whiteframe-shadow-z4', replaceWith: '$shadow-4' },
                { replace: '$whiteframe-shadow-z5', replaceWith: '$shadow-5' },
                { replace: '$whiteframe-zindex-z1', replaceWith: '$zindex-1' },
                { replace: '$whiteframe-zindex-z2', replaceWith: '$zindex-2' },
                { replace: '$whiteframe-zindex-z3', replaceWith: '$zindex-3' },
                { replace: '$whiteframe-zindex-z4', replaceWith: '$zindex-4' },
                { replace: '$whiteframe-zindex-z5', replaceWith: '$zindex-5' },
            ],
        },
    ],
};
//# sourceMappingURL=scss-variables.js.map