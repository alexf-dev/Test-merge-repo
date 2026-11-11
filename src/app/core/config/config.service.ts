import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, DEFAULT_CONFIG } from './config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: AppConfig = DEFAULT_CONFIG;

  constructor(private http: HttpClient) {}

  /** Загружает конфиг из assets — вызывается через APP_INITIALIZER */
  public load(): Promise<void> {
    return this.http
      .get<AppConfig>('/assets/config.json')
      .toPromise()
      .then((remoteConfig) => {
        if (remoteConfig) {
          // Объединяем remote-конфиг с дефолтным, чтобы новые поля в DEFAULT_CONFIG
          // не ломали старые конфиги на сервере
          this.config = { ...DEFAULT_CONFIG, ...remoteConfig };
        }
      })
      .catch((err) => {
        console.warn('Не удалось загрузить config.json, используются значения по умолчанию', err);
        this.config = DEFAULT_CONFIG;
      });
  }

  /** Доступ к конфигу (только для чтения) */
  public get(): AppConfig {
    return this.config;
  }

  /** Удобные геттеры для частых флагов */
  public get enableTestButtons(): boolean {
    return this.config.enableTestButtons;
  }

  public get enableDebugLogs(): boolean {
    return this.config.enableDebugLogs;
  }

  public get showThemeSelector(): boolean {
    return this.config.showThemeSelector;
  }
}
