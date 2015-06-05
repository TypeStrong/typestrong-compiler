declare module interfaces {
    interface compilerOptions {
        testOptions?: {
            doNotRunCompiler: boolean;
            doNotSearchForCompiler: boolean;
        };
        typeStrongOptions?: {
            customCompiler?: string;
            silent?: boolean;
            verbose?: boolean;
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
        noEmit?: boolean;
        preserveConstEnums?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        inlineSources?: boolean;
        inlineSourceMap?: boolean;
        newLine?: string;
        module?: string;
        files?: string[];
    }
    interface runtimeOptions {
        compileResult: string;
        compiler: string;
        commandTempFile: string;
    }
    interface compilerResult {
        tscArgs: string[];
        runtimeOptions: runtimeOptions;
        consoleOutput: {
            stdout: Buffer;
            stderr: Buffer;
            error: Error;
        };
        actualVersion: string;
    }
}
export { interfaces as default };
