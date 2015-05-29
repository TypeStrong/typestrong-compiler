var es6_promise_1 = require('es6-promise');
var _ = require('lodash');
var compiler;
(function (compiler) {
    "use strict";
    function compile(normalizedOptions) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var args = [];
            extractAndSetArgs(normalizedOptions, args);
            resolve({
                tscArgs: args,
                consoleOutput: null,
                actualVersion: null
            });
        });
    }
    compiler.compile = compile;
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
