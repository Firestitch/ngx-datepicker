import { Directive, Input, Output, Inject, HostListener, ComponentFactoryResolver, ViewContainerRef,
   Renderer, ElementRef, EventEmitter, Pipe, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { DATEPICKER_RANGE_VALUE_ACCESSOR } from './../value-accessors/fsdatepickerrange.value-accessors';
import { FsDatepickerComponent } from './../components/fsdatepicker/fsdatepicker.component';
import { FsDatepickerRangeFactory } from './../services/fsdatepickerrangefactory.service';
import { FsPreset } from './../interfaces/fspreset.interface';
import { FsDatePickerCommon } from './../services/fsdatepickercommon.service';
import * as moment from 'moment-timezone';

@Directive({
    host: {
      '(input)': 'onChangeInterceptor($event)',
      '(click)': 'inputClick($event)',
      '(keyup)': 'inputKeyup($event)',
      '(blur)': 'inputBlur($event)',
    },
    selector: '[fsDatePickerRange]',
    providers: [DATEPICKER_RANGE_VALUE_ACCESSOR]
})
export class FsDatePickRangeDirective implements OnInit, OnChanges, OnDestroy {

    @Input() public minYear = null;
    @Input() public maxYear = null;
    @Input() public view = 'date';
    @Input() public ngModelStart = null;
    @Input() public ngModelEnd = null;
    @Input() public presets: FsPreset[] = [];

    @Output() public ngModelStartChange = new EventEmitter<any>();
    @Output() public ngModelEndChange = new EventEmitter<any>();

    @Output('change') public change$ = new EventEmitter<any>();

    public opened = false;

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
        private fsDatepickerRangeFactory: FsDatepickerRangeFactory
    ) { }

    ngOnInit() {
      setTimeout(() => {
        this._elementRef.nativeElement.setAttribute('readonly', true);
      });
    }

    ngOnChanges(changes) {

      if (!changes) {
        return;
      }

      if (changes.ngModelStart || changes.ngModelEnd) {

        if (typeof this.ngModelStart === 'string' || typeof this.ngModelEnd === 'string') {
          setTimeout(() => {
            this.writeValue(this.ngModelStart, this.ngModelEnd);
          });
          return;
        }

        const viewData = { start_date: this.ngModelStart, end_date: this.ngModelEnd };

        this._onChange(viewData);
        this._elementRef.nativeElement.value = this.fsDatePickerCommon.formatDateTimeRange(viewData, this.view);
        this.change$.emit(viewData);
      }
    }

    writeValue(startDate, endDate): void {
      this.ngModelStartChange.emit(startDate && moment(startDate).isValid() ? moment(startDate) : startDate);
      this.ngModelEndChange.emit(endDate && moment(endDate).isValid() ? moment(endDate) : endDate);
    }

    private open() {
      this.opened = true;

      if (this.$dialog) {

        // @TODO remove this
        // Set first time tab as active
        // if (this.$dialog.instance.rangeTimeTabGroup) {
        //  this.$dialog.instance.rangeTimeTabGroup.selectedIndex = 0;
        // }
        return;
      }

      this.fsDatepickerRangeFactory.setRootViewContainerRef(this.viewContainerRef);
      this.$dialog = this.fsDatepickerRangeFactory.addDynamicComponent();
      this.$dialog.instance.parentInstance = this;

      this.$dialog.instance.fsDatePickerModel.view = this.view;
      this.$dialog.instance.fsDatePickerModel.minYear = this.minYear;
      this.$dialog.instance.fsDatePickerModel.maxYear = this.maxYear;
      this.$dialog.instance.fsDatePickerModel.presets = this.presets;
      this.$dialog.instance.fsDatePickerModel.dateMode = { start_date: 'date', end_date: 'date' };

      if (this.view === 'time') {
        this.$dialog.instance.fsDatePickerModel.components = { timeStart: true };
      } else {
        this.$dialog.instance.fsDatePickerModel.components = { calendarStart: true, calendarEnd: true };
      }

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
