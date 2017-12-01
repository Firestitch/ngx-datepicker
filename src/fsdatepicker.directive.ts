import { Directive, Input, Output, Inject, HostListener, ComponentFactoryResolver, ViewContainerRef,
   Renderer, ElementRef, EventEmitter, Pipe, OnInit, OnDestroy } from '@angular/core';
import { DATEPICKER_VALUE_ACCESSOR } from './fsdatepicker.value-accessor';
import { FsDatepickerDialogComponent } from './fsdatepickerdialog.component';
import { FsDatepickerDialogFactory } from './fsdatepickerdialogfactory.service';
import { FsUtil } from '@firestitch/common';
import moment from 'moment-timezone';

@Directive({
    host: {
      '(input)': 'onChangeInterceptor($event)',
      '(click)': 'inputClick($event)',
      '(keyup)': 'inputKeyup($event)',
      '(blur)': 'inputBlur($event)',
    },
    selector: '[fsDatepicker]',
    providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class FsDatepickerDirective implements OnInit, OnDestroy {

    @Input('hasCalendar') hasCalendar: boolean;
    @Input('hasDate') hasDate: boolean;
    @Input('minYear') minYear;
    @Input('maxYear') maxYear;
    @Input('hasTime') hasTime = false;
    @Input('view') view = 'calendar';
    @Input('disabledDays') disabledDays = null;

    @Output('change') change$ = new EventEmitter<any>();

    opened = false;

    selected = {};

    yearList = [];

    private $dialog = null;

    private rootViewContainer = null;

    //event hooks for VALUE_ACCESSOR. those are used to imitate real input behavior and emit events outside the directive, e.g. "touched"
    _onTouched = () => { };
    _onChange = (value: any) => { };
    onFocused = (event: any) => { };

    // we initiate those functions to emit events outside the component
    registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
    registerOnTouched(fn: () => any): void { this._onTouched = fn }

    constructor(
        @Inject(ElementRef) private _elementRef: ElementRef,
        @Inject(Renderer) private renderer: Renderer,
        @Inject(ComponentFactoryResolver) private factoryResolver,
        @Inject(ViewContainerRef) private viewContainerRef,
        private FsDatepickerDialogFactory: FsDatepickerDialogFactory,
        private FsUtil: FsUtil
    ) { }

    ngOnInit() {
      this.hasDate = this.hasDate === undefined ? true : this.hasDate;
      this.hasCalendar = this.hasCalendar === undefined ? true : this.hasCalendar;
      this.minYear = this.minYear || (parseInt(moment().format('YYYY')) - 100);
      this.maxYear = this.maxYear || (parseInt(moment().format('YYYY')) + 100);
      this.hasTime = this.hasTime;
    }

    onChangeInterceptor($event) {
      this.writeValue($event.target.value);
    }

    writeValue(value: any): void {

      if (value && moment(value).isValid()) {
        value = moment(value);
      }else {
        value = undefined;
      }

      this.renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
      this._onChange(value);
      this.render(this._elementRef);
      this.change$.emit(value);
    }

    getValue() {
      return moment(this._elementRef.nativeElement.value);
    }

    private open() {
      this.opened = true;
      this.view = 'calendar';

      if (!this.hasCalendar) {
        this.view = 'date';
      }

      if (this.$dialog) {
        this.$dialog.instance.drawMonths(this.getValue());
        return;
      }

      this.FsDatepickerDialogFactory.setRootViewContainerRef(this.viewContainerRef);
      this.$dialog = this.FsDatepickerDialogFactory.addDynamicComponent();
      this.$dialog.instance.parentInstance = this;
      this.$dialog.instance.drawMonths(this.getValue());
      setTimeout(() => {
        this.positionDialog();
      });
    }

    private inputClick(e) {

      let x = e.clientX,
      y = e.clientY,
      stack = [],
      el;

      do {

        el = document.elementFromPoint(x, y);

        const last = stack[stack.length - 1];

        if (last && last.isEqualNode(el)) {
          break;
        }

        el.classList.add('pointer-events-none');
        stack.push(el);

        if (el.className.match('/fs-datetime-backdrop/')) {
          setTimeout(function() {
            el.click();
          });
          break;
        }
      } while (el.tagName !== 'HTML' && !el.tagName.match(/^FS-DATETIME/));

      for (let i = 0; i < stack.length; i += 1) {
          stack[i].classList.remove('pointer-events-none');
      }

      this.open();
    }

    inputKeyup(e) {
      if (e.keyCode === 13) {
        this.inputBlur(e);
      }
    }

    inputBlur(event) { }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
      this.positionDialog();
    }

    positionDialog() {

      if (!this.$dialog || window.innerWidth < 500) {
        return;
      }

      const input = this._elementRef.nativeElement;
      const dialogContainer = this.$dialog.instance.element.nativeElement.querySelector('.fs-datetime-dialog');
      const dialogContainerStyles = window.getComputedStyle(dialogContainer);
      const inputBound = input.getBoundingClientRect();
      const dialogBound = this.$dialog.instance.element.nativeElement.getBoundingClientRect();
      const dialogContainerBound = dialogContainer.getBoundingClientRect();
      const top = parseInt(inputBound.top) + inputBound.height;

      let css = { top: '', bottom: '', left: '', right: '' };

      if ((top + this.FsUtil.int(dialogContainer.style.marginTop) + this.FsUtil.int(dialogContainerStyles.height)) > window.innerHeight) {
        css.bottom = '10px';
        dialogContainer.classList.add('vertical-reposition');
      } else {
        css.top = top + 'px';
        dialogContainer.classList.remove('vertical-reposition');
      }

      const left = parseInt(inputBound.left);

      if ((left + this.FsUtil.int(dialogContainerStyles.width)) > window.innerWidth) {
        css.right = '10px';
        dialogContainer.classList.add('horizontal-reposition');
      } else {
        css.left = left + 'px';
        dialogContainer.classList.remove('horizontal-reposition');
      }

      for (let i in css) {
        dialogContainer.style[i] = css[i];
      }
    }

    render(input) {
      let format = [],
        options = {},
        value = this.getValue();

      if (this.FsUtil.isInt(value)) {
        value = moment(new Date(value));
      } else if (this.FsUtil.isString(value)) {
        if (moment(value).isValid()) {
          value = moment(value);
        } else {
          value = moment(Date.parse(value));
        }
      }

      if (value && moment(value).isValid()) {

        if (this.hasDate) {
          format.push('MMM D, YYYY');
        }

        if (this.hasTime) {
          format.push('h:mm a');
        }

        input.nativeElement.value = value.format(format.join(' '));

        if (this.$dialog) {
          this.$dialog.instance.drawMonths(value);
        }

        let year = parseInt(value.format('YYYY'));

        if (parseInt(this.selected['year']) != year) {
          this.yearList = [];
          for (let y = year + 100; y > (year - 100); y--) {
            this.yearList.push(y);
          }
        }

        this.selected['date'] = value.format('YYYY-MM-DD');
        this.selected['hour'] = parseInt(value.format('H'));
        this.selected['minute'] = parseInt(value.format('m'));
        this.selected['year'] = parseInt(value.format('YYYY'));
        this.selected['month'] = parseInt(value.format('M'));
        this.selected['day'] = parseInt(value.format('D'));

      } else {
        input.nativeElement.value = '';

        this.selected['date'] = undefined;
        this.selected['hour'] = undefined;
        this.selected['minute'] = undefined;
        this.selected['year'] = undefined;
        this.selected['month'] = undefined;
        this.selected['day'] = undefined;
      }
    }

    ngOnDestroy() {
      if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
        this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
      }
    }
}
