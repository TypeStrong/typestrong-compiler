"use strict";
var typestrong_compiler_1 = require('../typestrong-compiler');
exports.testGroup = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    tests_run_at_all: function (test) {
        test.expect(1);
        test.ok(true, "Expected tests to run at all.");
        test.done();
    },
    can_import_compiler: function (test) {
        test.expect(1);
        test.ok(typestrong_compiler_1.default.compile);
        test.done();
    }
};
exports.argumentsTests = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    can_set_target: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ target: 'es3' }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--target', 'es3'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_removeComments: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ removeComments: true }).then(function (result) {
            test.ok(contains(result.tscArgs, '--removeComments'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    }
};
function contains(searchIn, searchFor) {
    return (searchIn.indexOf(searchFor) > -1);
}
function containsSuccessively(searchIn, searchFor) {
    var thenSearchFor = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        thenSearchFor[_i - 2] = arguments[_i];
    }
    try {
        var index = searchIn.indexOf(searchFor);
        if (index === -1) {
            return false;
        }
        if (index + 1 === searchIn.length) {
            return false;
        }
        for (var i = 0; i < thenSearchFor.length; i += 1) {
            if (searchIn.indexOf(thenSearchFor[i]) !== index + 1 + i) {
                return false;
            }
        }
        return true;
    }
    catch (ex) {
        return false;
    }
}
