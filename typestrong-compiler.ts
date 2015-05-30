import {Promise as Promise} from 'es6-promise';
import * as _ from 'lodash';
import findTSC from './locateTSC';
import i from './interfaces';
import * as utils from './utils';
import * as fs from 'fs';
//child_process = require('child_process');
import {exec as exec} from 'child_process';

module compiler {
  "use strict";

  export function compile(options: i.compilerOptions) : Promise<i.compilerResult> {
    return new Promise<i.compilerResult>((resolve, reject) => {

      var result: i.compilerResult = {
        tscArgs: [],
        consoleOutput: null,
        actualVersion: null,
        runtimeOptions: {
          compiler: null
        }
      };

      normalizeOptions(options);
      extractAndSetArgs(options, result.tscArgs);
      findTSC.locate(options, result);
      executeCompile(options, result);

      resolve(result);

    });
  }

  function executeCompile(options: i.compilerOptions, results: i.compilerResult) {
    if (!options.testOptions.testOnly) {

      // var commandTempfile = utils.getTempFile('tscommand');
      // if (!commandTempfile) {
      //   throw new Error('cannot create temp file for tscommand');
      // }
      // fs.writeFileSync(commandTempfile, results.tscArgs.join(' '));
      //
      //
      //
      // exec(results.runtimeOptions.compiler + ' @' + commandTempfile, (err, stdout, stderr) => {
      //
      // });
    }
  }


  function normalizeOptions(options: i.compilerOptions) {
      options = options || {};
      options.typeStrongOptions = options.typeStrongOptions || {};
      options.testOptions = options.testOptions || {testOnly: false};
  }

  function extractAndSetArgs(options: i.compilerOptions, args: string[]) {
    var maybePushToArgs : (thingToTest: any, ...whatToPush: string[]) => void = <any>_.partial(ifTruthyPush, args);

    maybePushToArgs(options.target,"--target", options.target);
    maybePushToArgs(options.removeComments,"--removeComments");
    maybePushToArgs(options.outDir,"--outDir",options.outDir);
    maybePushToArgs(options.out,"--out",options.out);
    maybePushToArgs(options.sourceMap,"--sourceMap");
    maybePushToArgs(options.sourceRoot,"--sourceRoot", options.sourceRoot);
    maybePushToArgs(options.mapRoot,"--mapRoot", options.mapRoot);
    maybePushToArgs(options.emitDecoratorMetadata,"--emitDecoratorMetadata");
    maybePushToArgs(options.declaration,"--declaration");
    maybePushToArgs(options.noImplicitAny,"--noImplicitAny");
    maybePushToArgs(options.noResolve,"--noResolve");
    maybePushToArgs(options.noEmitOnError,"--noEmitOnError");
    maybePushToArgs(options.noEmit,"--noEmit");
    maybePushToArgs(options.preserveConstEnums,"--preserveConstEnums");
    maybePushToArgs(options.suppressImplicitAnyIndexErrors,"--suppressImplicitAnyIndexErrors");
    maybePushToArgs(options.inlineSources,"--inlineSources");
    maybePushToArgs(options.inlineSourceMap,"--inlineSourceMap");
    maybePushToArgs(options.newLine,"--newLine", options.newLine);
    maybePushToArgs(options.module,"--module", options.module);

  }

  function ifTruthyPush<T>( pushToThis: T[], thingToTest: any, ...whatToPush: T[]) {
    if (thingToTest) {
        pushToThis.push(...whatToPush);
    }
  }

}

export {compiler as default};
