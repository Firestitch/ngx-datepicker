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
var util_1 = require("@firestitch/common/util");
var moment = require("moment-timezone");
var FsDatePickerCommon = (function () {
    function FsDatePickerCommon() {
    }
    FsDatePickerCommon.prototype.getSelected = function (date) {
        var result = {};
        if (date && moment(date).isValid()) {
            result['date'] = moment(date).format('YYYY-MM-DD');
            result['hour'] = parseInt(moment(date).format('H'));
            result['minute'] = parseInt(moment(date).format('m'));
            result['year'] = parseInt(moment(date).format('YYYY'));
            result['month'] = parseInt(moment(date).format('M'));
            result['day'] = parseInt(moment(date).format('D'));
        }
        else {
            result['date'] = undefined;
            result['hour'] = undefined;
            result['minute'] = undefined;
            result['year'] = undefined;
            result['month'] = undefined;
            result['day'] = undefined;
        }
        return result;
    };
    FsDatePickerCommon.prototype.isSameDay = function (startDate, endDate) {
        return moment(startDate).format('YYYY-MM-DD') === moment(endDate).format('YYYY-MM-DD');
    };
    FsDatePickerCommon.prototype.createMoment = function () {
        return moment().startOf('day');
    };
    FsDatePickerCommon.prototype.getMomentSafe = function (date) {
        return moment(date).isValid() ? date : this.createMoment();
    };
    FsDatePickerCommon.prototype.positionDialog = function (dialog, elementRef) {
        if (!dialog || window.innerWidth < 500) {
            return;
        }
        var input = elementRef.nativeElement;
        var parent = input.parentElement.parentElement;
        var dialogContainer = dialog.instance.element.nativeElement.querySelector('.fs-datetime-dialog');
        var dialogContainerStyles = window.getComputedStyle(dialogContainer);
        var inputBound = input.getBoundingClientRect();
        var parentBound = parent.getBoundingClientRect();
        var dialogBound = dialog.instance.element.nativeElement.getBoundingClientRect();
        var dialogContainerBound = dialogContainer.getBoundingClientRect();
        var top = 0;
        if (parent.className.match(/mat-input-flex/)) {
            top = parseInt(parentBound.top);
        }
        else {
            top = parseInt(inputBound.top) + inputBound.height;
        }
        var css = { top: '', bottom: '', left: '', right: '' };
        if ((top + parseInt(dialogContainerStyles.height)) > window.innerHeight) {
            css.bottom = '10px';
            dialogContainer.classList.add('vertical-reposition');
        }
        else {
            css.top = top + 'px';
            dialogContainer.classList.remove('vertical-reposition');
        }
        var left = parseInt(inputBound.left);
        if ((left + parseInt(dialogContainerStyles.width)) > window.innerWidth) {
            css.right = '10px';
            css.left = '';
            dialogContainer.classList.add('horizontal-reposition');
        }
        else {
            css.left = left + 'px';
            css.right = '';
            dialogContainer.classList.remove('horizontal-reposition');
        }
        for (var i in css) {
            if (css[i] === undefined) {
                continue;
            }
            dialogContainer.style[i] = css[i];
        }
    };
    FsDatePickerCommon.prototype.formatDateTimeRange = function (value, view) {
        if (view === void 0) { view = 'date'; }
        var format = [];
        var startDate = this.formatDateTime(value.start_date, view);
        var endDate = this.formatDateTime(value.end_date, view);
        if (startDate) {
            format.push(startDate);
        }
        if (endDate) {
            format.push(endDate);
        }
        return format.join(' - ');
    };
    FsDatePickerCommon.prototype.formatDateTime = function (value, view) {
        if (view === void 0) { view = 'date'; }
        var result = '';
        var format = [];
        if (util_1.isNumeric(value)) {
            value = moment(new Date(value));
        }
        else if (typeof value === 'string') {
            if (moment(value).isValid()) {
                value = moment(value);
            }
            else {
                value = moment(Date.parse(value));
            }
        }
        if (value && moment(value).isValid()) {
            if (['date', 'datetime'].indexOf(view) != -1) {
                format.push('MMM D, YYYY');
            }
            if (['time', 'datetime'].indexOf(view) != -1) {
                format.push('h:mm a');
            }
            result = value.format(format.join(' '));
        }
        return result;
    };
    FsDatePickerCommon.prototype.formatSummary = function (date, view) {
        if (view === void 0) { view = 'date'; }
        if (view === 'date') {
            return moment(date).format('MMM D, YYYY');
        }
        if (view === 'time') {
            return moment(date).format('h:mm a');
        }
    };
    FsDatePickerCommon.prototype.inputClick = function (e, callback) {
        var x = e.clientX, y = e.clientY, stack = [];
        var el;
        do {
            el = document.elementFromPoint(x, y);
            var last = stack[stack.length - 1];
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
        for (var i = 0; i < stack.length; i += 1) {
            stack[i].classList.remove('pointer-events-none');
        }
        callback();
    };
    FsDatePickerCommon = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsDatePickerCommon);
    return FsDatePickerCommon;
}());
exports.FsDatePickerCommon = FsDatePickerCommon;
//# sourceMappingURL=fsdatepickercommon.service.js.map