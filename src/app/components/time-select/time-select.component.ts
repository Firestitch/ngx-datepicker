import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { guid } from '@firestitch/common';


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
})
export class FsTimeSelectComponent implements OnInit, ControlValueAccessor {

  @Input() public label;
  @Input() public required = false;

  public onChange: (value) => void;
  public onTouch: (value) => void;
  public name = `times${guid()}`;
  public time;
  public times = [];
  
  public writeValue(value: any): void {
    this.time = value;
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
  
  public ngOnInit(): void {
    for (let i=0; i < 24; i++) {
      this.times.push({
        name: i ? `${i}:00` : '12:00',
        value: i * 60 * 60
      });
    }
  }


}
