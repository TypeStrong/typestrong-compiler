"use strict";

import * as nodeunit from 'nodeunit';
import compiler from '../typestrong-compiler';
import {Promise as Promise} from 'es6-promise';
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
      compiler.compile({typeStrongOptions: {
          customCompiler: 'this_is_the_custom_compiler'
        }}).then((result) => {
        test.strictEqual(result.runtimeOptions.compiler,
          'this_is_the_custom_compiler');
        test.done();
      }).catch((error) => {
        test.done(error);
      });
  },
  can_resolve_node_modules_compiler: (test: nodeunit.Test) => {
      test.expect(1);
      compiler.compile({}).then((result) => {
        var compilerPath = result.runtimeOptions.compiler.split(path.sep);
        test.ok(containsSuccessively(compilerPath,
          'node_modules', 'typescript', 'bin', 'tsc'));
        test.done();
      }).catch((error) => {
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
        compiler.compile({target: 'es3'}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--target', 'es3'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_removeComments: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({removeComments: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--removeComments'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_outDir: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({outDir: "out/"}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--outDir', 'out/'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_out: (test: nodeunit.Test) => {
        // despite that it makes Bas mad...
        test.expect(1);
        compiler.compile({out: "myOut.js"}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--out', 'myOut.js'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_sourceMap: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({sourceMap: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--sourceMap'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_sourceRoot: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({sourceRoot: "../sourceRoot/"}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--sourceRoot', "../sourceRoot/"));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_mapRoot: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({mapRoot: "../mapRoot/"}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--mapRoot', "../mapRoot/"));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_emitDecoratorMetadata: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({emitDecoratorMetadata: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--emitDecoratorMetadata'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_declaration: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({declaration: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--declaration'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_noImplicitAny: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({noImplicitAny: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noImplicitAny'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },can_set_noResolve: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({noResolve: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noResolve'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_noEmitOnError: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({noEmitOnError: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noEmitOnError'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_noEmit: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({noEmit: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--noEmit'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_preserveConstEnums: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({preserveConstEnums: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--preserveConstEnums'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_suppressImplicitAnyIndexErrors: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({suppressImplicitAnyIndexErrors: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--suppressImplicitAnyIndexErrors'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_inlineSources: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({inlineSources: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--inlineSources'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_inlineSourceMap: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({inlineSourceMap: true}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--inlineSourceMap'));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_newLine: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({newLine: "LF"}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--newLine', "LF"));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    },
    can_set_module: (test: nodeunit.Test) => {
        test.expect(1);
        compiler.compile({module: "amd"}).then((result) => {
          test.ok(containsSuccessively(result.tscArgs, '--module', "amd"));
          test.done();
        }).catch((error) => {
          test.done(error);
        });
    }
};

function contains<T>(searchIn: T[], searchFor: T) {
  return (searchIn.indexOf(searchFor) > -1);
}

function containsSuccessively<T>(searchIn: T[], searchFor: T, ...thenSearchFor: T[]) {
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
