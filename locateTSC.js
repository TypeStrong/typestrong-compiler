var path = require('path');
var locateTSC;
(function (locateTSC) {
    "use strict";
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
            var binPath = resolveTypeScriptBinPath();
            results.runtimeOptions.compiler = path.join(binPath, 'tsc');
        }
    }
    locateTSC.locate = locate;
})(locateTSC || (locateTSC = {}));
exports.default = locateTSC;
//# sourceMappingURL=locateTSC.js.map