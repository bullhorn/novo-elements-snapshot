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
exports.addFontsToIndex = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const config_1 = require("@schematics/angular/utility/config");
/** Adds the Material Design fonts to the index HTML file. */
function addFontsToIndex(options) {
    return (host) => __awaiter(this, void 0, void 0, function* () {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        const projectIndexFiles = schematics_2.getProjectIndexFiles(project);
        if (!projectIndexFiles.length) {
            throw new schematics_1.SchematicsException('No project index HTML file could be found.');
        }
        const preconnect = `<link rel="preconnect" href="https://fonts.gstatic.com">`;
        const fonts = [
            'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
            'https://cdn.jsdelivr.net/npm/@bullhorn/bullhorn-icons/fonts/Bullhorn-Glyphicons.css',
        ];
        projectIndexFiles.forEach((indexFilePath) => {
            schematics_2.appendHtmlElementToHead(host, indexFilePath, preconnect);
            fonts.forEach((font) => {
                schematics_2.appendHtmlElementToHead(host, indexFilePath, `<link href="${font}" rel="stylesheet">`);
            });
        });
    });
}
exports.addFontsToIndex = addFontsToIndex;
//# sourceMappingURL=novo-fonts.js.map