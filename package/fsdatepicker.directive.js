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
var fsdatepicker_value_accessor_1 = require("./fsdatepicker.value-accessor");
var fsdatepickerdialogfactory_service_1 = require("./fsdatepickerdialogfactory.service");
var common_1 = require("@firestitch/common");
var moment = require("moment-timezone");
var FsDatepickerDirective = (function () {
    function FsDatepickerDirective(_elementRef, renderer, factoryResolver, viewContainerRef, FsDatepickerDialogFactory, FsUtil) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.factoryResolver = factoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.FsDatepickerDialogFactory = FsDatepickerDialogFactory;
        this.FsUtil = FsUtil;
        this.hasTime = false;
        this.view = 'calendar';
        this.disabledDays = null;
        this.disabledMinutes = [];
        this.disabledHours = [];
        this.disabledTimes = [];
        this.change$ = new core_1.EventEmitter();
        this._model = null;
        this.opened = false;
        this.selected = {};
        this.yearList = [];
        this.$dialog = null;
        this.rootViewContainer = null;
        // event hooks for VALUE_ACCESSOR. those are used to imitate real input behavior and emit events outside the directive, e.g. "touched"
        this._onTouched = function () { };
        this._onChange = function (value) { };
        this.onFocused = function (event) { };
    }
    // we initiate those functions to emit events outside the component
    FsDatepickerDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    FsDatepickerDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    FsDatepickerDirective.prototype.ngOnInit = function () {
        this.hasDate = this.hasDate === undefined ? true : this.hasDate;
        this.hasCalendar = this.hasCalendar === undefined ? true : this.hasCalendar;
        this.minYear = this.minYear || (parseInt(moment().format('YYYY')) - 100);
        this.maxYear = this.maxYear || (parseInt(moment().format('YYYY')) + 100);
        this.hasTime = this.hasTime;
    };
    FsDatepickerDirective.prototype.onChangeInterceptor = function ($event) {
        this.writeValue($event.target.value);
    };
    FsDatepickerDirective.prototype.writeValue = function (value) {
        if (value) {
            if (moment(value).isValid()) {
                value = moment(value);
            }
            else {
                value = undefined;
            }
            this._model = value;
            this._onChange(value);
            this.render(this._elementRef);
            this.change$.emit(value);
        }
    };
    FsDatepickerDirective.prototype.getValue = function () {
        return this._model ? moment(this._model) : this._model;
    };
    FsDatepickerDirective.prototype.open = function () {
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
    FsDatepickerDirective.prototype.inputClick = function (e) {
        var x = e.clientX, y = e.clientY, stack = [], el;
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
        this.open();
    };
    FsDatepickerDirective.prototype.inputKeyup = function (e) {
        if (e.keyCode === 13) {
            this.inputBlur(e);
        }
    };
    FsDatepickerDirective.prototype.inputBlur = function (event) { };
    FsDatepickerDirective.prototype.onWindowResize = function (event) {
        this.positionDialog();
    };
    FsDatepickerDirective.prototype.positionDialog = function () {
        if (!this.$dialog || window.innerWidth < 500) {
            return;
        }
        var input = this._elementRef.nativeElement;
        var dialogContainer = this.$dialog.instance.element.nativeElement.querySelector('.fs-datetime-dialog');
        var dialogContainerStyles = window.getComputedStyle(dialogContainer);
        var inputBound = input.getBoundingClientRect();
        var dialogBound = this.$dialog.instance.element.nativeElement.getBoundingClientRect();
        var dialogContainerBound = dialogContainer.getBoundingClientRect();
        var top = parseInt(inputBound.top) + inputBound.height;
        var css = { top: '', bottom: '', left: '', right: '' };
        if ((top + this.FsUtil.int(dialogContainer.style.marginTop) + this.FsUtil.int(dialogContainerStyles.height)) > window.innerHeight) {
            css.bottom = '10px';
            dialogContainer.classList.add('vertical-reposition');
        }
        else {
            css.top = top + 'px';
            dialogContainer.classList.remove('vertical-reposition');
        }
        var left = parseInt(inputBound.left);
        if ((left + this.FsUtil.int(dialogContainerStyles.width)) > window.innerWidth) {
            css.right = '10px';
            dialogContainer.classList.add('horizontal-reposition');
        }
        else {
            css.left = left + 'px';
            dialogContainer.classList.remove('horizontal-reposition');
        }
        for (var i in css) {
            dialogContainer.style[i] = css[i];
        }
    };
    FsDatepickerDirective.prototype.render = function (input) {
        var format = [], options = {}, value = this.getValue();
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
            var year = parseInt(value.format('YYYY'));
            if (parseInt(this.selected['year']) != year) {
                this.yearList = [];
                for (var y = year + 100; y > (year - 100); y--) {
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
    FsDatepickerDirective.prototype.ngOnDestroy = function () {
        if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
            this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
        }
    };
    __decorate([
        core_1.Input('hasCalendar'),
        __metadata("design:type", Boolean)
    ], FsDatepickerDirective.prototype, "hasCalendar", void 0);
    __decorate([
        core_1.Input('hasDate'),
        __metadata("design:type", Boolean)
    ], FsDatepickerDirective.prototype, "hasDate", void 0);
    __decorate([
        core_1.Input('minYear'),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "minYear", void 0);
    __decorate([
        core_1.Input('maxYear'),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "maxYear", void 0);
    __decorate([
        core_1.Input('hasTime'),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "hasTime", void 0);
    __decorate([
        core_1.Input('view'),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "view", void 0);
    __decorate([
        core_1.Input('disabledDays'),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "disabledDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "disabledMinutes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "disabledHours", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "disabledTimes", void 0);
    __decorate([
        core_1.Output('change'),
        __metadata("design:type", Object)
    ], FsDatepickerDirective.prototype, "change$", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FsDatepickerDirective.prototype, "onWindowResize", null);
    FsDatepickerDirective = __decorate([
        core_1.Directive({
            host: {
                '(input)': 'onChangeInterceptor($event)',
                '(click)': 'inputClick($event)',
                '(keyup)': 'inputKeyup($event)',
                '(blur)': 'inputBlur($event)',
            },
            selector: '[fsDatepicker]',
            providers: [fsdatepicker_value_accessor_1.DATEPICKER_VALUE_ACCESSOR]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(core_1.Renderer)),
        __param(2, core_1.Inject(core_1.ComponentFactoryResolver)),
        __param(3, core_1.Inject(core_1.ViewContainerRef)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer, Object, Object, fsdatepickerdialogfactory_service_1.FsDatepickerDialogFactory,
            common_1.FsUtil])
    ], FsDatepickerDirective);
    return FsDatepickerDirective;
}());
exports.FsDatepickerDirective = FsDatepickerDirective;
//# sourceMappingURL=fsdatepicker.directive.js.map