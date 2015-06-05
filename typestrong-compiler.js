var es6_promise_1 = require('es6-promise');
var _ = require('lodash');
var locateTSC_1 = require('./locateTSC');
var utils = require('./utils');
var fs = require('fs');
var child_process_1 = require('child_process');
var compiler;
(function (compiler) {
    "use strict";
    function compile(options) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var result = emptyCompilerResult();
            normalizeOptions(options);
            extractAndSetArgs(options, result.tscArgs);
            locateTSC_1.default.locate(options, result);
            createCommandTempFile(options, result)
                .then(function (tempFileName) {
                executeCompile(options, result).then(function (compileSuccessResult) {
                    attemptToDeleteTempFile(result);
                    resolve(result);
                }, function (compileError) {
                    attemptToDeleteTempFile(result);
                    reject(result);
                });
            }, function (tempFileError) {
                reject(result);
            });
        });
    }
    compiler.compile = compile;
    function attemptToDeleteTempFile(result) {
        if (!result.runtimeOptions.commandTempFile) {
            return;
        }
        try {
            fs.unlinkSync(result.runtimeOptions.commandTempFile);
        }
        catch (tempFileEx) {
            throw new Error('cannot delete temp file for tscommand: ' + tempFileEx.message);
        }
    }
    function emptyCompilerResult() {
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
    compiler.emptyCompilerResult = emptyCompilerResult;
    function createCommandTempFile(options, results) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var commandTempfile = utils.getTempFile('tscommand');
            if (!commandTempfile) {
                reject(new Error('cannot create temp file for tscommand'));
                return;
            }
            try {
                var argsToPass = [results.tscArgs].concat(options.files).join(' ');
                if (options.typeStrongOptions.verbose) {
                    console.log("TypeScript Arguments:" + argsToPass);
                }
                fs.writeFileSync(commandTempfile, argsToPass);
                results.runtimeOptions.commandTempFile = commandTempfile;
                resolve(commandTempfile);
            }
            catch (tempFileEx) {
                reject(new Error('cannot create temp file for tscommand: ' + tempFileEx.message));
            }
        });
    }
    function executeCompile(options, results) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (options.testOptions.doNotRunCompiler) {
                results.runtimeOptions.compileResult = 'Affirmatively skipped';
                resolve(results);
                return;
            }
            try {
                if (options.typeStrongOptions.verbose) {
                    console.log("Running " + process.execPath + " " + results.runtimeOptions.compiler);
                }
                var tsc = child_process_1.execFile(process.execPath, [results.runtimeOptions.compiler, ("@" + results.runtimeOptions.commandTempFile)], function (error, stdout, stderr) {
                    results.consoleOutput = {
                        stdout: stdout,
                        stderr: stderr,
                        error: error
                    };
                    if (!options.typeStrongOptions.silent) {
                        console.log(stdout.toString());
                        console.log(stderr.toString());
                        if (error) {
                            console.log("Error: " + error);
                        }
                    }
                    if (error === null) {
                        results.runtimeOptions.compileResult = "Run";
                        resolve(results);
                    }
                    results.runtimeOptions.compileResult = "Run with error";
                    reject(results);
                });
            }
            catch (execFileEx) {
                results.runtimeOptions.compileResult = "Run with error";
                reject(results);
            }
        });
    }
    function bufferAsStringArray(theBuffer) {
        if (!theBuffer) {
            return [];
        }
        return theBuffer.toString().replace(/\r/g, '').split('\n');
    }
    function defaultCompilerOptions() {
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
    compiler.defaultCompilerOptions = defaultCompilerOptions;
    function testCompilerOptions() {
        var opt = defaultCompilerOptions();
        opt.testOptions.doNotRunCompiler = true;
        opt.testOptions.doNotSearchForCompiler = true;
        return opt;
    }
    compiler.testCompilerOptions = testCompilerOptions;
    function normalizeOptions(options) {
        var defaultOptions = defaultCompilerOptions();
        options = options || {};
        options.typeStrongOptions = options.typeStrongOptions || {};
        options.testOptions = options.testOptions || defaultOptions.testOptions;
    }
    function extractAndSetArgs(options, args) {
        var maybePushToArgs = _.partial(ifTruthyPush, args);
        maybePushToArgs(options.target, "--target", toLowerOrNull(options.target));
        maybePushToArgs(options.removeComments, "--removeComments");
        maybePushToArgs(options.outDir, "--outDir", options.outDir);
        maybePushToArgs(options.out, "--out", options.out);
        maybePushToArgs(options.sourceMap, "--sourceMap");
        maybePushToArgs(options.sourceRoot, "--sourceRoot", options.sourceRoot);
        maybePushToArgs(options.mapRoot, "--mapRoot", options.mapRoot);
        maybePushToArgs(options.emitDecoratorMetadata, "--emitDecoratorMetadata");
        maybePushToArgs(options.declaration, "--declaration");
        maybePushToArgs(options.noImplicitAny, "--noImplicitAny");
        maybePushToArgs(options.noResolve, "--noResolve");
        maybePushToArgs(options.noEmitOnError, "--noEmitOnError");
        maybePushToArgs(options.noEmit, "--noEmit");
        maybePushToArgs(options.preserveConstEnums, "--preserveConstEnums");
        maybePushToArgs(options.suppressImplicitAnyIndexErrors, "--suppressImplicitAnyIndexErrors");
        maybePushToArgs(options.inlineSources, "--inlineSources");
        maybePushToArgs(options.inlineSourceMap, "--inlineSourceMap");
        maybePushToArgs(options.newLine, "--newLine", options.newLine);
        maybePushToArgs(options.module, "--module", toLowerOrNull(options.module));
    }
    function toLowerOrNull(input) {
        if (input) {
            return input.toLocaleLowerCase();
        }
        return null;
    }
    function ifTruthyPush(pushToThis, thingToTest) {
        var whatToPush = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            whatToPush[_i - 2] = arguments[_i];
        }
        if (thingToTest) {
            pushToThis.push.apply(pushToThis, whatToPush);
        }
    }
})(compiler || (compiler = {}));
exports.default = compiler;
//# sourceMappingURL=typestrong-compiler.js.map