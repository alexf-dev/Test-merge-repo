import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientsListComponent} from "../../patients/patients-list/patients-list.component";
import {GbdflFindComponent} from "./gbdfl-find.component";

const routes: Routes = [
  { path: '', component: GbdflFindComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GbdflFindRoutingModule { }
