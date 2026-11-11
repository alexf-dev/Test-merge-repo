import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

/**
 * Сервис загрузки переводов модуля "Экспертное обследование".
 *
 * Переводы лежат в отдельных файлах:
 *   src/assets/i18n/modules/expert-examination/ru.json
 *   src/assets/i18n/modules/expert-examination/kk.json
 *
 * и мержатся с общими переводами через setTranslation(lang, translations, true).
 */
@Injectable({ providedIn: 'root' })
export class ExpertExaminationI18nService {
  /** Языки, переводы для которых уже загружены (защита от повторных запросов) */
  private loadedLangs = new Set<string>();

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  /**
   * Загружает переводы для текущего активного языка.
   * Вызывается при инициализации модуля.
   */
  public async load(): Promise<void> {
    const lang = this.getCurrentLang();
    await this.loadLang(lang);
  }

  /**
   * Загружает переводы для конкретного языка.
   * Вызывается при смене языка через подписку на onLangChange.
   */
  public async loadLang(lang: string): Promise<void> {
    // Повторная загрузка для уже загруженного языка не нужна
    if (this.loadedLangs.has(lang)) {
      return;
    }

    try {
      const translations = await firstValueFrom(
        this.http.get<any>(`./assets/i18n/modules/expert-examination/${lang}.json`)
      );

      // true = мерж с существующими переводами, а не полная замена
      this.translate.setTranslation(lang, translations, true);
      this.loadedLangs.add(lang);
    } catch (error) {
      console.error(`[ExpertExamination i18n] Ошибка загрузки переводов для "${lang}":`, error);
    }
  }

  private getCurrentLang(): string {
    return this.translate.currentLang
      || this.translate.getDefaultLang()
      || 'ru';
  }
}
