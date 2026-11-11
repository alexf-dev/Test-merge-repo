// main-page-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {ExpertConclusionComponent} from "../examination/expert-conclusion/expert-conclusion.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'patients',
        loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)
      },
      {
        path: 'omk/appeal-reexamination',
        loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule),
        data: { source: 'omk'}
      },
      {
        path: 'kpu/:iin',
        loadChildren: () => import('../kpu/gbdfl-find/gbdfl-find.module').then(m => m.GbdflFindModule)
      },
      // {
      //   path: 'examination/:patientId/:expertOpinionId',
      //   loadChildren: () => import('../examination/examination.module').then(m => m.ExaminationModule)
      // },

      {
        path: 'expert-examination',
        loadChildren: () => import('../expert-examination/expert-examination.module').then(m => m.ExpertExaminationModule)
      },
      {
        path: 'examination/:mode/:patientId/:expertOpinionId',
        loadChildren: () => import('../examination/examination.module').then(m => m.ExaminationModule)
      },

      {
        path: 'examination/:mode/:expertOpinionId',
        loadChildren: () => import('../examination/examination.module').then(m => m.ExaminationModule)
      },

      {
        path: 'examination/:expertOpinionId',
        component: ExpertConclusionComponent
      },

      {
        path: 'absentee-examination',
        loadChildren: () => import('../absentee-examination/absentee-examination.module').then(m => m.AbsenteeExaminationModule)
      },

     /* {
        path: 'msk/:iin/form/:mainId',
        loadChildren: () => import('../msk-request/msk-request.module').then(m => m.MskRequestModule)
      },*/

      {
        path: 'approval-log',
        loadChildren: () => import('../approval-log/approval-log/approval-log.module').then(m => m.ApprovalLogModule)
      },

      {
        path: 'reestr-experts',
        loadChildren: () => import('../reestr-experts/reestr-experts.module').then(m => m.ReestrExpertsModule)
      },

      {
        path: 'reestr-ie-experts',
        loadChildren: () => import('../reestr-ie-experts/reestr-ie-experts.module').then(m => m.ReestrIeExpertsModule)
      },

      {
        path: 'omk',
        loadChildren: () => import('../omk/omk.module').then(m => m.OmkModule)
      },

      {
        path: 'msk/:id',
        loadChildren: () => import('../msk-request/msk-request.module').then(m => m.MskRequestModule)
      },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },

      { path: 'completed-work-acts', loadChildren: () => import('../completed-work-acts/completed-work-acts.module').then(m => m.CompletedWorkActsModule) },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
