import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
/** Reads the UTF8 content of the specified file. Normalizes the path and ensures that */
export declare function readFileContent(filePath: string): string;
/**
 * Creates a test app schematic tree that will be copied over to a real filesystem location.
 * This is necessary because otherwise the TypeScript compiler API would not be able to
 * find source files within the tsconfig project.
 * TODO(devversion): we should be able to make the TypeScript config parsing respect the
 * schematic tree. This would allow us to fully take advantage of the virtual file system.
 */
export declare function createFileSystemTestApp(runner: SchematicTestRunner): Promise<{
    appTree: UnitTestTree;
    writeFile: (filePath: string, content: string) => void;
}>;
export declare function createTestCaseSetup(migrationName: string, collectionPath: string, inputFiles: string[]): Promise<{
    runner: SchematicTestRunner;
    appTree: UnitTestTree;
    writeFile: (filePath: string, content: string) => void;
    runFixers: () => Promise<{
        logOutput: string;
    }>;
}>;
/**
 * Resolves all test cases for specified path using Bazel's runfile manifest. Note that we
 * cannot just use "glob" since the test case files are not copied to the Bazel bin directory
 * and are just runfiles.
 */
export declare function findVersionTestCases(basePath: string): Map<string, string[]>;
/**
 * Sets up the specified test cases using Jasmine by creating the appropriate jasmine
 * spec definitions. This should be used within a "describe" jasmine closure.
 */
export declare function defineJasmineTestCases(versionName: string, collectionFile: string, inputFiles: string[] | undefined): void;
/**
 * Patches the specified virtual file system tree to be able to read the TypeScript
 * default library typings. These need to be readable in unit tests because otherwise
 * type checking within migration rules is not working as in real applications.
 */
export declare function _patchTypeScriptDefaultLib(tree: Tree): void;
