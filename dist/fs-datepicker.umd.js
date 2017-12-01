(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firestitch/common'), require('@angular/core'), require('iscroll'), require('moment-timezone'), require('@angular/forms'), require('@angular/common/http'), require('@angular/material'), require('@angular/flex-layout'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@firestitch/common', '@angular/core', 'iscroll', 'moment-timezone', '@angular/forms', '@angular/common/http', '@angular/material', '@angular/flex-layout', '@angular/common'], factory) :
	(factory((global['fs-datepicker'] = {}),global.common,global.core,global.IScroll,global.moment,global.forms,global.http,global.material,global.flexLayout,global.common$1));
}(this, (function (exports,common,core,IScroll,moment,forms,http,material,flexLayout,common$1) { 'use strict';

moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsIsscrollDirective = (function () {
    function FsIsscrollDirective(element) {
        this.element = element;
        this.fsOptions = {};
        this.fsInstance = {};
    }
    /**
     * @return {?}
     */
    FsIsscrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.fsOptions = Object.assign({
            momentum: false,
            hScrollbar: false,
            mouseWheel: true,
            click: true
        }, this.fsOptions);
        setTimeout(function () {
            var /** @type {?} */ instance = new IScroll(_this.element.nativeElement, _this.fsOptions);
            if (_this.fsOptions['scrollToElement']) {
                instance.scrollToElement(_this.fsOptions['scrollToElement'], 0);
            }
            if (_this.fsOptions['scrollTo']) {
                instance.scrollTo(_this.fsOptions['scrollTo'].x, _this.fsOptions['scrollTo'].y, _this.fsOptions['scrollTo'].time);
            }
            if (_this.fsInstance) {
                _this.fsInstance = Object.assign({}, _this.fsInstance, instance);
                Object.setPrototypeOf(_this.fsInstance, instance);
            }
        });
    };
    /**
     * @return {?}
     */
    FsIsscrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.fsInstance) {
            this.fsInstance['destroy']();
        }
    };
    FsIsscrollDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[fsIscroll]'
                },] },
    ];
    /** @nocollapse */
    FsIsscrollDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    FsIsscrollDirective.propDecorators = {
        "fsOptions": [{ type: core.Input, args: ['fsOptions',] },],
        "fsInstance": [{ type: core.Input, args: ['fsInstance',] },],
    };
    return FsIsscrollDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDatepickerDialogComponent = (function () {
    function FsDatepickerDialogComponent(element, FsUtil$$1, _iterableDiffers) {
        var _this = this;
        this.element = element;
        this.FsUtil = FsUtil$$1;
        this._iterableDiffers = _iterableDiffers;
        this.month = null;
        this.years = [];
        this.tab = 'date';
        this.parentInstance = null;
        this.iscrollOptions = null;
        this.iscrollInstance = null;
        this.disabledDaysDiffer = null;
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
    }
    /**
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.tab = this.parentInstance.hasDate ? 'date' : 'time';
        for (var /** @type {?} */ y = this.parentInstance.minYear; y < this.parentInstance.maxYear; y++) {
            this.years.push(y);
        }
        setTimeout(function () {
            var /** @type {?} */ $date = _this.element.nativeElement.querySelector('.date');
            $date.addEventListener('mousewheel', _this.dateScroll);
        });
    };
    /**
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?=} $event
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.close = /**
     * @param {?=} $event
     * @return {?}
     */
    function ($event) {
        this.parentInstance.opened = false;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.onMouseWheel = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.onTouchMove = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.preventDefault();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.drawMonths = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date) {
            date = this.createMoment();
        }
        this.month = this.createMonth(date);
    };
    /**
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.createModel = /**
     * @return {?}
     */
    function () {
        if (!this.parentInstance.getValue()) {
            this.parentInstance.writeValue(this.createMoment());
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.setDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.parentInstance.writeValue(date);
    };
    /**
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.createMoment = /**
     * @return {?}
     */
    function () {
        return moment().startOf('day');
    };
    /**
     * @param {?} date
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.createMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        date = date.clone().date(1);
        var /** @type {?} */ days = [], /** @type {?} */ weeks = [];
        var /** @type {?} */ week = [];
        var /** @type {?} */ md = date.clone();
        md.subtract(date.day(), 'day');
        var /** @type {?} */ daysInMonth = date.daysInMonth();
        for (var /** @type {?} */ d = 0; d < daysInMonth + date.day() + (6 - date.clone().add(1, 'month').day() + 1); d++) {
            var /** @type {?} */ number = md.format('DD');
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
    /**
     * @param {?} md
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.isDayDisabled = /**
     * @param {?} md
     * @return {?}
     */
    function (md) {
        if (!this.parentInstance.disabledDays) {
            return false;
        }
        for (var /** @type {?} */ i = 0, /** @type {?} */ len_1 = this.parentInstance.disabledDays.length; i < len_1; i++) {
            var /** @type {?} */ value = this.parentInstance.disabledDays[i];
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
    /**
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.calendarView = /**
     * @return {?}
     */
    function () {
        this.parentInstance.view = 'calendar';
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.monthView = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.parentInstance.view = 'month';
    };
    /**
     * @param {?} year
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.yearView = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.iscrollOptions = { scrollToElement: '.years [data-year="' + year + '"]' };
        this.parentInstance.view = 'year';
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.documentKeydown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.keyCode === 27) {
            //Be careful with preventing default events. Breaking page refresh functional
            e.preventDefault();
            this.close(e);
        }
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.monthClick = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        Object.assign(month.months, this.monthList);
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.yearClick = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        Object.assign(month.years, this.parentInstance.yearList);
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.monthViewChange = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.monthChange(month);
        this.calendarView();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.monthChange = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        this.setDate(this.parentInstance.getValue().clone().month(month - 1));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.dayClick = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (day.disabled) {
            return;
        }
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        var /** @type {?} */ date = this.parentInstance.getValue()
            .clone()
            .year(day.year)
            .month(day.month - 1)
            .date(day.number);
        this.setDate(date);
        if (!this.parentInstance.hasTime) {
            this.close();
        }
    };
    /**
     * @param {?} year
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.yearViewChange = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.yearChange(year);
        this.calendarView();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.yearChange = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        if (!this.parentInstance.getValue()) {
            this.createModel();
        }
        this.setDate(this.parentInstance.getValue().clone().year(year));
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.previousMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.drawMonths(month.moment.subtract(1, 'months'));
    };
    /**
     * @param {?} month
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.nextMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.drawMonths(month.moment.add(1, 'months'));
    };
    /**
     * @return {?}
     */
    FsDatepickerDialogComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ $date = this.element.nativeElement.querySelector('.date');
        $date.removeEventListener('mousewheel', this.dateScroll);
    };
    FsDatepickerDialogComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'fs-datepicker-dialog',
                    template: "<div class=\"fs-datetime-backdrop\" [hidden]=\"!parentInstance.opened\" (click)=\"close($event)\"></div> <div class=\"fs-datetime-dialog\" tabindex=\"0\" [ngClass]=\"{ opened: parentInstance.opened, 'has-date': hasDate, 'has-time': parentInstance.hasTime, 'has-calendar': parentInstance.hasCalendar, 'view-year': parentInstance.view=='year', 'view-month': parentInstance.view=='month', 'view-date': parentInstance.view=='date' }\"> <div class=\"wrap\" layout=\"column\"> <!--<fs-tabnav fs-selected=\"tab\" ng-show=\"hasDate && parentInstance.hasTime\"> <fs-tabnav-item fs-name=\"date\">Date</fs-tabnav-item> <fs-tabnav-item fs-name=\"time\">Time</fs-tabnav-item> </fs-tabnav>--> <div fsLayout=\"row\" class=\"date-time\" fxFlex> <div class=\"date\" *ngIf=\"tab == 'date'\" fxFlex> <div class=\"months\" *ngIf=\"parentInstance.view == 'month'\"> <div *ngFor=\"let month of monthList\" (click)=\"monthViewChange(month.value)\" class=\"month\" [ngClass]=\"{ today: today.month == month.value, selected: parentInstance.selected.month == month.value }\">{{ month.abr }}</div> </div> <div class=\"years\" *ngIf=\"parentInstance.view=='year'\" fsIscroll fsOptions=\"iscrollOptions\" fsInstance=\"iscrollInstance\"> <div class=\"iscroll-scroller\"> <div *ngFor=\"let year of years\" class=\"year\" [ngClass]=\"{ today: today.year==year, row : ($index % 4 == 0), selected: parentInstance.selected.year==year }\" (click)=\"yearViewChange(year)\"> {{year}} </div> <div class=\"clear\"></div> </div> </div> <div *ngIf=\"parentInstance.hasCalendar && parentInstance.view=='calendar'\" class=\"calendar\"> <div class=\"month-year\" fxLayout=\"row\" fxLayoutAlign=\"start center\"> <a class=\"month-name\" (click)=\"monthView(month)\">{{month.name}}</a> <a class=\"year-name\" (click)=\"yearView(month.year)\">{{month.year}}</a> <a (click)=\"yearView(month.year)\" class=\"more\"><mat-icon>arrow_drop_down</mat-icon></a> <div fxFlex class=\"actions\"> <a (click)=\"previousMonth(month)\"><mat-icon>navigate_before</mat-icon></a> <a (click)=\"nextMonth(month)\"><mat-icon>navigate_next</mat-icon></a> </div> </div> <table> <thead> <tr> <th>Sun</th> <th>Mon</th> <th>Tues</th> <th>Wed</th> <th>Thurs</th> <th>Fri</th> <th>Sat</th> </tr> </thead> <tbody class=\"calendar calendar-{{month.date}}\"> <tr class=\"week\" *ngFor=\"let week of month.weeks\"> <td *ngFor=\"let day of week\" class=\"day\" [ngClass]=\"{ today: today.date==day.date, mute: day.mute, selected: day.date==parentInstance.selected.date && !day.mute, disabled: day.disabled }\" (click)=\"dayClick(day)\"> <span>{{day.number}}</span> </td> </tr> </tbody> </table> </div> </div> </div> <div fxLayout=\"row\" fxLayoutAlign=\"end start\" *ngIf=\"parentInstance.hasTime\" class=\"done\"> <mat-button (click)=\"close($event)\">Done</mat-button> </div> </div> </div> ",
                    styles: [".fs-datetime-backdrop { position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 50; outline: none; overflow:visible; background:none !important; } .fs-datetime-backdrop[hidden] { display: none !important; } a { text-decoration: underline; } /* fs-datetime { position: relative; } fs-datetime-range md-input-container .hint { top: 33px; white-space: nowrap; overflow: visible; clear: left; position: absolute; } fs-datetime .md-input { min-width: 100px; z-index: 51; position: relative; cursor: pointer; } fs-datetime.has-time .md-input { min-width: 150px; } fs-datetime.has-time:not(.has-date) .md-input { min-width: 70px; } fs-datetime.has-time .md-input { width: auto; } fs-datetime md-input-container.md-block .md-input { width: 100%; } */ .fs-datetime-dialog { position: fixed; z-index: 80; display: none; visibility: hidden; display: block; margin-top: 20px; } .fs-datetime-dialog.opened { visibility: visible; } .fs-datetime-dialog * { user-select: none; } .fs-datetime-dialog .wrap { background: #fff; box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); width: 372px; } .fs-datetime-dialog.has-time.has-date .wrap { width: 645px; } .fs-datetime-dialog.has-time:not(.has-date) .wrap { width: 255px; } .fs-datetime-dialog:not(.vertical-reposition):not(.horizontal-reposition) .wrap:after, .fs-datetime-dialog:not(.vertical-reposition):not(.horizontal-reposition) .wrap:before { border-left: 20px solid transparent; border-right: 20px solid transparent; border-top: 19px solid #fff; top: -19px; content: ''; left: 50%; position: absolute; transform: rotate(180deg); left: 23px; } .fs-datetime-dialog:not(.vertical-reposition):not(.horizontal-reposition) .wrap:before { border-left: 23px solid transparent; border-right: 23px solid transparent; border-top: 21px solid transparent; border-top-color: #efefef; top: -21px; left: 20px; } .fs-datetime-dialog .date::-webkit-scrollbar, .fs-datetime-dialog .years::-webkit-scrollbar { display: none; } .fs-datetime-dialog .inline-date { padding: 10px; width: 100%; } .fs-datetime-dialog .month-year .actions { text-align: right; margin-right: -12px; } .fs-datetime-dialog .month-year .actions a { padding: 6px; } .fs-datetime-dialog .month-year .more { padding: 1px; } .fs-datetime-dialog .month-year { height: 60px; font-size: 17px; padding: 0 10px; } .fs-datetime-dialog .year-name, .fs-datetime-dialog .month-name { color: inherit; padding: 5px; border-radius: 3px; float: left; } .fs-datetime-dialog .month-year .md-select-value .md-select-icon { visibility: hidden; width: 15px; display: none; } .fs-datetime-dialog .month-year .md-select-value { border-color: transparent; border-width: 1px; min-width: auto; padding: 0; } .fs-datetime-dialog .month-year:hover .md-select-value .md-select-icon { visibility: visible; } .fs-datetime-dialog .month-year:hover .md-select-value { border-width: 1px; border-color: #e1e1e1; } .fs-datetime-dialog table { border-collapse: collapse; } .fs-datetime-dialog .day { text-align: center; width: 50px; height: 50px; line-height: 50px; border: 1px solid #efefef; cursor: pointer; outline: none; } .fs-datetime-dialog .date tr td:first-child { border-left: 1px solid transparent; } .fs-datetime-dialog .day span { width: 100%; height: 100%; display: block; } .fs-datetime-dialog .day.mute { color: #d7d7d7; } .fs-datetime-dialog thead { } .fs-datetime-dialog thead th { width: 50px; vertical-align: top; padding-bottom: 20px; text-align: center; border: 1px solid transparent; background: #fff; border-bottom: 1px solid #efefef; border-top: 1px solid #fff; } .fs-datetime-dialog thead th, fs-datetime .lbl { font-weight: normal; font-size: 12px; color: #4d4d4d; } .fs-datetime-dialog .date { overflow-y: auto; overflow-x: hidden; width: 100%; position: relative; min-height: 350px; } .fs-datetime-dialog .time { padding: 12px 15px; } .fs-datetime-dialog .time .hours table { border-collapse: collapse; width: 100%; } .fs-datetime-dialog .time .hour, .fs-datetime-dialog .time .minute { width: 31px; height: 31px; text-align: center; border: 1px	solid #efefef; padding: 0; cursor: pointer; } .fs-datetime-dialog .time .hour .number, .fs-datetime-dialog .time .minute .number { border: 1px solid transparent; border-radius: 50%; line-height: 28px; height: 28px; } .fs-datetime-dialog .time .hour .number { font-size: 12px; } .fs-datetime-dialog .day.selected, .fs-datetime-dialog .years .year.selected, .fs-datetime-dialog .months .month.selected, .fs-datetime-dialog .time .hour.selected, .fs-datetime-dialog .time .minute.selected { background: #4678AE; color: #fff; } .fs-datetime-dialog .day.today { border: 1px solid #4678AE; border-style: double; } .fs-datetime-dialog .years .year.today { border: 1px solid #4678AE; border-style: double; } .fs-datetime-dialog .time .minutes { margin-left: 15px; } .fs-datetime-dialog .time .minutes table { border-collapse: collapse; width: 100%; } .fs-datetime-dialog .time .hour.disabled, .fs-datetime-dialog .time .minute.disabled, .fs-datetime-dialog .day.disabled { color: #a6a5a5; cursor: initial; background: #efefef; } .fs-datetime-dialog .time .lbl { margin-bottom: 2px; font-size: 12px; } .fs-datetime-dialog .time .midnight { line-height: 8px; display: block; } .fs-datetime-dialog .time .midnight div { line-height: 16px; } .fs-datetime-dialog .time .midnight, .fs-datetime-dialog .time .noon { font-size: 10px; } .fs-datetime-dialog .time .hour .am-pm { font-size: 9px; margin-left: 1px; } .fs-datetime-dialog .time .hour .number.textual { font-size: 11px; } /* .fs-datetime-dialog . { font-size: 11px; }*/ .fs-datetime-dialog .date-time { overflow: auto; } .fs-datetime-dialog .months { width: 100%; height: 100%; position: absolute; } .fs-datetime-dialog .months .month { height: 25%; width: 33.33%; float: left; text-align: center; display: flex; justify-content: center; flex-direction: column; border-left: 1px solid #efefef; border-top: 1px solid #efefef; cursor: pointer; outline: none; border-bottom: 0; border-right: 0; min-height: 80px; box-sizing: border-box; } .fs-datetime-dialog .months .month:nth-child(-n+3) { border-top: 0; } .fs-datetime-dialog .months .month:nth-child(3n+0) { border-right: 1px solid #efefef; } .fs-datetime-dialog .months .month.today { border: 1px solid #4678AE; border-style: double; } .fs-datetime-dialog .years { position: absolute; width: 100%; max-height: 100%; height: 100vh; overflow: hidden; } .iscroll-scroller { position: absolute; width: 100%; } .fs-datetime-dialog .years .year { float: left; width: 25%; text-align: center; height: 65px; border-left: 1px solid #efefef; border-bottom: 1px solid #efefef; line-height: 65px; outline: none; cursor: pointer; box-sizing: border-box; } .fs-datetime-dialog .years .year:nth-last-child(-n+4) { border-bottom: 1px solid #efefef; } .fs-datetime-dialog .years .year:nth-child(4n+0) { border-right: 1px solid #efefef; } .clear { clear: both; } .fs-datetime-dialog .years .year.row { clear: both; } .fs-datetime-dialog .view-year .date { overflow-y: visible; } .fs-datetime-dialog .view-year .date { overflow-y: visible; } .fs-datetime-dialog.view-date .date { min-height: auto; } /* fs-datetime-range { display: inline; } fs-datetime-range .to { padding: 0 4px; padding-top: 26px; } fs-datetime-range.md-no-label .to { padding-top: 8px; } fs-datetime-range .datetime-block .datetime-from, fs-datetime-range .datetime-block .datetime-to { width: 50%; } */ .fs-datetime-dialog .close { padding: 5px; display: none; } .fs-datetime-dialog .done { background: #fff; width: 100%; border-top: 1px solid #E1E1E1; } .fs-datetime-dialog fs-tabnav { display: none; } .fs-datetime-dialog fs-tabnav .md-tabs a { width: 50%; } @media only screen and (min-width: 500px) { .fs-datetime-dialog .time, .fs-datetime-dialog .date { display: flex !important; } .fs-datetime-dialog .time .hour:hover:not(.disabled):not(.selected), .fs-datetime-dialog .time .minute:hover:not(.disabled):not(.selected), .fs-datetime-dialog .day:hover:not(.disabled):not(.selected), .fs-datetime-dialog .years .year:hover:not(.disabled):not(.selected), .fs-datetime-dialog .months .month:hover:not(.disabled):not(.selected), .fs-datetime-dialog .year-name:hover:not(.disabled):not(.selected), .fs-datetime-dialog .month-name:hover:not(.disabled):not(.selected) { background: rgba(70,120,174,.15); } } @media only screen and (max-width: 499px) { .fs-datetime-dialog { left: 0 !important; right: 0 !important; top: 0 !important; bottom: 0px !important; margin: 0px; height: 100vh; } .fs-datetime-dialog .wrap { margin: 0px; width: 100% !important; height: 100vh; } .fs-datetime-dialog .day { width: 14.28%; } .fs-datetime-dialog table { width: 100%; } .fs-datetime-dialog .close { display: flex; } .fs-datetime-dialog.view-year .done, .fs-datetime-dialog.view-month .done { display: none !important; } .fs-datetime-dialog.view-date .done { display: flex !important; } .fs-datetime-dialog .done { position: fixed; bottom: 0; } .fs-datetime-dialog fs-tabnav { display: block; } .fs-datetime-dialog .time { margin: 0 auto; } } @media only screen and (max-width: 400px) { .fs-datetime-dialog .day { height: 40px; line-height: 40px; } } .pointer-events-none { pointer-events: none !important; } "],
                    host: {
                        '(mousewheel)': 'onMouseWheel($event)',
                        '(touchmove)': 'onTouchMove($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    FsDatepickerDialogComponent.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: common.FsUtil, },
        { type: core.IterableDiffers, },
    ]; };
    FsDatepickerDialogComponent.propDecorators = {
        "documentKeydown": [{ type: core.HostListener, args: ['document:keydown', ['$event'],] },],
    };
    return FsDatepickerDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDatepickerDialogFactory = (function () {
    function FsDatepickerDialogFactory(factoryResolver) {
        this.factoryResolver = null;
        this.rootViewContainer = null;
        this.factoryResolver = factoryResolver;
    }
    /**
     * @param {?} viewContainerRef
     * @return {?}
     */
    FsDatepickerDialogFactory.prototype.setRootViewContainerRef = /**
     * @param {?} viewContainerRef
     * @return {?}
     */
    function (viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    };
    /**
     * @return {?}
     */
    FsDatepickerDialogFactory.prototype.addDynamicComponent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ factory = this.factoryResolver
            .resolveComponentFactory(FsDatepickerDialogComponent);
        var /** @type {?} */ component = factory
            .create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);
        return component;
    };
    FsDatepickerDialogFactory.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    FsDatepickerDialogFactory.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.ComponentFactoryResolver,] },] },
    ]; };
    return FsDatepickerDialogFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DATEPICKER_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return FsDatepickerDirective; }),
    multi: true
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDatepickerDirective = (function () {
    function FsDatepickerDirective(_elementRef, renderer, factoryResolver, viewContainerRef, FsDatepickerDialogFactory$$1, FsUtil$$1) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.factoryResolver = factoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.FsDatepickerDialogFactory = FsDatepickerDialogFactory$$1;
        this.FsUtil = FsUtil$$1;
        this.hasTime = false;
        this.view = 'calendar';
        this.disabledDays = null;
        this.change$ = new core.EventEmitter();
        this.opened = false;
        this.selected = {};
        this.yearList = [];
        this.$dialog = null;
        this.rootViewContainer = null;
        //event hooks for VALUE_ACCESSOR. those are used to imitate real input behavior and emit events outside the directive, e.g. "touched"
        this._onTouched = function () { };
        this._onChange = function (value) { };
        this.onFocused = function (event) { };
    }
    // we initiate those functions to emit events outside the component
    /**
     * @param {?} fn
     * @return {?}
     */
    FsDatepickerDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    FsDatepickerDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @return {?}
     */
    FsDatepickerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hasDate = this.hasDate === undefined ? true : this.hasDate;
        this.hasCalendar = this.hasCalendar === undefined ? true : this.hasCalendar;
        this.minYear = this.minYear || (parseInt(moment().format('YYYY')) - 100);
        this.maxYear = this.maxYear || (parseInt(moment().format('YYYY')) + 100);
        this.hasTime = this.hasTime;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FsDatepickerDirective.prototype.onChangeInterceptor = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.writeValue($event.target.value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FsDatepickerDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value && moment(value).isValid()) {
            value = moment(value);
        }
        else {
            value = undefined;
        }
        this.renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
        this._onChange(value);
        this.render(this._elementRef);
        this.change$.emit(value);
    };
    /**
     * @return {?}
     */
    FsDatepickerDirective.prototype.getValue = /**
     * @return {?}
     */
    function () {
        return moment(this._elementRef.nativeElement.value);
    };
    /**
     * @return {?}
     */
    FsDatepickerDirective.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.opened = true;
        this.view = 'calendar';
        if (!this.hasCalendar) {
            this.view = 'date';
        }
        if (this.$dialog) {
            this.$dialog.instance.drawMonths(this.getValue());
            return;
        }
        this.FsDatepickerDialogFactory.setRootViewContainerRef(this.viewContainerRef);
        this.$dialog = this.FsDatepickerDialogFactory.addDynamicComponent();
        this.$dialog.instance.parentInstance = this;
        this.$dialog.instance.drawMonths(this.getValue());
        setTimeout(function () {
            _this.positionDialog();
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FsDatepickerDirective.prototype.inputClick = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ x = e.clientX, /** @type {?} */
        y = e.clientY, /** @type {?} */
        stack = [], /** @type {?} */
        el;
        do {
            el = document.elementFromPoint(x, y);
            var /** @type {?} */ last = stack[stack.length - 1];
            if (last && last.isEqualNode(el)) {
                break;
            }
            el.classList.add('pointer-events-none');
            stack.push(el);
            if (el.className.match('/fs-datetime-backdrop/')) {
                setTimeout(function () {
                    el.click();
                });
                break;
            }
        } while (el.tagName !== 'HTML' && !el.tagName.match(/^FS-DATETIME/));
        for (var /** @type {?} */ i = 0; i < stack.length; i += 1) {
            stack[i].classList.remove('pointer-events-none');
        }
        this.open();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FsDatepickerDirective.prototype.inputKeyup = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.keyCode === 13) {
            this.inputBlur(e);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FsDatepickerDirective.prototype.inputBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { };
    /**
     * @param {?} event
     * @return {?}
     */
    FsDatepickerDirective.prototype.onWindowResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.positionDialog();
    };
    /**
     * @return {?}
     */
    FsDatepickerDirective.prototype.positionDialog = /**
     * @return {?}
     */
    function () {
        if (!this.$dialog || window.innerWidth < 500) {
            return;
        }
        var /** @type {?} */ input = this._elementRef.nativeElement;
        var /** @type {?} */ dialogContainer = this.$dialog.instance.element.nativeElement.querySelector('.fs-datetime-dialog');
        var /** @type {?} */ dialogContainerStyles = window.getComputedStyle(dialogContainer);
        var /** @type {?} */ inputBound = input.getBoundingClientRect();
        var /** @type {?} */ dialogBound = this.$dialog.instance.element.nativeElement.getBoundingClientRect();
        var /** @type {?} */ dialogContainerBound = dialogContainer.getBoundingClientRect();
        var /** @type {?} */ top = parseInt(inputBound.top) + inputBound.height;
        var /** @type {?} */ css = { top: '', bottom: '', left: '', right: '' };
        if ((top + this.FsUtil.int(dialogContainer.style.marginTop) + this.FsUtil.int(dialogContainerStyles.height)) > window.innerHeight) {
            css.bottom = '10px';
            dialogContainer.classList.add('vertical-reposition');
        }
        else {
            css.top = top + 'px';
            dialogContainer.classList.remove('vertical-reposition');
        }
        var /** @type {?} */ left = parseInt(inputBound.left);
        if ((left + this.FsUtil.int(dialogContainerStyles.width)) > window.innerWidth) {
            css.right = '10px';
            dialogContainer.classList.add('horizontal-reposition');
        }
        else {
            css.left = left + 'px';
            dialogContainer.classList.remove('horizontal-reposition');
        }
        for (var /** @type {?} */ i in css) {
            dialogContainer.style[i] = css[i];
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    FsDatepickerDirective.prototype.render = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var /** @type {?} */ format = [], /** @type {?} */
        options = {}, /** @type {?} */
        value = this.getValue();
        if (this.FsUtil.isInt(value)) {
            value = moment(new Date(value));
        }
        else if (this.FsUtil.isString(value)) {
            if (moment(value).isValid()) {
                value = moment(value);
            }
            else {
                value = moment(Date.parse(value));
            }
        }
        if (value && moment(value).isValid()) {
            if (this.hasDate) {
                format.push('MMM D, YYYY');
            }
            if (this.hasTime) {
                format.push('h:mm a');
            }
            input.nativeElement.value = value.format(format.join(' '));
            if (this.$dialog) {
                this.$dialog.instance.drawMonths(value);
            }
            var /** @type {?} */ year = parseInt(value.format('YYYY'));
            if (parseInt(this.selected['year']) != year) {
                this.yearList = [];
                for (var /** @type {?} */ y = year + 100; y > (year - 100); y--) {
                    this.yearList.push(y);
                }
            }
            this.selected['date'] = value.format('YYYY-MM-DD');
            this.selected['hour'] = parseInt(value.format('H'));
            this.selected['minute'] = parseInt(value.format('m'));
            this.selected['year'] = parseInt(value.format('YYYY'));
            this.selected['month'] = parseInt(value.format('M'));
            this.selected['day'] = parseInt(value.format('D'));
        }
        else {
            input.nativeElement.value = '';
            this.selected['date'] = undefined;
            this.selected['hour'] = undefined;
            this.selected['minute'] = undefined;
            this.selected['year'] = undefined;
            this.selected['month'] = undefined;
            this.selected['day'] = undefined;
        }
    };
    /**
     * @return {?}
     */
    FsDatepickerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
            this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
        }
    };
    FsDatepickerDirective.decorators = [
        { type: core.Directive, args: [{
                    host: {
                        '(input)': 'onChangeInterceptor($event)',
                        '(click)': 'inputClick($event)',
                        '(keyup)': 'inputKeyup($event)',
                        '(blur)': 'inputBlur($event)',
                    },
                    selector: '[fsDatepicker]',
                    providers: [DATEPICKER_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    FsDatepickerDirective.ctorParameters = function () { return [
        { type: core.ElementRef, decorators: [{ type: core.Inject, args: [core.ElementRef,] },] },
        { type: core.Renderer, decorators: [{ type: core.Inject, args: [core.Renderer,] },] },
        { type: undefined, decorators: [{ type: core.Inject, args: [core.ComponentFactoryResolver,] },] },
        { type: undefined, decorators: [{ type: core.Inject, args: [core.ViewContainerRef,] },] },
        { type: FsDatepickerDialogFactory, },
        { type: common.FsUtil, },
    ]; };
    FsDatepickerDirective.propDecorators = {
        "hasCalendar": [{ type: core.Input, args: ['hasCalendar',] },],
        "hasDate": [{ type: core.Input, args: ['hasDate',] },],
        "minYear": [{ type: core.Input, args: ['minYear',] },],
        "maxYear": [{ type: core.Input, args: ['maxYear',] },],
        "hasTime": [{ type: core.Input, args: ['hasTime',] },],
        "view": [{ type: core.Input, args: ['view',] },],
        "disabledDays": [{ type: core.Input, args: ['disabledDays',] },],
        "change$": [{ type: core.Output, args: ['change',] },],
        "onWindowResize": [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
    };
    return FsDatepickerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FsDatepickerModule = (function () {
    function FsDatepickerModule() {
    }
    /**
     * @return {?}
     */
    FsDatepickerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: FsDatepickerModule,
            providers: [
                FsDatepickerDialogFactory,
                common.FsUtil
            ]
        };
    };
    FsDatepickerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common$1.CommonModule,
                        http.HttpClientModule,
                        material.MatAutocompleteModule,
                        material.MatButtonModule,
                        material.MatButtonToggleModule,
                        material.MatCardModule,
                        material.MatCheckboxModule,
                        material.MatChipsModule,
                        material.MatStepperModule,
                        material.MatDatepickerModule,
                        material.MatDialogModule,
                        material.MatExpansionModule,
                        material.MatGridListModule,
                        material.MatIconModule,
                        material.MatInputModule,
                        material.MatListModule,
                        material.MatMenuModule,
                        material.MatNativeDateModule,
                        material.MatPaginatorModule,
                        material.MatProgressBarModule,
                        material.MatProgressSpinnerModule,
                        material.MatRadioModule,
                        material.MatRippleModule,
                        material.MatSelectModule,
                        material.MatSidenavModule,
                        material.MatSliderModule,
                        material.MatSlideToggleModule,
                        material.MatSnackBarModule,
                        material.MatSortModule,
                        material.MatTableModule,
                        material.MatTabsModule,
                        material.MatToolbarModule,
                        material.MatTooltipModule,
                        flexLayout.FlexLayoutModule
                        //MATERIAL END
                    ],
                    declarations: [
                        FsDatepickerDirective,
                        FsDatepickerDialogComponent,
                        FsIsscrollDirective
                    ],
                    providers: [
                        FsDatepickerDialogFactory,
                        common.FsUtil
                    ],
                    entryComponents: [
                        FsDatepickerDialogComponent
                    ],
                    exports: [
                        FsDatepickerDirective
                    ],
                    schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    FsDatepickerModule.ctorParameters = function () { return []; };
    return FsDatepickerModule;
}());

exports.FsDatepickerModule = FsDatepickerModule;
exports.FsIsscrollDirective = FsIsscrollDirective;
exports.FsDatepickerDialogFactory = FsDatepickerDialogFactory;
exports.FsDatepickerDialogComponent = FsDatepickerDialogComponent;
exports.FsDatepickerDirective = FsDatepickerDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
