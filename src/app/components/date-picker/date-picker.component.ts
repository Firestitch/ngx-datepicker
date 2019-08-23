import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  Renderer2,
  ViewContainerRef,
  Component,
  Injector,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { FsDatepickerFactory } from '../../services/factory.service';
import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { createDateFromValue } from '../../helpers/create-date-from-value';
import { formatDateTime } from '../../helpers/format-date-time';
import { DateFormat } from '../../enums/date-format.enum';


@Component({
  selector: '[fsDatePicker]',
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsDatePickerComponent),
    multi: true
  }]
})
export class FsDatePickerComponent extends FsDatePickerBaseComponent implements AfterViewInit {

  @Input() public minYear = null;
  @Input() public ngModel = null;
  @Input() public maxYear = null;
  @Input() public minDate = null;
  @Input() public maxDate = null;
  @Input() public view = DateFormat.Date;
  @Input() public set hideClearButton(value: boolean) {
    const parentNode = this.elementRef.nativeElement.parentNode.parentNode;

    this._hideClearButton = value;

    this._hideClearButton
      ? parentNode.classList.add('hide-clear')
      : parentNode.classList.remove('hide-clear');
  }
  public get hideClearButton(): boolean {
    return this._hideClearButton;
  }

  @Output('change')
  public change$ = new EventEmitter<any>();

  private _hideClearButton: boolean = null;

  constructor(
    protected renderer: Renderer2,
    protected injector: Injector,
    @Inject(ElementRef) protected elementRef: ElementRef,
    @Inject(ViewContainerRef) private viewContainerRef,
    protected fsDatepickerFactory: FsDatepickerFactory,
  ) {
    super(renderer, elementRef);
  }

  public ngAfterViewInit() {
    this.setReadonly();
  }

  public writeValue(value: any): void {
    this.ngModel = createDateFromValue(value);
    this.updateInput(value);
  }

  public updateInput(value) {
    this.elementRef.nativeElement.value = formatDateTime(value, this.view);
  }

  protected open() {

    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this.fsDatepickerFactory.openDatePicker(
      this.elementRef,
      this.injector,
      {
        elementRef: this.elementRef,
        modelValue: this.ngModel,
        view: this.view,
        minYear: this.minYear,
        maxYear: this.maxYear,
        minDate: this.minDate,
        maxDate: this.maxDate,
        dateMode: 'date',
        components: this._getDefaultComponents(),
        parentComponent: this
      }
    );

    super.open();
  }

  private _getDefaultComponents() {
    if (this.view === 'time') {
      return { timeStart: true };
    } else {
      return { calendarStart: true };
    }
  }
}
