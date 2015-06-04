import * as path from 'path';
import * as fs from 'fs';
import i from 'interfaces';

module locateTSC {

  // TODO: log the actual version used...
  // grunt.log.writeln('Using tsc v' + pkg.version);
  // var pkg = JSON.parse(fs.readFileSync(path.resolve(binPath, '..', 'package.json')).toString());

  function resolveTypeScriptBinPath(): string {
      var ownRoot = path.resolve(path.dirname((module).filename));
      var binSub = path.join('node_modules', 'typescript', 'bin');
      return path.join(ownRoot, binSub);
  }

  export function locate(options: i.compilerOptions, results: i.compilerResult): void {
    if (options.typeStrongOptions.customCompiler) {
      results.runtimeOptions.compiler = options.typeStrongOptions.customCompiler;
    } else {
      if (options.testOptions.testOnly) {
        results.runtimeOptions.compiler = "test_tsc";
      } else {
        var binPath = resolveTypeScriptBinPath();
        results.runtimeOptions.compiler = path.join(binPath, 'tsc');
      }
    }
  }

}

export {locateTSC as default};
