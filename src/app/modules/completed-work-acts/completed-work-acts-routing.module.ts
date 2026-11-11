import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CompletedWorkActsComponent} from "./completed-work-acts.component";

const routes: Routes = [
  {path: '', component: CompletedWorkActsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedWorkActsRoutingModule { }
