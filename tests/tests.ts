"use strict";

import * as nodeunit from 'nodeunit';
import compiler from '../typestrong-compiler';
import {Promise} from 'es6-promise';
import * as path from 'path';

export var testGroup: nodeunit.ITestGroup = {
    setUp: (callback) => {
        callback();
    },
    tearDown: (callback) => {
        callback();
    },
    tests_run_at_all: (test: nodeunit.Test) => {
        test.expect(1);
        test.ok(true, "Expected tests to run at all.");
        test.done();
    },
    can_import_compiler: (test: nodeunit.Test) => {
        test.expect(1);
        test.ok(compiler.compile);
        test.done();
    }
};



export var compilerIntegrationTests: nodeunit.ITestGroup = {
  setUp: (callback) => {
      callback();
  },
  tearDown: (callback) => {
      callback();
  },
  can_set_custom_compiler: (test: nodeunit.Test) => {
      test.expect(1);
      let opt = compiler.testCompilerOptions();
      opt.typeStrongOptions.customCompiler = 'this_is_the_custom_compiler';
      compiler.compile(opt).then((result) => {
        test.strictEqual(result.runtimeOptions.compiler,
          'this_is_the_custom_compiler');
        test.done();
      }, (error) => {
        test.done(error);
      });
  },
  can_resolve_node_modules_compiler: (test: nodeunit.Test) => {
      test.expect(2);
      let opt = compiler.testCompilerOptions();
      opt.testOptions.doNotSearchForCompiler = false;
      compiler.compile(opt).then((result) => {
        test.ok(!!result.runtimeOptions.compiler, "expected compiler value");
        test.ok(containsSuccessively(
          result.runtimeOptions.compiler.split(path.sep),
          'node_modules', 'typescript', 'bin', 'tsc'),
          'expected to find TypeScript compiler under node_modules.');
        test.done();
      }, (error) => {
        test.done(error);
      });
  },
  can_compile_simple_project: (test: nodeunit.Test) => {
      test.expect(3);
      let opt = compiler.defaultCompilerOptions();
      opt.files = ['tests/artifacts/zoo.ts'];
      opt.typeStrongOptions.silent = false;
      opt.typeStrongOptions.verbose = true;
      compiler.compile(opt).then((result) => {
        test.strictEqual(result.consoleOutput.stdout.toString(),"");
        test.strictEqual(result.consoleOutput.stderr.toString(),"");
        test.strictEqual(result.consoleOutput.error,null);
        test.done();
      }, (error) => {
        test.done(error);
      });
    }
};

export var argumentsTests: nodeunit.ITestGroup = {
    setUp: (callback) => {
        callback();
    },
    tearDown: (callback) => {
        callback();
    },
    can_set_target: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.target = 'es3';
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--target', 'es3'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_removeComments: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.removeComments = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--removeComments'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_outDir: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.outDir = "out/";
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--outDir', 'out/'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_out: (test: nodeunit.Test) => {
        // despite that it makes Bas mad...
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.out = "myOut.js";
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--out', 'myOut.js'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    out_with_spaces_is_quoted: (test: nodeunit.Test) => {
        // despite that it makes Bas mad...
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.out = "/out folder/my out file.js";
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--out', '/out folder/my out file.js'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_sourceMap: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.sourceMap = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--sourceMap'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_sourceRoot: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.sourceRoot = "../sourceRoot/";
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--sourceRoot', "../sourceRoot/"));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_mapRoot: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.mapRoot = "../mapRoot/";
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--mapRoot', "../mapRoot/"));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_emitDecoratorMetadata: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.emitDecoratorMetadata = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--emitDecoratorMetadata'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_declaration: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.declaration = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--declaration'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_noImplicitAny: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.noImplicitAny = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noImplicitAny'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },can_set_noResolve: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.noResolve = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noResolve'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_noEmitOnError: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.noEmitOnError = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noEmitOnError'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_noEmit: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.noEmit = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noEmit'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_preserveConstEnums: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.preserveConstEnums = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--preserveConstEnums'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_suppressImplicitAnyIndexErrors: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.suppressImplicitAnyIndexErrors = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--suppressImplicitAnyIndexErrors'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_inlineSources: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.inlineSources = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--inlineSources'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_inlineSourceMap: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.inlineSourceMap = true;
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--inlineSourceMap'));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_newLine: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.newLine = 'LF';
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--newLine', "LF"));
          test.done();
        }, (error) => {
          test.done(error);
        });
    },
    can_set_module: (test: nodeunit.Test) => {
        test.expect(1);
        let opt = compiler.testCompilerOptions();
        opt.module = 'AMD';
        compiler.compile(opt).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--module', "amd"));
          test.done();
        }, (error) => {
          test.done(error);
        });
    }
};

function contains<T>(searchIn: T[], searchFor: T) {
  return (searchIn.indexOf(searchFor) > -1);
}

function containsSuccessively<T>(searchIn: T[], searchFor: T, ...thenSearchFor: T[]) {
  try {
    let index = searchIn.indexOf(searchFor);
    if (index === -1) {
      return false;
    }
    if (!thenSearchFor || thenSearchFor.length === 0) {
      return true;
    }
    if (index + 1 === searchIn.length) {
      return false;
    }
    for(let i = 0; i < thenSearchFor.length; i += 1) {
      if (searchIn.indexOf(thenSearchFor[i]) !== index + 1 + i) {
          return false;
      }
    }
    return true;
  } catch(ex) {
    return false;
  }

}
