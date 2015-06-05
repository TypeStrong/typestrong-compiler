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

      var result = emptyCompilerResult();

      normalizeOptions(options);
      extractAndSetArgs(options, result.tscArgs);
      findTSC.locate(options, result);
      createCommandTempFile(options,result)
      .then((tempFileName) => {
          executeCompile(options, result).then(
            (compileSuccessResult: i.compilerResult) => {
              attemptToDeleteTempFile(result);
              resolve(result);
            },(compileError: any) => {
              attemptToDeleteTempFile(result);
              reject(result);
            });
      },(tempFileError) => {
          reject(result);
      });

    });
  }

  function attemptToDeleteTempFile(result: i.compilerResult) {
      if (!result.runtimeOptions.commandTempFile) {
        return;
      }
      try {
        fs.unlinkSync(result.runtimeOptions.commandTempFile);
      } catch(tempFileEx) {
        throw new Error('cannot delete temp file for tscommand: ' + tempFileEx.message);
      }
  }

  export function emptyCompilerResult() : i.compilerResult {
    return {
      tscArgs: [],
      consoleOutput: null,
      actualVersion: null,
      runtimeOptions: {
        compiler: null,
        compileResult: null,
        commandTempFile: null
      }
    };
  }

  function createCommandTempFile(options: i.compilerOptions, results: i.compilerResult): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let commandTempfile = utils.getTempFile('tscommand');
      if (!commandTempfile) {
        reject(new Error('cannot create temp file for tscommand'));
        return;
      }

      try {
        let argsToPass = [results.tscArgs,...options.files].join(' ');
        if (options.typeStrongOptions.verbose) {
            console.log("TypeScript Arguments:" + argsToPass);
        }
        fs.writeFileSync(commandTempfile, argsToPass);
        results.runtimeOptions.commandTempFile = commandTempfile;
        resolve(commandTempfile);
      } catch(tempFileEx) {
        reject(new Error('cannot create temp file for tscommand: ' + tempFileEx.message));
      }
    });
  }

  function executeCompile(options: i.compilerOptions, results: i.compilerResult): Promise<i.compilerResult> {
    return new Promise<i.compilerResult>((resolve, reject) => {
        if (options.testOptions.doNotRunCompiler) {
          results.runtimeOptions.compileResult = 'Affirmatively skipped';
          resolve(results);
          return;
        }

        try {
          if (options.typeStrongOptions.verbose) {
              console.log("Running " + process.execPath + " " + results.runtimeOptions.compiler);
          }
          let tsc = execFile(process.execPath,
          [results.runtimeOptions.compiler,`@${results.runtimeOptions.commandTempFile}`],
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
                results.runtimeOptions.compileResult = "Run";
                resolve(results);
            }
            results.runtimeOptions.compileResult = "Run with error";
            reject(results);
          });
        } catch (execFileEx) {
          results.runtimeOptions.compileResult = "Run with error";
          reject(results);
        }
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
          doNotRunCompiler: false,
          doNotSearchForCompiler: false
        },
      };
  }

  export function testCompilerOptions() : i.compilerOptions {
      var opt = defaultCompilerOptions();
      opt.testOptions.doNotRunCompiler = true;
      opt.testOptions.doNotSearchForCompiler = true;
      return opt;
  }


  function normalizeOptions(options: i.compilerOptions) {
      var defaultOptions = defaultCompilerOptions();
      options = options || {};
      options.typeStrongOptions = options.typeStrongOptions || {};
      options.testOptions = options.testOptions || defaultOptions.testOptions;
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
