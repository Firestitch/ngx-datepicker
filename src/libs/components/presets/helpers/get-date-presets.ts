import { WEEKDAYS } from '../../../calendar/consts/week-days';
import { DatePreset } from '../../../common/enums/date-preset.enum';
import { WeekDay } from '../../../common/enums/week-day.enum';
import { IDatePresetItem } from '../../../common/interfaces/date-preset.interface';
import { WeekDays } from '../../../common/types/week-days.type';


/**
 * The preset list shown to the left of the calendar.
 *
 * Ordered by the span each one covers, so the list reads from a single day down
 * to a whole year.
 *
 * The week bounded presets spell out the days they run between, so the range is
 * unambiguous. Those day names follow `weekStartsOn` — a Monday start calendar
 * reads "This week (Mon - Today)" and "Last week (Mon - Sun)".
 */
export function getDatePresets(weekStartsOn: WeekDays = WeekDay.Sunday): IDatePresetItem[] {
  const weekStart = WEEKDAYS[weekStartsOn];
  const weekEnd = WEEKDAYS[(weekStartsOn + 6) % 7];

  return [
    { preset: DatePreset.Today, name: 'Today' },
    { preset: DatePreset.Yesterday, name: 'Yesterday' },
    { preset: DatePreset.ThisWeek, name: `This week (${weekStart} - Today)` },
    { preset: DatePreset.Last7Days, name: 'Last 7 days' },
    { preset: DatePreset.LastWeek, name: `Last week (${weekStart} - ${weekEnd})` },
    { preset: DatePreset.Last28Days, name: 'Last 28 days' },
    { preset: DatePreset.Last30Days, name: 'Last 30 days' },
    { preset: DatePreset.ThisMonth, name: 'This month' },
    { preset: DatePreset.LastMonth, name: 'Last month' },
    { preset: DatePreset.Last90Days, name: 'Last 90 days' },
    { preset: DatePreset.Last3Months, name: 'Last 3 months' },
    { preset: DatePreset.QuarterToDate, name: 'Quarter to date' },
    { preset: DatePreset.LastQuarter, name: 'Last quarter' },
    { preset: DatePreset.Last6Months, name: 'Last 6 months' },
    { preset: DatePreset.Last12Months, name: 'Last 12 months' },
    { preset: DatePreset.ThisYear, name: 'This year (Jan - Today)' },
    { preset: DatePreset.LastCalendarYear, name: 'Last calendar year' },
  ];
}
