"use strict";
var typestrong_compiler_1 = require('../typestrong-compiler');
var path = require('path');
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
exports.compilerIntegrationTests = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    can_set_custom_compiler: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.typeStrongOptions.customCompiler = 'this_is_the_custom_compiler';
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.strictEqual(result.runtimeOptions.compiler, 'this_is_the_custom_compiler');
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_resolve_node_modules_compiler: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            var compilerPath = result.runtimeOptions.compiler.split(path.sep);
            test.ok(containsSuccessively(compilerPath, 'node_modules', 'typescript', 'bin', 'tsc'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_compile_simple_project: function (test) {
        test.expect(3);
        var opt = typestrong_compiler_1.default.defaultCompilerOptions();
        opt.files = ['tests/artifacts/zoo.ts'];
        opt.typeStrongOptions.silent = false;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            console.log("hi");
            test.strictEqual(result.consoleOutput.stdout.toString(), "");
            test.strictEqual(result.consoleOutput.stderr.toString(), "");
            test.strictEqual(result.consoleOutput.error, null);
            console.log("bye");
            test.done();
        }, function (error) {
            test.done(error);
        });
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
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.target = 'es3';
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--target', 'es3'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_removeComments: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.removeComments = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--removeComments'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_outDir: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.outDir = "out/";
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--outDir', 'out/'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_out: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.out = "myOut.js";
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--out', 'myOut.js'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_sourceMap: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.sourceMap = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--sourceMap'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_sourceRoot: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.sourceRoot = "../sourceRoot/";
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--sourceRoot', "../sourceRoot/"));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_mapRoot: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.mapRoot = "../mapRoot/";
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--mapRoot', "../mapRoot/"));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_emitDecoratorMetadata: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.emitDecoratorMetadata = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--emitDecoratorMetadata'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_declaration: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.declaration = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--declaration'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_noImplicitAny: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.noImplicitAny = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noImplicitAny'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    }, can_set_noResolve: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.noResolve = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noResolve'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_noEmitOnError: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.noEmitOnError = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noEmitOnError'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_noEmit: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.noEmit = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noEmit'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_preserveConstEnums: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.preserveConstEnums = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--preserveConstEnums'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_suppressImplicitAnyIndexErrors: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.suppressImplicitAnyIndexErrors = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--suppressImplicitAnyIndexErrors'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_inlineSources: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.inlineSources = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--inlineSources'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_inlineSourceMap: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.inlineSourceMap = true;
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--inlineSourceMap'));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_newLine: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.newLine = 'LF';
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--newLine', "LF"));
            test.done();
        }, function (error) {
            test.done(error);
        });
    },
    can_set_module: function (test) {
        test.expect(1);
        var opt = typestrong_compiler_1.default.testCompilerOptions();
        opt.module = 'AMD';
        typestrong_compiler_1.default.compile(opt).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--module', "amd"));
            test.done();
        }, function (error) {
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
        if (!thenSearchFor || thenSearchFor.length === 0) {
            return true;
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
