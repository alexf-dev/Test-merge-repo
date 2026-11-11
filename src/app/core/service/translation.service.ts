import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private langChangeSubject = new Subject<string>();
  langChange$ = this.langChangeSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['kk', 'ru']);
    this.translate.setDefaultLang('kk');
    this.translate.use(this.getSelectedLanguage());
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.langChangeSubject.next(event.lang);
    })
  }

  setLanguage(lang) {
    if (lang) {
      //console.log("setLanguage: " + lang);
      this.translate.use(lang);
      localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    }
  }

  getSelectedLanguage(): any {
    return (
      localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY)
      || this.getBrowserLanguage()
      || this.translate.getDefaultLang()
    );
  }

  getBrowserLanguage(): string {
    const userLanguages = navigator.languages || [navigator.language];
    for (const lang of userLanguages) {
      const language = this.translate.getLangs().find(value => value.toLowerCase().includes(lang.toLowerCase())
        || value.toLowerCase().includes(lang.toLowerCase().split('-')[0]));
      if (language) {
        return language;
      }
    }
    return this.translate.getDefaultLang();
  }

  getTranslations = (key: string[]): Observable<any> => {
    return this.translate.get(key);
  }

  getTranslation = (key: string): Observable<any> => {
    return this.translate.get(key);
  }

  instant = (key: string | Array<string>, interpolateParams?: Object) => {
    return this.translate.instant(key, interpolateParams);
  }

  getTranslationsForParentKey(keys: string[]): Observable<any> {
    return new Observable(observer => {
      const result = {};
      keys.forEach(key => {
        this.translate.get(key).subscribe((nestedTranslations: any) => {
          if (typeof nestedTranslations === 'object') {
            this.flattenTranslations(key, nestedTranslations, result);
          } else {
            observer.error(`No nested translations found for key: ${key}`);
          }
        });
      });
      observer.next(result);
      observer.complete();
    });
  }

  private flattenTranslations(parentKey: string, nestedTranslations: any, result: object = null): any {
    if (!result) {
      result = {}
    }
    for (const [key, value] of Object.entries(nestedTranslations)) {
      const translationKey = `${parentKey}.${key}`;
      if (typeof value === 'string') {
        result[translationKey] = value;
      } else {
        this.flattenTranslations(translationKey, value, result);
      }
    }
    return result;
  }

}
