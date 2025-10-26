import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
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

  public onChange: (value) => void;
  public onTouch: (value) => void;
  public name = `times${guid()}`;
  public time = null;
  public times = [];
  
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
    for (let i=0; i < 24; i++) {

      const meridiem = i >= 12 ? 'PM' : 'AM';
      const hour = i > 12 ? i - 12 : (i ? i : 12);
      this.times.push({
        name: `${hour}:00 ${meridiem}`,
        value: i * 60 * 60
      });
    }
  }


}
