/** Интерфейс структуры конфигурации — для типизации */
export interface AppConfig {
  enableTestButtons: boolean;
  showThemeSelector: boolean;
  enableDebugLogs: boolean;
  apiTimeout: number;
  featureFlags: {
    newDashboard: boolean;
    experimentalForms: boolean;
  };
}

/** Значения по умолчанию, если конфиг не загрузился */
export const DEFAULT_CONFIG: AppConfig = {
  enableTestButtons: false,
  showThemeSelector: true,
  enableDebugLogs: false,
  apiTimeout: 30000,
  featureFlags: {
    newDashboard: false,
    experimentalForms: false
  }
};
