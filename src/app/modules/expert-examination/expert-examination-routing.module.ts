import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpertExaminationComponent } from './expert-examination.component';
import { ExpertExaminationI18nResolver } from './services/expert-examination-i18n.resolver';
import { LaboratoryDataComponent } from './components/laboratory-data/laboratory-data.component';
import { TherapeuticStatusComponent } from './components/therapeutic-status/therapeutic-status.component';
import { SpecialistsConclusionComponent } from './components/specialists-conclusion/specialists-conclusion.component';
import { RehabilitationConclusionComponent } from './components/rehabilitation-conclusion/rehabilitation-conclusion.component';
import { SurgicalStatusComponent } from './components/surgical-status/surgical-status.component';
import { NeurologicalStatusComponent } from './components/neurological-status/neurological-status.component';
import { OphthalmologicalDataComponent } from './components/ophthalmological-data/ophthalmological-data.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertExaminationComponent,
    resolve: { eeI18n: ExpertExaminationI18nResolver },
    children: [
      { path: 'laboratory-data', component: LaboratoryDataComponent },
      { path: 'therapeutic-status', component: TherapeuticStatusComponent },
      { path: 'specialists-conclusion', component: SpecialistsConclusionComponent },
      { path: 'rehabilitation-conclusion', component: RehabilitationConclusionComponent },
      { path: 'surgical-status', component: SurgicalStatusComponent },
      { path: 'neurological-status', component: NeurologicalStatusComponent },
      { path: 'ophthalmology-data', component: OphthalmologicalDataComponent },
      { path: '', redirectTo: 'laboratory-data', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertExaminationRoutingModule {}
