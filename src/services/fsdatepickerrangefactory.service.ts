import { ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector } from '@angular/core';
import { FsDatepickerRangeComponent } from './../components/fsdatepickerrange/fsdatepickerrange.component';

@Injectable()
export class FsDatepickerRangeFactory {

  private factoryResolver = null;
  private rootViewContainer = null;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent() {
    const factory = this.factoryResolver
                        .resolveComponentFactory(FsDatepickerRangeComponent);

    const component = factory
      .create(this.rootViewContainer.parentInjector);

    this.rootViewContainer.insert(component.hostView);

    return component;
  }
}
