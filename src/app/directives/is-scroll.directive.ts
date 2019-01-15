import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as IScroll from 'iscroll';


@Directive({
    selector: '[fsIscroll]'
})
export class FsIsscrollDirective implements OnInit, OnDestroy {

    @Input('fsOptions')
    public fsOptions = {};

    @Input('fsInstance')
    public fsInstance = {};

    constructor(private element: ElementRef) {}

    public ngOnInit() {

      setTimeout(() => {

        this.fsOptions = Object.assign({
          momentum: false,
          hScrollbar: false,
          mouseWheel: true,
          click: true,
          scrollToElement: this.element.nativeElement
            .getElementsByClassName('iscroll-scroller')[0]
            .getElementsByClassName('year today selected')[0]
        }, this.fsOptions);

        const instance = new IScroll(this.element.nativeElement, this.fsOptions);

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

    public ngOnDestroy() {
      if (this.fsInstance) {
        this.fsInstance['destroy']();
      }
    }
}

