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
var IScroll = require("iscroll");
var FsIsscrollDirective = (function () {
    function FsIsscrollDirective(element) {
        this.element = element;
        this.fsOptions = {};
        this.fsInstance = {};
    }
    FsIsscrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.fsOptions = Object.assign({
                momentum: false,
                hScrollbar: false,
                mouseWheel: true,
                click: true,
                scrollToElement: _this.element.nativeElement
                    .getElementsByClassName('iscroll-scroller')[0]
                    .getElementsByClassName('year today selected')[0]
            }, _this.fsOptions);
            var instance = new IScroll(_this.element.nativeElement, _this.fsOptions);
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
    FsIsscrollDirective.prototype.ngOnDestroy = function () {
        if (this.fsInstance) {
            this.fsInstance['destroy']();
        }
    };
    __decorate([
        core_1.Input('fsOptions'),
        __metadata("design:type", Object)
    ], FsIsscrollDirective.prototype, "fsOptions", void 0);
    __decorate([
        core_1.Input('fsInstance'),
        __metadata("design:type", Object)
    ], FsIsscrollDirective.prototype, "fsInstance", void 0);
    FsIsscrollDirective = __decorate([
        core_1.Directive({
            selector: '[fsIscroll]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FsIsscrollDirective);
    return FsIsscrollDirective;
}());
exports.FsIsscrollDirective = FsIsscrollDirective;
//# sourceMappingURL=fsisscroll.directive.js.map