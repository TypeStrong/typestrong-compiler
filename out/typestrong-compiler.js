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
            var result = {
                tscArgs: [],
                consoleOutput: null,
                actualVersion: null,
                runtimeOptions: {
                    compiler: null
                }
            };
            normalizeOptions(options);
            extractAndSetArgs(options, result.tscArgs);
            locateTSC_1.default.locate(options, result);
            executeCompile(options, result).then(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    }
    compiler.compile = compile;
    function executeCompile(options, results) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (options.testOptions.testOnly) {
                resolve(results);
            }
            var commandTempfile = utils.getTempFile('tscommand');
            if (!commandTempfile) {
                throw new Error('cannot create temp file for tscommand');
            }
            fs.writeFileSync(commandTempfile, results.tscArgs.concat(options.files).join(' '));
            var tsc = child_process_1.execFile(process.execPath, [results.runtimeOptions.compiler, ("@" + commandTempfile)], function (error, stdout, stderr) {
                results.consoleOutput = {
                    stdout: stdout,
                    stderr: stderr,
                    error: error
                };
                if (!options.typeStrongOptions.silent) {
                    console.log(stdout.toString());
                    console.log(stderr.toString());
                    console.log(JSON.stringify(error));
                }
                if (error === null) {
                    console.log("resolving happy");
                    resolve(results);
                }
                reject(results);
            });
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
                testOnly: false
            },
        };
    }
    compiler.defaultCompilerOptions = defaultCompilerOptions;
    function testCompilerOptions() {
        var opt = defaultCompilerOptions();
        opt.testOptions.testOnly = true;
        return opt;
    }
    compiler.testCompilerOptions = testCompilerOptions;
    function normalizeOptions(options) {
        options = options || {};
        options.typeStrongOptions = options.typeStrongOptions || {};
        options.testOptions = options.testOptions || { testOnly: false };
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
