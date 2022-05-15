/**
 * According to ISO 8601 first week in the year is not just first Monday in the year
 *
 * The first calendar week of a year is that one which includes the first Thursday of that year
 * and the last calendar week of a calendar year is the week immediately preceding the first calendar week of the next calendar year.
 *
 * https://webspace.science.uu.nl/~gent0113/calendar/isocalendar_text_2.htm
 *
 */
export function getFirstDayOfFirstYearWeek(date: Date): Date {
  const startOfYear = new Date((date.getFullYear()), 0, 1);
  const currentDay = startOfYear.getDay();

  if (currentDay > 4) {
    const daysToNextMonday = (7 - currentDay) + 1; // +1 because currentDay count starts from 0

    return new Date(startOfYear.getFullYear(), 0, startOfYear.getDate() + daysToNextMonday);
  } else {
    const daysToPrevMonday = currentDay - 1;

    return new Date(startOfYear.getFullYear(), 0, startOfYear.getDate() - daysToPrevMonday);
  }
}
