"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fsdatepickermodel_service_1 = require("./../../services/fsdatepickermodel.service");
var FsDatepickerPresetsComponent = (function () {
    function FsDatepickerPresetsComponent(fsDatePickerModel) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.datesChange = new core_1.EventEmitter();
        this.presets = [];
    }
    FsDatepickerPresetsComponent.prototype.ngOnInit = function () {
        this.presets = this.fsDatePickerModel.presets;
    };
    FsDatepickerPresetsComponent.prototype.setPreset = function (preset) {
        this.datesChange.emit(preset.value);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatepickerPresetsComponent.prototype, "datesChange", void 0);
    FsDatepickerPresetsComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerPresets',
            templateUrl: './fsdatepickerpresets.component.html',
            styleUrls: ['./fsdatepickerpresets.component.css']
        }),
        __metadata("design:paramtypes", [fsdatepickermodel_service_1.FsDatePickerModel])
    ], FsDatepickerPresetsComponent);
    return FsDatepickerPresetsComponent;
}());
exports.FsDatepickerPresetsComponent = FsDatepickerPresetsComponent;
//# sourceMappingURL=fsdatepickerpresets.component.js.map