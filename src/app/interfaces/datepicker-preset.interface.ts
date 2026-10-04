/**
 * A preset of a host's own (`IFsDatePickerConfig.presets`), listed beside the
 * built-in ones. A preset whose key is a built-in's (a DatePreset value)
 * replaces that one.
 *
 * `from` and `to` are each a date, or a function that gives one. A function is
 * called again when the preset is picked, so a rolling range such as "Last 14
 * days" always ends on the day of the pick. Picking a preset only sets the
 * range's two dates.
 */
export interface IFsDatePickerPreset {
  key: string;
  name: string;
  from: Date | (() => Date);
  to: Date | (() => Date);
}
