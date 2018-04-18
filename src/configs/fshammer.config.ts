import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class FsHammerConfig extends HammerGestureConfig  {
  overrides = <any> {
      swipe: { velocity: 0.4, threshold: 20 }
  }
}
