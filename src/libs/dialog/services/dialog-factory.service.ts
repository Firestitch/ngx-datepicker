import { ElementRef, Injectable, Injector } from '@angular/core';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  PositionStrategy,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';

import { FsDesktopCalendarDialogComponent } from '../modules/desktop-dialog-container/components/desktop-dialog/desktop-dialog.component';
import { FsDateScrollPickerDialogComponent } from '../modules/scroll-picker-dialog-container/components/date-scroll-picker-dialog/date-scroll-picker-dialog.component';
import { FsDateDialogRef } from '../classes/date-dialog-ref';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';


@Injectable()
export class FsDatePickerDialogFactory {

  private _activePickerType: 'date' | 'scroll';
  private _activePickerOptions: IDialogFactoryOptions;

  constructor(private _overlay: Overlay) {}

  public openDatePicker(
    el: ElementRef,
    injector: Injector,
    options: IDialogFactoryOptions,
  ): FsDateDialogRef {
    const overlayRef = this._createOverlay(el);

    const dateDialogRef = new FsDateDialogRef(options, overlayRef);
    dateDialogRef.positionStrategy = this._createBasePopupPositionStrategy(el);

    this._openPortalPreview(
      injector,
      FsDesktopCalendarDialogComponent,
      overlayRef,
      dateDialogRef,
    );

    this._setActivePicker('date', options);

    return dateDialogRef;
  }

  public openDateScrollPicker(
    el: ElementRef,
    injector: Injector,
    options: IDialogFactoryOptions,
  ): FsDateDialogRef {
    const overlayRef = this._createOverlay(
      el,
      { scrollStrategy: this._overlay.scrollStrategies.block() }
    );

    const dateDialogRef = new FsDateDialogRef(options, overlayRef);
    dateDialogRef.positionStrategy = this._createBasePopupPositionStrategy(el);

    this._openPortalPreview(
      injector,
      FsDateScrollPickerDialogComponent,
      overlayRef,
      dateDialogRef
    );

    this._setActivePicker('date', options);

    return dateDialogRef;
  }

  private _createOverlay(el: ElementRef, config: OverlayConfig = {}) {
    config = {
      ...config,
      positionStrategy: this._createPopupPositionStrategy(el),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: [],
      panelClass: 'fs-datepicker-overlay-pane',
    };

    const overlayConfig = new OverlayConfig(config);

    return this._overlay.create(overlayConfig);
  }

  private _openPortalPreview(
    parentInjector: Injector,
    component: ComponentType<any>,
    overlayRef: OverlayRef,
    previewRef: FsDateDialogRef,
  ) {
    const injector = this._createInjector(parentInjector, previewRef);
    const containerPortal = new ComponentPortal(component, undefined, injector);
    const containerRef = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private _createInjector(
    parentInjector: Injector,
    previewRef: FsDateDialogRef,
  ): PortalInjector {
    const injectionTokens = new WeakMap<any, any>([
      [FsDateDialogRef, previewRef],
    ]);

    return new PortalInjector(parentInjector, injectionTokens);
  }

  private _createPopupPositionStrategy(el: ElementRef): PositionStrategy {
    return this._createBasePopupPositionStrategy(el)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: -29,
          offsetY: 5,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        }
      ]);
  }

  private _createBasePopupPositionStrategy(el: ElementRef): FlexibleConnectedPositionStrategy {
    return this._overlay.position()
      .flexibleConnectedTo(el)
      .withGrowAfterOpen(true)
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withLockedPosition()
  }

  private _setActivePicker(type: 'date' | 'scroll', options: IDialogFactoryOptions) {
    this._activePickerType = type;
    this._activePickerOptions = options;
  }
}
