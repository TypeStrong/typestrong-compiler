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
        var pushToArgs = _.partial(ifTruthyPush, args);
        pushToArgs(options.target, "--target", options.target);
        pushToArgs(options.removeComments, "--removeComments");
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
