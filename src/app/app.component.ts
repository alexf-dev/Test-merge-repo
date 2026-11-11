import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  catchError,
  filter,
  of,
  Subject,
  takeUntil
} from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

import { ApiService } from './core/api.service';
import { AuthService } from './core/service/auth.service';
import { TranslationService } from './core/service/translation.service';
import { DictinoryValue } from './dto/dictinory-value';

import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ConfigService } from './core/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'cbdi-ui';

  private readonly destroy$ = new Subject<void>();
  private dictionariesLoaded = false;

  constructor(
    private configService: ConfigService,
    private readonly api: ApiService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly translationService: TranslationService,
    private readonly authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.setPrimeNGTranslations();

    this.translationService.langChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.setPrimeNGTranslations());

    /*
     * Сначала проверяем текущую сессию. Подписку на profile$
     * создаём после проверки, чтобы не использовать устаревший профиль
     * из localStorage.
     */
    this.authService.loadProfile()
      .pipe(
        catchError((error) => {
          console.error('Не удалось загрузить профиль', error);
          document.getElementById('splash')?.remove();
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.watchAuthenticatedProfile();
      });

    document.getElementById('splash')?.remove();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Показываем кнопки, если включены моки ИЛИ включён флаг в конфиге */
  public get showTestButtons(): boolean {
    // Приоритет: URL-параметр > localStorage > конфиг > моки
    if (this.hasDebugParamInUrl()) return true;
    if (this.isDebugInLocalStorage()) return true;
    return /* environment.useMocks || */ this.configService.enableTestButtons;
  }

  public test404(): void {
    this.http.get('/api/test/404').subscribe({
      next: () => console.log('404: Success (unexpected)'),
      error: (err) => console.log('404: Error caught in component', err)
    });
  }

  public test500(): void {
    this.http.get('/api/test/500').subscribe({
      next: () => console.log('500: Success (unexpected)'),
      error: (err) => console.log('500: Error caught in component', err)
    });
  }

  public testNoConnection(): void {
    // Этот запрос уйдёт на несуществующий домен → статус 0
    this.http.get('http://nonexistent-domain-12345.com/api/test').subscribe({
      next: () => console.log('No connection: Success (unexpected)'),
      error: (err) => console.log('No connection: Error caught in component', err)
    });
  }

  private hasDebugParamInUrl(): boolean {
    return new URLSearchParams(window.location.search).has('debug');
  }

  private isDebugInLocalStorage(): boolean {
    return localStorage.getItem('debugMode') === 'true';
  }

  private watchAuthenticatedProfile(): void {
    this.authService.profile$
      .pipe(
        filter((profile) => Boolean(profile)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.loadDictionaries());
  }

  private loadDictionaries(): void {
    if (this.dictionariesLoaded) {
      return;
    }

    this.dictionariesLoaded = true;

    const dictionaries: Array<[number, string]> = [
      [3, 'sex'],
      [44, 'd_family_status'],
      [69, 'd_socialeconomicstatus'],
      [48, 'd_housingtype'],
      [113, 'd_harmful_factors'],
      [107, 'd_district_bi']
    ];

    dictionaries.forEach(([id, code]) => {
      this.loadDictionary(id, code);
    });
  }

  private loadDictionary(id: number, code: string): void {
    this.api
      .get<DictinoryValue>(`/dictionary/value/all/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dictionary) => {
          localStorage.setItem(
            code,
            JSON.stringify(dictionary)
          );
        },
        error: (error) => {
          console.error(
            `Не удалось загрузить справочник ${code}`,
            error
          );
        }
      });
  }

  private setPrimeNGTranslations(): void {
    this.translationService
      .getTranslation('primeng')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (translations) => {
          this.primengConfig.setTranslation(translations);
        },
        error: (error) => {
          console.error(
            'Не удалось загрузить перевод PrimeNG',
            error
          );
        }
      });
  }
}
