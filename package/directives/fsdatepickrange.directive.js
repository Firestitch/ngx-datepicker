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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fsdatepickerrange_value_accessors_1 = require("./../value-accessors/fsdatepickerrange.value-accessors");
var fsdatepickerrangefactory_service_1 = require("./../services/fsdatepickerrangefactory.service");
var fsdatepickercommon_service_1 = require("./../services/fsdatepickercommon.service");
var moment = require("moment-timezone");
var FsDatePickRangeDirective = (function () {
    function FsDatePickRangeDirective(_elementRef, renderer, factoryResolver, viewContainerRef, fsDatePickerCommon, fsDatepickerRangeFactory) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.factoryResolver = factoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatepickerRangeFactory = fsDatepickerRangeFactory;
        this.view = 'date';
        this.ngModelStart = null;
        this.ngModelEnd = null;
        this.ngModelStartChange = new core_1.EventEmitter();
        this.ngModelEndChange = new core_1.EventEmitter();
        this.change$ = new core_1.EventEmitter();
        this.opened = false;
        this.$dialog = null;
        this.rootViewContainer = null;
        this._onTouched = function () { };
        this._onChange = function (value) { };
        this.onFocused = function (event) { };
    }
    FsDatePickRangeDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    FsDatePickRangeDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    FsDatePickRangeDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._elementRef.nativeElement.setAttribute('readonly', true);
        });
    };
    FsDatePickRangeDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!changes) {
            return;
        }
        if (changes.ngModelStart || changes.ngModelEnd) {
            if (typeof this.ngModelStart === 'string' || typeof this.ngModelEnd === 'string') {
                setTimeout(function () {
                    _this.writeValue(_this.ngModelStart, _this.ngModelEnd);
                });
                return;
            }
            var viewData = { start_date: this.ngModelStart, end_date: this.ngModelEnd };
            this._onChange(viewData);
            this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTimeRange(viewData, this.view);
            this.change$.emit(viewData);
        }
    };
    FsDatePickRangeDirective.prototype.writeValue = function (startDate, endDate) {
        this.ngModelStartChange.emit(startDate && moment(startDate).isValid() ? moment(startDate) : startDate);
        this.ngModelEndChange.emit(endDate && moment(endDate).isValid() ? moment(endDate) : endDate);
    };
    FsDatePickRangeDirective.prototype.open = function () {
        var _this = this;
        this.opened = true;
        if (this.$dialog) {
            // Set first time tab as active
            if (this.$dialog.instance.rangeTimeTabGroup) {
                this.$dialog.instance.rangeTimeTabGroup.selectedIndex = 0;
            }
            return;
        }
        this.fsDatepickerRangeFactory.setRootViewContainerRef(this.viewContainerRef);
        this.$dialog = this.fsDatepickerRangeFactory.addDynamicComponent();
        this.$dialog.instance.parentInstance = this;
        this.$dialog.instance.fsDatePickerModel.view = this.view;
        this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
        this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
        this.$dialog.instance.fsDatePickerModel.dateMode = { start_date: 'date', end_date: 'date' };
        setTimeout(function () {
            _this.fsDatePickerCommon.positionDialog(_this.$dialog, _this._elementRef);
        });
    };
    FsDatePickRangeDirective.prototype.inputClick = function (e) {
        var _this = this;
        this.fsDatePickerCommon.inputClick(e, function () {
            _this.open();
        });
    };
    FsDatePickRangeDirective.prototype.inputKeyup = function (e) {
        if (e.keyCode === 13) {
            this.inputBlur(e);
        }
    };
    FsDatePickRangeDirective.prototype.inputBlur = function (event) { };
    FsDatePickRangeDirective.prototype.onWindowResize = function (event) {
        this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    };
    FsDatePickRangeDirective.prototype.ngOnDestroy = function () {
        if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
            this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "minYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "maxYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "view", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelStart", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelEnd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelStartChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "ngModelEndChange", void 0);
    __decorate([
        core_1.Output('change'),
        __metadata("design:type", Object)
    ], FsDatePickRangeDirective.prototype, "change$", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatePickRangeDirective.prototype, "onWindowResize", null);
    FsDatePickRangeDirective = __decorate([
        core_1.Directive({
            host: {
                '(input)': 'onChangeInterceptor($event)',
                '(click)': 'inputClick($event)',
                '(keyup)': 'inputKeyup($event)',
                '(blur)': 'inputBlur($event)',
            },
            selector: '[fsDatePickerRange]',
            providers: [fsdatepickerrange_value_accessors_1.DATEPICKER_RANGE_VALUE_ACCESSOR]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.Renderer)),
        __param(2, core_1.Inject(core_1.ComponentFactoryResolver)),
        __param(3, core_1.Inject(core_1.ViewContainerRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer, Object, Object, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickerrangefactory_service_1.FsDatepickerRangeFactory])
    ], FsDatePickRangeDirective);
    return FsDatePickRangeDirective;
}());
exports.FsDatePickRangeDirective = FsDatePickRangeDirective;
//# sourceMappingURL=fsdatepickrange.directive.js.map