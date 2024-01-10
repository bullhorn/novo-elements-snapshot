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
exports._patchTypeScriptDefaultLib = exports.defineJasmineTestCases = exports.findVersionTestCases = exports.createTestCaseSetup = exports.createFileSystemTestApp = exports.readFileContent = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const fs_extra_1 = require("fs-extra");
const glob_1 = require("glob");
const jsonc_parser_1 = require("jsonc-parser");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const test_app_1 = require("./test-app");
/** Suffix that indicates whether a given file is a test case input. */
const TEST_CASE_INPUT_SUFFIX = '_input.{ts,scss}';
const TEST_CASE_INPUT_REGEXP = '_input.(ts|scss)';
/** Suffix that indicates whether a given file is an expected output of a test case. */
const TEST_CASE_OUTPUT_SUFFIX = '_expected_output.$1';
/** Name of the folder that can contain test case files which should not run automatically. */
const MISC_FOLDER_NAME = 'misc';
/** Reads the UTF8 content of the specified file. Normalizes the path and ensures that */
function readFileContent(filePath) {
    return (0, fs_extra_1.readFileSync)(filePath, 'utf8');
}
exports.readFileContent = readFileContent;
/**
 * Creates a test app schematic tree that will be copied over to a real filesystem location.
 * This is necessary because otherwise the TypeScript compiler API would not be able to
 * find source files within the tsconfig project.
 * TODO(devversion): we should be able to make the TypeScript config parsing respect the
 * schematic tree. This would allow us to fully take advantage of the virtual file system.
 */
function createFileSystemTestApp(runner) {
    return __awaiter(this, void 0, void 0, function* () {
        const hostTree = new schematics_1.HostTree();
        const appTree = yield (0, test_app_1.createTestApp)(runner, { name: 'cdk-testing' }, hostTree);
        // Since the TypeScript compiler API expects all files to be present on the real file system, we
        // map every file in the app tree to a temporary location on the file system.
        appTree.files.forEach((f) => writeFile(f, appTree.readContent(f)));
        return {
            appTree,
            writeFile,
        };
        function writeFile(filePath, content) {
            // Update the temp file system host to reflect the changes in the real file system.
            // This is still necessary since we depend on the real file system for parsing the
            // TypeScript project.
            if (hostTree.exists(filePath)) {
                hostTree.overwrite(filePath, content);
            }
            else {
                hostTree.create(filePath, content);
            }
        }
    });
}
exports.createFileSystemTestApp = createFileSystemTestApp;
function createTestCaseSetup(migrationName, collectionPath, inputFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
        let logOutput = '';
        runner.logger.subscribe((entry) => (logOutput += `${entry.message}\n`));
        const { appTree, writeFile } = yield createFileSystemTestApp(runner);
        _patchTypeScriptDefaultLib(appTree);
        // Write each test-case input to the file-system. This is necessary because otherwise
        // TypeScript compiler API won't be able to pick up the test cases.
        inputFiles.forEach((inputFilePath) => {
            const inputTestName = (0, path_1.basename)(inputFilePath, (0, path_1.extname)(inputFilePath));
            const inputTextExt = (0, path_1.extname)(inputFilePath);
            const relativePath = `projects/cdk-testing/src/test-cases/${inputTestName}${inputTextExt}`;
            const inputContent = readFileContent(inputFilePath);
            writeFile(relativePath, inputContent);
        });
        const testAppTsconfigPath = 'projects/cdk-testing/tsconfig.app.json';
        // Parse TypeScript configuration files with JSONC (like the CLI does) as the
        // config files could contain comments or trailing commas
        const testAppTsconfig = (0, jsonc_parser_1.parse)(appTree.readContent(testAppTsconfigPath), [], {
            allowTrailingComma: true,
        });
        // include all TypeScript files in the project. Otherwise all test input
        // files won't be part of the program and cannot be migrated.
        testAppTsconfig.include.push('src/**/*.ts');
        writeFile(testAppTsconfigPath, JSON.stringify(testAppTsconfig, null, 2));
        const runFixers = function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Patch "executePostTasks" to do nothing. This is necessary since
                // we cannot run the node install task in unit tests. Rather we just
                // assert that certain async post tasks are scheduled.
                // TODO(devversion): RxJS version conflicts between angular-devkit and our dev deps.
                runner.engine.executePostTasks = () => rxjs_1.EMPTY;
                yield runner.runSchematicAsync(migrationName, {}, appTree).toPromise();
                return { logOutput };
            });
        };
        return { runner, appTree, writeFile, runFixers };
    });
}
exports.createTestCaseSetup = createTestCaseSetup;
/**
 * Resolves all test cases for specified path using Bazel's runfile manifest. Note that we
 * cannot just use "glob" since the test case files are not copied to the Bazel bin directory
 * and are just runfiles.
 */
