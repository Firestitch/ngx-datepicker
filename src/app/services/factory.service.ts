import { ComponentFactoryResolver, Injectable, Inject } from '@angular/core';
import { FsDatepickerComponent } from '../components/datepicker/datepicker.component';

@Injectable()
export class FsDatepickerFactory {

  private factoryResolver = null;
  private rootViewContainer = null;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicComponent() {
    const factory = this.factoryResolver
                        .resolveComponentFactory(FsDatepickerComponent);

    const component = factory
      .create(this.rootViewContainer.parentInjector);

    this.rootViewContainer.insert(component.hostView);

    return component;
  }
}
