import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, AppTheme } from '../../../core/services/theme.service';
import { ConfigService } from '../../../core/config/config.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="theme-selector" *ngIf="configService.showThemeSelector">
      <i class="pi pi-palette theme-selector-icon"></i>
      <select
        class="theme-selector-select"
        [ngModel]="themeService.theme"
        (ngModelChange)="themeService.setTheme($event)">
        <option *ngFor="let t of themeService.themes" [value]="t.id">
          {{ t.label }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .theme-selector {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px 6px 12px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 24px;
      transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    .theme-selector:hover { background: #f1f5f9; }
    .theme-selector-icon {
      font-size: 14px;
      color: #475569;
    }
    .theme-selector-select {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
      cursor: pointer;
      padding-right: 18px;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%23475569' d='M0 0l5 6 5-6z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 4px center;
      background-size: 10px 6px;
    }
    .theme-selector-select:focus {
      outline: none;
    }
    .theme-selector-select option {
      background: #ffffff;
      color: #1f2937;
    }
  `]
})
export class ThemeToggleComponent {
  constructor(
    public themeService: ThemeService,
    public configService: ConfigService
  ) {}
}
