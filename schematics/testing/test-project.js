"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestProject = void 0;
/** Create a base project used for testing. */
function createTestProject(runner, projectType, appOptions = {}, tree) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspaceTree = yield runner
            .runExternalSchematicAsync('@schematics/angular', 'workspace', {
            name: 'workspace',
            version: '6.0.0',
            newProjectRoot: 'projects',
        }, tree)
            .toPromise();
        return runner.runExternalSchematicAsync('@schematics/angular', projectType, Object.assign({ name: 'novo' }, appOptions), workspaceTree).toPromise();
    });
}
exports.createTestProject = createTestProject;
//# sourceMappingURL=test-project.js.map