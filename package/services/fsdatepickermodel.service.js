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
var moment = require("moment-timezone");
var lodash_1 = require("lodash");
var FsDatePickerModel = (function () {
    function FsDatePickerModel() {
        this._minYear = null;
        this._maxYear = null;
        // @TODO create interfaces for all values
        /**
         * date | datetime | time
         * View is options selected on init. Can't be changed manually
         */
        this._view = 'date';
        /**
         * Visual components. Can be changed by summary widget but only if _view allowed to do this.
         */
        this._componentsDefault = {
            calendarStart: false,
            calendarEnd: false,
            timeStart: false,
            timeEnd: false
        };
        this._components = null;
        /**
         * year | month | date
         *
         * Current mode of calendar. For ranges consist values for both: start and end date
         */
        this.dateMode = null;
        this.presets = [];
    }
    Object.defineProperty(FsDatePickerModel.prototype, "components", {
        get: function () {
            return this._components;
        },
        set: function (value) {
            value = Object.assign({}, this._componentsDefault, value);
            var tempData = Object.assign({}, value);
            var allowable = [];
            if (['date', 'datetime'].indexOf(this._view) !== -1) {
                allowable.push('calendarStart');
                allowable.push('calendarEnd');
            }
            if (['time', 'datetime'].indexOf(this._view) !== -1) {
                allowable.push('timeStart');
                allowable.push('timeEnd');
            }
            lodash_1.forEach(tempData, function (item, index) {
                tempData[index] = allowable.indexOf(index) !== -1 ? item : false;
            });
            // Updating components only if all value object is valid
            if (lodash_1.isEqual(value, tempData)) {
                this._components = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsDatePickerModel.prototype, "minYear", {
        get: function () {
            return this._minYear;
        },
        set: function (minYear) {
            this._minYear = minYear || (parseInt(moment().format('YYYY')) - 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsDatePickerModel.prototype, "maxYear", {
        get: function () {
            return this._maxYear;
        },
        set: function (maxYear) {
            this._maxYear = maxYear || (parseInt(moment().format('YYYY')) + 100);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FsDatePickerModel.prototype, "view", {
        get: function () {
            return this._view;
        },
        set: function (view) {
            if (!view) {
                return;
            }
            this._view = view;
        },
        enumerable: true,
        configurable: true
    });
    FsDatePickerModel = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FsDatePickerModel);
    return FsDatePickerModel;
}());
exports.FsDatePickerModel = FsDatePickerModel;
//# sourceMappingURL=fsdatepickermodel.service.js.map