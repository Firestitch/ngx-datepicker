"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsdatepicker_directive_1 = require("./fsdatepicker.directive");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
exports.DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return fsdatepicker_directive_1.FsDatepickerDirective; }),
    multi: true
};
//# sourceMappingURL=fsdatepicker.value-accessor.js.map