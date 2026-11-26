import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { guid } from '@firestitch/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { NgClass } from '@angular/common';


@Component({
    selector: 'fs-time-select',
    templateUrl: './time-select.component.html',
    styleUrls: ['./time-select.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FsTimeSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        MatOption,
        NgClass,
    ],
})
export class FsTimeSelectComponent implements OnInit, ControlValueAccessor {

  @Input() public label;
  @Input() public required = false;
  @Input() public fieldClass;
  @Input() public initialHour;

  /** Minutes between the listed times: 60 lists every hour (the default), 30 every half-hour. */
  @Input() public interval = 60;

  public onChange: (value) => void;
  public onTouch: (value) => void;
  public name = `times${guid()}`;
  public time = null;
  public times = [];

  @ViewChild(MatSelect, { static: true })
  private _select: MatSelect;

  /** Opens the list, as a click on the field does: for a form that moves on to this field. */
  public open(): void {
    this._select.open();
  }

  public writeValue(value: any): void {
    this.time = value === undefined ? null : value;
  }

  public change(value): void {
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    
  }  

  public openedChange(value) {
    if(value && this.initialHour && (this.time === null)) {
      const el = document.querySelector('.time-select-option-' + (this.initialHour * 60 * 60));
      el?.scrollIntoView();
    }
  }
  
  public ngOnInit(): void {
    // An interval that is not a positive number of minutes lists every hour, as before.
    const interval = this.interval > 0 ? this.interval : 60;
    for (let minuteOfDay = 0; minuteOfDay < 24 * 60; minuteOfDay += interval) {
      const hour = Math.floor(minuteOfDay / 60);
      const minute = String(minuteOfDay % 60).padStart(2, '0');
      const meridiem = hour >= 12 ? 'PM' : 'AM';
      this.times.push({
        name: `${hour % 12 || 12}:${minute} ${meridiem}`,
        value: minuteOfDay * 60,
      });
    }
  }


}
