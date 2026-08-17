import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { DatePreset } from '../../common/enums/date-preset.enum';
import { IDatePresetItem } from '../../common/interfaces/date-preset.interface';
import { WeekDays } from '../../common/types/week-days.type';

import { getDatePresets } from './helpers/get-date-presets';


@Component({
  selector: 'fs-date-picker-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-date-picker-presets',
  },
  standalone: true,
})
export class FsDatePickerPresetsComponent implements OnChanges {

  @Input()
  public weekStartsOn: WeekDays;

  @Input()
  public preset: DatePreset;

  @Output()
  public presetChange = new EventEmitter<DatePreset>();

  public presets: IDatePresetItem[] = getDatePresets();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.weekStartsOn) {
      this.presets = getDatePresets(this.weekStartsOn);
    }
  }

  public select(item: IDatePresetItem): void {
    this.preset = item.preset;

    this.presetChange.emit(this.preset);
  }

}
