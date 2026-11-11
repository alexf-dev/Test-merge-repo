import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WaitingListComponent} from "./waiting-list/waiting-list.component";
import {MseActRegisterJournalComponent} from "./mse-act-register-journal/mse-act-register-journal.component";

const routes: Routes = [
  { path: 'waiting-list', component: WaitingListComponent },
  { path: 'registered-acts', component: MseActRegisterJournalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsenteeExaminationRoutingModule { }
