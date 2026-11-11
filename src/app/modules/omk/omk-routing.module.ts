import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AppealReexaminationComponent} from "./appeal-reexamination/appeal-reexamination.component";
import {AppealJournalComponent} from "./appeal-journal/appeal-journal.component";
import {CommitteeRequestFormComponent} from "./committee-request-form/committee-request-form.component";
import {ResolutionApprovedComponent} from "./resolution-approved/resolution-approved.component";



const routes: Routes = [
  { path: 'appeal-reexamination', component: AppealReexaminationComponent },
  { path: 'appeal-journal', component: AppealJournalComponent },
  { path: 'committee-request-form', component: CommitteeRequestFormComponent },
  { path: 'resolution-approved', component: ResolutionApprovedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OmkRoutingModule { }
