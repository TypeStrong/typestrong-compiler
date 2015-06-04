var path = require('path');
var locateTSC;
(function (locateTSC) {
    function resolveTypeScriptBinPath() {
        var ownRoot = path.resolve(path.dirname((module).filename));
        var binSub = path.join('node_modules', 'typescript', 'bin');
        return path.join(ownRoot, binSub);
    }
    function locate(options, results) {
        if (options.typeStrongOptions.customCompiler) {
            results.runtimeOptions.compiler = options.typeStrongOptions.customCompiler;
        }
        else {
            if (options.testOptions.testOnly) {
                results.runtimeOptions.compiler = "test_tsc";
            }
            else {
                var binPath = resolveTypeScriptBinPath();
                results.runtimeOptions.compiler = path.join(binPath, 'tsc');
            }
        }
    }
    locateTSC.locate = locate;
})(locateTSC || (locateTSC = {}));
exports.default = locateTSC;
