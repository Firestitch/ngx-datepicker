import { OverlayRef } from '@angular/cdk/overlay';


export class FsDateDialogRef {
  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
