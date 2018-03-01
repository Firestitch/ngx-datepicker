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
var fsdatepicker_component_1 = require("./../components/fsdatepicker/fsdatepicker.component");
var FsDatepickerFactory = (function () {
    function FsDatepickerFactory(factoryResolver) {
        this.factoryResolver = null;
        this.rootViewContainer = null;
        this.factoryResolver = factoryResolver;
    }
    FsDatepickerFactory.prototype.setRootViewContainerRef = function (viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    };
    FsDatepickerFactory.prototype.addDynamicComponent = function () {
        var factory = this.factoryResolver
            .resolveComponentFactory(fsdatepicker_component_1.FsDatepickerComponent);
        var component = factory
            .create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);
        return component;
    };
    FsDatepickerFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(core_1.ComponentFactoryResolver)),
        __metadata("design:paramtypes", [Object])
    ], FsDatepickerFactory);
    return FsDatepickerFactory;
}());
exports.FsDatepickerFactory = FsDatepickerFactory;
//# sourceMappingURL=fsdatepickerfactory.service.js.map