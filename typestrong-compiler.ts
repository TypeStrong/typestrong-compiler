import {Promise} from 'es6-promise';
import * as _ from 'lodash';
import findTSC from './locateTSC';
import i from './interfaces';
import * as utils from './utils';
import * as fs from 'fs';
import {execFile} from 'child_process';


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
      executeCompile(options, result).then((executeCompileResult) => {
        resolve(result);
      }, (executeCompileError) => {
        reject(executeCompileError);
      });
    });
  }

  function executeCompile(options: i.compilerOptions, results: i.compilerResult): Promise<i.compilerResult> {
    return new Promise<i.compilerResult>((resolve, reject) => {
        if (options.testOptions.testOnly) {
          resolve(results);
        }

        let commandTempfile = utils.getTempFile('tscommand');
        if (!commandTempfile) {
          throw new Error('cannot create temp file for tscommand');
        }

        fs.writeFileSync(commandTempfile,
          [results.tscArgs,...options.files].join(' ')
          );

        let tsc = execFile(process.execPath,
          [results.runtimeOptions.compiler,`@${commandTempfile}`],
          (error, stdout, stderr) => {

            results.consoleOutput = {
              stdout: stdout,
              stderr: stderr,
              error: error
            };

            if (!options.typeStrongOptions.silent) {
              console.log(stdout.toString());
              console.log(stderr.toString());
              if (error) {
              console.log(`Error: ${error}`);
              }
            }

            if (error === null) {
                resolve(results);
            }
            reject(results);
          });
      });
  }

  function bufferAsStringArray(theBuffer : Buffer) : string[] {
    if (!theBuffer) {
      return [];
    }
    return theBuffer.toString().replace(/\r/g,'').split('\n');
  }

  export function defaultCompilerOptions() : i.compilerOptions {
      return {
        typeStrongOptions: {
          silent: true
        },
        testOptions: {
          testOnly: false
        },
      };
  }

  export function testCompilerOptions() : i.compilerOptions {
      var opt = defaultCompilerOptions();
      opt.testOptions.testOnly = true;
      return opt;
  }


  function normalizeOptions(options: i.compilerOptions) {
      options = options || {};
      options.typeStrongOptions = options.typeStrongOptions || {};
      options.testOptions = options.testOptions || {testOnly: false};
  }

  function extractAndSetArgs(options: i.compilerOptions, args: string[]) {
    var maybePushToArgs : (thingToTest: any, ...whatToPush: string[]) => void = <any>_.partial(ifTruthyPush, args);

    maybePushToArgs(options.target,"--target", toLowerOrNull(options.target));
    maybePushToArgs(options.removeComments, "--removeComments");
    maybePushToArgs(options.outDir,"--outDir", options.outDir);
    maybePushToArgs(options.out,"--out", options.out);
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
    maybePushToArgs(options.module,"--module", toLowerOrNull(options.module));

  }

  function toLowerOrNull(input: string) {
      if (input) {
          return input.toLocaleLowerCase();
      }
      return null;
  }

  function ifTruthyPush<T>( pushToThis: T[], thingToTest: any, ...whatToPush: T[]) {
    if (thingToTest) {
        pushToThis.push(...whatToPush);
    }
  }

}

export {compiler as default};
