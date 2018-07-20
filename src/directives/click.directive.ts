import {  Directive, Output, EventEmitter,
          Renderer2, HostListener } from '@angular/core';


@Directive({
    selector: '[fsClick]'
})
export class ClickDirective{

  static touch = false;
  @Output('fsClick') func = new EventEmitter();

  public touchDate = null;
  constructor(private renderer: Renderer2) {}

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
    this.touchDate = Date.now();
  }

  @HostListener('touchend', ['$event.target', '$event'])
  touchend(el, e) {
    const diff = Date.now() - this.touchDate;
    this.touchDate = 0;
    if (diff < 100) {
      this.func.emit(e);
    }
  }
}

