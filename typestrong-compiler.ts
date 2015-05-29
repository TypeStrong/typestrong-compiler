import {Promise as Promise} from 'es6-promise';
import * as _ from 'lodash';
import path = require('path');
import fs = require('fs');


module compiler {
  "use strict";

  export function compile(normalizedOptions: compilerOptions) : Promise<compilerResult> {
    return new Promise<compilerResult>((resolve, reject) => {
      var args: string[] = [];

      extractAndSetArgs(normalizedOptions,args);

      resolve({
        tscArgs: args,
        consoleOutput: null,
        actualVersion: null
      });

    });
  }

  function extractAndSetArgs(options: compilerOptions, args: string[]) {
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

  function resolveTypeScriptBinPath(): string {
      var ownRoot = path.resolve(path.dirname((module).filename), '../..');
      var userRoot = path.resolve(ownRoot, '..', '..');
      var binSub = path.join('node_modules', 'typescript', 'bin');

      if (fs.existsSync(path.join(userRoot, binSub))) {
          // Using project override
          return path.join(userRoot, binSub);
      }
      return path.join(ownRoot, binSub);
  }


  function getTsc(binPath: string): string {
    var pkg = JSON.parse(fs.readFileSync(path.resolve(binPath, '..', 'package.json')).toString());
    //TODO: log this grunt.log.writeln('Using tsc v' + pkg.version);
    return path.join(binPath, 'tsc');
}

  interface compilerOptions {
    testOptions?: {testOnly: boolean};
    typeStrongOptions?: {
      customCompiler?: string;
      confirmVersion?: boolean;
    };
    target?: string;
    removeComments?: boolean;
    outDir?: string;
    out?: string;
    sourceMap?: boolean;
    sourceRoot?: string;
    mapRoot?: string;
    emitDecoratorMetadata?: boolean;
    declaration?: boolean;
    noImplicitAny?: boolean;
    noResolve?: boolean;
    noEmitOnError?: boolean;
    noEmit?:boolean;
    preserveConstEnums?: boolean;
    suppressImplicitAnyIndexErrors?: boolean;
    inlineSources?: boolean;
    inlineSourceMap?: boolean;
    newLine?: string;
    module?: string;
  }

  interface compilerResult {
    tscArgs: string[];
    consoleOutput: consoleOutputItem[];
    actualVersion: string;
  }

  interface consoleOutputItem {
    source: string;
    timestamp: Date;
    content: string;
  }

}

export {compiler as default};
