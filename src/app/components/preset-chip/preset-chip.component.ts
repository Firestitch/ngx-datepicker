import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
} from '@angular/core';

import { FsChipComponent } from '@firestitch/chip';

import { IDatePresetItem } from '../../../libs/common/interfaces/date-preset.interface';
import { WeekDays } from '../../../libs/common/types/week-days.type';
import { matchDatePreset } from '../../../libs/components/presets/helpers/match-date-preset';
import { IFsDatePickerConfig } from '../../interfaces/datepicker-config.interface';
import { FS_DATEPICKER_CONFIG } from '../../providers/datepicker-config.provider';


/**
 * Names a range in a chip, whenever one of the presets happens to describe it —
 * "Last 7 days" instead of two dates the reader has to subtract. Stays empty for
 * a range no preset covers, so it can sit beside a picker permanently.
 *
 * It takes the dates rather than finding the picker itself, which is what lets
 * it be dropped anywhere on the page.
 */
@Component({
  selector: 'fs-date-picker-preset-chip',
  templateUrl: './preset-chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsChipComponent,
  ],
})
export class FsDatePickerPresetChipComponent implements OnChanges {

  @Input()
  public from: Date;

  @Input()
  public to: Date;

  @Input()
  public weekStartsOn: WeekDays;

  @Input()
  public size: 'small' | 'tiny' | 'micro' | 'medium' | 'large' = 'small';

  @Input()
  public backgroundColor: string;

  @Input()
  public color: string;

  public preset: IDatePresetItem;

  private _globalConfig = inject<IFsDatePickerConfig>(FS_DATEPICKER_CONFIG, { optional: true });

  public ngOnChanges(): void {
    this.preset = matchDatePreset(this.from, this.to, {
      weekStartsOn: this.weekStartsOn ?? this._globalConfig?.weekStartsOn,
    });
  }

}
