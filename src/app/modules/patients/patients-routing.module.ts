import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import {PatientHistoryComponent} from "./patient-history/patient-history.component";

const routes: Routes = [
  { path: '', component: PatientsListComponent },
  { path: 'history/:id', component: PatientHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
