import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { IFsDatePickerPreset } from '../../../app/interfaces/datepicker-preset.interface';
import { WeekDays } from '../../common/types/week-days.type';

import { getPresetList } from './helpers/get-preset-list';


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
export class FsDatePickerPresetsComponent {

  public weekStartsOn = input<WeekDays>();

  /**
   * A host's own presets, merged into the built-in list (getPresetList).
   */
  public presets = input<IFsDatePickerPreset[] | null>(null);

  public presetChange = output<string>();

  public items = computed(() => getPresetList(this.presets(), this.weekStartsOn()));

  // The preset just clicked, marked while the list is open.
  public selected = signal<string | null>(null);

  public select(key: string): void {
    this.selected.set(key);

    this.presetChange.emit(key);
  }

}
