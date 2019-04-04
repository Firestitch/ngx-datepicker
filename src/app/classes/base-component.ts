import { Renderer2, HostListener, ElementRef } from '@angular/core';

import { FsDatePickerCommon } from '../services/common.service';
import { FsDatePickerBirthdayDialogComponent } from '../components/birthday-dialog/birthday-dialog.component';


export abstract class FsDatePickerBaseComponent {

  public opened = false;
  protected model = null;
  protected dialog = null;
  protected elementRef;
  protected renderer;
  protected fsDatePickerCommon;

  @HostListener('click', ['$event'])
  public inputClick(event) {
    this.fsDatePickerCommon.inputClick(event, () => {
      this.open();
    });
  }

  @HostListener('focus', ['$event'])
  public onFocus($event) {
    setTimeout(() => {
      this.elementRef.nativeElement.blur();
    });
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event) {
    if (!this.dialog) {
      return;
    }

    if (this.dialog.instance instanceof FsDatePickerBirthdayDialogComponent) {
      this.fsDatePickerCommon.positionDialogUnderInput(this.dialog, this.elementRef);
      return;
    }

    this.fsDatePickerCommon.positionDialog(this.dialog, this.elementRef);
  }

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    fsDatePickerCommon: FsDatePickerCommon
  ) {
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.fsDatePickerCommon = fsDatePickerCommon;
  }

  protected open() {
    this.renderer.addClass(document.body, 'fs-date-picker-open');
    this.opened = true;
  }

  protected close() {
    this.renderer.removeClass(document.body, 'fs-date-picker-open');
    this.opened = false;
  }

  protected setReadonly() {
    setTimeout(() => {
      this.elementRef.nativeElement.setAttribute('readonly', true);
    });
  }

}
