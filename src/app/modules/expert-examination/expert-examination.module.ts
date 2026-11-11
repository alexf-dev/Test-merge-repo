import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ExpertExaminationRoutingModule } from './expert-examination-routing.module';
import { ExpertExaminationI18nService } from './services/expert-examination-i18n.service';

import { ExpertExaminationComponent } from './expert-examination.component';
import { LaboratoryDataComponent } from './components/laboratory-data/laboratory-data.component';
import { TherapeuticStatusComponent } from './components/therapeutic-status/therapeutic-status.component';
import { SpecialistsConclusionComponent } from './components/specialists-conclusion/specialists-conclusion.component';
import { RehabilitationConclusionComponent } from './components/rehabilitation-conclusion/rehabilitation-conclusion.component';
import { SurgicalStatusComponent } from './components/surgical-status/surgical-status.component';
import { NeurologicalStatusComponent } from './components/neurological-status/neurological-status.component';
import { OphthalmologicalDataComponent } from './components/ophthalmological-data/ophthalmological-data.component';

@NgModule({
  declarations: [
    ExpertExaminationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ExpertExaminationRoutingModule,
    LaboratoryDataComponent,
    TherapeuticStatusComponent,
    SpecialistsConclusionComponent,
    RehabilitationConclusionComponent,
    SurgicalStatusComponent,
    NeurologicalStatusComponent,
    OphthalmologicalDataComponent
  ],
  providers: [
    ExpertExaminationI18nService
  ]
})
export class ExpertExaminationModule {
  constructor(
    private translate: TranslateService,
    private i18nService: ExpertExaminationI18nService
  ) {
    this.translate.onLangChange.subscribe(event => {
      this.i18nService.loadLang(event.lang);
    });
  }
}
