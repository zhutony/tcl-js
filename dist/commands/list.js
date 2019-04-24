(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../types", "../tclerror"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var types_1 = require("../types");
    var tclerror_1 = require("../tclerror");
    var commands = {};
    commands.list = function (interpreter, args, varArgs) {
        args = args.map(function (arg) { return (arg.indexOf(' ') > -1 ? "{" + arg + "}" : arg); });
        return args.join(' ');
    };
    commands.lindex = function (interpreter, args, varArgs) {
        var _a;
        if (args.length === 0)
            throw new tclerror_1.TclError('wrong # args: should be "list list ?index ...?"');
        if (!(varArgs[0] instanceof types_1.TclSimple))
            throw new tclerror_1.TclError('expected list, did not receive list');
        var numArr = [];
        for (var i = 1; i < varArgs.length; i++) {
            if (!(varArgs[i] instanceof types_1.TclSimple) || !varArgs[i].isNumber())
                throw new tclerror_1.TclError('expected number, did not recieve number');
            numArr[i - 1] = varArgs[i].getNumber();
        }
        var simple = varArgs[0];
        return (_a = simple
            .getList()).getSubValue.apply(_a, numArr).getValue();
    };
    function Load(scope) {
        for (var command in commands) {
            scope.defineProc(command, commands[command]);
        }
    }
    exports.Load = Load;
});
//# sourceMappingURL=list.js.map