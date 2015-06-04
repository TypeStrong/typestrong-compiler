module interfaces {

  export interface compilerOptions {
    testOptions?: {testOnly: boolean};
    typeStrongOptions?: {
      customCompiler?: string;
      silent?: boolean;
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
    files? : string[];
  }

  export interface runtimeOptions {
    compiler: string;
  }

  export interface compilerResult {
    tscArgs: string[];
    runtimeOptions: runtimeOptions;
    consoleOutput: {
      stdout: Buffer;
      stderr: Buffer;
      error: Error
    };
    actualVersion: string;
  }


}

export {interfaces as default};
