import { ComponentFactoryResolver, Injectable, Inject } from '@angular/core';
import { FsDatePickerRangeDialogComponent } from '../components/range-dialog/range-dialog.component';


@Injectable()
export class FsDatepickerRangeFactory {

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
                        .resolveComponentFactory(FsDatePickerRangeDialogComponent);

    const component = factory
      .create(this.rootViewContainer.parentInjector);

    this.rootViewContainer.insert(component.hostView);

    return component;
  }
}
