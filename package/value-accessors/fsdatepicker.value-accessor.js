"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsdatepick_directive_1 = require("./../directives/fsdatepick.directive");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
exports.DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return fsdatepick_directive_1.FsDatePickDirective; }),
    multi: true
};
//# sourceMappingURL=fsdatepicker.value-accessor.js.map