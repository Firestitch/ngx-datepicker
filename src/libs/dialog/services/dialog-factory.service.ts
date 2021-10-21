import { ElementRef, Injectable, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  PositionStrategy,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  takeUntil,
  take,
  tap,
  map,
  switchMap,
  skip,
  distinctUntilChanged,
  filter,
  finalize,
} from 'rxjs/operators';

import { FsMobileCalendarDialogComponent } from '../../dialog/modules/mobile-dialog-container/components/mobile-dialog/mobile-dialog.component';
import { FsDateScrollPickerDesktopComponent } from '../../dialog/modules/scroll-picker-dialog-container/components/date-scroll-picker-desktop/date-scroll-picker-desktop.component';
import { FsDateScrollPickerMobileDialogComponent } from '../../dialog/modules/scroll-picker-dialog-container/components/date-scroll-picker-mobile-dialog/date-scroll-picker-mobile-dialog.component';
import { FsDesktopCalendarDialogComponent } from '../../dialog/modules/desktop-dialog-container/components/desktop-dialog/desktop-dialog.component';

import { FsDatePickerDialogRef } from '../classes/dialog-ref';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';

const MOBILE_BREAKPOINT = '(max-width: 737px)';


@Injectable()
export class FsDatePickerDialogFactory {

  private _targetElRef: ElementRef;
  private _resolutionChanged = false;

  constructor(
    private _overlay: Overlay,
    private _breakpointObserver: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    @Inject(DOCUMENT)
    private _document,
  ) {}

  private get _ESCKeyPressed$(): Observable<any> {
    return fromEvent(this._document, 'keydown')
      .pipe(
        filter((event: any) => {
          return event.code === 'Escape';
        })
      )
  }


  public openDatePicker(
    el: ElementRef,
    injector: Injector,
    options: IDialogFactoryOptions,
  ): FsDatePickerDialogRef {
    this._targetElRef = el;

    const dateDialogRef = new FsDatePickerDialogRef(options);

    this._openDatePicker(injector, 'date', dateDialogRef);

    return dateDialogRef;
  }

  public openDateScrollPicker(
    el: ElementRef,
    injector: Injector,
    options: IDialogFactoryOptions,
  ): FsDatePickerDialogRef {
    this._targetElRef = el;

    const dateDialogRef = new FsDatePickerDialogRef(options);

    this._openDatePicker(injector, 'scroll', dateDialogRef);

    return dateDialogRef;
  }

  private _openDatePicker(
    injector: Injector,
    type: 'date' | 'scroll',
    dialogRef: FsDatePickerDialogRef,
  ): void {
    const layoutChanges = this._breakpointObserver
      .observe([
        MOBILE_BREAKPOINT,
      ])
      .pipe(
        map((result) => {
          return result.breakpoints[MOBILE_BREAKPOINT];
        }),
      );

    layoutChanges
      .pipe(
        map((mobile) => {
          return this._openDatePickerComponent(
            mobile,
            injector,
            type,
            dialogRef,
          );
        }),
        tap((ref) => {
          dialogRef.pickerOverlayRef.setActiveOverlay(ref);
        }),
        take(1),
        switchMap(() => {
          return layoutChanges
            .pipe(
              skip(1),
            )
        }),
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this._resolutionChanged = true;
        }),
        tap(() => {
          dialogRef.pickerOverlayRef.close();
        }),
        map((mobile) => {
          return this._openDatePickerComponent(
            mobile,
            injector,
            type,
            dialogRef,
          );
        }),
        tap((ref) => {
          dialogRef.pickerOverlayRef.setActiveOverlay(ref);
        }),
        tap(() => {
          this._resolutionChanged = false;
        }),
        finalize(() => {
          dialogRef.close();
        }),
        takeUntil(
          dialogRef.pickerOverlayRef.destroy$
            .pipe(
              filter(() => !this._resolutionChanged),
            ),
        ),
        takeUntil(dialogRef.close$),
        takeUntil(this._ESCKeyPressed$),
      )
      .subscribe();
  }

  private _openDatePickerComponent(
    mobile: boolean,
    injector: Injector,
    type: 'date' | 'scroll',
    dialogRef: FsDatePickerDialogRef,
  ): OverlayRef | MatBottomSheetRef {
    if (mobile) {
      if (type === 'date') {
        return this._openDatePickerMobile(dialogRef);
      } else {
        return this._openDateScrollPickerMobile(dialogRef);
      }
    } else {
      if (type === 'date') {
        return this._openDatePickerDesktop(injector, dialogRef);
      } else {
        return this._openDateScrollPickerDesktop(injector, dialogRef);
      }
    }
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

  private _createInjector(
    parentInjector: Injector,
    previewRef: FsDatePickerDialogRef,
  ): PortalInjector {
    const injectionTokens = new WeakMap<any, any>([
      [FsDatePickerDialogRef, previewRef],
    ]);

    return new PortalInjector(parentInjector, injectionTokens);
  }

  private _createPopupPositionStrategy(el: ElementRef): PositionStrategy {
    return this._createBasePopupPositionStrategy(el)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'center',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);
  }

  private _createBasePopupPositionStrategy(el: ElementRef): FlexibleConnectedPositionStrategy {
    return this._overlay.position()
      .flexibleConnectedTo(el)
      .withGrowAfterOpen(true)
      .withFlexibleDimensions(true)
      .withViewportMargin(9)
      .withPush(true)
  }

  private _openDatePickerDesktop (
    parentInjector: Injector,
    previewRef: FsDatePickerDialogRef,
  ): OverlayRef {
    const overlayRef = this._createOverlay(
      this._targetElRef,
      {
        positionStrategy: this._createBasePopupPositionStrategy(this._targetElRef),
      }
    );
    const injector = this._createInjector(parentInjector, previewRef);
    const containerPortal = new ComponentPortal(FsDesktopCalendarDialogComponent, undefined, injector);
    overlayRef.attach(containerPortal);

    return overlayRef;
  }


  private _openDatePickerMobile(dialogRef: FsDatePickerDialogRef): MatBottomSheetRef {
    return this._bottomSheet.open(FsMobileCalendarDialogComponent, {
      data: {
        dateDialogRef: dialogRef,
      }
    });
  }

  private _openDateScrollPickerDesktop (
    parentInjector: Injector,
    previewRef: FsDatePickerDialogRef,
  ): OverlayRef {
    const overlayRef = this._createOverlay(
      this._targetElRef,
      { scrollStrategy: this._overlay.scrollStrategies.block() }
    );
    const injector = this._createInjector(parentInjector, previewRef);
    const containerPortal = new ComponentPortal(FsDateScrollPickerDesktopComponent, undefined, injector);
    overlayRef.attach(containerPortal);

    return overlayRef;
  }


  private _openDateScrollPickerMobile(dialogRef: FsDatePickerDialogRef): MatBottomSheetRef {
    return this._bottomSheet.open(FsDateScrollPickerMobileDialogComponent, {
      data: {
        dateDialogRef: dialogRef,
      }
    });
  }

}