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
var fsdatepickercommon_service_1 = require("./../../services/fsdatepickercommon.service");
var fsdatepickermodel_service_1 = require("./../../services/fsdatepickermodel.service");
var FsDatePickerTimeComponent = (function () {
    function FsDatePickerTimeComponent(element, fsDatePickerCommon, fsDatePickerModel, fsUtil, _iterableDiffers) {
        this.element = element;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatePickerModel = fsDatePickerModel;
        this.fsUtil = fsUtil;
        this._iterableDiffers = _iterableDiffers;
        this.disabledMinutes = [];
        this.disabledHours = [];
        this.disabledTimes = [];
        this.onChange = new core_1.EventEmitter();
        this.selected = {};
        this.disabledTimeMinutes = {};
        this.disabledTimeHours = {};
        this.disabledGroupedMinutes = {};
        this.disabledMinutesDiffer = null;
        this.disabledHoursDiffer = null;
        this.disabledTimesDiffer = null;
        this.timeHours = [[0, 12], [1, 13], [2, 14], [3, 15], [4, 16], [5, 17], [6, 18], [7, 19], [8, 20], [9, 21], [10, 22], [11, 23]];
        this.timeMinutes = [[0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29],
            [30, 31, 32, 33, 34],
            [35, 36, 37, 38, 39],
            [40, 41, 42, 43, 44],
            [45, 46, 47, 48, 49],
            [50, 51, 52, 53, 54],
            [55, 56, 57, 58, 59]];
        this.disabledHoursDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledMinutesDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledTimesDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatePickerTimeComponent.prototype.ngOnInit = function () {
        this.checkDisabledTime();
    };
    FsDatePickerTimeComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.date) {
            this.selected = this.fsDatePickerCommon.getSelected(this.date);
        }
    };
    FsDatePickerTimeComponent.prototype.ngDoCheck = function () {
        if (this.disabledHoursDiffer.diff(this.disabledHours) ||
            this.disabledMinutesDiffer.diff(this.disabledMinutes) ||
            this.disabledTimesDiffer.diff(this.disabledTimes)) {
            this.checkDisabledTime();
        }
    };
    FsDatePickerTimeComponent.prototype.checkDisabledTime = function () {
        this.disabledTimeMinutes = {};
        this.disabledTimeHours = {};
        this.disabledGroupedMinutes = {};
        if (this.disabledMinutes !== undefined) {
            for (var _i = 0, _a = this.disabledMinutes; _i < _a.length; _i++) {
                var range = _a[_i];
                this.addDisabledMinutes(range);
            }
            ;
        }
        if (this.disabledHours !== undefined) {
            for (var _b = 0, _c = this.disabledHours; _b < _c.length; _b++) {
                var range = _c[_b];
                this.addDisabledHours(range);
            }
            ;
        }
        if (this.disabledTimes !== undefined) {
            for (var _d = 0, _e = this.disabledTimes; _d < _e.length; _d++) {
                var range = _e[_d];
                var min = Math.min(range[0], range[1]);
                var max = Math.max(range[0], range[1]);
                var minMinutes = min % 60;
                var maxMinutes = max % 60;
                var minHour = Math.floor(min / 60);
                var maxHour = Math.floor(max / 60);
                for (var h = 0; h <= 24; h++) {
                    this.disabledGroupedMinutes[h] = {};
                    if (h > minHour && h < maxHour) {
                        this.addDisabledHours([h, h]);
                    }
                    else if (h == minHour && !minMinutes) {
                        this.addDisabledHours([h, h]);
                    }
                    if (h == minHour) {
                        for (var m = minMinutes; m < 60; m++) {
                            this.disabledGroupedMinutes[h][m] = true;
                        }
                    }
                    if (h == maxHour) {
                        for (var m = 0; m < maxMinutes; m++) {
                            this.disabledGroupedMinutes[h][m] = true;
                        }
                    }
                }
            }
            ;
        }
    };
    FsDatePickerTimeComponent.prototype.addDisabledMinutes = function (range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (this.fsUtil.isArray(range)) {
            for (var i = min; i <= max; i++) {
                this.disabledTimeMinutes[i] = true;
            }
        }
        else {
            this.disabledTimeMinutes[range] = true;
        }
    };
    FsDatePickerTimeComponent.prototype.addDisabledHours = function (range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (this.fsUtil.isArray(range)) {
            for (var i = min; i <= max; i++) {
                this.disabledTimeHours[i] = true;
            }
        }
        else {
            this.disabledTimeHours[range] = true;
        }
    };
    FsDatePickerTimeComponent.prototype.createModel = function () {
        if (!this.date) {
            this.setDate(this.fsDatePickerCommon.createMoment());
        }
    };
    FsDatePickerTimeComponent.prototype.setDate = function (date) {
        this.date = date;
        this.onChange.emit(date);
    };
    FsDatePickerTimeComponent.prototype.hourClick = function (hour) {
        if (this.disabledTimeHours[hour]) {
            return;
        }
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().hour(hour));
    };
    FsDatePickerTimeComponent.prototype.minuteClick = function (minute) {
        if (this.disabledTimeMinutes[minute]) {
            return;
        }
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().minute(minute));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "disabledMinutes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "disabledHours", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "disabledTimes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerTimeComponent.prototype, "onChange", void 0);
    FsDatePickerTimeComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerTime',
            templateUrl: './fsdatepickertime.component.html',
            styleUrls: ['./fsdatepickertime.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickermodel_service_1.FsDatePickerModel,
            common_1.FsUtil, core_1.IterableDiffers])
    ], FsDatePickerTimeComponent);
    return FsDatePickerTimeComponent;
}());
exports.FsDatePickerTimeComponent = FsDatePickerTimeComponent;
//# sourceMappingURL=fsdatepickertime.component.js.map