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
var fsdatepicker_value_accessor_1 = require("./../value-accessors/fsdatepicker.value-accessor");
var fsdatepickerfactory_service_1 = require("./../services/fsdatepickerfactory.service");
var fsdatepickercommon_service_1 = require("./../services/fsdatepickercommon.service");
var moment = require("moment-timezone");
var FsDatePickDirective = (function () {
    function FsDatePickDirective(_elementRef, renderer, factoryResolver, viewContainerRef, fsDatePickerCommon, fsDatepickerFactory) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.factoryResolver = factoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.fsDatePickerCommon = fsDatePickerCommon;
        this.fsDatepickerFactory = fsDatepickerFactory;
        this.view = 'date';
        this.change$ = new core_1.EventEmitter();
        this._model = null;
        this.opened = false;
        this.$dialog = null;
        this.rootViewContainer = null;
        this._onTouched = function () { };
        this._onChange = function (value) { };
        this.onFocused = function (event) { };
    }
    FsDatePickDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    FsDatePickDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    FsDatePickDirective.prototype.ngOnInit = function () {
    };
    FsDatePickDirective.prototype.onChangeInterceptor = function ($event) {
        this.writeValue($event.target.value);
    };
    FsDatePickDirective.prototype.writeValue = function (value) {
        if (value) {
            if (moment(value).isValid()) {
                value = moment(value);
            }
            else {
                value = undefined;
            }
            this._model = value;
            this._onChange(value);
            this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTime(value, this.view);
            this.change$.emit(value);
        }
    };
    FsDatePickDirective.prototype.getValue = function () {
        return this._model ? moment(this._model) : this._model;
    };
    FsDatePickDirective.prototype.open = function () {
        var _this = this;
        this.opened = true;
        if (this.$dialog) {
            return;
        }
        this.fsDatepickerFactory.setRootViewContainerRef(this.viewContainerRef);
        this.$dialog = this.fsDatepickerFactory.addDynamicComponent();
        this.$dialog.instance.parentInstance = this;
        this.$dialog.instance.fsDatePickerModel.view = this.view;
        this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
        this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
        this.$dialog.instance.fsDatePickerModel.dateMode = 'date';
        setTimeout(function () {
            _this.fsDatePickerCommon.positionDialog(_this.$dialog, _this._elementRef);
        });
    };
    FsDatePickDirective.prototype.inputClick = function (e) {
        var _this = this;
        this.fsDatePickerCommon.inputClick(e, function () {
            _this.open();
        });
    };
    FsDatePickDirective.prototype.inputKeyup = function (e) {
        if (e.keyCode === 13) {
            this.inputBlur(e);
        }
    };
    FsDatePickDirective.prototype.inputBlur = function (event) { };
    FsDatePickDirective.prototype.onWindowResize = function (event) {
        this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    };
    FsDatePickDirective.prototype.ngOnDestroy = function () {
        if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
            this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "minYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "maxYear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "view", void 0);
    __decorate([
        core_1.Output('change'),
        __metadata("design:type", Object)
    ], FsDatePickDirective.prototype, "change$", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatePickDirective.prototype, "onWindowResize", null);
    FsDatePickDirective = __decorate([
        core_1.Directive({
            host: {
                '(input)': 'onChangeInterceptor($event)',
                '(click)': 'inputClick($event)',
                '(keyup)': 'inputKeyup($event)',
                '(blur)': 'inputBlur($event)',
            },
            selector: '[fsDatePicker]',
            providers: [fsdatepicker_value_accessor_1.DATEPICKER_VALUE_ACCESSOR]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.Renderer)),
        __param(2, core_1.Inject(core_1.ComponentFactoryResolver)),
        __param(3, core_1.Inject(core_1.ViewContainerRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer, Object, Object, fsdatepickercommon_service_1.FsDatePickerCommon,
            fsdatepickerfactory_service_1.FsDatepickerFactory])
    ], FsDatePickDirective);
    return FsDatePickDirective;
}());
exports.FsDatePickDirective = FsDatePickDirective;
//# sourceMappingURL=fsdatepick.directive.js.map