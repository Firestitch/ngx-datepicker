export function getYearsCycle(
  monthLabelHeight: number,
  weekHeight: number,
  startCycleYear: number,
): ReadonlyArray<ReadonlyArray<number>> {
  // Create array of 28 years.
  // Calendar repeats every 28 years
  return Array.from(
    { length: 28 },
    (_, i) => {
      // Create array of 12 months for every year
      return Array.from(
        { length: 12 },
        (__, month) => {
          // Calculate total height of calendar for every month
          return monthLabelHeight + weekCount(i, month, startCycleYear) * weekHeight
        });
    }
  );
}

/**
 * Calculate total height of calendars from 0 year to lastYear
 */
export function reduceCycle(
  yearsCycle: ReadonlyArray<ReadonlyArray<number>>,
  lastYear = 28,
  lastMonth = 12,
): number {
  return yearsCycle.reduce(
    (total, year, yearIndex) => {
      if (yearIndex <= lastYear) {
        const heightOfMonthsInYear = year.reduce((sum, month, monthIndex) => {
          if (yearIndex < lastYear || (yearIndex === lastYear && monthIndex < lastMonth)) {
            sum += month;
          }

          return sum;
        }, 0);

        total += heightOfMonthsInYear;
      }

      return total;
    }, 0);
}

/**
 * Returns number of weeks for given month
 */
function weekCount(yearCycleIndex: number, month: number, startCycleYear: number): number {
  const firstOfMonth = new Date(yearCycleIndex + startCycleYear, month, 1);
  const lastOfMonth = new Date(yearCycleIndex + startCycleYear, month + 1, 0);
  const days = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(days / 7);
}
