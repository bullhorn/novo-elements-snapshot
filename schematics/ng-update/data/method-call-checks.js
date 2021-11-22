"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodCallChecks = void 0;
const schematics_1 = require("@angular/cdk/schematics");
exports.methodCallChecks = {
    [schematics_1.TargetVersion.V6]: [
        {
            pr: 'https://github.com/angular/components/pull/20499',
            changes: [
                {
                    className: 'MatTabNav',
                    method: 'updateActiveLink',
                    invalidArgCounts: [{ count: 1, message: 'The "_element" parameter has been removed' }],
                },
            ],
        },
    ],
};
//# sourceMappingURL=method-call-checks.js.map