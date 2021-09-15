import { HostListener, OnDestroy, Directive } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsDateDialogRef } from '../../../classes/date-dialog-ref';


@Directive()
export class FsDatePickerBaseCalendarDialogDirective implements OnDestroy {

  @HostListener('document:keydown', ['$event'])
  public handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this._dialogRef.close();
    }
  }

  protected _destroy$ = new Subject();

  constructor(
    protected _dialogRef: FsDateDialogRef,
  ) {

    this._dialogRef.overlayRef
      .backdropClick()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.close();
      });
  }

  public close($event?) {
    this._dialogRef.close();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
