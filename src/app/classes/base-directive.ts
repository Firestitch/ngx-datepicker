import { Renderer2 } from '@angular/core';

export abstract class FsDatePickerBaseDirective {

  public opened = false;
  protected renderer;
  protected model = null;
  protected dialog = null;

  constructor(renderer: Renderer2) {
    this.renderer = renderer;
  }

  protected open() {
    this.renderer.addClass(document.body, 'fs-date-picker-open');
    this.opened = true;
  }

  protected close() {
    this.renderer.removeClass(document.body, 'fs-date-picker-open');
    this.opened = false;
  }

  protected abstract clear();
}
