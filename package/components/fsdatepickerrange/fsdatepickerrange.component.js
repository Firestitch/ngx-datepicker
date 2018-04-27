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
var fsdatepickercommon_service_1 = require("./../../services/fsdatepickercommon.service");
var moment = require("moment-timezone");
var FsDatepickerRangeComponent = (function () {
    function FsDatepickerRangeComponent(fsDatePickerModel, fsDatePickerCommon, element, _iterableDiffers) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.element = element;
        this._iterableDiffers = _iterableDiffers;
        this.parentInstance = null;
        this.toDisabledDays = [];
        this.toDisabledTimes = [];
        this.startCalendarMonth = null;
        this.endCalendarMonth = null;
        this.highlightStartDate = null;
        this.highlightEndDate = null;
        this.modelDiffer = null;
        this.modelDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatepickerRangeComponent.prototype.ngOnInit = function () {
        this.calendarsDrawMonth(this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd);
    };
    FsDatepickerRangeComponent.prototype.ngDoCheck = function () {
        if (this.modelDiffer.diff([this.parentInstance.ngModelStart, this.parentInstance.ngModelEnd])) {
            var startDate = this.parentInstance.ngModelStart;
            var endDate = this.parentInstance.ngModelEnd;
            // Don't remove
            // this.toDisabledDaysUpdate(startDate, endDate);
            this.toDisabledTimesUpdate(startDate, endDate);
            this.highlightStartDate = startDate;
            this.highlightEndDate = endDate || startDate;
        }
    };
    FsDatepickerRangeComponent.prototype.setStartDate = function (date) {
        var startDate = date;
        var endDate = this.parentInstance.ngModelEnd;
        this.setDates(startDate, endDate);
        if (startDate && endDate) {
            if (moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM')) {
                this.endCalendarDrawMonth(moment(endDate).add(1, 'month'));
            }
            else {
                this.endCalendarDrawMonth(endDate);
            }
        }
        if (startDate) {
            this.startCalendarDrawMonth(startDate);
        }
    };
    FsDatepickerRangeComponent.prototype.setEndDate = function (date) {
        var startDate = date;
        var endDate = this.parentInstance.ngModelEnd;
        this.setDates(startDate, endDate);
        if (date) {
            this.endCalendarDrawMonth(date);
        }
    };
    FsDatepickerRangeComponent.prototype.setStartTime = function (date) {
        var endDate = this.parentInstance.ngModelEnd;
        // In time mode, if end date is empty - user not able switch to end time picker
        if (this.fsDatePickerModel.view === 'time' && !endDate) {
            endDate = date;
        }
        if (date && endDate && date.isAfter(endDate)) {
            endDate = date;
        }
        this.parentInstance.writeValue(date, endDate);
    };
    FsDatepickerRangeComponent.prototype.setEndTime = function (date) {
        this.parentInstance.writeValue(this.parentInstance.ngModelStart, date);
    };
    FsDatepickerRangeComponent.prototype.setDates = function (startDate, endDate) {
        if (this.parentInstance.ngModelStart && !this.parentInstance.ngModelEnd) {
            endDate = startDate;
            startDate = this.parentInstance.ngModelStart;
        }
        else if (this.parentInstance.ngModelStart && this.parentInstance.ngModelEnd) {
            endDate = null;
        }
        if (startDate && endDate && startDate.isAfter(endDate)) {
            startDate = endDate;
            endDate = null;
        }
        this.parentInstance.writeValue(startDate, endDate);
    };
    FsDatepickerRangeComponent.prototype.onDatesChange = function (data) {
        this.setDates(data.start, data.end);
        this.calendarsDrawMonth(data.start, data.end);
    };
    FsDatepickerRangeComponent.prototype.toDisabledDaysUpdate = function (startDate, endDate) {
        this.toDisabledDays = startDate ? [[moment().subtract(99, 'year'), startDate.clone()]] : [];
    };
    FsDatepickerRangeComponent.prototype.toDisabledTimesUpdate = function (startDate, endDate) {
        this.toDisabledTimes = [];
        if (startDate && endDate && startDate.isSame(endDate, 'day')) {
            var from = parseInt(startDate.format('m')) + (parseInt(startDate.format('H')) * 60);
            var to = parseInt(endDate.format('m')) + (parseInt(endDate.format('H')) * 60);
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
    FsDatepickerRangeComponent.prototype.setComponents = function (data) {
        this.fsDatePickerModel.components = data;
    };
    FsDatepickerRangeComponent.prototype.calendarsDrawMonth = function (startDate, endDate) {
        this.endCalendarDrawMonth(endDate);
        this.startCalendarDrawMonth(startDate);
    };
    FsDatepickerRangeComponent.prototype.startCalendarDrawMonth = function (date) {
        this.startCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
        if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
            this.endCalendarMonth = moment(this.startCalendarMonth).add(1, 'month');
        }
    };
    FsDatepickerRangeComponent.prototype.endCalendarDrawMonth = function (date) {
        this.endCalendarMonth = this.fsDatePickerCommon.getMomentSafe(date);
        if (this.rangeCalendarsConflict(this.startCalendarMonth, this.endCalendarMonth)) {
            this.startCalendarMonth = moment(this.endCalendarMonth).subtract(1, 'month');
        }
    };
    FsDatepickerRangeComponent.prototype.rangeCalendarsConflict = function (startDate, endDate) {
        return moment(startDate).isAfter(endDate) ||
            moment(startDate).format('YYYY-MM') === moment(endDate).format('YYYY-MM');
    };
    FsDatepickerRangeComponent.prototype.hoverCalendar = function (day) {
        var date = moment(day.date);
        if (this.parentInstance.ngModelStart &&
            !this.parentInstance.ngModelEnd &&
            moment(this.parentInstance.ngModelStart).isBefore(date)) {
            this.highlightEndDate = date;
        }
        else {
            this.highlightEndDate = this.parentInstance.ngModelEnd;
        }
    };
    FsDatepickerRangeComponent.prototype.onMouseLeaveCalendar = function () {
        this.highlightEndDate = this.parentInstance.ngModelEnd;
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
            fsdatepickercommon_service_1.FsDatePickerCommon,
            core_1.ElementRef,
            core_1.IterableDiffers])
    ], FsDatepickerRangeComponent);
    return FsDatepickerRangeComponent;
}());
exports.FsDatepickerRangeComponent = FsDatepickerRangeComponent;
//# sourceMappingURL=fsdatepickerrange.component.js.map