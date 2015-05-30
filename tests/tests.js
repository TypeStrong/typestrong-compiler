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
        typestrong_compiler_1.default.compile({ typeStrongOptions: {
                customCompiler: 'this_is_the_custom_compiler'
            } }).then(function (result) {
            test.strictEqual(result.runtimeOptions.compiler, 'this_is_the_custom_compiler');
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_resolve_node_modules_compiler: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({}).then(function (result) {
            var compilerPath = result.runtimeOptions.compiler.split(path.sep);
            test.ok(containsSuccessively(compilerPath, 'node_modules', 'typescript', 'bin', 'tsc'));
            test.done();
        }).catch(function (error) {
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
            test.ok(containsSuccessively(result.tscArgs, '--removeComments'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_outDir: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ outDir: "out/" }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--outDir', 'out/'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_out: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ out: "myOut.js" }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--out', 'myOut.js'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_sourceMap: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ sourceMap: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--sourceMap'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_sourceRoot: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ sourceRoot: "../sourceRoot/" }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--sourceRoot', "../sourceRoot/"));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_mapRoot: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ mapRoot: "../mapRoot/" }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--mapRoot', "../mapRoot/"));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_emitDecoratorMetadata: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ emitDecoratorMetadata: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--emitDecoratorMetadata'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_declaration: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ declaration: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--declaration'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_noImplicitAny: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ noImplicitAny: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noImplicitAny'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    }, can_set_noResolve: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ noResolve: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noResolve'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_noEmitOnError: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ noEmitOnError: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noEmitOnError'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_noEmit: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ noEmit: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--noEmit'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_preserveConstEnums: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ preserveConstEnums: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--preserveConstEnums'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_suppressImplicitAnyIndexErrors: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ suppressImplicitAnyIndexErrors: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--suppressImplicitAnyIndexErrors'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_inlineSources: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ inlineSources: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--inlineSources'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_inlineSourceMap: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ inlineSourceMap: true }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--inlineSourceMap'));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_newLine: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ newLine: "LF" }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--newLine', "LF"));
            test.done();
        }).catch(function (error) {
            test.done(error);
        });
    },
    can_set_module: function (test) {
        test.expect(1);
        typestrong_compiler_1.default.compile({ module: "amd" }).then(function (result) {
            test.ok(containsSuccessively(result.tscArgs, '--module', "amd"));
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
