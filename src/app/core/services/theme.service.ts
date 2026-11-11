import { Injectable } from '@angular/core';

export type AppTheme = 'default' | 'dark' | 'state';

export interface ThemeOption {
  id: AppTheme;
  label: string;
}

const STORAGE_KEY = 'cbdi-theme';

export const AVAILABLE_THEMES: ThemeOption[] = [
  { id: 'default', label: 'Дефолтная' },
  { id: 'dark',    label: 'Тёмная' },
  { id: 'state',   label: 'Государственная' }
];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: AppTheme;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY) as AppTheme | null;
    this.current = (stored && AVAILABLE_THEMES.some(t => t.id === stored)) ? stored : 'default';
    this.apply();
  }

  get theme(): AppTheme {
    return this.current;
  }

  get themes(): ThemeOption[] {
    return AVAILABLE_THEMES;
  }

  setTheme(theme: AppTheme): void {
    if (!AVAILABLE_THEMES.some(t => t.id === theme)) return;
    this.current = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    this.apply();
  }

  private apply(): void {
    // Для default убираем атрибут — работают только :root токены и оригинальный theme.css
    if (this.current === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', this.current);
    }
  }
}
