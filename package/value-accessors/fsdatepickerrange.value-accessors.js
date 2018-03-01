"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsdatepickrange_directive_1 = require("./../directives/fsdatepickrange.directive");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
exports.DATEPICKER_RANGE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return fsdatepickrange_directive_1.FsDatePickRangeDirective; }),
    multi: true
};
//# sourceMappingURL=fsdatepickerrange.value-accessors.js.map