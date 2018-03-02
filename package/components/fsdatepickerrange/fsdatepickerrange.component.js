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
var common_1 = require("@firestitch/common");
var fsdatepickermodel_service_1 = require("./../../services/fsdatepickermodel.service");
var moment = require("moment-timezone");
var FsDatepickerRangeComponent = (function () {
    function FsDatepickerRangeComponent(fsDatePickerModel, element, fsUtil, _iterableDiffers) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.element = element;
        this.fsUtil = fsUtil;
        this._iterableDiffers = _iterableDiffers;
        this.parentInstance = null;
        this.toDisabledDays = [];
        this.toDisabledTimes = [];
        this.modelDiffer = null;
        this.modelDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatepickerRangeComponent.prototype.ngOnInit = function () { };
    FsDatepickerRangeComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.modelDiffer.diff([this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd])) {
            var startDate = this.parentInstance.ngModelStart;
            var endDate_1 = this.parentInstance.ngModelEnd;
            if (startDate && endDate_1 && endDate_1.isBefore(startDate)) {
                endDate_1 = startDate.isSame(endDate_1, 'day') ? startDate : undefined;
                setTimeout(function () {
                    _this.setEndDate(endDate_1);
                });
            }
            this.toDisabledDaysUpdate(startDate, endDate_1);
            this.toDisabledTimesUpdate(startDate, endDate_1);
        }
    };
    FsDatepickerRangeComponent.prototype.setStartDate = function (date) {
        this.parentInstance.writeValue(date, this.parentInstance.ngModelEnd);
    };
    FsDatepickerRangeComponent.prototype.setEndDate = function (date) {
        this.parentInstance.writeValue(this.parentInstance.ngModelStart, date);
    };
    FsDatepickerRangeComponent.prototype.toDisabledDaysUpdate = function (startDate, endDate) {
        this.toDisabledDays = startDate ? [[moment().subtract(99, 'year'), startDate.clone()]] : [];
    };
    FsDatepickerRangeComponent.prototype.toDisabledTimesUpdate = function (startDate, endDate) {
        this.toDisabledTimes = [];
        if (startDate && endDate && startDate.isSame(endDate, 'day')) {
            var from = this.fsUtil.int(startDate.format('m')) + (this.fsUtil.int(startDate.format('H')) * 60);
            var to = this.fsUtil.int(endDate.format('m')) + (this.fsUtil.int(endDate.format('H')) * 60);
            if (startDate) {
                this.toDisabledTimes.push([0, from]);
            }
        }
    };
    FsDatepickerRangeComponent.prototype.setDateModeStart = function (mode) {
        this.fsDatePickerModel.dateMode.start_date = mode;
    };
    FsDatepickerRangeComponent.prototype.setDateModeEnd = function (mode) {
        this.fsDatePickerModel.dateMode.end_date = mode;
    };
    FsDatepickerRangeComponent.prototype.close = function ($event) {
        this.parentInstance.opened = false;
    };
    FsDatepickerRangeComponent.prototype.documentKeydown = function (e) {
        if (e.keyCode === 27) {
            // Be careful with preventing default events. Breaking page refresh functional
            e.preventDefault();
            this.close(e);
        }
    };
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatepickerRangeComponent.prototype, "documentKeydown", null);
    FsDatepickerRangeComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerRange',
            templateUrl: './fsdatepickerrange.component.html',
            styleUrls: ['./../../styles.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [fsdatepickermodel_service_1.FsDatePickerModel]
        }),
        __metadata("design:paramtypes", [fsdatepickermodel_service_1.FsDatePickerModel,
            core_1.ElementRef, common_1.FsUtil, core_1.IterableDiffers])
    ], FsDatepickerRangeComponent);
    return FsDatepickerRangeComponent;
}());
exports.FsDatepickerRangeComponent = FsDatepickerRangeComponent;
//# sourceMappingURL=fsdatepickerrange.component.js.map