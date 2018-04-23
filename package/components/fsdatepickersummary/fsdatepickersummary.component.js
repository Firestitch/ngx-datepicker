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
var fsdatepickercommon_service_1 = require("./../../services/fsdatepickercommon.service");
var fsdatepickermodel_service_1 = require("./../../services/fsdatepickermodel.service");
var FsDatepickerSummaryComponent = (function () {
    function FsDatepickerSummaryComponent(fsDatePickerCommon, fsDatePickerModel) {
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatePickerModel = fsDatePickerModel;
        this.startDate = null;
        this.endDate = null;
        this.componentsChange = new core_1.EventEmitter();
        // @Output() viewChange = new EventEmitter<any>();
        this.formattedStartDate = null;
        this.formattedEndDate = null;
    }
    FsDatepickerSummaryComponent.prototype.ngOnInit = function () {
    };
    FsDatepickerSummaryComponent.prototype.ngOnChanges = function (changes) {
        this.formattedStartDate = null;
        this.formattedEndDate = null;
        if (changes && changes.startDate && changes.startDate.currentValue) {
            this.formattedStartDate = {
                date: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue),
                time: this.fsDatePickerCommon.formatSummary(changes.startDate.currentValue, 'time')
            };
        }
        if (changes && changes.endDate && changes.endDate.currentValue) {
            this.formattedEndDate = {
                date: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue),
                time: this.fsDatePickerCommon.formatSummary(changes.endDate.currentValue, 'time')
            };
        }
        // this.viewChange.emit(this.formattedStartDate || this.formattedEndDate ? true : false);
    };
    FsDatepickerSummaryComponent.prototype.onComponentsChange = function (view) {
        this.componentsChange.emit(view);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerSummaryComponent.prototype, "startDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerSummaryComponent.prototype, "endDate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatepickerSummaryComponent.prototype, "componentsChange", void 0);
    FsDatepickerSummaryComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerSummary',
            templateUrl: './fsdatepickersummary.component.html',
            styleUrls: ['./fsdatepickersummary.component.css'],
        }),
        __metadata("design:paramtypes", [fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickermodel_service_1.FsDatePickerModel])
    ], FsDatepickerSummaryComponent);
    return FsDatepickerSummaryComponent;
}());
exports.FsDatepickerSummaryComponent = FsDatepickerSummaryComponent;
//# sourceMappingURL=fsdatepickersummary.component.js.map