import { DatePreset } from '../enums/date-preset.enum';


export interface IDatePresetItem {
  preset: DatePreset;
  name: string;
}

export interface IDatePresetRange {
  from: Date;
  to: Date;
}
