import {Promise as Promise} from 'es6-promise';
import * as _ from 'lodash';

module compiler {
  "use strict";

  //export const x = "";
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
    var pushToArgs : (thingToTest: any, ...whatToPush: string[]) => void = <any>_.partial(ifTruthyPush, args);

    pushToArgs(options.target,"--target", options.target);
    pushToArgs(options.removeComments,"--removeComments");
    pushToArgs(options.outDir,"--outDir",options.outDir);
    pushToArgs(options.out,"--out",options.out);
    pushToArgs(options.sourceMap,"--sourceMap");
    pushToArgs(options.sourceRoot,"--sourceRoot", options.sourceRoot);
    pushToArgs(options.mapRoot,"--mapRoot", options.mapRoot);
    pushToArgs(options.emitDecoratorMetadata,"--emitDecoratorMetadata");

  }

  function ifTruthyPush<T>( pushToThis: T[], thingToTest: any, ...whatToPush: T[]) {
    if (thingToTest) {
        pushToThis.push(...whatToPush);
    }
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
    consoleOutput: string;
    actualVersion: string;
  }

}

export {compiler as default};
