import {  Directive, Output, EventEmitter, HostListener } from '@angular/core';


@Directive({
    selector: '[fsClick]'
})
export class ClickDirective {

  static touch = false;
  @Output('fsClick') func = new EventEmitter();

  public touchDate = null;
  constructor() {}

  @HostListener('click', ['$event.target', '$event'])
  click(el, e) {
    if (!ClickDirective.touch) {
      this.func.emit(e);
    }
    ClickDirective.touch = false;
  }

  @HostListener('touchstart', ['$event.target', '$event'])
  touchstart(el, e) {
    ClickDirective.touch = true;
  }

  @HostListener('touchend', ['$event.target', '$event'])
  touchend(el, e) {
      this.func.emit(e);
  }
}

