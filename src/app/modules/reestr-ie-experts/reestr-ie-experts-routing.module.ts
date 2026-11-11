import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ReestrIeExpertsComponent} from "./reestr-ie-experts.component";

const routes: Routes = [
  { path: '', component: ReestrIeExpertsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReestrIeExpertsRoutingModule { }
