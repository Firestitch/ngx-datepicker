import {
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewContainerRef,
  Component,
  Injector, HostListener,
} from '@angular/core';

import { date } from '@firestitch/date';

import { FsDatePickerBaseComponent } from '../../classes/base-component';
import { FsDatepickerFactory } from '../../services/factory.service';
import { formatDateTime } from '../../helpers/format-date-time';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  template: '<fs-clear [show]="ngModel" (clear)="cleared()"></fs-clear>',
  selector: '[fsDatePickerBirthday]',
})
export class FsDatePickerBirthdayComponent extends FsDatePickerBaseComponent implements OnChanges, OnDestroy {

  @Input() public minYear = null;
  @Input() public maxYear = null;
  @Input() public format = 'MMM d, yyyy';

  private _ngModel = null;
  @Input() public set ngModel(value) {
    this._ngModel = date(value);
    this._updateDialogDate();
  };
  public get ngModel() {
    return this._ngModel;
  }
  @Output() public ngModelChange = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    protected _injector: Injector,
    private fsDatepickerFactory: FsDatepickerFactory,
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef,
  ) {
    super(renderer, _elementRef);
  }

  public setValue(value: Date) {
    this.ngModelChange.emit(value);
  }

  public ngOnChanges(changes) {
    if (changes.ngModel) {
      setTimeout(() => {
        this._elementRef.nativeElement.value = formatDateTime(this.ngModel);
      });
    }
  }

  public cleared() {
    this.setValue(null);
    this._updateDialogDate();
  }

  public ngOnDestroy() {
    if (this.dialog && this.dialog.instance.element.nativeElement.parentNode) {
      this.dialog.instance.element.nativeElement.parentNode.removeChild(this.dialog.instance.element.nativeElement);
    }
  }

  protected open() {
    super.open();

    if (this._dateDialogRef) {
      return;
    }

    this._dateDialogRef = this.fsDatepickerFactory.openBirthDayPicker(
      this.elementRef,
      this._injector,
      {
        parentDirective: this,
      }
    );

    this._dateDialogRef.close$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._dateDialogRef = null;
        this.renderer.removeClass(document.body, 'fs-date-picker-open');
      });

    // Calculate position each time on dialog open. Template can be dynamic
    setTimeout(() => {
      // this._fsDatePickerCommon.positionDialogUnderInput(this.dialog, this._elementRef);
    });
  }

  private _updateDialogDate() {
    if (this.dialog && this.dialog.instance) {
      setTimeout(() => {
        this.dialog.instance.setSelectedDate();
      });
    }
  }

}
