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
var FsDatePickerModel = (function () {
    function FsDatePickerModel() {
        this._minYear = null;
        this._maxYear = null;
        // date | datetime | time | inline
        this._view = 'date';
        // year | month | date
        this.dateMode = null;
    }
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