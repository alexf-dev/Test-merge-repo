import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ReestrExpertsComponent} from "./reestr-experts.component";
import {RegisteringReestrExpertsComponent} from "./registering-reestr-experts/registering-reestr-experts.component";

const routes: Routes = [
  { path: '', component: ReestrExpertsComponent },
  { path: 'registering', component: RegisteringReestrExpertsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReestrExpertsRoutingModule { }
