import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'translateDictionary',
  pure: false,
  standalone: true
})
export class TranslateDictionaryPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, ...args: string[]): string {
    if (!value) {
      return '';
    }
    const locale = this.translateService.currentLang || 'kk'
    if (args && args.length > 0) {
      if (args[0]) {
        if (locale === 'kk') {
          return value[args[0] + 'Kk'] || value[args[0] + 'Ru'];
        } else if (locale === 'ru') {
          return value[args[0] + 'Ru'] || value[args[0] + 'Kk'];
        } else if (locale === 'en-EN') {
          return value[args[0] + 'En'] || value[args[0] + 'Kk'] || value[args[0] + 'Ru'];
        } else {
          return value[args[0] + 'Kk'] || value[args[0] + 'Ru'];
        }
      }
    } else {
      if (locale === 'kk') {
        return value.nameKz|| value.nameRu;
      } else if (locale === 'ru') {
        return value.nameRu || value.nameKz;
      } else if (locale === 'en-US') {
        return value.nameEn || value.nameKz || value.nameRu;
      }
    }
    return value.nameKk || value.nameRu;

  }

}
