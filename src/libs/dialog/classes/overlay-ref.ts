import { OverlayRef } from '@angular/cdk/overlay';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BehaviorSubject, merge } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';


export class FsDatePickerOverlayRef {

  private _activeOverlayRef$ = new BehaviorSubject<OverlayRef | MatBottomSheetRef | null>(null);

  public get destroy$() {
    return this._activeOverlayRef$
      .pipe(
        filter((ref) => !!ref),
        switchMap((ref) => {
          if (ref instanceof OverlayRef) {
            return merge(
              ref.detachments(),
              ref.backdropClick(),
            );
          } else {
            return merge(
              ref.afterDismissed(),
              ref.backdropClick(),
            );
          }
        }),
      );
  }

  public get activeOverlayRef(): OverlayRef | MatBottomSheetRef | null {
    return this._activeOverlayRef$.getValue();
  }

  public setActiveOverlay(ref: OverlayRef | MatBottomSheetRef): void {
    this._activeOverlayRef$.next(ref);
  }

  public close(): void {
    if (this.activeOverlayRef instanceof OverlayRef) {
      this.activeOverlayRef?.detach();
      this.activeOverlayRef?.dispose();
    }

    if (this.activeOverlayRef instanceof MatBottomSheetRef) {
      this.activeOverlayRef?.dismiss();
    }

    this.setActiveOverlay(null);
  }

}
