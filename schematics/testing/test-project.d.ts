import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
/** Create a base project used for testing. */
export declare function createTestProject(runner: SchematicTestRunner, projectType: 'application' | 'library', appOptions?: {}, tree?: Tree): Promise<UnitTestTree>;
