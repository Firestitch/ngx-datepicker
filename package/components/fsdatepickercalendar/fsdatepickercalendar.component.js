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
var fsdatepickercommon_service_1 = require("./../../services/fsdatepickercommon.service");
var fsdatepickermodel_service_1 = require("./../../services/fsdatepickermodel.service");
var FsDatePickerCalendarComponent = (function () {
    function FsDatePickerCalendarComponent(element, fsDatePickerCommon, fsDatePickerModel, fsUtil, _iterableDiffers) {
        var _this = this;
        this.element = element;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatePickerModel = fsDatePickerModel;
        this.fsUtil = fsUtil;
        this._iterableDiffers = _iterableDiffers;
        this.onChange = new core_1.EventEmitter();
        this.onDateModeChange = new core_1.EventEmitter();
        this.selected = {};
        this.iscrollOptions = null;
        this.iscrollInstance = null;
        this.month = null;
        this.years = [];
        this.dateDays = [];
        this.disabledDays = null;
        this.disabledDaysDiffer = null;
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
        this.today = {
            date: moment().format('YYYY-MM-DD'),
            month: moment().format('M'),
            year: parseInt(moment().format('YYYY'))
        };
        this.dateScroll = this.fsUtil.throttle(function (e) {
            if (e.wheelDelta > 0) {
                _this.nextMonth(_this.month);
            }
            else {
                _this.previousMonth(_this.month);
            }
        }, 50);
        this.disabledDaysDiffer = this._iterableDiffers.find([]).create(null);
    }
    FsDatePickerCalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var y = this.fsDatePickerModel.minYear; y < this.fsDatePickerModel.maxYear; y++) {
            this.years.push(y);
        }
        if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
            setTimeout(function () {
                var $date = _this.element.nativeElement.querySelector('.date');
                $date.addEventListener('mousewheel', _this.dateScroll);
            });
        }
    };
    FsDatePickerCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.date) {
            this.drawMonths(this.date);
            this.selected = this.fsDatePickerCommon.getSelected(this.date);
        }
    };
    FsDatePickerCalendarComponent.prototype.ngDoCheck = function () {
        if (this.disabledDays && this.disabledDaysDiffer.diff(this.disabledDays)) {
            if (this.disabledDays !== undefined && this.month) {
                for (var _i = 0, _a = this.month.weeks; _i < _a.length; _i++) {
                    var week = _a[_i];
                    for (var _b = 0, week_1 = week; _b < week_1.length; _b++) {
                        var day = week_1[_b];
                        day.disabled = this.isDayDisabled(moment(day.date));
                    }
                }
            }
        }
    };
    FsDatePickerCalendarComponent.prototype.isDayDisabled = function (md) {
        if (!this.disabledDays) {
            return false;
        }
        var len;
        for (var i = 0, len_1 = this.disabledDays.length; i < len_1; i++) {
            var value = this.disabledDays[i];
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
    FsDatePickerCalendarComponent.prototype.monthClick = function (month) {
        Object.assign(month.months, this.monthList);
    };
    FsDatePickerCalendarComponent.prototype.monthViewChange = function (month) {
        this.monthChange(month);
        this.calendarView();
    };
    FsDatePickerCalendarComponent.prototype.monthChange = function (month) {
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().month(month - 1));
    };
    FsDatePickerCalendarComponent.prototype.createModel = function () {
        if (!this.date) {
            this.setDate(this.fsDatePickerCommon.createMoment());
        }
    };
    FsDatePickerCalendarComponent.prototype.setDate = function (date) {
        this.date = date;
        this.onChange.emit(date);
    };
    FsDatePickerCalendarComponent.prototype.calendarView = function () {
        this.onDateModeChange.emit('date');
        // this.fsDatePickerModel.dateMode = 'date';
    };
    FsDatePickerCalendarComponent.prototype.monthView = function (month) {
        // this.fsDatePickerModel.dateMode = 'month';
        this.onDateModeChange.emit('month');
    };
    FsDatePickerCalendarComponent.prototype.yearView = function (year) {
        this.iscrollOptions = { scrollToElement: '.years [data-year="' + year + '"]' };
        // this.fsDatePickerModel.dateMode = 'year';
        this.onDateModeChange.emit('year');
    };
    FsDatePickerCalendarComponent.prototype.dayClick = function (day) {
        if (day.disabled) {
            return;
        }
        if (!this.date) {
            this.createModel();
        }
        var date = this.date
            .clone()
            .year(day.year)
            .month(day.month - 1)
            .date(day.number);
        this.setDate(date);
    };
    FsDatePickerCalendarComponent.prototype.yearViewChange = function (year) {
        this.yearChange(year);
        this.calendarView();
    };
    FsDatePickerCalendarComponent.prototype.yearChange = function (year) {
        if (!this.date) {
            this.createModel();
        }
        this.setDate(this.date.clone().year(year));
    };
    FsDatePickerCalendarComponent.prototype.previousMonth = function (month) {
        this.drawMonths(month.moment.subtract(1, 'months'));
    };
    FsDatePickerCalendarComponent.prototype.nextMonth = function (month) {
        this.drawMonths(month.moment.add(1, 'months'));
    };
    FsDatePickerCalendarComponent.prototype.drawMonths = function (date) {
        if (!date) {
            date = this.fsDatePickerCommon.createMoment();
        }
        this.month = this.createMonth(date);
    };
    FsDatePickerCalendarComponent.prototype.createMonth = function (date) {
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
    FsDatePickerCalendarComponent.prototype.updateDateDays = function () {
        var year = this.selected['year'] || 1904;
        var month = this.selected['month'] || 1;
        var max = new Date(year, month, 0).getDate();
        this.dateDays = [];
        for (var d = 1; d <= max; d++) {
            this.dateDays.push(d);
        }
        return this.dateDays;
    };
    FsDatePickerCalendarComponent.prototype.monthDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatePickerCalendarComponent.prototype.dayDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatePickerCalendarComponent.prototype.yearDateViewChange = function () {
        this.updateDateDays();
        this.updateDate();
    };
    FsDatePickerCalendarComponent.prototype.updateDate = function () {
        var m = moment([this.selected['year'], this.selected['month'] - 1, this.selected['day']]);
        var max = new Date(this.selected['year'] || 1904, this.selected['month'], 0).getDate();
        if (max < this.selected['day']) {
            this.selected['day'] = undefined;
        }
        if (m.isValid()) {
            this.setDate(m);
        }
    };
    FsDatePickerCalendarComponent.prototype.onMouseWheel = function ($event) {
        $event.preventDefault();
    };
    FsDatePickerCalendarComponent.prototype.onTouchMove = function ($event) {
        $event.preventDefault();
    };
    FsDatePickerCalendarComponent.prototype.ngOnDestroy = function () {
        if (['date', 'datetime'].indexOf(this.fsDatePickerModel.view) !== -1) {
            var $date = this.element.nativeElement.querySelector('.date');
            $date.removeEventListener('mousewheel', this.dateScroll);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "dateMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "onDateModeChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickerCalendarComponent.prototype, "disabledDays", void 0);
    FsDatePickerCalendarComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePickerCalendar',
            templateUrl: './fsdatepickercalendar.component.html',
            styleUrls: ['./fsdatepickercalendar.component.css'],
            host: {
                '(mousewheel)': 'onMouseWheel($event)',
                '(touchmove)': 'onTouchMove($event)'
            }
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickermodel_service_1.FsDatePickerModel,
            common_1.FsUtil, core_1.IterableDiffers])
    ], FsDatePickerCalendarComponent);
    return FsDatePickerCalendarComponent;
}());
exports.FsDatePickerCalendarComponent = FsDatePickerCalendarComponent;
//# sourceMappingURL=fsdatepickercalendar.component.js.map