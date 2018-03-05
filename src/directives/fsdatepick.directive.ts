import { Directive, Input, Output, Inject, HostListener, ComponentFactoryResolver, ViewContainerRef,
   Renderer, ElementRef, EventEmitter, Pipe, OnInit, OnDestroy } from '@angular/core';
import { DATEPICKER_VALUE_ACCESSOR } from './../value-accessors/fsdatepicker.value-accessor';
import { FsDatepickerComponent } from './../components/fsdatepicker/fsdatepicker.component';
import { FsDatepickerFactory } from './../services/fsdatepickerfactory.service';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import * as moment from 'moment-timezone';

@Directive({
    host: {
      '(input)': 'onChangeInterceptor($event)',
      '(click)': 'inputClick($event)',
      '(keyup)': 'inputKeyup($event)',
      '(blur)': 'inputBlur($event)',
    },
    selector: '[fsDatePicker]',
    providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class FsDatePickDirective implements OnInit, OnDestroy {

    @Input() minYear;
    @Input() maxYear;
    @Input() view = 'date';

    @Output('change') change$ = new EventEmitter<any>();

    private _model = null;

    opened = false;

    private $dialog = null;

    private rootViewContainer = null;

    _onTouched = () => { };
    _onChange = (value: any) => { };
    onFocused = (event: any) => { };

    registerOnChange(fn: (value: any) => any): void { this._onChange = fn }
    registerOnTouched(fn: () => any): void { this._onTouched = fn }

    constructor(
        @Inject(ElementRef) private _elementRef: ElementRef,
        @Inject(Renderer) private renderer: Renderer,
        @Inject(ComponentFactoryResolver) private factoryResolver,
        @Inject(ViewContainerRef) private viewContainerRef,
        private fsDatePickerCommon: FsDatePickerCommon,
        private fsDatepickerFactory: FsDatepickerFactory
    ) { }

    ngOnInit() {
      setTimeout(() => {
        this._elementRef.nativeElement.setAttribute('readonly', true);
      });
    }

    onChangeInterceptor($event) {
      this.writeValue($event.target.value);
    }

    writeValue(value: any): void {
      if (value) {

        if (moment(value).isValid()) {
          value = moment(value);
        }else {
          value = undefined;
        }

        this._model = value;

        this._onChange(value);
        this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTime(value, this.view);
        this.change$.emit(value);
      }
    }

    getValue() {
      return this._model ? moment(this._model) : this._model;
    }

    private open() {
      this.opened = true;

      if (this.$dialog) {
        return;
      }

      this.fsDatepickerFactory.setRootViewContainerRef(this.viewContainerRef);
      this.$dialog = this.fsDatepickerFactory.addDynamicComponent();
      this.$dialog.instance.parentInstance = this;

      this.$dialog.instance.fsDatePickerModel.view = this.view;
      this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
      this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
      this.$dialog.instance.fsDatePickerModel.dateMode = 'date';

      setTimeout(() => {
        this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
      });
    }

    private inputClick(e) {
      this.fsDatePickerCommon.inputClick(e, () => {
        this.open();
      });
    }

    inputKeyup(e) {
      if (e.keyCode === 13) {
        this.inputBlur(e);
      }
    }

    inputBlur(event) { }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
      this.fsDatePickerCommon.positionDialog(this.$dialog, this._elementRef);
    }

    ngOnDestroy() {
      if (this.$dialog && this.$dialog.instance.element.nativeElement.parentNode) {
        this.$dialog.instance.element.nativeElement.parentNode.removeChild(this.$dialog.instance.element.nativeElement);
      }
    }
}
