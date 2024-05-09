import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { guid } from '@firestitch/common';


@Component({
  selector: 'fs-weekday-select',
  templateUrl: './weekday-select.component.html',
  styleUrls: ['./weekday-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsWeekdaySelectComponent),
      multi: true,
    },
  ],
})
export class FsWeekdaySelectComponent implements ControlValueAccessor {

  @Input() public label;
  @Input() public required = false;
  @Input() public fieldClass;
  @Input() public placeholder;

  public onChange: (value) => void;
  public onTouch: (value) => void;
  public name = `weekday${guid()}`;
  public weekday;
  public weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  
  public writeValue(value: any): void {
    this.weekday = value;
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

}
