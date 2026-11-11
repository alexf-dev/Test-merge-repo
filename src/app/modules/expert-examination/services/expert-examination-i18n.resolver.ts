import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ExpertExaminationI18nService } from './expert-examination-i18n.service';

/**
 * Не пускает пользователя в раздел, пока не подгрузятся
 * переводы модуля expert-examination.
 */
@Injectable({ providedIn: 'root' })
export class ExpertExaminationI18nResolver implements Resolve<Promise<void>> {
  constructor(private i18n: ExpertExaminationI18nService) {}

  resolve(): Promise<void> {
    return this.i18n.load();
  }
}
