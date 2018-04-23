"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var fsdatepick_directive_1 = require("./directives/fsdatepick.directive");
var fsdatepickrange_directive_1 = require("./directives/fsdatepickrange.directive");
var fsisscroll_directive_1 = require("./directives/fsisscroll.directive");
var fsdatepicker_component_1 = require("./components/fsdatepicker/fsdatepicker.component");
var fsdatepickerrange_component_1 = require("./components/fsdatepickerrange/fsdatepickerrange.component");
var fsdatepickersummary_component_1 = require("./components/fsdatepickersummary/fsdatepickersummary.component");
var fsdatepickerpresets_component_1 = require("./components/fsdatepickerpresets/fsdatepickerpresets.component");
var fsdatepickercalendar_component_1 = require("./components/fsdatepickercalendar/fsdatepickercalendar.component");
var fsdatepickertime_component_1 = require("./components/fsdatepickertime/fsdatepickertime.component");
var fsdatepickerfactory_service_1 = require("./services/fsdatepickerfactory.service");
var fsdatepickerrangefactory_service_1 = require("./services/fsdatepickerrangefactory.service");
var fsdatepickercommon_service_1 = require("./services/fsdatepickercommon.service");
var FsDatePickerModule = (function () {
    function FsDatePickerModule() {
    }
    FsDatePickerModule_1 = FsDatePickerModule;
    FsDatePickerModule.forRoot = function () {
        return {
            ngModule: FsDatePickerModule_1,
            providers: [fsdatepickerfactory_service_1.FsDatepickerFactory, fsdatepickerrangefactory_service_1.FsDatepickerRangeFactory, fsdatepickercommon_service_1.FsDatePickerCommon]
        };
    };
    FsDatePickerModule = FsDatePickerModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatButtonModule,
                material_2.MatTabsModule,
                material_1.MatIconModule,
                material_1.MatMenuModule
            ],
            exports: [
                fsdatepick_directive_1.FsDatePickDirective,
                fsdatepickrange_directive_1.FsDatePickRangeDirective
            ],
            entryComponents: [
                fsdatepicker_component_1.FsDatepickerComponent,
                fsdatepickerrange_component_1.FsDatepickerRangeComponent
            ],
            declarations: [
                fsdatepick_directive_1.FsDatePickDirective,
                fsdatepickrange_directive_1.FsDatePickRangeDirective,
                fsdatepickersummary_component_1.FsDatepickerSummaryComponent,
                fsdatepickerpresets_component_1.FsDatepickerPresetsComponent,
                fsdatepicker_component_1.FsDatepickerComponent,
                fsdatepickerrange_component_1.FsDatepickerRangeComponent,
                fsisscroll_directive_1.FsIsscrollDirective,
                fsdatepickercalendar_component_1.FsDatePickerCalendarComponent,
                fsdatepickertime_component_1.FsDatePickerTimeComponent
            ],
            providers: [
                fsdatepickerfactory_service_1.FsDatepickerFactory,
                fsdatepickerrangefactory_service_1.FsDatepickerRangeFactory,
                fsdatepickercommon_service_1.FsDatePickerCommon
            ],
        })
    ], FsDatePickerModule);
    return FsDatePickerModule;
    var FsDatePickerModule_1;
}());
exports.FsDatePickerModule = FsDatePickerModule;
//# sourceMappingURL=fsdatepicker.module.js.map