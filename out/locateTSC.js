var path = require('path');
var fs = require('fs');
var locateTSC;
(function (locateTSC) {
    function resolveTypeScriptBinPath() {
        var ownRoot = path.resolve(path.dirname((module).filename));
        var userRoot = path.resolve(ownRoot, '..', '..');
        var binSub = path.join('node_modules', 'typescript', 'bin');
        if (fs.existsSync(path.join(userRoot, binSub))) {
            return path.join(userRoot, binSub);
        }
        return path.join(ownRoot, binSub);
    }
    function locate(options, results) {
        if (options.typeStrongOptions.customCompiler) {
            results.runtimeOptions.compiler = options.typeStrongOptions.customCompiler;
        }
        else {
            var binPath = resolveTypeScriptBinPath();
            results.runtimeOptions.compiler = path.join(binPath, 'tsc');
        }
    }
    locateTSC.locate = locate;
})(locateTSC || (locateTSC = {}));
exports.default = locateTSC;
