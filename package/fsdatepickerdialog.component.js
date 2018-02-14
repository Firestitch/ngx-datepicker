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
var moment = require("moment-timezone");
var FsDatepickerDialogComponent = (function () {
    function FsDatepickerDialogComponent(element, FsUtil, _iterableDiffers) {
        var _this = this;
        this.element = element;
        this.FsUtil = FsUtil;
        this._iterableDiffers = _iterableDiffers;
        this.month = null;
        this.years = [];
        // tab = 'date';
        this.parentInstance = null;
        this.iscrollOptions = null;
        this.iscrollInstance = null;
        this.disabledTimeMinutes = {};
        this.disabledTimeHours = {};
        this.disabledGroupedMinutes = {};
        this.disabledDaysDiffer = null;
        this.disabledMinutesDiffer = null;
        this.disabledHoursDiffer = null;
        this.disabledTimesDiffer = null;
        this.today = {
            date: moment().format('YYYY-MM-DD'),
            month: moment().format('M'),
            year: parseInt(moment().format('YYYY'))
        };
        this.dateDays = [];
        this.monthList = [{ value: 1, name: 'January', abr: 'Jan' },
            { value: 2, name: 'February', abr: 'Feb' },
            { value: 3, name: 'March', abr: 'Mar' },
            { value: 4, name: 'April', abr: 'Apr' },
            { value: 5, name: 'May', abr: 'May' },
            { value: 6, name: 'June', abr: 'June' },
            { value: 7, name: 'July', abr: 'July' },
            { value: 8, name: 'August', abr: 'Aug' },
            { value: 9, name: 'September', abr: 'Sept' },
            { value: 10, name: 'October', abr: 'Oct' },
            { value: 11, name: 'November', abr: 'Nov' },
            { value: 12, name: 'December', abr: 'Dec' }];
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
        this.dateScroll = this.FsUtil.throttle(function (e) {
            if (e.wheelDelta > 0) {
                _this.nextMonth(_this.month);
            }
            else {
                _this.previousMonth(_this.month);
            }
        }, 50);
        this.disabledDaysDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledHoursDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledMinutesDiffer = this._iterableDiffers.find([]).create(null);
        this.disabledTimesDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatepickerDialogComponent.prototype.ngOnInit = function () {
        // this.tab = this.parentInstance.hasDate ? 'date' : 'time';
        var _this = this;
        for (var y = this.parentInstance.minYear; y < this.parentInstance.maxYear; y++) {
            this.years.push(y);
        }
        if (this.parentInstance.hasDate) {
            setTimeout(function () {
                var $date = _this.element.nativeElement.querySelector('.date');
                $date.addEventListener('mousewheel', _this.dateScroll);
            });
        }
        this.checkDisabledTime();
    };
    FsDatepickerDialogComponent.prototype.ngDoCheck = function () {
        if (this.parentInstance.disabledDays && this.disabledDaysDiffer.diff(this.parentInstance.disabledDays)) {
            if (this.parentInstance.disabledDays !== undefined && this.month) {
                for (var _i = 0, _a = this.month.weeks; _i < _a.length; _i++) {
                    var week = _a[_i];
                    for (var _b = 0, week_1 = week; _b < week_1.length; _b++) {
                        var day = week_1[_b];
                        day.disabled = this.isDayDisabled(moment(day.date));
                    }
                }
            }
        }
        if (this.disabledHoursDiffer.diff(this.parentInstance.disabledHours) ||
            this.disabledMinutesDiffer.diff(this.parentInstance.disabledMinutes) ||
            this.disabledTimesDiffer.diff(this.parentInstance.disabledTimes)) {
            this.checkDisabledTime();
        }
    };
    FsDatepickerDialogComponent.prototype.checkDisabledTime = function () {
        this.disabledTimeMinutes = {};
        this.disabledTimeHours = {};
        this.disabledGroupedMinutes = {};
        if (this.parentInstance.disabledMinutes !== undefined) {
            for (var _i = 0, _a = this.parentInstance.disabledMinutes; _i < _a.length; _i++) {
                var range = _a[_i];
                this.addDisabledMinutes(range);
            }
            ;
        }
        if (this.parentInstance.disabledHours !== undefined) {
            for (var _b = 0, _c = this.parentInstance.disabledHours; _b < _c.length; _b++) {
                var range = _c[_b];
                this.addDisabledHours(range);
            }
            ;
        }
        if (this.parentInstance.disabledTimes !== undefined) {
            for (var _d = 0, _e = this.parentInstance.disabledTimes; _d < _e.length; _d++) {
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
    FsDatepickerDialogComponent.prototype.addDisabledMinutes = function (range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (this.FsUtil.isArray(range)) {
            for (var i = min; i <= max; i++) {
                this.disabledTimeMinutes[i] = true;
            }
        }
        else {
            this.disabledTimeMinutes[range] = true;
        }
    };
    FsDatepickerDialogComponent.prototype.addDisabledHours = function (range) {
        var min = Math.min(range[0], range[1]);
        var max = Math.max(range[0], range[1]);
        if (this.FsUtil.isArray(range)) {
            for (var i = min; i <= max; i++) {
                this.disabledTimeHours[i] = true;
            }
        }
        else {
            this.disabledTimeHours[range] = true;
        }
    };
    FsDatepickerDialogComponent.prototype.updateDateDays = function () {
        var year = this.parentInstance.selected.year || 1904;
        var month = this.parentInstance.selected.month || 1;
        var max = new Date(year, month, 0).getDate();
        this.dateDays = [];
        for (var d = 1; d <= max; d++) {
            this.dateDays.push(d);
        }
        return this.dateDays;
    };
    FsDatepickerDialogComponent.prototype.monthDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatepickerDialogComponent.prototype.dayDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatepickerDialogComponent.prototype.yearDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatepickerDialogComponent.prototype.updateDate = function () {
        var m = moment([this.parentInstance.selected.year, this.parentInstance.selected.month - 1, this.parentInstance.selected.day]);
        var max = new Date(this.parentInstance.selected.year || 1904, this.parentInstance.selected.month, 0).getDate();
        if (max < this.parentInstance.selected.day) {
            this.parentInstance.selected.day = undefined;
        }
        if (m.isValid()) {
            this.setDate(m);
        }
    };
    FsDatepickerDialogComponent.prototype.close = function ($event) {
        this.parentInstance.opened = false;
    };
    FsDatepickerDialogComponent.prototype.onMouseWheel = function ($event) {
        $event.preventDefault();
    };
    FsDatepickerDialogComponent.prototype.onTouchMove = function ($event) {
        $event.preventDefault();
    };
    FsDatepickerDialogComponent.prototype.drawMonths = function (date) {
        if (!date) {
            date = this.createMoment();
        }
        this.month = this.createMonth(date);
    };
    FsDatepickerDialogComponent.prototype.createModel = function () {
        if (!this.parentInstance.getValue()) {
            this.parentInstance.writeValue(this.createMoment());
        }
    };
    FsDatepickerDialogComponent.prototype.setDate = function (date) {
        this.parentInstance.writeValue(date);
    };
    FsDatepickerDialogComponent.prototype.createMoment = function () {
        return moment().startOf('day');
    };
    FsDatepickerDialogComponent.prototype.createMonth = function (date) {
        date = date.clone().date(1);
        var days = [], weeks = [];
        var week = [];
        var md = date.clone();
        md.subtract(date.day(), 'day');
        var daysInMonth = date.daysInMonth();
        for (var d = 0; d < daysInMonth + date.day() + (6 - date.clone().add(1, 'month').day() + 1); d++) {
            var number = md.format('DD');
            days.push({ number: number });
            if (d % 7 == 0) {
                week = [];
                weeks.push(week);
            }
            week.push({ mute: (d - date.day() < 0 || ((d - date.day() + 1) > daysInMonth)),
                date: md.format('YYYY-MM-DD'),
                number: md.format('D'),
                month: md.format('M'),
                year: md.format('YYYY'),
                disabled: this.isDayDisabled(md) });
            md.add(1, 'day');
        }
        return { name: date.format('MMMM'),
            number: date.format('M'),
            year: date.format('YYYY'),
            moment: date,
            date: date.format('YYYY') + '-' + date.format('M'),
            weeks: weeks,
            months: [{ name: date.format('MMMM'), value: date.format('M') }],
            years: [date.format('YYYY')] };
    };
    FsDatepickerDialogComponent.prototype.isDayDisabled = function (md) {
        if (!this.parentInstance.disabledDays) {
            return false;
        }
        var len;
        for (var i = 0, len_1 = this.parentInstance.disabledDays.length; i < len_1; i++) {
            var value = this.parentInstance.disabledDays[i];
            if (moment.isMoment(value)) {
                if (value.format('YYYY-MM-DD') == md.format('YYYY-MM-DD')) {
                    return true;
                }
            }
            else {
                if (md.isBetween(value[0].startOf('day'), value[1].startOf('day')) || md.format('YYYY-MM-DD') == value[0].format('YYYY-MM-DD')) {
                    return true;
                }
            }
        }
        return false;
    };
    FsDatepickerDialogComponent.prototype.calendarView = function () {
        this.parentInstance.view = 'calendar';
    };
    FsDatepickerDialogComponent.prototype.monthView = function (month) {
        this.parentInstance.view = 'month';
    };
    FsDatepickerDialogComponent.prototype.yearView = function (year) {
        this.iscrollOptions = { scrollToElement: '.years [data-year="' + year + '"]' };
        this.parentInstance.view = 'year';
    };
    FsDatepickerDialogComponent.prototype.documentKeydown = function (e) {
        if (e.keyCode === 27) {
            //Be careful with preventing default events. Breaking page refresh functional
            e.preventDefault();
            this.close(e);
        }
    };
    FsDatepickerDialogComponent.prototype.monthClick = function (month) {
        Object.assign(month.months, this.monthList);
    };
    FsDatepickerDialogComponent.prototype.yearClick = function (month) {
        Object.assign(month.years, this.parentInstance.yearList);
    };
    FsDatepickerDialogComponent.prototype.monthViewChange = function (month) {
        this.monthChange(month);
        this.calendarView();
    };
    FsDatepickerDialogComponent.prototype.monthChange = function (month) {
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        this.setDate(this.parentInstance.getValue().clone().month(month - 1));
    };
    FsDatepickerDialogComponent.prototype.dayClick = function (day) {
        if (day.disabled) {
            return;
        }
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        var date = this.parentInstance.getValue()
            .clone()
            .year(day.year)
            .month(day.month - 1)
            .date(day.number);
        this.setDate(date);
        if (!this.parentInstance.hasTime) {
            this.close();
        }
    };
    FsDatepickerDialogComponent.prototype.yearViewChange = function (year) {
        this.yearChange(year);
        this.calendarView();
    };
    FsDatepickerDialogComponent.prototype.yearChange = function (year) {
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        this.setDate(this.parentInstance.getValue().clone().year(year));
    };
    FsDatepickerDialogComponent.prototype.hourClick = function (hour) {
        if (this.disabledTimeHours[hour]) {
            return;
        }
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        this.setDate(this.parentInstance.getValue().clone().hour(hour));
    };
    FsDatepickerDialogComponent.prototype.minuteClick = function (minute) {
        if (this.disabledTimeMinutes[minute]) {
            return;
        }
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        this.setDate(this.parentInstance.getValue().clone().minute(minute));
    };
    FsDatepickerDialogComponent.prototype.previousMonth = function (month) {
        this.drawMonths(month.moment.subtract(1, 'months'));
    };
    FsDatepickerDialogComponent.prototype.nextMonth = function (month) {
        this.drawMonths(month.moment.add(1, 'months'));
    };
    FsDatepickerDialogComponent.prototype.ngOnDestroy = function () {
        if (this.parentInstance.hasDate) {
            var $date = this.element.nativeElement.querySelector('.date');
            $date.removeEventListener('mousewheel', this.dateScroll);
        }
    };
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatepickerDialogComponent.prototype, "documentKeydown", null);
    FsDatepickerDialogComponent = __decorate([
        core_1.Component({
            selector: 'fs-datepicker-dialog',
            templateUrl: './fsdatepickerdialog.html',
            styleUrls: ['./fsdatepickerdialog.css'],
            host: {
                '(mousewheel)': 'onMouseWheel($event)',
                '(touchmove)': 'onTouchMove($event)'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, common_1.FsUtil, core_1.IterableDiffers])
    ], FsDatepickerDialogComponent);
    return FsDatepickerDialogComponent;
}());
exports.FsDatepickerDialogComponent = FsDatepickerDialogComponent;
//# sourceMappingURL=fsdatepickerdialog.component.js.map