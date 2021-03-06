var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../types", "../scope", "../interpreter", "../tclerror"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var types_1 = require("../types");
    var scope_1 = require("../scope");
    var interpreter_1 = require("../interpreter");
    var tclerror_1 = require("../tclerror");
    function Load(scope) {
        var _this = this;
        scope.defineProc('while', function (interpreter, args, command, helpers) { return __awaiter(_this, void 0, void 0, function () {
            var expression, code, newScope, newInterpreter, checkLoop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = args;
                        expression = args[0];
                        code = args[1];
                        newScope = new scope_1.Scope(interpreter.getScope());
                        newScope.setSetting('loop', true);
                        newInterpreter = new interpreter_1.Interpreter(interpreter.getTcl(), code, newScope);
                        _a.label = 1;
                    case 1: return [4, helpers.solveExpression(expression)];
                    case 2:
                        if (!_a.sent()) return [3, 4];
                        newInterpreter.reset();
                        return [4, newInterpreter.run()];
                    case 3:
                        _a.sent();
                        checkLoop = newScope.getSetting('loop');
                        if (checkLoop && typeof checkLoop !== 'boolean' && checkLoop.break)
                            return [3, 4];
                        newScope.setSetting('loop', true);
                        return [3, 1];
                    case 4: return [2, new types_1.TclSimple('')];
                }
            });
        }); }, {
            arguments: {
                pattern: "while test body",
                textOnly: true,
                amount: 2,
            },
        });
        scope.defineProc('for', function (interpreter, args, command, helpers) { return __awaiter(_this, void 0, void 0, function () {
            var start, test, next, code, newScope, startInterpreter, newInterpreter, nextInterpreter, checkLoop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = args;
                        start = args[0], test = args[1], next = args[2], code = args[3];
                        newScope = new scope_1.Scope(interpreter.getScope());
                        startInterpreter = new interpreter_1.Interpreter(interpreter.getTcl(), start, newScope);
                        return [4, startInterpreter.run()];
                    case 1:
                        _a.sent();
                        newScope.setSetting('loop', true);
                        newInterpreter = new interpreter_1.Interpreter(interpreter.getTcl(), code, newScope);
                        nextInterpreter = new interpreter_1.Interpreter(interpreter.getTcl(), next, newScope);
                        _a.label = 2;
                    case 2: return [4, helpers.solveExpression(test)];
                    case 3:
                        if (!_a.sent()) return [3, 6];
                        newInterpreter.reset();
                        return [4, newInterpreter.run()];
                    case 4:
                        _a.sent();
                        checkLoop = newScope.getSetting('loop');
                        if (checkLoop && typeof checkLoop !== 'boolean' && checkLoop.break)
                            return [3, 6];
                        newScope.setSetting('loop', true);
                        nextInterpreter.reset();
                        return [4, nextInterpreter.run()];
                    case 5:
                        _a.sent();
                        return [3, 2];
                    case 6: return [2, new types_1.TclSimple('')];
                }
            });
        }); }, {
            arguments: {
                pattern: "for start test next body",
                textOnly: true,
                amount: 4,
            },
        });
        scope.defineProc('break', function (interpreter, args, command, helpers) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!interpreter.getScope().getSetting('loop'))
                    throw new tclerror_1.TclError('executed break outside of loop');
                interpreter.getScope().setSubSetting('loop', 'break', true);
                return [2, new types_1.TclSimple('')];
            });
        }); }, {
            arguments: {
                pattern: "break",
                amount: 0,
            },
        });
        scope.defineProc('continue', function (interpreter, args, command, helpers) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!interpreter.getScope().getSetting('loop'))
                    throw new tclerror_1.TclError('executed continue outside of loop');
                interpreter.getScope().setSubSetting('loop', 'continue', true);
                return [2, new types_1.TclSimple('')];
            });
        }); }, {
            arguments: {
                pattern: "continue",
                amount: 0,
            },
        });
    }
    exports.Load = Load;
});
//# sourceMappingURL=loops.js.map