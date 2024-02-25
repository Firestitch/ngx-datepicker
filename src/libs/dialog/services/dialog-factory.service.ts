import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, Injector, Optional } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  skip,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { FsDesktopCalendarDialogComponent } from '../../dialog/modules/desktop-dialog-container/components/desktop-dialog/desktop-dialog.component';
import { FsMobileCalendarDialogComponent } from '../../dialog/modules/mobile-dialog-container/components/mobile-dialog/mobile-dialog.component';
import { FsDateScrollPickerDesktopComponent } from '../../dialog/modules/scroll-picker-dialog-container/components/date-scroll-picker-desktop/date-scroll-picker-desktop.component';
import { FsDateScrollPickerMobileDialogComponent } from '../../dialog/modules/scroll-picker-dialog-container/components/date-scroll-picker-mobile-dialog/date-scroll-picker-mobile-dialog.component';
import { FsDatePickerDialogRef } from '../classes/dialog-ref';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';

const mobileBreakpoint = '(max-width: 737px)';


@Injectable()
export class FsDatePickerDialogFactory {

  private _targetElRef: ElementRef;
  private _resolutionChanged = false;

  constructor(
    private _overlay: Overlay,
    private _breakpointObserver: BreakpointObserver,
    @Optional() private _bottomSheet: MatBottomSheet,
    @Inject(DOCUMENT) private _document,
  ) {}

  private get _escapeKeyPressed$(): Observable<any> {
    return fromEvent(this._document, 'keydown')
      .pipe(
        filter((event: any) => {
          return event.code === 'Escape';
        }),
      );
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
        mobileBreakpoint,
      ])
      .pipe(
        map((result) => {
          return result.breakpoints[mobileBreakpoint];
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
            );
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
        takeUntil(this._escapeKeyPressed$),
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
      }

      return this._openDateScrollPickerMobile(dialogRef);

    }
    if (type === 'date') {
      return this._openDatePickerDesktop(injector, dialogRef);
    }

    return this._openDateScrollPickerDesktop(injector, dialogRef);


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
        // /**
        //  * case when input has Y position top/center & is close to the right edge
        //  * |              []|
        //  * |                |
        //  * |                |
        //  */
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 10,
        },
        // /**
        //  * case when input has Y position top/center & is close to the left edge or 100% width
        //  * |[]              |
        //  * |[              ]|
        //  * |                |
        //  */
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 10,
        },
        // /**
        //  * case when input has Y position top/center & somewhere in the middle of page
        //  * |     []         |
        //  * |                |
        //  * |                |
        //  */
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 10,
        },
        // /**
        //  * case when input has Y position bottom & is close to the left edge
        //  * |                |
        //  * |                |
        //  * |[]              |
        //  */
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -20,
        },
        // /**
        //  * case when input has Y position bottom & is somewhere in the middle of X
        //  * |                |
        //  * |                |
        //  * |      []        |
        //  */
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -20,
        },
        // /**
        //  * case when input has Y position bottom & is close to the right edge of the page
        //  * |                |
        //  * |                |
        //  * |           []   |
        //  */
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -20,
        },
        // /**
        //  * case when input has Y position bottom & almost off the page on the right edge
        //  * |                |
        //  * |                |
        //  * |               [|]
        //  */
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -20,
        },

        // /**
        //  * case when input has Y position top/center & there is not enough height to go top/bottom
        //  * |     []         |
        //  */
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'center',
          overlayY: 'center',
        },
      ]);
  }

  private _createBasePopupPositionStrategy(el: ElementRef): FlexibleConnectedPositionStrategy {
    return this._overlay.position()
      .flexibleConnectedTo(el)
      .withGrowAfterOpen(false)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  private _openDatePickerDesktop (
    parentInjector: Injector,
    previewRef: FsDatePickerDialogRef,
  ): OverlayRef {
    const overlayRef = this._createOverlay(
      this._targetElRef,
      {
        positionStrategy: this._createBasePopupPositionStrategy(this._targetElRef),
      },
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
      },
      restoreFocus: false,
    });
  }

  private _openDateScrollPickerDesktop (
    parentInjector: Injector,
    previewRef: FsDatePickerDialogRef,
  ): OverlayRef {
    const overlayRef = this._createOverlay(
      this._targetElRef,
      { scrollStrategy: this._overlay.scrollStrategies.block() },
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
      },
    });
  }

}
