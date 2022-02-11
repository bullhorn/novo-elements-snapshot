import { Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add novo-elements`.
 *
 * Since the Novo Elements schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
export default function (options: Schema): Rule;
