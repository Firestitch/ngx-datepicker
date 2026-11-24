import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';


type Theme = 'light' | 'dark';

const storageKey = 'fs-datepicker-playground-theme';

/**
 * Switches the whole playground between light and dark, so every picker and
 * the panel it opens can be checked in both. It sets the marker a host app
 * sets (`theme-dark` / `theme-light` on <html>), which the shared --fs-*
 * tokens and the playground's dark Material theme read, and remembers the
 * choice across reloads.
 */
@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonToggleModule,
  ],
})
export class ThemeSwitchComponent {

  public theme = signal<Theme>('light');

  private _document = inject(DOCUMENT);

  constructor() {
    this._init();
  }

  private _init(): void {
    this.theme.set(this._storedTheme());
    effect(() => this._apply(this.theme()));
  }

  private _apply(theme: Theme): void {
    const classList = this._document.documentElement.classList;
    classList.toggle('theme-dark', theme === 'dark');
    classList.toggle('theme-light', theme === 'light');

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Storage blocked: the switch still works, it just isn't remembered
    }
  }

  private _storedTheme(): Theme {
    try {
      return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

}
