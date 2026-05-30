import { DOCUMENT } from '@angular/common';
import { createEnvironmentInjector, ElementRef, EnvironmentInjector, Injectable, Injector, inject } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
import { FsDateScrollPickerDesktopComponent } from '../../dialog/modules/scroll-picker-dialog-container/components/date-scroll-picker-desktop';
import { FsDatePickerDialogRef } from '../classes/dialog-ref';
import { IDialogFactoryOptions } from '../interfaces/dialog-factory-data.interface';
import { FsDateScrollPickerMobileComponent } from '../modules/scroll-picker-dialog-container/components/date-scroll-picker-mobile';

const mobileBreakpoint = '(max-width: 737px)';


@Injectable()
export class FsDatePickerDialogFactory {
  private _overlay = inject(Overlay);
  private _breakpointObserver = inject(BreakpointObserver);
  private _bottomSheet = inject(MatBottomSheet, { optional: true });
  private _document = inject(DOCUMENT);


  private _targetElRef: ElementRef;
  private _resolutionChanged = false;

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
  ): Injector {
    const providers = [
      { provide: FsDatePickerDialogRef, useValue: previewRef },
    ];

    return createEnvironmentInjector(providers, parentInjector as EnvironmentInjector);
  }

  /**
   * The `fsDatePicker` directive lives on the `<input>`, which is inset from the
   * mat-form-field border by the field's padding — and that padding differs between
   * appearances (`outline` vs `fill`), so anchoring the overlay to the input makes
   * the visible gap inconsistent.
   *
   * We keep the input as the connected origin but measure the distance from each
   * input edge to the corresponding edge of the field box (`.mat-mdc-text-field-wrapper`),
   * then offset the overlay by that distance. This aligns the panel with the visible
   * field border on every side, consistently across appearances.
   *
   * Returns zero offsets when there is no form field (e.g. a bare trigger).
   */
  private _getFieldOffsets(el: ElementRef): { start: number; end: number; top: number; bottom: number } {
    const nativeEl = el?.nativeElement as HTMLElement;
    const wrapper = nativeEl?.closest?.('.mat-mdc-text-field-wrapper');

    if (!wrapper) {
      return { start: 0, end: 0, top: 0, bottom: 0 };
    }

    const inputRect = nativeEl.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    return {
      // negative: shifts a left-aligned overlay out to the field's left border
      start: wrapperRect.left - inputRect.left,
      // positive: shifts a right-aligned overlay out to the field's right border
      end: wrapperRect.right - inputRect.right,
      // negative: lifts an above-the-field overlay up to the field's top border
      top: wrapperRect.top - inputRect.top,
      // positive: drops a below-the-field overlay down to the field's bottom border
      bottom: wrapperRect.bottom - inputRect.bottom,
    };
  }

  private _createPopupPositionStrategy(el: ElementRef): PositionStrategy {
    const field = this._getFieldOffsets(el);
    // Consistent gap between the field box and the panel, measured from the
    // visible field border (not the input) so it looks the same on every appearance.
    const gap = 4;

    return this._createBasePopupPositionStrategy(el)
      .withPositions([
        /**
         * Preferred: drop below the field, left edge aligned with the form-field border.
         * |[field]         |
         * |[overlay        |
         * |        ]       |
         */
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: field.start,
          offsetY: field.bottom + gap,
        },
        /**
         * Below the field, right edge aligned with the form-field border —
         * used when a left-aligned overlay would run off the right edge.
         * |         [field]|
         * |        overlay]|
         * |       [        |
         */
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: field.end,
          offsetY: field.bottom + gap,
        },
        /**
         * Above the field, left aligned — used when there is no room below.
         * |       [        |
         * |        ]       |
         * |[field]         |
         */
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: field.start,
          offsetY: field.top - gap,
        },
        /**
         * Above the field, right aligned — no room below and close to the right edge.
         * |       [        |
         * |        ]       |
         * |         [field]|
         */
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetX: field.end,
          offsetY: field.top - gap,
        },
        /**
         * Last resort: not enough vertical room either way — center next to the field.
         * |     [field]    |
         */
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
    return this._bottomSheet.open(FsDateScrollPickerMobileComponent, {
      data: {
        dateDialogRef: dialogRef,
      },
    });
  }

}
