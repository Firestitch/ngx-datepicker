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
var fsdatepicker_directive_1 = require("./fsdatepicker.directive");
var fsdatepickerdialog_component_1 = require("./fsdatepickerdialog.component");
var fsdatepickerdialogfactory_service_1 = require("./fsdatepickerdialogfactory.service");
var common_2 = require("@firestitch/common");
var fsisscroll_directive_1 = require("./fsisscroll.directive");
var FsDatepickerModule = (function () {
    function FsDatepickerModule() {
    }
    FsDatepickerModule_1 = FsDatepickerModule;
    FsDatepickerModule.forRoot = function () {
        return {
            ngModule: FsDatepickerModule_1,
            providers: [fsdatepickerdialogfactory_service_1.FsDatepickerDialogFactory]
        };
    };
    FsDatepickerModule = FsDatepickerModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                common_2.FsCommonModule,
                material_1.MatButtonModule,
                material_1.MatIconModule
            ],
            exports: [
                fsdatepicker_directive_1.FsDatepickerDirective
            ],
            entryComponents: [
                fsdatepickerdialog_component_1.FsDatepickerDialogComponent
            ],
            declarations: [
                fsdatepicker_directive_1.FsDatepickerDirective,
                fsdatepickerdialog_component_1.FsDatepickerDialogComponent,
                fsisscroll_directive_1.FsIsscrollDirective
            ],
            providers: [
                fsdatepickerdialogfactory_service_1.FsDatepickerDialogFactory
            ],
        })
    ], FsDatepickerModule);
    return FsDatepickerModule;
    var FsDatepickerModule_1;
}());
exports.FsDatepickerModule = FsDatepickerModule;
//# sourceMappingURL=fsdatepicker.module.js.map