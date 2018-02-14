import { Directive, Input, Inject, Renderer, ElementRef, Pipe, OnInit, OnDestroy } from '@angular/core';
import IScroll from 'iscroll';

@Directive({
    selector: '[fsIscroll]'
})
export class FsIsscrollDirective implements OnInit, OnDestroy {

    @Input('fsOptions')
    fsOptions = {};

    @Input('fsInstance')
    fsInstance = {};

    constructor(private element: ElementRef) {}

    ngOnInit() {
      this.fsOptions = Object.assign({
        momentum: false,
        hScrollbar: false,
        mouseWheel: true,
        click: true
      }, this.fsOptions);

      setTimeout(() => {

        let instance = new IScroll(this.element.nativeElement, this.fsOptions);

        if (this.fsOptions['scrollToElement']) {
          instance.scrollToElement(this.fsOptions['scrollToElement'], 0);
        }

        if (this.fsOptions['scrollTo']) {
          instance.scrollTo(this.fsOptions['scrollTo'].x, this.fsOptions['scrollTo'].y, this.fsOptions['scrollTo'].time);
        }

        if (this.fsInstance) {
          this.fsInstance = Object.assign({}, this.fsInstance, instance);
          Object.setPrototypeOf(this.fsInstance, instance);
        }
      });
    }

    ngOnDestroy() {
      if (this.fsInstance) {
        this.fsInstance['destroy']();
      }
    }
}

