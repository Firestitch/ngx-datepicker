import { defer, fromEvent, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


/** Wheel travel that has to build up before the calendar steps a month. */
const WHEEL_STEP = 13;

/**
 * Turns wheel gestures over `element` into month steps: 1 for scrolling down,
 * -1 for scrolling up — the same move as clicking the header's next/prev
 * arrows. Deltas accumulate so a trackpad's fine-grained events do not fly
 * through a year at a time, and the event is swallowed so the page behind the
 * dialog stays put.
 */
export function monthWheelScroll(element: HTMLElement): Observable<number> {
  return defer(() => {
    let travelled = 0;

    return fromEvent<WheelEvent>(element, 'wheel')
      .pipe(
        tap((event) => {
          event.preventDefault();
          event.stopPropagation();
        }),
        filter((event) => {
          travelled += wheelAmount(event);

          return travelled > WHEEL_STEP;
        }),
        tap(() => travelled = 0),
        map((event) => event.deltaY > 0 ? 1 : -1),
      );
  });
}

/**
 * `wheelDeltaY` is non-standard, so fall back to the standard `deltaY` scaled
 * to roughly the same magnitude — line-mode deltas count a line as 40px.
 */
function wheelAmount(event: WheelEvent): number {
  const legacyDelta = (event as unknown as { wheelDeltaY?: number }).wheelDeltaY;

  if (legacyDelta !== undefined) {
    return Math.abs(legacyDelta);
  }

  return Math.abs(event.deltaY) * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 40 : 1.2);
}
