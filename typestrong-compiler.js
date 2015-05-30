var es6_promise_1 = require('es6-promise');
var _ = require('lodash');
var locateTSC_1 = require('./locateTSC');
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
            executeCompile(options, result);
            resolve(result);
        });
    }
    compiler.compile = compile;
    function executeCompile(options, results) {
        if (!options.testOptions.testOnly) {
        }
    }
    function normalizeOptions(options) {
        options = options || {};
        options.typeStrongOptions = options.typeStrongOptions || {};
        options.testOptions = options.testOptions || { testOnly: false };
    }
    function extractAndSetArgs(options, args) {
        var maybePushToArgs = _.partial(ifTruthyPush, args);
        maybePushToArgs(options.target, "--target", options.target);
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
        maybePushToArgs(options.module, "--module", options.module);
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
