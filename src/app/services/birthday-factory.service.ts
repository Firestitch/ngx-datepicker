import { ComponentFactoryResolver, Injectable, Inject } from '@angular/core';
import { FsDatepickerBirthdayComponent } from '../components/birthday/birthday.component';


@Injectable()
export class FsDatepickerBirthdayFactory {

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
      .resolveComponentFactory(FsDatepickerBirthdayComponent);

    const component = factory
      .create(this.rootViewContainer.parentInjector);

    this.rootViewContainer.insert(component.hostView);

    return component;
  }
}
