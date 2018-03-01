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
var FsDatepickerComponent = (function () {
    function FsDatepickerComponent(fsDatePickerModel, element) {
        this.fsDatePickerModel = fsDatePickerModel;
        this.element = element;
        this.parentInstance = null;
        this.model = null;
    }
    FsDatepickerComponent.prototype.ngOnInit = function () {
        this.model = this.parentInstance.getValue();
    };
    FsDatepickerComponent.prototype.setDate = function (date) {
        this.model = date;
        this.parentInstance.writeValue(date);
        if (this.fsDatePickerModel.view === 'date') {
            this.close();
        }
    };
    FsDatepickerComponent.prototype.setDateMode = function (mode) {
        this.fsDatePickerModel.dateMode = mode;
    };
    FsDatepickerComponent.prototype.close = function ($event) {
        this.parentInstance.opened = false;
    };
    FsDatepickerComponent.prototype.documentKeydown = function (e) {
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
    ], FsDatepickerComponent.prototype, "documentKeydown", null);
    FsDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'fsDatePicker',
            templateUrl: './fsdatepicker.component.html',
            styleUrls: ['./../../styles.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [fsdatepickermodel_service_1.FsDatePickerModel]
        }),
        __metadata("design:paramtypes", [fsdatepickermodel_service_1.FsDatePickerModel, core_1.ElementRef])
    ], FsDatepickerComponent);
    return FsDatepickerComponent;
}());
exports.FsDatepickerComponent = FsDatepickerComponent;
//# sourceMappingURL=fsdatepicker.component.js.map