function findVersionTestCases(basePath) {
    const testCasesMap = new Map();
    // const runfilesDir = process.env['RUNFILES'];
    const runfilesBaseDir = basePath;
    const inputFiles = (0, glob_1.sync)(`**/!(${MISC_FOLDER_NAME})/*${TEST_CASE_INPUT_SUFFIX}`, {
        cwd: runfilesBaseDir,
    });
    inputFiles.forEach((inputFile) => {
        // The target version of an input file will be determined from the first
        // path segment. (e.g. "v6/my_rule_input.ts" will be for "v6")
        const targetVersion = inputFile.split(path_1.sep)[0];
        const resolvedInputPath = (0, path_1.join)(runfilesBaseDir, inputFile);
        testCasesMap.set(targetVersion, (testCasesMap.get(targetVersion) || []).concat(resolvedInputPath));
    });
    return testCasesMap;
}
exports.findVersionTestCases = findVersionTestCases;
/**
 * Sets up the specified test cases using Jasmine by creating the appropriate jasmine
 * spec definitions. This should be used within a "describe" jasmine closure.
 */
function defineJasmineTestCases(versionName, collectionFile, inputFiles) {
    // No test cases for the given version are available. Skip setting up tests for that
    // version.
    if (!inputFiles) {
        return;
    }
    let appTree;
    let testCasesOutputPath;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const { appTree: _tree, runFixers } = yield createTestCaseSetup(`migration-${versionName}`, collectionFile, inputFiles);
        yield runFixers();
        appTree = _tree;
        testCasesOutputPath = '/projects/cdk-testing/src/test-cases/';
    }));
    // Iterates through every test case directory and generates a jasmine test block that will
    // verify that the update schematics properly updated the test input to the expected output.
    inputFiles.forEach((inputFile) => {
        const inputTestName = (0, path_1.basename)(inputFile, (0, path_1.extname)(inputFile));
        const inputTestExt = (0, path_1.extname)(inputFile);
        it(`should apply update schematics to test case: ${inputTestName}`, () => {
            expect(appTree.readContent((0, path_1.join)(testCasesOutputPath, `${inputTestName}${inputTestExt}`))).toBe(readFileContent(inputFile.replace(new RegExp(TEST_CASE_INPUT_REGEXP, 'gi'), TEST_CASE_OUTPUT_SUFFIX)));
        });
    });
}
exports.defineJasmineTestCases = defineJasmineTestCases;
/**
 * Patches the specified virtual file system tree to be able to read the TypeScript
 * default library typings. These need to be readable in unit tests because otherwise
 * type checking within migration rules is not working as in real applications.
 */
function _patchTypeScriptDefaultLib(tree) {
    const _originalRead = tree.read;
    tree.read = function (filePath) {
        // In case a file within the TypeScript package is requested, we read the file from
        // the real file system. This is necessary because within unit tests, the "typeScript"
        // package from within the Bazel "@npm" repository  is used. The virtual tree can't be
        // used because the "@npm" repository directory is not part of the virtual file system.
        if (filePath.match(/node_modules[/\\]typescript/)) {
            return (0, fs_extra_1.readFileSync)((0, core_1.getSystemPath)(filePath));
        }
        else {
            return _originalRead.call(this, filePath);
        }
    };
}
exports._patchTypeScriptDefaultLib = _patchTypeScriptDefaultLib;
//# sourceMappingURL=test-case-setup.js.map